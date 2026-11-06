# Getting Started with Vue TreeGrid - Options API (Vue 2)

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Install Syncfusion Packages](#install-syncfusion-packages)
- [Import CSS Styles](#import-css-styles)
- [Register Component](#register-component)
- [Define Data Source](#define-data-source)
- [Define Columns](#define-columns)
- [Module Injection](#module-injection)
- [Enable Paging](#enable-paging)
- [Enable Sorting](#enable-sorting)
- [Enable Filtering](#enable-filtering)
- [Run Application](#run-application)
- [Error Handling](#error-handling)
- [Complete Example](#complete-example)

---

## Prerequisites

✓ Node.js installed (v12 or higher)
✓ Vue CLI installed globally
✓ Basic knowledge of Vue 2 syntax
✓ Code editor (VS Code recommended)

**System Requirements:** Refer to official Syncfusion Vue system requirements documentation.

---

## Project Setup

### Create Vue 2 Project with CLI

Using NPM:
```bash
npm install -g @vue/cli
vue create quickstart
cd quickstart
npm run serve
```

Using Yarn:
```bash
yarn global add @vue/cli
vue create quickstart
cd quickstart
yarn run serve
```

**When prompted:** Select `Default ([Vue 2] babel, eslint)` option to create a Vue 2 project.

---

## Install Syncfusion Packages

Install the TreeGrid package from npm:

```bash
npm install @syncfusion/ej2-vue-treegrid --save
```

Or with Yarn:
```bash
yarn add @syncfusion/ej2-vue-treegrid
```

The `--save` flag automatically adds package to `package.json` dependencies.

---

## Import CSS Styles

Add theme styles to `src/App.vue` `<style>` section. Material3 theme shown (alternatives: Fabric, Bootstrap, High Contrast):

```vue
<style>
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-grids/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-treegrid/styles/material3.css';
</style>
```

---

## Register Component

In `src/App.vue` script section, import and register TreeGrid:

```javascript
<script>
import { TreeGridComponent } from "@syncfusion/ej2-vue-treegrid";

export default {
  name: "App",
  components: {
    'ejs-treegrid': TreeGridComponent
  }
}
</script>
```

In template section:
```vue
<template>
  <div id="app">
    <ejs-treegrid></ejs-treegrid>
  </div>
</template>
```

---

## Define Data Source

TreeGrid displays hierarchical data using `dataSource` and `childMapping` properties:

```javascript
<script>
import { TreeGridComponent } from "@syncfusion/ej2-vue-treegrid";

let dataSource = [
  {
    taskID: 1,
    taskName: 'Planning',
    startDate: new Date('02/03/2017'),
    endDate: new Date('02/07/2017'),
    duration: 5,
    progress: 100,
    priority: 'Normal',
    approved: false,
    subtasks: [
      { taskID: 2, taskName: 'Plan timeline', duration: 5, progress: 100 },
      { taskID: 3, taskName: 'Plan budget', duration: 5, progress: 100 },
      { taskID: 4, taskName: 'Allocate resources', duration: 5, progress: 100 },
      { taskID: 5, taskName: 'Planning complete', duration: 0, progress: 0 }
    ]
  },
  {
    taskID: 6,
    taskName: 'Design',
    startDate: new Date('02/10/2017'),
    endDate: new Date('02/14/2017'),
    duration: 3,
    progress: 86,
    priority: 'High',
    approved: false,
    subtasks: [
      { taskID: 7, taskName: 'Software Specification', duration: 3, progress: 60 },
      { taskID: 8, taskName: 'Develop prototype', duration: 3, progress: 100 }
    ]
  }
];

export default {
  name: "App",
  components: {
    'ejs-treegrid': TreeGridComponent
  },
  data() {
    return {
      data: dataSource
    }
  }
}
</script>
```

### Alternative: Self-Referencing Data

Use `idMapping` (unique record ID) and `parentIdMapping` (parent ID) for flat hierarchical structure:

```javascript
data: [
  { taskID: 1, taskName: 'Planning', parentID: null, subtasks: [...] },
  { taskID: 2, taskName: 'Plan timeline', parentID: 1, subtasks: [] }
]
```

Template binding:
```vue
<ejs-treegrid 
  :dataSource="data" 
  idMapping="taskID" 
  parentIdMapping="parentID">
</ejs-treegrid>
```

---

## Define Columns

Define columns using `ColumnsDirective` and `ColumnDirective`:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :treeColumnIndex="1" 
    childMapping="subtasks">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" textAlign="Right" width="90"></e-column>
      <e-column field="taskName" headerText="Task Name" textAlign="Left" width="200"></e-column>
      <e-column field="startDate" headerText="Start Date" format="yMd" textAlign="Right" width="120"></e-column>
      <e-column field="duration" headerText="Duration" textAlign="Right" width="100"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script>
import { TreeGridComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-vue-treegrid";

export default {
  components: {
    'ejs-treegrid': TreeGridComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  }
}
</script>
```

### Key Column Properties

| Property | Description | Example |
|----------|-------------|---------|
| `field` | Maps data property to column | `field="taskName"` |
| `headerText` | Column header title | `headerText="Task Name"` |
| `width` | Column width in pixels | `width="200"` |
| `textAlign` | Text alignment: Left, Right, Center | `textAlign="Right"` |
| `format` | Date/number format | `format="yMd"` converts dates |
| `treeColumnIndex` | Index of tree column (0-based) | `:treeColumnIndex="1"` |

---

## Module Injection

Inject required feature modules in `provide` section:

```javascript
export default {
  provide: {
    treegrid: [Page, Sort, Filter, ExcelExport, PdfExport]
  }
}
```

### Common Modules

- **Page**: Enable paging functionality
- **Sort**: Enable sorting columns
- **Filter**: Enable filtering with filter bar
- **ExcelExport**: Export to Excel format
- **PdfExport**: Export to PDF format
- **Resize**: Enable column resizing
- **Reorder**: Enable column reordering

---

## Enable Paging

Set `allowPaging="true"` and inject `Page` module:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :allowPaging="true" 
    :pageSettings="pageSettings"
    childMapping="subtasks">
    <e-columns>
      <!-- columns here -->
    </e-columns>
  </ejs-treegrid>
</template>

<script>
import { TreeGridComponent, Page } from "@syncfusion/ej2-vue-treegrid";

export default {
  data() {
    return {
      pageSettings: { pageSize: 7 }
    }
  },
  provide: {
    treegrid: [Page]
  }
}
</script>
```

### pageSettings Options

- `pageSize`: Number of records per page (default: 12)
- `pageSizeMode`: 'All' (all records) or 'Root' (root level only - for hierarchical data)
- `currentPage`: Initial page to display

---

## Enable Sorting

Set `allowSorting="true"` and inject `Sort` module:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :allowSorting="true" 
    :sortSettings="sortSettings"
    childMapping="subtasks">
    <e-columns>
      <!-- columns here -->
    </e-columns>
  </ejs-treegrid>
</template>

<script>
import { TreeGridComponent, Sort } from "@syncfusion/ej2-vue-treegrid";

export default {
  data() {
    return {
      sortSettings: {
        columns: [
          { field: 'taskName', direction: 'Ascending' },
          { field: 'taskID', direction: 'Descending' }
        ]
      }
    }
  },
  provide: {
    treegrid: [Sort]
  }
}
</script>
```

---

## Enable Filtering

Set `allowFiltering="true"` and inject `Filter` module:

```vue
<template>
  <ejs-treegrid 
    :dataSource="data" 
    :allowFiltering="true"
    :filterSettings="filterSettings"
    childMapping="subtasks">
    <e-columns>
      <!-- columns with filter options -->
    </e-columns>
  </ejs-treegrid>
</template>

<script>
import { TreeGridComponent, Filter } from "@syncfusion/ej2-vue-treegrid";

export default {
  data() {
    return {
      filterSettings: {
        hierarchyMode: 'Parent' // or 'Child' or 'Both'
      }
    }
  },
  provide: {
    treegrid: [Filter]
  }
}
</script>
```

### Filter Behavior

- **Parent**: Show filtered records with parents (default)
- **Child**: Show filtered records with children
- **Both**: Show filtered records with parents and children

---

## Run Application

Execute development server:

```bash
npm run serve
```

Or with Yarn:
```bash
yarn serve
```

Application opens at `localhost:8080`

---

## Error Handling

Handle TreeGrid errors using `actionFailure` event:

```vue
<template>
  <ejs-treegrid 
    ref="treegrid"
    :dataSource="data" 
    :editSettings="editSettings"
    :actionFailure="actionFailure"
    childMapping="subtasks">
    <e-columns>
      <e-column field="taskID" headerText="Task ID" width="90" isPrimaryKey="true"></e-column>
      <e-column field="taskName" headerText="Task Name"></e-column>
    </e-columns>
  </ejs-treegrid>
</template>

<script>
import { TreeGridComponent, Edit } from "@syncfusion/ej2-vue-treegrid";

export default {
  data() {
    return {
      editSettings: { 
        allowEditing: true, 
        allowAdding: true, 
        allowDeleting: true 
      }
    }
  },
  methods: {
    actionFailure(args) {
      console.error('TreeGrid Error:', args.error);
    }
  },
  provide: {
    treegrid: [Edit]
  }
}
</script>
```

### Common Errors and Solutions

**Error: isPrimaryKey not configured**
- Solution: Set `isPrimaryKey="true"` on one column for CRUD operations

**Error: Paging not supported with virtualization**
- Solution: Use either paging OR virtualization, not both

**Error: dataSource or columns required**
- Solution: Always bind either `dataSource` property or define `<e-columns>`

**Error: treeColumnIndex exceeds column count**
- Solution: Verify `treeColumnIndex` value is less than total columns

**Error: idMapping and childMapping enabled simultaneously**
- Solution: Use only one data binding approach (hierarchical OR self-referencing)

**Error: showCheckbox not in tree column**
- Solution: Place `showCheckbox="true"` only on tree column

**Error: detailTemplate with virtualization**
- Solution: detailTemplate not compatible with virtual scrolling

---

## Complete Example

```vue
<template>
  <div id="app">
    <ejs-treegrid
      :dataSource="data"
      :treeColumnIndex="1"
      childMapping="subtasks"
      :allowPaging="true"
      :pageSettings="pageSettings"
      :allowSorting="true"
      :sortSettings="sortSettings"
      :allowFiltering="true"
      :height="400">
      <e-columns>
        <e-column field="taskID" headerText="ID" width="70" textAlign="Right"></e-column>
        <e-column field="taskName" headerText="Task Name" width="180"></e-column>
        <e-column field="startDate" headerText="Start Date" format="yMd" width="120"></e-column>
        <e-column field="duration" headerText="Duration" width="100"></e-column>
      </e-columns>
    </ejs-treegrid>
  </div>
</template>

<script>
import { TreeGridComponent, ColumnsDirective, ColumnDirective, Page, Sort, Filter } 
  from "@syncfusion/ej2-vue-treegrid";

let dataSource = [
  {
    taskID: 1, taskName: 'Planning', startDate: new Date('02/03/2017'),
    duration: 5, progress: 100, subtasks: [
      { taskID: 2, taskName: 'Timeline', duration: 5, progress: 100 }
    ]
  }
];

export default {
  name: "App",
  components: {
    'ejs-treegrid': TreeGridComponent,
    'e-columns': ColumnsDirective,
    'e-column': ColumnDirective
  },
  data() {
    return {
      data: dataSource,
      pageSettings: { pageSize: 7 },
      sortSettings: { columns: [{ field: 'taskName', direction: 'Ascending' }] }
    }
  },
  provide: {
    treegrid: [Page, Sort, Filter]
  }
}
</script>

<style>
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-grids/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-treegrid/styles/material3.css';
</style>
```

---
