---
name: Globalization
description: 'Globalization in Syncfusion Angular TreeGrid - localization and locale support, RTL enablement, custom translations, and culture-specific formatting.'
---

# Globalization

Globalization provides localization, RTL support, and culture-specific formatting for international use.

## When to Use

Use globalization features when you need to:
- **Multi-language support** — Display UI in different languages
- **RTL languages** — Support Arabic, Hebrew, Persian
- **Culture-specific formatting** — Format dates, numbers by locale
- **International apps** — Adapt for global audience
- **Custom translations** — Add domain-specific language packs
- **Date/time formatting** — Show dates in user's locale format
- **Currency display** — Show currency symbols and formatting by region

## Table of Contents
- [Locale Configuration](#locale-configuration)
- [RTL Support](#rtl-support)
- [Custom Localization](#custom-localization)

## Locale Configuration

### Set Locale

```typescript
import { Component } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      locale='fa-AF'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  constructor() {
    L10n.load({
      'fa-AF': {
        'treegrid': {
          'Add': 'اضافہ',
          'Delete': 'حذف',
          'Edit': 'ترمیم'
        }
      }
    });
  }

  public data: Object[] = [];
  public childMapping: string = 'subtasks';
}
```

## RTL Support

### Enable RTL

```typescript
<ejs-treegrid 
  [dataSource]='data'
  [childMapping]='childMapping'
  [enableRtl]='true'>
  <e-columns>
    <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
    <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
  </e-columns>
</ejs-treegrid>
```

## Custom Localization

### Define Custom Translations

```typescript
L10n.load({
  'en': {
    'treegrid': {
      'Add': 'New Task',
      'Edit': 'Modify',
      'Delete': 'Remove',
      'Save': 'Apply',
      'Cancel': 'Discard',
      'Search': 'Find Tasks'
    }
  }
});
```

### Regional Date Format

```typescript
<e-column 
  field='StartDate' 
  headerText='Start Date' 
  type='date' 
  format='long'>
</e-column>
```
