# Chain of Thoughts in Vue AI AssistView Component

The AI AssistView supports rendering **Chain of Thoughts** (also called `Thinking`) blocks, allowing you to visualize the model's reasoning process step by step before the final response is generated. The injectable module is ideal for extended reasoning models (such as Claude 3.5, GPT‑o1, and similar), which expose intermediate reasoning stages.

> The `AssistThinking` module should be injected into the AIAssistView using the `provide` function to utilize this support.

## Table of Contents

- [Enabling Thinking Blocks](#enabling-thinking-blocks)
- [Types of Response Blocks](#types-of-response-blocks)
- [Configure the Thinking Block](#configure-the-thinking-block)
- [Adding Stages](#adding-stages)
- [Adding Context Items](#adding-context-items)
- [Configure editableContextClicked Event](#configure-editablecontextclicked-event)
- [Configure Thinking Block Template](#configure-thinking-block-template)
- [Configure Item Template](#configure-item-template)
- [Best Practices](#best-practices)

## Enabling Thinking Blocks

To enable thinking block support, inject the `AssistThinking` module:

**Composition API (`<script setup>`):**

```js
provide('aiassistview', [AssistThinking]);
```

## Types of Response Blocks

A single response may contain `Thinking`, `Text`, and `tool` blocks in the `blocks` array. The component renders them in the order they appear. Below are the available types of the response blocks.

| Block Type | Description |
|---|---|
| `TextBlock` | Standard text content rendered as markdown |
| `ToolBlock` | Interactive tool or UI component block |
| `ThinkingBlock` | Reasoning/thinking process visualization with stages |

## Configure the Thinking Block

You can use the `Thinking` block type in the blocks array of the `addPromptResponse` method to dynamically push blocks including thinking blocks into the component at runtime. Pass an object containing a blocks array, and set the second argument `isFinalUpdate` to false during streaming and true for the final update.

> When only `blocks` are provided (no `response` text), the component will render the blocks directly and skip the default text-response rendering path. When both `blocks` and `response` are provided, the blocks are rendered first followed by the response text.

### Thinking Block Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `id` | `string` | auto-generated | Unique identifier for the block, used for collapsing/expanding state. |
| `blockType` | `'thinking'` | — | Identifies this block as a thinking block. Required. |
| `title` | `string` | `'Thinking...'` | Heading text shown in the collapsible header. |
| `content` | `string` | — | Markdown text rendered as a description beneath the stages. |
| `isActive` | `boolean` | `false` | When `true`, a Syncfusion spinner is shown inside the thinking header to indicate the reasoning is still in progress. |
| `collapsed` | `boolean` | `true` | Initial collapsed state of the thinking block. |
| `collapsible` | `boolean` | `true` | Whether the block can be expanded or collapsed by the user. |
| `stages` | `ThinkingStage[]` | — | Array of reasoning stages rendered using the Timeline component. |

### Basic Example

```vue
<template>
  <div id='container'>
    <ejs-aiassistview id='aiAssistView' :prompts="prompts" :prompt-request="onPromptRequest" ref="aiAssistViewRef"></ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview, AssistThinking } from "@syncfusion/ej2-vue-interactive-chat";
import { ref, provide } from "vue";

// Provide modules
provide('aiassistview', [AssistThinking]);

// Template ref
const aiAssistViewRef = ref(null);

// Prompts data directly
const prompts = [
  {
    prompt: 'What is AI?',
    response: 'AI stands for Artificial Intelligence...'
  }
];

// Handle prompt request
const onPromptRequest = () => {
  setTimeout(() => {
    aiAssistViewRef.value.ej2Instances.addPromptResponse({
      blocks: [
        {
          blockType: 'thinking',
          title: 'Analyzing Question',
          stages: [
            { id: '1', content: 'Understanding the user query', status: 'completed' },
            { id: '2', content: 'Formulating response structure', status: 'completed' }
          ]
        },
        {
          blockType: 'text',
          content: 'AI is a field of computer science...'
        }
      ]
    });
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>

```

## Adding Stages

Each entry in the `stages` array represents a single reasoning step. Below are the list of available stages property.

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier for the stage. |
| `content` | `string` | Markdown content for this stage. Supports `{index}` placeholders for inline context items. |
| `status` | `'completed'` \| `'inprogress'` \| `'failed'` | Controls the icon/spinner shown on the timeline dot. |
| `iconCss` | `string` | Custom CSS class for the timeline dot icon, overrides the default status icon. |
| `editableContext` | `ThinkingContextItem[]` | Inline context items injected into the stage content via `{index}` placeholders. |

### Stage Status Indicators

Each thinking stage will carry a `status` value that controls the visual indicator on its timeline dot:

- **`completed`** — renders a check icon (`e-check`).
- **`inprogress`** — renders an animated spinner.
- **`failed`** — renders an error/cross icon (`e-error-treeview`).

Use this to reflect real-time reasoning progress when streaming multi-step responses.

```vue
<template>
  <div id='container'>
    <ejs-aiassistview id='aiAssistView' :prompt-request="onPromptRequest" ref="aiAssistViewRef"></ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview, AssistThinking } from "@syncfusion/ej2-vue-interactive-chat";
import { ref, provide } from "vue";

const aiAssistViewRef = ref(null);

provide('aiassistview', [AssistThinking]);

const suggestions = [
  'Build a modern dashboard for my business',
  'Create a login system with Vue',
  'Make a task management board'
];

const onPromptRequest = () => {
  const inst = aiAssistViewRef.value.ej2Instances;
  setTimeout(() => {
    inst.addPromptResponse({
      blocks: [
        {
          blockType: 'thinking',
          title: 'Reasoning Process',
          stages: [
            {
              id: 'stage-1',
              content: 'Analyzing requirements and specifications',
              status: 'completed'
            },
            {
              id: 'stage-2',
              content: 'Designing system architecture',
              status: 'completed'
            },
            {
              id: 'stage-3',
              content: 'Implementing code structure',
              status: 'inprogress'
            },
            {
              id: 'stage-4',
              content: 'Testing and optimization',
              status: 'inprogress'
            }
          ]
        },
        {
          blockType: 'text',
          content: '## Dashboard Implementation\n\nHere is your dashboard solution...'
        }
      ]
    });
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

## Adding Context Items

You can use inline context items which are optionally clickable badges, that appear inline within the stage content. They are defined in the `editableContext` array of a `ThinkingStage` and are injected into the `content` string using `{index}` placeholders, which is the zero-based position in the `editableContext` array.

### Context Item Properties

Each context item is described by the below available `ThinkingContextItem` properties:

| Property | Type | Description |
|---|---|---|
| `name` | `string` | Display label of the context badge. |
| `type` | `'file'` \| `'variable'` \| `'search'` \| `'tool'` \| `'result'` \| `'context'` | Determines the badge icon and CSS class. |
| `tooltipText` | `string` | Tooltip shown on hover. |
| `clickable` | `boolean` | When `true`, clicking the badge fires the `editableContextClicked` event. |
| `badge` | `ThinkingContextBadge` | Status badge appended to the item: `'success'`, `'warning'`, `'failed'`, `'pending'`, `'info'`, or `'none'`. |

### Context Item Example

```vue
<template>
  <div id='container'>
    <ejs-aiassistview id='aiAssistView' :prompt-request="onPromptRequest" ref="aiAssistViewRef"></ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview, AssistThinking } from "@syncfusion/ej2-vue-interactive-chat";
import { ref, provide } from "vue";

const aiAssistViewRef = ref(null);

provide('aiassistview', [AssistThinking]);

const suggestions = [
  'Build a modern dashboard for my business',
  'Create a login system with Vue',
  'Make a task management board'
];

const onPromptRequest = () => {
  const inst = aiAssistViewRef.value.ej2Instances;
  setTimeout(() => {
    inst.addPromptResponse({
      blocks: [
        {
          blockType: 'thinking',
          title: 'Analysis in Progress',
          stages: [
            {
              id: 'stage-1',
              content: 'Searching through {0} for best practices',
              status: 'completed',
              editableContext: [
                {
                  name: 'Vue Docs',
                  type: 'search',
                  badge: 'success',
                  clickable: true,
                  tooltipText: 'Found 45 relevant results'
                }
              ]
            },
            {
              id: 'stage-2',
              content: 'Loading {0} from database',
              status: 'completed',
              editableContext: [
                {
                  name: 'dashboard-schema.sql',
                  type: 'file',
                  badge: 'pending',
                  clickable: true,
                  tooltipText: 'Preview database schema'
                }
              ]
            },
            {
              id: 'stage-3',
              content: 'Processing {0} configuration',
              status: 'inprogress',
              editableContext: [
                {
                  name: 'theme-config',
                  type: 'variable',
                  badge: 'info',
                  clickable: true,
                  tooltipText: 'View configuration options'
                }
              ]
            }
          ]
        },
        {
          blockType: 'text',
          content: 'Building your dashboard with optimal configurations...'
        }
      ]
    });
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

## Configure editableContextClicked Event

The `editableContextClicked` event fires when a user clicks on an inline context item whose `clickable` property is `true`. Use this event to open a file preview, navigate to a source, or perform any custom action.

| Event argument | Type | Description |
|---|---|---|
| `event` | `Event` | The underlying browser click event. |
| `contextItem` | `ThinkingContextItem` | The context item that was clicked, including all its configured properties. |

```ts
aiAssistView.editableContextClicked = (args) => {
    if (args.contextItem.type === 'file') {
        // Open file preview
        console.log('File clicked:', args.contextItem.name);
    }
};
```

## Configure Thinking Block Template

You can use the `blockTemplate` property, to customize the thinking block rendering. The template receives a context object with the following properties:

| Context property | Type | Description |
|---|---|---|
| `block` | `ThinkingBlock` | The full thinking block model. |
| `blockIndex` | `number` | Zero-based index of this block in the `blocks` array. |

```vue
<template>
  <div id='container'>
    <ejs-aiassistview id='aiAssistView' :prompt-request="onPromptRequest" :blockTemplate="blockTemplate" ref="aiAssistViewRef"></ejs-aiassistview>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview, AssistThinking } from "@syncfusion/ej2-vue-interactive-chat";
import { ref, provide } from "vue";

// Provide modules
provide('aiassistview', [AssistThinking]);

// Template ref
const aiAssistViewRef = ref(null);

// Block template function
const blockTemplate = (data) => {
  const block = data.block;
  return `
    <div class="custom-thinking-block">
      <h3>${block.title || 'Thinking...'}</h3>
      <p>Processing ${block.stages?.length || 0} stages</p>
    </div>
  `;
};

// Prompts data directly
const prompts = [
  {
    prompt: 'What is AI?',
    response: 'AI stands for Artificial Intelligence...'
  }
];

// Handle prompt request
const onPromptRequest = () => {
  setTimeout(() => {
    aiAssistViewRef.value.ej2Instances.addPromptResponse({
      blocks: [
        {
          blockType: 'thinking',
          title: 'Analyzing Question',
          stages: [
            { id: '1', content: 'Understanding the user query', status: 'completed' },
            { id: '2', content: 'Formulating response structure', status: 'completed' }
          ]
        },
        {
          blockType: 'text',
          content: 'AI is a field of computer science...'
        }
      ]
    });
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

> When `blockTemplate` is set, the default collapsible header, spinner, and Timeline rendering are completely replaced by your template. Collapse/expand behavior and spinner life cycle management must be handled within the template itself.

## Configure Item Template

You can use the `itemTemplate` property to add individual thinking stages inside the Timeline. This property applies to every stage item within all thinking blocks.

### Item Template Context

The template context for each stage item exposes:

| Property | Description |
|---|---|
| `item` | Contains `content`, `cssClass`, `disabled`, `dotCss`, and `oppositeContent` properties of the timeline stage item. |
| `itemIndex` | Current item index in the timeline. |

```vue
<template>
  <div id='container'">
    <ejs-aiassistview id='aiAssistView' :prompt-request="onPromptRequest" :itemTemplate="stageItemTemplate" ref="aiAssistView"></ejs-aiassistview>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { AIAssistViewComponent, AssistThinking } from "@syncfusion/ej2-vue-interactive-chat";

// Provide AssistThinking module
provide('aiassistview', [AssistThinking]);

// Ref for component instance
const aiAssistView = ref(null);

// Prompts data
const prompts = ref([
  {
    prompt: 'Build a dashboard',
    response: 'I will help you build a dashboard...'
  }
]);

// Stage item template method
const stageItemTemplate = (data) => {
  const item = data.item;
  return `
    <div class="custom-stage-item">
      <div>${item.content}</div>
    </div>
  `;
};

// Prompt request handler
const onPromptRequest = () => {
  setTimeout(() => {
    aiAssistView.value.ej2Instances.addPromptResponse({
      blocks: [
        {
          blockType: 'thinking',
          stages: [
            { id: '1', content: 'Analyzing requirements', status: 'completed' },
            { id: '2', content: 'Designing interface', status: 'completed' }
          ]
        }
      ]
    });
  }, 1000);
};
</script>

<style scoped>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

## Best Practices

1. **Use meaningful stage titles** - Make each stage clearly describe what reasoning is happening
2. **Set appropriate status** - Use `'inprogress'` during streaming, `'completed'` when done, `'failed'` for errors
3. **Keep stages concise** - Each stage should represent one clear reasoning step
4. **Use context items for clarity** - Add badges and context to explain data being processed
5. **Group related blocks** - Place thinking blocks before their corresponding text results
6. **Handle streaming correctly** - Use `isFinalUpdate: false` during streaming, `true` on completion
