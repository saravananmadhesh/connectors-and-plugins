---
name: syncfusion-javascript-speech-to-text
description: Implements the Syncfusion JavaScript SpeechToText control. Use this skill ALWAYS immediately for speech-to-text functionality, voice recognition, speech transcription, or microphone-based input in JavaScript applications. This skill provides guidance for implementing the SpeechToText control to transcribe spoken audio to text, handle speech recognition events, customize button appearance, set language options, manage listening states, and apply security best practices for voice input features.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion JavaScript SpeechToText Component

## Overview

The Syncfusion JavaScript SpeechToText component is a button-based control that initiates speech recognition when clicked. It captures audio from the user's microphone, processes it through the browser's speech recognition service, and provides transcribed text through events and properties.

**Key capabilities:**
- Real-time speech transcription with interim and final results
- Configurable language support (en-US, fr-FR, de-DE, etc.)
- Customizable button appearance, icons, and content
- Tooltip configuration for start and stop states
- Event-driven architecture (onStart, onStop, onError, transcriptChanged)
- Programmatic control via startListening() and stopListening() methods
- Localization support for 14+ UI text keys
- RTL (Right-to-Left) layout support
- Error handling for 8 common speech recognition errors
- Security considerations for voice data privacy

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)

Start here for initial setup and basic implementation:
- Installing dependencies (@syncfusion/ej2-inputs)
- Setting up development environment
- Importing CSS styles and themes
- Creating basic SpeechToText button
- Adding button content for start/stop states
- Handling transcriptChanged event
- Running your first speech recognition example

### Speech Recognition Features
📄 **Read:** [references/speech-recognition.md](references/speech-recognition.md)

Core speech recognition functionality and configuration:
- Retrieving transcripts from spoken audio
- Setting recognition language (lang property)
- Allowing interim results vs final results only
- Managing listening states (Inactive, Listening, Stopped)
- Showing or hiding tooltips
- Disabling the component
- Setting HTML attributes on the button element
- Error handling for 8 error types (no-speech, audio-capture, not-allowed, etc.)
- Browser support matrix and compatibility

### Events
📄 **Read:** [references/events.md](references/events.md)

Event handling for speech recognition lifecycle:
- created event - Component initialization complete
- onStart event - Speech recognition begins (StartListeningEventArgs)
- onStop event - Speech recognition stops (StopListeningEventArgs)
- onError event - Error occurs during recognition (ErrorEventArgs)
- transcriptChanged event - Transcript updates (TranscriptChangedEventArgs)
- Event configuration examples and patterns

### Methods
📄 **Read:** [references/methods.md](references/methods.md)

Programmatic control of speech recognition:
- startListening() - Initiate speech recognition programmatically
- stopListening() - Terminate speech recognition programmatically
- Using methods with custom buttons and controls
- Method usage patterns and best practices

### Appearance Customization
📄 **Read:** [references/appearance.md](references/appearance.md)

Customizing button and tooltip appearance:
- Button content (content, stopContent properties)
- Button icons (iconCss, stopIconCss properties)
- Icon positioning (top, bottom, left, right)
- Primary button styling (isPrimary property)
- Tooltip content and positioning
- Applying CSS classes (e-primary, e-outline, e-info, e-success, e-warning, e-danger)
- Custom styling with cssClass property

### Globalization
📄 **Read:** [references/globalization.md](references/globalization.md)

Localization and internationalization support:
- Localization using L10n.load method
- Default text identifiers (14 keys for error messages, tooltips, ARIA labels)
- Configuring locale property
- RTL (Right-to-Left) support with enableRtl property
- RTL layout implementation for Arabic, Hebrew, Persian languages

### Security Considerations
📄 **Read:** [references/security.md](references/security.md)

Security and privacy best practices:
- Online dependency requirements
- Potential security risks (data transmission, privacy, MITM attacks)
- Browser permission exploits
- Mitigation strategies (HTTPS, trusted environments, explicit consent)
- Data processing by third-party services

## Quick Start Example

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

// Initialize SpeechToText component
const speechToText: SpeechToText = new SpeechToText({
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        // Update textarea with transcribed text
        textareaObj.value = args.transcript;
    }
});

// Render the component
speechToText.appendTo('#speechtotext_default');

// Create textarea for displaying transcription
const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>SpeechToText Example</title>
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-buttons/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-popups/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-inputs/styles/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div id="container">
        <button id="speechtotext_default"></button>
        <textarea id="textareaInst"></textarea>
    </div>
</body>
</html>
```

## Common Patterns

### Pattern 1: Custom Button with Language Support

```typescript
const speechToText: SpeechToText = new SpeechToText({
    lang: 'fr-FR', // French language recognition
    buttonSettings: {
        content: 'Commencer',
        stopContent: 'Arrêter',
        isPrimary: true
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        console.log('Transcript:', args.transcript);
    }
});
speechToText.appendTo('#speechtotext');
```

**When to use:** Internationalized applications requiring speech recognition in specific languages.

### Pattern 2: Event-Driven State Management

```typescript
const speechToText: SpeechToText = new SpeechToText({
    onStart: (args: StartListeningEventArgs) => {
        console.log('Started listening, state:', args.listeningState);
        // Update UI to show listening indicator
    },
    onStop: (args: StopListeningEventArgs) => {
        console.log('Stopped listening, state:', args.listeningState);
        // Update UI to hide listening indicator
    },
    onError: (args: ErrorEventArgs) => {
        console.error('Speech recognition error:', args.error);
        // Show error message to user
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        // Real-time transcript updates
        document.getElementById('output').textContent = args.transcript;
    }
});
speechToText.appendTo('#speechtotext');
```

**When to use:** Applications requiring visual feedback and error handling during speech recognition.

### Pattern 3: Programmatic Control with Custom Triggers

```typescript
const speechToText: SpeechToText = new SpeechToText({
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textArea.value = args.transcript;
    }
});
speechToText.appendTo('#speechtotext');

// Start listening when form field gains focus
document.getElementById('inputField').addEventListener('focus', () => {
    speechToText.startListening();
});

// Stop listening when form field loses focus
document.getElementById('inputField').addEventListener('blur', () => {
    speechToText.stopListening();
});
```

**When to use:** Integrating speech recognition with custom UI elements or form workflows.

### Pattern 4: Final Results Only (No Interim)

```typescript
const speechToText: SpeechToText = new SpeechToText({
    allowInterimResults: false, // Only final results
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        // Transcript only updates when recognition is complete
        textArea.value = args.transcript;
    }
});
speechToText.appendTo('#speechtotext');
```

**When to use:** Applications requiring complete sentences or phrases rather than real-time word-by-word transcription.

## Key Properties

| Property | Type | Description | Default |
|----------|------|-------------|---------|
| `transcript` | string | Gets or sets the transcribed text | '' |
| `lang` | string | Recognition language (e.g., 'en-US', 'fr-FR') | 'en-US' |
| `allowInterimResults` | boolean | Enable real-time interim results | true |
| `listeningState` | SpeechToTextState | Current state (Inactive, Listening, Stopped) | Inactive |
| `showTooltip` | boolean | Show tooltip on button hover | true |
| `disabled` | boolean | Disable the component | false |
| `enablePersistence` | boolean | Persist component state across page reloads | false |
| `buttonSettings` | ButtonSettingsModel | Button customization options | {} |
| `tooltipSettings` | TooltipSettingsModel | Tooltip customization options | {} |
| `cssClass` | string | Custom CSS class for styling | '' |
| `locale` | string | Localization culture (e.g., 'en-US', 'de') | 'en-US' |
| `enableRtl` | boolean | Enable Right-to-Left layout | false |

## Common Use Cases

### Use Case 1: Voice-Enabled Form Input
Enable users to fill form fields using voice input instead of typing, improving accessibility and speed for data entry tasks.

### Use Case 2: Real-Time Transcription App
Build note-taking or meeting transcription applications that convert spoken words to text in real-time with language support.

### Use Case 3: Voice Commands Interface
Implement voice command recognition for controlling application features, navigation, or triggering actions based on spoken keywords.

### Use Case 4: Accessibility Enhancement
Provide voice input alternatives for users with mobility limitations who cannot easily type on keyboards.

### Use Case 5: Multilingual Support
Support speech recognition in multiple languages for global applications, allowing users to speak in their preferred language.

### Use Case 6: Voice Search Feature
Add voice search capabilities to applications, enabling users to search content by speaking queries instead of typing.

## Best Practices

1. **Always handle errors gracefully** - Implement onError event to catch and display user-friendly error messages for microphone access, network issues, or unsupported browsers.

2. **Request permissions explicitly** - Inform users why microphone access is needed before triggering speech recognition to improve trust and permission grant rates.

3. **Use HTTPS in production** - Speech recognition requires secure contexts; ensure your application is served over HTTPS to avoid security errors.

4. **Provide visual feedback** - Use listening state events to show users when the component is actively listening, stopped, or inactive.

5. **Check browser compatibility** - Verify browser support (Chrome 25+, Edge 79+, Safari 12+) and provide fallback UI for unsupported browsers.

6. **Configure appropriate language** - Set the lang property to match your user's expected language for better recognition accuracy.

7. **Consider interim results** - Use allowInterimResults:true for real-time feedback or false for final results only, depending on your use case.

8. **Implement privacy notices** - Inform users that voice data may be processed by third-party services (Google, Microsoft) for speech recognition.

## Related Components

- **TextArea** - Often used together to display transcribed text
- **Button** - Provides the base button functionality
- **Tooltip** - Used for displaying helpful text on hover

## Browser Support

| Browser | Supported Versions |
|---------|-------------------|
| Chrome | 25+ |
| Edge | 79+ |
| Firefox | Not Supported |
| Safari | 12+ |
| Opera | 30+ |
