# Generative UI in Vue AI AssistView Component

The `Generative UI` feature in AI AssistView allows you to render dynamic tools and UI elements within the AI AssistView. This enables seamless integration of interactive components based on AI-generated responses.

## Table of Contents

- [Register Tools](#register-tools)
- [Add Tools in Prompt Responses](#add-tools-in-prompt-responses)
- [Configure AI for Generative UI Responses](#configure-ai-for-generative-ui-responses)
- [Tool Block Properties](#tool-block-properties)
- [Tool Registration API](#tool-registration-api)
- [Best Practices](#best-practices)

## Register Tools

You can register custom tools using the `registerToolUI` method. It accepts tool name as string values, template as string or function and optional handler function. Tools are invoked by their name within block responses added through `addPromptResponse` method.

> **Note:** Use the blockType as `tool` and provide the tool name with the required properties through props. Tool should be registered before adding in responses and tool name should be unique.

### Configure Tool Template and Handler

When registering a tool, you can configure its visual representation using template and optionally provide a handler function for custom behavior. The template defines the tool's UI, and the handler receives the container element and additional arguments for implementing interactive functionality.

## Add Tools in Prompt Responses

Use the `addPromptResponse` method to dynamically add tools to AI responses by passing the tool blocks in block response.

```vue
<template>
  <div id="register-tool"></div>
  <div class="score-gauge-panel e-card">
  <div class="score-gauge"></div>
</div>

</template>
<script setup>
import { onMounted } from 'vue'
import { AIAssistView } from '@syncfusion/ej2-interactive-chat'
import { enableRipple } from '@syncfusion/ej2-base'
import {CircularGauge,Annotations,GaugeTooltip,Legend} from '@syncfusion/ej2-circulargauge'

enableRipple(true)
CircularGauge.Inject(Annotations, GaugeTooltip, Legend)

let aiAssistView
let scoreBlocks = []

const weatherData = [
  { blockType: "text", content: "Here is the current weather forecast for your location:" },
  { blockType: "tool", toolName: "weather-card" },
  {
    blockType: "text",
    content: "**Scattered Showers Expected** with temperatures ranging from **1°C to -4°C**. There is a **100% chance of snow**."
  }
]

onMounted(() => {
  aiAssistView = new AIAssistView({
    promptSuggestions: [
      "Suggest a healthy breakfast recipe under 5 ingredients",
      "What is the weather in New York?"
    ],
    enableStreaming: true,
    prompts: [{ prompt: 'What is the weather in New York?', blocks: weatherData }],
    toolbarSettings: {
      items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
      itemClicked: toolbarItemClicked
    },
    promptRequest: onPromptRequest
  })

  registerTools()
  aiAssistView.appendTo('#register-tool')
})

/* -------------------- TOOL REGISTRATION -------------------- */
function registerTools() {

  aiAssistView.registerToolUI({
    toolName: 'weather-card',
    template: `
    <div tabindex="0" class="e-card">
        <div class="e-card-header">
            <div class="e-card-header-caption">
                <div class="e-card-header-title font-bold">Weather Report</div>
            </div>
        </div>
        <div class="e-card-header weather_report">
            <div class="e-card-header-caption">
                <div class="e-card-content"><i class="e-icons e-cloud"></i><b>Clouds</b> Overcast</div>
            </div>
        </div>
    </div>`
  })

  aiAssistView.registerToolUI({
    toolName: 'recipe-maker',
    template: recipeTemplate,
    handler: recipeHandler
  })

  aiAssistView.registerToolUI({
    toolName: 'recipe-score-gauge',
    template: recipeScoreGaugeTemplate,
    handler: gaugeHandler
  })
}

/* -------------------- RECIPE TEMPLATE -------------------- */
function recipeTemplate(args = {}) {
  const data = {
    title: "Custom Recipe",
    ingredients: [],
    instructions: [],
    ...args
  }

  return `
    <div class="recipe-panel e-card">
      <h2 class="recipe-title">${data.title}</h2>

      ${renderIngredients(data.ingredients)}
      ${renderInstructions(data.instructions)}

      <button class="e-btn e-primary check-score-btn">
        Check Recipe Score
      </button>
    </div>
  `
}

const renderIngredients = (ingredients) => `
  <div class="recipe-section">
    <div class="recipe-header">
      <h4>🥕 Ingredients</h4>
      <button class="e-btn e-primary e-small add-ingredient">Add Ingredient</button>
    </div>
    <div class="ingredients-list">
      ${ingredients.map(i => `
        <div class="ingredient-item">
          <span contenteditable="true">${i.name}</span>
          <span contenteditable="true">${i.quantity}</span>
          <button class="e-btn e-danger remove-ingredient">X</button>
        </div>`).join('')}
    </div>
  </div>
`

const renderInstructions = (steps) => `
  <div class="recipe-section">
    <div class="recipe-header">
      <h4>📋 Instructions</h4>
      <button class="e-btn e-primary e-small add-step">Add Step</button>
    </div>
    <div class="instructions-list">
      ${steps.map(s => `
        <div class="step-item">
          <span contenteditable="true">${s}</span>
          <button class="e-btn e-danger remove-step">X</button>
        </div>`).join('')}
    </div>
  </div>
`

/* -------------------- HANDLERS -------------------- */
function recipeHandler(container) {
  container.addEventListener('click', (e) => {
    const target = e.target

    if (target.classList.contains('add-ingredient')) {
      container.querySelector('.ingredients-list')
        .appendChild(getIngredientElement())
      return
    }

    if (target.classList.contains('add-step')) {
      container.querySelector('.instructions-list')
        .appendChild(getStepElement())
      return
    }

    if (target.classList.contains('remove-ingredient')) {
      target.closest('.ingredient-item')?.remove()
      return
    }

    if (target.classList.contains('remove-step')) {
      target.closest('.step-item')?.remove()
      return
    }

    if (target.classList.contains('check-score-btn')) {
      handleScoreCheck(container)
    }
  })
}

const getIngredientHTML = () => `
  <div class="ingredient-item">
    <span contenteditable="true">New Ingredient</span>
    <span contenteditable="true">qty</span>
    <button class="e-btn e-danger remove-ingredient">X</button>
  </div>
`

const getStepHTML = () => `
  <div class="step-item">
    <span contenteditable="true">New step...</span>
    <button class="e-btn e-danger remove-step">X</button>
  </div>
`

function handleScoreCheck(container) {
  const recipeData = getCurrentRecipeData(container)
  const score = calculateRecipeScore(recipeData)

  scoreBlocks = [
    {
      blockType: 'text',
      content: `**Recipe Score Analysis**\n\nHere is the score for **${recipeData.title}**.`
    },
    {
      blockType: 'tool',
      toolName: 'recipe-score-gauge',
      props: { score, title: recipeData.title }
    },
    {
      blockType: 'text',
      content: `💬 ${getScoreComment(score)}`
    }
  ]

  aiAssistView.executePrompt('Generate a score analysis for this recipe.')
}

/* -------------------- GAUGE -------------------- */
function recipeScoreGaugeTemplate(args) {
  return `<div class="score-gauge"><div>${args.score}/100</div></div>`
}

function gaugeHandler(container, args) {
  const score = args.score ?? 85
  const title = args.title ?? "Recipe Score"

  setTimeout(() => {
    const el = container.querySelector('.score-gauge')
    el.innerHTML = ''

    new CircularGauge({
      height: '320px',
      centerY: '50%',
      axes: [{
        startAngle: 0,
        endAngle: 360,
        type: 'ProgressBar',
        majorTicks: { interval: 10 },
        lineStyle: { width: 3 },
        ranges: [
          { start: 0, end: 33, color: '#FF5370' },
          { start: 33, end: 66, color: '#FFA500' },
          { start: 66, end: 100, color: '#52C41A' }
        ],
        pointers: [{ value: score, radius: '90%', type: 'Marker', markerShape: 'Circle' }],
        annotations: [{ content: `<div>${score}%</div>`, radius: '30%' }]
      }]
    }).appendTo(el)

  }, 100)
}

/* -------------------- UTILITIES -------------------- */
function getCurrentRecipeData(container) {
  return {
    title: container.querySelector('.recipe-title').textContent.trim(),
    ingredients: [...container.querySelectorAll('.ingredient-item')].map(i => ({
      name: i.children[0].textContent.trim(),
      quantity: i.children[1].textContent.trim()
    })),
    instructions: [...container.querySelectorAll('.step-item')]
      .map(i => i.children[0].textContent.trim())
  }
}

function calculateRecipeScore({ ingredients = [], instructions = [] }) {
  if (!ingredients.length) return 15
  if (!instructions.length) return 20

  let score = 100
  let validIng = ingredients.filter(i => i.name && i.quantity).length
  let validSteps = instructions.filter(Boolean).length

  score -= (ingredients.length - validIng) * 12
  score -= (instructions.length - validSteps) * 15

  score += validIng >= 5 ? 10 : (validIng === 1 ? -20 : validIng === 2 ? -10 : 0)
  score += validSteps >= 4 ? 10 :
           validSteps === 1 ? -25 :
           validSteps === 2 ? -15 :
           validSteps === 3 ? -5 : 0

  if (validIng >= 3 && validSteps >= 3) score += 8

  score += Math.floor(Math.random() * 6)

  return Math.min(100, Math.max(10, score))
}

function getScoreComment(score) {
  if (score >= 90) return "Outstanding recipe!"
  if (score >= 80) return "Very good recipe."
  if (score >= 70) return "Solid recipe."
  return "Needs improvement."
}

/* -------------------- PROMPTS -------------------- */
function onPromptRequest(args) {
  setTimeout(() => {

    if (args.prompt === "What is the weather in New York?")
      return aiAssistView.addPromptResponse({ blocks: weatherData })

    if (args.prompt === "Generate a score analysis for this recipe.")
      return aiAssistView.addPromptResponse({ blocks: scoreBlocks })

    if (args.prompt.includes("healthy breakfast")) {
      return aiAssistView.addPromptResponse({
        blocks: [
          { blockType: 'text', content: '## Healthy Breakfast Recipe\n\nHere is a simple recipe:' },
          {
            blockType: 'tool',
            toolName: 'recipe-maker',
            props: {
              title: 'Healthy Breakfast Bowl',
              ingredients: [
                { name: 'Oats', quantity: '1 cup' },
                { name: 'Honey', quantity: '1 tbsp' },
                { name: 'Berries', quantity: '1/2 cup' }
              ],
              instructions: [
                'Cook oats according to package instructions',
                'Top with fresh berries',
                'Drizzle honey and serve warm'
              ]
            }
          }
        ]
      })
    }

  }, 300)
}

/* -------------------- TOOLBAR -------------------- */
function toolbarItemClicked(args) {
  if (args.item.iconCss === 'e-icons e-refresh') {
    aiAssistView.prompts = []
  }
}
</script>
```

## Configure AI for Generative UI Responses

To integrate AI responses with tool-based rendering, you need to configure the AI service to return structured JSON blocks through system prompt. This ensures that AI-generated content is properly formatted and rendered as interactive tools or text blocks.

The following example demonstrates how to connect your AI service to generate and display dynamic UI components within the AI AssistView.

```html
<template>
  <div class="generative-aiassistview">
    <ejs-aiassistview ref="aiAssistViewRef" :enableStreaming="true" :promptSuggestions="suggestions" :promptRequest="onPromptRequest">
      <!-- Weather Tool Template -->
      <template v-slot:weatherTemplate>
        <div class="weather-card">
          <div>Current Weather</div>
        </div>
      </template>
    </ejs-aiassistview>
  </div>
</template>

<script>
import { AIAssistViewComponent } from "@syncfusion/ej2-vue-interactive-chat";

export default {
  components: {
    "ejs-aiassistview": AIAssistViewComponent
  },

  data() {
    return {
      suggestions: [
        "What is the weather today?",
        "Show me tomorrow's forecast",
        "Create a weather report"
      ],
      systemPrompt: `
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
      "toolName": "tool-name",
      "props": { }
    }
  ]
}

Rules:
1. Always return a single "blocks" array.
2. Return ONLY valid JSON.
3. You may return ANY number of blocks.
4. For weather queries, use toolName "weather-tool".
`
    };
  },

  mounted() {
    const inst = this.$refs.aiAssistViewRef.ej2Instances;

    // Register Weather Tool
    inst.registerToolUI({
      toolName: "weather-tool",
      template: "weatherTemplate"
    });
  },

  methods: {
    async onPromptRequest(args) {
      const inst = this.$refs.aiAssistViewRef.ej2Instances;

      try {
        // Call your AI service with the system prompt
        const response = await fetch('https://your-ai-service.com/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: args.prompt,
            systemPrompt: this.systemPrompt
          })
        });

        const data = await response.json();
        const parsedBlocks = JSON.parse(data.response);

        // Add response with tool blocks
        inst.addPromptResponse({ blocks: parsedBlocks.blocks });
      } catch (error) {
        inst.addPromptResponse('Error generating response. Please try again.');
      }
    }
  }
};
</script>

<style>

@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";

.generative-aiassistview {
  height: 600px;
  width: 65vw;
  margin: 0 auto;
}
</style>

```

## Tool Block Properties

When adding tools to responses via `addPromptResponse`, use the following block structure:

| Property | Type | Description |
|---|---|---|
| `blockType` | `'tool'` | Identifies this block as a tool block. Required. |
| `toolName` | `string` | Name of the registered tool to render. Tool must be registered before use. Required. |
| `props` | `object` | Props/data passed to the tool's template and handler function. Optional. |
| `id` | `string` | Unique identifier for the block. Auto-generated if not provided. |

## Tool Registration API

### registerToolUI Method

Register a custom tool with the AI AssistView:

```ts
aiAssistView.registerToolUI({
  toolName: string,           // Unique tool identifier
  template: string | function, // HTML string or function returning HTML
  handler?: function          // Optional handler function for interactions
});
```

### Template Function

Template can be a string or function:

```ts
// String template
registerToolUI({
  toolName: 'my-tool',
  template: '<div>Static HTML</div>'
});

// Function template (receives props)
registerToolUI({
  toolName: 'my-tool',
  template: (props) => {
    return `<div>${props.title}</div>`;
  }
});
```

### Handler Function

Optional handler function for interactive tools:

```ts
function myToolHandler(container, args) {
  // container: DOM element where tool is rendered
  // args: contains the props passed to the tool
  
  container.addEventListener('click', (e) => {
    // Handle interactions
  });
}

registerToolUI({
  toolName: 'my-tool',
  template: '...',
  handler: myToolHandler
});
```

## Best Practices

1. **Register tools early** - Register all tools before adding them to responses
2. **Use unique tool names** - Each tool should have a unique identifier
3. **Keep props simple** - Pass only necessary data to tool props
4. **Handle errors gracefully** - Check for errors in AI service responses
5. **Validate JSON** - Ensure AI-generated JSON blocks are valid before rendering
6. **Use meaningful tool names** - Name tools descriptively for clarity
7. **Document tool props** - Document what props each tool expects
8. **Clean up event listeners** - Remove listeners in tool handlers to prevent memory leaks
