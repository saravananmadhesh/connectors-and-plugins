# API Reference – Angular MultiColumn ComboBox

**Package:** `@syncfusion/ej2-angular-multicolumn-combobox`  
**Official Docs:** https://ej2.syncfusion.com/angular/documentation/api/multicolumn-combobox/

---

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [ColumnModel](#columnmodel)
- [GridSettingsModel](#gridsettingsmodel)
- [FieldSettingsModel](#fieldsettingsmodel)

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `actionFailureTemplate` | `string \| Object` | `'Request failed'` | Template content for when the remote data request fails |
| `allowFiltering` | `boolean` | `true` | Enables or disables item filtering by typing in the input |
| `allowSorting` | `boolean` | `true` | Enables or disables column header click-to-sort |
| `columns` | `ColumnModel[]` | `[]` | Array of column configuration objects |
| `cssClass` | `string` | `''` | Custom CSS class applied to the root element |
| `dataSource` | `Object[] \| DataManager \| string[] \| number[]` | `[]` | Data source for the dropdown list |
| `disabled` | `boolean` | `false` | When `true`, disables the component entirely |
| `enablePersistence` | `boolean` | `false` | Persists component state (value) between page reloads |
| `enableRtl` | `boolean` | `false` | Renders the component in right-to-left direction |
| `enableVirtualization` | `boolean` | `false` | Enables UI virtualization for large data rendering performance |
| `fields` | `FieldSettingsModel` | `{ text: null, value: null, groupBy: null }` | Maps data fields to text, value, and groupBy |
| `filterType` | `FilterType` | `'StartsWith'` | Filter match mode: `'StartsWith'`, `'EndsWith'`, `'Contains'` |
| `floatLabelType` | `FloatLabelType` | `'Never'` | Placeholder float behavior: `'Never'`, `'Always'`, `'Auto'` |
| `footerTemplate` | `string \| Object` | `null` | Template for the popup footer section |
| `gridSettings` | `GridSettingsModel` | `{}` | Grid appearance settings (row height, grid lines, alt row) |
| `groupTemplate` | `string \| Object` | `null` | Template for group header rows |
| `htmlAttributes` | `{ [key: string]: string }` | `{}` | Additional HTML attributes for the input element |
| `index` | `number` | `null` | Index of the item to pre-select (0-based) |
| `itemTemplate` | `string \| Object` | `null` | Template for each row in the popup list |
| `locale` | `string` | `'en-US'` | BCP 47 locale tag for component text translations |
| `noRecordsTemplate` | `string \| Object` | `'No records found'` | Template shown when no items match the filter |
| `placeholder` | `string` | `null` | Placeholder text for the input when empty |
| `popupHeight` | `string \| number` | `'300px'` | Height of the popup dropdown |
| `popupWidth` | `string \| number` | `'100%'` | Width of the popup dropdown |
| `query` | `Query` | `null` | `ej2-data` Query to filter/transform data from the source |
| `readonly` | `boolean` | `false` | When `true`, input is read-only (value cannot be changed) |
| `showClearButton` | `boolean` | `false` | Shows an × button to clear the current selection |
| `sortOrder` | `SortOrder` | `'None'` | Sort direction applied on open: `'None'`, `'Ascending'`, `'Descending'` |
| `sortType` | `SortType` | `'OneColumn'` | Sort column limit: `'OneColumn'` or `'MultipleColumns'` |
| `text` | `string` | `null` | Pre-selects the item matching this display text |
| `value` | `string \| number \| boolean` | `null` | Pre-selects the item matching this value |
| `width` | `string \| number` | `'100%'` | Width of the component input element |

---

## Methods

### `addItems(items, itemIndex?)`
Adds new items to the data source at the specified index.

| Parameter | Type | Description |
|-----------|------|-------------|
| `items` | `Object[]` | Array of data objects to add |
| `itemIndex` | `number` (optional) | Index at which to insert items |

```typescript
@ViewChild('multicolumn') combo!: MultiColumnComboBoxComponent;

this.combo.addItems([{ EmpID: 1010, Name: 'New Employee' }]);
// Insert at index 0:
this.combo.addItems([{ EmpID: 1011, Name: 'Another Employee' }], 0);
```

---

### `focusIn(e?)`
Sets focus to the component input.

| Parameter | Type | Description |
|-----------|------|-------------|
| `e` | `MouseEvent` (optional) | Mouse event |

```typescript
this.combo.focusIn();
```

---

### `focusOut(e?)`
Removes focus from the component input.

| Parameter | Type | Description |
|-----------|------|-------------|
| `e` | `MouseEvent` (optional) | Mouse event |

```typescript
this.combo.focusOut();
```

---

### `getDataByValue(value)`
Returns the data object matching the given value.

| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | `string \| number \| boolean` | The value field to look up |

**Returns:** `Object | null`

```typescript
const data = this.combo.getDataByValue(1001);
console.log(data); // { EmpID: 1001, Name: 'Andrew Fuller', ... }
```

---

### `getItems()`
Returns all rendered list item elements from the popup.

**Returns:** `Element[]`

```typescript
const items = this.combo.getItems();
console.log(items.length); // number of rendered popup rows
```

---

### `hidePopup(e?)`
Closes the popup programmatically.

| Parameter | Type | Description |
|-----------|------|-------------|
| `e` | `MouseEvent` (optional) | Mouse event |

```typescript
this.combo.hidePopup();
```

---

### `showPopup(e?, isInputOpen?)`
Opens the popup programmatically.

| Parameter | Type | Description |
|-----------|------|-------------|
| `e` | `MouseEvent` (optional) | Mouse event |
| `isInputOpen` | `boolean` (optional) | Whether to open the input |

```typescript
this.combo.showPopup();
```

---

## Events

| Event | Argument Type | Trigger |
|-------|--------------|---------|
| `actionBegin` | `Object` | Fires before a data action (sort/filter/group) begins |
| `actionComplete` | `Object` | Fires after a data action completes |
| `actionFailure` | `Object` | Fires when a remote data request fails |
| `change` | `ChangeEventArgs` | Fires when the selected value changes |
| `close` | `PopupEventArgs` | Fires when the popup closes |
| `created` | — | Fires after the component is created and rendered |
| `filtering` | `FilteringEventArgs` | Fires when user types to filter items |
| `open` | `PopupEventArgs` | Fires when the popup opens |
| `select` | `SelectEventArgs` | Fires when an item is selected from the popup |

### Event Argument Types

**`ChangeEventArgs`** (from `@syncfusion/ej2-multicolumn-combobox`)
| Property | Type | Description |
|----------|------|-------------|
| `value` | `string \| number \| boolean` | The new selected value |
| `previousValue` | `string \| number \| boolean` | The previous value |
| `itemData` | `Object` | The full data object of selected item |
| `item` | `HTMLLIElement` | The selected list item element |
| `isInteracted` | `boolean` | `true` if triggered by user interaction |
| `e` | `Event` | The original browser event |

**`SelectEventArgs`** (from `@syncfusion/ej2-multicolumn-combobox`)
| Property | Type | Description |
|----------|------|-------------|
| `item` | `HTMLLIElement` | The selected list item element |
| `itemData` | `Object` | The full data object of selected item |
| `e` | `Event` | The original browser event |
| `cancel` | `boolean` | Set to `true` to cancel the selection |

**`FilteringEventArgs`** (from `@syncfusion/ej2-multicolumn-combobox`)
| Property | Type | Description |
|----------|------|-------------|
| `text` | `string` | The current filter text typed by user |
| `updateData` | `(dataSource, query?, fields?) => void` | Call this to update filtered results |
| `cancel` | `boolean` | Set to `true` to cancel default filtering |

**`PopupEventArgs`** (from `@syncfusion/ej2-multicolumn-combobox`)
| Property | Type | Description |
|----------|------|-------------|
| `popup` | `Popup` | The popup instance |
| `cancel` | `boolean` | Set to `true` to cancel open/close |

---

## ColumnModel

Configure each column via `<e-column>` directive or `columns` property array.

**Official Docs:** https://ej2.syncfusion.com/angular/documentation/api/multicolumn-combobox/columnmodel

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `field` | `string` | — | **Required.** Data field name from the data source |
| `header` | `string` | `''` | Column header display text |
| `width` | `string \| number` | — | Column width (e.g., `'100'`, `100`, `'10%'`) |
| `textAlign` | `TextAlign` | `'Left'` | Text alignment: `'Left'`, `'Center'`, `'Right'`, `'Justify'` |
| `template` | `string \| Object` | — | Custom row cell template for this column |
| `headerTemplate` | `string \| Object` | — | Custom header cell template (`ng-template #headerTemplate let-data`) |
| `format` | `string \| NumberFormatOptions \| DateFormatOptions` | — | Format pattern for numeric/date values (e.g., `'n2'`, `'yMd'`) |
| `displayAsCheckBox` | `boolean` | `false` | Render boolean values as checkboxes |
| `customAttributes` | `Object` | — | Custom HTML attributes for the column cells |

### Column Examples

```html
<!-- Basic column -->
<e-column field='Name' header='Employee Name' width='120'></e-column>

<!-- Centered text -->
<e-column field='EmpID' header='ID' width='80' textAlign='Center'></e-column>

<!-- Number format -->
<e-column field='Salary' header='Salary' width='100' format='C2'></e-column>

<!-- Date format -->
<e-column field='JoinDate' header='Joined' width='120' format='yMd'></e-column>

<!-- Boolean as checkbox -->
<e-column field='IsActive' header='Active' width='80' [displayAsCheckBox]='true'></e-column>

<!-- Custom cell template -->
<e-column field='Status' header='Status' width='100'>
  <ng-template #template let-data>
    <span [class]="'badge badge-' + data.Status">{{ data.Status }}</span>
  </ng-template>
</e-column>

<!-- Custom header template -->
<e-column field='Name' width='120'>
  <ng-template #headerTemplate let-data>
    <b>Full Name</b>
  </ng-template>
</e-column>
```

---

## GridSettingsModel

Controls the appearance of the popup grid.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `gridLines` | `GridLine` | `'Default'` | Grid line style: `'Default'`, `'Horizontal'`, `'Vertical'`, `'Both'`, `'None'` |
| `rowHeight` | `number` | `null` | Row height in pixels (e.g., `40`) |
| `enableAltRow` | `boolean` | `false` | Enables alternating row background colors |

```typescript
public gridSettings: Object = {
  gridLines: 'Both',
  rowHeight: 40,
  enableAltRow: true
};
```

```html
<ejs-multicolumncombobox [gridSettings]='gridSettings' ...>
```

---

## FieldSettingsModel

Maps data source fields to component roles.

| Property | Type | Description |
|----------|------|-------------|
| `text` | `string` | Field name for the display text shown in the input after selection |
| `value` | `string` | Field name for the underlying selected value |
| `groupBy` | `string` | Field name used to group items in the popup |

```typescript
public fields: Object = {
  text: 'Name',       // shown in input after selection
  value: 'EmpID',     // value bound to (change) event
  groupBy: 'Country'  // groups popup rows by this field
};
```
