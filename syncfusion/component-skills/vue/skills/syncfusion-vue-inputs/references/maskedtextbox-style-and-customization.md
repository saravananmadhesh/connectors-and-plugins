# Style and Customization — Syncfusion Vue MaskedTextBox

## Table of Contents
- [CSS Customization](#css-customization)
- [Theme Integration](#theme-integration)
- [Custom Classes](#custom-classes)
- [Styling Examples](#styling-examples)

---

## CSS Customization

Customize appearance with scoped styles:

```vue
<template>
  <div class="custom-masked-textbox">
    <ejs-maskedtextbox
      mask="(999) 999-9999"
      placeholder="Phone"
      css-class="custom-phone">
    </ejs-maskedtextbox>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  }
}
</script>

<style scoped>
.custom-masked-textbox :deep(.e-maskedtextbox) {
  border: 2px solid #0078d4;
  border-radius: 6px;
  padding: 10px;
}

.custom-masked-textbox :deep(.e-maskedtextbox:focus) {
  border-color: #106ebe;
  box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.1);
}
</style>
```

---

## Theme Integration

Use built-in Syncfusion themes:

```vue
<template>
  <div>
    <div class="theme-selector">
      <button
        v-for="theme in themes"
        :key="theme"
        @click="currentTheme = theme"
        :class="{ active: currentTheme === theme }">
        {{ theme }}
      </button>
    </div>

    <ejs-maskedtextbox
      mask="(999) 999-9999"
      placeholder="Phone"
      :css-class="'theme-' + currentTheme">
    </ejs-maskedtextbox>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  },
  data() {
    return {
      themes: ['material', 'bootstrap', 'fabric'],
      currentTheme: 'material'
    }
  }
}
</script>

<style scoped>
.theme-selector {
  margin-bottom: 20px;
}

button {
  padding: 8px 16px;
  margin-right: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

button.active {
  background: #0078d4;
  color: white;
  border-color: #0078d4;
}
</style>
```

---

## Custom Classes

Apply custom CSS classes:

```vue
<template>
  <div class="custom-class-demo">
    <ejs-maskedtextbox
      mask="(999) 999-9999"
      css-class="e-success"
      placeholder="Valid Input">
    </ejs-maskedtextbox>

    <ejs-maskedtextbox
      mask="(999) 999-9999"
      css-class="e-warning"
      placeholder="Warning Input">
    </ejs-maskedtextbox>

    <ejs-maskedtextbox
      mask="(999) 999-9999"
      css-class="e-danger"
      placeholder="Error Input">
    </ejs-maskedtextbox>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  }
}
</script>

<style scoped>
:deep(.e-maskedtextbox.e-success) {
  border-color: #107c10;
}

:deep(.e-maskedtextbox.e-warning) {
  border-color: #ffb900;
}

:deep(.e-maskedtextbox.e-danger) {
  border-color: #d83b01;
}
</style>
```

---

## Styling Examples

### Complete Styling Demo

```vue
<template>
  <div class="styling-demo">
    <h3>MaskedTextBox Styling Examples</h3>
    
    <div class="example-section">
      <h4>1. Default Style</h4>
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        placeholder="Phone">
      </ejs-maskedtextbox>
    </div>

    <div class="example-section">
      <h4>2. Rounded Style</h4>
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        placeholder="Phone"
        css-class="rounded">
      </ejs-maskedtextbox>
    </div>

    <div class="example-section">
      <h4>3. Large Style</h4>
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        placeholder="Phone"
        css-class="large">
      </ejs-maskedtextbox>
    </div>

    <div class="example-section">
      <h4>4. Disabled State</h4>
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        placeholder="Phone"
        :disabled="true"
        value="(555) 555-5555">
      </ejs-maskedtextbox>
    </div>

    <div class="example-section">
      <h4>5. Read-Only State</h4>
      <ejs-maskedtextbox
        mask="(999) 999-9999"
        placeholder="Phone"
        :readonly="true"
        value="(555) 555-5555">
      </ejs-maskedtextbox>
    </div>
  </div>
</template>

<script>
import { MaskedTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-maskedtextbox': MaskedTextBoxComponent
  }
}
</script>

<style scoped>
.styling-demo {
  padding: 20px;
  max-width: 500px;
}

.example-section {
  margin-bottom: 25px;
}

.example-section h4 {
  margin-bottom: 10px;
  color: #333;
}

:deep(.e-maskedtextbox.rounded) {
  border-radius: 20px;
}

:deep(.e-maskedtextbox.large) {
  padding: 15px;
  font-size: 16px;
}

:deep(.e-maskedtextbox:disabled) {
  background: #f5f5f5;
  opacity: 0.6;
}

:deep(.e-maskedtextbox[readonly]) {
  background: #f9f9f9;
}
</style>
```
