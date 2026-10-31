# Text to Speech in Angular AI AssistView Component

The AI AssistView component provides built-in **Text-to-Speech** (TTS) support using the browser's Web Speech API, specifically the `SpeechSynthesisUtterance` interface. This converts AI-generated responses into spoken audio, enhancing accessibility and user interaction.

---

## Table of Contents
- [Prerequisites](#prerequisites)
- [Configure Text to Speech](#configure-text-to-speech)
- [Customizing Speech Settings](#customizing-speech-settings)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [See Also](#see-also)

---

## Prerequisites

Before integrating Text-to-Speech, ensure the following:

1. The Syncfusion AI AssistView component is properly set up in your Angular application.
2. The AI AssistView component is integrated with an AI service such as Azure OpenAI.

---

## Configure Text to Speech

Enable built-in Text-to-Speech by adding the `e-assist-audio` response toolbar item to the `items` collection of the `responseToolbarSettings` property. When clicked, it fetches the text from the generated AI response and uses the browser's `SpeechSynthesis` API to read it aloud.

```typescript
import { Component, ViewChild } from '@angular/core';
import {
  AIAssistViewModule,
  AIAssistViewComponent,
  ToolbarSettingsModel,
  ToolbarItemClickedEventArgs,
  PromptRequestEventArgs,
  ResponseToolbarSettingsModel,
  TextToSpeechSettingsModel
} from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  standalone: true,
  imports: [AIAssistViewModule],
  selector: 'app-root',
  template: `
    <div class="integration-texttospeech-settings">
      <ejs-aiassistview
        #assistView
        [prompts]="promptsData"
        [responseToolbarSettings]="responseToolbarSettings"
        [toolbarSettings]="toolbarSettings"
        [textToSpeechSettings]="textToSpeechSettings"
        [bannerTemplate]="bannerTemplate"
        (promptRequest)="onPromptRequest($event)"
        (toolbarItemClicked)="onToolbarItemClicked($event)"
      >
        <ng-template #bannerTemplate>
          <div class="banner-content">
            <div class="e-icons e-assist-audio"></div>
            <i>Speech settings configured</i>
          </div>
        </ng-template>
      </ejs-aiassistview>
    </div>
  `
})
export class AppComponent {
  @ViewChild('assistView') assistViewInstance!: AIAssistViewComponent;

  public promptsData = [
    {
      prompt: 'What is AI?',
      response: 'AI stands for Artificial Intelligence, enabling machines to mimic human intelligence for tasks such as learning, problem-solving, and decision-making.'
    }
  ];

  public textToSpeechSettings: TextToSpeechSettingsModel = {
    language: 'en-US',
    speechPitch: 1,
    speechRate: 1,
    volume: 1
  };

  public responseToolbarSettings: ResponseToolbarSettingsModel = {
    items: [
      { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
      { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
      { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' }
    ]
  };

  public toolbarSettings: ToolbarSettingsModel = {
    items: [{ iconCss: 'e-icons e-refresh', align: 'Right' }],
    itemClicked: this.onToolbarItemClicked.bind(this)
  };

  public onToolbarItemClicked(args: ToolbarItemClickedEventArgs): void {
    if (args.item!.iconCss === 'e-icons e-refresh') {
      this.assistViewInstance.prompts = [];
    }
  }

  public onPromptRequest(args: PromptRequestEventArgs): void {
    setTimeout(() => {
      const defaultResponse = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
      this.assistViewInstance.addPromptResponse(defaultResponse);
    }, 1000);
  }
}
```

---

## Customizing Speech Settings

Use the `textToSpeechSettings` property to customize speech synthesis behavior.

### TextToSpeechSettingsModel Properties

| Property | Type | Description |
|----------|------|-------------|
| `language` | `string` | Language/locale used for speech synthesis (e.g., `'en-US'`). |
| `speechPitch` | `number` | Pitch of the synthesized voice. |
| `speechRate` | `number` | Rate/speed at which the response is read aloud. |
| `volume` | `number` | Playback volume of the synthesized speech. |
| `voice` | `string` | Specific voice to use for speech synthesis, if supported by the browser. |

### Streaming Response with Text-to-Speech Toolbar Item

Text-to-Speech works alongside streamed responses; the `e-assist-audio` toolbar item reads the fully rendered response text once available.

```typescript
public responseToolbarSettings: ResponseToolbarSettingsModel = {
  items: [
    { type: 'Button', iconCss: 'e-icons e-assist-copy', tooltip: 'Copy' },
    { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' },
    { type: 'Button', iconCss: 'e-icons e-assist-like', tooltip: 'Like' },
    { type: 'Button', iconCss: 'e-icons e-assist-dislike', tooltip: 'Need Improvement' }
  ]
};
```

---

## Best Practices

### 1. Pair the `e-assist-audio` Icon with `responseToolbarSettings`

```ts
// ✅ Do — add to items collection
items: [{ type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' }]
```

### 2. Configure `textToSpeechSettings` for Locale-Appropriate Playback

Set `language` to match the response content's language for correct pronunciation.

---

## Troubleshooting

### Issue: Read Aloud Button Does Nothing

**Cause:** The `e-assist-audio` icon is missing from `responseToolbarSettings.items`.

**Solution:**
```ts
items: [
  { type: 'Button', iconCss: 'e-icons e-assist-audio', tooltip: 'Read Aloud' }
]
```

### Issue: Speech Plays in the Wrong Language or Voice

**Cause:** `textToSpeechSettings.language` or `voice` doesn't match an available browser voice.

**Solution:** Verify supported voices/languages via the browser's `SpeechSynthesis` API and set `language`/`voice` accordingly.

---

## See Also

- [Speech-to-Text](./speech-features.md)
