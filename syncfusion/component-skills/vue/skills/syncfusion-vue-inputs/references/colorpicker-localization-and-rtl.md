# Localization and RTL — Syncfusion Vue ColorPicker

## Table of Contents
- [Localization Overview](#localization-overview)
- [Enable RTL](#enable-rtl)
- [Custom Locale Strings](#custom-locale-strings)
- [Combining Localization with RTL](#combining-localization-with-rtl)
- [Common Locale Values](#common-locale-values)

---

## Localization Overview

The ColorPicker supports multiple languages through locale configuration. Default strings (button labels, tooltips) adapt automatically.

---

## Enable RTL

Set `:enable-rtl="true"` to render right-to-left:

```vue
<template>
  <div>
    <ejs-colorpicker
      :enable-rtl="true"
      :show-buttons="true"
      value="#ff0000">
    </ejs-colorpicker>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  }
}
</script>
```

---

## Custom Locale Strings

Override default strings using the `locale-data` object:

```vue
<template>
  <div>
    <ejs-colorpicker
      :show-buttons="true"
      locale="ar"
      value="#ff0000">
    </ejs-colorpicker>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';
import { L10n } from '@syncfusion/ej2-base';

// Define custom locale strings
L10n.load({
  'ar': {
    'colorpicker': {
      'Apply': 'تطبيق',
      'Cancel': 'إلغاء',
      'ModeSwitcher': 'تبديل الوضع',
      'Palette': 'لوحة الألوان',
      'Gradient': 'تدرج',
      'InputLabel': 'إدخال اللون',
      'Hex': 'سادس عشر',
      'Rgb': 'RGB'
    }
  }
});

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  }
}
</script>
```

---

## Combining Localization with RTL

Use both locale and RTL together for full right-to-left support:

```vue
<template>
  <div>
    <h3>Arabic Color Picker (RTL)</h3>
    <ejs-colorpicker
      :enable-rtl="true"
      :show-buttons="true"
      locale="ar"
      value="#ff0000">
    </ejs-colorpicker>

    <h3>Hebrew Color Picker (RTL)</h3>
    <ejs-colorpicker
      :enable-rtl="true"
      :show-buttons="true"
      locale="he"
      value="#00ff00">
    </ejs-colorpicker>
  </div>
</template>

<script>
import { ColorPickerComponent } from '@syncfusion/ej2-vue-inputs';
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'ar': {
    'colorpicker': {
      'Apply': 'تطبيق',
      'Cancel': 'إلغاء'
    }
  },
  'he': {
    'colorpicker': {
      'Apply': 'החל',
      'Cancel': 'ביטול'
    }
  }
});

export default {
  components: {
    'ejs-colorpicker': ColorPickerComponent
  }
}
</script>
```

---

## Common Locale Values

| Locale Code | Language |
|---|---|
| `en` | English (default) |
| `ar` | Arabic |
| `he` | Hebrew |
| `es` | Spanish |
| `fr` | French |
| `de` | German |
| `it` | Italian |
| `ja` | Japanese |
| `zh` | Chinese |
| `ko` | Korean |
| `pt` | Portuguese |
| `ru` | Russian |

**Best Practices:**
- Always specify locale explicitly in production
- Test with multiple locales before deployment
- Verify RTL rendering with native speakers
- Ensure font supports all language characters
- Consider text expansion when translating UI strings
