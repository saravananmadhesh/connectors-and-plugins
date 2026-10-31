# Getting Started – Syncfusion ASP.NET Core Smart Paste Button

## Overview
The Smart Paste Button is an AI-powered UI control that intelligently maps clipboard text to form fields using contextual understanding. This guide covers installation, configuration, and initial setup for ASP.NET Core applications.

## Prerequisites
- **.NET 8 or later**
- **ASP.NET Core 8+** - Razor Pages or MVC project
- **Syncfusion License** - Valid license key required
- **AI Service** - OpenAI, Azure OpenAI, Ollama, or custom IChatInferenceService implementation

## Step 1: Install NuGet Package

```powershell
Install-Package Syncfusion.EJ2.AspNet.Core
```

Verify installation in your `.csproj` file:

```xml
<ItemGroup>
    <PackageReference Include="Syncfusion.EJ2.AspNet.Core" Version="33.1.44" />
</ItemGroup>
```

## Step 2: Register Services and Syncfusion License

In `Program.cs`:

```csharp
builder.Services.AddRazorPages();
builder.Services.AddSyncfusionSmartComponents();
```

For [Registering Syncfusion License](https://ej2.syncfusion.com/aspnetcore/documentation/licensing/how-to-register-in-an-application)

## Step 3: Configure Tag Helpers

In `Views/_ViewImports.cshtml` (MVC) or `Pages/_ViewImports.cshtml` (Razor Pages):

```cshtml
@addTagHelper *, Syncfusion.EJ2
```

## Step 4: Include Required Resources

Add stylesheets and scripts to your layout file (`_Layout.cshtml` or `App.razor`):

```html
<!-- CDN Stylesheet -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent2.css" />

<!-- CDN Script -->
<script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
```

Register Syncfusion script manager at the end of body:

```cshtml
<ejs-scripts></ejs-scripts>
```

## Step 5: [Configure AI Services](https://ej2.syncfusion.com/aspnetcore/documentation/smart-paste/getting-started#configure-ai-service)

### [OpenAI Configuration](https://ej2.syncfusion.com/aspnetcore/documentation/smart-paste/getting-started#openai-configuration)

### [Azure OpenAI Configuration](https://ej2.syncfusion.com/aspnetcore/documentation/smart-paste/getting-started#azure-openai-configuration)

### [Ollama Configuration](https://ej2.syncfusion.com/aspnetcore/documentation/smart-paste/getting-started#ollama-configuration)

## Step 6: Create Basic Form with Smart Paste

**Razor Page Example (Pages/Index.cshtml):**

```cshtml
@page
@model IndexModel

<h1>Smart Paste Form</h1>

<form method="post">
    <div class="form-group">
        <label for="fullName">Full Name</label>
        <input id="fullName" name="fullName" class="form-control" />
    </div>

    <div class="form-group">
        <label for="email">Email Address</label>
        <input id="email" name="email" type="email" class="form-control" />
    </div>

    <div class="form-group">
        <label for="phone">Phone Number</label>
        <input id="phone" name="phone" type="tel" class="form-control" />
    </div>

    <!-- Smart Paste Button -->
    <ejs-smartpaste id="smartPaste" 
                    content="Smart Paste" 
                    cssClass="e-primary">
    </ejs-smartpaste>

    <button type="submit" class="btn btn-primary mt-3">Submit Form</button>
</form>
```

**Corresponding Page Model (Pages/Index.cshtml.cs):**

```csharp
public class IndexModel : PageModel
{
    public string FullName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }

    public void OnPost()
    {
        // Process form data
        // FullName, Email, Phone are automatically populated by Smart Paste
    }
}
```

## Step 7: Test Smart Paste

1. Copy sample text to clipboard:
   ```
   John Doe
   john.doe@example.com
   (555) 123-4567
   ```

2. Click the "Smart Paste" button
3. Form fields are automatically populated with matching data

## Next Steps

- **Enhance Accuracy:** Use field annotations (see [annotation.md](annotation.md))
- **Customize Appearance:** Style the button (see [customization.md](customization.md))
- **Custom Backend:** Implement custom inference service (see [custom-inference-backend.md](custom-inference-backend.md))

## Processing Flow
1. Scan form fields
2. Extract metadata
3. Send clipboard data to AI
4. Parse response
5. Populate fields

Source:
https://ej2.syncfusion.com/aspnetcore/documentation/smart-paste/getting-started