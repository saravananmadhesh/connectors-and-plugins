# ProgressButton API Reference

> Complete API documentation for ProgressButton component.

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | string | `''` | Button text content |
| `duration` | number | `2000` | Progress duration in ms |
| `icon-css` | string | `''` | Icon CSS class |
| `spinner-visible` | boolean | `true` | Show progress spinner |
| `progress-position` | string | `'Left'` | Progress position: Left/Top/Bottom |
| `css-class` | string | `''` | Custom CSS classes |
| `disabled` | boolean | `false` | Disable the button |

## Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `click()` | - | void | Trigger button click |

## Events

| Event | Description |
|-------|-------------|
| `@click` | Fired on button click |
| `@begin` | Fired when progress starts |
| `@end` | Fired when progress ends |
| `@created` | Fired when component created |
| `@destroyed` | Fired when component destroyed |

---

## Complete Example

```vue
<template>
  <div class="p-6">
    <div class="space-y-4">
      <ejs-progressbutton 
        content="Download"
        :duration="3000"
        cssClass="e-primary"
        @begin="onBegin"
        @end="onEnd"
      ></ejs-progressbutton>
      
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ProgressButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-progressbutton": ProgressButtonComponent
  }
}

const message = ref('');

const onBegin = () => {
  message.value = 'Download started...';
};

const onEnd = () => {
  message.value = 'Download completed!';
};
</script>
```

---

## Related Components

- [Button](button-getting-started.md)
- [ProgressBar](progressbar-api.md)
