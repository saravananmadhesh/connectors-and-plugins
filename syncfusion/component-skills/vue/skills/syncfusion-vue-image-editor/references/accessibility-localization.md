# Accessibility and Localization

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [RTL Support](#rtl-support)
- [Localization](#localization)

## WCAG Compliance

The Image Editor is built with WCAG 2.2 and Section 508 compliance:

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      aria-label="Image Editor Canvas"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
</script>
```

### Screen Reader Support

The component provides screen reader support for all tools and annotations.

## Keyboard Navigation

### Default Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |
| `Ctrl + S` | Save image |
| `Ctrl + O` | Open image |
| `Delete` | Delete selected annotation |
| `Enter` | Confirm action |
| `Escape` | Cancel action |
| `Tab` | Navigate toolbar items |
| `Arrow Keys` | Navigate selections |

```vue
<template>
  <div>
    <p>Use keyboard shortcuts to interact with the editor</p>
    <ImageEditorComponent ref="imgObj" width="550px" height="350px" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
</script>
```

## RTL Support

### Enable RTL Mode

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      enableRtl="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
</script>
```

### Toggle RTL Dynamically

```vue
<template>
  <div>
    <button @click="toggleRtl">Toggle RTL</button>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :enableRtl="isRtl"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';

const imgObj = ref(null);
const isRtl = ref(false);

const toggleRtl = () => {
  isRtl.value = !isRtl.value;
};
</script>
```

## Localization

### Set Locale

```vue
<template>
  <div>
    <select v-model="locale" @change="updateLocale">
      <option value="en-US">English</option>
      <option value="de-DE">German</option>
      <option value="fr-FR">French</option>
      <option value="es-ES">Spanish</option>
      <option value="ja-JP">Japanese</option>
    </select>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      :locale="locale"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';
import { L10n } from '@syncfusion/ej2-base';

const imgObj = ref(null);
const locale = ref('en-US');

const updateLocale = () => {
  L10n.load({
    'de-DE': {
      'image-editor': {
        'Browse': 'Durchsuchen',
        'Save': 'Speichern',
        'Open': 'Öffnen'
      }
    }
  });
};
</script>
```

### Custom Locale Strings

```vue
<template>
  <div>
    <ImageEditorComponent 
      ref="imgObj"
      width="550px" 
      height="350px"
      locale="de-DE"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ImageEditorComponent } from '@syncfusion/ej2-vue-image-editor';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'de-DE': {
    'image-editor': {
      'Browse': 'Durchsuchen',
      'Save': 'Speichern',
      'Open': 'Öffnen',
      'Undo': 'Rückgängig',
      'Redo': 'Wiederherstellen'
    }
  }
});

const imgObj = ref(null);
</script>
```

## Next Steps

- Learn about [image-restrictions-validation.md](./image-restrictions-validation.md)
- Explore [clear-image.md](./clear-image.md)
