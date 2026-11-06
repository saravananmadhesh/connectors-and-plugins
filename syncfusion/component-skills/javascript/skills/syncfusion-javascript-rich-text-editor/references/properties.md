# Properties

All configurable properties of the `RichTextEditor` component from `@syncfusion/ej2-richtexteditor`.

## Table of Contents
- [aiAssistantSettings](#aiassistantsettings)
- [autoSaveOnIdle](#autosaveonidle)
- [backgroundColor](#backgroundcolor)
- [bulletFormatList](#bulletformatlist)
- [codeBlockSettings](#codeblocksettings)
- [cssClass](#cssclass)
- [editorMode](#editormode)
- [emojiPickerSettings](#emojipickersettings)
- [enableAutoUrl](#enableautourl)
- [enableClipboardCleanup](#enableclipboardcleanup)
- [enableHtmlEncode](#enablehtmlencode)
- [enableHtmlSanitizer](#enablehtmlsanitizer)
- [enableMarkdownAutoFormat](#enablemarkdownautoformat)
- [enablePersistence](#enablepersistence)
- [enableResize](#enableresize)
- [enableRtl](#enablertl)
- [enableTabKey](#enabletabkey)
- [enableXhtml](#enablexhtml)
- [enabled](#enabled)
- [enterKey](#enterkey)
- [exportPdf](#exportpdf)
- [exportWord](#exportword)
- [fileManagerSettings](#filemanagersettings)
- [floatingToolbarOffset](#floatingtoolbaroffset)
- [fontColor](#fontcolor)
- [fontFamily](#fontfamily)
- [fontSize](#fontsize)
- [format](#format)
- [formatPainterSettings](#formatpaintersettings)
- [formatter](#formatter)
- [height](#height)
- [htmlAttributes](#htmlattributes)
- [iframeSettings](#iframesettings)
- [importWord](#importword)
- [inlineMode](#inlinemode)
- [insertAudioSettings](#insertaudiosettings)
- [insertImageSettings](#insertimagesettings)
- [insertVideoSettings](#insertvideosettings)
- [keyConfig](#keyconfig)
- [lineHeight](#lineheight)
- [locale](#locale)
- [maxLength](#maxlength)
- [numberFormatList](#numberformatlist)
- [pasteCleanupSettings](#pastecleanupsettings)
- [placeholder](#placeholder)
- [quickToolbarSettings](#quicktoolbarsettings)
- [readonly](#readonly)
- [saveInterval](#saveinterval)
- [shiftEnterKey](#shiftenterkey)
- [showCharCount](#showcharcount)
- [showTooltip](#showtooltip)
- [slashMenuSettings](#slashmenusettings)
- [tableSettings](#tablesettings)
- [toolbarSettings](#toolbarsettings)
- [undoRedoSteps](#undoredosteps)
- [undoRedoTimer](#undoredotimer)
- [value](#value)
- [valueTemplate](#valuetemplate)
- [width](#width)

---

## aiAssistantSettings

**Type:** `AIAssistantSettingsModel`  
**Default:** `{ commands: DEFAULT_AI_COMMANDS, popupWidth: '600px', popupMaxHeight: '400px', placeholder: 'Ask AI to rewrite or generate content.', headerToolbarSettings: ['AIcommands', 'Close'], promptToolbarSettings: ['Edit', 'Copy'], responseToolbarSettings: ['Regenerate', 'Copy', ' | ', 'Insert'], prompts: [], suggestions: [], bannerTemplate: '', maxPromptHistory: 20 }`

Configures the AI Assistant feature including predefined commands, popup dimensions, toolbar configurations, and prompt history.

**Sub-properties (`AIAssistantSettingsModel`):**

| Property | Type | Default | Description |
|---|---|---|---|
| `commands` | `string[] \| object` | `DEFAULT_AI_COMMANDS` | Predefined AI commands in the dropdown. |
| `popupWidth` | `string` | `'600px'` | Width of the AI assistant popup. |
| `popupMaxHeight` | `string` | `'400px'` | Max height of the AI assistant popup. |
| `placeholder` | `string` | `'Ask AI to rewrite or generate content.'` | Placeholder text for the AI prompt input. |
| `headerToolbarSettings` | `string[]` | `['AIcommands', 'Close']` | Toolbar items for the header section. |
| `promptToolbarSettings` | `string[]` | `['Edit', 'Copy']` | Toolbar items for the prompt section. |
| `responseToolbarSettings` | `string[]` | `['Regenerate', 'Copy', ' \| ', 'Insert']` | Toolbar items for the response section. |
| `prompts` | `string[]` | `[]` | Custom prompt suggestions. |
| `suggestions` | `string[]` | `[]` | Custom response suggestions. |
| `bannerTemplate` | `string` | `''` | Banner template customization. |
| `maxPromptHistory` | `number` | `20` | Maximum number of prompts stored in history. |

---

## autoSaveOnIdle

**Type:** `boolean`  
**Default:** `false`

Enables or disables auto-save during idle states after content changes. When `true`, the editor saves based on the `saveInterval` value and triggers the `change` event if content has been modified.

---

## backgroundColor

**Type:** `BackgroundColorModel`  
**Default:** `{ columns: 5, modeSwitcher: false, showRecentColors: true, colorCode: { 'Custom': ['#ffff00', '#00ff00', ...] } }`

Defines the color palette for the **background color** (text highlight) toolbar command.

**Sub-properties (`BackgroundColorModel`):**

| Property | Type | Default | Description |
|---|---|---|---|
| `columns` | `number` | `5` | Number of columns in the color palette. |
| `modeSwitcher` | `boolean` | `false` | Enables a mode switcher for the palette. |
| `showRecentColors` | `boolean` | `true` | Shows recently used colors. |
| `colorCode` | `object` | `{ 'Custom': [...] }` | Color codes for the palette groups. |

**Example:**

```typescript
const editor = new RichTextEditor({
  toolbarSettings: { items: ['BackgroundColor'] },
  backgroundColor: {
    columns: 5,
    colorCode: { Custom: ['#ffff00', '#00ff00', '#00ffff', '#ff00ff', '#0000ff', '#ff0000', '#000000', ''] },
    showRecentColors: true,
    modeSwitcher: false,
  },
});
```

---

## bulletFormatList

**Type:** `BulletFormatListModel`  
**Default:** `{ types: [{ text: 'None', value: 'none' }, { text: 'Disc', value: 'disc' }, { text: 'Circle', value: 'circle' }, { text: 'Square', value: 'square' }] }`

Predefines bullet list types that populate the `BulletFormatList` dropdown in the toolbar.

---

## codeBlockSettings

**Type:** `CodeBlockSettingsModel`  
**Default:** `{ defaultLanguage: 'plaintext', languages: [{ language: 'plaintext', label: 'Plain text' }, { language: 'javascript', label: 'JavaScript' }, ...] }`

Predefines languages for the code block dropdown. Requires injecting the `CodeBlock` module.

**Sub-properties:**

| Property | Type | Default | Description |
|---|---|---|---|
| `defaultLanguage` | `string` | `'plaintext'` | Default language for newly inserted code blocks. |
| `languages` | `object[]` | See default | Array of `{ language, label }` objects. |

**Example:**

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, CodeBlock } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor, CodeBlock);

const editor = new RichTextEditor({
  toolbarSettings: { items: ['CodeBlock'] },
  codeBlockSettings: {
    defaultLanguage: 'plaintext',
    languages: [
      { label: 'HTML', language: 'html' },
      { label: 'JavaScript', language: 'javascript' },
      { label: 'CSS', language: 'css' },
      { label: 'Plain Text', language: 'plaintext' },
    ],
  },
});
```

---

## cssClass

**Type:** `string`  
**Default:** `null`

Appends one or more custom CSS class names to the root element of the RichTextEditor. Use to apply custom themes or override default styles.

---

## editorMode

**Type:** `EditorMode`  
**Default:** `'HTML'`

Defines the editor mode.

| Value | Description |
|---|---|
| `'HTML'` | WYSIWYG HTML editor using a content-editable `<div>`, `<iframe>`, or `<textarea>`. |
| `'Markdown'` | Markdown editor using a `<textarea>`. |

---

## emojiPickerSettings

**Type:** `EmojiSettingsModel`  
**Default:** `{ iconsSet: [], showSearchBox: false }`

Configures the emoji picker toolbar item.

| Property | Type | Default | Description |
|---|---|---|---|
| `iconsSet` | `string[]` | `[]` | Array of emoji icon identifiers. |
| `showSearchBox` | `boolean` | `false` | Enables/disables the search box in the emoji picker. |

**Example:**

```typescript
const editor = new RichTextEditor({
  toolbarSettings: { items: ['EmojiPicker'] },
  emojiPickerSettings: { iconsSet: ['smile', 'angry', 'sad'], showSearchBox: true },
});
```

---

## enableAutoUrl

**Type:** `boolean`  
**Default:** `false`

When `true`, accepts relative or absolute URLs as-is for hyperlinks without prepending `https://`. When `false`, relative URLs are automatically converted to absolute paths.

---

## enableClipboardCleanup

**Type:** `boolean`  
**Default:** `true`

When `true`, copy and cut operations are intercepted to remove unwanted inline styles from clipboard content.

---

## enableHtmlEncode

**Type:** `boolean`  
**Default:** `false`

When `true`, the source code view displays content in HTML-encoded format.

---

## enableHtmlSanitizer

**Type:** `boolean`  
**Default:** `true`

When `true`, prevents cross-site scripting (XSS) by sanitizing HTML content.

---

## enableMarkdownAutoFormat

**Type:** `boolean`  
**Default:** `true`

When `true`, Markdown syntax typed by the user is automatically converted to the corresponding HTML formatting during keypress (Markdown mode only).

---

## enablePersistence

**Type:** `boolean`  
**Default:** `false`

When `true`, the editor's value is persisted in browser storage and restored on page reload.

**Example:**

```typescript
const editor = new RichTextEditor({ enablePersistence: true });
```

---

## enableResize

**Type:** `boolean`  
**Default:** `false`

When `true`, the editor can be resized by dragging the resize handle at the bottom-right corner. Requires injecting the `Resize` module.

**Example:**

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, Resize } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor, Resize);

const editor = new RichTextEditor({ enableResize: true });
```

---

## enableRtl

**Type:** `boolean`  
**Default:** `false`

When `true`, renders the component in **right-to-left** direction.

---

## enableTabKey

**Type:** `boolean`  
**Default:** `false`

When `true`, allows the Tab key to insert a tab character inside the editor content area.

---

## enableXhtml

**Type:** `boolean`  
**Default:** `false`

When `true`, enables XHTML validation for the editor output.

---

## enabled

**Type:** `boolean`  
**Default:** `true`

When `false`, the component is **disabled** and user interactions are blocked.

---

## enterKey

**Type:** `EnterKey`  
**Default:** `'P'`

Specifies the block tag inserted when the **Enter** key is pressed.

| Value | Inserted tag | Default output |
|---|---|---|
| `'P'` | `<p>` | `<p><br></p>` |
| `'DIV'` | `<div>` | `<div><br></div>` |
| `'BR'` | `<br>` | Inline line break |

---

## exportPdf

**Type:** `ExportPdfModel`  
**Default:** `{ serviceUrl: null, fileName: 'Sample.pdf', stylesheet: null }`

Configures PDF export options.

| Property | Type | Default | Description |
|---|---|---|---|
| `serviceUrl` | `string` | `null` | Backend service URL for PDF export. |
| `fileName` | `string` | `'Sample.pdf'` | Default filename for the exported PDF. |
| `stylesheet` | `string` | `null` | Stylesheet applied to the exported PDF. |

---

## exportWord

**Type:** `ExportWordModel`  
**Default:** `{ serviceUrl: null, fileName: 'Sample.docx', stylesheet: null }`

Configures Word (`.docx`) export options.

| Property | Type | Default | Description |
|---|---|---|---|
| `serviceUrl` | `string` | `null` | Backend service URL for Word export. |
| `fileName` | `string` | `'Sample.docx'` | Default filename for the exported Word file. |
| `stylesheet` | `string` | `null` | Stylesheet applied to the exported Word file. |

---

## fileManagerSettings

**Type:** `FileManagerSettingsModel`  
**Default:** `{ enable: false, path: '/', ajaxSettings: { getImageUrl: null, url: null, uploadUrl: null }, ... }`

Configures the File Manager integration for browsing and inserting server-side images.

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | `boolean` | `false` | Enables or disables the file manager. |
| `path` | `string` | `'/'` | Default path shown in the file manager. |
| `ajaxSettings` | `object` | See default | AJAX settings: `getImageUrl`, `url`, `uploadUrl`. |
| `contextMenuSettings` | `object` | See default | Context menu items configuration. |
| `navigationPaneSettings` | `object` | See default | Navigation pane items configuration. |
| `toolbarSettings` | `object` | See default | Toolbar items configuration. |
| `uploadSettings` | `object` | See default | Upload configuration (autoUpload, maxFileSize, etc.). |

---

## floatingToolbarOffset

**Type:** `number`  
**Default:** `0`

Sets the toolbar's offset (in pixels) from the top of the document when the floating/sticky toolbar is active.

---

## fontColor

**Type:** `FontColorModel`  
**Default:** `{ columns: 10, modeSwitcher: false, showRecentColors: true, colorCode: { 'Custom': [...] } }`

Defines the color palette for the **font color** toolbar command.

| Property | Type | Default | Description |
|---|---|---|---|
| `columns` | `number` | `10` | Number of columns in the palette. |
| `modeSwitcher` | `boolean` | `false` | Enables a mode switcher. |
| `showRecentColors` | `boolean` | `true` | Shows recently used colors. |
| `colorCode` | `object` | `{ 'Custom': [...] }` | Color codes for the palette. |

**Example:**

```typescript
const editor = new RichTextEditor({
  toolbarSettings: { items: ['FontColor'] },
  fontColor: {
    columns: 2,
    colorCode: { Custom: ['#ffff00', '#008000', '#800080', '#000000', ''] },
    showRecentColors: true,
    modeSwitcher: false,
  },
});
```

---

## fontFamily

**Type:** `FontFamilyModel`  
**Default:** `{ default: 'Segoe UI', width: '65px', items: [{ text: 'Segoe UI', value: 'Segoe UI' }, ...] }`

Predefines font families for the `FontName` toolbar dropdown.

| Property | Type | Default | Description |
|---|---|---|---|
| `default` | `string` | `'Segoe UI'` | Default selected font family. |
| `width` | `string` | `'65px'` | Width of the dropdown. |
| `items` | `object[]` | See default | Array of `{ text, value }` font family items. |

---

## fontSize

**Type:** `FontSizeModel`  
**Default:** `{ default: '10pt', width: '35px', items: [{ text: '8', value: '8pt' }, ...] }`

Predefines font sizes for the `FontSize` toolbar dropdown.

| Property | Type | Default | Description |
|---|---|---|---|
| `default` | `string` | `'10pt'` | Default selected font size. |
| `width` | `string` | `'35px'` | Width of the dropdown. |
| `items` | `object[]` | See default | Array of `{ text, value }` font size items. |

---

## format

**Type:** `FormatModel`  
**Default:** `{ default: 'Paragraph', width: '65px', types: [{ text: 'Paragraph', value: 'P' }, { text: 'Heading 1', value: 'H1' }, ...] }`

Predefines paragraph and heading styles for the `Formats` toolbar dropdown.

| Property | Type | Default | Description |
|---|---|---|---|
| `default` | `string` | `'Paragraph'` | Default selected format. |
| `width` | `string` | `'65px'` | Width of the dropdown. |
| `types` | `object[]` | See default | Array of `{ text, value }` format items. |

---

## formatPainterSettings

**Type:** `FormatPainterSettingsModel`  
**Default:** `{ allowedFormats: 'b; em; font; sub; sup; kbd; i; s; u; code; strong; span; p; div; h1; h2; h3; h4; h5; h6; blockquote; ol; ul; li; pre;', deniedFormats: null }`

Configures the Format Painter toolbar item.

| Property | Type | Default | Description |
|---|---|---|---|
| `allowedFormats` | `string` | See default | CSS selector string for tags from which formats are copied. |
| `deniedFormats` | `string` | `null` | CSS selector string for tags from which format copying is blocked. |

**Example:**

```typescript
const editor = new RichTextEditor({
  toolbarSettings: { items: ['FormatPainter'] },
  formatPainterSettings: {
    allowedFormats: 'span; strong;',
    deniedFormats: 'span(important)',
  },
});
```

---

## formatter

**Type:** `IFormatter`  
**Default:** `null`

Allows customizing key code actions in the editor (e.g., for non-standard keyboard layouts).

---

## height

**Type:** `string | number`  
**Default:** `'auto'`

Specifies the height of the Rich Text Editor. Accepts CSS length values (`'300px'`, `'50%'`) or a number (treated as pixels).

---

## htmlAttributes

**Type:** `{ [key: string]: string }`  
**Default:** `{}`

Allows specifying additional HTML attributes (e.g., `title`, `name`, `aria-*`) to apply to the root element.

---

## iframeSettings

**Type:** `IFrameSettingsModel`  
**Default:** `{ enable: false, attributes: null, resources: { styles: [], scripts: [] }, metaTags: [], sandbox: null }`

Configures **iframe mode** — isolates the editor content from the host page CSS and scripts.

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | `boolean` | `false` | Enables iframe rendering. |
| `attributes` | `object` | `null` | Custom styles applied to the iframe body. |
| `resources` | `object` | `{ styles: [], scripts: [] }` | External CSS/JS files loaded inside the iframe. |
| `metaTags` | `object[]` | `[]` | Meta tags added to the iframe `<head>`. |
| `sandbox` | `string` | `null` | Iframe sandbox attribute values. |

**Example:**

```typescript
const editor = new RichTextEditor({
  iframeSettings: { enable: true },
});
```

---

## importWord

**Type:** `ImportWordModel`  
**Default:** `{ serviceUrl: null }`

Configures Word document import via a backend service endpoint.

| Property | Type | Default | Description |
|---|---|---|---|
| `serviceUrl` | `string` | `null` | URL of the import service endpoint. |

---

## inlineMode

**Type:** `InlineModeModel`  
**Default:** `{ enable: false, onSelection: true }`

Configures **inline editing** — the toolbar appears inline near the cursor/selection.

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | `boolean` | `false` | Enables inline mode. |
| `onSelection` | `boolean` | `true` | `true`: toolbar shows on text selection. `false`: toolbar shows on click. |

**Example:**

```typescript
const editor = new RichTextEditor({
  inlineMode: { enable: true },
});
```

---

## insertAudioSettings

**Type:** `AudioSettingsModel`  
**Default:** `{ allowedTypes: ['.wav', '.mp3', '.m4a', '.wma'], layoutOption: 'Inline', saveFormat: 'Blob', saveUrl: null, path: null, maxFileSize: 30000000 }`

Configures audio file insertion.

| Property | Type | Default | Description |
|---|---|---|---|
| `allowedTypes` | `string[]` | `['.wav', '.mp3', '.m4a', '.wma']` | Allowed audio file extensions. |
| `layoutOption` | `string` | `'Inline'` | Layout mode: `'Inline'` or `'Break'`. |
| `saveFormat` | `string` | `'Blob'` | Storage format: `'Blob'` or `'Base64'`. |
| `saveUrl` | `string` | `null` | Server URL for audio upload. |
| `path` | `string` | `null` | Storage path for audio files. |
| `maxFileSize` | `number` | `30000000` | Maximum upload file size in bytes (30 MB). |

---

## insertImageSettings

**Type:** `ImageSettingsModel`  
**Default:** `{ allowedTypes: ['.jpeg', '.jpg', '.png'], display: 'inline', width: 'auto', height: 'auto', saveFormat: 'Blob', saveUrl: null, path: null, maxFileSize: 30000000 }`

Configures image insertion.

| Property | Type | Default | Description |
|---|---|---|---|
| `allowedTypes` | `string[]` | `['.jpeg', '.jpg', '.png']` | Allowed image file extensions. |
| `display` | `string` | `'inline'` | Default display: `'inline'` or `'block'`. |
| `width` | `string` | `'auto'` | Default image width. |
| `height` | `string` | `'auto'` | Default image height. |
| `saveFormat` | `string` | `'Blob'` | Storage format: `'Blob'` or `'Base64'`. |
| `saveUrl` | `string` | `null` | Server URL for image upload. |
| `path` | `string` | `null` | Storage path for images. |
| `maxFileSize` | `number` | `30000000` | Maximum upload file size in bytes (30 MB). |

---

## insertVideoSettings

**Type:** `VideoSettingsModel`  
**Default:** `{ allowedTypes: ['.mp4', '.mov', '.wmv', '.avi'], layoutOption: 'Inline', width: 'auto', height: 'auto', saveFormat: 'Blob', saveUrl: null, path: null, maxFileSize: 30000000 }`

Configures video insertion.

| Property | Type | Default | Description |
|---|---|---|---|
| `allowedTypes` | `string[]` | `['.mp4', '.mov', '.wmv', '.avi']` | Allowed video file extensions. |
| `layoutOption` | `string` | `'Inline'` | Layout mode: `'Inline'` or `'Break'`. |
| `width` | `string` | `'auto'` | Default video width. |
| `height` | `string` | `'auto'` | Default video height. |
| `saveFormat` | `string` | `'Blob'` | Storage format: `'Blob'` or `'Base64'`. |
| `saveUrl` | `string` | `null` | Server URL for video upload. |
| `path` | `string` | `null` | Storage path for videos. |
| `maxFileSize` | `number` | `30000000` | Maximum upload file size in bytes (30 MB). |

---

## keyConfig

**Type:** `{ [key: string]: string }`  
**Default:** `null`

Customizes keyboard shortcut actions in the editor. Useful for non-standard keyboard layouts (e.g., German keyboards).

---

## lineHeight

**Type:** `LineHeightModel`  
**Default:** `{ default: '', items: [{ text: '1', value: '1' }, { text: '1.15', value: '1.15' }, ...], supportAllValues: false }`

Defines predefined line heights for the Line Height dropdown.

| Property | Type | Default | Description |
|---|---|---|---|
| `default` | `string` | `''` | Default line height selection. |
| `items` | `object[]` | See default | Array of `{ text, value }` line height items. |
| `supportAllValues` | `boolean` | `false` | When `true`, allows any custom value. |

---

## locale

**Type:** `string`  
**Default:** `''`

Overrides the global culture/localization for this component instance. Default is `'en-US'`.

---

## maxLength

**Type:** `number`  
**Default:** `-1`

Maximum number of characters allowed in the editor. `-1` means no limit.

---

## numberFormatList

**Type:** `NumberFormatListModel`  
**Default:** `{ types: [{ text: 'None', value: 'none' }, { text: 'Number', value: 'decimal' }, ...] }`

Predefines ordered list types for the `NumberFormatList` dropdown.

---

## pasteCleanupSettings

**Type:** `PasteCleanupSettingsModel`  
**Default:** `{ prompt: false, deniedAttrs: null, allowedStyleProps: [...], deniedTags: null, keepFormat: true, plainText: false }`

Configures paste cleanup behavior when content is pasted from external sources.

| Property | Type | Default | Description |
|---|---|---|---|
| `prompt` | `boolean` | `false` | When `true`, shows a prompt to choose paste format. |
| `deniedAttrs` | `string` | `null` | Comma-separated HTML attributes to remove on paste. |
| `allowedStyleProps` | `string[]` | See default | Inline style properties preserved on paste. |
| `deniedTags` | `string` | `null` | Comma-separated HTML tags to strip on paste. |
| `keepFormat` | `boolean` | `true` | Preserves source formatting on paste when `true`. |
| `plainText` | `boolean` | `false` | Pastes as plain text when `true`. |

---

## placeholder

**Type:** `string`  
**Default:** `null`

Specifies placeholder text displayed in the content area when the editor is empty.

---

## quickToolbarSettings

**Type:** `QuickToolbarSettingsModel`  
**Default:** `{ enable: true, actionOnScroll: 'none', link: ['Open', 'Edit', 'UnLink'], table: [...], image: [...], audio: [...], video: [...], enableAppendToBody: false }`

Configures quick toolbars that appear when an element (image, link, table, media) is selected.

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | `boolean` | `true` | Shows or hides quick toolbars. |
| `actionOnScroll` | `string` | `'none'` | `'hide'`: closes on scroll. `'none'`: stays open. |
| `link` | `string[]` | `['Open', 'Edit', 'UnLink']` | Quick toolbar items for links. |
| `image` | `string[]` | See default | Quick toolbar items for images. |
| `table` | `string[]` | See default | Quick toolbar items for tables. |
| `audio` | `string[]` | `['AudioLayoutOption', 'AudioReplace', 'AudioRemove']` | Quick toolbar items for audio. |
| `video` | `string[]` | See default | Quick toolbar items for video. |
| `enableAppendToBody` | `boolean` | `false` | Appends quick toolbar to `<body>` instead of editor root. |

**Example:**

```typescript
import { RichTextEditor, Toolbar, Image, Audio, Video, Table, Link, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Image, Link, Audio, Video, Table, HtmlEditor, QuickToolbar);

const editor = new RichTextEditor({
  quickToolbarSettings: {
    enable: true,
    actionOnScroll: 'none',
    link: ['Open', 'Edit', 'UnLink'],
    image: ['AltText', 'Caption', '|', 'Align', 'Display', '|', 'Dimension', 'Replace', 'Remove'],
    text: ['Bold', 'Italic', 'FontColor', 'BackgroundColor'],
  },
});
```

---

## readonly

**Type:** `boolean`  
**Default:** `false`

When `true`, disables all user interactions — the editor is read-only.

---

## saveInterval

**Type:** `number`  
**Default:** `10000`

Interval in milliseconds for auto-saving. The `change` event fires if content differs from the last saved state at this interval.

**Example:**

```typescript
const editor = new RichTextEditor({ saveInterval: 500 });
```

---

## shiftEnterKey

**Type:** `ShiftEnterKey`  
**Default:** `'BR'`

Specifies the tag inserted when **Shift + Enter** is pressed.

| Value | Inserted tag |
|---|---|
| `'BR'` | `<br>` (default) |
| `'P'` | `<p>` |
| `'DIV'` | `<div>` |

---

## showCharCount

**Type:** `boolean`  
**Default:** `false`

When `true`, displays a character counter at the bottom of the editor. Requires injecting the `Count` module.

**Example:**

```typescript
import { RichTextEditor, Toolbar, HtmlEditor, Count } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, HtmlEditor, Count);

const editor = new RichTextEditor({ showCharCount: true });
```

---

## showTooltip

**Type:** `boolean`  
**Default:** `true`

Controls whether tooltips are shown for toolbar items.

---

## slashMenuSettings

**Type:** `SlashMenuSettingsModel`  
**Default:** `{ enable: false, items: ['Paragraph', 'Heading 1', 'Heading 2', 'Heading 3', 'Heading 4', 'OrderedList', 'UnorderedList', 'CodeBlock', 'BlockQuote'], popupWidth: '300px', popupHeight: '320px' }`

Configures the **slash menu** — a popup triggered by typing `/` in the editor.

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | `boolean` | `false` | Enables or disables the slash menu. |
| `items` | `string[]` | See default | Items displayed in the slash menu popup. |
| `popupWidth` | `string` | `'300px'` | Width of the slash menu popup. |
| `popupHeight` | `string` | `'320px'` | Height of the slash menu popup. |

---

## tableSettings

**Type:** `TableSettingsModel`  
**Default:** `{ width: '100%', styles: [...], resize: true, minWidth: 0, maxWidth: null }`

Configures table insertion options.

| Property | Type | Default | Description |
|---|---|---|---|
| `width` | `string` | `'100%'` | Default width for inserted tables. |
| `styles` | `object[]` | See default | Predefined CSS styles applied to tables. |
| `resize` | `boolean` | `true` | Enables or disables table resizing. |
| `minWidth` | `number` | `0` | Minimum width of inserted tables. |
| `maxWidth` | `number` | `null` | Maximum width of inserted tables. |

**Example:**

```typescript
import { RichTextEditor, Toolbar, Table, HtmlEditor, QuickToolbar } from '@syncfusion/ej2-richtexteditor';
RichTextEditor.Inject(Toolbar, Table, HtmlEditor, QuickToolbar);

const editor = new RichTextEditor({
  tableSettings: {
    width: '100%',
    styles: [
      { text: 'Dashed Borders', command: 'Table', subCommand: 'Dashed' },
      { text: 'Alternate Rows', command: 'Table', subCommand: 'Alternate' },
    ],
    resize: true,
    minWidth: 0,
    maxWidth: null,
  },
});
```

---

## toolbarSettings

**Type:** `ToolbarSettingsModel`  
**Default:** `{ enable: true, enableFloating: true, position: ToolbarPosition.Top, type: ToolbarType.Expand, items: ['Bold', 'Italic', 'Underline', ' | ', 'Formats', 'Alignments', 'OrderedList', 'UnorderedList', ' | ', 'CreateLink', 'Image', ' | ', 'SourceCode', 'Undo', 'Redo'], itemConfigs: {} }`

Configures the editor toolbar.

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | `boolean` | `true` | Shows or hides the toolbar. |
| `enableFloating` | `boolean` | `true` | Keeps the toolbar fixed at the top during scrolling. |
| `position` | `ToolbarPosition` | `Top` | `Top` or `Bottom`. |
| `type` | `ToolbarType` | `Expand` | `Expand`, `MultiRow`, `Scrollable`, or `Popup`. |
| `items` | `string[]` | See default | Toolbar item identifiers. Use `'\|'` for vertical and `'-'` for horizontal separators. |
| `itemConfigs` | `object` | `{}` | Overrides default item configuration (e.g., icon class). |

---

## undoRedoSteps

**Type:** `number`  
**Default:** `30`

Number of undo/redo history steps stored.

**Example:**

```typescript
const editor = new RichTextEditor({ undoRedoSteps: 10 });
```

---

## undoRedoTimer

**Type:** `number`  
**Default:** *(minimum 300 ms)*

Interval in milliseconds at which actions are grouped into a single undo/redo step. Minimum value is `300`.

---

## value

**Type:** `string`  
**Default:** `null`

Initial content displayed in the editor. Accepts an HTML string (HTML mode) or a markdown string (Markdown mode).

**Example:**

```typescript
const editor = new RichTextEditor({ value: '<p>Hello, World!</p>' });
```

---

## valueTemplate

**Type:** `string | Function`  
**Default:** `null`

Accepts inner HTML of the editor's host element as the initial content template. Supports ES6 template string literal expressions.

---

## width

**Type:** `string | number`  
**Default:** `'100%'`

Specifies the width of the Rich Text Editor. Accepts CSS length values or a number (treated as pixels).
