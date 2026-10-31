# Speech Recognition Features

## Table of Contents
- [Retrieving Transcripts](#retrieving-transcripts)
- [Setting Language](#setting-language)
- [Allowing Interim Results](#allowing-interim-results)
- [Managing Listening State](#managing-listening-state)
- [Show or Hide Tooltip](#show-or-hide-tooltip)
- [Setting Disabled State](#setting-disabled-state)
- [Setting HTML Attributes](#setting-html-attributes)
- [Error Handling](#error-handling)
- [Browser Support](#browser-support)

This guide covers the core speech recognition features of the SpeechToText component, including transcript management, language configuration, listening states, and error handling.

## Retrieving Transcripts

The `transcript` property allows you to retrieve or set the transcribed text generated from spoken input. This property is updated automatically as speech is recognized and can also be set programmatically.

### Basic Transcript Retrieval

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const transcript = 'Hi, hello! How are you?';

// Initialize with initial transcript
const speechToText: SpeechToText = new SpeechToText({
    transcript: transcript,
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        // Update textarea with new transcript
        textareaObj.value = speechToText.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: speechToText.transcript,
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');
```

### Programmatic Access

You can access the current transcript at any time:

```typescript
// Get current transcript
const currentTranscript = speechToText.transcript;
console.log('Current transcript:', currentTranscript);

// Set transcript programmatically
speechToText.transcript = 'New transcript text';
```

**Use cases:**
- Initializing the component with pre-existing text
- Clearing the transcript (set to empty string)
- Appending new text to existing transcripts
- Saving transcripts to backend storage

## Setting Language

The `lang` property specifies the language for speech recognition. The speech recognition engine uses this to correctly interpret spoken words for a specific locale.

### Configuring Language

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

// Set language to French (France)
const speechToText: SpeechToText = new SpeechToText({
    lang: 'fr-FR',
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
    placeholder: 'Le texte transcrit sera affiché ici...'
});
textareaObj.appendTo('#textareaInst');
```

### Supported Language Codes

Common language codes (BCP 47 language tags):

| Language | Code | Example |
|----------|------|---------|
| English (US) | `en-US` | Default |
| English (UK) | `en-GB` | British English |
| French (France) | `fr-FR` | French |
| German | `de-DE` | German |
| Spanish (Spain) | `es-ES` | Spanish |
| Spanish (Mexico) | `es-MX` | Mexican Spanish |
| Italian | `it-IT` | Italian |
| Portuguese (Brazil) | `pt-BR` | Brazilian Portuguese |
| Japanese | `ja-JP` | Japanese |
| Chinese (Mandarin) | `zh-CN` | Simplified Chinese |
| Arabic | `ar-SA` | Arabic (Saudi Arabia) |
| Hindi | `hi-IN` | Hindi |
| Russian | `ru-RU` | Russian |

### Dynamic Language Switching

```typescript
// Initialize with default language
const speechToText = new SpeechToText({
    lang: 'en-US'
});
speechToText.appendTo('#speechtotext');

// Switch language dynamically
document.getElementById('langSelector').addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    speechToText.lang = selectedLang;
});
```

**Important:** Language must be set before starting recognition. Changing language during active listening requires stopping and restarting.

## Allowing Interim Results

The `allowInterimResults` property controls whether interim (real-time) or only final speech recognition results are provided. 

- **`true` (default):** Results are displayed as the user speaks (word-by-word updates)
- **`false`:** Only the final transcript is shown after recognition completes

### Interim Results Enabled (Default)

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    allowInterimResults: true, // Real-time updates
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        // Updates continuously as user speaks
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');
```

**Behavior:** Transcript updates in real-time as words are spoken. Each word appears as it's recognized.

**Use cases:**
- Live transcription displays
- Real-time caption generation
- Interactive voice applications
- User feedback during speech

### Interim Results Disabled

```typescript
const speechToText: SpeechToText = new SpeechToText({
    allowInterimResults: false, // Final results only
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        // Updates only when recognition completes
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcript will be displayed here once speech recognition is complete.'
});
textareaObj.appendTo('#textareaInst');
```

**Behavior:** Transcript updates only when the user stops speaking or pauses significantly.

**Use cases:**
- Voice commands (wait for complete command)
- Form filling (complete field values)
- Sentence-based input
- Reducing UI flicker from continuous updates

## Managing Listening State

The `listeningState` property manages and indicates the component's current status. It can be `Inactive`, `Listening`, or `Stopped`.

### Listening States

| State | Description | Visual Indicator |
|-------|-------------|------------------|
| `Inactive` | Component is idle, no active recognition | Default button appearance |
| `Listening` | Actively capturing and transcribing speech | Stop icon with blinking animation |
| `Stopped` | Recognition has ended, no further processing | Final state before returning to inactive |

### Tracking State Changes

```typescript
import { SpeechToText, SpeechToTextState, StartListeningEventArgs, StopListeningEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    onStop: (args: StopListeningEventArgs) => {
        updateListeningState(args.listeningState);
    },
    onStart: (args: StartListeningEventArgs) => {
        updateListeningState(args.listeningState);
    },
    listeningState: SpeechToTextState.Inactive
});

speechToText.appendTo('#speechtotext_default');

function updateListeningState(state: string) {
    const statusTextElement = document.getElementById("status-text");
    if (statusTextElement) { 
        statusTextElement.innerText = state; 
    }

    const statusBox = document.getElementById("status-box-container");
    const waveform = document.getElementById("waveform-item");
    const instructionText = document.getElementById("instruction-text");

    if (statusBox && waveform && instructionText) {
        if (state === "Listening") {
            statusBox.className = "status-box listening";
            waveform.style.display = "flex";
            instructionText.innerText = "Listening... Speak now!";
        } else if (state === "Stopped") {
            statusBox.className = "status-box stopped";
            waveform.style.display = "none";
            instructionText.innerText = "Recognition Stopped.";
        } else {
            statusBox.className = "status-box inactive";
            waveform.style.display = "none";
            instructionText.innerText = "Click the button to start listening.";
        }
    }
}
```

### HTML for State Visualization

```html
<div id="container">
    <div id="status-box-container" class="status-box inactive">
        <span>Status: <strong id="status-text">Inactive</strong></span>
    </div>
    <button id="speechtotext_default"></button>
    <div class="waveform-container">
        <div id="waveform-item" class="waveform" style="display: none;">
            <span></span><span></span><span></span><span></span><span></span>
        </div>
        <p id="instruction-text">Click the button to start listening.</p>
    </div>
</div>
```

### CSS for State Styling

```css
.waveform-container {
    margin-top: 20px;
    font-weight: bold;
}

.waveform {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    gap: 5px;
}

.waveform span {
    display: block;
    width: 6px;
    height: 20px;
    background: #28a745;
    animation: wave-animation 1.2s infinite ease-in-out;
}

.waveform span:nth-child(1) { animation-delay: 0s; }
.waveform span:nth-child(2) { animation-delay: 0.2s; }
.waveform span:nth-child(3) { animation-delay: 0.4s; }
.waveform span:nth-child(4) { animation-delay: 0.6s; }
.waveform span:nth-child(5) { animation-delay: 0.8s; }

@keyframes wave-animation {
    0%, 100% { height: 10px; }
    50% { height: 30px; }
}

.status-box {
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 40px;
    font-weight: bold;
}

.status-box.listening {
    background-color: #d1e7dd;
    color: #0f5132;
}

.status-box.stopped {
    background-color: #f8d7da;
    color: #842029;
}

.status-box.inactive {
    background-color: #e2e3e5;
    color: #6c757d;
}
```

## Show or Hide Tooltip

The `showTooltip` property determines whether to display a tooltip when hovering over the SpeechToText button. It is enabled by default.

### Disabling Tooltip

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    showTooltip: false, // Disable tooltip
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
```

**When to disable tooltips:**
- Mobile applications where tooltips are less useful
- Minimalist UI designs
- When screen space is limited
- Custom tooltip implementations

**Default behavior (showTooltip: true):**
- Tooltip displays "Start listening" when inactive
- Tooltip displays "Stop listening" when actively listening
- Provides helpful context for users unfamiliar with the component

## Setting Disabled State

The `disabled` property, when set to `true`, disables the SpeechToText component and prevents user interaction. By default, it is `false`.

### Disabling the Component

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    disabled: true, // Component disabled
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');
```

### Conditional Enabling/Disabling

```typescript
const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

// Disable based on condition
if (!isMicrophoneAvailable()) {
    speechToText.disabled = true;
}

// Enable when condition is met
document.getElementById('enableButton').addEventListener('click', () => {
    speechToText.disabled = false;
});
```

**Use cases:**
- Unsupported browsers (no Speech Recognition API)
- Microphone permission denied
- Form validation (disable until prerequisites are met)
- Loading states
- Conditional features based on user roles

## Setting HTML Attributes

The `htmlAttributes` property allows you to assign custom HTML attributes to the SpeechToText button element.

### Adding Custom Attributes

```typescript
const speechToText = new SpeechToText({
    htmlAttributes: {
        'data-custom-id': 'my-speech-button',
        'aria-labelledby': 'speech-label',
        'tabindex': '1',
        'role': 'button'
    }
});
speechToText.appendTo('#speechtotext');
```

**Common use cases:**
- Adding data attributes for testing or analytics
- Enhancing accessibility with ARIA attributes
- Setting custom tab order
- Adding metadata for third-party integrations

## State Persistence

The `enablePersistence` property enables the SpeechToText component to persist its state across page reloads or browser sessions. When enabled, the component's current property values are saved to browser local storage.

### Enabling Persistence

```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";

const speechToText = new SpeechToText({
    enablePersistence: true,
    lang: 'en-US',
    allowInterimResults: true,
    showTooltip: true
});
speechToText.appendTo('#speechtotext');
```

**What gets persisted:**
- Property values (lang, allowInterimResults, showTooltip, disabled, etc.)
- Component configuration state
- Not persisted: Event handlers, transcript data, listening state

### Practical Example

```typescript
// Page 1: User configures speech recognition
const speechToText = new SpeechToText({
    enablePersistence: true,
    lang: 'fr-FR',
    buttonSettings: {
        content: 'Parler',
        isPrimary: true
    }
});
speechToText.appendTo('#speechtotext');

// Page reload or navigation back
// Component automatically restores: lang='fr-FR', buttonSettings, etc.
```

### Clearing Persisted State

To clear the persisted state, you can either:

```typescript
// Method 1: Disable persistence and refresh
speechToText.enablePersistence = false;
speechToText.refresh();

// Method 2: Clear local storage manually
localStorage.removeItem('ej2SpeechToText_' + speechToText.element.id);
```

**Use cases:**
- Multi-page forms where users return to continue voice input
- User preference preservation (language selection, button customization)
- Applications requiring consistent configuration across sessions
- Reducing re-configuration effort for frequent users

**Best practices:**
- Use unique element IDs to avoid conflicts between multiple instances
- Document that user settings are stored locally
- Provide a way for users to reset to defaults
- Consider privacy implications when persisting user configurations

## Error Handling

The SpeechToText control handles various errors that may occur during speech recognition. These errors are emitted through the `onError` event.

### Error Types

| Error | Cause | User Action Required |
|-------|-------|---------------------|
| `no-speech` | No speech detected by microphone | Speak into the microphone |
| `aborted` | Recognition was intentionally terminated | Restart if needed |
| `audio-capture` | No microphone device detected | Connect a microphone |
| `not-allowed` | Microphone access denied by user or browser | Grant microphone permissions |
| `service-not-allowed` | Speech recognition service not allowed in context | Use HTTPS or supported context |
| `network` | Network issue preventing service connection | Check internet connection |
| `unsupported-browser` | Browser doesn't support SpeechRecognition API | Use supported browser |
| `default` | Unknown error occurred | Try again or contact support |

### Implementing Error Handling

```typescript
import { SpeechToText, ErrorEventArgs } from "@syncfusion/ej2-inputs";

const speechToText = new SpeechToText({
    onError: (event: ErrorEventArgs) => {
        handleSpeechError(event.error);
    }
});
speechToText.appendTo('#speechtotext');

function handleSpeechError(error: string) {
    const errorMessageElement = document.getElementById('error-message');
    
    switch(error) {
        case 'no-speech':
            errorMessageElement.textContent = 'No speech detected. Please try again.';
            break;
        case 'audio-capture':
            errorMessageElement.textContent = 'No microphone found. Please connect a microphone.';
            break;
        case 'not-allowed':
            errorMessageElement.textContent = 'Microphone access denied. Please allow microphone access.';
            break;
        case 'network':
            errorMessageElement.textContent = 'Network error. Please check your internet connection.';
            break;
        case 'unsupported-browser':
            errorMessageElement.textContent = 'Your browser does not support speech recognition.';
            break;
        default:
            errorMessageElement.textContent = 'An error occurred. Please try again.';
    }
    
    // Show error message
    errorMessageElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        errorMessageElement.style.display = 'none';
    }, 5000);
}
```

### Best Practices for Error Handling

1. **Always implement onError handler** - Never leave errors unhandled
2. **Provide clear, actionable messages** - Tell users exactly what to do
3. **Log errors for debugging** - Track error patterns in production
4. **Graceful degradation** - Provide alternative input methods when speech fails
5. **Retry mechanisms** - Allow users to easily retry after errors

## Browser Support

The SpeechToText component relies on the Web Speech API, which has limited browser support.

### Supported Browsers

| Browser | Supported Versions | Notes |
|---------|-------------------|-------|
| Chrome | 25+ | Full support, best performance |
| Edge | 79+ | Based on Chromium, full support |
| Safari | 12+ | Limited support, some features may vary |
| Opera | 30+ | Based on Chromium, full support |
| Firefox | Not Supported | No Web Speech API implementation |

### Checking Browser Support

```typescript
function isSpeechRecognitionSupported(): boolean {
    return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

if (isSpeechRecognitionSupported()) {
    // Initialize SpeechToText
    const speechToText = new SpeechToText({});
    speechToText.appendTo('#speechtotext');
} else {
    // Show fallback UI
    document.getElementById('speechtotext').innerHTML = 
        '<p>Speech recognition is not supported in your browser. Please use Chrome, Edge, Safari, or Opera.</p>';
}
```

### Browser-Specific Considerations

**Chrome/Edge:**
- Best performance and accuracy
- Supports all features
- Requires internet connection

**Safari:**
- May have different language support
- Some features may behave differently
- Test thoroughly on Safari

**Mobile Browsers:**
- iOS Safari: Supported on iOS 12+
- Chrome Android: Supported
- May require user interaction to request permissions

### Network Requirements

All browsers require an active internet connection for speech recognition because audio processing happens on remote servers (Google, Microsoft, etc.).

**Offline alternatives:**
- None currently supported by the Web Speech API
- Consider third-party libraries for offline recognition
- Provide fallback text input for offline scenarios
