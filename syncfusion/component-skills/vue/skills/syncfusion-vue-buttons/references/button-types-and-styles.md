# Button Types and Styles

> Syncfusion buttons support multiple predefined styles and types to cover a wide range of design requirements. This guide demonstrates all available visual variations.

---

## Table of Contents

1. [Predefined Color Styles](#predefined-color-styles)
2. [Button Types](#button-types)
3. [Icon Buttons](#icon-buttons)
4. [Icon Positioning](#icon-positioning)
5. [Button Sizes](#button-sizes)
6. [Combining Styles](#combining-styles)

---

## Predefined Color Styles

Apply color styles using the `css-class` property:

```vue
<template>
  <div class="button-container">
    <ejs-button>Default</ejs-button>
    <ejs-button css-class="e-primary">Primary</ejs-button>
    <ejs-button css-class="e-success">Success</ejs-button>
    <ejs-button css-class="e-info">Info</ejs-button>
    <ejs-button css-class="e-warning">Warning</ejs-button>
    <ejs-button css-class="e-danger">Danger</ejs-button>
    <ejs-button css-class="e-link">Link</ejs-button>
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
.button-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
```

**Available Styles:**
- `e-primary` - Blue highlight for primary actions
- `e-success` - Green for successful/positive actions
- `e-info` - Cyan for informational content
- `e-warning` - Orange for warnings
- `e-danger` - Red for destructive actions
- `e-link` - Borderless link-style button

---

## Button Types

Syncfusion provides several visual button types:

```vue
<template>
  <div class="button-container">
    <!-- Default Button (filled) -->
    <ejs-button css-class="e-primary">Filled</ejs-button>
    
    <!-- Flat Button -->
    <ejs-button css-class="e-flat e-primary">Flat</ejs-button>
    
    <!-- Outline Button -->
    <ejs-button css-class="e-outline e-primary">Outline</ejs-button>
    
    <!-- Round Button -->
    <ejs-button css-class="e-round-corner e-primary">Round</ejs-button>
    
    <!-- Toggle Button -->
    <ejs-button 
      :is-toggle="true"
      css-class="e-primary"
    >
      Toggle
    </ejs-button>
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
.button-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
```

**Type Reference:**
- Default (filled) - Solid color background with white text
- `e-flat` - Flat appearance without border
- `e-outline` - Outlined style with border
- `e-round-corner` - Rounded corner button
- `:is-toggle="true"` - Button that toggles between active/inactive states

---

## Icon Buttons

Add icons to buttons with the `icon-css` property:

```vue
<template>
  <div class="button-container">
    <!-- Icon only -->
    <ejs-button icon-css="e-icons e-save"></ejs-button>
    
    <!-- Icon with text (left) -->
    <ejs-button icon-css="e-icons e-save">Save</ejs-button>
    
    <!-- Icon with text (right) -->
    <ejs-button 
      icon-css="e-icons e-search"
      icon-position="Right"
    >
      Search
    </ejs-button>
    
    <!-- Icon with different styles -->
    <ejs-button 
      css-class="e-primary"
      icon-css="e-icons e-delete"
    >
      Delete
    </ejs-button>
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
.button-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
```

**Common Icon Classes:**
- `e-icons e-save` - Save icon
- `e-icons e-delete` - Delete icon
- `e-icons e-search` - Search icon
- `e-icons e-refresh` - Refresh icon
- `e-icons e-download` - Download icon
- `e-icons e-upload` - Upload icon
- `e-icons e-settings` - Settings icon

---

## Icon Positioning

Control where the icon appears relative to text:

```vue
<template>
  <div class="button-container">
    <!-- Left (default) -->
    <ejs-button icon-css="e-icons e-save" icon-position="Left">
      Save
    </ejs-button>
    
    <!-- Right -->
    <ejs-button icon-css="e-icons e-download" icon-position="Right">
      Download
    </ejs-button>
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
.button-container {
  display: flex;
  gap: 10px;
}
</style>
```

**Valid Values:**
- `"Left"` (default) - Icon appears on the left
- `"Right"` - Icon appears on the right

---

## Button Sizes

Create buttons in different sizes:

```vue
<template>
  <div class="button-container">
    <!-- Small -->
    <ejs-button css-class="e-small">Small</ejs-button>
    
    <!-- Normal (default) -->
    <ejs-button>Normal</ejs-button>
    
    <!-- Large (with custom CSS) -->
    <ejs-button css-class="e-large">Large</ejs-button>
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
.button-container {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
```

---

## Combining Styles

Mix and match multiple classes for advanced styling:

```vue
<template>
  <div class="button-container">
    <!-- Flat primary button with icon -->
    <ejs-button 
      css-class="e-flat e-primary"
      icon-css="e-icons e-save"
    >
      Save
    </ejs-button>
    
    <!-- Outline success button with icon positioned right -->
    <ejs-button 
      css-class="e-outline e-success"
      icon-css="e-icons e-check"
      icon-position="Right"
    >
      Confirm
    </ejs-button>
    
    <!-- Round danger button, small size -->
    <ejs-button 
      css-class="e-round-corner e-danger e-small"
      icon-css="e-icons e-delete"
    >
      Remove
    </ejs-button>
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
.button-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
</style>
```

---

## Form-Related Button Types

Use the `type` property for HTML button types:

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="formData" type="text" placeholder="Enter value" />
    
    <!-- Submit button -->
    <ejs-button type="submit">Submit</ejs-button>
    
    <!-- Reset button -->
    <ejs-button type="reset">Reset</ejs-button>
    
    <!-- Button (default, no form submission) -->
    <ejs-button type="button" @click="handleCancel">Cancel</ejs-button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { ButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-button': ButtonComponent
  }
};

const formData = ref('');

const handleSubmit = () => {
  console.log('Form submitted with:', formData.value);
};

const handleCancel = () => {
  formData.value = '';
};
</script>
```

---

## Next Steps

- Learn about styling customization in [button-style-and-appearance.md](button-style-and-appearance.md)
- Explore how-to guides in [button-how-to.md](button-how-to.md)
- Check accessibility in [button-accessibility.md](button-accessibility.md)
- View complete API in [button-api.md](button-api.md)
