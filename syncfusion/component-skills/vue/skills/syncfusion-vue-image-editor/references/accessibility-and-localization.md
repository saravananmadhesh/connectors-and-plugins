# Accessibility and Localization

## Table of Contents
- [Accessibility Features](#accessibility-features)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Localization](#localization)
- [Supported Languages](#supported-languages)

## Accessibility Features

### WCAG Compliance

The Image Editor follows WCAG (Web Content Accessibility Guidelines) standards for accessibility.

### Focus Management

Proper focus management for keyboard navigation:

```vue
<template>
  <ejs-imageeditor
    ref="imageEditorObj"
    role="application"
    aria-label="Image Editor"
  ></ejs-imageeditor>
</template>
```

### Color Contrast

Ensure text and interface elements have sufficient contrast for readability.

### Resizable Text

Users can adjust browser zoom level for larger text.

## Keyboard Navigation

### Primary Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move between toolbar items |
| `Shift + Tab` | Move backward between items |
| `Enter` | Activate focused button |
| `Space` | Activate focused button |
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |
| `Ctrl + +` | Zoom in |
| `Ctrl + -` | Zoom out |

### Arrow Keys

Navigate within dialogs and dropdowns:

```javascript
// Arrow Up/Down: Navigate menu items
// Arrow Left/Right: Adjust slider values
```

### Implementing Keyboard Support

The Image Editor has built-in keyboard support. Users can:

1. **Tab** through toolbar buttons
2. **Enter/Space** to activate buttons
3. **Arrow keys** in input fields and dialogs
4. **Escape** to close dialogs

## Screen Reader Support

### ARIA Labels

```vue
<template>
  <ejs-imageeditor
    ref="imageEditorObj"
    aria-label="Image Editor Application"
    :toolbar="['Open', 'Crop', 'Filter', 'Save']"
  ></ejs-imageeditor>
</template>

<script setup>
const toolbar = [
  { id: 'open', text: 'Open Image', tooltipText: 'Open image file' },
  { id: 'crop', text: 'Crop', tooltipText: 'Crop to selection' },
  { id: 'filter', text: 'Filter', tooltipText: 'Apply effects' },
  { id: 'save', text: 'Save Image', tooltipText: 'Export edited image' }
];
</script>
```

### Providing Context

Use tooltips and labels to provide context:

```vue
<template>
  <div>
    <label for="editor">Image Editor</label>
    <ejs-imageeditor
      id="editor"
      role="application"
      aria-live="polite"
      aria-label="Image Editor"
    ></ejs-imageeditor>
  </div>
</template>
```

## Localization

### Setting Locale

Specify locale for the Image Editor:

```vue
<template>
  <ejs-imageeditor
    ref="imageEditorObj"
    :locale="'de'"
  ></ejs-imageeditor>
</template>

<script setup>
// de = German
// fr = French
// ar = Arabic
// es = Spanish
</script>
```

### Supported Locales

| Code | Language |
|------|----------|
| `en` | English |
| `de` | German (Deutsch) |
| `fr` | French (Français) |
| `ar` | Arabic (العربية) |
| `es` | Spanish (Español) |
| `ja` | Japanese (日本語) |
| `zh` | Chinese (中文) |
| `ru` | Russian (Русский) |
| `pt-BR` | Portuguese (Português) |
| `ko` | Korean (한국어) |

### Custom Locale Strings

Define custom translations:

```vue
<template>
  <ejs-imageeditor
    ref="imageEditorObj"
    locale="de"
  ></ejs-imageeditor>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";

// Custom German translations
const germanStrings = {
  Crop: "Zuschneiden",
  Undo: "Rückgängig",
  Redo: "Wiederherstellen",
  ZoomIn: "Vergrößern",
  ZoomOut: "Verkleinern",
  RotateLeft: "Nach links drehen",
  RotateRight: "Nach rechts drehen",
  HorizontalFlip: "Horizontal spiegeln",
  VerticalFlip: "Vertikal spiegeln",
  Text: "Text hinzufügen",
  Filter: "Filter",
  Brightness: "Helligkeit",
  Contrast: "Kontrast",
  Saturation: "Sättigung"
};

// Register custom locale
ImageEditorComponent.Localize.load(germanStrings);
</script>
```

## Complete Localization Example

```vue
<template>
  <div>
    <div>
      <label for="locale-select">Language:</label>
      <select v-model="selectedLocale" @change="changeLocale">
        <option value="en">English</option>
        <option value="de">Deutsch</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="ar">العربية</option>
        <option value="ja">日本語</option>
      </select>
    </div>
    <ejs-imageeditor
      ref="imageEditorObj"
      :locale="selectedLocale"
      height="500px"
      width="100%"
      :toolbar="toolbar"
      :created="onCreated"
    ></ejs-imageeditor>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { Browser } from "@syncfusion/ej2-base";
import { ref } from "vue";

const imageEditorObj = ref(null);
const selectedLocale = ref('en');

const toolbar = ['Open', 'Crop', 'Filter', 'Finetune', 'Undo', 'Redo', 'Save'];

const onCreated = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (!imageEditor) return;
  const imageUrl = Browser.isDevice
    ? "https://ej2.syncfusion.com/vue/documentation/image-editor/images/flower.jpeg"
    : "https://ej2.syncfusion.com/vue/documentation/image-editor/images/bridge.jpeg";
  imageEditor.open(imageUrl);
};

const changeLocale = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (imageEditor) {
    imageEditor.locale = selectedLocale.value;
    imageEditor.refresh();
  }
};
</script>

<style>
select {
  margin: 10px;
  padding: 5px;
}

label {
  margin-right: 10px;
}
</style>
```

## Accessibility Best Practices

1. **Keyboard First:** Test all functionality with keyboard only
2. **Screen Readers:** Test with NVDA, JAWS, or VoiceOver
3. **Color:** Don't rely solely on color to convey information
4. **Contrast:** Maintain sufficient color contrast ratios
5. **Labels:** Always provide text labels and alt text
6. **Focus:** Ensure visual focus indicator is visible
7. **Errors:** Provide clear error messages

## Localization Best Practices

1. **Complete Translations:** Translate ALL UI text
2. **RTL Support:** Test right-to-left languages (Arabic)
3. **Date/Number Formats:** Use locale-appropriate formatting
4. **Testing:** Test with native speakers
5. **Consistency:** Use consistent terminology

## Complete Accessible Example

```vue
<template>
  <div>
    <h1>Accessible Image Editor</h1>
    <fieldset>
      <legend>Settings</legend>
      <div>
        <label for="lang">Language:</label>
        <select id="lang" v-model="locale" @change="updateLocale">
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="fr">French</option>
        </select>
      </div>
    </fieldset>
    <ejs-imageeditor
      ref="imageEditorObj"
      :locale="locale"
      aria-label="Image Editor"
      role="application"
      height="600px"
      width="100%"
      :toolbar="toolbar"
      :created="onCreated"
    ></ejs-imageeditor>
    <div role="status" aria-live="polite">
      {{ statusMessage }}
    </div>
  </div>
</template>

<script setup>
import { ImageEditorComponent } from "@syncfusion/ej2-vue-image-editor";
import { ref } from "vue";

const imageEditorObj = ref(null);
const locale = ref('en');
const statusMessage = ref('Image Editor loaded. Use Tab to navigate.');

const toolbar = ['Open', 'Undo', 'Redo', 'Crop', 'Filter', 'Finetune', 'Save'];

const onCreated = () => {
  statusMessage.value = 'Ready to edit. Press Tab to begin.';
};

const updateLocale = () => {
  const imageEditor = imageEditorObj.value?.ej2Instances;
  if (imageEditor) {
    imageEditor.locale = locale.value;
    statusMessage.value = `Language changed to selected option`;
  }
};
</script>

<style scoped>
fieldset {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
}

legend {
  padding: 0 10px;
}

div[role="status"] {
  margin-top: 10px;
  padding: 10px;
  background-color: #f0f0f0;
  border-left: 3px solid #0066cc;
}

select {
  padding: 5px;
  margin-left: 10px;
}
</style>
```

## Testing Accessibility

### Tools to Test

- **NVDA** (Windows screen reader)
- **JAWS** (Commercial screen reader)
- **VoiceOver** (macOS/iOS)
- **Chrome DevTools Accessibility Audit**
- **WebAIM Contrast Checker**

### Manual Testing Checklist

- [ ] All toolbar buttons accessible via Tab
- [ ] Keyboard shortcuts work as documented
- [ ] Screen reader announces all labels correctly
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicator is visible
- [ ] Dialogs can be closed via Escape key
- [ ] All functions available via keyboard
