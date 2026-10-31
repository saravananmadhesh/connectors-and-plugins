# Chain of Thoughts (Thinking Blocks)

## Table of Contents
- [Overview](#overview)
- [Enabling Thinking Support](#enabling-thinking-support)
- [Response Block Types](#response-block-types)
- [Configure the Thinking Block](#configure-the-thinking-block)
- [Adding Stages](#adding-stages)
  - [Adding Stage Status](#adding-stage-status)
  - [Adding Context Items](#adding-context-items)
- [Configure editableContextClicked Event](#configure-editablecontextclicked-event)
- [Configure Thinking Block Template](#configure-thinking-block-template)
- [Configure Item Template](#configure-item-template)
- [Summary](#summary)

This guide covers rendering Chain of Thoughts (also called "Thinking") blocks in the AI AssistView component, which visualize a model's reasoning process step by step before the final response is generated.

---

## Overview

The AI AssistView supports rendering **Chain of Thoughts** blocks through the injectable `AssistThinking` module. This is ideal for extended reasoning models (such as Claude, GPT-o1, and similar) that expose intermediate reasoning stages before producing a final answer.

Thinking blocks are added through the `blocks` array on a `PromptModel`, alongside the existing `response` text field. Each block can hold multiple `stages`, which render using the Timeline component and support dynamic, real-time status updates (`inprogress`, `completed`, `failed`) — making the module well suited for streaming reasoning traces.

---

## Enabling Thinking Support

### Module Injection

The `AssistThinking` module must be injected into the AI AssistView using `AIAssistView.Inject()` before thinking blocks can be rendered.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

AIAssistView.Inject(AssistThinking);
```

> If the module isn't injected, `blocks` of type `thinking` will not render.

---

## Response Block Types

A single response can contain multiple block types within the `blocks` array, rendered in the order they appear:

- **`thinking`** — A collapsible reasoning block containing one or more stages, rendered via the Timeline component.
- **`text`** — A plain text block.
- **`tool`** — A block representing a tool invocation or tool execution result.

> When only `blocks` are provided (no `response` text), the component renders the blocks directly and skips the default text-response rendering path. When both `blocks` and `response` are provided, the blocks render first, followed by the response text.

---

## Configure the Thinking Block

Use the `Thinking` block type within the `blocks` array of the `addPromptResponse()` method to dynamically push thinking blocks into the component at runtime. Pass an object containing a `blocks` array, and set the second argument `isFinalUpdate` to `false` while streaming and `true` on the final update.

### ThinkingBlock Properties

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

```typescript
import { AIAssistView, AssistThinking } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

AIAssistView.Inject(AssistThinking);

let aiAssistView: AIAssistView = new AIAssistView({
    prompts: [
        {
            prompt: 'Explain the water cycle.',
            response: 'The water cycle describes how water moves continuously through the environment via evaporation, condensation, and precipitation.',
            blocks: [
                {
                    blockType: 'thinking',
                    title: 'Reasoning',
                    collapsed: true,
                    collapsible: true,
                    isActive: false,
                    stages: [
                        { id: 'step1', status: 'completed', content: 'Identified request as a water cycle explanation.' },
                        { id: 'step2', status: 'completed', content: 'Summarized key stages concisely.' },
                        { id: 'step3', status: 'completed', content: 'Composed a clear single-paragraph response.' }
                    ]
                }
            ]
        }
    ],
    promptRequest: () => {
        setTimeout(() => {
            aiAssistView.addPromptResponse({
                blocks: [],
                response: 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.'
            }, true);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

**Use cases:**
- Visualize step-by-step reasoning for extended-thinking / chain-of-thought models
- Preload demo conversations that show a reasoning trail before the final answer
- Distinguish "thinking" content from the final response visually

---

## Adding Stages

Each entry in a thinking block's `stages` array represents a single reasoning step.

### ThinkingStage Properties

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier for the stage. |
| `content` | `string` | Markdown content for this stage. Supports `{index}` placeholders for inline context items. |
| `status` | `'completed'` \| `'inprogress'` \| `'failed'` | Controls the icon/spinner shown on the timeline dot. |
| `iconCss` | `string` | Custom CSS class for the timeline dot icon; overrides the default status icon. |
| `editableContext` | `ThinkingContextItem[]` | Inline context items injected into the stage content via `{index}` placeholders. |

### Adding Stage Status

Each thinking stage carries a `status` value that controls the visual indicator on its timeline dot:

- **`completed`** — renders a check icon (`e-check`).
- **`inprogress`** — renders an animated spinner.
- **`failed`** — renders an error/cross icon (`e-error-treeview`).

Use this to reflect real-time reasoning progress when streaming multi-step responses — update a stage from `inprogress` to `completed` (or `failed`) as each reasoning step resolves, and reveal new stages/blocks as the model progresses.

#### Streaming Stage Status Example

```typescript
import { AIAssistView, AssistThinking, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

AIAssistView.Inject(AssistThinking);

let aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: [
        'Build a modern dashboard for my business',
        'Create a login page with validation',
        'Make a task management board'
    ],
    promptRequest: (args: PromptRequestEventArgs) => {
        // Step 1: first stage starts
        setTimeout(() => {
            aiAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: 'thinking',
                        title: 'Understanding your request',
                        collapsible: true,
                        collapsed: false,
                        isActive: true,
                        stages: [
                            {
                                id: 'step1',
                                status: 'inprogress',
                                content: 'Identified request as a business dashboard requirement.'
                            }
                        ]
                    }
                ]
            }, false);

            // Step 2: first stage completes, second block starts
            setTimeout(() => {
                aiAssistView.addPromptResponse({
                    blocks: [
                        {
                            blockType: 'thinking',
                            title: 'Understanding your request',
                            collapsible: true,
                            collapsed: true,
                            isActive: false,
                            stages: [
                                { id: 'step1', status: 'completed', content: 'Identified request as a business dashboard requirement.' }
                            ]
                        },
                        {
                            blockType: 'thinking',
                            title: 'Selecting UI components',
                            collapsible: true,
                            collapsed: false,
                            isActive: true,
                            stages: [
                                { id: 'step2', status: 'inprogress', content: 'Selecting the best UI components for the dashboard.' }
                            ]
                        }
                    ]
                }, false);

                // Step 3: final response with all stages completed
                setTimeout(() => {
                    aiAssistView.addPromptResponse({
                        blocks: [
                            {
                                blockType: 'thinking',
                                title: 'Understanding your request',
                                collapsible: true,
                                collapsed: true,
                                isActive: false,
                                stages: [
                                    { id: 'step1', status: 'completed', content: 'Identified request as a business dashboard requirement.' }
                                ]
                            },
                            {
                                blockType: 'thinking',
                                title: 'Selecting UI components',
                                collapsible: true,
                                collapsed: true,
                                isActive: false,
                                stages: [
                                    { id: 'step2', status: 'completed', content: 'Selecting the best UI components for the dashboard.' }
                                ]
                            },
                            {
                                blockType: 'thinking',
                                title: 'Finalizing output',
                                collapsible: true,
                                collapsed: true,
                                isActive: false,
                                stages: [
                                    { id: 'step3', status: 'completed', iconCss: 'e-icons e-check', content: 'Generated final dashboard structure successfully.' }
                                ]
                            }
                        ],
                        response: '## Business Dashboard Structure\n\n**Generated successfully.**\n\n### Features Included:\n- Key performance indicator cards\n- Revenue and sales charts\n- Recent activity data grid\n- Responsive layout for all devices\n- Clean navigation structure\n\n### Recommended Syncfusion Components:\n- Chart\n- Grid\n- Card\n- Sidebar\n- DropDownList'
                    }, true);
                }, 1000);
            }, 1000);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

**Use cases:**
- Reveal reasoning progressively as an AI service streams intermediate steps
- Auto-collapse earlier completed blocks while keeping the active one expanded
- Surface failures mid-reasoning with the `failed` status

### Adding Context Items

Inline context items are optional, clickable badges that appear inline within stage content. They're defined in the `editableContext` array of a `ThinkingStage` and injected into the `content` string using `{index}` placeholders — the zero-based position of the item in the `editableContext` array.

#### ThinkingContextItem Properties

| Property | Type | Description |
|---|---|---|
| `name` | `string` | Display label of the context badge. |
| `type` | `'file'` \| `'variable'` \| `'search'` \| `'tool'` \| `'result'` \| `'context'` | Determines the badge icon and CSS class. |
| `tooltipText` | `string` | Tooltip shown on hover. |
| `clickable` | `boolean` | When `true`, clicking the badge fires the `editableContextClicked` event. |
| `badge` | `ThinkingContextBadge` | Status badge appended to the item: `'success'`, `'warning'`, `'failed'`, `'pending'`, `'info'`, or `'none'`. |

#### Example

```typescript
import { AIAssistView, AssistThinking, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

AIAssistView.Inject(AssistThinking);

let aiAssistView: AIAssistView = new AIAssistView({
    promptSuggestions: [
        'Build a modern dashboard for my business',
        'Create a login page with validation',
        'Make a task management board'
    ],
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: 'thinking',
                        title: 'Understanding your request',
                        collapsible: true,
                        collapsed: false,
                        isActive: true,
                        stages: [
                            { id: 'step1', status: 'inprogress', content: 'Identified request as a business dashboard requirement.' }
                        ]
                    }
                ]
            }, false);

            setTimeout(() => {
                aiAssistView.addPromptResponse({
                    blocks: [
                        {
                            blockType: 'thinking',
                            title: 'Understanding your request',
                            collapsible: true,
                            collapsed: true,
                            isActive: false,
                            stages: [
                                { id: 'step1', status: 'completed', content: 'Identified request as a business dashboard requirement.' }
                            ]
                        },
                        {
                            blockType: 'thinking',
                            title: 'Selecting UI components',
                            collapsible: true,
                            collapsed: false,
                            isActive: true,
                            stages: [
                                {
                                    id: 'step2',
                                    status: 'inprogress',
                                    iconCss: 'e-icons e-check',
                                    // {0}, {1}, {2} map to editableContext array positions
                                    content: 'Selected {0}, {1}, and {2} for dashboard layout.',
                                    editableContext: [
                                        { type: 'tool', name: 'Charts', tooltipText: 'Analytics visualization', clickable: true },
                                        { type: 'tool', name: 'Grid', tooltipText: 'Tabular data', clickable: true },
                                        { type: 'tool', name: 'Cards', tooltipText: 'KPI metrics', clickable: true }
                                    ]
                                }
                            ]
                        }
                    ]
                }, false);

                setTimeout(() => {
                    aiAssistView.addPromptResponse({
                        blocks: [
                            {
                                blockType: 'thinking',
                                title: 'Understanding your request',
                                collapsible: true,
                                collapsed: true,
                                isActive: false,
                                stages: [
                                    { id: 'step1', status: 'completed', content: 'Identified request as a business dashboard requirement.' }
                                ]
                            },
                            {
                                blockType: 'thinking',
                                title: 'Selecting UI components',
                                collapsible: true,
                                collapsed: true,
                                isActive: false,
                                stages: [
                                    {
                                        id: 'step2',
                                        status: 'completed',
                                        iconCss: 'e-icons e-check',
                                        content: 'Selected {0}, {1}, and {2} for dashboard layout.',
                                        editableContext: [
                                            { type: 'tool', name: 'Charts', tooltipText: 'Analytics visualization', clickable: true },
                                            { type: 'tool', name: 'Grid', tooltipText: 'Tabular data', clickable: true },
                                            { type: 'tool', name: 'Cards', tooltipText: 'KPI metrics', clickable: true }
                                        ]
                                    }
                                ]
                            },
                            {
                                blockType: 'thinking',
                                title: 'Designing layout structure',
                                collapsible: true,
                                collapsed: false,
                                isActive: true,
                                stages: [
                                    {
                                        id: 'step3',
                                        status: 'inprogress',
                                        iconCss: 'e-icons e-check',
                                        content: 'Created responsive {0} layout structure.',
                                        editableContext: [
                                            { type: 'context', name: '12-column', tooltipText: '12-column grid', clickable: false }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }, false);

                    setTimeout(() => {
                        aiAssistView.addPromptResponse({
                            blocks: [
                                {
                                    blockType: 'thinking',
                                    title: 'Understanding your request',
                                    collapsible: true,
                                    collapsed: true,
                                    isActive: false,
                                    stages: [
                                        { id: 'step1', status: 'completed', content: 'Identified request as a business dashboard requirement.' }
                                    ]
                                },
                                {
                                    blockType: 'thinking',
                                    title: 'Selecting UI components',
                                    collapsible: true,
                                    collapsed: true,
                                    isActive: false,
                                    stages: [
                                        {
                                            id: 'step2',
                                            status: 'completed',
                                            iconCss: 'e-icons e-check',
                                            content: 'Selected {0}, {1}, and {2} for dashboard layout.',
                                            editableContext: [
                                                { type: 'tool', name: 'Charts', tooltipText: 'Analytics visualization', clickable: true },
                                                { type: 'tool', name: 'Grid', tooltipText: 'Tabular data', clickable: true },
                                                { type: 'tool', name: 'Cards', tooltipText: 'KPI metrics', clickable: true }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    blockType: 'thinking',
                                    title: 'Designing layout structure',
                                    collapsible: true,
                                    collapsed: true,
                                    isActive: false,
                                    stages: [
                                        {
                                            id: 'step3',
                                            status: 'completed',
                                            iconCss: 'e-icons e-check',
                                            content: 'Created responsive {0} layout structure.',
                                            editableContext: [
                                                { type: 'context', name: '12-column', tooltipText: '12-column grid', clickable: false }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    blockType: 'thinking',
                                    title: 'Finalizing output',
                                    collapsible: true,
                                    collapsed: true,
                                    isActive: false,
                                    stages: [
                                        { id: 'step4', status: 'completed', iconCss: 'e-icons e-check', content: 'Generated final dashboard structure successfully.' }
                                    ]
                                }
                            ],
                            response: '## Business Dashboard Structure\n\n**Generated successfully.**\n\n### Features Included:\n- Key performance indicator cards\n- Revenue and sales charts\n- Recent activity data grid\n- Responsive layout for all devices\n- Clean navigation structure\n\n### Recommended Syncfusion Components:\n- Chart\n- Grid\n- Card\n- Sidebar\n- DropDownList'
                        }, true);
                    }, 1000);
                }, 1000);
            }, 1000);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

**Use cases:**
- Highlight the specific tools, files, or variables a reasoning step used
- Let users click a badge to open a file preview or jump to a data source
- Attach status badges (success/warning/failed) to individual context references

---

## Configure editableContextClicked Event

The `editableContextClicked` event fires when a user clicks an inline context item whose `clickable` property is `true`. Use this event to open a file preview, navigate to a source, or perform any custom action.

### Event Arguments

| Event argument | Type | Description |
|---|---|---|
| `event` | `Event` | The underlying browser click event. |
| `contextItem` | `ThinkingContextItem` | The context item that was clicked, including all its configured properties. |

### Example

```typescript
aiAssistView.editableContextClicked = (args) => {
    if (args.contextItem.type === 'file') {
        openFilePreview(args.contextItem.name);
    }
};
```

---

## Configure Thinking Block Template

Use the `blockTemplate` property to fully customize how a thinking block is rendered.

### Template Context

| Context property | Type | Description |
|---|---|---|
| `block` | `ThinkingBlock` | The full thinking block model. |
| `blockIndex` | `number` | Zero-based index of this block in the `blocks` array. |

### Example

```typescript
import { AIAssistView, AssistThinking, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

AIAssistView.Inject(AssistThinking);

function blockTemplate(data: any): string {
    const block = data.block;
    const stagesHtml: string = (block.stages || [])
        .map((s: any) => `<li>${s.content}</li>`)
        .join('');
    return `
        <div class="custom-thinking-block">
            <div class="custom-thinking-title">
                <span class="e-icons ${block.isActive ? 'e-spinner' : 'e-check'}"></span>
                <strong>${block.title || 'Thinking'}</strong>
            </div>
            <ul class="custom-thinking-stages">${stagesHtml}</ul>
        </div>
    `;
}

let aiAssistView: AIAssistView = new AIAssistView({
    blockTemplate: blockTemplate,
    prompts: [
        {
            prompt: 'What is the capital of France?',
            response: 'The capital of France is Paris.',
            blocks: [
                {
                    blockType: 'thinking',
                    title: 'Fact lookup',
                    isActive: false,
                    collapsed: false,
                    collapsible: false,
                    stages: [
                        { id: 'step1', status: 'completed', content: 'Checked knowledge base for European capitals.' }
                    ]
                }
            ]
        }
    ],
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse({
                blocks: [],
                response: 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.'
            }, true);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

> When `blockTemplate` is set, the default collapsible header, spinner, and Timeline rendering are completely replaced by your template. Collapse/expand behavior and spinner lifecycle management must be handled within the template itself.

**Use cases:**
- Brand thinking blocks to match a custom design system
- Render reasoning as a compact summary instead of a full timeline
- Add custom controls (e.g., "copy reasoning") inside the block header

---

## Configure Item Template

Use the `itemTemplate` property to customize individual thinking stages inside the Timeline. This property applies to every stage item across all thinking blocks.

### Template Context

| Property | Description |
|---|---|
| `item` | Contains `content`, `cssClass`, `disabled`, `dotCss`, and `oppositeContent` properties of the timeline stage item. |
| `itemIndex` | Current item index in the timeline. |

### Example

```typescript
import { AIAssistView, AssistThinking, PromptRequestEventArgs } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);

AIAssistView.Inject(AssistThinking);

function stageItemTemplate(data: any): string {
    const item = data.item;
    const statusClass: string = item.isStageInProgress ? 'e-stage-inprogress' : 'e-stage-done';
    return `
        <div class="custom-stage-item ${statusClass}">
            <span class="e-icons ${item.dotCss}"></span>
            <div class="custom-stage-content">${item.content}</div>
        </div>
    `;
}

let aiAssistView: AIAssistView = new AIAssistView({
    itemTemplate: stageItemTemplate,
    prompts: [
        {
            prompt: 'Explain photosynthesis.',
            response: 'Photosynthesis converts sunlight into chemical energy stored in glucose.',
            blocks: [
                {
                    blockType: 'thinking',
                    title: 'Reasoning steps',
                    isActive: false,
                    collapsed: true,
                    collapsible: true,
                    stages: [
                        { id: 'step1', status: 'completed', content: 'Recalled definition of photosynthesis.' },
                        { id: 'step2', status: 'completed', content: 'Identified inputs: sunlight, CO₂, water.' },
                        { id: 'step3', status: 'completed', content: 'Identified outputs: glucose, oxygen.' }
                    ]
                }
            ]
        }
    ],
    promptRequest: (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse({
                blocks: [],
                response: 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.'
            }, true);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

**Use cases:**
- Add timestamps or durations next to each reasoning stage
- Apply custom iconography per stage type
- Integrate stage items with other UI (e.g., highlight related code on hover)

---

## Summary

**Key Concepts:**
- `AssistThinking` module must be injected via `AIAssistView.Inject(AssistThinking)` to enable rendering
- `blocks` array on `PromptModel`/`addPromptResponse()` carries `thinking`, `text`, and `tool` block types
- Blocks-only responses skip the default text-response path; `blocks` + `response` render blocks first, then text

**Key Properties:**
- `blockType`, `title`, `content`, `isActive`, `collapsed`, `collapsible`, `stages` — `ThinkingBlock` configuration
- `stages[].status` (`completed` \| `inprogress` \| `failed`), `stages[].iconCss`, `stages[].editableContext` — per-stage configuration
- `editableContext[].name`, `type`, `tooltipText`, `clickable`, `badge` — inline context badges
- `blockTemplate` — fully custom thinking block rendering
- `itemTemplate` — custom rendering for individual timeline stage items

**Key Event:**
- `editableContextClicked` — fires when a clickable context badge is clicked

**Use Cases:**
- Visualizing extended-reasoning / chain-of-thought model output (Claude, GPT-o1, etc.)
- Streaming multi-step reasoning traces with live status updates
- Surfacing tool usage, files, or variables referenced mid-reasoning
- Fully custom-branded reasoning UI via templates
