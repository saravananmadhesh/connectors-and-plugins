# DatePicker Migration Mapping

## Control

- Xamarin: SfDatePicker
- MAUI: SfDatePicker

## Namespaces Mapping

- Syncfusion.XForms.Pickers -> Syncfusion.Maui.Picker

## Initialize control Mapping

- using Syncfusion.XForms.Pickers; ... SfDatePicker datePicker = new SfDatePicker(); this.Content = datePicker; -> using Syncfusion.Maui.Picker; ... SfDatePicker datePicker = new SfDatePicker(); this.Content = datePicker;

## Classes Mapping

- PickerBase -> PickerBase
- DateChangedEventArgs -> DatePickerSelectionChangedEventArgs

## Properties Mapping

- using Syncfusion.SfPicker.XForms; ... SfDatePicker datePicker = new SfDatePicker(); datePicker.Format = DateFormat.yyyy_MM_dd; this.Content = datePicker; -> using Syncfusion.Maui.Picker; ... SfDatePicker datePicker = new SfDatePicker(); datePicker.Format = PickerDateFormat.MM_dd_yyyy; this.Content = datePicker;
- CommandParameter -> Nil
- CancelCommand -> DeclineCommand
- Date -> SelectedDate
- DayHeaderText -> DayHeaderText(From DatePickerColumnHeaderView)
- DayInterval -> DayInterval
- Format -> Format
- MaximumDate -> MaximumDate
- MinimumDate -> MinimumDate
- MonthHeaderText -> MonthHeaderText(From DatePickerColumnHeaderView)
- MonthInterval -> MonthInterval
- OkCommand -> AcceptCOmmand
- YearInterval -> YearInterval
- YearHeaderText -> YearHeaderText(From DatePickerColumnHeaderView)
- BackgroundColor -> Nil
- BorderColor -> Nil
- CancelButtonBackgroundColor -> BackgroundColor(From PickerFooterView)
- CancelButtonTextColor -> TextColor(From TextStyle of PickerFooterView)
- ColumnHeaderBackgroundColor -> BackgroundColor(From DatePickerColumnHeaderView)
- ColumnHeaderFontAttributes -> FontAttributes(From TextStyle of DatePickerColumnHeaderView)
- ColumnHeaderFontFamily -> FontFamily(From TextStyle of DatePickerColumnHeaderView)
- ColumnHeaderFontSize -> FontSize(From TextStyle of DatePickerColumnHeaderView)
- ColumnHeaderHeight -> Height(From DatePickerColumnHeaderView)
- ColumnHeaderTextColor -> TextColor(From TextStyle of DatePickerColumnHeaderView)
- EnableLooping -> EnableLooping
- FooterHeight -> Height(From PickerFooterView)
- FooterView -> FooterView
- HeaderBackgroundColor -> BackgroundColor(From PickerHeaderView)
- HeaderFontAttribute -> FontAttribute(From TextStyle of PickerHeaderView)
- HeaderFontFamily -> FontFamily(From TextStyle of PickerHeaderView)
- HeaderFontSize -> FontSize(From TextStyle of PickerHeaderView)
- HeaderHeight -> Height(From PickerHeaderView)
- HeaderTextColor -> TextColor(From TextStyle of PickerHeaderView)
- HeaderView -> HeaderView
- IsOpen -> IsOpen
- ItemHeight -> ItemHeight
- OkButtonBackgroundColor -> BackgroundColor(From PickerFooterView)
- OkButtonTextColor -> TextColor(From TextStyle of PickerFooterView)
- PickerHeight -> Nil
- PickerWidth -> Nil
- SelectionBackgroundColor -> BackgroundColor(From PickerSelectionView)
- SelectedItemFontAttributes -> FontAttributes(From SelectedTextStyle of PickerBase)
- SelectedItemFontFamily -> FontFamily(From SelectedTextStyle of PickerBase)
- SelectedItemFontSize -> FontSize(From SelectedTextStyle of PickerBase)
- SelectedItemTextColor -> TextColor(From SelectedTextStyle of PickerBase)
- ShowColumnHeader -> Nil
- ShowFooter -> Nil
- ShowHeader -> Nil
- UnSelectedItemFontAttributes -> FontAttributes(From TextStyle of PickerBase)
- UnSelectedItemFontFamily -> FontFamily(From TextStyle of PickerBase)
- UnSelectedItemFontSize -> FontSize(From TextStyle of PickerBase)
- UnSelectedItemTextColor -> TextColor(From TextStyle of PickerBase)

## Enums Mapping

- DateFormat -> PickerDateFormat
- PickerMode -> PickerMode

## Events Mapping

- Opened -> Opened
- Closed -> Closed
- Closing -> Closing
- DateSelection -> SelectionChanged
- OkButtonClicked -> OkButtonClicked
- CancelButtonClicked -> CancelButtonClicked

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
