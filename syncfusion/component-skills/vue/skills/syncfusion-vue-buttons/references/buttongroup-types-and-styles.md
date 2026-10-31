# ButtonGroup Types and Styles

> Explore styling variations and visual types for button groups.

---

## Table of Contents

1. [Outline ButtonGroup](#outline-buttongroup)
2. [Color Styles](#color-styles)
3. [Combining Styles](#combining-styles)
4. [Size Variations](#size-variations)

---

## Outline ButtonGroup

Use the `e-outline` class to create outlined button groups:

```vue
<template>
  <div class="example-section">
    <h2>Outline ButtonGroup</h2>
    
    <div class="e-btn-group e-outline">
      <ejs-button>New</ejs-button>
      <ejs-button>Edit</ejs-button>
      <ejs-button>Delete</ejs-button>
    </div>
    
    <div class="e-btn-group e-outline e-vertical">
      <ejs-button>Upload</ejs-button>
      <ejs-button>Download</ejs-button>
      <ejs-button>Share</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

.e-btn-group {
  margin: 10px 0;
}
</style>
```

---

## Color Styles

Apply color classes to button groups:

```vue
<template>
  <div class="example-section">
    <!-- Default (gray) -->
    <h3>Default</h3>
    <div class="e-btn-group">
      <ejs-button>One</ejs-button>
      <ejs-button>Two</ejs-button>
      <ejs-button>Three</ejs-button>
    </div>
    
    <!-- Primary (blue) -->
    <h3>Primary</h3>
    <div class="e-btn-group e-primary">
      <ejs-button>One</ejs-button>
      <ejs-button>Two</ejs-button>
      <ejs-button>Three</ejs-button>
    </div>
    
    <!-- Success (green) -->
    <h3>Success</h3>
    <div class="e-btn-group e-success">
      <ejs-button>One</ejs-button>
      <ejs-button>Two</ejs-button>
      <ejs-button>Three</ejs-button>
    </div>
    
    <!-- Info (cyan) -->
    <h3>Info</h3>
    <div class="e-btn-group e-info">
      <ejs-button>One</ejs-button>
      <ejs-button>Two</ejs-button>
      <ejs-button>Three</ejs-button>
    </div>
    
    <!-- Warning (orange) -->
    <h3>Warning</h3>
    <div class="e-btn-group e-warning">
      <ejs-button>One</ejs-button>
      <ejs-button>Two</ejs-button>
      <ejs-button>Three</ejs-button>
    </div>
    
    <!-- Danger (red) -->
    <h3>Danger</h3>
    <div class="e-btn-group e-danger">
      <ejs-button>One</ejs-button>
      <ejs-button>Two</ejs-button>
      <ejs-button>Three</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.e-btn-group {
  margin-bottom: 10px;
}
</style>
```

---

## Combining Styles

Mix multiple style classes for advanced combinations:

```vue
<template>
  <div class="example-section">
    <!-- Outline + Primary -->
    <h3>Outline Primary</h3>
    <div class="e-btn-group e-outline e-primary">
      <ejs-button>A</ejs-button>
      <ejs-button>B</ejs-button>
      <ejs-button>C</ejs-button>
    </div>
    
    <!-- Outline + Success + Vertical -->
    <h3>Outline Success Vertical</h3>
    <div class="e-btn-group e-outline e-success e-vertical">
      <ejs-button>Yes</ejs-button>
      <ejs-button>No</ejs-button>
      <ejs-button>Maybe</ejs-button>
    </div>
    
    <!-- Flat + Info -->
    <h3>Flat Info</h3>
    <div class="e-btn-group e-flat e-info">
      <ejs-button>Red</ejs-button>
      <ejs-button>Green</ejs-button>
      <ejs-button>Blue</ejs-button>
    </div>
    
    <!-- Round Corner + Danger -->
    <h3>Round Corner Danger</h3>
    <div class="e-btn-group e-round-corner e-danger">
      <ejs-button>Low</ejs-button>
      <ejs-button>Medium</ejs-button>
      <ejs-button>High</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}

.e-btn-group {
  margin-bottom: 10px;
}
</style>
```

---

## Size Variations

Control button group sizes:

```vue
<template>
  <div class="example-section">
    <!-- Small -->
    <h3>Small Button Group</h3>
    <div class="e-btn-group e-small">
      <ejs-button>S</ejs-button>
      <ejs-button>M</ejs-button>
      <ejs-button>L</ejs-button>
    </div>
    
    <!-- Normal (default) -->
    <h3>Normal Button Group</h3>
    <div class="e-btn-group">
      <ejs-button>Small</ejs-button>
      <ejs-button>Medium</ejs-button>
      <ejs-button>Large</ejs-button>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
```

---

## Style Classes Reference

| Class | Effect |
|-------|--------|
| `e-btn-group` | Required wrapper class |
| `e-outline` | Outlined style |
| `e-flat` | Flat style (no borders) |
| `e-primary` | Blue color |
| `e-success` | Green color |
| `e-info` | Cyan color |
| `e-warning` | Orange color |
| `e-danger` | Red color |
| `e-link` | Link-style buttons |
| `e-small` | Small size |
| `e-vertical` | Vertical layout |
| `e-round-corner` | Rounded corners |
| `e-rtl` | Right-to-left layout |

---

## Next Steps

- Learn about selection modes in [buttongroup-selection-and-nesting.md](buttongroup-selection-and-nesting.md)
- Explore how-to patterns in [buttongroup-how-to.md](buttongroup-how-to.md)
- Check accessibility in [buttongroup-accessibility.md](buttongroup-accessibility.md)
