# Positioning and Response Modes

## Table of Contents
- [relateTo Property](#relateto-property)
- [target Property](#target-property)
- [Response Modes](#response-modes)
- [Dynamic Mode Switching](#dynamic-mode-switching)

## relateTo Property

The `relateTo` property positions the Inline AI Assist popup relative to a specific DOM element. This is useful for placing the control near buttons, text areas, or other interactive elements.

**Accepts:** CSS selector string (e.g., '.container' or '#id') or HTMLElement reference

### Basic Example

Position the Inline AI Assist relative to a button:

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
    
    <ejs-inlineaiassist id="defaultInlineAssist" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
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
- Place near trigger buttons for content actions
- Float over text areas for inline suggestions
- Align with UI elements for contextual assistance

## target Property

The `target` property specifies the exact DOM element or CSS selector where the Inline AI Assist will be appended. This differs from `relateTo` which only positions relative to an element.

**Accepts:** CSS selector string (e.g., '.container' or '#id') or HTMLElement reference

### Complete Example with Target

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

<div id="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="defaultInlineAssist" target="#container" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
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
- Constrain control within specific container
- Prevent overflow outside parent element
- Maintain layout hierarchy in complex UIs

## Response Modes

The Inline AI Assist supports two response display modes configured via the `responseMode` property.

**Values:**
- `"Popup"` (default) - Shows responses in a floating popup dialog
- `"Inline"` - Updates content directly in-place

### Popup Mode Example

Responses displayed in a floating popup:

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
    <div style="margin-bottom: 10px;">
        <label for="responseMode">Response Mode:</label>
        <select id="responseMode" onchange="onResponseModeChange()">
            <option value="Popup">Popup</option>
            <option value="Inline">Inline</option>
        </select>
    </div>
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>
    
    <ejs-inlineaiassist id="defaultInlineAssist" responseMode="Popup" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
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
    
    function onResponseModeChange() {
        var modeSelect = document.getElementById('responseMode');
        if (modeSelect && inlineAssist) {
            inlineAssist.responseMode = modeSelect.value;
            inlineAssist.showPopup();
        }
    }
</script>
```

**Popup Mode Characteristics:**
- Displays response in a floating dialog overlay
- Preserves original content (non-destructive)
- Allows review before acceptance
- Better for comparison with original content

### Inline Mode

Responses update content directly in-place without a popup dialog. Use `responseMode="Inline"` to replace content immediately.

**Inline Mode Characteristics:**
- Updates content directly in-place
- Minimal UI overhead
- Fast feedback loop
- Useful for quick edits and suggestions

## Dynamic Mode Switching

Switch between response modes at runtime using the `responseMode` property:

```javascript
// Change to Inline mode
inlineAssist.responseMode = 'Inline';

// Change to Popup mode
inlineAssist.responseMode = 'Popup';

// Show popup after changing mode
inlineAssist.showPopup();
```

**Pattern: Mode Toggle**

```javascript
function toggleResponseMode() {
    if (inlineAssist) {
        var currentMode = inlineAssist.responseMode;
        var newMode = currentMode === 'Inline' ? 'Popup' : 'Inline';
        inlineAssist.responseMode = newMode;
        inlineAssist.showPopup();
    }
}
```

## Summary

- **relateTo**: Position popup near specific elements for context
- **target**: Specify container where control appends
- **responseMode**: Choose Popup (floating) or Inline (in-place) display
- **Dynamic switching**: Change modes at runtime for flexible UX
