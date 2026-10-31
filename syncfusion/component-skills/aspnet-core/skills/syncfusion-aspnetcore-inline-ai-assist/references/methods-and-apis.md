# Public Methods and APIs

## Table of Contents
- [Overview](#overview)
- [addResponse](#addresponse)
- [executePrompt](#executeprompt)
- [showPopup](#showpopup)
- [hidePopup](#hidepopup)
- [showCommandPopup](#showCommandPopup)
- [hideCommandPopup](#hideCommandPopup)

## Overview

The Inline AI Assist control provides 6 public methods for programmatic interaction with the component. These methods enable dynamic control, response management, popup manipulation, and command popup handling.

**Method Reference:**
- `addResponse(response: string): void` - Add response text
- `executePrompt(prompt: string): void` - Execute prompt dynamically
- `showPopup(x?: number, y?: number): void` - Show popup
- `hidePopup(): void` - Hide popup
- `showCommandPopup(): void` - Show command popup
- `hideCommandPopup(): void` - Hide command popup

---

## Public Methods

The Inline AI Assist control provides several public methods for programmatic interaction.

### addResponse

Add a response to the control programmatically.

**Syntax:** `inlineAssist.addResponse(responseText)`

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

<div class="container" style="height: 350px; width: 650px;">
    <button id="addResponse" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onAddResponseClick()">Add Response</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="response" relateTo="#addResponse" created="onCreated" promptRequest="onPromptRequest">
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
    
    function onAddResponseClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
            inlineAssist.addResponse('Dynamic response');
        }
    }
</script>
```

### executePrompt

Execute a prompt dynamically and trigger the promptRequest event.

**Syntax:** `inlineAssist.executePrompt(promptText)`

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

<div class="container" style="height: 350px; width: 650px;">
    <button id="executePrompt" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onExecutePromptClick()">Execute Prompt</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="execute-prompt" relateTo="#executePrompt" created="onCreated" promptRequest="onPromptRequest">
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
    
    function onExecutePromptClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
            inlineAssist.executePrompt('What is the current temperature?');
        }
    }
</script>
```

### showPopup

Open the Inline AI Assist popup at optional coordinates.

**Syntax:** `inlineAssist.showPopup(coordinates?)`

```javascript
// Show popup at default position (relative to relateTo element)
inlineAssist.showPopup();

// Show popup at specific coordinates
inlineAssist.showPopup({ x: 100, y: 100 });
```

### hidePopup

Close the Inline AI Assist popup.

**Syntax:** `inlineAssist.hidePopup()`

```javascript
inlineAssist.hidePopup();
```

### showCommandPopup

Open the command action popup (only works when main popup is open).

**Syntax:** `inlineAssist.showCommandPopup()`

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
            prompt = "Summarize the content"
        },
        new {
            label = "Shorten",
            prompt = "Shorten the content"
        },
        new {
            label = "Translate",
            prompt = "Translate the content"
        },
        new {
            label = "Make professional",
            prompt = "Make the content more professional"
        },
    };
}

<div class="container" style="height: 350px; width: 650px;">
    <button id="showCommandsBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onShowCommandPopupClick()">Show Command Popup</button>
    <button id="hideCommandsBtn" class="e-btn e-outline" style="margin-bottom: 10px;" onclick="onHideCommandPopupClick()">Hide Command Popup</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="command-popup" relateTo="#showCommandsBtn" created="onCreated" close="onClose" promptRequest="onPromptRequest">
        <e-inlineaiassist-commandsettings commands="commandsData"></e-inlineaiassist-commandsettings>
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
</div>

<script>
    var inlineAssist;
    var showPopup = false;
    
    function onCreated() {
        inlineAssist = this;
    }

    function onClose() {
        if (showPopup) {
            inlineAssist.showPopup();
        }
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
    
    function onShowCommandPopupClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
            inlineAssist.showCommandPopup();
            showPopup = true;
        }
    }
    
    function onHideCommandPopupClick() {
        if (inlineAssist) {
            inlineAssist.hideCommandPopup();
            showPopup = false;
        }
    }
</script>
```

### hideCommandPopup

Close the command action popup.

**Syntax:** `inlineAssist.hideCommandPopup()`

```javascript
inlineAssist.hideCommandPopup();
```

## Summary

| Method | Purpose | Returns |
|--------|---------|---------|
| **addResponse()** | Add response text programmatically | void |
| **executePrompt()** | Execute prompt and trigger promptRequest event | void |
| **showPopup()** | Open main popup (optional coordinates) | void |
| **hidePopup()** | Close main popup | void |
| **showCommandPopup()** | Open command menu popup | void |
| **hideCommandPopup()** | Close command menu popup | void |

All methods return `void` and should be called on a valid control instance obtained from the `created` event.

**Key Principles:**
- Always store control reference in `created` event
- Use `showPopup()` before `showCommandPopup()`
- Use `executePrompt()` to trigger prompt processing
- Use `addResponse()` in API response handlers
- Close popups with `hidePopup()` and `hideCommandPopup()`

````