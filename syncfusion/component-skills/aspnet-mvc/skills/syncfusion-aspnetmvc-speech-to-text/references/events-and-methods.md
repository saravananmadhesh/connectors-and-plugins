# Events and Methods

## Table of Contents
- [Event Binding](#event-binding)
- [Event Handlers](#event-handlers)
- [Component Methods](#component-methods)
- [Multi-step Workflows](#multi-step-workflows)
- [Form Integration](#form-integration)
- [Error Handling](#error-handling)

## Event Binding

### Binding Events with HTML Helpers

The HTML Helper fluent API allows clean event binding:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnStart("onStartListening")
    .OnStop("onStopListening")
    .Created("onComponentCreated")
    .TranscriptChanged("onTranscriptChanged")
    .OnError("onRecognitionError")
    .Render()

<script>
    function onComponentCreated(args) {
        console.log("Component initialized");
    }
    
    function onStartListening(args) {
        console.log("Started listening");
    }
    
    function onStopListening(args) {
        console.log("Stopped listening");
    }
    
    function onTranscriptChanged(args) {
        console.log("Transcript:", args.transcript);
    }
    
    function onRecognitionError(args) {
        console.log("Error:", args.error);
    }
</script>
```

## Event Handlers

### OnStart Event

Triggered when speech recognition begins:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnStart("handleStart")
    .Render()

<div id="status"></div>

<script>
    function handleStart() {
        document.getElementById("status").innerHTML = 
            "<span style='color: green;'>🎤 Listening...</span>";
    }
</script>
```

### OnStop Event

Triggered when speech recognition ends:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnStop("handleStop")
    .Render()

<div id="status"></div>

<script>
    function handleStop() {
        document.getElementById("status").innerHTML = 
            "<span style='color: gray;'>⚫ Stopped</span>";
    }
</script>
```

### TranscriptChanged Event

Triggered when the transcript is updated:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .TranscriptChanged("onTranscript")
    .Render()

<textarea id="output" rows="4" cols="50"></textarea>

<script>
    function onTranscript(args) {
        var textarea = document.getElementById("output");
        textarea.value = args.transcript;
        
        // Check if final result
        if (args.isFinal) {
            console.log("Final transcript confirmed");
        }
    }
</script>
```

### OnError Event

Triggered when an error occurs:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnError("handleError")
    .Render()

<div id="error-display"></div>

<script>
    function handleError(args) {
        var errorMessages = {
            'NetworkError': 'Network connection failed',
            'NotAllowedError': 'Microphone access was denied',
            'NoSpeechError': 'No speech was detected',
            'AudioCaptureError': 'No microphone found'
        };
        
        var message = errorMessages[args.error] || args.error;
        document.getElementById("error-display").innerHTML = 
            '<div style="color: red; padding: 10px; background: #ffe6e6;">' + 
            'Error: ' + message + '</div>';
    }
</script>
```

### Created Event

Triggered after component initialization:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .Created("onComponentCreated")
    .Render()

<script>
    var voiceComponent;
    
    function onComponentCreated() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
        console.log("Component ready to use");
    }
</script>
```

## Component Methods

### Getting Component Reference

Access the component instance programmatically:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .Created("setupComponent")
    .Render()

<script>
    var voiceComponent;
    
    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }
</script>
```

### startListening() Method

Begin speech recognition:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .Created("setupComponent")
    .Render()

@Html.EJS().Button("start-btn")
    .Content("Start")
    .Click("startVoiceInput")
    .Render()

<script>
    var voiceComponent;
    
    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }
    
    function startVoiceInput() {
        voiceComponent.startListening();
    }
</script>
```

### stopListening() Method

End speech recognition:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .Created("setupComponent")
    .Render()

@Html.EJS().Button("stop-btn")
    .Content("Stop")
    .Click("stopVoiceInput")
    .Render()

<script>
    var voiceComponent;
    
    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }
    
    function stopVoiceInput() {
        voiceComponent.stopListening();
    }
</script>
```

### Reading Properties

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .Created("setupComponent")
    .TranscriptChanged("onTranscript")
    .Render()

@Html.EJS().Button("info-btn")
    .Content("Get Info")
    .Click("getComponentInfo")
    .Render()

<div id="info-display"></div>

<script>
    var voiceComponent;
    
    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }
    
    function getComponentInfo() {
        var info = '<div style="padding: 10px; border: 1px solid #ccc;">' +
            '<p><strong>Language:</strong> ' + voiceComponent.lang + '</p>' +
            '<p><strong>Locale:</strong> ' + voiceComponent.locale + '</p>' +
            '<p><strong>Listening State:</strong> ' + voiceComponent.listeningState + '</p>' +
            '<p><strong>Transcript:</strong> ' + voiceComponent.transcript + '</p>' +
            '</div>';
        
        document.getElementById("info-display").innerHTML = info;
    }
</script>
```

### Setting Properties

Modify component properties:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .Lang("en-US")
    .Created("setupComponent")
    .Render()

<label>Change Language:</label>
<select onchange="changeLanguage(this.value)">
    <option value="en-US">English</option>
    <option value="de-DE">German</option>
    <option value="fr-FR">French</option>
</select>

<script>
    var voiceComponent;
    
    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }
    
    function changeLanguage(language) {
        voiceComponent.lang = language;
        console.log("Language changed to: " + language);
    }
</script>
```

## Multi-step Workflows

### Simple Recording Workflow

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnStart("startRecording")
    .OnStop("endRecording")
    .TranscriptChanged("updateTranscript")
    .Created("setupComponent")
    .Render()

<div id="workflow-status" style="padding: 10px; marginTop: 20px;">
    <p id="status-text">Ready</p>
</div>

<textarea id="transcript-area" rows="4" cols="50"></textarea>

<script>
    var voiceComponent;
    var isRecording = false;
    
    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }
    
    function startRecording() {
        isRecording = true;
        document.getElementById("status-text").innerHTML = 
            "<strong style='color: red;'>🔴 Recording...</strong>";
    }
    
    function endRecording() {
        isRecording = false;
        document.getElementById("status-text").innerHTML = 
            "<strong style='color: green;'>✅ Recording completed</strong>";
    }
    
    function updateTranscript(args) {
        document.getElementById("transcript-area").value = args.transcript;
    }
</script>
```

### Multi-field Form Workflow

```razor
@using Syncfusion.EJ2

@using (Html.BeginForm("Submit", "Home", FormMethod.Post))
{
    <div>
        <h3>Contact Form - Voice Input</h3>
        
        <!-- Name field -->
        <div>
            <label>Name:</label>
            @Html.EJS().TextBox("name").Render()
            @Html.EJS().SpeechToText("voice-name")
                .TranscriptChanged("fillName")
                .Render()
        </div>
        
        <!-- Message field -->
        <div>
            <label>Message:</label>
            @Html.EJS().TextArea("message").Rows(4).Render()
            @Html.EJS().SpeechToText("voice-message")
                .TranscriptChanged("fillMessage")
                .Render()
        </div>
        
        <!-- Submit -->
        @Html.EJS().Button("submit-btn")
            .Content("Submit")
            .Type("submit")
            .Render()
    </div>
}

<script>
    function fillName(args) {
        if (args.isFinal) {
            document.getElementById("name").value = args.transcript;
        }
    }
    
    function fillMessage(args) {
        document.getElementById("message").value += args.transcript + " ";
    }
</script>
```

### Continuous Recording Session

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnStart("sessionStart")
    .OnStop("sessionStop")
    .TranscriptChanged("sessionUpdate")
    .OnError("sessionError")
    .Created("setupSession")
    .Render()

@Html.EJS().Button("new-segment-btn")
    .Content("New Segment")
    .Click("addNewSegment")
    .Render()

@Html.EJS().Button("save-session-btn")
    .Content("Save Session")
    .Click("saveSession")
    .Render()

<div id="session-log" style="border: 1px solid #ccc; padding: 10px; minHeight: 100px;"></div>

<script>
    var voiceComponent;
    var sessionSegments = [];
    var currentSegment = "";
    
    function setupSession() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }
    
    function sessionStart() {
        currentSegment = "";
        console.log("Session recording started");
    }
    
    function sessionStop() {
        if (currentSegment.trim()) {
            sessionSegments.push(currentSegment);
            displaySession();
        }
    }
    
    function sessionUpdate(args) {
        currentSegment = args.transcript;
    }
    
    function sessionError(args) {
        console.error("Session error: " + args.error);
    }
    
    function addNewSegment() {
        if (currentSegment.trim()) {
            sessionSegments.push(currentSegment);
            currentSegment = "";
            displaySession();
        }
    }
    
    function displaySession() {
        var html = sessionSegments.map((seg, index) =>
            '<div style="margin: 5px 0;">' +
            '<strong>Segment ' + (index + 1) + ':</strong> ' + seg +
            '</div>'
        ).join('');
        document.getElementById("session-log").innerHTML = html;
    }
    
    function saveSession() {
        fetch('/api/save-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ segments: sessionSegments })
        }).then(r => r.json())
          .then(data => alert("Session saved: " + data.id));
    }
</script>
```

## Form Integration

### Form Submission with Voice Input

```razor
@using Syncfusion.EJ2

@using (Html.BeginForm("ProcessForm", "Home", FormMethod.Post))
{
    <div>
        <label>Your Message (speak or type):</label>
        @Html.TextArea("message", new { rows = 4, cols = 50 })
        
        @Html.EJS().SpeechToText("voice-message")
            .TranscriptChanged("addToMessage")
            .OnError("handleVoiceError")
            .Render()
    </div>
    
    <div id="error-container"></div>
    
    @Html.EJS().Button("submit-form")
        .Content("Submit")
        .Type("submit")
        .Click("validateForm")
        .Render()
}

<script>
    function addToMessage(args) {
        if (args.isFinal) {
            var textarea = document.getElementById("message");
            if (textarea.value) {
                textarea.value += " ";
            }
            textarea.value += args.transcript;
        }
    }
    
    function handleVoiceError(args) {
        document.getElementById("error-container").innerHTML =
            '<div style="color: red; padding: 10px;">Voice input error: ' + args.error + '</div>';
    }
    
    function validateForm() {
        var message = document.getElementById("message").value.trim();
        if (!message) {
            alert("Please enter a message");
            return false;
        }
    }
</script>
```

## Error Handling

### Comprehensive Error Handler

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnError("handleAllErrors")
    .Render()

<div id="error-display"></div>

<script>
    const errorMessages = {
        'NetworkError': 'Internet connection required',
        'NotAllowedError': 'Microphone access denied - check browser settings',
        'NoSpeechError': 'No speech detected. Please try again.',
        'AudioCaptureError': 'No microphone found - check device settings',
        'ServiceNotAllowedError': 'Speech service not available in your region',
        'BadGrammar': 'Grammar format error',
        'Aborted': 'Speech recognition was cancelled'
    };
    
    function handleAllErrors(args) {
        var errorDiv = document.getElementById("error-display");
        var message = errorMessages[args.error] || args.error;
        
        errorDiv.innerHTML = 
            '<div style="padding: 10px; backgroundColor: #ffe6e6; color: #c00; borderRadius: 4px;">' +
            '<strong>Error:</strong> ' + message + '</div>';
        
        // Auto-clear after 5 seconds
        setTimeout(() => {
            errorDiv.innerHTML = '';
        }, 5000);
    }
</script>
```

### Retry Logic on Error

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnError("handleErrorWithRetry")
    .Created("setupComponent")
    .Render()

<div id="error-container"></div>

<script>
    var voiceComponent;
    var retryCount = 0;
    var maxRetries = 3;
    
    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }
    
    function handleErrorWithRetry(args) {
        retryCount++;
        
        var errorContainer = document.getElementById("error-container");
        
        if (retryCount < maxRetries) {
            errorContainer.innerHTML =
                '<div style="color: #ff6600;">Error: ' + args.error + 
                '. Retrying... (Attempt ' + retryCount + ' of ' + maxRetries + ')</div>';
            
            // Retry after 1 second
            setTimeout(() => {
                voiceComponent.startListening();
            }, 1000);
        } else {
            errorContainer.innerHTML =
                '<div style="color: red;">Error: ' + args.error + 
                '. Max retries reached. Please refresh and try again.</div>';
            retryCount = 0;
        }
    }
</script>
```

### Error Recovery

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .OnError("handleErrorAndRecover")
    .Created("setupComponent")
    .Render()

@Html.EJS().Button("retry-btn")
    .Content("Retry")
    .Click("retryListening")
    .Render()

<div id="recovery-status"></div>

<script>
    var voiceComponent;
    
    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }
    
    function handleErrorAndRecover(args) {
        document.getElementById("recovery-status").innerHTML =
            '<div style="color: red; padding: 10px;">' +
            'Error occurred: ' + args.error +
            '<br/>Click "Retry" button to try again.' +
            '</div>';
    }
    
    function retryListening() {
        document.getElementById("recovery-status").innerHTML =
            '<div style="color: blue; padding: 10px;">Retrying...</div>';
        
        voiceComponent.startListening();
    }
</script>
```

