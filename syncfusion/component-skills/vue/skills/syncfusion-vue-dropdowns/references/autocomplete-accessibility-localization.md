# Accessibility & Localization – Syncfusion Vue 3 AutoComplete

## WCAG 2.2 Compliance

```vue
<template>
  <div>
    <label for="autocomplete-id" class="block mb-2">
      Select Country <span class="text-red-500">*</span>
    </label>
    <ejs-autocomplete
      id="autocomplete-id"
      :dataSource="countries"
      aria-label="Select your country"
      aria-describedby="country-hint"
      role="combobox"
      :enabled="true"
    />
    <div id="country-hint" class="text-sm text-gray-600">
      Type or select from dropdown
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const countries = ref([...]);
</script>
```

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| Arrow Down | Open popup, move to next item |
| Arrow Up | Move to previous item |
| Home | Move to first item |
| End | Move to last item |
| Enter | Select item |
| Escape | Close popup |
| Tab | Move to next field |

---

## RTL Support

Enable right-to-left language support:

```vue
<template>
  <div dir="rtl">
    <ejs-autocomplete
      :dataSource="countries"
      :enableRtl="true"
      locale="ar"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { setLocale } from '@syncfusion/ej2-base';

setLocale('ar');

const countries = ref([
  'مصر',
  'السعودية',
  'الإمارات',
  'الكويت'
]);
</script>
```

---

## Localization

Set locale for component text:

```vue
<template>
  <ejs-autocomplete
    :dataSource="countries"
    locale="de"
  />
</template>

<script setup>
import { ref } from 'vue';
import { setLocale, L10n } from '@syncfusion/ej2-base';

// Set locale
setLocale('de');

// Optional: Custom locale strings
L10n.load({
  'de': {
    'dropdowns': {
      'noRecordsTemplate': 'Keine Datensätze gefunden',
      'actionFailureTemplate': 'Fehler beim Abrufen von Daten'
    }
  }
});

const countries = ref([...]);
</script>
```

---

## Screen Reader Support

```vue
<template>
  <div role="region" aria-live="polite" aria-atomic="true">
    <label for="autocomplete">Search Country</label>
    <ejs-autocomplete
      id="autocomplete"
      :dataSource="countries"
      aria-label="Type to search countries"
      aria-describedby="search-instructions"
      @change="announceSelection"
    />
    <div id="search-instructions" class="sr-only">
      Start typing to filter countries. Use arrow keys to navigate.
    </div>
    <div v-if="selectedCountry" role="status" aria-live="assertive">
      Selected: {{ selectedCountry }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedCountry = ref('');
const countries = ref([...]);

const announceSelection = (args) => {
  selectedCountry.value = args.value;
};
</script>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
```

---

## Next Steps

- For styling, read `references/autocomplete-styling.md`
- For data binding, read `references/autocomplete-data-binding.md`
- For API reference, read `references/autocomplete-api.md`
