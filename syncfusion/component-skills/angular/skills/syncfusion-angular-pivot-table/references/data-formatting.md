# Data Formatting

## Table of Contents
- [Number Formatting](#number-formatting)
- [Format Type Codes](#format-type-codes)
- [Custom Formats](#custom-formats)
- [Format Settings Properties](#format-settings-properties)
- [Runtime Number Formatting](#runtime-number-formatting)
- [Conditional Formatting](#conditional-formatting)
- [Conditional Format Conditions](#conditional-format-conditions)
- [Style Properties](#style-properties)
- [Runtime Conditional Formatting](#runtime-conditional-formatting)

---

## Number Formatting

### Format Settings Configuration

Define number formats using the `formatSettings` property in `dataSourceSettings`:

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
            rows: [{ name: 'Region' }],
            columns: [{ name: 'Year' }],
            values: [
                { name: 'Sales', type: 'Sum' },
                { name: 'Quantity', type: 'Count' }
            ],
            formatSettings: [
                { name: 'Sales', format: 'C2', useGrouping: true, currency: 'USD' },
                { name: 'Quantity', format: 'N0' }
            ]
        };
    }
}
```

---

## Format Type Codes

| Code | Type | Example |
|------|------|---------|
| `N0` | Number: 1,234,567 | Whole number with grouping |
| `N2` | Number: 1,234,567.89 | 2 decimal places |
| `C2` | Currency: $1,234.56 | Currency with 2 decimals |
| `P0` | Percentage: 12% | Percentage, no decimals |
| `P2` | Percentage: 12.34% | 2 decimal places |

---

## Custom Formats

Use format specifiers (0, #, %, $, ;) for custom patterns:

```typescript
formatSettings: [
    { name: 'Sales', format: '$#,##0.00' },        // $1,234.56
    { name: 'Revenue', format: '#,##0,, "M"' },    // 1.2M (millions)
    { name: 'Rate', format: '0.00%' },             // 12.34%
    { name: 'Variance', format: '#,##0;(#,##0)' }  // Negative: (1,234)
]
```

| Specifier | Description |
|-----------|-------------|
| `0` | Digit placeholder (shows zero if absent) |
| `#` | Digit placeholder (no zero if absent) |
| `.` | Decimal point |
| `%` | Percentage format |
| `$` | Currency symbol |
| `;` | Separate formats for positive/negative/zero |

---

## Format Settings Properties

| Property | Type | Description |
|----------|------|-------------|
| `name` | string | Field name to format |
| `format` | string | Format code or pattern |
| `useGrouping` | boolean | Display grouping separators (default: true) |
| `currency` | string | Currency code: USD, EUR, GBP (default: USD) |

> **Note:** When using custom format, `useGrouping` and `currency` are ignored.

---

## Runtime Number Formatting

Enable users to apply formatting through the toolbar dialog:

```typescript
import { Component } from '@angular/core';
import { NumberFormattingService } from '@syncfusion/ej2-angular-pivotview';

@Component({
    selector: 'app-pivot',
    template: `<ejs-pivotview 
        [dataSourceSettings]=dataSourceSettings
        [allowNumberFormatting]="true"
        [showToolbar]="true"
        [toolbar]="['NumberFormatting']">
    </ejs-pivotview>`,
    providers: [NumberFormattingService]
})
export class AppComponent {
    public dataSourceSettings: any = { /* config */ };
}
```

Open dialog programmatically:
```typescript
// this.pivot is ViewChild reference
this.pivot.showNumberFormattingDialog();
```

---

## Conditional Formatting

### Code-Based Configuration

Apply formatting rules using `conditionalFormatSettings`:

```typescript
dataSourceSettings: DataSourceSettingsModel = {
    dataSource: data,
    rows: [{ name: 'Region' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Sales', type: 'Sum' }],
    conditionalFormatSettings: [
        {
            measure: 'Sales',
            conditions: 'GreaterThan',
            value1: 100000,
            style: {
                backgroundColor: '#4CAF50',
                color: '#FFF',
                fontFamily: 'Arial',
                fontSize: '13px'
            }
        },
        {
            measure: 'Sales',
            conditions: 'LessThan',
            value1: 50000,
            style: {
                backgroundColor: '#F44336',
                color: '#FFF'
            }
        }
    ]
};
```

Apply to all value fields (omit `measure`):
```typescript
conditionalFormatSettings: [
    {
        conditions: 'GreaterThan',
        value1: 500000,
        style: { backgroundColor: '#FFD700', color: '#000' }
    }
]
```

---

## Conditional Format Conditions

| Condition | Description | Needs value2 |
|-----------|-------------|--------------|
| `Equals` | Equal to value1 | No |
| `NotEquals` | Not equal to value1 | No |
| `GreaterThan` | Greater than value1 | No |
| `GreaterThanOrEquals` | Greater than or equal | No |
| `LessThan` | Less than value1 | No |
| `LessThanOrEquals` | Less than or equal | No |
| `Between` | Between value1 and value2 | **Yes** |
| `NotBetween` | Outside range | **Yes** |
| `Contains` | Text contains substring | No |
| `StartWith` | Begins with text | No |
| `EndWith` | Ends with text | No |

---

## Style Properties

Customize cell appearance with the `style` object:

```typescript
style: {
    backgroundColor: '#4CAF50',     // Hex or RGB color
    color: '#FFF',                  // Text color
    fontFamily: 'Arial',            // Font family
    fontSize: '13px'                // Font size with unit
}
```

---

## Runtime Conditional Formatting

Enable users to create formatting rules at runtime:

```typescript
import { Component } from '@angular/core';
import { ConditionalFormattingService } from '@syncfusion/ej2-angular-pivotview';

@Component({
    selector: 'app-pivot',
    template: `<ejs-pivotview 
        [dataSourceSettings]=dataSourceSettings
        [allowConditionalFormatting]="true"
        [showToolbar]="true"
        [toolbar]="['ConditionalFormatting']"
        (conditionalFormatting)="onConditionalFormatting($event)">
    </ejs-pivotview>`,
    providers: [ConditionalFormattingService]
})
export class AppComponent {
    public dataSourceSettings: any = { /* config */ };

    onConditionalFormatting(args: any) {
        // Validate or modify formatting before applying
        if (args.measure === 'InternalField') {
            args.cancel = true;  // Prevent formatting
        }
    }
}
```

Open dialog programmatically:
```typescript
this.pivot.showConditionalFormattingDialog();
```
