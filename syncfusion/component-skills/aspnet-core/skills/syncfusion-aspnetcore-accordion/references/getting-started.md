# Getting Started with Accordion

## Table of Contents

- [Prerequisites](#prerequisites)
- [Create ASP.NET Core Project](#create-aspnet-core-project)
- [Install NuGet Package](#install-nuget-package)
- [Register TagHelper](#register-taghelper)
- [Add Stylesheet and Script Resources](#add-stylesheet-and-script-resources)
- [Register Script Manager](#register-script-manager)
- [Add Accordion Control](#add-accordion-control)
- [Understanding the Structure](#understanding-the-structure)
- [Running Your Application](#running-your-application)

---

## Prerequisites

Before you begin implementing the Accordion component, ensure that your development environment meets the following requirements:

- **System Requirements for ASP.NET Core**: Refer to the official Syncfusion documentation for system requirements, including supported .NET versions and Visual Studio versions.
- **Visual Studio**: Use Visual Studio 2019 or later with ASP.NET Core support enabled.
- **NuGet Package Manager**: Ensure you have access to NuGet package manager and can install packages from nuget.org.

The Accordion component is part of the Syncfusion Essential Studio package and requires the `Syncfusion.EJ2.AspNet.Core` NuGet package along with its dependencies: `Newtonsoft.Json` for JSON serialization and `Syncfusion.Licensing` for license validation.

---

## Create ASP.NET Core Project

You can create an ASP.NET Core project using one of two approaches:

### Using Microsoft Templates

1. Open Visual Studio and create a new project
2. Select "ASP.NET Core Web Application" or "ASP.NET Core Web App (Model-View-Controller)"
3. Configure the project settings including project name, location, and target framework
4. Select the appropriate template based on your needs (Razor Pages or MVC)
5. Complete the creation process and wait for the project to load

### Using Syncfusion ASP.NET Core Extension

Syncfusion provides an extension for Visual Studio that streamlines project creation:

1. Install the Syncfusion ASP.NET Core Extension from the Visual Studio Marketplace
2. Create a new project using the Syncfusion project templates
3. The extension automatically configures Syncfusion packages and resources
4. This approach saves time and ensures proper configuration

For detailed instructions on using the Syncfusion extension, consult the official integration documentation.

---

## Install NuGet Package

To add Accordion and other Syncfusion controls to your application, install the `Syncfusion.EJ2.AspNet.Core` NuGet package:

### Via NuGet Package Manager UI

1. Open Visual Studio
2. Navigate to **Tools → NuGet Package Manager → Manage NuGet Packages for Solution**
3. Search for `Syncfusion.EJ2.AspNet.Core`
4. Select the package and click **Install**
5. Accept the license agreements and wait for installation to complete

### Via Package Manager Console

Open the Package Manager Console and execute:

```
Install-Package Syncfusion.EJ2.AspNet.Core -Version <latest-version>
```

Replace `<latest-version>` with the current Syncfusion version number.

### Important Dependencies

The `Syncfusion.EJ2.AspNet.Core` NuGet package has the following dependencies:

- **Newtonsoft.Json**: Required for JSON serialization and deserialization in accordion data binding scenarios
- **Syncfusion.Licensing**: Required for license key validation; ensure you have a valid Syncfusion license

All dependencies are automatically installed when you install the main package.

---

## Register TagHelper

The Syncfusion components, including Accordion, are implemented as TagHelpers for ASP.NET Core. You must register the TagHelper namespace to use Accordion in your Razor views.

### Register in _ViewImports.cshtml

Open the file `~/Pages/_ViewImports.cshtml` (for Razor Pages) or `~/Views/_ViewImports.cshtml` (for MVC) and add the following line at the top:

```csharp
@addTagHelper *, Syncfusion.EJ2
```

This directive registers all Syncfusion TagHelpers from the `Syncfusion.EJ2` namespace. The `*` wildcard imports all tags provided by this assembly. This registration makes the `<ejs-accordion>` and related tags available throughout your application.

### Scope of Registration

- **Razor Pages**: Adding the directive to `~/Pages/_ViewImports.cshtml` makes the TagHelpers available to all pages under the Pages directory
- **MVC**: Adding the directive to `~/Views/_ViewImports.cshtml` makes the TagHelpers available to all views under the Views directory

If you need TagHelpers available only in specific views, you can use the `@addTagHelper` directive in individual view files instead of the global imports file.

---

## Add Stylesheet and Script Resources

The Accordion component requires CSS stylesheets for styling and JavaScript files for functionality. You can reference these resources via CDN (Content Delivery Network) or local files.

### Add Resources to Layout

Open the file `~/Pages/Shared/_Layout.cshtml` (for Razor Pages) or `~/Views/Shared/_Layout.cshtml` (for MVC) and add the stylesheet and script references:

#### In the `<head>` Section

Add the Syncfusion stylesheet reference:

```html
<head>
    ...
    <!-- Syncfusion ASP.NET Core controls styles -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Alternative themes available: bootstrap5.css, material.css, tailwind.css, etc. -->
</head>
```

The `{{ site.ej2version }}` placeholder will be replaced with the current Syncfusion version. Replace it with a specific version number like `22.1.36` or `23.1.36`.

#### Available Themes

Syncfusion provides multiple themes:
- `fluent.css` - Microsoft Fluent Design
- `bootstrap5.css` - Bootstrap 5 Design
- `material.css` - Material Design
- `tailwind.css` - Tailwind Design
- `highcontrast.css` - High Contrast for accessibility

Choose the theme that best matches your application's design requirements.

#### In the `<body>` Section

Add the script reference before the closing `</body>` tag:

```html
<body>
    ...
    <!-- Syncfusion ASP.NET Core controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</body>
```

### Alternatives to CDN

For development or if CDN is not available:

- **NPM Package**: Install via `npm install @syncfusion/ej2-ej2` and bundle locally
- **Custom Resource Generator (CRG)**: Use the Syncfusion CRG tool to generate only the scripts and styles you need, reducing bundle size

---

## Register Script Manager

The Syncfusion script manager must be registered in your layout to enable component interoperability and functionality.

### Add Script Manager to Layout

In the `<body>` section of `~/Pages/Shared/_Layout.cshtml` (Razor Pages) or `~/Views/Shared/_Layout.cshtml` (MVC), add the Syncfusion script manager tag at the end, after all other content:

```cshtml
<body>
    ...
    <!-- Syncfusion ASP.NET Core Script Manager -->
    <ejs-scripts></ejs-scripts>
</body>
```

The `<ejs-scripts>` tag:
- Registers the Syncfusion script manager globally
- Enables communication between TagHelpers and JavaScript components
- Must be placed at the end of the body to ensure all components are loaded first
- Should appear only once per page

### Why Script Manager is Required

The script manager:
- Initializes Syncfusion components in the correct order
- Manages component lifecycle
- Enables data binding and event handling
- Provides access to component APIs
- Ensures compatibility between server-side and client-side component behavior

---

## Add Accordion Control

With prerequisites and resources configured, you can now add the Accordion control to your page.

### Basic Accordion in Razor Page

In your Razor page file (e.g., `~/Pages/Index.cshtml`), add the Accordion TagHelper:

```cshtml
<div class="control_wrapper accordion-control-section">
    <ejs-accordion id="defaultAccordion">
        <e-accordion-accordionitems>
            <e-accordion-accordionitem expanded="true" 
                header="ASP.NET" 
                content="Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework for building Web applications and XML Web services. ASP.NET pages execute on the server and generate markup such as HTML, WML, or XML that is sent to a desktop or mobile browser.">
            </e-accordion-accordionitem>
            <e-accordion-accordionitem 
                header="ASP.NET MVC" 
                content="The Model-View-Controller (MVC) architectural pattern separates an application into three main components: the model, the view, and the controller. The ASP.NET MVC framework provides an alternative to the ASP.NET Web Forms pattern for creating Web applications.">
            </e-accordion-accordionitem>
            <e-accordion-accordionitem 
                header="JavaScript" 
                content="JavaScript (JS) is an interpreted computer programming language. It was originally implemented as part of web browsers so that client-side scripts could interact with the user, control the browser, communicate asynchronously, and alter the document content that was displayed.">
            </e-accordion-accordionitem>
        </e-accordion-accordionitems>
    </ejs-accordion>
</div>
```

### TagHelper Anatomy

- `<ejs-accordion>`: The main accordion container with attributes:
  - `id="defaultAccordion"`: Unique identifier for the control (required for event binding)
  - Additional attributes: `expandMode`, `height`, `width`, etc.

- `<e-accordion-accordionitems>`: Container for all accordion items

- `<e-accordion-accordionitem>`: Individual accordion item with attributes:
  - `header`: The visible header text
  - `content`: The content to display when expanded
  - `expanded="true"`: Renders the item in expanded state (first item in example)

### Minimal Example

Here's the simplest possible accordion:

```cshtml
<ejs-accordion id="simpleAccordion">
    <e-accordion-accordionitems>
        <e-accordion-accordionitem header="Item 1" content="Content 1"></e-accordion-accordionitem>
        <e-accordion-accordionitem header="Item 2" content="Content 2"></e-accordion-accordionitem>
    </e-accordion-accordionitems>
</ejs-accordion>
```

---

## Understanding the Structure

Before running your application, it's helpful to understand how the Accordion markup translates to the rendered component:

### Accordion Container

The `<ejs-accordion>` tag creates the main accordion container:
- Renders as a `<div>` element with the specified `id`
- Applies Syncfusion Accordion CSS classes for styling
- Contains all accordion items and manages their behavior

### Accordion Items

Each `<e-accordion-accordionitem>` creates an expandable/collapsible panel:
- **Header**: The clickable area that users interact with
- **Content**: The area that expands/collapses
- **Expanded State**: Controls whether the item shows content initially

### Rendering Flow

1. The TagHelper processes your markup at compile time
2. Converts TagHelper syntax to standard HTML with Syncfusion classes
3. JavaScript initializes the component when the page loads
4. The accordion is interactive and fully functional

### DOM Structure After Rendering

After rendering, the accordion generates a structure like:

```html
<div id="defaultAccordion" class="e-accordion">
    <div class="e-acrdn-item">
        <div class="e-acrdn-header">ASP.NET</div>
        <div class="e-acrdn-panel" style="display: block;">
            Microsoft ASP.NET is...
        </div>
    </div>
    <!-- More items follow -->
</div>
```

---

## Running Your Application

After setting up the Accordion, run your application to see it in action:

### Debug in Visual Studio

1. Press **Ctrl+F5** (Windows) or **Cmd+F5** (macOS)
2. Visual Studio launches the application in your default browser
3. Navigate to the page containing the Accordion
4. You should see the accordion rendering with clickable headers
5. Click on headers to expand/collapse content

### Expected Behavior

- The first accordion item (with `expanded="true"`) displays its content initially
- Clicking on other headers expands them and collapses the previous item (in Multiple mode)
- The Fluent theme styling makes the accordion visually polished
- Animations smoothly show/hide content

### Troubleshooting Initial Issues

If the accordion doesn't appear:

1. **Check console errors**: Press F12 to open developer tools and check the Console tab for JavaScript errors
2. **Verify script registration**: Ensure `<ejs-scripts>` is in the layout
3. **Verify stylesheet**: Ensure the theme CSS is loaded (check Network tab in DevTools)
4. **Verify TagHelper**: Ensure `@addTagHelper *, Syncfusion.EJ2` is in `_ViewImports.cshtml`
5. **Check NuGet package**: Ensure `Syncfusion.EJ2.AspNet.Core` is installed

### Next Steps

Once your basic accordion is working:
- Explore different expand modes (Single vs Multiple)
- Add data binding to load items from a data source
- Customize animations and styling
- Implement event handlers for user interactions
- Build nested accordions for complex hierarchies

For detailed guidance on these topics, refer to the other reference files in this skill.
