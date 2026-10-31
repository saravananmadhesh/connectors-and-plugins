# Image Editor — API Reference

Comprehensive API reference for `ImageEditor` from @syncfusion/ej2-image-editor. Includes all public properties, methods, events, and key related model / event-arg interfaces. Source: https://ej2.syncfusion.com/documentation/api/image-editor/index-default

---

## Summary
- Component: `ImageEditor`
- Package: `@syncfusion/ej2-image-editor`

---

## Properties

- `allowUndoRedo: boolean` — Enables undo/redo operations.
  - Default: `true`

- `cssClass: string` — One or more CSS classes to customize appearance.
  - Default: `''`

- `disabled: boolean` — Whether the component is disabled.
  - Default: `false`

- `finetuneSettings: FinetuneSettingsModel` — Fine-tune configuration (brightness, contrast, saturation, blur, exposure, hue, opacity).
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/finetunesettingsmodel

- `fontFamily: FontFamilyModel[]` — Predefined font families for text annotations.

- `height: string` — Height of the editor.
  - Default: `'100%'

- `imageSmoothingEnabled: boolean` — Whether image smoothing is applied when rendering.
  - Default: `false`

- `locale: string` — Locale override for component.
  - Default: `''`

- `quickAccessToolbarTemplate: string | Function` — Template for quick access toolbar.
  - Default: `null`

- `selectionSettings: SelectionSettingsModel` — Selection (crop) related options (fillColor, strokeColor, showCircle).
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/selectionsettingsmodel

- `showQuickAccessToolbar: boolean` — Show/hide quick access toolbar.
  - Default: `true`

- `theme: string | Theme` — Theme setting that determines appearance.
  - Default: `Theme.Bootstrap5`

- `toolbar: (string | ItemModel)[]` — Items for toolbar. If omitted, a default set of commands renders. If empty array, toolbar is not rendered.
  - Default: `null` (renders default toolbar)

- `toolbarTemplate: string | Function` — Custom toolbar template. If defined, `toolbar` is ignored.
  - Default: `null`

- `uploadSettings: UploadSettingsModel` — Settings for image upload restrictions.
  - Properties: `allowedExtensions`, `minFileSize`, `maxFileSize`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/uploadsettingsmodel

- `width: string` — Width of the editor.
  - Default: `'100%'

- `zoomSettings: ZoomSettingsModel` — Zoom configuration (`minZoomFactor`, `maxZoomFactor`, `zoomFactor`, `zoomTrigger`, `zoomPoint`).
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/zoomsettingsmodel

---

## Methods (public API)

Each method description lists parameters and return value.

- `addEventListener(eventName: string, handler: Function): void` — Adds an event listener.

- `appendTo(selector?: string | HTMLElement): void` — Appends the control to the given element.

- `apply(): void` — Apply performed operations such as annotation drawings.

- `applyImageFilter(filterOption: ImageFilterOption): void` — Apply a given filter option to the canvas.

- `bringForward(shapeId: string): void` — Move shape forward by one position.

- `bringToFront(shapeId: string): void` — Move shape to front of all shapes.

- `canRedo(): boolean` — Returns whether redo is possible.

- `canUndo(): boolean` — Returns whether undo is possible.

- `clearImage(): void` — Clears the loaded image from editor.

- `clearSelection(resetCrop?: boolean): void` — Clears current selection. `resetCrop` resets last cropped image when true.

- `cloneShape(shapeId: string): boolean` — Duplicate a shape by id; returns success boolean.

- `crop(): boolean` — Crops image using current selection; returns boolean success.

- `dataBind(): void` — Apply pending property changes.

- `deleteRedact(id: string): void` — Deletes a redact by id.

- `deleteShape(id: string): void` — Deletes a shape by id.

- `discard(): void` — Discard operations (like drawings) not yet applied.

- `drawArrow(startX?: number, startY?: number, endX?: number, endY?: number, strokeWidth?: number, strokeColor?: string, arrowStart?: ArrowheadType, arrowEnd?: ArrowheadType, isSelected?: boolean): boolean` — Draw arrow annotation.

- `drawEllipse(x?: number, y?: number, radiusX?: number, radiusY?: number, strokeWidth?: number, strokeColor?: string, fillColor?: string, degree?: number, isSelected?: boolean): boolean` — Draw ellipse annotation.

- `drawFrame(frameType: FrameType, color?: string, gradientColor?: string, size?: number, inset?: number, offset?: number, borderRadius?: number, frameLineStyle?: FrameLineStyle, lineCount?: number): boolean` — Draw decorative frame.

- `drawImage(data: string | ImageData, x?: number, y?: number, width?: number, height?: number, isAspectRatio?: boolean, degree?: number, opacity?: number, isSelected?: boolean): boolean` — Draw image annotation.

- `drawLine(startX?: number, startY?: number, endX?: number, endY?: number, strokeWidth?: number, strokeColor?: string, isSelected?: boolean): boolean` — Draw line annotation.

- `drawPath(pointColl: Point[], strokeWidth?: number, strokeColor?: string, isSelected?: boolean): boolean` — Draw path/freehand annotation.

- `drawRectangle(x?: number, y?: number, width?: number, height?: number, strokeWidth?: number, strokeColor?: string, fillColor?: string, degree?: number, isSelected?: boolean, borderRadius?: number): boolean` — Draw rectangle annotation.

- `drawRedact(type?: RedactType, x?: number, y?: number, width?: number, height?: number, value?: number): boolean` — Draw a redact (blur/pixelate).

- `drawText(x?: number, y?: number, text?: string, fontFamily?: string, fontSize?: number, bold?: boolean, italic?: boolean, color?: string, isSelected?: boolean, degree?: number, fillColor?: string, strokeColor?: string, strokeWidth?: number, transformCollection?: TransformationCollection[], underline?: boolean, strikethrough?: boolean): boolean` — Draw text annotation.

- `enableShapeDrawing(shapeType: ShapeType, isEnabled?: boolean): void` — Enable/disable drawing of a shape type.

- `enableTextEditing(): void` — Enable text-edit area for text annotations.

- `export(type?: string, fileName?: string, imageQuality?: number): void` — Export the image with format, file name, and quality.

- `finetuneImage(finetuneOption: ImageFinetuneOption, value: number): void` — Apply fine-tune adjustments.

- `flip(direction: Direction): void` — Flip image horizontally or vertically.

- `freehandDraw(value: boolean): void` — Enable/disable freehand drawing mode.

- `getImageData(): ImageData` — Returns current image as `ImageData`.

- `getImageDimension(): Dimension` — Returns current image dimensions (`x`, `y`, `width`, `height`).

- `getImageFilter(filterOption: ImageFilterOption): string` — Update/get filter data applied to image; returns string.

- `getRedacts(): RedactSettings[]` — Return all redaction shapes.

- `getRootElement(): HTMLElement` — Returns the root DOM element of the component.

- `getShapeSetting(id: string): ShapeSettings` — Get shape details for given id.

- `getShapeSettings(): ShapeSettings[]` — Return all shapes drawn on the image.

- `open(fileOrUrl: string | ImageData | File): void` — Open an image for editing.

- `pan(value: boolean, x?: number, y?: number): void` — Enable/disable panning or pan to x/y.

- `redo(): void` — Redo last undone action.

- `refresh(): void` — Re-render component and apply pending property updates.

- `removeEventListener(eventName: string, handler: Function): void` — Remove an event listener.

- `reset(): void` — Reset all changes and restore original image.

- `resize(width: number, height: number, isAspectRatio?: boolean): boolean` — Resize image dimensions.

- `rotate(degree: number): boolean` — Rotate image by degree (positive clockwise, negative anti-clockwise).

- `select(type: string, startX?: number, startY?: number, width?: number, height?: number): void` — Perform selection for cropping. `type` may be ratio or custom shape.

- `selectRedact(id: string): boolean` — Select a redact by id.

- `selectShape(id: string): boolean` — Select a shape by id.

- `sendBackward(shapeId: string): void` — Move shape backward by one position.

- `sendToBack(shapeId: string): void` — Move shape to back of all shapes.

- `straightenImage(degree: number): boolean` — Straighten image by rotating a small degree.

- `undo(): void` — Undo last action.

- `update(): void` — Refresh internal canvas wrapper.

- `updateRedact(setting: RedactSettings, isSelected?: boolean): boolean` — Update redact settings.

- `updateShape(setting: ShapeSettings, isSelected?: boolean): boolean` — Update a shape's settings.

- `zoom(zoomFactor: number, zoomPoint?: Point): void` — Zoom in/out on a point.

- `Inject(moduleList: Function[]): void` — Dynamically inject required modules to the component.

---

## Events

Events fire with specific argument interfaces. All events are cancelable where documented.

- `beforeSave: EmitType<BeforeSaveEventArgs>` — Raised before an image is saved. Args: `cancel`, `fileName`, `fileType`, `imageQuality`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/beforesaveeventargs

- `click: EmitType<ImageEditorClickEventArgs>` — Raised on click inside the image editor. Args: `{ point: Point }`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/imageeditorclickeventargs

- `created: EmitType<Event>` — Raised after the Image Editor is rendered.

- `cropping: EmitType<CropEventArgs>` — Raised while cropping. Args include `cancel`, `startPoint`, `endPoint`, `preventScaling`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/cropeventargs

- `destroyed: EmitType<Event>` — Raised when component is destroyed.

- `editComplete: EmitType<EditCompleteEventArgs>` — Triggered after completion of edit actions (crop, draw, filter, finetune). Args include `action`, `actionEventArgs`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/editcompleteeventargs

- `fileOpened: EmitType<OpenEventArgs>` — Raised when an image is opened. Args: `fileName`, `fileType`, `isValidImage`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/openeventargs

- `finetuneValueChanging: EmitType<FinetuneEventArgs>` — Raised while finetune value changes. Args: `cancel`, `finetune`, `value`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/finetuneeventargs

- `flipping: EmitType<FlipEventArgs>` — Raised while flipping an image. Args: `cancel`, `direction`, `previousDirection`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/flipeventargs

- `frameChange: EmitType<FrameChangeEventArgs>` — Raised while applying/changing a frame. Args: `cancel`, `currentFrameSetting`, `previousFrameSetting`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/framechangeeventargs

- `imageFiltering: EmitType<ImageFilterEventArgs>` — Raised when applying filters. Args: `cancel`, `filter`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/imagefiltereventargs

- `panning: EmitType<PanEventArgs>` — Raised while panning (start/end points). Args: `cancel`, `startPoint`, `endPoint`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/paneventargs

- `quickAccessToolbarItemClick: EmitType<ClickEventArgs>` — Raised on quick access toolbar item click.

- `quickAccessToolbarOpen: EmitType<QuickAccessToolbarEventArgs>` — Raised when quick access toolbar opens. Args include `cancel`, `shape`, `toolbarItems`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/quickaccesstoolbareventargs

- `resizing: EmitType<ResizeEventArgs>` — Raised while resizing an image. Args include `cancel`, `width`, `height`, `isAspectRatio`, `previousWidth`, `previousHeight`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/resizeeventargs

- `rotating: EmitType<RotateEventArgs>` — Raised while rotating. Args: `cancel`, `currentDegree`, `previousDegree`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/rotateeventargs

- `saved: EmitType<SaveEventArgs>` — Raised once an image is saved. Args: `fileName`, `fileType`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/saveeventargs

- `selectionChanging: EmitType<SelectionChangeEventArgs>` — Raised while selection changes. Args: `action`, `currentSelectionSettings`, `previousSelectionSettings`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/selectionchangeeventargs

- `shapeChange: EmitType<ShapeChangeEventArgs>` — Raised after shape change actions. Args include `action`, `currentShapeSettings`, `previousShapeSettings`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/shapechangeeventargs

- `shapeChanging: EmitType<ShapeChangeEventArgs>` — Raised while shapes are changing. Uses same args interface.

- `toolbarCreated: EmitType<ToolbarEventArgs>` — Raised once the toolbar is created. Args include `cancel`, `item`, `toolbarItems`, `toolbarType`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/toolbareventargs

- `toolbarItemClicked: EmitType<ClickEventArgs>` — Raised on toolbar item click.

- `toolbarUpdating: EmitType<ToolbarEventArgs>` — Raised while updating/refreshing the toolbar.

- `zooming: EmitType<ZoomEventArgs>` — Raised while zooming. Args include `cancel`, `currentZoomFactor`, `previousZoomFactor`, `zoomPoint`, `zoomTrigger`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/zoomeventargs

---

## Key Model & Event-Arg Interfaces (selected, for convenience)

- `BeforeSaveEventArgs`
  - `cancel: boolean`
  - `fileName: string`
  - `fileType: FileType`
  - `imageQuality: number`
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/beforesaveeventargs

- `CropEventArgs`
  - `cancel: boolean`
  - `startPoint: Point`
  - `endPoint: Point`
  - `preventScaling: boolean`
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/cropeventargs

- `OpenEventArgs`
  - `fileName: string`
  - `fileType: FileType`
  - `isValidImage: boolean`
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/openeventargs

- `EditCompleteEventArgs`
  - `action: string`
  - `actionEventArgs: object | RotateEventArgs | FlipEventArgs | CropEventArgs | FinetuneEventArgs | FrameChangeEventArgs | ImageFilterEventArgs | PanEventArgs | ResizeEventArgs | ShapeChangeEventArgs | ZoomEventArgs`
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/editcompleteeventargs

- `ShapeChangeEventArgs`
  - `action: string`
  - `allowShapeOverflow: boolean`
  - `cancel: boolean`
  - `currentShapeSettings: ShapeSettings`
  - `previousShapeSettings: ShapeSettings`
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/shapechangeeventargs

- `ShapeSettings`
  - `id: string`, `type: ShapeType`, `x`, `y`, `width`, `height`, `strokeColor`, `strokeWidth`, `fillColor`, `opacity`, `degree`, `text`, `fontFamily`, `fontSize`, `fontStyle`, `points`, `imageData`, `transformCollection`, `index`, etc.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/shapesettings

- `RedactSettings`
  - `id: string`, `type: RedactType`, `startX`, `startY`, `width`, `height`, `blurIntensity`, `pixelSize`
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/redactsettings

- `ZoomSettingsModel`
  - `minZoomFactor`, `maxZoomFactor`, `zoomFactor`, `zoomPoint`, `zoomTrigger`
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/zoomsettingsmodel

- `FinetuneSettingsModel`
  - `brightness`, `contrast`, `saturation`, `hue`, `exposure`, `opacity`, `blur` — each an `ImageFinetuneValue` describing `min`, `max`, `defaultValue`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/finetunesettingsmodel

- `UploadSettingsModel`
  - `allowedExtensions: string`, `minFileSize: number`, `maxFileSize: number`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/uploadsettingsmodel

- `SelectionSettingsModel`
  - `fillColor: string`, `showCircle: boolean`, `strokeColor: string`.
  - See: https://ej2.syncfusion.com/documentation/api/image-editor/selectionsettingsmodel

---

## Usage Notes & Examples (concise)

- Initialization:

```ts
import { ImageEditor } from '@syncfusion/ej2-image-editor';

const editor = new ImageEditor({
  width: '600px',
  height: '400px',
  toolbar: ['Open','Save','Crop','Rotate','Flip','Undo','Redo']
});
editor.appendTo('#imageeditor');
```

- Programmatic crop:

```ts
editor.select('16:9', 10, 10);
editor.crop();
```

- Draw text:

```ts
const dim = editor.getImageDimension();
editor.drawText(dim.x + 20, dim.y + 20, 'Hello', 'Arial', 20, false, false, '#000');
```

- Apply fine-tune:

```ts
editor.finetuneImage('brightness', 20);
```

---

## References
- Official API index: https://ej2.syncfusion.com/documentation/api/image-editor/index-default
- Individual type docs linked inline above for event args and models.



<!-- End of api.md -->