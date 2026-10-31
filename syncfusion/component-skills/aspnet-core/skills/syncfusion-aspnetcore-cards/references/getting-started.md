# Getting Started with Card Component

## Prerequisites

Before creating your first Card component in ASP.NET Core, ensure:

- **ASP.NET Core project** (ASP.NET Core 6.0 or later recommended)
- **Syncfusion NuGet packages** installed for ASP.NET Core
- **TagHelpers** registered in your project
- **Syncfusion CSS and JavaScript** resources referenced

## Create ASP.NET Core Project

You have two options to create a project:

### Option 1: Using Microsoft Templates
Follow the official guide: [Create a Razor Pages Web App](https://learn.microsoft.com/en-us/aspnet/core/tutorials/razor-pages/razor-pages-start?view=aspnetcore-8.0&tabs=visual-studio#create-a-razor-pages-web-app)

### Option 2: Using Syncfusion Visual Studio Extension
Use the Syncfusion ASP.NET Core Extension to create a pre-configured project: [Create Project with Syncfusion Extension](https://ej2.syncfusion.com/aspnetcore/documentation/visual-studio-integration/create-project)

## Add Stylesheet

Add the Syncfusion CSS theme to your `_Layout.cshtml` file in the `<head>` section:

```html
<head>
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
</head>
```

## Add ASP.NET Core Card Control

Add the Card component to your Razor page (`~/Pages/Index.cshtml`):

```cshtml
<div class="e-card">
    Sample Card
</div>
```

## Run Your Application

1. Press **Ctrl+F5** (Windows) or **⌘+F5** (macOS) to run the application
2. The page will open in your default web browser
3. You should see a styled card with "Sample Card" text displayed

## Add Header and Content

Expand your basic card by adding a header and content structure:

```html
<div class="e-card">
    <div class="e-card-header">
        <p><strong>Card Title</strong></p>
        <p>Subtitle or description text</p>
    </div>
    <div class="e-card-content">
        Your card content goes here
    </div>
</div>
```

## Understanding the Structure

| Element | Class | Purpose |
|---------|-------|---------|
| Root | `e-card` | Main card container |
| Header | `e-card-header` | Header section wrapper |
| Content | `e-card-content` | Body content area |
| Image | `e-card-image` | Full-width image section |
| Title | `e-card-title` | Image overlay title |
| Actions | `e-card-actions` | Action buttons container |

## Theme Options

Syncfusion provides multiple themes. Change the stylesheet URL to use a different theme:

- `fluent.css` — Modern fluent design (default)
- `bootstrap.css` — Bootstrap-inspired theme
- `bootstrap4.css` — Bootstrap 4 theme
- `material.css` — Material Design theme
- `tailwind.css` — Tailwind-inspired theme

Example:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/material.css" />
```

## Next Steps

Now that you have a basic card:
- Add [headers and content](./header-and-content.md) for more structure
- Include [images](./images-and-dividers.md) for visual appeal
- Add [action buttons](./action-buttons.md) for interactivity
- Explore [horizontal layouts](./horizontal-layout.md) for different arrangements
