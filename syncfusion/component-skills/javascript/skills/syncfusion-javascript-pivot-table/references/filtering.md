# Filtering in Syncfusion JavaScript Pivot Table

## Table of Contents
- [Overview](#overview)
- [Member Filtering](#member-filtering)
  - [Option to Select and Unselect All Members](#option-to-select-and-unselect-all-members)
  - [Provision to Search Specific Member(s)](#provision-to-search-specific-members)
  - [Option to Sort Members](#option-to-sort-members)
  - [Performance Tips](#performance-tips)
  - [Loading Members On-Demand (OLAP)](#loading-members-on-demand-olap)
  - [Loading Members Based on Level Number (OLAP)](#loading-members-based-on-level-number-olap)
  - [Append Current Selection to Existing Filters](#append-current-selection-to-existing-filters)
- [Label Filtering](#label-filtering)
  - [Filtering String Data Type Through Code](#filtering-string-data-type-through-code)
  - [Filtering Number Data Type Through Code](#filtering-number-data-type-through-code)
  - [Filtering Date Data Type Through Code](#filtering-date-data-type-through-code)
  - [Clearing the Existing Label Filter](#clearing-the-existing-label-filter)
- [Value Filtering](#value-filtering)
  - [Clearing the Existing Value Filter](#clearing-the-existing-value-filter)
- [Filter Events](#filter-events)
  - [memberFiltering](#memberfiltering)
  - [memberEditorOpen](#membereditoropen)
  - [actionBegin](#actionbegin)
  - [actionComplete](#actioncomplete)
  - [actionFailure](#actionfailure)
- [TypeScript Code Examples](#typescript-code-examples)
- [Configuration Options](#configuration-options)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

Filtering helps you focus on specific data by showing only the records you need in the Pivot Table. This allows you to analyze relevant information more effectively by including or excluding specific members through the user interface or programmatically.

The Pivot Table offers three types of filtering options:

* **Member filtering** - Include or exclude specific field members
* **Label filtering** - Filter by header text (string, number, or date)
* **Value filtering** - Filter based on aggregated values, including Top and Bottom operators

> When all filtering options are disabled programmatically, the filter icon will not appear in the field list or grouping bar interface.

## Member Filtering

This filtering option displays the Pivot Table with selective records based on the members you choose to include or exclude in each field. By default, member filtering is enabled through the `allowMemberFilter` property in `dataSourceSettings`.

Users can apply member filters at runtime by clicking the filter icon next to any field in the row, column, and filter axes, available in both the field list and grouping bar interfaces.

You can also configure filtering programmatically using the `filterSettings` property during the initial rendering of the component. The essential settings required to add filter criteria are:

* `name`: Sets the appropriate field name for filtering.
* `type`: Specifies the filter type as **Include** or **Exclude** to include or exclude field members respectively.
* `items`: Defines the members that need to be either included or excluded from the display.
* `levelCount`: Sets the level count of the field to fetch data from the cube. **Note: This property is applicable only for OLAP data sources.**

> When you specify unavailable or inappropriate members in the include or exclude filter items collection, they will be ignored.

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        filterSettings: [{ name: 'Country', type: 'Exclude', items: ['United States'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Option to Select and Unselect All Members

This option lets you quickly manage all members at once, saving time when working with large datasets. The member filter dialog includes an **All** option that provides a convenient way to select or deselect all available members with a single click.

When you check the **All** option, it selects all members in the list. When you uncheck it, all members become deselected. If you manually select some members while others remain unselected, the **All** option displays an intermediate state (partially checked) to show that the list contains both selected and unselected members.

> **Note:** When all members are deselected, the **OK** button becomes disabled. You must select at least one member to apply the filter and display data in the Pivot Table.

### Provision to Search Specific Members

This option helps you quickly locate specific members without scrolling through long lists. The member filter dialog includes a built-in search box that allows you to find members by typing part of their name.

Simply enter the starting characters of the member name you want to find, and the list will automatically filter to show only matching members. This makes it easy to locate and select specific members, especially when dealing with large datasets.

### Option to Sort Members

This option allows you to organize members in a logical order for easier selection and review. The member filter dialog provides built-in sort icons that let you arrange members in ascending or descending order.

You can click the ascending sort icon to arrange members from A to Z (or lowest to highest for numerical values), or click the descending sort icon to arrange them from Z to A (or highest to lowest). When neither sorting option is selected, members appear in their original order as retrieved from the data source.

### Performance Tips

The member filter dialog improves loading performance when working with large datasets by limiting the number of members displayed initially. This helps you work with extensive data without experiencing delays while the member list loads.

You can control how many members are displayed in the member filter dialog using the `maxNodeLimitInMemberEditor` property. By default, this property is set to **1000**. When your data contains more members than this limit, only the specified number will be shown initially, and a message will indicate how many additional members are available.

```typescript
import { PivotView, IDataSet, FieldList, GroupingBar, VirtualScroll } from '@syncfusion/ej2-pivotview';

let names: string[] = ['TOM', 'Hawk', 'Jon', 'Chandler', 'Monica', 'Rachel', 'Phoebe', 'Gunther',
    'Ross', 'Geller', 'Joey', 'Bing', 'Tribbiani', 'Janice', 'Bong', 'Perk', 'Green', 'Ken', 'Adams'];
let city: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'Austin',
    'San Francisco', 'Columbus', 'Washington', 'Portland', 'Oklahoma', 'Las Vegas', 'Virginia', 'St. Louis', 'Birmingham'];
let hours: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let rating: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let designation: string[] = ['Manager', 'Engineer 1', 'Engineer 2', 'Developer', 'Tester'];
let status: string[] = ['Completed', 'Open', 'In Progress', 'Review', 'Testing'];
let data: Function = (count: number) => {
    let result: Object[] = [];
    for (let i = 0; i < count; i++) {
        result.push({
            TaskID: i + 1,
            Engineer: names[Math.round(Math.random() * names.length)] || names[0],
            City: names[Math.round(Math.random() * city.length)] || city[0],
            Designation: designation[Math.round(Math.random() * designation.length)] || designation[0],
            Estimation: hours[Math.round(Math.random() * hours.length)] || hours[0],
            Rating: hours[Math.round(Math.random() * rating.length)] || rating[0],
            Status: status[Math.round(Math.random() * status.length)] || status[0]
        });
    }
    return result;
};

PivotView.Inject(VirtualScroll, FieldList, GroupingBar);
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: data(5000),
        expandAll: false,
        formatSettings: [{ name: 'Estimation', format: 'C' }],
        rows: [{ name: 'TaskID' }, { name: 'Status' }],
        columns: [{ name: 'Designation' }],
        values: [{ name: 'Estimation' }, { name: 'Rating' }],
    },
    width: 800,
    height: 300,
    enableVirtualization: true,
    showFieldList: true,
    showGroupingBar: true,
    maxNodeLimitInMemberEditor: 500
});
pivotTableObj.appendTo('#PivotTable');
```

When the member count exceeds your set limit, you can use the search option to find specific members beyond the displayed range. For example, if your data contains 5000 members named "Node 1", "Node 2", "Node 3", and so on, and you set the `maxNodeLimitInMemberEditor` property to **500**, only the first 500 members will appear by default. The dialog will show a message like "4500 more items. Search to refine further." To access members 501 to 5000, type the starting characters in the search box to locate the desired members.

### Loading Members On-Demand (OLAP)

> This option is applicable only for OLAP data sources.

This option improves the performance of the member editor by loading members only when needed, rather than loading all members at once. You can enable this by setting the `loadOnDemandInMemberEditor` property to **true**. When enabled, only the first level members are loaded initially from the OLAP cube, allowing the member editor to open quickly without performance delays.

By default, this property is set to **true** and search operations will only apply to the currently loaded level members. You can load additional level members using either of the following methods:

* **Expand individual members**: Click the expander button next to any member to load only its child members.
* **Load by level selection**: Choose a specific level from the dropdown list to load all members up to that selected level from the cube.

This approach prevents performance issues when working with hierarchies that contain large numbers of members. Once level members are loaded, they remain available for all subsequent operations (such as reopening the dialog or drag-and-drop actions) and persist until you refresh the web page.

```typescript
import { PivotView, FieldList, GroupingBar, CalculatedField } from '@syncfusion/ej2-pivotview';

PivotView.Inject(FieldList, GroupingBar, CalculatedField);
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
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
        ]
    },
    loadOnDemandInMemberEditor: true,
    showFieldList: true,
    showGroupingBar: true,
    allowCalculatedField: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

In the example above, the "Customer Geography" dimension loads with only the first level (Country) initially. Search operations will apply only to the "Country" level members. You can then load the next level members (State-Province) on-demand in two ways:

* **Expand specific countries**: When you expand "Australia", the "State-Province" members load only for Australia.
* **Load all states by level**: When you select "State-Province" from the dropdown list, all "State-Province" members load across all countries (Australia, Canada, France, etc.).

Once loaded, these members are stored internally and remain available until you refresh the page.

When the `loadOnDemandInMemberEditor` property is set to **false**, all members from all levels are loaded during the initial setup. This approach executes a single query to retrieve all members at once. While this may cause slower performance when opening the member editor due to the large number of members being fetched, expand and search operations will be faster since all members are already available.

### Loading Members Based on Level Number (OLAP)

> This property is applicable only for OLAP data sources.

This option enables you to control the depth of member loading by specifying how many levels should be loaded initially. By setting the `levelCount` property in the `filterSettings`, you can improve performance and focus filtering operations on specific hierarchy levels.

The `levelCount` property is set to **1** by default, which means only the first level members are loaded initially. When you apply filters or search operations, they will only affect the members within the loaded levels.

```typescript
import { PivotView, FieldList, GroupingBar, CalculatedField } from '@syncfusion/ej2-pivotview';

PivotView.Inject(FieldList, GroupingBar, CalculatedField);
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
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
            { name: '[Measures].[Internet Sales Amount]', caption: 'Internet Sales Amount' }
        ],
        filters: [
            { name: '[Date].[Fiscal]', caption: 'Date Fiscal' },
        ],
        filterSettings: [
            {
                name: '[Customer].[Customer Geography]', items: ['[Customer].[Customer Geography].[State-Province].&[NSW]&[AU]'], type: 'Exclude',
                levelCount: 2
            }
        ]
    },
    showFieldList: true,
    showGroupingBar: true,
    allowCalculatedField: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

In the above example, the `levelCount` is set to **2** for the "Customer Geography" dimension in `filterSettings`. This loads both the "Country" and "State-Province" levels during the initial loading process. Any search or filter operations will be applied only to the members within these two levels. To access members from deeper levels like "City", you can either expand the respective "State-Province" node or select the "City" level from the dropdown list.

### Append Current Selection to Existing Filters

By default, when a filter is applied and a new field member is selected, the Pivot Table replaces the previous selection. Enabling the **Add current selection to filter** option ensures that each new selection is added to the existing filter instead of replacing it. This allows you to select multiple items incrementally without losing earlier selections.

To append current selections to existing filters:

1. Open the Filter dialog.
2. Search for the required field member and select it.
3. Then, select the **Add current selection to filter** option in the Filter dialog.
4. Click the **OK** button.

## Label Filtering

Label filtering allows you to display only the data with specific header text across row and column fields, making it easier to focus on relevant information in your Pivot Table. This filtering works with three types of data:

* String data type
* Number data type
* Date data type

To enable label filtering, set the `allowLabelFilter` property to **true** in the `dataSourceSettings`. Once enabled, you can access the filtering options by clicking the filter icon next to any field in the row or column axis of the field list or grouping bar. This opens the filtering dialog where you can navigate to the "Label" tab to apply your label filtering criteria.

```typescript
import { PivotView, IDataSet, FieldList } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(FieldList);
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        allowLabelFilter: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showFieldList: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

> In label filtering UI, based on the field chosen, it's member data type is automatically recognized and filtering operation will be carried out. Where as in code behind, user need to define the data type through a property and it has been explained in the immediate section below.

### Filtering String Data Type Through Code

String-based label filtering enables you to programmatically show only data that matches specific text values in your row and column fields, making it easier to focus on the exact information you need.

This filtering approach is specifically designed for fields containing string data type members. You can configure the filtering through the `filterSettings` property in your code. The following properties are required for label filtering:

* `name`: Specifies the field name to apply the filter.
* `type`: Sets the filter type as **Label** for the specified field.
* `condition`: Defines the operator type such as **Equals**, **GreaterThan**, **LessThan**, and others.
* `value1`: Sets the primary value for comparison.
* `value2`: Sets the secondary value for comparison. This property is only applicable for operators like **Between** and **NotBetween**.
* `selectedField`: Specifies the level name of a dimension where the filter should be applied. **NOTE: This property is applicable only for OLAP data sources.**

For example, to display only countries containing "United" in their name from a "Country" field, set the `value1` property to "United" and the `condition` property to **Contains**.

**Available Operators for Label Filtering:**

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

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        allowLabelFilter: true,
        filterSettings: [{ name: 'Country', type: 'Label', condition: 'GreaterThan', value1: 'United Kingdom' }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Filtering Number Data Type Through Code

Filter numeric data programmatically to display only values that meet specific numeric conditions, helping you analyze data patterns and ranges more effectively. This filtering approach is specifically designed for fields containing numeric data types and follows the same configuration method as string data filtering, with one key difference: set the `type` property to **Number** enumeration instead of **Label**.

To filter numeric values, specify the filtering criteria using the following properties:
- `value1`: The primary value for comparison
- `condition`: The comparison operator
- `value2`: The secondary value (required for **Between** and **NotBetween** conditions)

For example, to display only sales data where the "Sold" field values are less than 40000, set `value1` to "40000" and `condition` to **LessThan**.

> The following operators are supported for number data type: **Equals**, **DoesNotEquals**, **GreaterThan**, **GreaterThanOrEqualTo**, **LessThan**, **LessThanOrEqualTo**, **Between**, and **NotBetween**.

> Number filtering is available only when the field contains numeric data format.

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        allowLabelFilter: true,
        filterSettings: [{ name: 'Amount', type: 'Number', condition: 'LessThan', value1: '40000' }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }],
        rows: [{ name: 'Amount', caption: 'Sold Amount' }],
        filters: [{ name: 'Country' }, { name: 'Products' }]
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Filtering Date Data Type Through Code

This filtering option makes it simple to filter data based on date values in your fields, helping you quickly focus on records from specific time periods. This type of filtering is only available for fields that contain date data types and can be configured programmatically using the same approach as explained in the previous section "Filtering string data type through code", with one key difference: set the `type` property to **Date**.

To apply date filtering, specify your filtering criteria using the `value1` and `condition` properties. For example, if you have a "Delivery Date" field and want to show delivery records from before a specific date like "2019-01-07", set the `value1` property to "2019-01-07" and the `condition` property to **Before**.

> You can use the following operators with date data type filtering: **Equals**, **DoesNotEquals**, **Before**, **BeforeOrEqualTo**, **After**, **AfterOrEqualTo**, **Between**, and **NotBetween**.

> Date filtering is available only when the field has date type `formatSettings` configured.

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        allowLabelFilter: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        formatSettings: [{ name: 'Year', format: 'dd/MM/yyyy-hh:mm', type: 'date' }],
        filterSettings: [{ name: 'Year', type: 'Date', condition: 'Before', value1: new Date('2016') }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Clearing the Existing Label Filter

Users can clear the applied label filter by clicking the **Clear** option at the bottom of the filter dialog. This option is located under the **Label** tab for string and number type filtering, and under the **Date** tab for date type filtering.

## Value Filtering

Value filtering allows you to filter data based on aggregated values from measure fields, helping you focus on specific data ranges that meet your criteria.

You can enable value filtering by setting the `allowValueFilter` property to **true** in the `dataSourceSettings`. Once enabled, click the filter icon next to any field in the row or column axis within the field list or grouping bar. A filtering dialog will appear where you can navigate to the "Value" tab to perform value filtering operations.

You can also configure value filtering programmatically using the `filterSettings` property. The following properties are required for value filtering:

* `name`: Specifies the field name to which the filter applies.
* `type`: Sets the filter type as **Value**.
* `measure`: Specifies the value field name used for filtering.
* `condition`: Defines the comparison operator such as **Equals**, **GreaterThan**, **LessThan**, **Top**, or **Bottom**.
* `value1`: Sets the comparison value, count for Top/Bottom, or the start value for range operations.
* `value2`: Sets the end value, applicable only for **Between** and **NotBetween** operators.
* `selectedField`: Specifies the dimension level name where filter settings apply. **Note: This property is only applicable for OLAP data sources.**

For example, to display data where the total sum of units sold for each country exceeds 1500, set the `value1` to "1500" and `condition` to **GreaterThan** for the "Country" field.

**Available Operators for Value Filtering:**

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
| Top | Top N members by highest values (client-side only). |
| Bottom | Bottom N members by lowest values (client-side only). |

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        allowValueFilter: true,
        drilledMembers: [{ name: 'Country', items: ['France'] }],
        filterSettings: [{ name: 'Country', measure: 'Sold', type: 'Value', condition: 'GreaterThan', value1: '2000' }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        filters: []
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Clearing the Existing Value Filter

You can clear the applied value filter by clicking the **Clear** option at the bottom of the filter dialog under the **Value** tab.

## Filter Events

The Pivot Table provides several events that allow you to monitor, customize, and control filter operations.

### memberFiltering

The `memberFiltering` event gives you complete control over filter operations by triggering before any filter is applied through the filter dialog. This event activates specifically when you click the **"OK"** button in the filter dialog, allowing you to review, modify, or cancel the filtering process based on your requirements.

This event provides access to the current filter settings, enabling you to customize filter behavior programmatically. You can examine the filter items, modify filter types and conditions, or prevent the filter from being applied entirely.

**Event Parameters:**
* `cancel` - A boolean property that stops the filter from being applied when set to **true**.
* `filterSettings` - Contains the current filter settings including filter items, types, and conditions.
* `dataSourceSettings` - Holds the updated data source settings after the filter is applied.

```typescript
import { PivotView, IDataSet, GroupingBar, MemberFilteringEventArgs } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar);
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        enableSorting: true,
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    memberFiltering: (args: MemberFilteringEventArgs) => {
        args.cancel = true; // Cancels the filter action
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### memberEditorOpen

When you open the Member Editor dialog, the `memberEditorOpen` event is triggered. With this event, you can decide which field members are shown, making it easier to include or exclude specific items.

**Event Parameters:**
- `fieldName`: The name of the field for which the Member Editor dialog opens.
- `fieldMembers`: The list of all members in the selected field.
- `cancel`: If you set this property to `true`, the Member Editor dialog will not open.
- `filterSettings`: Contains the current filter settings including filter items, types, and conditions.

```typescript
import { PivotView, IDataSet, GroupingBar, MemberEditorOpenEventArgs } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar);
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    memberEditorOpen: (args: MemberEditorOpenEventArgs) => {
        if (args.fieldName == 'Country') {
            args.fieldMembers = args.fieldMembers.filter((key) => {
                return (key.actualText == 'France' || key.actualText == 'Germany');
            });
        }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### actionBegin

The `actionBegin` event is triggered when a user clicks the filter icon on a field button in either the grouping bar or the field list, allowing users to monitor and control actions in the Pivot Table.

**Event Parameters:**
- `dataSourceSettings`: Contains the current data source configuration, including input data, rows, columns, values, filters, format settings, and other report settings.
- `actionName`: Indicates the name of the action being initiated, such as **Filter field** for filtering.
- `fieldInfo`: Provides information about the selected field for the action. **Note**: This is available only when the action involves a specific field.
- `cancel`: A boolean property that allows you to prevent the current action from completing. Set this to **true** to stop the action.

```typescript
import { PivotView, IDataSet, GroupingBar, FieldList, PivotActionBeginEventArgs } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar, FieldList);
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    showFieldList: true,
    actionBegin: (args: PivotActionBeginEventArgs) => {
        if (args.actionName == 'Filter field') {
            args.cancel = true; // Prevents the filter action
        }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### actionComplete

The `actionComplete` event triggers when filtering actions are completed through the field button in both the grouping bar and field list UI. You can use this event to monitor current UI actions and implement custom logic based on the completed operations.

**Event Parameters:**
- `dataSourceSettings`: Contains the current data source configuration.
- `actionName`: Specifies the name of the completed action. For filtering operations, the action name appears as **Field filtered**.
- `fieldInfo`: Contains information about the selected field that was involved in the action.
- `actionInfo`: Provides detailed information about the current UI action. For filtering operations, this includes filter members, field name, and other relevant details.

```typescript
import { PivotView, IDataSet, GroupingBar, FieldList, PivotActionCompleteEventArgs } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar, FieldList);
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    showFieldList: true,
    actionComplete: (args: PivotActionCompleteEventArgs) => {
        if (args.actionName == 'Field filtered') {
            // Triggers when the filter action is completed.
        }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### actionFailure

The `actionFailure` event is triggered when a UI action fails to produce the expected result.

**Event Parameters:**
- `actionName`: It holds the name of the current action failed. For example, if the action fails while filtering, the action name will be shown as **Filter field**.
- `errorInfo`: It holds the error information of the current UI action.

```typescript
import { PivotView, IDataSet, GroupingBar, FieldList, Toolbar, CalculatedField, PivotActionFailureEventArgs } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

PivotView.Inject(GroupingBar, FieldList, Toolbar);
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        rows: [{ name: 'Country' }, { name: 'Products' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filters: []
    },
    showGroupingBar: true,
    showFieldList: true,
    allowCalculatedField: true,
    showToolbar: true,
    displayOption: { view: 'Both' },
    toolbar: ['New', 'Save', 'Rename', 'Remove', 'Load', 'Grid', 'Chart', 'MDX', 'Export', 'SubTotal', 'GrandTotal', 'ConditionalFormatting', 'FieldList'],
    allowExcelExport: true,
    allowConditionalFormatting: true,
    allowPdfExport: true,
    actionFailure: (args: PivotActionFailureEventArgs) => {
        if (args.actionName == 'Filter field') {
            // Triggers when the current UI action fails to achieve the desired result.
        }
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## TypeScript Code Examples

### Basic Filtering Setup

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';
import { pivotData } from './datasource.ts';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: pivotData as IDataSet[],
        expandAll: false,
        rows: [{ name: 'Country' }, { name: 'Products' }],
        columns: [{ name: 'Year', caption: 'Production Year' }, { name: 'Quarter' }],
        values: [{ name: 'Sold', caption: 'Units Sold' }, { name: 'Amount', caption: 'Sold Amount' }],
        formatSettings: [{ name: 'Amount', format: 'C0' }],
        filterSettings: [
            { name: 'Year', type: 'Exclude', items: ['FY 2015'] }
        ]
    },
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

## Configuration Options

### FilterSettings Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Field name to apply filter |
| `type` | string | Filter type: 'Include', 'Exclude', 'Label', 'Value' |
| `items` | string[] | Members to include/exclude |
| `condition` | string | Operator for label/value filtering (Equals, Contains, Between, Top, Bottom, etc.) |
| `value1` | string | First value for condition; count for Top/Bottom |
| `value2` | string | Second value (for Between, NotBetween) |
| `measure` | string | Measure name for value filtering |
| `levelCount` | number | Hierarchy level to apply filter (OLAP only) |
| `selectedField` | string | Dimension level name for OLAP filter |

### Performance Options (Top-level Properties)

```typescript
import { PivotView, IDataSet } from '@syncfusion/ej2-pivotview';

let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeData as IDataSet[],
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    // Limit members shown in filter dialog
    maxNodeLimitInMemberEditor: 500,

    // Enable load-on-demand for large datasets (OLAP only)
    loadOnDemandInMemberEditor: true,

    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

**Important:** Both `maxNodeLimitInMemberEditor` and `loadOnDemandInMemberEditor` are top-level properties of PivotView, NOT within `dataSourceSettings`.

## Common Patterns

### Multiple Filters

```typescript
filterSettings: [
    { name: 'Country', type: 'Include', items: ['France', 'Germany', 'United Kingdom'] },
    { name: 'Products', type: 'Label', condition: 'Contains', value1: 'Bike' },
    { name: 'Year', type: 'Value', measure: 'Amount', condition: 'GreaterThan', value1: '500000' }
]
```

### Dynamic Filtering

```typescript
// Add filter programmatically
pivotTableObj.dataSourceSettings.filterSettings.push({
    name: 'Country',
    type: 'Include',
    items: ['France', 'Germany']
});

// Refresh the Pivot Table
pivotTableObj.refresh();
```

### Clear Filters

```typescript
// Clear all filters
pivotTableObj.dataSourceSettings.filterSettings = [];
pivotTableObj.refresh();

// Clear specific filter
pivotTableObj.dataSourceSettings.filterSettings =
    pivotTableObj.dataSourceSettings.filterSettings.filter(f => f.name !== 'Country');
pivotTableObj.refresh();
```

## Troubleshooting

### Issue: Filter not applied
**Solution:** Ensure the field name matches exactly with the data source field name. Check for case sensitivity.

```typescript
// Correct
filterSettings: [{ name: 'Country', type: 'Include', items: ['France'] }]

// Incorrect
filterSettings: [{ name: 'country', type: 'Include', items: ['France'] }]
```

### Issue: Performance issues with large datasets
**Solution:** Enable load-on-demand and limit member count:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeData,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    maxNodeLimitInMemberEditor: 500,
    loadOnDemandInMemberEditor: true,
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Issue: Value filter not working
**Solution:** Ensure the measure field is specified correctly:

```typescript
filterSettings: [
    {
        name: 'Country',
        type: 'Value',
        measure: 'Amount', // Must match value field name
        condition: 'GreaterThan',
        value1: '300000'
    }
]
```

### Issue: Between filter returning unexpected results
**Solution:** Ensure value1 and value2 are in correct order (value1 < value2):

```typescript
// Correct
filterSettings: [
    { name: 'Country', type: 'Label', condition: 'Between', value1: 'A', value2: 'M' }
]

// Incorrect
filterSettings: [
    { name: 'Country', type: 'Label', condition: 'Between', value1: 'M', value2: 'A' }
]
```

### Issue: Filter dialog takes too long to load
**Solution:** Reduce maxNodeLimitInMemberEditor or enable load-on-demand:

```typescript
let pivotTableObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeData,
        rows: [{ name: 'Country' }],
        columns: [{ name: 'Year' }],
        values: [{ name: 'Sold' }]
    },
    maxNodeLimitInMemberEditor: 500, // Reduced from default 1000
    loadOnDemandInMemberEditor: true, // For OLAP data sources
    height: 350
});
pivotTableObj.appendTo('#PivotTable');
```

### Issue: Top/Bottom filter returning unexpected results
**Solution:** Remember that Top/Bottom filtering is **client-side only**. Ensure the value1 specifies the count of top/bottom members:

```typescript
// Top 5 countries by sold amount
filterSettings: [
    {
        name: 'Country',
        type: 'Value',
        measure: 'Sold',
        condition: 'Top',
        value1: '5'
    }
]
```
