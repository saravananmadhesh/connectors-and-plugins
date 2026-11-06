# Getting Started with Query Builder

Learn how to install, set up, and create your first Query Builder component in a Vue 3 application using Composition API.

## Table of Contents
- [Installation](#installation)
- [CSS Setup](#css-setup)
- [Basic Component](#basic-component)
- [Column Configuration](#column-configuration)
- [Running Your App](#running-your-app)

## Installation

Install the Query Builder package and its dependencies using npm:

```bash
npm install @syncfusion/ej2-vue-querybuilder --save
```

This command installs the Query Builder package into your project's `node_modules` folder and adds it to your `package.json` dependencies.

> **Note:** The `--save` flag automatically updates your `package.json` file.

### Additional Dependencies

You may also need to install supporting Syncfusion packages:

```bash
npm install @syncfusion/ej2-base @syncfusion/ej2-data @syncfusion/ej2-buttons @syncfusion/ej2-dropdowns @syncfusion/ej2-calendars --save
```

## CSS Setup

The Query Builder requires CSS files for styling. Add these imports to your `src/main.css` or `src/style.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/query-builder/index.css";
```

Then import your CSS file in your main Vue file (`src/main.ts` or `src/main.js`):

```typescript
import './style.css'
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

> **Theme Options:** Available themes include `material.css`, `material3.css`, `bootstrap5.3.css`, `bootstrap5.css`, `fabric.css`, `highcontrast.css`, and `tailwind3.css`. Choose the one that matches your design system.

## Basic Component

Create a simple Query Builder with basic columns in your `src/App.vue`:

```vue
<template>
  <div class="app-container">
    <h1>Query Builder Example</h1>
    <ejs-querybuilder width="100%">
      <e-columns>
        <e-column field='EmployeeID' label='EmployeeID' type='number' />
        <e-column field='FirstName' label='FirstName' type='string' />
        <e-column field='Title' label='Title' type='string' />
        <e-column field='HireDate' label='HireDate' type='date' format='dd/MM/yyyy' />
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
  }
}
</script>

<style>
.app-container {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #333;
}
</style>
```

This creates a Query Builder with 5 columns available for filtering:
- **EmployeeID** (number) - For numeric filtering
- **FirstName** (string) - For text filtering
- **Title** (string) - For job title filtering
- **HireDate** (date) - For date range filtering
- **Country** (string) - For location filtering

## Column Configuration

### ColumnsModel Properties

Each column in the `columns` array should have these basic properties:

| Property | Type | Description |
|----------|------|-------------|
| `field` | string | The data field name this column represents (required) |
| `label` | string | Display label shown in the UI dropdown |
| `type` | string | Data type: 'string', 'number', 'date', 'boolean' |
| `format` | string | Format pattern (e.g., 'dd/MM/yyyy' for dates) |
| `values` | string[] | Array of values for boolean or enum types |

### Complete Column Example

```vue
<template>
  <ejs-querybuilder width="70%">
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='FirstName' label='First Name' type='string' />
      <e-column field='TitleOfCourtesy' label='Title Of Courtesy' type='boolean' :values="values" />
      <e-column field='HireDate' label='Hire Date' type='date' format='dd/MM/yyyy' />
      <e-column field='Country' label='Country' type='string' />
      <e-column field='City' label='City' type='string' />
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
      values: ['Mr.', 'Mrs.', 'Ms.']
    }
  }
}
</script>
```

### Auto-Generation of Columns

If you don't provide columns explicitly, the Query Builder can automatically generate them from your data source:

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

> **How It Works:** The component infers the column type from the first record in the data source. This is useful for quick prototyping but manual column definition is recommended for production apps.

## Running Your App

### Development Server

Start the development server using Vite:

```bash
npm run dev
```

The application opens in your browser (usually `http://localhost:5173`).

### What You See

You should see a Query Builder interface with:
- A **Field** dropdown for selecting which column to filter
- An **Operator** dropdown for choosing the comparison type
- A **Value** input for entering the filter value
- **Add Rule** and **Add Group** buttons (if enabled)
- **Delete** buttons for removing conditions

### First Test

1. Open the application in your browser
2. Click the **Field** dropdown and select a column (e.g., "EmployeeID")
3. Leave the operator as "equal"
4. Enter a value (e.g., "1001")
5. Click **Add Rule** to add another condition
6. Notice the AND/OR toggle between conditions

## Vue 3 Composition API Setup

For a production-ready setup with Composition API and TypeScript:

```vue
<template>
  <div class="query-builder-wrapper">
    <ejs-querybuilder
      ref="qbRef"
      width="100%"
      :rule="initialRule"
      @change="handleChange"
    >
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Title' label='Title' type='string' />
        <e-column field='HireDate' label='Hire Date' type='date' format='dd/MM/yyyy' />
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
        rules: []
      }
    }
  },
  methods: {
    handleChange() {
      console.log('Query builder state changed')
    }
  }
}
</script>

<style>
.query-builder-wrapper {
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
}
</style>
```

## Next Steps

- **Configure Data:** Bind actual data using the `dataSource` property
- **Handle Changes:** Add event listeners with the `change` event
- **Extract Results:** Use `getSqlFromRules()` to get the filter as SQL
- **Customize:** Add templates and styling for your UI

For more details, see:
- [Columns and Operators](columns-and-operators.md) for advanced column configuration
- [Data Binding](data-binding.md) for connecting to data sources
- [Rules and Filtering](rules-and-filtering.md) for managing complex queries
