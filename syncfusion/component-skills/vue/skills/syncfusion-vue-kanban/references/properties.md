# Kanban Properties Reference

## Table of Contents
- [Root-Level Props](#root-level-props)
- [cardSettings (CardSettingsModel)](#cardsettings-cardsettingsmodel)
- [columns (ColumnsModel)](#columns-columnsmodel)
- [dialogSettings (DialogSettingsModel)](#dialogsettings-dialogsettingsmodel)
- [sortSettings (SortSettingsModel)](#sortsettings-sortsettingsmodel)
- [swimlaneSettings (SwimlaneSettingsModel)](#swimlanesettings-swimlanesettingsmodel)
- [stackedHeaders (StackedHeadersModel)](#stackedheaders-stackedheadersmodel)
- [Enum Quick Reference](#enum-quick-reference)

---

## Root-Level Props

All props bind directly on `<ejs-kanban>`.

| Prop | Type | Default | Description |
|---|---|---|---|
| `keyField` | `string` | `null` | **Required.** Data field that maps records to columns (e.g. `"Status"`). |
| `dataSource` | `Record[] \| DataManager` | `[]` | Cards data — local array or `DataManager` for remote data. |
| `cardSettings` | `CardSettingsModel` | `{}` | Header field, content field, template, selection type. |
| `columns` | `ColumnsModel[]` | `[]` | Column definitions (also declared via `<e-columns>`). |
| `constraintType` | `ConstraintType` | `'Column'` | WIP validation scope: `'Column'` or `'Swimlane'`. |
| `cssClass` | `string` | `null` | Custom CSS class applied to the board root element. |
| `dialogSettings` | `DialogSettingsModel` | `{}` | Add/edit dialog fields and template. |
| `enableHtmlSanitizer` | `boolean` | `true` | Sanitizes data entry fields to prevent XSS. |
| `enablePersistence` | `boolean` | `false` | Persist state (columns, swimlane rows) in `localStorage`. |
| `enableRtl` | `boolean` | `false` | Render the board right-to-left. |
| `enableTooltip` | `boolean` | `false` | Show card tooltip on hover. |
| `enableVirtualization` | `boolean` | `false` | Virtual scrolling for large datasets. |
| `externalDropId` | `string[]` | `[]` | IDs of external components that accept Kanban card drops. |
| `height` | `string \| number` | `'auto'` | Board height: `'auto'`, pixel (`'550px'`), or percentage (`'100%'`). |
| `width` | `string \| number` | `'auto'` | Board width: `'auto'`, pixel, or percentage. |
| `cardHeight` | `string` | `'auto'` | Card height in pixels for virtual scrolling (e.g. `'120px'`). |
| `locale` | `string` | `''` | Override global culture string (default: `'en-US'`). |
| `query` | `Query` | `null` | External `Query` executed with data processing (filtering, searching). |
| `showEmptyColumn` | `boolean` | `false` | Show columns that have no cards in the data source. |
| `sortSettings` | `SortSettingsModel` | `{}` | Card sort field and direction. |
| `stackedHeaders` | `StackedHeadersModel[]` | `[]` | Group columns under shared header labels. |
| `swimlaneSettings` | `SwimlaneSettingsModel` | `{}` | Row-grouping configuration. |
| `tooltipTemplate` | `string \| Function` | `null` | Custom tooltip template. Requires `enableTooltip: true`. |
| `allowDragAndDrop` | `boolean` | `true` | Enable/disable card drag-and-drop globally. |
| `allowColumnDragAndDrop` | `boolean` | `false` | Enable/disable column header reordering by drag. |
| `allowKeyboard` | `boolean` | `true` | Enable/disable keyboard interaction. |

---

## cardSettings (CardSettingsModel)

Bind via `:cardSettings="cardSettings"` where `cardSettings` is a plain object.

| Property | Type | Description |
|---|---|---|
| `headerField` | `string` | **Required.** Unique ID field — rendered as card header. |
| `contentField` | `string` | Field rendered as card body text. |
| `template` | `string \| Function` | Custom card template (Vue component via `createApp`). |
| `showHeader` | `boolean` | Show (`true`) or hide (`false`) the card header. Default: `true`. |
| `selectionType` | `SelectionType` | `'None'`, `'Single'` (default), or `'Multiple'`. |
| `priority` | `string` | Numeric field used for rank-based drag-and-drop ordering. |
| `tagsField` | `string` | Field rendered as card label tags. |
| `grabberField` | `string` | Field that controls the grabber/color stripe on the card. |
| `footerCssField` | `string` | Field used to apply CSS class to the card footer icons. |

**Example:**

```js
const cardSettings = {
  headerField: 'Id',
  contentField: 'Summary',
  selectionType: 'Multiple',
  showHeader: true,
  priority: 'RankId'   // optional: enables rank-based ordering
};
```

---

## columns (ColumnsModel)

Each `<e-column>` directive maps to a `ColumnsModel` entry.

| Property | Type | Default | Description |
|---|---|---|---|
| `keyField` | `string \| number` | — | Column key(s). String supports comma-separated multiple keys. |
| `headerText` | `string` | — | Column header label. |
| `template` | `string \| Function` | — | Custom column header template. |
| `allowDrag` | `boolean` | — | Allow dragging cards out of this column. |
| `allowDrop` | `boolean` | — | Allow dropping cards into this column. |
| `allowToggle` | `boolean` | `false` | Show expand/collapse toggle icon in column header. |
| `isExpanded` | `boolean` | `true` | Initial expanded (`true`) or collapsed (`false`) state. |
| `showItemCount` | `boolean` | `true` | Show card count badge in column header. |
| `showAddButton` | `boolean` | `false` | Show an "Add" button at the bottom of the column. |
| `minCount` | `number` | — | Minimum card count; column highlights if count falls below. |
| `maxCount` | `number` | — | Maximum card count; column highlights if count exceeds. |
| `transitionColumns` | `string[]` | — | Allowed column keys a card can move to from this column. |

**Template example:**

```vue
<e-column headerText="In Progress" keyField="InProgress"
  :allowToggle="true" :isExpanded="false" :maxCount="5">
</e-column>
```

---

## dialogSettings (DialogSettingsModel)

| Property | Type | Description |
|---|---|---|
| `fields` | `DialogFieldsModel[]` | Array of field definitions for the add/edit dialog. |
| `template` | `string \| Function` | Full custom dialog template (replaces default field list). |
| `model` | `KanbanDialogModel` | EJ2 Dialog model config (size, position, animation, etc.). |

**DialogFieldsModel properties:**

| Property | Type | Description |
|---|---|---|
| `key` | `string` | Data field name. |
| `type` | `string` | `'Input'`, `'TextBox'`, `'TextArea'`, `'Numeric'`, `'DropDown'`, `'String'` |
| `text` | `string` | Label text shown in the dialog. |
| `validationRules` | `object` | Validation rules object (e.g. `{ required: true, range: [1,100] }`). |

---

## sortSettings (SortSettingsModel)

| Property | Type | Description |
|---|---|---|
| `sortBy` | `SortOrderBy` | `'DataSourceOrder'`, `'Index'` (default), or `'Custom'`. |
| `field` | `string` | The data field to sort by (numeric for `'Index'`, any field for `'Custom'`). |
| `direction` | `SortDirection` | `'Ascending'` (default) or `'Descending'`. |

---

## swimlaneSettings (SwimlaneSettingsModel)

| Property | Type | Description |
|---|---|---|
| `keyField` | `string` | Data field that groups cards into swimlane rows. |
| `textField` | `string` | Field used as the swimlane row label. |
| `template` | `string \| Function` | Custom swimlane header row template. |
| `allowDragAndDrop` | `boolean` | Allow card drag across swimlane rows. Default: `false`. |
| `showEmptyRow` | `boolean` | Show swimlane rows with no cards. Default: `false`. |
| `showItemCount` | `boolean` | Show card count badge in swimlane header. Default: `true`. |
| `showUnassignedRow` | `boolean` | Show a row for cards with no swimlane key value. |
| `enableFrozenRows` | `boolean` | Freeze swimlane row headers while scrolling vertically. |
| `sortDirection` | `SortDirection` | Sort swimlane rows `'Ascending'` or `'Descending'`. |
| `sortComparer` | `SortComparerFunction` | Custom sort function for swimlane rows. |

---

## stackedHeaders (StackedHeadersModel)

Use `<e-stacked-headers>` + `<e-stacked-header>` directives, or bind `:stackedHeaders="stackedHeaders"`.

| Property | Type | Description |
|---|---|---|
| `text` | `string` | Header label displayed above the grouped columns. |
| `keyFields` | `string` | Comma-separated column `keyField` values covered by this stacked header. |

**Example:**

```js
const stackedHeaders = [
  { text: 'Active Stages', keyFields: 'InProgress,Testing' }
];
```

---

## Enum Quick Reference

### SelectionType
| Value | Behaviour |
|---|---|
| `'None'` | No card selection allowed. |
| `'Single'` | One card at a time (default). |
| `'Multiple'` | Ctrl+click / Shift+click for multi-select. |

### ConstraintType
| Value | Behaviour |
|---|---|
| `'Column'` | WIP min/max validated per column (default). |
| `'Swimlane'` | WIP min/max validated per swimlane cell. |

### SortOrderBy
| Value | Behaviour |
|---|---|
| `'Index'` | Sort by a numeric rank field. |
| `'DataSourceOrder'` | Preserve original data source order. |
| `'Custom'` | Sort by any specified field. |

### SortDirection
| Value |
|---|
| `'Ascending'` |
| `'Descending'` |
