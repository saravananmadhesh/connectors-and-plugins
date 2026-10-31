# Speech Recognition Features

## Table of Contents
- [Retrieving Transcripts](#retrieving-transcripts)
- [Setting Language](#setting-language)
- [Allowing Interim Results](#allowing-interim-results)
- [Managing Listening State](#managing-listening-state)
- [Disabling the Control](#disabling-the-control)
- [Adding HTML Attributes](#adding-html-attributes)
- [Real-Time Speech Processing](#real-time-speech-processing)
- [Multi-Language Support](#multi-language-support)

## Retrieving Transcripts

The transcript property and transcriptChanged event allow you to access the text generated from spoken input.

### Basic Transcript Retrieval

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text" 
    transcriptChanged="onTranscriptChanged">
</ejs-speechtotext>

<ejs-textarea id="output-textarea" rows="5"></ejs-textarea>

<script>
    function onTranscriptChanged(args) {
        var textareaObj = ej.base.getComponent(
            document.getElementById("output-textarea"), 
            "textarea"
        );
        textareaObj.value = args.transcript;
    }
</script>
```

### Accessing Transcript via Component Reference

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text"></ejs-speechtotext>

<button onclick="getTranscript()">Get Current Transcript</button>

<script>
    function getTranscript() {
        var speechComponent = ej.base.getComponent(
            document.getElementById("speech-to-text"), 
            "speechtotext"
        );
        var currentTranscript = speechComponent.transcript;
        console.log('Transcript:', currentTranscript);
        alert('Transcript: ' + currentTranscript);
    }
</script>
```

### Pre-filling with Initial Transcript

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text" 
    transcript="Hello, this is a pre-filled transcript.">
</ejs-speechtotext>
```

## Setting Language

The `lang` attribute specifies the language for speech recognition.

### Common Language Codes

- `en-US` - English (US)
- `en-GB` - English (UK)
- `fr-FR` - French
- `de-DE` - German
- `es-ES` - Spanish
- `it-IT` - Italian
- `ja-JP` - Japanese
- `zh-CN` - Chinese (Simplified)
- `pt-BR` - Portuguese (Brazil)

### Setting a Specific Language

```razor
@using Syncfusion.EJ2.Inputs

<h3>French Speech Recognition</h3>
<ejs-speechtotext id="speech-fr" 
    lang="fr-FR"
    transcriptChanged="onTranscriptChanged">
</ejs-speechtotext>

<ejs-textarea id="output-fr" rows="5"></ejs-textarea>

<script>
    function onTranscriptChanged(args) {
        var textarea = ej.base.getComponent(
            document.getElementById("output-fr"), 
            "textarea"
        );
        textarea.value = args.transcript;
    }
</script>
```

### Language Selector

```razor
@using Syncfusion.EJ2.Inputs

<div>
    <label>Select Language:</label>
    <ejs-dropdownlist id="language-selector" 
        dataSource="ViewBag.Languages"
        fields="@(new {text = "text", value = "value"})"
        change="onLanguageChange">
    </ejs-dropdownlist>
</div>

<ejs-speechtotext id="speech-to-text" 
    lang="en-US"
    transcriptChanged="onTranscriptChanged">
</ejs-speechtotext>

<ejs-textarea id="output-textarea" rows="5"></ejs-textarea>

<script>
    function onLanguageChange(e) {
        var speechComponent = ej.base.getComponent(
            document.getElementById("speech-to-text"), 
            "speechtotext"
        );
        speechComponent.lang = e.value;
    }

    function onTranscriptChanged(args) {
        var textarea = ej.base.getComponent(
            document.getElementById("output-textarea"), 
            "textarea"
        );
        textarea.value = args.transcript;
    }
</script>
```

### Populate Language Dropdown in Controller

```csharp
public class IndexModel : PageModel
{
    public void OnGet()
    {
        ViewBag.Languages = new List<object>
        {
            new { text = "English (US)", value = "en-US" },
            new { text = "English (UK)", value = "en-GB" },
            new { text = "French", value = "fr-FR" },
            new { text = "Spanish", value = "es-ES" },
            new { text = "German", value = "de-DE" },
            new { text = "Japanese", value = "ja-JP" }
        };
    }
}
```

## Allowing Interim Results

The `allowInterimResults` attribute controls whether results update in real-time or wait for completion.

### Real-Time Results (Default)

```razor
@using Syncfusion.EJ2.Inputs

<h3>Real-Time Transcription</h3>
<p>Text updates as you speak:</p>

<ejs-speechtotext id="speech-interim" 
    allowInterimResults="true"
    transcriptChanged="onTranscriptChanged">
</ejs-speechtotext>

<ejs-textarea id="interim-textarea" rows="5"></ejs-textarea>

<script>
    function onTranscriptChanged(args) {
        var textarea = ej.base.getComponent(
            document.getElementById("interim-textarea"), 
            "textarea"
        );
        textarea.value = args.transcript;
    }
</script>
```

### Final Results Only

```razor
@using Syncfusion.EJ2.Inputs

<h3>Final Results Only</h3>
<p>Text updates after you stop speaking:</p>

<ejs-speechtotext id="speech-final" 
    allowInterimResults="false"
    transcriptChanged="onTranscriptChanged">
</ejs-speechtotext>

<ejs-textarea id="final-textarea" rows="5"></ejs-textarea>

<script>
    function onTranscriptChanged(args) {
        var textarea = ej.base.getComponent(
            document.getElementById("final-textarea"), 
            "textarea"
        );
        textarea.value = args.transcript;
    }
</script>
```

## Managing Listening State

The `listeningState` property indicates the current status.

### Listening States

| State | Description |
|-------|-------------|
| **Inactive** | Not listening, idle state |
| **Listening** | Actively capturing audio |
| **Stopped** | Recognition ended |

### Monitor Listening State

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text" 
    onStart="handleStart"
    onStop="handleStop">
</ejs-speechtotext>

<div id="status-indicator" style="
    padding: 10px; 
    margin: 10px 0;
    backgroundColor: #e8f5e9;
    borderRadius: 4px;">
    Status: Inactive
</div>

<script>
    function handleStart() {
        var indicator = document.getElementById("status-indicator");
        indicator.textContent = "Status: Listening 🎤";
        indicator.style.backgroundColor = "#ffeb3b";
    }

    function handleStop() {
        var indicator = document.getElementById("status-indicator");
        indicator.textContent = "Status: Stopped ⏹️";
        indicator.style.backgroundColor = "#e8f5e9";
    }
</script>
```

## Disabling the Control

The `disabled` attribute prevents all user interaction with the SpeechToText control. When `true`, the button cannot be clicked and listening cannot be initiated. This is useful for disabling voice input during form processing, async operations, or restricted states.

### Rendering as Disabled

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-disabled" disabled="true"></ejs-speechtotext>
```

### Enabling by Default (Explicit)

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-enabled" disabled="false"></ejs-speechtotext>
```

### Toggling Disabled State Programmatically

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text"
    transcriptChanged="onTranscriptChanged">
</ejs-speechtotext>

<button onclick="submitForm()">Submit</button>

<script>
    function submitForm() {
        var speechComponent = ej.base.getComponent(
            document.getElementById("speech-to-text"),
            "speechtotext"
        );

        // Disable voice input during submission
        speechComponent.disabled = true;

        // Simulate async form submission
        setTimeout(function () {
            speechComponent.disabled = false;
        }, 3000);
    }

    function onTranscriptChanged(args) {
        console.log("Transcript:", args.transcript);
    }
</script>
```

## Adding HTML Attributes

The `htmlAttributes` property allows custom HTML attributes to be added to the root element of the SpeechToText button. This is useful for accessibility (ARIA labels), test automation (`data-testid`), or any other custom attributes that the standard tag helper attributes do not expose.

### Basic Usage

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text"
    htmlAttributes="@(new Dictionary<string, string> {
        { "aria-label", "Voice input button" }
    })">
</ejs-speechtotext>
```

### Accessibility with ARIA Labels

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-accessible"
    htmlAttributes="@(new Dictionary<string, string> {
        { "aria-label", "Start or stop voice input" },
        { "aria-describedby", "voice-hint" }
    })">
</ejs-speechtotext>

<span id="voice-hint" class="visually-hidden">
    Press the button and speak. Your words will be transcribed automatically.
</span>
```

### Test Automation Attributes

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-test"
    htmlAttributes="@(new Dictionary<string, string> {
        { "data-testid", "speech-to-text-btn" },
        { "data-cy", "voice-input" }
    })">
</ejs-speechtotext>
```

### Combined Attributes

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-combined"
    htmlAttributes="@(new Dictionary<string, string> {
        { "aria-label", "Voice input" },
        { "data-testid", "speech-btn" },
        { "title", "Click to speak" }
    })">
</ejs-speechtotext>
```

## Real-Time Speech Processing

Process transcribed text in real-time as the user speaks:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text" 
    transcriptChanged="onTranscriptChanged">
</ejs-speechtotext>

<div style="margin-top: 20px;">
    <p>Transcript: <span id="transcript-display"></span></p>
    <p>Words: <span id="word-count">0</span></p>
    <p>Letters: <span id="letter-count">0</span></p>
</div>

<script>
    function onTranscriptChanged(args) {
        var text = args.transcript;
        
        // Display transcript
        document.getElementById("transcript-display").textContent = text;
        
        // Count words
        var words = text.trim().split(/\s+/).filter(w => w.length > 0);
        document.getElementById("word-count").textContent = words.length;
        
        // Count letters
        var letters = text.replace(/\s/g, '').length;
        document.getElementById("letter-count").textContent = letters;
    }
</script>
```

## Multi-Language Support

Implement multi-language voice input:

```razor
@using Syncfusion.EJ2.Inputs

<div style="maxWidth: 600px; margin: 0 auto; padding: 20px;">
    <h2>Multi-Language Voice Input</h2>
    
    <div style="marginBottom: 20px;">
        <label>Select Language:</label>
        <ejs-dropdownlist id="language-selector"
            dataSource="ViewBag.Languages"
            fields="@(new { text = "text", value = "value" })"
            change="onLanguageChange"
            value="en-US">
        </ejs-dropdownlist>
    </div>
    
    <div id="status" style="marginBottom: 20px; color: #666;">
        Ready to listen...
    </div>
    
    <ejs-speechtotext id="speech-multi" 
        lang="en-US"
        onStart="onStart"
        onStop="onStop"
        transcriptChanged="onTranscriptChanged">
    </ejs-speechtotext>
    
    <p style="marginTop: 20px;">Transcribed Text:</p>
    <ejs-textarea id="output-textarea" 
        rows="5"
        placeholder="Your speech will appear here...">
    </ejs-textarea>
</div>

<script>
    function onLanguageChange(e) {
        var speechComponent = ej.base.getComponent(
            document.getElementById("speech-multi"), 
            "speechtotext"
        );
        speechComponent.lang = e.value;
    }

    function onStart() {
        document.getElementById("status").textContent = "🎤 Listening...";
        document.getElementById("status").style.color = "#f57c00";
    }

    function onStop() {
        document.getElementById("status").textContent = "⏹️ Stopped listening";
        document.getElementById("status").style.color = "#666";
    }

    function onTranscriptChanged(args) {
        var textarea = ej.base.getComponent(
            document.getElementById("output-textarea"), 
            "textarea"
        );
        textarea.value = args.transcript;
    }
</script>
```

## Common Patterns

### Pattern: Clear Transcript Button

```razor
<ejs-speechtotext id="speech" transcriptChanged="onTranscript"></ejs-speechtotext>
<button onclick="clearTranscript()">Clear</button>

<script>
    function clearTranscript() {
        var speech = ej.base.getComponent(
            document.getElementById("speech"), 
            "speechtotext"
        );
        speech.transcript = '';
    }
</script>
```

### Pattern: Save Transcript to Hidden Field

```razor
<ejs-speechtotext id="speech" transcriptChanged="saveTranscript"></ejs-speechtotext>
<input type="hidden" id="transcript-value" name="TranscriptValue" />

<script>
    function saveTranscript(args) {
        document.getElementById("transcript-value").value = args.transcript;
    }
</script>
```

### Pattern: Disable Input During Listening

```razor
<ejs-speechtotext id="speech" 
    onStart="disableInput"
    onStop="enableInput">
</ejs-speechtotext>

<ejs-textbox id="input-field"></ejs-textbox>

<script>
    function disableInput() {
        var textbox = ej.base.getComponent(
            document.getElementById("input-field"), 
            "textbox"
        );
        textbox.readonly = true;
    }

    function enableInput() {
        var textbox = ej.base.getComponent(
            document.getElementById("input-field"), 
            "textbox"
        );
        textbox.readonly = false;
    }
</script>
```

## Troubleshooting

### No transcript appearing
- Check microphone is working
- Verify `allowInterimResults` setting
- Ensure microphone permissions granted
- Check browser console for errors

### Wrong language recognized
- Verify `lang` property has correct format
- Test with your microphone and audio
- Try different accent or speech pace

### Language dropdown not working
- Ensure ViewBag.Languages is populated in controller
- Check dropdown change event is firing
- Verify speechtotext component ID is correct

