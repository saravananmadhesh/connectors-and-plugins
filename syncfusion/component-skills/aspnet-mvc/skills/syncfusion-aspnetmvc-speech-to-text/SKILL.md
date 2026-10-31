---
name: syncfusion-aspnetmvc-speech-to-text
description: Implement Syncfusion Speech To Text control in ASP.NET MVC applications using HTML Helpers. ALWAYS use this skill when the user needs ASP.NET MVC speech recognition, voice input, Web Speech API integration, speech-to-text transcription, or help with the Speech To Text control (@Html.EJS().SpeechToText()). Covers installation, HTML helper setup, speech recognition, customization, events, error handling, and accessibility patterns specific to ASP.NET MVC.
license: "SEE LICENSE IN license"
metadata:
  author: "Syncfusion"
  category: "Inputs"
  platform: "ASP.NET MVC"
  component: "SpeechToText"
version: "34.1.29"
---

# Speech To Text Control - ASP.NET MVC

A comprehensive guide for implementing the Syncfusion Speech To Text control in ASP.NET MVC applications using HTML Helpers. This control leverages the Web Speech API to convert spoken words into text with full customization and event handling capabilities.

## When to Use This Skill

Use this skill when the user needs to:

- **Implement Speech To Text** in ASP.NET MVC applications
- **Set up Web Speech API** integration using HTML Helpers
- **Capture voice input** and convert to text programmatically
- **Customize button and tooltip** appearance using helper methods
- **Handle speech recognition events** (start, stop, error, result)
- **Add multi-language support** with localization
- **Troubleshoot microphone permissions** and browser compatibility
- **Ensure accessibility** with screen reader support

**Trigger Keywords:** ASP.NET MVC speech to text, voice input, Web Speech API MVC, speech recognition, @Html.EJS().SpeechToText(), microphone input

## Component Overview

The Speech To Text control provides:

- **Voice Input Capture** - Browser microphone integration via Web Speech API
- **Real-time Transcription** - Live transcript updates during speaking
- **Customizable Button** - Content, icons, and tooltip settings
- **Event Binding** - Start, stop, error, and transcript change handlers
- **Error Handling** - Network, permission, and browser compatibility errors
- **Localization Support** - Multi-language and RTL support
- **Accessibility** - WCAG 2.1 compliant with ARIA labels
- **Browser Compatibility** - Chrome, Edge, Safari, and Firefox support

## Key Features

### Web Speech API Integration
```
┌─────────────────────────────────────────┐
│  User Speaks to Microphone              │
└────────────────┬────────────────────────┘
                 │
                 ▼
        ┌─────────────────────┐
        │  Web Speech API      │
        │  Speech Recognition  │
        └────────┬────────────┘
                 │
                 ▼
    ┌────────────────────────────┐
    │  Real-time Transcript      │
    │  Updated in Component      │
    └────────────────────────────┘
```

## Architecture for ASP.NET MVC

### HTML Helper Pattern

```razor
@Html.EJS().SpeechToText("id")
    .Locale("locale")
    .Lang("language-code")
    .ButtonSettings(bs => bs
        .Content("Start Recording")
        .IconCss("e-icons e-microphone")
    )
    .TooltipSettings(ts => ts
        .Position(Syncfusion.EJ2.Popups.TooltipPosition.TopCenter)
        .Content("Click to start voice input")
    )
    .Render()
```

### Controller Integration Pattern

```csharp
public class HomeController : Controller
{
    [HttpPost]
    public ActionResult ProcessVoiceInput(string transcript)
    {
        // Process the voice transcript
        var result = ProcessText(transcript);
        return Json(new { success = true, data = result });
    }
}
```

## Navigation

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installing NuGet package
- Registering Syncfusion in Web.config
- HTML helper setup with @Html.EJS()
- License configuration
- CDN references
- First component example

### Speech Recognition Features
📄 **Read:** [references/speech-recognition-features.md](references/speech-recognition-features.md)
- Starting and stopping speech recognition
- Real-time transcript handling
- Language detection and switching
- Interim results and confidence scores
- Microphone activation

### Button and Tooltip Customization
📄 **Read:** [references/button-and-tooltip-customization.md](references/button-and-tooltip-customization.md)
- ButtonSettings with HTML helper fluent API
- Custom button content and icons
- Tooltip positioning and styling
- Responsive button layout
- Icon customization

### Events and Methods
📄 **Read:** [references/events-and-methods.md](references/events-and-methods.md)
- Binding events via HTML helpers
- OnStart, OnStop event handlers
- OnError event handling
- TranscriptChanged event
- Programmatic component access
- Method calls and workflows

### Globalization and Localization
📄 **Read:** [references/globalization-and-localization.md](references/globalization-and-localization.md)
- Multi-language support via L10n.load()
- Language switching patterns
- RTL (Right-to-Left) implementation
- Accessibility labels for screen readers
- Regional culture support

### Troubleshooting and Security
📄 **Read:** [references/troubleshooting-and-security.md](references/troubleshooting-and-security.md)
- Common setup issues
- Browser compatibility checking
- Microphone permission handling
- HTTPS requirements
- Security best practices
- Input sanitization
- Error logging patterns

## Quick Start Example

### 1. Create View with Speech To Text

```razor
@using Syncfusion.EJ2

@{
    ViewBag.Title = "Speech To Text Demo";
}

<h2>Voice Input Form</h2>

<div style="padding: 20px;">
    <!-- Speech To Text Control -->
    @Html.EJS().SpeechToText("voiceInput")
        .ButtonSettings(bs => bs
            .Content("Start Recording")
            .IconCss("e-icons e-microphone")
        )
        .TranscriptChanged("onTranscriptChanged")
        .OnError("onError")
        .Render()
    
    <!-- Display transcribed text -->
    <div style="marginTop: 20px;">
        <label>Transcript:</label>
        <textarea id="transcript" rows="4" cols="50" readonly></textarea>
    </div>
</div>

<script>
    function onTranscriptChanged(args) {
        document.getElementById("transcript").value = args.transcript;
    }
    
    function onError(args) {
        alert("Error: " + args.error);
    }
</script>
```

### 2. Controller Setup

```csharp
public class HomeController : Controller
{
    public ActionResult Index()
    {
        return View();
    }
}
```

### 3. Register in Web.config

```xml
<!-- In Views/Web.config -->
<configuration>
    <appSettings>
        <add key="SyncfusionLicense" value="YOUR_LICENSE_KEY" />
    </appSettings>
</configuration>
```

## Common Use Cases

### Use Case 1: Form with Voice Input

```razor
@using Syncfusion.EJ2

@using (Html.BeginForm("SubmitForm", "Home", FormMethod.Post))
{
    <h3>Contact Form - Voice Input Support</h3>
    
    <!-- Name field -->
    <div>
        <label>Name (Voice or Text):</label>
        @Html.EJS().TextBox("name")
            .Placeholder("Enter or speak your name")
            .Render()
        
        @Html.EJS().SpeechToText("nameVoice")
            .ButtonSettings(bs => bs.Content("🎤 Name"))
            .Render()
    </div>
    
    <!-- Message field -->
    <div>
        <label>Message (Voice Input):</label>
        @Html.EJS().TextArea("message")
            .Rows(4)
            .Render()
        
        @Html.EJS().SpeechToText("messageVoice")
            .ButtonSettings(bs => bs.Content("🎤 Message"))
            .TranscriptChanged("appendToMessage")
            .Render()
    </div>
    
    <!-- Submit button -->
    @Html.EJS().Button("submit")
        .Content("Submit")
        .Type("submit")
        .Render()
}

<script>
    function appendToMessage(args) {
        var textarea = document.getElementById("message");
        textarea.value += args.transcript + " ";
    }
</script>
```

### Use Case 2: Real-time Search

```razor
@using Syncfusion.EJ2

<div>
    <h3>Voice Search</h3>
    
    <!-- Speech input -->
    @Html.EJS().SpeechToText("voiceSearch")
        .ButtonSettings(bs => bs
            .Content("Search by Voice")
            .IconCss("e-icons e-search")
        )
        .TranscriptChanged("performSearch")
        .Render()
    
    <!-- Search results -->
    <div id="results" style="marginTop: 20px;"></div>
</div>

<script>
    function performSearch(args) {
        fetch('/api/search?q=' + args.transcript)
            .then(r => r.json())
            .then(data => {
                document.getElementById("results").innerHTML = 
                    data.map(item => '<p>' + item.name + '</p>').join('');
            });
    }
</script>
```

### Use Case 3: Accessibility-Focused Form

```razor
@using Syncfusion.EJ2

<div role="form" aria-label="Accessible Voice Input Form">
    <h2>Accessible Form</h2>
    
    <!-- Voice input with accessibility -->
    @Html.EJS().SpeechToText("accessibleVoice")
        .ButtonSettings(bs => bs
            .Content("Activate Voice Input")
            .CssClass("sr-only-label")
        )
        .Created("setAccessibilityLabels")
        .Render()
    
    <!-- Live region for screen readers -->
    <div aria-live="polite" id="voiceStatus" role="status"></div>
</div>

<script>
    function setAccessibilityLabels() {
        var component = ej.base.getComponent(
            document.getElementById("accessibleVoice"),
            "speechtotext"
        );
        
        // Update ARIA labels
        component.startAriaLabel = "Activate voice input. Press to start recording your message.";
        component.stopAriaLabel = "Deactivate voice input. Press to stop recording.";
    }
</script>
```

## API Reference Summary

### HTML Helper Methods

| Method | Type | Description |
|--------|------|-------------|
| `.SpeechToText(id)` | Primary | Initialize Speech To Text control |
| `.Locale(locale)` | Property | Set UI language (e.g., "en", "de", "fr") |
| `.Lang(language)` | Property | Set speech recognition language |
| `.ButtonSettings(bs => bs...)` | Fluent | Customize button appearance |
| `.TooltipSettings(ts => ts...)` | Fluent | Customize tooltip |
| `.TranscriptChanged(handler)` | Event | Handle transcript change |
| `.OnError(handler)` | Event | Handle errors |
| `.OnStart(handler)` | Event | Handle start listening |
| `.OnStop(handler)` | Event | Handle stop listening |

### Component Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `lang` | string | `"en-US"` | Speech recognition language |
| `locale` | string | `"en"` | UI language |
| `allowInterimResults` | boolean | `true` | Show interim results while speaking |
| `listeningState` | boolean | `false` | Current listening state |
| `transcript` | string | `""` | Current transcript |
| `continuousMode` | boolean | `false` | Continuous recognition mode |

### Component Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `startListening()` | void | Start speech recognition |
| `stopListening()` | void | Stop speech recognition |
| `abort()` | void | Cancel current recognition |

### Component Events

| Event | Args | Description |
|-------|------|-------------|
| `onStart` | - | Fired when recognition starts |
| `onStop` | - | Fired when recognition stops |
| `onError` | `{ error }` | Fired on error |
| `transcriptChanged` | `{ transcript, isFinal }` | Fired when transcript updates |
| `created` | - | Fired after component creation |

## Best Practices

1. **Always check browser support** before initializing
2. **Request microphone permission** explicitly
3. **Handle errors gracefully** with user-friendly messages
4. **Sanitize voice input** before processing
5. **Provide visual feedback** during recording
6. **Test with accessibility tools** (screen readers)
7. **Support multiple languages** with locale switching
8. **Implement fallback UI** for unsupported browsers

## Browser Support Matrix

| Browser | Web Speech API | Status |
|---------|---|---|
| Chrome 25+ | ✅ | Full support |
| Edge 12+ | ✅ | Full support |
| Safari 14.1+ | ✅ | Full support |
| Firefox 25+ | ⚠️ | Limited (requires flag) |
| Opera 27+ | ✅ | Full support |
| IE 11 | ❌ | Not supported |

## Common Patterns

### Pattern: Language Detection

```razor
@Html.EJS().SpeechToText("voiceInput")
    .Lang("@(Request.UserLanguages?.FirstOrDefault() ?? "en-US")")
    .Render()
```

### Pattern: Loading State

```razor
@Html.EJS().SpeechToText("voice")
    .OnStart("showLoading")
    .OnStop("hideLoading")
    .Render()

<script>
    function showLoading() {
        document.getElementById("loading").style.display = 'block';
    }
    function hideLoading() {
        document.getElementById("loading").style.display = 'none';
    }
</script>
```

### Pattern: Copy to Clipboard

```razor
@Html.EJS().SpeechToText("voice")
    .Created("addCopyButton")
    .Render()

<script>
    function addCopyButton() {
        var btn = document.createElement('button');
        btn.textContent = 'Copy Transcript';
        btn.onclick = () => {
            var component = ej.base.getComponent(
                document.getElementById("voice"),
                "speechtotext"
            );
            navigator.clipboard.writeText(component.transcript);
        };
        document.body.appendChild(btn);
    }
</script>
```

## Next Steps

1. **Choose your use case** from Common Use Cases above
2. **Read the relevant reference** from Navigation section
3. **Copy a code example** and adapt to your needs
4. **Test with multiple browsers** for compatibility
5. **Check troubleshooting guide** if issues occur

## Support Resources

- [Complete API Documentation](https://www.syncfusion.com/documentation/aspnetmvc-html-helpers/speech-to-text/overview)
- [Syncfusion Support](https://www.syncfusion.com/support)
- [Community Forums](https://www.syncfusion.com/forums)
- [Web Speech API Reference](https://www.w3.org/TR/speech-api/)

