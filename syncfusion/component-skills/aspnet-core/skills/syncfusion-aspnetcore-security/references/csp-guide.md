# Content Security Policy (CSP) for Syncfusion EJ2 ASP.NET Core

## Overview

Content Security Policy (CSP) is a browser security mechanism that helps protect web applications from
cross-site scripting (XSS) and data injection attacks by restricting where scripts, styles, and other
resources can be loaded from.

When running Syncfusion EJ2 ASP.NET Core controls in **strict CSP mode**, additional configuration
is required because inline scripts and styles are restricted by default.

---

## Why Nonce Is Required?

Syncfusion components rely on client-side scripts and styles. Under strict CSP:

- Inline scripts are blocked
- Inline styles are blocked
- External fonts may be blocked

A **nonce (number used once)** allows trusted scripts and styles to run securely by explicitly
whitelisting them per request.

---

## Step 1: Generate a Nonce in `Program.cs`

Add middleware that generates a cryptographically secure nonce for every request and appends
it to the CSP response header.

```csharp
using System.Security.Cryptography;

app.Use(async (context, next) =>
{
    var nonceBytes = new byte[32];
    RandomNumberGenerator.Fill(nonceBytes);
    var nonce = Convert.ToBase64String(nonceBytes);

    context.Items["Nonce"] = nonce;

    context.Response.Headers.Add(
        "Content-Security-Policy",
        $"script-src 'self' 'nonce-{nonce}' https://cdn.syncfusion.com; " +
        $"style-src-elem 'self' 'nonce-{nonce}' https://cdn.syncfusion.com https://fonts.googleapis.com; " +
        $"font-src 'self' data: https://fonts.gstatic.com; " +
        "object-src 'none';"
    );

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
