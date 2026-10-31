# Accessibility in Angular MultiColumn ComboBox

## Table of Contents
- [Overview](#overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Localization](#localization)

## Overview

The Syncfusion Angular MultiColumn ComboBox is built to WCAG 2.2 and Section 508 standards. All major accessibility features are supported out of the box:

| Feature | Support |
|---------|---------|
| WCAG 2.2 | ✅ Full Support |
| Section 508 | ✅ Full Support |
| Screen Reader | ✅ Full Support |
| Right-to-Left | ✅ Full Support |
| Color Contrast | ✅ Full Support |
| Mobile | ✅ Full Support |
| Keyboard Navigation | ✅ Full Support |

## WAI-ARIA Attributes

The component uses the following WAI-ARIA attributes automatically:

| Attribute | Usage |
|-----------|-------|
| `role=combobox` | Applied to the input container |
| `aria-expanded` | `true` when popup is open, `false` when closed |
| `aria-selected` | `true` on the currently selected item row |
| `aria-readonly` | Set when `[readonly]='true'` |
| `aria-disabled` | Set when `[disabled]='true'` |
| `aria-owns` | References the popup list ID |

No additional configuration is needed — these are applied automatically by the component.

## Keyboard Navigation

The MultiColumn ComboBox supports full keyboard operation without a mouse:

| Shortcut | Action |
|----------|--------|
| `Enter` | Select the focused item / open popup |
| `Escape` | Close the popup |
| `Alt + Down Arrow` | Open the popup |
| `Alt + Up Arrow` | Close the popup |
| `Arrow Down` | Move focus to next item in popup |
| `Arrow Up` | Move focus to previous item in popup |
| `Home` | Move focus to first item |
| `End` | Move focus to last item |
| `Tab` | Move to next focusable element (closes popup) |
| `Shift + Tab` | Move to previous focusable element |
| `Ctrl + Click` | Multi-column sort (when `sortType='MultipleColumns'`) |

## Right-to-Left (RTL) Support

Enable RTL layout with the `enableRtl` property:

```typescript
import { Component } from '@angular/core';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';

@Component({
  imports: [MultiColumnComboBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-multicolumncombobox
      id='multicolumn'
      [dataSource]='empData'
      [fields]='fields'
      [placeholder]='waterMark'
      [enableRtl]='true'>
      <e-columns>
        <e-column field='EmpID' header='Employee ID' width='100'></e-column>
        <e-column field='Name' header='Name' width='90'></e-column>
        <e-column field='Designation' header='Designation' width='100'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public empData: Object[] = [
    { EmpID: 1001, Name: 'Andrew Fuller', Designation: 'Team Lead' },
    { EmpID: 1002, Name: 'Robert', Designation: 'Developer' }
  ];
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Select an employee';
}
```

When `enableRtl` is `true`:
- The popup opens from the right
- Text and columns are rendered right-to-left
- Icons and arrows are mirrored

## Localization

Use the `locale` property with `L10n.load()` to translate built-in text strings such as the "No Records" message.

```typescript
import { Component, OnInit } from '@angular/core';
import { MultiColumnComboBoxModule } from '@syncfusion/ej2-angular-multicolumn-combobox';
import { L10n } from '@syncfusion/ej2-base';

// Load locale translations before component renders
L10n.load({
  'de': {
    'multicolumncombobox': {
      noRecordsTemplate: 'Keine Aufzeichnungen gefunden'
    }
  }
});

@Component({
  imports: [MultiColumnComboBoxModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-multicolumncombobox
      id='multicolumn'
      [dataSource]='empData'
      [fields]='fields'
      [placeholder]='waterMark'
      locale='de'>
      <e-columns>
        <e-column field='EmpID' header='Employee ID' width='100'></e-column>
        <e-column field='Name' header='Name' width='90'></e-column>
      </e-columns>
    </ejs-multicolumncombobox>`
})
export class AppComponent {
  public empData: Object[] = []; // Empty to show noRecordsTemplate
  public fields: Object = { text: 'Name', value: 'EmpID' };
  public waterMark: string = 'Mitarbeiter auswählen';
}
```

### Locale Key Reference

The locale key for this component is `'multicolumncombobox'`. Supported locale strings:

| Key | Default (English) | Description |
|-----|-------------------|-------------|
| `noRecordsTemplate` | `'No records found'` | Shown when popup has no items |

### Notes
- `L10n.load()` must be called **before** the component is rendered (e.g., in `app.config.ts` providers or before the component class declaration)
- The `locale` property accepts a BCP 47 language tag (e.g., `'de'`, `'fr'`, `'ar'`, `'zh-CN'`)
- RTL and localization can be combined: set both `[enableRtl]='true'` and `locale='ar'` for Arabic
