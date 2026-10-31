# TreeMap Internationalization (TypeScript and JavaScript)

## Table of Contents

- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
  - [Enable RTL](#enable-rtl)
- [Render Direction Configuration](#render-direction-configuration)
  - [Render Direction Options](#render-direction-options)
  - [RTL with Different Render Directions](#rtl-with-different-render-directions)
- [Locale Configuration](#locale-configuration)
  - [Supported Locales](#supported-locales)
  - [Set Locale](#set-locale)
- [Number Formatting](#number-formatting)
  - [Number Format Property](#number-format-property)
  - [Format Codes](#format-codes)
  - [Custom Format String](#custom-format-string)
- [Date Formatting (if applicable)](#date-formatting-if-applicable)
- [Complete I18N Example](#complete-i18n-example)
- [Language-Specific Labels](#language-specific-labels)
  - [Multilingual Data](#multilingual-data)
- [Currency Formatting by Locale](#currency-formatting-by-locale)
- [Number Grouping by Locale](#number-grouping-by-locale)
- [RTL Breadcrumb Navigation](#rtl-breadcrumb-navigation)
- [Best Practices](#best-practices)
  - [DO: Test with RTL Languages](#do-test-with-rtl-languages)
  - [DON'T: Mix RTL and LTR Without Testing](#dont-mix-rtl-and-ltr-without-testing)
  - [DO: Provide Locale Switcher](#do-provide-locale-switcher)
  - [DO: Use Standard Format Codes](#do-use-standard-format-codes)
  - [DO: Verify Number/Currency Display](#do-verify-numbercurrency-display)
- [Troubleshooting](#troubleshooting)

## Right-to-Left (RTL) Support

The Syncfusion Angular TreeMap includes built-in right-to-left rendering through the `enableRtl` property. This is the correct feature to use for Arabic, Hebrew, and similar RTL languages.

### Enable RTL

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
  { Product: 'منتج أ', Sales: 15000 },
  { Product: 'منتج ب', Sales: 12000 }
];

const treeMapInstance = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  enableRtl: true,
  leafItemSettings: {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMapInstance.appendTo('#treemap-container');
```

**JavaScript:**
```javascript
var data = [
  { Product: 'منتج أ', Sales: 15000 },
  { Product: 'منتج ب', Sales: 12000 }
];

var treeMapInstance = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  enableRtl: true,
  leafItemSettings: {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMapInstance.appendTo('#treemap-container');
```

**HTML:**
```html
<div id="treemap-container" style="width: 100%; height: 500px;"></div>
```

**Effects of `enableRtl`:**

- TreeMap renders in right-to-left mode.
- Data labels, tooltips, and legends respect RTL rendering.
- Legend icon and legend text follow RTL-friendly placement.
- Drilldown breadcrumb text also aligns better for RTL usage when breadcrumb is enabled.

**Corrected Definition:** `enableRtl` controls RTL rendering, but it does not automatically replace `renderDirection`. Layout direction and RTL support should be treated as related but separate settings.

## Render Direction Configuration

`renderDirection` controls how the TreeMap rectangles are laid out visually. It is a built-in layout option and can be used with both LTR and RTL interfaces.

### Render Direction Options

```typescript
<ejs-treemap
  renderDirection="TopLeftBottomRight">
</ejs-treemap>
```

**Available directions:**

- `TopLeftBottomRight`
- `TopRightBottomLeft`
- `BottomRightTopLeft`
- `BottomLeftTopRight`

### RTL with Different Render Directions

Use `enableRtl` for RTL UI behavior, and optionally choose an RTL-friendly `renderDirection` if you want the visual layout flow to begin from the right.

```typescript
<ejs-treemap
  [enableRtl]="true"
  renderDirection="TopRightBottomLeft">
</ejs-treemap>
```

```typescript
<ejs-treemap
  [enableRtl]="true"
  renderDirection="BottomRightTopLeft">
</ejs-treemap>
```

**Corrected Definition:** `renderDirection` is a layout configuration, not a locale switch. It changes visual item placement, while `enableRtl` changes UI rendering behavior.

## Locale Configuration

TreeMap supports localization and globalization through Syncfusion culture APIs and the `locale` property.

### Supported Locales

TreeMap can work with common locales such as:

- `en-US`
- `de`
- `fr`
- `es`
- `ar`
- `he`
- `ja`
- `zh`

**Corrected Definition:** The component can use different locales, but the formatting behavior depends on the culture you set and the locale data available in your application.

### Set Locale

For TreeMap internationalization, the most reliable built-in pattern is:

- Use `setCulture()` to change formatting culture
- Use `setCurrencyCode()` when currency formatting is involved
- Use the TreeMap `locale` property to follow a specific culture value
- Use localization APIs only when you need localized component text resources

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';
import { setCulture, setCurrencyCode } from '@syncfusion/ej2-base';

let currentLocale = 'en-US';

const data = [
  { Product: 'Laptop', Sales: 15000.5 },
  { Product: 'Phone', Sales: 12000.25 }
];

const treeMapInstance = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  locale: currentLocale,
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treeMapInstance.appendTo('#treemap-container');

function setLocale(locale: string): void {
  currentLocale = locale;
  setCulture(locale);

  if (locale === 'de') {
    setCurrencyCode('EUR');
  } else if (locale === 'ar') {
    setCurrencyCode('SAR');
  } else {
    setCurrencyCode('USD');
  }

  treeMapInstance.locale = locale;
  treeMapInstance.refresh();
}
```

**JavaScript:**
```javascript
var currentLocale = 'en-US';

var data = [
  { Product: 'Laptop', Sales: 15000.5 },
  { Product: 'Phone', Sales: 12000.25 }
];

var treeMapInstance = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  locale: currentLocale,
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treeMapInstance.appendTo('#treemap-container');

function setLocale(locale) {
  currentLocale = locale;
  ej.base.setCulture(locale);

  if (locale === 'de') {
    ej.base.setCurrencyCode('EUR');
  } else if (locale === 'ar') {
    ej.base.setCurrencyCode('SAR');
  } else {
    ej.base.setCurrencyCode('USD');
  }

  treeMapInstance.locale = locale;
  treeMapInstance.refresh();
}
```

**HTML:**
```html
<div>
  <button onclick="setLocale('en-US')">English (USD)</button>
  <button onclick="setLocale('de')">German (EUR)</button>
  <button onclick="setLocale('ar')">Arabic (SAR)</button>
</div>
<div id="treemap-container" style="width: 100%; height: 500px;"></div>
```

## Number Formatting

TreeMap supports culture-aware text formatting through the built-in `format` property.

### Number Format Property

```typescript
<ejs-treemap
  [dataSource]="data"
  weightValuePath="Sales"
  format="n2"
  [useGroupingSeparator]="true">
</ejs-treemap>
```

```typescript
data = [
  { Product: 'A', Sales: 15000.5 },
  { Product: 'B', Sales: 12000.25 }
];
```

**Behavior:**

- `en-US`: `15,000.50`
- `de`: `15.000,50`
- `fr`: `15 000,50`

### Format Codes

The built-in `format` property accepts standard global format strings.

- `n` → number
- `n2` → number with two decimals
- `p` → percentage
- `c` → currency
- `c2` → currency with two decimals

### Custom Format String

For labels and tooltips, the safest pattern is to combine:

- TreeMap `format` for culture-aware numeric formatting
- a label or tooltip format string for text structure

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
  { Product: 'Produkt A', Sales: 15000 },
  { Product: 'Produkt B', Sales: 12000 }
];

const treeMapInstance = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  format: 'n2',
  useGroupingSeparator: true,
  leafItemSettings: {
    labelPath: 'Product'
  },
  tooltipSettings: {
    visible: true,
    format: '${Product}<br/>${Sales}'
  }
});

treeMapInstance.appendTo('#treemap-container');
```

**JavaScript:**
```javascript
var data = [
  { Product: 'Produkt A', Sales: 15000 },
  { Product: 'Produkt B', Sales: 12000 }
];

var treeMapInstance = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  format: 'n2',
  useGroupingSeparator: true,
  leafItemSettings: {
    labelPath: 'Product'
  },
  tooltipSettings: {
    visible: true,
    format: '${Product}<br/>${Sales}'
  }
});

treeMapInstance.appendTo('#treemap-container');
```

**HTML:**
```html
<div id="treemap-container" style="width: 100%; height: 500px;"></div>
```

**Corrected Definition:** TreeMap formatting is most reliable when the numeric format is controlled by the component `format` property, while the tooltip or label string controls the text layout.

## Date Formatting (if applicable)

TreeMap does not have a date axis like a chart. If dates are part of your item data, the best approach is to pre-format them before binding them into labels or tooltips.

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

let currentLocale = 'en-US';

const data = [
  { Product: 'Laptop', Sales: 15000, OrderDate: '2024-03-15' },
  { Product: 'Phone', Sales: 12000, OrderDate: '2024-04-01' }
];

function formatDate(dateString: string, locale: string): string {
  return new Intl.DateTimeFormat(locale).format(new Date(dateString));
}

const localizedData = data.map((item) => ({
  ...item,
  FormattedDate: formatDate(item.OrderDate, currentLocale)
}));

const treeMapInstance = new TreeMap({
  dataSource: localizedData,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product'
  },
  tooltipSettings: {
    visible: true,
    format: '${Product}<br/>${FormattedDate}'
  }
});

treeMapInstance.appendTo('#treemap-container');
```

**JavaScript:**
```javascript
var currentLocale = 'en-US';

var data = [
  { Product: 'Laptop', Sales: 15000, OrderDate: '2024-03-15' },
  { Product: 'Phone', Sales: 12000, OrderDate: '2024-04-01' }
];

function formatDate(dateString, locale) {
  return new Intl.DateTimeFormat(locale).format(new Date(dateString));
}

var localizedData = data.map(function(item) {
  return {
    Product: item.Product,
    Sales: item.Sales,
    OrderDate: item.OrderDate,
    FormattedDate: formatDate(item.OrderDate, currentLocale)
  };
});

var treeMapInstance = new ej.treemap.TreeMap({
  dataSource: localizedData,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product'
  },
  tooltipSettings: {
    visible: true,
    format: '${Product}<br/>${FormattedDate}'
  }
});

treeMapInstance.appendTo('#treemap-container');
```

**HTML:**
```html
<div id="treemap-container" style="width: 100%; height: 500px;"></div>
```

**Corrected Definition:** Date formatting in TreeMap is applicable only when your data labels or tooltips contain date values. Pre-formatting the date into a string field is the most predictable approach.

## Complete I18N Example

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';
import { L10n, setCulture, setCurrencyCode } from '@syncfusion/ej2-base';

// Configure locales
L10n.load({
  de: {
    treemap: {
      placeholder: 'Baumkarte'
    }
  },
  ar: {
    treemap: {
      placeholder: 'الخريطة الشجرية'
    }
  }
});

type LocaleKey = 'en-US' | 'de' | 'ar';

let currentLocale: LocaleKey = 'en-US';
let isRtl = false;

const localeData: Record<LocaleKey, any> = {
  'en-US': [
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ],
  de: [
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Telefon', Sales: 12000 }
  ],
  ar: [
    { Product: 'الكمبيوتر المحمول', Sales: 15000 },
    { Product: 'الهاتف', Sales: 12000 }
  ]
};

const treeMapInstance = new TreeMap({
  dataSource: localeData[currentLocale],
  weightValuePath: 'Sales',
  locale: currentLocale,
  enableRtl: isRtl,
  renderDirection: 'TopLeftBottomRight',
  format: 'c2',
  useGroupingSeparator: true,
  leafItemSettings: {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  },
  tooltipSettings: {
    visible: true,
    format: '${Product}<br/>${Sales}'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  }
});

treeMapInstance.appendTo('#treemap-container');

function setLocale(locale: LocaleKey) {
  currentLocale = locale;
  isRtl = locale === 'ar';
  
  setCulture(locale);
  if (locale === 'de') {
    setCurrencyCode('EUR');
  } else if (locale === 'ar') {
    setCurrencyCode('SAR');
  } else {
    setCurrencyCode('USD');
  }

  treeMapInstance.dataSource = localeData[locale];
  treeMapInstance.locale = locale;
  treeMapInstance.enableRtl = isRtl;
  treeMapInstance.refresh();
}
```

**JavaScript:**
```javascript
var currentLocale = 'en-US';
var isRtl = false;

var localeData = {
  'en-US': [
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ],
  'de': [
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Telefon', Sales: 12000 }
  ],
  'ar': [
    { Product: 'الكمبيوتر المحمول', Sales: 15000 },
    { Product: 'الهاتف', Sales: 12000 }
  ]
};

var treeMapInstance = new ej.treemap.TreeMap({
  dataSource: localeData[currentLocale],
  weightValuePath: 'Sales',
  locale: currentLocale,
  enableRtl: isRtl,
  renderDirection: 'TopLeftBottomRight',
  format: 'c2',
  useGroupingSeparator: true,
  leafItemSettings: {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  },
  tooltipSettings: {
    visible: true,
    format: '${Product}<br/>${Sales}'
  },
  legendSettings: {
    visible: true,
    position: 'Bottom'
  }
});

treeMapInstance.appendTo('#treemap-container');

function setLocale(locale) {
  currentLocale = locale;
  isRtl = locale === 'ar';
  
  ej.base.setCulture(locale);
  if (locale === 'de') {
    ej.base.setCurrencyCode('EUR');
  } else if (locale === 'ar') {
    ej.base.setCurrencyCode('SAR');
  } else {
    ej.base.setCurrencyCode('USD');
  }

  treeMapInstance.dataSource = localeData[locale];
  treeMapInstance.locale = locale;
  treeMapInstance.enableRtl = isRtl;
  treeMapInstance.refresh();
}
```

**HTML:**
```html
<div class="toolbar">
  <button type="button" onclick="setLocale('en-US')">English</button>
  <button type="button" onclick="setLocale('de')">Deutsch</button>
  <button type="button" onclick="setLocale('ar')">العربية</button>
</div>

<div id="treemap-container" style="width: 100%; height: 520px;"></div>

<style>
  .toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
    flex-wrap: wrap;
  }

  .toolbar button {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    background: #ffffff;
    border-radius: 8px;
    cursor: pointer;
  }
</style>
```
})
export class TreeMapI18NComponent {
  public currentLocale = signal<LocaleKey>('en-US');

  public rawData = signal([
    {
      Product: {
        'en-US': 'Laptop',
        de: 'Laptop',
        ar: 'الكمبيوتر المحمول'
      },
      Category: {
        'en-US': 'Electronics',
        de: 'Elektronik',
        ar: 'إلكترونيات'
      },
      Sales: 15000.5
    },
    {
      Product: {
        'en-US': 'Phone',
        de: 'Telefon',
        ar: 'الهاتف'
      },
      Category: {
        'en-US': 'Electronics',
        de: 'Elektronik',
        ar: 'إلكترونيات'
      },
      Sales: 12000.75
    },
    {
      Product: {
        'en-US': 'Chair',
        de: 'Stuhl',
        ar: 'الكرسي'
      },
      Category: {
        'en-US': 'Furniture',
        de: 'Möbel',
        ar: 'أثاث'
      },
      Sales: 8000.25
    }
  ]);

  public localizedData = computed(() => {
    const locale = this.currentLocale();

    return this.rawData().map((item) => ({
      Product: item.Product[locale],
      Category: item.Category[locale],
      Sales: item.Sales
    }));
  });

  public isRtl = computed(() => this.currentLocale() === 'ar');

  public currentRenderDirection = computed(() =>
    this.isRtl() ? 'TopRightBottomLeft' : 'TopLeftBottomRight'
  );

  public leafItemSettings = {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };

  public legendSettings = {
    visible: true
  };

  public tooltipSettings = computed(() => {
    const salesText =
      this.currentLocale() === 'de'
        ? 'Umsatz'
        : this.currentLocale() === 'ar'
          ? 'المبيعات'
          : 'Sales';

    return {
      visible: true,
      format: '${Product}<br/>' + salesText + ': ${Sales}'
    };
  });

  public setLocale(locale: LocaleKey): void {
    this.currentLocale.set(locale);
    setCulture(locale);

    if (locale === 'de') {
      setCurrencyCode('EUR');
    } else if (locale === 'ar') {
      setCurrencyCode('SAR');
    } else {
      setCurrencyCode('USD');
    }
  }
}
```

## Language-Specific Labels

If your application stores multilingual content, the best approach is to transform the data into a locale-specific flat collection before binding it to TreeMap.

### Multilingual Data

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

type LocaleKey = 'en-US' | 'de' | 'ar';

let currentLocale: LocaleKey = 'en-US';

const rawData = [
  {
    Product: { 'en-US': 'Laptop', de: 'Laptop', ar: 'الكمبيوتر المحمول' },
    Category: { 'en-US': 'Electronics', de: 'Elektronik', ar: 'إلكترونيات' },
    Sales: 15000
  },
  {
    Product: { 'en-US': 'Phone', de: 'Telefon', ar: 'الهاتف' },
    Category: { 'en-US': 'Electronics', de: 'Elektronik', ar: 'إلكترونيات' },
    Sales: 12000
  }
];

function getLocalizedData(locale: LocaleKey) {
  return rawData.map((item) => ({
    Product: item.Product[locale],
    Category: item.Category[locale],
    Sales: item.Sales
  }));
}

const treeMapInstance = new TreeMap({
  dataSource: getLocalizedData(currentLocale),
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMapInstance.appendTo('#treemap-container');
```

**JavaScript:**
```javascript
var currentLocale = 'en-US';

var rawData = [
  {
    Product: { 'en-US': 'Laptop', de: 'Laptop', ar: 'الكمبيوتر المحمول' },
    Category: { 'en-US': 'Electronics', de: 'Elektronik', ar: 'إلكترونيات' },
    Sales: 15000
  },
  {
    Product: { 'en-US': 'Phone', de: 'Telefon', ar: 'الهاتف' },
    Category: { 'en-US': 'Electronics', de: 'Elektronik', ar: 'إلكترونيات' },
    Sales: 12000
  }
];

function getLocalizedData(locale) {
  return rawData.map(function(item) {
    return {
      Product: item.Product[locale],
      Category: item.Category[locale],
      Sales: item.Sales
    };
  });
}

var treeMapInstance = new ej.treemap.TreeMap({
  dataSource: getLocalizedData(currentLocale),
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMapInstance.appendTo('#treemap-container');
```

**HTML:**
```html
<div id="treemap-container" style="width: 100%; height: 500px;"></div>
```

**Corrected Definition:** Instead of trying to bind a nested language object directly to `labelPath`, transform the data so TreeMap receives a normal string field such as `Product`.

## Currency Formatting by Locale

Currency formatting is built in through `format` plus the active culture and currency code.

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';
import { setCulture, setCurrencyCode } from '@syncfusion/ej2-base';

let currentLocale = 'en-US';

const treeMapInstance = new TreeMap({
  dataSource: [
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ],
  weightValuePath: 'Sales',
  locale: currentLocale,
  format: 'c2',
  useGroupingSeparator: true,
  leafItemSettings: {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  },
  tooltipSettings: {
    visible: true,
    format: '${Product}<br/>${Sales}'
  }
});

treeMapInstance.appendTo('#treemap-container');

function setLocale(locale: string) {
  currentLocale = locale;
  setCulture(locale);

  if (locale === 'de') {
    setCurrencyCode('EUR');
  } else if (locale === 'ar') {
    setCurrencyCode('SAR');
  } else {
    setCurrencyCode('USD');
  }

  treeMapInstance.locale = locale;
  treeMapInstance.refresh();
}
```

**JavaScript:**
```javascript
var currentLocale = 'en-US';

var treeMapInstance = new ej.treemap.TreeMap({
  dataSource: [
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ],
  weightValuePath: 'Sales',
  locale: currentLocale,
  format: 'c2',
  useGroupingSeparator: true,
  leafItemSettings: {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  },
  tooltipSettings: {
    visible: true,
    format: '${Product}<br/>${Sales}'
  }
});

treeMapInstance.appendTo('#treemap-container');

function setLocale(locale) {
  currentLocale = locale;
  ej.base.setCulture(locale);

  if (locale === 'de') {
    ej.base.setCurrencyCode('EUR');
  } else if (locale === 'ar') {
    ej.base.setCurrencyCode('SAR');
  } else {
    ej.base.setCurrencyCode('USD');
  }

  treeMapInstance.locale = locale;
  treeMapInstance.refresh();
}
```

**HTML:**
```html
<div id="treemap-container" style="width: 100%; height: 500px;"></div>
```

**Expected behavior:**

- `en-US` → `$15,000.00`
- `de` → `15.000,00 €`
- `ar` → formatted according to Arabic culture and the configured currency code

## Number Grouping by Locale

To show culture-aware thousand separators, enable `useGroupingSeparator` and set a culture.

```typescript
<ejs-treemap
  [dataSource]="data"
  weightValuePath="Sales"
  format="n2"
  [useGroupingSeparator]="true">
</ejs-treemap>
```

**Typical results by locale:**

- English → `1,000,000`
- German → `1.000.000`
- French → `1 000 000`

**Corrected Definition:** Grouping style depends on the active culture. TreeMap does not invent a grouping style by itself; it follows the culture settings.

## RTL Breadcrumb Navigation

TreeMap breadcrumb support works with drilldown and can be combined with RTL.

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const treeMapInstance = new TreeMap({
  dataSource: [
    { Category: 'المنتجات', SubCategory: 'إلكترونيات', Item: 'الهاتف', Value: 12000 },
    { Category: 'المنتجات', SubCategory: 'إلكترونيات', Item: 'الحاسوب', Value: 18000 }
  ],
  weightValuePath: 'Value',
  enableDrillDown: true,
  enableBreadcrumb: true,
  enableRtl: true,
  breadcrumbConnector: ' <- ',
  levels: [
    { groupPath: 'Category', headerFormat: '${Category}' },
    { groupPath: 'SubCategory', headerFormat: '${SubCategory}' }
  ],
  leafItemSettings: {
    labelPath: 'Item',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMapInstance.appendTo('#treemap-container');
```

**JavaScript:**
```javascript
var treeMapInstance = new ej.treemap.TreeMap({
  dataSource: [
    { Category: 'المنتجات', SubCategory: 'إلكترونيات', Item: 'الهاتف', Value: 12000 },
    { Category: 'المنتجات', SubCategory: 'إلكترونيات', Item: 'الحاسوب', Value: 18000 }
  ],
  weightValuePath: 'Value',
  enableDrillDown: true,
  enableBreadcrumb: true,
  enableRtl: true,
  breadcrumbConnector: ' <- ',
  levels: [
    { groupPath: 'Category', headerFormat: '${Category}' },
    { groupPath: 'SubCategory', headerFormat: '${SubCategory}' }
  ],
  leafItemSettings: {
    labelPath: 'Item',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMapInstance.appendTo('#treemap-container');
```

**HTML:**
```html
<div id="treemap-container" style="width: 100%; height: 500px;"></div>
```

**Corrected Definition:** Breadcrumb direction and text readability improve when `enableRtl` is enabled, but breadcrumb display still depends on your drilldown setup and connector choice.

## Best Practices

### Test with RTL Languages

```typescript
data = [
  { Product: 'منتج عربي', Sales: 15000 }
];

enableRtl: true
```

Always validate real RTL content, not only translated labels.

### Mix RTL and LTR Without Testing

```typescript
enableRtl: true
```

If the page mixes English product codes with Arabic labels, visually test the result before shipping.

### Provide Locale Switcher

```typescript
function setLocale(locale) {
  // Update TreeMap locale
  treeMapInstance.locale = locale;
  treeMapInstance.refresh();
}
```

A locale switcher is the cleanest way to validate formatting and RTL behavior.

### Use Standard Format Codes

```typescript
format: 'n2'
format: 'c2'
format: 'p'
```

Prefer built-in global format strings over ad hoc formatting logic.

### Verify Number/Currency Display

Check the following for every active locale:

- decimal separator
- grouping separator
- currency symbol
- RTL alignment
- tooltip readability
- legend readability

## Troubleshooting

**Issue:** Locale is not changing

**Solution:** Set the culture and, if needed, the component locale.

```typescript
setCulture('de');
setCurrencyCode('EUR');
this.currentLocale.set('de');
```

**Issue:** RTL text still looks left-to-right

**Solution:** Enable RTL explicitly on the TreeMap.

```typescript
[enableRtl]="true"
```

**Issue:** Numbers are not grouped correctly

**Solution:** Use a built-in format and enable grouping separators.

```typescript
format="n2"
[useGroupingSeparator]="true"
```

**Issue:** Currency symbol is wrong or missing

**Solution:** Set both culture and currency code.

```typescript
setCulture('de');
setCurrencyCode('EUR');
```

**Issue:** Tooltip text is not localized enough

**Solution:** Localize the surrounding text yourself and let TreeMap format the numeric value.

```typescript
tooltipSettings: {
  visible: true,
  format: '${Product}<br/>Umsatz: ${Sales}'
}
```

## See Also

- [Data Binding](data-binding.md) - Learn how to bind multilingual data sources
- [Labels, Tooltips, and Legend](labels-tooltips-legend.md) - Customize localized labels and tooltips
- [Levels and Layout](levels-and-layout.md) - Configure hierarchical grouping with RTL support
- [Selection and Interactivity](selection-interactivity.md) - Handle user interactions across locales
- [Print and Export](print-export-accessibility.md) - Export TreeMaps with locale-aware formatting
