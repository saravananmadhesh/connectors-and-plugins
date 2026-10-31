# Toolbar & Templates — Syncfusion ASP.NET MVC Inline AI Assist

## Table of Contents
- [InlineToolbarSettings Overview](#inlinetoolbarsettings-overview)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Toolbar Item Properties](#toolbar-item-properties)
- [Tab Key Navigation](#tab-key-navigation)
- [Toolbar Item Template](#toolbar-item-template)
- [Toolbar Position](#toolbar-position)
- [ItemClick Event](#itemclick-event)
- [Full InlineToolbarSettings Example](#full-inlinetoolbarsettings-example)
- [EditorTemplate](#editortemplate)
- [ResponseTemplate](#responsetemplate)

---

## InlineToolbarSettings Overview

`InlineToolbarSettings` configures the toolbar rendered inside the Inline AI Assist popup. Custom items are added alongside the default built-in `Send` item.

```razor
@Html.EJS().InlineAIAssist("myAssist")
    .InlineToolbarSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistInlineToolbarSettings {
        Items = ViewBag.Items,
        ToolbarPosition = "Bottom",
        ItemClick = "onToolbarItemClick"
    })
    .Render()
```

---

## Built-in Toolbar Items

By default the inline toolbar renders a single `Send` item that submits the prompt text. All custom items you define are appended alongside this built-in item.

---

## Toolbar Item Properties

Define each toolbar item as a model class and pass the list via `ViewBag`. All properties:

| Property | Type | Description |
|----------|------|-------------|
| `type` | string | `Button` (default), `Separator`, or `Input` |
| `text` | string | Label text displayed on the item |
| `iconCss` | string | CSS class for the item icon |
| `align` | string | Alignment: `Left` (default), `Center`, or `Right` |
| `tooltip` | string | Tooltip text on hover |
| `cssClass` | string | Custom CSS class on the item |
| `disabled` | bool | Disables the item when `true` (default: `false`) |
| `visible` | bool | Shows/hides the item (default: `true`) |
| `tabIndex` | int | Enables Tab/Shift+Tab keyboard navigation |

**Controller:**
```csharp
public class InlineToolbarItemModel
{
    public string type { get; set; }
    public string iconCss { get; set; }
    public string align { get; set; }
    public string cssClass { get; set; }
    public string tooltip { get; set; }
    public string text { get; set; }
    public bool visible { get; set; } = true;
    public bool disabled { get; set; }
}

public ActionResult Index()
{
    var items = new List<InlineToolbarItemModel>();
    items.Add(new InlineToolbarItemModel {
        type = "Button",
        iconCss = "e-icons e-refresh",
        align = "Right",
        cssClass = "custom-btn",
        tooltip = "Refresh content",
        disabled = false,
        visible = true
    });
    items.Add(new InlineToolbarItemModel {
        type = "Button",
        iconCss = "e-icons e-user",
        align = "Right",
        tooltip = "User profile"
    });
    items.Add(new InlineToolbarItemModel {
        type = "Button",
        iconCss = "e-icons e-settings",
        align = "Right",
        visible = false,   // hidden
        disabled = true
    });
    ViewBag.Items = items;
    return View();
}
```

**View:**
```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .RelateTo("#summarizeBtn")
    .InlineToolbarSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistInlineToolbarSettings {
        Items = ViewBag.Items,
        ItemClick = "onToolbarItemClick"
    })
    .Render()
```

---

## Tab Key Navigation

Use `TabIndex` on toolbar items to enable Tab and Shift+Tab keyboard navigation between items (default navigation uses arrow keys only).

```csharp
items.Add(new ToolbarItem { Text = "Item 1", TabIndex = 1 });
items.Add(new ToolbarItem { Text = "Item 2", TabIndex = 2 });
```

Items are navigated in ascending `TabIndex` order. Set all `TabIndex` values to `0` to navigate in DOM order instead:

```csharp
items.Add(new ToolbarItem { Text = "Item 1", TabIndex = 0 });
items.Add(new ToolbarItem { Text = "Item 2", TabIndex = 0 });
```

A `TabIndex` of `0` or negative disables tab key navigation for that item.

---

## Toolbar Item Template

Use `type = "Input"` with a `template` string to embed a custom widget (e.g., a dropdown, date picker) inside the toolbar.

**Controller:**
```csharp
items.Add(new InlineToolbarItemModel {
    type = "Input",
    template = "<div id=\"ddMenu\"></div>",
    align = "Right"
});
ViewBag.Items = items;
```

**View — initialize the widget after the control is created:**
```razor
<style>
    .custom-dropdown.e-dropdown-popup ul { min-width: 100px; }
    #ddMenu.custom-dropdown.e-btn { padding: 5px; height: 30px; width: 100px; }
</style>

@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .RelateTo("#summarizeBtn")
    .InlineToolbarSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistInlineToolbarSettings {
        Items = ViewBag.Items
    })
    .Created("onCreated")
    .Render()

<script>
    var inlineAssist;

    function onCreated() {
        inlineAssist = this;
        // Initialize the widget into the template placeholder
        var splitBtnObj = new ej.splitbuttons.DropDownButton({
            items: [
                { text: 'हिंदी' },
                { text: 'தமிழ்' },
                { text: 'తెలుగు' }
            ],
            content: 'English',
            iconCss: 'e-icons e-translate',
            cssClass: 'custom-dropdown'
        });
        splitBtnObj.appendTo('#ddMenu');
    }
</script>
```

Always initialize custom widgets inside the `onCreated` callback to ensure the DOM placeholder exists.

---

## Toolbar Position

Use `ToolbarPosition` to control where the toolbar is rendered inside the popup:

| Value | Behavior |
|-------|----------|
| `Inline` (default) | Toolbar appears inline alongside the prompt textarea |
| `Bottom` | Toolbar renders in a dedicated footer area at the bottom |

```razor
.InlineToolbarSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistInlineToolbarSettings {
    ToolbarPosition = "Bottom",
    Items = ViewBag.Items
})
```

Toggle position dynamically at runtime:
```javascript
function onToggleToolbarPosition() {
    var current = inlineAssist.inlineToolbarSettings.toolbarPosition;
    inlineAssist.inlineToolbarSettings.toolbarPosition =
        current === 'Inline' ? 'Bottom' : 'Inline';
}
```

---

## ItemClick Event

`ItemClick` fires when any toolbar item is clicked. Use it to respond to custom button presses.

**Event argument properties (ToolbarItemClickEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `item` | ToolbarItemModel | The toolbar item that was clicked |
| `cancel` | bool | Set to `true` to prevent the default action from being performed |
| `element` | HTMLElement | The DOM element of the clicked toolbar item |
| `event` | Event | The native browser event that triggered the click |
| `name` | string | Name of the event (`"itemClick"`) |

```razor
.InlineToolbarSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistInlineToolbarSettings {
    Items = ViewBag.Items,
    ItemClick = "onToolbarItemClick"
})
```

```javascript
function onToolbarItemClick(args) {
    // args.item — the clicked toolbar item
    console.log('Clicked:', args.item.tooltip);
}
```

---

## Full InlineToolbarSettings Example

```razor
@using Syncfusion.EJ2.InteractiveChat

<div style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary"
            style="margin-bottom: 10px;"
            onclick="onSummarizeClick()">
        Content Summarize
    </button>
    <button class="e-btn" style="margin-bottom: 10px;"
            onclick="onToggleToolbarPosition()">
        Toggle Toolbar Position
    </button>

    @Html.EJS().InlineAIAssist("defaultInlineAssist")
        .RelateTo("#summarizeBtn")
        .InlineToolbarSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistInlineToolbarSettings {
            ToolbarPosition = "Bottom",
            ItemClick = "onToolbarItemClick",
            Items = ViewBag.Items
        })
        .Created("onCreated")
        .PromptRequest("onPromptRequest")
        .ResponseSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistResponseSettings {
            ItemSelect = "onItemSelect"
        })
        .Render()
</div>

<script>
    var inlineAssist;

    function onCreated() { inlineAssist = this; }

    function onPromptRequest(args) {
        setTimeout(function () {
            inlineAssist.addResponse('AI response here.');
        }, 1000);
    }

    function onItemSelect(args) {
        if (args.command.label === 'Accept') {
            document.getElementById('editableText').innerHTML =
                '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
            inlineAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
            inlineAssist.hidePopup();
        }
    }

    function onToolbarItemClick(args) {
        // Handle custom toolbar button click
    }

    function onToggleToolbarPosition() {
        var current = inlineAssist.inlineToolbarSettings.toolbarPosition;
        inlineAssist.inlineToolbarSettings.toolbarPosition =
            current === 'Inline' ? 'Bottom' : 'Inline';
    }

    function onSummarizeClick() {
        if (inlineAssist) inlineAssist.showPopup();
    }
</script>
```

---

## EditorTemplate

Use `EditorTemplate` to replace the default footer area (prompt textarea + send button) with a fully custom layout. The template is a `<script>` block referenced by ID.

```razor
@Html.EJS().InlineAIAssist("defaultInlineAssist")
    .EditorTemplate("#footerContent")
    .RelateTo("#summarizeBtn")
    .PopupWidth("500px")
    .Created("onCreated")
    .PromptRequest("onPromptRequest")
    .Render()

<script id="footerContent" type="text/x-jsrender">
    <div class="custom-footer" style="display:flex; gap:10px; padding:10px;">
        <textarea id="promptTextArea" class="e-input" rows="2"
                  placeholder="Enter your prompt here"
                  style="width:100%; padding:12px; min-height:46px; border-radius:5px; border:1px solid #ccc;">
        </textarea>
        <button id="sendPrompt" onclick="generate()"
                class="e-btn e-primary"
                style="padding:5px 15px; align-self:center;">
            Generate
        </button>
    </div>
</script>

<script>
    var inlineAssist;

    function onCreated() { inlineAssist = this; }

    function generate() {
        var textArea = document.getElementById('promptTextArea');
        if (textArea) {
            inlineAssist.executePrompt(textArea.value);
            textArea.value = '';
        }
    }

    function onPromptRequest(args) {
        setTimeout(function () {
            inlineAssist.addResponse('AI response for custom footer.');
        }, 1000);
    }
</script>
```

**Key points:**
- The template script block `type` must be `text/x-jsrender`.
- Use `executePrompt(text)` inside the custom footer to trigger the AI request manually.
- Clear the textarea after submitting for a clean UX.

---

## ResponseTemplate

Use `ResponseTemplate` to customize how each AI response is rendered inside the popup. The template context exposes `${response}` and `${toolbarItems}` variables.

```razor
@Html.EJS().InlineAIAssist("response-item")
    .RelateTo("#summarizeBtn")
    .ResponseTemplate("#responseTemplate")
    .Created("onCreated")
    .PromptRequest("onPromptRequest")
    .ResponseSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistResponseSettings {
        ItemSelect = "onItemSelect"
    })
    .Render()

<script id="responseTemplate" type="text/x-jsrender">
    <div class="responseItemContent" style="padding:10px;">
        <div class="response-header"
             style="display:flex; align-items:center; gap:8px; margin-bottom:10px; font-weight:bold;">
            <span class="e-icons e-assistview-icon"></span>
            Inline AI Assist
        </div>
        <div class="responseContent" style="margin-top:8px;">
            ${response}
        </div>
    </div>
</script>
```

**Available template variables:**
- `${response}` — the AI-generated response HTML string
- `${toolbarItems}` — the response toolbar items array

Use `ResponseTemplate` when you need to add branding, structured layout, or metadata display around each AI response.
