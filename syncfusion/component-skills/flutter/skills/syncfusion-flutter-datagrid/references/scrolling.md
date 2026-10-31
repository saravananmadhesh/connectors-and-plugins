# Scrolling — Flutter DataGrid

## Overview

`SfDataGrid` supports both horizontal and vertical scrolling. Features include always-show scrollbars, hide scrollbars, custom scroll physics, programmatic scrolling to cells/rows/columns/offsets, scroll offset listeners, shrink-wrap sizing, and visible index retrieval.

---

## Always Show Scrollbars

```dart
SfDataGrid(
    source: _employeeDataSource,
    isScrollbarAlwaysShown: true,
    columns: columns)
```

Default is `false` — scrollbars fade out after scrolling stops.

---

## Hide Scrollbars

Wrap in `ScrollConfiguration` and set `showVerticalScrollbar`/`showHorizontalScrollbar` to false:

```dart
ScrollConfiguration(
  behavior: const ScrollBehavior().copyWith(scrollbars: false),
  child: SfDataGrid(
    source: employeeDataSource,
    showVerticalScrollbar: false,
    showHorizontalScrollbar: false,
    isScrollbarAlwaysShown: true,
    columns: columns,
  ),
)
```

---

## Custom Scroll Physics

Disable all scrolling with `NeverScrollableScrollPhysics`:

```dart
SfDataGrid(
    source: _employeeDataSource,
    horizontalScrollPhysics: NeverScrollableScrollPhysics(),
    verticalScrollPhysics: NeverScrollableScrollPhysics(),
    columns: columns)
```

Default: `AlwaysScrollableScrollPhysics()` for both axes.

---

## Programmatic Scrolling

All methods use `DataGridController`. Use `canAnimate: true` for smooth animation.

### Scroll to Cell

```dart
final DataGridController _controller = DataGridController();

_controller.scrollToCell(10, 1);
// with animation and position
_controller.scrollToCell(10, 1,
    canAnimate: true,
    rowPosition: DataGridScrollPosition.start,
    columnPosition: DataGridScrollPosition.center);
```

### Scroll to Row

```dart
_controller.scrollToRow(10);
_controller.scrollToRow(10, canAnimate: true, position: DataGridScrollPosition.center);
```

### Scroll to Column

```dart
_controller.scrollToColumn(1);
_controller.scrollToColumn(1, canAnimate: true, position: DataGridScrollPosition.end);
```

### Scroll to Vertical / Horizontal Offset

```dart
_controller.scrollToVerticalOffset(500);
_controller.scrollToHorizontalOffset(400);
```

> Retrieve current scroll positions: `_controller.verticalOffset` and `_controller.horizontalOffset`.

---

## DataGridScrollPosition Values

| Value | Description |
|---|---|
| `makeVisible` | Scroll only if the target is not already in view |
| `start` | Position target at the start of the grid (default) |
| `center` | Position target at the center of the grid |
| `end` | Position target at the end of the grid |

---

## Listen to Scroll Changes

Attach listeners to `verticalScrollController` or `horizontalScrollController`:

```dart
late ScrollController _verticalScrollController;

@override
void initState() {
  super.initState();
  _verticalScrollController = ScrollController()
    ..addListener(() {
      if (_verticalScrollController.position.pixels >=
          _verticalScrollController.position.maxScrollExtent * (70 / 100)) {
        _employeeDataSource.loadMoreRows();
      }
    });
}

SfDataGrid(
    source: _employeeDataSource,
    verticalScrollController: _verticalScrollController,
    columns: columns)
```

---

## Set Initial Scroll Offset

Use `ScrollController(initialScrollOffset: ...)`:

```dart
_verticalScrollController = ScrollController(initialScrollOffset: 500);
_horizontalScrollController = ScrollController(initialScrollOffset: 600);

SfDataGrid(
    source: _employeeDataSource,
    verticalScrollController: _verticalScrollController,
    horizontalScrollController: _horizontalScrollController,
    columns: columns)
```

---

## Shrink Wrap (Size to Content)

Size the grid to exactly fit its rows/columns (use inside `SingleChildScrollView`):

```dart
SingleChildScrollView(
  child: SfDataGrid(
    source: _employeeDataSource,
    shrinkWrapRows: true,
    shrinkWrapColumns: true,
    columns: columns,
  ),
)
```

> **Note:** Shrink wrapping is more expensive than fixed sizing. Use sparingly.

---

## Increase Row Cache Extent

Prevents visual flickering (e.g., checkbox animation) when rows are reused during scrolling:

```dart
SfDataGrid(
    source: employeeDataSource,
    rowsCacheExtent: 10,
    showCheckboxColumn: true,
    selectionMode: SelectionMode.multiple,
    columns: columns)
```

---

## Get Visible Row/Column Indices

```dart
int? startRow = _controller.getVisibleRowStartIndex(RowRegion.body);
int? endRow = _controller.getVisibleRowEndIndex(RowRegion.body);
int? startCol = _controller.getVisibleColumnStartIndex(RowRegion.body);
int? endCol = _controller.getVisibleColumnEndIndex(RowRegion.body);
```

---

## Key Property Reference

| Property | Type | Default | Description |
|---|---|---|---|
| `isScrollbarAlwaysShown` | `bool` | `false` | Always display scrollbars |
| `showVerticalScrollbar` | `bool` | `true` | Show/hide vertical scrollbar |
| `showHorizontalScrollbar` | `bool` | `true` | Show/hide horizontal scrollbar |
| `horizontalScrollPhysics` | `ScrollPhysics` | `AlwaysScrollableScrollPhysics()` | Horizontal scroll physics |
| `verticalScrollPhysics` | `ScrollPhysics` | `AlwaysScrollableScrollPhysics()` | Vertical scroll physics |
| `verticalScrollController` | `ScrollController?` | `null` | External vertical scroll controller |
| `horizontalScrollController` | `ScrollController?` | `null` | External horizontal scroll controller |
| `rowsCacheExtent` | `int?` | `null` | Additional rows to pre-render beyond viewport |
| `shrinkWrapRows` | `bool` | `false` | Size height to fit all rows |
| `shrinkWrapColumns` | `bool` | `false` | Size width to fit all columns |

---

## TOC

- [Always Show Scrollbars](#always-show-scrollbars)
- [Hide Scrollbars](#hide-scrollbars)
- [Custom Scroll Physics](#custom-scroll-physics)
- [Programmatic Scrolling](#programmatic-scrolling)
- [DataGridScrollPosition Values](#datagridscrollposition-values)
- [Listen to Scroll Changes](#listen-to-scroll-changes)
- [Set Initial Scroll Offset](#set-initial-scroll-offset)
- [Shrink Wrap](#shrink-wrap-size-to-content)
- [Increase Row Cache Extent](#increase-row-cache-extent)
- [Get Visible Row/Column Indices](#get-visible-rowcolumn-indices)
