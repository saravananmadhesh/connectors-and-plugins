# ListView Migration Mapping

## Control

- Xamarin: SfListView
- MAUI: SfListView

## Namespaces Mapping

- Syncfusion.ListView.XForms -> Syncfusion.Maui.ListView
- Syncfusion.ListView.XForms.Control.Helpers -> Syncfusion.Maui.ListView.Helpers
- Syncfusion.DataSource -> Syncfusion.Maui.DataSource
- Syncfusion.DataSource.Extensions -> Syncfusion.Maui.DataSource.Extensions

## Properties Mapping

- HoldCommand -> LongPressCommand
- HoldCommandParameter -> LongPressCommandParameter
- SelectionBackgroundColor -> SelectionBackground
- IsBusy -> IsLazyLoading
- ItemData -> ItemTappedEventArgs.DataItem
- ItemData -> ItemLongPressEventArgs.DataItem
- ItemData -> ItemDoubleTappedEventArgs.DataItem
- ItemData -> ItemAppearingEventArgs.DataItem
- ItemData -> ItemDisappearingEventArgs.DataItem
- ItemData -> QueryItemSizeEventArgs.DataItem
- ItemData -> ItemDraggingEventArgs.DataItem
- CanAdjustDragItemAxis -> CanAdjustDragItemAxis
- LayoutManager -> ItemsLayout

## Enums Mapping

- Top, Bottom -> Start, End
- Hold -> LongPress

## Events Mapping

- ItemHolding -> ItemLongPress

## Classes Mapping

- FooterItem -> ListViewFooterItem
- FooterPosition -> ListViewFooterPosition
- GroupHeader -> ListViewGroupHeader
- HeaderItem -> ListViewHeaderItem
- ItemHoldingEventArgs -> ItemLongPressEventArgs
- LoadMoreIndicator -> ListViewLoadMoreIndicator
- LoadMoreItem -> ListViewLoadMoreItem
- LayoutBase -> ListViewLayout
- InverseBoolConverter -> InvertedBoolConverter

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
