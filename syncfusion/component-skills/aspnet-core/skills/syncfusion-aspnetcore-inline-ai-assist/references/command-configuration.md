# Command Configuration

## Table of Contents
- [Command Settings Overview](#command-settings-overview)
- [Configure Command Items](#configure-command-items)
- [Command Properties](#command-properties)
- [Popup Dimensions](#popup-dimensions)
- [Item Select Event](#item-select-event)
- [Command Grouping](#command-grouping)
- [Complete Example](#complete-example)

## Command Settings Overview

The `CommandSettings` property enables a command action popup that displays pre-configured prompts as quick actions. Users can select commands to execute specific AI tasks without typing.

**Tag Helper:** `<e-inlineaiassist-commandsettings>`

**Key Features:**
- Pre-defined command items with labels and prompts
- Visual icons and tooltips for each command
- Grouped organization for better UX
- Customizable popup dimensions
- ItemSelect event handling for command execution

## Configure Command Items

The `commands` property accepts an array of command item objects. Each item represents a quick action the user can select.

### Command Items in Controller

Define commands in your controller and pass to the view via ViewBag:

```csharp
public ActionResult Index()
{
    var commandsData = new object[]
    {
        new {
            label = "Summarize",
            prompt = "Summarize the content",
            iconCss = "e-icons e-collapse-2",
            groupBy = "Improve content",
            tooltip = "Summarize"
        },
        new {
            label = "Shorten",
            prompt = "Shorten the content",
            iconCss = "e-icons e-shorten",
            groupBy = "Improve content",
            tooltip = "Shorten",
            disabled = true
        },
        new {
            label = "Translate",
            prompt = "Translate the content",
            groupBy = "Edit content",
            iconCss = "e-icons e-translate",
            disabled = true
        },
        new {
            label = "Make professional",
            prompt = "Make the content more professional",
            groupBy = "Edit content",
            iconCss = "e-icons e-elaborate"
        },
    };
    
    ViewBag.CommandsData = commandsData;
    return View();
}
```

### Use Commands in View

```razor
<ejs-inlineaiassist id="command-settings" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
    <e-inlineaiassist-commandsettings commands="ViewBag.CommandsData" itemSelect="onCommandItemSelect" popupWidth="250px" popupHeight="200px"></e-inlineaiassist-commandsettings>
    <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
</ejs-inlineaiassist>
```

## Command Properties

### id
Assign unique identifier to each command for tracking and differentiation:

```csharp
new {
    id = "cmd-summarize",
    label = "Summarize",
    prompt = "Summarize the content"
}
```

### label
Visible text displayed in the command popup describing the action:

```csharp
new {
    label = "Summarize",
    prompt = "Summarize the content"
}
```

### prompt
The prompt text executed when command is selected:

```csharp
new {
    label = "Summarize",
    prompt = "Summarize the content"
}
```

### iconCss
Icons displayed alongside the command label using Syncfusion icon classes:

```csharp
new {
    label = "Summarize",
    prompt = "Summarize the content",
    iconCss = "e-icons e-collapse-2"  // Icon class
}
```

### disabled
Disable specific commands to prevent selection (default: `false`):

```csharp
new {
    label = "Translate",
    prompt = "Translate the content",
    disabled = true  // User cannot select this command
}
```

### groupBy
Group commands visually with headers in the popup:

```csharp
new {
    label = "Summarize",
    prompt = "Summarize the content",
    groupBy = "Improve content"  // Group header
}
```

### tooltip
Hover text displayed when user hovers over command item:

```csharp
new {
    label = "Summarize",
    prompt = "Summarize the content",
    tooltip = "Summarize"
}
```

## Popup Dimensions

### popupWidth
Control popup width using CSS values or pixel numbers:

```razor
<e-inlineaiassist-commandsettings commands="ViewBag.CommandsData" popupWidth="250px"></e-inlineaiassist-commandsettings>
```

### popupHeight
Control popup height for scrollable lists when many commands exist:

```razor
<e-inlineaiassist-commandsettings commands="ViewBag.CommandsData" popupHeight="200px"></e-inlineaiassist-commandsettings>
```

## Item Select Event

The `itemSelect` event fires when user selects a command from the command popup.

### Event Handler Pattern

```javascript
function onCommandItemSelect(args) {
    // args.command contains the selected command object
    console.log('Selected command:', args.command.label);
    console.log('Prompt:', args.command.prompt);
    
    // Perform action based on selected command
    if (args.command.label === 'Summarize') {
        // Execute summarization logic
    } else if (args.command.label === 'Translate') {
        // Execute translation logic
    }
}
```

### Args Properties
- `args.command` - Selected command object with all properties
- `args.command.label` - Command label text
- `args.command.prompt` - Prompt to execute

## Command Grouping

Organize commands into logical groups using the `groupBy` property:

```csharp
var commandsData = new object[]
{
    // Group 1: Improve content
    new {
        label = "Summarize",
        prompt = "Summarize the content",
        groupBy = "Improve content",
        iconCss = "e-icons e-collapse-2"
    },
    new {
        label = "Expand",
        prompt = "Expand the content with more details",
        groupBy = "Improve content",
        iconCss = "e-icons e-elaborate"
    },
    
    // Group 2: Edit content
    new {
        label = "Translate",
        prompt = "Translate the content",
        groupBy = "Edit content",
        iconCss = "e-icons e-translate"
    },
    new {
        label = "Fix Grammar",
        prompt = "Fix grammar and spelling",
        groupBy = "Edit content",
        iconCss = "e-icons e-edit"
    }
};
```

**Result in UI:**
The popup displays commands grouped with headers:
```
Improve content
  ├─ Summarize
  └─ Expand

Edit content
  ├─ Translate
  └─ Fix Grammar
```

## Complete Example

Full implementation with all command configuration features:

```razor
@using Syncfusion.EJ2.InteractiveChat;

<style>
    #editableText {
        width: 100%;
        min-height: 120px;
        max-height: 300px;
        overflow-y: auto;
        font-size: 16px;
        padding: 12px;
        border-radius: 4px;
        border: 1px solid;
    }
</style>

@{
    var commandsData = new object[]
    {
        new {
            label = "Summarize",
            prompt = "Summarize the content",
            iconCss = "e-icons e-collapse-2",
            groupBy = "Improve content",
            tooltip = "Summarize"
        },
        new {
            label = "Shorten",
            prompt = "Shorten the content",
            iconCss = "e-icons e-shorten",
            groupBy = "Improve content",
            tooltip = "Shorten",
            disabled = true
        },
        new {
            label = "Translate",
            prompt = "Translate the content",
            groupBy = "Edit content",
            iconCss = "e-icons e-translate",
            disabled = true
        },
        new {
            label = "Make professional",
            prompt = "Make the content more professional",
            groupBy = "Edit content",
            iconCss = "e-icons e-elaborate"
        },
    };
}

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="command-settings" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
        <e-inlineaiassist-commandsettings commands="commandsData" itemSelect="onCommandItemSelect" popupWidth="250px" popupHeight="200px"></e-inlineaiassist-commandsettings>
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
</div>

<script>
    var inlineAssist;
    
    function onCreated() {
        inlineAssist = this;
    }
    
    function onPromptRequest(args) {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAssist.addResponse(defaultResponse);
        }, 1000);
    }
    
    function onItemSelect(args) {
        if (args.command.label === 'Accept') {
            var editable = document.getElementById('editableText');
            if (editable) {
                editable.innerHTML = '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
            }
            inlineAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
            inlineAssist.hidePopup();
        }
    }

    function onCommandItemSelect(args) {
        // Your required action here
        console.log('Selected command:', args.command.label);
    }
    
    function onSummarizeClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
        }
    }
</script>
```

## Summary

- **Commands property**: Array of command objects with label, prompt, and metadata
- **Command properties**: id, label, prompt, iconCss, disabled, groupBy, tooltip
- **Popup dimensions**: popupWidth and popupHeight for layout control
- **ItemSelect event**: Triggered when user selects command
- **Grouping**: Organize commands with groupBy property for better UX
