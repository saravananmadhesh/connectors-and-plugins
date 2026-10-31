# Z-Order and Layer Management

## What is Z-Order?

Z-order (or stacking order) controls how annotations are layered when multiple are present. It determines which annotations appear on top and which appear behind.

## Layer Operations

### Bring Forward

Move a selected annotation one layer up (forward):

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Select an annotation first
imageEditor.selectShape(shapeId);

// Move it forward one layer
imageEditor.bringForward();
```

**Result:** Annotation moves up one position in the stacking order.

### Send Backward

Move a selected annotation one layer down (backward):

```javascript
// Select an annotation
imageEditor.selectShape(shapeId);

// Move it backward one layer
imageEditor.sendBackward();
```

**Result:** Annotation moves down one position in the stacking order.

### Bring to Front

Move a selected annotation to the very top:

```javascript
// Select an annotation
imageEditor.selectShape(shapeId);

// Move it to the front (top layer)
imageEditor.bringToFront();
```

**Result:** Annotation appears on top of all others.

### Send to Back

Move a selected annotation to the very bottom:

```javascript
// Select an annotation
imageEditor.selectShape(shapeId);

// Move it to the back (bottom layer)
imageEditor.sendToBack();
```

**Result:** Annotation appears behind all others.

## Layer Management Example

```vue
<template>
  <div>
    <div>
      <h3>Layer Management</h3>
      <button @click="drawShapes">Draw Multiple Shapes</button>
      <button @click="bringForward" :disabled="!shapeSelected">Bring Forward</button>
      <button @click="sendBackward" :disabled="!shapeSelected">Send Backward</button>
      <button @click="bringToFront" :disabled="!shapeSelected">Bring to Front</button>
      <button @click="sendToBack" :disabled="!shapeSelected">Send to Back</button>
      <p>{{ layerInfo }}</p>
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px" 
      width="100%"
      :created="onCreated"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);
const shapeSelected = ref(false);
const layerInfo = ref('Draw shapes and select them to manage layers');

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const drawShapes = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  
  // Draw overlapping shapes
  imageEditor.drawShape('Rectangle', {
    x: 50, y: 50, width: 150, height: 120,
    fillColor: 'rgba(255, 0, 0, 0.5)',
    strokeColor: '#FF0000'
  });
  
  imageEditor.drawShape('Ellipse', {
    x: 120, y: 80, width: 150, height: 120,
    fillColor: 'rgba(0, 255, 0, 0.5)',
    strokeColor: '#00FF00'
  });
  
  imageEditor.drawShape('Rectangle', {
    x: 180, y: 120, width: 150, height: 120,
    fillColor: 'rgba(0, 0, 255, 0.5)',
    strokeColor: '#0000FF'
  });
  
  layerInfo.value = 'Three overlapping shapes drawn. Click a shape to select it.';
};

const bringForward = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.bringForward();
  layerInfo.value = 'Selected shape moved forward one layer';
};

const sendBackward = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.sendBackward();
  layerInfo.value = 'Selected shape moved backward one layer';
};

const bringToFront = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.bringToFront();
  layerInfo.value = 'Selected shape moved to front';
};

const sendToBack = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.sendToBack();
  layerInfo.value = 'Selected shape moved to back';
};
</script>

<style>
button {
  margin: 5px;
  padding: 8px 12px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

p {
  font-style: italic;
  margin-top: 10px;
}
</style>
```

## Layer Workflow

### Creating a Layered Design

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// Layer 1: Background rectangle
imageEditor.drawShape('Rectangle', {
  x: 0, y: 0, width: 400, height: 300,
  fillColor: '#CCCCCC'
});

// Layer 2: Decorative frame
imageEditor.drawFrame('Mat', '#8B7355', null, 25);

// Layer 3: Main content (overlaps frame)
imageEditor.drawShape('Ellipse', {
  x: 100, y: 50, width: 200, height: 200,
  fillColor: 'rgba(255, 255, 255, 0.9)'
});

// Layer 4: Text on top
imageEditor.drawText(150, 150, 'Hello', 'Arial', 24);

// Adjust layers as needed
imageEditor.selectShape(lastShapeId);
imageEditor.bringToFront();
```

## Managing Multiple Annotations

```vue
<template>
  <div>
    <div>
      <h3>Annotation Manager</h3>
      <button @click="viewLayers">View All Layers</button>
      <button @click="organizeStack">Auto-Organize Stack</button>
      <div v-if="layersList" style="border: 1px solid #ccc; padding: 10px; margin-top: 10px;">
        <p>{{ layersList }}</p>
      </div>
    </div>
    <ejs-imageeditor ref="imageEditorObj" height="500px" width="100%"></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);
const layersList = ref('');

const viewLayers = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  const shapes = imageEditor.getShapes();
  
  let list = `Total annotations: ${shapes.length}\n`;
  shapes.forEach((shape, index) => {
    list += `${index + 1}. ${shape.type || 'Shape'}\n`;
  });
  
  layersList.value = list;
};

const organizeStack = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  const shapes = imageEditor.getShapes();
  
  // Organize by type: shapes first, text last
  shapes.forEach((shape, index) => {
    if (shape.type === 'Text') {
      imageEditor.selectShape(shape.id);
      imageEditor.bringToFront();
    }
  });
  
  layersList.value = 'Stack organized: text on top';
};
</script>

<style>
button {
  margin: 5px;
  padding: 8px 12px;
}

div[style*="border"] {
  background-color: #f9f9f9;
  font-family: monospace;
  white-space: pre;
}
</style>
```

## Use Cases for Z-Order

### 1. Design Templates

```javascript
// Create layered greeting card
imageEditor.drawShape('Rectangle', { /* background */ });
imageEditor.drawFrame('Hook', '#D4AF37', null, 30);  // Frame layer
imageEditor.drawText(150, 100, 'Happy Birthday!', 'Arial', 32);  // Text on top
```

### 2. Annotation Organization

```javascript
// Put important annotations on top
imageEditor.selectShape(importantAnnotationId);
imageEditor.bringToFront();
```

### 3. Layered Artwork

```javascript
// Create artistic overlays
imageEditor.drawShape('Ellipse', { /* base circle */ });
imageEditor.drawShape('Rectangle', { /* overlay */ });
// Adjust z-order for desired effect
```

## Z-Order History

All z-order operations are tracked in undo/redo:

```javascript
// Change z-order
imageEditor.bringToFront();

// Undo the z-order change
imageEditor.undo();

// Redo the z-order change
imageEditor.redo();
```

## Layer Selection

```javascript
// Click on annotations to select them
// When selected, layer control buttons become enabled
imageEditor.selectShape(shapeId);

// Now you can adjust layer:
imageEditor.bringForward();
```

## Best Practices

1. **Clear hierarchy:** Use consistent layering strategy
2. **Test visibility:** Ensure important content isn't hidden
3. **Performance:** Keep number of layers reasonable
4. **User feedback:** Show which layer is selected
5. **Organization:** Group related annotations at same layer level
6. **Documentation:** Explain layer purpose to users if complex

## Advanced Layer Control

```javascript
// Get all shapes and their current order
const shapes = imageEditor.getShapes();

// Map to understand current stacking
const layerMap = shapes.map((shape, index) => ({
  id: shape.id,
  type: shape.type,
  layer: index  // 0 = back, highest = front
}));

console.log('Current layer stack:', layerMap);
```
