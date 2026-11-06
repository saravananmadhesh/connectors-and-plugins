# Undo and Redo History

## Undo Operations

Revert the most recent editing action:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.undo();
```

**What gets undone:**
- Annotations (text, shapes, drawings)
- Filters and effects
- Transformations (rotate, flip)
- Resize operations
- Crop operations
- Frame additions
- Redactions
- Fine-tuning adjustments

## Redo Operations

Reapply previously undone actions:

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;
imageEditor.redo();
```

**When to use:**
- After undoing, if you decide to keep the change
- Experimenting with different edits

## History Stack Capacity

The Image Editor maintains a **16-step history**:
- Stores the 16 most recent actions
- When you exceed 16 steps, oldest action is removed
- This limit applies to all operations combined

```javascript
// Example: 16 actions
1. Rotate 90°
2. Add text
3. Apply filter
4. Undo (back to step 2)
5. Redo (forward to step 3)
...and so on (max 16 total)
```

## Complete Undo/Redo Example

```vue
<template>
  <div>
    <div>
      <button @click="handleUndo" :disabled="!canUndo">Undo</button>
      <button @click="handleRedo" :disabled="!canRedo">Redo</button>
      <span>{{ historyInfo }}</span>
    </div>
    <ejs-imageeditor 
      ref="imageEditorObj" 
      height="500px" 
      width="100%"
      :toolbar="['Undo', 'Redo', 'Open', 'Crop', 'Rotate', 'Annotate', 'Save']"
      :created="onCreated"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref, computed } from "vue";

const imageEditorObj = ref(null);
const canUndo = ref(false);
const canRedo = ref(false);
const historyInfo = ref('Ready');

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const handleUndo = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.undo();
  updateHistoryStatus();
};

const handleRedo = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.redo();
  updateHistoryStatus();
};

const updateHistoryStatus = () => {
  // This would need custom tracking; the component doesn't expose history length
  historyInfo.value = 'Action performed';
  canUndo.value = true;
  canRedo.value = true;
};
</script>

<style>
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button {
  margin: 5px;
  padding: 8px 12px;
}

span {
  margin-left: 20px;
  font-style: italic;
}
</style>
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |

Users can use these keyboard shortcuts without explicit code.

## Practical Workflow

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// User makes several edits
imageEditor.rotate(90);           // Step 1
imageEditor.drawText(100, 100, 'Label', 'Arial', 16);  // Step 2
imageEditor.applyImageFilter('Sepia');  // Step 3
imageEditor.finetuneImage('Brightness', 20);  // Step 4

// User regrets step 4
imageEditor.undo();  // Back to step 3

// User regrets step 3 too
imageEditor.undo();  // Back to step 2

// User changes mind, wants step 3 back
imageEditor.redo();  // Forward to step 3

// User continues with new edits
imageEditor.resize(800, 600, true);  // Step 5
```

## Complex Scenario

```vue
<template>
  <div>
    <div>
      <button @click="performEdits">Perform Multiple Edits</button>
      <button @click="undoAll">Undo All</button>
      <button @click="resetImage">Reset Image</button>
    </div>
    <ejs-imageeditor ref="imageEditorObj" height="500px" width="100%"></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);

const performEdits = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  
  // Apply multiple edits (uses 6 history slots)
  imageEditor.rotate(90);
  imageEditor.drawText(100, 100, 'Demo', 'Arial', 16);
  imageEditor.applyImageFilter('Sepia');
  imageEditor.finetuneImage('Brightness', 15);
  imageEditor.finetuneImage('Contrast', 10);
  imageEditor.drawFrame('Mat', '#8B7355', null, 20);
};

const undoAll = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  
  // Undo 6 times to get back to original
  for (let i = 0; i < 6; i++) {
    imageEditor.undo();
  }
};

const resetImage = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  imageEditor.reset();
};
</script>

<style>
button {
  margin: 5px;
  padding: 8px 12px;
}
</style>
```

## History Considerations

### When History Resets

- Opening a new image clears history
- Resetting the image clears history
- Saving the image does NOT clear history

### History Preservation

```javascript
const imageEditor = imageEditorObj.value?.ej2Instances;

// All these operations preserve history
imageEditor.open('newimage.jpg');  // Note: This clears history
imageEditor.save();                 // Does NOT clear history

// So after saving, you can still undo back to before the save
```

### Maximum History

The 16-step limit means:

```javascript
// If you perform 17 steps, step 1 is lost
for (let i = 1; i <= 17; i++) {
  imageEditor.drawText(i * 10, 10, `Step ${i}`, 'Arial', 12);
}

// Undo 16 times will get you back to step 2 (step 1 is gone)
```

## Best Practices

1. **Frequent saves:** Save periodically to reset history baseline
2. **Plan edits:** Think through changes before applying
3. **Test undo:** Verify operations are undoable
4. **User feedback:** Inform users of 16-step limit
5. **Keyboard shortcuts:** Users appreciate Ctrl+Z / Ctrl+Y support
6. **Toolbar buttons:** Include undo/redo in toolbar for discoverability
