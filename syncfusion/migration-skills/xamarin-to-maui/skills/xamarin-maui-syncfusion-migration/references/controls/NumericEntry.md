# NumericEntry Migration Mapping

## Control

- Xamarin: SfNumericTextBox and SfNumericUpDown
- MAUI: SfNumericEntry

## Namespaces Mapping

- Syncfusion.SfNumericTextBox.XForms -> Syncfusion.Maui.Inputs

## Properties Mapping

- BorderColor -> Stroke
- ClearButtonVisibility -> ShowClearButton
- FormatString -> CustomFormat
- IsReadOnly -> IsEditable
- Watermark -> Placeholder
- WatermarkColor -> PlaceholderColor

## Events Mapping

- ValueEventArgs' 'Value' 'OldValue -> NumericEntryValueChangedEventArgs' 'OldValue' 'NewValue

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
