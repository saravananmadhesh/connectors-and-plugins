# Getting Started with Splitter (Vue 3)

## Table of Contents
- [Installation](#installation)
- [CSS Import](#css-import)
- [Basic Setup](#basic-setup)
- [First Working Example](#first-working-example)
- [Dependencies](#dependencies)

## Installation

The Splitter component is part of the `@syncfusion/ej2-vue-layouts` package. Install it using npm:

```bash
npm install @syncfusion/ej2-vue-layouts --save
```

This automatically installs the required dependencies:
- `@syncfusion/ej2-vue-base` - Base Vue utilities
- `@syncfusion/ej2-base` - Base utilities
- `@syncfusion/ej2-layouts` - Layout components CSS and logic

### Verify Installation

After installation, verify the package in `package.json`:

```json
{
  "dependencies": {
    "@syncfusion/ej2-vue-layouts": "^latest",
    "@syncfusion/ej2-base": "^latest"
  }
}
```

## CSS Import

The Splitter component requires CSS files for styling. Import these in your main component or `App.vue`:

### Tailwind 3 Theme

```js
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/splitter/index.css";
```

**Best Practice:** Import CSS in your main `App.vue` component before rendering the Splitter.

## Basic Setup

The Splitter uses two child directives:
1. **`<e-panes>`** - Container for all panes
2. **`<e-pane>`** - Individual pane configuration

### Minimal Structure

```vue
<template>
  <SplitterComponent orientation="Horizontal">
    <e-panes>
      <e-pane size="300px">
        <div>Left Pane</div>
      </e-pane>
      <e-pane size="300px">
        <div>Right Pane</div>
      </e-pane>
    </e-panes>
  </SplitterComponent>
</template>

<script setup>
import { SplitterComponent, PaneDirective, PanesDirective } from '@syncfusion/ej2-vue-layouts';
import { ref } from 'vue';
</script>
```

### Import Statements

```js
// Import components
import {
  SplitterComponent,
  PaneDirective,
  PanesDirective
} from '@syncfusion/ej2-vue-layouts';

// Import ref if needed
import { ref } from 'vue';
```

## First Working Example

Complete working example with two horizontal panes:

```vue
<template>
  <div class="app">
    <h2>Vue 3 Splitter - Getting Started</h2>

    <SplitterComponent orientation="Horizontal" height="250px" width="600px">
      <e-panes>
        <e-pane size="200px">
          <div :style="{ padding: '20px', backgroundColor: '#f5f5f5' }">
            <h3>Left Panel</h3>
            <p>This is the left panel with fixed size</p>
          </div>
        </e-pane>

        <e-pane size="300px">
          <div :style="{ padding: '20px', backgroundColor: '#ffffff' }">
            <h3>Right Panel</h3>
            <p>This panel is resizable. Drag the separator to resize.</p>
          </div>
        </e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>

<script setup>
import { SplitterComponent, PaneDirective, PanesDirective } from '@syncfusion/ej2-vue-layouts';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-vue-layouts/styles/tailwind3.css';
</script>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>
```

### Container Requirement

The Splitter must have a parent container with explicit dimensions:

```css
.parent-container {
  height: 500px;
  width: 100%;
}
```

## Dependencies

The Splitter component depends on:

- `@syncfusion/ej2-vue-base` (peer)
- `@syncfusion/ej2-base` (transitive)
- `@syncfusion/ej2-layouts` (transitive - CSS and JS)

## Common Issues

### Splitter Not Visible

**Problem:** Component renders but panes are empty.

**Solution:** Ensure parent has explicit height:

```vue
<template>
  <div class="parent-container" style="height: 500px;">
    <SplitterComponent height="100%">
      <e-panes>
        <e-pane size="50%"><div>Content</div></e-pane>
        <e-pane size="50%"><div>Content</div></e-pane>
      </e-panes>
    </SplitterComponent>
  </div>
</template>
```

### Pane Not Showing

**Problem:** Panes are defined but not visible.

**Solution:** Each pane must wrap content in a child element:

```vue
<e-pane size="200px">
  <!-- ✅ Correct: content in a child element -->
  <div>Pane Content</div>
</e-pane>

<!-- ❌ Wrong: direct text content -->
<e-pane size="200px">Pane Content</e-pane>
```

### Import Errors

**Problem:** `SplitterComponent is not defined`.

**Solution:** Use the kebab-case directive names in templates and PascalCase in scripts:

```vue
<template>
  <!-- Template: kebab-case -->
  <splitter-component>
    <e-panes>
      <e-pane size="200px"><div>x</div></e-pane>
    </e-panes>
  </splitter-component>
</template>

<script setup>
// Script: PascalCase
import { SplitterComponent, PaneDirective, PanesDirective } from '@syncfusion/ej2-vue-layouts';
</script>
```

**Next:** Learn about [properties and configuration](splitter-properties-and-configuration.md) for complete options.
