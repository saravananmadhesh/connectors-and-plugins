# RadioButton API Reference

> Complete API documentation for RadioButton component.

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | boolean | `false` | Initial checked state |
| `disabled` | boolean | `false` | Disable the RadioButton |
| `label` | string | `''` | RadioButton label text |
| `label-position` | string | `'Before'` | Label position: Before/After |
| `name` | string | `''` | Name attribute for form |
| `value` | string | `''` | Value for form submission |
| `id` | string | `''` | Unique identifier |
| `css-class` | string | `''` | Custom CSS classes |
| `aria-label` | string | `''` | Accessibility label |

## Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `click()` | - | void | Trigger RadioButton click |

## Events

| Event | Description |
|-------|-------------|
| `@change` | Fired when checked state changes |
| `@created` | Fired when component is created |
| `@destroyed` | Fired when component is destroyed |

---

## Complete Example

```vue
<template>
  <div class="p-6">
    <fieldset>
      <legend class="text-lg font-semibold mb-4">Choose Payment Method</legend>
      
      <div class="space-y-3">
        <div>
          <ejs-radiobutton 
            label="Credit Card"
            name="payment"
            value="card"
            v-model="method"
            @change="onPaymentChange"
          ></ejs-radiobutton>
        </div>
        
        <div>
          <ejs-radiobutton 
            label="Bank Transfer"
            name="payment"
            value="transfer"
            v-model="method"
            @change="onPaymentChange"
          ></ejs-radiobutton>
        </div>
        
        <div>
          <ejs-radiobutton 
            label="Digital Wallet"
            name="payment"
            value="wallet"
            v-model="method"
            @change="onPaymentChange"
            disabled
          ></ejs-radiobutton>
        </div>
      </div>
      
      <div class="mt-4 p-3 bg-gray-100 rounded">
        <p>Selected: {{ method }}</p>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RadioButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-radiobutton": RadioButtonComponent
  }
}

const method = ref('card');

const onPaymentChange = () => {
  console.log('Payment method changed to:', method.value);
};
</script>
```

---

## Related Components

- [Button](button-getting-started.md)
- [Checkbox](checkbox-getting-started.md)
