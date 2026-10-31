# Adornments and Styling — Syncfusion Vue NumericTextBox

## Table of Contents
- [Prefix and Suffix](#prefix-and-suffix)
- [CSS Customization](#css-customization)
- [Theme Integration](#theme-integration)
- [Examples](#examples)

---

## Prefix and Suffix

Add prefix and suffix to NumericTextBox:

```vue
<template>
  <div>
    <ejs-numerictextbox
      value="100"
      prefix="$"
      placeholder="Price">
    </ejs-numerictextbox>

    <ejs-numerictextbox
      value="75"
      suffix="%"
      placeholder="Percentage">
    </ejs-numerictextbox>

    <ejs-numerictextbox
      value="10"
      prefix="Qty: "
      suffix=" items"
      placeholder="Quantity">
    </ejs-numerictextbox>
  </div>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  }
}
</script>
```

---

## CSS Customization

Style NumericTextBox with custom CSS:

```vue
<template>
  <div class="custom-styling">
    <ejs-numerictextbox
      value="100"
      placeholder="Custom Style"
      css-class="custom-input">
    </ejs-numerictextbox>
  </div>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  }
}
</script>

<style scoped>
:deep(.e-numeric.custom-input) {
  border: 2px solid #0078d4;
  border-radius: 8px;
  padding: 12px;
  font-size: 16px;
}

:deep(.e-numeric.custom-input:focus) {
  border-color: #106ebe;
  box-shadow: 0 0 0 3px rgba(0, 120, 212, 0.1);
}
</style>
```

---

## Theme Integration

Apply Syncfusion themes:

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

    <ejs-numerictextbox
      value="100"
      :css-class="'theme-' + currentTheme"
      placeholder="Price">
    </ejs-numerictextbox>
  </div>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
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

## Examples

### Complete Styling Demo

```vue
<template>
  <div class="styling-demo">
    <h3>NumericTextBox Styling Examples</h3>

    <div class="example">
      <h4>Price Input</h4>
      <ejs-numerictextbox
        value="99.99"
        prefix="$"
        suffix=".00"
        :decimals="2"
        placeholder="Enter price">
      </ejs-numerictextbox>
    </div>

    <div class="example">
      <h4>Percentage Input</h4>
      <ejs-numerictextbox
        value="50"
        suffix="%"
        :min="0"
        :max="100"
        placeholder="Enter percentage">
      </ejs-numerictextbox>
    </div>

    <div class="example">
      <h4>Large Input</h4>
      <ejs-numerictextbox
        value="1000"
        css-class="large"
        placeholder="Large input">
      </ejs-numerictextbox>
    </div>

    <div class="example">
      <h4>Disabled State</h4>
      <ejs-numerictextbox
        value="500"
        :disabled="true"
        placeholder="Disabled">
      </ejs-numerictextbox>
    </div>
  </div>
</template>

<script>
import { NumericTextBoxComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-numerictextbox': NumericTextBoxComponent
  }
}
</script>

<style scoped>
.styling-demo {
  padding: 20px;
  max-width: 400px;
}

.example {
  margin-bottom: 25px;
}

.example h4 {
  margin-bottom: 10px;
}

:deep(.e-numeric.large) {
  padding: 15px;
  font-size: 16px;
  height: 45px;
}

:deep(.e-numeric:disabled) {
  background: #f5f5f5;
  opacity: 0.6;
}
</style>
```
