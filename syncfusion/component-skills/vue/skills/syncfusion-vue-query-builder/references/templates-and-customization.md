# Templates and Customization

Learn how to create custom templates, inject components, apply styling, and customize the Query Builder behavior.

## Table of Contents
- [Custom Header Templates](#custom-header-templates)
- [Custom Component Injection](#custom-component-injection)
- [CSS Classes and Styling](#css-classes-and-styling)
- [Theme Studio Integration](#theme-studio-integration)
- [Custom Operators](#custom-operators)
- [Action Events Customization](#action-events-customization)
- [Advanced Styling](#advanced-styling)

## Custom Header Templates

Create custom header templates to add branding or additional UI elements:

```vue
<template>
  <div class="custom-header-demo">
    <ejs-querybuilder width="100%" :headerTemplate="headerTemplate">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Salary' label='Salary' type='number' />
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
    headerTemplate() {
      return `
        <div class="qb-header-custom">
          <div class="header-title">
            <span class="icon">🔍</span>
            <h3>Advanced Filter Builder</h3>
          </div>
          <div class="header-info">
            <small>Drag & drop rules to reorder</small>
          </div>
        </div>
      `
    }
  }
}
</script>

<style>
.qb-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px 8px 0 0;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.icon {
  font-size: 24px;
}

h3 {
  margin: 0;
  font-size: 18px;
}

.header-info {
  text-align: right;
}
</style>
```

## Custom Component Injection

Inject custom Vue components into query builder templates:

```vue
<template>
  <div class="custom-injection-demo">
    <ejs-querybuilder
      ref="qbRef"
      width="100%"
      @actionBegin="handleActionBegin"
    >
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Department' label='Department' type='string' />
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
    departmentTemplate() {
      return `
        <select class="department-select">
          <option>Sales</option>
          <option>Marketing</option>
          <option>HR</option>
          <option>IT</option>
          <option>Finance</option>
        </select>
      `
    },
    handleActionBegin(args) {
      // Customize component behavior based on actions
      if (args.requestType === 'rule-change') {
        if (args.rule?.field === 'Department') {
          console.log('Department rule changed')
        }
      }
    }
  }
}
</script>

<style>
.department-select {
  padding: 6px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}
</style>
```

## CSS Classes and Styling

Apply custom CSS classes to customize the Query Builder appearance:

```vue
<template>
  <ejs-querybuilder width="100%" cssClass="custom-qb-theme">
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

<style>
/* Custom Query Builder Styling */
.custom-qb-theme .e-query-builder {
  background-color: #f5f7fa;
  border: 2px solid #e0e6ed;
  border-radius: 8px;
}

.custom-qb-theme .e-rule-container {
  background-color: white;
  border: 1px solid #e0e6ed;
  border-radius: 4px;
  padding: 12px;
  margin: 8px 0;
}

.custom-qb-theme .e-group-container {
  background-color: #f9fafb;
  border: 2px solid #e0e6ed;
  border-radius: 6px;
  padding: 15px;
  margin: 10px 0;
}

.custom-qb-theme .e-btn {
  border-radius: 4px;
  font-weight: 500;
}

.custom-qb-theme .e-dropdownlist {
  border-radius: 4px;
}

.custom-qb-theme .e-input {
  border-radius: 4px;
  border: 1px solid #d1d5db;
}

.custom-qb-theme .e-btn.e-primary {
  background-color: #3b82f6;
  border-color: #3b82f6;
}

.custom-qb-theme .e-btn.e-primary:hover {
  background-color: #2563eb;
  border-color: #2563eb;
}
</style>
```

## Theme Studio Integration

Use built-in themes and customize colors:

```vue
<template>
  <div class="theme-selector">
    <label>Select Theme:</label>
    <select v-model="selectedTheme" @change="updateTheme">
      <option value="material">Material</option>
      <option value="bootstrap5">Bootstrap 5</option>
      <option value="fabric">Fabric</option>
      <option value="tailwind3">Tailwind 3</option>
    </select>
  </div>
  <ejs-querybuilder width="100%" :cssClass="'theme-' + selectedTheme">
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
  data() {
    return {
      selectedTheme: 'material'
    }
  },
  methods: {
    updateTheme() {
      // Import corresponding theme CSS
      console.log('Theme changed to:', this.selectedTheme)
    }
  }
}
</script>

<style>
.theme-selector {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style>
```

## Custom Operators

Define custom operators for domain-specific filtering:

```vue
<template>
  <ejs-querybuilder
    ref="qbRef"
    width="100%"
    @actionBegin="handleActionBegin"
  >
    <e-columns>
      <e-column field='Score' label='Score' type='number' :operators="scoreOperators" />
      <e-column field='Status' label='Status' type='string' :operators="statusOperators" />
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
      scoreOperators: [
        { key: 'Equal', value: 'equal' },
        { key: 'Not Equal', value: 'notequal' },
        { key: 'A Grade', value: 'agrade' },
        { key: 'B Grade', value: 'bgrade' },
        { key: 'C Grade', value: 'cgrade' }
      ],
      statusOperators: [
        { key: 'Is Active', value: 'isactive' },
        { key: 'Is Inactive', value: 'isinactive' }
      ]
    }
  },
  methods: {
    handleActionBegin(args) {
      if (args.requestType === 'rule-change') {
        const rule = args.rule
        
        // Handle custom Score operators
        if (rule?.field === 'Score') {
          switch (rule.operator) {
            case 'agrade':
              rule.value = 90
              break
            case 'bgrade':
              rule.value = 80
              break
            case 'cgrade':
              rule.value = 70
              break
          }
        }
        
        // Handle custom Status operators
        if (rule?.field === 'Status') {
          if (rule.operator === 'isactive') {
            rule.value = 'Active'
          } else if (rule.operator === 'isinactive') {
            rule.value = 'Inactive'
          }
        }
      }
    }
  }
}
</script>
```

## Action Events Customization

Customize behavior using action events:

```vue
<template>
  <ejs-querybuilder
    ref="qbRef"
    width="100%"
    :rule="initialRule"
    @actionBegin="onActionBegin"
    @actionComplete="onActionComplete"
    @actionFailure="onActionFailure"
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
  data() {
    return {
      actionLog: [],
      initialRule: {
        condition: 'and',
        rules: []
      }
    }
  },
  methods: {
    onActionBegin(args) {
      const log = `[BEGIN] ${args.requestType}: ${JSON.stringify(args.rule || args.group)}`
      this.actionLog.push(log)
      console.log(log)
      
      // Example: Prevent certain operations
      if (args.requestType === 'rule-delete') {
        if (this.$refs.qbRef.getRules()?.rules?.length === 1) {
          alert('Cannot delete the last rule')
          args.cancel = true
        }
      }
    },
    onActionComplete(args) {
      const log = `[COMPLETE] ${args.requestType}`
      this.actionLog.push(log)
      console.log(log)
    },
    onActionFailure(args) {
      const log = `[FAILURE] ${args.requestType}: ${args.error}`
      this.actionLog.push(log)
      console.error(log)
    }
  }
}
</script>
```

## Advanced Styling

Comprehensive styling with CSS variables:

```vue
<template>
  <ejs-querybuilder width="100%" cssClass="advanced-styled-qb">
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

<style>
:root {
  --qb-primary-color: #007bff;
  --qb-primary-dark: #0056b3;
  --qb-border-color: #dee2e6;
  --qb-bg-light: #f8f9fa;
  --qb-text-dark: #212529;
  --qb-border-radius: 6px;
  --qb-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.advanced-styled-qb .e-query-builder {
  background-color: white;
  border: 1px solid var(--qb-border-color);
  border-radius: var(--qb-border-radius);
  box-shadow: var(--qb-shadow);
}

.advanced-styled-qb .e-rule-container {
  background-color: var(--qb-bg-light);
  border: 1px solid var(--qb-border-color);
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
}

.advanced-styled-qb .e-rule-container:hover {
  box-shadow: var(--qb-shadow);
  border-color: var(--qb-primary-color);
}

.advanced-styled-qb .e-group-container {
  background-color: rgba(0, 123, 255, 0.05);
  border: 2px solid var(--qb-primary-color);
  border-radius: var(--qb-border-radius);
  padding: 15px;
  margin: 10px 0;
}

.advanced-styled-qb .e-btn.e-primary {
  background-color: var(--qb-primary-color);
  border-color: var(--qb-primary-color);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.advanced-styled-qb .e-btn.e-primary:hover {
  background-color: var(--qb-primary-dark);
  border-color: var(--qb-primary-dark);
  transform: translateY(-1px);
  box-shadow: 0 2px 6px rgba(0, 123, 255, 0.3);
}

.advanced-styled-qb .e-btn.e-outline {
  border: 2px solid var(--qb-border-color);
  color: var(--qb-text-dark);
  border-radius: 4px;
  transition: all 0.2s ease;
}

.advanced-styled-qb .e-btn.e-outline:hover {
  border-color: var(--qb-primary-color);
  color: var(--qb-primary-color);
}

.advanced-styled-qb .e-input,
.advanced-styled-qb .e-dropdownlist {
  border-radius: 4px;
  border-color: var(--qb-border-color);
  transition: all 0.2s ease;
}

.advanced-styled-qb .e-input:focus,
.advanced-styled-qb .e-dropdownlist:focus {
  border-color: var(--qb-primary-color);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.advanced-styled-qb .e-delete-icon,
.advanced-styled-qb .e-group-delete-icon {
  color: #dc3545;
  transition: all 0.2s ease;
}

.advanced-styled-qb .e-delete-icon:hover,
.advanced-styled-qb .e-group-delete-icon:hover {
  color: #c82333;
  transform: scale(1.1);
}

.advanced-styled-qb .e-dropdown-icon {
  color: var(--qb-primary-color);
}
</style>
```

## Complete Customization Example

```vue
<template>
  <div class="fully-customized-qb">
    <div class="qb-header">
      <h2>Custom Query Builder</h2>
      <div class="header-actions">
        <button @click="resetStyles">Reset Styling</button>
      </div>
    </div>
    <ejs-querybuilder
      width="100%"
      cssClass="custom-theme"
      :headerTemplate="headerTemplate"
      @actionBegin="handleActionBegin"
    >
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
    headerTemplate() {
      return `<div style="padding: 15px; background: #f8f9fa;">Build your query here</div>`
    },
    handleActionBegin(args) {
      console.log('Action:', args)
    },
    resetStyles() {
      console.log('Resetting styles to default')
    }
  }
}
</script>

<style>
.fully-customized-qb {
  padding: 20px;
}

.qb-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 8px;
}

.qb-header h2 {
  margin: 0;
}

.header-actions button {
  padding: 8px 16px;
  background-color: white;
  color: #667eea;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.custom-theme .e-query-builder {
  background-color: #f9fafb;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
}
</style>
```

This section provides comprehensive customization options for theming, styling, and extending Query Builder functionality.
