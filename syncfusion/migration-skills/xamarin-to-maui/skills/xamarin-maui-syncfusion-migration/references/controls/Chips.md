# Chips Migration Mapping

## Control

- Xamarin: SfChips
- MAUI: SfChips

## Properties Mapping

- BorderThickness -> StrokeThickness
- BorderColor -> Stroke
- BackgroundImage -> BackgroundImageSource
- ImageWidth -> ImageSize
- ImageSource' 'Image -> ImageSource
- ChipImageWidth -> ChipImageSize
- Type -> ChipType
- SelectedItems' 'SelectedItem -> SelectedItem
- ChipBorderColor -> ChipStroke
- ChipBorderWidth -> ChipStrokeThickness
- ChipBackgroundColor -> ChipBackground

## Events Mapping

- ItemRemovedEventArgs' 'RemovedItem -> SelectionChangedEventArgs' 'AddedItem' 'RemovedItem

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
