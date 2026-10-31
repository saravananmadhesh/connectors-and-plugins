# Button API Reference

> Complete API documentation for the Syncfusion Vue `ButtonComponent`.

---

## Table of Contents

1. [Properties](#properties)
2. [Methods](#methods)
3. [Events](#events)
4. [TypeScript Interfaces](#typescript-interfaces)

---

## Properties

### Basic Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | string | `''` | Button text content. Use as text node in template instead. |
| `icon-css` | string | `''` | CSS class(es) for the button icon. E.g., `"e-icons e-save"` |
| `icon-position` | `'Left'` \| `'Right'` \| `'Top'` \| `'Bottom'` | `'Left'` | Position of icon relative to text |
| `type` | `'button'` \| `'submit'` \| `'reset'` | `'button'` | HTML button type attribute |
| `disabled` | boolean | `false` | Disables the button and prevents interaction |
| `is-toggle` | boolean | `false` | Makes the button toggle between active/inactive states |
| `is-primary` | boolean | `false` | Applies primary styling (deprecated: use `css-class="e-primary"` instead) |

### Styling Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `css-class` | string | `''` | Additional CSS classes. Common values: `"e-primary"`, `"e-outline"`, `"e-flat"`, `"e-small"`, `"e-round-corner"`, `"e-block"` |

### Accessibility Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `aria-label` | string | `''` | Accessible name for screen readers (especially for icon-only buttons) |
| `title` | string | `''` | Tooltip text displayed on hover |

### Advanced Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enable-ripple` | boolean | `true` | Enables ripple effect on click (controlled globally with `enableRipple()`) |
| `enable-rtl` | boolean | `false` | Enables right-to-left layout for RTL languages |

---

## Methods

The `ButtonComponent` exposes the following methods via template refs:

```vue
<template>
  <ejs-button ref="btn" />
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const btn = ref(null);

// Call methods like:
btn.value?.click?.();
</script>
```

### Available Methods

| Method | Return Type | Description |
|--------|-------------|-------------|
| `click()` | `void` | Programmatically triggers a button click |
| `setProperties(properties: ButtonModel)` | `void` | Updates button properties |

---

## Events

Syncfusion button events follow Vue's event naming convention with `@` prefix.

### Event List

| Event | Arguments | Description |
|-------|-----------|-------------|
| `@click` | `ClickEventArgs` | Fires when the button is clicked |
| `@created` | `Event` | Fires after the component is created |
| `@focus` | `FocusEvent` | Fires when the button receives focus |
| `@blur` | `BlurEvent` | Fires when the button loses focus |

### Event Usage Example

```vue
<template>
  <ejs-button 
    @click="handleClick"
    @created="handleCreated"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    Click me
  </ejs-button>
</template>

<script setup>
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const handleClick = (args) => {
  console.log('Button clicked', args);
};

const handleCreated = () => {
  console.log('Button component created');
};

const handleFocus = (args) => {
  console.log('Button focused', args);
};

const handleBlur = (args) => {
  console.log('Button blurred', args);
};
</script>
```

---

## TypeScript Interfaces

### ClickEventArgs

```typescript
interface ClickEventArgs {
  /**
   * The event object
   */
  event?: Event;
  
  /**
   * The target element
   */
  target?: HTMLElement;
}
```

### ButtonModel

Interface for button properties used with `setProperties()`:

```typescript
interface ButtonModel {
  content?: string;
  iconCss?: string;
  iconPosition?: 'Left' | 'Right' | 'Top' | 'Bottom';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  isToggle?: boolean;
  isPrimary?: boolean;
  cssClass?: string;
  enableRipple?: boolean;
  enableRtl?: boolean;
}
```

---

## CSS Class Reference

### Style Classes

| Class | Effect |
|-------|--------|
| `e-primary` | Blue primary color |
| `e-success` | Green success color |
| `e-info` | Cyan info color |
| `e-warning` | Orange warning color |
| `e-danger` | Red danger color |
| `e-link` | Borderless link style |

### Appearance Classes

| Class | Effect |
|-------|--------|
| `e-flat` | Flat appearance |
| `e-outline` | Outline border style |
| `e-round-corner` | Rounded corners |
| `e-block` | Full-width button |
| `e-small` | Small size |
| `e-vertical` | Vertical icon + text layout |

### State Classes (Auto-Applied)

| Class | Applied When |
|-------|--------------|
| `e-hover` | Button is hovered |
| `e-focus` | Button has keyboard focus |
| `e-active` | Button is pressed/clicked |
| `e-disabled` | Button is disabled |

---

## Complete Example

```vue
<template>
  <div class="example">
    <ejs-button 
      ref="submitBtn"
      type="submit"
      :disabled="isDisabled"
      :is-toggle="toggleMode"
      css-class="e-primary e-round-corner"
      icon-css="e-icons e-save"
      icon-position="Left"
      aria-label="Save changes"
      title="Save your changes"
      @click="handleClick"
      @created="onCreated"
      @focus="onFocus"
    >
      {{ buttonText }}
    </ejs-button>
    
    <button @click="updateProperties">Update</button>
    <button @click="triggerClick">Trigger Click</button>
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

const submitBtn = ref(null);
const isDisabled = ref(false);
const toggleMode = ref(false);
const buttonText = ref('Save');

const handleClick = (args) => {
  console.log('Clicked!', args);
};

const onCreated = () => {
  console.log('Button created');
};

const onFocus = (args) => {
  console.log('Button focused');
};

const updateProperties = () => {
  submitBtn.value?.setProperties?.({
    disabled: !isDisabled.value,
    content: isDisabled.value ? 'Save' : 'Loading...'
  });
  isDisabled.value = !isDisabled.value;
};

const triggerClick = () => {
  submitBtn.value?.click?.();
};
</script>

<style scoped>
.example {
  display: flex;
  gap: 10px;
  padding: 20px;
}
</style>
```

---

## Next Steps

- Explore styling in [button-style-and-appearance.md](button-style-and-appearance.md)
- Review how-to patterns in [button-how-to.md](button-how-to.md)
- Check accessibility in [button-accessibility.md](button-accessibility.md)
- Learn about types and styles in [button-types-and-styles.md](button-types-and-styles.md)
