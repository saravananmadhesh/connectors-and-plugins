# Getting Started with Toolbar in Vue 3

## Table of Contents
- [Dependencies](#dependencies)
- [Project Setup](#project-setup)
- [Adding Syncfusion Packages](#adding-syncfusion-packages)
- [CSS Configuration](#css-configuration)
- [Basic Implementation](#basic-implementation)
- [Global Configuration](#global-configuration)
- [Running Your Application](#running-your-application)

---

## Dependencies

The Toolbar component requires the following packages:

```
@syncfusion/ej2-vue-navigations (main package)
├── @syncfusion/ej2-base
├── @syncfusion/ej2-vue-base
└── @syncfusion/ej2-navigations
    ├── @syncfusion/ej2-buttons
    └── @syncfusion/ej2-popups
```

---

## Project Setup

### Using Vite with Create Vue (Recommended)

Create a new Vue 3 application:

```bash
npm create vue@latest
# Select: TypeScript (optional), Router (if needed)

cd project-name
npm install
```

### Using Vite Directly

```bash
npm create vite@latest toolbar-app -- --template vue
cd toolbar-app
npm install
```

---

## Adding Syncfusion Packages

Install the Toolbar component package:

```bash
npm install @syncfusion/ej2-vue-navigations --save
```

This automatically installs all peer dependencies.

---

## CSS Configuration

### Step 1: Import Theme Styles

Add CSS imports to your main application file (`src/App.vue` or `src/main.ts`):

```vue
<style>
import "@syncfusion/ej2-material3-theme/styles/toolbar/index.css";
</style>
```

**Theme Options:**
- `tailwind3.css` - Tailwind theme (recommended)
- `bootstrap5.3.css` - Bootstrap theme
- `fluent2.css` - Microsoft Fluent theme
- `material3.css` - Material Design theme

### Step 2: Register Component Globally (Optional)

In `src/main.ts`:

```typescript
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-navigations';

const app = createApp(App);

app.component('ToolbarComponent', ToolbarComponent);
app.component('ItemsDirective', ItemsDirective);
app.component('ItemDirective', ItemDirective);

app.mount('#app');
```

If not registered globally, import in each component:

```vue
<script setup>
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

---

## Basic Implementation

### Simple Button Toolbar

Create a toolbar with basic button items in `src/components/SimpleToolbar.vue`:

```vue
<template>
  <div>
    <h2>Simple Toolbar Example</h2>
    <ejs-toolbar id="toolbar">
      <e-items>
        <e-item text="Cut" prefixIcon="e-cut-icon"></e-item>
        <e-item text="Copy" prefixIcon="e-copy-icon"></e-item>
        <e-item text="Paste" prefixIcon="e-paste-icon"></e-item>
        <e-item type="Separator"></e-item>
        <e-item text="Bold" prefixIcon="e-bold-icon"></e-item>
        <e-item text="Italic" prefixIcon="e-italic-icon"></e-item>
        <e-item text="Underline" prefixIcon="e-underline-icon"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>

<style scoped>
/* Component styles */
</style>
```

**What happens:**
- `ejs-toolbar` creates the toolbar container
- `e-items` wraps all toolbar items
- `e-item` defines individual items
- Default item type is `Button`
- `type="Separator"` creates a visual divider

### Minimal Working Example

Minimal setup with required imports:

```vue
<template>
  <ejs-toolbar>
    <e-items>
      <e-item text="File"></e-item>
      <e-item text="Edit"></e-item>
      <e-item text="View"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

This is the absolute minimum to render a working toolbar.

---

## Global Configuration

### Locale Support

Support multiple languages by setting the `locale` property:

```vue
<template>
  <ejs-toolbar locale="de-DE">
    <e-items>
      <e-item text="Speichern" prefixIcon="e-save-icon"></e-item>
      <e-item text="Drucken" prefixIcon="e-print-icon"></e-item>
    </e-items>
  </ejs-toolbar>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-navigations';

const locale = ref('de-DE');
</script>
```

**Common locale codes:**
- `"en-US"` - English (United States)
- `"de-DE"` - German
- `"fr-FR"` - French
- `"es-ES"` - Spanish
- `"ja-JP"` - Japanese
- `"ar-AE"` - Arabic
- `"zh-CN"` - Chinese (Simplified)

### Right-to-Left (RTL) Support

Enable RTL layout for languages that read right-to-left:

```vue
<template>
  <div dir="rtl">
    <ejs-toolbar enableRtl>
      <e-items>
        <e-item text="حفظ" prefixIcon="e-save-icon"></e-item>
        <e-item text="طباعة" prefixIcon="e-print-icon"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-navigations';
</script>
```

### Dynamic Locale Change

Update locale at runtime:

```vue
<template>
  <div>
    <div style="margin-bottom: 16px">
      <button @click="locale = 'en-US'">English</button>
      <button @click="locale = 'de-DE'">Deutsch</button>
      <button @click="locale = 'fr-FR'">Français</button>
    </div>

    <ejs-toolbar :locale="locale">
      <e-items>
        <e-item :text="getSaveText()" prefixIcon="e-save-icon"></e-item>
        <e-item :text="getPrintText()" prefixIcon="e-print-icon"></e-item>
      </e-items>
    </ejs-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ToolbarComponent, ItemsDirective, ItemDirective } from '@syncfusion/ej2-vue-navigations';

const locale = ref('en-US');

const getSaveText = () => {
  switch (locale.value) {
    case 'de-DE': return 'Speichern';
    case 'fr-FR': return 'Enregistrer';
    default: return 'Save';
  }
};

const getPrintText = () => {
  switch (locale.value) {
    case 'de-DE': return 'Drucken';
    case 'fr-FR': return 'Imprimer';
    default: return 'Print';
  }
};
</script>
```

### Enable Persistence

Save toolbar state between sessions:

```vue
<template>
  <ejs-toolbar enablePersistence>
    <e-items>
      <!-- Toolbar state is saved and restored -->
    </e-items>
  </ejs-toolbar>
</template>
```

### Enable Collision Detection

Automatically prevent UI elements from colliding:

```vue
<template>
  <ejs-toolbar enableCollision overflowMode="Popup">
    <e-items>
      <!-- Items automatically adjust to prevent overlap -->
    </e-items>
  </ejs-toolbar>
</template>
```

### Enable HTML Sanitizer

Sanitize HTML content to prevent XSS attacks:

```vue
<template>
  <ejs-toolbar enableHtmlSanitizer>
    <e-items>
      <!-- HTML content is sanitized -->
    </e-items>
  </ejs-toolbar>
</template>
```

---

## Running Your Application

### For Vite Projects

```bash
npm run dev
```

Your application will start at `http://localhost:5173`

### For Production Build

```bash
npm run build
```

Generates optimized production build in the `dist/` folder.

---

## Troubleshooting

### Styles Not Applied
- Ensure CSS imports are in your component or main.ts
- Check that the correct theme file is imported
- Verify the path is correct relative to node_modules

### Component Not Rendering
- Check that `@syncfusion/ej2-vue-navigations` is installed
- Verify imports: `ToolbarComponent`, `ItemsDirective`, `ItemDirective`
- Ensure `e-items` wraps all items

### Icons Not Displaying
- Verify icon class names (e.g., `e-cut-icon`, `e-copy-icon`)
- Check that font dependencies are loaded with CSS
- Use `prefixIcon` or `suffixIcon` properties

### Port Already in Use

```bash
npm run dev -- --port 3000
```

---

## Next Steps

Once you have a basic toolbar running:
1. **Add different item types** → See [item-configuration.md](item-configuration.md)
2. **Handle responsive overflow** → See [responsive-modes.md](responsive-modes.md)
3. **Add interactions** → See [advanced-features.md](advanced-features.md)
4. **Improve accessibility** → See [accessibility.md](accessibility.md)
