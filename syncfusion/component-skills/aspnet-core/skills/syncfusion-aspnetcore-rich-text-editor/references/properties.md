# Properties

Complete reference for all properties available on the Syncfusion ASP.NET Core Rich Text Editor (`<ejs-richtexteditor>`).

---

## Core / General

### Value
**Type:** `string` | **Default:** `""`  
Gets or sets the HTML or Markdown content of the editor.

### ValueTemplate
**Type:** `string` | **Default:** `null`  
Gets or sets a Razor template for the editor's initial value.

### EditorMode
**Type:** `Syncfusion.EJ2.RichTextEditor.EditorMode` | **Default:** `EditorMode.HTML`  
Defines the editing mode. Use `EditorMode.HTML` (default) for WYSIWYG editing and `EditorMode.Markdown` for Markdown editing.

### Placeholder
**Type:** `string` | **Default:** `null`  
Specifies placeholder text displayed in the content area when the editor is empty.

### CssClass
**Type:** `string` | **Default:** `null`  
Specifies one or more CSS class names appended to the root element for custom styling.

### HtmlAttributes
**Type:** `object` | **Default:** `null`  
Allows specifying additional HTML attributes (e.g., `title`, `name`) as key-value pairs.

### KeyConfig
**Type:** `object` | **Default:** `null`  
Customizes keyboard shortcut actions in the editor (e.g., for non-English keyboard layouts).

### Locale
**Type:** `string` | **Default:** `""`  
Overrides the global culture/localization value. Defaults to `en-US`.

---

## Dimensions

### Height
**Type:** `string` | **Default:** `"auto"`  
Specifies the height of the editor component.

### Width
**Type:** `string` | **Default:** `"100%"`  
Specifies the width of the editor component.

---

## State Flags

### Enabled
**Type:** `bool` | **Default:** `true`  
Enables or disables the editor component.

### Readonly
**Type:** `bool` | **Default:** `false`  
Makes the editor read-only (content is visible but not editable).

### EnableResize
**Type:** `bool` | **Default:** `false`  
Allows the user to resize the editor by dragging its bottom-right corner.

### EnablePersistence
**Type:** `bool` | **Default:** `false`  
Persists the editor's value across page reloads using browser storage.

### EnableRtl
**Type:** `bool` | **Default:** `false`  
Renders the editor in right-to-left direction.

### EnableTabKey
**Type:** `bool` | **Default:** `false`  
Allows the Tab key to insert a tab character inside the content area instead of moving focus.

### ShowTooltip
**Type:** `bool` | **Default:** `true`  
Shows or hides toolbar item tooltips.

---

## Content & Encoding

### EnableHtmlEncode
**Type:** `bool` | **Default:** `false`  
When `true`, the editor's value is returned in HTML-encoded format (useful for displaying source code).

### EnableHtmlSanitizer
**Type:** `bool` | **Default:** `true`  
Enables or disables XSS prevention by sanitizing HTML input. Disable only when you fully trust the content source.

### EnableXhtml
**Type:** `bool` | **Default:** `false`  
Enables XHTML validation on the editor's content.

### EnableAutoUrl
**Type:** `bool` | **Default:** `false`  
When `true`, URLs are accepted as-is (relative or absolute) without automatic `https://` prefixing.

### EnableClipboardCleanup
**Type:** `bool` | **Default:** `true`  
When `true`, copy and cut operations remove unwanted inline styles from the copied content.

### EnableMarkdownAutoFormat
**Type:** `bool` | **Default:** `true`  
In Markdown mode, automatically converts typed Markdown syntax into HTML formatting on keypress.

---

## Character Count & Auto-Save

### ShowCharCount
**Type:** `bool` | **Default:** `false`  
Displays a character count below the editor.

### MaxLength
**Type:** `double` | **Default:** `-1`  
Maximum number of characters allowed. `-1` means no limit.

### SaveInterval
**Type:** `number` | **Default:** `0`  
Interval (in milliseconds) at which the editor auto-saves content. `0` disables auto-save.

### AutoSaveOnIdle
**Type:** `bool` | **Default:** `false`  
When `true`, saves content automatically during idle periods after changes occur (based on `SaveInterval`).

---

## Key Behavior

### EnterKey
**Type:** `Syncfusion.EJ2.RichTextEditor.EnterKey` | **Default:** `EnterKey.P`  
Specifies the HTML tag inserted when Enter is pressed.  
- `EnterKey.P` — wraps in `<p>` (default)  
- `EnterKey.DIV` — wraps in `<div>`  
- `EnterKey.BR` — inserts `<br>`

### ShiftEnterKey
**Type:** `string` | **Default:** `"BR"`  
Specifies the action when Shift+Enter is pressed (default: inserts `<br>`).

### FloatingToolbarOffset
**Type:** `double` | **Default:** `0`  
Offset (in pixels) from the top of the document where the floating toolbar is pinned during scroll.

---

## Undo / Redo

### UndoRedoSteps
**Type:** `number` | **Default:** `30`  
Maximum number of undo/redo steps stored in the history stack.

### UndoRedoTimer
**Type:** `number` | **Default:** `300`  
Interval (in milliseconds) used to batch typing operations into a single undo step.

---

## Toolbar Settings (`ToolbarSettings`)
**Type:** `RichTextEditorToolbarSettings`

Configures the editor's toolbar.

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Enable` | `bool` | `true` | Shows or hides the toolbar. |
| `EnableFloating` | `bool` | `true` | Enables a floating (sticky) toolbar that stays visible while scrolling. |
| `Items` | `object` | `null` | Array of toolbar item names or custom item objects. |
| `Type` | `ToolbarType` | `Expand` | Toolbar layout: `Expand`, `MultiRow`, `Scrollable`, or `Popup`. |
| `Position` | `object` | `null` | Toolbar position: `Top` (default) or `Bottom`. |
| `ItemConfigs` | `object` | `null` | Overrides default toolbar item configurations (e.g., icon class). |

---

## Quick Toolbar Settings (`QuickToolbarSettings`)
**Type:** `RichTextEditorQuickToolbarSettings`

Configures contextual quick toolbars that appear when content is selected.

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Enable` | `bool` | `true` | Enables or disables quick toolbars. |
| `ActionOnScroll` | `ActionOnScroll` | `None` | Action when the parent container is scrolled (`None`, `Hide`, `Refresh`). |
| `EnableAppendToBody` | `bool` | `false` | Renders the quick toolbar in the document body for full visibility in constrained layouts. |
| `ShowOnRightClick` | `bool` | `false` | Displays the quick toolbar on right-click. |
| `Image` | `object` | `null` | Toolbar items shown when an image is selected. |
| `Link` | `object` | `null` | Toolbar items shown when a link is selected. |
| `Table` | `object` | `null` | Toolbar items shown when a table is selected. |
| `Text` | `object` | `null` | Toolbar items shown when text is selected. |
| `Audio` | `object` | `null` | Toolbar items shown when audio is selected. |
| `Video` | `object` | `null` | Toolbar items shown when video is selected. |

---

## IFrame Settings (`IframeSettings`)
**Type:** `RichTextEditorIFrameSettings`

Configures iframe-isolated editing mode.

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Enable` | `bool` | `false` | Enables iframe editing mode. |
| `Attributes` | `object` | `null` | Additional attributes for the iframe element. |
| `MetaTags` | `object` | `null` | Meta tags to inject into the iframe `<head>`. |
| `Resources` | `object` | `null` | External scripts and styles to inject into the iframe. |
| `Sandbox` | `string[]` | `null` | Sandbox restrictions for the iframe (e.g., `["allow-scripts"]`). |

---

## Inline Mode (`InlineMode`)
**Type:** `RichTextEditorInlineMode`

Configures inline editing mode (toolbar appears on content selection).

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Enable` | `bool` | `false` | Enables inline editing mode. |
| `OnSelection` | `bool` | `true` | Shows the inline toolbar only when text is selected. |

---

## Image Settings (`InsertImageSettings`)
**Type:** `RichTextEditorImageSettings`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `AllowedTypes` | `string[]` | `null` | Allowed image MIME types. |
| `Display` | `string` | `"inline"` | Image display: `"inline"` or `"block"`. |
| `Height` | `string` | `"auto"` | Default image height. |
| `Width` | `string` | `"auto"` | Default image width. |
| `MaxFileSize` | `double` | `30000000` | Maximum upload file size (bytes). |
| `MinWidth` | `string` | `"0"` | Minimum image width. |
| `MaxWidth` | `string` | `null` | Maximum image width. |
| `MinHeight` | `string` | `"0"` | Minimum image height. |
| `MaxHeight` | `string` | `null` | Maximum image height. |
| `Path` | `string` | `null` | Base path for displaying uploaded images. |
| `SaveUrl` | `string` | `null` | Server endpoint for image uploads. |
| `RemoveUrl` | `string` | `null` | Server endpoint for image deletion. |
| `SaveFormat` | `SaveFormat` | `Blob` | Save format: `Blob` or `Base64`. |
| `Resize` | `bool` | `true` | Enables image resizing in the editor. |
| `ResizeByPercent` | `bool` | `false` | Resizes image by percentage instead of pixels. |

---

## Video Settings (`InsertVideoSettings`)
**Type:** `RichTextEditorVideoSettings`

Similar structure to `InsertImageSettings`, with additional:

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `LayoutOption` | `DisplayLayoutOptions` | `Inline` | Video layout: `Inline` or `Break`. |

---

## Audio Settings (`InsertAudioSettings`)
**Type:** `RichTextEditorAudioSettings`

Similar structure to video settings:

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `AllowedTypes` | `string[]` | `null` | Allowed audio MIME types. |
| `LayoutOption` | `DisplayLayoutOptions` | `Inline` | Audio layout: `Inline` or `Break`. |
| `MaxFileSize` | `double` | `30000000` | Maximum upload file size (bytes). |
| `Path` | `string` | `null` | Base path for displaying audio files. |
| `SaveUrl` | `string` | `null` | Server endpoint for audio uploads. |
| `RemoveUrl` | `string` | `null` | Server endpoint for audio deletion. |
| `SaveFormat` | `SaveFormat` | `Blob` | Save format: `Blob` or `Base64`. |

---

## Paste Cleanup Settings (`PasteCleanupSettings`)
**Type:** `RichTextEditorPasteCleanupSettings`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Prompt` | `bool` | `false` | Prompts the user to choose paste format on paste. |
| `PlainText` | `bool` | `false` | Pastes content as plain text only. |
| `KeepFormat` | `bool` | `true` | Keeps formatting when pasting. |
| `DeniedTags` | `string[]` | `null` | HTML tags to strip on paste. |
| `DeniedAttrs` | `string[]` | `null` | HTML attributes to strip on paste. |
| `AllowedStyleProps` | `string[]` | `null` | CSS style properties to preserve on paste. |

---

## Table Settings (`TableSettings`)
**Type:** `RichTextEditorTableSettings`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Width` | `string` | `"100%"` | Default table width. |
| `MinWidth` | `string` | `"0"` | Minimum table width. |
| `MaxWidth` | `string` | `null` | Maximum table width. |
| `Resize` | `bool` | `true` | Enables table column resizing. |
| `Styles` | `object` | `null` | Available table style options in the quick toolbar. |

---

## Font Settings

### FontFamily
**Type:** `RichTextEditorFontFamily`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Default` | `string` | `null` | Default font family selection. |
| `Items` | `object` | `null` | Available font family items in the dropdown. |
| `Width` | `string` | `"72px"` | Width of the font family dropdown. |

### FontSize
**Type:** `RichTextEditorFontSize`  
Defines predefined font sizes for the font size dropdown in the toolbar.

### FontColor
**Type:** `RichTextEditorFontColor`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Default` | `string` | `"#ff0000"` | Default font color. |
| `ColorCode` | `object` | `null` | Custom color codes for the palette. |
| `Columns` | `double` | `10` | Number of columns in the color palette. |
| `Mode` | `ColorModeType` | `Palette` | Color picker mode: `Palette` or `Picker`. |
| `ModeSwitcher` | `bool` | `false` | Shows a button to toggle between Palette and Picker modes. |
| `ShowRecentColors` | `bool` | `true` | Shows recently used colors for quick access. |

### BackgroundColor
**Type:** `RichTextEditorBackgroundColor`  
Same structure as `FontColor`, with `Default` value `"#ffff00"`.

---

## Format Settings

### Format
**Type:** `RichTextEditorFormat`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Default` | `string` | `null` | Default paragraph format. |
| `Types` | `object` | `null` | Available format types in the dropdown. |
| `Width` | `string` | `"65px"` | Width of the format dropdown. |

### LineHeight
**Type:** `object` | **Default:** `null`  
Defines predefined line-height values for the Line Height toolbar dropdown.

### BulletFormatList
**Type:** `RichTextEditorBulletFormatList`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Types` | `object` | `null` | Available bullet list format types. |

### NumberFormatList
**Type:** `RichTextEditorNumberFormatList`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Types` | `object` | `null` | Available numbered list format types. |

---

## Code Block Settings (`CodeBlockSettings`)
**Type:** `RichTextEditorCodeBlockSettings`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `DefaultLanguage` | `string` | `"plaintext"` | Default programming language for new code blocks. |
| `Languages` | `object` | `null` | Available languages in the code block dropdown. |

---

## Format Painter Settings (`FormatPainterSettings`)
**Type:** `RichTextEditorFormatPainterSettings`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `AllowedFormats` | `string` | `"b; em; font; sub; sup; kbd; i; s; u; code; strong; span; p; div; h1; h2; h3; h4; h5; h6; blockquote; ol; ul; li; pre;"` | CSS selector string defining tags from which formats are copied. |
| `DeniedFormats` | `string` | `null` | CSS selector string defining tags from which format copying is blocked. |

---

## Emoji Picker Settings (`EmojiPickerSettings`)
**Type:** `RichTextEditorEmojiSettings`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `IconsSet` | `object` | `null` | Array of emoji icon items to display. |
| `ShowSearchBox` | `bool` | `true` | Shows or hides the search box in the emoji picker. |

---

## Slash Menu Settings (`SlashMenuSettings`)
**Type:** `RichTextEditorSlashMenuSettings`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Enable` | `bool` | `false` | Enables or disables the slash (`/`) command menu. |
| `Items` | `object` | `null` | Items displayed in the slash menu. |
| `PopupHeight` | `string` | `"320px"` | Height of the slash menu popup. |
| `PopupWidth` | `string` | `"300px"` | Width of the slash menu popup. |

---

## AI Assistant Settings (`AiAssistantSettings`)
**Type:** `RichTextEditorAIAssistantSettings`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Commands` | `object` | `null` | AI command definitions. |
| `Prompts` | `object` | `null` | Predefined prompts. |
| `Suggestions` | `string[]` | `null` | Suggested prompts shown to the user. |
| `Placeholder` | `string` | `"Ask AI to rewrite or generate content."` | Placeholder text for the AI prompt input. |
| `MaxPromptHistory` | `double` | `20` | Maximum number of prompt/response pairs stored in history. |
| `PopupWidth` | `string` | `"600px"` | Width of the AI Assistant popup. |
| `PopupMaxHeight` | `string` | `"400px"` | Maximum height of the AI Assistant popup. |
| `BannerTemplate` | `string` | `""` | Template for the AI Assistant banner area. |
| `HeaderToolbarSettings` | `object` | `null` | Header toolbar configuration. |
| `PromptToolbarSettings` | `object` | `null` | Prompt area toolbar configuration. |
| `ResponseToolbarSettings` | `object` | `null` | Response area toolbar configuration. |

---

## Import / Export Settings

### ImportWordSettings (`ImportWordSettings`)
**Type:** `RichTextEditorImportWord`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `ServiceUrl` | `string` | `null` | Server endpoint that handles Word file imports. |

### ExportWordSettings (`ExportWordSettings`)
**Type:** `RichTextEditorExportWord`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `FileName` | `string` | `"Sample.docx"` | Default file name for the exported Word document. |
| `ServiceUrl` | `string` | `null` | Server endpoint that handles Word file exports. |
| `Stylesheet` | `string` | `null` | Stylesheet applied to the exported document. |

### ExportPdfSettings (`ExportPdfSettings`)
**Type:** `RichTextEditorExportPdf`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `FileName` | `string` | `"Sample.pdf"` | Default file name for the exported PDF. |
| `ServiceUrl` | `string` | `null` | Server endpoint that handles PDF exports. |
| `Stylesheet` | `string` | `null` | Stylesheet applied to the exported PDF. |

---

## File Manager Settings (`FileManagerSettings`)
**Type:** `RichTextEditorFileManagerSettings`

| Sub-property | Type | Default | Description |
|---|---|---|---|
| `Enable` | `bool` | `false` | Enables the file manager integration. |
| `AjaxSettings` | `object` | `null` | AJAX settings for file manager operations. |
| `AllowDragAndDrop` | `bool` | `false` | Enables drag-and-drop in the file manager. |
| `Path` | `string` | `"/"` | Current path in the file manager. |
| `RootAliasName` | `string` | `null` | Display name for the root folder. |
| `ShowFileExtension` | `bool` | `true` | Shows or hides file extensions. |
| `ShowHiddenItems` | `bool` | `false` | Shows or hides hidden files and folders. |
| `ShowThumbnail` | `bool` | `true` | Shows or hides thumbnail previews in large icons view. |

---

## Formatter (`Formatter`)
**Type:** `RichTextEditorFormatter`  
Allows customizing key code mappings for formatting commands.
