# Generative UI

## Table of Contents
- [Overview](#overview)
- [Register Tools](#register-tools)
  - [registerToolUI Method](#registertoolui-method)
  - [Configure Tool Template and Handler](#configure-tool-template-and-handler)
- [Add Tools in Prompt Responses](#add-tools-in-prompt-responses)
- [Configure AI for Generative UI Responses](#configure-ai-for-generative-ui-responses)
- [Complete Example: Interactive Tools with State](#complete-example-interactive-tools-with-state)
- [Summary](#summary)

This guide covers rendering dynamic tools and interactive UI elements — cards, charts, forms, or any custom component — directly within AI AssistView responses using Generative UI.

---

## Overview

Generative UI lets an AI response render more than markdown text: it can render live, interactive components such as weather cards, data grids, gauges, or fully editable forms. This is achieved by combining two building blocks:

- **`tool` blocks** — a `blockType: 'tool'` entry within a response's `blocks` array that references a registered tool by `toolName` and passes it data via `props`.
- **`registerToolUI()`** — a public method that maps a `toolName` to a rendering `template` and an optional interactivity `handler`.

Tools are invoked by name whenever a `tool` block appears in a response added through `addPromptResponse()`, letting an AI service (or your own logic) decide which interactive component to surface for a given prompt.

> **Note:** A tool must be registered with `registerToolUI()` **before** it's referenced in a response, and each `toolName` must be unique.

---

## Register Tools

### registerToolUI Method

Use `registerToolUI()` to register a custom tool. It accepts the tool name, a template, and an optional handler function.

#### Signature

```typescript
registerToolUI(options: {
    toolName: string;
    template: string | Function;
    handler?: (container: HTMLElement, props?: any) => void;
}): void
```

| Property | Type | Description |
|---|---|---|
| `toolName` | `string` | Unique name used to reference this tool from a `tool` block. |
| `template` | `string \| Function` | Defines the tool's UI. A function receives the block's `props` and returns an HTML string. |
| `handler` | `Function` | Optional. Called with the rendered container element (and `props`) after the template mounts — used to wire up interactivity or initialize child components. |

### Configure Tool Template and Handler

The template controls the UI layout; the handler is provided the container element and any additional data needed to enable interactive functionality (event listeners, embedding other Syncfusion components, etc.).

#### Basic Example — Weather Card

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: onPromptRequest
});

aiAssistView.appendTo('#aiAssistView');

function weatherTemplate(args: any) {
    return `<div tabindex="0" class="e-card" id="weather_card" role="button">
        <div class="e-card-header">
            <div class="e-card-header-caption">
                <div class="e-card-header-title">${args.location}</div>
                <div class="e-card-sub-title">${args.temperature}</div>
            </div>
        </div>
    </div>`;
}

// Registering generative tool UI
aiAssistView.registerToolUI({
    toolName: 'weather-tool',
    template: weatherTemplate
});
```

**Use cases:**
- Render read-only informational cards (weather, stock quotes, status summaries)
- Embed charts, gauges, or grids driven by AI-provided data
- Surface fully interactive forms (editable recipes, checklists, configuration panels)

---

## Add Tools in Prompt Responses

Use `addPromptResponse()` to dynamically add tool blocks to AI responses by including them in the response's `blocks` array, alongside optional `text` blocks.

### Tool Block Shape

| Property | Type | Description |
|---|---|---|
| `blockType` | `'tool'` | Identifies this block as a generative UI tool block. Required. |
| `toolName` | `string` | Name of a previously registered tool (must match `registerToolUI`'s `toolName`). |
| `props` | `any` | Data object passed through to the tool's `template` and `handler`. |

### Example

```typescript
async function onPromptRequest(args: any) {
    const apiKey = ''; // Your API key here
    const url = ''; // Your AI response URL here
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiKey
            },
            body: JSON.stringify({
                model: 'gpt-5',
                messages: {
                    messages: [
                        { role: 'system', content: systemPrompt },
                        { role: 'user', content: args.prompt }
                    ]
                },
                max_output_tokens: 1000
            })
        });

        const reply = await response.json();
        const message = reply.output.find(function (item: any) { return item.type === 'message'; });
        const jsonText = (message && message.content && message.content[0] && message.content[0].text) || '{}';
        const aiData = JSON.parse(jsonText);

        aiAssistView.addPromptResponse({ blocks: aiData.blocks });

    } catch (error) {
        aiAssistView.addPromptResponse('We could not reach the AI service; please try again later.');
    }
}
```

**Use cases:**
- Mix narrative text blocks with one or more tool blocks in a single response
- Let the AI service decide, per prompt, which tool (if any) to invoke
- Pass structured data (`props`) straight from the AI's JSON output into the rendered component

---

## Configure AI for Generative UI Responses

Configure your AI service to return structured JSON through a `system prompt`, so its output maps directly onto the `blocks` array. This keeps AI-generated content consistently formatted for rendering as text or tool blocks.

### Example System Prompt

```typescript
const systemPrompt = `
    You are an AI assistant that generates Syncfusion AIAssistView blocks.

    Return ONLY valid JSON.

    Output format:
    {
        "blocks": [
            {
                "blockType": "text",
                "content": "Description"
            },
            {
                "blockType": "tool",
                "toolName": "toolname",
                "props": { ... }
            }
        ]
    }
    Rules:
    1. Always return a single "blocks" array.
    2. Return ONLY valid JSON.
    3. You may return ANY number of blocks.
    4. Whenever weather-related queries are requested, invoke the weather-tool block with blockType "tool" and toolName "weather-tool".
`;
```

> Keep the rule list explicit and narrow (which tool names exist, when to invoke each) — this reduces the chance of the model inventing an unregistered `toolName` or malformed JSON.

**Use cases:**
- Ground an LLM's output to your app's actual set of registered tools
- Combine explanatory text blocks with data-driven tool blocks in the same response
- Keep tool invocation logic server/AI-side rather than hardcoded in the client

---

## Complete Example: Interactive Tools with State

This example registers three tools — a static weather card, a fully editable recipe form, and a circular gauge driven by Syncfusion's CircularGauge component — and demonstrates how a tool's `handler` can capture user edits and trigger a follow-up prompt/response cycle.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
import { CircularGauge, Annotations, GaugeTooltip, Legend } from '@syncfusion/ej2-circulargauge';
enableRipple(true);

CircularGauge.Inject(Annotations, GaugeTooltip, Legend);

let scoreBlocks: any = [];
let weatherData: any = [
    { blockType: 'text', content: 'Here is the current weather forecast for your location:' },
    { blockType: 'tool', toolName: 'weather-card' },
    { blockType: 'text', content: '**Scattered Showers Expected** with temperatures ranging from **1°C to -4°C**. There is a **100% chance of snow**, so it\'s recommended to bundle up and exercise caution if traveling. The weather system is expected to continue throughout the day with moderate precipitation.' }
];

let aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: ['Suggest a healthy breakfast recipe under 5 ingredients', 'What is the weather in New York?'],
    enableStreaming: true,
    prompts: [{ prompt: 'What is the weather in New York?', blocks: weatherData }],
    toolbarSettings: {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: toolbarItemClicked
    },
    promptRequest: onPromptRequest
});

// Registering a static tool with an inline HTML string template
aiAssistView.registerToolUI({
    toolName: 'weather-card',
    template: '<div tabindex="0" class="e-card" id="weather_card" role="button"><div class="e-card-header"><div class="e-card-header-caption"><div class="e-card-header-title">Today</div><div class="e-card-sub-title">New York - Scattered Showers.</div></div></div><div class="e-card-header weather_report"><div class="e-card-header-image"></div><div class="e-card-header-caption"><div class="e-card-header-title">1º / -4º</div><div class="e-card-sub-title">Chance for snow: 100%</div></div></div></div>'
});

function recipeTemplate(args: any) {
    const data = Object.assign({ title: 'Custom Recipe', ingredients: [], instructions: [] }, args);
    return `
        <div class="recipe-panel e-card">
            <h2 class="recipe-title">${data.title}</h2>
            <div class="recipe-section">
                <div class="recipe-header">
                    <h4>🥕 Ingredients</h4>
                    <button class="e-btn e-primary e-small add-ingredient">Add Ingredient</button>
                </div>
                <div class="ingredients-list">
                    ${data.ingredients.map(function (ingredient: any) {
                        return `
                            <div class="ingredient-item">
                                <span class="ingredient-name editable" contenteditable="true">${ingredient.name || ingredient}</span>
                                <span class="ingredient-qty editable" contenteditable="true">${ingredient.quantity || ''}</span>
                                <button class="e-btn e-small e-danger remove-ingredient e-icons e-close"></button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            <div class="recipe-section">
                <div class="recipe-header">
                    <h4>📋 Instructions</h4>
                    <button class="e-btn e-primary e-small add-step">Add Step</button>
                </div>
                <div class="instructions-list">
                    ${data.instructions.map(function (step: any) {
                        return `
                            <div class="step-item">
                                <span class="step-text editable" contenteditable="true">${step}</span>
                                <button class="e-btn e-small e-danger remove-step e-icons e-close"></button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            <button class="e-btn e-primary check-score-btn">Check Recipe Score</button>
        </div>
    `;
}

// Registering an interactive tool: template + handler
aiAssistView.registerToolUI({
    toolName: 'recipe-maker',
    template: recipeTemplate,
    handler: function (container: any) {
        container.addEventListener('click', function (e: any) {
            if (e.target.classList.contains('add-ingredient')) {
                container.querySelector('.ingredients-list').insertAdjacentHTML('beforeend', `
                    <div class="ingredient-item">
                        <span class="ingredient-name editable" contenteditable="true">New Ingredient</span>
                        <span class="ingredient-qty editable" contenteditable="true">qty</span>
                        <button class="e-btn e-small e-danger remove-ingredient e-icons e-close"></button>
                    </div>
                `);
                return;
            }
            if (e.target.classList.contains('add-step')) {
                container.querySelector('.instructions-list').insertAdjacentHTML('beforeend', `
                    <div class="step-item">
                        <span class="step-text editable" contenteditable="true">New instruction step...</span>
                        <button class="e-btn e-small e-danger remove-step e-icons e-close"></button>
                    </div>
                `);
                return;
            }
            if (e.target.classList.contains('remove-ingredient')) {
                e.target.closest('.ingredient-item').remove();
                return;
            }
            if (e.target.classList.contains('remove-step')) {
                e.target.closest('.step-item').remove();
                return;
            }
            if (e.target.classList.contains('check-score-btn')) {
                const recipeData = getCurrentRecipeData(container);
                const score = calculateRecipeScore(recipeData);
                scoreBlocks = [
                    { blockType: 'text', content: `**Recipe Score Analysis**\n\nHere is the health & quality score for **${recipeData.title}**.` },
                    { blockType: 'tool', toolName: 'recipe-score-gauge', props: { score: score, title: recipeData.title } },
                    { blockType: 'text', content: 'You can continue editing the recipe above and check the score again anytime.' }
                ];
                // Trigger a follow-up response using the state captured from user edits
                aiAssistView.executePrompt('Generate a score analysis for this recipe.');
            }
        });
    }
});

function recipeScoreGaugeTemplate(args: any) {
    const score = args.score || 85;
    return `
        <div class="score-gauge-panel e-card">
            <div class="score-gauge"></div>
            <div class="score-value">${score}/100</div>
            <p class="score-comment">${getScoreComment(score)}</p>
        </div>
    `;
}

// Registering a tool whose handler mounts a Syncfusion component into the container
aiAssistView.registerToolUI({
    toolName: 'recipe-score-gauge',
    template: recipeScoreGaugeTemplate,
    handler: function (container: any, args: any) {
        const score = args.score || 85;
        const recipeTitle = args.title || 'Recipe Score';
        const circulargauge: CircularGauge = new CircularGauge({
            height: '380px',
            width: '380px',
            title: recipeTitle,
            allowMargin: false,
            titleStyle: { size: '18px', fontFamily: 'inherit' },
            tooltip: { enable: true },
            axes: [{
                annotations: [{ content: `<div class="gauge-annotation">${score}</div>`, angle: 0, zIndex: '1', radius: '-10%' }],
                lineStyle: { width: 0 },
                labelStyle: { font: { size: '12px', fontFamily: 'inherit' }, position: 'Outside', offset: -40 },
                majorTicks: { height: 12, width: 1.5, interval: 2, offset: 35 },
                minorTicks: { height: 0 },
                startAngle: 270,
                endAngle: 90,
                minimum: 0,
                maximum: 10,
                radius: '105%',
                pointers: [{ radius: '70%', needleEndWidth: 2, pointerWidth: 5, value: score / 10, cap: { radius: 8, border: { width: 2 } } }],
                ranges: [
                    { start: 0, end: 2, startWidth: 40, endWidth: 40, color: '#F03E3E', radius: '80%' },
                    { start: 2, end: 5, startWidth: 40, endWidth: 40, color: '#f6961e', radius: '80%' },
                    { start: 5, end: 8, startWidth: 40, endWidth: 40, color: '#FFDD00', radius: '80%' },
                    { start: 8, end: 10, startWidth: 40, endWidth: 40, color: '#30B32D', radius: '80%' }
                ]
            }]
        });
        circulargauge.appendTo(container.querySelector('.score-gauge'));
    }
});

aiAssistView.appendTo('#aiAssistView');

function getCurrentRecipeData(container: any) {
    return {
        title: container.querySelector('.recipe-title').textContent.trim() || 'Untitled Recipe',
        ingredients: Array.from(container.querySelectorAll('.ingredient-item')).map(function (item: any) {
            return {
                name: item.querySelector('.ingredient-name').textContent.trim(),
                quantity: item.querySelector('.ingredient-qty').textContent.trim()
            };
        }).filter(function (ingredient: any) { return ingredient.name; }),
        instructions: Array.from(container.querySelectorAll('.step-item')).map(function (item: any) {
            return item.querySelector('.step-text').textContent.trim();
        }).filter(Boolean)
    };
}

function calculateRecipeScore(recipe: any) {
    let score = 100;
    const ingredients = recipe.ingredients || [];
    const instructions = recipe.instructions || [];
    let validIng = 0, validSteps = 0;
    if (!ingredients.length) return 15;
    if (!instructions.length) return 20;
    for (let i = 0; i < ingredients.length; i++) {
        const n = (ingredients[i].name || '').trim();
        const q = (ingredients[i].quantity || '').trim();
        if (!n || !q) score -= 12; else validIng++;
    }
    score += (validIng >= 5 ? 10 : validIng === 1 ? -20 : validIng === 2 ? -10 : 0);
    for (let i = 0; i < instructions.length; i++) {
        const s = (instructions[i] || '').trim();
        if (!s) score -= 15; else validSteps++;
    }
    score += (validSteps >= 4 ? 10 : validSteps === 1 ? -25 : validSteps === 2 ? -15 : validSteps === 3 ? -5 : 0);
    if (validIng >= 3 && validSteps >= 3) score += 8;
    score += Math.floor(Math.random() * 6);
    return score < 10 ? 10 : score > 100 ? 100 : score;
}

function getScoreComment(score: any) {
    if (score >= 90) return 'Outstanding recipe! Highly recommended.';
    if (score >= 80) return 'Very good recipe with excellent balance.';
    if (score >= 70) return 'Solid recipe. Minor improvements possible.';
    return 'Average recipe. Consider refining ingredients or steps.';
}

function onPromptRequest(args: any) {
    setTimeout(function () {
        if (args.prompt === 'What is the weather in New York?') {
            aiAssistView.addPromptResponse({ blocks: weatherData });
        } else if (args.prompt === 'Generate a score analysis for this recipe.') {
            aiAssistView.addPromptResponse({ blocks: scoreBlocks });
        } else if (args.prompt === 'Suggest a healthy breakfast recipe under 5 ingredients') {
            const mockRecipe = {
                title: 'Butter Toast',
                ingredients: [{ name: 'Bread slices', quantity: '2' }, { name: 'Butter', quantity: '1 tbsp' }, { name: 'Sugar', quantity: '1 tsp' }],
                instructions: ['Spread butter on bread slices', 'Toast until golden and sprinkle sugar on top']
            };
            aiAssistView.addPromptResponse({
                blocks: [
                    { blockType: 'text', content: '**Here is your recipe!** Feel free to edit ingredients and steps, then click **Check Recipe Score**.' },
                    { blockType: 'tool', toolName: 'recipe-maker', props: mockRecipe }
                ]
            });
        } else {
            aiAssistView.addPromptResponse('For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.');
        }
    }, 1000);
}

function toolbarItemClicked(args: any) {
    if (args.item.iconCss === 'e-icons e-refresh') {
        aiAssistView.prompts = [];
        aiAssistView.promptSuggestions = ['Suggest a healthy breakfast recipe under 5 ingredients', 'What is the weather in New York?'];
    }
}
```

**Use cases:**
- Fully interactive, editable AI-generated forms (recipes, checklists, configuration wizards)
- Embedding other Syncfusion components (charts, gauges, grids) as tool UIs inside responses
- Multi-step generative flows where a tool's handler captures user edits and triggers a follow-up prompt via `executePrompt()`
- Read-only informational cards populated from AI or API data (`weather-card` pattern)

---

## Summary

**Key Concepts:**
- Generative UI renders interactive components — not just text — within AI responses, using `tool` blocks inside the `blocks` array
- A tool must be registered with `registerToolUI()` before it's referenced by a `tool` block, and each `toolName` must be unique
- Tool blocks can be mixed freely with `text` (and `thinking`) blocks in the same response

**Key Method:**
- `registerToolUI({ toolName, template, handler? })` — maps a tool name to its rendering template and optional interactivity handler

**Key Block Shape:**
- `{ blockType: 'tool', toolName: string, props?: any }` — invokes a registered tool, passing `props` through to its `template`/`handler`

**Use Cases:**
- Rendering live data cards (weather, stocks, status)
- Interactive, user-editable forms driven by AI-generated content
- Embedding Syncfusion or custom components (charts, gauges, grids) as AI-response UI
- Grounding an AI service's structured JSON output to a known, registered set of tools via a system prompt
