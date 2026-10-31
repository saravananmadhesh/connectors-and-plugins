# Speech-to-Text and Text-to-Speech Features

## Overview

The AI AssistView component provides two approaches for speech integration:

1. **Built-in Speech-to-Text** (`speechToTextSettings`) - Component's native speech recognition feature with Syncfusion controls
2. **Custom Web Speech API** - Manual implementation using browser's Web Speech API

**Recommendation:** Use the built-in `speechToTextSettings` for easier configuration and better integration with the component.

---

## Table of Contents
- [Built-in Speech-to-Text (Recommended)](#built-in-speech-to-text-recommended)
- [Custom Web Speech API Implementation](#custom-web-speech-api-implementation)
- [Text-to-Speech](#text-to-speech)
- [Browser Compatibility](#browser-compatibility)

---

## Built-in Speech-to-Text (Recommended)

The `speechToTextSettings` property provides a fully integrated speech-to-text feature with a pre-built microphone button, visual feedback, and event handling.

### Basic Setup

```ts
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, SpeechToTextSettingsModel } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [speechToTextSettings]="speechToTextSettings"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  public speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true
  };

  onPromptRequest(args: any) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response to your voice input...');
    }, 1000);
  }
}
```

### SpeechToTextSettingsModel Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable` | boolean | false | Enables or disables speech-to-text functionality |
| `lang` | string | 'en-US' | Specifies the language for speech recognition using ISO language codes |
| `allowInterimResults` | boolean | false | Whether to capture interim results during speech recognition |
| `disabled` | boolean | false | Whether the speech-to-text control is disabled |
| `listeningState` | SpeechToTextState | - | Indicates whether the component is currently listening (read-only) |
| `transcript` | string | '' | Stores the recognized speech transcript (read-only) |
| `cssClass` | string | '' | Custom CSS classes for the speech-to-text component |
| `showTooltip` | boolean | true | Whether to show tooltip for the mic button |
| `buttonSettings` | ButtonSettingsModel | - | Configuration for mic button appearance and behavior |
| `tooltipSettings` | TooltipSettingsModel | - | Configuration for tooltip appearance and behavior |

### Complete Configuration Example

```ts
import { Component, ViewChild } from '@angular/core';
import { 
  AIAssistViewModule, 
  AIAssistViewComponent, 
  SpeechToTextSettingsModel,
  TranscriptChangedEventArgs,
  StartListeningEventArgs,
  StopListeningEventArgs,
  ErrorEventArgs
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [speechToTextSettings]="speechToTextSettings"
      (promptRequest)="onPromptRequest($event)">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  public speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    lang: 'en-US',
    allowInterimResults: true,
    disabled: false,
    showTooltip: true,
    cssClass: 'custom-speech-button',
    
    // Button configuration
    buttonSettings: {
      iconCss: 'e-icons e-microphone',
      content: '',
      cssClass: 'speech-button'
    },
    
    // Tooltip configuration
    tooltipSettings: {
      content: 'Click to speak',
      position: 'TopCenter'
    },
    
    // Event handlers
    onStart: this.onSpeechStart.bind(this),
    onStop: this.onSpeechStop.bind(this),
    onError: this.onSpeechError.bind(this),
    transcriptChanged: this.onTranscriptChanged.bind(this)
  };

  onSpeechStart(args: StartListeningEventArgs) {
    console.log('Speech recognition started');
    console.log('Event name:', args.name);
  }

  onSpeechStop(args: StopListeningEventArgs) {
    console.log('Speech recognition stopped');
    console.log('Final transcript:', args.transcript);
    console.log('Event name:', args.name);
  }

  onSpeechError(args: ErrorEventArgs) {
    console.error('Speech recognition error:', args.error);
    console.log('Error message:', args.message);
    console.log('Event name:', args.name);
  }

  onTranscriptChanged(args: TranscriptChangedEventArgs) {
    console.log('Transcript changed:', args.transcript);
    console.log('Is interim result:', args.isInterim);
    console.log('Event name:', args.name);
  }

  onPromptRequest(args: any) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response to: ' + args.prompt);
    }, 1000);
  }
}
```

### Language Support

Set the `lang` property to specify the speech recognition language:

```ts
public speechToTextSettings: SpeechToTextSettingsModel = {
  enable: true,
  lang: 'en-US'  // or 'es-ES', 'fr-FR', 'de-DE', 'ja-JP', etc.
};
```

**Common Language Codes:**
- `en-US` - English (United States)
- `en-GB` - English (United Kingdom)
- `es-ES` - Spanish (Spain)
- `fr-FR` - French (France)
- `de-DE` - German (Germany)
- `zh-CN` - Chinese (Simplified)
- `ja-JP` - Japanese
- `ko-KR` - Korean
- `it-IT` - Italian
- `pt-BR` - Portuguese (Brazil)

### ButtonSettingsModel Configuration

Customize the microphone button appearance:

```ts
public speechToTextSettings: SpeechToTextSettingsModel = {
  enable: true,
  buttonSettings: {
    iconCss: 'e-icons e-microphone',      // Icon class
    content: 'Speak',                      // Button text (optional)
    cssClass: 'custom-mic-button',         // Custom CSS class
    isPrimary: true                         // Primary button styling
  }
};
```

### TooltipSettingsModel Configuration

Customize tooltip behavior:

```ts
public speechToTextSettings: SpeechToTextSettingsModel = {
  enable: true,
  showTooltip: true,
  tooltipSettings: {
    content: 'Click to start speaking',    // Tooltip text
    position: 'TopCenter',                  // Tooltip position
    openDelay: 300,                         // Delay before showing (ms)
    closeDelay: 100                         // Delay before hiding (ms)
  }
};
```

### Speech Events

The built-in speech-to-text provides four events for tracking speech recognition lifecycle:

#### 1. onStart Event

Triggered when speech recognition starts:

```ts
onSpeechStart(args: StartListeningEventArgs) {
  console.log('Started listening');
  // Update UI to show recording state
  this.isRecording = true;
}
```

**StartListeningEventArgs Properties:**
- `name` (string) - Event name
- `event` (Event) - Original DOM event

#### 2. onStop Event

Triggered when speech recognition stops:

```ts
onSpeechStop(args: StopListeningEventArgs) {
  console.log('Stopped listening');
  console.log('Final transcript:', args.transcript);
  
  // Process the final transcript
  if (args.transcript) {
    this.aiAssistViewComponent.executePrompt(args.transcript);
  }
  
  this.isRecording = false;
}
```

**StopListeningEventArgs Properties:**
- `name` (string) - Event name
- `transcript` (string) - Final recognized text
- `event` (Event) - Original DOM event

#### 3. transcriptChanged Event

Triggered when the transcript changes (including interim results if enabled):

```ts
onTranscriptChanged(args: TranscriptChangedEventArgs) {
  console.log('Current transcript:', args.transcript);
  console.log('Is interim:', args.isInterim);
  
  // Show live transcript to user
  if (args.isInterim) {
    this.displayInterimTranscript(args.transcript);
  } else {
    this.displayFinalTranscript(args.transcript);
  }
}
```

**TranscriptChangedEventArgs Properties:**
- `name` (string) - Event name
- `transcript` (string) - Current transcript text
- `isInterim` (boolean) - Whether this is an interim or final result
- `previousTranscript` (string) - Previous transcript value

#### 4. onError Event

Triggered when an error occurs during speech recognition:

```ts
onSpeechError(args: ErrorEventArgs) {
  console.error('Speech error:', args.error);
  
  switch (args.error) {
    case 'no-speech':
      alert('No speech was detected. Please try again.');
      break;
    case 'audio-capture':
      alert('No microphone was found. Please check your device.');
      break;
    case 'not-allowed':
      alert('Microphone permission was denied.');
      break;
    default:
      alert('An error occurred: ' + args.message);
  }
}
```

**ErrorEventArgs Properties:**
- `name` (string) - Event name
- `error` (string) - Error code
- `message` (string) - Error message

### Interim Results

Enable `allowInterimResults` to show real-time transcription as the user speaks:

```ts
public speechToTextSettings: SpeechToTextSettingsModel = {
  enable: true,
  allowInterimResults: true,
  transcriptChanged: (args: TranscriptChangedEventArgs) => {
    if (args.isInterim) {
      // Show partial result with visual indicator
      console.log('Listening...', args.transcript);
    } else {
      // Final result
      console.log('Final:', args.transcript);
    }
  }
};
```

### Complete Production Example

```ts
import { Component, ViewChild } from '@angular/core';
import { 
  AIAssistViewModule, 
  AIAssistViewComponent, 
  SpeechToTextSettingsModel,
  TranscriptChangedEventArgs,
  StopListeningEventArgs,
  ErrorEventArgs
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <div *ngIf="interimTranscript" class="interim-display">
        <span class="listening-indicator">●</span>
        {{ interimTranscript }}
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        [speechToTextSettings]="speechToTextSettings"
        (promptRequest)="onPromptRequest($event)">
      </div>
    </div>
  `,
  styles: [`
    .interim-display {
      padding: 12px;
      background: #fff3cd;
      border-left: 4px solid #ffc107;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .listening-indicator {
      color: #ff5722;
      animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `]
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  interimTranscript = '';

  public speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    lang: 'en-US',
    allowInterimResults: true,
    showTooltip: true,
    
    buttonSettings: {
      iconCss: 'e-icons e-microphone',
      cssClass: 'speech-mic-button'
    },
    
    tooltipSettings: {
      content: 'Click to speak (or press and hold)',
      position: 'TopCenter'
    },
    
    onStop: this.onSpeechStop.bind(this),
    onError: this.onSpeechError.bind(this),
    transcriptChanged: this.onTranscriptChanged.bind(this)
  };

  onTranscriptChanged(args: TranscriptChangedEventArgs) {
    if (args.isInterim) {
      // Show interim results
      this.interimTranscript = args.transcript;
    } else {
      // Clear interim and process final
      this.interimTranscript = '';
      this.processFinalTranscript(args.transcript);
    }
  }

  onSpeechStop(args: StopListeningEventArgs) {
    this.interimTranscript = '';
    
    if (args.transcript && args.transcript.trim()) {
      // Automatically submit the recognized speech as a prompt
      this.aiAssistViewComponent.executePrompt(args.transcript);
    }
  }

  onSpeechError(args: ErrorEventArgs) {
    this.interimTranscript = '';
    
    let userMessage = '';
    switch (args.error) {
      case 'no-speech':
        userMessage = 'No speech detected. Please try again.';
        break;
      case 'audio-capture':
        userMessage = 'Microphone not found. Please check your device settings.';
        break;
      case 'not-allowed':
        userMessage = 'Microphone permission denied. Please allow microphone access.';
        break;
      case 'network':
        userMessage = 'Network error. Please check your internet connection.';
        break;
      default:
        userMessage = `Speech recognition error: ${args.message}`;
    }
    
    console.error(userMessage);
    // Optionally show error to user
    alert(userMessage);
  }

  processFinalTranscript(transcript: string) {
    console.log('Final transcript:', transcript);
    // Additional processing if needed
  }

  onPromptRequest(args: any) {
    // Call AI service
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse(
        `Response to your voice input: "${args.prompt}"`
      );
    }, 1000);
  }
}
```

---

## Custom Web Speech API Implementation

If you need more control or custom behavior, you can implement speech recognition manually using the Web Speech API.

### Browser Compatibility

Speech-to-text relies on the Web Speech API, which is supported in:
- Chrome/Edge: Full support
- Firefox: Partial support
- Safari: Partial support
- Mobile browsers: Varies by platform

### Basic Speech-to-Text Setup

```ts
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="controls">
        <button (click)="startListening()" [disabled]="isListening">
          {{ isListening ? 'Listening...' : 'Start Listening' }}
        </button>
        <button (click)="stopListening()" [disabled]="!isListening">
          Stop Listening
        </button>
      </div>
      
      <div *ngIf="transcript" class="transcript">
        <strong>You said:</strong> {{ transcript }}
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        [prompt]="transcript"
        (promptRequest)="onPromptRequest($event)">
      </div>
    </div>
  `,
  styles: [`
    .controls {
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      gap: 8px;
    }
    
    button {
      padding: 8px 16px;
      background: #2196F3;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    
    .transcript {
      padding: 12px 16px;
      background: #f0f7ff;
      border-left: 4px solid #2196F3;
      margin: 12px;
    }
  `]
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  transcript = '';
  isListening = false;
  private recognition: any;

  ngOnInit() {
    // Initialize speech recognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      console.error('Speech Recognition API not supported in this browser');
      return;
    }
    
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.language = 'en-US';
    
    // Handle results
    this.recognition.onresult = (event: any) => {
      this.transcript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          this.transcript += event.results[i][0].transcript;
        }
      }
    };
    
    // Handle errors
    this.recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
    };
    
    // Handle end
    this.recognition.onend = () => {
      this.isListening = false;
    };
  }

  startListening() {
    this.transcript = '';
    this.isListening = true;
    this.recognition.start();
  }

  stopListening() {
    this.isListening = false;
    this.recognition.stop();
  }

  onPromptRequest(args: any) {
    // Handle prompt from voice input
    setTimeout(() => {
      const response = 'Processing your voice input...';
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }
}
```

### Advanced Speech-to-Text with Language Support

```ts
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="language-selector">
        <label for="language">Language:</label>
        <select id="language" (change)="setLanguage($event)">
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="es-ES">Spanish</option>
          <option value="fr-FR">French</option>
          <option value="de-DE">German</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="ja-JP">Japanese</option>
        </select>
      </div>
      
      <div class="controls">
        <button (click)="startListening()" [disabled]="isListening">
          {{ isListening ? 'Listening...' : 'Start Voice Input' }}
        </button>
      </div>
      
      <div *ngIf="transcript" class="transcript">
        <p><strong>Recognized:</strong> {{ transcript }}</p>
        <p *ngIf="isFinal" class="final-text">(Final result)</p>
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        (promptRequest)="onPromptRequest($event)">
      </div>
    </div>
  `,
  styles: [`
    .language-selector {
      padding: 12px 16px;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .language-selector label {
      margin-right: 8px;
      font-weight: 500;
    }
    
    .language-selector select {
      padding: 6px 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    .transcript {
      padding: 12px 16px;
      background: #f0f7ff;
      border-left: 4px solid #2196F3;
    }
    
    .final-text {
      font-size: 12px;
      color: #666;
      margin-top: 4px;
    }
  `]
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  transcript = '';
  isFinal = false;
  isListening = false;
  private recognition: any;
  private selectedLanguage = 'en-US';

  ngOnInit() {
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser');
      return;
    }
    
    this.recognition = new SpeechRecognition();
    this.recognition.language = this.selectedLanguage;
    this.recognition.interimResults = true;
    
    this.recognition.onstart = () => {
      this.isListening = true;
      this.transcript = '';
      this.isFinal = false;
    };
    
    this.recognition.onresult = (event: any) => {
      this.transcript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          this.transcript += transcript;
          this.isFinal = true;
        } else {
          this.transcript += transcript;
        }
      }
    };
    
    this.recognition.onerror = (event: any) => {
      console.error('Speech error:', event.error);
      this.showError(`Speech recognition error: ${event.error}`);
    };
    
    this.recognition.onend = () => {
      this.isListening = false;
      if (this.transcript.trim()) {
        // Auto-submit if final result
        if (this.isFinal) {
          this.submitVoiceInput();
        }
      }
    };
  }

  setLanguage(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedLanguage = selectElement.value;
    
    if (this.recognition) {
      this.recognition.language = this.selectedLanguage;
    }
  }

  startListening() {
    if (this.recognition) {
      this.recognition.start();
    }
  }

  submitVoiceInput() {
    this.aiAssistViewComponent.executePrompt(this.transcript);
  }

  showError(message: string) {
    this.aiAssistViewComponent.addPromptResponse(`Error: ${message}`);
  }

  onPromptRequest(args: any) {
    // Handle prompt
  }
}
```

---

## Text-to-Speech (Speech Synthesis)

Convert AI responses into audio output:

### Basic Text-to-Speech

```ts
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="controls">
        <button (click)="toggleSpeech()" [disabled]="!lastResponse">
          {{ isSpeaking ? '🔊 Stop Speech' : '🔉 Speak Response' }}
        </button>
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        (promptRequest)="onPromptRequest($event)">
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  lastResponse = '';
  isSpeaking = false;
  private synthesis: any;

  ngOnInit() {
    // Initialize speech synthesis
    const SpeechSynthesisUtterance = (window as any).SpeechSynthesisUtterance;
    this.synthesis = window.speechSynthesis;
    
    if (!this.synthesis) {
      console.error('Speech Synthesis API not supported');
      return;
    }
  }

  async onPromptRequest(args: any) {
    try {
      // Simulate AI response
      const response = 'This is a sample response that will be spoken aloud.';
      this.lastResponse = response;
      
      this.aiAssistViewComponent.addPromptResponse(response);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  toggleSpeech() {
    if (this.isSpeaking) {
      this.stopSpeech();
    } else {
      this.speak(this.lastResponse);
    }
  }

  private speak(text: string) {
    if (!this.synthesis) return;
    
    // Cancel any ongoing speech
    this.synthesis.cancel();
    
    const utterance = new (window as any).SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    utterance.onstart = () => {
      this.isSpeaking = true;
    };
    
    utterance.onend = () => {
      this.isSpeaking = false;
    };
    
    utterance.onerror = (error: any) => {
      console.error('Speech synthesis error:', error);
      this.isSpeaking = false;
    };
    
    this.synthesis.speak(utterance);
  }

  private stopSpeech() {
    if (this.synthesis) {
      this.synthesis.cancel();
      this.isSpeaking = false;
    }
  }
}
```

### Advanced Text-to-Speech with Voice Selection

```ts
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="tts-settings">
        <div class="setting">
          <label for="voice">Voice:</label>
          <select id="voice" (change)="setVoice($event)">
            <option *ngFor="let voice of voices" [value]="voice.name">
              {{ voice.name }} ({{ voice.lang }})
            </option>
          </select>
        </div>
        
        <div class="setting">
          <label for="rate">Speed:</label>
          <input 
            id="rate" 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1" 
            [value]="rate"
            (change)="setRate($event)">
          <span>{{ rate }}</span>
        </div>
        
        <div class="setting">
          <label for="pitch">Pitch:</label>
          <input 
            id="pitch" 
            type="range" 
            min="0.5" 
            max="2" 
            step="0.1" 
            [value]="pitch"
            (change)="setPitch($event)">
          <span>{{ pitch }}</span>
        </div>
      </div>
      
      <div class="controls">
        <button (click)="toggleSpeech()" [disabled]="!lastResponse">
          {{ isSpeaking ? '⏹ Stop' : '▶ Speak' }}
        </button>
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        (promptRequest)="onPromptRequest($event)">
      </div>
    </div>
  `,
  styles: [`
    .tts-settings {
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
      background: #f9f9f9;
    }
    
    .setting {
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .setting label {
      min-width: 80px;
      font-weight: 500;
    }
    
    .setting select,
    .setting input {
      flex: 1;
      padding: 6px 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  voices: any[] = [];
  selectedVoice: any;
  rate = 1;
  pitch = 1;
  lastResponse = '';
  isSpeaking = false;
  
  private synthesis = window.speechSynthesis;

  ngOnInit() {
    this.loadVoices();
    
    // Reload voices when they're loaded
    this.synthesis.onvoiceschanged = () => {
      this.loadVoices();
    };
  }

  private loadVoices() {
    this.voices = this.synthesis.getVoices();
    if (this.voices.length > 0 && !this.selectedVoice) {
      this.selectedVoice = this.voices[0];
    }
  }

  setVoice(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const voiceName = selectElement.value;
    this.selectedVoice = this.voices.find(v => v.name === voiceName);
  }

  setRate(event: Event) {
    const input = event.target as HTMLInputElement;
    this.rate = parseFloat(input.value);
  }

  setPitch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.pitch = parseFloat(input.value);
  }

  toggleSpeech() {
    if (this.isSpeaking) {
      this.stopSpeech();
    } else {
      this.speak(this.lastResponse);
    }
  }

  private speak(text: string) {
    this.synthesis.cancel();
    
    const utterance = new (window as any).SpeechSynthesisUtterance(text);
    utterance.voice = this.selectedVoice;
    utterance.rate = this.rate;
    utterance.pitch = this.pitch;
    utterance.volume = 1;
    
    utterance.onstart = () => {
      this.isSpeaking = true;
    };
    
    utterance.onend = () => {
      this.isSpeaking = false;
    };
    
    utterance.onerror = (error: any) => {
      console.error('TTS error:', error);
      this.isSpeaking = false;
    };
    
    this.synthesis.speak(utterance);
  }

  private stopSpeech() {
    this.synthesis.cancel();
    this.isSpeaking = false;
  }

  async onPromptRequest(args: any) {
    const response = 'Sample response text for speech synthesis demonstration.';
    this.lastResponse = response;
    this.aiAssistViewComponent.addPromptResponse(response);
  }
}
```

---

## Browser Compatibility Check

```ts
checkBrowserSupport() {
  const hasSpeechRecognition = !!(
    (window as any).SpeechRecognition || 
    (window as any).webkitSpeechRecognition
  );
  
  const hasSpeechSynthesis = !!window.speechSynthesis;
  
  return {
    speechToText: hasSpeechRecognition,
    textToSpeech: hasSpeechSynthesis,
    browser: this.detectBrowser()
  };
}

private detectBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edge')) return 'Edge';
  return 'Unknown';
}
```

---

## Combined Voice Features Example

```ts
// Use both speech-to-text and text-to-speech together
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="voice-assistant">
      <div class="controls">
        <button (click)="startListening()" [disabled]="isListening">
          🎤 Listen
        </button>
        <button (click)="toggleSpeech()" [disabled]="!lastResponse">
          🔊 Speak
        </button>
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        (promptRequest)="onPromptRequest($event)">
      </div>
    </div>
  `
})
export class VoiceAssistantComponent {
  // Combine both STT and TTS capabilities
}
```

