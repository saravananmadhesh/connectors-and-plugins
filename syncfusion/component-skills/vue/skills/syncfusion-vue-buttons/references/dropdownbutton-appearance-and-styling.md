# DropdownButton Appearance and Styling

> Customize DropdownButton appearance with styles and themes.

---

## Table of Contents

1. [Button Styles](#button-styles)
2. [CSS Classes](#css-classes)
3. [Color Variants](#color-variants)
4. [Size Options](#size-options)
5. [Custom Themes](#custom-themes)

---

## Button Styles

Apply different button styles:

```vue
<template>
  <div class="example-section">
    <h2>Button Styles</h2>

    <h3>Default Style</h3>
    <ejs-dropdownbutton :items="items">Default</ejs-dropdownbutton>

    <h3>Outline Style</h3>
    <ejs-dropdownbutton
      css-class="e-outline"
      :items="items"
    >Outline</ejs-dropdownbutton>

    <h3>Round Style</h3>
    <ejs-dropdownbutton
      css-class="e-round"
      :items="items"
    >Round</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      items: [
        { text: 'Option 1' },
        { text: 'Option 2' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 15px;
}
</style>
```

---

## CSS Classes

Available CSS classes for styling:

| Class | Description |
|-------|-------------|
| `e-primary` | Primary color |
| `e-success` | Success color |
| `e-info` | Info color |
| `e-warning` | Warning color |
| `e-danger` | Danger/error color |
| `e-outline` | Outline style |
| `e-round` | Rounded corners |
| `e-small` | Small size |
| `e-large` | Large size |
| `e-block` | Full width |

---

## Color Variants

Apply color schemes:

```vue
<template>
  <div class="example-section">
    <h2>Color Variants</h2>

    <h3>Primary</h3>
    <ejs-dropdownbutton
      css-class="e-primary"
      :items="items"
    >Primary</ejs-dropdownbutton>

    <h3>Success</h3>
    <ejs-dropdownbutton
      css-class="e-success"
      :items="items"
    >Success</ejs-dropdownbutton>

    <h3>Warning</h3>
    <ejs-dropdownbutton
      css-class="e-warning"
      :items="items"
    >Warning</ejs-dropdownbutton>

    <h3>Danger</h3>
    <ejs-dropdownbutton
      css-class="e-danger"
      :items="items"
    >Danger</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      items: [
        { text: 'Option 1' },
        { text: 'Option 2' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 15px;
}
</style>
```

---

## Size Options

Control button sizes:

```vue
<template>
  <div class="example-section">
    <h2>Size Options</h2>

    <h3>Small Button</h3>
    <ejs-dropdownbutton
      css-class="e-small"
      :items="items"
    >Small</ejs-dropdownbutton>

    <h3>Default Size</h3>
    <ejs-dropdownbutton :items="items">Default</ejs-dropdownbutton>

    <h3>Large Button</h3>
    <ejs-dropdownbutton
      css-class="e-large"
      :items="items"
    >Large</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      items: [
        { text: 'Option 1' },
        { text: 'Option 2' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 15px;
}
</style>
```

---

## Custom Themes

Apply custom theme styling:

```vue
<template>
  <div class="example-section">
    <h2>Custom Themes</h2>

    <h3>Glass Theme</h3>
    <ejs-dropdownbutton
      css-class="glass-theme"
      :items="items"
    >Glass</ejs-dropdownbutton>

    <h3>Gradient Theme</h3>
    <ejs-dropdownbutton
      css-class="gradient-theme"
      :items="items"
    >Gradient</ejs-dropdownbutton>

    <h3>Neon Theme</h3>
    <ejs-dropdownbutton
      css-class="neon-theme"
      :items="items"
    >Neon</ejs-dropdownbutton>
  </div>
</template>

<script>
import { DropDownButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: 'App',
  components: { 'ejs-dropdownbutton': DropDownButtonComponent },
  data() {
    return {
      items: [
        { text: 'Option 1' },
        { text: 'Option 2' }
      ]
    };
  }
};
</script>

<style scoped>
.example-section {
  padding: 20px;
}

h3 {
  margin-top: 25px;
  margin-bottom: 15px;
}

/* Glass Theme */
:deep(.glass-theme) {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: #333;
}

:deep(.glass-theme:hover) {
  background: rgba(255, 255, 255, 0.25);
}

/* Gradient Theme */
:deep(.gradient-theme) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
}

:deep(.gradient-theme:hover) {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
}

/* Neon Theme */
:deep(.neon-theme) {
  background: linear-gradient(135deg, #ff00ff, #00ffff);
  border: 2px solid #fff;
  color: #fff;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
  box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
}
</style>
```

---

## Next Steps

- Check events in [dropdownbutton-events-and-interactivity.md](dropdownbutton-events-and-interactivity.md)
- View templates in [dropdownbutton-item-template.md](dropdownbutton-item-template.md)
- Learn ListView integration in [dropdownbutton-listview-integration.md](dropdownbutton-listview-integration.md)
- View accessibility in [dropdownbutton-accessibility.md](dropdownbutton-accessibility.md)
