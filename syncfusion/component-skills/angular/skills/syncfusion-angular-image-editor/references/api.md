# ImageEditor Component API Reference

This comprehensive API reference covers all properties, methods, and events available in the Syncfusion Angular ImageEditor component.

## Properties

### allowUndoRedo
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Specifies whether undo/redo operations are enabled in the image editor.

### cssClass
- **Type:** `string`
- **Default:** `''`
- **Description:** Defines one or more CSS classes that can be used to customize the appearance of the Image Editor component.

### disabled
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Defines whether an Image Editor component is enabled or disabled.

### finetuneSettings
- **Type:** `FinetuneSettingsModel`
- **Default:** `null`
- **Description:** Specifies the finetune settings option which can be used to perform color adjustments in the image editor control.
- **Available Options:**
  - `brightness`: { min, max, defaultValue }
  - `contrast`: { min, max, defaultValue }
  - `saturation`: { min, max, defaultValue }
  - `hue`: { min, max, defaultValue }
  - `exposure`: { min, max, defaultValue }
  - `blur`: { min, max, defaultValue }
  - `opacity`: { min, max, defaultValue }

### fontFamily
- **Type:** `FontFamilyModel`
- **Description:** Predefine the font families that populate in font family dropdown list from the toolbar.

### height
- **Type:** `string`
- **Default:** `'100%'`
- **Description:** Specifies the height of the Image Editor.

### imageSmoothingEnabled
- **Type:** `boolean`
- **Default:** `false`
- **Description:** Determines whether high-quality images should be smoothed when rendered.

### locale
- **Type:** `string`
- **Default:** `''`
- **Description:** Overrides the global culture and localization value for this component. Default global culture is 'en-US'.

### quickAccessToolbarTemplate
- **Type:** `string | Function`
- **Default:** `null`
- **Description:** Specifies a template for the quick access toolbar. Use this property to customize the quick access toolbar.

### selectionSettings
- **Type:** `SelectionSettingsModel`
- **Default:** `null`
- **Description:** Specifies the selection settings to customize selection behavior and appearance.

### showQuickAccessToolbar
- **Type:** `boolean`
- **Default:** `true`
- **Description:** Specifies whether to show/hide the quick access toolbar.

### theme
- **Type:** `string | Theme`
- **Default:** `Theme.Bootstrap5`
- **Description:** Specifies the theme of the Image Editor. The appearance of the shape selection in Image Editor is determined by this property.

### toolbar
- **Type:** `string[] | ItemModel[]`
- **Default:** `null`
- **Description:** Specifies the toolbar items to perform UI interactions.
- **Available Toolbar Items:**
  - Crop - helps to crop an image as ellipse, square, various ratio aspects, custom selection with resize, drag and drop.
  - Straightening - helps to rotate an image by a specified angle.
  - Annotate - help to insert a shape on image that supports rectangle, ellipse, line, arrow, path, text, image and freehand drawing.
  - Transform - helps to rotate and flip an image.
  - Finetunes - helps to perform adjustments on an image.
  - Filters - helps to perform predefined color filters.
  - Frame - helps to add decorative borders or frames around images.
  - Resize - helps to modify the dimensions of an image.
  - ZoomIn - performs zoom-in an image.
  - ZoomOut - performs zoom-out an image.
  - Save - save the modified image.
  - Open - open an image to perform editing.
  - Undo - helps to revert the last action.
  - Redo - helps to redo the last action.
  - Reset - reset the modification and restore the original image.

### toolbarTemplate
- **Type:** `any`
- **Default:** `null`
- **Description:** Specifies a custom template for the toolbar of an image editor control. If this property is defined, the 'toolbar' property will not have any effect.

### uploadSettings
- **Type:** `UploadSettingsModel`
- **Description:** Represents the settings for configuring image uploads.
- **Available Options:**
  - `allowedExtensions`: Specifies the allowed file extensions for uploaded images.
  - `minFileSize`: Specifies the minimum size (in bytes) for the uploaded image.
  - `maxFileSize`: Specifies the maximum size (in bytes) for the uploaded image.

### width
- **Type:** `string`
- **Default:** `'100%'`
- **Description:** Specifies the width of an Image Editor.

### zoomSettings
- **Type:** `ZoomSettingsModel`
- **Default:** `null`
- **Description:** Specifies the zoom settings to perform zooming action.
- **Available Options:**
  - `minZoomFactor`: Minimum zoom factor.
  - `maxZoomFactor`: Maximum zoom factor.
  - `zoomFactor`: Initial zoom factor.
  - `zoomTrigger`: Specifies zoom triggers (MouseWheel, Pinch, Toolbar, Commands).
  - `zoomPoint`: Point to zoom in/out on.

---

## Methods

### apply()
- **Returns:** `void`
- **Description:** Applies the operations performed in the Image Editor, such as annotation drawings.

### applyImageFilter(filterOption)
- **Parameters:**
  - `filterOption`: `ImageFilterOption` - Specifies the filter options to the image.
- **Returns:** `void`
- **Description:** Filtering an image with the given type of filters.

### bringForward(shapeId)
- **Parameters:**
  - `shapeId`: `string` - Specifies the shape id to move the shape on an image.
- **Returns:** `void`
- **Description:** Moves a shape to ahead of one shape based on the given shape id.

### bringToFront(shapeId)
- **Parameters:**
  - `shapeId`: `string` - Specifies the shape id to move the shape on an image.
- **Returns:** `void`
- **Description:** Moves a shape to the front of all other shapes based on the given shape id.

### canRedo()
- **Returns:** `boolean`
- **Description:** Specifies if it's possible to redo the last recent action made in an Image Editor.

### canUndo()
- **Returns:** `boolean`
- **Description:** Specifies if it's possible to undo the last recent action made in an Image Editor.

### clearImage()
- **Returns:** `void`
- **Description:** Clears the loaded image in the Image Editor.

### clearSelection(resetCrop?)
- **Parameters:**
  - `resetCrop` (optional): `boolean` - Specifies to reset last cropped image.
- **Returns:** `void`
- **Description:** Clears the current selection performed in the image editor.

### cloneShape(shapeId)
- **Parameters:**
  - `shapeId`: `string` - Specifies the shape id to clone a shape on an image.
- **Returns:** `boolean`
- **Description:** Duplicates a shape based on the given shape ID in the ImageEditor.

### crop()
- **Returns:** `boolean`
- **Description:** Crops an image based on the selection done in the image editor.

### deleteRedact(id)
- **Parameters:**
  - `id`: `string` - Specifies the redaction id to delete the redaction on an image.
- **Returns:** `void`
- **Description:** Deletes a redaction based on the given shape id.

### deleteShape(id)
- **Parameters:**
  - `id`: `string` - Specifies the shape id to delete the shape on an image.
- **Returns:** `void`
- **Description:** Deletes a shape based on the given shape id.

### discard()
- **Returns:** `void`
- **Description:** Discards the operations performed in the Image Editor, such as annotation drawings.

### drawArrow(startX?, startY?, endX?, endY?, strokeWidth?, strokeColor?, arrowStart?, arrowEnd?, isSelected?)
- **Parameters:**
  - `startX` (optional): `number` - Specifies start point x-coordinate of arrow.
  - `startY` (optional): `number` - Specifies start point y-coordinate of arrow.
  - `endX` (optional): `number` - Specifies end point x-coordinates of arrow.
  - `endY` (optional): `number` - Specifies end point y-coordinates of the arrow.
  - `strokeWidth` (optional): `number` - Specifies the stroke width of arrow.
  - `strokeColor` (optional): `string` - Specifies the stroke color of arrow.
  - `arrowStart` (optional): `ArrowheadType` - Specifies the type of arrowhead for start position (default: 'None').
  - `arrowEnd` (optional): `ArrowheadType` - Specifies the type of arrowhead for end position (default: 'SolidArrow').
  - `isSelected` (optional): `boolean` - Specifies to show the arrow in the selected state.
- **Returns:** `boolean`
- **Description:** Draw arrow on an image.

### drawEllipse(x?, y?, radiusX?, radiusY?, strokeWidth?, strokeColor?, fillColor?, degree?, isSelected?)
- **Parameters:**
  - `x` (optional): `number` - Specifies x-coordinate of ellipse.
  - `y` (optional): `number` - Specifies y-coordinate of ellipse.
  - `radiusX` (optional): `number` - Specifies the radius x point for the ellipse.
  - `radiusY` (optional): `number` - Specifies the radius y point for the ellipse.
  - `strokeWidth` (optional): `number` - Specifies the stroke width of ellipse.
  - `strokeColor` (optional): `string` - Specifies the stroke color of ellipse.
  - `fillColor` (optional): `string` - Specifies the fill color of the ellipse.
  - `degree` (optional): `number` - Specifies the degree to rotate the ellipse.
  - `isSelected` (optional): `boolean` - Specifies to show the ellipse in the selected state.
- **Returns:** `boolean`
- **Description:** Draw ellipse on an image.

### drawFrame(frameType, color?, gradientColor?, size?, inset?, offset?, borderRadius?, frameLineStyle?, lineCount?)
- **Parameters:**
  - `frameType`: `FrameType` - Specifies the frame option to be drawn on an image.
  - `color` (optional): `string` - Specifies the color of a frame on an image (default: '#fff').
  - `gradientColor` (optional): `string` - Specifies the gradient color of a frame on an image (default: '').
  - `size` (optional): `number` - Specifies the size of the frame as a percentage (default: 20).
  - `inset` (optional): `number` - Specifies the inset value for line, hook, and inset type frames as a percentage (default: 0).
  - `offset` (optional): `number` - Specifies the offset value for line and inset type frames as a percentage (default: 0).
  - `borderRadius` (optional): `number` - Specifies the border radius for line-type frames as a percentage (default: 0).
  - `frameLineStyle` (optional): `FrameLineStyle` - Specifies the type of line to be drawn for line-type frames (default: Solid).
  - `lineCount` (optional): `number` - Specifies the number of lines for line-type frames (default: 0).
- **Returns:** `boolean`
- **Description:** Draw a frame on an image.

### drawImage(data, x?, y?, width?, height?, isAspectRatio?, degree?, opacity?, isSelected?)
- **Parameters:**
  - `data`: `string | ImageData` - Specifies url of the image or image data.
  - `x` (optional): `number` - Specifies x-coordinate of a starting point for an image.
  - `y` (optional): `number` - Specifies y-coordinate of a starting point for an image.
  - `width` (optional): `number` - Specifies the width of the image.
  - `height` (optional): `number` - Specifies the height of the image.
  - `isAspectRatio` (optional): `boolean` - Specifies whether to maintain aspect ratio or not.
  - `degree` (optional): `number` - Specifies the degree to rotate the image.
  - `opacity` (optional): `number` - Specifies the value for the image.
  - `isSelected` (optional): `boolean` - Specifies to show the image in the selected state.
- **Returns:** `boolean`
- **Description:** Draw an image as annotation on an image.

### drawLine(startX?, startY?, endX?, endY?, strokeWidth?, strokeColor?, isSelected?)
- **Parameters:**
  - `startX` (optional): `number` - Specifies start point x-coordinate of line.
  - `startY` (optional): `number` - Specifies start point y-coordinate of line.
  - `endX` (optional): `number` - Specifies end point x-coordinates of line.
  - `endY` (optional): `number` - Specifies end point y-coordinates of the line.
  - `strokeWidth` (optional): `number` - Specifies the stroke width of line.
  - `strokeColor` (optional): `string` - Specifies the stroke color of line.
  - `isSelected` (optional): `boolean` - Specifies to show the line in the selected state.
- **Returns:** `boolean`
- **Description:** Draw line on an image.

### drawPath(pointColl, strokeWidth?, strokeColor?, isSelected?)
- **Parameters:**
  - `pointColl`: `Point[]` - Specifies collection of start and end x, y-coordinates of path.
  - `strokeWidth` (optional): `number` - Specifies the stroke width of path.
  - `strokeColor` (optional): `string` - Specifies the stroke color of path.
  - `isSelected` (optional): `boolean` - Specifies to show the path in the selected state.
- **Returns:** `boolean`
- **Description:** Draw path on an image.

### drawRectangle(x?, y?, width?, height?, strokeWidth?, strokeColor?, fillColor?, degree?, isSelected?, borderRadius?)
- **Parameters:**
  - `x` (optional): `number` - Specifies x-coordinate of rectangle.
  - `y` (optional): `number` - Specifies y-coordinate of rectangle.
  - `width` (optional): `number` - Specifies the width of the rectangle.
  - `height` (optional): `number` - Specifies the height of the rectangle.
  - `strokeWidth` (optional): `number` - Specifies the stroke width of rectangle.
  - `strokeColor` (optional): `string` - Specifies the stroke color of rectangle.
  - `fillColor` (optional): `string` - Specifies the fill color of the rectangle.
  - `degree` (optional): `number` - Specifies the degree to rotate the rectangle.
  - `isSelected` (optional): `boolean` - Specifies to show the rectangle in the selected state.
  - `borderRadius` (optional): `number` - Specifies the radius to apply border radius to rectangle.
- **Returns:** `boolean`
- **Description:** Draw a rectangle on an image.

### drawRedact(type?, x?, y?, width?, height?, value?)
- **Parameters:**
  - `type` (optional): `RedactType` - Specifies the type of redaction to be drawn on the image (blur or pixelate).
  - `x` (optional): `number` - Specifies x-coordinate of redaction.
  - `y` (optional): `number` - Specifies y-coordinate of redaction.
  - `width` (optional): `number` - Specifies the width of the redaction (default: 100).
  - `height` (optional): `number` - Specifies the height of the redaction (default: 50).
  - `value` (optional): `number` - Specifies the blur value for blur-type redaction or the pixel size for pixelate-type redaction (default: 20).
- **Returns:** `boolean`
- **Description:** Draw a redaction on an image.

### drawText(x?, y?, text?, fontFamily?, fontSize?, bold?, italic?, color?, isSelected?, degree?, fillColor?, strokeColor?, strokeWidth?, transformCollection?, underline?, strikethrough?)
- **Parameters:**
  - `x` (optional): `number` - Specifies x-coordinate of text.
  - `y` (optional): `number` - Specifies y-coordinate of text.
  - `text` (optional): `string` - Specifies the text to add on an image.
  - `fontFamily` (optional): `string` - Specifies the font family of the text.
  - `fontSize` (optional): `number` - Specifies the font size of the text.
  - `bold` (optional): `boolean` - Specifies whether the text is bold or not.
  - `italic` (optional): `boolean` - Specifies whether the text is italic or not.
  - `color` (optional): `string` - Specifies font color of the text.
  - `isSelected` (optional): `boolean` - Specifies to show the text in the selected state.
  - `degree` (optional): `number` - Specifies the degree to rotate the text.
  - `fillColor` (optional): `string` - Specifies the background Color of the text.
  - `strokeColor` (optional): `string` - Specifies the outline color of the text annotation.
  - `strokeWidth` (optional): `number` - Specifies the outline stroke width of the text annotation.
  - `transformCollection` (optional): `TransformationCollection[]` - Specifies the transform collection of the text annotation.
  - `underline` (optional): `boolean` - Specifies whether the text should be underlined.
  - `strikethrough` (optional): `boolean` - Specifies whether the text should have a strikethrough.
- **Returns:** `boolean`
- **Description:** Draw a text on an image.

### enableShapeDrawing(shapeType, isEnabled?)
- **Parameters:**
  - `shapeType`: `ShapeType` - Specifies the type of shape to be enabled or disabled for drawing.
  - `isEnabled` (optional): `boolean` - Specifies a value to indicate whether to enable or disable shape drawing (default: true).
- **Returns:** `void`
- **Description:** Enable or disable a shape drawing option in an Image Editor.

### enableTextEditing()
- **Returns:** `void`
- **Description:** Enable text area editing in the ImageEditor.

### export(type?, fileName?, imageQuality?)
- **Parameters:**
  - `type` (optional): `string` - Specifies a format of image to be saved.
  - `fileName` (optional): `string` - Specifies a file name to be saved.
  - `imageQuality` (optional): `number` - Specifies the quality of an image to be saved (default: 1).
- **Returns:** `void`
- **Description:** Export an image using the specified file name and the extension.

### finetuneImage(finetuneOption, value)
- **Parameters:**
  - `finetuneOption`: `ImageFinetuneOption` - Specifies the finetune options to be performed in the image.
  - `value`: `number` - Specifies the value for finetuning the image.
- **Returns:** `void`
- **Description:** Finetuning an image with the given type of finetune and its value in the image editor.

### flip(direction)
- **Parameters:**
  - `direction`: `Direction` - Specifies the direction to flip the image (Horizontal or Vertical).
- **Returns:** `void`
- **Description:** Flips an image by horizontally or vertically in the image editor.

### freehandDraw(value)
- **Parameters:**
  - `value`: `boolean` - Specifies a value whether to enable or disable freehand drawing.
- **Returns:** `void`
- **Description:** Enable or disable a freehand drawing in an Image Editor.

### getImageData()
- **Returns:** `ImageData`
- **Description:** Returns an image as ImageData to load it in to a canvas.

### getImageDimension()
- **Returns:** `Dimension`
- **Description:** Get the dimension of an image in the image editor such as x, y, width, and height. The method helps to get dimension after cropped an image.

### getImageFilter(filterOption)
- **Parameters:**
  - `filterOption`: `ImageFilterOption` - Specifies the filter options to the image.
- **Returns:** `string`
- **Description:** Update filter to the canvas in the ImageEditor.

### getRedacts()
- **Returns:** `RedactSettings[]`
- **Description:** Get all the shapes details which is drawn on an image editor.

### getShapeSetting(id)
- **Parameters:**
  - `id`: `string` - Specifies the shape id on an image.
- **Returns:** `ShapeSettings`
- **Description:** Get particular shapes details based on id of the shape which is drawn on an image editor.

### getShapeSettings()
- **Returns:** `ShapeSettings[]`
- **Description:** Get all the shapes details which is drawn on an image editor.

### open(url)
- **Parameters:**
  - `url`: `string | ImageData` - Specifies the URL or image data to open.
- **Returns:** `void`
- **Description:** Opens an image as URL or ImageData for editing in an image editor.

### pan(value, x?, y?)
- **Parameters:**
  - `value`: `boolean` - Specifies a value whether enable or disable panning.
  - `x` (optional): `number` - Specifies a value to pan the image horizontally.
  - `y` (optional): `number` - Specifies a value to pan the image vertically.
- **Returns:** `void`
- **Description:** Enable or disable a panning on the Image Editor.

### redo()
- **Returns:** `void`
- **Description:** Redo the last user action that was undone by the user or `undo` method.

### reset()
- **Returns:** `void`
- **Description:** Reset all the changes done in an image editor and revert to original image.

### resize(width, height, isAspectRatio?)
- **Parameters:**
  - `width`: `number` - Specifies the width of an image.
  - `height`: `number` - Specifies the height of an image.
  - `isAspectRatio` (optional): `boolean` - Specifies whether the scaling option is enabled or not.
- **Returns:** `boolean`
- **Description:** Resize an image by changing its width and height.

### rotate(degree)
- **Parameters:**
  - `degree`: `number` - Specifies a degree to rotate an image (positive for clockwise, negative for anti-clockwise).
- **Returns:** `boolean`
- **Description:** Rotate an image to clockwise and anti-clockwise.

### select(type, startX?, startY?, width?, height?)
- **Parameters:**
  - `type`: `string` - Specifies the shape (circle, square, custom selection, or pre-defined ratios).
  - `startX` (optional): `number` - Specifies the start x-coordinate point of the selection.
  - `startY` (optional): `number` - Specifies the start y-coordinate point of the selection.
  - `width` (optional): `number` - Specifies the width of the selection area.
  - `height` (optional): `number` - Specifies the height of the selection area.
- **Returns:** `void`
- **Description:** Perform selection in an image editor. The selection helps to crop an image.

### selectRedact(id)
- **Parameters:**
  - `id`: `string` - Specifies the shape id to select a redact on an image.
- **Returns:** `boolean`
- **Description:** Select a redaction based on the given redaction id.

### selectShape(id)
- **Parameters:**
  - `id`: `string` - Specifies the shape id to select a shape on an image.
- **Returns:** `boolean`
- **Description:** Select a shape based on the given shape id.

### sendBackward(shapeId)
- **Parameters:**
  - `shapeId`: `string` - Specifies the shape id to move the shape on an image.
- **Returns:** `void`
- **Description:** Moves a shape to behind one shape based on the given shape id.

### sendToBack(shapeId)
- **Parameters:**
  - `shapeId`: `string` - Specifies the shape id to move the shape on an image.
- **Returns:** `void`
- **Description:** Moves a shape to behind all other shapes based on the given shape id.

### straightenImage(degree)
- **Parameters:**
  - `degree`: `number` - The degree value specifying the amount of rotation for straightening the image (positive for clockwise, negative for counterclockwise).
- **Returns:** `boolean`
- **Description:** Straightens an image by rotating it clockwise or counterclockwise.

### undo()
- **Returns:** `void`
- **Description:** Reverse the last action which performed by the user in the Image Editor.

### update()
- **Returns:** `void`
- **Description:** To refresh the Canvas Wrapper.

### updateRedact(setting, isSelected?)
- **Parameters:**
  - `setting`: `RedactSettings` - Specifies the redact settings to be updated for the shape on an image.
  - `isSelected` (optional): `boolean` - Specifies to show the redacts in the selected state.
- **Returns:** `boolean`
- **Description:** This method is used to update the existing redacts by changing its height, width, blur, and pixel size in the component.

### updateShape(setting, isSelected?)
- **Parameters:**
  - `setting`: `ShapeSettings` - Specifies the shape settings to be updated for the shape on an image.
  - `isSelected` (optional): `boolean` - Specifies to show the shape in the selected state.
- **Returns:** `boolean`
- **Description:** This method is used to update the existing shapes by changing its height, width, color, and font styles in the component.

### zoom(zoomFactor, zoomPoint?)
- **Parameters:**
  - `zoomFactor`: `number` - The percentage-based zoom factor to use (e.g., 20 for 2x zoom).
  - `zoomPoint` (optional): `Point` - The point in the image editor to zoom in/out on.
- **Returns:** `void`
- **Description:** Zoom in or out on a point in the image editor.

---

## Events

### beforeSave
- **Type:** `EmitType<BeforeSaveEventArgs>`
- **Description:** Event callback that is raised before an image is saved.

### click
- **Type:** `EmitType<ImageEditorClickEventArgs>`
- **Description:** Event callback that is raised while clicking on an image in the Image Editor.

### created
- **Type:** `EmitType<Event>`
- **Description:** Event callback that is raised after rendering the Image Editor component.

### cropping
- **Type:** `EmitType<CropEventArgs>`
- **Description:** Event callback that is raised while cropping an image.

### destroyed
- **Type:** `EmitType<Event>`
- **Description:** Event callback that is raised once the component is destroyed with its elements and bound events.

### editComplete
- **Type:** `EmitType<EditCompleteEventArgs>`
- **Description:** Event callback that is triggered after the completion of an editing action in the image editor. This event occurs after the image editor canvas has been updated through actions such as cropping, drawing annotations, applying filters, fine-tuning, or other customizations.

### fileOpened
- **Type:** `EmitType<OpenEventArgs>`
- **Description:** Event callback that is raised once an image is opened in an Image Editor.

### finetuneValueChanging
- **Type:** `EmitType<FinetuneEventArgs>`
- **Description:** Event callback that is raised when applying fine tune to an image.

### flipping
- **Type:** `EmitType<FlipEventArgs>`
- **Description:** Event callback that is raised while flipping an image.

### frameChange
- **Type:** `EmitType<FrameChangeEventArgs>`
- **Description:** Event callback that is raised while applying frames on an image.

### imageFiltering
- **Type:** `EmitType<ImageFilterEventArgs>`
- **Description:** Event callback that is raised when applying filter to an image.

### panning
- **Type:** `EmitType<PanEventArgs>`
- **Description:** Event callback that is raised while panning an image.

### quickAccessToolbarItemClick
- **Type:** `EmitType<ClickEventArgs>`
- **Description:** Event callback that is raised once the quick access toolbar item is clicked.

### quickAccessToolbarOpen
- **Type:** `EmitType<QuickAccessToolbarEventArgs>`
- **Description:** Event callback that is raised when opening the quick access toolbar.

### resizing
- **Type:** `EmitType<ResizeEventArgs>`
- **Description:** Event callback that is raised while resizing an image.

### rotating
- **Type:** `EmitType<RotateEventArgs>`
- **Description:** Event callback that is raised while rotating an image.

### saved
- **Type:** `EmitType<SaveEventArgs>`
- **Description:** Event callback that is raised once an image is saved.

### selectionChanging
- **Type:** `EmitType<SelectionChangeEventArgs>`
- **Description:** Event callback that is raised while changing selection in an Image Editor.

### shapeChange
- **Type:** `EmitType<ShapeChangeEventArgs>`
- **Description:** Event callback that is raised after shape changing action is performed in an image editor.

### shapeChanging
- **Type:** `EmitType<ShapeChangeEventArgs>`
- **Description:** Event callback that is raised while changing shapes in an Image Editor.

### toolbarCreated
- **Type:** `EmitType<ToolbarEventArgs>`
- **Description:** Event callback that is raised once the toolbar is created.

### toolbarItemClicked
- **Type:** `EmitType<ClickEventArgs>`
- **Description:** Event callback that is raised once the toolbar item is clicked.

### toolbarUpdating
- **Type:** `EmitType<ToolbarEventArgs>`
- **Description:** Event callback that is raised while updating/refreshing the toolbar.

---

## Event Arguments Reference

### BeforeSaveEventArgs
Properties available when the `beforeSave` event is triggered.

### ImageEditorClickEventArgs
Properties available when the `click` event is triggered.

### CropEventArgs
Properties available when the `cropping` event is triggered.

### EditCompleteEventArgs
Properties available when the `editComplete` event is triggered.

### OpenEventArgs
Properties available when the `fileOpened` event is triggered.

### FinetuneEventArgs
Properties available when the `finetuneValueChanging` event is triggered.

### FlipEventArgs
Properties available when the `flipping` event is triggered.

### FrameChangeEventArgs
Properties available when the `frameChange` event is triggered.

### ImageFilterEventArgs
Properties available when the `imageFiltering` event is triggered.

### PanEventArgs
Properties available when the `panning` event is triggered.

### QuickAccessToolbarEventArgs
Properties available when the `quickAccessToolbarOpen` event is triggered.

### ResizeEventArgs
Properties available when the `resizing` event is triggered.

### RotateEventArgs
Properties available when the `rotating` event is triggered.

### SaveEventArgs
Properties available when the `saved` event is triggered.

### SelectionChangeEventArgs
Properties available when the `selectionChanging` event is triggered.

### ShapeChangeEventArgs
Properties available when the `shapeChange` or `shapeChanging` event is triggered.

### ToolbarEventArgs
Properties available when the `toolbarCreated` or `toolbarUpdating` event is triggered.

### ClickEventArgs
Properties available when the `toolbarItemClicked` or `quickAccessToolbarItemClick` event is triggered.

---

## Filter Types

### Available Image Filters

- **Cold** - Applies a cool blue tone
- **Warm** - Applies a warm orange tone
- **Chrome** - Applies a chrome effect
- **Sepia** - Applies a sepia tone
- **Invert** - Inverts the image colors
- **Grayscale** - Converts to grayscale
- **Black & White** - High contrast black and white

---

## Finetune Types

### Available Fine-tune Options

- **Brightness** - Adjust image brightness (-100 to 100)
- **Contrast** - Adjust image contrast (-100 to 100)
- **Saturation** - Adjust color saturation (-100 to 100)
- **Hue** - Adjust color hue (-180 to 180)
- **Exposure** - Adjust image exposure (-100 to 100)
- **Blur** - Apply blur effect (0 to higher values)
- **Opacity** - Adjust transparency (0 to 100)

---

## Shape Types

### Available Shape Types

- **Rectangle** - Draw rectangular shapes
- **Ellipse** - Draw elliptical/circular shapes
- **Line** - Draw straight lines
- **Arrow** - Draw arrows with customizable heads
- **Path** - Draw freehand paths
- **Text** - Add text annotations
- **Image** - Add image annotations
- **FreehandDraw** - Freehand drawing mode

---

## Frame Types

### Available Frame Types

- **Mat** - Traditional mat frame
- **Bevel** - Beveled edge frame
- **Line** - Simple line frame
- **Hook** - Hook style frame
- **Inset** - Inset style frame

---

## Direction Types

### Available Direction Values for Flip

- **Horizontal** - Flip horizontally
- **Vertical** - Flip vertically

---

## Selection Shapes

### Available Selection Types

- **Circle** - Circular selection
- **Square** - Square selection
- **Custom** - Custom rectangular selection
- **2:3** - Aspect ratio 2:3
- **3:2** - Aspect ratio 3:2
- **4:3** - Aspect ratio 4:3
- **16:9** - Aspect ratio 16:9
- **1:1** - Square aspect ratio
- And other common aspect ratios

---

## Export Format Types

### Supported Export Formats

- **png** - Portable Network Graphics
- **jpeg** - Joint Photographic Experts Group (with quality control)
- **svg** - Scalable Vector Graphics
- **webp** - Web Picture format
- **bmp** - Bitmap format

---

## Usage Examples

### Example 1: Using Events
```typescript
<ejs-imageeditor 
  #imageEditor
  (created)="onCreated()"
  (saved)="onSaved($event)"
  (editComplete)="onEditComplete($event)"
>
</ejs-imageeditor>

export class AppComponent {
  onCreated() {
    console.log('ImageEditor created');
  }

  onSaved(args: SaveEventArgs) {
    console.log('Image saved', args);
  }

  onEditComplete(args: EditCompleteEventArgs) {
    console.log('Edit complete', args);
  }
}
```

### Example 2: Setting Properties
```typescript
zoomSettings = {
  minZoomFactor: 1,
  maxZoomFactor: 100,
  zoomFactor: 1,
  zoomTrigger: ZoomTrigger.MouseWheel | ZoomTrigger.Pinch,
  zoomPoint: new Point { x: 500, y: 500 }
};

finetuneSettings = {
  brightness: { min: -100, max: 100, defaultValue: 0 },
  contrast: { min: -100, max: 100, defaultValue: 0 },
  saturation: { min: -100, max: 100, defaultValue: 0 }
};

uploadSettings = {
  allowedExtensions: ['.jpg', '.png', '.gif'],
  minFileSize: 5000,
  maxFileSize: 5000000
};

toolbar = [
  'Open', 'Undo', 'Redo', 'Crop', 'Annotate', 
  'Finetune', 'Filter', 'Frame', 'Redact', 'Resize', 
  'Save', 'Reset'
];
```

---

## Related References

For more information on specific features, refer to:
- [Getting Started](getting-started.md) - Installation and setup
- [Annotations](annotations.md) - Drawing annotations
- [Selection and Cropping](selection-and-cropping.md) - Selection tools
- [Transformations](transform.md) - Rotate, flip, zoom
- [Filters and Fine-tuning](filter-and-finetune.md) - Color adjustments
- [Toolbar Customization](toolbar.md) - Customize toolbar
- [Accessibility](accessibility.md) - WCAG compliance
