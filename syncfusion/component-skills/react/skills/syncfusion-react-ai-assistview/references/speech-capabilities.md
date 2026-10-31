# Speech Capabilities

## Table of Contents
- [Speech-to-Text Overview](#speech-to-text-overview)
- [Enabling Speech Recognition](#enabling-speech-recognition)
- [Language Configuration](#language-configuration)
- [Interim Results](#interim-results)
- [Button Customization](#button-customization)
- [Speech-to-Text Events](#speech-to-text-events)
- [Text-to-Speech Setup](#text-to-speech-setup)
- [Tooltip Configuration](#tooltip-configuration)
- [Browser Compatibility](#browser-compatibility)

## Speech-to-Text Overview

The AI AssistView integrates the Web Speech API for voice input, allowing users to speak prompts instead of typing.

### Prerequisites

- Syncfusion AI AssistView component
- Browser with Web Speech API support
- Microphone permission granted

## Enabling Speech Recognition

### Basic Setup

```tsx
import { AIAssistViewComponent, PromptRequestEventArgs, SpeechToTextSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import React, { useRef } from 'react';

function App() {
    const assistInstance = useRef<AIAssistViewComponent>(null);

    const speechToTextSettings: SpeechToTextSettingsModel = {
        enable: true
    };

    const handlePromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            assistInstance.current?.addPromptResponse('Response');
        }, 1000);
    };

    return (
        <AIAssistViewComponent 
            id="aiAssistView"
            ref={assistInstance}
            promptRequest={handlePromptRequest}
            speechToTextSettings={speechToTextSettings}
        />
    );
}

export default App;
```

### Microphone Button

When enabled, a microphone button appears in the toolbar to trigger voice input.

## Language Configuration

### Setting Recognition Language

Configure the `lang` property to specify which language to recognize (default uses browser language):

```tsx
const speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    lang: 'en-US'  // English - United States
};
```

### Common Language Codes

```tsx
// English
'en-US'      // United States
'en-GB'      // Great Britain
'en-AU'      // Australia

// Spanish
'es-ES'      // Spain
'es-MX'      // Mexico

// French
'fr-FR'      // France
'fr-CA'      // Canada

// German
'de-DE'      // Germany

// Mandarin Chinese
'zh-CN'      // Simplified Chinese
'zh-TW'      // Traditional Chinese

// Japanese
'ja-JP'      // Japan

// Arabic
'ar-SA'      // Saudi Arabia
'ar-AE'      // UAE
```

### Multiple Language Support

```tsx
const [selectedLang, setSelectedLang] = React.useState('en-US');

const speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    lang: selectedLang
};

return (
    <div>
        <select onChange={(e) => setSelectedLang(e.target.value)}>
            <option value="en-US">English</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
        </select>
        <AIAssistViewComponent 
            id="aiAssistView"
            speechToTextSettings={speechToTextSettings}
        />
    </div>
);
```

## Interim Results

### Enable Real-Time Transcription

Show partial transcription while user is still speaking:

```tsx
const speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    lang: 'en-US',
    allowInterimResults: true  // Show partial results
};
```

### Without Interim Results (Default)

Only final results are displayed after user stops speaking:

```tsx
const speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    allowInterimResults: false  // Only final results
};
```

## Button Customization

### Customize Button Text and Icons

```tsx
const speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    buttonSettings: {
        content: 'Start Recording',           // Text when idle
        stopContent: 'Stop Recording',        // Text while recording
        iconCss: 'e-icons e-microphone',      // Icon when idle
        stopIconCss: 'e-icons e-microphone-off'  // Icon while recording
    }
};

<AIAssistViewComponent 
    id="aiAssistView"
    speechToTextSettings={speechToTextSettings}
/>
```

### Custom Button Labels

```tsx
const speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    buttonSettings: {
        content: '🎙️ Speak Now',
        stopContent: '⏹️ Stop Speaking'
    }
};
```

## Speech-to-Text Events

### Handle Speech Lifecycle Events

```tsx
const speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    onStart: (args: any) => {
        console.log('Speech recognition started');
        // Show recording indicator
    },
    onStop: (args: any) => {
        console.log('Speech recognition stopped');
        // Hide recording indicator
    },
    transcriptChanged: (args: any) => {
        console.log('Transcript updated:', args.text);
        // Update UI with partial transcript
    },
    onError: (args: any) => {
        console.log('Speech error:', args.error);
        // Show error message
    }
};
```

### Complete Event Implementation

```tsx
import { AIAssistViewComponent, SpeechToTextSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import React, { useRef, useState } from 'react';

function App() {
    const [isRecording, setIsRecording] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [error, setError] = useState('');

    const speechToTextSettings: SpeechToTextSettingsModel = {
        enable: true,
        lang: 'en-US',
        allowInterimResults: true,
        onStart: () => {
            setIsRecording(true);
            setError('');
        },
        onStop: () => {
            setIsRecording(false);
        },
        transcriptChanged: (args: any) => {
            const text = args.text || args.transcript || '';
            setTranscript(text);
        },
        onError: (args: any) => {
            setError(args.error || 'Speech recognition error');
            setIsRecording(false);
        }
    };

    return (
        <div>
            <div className="speech-status">
                {isRecording && <span className="recording-indicator">🔴 Recording...</span>}
                {error && <span className="error-message">⚠️ {error}</span>}
            </div>
            <div className="transcript-display">
                {transcript || 'Waiting for speech...'}
            </div>
            <AIAssistViewComponent 
                id="aiAssistView"
                speechToTextSettings={speechToTextSettings}
            />
        </div>
    );
}

export default App;
```

## Text-to-Speech Setup

The AI AssistView supports built-in Text-to-Speech (TTS) functionality using the browser's Web Speech API ([SpeechSynthesisUtterance](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance)). This allows AI-generated responses to be converted into spoken audio, enhancing accessibility and user interaction.

### Prerequisites

1. Syncfusion AI AssistView component is properly set up in your React application
2. Browser with Web Speech API support (Chrome, Edge, Firefox, Safari, Opera)

### Configure Text-to-Speech

To enable the built-in Text-to-Speech functionality, add the `e-assist-audio` response toolbar item to the `items` collection of the `responseToolbarSettings` property. When clicked, it fetches the text from the generated AI response and uses the browser's SpeechSynthesis API to read it aloud.

```tsx
import { AIAssistViewComponent, PromptRequestEventArgs, ResponseToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import React, { useRef } from 'react';

function App() {
    const assistInstance = useRef<AIAssistViewComponent>(null);

    const responseToolbarSettings: ResponseToolbarSettingsModel = {
        items: [
            { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
            { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' }
        ]
    };

    const handlePromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            assistInstance.current?.addPromptResponse('For real-time prompt processing, connect the AI AssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.');
        }, 1000);
    };

    return (
        <AIAssistViewComponent
            id="aiAssistView"
            ref={assistInstance}
            promptRequest={handlePromptRequest}
            responseToolbarSettings={responseToolbarSettings}
        />
    );
}

export default App;
```

### Configuring Text-to-Speech Settings

You can customize the speech synthesis behavior using the `textToSpeechSettings` property. Available customization options include:

#### Properties

- **language**: Speech synthesis language code (e.g., 'en-US', 'fr-FR')
- **speechPitch**: Voice pitch level (0.1 to 2, default: 1)
- **speechRate**: Speaking speed (0.1 to 10, default: 1)
- **volume**: Audio volume level (0 to 1, default: 1)
- **voice**: Selected voice from available system voices

#### Example: Customizing TTS Settings

```tsx
import { AIAssistViewComponent, PromptModel, PromptRequestEventArgs, ResponseToolbarSettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-react-interactive-chat';
import React, { useRef } from 'react';

function App() {
    const assistInstance = useRef<AIAssistViewComponent>(null);

    const assistViewToolbarSettings: ToolbarSettingsModel = {
        items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
        itemClicked: (args: any) => {
            if (args.item.iconCss === 'e-icons e-refresh') {
                if (assistInstance.current) {
                    assistInstance.current.prompts = [];
                }
            }
        }
    };

    const responseToolbarSettings: ResponseToolbarSettingsModel = {
        items: [
            { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
            { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
            { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' }
        ]
    };

    // Configure the Text-to-Speech behavior
    const textToSpeechSettings = {
        language: 'en-US',
        speechPitch: 1,
        speechRate: 1,
        volume: 1
    };

    // Sample prompt data
    const promptsData: PromptModel[] = [
        {
            prompt: "What is AI?",
            response: "AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making."
        }
    ];

    const handlePromptRequest = (args: PromptRequestEventArgs) => {
        if (!args.prompt.trim()) return;

        const defaultResponse = 'For real-time prompt processing, connect the AI AssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
        assistInstance.current?.addPromptResponse(defaultResponse, true);
    };

    return (
        <AIAssistViewComponent
            id="aiAssistView"
            ref={assistInstance}
            prompts={promptsData}
            promptRequest={handlePromptRequest}
            toolbarSettings={assistViewToolbarSettings}
            responseToolbarSettings={responseToolbarSettings}
            textToSpeechSettings={textToSpeechSettings}
        />
    );
}

export default App;
```

#### Language Support

Common language codes for text-to-speech:

```tsx
// English
'en-US'      // United States
'en-GB'      // Great Britain
'en-AU'      // Australia

// Spanish
'es-ES'      // Spain
'es-MX'      // Mexico

// French
'fr-FR'      // France
'fr-CA'      // Canada

// German
'de-DE'      // Germany

// Japanese
'ja-JP'      // Japan

// Mandarin Chinese
'zh-CN'      // Simplified Chinese
'zh-TW'      // Traditional Chinese
```

#### Speech Pitch and Rate

```tsx
const textToSpeechSettings = {
    language: 'en-US',
    speechPitch: 1.5,    // Ranges from 0.1 (low) to 2 (high)
    speechRate: 0.8,     // Ranges from 0.1 (slow) to 10 (fast)
    volume: 0.9          // Ranges from 0 (silent) to 1 (max)
};
```

### TTS Button Behavior

When the `e-assist-audio` button is clicked:
- The component extracts the text from the AI response
- The Web Speech API synthesizes the text into audio using configured settings
- The audio plays based on the language, pitch, rate, and volume settings

## Tooltip Configuration

### Customize Microphone Button Tooltips

```tsx
const speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    tooltipSettings: {
        content: 'Click to start listening',
        stopContent: 'Click to stop listening',
        position: 'TopCenter'  // Tooltip position
    }
};
```

## Complete Speech Example

```tsx
import { 
    AIAssistViewComponent, 
    PromptRequestEventArgs,
    SpeechToTextSettingsModel,
    ResponseToolbarSettingsModel,
    ToolbarItemClickedEventArgs
} from '@syncfusion/ej2-react-interactive-chat';
import React, { useRef, useState } from 'react';

function App() {
    const assistInstance = useRef<AIAssistViewComponent>(null);
    const [recordingStatus, setRecordingStatus] = useState('Ready');
    let currentUtterance: SpeechSynthesisUtterance | null = null;

    const speechToTextSettings: SpeechToTextSettingsModel = {
        enable: true,
        lang: 'en-US',
        allowInterimResults: true,
        buttonSettings: {
            content: '🎙️ Speak',
            stopContent: '⏹️ Stop'
        },
        onStart: () => setRecordingStatus('Recording...'),
        onStop: () => setRecordingStatus('Processing...'),
        transcriptChanged: (args: any) => {
            console.log('Transcript:', args.text);
        },
        onError: (args: any) => {
            setRecordingStatus(`Error: ${args.error}`);
        }
    };

    const responseToolbarSettings: ResponseToolbarSettingsModel = {
        items: [
            { iconCss: 'e-icons e-audio', tooltip: 'Read Aloud' },
            { iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' }
        ],
        itemClicked: (args: ToolbarItemClickedEventArgs) => {
            const response = assistInstance.current?.prompts[args.dataIndex].response;
            
            if (args.item.iconCss === 'e-icons e-audio') {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = response;
                const text = tempDiv.textContent || '';
                
                if (currentUtterance && speechSynthesis.speaking) {
                    speechSynthesis.cancel();
                    currentUtterance = null;
                } else {
                    currentUtterance = new SpeechSynthesisUtterance(text);
                    speechSynthesis.speak(currentUtterance);
                }
            }
        }
    };

    const handlePromptRequest = (args: PromptRequestEventArgs) => {
        setTimeout(() => {
            assistInstance.current?.addPromptResponse(
                'Response to: ' + args.prompt
            );
            setRecordingStatus('Ready');
        }, 1000);
    };

    return (
        <div>
            <div className="status-bar">
                Status: <span className="status-text">{recordingStatus}</span>
            </div>
            <AIAssistViewComponent 
                id="aiAssistView"
                ref={assistInstance}
                promptRequest={handlePromptRequest}
                speechToTextSettings={speechToTextSettings}
                responseToolbarSettings={responseToolbarSettings}
            />
        </div>
    );
}

export default App;
```

## Browser Compatibility

### Supported Browsers

| Browser | Speech-to-Text | Text-to-Speech |
|---------|----------------|-----------------|
| Chrome  | ✅ Yes | ✅ Yes |
| Edge    | ✅ Yes | ✅ Yes |
| Firefox | ⚠️ Limited | ✅ Yes |
| Safari  | ⚠️ Limited | ✅ Yes |
| Opera   | ✅ Yes | ✅ Yes |

### Feature Detection

```tsx
// Check if Speech Recognition is available
const isSpeechRecognitionAvailable = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;

// Check if Speech Synthesis is available
const isSpeechSynthesisAvailable = 'speechSynthesis' in window;

if (!isSpeechRecognitionAvailable) {
    console.log('Speech-to-Text not supported');
}

if (!isSpeechSynthesisAvailable) {
    console.log('Text-to-Speech not supported');
}
```

## Best Practices

**Request microphone permission**: Ask users first before enabling  
**Show feedback during recording**: Visual indicators for recording state  
**Support language switching**: Allow users to change recognition language  
**Validate transcript**: Don't process incomplete or erroneous transcripts  
**Handle errors gracefully**: Show user-friendly error messages  
**Provide fallback**: Allow typing if voice input fails  
**Optimize audio playback**: Use appropriate speech rate and volume  
**Test browser compatibility**: Check supported browsers before deployment
