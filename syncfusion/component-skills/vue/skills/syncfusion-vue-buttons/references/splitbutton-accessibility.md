# SplitButton Accessibility

> Ensure SplitButton compliance with WCAG 2.2.

---

## ARIA Attributes

```vue
<template>
  <ejs-splitbutton 
    content="Format"
    :items="items"
    aria-label="Text Formatting Options"
    aria-haspopup="true"
  ></ejs-splitbutton>
</template>

<script setup>
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: "App",
  components: {
    "ejs-splitbutton": SplitButtonComponent
  }
}

const items = [
  { text: 'Bold', icon: 'e-icons e-bold', 'aria-label': 'Make text bold' },
  { text: 'Italic', icon: 'e-icons e-italic', 'aria-label': 'Make text italic' },
  { text: 'Underline', icon: 'e-icons e-underline', 'aria-label': 'Underline text' }
];
</script>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Tab` | Focus button |
| `Enter`/`Space` | Activate primary action |
| `Alt + Down Arrow` | Open dropdown |
| `Arrow Keys` | Navigate items |
| `Esc` | Close dropdown |

```vue
<template>
  <ejs-splitbutton 
    content="Edit"
    :items="items"
  ></ejs-splitbutton>
</template>

<script setup>
import { SplitButtonComponent } from '@syncfusion/ej2-vue-splitbuttons';

export default {
  name: "App",
  components: {
    "ejs-splitbutton": SplitButtonComponent
  }
}

const items = [
  { text: 'Cut', icon: 'e-icons e-cut' },
  { text: 'Copy', icon: 'e-icons e-copy' },
  { text: 'Paste', icon: 'e-icons e-paste' }
];
</script>
```

---

## Next Steps

- Review API in [splitbutton-api.md](splitbutton-api.md)
