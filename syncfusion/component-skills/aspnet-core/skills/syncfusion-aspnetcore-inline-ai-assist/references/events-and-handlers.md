# Events and Handlers

## Table of Contents
- [created Event](#created-event)
- [promptRequest Event](#promptrequest-event)
- [open Event](#open-event)
- [close Event](#close-event)
- [Event Flow Patterns](#event-flow-patterns)
- [Best Practices](#best-practices)


## created Event

The `created` event fires when the Inline AI Assist control has finished rendering and is ready for interaction.

### Basic Example

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="container">
    <ejs-inlineaiassist id="inline-assist" created="onCreated"></ejs-inlineaiassist>
</div>

<script>
    function onCreated() {
        // Control is now ready
        console.log('Inline AI Assist created');
    }
</script>
```

### Store Reference Pattern

Store the control instance for method calls:

```javascript
var inlineAssist;

function onCreated() {
    inlineAssist = this;
    console.log('Control instance stored');
    
    // Now you can call methods on inlineAssist
    // Example: inlineAssist.showPopup();
}
```

### Initialize Properties Pattern

Set or validate properties after creation:

```javascript
var inlineAssist;

function onCreated() {
    inlineAssist = this;
    
    // Initialize properties
    inlineAssist.placeholder = "Custom placeholder text";
    inlineAssist.popupWidth = "500px";
    
    console.log('Properties initialized');
}
```

## promptRequest Event

The `promptRequest` event fires when the user submits a prompt or selects a command. This is where you handle AI service calls and response generation.

### Basic Example

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="container">
    <ejs-inlineaiassist id="inline-assist" promptRequest="onPromptRequest"></ejs-inlineaiassist>
</div>

<script>
    function onPromptRequest(args) {
        // Your required actions here
        console.log('Prompt request received');
    }
</script>
```

### Async Response Handler Pattern

Handle asynchronous API calls with simulated delay:

```javascript
var inlineAssist;

function onCreated() {
    inlineAssist = this;
}

function onPromptRequest(args) {
    // Simulate API call delay
    setTimeout(function () {
        var defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
        inlineAssist.addResponse(defaultResponse);
    }, 1000);
}
```

### Real API Integration Pattern

```javascript
function onPromptRequest(args) {
    // Get the prompt text
    var prompt = args.prompt;
    
    // Call your AI service
    fetch('/api/ai/generateResponse', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: prompt })
    })
    .then(response => response.json())
    .then(data => {
        // Add response to control
        inlineAssist.addResponse(data.response);
    })
    .catch(error => {
        console.error('API Error:', error);
        inlineAssist.addResponse('Error processing request. Please try again.');
    });
}
```

### Args Properties

```javascript
function onPromptRequest(args) {
    console.log('Event args:');
    console.log('- args.prompt: ' + args.prompt); // User's prompt text
    console.log('- args.value: ' + args.value);   // Associated value
}
```

## open Event

The `open` event fires when the Inline AI Assist popup is opened by the user.

### Basic Example

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="container">
    <ejs-inlineaiassist id="inline-assist" open="onOpen"></ejs-inlineaiassist>
</div>

<script>
    function onOpen() {
        // Your required actions here
        console.log('Popup opened');
    }
</script>
```

### Initialization on Open Pattern

```javascript
function onOpen() {
    console.log('Popup opened');
    
    // Focus input field
    var inputElement = document.querySelector('.e-inlineaiassist .e-input');
    if (inputElement) {
        inputElement.focus();
    }
    
    // Load initial data
    loadCommandPresets();
}
```

## close Event

The `close` event fires when the Inline AI Assist popup is closed.

### Basic Example

```razor
@using Syncfusion.EJ2.InteractiveChat;

<div class="container">
    <ejs-inlineaiassist id="inline-assist" close="onClose"></ejs-inlineaiassist>
</div>

<script>
    function onClose() {
        // Your required actions here
        console.log('Popup closed');
    }
</script>
```

### Cleanup on Close Pattern

```javascript
function onClose() {
    console.log('Popup closed');
    
    // Clear temporary state
    currentPromptId = null;
    
    // Reset UI
    document.getElementById('status').textContent = '';
    
    // Save history if needed
    saveConversationHistory();
}
```

## Event Flow Patterns

### Complete Lifecycle Example

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
    <div id="eventLog" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc; height: 100px; overflow-y: auto;"></div>
    
    <ejs-inlineaiassist id="defaultInlineAssist" 
        relateTo="#summarizeBtn" 
        created="onCreated" 
        promptRequest="onPromptRequest"
        open="onOpen"
        close="onClose">
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
</div>

<script>
    var inlineAssist;
    var eventLog = [];
    
    function logEvent(message) {
        eventLog.push(new Date().toLocaleTimeString() + ': ' + message);
        var logDiv = document.getElementById('eventLog');
        logDiv.innerHTML = eventLog.join('<br>');
        logDiv.scrollTop = logDiv.scrollHeight;
    }
    
    function onCreated() {
        inlineAssist = this;
        logEvent('CREATED - Control initialized');
    }
    
    function onOpen() {
        logEvent('OPEN - Popup opened');
    }
    
    function onPromptRequest(args) {
        logEvent('PROMPTREQUEST - Prompt: "' + args.prompt + '"');
        
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAssist.addResponse(defaultResponse);
            logEvent('RESPONSE ADDED');
        }, 1000);
    }
    
    function onClose() {
        logEvent('CLOSE - Popup closed');
    }
    
    function onItemSelect(args) {
        logEvent('ITEMSELECT - Command: ' + args.command.label);
        
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

## Best Practices

### 1. Always Store Reference in created
```javascript
var inlineAssist;

function onCreated() {
    inlineAssist = this;  // Essential for calling methods
}
```

### 2. Handle Async Operations in promptRequest
```javascript
function onPromptRequest(args) {
    // Show loading state
    // Call API asynchronously
    // Use inlineAssist.addResponse() when done
    
    setTimeout(() => {
        inlineAssist.addResponse('Response');
    }, 1000);
}
```

### 3. Gracefully Handle Errors
```javascript
function onPromptRequest(args) {
    fetch('/api/response')
        .then(r => r.json())
        .then(d => inlineAssist.addResponse(d.response))
        .catch(e => {
            console.error(e);
            inlineAssist.addResponse('Error: Please try again');
        });
}
```

### 4. Use open/close for UI State
```javascript
function onOpen() {
    // Prepare UI for interaction
}

function onClose() {
    // Cleanup temporary state
}
```

### 5. Log Events for Debugging
```javascript
function logEvent(eventName) {
    console.log(`[${new Date().toISOString()}] ${eventName}`);
}
```

## Summary

- **created**: Store control reference, initialize properties
- **promptRequest**: Handle AI API calls, use addResponse() when done
- **open**: Prepare UI, focus inputs
- **close**: Cleanup state, save history
- **Event flow**: created → open → promptRequest → close
- **Always async**: Don't block promptRequest handler
