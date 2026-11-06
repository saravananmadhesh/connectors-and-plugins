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

1. Verify Syncfusion is registered in `Views/Web.config`:
```xml
<configuration>
    <system.web>
        <compilation>
            <assemblies>
                <add assembly="Syncfusion.EJ2.MVC5, Version=*, Culture=neutral, PublicKeyToken=*" />
            </assemblies>
        </compilation>
    </system.web>
</configuration>
```

2. Check NuGet package is installed:
```powershell
Install-Package Syncfusion.EJ2.MVC5
```

3. Ensure license is registered in `Global.asax.cs`:
```csharp
using Syncfusion.Licensing;

protected void Application_Start()
{
    SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    // ... other setup code
}
```

4. Verify `@Html.EJS().ScriptManager()` is present in `_Layout.cshtml`:
```html
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
@Html.EJS().ScriptManager()
```

### Issue: "Web Speech API not supported" error

**Symptom:** Error message: "Browser not supported..."

**Solutions:**

1. Add browser detection in controller:
```csharp
public ActionResult VoiceInput()
{
    string userAgent = Request.UserAgent;
    bool supportedBrowser = userAgent.Contains("Chrome") || 
                           userAgent.Contains("Edge") || 
                           userAgent.Contains("Safari");
    ViewBag.SpeechSupported = supportedBrowser;
    return View();
}
```

2. Display conditional UI in view:
```razor
@using Syncfusion.EJ2

@if (ViewBag.SpeechSupported == true)
{
    @Html.EJS().SpeechToText("speech").Render()
}
else
{
    <div class="alert alert-warning">
        Web Speech API is not supported in your browser.
        Please use Chrome, Edge, or Safari.
    </div>
}
```

## CDN and Script Loading

### Issue: CSS not loading (404 errors)

**Symptom:** Control appears unstyled, console shows 404 errors.

**Solutions:**

1. Verify CDN URL in `_Layout.cshtml`:
```html
<!-- Ensure correct order -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2.min.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

2. Use correct version endpoint:
```html
<!-- Specific version -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.1.36/ej2.min.css" />
<script src="https://cdn.syncfusion.com/ej2/23.1.36/ej2.min.js"></script>
```

3. Use local NuGet assets as fallback:
```html
<!-- Primary: CDN -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2.min.css" />
<!-- Fallback: Local -->
<link rel="stylesheet" href="~/Content/ej2/ej2.min.css" />

<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
<script src="~/Scripts/ej2/ej2.min.js"></script>
```

### Issue: Scripts loading in wrong order

**Symptom:** "ej is undefined" error in console.

**Solutions:**

1. Verify script loading order in `_Layout.cshtml`:
```html
<head>
    <!-- CSS first -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2.min.css" />
</head>
<body>
    @RenderBody()
    
    <!-- Scripts at end of body -->
    <script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
    @Html.EJS().ScriptManager()
    
    @RenderSection("scripts", required: false)
</body>
```

2. Wrap initialization in document ready:
```html
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

### Browser Detection in Controller

```csharp
public ActionResult VoiceInput()
{
    string userAgent = Request.UserAgent;
    
    var browserInfo = new {
        isChrome = userAgent.Contains("Chrome"),
        isEdge = userAgent.Contains("Edge"),
        isSafari = userAgent.Contains("Safari"),
        isFirefox = userAgent.Contains("Firefox"),
        isSupported = userAgent.Contains("Chrome") || userAgent.Contains("Edge") || 
                     userAgent.Contains("Safari") || userAgent.Contains("Opera")
    };
    
    ViewBag.BrowserInfo = browserInfo;
    return View();
}
```

```razor
@if (ViewBag.BrowserInfo.isSupported)
{
    @Html.EJS().SpeechToText("speech").Render()
}
else
{
    <div class="alert alert-danger">
        Your browser does not support Web Speech API.
        <br/>Supported browsers: Chrome, Edge, Safari, Opera
    </div>
}
```

## Microphone Permissions

### Requesting Permission

The browser automatically requests microphone permission on first use:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("speech")
    .OnStart("handleStart")
    .OnError("handleError")
    .Render()

<script>
    function handleStart() {
        console.log("Microphone access requested");
    }
    
    function handleError(args) {
        if (args.error === "NotAllowedError") {
            alert("Microphone access was denied. " +
                  "Please enable it in your browser settings.");
        }
    }
</script>
```

### Checking Permission Status

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("speech")
    .Created("onComponentCreated")
    .Render()

<div id="permission-status"></div>

<script>
    async function onComponentCreated() {
        try {
            const result = await navigator.permissions.query({ name: 'microphone' });
            const statusDiv = document.getElementById("permission-status");
            
            if (result.state === 'granted') {
                statusDiv.innerHTML = 
                    '<span class="badge badge-success">Microphone Access: Granted</span>';
            } else if (result.state === 'denied') {
                statusDiv.innerHTML = 
                    '<span class="badge badge-danger">Microphone Access: Denied</span>';
            } else {
                statusDiv.innerHTML = 
                    '<span class="badge badge-warning">Microphone Access: Prompt on Use</span>';
            }
        } catch (error) {
            console.log("Permissions API not supported");
        }
    }
</script>
```

### Handling Permission Denial

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("speech")
    .OnError("handlePermissionError")
    .Render()

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

```csharp
// In controller or action filter
public class SecureConnectionAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        if (!filterContext.HttpContext.Request.IsSecureConnection)
        {
            // In development, allow; in production, redirect to HTTPS
            if (!System.Diagnostics.Debugger.IsAttached)
            {
                filterContext.Result = new RedirectResult(
                    "https://" + filterContext.HttpContext.Request.Url?.Authority);
            }
        }
        
        base.OnActionExecuting(filterContext);
    }
}
```

### 2. Sensitive Data Handling

Never transmit sensitive information through voice:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("speech")
    .TranscriptChanged("onTranscriptChanged")
    .Render()

<script>
    // Sensitive data list
    const sensitivePatterns = [/password/i, /credit card/i, /ssn/i, /pin/i];
    
    function onTranscriptChanged(args) {
        let transcript = args.transcript;
        
        // Check for sensitive data
        for (let pattern of sensitivePatterns) {
            if (pattern.test(transcript)) {
                console.warn("Sensitive data detected in transcript");
                // Block or sanitize
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
@using Syncfusion.EJ2

<textarea id="output"></textarea>

@Html.EJS().SpeechToText("speech")
    .TranscriptChanged("sanitizeTranscript")
    .Render()

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
[Authorize] // Require authentication
public class VoiceInputController : Controller
{
    [HttpPost]
    [ValidateAntiForgeryToken]
    public ActionResult ProcessVoiceInput(string transcript)
    {
        // Validate user
        if (!User.Identity.IsAuthenticated)
            return new HttpUnauthorizedResult();
        
        // Validate transcript length
        if (string.IsNullOrEmpty(transcript) || transcript.Length > 1000)
            return Json(new { success = false, error = "Invalid input" });
        
        // Process transcript safely
        var userId = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
        
        return Json(new { success = true });
    }
}
```

### 5. Rate Limiting

```csharp
// Implement rate limiting for voice submissions
public class RateLimitAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        var cacheKey = "VoiceSubmit_" + filterContext.HttpContext.User.Identity.Name;
        var cache = System.Web.HttpRuntime.Cache;
        
        if (cache[cacheKey] != null)
        {
            filterContext.Result = new HttpStatusCodeResult(429, "Too Many Requests");
            return;
        }
        
        cache.Insert(cacheKey, 1, null, 
            System.DateTime.Now.AddSeconds(5), // Allow 1 request per 5 seconds
            System.Web.Caching.Cache.NoSlidingExpiration);
        
        base.OnActionExecuting(filterContext);
    }
}

[RateLimit]
public ActionResult ProcessVoiceInput(string transcript)
{
    // Process voice input
    return Json(new { success = true });
}
```

## Error Handling

### Comprehensive Error Handler

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("speech")
    .OnError("handleAllErrors")
    .Render()

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
</script>
```

### Production Error Logging

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("speech")
    .OnError("logAndHandleError")
    .Render()

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
                userAgent: navigator.userAgent,
                url: window.location.href
            })
        });
        
        // Display user-friendly message
        alert('A voice input error occurred. Please try again.');
    }
</script>
```

```csharp
[HttpPost]
public ActionResult LogError(dynamic errorData)
{
    // Log error to database or logging service
    var logger = log4net.LogManager.GetLogger(this.GetType());
    logger.Error("SpeechToText Error: " + errorData.error);
    
    return Json(new { success = true });
}
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

3. **Network inspection in MVC:**
```csharp
// In Web.config for development
<system.diagnostics>
    <trace autoflush="true">
        <listeners>
            <add name="textWriterTraceListener" type="System.Diagnostics.TextWriterTraceListener" initializeData="Trace.log" />
        </listeners>
    </trace>
</system.diagnostics>
```

4. **Check script manager output:**
```html
<!-- In _Layout.cshtml -->
@Html.EJS().ScriptManager() <!-- Outputs initialization script -->
```

