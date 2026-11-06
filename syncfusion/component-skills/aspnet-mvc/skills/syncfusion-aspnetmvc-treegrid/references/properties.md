# Properties

## Table of Contents
- [Overview](#overview)
- [Core Data Properties](#core-data-properties)
- [Feature Enable/Disable Properties](#feature-enabledisable-properties)
- [Column Properties](#column-properties)
- [Selection Properties](#selection-properties)
- [Editing Properties](#editing-properties)
- [Feature Settings Properties](#feature-settings-properties)
- [Appearance Properties](#appearance-properties)
- [Common Property Patterns](#common-property-patterns)

---

## Overview

TreeGrid properties control data binding, feature enablement, and component behavior. Properties are set in the tag helper or configured through settings objects.

**Property Categories:**
- Data binding (dataSource, childMapping, idMapping)
- Feature flags (allowSorting, allowFiltering, allowPaging)
- Settings objects (sortSettings, filterSettings, pageSettings)
- Column definitions (columns with field, headerText, type, format)
- Selection/Editing (selectionSettings, editSettings)

---

## Core Data Properties

### DataSource
**Type:** `IEnumerable<T>` or `DataManager`  
**Purpose:** Provides data to display in TreeGrid

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="ViewBag.DataSource">
</ejs-treegrid>
```

### ChildMapping
**Type:** `string`  
**Default:** `"Children"`  
**Purpose:** Field name for child records hierarchy

```cshtml
<ejs-treegrid childMapping="SubTasks">
</ejs-treegrid>
```

### IdMapping
**Type:** `string`  
**Purpose:** Field for unique row identity (used in self-referential data)

```cshtml
<ejs-treegrid idMapping="TaskID">
</ejs-treegrid>
```

**⚠️ Critical:** Don't use both `childMapping` and `idMapping` simultaneously.

### ParentIdMapping
**Type:** `string`  
**Purpose:** Field mapping for parent ID in self-referential structure

```cshtml
<ejs-treegrid idMapping="TaskID" parentIdMapping="ParentID">
</ejs-treegrid>
```

### TreeColumnIndex
**Type:** `int`  
**Default:** `0`  
**Purpose:** Column index where hierarchy expand/collapse icons appear

```cshtml
<ejs-treegrid treeColumnIndex="1">
</ejs-treegrid>
```

---

## Feature Enable/Disable Properties

| Property | Type | Purpose |
|----------|------|---------|
| `AllowSorting` | `bool` | Enable/disable column sorting |
| `AllowFiltering` | `bool` | Enable/disable filtering |
| `AllowPaging` | `bool` | Enable/disable pagination |
| `AllowSelection` | `bool` | Enable/disable row selection |
| `AllowExcelExport` | `bool` | Enable Excel export |
| `AllowPdfExport` | `bool` | Enable PDF export |
| `AllowPrinting` | `bool` | Enable print functionality |
| `AllowRowDragAndDrop` | `bool` | Enable row drag-drop |
| `AllowReordering` | `bool` | Enable column reordering |
| `AllowResizing` | `bool` | Enable column resizing |
| `AllowSearch` | `bool` | Enable search functionality |
| `EnableVirtualization` | `bool` | Enable virtual scrolling |
| `EnableInfiniteScrolling` | `bool` | Enable infinite scroll |
| `EnableImmutableMode` | `bool` | Enable immutable mode for performance |
| `EnableAutoFocus` | `bool` | Auto-focus on edit cell |
| `EnableCollapseAll` | `bool` | Collapse all rows on load |
| `AllowTextWrap` | `bool` | Enable text wrapping |

## Column Properties

Define columns using `<e-treegrid-column>` tag helper with these properties:

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `Field` | `string` | Data field mapping | `field="TaskName"` |
| `HeaderText` | `string` | Column header label | `headerText="Task"` |
| `Type` | `string` | Data type (number, date, string, boolean) | `type="number"` |
| `Width` | `string` | Column width | `width="150"` or `width="20%"` |
| `TextAlign` | `TextAlign` | Text alignment (Left, Center, Right) | `textAlign="Right"` |
| `Format` | `string` | Number/date format | `format="C2"` (currency), `format="yMd"` (date) |
| `IsIdentity` | `bool` | Primary key column | `isIdentity="true"` |
| `IsFrozen` | `bool` | Freeze column | `isFrozen="true"` |
| `AllowGrouping` | `bool` | Allow column grouping | `allowGrouping="true"` |
| `AllowSorting` | `bool` | Allow sorting on column | `allowSorting="true"` |
| `AllowFiltering` | `bool` | Allow filtering on column | `allowFiltering="true"` |
| `AllowReordering` | `bool` | Allow reordering | `allowReordering="true"` |
| `AllowResizing` | `bool` | Allow column resize | `allowResizing="true"` |
| `AllowSearching` | `bool` | Include in search | `allowSearching="true"` |
| `ShowColumnMenu` | `bool` | Show column menu | `showColumnMenu="true"` |
| `Template` | `string` | Custom cell template | HTML template |
| `HeaderTemplate` | `string` | Custom header template | HTML template |
| `FilterTemplate` | `string` | Custom filter template | HTML template |
| `EditTemplate` | `string` | Custom edit template | HTML template |
| `DisplayAsCheckBox` | `bool` | Render as checkbox | `displayAsCheckBox="true"` |
| `EditType` | `EditType` | Edit control type (TextBox, Dropdown, NumericTextBox, DatePicker) | `editType="Dropdown"` |
| `ValidationRules` | `object` | Edit validation | `new { required=true }` |

**Example:**
```cshtml
<e-treegrid-column field="TaskID" headerText="ID" width="100" type="number" isIdentity="true"></e-treegrid-column>
<e-treegrid-column field="Budget" headerText="Budget" width="120" type="number" format="C2" textAlign="Right"></e-treegrid-column>
<e-treegrid-column field="StartDate" headerText="Start" width="130" type="date" format="yMd"></e-treegrid-column>
```

---

## Selection Properties

### SelectionSettings
Controls row and cell selection behavior:

| Property | Values | Purpose |
|----------|--------|---------|
| `Type` | Single, Multiple, None | Selection mode |
| `Mode` | Row, Cell, Both | Select row or cell |
| `CheckboxOnly` | true/false | Select only via checkbox |
| `EnableSimpleMultiRowSelection` | true/false | Multi-select without Ctrl key |

---

## Editing Properties

### EditSettings
Control edit mode and options:

| Property | Type | Purpose |
|----------|------|---------|
| `AllowEditing` | `bool` | Enable editing |
| `AllowAdding` | `bool` | Enable adding rows |
| `AllowDeleting` | `bool` | Enable deleting rows |
| `Mode` | Cell, Row, Dialog, Batch | Edit mode |
| `AllowEditOnDblClick` | `bool` | Edit on double-click |
| `AllowDeleteOnFormSubmit` | `bool` | Delete with form submit |

## Appearance Properties

| Property | Type | Purpose | Example |
|----------|------|---------|---------|
| `CssClass` | `string` | Custom CSS class | `cssClass="custom-grid"` |
| `Height` | `string` | Grid height | `height="500px"` or `height="100%"` |
| `Width` | `string` | Grid width | `width="100%"` |
| `RowHeight` | `int` | Default row height | `rowHeight="36"` |
| `GridLines` | `GridLine` | Grid line display | `gridLines="Both"` |
| `ColumnType` | `string` | Header type | `columnType="Header"` |
| `Locale` | `string` | Language locale | `locale="de-DE"` |
| `EnableRtl` | `bool` | Right-to-left | `enableRtl="true"` |
