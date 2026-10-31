# Rules and Filtering

Learn how to create, manage, and manipulate filter rules and groups programmatically in Vue 3 using template refs and Composition API.

## Table of Contents
- [Understanding Rule Structure](#understanding-rule-structure)
- [Creating Rules](#creating-rules)
- [Managing Rules](#managing-rules)
- [Creating Groups](#creating-groups)
- [Managing Groups](#managing-groups)
- [Nested Hierarchies](#nested-hierarchies)
- [Show Buttons Configuration](#show-buttons-configuration)
- [Drag and Drop](#drag-and-drop)

## Understanding Rule Structure

Rules represent individual filter conditions. The `RuleModel` interface defines the structure:

```typescript
interface RuleModel {
  condition?: string;           // 'and' or 'or' (for groups)
  rules?: RuleModel[];          // Child rules (for groups)
  field?: string;               // Column field name
  label?: string;               // Display label
  operator?: string;            // Operator: 'equal', 'contains', etc.
  type?: string;                // Data type
  value?: any;                  // Filter value
  not?: boolean;                // NOT condition (optional)
}
```

### Simple Rule

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
      simpleRule: {
        field: 'EmployeeID',
        label: 'Employee ID',
        operator: 'equal',
        type: 'number',
        value: 1001
      }
    }
  }
}
</script>
```

### Rule with NOT Condition

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
      notRule: {
        field: 'Status',
        label: 'Status',
        operator: 'equal',
        type: 'string',
        value: 'Inactive',
        not: true
      }
    }
  }
}
</script>
```

## Creating Rules

### Initial Rules on Load

Set initial rules with the `rule` property:

```vue
<template>
  <ejs-querybuilder width="100%" :rule="initialRule">
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='Title' label='Title' type='string' />
      <e-column field='Country' label='Country' type='string' />
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
      initialRule: {
        condition: 'and',
        rules: [
          {
            field: 'EmployeeID',
            label: 'Employee ID',
            operator: 'equal',
            type: 'number',
            value: 1001
          },
          {
            field: 'Title',
            label: 'Title',
            operator: 'equal',
            type: 'string',
            value: 'Sales Manager'
          }
        ]
      }
    }
  }
}
</script>
```

### Programmatic Rule Creation

Add rules at runtime using the `addRules()` method with template refs:

```vue
<template>
  <div>
    <ejs-querybuilder ref="qbRef" width="100%" :rule="initialRule">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='Title' label='Title' type='string' />
        <e-column field='Country' label='Country' type='string' />
      </e-columns>
    </ejs-querybuilder>
    <button @click="addNewRule">Add Country Filter</button>
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
  data() {
    return {
      initialRule: {
        condition: 'and',
        rules: []
      }
    }
  },
  methods: {
    addNewRule() {
      const newRule = {
        field: 'Country',
        label: 'Country',
        operator: 'equal',
        type: 'string',
        value: 'USA'
      }
      
      this.$refs.qbRef.addRules([newRule], 'group0')
    }
  }
}
</script>
```

### Adding Multiple Rules

```vue
<template>
  <div>
    <ejs-querybuilder ref="qbRef" width="100%">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='Title' label='Title' type='string' />
      </e-columns>
    </ejs-querybuilder>
    <button @click="addMultipleRules">Add Multiple Filters</button>
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
    addMultipleRules() {
      const newRules = [
        {
          field: 'EmployeeID',
          label: 'Employee ID',
          operator: 'greaterthan',
          type: 'number',
          value: 1000
        },
        {
          field: 'Title',
          label: 'Title',
          operator: 'contains',
          type: 'string',
          value: 'Manager'
        }
      ]
      
      this.$refs.qbRef.addRules(newRules, 'group0')
    }
  }
}
</script>
```

## Managing Rules

### Retrieving Rules

Get the current rule set:

```vue
<template>
  <button @click="getRulesData">Get Rules</button>
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
    getRulesData() {
      const rules = this.$refs.qbRef.getRules()
      console.log('Current rules:', rules)
    }
  }
}
</script>
```

### Getting a Single Rule

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
  methods: {
    getSingleRule(ruleId) {
      const rule = this.$refs.qbRef.getRule(ruleId)
      console.log('Rule:', rule)
    }
  }
}
</script>
```

### Setting Rules

Replace all rules with new ones:

```vue
<template>
  <button @click="updateRules">Update Rules</button>
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
    updateRules() {
      const newRules = {
        condition: 'and',
        rules: [
          {
            field: 'Country',
            label: 'Country',
            operator: 'equal',
            type: 'string',
            value: 'USA'
          }
        ]
      }
      this.$refs.qbRef.setRules(newRules)
    }
  }
}
</script>
```

### Deleting Rules

Remove individual rules by ID:

```vue
<template>
  <button @click="deleteRule('rule0')">Delete Rule</button>
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
    deleteRule(ruleId) {
      this.$refs.qbRef.deleteRules([ruleId])
    },
    deleteMultipleRules(ruleIds) {
      this.$refs.qbRef.deleteRules(ruleIds)
    }
  }
}
</script>
```

### Cloning Rules

Create a copy of a rule:

```vue
<template>
  <button @click="cloneExistingRule('rule0')">Clone Rule</button>
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
    cloneExistingRule(ruleId) {
      this.$refs.qbRef.cloneRule(ruleId, 'group0', 0)
    }
  }
}
</script>
```

Parameters:
- `ruleID` - ID of the rule to clone
- `groupID` - Target group for the cloned rule
- `index` - Position in the group (optional)

## Creating Groups

Groups combine multiple rules with a condition (AND/OR):

```vue
<template>
  <button @click="addNewGroup">Add Group</button>
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
    addNewGroup() {
      const newGroup = {
        condition: 'and',
        rules: [
          {
            field: 'FirstName',
            label: 'First Name',
            operator: 'startswith',
            type: 'string',
            value: 'v'
          }
        ]
      }
      this.$refs.qbRef.addGroups([newGroup], 'group0')
    }
  }
}
</script>
```

### Initial Group Structure

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
      initialRule: {
        condition: 'and',
        rules: [
          {
            field: 'EmployeeID',
            label: 'Employee ID',
            operator: 'equal',
            type: 'number',
            value: 1001
          },
          {
            condition: 'or',
            rules: [
              {
                field: 'Title',
                label: 'Title',
                operator: 'equal',
                type: 'string',
                value: 'Manager'
              },
              {
                field: 'Title',
                label: 'Title',
                operator: 'equal',
                type: 'string',
                value: 'Developer'
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
```

This creates:
```
(EmployeeID = 1001) AND (Title = 'Manager' OR Title = 'Developer')
```

## Managing Groups

### Retrieving Groups

Get a specific group:

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
  methods: {
    getGroupData(groupId) {
      const group = this.$refs.qbRef.getGroup(groupId)
      console.log('Group:', group)
    }
  }
}
</script>
```

### Deleting Groups

Remove groups by ID:

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
  methods: {
    deleteGroup(groupId) {
      this.$refs.qbRef.deleteGroups([groupId])
    },
    deleteMultipleGroups(groupIds) {
      this.$refs.qbRef.deleteGroups(groupIds)
    }
  }
}
</script>
```

### Cloning Groups

Create a copy of a group:

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
  methods: {
    cloneExistingGroup(groupId) {
      this.$refs.qbRef.cloneGroup(groupId, 'group0', 0)
    }
  }
}
</script>
```

### Locking Groups

Make groups read-only:

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
  methods: {
    lockGroup(groupId) {
      this.$refs.qbRef.lockGroup(groupId)
    }
  }
}
</script>
```

## Nested Hierarchies

### Creating Complex Nested Rules

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
      complexRule: {
        condition: 'and',
        rules: [
          {
            field: 'Country',
            label: 'Country',
            operator: 'equal',
            type: 'string',
            value: 'USA'
          },
          {
            condition: 'or',
            rules: [
              {
                field: 'Title',
                label: 'Title',
                operator: 'equal',
                type: 'string',
                value: 'Manager'
              },
              {
                field: 'Title',
                label: 'Title',
                operator: 'equal',
                type: 'string',
                value: 'Developer'
              }
            ]
          },
          {
            condition: 'and',
            rules: [
              {
                field: 'Salary',
                label: 'Salary',
                operator: 'greaterthan',
                type: 'number',
                value: 50000
              },
              {
                field: 'YearsWorked',
                label: 'Years Worked',
                operator: 'greaterthanorequal',
                type: 'number',
                value: 5
              }
            ]
          }
        ]
      }
    }
  }
}
</script>
```

### Max Group Depth

Limit nesting with `maxGroupCount`:

```vue
<template>
  <ejs-querybuilder
    :columns="columns"
    :maxGroupCount="3"
  />
</template>
```

## Show Buttons Configuration

Control which buttons appear in the Query Builder:

```vue
<template>
  <ejs-querybuilder width="100%" :showButtons="buttonOptions">
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='Title' label='Title' type='string' />
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
      buttonOptions: {
        ruleDelete: true,      // Show delete button for rules
        groupInsert: true,     // Show add group button
        groupDelete: true      // Show delete button for groups
      }
    }
  }
}
</script>
```

### Hiding Delete Buttons

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
      buttonOptions: {
        ruleDelete: false,
        groupInsert: true,
        groupDelete: false
      }
    }
  }
}
</script>
```

### Dynamic Button Control

```vue
<template>
  <button @click="updateButtons">Enable All Buttons</button>
</template>

<script>
export default {
  methods: {
    updateButtons() {
      if (this.$refs.qbRef) {
        this.$refs.qbRef.showButtons = {
          ruleDelete: true,
          groupInsert: true,
          groupDelete: true
        }
      }
    }
  }
}
</script>
```

## Drag and Drop

Enable drag-and-drop for reordering rules and groups:

```vue
<template>
  <ejs-querybuilder width="100%" :allowDragAndDrop="true">
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='Title' label='Title' type='string' />
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
  }
}
</script>
```

## Complete Example

```vue
<template>
  <div class="query-builder-demo">
    <div class="actions">
      <button @click="addRule">Add Rule</button>
      <button @click="getRules">Get Rules</button>
      <button @click="resetRules">Reset</button>
      <button @click="deleteRule('rule0')">Delete First Rule</button>
    </div>
    <ejs-querybuilder 
      ref="qbRef" 
      width="100%" 
      :rule="initialRule" 
      :showButtons="buttonOptions" 
      :allowDragAndDrop="true">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Title' label='Title' type='string' />
        <e-column field='Country' label='Country' type='string' />
      </e-columns>
    </ejs-querybuilder>
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
  data() {
    return {
      initialRule: {
        condition: 'and',
        rules: [
          {
            field: 'Country',
            label: 'Country',
            operator: 'equal',
            type: 'string',
            value: 'USA'
          }
        ]
      },
      buttonOptions: {
        ruleDelete: true,
        groupInsert: true,
        groupDelete: true
      }
    }
  },
  methods: {
    addRule() {
      this.$refs.qbRef.addRules([
        {
          field: 'Title',
          label: 'Title',
          operator: 'contains',
          type: 'string',
          value: 'Manager'
        }
      ], 'group0')
    },
    getRules() {
      const rules = this.$refs.qbRef.getRules()
      console.log('Current Rules:', rules)
    },
    resetRules() {
      this.$refs.qbRef.reset()
    },
    deleteRule(ruleId) {
      this.$refs.qbRef.deleteRules([ruleId])
    }
  }
}
</script>

<style>
.query-builder-demo {
  padding: 20px;
}

.actions {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #0056b3;
}
</style>
```

This example demonstrates:
- Initial rules with nested structure
- Controlled button visibility
- Drag-and-drop support
- Programmatic rule management with template refs
