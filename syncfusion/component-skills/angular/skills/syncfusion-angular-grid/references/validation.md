# Validation in Angular Grid

Data validation ensures that information entered or modified in the grid follows specific validation rules, preventing errors and maintaining accuracy. The Angular Grid component in Syncfusion® provides built-in validation support to make this process easy and effective.

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Column Validation](#column-validation)
- [Custom Validation](#custom-validation)
- [Dynamically Add or Remove Validation Rules](#dynamically-add-or-remove-validation-rules-from-the-form)
- [Change the Position of Validation Error Messages](#change-the-position-of-validation-error-messages)
- [Show Custom Error Message for Failed CRUD Actions](#show-custom-error-message-for-failed-crud-actions)

## When to Use This Skill

Use this skill when you need to:
- **Validate user input** — Ensure data meets requirements before saving
- **Column validation** — Apply validation rules to individual columns
- **Required fields** — Mark fields as mandatory
- **Custom validation** — Implement business logic validation
- **Error messages** — Display user-friendly validation errors
- **Dynamic rules** — Add/remove validation rules programmatically
- **Form validation** — Validate entire edit forms
- **Data accuracy** — Prevent invalid data from being saved

## Column Validation

Column validation applies validation rules to individual columns during edit operations, ensuring data accuracy before saving. Invalid data displays error messages and prevents saving. The [FormValidator](ej2.syncfusion.com/angular/documentation/api/form-validator) component validates data using rules defined in the [validationRules](ej2.syncfusion.com/angular/documentation/api/grid/column#validationrules) property for each column.

**app.component.ts**
```typescript
export class AppComponent {
    // Define validation rules for each column
    orderIDRules = { required: true };
    customerIDRules = { required: true, minLength: 3 };
    freightRules = { required: true, min: 1, max: 1000 };
}
```

**Template**
```html
<ejs-grid [dataSource]='data' [editSettings]='editSettings' [toolbar]='toolbar'>
    <e-columns>
        <e-column field='OrderID' [validationRules]='orderIDRules'></e-column>
        <e-column field='CustomerID' [validationRules]='customerIDRules'></e-column>
        <e-column field='Freight' [validationRules]='freightRules' editType='numericedit'></e-column>
    </e-columns>
</ejs-grid>
```

## Custom Validation

Custom validation rules apply specific rules to grid columns beyond standard built-in validation. The [FormValidator](ej2.syncfusion.com/angular/documentation/api/form-validator) component applies these rules and displays error messages for invalid fields. Custom validation supports dependent field validation and numeric range validation for various application scenarios.

**app.component.ts**

```typescript
export class AppComponent {
    // Custom validation function
    customFn = (args: { [key: string]: string }): boolean => {
        return args['value'].length >= 5;
    }

    // Apply custom validation with error message
    customerIDRules = { 
        required: true, 
        minLength: [this.customFn, 'Need at least 5 letters'] 
    };
}
```

**Template**
```html
<e-column field='CustomerID' [validationRules]='customerIDRules'></e-column>
```

### Custom validation based on dropdown change

Dependent validation rules adjust based on selections in other columns, enabling linked column validation. The "Salary" column validation adjusts based on the "Role" column selection, ensuring both columns validate correctly together.

**app.component.ts**

```typescript
export class AppComponent {
    // Salary range by role
    salaryRanges = {
        'Sales': { min: 5000, max: 15000 },
        'Support': { min: 15000, max: 19000 },
        'Engineer': { min: 25000, max: 30000 },
        'TeamLead': { min: 30000, max: 50000 },
        'Manager': { min: 50000, max: 70000 }
    };

    // Validate salary based on selected role
    validateSalary = (args: { value: string }): boolean => {
        const salary = parseInt(args.value);
        const range = this.salaryRanges[window.currentRole as keyof typeof this.salaryRanges];
        return range && salary >= range.min && salary < range.max;
    }

    // Role dropdown configuration
    roleParams = {
        params: {
            dataSource: [
                { role: 'Sales' },
                { role: 'Support' },
                { role: 'Engineer' },
                { role: 'TeamLead' },
                { role: 'Manager' }
            ],
            fields: { value: 'role', text: 'role' },
            change: (args: any) => {
                window.currentRole = args.value;
            }
        }
    };

    salaryRules = {
        required: [this.validateSalary, 'Please enter valid salary for selected role']
    };
}

declare global {
    interface Window {
        currentRole: string;
    }
}
```

**Template**
```html
<e-column field='Role' editType='dropdownedit' [edit]='roleParams'></e-column>
<e-column field='Salary' [validationRules]='salaryRules' editType='numericedit'></e-column>
```

### Custom validation for numeric columns

Numeric column validation applies rules for numeric data such as positive values, minimum/maximum ranges, or decimal limits. This example validates numeric values using custom validator functions and displays error messages when data changes.

**app.component.ts**

```typescript
export class AppComponent {
    // Custom validation functions for numeric range
    isMaxValid = (args: { [key: string]: number }): boolean => args['value'] <= 1000;
    isMinValid = (args: { [key: string]: number }): boolean => args['value'] >= 1;

    // Numeric column validation with range
    freightRules = {
        required: true,
        max: [this.isMaxValid, 'Please enter a value less than 1000'],
        min: [this.isMinValid, 'Please enter a value greater than 1']
    };
}
```

**Template**
```html
<e-column field='Freight' editType='numericedit' 
    [validationRules]='freightRules' 
    format='C2'>
</e-column>
```

## Dynamically Add or Remove Validation Rules from the Form

Validation rules can be added or removed from input elements based on application scenarios or data conditions. The [addRules](ej2.syncfusion.com/angular/documentation/api/form-validator#addrules) method adds validation rules dynamically to input elements using the name attribute.

**app.component.ts**

```typescript
import { GridComponent } from '@syncfusion/ej2-angular-grids';

export class AppComponent {
    // Validation rules to add dynamically
    customerIDRules = {
        required: true,
        minLength: [5, 'Customer ID should have a minimum length of 5 characters']
    };

    // Add validation rules during edit
    onEditStart(args: any, grid: GridComponent) {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            const formObj = grid.editModule.formObj;
            formObj.addRules('CustomerID', this.customerIDRules);
        }
    }

    // Remove validation rules when needed
    removeValidation(fieldName: string, grid: GridComponent) {
        const formObj = grid.editModule.formObj;
        formObj.removeRules(fieldName);
    }
}
```

**Template**
```html
<ejs-grid (actionComplete)='onEditStart($event, grid)' #grid>
    <e-columns>
        <e-column field='CustomerID' headerText='Customer ID'></e-column>
    </e-columns>
</ejs-grid>
```

## Change the Position of Validation Error Messages

Error message positioning customizes where validation messages appear in the grid. By default, messages display below the input field. The [customPlacement](ej2.syncfusion.com/angular/documentation/api/form-validator#customplacement) event repositions messages to custom locations based on application needs.

**app.component.ts**

```typescript
import { GridComponent } from '@syncfusion/ej2-angular-grids';

export class AppComponent {
    // Customize error message position
    onEditStart(args: any, grid: GridComponent) {
        if (args.requestType === 'beginEdit' || args.requestType === 'add') {
            const formObj = grid.editModule.formObj;
            
            formObj.customPlacement = (input: HTMLElement, errorElement: HTMLElement) => {
                const tooltipWidth = errorElement.offsetWidth;
                const inputPosition = input.getBoundingClientRect();
                
                // Position error message on the left side
                errorElement.style.position = 'fixed';
                errorElement.style.left = (inputPosition.left - tooltipWidth - 16) + 'px';
                errorElement.style.top = inputPosition.top + 'px';
            };
        }
    }
}
```

**Template**
```html
<ejs-grid (actionComplete)='onEditStart($event, grid)' #grid>
    <!-- Grid columns -->
</ejs-grid>
```

## Show Custom Error Message for Failed CRUD Actions

Error handling for CRUD operations in the grid displays helpful error messages when operations fail. The [actionFailure](ej2.syncfusion.com/angular/documentation/api/grid#actionfailure) event triggers on operation failures, providing access to error messages from server responses for display.

**app.component.ts**

```typescript
import { FailureEventArgs } from '@syncfusion/ej2-angular-grids';

export class AppComponent {
    errorMessage: string = '';

    // Handle CRUD operation failures
    onActionFailure(args: FailureEventArgs): void {
        if (args.error) {
            args.error[0]?.error?.json()
                .then((response: any) => {
                    this.errorMessage = response.message;
                    console.error('Validation Error:', response.message);
                })
                .catch(() => {
                    this.errorMessage = 'An error occurred during the operation.';
                });
        }
    }
}
```

**Template**
```html
<ejs-grid (actionFailure)='onActionFailure($event)'>
    <!-- Grid columns -->
</ejs-grid>

<!-- Display error message -->
<div *ngIf='errorMessage' class='error-alert'>
    {{ errorMessage }}
</div>
```
