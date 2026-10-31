# Toolbar

## Table of Contents
- [Toolbar Overview](#toolbar-overview)
- [Built-in Toolbar Items](#built-in-toolbar-items)
- [Adding Toolbar Items](#adding-toolbar-items)
- [Custom Toolbar Items](#custom-toolbar-items)
- [Toolbar Click Event](#toolbar-click-event)
- [Enabling/Disabling Items Programmatically](#enablingdisabling-items-programmatically)

## Toolbar Overview

The Gantt toolbar renders above the grid panel. Toolbar items are injected strings (built-in) or descriptor objects (custom). The `Toolbar` module must always be injected when the toolbar is used.

```vue
<ejs-gantt :toolbar="toolbar" ...></ejs-gantt>

<script setup>
import { provide } from 'vue';
import { Toolbar } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Toolbar]);

const toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'ExpandAll', 'CollapseAll'];
</script>
```

## Built-in Toolbar Items

### Editing items
| Item string | Description | Requires module |
|---|---|---|
| `'Add'` | Open add-task dialog | `Edit` |
| `'Edit'` | Open edit dialog for selected task | `Edit` |
| `'Delete'` | Delete selected task(s) | `Edit` |
| `'Update'` | Save pending batch edits | `Edit` |
| `'Cancel'` | Discard pending batch edits | `Edit` |

### Row operations
| Item string | Description | Requires module |
|---|---|---|
| `'Indent'` | Indent selected task (make child) | `Edit` |
| `'Outdent'` | Outdent selected task (promote) | `Edit` |

### View operations
| Item string | Description | Requires module |
|---|---|---|
| `'ExpandAll'` | Expand all rows | — |
| `'CollapseAll'` | Collapse all rows | — |

### Timeline / zoom
| Item string | Description | Requires module |
|---|---|---|
| `'ZoomIn'` | Zoom in on the timeline | `Zoom` |
| `'ZoomOut'` | Zoom out on the timeline | `Zoom` |
| `'ZoomToFit'` | Fit entire project in view | `Zoom` |

### Export
| Item string | Description | Requires module |
|---|---|---|
| `'ExcelExport'` | Export to Excel | `ExcelExport` |
| `'CsvExport'` | Export to CSV | `ExcelExport` |
| `'PdfExport'` | Export to PDF | `PdfExport` |

### Other
| Item string | Description | Requires module |
|---|---|---|
| `'Search'` | Display search input | `Filter` |
| `'PrevTimeSpan'` | Shift timeline left | — |
| `'NextTimeSpan'` | Shift timeline right | — |
| `'Undo'` | Undo last action | `UndoRedo` |
| `'Redo'` | Redo last undone action | `UndoRedo` |

## Adding Toolbar Items

Combine built-in and custom items in a single array:

```js
const toolbar = [
  'Add', 'Edit', 'Delete',
  'ExpandAll', 'CollapseAll',
  'ZoomIn', 'ZoomOut', 'ZoomToFit',
  'Search',
  'ExcelExport', 'PdfExport',
  { text: 'Refresh', tooltipText: 'Refresh Data', id: 'customRefresh', prefixIcon: 'e-refresh' }
];
```

## Custom Toolbar Items

Custom items are plain objects with these properties:

| Property | Type | Description |
|---|---|---|
| `text` | string | Label text on the button |
| `tooltipText` | string | Tooltip shown on hover |
| `id` | string | Unique identifier — used in `toolbarClick` event |
| `prefixIcon` | string | CSS class for the button icon |
| `cssClass` | string | Additional CSS class on the button |
| `align` | string | `'Left'` (default), `'Center'`, `'Right'` |
| `disabled` | boolean | Initial disabled state |

```js
const toolbar = [
  'Add',
  {
    text: 'Export CSV',
    tooltipText: 'Export to CSV',
    id: 'exportCsv',
    prefixIcon: 'e-export-excel',
    align: 'Right'
  }
];
```

## Toolbar Click Event

Handle `toolbarClick` to respond to both built-in and custom button clicks:

```vue
<ejs-gantt :toolbar="toolbar" @toolbarClick="onToolbarClick" ...></ejs-gantt>

<script setup>
function onToolbarClick(args) {
  if (args.item.id === 'exportCsv') {
    // custom handler
    console.log('Custom CSV export triggered');
  }
}
</script>
```

> **Note:** Built-in toolbar items handle their own actions automatically. You only need to listen for custom item IDs.

## Enabling/Disabling Items Programmatically

```js
const gantt = this.$refs.ganttRef.ej2Instances;

// Disable a toolbar item by its ID or built-in string
gantt.toolbarModule.enableItems(['exportCsv'], false);  // disable
gantt.toolbarModule.enableItems(['exportCsv'], true);   // enable
```
