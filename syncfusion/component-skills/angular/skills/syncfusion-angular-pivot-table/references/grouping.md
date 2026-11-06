# Grouping

## Table of Contents
- [Overview](#overview)
- [Enabling Grouping](#enabling-grouping)
- [Number Grouping](#number-grouping)
- [Date Grouping](#date-grouping)
- [Custom Grouping](#custom-grouping)
- [UI-Based Grouping](#ui-based-grouping)
- [Ungrouping](#ungrouping)

---

## Overview

Grouping is a powerful feature that automatically organizes date, time, number, and string data into meaningful categories. For example:
- **Date fields**: Group by Year, Quarter, Month, Day, Hour, Minute, Second
- **Number fields**: Group into ranges like 1-5, 6-10, 11-15, etc.
- **Custom grouping**: Group data by business-defined categories

The grouping feature functions like Excel grouping, allowing you to drag grouped fields between columns, rows, values, and filters at runtime.

**Requirements**:
- Enable with `allowGrouping: true`
- Inject `GroupingService` module
- Only one grouping type per field

---

## Enabling Grouping

### Basic Setup

```typescript
import { PivotViewAllModule, GroupingService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  imports: [PivotViewAllModule],
  standalone: true,
  providers: [GroupingService],
  template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings
    [allowGrouping]="true"></ejs-pivotview>`
})
export class PivotGridComponent implements OnInit {
  public dataSourceSettings: IDataOptions;
  
  ngOnInit(): void {
    this.dataSourceSettings = {
      dataSource: data,
      rows: [{ name: 'Country' }],
      columns: [{ name: 'Year' }],
      values: [{ name: 'Amount', type: 'Sum' }],
      groupSettings: []  // Add grouping configurations here
    };
  }
}
```

---

## Number Grouping

Number grouping organizes numerical data into ranges. Example: 1-5, 6-10, 11-15.

### Configuring Number Grouping Programmatically

```typescript
groupSettings: [
  {
    name: 'ProductID',           // Field to group
    type: 'Number',              // Grouping type
    rangeInterval: 5,            // Interval size (1-5, 6-10, etc.)
    startingAt: 1000,            // Range start
    endingAt: 1010               // Range end
  }
]
```

**Properties**:
- **name**: Field name to group
- **type**: Must be 'Number' for number grouping
- **rangeInterval**: Size of each range (e.g., 5 groups values by 5s)
- **startingAt**: Starting number for grouping
- **endingAt**: Ending number for grouping
- Values outside the range appear as "Out of Range"

### Example: Product ID Grouping

```typescript
groupSettings: [
  {
    name: 'ProductID',
    type: 'Number',
    rangeInterval: 2,  // Group by 2s: 1004-1005, 1006-1007, etc.
    startingAt: 1004,
    endingAt: 1008
  }
]
```

### UI-Based Number Grouping

1. Right-click a numeric header in the pivot table
2. Select **Group** from context menu
3. Set:
   - **Starting at**: Beginning number
   - **Interval by**: Range size (e.g., 5)
   - **Ending at**: End number
4. Click **OK**

---

## Date Grouping

Date grouping organizes dates into hierarchical segments: Years → Quarters → Months → Days → Hours → Minutes → Seconds.

### Configuring Date Grouping Programmatically

```typescript
groupSettings: [
  {
    name: 'OrderDate',                      // Date field to group
    type: 'Date',                           // Grouping type
    groupInterval: ['Years', 'Months'],     // Hierarchy levels
    startingAt: new Date(2020, 0, 1),       // Range start
    endingAt: new Date(2023, 11, 31)        // Range end
  }
]
```

**Properties**:
- **name**: Date field to group
- **type**: Must be 'Date' for date grouping
- **groupInterval**: Array of time periods to create hierarchy
  - Valid values: 'Years', 'Quarters', 'Months', 'Days', 'Hours', 'Minutes', 'Seconds'
- **startingAt**: Date range start
- **endingAt**: Date range end
- Order of intervals controls display hierarchy

### Example: Quarterly Date Grouping

```typescript
groupSettings: [
  {
    name: 'TransactionDate',
    type: 'Date',
    groupInterval: ['Years', 'Quarters'],  // Year → Quarter hierarchy
    startingAt: new Date(2021, 0, 1),
    endingAt: new Date(2023, 11, 31)
  }
]
```

**Result**: Creates grouped fields:
- Years (TransactionDate) - Contains: 2021, 2022, 2023
- Quarters (TransactionDate) - Contains: Q1, Q2, Q3, Q4

### Time-Based Date Grouping

```typescript
groupSettings: [
  {
    name: 'Timestamp',
    type: 'Date',
    groupInterval: ['Days', 'Hours', 'Minutes'],  // Day → Hour → Minute hierarchy
    startingAt: new Date(2023, 0, 1),
    endingAt: new Date(2023, 0, 31)
  }
]
```

### UI-Based Date Grouping

1. Right-click a date header in the pivot table
2. Select **Group** from context menu
3. Set:
   - **Starting at**: Date range start
   - **Ending at**: Date range end
   - **Interval by**: Select desired time periods (Years, Quarters, Months, etc.)
4. Click **OK**

---

## Custom Grouping

Custom grouping enables grouping data by business-defined categories regardless of data type.

### Creating Custom Groups via UI

1. **Select items**: Hold CTRL to select individual items or SHIFT to select a range
2. **Right-click**: Choose **Group** from context menu
3. **Configure**:
   - **Field Caption**: Alias name for the new custom field
   - **Group Name**: Name for the container group
4. Click **OK**

### Example: Product Category Custom Grouping

Select items "Gloves", "Jerseys", "Shorts" in the Products field:

```
Dialog Settings:
- Field Caption: "ProductCategory"  // New field name in field list
- Group Name: "Clothings"           // Group container name
```

**Result**: Creates "Clothings" group containing selected items, used like a regular field.

### Programmatic Custom Grouping

Custom groups are defined through the UI. Once created, they appear automatically in your pivot configuration and can be reused programmatically.

---

## UI-Based Grouping

### Accessing Grouping UI

**Method 1: Context Menu**
1. Right-click any row or column header
2. Select **Group** option
3. Configure grouping settings in dialog
4. Click **OK**

### Grouping Dialog Options

**For Number Fields**:
- Starting at: Beginning number
- Interval by: Range size
- Ending at: End number

**For Date Fields**:
- Starting at: Begin date
- Ending at: End date
- Interval by: Time periods (Years, Months, Days, etc.)

**For Custom Grouping**:
- Field Caption: Name for new grouped field
- Group Name: Name for the group container

---

## Ungrouping

### Remove Grouping via UI

1. Right-click the grouped header in pivot table
2. Select **Ungroup** from context menu
3. Grouping is immediately removed

### Programmatic Ungrouping

Remove grouping configuration:

```typescript
// Clear specific grouping
this.pivotGridObj.dataSourceSettings.groupSettings = [];

// Refresh pivot table
this.pivotGridObj.refresh();
```

---

## Common Patterns

### Sales Analysis by Year and Quarter

```typescript
groupSettings: [
  {
    name: 'SalesDate',
    type: 'Date',
    groupInterval: ['Years', 'Quarters'],
    startingAt: new Date(2020, 0, 1),
    endingAt: new Date(2023, 11, 31)
  }
]
```

### Product ID Range Grouping

```typescript
groupSettings: [
  {
    name: 'ProductID',
    type: 'Number',
    rangeInterval: 100,  // Group by 100s
    startingAt: 1000,
    endingAt: 2000
  }
]
```

### Time-Series Analysis

```typescript
groupSettings: [
  {
    name: 'Timestamp',
    type: 'Date',
    groupInterval: ['Years', 'Months', 'Days'],
    startingAt: new Date(2023, 0, 1),
    endingAt: new Date(2023, 11, 31)
  }
]
```

### Price Range Grouping

```typescript
groupSettings: [
  {
    name: 'Price',
    type: 'Number',
    rangeInterval: 50,  // $0-50, $50-100, $100-150, etc.
    startingAt: 0,
    endingAt: 500
  }
]
```

---

## Troubleshooting

**Issue**: Grouping option not appearing in context menu
- **Solution**: Ensure `allowGrouping: true` is set and `GroupingService` is injected.

**Issue**: Grouped dates showing "Out of Range"
- **Solution**: Verify `startingAt` and `endingAt` dates include your actual data range.

**Issue**: Number grouping creating unexpected ranges
- **Solution**: Check `rangeInterval` is appropriate for your data. For IDs 1000-1010, use interval of 2-5.

**Issue**: Multiple groupings applied to same field
- **Solution**: Only one grouping type per field. Remove existing grouping before applying new one.
