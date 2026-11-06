# Getting Started with ASP.NET Core SpeechToText Control

## Install Syncfusion ASP.NET Core Package

### Via NuGet Package Manager

1. Open Tools → NuGet Package Manager → Manage NuGet Packages for Solution
2. Search for `Syncfusion.EJ2.AspNet.Core`
3. Select version and click Install

## Add Syncfusion Tag Helper

Open `~/Pages/_ViewImports.cshtml` and add:

```razor
@addTagHelper *, Syncfusion.EJ2
```

## Add Stylesheet and Script Resources

Open `~/Pages/Shared/_Layout.cshtml` and add to `<head>`:

```html
<head>
    ...
    <!-- Syncfusion CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/27.1.50/fluent.css" />
    
    <!-- Syncfusion Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/27.1.50/dist/ej2.min.js"></script>
</head>
```

### Available Themes

- `fluent.css` - Modern Fluent design
- `bootstrap5.css` - Bootstrap 5 theme
- `material.css` - Material Design
- `tailwind.css` - Tailwind CSS
- `bootstrap.css` - Bootstrap theme

## Register Script Manager

Add to the end of `<body>` in `_Layout.cshtml`:

```html
<body>
    ...
    <!-- Syncfusion Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

## First Implementation

### Basic SpeechToText Control

In `~/Pages/Index.cshtml`:

```razor
@page
@using Syncfusion.EJ2.Inputs

<div id="speechtotext-container" style="padding: 20px;">
    <h2>Speech to Text Demo</h2>
    <p>Click the microphone button to start speaking:</p>
    
    <ejs-speechtotext id="speech-to-text" 
        transcriptChanged="onTranscriptChanged">
    </ejs-speechtotext>
    
    <p style="margin-top: 20px;">Transcribed Text:</p>
    <ejs-textarea id="output-textarea" 
        rows="5" 
        cols="50" 
        value="" 
        resizeMode="None"
        placeholder="Your speech will appear here...">
    </ejs-textarea>
</div>

<script>
    function onTranscriptChanged(args) {
        var textareaObj = ej.base.getComponent(
            document.getElementById("output-textarea"), 
            "textarea"
        );
        textareaObj.value = args.transcript;
    }
</script>

<style>
    #speechtotext-container {
        max-width: 600px;
        margin: 0 auto;
    }
</style>
```

## With Button Customization

```razor
@page
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-to-text" 
    transcriptChanged="onTranscriptChanged">
    <e-speechtotext-buttonSettings 
        content="Start Listening" 
        stopContent="Stop Listening"
        iconCss="e-icons e-play"
        stopIconCss="e-icons e-pause"
        iconPosition="Right"
        isPrimary="true">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>

<ejs-textarea id="output-textarea" rows="5" cols="50"></ejs-textarea>

<script>
    function onTranscriptChanged(args) {
        var textarea = ej.base.getComponent(
            document.getElementById("output-textarea"), 
            "textarea"
        );
        textarea.value = args.transcript;
    }
</script>
```

## Verify the Control Renders

You should see:
1. A microphone button
2. Ability to click the button to start speaking
3. Text appearing as you speak or after you finish
4. A text area displaying the transcribed text

If the control doesn't appear:
- Check CSS imports in `_Layout.cshtml`
- Verify `<ejs-scripts></ejs-scripts>` is in layout
- Check browser console for JavaScript errors
- Ensure `@addTagHelper *, Syncfusion.EJ2` is in `_ViewImports.cshtml`

## License Registration

For production, register your Syncfusion license key in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddRazorPages();

var app = builder.Build();

// Configure middleware
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

// Register License
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");

app.MapRazorPages();

app.Run();
```

## Common Setup Issues

### Issue: Tag Helper not recognized

**Solution:** Ensure `@addTagHelper *, Syncfusion.EJ2` is in `_ViewImports.cshtml`

### Issue: Scripts not loading

**Solution:** Verify CDN URLs are correct and internet connection is available

### Issue: Styling looks wrong

**Solution:** Ensure CSS file URL matches your Syncfusion version

