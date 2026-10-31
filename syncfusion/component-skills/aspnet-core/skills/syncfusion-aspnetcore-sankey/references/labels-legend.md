# Labels and Legend Configuration

## Table of Contents
- [Labels Overview](#labels-overview)
- [Label Settings Properties](#label-settings-properties)
- [Global Label Configuration](#global-label-configuration)
- [Individual Node Labels](#individual-node-labels)
- [Dynamic Label Rendering](#dynamic-label-rendering)
- [Legend Overview](#legend-overview)
- [Legend Settings Properties](#legend-settings-properties)
- [Legend Positioning](#legend-positioning)
- [Legend Customization](#legend-customization)
- [Dynamic Legend Rendering](#dynamic-legend-rendering)
- [Best Practices](#best-practices)

## Labels Overview

Labels display descriptive text associated with nodes in the Sankey Chart, making the diagram more understandable and interpretable. The Sankey Chart provides comprehensive label customization options including visibility control, font styling, individual label configuration, and dynamic rendering events. All label functionality is self-contained and independent of legend or link styling.

## Label Settings Properties

Configure global label appearance using the `LabelSettings` property:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `visible` | boolean | true | Shows or hides all node labels |
| `fontSize` | string \| number | '12px' | Font size of labels |
| `color` | string | '' | Text color of labels (empty = theme color) |
| `fontFamily` | string | null | Font family for label text |
| `fontWeight` | string | '400' | Font weight ('400'=normal, '700'=bold) |
| `fontStyle` | string | 'normal' | Font style ('normal' or 'italic') |
| `padding` | number | 10 | Space around label text |

## Global Label Configuration

Configure label appearance for all nodes using the `LabelSettings` tag helper:

```html
<ejs-sankey id="container" width="100%" height="420px">
    
    <!-- Hardcoded Nodes using your working label structure -->
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node"></e-sankey-node-label>
        </e-sankey-node>
        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node"></e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <!-- Hardcoded Links -->
    <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Target" value="100"></e-sankey-link>
    </e-sankey-links>

    <!-- Global Label Styling -->
    <e-sankey-labelsettings 
        fontSize="14px"
        fontFamily="Arial"
        color="#333333"
        fontWeight="600"
        padding="8">
    </e-sankey-labelsettings>

</ejs-sankey>

```

**Result:** All labels display in 14px bold Arial with dark gray color.

### Standard Configuration

```html
<e-sankey-labelsettings 
    fontSize="12px"
    color="#000000"
    fontWeight="400">
</e-sankey-labelsettings>
```

### Large, Bold Labels

```html
<e-sankey-labelsettings 
    fontSize="16px"
    fontWeight="700"
    fontFamily="Georgia"
    color="#1565C0">
</e-sankey-labelsettings>
```

### Minimal, Light Labels

```html
<e-sankey-labelsettings 
    fontSize="10px"
    fontWeight="300"
    color="#757575"
    padding="4">
</e-sankey-labelsettings>
```

## Hiding Labels

Control label visibility using the `Visible` property in `LabelSettings`. Set to `false` to hide all node labels, creating cleaner visualizations when labels take up too much space:

```html
<e-sankey-labelsettings visible="false"></e-sankey-labelsettings>
```

### Showing Labels

```html
<e-sankey-labelsettings visible="true"></e-sankey-labelsettings>
```

This is the default behavior - labels display by default.

## Individual Node Labels

Override global label settings for specific nodes by adding label properties to the node data object:

```csharp
var nodeData = new object[]
{
    new { 
        id = 0, 
        label = "Critical Process",
        labelStyle = new { color = "#D32F2F", fontWeight = "700" }
    },
    new { 
        id = 1, 
        label = "Normal Process",
        labelStyle = new { color = "#1976D2", fontWeight = "400" }
    },
    new { 
        id = 2, 
        label = "Minor Process",
        labelStyle = new { color = "#90CCCB", fontWeight = "300" }
    }
};
```

### Individual Label Styling Example

In your Page Model:

```csharp
public void OnGet()
{
    NodeData = new object[]
    {
        new { id = 0, label = "Source", color = "#D32F2F" },
        new { id = 1, label = "Process", color = "#1976D2" },
        new { id = 2, label = "Target", color = "#2E7D32" }
    };
}
```

In your Razor view:

```html
<ejs-sankey id="customLabelSankey" width="100%" height="420px">
    
    <!-- Hardcoded Nodes using your working label structure -->
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node"></e-sankey-node-label>
        </e-sankey-node>
        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node"></e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <!-- Hardcoded Links -->
    <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Target" value="100"></e-sankey-link>
    </e-sankey-links>

    <!-- Global Label Styling with your requested dimensions -->
    <e-sankey-labelsettings fontSize="13px" fontWeight="500"></e-sankey-labelsettings>

</ejs-sankey>

```

**Result:** Each node displays its label with customized appearance while respecting global defaults.

## Dynamic Label Rendering

The `LabelRendering` event triggers before each label renders, allowing you to apply conditional formatting, modify text, or adjust styling based on data values:

### Label Rendering Event Syntax

```html
<ejs-sankey id="dynamicLabelSankey" 
    width="100%" height="420px"
    labelRendering="onLabelRendering">
    
    <!-- Hardcoded Nodes using your working label structure -->
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node"></e-sankey-node-label>
        </e-sankey-node>
        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node"></e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <!-- Hardcoded Links -->
    <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Target" value="100"></e-sankey-link>
    </e-sankey-links>

</ejs-sankey>


<script>
function onLabelRendering(args) {
    // args.data - The node data object
    // args.label - The label element being rendered
    // Modify properties before rendering completes
}
</script>
```

### Format Label Text Example

```html
@page
@model IndexModel
@using Syncfusion.EJ2;
@* Add the button above the chart *@
<div style="height: 200px;"></div>
@{
    var nodeData = new object[]
    {
        new { id = 0, label = "Source A", color = "#FF6B6B", fill = "#FF6B6B", width = 18 },
        new { id = 1, label = "Source B", color = "#4ECDC4", fill = "#4ECDC4", width = 18 },
        new { id = 2, label = "Process", color = "#45B7D1", fill = "#45B7D1", width = 30 },
        new { id = 3, label = "Target", color = "#FFA07A", fill = "#FFA07A", width = 18 }
    };
    
}
<script>
function onLabelRendering(args) {
    if (args.node && args.node.id !== undefined) {
        // 1. Get the base label (prevents reading from undefined)
        // 2. Set the output text directly
        // 3. We use a check to ensure we don't append multiple times 
        // if the browser triggers the event during a redraw
        var nodeName = args.node.label.text || args.text;
        if (!args.text.includes("(Node")) {
            args.text = nodeName + " (Node " + args.node.id + ")";
        }
    }
}
</script>
<ejs-sankey id="colorSankey" width="100%" height="420px" labelRendering="onLabelRendering">
    
    <!-- Dynamic Nodes Generated from C# Array -->
    <e-sankey-nodes>
        @foreach (dynamic node in nodeData)
        {
            <e-sankey-node id="@node.id" fill="@node.fill" width="@node.width">
                <e-sankey-node-label text="@node.label"></e-sankey-node-label>
            </e-sankey-node>
        }
    </e-sankey-nodes>
    <!-- Hardcoded Links (Using the mapped IDs from your array) -->
    <e-sankey-links>
        <e-sankey-link sourceId="0" targetId="2" value="50"></e-sankey-link>
        <e-sankey-link sourceId="1" targetId="2" value="50"></e-sankey-link>
        <e-sankey-link sourceId="2" targetId="3" value="100"></e-sankey-link>
    </e-sankey-links>

    <!-- Global Node Settings Fallback -->
    <e-sankey-nodesettings 
        strokeWidth="1.5"
        padding="10">
    </e-sankey-nodesettings>

</ejs-sankey>
```

### Color-Based on Category Example

```html
<script>
function onLabelRendering(args) {
    if (args.label.includes("Critical")) {
        args.label.color = "#D32F2F";
        args.label.fontWeight = "700";
    } else if (args.label.includes("Backup")) {
        args.label.color = "#90CCCB";
        args.label.fontWeight = "400";
    }
}
</script>
```

## Legend Overview

A legend provides a visual key that helps users understand the categories and meanings represented by nodes in the Sankey Chart. Legends are optional but recommended for complex visualizations with many node categories. Legend functionality is independent of label and link styling.

## Legend Settings Properties

Configure legend appearance and behavior using the `LegendSettings` property:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `visible` | boolean | true | Shows or hides the legend |
| `position` | string | 'Auto' | Position: Auto, Top, Bottom, Left, Right, Custom |
| `width` | string | null | Legend container width |
| `height` | string | null | Legend container height |
| `shapeWidth` | number | 10 | Width of legend shape/icon |
| `shapeHeight` | number | 10 | Height of legend shape/icon |
| `padding` | number | 8 | Padding around legend container |
| `itemPadding` | number | null | Padding between legend items |
| `shapePadding` | number | 8 | Padding between shape and text |
| `background` | string | 'transparent' | Legend background color |
| `opacity` | number | 1 | Legend opacity (0-1) |
| `title` | string | null | Legend title text |
| `enableHighlight` | boolean | true | Enable node highlighting on legend click |
| `isInversed` | boolean | false | Invert legend layout |

## Legend Positioning

Control the legend position using the `Position` property:

### Top Position

```html
<e-sankey-legendsettings position="Top"></e-sankey-legendsettings>
```

Legend appears above the Sankey Chart.

### Bottom Position

```html
<e-sankey-legendsettings position="Bottom"></e-sankey-legendsettings>
```

Legend appears below the Sankey Chart (default for most cases).

### Left Position

```html
<e-sankey-legendsettings position="Left"></e-sankey-legendsettings>
```

Legend appears to the left of the chart.

### Right Position

```html
<e-sankey-legendsettings position="Right"></e-sankey-legendsettings>
```

Legend appears to the right of the chart.

### Auto Position

```html
<e-sankey-legendsettings position="Auto"></e-sankey-legendsettings>
```

Automatically positions the legend based on available space.

### Custom Position

For precise control, use custom positioning:

```html
<ejs-sankey id="customPosSankey" width="100%" height="420px">
    <!-- Hardcoded Nodes using your working label structure -->
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node"></e-sankey-node-label>
        </e-sankey-node>
        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node"></e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <!-- Hardcoded Links -->
    <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Target" value="100"></e-sankey-link>
    </e-sankey-links>

    <!-- Legend with Custom X/Y Coordinates -->
    <e-sankey-legendsettings 
        visible="true"
        position="Custom"
        x="100" 
        y="150">
    </e-sankey-legendsettings>
</ejs-sankey>
```

Legend positions at coordinates (100px, 150px) from the chart origin.

## Legend Customization

Customize legend appearance with styling and layout options:

### Basic Legend Example

```html
<ejs-sankey id="basicLegendSankey" width="100%" height="420px">
    
    <!-- Hardcoded Nodes using your working label structure -->
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node"></e-sankey-node-label>
        </e-sankey-node>
        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node"></e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <!-- Hardcoded Links -->
    <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Target" value="100"></e-sankey-link>
    </e-sankey-links>

    <!-- Legend Settings with your requested text and positioning -->
    <e-sankey-legendsettings 
        visible="true"
        position="Bottom"
        title="Node Categories">
    </e-sankey-legendsettings>

</ejs-sankey>

```

### Styled Legend Example

```html
<ejs-sankey id="styledLegendSankey" width="100%" height="420px">
    
    <!-- Hardcoded Nodes -->
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node"></e-sankey-node-label>
        </e-sankey-node>
        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node"></e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <!-- Hardcoded Links -->
    <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Target" value="100"></e-sankey-link>
    </e-sankey-links>

    <!-- Your Styled Legend Settings -->
    <e-sankey-legendsettings 
        visible="true"
        position="Right"
        background="#F5F5F5"
        opacity="0.95"
        shapeWidth="15"
        shapeHeight="15"
        padding="10"
        itemPadding="5"
        shapePadding="10"
        enableHighlight="true">
    </e-sankey-legendsettings>
</ejs-sankey>
```

**Result:** Legend displays on the right with light gray background, larger shapes, and interactive highlighting.

### Compact Legend Example

```html
<e-sankey-legendsettings 
    position="Top"
    shapeWidth="8"
    shapeHeight="8"
    padding="4"
    itemPadding="2"
    shapePadding="4">
</e-sankey-legendsettings>
```

**Result:** Compact legend with small shapes takes minimal space.

## Dynamic Legend Rendering

The `LegendItemRendering` event triggers before each legend item renders, allowing you to apply conditional styling or modify legend item appearance:

### Legend Item Rendering Event Syntax

```html
<ejs-sankey id="dynamicLegendSankey" 
    width="100%" height="420px"
    legendItemRendering="onLegendItemRendering">
    
    <!-- Hardcoded Nodes using your working label structure -->
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node"></e-sankey-node-label>
        </e-sankey-node>
        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node"></e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <!-- Hardcoded Links -->
    <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Target" value="100"></e-sankey-link>
    </e-sankey-links>

    <!-- Ensure legend is visible to trigger the event -->
    <e-sankey-legendsettings visible="true"></e-sankey-legendsettings>

</ejs-sankey>

<script>
function onLegendItemRendering(args) {
    // Example: Capitalize legend text dynamically
    if (args.text) {
        args.text = args.text.toUpperCase();
    }
    
    // Example: Change shape color for specific items
    if (args.text === "SOURCE NODE") {
        args.fill = "#2E7D32"; 
    }
}
</script>
```

### Custom Legend Colors Example

```html
<script>
function onLegendItemRendering(args) {
    // Apply custom colors to legend items
    if (args.label.includes("Critical")) {
        args.shape.fill = "#D32F2F";
    } else if (args.data.label.includes("Normal")) {
        args.shape.fill = "#1976D2";
    } else {
        args.shape.fill = "#90CCCB";
    }
}
</script>
```

## Best Practices

### Label Design Guidelines

1. **Clarity**: Use clear, descriptive node labels (avoid abbreviations)
2. **Consistency**: Use similar label format across all nodes
3. **Length**: Keep labels short (20 characters or less) to avoid truncation
4. **Contrast**: Ensure label color contrasts with background
5. **Readability**: Test labels at small font sizes
6. **Hierarchy**: Use different font weights to indicate importance

### Legend Best Practices

1. **When to Use**: Add legend when nodes represent different categories
2. **Positioning**: Place legend where it doesn't obscure important flows
3. **Title**: Use clear, descriptive legend titles
4. **Consistency**: Maintain consistent shape and color meanings
5. **Interactivity**: Enable highlighting to help users track categories
6. **Density**: Don't overcrowd legend with too many items

### Accessibility

- Ensure sufficient contrast between labels and backgrounds
- Use font sizes ≥11px for readability
- Don't rely on color alone to distinguish legend items
- Provide additional context through tooltips
- Test with screen readers for semantic meaning

### Common Patterns

**Pattern: Source Category Legend**
```html
<ejs-sankey id="sourceLegendSankey" width="100%" height="420px">
    
    <!-- Hardcoded Nodes using your working label structure -->
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node"></e-sankey-node-label>
        </e-sankey-node>
        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node"></e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <!-- Hardcoded Links -->
    <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Target" value="100"></e-sankey-link>
    </e-sankey-links>

    <!-- Global Label Styling -->
    <e-sankey-labelsettings fontSize="12px" fontWeight="500"></e-sankey-labelsettings>

    <!-- Legend Settings positioned to the Right -->
    <e-sankey-legendsettings 
        visible="true"
        position="Right"
        title="Data Sources"
        enableHighlight="true">
    </e-sankey-legendsettings>

</ejs-sankey>

```

**Pattern: Process Stage Labels**
```html
<ejs-sankey id="stageLabelSankey" width="100%" height="420px">
    <!-- Hardcoded Nodes using your working label structure -->
    <e-sankey-nodes>
        <e-sankey-node id="Source">
            <e-sankey-node-label text="Source Node"></e-sankey-node-label>
        </e-sankey-node>
        <e-sankey-node id="Target">
            <e-sankey-node-label text="Target Node"></e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>
    <!-- Hardcoded Links -->
    <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Target" value="100"></e-sankey-link>
    </e-sankey-links>
    <!-- Bold Blue Label Styling -->
    <e-sankey-labelsettings 
        fontSize="14px" 
        fontWeight="700"
        color="#1565C0">
    </e-sankey-labelsettings>
    <!-- Legend hidden as requested -->
    <e-sankey-legendsettings visible="false"></e-sankey-legendsettings>
</ejs-sankey>
```

**Pattern: Minimal Design (No Legend, Small Labels)**
```html
<e-sankey-labelsettings fontSize="10px" fontWeight="300"></e-sankey-labelsettings>
<e-sankey-legendsettings visible="false"></e-sankey-legendsettings>
```
