# TabView Migration Mapping

## Control

- Xamarin: SfTabView
- MAUI: SfTabView

## Namespaces Mapping

- Syncfusion.XForms.TabView -> Syncfusion.Maui.TabView

## Properties Mapping

- Color -> IndicatorBackground
- Position -> IndicatorPlacement
- TabHeaderBackgroundColor -> TabBarBackground
- TabHeight -> TabBarHeight
- TabHeaderPosition -> TabBarPlacement
- TitleFontAttributes -> FontAttributes
- TitleFontFamily -> FontFamily
- TitleFontSize -> FontSize
- TitleFontColor -> TextColor
- Title -> Header
- HeaderContent -> HeaderItemTemplate

## Enums Mapping

- BasedOnText, Default -> Default, SizeToContent

## Classes Mapping

- TabHeaderPosition -> TabBarPlacement
- SelectionIndicatorPosition -> TabIndicatorPlacement
- SelectionChangedEventArgs -> TabSelectionChangedEventArgs

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
