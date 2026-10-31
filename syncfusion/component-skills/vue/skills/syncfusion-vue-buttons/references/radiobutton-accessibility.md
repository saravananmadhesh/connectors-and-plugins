# RadioButton Accessibility

> Ensure RadioButton compliance with WCAG 2.2 accessibility standards.

---

## ARIA Attributes

Use ARIA attributes for accessibility:

```vue
<template>
  <ejs-radiobutton 
    label="Subscribe to Newsletter"
    aria-label="Subscribe to Newsletter"
    aria-describedby="newsletter-help"
  ></ejs-radiobutton>
  <small id="newsletter-help">Receive weekly updates</small>
</template>

<script setup>
import { RadioButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-radiobutton": RadioButtonComponent
  }
}
</script>
```

## Keyboard Navigation

RadioButton supports full keyboard interaction:

| Key | Action |
|-----|--------|
| `Tab` | Move focus to RadioButton |
| `Enter`/`Space` | Toggle checked state |
| `Arrow Keys` | Navigate between group items |

```vue
<template>
  <fieldset>
    <legend>Notification Preference</legend>
    <div>
      <ejs-radiobutton 
        label="Email"
        name="notify"
        value="email"
        v-model="preference"
      ></ejs-radiobutton>
    </div>
    <div>
      <ejs-radiobutton 
        label="SMS"
        name="notify"
        value="sms"
        v-model="preference"
      ></ejs-radiobutton>
    </div>
    <div>
      <ejs-radiobutton 
        label="Push"
        name="notify"
        value="push"
        v-model="preference"
      ></ejs-radiobutton>
    </div>
  </fieldset>
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

const preference = ref('email');
</script>
```

## Label Association

Labels automatically associate with RadioButton:

```vue
<template>
  <ejs-radiobutton 
    label="I agree to the terms"
    id="agree"
  ></ejs-radiobutton>
</template>

<script setup>
import { RadioButtonComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  name: "App",
  components: {
    "ejs-radiobutton": RadioButtonComponent
  }
}
</script>
```

---

## Next Steps

- Review API in [radiobutton-api.md](radiobutton-api.md)
