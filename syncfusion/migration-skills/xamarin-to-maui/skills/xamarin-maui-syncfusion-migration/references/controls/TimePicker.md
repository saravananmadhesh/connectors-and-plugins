# TimePicker Migration Mapping

## Control

- Xamarin: SfTimePicker
- MAUI: SfTimePicker

## Namespaces Mapping

- Syncfusion.XForms.Pickers -> Syncfusion.Maui.Picker

## Initialize control Mapping

- using Syncfusion.XForms.Pickers; ... SfTimePicker timePicker = new SfTimePicker(); this.Content = timePicker; -> using Syncfusion.Maui.Picker; ... SfTimePicker timePicker = new SfTimePicker(); this.Content = timePicker;

## Classes Mapping

- PickerBase -> PickerBase
- TimeChangedEventArgs -> TimePickerSelectionChangedEventArgs

## Properties Mapping

- using Syncfusion.SfPicker.XForms; ... SfTimePicker timePicker = new SfTimePicker(); timePicker.Format = TimeFormat.HH_mm_ss; this.Content = timePicker; -> using Syncfusion.Maui.Picker; ... SfTimePicker timePicker = new SfTimePicker(); timePicker.Format = PickerTimeFormat.h_mm_ss_tt; this.Content = timePicker;
- CancelCommand -> DeclineCommand
- CommandParameter -> Nil
- Format -> Format
- HeaderText -> Text(From PickerHeaderView)
- HourHeaderText -> HourHeaderText(From TimePickerColumnHeaderView)
- HourInterval -> HourInterval
- MeridiemHeaderText -> MeridiemHeaderText(From TimePickerColumnHeaderView)
- MinuteInterval -> MinuteInterval
- MinutesHeaderText -> MinuteHeaderText(From TimePickerColumnHeaderView)
- OkCommand -> AcceptCommand
- SecondInterval -> SecondInterval
- SecondHeaderText -> SecondHeaderText(From TimePickerColumnHeaderView)
- Time -> SelectedTime
- BackgroundColor -> Nil
- BorderColor -> Nil
- CancelButtonBackgroundColor -> BackgroundColor(From PickerFooterView)
- CancelButtonTextColor -> TextColor(From TextStyle of PickerFooterView)
- ColumnHeaderBackgroundColor -> BackgroundColor(From TimePickerColumnHeaderView)
- ColumnHeaderFontAttributes -> FontAttributes(From TextStyle of TimePickerColumnHeaderView)
- ColumnHeaderFontFamily -> FontFamily(From TextStyle of TimePickerColumnHeaderView)
- ColumnHeaderFontSize -> FontSize(From TextStyle of TimePickerColumnHeaderView)
- ColumnHeaderHeight -> Height(From TimePickerColumnHeaderView)
- ColumnHeaderTextColor -> TextColor(From TextStyle of TimePickerColumnHeaderView)
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

- TimeFormat -> PickerTimeFormat
- PickerMode -> PickerMode

## Events Mapping

- Opened -> Opened
- Closed -> Closed
- Closing -> Closing
- TimeSelected -> SelectionChanged
- OkButtonClicked -> OkButtonClicked
- CancelButtonClicked -> CancelButtonClicked

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
