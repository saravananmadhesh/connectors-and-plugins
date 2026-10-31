# Events and Methods

## Table of Contents
- [Event Binding in Razor](#event-binding-in-razor)
- [Event Handlers](#event-handlers)
- [Event Arguments](#event-arguments)
  - [TranscriptChangedEventArgs](#transcriptchangedeventargs)
  - [StartListeningEventArgs](#startlisteningeventargs)
  - [StopListeningEventArgs](#stoplisteningeventargs)
  - [ErrorEventArgs](#erroreventargs)
- [Error Types](#error-types)
- [Methods](#methods)
- [Programmatic Control](#programmatic-control)
- [Event Workflows](#event-workflows)

## Event Binding in Razor

Events are bound to Razor tag helpers using attribute syntax:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech"
    created="onCreated"
    onStart="onStartListening"
    onStop="onStopListening"
    onError="onError"
    transcriptChanged="onTranscriptChanged">
</ejs-speechtotext>

<script>
    function onCreated() {
        console.log("Control initialized");
    }
    
    function onStartListening(args) {
        console.log("Listening started");
    }
    
    function onStopListening(args) {
        console.log("Listening stopped");
    }
    
    function onError(args) {
        console.error("Error:", args.error);
    }
    
    function onTranscriptChanged(args) {
        console.log("Transcript:", args.transcript);
    }
</script>
```

## Event Handlers

### Available Events

| Event | Fires | Args |
|-------|-------|------|
| `created` | After initialization | - |
| `onStart` | When listening begins | StartListeningEventArgs |
| `onStop` | When listening ends | StopListeningEventArgs |
| `onError` | When error occurs | ErrorEventArgs |
| `transcriptChanged` | During recognition | TranscriptChangedEventArgs |

### Basic Event Handling

```razor
@using Syncfusion.EJ2.Inputs

<div style="padding: 20px;">
    <ejs-speechtotext id="event-demo"
        onStart="handleStart"
        onStop="handleStop"
        onError="handleError"
        transcriptChanged="handleTranscript">
    </ejs-speechtotext>
    
    <div id="event-log" style="
        marginTop: 20px;
        padding: 10px;
        backgroundColor: #f5f5f5;
        borderRadius: 4px;
        minHeight: 100px;
        fontFamily: monospace;">
    </div>
</div>

<script>
    function log(message) {
        var logDiv = document.getElementById("event-log");
        logDiv.innerHTML += message + "<br/>";
        logDiv.scrollTop = logDiv.scrollHeight;
    }
    
    function handleStart(args) {
        log("✓ [onStart] Listening started");
    }
    
    function handleStop(args) {
        log("✓ [onStop] Listening stopped");
    }
    
    function handleError(args) {
        log("✗ [onError] Error: " + args.error);
    }
    
    function handleTranscript(args) {
        log("📝 [transcriptChanged] " + args.transcript);
    }
</script>
```

## Event Arguments

### TranscriptChangedEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `transcript` | `string` | The transcribed text captured from the speech input. |
| `isInterimResult` | `boolean` | Whether the recognized result is interim (`true`) or final (`false`). Determined by the `allowInterimResults` setting. |
| `event` | `Event` | The native browser event associated with the transcript update. |
| `name` | `string` | Name of the event (`"transcriptChanged"`). |

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text"
    transcriptChanged="onTranscriptChanged">
</ejs-speechtotext>

<ejs-textarea id="output-textarea" rows="5"></ejs-textarea>

<script>
    function onTranscriptChanged(args) {
        // args.transcript: string - The transcribed text
        // args.isInterimResult: boolean - true = interim result, false = final result
        // args.event: Event - The native browser event
        // args.name: string - Event name ("transcriptChanged")

        var textarea = ej.base.getComponent(
            document.getElementById("output-textarea"),
            "textarea"
        );
        textarea.value = args.transcript;

        if (args.isInterimResult) {
            console.log("[Interim]", args.transcript);
        } else {
            console.log("[Final]", args.transcript);
        }
    }
</script>
```

### StartListeningEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` inside the handler to prevent listening from starting. |
| `isInteracted` | `boolean` | Whether the event was triggered by user interaction (`true`) or programmatically (`false`). |
| `listeningState` | `SpeechToTextState` | The current state of the component when listening starts. |
| `event` | `Event` | The native browser event associated with the start action. |
| `name` | `string` | Name of the event (`"onStart"`). |

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text"
    onStart="onStartListening">
</ejs-speechtotext>

<div id="status-display"></div>

<script>
    function onStartListening(args) {
        // args.cancel: boolean - Set true to prevent listening from starting
        // args.isInteracted: boolean - true if triggered by user, false if programmatic
        // args.listeningState: SpeechToTextState - Current state (e.g., "Listening")
        // args.event: Event - The native browser event
        // args.name: string - Event name ("onStart")

        if (!args.isInteracted) {
            // Triggered programmatically — optionally cancel
            // args.cancel = true;
        }

        document.getElementById("status-display").textContent =
            "State: " + args.listeningState;
    }
</script>
```

### StopListeningEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `isInteracted` | `boolean` | Whether the event was triggered by user interaction (`true`) or programmatically (`false`). |
| `listeningState` | `SpeechToTextState` | The current state of the component when listening stops. |
| `event` | `Event` | The native browser event associated with the stop action. |
| `name` | `string` | Name of the event (`"onStop"`). |

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text"
    onStop="onStopListening">
</ejs-speechtotext>

<div id="stop-status"></div>

<script>
    function onStopListening(args) {
        // args.isInteracted: boolean - true if stopped by user, false if programmatic
        // args.listeningState: SpeechToTextState - Current state (e.g., "Stopped")
        // args.event: Event - The native browser event
        // args.name: string - Event name ("onStop")

        var source = args.isInteracted ? "User" : "Programmatic";
        document.getElementById("stop-status").textContent =
            "Stopped (" + source + "). State: " + args.listeningState;
    }
</script>
```

### ErrorEventArgs

| Property | Type | Description |
|----------|------|-------------|
| `error` | `string` | Error code string (e.g., `'no-speech'`, `'not-allowed'`, `'network'`). |
| `errorMessage` | `string` | Human-readable message providing further details about the error. |
| `event` | `Event` | The native browser event associated with the error. |
| `name` | `string` | Name of the event (`"onError"`). |

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text"
    onError="onSpeechError">
</ejs-speechtotext>

<div id="error-display" style="display: none; color: #c62828;"></div>

<script>
    function onSpeechError(args) {
        // args.error: string - Error code (e.g., 'no-speech', 'not-allowed')
        // args.errorMessage: string - Detailed error message
        // args.event: Event - The native browser error event
        // args.name: string - Event name ("onError")

        var errorDiv = document.getElementById("error-display");
        errorDiv.style.display = "block";
        errorDiv.textContent = args.errorMessage || args.error;

        console.error("Error code:", args.error);
        console.error("Error message:", args.errorMessage);
    }
</script>
```

## Error Types

Common error codes that can occur:

| Error | Meaning | Handling |
|-------|---------|----------|
| `no-speech` | No speech detected | Remind user to speak |
| `audio-capture` | Microphone unavailable | Check hardware |
| `network` | Network error | Check internet |
| `not-allowed` | Permission denied | Allow microphone access |
| `service-not-allowed` | Service blocked | Check browser settings |
| `bad-grammar` | Grammar error | N/A (browser API) |
| `aborted` | Recognition aborted | User or system interrupted |

### Error Handling Pattern

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="error-handler" onError="handleError"></ejs-speechtotext>

<div id="error-message" style="display: none; 
    padding: 10px; 
    backgroundColor: #ffebee; 
    borderLeft: 4px solid #f44336;
    color: #c62828;
    borderRadius: 4px;">
</div>

<script>
    function handleError(args) {
        var errorMessages = {
            'no-speech': '🔇 No speech detected. Please try again.',
            'audio-capture': '🎙️ Microphone not found. Check your device.',
            'network': '🌐 Network error. Check your connection.',
            'not-allowed': '🔒 Microphone permission denied. Allow access.',
            'service-not-allowed': '⛔ Service not allowed.',
            'aborted': '⏹️ Speech recognition interrupted.'
        };
        
        var message = errorMessages[args.error] || 'Error: ' + args.error;
        var errorDiv = document.getElementById("error-message");
        errorDiv.textContent = message;
        errorDiv.style.display = "block";
        
        // Auto-clear after 5 seconds
        setTimeout(function() {
            errorDiv.style.display = "none";
        }, 5000);
    }
</script>
```

## Methods

### startListening() Method

Programmatically start speech recognition:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-control"></ejs-speechtotext>
<button onclick="startRecording()">Start Recording</button>

<script>
    function startRecording() {
        var speechComponent = ej.base.getComponent(
            document.getElementById("speech-control"), 
            "speechtotext"
        );
        speechComponent.startListening();
    }
</script>
```

### stopListening() Method

Programmatically stop speech recognition:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-control"></ejs-speechtotext>
<button onclick="stopRecording()">Stop Recording</button>

<script>
    function stopRecording() {
        var speechComponent = ej.base.getComponent(
            document.getElementById("speech-control"), 
            "speechtotext"
        );
        speechComponent.stopListening();
    }
</script>
```

## Programmatic Control

Full programmatic control example:

```razor
@using Syncfusion.EJ2.Inputs

<div style="padding: 20px;">
    <ejs-speechtotext id="voice-recorder"
        onStart="onStart"
        onStop="onStop"
        transcriptChanged="onTranscript">
    </ejs-speechtotext>
    
    <div style="marginTop: 20px;">
        <button onclick="toggleRecording()" style="padding: 10px 20px;">
            <span id="button-text">Start Recording</span>
        </button>
        <button onclick="clearTranscript()" style="padding: 10px 20px; marginLeft: 10px;">
            Clear
        </button>
    </div>
    
    <ejs-textarea id="transcript-area" rows="5" style="marginTop: 20px;"></ejs-textarea>
</div>

<script>
    var isRecording = false;
    
    function toggleRecording() {
        var speechComponent = ej.base.getComponent(
            document.getElementById("voice-recorder"), 
            "speechtotext"
        );
        
        if (isRecording) {
            speechComponent.stopListening();
        } else {
            speechComponent.startListening();
        }
    }
    
    function clearTranscript() {
        var textarea = ej.base.getComponent(
            document.getElementById("transcript-area"), 
            "textarea"
        );
        textarea.value = '';
    }
    
    function onStart() {
        isRecording = true;
        document.getElementById("button-text").textContent = "Stop Recording";
    }
    
    function onStop() {
        isRecording = false;
        document.getElementById("button-text").textContent = "Start Recording";
    }
    
    function onTranscript(args) {
        var textarea = ej.base.getComponent(
            document.getElementById("transcript-area"), 
            "textarea"
        );
        textarea.value = args.transcript;
    }
</script>
```

## Event Workflows

### Workflow 1: Simple Recording

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="simple-speech"
    onStart="() => console.log('Recording started')"
    onStop="() => console.log('Recording stopped')"
    transcriptChanged="(args) => console.log('Text:', args.transcript)">
</ejs-speechtotext>
```

Sequence:
1. User clicks button → `onStart` fires
2. User speaks → `transcriptChanged` fires repeatedly
3. User stops → `onStop` fires

### Workflow 2: Form Submission with Voice

```razor
@using Syncfusion.EJ2.Inputs

<form id="voice-form" onsubmit="return submitForm(event)">
    <div class="form-group">
        <label>Name (voice):</label>
        <ejs-speechtotext id="name-voice" 
            transcriptChanged="(args) => setField('name', args.transcript)">
        </ejs-speechtotext>
        <input type="text" id="name" name="name" style="marginTop: 5px;" />
    </div>
    
    <div class="form-group">
        <label>Message (voice):</label>
        <ejs-speechtotext id="message-voice"
            transcriptChanged="(args) => setField('message', args.transcript)">
        </ejs-speechtotext>
        <textarea id="message" name="message" rows="4" style="marginTop: 5px;"></textarea>
    </div>
    
    <button type="submit">Submit</button>
</form>

<script>
    function setField(fieldName, value) {
        document.getElementById(fieldName).value = value;
    }
    
    function submitForm(event) {
        event.preventDefault();
        
        var name = document.getElementById("name").value;
        var message = document.getElementById("message").value;
        
        console.log("Submitting:", { name, message });
        // Submit via AJAX or traditional form
        
        return false;
    }
</script>
```

### Workflow 3: Multi-Step Voice Input

```razor
@using Syncfusion.EJ2.Inputs

<div style="padding: 20px;">
    <h3>Step <span id="step-number">1</span> of 3</h3>
    
    <div id="step-1">
        <p>Say your name:</p>
        <ejs-speechtotext id="speech-1" 
            onStop="moveToStep2">
        </ejs-speechtotext>
        <input type="text" id="name" readonly />
    </div>
    
    <div id="step-2" style="display: none;">
        <p>Say your email:</p>
        <ejs-speechtotext id="speech-2"
            onStop="moveToStep3">
        </ejs-speechtotext>
        <input type="text" id="email" readonly />
    </div>
    
    <div id="step-3" style="display: none;">
        <p>Say your message:</p>
        <ejs-speechtotext id="speech-3"
            onStop="submitForm">
        </ejs-speechtotext>
        <textarea id="message" readonly rows="4"></textarea>
    </div>
</div>

<script>
    var currentStep = 1;
    
    function moveToStep2() {
        var text = getTranscript("speech-1");
        document.getElementById("name").value = text;
        showStep(2);
    }
    
    function moveToStep3() {
        var text = getTranscript("speech-2");
        document.getElementById("email").value = text;
        showStep(3);
    }
    
    function submitForm() {
        var text = getTranscript("speech-3");
        document.getElementById("message").value = text;
        console.log("Form complete");
    }
    
    function getTranscript(id) {
        var component = ej.base.getComponent(
            document.getElementById(id), 
            "speechtotext"
        );
        return component.transcript;
    }
    
    function showStep(step) {
        document.getElementById("step-" + currentStep).style.display = "none";
        document.getElementById("step-" + step).style.display = "block";
        document.getElementById("step-number").textContent = step;
        currentStep = step;
    }
</script>
```

## Troubleshooting

### Event not firing
- Check event handler function name is correct
- Verify function is defined in global scope
- Check browser console for JavaScript errors

### Getting component reference error
- Ensure component is created before accessing via ej.base.getComponent()
- Check component ID matches exactly
- Verify using "speechtotext" as the component type

### Event args undefined
- Check event handler has proper parameter (args)
- Verify correct event argument type being accessed

