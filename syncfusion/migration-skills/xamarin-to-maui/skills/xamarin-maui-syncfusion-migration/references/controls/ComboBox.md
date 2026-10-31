# ComboBox Migration Mapping

## Control

- Xamarin: SfComboBox
- MAUI: SfComboBox

## Namespaces Mapping

- Syncfusion.XForms.ComboBox -> Syncfusion.Maui.Inputs

## Properties Mapping

- IsEditableMode -> IsEditable
- Watermark -> Placeholder
- WatermarkColor -> PlaceholderColor
- ClearButtonColor -> ClearButtonIconColor
- ShowClearButton -> IsClearButtonVisible
- MaximumDropDownHeight -> MaxDropDownHeight
- SuggestionMode' 'ComboBoxMode -> TextSearchMode
- ItemsSource' , 'DataSource' , 'ComboBoxSource -> ItemsSource
- Delimiter -> DelimiterText
- NoResultsFoundFontAttributes' , 'NoResultsFoundFontFamily' , 'NoResultsFoundFontSize' , 'NoResultsFoundTextColor -> NoResultsFoundTemplate

## Enums Mapping

- StartsWith' , 'StartsWithCaseSensitive' , 'Contains' , 'ContainsWithCaseSensitive' , 'Equals' , 'EqualsWithCaseSensitive' , 'EndsWith' , 'EndsWithCaseSensitive' , 'Custom -> StartsWith' , 'Contains' .
- Auto' , 'Bottom' , 'None' , 'Top -> Auto' , 'Bottom' , 'None' , 'Top
- Delimiter' , 'None' , 'Token -> Delimiter' , 'Token

## Events Mapping

- SelectionChangedEventArgs' 'Value -> SelectionChangedEventArgs' 'PreviousSelection' 'CurrentSelection

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
