# Speech-to-Text in Inline AI Assist

## Table of Contents
- [Prerequisites](#prerequisites)
- [Enable Built-in Speech-to-Text](#enable-built-in-speech-to-text)
- [Configure Speech Recognition Language](#configure-speech-recognition-language)
- [Configure Speech Button Settings](#configure-speech-button-settings)
- [Enable Interim Results](#enable-interim-results)
- [Configure Tooltip Settings](#configure-tooltip-settings)
- [Speech-to-Text Events](#speech-to-text-events)
- [Browser Compatibility](#browser-compatibility)

The Syncfusion ASP.NET Core Inline AI Assist control integrates `Speech-to-Text` functionality through the browser's [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). This enables the conversion of spoken words into text using the device's microphone, allowing users to provide voice input directly in the Inline AI Assist prompt area.

When content is selected, the recognized speech can be used as a prompt along with the selected content to provide contextual AI assistance. The generated response is displayed inline, where users can review and either accept or discard the suggestion.

## Prerequisites

Before integrating `Speech-to-Text`, ensure the following:

1. The Syncfusion Inline AI Assist control is properly set up in your ASP.NET Core application.
    - [ASP.NET Core Getting Started Guide](../getting-started)

2. The Inline AI Assist control is integrated with [Azure OpenAI](https://azure.microsoft.com/en-us/products/ai-foundry/models/openai).
    - [Integration of Azure OpenAI With ASP.NET Core Inline AI Assist control](../ai-integrations/openai-integration)

## Enable Built-in Speech-to-Text

You can enable speech-to-text support using the [speechToTextSettings](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.InteractiveChat.InlineAIAssist.html#Syncfusion_EJ2_InteractiveChat_InlineAIAssist_SpeechToTextSettings) property. Set the `Enable` property to `true` within the `speechToTextSettings` configuration to activate this feature.

Once enabled, a microphone button appears in the Inline AI Assist prompt area. The recognized speech is converted into prompt text and passed through the `PromptRequest` event when the prompt is submitted.

**Tag Helper:** `<e-inlineaiassist-speechtotextsettings>`

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

    <ejs-inlineaiassist id="stt" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
        <e-inlineaiassist-speechtotextsettings enable="true"></e-inlineaiassist-speechtotextsettings>
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
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

```csharp
public ActionResult Default()
{
    return View();
}
```

## Configure Speech Recognition Language

The `Lang` property allows you to set the language code for speech recognition. By default, it uses the browser's language settings, but you can specify a custom language code (e.g., `'en-US'`, `'es-ES'`, `'fr-FR'`, etc.). This ensures that the speech recognition engine recognizes and transcribes speech in the specified language accurately.

## Configure Speech Button Settings

The `ButtonSettings` property lets you customize the microphone button's appearance and text content by configuring the `Content` (text displayed when idle), `StopContent` (text displayed while recording), `IconCss` (icon shown when idle), and `StopIconCss` (icon shown while recording). This allows you to tailor the UI to match your application's design and provide clear visual feedback while speech recognition is active.

## Enable Interim Results

The `AllowInterimResults` property enables real-time transcription results while the user is still speaking. When set to `true`, the speech recognition engine returns interim transcripts (partial results) as it processes the audio. This provides immediate feedback to users, allowing them to see their speech being recognized in real-time before the final transcript is generated.

This example demonstrates how to set up the Inline AI Assist with all these speech recognition features enabled:

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

    <ejs-inlineaiassist id="speech-configuration" relateTo="#summarizeBtn" created="onCreated" promptRequest="onPromptRequest">
        <e-inlineaiassist-speechtotextsettings enable="true" lang="en-US" allowInterimResults="true" buttonSettings="buttonSettings">></e-inlineaiassist-speechtotextsettings>
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
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

```csharp
public ActionResult Default()
{
    return View();
}
```

## Configure Tooltip Settings

You can customize the tooltips for the microphone button using the `TooltipSettings` property. The tooltip can provide different information based on whether speech recognition is idle or active.

```razor
@using Syncfusion.EJ2.InteractiveChat;

@{
    var tooltipSettings = new
    {
        content = "Click to start recording",
        stopContent = "Click to stop recording",
        position = "TopCenter"
    };
}

<div class="container" style="height: 350px; width: 650px;">
    <button id="summarizeBtn" class="e-btn e-primary" style="margin-bottom: 10px;" onclick="onSummarizeClick()">Content Summarize</button>
    <div id="editableText" contenteditable="true">
        <p>Inline AI Assist component provides intelligent text processing capabilities that enhance user productivity. It leverages advanced natural language processing to understand context and deliver precise suggestions. Users can seamlessly integrate AI-powered features into their applications.</p>
        <p>With real-time response streaming and customizable prompts, developers can create interactive experiences. The component supports multiple response modes including inline editing and popup-based interactions.</p>
    </div>

    <ejs-inlineaiassist id="tooltipSettings" relateTo="#summarizeBtn" responseMode="Inline" created="onCreated" promptRequest="onPromptRequest">
        <e-inlineaiassist-speechtotextsettings enable="true" tooltipSettings="tooltipSettings"></e-inlineaiassist-speechtotextsettings>
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
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
```

```csharp
public ActionResult Default()
{
    return View();
}
```

## Speech-to-Text Events

The speech-to-text functionality provides events like `OnStart` (when recognition starts), `OnStop` (when it stops), `TranscriptChanged` (when the transcript is updated), and `OnError` (when errors occur). The recognized transcript is updated in the Inline AI Assist prompt area. When the prompt is submitted, both typed and speech-recognized input are available through the `Prompt` property of the `PromptRequest` event arguments.

| Event | Description |
|-------|-------------|
| `speechToTextOnStart` | Fired when speech recognition starts. |
| `speechToTextOnStop` | Fired when speech recognition stops. |
| `speechToTextTranscriptChanged` | Fired when the transcript is updated (interim and final). |
| `speechToTextOnError` | Fired when an error occurs during speech recognition. |

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

    <ejs-inlineaiassist id="speechEvents" relateTo="#summarizeBtn" responseMode="Inline" created="onCreated" promptRequest="onPromptRequest" speechToTextOnStart="onSpeechStart" speechToTextOnStop="onSpeechStop" speechToTextTranscriptChanged="onTranscriptChanged" speechToTextOnError="onSpeechError">
        <e-inlineaiassist-speechtotextsettings enable="true"></e-inlineaiassist-speechtotextsettings>
        <e-inlineaiassist-responsesettings itemSelect="onItemSelect"></e-inlineaiassist-responsesettings>
    </ejs-inlineaiassist>
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

```csharp
public ActionResult Default()
{
    return View();
}
```

## Browser Compatibility

The speech-to-text functionality in Inline AI Assist relies on the browser's [Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition), which has limited browser support. Refer to the [Browser Compatibility](https://ej2.syncfusion.com/aspnetcore/documentation/speech-to-text/speech-recognition#browser-support) section for detailed information.

The browser may request permission to access the device's microphone when speech recognition starts. Speech-to-text functionality is available only when microphone permission is granted and the browser supports the Speech Recognition API.
