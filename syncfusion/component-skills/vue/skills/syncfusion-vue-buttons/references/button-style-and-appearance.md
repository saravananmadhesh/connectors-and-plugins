# Button Style and Appearance

> Reference guide for styling and customizing Syncfusion buttons.

---

## Table of Contents

1. [CSS Classes Reference](#css-classes-reference)
2. [Overriding Default Styles](#overriding-default-styles)
3. [Custom Theme Creation](#custom-theme-creation)
4. [Styling Examples](#styling-examples)

---

## CSS Classes Reference

| Class | Purpose |
|-------|---------|
| `e-btn` | Base button class |
| `e-primary` | Primary color style (blue) |
| `e-success` | Success color style (green) |
| `e-info` | Info color style (cyan) |
| `e-warning` | Warning color style (orange) |
| `e-danger` | Danger color style (red) |
| `e-link` | Link-style button (borderless) |
| `e-flat` | Flat button style |
| `e-outline` | Outline button style |
| `e-round-corner` | Rounded corners |
| `e-block` | Full-width button |
| `e-small` | Small button size |
| `e-vertical` | Vertical layout for icon + text |
| `e-rtl` | Right-to-left layout |
| `e-disabled` | Disabled state (applied automatically) |
| `e-hover` | Hover state |
| `e-active` | Active/pressed state |
| `e-focus` | Focus state |

---

## Overriding Default Styles

Use the `:deep()` selector to customize Syncfusion component internals:

```vue
<template>
  <ejs-button css-class="e-primary custom-button">
    Customized Button
  </ejs-button>
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
/* Override button background */
:deep(.e-btn.custom-button) {
  background-color: #ff6b6b !important;
  border-color: #ee5a6f !important;
}

/* Override hover state */
:deep(.e-btn.custom-button:hover) {
  background-color: #ee5a6f !important;
}

/* Override focus state */
:deep(.e-btn.custom-button:focus) {
  outline: 2px solid #cc5568 !important;
}

/* Override padding and font */
:deep(.e-btn.custom-button) {
  padding: 12px 24px !important;
  font-size: 14px !important;
  font-weight: 600 !important;
}

/* Override icon color */
:deep(.e-btn.custom-button .e-btn-icon) {
  color: #ffffff !important;
}
</style>
```

---

## Custom Theme Creation

The Syncfusion Theme Studio allows visual theme creation. To apply a custom theme:

1. Visit [Theme Studio](https://www.syncfusion.com/services/themestudio)
2. Customize colors, fonts, and spacing
3. Export the CSS file
4. Import it in your component or app

Example with custom theme:

```vue
<template>
  <div>
    <ejs-button css-class="e-primary">
      Styled with Custom Theme
    </ejs-button>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
// Import your custom theme CSS
import './themes/custom-theme.css';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>
```

---

## Styling Examples

### Gradient Button

```vue
<template>
  <ejs-button css-class="gradient-button e-primary">
    Gradient Button
  </ejs-button>
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
:deep(.e-btn.gradient-button) {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none !important;
}

:deep(.e-btn.gradient-button:hover) {
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%) !important;
}
</style>
```

### Shadow Button

```vue
<template>
  <ejs-button css-class="shadow-button e-primary">
    Shadow Button
  </ejs-button>
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
:deep(.e-btn.shadow-button) {
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
  transition: box-shadow 0.3s ease !important;
}

:deep(.e-btn.shadow-button:hover) {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3) !important;
}
</style>
```

### Animated Button

```vue
<template>
  <ejs-button css-class="animated-button e-primary">
    Hover for animation
  </ejs-button>
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
:deep(.e-btn.animated-button) {
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease !important;
}

:deep(.e-btn.animated-button::before) {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.5s, height 0.5s;
}

:deep(.e-btn.animated-button:hover::before) {
  width: 300px;
  height: 300px;
}
</style>
```

### Outline Button with Transition

```vue
<template>
  <ejs-button css-class="outline-transition e-outline e-primary">
    Hover Effect
  </ejs-button>
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
:deep(.e-btn.outline-transition) {
  transition: all 0.3s ease !important;
}

:deep(.e-btn.outline-transition:hover) {
  background-color: rgba(25, 118, 210, 0.1) !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(25, 118, 210, 0.2) !important;
}
</style>
```

### Icon Button with Background

```vue
<template>
  <ejs-button 
    icon-css="e-icons e-save"
    css-class="icon-bg e-primary"
  />
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
:deep(.e-btn.icon-bg) {
  width: 48px !important;
  height: 48px !important;
  padding: 0 !important;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

### Flat Button with Hover Color

```vue
<template>
  <ejs-button css-class="flat-hover e-flat e-primary">
    Flat Button
  </ejs-button>
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
:deep(.e-btn.flat-hover) {
  background-color: transparent !important;
  color: #1976d2 !important;
  transition: background-color 0.3s ease !important;
}

:deep(.e-btn.flat-hover:hover) {
  background-color: rgba(25, 118, 210, 0.08) !important;
}

:deep(.e-btn.flat-hover:active) {
  background-color: rgba(25, 118, 210, 0.16) !important;
}
</style>
```

---

## Common Color Values

```css
/* Primary Blue */
#1976d2

/* Success Green */
#4caf50

/* Info Cyan */
#00bcd4

/* Warning Orange */
#ff9800

/* Danger Red */
#f44336

/* Light Gray */
#f5f5f5

/* Dark Gray */
#757575
```

---

## Next Steps

- Explore how-to patterns in [button-how-to.md](button-how-to.md)
- Check accessibility in [button-accessibility.md](button-accessibility.md)
- View complete API in [button-api.md](button-api.md)
