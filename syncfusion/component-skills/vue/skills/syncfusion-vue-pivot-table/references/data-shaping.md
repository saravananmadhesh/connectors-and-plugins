# Data Shaping

## Table of Contents
- [Overview](#overview)
- [Defining Rows Axis](#defining-rows-axis)
- [Defining Columns Axis](#defining-columns-axis)
- [Defining Values Axis](#defining-values-axis)
- [Defining Filters Axis](#defining-filters-axis)
- [Field Hierarchy](#field-hierarchy)
- [Field Options](#field-options)
- [Filtering and Sorting](#filtering-and-sorting)
  - [Member Filtering](#member-filtering)
  - [Label Filtering](#label-filtering)
  - [Date Filtering](#date-filtering)
  - [Number Filtering](#number-filtering)
  - [Value Filtering](#value-filtering)
  - [Performance Optimization](#performance-optimization-for-large-datasets)
  - [Member Sorting](#member-sorting)
  - [Custom Sorting](#custom-sorting)
  - [Combining Multiple Filters](#combining-multiple-filters)

## Overview

Data shaping configures how PivotView organizes and aggregates data across rows, columns, values, and filters. This is the core configuration that transforms raw data into meaningful pivot tables.

## Defining Rows Axis

The rows axis displays field members vertically as row headers.

### Single Row Field
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [
    { name: 'Country', caption: 'Country' }
  ],
  columns: [
    { name: 'Year', caption: 'Year' }
  ],
  values: [
    { name: 'Sales', caption: 'Total Sales' }
  ],
  filters: []
};
</script>
```

### Multiple Row Fields (Hierarchy)
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [
    { name: 'Region', caption: 'Region' },
    { name: 'Country', caption: 'Country' },
    { name: 'City', caption: 'City' }
  ],
  // Creates hierarchical rows: Region > Country > City
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Row Field Properties
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
  rows: [
    {
      name: 'Country',              // Match data source field exactly
      caption: 'Country Name',      // Display name (optional)
      dataType: 'string',          // Data type: 'string', 'number', 'datetime', 'date', 'boolean'
      expandAll: false,            // Expand all headers by default (true) or collapse (false)
      showSubTotals: true          // Show subtotals for this field (true) or hide (false)
    }
  ],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: []
};
const height = 350;
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

## Defining Columns Axis

The columns axis displays field members horizontally as column headers.

### Single Column Field
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [
    { name: 'Quarter', caption: 'Quarter' }
  ],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Multiple Column Fields
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [
    { name: 'Year', caption: 'Year' },
    { name: 'Quarter', caption: 'Month' }
  ],
  values: [{ name: 'Sales' }],
  filters: []
};
</script>
```

### Column Field Properties
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
  rows: [{ name: 'Country' }],
  columns: [
    {
      name: 'Year',           // Field from data source
      caption: 'Year',        // Display label
      type: 'Sum',           // Aggregation type
      expandAll: true         // Expand all columns by default
    }
  ],
  values: [{ name: 'Sales' }],
  filters: []
};
const height = 350;
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

## Defining Values Axis

The values axis contains numeric fields that will be aggregated (summed, averaged, counted, etc.).

### Single Value Field
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [
    { name: 'Sales', caption: 'Total Sales', type: 'Sum' }
  ],
  filters: []
};
</script>
```

### Multiple Value Fields
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [
    { name: 'Revenue', caption: 'Total Revenue', type: 'Sum' },
    { name: 'Profit', caption: 'Net Profit', type: 'Sum' },
    { name: 'Units', caption: 'Units Sold', type: 'Count' },
    { name: 'Margin', caption: 'Margin %', type: 'Average' }
  ],
  filters: []
};
</script>
```

### Aggregation Types (type property)
| Type | Description | Use Case |
|------|-------------|----------|
| Sum | Total of all values | Revenue, Sales, Quantity |
| Count | Number of items | Orders, Transactions |
| Average | Mean value | Price per item, Rating |
| Min | Minimum value | Lowest price, Smallest order |
| Max | Maximum value | Highest price, Largest order |
| CountA | Non-empty count | Non-blank entries |
| StdDev | Standard deviation | Data spread analysis |
| Var | Variance | Statistical analysis |
| DistinctCount | Unique values | Unique customers |

### Value Field Properties
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
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [
    {
      name: 'Sales',           // Field from data source
      caption: 'Total Sales',  // Display name
      type: 'Sum',            // Aggregation: Sum, Count, Average, Min, Max, DifferenceFrom, PercentageOfDifferenceFrom, etc.
      format: 'C0',           // Format as currency
      baseField: 'Country',   // Comparison field for DifferenceFrom/PercentageOfDifferenceFrom/PercentageOfParentTotal
      baseItem: 'France'      // Comparison member for DifferenceFrom/PercentageOfDifferenceFrom
    }
  ],
  filters: []
};
const height = 350;
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

## Defining Filters Axis

The filters axis contains fields that filter data across all rows and columns.

### Single Filter
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: [
    { name: 'Region', caption: 'Region' }
  ]
};
</script>
```

### Multiple Filters
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: [
    { name: 'Region', caption: 'Region' },
    { name: 'Segment', caption: 'Segment' },
    { name: 'Category', caption: 'Category' }
  ]
};
</script>
```

### Filter Properties

Filter fields in the `filters` axis are configured like any other field:

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
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Sales' }],
  filters: [
    {
      name: 'Region',        // Field from data source
      caption: 'Region'      // Display name
      dataType: 'string',   // Data type
    }
  ]
};
const height = 350;
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

**Note:** Including/excluding specific filter members is configured separately using `filterSettings` (see the Filtering section below).

## Field Hierarchy

Multiple fields in same axis create drill-down hierarchy:

### Example Hierarchy
```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  
  // Rows: Region > Country > City (drill-down levels)
  rows: [
    { name: 'Region', caption: 'Region' },
    { name: 'Country', caption: 'Country' },
    { name: 'City', caption: 'City' }
  ],
  
  // Columns: Year > Quarter (drill-down levels)
  columns: [
    { name: 'Year', caption: 'Year' },
    { name: 'Quarter', caption: 'Quarter' }
  ],
  
  values: [
    { name: 'Sales', caption: 'Total Sales' }
  ],
  
  filters: [
    { name: 'Product', caption: 'Product' }
  ]
};
</script>
```

### Hierarchy Characteristics
- **Level Order Matters**: First field is top-level
- **Expandable**: Users can expand/collapse each level
- **Subtotals**: Calculated at each level
- **Drill-Down**: Users can drill into details

## Field Options

### Complete Field Configuration Example
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
  
  // Row fields with hierarchy
  rows: [
    {
      name: 'Region',
      caption: 'Region Name',
      expandAll: false
    },
    {
      name: 'Country',
      caption: 'Country Name',
      expandAll: true
    }
  ],
  
  // Column fields
  columns: [
    {
      name: 'Year',
      caption: 'Production Year',
      expandAll: true
    },
    {
      name: 'Quarter',
      caption: 'Quarter'
    }
  ],
  
  // Value fields with formatting
  values: [
    {
      name: 'Units',
      caption: 'Units Sold',
      type: 'Sum'
    },
    {
      name: 'Amount',
      caption: 'Sold Amount',
      type: 'Sum'
    }
  ],
  
  // Filter fields
  filters: [
    {
      name: 'Product',
      caption: 'Product Category'
    }
  ],
  
  // Format settings for values
  formatSettings: [
    { name: 'Units', format: 'N0' },
    { name: 'Amount', format: 'C0' }
  ]
};
const height = 350;
</script>
```

### Best Practices for Data Shaping
1. **Field Naming**: Match field names exactly with your data source
2. **Captions**: Use user-friendly captions for display
3. **Hierarchy Order**: Arrange fields logically for drill-down
4. **Value Types**: Select appropriate aggregation functions
5. **Formatting**: Apply consistent format settings
6. **Filters**: Use filters for master filtering needs

## Filtering and Sorting

### Member Filtering

Member filtering displays the Pivot Table with selective records based on the members you choose to include or exclude. By default, member filtering is enabled through the `allowMemberFilter` property.

#### Programmatic Member Filtering

Configure filtering using the `filterSettings` property:

```vue
<script setup>
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { provide } from "vue";

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowMemberFilter: true,
  filterSettings: [
    { 
      name: 'Country',           // Field to filter
      type: 'Exclude',           // Include or Exclude
      items: ['United States']   // Members to exclude
    }
  ],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [{ name: 'Sold' }, { name: 'Amount' }],
  filters: []
};

provide('pivotview', [FieldList]);
</script>
```

#### Filter Settings Properties
| Property | Description | Example |
|----------|-------------|---------|
| `name` | Field name to filter | `'Country'` |
| `type` | Filter type: Include/Exclude | `'Exclude'` |
| `items` | Array of member values | `['USA', 'Canada']` |
| `levelCount` | Hierarchy depth (OLAP only) | `2` |

#### Select/Deselect All Members
The member filter dialog includes an **All** option allowing you to select/deselect all members:
- Unchecking "All" deselects all members
- At least one member must be selected to apply filter
- OK button is disabled if no members selected

#### Search Members in Filter Dialog
Built-in search box allows finding members by typing part of their name - useful for large datasets.

#### Sort Members in Filter
Built-in sort icons allow arranging members in:
- Ascending order
- Descending order  
- Original order (default)

### Label Filtering

Label filtering displays only data with specific header text across row and column fields.

#### Text/Label Filtering Configuration

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowLabelFilter: true,
  filterSettings: [
    {
      name: 'Country',           // Field to filter
      type: 'Label',             // Label filter type
      condition: 'Contains',     // operator
      value1: 'United'           // Filter value
    }
  ]
};
</script>
```

#### Label Filter Operators
| Operator | Description |
|----------|-------------|
| Equals | Matches exact text |
| DoesNotEquals | Does not match text |
| BeginWith | Begins with text |
| DoesNotBeginWith | Does not begin with text |
| EndsWith | Ends with text |
| DoesNotEndsWith | Does not end with text |
| Contains | Contains text |
| DoesNotContains | Does not contain text |
| GreaterThan | Text is alphabetically greater |
| GreaterThanOrEqualTo | Greater than or equal |
| LessThan | Text is alphabetically less |
| LessThanOrEqualTo | Less than or equal |
| Between | Between start and end text |
| NotBetween | Not between start and end text |

### Date Filtering

Date filtering displays records based on date values:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowLabelFilter: true,
  formatSettings: [
    { name: 'Year', format: 'dd/MM/yyyy', type: 'date' }
  ],
  filterSettings: [
    {
      name: 'Year',
      type: 'Date',
      condition: 'Before',
      value1: new Date('2016-01-01')
    }
  ]
};
</script>
```

#### Date Filter Operators
| Operator | Description |
|----------|-------------|
| Equals | Matches the given date |
| DoesNotEquals | Does not match date |
| Before | Before the given date |
| BeforeOrEqualTo | Before or equal to date |
| After | After the given date |
| AfterOrEqualTo | After or equal to date |
| Between | Between start and end dates |
| NotBetween | Not between start and end dates |

### Number Filtering

Number filtering displays records based on numeric values:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowLabelFilter: true,
  filterSettings: [
    {
      name: 'Amount',
      type: 'Number',
      condition: 'LessThan',
      value1: '40000'
    }
  ]
};
</script>
```

#### Number Filter Operators
| Operator | Description |
|----------|-------------|
| Equals | Matches the number |
| DoesNotEquals | Does not match number |
| GreaterThan | Greater than the value |
| GreaterThanOrEqualTo | Greater than or equal |
| LessThan | Less than the value |
| LessThanOrEqualTo | Less than or equal |
| Between | Between start and end numbers |
| NotBetween | Not between start and end numbers |

### Value Filtering

Value filtering performs filtering based on aggregate values. For example, show data where total sales per country exceeds 2000:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowValueFilter: true,
  filterSettings: [
    {
      name: 'Country',           // Field to filter
      type: 'Value',             // Value filter type
      measure: 'Sold',           // Value field name
      condition: 'GreaterThan',  // Operator
      value1: '2000'             // Threshold value
    }
  ],
  columns: [{ name: 'Year' }, { name: 'Quarter' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  values: [{ name: 'Sold' }, { name: 'Amount' }]
};
</script>
```

#### Value Filter Operators
| Operator | Description |
|----------|-------------|
| Equals | Matches the value |
| DoesNotEquals | Does not match value |
| GreaterThan | Value is greater |
| GreaterThanOrEqualTo | Greater than or equal |
| LessThan | Value is lesser |
| LessThanOrEqualTo | Less than or equal |
| Between | Between start and end values |
| NotBetween | Not between start and end values |

### Performance Optimization for Large Datasets

#### Limit Member Display

Control member display in filter dialogs using `maxNodeLimitInMemberEditor` (default: 1000):

```vue
<script setup>
const pivotSettings = {
  dataSourceSettings: dataSourceSettings,
  maxNodeLimitInMemberEditor: 500  // Show first 500 members only
};
</script>
```

When exceeded, additional members shown with count indicator.

#### On-Demand Member Loading (OLAP Only)

Enable with `loadOnDemandInMemberEditor` property (default: true):
- First level members load initially
- Subsequent levels load on expansion
- Improves performance for deep hierarchies

#### Load Members by Level Count

Specify `levelCount` in `filterSettings` to control hierarchy depth (OLAP only):

```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height"></ejs-pivotview>
  </div>
</template>

<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";

// ✓ SECURE: Use OLAP server endpoint
const dataSourceSettings = {
  type: 'OLAP',
  url: 'https://your-ssas-server/olap/msmdpump.dll',
  catalog: 'Adventure Works DW 2008 SE',
  cube: 'Adventure Works',
  rows: [{ name: '[Date].[Fiscal]' }],
  columns: [{ name: '[Product].[Product Categories]' }],
  values: [{ name: '[Measures].[Internet Sales Amount]' }],
  filterSettings: [
    {
      name: '[Customer].[Customer Geography]',
      items: ['[Customer].[Customer Geography].[State-Province].&[NSW]&[AU]'],
      type: 'Exclude',
      levelCount: 2  // ← Loads Country and State-Province levels (2 hierarchy levels)
    }
  ]
};
const height = 350;
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Member Sorting

#### Sort Members by Value

Sort members by their aggregated values:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year' }],
  rows: [
    { name: 'Country' },
    { name: 'Products' }
  ],
  values: [{ name: 'Sales', type: 'Sum' }],
  // Members sorted by Sales value
  sortSettings: [
    {
      name: 'Country',
      order: 'Descending'  // Sort by descending sales
    }
  ]
};
</script>
```

#### Custom Sorting

Apply custom sort logic:

```vue
<script setup>
sortSettings: [
  {
    name: 'Country',
    order: 'Custom',
    customComparer: (a, b) => {
      // Custom sort logic
      return a.localeCompare(b);
    }
  }
]
</script>
```

### Combining Multiple Filters

Apply multiple filters simultaneously:

```vue
<script setup>
const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowMemberFilter: true,
  allowLabelFilter: true,
  allowValueFilter: true,
  filterSettings: [
    // Member filter
    { name: 'Country', type: 'Exclude', items: ['Canada'] },
    // Label filter
    { name: 'Products', type: 'Label', condition: 'Contains', value1: 'Desk' },
    // Value filter
    { name: 'Region', type: 'Value', measure: 'Sales', condition: 'GreaterThan', value1: '5000' }
  ],
  columns: [{ name: 'Year' }],
  rows: [{ name: 'Country' }, { name: 'Products' }, { name: 'Region' }],
  values: [{ name: 'Sales' }]
};
</script>
```

> Multiple filters work with AND logic - all conditions must be satisfied.

