# API Reference – Syncfusion Vue 3 AutoComplete

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `:dataSource` | Array | [] | Data array to bind |
| `:value` | string \| number \| object | null | Selected value |
| `:fields` | Object | {} | Field mapping (text, value, etc.) |
| `:placeholder` | string | "" | Placeholder text |
| `:popupHeight` | string | "300px" | Dropdown height |
| `:popupWidth` | string | "auto" | Dropdown width |
| `:minLength` | number | 1 | Min chars before filtering |
| `:suggestionCount` | number | 20 | Max suggestions to show |
| `:filterType` | string | "StartsWith" | Filter type (StartsWith, EndsWith, Contains) |
| `:ignoreCase` | boolean | true | Case-insensitive filtering |
| `:ignoreAccent` | boolean | false | Ignore diacritics |
| `:debounceDelay` | number | 300 | Delay before filtering (ms) |
| `:autofill` | boolean | false | Auto-fill first match |
| `:highlight` | boolean | false | Highlight matching text |
| `:enabled` | boolean | true | Enable component |
| `:readonly` | boolean | false | Read-only mode |
| `:cssClass` | string | "" | Custom CSS class |
| `:enableVirtualization` | boolean | false | Enable virtual scrolling |
| `:enableRtl` | boolean | false | Enable RTL |
| `:locale` | string | "en" | Locale for text |

---

## Events

| Event | Args | Description |
|-------|------|-------------|
| `@change` | ChangeEventArgs | Fired when value changes |
| `@filtering` | FilteringEventArgs | Fired during filtering |
| `@created` | Object | Fired when component created |
| `@destroyed` | Object | Fired when component destroyed |
| `@focus` | FocusEventArgs | Fired when input focused |
| `@blur` | BlurEventArgs | Fired when input loses focus |
| `@select` | SelectEventArgs | Fired when item selected |

---

## Methods (via Template Ref)

| Method | Args | Returns | Description |
|--------|------|---------|-------------|
| `show()` | - | void | Show dropdown |
| `hide()` | - | void | Hide dropdown |
| `focus()` | - | void | Set focus to input |
| `blur()` | - | void | Remove focus from input |
| `destroy()` | - | void | Destroy component |
| `setProperties()` | props: Object | void | Update properties |

---

## Usage Example

```vue
<template>
  <ejs-autocomplete
    ref="autoCompleteRef"
    :dataSource="countries"
    :fields="{ text: 'name', value: 'code' }"
    :value="selectedCountry"
    :minLength="1"
    :suggestionCount="10"
    :highlight="true"
    @change="onCountryChange"
    @created="onCreated"
  />
  
  <button @click="showDropdown">Show</button>
  <button @click="hideDropdown">Hide</button>
</template>

<script setup>
import { ref } from 'vue';
import { AutoCompleteComponent } from '@syncfusion/ej2-vue-dropdowns';

const autoCompleteRef = ref(null);
const selectedCountry = ref('');
const countries = ref([...]);

const onCountryChange = (args) => {
  selectedCountry.value = args.value;
};

const onCreated = (args) => {
  console.log('AutoComplete created');
};

const showDropdown = () => {
  autoCompleteRef.value?.show();
};

const hideDropdown = () => {
  autoCompleteRef.value?.hide();
};
</script>
```

---

## Related Components

- ComboBox
- DropdownList
- MultiSelect
- ListBox

---

## See Also

- [Getting Started](autocomplete-getting-started.md)
- [Data Binding](autocomplete-data-binding.md)
- [Filtering](autocomplete-filtering.md)
- [Templates](autocomplete-templates.md)
- [Styling](autocomplete-styling.md)
