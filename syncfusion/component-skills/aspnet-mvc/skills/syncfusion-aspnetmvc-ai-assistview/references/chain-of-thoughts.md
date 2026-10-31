# Chain of Thoughts (Thinking) — Syncfusion ASP.NET MVC AI AssistView

## Table of Contents
- [Types of Response Blocks](#types-of-response-blocks)
- [Configure the Thinking Block](#configure-the-thinking-block)
  - [Thinking Block Properties](#thinking-block-properties)
- [Adding Stages](#adding-stages)
  - [Stage Properties](#stage-properties)
  - [Adding Stage Status](#adding-stage-status)
  - [Adding Context Items](#adding-context-items)
- [Configure editableContextClicked Event](#configure-editablecontextclicked-event)
- [Configure Thinking Block Template](#configure-thinking-block-template)
- [Configure Item Template](#configure-item-template)

---

## Types of Response Blocks

The AI AssistView supports rendering **Chain of Thoughts** (also called `Thinking`) blocks, allowing you to visualize the model's reasoning process step by step before the final response is generated. The injectable module is ideal for extended reasoning models (such as Claude 3.5, GPT‑o1, and similar), which expose intermediate reasoning stages.

A single response may contain `Thinking`, `Text`, and `Tool` blocks in the `blocks` array. The component renders them in the order they appear.

| Block Type | Description |
|---|---|
| `TextBlock` | Contains markdown content rendered as text. Specified with `blockType: 'text'` and `content` property. |
| `ToolBlock` | Contains interactive tool or component. Specified with `blockType: 'tool'`, `toolName`, and optional `props`. |
| `ThinkingBlock` | Contains reasoning stages with collapsible timeline visualization. Specified with `blockType: 'thinking'` and `stages` array. |

---

## Configure the Thinking Block

You can use the `Thinking` block type in the blocks array of the `addPromptResponse` method to dynamically push blocks including thinking blocks into the component at runtime. Pass an object containing a blocks array, and set the second argument `isFinalUpdate` to false during streaming and true for the final update.

> When only `blocks` are provided (no `response` text), the component will render the blocks directly and skip the default text-response rendering path. When both `blocks` and `response` are provided, the blocks are rendered first followed by the response text.

### Thinking Block Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `blockType` | `'thinking'` | — | Identifies this block as a thinking block. Required. |
| `id` | string | auto-generated | Unique identifier for the block, used for collapsing/expanding state. |
| `title` | string | `'Thinking...'` | Heading text shown in the collapsible header. |
| `content` | string | — | Markdown text rendered as a description beneath the stages. |
| `isActive` | boolean | `false` | When `true`, a Syncfusion spinner is shown inside the thinking header to indicate the reasoning is still in progress. |
| `collapsed` | boolean | `true` | Initial collapsed state of the thinking block. |
| `collapsible` | boolean | `true` | Whether the block can be expanded or collapsed by the user. |
| `stages` | `ThinkingStage[]` | — | Array of reasoning stages rendered using the Timeline component. |

**Example — Water Cycle Explanation:**

```razor
@using Syncfusion.EJ2.InteractiveChat
@using Newtonsoft.Json

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
            response = "<div>The water cycle is a continuous process where water evaporates from surfaces, forms clouds, and returns to Earth as precipitation.</div>",
            suggestionData = new List<string>()
        }
    };

    var promptsJson = Html.Raw(JsonConvert.SerializeObject(prompts));
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").Prompts(prompts).PromptRequest("onPromptRequest").Created("onCreated").Render()
</div>

<script>
    var promptsData = @promptsJson;

    var thinkingAIAssistView;

    function onCreated() {
        var assistEle = document.getElementById('aiAssistView');
        thinkingAIAssistView = ej.base.getInstance(assistEle, ejs.interactivechat.AIAssistView);
    }

    function onPromptRequest(args) {
        setTimeout(function () {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Analyzing your question...",
                        stages: [
                            { id: "step1", status: "completed", content: "Identified request as a water cycle explanation." },
                            { id: "step2", status: "completed", content: "Summarized key stages concisely." },
                            { id: "step3", status: "completed", content: "Composed a clear single-paragraph response." }
                        ]
                    },
                    {
                        blockType: "text",
                        content: "The water cycle is a continuous process involving evaporation, condensation, and precipitation. Water from oceans and land surfaces evaporates into vapor, rises through the atmosphere, cools, and condenses into clouds. When cloud water droplets become heavy enough, they fall as precipitation (rain, snow, or sleet) back to Earth's surface, where water flows into rivers, lakes, and oceans, restarting the cycle."
                    }
                ]
            }, true);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult AssistThinking()
{
    return View();
}
```

---

## Adding Stages

Each entry in the `stages` array represents a single reasoning step. Stages are rendered as timeline items, showing the progression of the AI's reasoning.

### Stage Properties

| Property | Type | Description |
|---|---|---|
| `id` | string | Unique identifier for the stage. |
| `content` | string | Markdown content for this stage. Supports `{index}` placeholders for inline context items. |
| `status` | `'completed'` \| `'inprogress'` \| `'failed'` | Controls the icon/spinner shown on the timeline dot. |
| `iconCss` | string | Custom CSS class for the timeline dot icon, overrides the default status icon. |
| `editableContext` | `ThinkingContextItem[]` | Inline context items injected into the stage content via `{index}` placeholders. |

### Adding Stage Status

Each thinking stage will carry a `status` value that controls the visual indicator on its timeline dot:

- **`completed`** — renders a check icon (`e-check`).
- **`inprogress`** — renders an animated spinner.
- **`failed`** — renders an error/cross icon (`e-error-treeview`).

Use this to reflect real-time reasoning progress when streaming multi-step responses.

**Example — Multi-step Reasoning with Status Updates:**

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
    @Html.EJS().AIAssistView("aiAssistView").PromptSuggestions(promptSuggestions).PromptRequest("onPromptRequest").Created("onCreated").Render()
</div>

<script>
    var thinkingAIAssistView;

    function onCreated() {
        var assistEle = document.getElementById('aiAssistView');
        thinkingAIAssistView = ej.base.getInstance(assistEle, ejs.interactivechat.AIAssistView);
    }

    function onPromptRequest(args) {
        // Step 1 — Initial response with inprogress stages
        setTimeout(function () {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Planning your dashboard...",
                        isActive: true,
                        stages: [
                            { id: "s1", status: "completed", content: "Analyzed your requirements and business type." },
                            { id: "s2", status: "inprogress", content: "Selecting appropriate dashboard components." },
                            { id: "s3", status: "inprogress", content: "Designing layout and data visualization." },
                            { id: "s4", status: "inprogress", content: "Finalizing responsive design patterns." }
                        ]
                    }
                ]
            }, false);
        }, 500);

        // Step 2 — Update stages to completed
        setTimeout(function () {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Planning your dashboard...",
                        isActive: false,
                        stages: [
                            { id: "s1", status: "completed", content: "Analyzed your requirements and business type." },
                            { id: "s2", status: "completed", content: "Selected Grid, Chart, Card, and KPI components." },
                            { id: "s3", status: "completed", content: "Designed responsive 2-column layout with widgets." },
                            { id: "s4", status: "completed", content: "Integrated real-time data binding patterns." }
                        ]
                    },
                    {
                        blockType: "text",
                        content: "Here's your modern dashboard design:\n\n**Key Components:**\n- Sales KPI Cards (top row)\n- Monthly Revenue Chart (left)\n- Customer Distribution (right)\n- Recent Transactions Grid (bottom)\n\nThe dashboard is fully responsive and updates in real-time with live data."
                    }
                ]
            }, true);
        }, 3000);
    }
</script>
```

```csharp
public ActionResult AssistThinkingSteps()
{
    return View();
}
```

### Adding Context Items

You can use inline context items which are optionally clickable badges that appear inline within the stage content. They are defined in the `editableContext` array of a `ThinkingStage` and are injected into the `content` string using `{index}` placeholders, which is the zero-based position in the `editableContext` array.

Each context item is described by the following available `ThinkingContextItem` properties:

| Property | Type | Description |
|---|---|---|
| `name` | string | Display label of the context badge. |
| `type` | `'file'` \| `'variable'` \| `'search'` \| `'tool'` \| `'result'` \| `'context'` | Determines the badge icon and CSS class. |
| `tooltipText` | string | Tooltip shown on hover. |
| `clickable` | boolean | When `true`, clicking the badge fires the `editableContextClicked` event. |
| `badge` | `'success'` \| `'warning'` \| `'failed'` \| `'pending'` \| `'info'` \| `'none'` | Status badge appended to the item. |

**Example — Context Items with Inline References:**

```razor
@using Syncfusion.EJ2.InteractiveChat
@using Newtonsoft.Json

@{
    var promptSuggestions = new string[]
    {
        "Build a modern dashboard for my business",
        "Create a login page with validation",
        "Make a task management board"
    };
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").PromptSuggestions(promptSuggestions).PromptRequest("onPromptRequest").Created("onCreated").Render()
</div>

<script>
    var thinkingAIAssistView;

    function onCreated() {
        var assistEle = document.getElementById('aiAssistView');
        thinkingAIAssistView = ej.base.getInstance(assistEle, ejs.interactivechat.AIAssistView);
    }

    function onPromptRequest(args) {
        // Step 1
        setTimeout(function () {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Building your dashboard...",
                        stages: [
                            {
                                id: "search",
                                status: "completed",
                                content: "Searched best practices for {0} dashboards with {1}.",
                                editableContext: [
                                    { name: "business analytics", type: "search", tooltipText: "Search term", clickable: true, badge: "success" },
                                    { name: "real-time updates", type: "search", tooltipText: "Search term", clickable: true, badge: "success" }
                                ]
                            },
                            {
                                id: "analyze",
                                status: "completed",
                                content: "Analyzed {0} and selected {1} as the best fit for your needs.",
                                editableContext: [
                                    { name: "requirements.pdf", type: "file", tooltipText: "Uploaded file", clickable: true, badge: "info" },
                                    { name: "Syncfusion Grid + Chart", type: "tool", tooltipText: "Selected component", clickable: true, badge: "success" }
                                ]
                            },
                            {
                                id: "design",
                                status: "completed",
                                content: "Designed responsive layout using {0} and applied {1}.",
                                editableContext: [
                                    { name: "flexbox", type: "context", tooltipText: "CSS layout", clickable: true, badge: "none" },
                                    { name: "Material Theme", type: "context", tooltipText: "Design system", clickable: true, badge: "success" }
                                ]
                            }
                        ]
                    },
                    {
                        blockType: "text",
                        content: "Your dashboard is ready with real-time data synchronization and responsive design."
                    }
                ]
            }, true);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult AssistThinkingSteps()
{
    return View();
}
```

---

## Configure editableContextClicked Event

The `editableContextClicked` event fires when a user clicks on an inline context item whose `clickable` property is `true`. Use this event to open a file preview, navigate to a source, or perform any custom action.

| Event Argument | Type | Description |
|---|---|---|
| `event` | `Event` | The underlying browser click event. |
| `contextItem` | `ThinkingContextItem` | The context item that was clicked, including all its configured properties. |

**Example — Handling Context Item Clicks:**

```javascript
aiAssistView.editableContextClicked = function (args) {
    if (args.contextItem.type === 'file') {
        openFilePreview(args.contextItem.name);
    } else if (args.contextItem.type === 'search') {
        performSearch(args.contextItem.name);
    } else if (args.contextItem.type === 'tool') {
        navigateToTool(args.contextItem.name);
    }
};

function openFilePreview(fileName) {
    console.log("Opening file preview for: " + fileName);
    // Custom file preview logic here
}

function performSearch(term) {
    console.log("Searching for: " + term);
    // Custom search logic here
}

function navigateToTool(toolName) {
    console.log("Navigating to tool: " + toolName);
    // Custom navigation logic here
}
```

---

## Configure Thinking Block Template

You can use the `blockTemplate` property to customize the thinking block rendering. The template receives a context object with the following properties:

| Context Property | Type | Description |
|---|---|---|
| `block` | `ThinkingBlock` | The full thinking block model. |
| `blockIndex` | number | Zero-based index of this block in the `blocks` array. |

**Example — Custom Thinking Block Template:**

```razor
@using Syncfusion.EJ2.InteractiveChat
@using Newtonsoft.Json

@{
    var prompts = new[]
    {
        new {
            prompt = "What is the capital of France?",
            response = "<div>Paris is the capital of France.</div>",
            suggestionData = new List<string>()
        }
    };

    var promptsJson = Html.Raw(JsonConvert.SerializeObject(prompts));
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").Prompts(prompts).BlockTemplate("blockTemplate").PromptRequest("onPromptRequest").Created("onCreated").Render()
</div>

<script>
    var promptsData = @promptsJson;

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
                   '<ul class="custom-stages-list">' + stagesHtml + '</ul>' +
               '</div>';
    }

    function onPromptRequest(args) {
        setTimeout(function () {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Retrieving information...",
                        stages: [
                            { id: "s1", status: "completed", content: "Identified the question about capital cities." },
                            { id: "s2", status: "completed", content: "Retrieved geographical data." },
                            { id: "s3", status: "completed", content: "Composed the answer." }
                        ]
                    },
                    {
                        blockType: "text",
                        content: "Paris is the capital and largest city of France."
                    }
                ]
            }, true);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult AssistThinkingTemplate()
{
    return View();
}
```

> **Note:** When `blockTemplate` is set, the default collapsible header, spinner, and Timeline rendering are completely replaced by your template. Collapse/expand behavior and spinner lifecycle management must be handled within the template itself.

---

## Configure Item Template

You can use the `itemTemplate` property to add individual thinking stages inside the Timeline. This property applies to every stage item within all thinking blocks.

The template context for each stage item exposes:

| Property | Description |
|---|---|
| `item` | Contains `content`, `cssClass`, `disabled`, `dotCss`, and `oppositeContent` properties of the timeline stage item. |
| `itemIndex` | Current item index in the timeline. |

**Example — Custom Stage Item Template:**

```razor
@using Syncfusion.EJ2.InteractiveChat
@using Newtonsoft.Json

@{
    var prompts = new[]
    {
        new {
            prompt = "Explain photosynthesis.",
            response = "<div>Photosynthesis is the process by which plants convert light energy into chemical energy stored in glucose.</div>",
            suggestionData = new List<string>()
        }
    };

    var promptsJson = Html.Raw(JsonConvert.SerializeObject(prompts));
}

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView").Prompts(prompts).ItemTemplate("stageItemTemplate").PromptRequest("onPromptRequest").Created("onCreated").Render()
</div>

<script>
    var promptsData = @promptsJson;

    var thinkingAIAssistView;

    function onCreated() {
        var assistEle = document.getElementById('aiAssistView');
        thinkingAIAssistView = ej.base.getInstance(assistEle, ejs.interactivechat.AIAssistView);
    }

    function stageItemTemplate(data) {
        var item = data.item;
        return '<div class="custom-stage-item">' +
                   '<div class="stage-content">' + item.content + '</div>' +
               '</div>';
    }

    function onPromptRequest(args) {
        setTimeout(function () {
            thinkingAIAssistView.addPromptResponse({
                blocks: [
                    {
                        blockType: "thinking",
                        title: "Understanding photosynthesis...",
                        stages: [
                            { id: "s1", status: "completed", content: "Identified biological process type." },
                            { id: "s2", status: "completed", content: "Explained light-dependent and light-independent reactions." },
                            { id: "s3", status: "completed", content: "Connected to glucose production." }
                        ]
                    },
                    {
                        blockType: "text",
                        content: "Photosynthesis occurs in two main stages: the light-dependent reactions in the thylakoid membranes and the light-independent reactions (Calvin cycle) in the stroma, producing glucose as the primary energy source for the plant."
                    }
                ]
            }, true);
        }, 1000);
    }
</script>
```

```csharp
public ActionResult StageItemTemplate()
{
    return View();
}
```

---

> **Important:** Thinking blocks are rendered as timeline visualizations. Use stages to communicate multi-step reasoning, and context items to add inline references or interactive elements within stage content.
