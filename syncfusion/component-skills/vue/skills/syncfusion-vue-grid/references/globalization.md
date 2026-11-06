# Globalization

## Table of Contents
- [When to Use](#when-to-use)
- [Locale Settings](#locale-settings)
- [Loading Translations](#loading-translations)
- [Number Formatting](#number-formatting)
- [Date Formatting](#date-formatting)
- [Internationalization](#internationalization)
- [RTL Support](#rtl-support)
- [Custom Translations](#custom-translations)
- [Practical Example](#practical-example)

## When to Use

Use this reference when you need to:
- Support multiple languages in grid UI
- Configure locale for date/number formatting
- Implement Right-to-Left (RTL) layout
- Add internationalization for grid components
- Load custom translations
- Format dates and numbers based on locale
- Support global applications with multi-language support

## Locale Settings

### Set Locale
```vue
<template>
  <div>
    <select v-model="selectedLocale" @change="changeLocale">
      <option value="en">English</option>
      <option value="de">German</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="ar">Arabic</option>
    </select>
    
    <ejs-grid 
      :dataSource="data"
      :locale="selectedLocale">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
        <e-column field="Freight" headerText="Freight" format="C2" width="100"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { GridComponent as EjsGrid } from "@syncfusion/ej2-vue-grids";
import { L10n, setCulture } from '@syncfusion/ej2-base';

const selectedLocale = ref('en');

const changeLocale = () => {
  setCulture(selectedLocale.value);
};
</script>
```

### Supported Locales
- `en` - English
- `de` - German (Deutsch)
- `es` - Spanish (Español)
- `fr` - French (Français)
- `ar` - Arabic (العربية)
- `zh` - Chinese (中文)
- `ja` - Japanese (日本語)
- And 50+ more

## Loading Translations

### Load Translations for Deutsch (German)
```vue
<template>
  <ejs-grid :dataSource="data" locale="de-DE" :allowGrouping="true" :allowPaging="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" textAlign="Right" width="90"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="100"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { L10n } from '@syncfusion/ej2-base';
import deDELocalization from './locale-de.json';

L10n.load(deDELocalization);
</script>
```

### Load Translations for French
```vue
<script setup>
import { L10n } from '@syncfusion/ej2-base';
import frFRLocalization from './locale-fr.json';

L10n.load(frFRLocalization);

// Now use fr-FR locale in grid
const locale = 'fr-FR';
const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
</script>
```

### Switch Localization Dynamically
```vue
<template>
  <div>
    <button @click="changeFrLocale">Change to FR Locale</button>
    <button @click="changeEnLocale">Change to EN Locale</button>
    
    <ejs-grid :dataSou

## Internationalization

### Format Number and Date by Culture
Use CLDR data to format numbers and dates based on locale:

```vue
<template>
  <ejs-grid :dataSource="data">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
      <e-column field="Freight" headerText="Freight" :format="formatOptions" textAlign="Right" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { L10n, loadCldr, setCulture, setCurrencyCode } from '@syncfusion/ej2-base';
import cagregorian from './ca-gregorian.json';
import currencies from './currencies.json';
import numbers from './numbers.json';
import timeZoneNames from './timeZoneNames.json';
import numberingSystems from './numberingSystems.json';
import deDELocalization from './locale-de.json';

setCulture('de-DE');
setCurrencyCode('EUR');
L10n.load(deDELocalization);

loadCldr(
  cagregorian,
  currencies,
  numbers,
  timeZoneNames,
  numberingSystems
);

const formatOptions = {
  format: 'C2',
  useGrouping: false,
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3
};
</script>
```

### Number Format Options
```javascript
const formatOptions = {
  format: 'C2',  // Currency with 2 decimal places
  useGrouping: true,  // Use thousand separator
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3
};
```rce="data" height="220px">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" textAlign="Right" width="90"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="100"></e-column>
        <e-column field="Freight" headerText="Freight" format="C2" width="90"></e-column>
      </e-columns>
    </ejs-grid>
  </div>
</template>

<script setup>
import { setCulture, setCurrencyCode, L10n } from '@syncfusion/ej2-base';
import frFRLocalization from './locale-fr.json';

L10n.load(frFRLocalization);

const changeFrLocale = () => {
  setCulture('fr-FR');  // Change Grid culture to French
  setCurrencyCode('EUR');  // Change currency code for French
};

const changeEnLocale = () => {
  setCulture('en-US');  // Change Grid culture to English
  setCurrencyCode('USD');  // Change currency code for English
};
</script>
```

## Number Formatting

### Currency Format
```vue
<e-column 
  field="Freight" 
  headerText="Freight" 
  format="C2"
  type="number"
  width="100">
</e-column>
```

### Locale-specific Currency
```javascript
// Set culture for currency formatting
setCulture('de');  // German - €
setCulture('en');  // English - $
setCulture('fr');  // French - €
setCulture('ja');  // Japanese - ¥
```

### Number Formats
```vue
<e-column field="Amount" format="N2" width="100"></e-column>  <!-- 1,234.56 -->
<e-column field="Percent" format="P" width="100"></e-column>  <!-- 50% -->
<e-column field="Scientific" format="e" width="100"></e-column>  <!-- 1.23e+2 -->
```

## Date Formatting

### Date Format Codes
```vue
<e-column field="OrderDate" type="date" format="yMd" width="130"></e-column>   <!-- 3/15/2023 -->
<e-column field="OrderDate" type="date" format="MMM d, y" width="140"></e-column>  <!-- Mar 15, 2023 -->
<e-column field="OrderDate" type="date" format="dd/MM/yyyy" width="130"></e-column>  <!-- 15/03/2023 -->
<e-column field="OrderDate" type="date" format="MMMM d, yyyy" width="150"></e-column>  <!-- March 15, 2023 -->
```

### Locale-specific Dates
Date format automatically adjusts based on locale:
- German: `15.03.2023`
- English: `3/15/2023`
- French: `15/03/2023`

## RTL Support

### Enable RTL
```vue
<template>
  <ejs-grid 
    :dataSource="data"
    :locale="'ar'"
    :enableRtl="true">
    <e-columns>
      <e-column field="OrderID" headerText="رقم الطلب" width="100"></e-column>
      <e-column field="CustomerID" headerText="معرّف العميل" width="120"></e-column>
      <e-column field="Freight" headerText="الشحن" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { setCulture } from '@syncfusion/ej2-base';

setCulture('ar');  // Set to Arabic
</script>
```

### Supported RTL Languages
- Arabic (ar)
- Hebrew (he)
- Persian (fa)
- Urdu (ur)

## Custom Translations

### Define Custom Locale Strings
```vue
<script setup>
import { L10n } from '@syncfusion/ej2-base';

// Add custom locale
L10n.load({
  'en': {
    'grid': {
      'Add': 'Create',
      'Edit': 'Modify',
      'Delete': 'Remove',
      'Cancel': 'Discard',
      'Update': 'Save Changes'
    }
  }
});
</script>
```

### Multi-language Support
```javascript
L10n.load({
  'es': {
    'grid': {
      'Add': 'Agregar',
      'Edit': 'Editar',
      'Delete': 'Eliminar'
    }
  },
  'de': {
    'grid': {
      'Add': 'Hinzufügen',
      'Edit': 'Bearbeiten',
      'Delete': 'Löschen'
    }
  }
});
```

## Practical Example

```vue
<template>
  <div class="locale-selector">
    <label>Select Language:</label>
    <select v-model="currentLocale" @change="updateLocale">
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="ar">العربية (RTL)</option>
    </select>
  </div>
  
  <ejs-grid 
    :dataSource="data"
    :locale="currentLocale"
    :enableRtl="isRTL">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-column>
      <e-column field="Freight" headerText="Freight" format="C2" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref, computed } from 'vue';
import { setCulture } from '@syncfusion/ej2-base';

const currentLocale = ref('en');

const isRTL = computed(() => {
  return ['ar', 'he', 'fa', 'ur'].includes(currentLocale.value);
});

const updateLocale = () => {
  setCulture(currentLocale.value);
};
</script>
```
