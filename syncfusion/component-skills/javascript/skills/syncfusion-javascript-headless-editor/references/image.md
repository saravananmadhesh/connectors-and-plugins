# Image

The `imageExtension` registers the `image` block and `imageInline` inline nodes for rendering images as `<figure>` with `<img>` (block) or `<img>` (inline) elements.

## Table of Contents

- [Register the extension](#register-the-extension)
- [Node attributes](#node-attributes)
- [Configure image options](#configure-image-options)
- [Commands](#commands)
  - [Insert and remove](#insert-and-remove)
  - [Layout and dimension](#layout-and-dimension)
  - [Captions](#captions)
  - [Resize events](#resize-events)
- [API references](#api-references)
  - [ImageOptions](#imageoptions)
  - [ImageResizeOptions](#imageresizeoptions)
  - [ImageUIContribution](#imageuicontribution)
  - [ImageUINodeViewFactory](#imageuinodeviewfactory)
  - [Image enums](#image-enums)
  - [InsertImagePayload](#insertimagepayload)
  - [Resize event payloads](#resize-event-payloads)
  - [ResizableNodeView](#resizablenodeview)
  - [Image-upload position helpers](#image-upload-position-helpers)

## Register the extension

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, imageExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [imageExtension]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Node attributes

The `image` and `imageInline` nodes share the same attribute set:

| Attribute | Description | Default |
|-----------|-------------|---------|
| `src` | Image source URL (HTTP, HTTPS, or data URI). | `''` |
| `alt` | Alternative text displayed when the image fails to load (accessibility). | `''` |
| `title` | Tooltip text shown on hover. | `''` |
| `width` | Image width in pixels. | `null` |
| `height` | Image height in pixels. | `null` |
| `display` | Display mode: `block` (standalone figure) or `inline` (flows with text). | `'block'` |
| `align` | Horizontal alignment for block images (`left`, `center`, `right`, or `none`). | `'none'` |
| `wrap` | Text wrapping for block images (`left`, `right`, or `none`). | `'none'` |
| `caption` | Whether the image renders an editable caption. | `false` |

## Configure image options

The `image` extension exposes options for default image behavior, persistence, and resize handles:

| Option | Description | Default |
|--------|-------------|---------|
| `allowBase64` | Allow pasted or dropped images to keep their base64 payload as `src`. | `true` |
| `htmlAttributes` | Static HTML attributes merged onto every inserted `<img>` element. | `{}` |
| `saveFormat` | Persistence format for image references: `blob` (Blob URL) or `base64` (inline data URI). | `'blob'` |
| `display` | Default display mode for newly inserted images. | `'block'` |
| `align` | Default horizontal alignment for newly inserted images. | `'none'` |
| `wrap` | Default text wrapping for newly inserted images. | `'none'` |
| `resize` | Configure image resizing. Set to `false` to disable drag handles, or provide an `ImageResizeOptions` object. | `{ enabled: true, alwaysPreserveAspectRatio: true }` |

`ImageResizeOptions` accepts the following fields:

| Field | Description | Default |
|-------|-------------|---------|
| `enabled` | When `true`, drag-to-resize handles are rendered on image node views. | `true` |
| `alwaysPreserveAspectRatio` | When `true`, the engine preserves the aspect ratio on every handle. When `false`, holding <kbd>Shift</kbd> toggles aspect lock interactively. | `true` |
| `directions` | Whitelist of resize directions to render handles for (for example, `top-left`, `top-right`, `bottom-left`, `bottom-right`). | All four corners |
| `minWidth` | Minimum allowed width in pixels during a resize drag. | `8` |
| `minHeight` | Minimum allowed height in pixels during a resize drag. | `8` |

```html
<div id="editor"></div>
```

```ts
import { HeadlessEditor, imageExtension } from '@syncfusion/ej2-headless-editor';

const editor = HeadlessEditor.create({
    extensions: [
        imageExtension.configure({
            display: 'block',
            align: 'none',
            wrap: 'none',
            resize: {
                enabled: true,
                directions: ['bottom-right'],
                alwaysPreserveAspectRatio: true,
                minWidth: 50,
                minHeight: 50
            }
        })
    ]
});
editor.mount(document.getElementById('editor') as HTMLElement);
```

## Commands

### Insert and remove

| Command | Description |
|---------|-------------|
| `insertImage(payload)` | Inserts one or more images at the current cursor position. Accepts a single `InsertImagePayload` or an array of payloads for batch insertion. |
| `removeImage()` | Removes the selected image from the document. |
| `updateImage(payload)` | Updates properties of the selected image. Each payload field is optional; only supplied fields are applied. |

`InsertImagePayload` accepts the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `src` | `string` | Image source URL (HTTP, HTTPS, or data URI). Required. |
| `alt` | `string` | Alternative text for accessibility. |
| `title` | `string` | Tooltip text. |
| `width` | `number` | Image width in pixels. |
| `height` | `number` | Image height in pixels. |
| `display` | `'block'` \| `'inline'` | Display mode for the new image. |
| `align` | `'left'` \| `'center'` \| `'right'` \| `'none'` | Horizontal alignment. |
| `wrap` | `'left'` \| `'right'` \| `'none'` | Text wrapping. |
| `caption` | `string` | Caption text rendered below the image. |
| `attributes` | `Record<string, string>` | Custom HTML attributes (for example, `data-*`, `class`). |

`UpdateImagePayload` accepts `src`, `alt`, `title`, `width`, `height`, and `attributes`.

### Layout and dimension

| Command | Description |
|---------|-------------|
| `setImageAlign({ align })` | Sets the horizontal alignment of the selected image. Accepted values: `left`, `center`, `right`, `none`. Clears any active text wrapping. |
| `setImageWrap({ wrap })` | Sets the text wrapping of the selected image. Accepted values: `left`, `right`, `none`. Clears any active alignment when wrapping is enabled. |
| `setImageDisplay({ mode })` | Converts the selected image between block and inline display modes. Accepted values: `block`, `inline`. |
| `setImageDimension({ width?, height? })` | Updates the `width` and `height` attributes of the selected image. Pass `null` to clear a dimension. |

### Captions

| Command | Description |
|---------|-------------|
| `addCaption({ caption? })` | Adds an editable caption to the selected image. When the selection is an inline image, it is first converted to a block image. Accepts an optional `caption` string; if omitted or empty, the placeholder text `Insert caption` is used and the cursor is placed inside the caption. |
| `removeCaption()` | Removes the caption text and disables the `caption` attribute on the selected image. |
| `toggleCaption({ caption? })` | Toggles the caption on the selected image. When a caption already exists, it is removed; otherwise, a new one is added. Accepts the same optional `caption` payload as `addCaption` to seed the new caption text. |

The optional `caption` payload for `addCaption` and `toggleCaption` is `CaptionPayload`:

| Field | Type | Description |
|-------|------|-------------|
| `caption` | `string` | Initial text for the new caption. When omitted or whitespace-only, the placeholder text `Insert caption` is used. |

```ts
// Insert a single block image
editor.commands.insertImage({
    src: 'https://example.com/photo.png',
    alt: 'Example photo',
    width: 400,
    height: 300,
    display: 'block'
});

// Insert multiple images at once
editor.commands.insertImage([
    { src: 'image1.png', alt: 'First image' },
    { src: 'image2.png', alt: 'Second image' }
]);

// Update the alt text of the selected image
editor.commands.updateImage({ alt: 'Updated alt text' });

// Float the selected image to the left with text wrapping
editor.commands.setImageWrap({ wrap: 'left' });

// Resize the selected image programmatically
editor.commands.setImageDimension({ width: 600, height: 400 });

// Convert the selected image to inline display
editor.commands.setImageDisplay({ mode: 'inline' });

// Add a caption with custom text
editor.commands.addCaption({ caption: 'Sunset over the lake' });

// Add a caption with the default placeholder text
editor.commands.addCaption();

// Toggle a caption, seeding it with text when adding
editor.commands.toggleCaption({ caption: 'Figure 1' });
```

### Resize events

When `resize.enabled` is `true`, the extension emits lifecycle events during user drag interactions:

| Event | Payload |
|-------|---------|
| `resize-start` | Initial dimensions and event coordinates. |
| `resizing` | Updated dimensions as the drag progresses. |
| `resize-stop` | Final dimensions when the drag completes. |

The final `width` and `height` are persisted to the image attributes when resizing is completed.

## API references

This section documents the image-related public API surface — extension options, command payloads, and other types specific to this node.

### ImageOptions

`ImageOptions` — top-level configuration options consumed by the Image extension.

| Property | Type | Description |
|----------|------|-------------|
| `addNodeView` | `Object` | Optional custom NodeView UI factory for rendering product-supplied status UI around block image nodes (upload progress, badges, etc.). Invoked once per editor mount (never per-node remount — same factory discipline as the CodeBlock `addNodeView`). The returned record is keyed by node type name; only the `image` (block) entry is consumed. The extension continues to own the `<img>` structure, composition, and lifecycle — the product contributes only its UI subtree. |
| `align` | `ImageAlign` | Default horizontal alignment for newly inserted images. |
| `allowBase64` | `boolean` | Allow pasted/dropped images to keep their base64 payload as `src`. |
| `display` | `ImageDisplayMode` | Default display mode for newly inserted images. |
| `htmlAttributes` | `Record` | Static HTML attributes merged onto every inserted `<img>` element. |
| `resize` | `ImageResizeOptions \| false` | Configures image resizing behavior for block and inline images. When enabled, resize handles are added to both `image` and `imageInline` node views. Consumers can configure the available resize directions, minimum dimensions, and aspect-ratio preservation. Resizing emits the `resizeStart`, `resizing`, and `resizeStop` lifecycle events. The final width and height are persisted to the image attributes when resizing is completed. |
| `saveFormat` | `SaveFormatType` | How inserted images should be persisted. |
| `wrap` | `ImageWrap` | Default text wrapping for newly inserted images. |

### ImageResizeOptions

`ImageResizeOptions` — resizable behavior configuration supplied to the image extension. Lets consumers configure which directions are resizable, the lower size bound, and whether the image's aspect ratio should always be preserved.

| Property | Type | Description |
|----------|------|-------------|
| `alwaysPreserveAspectRatio` | `boolean` | When `true`, the engine preserves the image's aspect ratio on every resize handle. When `false`, holding <kbd>Shift</kbd> toggles aspect lock interactively. |
| `directions` | `ResizableNodeViewDirection[]` | Whitelist of resize directions to render handles for. When omitted, the engine default (`top-left`, `top-right`, `bottom-left`, `bottom-right`) is used. |
| `enabled` | `boolean` | Master switch. When `false`, the resizable engine never mounts handles on image node views (no-op for that view). |
| `minHeight` | `number` | Minimum allowed height in pixels during a resize drag. Falls back to the engine default (8 px) when `undefined`. |
| `minWidth` | `number` | Minimum allowed width in pixels during a resize drag. Falls back to the engine default (8 px) when `undefined`. |

### ImageUIContribution

`ImageUIContribution` — UI contribution returned by the product's per-node factory. The extension composes this into the final NodeView; the product never owns or recreates the image structure itself.

| Property | Type | Description |
|----------|------|-------------|
| `dom` | `HTMLElement` | Product-owned UI element (progress bar, status badge, controls, etc.). |
| `placement` | `ImageUIPlacement` | Slot placement relative to the image. Default `'top-right'`. |

#### Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `destroy()` | Called when the NodeView is destroyed so the product can clean up widgets. | `void` |
| `onUploadState()` | Push callback invoked on every upload-state change for this image. Receives an immediate snapshot at NodeView construction and every subsequent runtime update. Progress updates never touch the document. | `void` |

### ImageUINodeViewFactory

`ImageUINodeViewFactory` — per-node factory supplied through `ImageOptions.addNodeView`. Same shape as the extension NodeView constructor contract.

| Parameter | Name | Type |
|-----------|------|------|
| | `attrs` | `Record` |
| | `view` | `unknown` |
| | `getPos` | `Object` |

### Image enums

#### ImageAlign

`ImageAlign` — horizontal alignment for block images. `none` honors the editor's default text-align (typically left).

`left`, `center`, `right`, `none`

#### ImageDisplayMode

`ImageDisplayMode` — image display modes supported by image nodes. `block`: image occupies its own line, like a standalone figure. `inline`: image flows with surrounding text.

`block`, `inline`

#### ImageUIPlacement

`ImageUIPlacement` — placement of the product UI slot relative to the image. Applied by the extension via a stable CSS class on the UI slot element.

`top-left`, `top-center`, `top-right`, `center-left`, `center`, `center-right`, `bottom-left`, `bottom-center`, `bottom-right`

#### ImageWrap

`ImageWrap` — text wrapping behavior. Wrapped images float so surrounding text flows around them; `none` keeps the image on its own line.

`left`, `right`, `none`

#### SaveFormatType

`SaveFormatType` — persistence format used when the editor saves an image reference. `blob`: store as a Blob URL (recommended; survives serialization). `base64`: inline as `data:image/...;base64,...` (portable but heavy).

`blob`, `base64`

### InsertImagePayload

`InsertImagePayload` — payload for the `insertImage` command. Inserts one or more images at the current cursor position. Can accept a single image payload or an array of payloads for batch insertion.

| Property | Type | Description |
|----------|------|-------------|
| `align` | `ImageAlign` | Horizontal alignment for block images: `left`, `center`, `right`, `none`. |
| `alt` | `string` | Alternative text displayed when image fails to load (accessibility). |
| `attributes` | `Record` | Custom HTML attributes applied to the image element (e.g., `data-*`, `class`). |
| `caption` | `string` | Optional caption text displayed below the image. |
| `display` | `ImageDisplayMode` | Display mode: `block` (standalone line) or `inline` (flows with text). |
| `height` | `number` | Image height in pixels. |
| `src` | `string` | Image source URL (HTTP, HTTPS, or data URI). |
| `title` | `string` | Title text shown in image tooltip. |
| `width` | `number` | Image width in pixels (constrained by editor max-width). |
| `wrap` | `ImageWrap` | Text wrapping: `left`, `right` (float), or `none` (standalone). |

### Resize event payloads

#### ResizeEventArgs

`ResizeEventArgs` — Common arguments for resize lifecycle events.

| Property | Type | Description |
|----------|------|-------------|
| `currentHeight` | `number` | The current height of the element in pixels. |
| `currentWidth` | `number` | The current width of the element in pixels. |
| `element` | `HTMLElement` | The DOM element being resized. |
| `nodeType` | `string` | The schema node type associated with the element being resized. |

#### ResizeStartEventArgs

`ResizeStartEventArgs` — Arguments supplied when a resize operation starts. Set `cancel` to `true` to prevent the operation from starting.

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Prevents the resize operation when set to `true`. |
| `currentHeight` | `number` | The current height of the element in pixels. |
| `currentWidth` | `number` | The current width of the element in pixels. |
| `element` | `HTMLElement` | The DOM element being resized. |
| `nodeType` | `string` | The schema node type associated with the element being resized. |

#### ResizeStopEventArgs

`ResizeStopEventArgs` — Arguments supplied when a resize operation completes.

| Property | Type | Description |
|----------|------|-------------|
| `currentHeight` | `number` | The current height of the element in pixels. |
| `currentWidth` | `number` | The current width of the element in pixels. |
| `element` | `HTMLElement` | The DOM element being resized. |
| `nodeType` | `string` | The schema node type associated with the element being resized. |
| `originalHeight` | `number` | The height captured when the resize operation started, in pixels. |
| `originalWidth` | `number` | The width captured when the resize operation started, in pixels. |

#### ResizingEventArgs

`ResizingEventArgs` — Arguments supplied during an active resize operation.

| Property | Type | Description |
|----------|------|-------------|
| `currentHeight` | `number` | The current height of the element in pixels. |
| `currentWidth` | `number` | The current width of the element in pixels. |
| `element` | `HTMLElement` | The DOM element being resized. |
| `nodeType` | `string` | The schema node type associated with the element being resized. |

### ResizableNodeView

`ResizableNodeView` — pure-DOM resize engine for the Headless Editor. Provides in-place drag-based resizing for atom nodes (images, videos, embeds) without any dependency on ProseMirror or external libraries. The wrapper is PM-free and can be used standalone in any HTML environment.

**Usage:**
- Wrap an element with `ResizableNodeView`
- Provide an `onResizeStop` callback to persist the new dimensions (e.g., via `editor.commands.updateImage()`)
- Optionally provide `onResize` and `onResizeStart` callbacks for interim feedback
- Call `setSelected(true)` when the PM node is selected to show resize handles
- Call `destroy()` when the node is removed to clean up listeners

**Features:**
- Multiple drag handle directions (configurable: top-left, top-right, bottom-left, bottom-right)
- Minimum and maximum size constraints
- Aspect ratio preservation option
- Custom handle templates via `createCustomHandle()`
- Keyboard support (arrow keys + Shift for fine tuning, Escape to cancel)
- Touch and mouse event support
- CSS class-based styling (configurable: wrapper, handle, resizing, selected states)

#### ResizableNodeView (instance)

| Property | Type | Description |
|----------|------|-------------|
| `contentElement` | `HTMLElement \| null` | Public: optional content slot for consumers with editable children. |
| `element` | `HTMLElement` | The wrapped element passed at construction. |
| `wrapper` | `HTMLElement` | Public: wrapper element, also returned as `NodeView` `dom`. Always non-null after construction. |

| Method | Description | Returns |
|--------|-------------|---------|
| `selectNode()` | NodeView `selectNode`: show resize handles and apply the `selected` class. Handles are only rendered when editing is also enabled (not read-only). | `void` |
| `deselectNode()` | NodeView `deselectNode`: hide resize handles and remove the `selected` class. Any in-flight drag is allowed to finish naturally; handles are removed after. | `void` |
| `update(attrs)` | Re-seeds engine size from new `attrs` and applies it to the wrapped element's inline style. Always returns `true` (the engine never rejects updates; consumer-side filtering lives in the NodeView bridge). | `boolean` |
| `ignoreMutation(_mutation)` | Returns `true` for every mutation observed inside the engine's wrapper, so PM never remounts the NodeView due to inline `style.width` / `style.height` writes during drag, handle DOM insertions/removals during `setEnabled`, or any host-app tool that mutates the wrapper. | `boolean` |
| `destroy()` | Tears down every listener, removes every handle, cancels any in-flight drag, and removes the wrapper from its parent if any. Safe to call multiple times. After `destroy`, no callbacks (`onResize` / `onResizeStop` / `onUpdate`) fire. | `void` |

#### ResizableNodeDimensions

`ResizableNodeDimensions` — pixel dimensions applied to the resizable element.

| Property | Type | Description |
|----------|------|-------------|
| `height` | `number` | Height in pixels. |
| `width` | `number` | Width in pixels. |

#### ResizableNodeViewConfig

`ResizableNodeViewConfig` — public constructor options for the generic `ResizableNodeView` engine. The engine is pure DOM and has no awareness of Editor, Commands, or PM node types. The constructor accepts an element, optional behavior settings, and lifecycle callbacks. Persistence is owned by the consumer and must be performed from `onResizeStop` when required.

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLElement` | The DOM element whose dimensions are resized. |
| `onResize` | `Object` | Fires for each pointer movement during an active resize operation with the current constraint-adjusted dimensions. |
| `onResizeStart` | `Object` | Fires before the resize operation is initialized. Return `true` to cancel the operation before the element changes. |
| `onResizeStop` | `Object` | Fires exactly once when a resize operation ends, before the consumer persists the final dimensions. |
| `onUpdate` | `Object` | Fires after `update(attrs)` re-seeds the resize state. Consumers can use this to synchronize their element with updated node attributes. |
| `options` | `ResizableNodeViewOptions` | Optional behavior settings for handles, constraints, and aspect ratio. |

#### ResizableNodeViewCssClasses

`ResizableNodeViewCssClasses` — optional class-name overrides for the resize wrapper and handles. Each field defaults to the engine's documented default class. Setting any field to truthy overrides that default but does not affect the other fields.

| Property | Type | Description |
|----------|------|-------------|
| `handle` | `string` | Class applied to each resize handle. |
| `resizing` | `string` | Class toggled on the wrapper while resizing is active. |
| `selected` | `string` | Class toggled on the wrapper while the node is selected. |
| `wrapper` | `string` | Class applied to the resize wrapper. |

#### ResizableNodeViewOptions

`ResizableNodeViewOptions` — behavior options for the generic resize engine.

**Defaults:**
- `directions`: `['bottom-left', 'bottom-right', 'top-left', 'top-right']`
- `min`: `{ width: 8, height: 8 }`
- `max`: `undefined`
- `preserveAspectRatio`: `false`
- `cssClasses`: `{}`
- `createCustomHandle`: `undefined`

| Property | Type | Description |
|----------|------|-------------|
| `createCustomHandle` | `Object` | Creates a custom handle for a direction. If the callback does not return an `HTMLElement`, the engine creates its default handle. |
| `cssClasses` | `ResizableNodeViewCssClasses` | CSS class overrides for the resize UI. |
| `directions` | `ResizableNodeViewDirection[]` | Directions for which handles are rendered. |
| `max` | `Partial<ResizableNodeDimensions>` | Maximum dimensions permitted during resizing, in pixels. |
| `min` | `Partial<ResizableNodeDimensions>` | Minimum dimensions permitted during resizing, in pixels. |
| `preserveAspectRatio` | `boolean` | Whether to preserve the element aspect ratio for every resize operation. When `false`, holding <kbd>Shift</kbd> preserves the aspect ratio during a drag. |

#### ResizableNodeViewDirection

`ResizableNodeViewDirection` — eight directions supported by the generic resize handle system. `top` / `right` / `bottom` / `left` are edge handles (single-axis). `top-right` / `top-left` / `bottom-right` / `bottom-left` are corner handles (both axes). Edges span the wrapper's full width or height; corners attach only at the named intersection.

| Value | Description |
|-------|-------------|
| `top` | Edge handle: top edge. |
| `right` | Edge handle: right edge. |
| `bottom` | Edge handle: bottom edge. |
| `left` | Edge handle: left edge. |
| `top-right` | Corner handle: top-right intersection. |
| `top-left` | Corner handle: top-left intersection. |
| `bottom-right` | Corner handle: bottom-right intersection. |
| `bottom-left` | Corner handle: bottom-left intersection. |

### Image-upload position helpers

These static helpers bridge the image node to the upload registry, so they live with the image API surface even though they read from the upload state.

`getPositionForUploadId(state, uploadId)` — resolve the current mapped position of the image tracked by `uploadId`. Used by the completion handler to write the final `src` back into the document — even after the image has moved.

| Parameter | Type | Description |
|-----------|------|-------------|
| `state` | `EditorState` | The editor state to resolve against. |
| `uploadId` | `string` | The upload identifier to locate. |

**Returns:** `number | undefined`

`getUploadIdAtPosition(state, pos)` — resolve the runtime `uploadId` for the image node whose open token sits at `pos`. Returns `undefined` when no active upload is associated with the image at that position. This is the bridge the Image NodeView uses to subscribe to the generic `UploadStateRegistry` without putting `uploadId` into the image schema.

| Parameter | Type | Description |
|-----------|------|-------------|
| `state` | `EditorState` | The editor state to resolve against. |
| `pos` | `number` | The document position to inspect. |

**Returns:** `string | undefined`
