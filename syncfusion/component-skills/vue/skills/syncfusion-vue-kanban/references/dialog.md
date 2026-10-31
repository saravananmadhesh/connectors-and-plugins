# Kanban Dialog (Add / Edit / Delete Cards)

## Table of Contents
- [Default Dialog](#default-dialog)
- [Custom Dialog Fields](#custom-dialog-fields)
- [Custom Field Labels](#custom-field-labels)
- [Field Validation](#field-validation)
- [Dialog Template](#dialog-template)
- [Prevent Dialog from Opening](#prevent-dialog-from-opening)
- [Persisting Changes to a Server](#persisting-changes-to-a-server)

## Default Dialog

Double-clicking any card opens the built-in edit dialog. The dialog auto-maps fields based on your `cardSettings` and `keyField`:

| Data Field | Dialog Control | Label |
|---|---|---|
| `cardSettings.headerField` | Text Input (disabled) | "ID" |
| `keyField` | DropDown | *(key field name)* |
| `cardSettings.contentField` | TextArea | *(content field name)* |
| `cardSettings.priority` *(if set)* | Numeric | *(priority field name)* |
| `swimlaneSettings.keyField` *(if set)* | DropDown | *(swimlane field name)* |

The dialog has **Delete**, **Save**, and **Cancel** buttons.

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData" :cardSettings="cardSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Testing"     keyField="Testing"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { extend } from '@syncfusion/ej2-base';
import { kanbanData } from './datasource.js';

const data = extend([], kanbanData, null, true);
const cardSettings = { contentField: 'Summary', headerField: 'Id' };
</script>
```

## Custom Dialog Fields

Override the default auto-mapped fields with `dialogSettings.fields`. Each field entry needs a `key` (data field) and a `type`:

```vue
<script setup>
const dialogSettings = {
  fields: [
    { text: 'ID',          key: 'Id',          type: 'Input'    },
    { key: 'Category',                          type: 'DropDown' },
    { key: 'Title',                             type: 'Input'    },
    { key: 'Size',                              type: 'Input'    },
    { key: 'Description',                       type: 'TextArea' },
  ],
};
</script>

<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :dialogSettings="dialogSettings">
    <!-- columns -->
  </ejs-kanban>
</template>
```

Available `type` values:

| Type | Rendered As |
|---|---|
| `'Input'` | `<input type="text">` |
| `'TextBox'` | Text box (same as Input) |
| `'TextArea'` | `<textarea>` |
| `'Numeric'` | NumericTextBox |
| `'DropDown'` | DropDownList |
| `'String'` | Plain string display |
| *(omitted)* | Raw HTML `<input>` |

## Custom Field Labels

By default the `key` value is used as the field label. Override it with `text`:

```vue
<script setup>
const dialogSettings = {
  fields: [
    { text: 'ID',       key: 'Id',       type: 'Input'    },   // label: "ID"
    { key: 'Status',                     type: 'DropDown' },   // label: "Status"
    { key: 'Estimate',                   type: 'Numeric'  },   // label: "Estimate"
    { key: 'Summary',                    type: 'TextArea' },   // label: "Summary"
  ],
};
</script>
```

## Field Validation

Add `validationRules` to any field to enforce rules when the user clicks **Save**:

```vue
<script setup>
const dialogSettings = {
  fields: [
    { text: 'ID',      key: 'Id',       type: 'Input'   },
    { key: 'Status',                    type: 'DropDown'},
    { key: 'Estimate',                  type: 'Numeric',  validationRules: { range: [0, 1000] } },
    { key: 'Summary',                   type: 'TextArea', validationRules: { required: true }    },
  ],
};
</script>
```

Supported rules follow the `FormValidator` rule format: `required`, `minLength`, `maxLength`, `range`, `regex`, etc.

## Dialog Template

Replace the entire dialog body with a custom Vue component via `dialogSettings.template`. The template receives the current card's data object and allows full control over layout and inputs:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :dialogSettings="dialogSettings">
    <e-columns>
      <e-column headerText="To Do"       keyField="Open"></e-column>
      <e-column headerText="In Progress" keyField="InProgress"></e-column>
      <e-column headerText="Done"        keyField="Close"></e-column>
    </e-columns>
  </ejs-kanban>
</template>

<script setup>
import { KanbanComponent as EjsKanban, ColumnDirective as EColumn, ColumnsDirective as EColumns } from '@syncfusion/ej2-vue-kanban';
import { DropDownListComponent } from '@syncfusion/ej2-vue-dropdowns';
import { extend } from '@syncfusion/ej2-base';
import { createApp } from 'vue';
import { kanbanData } from './datasource.js';

const app = createApp({});

const DialogTpl = app.component('dialog-template', {
  components: { 'ejs-dropdownlist': DropDownListComponent },
  template: `
    <table>
      <tr>
        <td>ID</td>
        <td><input name="Id" type="text" class="e-field" v-model="data.Id" disabled /></td>
      </tr>
      <tr>
        <td>Status</td>
        <td>
          <ejs-dropdownlist name="Status" class="e-field" v-model="data.Status"
            :dataSource="statusData" placeholder="Status">
          </ejs-dropdownlist>
        </td>
      </tr>
      <tr>
        <td>Summary</td>
        <td><textarea name="Summary" class="e-field" v-model="data.Summary"></textarea></td>
      </tr>
    </table>`,
  data() {
    return {
      statusData: ['Open', 'InProgress', 'Testing', 'Close'],
      data: {},
    };
  },
});

const data = extend([], kanbanData, null, true);
const cardSettings = { contentField: 'Summary', headerField: 'Id' };
const dialogSettings = {
  template: () => ({ template: DialogTpl }),
};
</script>
```

Key points:
- Input fields **must** have `class="e-field"` and a `name` attribute matching the data key so Kanban can read the values on Save
- Disabled inputs (like ID) are display-only and won't be updated

## Prevent Dialog from Opening

Cancel the dialog in the `dialogOpen` event by setting `args.cancel = true`:

```vue
<template>
  <ejs-kanban keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings" :dialogOpen="onDialogOpen">
    <!-- columns -->
  </ejs-kanban>
</template>

<script setup>
const onDialogOpen = (args) => {
  // Prevent dialog from opening for all double-clicks
  args.cancel = true;

  // Or conditionally — e.g. prevent edit but allow add:
  // if (args.requestType === 'Edit') args.cancel = true;
};
</script>
```

`args.requestType` values: `'Add'`, `'Edit'`, `'Delete'`.

## Persisting Changes to a Server

To open the dialog programmatically (e.g., after a custom button click), use the `openDialog` method:

```vue
<template>
  <button @click="addCard">Add New Card</button>
  <ejs-kanban ref="kanban" keyField="Status" :dataSource="kanbanData"
    :cardSettings="cardSettings">
    <!-- columns -->
  </ejs-kanban>
</template>

<script setup>
import { ref } from 'vue';
const kanban = ref(null);

const addCard = () => {
  // Open the dialog in Add mode (no pre-filled data)
  kanban.value.ej2Instances.openDialog('Add');
};

// To open in Edit mode with a specific card:
// kanban.value.ej2Instances.openDialog('Edit', cardDataObject);

// To close the dialog programmatically:
// kanban.value.ej2Instances.closeDialog();
</script>
```

For CRUD persistence to a REST server, configure `DataManager` with `insertUrl`, `updateUrl`, `removeUrl` (or `crudUrl`) — see `references/data-binding.md`.
