# Layout and Splitter

## Table of Contents
- [Gantt Layout Overview](#gantt-layout-overview)
- [Splitter Settings](#splitter-settings)
- [Loading Animation](#loading-animation)
- [State Persistence](#state-persistence)
  - [Get / set persisted state manually](#get--set-persisted-state-manually)
  - [Prevent specific properties from persisting](#prevent-specific-properties-from-persisting)
  - [Restore header templates and headerText](#restore-header-templates-and-headertext)
- [Global and Local Scope](#global-and-local-scope)
- [RTL Support](#rtl-support)

## Gantt Layout Overview

The Gantt chart has two panels side-by-side:
- **Left panel** — grid (columns, rows)
- **Right panel** — chart (taskbars, timeline)

A draggable splitter divides them. The chart height fills its parent container (controlled by the `height` prop).

## Splitter Settings

Configure the initial position of the splitter and its orientation constraints:

```vue
<ejs-gantt :splitterSettings="splitterSettings" height="450px" ...></ejs-gantt>

<script setup>
const splitterSettings = {
  position: '35%',         // initial split position — percentage string or pixel number
  minimum: '20%',          // minimum width of the left (grid) panel
  columnIndex: 3,          // alternatively, set split position by column index
  view: 'Default'          // 'Default' | 'Grid' | 'Chart'
};
</script>
```

### `view` options

| Value | Description |
|---|---|
| `'Default'` | Show both grid and chart panels (default) |
| `'Grid'` | Show only the grid panel (hide chart) |
| `'Chart'` | Show only the chart panel (hide grid) |

### Using `columnIndex` instead of `position`

```js
const splitterSettings = {
  columnIndex: 2    // splitter appears after the 3rd column (0-indexed)
};
```

### Programmatic splitter control

```js
const gantt = this.$refs.ganttRef.ej2Instances;
gantt.setSplitterPosition('50%', 'position');           // set by percentage
gantt.setSplitterPosition(3,     'columnIndex');        // set by column index
```

## Loading Animation

The Gantt supports two built-in loading indicator types: **Shimmer** (skeleton rows) and **Spinner** (circular overlay). Configure via `loadingIndicator`.

```vue
<ejs-gantt
  :loadingIndicator="loadingIndicator"
  :dataSource="dataManager"
  :taskFields="taskFields"
  height="450px"
></ejs-gantt>

<script setup>
// Shimmer — displays skeleton placeholder rows while data loads
const loadingIndicator = { indicatorType: 'Shimmer' };

// Spinner — displays a circular spinner overlay (default)
// const loadingIndicator = { indicatorType: 'Spinner' };
</script>
```

### indicatorType options

| Value | Behaviour |
|---|---|
| `'Shimmer'` | Renders animated skeleton placeholder rows — recommended for remote data |
| `'Spinner'` | Renders a circular spinner overlay — the default behaviour |

### Shimmer with Virtual Scrolling

When `enableVirtualization` is enabled alongside Shimmer, the skeleton rows match the virtual viewport height:

```vue
<ejs-gantt
  :loadingIndicator="{ indicatorType: 'Shimmer' }"
  :enableVirtualization="true"
  height="450px"
  ...
></ejs-gantt>
```

> Use Shimmer with remote DataManager sources for the best perceived performance. For local data that loads instantly, Spinner or no indicator is sufficient.

### Programmatic spinner control

```js
const gantt = this.$refs.ganttRef.ej2Instances;

// Show the spinner overlay manually
gantt.showSpinner();

// Hide the spinner overlay manually
gantt.hideSpinner();
```

## State Persistence

Persist user preferences (sort, filter, column widths, splitter position, etc.) to `localStorage` across page reloads:

```vue
<ejs-gantt :enablePersistence="true" id="persistedGantt" ...></ejs-gantt>
```

> **Important:** `id` is **required** when `enablePersistence: true`. The state is stored under the key `gantt` + component `id` (e.g. `'ganttGantt'` for `id="Gantt"`).

### What is persisted

- Column widths and order
- Splitter position
- Sort settings
- Filter settings
- Zoom level (timeline)
- Selected rows

### What does NOT persist

- Column template
- Header text
- Header template
- Column formatter
- Value accessor

### Get / set persisted state manually

```js
// Get the saved Gantt model from localStorage
// Key format: 'gantt' + componentId  (e.g. id="Gantt" → key "ganttGantt")
const value = window.localStorage.getItem('ganttGantt');
const model = JSON.parse(value);

// Overwrite persisted state
window.localStorage.setItem('ganttGantt', JSON.stringify(model));
```

### Clear persisted state

```js
localStorage.removeItem('ganttGantt');
location.reload();
```

### Prevent specific properties from persisting

Override `addOnPersist` in the `dataBound` event to exclude properties (e.g. `columns`):

```vue
<ejs-gantt :enablePersistence="true" id="Gantt" @dataBound="onDataBound" ...></ejs-gantt>

<script setup>
const gantt = ref(null);

function onDataBound() {
  const cloned = gantt.value.ej2Instances.addOnPersist;
  gantt.value.ej2Instances.addOnPersist = function(key) {
    key = key.filter(item => item !== 'columns');
    return cloned.call(this, key);
  };
}
</script>
```

### Restore header templates and headerText

Column templates and header text do not persist automatically. Restore them after reload using `getPersistData()` and `treeGrid.setProperties()`:

```js
function restoreColumnSettings() {
  const savedProperties = JSON.parse(gantt.value.ej2Instances.getPersistData());
  const ganttColumns = [...gantt.value.ej2Instances.ganttColumns];

  savedProperties.columns.forEach(col => {
    const source = ganttColumns.find(c => c.field === col.field);
    if (source) {
      col.headerText = source.headerText;
      col.template = source.template;
      col.headerTemplate = source.headerTemplate;
    }
  });

  gantt.value.ej2Instances.treeGrid.setProperties(savedProperties);
}
```

## Global and Local Scope

### L10n (Localization)

Set locale strings globally for all Syncfusion components:

```js
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'fr-FR': {
    gantt: {
      emptyRecord: 'Aucun enregistrement à afficher',
      id: 'ID',
      name: 'Nom',
      startDate: 'Date de début',
      endDate: 'Date de fin',
      duration: 'Durée',
      progress: 'Avancement',
      dependency: 'Dépendance',
      notes: 'Notes',
      addDialogTitle: 'Nouvelle tâche',
      editDialogTitle: 'Informations sur la tâche',
    }
  }
});
```

Then set on the component:

```vue
<ejs-gantt locale="fr-FR" ...></ejs-gantt>
```

### Currency and number formatting

```vue
<ejs-gantt :currencyCode="'EUR'" ...></ejs-gantt>
```

## RTL Support

Enable right-to-left text direction for RTL languages (Arabic, Hebrew, etc.):

```vue
<ejs-gantt :enableRtl="true" locale="ar" ...></ejs-gantt>
```

RTL affects:
- Grid column order (reversed)
- Taskbar direction (right-to-left)
- Dialog/tooltip alignment
- Toolbar item order
