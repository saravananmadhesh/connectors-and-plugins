# Data Formatting

## Table of Contents
- [Overview](#overview)
- [Format Codes](#format-codes)
- [Number Formatting](#number-formatting)
- [Date Formatting](#date-formatting)
- [Apply Format Settings](#apply-format-settings)
- [Custom Formatting](#custom-formatting)
- [Conditional Formatting](#conditional-formatting)
- [Cell Styling & Templates](#cell-styling--templates)
- [Internationalization & Localization](#internationalization--localization)

## Overview

Data formatting enhances readability of numerical and date values in PivotView. Format settings apply only to value fields (numeric columns). Property: [`formatSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFormatSettings)

## Format Codes

### Currency Formats
| Code | Display | Example |
|------|---------|---------|
| C0 | $ with no decimals | $1,234 |
| C1 | $ with 1 decimal | $1,234.5 |
| C2 | $ with 2 decimals | $1,234.56 |
| c | Default currency | ¤1,234.00 |

### Number Formats
| Code | Display | Example |
|------|---------|---------|
| N0 | Whole number, no decimals | 1,234 |
| N1 | Number with 1 decimal | 1,234.5 |
| N2 | Number with 2 decimals (+default) | 1,234.56 |
| N3 | Number with 3 decimals | 1,234.567 |

### Percentage Formats
| Code | Display | Example |
|------|---------|---------|
| P0 | Whole percent | 50% |
| P1 | Percent with 1 decimal | 50.5% |
| P2 | Percent with 2 decimals | 50.25% |

### Date Formats (if applicable)
| Code | Display | Example |
|------|---------|---------|
| d | Short date | 3/15/2023 |
| D | Long date | Wednesday, March 15, 2023 |
| M | Month-Day | March 15 |
| y | Year-Month | 2023-03 |

## Number Formatting

### Basic Number Format
```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  
  // Value fields
  values: [
    { name: 'Sold', caption: 'Units Sold' },
    { name: 'Quantity', caption: 'Quantity' },
    { name: 'Amount', caption: 'Sold Amount' }
  ],
  
  // Apply formatting
  formatSettings: [
    { name: 'Sold', format: 'N0' },          // Whole numbers only
    { name: 'Quantity', format: 'N2' },      // 2 decimal places
    { name: 'Amount', format: 'C2' }         // Currency with 2 decimals
  ],
  filters: []
};
const height = 350;
</script>
```

### Multiple Format Rules
```vue
<script setup>
const dataSourceSettings = {
  // ... other settings
  formatSettings: [
    { name: 'Revenue', format: 'C0' },           // $10,000
    { name: 'Profit', format: 'C2' },            // $10,000.50
    { name: 'Items', format: 'N0' },             // 1,234
    { name: 'Margin', format: 'P2' },            // 50.25%
    { name: 'Discount', format: 'P0' }           // 25%
  ]
};
</script>
```

### Removing Decimals
```vue
<script setup>
formatSettings: [
  { name: 'OrderCount', format: 'N0' }  // No decimal places
]
</script>
```

## Date Formatting

### Date Fields in Format Settings
If your data includes date values:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: [
    {
      "OrderDate": "2023-03-15",
      "Country": "USA",
      "Amount": 5000.50
    },
    // ... more records
  ],
  rows: [{ name: 'Country' }, { name: 'OrderDate' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Amount', caption: 'Total Amount' }],
  
  // Date formatting is typically handled at the row/column level
  // Not directly in formatSettings (which apply to value fields)
  formatSettings: [
    { name: 'Amount', format: 'C0' }
  ]
};
</script>
```

## Apply Format Settings

### Single Format
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  values: [
    { name: 'Sales', caption: 'Total Sales' }
  ],
  formatSettings: [
    { name: 'Sales', format: 'C0' }  // $10,000
  ]
};
</script>
```

### Multiple Value Fields (Each with Different Formats)
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  values: [
    { name: 'Revenue', caption: 'Total Revenue' },
    { name: 'Cost', caption: 'Total Cost' },
    { name: 'Units', caption: 'Units Sold' },
    { name: 'MProfit', caption: 'Profit Margin' }
  ],
  formatSettings: [
    { name: 'Revenue', format: 'C2' },      // $1,234.56
    { name: 'Cost', format: 'C0' },         // $1,235
    { name: 'Units', format: 'N0' },        // 1,234
    { name: 'MProfit', format: 'P2' }       // 12.50%
  ]
};
</script>
```

### Complete Example
```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height"></ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [
    { name: 'Sold', caption: 'Units Sold', type: 'Sum' },
    { name: 'Amount', caption: 'Amount', type: 'Sum' },
    { name: 'Discount', caption: 'Discount', type: 'Average' }
  ],
  
  // Apply formatting to display values
  formatSettings: [
    { name: 'Sold', format: 'N0' },         // 1,234
    { name: 'Amount', format: 'C0' },       // $5,000
    { name: 'Discount', format: 'P2' }      // 10.50%
  ],
  filters: []
};
const height = 350;
</script>

<style>
@import "@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

## Custom Formatting

### Using NumberFormatOptions
```vue
<script setup>
// Custom locale-specific formatting
const dataSourceSettings = {
  dataSource: pivotData,
  values: [
    { name: 'Amount', caption: 'Amount' }
  ],
  
  // Format with custom settings
  formatSettings: [
    { 
      name: 'Amount', 
      format: 'N',
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  ]
};
</script>
```

### Performance Considerations
1. **Format at Display Time**: Formatting adds minimal overhead
2. **Batch Formatting**: Apply multiple formats in formatSettings array
3. **Avoid Redundant Formatting**: Don't format already-formatted data

### Troubleshooting Formatting Issues

**Issue**: Format not showing
- Ensure field name matches exactly (case-sensitive)
- Verify field is in `values` array
- Check format code is valid

**Issue**: Wrong format displayed
- Clear browser cache
- Verify format code spelling
- Check locale settings

**Issue**: Performance degradation
- Use appropriate aggregation types
- Avoid unnecessary formatting on large datasets
- Batch formats efficiently

## Conditional Formatting

Conditional formatting enables you to customize the appearance of Pivot Table value cells—including background color, font color, font family, and font size—based on specific conditions. This visualization feature helps highlight important value cells and make them stand out.

### Enabling Conditional Formatting

Enable conditional formatting in toolbar using `allowConditionalFormatting` property:

```vue
<template>
  <div id="app">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings" 
      :allowConditionalFormatting="true"
      :showToolbar="true"
      :toolbar="toolbarOptions"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, Toolbar, ConditionalFormatting } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [{ name: 'Sold' }, { name: 'Amount' }],
  filters: []
};

const toolbarOptions = ['ConditionalFormatting'];
const height = 350;

provide('pivotview', [Toolbar, ConditionalFormatting]);
</script>
```

### Programmatic Conditional Formatting

Apply formatting rules directly through code using the `conditionalFormatSettings` property:

```vue
<script setup>
import { PivotViewComponent as EjsPivotview, ConditionalFormatting } from "@syncfusion/ej2-vue-pivotview";
import { provide } from "vue";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [{ name: 'Sold' }, { name: 'Amount' }],
  filters: [],
  
  // Programmatic conditional formatting
  conditionalFormatSettings: [
    {
      measure: 'Amount',           // Value field name
      value1: 1000,
      value2: 5000,
      conditions: 'Between',       // Condition type
      style: {
        backgroundColor: '#FFC7CE', // Light red
        color: '#9C0006',          // Dark red text
        fontFamily: 'Arial',
        fontSize: '12px'
      }
    },
    {
      measure: 'Sold',
      value1: 100,
      conditions: 'GreaterThan',
      style: {
        backgroundColor: '#C6EFCE', // Light green
        color: '#006100',           // Dark green text
        fontSize: '12px'
      }
    }
  ]
};

const height = 350;

provide('pivotview', [ConditionalFormatting]);
</script>
```

### Conditional Formatting Operators

The Pivot Table supports the following condition operators:

| Operator | Description | Example |
|----------|-------------|----------|
| GreaterThan | Value > threshold | Highlight sales > 5000 |
| LessThan | Value < threshold | Highlight sales < 1000 |
| Equal | Value = threshold | Highlight sales = 3000 |
| NotEquals | Value ≠ threshold | Highlight non-zero values |
| GreaterThanOrEqualsTo | Value ≥ threshold | Highlight sales ≥ 5000 |
| LessThanOrEqualsTo | Value ≤ threshold | Highlight sales ≤ 1000 |
| Between | threshold1 < value < threshold2 | Highlight 1000 < sales < 5000 |
| NotBetween | Value outside range | Highlight values outside 1000-5000 |

### Style Customization

Each condition supports comprehensive style customization:

```vue
<script setup>
const style = {
  backgroundColor: '#FFE6E6',        // Background color (hex code)
  color: '#CC0000',                 // Font color (hex code)
  fontFamily: 'Segoe UI',           // Font family name
  fontSize: '12px',                 // Font size with unit
  fontWeight: 'bold',               // Font weight (normal, bold, etc.)
  fontStyle: 'italic'               // Font style (normal, italic)
};
</script>
```

### Practical Example: Sales Analysis

```vue
<script setup>
import { PivotViewComponent as EjsPivotview, ConditionalFormatting } from "@syncfusion/ej2-vue-pivotview";
import { provide } from "vue";

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  // ... other settings
  
  conditionalFormatSettings: [
    {
      measure: 'Revenue',
      value1: 100000,
      condition: 'GreaterThan',
      style: {
        backgroundColor: '#E2EFDA',
        color: '#375623',
        fontWeight: 'bold'
      }
    },
    {
      measure: 'Revenue',
      value1: 50000,
      value2: 100000,
      condition: 'Between',
      style: {
        backgroundColor: '#FFF2CC',
        color: '#9C6500'
      }
    },
    {
      measure: 'Revenue',
      value1: 50000,
      condition: 'LessThan',
      style: {
        backgroundColor: '#FCE4D6',
        color: '#C65911'
      }
    }
  ]
};

provide('pivotview', [ConditionalFormatting]);
</script>
```

## Cell Styling & Templates

### Custom Cell Template

Customize cell appearance with template functions:

```vue
<template>
  <div id="app">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings"
      :cellTemplate="cellTemplate"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { h } from 'vue';

const cellTemplate = (args) => {
  const value = parseFloat(args.formattedValue || 0);
  const bgColor = value > 5000 ? '#E8F5E9' : '#FFEBEE';
  
  return h('div', {
    style: {
      backgroundColor: bgColor,
      padding: '8px',
      textAlign: 'right'
    }
  }, args.formattedValue);
};

const height = 350;
</script>
```

### Row and Column Header Styling

Configure header appearance using `gridSettings`:

```vue
<template>
  <div id="app">
    <ejs-pivotview 
      :dataSourceSettings="dataSourceSettings"
      :gridSettings="gridSettings"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [{ name: 'Sold' }, { name: 'Amount' }],
  filters: []
};

// Grid customization settings
const gridSettings = {
  // Sizing
  rowHeight: 30,              // Height of data rows (px)
  columnWidth: 120,           // Width of columns (px)
  
  // Column Resizing & Reordering
  allowResizing: true,        // Enable/disable column resizing (default: enabled)
  allowReordering: true,      // Enable/disable column drag-reorder
  
  // Text Wrapping
  allowTextWrap: false,       // Enable/disable text wrapping in cells
  
  // Grid Lines
  gridLines: 'Both',          // Both | Horizontal | Vertical | None (default: Both)
  
  // Selection
  allowSelection: true,       // Enable/disable cell/row selection
  selectionSettings: {
    type: 'Single',           // Single | Multiple
    mode: 'Row'               // Row | Column | Cell | Both
  },
  
  // Clip Mode
  clipMode: 'Ellipsis'        // Clip | Ellipsis | EllipsisWithTooltip (default: Ellipsis)
};

const height = 350;
</script>

<style>
@import "@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

## Internationalization & Localization

Display pivot data in multiple languages and regional formats.

### Setting Display Language
```vue
<template>
  <select v-model="currentLocale" @change="changeLocale">
    <option value="en-US">English</option>
    <option value="fr-FR">Français</option>
    <option value="de-DE">Deutsch</option>
    <option value="es-ES">Español</option>
    <option value="ar-SA">العربية</option>
    <option value="ja-JP">日本語</option>
    <option value="zh-CN">简体中文</option>
  </select>

  <ejs-pivotview
    :dataSourceSettings="dataSourceSettings"
    :locale="currentLocale"
    :height="height">
  </ejs-pivotview>
</template>

<script setup>
import { ref } from 'vue';
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

const currentLocale = ref('en-US');

const changeLocale = () => {
  // Pivot table UI automatically translates to selected locale
  // Field names, buttons, dialogs all update
};

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country', caption: 'Country' }],
  columns: [{ name: 'Year', caption: 'Year' }],
  values: [{ name: 'Sales', caption: 'Total Sales' }],
  filters: []
};

const height = 400;
</script>
```

### Regional Number and Date Formatting
```vue
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

const dataSourceSettings = {
  dataSource: pivotData,
  
  // Formatting settings
  formatSettings: [
    {
      name: 'Amount',
      format: 'C2',  // Currency with 2 decimals
      useGlobalSettings: true  // Use locale's currency symbol
    },
    {
      name: 'Date',
      format: 'yyyy-MM-dd',  // Formatted per locale
      useGlobalSettings: true
    },
    {
      name: 'Percentage',
      format: 'P2'  // Percentage per locale
    }
  ],
  
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Amount' }, { name: 'Percentage' }],
  filters: []
};

// Locale settings affect:
// - Currency symbol ($ for en-US, € for de-DE)
// - Number separator (. vs ,)
// - Date format (MM/DD/YYYY vs DD/MM/YYYY)
// - Text direction (LTR vs RTL for Arabic, Hebrew)
</script>
```

### Right-to-Left (RTL) Support

RTL (Right-to-Left) support enables the Pivot Table to display content in right-to-left layouts for languages like Arabic, Hebrew, and Urdu. Set the `enableRtl` property to `true`:

```vue
<template>
  <div :dir="isRTL ? 'rtl' : 'ltr'" :class="isRTL ? 'rtl-mode' : 'ltr-mode'">
    <ejs-pivotview
      :dataSourceSettings="dataSourceSettings"
      :locale="isRTL ? 'ar-SA' : 'en-US'"
      :enableRtl="isRTL"
      :height="height">
    </ejs-pivotview>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const isRTL = ref(false);  // Set true for RTL languages like Arabic, Hebrew

const toggleRTL = () => {
  isRTL.value = !isRTL.value;
};

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Product', caption: 'المنتج' }],  // Arabic caption
  columns: [{ name: 'Year', caption: 'السنة' }],
  values: [{ name: 'Sales', caption: 'المبيعات' }],
  filters: []
};

const height = 400;
</script>

<style>
/* RTL-aware styling */
.rtl-mode .pivot-container {
  direction: rtl;
  text-align: right;
}

.rtl-mode .e-grid {
  direction: rtl;
}

.rtl-mode .e-gridcontent {
  text-align: right;
}
</style>
```

### Multi-Language Field Labels
```vue
<script setup>
const languageConfig = {
  'en-US': {
    Country: 'Country',
    Year: 'Year',
    Sales: 'Total Sales',
    Quantity: 'Units Sold'
  },
  'fr-FR': {
    Country: 'Pays',
    Year: 'Année',
    Sales: 'Ventes Totales',
    Quantity: 'Unités Vendues'
  },
  'de-DE': {
    Country: 'Land',
    Year: 'Jahr',
    Sales: 'Gesamtumsatz',
    Quantity: 'Verkaufte Einheiten'
  },
  'ar-SA': {
    Country: 'البلد',
    Year: 'السنة',
    Sales: 'إجمالي المبيعات',
    Quantity: 'الوحدات المباعة'
  }
};

const currentLocale = ref('en-US');
const currentLabels = ref(languageConfig['en-US']);

const switchLanguage = (locale) => {
  currentLocale.value = locale;
  currentLabels.value = languageConfig[locale];
};

const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country', caption: currentLabels.value.Country }],
  columns: [{ name: 'Year', caption: currentLabels.value.Year }],
  values: [{ name: 'Sales', caption: currentLabels.value.Sales }],
  filters: []
};
</script>
```

---

## Accessible Styling

Create visually accessible formatting that works for users with visual impairments.

### High Contrast Formatting
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  
  // Accessible conditional formatting
  conditionalFormatSettings: [
    {
      measure: 'Sales',
      condition: 'GreaterThan',
      value1: 100000,
      style: {
        backgroundColor: '#000000',
        color: '#FFFF00',      // High contrast yellow on black
        fontWeight: '700',
        fontSize: '14px'
      }
    },
    {
      measure: 'Sales',
      condition: 'LessThan',
      value1: 50000,
      style: {
        backgroundColor: '#FFFFFF',
        color: '#000000',      // High contrast black on white
        fontWeight: '700',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: '#000000'
      }
    }
  ],
  
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Color-Blind Friendly Palettes
```vue
<script setup>
// Avoid red-green only distinction
const colorBlindFriendlyPalette = {
  // Viridis palette: blue → green → yellow
  low: '#440154',      // Dark blue-purple
  medium: '#21908C',   // Teal
  high: '#FDE725'      // Yellow
};

const dataSourceSettings = {
  dataSourceSettings: pivotData,
  
  conditionalFormatSettings: [
    {
      measure: 'Sales',
      condition: 'LessThan',
      value1: 50000,
      style: {
        backgroundColor: colorBlindFriendlyPalette.low,
        color: '#FFFFFF',
        fontWeight: '700'
      }
    },
    {
      measure: 'Sales',
      condition: 'Between',
      value1: 50000,
      value2: 100000,
      style: {
        backgroundColor: colorBlindFriendlyPalette.medium,
        color: '#FFFFFF',
        fontWeight: '700'
      }
    },
    {
      measure: 'Sales',
      condition: 'GreaterThan',
      value1: 100000,
      style: {
        backgroundColor: colorBlindFriendlyPalette.high,
        color: '#000000',  // Dark text on light background
        fontWeight: '700'
      }
    }
  ],
  
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Font Size & Readability
```vue
<script setup>
const gridSettings = {
  rowHeight: 40,        // Larger rows for readability
  columnWidth: 150,     // Wider columns
  allowTextWrap: true   // Enable text wrapping for better readability
};

const dataSourceSettings = {
  dataSource: pivotData,
  
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>

<style>
/* Improve readability with CSS */
.e-pivotview {
  font-family: 'Arial', 'Helvetica', sans-serif;
  font-size: 14px;
  letter-spacing: 0.5px;
  line-height: 1.6;
}

.e-grid .e-rowcell {
  padding: 10px;
}

.e-grid .e-headercell {
  font-weight: 700;
  padding: 12px;
  font-size: 15px;
}
</style>
```

