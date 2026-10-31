# ProgressButton How-To: Content Template

> Customize ProgressButton content and display.

---

## Dynamic Content

Update content during progress:

```vue
<template>
  <ejs-progressbutton 
    :content="buttonLabel"
    :duration="3000"
    @begin="onBegin"
    @end="onEnd"
  ></ejs-progressbutton>
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

const buttonLabel = ref('Upload');

const onBegin = () => {
  buttonLabel.value = 'Uploading...';
};

const onEnd = () => {
  buttonLabel.value = 'Upload Complete';
};
</script>
```

## Icon with Content

```vue
<template>
  <ejs-progressbutton 
    content="Download File"
    iconCss="e-download"
    :duration="3000"
  ></ejs-progressbutton>
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

## Related

- [progressbutton-style-and-appearance.md](progressbutton-style-and-appearance.md)
