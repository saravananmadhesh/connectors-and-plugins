# Content Security Policy (CSP) for Syncfusion ASP.NET MVC EJ2

## Overview
Content Security Policy (CSP) is a browser security mechanism that restricts where scripts, styles, fonts, and other resources can be loaded from. This protects against XSS attacks and data injection vulnerabilities.

When implementing strict CSP with Syncfusion EJ2 components in ASP.NET MVC, specific directives and techniques are required because Syncfusion uses inline styles, base64 icons, and external font resources.

---

## CSP Requirement for Syncfusion

Syncfusion EJ2 components use:
- **Inline styles** (for theming, control appearance)
- **Base64 encoded fonts** (Syncfusion icon set embedded in CSS)
- **External fonts** (Google Fonts for Material/Tailwind themes)
- **Inline scripts** (ScriptManager initialization)
- **External resources** (CDN scripts and styles)

These features require careful CSP configuration to function while maintaining security.

---

## Basic CSP Meta Tag (Recommended)

Add to `~/Views/Shared/_Layout.cshtml` in `<head>`:

```html
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- CSP Meta Tag - Syncfusion Compatible -->
    <meta http-equiv="Content-Security-Policy" content="
        default-src 'self';
        script-src 'self' 'unsafe-inline' https://cdn.syncfusion.com;
        style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
        font-src 'self' data: https://fonts.gstatic.com;
        img-src 'self' data: https:;
        connect-src 'self' https:;
    " />
    
    <!-- Syncfusion Styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

### Directive Explanation

| Directive | Value | Reason |
|-----------|-------|--------|
| `default-src` | `'self'` | Base policy: allow only same-origin |
| `script-src` | `'self' 'unsafe-inline' https://cdn.syncfusion.com` | Local scripts, inline (ScriptManager), Syncfusion CDN |
| `style-src` | `'self' 'unsafe-inline' https://fonts.googleapis.com` | Local styles, inline (Syncfusion themes), Google Fonts |
| `font-src` | `'self' data: https://fonts.gstatic.com` | Local fonts, data URIs (icon fonts), Google CDN |
| `img-src` | `'self' data: https:` | Local/data images, HTTPS images |
| `connect-src` | `'self' https:` | AJAX/fetch to same-origin and HTTPS |

---

## Enhanced CSP for Material/Tailwind Themes

If using Material or Tailwind themes with Google Roboto font:

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://cdn.syncfusion.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com;
    img-src 'self' data: https:;
    connect-src 'self' https:;
" />
```

**Key additions:**
- `https://fonts.googleapis.com` in `font-src`: Allows Google Font files
- `https://fonts.googleapis.com` in `style-src`: Allows Google Font stylesheet

---

## Advanced CSP for Template-Based Controls

If using Grid, Dialog, Scheduler with templates:

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.syncfusion.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com;
    img-src 'self' data: https:;
    connect-src 'self' https:;
    object-src 'none';
" />
```

**Important Addition:**
- `'unsafe-eval'` in `script-src`: Required for template compilation in Grid, Dialog, Scheduler

⚠️ **Security Note**: `'unsafe-eval'` is less secure. Use only if templates are absolutely necessary. Consider alternative architectures that don't require templates.

---

## HTTP Header Method (More Secure than Meta Tag)

Configure CSP via HTTP header instead of meta tag for enforcement across all responses:

### Method 1: Global.asax.cs

```csharp
public class MvcApplication : System.Web.HttpApplication
{
    protected void Application_BeginRequest()
    {
        string cspPolicy = "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' https://cdn.syncfusion.com; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' data: https://fonts.gstatic.com; " +
            "img-src 'self' data: https:; " +
            "connect-src 'self' https:;";
        
        HttpContext.Current.Response.AddHeader("Content-Security-Policy", cspPolicy);
    }
}
```

### Method 2: Custom Attribute Filter

```csharp
public class CspHeaderAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext filterContext)
    {
        string cspPolicy = "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' https://cdn.syncfusion.com; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' data: https://fonts.gstatic.com; " +
            "img-src 'self' data: https:; " +
            "connect-src 'self' https:;";
        
        filterContext.HttpContext.Response.AddHeader("Content-Security-Policy", cspPolicy);
        base.OnActionExecuting(filterContext);
    }
}

// Apply to controller:
[CspHeader]
public class HomeController : Controller
{
    // ... actions
}
```

### Method 3: Web.config (IIS)

```xml
<configuration>
  <system.webServer>
    <httpProtocol>
      <customHeaders>
        <add name="Content-Security-Policy" value="
          default-src 'self';
          script-src 'self' 'unsafe-inline' https://cdn.syncfusion.com;
          style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
          font-src 'self' data: https://fonts.gstatic.com;
          img-src 'self' data: https:;
          connect-src 'self' https:;
        " />
      </customHeaders>
    </httpProtocol>
  </system.webServer>
</configuration>
```

---

## Nonce-Based CSP (Most Secure)

Generate unique nonce per request; apply to inline scripts/styles without `'unsafe-inline'`:

### Create Middleware

```csharp
public class CspNonceMiddleware
{
    private readonly RequestDelegate _next;
    
    public CspNonceMiddleware(RequestDelegate next)
    {
        _next = next;
    }
    
    public async Task InvokeAsync(HttpContext context)
    {
        // Generate cryptographically secure nonce
        using (var rng = new System.Security.Cryptography.RNGCryptoServiceProvider())
        {
            byte[] nonceBytes = new byte[32];
            rng.GetBytes(nonceBytes);
            string nonce = Convert.ToBase64String(nonceBytes);
            
            // Store in context items for use in views
            context.Items["CspNonce"] = nonce;
            
            // Set CSP header with nonce (no 'unsafe-inline' needed)
            string cspPolicy = $"default-src 'self'; " +
                $"script-src 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; " +
                $"style-src 'self' 'nonce-{nonce}' https://fonts.googleapis.com; " +
                $"font-src 'self' data: https://fonts.gstatic.com; " +
                $"img-src 'self' data: https:; " +
                $"connect-src 'self' https:;";
            
            context.Response.Headers.Add("Content-Security-Policy", cspPolicy);
        }
        
        await _next(context);
    }
}

// Extension method to register middleware
public static class CspMiddlewareExtensions
{
    public static IApplicationBuilder UseCspNonce(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<CspNonceMiddleware>();
    }
}
```

### Register in Global.asax

```csharp
public class MvcApplication : System.Web.HttpApplication
{
    protected void Application_Start()
    {
        // Register nonce in context during application start
        AreaRegistration.RegisterAllAreas();
        FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
        RouteConfig.RegisterRoutes(RouteTable.Routes);
        BundleConfig.RegisterBundles(BundleTable.Bundles);
    }
    
    protected void Application_BeginRequest()
    {
        // Generate nonce
        byte[] nonceBytes = new byte[32];
        using (var rng = new System.Security.Cryptography.RNGCryptoServiceProvider())
        {
            rng.GetBytes(nonceBytes);
        }
        string nonce = Convert.ToBase64String(nonceBytes);
        
        HttpContext.Current.Items["CspNonce"] = nonce;
        
        // Set header with nonce
        string cspPolicy = $"default-src 'self'; " +
            $"script-src 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; " +
            $"style-src 'self' 'nonce-{nonce}' https://fonts.googleapis.com; " +
            $"font-src 'self' data: https://fonts.gstatic.com; " +
            $"img-src 'self' data: https:; " +
            $"connect-src 'self' https:;";
        
        HttpContext.Current.Response.AddHeader("Content-Security-Policy", cspPolicy);
    }
}
```

### Use Nonce in _Layout.cshtml

```html
<body>
    @RenderBody()
    
    <!-- Syncfusion Script Manager with nonce -->
    <script nonce="@(ViewContext.HttpContext.Items["CspNonce"])">
        @Html.EJS().ScriptManager()
    </script>
    
    <!-- Other inline scripts with nonce -->
    <script nonce="@(ViewContext.HttpContext.Items["CspNonce"])">
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Page loaded with CSP nonce');
        });
    </script>
</body>
```

---

## CSP Violation Detection & Logging

### Report-Only Mode (Testing Phase)

Use `Content-Security-Policy-Report-Only` header during testing to log violations without blocking:

```csharp
protected void Application_BeginRequest()
{
    if (!HttpContext.Current.Request.Url.Host.Contains("production"))
    {
        // Report-only mode for development/staging
        string cspPolicy = "default-src 'self'; " +
            "script-src 'self' 'unsafe-inline' https://cdn.syncfusion.com; " +
            "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
            "font-src 'self' data: https://fonts.gstatic.com; " +
            "img-src 'self' data: https:; " +
            "connect-src 'self' https:; " +
            "report-uri /csp-report";
        
        HttpContext.Current.Response.AddHeader("Content-Security-Policy-Report-Only", cspPolicy);
    }
}
```

### CSP Report Endpoint

```csharp
[HttpPost]
public ActionResult CspReport()
{
    using (var reader = new System.IO.StreamReader(Request.InputStream))
    {
        string jsonReport = reader.ReadToEnd();
        
        // Log violation
        System.Diagnostics.Debug.WriteLine($"CSP Violation: {jsonReport}");
        
        // Optionally store in database or send to monitoring service
        // LogCspViolation(jsonReport);
    }
    
    return new HttpStatusCodeResult(204); // No Content
}
```

### Test in Browser

1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for "Refused to..." messages
4. Adjust CSP directives based on violations

---

## Common CSP Issues with Syncfusion

| Issue | Error Message | Cause | Solution |
|-------|---------------|-------|----------|
| Inline styles blocked | `Refused to apply inline style` | Syncfusion theme styles | Add `'unsafe-inline'` to `style-src` |
| Fonts not loading | `Failed to load font from cdn` | Google Fonts blocked | Add `https://fonts.googleapis.com` and `https://fonts.gstatic.com` to `font-src` |
| Scripts blocked | `Refused to execute script` | Inline scripts/ScriptManager | Add `'unsafe-inline'` to `script-src` |
| Icons not rendering | Blank icon squares | Base64 fonts in CSS blocked | Add `data:` to `font-src` |
| Templates fail | Grid/Dialog templates not rendering | Template eval blocked | Add `'unsafe-eval'` to `script-src` |
| AJAX failures | `Blocked by CSP` in API calls | API endpoint not whitelisted | Add API domain to `connect-src` |

---

## Best Practices

### 1. Start with Report-Only
```
Use Content-Security-Policy-Report-Only first
Monitor violations for 1-2 weeks
Adjust policy based on reports
Then switch to enforcing mode
```

### 2. Minimize Unsafe Directives
```
Avoid 'unsafe-inline' if possible (use nonces instead)
Avoid 'unsafe-eval' (refactor to avoid templates)
Use 'self' and explicit domains instead of wildcards
```

### 3. Use Specific Domains
```
❌ Bad: script-src https:
✓ Good: script-src 'self' https://cdn.syncfusion.com
```

### 4. Leverage Nonces
```
✓ Generate unique nonce per request
✓ Apply to inline <script> and <style> tags
✓ Update nonce value dynamically
✓ Avoid 'unsafe-inline' when using nonces
```

---

## References

- [MDN: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Google: CSP Developer Guide](https://csp.withgoogle.com/)
- [Syncfusion CSP Documentation](https://ej2.syncfusion.com/aspnetmvc/documentation/common/content-security-policy)
- [OWASP: CSP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
    await next();
});
```

---

## Step 2: Apply Nonce in `_Layout.cshtml`

Add the generated nonce to all Syncfusion-related script and style references.

```html
<link
  href="https://cdn.syncfusion.com/ej2/32.2.3/bootstrap5.css"
  rel="stylesheet"
  nonce="@Context.Items["Nonce"]" />

<script
  src="https://cdn.syncfusion.com/ej2/32.2.3/dist/ej2.min.js"
  nonce="@Context.Items["Nonce"]">
</script>
```

---

## Step 3: Enable Nonce for Syncfusion Script Manager

When using the Syncfusion ASP.NET Core Script Manager, explicitly pass the nonce.

```html
<ejs-scripts add-nonce="@Context.Items["Nonce"]"></ejs-scripts>
```

---

## External Fonts (Roboto)

Syncfusion Material and Tailwind themes depend on the **Roboto** font, which is hosted externally.

To avoid CSP violations, ensure the following are allowed:

- `https://fonts.googleapis.com` in `style-src`
- `https://fonts.gstatic.com` in `font-src`

These are already included in the sample CSP header above.

---

## Template Controls Notice

Some Syncfusion components that use client-side templates require the following directive:

```text
script-src 'unsafe-eval'
```

Use this only when absolutely necessary and assess the security impact carefully.

---

## Verification

After running the application:

- Inspect the rendered HTML
- Confirm the `nonce` attribute exists on `<script>` and `<link>` elements
- Ensure CSP violations do not appear in the browser console

---

## Implementation Guide

### Step 1: Generate Nonce in Program.cs

Add middleware that generates a unique nonce for each request:

```csharp
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);

// Add services...
builder.Services.AddRazorPages();
builder.Services.AddControllers();

var app = builder.Build();

// Add CSP middleware EARLY in the pipeline
app.Use(async (context, next) =>
{
    // Generate cryptographically secure random nonce
    var nonceBytes = new byte[32];
    RandomNumberGenerator.Fill(nonceBytes);
    var nonce = Convert.ToBase64String(nonceBytes);

    // Store nonce in context items for access in views
    context.Items["Nonce"] = nonce;

    // Add CSP response header
    context.Response.Headers.Add(
        "Content-Security-Policy",
        $"script-src 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; " +
        $"style-src-elem 'self' 'nonce-{nonce}' https://cdn.syncfusion.com https://fonts.googleapis.com; " +
        $"font-src 'self' data: https://fonts.gstatic.com; " +
        "object-src 'none';"
    );

    await next();
});

// Configure other middleware...
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.MapRazorPages();
app.MapControllers();
app.Run();
```

### CSP Header Explanation

The CSP header includes several directives:

| Directive | Purpose | Configuration |
|-----------|---------|----------------|
| `script-src` | Where scripts can load from | `'self'` (same origin) + `'nonce-{nonce}'` (inline with nonce) + `https://cdn.syncfusion.com` (CDN) |
| `style-src-elem` | Where stylesheets can load from | `'self'` + `'nonce-{nonce}'` + CDN sources |
| `font-src` | Where fonts can load from | `'self'` + `data:` (for data URIs) + `https://fonts.gstatic.com` (Google Fonts) |
| `object-src` | Where plugins can load from | `'none'` (most restrictive) |

### Step 2: Apply Nonce in _Layout.cshtml

Add nonce attribute to ALL Syncfusion theme links and scripts in `~/Pages/Shared/_Layout.cshtml`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Syncfusion with CSP</title>

    <!-- Syncfusion Theme Link with Nonce -->
    <link rel="stylesheet" 
      href="https://cdn.syncfusion.com/ej2/33.1.44/bootstrap5.css" 
      nonce="@Context.Items["Nonce"]" />

    <!-- Alternative: Local theme file with nonce -->
    <!-- <link rel="stylesheet" href="~/themes/bootstrap5.css" nonce="@Context.Items["Nonce"]" /> -->
</head>

<body>
    <!-- Content -->
    @RenderBody()

    <!-- Syncfusion Script with Nonce -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js" 
      nonce="@Context.Items["Nonce"]">
    </script>

    <!-- OR Use Syncfusion Script Manager -->
    <ejs-scripts add-nonce="@Context.Items["Nonce"]"></ejs-scripts>

    @RenderSection("Scripts", required: false)
</body>
</html>
```

### Step 3: Configure Script Manager with Nonce

When using Syncfusion ASP.NET Core Script Manager, explicitly pass the nonce:

```html
<!-- In your Razor view or layout -->
<ejs-scripts add-nonce="@Context.Items["Nonce"]"></ejs-scripts>
```

The Script Manager will automatically apply the nonce to all inline Syncfusion initialization scripts.

### Step 4: Application Layout Example

Complete layout example with Syncfusion components and CSP nonce:

```html
@{
    ViewData["Title"] = "Syncfusion App";
}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>@ViewData["Title"]</title>

    <!-- Bootstrap CSS (optional) -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" 
      nonce="@Context.Items["Nonce"]" />

    <!-- Syncfusion EJ2 Theme CSS with Nonce -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/bootstrap5.css" 
      nonce="@Context.Items["Nonce"]" />
</head>

<body>
    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Syncfusion Demo</a>
    </nav>

    <!-- Main Content -->
    <div class="container mt-4">
        @RenderBody()
    </div>

    <!-- Syncfusion EJ2 Script with Nonce -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js" 
      nonce="@Context.Items["Nonce"]">
    </script>

    <!-- Syncfusion Script Manager -->
    <ejs-scripts add-nonce="@Context.Items["Nonce"]"></ejs-scripts>

    <!-- Additional scripts section -->
    @RenderSection("Scripts", required: false)
</body>
</html>
```

## External Resources Configuration

### CDN Resources

Syncfusion components use resources from `https://cdn.syncfusion.com`. Ensure this is allowed in CSP:

```csharp
$"script-src 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; " +
$"style-src-elem 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; "
```

### External Fonts (Material & Tailwind Themes)

Material and Tailwind themes use **Roboto** font from Google Fonts:

```csharp
$"font-src 'self' data: https://fonts.gstatic.com; " +
$"style-src-elem 'self' 'nonce-{nonce}' https://fonts.googleapis.com https://cdn.syncfusion.com; "
```

**Permissions needed:**
- `https://fonts.googleapis.com` in `style-src-elem` (for font stylesheet)
- `https://fonts.gstatic.com` in `font-src` (for actual font files)

### Complete CSP Header Example

```csharp
context.Response.Headers.Add(
    "Content-Security-Policy",
    $"script-src 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; " +
    $"style-src-elem 'self' 'nonce-{nonce}' https://cdn.syncfusion.com https://fonts.googleapis.com; " +
    $"font-src 'self' data: https://fonts.gstatic.com; " +
    $"img-src 'self' data: https:; " +
    "object-src 'none'; " +
    "base-uri 'self'; " +
    "form-action 'self';"
);
```

## Template Controls & Unsafe Eval

### CSP Restriction for Template Controls

Some Syncfusion components with client-side templates require JavaScript evaluation:

```csharp
script-src 'unsafe-eval'  // Only when absolutely necessary
```

### Components Requiring Unsafe-Eval

- Grid with custom cell templates
- Tree Grid with templates
- Scheduler with event templates
- Any control with inline template functions

### Safe Alternative

Use data binding instead of inline templates when possible:

```html
<!-- Avoid inline template -->
<!-- <ejs-grid>
  <e-column template="<span>${data.name}</span>"></e-column>
</ejs-grid> -->

<!-- Better: Use data binding with display methods -->
<ejs-grid id="grid" dataSource="@ViewBag.Data">
  <e-column field="Name" headerText="Name"></e-column>
</ejs-grid>
```

## Verification & Testing

### Verify Nonce Implementation

1. **Open Browser DevTools** (F12)
2. **Inspect the `<head>` element**
3. **Verify nonce attribute** on link tags:
   ```html
   <link rel="stylesheet" href="..." nonce="abc123..." />
   ```

4. **Inspect script tags**
5. **Verify nonce attribute** on scripts:
   ```html
   <script src="..." nonce="abc123..."></script>
   ```

### Check for CSP Violations

1. **Open Browser Console** (F12 → Console)
2. **Look for CSP violation messages:**
   ```
   Refused to load the script 'https://...' because it violates 
   the following Content Security Policy directive...
   ```

3. **Common violations:**
   - Missing nonce on inline styles
   - Missing allowed origin in CSP header
   - Missing `'unsafe-eval'` for template controls

### CSP Violation Example

If you see this error:
```
Refused to load the stylesheet 'https://cdn.syncfusion.com/ej2/33.1.44/bootstrap5.css' 
because it violates the following Content Security Policy directive: 
"style-src-elem 'self' 'nonce-abc123'"
```

**Solution:** Ensure CDN URL is in CSP header:
```csharp
$"style-src-elem 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; "
```

## Common CSP Scenarios

### Scenario 1: Bootstrap Theme with CDN

```csharp
// Program.cs
var nonce = Convert.ToBase64String(RandomNumberGenerator.GenerateRandomBytes(32));

context.Response.Headers.Add(
    "Content-Security-Policy",
    $"script-src 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; " +
    $"style-src-elem 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; " +
    "object-src 'none';"
);
```

### Scenario 2: Local Theme Files with Custom CSS

```csharp
// Program.cs - allow local files only
context.Response.Headers.Add(
    "Content-Security-Policy",
    $"script-src 'self' 'nonce-{nonce}'; " +
    $"style-src-elem 'self' 'nonce-{nonce}'; " +
    "object-src 'none';"
);
```

### Scenario 3: Material Theme with Google Fonts

```csharp
// Program.cs - Material theme requires Roboto font
context.Response.Headers.Add(
    "Content-Security-Policy",
    $"script-src 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; " +
    $"style-src-elem 'self' 'nonce-{nonce}' https://cdn.syncfusion.com https://fonts.googleapis.com; " +
    $"font-src 'self' data: https://fonts.gstatic.com; " +
    "object-src 'none';"
);
```
