# ProgressButton Accessibility

> Ensure ProgressButton compliance with WCAG 2.2.

---

## ARIA Attributes

```vue
<template>
  <ejs-progressbutton 
    content="Download"
    :duration="3000"
    aria-label="Download File Progress"
    aria-describedby="download-status"
  ></ejs-progressbutton>
  <div id="download-status">Downloading... 0%</div>
</template>

<script setup>
import { ProgressButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-progressbutton": ProgressButtonComponent
  }
}
</script>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Focus ProgressButton |
| `Enter`/`Space` | Activate |
| `Esc` | Cancel operation |

```vue
<template>
  <div class="flex gap-4">
    <ejs-progressbutton 
      content="Submit"
      :duration="3000"
      aria-label="Submit Form"
    ></ejs-progressbutton>
    <ejs-progressbutton 
      content="Cancel"
      aria-label="Cancel Operation"
    ></ejs-progressbutton>
  </div>
</template>

<script setup>
import { ProgressButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-progressbutton": ProgressButtonComponent
  }
}
</script>
```

---

## Next Steps

- Review API in [progressbutton-api.md](progressbutton-api.md)
