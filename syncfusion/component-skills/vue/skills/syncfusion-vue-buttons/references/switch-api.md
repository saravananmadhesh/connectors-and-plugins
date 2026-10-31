# Switch API Reference

> Complete API documentation for Switch component.

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `checked` | boolean | `false` | Initial checked state |
| `disabled` | boolean | `false` | Disable the switch |
| `on-label` | string | `'On'` | Label for ON state |
| `off-label` | string | `'Off'` | Label for OFF state |
| `css-class` | string | `''` | Custom CSS classes |
| `id` | string | `''` | Unique identifier |
| `name` | string | `''` | Name attribute for form |

## Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `toggle()` | - | void | Toggle switch state |
| `focus()` | - | void | Set focus to switch |

## Events

| Event | Description |
|-------|-------------|
| `@change` | Fired when state changes |
| `@created` | Fired on component creation |
| `@destroyed` | Fired on component destruction |

---

## Complete Example

```vue
<template>
  <div class="p-6 space-y-6">
    <div>
      <h3 class="text-lg font-semibold mb-4">Settings</h3>
      
      <div class="space-y-4">
        <label class="flex items-center">
          <ejs-switch 
            v-model="wifi"
            onLabel="WiFi On"
            offLabel="WiFi Off"
            @change="onWiFiChange"
          ></ejs-switch>
          <span class="ml-3 font-medium">WiFi</span>
        </label>
        
        <label class="flex items-center">
          <ejs-switch 
            v-model="bluetooth"
            onLabel="BT On"
            offLabel="BT Off"
            @change="onBluetoothChange"
          ></ejs-switch>
          <span class="ml-3 font-medium">Bluetooth</span>
        </label>
        
        <label class="flex items-center">
          <ejs-switch 
            v-model="darkMode"
            cssClass="e-primary"
            @change="onDarkModeChange"
          ></ejs-switch>
          <span class="ml-3 font-medium">Dark Mode</span>
        </label>
      </div>
      
      <p v-if="message" class="mt-4 p-3 bg-blue-100 rounded">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { SwitchComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    'ejs-switch': SwitchComponent
  }
}

const wifi = ref(true);
const bluetooth = ref(false);
const darkMode = ref(false);
const message = ref('');

const onWiFiChange = () => {
  message.value = `WiFi ${wifi.value ? 'enabled' : 'disabled'}`;
};

const onBluetoothChange = () => {
  message.value = `Bluetooth ${bluetooth.value ? 'enabled' : 'disabled'}`;
};

const onDarkModeChange = () => {
  message.value = `Dark Mode ${darkMode.value ? 'enabled' : 'disabled'}`;
};
</script>
```

---

## Related Components

- [Button](button-getting-started.md)
- [RadioButton](radiobutton-getting-started.md)
