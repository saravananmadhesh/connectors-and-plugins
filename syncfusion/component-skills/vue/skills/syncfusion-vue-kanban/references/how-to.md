# Kanban How-To Recipes

## Table of Contents
- [Dynamically Change Column Properties](#dynamically-change-column-properties)
- [Replace All Columns at Runtime](#replace-all-columns-at-runtime)
- [Filter Cards with a Query](#filter-cards-with-a-query)
- [Search Cards by Text](#search-cards-by-text)
- [Handle Column Header Double-Click](#handle-column-header-double-click)

---

## Dynamically Change Column Properties

Modify individual column properties at runtime by accessing `kanbanObj.columns[index]` and then calling `refreshHeader()` to apply the change to the UI:

```vue
<template>
  <button @click="enableToggle">Enable Toggle on Column 2</button>
  <ejs-kanban ref="kanban" keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Testing"     keyField="Testing"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { ref } from 'vue';
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

const kanban       = ref(null);
const data         = extend([], kanbanData, null, true);
const cardSettings = { contentField: 'Summary', headerField: 'Id' };

const enableToggle = () => {
  // columns is 0-indexed — index 1 is the second column
  kanban.value.ej2Instances.columns[1].allowToggle = true;
  kanban.value.ej2Instances.refreshHeader();
};
</script>
```

---

## Replace All Columns at Runtime

Assign a new array to `kanbanObj.columns` to completely swap out the board's columns:

```vue
<template>
  <button @click="changeColumns">Simplify Board</button>
  <ejs-kanban ref="kanban" keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Testing"     keyField="Testing"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { ref } from 'vue';
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

const kanban       = ref(null);
const data         = extend([], kanbanData, null, true);
const cardSettings = { contentField: 'Summary', headerField: 'Id' };

const changeColumns = () => {
  kanban.value.ej2Instances.columns = [
    { headerText: 'To Do', keyField: 'Open'  },
    { headerText: 'Done',  keyField: 'Close' },
  ];
};
</script>
```

Cards whose `Status` doesn't match any remaining column `keyField` are hidden from view but remain in the data source.

---

## Filter Cards with a Query

Assign a `Query` object to `kanbanObj.query` to filter which cards are displayed. An empty `Query()` shows all cards:

```vue
<template>
  <select @change="onFilterChange">
    <option value="">All</option>
    <option value="High">High Priority</option>
    <option value="Normal">Normal Priority</option>
    <option value="Low">Low Priority</option>
  </select>

  <ejs-kanban ref="kanban" keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { ref } from 'vue';
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { Query } from '@syncfusion/ej2-data';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

const kanban       = ref(null);
const data         = extend([], kanbanData, null, true);
const cardSettings = { contentField: 'Summary', headerField: 'Id' };

const onFilterChange = (e) => {
  const value = e.target.value;
  const kanbanObj = kanban.value.ej2Instances;

  kanbanObj.query = value
    ? new Query().where('Priority', 'equal', value)
    : new Query();
};
</script>
```

---

## Search Cards by Text

Use `Query.search()` with `'contains'` operator to perform a live text search across multiple fields:

```vue
<template>
  <input id="search" type="text" placeholder="Search cards..." @keyup="onSearch" />
  <button @click="resetSearch">Reset</button>

  <ejs-kanban ref="kanban" keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { ref } from 'vue';
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { Query } from '@syncfusion/ej2-data';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

const kanban       = ref(null);
const data         = extend([], kanbanData, null, true);
const cardSettings = { contentField: 'Summary', headerField: 'Id' };

const onSearch = (e) => {
  const value     = e.target.value;
  const kanbanObj = kanban.value.ej2Instances;

  kanbanObj.query = value
    ? new Query().search(value, ['Id', 'Summary'], 'contains', true)
    : new Query();
};

const resetSearch = () => {
  document.getElementById('search').value = '';
  kanban.value.ej2Instances.query = new Query();
};
</script>
```

`Query.search(value, fields, operator, ignoreCase)`:
- `fields`: array of data field names to search within
- `operator`: `'contains'`, `'startswith'`, `'endswith'`, `'equal'`, etc.
- `ignoreCase`: `true` for case-insensitive search

---

## Handle Column Header Double-Click

Bind a `dblclick` DOM event listener to column headers inside the `dataBound` callback (after the DOM is ready):

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :dataBound="onDataBound">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

const data         = extend([], kanbanData, null, true);
const cardSettings = { contentField: 'Summary', headerField: 'Id' };

const onDataBound = () => {
  const headerRow = document.querySelector('.e-header-row');
  headerRow.addEventListener('dblclick', (e) => {
    const headerCell = e.target.closest('.e-header-cells');
    if (headerCell) {
      const headerText = headerCell.querySelector('.e-header-text').innerText;
      console.log('Double-clicked header:', headerText);
      // Your custom logic here — e.g. open a rename dialog
    }
  });
};
</script>
```

> Use `dataBound` (not `created`) to bind DOM events — the header DOM is only available after data binding completes.
