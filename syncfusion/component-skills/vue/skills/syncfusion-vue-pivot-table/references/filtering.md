# Filtering

## Table of Contents
- [Overview](#overview)
- [Member Filtering](#member-filtering)
  - [Enable Member Filtering](#enable-member-filtering)
  - [Option to Select and Unselect All Members](#option-to-select-and-unselect-all-members)
  - [Provision to Search Specific Members](#provision-to-search-specific-members)
  - [Option to Sort Members](#option-to-sort-members)
  - [Performance Tips](#performance-tips)
  - [Loading Members On-Demand (OLAP)](#loading-members-on-demand-olap)
  - [Loading Members Based on Level Number (OLAP)](#loading-members-based-on-level-number-olap)
  - [Append Current Selection to Existing Filters](#append-current-selection-to-existing-filters)
- [Label Filtering](#label-filtering)
  - [Enable Label Filtering](#enable-label-filtering)
  - [Filtering String Data Type](#filtering-string-data-type)
  - [Filtering Number Data Type](#filtering-number-data-type)
  - [Filtering Date Data Type](#filtering-date-data-type)
  - [Clearing the Existing Label Filter](#clearing-the-existing-label-filter)
- [Value Filtering](#value-filtering)
  - [Enable Value Filtering](#enable-value-filtering)
  - [Top and Bottom Value Filtering](#top-and-bottom-value-filtering)
  - [Clearing the Existing Value Filter](#clearing-the-existing-value-filter)
- [Events](#events)
  - [memberFiltering](#memberfiltering)
  - [memberEditorOpen](#membereditoropen)
  - [actionBegin](#actionbegin)
  - [actionComplete](#actioncomplete)
  - [actionFailure](#actionfailure)
- [Best Practices](#best-practices)

## Overview

Filtering helps you focus on specific data by showing only the records you need in the Pivot Table. This allows you to analyze relevant information more effectively by including or excluding specific members through the user interface or programmatically.

The Pivot Table offers three types of filtering options:

- **Member filtering** – include or exclude specific members per field
- **Label filtering** – filter by header text (string, number, or date)
- **Value filtering** – filter by aggregated values, including Top and Bottom N

> When all filtering options are disabled programmatically, the filter icon will not appear in the field list or grouping bar interface.

## Member Filtering

Member filtering displays the Pivot Table with selective records based on the members you choose to include or exclude in each field. By default, member filtering is enabled through the [`allowMemberFilter`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/dataSourceSettingsModel#allowmemberfilter) property in the [`dataSourceSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#datasourcesettings).

Users can apply member filters at runtime by clicking the filter icon next to any field in the row, column, and filter axes, available in both the field list and grouping bar interfaces.

### Enable Member Filtering

By default, `allowMemberFilter` is **true**. You can configure filtering programmatically using the [`filterSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/idataoptions#filtersettings) property during the initial rendering of the component.

The essential settings required to add filter criteria are:

- [`name`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#name): Sets the appropriate field name for filtering.
- [`type`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#type): Specifies the filter type as **Include** or **Exclude** to include or exclude field members respectively.
- [`items`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#items): Defines the members that need to be either included or excluded from the display.
- [`levelCount`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/ifilter#levelcount): Sets the level count of the field to fetch data from the cube. **Note: This property is applicable only for OLAP data sources.**

> When you specify unavailable or inappropriate members in the include or exclude filter items collection, they will be ignored.

```vue
<template>
  <div id="app">
    <ejs-pivotview :height="height" :dataSourceSettings="dataSourceSettings"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  drilledMembers: [{ name: 'Country', items: ['France'] }],
  filterSettings: [{ name: 'Country', type: 'Exclude', items: ['United States'] }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
const height = 350;
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

```vue
<template>
  <div id="app">
    <ejs-pivotview :height="height" :dataSourceSettings="dataSourceSettings"> </ejs-pivotview>
  </div>
</template>
<script>
import { PivotViewComponent } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

export default {
  name: "App",
  components: {
    "ejs-pivotview": PivotViewComponent
  },
  data() {
    return {
      dataSourceSettings: {
        dataSource: pivotData,
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        filterSettings: [{ name: 'Country', type: 'Exclude', items: ['United States'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
      },
      height: 350
    }
  }
}
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Option to Select and Unselect All Members

This option lets you quickly manage all members at once, saving time when working with large datasets. The member filter dialog includes an **All** option that provides a convenient way to select or deselect all available members with a single click.

- **Check the "All" option**: Selects all members in the list.
- **Uncheck the "All" option**: All members become deselected.
- **Intermediate (partially checked) state**: When you manually select some members while others remain unselected, the **All** option displays this state to show that the list contains both selected and unselected members.

> **Note:** When all members are deselected, the **OK** button becomes disabled. You must select at least one member to apply the filter and display data in the Pivot Table.

### Provision to Search Specific Members

This option helps you quickly locate specific members without scrolling through long lists. The member filter dialog includes a built-in search box that allows you to find members by typing part of their name.

Simply enter the starting characters of the member name you want to find, and the list will automatically filter to show only matching members. This makes it easy to locate and select specific members, especially when dealing with large datasets.

### Option to Sort Members

This option allows you to organize members in a logical order for easier selection and review. The member filter dialog provides built-in sort icons that let you arrange members in ascending or descending order.

- Click the ascending sort icon to arrange members from A to Z (or lowest to highest for numerical values).
- Click the descending sort icon to arrange them from Z to A (or highest to lowest).
- When neither sorting option is selected, members appear in their original order as retrieved from the data source.

### Performance Tips

The member filter dialog improves loading performance when working with large datasets by limiting the number of members displayed initially. This helps you work with extensive data without experiencing delays while the member list loads.

You can control how many members are displayed in the member filter dialog using the [`maxNodeLimitInMemberEditor`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#maxnodelimitinmembereditor) property. By default, this property is set to **1000**. When your data contains more members than this limit, only the specified number will be shown initially, and a message will indicate how many additional members are available.

```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showGroupingBar="showGroupingBar"
      :maxNodeLimitInMemberEditor="maxNodeLimitInMemberEditor"> </ejs-pivotview>
  </div>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, GroupingBar } from "@syncfusion/ej2-vue-pivotview";

function data(count) {
  let result = [];
  let dt = 0;
  for (let i = 1; i < count + 1; i++) {
    dt++;
    let round;
    let toString = i.toString();
    if (toString.length === 1) {
      round = "0000" + i;
    } else if (toString.length === 2) {
      round = "000" + i;
    } else if (toString.length === 3) {
      round = "00" + i;
    } else if (toString.length === 4) {
      round = "0" + i;
    } else {
      round = toString;
    }
    result.push({
      ProductID: "PRO-" + round,
      Year: "FY " + (dt + 2013),
      Price: Math.round(Math.random() * 5000) + 5000,
      Sold: Math.round(Math.random() * 80) + 10
    });
    if (dt / 4 == 1) {
      dt = 0;
    }
  }
  return result;
}
const dataSourceSettings = {
  dataSource: data(1000),
  enableSorting: false,
  expandAll: true,
  formatSettings: [{ name: 'Price', format: 'C0' }],
  rows: [{ name: 'ProductID' }],
  columns: [{ name: 'Year' }],
  values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }]
};
const height = 350;
const showGroupingBar = true;
const maxNodeLimitInMemberEditor = 100;

provide('pivotview', [GroupingBar]);
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showGroupingBar="showGroupingBar"
      :maxNodeLimitInMemberEditor="maxNodeLimitInMemberEditor"> </ejs-pivotview>
  </div>
</template>

<script>
import { PivotViewComponent, GroupingBar } from "@syncfusion/ej2-vue-pivotview";

function data(count) {
  let result = [];
  let dt = 0;
  for (let i = 1; i < count + 1; i++) {
    dt++;
    let round;
    let toString = i.toString();
    if (toString.length === 1) {
      round = "0000" + i;
    } else if (toString.length === 2) {
      round = "000" + i;
    } else if (toString.length === 3) {
      round = "00" + i;
    } else if (toString.length === 4) {
      round = "0" + i;
    } else {
      round = toString;
    }
    result.push({
      ProductID: "PRO-" + round,
      Year: "FY " + (dt + 2013),
      Price: Math.round(Math.random() * 5000) + 5000,
      Sold: Math.round(Math.random() * 80) + 10
    });
    if (dt / 4 == 1) {
      dt = 0;
    }
  }
  return result;
}
export default {
  name: "App",
  components: {
    "ejs-pivotview": PivotViewComponent
  },
  data() {
    return {
      dataSourceSettings: {
        dataSource: data(1000),
        enableSorting: false,
        expandAll: true,
        formatSettings: [{ name: 'Price', format: 'C0' }],
        rows: [{ name: 'ProductID' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }]
      },
      height: 350,
      showGroupingBar: true,
      maxNodeLimitInMemberEditor: 100
    }
  },
  provide: {
    pivotview: [GroupingBar]
  }
}
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

When the member count exceeds your set limit, you can use the search option to find specific members beyond the displayed range. For example, if your data contains 5000 members named "Node 1", "Node 2", "Node 3", and so on, and you set the [`maxNodeLimitInMemberEditor`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#maxnodelimitinmembereditor) property to **500**, only the first 500 members will appear by default. The dialog will show a message like "4500 more items. Search to refine further." To access members 501 to 5000, type the starting characters in the search box to locate the desired members. Once the members appear in the list, you can select or deselect them to apply your filtering preferences.

### Loading Members On-Demand (OLAP)

> This option is applicable only for OLAP data sources.

This option improves the performance of the member editor by loading members only when needed, rather than loading all members at once. You can enable this by setting the [`loadOnDemandInMemberEditor`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#loadondemandinmembereditor) property to **true**. When enabled, only the first level members are loaded initially from the OLAP cube, allowing the member editor to open quickly without performance delays.

By default, this property is set to **true** and search operations will only apply to the currently loaded level members. You can load additional level members using either of the following methods:

- **Expand individual members**: Click the expander button next to any member to load only its child members.
- **Load by level selection**: Choose a specific level from the dropdown list to load all members up to that selected level from the cube.

This approach prevents performance issues when working with hierarchies that contain large numbers of members. Once level members are loaded, they remain available for all subsequent operations (such as reopening the dialog or drag-and-drop actions) and persist until you refresh the web page.

```vue
<template>
    <div id="app">
        <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showFieldList="showFieldList"
            :loadOnDemandInMemberEditor='loadOnDemandInMemberEditor'> </ejs-pivotview>
    </div>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";

const dataSourceSettings = {
    catalog: 'Adventure Works DW 2008 SE',
    cube: 'Adventure Works',
    providerType: 'SSAS',
    enableSorting: true,
    url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
    localeIdentifier: 1033,
    rows: [
        { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' },
    ],
    columns: [
        { name: '[Product].[Product Categories]', caption: 'Product Categories' },
        { name: '[Measures]', caption: 'Measures' },
    ],
    values: [
        { name: '[Measures].[Customer Count]', caption: 'Customer Count' },
        { name: '[Measures].[Internet Sales Amount]', caption: 'Internet Sales Amount' },
        { name: 'Order on Discount', isCalculatedField: true }
    ],
    filters: [
        { name: '[Date].[Fiscal]', caption: 'Date Fiscal' },
    ],
    calculatedFieldSettings: [
        {
            name: 'BikeAndComponents',
            formula: '([Product].[Product Categories].[Category].[Bikes] + [Product].[Product Categories].[Category].[Components] )',
            hierarchyUniqueName: '[Product].[Product Categories]',
            formatString: 'Standard'
        },
        {
            name: 'Order on Discount',
            formula: '[Measures].[Order Quantity] + ([Measures].[Order Quantity] * 0.10)',
            formatString: 'Currency'
        }
    ]
};
const loadOnDemandInMemberEditor = true;
const showFieldList = true;
const height = 350;

provide('pivotview', [FieldList]);
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

In the example above, the "Customer Geography" dimension loads with only the first level (Country) initially. Search operations will apply only to the "Country" level members. You can then load the next level members (State-Province) on-demand in two ways:

- **Expand specific countries**: When you expand "Australia", the "State-Province" members load only for Australia.
- **Load all states by level**: When you select "State-Province" from the dropdown list, all "State-Province" members load across all countries (Australia, Canada, France, etc.).

Once loaded, these members are stored internally and remain available until you refresh the page.

When the [`loadOnDemandInMemberEditor`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#loadondemandinmembereditor) property is set to **false**, all members from all levels are loaded during the initial setup. This approach executes a single query to retrieve all members at once. While this may cause slower performance when opening the member editor due to the large number of members being fetched, expand and search operations will be faster since all members are already available.

### Loading Members Based on Level Number (OLAP)

> This property is applicable only for OLAP data sources.

This option enables you to control the depth of member loading by specifying how many levels should be loaded initially. By setting the [`levelCount`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/ifilter#levelcount) property in the [`filterSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/idataoptions#filtersettings), you can improve performance and focus filtering operations on specific hierarchy levels.

The [`levelCount`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/ifilter#levelcount) property is set to **1** by default, which means only the first level members are loaded initially. When you apply filters or search operations, they will only affect the members within the loaded levels.

```vue
<template>
    <div id="app">
        <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showFieldList="showFieldList">
        </ejs-pivotview>
    </div>
</template>

<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";

const dataSourceSettings = {
    catalog: 'Adventure Works DW 2008 SE',
    cube: 'Adventure Works',
    providerType: 'SSAS',
    enableSorting: true,
    url: 'https://bi.syncfusion.com/olap/msmdpump.dll',
    localeIdentifier: 1033,
    rows: [
        { name: '[Customer].[Customer Geography]', caption: 'Customer Geography' },
    ],
    columns: [
        { name: '[Product].[Product Categories]', caption: 'Product Categories' },
        { name: '[Measures]', caption: 'Measures' },
    ],
    values: [
        { name: '[Measures].[Customer Count]', caption: 'Customer Count' },
        { name: '[Measures].[Internet Sales Amount]', caption: 'Internet Sales Amount' },
        { name: 'Order on Discount', isCalculatedField: true }
    ],
    filters: [
        { name: '[Date].[Fiscal]', caption: 'Date Fiscal' },
    ],
    calculatedFieldSettings: [
        {
            name: 'BikeAndComponents',
            formula: '([Product].[Product Categories].[Category].[Bikes] + [Product].[Product Categories].[Category].[Components] )',
            hierarchyUniqueName: '[Product].[Product Categories]',
            formatString: 'Standard'
        },
        {
            name: 'Order on Discount',
            formula: '[Measures].[Order Quantity] + ([Measures].[Order Quantity] * 0.10)',
            formatString: 'Currency'
        }
    ],
    filterSettings: [
        {
            name: '[Customer].[Customer Geography]', items: ['[Customer].[Customer Geography].[State-Province].&[NSW]&[AU]'], type: 'Exclude',
            levelCount: 2
        }
    ]
};
const showFieldList = true;
const height = 350;

provide('pivotview', [FieldList]);
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

In the above example, the [`levelCount`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/ifilter#levelcount) is set to **2** for the "Customer Geography" dimension in [`filterSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/idataoptions#filtersettings). This loads both the "Country" and "State-Province" levels during the initial loading process. Any search or filter operations will be applied only to the members within these two levels. To access members from deeper levels like "City", you can either expand the respective "State-Province" node or select the "City" level from the dropdown list.

### Append Current Selection to Existing Filters

By default, when a filter is applied and a new field member is selected, the Pivot Table replaces the previous selection. Enabling the **Add current selection to filter** option ensures that each new selection is added to the existing filter instead of replacing it. This allows you to select multiple items incrementally without losing earlier selections.

To append current selections to existing filters:

1. Open the Filter dialog.
2. Search for the required field member and select it.
3. Then, select the **Add current selection to filter** option in the Filter dialog.
4. Click the **OK** button.

> **Why use this:** When iteratively building a filter (for example, picking a few countries one at a time from a long list), this option preserves your earlier selections so you do not need to find and re-check them every time you add a new one.

## Label Filtering

Label filtering allows you to display only the data with specific header text across row and column fields, making it easier to focus on relevant information in your Pivot Table. This filtering works with three types of data:

- String data type
- Number data type
- Date data type

### Enable Label Filtering

To enable label filtering, set the [`allowLabelFilter`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/dataSourceSettingsModel#allowlabelfilter) property to **true** in the [`dataSourceSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#datasourcesettings). Once enabled, you can access the filtering options by clicking the filter icon next to any field in the row or column axis of the field list or grouping bar. This opens the filtering dialog where you can navigate to the "Label" tab to apply your label filtering criteria.

```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showFieldList="showFieldList">
    </ejs-pivotview>
  </div>
</template>
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowLabelFilter: true,
  drilledMembers: [{ name: 'Country', items: ['France'] }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: [],
  showSubTotals: false
};
const height = 350;
const showFieldList = true;

provide('pivotview', [FieldList]);
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

> In label filtering UI, based on the field chosen, its member data type is automatically recognized and the filtering operation is carried out. Where as in code-behind, you need to define the data type through a property and it is explained in the immediate sections below.

### Filtering String Data Type

String-based label filtering enables you to programmatically show only data that matches specific text values in your row and column fields, making it easier to focus on the exact information you need.

This filtering approach is specifically designed for fields containing string data type members. You can configure the filtering through the [`filterSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/ifilter) property in your code. The following properties are required for label filtering:

- [`name`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#name): Specifies the field name to apply the filter.
- [`type`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#type): Sets the filter type as **Label** for the specified field.
- [`condition`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#condition): Defines the operator type such as **Equals**, **GreaterThan**, **LessThan**, and others.
- [`value1`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value1): Sets the primary value for comparison.
- [`value2`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value2): Sets the secondary value for comparison. This property is only applicable for operators like **Between** and **NotBetween**.
- [`selectedField`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#selectedfield): Specifies the level name of a dimension where the filter should be applied. **NOTE: This property is applicable only for OLAP data sources.**

For example, to display only countries containing "United" in their name from a "Country" field, set the [`value1`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value1) property to "United" and the [`condition`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#condition) property to **Contains**.

The following table shows all available **operators** for label filtering:

| Operator | Description |
|------|-------------|
| Equals | Shows records that exactly match the specified text. |
| DoesNotEquals | Shows records that do not match the specified text. |
| BeginWith | Shows records that start with the specified text. |
| DoesNotBeginWith | Shows records that do not start with the specified text. |
| EndsWith | Shows records that end with the specified text. |
| DoesNotEndsWith | Shows records that do not end with the specified text. |
| Contains | Shows records that contain the specified text anywhere. |
| DoesNotContains | Shows records that do not contain the specified text. |
| GreaterThan | Shows records where the text value is alphabetically greater. |
| GreaterThanOrEqualTo | Shows records where the text value is alphabetically greater than or equal. |
| LessThan | Shows records where the text value is alphabetically less. |
| LessThanOrEqualTo | Shows records where the text value is alphabetically less than or equal. |
| Between | Shows records with text values that fall between two specified values. |
| NotBetween | Shows records with text values that do not fall between two specified values. |

```vue
<template>
  <div id="app">
    <ejs-pivotview :height="height" :dataSourceSettings="dataSourceSettings"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowLabelFilter: true,
  filterSettings: [{ name: 'Country', type: 'Label', condition: 'GreaterThan', value1: 'United Kingdom' }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  filters: []
};
const height = 350;
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Filtering Number Data Type

Filter numeric data programmatically to display only values that meet specific numeric conditions, helping you analyze data patterns and ranges more effectively. This filtering approach is specifically designed for fields containing numeric data types and follows the same configuration method as string data filtering, with one key difference: set the [`type`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#type) property to **Number** enumeration instead of **Label**.

To filter numeric values, specify the filtering criteria using the following properties:

- [`value1`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value1): The primary value for comparison
- [`condition`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#condition): The comparison operator
- [`value2`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value2): The secondary value (required for **Between** and **NotBetween** conditions)

For example, to display only sales data where the "Sold" field values are less than 40000, set [`value1`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value1) to "40000" and [`condition`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#condition) to **LessThan**.

> The following operators are supported for number data type: **Equals**, **DoesNotEquals**, **GreaterThan**, **GreaterThanOrEqualTo**, **LessThan**, **LessThanOrEqualTo**, **Between**, and **NotBetween**.

> Number filtering is available only when the field contains numeric data format.

```vue
<template>
  <div id="app">
    <ejs-pivotview :height="height" :dataSourceSettings="dataSourceSettings"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowLabelFilter: true,
  filterSettings: [{ name: 'Amount', type: 'Number', condition: 'LessThan', value1: '40000' }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }],
  rows: [{ name: 'Amount', caption: 'Sold Amount' }],
  filters: [{ name: 'Country' }, { name: 'Products' }]
};
const height = 350;
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Filtering Date Data Type

This filtering option makes it simple to filter data based on date values in your fields, helping you quickly focus on records from specific time periods. This type of filtering is only available for fields that contain date data types and can be configured programmatically using the same approach as explained in the section above, with one key difference: set the [`type`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#type) property to **Date**.

To apply date filtering, specify your filtering criteria using the [`value1`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value1) and [`condition`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#condition) properties. For example, if you have a "Delivery Date" field and want to show delivery records from before a specific date like "2019-01-07", set the [`value1`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value1) property to "2019-01-07" and the [`condition`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#condition) property to **Before**. This will display only the records with delivery dates before January 7, 2019 in your Pivot Table.

> You can use the following operators with date data type filtering: **Equals**, **DoesNotEquals**, **Before**, **BeforeOrEqualTo**, **After**, **AfterOrEqualTo**, **Between**, and **NotBetween**.

> Date filtering is available only when the field has date type [`formatSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/formatSettings) configured.

```vue
<template>
  <div id="app">
    <ejs-pivotview :height="height" :dataSourceSettings="dataSourceSettings"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowLabelFilter: true,
  drilledMembers: [{ name: 'Country', items: ['France'] }],
  formatSettings: [{ name: 'Year', format: 'dd/MM/yyyy-hh:mm', type: 'date' }],
  filterSettings: [{ name: 'Year', type: 'Date', condition: 'Before', value1: new Date('2016') }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  filters: []
};
const height = 350;
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Clearing the Existing Label Filter

Users can clear the applied label filter by clicking the **Clear** option at the bottom of the filter dialog. This option is located under the **Label** tab for string and number type filtering, and under the **Date** tab for date type filtering.

## Value Filtering

Value filtering allows you to filter data based on aggregated values from measure fields, helping you focus on specific data ranges that meet your criteria.

### Enable Value Filtering

You can enable value filtering by setting the [`allowValueFilter`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/dataSourceSettingsModel#allowvaluefilter) property to **true** in the [`dataSourceSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#datasourcesettings). Once enabled, click the filter icon next to any field in the row or column axis within the field list or grouping bar. A filtering dialog will appear where you can navigate to the "Value" tab to perform value filtering operations.

```vue
<template>
  <div id="app">
    <ejs-pivotview :height="height" :dataSourceSettings="dataSourceSettings"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowValueFilter: true,
  drilledMembers: [{ name: 'Country', items: ['France'] }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  filters: []
};
const height = 350;
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

You can also configure value filtering programmatically using the [`filterSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/idataoptions#filtersettings) property. The following properties are required for value filtering:

- [`name`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#name): Specifies the field name to which the filter applies.
- [`type`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#type): Sets the filter type as **Value**.
- [`measure`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#measure): Specifies the value field name used for filtering.
- [`condition`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#condition): Defines the comparison operator such as **Equals**, **GreaterThan**, **LessThan**, or **Top** / **Bottom**.
- [`value1`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value1): Sets the comparison value, the start value for range operations, or the N value for Top/Bottom filters.
- [`value2`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value2): Sets the end value, applicable only for **Between** and **NotBetween** operators.
- [`selectedField`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#selectedfield): Specifies the dimension level name where filter settings apply. **Note: This property is only applicable for OLAP data sources.**

For example, to display data where the total sum of units sold for each country exceeds 1500, set the [`value1`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#value1) to "1500" and [`condition`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/iFilter#condition) to **GreaterThan** for the "Country" field.

The following table shows the available operators for value filtering:

| Operator | Description |
|------|-------------|
| Equals | Shows records that match the specified value. |
| DoesNotEquals | Shows records that do not match the specified value. |
| GreaterThan | Shows records where the value is greater than the specified value. |
| GreaterThanOrEqualTo | Shows records where the value is greater than or equal to the specified value. |
| LessThan | Shows records where the value is less than the specified value. |
| LessThanOrEqualTo | Shows records where the value is less than or equal to the specified value. |
| Between | Shows records with values between the specified start and end values. |
| NotBetween | Shows records with values outside the specified start and end values. |
| **Top** | **Top N members by highest values (client-side only).** |
| **Bottom** | **Bottom N members by lowest values (client-side only).** |

```vue
<template>
  <div id="app">
    <ejs-pivotview :height="height" :dataSourceSettings="dataSourceSettings"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowValueFilter: true,
  drilledMembers: [{ name: 'Country', items: ['France'] }],
  filterSettings: [{ name: 'Country', measure: 'Sold', type: 'Value', condition: 'GreaterThan', value1: '2000' }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  filters: []
};
const height = 350;
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### Top and Bottom Value Filtering

The **Top** and **Bottom** operators let you show only the top N or bottom N members for a field, based on the aggregated value of a chosen measure. They are useful when you want to focus on best/worst performers (for example, "Top 5 countries by Sold units" or "Bottom 3 products by Amount").

Key points to remember when using Top/Bottom:

- They are evaluated **client-side**, so they apply to the data already loaded into the Pivot Table. They are not pushed to the data source.
- `value1` in the `filterSettings` entry represents the count **N** (for example, `5` for Top 5), not a value to compare against.
- The `measure` property identifies which aggregated measure is used to rank the members.
- The `condition` is set to **`Top`** or **`Bottom`**.
- Combine with `allowValueFilter: true` so the operator is available from the filter dialog as well.

**Programmatic example – Top 5 Countries by Units Sold:**

```vue
<template>
  <div id="app">
    <ejs-pivotview :height="height" :dataSourceSettings="dataSourceSettings"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowValueFilter: true,
  filterSettings: [{ name: 'Country', measure: 'Sold', type: 'Value', condition: 'Top', value1: 5 }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  filters: []
};
const height = 350;
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

**Programmatic example – Bottom 3 Products by Sold Amount:**

```vue
<template>
  <div id="app">
    <ejs-pivotview :height="height" :dataSourceSettings="dataSourceSettings"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { PivotViewComponent as EjsPivotview } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowValueFilter: true,
  filterSettings: [{ name: 'Products', measure: 'Amount', type: 'Value', condition: 'Bottom', value1: 3 }],
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  filters: []
};
const height = 350;
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

> When `value1` exceeds the number of distinct members for that field, the Pivot Table simply shows all available members (it does not throw an error).

### Clearing the Existing Value Filter

You can clear the applied value filter by clicking the "Clear" option at the bottom of the filter dialog under the "Value" tab.

## Events

### memberFiltering

The [`memberFiltering`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#memberfiltering) event gives you complete control over filter operations by triggering before any filter is applied through the filter dialog. This event activates specifically when you click the **"OK"** button in the filter dialog, allowing you to review, modify, or cancel the filtering process based on your requirements.

This event provides access to the current filter settings, enabling you to customize filter behavior programmatically. You can examine the filter items, modify filter types and conditions, or prevent the filter from being applied entirely.

The event includes the following parameters:

- [`cancel`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/memberFilteringEventArgs#cancel) – A boolean property that stops the filter from being applied when set to **true**.
- [`filterSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/filter) – Contains the current [filter settings](https://ej2.syncfusion.com/vue/documentation/api/pivotview/filter) including filter items, types, and conditions.
- [`dataSourceSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/memberFilteringEventArgs#datasourcesettings) – Holds the updated [dataSourceSettings](https://ej2.syncfusion.com/vue/documentation/api/pivotview/dataSourceSettings) after the filter is applied.

For example, you can use the [`memberFiltering`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#memberfiltering) event to block the filter action by setting `args.cancel` to **true**:

```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showGroupingBar="showGroupingBar"
      :memberFiltering="memberFiltering"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, GroupingBar } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowLabelFilter: true,
  allowValueFilter: true,
  allowMemberFilter: true,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
const height = 350;
const showGroupingBar = true;

provide('pivotview', [GroupingBar]);

const memberFiltering = (args) => {
  // Triggers, whenever filtering is applied in UI.
  args.cancel = true;
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### memberEditorOpen

When you open the Member Editor dialog, the [`memberEditorOpen`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#membereditoropen) event is triggered. With this event, you can decide which field members are shown, making it easier to include or exclude specific items. The event provides the following options:

- [`fieldName`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/memberEditorOpenEventArgs#fieldname): The name of the field for which the Member Editor dialog opens.
- [`fieldMembers`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/memberEditorOpenEventArgs#fieldmembers): The list of all members in the selected field.
- [`cancel`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/memberEditorOpenEventArgs#cancel): If you set this property to `true`, the Member Editor dialog will not open.
- [`filterSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/memberEditorOpenEventArgs#filtersetting) – Contains the current [`filterSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/filter) including filter items, types, and conditions.

In the example below, only the selected member for the "Country" field appears in the Member Editor dialog:

```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showGroupingBar="showGroupingBar"
      :memberEditorOpen="memberEditorOpen"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, GroupingBar } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  allowLabelFilter: true,
  allowValueFilter: true,
  allowMemberFilter: true,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
const height = 350;
const showGroupingBar = true;

provide('pivotview', [GroupingBar]);

const memberEditorOpen = (args) => {
  if (args.fieldName === 'Country') {
    args.fieldMembers = args.fieldMembers.filter((key) => {
      return (key.actualText == 'France' || key.actualText == 'Germany')
    });
  }
};
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### actionBegin

The [`actionBegin`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#actionbegin) event is triggered when a user clicks the filter icon on a field button in either the grouping bar or the field list, allowing users to monitor and control actions in the Pivot Table. The event argument includes the following properties:

- [`dataSourceSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotActionBeginEventArgs#datasourcesettings): Contains the current data source configuration, including input data, rows, columns, values, filters, format settings, and other report settings.
- [`actionName`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotActionBeginEventArgs#actionname): Indicates the name of the action being initiated, such as **Filter field** for filtering.
- [`fieldInfo`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotActionBeginEventArgs#fieldinfo): Provides information about the selected field for the action.

> **Note**: The `fieldInfo` property is available only when the action involves a specific field, such as filtering, sorting, removing a field from the grouping bar, editing, or changing the aggregation type.

- [`cancel`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotActionBeginEventArgs#cancel): A boolean property that allows you to prevent the current action from completing. Set this to **true** to stop the action.

In the example below, you can prevent a filter action by setting **args.cancel** to **true** in the [`actionBegin`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#actionbegin) event:

```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showGroupingBar="showGroupingBar"
      :showFieldList="showFieldList" :actionBegin="actionBegin"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, GroupingBar, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
const height = 350;
const showGroupingBar = true;
const showFieldList = true;

const actionBegin = (args) => {
  if (args.actionName == 'Filter field') {
    args.cancel = true;
  }
};

provide('pivotview', [GroupingBar, FieldList]);
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### actionComplete

The [`actionComplete`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#actioncomplete) event triggers when filtering actions are completed through the field button in both the grouping bar and field list UI. You can use this event to monitor current UI actions and implement custom logic based on the completed operations.

The event provides the following parameters:

- [`dataSourceSettings`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotActionCompleteEventArgs#datasourcesettings): Contains the current data source configuration, including input data source, rows, columns, values, filters, format settings, and other report settings.
- [`actionName`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotActionCompleteEventArgs#actionname): Specifies the name of the completed action. For filtering operations, the action name appears as **Field filtered**.
- [`fieldInfo`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotActionCompleteEventArgs#fieldinfo): Contains information about the selected field that was involved in the action.

> **Note**: This parameter is available only when the action involves a specific field, such as filtering, sorting, removing a field from the grouping bar, editing, or changing the aggregation type.

- [`actionInfo`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotActionCompleteEventArgs#actioninfo): Provides detailed information about the current UI action. For filtering operations, this includes filter members, field name, and other relevant details.

```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showGroupingBar="showGroupingBar"
      :showFieldList="showFieldList" :actionComplete="actionComplete"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, GroupingBar, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
const height = 350;
const showGroupingBar = true;
const showFieldList = true;

const actionComplete = (args) => {
  if (args.actionName == 'Field filtered') {
    // Triggers when the filter action is completed.
  }
};

provide('pivotview', [GroupingBar, FieldList]);
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

### actionFailure

The [`actionFailure`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/index-default#actionfailure) event is triggered when a UI action fails to produce the expected result. This event provides detailed information about the failure through the following parameters:

- [`actionName`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotActionFailureEventArgs#actionname): It holds the name of the current action failed. For example, if the action fails while filtering, the action name will be shown as **Filter field**.
- [`errorInfo`](https://ej2.syncfusion.com/vue/documentation/api/pivotview/pivotActionFailureEventArgs#errorinfo): It holds the error information of the current UI action.

```vue
<template>
  <div id="app">
    <ejs-pivotview :dataSourceSettings="dataSourceSettings" :height="height" :showGroupingBar="showGroupingBar"
      :showFieldList="showFieldList" :actionFailure="actionFailure"> </ejs-pivotview>
  </div>
</template>
<script setup>
import { provide } from "vue";
import { PivotViewComponent as EjsPivotview, GroupingBar, FieldList } from "@syncfusion/ej2-vue-pivotview";
import { pivotData } from './pivotData.js';

const dataSourceSettings = {
  dataSource: pivotData,
  expandAll: false,
  columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
  values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
  rows: [{ name: 'Country' }, { name: 'Products' }],
  formatSettings: [{ name: 'Amount', format: 'C0' }],
  filters: []
};
const height = 350;
const showGroupingBar = true;
const showFieldList = true;

const actionFailure = (args) => {
  if (args.actionName == 'Filter field') {
    // Triggers when the current UI action fails to achieve the desired result.
  }
};

provide('pivotview', [GroupingBar, FieldList]);
</script>
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/pivotview/index.css";
</style>
```

## Best Practices

1. **Choose the right filter type**:
   - Use **Member filtering** when you know the exact items you want to include/exclude.
   - Use **Label filtering** when you want to filter by header patterns (contains, between, etc.).
   - Use **Value filtering** (including **Top**/**Bottom**) when you need to focus on aggregated value ranges or rankings.
2. **Pre-filter large datasets** at initialization rather than at runtime to avoid UI lag.
3. **Limit member filter dialog size** with `maxNodeLimitInMemberEditor` when the dataset has thousands of unique members.
4. **Combine filter types** for complex scenarios (for example, Include specific countries with member filter, then take the Top 5 by sales with value filter).
5. **Use the "Append Current Selection" option** in the member filter dialog to build up selections iteratively without losing prior choices.
6. **For OLAP data sources**, leverage `loadOnDemandInMemberEditor` and `levelCount` to keep member loading fast.
7. **Listen to `memberFiltering` and `actionBegin`** if you need to validate, log, or cancel filter operations.
