# Button Getting Started

> The `ButtonComponent` is the foundational graphical UI element for user interactions. This guide covers installation, setup, and rendering your first button in a Vue 3 application.

---

## Table of Contents

1. [Installation](#installation)
2. [CSS Imports](#css-imports)
3. [Component Registration](#component-registration)
4. [Rendering the Button](#rendering-the-button)
5. [Event Handling](#event-handling)
6. [Ripple Effect](#ripple-effect)
7. [Next Steps](#next-steps)

---

## Installation

Install the button package via npm:

```bash
npm install @syncfusion/ej2-vue-buttons --save
npm install @syncfusion/ej2-base --save
```

---

## CSS Imports

Import the required CSS files at the root of your application (e.g., `main.ts` or in your component):

```typescript
// In main.ts or App.vue
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/button/index.css";
```

Supported themes:
- `tailwind3.css` (default, used in examples)
- `material.css`
- `bootstrap.css`
- `bootstrap4.css`
- `fluent.css`
- `highcontrast.css`

---

## Component Registration

Import the `ButtonComponent` in your Vue component:

```vue
<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
</script>
```

---

## Rendering the Button

Create a basic button in your template:

```vue
<template>
  <div id="app">
    <ejs-button>Click me</ejs-button>
  </div>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';
import '@syncfusion/ej2-base/styles/tailwind3.css';
import '@syncfusion/ej2-buttons/styles/tailwind3.css';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};
</script>
```

**Result:** A default button with text "Click me" renders on the page.

---

## Event Handling

Handle button clicks using the `@click` event:

```vue
<template>
  <div>
    <ejs-button @click="handleClick">Say Hello</ejs-button>
    <p>{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const message = ref('');

const handleClick = () => {
  message.value = 'Button clicked!';
};
</script>
```

---

## Ripple Effect

Enable the ripple effect globally for all buttons:

```vue
<script setup>
import { enableRipple } from '@syncfusion/ej2-base';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

// Enable ripple effect
enableRipple(true);
</script>
```

The ripple effect creates a visual feedback when the button is clicked, enhancing the user experience.

---

## Next Steps

- Explore [button-types-and-styles.md](button-types-and-styles.md) for styling options
- Learn about icons in [button-how-to.md](button-how-to.md)
- Check accessibility in [button-accessibility.md](button-accessibility.md)
- View complete API in [button-api.md](button-api.md)
