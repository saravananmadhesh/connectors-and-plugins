# Generative UI in Angular AI AssistView Component

The **Generative UI** capability in AI AssistView allows you to render dynamic tools and interactive UI elements — such as charts, cards, and custom components — directly within AI-generated responses. This enables seamless integration of interactive components based on AI-generated responses, defined via the `blocks` property and mapped to rendering templates using the `registerToolUI` method.

---

## Table of Contents
- [Register Tools](#register-tools)
- [Configure Tool Template and Handler](#configure-tool-template-and-handler)
- [Add Tools in Prompt Responses](#add-tools-in-prompt-responses)
- [Configure AI for Generative UI Responses](#configure-ai-for-generative-ui-responses)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [See Also](#see-also)

---

## Register Tools

Register custom tools using the `registerToolUI` method. It accepts the tool name as a string, a template, and an optional handler function. Tools are invoked by their name within block responses added through the `addPromptResponse` method.

> **Note:** Use `blockType: 'tool'` and provide the tool name with the required properties through `props`. A tool must be registered before it is used in a response, and each tool name must be unique.

### registerToolUI Parameters

| Property | Type | Description |
|----------|------|-------------|
| `toolName` | `string` | Unique identifier for the tool. Must match the `toolName` used in the `tool` block. |
| `template` | `string` \| `TemplateRef` | The markup or Angular template used to render the tool's UI. |
| `handler` | `function` | Optional. Receives the container element and additional actions to enable interactive behavior after render. |

```typescript
(this.aiAssistView as any).registerToolUI({
    toolName: 'weather-tool',
    template: `<div tabindex="0" class="e-card" id="weather_card" role="button">
                <div class="e-card-header">
                  <div class="e-card-header-caption">
                    <div class="e-card-header-title">Weather</div>
                    <div class="e-card-sub-title">Location Information</div>
                  </div>
                </div>
                <div class="e-card-header weather_report">
                  <div class="e-card-header-image"></div>
                  <div class="e-card-header-caption">
                    <div class="e-card-header-title">Temperature</div>
                    <div class="e-card-sub-title">Weather Conditions</div>
                  </div>
                </div>
              </div>`
});
```

Register tools once the view is initialized, typically inside `ngAfterViewInit`:

```typescript
export class AppComponent implements AfterViewInit {
    @ViewChild('aiAssistView')
    public aiAssistView!: AIAssistViewComponent;

    ngAfterViewInit(): void {
        this.registerTools();
    }

    private registerTools(): void {
        if (!this.aiAssistView) return;

        (this.aiAssistView as any).registerToolUI({
            toolName: 'weather-tool',
            template: `<div class="e-card">Weather widget markup...</div>`
        });
    }
}
```

---

## Configure Tool Template and Handler

When registering a tool, configure how it appears by specifying a `template`, and implement its behavior through a `handler` function. The template controls the UI layout, while the handler is provided with the container element and any additional actions needed to enable interactive functionality (event binding, DOM updates, etc.).

Angular `TemplateRef`s registered as tool templates can bind directly to the `props` passed in the `tool` block, giving full access to Angular directives (`*ngFor`, `*ngIf`, event bindings) inside the rendered tool.

```typescript
@ViewChild('recipeMakerTemplate') public recipeMakerTemplate: any;

private registerTools(): void {
    (this.recipeAIAssistView as any).registerToolUI({
        toolName: 'recipe-maker',
        template: this.recipeMakerTemplate
    });
}
```

```html
<ng-template #recipeMakerTemplate let-data>
  <div class="recipe-panel">
    <h2 class="recipe-title" contenteditable="true">{{ data.title }}</h2>
    <div class="ingredients-list">
      <div class="ingredient-item" *ngFor="let ing of data.ingredients">
        <span class="ingredient-name">{{ ing.name }}</span>
        <span class="ingredient-qty">{{ ing.quantity }}</span>
      </div>
    </div>
  </div>
</ng-template>
```

---

## Add Tools in Prompt Responses

Use the `addPromptResponse` method to dynamically add tools to AI responses by passing `tool` blocks — alongside `text` blocks — in the `blocks` array.

### Tool Block Properties

| Property | Type | Description |
|----------|------|-------------|
| `blockType` | `'tool'` | Identifies this block as a tool block. Required. |
| `toolName` | `string` | Name of a previously registered tool via `registerToolUI`. Required. |
| `props` | `object` | Data object passed into the tool's template/handler for rendering (e.g., score, title, ingredients). |

```typescript
public prompts: any[] = [
  {
    prompt: 'What is the weather in New York?',
    blocks: [
      { blockType: 'text', content: 'Here is the current weather forecast for your location:' },
      { blockType: 'tool', toolName: 'weather-card' },
      { blockType: 'text', content: '**Scattered Showers Expected** with temperatures ranging from **1°C to -4°C**. There is a **100% chance of snow**, so it\'s recommended to bundle up and exercise caution if traveling.' }
    ]
  }
];

public onPromptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (args.prompt === 'What is the weather in New York?') {
    this.recipeAIAssistView.addPromptResponse({
      blocks: [
        { blockType: 'text', content: 'Here is the current weather forecast for your location:' },
        { blockType: 'tool', toolName: 'weather-card' },
        { blockType: 'text', content: '**Scattered Showers Expected** with temperatures ranging from **1°C to -4°C**.' }
      ]
    });
  }
};
```

### Passing Data with `props` and Reacting to User Interaction

Tool blocks can carry `props` that are consumed by the tool's template, and the tool can trigger further prompts (via `executePrompt`) once the user interacts with it — for example, generating a follow-up score analysis after editing a recipe:

```typescript
public onCheckScore(container: HTMLElement): void {
  const recipeData = this.getCurrentRecipeData(container);
  const score = this.calculateRecipeScore(recipeData);

  this.scoreBlocks = [
    { blockType: 'text', content: `**Recipe Score Analysis**\n\nHere is the health & quality score for **${recipeData.title}**.` },
    { blockType: 'tool', toolName: 'recipe-score-gauge', props: { score, title: recipeData.title } },
    { blockType: 'text', content: 'You can continue editing the recipe above and check the score again anytime.' }
  ];

  this.recipeAIAssistView.executePrompt('Generate a score analysis for this recipe.');
}
```

---

## Configure AI for Generative UI Responses

Configure the AI service to return structured JSON blocks through a `system prompt`. This ensures AI-generated content is properly formatted and rendered as interactive tools or text blocks.

### Recommended System Prompt Structure

```
Output format:
{
    "blocks": [
        { "blockType": "text", "content": "Description" },
        { "blockType": "tool", "toolName": "toolname", "props": { ... } }
    ]
}
Rules:
1. Always return a single "blocks" array.
2. Return ONLY valid JSON.
3. You may return ANY number of blocks.
4. Invoke a specific tool block ("toolName") only for its matching query type.
```

### Full Integration Example

```typescript
import { Component, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

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

@Component({
    imports: [ AIAssistViewModule ],
    standalone: true,
    selector: 'control-content',
    template: `<div ejs-aiassistview #aiAssistView (promptRequest)="onPromptRequest($event)"></div>`,
    encapsulation: ViewEncapsulation.None
})
export class AIAssistGenerativeUIComponent implements AfterViewInit {
    @ViewChild('aiAssistView')
    public aiAssistView!: AIAssistViewComponent;

    ngAfterViewInit(): void {
        this.registerTools();
    }

    private registerTools(): void {
        if (!this.aiAssistView) return;

        (this.aiAssistView as any).registerToolUI({
            toolName: 'weather-tool',
            template: `<div tabindex="0" class="e-card" id="weather_card" role="button">
                        <div class="e-card-header">
                          <div class="e-card-header-caption">
                            <div class="e-card-header-title">Weather</div>
                            <div class="e-card-sub-title">Location Information</div>
                          </div>
                        </div>
                        <div class="e-card-header weather_report">
                          <div class="e-card-header-image"></div>
                          <div class="e-card-header-caption">
                            <div class="e-card-header-title">Temperature</div>
                            <div class="e-card-sub-title">Weather Conditions</div>
                          </div>
                        </div>
                      </div>`
        });
    }

    public onPromptRequest = (args: PromptRequestEventArgs) => {
        const apiKey = ''; // Your API key here
        const url = ''; // Your AI response URL here
        
        try {
            fetch(url, {
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
            }).then((response) => response.json()).then((reply) => {
                const message = reply.output.find((item: any) => item.type === 'message');
                const jsonText = (message && message.content && message.content[0] && message.content[0].text) || '{}';
                const aiData = JSON.parse(jsonText);

                this.aiAssistView.addPromptResponse({ blocks: aiData.blocks });
            }).catch((error) => {
                this.aiAssistView.addPromptResponse("We could not reach the AI service; please try again later.");
            });
        } catch (error) {
            this.aiAssistView.addPromptResponse("We could not reach the AI service; please try again later.");
        }
    };
}
```

### Complete Example: Recipe Maker with Interactive Tools and Chart Tool

The following demonstrates multiple registered tools (a custom Angular-templated tool and a Syncfusion Circular Gauge chart tool), `props` passed through tool blocks, header toolbar reset action, and `executePrompt` used to chain a follow-up AI response after user interaction with a tool:

```typescript
import { Component, ViewChild, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AIAssistViewModule,
  AIAssistViewComponent,
  PromptRequestEventArgs,
  ToolbarItemClickedEventArgs,
  ToolbarSettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';
import { CircularGaugeModule } from '@syncfusion/ej2-angular-circulargauge';

@Component({
  selector: 'app-root',
  template: `
    <div class="control-section">
      <ejs-aiassistview
        #recipeAIAssistView
        id="register-tool"
        [promptSuggestionsHeader]="promptSuggestionsHeader"
        [promptSuggestions]="promptSuggestions"
        [enableStreaming]="enableStreaming"
        [showClearButton]="showClearButton"
        [prompts]="prompts"
        [toolbarSettings]="assistViewToolbarSettings"
        (promptRequest)="onPromptRequest($event)">
      </ejs-aiassistview>
    </div>

    <!-- Recipe Maker Tool Template -->
    <ng-template #recipeMakerTemplate let-data>
      <div class="recipe-panel" #recipeContainer>
        <h2 class="recipe-title" contenteditable="true">{{ data.title }}</h2>
        <div class="recipe-section">
          <div class="ingredients-list">
            <div class="ingredient-item" *ngFor="let ing of data.ingredients">
              <span class="ingredient-name">{{ ing.name }}</span>
              <span class="ingredient-qty">{{ ing.quantity }}</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 30px; text-align: center;">
          <button class="e-btn e-primary check-score-btn" (click)="onCheckScore(recipeContainer)">Check Recipe Score</button>
        </div>
      </div>
    </ng-template>

    <!-- Recipe Score Gauge Tool Template -->
    <ng-template #recipeScoreTemplate let-data>
      <div class="score-gauge-panel">
        <h4>{{ data.title }}</h4>
        <ejs-circulargauge height="380px" width="380px" [title]="data.title">
          <e-axes>
            <e-axis [startAngle]="270" [endAngle]="90" [minimum]="0" [maximum]="10">
              <e-pointers>
                <e-pointer [value]="data.score / 10"></e-pointer>
              </e-pointers>
            </e-axis>
          </e-axes>
        </ejs-circulargauge>
        <div>{{ data.score }}/100</div>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, AIAssistViewModule, CircularGaugeModule]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('recipeAIAssistView') public recipeAIAssistView!: AIAssistViewComponent;
  @ViewChild('recipeMakerTemplate') public recipeMakerTemplate: any;
  @ViewChild('recipeScoreTemplate') public recipeScoreTemplate: any;

  public promptSuggestionsHeader: string = 'Suggested Prompts';
  public promptSuggestions: string[] = [
    'Suggest a healthy breakfast recipe under 5 ingredients',
    'What is the weather in New York?'
  ];
  public enableStreaming: boolean = true;
  public showClearButton: boolean = true;
  private scoreBlocks: any[] = [];

  public prompts: any[] = [
    {
      prompt: 'What is the weather in New York?', blocks: [
        { blockType: 'text', content: 'Here is the current weather forecast for your location:' },
        { blockType: 'tool', toolName: 'weather-card' },
        { blockType: 'text', content: '**Scattered Showers Expected** with temperatures ranging from **1°C to -4°C**.' }
      ]
    }
  ];

  // Header toolbar action to reset the conversation
  public assistViewToolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: (args: ToolbarItemClickedEventArgs) => {
      if (args.item.iconCss === 'e-icons e-refresh') {
        this.recipeAIAssistView.prompts = [];
        this.recipeAIAssistView.promptSuggestions = this.promptSuggestions;
      }
    }
  };

  ngAfterViewInit(): void {
    this.registerTools();
  }

  private registerTools(): void {
    if (!this.recipeAIAssistView) return;

    (this.recipeAIAssistView as any).registerToolUI({
      toolName: 'recipe-maker',
      template: this.recipeMakerTemplate
    });

    (this.recipeAIAssistView as any).registerToolUI({
      toolName: 'recipe-score-gauge',
      template: this.recipeScoreTemplate
    });

    (this.recipeAIAssistView as any).registerToolUI({
      toolName: 'weather-card',
      template: `<div class="e-card">Today - New York - Scattered Showers. 1º / -4º</div>`
    });
  }

  public onCheckScore(container: HTMLElement): void {
    const recipeData = this.getCurrentRecipeData(container);
    const score = this.calculateRecipeScore(recipeData);

    this.scoreBlocks = [
      { blockType: 'text', content: `**Recipe Score Analysis**\n\nHere is the health & quality score for **${recipeData.title}**.` },
      { blockType: 'tool', toolName: 'recipe-score-gauge', props: { score, title: recipeData.title } },
      { blockType: 'text', content: 'You can continue editing the recipe above and check the score again anytime.' }
    ];

    this.recipeAIAssistView.executePrompt('Generate a score analysis for this recipe.');
  }

  private getCurrentRecipeData(container: HTMLElement): any {
    return {
      title: (container.querySelector('.recipe-title') as HTMLElement)?.textContent?.trim() || 'Untitled Recipe',
      ingredients: Array.from(container.querySelectorAll('.ingredient-item')).map((item: any) => ({
        name: item.querySelector('.ingredient-name')?.textContent?.trim(),
        quantity: item.querySelector('.ingredient-qty')?.textContent?.trim()
      }))
    };
  }

  private calculateRecipeScore(recipe: any): number {
    // Scoring logic based on ingredient/instruction completeness
    return 85;
  }

  public onPromptRequest = async (args: PromptRequestEventArgs): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (args.prompt === 'What is the weather in New York?') {
      this.recipeAIAssistView.addPromptResponse({
        blocks: [
          { blockType: 'text', content: 'Here is the current weather forecast for your location:' },
          { blockType: 'tool', toolName: 'weather-card' },
          { blockType: 'text', content: '**Scattered Showers Expected** with temperatures ranging from **1°C to -4°C**.' }
        ]
      });
      return;
    }

    if (args.prompt === 'Generate a score analysis for this recipe.') {
      this.recipeAIAssistView.addPromptResponse({ blocks: this.scoreBlocks });
      return;
    }

    if (args.prompt === 'Suggest a healthy breakfast recipe under 5 ingredients') {
      const mockRecipe = {
        title: 'Butter Toast',
        ingredients: [
          { name: 'Bread slices', quantity: '2' },
          { name: 'Butter', quantity: '1 tbsp' }
        ]
      };

      this.recipeAIAssistView.addPromptResponse({
        blocks: [
          { blockType: 'text', content: '**Here is your recipe!** Feel free to edit ingredients and steps, then click **Check Recipe Score**.' },
          { blockType: 'tool', toolName: 'recipe-maker', props: mockRecipe }
        ]
      });
    } else {
      this.recipeAIAssistView.addPromptResponse(
        'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.'
      );
    }
  };
}
```

---

## Best Practices

### 1. Register Tools Before Using Them in Responses

Always call `registerToolUI` (typically inside `ngAfterViewInit`) before any `addPromptResponse` call references that tool by name.

```ts
// ✅ Do
ngAfterViewInit(): void {
  this.registerTools();
}
```

### 2. Keep Tool Names Unique and Descriptive

```ts
// ✅ Do
toolName: 'recipe-score-gauge'

// ❌ Don't — ambiguous, may collide with other tools
toolName: 'tool1'
```

### 3. Validate AI-Returned JSON Before Rendering

When AI services generate `blocks` dynamically, wrap JSON parsing in a `try...catch` and fall back to a plain text response on failure, since malformed JSON should never break the conversation flow.

### 4. Use `props` for Data, Not Markup

Pass structured data via `props` and let the registered template handle rendering — avoid embedding HTML strings inside `props`.

---

## Troubleshooting

### Issue: Tool Block Not Rendering

**Cause:** The `toolName` referenced in the `tool` block was never registered, or was registered after the response was added.

**Solution:** Confirm `registerToolUI` is called with a matching `toolName` before `addPromptResponse` is invoked.

### Issue: Angular Template Tool Doesn't Bind Data

**Cause:** `props` were not passed in the `tool` block, or the template doesn't declare `let-data` to receive them.

**Solution:**
```html
<ng-template #myToolTemplate let-data>
  {{ data.someProp }}
</ng-template>
```

### Issue: AI-Generated Blocks Fail to Parse

**Cause:** The AI service returned text outside the expected JSON structure (e.g., extra commentary before/after the JSON).

**Solution:** Reinforce "Return ONLY valid JSON" in the system prompt, and always parse defensively with a fallback message on error.

---

## See Also

- [Chain of Thoughts](./chain-of-thoughts.md)
- [Prompt and response collection](https://ej2.syncfusion.com/angular/documentation/ai-assistview/assist-view#prompt-response-collection)
- [addPromptResponse method](https://ej2.syncfusion.com/angular/documentation/ai-assistview/methods#addpromptresponse)
