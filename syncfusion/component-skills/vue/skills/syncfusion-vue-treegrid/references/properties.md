# TreeGrid Properties

## Table of Contents
- [Overview](#overview)
- [Data Properties](#data-properties)
- [Display Properties](#display-properties)
- [Feature Control Properties](#feature-control-properties)
- [Styling and Appearance Properties](#styling-and-appearance-properties)
- [Performance Optimization Properties](#performance-optimization-properties)
- [Settings Objects](#settings-objects)
- [Template Properties](#template-properties)

## Overview

The TreeGrid component exposes a comprehensive set of properties that allow you to configure and customize its behavior. Properties define how the TreeGrid handles data, renders content, enables features, and responds to user interactions.

## Data Properties

| Property | Type | Usage | Example |
|----------|------|-------|---------|
| **dataSource** | Object\|DataManager | Main data array | `[{id:1, name:'Task'}, ...]` |
| **idMapping** | string | Unique row identifier | `'taskID'` |
| **parentIdMapping** | string | Parent record reference | `'parentID'` |
| **childMapping** | string | Hierarchical children | `'children'` |
| **expandStateMapping** | string | Initial expand state | `'isExpanded'` |
| **hasChildMapping** | string | Remote data parent indicator | `'hasChild'` |

---

## Display Properties

| Property | Type | Pixels/Auto | Example |
|----------|------|-------------|---------|
| **height** | number\|string | pixels or % | `400`, `'100%'` |
| **width** | number\|string | pixels or % | `800`, `'100%'` |
| **rowHeight** | number | pixels | `32`, `48` |
| **frozenRows** | number | count | `2` |
| **frozenColumns** | number | count | `1` |
| **treeColumnIndex** | number | index | `0`, `1` |

---

## Feature Control Properties

| Feature | Property | Type | Default | Enable |
|---------|----------|------|---------|--------|
| **Paging** | `allowPaging` | boolean | false | true |
| **Filtering** | `allowFiltering` | boolean | false | true |
| **Sorting** | `allowSorting` | boolean | false | true |
| **Multi-Sort** | `allowMultiSorting` | boolean | true | (always on with sort) |
| **Selection** | `allowSelection` | boolean | true | (always on) |
| **Reordering** | `allowReordering` | boolean | false | true |
| **Resizing** | `allowResizing` | boolean | false | true |
| **Row Drag-Drop** | `allowRowDragAndDrop` | boolean | false | true |
| **Text Wrap** | `allowTextWrap` | boolean | false | true |
| **Excel Export** | `allowExcelExport` | boolean | false | true |
| **PDF Export** | `allowPdfExport` | boolean | false | true |
| **Checkbox Hierarchy** | `autoCheckHierarchy` | boolean | false | true |

---

## Styling and Appearance Properties

| Property | Type | Options | Purpose |
|----------|------|---------|---------|
| **enableRtl** | boolean | true\|false | Right-to-left rendering |
| **enableAdaptiveUI** | boolean | true\|false | Mobile responsive UI |
| **enableAltRow** | boolean | true\|false | Alternate row colors |
| **enableHover** | boolean | true\|false | Row hover effect |
| **enableStickyHeader** | boolean | true\|false | Fixed header while scrolling |
| **enableColumnSpan** | boolean | true\|false | Merge columns with identical data |
| **enableRowSpan** | boolean | true\|false | Merge rows with identical data |
| **gridLines** | GridLine | Both, None, Horizontal, Vertical, Default | Line visibility |
| **clipMode** | ClipMode | Ellipsis, Clip | Text overflow handling |

---

## Performance Optimization Properties

| Property | Type | Purpose | Use When |
|----------|------|---------|----------|
| **enableVirtualization** | boolean | Virtual scrolling for large datasets | 1000+ rows |
| **enableColumnVirtualization** | boolean | Render only visible columns | 50+ columns |
| **enableVirtualMaskRow** | boolean | Shimmer effect vs spinner | Want UX polish |
| **enableImmutableMode** | boolean | Reuse rows on refresh | Frequent updates |
| **enableInfiniteScrolling** | boolean | Load data as user scrolls | Massive datasets |
| **loadChildOnDemand** | boolean | Load children on expand (remote) | Remote data with many children |
| **enablePersistence** | boolean | Save state between sessions | User preferences |
| **enableCollapseAll** | boolean | Start collapsed | Large hierarchies |
| **loadingIndicator** | LoadingIndicatorModel | Show loading state | Long operations |

---

## Settings Objects

| Setting | Type | Main Properties | Documentation |
|---------|------|-----------------|---|
| **editSettings** | EditSettingsModel | allowAdding, allowEditing, allowDeleting, mode | [Editing](./editing.md) |
| **filterSettings** | FilterSettingsModel | type, mode, columns, operators | [Filtering](./filtering.md) |
| **sortSettings** | SortSettingsModel | columns | [Sorting](./sorting.md) |
| **pageSettings** | PageSettingsModel | currentPage, pageSize, pageCount | [Paging](./paging.md) |
| **selectionSettings** | SelectionSettingsModel | mode, type, cellSelectionMode | [Selection](./selection-and-interaction.md) |
| **searchSettings** | SearchSettingsModel | fields, operators | [Searching](./searching.md) |
| **columnChooserSettings** | ColumnChooserSettingsModel | columnChooserOperator | [Column Chooser](./column-chooser.md) |
| **textWrapSettings** | TextWrapSettingsModel | wrapMode | [Styling](./styling-and-appearance.md) |
| **rowDropSettings** | RowDropSettingsModel | targetID | [Row Drag Drop](./row-drag-drop.md) |
| **loadingIndicator** | LoadingIndicatorModel | indicatorType | [Performance](./performance.md) |
| **infiniteScrollSettings** | InfiniteScrollSettingsModel | enableCache, maxBlocks, initialBlocks | [Infinite Scrolling](./infinite-scrolling.md) |

---

## Template Properties

| Property | Type | Accepts | Purpose |
|----------|------|---------|---------|
| **detailTemplate** | string\|Function | HTML string or element ID | Detail row content |
| **rowTemplate** | string\|Function | HTML string or element ID | Custom row template |
| **emptyRecordTemplate** | string\|Function | HTML string or element ID | No data label |
| **pagerTemplate** | string\|Function | HTML string or element ID | Custom pager |

---
