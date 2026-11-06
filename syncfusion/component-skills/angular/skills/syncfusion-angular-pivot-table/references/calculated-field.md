# Calculated Fields

## Table of Contents
- [Creating Calculated Fields](#creating-calculated-fields)
- [Defining Calculated Fields Programmatically](#defining-calculated-fields-programmatically)
- [Opening Dialog Programmatically](#opening-dialog-programmatically)
- [Editing Through UI](#editing-through-ui)
- [Renaming Calculated Fields](#renaming-calculated-fields)
- [Editing Formula](#editing-formula)
- [Reusing Existing Formulas](#reusing-existing-formulas)
- [Formatting Calculated Field Values](#formatting-calculated-field-values)
- [Supported Operators & Functions](#supported-operators--functions)
- [Calculated Field Events](#calculated-field-events)

---

## Creating Calculated Fields

The calculated field feature enables users to create custom value fields using mathematical formulas and existing fields from their data source. Users can perform complex calculations with basic arithmetic operators and seamlessly integrate these custom fields into their pivot table for enhanced data visualization and reporting.

Users can create calculated fields in two convenient ways:

- **Interactive Method**: Using the built-in dialog accessible from the Field List UI
- **Code-Based Method**: Configuring fields programmatically using the `calculatedFieldSettings` property

To enable the calculated field functionality, set the `allowCalculatedField` property to **true**. Once enabled, a "CALCULATED FIELD" button appears in the Field List UI. Clicking this button opens the calculated field dialog, where users can create and manage custom fields using an intuitive interface.

```typescript
import { PivotViewAllModule, CalculatedFieldService } from '@syncfusion/ej2-angular-pivotview';
import { Component } from '@angular/core';

@Component({
  imports: [PivotViewAllModule],
  providers: [CalculatedFieldService],
  selector: 'app-pivot',
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [allowCalculatedField]="true">
  </ejs-pivotview>`
})
export class AppComponent {
  dataSourceSettings: any = {
    dataSource: [
      { 'Sold': 31, 'Amount': 52824, 'Country': 'France', 'Products': 'Mountain Bikes', 'Year': 'FY 2015' }
    ],
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Amount', type: 'Sum' }]
  };
}
```

---

## Defining Calculated Fields Programmatically

You can define calculated fields programmatically using the `calculatedFieldSettings` property. This approach is ideal for pre-configuring specific calculations. The following properties are essential for creating a calculated field:

- `name`: Specifies a unique name for the calculated field
- `formula`: Defines the mathematical expression using existing field names and arithmetic operators
- `formatSettings`: Configures the number format for displaying calculated results (optional)

To use the calculated field feature, you must inject the `CalculatedFieldService` module into the pivot table.

> **Note**: The calculated field feature applies only to value fields. By default, calculated fields created programmatically are added to the field list and calculated field dialog UI. To display a calculated field in the pivot table UI, it must be added to the `values` property.

```typescript
import { PivotViewAllModule, CalculatedFieldService } from '@syncfusion/ej2-angular-pivotview';
import { Component } from '@angular/core';

@Component({
  imports: [PivotViewAllModule],
  providers: [CalculatedFieldService],
  selector: 'app-pivot',
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [allowCalculatedField]="true">
  </ejs-pivotview>`
})
export class AppComponent {
  dataSourceSettings: any = {
    dataSource: [
      { 'Sold': 31, 'Amount': 52824, 'Country': 'France', 'Year': 'FY 2015' },
      { 'Sold': 51, 'Amount': 86904, 'Country': 'France', 'Year': 'FY 2015' }
    ],
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [
      { name: 'Amount', type: 'Sum' },
      { name: 'TotalSold', type: 'CalculatedField' }
    ],
    calculatedFieldSettings: [
      {
        name: 'TotalSold',
        formula: '"Sum(Sold)" * 10'  // Multiply sold count by 10
      }
    ]
  };
}
```

---

## Opening Dialog Programmatically

You can display the calculated field dialog by calling the `createCalculatedFieldDialog` method when an external button is clicked. This provides additional flexibility for accessing the calculated field functionality:

```typescript
import { Component, ViewChild } from '@angular/core';
import { PivotViewComponent } from '@syncfusion/ej2-angular-pivotview';

@Component({
  selector: 'app-pivot',
  template: `
    <button (click)="openDialog()">Open Calculated Field Dialog</button>
    <ejs-pivotview 
      #pivotView
      [dataSourceSettings]="dataSourceSettings"
      [allowCalculatedField]="true">
    </ejs-pivotview>
  `
})
export class AppComponent {
  @ViewChild('pivotView') pivotView: PivotViewComponent;

  openDialog() {
    this.pivotView.createCalculatedFieldDialog();
  }
}
```

---

## Editing Through UI

You can easily modify existing calculated fields using the built-in edit option available in both the field list and grouping bar. This feature allows you to update formulas, change field names, or adjust formatting without recreating the entire calculated field.

To edit an existing calculated field:

1. Locate the calculated field button in either the field list or the grouping bar
2. Click the **Edit** icon next to the calculated field name
3. The calculated field dialog opens, displaying the current settings
4. Make changes to the field name, formula, or format as needed
5. Click **OK** to apply the changes

---

## Renaming Calculated Fields

You can rename any existing calculated field directly through the user interface at runtime. This option helps you maintain clear and meaningful names for your calculated fields as your analysis requirements evolve.

To rename a calculated field:

1. Locate the calculated field button in either the field list or the grouping bar
2. Click the **Edit** icon next to the calculated field name
3. The calculated field dialog opens, displaying the current field name in the text box
4. Replace the existing name with your preferred name
5. Click **OK** to save the new name

---

## Editing Formula

This option allows you to modify the formulas of existing calculated fields directly through the user interface, ensuring your calculations remain accurate and up to date with changing requirements.

To edit an existing calculated field formula:

1. Open the calculated field dialog
2. Select the calculated field you want to edit from the list
3. Click the **Edit** icon next to the selected field
4. The existing formula appears in a multiline text box at the bottom of the dialog
5. Update the formula according to your requirements
6. Click **OK** to save your changes

The pivot table will automatically refresh to reflect the updated calculations.

---

## Reusing Existing Formulas

This option enables you to quickly create new calculated fields by reusing formulas from existing fields, saving time and ensuring consistency across your calculations.

To reuse an existing formula:

1. Open the calculated field dialog to create a new field
2. Locate the existing calculated field whose formula you want to reuse
3. Drag the existing calculated field from the tree view
4. Drop it into the **Formula** section
5. The formula from the existing field is automatically added to your new calculated field
6. Modify the formula further if needed, or use it as is
7. Click **OK** to create the new calculated field

---

## Formatting Calculated Field Values

Formatting calculated field values enhances the readability and insight of your data in the pivot table. You can apply different formats using the calculated field dialog in the UI or programmatically through code.

To format calculated field values in your code, use the `formatSettings` property. Apply formats to calculated fields using a separate `formatSettings` array in `dataSourceSettings`:

```typescript
dataSourceSettings: any = {
  dataSource: data,
  rows: [{ name: 'Country' }],
  columns: [{ name: 'Year' }],
  values: [
    { name: 'Amount', type: 'Sum' },
    { name: 'ProfitMargin', type: 'CalculatedField' },
    { name: 'GrowthRate', type: 'CalculatedField' }
  ],
  calculatedFieldSettings: [
    {
      name: 'ProfitMargin',
      formula: '("Sum(Amount)" - "Sum(Cost)") / "Sum(Amount)" * 100'
    },
    {
      name: 'GrowthRate',
      formula: '(("Sum(Current)" - "Sum(Previous)") / "Sum(Previous)") * 100'
    }
  ],
  formatSettings: [
    { name: 'Amount', format: 'C2' },          // Currency format
    { name: 'ProfitMargin', format: 'N2' },    // Number format
    { name: 'GrowthRate', format: 'P2' }       // Percentage format
  ]
};
```

### Format Options Through UI

To apply formatting to calculated field values via the user interface, use the built-in "Format" dropdown available in the calculated field dialog. This dropdown provides the following predefined format options:

* **Standard** - Displays numbers in their basic numeric form
* **Currency** - Displays numbers as currency values
* **Percent** - Displays numbers as percentage values
* **Custom** - Allows you to specify a custom format pattern
* **None** - Applies no formatting to the values (default)

### Format Codes

| Code | Format | Example |
|------|--------|---------|
| N | Number | 'N2' displays 1234.56 |
| C | Currency | 'C2' displays $1,234.56 |
| P | Percentage | 'P2' displays 12.34% |
| G | General | Default format |
| E | Scientific | 1.23E+02 |

> **Note**: By default, **None** is selected in the format dropdown. For specific formatting requirements, select the **Custom** option to enter custom format patterns.

---

## Supported Operators & Functions

Below is a list of operators and functions that can be used in the formula to create calculated fields:

### Arithmetic Operators
* `+` Addition operator: `X + Y`
* `-` Subtraction operator: `X - Y`
* `*` Multiplication operator: `X * Y`
* `/` Division operator: `X / Y`
* `^` Power operator: `X^2`

### Comparison Operators
* `<` Less than operator: `X < Y`
* `<=` Less than or equal operator: `X <= Y`
* `>` Greater than operator: `X > Y`
* `>=` Greater than or equal operator: `X >= Y`
* `==` Equal operator: `X == Y`
* `!=` Not equal operator: `X != Y`

### Logical Operators
* `&` AND operator: `X & Y`
* `|` OR operator: `X | Y`
* `?` Conditional/Ternary operator: `condition ? then : else`

### Functions
* `isNaN()` Checks if the value is not a number: `isNaN(value)`
* `!isNaN()` Checks if the value is a number: `!isNaN(value)`
* `abs()` Returns the absolute value of a number: `abs(number)`
* `min()` Returns the minimum value: `min(number1, number2)`
* `max()` Returns the maximum value: `max(number1, number2)`

> **Note**: You can also use JavaScript [Math](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math) object properties and methods directly in the formula.

### Example Using Math Functions

```typescript
calculatedFieldSettings: [
  {
    name: 'StandardDeviation',
    formula: 'Math.sqrt("Sum(Variance)")'
  },
  {
    name: 'LogValue',
    formula: 'Math.log("Sum(Amount)")'
  },
  {
    name: 'RoundedValue',
    formula: 'Math.round("Sum(Amount)")'
  }
]
```

---

## Formatting Calculated Field Values

Apply number formats to calculated fields using a separate `formatSettings` array in `dataSourceSettings` (NOT inside `calculatedFieldSettings`):

```typescript
dataSourceSettings: IDataOptions = {
  dataSource: data,
  rows: [{ name: 'Category' }],
  columns: [{ name: 'Region' }],
  values: [
    { name: 'Amount', type: 'Sum' },
    { name: 'TotalRevenue', type: 'CalculatedField' },       // Calculated field
    { name: 'GrowthPercentage', type: 'CalculatedField' },   // Calculated field
    { name: 'SuccessRate', type: 'CalculatedField' }         // Calculated field
  ],
  calculatedFieldSettings: [
    {
      name: 'TotalRevenue',
      formula: '"Sum(Amount)" * "Count(Units)"'
    },
    {
      name: 'GrowthPercentage',
      formula: '("Sum(Current)" - "Sum(Previous)") / "Sum(Previous)" * 100'
    },
    {
      name: 'SuccessRate',
      formula: '("Sum(Success)" / "Sum(Total)") * 100'
    }
  ],
  // SEPARATE formatSettings array in dataSourceSettings
  formatSettings: [
    {
      name: 'TotalRevenue',
      format: 'C2'  // Currency: $1,234.56
    },
    {
      name: 'GrowthPercentage',
      format: 'N2'  // Number: 1,234.56
    },
    {
      name: 'SuccessRate',
      format: 'P2'  // Percentage: 12.34%
    }
  ]
};
```

**Important**: `formatSettings` is a SEPARATE array at the `dataSourceSettings` level, NOT nested inside `calculatedFieldSettings`.

**Format Codes:**
- `N` = Number (e.g., 'N2' for 2 decimals: 1,234.56)
- `C` = Currency (e.g., 'C2' for currency: $1,234.56)
- `P` = Percentage (e.g., 'P2' for percentage: 12.34%)
- `G` = General format (default)

---

## Calculated Field Events

### CalculatedFieldCreate Event

The `calculatedFieldCreate` event enables you to validate and manage calculated field details before they are applied to the pivot table. This ensures data accuracy and prevents invalid configurations. The event is triggered when the "OK" button is clicked to close the calculated field dialog.

**Event Parameters:**

* `calculatedField`: Contains the calculated field information (new or existing) that was entered in the dialog
* `calculatedFieldSettings`: Provides access to the current `calculatedFieldSettings` of the pivot table
* `cancel`: A boolean property that prevents the dialog changes from being applied when set to **true**
* `dataSourceSettings`: Contains the current data source configuration
* `fieldName`: Specifies the name of the field being created or updated

**Example: Prevent fields without format**

```typescript
import { Component } from '@angular/core';
import { PivotViewAllModule, CalculatedFieldService } from '@syncfusion/ej2-angular-pivotview';

@Component({
  imports: [PivotViewAllModule],
  providers: [CalculatedFieldService],
  selector: 'app-pivot',
  template: `<ejs-pivotview 
    [dataSourceSettings]="dataSourceSettings"
    [allowCalculatedField]="true"
    (calculatedFieldCreate)="onCalculatedFieldCreate($event)">
  </ejs-pivotview>`
})
export class AppComponent {
  dataSourceSettings: any = {
    dataSource: [],
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Amount', type: 'Sum' }]
  };

  onCalculatedFieldCreate(args: any) {
    if (!args.calculatedField.formatString) {
      args.cancel = true;
      alert('Please specify a format for the calculated field');
    }
  }
}
```

### ActionBegin Event

The `actionBegin` event allows you to control and monitor calculated field operations before they are executed. This event is triggered when users interact with calculated field functionality:

- Clicking the calculated field button
- Clicking the edit icon for an existing calculated field
- Using the context menu in the tree view within the calculated field dialog

**Event Parameters:**

* `dataSourceSettings`: Contains the current data source configuration
* `actionName`: Identifies the specific action the user is attempting. Possible values:
  - "Open calculated field dialog"
  - "Edit calculated field"
  - "Calculated field context menu"
* `fieldInfo`: Provides information about the selected field
* `cancel`: A boolean property that allows you to prevent the current action from completing

**Example: Prevent specific field editing**

```typescript
actionBegin(args: any) {
  if (args.actionName === 'Edit calculated field') {
    if (args.fieldInfo.name === 'ProtectedField') {
      args.cancel = true;
      console.log('This calculated field cannot be edited');
    }
  }
}
```

### ActionComplete Event

The `actionComplete` event enables you to track when calculated field operations are successfully completed. This event is useful for performing additional actions or logging activities after users create or modify calculated fields.

**Event Parameters:**

* `dataSourceSettings`: Contains the updated data source configuration after the operation
* `actionName`: Identifies the specific action completed. Possible values:
  - "Calculated field applied" (when created)
  - "Calculated field edited" (when modified)
* `fieldInfo`: Provides information about the selected field
* `actionInfo`: Contains detailed information about the completed action

**Example: Log completed operations**

```typescript
actionComplete(args: any) {
  if (args.actionName === 'Calculated field applied') {
    console.log('Calculated field successfully created:', args.actionInfo);
  }
  
  if (args.actionName === 'Calculated field edited') {
    console.log('Calculated field successfully updated');
  }
}
```

### ActionFailure Event

The `actionFailure` event is triggered when a UI action fails to produce the expected result. This event provides detailed information about the failure.

**Event Parameters:**

* `actionName`: Identifies the failed action
* `errorInfo`: Contains the error information

**Example:**

```typescript
actionFailure(args: any) {
  console.error('Action failed:', args.actionName, args.errorInfo);
}
```

---

## Best Practices

1. **Enable CalculatedFieldService**: Always inject the `CalculatedFieldService` provider when using calculated fields
2. **Use Meaningful Names**: Give calculated fields descriptive names that reflect their purpose (e.g., 'ProfitMargin', 'AvgOrderValue')
3. **Validate Formulas**: Use the `calculatedFieldCreate` event to validate formulas before creation
4. **Apply Formats**: Always format calculated fields with appropriate number formats (Currency, Percentage, etc.)
5. **Document Complex Formulas**: Add comments explaining complex formula logic for maintainability
6. **Test Edge Cases**: Verify calculated field behavior with edge case data values
7. **Use Aggregation Functions**: Leverage Sum, Count, Avg, Min, Max functions in formulas for dynamic calculations
