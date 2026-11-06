# Toolbar

## Table of Contents
- [When to Use](#when-to-use)
- [Toolbar Configuration](#toolbar-configuration)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar Positioning](#toolbar-positioning)
- [Enable or Disable Toolbar Items](#enable-or-disable-toolbar-items)
- [Customize Toolbar with CSS](#customize-toolbar-with-css)

## When to Use

Use this reference when you need to:
- Add built-in toolbar items (Export, Edit, Delete, Search)
- Create custom toolbar items and actions
- Configure toolbar position and appearance
- Handle toolbar click events
- Enable/disable toolbar items dynamically
- Customize toolbar styling

## Toolbar Configuration

### Enable Toolbar
```vue
<template>
  <ejs-grid 
    ref="grid"
    :dataSource="data" 
    :toolbar="toolbar">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { GridComponent as EjsGrid, ColumnDirective as EColumn, ColumnsDirective as EColumns, Toolbar } from "@syncfusion/ej2-vue-grids";
import { provide, ref } from 'vue';

const grid = ref(null);
const toolbar = ['Print', 'Search'];
provide('grid', [Toolbar]);
</script>
```

## Built-in Toolbar Items

The Grid supports the following built-in toolbar items as strings:

- **Add** - Adds a new row to the Grid
- **Edit** - Enables editing mode for the selected row
- **Update** - Saves the changes made during editing
- **Delete** - Deletes the selected record
- **Cancel** - Discards the changes made during editing
- **Search** - Displays a search box to filter Grid records
- **Print** - Prints the Grid content
- **ColumnChooser** - Choose the column's visibility
- **PdfExport** - Exports the Grid data to a PDF file
- **ExcelExport** - Exports the Grid data to an Excel file
- **CsvExport** - Exports the Grid data to a CSV file

### Example with Multiple Built-in Items
```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :toolbar="toolbar"
    :editSettings="editSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" :isPrimaryKey="true"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Print', 'Search'];
const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
</script>
```

## Custom Toolbar Items

### Add Custom Toolbar Items
```vue
<template>
  <ejs-grid 
    ref="grid"
    :dataSource="data" 
    :toolbar="toolbar"
    :toolbarClick="toolbarClick"
    :allowGrouping="true"
    :groupSettings="groupOptions">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const grid = ref(null);
const toolbar = [
  { text: 'Expand All', tooltipText: 'Expand All', prefixIcon: 'e-expand', id: 'expandall' },
  { text: 'Collapse All', tooltipText: 'Collapse All', prefixIcon: 'e-collapse-2', id: 'collapseall', align: 'Right' }
];

const groupOptions = { columns: ['CustomerID'] };

const toolbarClick = (args) => {
  if (args.item.id === 'expandall') {
    grid.value.ej2Instances.groupModule.expandAll();
  }
  if (args.item.id === 'collapseall') {
    grid.value.ej2Instances.groupModule.collapseAll();
  }
};
</script>
```

### Custom Toolbar Item Properties

- **text** - Display text for the item
- **tooltipText** - Tooltip text shown on hover
- **prefixIcon** - CSS class for icon
- **id** - Unique identifier for the toolbar item
- **align** - Item alignment (Left, Right, Center)

## Toolbar Positioning

### Add Toolbar at Bottom of Grid
```vue
<template>
  <ejs-grid 
    ref="grid"
    :dataSource="data" 
    :toolbar="toolbar"
    :created="created"
    height="200px">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';

const grid = ref(null);
const toolbar = ['Print', 'Search'];

const created = () => {
  let toolbar = document.querySelector('.e-toolbar');
  document.querySelector('.e-gridcontent').parentElement.appendChild(toolbar);
};
</script>
```

## Enable or Disable Toolbar Items

### Dynamically Enable/Disable Toolbar Items
```vue
<template>
  <div>
    <label style="margin-right: 5px">Enable or disable toolbar items</label>
    <ejs-switch id="switch" :change="onSwitchChange"></ejs-switch>
  </div>
  <ejs-grid 
    ref="grid"
    :dataSource="data" 
    :toolbar="toolbar"
    :toolbarClick="toolbarClick">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
import { ref } from 'vue';
import { SwitchComponent as EjsSwitch } from "@syncfusion/ej2-vue-buttons";

const grid = ref(null);
const toolbar = ['Expand', 'Collapse'];

const onSwitchChange = (args) => {
  if (args.checked) {
    grid.value.ej2Instances.toolbarModule.enableItems(['Grid_Collapse', 'Grid_Expand'], false);
  } else {
    grid.value.ej2Instances.toolbarModule.enableItems(['Grid_Collapse', 'Grid_Expand'], true);
  }
};

const toolbarClick = (args) => {
  if (args.item.id === 'Grid_Collapse') {
    grid.value.ej2Instances.groupModule.collapseAll();
  }
  if (args.item.id === 'Grid_Expand') {
    grid.value.ej2Instances.groupModule.expandAll();
  }
};
</script>
```

## Combine Built-in and Custom Toolbar Items

```vue
<template>
  <ejs-grid 
    ref="grid"
    :dataSource="data" 
    :toolbar="toolbar"
    :editSettings="editSettings"
    :toolbarClick="toolbarClick">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100" :isPrimaryKey="true"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const toolbar = [
  'Add', 'Edit', 'Delete', 'Update', 'Cancel',
  { text: 'Custom Action', tooltipText: 'Perform Custom Action', prefixIcon: 'e-forward', id: 'customAction' }
];

const editSettings = { allowAdding: true, allowEditing: true, allowDeleting: true };

const toolbarClick = (args) => {
  if (args.item.id === 'customAction') {
    console.log('Custom toolbar action triggered');
  }
};
</script>
```

## Customize Toolbar with CSS

### Change Background Color of Toolbar Buttons
```vue
<template>
  <ejs-grid 
    :dataSource="data" 
    :toolbar="toolbar"
    :editSettings="editSettings">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
    </e-columns>
  </ejs-grid>
</template>

<script setup>
const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };
</script>

<style>
.e-grid .e-toolbar .e-tbar-btn .e-icons,
.e-grid .e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn {
  background: #add8e6;
}
</style>
```

### Show Only Icons in Toolbar
```vue
<style>
.e-grid .e-toolbar .e-tbar-btn-text,
.e-grid .e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn-text {
  display: none;
}
</style>
```

## Toolbar with Custom Components

### Add AutoComplete to Toolbar
```vue
<template>
  <ejs-grid 
    ref="grid"
    :dataSource="data" 
    :editSettings="editSettings"
    :toolbar="toolbar">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="90"></e-column>
      <e-column field="CustomerID" headerText="Customer ID" width="100"></e-column>
      <e-column field="ShipCity" headerText="Ship City" width="100"></e-column>
    </e-columns>
  </ejs-grid>
  <div id="toolbar-template">
    <ejs-autocomplete 
      :dataSource="dropDownData" 
      placeholder="Search ShipCity" 
      @change="onChange">
    </ejs-autocomplete>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { AutoCompleteComponent as EjsAutocomplete } from '@syncfusion/ej2-vue-dropdowns';

const grid = ref(null);
const dropDownData = [
  'Reims', 'Münster', 'Rio de Janeiro', 'Lyon', 'Charleroi', 'Bern', 
  'Genève', 'San Cristóbal', 'Graz', 'México D.F.', 'Albuquerque', 'Köln'
];

const toolbar = [
  'Add', 'Edit', 'Delete',
  { 
    template: '#toolbar-template', 
    align: 'Left', 
    tooltipText: 'Custom component AutoComplete' 
  }
];

const editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true };

const onChange = (event) => {
  grid.value.search(event.value);
};
</script>
```
