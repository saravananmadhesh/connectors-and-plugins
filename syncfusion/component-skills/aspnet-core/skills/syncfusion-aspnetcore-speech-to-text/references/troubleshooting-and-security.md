# Troubleshooting and Security

## Table of Contents
- [Common Issues](#common-issues)
- [CDN and Script Loading](#cdn-and-script-loading)
- [Browser Compatibility](#browser-compatibility)
- [Microphone Permissions](#microphone-permissions)
- [Security Best Practices](#security-best-practices)
- [Error Handling](#error-handling)

## Common Issues

### Issue: Component not initializing

**Symptom:** SpeechToText control not appearing or throwing errors.

**Solutions:**

1. Verify tag helpers are registered in `_ViewImports.cshtml`:
```razor
@addTagHelper *, Syncfusion.EJ2
```

2. Check NuGet package is installed:
```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

3. Ensure license is registered in `Program.cs`:
```csharp
// Program.cs
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);
SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
```

4. Verify `<ejs-scripts>` tag is present:
```razor
<!-- In _Layout.cshtml -->
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
<ejs-scripts></ejs-scripts>
```

### Issue: "Web Speech API not supported" error

**Symptom:** Error message: "Browser not supported..."

**Solutions:**

1. Add browser detection:
```razor
@using Syncfusion.EJ2.Inputs

<div id="speech-container">
    @if (ViewBag.SpeechSupported == true)
    {
        <ejs-speechtotext id="speech"></ejs-speechtotext>
    }
    else
    {
        <div class="alert alert-warning">
            Web Speech API is not supported in your browser.
            Please use Chrome, Edge, or Safari.
        </div>
    }
</div>

@section Scripts {
    <script>
        // Check API support
        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!window.SpeechRecognition) {
            // Disable feature
            document.getElementById("speech-container").innerHTML = 
                '<div class="alert alert-danger">Web Speech API not available</div>';
        }
    </script>
}
```

2. In Controller:
```csharp
public IActionResult Index()
{
    ViewBag.SpeechSupported = true; // Browser supports it
    return View();
}
```

## CDN and Script Loading

### Issue: CSS not loading (404 errors)

**Symptom:** Control appears unstyled, console shows 404 errors.

**Solutions:**

1. Verify CDN URL in `_Layout.cshtml`:
```razor
<!-- Ensure correct order -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2.min.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

2. Use correct version endpoint:
```razor
<!-- Specific version -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.1.36/ej2.min.css" />
<script src="https://cdn.syncfusion.com/ej2/23.1.36/ej2.min.js"></script>
```

3. Use local NuGet assets as fallback:
```razor
@using Syncfusion.EJ2

<!-- Primary: CDN -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2.min.css" />
<!-- Fallback: Local -->
<link rel="stylesheet" href="~/lib/syncfusion/ej2/ej2.min.css" />

<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
<script src="~/lib/syncfusion/ej2/ej2.min.js"></script>
```

### Issue: Scripts loading in wrong order

**Symptom:** "ej is undefined" error in console.

**Solutions:**

1. Verify `<ejs-scripts>` placement in `_Layout.cshtml`:
```razor
<!DOCTYPE html>
<html>
<head>
    <!-- CSS should be here -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2.min.css" />
</head>
<body>
    @RenderBody()
    
    <!-- Scripts at end of body -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
    <ejs-scripts></ejs-scripts>
</body>
</html>
```

2. Wrap initialization in document ready:
```razor
<ejs-speechtotext id="speech"></ejs-speechtotext>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var component = ej.base.getComponent(
            document.getElementById("speech"),
            "speechtotext"
        );
        // Component ready to use
    });
</script>
```

## Browser Compatibility

### Supported Browsers

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 25+ | ✅ Full Support |
| Edge | 12+ | ✅ Full Support |
| Firefox | 25+ | ⚠️ Limited (requires flag) |
| Safari | 14.1+ | ✅ Full Support |
| Opera | 27+ | ✅ Full Support |
| IE | 11 | ❌ Not Supported |

### Browser Detection

```razor
@using Syncfusion.EJ2.Inputs

@{
    string userAgent = Request.Headers["User-Agent"];
}

@if (!userAgent.Contains("Edge") && !userAgent.Contains("Chrome") && !userAgent.Contains("Safari"))
{
    <div class="alert alert-warning">
        Your browser has limited support for voice input. 
        Please use Chrome, Edge, or Safari for best results.
    </div>
}

<ejs-speechtotext id="speech"></ejs-speechtotext>
```

## Microphone Permissions

### Requesting Permission

The browser automatically requests microphone permission on first use:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech" 
    onStart="handleStart"
    onError="handleError">
</ejs-speechtotext>

<script>
    function handleStart() {
        console.log("Microphone access requested");
    }
    
    function handleError(args) {
        if (args.error === "NotAllowedError") {
            alert("Microphone access was denied. Please enable it in browser settings.");
        }
    }
</script>
```

### Checking Permission Status

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech" created="onComponentCreated"></ejs-speechtotext>

<div id="permission-status"></div>

<script>
    async function onComponentCreated() {
        try {
            const result = await navigator.permissions.query({ name: 'microphone' });
            const statusDiv = document.getElementById("permission-status");
            
            if (result.state === 'granted') {
                statusDiv.innerHTML = '<span class="badge bg-success">Microphone Access: Granted</span>';
            } else if (result.state === 'denied') {
                statusDiv.innerHTML = '<span class="badge bg-danger">Microphone Access: Denied</span>';
            } else {
                statusDiv.innerHTML = '<span class="badge bg-warning">Microphone Access: Prompt on Use</span>';
            }
        } catch (error) {
            console.log("Permissions API not supported");
        }
    }
</script>
```

### Handling Permission Denial

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech"
    onError="handlePermissionError">
</ejs-speechtotext>

<div id="permission-error" class="alert alert-danger" style="display:none;">
    <strong>Microphone Access Required</strong>
    <p>To use voice input, please:</p>
    <ol>
        <li>Click the camera/microphone icon in the address bar</li>
        <li>Select "Allow" for microphone access</li>
        <li>Reload this page</li>
    </ol>
</div>

<script>
    function handlePermissionError(args) {
        if (args.error === "NotAllowedError") {
            document.getElementById("permission-error").style.display = "block";
        }
    }
</script>
```

## Security Best Practices

### 1. HTTPS Requirement

Web Speech API requires secure context (HTTPS):

```razor
<!-- Recommended: Check for HTTPS in _Layout.cshtml -->
@{
    bool isSecure = Context.Request.IsHttps;
}

@if (!isSecure && !IsDevelopment())
{
    <div class="alert alert-warning">
        Warning: Voice input requires HTTPS in production.
    </div>
}
```

### 2. Sensitive Data Handling

Never transmit sensitive information through voice:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech" 
    transcriptChanged="onTranscriptChanged">
</ejs-speechtotext>

<script>
    // Sensitive data list
    const sensitivePatterns = [/password/i, /credit card/i, /ssn/i];
    
    function onTranscriptChanged(args) {
        let transcript = args.transcript;
        
        // Check for sensitive data
        for (let pattern of sensitivePatterns) {
            if (pattern.test(transcript)) {
                console.warn("Sensitive data detected in transcript");
                // Handle appropriately - maybe block or sanitize
                return;
            }
        }
        
        // Safe to process
        processTranscript(transcript);
    }
</script>
```

### 3. Input Sanitization

Sanitize all voice input before use:

```razor
@using Syncfusion.EJ2.Inputs

<textarea id="output"></textarea>

<ejs-speechtotext id="speech"
    transcriptChanged="sanitizeTranscript">
</ejs-speechtotext>

<script>
    function sanitizeTranscript(args) {
        let transcript = args.transcript;
        
        // Remove HTML tags
        transcript = transcript.replace(/<[^>]*>/g, '');
        
        // Escape special characters
        let tempDiv = document.createElement('div');
        tempDiv.textContent = transcript;
        let sanitized = tempDiv.innerHTML;
        
        // Display safely
        document.getElementById("output").value = sanitized;
    }
</script>
```

### 4. Authentication and Authorization

```csharp
// In Controller
[Authorize] // Require authentication
public class VoiceInputController : Controller
{
    public IActionResult Index()
    {
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        ViewBag.UserId = userId?.Value;
        return View();
    }
    
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult ProcessVoiceInput(string transcript)
    {
        // Validate user
        if (!User.Identity.IsAuthenticated)
            return Unauthorized();
        
        // Process transcript safely
        return Json(new { success = true });
    }
}
```

## Error Handling

### Comprehensive Error Handler

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech"
    onError="handleAllErrors"
    onStart="handleStart"
    onStop="handleStop">
</ejs-speechtotext>

<div id="error-display"></div>

<script>
    const errorMessages = {
        'NetworkError': 'Internet connection required',
        'NotAllowedError': 'Microphone access denied',
        'NoSpeechError': 'No speech detected. Please try again.',
        'AudioCaptureError': 'No microphone found',
        'ServiceNotAllowedError': 'Speech service not available',
        'BadGrammar': 'Grammar format error',
        'Aborted': 'Speech recognition cancelled'
    };
    
    function handleAllErrors(args) {
        let errorDiv = document.getElementById("error-display");
        let message = errorMessages[args.error] || args.error;
        
        errorDiv.innerHTML = '<div class="alert alert-danger">' + 
            '<strong>Error:</strong> ' + message + '</div>';
        
        // Auto-clear after 5 seconds
        setTimeout(() => {
            errorDiv.innerHTML = '';
        }, 5000);
    }
    
    function handleStart() {
        document.getElementById("error-display").innerHTML = '';
    }
    
    function handleStop() {
        // Cleanup
    }
</script>
```

### Production Error Logging

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech" onError="logAndHandleError"></ejs-speechtotext>

<script>
    function logAndHandleError(args) {
        // Log to server
        fetch('/api/error-log', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                component: 'SpeechToText',
                error: args.error,
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent
            })
        });
        
        // Display user-friendly message
        alert('A voice input error occurred. Please try again.');
    }
</script>
```

## Debugging Tips

1. **Enable browser console logging:**
```javascript
// Check component initialization
console.log(ej.base.getComponent(
    document.getElementById("speech"),
    "speechtotext"
));
```

2. **Use browser DevTools:**
   - Network tab: Verify CDN loads
   - Console tab: Check for JavaScript errors
   - Application tab: Verify microphone permissions

3. **Network inspection:**
```csharp
// Log in Program.cs
var builder = WebApplication.CreateBuilder(args);
// ... add logging middleware
builder.Services.AddLogging();
```

