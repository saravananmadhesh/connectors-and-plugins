# Drill Down & Drill Up

## Table of Contents
- [Drill Down & Drill Up](#drill-down--drill-up-overview)
- [Drill Position](#drill-position)
- [Expand All Features](#expand-all-features)
- [Expand/Collapse Specific Members](#expandcollapse-specific-members)
- [Drill Events](#drill-events)

---

## Drill Down & Drill Up Overview

The drill-down and drill-up features allow users to expand or collapse hierarchical data for detailed or summarized views. When a field member contains child items, expand and collapse icons automatically appear in the corresponding row or column header.

### Automatic Drill Icons

When field members contain child items, expand (▼) and collapse (▲) icons automatically appear. Clicking these icons expands the selected item to display child members or collapses it to show a summarized view.

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
    selector: 'app-pivot',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        this.dataSourceSettings = {
            dataSource: data,
            rows: [
                { name: 'Country' },      // Parent level
                { name: 'Region' }        // Child level (can drill)
            ],
            columns: [{ name: 'Year' }],
            values: [{ name: 'Sales', type: 'Sum' }]
        };
    }
}
```

### Use Cases

- Analyze overall sales by country, then drill into specific regional details
- View annual performance, then expand to quarterly and monthly views
- Examine top-level summaries before looking at detailed transactions
- Navigate hierarchical data without losing the broader context

---

## Drill Position

The drill-down and drill-up features allow you to expand or collapse data for a **specific member** without affecting the same member in other positions. For example, if both "FY 2015" and "FY 2016" have "Quarter 1" as a child, drilling down into "Quarter 1" under "FY 2015" expands only that specific instance, while "Quarter 1" under "FY 2016" remains unchanged.

**Key Feature:** Position-based drilling makes the pivot table faster and more efficient by only affecting the targeted member.

### Example Scenario

```typescript
// The same "Q1" member appears under both years
// Expanding Q1 under 2015 does NOT expand Q1 under 2016
dataSourceSettings: {
    dataSource: data,
    rows: [{ name: 'Region' }],
    columns: [
        { name: 'Year' },      // 2015, 2016
        { name: 'Quarter' }    // Q1, Q2, Q3, Q4 (per year)
    ],
    values: [{ name: 'Sales', type: 'Sum' }]
};
```

---

## Expand All Features

Expand all features allow programmatic control over the initial state of hierarchical data in the Pivot Table.

### Expand All Members

To display all hierarchical members in an expanded state, set the [`expandAll`](https://ej2.syncfusion.com/angular/documentation/api/pivotview/dataSourceSettings/#expandall) property to **true**:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
    selector: 'app-pivot',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        this.dataSourceSettings = {
            dataSource: data,
            expandAll: true,  // All hierarchies initially expanded
            rows: [
                { name: 'Country' },
                { name: 'State' },
                { name: 'City' }
            ],
            columns: [{ name: 'Year' }],
            values: [{ name: 'Sales', type: 'Sum' }]
        };
    }
}
```

### Expand Specific Field Headers

To expand all headers for **specific fields** only, set the [`expandAll`](https://ej2.syncfusion.com/angular/documentation/api/pivotview/fieldOptionsModel/#expandall) property on individual field definitions:

```typescript
rows: [
    { name: 'Country', expandAll: true },   // All countries expanded
    { name: 'State', expandAll: false }      // States collapsed initially
],
columns: [
    { name: 'Year', expandAll: true }        // All years expanded
]
```

### Collapse All (Default Behavior)

By default, [`expandAll`](https://ej2.syncfusion.com/angular/documentation/api/pivotview/dataSourceSettings/#expandall) is **false**, so only top-level field members are shown until the user manually expands them.

```typescript
// Default behavior - collapsed
dataSourceSettings = {
    expandAll: false,  // or omit this property (false is default)
    rows: [{ name: 'Country' }, { name: 'State' }],
    // Only Country level is visible initially
}
```

---

## Expand/Collapse Specific Members

Control the initial expanded or collapsed state of specific field members using the [`drilledMembers`](https://ej2.syncfusion.com/angular/documentation/api/pivotview/drillOptions/) property.

### Expand Specific Members Only

To expand only specific members while keeping others collapsed:

```typescript
import { Component, OnInit } from '@angular/core';
import { DataSourceSettingsModel } from '@syncfusion/ej2-pivotview/src/model/datasourcesettings-model';

@Component({
    selector: 'app-pivot',
    template: `<ejs-pivotview [dataSourceSettings]=dataSourceSettings></ejs-pivotview>`
})
export class AppComponent implements OnInit {
    public dataSourceSettings: DataSourceSettingsModel;

    ngOnInit(): void {
        this.dataSourceSettings = {
            dataSource: data,
            rows: [{ name: 'Country' }, { name: 'Region' }],
            columns: [{ name: 'Year' }],
            values: [{ name: 'Sales', type: 'Sum' }],
            // Only expand France, collapse all others
            drilledMembers: [
                { name: 'Country', items: ['France'] }
            ]
        };
    }
}
```

### Expand All Except Specific Members

To expand all members except for specific ones:

```typescript
expandAll: true,
drilledMembers: [
    { name: 'Country', items: ['France'] }  // France stays collapsed despite expandAll: true
]
```

### Properties of drilledMembers

| Property | Description |
|----------|-------------|
| **name** | Field name whose members should be expanded/collapsed |
| **items** | Array of specific member names to control |
| **delimiter** | Character separating parent and child members (default: ".") |

### Multi-Level Member Specification

Use the delimiter to specify nested members:

```typescript
drilledMembers: [
    {
        name: 'Geography',
        items: ['USA.North', 'USA.South'],  // Expand specific regions
        delimiter: '.'                       // Parent.Child format
    }
]
```

---

## Drill Events

The Pivot Table provides several events to handle drill operations programmatically.

### Drill Event

Triggered each time a field member is expanded or collapsed:

```typescript
import { Component, ViewChild } from '@angular/core';
import { PivotViewComponent } from '@syncfusion/ej2-angular-pivotview';

@Component({
    selector: 'app-pivot',
    template: `<ejs-pivotview 
      [dataSourceSettings]=dataSourceSettings
      (drill)="onDrill($event)">
    </ejs-pivotview>`
})
export class AppComponent {
    @ViewChild('pivotGrid') pivotGrid: PivotViewComponent;
    
    dataSourceSettings: any = { /* config */ };

    onDrill(args: any) {
        console.log('Drill Info:', args.drillInfo);  // Member being drilled
        console.log('PivotView:', args.pivotview);   // Component reference
        
        // Cancel drill operation if needed
        if (args.drillInfo.name === 'France') {
            args.cancel = true;  // Prevent expanding France
        }
    }
}
```

**Event Parameters:**
- `drillInfo` - Contains information about the currently drilled field member
- `pivotview` - Reference to the Pivot Table component instance
- `cancel` - Set to true to prevent the drill action

### ActionBegin Event

Triggered when a user starts a drill action (expand/collapse):

```typescript
actionBegin(args: PivotActionBeginEventArgs) {
    if (args.actionName === 'Drill down') {
        console.log('User expanding:', args.fieldInfo);
    } else if (args.actionName === 'Drill up') {
        console.log('User collapsing:', args.fieldInfo);
    }
    
    // Prevent drill action if needed
    // args.cancel = true;
}
```

**Action Names:**
- `'Drill down'` - User expanding a member
- `'Drill up'` - User collapsing a member

### ActionComplete Event

Triggered when a drill action completes successfully:

```typescript
actionComplete(args: PivotActionCompleteEventArgs) {
    if (args.actionName === 'Drill down') {
        console.log('Expansion completed:', args.actionInfo);
    } else if (args.actionName === 'Drill up') {
        console.log('Collapse completed:', args.actionInfo);
    }
}
```

### ActionFailure Event

Triggered when a drill action fails:

```typescript
actionFailure(args: PivotActionFailureEventArgs) {
    if (args.actionName === 'Drill down') {
        console.error('Failed to expand:', args.errorInfo);
    } else if (args.actionName === 'Drill up') {
        console.error('Failed to collapse:', args.errorInfo);
    }
}
```

---

## Common Patterns

### Pattern 1: Show All Expanded Initially

```typescript
dataSourceSettings = {
    expandAll: true,  // All levels visible on load
    rows: [{ name: 'Country' }, { name: 'Region' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
}
```

### Pattern 2: Select Specific Expanded Members

```typescript
dataSourceSettings = {
    expandAll: false,  // Default collapsed
    drilledMembers: [
        { name: 'Country', items: ['USA', 'Canada'] }  // Only these expanded
    ],
    rows: [{ name: 'Country' }, { name: 'Region' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }]
}
```

### Pattern 3: Prevent Expansion of Specific Members

```typescript
drill(args: any) {
    const restrictedMembers = ['France', 'Germany'];
    if (restrictedMembers.includes(args.drillInfo.name)) {
        args.cancel = true;  // Block expansion
    }
}
```

### Pattern 4: Track Drill Depth

```typescript
actionBegin(args: PivotActionBeginEventArgs) {
    if (args.actionName === 'Drill down') {
        this.drillDepth++;
        console.log('Current depth:', this.drillDepth);
    } else if (args.actionName === 'Drill up') {
        this.drillDepth--;
    }
}
```
