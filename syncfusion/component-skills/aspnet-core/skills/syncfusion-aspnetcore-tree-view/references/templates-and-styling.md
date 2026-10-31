---
name: templates-and-styling
description: Customize TreeView appearance with node templates, icons, CSS styling, themes, and responsive design.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Templates and Styling

## Table of Contents

- [Overview](#overview)
- [Node Templates](#node-templates)
- [Custom Icons](#custom-icons)
- [Icon Positioning](#icon-positioning)
- [CSS Styling](#css-styling)
- [Themes](#themes)
- [Responsive Design](#responsive-design)
- [Template Binding](#template-binding)
- [Conditional Styling](#conditional-styling)
- [Custom Animations](#custom-animations)
- [Advanced Patterns](#advanced-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

TreeView customization includes:
- **Node Templates**: Custom HTML for nodes
- **Icons**: Built-in or custom icons
- **Styling**: CSS classes and inline styles
- **Themes**: Pre-built or custom themes
- **Responsive**: Mobile-friendly layout
- **Templates**: Data binding in templates

## Node Templates

### Basic Node Template

**C# (TreeViewController.cs)**:
```csharp
public IActionResult NodeTemplate()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Item 1",
        description = "This is item 1",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Subitem 1.1", description = "Details" }
        }
    });
    treeData.Add(new { 
        id = 2, 
        name = "Item 2",
        description = "This is item 2"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
@{
    var nodeTemplate = "<div class=\"node-content-wrapper\"><span class=\"node-title\">${name}</span><span class=\"node-subtitle\">${description}</span></div>";
}

@Html.EJS().TreeView("treeTemplate")
    .NodeTemplate(nodeTemplate)
    .Fields(field => field.Id("id").Text("name").Child("child").DataSource(ViewBag.dataSource))
    .Render()

<style>
    .node-content-wrapper {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 8px 0;
    }
    
    .node-title {
        font-weight: 500;
        color: #333;
        line-height: 20px;
    }
    
    .node-subtitle {
        font-size: 12px;
        color: #999;
        line-height: 16px;
    }
</style>

<script>
    var treeObj = document.getElementById('treeTemplate').ej2_instances[0];
</script>
```

### Template with Badge

**C# (TreeViewController.cs)**:
```csharp
public IActionResult BadgeTemplate()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Notifications", 
        count = 5,
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Unread", count = 3 },
            new { id = 12, name = "Read", count = 2 }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
@{
    var badgeTemplate = "<div class=\"badge-template\"><span class=\"badge-title\">${name}</span><span class=\"badge-count\">${count}</span></div>";
}

@Html.EJS().TreeView("treeBadge")
    .CssClass("badge-tree")
    .NodeTemplate(badgeTemplate)
    .Fields(field => field.Id("id").Text("name").Child("child").DataSource(ViewBag.dataSource))
    .Render()

<style>
    .badge-tree.e-treeview .e-fullrow {
        height: auto;
    }

    .badge-tree.e-treeview .e-list-text {
        line-height: normal;
    }

    .badge-template {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 10px;
        padding: 10px 0;
    }
    
    .badge-title {
        flex: 1;
        font-weight: 500;
    }
    
    .badge-count {
        display: inline-block;
        background-color: #007bff;
        color: white;
        padding: 4px 10px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: 500;
        min-width: 28px;
        text-align: center;
    }
</style>

<script>
    var treeObj = document.getElementById('treeBadge').ej2_instances[0];
</script>
```

### Template with Status Indicator

**C# (TreeViewController.cs)**:
```csharp
public IActionResult StatusIndicatorTemplate()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Server 1", 
        status = "online",
        statusColor = "#4caf50",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Database", status = "online", statusColor = "#4caf50" },
            new { id = 12, name = "API", status = "offline", statusColor = "#f44336" }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
@{
    var statusTemplate = "<div class=\"status-node-wrapper\"><span class=\"status-indicator\" style=\"background-color: ${statusColor};\"></span><span class=\"status-title\">${name}</span><span class=\"status-badge\">${status}</span></div>";
}

@Html.EJS().TreeView("treeStatus")
    .CssClass("status-tree")
    .NodeTemplate(statusTemplate)
    .Fields(field => field.Id("id").Text("name").Child("child").DataSource(ViewBag.dataSource))
    .Render()

<style>
    .status-tree.e-treeview .e-fullrow {
        height: auto;
    }

    .status-tree.e-treeview .e-list-text {
        line-height: normal;
    }

    .status-node-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        width: 100%;
        padding: 10px 0;
    }
    
    .status-indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
    }
    
    .status-title {
        flex: 1;
        font-weight: 500;
    }
    
    .status-badge {
        font-size: 11px;
        color: #666;
        text-transform: capitalize;
        font-weight: 500;
    }
</style>

<script>
    var treeObj = document.getElementById('treeStatus').ej2_instances[0];
</script>
```

## Custom Icons

### Built-in Icon Classes

**C# (TreeViewController.cs)**:
```csharp
public IActionResult BuiltInIconsView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Folder", 
        iconCss = "e-icons e-folder",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Document", iconCss = "e-icons e-document" },
            new { id = 12, name = "Image", iconCss = "e-icons e-image" }
        }
    });
    treeData.Add(new { 
        id = 2, 
        name = "File", 
        iconCss = "e-icons e-file"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeIcons">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" iconCss="iconCss" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    var treeObj = document.getElementById('treeIcons').ej2_instances[0];
    console.log('TreeView with icons initialized');
</script>
```

### Custom Image Icons

**C# (TreeViewController.cs)**:
```csharp
public IActionResult CustomImageIconsView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Projects", 
        icon = "folder.png",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Website", icon = "web.png" },
            new { id = 12, name = "API", icon = "api.png" }
        }
    });
    treeData.Add(new { 
        id = 2, 
        name = "Documents", 
        icon = "doc.png"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
@{
    var iconTemplate = "<div class=\"custom-icon-wrapper\"><img src=\"/images/${icon}\" alt=\"${name}\" class=\"node-custom-icon\" /><span class=\"icon-label\">${name}</span></div>";
}

@Html.EJS().TreeView("treeCustomIcons")
    .NodeTemplate(iconTemplate)
    .Fields(field => field.Id("id").Text("name").Child("child").DataSource(ViewBag.dataSource))
    .Render()

<style>
    .custom-icon-wrapper {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 0;
    }
    
    .node-custom-icon {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        object-fit: cover;
    }
    
    .icon-label {
        font-weight: 500;
    }
</style>

<script>
    var treeObj = document.getElementById('treeCustomIcons').ej2_instances[0];
</script>
```

## Icon Positioning

### Left Icon (Default)

**Razor View**:
```html
<ejs-treeview id="treeLeftIcon" showCheckBox="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" iconCss="icon"></e-treeview-fields>
</ejs-treeview>
```

### Right Icon/Actions

**C# (TreeViewController.cs)**:
```csharp
public IActionResult RightActionsTemplate()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Item 1",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Subitem 1.1" }
        }
    });
    treeData.Add(new { 
        id = 2, 
        name = "Item 2"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
@{
    var actionTemplate = "<div class=\"action-node-wrapper\"><span class=\"action-title\">${name}</span><div class=\"node-action-buttons\"><button class=\"action-btn edit-btn\" onclick=\"onEditClick(event)\">✏️</button><button class=\"action-btn delete-btn\" onclick=\"onDeleteClick(event)\">🗑️</button></div></div>";
}

@Html.EJS().TreeView("treeRightActions")
    .CssClass("action-tree")
    .NodeTemplate(actionTemplate)
    .Fields(field => field.Id("id").Text("name").Child("child").DataSource(ViewBag.dataSource))
    .Render()

<style>
    .action-tree.e-treeview .e-fullrow {
        height: auto;
    }

    .action-tree.e-treeview .e-list-text {
        line-height: normal;
    }

    .action-node-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 15px;
        padding: 10px 0;
    }
    
    .action-title {
        flex: 1;
        font-weight: 500;
    }
    
    .node-action-buttons {
        display: flex;
        gap: 8px;
        flex-shrink: 0;
    }
    
    .action-btn {
        padding: 5px 10px;
        font-size: 13px;
        border: 1px solid #ddd;
        background-color: #f5f5f5;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.2s;
    }
    
    .action-btn:hover {
        background-color: #e0e0e0;
        border-color: #999;
    }
</style>

<script>
    function onEditClick(event) {
        event.stopPropagation();
        var treeObj = document.getElementById('treeRightActions').ej2_instances[0];
        var li = event.target.closest('.e-list-item');
        console.log('Edit node');
    }
    
    function onDeleteClick(event) {
        event.stopPropagation();
        var treeObj = document.getElementById('treeRightActions').ej2_instances[0];
        var li = event.target.closest('.e-list-item');
        console.log('Delete node');
    }
</script>
```

## CSS Styling

### Basic CSS Customization

**C# (TreeViewController.cs)**:
```csharp
public IActionResult CSSCustomizationView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Item 1"
    });
    treeData.Add(new { 
        id = 2, 
        name = "Item 2"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeCSS" class="custom-tree">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<style>
    /* Custom TreeView styling */
    .custom-tree {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    
    .custom-tree .e-list-item .e-node-content {
        font-weight: 500;
        color: #333;
        padding: 6px 8px;
    }
    
    .custom-tree .e-list-item:hover > .e-node-content {
        background-color: #f0f0f0;
    }
    
    .custom-tree .e-list-item.e-active > .e-node-content {
        background-color: #e3f2fd;
        border-left: 3px solid #2196f3;
        padding-left: 5px;
    }
</style>
```

### Node Level Styling

**C# (TreeViewController.cs)**:
```csharp
public IActionResult NodeLevelStylingView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Level 1 - Parent",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Level 2 - Child", hasChild = true, child = new object[] {
                new { id = 111, name = "Level 3 - Grandchild" }
            }}
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeLevelStyle">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<style>
    /* Level 1 - Parent nodes */
    .e-treeview .e-ul > .e-list-item > .e-node-content {
        font-weight: bold;
        font-size: 14px;
        background-color: #f9f9f9;
    }
    
    /* Level 2 - Child nodes */
    .e-treeview .e-ul .e-ul > .e-list-item > .e-node-content {
        font-size: 12px;
        color: #666;
        padding-left: 20px;
    }
    
    /* Level 3+ - Grandchild nodes */
    .e-treeview .e-ul .e-ul .e-ul > .e-list-item > .e-node-content {
        font-size: 11px;
        color: #999;
        font-style: italic;
        padding-left: 40px;
    }
</style>
```

### Hover and Active States

**C# (TreeViewController.cs)**:
```csharp
public IActionResult HoverActiveStatesView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Item 1"
    });
    treeData.Add(new { 
        id = 2, 
        name = "Item 2"
    });
    treeData.Add(new { 
        id = 3, 
        name = "Item 3"
    });
    
    ViewBag.dataSource = treeData;
    ViewBag.selectedNodes = new List<string> { "1" };
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeStateStyle" selectedNodes="ViewBag.selectedNodes">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<style>
    /* Hover state */
    .e-treeview .e-list-item:hover > .e-node-content {
        background-color: #fff9e6;
        transition: background-color 0.2s ease;
    }
    
    /* Active/Selected state */
    .e-treeview .e-list-item.e-active > .e-node-content {
        background-color: #2196f3;
        color: white;
        font-weight: 500;
    }
    
    /* Focus state */
    .e-treeview .e-list-item.e-active:focus > .e-node-content {
        outline: 2px solid #1976d2;
        outline-offset: -2px;
    }
</style>
```

## Themes

### Material Theme

**C# (TreeViewController.cs)**:
```csharp
public IActionResult MaterialThemeView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Item 1"
    });
    treeData.Add(new { 
        id = 2, 
        name = "Item 2"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Layout.cshtml (Theme CSS in Layout)**:
```html
<!-- Include Material theme CSS -->
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
```

**Razor View**:
```html
<ejs-treeview id="treeMaterial">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    var treeObj = document.getElementById('treeMaterial').ej2_instances[0];
    console.log('Material theme applied');
</script>
```

### Bootstrap Theme

**Layout.cshtml (Theme CSS in Layout)**:
```html
<!-- Include Bootstrap theme CSS -->
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
```

**Razor View**:
```html
<ejs-treeview id="treeBootstrap">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>
```

### High Contrast Theme

**Layout.cshtml (Theme CSS in Layout)**:
```html
<!-- Include High Contrast theme CSS -->
<link href="url" rel="stylesheet" />
<link href="url" rel="stylesheet" />
```

**Razor View**:
```html
<ejs-treeview id="treeHighContrast">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<script>
    var treeObj = document.getElementById('treeHighContrast').ej2_instances[0];
    console.log('High contrast theme applied');
</script>
```

## Responsive Design

### Mobile Friendly Tree

**C# (TreeViewController.cs)**:
```csharp
public IActionResult ResponsiveView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Desktop App",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Windows" },
            new { id = 12, name = "macOS" }
        }
    });
    treeData.Add(new { 
        id = 2, 
        name = "Mobile App",
        hasChild = true,
        child = new object[] {
            new { id = 21, name = "iOS" },
            new { id = 22, name = "Android" }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeMobile" class="mobile-responsive-tree" fullRowNavigable="true">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<style>
    .mobile-responsive-tree {
        max-width: 100%;
        width: 100%;
    }
    
    /* Tablet and Desktop */
    @media (min-width: 768px) {
        .e-treeview .e-list-item > .e-node-content {
            padding: 8px 12px;
        }
    }
    
    /* Tablet (768px - 1024px) */
    @media (max-width: 1024px) {
        .e-treeview .e-list-item > .e-node-content {
            padding: 10px 8px;
        }
    }
    
    /* Mobile (below 768px) */
    @media (max-width: 768px) {
        .e-treeview .e-list-item > .e-node-content {
            padding: 12px 10px;
            font-size: 14px;
        }
        
        .e-treeview .e-icons {
            font-size: 18px;
        }
    }
    
    /* Small Mobile (below 480px) */
    @media (max-width: 480px) {
        .e-treeview .e-list-item > .e-node-content {
            padding: 12px 8px;
            font-size: 13px;
        }
        
        .e-treeview .e-icons {
            font-size: 16px;
        }
        
        .node-actions {
            display: none;
        }
    }
</style>
```

## Template Binding

### Bind Data to Template

**C# (TreeViewController.cs)**:
```csharp
public IActionResult DataBindingTemplate()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Team",
        description = "Company Team",
        type = "Folder",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "John Doe", description = "Senior Developer", type = "User" },
            new { id = 12, name = "Jane Smith", description = "Designer", type = "User" }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
@{
    var bindTemplate = "<div class=\"data-bound-template\"><span class=\"template-name\">${name}</span><span class=\"template-description\">${description}</span><span class=\"template-type\">${type}</span></div>";
}

@Html.EJS().TreeView("treeBind")
    .NodeTemplate(bindTemplate)
    .Fields(field => field.Id("id").Text("name").Child("child").DataSource(ViewBag.dataSource))
    .Render()

<style>
    .data-bound-template {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 8px 0;
    }
    
    .template-name {
        font-weight: 500;
        color: #333;
    }
    
    .template-description {
        font-size: 12px;
        color: #999;
    }
    
    .template-type {
        font-size: 11px;
        color: #2196f3;
        font-weight: 500;
    }
</style>

<script>
    var treeObj = document.getElementById('treeBind').ej2_instances[0];
</script>
```

## Conditional Styling

### Style Based on Data

**C# (TreeViewController.cs)**:
```csharp
public IActionResult ConditionalStylingView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Feature 1",
        status = "active",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Component A", status = "active" },
            new { id = 12, name = "Component B", status = "inactive" }
        }
    });
    treeData.Add(new { 
        id = 2, 
        name = "Feature 2",
        status = "inactive"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
@{
    var conditionalTemplate = "<div class=\"conditional-node\" data-status=\"${status}\"><span class=\"status-indicator\"></span><span class=\"status-text\">${name}</span></div>";
}

@Html.EJS().TreeView("treeConditional")
    .NodeTemplate(conditionalTemplate)
    .Fields(field => field.Id("id").Text("name").Child("child").DataSource(ViewBag.dataSource))
    .Render()

<style>
    .conditional-node {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 6px 0;
    }
    
    .status-indicator {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }
    
    .status-text {
        flex: 1;
    }
    
    /* Active status */
    .conditional-node[data-status="active"] {
        color: #4caf50;
        font-weight: 500;
    }
    
    .conditional-node[data-status="active"] .status-indicator {
        background-color: #4caf50;
    }
    
    /* Inactive status */
    .conditional-node[data-status="inactive"] {
        color: #999;
        text-decoration: line-through;
    }
    
    .conditional-node[data-status="inactive"] .status-indicator {
        background-color: #999;
    }
</style>

<script>
    var treeObj = document.getElementById('treeConditional').ej2_instances[0];
</script>
```

## Custom Animations

### Expand Animation

**C# (TreeViewController.cs)**:
```csharp
public IActionResult AnimatedExpandView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Parent 1",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Child 1.1" },
            new { id = 12, name = "Child 1.2" }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeAnimate" 
    animation="@(new { 
        expand = new { duration = 500, easing = "ease-out" }, 
        collapse = new { duration = 500, easing = "ease-in" } 
    })">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<script>
    var treeObj = document.getElementById('treeAnimate').ej2_instances[0];
    console.log('Animation configured');
</script>
```

### Fade Animation

**C# (TreeViewController.cs)**:
```csharp
public IActionResult FadeAnimationView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Fade Effect 1"
    });
    treeData.Add(new { 
        id = 2, 
        name = "Fade Effect 2"
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeFade" class="fade-animation">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name"></e-treeview-fields>
</ejs-treeview>

<style>
    .fade-animation .e-list-item {
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .fade-animation .e-list-item:hover {
        opacity: 0.85;
    }
    
    .fade-animation .e-list-item.e-active {
        opacity: 1;
    }
</style>
```

## Advanced Patterns

### Pattern: Action Buttons on Hover

**C# (TreeViewController.cs)**:
```csharp
public IActionResult HoverActionsPatternView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Project Alpha",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Task 1" },
            new { id = 12, name = "Task 2" }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
@{
    var hoverTemplate = "<div class=\"hover-action-wrapper\"><span class=\"action-item-name\">${name}</span><div class=\"hover-action-buttons\"><button class=\"action-icon-btn\" onclick=\"onEdit(event)\">✏️</button><button class=\"action-icon-btn\" onclick=\"onDelete(event)\">🗑️</button></div></div>";
}

@Html.EJS().TreeView("treeHoverActions")
    .CssClass("hover-action-tree")
    .NodeTemplate(hoverTemplate)
    .Fields(field => field.Id("id").Text("name").Child("child").DataSource(ViewBag.dataSource))
    .Render()

<style>
    .hover-action-tree.e-treeview .e-fullrow {
        height: auto;
    }

    .hover-action-tree.e-treeview .e-list-text {
        line-height: normal;
    }

    .hover-action-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        gap: 12px;
        padding: 10px 0;
    }
    
    .action-item-name {
        flex: 1;
        font-weight: 500;
    }
    
    .hover-action-buttons {
        display: none;
        gap: 6px;
        flex-shrink: 0;
    }
    
    .hover-action-wrapper:hover .hover-action-buttons {
        display: flex;
    }
    
    .action-icon-btn {
        background: none;
        border: 1px solid #ddd;
        cursor: pointer;
        font-size: 14px;
        padding: 5px 8px;
        opacity: 0.7;
        transition: all 0.2s;
        border-radius: 3px;
        background-color: #f5f5f5;
    }
    
    .action-icon-btn:hover {
        opacity: 1;
        background-color: #e0e0e0;
        border-color: #999;
    }
</style>

<script>
    function onEdit(event) {
        event.stopPropagation();
        var treeObj = document.getElementById('treeHoverActions').ej2_instances[0];
        var li = event.target.closest('.e-list-item');
        console.log('Edit item');
    }
    
    function onDelete(event) {
        event.stopPropagation();
        var treeObj = document.getElementById('treeHoverActions').ej2_instances[0];
        var li = event.target.closest('.e-list-item');
        console.log('Delete item');
    }
</script>
```

### Pattern: Custom Level Colors

**C# (TreeViewController.cs)**:
```csharp
public IActionResult CustomLevelColorsView()
{
    List<object> treeData = new List<object>();
    treeData.Add(new { 
        id = 1, 
        name = "Level 1",
        hasChild = true,
        child = new object[] {
            new { id = 11, name = "Level 2 A", hasChild = true, child = new object[] {
                new { id = 111, name = "Level 3" }
            }},
            new { id = 12, name = "Level 2 B" }
        }
    });
    
    ViewBag.dataSource = treeData;
    return View();
}
```

**Razor View**:
```html
<ejs-treeview id="treeColorLevels" class="color-levels" nodeClicked="onNodeClicked">
    <e-treeview-fields dataSource="ViewBag.dataSource" id="id" text="name" child="child"></e-treeview-fields>
</ejs-treeview>

<style>
    /* Level 1 - Red */
    .color-levels > .e-ul > .e-list-item > .e-node-content {
        background-color: #ffebee;
        color: #c62828;
    }
    
    /* Level 2 - Blue */
    .color-levels .e-ul > .e-ul > .e-list-item > .e-node-content {
        background-color: #e3f2fd;
        color: #0d47a1;
    }
    
    /* Level 3 - Green */
    .color-levels .e-ul > .e-ul > .e-ul > .e-list-item > .e-node-content {
        background-color: #f1f8e9;
        color: #33691e;
    }
    
    /* Level 4+ - Orange */
    .color-levels .e-ul > .e-ul > .e-ul > .e-ul > .e-list-item > .e-node-content {
        background-color: #fff3e0;
        color: #e65100;
    }
</style>

<script>
    function onNodeClicked(args) {
        console.log('Clicked node at level:', getNodeLevel(args.node));
    }
    
    function getNodeLevel(node) {
        var level = 0;
        var parent = node.closest('.e-list-item');
        while (parent) {
            parent = parent.closest('.e-ul')?.closest('.e-list-item');
            if (parent) level++;
        }
        return level;
    }
</script>
```

## Troubleshooting

### Issue: Template Not Rendering

**Problem**: Template shows raw HTML instead of formatted output

**Solutions**:
1. Verify template syntax: `${fieldName}`
2. Check field names match data
3. Ensure CSS is loaded
4. Check browser console for errors

**Debug**:
```html
<script>
    var treeObj = document.getElementById('treeview').ej2_instances[0];
    console.log('Template:', treeObj.treeTemplate);
    console.log('Data:', treeObj.treeData);
</script>
```

### Issue: Styling Not Applied

**Problem**: CSS changes don't appear

**Solutions**:
1. Check CSS specificity
2. Verify element class names
3. Use browser DevTools to inspect
4. Clear cache and reload

---

**Next Steps**: Explore related features:
- [Node Templates](node-templates.md) - Advanced template patterns
- [Themes](themes.md) - Theme customization
- [Responsive Design](responsive-design.md) - Mobile optimization
