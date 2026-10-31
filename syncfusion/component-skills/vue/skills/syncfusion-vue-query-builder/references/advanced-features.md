# Advanced Features

Explore powerful advanced features for complex filtering scenarios, accessibility, and performance optimization.

## Table of Contents
- [Display Modes](#display-modes)
- [Rule and Group Cloning](#rule-and-group-cloning)
- [Locking Mechanisms](#locking-mechanisms)
- [Separate Connectors](#separate-connectors)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Persistence](#persistence)
- [Group Limits](#group-limits)
- [Summary View](#summary-view)
- [Accessibility](#accessibility)
- [Performance Optimization](#performance-optimization)

## Display Modes

The Query Builder supports two display modes: Horizontal (default) and Vertical.

### Horizontal Display Mode (Default)

```vue
<template>
  <ejs-querybuilder width="100%" displayMode="Horizontal">
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='FirstName' label='First Name' type='string' />
      <e-column field='Salary' label='Salary' type='number' />
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

### Vertical Display Mode

```vue
<template>
  <ejs-querybuilder width="100%" displayMode="Vertical">
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='FirstName' label='First Name' type='string' />
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

### Switching Display Modes Dynamically

```vue
<template>
  <div class="display-mode-switcher">
    <label>Display Mode:</label>
    <button @click="switchMode">
      Switch to {{ currentMode === 'Horizontal' ? 'Vertical' : 'Horizontal' }}
    </button>
    <ejs-querybuilder width="100%" :displayMode="currentMode">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
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
      currentMode: 'Horizontal'
    }
  },
  methods: {
    switchMode() {
      this.currentMode = this.currentMode === 'Horizontal' ? 'Vertical' : 'Horizontal'
    }
  }
}
</script>

<style>
.display-mode-switcher {
  margin-bottom: 20px;
}

.display-mode-switcher button {
  padding: 8px 16px;
  margin-left: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

## Rule and Group Cloning

Clone existing rules and groups to quickly duplicate complex filter configurations.

```vue
<template>
  <ejs-querybuilder
    ref="qbRef"
    width="100%"
    :rule="initialRule"
  >
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='FirstName' label='First Name' type='string' />
      <e-column field='Salary' label='Salary' type='number' />
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
          { field: 'FirstName', label: 'First Name', operator: 'startswith', value: 'John' },
          { field: 'Salary', label: 'Salary', operator: 'greaterthan', value: 50000 }
        ]
      }
    }
  },
  methods: {
    cloneFirstRule() {
      const rules = this.$refs.qbRef.getRules()?.rules || []
      if (rules.length > 0) {
        const clonedRule = this.$refs.qbRef.cloneRule(rules[0])
        console.log('Cloned rule:', clonedRule)
        this.$refs.qbRef.addRules([clonedRule], 'group0')
      }
    },
    cloneFirstGroup() {
      const rules = this.$refs.qbRef.getRules()
      if (rules?.rules && rules.rules.length > 0) {
        const firstRule = rules.rules[0]
        if ('rules' in firstRule) {
          const clonedGroup = this.$refs.qbRef.cloneGroup(firstRule)
          console.log('Cloned group:', clonedGroup)
          this.$refs.qbRef.addGroups([clonedGroup], 'group0')
        }
      }
    }
  }
}
</script>
```

## Locking Mechanisms

Prevent users from modifying specific rules or groups by locking them.

```vue
<template>
  <ejs-querybuilder
    ref="qbRef"
    width="100%"
    :rule="lockedRule"
  >
    <e-columns>
      <e-column field='Status' label='Status' type='string' />
      <e-column field='EmployeeID' label='Employee ID' type='number' />
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
      lockedRule: {
        condition: 'and',
        rules: [
          {
            field: 'Status',
            label: 'Status',
            operator: 'equal',
            value: 'Active',
            isLocked: true  // This rule cannot be deleted or modified
          },
          {
            field: 'EmployeeID',
            label: 'Employee ID',
            operator: 'greaterthan',
            value: 1000
          }
        ]
      }
    }
  },
  methods: {
    lockAllRules() {
      const rules = this.$refs.qbRef.getRules()?.rules || []
      rules.forEach(rule => {
        if (!('rules' in rule)) {
          this.$refs.qbRef.lockRule(rule)
        }
      })
    },
    lockFirstGroup() {
      const rules = this.$refs.qbRef.getRules()
      if (rules?.rules && rules.rules.length > 0) {
        const firstRule = rules.rules[0]
        if ('rules' in firstRule) {
          this.$refs.qbRef.lockGroup(firstRule)
        }
      }
    }
  }
}
</script>
```

## Separate Connectors

Customize how rules within groups are connected using AND/OR operators.

```vue
<template>
  <ejs-querybuilder width="100%" :rule="complexRule" separateConnector>
    <e-columns>
      <e-column field='Department' label='Department' type='string' />
      <e-column field='Salary' label='Salary' type='number' />
      <e-column field='Status' label='Status' type='string' />
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
      complexRule: {
        condition: 'and',
        rules: [
          {
            condition: 'or',
            rules: [
              { field: 'Department', operator: 'equal', value: 'Sales' },
              { field: 'Department', operator: 'equal', value: 'Marketing' }
            ]
          },
          {
            condition: 'and',
            rules: [
              { field: 'Salary', operator: 'greaterthan', value: 50000 },
              { field: 'Status', operator: 'equal', value: 'Active' }
            ]
          }
        ]
      }
    }
  }
}
</script>
```

## Right-to-Left (RTL) Support

Enable RTL layout for languages that read right to left.

```vue
<template>
  <div class="rtl-container">
    <label>
      <input v-model="enableRTL" type="checkbox" />
      Enable RTL
    </label>
    <ejs-querybuilder width="100%" :enableRtl="enableRTL">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
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
      enableRTL: false
    }
  }
}
</script>

<style>
.rtl-container {
  padding: 20px;
}
</style>
```

## Persistence

Enable query persistence to save and restore filter states across sessions.

```vue
<template>
  <ejs-querybuilder
    width="100%"
    enablePersistence
    persistId="queryBuilder_config"
  >
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='FirstName' label='First Name' type='string' />
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

// The Query Builder automatically saves state to localStorage
// with the key 'queryBuilder_config'
</script>
```

### Manual Persistence

```vue
<template>
  <div class="persistence-controls">
    <button @click="saveQuery">Save Query</button>
    <button @click="loadQuery">Load Query</button>
    <button @click="clearQuery">Clear Query</button>
    <ejs-querybuilder ref="qbRef" width="100%">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
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
  methods: {
    saveQuery() {
      const rules = this.$refs.qbRef.getRules()
      localStorage.setItem('saved_query', JSON.stringify(rules))
      alert('Query saved to localStorage')
    },
    loadQuery() {
      const saved = localStorage.getItem('saved_query')
      if (saved) {
        const rules = JSON.parse(saved)
        this.$refs.qbRef.setRules(rules)
      }
    },
    clearQuery() {
      localStorage.removeItem('saved_query')
      this.$refs.qbRef.setRules({ condition: 'and', rules: [] })
      alert('Query cleared')
    }
  }
}
</script>
```

## Group Limits

Control the maximum depth and number of groups.

```vue
<template>
  <ejs-querybuilder
    width="100%"
    :maxGroupCount="3"
    @actionFailure="onLimitExceeded"
  >
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='FirstName' label='First Name' type='string' />
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
  methods: {
    onLimitExceeded(args) {
      if (args.error?.message?.includes('group')) {
        alert('Maximum group limit (3) reached!')
      }
    }
  }
}
</script>
```

## Summary View

Display a summary of the current rules in a readable format.

```vue
<template>
  <div class="summary-view-demo">
    <ejs-querybuilder ref="qbRef" width="100%" @change="updateSummary">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
      </e-columns>
    </ejs-querybuilder>
    <div class="summary-panel" v-if="summaryText">
      <h3>Query Summary</h3>
      <p>{{ summaryText }}</p>
    </div>
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
      summaryText: ''
    }
  },
  methods: {
    updateSummary() {
      const sql = this.$refs.qbRef.getSqlFromRules()
      this.summaryText = sql || 'No rules defined'
    }
  }
}
</script>

<style>
.summary-panel {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f8ff;
  border-left: 4px solid #007bff;
  border-radius: 4px;
}

.summary-panel h3 {
  margin-top: 0;
}

.summary-panel p {
  font-family: 'Courier New', monospace;
  font-size: 13px;
  word-break: break-word;
}
</style>
```

## Accessibility

Implement accessible Query Builder with ARIA labels and keyboard navigation.

```vue
<template>
  <div class="accessible-qb">
    <h2>Accessible Query Builder</h2>
    <ejs-querybuilder
      ref="qbRef"
      width="100%"
      aria-label="Query builder for filtering data"
      role="group"
    >
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' ariaLabel='Employee ID field' />
        <e-column field='FirstName' label='First Name' type='string' ariaLabel='First name field' />
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
  mounted() {
    // Keyboard shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault()
        console.log('Save query shortcut')
      }
    })
  }
}
</script>

<style>
.accessible-qb {
  padding: 20px;
}

/* Ensure sufficient color contrast */
.accessible-qb .e-btn {
  min-height: 44px;  /* WCAG minimum touch target size */
}
</style>
```

## Performance Optimization

Optimize performance for large datasets and complex queries.

```vue
<template>
  <ejs-querybuilder
    ref="qbRef"
    width="100%"
    :dataSource="optimizedDataSource"
    :allowDragAndDrop="false"
    allowValidation
    @dataBound="onDataBound"
  >
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='FirstName' label='First Name' type='string' />
    </e-columns>
  </ejs-querybuilder>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      dataLoading: false,
      optimizedDataSource: new DataManager({
        url: 'https://api.example.com/data',
        adaptor: new ODataV4Adaptor()
      })
    }
  },
  methods: {
    onDataBound() {
      this.dataLoading = false
    },
    getOperatorsForField(field) {
      const operatorMap = {
        EmployeeID: ['equal', 'notequal', 'greaterthan', 'lessthan'],
        FirstName: ['equal', 'notequal', 'startswith', 'endswith', 'contains']
      }
      return operatorMap[field] || []
    }
  }
}
</script>
```

This section covers advanced features for handling complex scenarios and optimizing Query Builder performance.
