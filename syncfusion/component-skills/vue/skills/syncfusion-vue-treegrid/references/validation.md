# Validation

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Validation Rule Types](#validation-rule-types)
- [Basic Validation Setup](#basic-validation-setup)
- [Pattern/Regex Validation]
- [Error Message Handling](#error-message-handling)
- [Server-Side Validation](#server-side-validation)

## When to Use

Use validation when you need to:
- **Enforce data quality** - required fields, format constraints
- **Prevent invalid edits** - validation before saving
- **Show error messages** - guide users to correct input
- **Validate data types** - numbers, emails, dates
- **Implement business rules** - min/max values, patterns
- **Server-side validation** - security and consistency
- **Custom validation logic** - complex rule validation
- **Track validation state** - show which rows have errors

## Mandatory Rules

Before implementing validation:
- ✓ **Edit Module**: Must provide `Edit` module from '@syncfusion/ej2-vue-treegrid'
- ✓ **Primary Key**: Mark one column `:isPrimaryKey='true'` for all editing
- ✓ **validationRules Property**: Specify rules on column or in object
- ✓ **validationRules Binding**: Use `:validationRules="variable"` or `:validationRules="{ required: true }"`
- ✓ **Default Edit Mode**: Validation works best with Dialog or Row mode
- ✓ **Error Messages**: Provide meaningful feedback to users

## Validation Rule Types

| Rule | Type | Purpose | Example |
|------|------|---------|---------|
| `required` | boolean | Field cannot be empty | `{ required: true }` |
| `number` | boolean | Numeric value only | `{ number: true }` |
| `date` | boolean | Valid date | `{ date: true }` |
| `min` | number | Minimum value | `{ min: 0 }` |
| `max` | number | Maximum value | `{ max: 100 }` |
| `minLength` | function | Minimum string length | `{ minLength: [(args) => args['value'].length >= 3, 'error'] }` |
| `maxLength` | function | Maximum string length | `{ maxLength: 50 }` |
| `custom` | function | Custom validation logic | `{ minLength: [(args) => {validation}, 'message'] }` |

## Basic Validation Setup

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1"
    :editSettings="editSettings"
    :toolbar="['Add', 'Edit', 'Delete', 'Update', 'Cancel']"
    childMapping="subtasks">
    <e-columns>
      <e-column 
        field="taskID" 
        :isPrimaryKey="true" 
        headerText="Task ID" 
        width=90 
        textAlign="Right">
      </e-column>
      
      <e-column 
        field="taskName" 
        headerText="Task Name" 
        width=200 
        editType="stringedit"
        :validationRules="nameRules">
      </e-column>
      
      <e-column 
        field="duration" 
        headerText="Duration" 
        width=100 
        type="number"
        editType="numericedit"
        :validationRules="durationRules"
        textAlign="Right">
      </e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Edit, Toolbar } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  { taskID: 1, taskName: 'Planning', duration: 10, subtasks: [...] }
]);

const editSettings = ref({
  mode: 'Dialog',
  allowEditing: true,
  allowAdding: true
});

const nameRules = ref({
  required: true,
  minLength: [(args) => {return args['value'].length >= 3;}, 'Task name must be at least 3 characters'],
  maxLength: [(args) => {return args['value'].length <= 100;}, 'Task name cannot exceed 100 characters']
});

const durationRules = ref({
  required: true,
  number: true,
  min: 0,
  max: 1000
});

provide('treegrid', [Edit, Toolbar]);
</script>
```

## Pattern/Regex Validation

Validate against patterns:

```vue
<template>
  <!-- Email validation -->
  <e-column 
    field="email" 
    headerText="Email" 
    width=200 
    editType="stringedit"
    :validationRules="{ 
      required: [true, 'Email is required'],
      minLength: [(args) => {return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args['value']);}, 'Enter valid email address']
    }">
  </e-column>
  
  <!-- Phone number validation -->
  <e-column 
    field="phone" 
    headerText="Phone" 
    width=150 
    editType="stringedit"
    :validationRules="{ 
      minLength: [(args) => {return /^[\d\-\+\s\(\)]+$/.test(args['value']);}, 'Enter valid phone number']
    }">
  </e-column>
</template>
```

## Error Message Handling

Display helpful validation error messages:

```javascript
const nameRules = ref({
  required: [true, 'Task name is required'],
  minLength: [(args) => {return args['value'].length >= 3;}, 'Task name must be at least 3 characters'],
  maxLength: [(args) => {return args['value'].length <= 100;}, 'Task name cannot exceed 100 characters']
});

const durationRules = ref({
  required: [true, 'Duration is required'],
  number: true,
  min: [0, 'Duration must be 0 or greater'],
  max: [1000, 'Duration cannot exceed 1000 hours']
});

const emailRules = ref({
  required: [true, 'Email address is required'],
  minLength: [(args) => {return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args['value']);}, 'Enter a valid email address (example@domain.com)']
});
```

**Format:** `rule: [value, 'error message']` or `rule: [(args) => condition, 'error message']`

Error messages appear in the edit dialog/form when validation fails.

## Server-Side Validation

Validate on server after client validation:

```vue
<script setup>
const onActionBegin = (args) => {
  if (args.requestType === 'save') {
    args.cancel = true;
    // Call server to validate business rules
    fetch('/api/treegrid/validate', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(result => {
      if (!result.valid) {
        console.error('Validation error:', result.errors);
      }
    });
  }
};
</script>
```
