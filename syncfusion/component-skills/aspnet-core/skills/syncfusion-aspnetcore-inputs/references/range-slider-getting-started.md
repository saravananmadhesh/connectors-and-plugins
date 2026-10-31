# Range Slider Getting Started — ASP.NET Core

This guide walks you through setting up and creating your first Range Slider component in an ASP.NET Core application.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Adding CSS References](#adding-css-references)
- [Creating Your First Range Slider](#creating-your-first-range-slider))
- [Running the Application](#running-the-application)

---

## Prerequisites

Ensure you have:
- **ASP.NET Core 6.0+** (or 7.0, 8.0)
- **Visual Studio 2022** or later
- Basic understanding of Razor syntax and Tag Helpers
- Syncfusion EJ2-AspNetCore-Inputs package

---

## Project Setup

### Installing the Package

If not already installed, add the Syncfusion NuGet package:

```bash
dotnet add package Syncfusion.EJ2.AspNetCore.Inputs
```

Or through Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.AspNetCore.Inputs
```

### Checking Project File

Verify the package appears in `.csproj`:

```xml
<ItemGroup>
    <PackageReference Include="Syncfusion.EJ2.AspNetCore.Inputs" Version="*" />
</ItemGroup>
```

---

## Adding CSS References

### Step 1: Register Syncfusion Styles and Scripts

In your `_Layout.cshtml` file, add references in the `<head>` section:

```html
<!-- CSS -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/latest/ej2.css" />

<!-- Scripts (at end of body) -->
<script src="https://cdn.syncfusion.com/ej2/latest/ej2.min.js"></script>
```

### Step 2: Register Tag Helper

Add the Syncfusion Tag Helper to `_ViewImports.cshtml`:

```html
@addTagHelper *, Syncfusion.EJ2.AspNetCore
```

### Step 3: Verify Bootstrap

Ensure Bootstrap CSS is included (recommended for layout):

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

---

## Creating Your First Range Slider

### Basic Default Slider

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <h2>My First Slider</h2>

    <ejs-slider id="default" 
                value="30">
    </ejs-slider>
</div>
```

**Output:**
```
My First Range Slider
────────●─────────────────────────
0        30                      100
```

### Range Slider with Step

Add step increments:

**Razor View (CSHTML):**
```html
<ejs-slider id="priceRange" 
                 min="0" 
                 max="1000" 
                 value="500"
                 step="50">
</ejs-slider>
```

### Range Slider with Labels

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <label for="sliderRange" class="form-label">Price Range ($)</label>
    
    <ejs-slider id="sliderRange" 
                     min="0" 
                     max="1000" 
                     value="500"
                     step="10">
    </ejs-slider>
    
    <div class="mt-2">
        <p>Selected Value: <strong id="sliderValue">$500</strong></p>
    </div>
</div>

<script>
    document.getElementById('sliderRange').addEventListener('change', function(e) {
        document.getElementById('sliderValue').textContent = '$' + e.value;
    });
</script>
```

---

## Running the Application

### Build and Run

```bash
dotnet build
dotnet run
```

### Open Browser

Navigate to: `https://localhost:5001`

### Test the Range Slider

- Drag the slider thumb
- Change values using arrow keys (if focused)
- Observe value display update

---

## Common Issues and Solutions

### Range Slider Not Rendering

**Issue:** Slider appears as plain HTML

**Solution:**
- Verify CSS/JS references in `_Layout.cshtml`
- Check Tag Helper registration in `_ViewImports.cshtml`
- Ensure package is installed: `dotnet add package Syncfusion.EJ2.AspNetCore.Inputs`

### Slider Not Responding to Drag

**Issue:** Cannot drag or interact with slider

**Solution:**
- Ensure JavaScript is loaded
- Check browser console for errors
- Verify `ej2.min.js` is loaded before your scripts

### Values Not Updating

**Issue:** Slider value doesn't reflect in display

**Solution:**
- Bind change event to update UI
- Check that `change` or `input` event handler is properly defined

---

## Next Steps

- Explore [Slider Types and Orientation](range-slider-types-and-orientation.md)
- Learn about [Formatting and Limits](range-slider-formatting-and-limits.md)
- Check [Styling and Appearance](range-slider-styling.md)
- Review [Complete API Reference](range-slider-api-reference.md)

---

## See Also

- `range-slider-types-and-orientation.md` — Different slider types
- `range-slider-events-and-methods.md` — Event handling
- `range-slider-styling.md` — Custom styling
- `range-slider-api-reference.md` — Complete API reference
