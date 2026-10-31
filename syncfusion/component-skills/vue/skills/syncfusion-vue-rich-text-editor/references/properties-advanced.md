# Vue Rich Text Editor Properties - Advanced

## Table of Contents
- [Overview](#overview)
- [AI Assistant Settings](#ai-assistant-settings)
- [Advanced Features](#advanced-features)
- [Validation & Limits](#validation--limits)
- [Localization & Accessibility](#localization--accessibility)
- [IFrame & Inline Mode](#iframe--inline-mode)
- [Import & Export](#import--export)
- [Persistence & Auto-Save](#persistence--auto-save)
- [Undo/Redo](#undoredo)

## Overview

This document covers advanced configuration properties for the Syncfusion Vue Rich Text Editor, including AI features, validation, localization, import/export, and state management.

## AI Assistant Settings

### aiAssistantSettings
**Type:** `AIAssistantSettingsModel`  
**Default:** See code  
**Description:** AI Assistant feature configuration.

```vue
<script setup>
const aiAssistantSettings = {
  commands: [
    { text: 'Summarize', description: 'Create a summary of the content' },
    { text: 'Expand', description: 'Expand the content with more details' },
    { text: 'Rewrite', description: 'Rewrite the content' },
    { text: 'Grammar Check', description: 'Check and fix grammar' }
  ],
  popupWidth: '600px',
  popupMaxHeight: '400px',
  placeholder: 'Ask AI to help with your content...',
  headerToolbarSettings: ['AIcommands', 'Close'],
  promptToolbarSettings: ['Edit', 'Copy'],
  responseToolbarSettings: ['Regenerate', 'Copy', '|', 'Insert'],
  prompts: [
    'Make this more professional',
    'Simplify this explanation',
    'Add more details'
  ],
  suggestions: [
    'Improve clarity',
    'Fix grammar',
    'Make it concise'
  ],
  bannerTemplate: '<div class="ai-banner">Powered by AI</div>',
  maxPromptHistory: 20
};
</script>
```

**AI Assistant Properties:**
- `commands` - Available AI operations (array of command objects)
- `popupWidth` / `popupMaxHeight` - AI dialog dimensions
- `placeholder` - Input field placeholder text
- `headerToolbarSettings` - Toolbar items in AI dialog header
- `promptToolbarSettings` - Toolbar for editing user prompts
- `responseToolbarSettings` - Toolbar for AI responses
- `prompts` - Pre-defined prompt templates
- `suggestions` - Quick suggestion buttons
- `bannerTemplate` - Custom HTML banner in AI dialog
- `maxPromptHistory` - Maximum saved prompt history

**Complete AI Integration Example:**
```vue
<template>
  <ejs-richtexteditor
    ref="rteRef"
    v-model:value="content"
    :aiAssistantSettings="aiAssistantSettings"
    :toolbarSettings="{ items: ['Bold', 'Italic', '|', 'AIAssistant', '|', 'Undo', 'Redo'] }"
  />
</template>

<script setup>
import { ref, provide } from 'vue';
import { 
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, HtmlEditor, AIAssistant
} from '@syncfusion/ej2-vue-richtexteditor';

const content = ref('<p>Draft content here...</p>');

const aiAssistantSettings = {
  commands: [
    { text: 'Grammar Check', description: 'Fix grammar and spelling errors' },
    { text: 'Improve Writing', description: 'Enhance clarity and style' },
    { text: 'Summarize', description: 'Create a brief summary' },
    { text: 'Expand', description: 'Add more detail and context' }
  ],
  popupWidth: '650px',
  popupMaxHeight: '450px',
  placeholder: 'How can AI help improve your content?',
  prompts: [
    'Make this more professional',
    'Simplify for a general audience',
    'Add examples to clarify',
    'Make it more engaging'
  ],
  maxPromptHistory: 25
};

provide('richtexteditor', [Toolbar, HtmlEditor, AIAssistant]);
</script>
```

## Advanced Features

### slashMenuSettings
**Type:** `SlashMenuSettingsModel`  
**Default:** See code  
**Description:** Slash menu (/) command palette configuration.

```vue
<script setup>
const slashMenuSettings = {
  enable: true,
  items: [
    'Paragraph',
    'Heading 1',
    'Heading 2',
    'Heading 3',
    'OrderedList',
    'UnorderedList',
    'CodeBlock',
    'BlockQuote'
  ],
  popupWidth: '300px',
  popupHeight: '320px'
};
</script>
```

**Usage:** Type `/` in the editor to open quick format menu.

### emojiPickerSettings
**Type:** `EmojiSettingsModel`  
**Default:** See code  
**Description:** Emoji picker configuration.

```vue
<script setup>
const emojiPickerSettings = {
  iconsSet: [
    { 
      name: 'Smileys & People', 
      code: '1F600', 
      icons: [
        { code: '1F600', desc: 'Grinning face' },
        { code: '1F601', desc: 'Beaming face' },
        { code: '1F602', desc: 'Face with tears of joy' }
      ]
    },
    { 
      name: 'Animals & Nature', 
      code: '1F435', 
      icons: [
        { code: '1F435', desc: 'Monkey face' },
        { code: '1F436', desc: 'Dog face' }
      ]
    }
  ],
  showSearchBox: true
};
</script>
```

### codeBlockSettings
**Type:** `CodeBlockSettingsModel`  
**Default:** See code  
**Description:** Code block language configuration.

```vue
<script setup>
const codeBlockSettings = {
  defaultLanguage: 'javascript',
  languages: [
    { label: 'Plain Text', language: 'plaintext' },
    { label: 'HTML', language: 'html' },
    { label: 'CSS', language: 'css' },
    { label: 'JavaScript', language: 'javascript' },
    { label: 'TypeScript', language: 'typescript' },
    { label: 'Python', language: 'python' },
    { label: 'Java', language: 'java' },
    { label: 'C#', language: 'csharp' },
    { label: 'SQL', language: 'sql' },
    { label: 'Bash', language: 'bash' },
    { label: 'JSON', language: 'json' }
  ]
};
</script>
```

**Use Case:** Syntax-highlighted code blocks with language selection.

### formatter
**Type:** `IFormatter`  
**Default:** `null`  
**Description:** Custom formatter for advanced content manipulation.

```vue
<script setup>
import { ref } from 'vue';

// Custom formatter implementation
const formatter = {
  // Custom formatting logic
  formatContent: (content) => {
    // Transform content
    return content;
  }
};
</script>
```

### keyConfig
**Type:** `{ [key: string]: string }`  
**Default:** `null`  
**Description:** Custom keyboard shortcut configuration.

```vue
<script setup>
const keyConfig = {
  'bold': 'ctrl+b',
  'italic': 'ctrl+i',
  'underline': 'ctrl+u',
  'strikethrough': 'ctrl+shift+s',
  'undo': 'ctrl+z',
  'redo': 'ctrl+y',
  'insertLink': 'ctrl+k',
  'insertImage': 'ctrl+shift+i',
  'insertTable': 'ctrl+shift+t',
  'save': 'ctrl+s',
  'fullscreen': 'f11'
};
</script>
```

**Note:** Mac users automatically get `cmd` instead of `ctrl`.

## Validation & Limits

### maxLength
**Type:** `number`  
**Default:** `-1` (unlimited)  
**Description:** Maximum character count allowed.

```vue
<template>
  <ejs-richtexteditor 
    :maxLength="1000"
    :showCharCount="true"
  />
</template>
```

**Behavior:** Editor prevents input when limit is reached.

### showCharCount
**Type:** `boolean`  
**Default:** `false`  
**Description:** Display character counter at bottom.

```vue
<template>
  <ejs-richtexteditor 
    :showCharCount="true"
    :maxLength="500"
  />
</template>
```

**Note:** Requires `Count` module injection:
```vue
<script setup>
import { provide } from 'vue';
import { Count } from '@syncfusion/ej2-vue-richtexteditor';
provide('richtexteditor', [Count]);
</script>
```

**Display Format:** Shows "X / Y characters" where X is current count, Y is limit.

### enableHtmlSanitizer
**Type:** `boolean`  
**Default:** `true`  
**Description:** Sanitize HTML to prevent XSS attacks.

```vue
<template>
  <ejs-richtexteditor :enableHtmlSanitizer="true" />
</template>
```

**Security:** Always keep `true` unless you have specific reason. Removes potentially dangerous HTML like:
- `<script>` tags
- JavaScript event handlers (`onclick`, etc.)
- `javascript:` URLs
- Data URLs in certain contexts

### enableHtmlEncode
**Type:** `boolean`  
**Default:** `false`  
**Description:** Display source code in encoded format.

```vue
<template>
  <ejs-richtexteditor :enableHtmlEncode="true" />
</template>
```

**When `true`:** HTML special characters are encoded (`<` becomes `&lt;`, etc.)

### enableXhtml
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enable XHTML validation.

```vue
<template>
  <ejs-richtexteditor :enableXhtml="true" />
</template>
```

**When `true`:** 
- Output is XHTML-compliant
- Self-closing tags (`<br />`, `<img />`)
- Proper tag nesting
- Lowercase element names

## Localization & Accessibility

### locale
**Type:** `string`  
**Default:** `'en-US'`  
**Description:** Set component locale/language.

```vue
<template>
  <ejs-richtexteditor locale="de-DE" />
</template>

<script setup>
import { L10n } from '@syncfusion/ej2-base';

// Load German translations
L10n.load({
  'de-DE': {
    'richtexteditor': {
      'bold': 'Fett',
      'italic': 'Kursiv',
      'underline': 'Unterstreichen',
      'strikethrough': 'Durchgestrichen',
      'fontName': 'Schriftart',
      'fontSize': 'Schriftgröße',
      'fontColor': 'Schriftfarbe',
      'backgroundColor': 'Hintergrundfarbe',
      'alignments': 'Ausrichtungen',
      'orderedList': 'Geordnete Liste',
      'unorderedList': 'Ungeordnete Liste',
      'undo': 'Rückgängig',
      'redo': 'Wiederholen',
      'createLink': 'Link einfügen',
      'insertImage': 'Bild einfügen',
      'insertTable': 'Tabelle einfügen'
    }
  }
});
</script>
```

**Supported Locales:** en-US, de-DE, fr-FR, es-ES, it-IT, ja-JP, zh-CN, ar-AE, and more.

### enableRtl
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enable right-to-left direction.

```vue
<template>
  <ejs-richtexteditor 
    :enableRtl="true" 
    locale="ar-AE"
  />
</template>

<script setup>
import { L10n } from '@syncfusion/ej2-base';

// Load Arabic translations
L10n.load({
  'ar-AE': {
    'richtexteditor': {
      // Arabic translations...
    }
  }
});
</script>
```

**Use Cases:** 
- Arabic (العربية)
- Hebrew (עברית)
- Persian (فارسی)
- Urdu (اردو)

## IFrame & Inline Mode

### iframeSettings
**Type:** `IFrameSettingsModel`  
**Default:** `{ enable: false }`  
**Description:** Render editor content in isolated iframe.

```vue
<script setup>
const iframeSettings = {
  enable: true,
  attributes: {
    style: 'background-color: #f5f5f5; padding: 10px;'
  },
  resources: {
    styles: [
      'https://cdn.example.com/custom.css',
      '/assets/editor-styles.css'
    ],
    scripts: [
      'https://cdn.example.com/custom.js'
    ]
  },
  metaTags: [
    { charset: 'UTF-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ],
  sandbox: ['allow-same-origin', 'allow-scripts']
};
</script>
```

**IFrame Benefits:**
- **Style Isolation:** Page CSS doesn't affect editor content
- **Security:** Sandbox restrictions prevent malicious code execution
- **Custom Resources:** Load specific CSS/JS only for editor content
- **Preview Accuracy:** Content appears as it will in final output

**Sandbox Options:**
- `'allow-same-origin'` - Allows content to access parent page
- `'allow-scripts'` - Allows JavaScript execution
- `'allow-forms'` - Allows form submission
- `'allow-popups'` - Allows opening popups

### inlineMode
**Type:** `InlineModeModel`  
**Default:** `{ enable: false, onSelection: true }`  
**Description:** Enable inline editing mode.

```vue
<script setup>
const inlineMode = {
  enable: true,
  onSelection: true // Show toolbar on text selection
};
</script>
```

**onSelection Options:**
- `true` - Toolbar appears on text selection (like Medium editor)
- `false` - Toolbar appears when clicking editable element

**Inline Mode Example:**
```vue
<template>
  <ejs-richtexteditor
    :inlineMode="inlineMode"
    :toolbarSettings="toolbarSettings"
    :value="content"
  />
</template>

<script setup>
import { ref } from 'vue';

const content = ref('<p>Click to edit this content...</p>');

const inlineMode = {
  enable: true,
  onSelection: true
};

const toolbarSettings = {
  items: ['Bold', 'Italic', 'Underline', 'CreateLink']
};
</script>
```

**Use Cases:**
- Inline content editing (CMS systems)
- Click-to-edit interfaces
- Minimal editor footprint

## Import & Export

### importWord
**Type:** `ImportWordModel`  
**Default:** `{ serviceUrl: null }`  
**Description:** Word document import configuration.

```vue
<script setup>
const importWord = {
  serviceUrl: 'https://api.example.com/word/import'
};
</script>
```

**Server Endpoint Requirements:**
- Accept `.docx` file upload
- Convert to HTML
- Return HTML string

### exportWord
**Type:** `ExportWordModel`  
**Default:** See code  
**Description:** Word document export configuration.

```vue
<script setup>
const exportWord = {
  serviceUrl: 'https://api.example.com/word/export',
  fileName: 'document.docx',
  stylesheet: `
    body { 
      font-family: Arial, sans-serif; 
      font-size: 12pt; 
      margin: 1in;
    }
    h1 { 
      color: #333; 
      font-size: 18pt;
      margin-bottom: 10pt;
    }
    h2 {
      color: #555;
      font-size: 14pt;
      margin-bottom: 8pt;
    }
    p {
      margin-bottom: 6pt;
      line-height: 1.5;
    }
  `
};
</script>
```

**Server Endpoint Requirements:**
- Accept HTML content + stylesheet
- Generate `.docx` file
- Return file download

**Complete Export Example:**
```vue
<template>
  <ejs-richtexteditor
    ref="rteRef"
    v-model:value="content"
    :exportWord="exportWord"
    :toolbarSettings="{ items: ['Bold', 'Italic', '|', 'ExportWord'] }"
  />
</template>

<script setup>
import { ref, provide } from 'vue';
import { 
  Toolbar, HtmlEditor, ExportWord as ExportWordService
} from '@syncfusion/ej2-vue-richtexteditor';

const content = ref('<h1>My Document</h1><p>Content here...</p>');

const exportWord = {
  serviceUrl: 'https://api.example.com/word/export',
  fileName: 'my-document.docx',
  stylesheet: `body { font-family: Arial; font-size: 12pt; }`
};

provide('richtexteditor', [Toolbar, HtmlEditor, ExportWordService]);
</script>
```

### exportPdf
**Type:** `ExportPdfModel`  
**Default:** See code  
**Description:** PDF export configuration.

```vue
<script setup>
const exportPdf = {
  serviceUrl: 'https://api.example.com/pdf/export',
  fileName: 'document.pdf',
  stylesheet: `
    body { 
      font-family: Arial, sans-serif; 
      font-size: 11pt;
    }
    @page { 
      margin: 1in; 
      size: A4;
    }
    h1 { 
      color: #000; 
      font-size: 18pt; 
      page-break-after: avoid;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    table td, table th {
      border: 1px solid #ccc;
      padding: 8px;
    }
  `
};
</script>
```

**Server Endpoint Requirements:**
- Accept HTML content + stylesheet
- Generate PDF file
- Return file download

**Note:** PDF generation typically uses libraries like:
- Puppeteer (Node.js)
- wkhtmltopdf
- Prince XML
- Syncfusion PDF library

## Persistence & Auto-Save

### enablePersistence
**Type:** `boolean`  
**Default:** `false`  
**Description:** Persist editor state to browser storage.

```vue
<template>
  <ejs-richtexteditor 
    id="persistent-editor"
    :enablePersistence="true"
  />
</template>
```

**Requirements:**
- Must have unique `id` prop
- Uses `localStorage` to save state

**What Gets Persisted:**
- Editor content
- Toolbar state
- Editor dimensions (if resized)

**Storage Key Format:** `syncfusion.richtexteditor.{id}`

### autoSaveOnIdle
**Type:** `boolean`  
**Default:** `false`  
**Description:** Auto-save content during idle time.

```vue
<template>
  <ejs-richtexteditor 
    :autoSaveOnIdle="true"
    :saveInterval="10000"
    @change="onContentChange"
  />
</template>

<script setup>
const onContentChange = (args) => {
  console.log('Auto-saved:', args.value);
  
  // Save to server
  fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: args.value })
  });
};
</script>
```

**Behavior:**
- Triggers `change` event after idle period
- Idle period defined by `saveInterval`
- Helps prevent data loss

### saveInterval
**Type:** `number`  
**Default:** `5000` (5 seconds)  
**Description:** Auto-save interval in milliseconds.

```vue
<template>
  <ejs-richtexteditor 
    :autoSaveOnIdle="true"
    :saveInterval="30000"
    @change="onAutoSave"
  />
</template>

<script setup>
const onAutoSave = async (args) => {
  try {
    await saveToServer(args.value);
    showNotification('Draft saved');
  } catch (error) {
    showNotification('Save failed', 'error');
  }
};
</script>
```

**Recommended Values:**
- **5000-10000ms** (5-10s) - Frequent saves, minimal data loss risk
- **30000-60000ms** (30-60s) - Less frequent saves, lower server load
- **120000ms+** (2min+) - Rare saves, for low-priority content

## Undo/Redo

### undoRedoSteps
**Type:** `number`  
**Default:** `30`  
**Description:** Maximum undo/redo history steps.

```vue
<template>
  <ejs-richtexteditor :undoRedoSteps="50" />
</template>
```

**Considerations:**
- **Higher values:** More memory usage, longer history
- **Lower values:** Less memory, shorter history
- **Typical range:** 20-100 steps

### undoRedoTimer
**Type:** `number`  
**Default:** `300` (ms)  
**Description:** Debounce delay for recording undo actions.

```vue
<template>
  <ejs-richtexteditor :undoRedoTimer="500" />
</template>
```

**How It Works:**
- Editor waits `undoRedoTimer` ms after last change
- Then records action in undo history
- Rapid changes grouped into single undo step

**Timer Impact:**
- **Lower value (100-300ms):** More granular undo steps
- **Higher value (500-1000ms):** Fewer, larger undo steps
- **Default (300ms):** Balanced approach

**Example Behavior:**
```
Timer: 300ms
User types: "Hello World"

Lower timer (100ms):
  Undo 1: "Hello Worl"
  Undo 2: "Hello Wor"
  Undo 3: "Hello Wo"
  ...

Higher timer (500ms):
  Undo 1: "Hello Wo"
  Undo 2: "Hello"
  Undo 3: ""
```

## Complete Advanced Configuration Example

```vue
<template>
  <div class="advanced-editor">
    <ejs-richtexteditor
      ref="rteRef"
      id="advanced-rte"
      v-model:value="content"
      :height="500"
      :locale="currentLocale"
      :enableRtl="isRtl"
      :maxLength="10000"
      :showCharCount="true"
      :enablePersistence="true"
      :autoSaveOnIdle="true"
      :saveInterval="15000"
      :undoRedoSteps="50"
      :undoRedoTimer="400"
      :enableHtmlSanitizer="true"
      :iframeSettings="iframeSettings"
      :aiAssistantSettings="aiAssistantSettings"
      :exportWord="exportWord"
      :exportPdf="exportPdf"
      :keyConfig="keyConfig"
      :toolbarSettings="toolbarSettings"
      @created="onCreated"
      @change="onAutoSave"
    />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { L10n } from '@syncfusion/ej2-base';
import {
  RichTextEditorComponent as EjsRichtexteditor,
  Toolbar, Link, Image, HtmlEditor, QuickToolbar, Count,
  AIAssistant, ExportWord, ExportPdf
} from '@syncfusion/ej2-vue-richtexteditor';

const rteRef = ref(null);
const content = ref('<p>Start editing...</p>');
const currentLocale = ref('en-US');
const isRtl = ref(false);

// IFrame configuration
const iframeSettings = {
  enable: true,
  attributes: {
    style: 'padding: 20px;'
  },
  resources: {
    styles: ['/assets/editor-content.css']
  }
};

// AI Assistant configuration
const aiAssistantSettings = {
  commands: [
    { text: 'Improve Writing', description: 'Enhance clarity and style' },
    { text: 'Grammar Check', description: 'Fix grammar errors' },
    { text: 'Summarize', description: 'Create summary' }
  ],
  popupWidth: '650px',
  maxPromptHistory: 25
};

// Export configurations
const exportWord = {
  serviceUrl: 'https://api.example.com/word/export',
  fileName: 'document.docx'
};

const exportPdf = {
  serviceUrl: 'https://api.example.com/pdf/export',
  fileName: 'document.pdf'
};

// Custom keyboard shortcuts
const keyConfig = {
  'bold': 'ctrl+b',
  'italic': 'ctrl+i',
  'save': 'ctrl+s',
  'fullscreen': 'f11'
};

// Toolbar configuration
const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'FontName', 'FontSize', '|',
    'CreateLink', 'Image', '|',
    'AIAssistant', '|',
    'ExportWord', 'ExportPdf', '|',
    'Undo', 'Redo'
  ]
};

const onCreated = () => {
  console.log('Advanced editor ready');
};

const onAutoSave = async (args) => {
  try {
    await fetch('/api/autosave', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        content: args.value,
        timestamp: new Date().toISOString()
      })
    });
    console.log('Auto-saved successfully');
  } catch (error) {
    console.error('Auto-save failed:', error);
  }
};

// Provide services
provide('richtexteditor', [
  Toolbar, Link, Image, HtmlEditor, QuickToolbar, Count,
  AIAssistant, ExportWord, ExportPdf
]);
</script>

<style scoped>
.advanced-editor {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
```

## Property Configuration Best Practices

### Security Best Practices
```vue
<script setup>
// Always enable HTML sanitizer
const securityConfig = {
  enableHtmlSanitizer: true,
  // Restrict iframe if not needed
  iframeSettings: {
    enable: false
  }
};
</script>
```

### Performance Optimization
```vue
<script setup>
// Optimize for large documents
const performanceConfig = {
  undoRedoSteps: 30, // Don't set too high
  undoRedoTimer: 500, // Group rapid changes
  saveInterval: 30000, // Don't auto-save too frequently
};
</script>
```

### User Experience
```vue
<script setup>
// Enhance UX with appropriate settings
const uxConfig = {
  showCharCount: true, // Help users track length
  maxLength: 5000, // Set reasonable limits
  autoSaveOnIdle: true, // Prevent data loss
  enableResize: true, // Let users adjust size
  placeholder: 'Start typing...' // Guide users
};
</script>
```

### Accessibility
```vue
<script setup>
import { L10n } from '@syncfusion/ej2-base';

// Configure for accessibility
const accessibilityConfig = {
  locale: 'en-US', // Set appropriate language
  enableRtl: false, // Enable for RTL languages
  htmlAttributes: {
    'aria-label': 'Rich Text Editor',
    'role': 'textbox'
  }
};

// Load translations
L10n.load({
  'en-US': {
    'richtexteditor': {
      // Provide clear labels
    }
  }
});
</script>
```
