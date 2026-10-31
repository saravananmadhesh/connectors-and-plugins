# ImageEditor Migration Mapping

## Control

- Xamarin: SfImageEditor
- MAUI: SfImageEditor

## Namespaces Mapping

- Syncfusion.SfImageEditor.XForms -> Syncfusion.Maui.ImageEditor

## Initialize control Mapping

- using Syncfusion.XForms.ImageEditor; ... SfImageEditor imageEditor = new SfImageEditor(); this.Content = imageEditor; -> using Syncfusion.Maui.ImageEditor; … SfImageEditor imageEditor = new SfImageEditor(); this.Content = imageEditor;

## Classes Mapping

- SfImageEditor -> SfImageEditor
- PenSettings -> ImageEditorAnnotationSettings
- PenSettings -> ImageEditorShapeSettings
- TextSettings -> ImageEditorTextSettings
- TextSettings -> ImageEditorTextStyle

## Properties Mapping

- Source -> Source
- ZoomLevel -> ZoomLevel
- EnableZooming -> AllowZoom
- MaximumZoomLevel -> MaximumZoomLevel
- ActualImageRenderedBounds -> ImageRenderedSize
- OriginalImageSize -> OriginalImageSize
- IsImageEdited -> IsImageEdited
- ToolbarSettings.IsVisible -> ShowToolbar
- Nil -> SelectionStroke
- Bounds -> Bounds
- EnableDrag -> AllowDrag
- IsResizable -> AllowResize
- Opacity -> Opacity
- Color -> Color
- StrokeWidth -> StrokeThickness
- FillColor -> IsFilled
- Angle -> RotationAngle
- Nil -> TextStyle
- RotatableElement -> IsRotatable
- TextAlignment -> TextAlignment
- IsEditable -> IsEditable
- Color -> TextColor
- FontSize -> FontSize
- FontFamily -> FontFamily
- TextEffects -> FontAttribute

## Enums Mapping

- ShapeType -> AnnotationShape
- FlipDirection -> ImageFlipDirection
- ImageEffect -> ImageEffect
- Nil -> ImageFileType
- Nil -> ImageCropType

## Events Mapping

- BeginReset -> BeginReset
- ImageSaving -> ImageSaving
- ImageSaved -> ImageSaved
- ItemSelected -> AnnotationSelected
- ImageLoaded -> ImageLoaded

## Methods Mapping

- Rotate -> Rotate
- Flip -> Flip
- Crop -> Crop
- AddText -> AddText
- AddShape -> AddShape
- Save -> Save
- SaveEdits -> SaveEdits
- Nil -> CancelEdits
- ClearAnnotations -> ClearAnnotations
- Reset -> Reset
- Undo -> Undo
- Redo -> Redo
- Delete -> DeleteAnnotation
- GetStream -> GetImageStream
- ApplyImageEffect -> ImageEffect

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
