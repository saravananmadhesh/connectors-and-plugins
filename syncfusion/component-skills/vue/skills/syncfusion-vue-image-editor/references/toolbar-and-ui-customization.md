# Toolbar and UI Customization

## Table of Contents
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Customizing the Toolbar](#customizing-the-toolbar)
- [Context Toolbars](#context-toolbars)
- [Quick Access Toolbar](#quick-access-toolbar)
- [Toolbar Events](#toolbar-events)

## Built-in Toolbar Items

The Image Editor provides these default toolbar items:

| Item | Function | Keyboard |
|------|----------|----------|
| **Open** | Load an image | N/A |
| **Undo** | Revert last action | Ctrl+Z |
| **Redo** | Repeat last undone action | Ctrl+Y |
| **ZoomIn** | Magnify image | Ctrl++ |
| **ZoomOut** | Reduce magnification | Ctrl+- |
| **Crop** | Activate crop mode | N/A |
| **RotateLeft** | Rotate 90° counter-clockwise | N/A |
| **RotateRight** | Rotate 90° clockwise | N/A |
| **HorizontalFlip** | Mirror left-to-right | N/A |
| **VerticalFlip** | Mirror top-to-bottom | N/A |
| **Straightening** | Adjust skew | N/A |
| **Annotate** | Add annotations (text/shapes) | N/A |
| **Finetune** | Brightness, contrast, saturation | N/A |
| **Filter** | Apply effects (Chrome, Cold, etc.) | N/A |
| **Frame** | Add decorative borders | N/A |
| **Resize** | Change image dimensions | N/A |
| **Redact** | Blur/pixelate sensitive areas | N/A |
| **Reset** | Discard all edits | N/A |
| **Save** | Export edited image | N/A |

## Customizing the Toolbar

### Specify Toolbar Items

Use the `toolbar` property to customize which items appear:

```vue
<template>
  <ejs-imageeditor
    ref="imageEditorObj"
    :toolbar="['Open', 'Undo', 'Redo', 'ZoomIn', 'ZoomOut', 'Crop', 'Save']"
  ></ejs-imageeditor>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";

const toolbar = [
  'Open',
  'Undo',
  'Redo',
  'ZoomIn',
  'ZoomOut',
  'Crop',
  'RotateLeft',
  'RotateRight',
  'HorizontalFlip',
  'VerticalFlip',
  'Save'
];
</script>
```

### Hide Toolbar

Pass empty array to hide toolbar:

```vue
<ejs-imageeditor :toolbar="[]"></ejs-imageeditor>
```

### Adding Custom Toolbar Items

Define custom items with text and click handlers:

```vue
<template>
  <ejs-imageeditor
    ref="imageEditorObj"
    :toolbar="customToolbar"
    @toolbarItemClicked="onToolbarItemClicked"
  ></ejs-imageeditor>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);

const customToolbar = [
  'Open',
  'Undo',
  'Redo',
  { text: 'Custom Action' },  // Custom item
  { text: 'My Button' },       // Another custom item
  'Save'
];

const onToolbarItemClicked = (args) => {
  if (args.item.text === 'Custom Action') {
    const imageEditor = imageEditorObj.value?.ej2Instances;
    // Perform custom action
    console.log('Custom action clicked');
  }
};
</script>
```

## Context Toolbars

Context-specific toolbars appear when using certain tools.

### Annotation Context Toolbar

When adding annotations, a context toolbar appears with options like:
- Font selection
- Color picker
- Stroke width
- Fill options

### Customizing Context Toolbar

Use the `toolbarUpdating` event:

```vue
<template>
  <ejs-imageeditor
    ref="imageEditorObj"
    @toolbarUpdating="onToolbarUpdating"
  ></ejs-imageeditor>
</template>

<script setup>
import { ref } from "vue";

const onToolbarUpdating = (args) => {
  // Customize context toolbar items
  // args.toolbarItems contains current items
  console.log('Context toolbar items:', args.toolbarItems);
  
  // You can add or remove items from args.toolbarItems
};
</script>
```

## Quick Access Toolbar

Quick access toolbars appear when annotations are selected, showing relevant tools for that annotation type.

### Controlling Quick Access Toolbar

```vue
<template>
  <ejs-imageeditor
    ref="imageEditorObj"
    :showQuickAccessToolbar="true"
    @quickAccessToolbarOpen="onQuickAccessToolbarOpen"
  ></ejs-imageeditor>
</template>

<script setup>
import { ref } from "vue";

const onQuickAccessToolbarOpen = (args) => {
  // args.toolbarItems contains available tools
  // Customize by adding/removing items
  
  // Example: Add custom clone tool
  if (!args.toolbarItems.includes('Clone')) {
    args.toolbarItems.push('Clone');
  }
};
</script>
```

### Disable Quick Access Toolbar

```vue
<ejs-imageeditor :showQuickAccessToolbar="false"></ejs-imageeditor>
```

## Toolbar Events

### toolbarItemClicked Event

Triggered when a toolbar item is clicked:

```vue
<template>
  <ejs-imageeditor
    @toolbarItemClicked="onToolbarItemClicked"
  ></ejs-imageeditor>
</template>

<script setup>
const onToolbarItemClicked = (args) => {
  console.log('Clicked item:', args.item);
  console.log('Item text:', args.item.text);
  
  // Handle custom items
  if (args.item.text === 'My Custom Item') {
    // Perform action
  }
};
</script>
```

### toolbarUpdating Event

Customize toolbar before rendering:

```vue
<template>
  <ejs-imageeditor
    @toolbarUpdating="onToolbarUpdating"
  ></ejs-imageeditor>
</template>

<script setup>
const onToolbarUpdating = (args) => {
  // Modify toolbar items dynamically
  const index = args.toolbarItems.indexOf('Save');
  if (index > -1) {
    args.toolbarItems.splice(index, 1);
  }
};
</script>
```

## Complete Toolbar Customization Example

```vue
<template>
  <div>
    <ejs-imageeditor
      ref="imageEditorObj"
      height="500px"
      width="100%"
      :toolbar="toolbar"
      @toolbarItemClicked="onToolbarItemClicked"
      @toolbarUpdating="onToolbarUpdating"
      @quickAccessToolbarOpen="onQuickAccessToolbarOpen"
      :created="onCreated"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);

const toolbar = [
  'Open',
  'Undo',
  'Redo',
  '|',  // Separator
  'Crop',
  'RotateLeft',
  'RotateRight',
  'HorizontalFlip',
  'VerticalFlip',
  '|',
  'ZoomIn',
  'ZoomOut',
  '|',
  'Annotate',
  'Filter',
  'Finetune',
  'Frame',
  'Redact',
  '|',
  { text: 'Custom Export' },
  '|',
  'Reset',
  'Save'
];

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const onToolbarItemClicked = (args) => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  
  if (args.item.text === 'Custom Export') {
    // Custom export handler
    imageEditor.toBlob((blob) => {
      console.log('Custom export:', blob);
      // Handle custom export logic
    });
  }
};

const onToolbarUpdating = (args) => {
  console.log('Toolbar updating:', args.toolbarItems);
};

const onQuickAccessToolbarOpen = (args) => {
  console.log('Quick access toolbar opened');
  // Customize quick access toolbar
};
</script>
```

## Toolbar Layout Strategies

### Minimal Toolbar (Essential Only)

```vue
<ejs-imageeditor
  :toolbar="['Open', 'Undo', 'Redo', 'Save']"
></ejs-imageeditor>
```

### Full-Featured Toolbar

```vue
<ejs-imageeditor
  :toolbar="[
    'Open', 'Undo', 'Redo',
    'Crop', 'RotateLeft', 'RotateRight', 'HorizontalFlip', 'VerticalFlip',
    'ZoomIn', 'ZoomOut',
    'Annotate', 'Filter', 'Finetune', 'Frame', 'Redact',
    'Resize', 'Reset', 'Save'
  ]"
></ejs-imageeditor>
```

### Mobile-Optimized Toolbar

```vue
<ejs-imageeditor
  :toolbar="['Open', 'Undo', 'Redo', 'Crop', 'Filter', 'Save']"
></ejs-imageeditor>
```

### Professional Toolbar (Photo Editor)

```vue
<ejs-imageeditor
  :toolbar="[
    'Open',
    'Crop', 'RotateLeft', 'RotateRight', 'HorizontalFlip', 'VerticalFlip',
    'Filter', 'Finetune', 'Frame',
    'Undo', 'Redo', 'Reset',
    'Save'
  ]"
></ejs-imageeditor>
```

## Dynamic Toolbar Modification

```vue
<template>
  <div>
    <button @click="addCustomItem">Add Custom Item</button>
    <button @click="removeItem">Remove Item</button>
    <ejs-imageeditor ref="imageEditorObj"></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ref } from "vue";

const imageEditorObj = ref(null);
let currentToolbar = ['Open', 'Undo', 'Redo', 'Save'];

const addCustomItem = () => {
  currentToolbar.push({ text: 'Custom' });
  updateToolbar();
};

const removeItem = () => {
  currentToolbar.pop();
  updateToolbar();
};

const updateToolbar = () => {
  // Trigger UI update (depends on Vue reactivity)
};
</script>
```

## Best Practices

1. **Keep relevant items together:** Group related items logically
2. **Limit count:** Avoid overwhelming with too many buttons
3. **Mobile first:** Fewer items for mobile devices
4. **Consistent behavior:** Custom items should follow expected patterns
5. **Test accessibility:** Ensure keyboard navigation works
6. **Tooltips:** Provide helpful hints for custom items
