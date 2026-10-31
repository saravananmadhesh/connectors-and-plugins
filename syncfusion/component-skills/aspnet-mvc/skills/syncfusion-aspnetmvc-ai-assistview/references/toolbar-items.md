# Toolbar Items — Syncfusion ASP.NET MVC AI AssistView

## Table of Contents
- [Footer Toolbar](#footer-toolbar)
  - [Default Footer Items](#default-footer-items)
  - [Toolbar Positioning](#toolbar-positioning)
  - [Setting Alignment](#setting-alignment)
  - [Adding Custom Footer Items](#adding-custom-footer-items)
  - [Footer ItemClick Event](#footer-itemclick-event)
- [Header Toolbar Items](#header-toolbar-items)
  - [Item Properties Reference](#item-properties-reference)
  - [ItemClicked Event](#itemclicked-event)
- [Built-in Prompt Toolbar](#built-in-prompt-toolbar)
- [Built-in Response Toolbar](#built-in-response-toolbar)
- [Custom Prompt Toolbar Items](#custom-prompt-toolbar-items)
- [Custom Response Toolbar Items](#custom-response-toolbar-items)
- [Regenerate Responses](#regenerate-responses)
  - [Adding Regenerate Item](#adding-regenerate-item)
  - [Adding Regenerated Response](#adding-regenerated-response)
  - [Pre-loading Regenerated Responses](#pre-loading-regenerated-responses)

---

## Footer Toolbar

### Default Footer Items

By default, the footer toolbar renders a `send` button. When `EnableAttachments(true)` is set, an `attachment` button is also rendered.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .EnableAttachments(true)
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .Render()
</div>

<script>
    var assistObj;
    function onCreated() { assistObj = this; }
    function onPromptRequest() {
        setTimeout(function () {
            assistObj.addPromptResponse('Connect to your AI service for real-time responses.');
        }, 2000);
    }
</script>
```

---

### Toolbar Positioning

Use `ToolbarPosition` in `FooterToolbarSettings` to control whether footer items render inline with the textarea or at the bottom of the control.

| Value | Behavior |
|---|---|
| `Inline` (default) | Icons appear inside/beside the textarea |
| `Bottom` | Icons render in a dedicated footer strip below the textarea |

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Prompts(promptsData)
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .FooterToolbarSettings(new AIAssistViewFooterToolbarSettings()
    {
        ToolbarPosition = Syncfusion.EJ2.InteractiveChat.ToolbarPosition.Bottom
    })
    .Render()
```

**Toggle toolbar position dynamically:**

```javascript
function UpdateToolbarPosition() {
    if (assistObj.footerToolbarSettings.toolbarPosition === 'Inline') {
        assistObj.footerToolbarSettings.toolbarPosition = 'Bottom';
    } else {
        assistObj.footerToolbarSettings.toolbarPosition = 'Inline';
    }
}
```

---

### Adding Custom Footer Items

Use `FooterToolbarSettings.Items` to add extra buttons alongside the built-in send/attachment items.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Prompts(promptsData)
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .FooterToolbarSettings(new AIAssistViewFooterToolbarSettings()
    {
        ToolbarPosition = Syncfusion.EJ2.InteractiveChat.ToolbarPosition.Bottom,
        Items = ViewBag.FooterItems
    })
    .Render()
```

Controller:

```csharp
public ActionResult Index()
{
    var footerItems = new List<ToolbarItemModel>();
    footerItems.Add(new ToolbarItemModel { iconCss = "e-icons e-assistview-icon", align = "Left" });
    ViewBag.FooterItems = footerItems;
    return View();
}

public class ToolbarItemModel
{
    public string iconCss { get; set; }
    public string align { get; set; }
}
```

---

### Footer ItemClick Event

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .FooterToolbarSettings(new AIAssistViewFooterToolbarSettings()
    {
        ItemClick = "footerItemClicked"
    })
    .Render()
```

```javascript
function footerItemClicked(args) {
    // args.item — the clicked toolbar item model
    // args.event — the DOM click event
}
```

---

## Header Toolbar Items

Use `ToolbarSettings.Items` to add buttons to the header toolbar (top area of the control).

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .ToolbarSettings(new AIAssistViewToolbarSettings()
    {
        Items = ViewBag.Items
    })
    .Render()
```

---

### Setting Alignment

You can change the alignment of a toolbar item by using the `Align` property. It supports three alignment values: `Left`, `Center`, and `Right`. By default, the value is `Left`.

In the following example, the toolbar item is aligned to the `Right`.

```razor
@using Syncfusion.EJ2.InteractiveChat

<div class="aiassist-container" style="height: 350px; width: 650px;">
    @Html.EJS().AIAssistView("aiAssistView")
        .PromptRequest("onPromptRequest")
        .Created("onCreated")
        .ToolbarSettings(new AIAssistViewToolbarSettings()
        {
            Items = ViewBag.Items
        })
        .Render()
</div>

<script>
    var assistObj;
    function onCreated() {
        assistObj = this;
    }
    function onPromptRequest(args) {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistObj.addPromptResponse(defaultResponse);
        }, 2000);
    }
</script>
```

```csharp
public List<ToolbarItemModel> Items { get; set; } = new List<ToolbarItemModel>();

public ActionResult Align()
{
    Items.Add(new ToolbarItemModel { align = "Right", iconCss = "e-icons e-refresh" });
    ViewBag.Items = Items;
    return View();
}

public class ToolbarItemModel
{
    public string align { get; set; }

    public string iconCss { get; set; }
}
```

> **Note:** The same `Align` property applies to all toolbar item collections (header, footer, prompt, and response). Setting `align = "Right"` renders the item on the right edge of the toolbar.

---

### Item Properties Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `IconCss` | string | — | CSS class for the icon (e.g., `"e-icons e-refresh"`) |
| `Type` | string | `"Button"` | Item type: `"Button"`, `"Separator"`, `"Input"` |
| `Text` | string | — | Display text for the button |
| `Visible` | bool | `true` | Show or hide the item |
| `Disabled` | bool | `false` | Disable the item |
| `Tooltip` | string | — | Tooltip text on hover |
| `CssClass` | string | — | Additional CSS class for custom styling |
| `Align` | string | `"Left"` | Alignment: `"Left"`, `"Center"`, `"Right"` |
| `TabIndex` | int | — | Tab key navigation order |
| `Template` | string | — | HTML template for `Input` type items |

**Example — Multiple header items:**

```csharp
public ActionResult Index()
{
    var items = new List<ToolbarItemModel>();
    items.Add(new ToolbarItemModel {
        type = "Button", iconCss = "e-icons e-refresh",
        align = "Right", tooltip = "Refresh", disabled = false
    });
    items.Add(new ToolbarItemModel {
        align = "Right", iconCss = "e-icons e-user", cssClass = "custom-btn"
    });
    ViewBag.Items = items;
    return View();
}

public class ToolbarItemModel
{
    public string iconCss { get; set; }
    public string align { get; set; }
    public string type { get; set; }
    public string tooltip { get; set; }
    public string cssClass { get; set; }
    public bool disabled { get; set; }
}
```

**Template item (Input type) — e.g., DropDownButton:**

```csharp
// Controller
Items.Add(new ToolbarItem {
    Type = ItemType.Input,
    Template = "<div id=\"ddMenu\"></div>",
    Align = ItemAlign.Center
});
```

```javascript
// View — initialize component inside template
function onCreated() {
    assistObj = this;
    var splitBtnObj = new ej.splitbuttons.DropDownButton({
        items: [{ text: 'Hindi' }, { text: 'Tamil' }],
        content: 'English',
        iconCss: 'e-icons e-translate'
    });
    splitBtnObj.appendTo('#ddMenu');
}
```

---

### ItemClicked Event

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .ToolbarSettings(new AIAssistViewToolbarSettings()
    {
        Items = ViewBag.Items,
        ItemClicked = "toolbarItemClicked"
    })
    .Render()
```

```javascript
function toolbarItemClicked(args) {
    if (args.item.iconCss === 'e-icons e-refresh') {
        assistObj.prompts = [];
        assistObj.promptSuggestions = suggestions; // reset suggestions
    }
}
```

---

## Built-in Prompt Toolbar

Each user prompt bubble renders built-in `edit` and `copy` items by default. These allow the user to edit or copy the submitted prompt text.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Prompts(promptsData)
    .PromptRequest("onPromptRequest")
    .Created("onCreated")
    .Render()
```

**Listen for prompt toolbar item click:**

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Prompts(promptsData)
    .PromptToolbarSettings(new AIAssistViewPromptToolbarSettings()
    {
        ItemClicked = "promptItemClicked"
    })
    .Render()
```

```javascript
function promptItemClicked(args) {
    // args.item — clicked item, args.dataIndex — prompt index
}
```

---

## Built-in Response Toolbar

Each response bubble renders built-in `copy`, `like`, and `dislike` items by default.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Prompts(promptsData)
    .ResponseToolbarSettings(new AIAssistViewResponseToolbarSettings()
    {
        ItemClicked = "responseItemClicked"
    })
    .Render()
```

```javascript
function responseItemClicked(args) {
    // args.item — clicked item
    // args.dataIndex — index into assistObj.prompts[]
}
```

---

## Custom Prompt Toolbar Items

Replace or extend the default `edit`/`copy` prompt toolbar items using `PromptToolbarSettings.Items`.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .PromptToolbarSettings(new AIAssistViewPromptToolbarSettings()
    {
        Items = ViewBag.PromptItems
    })
    .Render()
```

```csharp
var promptItems = new List<ToolbarItemModel>();
promptItems.Add(new ToolbarItemModel { iconCss = "e-icons e-edit" });
ViewBag.PromptItems = promptItems;
```

---

## Custom Response Toolbar Items

Replace or extend the default `copy`/`like`/`dislike` response toolbar items using `ResponseToolbarSettings.Items`.

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .ResponseToolbarSettings(new AIAssistViewResponseToolbarSettings()
    {
        Items = ViewBag.ResponseItems
    })
    .Render()
```

```csharp
var responseItems = new List<ToolbarItemModel>();
responseItems.Add(new ToolbarItemModel { iconCss = "e-icons e-assist-copy", tooltip = "Copy" });
responseItems.Add(new ToolbarItemModel { iconCss = "e-icons e-audio",       tooltip = "Read Aloud" });
responseItems.Add(new ToolbarItemModel { iconCss = "e-icons e-assist-like", tooltip = "Like" });
responseItems.Add(new ToolbarItemModel { iconCss = "e-icons e-assist-dislike", tooltip = "Dislike" });
ViewBag.ResponseItems = responseItems;
```

> **Width property:** Use `PromptToolbarSettings.Width` or `ResponseToolbarSettings.Width` to set a fixed pixel width for those toolbar strips.

---

## Regenerate Responses

Enable users to regenerate AI responses with alternative options. The AI AssistView supports storing multiple response variants and providing a navigation UI for users to browse through them.

### Adding Regenerate Item

Add the `e-assist-regenerate` icon to the response toolbar to let users request regenerated responses.

```csharp
var responseItems = new List<ToolbarItemModel>();
responseItems.Add(new ToolbarItemModel { iconCss = "e-icons e-assist-copy", tooltip = "Copy" });
responseItems.Add(new ToolbarItemModel { iconCss = "e-icons e-assist-regenerate", tooltip = "Regenerate" });
responseItems.Add(new ToolbarItemModel { iconCss = "e-icons e-assist-like", tooltip = "Like" });
responseItems.Add(new ToolbarItemModel { iconCss = "e-icons e-assist-dislike", tooltip = "Dislike" });
ViewBag.ResponseItems = responseItems;
```

**Listen for regenerate item click:**

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .ResponseToolbarSettings(new AIAssistViewResponseToolbarSettings()
    {
        Items = ViewBag.ResponseItems,
        ItemClicked = "responseItemClicked"
    })
    .Render()
```

```javascript
function responseItemClicked(args) {
    if (args.item.iconCss.includes('e-assist-regenerate')) {
        // Call your AI service to generate alternative response
        // Then add via assistObj.addPromptResponse()
    }
}
```

---

### Adding Regenerated Response

Pass multiple responses as an object with the `regeneratedResponses` property to store response variants alongside the primary response.

```csharp
public ActionResult RegenerateResponseMvcController()
{
    var regenerateResponses = new List<string>()
    {
        "First alternative response...",
        "Second alternative response...",
        "Third alternative response..."
    };
    
    var promptData = new
    {
        text = "What is AI?",
        responses = new List<object>()
        {
            new
            {
                text = "AI is artificial intelligence...",
                regeneratedResponses = regenerateResponses,
                author = "AI"
            }
        }
    };
    
    ViewBag.RegenerateResponses = promptData.responses;
    return View();
}
```

**In the Razor view:**

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Prompts(ViewBag.RegenerateResponses)
    .Created("onCreated")
    .Render()
```

---

### Pre-loading Regenerated Responses

Initialize the AI AssistView with multiple responses using the `regeneratedResponses` property in the prompts collection.

```csharp
public ActionResult AIAssistViewMvcController()
{
    var prompts = new List<dynamic>();
    
    prompts.Add(new
    {
        text = "Explain quantum computing",
        author = "User",
        responses = new List<dynamic>()
        {
            new
            {
                text = "Quantum computing leverages quantum mechanics principles...",
                author = "AI",
                regeneratedResponses = new List<string>()
                {
                    "A second explanation focusing on quantum gates...",
                    "A third explanation with quantum algorithms...",
                    "A fourth explanation comparing to classical computing..."
                }
            }
        }
    });
    
    ViewBag.Prompts = prompts;
    return View();
}
```

```razor
@Html.EJS().AIAssistView("aiAssistView")
    .Prompts(ViewBag.Prompts)
    .Created("onCreated")
    .Render()
```

> **Navigation UI:** The navigation UI appears automatically once more than one response is available. Users can cycle through regenerated responses using arrow buttons or keyboard navigation.
