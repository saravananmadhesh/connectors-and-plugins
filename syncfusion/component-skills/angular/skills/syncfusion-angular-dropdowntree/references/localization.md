# Localization in Angular Dropdown Tree

The Dropdown Tree component supports comprehensive localization to adapt text, messages, and user interface elements for different cultures and languages. This enables seamless integration into multi-language applications by customizing all user-facing strings according to specific cultural requirements.

## Table of Contents

- [Localization Keys and Default Messages](#localization-keys-and-default-messages)
- [Default Locale Configuration](#default-locale-configuration)
- [Customizing Locale-Specific Strings](#customizing-locale-specific-strings)
- [noRecordsTemplate Localization](#norecordstemplate-localization)
- [actionFailureTemplate Localization](#actionfailuretemplate-localization)
- [overflowCountTemplate Localization](#overflowcounttemplate-localization)
- [totalCountTemplate Localization](#totalcounttemplate-localization)
- [Best Practices for Localization](#best-practices-for-localization)
- [Language Support Example](#language-support-example)

## Localization Keys and Default Messages

The component's default locale is `en` (English). The following table describes all localization keys and their corresponding default messages:

| Key | Default Text | Usage Context |
|-----|--------------|---------------|
| `noRecordsTemplate` | "No records found" | Displayed when no data matches filters or data source is empty |
| `actionFailureTemplate` | "Request failed" | Shown when data loading operations fail at remote server |
| `overflowCountTemplate` | "+${count} more.." | Appears when multiple items are selected and display shows summary count |
| `totalCountTemplate` | "${count} selected" | Displays total number of selected items in multi-selection scenarios |

## Default Locale Configuration

By default, the component uses English (`en`). All user-facing messages appear in English unless explicitly localized.

**Default English messages:**
```typescript
{
  noRecordsTemplate: "No records found",
  actionFailureTemplate: "Request failed",
  overflowCountTemplate: "+${count} more..",
  totalCountTemplate: "${count} selected"
}
```

## Customizing Locale-Specific Strings

You can customize individual locale strings by setting the locale culture and providing custom message values:

### Method 1: Override Specific Properties

For single component customization, directly set properties:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-localization',
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields'
                [noRecordsTemplate]='noRecordsMsg'
                [actionFailureTemplate]='actionFailureMsg'
                [showCheckBox]='true'
                [mode]='mode'
                [customTemplate]='customTemplate'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class LocalizationComponent {
  public data = [
    { id: 1, name: 'Music', hasChild: true },
    { id: 2, pid: 1, name: 'Hot Singles' }
  ];

  public fields = { dataSource: this.data, value: 'id', text: 'name', parentValue: 'pid', hasChildren: 'hasChild' };

  // Custom localized messages for Spanish
  public noRecordsMsg = '❌ No se encontraron registros';
  public actionFailureMsg = '⚠️ Error al cargar datos';
  
  // Multi-selection template in Spanish
  public mode = 'Custom';
  public customTemplate = '${value.length} elemento(s) seleccionado(s)';
}
```

**Result:** When no items match a filter, users see: `❌ No se encontraron registros` instead of English text.

### Method 2: Global Locale Configuration

For application-wide localization, define translations in a service and inject them:

```typescript
// locale.service.ts
import { Injectable } from '@angular/core';

export interface LocaleStrings {
  noRecordsTemplate: string;
  actionFailureTemplate: string;
  overflowCountTemplate: string;
  totalCountTemplate: string;
}

@Injectable({ providedIn: 'root' })
export class LocaleService {
  private locales: { [key: string]: LocaleStrings } = {
    en: {
      noRecordsTemplate: 'No records found',
      actionFailureTemplate: 'Request failed',
      overflowCountTemplate: '+${count} more..',
      totalCountTemplate: '${count} selected'
    },
    es: {
      noRecordsTemplate: 'No se encontraron registros',
      actionFailureTemplate: 'Error en la solicitud',
      overflowCountTemplate: '+${count} más..',
      totalCountTemplate: '${count} seleccionado(s)'
    },
    fr: {
      noRecordsTemplate: 'Aucun enregistrement trouvé',
      actionFailureTemplate: 'Échec de la requête',
      overflowCountTemplate: '+${count} de plus..',
      totalCountTemplate: '${count} sélectionné(s)'
    },
    de: {
      noRecordsTemplate: 'Keine Datensätze gefunden',
      actionFailureTemplate: 'Anfrage fehlgeschlagen',
      overflowCountTemplate: '+${count} weitere..',
      totalCountTemplate: '${count} ausgewählt'
    }
  };

  getLocale(culture: string): LocaleStrings {
    return this.locales[culture] || this.locales['en'];
  }
}

// app.component.ts
import { Component, OnInit } from '@angular/core';
import { LocaleService } from './locale.service';

@Component({
  selector: 'app-root',
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields'
                [noRecordsTemplate]='currentLocale.noRecordsTemplate'
                [actionFailureTemplate]='currentLocale.actionFailureTemplate'
                [customTemplate]='customTemplate'></ejs-dropdowntree>`
})
export class AppComponent implements OnInit {
  public currentLocale: any;
  public customTemplate: string;

  constructor(private localeService: LocaleService) {}

  ngOnInit() {
    // Get current user's culture (from browser, user settings, or config)
    const culture = 'es'; // Example: Spanish
    this.currentLocale = this.localeService.getLocale(culture);
    
    // Update template for multi-selection display
    if (culture === 'es') {
      this.customTemplate = '${value.length} elemento(s) seleccionado(s)';
    }
  }

  public fields = { /* ... */ };
}
```

## noRecordsTemplate Localization

This message appears when the data source is empty or no items match the current filter:

```typescript
@Component({
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields'
                [noRecordsTemplate]='getNoRecordsMessage()'></ejs-dropdowntree>`
})
export class NoRecordsComponent {
  private culture = 'es'; // Spanish example

  getNoRecordsMessage(): string {
    const messages: { [key: string]: string } = {
      en: '❌ No records found',
      es: '❌ No se encontraron registros',
      fr: '❌ Aucun enregistrement trouvé'
    };
    return messages[this.culture] || messages['en'];
  }

  public fields = { /* ... */ };
}
```

**Scenarios:**
- User performs a search that returns no results
- Data source is fetched but empty
- Initial state with no data provided

## actionFailureTemplate Localization

This message appears when remote data fetch operations fail (network errors, timeout, server errors):

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields'
                [actionFailureTemplate]='getActionFailureMessage()'></ejs-dropdowntree>`
})
export class ActionFailureComponent {
  private culture = 'fr'; // French example

  getActionFailureMessage(): string {
    const messages: { [key: string]: string } = {
      en: '⚠️ Request failed - please try again',
      es: '⚠️ La solicitud falló - por favor intente nuevamente',
      fr: '⚠️ La requête a échoué - veuillez réessayer'
    };
    return messages[this.culture] || messages['en'];
  }

  public data = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });

  public fields = { dataSource: this.data, /* ... */ };
}
```

**Scenarios:**
- Remote API unreachable
- Network timeout during data fetch
- Server returns error status
- CORS issues prevent data loading

## overflowCountTemplate Localization

This message appears when multiple items are selected but the display is limited to showing a count instead of all selected item names:

```typescript
@Component({
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields'
                [showCheckBox]='true'
                [mode]='mode'
                [customTemplate]='getCustomTemplate()'></ejs-dropdowntree>`
})
export class OverflowCountComponent {
  private culture = 'de'; // German example

  getCustomTemplate(): string {
    // Template showing overflow when too many items selected
    const templates: { [key: string]: string } = {
      en: '${value.length > 3 ? value.length + " items" : value.join(", ")}',
      es: '${value.length > 3 ? value.length + " elementos" : value.join(", ")}',
      de: '${value.length > 3 ? value.length + " Elemente" : value.join(", ")}',
      fr: '${value.length > 3 ? value.length + " éléments" : value.join(", ")}'
    };
    return templates[this.culture] || templates['en'];
  }

  public mode = 'Custom';
  public fields = { /* ... */ };
}
```

**Scenarios:**
- 3+ items selected and display space is limited
- Custom template shows count overflow message
- Tooltips can display full selected item list

## totalCountTemplate Localization

This message displays the total count of selected items when using multi-selection:

```typescript
@Component({
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields'
                [showCheckBox]='true'
                [mode]='mode'
                [customTemplate]='getTotalCountTemplate()'></ejs-dropdowntree>`
})
export class TotalCountComponent {
  private culture = 'it'; // Italian example

  getTotalCountTemplate(): string {
    const templates: { [key: string]: string } = {
      en: 'Total selected: ${value.length}',
      es: 'Total seleccionado: ${value.length}',
      it: 'Totale selezionato: ${value.length}',
      pt: 'Total selecionado: ${value.length}'
    };
    return templates[this.culture] || templates['en'];
  }

  public mode = 'Custom';
  public fields = { /* ... */ };
}
```

**Scenarios:**
- User selects multiple items with checkboxes
- Display shows running total of selected items
- Used in forms where item count is important (bulk operations, imports)

## Best Practices for Localization

1. **Centralize Translations:** Use a service or configuration file for all localization strings
2. **Match Browser/User Locale:** Detect user's preferred language from browser settings or user profile
3. **Provide Fallback:** Always fall back to English if a locale isn't available
4. **Test with RTL:** If supporting RTL languages (Arabic, Hebrew), test layout and text direction
5. **Use Locale Codes:** Follow standard locale codes (en, es, fr, de, it, pt, ja, zh, etc.)
6. **Document Translations:** Maintain clear documentation of all supported locales
7. **Update Consistently:** When adding new locales, update all template properties

## Language Support Example

```typescript
// Complete multi-language support
const SUPPORTED_LOCALES = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  ja: '日本語',
  zh: '中文'
};

// Get user's preferred locale
function getUserLocale(): string {
  const browserLang = navigator.language.split('-')[0];
  return SUPPORTED_LOCALES[browserLang] ? browserLang : 'en';
}
```
