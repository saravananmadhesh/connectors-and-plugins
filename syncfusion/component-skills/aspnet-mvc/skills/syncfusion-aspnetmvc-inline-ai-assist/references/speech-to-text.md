# Speech-to-Text — Syncfusion ASP.NET MVC Inline AI Assist

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Enable Built-in Speech-to-Text](#enable-built-in-speech-to-text)
- [Configure Speech Recognition Language](#configure-speech-recognition-language)
- [Configure Speech Button Settings](#configure-speech-button-settings)
- [Enable Interim Results](#enable-interim-results)
- [Configure Tooltip Settings](#configure-tooltip-settings)
- [Speech-to-Text Events](#speech-to-text-events)
- [Browser Compatibility](#browser-compatibility)

---

## Overview

The Syncfusion ASP.NET MVC Inline AI Assist control supports `Speech-to-Text` through the browser's [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). This converts spoken words into text in the Inline AI Assist prompt, allowing users to submit voice prompts while working with selected content.

When content is selected, the recognized speech can be used as a prompt along with the selected content to provide contextual AI assistance. The generated response can be displayed inline, where users can review and accept or discard the suggestion.

> **AI integration:** For AI-generated responses, integrate the Inline AI Assist control with [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-foundry/models/openai).

---

## Prerequisites

Before enabling `Speech-to-Text`:

1. The [ASP.NET MVC Inline AI Assist](../getting-started) control must be configured in your application.
2. The browser must support the [Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition).
3. The user must grant microphone permission when prompted.

---

## Enable Built-in Speech-to-Text

Use the [SpeechToTextSettings](https://help.syncfusion.com/cr/aspnetmvc-js2/Syncfusion.EJ2.InteractiveChat.InlineAIAssist.html) property and set `Enable` to `true` to display the microphone button in the Inline AI Assist prompt.

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.InteractiveChat

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

    @Html.EJS().InlineAIAssist("stt").RelateTo("#summarizeBtn").Created("onCreated").PromptRequest("onPromptRequest").SpeechToTextSettings(new InlineAIAssistSpeechToTextSettings { Enable = true }).ResponseSettings(new InlineAIAssistResponseSettings { ItemSelect = "onItemSelect" }).Render()
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

**Controller:**

```csharp
public ActionResult Default()
{
    return View();
}
```

Once enabled, a microphone button appears in the Inline AI Assist prompt area. The recognized speech is converted into prompt text and is available through the `PromptRequest` event when the prompt is submitted.

---

## Configure Speech Recognition Language

Use the `Lang` property to set the language used by speech recognition. If it is not specified, the browser's default language is used.

| Value | Language |
|---|---|
| `en-US` | English (United States) |
| `es-ES` | Spanish (Spain) |
| `fr-FR` | French (France) |

---

## Configure Speech Button Settings

Use `ButtonSettings` to customize the microphone button. Configure the idle and recording states independently:

| Property | Purpose |
|---|---|
| `Content` | Text shown when idle (not recording) |
| `StopContent` | Text shown while recording |
| `IconCss` | Icon class for the idle state |
| `StopIconCss` | Icon class for the recording state |

---

## Enable Interim Results

Set `AllowInterimResults` to `true` to show partial transcription results while the user is speaking. This provides immediate feedback before the final transcript is added to the prompt.

**The following example enables speech-to-text and configures the language, button, and interim result settings:**

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.InteractiveChat

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

@{
    var buttonSettings = new
    {
        content = "Start Recording",
        stopContent = "Stop Recording",
        iconCss = "e-icons e-microphone",
        stopIconCss = "e-icons e-microphone-off"
    };
}

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>

    @Html.EJS().InlineAIAssist("speech-configuration").RelateTo("#summarizeBtn").Created("onCreated").PromptRequest("onPromptRequest").SpeechToTextSettings(new InlineAIAssistSpeechToTextSettings { Enable = true, Lang = "en-US", AllowInterimResults = true, ButtonSettings = buttonSettings }).ResponseSettings(new InlineAIAssistResponseSettings { ItemSelect = "onItemSelect" }).Render()
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

**Controller:**

```csharp
public ActionResult Default()
{
    return View();
}
```

---

## Configure Tooltip Settings

Use `TooltipSettings` to customize the tooltip text displayed for the microphone button in its idle and recording states.

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.InteractiveChat

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

@{ var tooltipSettings = new { content = "Click to start recording", stopContent = "Click to stop recording" }; }

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>

    @Html.EJS().InlineAIAssist("tooltipSettings").RelateTo("#summarizeBtn").ResponseMode("Inline").Created("onCreated").PromptRequest("onPromptRequest").SpeechToTextSettings(new InlineAIAssistSpeechToTextSettings { Enable = true, TooltipSettings = tooltipSettings }).ResponseSettings(new InlineAIAssistResponseSettings { ItemSelect = "onItemSelect" }).Render()
</div>

<script>
    var inlineAssist;
    var isAccepted = false;

    function onCreated() {
        inlineAssist = this;
    }

    function onPromptRequest(args) {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAssist.addResponse(defaultResponse, true);
        }, 1000);
    }

    function onItemSelect(args) {
        if (args.command.label === 'Accept') {
            isAccepted = true;
            var editable = document.getElementById('editableText');
            if (editable) {
                editable.innerHTML = '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
            }
            inlineAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
            isAccepted = false;
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

**Controller:**

```csharp
public ActionResult Default()
{
    return View();
}
```

---

## Speech-to-Text Events

Speech-to-text provides events that let you respond when recognition starts, stops, updates the transcript, or encounters an error. Use `OnStart`, `OnStop`, `TranscriptChanged`, and `OnError` to handle these states in your application.

| Event | Trigger |
|---|---|
| `OnStart` | Recognition started (user microphone active) |
| `OnStop` | Recognition stopped (user or automatic) |
| `TranscriptChanged` | Partial or final transcript update |
| `OnError` | Speech recognition error occurred |

> The recognized transcript is updated in the Inline AI Assist prompt area. When the prompt is submitted, both typed and speech-recognized input are available through the `Prompt` property of the `PromptRequest` event arguments.

**Full example — Listening to all four speech-to-text events with a live status panel:**

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.InteractiveChat

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
    .integration-speechtotext-section {
        width: 650px;
        margin: 0 auto;
    }
    .speech-info-panel {
        margin-bottom: 10px;
    }
    .speech-status {
        margin-bottom: 4px;
    }
    .transcript-display {
        min-height: 22px;
    }
    .error-text {
        color: #c62828;
    }
    .status-indicator {
        display: inline;
    }
    .transcript-display:empty::before {
        content: "Waiting for speech input...";
    }
</style>

<div class="integration-speechtotext-section">
    <div class="speech-info-panel">
        <div class="speech-status">
            <label>Recording Status:</label>
            <span id="recordingStatus" class="status-indicator ready">Ready to record</span>
        </div>
        <div class="transcript-section">
            <label>Live Transcript:</label>
            <div id="transcriptDisplay" class="transcript-display"></div>
        </div>
        <div class="error-section" id="errorMessage" style="display: none;">
            <span class="error-text"></span>
        </div>
    </div>
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>

    @Html.EJS().InlineAIAssist("speechEvents").RelateTo("#summarizeBtn").ResponseMode("Inline").Created("onCreated").PromptRequest("onPromptRequest").SpeechToTextOnStart("onSpeechStart").SpeechToTextOnStop("onSpeechStop").SpeechToTextTranscriptChanged("onTranscriptChanged").SpeechToTextOnError("onSpeechError").SpeechToTextSettings(new InlineAIAssistSpeechToTextSettings { Enable = true }).ResponseSettings(new InlineAIAssistResponseSettings { ItemSelect = "onItemSelect" }).Render()
</div>

<script>
    var inlineAssist;
    var isAccepted = false;
    var lastTranscript = '';

    function onCreated() {
        inlineAssist = this;
    }

    function onPromptRequest(args) {
        setTimeout(function () {
            var defaultResponse = 'For real-time prompt processing, connect the Inline AI Assist component to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            inlineAssist.addResponse(defaultResponse, true);
        }, 1000);
    }

    function onItemSelect(args) {
        if (args.command.label === 'Accept') {
            isAccepted = true;
            var editable = document.getElementById('editableText');
            if (editable) {
                editable.innerHTML = '<p>' + inlineAssist.prompts[inlineAssist.prompts.length - 1].response + '</p>';
            }
            inlineAssist.hidePopup();
        } else if (args.command.label === 'Discard') {
            isAccepted = false;
            inlineAssist.hidePopup();
        }
    }

    function onSummarizeClick() {
        if (inlineAssist) {
            inlineAssist.showPopup();
        }
    }

    function onSpeechStart() {
        var recordingStatus = document.getElementById('recordingStatus');
        if (recordingStatus) {
            recordingStatus.textContent = 'Recording...';
            recordingStatus.className = 'status-indicator recording';
        }
        var errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }

    function onSpeechStop() {
        var recordingStatus = document.getElementById('recordingStatus');
        if (recordingStatus) {
            recordingStatus.textContent = 'Ready to record';
            recordingStatus.className = 'status-indicator ready';
        }
        var transcriptDisplay = document.getElementById('transcriptDisplay');
        if (transcriptDisplay && lastTranscript) {
            transcriptDisplay.textContent = lastTranscript;
            transcriptDisplay.style.fontStyle = 'normal';
        }
        setTimeout(function () {
            lastTranscript = '';
            if (transcriptDisplay) {
                transcriptDisplay.textContent = 'Waiting for speech input...';
            }
        }, 2000);
    }

    function onTranscriptChanged(args) {
        var currentTranscript = (args && (args.text || args.value || args.transcript || (args.result && args.result.transcript))) || '';
        var isFinal = (args && (args.isFinal || args.final || (args.result && args.result.isFinal))) || false;
        if (currentTranscript) {
            lastTranscript = currentTranscript;
        }
        var transcriptDisplay = document.getElementById('transcriptDisplay');
        if (transcriptDisplay) {
            transcriptDisplay.textContent = currentTranscript;
            transcriptDisplay.style.fontStyle = isFinal ? 'normal' : 'italic';
        }
    }

    function onSpeechError(args) {
        var errorMessage = document.getElementById('errorMessage');
        if (errorMessage) {
            var errorText = errorMessage.querySelector('.error-text');
            if (errorText) {
                errorText.textContent = 'Error: ' + ((args && args.error) || 'Speech recognition error occurred');
            }
            errorMessage.style.display = 'block';
        }
        var recordingStatus = document.getElementById('recordingStatus');
        if (recordingStatus) {
            recordingStatus.textContent = 'Ready to record';
            recordingStatus.className = 'status-indicator ready';
        }
    }
</script>
```

**Controller:**

```csharp
public ActionResult Default()
{
    return View();
}
```

---

## Browser Compatibility

The `Speech-to-Text` feature relies on the [Speech Recognition API](https://ej2.syncfusion.com/aspnetmvc/documentation/speech-to-text/speech-recognition#browser-support), which has limited browser support.

- The browser may request permission to access the device microphone when speech recognition starts.
- Speech-to-text is available only when microphone permission is granted and the browser supports the Speech Recognition API.
- See the [browser support](https://ej2.syncfusion.com/aspnetmvc/documentation/speech-to-text/speech-recognition#browser-support) section for the current list of supported browsers.
