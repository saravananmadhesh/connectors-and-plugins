# TextInputLayout Migration Mapping

## Control

- Xamarin: TextInputLayout
- MAUI: TextInputLayout.

## Namespaces Mapping

- Syncfusion.SfTextInputLayout.XForms -> Syncfusion.Maui.Core

## Properties Mapping

- FocusedStrokeWidth -> FocusedStrokeThickness
- UnfocusedStrokeWidth -> UnfocusedStrokeThickness
- ContainerBackgroundColor -> ContainerBackground
- InputView -> Content
- FocusedColor' 'UnfocusedColor' 'ErrorColor -> Stroke
- Color -> TextColor

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
