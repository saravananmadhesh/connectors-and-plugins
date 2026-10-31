# Speech Recognition Features

## Table of Contents
- [Core Functionality](#core-functionality)
- [Language Detection](#language-detection)
- [Real-time Transcription](#real-time-transcription)
- [Interim Results](#interim-results)
- [Listening State](#listening-state)
- [Continuous Recognition](#continuous-recognition)
- [Advanced Features](#advanced-features)

## Core Functionality

### Starting Listening

The most basic operation is starting the speech recognition:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnStart("onStart")
    .Render()

<script>
    function onStart() {
        console.log("Started listening for voice input");
    }
</script>
```

### Programmatic Control

Control the component programmatically using the HTML helper:

```razor
@using Syncfusion.EJ2

<!-- Speech To Text Control -->
@Html.EJS().SpeechToText("voice-control")
    .Created("onComponentCreated")
    .Render()

<!-- Control buttons -->
@Html.EJS().Button("start-btn")
    .Content("Start")
    .Click("startListening")
    .Render()

@Html.EJS().Button("stop-btn")
    .Content("Stop")
    .Click("stopListening")
    .Render()

<script>
    var voiceComponent;
    
    function onComponentCreated() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice-control"),
            "speechtotext"
        );
    }
    
    function startListening() {
        voiceComponent.startListening();
    }
    
    function stopListening() {
        voiceComponent.stopListening();
    }
</script>
```

### Getting Transcript

Access the recognized transcript:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .Created("setupComponent")
    .Render()

@Html.EJS().Button("get-text")
    .Content("Get Transcript")
    .Click("getTranscript")
    .Render()

<div id="result"></div>

<script>
    var voiceComponent;
    
    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }
    
    function getTranscript() {
        var text = voiceComponent.transcript;
        document.getElementById("result").innerHTML = 
            "<strong>Recognized Text:</strong> " + text;
    }
</script>
```

## Language Detection

### Setting Language

Specify the language for speech recognition:

```razor
@using Syncfusion.EJ2

<!-- English -->
@Html.EJS().SpeechToText("voice-en")
    .Lang("en-US")
    .Render()

<!-- German -->
@Html.EJS().SpeechToText("voice-de")
    .Lang("de-DE")
    .Render()

<!-- French -->
@Html.EJS().SpeechToText("voice-fr")
    .Lang("fr-FR")
    .Render()

<!-- Spanish -->
@Html.EJS().SpeechToText("voice-es")
    .Lang("es-ES")
    .Render()
```

### Common Language Codes

| Language | Code |
|----------|------|
| English (US) | `en-US` |
| English (UK) | `en-GB` |
| German | `de-DE` |
| French | `fr-FR` |
| Spanish | `es-ES` |
| Italian | `it-IT` |
| Portuguese (Brazil) | `pt-BR` |
| Chinese (Mandarin) | `zh-CN` |
| Japanese | `ja-JP` |
| Korean | `ko-KR` |

### Dynamic Language Switching

```razor
@using Syncfusion.EJ2

<div>
    <label>Select Language:</label>
    <select onchange="changeLanguage(this.value)">
        <option value="en-US">English (US)</option>
        <option value="de-DE">Deutsch</option>
        <option value="fr-FR">Français</option>
        <option value="es-ES">Español</option>
    </select>
</div>

@Html.EJS().SpeechToText("voice")
    .Lang("en-US")
    .Render()

<script>
    var voiceComponent;
    
    function changeLanguage(language) {
        var voice = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
        voice.lang = language;
    }
</script>
```

### Server-side Language Selection from Culture

```csharp
// In Controller
public ActionResult VoiceInput()
{
    var userCulture = System.Globalization.CultureInfo.CurrentUICulture.Name;
    ViewBag.UserLanguage = userCulture; // e.g., "de-DE"
    return View();
}
```

```razor
<!-- In View -->
@Html.EJS().SpeechToText("voice")
    .Lang("@ViewBag.UserLanguage")
    .Render()
```

## Real-time Transcription

### Handling Transcript Changes

React to transcript updates in real-time:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .TranscriptChanged("onTranscriptUpdated")
    .Render()

<div id="live-transcript" style="padding: 10px; border: 1px solid #ccc; minHeight: 50px;">
    <em>Your words will appear here...</em>
</div>

<script>
    function onTranscriptUpdated(args) {
        var transcriptDiv = document.getElementById("live-transcript");
        transcriptDiv.innerHTML = "<strong>You said:</strong> " + args.transcript;
        
        if (args.isFinal) {
            transcriptDiv.innerHTML += " <span style='color: green;'>(Confirmed)</span>";
        }
    }
</script>
```

### Processing Text in Real-time

Perform actions as the user speaks:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .TranscriptChanged("processTranscript")
    .Render()

<div id="word-count">Words: 0</div>
<div id="character-count">Characters: 0</div>

<script>
    function processTranscript(args) {
        var text = args.transcript;
        
        // Count words
        var words = text.trim().split(/\s+/).length;
        document.getElementById("word-count").innerHTML = "Words: " + words;
        
        // Count characters
        document.getElementById("character-count").innerHTML = 
            "Characters: " + text.length;
    }
</script>
```

### Appending to Existing Text

```razor
@using Syncfusion.EJ2

@Html.EJS().TextArea("input")
    .Rows(4)
    .Placeholder("Click microphone to add text...")
    .Render()

@Html.EJS().SpeechToText("voice")
    .TranscriptChanged("appendTranscript")
    .Render()

<script>
    function appendTranscript(args) {
        var textarea = document.getElementById("input");
        
        if (args.isFinal) {
            // Add space before appending
            if (textarea.value) {
                textarea.value += " ";
            }
            textarea.value += args.transcript;
        }
    }
</script>
```

## Interim Results

### Showing Interim Results

Display results while the user is still speaking:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .AllowInterimResults("true")
    .TranscriptChanged("handleResults")
    .Render()

<div style="padding: 10px; border: 1px solid #ddd;">
    <div id="interim" style="color: #999; fontStyle: italic;">
        <em>Interim results will appear here...</em>
    </div>
    <div id="final" style="color: #000; fontWeight: bold;">
        <em>Final results will appear here...</em>
    </div>
</div>

<script>
    function handleResults(args) {
        if (args.isFinal) {
            // Final result
            document.getElementById("final").innerHTML = args.transcript;
            document.getElementById("interim").innerHTML = "";
        } else {
            // Interim result
            document.getElementById("interim").innerHTML = 
                "interim: " + args.transcript;
        }
    }
</script>
```

### Storing Results

Save both interim and final results:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .AllowInterimResults("true")
    .TranscriptChanged("storeResults")
    .Render()

<div>
    <h3>Results Log:</h3>
    <ul id="results-log" style="listStyle: none; padding: 0;"></ul>
</div>

<script>
    var resultsList = [];
    
    function storeResults(args) {
        var timestamp = new Date().toLocaleTimeString();
        var log = {
            timestamp: timestamp,
            text: args.transcript,
            isFinal: args.isFinal
        };
        
        resultsList.push(log);
        
        // Update UI
        var logList = document.getElementById("results-log");
        logList.innerHTML = resultsList.map(item => 
            '<li>[' + item.timestamp + '] ' + 
            (item.isFinal ? '<strong>' : '<em>') +
            item.text +
            (item.isFinal ? '</strong>' : '</em>') +
            '</li>'
        ).join('');
    }
</script>
```

## Listening State

### The SpeechToTextState Enum

The `listeningState` property returns a value from the `SpeechToTextState` enum, not a boolean. There are three possible values:

| Enum Value | Description |
|---|---|
| `Inactive` | The component is idle — recognition has not been started, or it has fully completed. |
| `Listening` | The component is actively capturing audio and converting speech to text. |
| `Stopped` | Recognition was explicitly stopped (via `stopListening()` or the button) but the component has not yet returned to idle. |

### Detecting Listening State

Check the current state by comparing `listeningState` against the enum string values:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnStart("onListeningStart")
    .OnStop("onListeningStop")
    .Created("setupComponent")
    .Render()

@Html.EJS().Button("status-btn")
    .Content("Check Status")
    .Click("checkStatus")
    .Render()

<div id="status-display"></div>

<script>
    var voiceComponent;

    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }

    function onListeningStart() {
        updateStatus("🔴 Listening...");
    }

    function onListeningStop() {
        updateStatus("⚫ Not listening");
    }

    function checkStatus() {
        var state = voiceComponent.listeningState;

        // Compare against the three SpeechToTextState enum string values
        if (state === "Listening") {
            updateStatus("State: Listening — microphone is active");
        } else if (state === "Stopped") {
            updateStatus("State: Stopped — recognition ended, returning to idle");
        } else {
            updateStatus("State: Inactive — component is idle");
        }
    }

    function updateStatus(message) {
        document.getElementById("status-display").innerHTML = message;
    }
</script>
```

### Visual Feedback During Listening

```razor
@using Syncfusion.EJ2

<div id="mic-indicator" style="display: none; textAlign: center;">
    <div style="fontSize: 30px; animation: pulse 1s infinite;">🎤</div>
    <p>Listening...</p>
</div>

@Html.EJS().SpeechToText("voice")
    .OnStart("showIndicator")
    .OnStop("hideIndicator")
    .Render()

<script>
    function showIndicator() {
        document.getElementById("mic-indicator").style.display = "block";
    }
    
    function hideIndicator() {
        document.getElementById("mic-indicator").style.display = "none";
    }
</script>

<style>
    @@keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
</style>
```

## Continuous Recognition

### Automatic Restart on Stop

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnStop("autoRestart")
    .Render()

<script>
    function autoRestart() {
        var voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
        
        // Auto-restart listening after 1 second
        setTimeout(() => {
            voiceComponent.startListening();
        }, 1000);
    }
</script>
```

### Continuous Transcription Collection

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .TranscriptChanged("collectTranscript")
    .OnStop("saveTranscript")
    .Render()

@Html.EJS().Button("save-btn")
    .Content("Save Transcript")
    .Click("submitTranscript")
    .Render()

<textarea id="full-transcript" rows="5" cols="50"></textarea>

<script>
    var fullText = "";
    var pendingText = "";
    
    function collectTranscript(args) {
        if (args.isFinal) {
            // Add to permanent transcript
            if (fullText) fullText += " ";
            fullText += args.transcript;
            pendingText = "";
            updateDisplay();
        } else {
            pendingText = args.transcript;
            updateDisplay();
        }
    }
    
    function updateDisplay() {
        var display = fullText;
        if (pendingText) {
            display += " <em style='color: #999;'>" + pendingText + "</em>";
        }
        document.getElementById("full-transcript").value = 
            fullText + (pendingText ? " " + pendingText : "");
    }
    
    function saveTranscript() {
        var textarea = document.getElementById("full-transcript");
        textarea.value = fullText;
    }
    
    function submitTranscript() {
        fetch('/api/transcript', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: fullText })
        });
    }
</script>
```

## Advanced Features

### htmlAttributes

Use `HtmlAttributes` to inject arbitrary HTML attributes onto the root element of the component. This is the correct way to add `aria-*` labels, `data-*` attributes, or any other standard HTML attribute for accessibility or integration purposes:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .HtmlAttributes(new Dictionary<string, string>
    {
        { "aria-label", "Voice input button — click to start speaking" },
        { "data-testid", "voice-input" },
        { "role", "button" }
    })
    .ButtonSettings(bs => bs
        .Content("Start Recording")
        .StopContent("Stop Recording")
    )
    .Render()
```

### Speech Duration Tracking

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnStart("startTimer")
    .OnStop("stopTimer")
    .Render()

<div id="duration">Duration: 0s</div>

<script>
    var startTime;
    var timerInterval;
    
    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(updateDuration, 100);
    }
    
    function stopTimer() {
        clearInterval(timerInterval);
    }
    
    function updateDuration() {
        var elapsed = Math.floor((Date.now() - startTime) / 1000);
        document.getElementById("duration").innerHTML = 
            "Duration: " + elapsed + "s";
    }
</script>
```

### Confidence Score Tracking

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .TranscriptChanged("trackConfidence")
    .Render()

<div id="confidence-display"></div>

<script>
    function trackConfidence(args) {
        // Note: Confidence scores depend on browser implementation
        var display = document.getElementById("confidence-display");
        display.innerHTML = "<strong>Transcript:</strong> " + args.transcript + 
            "<br><strong>Final:</strong> " + (args.isFinal ? "Yes" : "No");
    }
</script>
```

### Multiple Recognition Sessions

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice1")
    .TranscriptChanged("handleSession1")
    .Render()

@Html.EJS().SpeechToText("voice2")
    .TranscriptChanged("handleSession2")
    .Render()

<div id="session1-text">Session 1: </div>
<div id="session2-text">Session 2: </div>

<script>
    function handleSession1(args) {
        document.getElementById("session1-text").innerHTML = 
            "Session 1: " + args.transcript;
    }
    
    function handleSession2(args) {
        document.getElementById("session2-text").innerHTML = 
            "Session 2: " + args.transcript;
    }
</script>
```

