# Getting Started with Syncfusion Vue TreeGrid

Getting up and running with the Syncfusion Vue TreeGrid requires proper installation, module injection, and basic configuration. This guide covers the essential setup steps for building responsive hierarchical data grids.

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Installation](#installation)
- [Importing Styles](#importing-styles)
- [Basic Configuration with Vue Template Format](#basic-configuration-with-vue-template-format)
- [Data Binding Methods](#data-binding-methods)
- [Module Injection](#module-injection)
- [Column Configuration](#column-configuration)
- [Complete Working Example](#complete-working-example)

## When to Use

The Syncfusion Vue TreeGrid is ideal when you need to:
- **Display hierarchical data** with parent-child relationships
- **Manage large datasets** with tree structure organization
- **Enable data operations** like sorting, filtering, and editing on hierarchical data
- **Build enterprise applications** requiring robust grid functionality
- **Handle CRUD operations** (Create, Read, Update, Delete) in a tree structure
- **Present reporting dashboards** with grouped/categorized information
- **Handle files/folder structures** in a user-friendly interface

## Mandatory Rules

Before implementing TreeGrid, ensure:
- ✓ **Module Injection**: Required modules must be provided (even if just for core functionality)
- ✓ **Primary Key**: Define `isPrimaryKey='true'` for at least one column for editing operations
- ✓ **Data Binding**: Always specify either `childMapping`, `idMapping`+`parentIdMapping`, or `dataSource` with `DataManager`
- ✓ **Tree Column Index**: Set `treeColumnIndex` to specify which column displays the hierarchy
- ✓ **Column Field Names**: Use **camelCase** field names (taskID, taskName, startDate - NOT TaskID, TaskName, StartDate)
- ✓ **Vue Template Format**: Use `<e-column>` elements within `<e-columns>` - NOT JavaScript array format
- ✓ **CSS Import**: Import TreeGrid styles in your component or main.js

## Installation

Syncfusion Vue packages are published on npm. Install the TreeGrid package using npm or yarn:

```bash
npm install @syncfusion/ej2-vue-treegrid
npm install @syncfusion/ej2-base
npm install @syncfusion/ej2-data
```

Or using yarn:

```bash
yarn add @syncfusion/ej2-vue-treegrid
```

## Importing Styles

TreeGrid requires CSS styles to be imported. Add to your main.js or component:

```javascript
import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
import '../node_modules/@syncfusion/ej2-dropdowns/styles/material3.css';
import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';
import '../node_modules/@syncfusion/ej2-navigations/styles/material3.css';
import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css';
import '../node_modules/@syncfusion/ej2-grids/styles/material3.css';
import '../node_modules/@syncfusion/ej2-vue-treegrid/styles/material3.css';
```

## Basic Configuration with Vue Template Format

### Composition API Setup

```vue
<template>
  <div id="app">
    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1" 
      childMapping="subtasks"
      :allowPaging="true"
      :pageSettings="pageSettings">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=70 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=200></e-column>
        <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Page } from '@syncfusion/ej2-vue-treegrid';

const data = ref([
  {
    taskID: 1,
    taskName: 'Planning',
    duration: 5,
    subtasks: [
      { taskID: 2, taskName: 'Plan timeline', duration: 5 },
      { taskID: 3, taskName: 'Plan budget', duration: 5 }
    ]
  },
  {
    taskID: 6,
    taskName: 'Design',
    duration: 3,
    subtasks: [
      { taskID: 7, taskName: 'Software Specification', duration: 3 }
    ]
  }
]);

const pageSettings = { pageSize: 7 };

provide('treegrid', [Page]);
</script>
```

#### Options API Setup

```vue
<template>
  <div id="app">
    <ejs-treegrid 
      :dataSource="data" 
      :treeColumnIndex="1" 
      childMapping="subtasks"
      :allowPaging="true"
      :pageSettings="pageSettings">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width=70 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=200></e-column>
        <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script>
import { TreeGridComponent } from '@syncfusion/ej2-vue-treegrid';
import { ColumnDirective, ColumnsDirective } from '@syncfusion/ej2-vue-treegrid';
import { Page } from '@syncfusion/ej2-vue-treegrid';

export default {
  name: 'App',
  components: {
    'ejs-treegrid': TreeGridComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective,
  },
  data() {
    return {
      data: [
        {
          taskID: 1,
          taskName: 'Planning',
          duration: 5,
          subtasks: [
            { taskID: 2, taskName: 'Plan timeline', duration: 5 },
            { taskID: 3, taskName: 'Plan budget', duration: 5 }
          ]
        },
        {
          taskID: 6,
          taskName: 'Design',
          duration: 3,
          subtasks: [
            { taskID: 7, taskName: 'Software Specification', duration: 3 }
          ]
        }
      ],
      pageSettings: { pageSize: 7 }
    };
  },
  provide() {
    return {
      treegrid: [Page]
    };
  }
};
</script>
```


## Data Binding Methods

### 1. Hierarchical Data Binding (Parent-Child Relationship)

Use `childMapping` for nested data structures:

```vue
<template>
  <div id="app">
    <ejs-treegrid 
      :dataSource="hierarchicalData" 
      :treeColumnIndex="1" 
      childMapping="subtasks">
      <e-columns>
        <e-column field="taskID" :isPrimaryKey="true" headerText="Task ID" width=70 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=200></e-column>
        <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const hierarchicalData = ref([
  {
    taskID: 1,
    taskName: 'Planning',
    duration: 5,
    subtasks: [
      { taskID: 2, taskName: 'Plan timeline', duration: 5 },
      { taskID: 3, taskName: 'Plan budget', duration: 5 }
    ]
  }
]);
</script>
```

### 2. Self-Referential Data Binding (Flat Structure)

Use `idMapping` and `parentIdMapping` for flat data with ID relationships:

```vue
<template>
  <div id="app">
    <ejs-treegrid 
      :dataSource="flatData" 
      :treeColumnIndex="1" 
      idMapping="taskID"
      parentIdMapping="parentID">
      <e-columns>
        <e-column field="taskID" :isPrimaryKey="true" headerText="Task ID" width=70 textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width=200></e-column>
        <e-column field="duration" headerText="Duration" width=80 textAlign="Right"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-treegrid';

const flatData = ref([
  { taskID: 1, parentID: null, taskName: 'Planning', duration: 5 },
  { taskID: 2, parentID: 1, taskName: 'Plan timeline', duration: 3 },
  { taskID: 3, parentID: 1, taskName: 'Plan budget', duration: 2 }
]);
</script>
```

## Module Injection

TreeGrid features are independently injectable. Only include modules you need:

```vue
<script setup>
import { provide } from 'vue';
import { 
  Page, 
  Sort, 
  Filter, 
  Edit, 
  Toolbar,
  ColumnMenu,
  Resize,
  Reorder,
  ExcelExport,
  PdfExport,
  VirtualScroll
} from '@syncfusion/ej2-vue-treegrid';

// Inject only required modules
provide('treegrid', [Page, Sort, Filter, Edit, Toolbar]);
</script>
```

### Common Modules:

| Module | Purpose | When to Use |
|--------|---------|------------|
| `Page` | Paging functionality | When data has 100+ records |
| `Sort` | Sorting capability | When users need to sort columns |
| `Filter` | Filtering options | When users need to search/filter data |
| `Edit` | Inline and dialog editing | When enabling CRUD operations |
| `Toolbar` | Toolbar commands | When adding action buttons |
| `ColumnMenu` | Column context menu | For column management features |
| `Resize` | Column resizing | For flexible column widths |
| `Reorder` | Column reordering | When users can rearrange columns |
| `ExcelExport` | Excel export | For export to Excel functionality |
| `PdfExport` | PDF export | For export to PDF functionality |
| `VirtualScroll` | Virtual scrolling | For large datasets (10,000+ rows) |
| `Selection` | Row/Cell selection | For multi-row operations |

## Column Configuration

### Essential Column Properties:

```vue
<!-- Basic Column -->
<e-column field="taskID" headerText="Task ID" width=90 textAlign="Right"></e-column>

<!-- Primary Key Column (REQUIRED for editing) -->
<e-column 
  field="taskID" 
  :isPrimaryKey="true" 
  headerText="Task ID" 
  width=90 
  textAlign="Right">
</e-column>

<!-- Date Column -->
<e-column 
  field="startDate" 
  headerText="Start Date" 
  type="date" 
  format="yMd" 
  width=90 
  textAlign="Right">
</e-column>

<!-- Number Column -->
<e-column 
  field="duration" 
  headerText="Duration" 
  type="number" 
  width=80 
  textAlign="Right">
</e-column>

<!-- Boolean/Checkbox Column -->
<e-column 
  field="approved" 
  headerText="Approved" 
  displayAsCheckBox="true" 
  width=90>
</e-column>
```

### Column Attribute Rules:

- `field` - Data source field name (camelCase)
- `headerText` - Display header text (can contain spaces)
- `width` - Column width in pixels (NO quotes: `width=90` not `width='90'`)
- `textAlign` - Alignment ('Left', 'Right', 'Center')
- `type` - Data type ('string', 'number', 'date', 'boolean')
- `format` - Display format for numbers/dates
- `:isPrimaryKey` - Mark primary key column (binding requires `:` prefix)
- `displayAsCheckBox` - Show boolean as checkbox

## Complete Working Example

```vue
<template>
  <div id="app">
    <h2>Syncfusion Vue TreeGrid - Getting Started</h2>
    <ejs-treegrid 
      :dataSource="treeGridData" 
      :treeColumnIndex="1" 
      childMapping="subtasks"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :allowSorting="true"
      :allowFiltering="true"
      :allowSelection="true">
      <e-columns>
        <e-column 
          field="taskID" 
          :isPrimaryKey="true" 
          headerText="Task ID" 
          width=70 
          textAlign="Right">
        </e-column>
        <e-column 
          field="taskName" 
          headerText="Task Name" 
          width=200>
        </e-column>
        <e-column 
          field="startDate" 
          headerText="Start Date" 
          type="date" 
          format="yMd" 
          width=90 
          textAlign="Right">
        </e-column>
        <e-column 
          field="duration" 
          headerText="Duration" 
          type="number" 
          width=80 
          textAlign="Right">
        </e-column>
        <e-column 
          field="progress" 
          headerText="Progress" 
          type="number" 
          width=80 
          textAlign="Right">
        </e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { TreeGridComponent as EjsTreegrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Page, Sort, Filter, Selection } from '@syncfusion/ej2-vue-treegrid';

const treeGridData = ref([
  {
    taskID: 1,
    taskName: 'Planning',
    startDate: new Date('02/03/2017'),
    duration: 5,
    progress: 100,
    subtasks: [
      { taskID: 2, taskName: 'Plan timeline', startDate: new Date('02/03/2017'), duration: 5, progress: 100 },
      { taskID: 3, taskName: 'Plan budget', startDate: new Date('02/03/2017'), duration: 5, progress: 100 },
      { taskID: 4, taskName: 'Allocate resources', startDate: new Date('02/03/2017'), duration: 5, progress: 100 },
      { taskID: 5, taskName: 'Planning complete', startDate: new Date('02/07/2017'), duration: 0, progress: 0 }
    ]
  },
  {
    taskID: 6,
    taskName: 'Design',
    startDate: new Date('02/10/2017'),
    duration: 3,
    progress: 86,
    subtasks: [
      { taskID: 7, taskName: 'Software Specification', startDate: new Date('02/10/2017'), duration: 3, progress: 60 },
      { taskID: 8, taskName: 'Develop prototype', startDate: new Date('02/10/2017'), duration: 3, progress: 100 },
      { taskID: 9, taskName: 'Get approval from customer', startDate: new Date('02/13/2017'), duration: 2, progress: 100 },
      { taskID: 10, taskName: 'Design Documentation', startDate: new Date('02/13/2017'), duration: 2, progress: 100 },
      { taskID: 11, taskName: 'Design complete', startDate: new Date('02/14/2017'), duration: 0, progress: 0 }
    ]
  }
]);

const pageSettings = { pageSize: 7 };

provide('treegrid', [Page, Sort, Filter, Selection]);
</script>

<style scoped>
#app {
  font-family: 'Segoe UI', Arial, sans-serif;
  padding: 20px;
}
</style>
```
