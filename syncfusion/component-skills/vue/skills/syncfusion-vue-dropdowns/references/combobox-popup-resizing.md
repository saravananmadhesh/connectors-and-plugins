# Popup Resizing – Syncfusion Vue 3 ComboBox

## Enable Popup Resizing

```vue
<template>
  <ejs-combobox
    :dataSource="countries"
    :allowResize="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

---

## Preset Popup Size

```vue
<template>
  <ejs-combobox
    :dataSource="countries"
    :popupHeight="'400px'"
    :popupWidth="'350px'"
    :allowResize="true"
  />
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

---

## Performance Tips

- Use `:allowResize="true"` for better UX with large dropdowns
- Set reasonable initial sizes with `:popupHeight` and `:popupWidth`
- Users can resize popup manually when enabled

---

## Next Steps

- For data binding, read `references/combobox-data-binding.md`
- For styling, read `references/combobox-styling-and-theming.md`
- For API reference, read `references/combobox-api.md`
