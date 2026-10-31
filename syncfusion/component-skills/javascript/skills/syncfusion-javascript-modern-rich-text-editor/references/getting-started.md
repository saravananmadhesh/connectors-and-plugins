# Getting started in Syncfusion JavaScript Modern Rich Text Editor

The Syncfusion JavaScript Modern Rich Text Editor is a WYSIWYG control for creating, editing, and formatting rich text content. This guide explains how to set up and use the Modern Rich Text Editor in a Vite-based TypeScript project, the basic configuration surface, the placeholder, and the accessibility capabilities the component provides.

## Table of contents

- [Prerequisites](#prerequisites)
- [Create a TypeScript application](#create-a-typescript-application)
- [Adding the Modern Rich Text Editor package](#adding-the-modern-rich-text-editor-package)
- [Adding a CSS reference](#adding-a-css-reference)
- [Adding the Modern Rich Text Editor control](#adding-the-modern-rich-text-editor-control)
- [Run the application](#run-the-application)
- [Set editor content](#set-editor-content)
- [Set content format](#set-content-format)
- [Configure toolbar options](#configure-toolbar-options)
- [Configure image settings](#configure-image-settings)
- [Set placeholder text](#set-placeholder-text)
- [Accessibility](#accessibility)
- [API references](#api-references)

## Prerequisites

This guide uses Vite as the bundler and development environment. Install Node.js `24.13.0` or `higher` before proceeding.

## Create a TypeScript application

To set up a TypeScript application, run the following command.

```bash
npm create vite@latest my-app -- --template vanilla-ts
```

This command will prompt you to install the required packages and start the application. Select the **No** option.

As Syncfusion packages are not installed yet, currently, the `No` option will be selected. Then, navigate to the project directory and install the dependencies using the following commands:

```bash
cd my-app
npm install
```

## Adding the Modern Rich Text Editor package

All the available Essential JS 2 packages are published in the [`npmjs.com`](https://www.npmjs.com/~syncfusionorg) public registry. To install the Modern Rich Text Editor control, use the following command:

```bash
npm install @syncfusion/ej2-richtexteditor-ui
```

## Adding a CSS reference

Syncfusion provides multiple themes for the Modern Rich Text Editor control. For a complete list of available themes, refer to the [themes packages](https://ej2.syncfusion.com/documentation/appearance/theme#theme-packages).

To apply the [Tailwind 3](https://www.npmjs.com/package/@syncfusion/ej2-tailwind3-theme) theme, install the corresponding theme package using the following command:

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

The installed theme package includes an `index.css` file that automatically imports all the required dependency styles. Import the following stylesheet into `src/style.css`.

```css
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/richtexteditor-ui/index.css';
```

> To apply the application-specific styles correctly, import **style.css** into **src/main.ts** and remove all the default styles from **src/style.css** and use the Modern Rich Text Editor styles provided above.

## Adding the Modern Rich Text Editor control

Now, you can start adding the Modern Rich Text Editor control to the application. For getting started, add the Modern Rich Text Editor initialization code in the **src/main.ts** file and add the target element in the **index.html** file using the following sample.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';
const editor: RichTextEditorUI = new RichTextEditorUI({});
editor.appendTo('#editor');
```

```css
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/richtexteditor-ui/index.css';
```

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Syncfusion JavaScript Modern Rich Text Editor</title>
</head>

<body>
  <div id="editor"></div>
  <script type="module" src="/src/main.ts"></script>
</body>

</html>
```

## Run the application

Use the following command to run the application in the browser.

```bash
npm run dev
```

## Set editor content

After initializing the Modern Rich Text Editor, configure the properties that define its initial content, content format, toolbar options, image handling behavior, and editing experience. These settings establish the editor's default configuration and provide a foundation for further customization based on application requirements.

```ts
import { RichTextEditorUI } from '@syncfusion/ej2-richtexteditor-ui';

const hostUrl: string = 'https://services.syncfusion.com/js/production/';
const editor: RichTextEditorUI = new RichTextEditorUI({
    value: '<p>Getting started with the Rich Text Editor UI.</p>',
    valueFormat: 'html',
    toolbarSettings: {
        items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']
    },
    imageSettings: {
        allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
        maxFileSize: 30000000,
        uploadUrl: hostUrl + 'api/RichTextEditor/SaveFile',
        imageUrl: hostUrl + 'RichTextEditor/'
    }
});

editor.appendTo('#editor');
```

Configure the `value` property to load content when the editor is initialized. This is commonly used to display existing content for editing or to provide starter content.

```ts
value: '<p>Getting started with the Rich Text Editor UI.</p>'
```

## Set content format

Before setting editor content, choose the appropriate `valueFormat`. Use `html` when working with HTML strings and `json` when storing or exchanging content using the editor's structured document model.

```ts
valueFormat: 'html'
```

Supported values:

- `'json'` — Uses the structured document model.
- `'html'` — Uses HTML string content.

> `valueFormat` is set to **`'json'`** by default. Set it to **`'html'`** when loading editor content as an HTML string.

## Configure toolbar options

Configure `toolbarSettings.items` to display only the editing tools required by your application. Keeping the toolbar focused helps simplify the editing experience and reduces unnecessary commands.

```ts
toolbarSettings: {
    items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']
}
```

## Configure image settings

Configure `imageSettings` to control how images are uploaded and validated. You can specify accepted file types, file size limits, and server endpoints used for upload and removal operations.

```ts
var hostUrl: string = 'https://services.syncfusion.com/js/production/';
imageSettings: {
    allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
    maxFileSize: 30000000,
    uploadUrl: hostUrl + 'api/RichTextEditor/SaveFile',
    removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
    imageUrl: hostUrl + 'RichTextEditor/'
}
```

## Set placeholder text

Use the `placeholder` property to display instructional text when the editor is empty. This helps users understand what content is expected before they start typing.

```ts
placeholder: 'Type something.'
```

## Accessibility

The Modern Rich Text Editor control is designed with accessibility in mind, adhering to WAI-ARIA specifications and implementing ARIA roles, states, and properties. This ensures full accessibility support, making it user-friendly for people who rely on assistive technologies (AT) or keyboard navigation.

The accessibility compliance for the Modern Rich Text Editor control is outlined below.

| Accessibility Criteria | Compatibility |
| --- | --- |
| WCAG 2.2 Support | Yes |
| Section 508 Support | Yes |
| Screen Reader Support | Yes |
| Right-To-Left Support | Yes |
| Color Contrast | Intermediate |
| Mobile Device Support | Yes |
| Keyboard Navigation Support | Yes |
| Accessibility Checker Validation | Intermediate |
| Axe-core Accessibility Validation | Yes |

### ARIA attributes

The toolbar in the Modern Rich Text Editor is assigned the role of `Toolbar` and includes the following attributes.

| Property | Functionalities |
| --- | --- |
| `role="toolbar"` | This attribute added to the ToolBar element describes the actual role of the element. |
| `aria-orientation` | Indicates the ToolBar orientation. Default value is `horizontal`. |
| `aria-disabled` | Indicates the disabled state of the toolbar. |

The Modern Rich Text Editor element is assigned the role of `application`.

| Property | Functionalities |
| --- | --- |
| `role="application"` | This attribute added to the Modern Rich Text Editor element describes the actual role of the element. |
| `aria-disabled` | Indicates the disabled state of the ToolBar. |

### Keyboard navigation

The Modern Rich Text Editor component follows the [keyboard interaction](https://www.w3.org/WAI/ARIA/apg/patterns/alert#keyboardinteraction) guideline, making it easy for people who use assistive technologies (AT) and those who completely rely on keyboard navigation.

### Implementing accessibility best practices

The Rich Text Editor component's accessibility levels are ensured through an [accessibility-checker](https://www.npmjs.com/package/accessibility-checker) and [axe-core](https://www.npmjs.com/package/axe-core) software tools during automated testing.


## API references

Top-level editor setting types and the allowed value-format enum, sourced from the Syncfusion EJ2 TypeScript API reference for `@syncfusion/ej2-richtexteditor-ui`.

### `ValueFormat`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/valueformat>

Allowed value formats.

- `'html'` — value is an HTML string.
- `'json'` — value is an `EditorDocument` object.

Enum members:

- `html`
- `json`

### `InteractionSettings`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/interactionsettings>

Configures the Intereactions settings of the RichTextEditor.

#### Properties

- `enableAutoFormat` — `boolean` — Specifies whether Markdown-style auto formatting is enabled while typing. When `true`, supported Markdown-style syntax entered at the beginning of a block is converted into the corresponding editor structure (for example `#`, `##`, `>`, `-`, `1.`, ` ``` `).
  - Defaults to `true`.
- `enableTabKeyIndent` — `boolean` — Specifies whether the Tab and Shift+Tab keys can be used for indentation. When `true`:
  - `Tab` at the beginning of a supported block indents the block.
  - `Shift+Tab` at the beginning of a supported block outdents the block.
  - `Tab` in the middle of a block inserts tab spacing at the cursor position.

  If the current selection does not support indentation or tab spacing, normal browser focus navigation is preserved.

  When `false`, Tab and Shift+Tab do not trigger editor indentation.

  Defaults to `true`.

### `InteractionSettingsModel`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/interactionsettingsmodel>

Interface for the class `InteractionSettings`.

#### Properties

- `enableAutoFormat` — `boolean` — Specifies whether Markdown-style auto formatting is enabled while typing. When `true`, supported Markdown-style syntax entered at the beginning of a block is converted into the corresponding editor structure (for example `#`, `##`, `>`, `-`, `1.`, ` ``` `).
- `enableTabKeyIndent` — `boolean` — Specifies whether the Tab and Shift+Tab keys can be used for indentation. When `true`:
  - `Tab` at the beginning of a supported block indents the block.
  - `Shift+Tab` at the beginning of a supported block outdents the block.
  - `Tab` in the middle of a block inserts tab spacing at the cursor position.

  If the current selection does not support indentation or tab spacing, normal browser focus navigation is preserved.

  When `false`, Tab and Shift+Tab do not trigger editor indentation.


### `RichTextEditorUIModel`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/richtexteditoruimodel>

Interface for a class `RichTextEditorUI`. The full configuration model for the editor root component.

#### Properties

- `backgroundColor` — `BackgroundColorModel` — Configures the background color (text highlight color) picker settings in the Rich Text Editor. This property controls the color palette, default background color selection, color picker mode (`Palette` or `Picker`), number of columns in the palette, mode switcher visibility, and recent colors functionality. Uses the same configuration shape as `fontColor`.
- `cssClass` — `string` — Specifies custom CSS classes to be applied to the Rich Text Editor root element. Multiple classes can be separated by spaces to apply multiple CSS classes for custom styling.
- `enable` — `boolean` — Enable or disable the Rich Text Editor. When set to `false`, the editor becomes non-interactive and all toolbar items are disabled. The editable area remains visible but input is prevented.
- `enablePersistence` — `boolean` — Enables persistence for the Editor state. When set to `true`, the editor state (including content) is persisted across page reloads using the browser's local storage.
- `enableRtl` — `boolean` — Enables right-to-left (RTL) text direction for the Rich Text Editor. When set to `true`, the editor layout, toolbar, and content direction are flipped to support RTL languages like Arabic and Hebrew.
- `fontColor` — `FontColorModel` — Configures the font color picker settings in the Rich Text Editor. This property controls the color palette, default color selection, color picker mode (`Palette` or `Picker`), number of columns in the palette, mode switcher visibility, and recent colors functionality shown in the FontColor toolbar item.
- `fontFamily` — `FontFamilyModel` — Defines the font family settings of the Rich Text Editor. Configures the font family dropdown items, default font family selection, and the width of the font family dropdown in the toolbar.

  ```ts
  const editor: RichTextEditorUI = new RichTextEditorUI({
      fontFamily: {
          width: "72px",
          items: [
              { text: 'Default', value: 'Default' },
              { text: 'Arial', value: 'Arial' },
              { text: 'Helvetica', value: 'Helvetica' },
              { text: 'Times New Roman', value: 'Times New Roman' },
              { text: 'Courier New', value: 'Courier New' }
          ]
      },
      toolbarSettings: { items: ['FontName'] }
  });
  editor.appendTo("#editor");
  ```

- `fontSize` — `FontSizeModel` — Defines the font size settings of the Rich Text Editor. Configures the font size dropdown items, default font size selection, and the width of the font size dropdown in the toolbar.

  ```ts
  const editor: RichTextEditorUI = new RichTextEditorUI({
      fontSize: {
          width: "60px",
          items: [
              { text: 'Default', value: 'Default' },
              { text: '8', value: '8px' },
              { text: '10', value: '10px' },
              { text: '12', value: '12px' },
              { text: '14', value: '14px' },
              { text: '16', value: '16px' },
              { text: '18', value: '18px' },
              { text: '24', value: '24px' }
          ]
      },
      toolbarSettings: { items: ['FontSize'] }
  });
  editor.appendTo("#editor");
  ```

- `format` — `FormatModel` — Defines the Format toolbar item configuration for the Rich Text Editor. This property controls the formatting options available in the Format dropdown menu in the toolbar.
- `height` — `string | number` — Sets the Rich Text Editor height. The height can be specified in pixels, percentages, or other valid CSS units. When set to `'auto'`, the height adjusts automatically based on the content.
- `htmlAttributes` — `{ [key: string]: string }` — Sets custom HTML attributes on the Rich Text Editor root element. This property accepts a key-value pair object where keys are attribute names and values are attribute values.
- `imageSettings` — `ImageSettingsModel` — Configures image upload, validation, storage, display, dimensions, and resize behavior in the Rich Text Editor. This property controls all aspects of image handling including file type validation, size restrictions, server endpoints for upload and removal, storage format, display mode, and resize capabilities.

  Properties:
  - `allowedTypes` — Image file extensions that may be selected, dropped, pasted, or uploaded. Defaults to `['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp']`.
  - `maxFileSize` — Maximum image file size in bytes. Defaults to `30000000` (30 MB).
  - `uploadUrl` — Server endpoint used to upload image files via POST request. When `null`, `editor.uploadFile()` fails with `fileUploadFailed` event.
  - `removeUrl` — Server endpoint used to remove a previously uploaded image from the server.
  - `imageUrl` — Base URL for resolving uploaded image names returned by the server into full image URLs.
  - `saveFormat` — Storage format for inserted images: `'Blob'` (object URL) or `'Base64'` (data URI). Defaults to `'Blob'`.
  - `display` — Display mode for images: `'inline'` (within text flow) or `'break'` (block-level). Defaults to `'inline'`.
  - `dimension` — Plain object with `width`, `height`, `minWidth`, `maxWidth`, `minHeight`, `maxHeight` properties. Replace the whole object on update.
  - `resize` — Whether users may resize images in the editor. Defaults to `true`.

- `interactionSettings` — `InteractionSettingsModel` — Configures editor interaction behaviors and user interaction preferences. These settings control interaction behavior only and must not change the persisted document format or content structure. They affect how the editor responds to user actions like typing, pasting, and keyboard events.
- `keyBindings` — `EditorKeyBindingMap` — Overrides the registered editor keyboard bindings. On macOS, configured `ctrl` modifiers are mapped to the equivalent Command modifier automatically; separate Mac bindings are not required.
- `linkSettings` — `LinkSettingsModel` — Defines the Link settings of the Editor. The link settings govern how hyperlinks are created, normalized, and validated within the editable area — covering automatic link creation when a URL is pasted over selected text, the default target applied to newly created links, protocol normalization for external URLs, and validation of accepted protocols.

  Use this property to:

  - Toggle automatic link creation on paste via `LinkSettings.linkOnPaste`.
  - Configure the default target for newly created links via `LinkSettings.defaultTarget`.
  - Control protocol normalization for URLs missing a protocol via `LinkSettings.autoPrependProtocol` and `LinkSettings.defaultProtocol`.
  - Restrict accepted URL protocols via `LinkSettings.allowedProtocols` to guard against unsafe schemes such as `javascript:`.

  ```ts
  const editor: RichTextEditorUI = new RichTextEditorUI({
      linkSettings: {
          linkOnPaste: false,
          defaultTarget: "_self",
          allowedProtocols: ["http", "https", "mailto", "tel"],
          defaultProtocol: "http",
          autoPrependProtocol: true
      }
  });
  editor.appendTo("#editor");
  ```

- `listSettings` — `ListSettingsModel` — Defines the List settings of the Rich Text Editor. This property controls the items shown in the NumberFormatList and BulletFormatList toolbar dropdowns, allowing customization of available list formatting options.
- `locale` — `string` — Sets the locale (language and region) for the Rich Text Editor. This affects the language of toolbar tooltips, placeholder text, dialog labels, and error messages displayed in the editor.
- `placeholder` — `string` — Sets the placeholder text displayed in the editor's editable area when it is empty. The placeholder provides a hint to users about the expected content or format.
- `quickToolbarSettings` — `QuickToolbarSettingsModel` — Defines the Quick Toolbar settings of the Rich Text Editor. The quick toolbar is a contextual popup toolbar that appears next to the current text selection within the editable area, providing fast access to the most relevant formatting commands without moving focus back to the main toolbar.

  Use this property to:

  - Toggle the quick toolbar on or off via `QuickToolbarSettings.enable`.
  - Configure the items displayed on text selection via `QuickToolbarSettings.text`.
  - Control popup attachment via `QuickToolbarSettings.enableAppendToBody` to avoid clipping inside narrow or scroll-constrained containers.
  - Configure the items displayed for selected images via `QuickToolbarSettings.image`.
  - Configure the items displayed for selected links via `QuickToolbarSettings.link`.
  - Configure the items displayed for selected tables via `QuickToolbarSettings.table`.

- `readonly` — `boolean` — Enable or disable the read-only mode for the Rich Text Editor. When set to `true`, the editor content becomes read-only and toolbar items are disabled, preventing user input while maintaining visibility of the editor and its content.
- `saveInterval` — `number` — Specifies the idle interval in milliseconds before autosave commits dirty (unsaved) content. This property only has an effect when `enableAutoSave` is set to `true`. When the user remains idle for this duration, the editor content is automatically saved.
- `slashCommandSettings` — `SlashCommandSettingsModel` — Configures the slash command settings of the Rich Text Editor. Typing `/` in the editor content opens an inline command popup with predefined and custom formatting items. This feature enables quick access to block-level formatting commands without accessing the main toolbar.

  Properties:
  - `enable` — Specifies whether the slash command feature is enabled or disabled.
  - `items` — An array specifying the items displayed in the slash command popup (e.g., `'Paragraph'`, `'Heading 1'`, `'BulletList'`).
  - `popupWidth` — Width of the slash command popup. Accepts pixels, numbers, or percentages.
  - `popupHeight` — Height of the slash command popup. Accepts pixels, numbers, or percentages.

- `tableSettings` — `TableSettingsModel` — Configures the Table insertion feature. Controls whether table cells can be resized after insertion.
- `toolbarSettings` — `ToolbarSettingsModel` — Defines the Toolbar settings of the Rich Text Editor. This property controls the toolbar configuration, including the items displayed, their grouping, and visibility. Use this to customize toolbar appearance and behavior based on your application's requirements.

  ```ts
  const editor: RichTextEditorUI = new RichTextEditorUI({
      toolbarSettings: {
          enable: true,
          items: [
              'Undo', 'Redo', '|',
              'Bold', 'Italic', 'Underline', 'Strikethrough', 'InlineCode', '|',
              'Link', 'Image', 'Table', 'CodeBlock', 'HorizontalLine', 'Quote', '|',
              'Formats', 'Alignment', 'Callout', '|',
              'BulletFormatList', 'NumberFormatList', 'Checklist', '|',
              'Outdent', 'Indent', '|',
              'FontColor', 'BackgroundColor', 'FontName', 'FontSize', '|',
              'LowerCase', 'UpperCase', '|',
              'Superscript', 'Subscript', '|',
              'ClearFormat'
          ],
          type: 'Auto',
          position: 'Top',
          enableFloating: true,
          floatingOffset: 0
      }
  });
  editor.appendTo("#editor");
  ```

- `undoRedoSteps` — `number` — Specifies the maximum number of undo history steps stored in the editor. Each step corresponds to a user action or batch of compatible adjacent actions. Increasing this value allows more undo actions at the cost of increased memory.
- `undoRedoTimer` — `number` — Specifies the time interval in milliseconds used by the editor to group compatible adjacent changes into a single undo/redo step. Changes that occur within this interval are grouped together, creating a single undoable action. This improves the user experience by preventing excessive undo steps for rapid consecutive changes.
- `value` — `string | EditorDocument` — Editor content. The accepted type depends on `valueFormat`:
  - `'html'` — an HTML string.
  - `'json'` — an `EditorDocument` object.
- `valueFormat` — `ValueFormat` — Specifies the format used by the `value` property and getter methods. Controls how the editor content is serialized and deserialized.
  - `html` — The value is an HTML string representation of the editor content.
  - `json` — The value is an `EditorDocument` object representing the document structure.

- `width` — `string | number` — Sets the Rich Text Editor width. The width can be specified in pixels, percentages, or other valid CSS units. When set to `'100%'`, the editor expands to fill its parent container width.

#### Events

- `actionBegin` — `EmitType<ActionBeginEventArgs>` — Raised before an action-driven mutation is executed. This event allows prevention of user actions like formatting changes by setting `args.cancel = true`.
- `actionComplete` — `EmitType<ActionCompleteEventArgs>` — Raised after an accepted action-driven mutation has been successfully processed and applied to the document. This event fires only when the action is not cancelled in the `actionBegin` event.
- `beforeDialogClose` — `EmitType<BeforeDialogCloseEventArgs>` — This event triggers before a dialog is closed. Cancel this event to prevent the dialog from closing by setting the `cancel` argument to `true`. `source` identifies the editor feature that owns the dialog, such as `Link`, `Image`, or `Table`.
- `beforeDialogOpen` — `EmitType<BeforeDialogOpenEventArgs>` — This event triggers before a dialog is opened. Cancel this event to prevent the dialog from opening by setting the `cancel` argument to `true`. `source` identifies the editor feature that owns the dialog, such as `Link`, `Image`, or `Table`.
- `beforeFileDrop` — `EmitType<BeforeFileDropEventArgs>` — Raised before drop/paste-inserted files are routed through the typed command pipeline. Set `args.cancel = true` to keep the document untouched. The event args are `BeforeFileDropEventArgs`.
- `beforeFileUpload` — `EmitType<BeforeFileUploadEventArgs>` — Triggers before a file is uploaded to the server. Cancel this event to prevent the upload by setting the `cancel` argument to `true`. The `source` field identifies the feature that owns the upload, such as `Image`. See `BeforeFileUploadEventArgs` for the complete list of event arguments.
- `blur` — `EmitType<BlurEventArgs>` — Raised when focus leaves the Rich Text Editor shell. This event fires when the user moves focus away from the editor to another element.
- `change` — `EmitType<ChangeEventArgs>` — Raised when a dirty (modified) value is committed to the document. This event fires on blur (when focus leaves the editor) or on autosave if autosave is enabled.
- `created` — `EmitType<Object>` — Raised when the Rich Text Editor has completed initialization and is ready for user interaction. At this point, all internal modules have been initialized and the editor is fully operational.
- `destroyed` — `EmitType<Object>` — Raised when the Rich Text Editor has been destroyed. This event fires after all resources have been cleaned up and the Rich Text Editor is no longer functional.
- `fileRemoving` — `EmitType<FileRemovingEventArgs>` — Triggers before a previously-uploaded image is removed (client-side `URL.revokeObjectURL` for `saveFormat: 'Blob'`, or before the `removeUrl` POST is sent for server-side removal). Set `args.cancel = true` to keep the image in place; both the Blob revocation and the `removeUrl` POST will be skipped. The event args are `FileRemovingEventArgs`.
- `fileSelected` — `EmitType<FileSelectedEventArgs>` — Triggers when files are selected for upload. See `FileSelectedEventArgs` for the complete list of event arguments.
- `fileUploadFailed` — `EmitType<FileUploadFailedEventArgs>` — This event triggers when there is an error during media upload. See `FileUploadFailedEventArgs` for the complete list of event arguments.
- `fileUploadSuccess` — `EmitType<FileUploadSuccessEventArgs>` — This event triggers when file has been successfully uploaded to the server side. See `FileUploadSuccessEventArgs` for the complete list of event arguments.
- `fileUploading` — `EmitType<FileUploadingEventArgs>` — Triggers while a file is being uploaded to the server.
- `focus` — `EmitType<FocusEventArgs>` — Raised when the Rich Text Editor receives focus.

### `EditorDocument`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/editordocument>

Public document model — the same shape used for `value` when `valueFormat` is `'json'`. Always has `type: 'doc'` and may have any registered block-level children.

#### Properties

- `attrs` — `Record<string, any>` — Node attributes (alignment, indent, color, etc.).
- `children` — `BlockNode[]` — Child block nodes in the document.
- `marks` — `EditorMark[]` — Marks applied to this node (for block-level mark support).
- `schemaVersion` — `number` — Schema version — used for future migration handling.

### `BlockNode`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/blocknode>

Block-level node union — built-in plus registered custom block nodes.

#### Union members

`ParagraphNode`, `HeadingNode`, `BlockquoteNode`, `CodeBlockNode`, `OrderedListNode`, `BulletListNode`.

### `InlineNode`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/inlinenode>

Inline-level node union — built-in plus registered custom inline nodes.

#### Union members

`TextNode`, `HardBreakNode`.

### `EditorMark`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/editormark>

Inline formatting marks — built-in plus registered custom marks.

#### Union members

`BoldMark`, `ItalicMark`, `UnderlineMark`, `StrikeMark`, `SubscriptMark`, `SuperscriptMark`, `CodeMark`, `LinkMark`, `TextColorMark`, `BackgroundColorMark`.


### `CustomNodeAttributeType`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/customnodeattributetype>

Custom node attribute type enum. Members:

- `string`
- `number`
- `boolean`
- `enum`

### `CustomNodeContent`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/customnodecontent>

Custom node content enum. Members:

- `block`
- `inline`
- `text`
- `none`

### `CustomNodeGroup`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/customnodegroup>

Coarse content cardinality for the runtime schema. The spec uses typed arrays (`content: BlockNode[]`) at the model level; the runtime maps those to ProseMirror-style cardinality rules.

Members:

- `block`
- `inline`

### `CustomNodeName`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/customnodename>

Custom node name type alias. Members:

- `CustomBlockNodeName`
- `CustomInlineNodeName`

### `DialogType`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/dialogtype>

Enumerates the dialog types supported by the editor for inserting links, images, audio, video, and tables.

Members:

- `InsertImage` — Defines DialogType for inserting an image.
- `InsertLink` — Defines DialogType for inserting a link.
- `InsertTable` — Defines DialogType for inserting a table.

### `EditorComponentEventArgs`

Source: <https://ej2.syncfusion.com/documentation/api/richtexteditor-ui/editorcomponenteventargs>

Editor feature (`source`) carried by every sub-component event argument raised on the editor. The `source` is a plain string set at sub-component initialization (e.g. `'Link'`, `'Image'`, `'Table'`) identifying which feature the dialog, popup, or upload belongs to. A single handler can branch on `args.source` rather than wiring one callback per feature.

#### Properties

- `source` — `string` — The editor feature the sub-component belongs to. Supplied by the caller when the sub-component is created. Undefined for generic sub-components that are not tied to a specific feature.
