# Getting Started — Syncfusion ASP.NET MVC Ribbon

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Namespace Registration](#namespace-registration)
- [Stylesheet and Script References](#stylesheet-and-script-references)
- [ScriptManager Registration](#scriptmanager-registration)
- [Basic Ribbon Setup](#basic-ribbon-setup)
- [Full Working Example](#full-working-example)

---

## Prerequisites

- ASP.NET MVC 5 application (Visual Studio)
- NuGet package manager

---

## Installation

Install the Syncfusion EJ2 MVC5 NuGet package via the Package Manager Console:

```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version {{ site.ej2version }}
```

> The package depends on `Newtonsoft.Json` (JSON serialization) and `Syncfusion.Licensing` (license key validation).

---

## Namespace Registration

Add the `Syncfusion.EJ2` namespace to `Views/Web.config` so HTML helpers are available in all views:

```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

---

## Stylesheet and Script References

Add Syncfusion theme CSS and the bundled EJ2 script inside `<head>` in `~/Views/Shared/_Layout.cshtml`:

```html
<head>
    <!-- Syncfusion ASP.NET MVC controls styles (Fluent theme) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
    <!-- Syncfusion ASP.NET MVC controls scripts -->
    <script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
</head>
```

> Alternative themes: `material.css`, `bootstrap5.css`, `tailwind.css`. Use CRG or NPM for custom bundles.

---

## ScriptManager Registration

Register the EJ2 ScriptManager at the end of `<body>` in `_Layout.cshtml`:

```cshtml
<body>
    ...
    @Html.EJS().ScriptManager()
</body>
```

---

## Root Ribbon Configuration

### Setting Initial Active Tab

Use `SelectedTab` to set which tab displays by default on page load:

```cshtml
@Html.EJS().Ribbon("ribbon").SelectedTab(1).Tabs(tab =>
{
    tab.Header("Home").Add();
    tab.Header("Insert").Add();     // This tab will be active initially
}).Render()
```

### Ribbon Width

Set a fixed or responsive width for the entire ribbon:

```cshtml
@Html.EJS().Ribbon("ribbon").Width("100%").Tabs(...).Render()
```

### CSS Class for Theming

Apply custom CSS by adding a `CssClass` to the ribbon container:

```cshtml
@Html.EJS().Ribbon("ribbon").CssClass("my-ribbon-theme").Tabs(...).Render()
```

```css
.my-ribbon-theme .e-ribbon {
    background-color: #f5f5f5;
    border-bottom: 2px solid #0078d4;
}
```

### Internationalization (i18n)

Set the `Locale` property to localize keytips and UI strings:

```cshtml
@Html.EJS().Ribbon("ribbon").Locale("es").Tabs(...).Render()  // Spanish
@Html.EJS().Ribbon("ribbon").Locale("fr").Tabs(...).Render()  // French
@Html.EJS().Ribbon("ribbon").Locale("de").Tabs(...).Render()  // German
```

### Right-to-Left (RTL) Support

Enable RTL layout for Arabic, Hebrew, and other right-to-left languages:

```cshtml
@Html.EJS().Ribbon("ribbon").EnableRtl(true).Tabs(...).Render()
```

### Persistence (State Saving)

Enable automatic persistence of the ribbon state (active tab, layout, collapsed state) to browser localStorage:

```cshtml
@Html.EJS().Ribbon("ribbon").EnablePersistence(true).Tabs(...).Render()
```

The ribbon will remember:
- Which tab was last selected
- Whether the ribbon was collapsed/minimized
- The active layout (Classic/Simplified)

### Tab Transition Animation

Control the animation effect when switching tabs:

```cshtml
@Html.EJS().Ribbon("ribbon").TabAnimation(animation => 
{
    animation.Effect("SlideLeftIn").Duration(250).Easing("Linear");
}).Tabs(...).Render()
```

Supported effects: `None`, `SlideLeftIn`, `SlideRightIn`, `SlideUpIn`, `SlideDownIn`, `FadeIn`, `ZoomIn`.

---

## Basic Ribbon Setup

### Step 1: Add a Tab

```cshtml
@Html.EJS().Ribbon("ribbon").Tabs(tab =>
{
    tab.Header("Home").Add();
}).Render()
```

### Step 2: Add a Group

```cshtml
@using Syncfusion.EJ2.Ribbon

@Html.EJS().Ribbon("ribbon").Tabs(tab =>
{
    tab.Header("Home").Groups(groups =>
    {
        groups.Header("Clipboard").Orientation(ItemOrientation.Row).Add();
    }).Add();
}).Render()
```

### Step 3: Add Items

```cshtml
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@Html.EJS().Ribbon("ribbon").Tabs(tab =>
{
    tab.Header("Home").Groups(groups =>
    {
        groups.Header("Clipboard").Collections(collection =>
        {
            collection.Items(items =>
            {
                items.Type(RibbonItemType.Button).ButtonSettings(button =>
                {
                    button.IconCss("e-icons e-paste").Content("Paste");
                }).Add();
            }).Add();
            collection.Items(items =>
            {
                items.Type(RibbonItemType.Button).ButtonSettings(button =>
                {
                    button.IconCss("e-icons e-cut").Content("Cut");
                }).Add();
                items.Type(RibbonItemType.Button).ButtonSettings(button =>
                {
                    button.IconCss("e-icons e-copy").Content("Copy");
                }).Add();
            }).Add();
        }).Add();
    }).Add();
}).Render()
```

---

## Full Working Example

A production-ready ribbon with File Menu, multiple tabs, font group (Row orientation), and view checkboxes:

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    List<MenuItem> pasteOptions = new List<MenuItem>() {
        new MenuItem { Text = "Keep Source Format" },
        new MenuItem { Text = "Merge format" },
        new MenuItem { Text = "Keep text only" }
    };
    List<MenuItem> tableOptions = new List<MenuItem>() {
        new MenuItem { Text = "Insert Table" },
        new MenuItem { Text = "This device" },
        new MenuItem { Text = "Convert Table" },
        new MenuItem { Text = "Excel SpreadSheet" }
    };
    List<string> fontSize = new List<string>() { "8", "9", "10", "11", "12", "14", "16", "18", "20", "24", "28", "36", "48", "72" };
    List<string> fontStyle = new List<string>() { "Algerian", "Arial", "Calibri", "Cambria", "Courier New", "Georgia", "Impact", "Segoe UI", "Times New Roman", "Verdana" };
    List<MenuItem> fileOptions = new List<MenuItem>() {
        new MenuItem { Text = "New", IconCss = "e-icons e-file-new", Id = "new" },
        new MenuItem { Text = "Open", IconCss = "e-icons e-folder-open", Id = "open" },
        new MenuItem { Text = "Rename", IconCss = "e-icons e-rename", Id = "rename" },
        new MenuItem { Text = "Save as", IconCss = "e-icons e-save", Id = "save" }
    };
}

@Html.EJS().Ribbon("ribbon").FileMenu(file =>
{
    file.Text("File").Visible(true).MenuItems(fileOptions);
}).Tabs(tab =>
{
    tab.Header("Home").Groups(group =>
    {
        group.Header("Clipboard").ShowLauncherIcon(true).GroupIconCss("e-icons e-paste").Collections(collection =>
        {
            collection.Items(items =>
            {
                items.Type(RibbonItemType.SplitButton).SplitButtonSettings(sb =>
                {
                    sb.IconCss("e-icons e-paste").Items(pasteOptions).Content("Paste");
                }).Add();
            }).Add();
            collection.Items(items =>
            {
                items.Type(RibbonItemType.Button).ButtonSettings(b => { b.IconCss("e-icons e-cut").Content("Cut"); }).Add();
                items.Type(RibbonItemType.Button).ButtonSettings(b => { b.IconCss("e-icons e-copy").Content("Copy"); }).Add();
                items.Type(RibbonItemType.Button).ButtonSettings(b => { b.IconCss("e-icons e-format-painter").Content("Format Painter"); }).Add();
            }).Add();
        }).Add();
        group.Header("Font").EnableGroupOverflow(true).Orientation(ItemOrientation.Row).GroupIconCss("e-icons e-bold").Collections(collection =>
        {
            collection.Items(items =>
            {
                items.Type(RibbonItemType.ComboBox).ComboBoxSettings(cb => { cb.DataSource(fontStyle).Index(3).AllowFiltering(true).Width("150px"); }).Add();
                items.Type(RibbonItemType.ComboBox).ComboBoxSettings(cb => { cb.DataSource(fontSize).Index(3).Width("65px"); }).Add();
            }).Add();
        }).Add();
        group.Header("Editor").GroupIconCss("e-icons e-edit").Collections(collection =>
        {
            collection.Items(items =>
            {
                items.Type(RibbonItemType.Button).ButtonSettings(b => { b.Content("Editor").IconCss("e-icons e-edit"); }).Add();
            }).Add();
        }).Add();
    }).Add();
    tab.Header("Insert").Groups(groups =>
    {
        groups.Header("Tables").Collections(collections =>
        {
            collections.Items(items =>
            {
                items.Type(RibbonItemType.DropDown).DropDownSettings(dd =>
                {
                    dd.IconCss("e-icons e-table").Content("Table").Items(tableOptions);
                }).Add();
            }).Add();
        }).Add();
    }).Add();
    tab.Header("View").Groups(groups =>
    {
        groups.Header("Show").Collections(collections =>
        {
            collections.Items(items =>
            {
                items.Type(RibbonItemType.CheckBox).CheckBoxSettings(cb => { cb.Label("Ruler").Checked(false); }).Add();
                items.Type(RibbonItemType.CheckBox).CheckBoxSettings(cb => { cb.Label("Gridlines").Checked(false); }).Add();
                items.Type(RibbonItemType.CheckBox).CheckBoxSettings(cb => { cb.Label("Navigation Pane").Checked(true); }).Add();
            }).Add();
        }).Add();
    }).Add();
}).Render()
```
