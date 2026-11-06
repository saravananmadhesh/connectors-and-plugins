# Grouping Bar UI Operations

## Table of Contents
- [Overview](#overview)
- [Setup & Configuration](#setup--configuration)
- [Core Features](#core-features)
- [Icon Controls](#icon-controls)
- [Fields Panel Management](#fields-panel-management)
- [User Interactions](#user-interactions)
- [Advanced Customization](#advanced-customization)

---

## Overview

The Grouping Bar provides an intuitive drag-and-drop interface for runtime pivot table configuration. It displays fields from your data source and allows users to rearrange them between rows, columns, values, and filters axes. This eliminates the need for complex dialogs and provides immediate visual feedback.

**Key Features:**
- Drag-and-drop field reorganization
- Quick filter, sort, and remove operations
- Fields panel showing available fields
- Icon controls for common operations
- Visual grouping by axis

---

## Setup & Configuration

### Basic Grouping Bar Setup

```typescript
import { Component, OnInit } from '@angular/core';
import { PivotViewModule, GroupingBarService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  imports: [PivotViewModule],
  providers: [GroupingBarService],
  selector: 'app-pivot-grid',
  template: `
    <ejs-pivotview
      #pivotview
      id='PivotView'
      [dataSourceSettings]="dataSourceSettings"
      [showGroupingBar]="true"
      [height]="'500px'"
      [width]="'100%'">
    </ejs-pivotview>
  `
})
export class PivotGridComponent implements OnInit {
  public dataSourceSettings: any;

  ngOnInit(): void {
    this.dataSourceSettings = {
      dataSource: [
        { Country: 'USA', Product: 'Bikes', Amount: 100, Units: 10 },
        { Country: 'Canada', Product: 'Bikes', Amount: 80, Units: 8 }
      ],
      rows: [{ name: 'Country' }],
      columns: [{ name: 'Product' }],
      values: [{ name: 'Amount', type: 'Sum' }]
    };
  }
}
```

### Grouping Bar Settings

Control grouping bar appearance and behavior:

```typescript
import { GroupingBarSettingsModel } from '@syncfusion/ej2-angular-pivotview';

export class PivotGridComponent implements OnInit {
  public groupingBarSettings: GroupingBarSettingsModel = {
    showFieldsPanel: true,      // Show available fields
    showFilterIcon: true,       // Show filter buttons
    showSortIcon: true,         // Show sort buttons
    showRemoveIcon: true        // Show remove buttons
  };

  // Apply settings
  ngOnInit(): void {
    // Use in template: [groupingBarSettings]="groupingBarSettings"
  }
}
```

---

## Core Features

### Field Reorganization

Users can drag fields between axes:

```
GROUPING BAR LAYOUT:

┌─ Row Axis ─────────────────────┐
│ [Country] [✓] [↑↓] [×]         │  (Filter, Sort, Remove icons)
└─────────────────────────────────┘

┌─ Column Axis ───────────────────┐
│ [Product] [✓] [↑↓] [×]          │
└─────────────────────────────────┘

┌─ Value Axis ────────────────────┐
│ [Amount] [↑↓] [×]               │
└─────────────────────────────────┘

┌─ Filter Axis ───────────────────┐
│ [Year] [✓] [↑↓] [×]             │
└─────────────────────────────────┘
```

Users can:
1. Drag "Country" from Rows to Columns
2. Drag "Product" from Columns to Rows
3. Move "Amount" to different position in Values
4. Add Year to Filter axis

### Removing Fields

Users can remove fields by clicking the × icon:

```typescript
// Removed fields return to the Fields Panel (if visible)
// and can be re-added later

public groupingBarSettings: GroupingBarSettingsModel = {
  showRemoveIcon: true  // Enable removal
};
```

### Fields Panel

Shows available fields not currently in the report:

```typescript
public groupingBarSettings: GroupingBarSettingsModel = {
  showFieldsPanel: true  // Display available fields above grouping bar
};

// Users can:
// 1. See all available fields
// 2. Drag fields from panel to axes
// 3. Search/filter field list (if field searching enabled)
```

---

## Icon Controls

### Filter Icon Management

Control filter functionality on fields:

```typescript
// Global filter icon visibility
public groupingBarSettings: GroupingBarSettingsModel = {
  showFilterIcon: true  // Show for all fields
};

// Field-specific filter visibility
public dataSourceSettings: any = {
  dataSource: [...],
  rows: [
    { name: 'Country', showFilterIcon: true },    // Show filter
    { name: 'Region', showFilterIcon: false }     // Hide filter
  ],
  columns: [
    { name: 'Product', showFilterIcon: true }
  ]
};
```

**Filter Icon Behavior:**
- Click filter icon → Member filter dialog
- Select/deselect members to include/exclude
- Apply filter to update report

### Sort Icon Management

Control sorting on fields:

```typescript
// Global sort icon visibility
public groupingBarSettings: GroupingBarSettingsModel = {
  showSortIcon: true  // Show for all fields
};

// Field-specific sort visibility
public dataSourceSettings: any = {
  rows: [
    { name: 'Country', showSortIcon: true },     // Enable sort
    { name: 'Region', showSortIcon: false }      // Disable sort
  ]
};

// Sort behavior:
// - Click once: Sort ascending (A→Z)
// - Click again: Sort descending (Z→A)
// - Third click: Return to default order
```

### Remove Icon Management

Control field removal:

```typescript
// Global remove icon visibility
public groupingBarSettings: GroupingBarSettingsModel = {
  showRemoveIcon: true  // Show for all fields
};

// Field-specific removal
public dataSourceSettings: any = {
  rows: [
    { name: 'Country', showRemoveIcon: true },   // Can remove
    { name: 'Year', showRemoveIcon: false }      // Protected
  ]
};
```

### Conditional Icon Display

Hide icons based on business logic:

```typescript
@Component({
  template: `
    <ejs-pivotview
      [groupingBarSettings]="getGroupingBarSettings()">
    </ejs-pivotview>
  `
})
export class PivotGridComponent {
  getGroupingBarSettings(): GroupingBarSettingsModel {
    return {
      showFilterIcon: this.userCanFilter(),
      showSortIcon: this.userCanSort(),
      showRemoveIcon: this.userCanModify()
    };
  }

  userCanFilter(): boolean {
    return this.currentUser.role === 'admin';
  }

  userCanSort(): boolean {
    return true;  // Always allow
  }

  userCanModify(): boolean {
    return this.currentUser.canEdit;
  }
}
```

---

## Fields Panel Management

Use `groupingBarSettings.showFieldsPanel` to toggle visibility of the fields panel when the grouping bar is active.

```typescript
public groupingBarSettings: GroupingBarSettingsModel = {
  showFieldsPanel: true  // Display available fields above grouping bar
};
```

---

## User Interactions

### Drag & Drop Operations

Users interact with grouping bar through drag-and-drop:

```typescript
// Supported drag operations:
// 1. Row → Column (move field between axes)
// 2. Row → Value (add to aggregation)
// 3. Column → Filter (apply as filter)
// 4. Reorder within same axis (change field order)
// 5. Field Panel → Any Axis (add unused field)

// Example workflow:
// User drags "Quarter" from Fields Panel to Columns axis
// Report immediately recalculates showing quarterly data
```

---

## Advanced Customization

### Responsive Grouping Bar

Adjust grouping bar for different screen sizes:

```typescript
@Component({
  template: `
    <ejs-pivotview
      [groupingBarSettings]="getResponsiveSettings()"
      [height]="getHeight()">
    </ejs-pivotview>
  `
})
export class PivotGridComponent implements OnInit {
  getResponsiveSettings(): GroupingBarSettingsModel {
    const isMobile = window.innerWidth < 768;
    
    return {
      showFieldsPanel: !isMobile,   // Hide on mobile
      showFilterIcon: true,
      showSortIcon: true,
      showRemoveIcon: true
    };
  }

  getHeight(): string {
    return window.innerWidth < 768 ? '600px' : '500px';
  }
}
```

### Grouping Bar with Readonly Fields

Prevent changes to the grouping bar by disabling drag-and-drop. Use `groupingBarSettings.allowDragAndDrop` to lock the entire grouping bar, or set `allowDragAndDrop: false` on specific fields inside `dataSourceSettings` to protect individual fields.

```typescript
// Disable dragging for all fields in grouping bar
public groupingBarSettings: GroupingBarSettingsModel = {
  allowDragAndDrop: false
};

// Or disable dragging for a specific field (Year)
public dataSourceSettings: any = {
  rows: [
    { name: 'Year', allowDragAndDrop: false }, // locked
    { name: 'Country' }
  ],
  columns: [{ name: 'Product' }]
};

// Setting allowDragAndDrop to false prevents users from rearranging the
// report layout via drag-and-drop while preserving other icon behaviors.
```

### Dynamic Icon Control

Change icon visibility based on events:

```typescript
@Component({
  template: `
    <ejs-pivotview
      [dataSourceSettings]="dataSourceSettings"
      [groupingBarSettings]="groupingBarSettings"
      (fieldDropped)="onFieldDropped($event)">
    </ejs-pivotview>
  `
})
export class PivotGridComponent {
  public groupingBarSettings: GroupingBarSettingsModel;

  onFieldDropped(args: any): void {
    // After field is dropped to new axis
    console.log('Field dropped:', args);
    
    // Update icons based on new configuration
    this.updateIconVisibility();
  }

  updateIconVisibility(): void {
    // Dynamically enable/disable icons
    // based on business rules
  }
}
```

---

## Common Use Cases

### Sales Analysis Setup

```typescript
public dataSourceSettings: any = {
  rows: [{ name: 'Product', showRemoveIcon: false }],
  columns: [{ name: 'Year', showRemoveIcon: false }],
  values: [{ name: 'Amount', type: 'Sum' }],
  filters: [{ name: 'Region', showFilterIcon: true }]
};

public groupingBarSettings: GroupingBarSettingsModel = {
  showFieldsPanel: true,
  showFilterIcon: true,
  showSortIcon: true,
  showRemoveIcon: true
};

// Users can:
// - Filter by region
// - Add salesperson dimension
// - Change sorting
// - Add additional measures
```

### Ad-Hoc Reporting

```typescript
public groupingBarSettings: GroupingBarSettingsModel = {
  showFieldsPanel: true,      // All fields available
  showFilterIcon: true,
  showSortIcon: true,
  showRemoveIcon: true
};

// Users have complete freedom to:
// - Build any report configuration
// - Add/remove all fields
// - Filter and sort any dimension
// - Drag fields anywhere
```

### Protected Configuration

```typescript
public dataSourceSettings: any = {
  rows: [
    { name: 'Year', allowDragAndDrop: false },
    { name: 'Country' }
  ],
  columns: [{ name: 'Product' }]
};

public groupingBarSettings: GroupingBarSettingsModel = {
  showFieldsPanel: false,         // Don't show unused fields
  showFilterIcon: true,           // Users can filter
  showSortIcon: true,             // Users can sort
  showRemoveIcon: true            // Users can remove columns
};

// Year axis is locked from drag-drop using allowDragAndDrop:false
// Users can still use icons (filter/sort/remove) per the show* settings
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Fields don't appear in panel | Set `showFieldsPanel: true` |
| Can't drag fields | Ensure `GroupingBarService` is injected |
| Icons not showing | Check `show*Icon` properties in settings |
| Changes don't update | Verify event handlers are bound |
| Grouping bar takes too much space | Use responsive settings to hide on mobile |

---

## Next Steps

- **Filtering**: Learn member filtering via grouping bar
- **Sorting**: Configure ascending/descending sort
- **Field Management**: Dynamically add/remove fields
- **Drill Operations**: Enable drilling through grouped data
