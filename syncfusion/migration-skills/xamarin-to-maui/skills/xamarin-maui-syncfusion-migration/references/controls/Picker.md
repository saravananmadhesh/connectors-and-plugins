# Picker Migration Mapping

## Control

- Xamarin: SfPicker
- MAUI: SfPicker

## Namespaces Mapping

- Syncfusion.XForms.Pickers -> Syncfusion.Maui.Picker

## Initialize control Mapping

- using Syncfusion.XForms.Pickers; ... SfPicker picker = new SfPicker(); this.Content = picker; -> using Syncfusion.Maui.Picker; ... SfPicker picker = new SfPicker(); this.Content = picker;

## Classes Mapping

- SfPicker -> SfPicker
- PickerSelectionChangedEventArgs -> PickerSelectionChangedEventArgs

## Properties Mapping

- using Syncfusion.SfPicker.XForms; ... SfPicker picker = new SfPicker(); this.Content = picker; -> using Syncfusion.Maui.Picker; .. SfPicker picker = new SfPicker(); this.Content = picker;
- BackgroundColor -> Nil
- BorderColor -> Nil
- CancelButtonBackgroundColor -> Background
- CancelButtonTextColor -> TextColor From TextStyle of PickerFooterView
- ColumnHeaderBackgroundColor -> Background
- ColumnHeaderFontAttributes -> FontAttributes From TextStyle of PickerColumnHeaderView
- ColumnHeaderFontFamily -> FontFamily From TextStyle of PickerColumnHeaderView
- ColumnHeaderFontSize -> FontSize From TextStyle of PickerColumnHeaderView
- ColumnHeaderHeight -> Height From PickerColumnHeaderView
- ColumnHeaderText -> Text From PickerColumnHeaderView
- ColumnHeaderTextColor -> TextColor From TextStyle of PickerColumnHeaderView
- DisplayMemberPath -> DisplayMemberPath of PickerColumnHeaderView
- EnableLooping -> EnableLooping
- FooterHeight -> Height From PickerBase of FooterView
- FooterView -> FooterView From PickerBase
- HeaderBackgroundColor -> Background From HeaderView
- HeaderFontAttribute -> FontAttribute From TextStyle of PickerHeaderView
- HeaderFontFamily -> FontFamily From TextStyle of PickerHeaderView
- HeaderFontSize -> FontSize From TextStyle of PickerHeaderView
- HeaderHeight -> Height of PickerHeaderView
- HeaderText -> HeaderText of PickerHeaderView
- HeaderTextColor -> TextColor From TextStyle of PickerHeaderView
- HeaderView -> HeaderView
- IsOpen -> IsOpen
- ItemHeight -> ItemHeight of PickerBase
- ItemsSource -> ItemsSource of PickerColumn
- ItemTemplate -> ItemTemplate
- OKButtonBackgroundColor -> Background of PickerBase From PickerFooterView
- OKButtonTextColor -> TextColor From PickerTextStyle of TextStyle of PickerBase From PickerFooterView
- Parent -> Nil
- PickerHeight -> Nil
- PickerMode -> Mode
- PickerWidth -> Width From PickerColumn
- SelectedIndex -> SelectedIndex From PickerColumn
- SelectedItem -> SelectedItem From PickerColumn
- SelectedItemFontAttributes -> FontAttributes From SelectedTextStyle
- SelectedItemFontFamily -> FontFamily From SelectedTextStyle
- SelectedItemFontSize -> FontSize From SelectedTextStyle
- SelectedItemTextColor -> TextColor From SelectedTextStyle
- SelectionBackgroundColor -> Background From PickerSelectionView
- ShowColumnHeader -> Nil
- ShowFooter -> Nil
- ShowHeader -> Nil
- UnSelectedItemFontAttributes -> FontAttributes From TextStyle
- UnSelectedItemFontFamily -> FontFamily From TextStyle
- UnSelectedItemFontSize -> FontSize From TextStyle
- UnSelectedItemTextColor -> TextColor From TextStyle
- CommandParameter -> Nil
- OkCommand -> AcceptCommand
- CancelCommand -> DeclineCommand

## Events Mapping

- SelectionChanged -> SelectionChanged
- Opened -> Opened
- Closed -> Closed
- Closing -> Closing
- OkButtonClicked -> OkButtonClicked
- CancelButtonClicked -> CancelButtonClicked
- OnPickerItemLoaded -> ItemTemplate

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
