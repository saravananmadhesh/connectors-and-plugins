# Interactions and Drill-Down in ASP.NET MVC TreeMap Control

## Table of Contents
- [Overview](#overview)
- [Selection and Highlight Settings](#selection-and-highlight-settings)
- [Drill-Down Feature](#drill-down-feature)
- [Interactive Legends](#interactive-legends)
- [TreeMap Events](#treemap-events)
- [Building Interactive Interfaces](#building-interactive-interfaces)
- [Advanced Interaction Patterns](#advanced-interaction-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

TreeMap supports rich interactive features: users can click to select items, drill down into hierarchies, interact with legends, and trigger custom event handlers. These interactions make TreeMaps dynamic and responsive to user actions.

### Core Interaction Features

| Feature | Purpose | User Action |
|---------|---------|------------|
| **Selection** | Highlight clicked items | Click rectangle |
| **Highlighting** | Highlight hover items | Mouse hover |
| **Drill-Down** | Navigate deeper into hierarchy | Click group item |
| **Legend Interaction** | Filter/highlight by legend item | Click legend entry |
| **Events** | Custom handlers for actions | Click, drill, etc. |

## Selection and Highlight Settings

Enable users to select items by clicking.

### Selection Settings Configuration

Enable selection for clicked items:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .SelectionSettings(selection =>
    {
        selection.Enable(true)        // Enable selection
                 .Fill("Blue")        // Color of selected item
                 .Border(border =>
                 {
                     border.Color("Black")
                           .Width(2);
                 });
    })
    .Render();
```

### Selection Properties

| Property | Purpose | Example |
|----------|---------|---------|
| **Enable** | Turn selection on/off | true / false |
| **Fill** | Color of selected item | "Blue", "#0000FF" |
| **Border.Color** | Border color of selection | "Black" |
| **Border.Width** | Border thickness | 1, 2, 3 |

### Complete Selection Example

**Controller:**
```csharp
public ActionResult SelectionDemo()
{
    var data = new List<object>
    {
        new { Name = "Product A", Sales = 5000 },
        new { Name = "Product B", Sales = 3500 },
        new { Name = "Product C", Sales = 4200 }
    };
    return View(data);
}
```

**View:**
```razor
@Model List<object>

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Sales")
    .Levels(levels =>
    {
        levels.GroupPath("Name").Add();
    })
    .LeafItemSettings(leaf => leaf.LabelPath("Name"))
    .SelectionSettings(selection =>
    {
        selection.Enable(true)
                 .Fill("LightBlue")
                 .Border(border =>
                 {
                     border.Color("Navy")
                           .Width(2);
                 });
    })
    .Render();
```

**Result:** Clicking a rectangle turns it light blue with a navy border.

### Highlight Settings

Highlight items on mouse hover:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .HighlightSettings(highlight =>
    {
        highlight.Enable(true)          // Enable highlighting
                 .Fill("Yellow")        // Color on hover
                 .Border(border =>
                 {
                     border.Color("Orange")
                           .Width(1);
                 });
    })
    .Render();
```

### Combined Selection and Highlight

Use both features together:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .SelectionSettings(selection =>
    {
        selection.Enable(true)
                 .Fill("Blue");
    })
    .HighlightSettings(highlight =>
    {
        highlight.Enable(true)
                 .Fill("Yellow");
    })
    .Render();
```

**Result:**
- Hovering shows yellow highlight
- Clicking permanently shows blue selection
- Both effects can be active simultaneously

## Drill-Down Feature

Drill-down allows users to navigate deeper into hierarchical data by clicking group items.

### Enable Drill-Down

Automatically enable drill-down for hierarchies:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .Levels(levels =>
    {
        levels.GroupPath("Continent").Add();
        levels.GroupPath("Country").Add();
    })
    .Render();
```

The drill-down feature is automatically enabled when multiple levels are defined. Clicking a group item navigates into that group.

### Drill-Down Settings

Configure drill-down behavior:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LayoutType(TreemapLayoutType.Squarified)
    .LeafItemSettings(leaf =>
    {
        leaf.LabelPath("Name")
            .ShowLabels(true);
    })
    .Render();
```

### Complete Drill-Down Example

**Controller:**
```csharp
public ActionResult DrillDownDemo()
{
    var data = new List<object>
    {
        // Level 1: Regions
        new { Id = 1, Parent = null, Name = "Asia", Value = 15000 },
        new { Id = 2, Parent = null, Name = "Europe", Value = 12000 },
        
        // Level 2: Countries
        new { Id = 3, Parent = 1, Name = "China", Value = 8000 },
        new { Id = 4, Parent = 1, Name = "India", Value = 7000 },
        new { Id = 5, Parent = 2, Name = "Germany", Value = 5000 },
        new { Id = 6, Parent = 2, Name = "France", Value = 7000 }
    };
    return View(data);
}
```

**View:**
```razor
@Model List<object>

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .Levels(levels =>
    {
        levels.GroupPath("Name").Add();
    })
    .LeafItemSettings(leaf => 
        leaf.LabelPath("Name")
            .ShowLabels(true)
    )
    .Tooltip(tooltip => 
        tooltip.Visible(true)
               .Format("<b>${Name}</b><br/>Value: ${Value}")
    )
    .Render();
```

**Expected Result:**
- Initial view shows Asia (15000) and Europe (12000) as large rectangles
- Clicking "Asia" drills into country view (China, India)
- Clicking "Europe" shows European countries
- Navigation is automatic

### Drill-Down Events

React to drill-down navigation with events:

```razor
@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Render();

<script>
    var treemap = document.getElementById('treemap').ej2_instances[0];
    
    // Fires when user initiates drill-down
    treemap.drillStart = function(args) {
        console.log('Drilling into: ' + args.item.Name);
    };
    
    // Fires when drill-down completes
    treemap.drillEnd = function(args) {
        console.log('Drill complete');
    };
</script>
```

### Breadcrumb Navigation

Display drill-down path:

```html
<!-- HTML for breadcrumb -->
<div id="breadcrumb-container">
    <span id="breadcrumb" style="margin-bottom: 10px;">
        <!-- Breadcrumb populated by JavaScript -->
    </span>
</div>

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Render();
```

```javascript
// Update breadcrumb on drill
var treemap = document.getElementById('container').ej2_instances[0];
treemap.drillEnd = function(args) {
    var path = getCurrentPath();  // Get current drill path
    updateBreadcrumb(path);
};

function updateBreadcrumb(path) {
    var breadcrumb = '<a href="#">Home</a>';
    for (var i = 0; i < path.length; i++) {
        breadcrumb += ' > <span>' + path[i] + '</span>';
    }
    document.getElementById('breadcrumb').innerHTML = breadcrumb;
}
```

## Interactive Legends

Legends can interact with TreeMap items through clicking and filtering.

### Legend Configuration

Enable interactive legends:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LegendSettings(legend =>
    {
        legend.Visible(true)
              .Position(LegendPosition.Bottom)
              .Orientation(LegendOrientation.Horizontal);
    })
    .ColorMapping(colors =>
    {
        colors.From(0).To(100).Color("Red").Add();
        colors.From(100).To(200).Color("Yellow").Add();
        colors.From(200).To(300).Color("Green").Add();
    })
    .Render();
```

### Legend Click Handling

React when users click legend items:

```razor
@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .LegendSettings(legend => legend.Visible(true))
    .Render();

<script>
    var treemap = document.getElementById('treemap').ej2_instances[0];
    
    treemap.legendItemRender = function(args) {
        // args.label - legend label
        // args.fill - legend color
        console.log('Legend item: ' + args.label);
    };
</script>
```

### Complete Legend Example

```razor
@Html.EJS().TreeMap("container")
    .DataSource(new List<object>
    {
        new { Product = "Laptop", Sales = 5000, Status = "High" },
        new { Product = "Desktop", Sales = 3000, Status = "Medium" },
        new { Product = "Mouse", Sales = 1500, Status = "Low" }
    })
    .WeightValuePath("Sales")
    .EqualColorValuePath("Status")
    .LegendSettings(legend =>
    {
        legend.Visible(true)
              .Position(LegendPosition.Top)
              .Mode(LegendMode.Interactive);
    })
    .ColorMapping(colors =>
    {
        colors.Value("High").Color("Green").Add();
        colors.Value("Medium").Color("Yellow").Add();
        colors.Value("Low").Color("Red").Add();
    })
    .Render();
```

## TreeMap Events

Handle various TreeMap user interactions with event handlers.

### Available Events

| Event | Triggers | Args Available |
|-------|----------|----------------|
| **ItemClick** | User clicks item | item, name, value |
| **DrillStart** | Drill-down begins | item |
| **DrillEnd** | Drill-down completes | item |
| **LegendItemClick** | Legend item clicked | label, fill |
| **TooltipRender** | Tooltip appears | dataSource, tooltip |
| **ItemRendering** | Item rendering | label, dataValue |

### ItemClick Event

Handle item clicks:

```razor
@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Render();

<script>
    var treemap = document.getElementById('treemap').ej2_instances[0];
    
    treemap.itemClick = function(args) {
        console.log('Item clicked: ' + args.item.Name);
        console.log('Value: ' + args.item.Value);
        console.log('Data: ', args.item);
    };
</script>
```

### Complete Event Handling Example

```razor
@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .SelectionSettings(selection => selection.Enable(true))
    .Render();

<div id="event-log" style="margin-top: 20px; padding: 10px; border: 1px solid #ccc;">
    <h3>Event Log:</h3>
    <div id="log-content"></div>
</div>

<script>
    var treemap = document.getElementById('treemap').ej2_instances[0];
    var eventLog = [];
    
    treemap.itemClick = function(args) {
        logEvent('Item Clicked: ' + args.item.Name + ' = ' + args.item.Value);
    };
    
    treemap.drillStart = function(args) {
        logEvent('Drill Start: ' + args.item.Name);
    };
    
    treemap.drillEnd = function(args) {
        logEvent('Drill End');
    };
    
    function logEvent(message) {
        eventLog.push(new Date().toLocaleTimeString() + ' - ' + message);
        updateLogDisplay();
    }
    
    function updateLogDisplay() {
        var logHtml = '';
        for (var i = eventLog.length - 1; i >= 0 && i > eventLog.length - 10; i--) {
            logHtml += '<div>' + eventLog[i] + '</div>';
        }
        document.getElementById('log-content').innerHTML = logHtml;
    }
</script>
```

## Building Interactive Interfaces

Create complete interactive interfaces combining multiple features.

### Dashboard with Details Panel

Show selected item details:

```html
<div style="display: flex; height: 600px; gap: 20px;">
    <div id="treemap-container" style="flex: 2;">
        <!-- TreeMap goes here -->
    </div>
    <div id="details-panel" style="flex: 1; border: 1px solid #ccc; padding: 15px; overflow-y: auto;">
        <h3>Selected Item Details</h3>
        <div id="details-content">Click an item to see details</div>
    </div>
</div>
```

```csharp
// Controller
public ActionResult Dashboard()
{
    var data = GetTreeMapData();
    return View(data);
}
```

```razor
@Html.EJS().TreeMap("treemap-container")
    .DataSource(Model)
    .SelectionSettings(selection => selection.Enable(true))
    .Render();

<script>
    var treemap = document.getElementById('treemap-container').ej2_instances[0];
    
    treemap.itemClick = function(args) {
        displayItemDetails(args.item);
    };
    
    function displayItemDetails(item) {
        var html = '<dl>';
        for (var key in item) {
            html += '<dt>' + key + ':</dt><dd>' + item[key] + '</dd>';
        }
        html += '</dl>';
        document.getElementById('details-content').innerHTML = html;
    }
</script>
```

### Filter by Legend

Show/hide items based on legend selection:

```javascript
var treemap = document.getElementById('treemap').ej2_instances[0];
var visibleCategories = new Set();

treemap.legendItemClick = function(args) {
    if (visibleCategories.has(args.label)) {
        visibleCategories.delete(args.label);
    } else {
        visibleCategories.add(args.label);
    }
    // Refresh TreeMap with filtered data
    refreshTreeMap();
};

function refreshTreeMap() {
    var filteredData = allData.filter(item => 
        visibleCategories.has(item.Category)
    );
    treemap.dataSource = filteredData;
}
```

## Advanced Interaction Patterns

### Double-Click to Drill

Drill-down on double-click instead of single-click:

```javascript
treemap.itemClick = function(args) {
    if (args.doubleClick) {
        treemap.drillDown(args.item);  // API method
    }
};
```

### Right-Click Context Menu

Show context menu on right-click:

```javascript
treemap.itemClick = function(args) {
    if (args.button === 2) {  // Right-click
        showContextMenu(args.item);
    }
};

function showContextMenu(item) {
    // Show context menu implementation
}
```

### Keyboard Navigation

Navigate with arrow keys:

```javascript
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
        navigateToNextItem();
    } else if (e.key === 'ArrowUp') {
        navigateToPreviousItem();
    } else if (e.key === 'Enter') {
        drillIntoSelected();
    } else if (e.key === 'Escape') {
        drillOut();
    }
});
```

## Troubleshooting

### Issue: Selection Not Working

**Cause:** Selection not enabled in settings.

**Solution:**
```razor
// ✅ Enable selection
.SelectionSettings(selection =>
{
    selection.Enable(true)
             .Fill("Blue");
})

// ❌ Selection disabled (default)
// (Missing .SelectionSettings() or Enable(false))
```

### Issue: Drill-Down Not Working

**Cause:** Only one level defined or drill-down disabled.

**Solution:**
```razor
// ✅ Multiple levels enable drill-down
.Levels(levels =>
{
    levels.GroupPath("Level1").Add();
    levels.GroupPath("Level2").Add();  // Multiple levels = drill-down enabled
})

// ❌ Single level = no drill-down
.Levels(levels =>
{
    levels.GroupPath("Level1").Add();
})
```

### Issue: Events Not Firing

**Cause:** Event handler assigned after TreeMap renders or wrong event name.

**Solution:**
```javascript
// ✅ Correct: Assign after TreeMap renders
var treemap = document.getElementById('treemap').ej2_instances[0];
treemap.itemClick = function(args) { /* ... */ };

// ❌ Incorrect: Assign before render
treemap.itemClick = function(args) { /* ... */ };  // Won't work
```

### Issue: Legend Clicks Not Responding

**Cause:** Legend not visible or interactive mode not set.

**Solution:**
```razor
// ✅ Make legend visible and interactive
.LegendSettings(legend =>
{
    legend.Visible(true)
          .Mode(LegendMode.Interactive);
})

// ❌ Legend hidden
.LegendSettings(legend =>
{
    legend.Visible(false);
})
```

### Issue: Drill-Down Goes to Wrong Level

**Cause:** GroupPath property names don't match hierarchy.

**Solution:**
```csharp
// Verify data structure matches levels
var data = new List<object>
{
    new { Name = "Item", Category = "Cat1", Value = 100 }
};

@Html.EJS().TreeMap("treemap")
    .DataSource(Model)
    .Levels(levels =>
    {
        levels.GroupPath("Category").Add();  // Must match data property
        levels.GroupPath("Name").Add();
    })
    .Render();
```

