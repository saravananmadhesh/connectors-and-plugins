# Kanban Virtual Scrolling

## Table of Contents
- [Enabling Virtual Scrolling](#enabling-virtual-scrolling)
- [Card Height](#card-height)
- [Custom Dialog Fields](#custom-dialog-fields)
- [Remote Data with Virtual Scrolling](#remote-data-with-virtual-scrolling)
- [Limitations](#limitations)

## Enabling Virtual Scrolling

Virtual scrolling renders only the cards currently visible in the viewport, dramatically improving performance for boards with thousands of cards. Enable it with `enableVirtualization` and set a fixed `height` on the board:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings"
    :enableVirtualization="true"
    height="700px">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Review"      keyField="Review"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

const cardSettings = { contentField: 'Summary', headerField: 'Id' };
</script>
```

> `height` is required — virtual scrolling has no effect on a board that expands to fit all content.

## Card Height

When virtual scrolling is enabled, all cards must have a uniform height so the Kanban can correctly compute scroll positions. Use the `cardHeight` property (pixel value only):

```vue
<ejs-kanban keyField="Status" :dataSource="kanbanData"
  :cardSettings="cardSettings"
  :enableVirtualization="true"
  height="700px"
  cardHeight="120px">
  <!-- columns -->
</ejs-kanban>
```

- Default card height when virtualization is enabled: **100px** (not `auto`)
- Always specify a `px` value — percentage values are not supported with virtual scrolling
- Keep card content consistent; cards taller than `cardHeight` will be clipped

## Custom Dialog Fields

When virtual scrolling is on, the default card-edit dialog renders all data fields. Define exactly which fields appear with `dialogSettings.fields`:

```vue
<script setup>
import { DialogFieldsModel } from '@syncfusion/ej2-vue-kanban';

const dialogSettings = {
  fields: [
    { text: 'ID',       key: 'Id',       type: 'Input'    },
    { text: 'Status',   key: 'Status',   type: 'DropDown' },
    { text: 'Assignee', key: 'Assignee', type: 'Input'    },
    { text: 'Summary',  key: 'Summary',  type: 'TextArea' },
  ],
};
</script>

<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings"
    :enableVirtualization="true"
    height="700px"
    :dialogSettings="dialogSettings">
    <!-- columns -->
  </ejs-kanban>
</template>
```

`type` values: `'Input'`, `'DropDown'`, `'TextArea'`, `'CheckBox'`, `'DatePicker'`, `'DateTimePicker'`, `'NumericTextBox'`.

## Remote Data with Virtual Scrolling

For server-side data, the Kanban sends a `KanbanVirtualization` parameter in each data request when `enableVirtualization` is `true`. Use this on the server to page/filter the response:

```vue
<script setup>
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

const dataSource = new DataManager({
  url: 'https://your-api/kanban',
  crudUrl: 'https://your-api/kanban/crud',
  adaptor: new UrlAdaptor(),
});
</script>

<template>
  <ejs-kanban keyField="Status" :dataSource="dataSource"
    :cardSettings="cardSettings"
    :enableVirtualization="true"
    height="700px">
    <!-- columns -->
  </ejs-kanban>
</template>
```

**Server-side**: When `KanbanVirtualization` is present in the request, return only the slice of data visible in the current scroll position. The exact paging logic depends on your data access layer.

## Limitations

| Limitation | Detail |
|---|---|
| No swimlane support | `swimlaneSettings` is incompatible with `enableVirtualization`. Using both simultaneously is unsupported. |
| Card position not preserved | After scrolling away and back, cards may reorder within a column. Card positions are re-calculated on each render. |
| No percentage card height | `cardHeight` must be a `px` value. Percentage-based heights (e.g. `'50%'`) are not supported. |
| Uniform card height required | All cards should render with the same height. Variable-height card content causes misaligned scroll positions. |
