# Rich Text Editor Properties

## Table of Contents
- [AI Assistant Configuration](#ai-assistant-configuration)
- [Auto-Save and Idle State](#auto-save-and-idle-state)
- [Color Palette Settings](#color-palette-settings)
- [Code Block and Format Lists](#code-block-and-format-lists)
- [Editor Mode and Behavior](#editor-mode-and-behavior)
- [Emoji Picker Settings](#emoji-picker-settings)
- [Feature Flags](#feature-flags)
- [Import/Export Configuration](#importexport-configuration)
- [IFrame and Inline Mode](#iframe-and-inline-mode)
- [Media Insertion Settings](#media-insertion-settings)
- [Styling and Appearance](#styling-and-appearance)
- [Toolbar and Format Configuration](#toolbar-and-format-configuration)
- [File Manager Integration](#file-manager-integration)

---

## AI Assistant Configuration

### aiAssistantSettings

**Type:** `AIAssistantSettingsModel`

Configures the AI Assistant functionality for the Rich Text Editor, including commands, popup dimensions, prompts, and toolbar settings.

**Key Properties:**
- `commands`: Predefined AI commands in the dropdown menu
- `popupWidth`: Width of the AI Assistant popup (default: `'600px'`)
- `popupMaxHeight`: Maximum height of the popup (default: `'400px'`)
- `placeholder`: Placeholder text for AI prompt input (default: `'Ask AI to rewrite or generate content.'`)
- `headerToolbarSettings`: Toolbar configuration for the header section (default: `['AIcommands', 'Close']`)
- `promptToolbarSettings`: Toolbar configuration for the prompt editor (default: `['Edit', 'Copy']`)
- `responseToolbarSettings`: Toolbar configuration for the response viewer (default: `['Regenerate', 'Copy', ' | ', 'Insert']`)
- `prompts`: Collection of predefined prompts and responses
- `suggestions`: Suggestion prompts displayed as guidance
- `bannerTemplate`: Custom template for the banner
- `maxPromptHistory`: Maximum number of prompts in history stack (default: `20`)

**Example:**
```typescript
import { Component } from '@angular/core';
import { AIAssistantSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor [aiAssistantSettings]="aiSettings"></ejs-richtexteditor>`
})
export class AppComponent {
  public aiSettings: AIAssistantSettingsModel = {
    popupWidth: '700px',
    popupMaxHeight: '500px',
    placeholder: 'How can AI help you today?',
    maxPromptHistory: 30,
    suggestions: [
      'Improve writing clarity',
      'Make it more professional',
      'Summarize this content'
    ]
  };
}
```

---

## Auto-Save and Idle State

### autoSaveOnIdle

**Type:** `boolean`  
**Default:** `false`

Enables auto-save functionality during idle states after content changes. The editor saves content based on the `saveInterval` property's value. The `change` event is triggered if content has been modified since the last saved state.

**Example:**
```typescript
<ejs-richtexteditor 
  [autoSaveOnIdle]="true" 
  (change)="onAutoSave($event)">
</ejs-richtexteditor>

onAutoSave(args: ChangeEventArgs): void {
  console.log('Auto-saving content:', args.value);
  // Save to database or local storage
}
```

---

## Color Palette Settings

### backgroundColor

**Type:** `BackgroundColorModel`  
**Default:** 5 columns, 60+ predefined colors, recent colors enabled

Defines the color palette for the background color (text highlight) toolbar command.

**Key Properties:**
- `columns`: Number of columns in the color palette (default: `5`)
- `colorCode`: Custom color codes organized by category
- `showRecentColors`: Shows recently used colors (default: `true`)
- `modeSwitcher`: Enables mode switcher button (default: `false`)
- `default`: Default background color

**Example:**
```typescript
import { BackgroundColorModel } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor [backgroundColor]="bgColor"></ejs-richtexteditor>`
})
export class AppComponent {
  public bgColor: BackgroundColorModel = {
    columns: 2,
    colorCode: {
      'Custom': ['#ffff00', '#008000', '#800080', '#800000', '#808000', '#c0c0c0', '#000000', '']
    },
    showRecentColors: true,
    modeSwitcher: false
  };
}
```

### fontColor

**Type:** `FontColorModel`  
**Default:** 10 columns, 60+ predefined colors, recent colors enabled

Defines the color palette for the font color toolbar command. Has the same structure as `BackgroundColorModel`.

**Example:**
```typescript
public fontColor: FontColorModel = {
  columns: 10,
  showRecentColors: true,
  default: '#000000'
};
```

---

## Code Block and Format Lists

### codeBlockSettings

**Type:** `CodeBlockSettingsModel`  
**Default:** 15 predefined languages (plaintext, C, C#, C++, CSS, HTML, Java, JavaScript, PHP, Python, etc.)

Configures the code block dropdown options in the toolbar.

**Key Properties:**
- `defaultLanguage`: Default language for new code blocks (default: `'plaintext'`)
- `languages`: Array of available programming languages

**Example:**
```typescript
import { CodeBlockSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor [codeBlockSettings]="codeSettings"></ejs-richtexteditor>`,
  providers: [CodeBlockService]
})
export class AppComponent {
  public codeSettings: CodeBlockSettingsModel = {
    languages: [
      { label: 'HTML', language: 'html' },
      { label: 'JavaScript', language: 'javascript' },
      { label: 'CSS', language: 'css' },
      { label: 'TypeScript', language: 'typescript' },
      { label: 'Plain Text', language: 'plaintext' }
    ],
    defaultLanguage: 'javascript'
  };
}
```

### bulletFormatList

**Type:** `BulletFormatListModel`  
**Default:** None, Disc, Circle, Square

Predefines advanced list types for the bulletFormatList dropdown in the toolbar.

**Example:**
```typescript
public bulletList: BulletFormatListModel = {
  types: [
    { text: 'None', value: 'none' },
    { text: 'Disc', value: 'disc' },
    { text: 'Circle', value: 'circle' },
    { text: 'Square', value: 'square' },
    { text: 'Custom', value: 'url("custom-bullet.png")' }
  ]
};
```

---

## Editor Mode and Behavior

### editorMode

**Type:** `EditorMode` (Enum)  
**Default:** `'HTML'`  
**Values:** `'HTML'` | `'Markdown'`

Defines the mode of the RichTextEditor. Use `HTML` for WYSIWYG editing or `Markdown` for markdown syntax editing.

**Example:**
```typescript
<ejs-richtexteditor editorMode="Markdown"></ejs-richtexteditor>
```

### enterKey

**Type:** `EnterKey` (Enum)  
**Default:** `'P'`  
**Values:** `'P'` | `'DIV'` | `'BR'`

Specifies the tag inserted when the enter key is pressed:
- `'P'`: Inserts `<p><br></p>` (default)
- `'DIV'`: Inserts `<div>` tag
- `'BR'`: Inserts `<br>` tag

**Example:**
```typescript
<ejs-richtexteditor enterKey="DIV"></ejs-richtexteditor>
```

---

## Emoji Picker Settings

### emojiPickerSettings

**Type:** `EmojiSettingsModel`

Configures emoji picker options when the EmojiPicker toolbar item is enabled.

**Key Properties:**
- `iconsSet`: Array of emoji icons to display
- `showSearchBox`: Enables/disables the search box (default: `true`)

**Example:**
```typescript
import { EmojiSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor [emojiPickerSettings]="emojiSettings"></ejs-richtexteditor>`,
  providers: [EmojiPickerService]
})
export class AppComponent {
  public emojiSettings: EmojiSettingsModel = {
    showSearchBox: true,
    iconsSet: [
      { name: 'Grinning face', code: '😀' },
      { name: 'Thumbs up', code: '👍' },
      { name: 'Heart', code: '❤️' }
    ]
  };
}
```

---

## Feature Flags

### enableAutoUrl

**Type:** `boolean`  
**Default:** `false`

When enabled, accepts URLs (relative or absolute) without validation. Otherwise, URLs are automatically converted to absolute paths by prefixing with `https://`.

```typescript
<ejs-richtexteditor [enableAutoUrl]="true"></ejs-richtexteditor>
```

### enableClipboardCleanup

**Type:** `boolean`  
**Default:** `true`

Enables Clipboard Cleanup feature. When true, copy and cut operations remove unwanted inline styles.

### enableHtmlEncode

**Type:** `boolean`  
**Default:** `false`

Determines if source code should be displayed in an encoded format.

### enableHtmlSanitizer

**Type:** `boolean`  
**Default:** `true`

Prevents cross-site scripting (XSS) attacks by sanitizing HTML content.

### enableMarkdownAutoFormat

**Type:** `boolean`  
**Default:** `true`

Enables automatic conversion of Markdown syntax to HTML formatting during keypress.

### enablePersistence

**Type:** `boolean`  
**Default:** `false`

Enables persistence of the component's state between page reloads. Retains the editor's value.

### enableResize

**Type:** `boolean`  
**Default:** `false`

Enables resizing option. When enabled, editor can be resized by dragging the resize icon in the bottom right corner.

```typescript
<ejs-richtexteditor [enableResize]="true"></ejs-richtexteditor>
```

### enableRtl

**Type:** `boolean`  
**Default:** `false`

Enables right-to-left rendering.

### enableTabKey

**Type:** `boolean`  
**Default:** `false`

Allows the tab key action in the editor content.

### enableXhtml

**Type:** `boolean`  
**Default:** `false`

Enables XHTML validation. Use with `getXhtml()` method to retrieve XHTML-validated content.

### enabled

**Type:** `boolean`  
**Default:** `true`

Indicates whether the component is enabled or disabled.

---

## Import/Export Configuration

### exportPdf

**Type:** `ExportPdfModel`  
**Default:** `{ serviceUrl: null, fileName: 'Sample.pdf', stylesheet: null }`

Configures PDF export options.

**Key Properties:**
- `serviceUrl`: URL for exporting content to PDF
- `fileName`: Default PDF file name (default: `'Sample.pdf'`)
- `stylesheet`: Stylesheet to apply to exported PDF

**Example:**
```typescript
import { ExportPdfModel } from '@syncfusion/ej2-angular-richtexteditor';

public pdfExport: ExportPdfModel = {
  serviceUrl: 'url',
  fileName: 'Document.pdf',
  stylesheet: 'body { font-family: Arial; font-size: 12pt; }'
};
```

### exportWord

**Type:** `ExportWordModel`  
**Default:** `{ serviceUrl: null, fileName: 'Sample.docx', stylesheet: null }`

Configures Word export options with the same structure as `exportPdf`.

### importWord

**Type:** `ImportWordModel`  
**Default:** `{ serviceUrl: null }`

Configures Word import options. The `serviceUrl` specifies the endpoint for importing Word documents.

**Example:**
```typescript
public wordImport: ImportWordModel = {
  serviceUrl: 'url'
};
```

---

## IFrame and Inline Mode

### iframeSettings

**Type:** `IFrameSettingsModel`  
**Default:** `{ enable: false, attributes: null, resources: { styles: [], scripts: [] }, metaTags: [], sandbox: null }`

Configures iframe mode for isolated styling and CSS encapsulation.

**Key Properties:**
- `enable`: Enables iframe mode (default: `false`)
- `attributes`: HTML attributes for the iframe element
- `resources`: External stylesheets and scripts to load
- `metaTags`: Meta tags to include in the iframe document
- `sandbox`: Sandbox attribute value for security restrictions

**Example:**
```typescript
import { IFrameSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

public iframeConfig: IFrameSettingsModel = {
  enable: true,
  resources: {
    styles: ['url'],
    scripts: []
  },
  attributes: { title: 'Rich Text Editor Content' }
};
```

### inlineMode

**Type:** `InlineModeModel`  
**Default:** `{ enable: false, onSelection: true }`

Configures inline editing mode where content is edited directly in-page.

**Key Properties:**
- `enable`: Enables inline mode (default: `false`)
- `onSelection`: Toolbar renders only when text is selected (default: `true`)

**Example:**
```typescript
import { InlineModeModel } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor [inlineMode]="inlineConfig"></ejs-richtexteditor>`
})
export class AppComponent {
  public inlineConfig: InlineModeModel = {
    enable: true,
    onSelection: true
  };
}
```

---

## Media Insertion Settings

### insertImageSettings

**Type:** `ImageSettingsModel`  
**Default:** `{ allowedTypes: ['.jpeg', '.jpg', '.png'], display: 'inline', width: 'auto', height: 'auto', saveFormat: 'Blob', saveUrl: null, path: null, maxFileSize: 30000000 }`

Configures image insertion options.

**Key Properties:**
- `allowedTypes`: Allowed file extensions (default: `['.jpeg', '.jpg', '.png']`)
- `display`: Display mode: `'inline'` or `'block'`
- `width`, `height`: Default dimensions (default: `'auto'`)
- `saveFormat`: Save format: `'Blob'` or `'Base64'`
- `saveUrl`: Server endpoint for image upload
- `path`: Server path where images are saved
- `maxFileSize`: Maximum file size in bytes (default: `30000000` = 30MB)

**Example:**
```typescript
import { ImageSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

public imageSettings: ImageSettingsModel = {
  allowedTypes: ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
  maxFileSize: 5000000, // 5MB
  saveUrl: 'url',
  saveFormat: 'Blob',
  width: '100%',
  height: 'auto'
};
```

### insertAudioSettings

**Type:** `AudioSettingsModel`  
**Default:** `{ allowedTypes: ['.wav', '.mp3', '.m4a', '.wma'], layoutOption: 'Inline', saveFormat: 'Blob', saveUrl: null, path: null, maxFileSize: 30000000 }`

Configures audio insertion options with similar structure to image settings.

### insertVideoSettings

**Type:** `VideoSettingsModel`  
**Default:** `{ allowedTypes: ['.mp4', '.mov', '.wmv', '.avi'], layoutOption: 'Inline', width: 'auto', height: 'auto', saveFormat: 'Blob', saveUrl: null, path: null, maxFileSize: 30000000 }`

Configures video insertion options with similar structure to image settings.

---

## Styling and Appearance

### cssClass

**Type:** `string`  
**Default:** `null`

Specifies CSS class names appended to the root element. Multiple classes can be added (space-separated).

**Example:**
```typescript
<ejs-richtexteditor cssClass="custom-editor dark-theme"></ejs-richtexteditor>
```

### height

**Type:** `string | number`  
**Default:** `'auto'`

Specifies the height of the editor. Can be a pixel value (number), percentage, or `'auto'`.

**Example:**
```typescript
<ejs-richtexteditor [height]="500"></ejs-richtexteditor>
<ejs-richtexteditor height="100%"></ejs-richtexteditor>
```

### htmlAttributes

**Type:** `{ [key: string]: string }`  
**Default:** `{}`

Allows specifying additional HTML attributes like `title`, `name`, etc.

**Example:**
```typescript
public attrs = {
  title: 'Rich Text Editor',
  name: 'content-editor',
  'data-id': 'editor-1'
};
```

### floatingToolbarOffset

**Type:** `number`  
**Default:** `0`

Keeps the toolbar fixed at the top during scrolling and specifies the toolbar's offset from the document's top position.

**Example:**
```typescript
<ejs-richtexteditor [floatingToolbarOffset]="50"></ejs-richtexteditor>
```

---

## Toolbar and Format Configuration

### fontFamily

**Type:** `FontFamilyModel`  
**Default:** `{ default: 'Segoe UI', width: '65px', items: [...common fonts] }`

Predefines font families for the font family dropdown in the toolbar.

**Example:**
```typescript
import { FontFamilyModel } from '@syncfusion/ej2-angular-richtexteditor';

public fontFamily: FontFamilyModel = {
  default: 'Arial',
  width: '120px',
  items: [
    { text: 'Arial', value: 'Arial,Helvetica,sans-serif' },
    { text: 'Georgia', value: 'Georgia,serif' },
    { text: 'Courier New', value: '"Courier New",monospace' },
    { text: 'Comic Sans MS', value: '"Comic Sans MS",cursive' }
  ]
};
```

### fontSize

**Type:** `FontSizeModel`  
**Default:** `{ default: '10pt', width: '35px', items: [8pt to 36pt] }`

Defines predefined font sizes for the font size dropdown.

**Example:**
```typescript
public fontSize: FontSizeModel = {
  default: '12pt',
  width: '40px',
  items: [
    { text: '8', value: '8pt' },
    { text: '10', value: '10pt' },
    { text: '12', value: '12pt' },
    { text: '14', value: '14pt' },
    { text: '18', value: '18pt' },
    { text: '24', value: '24pt' }
  ]
};
```

### format

**Type:** `FormatModel`  
**Default:** `{ default: 'Paragraph', width: '65px', types: [Paragraph, Heading 1-6, Code, Quotation, Preformatted] }`

Predefines paragraph styles, quote, and code styles for the format dropdown.

**Example:**
```typescript
public format: FormatModel = {
  default: 'Paragraph',
  width: '100px',
  types: [
    { text: 'Paragraph', value: 'P' },
    { text: 'Heading 1', value: 'H1' },
    { text: 'Heading 2', value: 'H2' },
    { text: 'Code Block', value: 'Pre' }
  ]
};
```

### lineHeight

**Type:** `LineHeightModel`  
**Default:** `{ default: '', items: [{ text: '1', value: '1' }, ...] }`

Defines predefined line heights for the Line Height dropdown.

**Example:**
```typescript
public lineHeight: LineHeightModel = {
  default: '1.5',
  items: [
    { text: '1', value: '1' },
    { text: '1.5', value: '1.5' },
    { text: '2', value: '2' },
    { text: '2.5', value: '2.5' }
  ]
};
```

### formatPainterSettings

**Type:** `FormatPainterSettingsModel`  
**Default:** `{ allowedFormats: 'b; em; ...', deniedFormats: null }`

Configures format painter options.

**Key Properties:**
- `allowedFormats`: CSS selectors that allow format copying (semicolon-separated)
- `deniedFormats`: CSS selectors that prevent format copying

**Example:**
```typescript
public formatPainter: FormatPainterSettingsModel = {
  allowedFormats: 'b; strong; i; em; u; span[style]; font',
  deniedFormats: 'img; table; a'
};
```

---

## File Manager Integration

### fileManagerSettings

**Type:** `FileManagerSettingsModel`

Configures the built-in file manager for inserting images, audio, video, and other files.

**Key Properties:**
- `enable`: Enables file manager integration (default: `false`)
- `path`: Root path for file browsing (default: `'/'`)
- `ajaxSettings`: AJAX endpoints for file operations
  - `getImageUrl`: Endpoint to retrieve images
  - `url`: Main file operations endpoint
  - `uploadUrl`: Upload endpoint
- `contextMenuSettings`: Context menu configuration
- `navigationPaneSettings`: Navigation pane configuration
- `toolbarSettings`: File manager toolbar settings
- `uploadSettings`: Upload behavior configuration
- `allowDragAndDrop`: Enable drag-and-drop (default: `true`)
- `view`: View mode: `'LargeIcons'` or `'Details'`
- `showFileExtension`: Show file extensions (default: `true`)
- `showThumbnail`: Show thumbnails (default: `true`)

**Example:**
```typescript
import { FileManagerSettingsModel } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  template: `<ejs-richtexteditor [fileManagerSettings]="fileManager"></ejs-richtexteditor>`,
  providers: [FileManagerService]
})
export class AppComponent {
  public fileManager: FileManagerSettingsModel = {
    enable: true,
    path: '/Documents/',
    ajaxSettings: {
      url: 'url',
      uploadUrl: 'url'
    },
    view: 'LargeIcons',
    showFileExtension: true,
    allowDragAndDrop: true
  };
}
```

---

## Custom Configuration

### formatter

**Type:** `IFormatter`  
**Default:** `null`

Allows customizing the keyCode to change key values for formatting shortcuts.

### keyConfig

**Type:** `{ [key: string]: string }`  
**Default:** `null`

Customizes key actions in the RichTextEditor. Use this to override default keyboard shortcuts.

**Example:**
```typescript
public keyConfig = {
  'bold': 'ctrl+b',
  'italic': 'ctrl+i',
  'underline': 'ctrl+u',
  'save': 'ctrl+s'
};
```

---

## Common Property Patterns

### Setting Multiple Properties

```typescript
import { Component } from '@angular/core';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';

@Component({
  imports: [RichTextEditorModule],
  standalone: true,
  template: `
    <ejs-richtexteditor
      [height]="400"
      [enableResize]="true"
      [enableAutoUrl]="true"
      [enableTabKey]="true"
      [maxLength]="5000"
      [placeholder]="'Type your content here...'"
      cssClass="custom-rte">
    </ejs-richtexteditor>
  `
})
export class AppComponent { }
```

### Dynamic Property Updates

```typescript
@Component({
  template: `
    <button (click)="toggleReadOnly()">Toggle Read-Only</button>
    <ejs-richtexteditor #rte [readonly]="isReadOnly"></ejs-richtexteditor>
  `
})
export class AppComponent {
  @ViewChild('rte') rteObj!: RichTextEditorComponent;
  public isReadOnly: boolean = false;

  toggleReadOnly(): void {
    this.isReadOnly = !this.isReadOnly;
  }
}
```

---

## See Also

- [Getting Started](getting-started.md) - Initial setup and basic configuration
- [Toolbar Configuration](toolbar.md) - Toolbar settings and customization
- [Editor Types](editor-types.md) - Choosing the right editor mode
- [Methods Reference](methods.md) - Programmatic API methods
- [Events Reference](events.md) - Available event handlers
