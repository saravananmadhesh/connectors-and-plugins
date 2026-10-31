# Responsive Design in ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Adaptive UI](#adaptive-ui)
- [Mobile Optimization](#mobile-optimization)
- [Column Visibility](#column-visibility)
- [Touch Interactions](#touch-interactions)
- [Responsive Examples](#responsive-examples)

## When to Use This

- Optimize grid for mobile and desktop layouts
- Implement adaptive UI for responsive design
- Control column visibility by screen size
- Enable touch-friendly interactions
- Create mobile-optimized data tables

## Overview

Syncfusion Grid provides built-in responsive features for mobile and desktop devices, automatically adjusting layout and interactions based on screen size.

## Adaptive UI

### Enable Adaptive UI

Enable adaptive mode for mobile-friendly layouts:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          enableAdaptiveUI="true"
          allowPaging="true" 
          allowSorting="true" 
          allowFiltering="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="150" isPrimaryKey="true"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Adaptive Dialog Editing

Dialogs automatically become full-screen on mobile devices when `enableAdaptiveUI="true"`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" enableAdaptiveUI="true"
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Update", "Cancel" })">
    <e-grid-editSettings allowAdding="true" allowEditing="true" allowDeleting="true" 
                        mode="Dialog"></e-grid-editSettings>
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" isPrimaryKey="true" width="150"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

## Mobile Optimization

### Responsive Height and Width

Set grid height and width for different screen sizes:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          height="100vh"
          width="100%" 
          allowPaging="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Touch-Friendly Row Height

Increase row height on mobile for better touch interaction:

```css
@media (max-width: 768px) {
    /* Touch-friendly row height (minimum 44px) */
    .e-grid .e-row {
        height: 48px;
    }
    
    /* Larger touch targets for buttons */
    .e-grid button {
        min-width: 44px;
        min-height: 44px;
        padding: 8px;
    }
    
    /* Larger cell padding on mobile */
    .e-grid .e-gridcontent td {
        padding: 12px 8px;
    }
}
```

## Column Visibility

### Hide Columns on Mobile

Use media queries or CSS classes to hide columns on smaller screens:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true">
    <e-grid-columns>
        <!-- Always visible -->
        <e-grid-column field="OrderID" headerText="Order ID" width="100" cssClass="primary-column"></e-grid-column>
        
        <!-- Hide on screens smaller than 768px -->
        <e-grid-column field="CustomerID" headerText="Customer" width="150" cssClass="secondary-column"></e-grid-column>
        
        <!-- Hide on screens smaller than 600px -->
        <e-grid-column field="OrderDate" headerText="Order Date" format="yMd" width="150" cssClass="tertiary-column"></e-grid-column>
        
        <!-- Always visible -->
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<style>
    @media (max-width: 768px) {
        .secondary-column {
            display: none;
        }
    }
    
    @media (max-width: 600px) {
        .tertiary-column {
            display: none;
        }
    }
</style>
```

## Touch Interactions

### Touch-Optimized Toolbar

Increase toolbar button size for touch:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          toolbar="@(new List<string>() { "Add", "Edit", "Delete", "Search" })"
          allowPaging="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<style>
    @media (max-width: 768px) {
        .e-toolbar .e-toolbar-item {
            padding: 0 12px;
        }
        
        .e-toolbar button {
            min-height: 44px;
            min-width: 44px;
        }
    }
</style>
```

### Swipe Actions for Mobile

Enable row swipe actions on mobile:

```html
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true" recordDoubleClick="onRecordDoubleClick">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100" isPrimaryKey="true"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
    function onRecordDoubleClick(args) {
        var grid = document.getElementById('Grid').ej2_instances[0];
        // Handle row click for mobile navigation
        console.log('Row clicked:', args.data);
    }
</script>
```

## Responsive Examples

### Vertical Row Rendering for Mobile

Stack columns vertically on mobile:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          enableAdaptiveUI="true"
          allowPaging="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="150" isPrimaryKey="true"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="150"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" format="yMd" width="150"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<style>
    @media (max-width: 768px) {
        /* Hide header row on mobile */
        .e-grid .e-headercell {
            display: none;
        }
        
        /* Display cells as blocks with labels */
        .e-grid .e-rowcell {
            display: block;
            text-align: right;
            padding-left: 50%;
            position: relative;
        }
        
        .e-grid .e-rowcell:before {
            content: attr(data-label);
            position: absolute;
            left: 6px;
            font-weight: bold;
        }
    }
</style>
```

### Search Bar Responsive

Make search bar responsive:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          toolbar="@(new List<string>() { "Search" })"
          allowPaging="true"
          toolbarClick="onToolbarClick">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<style>
    @media (max-width: 768px) {
        .e-toolbar .e-input-group {
            width: 100%;
            max-width: none;
        }
    }
</style>
```
