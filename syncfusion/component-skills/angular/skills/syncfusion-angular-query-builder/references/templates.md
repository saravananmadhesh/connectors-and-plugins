# Templates & Model Binding — Syncfusion Angular Query Builder

Customize the Query Builder's UI by replacing default elements with custom Angular components. Templates let you control headers, column value inputs, and entire rule layouts. Model binding lets you configure the underlying Syncfusion input components (dropdowns, number boxes, etc.) used by the Query Builder.

---

## Table of Contents
- [Header Template](#header-template)
- [Column Template](#column-template)
- [Column NgTemplate](#column-ngtemplate)
- [Rule Template](#rule-template)
- [Model Binding](#model-binding)

---

## Header Template

Replace the default group header (AND/OR buttons + add/delete) with a fully custom interface. Use the `#headerTemplate` template variable on an `<ng-template>` inside `<ejs-querybuilder>`.

The custom header receives a `data` context object with:
- `data.ruleID` — the ID of the current group (e.g., `querybuilder_group0`)
- `data.condition` — current connector (`'and'` or `'or'`)
- `data.notCondition` — current NOT state (only present if `enableNotCondition` is true)

```typescript
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { CheckBoxModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons';
import { Component } from '@angular/core';

@Component({
  imports: [QueryBuilderModule, CheckBoxModule, DropDownListModule, DropDownButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-querybuilder #querybuilder id="querybuilder" width="100%"
      [rule]="importRules" [enableNotCondition]="true"
      (actionBegin)="actionBegin($event)">
      <e-columns>
        <e-column field="EmployeeID" label="EmployeeID" type="number"></e-column>
        <e-column field="FirstName"  label="FirstName"  type="string"></e-column>
        <e-column field="Country"    label="Country"    type="string"></e-column>
      </e-columns>

      <ng-template #headerTemplate let-data>
        <div class="e-groupheader">
          <!-- NOT checkbox (only shown when group has notCondition) -->
          <button *ngIf="data.notCondition !== undefined" class="e-cb-wrapper">
            <ejs-checkbox
              id="{{data.ruleID}}_notOption"
              label="not"
              [checked]="data.notCondition"
              (change)="onChange($event)">
            </ejs-checkbox>
          </button>

          <!-- AND/OR selector -->
          <ejs-dropdownlist
            id="{{data.ruleID}}_cndtn"
            [dataSource]="conditionData"
            [value]="data.condition"
            [fields]="fields"
            cssClass="e-custom-group-btn"
            (change)="conditionChange($event)">
          </ejs-dropdownlist>

          <!-- Add Rule/Group split button -->
          <button
            ejs-dropdownbutton
            id="{{data.ruleID}}_addbtn"
            [items]="addButtonItems"
            cssClass="e-round e-small e-caret-hide e-add-btn"
            iconCss="e-icons e-add-icon"
            (select)="onSelect($event)">
          </button>

          <!-- Delete Group button (not shown on root group) -->
          <button
            ejs-button
            *ngIf="data.ruleID !== 'querybuilder_group0'"
            id="{{data.ruleID}}_dltbtn"
            class="e-btn e-delete-btn e-small e-round e-icon-btn"
            (click)="onClick($event)">
            <span class="e-btn-icon e-icons e-delete-icon"></span>
          </button>
        </div>
      </ng-template>
    </ejs-querybuilder>
  `
})
export class App {
  public conditionData = [{ text: 'AND', value: 'and' }, { text: 'OR', value: 'or' }];
  public fields = { text: 'text', value: 'value' };
  public addButtonItems = [{ text: 'Add Condition' }, { text: 'Add Group' }];

  public importRules = {
    condition: 'and',
    rules: [
      { field: 'EmployeeID', label: 'EmployeeID', type: 'number', operator: 'equal', value: 1 }
    ]
  };

  actionBegin(args: any): void {
    if (args.requestType === 'header-template-create') {
      // Initialize custom header controls here if needed
    }
  }

  conditionChange(args: any): void { /* handle condition change */ }
  onChange(args: any): void { /* handle NOT checkbox change */ }
  onSelect(args: any): void { /* handle add rule/group selection */ }
  onClick(args: any): void { /* handle delete group click */ }
}
```

> The `actionBegin` event with `requestType === 'header-template-create'` fires when the header template is being initialized. Use it to bind event handlers or set initial values on custom controls.

---

## Column Template

Define custom input widgets for individual columns using the `template` property. The template must implement three lifecycle functions:

| Function | Purpose |
|---|---|
| `create()` | Create and return the DOM element for the custom widget |
| `write(args)` | Initialize the widget and bind the current rule value |
| `destroy(args)` | Clean up the widget instance to prevent memory leaks |

```typescript
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Component } from '@angular/core';

@Component({
  imports: [QueryBuilderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-querybuilder width="100%" [rule]="importRules">
      <e-columns>
        <e-column field="Category"    label="Category"     type="string"></e-column>
        <e-column field="PaymentMode" label="Payment Mode" type="string"
          [template]="paymentTemplate">
        </e-column>
      </e-columns>
    </ejs-querybuilder>
  `
})
export class App {
  public paymentTemplate = {
    create: () => {
      const elem = document.createElement('input');
      elem.setAttribute('type', 'text');
      return elem;
    },
    write: (args: any) => {
      const dropDownObj = new DropDownList({
        dataSource: ['Cash', 'Debit Card', 'Credit Card', 'Net Banking'],
        value: args.values,
        change: (e: any) => {
          // Update the rule value when selection changes
          args.updateRules(e.element, e.value);
        }
      });
      dropDownObj.appendTo(args.elements);
      // Store instance for cleanup
      (args.elements as any).__dropDown = dropDownObj;
    },
    destroy: (args: any) => {
      const dropDown = (args.elements as any).__dropDown;
      if (dropDown) { dropDown.destroy(); }
    }
  };

  public importRules = {
    condition: 'and',
    rules: [
      { field: 'PaymentMode', label: 'Payment Mode', type: 'string', operator: 'equal', value: 'Cash' }
    ]
  };
}
```

---

## Column NgTemplate

Use Angular `NgTemplate` for column value inputs — a cleaner, Angular-native approach:

```html
<ejs-querybuilder id="querybuilder" #querybuilder width="100%" [rule]="importRules">
  <e-columns>
    <e-column field="Category"        label="Category"          type="string"></e-column>

    <!-- Column with NgTemplate for value input -->
    <e-column field="PaymentMode" label="Payment Mode" type="string" [operators]="paymentOperators">
      <ng-template #template let-data>
        <ejs-dropdownlist
          [dataSource]="paymentModes"
          [value]="data.rule.value"
          (change)="paymentChange($event, data.ruleID)">
        </ejs-dropdownlist>
      </ng-template>
    </e-column>

    <!-- Column with checkbox NgTemplate -->
    <e-column field="TransactionType" label="Transaction Type" type="string" [operators]="boolOperators">
      <ng-template #template let-data>
        <ejs-checkbox
          label="Is Expense"
          [checked]="data.rule.value === 'Expense'"
          (change)="transactionChange($event, data.ruleID)">
        </ejs-checkbox>
      </ng-template>
    </e-column>

    <e-column field="Amount" label="Amount" type="number"></e-column>
  </e-columns>
</ejs-querybuilder>
```

```typescript
export class App {
  @ViewChild('querybuilder') qb!: QueryBuilderComponent;

  public paymentModes = ['Cash', 'Debit Card', 'Credit Card', 'Net Banking'];
  public paymentOperators = [{ value: 'equal', text: 'Equal' }, { value: 'notequal', text: 'Not Equal' }];
  public boolOperators   = [{ value: 'equal', text: 'Equal' }];

  paymentChange(args: any, ruleID: string): void {
    this.qb.notifyChange(args.value, args.element, 'value');
  }

  transactionChange(args: any, ruleID: string): void {
    const value = args.checked ? 'Expense' : 'Income';
    this.qb.notifyChange(value, args.element, 'value');
  }
}
```

> Use `this.qb.notifyChange(value, element, 'value')` to update the internal rule model when a custom NgTemplate input changes.

---

## Rule Template

A rule template replaces the **entire rule row** (field selector + operator + value) with a completely custom layout. Use `ruleTemplate` on a column plus handle initialization via `actionBegin`.

```html
<ejs-querybuilder id="querybuilder" #querybuilder width="100%"
  [rule]="importRules" (actionBegin)="actionBegin($event)">
  <e-columns>
    <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
    <e-column field="FirstName"  label="First Name"  type="string"></e-column>

    <!-- Custom rule template for Age column -->
    <e-column field="Age" label="Age" type="number">
      <ng-template #ruleTemplate let-data>
        <div class="e-rule e-rule-template">
          <div class="e-rule-header">
            <!-- Custom field selector -->
            <div class="e-rule-filter">
              <ejs-dropdownlist
                [fields]="data.fields"
                [dataSource]="data.columns"
                [value]="data.rule.field"
                (change)="fieldChange($event)">
              </ejs-dropdownlist>
            </div>

            <!-- Custom value input: slider instead of number box -->
            <div *ngIf="data.rule.type === 'number'" class="e-rule-value">
              <ejs-slider
                [value]="data.rule.value"
                min="18" max="65"
                id="{{data.ruleID}}_valuekey0"
                (change)="valueChange($event, data.ruleID)">
              </ejs-slider>
            </div>

            <!-- Rule action buttons -->
            <div class="e-rule-btn">
              <button class="e-removerule e-rule-delete e-btn e-small e-round">
                <span class="e-btn-icon e-icons e-delete-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </ng-template>
    </e-column>
  </e-columns>
</ejs-querybuilder>
```

```typescript
export class App {
  @ViewChild('querybuilder') qb!: QueryBuilderComponent;

  actionBegin(args: any): void {
    if (args.requestType === 'template-initialize') {
      // Set default operator for rule template columns
      args.rule.operator = 'greaterthanorequal';
    }
  }

  fieldChange(args: any): void {
    this.qb.notifyChange(args.value, args.element, 'field');
  }

  valueChange(args: any, ruleID: string): void {
    const elem = document.getElementById(`${ruleID}_valuekey0`);
    this.qb.notifyChange(args.value, elem, 'value');
  }
}
```

> The `#ruleTemplate` template variable identifies the NgTemplate as a rule template for its parent column.

---

## Model Binding

Model binding lets you configure the Syncfusion input components the Query Builder uses internally for field, operator, and value selectors. This is useful for enabling search/filtering in the dropdowns or customizing their appearance.

```html
<ejs-querybuilder
  [fieldModel]="fieldModel"
  [operatorModel]="operatorModel"
  [valueModel]="valueModel"
  [rule]="importRules">
  <e-columns>
    <e-column field="EmployeeID" label="EmployeeID" type="number"></e-column>
    <e-column field="FirstName"  label="FirstName"  type="string"></e-column>
    <e-column field="Age"        label="Age"        type="number"></e-column>
  </e-columns>
</ejs-querybuilder>
```

```typescript
// Enable filtering in field and operator dropdowns
public fieldModel    = { allowFiltering: true, popupHeight: '400px' };
public operatorModel = { allowFiltering: true, popupHeight: '500px' };

// Customize value inputs by type
public valueModel = {
  numericTextBoxModel: { cssClass: 'e-custom', min: 0, max: 100 },
  multiSelectModel:    { cssClass: 'e-custom', mode: 'CheckBox' },
  datePickerModel:     { cssClass: 'e-custom', format: 'dd/MM/yyyy' },
  textBoxModel:        { cssClass: 'e-custom', placeholder: 'Enter value' },
  radioButtonModel:    { cssClass: 'e-custom' }
};
```

**valueModel sub-properties:**

| Property | Applies to | Purpose |
|---|---|---|
| `numericTextBoxModel` | `type="number"` columns | Configure the NumericTextBox |
| `multiSelectModel` | `[values]` string columns with `in`/`notin` | Configure the MultiSelect |
| `datePickerModel` | `type="date"` columns | Configure the DatePicker |
| `textBoxModel` | `type="string"` free-text columns | Configure the TextBox |
| `radioButtonModel` | `type="boolean"` columns | Configure the RadioButton |

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Header template not rendering | Ensure the `<ng-template #headerTemplate>` is a direct child of `<ejs-querybuilder>` |
| `notifyChange` not updating rule | Pass the exact DOM element from the template `let-data` context |
| Rule template `actionBegin` not firing | Confirm `(actionBegin)` is bound on `<ejs-querybuilder>` and check `args.requestType` |
| Column template value not persisting | Implement the `write` function to set initial value from `args.values` |
| Dropdown in NgTemplate not responding | Call `this.qb.notifyChange()` in the change event handler |
