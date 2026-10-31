# Chain of Thoughts in React AI AssistView component

The AI AssistView supports rendering **Chain of Thoughts** (also called `Thinking`) blocks, allowing you to visualize the model's reasoning process step by step before the final response is generated. The injectable module is ideal for extended reasoning models (such as Claude 3.5, GPT-o1, and similar), which expose intermediate reasoning stages.

> The `AssistThinking` module should be injected into the AI Assistview using the `AIAssistView.Inject` method to utilize this support.

## Table of Contents

- [Types of Response Blocks](#types-of-response-blocks)
- [Configure the Thinking Block](#configure-the-thinking-block)
- [Adding Stages](#adding-stages)
  - [Adding Stage Status](#adding-stage-status)
  - [Adding Context Items](#adding-context-items)
  - [Configure editableContextClicked](#configure-editableContextClicked)
- [Configure Thinking Block Template](#configure-thinking-block-template)
- [Configure Item Template](#configure-item-template)
- [See Also](#see-also)

## Types of Response Blocks

A single response may contain `Thinking`, `Text`, and `tool` blocks in the `blocks` array. The component renders them in the order they appear. Below are the available types of the response blocks.

| Property | Description |
|---|---|
| `TextBlock` | Contains text content rendered as markdown response. |
| `ToolBlock` | Identifies a tool/function call block with tool name and parameters. |
| `ThinkingBlock` | Identifies this block as a thinking block containing reasoning stages. |

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

### Basic Thinking Block Example

```tsx
import * as React from 'react';
import { useRef } from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, AIAssistView, AssistThinking } from '@syncfusion/ej2-react-interactive-chat';

AIAssistView.Inject(AssistThinking);

const App = () => {
    const assistInstance = useRef<AIAssistViewComponent>(null);

    const prompts = [
        {
            prompt: 'Explain the water cycle.',
            response: 'The water cycle describes how water moves continuously through the environment via evaporation, condensation, and precipitation.',
            blocks: [
                {
                    blockType: 'thinking',
                    title: 'Understanding your request',
                    collapsed: true,
                    collapsible: true,
                    isActive: false,
                    stages: [
                        { 
                            id: 'step1', 
                            status: 'completed', 
                            iconCss: 'e-icons e-check', 
                            content: 'Identified request as a water cycle explanation.' 
                        }
                    ]
                },
                {
                    blockType: 'thinking',
                    title: 'Summarizing key stages',
                    collapsed: true,
                    collapsible: true,
                    isActive: false,
                    stages: [
                        { 
                            id: 'step2', 
                            status: 'completed', 
                            iconCss: 'e-icons e-check', 
                            content: 'Summarized key stages concisely.' 
                        }
                    ]
                },
                {
                    blockType: 'thinking',
                    title: 'Composing response',
                    collapsed: true,
                    collapsible: true,
                    isActive: false,
                    stages: [
                        { 
                            id: 'step3', 
                            status: 'completed', 
                            iconCss: 'e-icons e-check', 
                            content: 'Composed a clear single-paragraph response.' 
                        }
                    ]
                }
            ]
        }
    ];

    const onPromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            assistInstance.current?.addPromptResponse({
                response: 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service.'
            });
        }, 1000);
    };

    return (
        <div id="container" style={{ height: '350px', width: '650px', margin: '0 auto' }}>
            <AIAssistViewComponent
                id="aiAssistView"
                ref={assistInstance}
                prompts={prompts}
                promptRequest={onPromptRequest}
            />
        </div>
    );
};

export default App;
```

## Adding Stages

Each entry in the `stages` array represents a single reasoning step. Below are the list of available stages property.

### Stage Properties

| Property | Type | Description |
|---|---|---|
| `id` | `string` | Unique identifier for the stage. |
| `content` | `string` | Markdown content for this stage. Supports `{index}` placeholders for inline context items. |
| `status` | `'completed'` \| `'inprogress'` \| `'failed'` | Controls the icon/spinner shown on the timeline dot. |
| `iconCss` | `string` | Custom CSS class for the timeline dot icon, overrides the default status icon. |
| `editableContext` | `ThinkingContextItem[]` | Inline context items injected into the stage content via `{index}` placeholders. |

### Adding Stage Status

Each thinking stage will carry a `status` value that controls the visual indicator on its timeline dot:

- **`completed`** — renders a check icon (`e-check`).
- **`inprogress`** — renders an animated spinner.
- **`failed`** — renders an error/cross icon (`e-error-treeview`).

Use this to reflect real-time reasoning progress when streaming multi-step responses.

```tsx
import * as React from 'react';
import { useRef } from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, AssistThinking, AIAssistView } from '@syncfusion/ej2-react-interactive-chat';

AIAssistView.Inject(AssistThinking);

const App = () => {
    const assistInstance = useRef<AIAssistViewComponent>(null);

    const onPromptRequest = (args: PromptRequestEventArgs) => {
        // Step 1 - show first thinking block as in-progress
        setTimeout(() => {
            assistInstance.current?.addPromptResponse({
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
            });
            
            // Step 2 - complete first block, start second
            setTimeout(() => {
                assistInstance.current?.addPromptResponse({
                    blocks: [
                        {
                            blockType: 'thinking',
                            title: 'Understanding your request',
                            collapsible: true,
                            collapsed: true,
                            isActive: false,
                            stages: [
                                {
                                    id: 'step1',
                                    status: 'completed',
                                    content: 'Identified request as a business dashboard requirement.'
                                }
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
                                    content: 'Selecting the best UI components for the dashboard.'
                                }
                            ]
                        }
                    ]
                });
                
                // Step 3 - complete all steps
                setTimeout(() => {
                    assistInstance.current?.addPromptResponse({
                        blocks: [
                            // ... previous blocks marked as completed
                            {
                                blockType: 'thinking',
                                title: 'Finalizing output',
                                collapsible: true,
                                collapsed: true,
                                isActive: false,
                                stages: [
                                    {
                                        id: 'step3',
                                        status: 'completed',
                                        content: 'Generated final dashboard structure successfully.'
                                    }
                                ]
                            }
                        ],
                        response: '## Business Dashboard Structure\n\n**Generated successfully.**'
                    }, true);
                }, 1000);
            }, 1000);
        }, 1000);
    };

    return (
        <div id="container" style={{ height: '350px', width: '650px', margin: '0 auto' }}>
            <AIAssistViewComponent
                id="aiAssistView"
                ref={assistInstance}
                promptRequest={onPromptRequest}
                enableStreaming={true}
            />
        </div>
    );
};

export default App;
```

### Adding Context Items

You can use the inline context items which are optionally clickable badges, that appear inline within the stage content. They are defined in the `editableContext` array of a `ThinkingStage` and are injected into the `content` string using `{index}` placeholders, which is the zero-based position in the `editableContext` array.

#### Context Item Properties

Each context item is described by the below available `ThinkingContextItem` properties:

| Property | Type | Description |
|---|---|---|
| `name` | `string` | Display label of the context badge. |
| `type` | `'file'` \| `'variable'` \| `'search'` \| `'tool'` \| `'result'` \| `'context'` | Determines the badge icon and CSS class. |
| `tooltipText` | `string` | Tooltip shown on hover. |
| `clickable` | `boolean` | When `true`, clicking the badge fires the `editableContextClicked` event. |
| `badge` | `'success'` \| `'warning'` \| `'failed'` \| `'pending'` \| `'info'` \| `'none'` | Status badge appended to the item. |

#### Adding Context Example

```tsx
import * as React from 'react';
import { useRef } from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, AssistThinking, AIAssistView } from '@syncfusion/ej2-react-interactive-chat';

AIAssistView.Inject(AssistThinking);

const App = () => {
    const assistInstance = useRef<AIAssistViewComponent>(null);

    const onPromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            assistInstance.current?.addPromptResponse({
                blocks: [
                    {
                        blockType: 'thinking',
                        title: 'Selecting UI components',
                        collapsible: true,
                        collapsed: false,
                        isActive: false,
                        stages: [
                            {
                                id: 'step2',
                                status: 'completed',
                                iconCss: 'e-icons e-check',
                                content: 'Selected {0}, {1}, and {2} for dashboard layout.',
                                editableContext: [
                                    { type: 'tool', name: 'Charts', tooltipText: 'Analytics visualization' },
                                    { type: 'tool', name: 'Grid', tooltipText: 'Tabular data' },
                                    { type: 'tool', name: 'Cards', tooltipText: 'KPI metrics' }
                                ]
                            }
                        ]
                    }
                ],
                response: 'Dashboard structure generated successfully.'
            }, true);
        }, 1000);
    };

    return (
        <AIAssistViewComponent
            id="aiAssistView"
            ref={assistInstance}
            promptRequest={onPromptRequest}
        />
    );
};

export default App;
```

### Configure editableContextClicked

The `editableContextClicked` event fires when a user clicks on an inline context item whose `clickable` property is `true`. Use this event to open a file preview, navigate to a source, or perform any custom action.

#### Event Arguments

| Argument | Type | Description |
|---|---|---|
| `event` | `Event` | The underlying browser click event. |
| `contextItem` | `ThinkingContextItem` | The context item that was clicked, including all its configured properties. |

#### Implementation Example

```ts
const onEditableContextClicked = (args: EditableContextClickedEventArgs) => {
    if (args.contextItem.type === 'file') {
        openFilePreview(args.contextItem.name);
    } else if (args.contextItem.type === 'tool') {
        navigateToToolDocumentation(args.contextItem.name);
    }
};
```

## Configure Thinking Block Template

You can use the `blockTemplate` property to customize the thinking block rendering. The template receives a context object with the following properties:

### Block Template Context

| Context property | Type | Description |
|---|---|---|
| `block` | `ThinkingBlock` | The full thinking block model. |
| `blockIndex` | `number` | Zero-based index of this block in the `blocks` array. |

### Block Template Example

```tsx
import * as React from 'react';
import { useRef, useEffect } from 'react';
import { AIAssistViewComponent, AssistThinking, AIAssistView, PromptRequestEventArgs } from '@syncfusion/ej2-react-interactive-chat';

AIAssistView.Inject(AssistThinking);

const App = () => {
    const assistInstance = useRef<AIAssistViewComponent>(null);

    // Custom Thinking Block Template
    const blockTemplate = (data: any): string => {
        const block = data.block;
        const stagesHtml = (block.stages || [])
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
    };

    const initialPrompts = [
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
                        { 
                            id: 'step1', 
                            status: 'completed', 
                            content: 'Checked knowledge base for European capitals.' 
                        }
                    ]
                }
            ]
        }
    ];

    useEffect(() => {
        if (assistInstance.current) {
            (assistInstance.current as any).blockTemplate = blockTemplate;
        }
    }, []);

    const onPromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            assistInstance.current?.addPromptResponse({
                response: 'For real-time prompt processing, connect to your AI service.'
            }, true);
        }, 1000);
    };

    return (
        <div id="container" style={{ height: '600px', width: '800px', margin: '20px auto' }}>
            <AIAssistViewComponent
                id="aiAssistView"
                ref={assistInstance}
                prompts={initialPrompts}
                promptRequest={onPromptRequest}
                height="100%"
                width="100%"
            />
        </div>
    );
};

export default App;
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

### Item Template Example

```tsx
import * as React from 'react';
import { useRef } from 'react';
import { AIAssistViewComponent, PromptRequestEventArgs, AssistThinking, AIAssistView } from '@syncfusion/ej2-react-interactive-chat';

AIAssistView.Inject(AssistThinking);

const itemTemplate = (data: any) => {
    const item = data.item || data;
    const statusClass = item.isStageInProgress ? 'e-stage-inprogress' : 'e-stage-done';
    const iconCss = item.iconCss || item.dotCss || '';
    return (
        <div className={`custom-stage-item ${statusClass}`}>
            <span className={`e-icons ${iconCss}`}></span>
            <div className="custom-stage-content">{item.content || ''}</div>
        </div>
    );
};

const App = () => {
    const assistInstance = useRef<AIAssistViewComponent>(null);

    const prompts = [
        {
            prompt: 'Explain the water cycle.',
            response: 'The water cycle describes how water moves continuously through the environment.',
            blocks: [
                {
                    blockType: 'thinking',
                    title: 'Understanding your request',
                    collapsed: true,
                    collapsible: true,
                    isActive: false,
                    stages: [
                        {
                            id: 'step1',
                            status: 'completed',
                            iconCss: 'e-icons e-check',
                            content: 'Identified request as a water cycle explanation.'
                        }
                    ]
                }
            ]
        }
    ];

    const onPromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            assistInstance.current?.addPromptResponse({
                response: 'For real-time prompt processing, connect the AIAssistView to your AI service.'
            });
        }, 1000);
    };

    return (
        <AIAssistViewComponent
            id="aiAssistView"
            ref={assistInstance}
            prompts={prompts}
            itemTemplate={itemTemplate}
            promptRequest={onPromptRequest}
        />
    );
};

export default App;
```

## See Also

- [Prompt and response collection](https://ej2.syncfusion.com/react/documentation/ai-assistview/assist-view#prompt-response-collection)
- [Tool blocks](https://ej2.syncfusion.com/react/documentation/ai-assistview#tool-blocks)
- [Streaming responses](https://ej2.syncfusion.com/react/documentation/ai-assistview/methods#streaming-response)
- [addPromptResponse method](https://ej2.syncfusion.com/react/documentation/ai-assistview/methods#addpromptresponse)
