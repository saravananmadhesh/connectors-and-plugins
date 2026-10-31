# Globalization & Localization (Vue 3)

## Table of Contents
- [Locale Configuration](#locale-configuration)
- [Supported Locales](#supported-locales)
- [Custom Localization](#custom-localization)
- [RTL Support](#rtl-support)

---

## Locale Configuration

Set the locale for your DatePicker:

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    :locale="locale"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

// German locale
const locale = ref('de');
const selectedDate = ref(new Date());
</script>
```

---

## Supported Locales

Syncfusion supports 100+ locales. Common examples:

| Code | Language | Code | Language |
|------|----------|------|----------|
| en | English | es | Spanish |
| de | German | fr | French |
| it | Italian | pt | Portuguese |
| ja | Japanese | zh | Chinese |
| ar | Arabic | hi | Hindi |
| ru | Russian | ko | Korean |

### Example: Multiple Locales

```vue
<template>
  <div style="padding: 20px">
    <label>Select Language:</label>
    <select v-model="selectedLocale">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="de">Deutsch</option>
      <option value="fr">Français</option>
      <option value="ja">日本語</option>
      <option value="ar">العربية</option>
    </select>
    
    <div style="margin-top: 20px">
      <ejs-datepicker
        :value="selectedDate"
        :locale="selectedLocale"
      ></ejs-datepicker>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedLocale = ref('en');
const selectedDate = ref(new Date());
</script>
```

---

## Custom Localization

Create custom locale strings:

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    :locale="'custom'"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent, registerLocale } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

// Register custom locale
registerLocale('custom', {
  today: 'Hoy',
  placeholder: 'Seleccionar fecha',
  dayHeader: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles',
    'Jueves', 'Viernes', 'Sábado'
  ],
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesFull: [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
});
</script>
```

---

## RTL Support

Enable Right-to-Left layout for RTL languages:

### Global RTL

```vue
<template>
  <div dir="rtl">
    <ejs-datepicker
      :value="selectedDate"
      :locale="'ar'"
      :enableRtl="true"
    ></ejs-datepicker>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { DatePickerComponent, enableRtl } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());

onMounted(() => {
  // Enable RTL globally for all Syncfusion components
  enableRtl(true);
});
</script>
```

### Component-Level RTL

```vue
<template>
  <ejs-datepicker
    :value="selectedDate"
    :locale="'ar'"
    :enableRtl="true"
  ></ejs-datepicker>
</template>

<script setup>
import { ref } from 'vue';
import { DatePickerComponent } from '@syncfusion/ej2-vue-calendars';

const selectedDate = ref(new Date());
</script>

<style scoped>
.rtl-container {
  direction: rtl;
  text-align: right;
}

.rtl-container :deep(.e-datepicker) {
  direction: rtl;
}
</style>
```

---

## Best Practices

1. ✅ Match locale to user's browser language when possible
2. ✅ Allow users to manually select their locale
3. ✅ Store locale preference in user settings
4. ✅ Test with RTL and LTR languages
5. ✅ Ensure sufficient localization coverage
6. ✅ Use locale-specific date formats
7. ✅ Consider cultural date interpretation differences

---

## Next Steps

- For accessibility, read `references/datepicker-accessibility-and-keyboard.md`.
- For customization, read `references/datepicker-customization-and-styling.md`.
- For API reference, read `references/datepicker-api-reference.md`.
