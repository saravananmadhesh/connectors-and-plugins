# ButtonGroup Style and Appearance

> Reference guide for styling and customizing button groups.

---

## Table of Contents

1. [CSS Classes Reference](#css-classes-reference)
2. [Customization Strategies](#customization-strategies)
3. [Overriding Hover, Focus, Active States](#overriding-hover-focus-active-states)
4. [Theme Studio Integration](#theme-studio-integration)

---

## CSS Classes Reference

| Class | Purpose |
|-------|---------|
| `e-btn-group` | Required wrapper class for button group |
| `e-outline` | Outlined style for all buttons |
| `e-flat` | Flat style without borders |
| `e-primary` | Blue color scheme |
| `e-success` | Green color scheme |
| `e-info` | Cyan color scheme |
| `e-warning` | Orange color scheme |
| `e-danger` | Red color scheme |
| `e-small` | Small button sizes |
| `e-vertical` | Vertical layout |
| `e-round-corner` | Rounded corner buttons |
| `e-rtl` | Right-to-left layout |

---

## Customization Strategies

### Strategy 1: Adding Custom CSS Classes

```vue
<template>
  <div class="example-section">
    <h2>Custom Styled ButtonGroup</h2>
    
    <div class="e-btn-group custom-group">
      <ButtonComponent>Button 1</ButtonComponent>
      <ButtonComponent>Button 2</ButtonComponent>
      <ButtonComponent>Button 3</ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
</script>

<style scoped>
.custom-group {
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 4px;
  gap: 2px;
}

:deep(.custom-group .e-btn) {
  background-color: #ffffff;
  border-color: #ddd;
  border-radius: 6px;
  padding: 8px 16px !important;
  transition: all 0.3s ease;
}

:deep(.custom-group .e-btn:hover) {
  background-color: #e8f4f8;
  border-color: #1976d2;
}

:deep(.custom-group .e-btn:active) {
  background-color: #d0e8f2;
}
</style>
```

### Strategy 2: Scoped Styling with `:deep()`

```vue
<template>
  <div class="gradient-group">
    <div class="e-btn-group e-primary">
      <ButtonComponent>Left</ButtonComponent>
      <ButtonComponent>Center</ButtonComponent>
      <ButtonComponent>Right</ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
</script>

<style scoped>
.gradient-group :deep(.e-btn-group) {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  padding: 2px;
  border-radius: 8px;
}

.gradient-group :deep(.e-btn) {
  background-color: white !important;
  border: 1px solid #ddd !important;
  margin: 2px;
  transition: all 0.3s ease;
}

.gradient-group :deep(.e-btn:first-child) {
  border-radius: 6px 0 0 6px;
}

.gradient-group :deep(.e-btn:last-child) {
  border-radius: 0 6px 6px 0;
}

.gradient-group :deep(.e-btn:hover) {
  background-color: #f0f0f0 !important;
  transform: scale(0.98);
}
</style>
```

---

## Overriding Hover, Focus, Active States

### Hover State

```vue
<template>
  <div class="hover-example">
    <div class="e-btn-group e-primary">
      <ButtonComponent>Hover me</ButtonComponent>
      <ButtonComponent>Hover me</ButtonComponent>
      <ButtonComponent>Hover me</ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
</script>

<style scoped>
.hover-example :deep(.e-btn-group .e-btn) {
  transition: all 0.3s ease;
}

.hover-example :deep(.e-btn-group .e-btn:hover) {
  background-color: #0d47a1 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
```

### Focus State

```vue
<template>
  <div class="focus-example">
    <div class="e-btn-group e-success">
      <ButtonComponent>Focus me</ButtonComponent>
      <ButtonComponent>Focus me</ButtonComponent>
      <ButtonComponent>Focus me</ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
</script>

<style scoped>
.focus-example :deep(.e-btn-group .e-btn:focus) {
  outline: 2px solid #4caf50 !important;
  outline-offset: 2px;
}
</style>
```

### Active State

```vue
<template>
  <div class="active-example">
    <div class="e-btn-group">
      <input type="radio" id="opt1" name="group" />
      <label class="e-btn active-btn" for="opt1">Selected</label>
      
      <input type="radio" id="opt2" name="group" />
      <label class="e-btn active-btn" for="opt2">Not Selected</label>
    </div>
  </div>
</template>

<style scoped>
.active-btn:has(input:checked) {
  background-color: #1976d2 !important;
  color: white !important;
  border-color: #1565c0 !important;
}

.active-btn {
  transition: all 0.2s ease;
}
</style>
```

---

## Theme Studio Integration

Use Syncfusion Theme Studio to customize themes:

1. Visit [Theme Studio](https://www.syncfusion.com/services/themestudio)
2. Customize colors, fonts, and spacing
3. Export the custom CSS file
4. Import it in your component

Example with custom theme:

```vue
<template>
  <div class="theme-example">
    <div class="e-btn-group">
      <ButtonComponent css-class="e-primary">Primary</ButtonComponent>
      <ButtonComponent css-class="e-success">Success</ButtonComponent>
      <ButtonComponent css-class="e-danger">Danger</ButtonComponent>
    </div>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
// Import your custom theme from Theme Studio
import './themes/custom-theme.css';
</script>

<style scoped>
.theme-example {
  padding: 20px;
}
</style>
```

---

## Advanced Styling Examples

### Soft Button Group

```vue
<template>
  <div class="soft-group">
    <div class="e-btn-group">
      <ButtonComponent>Soft Style</ButtonComponent>
      <ButtonComponent>Button Group</ButtonComponent>
      <ButtonComponent>Example</ButtonComponent>
    </div>
  </div>
</template>

<style scoped>
.soft-group :deep(.e-btn-group) {
  background-color: #f5f5f5;
  border-radius: 12px;
  padding: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.soft-group :deep(.e-btn) {
  background-color: transparent !important;
  border: none !important;
  color: #333;
  padding: 8px 16px !important;
  border-radius: 8px;
  transition: all 0.2s ease;
  margin: 2px;
}

.soft-group :deep(.e-btn:hover) {
  background-color: rgba(0, 0, 0, 0.08) !important;
}

.soft-group :deep(.e-btn:active) {
  background-color: rgba(0, 0, 0, 0.12) !important;
}
</style>
```

### Glass Effect Button Group

```vue
<template>
  <div class="glass-container">
    <div class="e-btn-group glass-group">
      <ButtonComponent>Glass</ButtonComponent>
      <ButtonComponent>Effect</ButtonComponent>
      <ButtonComponent>Buttons</ButtonComponent>
    </div>
  </div>
</template>

<style scoped>
.glass-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px;
  border-radius: 16px;
}

.glass-group {
  background: rgba(255, 255, 255, 0.1) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 12px !important;
  padding: 6px !important;
}

:deep(.glass-group .e-btn) {
  background-color: rgba(255, 255, 255, 0.15) !important;
  color: white !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  backdrop-filter: blur(10px);
  margin: 2px;
  transition: all 0.3s ease;
}

:deep(.glass-group .e-btn:hover) {
  background-color: rgba(255, 255, 255, 0.25) !important;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
</style>
```

### Neumorphic Button Group

```vue
<template>
  <div class="neumorphic-container">
    <div class="e-btn-group neumorphic-group">
      <ButtonComponent>Neumorphic</ButtonComponent>
      <ButtonComponent>Design</ButtonComponent>
      <ButtonComponent>Style</ButtonComponent>
    </div>
  </div>
</template>

<style scoped>
.neumorphic-container {
  background-color: #e0e5ec;
  padding: 40px;
  border-radius: 16px;
}

.neumorphic-group {
  background-color: #e0e5ec !important;
  border-radius: 12px !important;
  box-shadow: 9px 9px 16px #a3b1c6, -9px -9px 16px #ffffff !important;
  padding: 8px !important;
}

:deep(.neumorphic-group .e-btn) {
  background-color: #e0e5ec !important;
  color: #555 !important;
  border: none !important;
  box-shadow: 5px 5px 12px #a3b1c6, -5px -5px 12px #ffffff !important;
  margin: 4px;
  transition: all 0.3s ease;
}

:deep(.neumorphic-group .e-btn:active) {
  box-shadow: inset 5px 5px 12px #a3b1c6, inset -5px -5px 12px #ffffff !important;
}
</style>
```

---

## Next Steps

- Review how-to patterns in [buttongroup-how-to.md](buttongroup-how-to.md)
- Explore selection modes in [buttongroup-selection-and-nesting.md](buttongroup-selection-and-nesting.md)
- Check accessibility in [buttongroup-accessibility.md](buttongroup-accessibility.md)
