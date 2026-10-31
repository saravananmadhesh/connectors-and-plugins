# Inline Assist Features

## Table of Contents
- [Prompt Property](#prompt-property)
- [Prompts Collection](#prompts-collection)
- [Placeholder Text](#placeholder-text)
- [Z-Index Property](#z-index-property)
- [Popup Dimensions](#popup-dimensions)
- [CSS Class Customization](#css-class-customization)
- [Advanced Prompt Scenarios](#advanced-prompt-scenarios)

## Prompt Property

The `prompt` property sets a default prompt text for the Inline AI Assist control. This appears in the prompt textarea.

### Basic Example

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
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>

    <ejs-inlineaiassist id="defaultInlineAssist" prompt="What are the benifits of Inline AI Assist ?" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
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
    
    function onSummarizeClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
        }
    }
</script>
```

**Use Cases:**
- Pre-fill common questions
- Guide users with example prompts
- Context-specific prompt suggestions

## Prompts Collection

The `prompts` property stores all prompt-response pairs in the control history. This allows tracking and reviewing past interactions.

**Note:** The `prompts` collection stores all the prompts and responses generated during the session.

### Accessing Prompt History

```javascript
function displayPromptHistory() {
    if (inlineAssist && inlineAssist.prompts) {
        var lastPrompt = inlineAssist.prompts[inlineAssist.prompts.length - 1];
        
        console.log('Last prompt:', lastPrompt.prompt);
        console.log('Last response:', lastPrompt.response);
        
        // Display all prompts
        inlineAssist.prompts.forEach((item, index) => {
            console.log(`Prompt ${index + 1}: ${item.prompt}`);
            console.log(`Response ${index + 1}: ${item.response}`);
        });
    }
}
```

### Pre-loading Prompts Example

```razor
@using Syncfusion.EJ2.InteractiveChat;
@using Newtonsoft.Json;

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
    var promptsData = new[]
    {
        new { prompt = "What is AI?", response = "<div> AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem - solving, and decision - making.</ div >", suggestionData = new List<string> { } }
    };
    var promptsJson = JsonSerializer.Serialize(promptsData);
}

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="defaultInlineAssist" prompts="@promptsData" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
</div>

<script>
    var inlineAssist;
    var prompts = @Html.Raw(promptsJson);
    function onCreated() {
        inlineAssist = this;
    }
    
    function onPromptRequest(args) {
        setTimeout(function () {
            var foundPrompt = prompts.find(function (promptObj) {
                return promptObj.prompt === args.prompt;
            });
            var defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAssist.addResponse(foundPrompt ? foundPrompt.response : defaultResponse);
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

## Placeholder Text

The `placeholder` property sets the placeholder text displayed in the prompt textarea when empty.

**Default:** `"Ask or generate AI content.."`

### Custom Placeholder Example

```razor
<ejs-inlineaiassist id="assist1" 
    placeholder="Type your prompt here..." 
    relateTo="#btn">
</ejs-inlineaiassist>
```

## Z-Index Property

The `zIndex` property controls the stacking context of the popup, determining its position relative to other elements.

**Default:** `1000`

### Setting Z-Index

```razor
<ejs-inlineaiassist id="assist2" 
    zIndex="4000" 
    relateTo="#btn">
</ejs-inlineaiassist>
```

**Use Cases:**
- Ensure popup appears above modals: `zIndex="9999"`
- Place behind other UI: `zIndex="100"`
- Default layering: `zIndex="1000"`

## Popup Dimensions

### Popup Width

The `popupWidth` property sets the width of the Inline AI Assist control popup.

**Default:** `"400px"`

```razor
<ejs-inlineaiassist id="assist3" popupWidth="500px" relateTo="#btn"></ejs-inlineaiassist>
```

### Popup Height

The `popupHeight` property sets the height of the Inline AI Assist control popup.

**Default:** `"auto"`

```razor
<ejs-inlineaiassist id="assist4" popupHeight="350px" relateTo="#btn"></ejs-inlineaiassist>
```

## CSS Class Customization

The `cssClass` property applies custom CSS classes to the Inline AI Assist control for styling customization.

### Complete Customization Example

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
    
    .custom-container {
        background-color: #f5f5f5;
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
</style>

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="defaultInlineAssist" 
        relateTo="#summarizeBtn" 
        popupHeight="350px" 
        popupWidth="650px" 
        placeholder="Type your prompt here..." 
        cssClass="custom-container" 
        zIndex="4000" 
        created="onCreated" 
        promptRequest="onPromptRequest">
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
    
    function onSummarizeClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
        }
    }
</script>
```

## Advanced Prompt Scenarios

### 1. Context-Aware Prompt
```javascript
function setContextualPrompt(context) {
    if (inlineAssist) {
        var prompts = {
            'summarize': 'Summarize this content in 2-3 sentences',
            'expand': 'Expand on this content with more details',
            'translate': 'Translate this content to Spanish'
        };
        inlineAssist.prompt = prompts[context] || 'Enter your prompt';
    }
}
```

### 2. Dynamic Prompt Based on Selection
```javascript
function onTextSelect() {
    var selectedText = window.getSelection().toString();
    if (selectedText.length > 0) {
        inlineAssist.prompt = 'Process this text: "' + selectedText.substring(0, 50) + '..."';
    }
}
```

### 3. Prompt History Navigation
```javascript
function showPreviousPrompt() {
    if (inlineAssist && inlineAssist.prompts && inlineAssist.prompts.length > 0) {
        var lastPrompt = inlineAssist.prompts[inlineAssist.prompts.length - 1].prompt;
        inlineAssist.prompt = lastPrompt;
    }
}
```

## Summary

- **prompt**: Set default prompt text for users
- **prompts collection**: Access history of all prompts and responses
- **placeholder**: Guide users with textarea placeholder
- **zIndex**: Control popup layering (default: 1000)
- **popupWidth/Height**: Customize dimensions
- **cssClass**: Apply custom styling
- **Advanced patterns**: Context-aware, dynamic, and history-based prompts
