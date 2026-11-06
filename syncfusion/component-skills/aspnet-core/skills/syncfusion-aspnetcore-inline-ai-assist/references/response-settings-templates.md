# Response Settings and Templates

## Table of Contents
- [ResponseSettings Overview](#responsesettings-overview)
- [Built-in Response Items](#built-in-response-items)
- [Custom Response Items](#custom-response-items)
- [Response Item Properties](#response-item-properties)
- [EditorTemplate](#editortemplate)
- [ResponseTemplate](#responsetemplate)
- [Item Select Event](#item-select-event)

## ResponseSettings Overview

The `ResponseSettings` property configures how responses are displayed and handled in the Inline AI Assist. It allows customization of response action items and templates.

**Tag Helper:** `<e-inlineaiassist-responsesettings>`

**Key Features:**
- Built-in accept/reject items
- Custom response items with grouping
- Editor template for footer customization
- Response template for item styling
- ItemSelect event for handling user actions

## Built-in Response Items

By default, the response popup displays built-in action items allowing users to accept or reject the response.

### Default Response Behavior

```razor
@using Syncfusion.EJ2.InteractiveChat;

<ejs-inlineaiassist id="assist1" relateTo="#btn" created="onCreated" promptRequest="onPromptRequest">
    <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
</ejs-inlineaiassist>
```

**Built-in Items:**
- **Accept** - User accepts the response
- **Reject/Discard** - User rejects the response

### Basic Handler

```javascript
function onItemSelect(args) {
    if (args.command.label === 'Accept') {
        // Handle acceptance
        var response = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
        // Apply response to content
        inlineAssist.hidePopup();
    } else if (args.command.label === 'Discard') {
        // Handle rejection
        inlineAssist.hidePopup();
    }
}
```

## Custom Response Items

Add custom items to the response popup alongside built-in items.

### Defining Custom Response Items in Controller

```csharp
public ActionResult Index()
{
    var responseItems = new object[]
    {
        new {
            label = "Regenerate",
            iconCss = "e-icons e-refresh",
            tooltip = "Regenerate",
            groupBy = "Actions"
        },
        new {
            label = "Copy",
            iconCss = "e-icons e-icons e-copy",
            tooltip = "Copy",
            groupBy = "Actions",
            disabled = true
        }
    };
    
    ViewBag.ResponseItems = responseItems;
    return View();
}
```

### Using Custom Response Items in View

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
    var responseItems = new object[]
    {
        new {
            label = "Regenerate",
            iconCss = "e-icons e-refresh",
            tooltip = "Regenerate",
            groupBy = "Actions"
        },
        new {
            label = "Copy",
            iconCss = "e-icons e-icons e-copy",
            tooltip = "Copy",
            groupBy = "Actions",
            disabled = true
        }
    };
}

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="response-settings" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
        <e-inlineaiassist-responsesettings items = "responseItems", itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
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
        // Your required action here
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
    
    function onSummarizeClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
        }
    }
</script>
```

## Response Item Properties

### id
Unique identifier for tracking selected items:

```csharp
new {
    id = "response-copy",
    label = "Copy",
    iconCss = "e-icons e-copy"
}
```

### label
Visible text displayed in response popup:

```csharp
new {
    label = "Regenerate",
    iconCss = "e-icons e-refresh"
}
```

### iconCss
Icon class for visual representation:

```csharp
new {
    label = "Copy",
    iconCss = "e-icons e-copy"
}
```

### disabled
Disable items to prevent selection (default: `false`):

```csharp
new {
    label = "Copy",
    iconCss = "e-icons e-copy",
    disabled = true
}
```

### groupBy
Group items visually with headers:

```csharp
new {
    label = "Regenerate",
    iconCss = "e-icons e-refresh",
    groupBy = "Actions"
}
```

### tooltip
Hover text for items:

```csharp
new {
    label = "Regenerate",
    iconCss = "e-icons e-refresh",
    tooltip = "Generate alternative response"
}
```

## EditorTemplate

The `editorTemplate` property customizes the default footer area for prompt input and actions.

### Custom Editor Template Example

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
    .custom-footer {
        display: flex;
        gap: 10px;
        padding: 10px;
        background-color: transparent;
    }

    #promptTextArea {
        width: 100%;
        padding: 12px;
        min-height: 46px;
        border-radius: 5px;
        border: 1px solid #ccc;
        margin-bottom: 0;
    }

    #sendPrompt {
        padding: 5px 15px;
        align-self: center;
    }
</style>

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="defaultInlineAssist" editorTemplate="#footerContent" relateTo="#summarizeBtn" popupWidth="500px" created="onCreated" promptRequest="onPromptRequest">
        <e-inlineaiassist-responsesettings itemSelect="onResponseItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
</div>

<script id="footerContent" type="text/x-jsrender">
    <div class="custom-footer">
        <textarea id="promptTextArea" class="e-input" rows="2" placeholder="Enter your prompt here"></textarea>
        <button id="sendPrompt" onclick ="generate()" class="e-btn e-primary">Generate</button>
    </div>
</script>

<script>
    var inlineAssist;
    
    function onCreated() {
        inlineAssist = this;
    }

    function generate() {
        const textArea = document.getElementById('promptTextArea');
        if (textArea) {
            inlineAssist.executePrompt(textArea.innerHTML);
            textArea.value = '';
        }
    }
    
    function onPromptRequest(args) {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAssist.addResponse(defaultResponse);
        }, 1000);
    }
    
    function onResponseItemSelect(args) {
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
    
    function onSummarizeClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
        }
    }
</script>
```

## ResponseTemplate

The `responseTemplate` property customizes how response items are rendered.

**Template Context:** Includes `response` and `toolbarItems` values

### Custom Response Template Example

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using Newtonsoft.Json

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
    
    .responseItemContent {
        padding: 10px;
    }
    
    .response-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 10px;
        font-weight: bold;
    }
    
    .response-header .e-assistview-icon:before {
        font-size: 18px;
    }
    
    .responseContent {
        margin-top: 8px;
    }
</style>

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="response-item" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest" responseTemplate="#responseTemplate">
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
</div>

<script id="responseTemplate" type="text/x-jsrender">
    <div class="responseItemContent">
        <div class="response-header">
            <span class="e-icons e-assistview-icon"></span>
            Inline AI Assist
        </div>
        <div class="responseContent">${response}</div>
    </div>
</script>

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
    
    function onSummarizeClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
        }
    }
</script>
```

### Template Syntax

**JSRender Template Variables:**
- `${response}` - The response text/HTML
- `${toolbarItems}` - Available toolbar actions

**Custom HTML:**
```html
<div class="custom-response">
    <span class="icon">🤖</span>
    <div class="content">${response}</div>
</div>
```

## Item Select Event

The `itemSelect` event fires when user selects a response action item.

### Event Handler Pattern

```javascript
function onItemSelect(args) {
    // args.command contains the selected item
    console.log('Selected item:', args.command.label);
    
    if (args.command.label === 'Accept') {
        // Handle acceptance
    } else if (args.command.label === 'Regenerate') {
        // Handle regeneration
    } else if (args.command.label === 'Copy') {
        // Handle copy
    }
}
```

### Args Properties
- `args.command` - Selected response item object
- `args.command.label` - Item label
- `args.command.id` - Item identifier

## Summary

- **ResponseSettings**: Configure response behavior and customization
- **Built-in items**: Accept/Reject responses by default
- **Custom items**: Add Regenerate, Copy, and other actions
- **Item properties**: label, iconCss, disabled, groupBy, tooltip
- **EditorTemplate**: Customize footer prompt input area
- **ResponseTemplate**: Customize response display format
- **ItemSelect event**: Handle response action selection
