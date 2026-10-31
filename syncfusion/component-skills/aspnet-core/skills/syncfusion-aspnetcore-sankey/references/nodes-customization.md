# Node Customization and Styling

## Table of Contents

- [Node Appearance Overview](#node-appearance-overview)
- [Global Node Style Properties](#global-node-style-properties)
- [Global Node Customization](#global-node-customization)
  - [Color Styling Example](#color-styling-example)
  - [Transparent Nodes Example](#transparent-nodes-example)
- [Individual Node Customization](#individual-node-customization)
  - [Individual Styling Example](#individual-styling-example)
- [Node Width and Padding](#node-width-and-padding)
  - [Width Configuration](#width-configuration)
  - [Padding Configuration](#padding-configuration)
  - [Combined Example](#combined-example)
- [Node Opacity Control](#node-opacity-control)
  - [Opacity Properties](#opacity-properties)
  - [Interactive Opacity Example](#interactive-opacity-example)
  - [Subtle Highlighting Example](#subtle-highlighting-example)
  - [Minimal Highlighting Example](#minimal-highlighting-example)
- [Node Positioning with Offset](#node-positioning-with-offset)
  - [Offset Behavior by Orientation](#offset-behavior-by-orientation)
  - [Offset Example](#offset-example)
  - [Horizontal Orientation Layout](#horizontal-orientation-layout)
- [Dynamic Node Rendering](#dynamic-node-rendering)
  - [Node Rendering Event Syntax](#node-rendering-event-syntax)
  - [Color Based on Value Example](#color-based-on-value-example)
  - [Conditional Styling Example](#conditional-styling-example)
- [Best Practices](#best-practices)
  - [Node Design Guidelines](#node-design-guidelines)
  - [Performance Considerations](#performance-considerations)
  - [Accessibility](#accessibility)
  - [Common Patterns](#common-patterns)

## Node Appearance Overview

Nodes are the fundamental building blocks of a Sankey Chart, representing sources, targets, and intermediate entities in flow diagrams. The Syncfusion Sankey Chart provides extensive customization options to control:

- **Visual appearance** - Colors, borders, opacity
- **Size and spacing** - Width, padding, offsets
- **Interaction feedback** - Hover states, highlighting
- **Dynamic styling** - Data-driven colors and styles

All node customization is self-contained and doesn't require reference to other features. Complete all styling within the `NodeStyle` or `NodeRendering` event.

## Global Node Style Properties

Configure all nodes with consistent styling using the `NodeSettings` and `NodeStyle` properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | number | 20 | Width of the node rectangle in pixels |
| `padding` | number | 10 | Spacing between node and its label |
| `fill` | string | null | Node fill color (theme color if null) |
| `stroke` | string | '' | Node border color |
| `strokeWidth` | number | 1 | Width of node border in pixels |
| `opacity` | number | 1 | Default opacity (0-1 range) |
| `highlightOpacity` | number | 1 | Opacity when node is highlighted |
| `inactiveOpacity` | number | 0.3 | Opacity when other nodes are interacting |

## Global Node Customization

Apply consistent styling to all nodes using the `NodeSettings` tag helper:

```html
<ejs-sankey id="container" width="100%" height="420px"> 
    <!-- Hardcoded Nodes -->
    <e-sankey-nodes>
        <e-sankey-node id="Source" >
            <e-sankey-node-label text="Source Node"></e-sankey-node-label>
        </e-sankey-node>
        <e-sankey-node id="Target" >
            <e-sankey-node-label text="Target Node"></e-sankey-node-label>
        </e-sankey-node>
    </e-sankey-nodes>

    <!-- Hardcoded Links -->
    <e-sankey-links>
        <e-sankey-link sourceId="Source" targetId="Target" value="100"></e-sankey-link>
    </e-sankey-links>

    <!-- Node Settings -->
    <e-sankey-nodesettings 
        width="25" 
        padding="12" 
        fill="#3DB6E6" 
        stroke="#1976D2" 
        strokeWidth="2">
    </e-sankey-nodesettings>

</ejs-sankey>
```

**Result:** All nodes display with 25px width, light blue fill, dark blue borders, and 12px padding from labels.

### Color Styling Example

Create visually distinct nodes with specific colors:

```html
<ejs-sankey id="colorSankey" width="100%" height="420px">
    
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

    <!-- Node Settings -->
    <e-sankey-nodesettings 
        width="22"
        fill="#2E7D32"
        stroke="#1B5E20"
        strokeWidth="1.5"
        padding="10">
    </e-sankey-nodesettings>

</ejs-sankey>

```

### Transparent Nodes Example

Create subtle nodes with transparent styling:

```html
<e-sankey-nodesettings 
    width="18"
    fill="rgba(63, 81, 181, 0.7)"
    stroke="#3F51B5"
    strokeWidth="2"
    opacity="0.8">
</e-sankey-nodesettings>
```

## Individual Node Customization

Override global node styling for specific nodes by adding properties directly to the node data object. Individual properties take precedence over global `NodeStyle` settings:

```csharp
@{
    var nodeData = new object[]
    {
        new { id = 0, label = "Source A", color = "#FF6B6B", fill = "#FF6B6B", width = 18 },
        new { id = 1, label = "Source B", color = "#4ECDC4", fill = "#4ECDC4", width = 18 },
        new { id = 2, label = "Process", color = "#45B7D1", fill = "#45B7D1", width = 30 },
        new { id = 3, label = "Target", color = "#FFA07A", fill = "#FFA07A", width = 18 }
    };
}

<ejs-sankey id="colorSankey" width="100%" height="420px">
    
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

### Individual Styling Example

```html
<ejs-sankey id="customNodeSankey" width="100%" height="420px">
    
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

    <!-- Your Requested Node Settings -->
    <e-sankey-nodesettings 
        width="20"
        fill="#3DB6E6"
        stroke="#1976D2">
    </e-sankey-nodesettings>

</ejs-sankey>
```

In your Page Model:

```csharp
public void OnGet()
{
    NodeData = new object[]
    {
        new { id = 0, label = "Critical Process", fill = "#D32F2F", width = 25 },
        new { id = 1, label = "Normal Process", fill = "#3DB6E6" },
        new { id = 2, label = "Minor Process", fill = "#90CCCB" }
    };
}
```

**Result:** The "Critical Process" node displays in red with 25px width, overriding the global blue color and 20px width.

## Node Width and Padding

Control the physical size and spacing of nodes for improved readability:

### Width Configuration

```html
<e-sankey-nodesettings width="30"></e-sankey-nodesettings>
```

**Width Considerations:**
- **15-20px**: Compact layouts with many nodes
- **25-30px**: Standard layouts with moderate node count
- **40+px**: Large, prominent nodes for emphasis
- Adjust based on chart size and data density

### Padding Configuration

```html
<e-sankey-nodesettings padding="15"></e-sankey-nodesettings>
```

**Padding Considerations:**
- **5-10px**: Tight layouts, minimal spacing
- **10-15px**: Standard spacing between node and label
- **20+px**: Extra-large labels with generous spacing
- Larger padding accommodates longer label text

### Combined Example

```html
<ejs-sankey id="customSizeSankey" width="100%" height="420px">
    
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

    <!-- Node Settings with your requested dimensions -->
    <e-sankey-nodesettings width="28" padding="14"></e-sankey-nodesettings>

</ejs-sankey>

```

## Node Opacity Control

Manage node visibility and interaction feedback using three opacity levels:

### Opacity Properties

| Property | Purpose | Value Range |
|----------|---------|------------|
| `opacity` | Normal state opacity | 0-1 (0=invisible, 1=opaque) |
| `highlightOpacity` | Opacity when hovered or clicked | 0-1 |
| `inactiveOpacity` | Opacity when other elements interact | 0-1 |

### Interactive Opacity Example

```html
<e-sankey-nodesettings 
    opacity="0.8"
    highlightOpacity="1.0"
    inactiveOpacity="0.2">
</e-sankey-nodesettings>
```

**User Interaction:**
- Normal state: Nodes display at 80% opacity
- User hovers over a node: That node becomes fully opaque (100%)
- User hovers over a link: Connected nodes remain at 80%, other nodes fade to 20%

### Subtle Highlighting Example

For less dramatic highlighting:

```html
<e-sankey-nodesettings 
    opacity="0.9"
    highlightOpacity="1.0"
    inactiveOpacity="0.6">
</e-sankey-nodesettings>
```

### Minimal Highlighting Example

For subtle visual feedback:

```html
<e-sankey-nodesettings 
    opacity="1.0"
    highlightOpacity="1.0"
    inactiveOpacity="0.85">
</e-sankey-nodesettings>
```

## Node Positioning with Offset

Use the `Offset` property to manually adjust node positions, preventing overlaps or creating specific flow patterns:

### Offset Behavior by Orientation

- **Horizontal orientation**: Offset moves nodes vertically
- **Vertical orientation**: Offset moves nodes horizontally

### Offset Example

```csharp
var nodeData = new object[]
{
    new { id = 0, label = "Node A", offset = -30 },  // Move up 30px
    new { id = 1, label = "Node B", offset = 0 },    // No adjustment
    new { id = 2, label = "Node C", offset = 30 }    // Move down 30px
};
```

### Horizontal Orientation Layout

```html
<ejs-sankey id="offsetSankey" width="100%" height="500px" orientation="Horizontal">
    
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

    <!-- Node Settings with your requested dimensions -->
    <e-sankey-nodesettings width="20" padding="10"></e-sankey-nodesettings>

</ejs-sankey>

```

In Page Model:

```csharp
NodeData = new object[]
{
    new { id = 0, label = "Input Source", offset = -20 },
    new { id = 1, label = "Process Step 1", offset = 0 },
    new { id = 2, label = "Process Step 2", offset = 0 },
    new { id = 3, label = "Output Target", offset = 20 }
};
```

## Dynamic Node Rendering

The `NodeRendering` event triggers before each node renders, enabling dynamic styling based on data values, conditions, or business logic. This is the most powerful approach for data-driven customization.

### Node Rendering Event Syntax

```html
<ejs-sankey id="dynamicNodeSankey" 
    width="100%" height="420px"
    nodeRendering="onNodeRendering">
    
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
function onNodeRendering(args) {
    // args.data - The node data object (e.g., accessed via args.data.id)
    // args.node - The node element being rendered
    // Modify properties before rendering completes
    
    console.log("Rendering node with ID: ", args.data.id);
}
</script>

```

### Color Based on Value Example

```html
@{
    // Dummy dataset providing the specific IDs (0 and 3) targeted by your script
    var nodeData = new object[]
    {
        new { id = 0, label = "Source A" },
        new { id = 1, label = "Process" },
        new { id = 2, label = "Process B" },
        new { id = 3, label = "Target" }
    };
}

<ejs-sankey id="dynamicNodeSankey" 
            width="100%" height="420px"
            nodeRendering="onNodeRendering">
    
    <e-sankey-nodes>
        @foreach (dynamic node in nodeData)
        {
            <e-sankey-node id="@node.id">
                <e-sankey-node-label text="@node.label"></e-sankey-node-label>
            </e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link sourceId="0" targetId="1" value="50"></e-sankey-link>
        <e-sankey-link sourceId="1" targetId="2" value="50"></e-sankey-link>
        <e-sankey-link sourceId="2" targetId="3" value="50"></e-sankey-link>
    </e-sankey-links>

</ejs-sankey>

<script>
function onNodeRendering(args) {
    if (args.data.id === 0) {
        args.node.fill = "#2E7D32";  // Green for source
    } else if (args.data.id === 3) {
        args.node.fill = "#D32F2F";  // Red for target
    } else {
        args.node.fill = "#1976D2";  // Blue for intermediate
    }
}
</script>

```

### Conditional Styling Example

```html
@{
    // Hardcoded dataset featuring the specific string keywords targeted by your script
    var nodeData = new object[]
    {
        new { id = 0, label = "Source: Critical Database" },
        new { id = 1, label = "Source: Backup Server" },
        new { id = 2, label = "Processing Hub" },
        new { id = 3, label = "Main Target" }
    };
}

<ejs-sankey id="dynamicNodeSankey" 
            width="100%" height="420px"
            nodeRendering="onNodeRendering">
    
    <e-sankey-nodes>
        @foreach (dynamic node in nodeData)
        {
            <e-sankey-node id="@node.id">
                <e-sankey-node-label text="@node.label"></e-sankey-node-label>
            </e-sankey-node>
        }
    </e-sankey-nodes>

    <e-sankey-links>
        <e-sankey-link sourceId="0" targetId="2" value="70"></e-sankey-link>
        <e-sankey-link sourceId="1" targetId="2" value="30"></e-sankey-link>
        <e-sankey-link sourceId="2" targetId="3" value="100"></e-sankey-link>
    </e-sankey-links>

</ejs-sankey>

<script>
function onNodeRendering(args) {
    // Apply different styles based on node label string matches
    if (args.data.label.includes("Critical")) {
        args.node.fill = "#D32F2F";      // Red for critical paths
        args.node.strokeWidth = 2;
    } else if (args.data.label.includes("Backup")) {
        args.node.fill = "#90CCCB";      // Light teal for backup sources
        args.node.opacity = 0.7;
    }
}
</script>

```

## Best Practices

### Node Design Guidelines

1. **Consistency**: Use the same width and padding for all nodes unless highlighting specific elements
2. **Contrast**: Ensure sufficient contrast between node fill and border colors for visibility
3. **Hierarchy**: Use different sizes to indicate importance (larger nodes = more important)
4. **Color Meaning**: Assign colors semantically (green=success, red=critical, blue=neutral)
5. **Spacing**: Increase padding if labels are long or multiple lines

### Performance Considerations

- Individual node properties are more flexible but slower than global settings
- Use global `NodeStyle` for uniform styling
- Reserve `NodeRendering` event for complex conditional logic
- Test with large datasets (100+ nodes) to verify performance

### Accessibility

- Use color + additional visual cues (size, borders) to distinguish nodes
- Ensure sufficient opacity (≥0.7) for readability in default state
- Test color combinations for colorblind visibility
- Use meaningful labels that clearly identify node purpose

### Common Patterns

**Pattern: Progressive Flow**
```csharp
NodeData = new object[]
{
    new { id = 0, label = "Start", fill = "#2E7D32", width = 25 },      // Green, large
    new { id = 1, label = "Step 1", fill = "#1976D2", width = 20 },      // Blue
    new { id = 2, label = "Step 2", fill = "#1976D2", width = 20 },      // Blue
    new { id = 3, label = "End", fill = "#D32F2F", width = 25 }          // Red, large
};
```

**Pattern: Multi-Source to Single Target**
```csharp
NodeData = new object[]
{
    new { id = 0, label = "Source A", fill = "#FF6B6B", offset = -40 },
    new { id = 1, label = "Source B", fill = "#4ECDC4", offset = 0 },
    new { id = 2, label = "Source C", fill = "#95E1D3", offset = 40 },
    new { id = 3, label = "Combined", fill = "#45B7D1", width = 30 }
};
```
