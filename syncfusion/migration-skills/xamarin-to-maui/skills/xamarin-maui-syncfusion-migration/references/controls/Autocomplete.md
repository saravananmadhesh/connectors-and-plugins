# Autocomplete Migration Mapping

## Control

- Xamarin: SfAutoComplete
- MAUI: SfAutocomplete

## Namespaces Mapping

- Syncfusion.SfAutoComplete.XForms -> Syncfusion.Maui.Inputs

## Properties Mapping

- Watermark -> Placeholder
- WatermarkColor -> PlaceholderColor
- ClearButtonColor -> ClearButtonIconColor
- ShowClearButton -> IsClearButtonVisible
- MaximumDropDownHeight -> MaxDropDownHeight
- SuggestionMode' 'AutoCompleteMode -> TextSearchMode
- ItemsSource' , 'DataSource' , 'AutoCompleteSource -> ItemsSource
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
