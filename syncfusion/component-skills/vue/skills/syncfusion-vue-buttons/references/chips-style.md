# Chips Styling

> Comprehensive guide to styling and customizing chip appearance with CSS classes and themes.

---

## Table of Contents

1. [CSS Classes](#css-classes)
2. [Outline Style](#outline-style)
3. [Color Variants](#color-variants)
4. [Selected State Styling](#selected-state-styling)
5. [Size Variations](#size-variations)
6. [Custom Themes](#custom-themes)

---

## CSS Classes

Common CSS classes for chip styling:

| Class | Description |
|-------|-------------|
| `e-chips` | Container for chip list |
| `e-chip` | Individual chip element |
| `e-chip-item` | Chip item wrapper |
| `e-chip-content` | Chip text content |
| `e-chip-avatar` | Avatar container |
| `e-chip-icon` | Icon element |
| `e-chip-delete` | Delete button |
| `e-outlined` | Outlined style |
| `e-filled` | Filled style |
| `e-primary` | Primary color |
| `e-secondary` | Secondary color |

---

## Outline Style

Apply outlined styling to chips:

```vue
<template>
  <div class="example-section">
    <h2>Outlined Chips</h2>
    
    <ejs-chiplist id="chip1"
      :data-source="outlineChips"
      css-class="e-outlined"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const outlineChips = ref([
  { text: 'Outline 1' },
  { text: 'Outline 2' },
  { text: 'Outline 3' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

:deep(.e-outlined .e-chip) {
  border: 2px solid #1976d2;
  background-color: transparent;
}

:deep(.e-outlined .e-chip:hover) {
  background-color: rgba(25, 118, 210, 0.08);
}
</style>
```

---

## Color Variants

Apply different color schemes:

```vue
<template>
  <div class="example-section">
    <h2>Color Variants</h2>
    
    <h3>Primary Chips</h3>
    <ejs-chiplist id="chip2"
      :data-source="chips"
      css-class="e-primary"
    />
    
    <h3>Success Chips</h3>
    <ejs-chiplist id="chip3"
      :data-source="chips"
      css-class="e-success"
    />
    
    <h3>Info Chips</h3>
    <ejs-chiplist id="chip4"
      :data-source="chips"
      css-class="e-info"
    />
    
    <h3>Warning Chips</h3>
    <ejs-chiplist id="chip5"
      :data-source="chips"
      css-class="e-warning"
    />
    
    <h3>Danger Chips</h3>
    <ejs-chiplist id="chip6"
      :data-source="chips"
      css-class="e-danger"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const chips = ref([
  { text: 'Chip 1' },
  { text: 'Chip 2' },
  { text: 'Chip 3' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

h3:first-of-type {
  margin-top: 0;
}
</style>
```

---

## Selected State Styling

Customize selected chip appearance:

```vue
<template>
  <div class="example-section">
    <h2>Selected State Styling</h2>
    
    <ejs-chiplist id="chip7"
      :data-source="selectableChips"
      selection="Multiple"
      css-class="selectable-chips"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const selectableChips = ref([
  { text: 'Option 1', selected: true },
  { text: 'Option 2' },
  { text: 'Option 3' },
  { text: 'Option 4', selected: true }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

:deep(.selectable-chips .e-chip.e-active) {
  background-color: #1976d2;
  color: white;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.3);
}

:deep(.selectable-chips .e-chip.e-active:hover) {
  background-color: #1565c0;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.4);
}

:deep(.selectable-chips .e-chip) {
  transition: all 0.3s ease;
}
</style>
```

---

## Size Variations

Adjust chip sizes:

```vue
<template>
  <div class="example-section">
    <h2>Size Variations</h2>
    
    <h3>Small Chips</h3>
    <ejs-chiplist id="chip8"
      :data-source="chips"
      css-class="e-small"
    />
    
    <h3>Default Chips</h3>
    <ejs-chiplist id="chip9"
      :data-source="chips"
    />
    
    <h3>Large Chips</h3>
    <ejs-chiplist id="chip10"
      :data-source="chips"
      css-class="e-large"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const chips = ref([
  { text: 'Chip 1' },
  { text: 'Chip 2' },
  { text: 'Chip 3' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 10px;
}

:deep(.e-small .e-chip) {
  padding: 4px 12px;
  font-size: 12px;
}

:deep(.e-large .e-chip) {
  padding: 12px 20px;
  font-size: 16px;
  min-height: 44px;
}
</style>
```

---

## Custom Themes

Create and apply custom themes:

```vue
<template>
  <div class="example-section">
    <h2>Custom Themes</h2>
    
    <h3>Neon Theme</h3>
    <ejs-chiplist id="chip11"
      :data-source="chips"
      css-class="neon-theme"
    />
    
    <h3>Glass Theme</h3>
    <ejs-chiplist id="chip12"
      :data-source="chips"
      css-class="glass-theme"
    />
    
    <h3>Gradient Theme</h3>
    <ejs-chiplist id="chip13"
      :data-source="chips"
      css-class="gradient-theme"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const chips = ref([
  { text: 'Chip 1' },
  { text: 'Chip 2' },
  { text: 'Chip 3' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 10px;
}

/* Neon Theme */
:deep(.neon-theme .e-chip) {
  background: linear-gradient(135deg, #ff00ff, #00ffff);
  border: 2px solid #fff;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
}

/* Glass Theme */
:deep(.glass-theme .e-chip) {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #333;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

:deep(.glass-theme .e-chip:hover) {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

/* Gradient Theme */
:deep(.gradient-theme .e-chip) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  font-weight: 500;
}

:deep(.gradient-theme .e-chip:hover) {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}
</style>
```

---

## Advanced Styling

Complex styling combinations:

```vue
<template>
  <div class="example-section">
    <h2>Advanced Styling</h2>
    
    <ejs-chiplist id="chip14"
      :data-source="advancedChips"
      css-class="advanced-style"
      :deletable="true"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChipListComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-chiplist': ChipListComponent
  }
};

const advancedChips = ref([
  { text: 'Advanced 1', icon: 'e-icons e-star' },
  { text: 'Advanced 2', icon: 'e-icons e-heart' },
  { text: 'Advanced 3', icon: 'e-icons e-thumbs-up' }
]);
</script>

<style scoped>
.example-section {
  padding: 20px;
}

:deep(.advanced-style) {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

:deep(.advanced-style .e-chip) {
  position: relative;
  padding: 10px 16px;
  background: linear-gradient(to right, #f5f7fa 0%, #c3cfe2 100%);
  border: 1px solid #ddd;
  border-radius: 20px;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.advanced-style .e-chip:hover) {
  background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

:deep(.advanced-style .e-chip-delete) {
  opacity: 0.6;
  transition: opacity 0.2s;
}

:deep(.advanced-style .e-chip:hover .e-chip-delete) {
  opacity: 1;
}
</style>
```

---

## Next Steps

- Check accessibility in [chips-accessibility.md](chips-accessibility.md)
- View complete API in [chips-api.md](chips-api.md)
- Learn customization in [chips-customization.md](chips-customization.md)
- Explore drag and drop in [chips-drag-and-drop.md](chips-drag-and-drop.md)
