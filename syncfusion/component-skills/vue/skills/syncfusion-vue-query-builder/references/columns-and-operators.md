# Columns and Operators

Configure column definitions that control how fields appear and behave in the Query Builder, including available operators, validation, and formatting.

## Table of Contents
- [Column Schema Overview](#column-schema-overview)
- [Auto-Generation](#auto-generation)
- [Supported Operators](#supported-operators)
- [Labels and Field Mapping](#labels-and-field-mapping)
- [Data Types and Formatting](#data-types-and-formatting)
- [Validation](#validation)
- [Custom Operators](#custom-operators)
- [Step and Format](#step-and-format)

## Column Schema Overview

Column definitions define the schema for the Query Builder and control how fields appear and behave. The `field` property is essential for binding data source values to query builder columns.

```typescript
interface ColumnsModel {
  field: string;           // Required: data field name
  label: string;           // Display label in UI
  type: string;            // Data type: 'string' | 'number' | 'date' | 'boolean'
  operators?: any[];       // Available operators for this column
  values?: any[];          // Predefined values (for boolean/enum)
  format?: string;         // Date/number format string
  step?: number;           // Step increment for number fields
  validation?: any;        // Validation rules for the field
}
```

### Basic Column Definition

```vue
<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      columns: [
        { 
          field: 'EmployeeID', 
          label: 'Employee ID', 
          type: 'number' 
        },
        { 
          field: 'FirstName', 
          label: 'First Name', 
          type: 'string' 
        },
        { 
          field: 'Country', 
          label: 'Country', 
          type: 'string' 
        }
      ]
    }
  }
}
</script>
```

## Auto-Generation

When the `columns` property is empty or undefined during initialization, the Query Builder automatically generates columns from all fields in the `dataSource`.

```vue
<template>
  <ejs-querybuilder width="100%" :dataSource="employeeData" />
</template>

<script>
import { QueryBuilderComponent } from '@syncfusion/ej2-vue-querybuilder'
import { employeeData } from './datasource'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent
  },
  data() {
    return {
      employeeData: employeeData
    }
  }
}
</script>
```

**How Auto-Generation Works:**
- The component inspects the first record in the data source
- Detects the data type of each field
- Creates ColumnsModel entries automatically
- Assigns the field name as both field and label

> **Note:** The column type is inferred from the first record's data type. If the first record is missing a field, that field won't be included in auto-generated columns.

## Supported Operators

Define available operators for each column using the `operators` property. The following operators are supported based on data type:

### Operator Type Compatibility

| Operator | Description | String | Number | Date | Boolean |
|----------|-------------|--------|--------|------|---------|
| `startswith` | Value begins with string | ✓ | - | - | - |
| `endswith` | Value ends with string | ✓ | - | - | - |
| `contains` | Value contains string | ✓ | - | - | - |
| `equal` | Value equals | ✓ | ✓ | ✓ | ✓ |
| `notequal` | Value does not equal | ✓ | ✓ | ✓ | ✓ |
| `greaterthan` | Value is greater than | - | ✓ | ✓ | - |
| `greaterthanorequal` | Value is >= | - | ✓ | ✓ | - |
| `lessthan` | Value is less than | - | ✓ | ✓ | - |
| `lessthanorequal` | Value is <= | - | ✓ | ✓ | - |
| `between` | Value is between two values | - | ✓ | ✓ | - |
| `notbetween` | Value is not between two values | - | ✓ | ✓ | - |
| `in` | Value is in list | ✓ | ✓ | - | - |
| `notin` | Value is not in list | ✓ | ✓ | - | - |
| `isnull` | Value is null | ✓ | ✓ | ✓ | ✓ |
| `isnotnull` | Value is not null | ✓ | ✓ | ✓ | ✓ |

### Restricting Operators per Column

```vue
<template>
  <ejs-querybuilder width="100%">
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' :operators="operatorsForNumber" />
      <e-column field='FirstName' label='First Name' type='string' :operators="operatorsForString" />
    </e-columns>
  </ejs-querybuilder>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      operatorsForNumber: [
        { key: 'Equal', value: 'equal' },
        { key: 'Greater than', value: 'greaterthan' },
        { key: 'Less than', value: 'lessthan' }
      ],
      operatorsForString: [
        { key: 'Contains', value: 'contains' },
        { key: 'Starts with', value: 'startswith' },
        { key: 'Ends with', value: 'endswith' }
      ]
    }
  }
}
</script>
```

## Labels and Field Mapping

The `field` property maps to your data source, while `label` is the display text shown to users.

```vue
<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      columns: [
        {
          field: 'EmpID',
          label: 'Employee ID'
        },
        {
          field: 'EmpName',
          label: 'Employee Name'
        },
        {
          field: 'DeptCode',
          label: 'Department'
        }
      ]
    }
  }
}
</script>
```

> **Important:** If the column field is not in the data source, the column values will remain empty.

## Data Types and Formatting

### String Type

```vue
<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      columns: [
        {
          field: 'FirstName',
          label: 'First Name',
          type: 'string'
        }
      ]
    }
  }
}
</script>
```

### Number Type

```vue
<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      columns: [
        {
          field: 'Salary',
          label: 'Annual Salary',
          type: 'number',
          format: 'C2'
        }
      ]
    }
  }
}
</script>
```

Supported number formats:
- `N2` - Number with 2 decimal places
- `C2` - Currency with 2 decimal places
- `P0` - Percentage with 0 decimal places

### Date Type

```vue
<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      columns: [
        {
          field: 'HireDate',
          label: 'Hire Date',
          type: 'date',
          format: 'dd/MM/yyyy'
        }
      ]
    }
  }
}
</script>
```

Supported date formats:
- `dd/MM/yyyy` - Day/Month/Year
- `MM/dd/yyyy` - Month/Day/Year
- `yyyy-MM-dd` - ISO format
- `dd MMM yyyy` - Day Month Year

### Boolean Type

```vue
<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      columns: [
        {
          field: 'IsActive',
          label: 'Active Status',
          type: 'boolean',
          values: ['Active', 'Inactive']
        }
      ]
    }
  }
}
</script>
```

## Validation

Enable validation to ensure users enter valid data. Use the `allowValidation` property on the Query Builder and set validation rules per column.

```vue
<template>
  <div>
    <ejs-querybuilder
      ref="qbRef"
      width="100%"
      :allowValidation="true"
      @created="onCreated"
    >
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' :validation="{ isRequired: true }" />
        <e-column field='FirstName' label='First Name' type='string' :validation="{ isRequired: true }" />
      </e-columns>
    </ejs-querybuilder>
    <button @click="validateRules">Validate</button>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  methods: {
    validateRules() {
      const isValid = this.$refs.qbRef.validateFields()
      if (isValid) {
        console.log('Rules are valid')
      } else {
        console.log('Please fix validation errors')
      }
    },
    onCreated() {
      console.log('Query Builder created')
    }
  }
}
</script>
```

### Validation Properties

```typescript
validation: {
  isRequired: true              // Field must have a value
  min?: number;                 // Minimum value/length
  max?: number;                 // Maximum value/length
  pattern?: string;             // Regex pattern
  customError?: string;         // Custom error message
}
```

> **Note:** Validation for Field values is automatic. You must manually configure validation for Operator and Value fields through the `validation` property.

## Custom Operators

Add custom operators specific to your domain or use case:

```vue
<template>
  <ejs-querybuilder @actionBegin="handleActionBegin">
    <e-columns>
      <e-column field='Status' label='Status' type='string' :operators="customOperators" />
    </e-columns>
  </ejs-querybuilder>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      customOperators: [
        { key: 'Equal', value: 'equal' },
        { key: 'Not Equal', value: 'notequal' },
        { key: 'Is Active', value: 'isactive' },       // Custom
        { key: 'Is Inactive', value: 'isinactive' }    // Custom
      ]
    }
  },
  methods: {
    handleActionBegin(args) {
      if (args.requestType === 'rule-change') {
        if (args.rule?.operator === 'isactive') {
          args.rule.value = 'Active'
        }
      }
    }
  }
}
</script>
```

## Step and Format

### Step Property (Number Fields)

Set step increments for numeric input fields:

```vue
<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      columns: [
        {
          field: 'Quantity',
          label: 'Quantity',
          type: 'number',
          step: 10
        },
        {
          field: 'Price',
          label: 'Price',
          type: 'number',
          step: 0.01
        }
      ]
    }
  }
}
</script>
```

The step value controls:
- How much the value changes when using spinner buttons
- The keyboard arrow key increment amount
- The mouse wheel scroll increment

### Format Property

Format controls how values are displayed and entered:

**Date Formatting:**
```vue
<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      columns: [
        {
          field: 'OrderDate',
          label: 'Order Date',
          type: 'date',
          format: 'dd/MM/yyyy'
        }
      ]
    }
  }
}
</script>
```

**Number Formatting:**
```vue
<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      columns: [
        {
          field: 'Revenue',
          label: 'Revenue',
          type: 'number',
          format: 'C2'
        }
      ]
    }
  }
}
</script>
```

## Complete Example

```vue
<template>
  <ejs-querybuilder width="100%" :allowValidation="true">
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' :operators="numberOperators" :validation="{ isRequired: true }" />
      <e-column field='FirstName' label='First Name' type='string' :validation="{ isRequired: true }" />
      <e-column field='HireDate' label='Hire Date' type='date' format='dd/MM/yyyy' />
      <e-column field='Salary' label='Salary' type='number' step='1000' format='C2' />
      <e-column field='IsActive' label='Active' type='boolean' :values="activeValues" />
    </e-columns>
  </ejs-querybuilder>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      numberOperators: [
        { key: 'Equal', value: 'equal' },
        { key: 'Greater than', value: 'greaterthan' },
        { key: 'Less than', value: 'lessthan' }
      ],
      activeValues: ['Yes', 'No']
    }
  }
}
</script>
```

This example shows:
- Number field with restricted operators
- String field with required validation
- Date field with formatting
- Number field with currency formatting and step increment
- Boolean field with custom display values
