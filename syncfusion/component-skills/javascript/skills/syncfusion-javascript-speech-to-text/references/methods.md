# Methods

This guide covers the programmatic methods available for controlling speech recognition in the SpeechToText component.

## Overview

The SpeechToText component provides two primary methods for programmatic control:

| Method | Description | Use Case |
|--------|-------------|----------|
| `startListening()` | Initiates speech recognition | Start recognition without button click |
| `stopListening()` | Terminates speech recognition | Stop recognition programmatically |

These methods enable you to control speech recognition from custom UI elements, keyboard shortcuts, or application logic rather than relying solely on the built-in button.

## startListening()

The `startListening()` method initiates the speech recognition process programmatically without requiring the user to click the SpeechToText button.

### Method Signature

```typescript
startListening(): void
```

### Basic Usage

```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    transcriptChanged: (args) => {
        console.log(args.transcript);
    }
});
speechToText.appendTo('#speechtotext_default');

// Start listening programmatically
speechToText.startListening();
```

### Common Use Cases

#### Use Case 1: Custom Button Trigger

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";
import { Button } from '@syncfusion/ej2-buttons';

const speechToText: SpeechToText = new SpeechToText({
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});
speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');

// Create custom start button
const startButton: Button = new Button({
    content: 'Start Listening',
});
startButton.appendTo('#startListening');

// Trigger startListening on button click
startButton.element.onclick = () => {
    speechToText.startListening();
};
```

#### Use Case 2: Keyboard Shortcut

```typescript
const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

// Start listening with Ctrl + Space
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.code === 'Space') {
        event.preventDefault();
        speechToText.startListening();
    }
});
```

#### Use Case 3: Auto-Start on Form Field Focus

```typescript
const speechToText = new SpeechToText({
    transcriptChanged: (args) => {
        document.getElementById('inputField').value = args.transcript;
    }
});
speechToText.appendTo('#speechtotext');

// Start listening when input field gains focus
document.getElementById('inputField').addEventListener('focus', () => {
    speechToText.startListening();
});
```

#### Use Case 4: Timed Auto-Start

```typescript
const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

// Auto-start listening after 3 seconds
setTimeout(() => {
    console.log('Auto-starting speech recognition...');
    speechToText.startListening();
}, 3000);
```

### Important Considerations

**Browser Permissions:**
- The first call to `startListening()` may trigger a browser permission prompt
- Subsequent calls will use the granted permissions
- Users must allow microphone access for the method to work

**User Gesture Requirement:**
- Some browsers require `startListening()` to be called in response to a user gesture (click, keypress)
- Automatic calls without user interaction may be blocked

**Component State:**
- Calling `startListening()` when already listening has no effect
- Check `listeningState` property before calling if needed

## stopListening()

The `stopListening()` method terminates the speech recognition process programmatically, stopping audio capture and finalizing the transcript.

### Method Signature

```typescript
stopListening(): void
```

### Basic Usage

```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    transcriptChanged: (args) => {
        console.log(args.transcript);
    }
});
speechToText.appendTo('#speechtotext_default');

// Stop listening programmatically
speechToText.stopListening();
```

### Common Use Cases

#### Use Case 1: Custom Stop Button

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";
import { Button } from '@syncfusion/ej2-buttons';

const speechToText: SpeechToText = new SpeechToText({
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});
speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');

// Create custom stop button
const stopButton: Button = new Button({
    content: 'Stop Listening',
});
stopButton.appendTo('#stopListening');

// Trigger stopListening on button click
stopButton.element.onclick = () => {
    speechToText.stopListening();
};
```

#### Use Case 2: Keyboard Shortcut

```typescript
const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

// Stop listening with Escape key
document.addEventListener('keydown', (event) => {
    if (event.code === 'Escape') {
        event.preventDefault();
        speechToText.stopListening();
    }
});
```

#### Use Case 3: Auto-Stop on Form Field Blur

```typescript
const speechToText = new SpeechToText({
    transcriptChanged: (args) => {
        document.getElementById('inputField').value = args.transcript;
    }
});
speechToText.appendTo('#speechtotext');

// Stop listening when input field loses focus
document.getElementById('inputField').addEventListener('blur', () => {
    speechToText.stopListening();
});
```

#### Use Case 4: Time-Limited Recording

```typescript
const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

// Start listening
speechToText.startListening();

// Auto-stop after 30 seconds
setTimeout(() => {
    console.log('Maximum recording time reached, stopping...');
    speechToText.stopListening();
}, 30000);
```

#### Use Case 5: Stop on Specific Phrase Detection

```typescript
const speechToText = new SpeechToText({
    transcriptChanged: (args) => {
        // Stop when user says "stop recording"
        if (args.transcript.toLowerCase().includes('stop recording')) {
            speechToText.stopListening();
            // Remove the command phrase from transcript
            speechToText.transcript = args.transcript.replace(/stop recording/gi, '').trim();
        }
    }
});
speechToText.appendTo('#speechtotext');
```

### Important Considerations

**Finalizing Transcript:**
- Calling `stopListening()` finalizes the current transcript
- The `onStop` event will fire
- The `transcriptChanged` event may fire one final time with the complete transcript

**Component State:**
- Calling `stopListening()` when not listening has no effect
- Component returns to `Inactive` state after stopping

## Complete Example with Both Methods

Here's a comprehensive example demonstrating both methods with custom controls:

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";
import { Button } from '@syncfusion/ej2-buttons';

// Initialize SpeechToText
const speechToText: SpeechToText = new SpeechToText({
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});
speechToText.appendTo('#speechtotext_default');

// Initialize TextArea
const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');

// Create custom Start button
const startButton: Button = new Button({
    content: 'Start Listening',
});
startButton.appendTo('#startListening');
startButton.element.onclick = () => {
    speechToText.startListening();
};

// Create custom Stop button
const stopButton: Button = new Button({
    content: 'Stop Listening',
});
stopButton.appendTo('#stopListening');
stopButton.element.onclick = () => {
    speechToText.stopListening();
};
```

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2 - SpeechToText</title>
    <meta charset="utf-8" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-buttons/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-popups/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-inputs/styles/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div id='loader'>LOADING....</div>
    <div id="container">
        <div class="actions">
            <button id="startListening"></button>
            <button id="stopListening"></button>
        </div>
        <button id="speechtotext_default"></button>
        <textarea id="textareaInst"></textarea>
    </div>
</body>
<style>
    #container {
        margin: 50px auto;
        gap: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    
    .actions {
        display: flex;
        gap: 10px;
    }
</style>
</html>
```

## Advanced Patterns

### Pattern 1: Toggle Control

```typescript
const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

let isListening = false;

document.getElementById('toggleButton').addEventListener('click', () => {
    if (isListening) {
        speechToText.stopListening();
        isListening = false;
        document.getElementById('toggleButton').textContent = 'Start';
    } else {
        speechToText.startListening();
        isListening = true;
        document.getElementById('toggleButton').textContent = 'Stop';
    }
});
```

### Pattern 2: Voice Command Mode

```typescript
const speechToText = new SpeechToText({
    allowInterimResults: false, // Wait for complete phrases
    transcriptChanged: (args) => {
        processCommand(args.transcript);
        // Automatically start listening again for next command
        setTimeout(() => {
            speechToText.startListening();
        }, 500);
    }
});
speechToText.appendTo('#speechtotext');

function processCommand(command: string) {
    const lowerCommand = command.toLowerCase().trim();
    
    if (lowerCommand === 'exit' || lowerCommand === 'stop') {
        speechToText.stopListening();
        console.log('Voice command mode exited');
    } else {
        console.log('Processing command:', command);
        // Execute command logic
    }
}

// Start command mode
speechToText.startListening();
```

### Pattern 3: Multi-Field Form with Speech

```typescript
const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

const formFields = ['name', 'email', 'address', 'city'];
let currentFieldIndex = 0;

function startFieldRecording() {
    if (currentFieldIndex >= formFields.length) {
        console.log('All fields completed');
        return;
    }
    
    const fieldId = formFields[currentFieldIndex];
    console.log(`Recording for field: ${fieldId}`);
    
    speechToText.transcriptChanged = (args) => {
        document.getElementById(fieldId).value = args.transcript;
    };
    
    speechToText.onStop = () => {
        currentFieldIndex++;
        // Auto-move to next field
        setTimeout(startFieldRecording, 1000);
    };
    
    speechToText.startListening();
}

// Start the form filling process
startFieldRecording();
```

### Pattern 4: Session Recording with Pause/Resume

```typescript
const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

let fullTranscript = '';

speechToText.transcriptChanged = (args) => {
    fullTranscript = args.transcript;
    document.getElementById('output').value = fullTranscript;
};

// Pause button
document.getElementById('pauseButton').addEventListener('click', () => {
    speechToText.stopListening();
    console.log('Recording paused');
});

// Resume button
document.getElementById('resumeButton').addEventListener('click', () => {
    // Preserve existing transcript and continue
    speechToText.transcript = fullTranscript;
    speechToText.startListening();
    console.log('Recording resumed');
});
```

## Best Practices

1. **Always handle errors** - Implement `onError` event when using methods programmatically
2. **Check browser support** - Verify Web Speech API availability before calling methods
3. **Respect user permissions** - Only call `startListening()` in response to user actions
4. **Provide visual feedback** - Show listening state clearly when using custom controls
5. **Implement timeout logic** - Prevent indefinite listening sessions
6. **Handle edge cases** - Check component state before calling methods
7. **Test across browsers** - Method behavior may vary slightly between browsers

## Troubleshooting

### Issue: startListening() doesn't work

**Possible causes:**
- No user gesture (click, keypress) triggered the call
- Microphone permissions not granted
- Component already in listening state
- Browser doesn't support Web Speech API

**Solution:**
```typescript
try {
    speechToText.startListening();
} catch (error) {
    console.error('Failed to start listening:', error);
    // Show error message to user
}
```

### Issue: stopListening() doesn't finalize transcript

**Possible causes:**
- Component not in listening state
- Recognition hasn't started yet

**Solution:**
Check the listening state before calling:
```typescript
if (speechToText.listeningState === 'Listening') {
    speechToText.stopListening();
}
```

## Standard Component Lifecycle Methods

The SpeechToText component inherits standard Syncfusion component lifecycle methods for managing the component's lifecycle, event handling, and rendering.

### destroy()

Destroys the component and removes it from the DOM, freeing up memory and cleaning up event handlers.

```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";

const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

// Later, when component is no longer needed
speechToText.destroy();
```

**Use cases:**
- Cleaning up components in single-page applications
- Removing components dynamically based on user actions
- Preventing memory leaks when navigating between views
- Unmounting components in framework integrations

### refresh()

Refreshes the component to reflect updated properties or re-render the UI after dynamic changes.

```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";

const speechToText = new SpeechToText({
    lang: 'en-US'
});
speechToText.appendTo('#speechtotext');

// Update property and refresh
speechToText.lang = 'fr-FR';
speechToText.refresh();
```

**Use cases:**
- Applying property changes that require re-rendering
- Refreshing after localization changes
- Updating UI after theme changes
- Re-initializing component state

**Note:** Most property changes automatically trigger re-rendering. Use `refresh()` only when needed for explicit re-initialization.

### dataBind()

Applies pending property changes immediately without waiting for the next render cycle.

```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";

const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

// Queue multiple property changes
speechToText.lang = 'de-DE';
speechToText.showTooltip = false;
speechToText.disabled = false;

// Apply all changes immediately
speechToText.dataBind();
```

**Use cases:**
- Batching multiple property updates for performance
- Ensuring properties are updated before calling methods
- Synchronizing state before critical operations

### getRootElement()

Returns the root HTML element of the component.

```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";

const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

// Get the root element
const rootElement = speechToText.getRootElement();
console.log(rootElement.tagName); // 'BUTTON'

// Useful for DOM manipulation or querying
rootElement.style.marginTop = '20px';
```

**Use cases:**
- Custom styling beyond CSS classes
- Direct DOM manipulation when necessary
- Measuring element dimensions
- Integrating with third-party libraries

### addEventListener() / removeEventListener()

Standard methods for adding and removing event listeners to the component.

```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";

const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

// Add event listener
function handleTranscriptChange(args) {
    console.log('Transcript changed:', args.transcript);
}

speechToText.addEventListener('transcriptChanged', handleTranscriptChange);

// Remove event listener later
speechToText.removeEventListener('transcriptChanged', handleTranscriptChange);
```

**Preferred approach:**
Use property-based event binding during initialization for better type safety and cleaner code:

```typescript
const speechToText = new SpeechToText({
    transcriptChanged: (args) => {
        console.log('Transcript changed:', args.transcript);
    }
});
```

**Use cases for addEventListener:**
- Adding event handlers dynamically after initialization
- Multiple handlers for the same event
- Conditional event binding based on runtime logic

### Inject()

Injects services or modules into the component. Not typically used with SpeechToText as it doesn't have injectable modules.

```typescript
// Not applicable for SpeechToText component
// This method is used in complex components like Grid, Chart, etc.
```

**Note:** The SpeechToText component is self-contained and doesn't require module injection.

## Method Best Practices

1. **Always check component state before calling methods** - Verify the component is initialized and in the expected state
2. **Use destroy() in cleanup** - Prevent memory leaks by destroying components when no longer needed
3. **Prefer property binding over addEventListener** - Use initialization-time event binding for cleaner code
4. **Chain operations carefully** - Ensure methods are called in the correct sequence
5. **Handle method errors** - Wrap critical method calls in try-catch blocks
6. **Use dataBind() for batch updates** - Improve performance when updating multiple properties
