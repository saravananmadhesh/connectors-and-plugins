# Generative UI in React AI AssistView Component

The **Generative UI** feature in AI AssistView allows you to render dynamic tools and UI elements (charts, cards, custom components) directly within AI responses. This enables seamless integration of interactive components based on AI-generated responses.

## Table of Contents
- [Register Tools](#register-tools)
- [Configure Tool Template and Handler](#configure-tool-template-and-handler)
- [Add Tools in Prompt Responses](#add-tools-in-prompt-responses)
- [Configure AI for Generative UI Responses](#configure-ai-for-generative-ui-responses)

## Register Tools

You can register custom tools using the [registerToolUI](../api/ai-assistview#registertoolui) method. It accepts tool name as string values, template and optional handler function. Tools are invoked by their name within block responses added through `addPromptResponse` method.

> **Note:** Use the blockType as `tool` and provide the tool name with the required properties through `props`. Tool should be registered before adding in responses and tool name should be unique.

### registerToolUI Method

The `registerToolUI` method registers a custom tool template for rendering within responses:

| Parameter | Type | Description |
|---|---|---|
| `toolName` | `string` | Unique identifier for the tool. Used in block responses via `toolName` property. |
| `template` | React component | React component function that renders the tool UI. Receives tool props as arguments. |

## Configure Tool Template and Handler

When registering a tool, you can configure how it appears by specifying a template and implement its behavior through a handler function. The template controls the UI layout, while the handler is provided with the container element and any additional actions needed to enable interactive functionality.

### Weather Card Tool Template

```tsx
const WeatherCardTemplate = () => (
  <div tabIndex={0} className="e-card" id="weather_card" role="button">
    <div className="e-card-header">
      <div className="e-card-header-caption">
        <div className="e-card-header-title">Today</div>
        <div className="e-card-sub-title">New York - Scattered Showers.</div>
      </div>
    </div>
    <div className="e-card-header weather_report">
      <div className="e-card-header-image"></div>
      <div className="e-card-header-caption">
        <div className="e-card-header-title">1º / -4º</div>
        <div className="e-card-sub-title">Chance for snow: 100%</div>
      </div>
    </div>
  </div>
);
```

### Recipe Score Gauge Tool Template

```tsx
const RecipeScoreTemplate = (args: any) => (
  <div className="score-gauge-panel" style={{ padding: '20px', background: '#f8f9fa', borderRadius: '12px', textAlign: 'center' }}>
    <h4 style={{ marginBottom: '15px' }}>{args.title}</h4>
    <CircularGaugeComponent
      height="380px"
      width="380px"
      title={args.title}
      allowMargin={false}
      titleStyle={{ size: '18px', fontFamily: 'inherit' }}
      tooltip={{ enable: true }}
    >
      <AxesDirective>
        <AxisDirective
          startAngle={270} endAngle={90}
          minimum={0} maximum={10} radius="105%"
          lineStyle={{ width: 0 }}
          majorTicks={{ height: 12, width: 1.5, interval: 2, offset: 35 }}
          minorTicks={{ height: 0 }}
          labelStyle={{ font: { size: '12px' }, position: 'Outside', offset: -40 }}
        >
          <AnnotationsDirective>
            <AnnotationDirective
              content={`<div style="font-size:22px; margin-top:15px; font-family:inherit;">${args.score}</div>`}
              angle={0}
              zIndex="1"
              radius="-10%"
            />
          </AnnotationsDirective>
          <PointersDirective>
            <PointerDirective
              radius="70%"
              needleEndWidth={2}
              pointerWidth={5}
              value={args.score / 10}
              cap={{ radius: 8, border: { width: 2 } }}
            />
          </PointersDirective>
          <RangesDirective>
            <RangeDirective start={0} end={2} startWidth={40} endWidth={40} color="#F03E3E" radius="80%" />
            <RangeDirective start={2} end={5} startWidth={40} endWidth={40} color="#f6961e" radius="80%" />
            <RangeDirective start={5} end={8} startWidth={40} endWidth={40} color="#FFDD00" radius="80%" />
            <RangeDirective start={8} end={10} startWidth={40} endWidth={40} color="#30B32D" radius="80%" />
          </RangesDirective>
        </AxisDirective>
      </AxesDirective>
    </CircularGaugeComponent>
    <div style={{ fontSize: '2.4em', fontWeight: 'bold', color: '#30B32D', margin: '10px 0' }}>
      {args.score}/100
    </div>
    <p style={{ color: '#555' }}>{getScoreComment(args.score)}</p>
  </div>
);
```

### Recipe Maker Interactive Tool Template

```tsx
const RecipeMakerTemplate = useCallback((args: any) => {
  const handleAddIngredient = (e: React.MouseEvent) => {
    const container = (e.currentTarget as HTMLElement).closest('.recipe-panel') as HTMLElement;
    const list = container.querySelector('.ingredients-list') as HTMLElement;
    const newItem = document.createElement('div');
    newItem.className = 'ingredient-item';
    newItem.innerHTML = `
      <span class="ing-name" contenteditable="true" style="flex:1;">New Ingredient</span>
      <span class="ing-qty" contenteditable="true" style="width:90px; text-align:right;">qty</span>
      <button class="e-btn e-small e-danger remove-ing e-icons e-close"></button>`;
    list.appendChild(newItem);
  };

  const handleAddStep = (e: React.MouseEvent) => {
    const container = (e.currentTarget as HTMLElement).closest('.recipe-panel') as HTMLElement;
    const list = container.querySelector('.instructions-list') as HTMLElement;
    const index = list.children.length + 1;
    const newItem = document.createElement('div');
    newItem.className = 'step-item';
    newItem.innerHTML = `
      <strong>${index}.</strong>
      <span class="step-text" contenteditable="true" style="flex:1;">New instruction step...</span>
      <button class="e-btn e-small e-danger remove-step e-icons e-close"></button>`;
    list.appendChild(newItem);
  };

  const handleRemoveItem = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('remove-ing') || target.classList.contains('remove-step')) {
      target.parentElement?.remove();
    }
  };

  const handleCheckScore = (e: React.MouseEvent) => {
    const container = (e.currentTarget as HTMLElement).closest('.recipe-panel') as HTMLElement;
    const recipeData = getCurrentRecipeData(container);
    const score = calculateRecipeScore(recipeData);

    scoreBlocksRef.current = [
      { blockType: 'text', content: `**Recipe Score Analysis**\n\nHere is the health & quality score for **${recipeData.title}**.` },
      { blockType: 'tool', toolName: 'recipe-score-gauge', props: { score, title: recipeData.title } },
      { blockType: 'text', content: 'You can continue editing the recipe above and check the score again anytime.' }
    ];

    assistInstance.current?.executePrompt('Generate a score analysis for this recipe.');
  };

  return (
    <div className="recipe-panel">
      <h2 className="recipe-title" contentEditable suppressContentEditableWarning>{args.title}</h2>

      <div className="recipe-section">
        <h4>🥕 Ingredients
          <button className="e-btn e-primary e-small" style={{ float: 'right' }} onClick={handleAddIngredient}>+ Add Ingredient</button>
        </h4>
        <div className="ingredients-list" onClick={handleRemoveItem}>
          {args.ingredients?.map((ing: any, i: number) => (
            <div className="ingredient-item" key={i}>
              <span className="ing-name">{ing.name}</span>
              <span className="ing-qty">{ing.quantity}</span>
              <button className="e-btn e-small e-danger remove-ing e-icons e-close"></button>
            </div>
          ))}
        </div>
      </div>

      <div className="recipe-section">
        <h4>📋 Instructions
          <button className="e-btn e-primary e-small" style={{ float: 'right' }} onClick={handleAddStep}>+ Add Step</button>
        </h4>
        <div className="instructions-list" onClick={handleRemoveItem}>
          {args.instructions?.map((step: string, i: number) => (
            <div className="step-item" key={i}>
              <strong>{i + 1}.</strong>
              <span className="step-text">{step}</span>
              <button className="e-btn e-small e-danger remove-step e-icons e-close"></button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button className="e-btn e-primary check-score-btn" onClick={handleCheckScore}>Check Recipe Score</button>
      </div>
    </div>
  );
}, []);
```

## Add Tools in Prompt Responses

Use the [addPromptResponse](../api/ai-assistview#addpromptresponse) method to dynamically add tools to AI responses by passing the `blocks` array. Each block can be of type `text` or `tool`.

### Block Types

| Block Type | Description |
|---|---|
| `text` | Markdown text content rendered as formatted response |
| `tool` | Interactive tool/component rendered via registered template |

### Tool Block Properties

| Property | Type | Description |
|---|---|---|
| `blockType` | `'tool'` | Identifies this block as a tool block |
| `toolName` | `string` | Name of the registered tool to render |
| `props` | `object` | Properties passed to the tool template |

### Example: Prompt Response with Tools

```tsx
const onPromptRequest = async (args: PromptRequestEventArgs) => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (args.prompt === 'What is the weather in New York?') {
    assistInstance.current?.addPromptResponse({
      blocks: [
        { blockType: 'text', content: 'Here is the current weather forecast for your location:' },
        { blockType: 'tool', toolName: 'weather-card' },
        {
          blockType: 'text',
          content: "**Scattered Showers Expected** with temperatures ranging from **1°C to -4°C**. There is a **100% chance of snow**, so it's recommended to bundle up and exercise caution if traveling. The weather system is expected to continue throughout the day with moderate precipitation."
        }
      ]
    });
    return;
  }

  if (args.prompt === 'Generate a score analysis for this recipe.') {
    assistInstance.current?.addPromptResponse({ blocks: scoreBlocksRef.current });
    return;
  }

  if (args.prompt === 'Suggest a healthy breakfast recipe under 5 ingredients') {
    const mockRecipe = {
      title: 'Butter Toast',
      ingredients: [
        { name: 'Bread slices', quantity: '2' },
        { name: 'Butter', quantity: '1 tbsp' },
        { name: 'Sugar', quantity: '1 tsp' }
      ],
      instructions: [
        'Spread butter on bread slices',
        'Toast until golden and sprinkle sugar on top'
      ]
    };

    assistInstance.current?.addPromptResponse({
      blocks: [
        { blockType: 'text', content: '**Here is your recipe!** Feel free to edit ingredients and steps, then click **Check Recipe Score**.' },
        { blockType: 'tool', toolName: 'recipe-maker', props: mockRecipe }
      ]
    });
    return;
  }

  assistInstance.current?.addPromptResponse('For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.');
};
```

## Configure AI for Generative UI Responses

You can configure the AI service to return structured JSON blocks through a `system prompt`. This ensures that AI-generated content is properly formatted and rendered as interactive tools or text blocks.

### System Prompt Configuration

```tsx
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

### AI Service Integration Example

```tsx
import React, { useRef } from 'react';
import { AIAssistViewComponent } from '@syncfusion/ej2-react-interactive-chat';

export default function App() {
  const aiAssistViewRef = useRef(null);

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

  const weatherTemplate = (args) => {
    return (
      <div tabIndex={0} className="e-card" id="weather_card" role="button">
        <div className="e-card-header">
          <div className="e-card-header-caption">
            <div className="e-card-header-title">{args.location}</div>
            <div className="e-card-sub-title">{args.temperature}</div>
          </div>
        </div>
      </div>
    );
  };

  const onPromptRequest = async (args) => {
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

      const message = reply.output.find((item) => item.type === 'message');
      const jsonText = (message && message.content && message.content[0] && message.content[0].text) || '{}';
      const aiData = JSON.parse(jsonText);

      if (aiAssistViewRef.current) {
        aiAssistViewRef.current.addPromptResponse({ blocks: aiData.blocks });
      }

    } catch (error) {
      if (aiAssistViewRef.current) {
        aiAssistViewRef.current.addPromptResponse("We could not reach the AI service; please try again later.");
      }
    }
  };

  return (
    <AIAssistViewComponent
      ref={aiAssistViewRef}
      promptRequest={onPromptRequest}
      toolRegistration={() => {
        if (aiAssistViewRef.current) {
          aiAssistViewRef.current.registerToolUI({
            toolName: 'weather-tool',
            template: weatherTemplate
          });
        }
      }}
    />
  );
}
```

### Complete Working Example with All Tools

Register all three tools and handle different prompt requests:

```tsx
const onCreated = () => {
  assistInstance.current?.registerToolUI({ toolName: 'recipe-maker', template: RecipeMakerTemplate });
  assistInstance.current?.registerToolUI({ toolName: 'recipe-score-gauge', template: RecipeScoreTemplate });
  assistInstance.current?.registerToolUI({ toolName: 'weather-card', template: WeatherCardTemplate });

  if (assistInstance.current) {
    assistInstance.current.prompts = promptsData;
  }
};

const toolbarSettings: ToolbarSettingsModel = {
  items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
  itemClicked: (args: ToolbarItemClickedEventArgs) => {
    if (args.item.iconCss === 'e-icons e-refresh') {
      if (assistInstance.current) {
        assistInstance.current.prompts = [];
        assistInstance.current.promptSuggestions = promptSuggestions;
      }
    }
  }
};
```

---

## Best Practices

**Tool Registration**: Register all tools in the `created` event before they're needed in responses  
**Unique Names**: Use descriptive, unique tool names to avoid conflicts  
**Props Validation**: Validate tool props in templates to handle missing or invalid data  
**Block Structure**: Combine text and tool blocks for rich, interactive responses  
**AI Configuration**: Use clear system prompts to ensure AI generates valid block structures

