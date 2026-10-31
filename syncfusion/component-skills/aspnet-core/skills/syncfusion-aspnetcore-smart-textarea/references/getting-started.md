# Getting Started – Syncfusion ASP.NET Core Smart TextArea

## Overview

The Smart TextArea is an AI-powered text input control that provides intelligent sentence and text suggestions. This guide covers installation, configuration, and initial setup for ASP.NET Core applications with AI-driven autocomplete capabilities.

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

## Step 5: [Configure AI Services](https://ej2.syncfusion.com/aspnetcore/documentation/smart-textarea/getting-started#configure-ai-service)

### [OpenAI Configuration](https://ej2.syncfusion.com/aspnetcore/documentation/smart-textarea/getting-started#openai-configuration)

### [Azure OpenAI Configuration](https://ej2.syncfusion.com/aspnetcore/documentation/smart-textarea/getting-started#azure-openai-configuration)

### [Ollama Configuration](https://ej2.syncfusion.com/aspnetcore/documentation/smart-textarea/getting-started#ollama-configuration)

## Step 6: Create Basic Smart TextArea

**Razor Page Example (Pages/Index.cshtml):**

```cshtml
@page
@model IndexModel

<h1>AI-Powered Text Editor</h1>

<form method="post">
    <div class="form-group">
        <label for="articleContent">Article Content</label>
        <ejs-smarttextarea id="articleContent" 
                           name="articleContent"
                           placeholder="Start typing... AI will suggest completions"
                           rows="10"
                           cols="50">
        </ejs-smarttextarea>
    </div>

    <div class="form-group">
        <label for="comments">Comments</label>
        <ejs-smarttextarea id="comments" 
                           name="comments"
                           placeholder="Type your comments here..."
                           rows="8">
        </ejs-smarttextarea>
    </div>

    <button type="submit" class="btn btn-primary">Save</button>
</form>
```

**Corresponding Page Model (Pages/Index.cshtml.cs):**

```csharp
public class IndexModel : PageModel
{
    public string ArticleContent { get; set; }
    public string Comments { get; set; }

    public void OnPost()
    {
        // Process article content with AI suggestions
        // ArticleContent and Comments are available from form submission
    }
}
```

## Step 7: Configure with User Role

```cshtml
<ejs-smarttextarea id="smartTextArea" 
                   placeholder="Type... (optimized for writers)"
                   user-role="Writer"
                   rows="10">
</ejs-smarttextarea>
```

## Step 8: Test Smart TextArea

1. Run your ASP.NET Core application
2. Start typing in the Smart TextArea
3. AI suggestions appear inline or in popup (depending on configuration)
4. Press Tab or click to accept suggestions
5. Continue typing with AI-powered completions

## Quick Reference

| Configuration | Details |
|---|---|
| **Suggestion Mode** | 'Inline' (default) or 'Popup' |
| **User Roles** | Student, Writer, Developer, Custom |
| **License Key** | Required for production use |
| **CSS Theme** | fluent2, bootstrap4, bootstrap5, tailwind |

## Common Issues and Solutions

| Issue | Solution |
|---|---|
| **Suggestions not appearing** | Verify AI service credentials and configuration |
| **Slow suggestions** | Check API rate limits and response time |
| **Token limit errors** | Reduce context size or use smaller model |
| **CORS errors** | Configure CORS policy in Program.cs |
| **Tag helpers not found** | Verify _ViewImports.cshtml has @addTagHelper directive |

## Next Steps

- **Customize Display:** Configure suggestion modes (see [customization.md](customization.md))
- **Explore Features:** Learn about user roles and custom phrases (see [features.md](features.md))
- **Custom Backend:** Implement custom AI service (see [custom-inference-backend](https://ej2.syncfusion.com/aspnetcore/documentation/smart-textarea/custom-inference-backend))

## Reference

https://ej2.syncfusion.com/aspnetcore/documentation/smart-textarea/getting-started
