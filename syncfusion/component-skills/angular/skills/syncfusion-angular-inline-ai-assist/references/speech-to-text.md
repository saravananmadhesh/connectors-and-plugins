# Speech to Text in Inline AI Assist

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Enable Built-in Speech-to-Text](#enable-built-in-speech-to-text)
- [Configure Speech Recognition Language](#configure-speech-recognition-language)
- [Configure Speech Button Settings](#configure-speech-button-settings)
- [Enable Interim Results](#enable-interim-results)
- [Configure Tooltip Settings](#configure-tooltip-settings)
- [Speech to Text Events](#speech-to-text-events)
- [Browser Compatibility](#browser-compatibility)
- [API Surface Summary](#api-surface-summary)

---

## Overview

The Syncfusion Angular **Inline AI Assist** component integrates `Speech-to-Text` functionality through the browser's [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). This enables the conversion of spoken words into text using the device's microphone, allowing users to interact with the Inline AI Assist through voice input.

The feature is configured through a single `speechToTextSettings` object that controls enablement, language, interim results, button appearance, tooltip, and four lifecycle events.

---

## Prerequisites

Before integrating `Speech-to-Text`, ensure the following:

1. The Syncfusion Inline AI Assist component is properly set up in your Angular application.
2. The Inline AI Assist component is integrated with **Azure OpenAI** (or another AI service) to process the transcribed prompt.

---

## Enable Built-in Speech-to-Text

Set `speechToTextSettings.enable` to `true` to activate the microphone button on the Inline AI Assist prompt editor.

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  InlineAIAssistModule,
  InlineAIAssistComponent,
  InlinePromptRequestEventArgs,
  ResponseSettingsModel,
  ResponseItemSelectEventArgs,
  SpeechToTextSettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  standalone: true,
  imports: [InlineAIAssistModule],
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('inlineAssistComponent')
  public inlineAssistComponent!: InlineAIAssistComponent;

  public speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true
  };

  public itemSelect = (args: ResponseItemSelectEventArgs): void => {
    if (args.command.label === 'Accept') {
      const editable = document.getElementById('editableText') as HTMLElement | null;
      if (editable) {
        editable.innerHTML = '<p>' + this.inlineAssistComponent.prompts[this.inlineAssistComponent.prompts.length - 1].response + '</p>';
      }
      this.inlineAssistComponent.hidePopup();
    } else if (args.command.label === 'Discard') {
      this.inlineAssistComponent.hidePopup();
    }
  };

  public responseSetting: ResponseSettingsModel = {
    itemSelect: this.itemSelect
  };

  public onClick(): void {
    this.inlineAssistComponent.showPopup();
  }

  public onPromptRequest = (args: InlinePromptRequestEventArgs): void => {
    if (!args.prompt?.trim()) {
      return;
    }

    setTimeout(() => {
      const defaultResponse =
        'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

      this.inlineAssistComponent.addResponse(defaultResponse);
    }, 1000);
  };
}
```

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

---

## Configure Speech Recognition Language

The `lang` property of `speechToTextSettings` allows you to set the language code for speech recognition. By default, the browser's language is used. Specify a custom language code (e.g., `'en-US'`, `'es-ES'`, `'fr-FR'`) to ensure accurate recognition for the target audience.

```typescript
public speechToTextSettings: SpeechToTextSettingsModel = {
  enable: true,
  lang: 'en-US'
};
```

---

## Configure Speech Button Settings

The `buttonSettings` property customizes the microphone button's appearance and text by configuring four fields:

| Field | Description |
|-------|-------------|
| `content` | Text displayed when idle. |
| `stopContent` | Text displayed when recording. |
| `iconCss` | Icon class shown when idle. |
| `stopIconCss` | Icon class shown when recording. |

```typescript
public speechToTextSettings: SpeechToTextSettingsModel = {
  enable: true,
  buttonSettings: {
    content: 'Start Recording',
    stopContent: 'Stop Recording',
    iconCss: 'e-icons e-microphone',
    stopIconCss: 'e-icons e-microphone-off'
  }
};
```

---

## Enable Interim Results

The `allowInterimResults` property enables real-time transcription while the user is still speaking. When set to `true`, the engine returns interim (partial) transcripts as it processes the audio, providing immediate feedback before the final transcript is produced.

```typescript
public speechToTextSettings: SpeechToTextSettingsModel = {
  enable: true,
  allowInterimResults: true
};
```

### Full Configuration Example

The following example combines `lang`, `allowInterimResults`, and `buttonSettings` into a single configuration:

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  InlineAIAssistModule,
  InlineAIAssistComponent,
  InlinePromptRequestEventArgs,
  ResponseSettingsModel,
  ResponseItemSelectEventArgs,
  SpeechToTextSettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  standalone: true,
  imports: [InlineAIAssistModule],
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('inlineAssistComponent')
  public inlineAssistComponent!: InlineAIAssistComponent;

  public speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    lang: 'en-US',
    allowInterimResults: true,
    buttonSettings: {
      content: 'Start Recording',
      stopContent: 'Stop Recording',
      iconCss: 'e-icons e-microphone',
      stopIconCss: 'e-icons e-microphone-off'
    }
  };

  public itemSelect = (args: ResponseItemSelectEventArgs): void => {
    if (args.command.label === 'Accept') {
      const editable = document.getElementById('editableText') as HTMLElement | null;
      if (editable) {
        editable.innerHTML = '<p>' + this.inlineAssistComponent.prompts[this.inlineAssistComponent.prompts.length - 1].response + '</p>';
      }
      this.inlineAssistComponent.hidePopup();
    } else if (args.command.label === 'Discard') {
      this.inlineAssistComponent.hidePopup();
    }
  };

  public responseSetting: ResponseSettingsModel = {
    itemSelect: this.itemSelect
  };

  public onClick(): void {
    this.inlineAssistComponent.showPopup();
  }

  public onPromptRequest = (args: InlinePromptRequestEventArgs): void => {
    if (!args.prompt?.trim()) {
      return;
    }

    setTimeout(() => {
      const defaultResponse =
        'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

      this.inlineAssistComponent.addResponse(defaultResponse);
    }, 1000);
  };
}
```

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

---

## Configure Tooltip Settings

The `tooltipSettings` property customizes the tooltips of the microphone button (idle and recording states), along with the tooltip position.

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  InlineAIAssistModule,
  InlineAIAssistComponent,
  InlinePromptRequestEventArgs,
  ResponseSettingsModel,
  ResponseItemSelectEventArgs,
  SpeechToTextSettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  standalone: true,
  imports: [InlineAIAssistModule],
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('inlineAssistComponent')
  public inlineAssistComponent!: InlineAIAssistComponent;

  public speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    tooltipSettings: {
      content: 'Click to start listening',
      stopContent: 'Click to stop listening',
      position: 'TopCenter'
    }
  };

  public itemSelect = (args: ResponseItemSelectEventArgs): void => {
    if (args.command.label === 'Accept') {
      const editable = document.getElementById('editableText') as HTMLElement | null;
      if (editable) {
        editable.innerHTML = '<p>' + this.inlineAssistComponent.prompts[this.inlineAssistComponent.prompts.length - 1].response + '</p>';
      }
      this.inlineAssistComponent.hidePopup();
    } else if (args.command.label === 'Discard') {
      this.inlineAssistComponent.hidePopup();
    }
  };

  public responseSetting: ResponseSettingsModel = {
    itemSelect: this.itemSelect
  };

  public onClick(): void {
    this.inlineAssistComponent.showPopup();
  }

  public onPromptRequest = (args: InlinePromptRequestEventArgs): void => {
    if (!args.prompt?.trim()) {
      return;
    }

    setTimeout(() => {
      const defaultResponse =
        'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

      this.inlineAssistComponent.addResponse(defaultResponse);
    }, 1000);
  };
}
```

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

---

## Speech to Text Events

Speech-to-text provides four lifecycle events. Bind them on `speechToTextSettings` to drive a recording indicator, transcript preview, and error UI.

| Event | Fires when |
|-------|------------|
| `onStart` | Recognition starts. |
| `onStop` | Recognition stops. |
| `transcriptChanged` | Transcript updates (interim and final). |
| `onError` | Recognition or microphone error occurs. |

### Example: Recording indicator + live transcript + error UI

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  InlineAIAssistModule,
  InlineAIAssistComponent,
  InlinePromptRequestEventArgs,
  ResponseSettingsModel,
  ResponseItemSelectEventArgs,
  SpeechToTextSettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  standalone: true,
  imports: [InlineAIAssistModule],
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  @ViewChild('inlineAssistComponent')
  public inlineAssistComponent!: InlineAIAssistComponent;

  private lastTranscript = '';

  public speechToTextSettings: SpeechToTextSettingsModel = {
    enable: true,
    onStart: this.onSpeechStart.bind(this),
    onStop: this.onSpeechStop.bind(this),
    transcriptChanged: this.onTranscriptChanged.bind(this),
    onError: this.onSpeechError.bind(this)
  };

  public itemSelect = (args: ResponseItemSelectEventArgs): void => {
    if (args.command.label === 'Accept') {
      const editable = document.getElementById('editableText') as HTMLElement | null;
      if (editable) {
        editable.innerHTML = '<p>' + this.inlineAssistComponent.prompts[this.inlineAssistComponent.prompts.length - 1].response + '</p>';
      }
      this.inlineAssistComponent.hidePopup();
    } else if (args.command.label === 'Discard') {
      this.inlineAssistComponent.hidePopup();
    }
  };

  public responseSetting: ResponseSettingsModel = {
    itemSelect: this.itemSelect
  };

  public onClick(): void {
    this.inlineAssistComponent.showPopup();
  }

  public onSpeechStart(): void {
    const recordingIndicator = document.getElementById('recordingStatus');
    if (recordingIndicator) {
      recordingIndicator.textContent = 'Recording...';
      recordingIndicator.className = 'status-indicator recording';
    }
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
      errorMessage.style.display = 'none';
    }
  }

  public onSpeechStop(): void {
    const recordingIndicator = document.getElementById('recordingStatus');
    if (recordingIndicator) {
      recordingIndicator.textContent = 'Ready to record';
      recordingIndicator.className = 'status-indicator ready';
    }

    const transcriptDisplay = document.getElementById('transcriptDisplay');
    if (transcriptDisplay && this.lastTranscript) {
      transcriptDisplay.textContent = this.lastTranscript;
      transcriptDisplay.style.fontStyle = 'normal';
    }

    setTimeout(() => {
      this.lastTranscript = '';
      if (transcriptDisplay) {
        transcriptDisplay.textContent = 'Waiting for speech input...';
      }
    }, 2000);
  }

  public onTranscriptChanged(args: any): void {
    const currentTranscript = args.text || args.value || args.transcript || (args.result && args.result.transcript) || '';
    const isFinal = args.isFinal || args.final || (args.result && args.result.isFinal) || false;

    if (currentTranscript) {
      this.lastTranscript = currentTranscript;
    }

    const transcriptDisplay = document.getElementById('transcriptDisplay');
    if (transcriptDisplay) {
      transcriptDisplay.textContent = currentTranscript;
      transcriptDisplay.style.fontStyle = isFinal ? 'normal' : 'italic';
    }
  }

  public onSpeechError(args: any): void {
    const errorMessage = document.getElementById('errorMessage');
    if (errorMessage) {
      const errorText = errorMessage.querySelector('.error-text');
      if (errorText) {
        errorText.textContent = 'Error: ' + (args.error || 'Speech recognition error occurred');
      }
      errorMessage.style.display = 'block';
    }
    const recordingIndicator = document.getElementById('recordingStatus');
    if (recordingIndicator) {
      recordingIndicator.textContent = 'Ready to record';
      recordingIndicator.className = 'status-indicator ready';
    }
  }

  public onPromptRequest = (args: InlinePromptRequestEventArgs): void => {
    if (!args.prompt?.trim()) {
      return;
    }

    setTimeout(() => {
      const defaultResponse =
        'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';

      this.inlineAssistComponent.addResponse(defaultResponse);
    }, 1000);
  };
}
```

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

### Tips for `transcriptChanged`

- The argument shape varies by browser/engine — defensively read `args.text`, `args.value`, `args.transcript`, or `args.result.transcript`.
- `args.isFinal` (or `args.final` / `args.result.isFinal`) tells you whether the transcript is final or interim; use that to drive styling or auto-submit logic.
- Pair `onError` with a user-visible error block and a "Try again" affordance — browser-level errors (no microphone, permission denied) are the most common cause of failures.

---

## Browser Compatibility

The `SpeechToText` control relies on the [Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition), which has limited browser support. Chrome and Edge (Chromium-based) have native support; Firefox and Safari need configuration or fallback handling. Always provide a non-voice fallback for unsupported browsers.

---

## API Surface Summary

| Member | Type | Description |
|--------|------|-------------|
| `speechToTextSettings` | `SpeechToTextSettingsModel` | Input property on the component for all speech-to-text configuration. |
| `speechToTextSettings.enable` | `boolean` | Toggles the microphone button on the prompt editor. |
| `speechToTextSettings.lang` | `string` | BCP-47 language code (e.g. `'en-US'`, `'es-ES'`, `'fr-FR'`). |
| `speechToTextSettings.allowInterimResults` | `boolean` | Streams interim transcripts while the user speaks. |
| `speechToTextSettings.buttonSettings` | `ButtonSettingsModel` | `{ content, stopContent, iconCss, stopIconCss }` for the microphone button. |
| `speechToTextSettings.tooltipSettings` | `TooltipSettingsModel` | `{ content, stopContent, position }` for the microphone button tooltip. |
| `speechToTextSettings.onStart` | `() => void` | Fires when recognition starts. |
| `speechToTextSettings.onStop` | `() => void` | Fires when recognition stops. |
| `speechToTextSettings.transcriptChanged` | `(args) => void` | Fires on every transcript update (interim and final). |
| `speechToTextSettings.onError` | `(args) => void` | Fires when a recognition/microphone error occurs. |
