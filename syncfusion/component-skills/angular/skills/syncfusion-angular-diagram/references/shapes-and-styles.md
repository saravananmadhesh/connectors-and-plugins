# Shapes and Styles

## Quick Reference: Shape Types

### Choose the Correct `type` Value

| Use Case | Type Value | Example |
|----------|-----------|---------|
| **Flowchart shapes** (Process, Decision, Terminator) | `'Flow'` | `{ type: 'Flow', shape: 'Process' }` |
| **BPMN shapes** (Task, Event, Gateway) | `'Bpmn'` | `{ type: 'Bpmn', shape: 'Task' }` |
| **Basic geometry** (Rectangle, Circle, Star) | `'Basic'` | `{ type: 'Basic', shape: 'Rectangle' }` |
| **UML shapes** (Class, Interface, Component) | `'UmlClassifier'` | `{ type: 'UmlClassifier', shape: 'Class' }` |
| **Custom SVG path** | `'Path'` | `{ type: 'Path', data: 'M 0 0 ...' }` |
| **Images/Avatars** | `'Image'` | `{ type: 'Image', source: 'url' }` |
| **HTML content** | `'Html'` | `{ type: 'Html', content: '<div>...</div>' }` |
| **Native SVG** | `'Native'` | `{ type: 'Native', content: '<svg>...</svg>' }` |

⚠️ **Common Mistake:** Do NOT use `'FlowShape'` - Use `'Flow'` instead!

---

## Built-in Shape Types

### Flow Shapes

Used for process flowcharts and business logic:

```typescript
shape: { type: 'Flow', shape: 'Process' }
```

**Available Flow shapes:**
- `Process` - Rectangle (default process step)
- `Decision` - Diamond (yes/no branch)
- `Terminator` - Rounded rectangle (start/end)
- `Data` - Parallelogram (data input/output)
- `DirectData` - Double-sided parallelogram
- `SequentialData` - Stacked boxes
- `PaperTape` - Wavy bottom (tape symbol)
- `Sort` - Triangle pointing down
- `MultiDocument` - Stacked documents
- `Collate` - Hourglass shape
- `SummingJunction` - Circle with cross
- `Or` - Curved bow-tie
- `Extract` - Trapezoid (extraction)
- `Merge` - Inverted trapezoid
- `OfflineStorage` - Cylinder (vertical)
- `OnlineStorage` - Cylinder (horizontal)
- `ManualInput` - Trapezoid pointing down
- `ManualOperation` - Pentagon
- `LoopLimit` - Rectangle with arc
- `Delay` - Semi-circle (delay)

### Basic Shapes

Simple geometric shapes:

```typescript
shape: { type: 'Basic', shape: 'Rectangle' }
```

**Available Basic shapes:**
- `Rectangle` - Standard box
- `Ellipse` - Circle/oval
- `Hexagon` - 6-sided polygon
- `Pentagon` - 5-sided polygon
- `Triangle` - 3-sided polygon
- `Star` - 5-pointed star
- `Cylinder` - 3D cylinder
- `Parallelogram` - Slanted box

### Path (Custom SVG) Shapes

Define custom shapes using SVG path data:

```typescript
shape: {
  type: 'Path',
  data: 'M 20 20 L 20 500 L 500 500 L 500 20 Z'
}
```

The `data` property accepts any valid SVG path string.

### Image Shapes

Display images as nodes:

```typescript
shape: {
  type: 'Image',
  source: 'https://example.com/avatar.png'
}
```

**Scale options:**
- `Stretch` - Fit to node size (may distort)
- `Meet` - Fit inside without distortion
- `Slice` - Fill with cropping
- `None` - Original size

### HTML Shapes

Render HTML content as nodes:

```typescript
shape: {
  type: 'HTML',
  content: '<div style="background:lightblue;padding:10px;border-radius:5px;"><b>HTML Content</b></div>'
}
```

### Native SVG

Embed raw SVG:

```typescript
shape: {
  type: 'Native',
  content: '<svg width="100" height="100"><circle cx="50" cy="50" r="40" fill="blue"/></svg>'
}
```

---

## Styling Nodes

### Basic Colors

```typescript
{
  id: 'node1',
  style: {
    fill: '#90EE90',          // Light green background
    strokeColor: '#228B22',        // Dark green border
    strokeWidth: 2,           // Border thickness
    opacity: 0.8              // Transparency (0-1)
  }
}
```

### Dashed and Dotted Borders

```typescript
{
  id: 'node1',
  style: {
    strokeColor: '#000000',
    strokeWidth: 2,
    dashArray: '5,5'          // 5px dash, 5px gap (dashed)
  }
}

// Dotted
dashArray: '1,2'              // Dotted pattern
// Solid (default)
dashArray: ''                 // No dashes
```

### Gradients

```typescript
{
  id: 'node1',
  style: {
    gradient: {
      type: 'Linear',
      x1: 0,                  // Start X (% of width)
      y1: 0,                  // Start Y (% of height)
      x2: 100,                // End X
      y2: 100,                // End Y
      stops: [
        { color: '#FF0000', offset: 0 },      // Red at start
        { color: '#0000FF', offset: 100 }     // Blue at end
      ]
    }
  }
}
```

**Gradient types:** Linear, Radial

### Shadow Effects

```typescript
{
  id: 'node1',
  style: {
    fill: '#90EE90',
    shadow: {
      angle: 45,              // Shadow direction (degrees)
      blur: 15,               // Blur radius
      color: 'rgba(0,0,0,0.3)',  // Shadow color with opacity
      distance: 5             // Distance from object
    }
  }
}
```

### Custom CSS Classes

```typescript
{
  id: 'node1',
  style: {
    fill: '#90EE90'
  },
  // Add custom CSS class
  // Then style with CSS
}

/* In your stylesheet */
.my-node {
  filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.3));
}
```

---

## Color Reference

### Named Colors
```
Common: black, white, gray, red, green, blue, yellow, orange, purple, pink, cyan, magenta
Light: lightblue, lightgreen, lightgray, lightyellow
Dark: darkblue, darkgreen, darkred, darkgray, navy
```

### Hex Colors
```
#FF0000   (Red)
#00FF00   (Green)
#0000FF   (Blue)
#FFFF00   (Yellow)
#FF00FF   (Magenta)
#00FFFF   (Cyan)
#808080   (Gray)
```

### RGB/RGBA
```typescript
fill: 'rgb(255, 0, 0)'              // Red
fill: 'rgba(255, 0, 0, 0.5)'        // Semi-transparent red
```

---

## Theme Customization

### Using CSS Variables

```typescript
// In global styles.css
:root {
  --diagram-fill: #90EE90;
  --diagram-strokeColor: #228B22;
}

// In component
style: {
  fill: 'var(--diagram-fill)',
  strokeColor: 'var(--diagram-strokeColor)'
}
```

### Theme Classes

Syncfusion applies theme classes automatically:
- `.e-light` - Light theme
- `.e-dark` - Dark theme
- `.e-highcontrast` - High contrast

```typescript
// Override in style
.e-diagram .my-node {
  fill: #90EE90;
}
```

---

## Text Styling

### Font Properties

```typescript
// On nodes with annotations
annotations: [
  {
    content: 'Styled Text',
    style: {
      fontSize: 14,
      fontFamily: 'Arial',
      bold: true,
      italic: false,
      color: '#000000',    // Note: "color" for text, not "fill"
      fill: '#000000'      // Also supports "fill"
    }
  }
]
```

---

**→ Next: Create special diagram types with [BPMN diagrams](bpmn-diagrams.md)**
