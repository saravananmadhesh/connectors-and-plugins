# DataGrid Migration Mapping

## Control

- Xamarin: SfDataGrid
- MAUI: SfDataGrid

## Namespaces Mapping

- Syncfusion.SfDataGrid.XForms -> Syncfusion.Maui.DataGrid
- Syncfusion.Data -> Syncfusion.Maui.Data
- Syncfusion.SfDataGrid.XForms.DataPager -> Syncfusion.Maui.DataGrid.DataPager

## Enums Mapping

- ColumnSizer -> ColumnWidthMode
- SortTapAction -> DataGridSortingGestureType
- Position -> SummaryRowPosition
- AutoEllipsisMode -> DataPagerEllipsisMode
- ButtonShape -> DataPagerButtonShape
- NumericButtonsGenerateMode -> DataPagerNumericButtonsGenerateMode
- PagerDisplayMode -> DataPagerDisplayMode
- ProgressStates -> DataGridProgressState
- QueryColumnDraggingReason -> DataGridDragAction
- SelectionUnit -> DataGridSelectionUnit
- SwipeOffsetMode -> DataGridSwipeOffsetMode
- SwipeDirection -> DataGridSwipeDirection

## Properties Mapping

- AutoGenerateColumns -> AutoGenerateColumnsMode.None
- AllowSorting -> SortingMode.Single
- AllowMultiSorting -> SortingMode.Multiple
- SortTapAction -> SortingGestureType
- IsHidden -> Visible
- SelectedItem -> SelectedRow
- SelectedItems -> SelectedRows
- CurrentItem -> CurrentRow
- HeaderBackgroundColor -> HeaderRowBackground
- RowBackgroundColor -> RowBackground
- RowForegroundColor -> RowTextColor
- HeaderForegroundColor -> HeaderRowTextColor
- GridCellBorderColor -> GridLineColor
- GridCellBorderWidth -> GridLineStrokeThickness
- SelectionBackgroundColor -> SelectionBackground
- SelectionForegroundColor -> SelectedRowTextColor
- ColumnSizer -> ColumnWidthMode
- FontAttribute -> DataGridCell.FontAttributes
- HeaderFont -> DataGridHeaderCell.FontFamily
- HeaderFontAttribute -> DataGridHeaderCell.FontAttributes
- RecordFont -> DataGridCell.FontFamily
- FrozenRowsCount -> FrozenRowCount
- FrozenColumnsCount -> FrozenColumnCount
- AppearanceManager -> DefaultStyle
- GetNumericButtonSelectionBackgroundColor -> NumericButtonSelectionBackgroundColor
- GetDataPagerBackgroundColor() -> DataPagerBackgroundColor
- GetNavigationButtonIconColor() -> NavigationButtonIconColor
- GetNumericButtonForegroundColor() -> NumericButtonTextColor
- GetNumericButtonSelectionForegroundColor() -> NumericButtonSelectionTextColor
- EnableGridPaging() -> -
- AllowResizingColumn -> AllowResizingColumns
- Reason -> DraggingAction
- ColumnDragViewForegroundColor -> ColumnDragViewTextColor

## Events Mapping

- GridTapped -> CellTapped
- GridTappedCommand -> CellTappedCommand
- GridDoubleTapped -> CellDoubleTapped
- GridDoubleTappedCommand -> CellDoubleTappedCommand
- GridLongPressed -> CellLongPress
- GridLongPressedCommand -> CellLongPressedCommand
- QueryRowStyle -> -
- QueryCellStyle -> -
- PageIndexChanging -> PageChanging
- PageIndexChanged -> PageChanged
- GridViewCreated -> ViewCreated
- GridLoaded -> DataGridLoaded

## Methods Mapping

- GetRowHeight -> GetIntrinsicRowHeight

## Classes Mapping

- GridColumn -> DataGridColumn
- GridNumericColumn -> DataGridNumericColumn
- GridDateTimeColumn -> DataGridDateColumn
- GridImageColumn -> DataGridImageColumn
- GridTemplateColumn -> DataGridTemplateColumn
- GridTextColumn -> DataGridTextColumn
- GridCell -> DataGridCell
- VirtualizingCellsControl -> DataGridRow
- GridHeaderCellControl -> DataGridHeaderCell
- GridColumnSizer -> DataGridColumnSizer
- GridSummaryRow -> DataGridSummaryRow
- GridTableSummaryRow -> DataGridTableSummaryRow
- Position -> SummaryRowPosition
- TableSummaryRowControl -> DataGridTableSummaryRowView
- StackedColumn -> DataGridStackedColumn
- StackedHeaderCellControl -> DataGridStackedHeaderCell
- GridStackedHeaderCellRenderer -> DataGridStackedHeaderCellRenderer
- StackedHeaderRow -> DataGridStackedHeaderRow
- GridStackedHeaderCellControl -> DataGridStackedHeaderRowView
- GridUnboundRows -> DataGridUnboundRows
- GridUnboundColumn -> DataGridUnboundColumn
- AppearanceManager -> DataPagerStyle
- GridResizingEventArgs -> DataGridColumnResizingEventArgs
- QueryColumnDraggingEventArgs -> DataGridQueryColumnDraggingEventArgs
- SwipeStartedEventArgs -> DataGridSwipeStartingEventArgs
- SwipingEventArgs -> DataGridSwipingEventArgs
- SwipeEndedEventArgs -> DataGridSwipeEndedEventArgs

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
