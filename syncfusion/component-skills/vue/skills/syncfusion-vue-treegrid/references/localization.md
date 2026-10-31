# Localization

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Basic Localization Setup](#basic-localization-setup)
- [Language Switching](#language-switching)
- [TreeGrid Localization Keys](#treegrid-localization-keys)
- [Pager Localization Keys](#pager-localization-keys)
- [Localize Dependent Components](#localize-dependent-components)
- [Internationalization - Number/Date Formatting](#internationalization---numberdate-formatting)
- [Supported Locales](#supported-locales)

## When to Use

Use localization when you need to:
- **Multi-language support** - Display UI text in different languages
- **Global applications** - Support users from different regions
- **Locale-specific text** - Buttons, messages, validation errors in local language
- **Currency formatting** - Show prices in region's currency (EUR, GBP, JPY, etc.)
- **Date formatting** - Display dates in regional format (DD/MM/YYYY vs MM/DD/YYYY)
- **Number formatting** - Show numbers with correct separators and decimals
- **Arabic/Farsi/Urdu** - Right-to-left language support with RTL mode
- **German/French/Spanish** - European language translations
- **Cultural preferences** - Time zones, calendars, sorting rules
- **Accessibility** - Screen readers read translated text

## Mandatory Rules

Before implementing localization:
- ✓ **Import L10n class** - Use `import { L10n, setCulture } from '@syncfusion/ej2-base'`
- ✓ **Set locale property** - `:locale="'de-DE'"` on TreeGrid component
- ✓ **Call setCulture()** - `setCulture('de-DE')` before L10n.load()
- ✓ **Load translations** - Use `L10n.load()` with locale object
- ✓ **Treegrid keys** - Include treegrid translations in L10n.load()
- ✓ **Dependent components** - Localize DatePicker, Form Validator, Grid keys
- ✓ **CLDR data** - Import when using internationalization for numbers/dates
- ✓ **camelCase field names** - Use camelCase in locale keys (treegrid, pager, etc.)

## Basic Localization Setup

Translate TreeGrid UI to another language:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data"
    :locale="currentLocale"
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :pageSettings="pageSettings"
    :allowFiltering="true"
    :filterSettings="filterSettings"
    :toolbar="toolbar">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { Page, Toolbar, Filter } from '@syncfusion/ej2-vue-treegrid';

const currentLocale = ref('de-DE');

// Set culture globally
setCulture('de-DE');

// Load German translations
L10n.load({
  'de-DE': {
    'treegrid': {
      'EmptyRecord': 'Keine Aufzeichnungen angezeigt',
      'Expand All': 'Alle erweitern',
      'Collapse All': 'Alles einklappen',
      'Print': 'Drucken',
      'Pdfexport': 'PDF-Export',
      'Excelexport': 'Excel-Export',
      'Wordexport': 'Word-Export',
      'FilterButton': 'Filter',
      'ClearButton': 'Löschen',
      'StartsWith': 'Beginnt mit',
      'EndsWith': 'Endet mit',
      'Contains': 'Enthält',
      'Equal': 'Gleich',
      'NotEqual': 'Nicht gleich',
      'LessThan': 'Weniger als',
      'LessThanOrEqual': 'Weniger als oder gleich',
      'GreaterThan': 'Größer als',
      'GreaterThanOrEqual': 'Größer als oder gleich',
      'EnterValue': 'Geben Sie den Wert ein'
    },
    'pager': {
      'currentPageInfo': '{0} von {1} Seiten',
      'totalItemsInfo': '({0} Beiträge)',
      'firstPageTooltip': 'Zur ersten Seite',
      'lastPageTooltip': 'Zur letzten Seite',
      'nextPageTooltip': 'Zur nächsten Seite',
      'previousPageTooltip': 'Zurück zur letzten Seite'
    }
  }
});

const data = ref([...]);
const pageSettings = ref({ pageSize: 7 });
const filterSettings = ref({ type: 'Menu' });
const toolbar = ref(['Print']);

provide('treegrid', [Page, Toolbar, Filter]);
</script>
```

## Language Switching

Switch between languages dynamically:

```vue
<template>
  <div>
    <div style="margin-bottom: 20px;">
      <label>Select Language:</label>
      <select v-model="selectedLanguage" @change="changeLanguage">
        <option value="en-US">English</option>
        <option value="de-DE">Deutsch</option>
        <option value="fr-FR">Français</option>
        <option value="es-ES">Español</option>
      </select>
    </div>
    
    <ejs-treegrid 
      ref="gridInstance"
      :dataSource="data"
      :locale="selectedLanguage"
      childMapping="subtasks"
      :treeColumnIndex="1"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :allowFiltering="true"
      :filterSettings="filterSettings"
      :toolbar="toolbar">
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { Page, Toolbar, Filter } from '@syncfusion/ej2-vue-treegrid';

const gridInstance = ref(null);
const selectedLanguage = ref('en-US');
const data = ref([...]);

// Setup translations for multiple languages
L10n.load({
  'de-DE': {
    'treegrid': {
      'EmptyRecord': 'Keine Aufzeichnungen angezeigt',
      'Print': 'Drucken',
      'FilterButton': 'Filter',
      'ClearButton': 'Löschen'
    },
    'pager': {
      'currentPageInfo': '{0} von {1} Seiten',
      'totalItemsInfo': '({0} Beiträge)'
    }
  },
  'fr-FR': {
    'treegrid': {
      'EmptyRecord': 'Aucun enregistrement à afficher',
      'Print': 'Imprimer',
      'FilterButton': 'Filtre',
      'ClearButton': 'Effacer'
    },
    'pager': {
      'currentPageInfo': '{0} sur {1} pages',
      'totalItemsInfo': '({0} articles)'
    }
  },
  'es-ES': {
    'treegrid': {
      'EmptyRecord': 'No hay registros para mostrar',
      'Print': 'Imprimir',
      'FilterButton': 'Filtrar',
      'ClearButton': 'Limpiar'
    },
    'pager': {
      'currentPageInfo': '{0} de {1} páginas',
      'totalItemsInfo': '({0} elementos)'
    }
  }
});

const changeLanguage = () => {
  setCulture(selectedLanguage.value);
  gridInstance.value.ej2Instances.locale = selectedLanguage.value;
  gridInstance.value.ej2Instances.refresh();
};

const pageSettings = ref({ pageSize: 7 });
const filterSettings = ref({ type: 'Menu' });
const toolbar = ref(['Print']);

provide('treegrid', [Page, Toolbar, Filter]);
</script>
```

## TreeGrid Localization Keys

Complete list of translatable TreeGrid keys:

| Key | Default English Value |
|-----|----------------------|
| `EmptyRecord` | No records to display |
| `True` | true |
| `False` | false |
| `ExpandAll` | Expand All |
| `CollapseAll` | Collapse All |
| `RowIndent` | Indent |
| `RowOutdent` | Outdent |
| `InvalidFilterMessage` | Invalid Filter Data |
| `Add` | Add |
| `Edit` | Edit |
| `Cancel` | Cancel |
| `Update` | Update |
| `Delete` | Delete |
| `Print` | Print |
| `Pdfexport` | PDF Export |
| `Excelexport` | Excel Export |
| `Wordexport` | Word Export |
| `Csvexport` | CSV Export |
| `Search` | Search |
| `Save` | Save |
| `EditOperationAlert` | No records selected for edit operation |
| `DeleteOperationAlert` | No records selected for delete operation |
| `SaveButton` | Save |
| `OKButton` | OK |
| `CancelButton` | Cancel |
| `EditFormTitle` | Details of |
| `AddFormTitle` | Add New Record |
| `ConfirmDelete` | Are you sure you want to Delete Record? |
| `SearchColumns` | search columns |
| `Matchs` | No Matches Found |
| `FilterButton` | Filter |
| `ClearButton` | Clear |
| `StartsWith` | Starts With |
| `EndsWith` | Ends With |
| `Contains` | Contains |
| `Equal` | Equal |
| `NotEqual` | Not Equal |
| `LessThan` | Less Than |
| `LessThanOrEqual` | Less Than Or Equal |
| `GreaterThan` | Greater Than |
| `GreaterThanOrEqual` | Greater Than Or Equal |
| `SortAscending` | Sort Ascending |
| `SortDescending` | Sort Descending |
| `EditRecord` | Edit Record |
| `DeleteRecord` | Delete Record |
| `FilterMenu` | Filter |
| `SelectAll` | Select All |

## Pager Localization Keys

| Key | Default English Value |
|-----|----------------------|
| `currentPageInfo` | {0} of {1} pages |
| `totalItemsInfo` | ({0} items) |
| `firstPageTooltip` | Go to first page |
| `lastPageTooltip` | Go to last page |
| `nextPageTooltip` | Go to next page |
| `previousPageTooltip` | Go to previous page |
| `nextPagerTooltip` | Go to next pager |
| `previousPagerTooltip` | Go to previous pager |
| `pagerDropDown` | Items per page |
| `pagerAllDropDown` | Items |
| `All` | All |

## Localize Dependent Components

When localizing TreeGrid, also translate dependent components:

```vue
<script setup>
import { L10n, setCulture } from '@syncfusion/ej2-base';

setCulture('de-DE');

L10n.load({
  'de-DE': {
    // TreeGrid localization
    'treegrid': {
      'EmptyRecord': 'Keine Aufzeichnungen angezeigt',
      'Print': 'Drucken',
      'FilterButton': 'Filter'
    },
    
    // Pager localization
    'pager': {
      'currentPageInfo': '{0} von {1} Seiten',
      'totalItemsInfo': '({0} Beiträge)'
    },
    
    // DatePicker localization (for date columns)
    'datepicker': {
      'placeholder': 'Wählen Sie ein Datum',
      'today': 'Heute'
    },
    
    // Form Validator localization (for validation messages)
    'formValidator': {
      'required': 'Dieses Feld ist erforderlich',
      'email': 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
      'minLength': 'Bitte geben Sie mindestens {0} Zeichen ein'
    },
    
    // Grid localization (for filter/export)
    'grid': {
      'True': 'Wahr',
      'False': 'Falsch',
      'Item': 'Element',
      'Items': 'Elemente'
    }
  }
});
</script>
```

## Internationalization - Number/Date Formatting

Format numbers, dates, and currencies based on culture:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data"
    :locale="currentLocale"
    childMapping="subtasks"
    :treeColumnIndex="1"
    :allowPaging="true"
    :pageSettings="pageSettings">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>
      <e-column field="taskName" headerText="Task Name" width=160></e-column>
      <!-- Date format follows German format (DD.MM.YYYY) -->
      <e-column field="startDate" headerText="Start Date" format="yMd" width=90></e-column>
      <!-- Currency format: EUR with German number formatting -->
      <e-column 
        field="price" 
        headerText="Price" 
        :format="priceFormat" 
        width=100 
        textAlign="Right">
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { L10n, setCulture, setCurrencyCode } from '@syncfusion/ej2-base';
import * as currencies from './currencies.json';
import * as cagregorian from './ca-gregorian.json';
import * as numbers from './numbers.json';
import * as timeZoneNames from './timeZoneNames.json';
import * as numberingSystems from './numberingSystems.json';
import { Page } from '@syncfusion/ej2-vue-treegrid';

const currentLocale = ref('de-DE');

// Load CLDR data for German culture
import { loadCldr } from '@syncfusion/ej2-base';
loadCldr(currencies, cagregorian, numbers, timeZoneNames, numberingSystems);

// Set culture and currency
setCulture('de-DE');
setCurrencyCode('EUR');

// Format options for price column
const priceFormat = ref({
  format: 'C2',  // Currency with 2 decimals
  useGrouping: false,
  minimumSignificantDigits: 1,
  maximumSignificantDigits: 3,
  currency: 'EUR'
});

L10n.load({
  'de-DE': {
    'treegrid': {
      'EmptyRecord': 'Keine Aufzeichnungen angezeigt'
    }
  }
});

const data = ref([
  { taskID: 1, taskName: 'Task 1', startDate: new Date(2024, 0, 15), price: 1234.56 },
  { taskID: 2, taskName: 'Task 2', startDate: new Date(2024, 1, 20), price: 2345.67 }
]);

const pageSettings = ref({ pageSize: 7 });

provide('treegrid', [Page]);
</script>
```

## Supported Locales

Common locales supported by Syncfusion (format: language-Country):

| Locale | Language |
|--------|----------|
| `en-US` | English (United States) |
| `en-GB` | English (Great Britain) |
| `de-DE` | German |
| `de-AT` | German (Austria) |
| `de-CH` | German (Switzerland) |
| `fr-FR` | French |
| `fr-BE` | French (Belgium) |
| `es-ES` | Spanish |
| `es-MX` | Spanish (Mexico) |
| `it-IT` | Italian |
| `ja-JP` | Japanese |
| `zh-CN` | Chinese (Simplified) |
| `zh-TW` | Chinese (Traditional) |
| `ar-AE` | Arabic (UAE) |
| `ar-SA` | Arabic (Saudi Arabia) |
| `he-IL` | Hebrew (Israel) |
| `ru-RU` | Russian |
| `pt-BR` | Portuguese (Brazil) |
| `pt-PT` | Portuguese (Portugal) |
| `tr-TR` | Turkish |
| `ko-KR` | Korean |
| `th-TH` | Thai |
| `vi-VN` | Vietnamese |
