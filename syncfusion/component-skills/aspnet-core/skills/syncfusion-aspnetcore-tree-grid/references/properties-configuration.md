# Properties & Configuration — Syncfusion ASP.NET Core TreeGrid

## Table of Contents
- [Data Configuration](#data-configuration)
- [Data Binding & Mapping](#data-binding--mapping)
- [UI Layout & Dimensions](#ui-layout--dimensions)
- [Grid Appearance & Visual](#grid-appearance--visual)
- [Column Configuration](#column-configuration)
- [Feature Toggles & Activation](#feature-toggles--activation)
- [Templates & Custom Rendering](#templates--custom-rendering)
- [Performance & Behavior](#performance--behavior)
- [Selection & Interaction](#selection--interaction)
- [Export & Formatting](#export--formatting)
- [Accessibility & Behavior](#accessibility--behavior)

> **When to Use:** Master reference for 145+ TreeGrid properties. Lookup property behavior, configure features, understand templates, or optimize performance.

---

## Data Configuration

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `dataSource` | IEnumerable/DataManager | null | Bind data; accepts List<T>, DataManager, or JSON array |
| `childMapping` | string | null | **Nested data:** Property name containing child records. Do NOT use with `idMapping` |
| `idMapping` | string | null | **Flat data:** Unique record identifier. Use with `parentIdMapping` |
| `parentIdMapping` | string | null | **Flat data:** Parent record reference. Use with `idMapping` |
| `hasChildMapping` | string | null | **Remote data:** Property indicating record has children (for expand icon) |
| `expandStateMapping` | string | null | **Initial state:** Property (bool) controlling parent collapse/expand on load |
| `loadChildOnDemand` | bool | true | **Remote:** Only load children when parent expands (false=load all) |

**Example:**
```cshtml
<!-- Nested -->
<ejs-treegrid dataSource="@data" childMapping="Children" treeColumnIndex="1"></ejs-treegrid>

<!-- Flat -->
<ejs-treegrid dataSource="@data" idMapping="TaskId" parentIdMapping="ParentId" treeColumnIndex="1"></ejs-treegrid>

<!-- Expand state -->
<ejs-treegrid dataSource="@data" childMapping="Children" expandStateMapping="IsExpanded"></ejs-treegrid>
```

---

## Data Binding & Mapping

| Property | Type | Default | Impact |
|----------|------|---------|---------|
| `query` | Query object | null | OData query for DataManager binding |
| `locale` | string | "en-US" | Localization code (affects formatting, ARIA labels) |
| `htmlAttributes` | Dictionary | empty | DOM attributes on grid container |

**Example:**
```cshtml
<!-- DataManager with OData -->
<ejs-treegrid dataSource="@(new DataManager { Url = "/api/data", Adaptor = "ODataAdaptor" })">
</ejs-treegrid>

<!-- Localization -->
<ejs-treegrid locale="ar"></ejs-treegrid>
```

---

## UI Layout & Dimensions

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `height` | string/int | "auto" | Scrollable height (px, %, or "auto") |
| `width` | string/int | "auto" | Grid width (px, %, or "auto") |
| `rowHeight` | double | NaN | Fixed row pixel height; NaN=auto-fit |
| `treeColumnIndex` | int | 0 | Column index (0-based) showing expand/collapse arrows |
| `columnSpacing` | double | 0 | Space between columns in virtual mode |

**Example:**
```cshtml
<ejs-treegrid height="500px" width="100%" rowHeight="35" treeColumnIndex="1"></ejs-treegrid>

<!-- Responsive sizing -->
<ejs-treegrid height="400" width="80%"></ejs-treegrid>
```

---

## Grid Appearance & Visual

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `gridLines` | GridLine | Default | Horizontal/vertical line visibility (All, Horizontal, Vertical, None) |
| `enableAltRow` | bool | true | Alternate row background color |
| `enableRtl` | bool | false | Right-to-left layout (Arabic, Hebrew) |
| `enableHover` | bool | false | Highlight row on mouse hover |
| `clipMode` | ClipMode | Ellipsis | Text overflow (Clip, Ellipsis, EllipsisWithTooltip) |
| `allowTextWrap` | bool | false | Wrap text to next line in cells |

---

## Grid Appearance & Visual

| Property | Type | Default | Values/Impact |
|----------|------|---------|---------|
| `gridLines` | GridLine | Default | **All**, Horizontal, Vertical, None |
| `enableAltRow` | bool | true | Alternate row background coloring |
| `enableRtl` | bool | false | Right-to-left layout (Arabic, Hebrew, Urdu) |
| `enableHover` | bool | false | Highlight row on mouse hover |
| `clipMode` | ClipMode | Ellipsis | Clip, Ellipsis, **EllipsisWithTooltip** |
| `allowTextWrap` | bool | false | Wrap text across lines in cells |
| `enableAdaptiveUI` | bool | false | Mobile/touch-optimized layout |
| `enableStickyHeader` | bool | false | Header stays visible on scroll |
| `enableCollapseAll` | bool | false | Collapse/expand all button in toolbar |
| `enableColumnSpan` | bool | false | Allow column spanning |
| `enableRowSpan` | bool | false | Allow row spanning |

---

## Column Configuration

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `columns` | TreeGridColumn[] | null | Column array; auto-generate if omitted |
| `columnChooserSettings` | ColumnChooserSettings | {} | Configure show/hide columns dialog |
| `columnMenuItems` | string[] | null | Custom column menu options |
| `contextMenuItems` | string[] | null | Row context menu items |
| `columnQueryMode` | ColumnQueryMode | "All" | Data retrieval scope: All, Schema, ExcludeHidden |
| `textWrapSettings` | TextWrapSettings | {} | Text wrap configuration |
| `showColumnChooser` | bool | false | Enable column visibility toggle |
| `showColumnMenu` | bool | false | Enable column header menu |
| `frozenColumns` | int | 0 | Number of columns to freeze from left |
| `frozenRows` | int | 0 | Number of rows to freeze from top |

---

## Feature Toggles & Activation

| Feature | Key Properties | Default | Enable When |
|---------|---|---------|-------------|
| **Paging** | `allowPaging`, `pageSettings` | false | Large datasets (100+ rows) |
| **Sorting** | `allowSorting`, `sortSettings`, `allowMultiSorting` | false, true | Need user-driven ordering |
| **Filtering** | `allowFiltering`, `filterSettings` | false | Need data filtering UI |
| **Editing** | `editSettings`, `isPrimaryKey` (column) | false | Need CRUD operations |
| **Excel Export** | `allowExcelExport` | false | Download .xlsx |
| **PDF Export** | `allowPdfExport` | false | Download .pdf |
| **Selection** | `allowSelection`, `selectionSettings` | true | Row/cell selection needed |
| **Row Drag-Drop** | `allowRowDragAndDrop`, `rowDropSettings` | false | Reorder rows |
| **Column Reorder** | `allowReordering` | false | User-configurable column order |
| **Column Resize** | `allowResizing` | false | User-configurable column width |
| **Column Chooser** | `showColumnChooser` | false | Show/hide columns dynamically |
| **Column Menu** | `showColumnMenu` | false | Per-column sort/filter/resize |
| **Searching** | `allowSearching`, `toolbar` | true | Global row/cell search |

---

## Templates & Custom Rendering

| Property | Type | Purpose | Triggers When |
|----------|------|---------|---------|
| `rowTemplate` | string | Custom row HTML structure | Every row renders |
| `detailTemplate` | string | Expandable detail row content | User clicks expand arrow |
| `emptyRecordTemplate` | string | Placeholder when no data | dataSource is empty/null |
| `pagerTemplate` | string | Custom pagination control | allowPaging=true |
| `toolbar` | string[] | Toolbar button definitions | Grid initializes |
| `columnMenuItems` | string[] | Column header menu options | showColumnMenu=true |
| `contextMenuItems` | string[] | Row right-click menu | Right-click on row |

---

## Performance & Behavior

| Property | Type | Default | Impact |
|----------|------|---------|---------|
| `enableVirtualization` | bool | false | Render only visible rows (1000+ rows) |
| `enableColumnVirtualization` | bool | false | Render only visible columns (100+ columns) |
| `enableInfiniteScrolling` | bool | false | Load more rows as user scrolls |
| `infiniteScrollSettings` | InfiniteScrollSettings | {} | Scroll threshold and blocks |
| `enableImmutableMode` | bool | false | Reuse DOM for updates (speed) |
| `enablePersistence` | bool | false | Save state to localStorage |
| `enableVirtualMaskRow` | bool | true | Shimmer loading effect |
| `isRowSelectable` | Func | null | Callback to enable/disable selection |
| `loadingIndicator` | LoadingIndicator | {} | Customize loading spinner |

---

## Selection & Interaction

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowSelection` | bool | true | Enable row/cell selection |
| `selectionSettings` | SelectionSettings | {} | Selection mode, type, checkbox config |
| `selectedRowIndex` | int | -1 | Initially selected row index |
| `allowRowDragAndDrop` | bool | false | Allow row reordering via drag |
| `rowDropSettings` | RowDropSettings | {} | Drop target configuration |

---

## Export & Formatting

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowExcelExport` | bool | false | Enable Excel export capability |
| `allowPdfExport` | bool | false | Enable PDF export capability |
| `excelExportProperties` | ExcelExportProperties | {} | Excel export customization |
| `pdfExportProperties` | PdfExportProperties | {} | PDF export customization |
| `allowPrinting` | bool | true | Enable print functionality |

---

## Accessibility & Behavior

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `enableRtl` | bool | false | Right-to-left layout |
| `locale` | string | "en-US" | Language/locale code |
| `autoCheckHierarchy` | bool | true | Auto-check child rows when parent checked |
| `expandAllOnLoad` | bool | false | Expand all rows on initialization |
