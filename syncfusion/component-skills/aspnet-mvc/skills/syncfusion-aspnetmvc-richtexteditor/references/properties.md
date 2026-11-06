# Rich Text Editor Properties

Complete reference for all properties available on the Syncfusion ASP.NET MVC Rich Text Editor component.

## Table of Contents
- [Core Properties](#core-properties)
- [Toolbar Properties](#toolbar-properties)
- [Editor Mode & Behavior](#editor-mode--behavior)
- [Value & Content Properties](#value--content-properties)
- [Media Insert Properties](#media-insert-properties)
- [Font, Color & Format Properties](#font-color--format-properties)
- [Paste & Clipboard Properties](#paste--clipboard-properties)
- [Table Properties](#table-properties)
- [AI Assistant Properties](#ai-assistant-properties)
- [Slash Menu Properties](#slash-menu-properties)
- [Import / Export Properties](#import--export-properties)
- [Miscellaneous Properties](#miscellaneous-properties)

---

## Core Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `height` | `string` | `null` | Height of the editor (px or %) |
| `width` | `string` | `"100%"` | Width of the editor |
| `enabled` | `bool` | `true` | Enable/disable the editor |
| `readOnly` | `bool` | `false` | Makes editor read-only |
| `placeholder` | `string` | `null` | Placeholder text when empty |
| `cssClass` | `string` | `null` | Additional CSS class(es) |
| `htmlAttributes` | `object` | `null` | Extra HTML attributes |
| `locale` | `string` | `"en-US"` | Language/localization |
| `showTooltip` | `bool` | `true` | Show/hide toolbar tooltips |
| `zIndex` | `number` | `1000` | Z-index for layering |

**Usage Example:**
```csharp
@(Html.EJS().RichTextEditor("editor")
    .Height("450px")
    .Width("100%")
    .Placeholder("Start typing here...")
    .ReadOnly(false)
    .CssClass("my-custom-editor")
    .ShowTooltip(true)
    .Render())
```

---

## Toolbar Properties

| Property | Type | Description |
|---|---|---|
| `toolbarSettings` | `RichTextEditorToolbarSettings` | Main toolbar configuration |
| `quickToolbarSettings` | `RichTextEditorQuickToolbarSettings` | Inline toolbar for images/links/tables |
| `showTooltip` | `bool` | Show/hide toolbar item tooltips |
| `floatingToolbarOffset` | `double` | Px offset from top for floating toolbar |
| `enableFloatingToolbar` | `bool` | Sticky toolbar on scroll |
| `enableGroupSeparator` | `bool` | Show group separators in toolbar |

### ToolbarSettings

**Properties:**
- `Items` (string[]) - Toolbar button names (use `"|"` for separator)
- `Type` (string) - Overflow behavior: `"Expand"`, `"MultiRow"`, `"Scrollable"`, `"Popup"`
- `EnableFloating` (bool) - Floating toolbar on scroll

### QuickToolbarSettings

**Properties:**
- `Image` (string[]) - Items for image context toolbar
- `Link` (string[]) - Items for link context toolbar
- `Table` (string[]) - Items for table context toolbar
- `Audio` (string[]) - Items for audio context toolbar
- `Video` (string[]) - Items for video context toolbar

---

## Editor Mode & Behavior

| Property | Type | Default | Description |
|---|---|---|---|
| `editorMode` | `EditorMode` | `EditorMode.HTML` | HTML (WYSIWYG) or Markdown editor |
| `iframeSettings` | `RichTextEditorIframeSettings` | `null` | Enable iframe mode for CSS isolation |
| `inlineMode` | `RichTextEditorInlineMode` | `null` | Enable inline editing (toolbar on selection) |
| `enterKey` | `EnterKey` | `EnterKey.P` | Tag on Enter: P, DIV, or BR |
| `enableTabKey` | `bool` | `false` | Allow Tab key to insert tab char |
| `enableResize` | `bool` | `false` | Allow editor resize (bottom-right handle) |
| `enableRtl` | `bool` | `false` | Right-to-left direction for Arabic/Hebrew |
| `enablePersistence` | `bool` | `false` | Persist content via localStorage |
| `enableXhtml` | `bool` | `false` | XHTML validation mode |

**Usage Example:**
```csharp
// HTML Mode (default)
@(Html.EJS().RichTextEditor("editor")
    .EditorMode(EditorMode.HTML)
    .EnableResize(true)
    .EnableTabKey(true)
    .EnterKey(EnterKey.DIV)
    .Render())

// Markdown Mode
@(Html.EJS().RichTextEditor("mdEditor")
    .EditorMode(EditorMode.Markdown)
    .Render())

// Inline Mode
@(Html.EJS().RichTextEditor("inlineEditor")
    .InlineMode(inline => inline
        .Enable(true)
        .OnSelection(true)
    )
    .Render())
```

### IframeSettings

Enables iframe mode for full CSS isolation.

**Usage Example:**
```csharp
.IframeSettings(iframe => iframe
    .Enable(true)
    .Attributes(new { style = "border: 1px solid #ccc;" })
)
```

---

## Value & Content Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `null` | HTML or Markdown content |
| `maxLength` | `number` | `null` | Max characters (null = unlimited) |
| `showCharCount` | `bool` | `false` | Display character count indicator |
| `saveInterval` | `number` | `10000` | Auto-save idle delay (ms) |
| `autoSaveOnIdle` | `string` | `null` | Enable auto-save on idle |
| `enableHtmlEncode` | `bool` | `false` | Store/retrieve HTML as encoded string |
| `enableHtmlSanitizer` | `bool` | `true` | XSS sanitization (enable for untrusted input) |
| `undoRedoSteps` | `number` | `30` | Number of undo/redo steps |
| `undoRedoTimer` | `number` | `300` | Time interval (ms) for undo history |

**Usage Example:**
```csharp
@(Html.EJS().RichTextEditor("editor")
    .Value("<p>Initial content</p>")
    .MaxLength(5000)
    .ShowCharCount(true)
    .SaveInterval(3000)
    .AutoSaveOnIdle("enableAutoSave")
    .EnableHtmlSanitizer(true)
    .UndoRedoSteps(50)
    .Render()
```

---

## Media Insert Properties

### InsertImageSettings

> **⚠️ IMPORTANT:** To enable image insertion, you **MUST** add the `Image` toolbar item to the toolbar. Without it, users cannot access the image insertion UI.

| Property | Type | Default | Description |
|---|---|---|---|
| `allowedTypes` | `string[]` | `[".jpeg",".jpg",".png"]` | Permitted image formats |
| `display` | `string` | `"inline"` | Display mode: inline or block |
| `saveUrl` | `string` | `null` | Upload endpoint URL |
| `removeUrl` | `string` | `null` | Delete endpoint URL |
| `path` | `string` | `null` | Base path for uploaded images |
| `resize` | `bool` | `false` | Allow image resize |
| `minWidth` | `string` | `null` | Minimum image width |
| `maxWidth` | `string` | `null` | Maximum image width |
| `minHeight` | `string` | `null` | Minimum image height |
| `maxHeight` | `string` | `null` | Maximum image height |

**Usage Example:**
```csharp
@(Html.EJS().RichTextEditor("rte")
    .ToolbarSettings(e => e.Items((object)new[] { "Image", "Undo", "Redo" }))
    .InsertImageSettings(img => img
        .SaveUrl("/Home/SaveImage")
        .Path("/images/")
        .AllowedTypes(new string[] { ".jpeg", ".jpg", ".png", ".gif", ".webp" })
        .Resize(true)
        .MaxWidth("1000px")
        .MaxHeight("800px")
    )
    .Render()
```

### InsertVideoSettings

| Property | Default | Description |
|---|---|---|
| `allowedTypes` | `[".mp4",".webm",".ogg"]` | Permitted video formats |
| `saveUrl` | `null` | Upload endpoint |
| `path` | `null` | Base path for videos |

### InsertAudioSettings

| Property | Default | Description |
|---|---|---|
| `allowedTypes` | `[".mp3",".wav",".ogg"]` | Permitted audio formats |
| `saveUrl` | `null` | Upload endpoint |
| `path` | `null` | Base path for audio |

### InsertTableSettings

| Property | Type | Description |
|---|---|---|
| `rows` | `number` | Default number of rows |
| `columns` | `number` | Default number of columns |

**Usage Example:**
```csharp
.InsertTableSettings(table => table
    .Rows(3)
    .Columns(4)
)
```

### InsertLinkSettings

| Property | Type | Description |
|---|---|---|
| `enable` | `bool` | Enable/disable link insertion |
| `defaultProtocol` | `string` | Default protocol (http, https, ftp) |

---

## Font, Color & Format Properties

### FontFamily

**Usage Example:**
```csharp
.FontFamily(font => font
    .Default("Segoe UI")
    .Items(new object[] {
        new { text = "Segoe UI", value = "Segoe UI" },
        new { text = "Arial", value = "Arial" },
        new { text = "Georgia", value = "Georgia" }
    })
)
```

### FontSize

**Usage Example:**
```csharp
.FontSize(size => size
    .Default("16px")
    .Items(new object[] {
        new { text = "10px", value = "10px" },
        new { text = "14px", value = "14px" },
        new { text = "18px", value = "18px" }
    })
)
```

### FontColor & BackgroundColor

Controls the color palette for font and highlight colors. Properties include `Columns`, `ColorCode`, `Mode`.

### Format

Defines paragraph styles (Heading, Paragraph, Quote, Code).

**Usage Example:**
```csharp
.Format(fmt => fmt
    .Default("Paragraph")
    .Width("100px")
    .Types(new object[] {
        new { text = "Paragraph", value = "P" },
        new { text = "Heading 1", value = "H1" },
        new { text = "Heading 2", value = "H2" }
    })
)
```

### LineHeight, NumberFormatList, BulletFormatList

Configure line-height, ordered list, and unordered list style options.

### FormatPainterSettings

**Usage Example:**
```csharp
.FormatPainterSettings(fp => fp
    .AllowedFormats(new string[] { "p", "h1", "h2", "strong", "em" })
    .DeniedFormats(new string[] { "script", "style" })
)
```

---

## Paste & Clipboard Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `pasteCleanupSettings` | `RichTextEditorPasteCleanupSettings` | `null` | Paste cleanup configuration |
| `enableAutoUrl` | `bool` | `false` | Auto-convert URLs to clickable links |

### PasteCleanupSettings

| Property | Type | Default | Description |
|---|---|---|---|
| `prompt` | `bool` | `false` | Show dialog asking how to paste |
| `plainText` | `bool` | `false` | Strip all formatting on paste |
| `keepFormat` | `bool` | `true` | Preserve source formatting |
| `deniedTags` | `string[]` | `[]` | Tags to remove (e.g., "script", "iframe") |
| `allowedStyleProps` | `string[]` | `[]` | CSS properties to preserve |

**Security Best Practices - Usage Example:**
```csharp
.PasteCleanupSettings(pc => pc
    .Prompt(true)
    .DeniedTags(new string[] { "script", "iframe", "embed", "object", "applet" })
    .AllowedStyleProps(new string[] { "color", "font-size", "font-weight", "text-align" })
)
```

---

## Table Properties

| Property | Type | Description |
|---|---|---|
| `tableSettings` | `RichTextEditorTableSettings` | Table configuration |

### TableSettings Properties

| Property | Type | Description |
|---|---|---|
| `minWidth` | `string` | Minimum table width |
| `maxWidth` | `string` | Maximum table width |
| `resize` | `bool` | Allow column/row resizing |

**Usage Example:**
```csharp
.TableSettings(table => table
    .MinWidth("200px")
    .MaxWidth("100%")
)
```

---

## AI Assistant Properties

### AiAssistantSettings

Configures AI Assistant functionality with custom commands, popup dimensions, toolbars, and suggestions.

| Property | Type | Default | Description |
|---|---|---|---|
| `commands` | `object[]` | Predefined commands | AI command definitions with text and prompt |
| `popupWidth` | `string` | `"600px"` | Width of AI popup |
| `popupMaxHeight` | `string` | `"400px"` | Maximum height of AI popup |
| `placeholder` | `string` | AI default | Placeholder text for prompt input |
| `prompts` | `object[]` | `[]` | Preloaded prompt-response pairs |
| `suggestions` | `string[]` | `[]` | Quick suggestion prompts |

**Usage Example:**
```csharp
.AiAssistantSettings(ai => ai
    .PopupWidth("600px")
    .PopupMaxHeight("450px")
    .Placeholder("Ask AI to help...")
)
```

### Custom AI Commands

```csharp
.AiAssistantSettings(ai => ai
    .Commands(new object[] {
        new { text = "Rewrite", prompt = "Rewrite to be more refined." },
        new { text = "Elaborate", prompt = "Expand with more detail." },
        new {
            text = "Change Tone",
            items = new object[] {
                new { text = "Professional", prompt = "Make this professional:" },
                new { text = "Casual", prompt = "Make this casual:" }
            }
        }
    })
)
```

### Preloading Conversations

```csharp
.AiAssistantSettings(ai => ai
    .Prompts(new object[] {
        new { 
            prompt = "What is Essential Studio?",
            response = "Essential Studio is a toolkit by Syncfusion..."
        }
    })
    .Suggestions(new string[] {
        "What are popular components?",
        "Which frameworks are supported?"
    })
)
```

---

## Slash Menu Properties

### SlashMenuSettings

Enables quick-access menu triggered by typing `/` to insert elements like headings, lists, and media.

| Property | Type | Default | Description |
|---|---|---|---|
| `enable` | `bool` | `false` | Enable/disable slash menu |
| `items` | `string[]` | Built-in items | Menu items to display |
| `popupWidth` | `string` | `"300px"` | Width of slash menu popup |
| `popupHeight` | `string` | `"320px"` | Height of slash menu popup |

**Built-in Item Names:**
- Text: `"Paragraph"`, `"Heading 1"`, `"Heading 2"`, `"Heading 3"`, `"Heading 4"`, `"Blockquote"`
- Lists: `"OrderedList"`, `"UnorderedList"`, `"CodeBlock"`
- Media: `"Image"`, `"Audio"`, `"Video"`, `"Link"`, `"Table"`, `"Emojipicker"`

**⚠️ Important:** Use exact names - case-sensitive!

**Usage Example:**
```csharp
.SlashMenuSettings(slash => slash
    .Enable(true)
    .Items(new string[] {
        "Paragraph", "Heading 1", "Heading 2", "Heading 3",
        "OrderedList", "UnorderedList", "CodeBlock",
        "Image", "Table", "Link", "Emojipicker"
    })
    .PopupWidth("400px")
    .PopupHeight("350px")
)
```

---

## Import / Export Properties

| Property | Type | Description |
|---|---|---|
| `importWord` | `RichTextEditorImportWordSettings` | Word import configuration |
| `exportWord` | `RichTextEditorExportWordSettings` | Word export settings |
| `exportPdf` | `RichTextEditorExportPdfSettings` | PDF export settings |

### Usage Example

```csharp
.ImportWord(word => word
    .ServiceUrl("/Home/ImportFromWord")
)
.ExportWord(word => word
    .ServiceUrl("/Home/ExportToDocx")
    .FileName("Document.docx")
)
.ExportPdf(pdf => pdf
    .ServiceUrl("/Home/ExportToPdf")
    .FileName("Document.pdf")
)
```

---

## Miscellaneous Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `enableHtmlSanitizer` | `bool` | `true` | XSS prevention (sanitize untrusted input) |
| `enableImageDragDrop` | `bool` | `true` | Allow drag-drop image insertion |
| `enableSelection` | `bool` | `true` | Allow text selection |
| `enableHtmlEditor` | `bool` | `true` | Enable HTML editor mode |
| `enableMarkdownEditor` | `bool` | `false` | Enable Markdown editor mode |
| `showQuickToolbar` | `bool` | `true` | Show inline quick toolbar |
| `emojiPickerSettings` | `RichTextEditorEmojiSettings` | `null` | Emoji picker configuration |
| `keyConfig` | `object` | `null` | Custom keyboard shortcut mappings |
| `minHeight` | `string` | `null` | Minimum editor height |
| `fullScreen` | `RichTextEditorFullScreenSettings` | `null` | Fullscreen mode settings |
| `fileManagerSettings` | `RichTextEditorFileManagerSettings` | `null` | File manager for image browser |

**Keyboard Shortcuts - Usage Example:**
```csharp
.KeyConfig(new Dictionary<string, string>() {
    { "ctrl+e", "centerAlign" },
    { "ctrl+j", "justifyFull" },
    { "ctrl+k", "createLink" }
})
```

---

