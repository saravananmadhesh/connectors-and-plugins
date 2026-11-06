# Speech to Text

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Enable Speech to Text](#enable-speech-to-text)
- [Configure Language](#configure-language)
- [Configure Button Settings](#configure-button-settings)
- [Enable Interim Results](#enable-interim-results)
- [Configure Tooltip](#configure-tooltip)
- [Speech Events](#speech-events)
- [Complete Example](#complete-example)
- [Browser Compatibility](#browser-compatibility)

This guide covers speech-to-text functionality using the Web Speech API.

---

## Overview

The AI AssistView integrates speech-to-text capabilities through the browser's Web Speech API, enabling voice input through the device's microphone.

**Key Feature:**
- `speechToTextSettings` - Complete speech recognition configuration

The Web Speech API converts spoken words to text in real-time, allowing hands-free interaction with the AI assistant.

---

## Prerequisites

Before implementing speech-to-text:

1. **AI AssistView Setup**: Component must be properly initialized
2. **Browser Support**: Web Speech API is not universally supported (see Browser Compatibility)
3. **HTTPS Required**: Speech recognition requires secure context (HTTPS) in production
4. **Microphone Access**: User must grant microphone permissions

---

## Enable Speech to Text

### Property

```typescript
speechToTextSettings: {
    enable: boolean = false
}
```

### Basic Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const aiAssistView: AIAssistView = new AIAssistView({
    speechToTextSettings: {
        enable: true
    },
    promptRequest: (args) => {
        setTimeout(() => {
            const response = 'For real-time prompt processing, connect to your AI service.';
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

When enabled, a microphone button appears in the footer for voice input.

---

## Configure Language

### Property

```typescript
speechToTextSettings: {
    lang: string = 'en-US'
}
```

Set the language code for speech recognition. Defaults to browser language if not specified.

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    speechToTextSettings: {
        enable: true,
        lang: 'en-US'  // US English
    }
});
```

### Common Language Codes

```typescript
// English variants
lang: 'en-US'  // US English
lang: 'en-GB'  // British English
lang: 'en-AU'  // Australian English
lang: 'en-IN'  // Indian English

// Other languages
lang: 'es-ES'  // Spanish (Spain)
lang: 'fr-FR'  // French (France)
lang: 'de-DE'  // German (Germany)
lang: 'it-IT'  // Italian (Italy)
lang: 'ja-JP'  // Japanese (Japan)
lang: 'ko-KR'  // Korean (Korea)
lang: 'zh-CN'  // Chinese (Simplified)
lang: 'pt-BR'  // Portuguese (Brazil)
lang: 'ar-SA'  // Arabic (Saudi Arabia)
lang: 'hi-IN'  // Hindi (India)
```

---

## Configure Button Settings

### Properties

```typescript
speechToTextSettings: {
    buttonSettings: {
        content: string = '';
        stopContent: string = '';
        iconCss: string = 'e-icons e-microphone';
        stopIconCss: string = 'e-icons e-microphone-off';
    }
}
```

Customize the microphone button appearance and text.

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    speechToTextSettings: {
        enable: true,
        lang: 'en-US',
        buttonSettings: {
            content: 'Start Recording',
            stopContent: 'Stop Recording',
            iconCss: 'e-icons e-microphone',
            stopIconCss: 'e-icons e-microphone-off'
        }
    }
});
```

### Icon-Only Button

```typescript
buttonSettings: {
    iconCss: 'e-icons e-microphone',
    stopIconCss: 'e-icons e-microphone-off'
    // No content properties - shows icon only
}
```

### Custom Icons

```typescript
buttonSettings: {
    content: 'Record',
    stopContent: 'Recording...',
    iconCss: 'custom-mic-icon',
    stopIconCss: 'custom-mic-active-icon'
}
```

---

## Enable Interim Results

### Property

```typescript
speechToTextSettings: {
    allowInterimResults: boolean = false
}
```

Enable real-time transcription as the user speaks.

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    speechToTextSettings: {
        enable: true,
        lang: 'en-US',
        allowInterimResults: true
    }
});
```

When enabled:
- Partial transcripts appear in real-time
- Users see immediate feedback as they speak
- Final transcript replaces interim results when speech ends

**Use Case:** Provides better user experience by showing live transcription instead of waiting for complete speech recognition.

---

## Configure Tooltip

### Properties

```typescript
speechToTextSettings: {
    tooltipSettings: {
        content: string = '';
        stopContent: string = '';
        position: TooltipPosition = 'TopCenter';
    }
}
```

Customize tooltips for the microphone button.

### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    speechToTextSettings: {
        enable: true,
        tooltipSettings: {
            content: 'Click to start listening',
            stopContent: 'Click to stop listening',
            position: 'TopCenter'
        }
    }
});
```

### Tooltip Positions

```typescript
// Available positions
position: 'TopLeft'
position: 'TopCenter'
position: 'TopRight'
position: 'BottomLeft'
position: 'BottomCenter'
position: 'BottomRight'
position: 'LeftTop'
position: 'LeftCenter'
position: 'LeftBottom'
position: 'RightTop'
position: 'RightCenter'
position: 'RightBottom'
```

---

## Speech Events

### Event Handlers

```typescript
speechToTextSettings: {
    onStart: (args: any) => void;
    onStop: (args: any) => void;
    transcriptChanged: (args: any) => void;
    onError: (args: any) => void;
}
```

### Complete Example

```typescript
let lastTranscript: string = '';

const aiAssistView: AIAssistView = new AIAssistView({
    speechToTextSettings: {
        enable: true,
        lang: 'en-US',
        allowInterimResults: true,
        
        // Recording started
        onStart: (args) => {
            console.log('Speech recognition started');
            updateStatus('Recording...', 'recording');
            hideError();
        },
        
        // Recording stopped
        onStop: (args) => {
            console.log('Speech recognition stopped');
            updateStatus('Ready to record', 'ready');
            
            // Display final transcript
            if (lastTranscript) {
                displayTranscript(lastTranscript, true);
                setTimeout(() => {
                    lastTranscript = '';
                    clearTranscript();
                }, 2000);
            }
        },
        
        // Transcript updated (real-time)
        transcriptChanged: (args) => {
            const transcript = args.text || args.value || args.transcript || '';
            const isFinal = args.isFinal || args.final || false;
            
            if (transcript) {
                lastTranscript = transcript;
                displayTranscript(transcript, isFinal);
            }
        },
        
        // Error occurred
        onError: (args) => {
            console.error('Speech recognition error:', args.error);
            showError(args.error || 'Speech recognition error occurred');
            updateStatus('Ready to record', 'ready');
        }
    },
    
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Processing your request...');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');

// Helper functions
function updateStatus(text: string, className: string) {
    const indicator = document.getElementById('recordingStatus');
    if (indicator) {
        indicator.textContent = text;
        indicator.className = `status-indicator ${className}`;
    }
}

function displayTranscript(text: string, isFinal: boolean) {
    const display = document.getElementById('transcriptDisplay');
    if (display) {
        display.textContent = text;
        display.style.fontStyle = isFinal ? 'normal' : 'italic';
    }
}

function clearTranscript() {
    const display = document.getElementById('transcriptDisplay');
    if (display) {
        display.textContent = 'Waiting for speech input...';
    }
}

function showError(message: string) {
    const errorEl = document.getElementById('errorMessage');
    if (errorEl) {
        errorEl.querySelector('.error-text').textContent = `Error: ${message}`;
        errorEl.style.display = 'block';
    }
}

function hideError() {
    const errorEl = document.getElementById('errorMessage');
    if (errorEl) {
        errorEl.style.display = 'none';
    }
}
```

### HTML with Status Display

```html
<div class="speech-container">
    <div class="speech-status">
        <label>Recording Status:</label>
        <span id="recordingStatus" class="status-indicator ready">Ready to record</span>
    </div>
    
    <div class="transcript-section">
        <label>Live Transcript:</label>
        <div id="transcriptDisplay">Waiting for speech input...</div>
    </div>
    
    <div class="error-section" id="errorMessage" style="display: none;">
        <span class="error-text"></span>
    </div>
    
    <div id="aiAssistView"></div>
</div>
```

### CSS Styling

```css
.status-indicator {
    padding: 5px 10px;
    border-radius: 3px;
    font-weight: bold;
}

.status-indicator.ready {
    background: #4CAF50;
    color: white;
}

.status-indicator.recording {
    background: #f44336;
    color: white;
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
}

#transcriptDisplay {
    padding: 10px;
    border: 1px solid #ddd;
    min-height: 50px;
    background: #f9f9f9;
}

.error-section {
    color: #f44336;
    padding: 10px;
    background: #ffebee;
    border-left: 4px solid #f44336;
}
```

---

## Complete Example

### Full Configuration

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const aiAssistView: AIAssistView = new AIAssistView({
    speechToTextSettings: {
        // Enable feature
        enable: true,
        
        // Set language
        lang: 'en-US',
        
        // Enable real-time transcription
        allowInterimResults: true,
        
        // Customize button
        buttonSettings: {
            content: 'Start Recording',
            stopContent: 'Stop Recording',
            iconCss: 'e-icons e-microphone',
            stopIconCss: 'e-icons e-microphone-off'
        },
        
        // Customize tooltip
        tooltipSettings: {
            content: 'Click to start listening',
            stopContent: 'Click to stop listening',
            position: 'TopCenter'
        },
        
        // Event handlers
        onStart: (args) => console.log('Started'),
        onStop: (args) => console.log('Stopped'),
        transcriptChanged: (args) => console.log('Transcript:', args.text),
        onError: (args) => console.error('Error:', args.error)
    },
    
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Processing your request...');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

---

## Browser Compatibility

The Web Speech API has limited browser support:

**Supported Browsers:**
- Chrome/Edge (Chromium): Full support
- Safari: Partial support (may require user interaction)
- Firefox: Limited support

**Not Supported:**
- Internet Explorer
- Older browser versions

**Recommendations:**
- Feature detection before enabling
- Provide fallback text input
- Display browser compatibility messages

### Feature Detection

```typescript
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    // Enable speech to text
    aiAssistView.speechToTextSettings.enable = true;
} else {
    console.warn('Speech recognition not supported in this browser');
    // Show message or disable feature
}
```

---

## Summary

**Key Properties:**
- `speechToTextSettings.enable`: Enable/disable feature
- `speechToTextSettings.lang`: Recognition language
- `speechToTextSettings.allowInterimResults`: Real-time transcription
- `speechToTextSettings.buttonSettings`: Button customization
- `speechToTextSettings.tooltipSettings`: Tooltip configuration

**Events:**
- `onStart`: Recording started
- `onStop`: Recording stopped
- `transcriptChanged`: Transcript updated
- `onError`: Error occurred

**Requirements:**
- HTTPS in production
- Browser support check
- Microphone permissions
