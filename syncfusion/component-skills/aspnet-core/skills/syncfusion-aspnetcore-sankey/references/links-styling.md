# Link Styling and Configuration

## Table of Contents
- [Link Style Overview](#link-style-overview)
- [Link Style Properties](#link-style-properties)
- [Basic Link Customization](#basic-link-customization)
    - [Enhanced Link Visibility](#enhanced-link-visibility)
    - [Subtle Link Styling](#subtle-link-styling)
- [Link Curvature Control](#link-curvature-control)
    - [Curvature Values and Effects](#curvature-values-and-effects)
    - [Straight Line Example](#straight-line-example)
    - [Moderate Curve Example](#moderate-curve-example)
    - [High Curve Example](#high-curve-example)
    - [Dynamic Curvature Based on Layout](#dynamic-curvature-based-on-layout)
- [Link Color Types](#link-color-types)
    - [Source Color Example](#source-color-example)
    - [Target Color Example](#target-color-example)
    - [Blend Color Example (Default)](#blend-color-example-default)
- [Link Opacity and Interactions](#link-opacity-and-interactions)
    - [Interactive Opacity Example](#interactive-opacity-example)
    - [Subtle Interaction Example](#subtle-interaction-example)
    - [High Contrast Interaction Example](#high-contrast-interaction-example)
- [Link Value and Thickness](#link-value-and-thickness)
    - [Value-to-Thickness Mapping](#value-to-thickness-mapping)
    - [Real-World Example: Energy Flow](#real-world-example-energy-flow)
    - [Revenue Stream Example](#revenue-stream-example)
- [Dynamic Link Rendering](#dynamic-link-rendering)
    - [Link Rendering Event Syntax](#link-rendering-event-syntax)
    - [Value-Based Opacity Example](#value-based-opacity-example)
    - [Conditional Color Example](#conditional-color-example)
    - [Pattern Detection Example](#pattern-detection-example)
- [Best Practices](#best-practices)
    - [Link Design Guidelines](#link-design-guidelines)
    - [Performance Considerations](#performance-considerations)
    - [Accessibility](#accessibility)
    - [Common Patterns](#common-patterns)

## Link Style Overview

Links are the connecting paths that visualize flow between nodes in a Sankey Chart. Each link connects a source node to a target node and carries a quantitative value that determines its visual thickness. The Sankey Chart provides comprehensive customization options for:

- **Visual appearance** - Colors, opacity, thickness
- **Shape and flow** - Curvature patterns
- **Color blending** - Source, target, or gradient coloring
- **Interactive feedback** - Hover and click states
- **Dynamic styling** - Data-driven link customization

All link customization is self-contained and doesn't depend on node or label styling.

## Link Style Properties

Configure link appearance using the `LinkStyle` property with the following options:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `opacity` | number | 0.35 | Link transparency in normal state (0-1) |
| `highlightOpacity` | number | 1 | Link opacity when highlighted (0-1) |
| `inactiveOpacity` | number | 0.3 | Link opacity during other interactions (0-1) |
| `curvature` | number | 0.55 | Link curve amount (0=straight, 1=fully curved) |
| `colorType` | string | 'Blend' | Color source: 'Source', 'Target', or 'Blend' |

## Basic Link Customization

Configure link appearance globally using the `LinkSettings` tag helper:

```html
<ejs-sankey id="container" width="100%" height="420px">
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-linksettings opacity="0.4"
                                highlightOpacity="0.8"
                                inactiveOpacity="0.2">
    </e-sankey-linksettings>
</ejs-sankey>
```

**Result:** Links display at 40% opacity normally, 80% when highlighted, and 20% when other links are interacting.

### Enhanced Link Visibility

For clearer visual representation with better contrast:

```html
<e-sankey-linksettings 
    opacity="0.6"
    highlightOpacity="1.0"
    inactiveOpacity="0.15"
    curvature="0.5">
</e-sankey-linksettings>
```

### Subtle Link Styling

For minimal visual impact:

```html
<e-sankey-linksettings 
    opacity="0.25"
    highlightOpacity="0.6"
    inactiveOpacity="0.1"
    curvature="0.65">
</e-sankey-linksettings>
```

## Link Curvature Control

The `Curvature` property controls the bend of links, affecting the visual flow representation. Adjust curvature based on data density and aesthetic preferences:

### Curvature Values and Effects

| Value | Effect | Use Case |
|-------|--------|----------|
| 0 | Straight lines | Clean, minimal aesthetic |
| 0.3-0.4 | Slight curves | Dense layouts, many links |
| 0.5-0.6 | Moderate curves | Standard Sankey appearance |
| 0.7-0.8 | Strong curves | Sparse layouts, clarity |
| 1.0 | Maximum curves | Artistic, organic appearance |

### Straight Line Example

```html
<e-sankey-linksettings curvature="0"></e-sankey-linksettings>
```

**Result:** Links appear as straight lines between nodes, creating a geometric appearance.

### Moderate Curve Example

```html
<e-sankey-linksettings curvature="0.55"></e-sankey-linksettings>
```

**Result:** Default moderate curves provide balanced visual flow without excessive bending.

### High Curve Example

```html
<e-sankey-linksettings curvature="0.85"></e-sankey-linksettings>
```

**Result:** Strong curves create organic, flowing paths between nodes.

### Dynamic Curvature Based on Layout

For horizontal dense layouts (many nodes):

```html
<e-sankey-linksettings curvature="0.4"></e-sankey-linksettings>
```

For vertical sparse layouts (few nodes):

```html
<e-sankey-linksettings curvature="0.7"></e-sankey-linksettings>
```

## Link Color Types

The `ColorType` property determines how links are colored, providing flexibility in visual representation:

| Type | Description | Best For |
|------|-------------|----------|
| 'Source' | Link inherits source node color | Tracking origin/sources |
| 'Target' | Link inherits target node color | Tracking destination/targets |
| 'Blend' | Gradient blend of source and target colors | Most Sankey diagrams (default) |

### Source Color Example

```html
<ejs-sankey id="sourceColorSankey" width="100%" height="420px">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
    <e-sankey-nodesettings fill="#3DB6E6"></e-sankey-nodesettings>
    <e-sankey-linksettings colorType="Source" opacity="0.5"></e-sankey-linksettings>
</ejs-sankey>
```

In Page Model:

```csharp
var nodeData = new object[]
{
    new { id = 0, label = "Source A", fill = "#FF6B6B" },      // Red
    new { id = 1, label = "Source B", fill = "#4ECDC4" },      // Teal
    new { id = 2, label = "Target 1", fill = "#45B7D1" },      // Blue
    new { id = 3, label = "Target 2", fill = "#45B7D1" }       // Blue
};
```

**Result:** Links from "Source A" appear red, links from "Source B" appear teal, clearly showing flow origins.

### Target Color Example

```html
<e-sankey-linksettings colorType="Target" opacity="0.5"></e-sankey-linksettings>
```

**Result:** All links to "Target 1" appear blue, all links to "Target 2" appear blue, showing destinations clearly.

### Blend Color Example (Default)

```html
<e-sankey-linksettings colorType="Blend" opacity="0.5"></e-sankey-linksettings>
```

In Page Model:

```csharp
var nodeData = new object[]
{
    new { id = 0, label = "Solar", fill = "#FFD700" },         // Gold
    new { id = 1, label = "Wind", fill = "#87CEEB" },          // Sky blue
    new { id = 2, label = "Distribution", fill = "#90EE90" }   // Light green
};
```

**Result:** Links display as gradients - link from Solar to Distribution shows gold-to-green gradient, creating smooth visual transitions.

## Link Opacity and Interactions

Manage link visibility and interaction feedback using opacity levels:

### Interactive Opacity Example

```html
<e-sankey-linksettings 
    opacity="0.35"
    highlightOpacity="1.0"
    inactiveOpacity="0.1">
</e-sankey-linksettings>
```

**User Interaction:**
- Normal state: Links display at 35% opacity
- User hovers over a link: That link becomes fully opaque (100%)
- User hovers over a node: Connected links remain visible, unrelated links fade to 10%

### Subtle Interaction Example

For less dramatic changes:

```html
<e-sankey-linksettings 
    opacity="0.5"
    highlightOpacity="0.8"
    inactiveOpacity="0.3">
</e-sankey-linksettings>
```

### High Contrast Interaction Example

For maximum visibility:

```html
<e-sankey-linksettings 
    opacity="0.2"
    highlightOpacity="1.0"
    inactiveOpacity="0.05">
</e-sankey-linksettings>
```

## Link Value and Thickness

The link thickness is automatically determined by the `Value` property in the link data. This quantitative value is mapped proportionally to the visual thickness of the link:

### Value-to-Thickness Mapping

```csharp
var linkData = new object[]
{
    new { sourceNodeID = 0, targetNodeID = 1, value = 100 },   // Thickest link
    new { sourceNodeID = 1, targetNodeID = 2, value = 75 },    // Medium link
    new { sourceNodeID = 2, targetNodeID = 3, value = 50 },    // Thinner link
    new { sourceNodeID = 0, targetNodeID = 3, value = 25 }     // Thinnest link
};
```

**Result:** Link thicknesses are proportional to values - the 100-value link is 4x thicker than the 25-value link.

### Real-World Example: Energy Flow

```csharp
// Energy distribution from sources to consumers
var linkData = new object[]
{
    new { sourceNodeID = 0, targetNodeID = 2, value = 400 },   // Solar to Grid
    new { sourceNodeID = 1, targetNodeID = 2, value = 600 },   // Wind to Grid  
    new { sourceNodeID = 2, targetNodeID = 3, value = 700 },   // Grid to Residential
    new { sourceNodeID = 2, targetNodeID = 4, value = 300 }    // Grid to Industrial
};
```

**Result:** Thicker links represent larger energy flows. Wind (600) appears thicker than solar (400).

### Revenue Stream Example

```csharp
// Revenue distribution across products
var linkData = new object[]
{
    new { sourceNodeID = 0, targetNodeID = 1, value = 2500 },  // Product A revenue
    new { sourceNodeID = 0, targetNodeID = 2, value = 1800 },  // Product B revenue
    new { sourceNodeID = 1, targetNodeID = 3, value = 2000 },  // Profit allocation
    new { sourceNodeID = 2, targetNodeID = 3, value = 1400 }   // Profit allocation
};
```

## Dynamic Link Rendering

The `LinkRendering` event triggers before each link renders, enabling dynamic styling based on flow values, source-target combinations, or other data attributes:

### Link Rendering Event Syntax

```html
<ejs-sankey id="dynamicLinkSankey"
                 width="100%" height="420px"
                 linkRendering="onLinkRendering">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
function onLinkRendering(args) {
    // args.data - The link data object
    // args.link - The link element being rendered
    // Modify properties before rendering completes
}
</script>
```

### Value-Based Opacity Example

```html
<script>
function onLinkRendering(args) {
    // Thicker links (higher values) get more opacity
    if (args.data.value > 500) {
        args.link.opacity = 0.8;      // Major flow paths
    } else if (args.data.value > 200) {
        args.link.opacity = 0.5;      // Normal flow paths
    } else {
        args.link.opacity = 0.2;      // Minor flow paths
    }
}
</script>
```

### Conditional Color Example

```html
<script>
function onLinkRendering(args) {
    // Color based on flow amount
    if (args.data.value > 1000) {
        args.link.fill = "#D32F2F";   // Red for critical flows
    } else if (args.data.value > 500) {
        args.link.fill = "#F57C00";   // Orange for significant flows
    } else {
        args.link.fill = "#1976D2";   // Blue for normal flows
    }
}
</script>
```

### Pattern Detection Example

```html
<script>
function onLinkRendering(args) {
    // Identify and highlight specific flow patterns
    const sourceLabel = findNodeLabel(args.data.sourceNodeID);
    const targetLabel = findNodeLabel(args.data.targetNodeID);
    
    // Highlight flows from "Critical" source
    if (sourceLabel.includes("Critical")) {
        args.link.strokeWidth = 2;
        args.link.opacity = 0.9;
    }
}

function findNodeLabel(nodeId) {
    // Helper function to get node label from ID
    // Implement based on your node data structure
}
</script>
```

## Best Practices

### Link Design Guidelines

1. **Opacity Balance**: Keep normal opacity between 0.3-0.5 for visibility without overwhelming
2. **Curvature Selection**: Choose based on layout density:
   - Dense layouts (many nodes): Lower curvature (0.4-0.5)
   - Sparse layouts (few nodes): Higher curvature (0.6-0.8)
3. **Color Type Strategy**:
   - Use 'Blend' for most cases (balanced visualization)
   - Use 'Source' when tracking origins is critical
   - Use 'Target' when destinations are important
4. **Value Representation**: Ensure values are visible through link thickness variation
5. **Interactive Feedback**: Use opacity changes to guide user attention

### Performance Considerations

- Global `LinkStyle` settings are faster than individual link properties
- Use `LinkRendering` event only for complex conditional logic
- Test with large datasets (1000+ links) to verify performance
- Consider simplifying visualization if too many links overlap

### Accessibility

- Use color + thickness for information encoding (don't rely on color alone)
- Ensure sufficient contrast between link and background
- Provide legend or tooltips explaining link meanings
- Test for colorblind visibility (red-green colorblind users)

### Common Patterns

**Pattern: Hierarchical Flow Visualization**
```html
<e-sankey-linksettings 
    colorType="Target"
    opacity="0.4"
    curvature="0.6"
    highlightOpacity="0.9">
</e-sankey-linksettings>
```

**Pattern: Source Tracking**
```html
<e-sankey-linksettings 
    colorType="Source"
    opacity="0.5"
    curvature="0.4"
    highlightOpacity="1.0">
</e-sankey-linksettings>
```

**Pattern: Dense Multi-Path Flow**
```html
<e-sankey-linksettings 
    colorType="Blend"
    opacity="0.25"
    curvature="0.3"
    highlightOpacity="0.8"
    inactiveOpacity="0.05">
</e-sankey-linksettings>
```
