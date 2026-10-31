# Diagram Settings and Configuration in Syncfusion Vue Diagram

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

## Overview

Diagram settings control appearance, performance, and user experience features like layers, grid, ruler, viewport, and accessibility options.

## Layers

Layer organizes related shapes within a diagram control as named categories.

```javascript
const layerConfig = {
  layers: [
    {
      id: 'background',
      visible: true,
      lock: false,
      objects: ['bgNode']
    },
    {
      id: 'default',
      visible: true,
      lock: false,
      objects: ['node1', 'node2', 'connector1']
    },
    {
      id: 'foreground',
      visible: true,
      lock: false,
      objects: ['annotation1']
    }
  ]
};

diagram.layers = layerConfig.layers;
```

### Layer Operations

```javascript
// Add layer
diagram.addLayer('newLayer', []);

// Lock layer (prevent editing)`
diagram.layers[0].lock = true;

// Hide layer
diagram.layers[0].visible = false;

// Remove layer
diagram.removeLayer('layerId');

// Get active layer
const activeLayer = diagram.getActiveLayer();

// Set active layer
diagram.setActiveLayer('layerId');

// Move the layer forward
diagram.bringLayerForward('layerId');

// Move the layer backward
diagram.sendLayerBackward('layer1');

// Clone the layer
diagram.cloneLayer('layer1');

```

### Adding Objects to Layers

```javascript
 let newLayer = {
    id: 'newlayer',
    visible: true,
    lock: false,
  };
  let layerObject = [
    {
      id: 'con1',
      type: 'Straight',
      sourceID: 'node1',
      targetID: 'node2',
    },
  ];
  /**
   * Add the layers to the existing diagram layer collection
   * newLayer - representing the layer to be added to the diagram.
   * layerObject -  An optional array of objects associated with the layer.
   */
  diagram.addLayer(newLayer, layerObject);
```

## Virtualization

Virtualization improves performance for large diagrams by rendering only visible elements:

```javascript
// To enable virtualization in a diagram, you need to include the virtualization constraint in the diagram’s constraints
diagram.constraints = DiagramConstraints.Default | DiagramConstraints.Virtualization,
```

## Grid Lines

Grid provides snapping and visual alignment guidance:

```javascript
Diagram.Inject(Snapping);

const gridSettings = {
  // Enable grid lines and snapping to grid + objects via constraints
  constraints: SnapConstraints.ShowLines | SnapConstraints.SnapToLines | SnapConstraints.SnapToObject,

  // Snap rotation angle (degrees)
  snapAngle: 5,

  // Grid pattern
  gridType: 'Dots', // Lines or Dots

  // Customize gridlines
  horizontalGridlines: {
    lineIntervals: [1, 9, 0.25, 9.75],
    lineColor: '#e0e0e0',
    lineDashArray: '2 2'
  },
  verticalGridlines: {
    lineIntervals: [1, 9, 0.25, 9.75],
    lineColor: '#e0e0e0',
    lineDashArray: '2 2'
  }
};

diagram.snapSettings = gridSettings;
```

### Snap Constraints

Snap constraints define how snapping behaves inside the Diagram.
- None
- ShowHorizontalLines
- ShowLines
- ShowVerticalLines
- SnapToHorizontalLines
- SnapToLines
- SnapToObject
- SnapToVerticalLines

```javascript
const snapSettings = {
  snapToObject: true,
  constraints: 
    SnapConstraints.All & 
    ~SnapConstraints.SnapToLines,
};
```

## Ruler

Ruler shows distance measurements and positioning guides:

```javascript
const rulerSettings = {
  showRulers: true,
  horizontalRuler: {
    thickness: 30,
    segmentWidth: 50,
    orientation: 'Horizontal'
  },
  verticalRuler: {
    thickness: 30,
    segmentWidth: 50,
    orientation: 'Vertical'
  }
};

diagram.rulerSettings = rulerSettings;
```

### Ruler Configuration

```javascript
diagram.rulerSettings = {
  showRulers: true,
  horizontalRuler: {
    thickness: 25,
    segmentWidth: 100,
    tickAlignment: 'LeftOrTop',
    interval: 10
  },
  verticalRuler: {
    thickness: 25,
    segmentWidth: 100,
    tickAlignment: 'LeftOrTop',
    interval: 10
  }
};
```

## Scroll Settings

Control viewport panning and scrolling behavior:

```javascript
const scrollSettings = {
  canAutoScroll: true,              // Auto-pan when dragging near edge
  autoScrollBorder: { left: 15, top: 15, right: 15, bottom: 15 },
  scrollLimit: 'Infinity',          // Infinity or Diagram
  horizontalOffset: 100,
  verticalOffset: 100,
  currentZoom: 3
};

diagram.scrollSettings = scrollSettings;
```

### Viewport Configuration

```javascript
const viewportConfig = {
  canAutoScroll: true,
  scrollLimit: 'Diagram',           // Limit scrolling to diagram bounds
  autoScrollBorder: { left: 20, top: 20, right: 20, bottom: 20 },
  minZoom: 0.2,
  maxZoom: 5
};

diagram.scrollSettings = viewportConfig;
```

### Set Viewport Position

```javascript
// Pan to specific location
diagram.scrollSettings.horizontalOffset = 100;
diagram.scrollSettings.verticalOffset = 100;

// Fit diagram to viewport
diagram.fitToPage();

// Zoom to specific level
diagram.zoom(1.5);
```

## Page Settings

Configure page/canvas size and orientation:

```javascript
const pageSettings = {
  width: 1000,
  height: 750,
  orientation: 'Portrait',             // 'Portrait' | 'Landscape'
  margin: { top: 10, bottom: 10, left: 10, right: 10 },
  multiplePage: false,
  boundaryConstraints: 'Infinity'      // 'Infinity' | 'Diagram' | 'Page'
};

diagram.pageSettings = pageSettings;
```

### Multiple Pages

```javascript
const multiPageSettings = {
  width: 800,
  height: 600,
  multiplePage: true,
  margin: { top: 20, bottom: 20, left: 20, right: 20 },
  boundaryConstraints: 'Page',         // keeps interaction bounded to the page
  showPageBreaks: true                 // optional visual guides
};
```

## Tooltip

Configure element tooltips:

```javascript

diagram.constraints = DiagramConstraints.Default | DiagramConstraints.Tooltip,

```

### Node Tooltips

```javascript
const node = {
  id: 'node1',
  offsetX: 250,
  offsetY: 250,
  width: 100,
  height: 60,
  constraints: NodeConstraints.Default | NodeConstraints.Tooltip,
  tooltip: {
    content: 'This is Node 1',
    position: 'TopCenter',
    relativeMode: 'Object'
  }
};
```

## Overview Panel

Minimap showing diagram overview:

```vue
<template>
  <div style="display: flex;">
    <ejs-overview 
      id="overview"
      :sourceID="diagramId"
      :width="overviewWidth"
      :height="overviewHeight"
    ></ejs-overview>
    
    <ejs-diagram 
      id="diagram"
      ref="diagramRef"
      :width="diagramWidth"
      :height="diagramHeight"
    ></ejs-diagram>
  </div>
</template>

<script setup>
import { OverviewComponent as EjsOverview, DiagramComponent as EjsDiagram } from '@syncfusion/ej2-vue-diagrams';

const diagramId = 'diagram';
const overviewWidth = '300px';
const overviewHeight = '200px';
const diagramWidth = '100%';
const diagramHeight = '590px';
</script>
```

## Localization

Support for multiple languages:

```vue
<script>
import { DiagramComponent } from '@syncfusion/ej2-vue-diagrams';
import { setCulture, L10n } from '@syncfusion/ej2-base';

// Set the default culture to German
setCulture('de');

// Load locale text for the diagram context menu
L10n.load({
  'de-DE': {
    Diagram: {
      Cut: 'Schneiden',
      Copy: 'Kopieren',
      Paste: 'Einfügen',
      Delete: 'Löschen'
    }
  }
});
</script>

<template>
  <ejs-diagram id="diagram" width="100%" height="300px" locale="de-DE" />
</template>
```

## Complete Settings Configuration Example

```vue
<template>
  <div>
    <ejs-diagram
      id="diagram"
      ref="diagramRef"
      :width="width"
      :height="height"
      :nodes="nodes"
      :pageSettings="pageSettings"
      :snapSettings="snapSettings"
      :rulerSettings="rulerSettings"
      :scrollSettings="scrollSettings"
      :constraints="diagramConstraints"
    ></ejs-diagram>
  </div>
</template>

<script setup>
import {
  DiagramComponent as EjsDiagram,
  DiagramConstraints,
  SnapConstraints
} from '@syncfusion/ej2-vue-diagrams';

const width = '100%';
const height = '590px';

const nodes = [];

const pageSettings = {
  width: 1000,
  height: 750,
  orientation: 'Landscape', // 'Portrait' | 'Landscape'
  margin: { top: 10, bottom: 10, left: 10, right: 10 }
};

const snapSettings = {
  gridType: 'Lines', // 'Lines' | 'Dots'
  constraints:
    SnapConstraints.ShowLines |
    SnapConstraints.SnapToObject
};

const rulerSettings = {
  showRulers: true
  horizontalRuler: { thickness: 25, segmentWidth: 100, tickAlignment: 'LeftOrTop', interval: 10 },
  verticalRuler:   { thickness: 25, segmentWidth: 100, tickAlignment: 'LeftOrTop', interval: 10 }
};

const scrollSettings = {
  canAutoScroll: true,
  scrollLimit: 'Infinity'
  autoScrollBorder: { left: 15, top: 15, right: 15, bottom: 15 },
  horizontalOffset: 0,
  verticalOffset: 0,
  minZoom: 0.2,
  maxZoom: 5
};


const diagramConstraints =
  DiagramConstraints.Default | DiagramConstraints.Tooltip;
</script>

```

Diagram settings provide comprehensive control over appearance, performance, and user experience, enabling optimized diagrams for various use cases and audiences.
