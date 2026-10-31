# Global Locale and Accessibility

## When to Use This Reference

**Read this file when you need to:**
- Support multiple languages and cultures (German, Arabic, French, Chinese, etc.)
- Configure number and date formatting for different locales
- Enable right-to-left (RTL) support for Arabic, Farsi, Urdu languages
- Implement accessibility compliance (WCAG 2.2, Section 508 standards)
- Add ARIA attributes for screen reader support
- Enable keyboard navigation and accessibility checker validation
- Configure currency formatting and locale-specific display

## Table of Contents
- [Localization](#localization)
- [Internationalization](#internationalization)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Accessibility Compliance](#accessibility-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)

## Localization

The Localization library allows you to localize default text content of TreeGrid. Configure locale property and use L10n.load() to define translation objects for different cultures (Arabic, Deutsch, French, etc.).

### Loading Translations

Use `L10n.load()` function to load translation object for specific culture:

```typescript
import { L10n } from '@syncfusion/ej2-base';
import { TreeGrid, Toolbar, Page, Filter } from '@syncfusion/ej2-treegrid';
import { sampleData } from './datasource.ts';

TreeGrid.Inject(Toolbar, Filter, Page);

L10n.load({
  'de-DE': {
    'treegrid': {
      'EmptyRecord': 'Keine Aufzeichnungen angezeigt',
      'ExpandAll': 'Alle erweitern',
      'CollapseAll': 'Alles einklappen',
      'Print': 'Drucken',
      'Pdfexport': 'PDF-Export',
      'Excelexport': 'Excel-Export',
      'Wordexport': 'Word-Export',
      'FilterButton': 'Filter',
      'ClearButton': 'klar',
      'StartsWith': 'Beginnt mit',
      'EndsWith': 'Endet mit',
      'Contains': 'Enthält',
      'Equal': 'Gleich',
      'NotEqual': 'Nicht gleich',
      'LessThan': 'Weniger als',
      'LessThanOrEqual': 'Weniger als oder gleich',
      'GreaterThan': 'Größer als',
      'GreaterThanOrEqual': 'Größer als oder gleich',
      'EnterValue': 'Geben Sie den Wert ein',
      'FilterMenu': 'Filter'
    },
    'pager': {
      'currentPageInfo': '{0} von {1} Seiten',
      'totalItemsInfo': '({0} Beiträge)',
      'firstPageTooltip': 'Zur ersten Seite',
      'lastPageTooltip': 'Zur letzten Seite',
      'nextPageTooltip': 'Zur nächsten Seite',
      'previousPageTooltip': 'Zurück zur letzten Seit',
      'nextPagerTooltip': 'Zum nächsten Pager',
      'previousPagerTooltip': 'Zum vorherigen Pager'
    }
  }
});

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  locale: 'de-DE',
  childMapping: 'subtasks',
  toolbar: ['Print'],
  allowFiltering: true,
  filterSettings: { type: 'Menu' },
  height: 220,
  allowPaging: true,
  pageSettings: { pageSize: 7 },
  treeColumnIndex: 1,
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
    { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Left' },
    { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
  ]
});

treeGridObj.appendTo('#TreeGrid');
```

### Localization of Dependent Components

When localizing TreeGrid, include dependent components like DatePicker, Form Validator, and Grid. Each has static text requiring localization:

```typescript
L10n.load({
  'de-DE': {
    'datepicker': {
      'placeholder': 'Wählen Sie ein Datum',
      'today': 'heute'
    },
    'formValidator': {
      'required': 'This field is required',
      'email': 'Please enter a valid email address',
      'minLength': 'Please enter at least {0} characters'
    },
    'grid': {
      'True': 'true',
      'False': 'false',
      'Item': 'item',
      'Items': 'items',
      'OKButton': 'OK'
    }
  }
});
```

**Default Locale:** `en-US`. Change locale property to switch cultures.

## Internationalization

The Internationalization library globalizes number, date, and time values using format strings in column.format property. Load CLDR data and set culture using `setCulture()` and `setCurrencyCode()`:

```typescript
import { loadCldr, L10n, setCulture, setCurrencyCode } from '@syncfusion/ej2-base';
import * as currencies from './currencies.json';
import * as cagregorian from './ca-gregorian.json';
import * as numbers from './numbers.json';
import * as timeZoneNames from './timeZoneNames.json';
import * as numberingSystems from './numberingSystems.json';
import { TreeGrid, Page, Toolbar, Filter } from '@syncfusion/ej2-treegrid';
import { formatData } from './datasource.ts';

TreeGrid.Inject(Page, Toolbar, Filter);

loadCldr(currencies, cagregorian, numbers, timeZoneNames, numberingSystems);
setCulture('de');
setCurrencyCode('EUR');

L10n.load({
  'de-DE': {
    'grid': {
      'EmptyRecord': 'Keine Aufzeichnungen angezeigt',
      'Print': 'Drucken',
      'FilterButton': 'Filter',
      'ClearButton': 'klar',
      'StartsWith': 'Beginnt mit',
      'EndsWith': 'Endet mit',
      'Contains': 'Enthält'
    },
    'pager': {
      'currentPageInfo': '{0} von {1} Seiten',
      'totalItemsInfo': '({0} Beiträge)',
      'firstPageTooltip': 'Zur ersten Seite',
      'lastPageTooltip': 'Zur letzten Seite'
    }
  }
});

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: formatData,
  locale: 'de-DE',
  childMapping: 'subtasks',
  toolbar: ['Print'],
  allowFiltering: true,
  filterSettings: { type: 'Menu' },
  height: 220,
  allowPaging: true,
  pageSettings: { pageSize: 7 },
  treeColumnIndex: 1,
  columns: [
    { field: 'orderID', headerText: 'Order ID', textAlign: 'Right', width: 90 },
    { field: 'orderName', headerText: 'Order Name', textAlign: 'Left', width: 180 },
    {
      field: 'price', headerText: 'Price', textAlign: 'Right', width: 80, format: {
        format: 'C2', useGrouping: false, minimumSignificantDigits: 1, maximumSignificantDigits: 3, currency: 'EUR'
      }, type: 'number'
    }
  ]
});

treeGridObj.appendTo('#TreeGrid');
```

**Note:** Price column uses NumberFormatOptions for EUR currency formatting. Default locale is `en-US`.

## Right-to-Left (RTL)

RTL provides option to switch text direction and layout from right to left, improving experience for right-to-left languages (Arabic, Farsi, Urdu, etc.). Enable RTL by setting `enableRtl` property to true:

```typescript
import { L10n } from '@syncfusion/ej2-base';
import { TreeGrid, Page, Toolbar, Filter } from '@syncfusion/ej2-treegrid';
import { sampleData } from './datasource.ts';

TreeGrid.Inject(Page, Toolbar, Filter);

L10n.load({
  'ar-AE': {
    'treegrid': {
      'EmptyRecord': 'لا سجلات لعرضها',
      'Print': 'طباعة',
      'Expand All': 'توسيع الكل',
      'Collapse All': 'طي الكل',
      'FilterButton': 'منقي',
      'ClearButton': 'واضح',
      'StartsWith': 'ابدا ب',
      'EndsWith': 'ينتهي مع',
      'Contains': 'يحتوي على',
      'Equal': 'مساو',
      'NotEqual': 'غير متساوي',
      'LessThan': 'أقل من',
      'LessThanOrEqual': 'اصغر من او يساوي',
      'GreaterThan': 'أكثر من',
      'GreaterThanOrEqual': 'أكبر من أو يساوي',
      'ChooseDate': 'اختر تاريخا',
      'EnterValue': 'أدخل القيمة',
      'FilterMenu': 'منقي'
    },
    'pager': {
      'currentPageInfo': '{0} من {1} صفحة',
      'totalItemsInfo': '({0} العناصر)',
      'firstPageTooltip': 'انتقل إلى الصفحة الأولى',
      'lastPageTooltip': 'انتقل إلى الصفحة الأخيرة',
      'nextPageTooltip': 'انتقل إلى الصفحة التالية',
      'previousPageTooltip': 'انتقل إلى الصفحة السابقة'
    }
  }
});

let treeGridObj: TreeGrid = new TreeGrid({
  dataSource: sampleData,
  locale: 'ar-AE',
  enableRtl: true,
  childMapping: 'subtasks',
  toolbar: ['Print'],
  allowFiltering: true,
  filterSettings: { type: 'Menu' },
  height: 210,
  allowPaging: true,
  pageSettings: { pageSize: 7 },
  treeColumnIndex: 1,
  columns: [
    { field: 'taskID', headerText: 'Task ID', width: 90, textAlign: 'Right' },
    { field: 'taskName', headerText: 'Task Name', width: 180, textAlign: 'Right' },
    { field: 'duration', headerText: 'Duration', width: 80, textAlign: 'Right' }
  ]
});

treeGridObj.appendTo('#TreeGrid');
```

## Accessibility Compliance

TreeGrid follows accessibility guidelines including ADA, Section 508, WCAG 2.2 standards, and WCAG roles to evaluate accessibility:

| Standard | Status | Notes |
|----------|--------|-------|
| WCAG 2.2 Support | Intermediate | Some features fully meet requirements |
| Section 508 Support | Yes | Full compliance |
| Screen Reader Support | Intermediate | Most features supported |
| Right-To-Left Support | Yes | Full RTL support |
| Color Contrast | Yes | Proper contrast ratios |
| Mobile Device Support | Yes | Responsive design |
| Keyboard Navigation Support | Yes | Full keyboard access |
| Accessibility Checker Validation | Yes | Validated with accessibility tools |
| Axe-core Accessibility Validation | Yes | Passes automated checks |

## WAI-ARIA Attributes

TreeGrid follows WAI-ARIA patterns for accessibility. Supported ARIA attributes:

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `role=treegrid` | Convey semantic role to assistive technologies | Grid container |
| `aria-selected` | Reflect selection state (single/multi-select) | Selected rows |
| `aria-expanded` | Show whether node is expanded or collapsed | Hierarchy navigation |
| `aria-sort` | Indicate current sorting order of column | Sorted columns |
| `aria-busy` | Loading state for screen readers | Export/async operations |
| `aria-invalid` | Indicate form field validity | Edited cells |
| `aria-grabbed` | Accessibility info for draggable elements | Column reordering |
| `aria-owns` | Establish relationship between parent/child elements | Parent-child hierarchy |
| `aria-label` | Provide accessible name for icon buttons | Toolbar buttons |

## Keyboard Navigation

TreeGrid supports keyboard interaction guidelines for assistive technologies and keyboard-only users:

**Navigation:**
- `PageDown` - Go to next page
- `PageUp` - Go to previous page
- `Ctrl + Alt + PageDown` - Go to last page
- `Ctrl + Alt + PageUp` - Go to first page
- `Home` - Go to first cell
- `End` - Go to last cell
- `Ctrl + Home` - Go to first row
- `Ctrl + End` - Go to last row

**Movement:**
- `DownArrow` - Move cell focus downward
- `UpArrow` - Move cell focus upward
- `LeftArrow` - Move cell focus left
- `RightArrow` - Move cell focus right

**Selection:**
- `Shift + DownArrow` - Extend row/cell selection downwards
- `Shift + UpArrow` - Extend row/cell selection upwards
- `Shift + LeftArrow` - Extend cell selection left
- `Shift + RightArrow` - Extend cell selection right
- `Ctrl + A` - Select all rows/cells

**Actions:**
- `Enter` - Move selection downward; complete editing; sort column header
- `Shift + Enter` - Move selection upward; clear sorting
- `Ctrl + Enter` - Perform multi-sorting on column header
- `Tab` - Move selection right
- `Shift + Tab` - Move selection left
- `Esc` - Deselect all rows/cells

**Grouping/Hierarchy:**
- `Ctrl + Shift + DownArrow` - Expand selected group
- `Ctrl + DownArrow` - Expand all visible groups
- `Ctrl + Shift + UpArrow` - Collapse selected group
- `Ctrl + UpArrow` - Collapse all visible groups
- `Ctrl + P` - Print TreeGrid
