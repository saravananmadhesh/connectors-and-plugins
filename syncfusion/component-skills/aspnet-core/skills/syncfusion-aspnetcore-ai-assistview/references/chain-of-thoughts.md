# Chain of Thoughts in AI AssistView

## Table of Contents
- [Types of Response Blocks](#types-of-response-blocks)
- [Configure the Thinking Block](#configure-the-thinking-block)
- [Adding Stages](#adding-stages)
- [Adding Stage Status](#adding-stage-status)
- [Adding Context Items](#adding-context-items)
- [Configure editableContextClicked](#configure-editablecontextclicked)
- [Configure Thinking Block Template](#configure-thinking-block-template)
- [Configure Item Template](#configure-item-template)

## Types of Response Blocks

The AI AssistView supports rendering **Chain of Thoughts** (also called `Thinking`) blocks, allowing you to visualize the model's reasoning process step by step before the final response is generated. The injectable module is ideal for extended reasoning models (such as Claude 3.5, GPT-o1, and similar), which expose intermediate reasoning stages.

A single response may contain `Thinking`, `Text`, and `tool` blocks in the `blocks` array. The component renders them in the order they appear. Below are the available types of the response blocks.

| Property | Description |
|---|---|
| `TextBlock` | Text content rendered as markdown within the response. |
| `ToolBlock` | Interactive tool or UI element rendered within the response. |
| `ThinkingBlock` | Visualizes AI reasoning stages and thinking process with collapsible timeline. |

## Configure the Thinking Block

You can use the `Thinking` block type in the blocks array of the `addPromptResponse` method to dynamically push blocks including thinking blocks into the component at runtime. Pass an object containing a blocks array, and set the second argument `isFinalUpdate` to false during streaming and true for the final update.

> When only `blocks` are provided (no `response` text), the component will render the blocks directly and skip the default text-response rendering path. When both `blocks` and `response` are provided, the blocks are rendered first followed by the response text.

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

```razor
@using Syncfusion.EJ2.InteractiveChat
@using System.Text.Json

@{
    var stages = new[]
    {
        new { id = "step1", status = "completed", content = "Identified request as a water cycle explanation." },
        new { id = "step2", status = "completed", content = "Summarized key stages concisely." },
        new { id = "step3", status = "completed", content = "Composed a clear single-paragraph response." }
    };

    var prompts = new[]
    {
        new {
            prompt = "Explain the water cycle.",
            response = "<div><h3>The Water Cycle</h3><p>The water cycle describes the continuous process of water movement on Earth. Water evaporates from oceans and lakes, rises as vapor, cools to form clouds, and returns to Earth as precipitation (rain or snow). This cycle sustains all life and shapes our climate.</p></div>",
            suggestionData = new List<string>()
        }
    };

    var promptsJson = JsonSerializer.Serialize(prompts);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@prompts" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var promptsData = @Html.Raw(promptsJson);

    var thinkingAIAssistView;

    function onCreated() {
        var assistEle = document.getElementById('aiAssistView');
        thinkingAIAssistView = ej.base.getInstance(assistEle, ejs.interactivechat.AIAssistView);
    }

    function onPromptRequest(args) {
        setTimeout(() => {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Thinking...",
                        content: "Analyzing the water cycle concept.",
                        stages: [
                            { id: "step1", status: "completed", content: "Identified request as a water cycle explanation." },
                            { id: "step2", status: "completed", content: "Summarized key stages concisely." },
                            { id: "step3", status: "completed", content: "Composed a clear single-paragraph response." }
                        ]
                    }
                ]
            }, true);
        }, 1000);
    }
</script>
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

## Adding Stage Status

Each thinking stage will carry a `status` value that controls the visual indicator on its timeline dot:

- **`completed`** — renders a check icon (`e-check`).
- **`inprogress`** — renders an animated spinner.
- **`failed`** — renders an error/cross icon (`e-error-treeview`).

Use this to reflect real-time reasoning progress when streaming multi-step responses.

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var promptSuggestions = new string[]
    {
        "Build a modern dashboard for my business",
        "Create a login page with validation",
        "Make a task management board"
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@promptSuggestions" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var thinkingAIAssistView;

    function onCreated() {
        var assistEle = document.getElementById('aiAssistView');
        thinkingAIAssistView = ej.base.getInstance(assistEle, ejs.interactivechat.AIAssistView);
    }

    function onPromptRequest(args) {
        // Step 1
        setTimeout(() => {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Analyzing your request...",
                        isActive: true,
                        stages: [
                            { 
                                id: "analyze", 
                                status: "inprogress", 
                                content: "Understanding requirements for **Dashboard**" 
                            }
                        ]
                    }
                ]
            }, false);
        }, 1000);

        // Step 2 - Update with more stages
        setTimeout(() => {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Designing UI components...",
                        isActive: true,
                        stages: [
                            { 
                                id: "analyze", 
                                status: "completed", 
                                content: "Understanding requirements for **Dashboard**" 
                            },
                            { 
                                id: "design", 
                                status: "inprogress", 
                                content: "Selecting grid, charts, and metrics components" 
                            }
                        ]
                    }
                ]
            }, false);
        }, 2000);

        // Final response
        setTimeout(() => {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Complete analysis",
                        isActive: false,
                        stages: [
                            { 
                                id: "analyze", 
                                status: "completed", 
                                content: "Understanding requirements for **Dashboard**" 
                            },
                            { 
                                id: "design", 
                                status: "completed", 
                                content: "Selecting grid, charts, and metrics components" 
                            },
                            { 
                                id: "code", 
                                status: "completed", 
                                content: "Generated sample code with Syncfusion components" 
                            }
                        ]
                    },
                    {
                        blockType: "text",
                        content: "Your dashboard is ready! I've designed a comprehensive UI with data grid, chart visualization, and performance metrics using Syncfusion components."
                    }
                ]
            }, true);
        }, 3000);
    }
</script>
```

## Adding Context Items

You can use the inline context items which are optionally clickable badges, that appear inline within the stage content. They are defined in the `editableContext` array of a `ThinkingStage` and are injected into the `content` string using `{index}` placeholders, which is the zero-based position in the `editableContext` array.

Each context item is described by the below available `ThinkingContextItem` properties:

| Property | Type | Description |
|---|---|---|
| `name` | `string` | Display label of the context badge. |
| `type` | `'file'` \| `'variable'` \| `'search'` \| `'tool'` \| `'result'` \| `'context'` | Determines the badge icon and CSS class. |
| `tooltipText` | `string` | Tooltip shown on hover. |
| `clickable` | `boolean` | When `true`, clicking the badge fires the `editableContextClicked` event. |
| `badge` | `ThinkingContextBadge` | Status badge appended to the item: `'success'`, `'warning'`, `'failed'`, `'pending'`, `'info'`, or `'none'`. |

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var promptSuggestions = new string[]
    {
        "Build a modern dashboard for my business",
        "Create a login page with validation",
        "Make a task management board"
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" promptSuggestions="@promptSuggestions" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>

    var thinkingAIAssistView;

    function onCreated() {
        var assistEle = document.getElementById('aiAssistView');
        thinkingAIAssistView = ej.base.getInstance(assistEle, ejs.interactivechat.AIAssistView);
    }

    function onPromptRequest(args) {
        // Step 1
        setTimeout(() => {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Planning your application...",
                        isActive: true,
                        stages: [
                            {
                                id: "plan",
                                status: "inprogress",
                                content: "Analyzing requirements: {0}, {1}, {2}",
                                editableContext: [
                                    {
                                        name: "Dashboard",
                                        type: "tool",
                                        tooltipText: "Primary UI component",
                                        clickable: true,
                                        badge: "success"
                                    },
                                    {
                                        name: "Real-time Data",
                                        type: "variable",
                                        tooltipText: "Data binding approach",
                                        clickable: true,
                                        badge: "pending"
                                    },
                                    {
                                        name: "Responsive Layout",
                                        type: "context",
                                        tooltipText: "Mobile-friendly design",
                                        clickable: true,
                                        badge: "info"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }, false);
        }, 1000);

        // Step 2
        setTimeout(() => {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Planning your application...",
                        isActive: true,
                        stages: [
                            {
                                id: "plan",
                                status: "completed",
                                content: "Analyzing requirements: {0}, {1}, {2}",
                                editableContext: [
                                    {
                                        name: "Dashboard",
                                        type: "tool",
                                        tooltipText: "Primary UI component",
                                        clickable: true,
                                        badge: "success"
                                    },
                                    {
                                        name: "Real-time Data",
                                        type: "variable",
                                        tooltipText: "Data binding approach",
                                        clickable: true,
                                        badge: "success"
                                    },
                                    {
                                        name: "Responsive Layout",
                                        type: "context",
                                        tooltipText: "Mobile-friendly design",
                                        clickable: true,
                                        badge: "info"
                                    }
                                ]
                            },
                            {
                                id: "select",
                                status: "inprogress",
                                content: "Selecting Syncfusion components: {0} for visualization, {1} for data handling",
                                editableContext: [
                                    {
                                        name: "Grid",
                                        type: "tool",
                                        tooltipText: "Data table component",
                                        clickable: true,
                                        badge: "success"
                                    },
                                    {
                                        name: "Charts",
                                        type: "tool",
                                        tooltipText: "Chart visualization",
                                        clickable: true,
                                        badge: "pending"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }, false);
        }, 2000);

        // Final response
        setTimeout(() => {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Application Architecture Ready",
                        isActive: false,
                        stages: [
                            {
                                id: "plan",
                                status: "completed",
                                content: "Analyzing requirements: {0}, {1}, {2}",
                                editableContext: [
                                    {
                                        name: "Dashboard",
                                        type: "tool",
                                        tooltipText: "Primary UI component",
                                        clickable: true,
                                        badge: "success"
                                    },
                                    {
                                        name: "Real-time Data",
                                        type: "variable",
                                        tooltipText: "Data binding approach",
                                        clickable: true,
                                        badge: "success"
                                    },
                                    {
                                        name: "Responsive Layout",
                                        type: "context",
                                        tooltipText: "Mobile-friendly design",
                                        clickable: true,
                                        badge: "success"
                                    }
                                ]
                            },
                            {
                                id: "select",
                                status: "completed",
                                content: "Selecting Syncfusion components: {0} for visualization, {1} for data handling",
                                editableContext: [
                                    {
                                        name: "Grid",
                                        type: "tool",
                                        tooltipText: "Data table component",
                                        clickable: true,
                                        badge: "success"
                                    },
                                    {
                                        name: "Charts",
                                        type: "tool",
                                        tooltipText: "Chart visualization",
                                        clickable: true,
                                        badge: "success"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        blockType: "text",
                        content: "Perfect! Your application architecture is ready. The dashboard will include data visualization, real-time updates, and responsive design using Syncfusion Grid and Chart components."
                    }
                ]
            }, true);
        }, 3000);
    }
</script>
```

## Configure editableContextClicked

The `editableContextClicked` event fires when a user clicks on an inline context item whose `clickable` property is `true`. Use this event to open a file preview, navigate to a source, or perform any custom action.

| Event argument | Type | Description |
|---|---|---|
| `event` | `Event` | The underlying browser click event. |
| `contextItem` | `ThinkingContextItem` | The context item that was clicked, including all its configured properties. |

```ts
aiAssistView.editableContextClicked = (args) => {
    if (args.contextItem.type === 'file') {
        openFilePreview(args.contextItem.name);
    }
};
```

## Configure Thinking Block Template

You can use the `blockTemplate` property, to customize the thinking block rendering. The template receives a context object with the following properties:

| Context property | Type | Description |
|---|---|---|
| `block` | `ThinkingBlock` | The full thinking block model. |
| `blockIndex` | `number` | Zero-based index of this block in the `blocks` array. |

```razor
@using Syncfusion.EJ2.InteractiveChat
@using System.Text.Json

@{
    var prompts = new[]
    {
        new {
            prompt = "What is the capital of France?",
            response = "<div>The capital of France is Paris, a major city located in the north-central part of the country.</div>",
            suggestionData = new List<string>()
        }
    };

    var promptsJson = JsonSerializer.Serialize(prompts);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@prompts" blockTemplate="blockTemplate" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var promptsData = @Html.Raw(promptsJson);

    var thinkingAIAssistView;

    function onCreated() {
        var assistEle = document.getElementById('aiAssistView');
        thinkingAIAssistView = ej.base.getInstance(assistEle, ejs.interactivechat.AIAssistView);
    }

    function blockTemplate(data) {
        var block = data.block;
        var stagesHtml = (block.stages || [])
            .map(function (s) { return '<li>' + s.content + '</li>'; })
            .join('');
        return '<div class="custom-thinking-block">' +
                   '<div class="custom-thinking-title">' +
                       '<strong>' + (block.title || 'Thinking...') + '</strong>' +
                   '</div>' +
                   '<ol class="custom-stages-list">' + stagesHtml + '</ol>' +
               '</div>';
    }

    function onPromptRequest(args) {
        setTimeout(() => {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Reasoning about the capital of France",
                        stages: [
                            { id: "step1", status: "completed", content: "Identified query topic: Geography - European capitals" },
                            { id: "step2", status: "completed", content: "Recalled France information from knowledge base" },
                            { id: "step3", status: "completed", content: "Confirmed Paris as the capital city" }
                        ]
                    }
                ]
            }, true);
        }, 1000);
    }
</script>
```

> When `blockTemplate` is set, the default collapsible header, spinner, and Timeline rendering are completely replaced by your template. Collapse/expand behavior and spinner lifecycle management must be handled within the template itself.

## Configure Item Template

You can use the `itemTemplate` property to add individual thinking stages inside the Timeline. This property applies to every stage item within all thinking blocks.

The template context for each stage item exposes:

| Property | Description |
|---|---|
| `item` | Contains `content`, `cssClass`, `disabled`, `dotCss`, and `oppositeContent` properties of the timeline stage item. |
| `itemIndex` | Current item index in the timeline. |

```razor
@using Syncfusion.EJ2.InteractiveChat
@using System.Text.Json

@{
    var prompts = new[]
    {
        new {
            prompt = "Explain photosynthesis.",
            response = "<div><strong>Photosynthesis</strong> is the process by which plants convert light energy into chemical energy stored in glucose.</div>",
            suggestionData = new List<string>()
        }
    };

    var promptsJson = JsonSerializer.Serialize(prompts);
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    <ejs-aiassistview id="aiAssistView" prompts="@prompts" itemTemplate="stageItemTemplate" promptRequest="onPromptRequest" created="onCreated"></ejs-aiassistview>
</div>

<script>
    var promptsData = @Html.Raw(promptsJson);

    var thinkingAIAssistView;

    function onCreated() {
        var assistEle = document.getElementById('aiAssistView');
        thinkingAIAssistView = ej.base.getInstance(assistEle, ejs.interactivechat.AIAssistView);
    }

    function stageItemTemplate(data) {
        var item = data.item;
        var statusClass = item.isStageInProgress ? 'e-stage-inprogress' : 'e-stage-done';
        return '<div class="custom-stage-item ' + statusClass + '">' +
                   '<span class="e-icons ' + item.dotCss + '"></span>' +
                   '<span class="stage-content">' + item.content + '</span>' +
               '</div>';
    }

    function onPromptRequest(args) {
        setTimeout(() => {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Understanding photosynthesis",
                        stages: [
                            { id: "step1", status: "completed", content: "Light-dependent reactions in thylakoids" },
                            { id: "step2", status: "completed", content: "Electron transport and ATP synthesis" },
                            { id: "step3", status: "completed", content: "Calvin cycle in stroma" }
                        ]
                    }
                ]
            }, true);
        }, 1000);
    }
</script>
```
