# Column Validation

## Table of Contents
- [When to Use](#when-to-use)
- [Required Field Validation](#required-field-validation)
- [Numeric Validation](#numeric-validation)
- [Email Validation](#email-validation)
- [Min Length Validation](#min-length-validation)
- [Custom Validation](#custom-validation)
- [Custom Validation Based on Dropdown Change](#custom-validation-based-on-dropdown-change)
- [Dynamically Add or Remove Validation Rules](#dynamically-add-or-remove-validation-rules)
- [Prevent Duplicate Rows](#prevent-duplicate-rows)

## When to Use

Use this reference when you need to:
- Implement required field validation
- Configure numeric, email, and min/max length validation
- Create custom validation rules
- Validate related fields based on changes
- Prevent duplicate row entries
- Display validation error messages

Implement validation rules to ensure data integrity using the `validationRules` property:

## Required Field Validation

```vue
<e-column 
  field="CustomerID" 
  headerText="Customer ID"
  :validationRules="{ required: true }"
  width="120">
</e-column>
```

## Numeric Validation

```vue
<e-column 
  field="Freight"
  editType="numericedit"
  :validationRules="{ required: true, min: 0, max: 1000 }"
  width="100">
</e-column>
```

## Email Validation

```vue
<e-column 
  field="Email"
  :validationRules="{ required: true, email: true }"
  width="150">
</e-column>
```

## Min Length Validation

```vue
<e-column 
  field="CustomerID" 
  :validationRules="{ required: true, minLength: 3 }"
  width="120">
</e-column>
```

## Custom Validation

```vue
const freightRules = {
  required: true,
  maxLength: [(args) => args['value'] <= 1000, 'Please enter value less than 1000'],
  minLength: [(args) => args['value'] >= 1, 'Please enter value greater than 1']
};
```

## Custom Validation Based on Dropdown Change

```vue
const customFn = function(args) {
  const formObj = grid.value.ej2Instances.editModule.formObj.element['ej2_instances'][0];
  switch (window.role) {
    case 'Sales':
      if (args.value >= 5000 && args.value < 15000) return true;
      formObj.rules['Salary']['required'][1] = 'Please enter valid Sales Salary >=5000 and < 15000';
      break;
  }
  return false;
};

const load = () => {
  let column = grid.value.getColumnByField('Salary');
  column.validationRules = {
    required: [customFn, 'Please enter valid salary'],
  };
};
```

## Dynamically Add or Remove Validation Rules

```vue
const actionComplete = (args) => {
  if (args.requestType === 'beginEdit' || args.requestType === 'add') {
    const formObj = grid.value.ej2Instances.editModule.formObj;
    formObj.addRules('CustomerID', { required: true, minLength: 5 });
  }
};

const removeRules = () => {
  const formObj = grid.value.ej2Instances.editModule.formObj;
  formObj.removeRules('CustomerID');
};
```

## Prevent Duplicate Rows

```vue
const orderIDRules = {
  required: true,
  min: [
    (args) => {
      return grid.dataSource.every((data) => data['OrderID'] + '' !== args['value']);
    }, 'The entered value already exists in the primary key column OrderID. Please enter a unique value.'
  ]
};

const actionBegin = function (args) {
  const formObj = grid.editModule.formObj;
  if (args.requestType === 'save') {
    formObj.addRules('OrderID', orderIDRules);
    if (formObj.validate()) {
      args.cancel = true;
    }
    formObj.removeRules('OrderID');
  }
};
```
