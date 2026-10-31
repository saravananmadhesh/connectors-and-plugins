# Style and Appearance — Syncfusion Vue CheckBox

Customize the checkbox visual appearance using CSS classes, themes, and styling options.

---

## Table of Contents
- [CSS Class Customization](#css-class-customization)
- [Built-in Themes](#built-in-themes)
- [Custom Styling](#custom-styling)
- [Icon Customization](#icon-customization)
- [Ripple Effect](#ripple-effect)
- [Focus and Hover States](#focus-and-hover-states)

---

## CSS Class Customization

Use the `css-class` property to apply custom CSS classes:

```vue
<template>
  <div>
    <ejs-checkbox
      label="Styled Checkbox"
      css-class="custom-checkbox">
    </ejs-checkbox>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  }
}
</script>

<style scoped>
.e-checkbox.custom-checkbox .e-frame {
  border-width: 2px;
  border-color: #0078d4;
}

.e-checkbox.custom-checkbox .e-frame.e-check-mark::before {
  color: #0078d4;
}

.e-checkbox.custom-checkbox .e-label {
  font-weight: 600;
  color: #0078d4;
}
</style>
```

**Property:** `cssClass` — `string`, defaults to `''`

---

## Built-in Themes

Syncfusion provides multiple theme options. Import the desired theme CSS:

```vue
<template>
  <div>
    <h3>Available Themes</h3>
    <ejs-checkbox label="Material Theme" :checked="true"></ejs-checkbox>
    <ejs-checkbox label="Bootstrap Theme" :checked="true"></ejs-checkbox>
    <ejs-checkbox label="Fabric Theme" :checked="true"></ejs-checkbox>
    <ejs-checkbox label="Tailwind Theme" :checked="true"></ejs-checkbox>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';
// Import theme CSS in your main.js or App.vue:
// import '@syncfusion/ej2-vue-buttons/styles/material.css';
// import '@syncfusion/ej2-vue-buttons/styles/bootstrap.css';
// import '@syncfusion/ej2-vue-buttons/styles/fabric.css';
// import '@syncfusion/ej2-vue-buttons/styles/tailwind.css';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  }
}
</script>
```

**Available Themes:**
- `material.css` — Material Design
- `bootstrap.css` — Bootstrap 4 style
- `fabric.css` — Office Fabric Design
- `tailwind.css` — Tailwind CSS style
- `bootstrap5.css` — Bootstrap 5 style
- `highcontrast.css` — High contrast for accessibility

---

## Custom Styling

Override the default checkbox appearance with scoped styles:

```vue
<template>
  <div class="custom-styling-demo">
    <div class="checkbox-group">
      <h4>Custom Colored Checkboxes</h4>
      <ejs-checkbox
        label="Primary"
        css-class="primary"
        :checked="true">
      </ejs-checkbox>
      <ejs-checkbox
        label="Success"
        css-class="success"
        :checked="true">
      </ejs-checkbox>
      <ejs-checkbox
        label="Danger"
        css-class="danger"
        :checked="true">
      </ejs-checkbox>
    </div>

    <div class="checkbox-group">
      <h4>Custom Size</h4>
      <ejs-checkbox
        label="Large Checkbox"
        css-class="large"
        :checked="true">
      </ejs-checkbox>
      <ejs-checkbox
        label="Standard Checkbox"
        :checked="true">
      </ejs-checkbox>
      <ejs-checkbox
        label="Small Checkbox"
        css-class="e-small"
        :checked="true">
      </ejs-checkbox>
    </div>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  }
}
</script>

<style scoped>
.custom-styling-demo {
  padding: 20px;
}

.checkbox-group {
  margin-bottom: 30px;
}

h4 {
  margin-bottom: 15px;
  color: #333;
}

/* Primary */
.e-checkbox.primary .e-frame {
  border-color: #0078d4;
  background-color: transparent;
}

.e-checkbox.primary .e-frame.e-check-mark::before {
  color: #0078d4;
}

.e-checkbox.primary:hover .e-frame {
  border-color: #106ebe;
}

/* Success */
.e-checkbox.success .e-frame {
  border-color: #107c10;
  background-color: transparent;
}

.e-checkbox.success .e-frame.e-check-mark::before {
  color: #107c10;
}

.e-checkbox.success:hover .e-frame {
  border-color: #0b7015;
}

/* Danger */
.e-checkbox.danger .e-frame {
  border-color: #d83b01;
  background-color: transparent;
}

.e-checkbox.danger .e-frame.e-check-mark::before {
  color: #d83b01;
}

.e-checkbox.danger:hover .e-frame {
  border-color: #a82e00;
}

/* Large */
.e-checkbox.large .e-frame {
  width: 24px;
  height: 24px;
  border-width: 2px;
}

.e-checkbox.large .e-label {
  font-size: 16px;
  margin-left: 8px;
}
</style>
```

---

## Icon Customization

Customize the checkmark icon appearance using CSS pseudo-elements:

```vue
<template>
  <div>
    <div class="icon-demo">
      <h4>Custom Check Icon</h4>
      <ejs-checkbox
        label="Custom Check"
        css-class="custom-check-icon"
        :checked="true">
      </ejs-checkbox>
    </div>

    <div class="icon-demo">
      <h4>No Icon (Custom)</h4>
      <ejs-checkbox
        label="Invisible Check"
        css-class="invisible-check"
        :checked="true">
      </ejs-checkbox>
    </div>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  }
}
</script>

<style scoped>
.icon-demo {
  margin: 20px 0;
}

/* Custom check icon (using emoji) */
.e-checkbox.custom-check-icon .e-frame.e-check-mark::before {
  content: '✓';
  font-weight: bold;
  font-size: 14px;
}

/* Invisible check */
.e-checkbox.invisible-check .e-frame.e-check-mark::before {
  content: '';
}
</style>
```

---

## Ripple Effect

The Syncfusion CheckBox includes a ripple animation on click. Enable it in your main.js:

```javascript
// main.js
import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(true);
```

```vue
<template>
  <div>
    <ejs-checkbox
      label="Ripple Effect Enabled"
      :checked="true">
    </ejs-checkbox>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  }
}
</script>
```

The ripple effect automatically applies when you enable it globally.

---

## Focus and Hover States

Customize focus and hover appearances:

```vue
<template>
  <div class="focus-hover-demo">
    <ejs-checkbox
      label="Custom Focus and Hover States"
      :checked="true">
    </ejs-checkbox>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  }
}
</script>

<style scoped>
.focus-hover-demo .e-checkbox:hover .e-frame {
  border-color: #0078d4;
  background-color: rgba(0, 120, 212, 0.1);
}

.focus-hover-demo .e-checkbox:focus-within .e-frame {
  box-shadow: 0 0 0 2px rgba(0, 120, 212, 0.3);
  outline: 2px solid #0078d4;
}

.focus-hover-demo .e-checkbox .e-label {
  transition: color 0.2s ease-in-out;
}

.focus-hover-demo .e-checkbox:hover .e-label {
  color: #0078d4;
}
</style>
```

**Best Practices:**
- Use semantic colors (primary, success, danger) for better UX
- Maintain sufficient color contrast for accessibility (WCAG AA minimum 4.5:1)
- Provide visual feedback for hover and focus states
- Test custom styling with different themes
- Keep ripple effects enabled for modern UI feel
