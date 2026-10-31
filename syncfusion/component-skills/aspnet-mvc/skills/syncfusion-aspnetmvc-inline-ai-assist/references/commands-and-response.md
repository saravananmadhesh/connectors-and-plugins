# Commands & Response Settings — Syncfusion ASP.NET MVC Inline AI Assist

## Table of Contents
- [CommandSettings Overview](#commandsettings-overview)
- [Command Item Properties](#command-item-properties)
- [Command Popup Dimensions](#command-popup-dimensions)
- [ItemSelect Event (Commands)](#itemselect-event-commands)
- [Full CommandSettings Example](#full-commandsettings-example)
- [ResponseSettings Overview](#responsesettings-overview)
- [Built-in Response Items](#built-in-response-items)
- [Response Item Properties](#response-item-properties)
- [ItemSelect Event (Response)](#itemselect-event-response)
- [Full ResponseSettings Example](#full-responsesettings-example)

---

## CommandSettings Overview

`CommandSettings` renders a command action popup when the user clicks a designated trigger. It provides shortcut actions (e.g., Summarize, Shorten, Translate) that each fire a predefined prompt automatically.

Configure `CommandSettings` on the `InlineAIAssistCommandSettings` object:

```razor
@Html.EJS().InlineAIAssist("myAssist")
    .CommandSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistCommandSettings {
        Commands = commandsData,
        PopupWidth = "250px",
        PopupHeight = "200px",
        ItemSelect = "onCommandItemSelect"
    })
    .Render()
```

---

## Command Item Properties

Define each command as an anonymous object in an array. All properties:

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Visible text in the command popup |
| `prompt` | string | Prompt text sent when this command is selected |
| `iconCss` | string | CSS class for the icon shown alongside the label |
| `groupBy` | string | Group header label for visual grouping |
| `tooltip` | string | Tooltip text shown on hover |
| `disabled` | bool | Prevents selection when `true` (default: `false`) |
| `id` | string | Unique identifier for detecting selected command |

```csharp
// Controller
var commandsData = new object[]
{
    new {
        id = "cmd_summarize",
        label = "Summarize",
        prompt = "Summarize the content",
        iconCss = "e-icons e-collapse-2",
        groupBy = "Improve content",
        tooltip = "Summarize"
    },
    new {
        id = "cmd_shorten",
        label = "Shorten",
        prompt = "Shorten the content",
        iconCss = "e-icons e-shorten",
        groupBy = "Improve content",
        tooltip = "Shorten",
        disabled = true          // disabled — cannot be selected
    },
    new {
        id = "cmd_translate",
        label = "Translate",
        prompt = "Translate the content",
        groupBy = "Edit content",
        iconCss = "e-icons e-translate",
        disabled = true
    },
    new {
        id = "cmd_professional",
        label = "Make professional",
        prompt = "Make the content more professional",
        groupBy = "Edit content",
        iconCss = "e-icons e-elaborate"
    }
};
```

- Use `id` to uniquely identify each command for programmatic detection in event handlers.
- Use `groupBy` to visually separate commands into labeled sections inside the popup.
- Items sharing the same `groupBy` value are rendered under one group header.

**Using the `id` property in ItemSelect:**
```javascript
function onCommandItemSelect(args) {
    if (args.command.id === 'cmd_summarize') {
        console.log('Summarize command selected');
    } else if (args.command.id === 'cmd_translate') {
        var targetLang = prompt('Translate to which language?', 'French');
        if (targetLang) {
            args.cancel = true;   // block default prompt
            inlineAssist.executePrompt('Translate to ' + targetLang);
        }
    }
}
```

---

## Command Popup Dimensions

Control the command popup size with `PopupWidth` and `PopupHeight` on `CommandSettings`. Use CSS values or numeric pixel values.

```razor
.CommandSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistCommandSettings {
    Commands = commandsData,
    PopupWidth = "250px",    // width of command popup
    PopupHeight = "200px"    // set height to enable scrolling for long lists
})
```

Set `PopupHeight` when the command list is long enough to require scrolling.

---

## ItemSelect Event (Commands)

The `ItemSelect` event fires when a user selects a command from the command popup. Use it to perform custom logic before or after the prompt is sent.

**Event argument properties (CommandItemSelectEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `command` | CommandItemModel | The command item that was selected |
| `cancel` | bool | Set to `true` to prevent the default prompt from being sent |
| `element` | HTMLElement | The DOM element of the selected command item |
| `event` | Event | The native browser event that triggered the selection |
| `name` | string | Name of the event (`"itemSelect"`) |

```razor
.CommandSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistCommandSettings {
    Commands = commandsData,
    ItemSelect = "onCommandItemSelect"
})
```

```javascript
function onCommandItemSelect(args) {
    // args.command — the selected command item object
    console.log('Selected command:', args.command.label);
}
```

**Cancelling a command selection:**

Set `args.cancel = true` to block the default prompt dispatch. Use this to apply custom logic (validation, substitution, or async pre-processing) before the prompt is sent, or to suppress it entirely for certain commands.

```javascript
function onCommandItemSelect(args) {
    if (args.command.label === 'Translate') {
        args.cancel = true;   // block the default prompt

        // Show a language picker before sending, then fire manually
        var targetLang = prompt('Translate to which language?', 'French');
        if (targetLang) {
            inlineAssist.executePrompt('Translate the content to ' + targetLang);
        }
        return;
    }

    // All other commands proceed with their default prompts
    console.log('Executing command:', args.command.label);
}
```

---

## Full CommandSettings Example

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var commandsData = new object[]
    {
        new { label = "Summarize", prompt = "Summarize the content", iconCss = "e-icons e-collapse-2", groupBy = "Improve content", tooltip = "Summarize" },
        new { label = "Shorten", prompt = "Shorten the content", iconCss = "e-icons e-shorten", groupBy = "Improve content", tooltip = "Shorten", disabled = true },
        new { label = "Translate", prompt = "Translate the content", groupBy = "Edit content", iconCss = "e-icons e-translate", disabled = true },
        new { label = "Make professional", prompt = "Make the content more professional", groupBy = "Edit content", iconCss = "e-icons e-elaborate" }
    };
}

<div style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary"
            style="margin-bottom: 10px;"
            onclick="onSummarizeClick()">
        Content Summarize
    </button>

    @Html.EJS().InlineAIAssist("command-settings")
        .RelateTo("#summarizeBtn")
        .Created("onCreated")
        .PromptRequest("onPromptRequest")
        .CommandSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistCommandSettings {
            Commands = commandsData,
            PopupWidth = "250px",
            PopupHeight = "200px",
            ItemSelect = "onCommandItemSelect"
        })
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
            inlineAssist.addResponse('AI response for: ' + args.prompt);
        }, 1000);
    }

    function onCommandItemSelect(args) {
        // args.command.label — label of the selected command
        // Set args.cancel = true to prevent the default prompt from being sent
        console.log('Selected command:', args.command.label);
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

    function onSummarizeClick() {
        if (inlineAssist) inlineAssist.showPopup();
    }
</script>
```

---

## ResponseSettings Overview

`ResponseSettings` configures the response action popup shown after an AI response is generated. By default it shows built-in `Accept` and `Discard` items. Custom items can be appended alongside the built-in ones.

```razor
@Html.EJS().InlineAIAssist("myAssist")
    .ResponseSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistResponseSettings {
        Items = responseItems,
        ItemSelect = "onItemSelect"
    })
    .Render()
```

---

## Built-in Response Items

The response popup always renders two built-in items unless overridden:

| Label | Default Action |
|-------|---------------|
| `Accept` | Confirms and applies the AI response |
| `Discard` | Dismisses the response |

These are available in `args.command.label` within the `ItemSelect` handler.

---

## Response Item Properties

Define custom response items as anonymous objects. All properties:

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Visible text in the response popup |
| `iconCss` | string | CSS class for the icon |
| `groupBy` | string | Group header label for visual grouping |
| `tooltip` | string | Tooltip text on hover |
| `disabled` | bool | Prevents selection when `true` (default: `false`) |
| `id` | string | Unique identifier for action detection |

```csharp
var responseItems = new object[]
{
    new {
        id = "resp_regenerate",
        label = "Regenerate",
        iconCss = "e-icons e-refresh",
        tooltip = "Regenerate",
        groupBy = "Actions"
    },
    new {
        id = "resp_copy",
        label = "Copy",
        iconCss = "e-icons e-copy",
        tooltip = "Copy",
        groupBy = "Actions",
        disabled = true
    }
};
```

Custom items are added **alongside** built-in `Accept` and `Discard` items, not replacing them.

**Using the `id` property in ItemSelect:**
```javascript
function onItemSelect(args) {
    if (args.command.id === 'resp_regenerate') {
        // Regenerate the response
        inlineAssist.executePrompt(inlineAssist.prompts[inlineAssist.prompts.length - 1].prompt);
    } else if (args.command.id === 'resp_copy') {
        // Copy response text to clipboard
        var lastResponse = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
        navigator.clipboard.writeText(lastResponse);
    }
}
```

---

## ItemSelect Event (Response)

Fires when any item (built-in or custom) is selected from the response popup.

**Event argument properties (ResponseItemSelectEventArgs):**

| Property | Type | Description |
|----------|------|-------------|
| `command` | ResponseItemModel | The response item that was selected |
| `cancel` | bool | Set to `true` to prevent the default action from being performed |
| `element` | HTMLElement | The DOM element of the selected response item |
| `event` | Event | The native browser event that triggered the selection |
| `name` | string | Name of the event (`"itemSelect"`) |

```razor
.ResponseSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistResponseSettings {
    ItemSelect = "onItemSelect"
})
```

```javascript
function onItemSelect(args) {
    switch (args.command.label) {
        case 'Accept':
            // Apply response to editable content
            document.getElementById('editableText').innerHTML =
                '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
            inlineAssist.hidePopup();
            break;
        case 'Discard':
            inlineAssist.hidePopup();
            break;
        case 'Regenerate':
            inlineAssist.executePrompt(args.prompt);
            break;
        case 'Copy':
            navigator.clipboard.writeText(
                inlineAssist.prompts[inlineAssist.prompts.length - 1].response
            );
            break;
    }
}
```

---

## Full ResponseSettings Example

```razor
@using Syncfusion.EJ2.InteractiveChat

@{
    var responseItems = new object[]
    {
        new { label = "Regenerate", iconCss = "e-icons e-refresh", tooltip = "Regenerate", groupBy = "Actions" },
        new { label = "Copy", iconCss = "e-icons e-copy", tooltip = "Copy", groupBy = "Actions", disabled = true }
    };
}

<div style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary"
            style="margin-bottom: 10px;"
            onclick="onSummarizeClick()">
        Content Summarize
    </button>

    @Html.EJS().InlineAIAssist("response-settings")
        .RelateTo("#summarizeBtn")
        .Created("onCreated")
        .PromptRequest("onPromptRequest")
        .ResponseSettings(new Syncfusion.EJ2.InteractiveChat.InlineAIAssistResponseSettings {
            Items = responseItems,
            ItemSelect = "onItemSelect"
        })
        .Render()
</div>

<script>
    var inlineAssist;

    function onCreated() { inlineAssist = this; }

    function onPromptRequest(args) {
        setTimeout(function () {
            inlineAssist.addResponse('Your AI response here.');
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

    function onSummarizeClick() {
        if (inlineAssist) inlineAssist.showPopup();
    }
</script>
```
