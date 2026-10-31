# Diagram Settings

## Table of Contents
- [Overview](#overview)
- [Layers](#layers)
- [Virtualization](#virtualization)
- [Grid Lines](#grid-lines)
- [Ruler](#ruler)
- [Scroll Settings](#scroll-settings)
- [Page Settings](#page-settings)
- [Tooltip](#tooltip)
- [Overview Panel](#overview-panel)
- [Localization](#localization)
- [Accessibility](#accessibility)

## Overview

**Diagram Settings** control appearance, performance, and behavior of the diagram canvas.

---

## Layers

**Layers** organize diagram elements by z-order and visibility.

### Define Layers

```typescript
// Define layers in the diagram
this.layers = [
  {
    id: 'layer1',
    visible: true,
    objects: ['node1', 'node2'],
    lock: false
  },
  {
    id: 'layer2',
    visible: true,
    objects: ['node3'],
    lock: false
  }
];
```

### Layer Operations

```typescript
// Add a layer at runtime
diagram.addLayer({ id: 'newLayer', visible: true, lock: false }, [node]);

// Remove a layer by ID
diagram.removeLayer('layer1');

// Move objects between layers
diagram.moveObjects(['node1'], 'layer2');

// Get the active layer
const activeLayer = diagram.getActiveLayer();

// Set the active layer
diagram.setActiveLayer('layer2');

// Bring a layer forward
diagram.bringLayerForward('layer1');

// Send a layer backward
diagram.sendLayerBackward('layer1');

// Clone a layer
diagram.cloneLayer('layer1');
```

### Layer Visibility and Lock

```typescript
// Set layer visibility
this.layers[0].visible = false;

// Lock/unlock layer
this.layers[0].lock = true; // Prevent editing
this.layers[0].lock = false; // Allow editing
```

---

## Virtualization

**Virtualization** improves performance for large diagrams by rendering only visible elements.

### Enable Virtualization

```typescript
diagram.constraints = DiagramConstraints.Default | DiagramConstraints.Virtualization;
```

### Virtualization Settings

```typescript
// No special pageSettings are required for virtualization.
// Just set the Virtualization constraint on the diagram:
diagram.constraints = DiagramConstraints.Default | DiagramConstraints.Virtualization;
```

### Benefits

- Handles 10,000+ nodes efficiently
- Reduces memory usage
- Smooth panning and zooming
- Automatic element culling (hide off-screen elements)

---

## Grid Lines

**Grid lines** help with alignment and snapping.

### Enable Grid

```typescript
diagram.snapSettings = {
  constraints: SnapConstraints.ShowLines,
  horizontalGridlines: { snapIntervals: [5] },
  verticalGridlines: { snapIntervals: [5] }
};
```

### Grid Line Appearance

```typescript
diagram.snapSettings = {
  constraints: SnapConstraints.ShowLines,
  horizontalGridlines: {
    lineColor: '#E0E0E0',
    lineIntervals: [1, 9, 0.25, 9.75],
    snapIntervals: [5]
  },
  verticalGridlines: {
    lineColor: '#E0E0E0',
    lineIntervals: [1, 9, 0.25, 9.75],
    snapIntervals: [5]
  }
};
```

### Grid Styles

```typescript
// Dots
diagram.snapSettings = {
  gridType: 'Dots',
  horizontalGridlines: { dotIntervals: [3, 20, 1, 20] },
  verticalGridlines: { dotIntervals: [3, 20, 1, 20] },
  constraints: SnapConstraints.ShowLines
};

// Lines (default)
diagram.snapSettings = {
  gridType: 'Lines',
  horizontalGridlines: { snapIntervals: [5] },
  constraints: SnapConstraints.ShowLines
};
```

---

## Ruler

**Ruler** shows measurement guides.

### Enable Ruler

```typescript
diagram.rulerSettings = {
  showRulers: true,
  horizontalRuler: {
    thickness: 30
  },
  verticalRuler: {
    thickness: 30
  }
};
```

### Ruler Configuration

```typescript
rulerSettings: {
  showRulers: true,
  horizontalRuler: {
    thickness: 30,
    interval: 5,      // Major tick interval
    segmentWidth: 50,
    markerColor: '#000000'
  },
  verticalRuler: {
    thickness: 30,
    interval: 5,
    segmentWidth: 50
  }
}
```

---

## Scroll Settings

Control panning and scrolling behavior.

### Auto-scroll

```typescript
diagram.scrollSettings = {
  canAutoScroll: true,
  autoScrollBorder: { left: 15, right: 15, top: 15, bottom: 15 }
};
```

### Scroll Limits and Zoom

```typescript
diagram.scrollSettings = {
  minZoom: 0.2,
  maxZoom: 5.0,
  currentZoom: 1.0
};
```

### Scroll Position

```typescript
// Get scroll position
const scrollX = diagram.scrollSettings.horizontalOffset;
const scrollY = diagram.scrollSettings.verticalOffset;

// Set scroll position
diagram.scrollSettings.horizontalOffset = 100;
diagram.scrollSettings.verticalOffset = 100;
diagram.dataBind();
```

---

## Page Settings

Configure page size and margins for printing/export.

### Page Size

```typescript
diagram.pageSettings = {
  width: 816,      // 8.5" × 11" (Letter)
  height: 1056,
  orientation: 'Portrait',
  margin: {
    left: 20,
    top: 20,
    right: 20,
    bottom: 20
  }
};
```

### Standard Sizes

```typescript
// Letter (8.5" × 11")
width: 816, height: 1056

// A4 (210mm × 297mm)
width: 794, height: 1123

// Tabloid (11" × 17")
width: 1056, height: 1632

// Legal (8.5" × 14")
width: 816, height: 1344
```

### Orientation

```typescript
orientation: 'Portrait'   // Taller than wide
orientation: 'Landscape'  // Wider than tall
```

### Fit to Page

```typescript
diagram.fitToPage();  // Scale diagram to fit page
```

---

## Tooltip

Show tooltips on hover.

### Enable Tooltips

```typescript
diagram.tooltip = {
  content: 'Diagram tooltip',
  position: 'TopCenter',
  relativeMode: 'Object'
};
```

### Custom Tooltip for Node

```typescript
{
  id: 'node1',
  tooltip: {
    content: 'This is Node 1',
    position: 'TopCenter',
    relativeMode: 'Object'
  },
  constraints: NodeConstraints.Default | NodeConstraints.Tooltip
}
```

### Show/Hide Tooltip Programmatically

```typescript
// Show tooltip
diagram.showTooltip(diagram.nodes[0]);

// Hide tooltip
diagram.hideTooltip(diagram.nodes[0]);
```

---

## Overview Panel

Minimap showing full diagram overview.

### Enable Overview

```typescript
<div style="display:flex">
  <ejs-diagram #diagram id="diagram"></ejs-diagram>
  <ejs-overview id="overview" [sourceID]="'diagram'" width="200" height="150"></ejs-overview>
</div>
```

---

## Localization

Support multiple languages.

### Set Language

```typescript
import { L10n, setCulture } from '@syncfusion/ej2-base';

L10n.load({
  'fr': {
    'diagram': {
      'save': 'Enregistrer',
      'undo': 'Annuler',
      'redo': 'Rétablir'
    }
  },
  'de-DE': {
    'diagram': {
      'save': 'Speichern',
      'undo': 'Rückgängig',
      'redo': 'Wiederherstellen'
    }
  }
});

// Use French
setCulture('fr');
```

---

## Accessibility

WCAG 2.1 compliance for accessible diagrams.

### ARIA Labels

```typescript
{
  id: 'node1',
  accessibility: {
    description: 'Process node representing order validation',
    role: 'img'
  },
  annotations: [{
    content: 'Validate Order',
    style: { color: 'black' }
  }]
}
```

### Keyboard Navigation

Supported keys:
- Tab / Shift+Tab: Move focus
- Enter: Select
- Escape: Deselect
- Arrow Keys: Move selected element
- Ctrl+A/X/C/V/Z/Y: Select All, Cut, Copy, Paste, Undo, Redo

### Screen Reader Support

Diagram elements use ARIA attributes for screen readers. Use `ariaLabel` and `accessibility` properties as needed.

### High Contrast Mode

```typescript
// Apply high contrast theme
import '@syncfusion/ej2-angular-theme-default/styles/highcontrast.css';
```

### Color Accessibility

```typescript
// Ensure sufficient contrast
style: {
  fill: '#FFFFFF',     // Light background
  strokeColor: '#000000',   // Dark border
  color: '#000000'     // Dark text
}

// Avoid color-only information
annotations: [{
  content: '✓ Approved',  // Use symbols in addition to color
  style: { color: 'green' }
}]
```

---

**→ Reference complete. See [SKILL.md](../SKILL.md) for navigation guide.**
