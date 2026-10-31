# Formatting Reference

This reference covers text formatting, block formats, color selection, and keyboard shortcuts for applying formatting in the Modern Rich Text Editor.

## Table of Contents

- [Overview](#overview)
- [Inline Text Formatting](#inline-text-formatting)
- [Block Formats](#block-formats)
- [Font and Color Options](#font-and-color-options)
- [Clear Formatting](#clear-formatting)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Programmatic Control](#programmatic-control)
- [API References](#api-references)

---

## Overview

The Modern Rich Text Editor provides comprehensive formatting capabilities through both UI controls and programmatic commands. Formatting is applied at two levels:

- **Inline formats** — Character-level marks (bold, italic, color, font)
- **Block formats** — Structure-level marks (headings, quotes, code blocks)

---

## Inline Text Formatting

### Bold

Makes selected text thicker and darker.

**Toolbar item:** `Bold`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>B</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>B</kbd> (macOS)

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['Bold']
};
</script>
```

**Programmatic application:**

```typescript
editor.value.ej2Instances.commands().bold().apply();
```

### Italic

Slants the selected text to the right.

**Toolbar item:** `Italic`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>I</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>I</kbd> (macOS)

```typescript
editor.value.ej2Instances.commands().italic().apply();
```

### Underline

Adds a line beneath the selected text.

**Toolbar item:** `Underline`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>U</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>U</kbd> (macOS)

```typescript
editor.value.ej2Instances.commands().underline().apply();
```

### Strikethrough

Applies a line through the selected text.

**Toolbar item:** `Strikethrough`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> (macOS)

```typescript
editor.value.ej2Instances.commands().strikethrough().apply();
```

### Subscript

Positions the selected text slightly below the normal line.

**Toolbar item:** `Subscript`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>=</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>=</kbd> (macOS)

```typescript
editor.value.ej2Instances.commands().subscript().apply();
```

### Superscript

Positions the selected text slightly above the normal line.

**Toolbar item:** `Superscript`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>=</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>=</kbd> (macOS)

```typescript
editor.value.ej2Instances.commands().superscript().apply();
```

### Inline Code

Formats the selected text as inline code with a monospace font and background highlight.

**Toolbar item:** `InlineCode`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>E</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>E</kbd> (macOS)

```typescript
editor.value.ej2Instances.commands().inlineCode().apply();
```

### Case Transformation

**Uppercase** — Converts the selected text to uppercase.

**Toolbar item:** `UpperCase`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd> (macOS)

```typescript
editor.value.ej2Instances.commands().uppercase().apply();
```

**Lowercase** — Converts the selected text to lowercase.

**Toolbar item:** `LowerCase`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> (macOS)

```typescript
editor.value.ej2Instances.commands().lowercase().apply();
```

---

## Block Formats

Block formats control the structure and layout of content blocks (paragraphs, headings, quotes, code blocks).

### Paragraph

The default block format for normal text. Any selected content can be converted to a paragraph.

**Toolbar item:** `Paragraph` (via `Formats` dropdown)

```typescript
editor.value.ej2Instances.commands().paragraph().apply();
```

### Headings

Organize content with heading levels H1 through H4.

| Heading | Toolbar Item | Keyboard Shortcut |
| --- | --- | --- |
| Heading 1 | `Heading 1` | Via Formats dropdown |
| Heading 2 | `Heading 2` | Via Formats dropdown |
| Heading 3 | `Heading 3` | Via Formats dropdown |
| Heading 4 | `Heading 4` | Via Formats dropdown |

```typescript
editor.value.ej2Instances.commands().heading1().apply();
editor.value.ej2Instances.commands().heading2().apply();
editor.value.ej2Instances.commands().heading3().apply();
editor.value.ej2Instances.commands().heading4().apply();
```

### Blockquote

Indents and styles quoted text.

**Toolbar item:** `Quote` (via `Formats` dropdown)

```typescript
editor.value.ej2Instances.commands().blockQuote().apply();
```

### Code Block

Displays text as a preformatted code snippet with monospace font.

**Toolbar item:** `CodeBlock`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>B</kbd> (macOS)

```typescript
editor.value.ej2Instances.commands().codeBlock().apply();
```

### Callout

Highlight important information with colored callout boxes (Info, Warning, Error, Success, Note).

**Toolbar item:** `Callout` (via `Formats` dropdown)

```typescript
// Info callout
editor.value.ej2Instances.commands().callout().options({ type: 'info' }).apply();

// Warning callout
editor.value.ej2Instances.commands().callout().options({ type: 'warning' }).apply();

// Error callout
editor.value.ej2Instances.commands().callout().options({ type: 'error' }).apply();

// Success callout
editor.value.ej2Instances.commands().callout().options({ type: 'success' }).apply();

// Note callout
editor.value.ej2Instances.commands().callout().options({ type: 'note' }).apply();
```

### Collapsible Heading

Create expandable/collapsible sections with collapsible headings.

**Toolbar item:** `Collapsible Paragraph`, `Collapsible Heading 1`, etc. (via `Formats` dropdown)

```typescript
editor.value.ej2Instances.commands().collapsible().options({ triggerType: 'paragraph' }).apply();
editor.value.ej2Instances.commands().collapsible().options({ level: 1 }).apply();
```

### Indentation

**Indent** — Increases indentation of the current block.

**Toolbar item:** `Indent`

```typescript
editor.value.ej2Instances.commands().indent().apply();
```

**Outdent** — Decreases indentation of the current block.

**Toolbar item:** `Outdent`
**Keyboard shortcut:** <kbd>Shift</kbd>+<kbd>Tab</kbd>

```typescript
editor.value.ej2Instances.commands().outdent().apply();
```

### Horizontal Line

Inserts a horizontal divider.

**Toolbar item:** `HorizontalLine`

```typescript
editor.value.ej2Instances.commands().horizontalLine().apply();
```

---

## Font and Color Options

### Font Family

Apply different fonts to selected text. The editor ships with a default set of fonts and supports custom fonts.

**Toolbar item:** `FontName`

#### Built-in Fonts

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['FontName']
};
</script>
```

#### Custom Fonts

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :fontFamily="fontFamily">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['FontName']
};

const fontFamily = {
  items: [
    { text: 'Default', value: 'Default' },
    { text: 'Segoe UI', value: 'Segoe UI, sans-serif' },
    { text: 'Roboto', value: 'Roboto, sans-serif' },
    { text: 'Georgia', value: 'Georgia, serif' },
    { text: 'Courier New', value: 'Courier New, monospace' }
  ]
};
</script>
```

#### Google Fonts

Reference web fonts in your page and add them to the `fontFamily` configuration:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Great+Vibes">

<script setup>
const fontFamily = {
  items: [
    { text: 'Default', value: 'Default' },
    { text: 'Roboto', value: 'Roboto, sans-serif' },
    { text: 'Great Vibes', value: '"Great Vibes", cursive' }
  ]
};
</script>
```

**Programmatic application:**

```typescript
editor.value.ej2Instances.commands().fontName().family('Georgia, serif').apply();

// Remove font family
editor.value.ej2Instances.commands().fontName().family('').apply();
```

### Font Size

Apply different font sizes to selected text.

**Toolbar item:** `FontSize`

#### Built-in Sizes

```html
<script setup>
const toolbarSettings = {
  items: ['FontSize']
};
</script>
```

#### Custom Sizes

```html
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings"
    :fontSize="fontSize">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['FontSize']
};

const fontSize = {
  items: [
    { text: 'Default', value: 'Default' },
    { text: '10', value: '10px' },
    { text: '12', value: '12px' },
    { text: '14', value: '14px' },
    { text: '16', value: '16px' },
    { text: '18', value: '18px' },
    { text: '24', value: '24px' },
    { text: '32', value: '32px' }
  ]
};
</script>
```

**Programmatic application:**

```typescript
editor.value.ej2Instances.commands().fontSize().size('18px').apply();

// Remove font size
editor.value.ej2Instances.commands().fontSize().size('').apply();
```

### Font Color

Apply foreground color to selected text.

**Toolbar item:** `FontColor`

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['FontColor']
};
</script>
```

**Programmatic application:**

```typescript
// Apply color
editor.value.ej2Instances.commands().fontColor().color('#DC2626').apply();

// Remove color (use empty string)
editor.value.ej2Instances.commands().fontColor().color('').apply();
```

### Background Color (Highlight)

Apply background highlight color to selected text.

**Toolbar item:** `BackgroundColor`

```html
<script setup>
const toolbarSettings = {
  items: ['BackgroundColor']
};
</script>
```

**Programmatic application:**

```typescript
// Apply highlight
editor.value.ej2Instances.commands().backgroundColor().color('rgba(255, 247, 199, 1)').apply();

// Remove highlight
editor.value.ej2Instances.commands().backgroundColor().color('').apply();
```

---

## Clear Formatting

Removes all inline formatting (bold, italic, color, font, etc.) from the selected text while preserving block structure.

**Toolbar item:** `ClearFormat`
**Keyboard shortcut:** <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> (Windows/Linux), <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> (macOS)

```html
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['ClearFormat']
};
</script>
```

**Programmatic application:**

```typescript
editor.value.ej2Instances.commands().clearFormat().apply();
```

---

## Keyboard Shortcuts

Quick reference for formatting keyboard shortcuts:

| Action | Windows/Linux | macOS |
| --- | --- | --- |
| Bold | <kbd>Ctrl</kbd>+<kbd>B</kbd> | <kbd>⌘</kbd>+<kbd>B</kbd> |
| Italic | <kbd>Ctrl</kbd>+<kbd>I</kbd> | <kbd>⌘</kbd>+<kbd>I</kbd> |
| Underline | <kbd>Ctrl</kbd>+<kbd>U</kbd> | <kbd>⌘</kbd>+<kbd>U</kbd> |
| Strikethrough | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> | <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> |
| Subscript | <kbd>Ctrl</kbd>+<kbd>=</kbd> | <kbd>⌘</kbd>+<kbd>=</kbd> |
| Superscript | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>=</kbd> | <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>=</kbd> |
| Inline Code | <kbd>Ctrl</kbd>+<kbd>E</kbd> | <kbd>⌘</kbd>+<kbd>E</kbd> |
| Clear Format | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> | <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd> |
| Uppercase | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd> | <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>U</kbd> |
| Lowercase | <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> | <kbd>⌘</kbd>+<kbd>Shift</kbd>+<kbd>L</kbd> |

### Quick Reference Card

**Print-friendly summary of all formatting shortcuts:**

```
TEXT FORMATTING
├─ Bold        Ctrl+B (⌘+B)
├─ Italic      Ctrl+I (⌘+I)
├─ Underline   Ctrl+U (⌘+U)
├─ Strike      Ctrl+Shift+S (⌘+Shift+S)
├─ Subscript   Ctrl+= (⌘+=)
├─ Superscript Ctrl+Shift+= (⌘+Shift+=)
├─ Inline Code Ctrl+E (⌘+E)
├─ Clear       Ctrl+Shift+R (⌘+Shift+R)
├─ Uppercase   Ctrl+Shift+U (⌘+Shift+U)
└─ Lowercase   Ctrl+Shift+L (⌘+Shift+L)

LISTS & INDENTATION
├─ Ordered List    Ctrl+Shift+O (⌘+Shift+O)
├─ Unordered List  Ctrl+Alt+O (⌘+Option+O)
├─ Checklist       Ctrl+Shift+7 (⌘+Shift+7)
├─ Indent          Tab
└─ Outdent         Shift+Tab

INSERT & BLOCKS
├─ Link        Ctrl+K (⌘+K)
├─ Image       Ctrl+Shift+I (⌘+Shift+I)
├─ Table       Ctrl+Shift+E (⌘+Shift+E)
└─ Code Block  Ctrl+Shift+B (⌘+Shift+B)

HISTORY & NAVIGATION
├─ Undo         Ctrl+Z (⌘+Z)
├─ Redo         Ctrl+Shift+Z (⌘+Shift+Z)
├─ Toolbar      Alt+F10 (Option+F10)
└─ Close        Esc
```

---

## Programmatic Control

### Complete Formatting Example

```html
<template>
  <div>
    <ejs-richtexteditor-ui
      ref="editor"
      :toolbarSettings="toolbarSettings"
      placeholder="Type something ...">
    </ejs-richtexteditor-ui>
    <div class="button-group" style="margin-top: 15px;">
      <button @click="applyBold">Bold</button>
      <button @click="applyUnderline">Underline</button>
      <button @click="applyFontSize">Font Size 18px</button>
      <button @click="applyFontColor">Font Color</button>
      <button @click="applyHighlight">Highlight</button>
      <button @click="applyClearFormat">Clear Format</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const toolbarSettings = {
  items: [
    'Bold', 'Italic', 'Underline', 'Strikethrough', '|',
    'FontSize', 'FontName', 'FontColor', 'BackgroundColor', '|',
    'InlineCode', 'ClearFormat'
  ]
};

const applyBold = () => {
  editor.value.ej2Instances.commands().bold().apply();
};

const applyUnderline = () => {
  editor.value.ej2Instances.commands().underline().apply();
};

const applyFontSize = () => {
  editor.value.ej2Instances.commands().fontSize().size('18px').apply();
};

const applyFontColor = () => {
  editor.value.ej2Instances.commands().fontColor().color('#00A3FF').apply();
};

const applyHighlight = () => {
  editor.value.ej2Instances.commands().backgroundColor().color('#FFF7C7').apply();
};

const applyClearFormat = () => {
  editor.value.ej2Instances.commands().clearFormat().apply();
};
</script>
```

---

## Font Configuration APIs

### FontSize

The `FontSize` enum defines available font size options.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fontsize`

**Enum Values:**

```typescript
enum FontSize {
  Small = '8pt',
  Normal = '10pt',
  Medium = '14pt',
  Large = '18pt',
  XLarge = '24pt',
  XXLarge = '32pt',
  Huge = '48pt'
}
```

---

### FontSizeModel

The configuration model for font size settings.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fontsizemodel`

**Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `FontSizeItem[]` | Predefined sizes | Array of font size items |
| `width` | `string` | '70px' | Width of font size dropdown |

---

### FontSizeItem

Individual font size item definition.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fontsizeitem`

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `text` | `string` | Display text (e.g., "8pt", "Small") |
| `value` | `string` | CSS size value (e.g., "8pt", "10px") |

---

### FontSizeCommandBuilder

Builder for programmatically applying font size changes.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fontsizecommandbuilder`

**Usage Example:**

```vue
<template>
  <div>
    <button @click="applyFontSize">Apply 18pt</button>
    <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const applyFontSize = () => {
  editor.value.executeCommand({
    command: 'FontSize',
    value: '18pt'
  });
};

// Configure font size settings
const fontSizeModel = {
  items: [
    { text: 'Small', value: '8pt' },
    { text: 'Normal', value: '10pt' },
    { text: 'Medium', value: '14pt' },
    { text: 'Large', value: '18pt' },
    { text: 'X-Large', value: '24pt' },
    { text: 'XX-Large', value: '32pt' }
  ],
  width: '80px'
};
</script>
```

---

### FontFamily

The `FontFamily` enum defines available font family options.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fontfamily`

**Enum Values:**

```typescript
enum FontFamily {
  Arial = 'Arial',
  Georgia = 'Georgia',
  TimesNewRoman = 'Times New Roman',
  Courier = 'Courier New',
  Verdana = 'Verdana',
  ComicSansMS = 'Comic Sans MS',
  Trebuchet = 'Trebuchet MS'
}
```

---

### FontFamilyModel

The configuration model for font family settings.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fontfamilymodel`

**Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `FontFamilyItem[]` | Predefined fonts | Array of font family items |
| `width` | `string` | '95px' | Width of font family dropdown |

---

### FontFamilyItem

Individual font family item definition.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fontfamilyitem`

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `text` | `string` | Display name (e.g., "Arial", "Georgia") |
| `value` | `string` | Font family CSS value |

---

### FontFamilyCommandBuilder

Builder for programmatically applying font family changes.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fontfamilycommandbuilder`

**Usage Example:**

```vue
<template>
  <div>
    <button @click="applyGeorgia">Change to Georgia</button>
    <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const applyGeorgia = () => {
  editor.value.executeCommand({
    command: 'FontFamily',
    value: 'Georgia'
  });
};

// Configure font family settings
const fontFamilyModel = {
  items: [
    { text: 'Arial', value: 'Arial, sans-serif' },
    { text: 'Georgia', value: 'Georgia, serif' },
    { text: 'Times New Roman', value: 'Times New Roman, serif' },
    { text: 'Courier New', value: 'Courier New, monospace' },
    { text: 'Verdana', value: 'Verdana, sans-serif' }
  ],
  width: '100px'
};
</script>
```

---

### FontColor

The `FontColor` enum defines text color options.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fontcolor`

**Configuration:**

Font color is typically configured through `FontColorModel`.

---

### FontColorModel

The configuration model for font color settings.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/fontcolormodel`

**Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `string` | 'Palette' | Color selection mode (Palette, Gradient) |
| `colors` | `string[]` | Predefined colors | Array of hex color values |
| `columns` | `number` | 5 | Number of color columns in palette |

**Usage Example:**

```vue
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const toolbarSettings = {
  items: ['FontColor', 'BackgroundColor'],
  fontColorModel: {
    mode: 'Palette',
    colors: [
      '#000000', '#FFFFFF', '#FF0000', '#00FF00',
      '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'
    ],
    columns: 4
  }
};
</script>
```

---

## Color Command Builders

### ColorCommandBuilder

Programmatically apply color formatting to selected text.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/colorcommandbuilder`

**Type:** `Object`

**Methods:**

```typescript
interface ColorCommandBuilder {
  execute(color: string, type: 'font' | 'background'): void;
  undo(): void;
  redo(): void;
}
```

**Usage Example:**

```vue
<template>
  <button @click="applyColor">Apply Red Color</button>
  <ejs-richtexteditor-ui ref="editor"></ejs-richtexteditor-ui>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const applyColor = () => {
  editor.value?.executeCommand({
    command: 'FontColor',
    value: '#FF0000'
  });
};
</script>
```

---

## Color Configuration

### ColorPickerType

Defines the color picker interface type.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/colorpickertype`

**Type:** `enum`

**Enum Values:**

```typescript
enum ColorPickerType {
  Palette = 'Palette',
  Gradient = 'Gradient'
}
```

**Usage Example:**

```vue
<template>
  <ejs-richtexteditor-ui
    :toolbarSettings="toolbarSettings">
  </ejs-richtexteditor-ui>
</template>

<script setup>
const toolbarSettings = {
  items: ['FontColor', 'BackgroundColor'],
  colorPickerType: 'Palette'
};
</script>
```

---

### ColorModeType

Defines the color mode for color selection.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/colormodetype`

**Type:** `enum`

**Enum Values:**

```typescript
enum ColorModeType {
  Preset = 'Preset',
  Picker = 'Picker'
}
```

---

### BackgroundColor

Configuration for background color settings.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/backgroundcolor`

**Type:** `Object`

**Properties:**

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `mode` | `ColorModeType` | `'Preset'` | Color selection mode |
| `colorPalette` | `string[]` | System colors | Available colors |
| `customColors` | `string[]` | `[]` | User custom colors |
| `showColorPicker` | `boolean` | `true` | Show color picker button |

---

### BackgroundColorModel

Model interface for background color configuration.

**Location:** `ej2.syncfusion.com/vue/documentation/api/richtexteditor-ui/backgroundcolormodel`

**Type:** `Object`

**Usage Example:**

```vue
<script setup>
const toolbarSettings = {
  items: ['BackgroundColor'],
  backgroundColorSettings: {
    colorPalette: [
      '#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF'
    ]
  }
};
</script>
```

---

## Summary of Extracted APIs

All formatting-related APIs have been extracted and organized into logical sections:

### From part-3.md (Font Configuration):
- ✅ FontSize
- ✅ FontSizeModel
- ✅ FontSizeItem
- ✅ FontSizeCommandBuilder
- ✅ FontFamily
- ✅ FontFamilyModel
- ✅ FontFamilyItem
- ✅ FontFamilyCommandBuilder
- ✅ FontColor
- ✅ FontColorModel

### From part-4.md (Color Configuration):
- ✅ ColorCommandBuilder
- ✅ ColorPickerType
- ✅ ColorModeType
- ✅ BackgroundColor
- ✅ BackgroundColorModel

All sections include:
- Complete API location URLs
- Property/method tables
- Type definitions and enums
- Comprehensive usage examples
- Configuration options
