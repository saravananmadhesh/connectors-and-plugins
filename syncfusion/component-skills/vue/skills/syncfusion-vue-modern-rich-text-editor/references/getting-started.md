# Getting Started & Basic Setup in Vue Modern Rich Text Editor

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [Syncfusion CLI (Recommended)](#syncfusion-cli-recommended)
    - [Non-interactive Mode](#non-interactive-mode)
    - [Interactive Mode](#interactive-mode)
  - [Manual Setup with Vite](#manual-setup-with-vite)
- [Package Installation](#package-installation)
- [Adding CSS Theme](#adding-css-theme)
- [Adding the Component](#adding-the-component)
- [Running the Application](#running-the-application)
- [Basic Configuration](#basic-configuration)
  - [Setting Editor Content](#setting-editor-content)
  - [Content Format Selection](#content-format-selection)
  - [Toolbar Configuration](#toolbar-configuration)
  - [Image Settings](#image-settings)
  - [Placeholder Text](#placeholder-text)
  - [Auto-Save Behavior](#auto-save-behavior)

---

## Prerequisites

Before setting up the Modern Rich Text Editor, ensure you have:

- **Node.js 24+** (LTS version recommended) — [Download from nodejs.org](https://nodejs.org/en)
- **Syncfusion CLI** — For quick project scaffolding (optional but recommended)
- **Vite** — As the bundler and development environment
- **Vue 3** — For component development

For detailed version compatibility information, refer to the [Version Compatibility](https://ej2.syncfusion.com/vue/documentation/upgrade/version-compatibility) documentation.

---

## Installation Methods

### Syncfusion CLI (Recommended)

The Syncfusion CLI provides the fastest way to set up a Modern Rich Text Editor project with pre-configured templates.

#### Install the Syncfusion CLI

Install the Syncfusion CLI globally using npm:

```bash
npm install -g @syncfusion/syncfusion-cli
```

#### Non-interactive Mode

Create a project directly with a single command:

```cmd
sf new my-app --framework vue --type ts --template rich-text-editor-ui --theme tailwind3
```

This command creates a Vue application with:
- **Framework:** Vue with Vite bundler
- **Language:** TypeScript
- **Component:** Modern Rich Text Editor UI (pre-configured)
- **Theme:** Tailwind 3
- **API Style:** Composition API

After creation, navigate to the project directory and start development:

```bash
cd my-app
npm install
npm run dev
```

#### Interactive Mode

For a guided setup experience, run:

```cmd
sf
```

The CLI will prompt you for configuration options:

```cmd
√ Project name? ... my-app
√ Choose Framework: » Vue
√ Choose Language: » TypeScript
√ Choose Template: » Rich Text Editor UI
√ Choose Theme: » Tailwind3
√ Choose Style Format: » CSS
√ Would you like to integrate the Syncfusion MCP Server (AI Assistant) into this project? ... no
√ Would you like to install Syncfusion Component Skills for AI-powered development? ... no      
√ Install dependencies and start app now? ... no
```

You can customize these options based on your requirements.

---

### Manual Setup with Vite

If you prefer manual setup, follow these steps:

#### Step 1: Create a Vue 3 Application

```bash
npm create vite@latest my-app -- --template vue-ts
```

When prompted, select options for Vue and TypeScript setup.

#### Step 2: Navigate and Install Dependencies

```bash
cd my-app
npm install
```

---

## Package Installation

All Syncfusion packages are published in the [npmjs.com](https://www.npmjs.com/search?q=ej2-vue) registry.

#### Install the Modern Rich Text Editor

```bash
npm install @syncfusion/ej2-vue-richtexteditor-ui
```

This installs the Modern Rich Text Editor UI component with full functionality including formatting, media handling, toolbar configuration, and event system.

---

## Adding CSS Theme

Syncfusion provides multiple themes. Refer to the [themes documentation](https://ej2.syncfusion.com/vue/documentation/appearance/theme#theme-packages) for complete options.

### Using Tailwind 3 Theme

#### Step 1: Install the Theme Package

```bash
npm install @syncfusion/ej2-tailwind3-theme
```

#### Step 2: Import CSS in Your Application

The theme package includes an `index.css` file that automatically imports all required styles.

**Option A: Import in `src/style.css`**

```css
@import '../node_modules/@syncfusion/ej2-tailwind3-theme/styles/richtexteditor-ui/index.css';
```

**Option B: Import in Component**

```vue
<style>
@import "../../node_modules/@syncfusion/ej2-tailwind3-theme/styles/richtexteditor-ui/index.css";
</style>
```

> **Note:** Remove all default styles from **src/style.css** to ensure styles are applied correctly.

---

## Adding the Component

Once installation is complete, add the Modern Rich Text Editor to your Vue component.

### Basic Component Setup

Create or update **src/App.vue**:

```vue
<template>
  <ejs-richtexteditor-ui placeholder="Type something ..."></ejs-richtexteditor-ui>
</template>

<script setup>
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-tailwind3-theme/styles/richtexteditor-ui/index.css";
</style>
```

### Component Registration

The component is registered using Vue's `<script setup>` syntax (Composition API):

```typescript
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';
```

The component uses camelCase export name `RichTextEditorUIComponent` and template element name `ejs-richtexteditor-ui` (kebab-case).

---

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or the next available port if 5173 is in use). Vite will display the URL in the terminal.

Open your browser and navigate to the displayed URL to see your Modern Rich Text Editor in action.

---

## Basic Configuration

After setting up the component, configure its core behavior through properties passed to the component element.

### Setting Editor Content

Configure the `value` property to load content when the editor is initialized. Use this for displaying existing content for editing or providing starter content.

```ts
const value = '<p>Getting started with the Rich Text Editor UI.</p>';
```

In the template:

```vue
<ejs-richtexteditor-ui :value="value"></ejs-richtexteditor-ui>
```

### Content Format Selection

Before setting editor content, choose the appropriate `valueFormat`:

```ts
const valueFormat = 'html'; // or 'json'
```

**Supported values:**

| Format | Purpose | Use Case |
|--------|---------|----------|
| **'html'** | HTML string content | When working with HTML strings |
| **'json'** | Structured document model | For data exchange and storage |

> **Note:** `valueFormat` defaults to **'json'**. Set it to **'html'** when loading editor content as an HTML string.

**Example:**

```vue
<template>
  <ejs-richtexteditor-ui 
    :value="value"
    :valueFormat="valueFormat">
  </ejs-richtexteditor-ui>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('<p>Hello, World!</p>');
const valueFormat = ref('html');
</script>
```

### Toolbar Configuration

Configure `toolbarSettings.items` to display only the editing tools required by your application.

```ts
const toolbarSettings = {
  items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']
};
```

Available toolbar items include:

- **History:** `Undo`, `Redo`
- **Text formatting:** `Bold`, `Italic`, `Underline`, `Strikethrough`, `Subscript`, `Superscript`, `InlineCode`, `ClearFormat`
- **Font and color:** `FontName`, `FontSize`, `FontColor`, `BackgroundColor`
- **Structure:** `Formats`, `Paragraph`, `Quote`, `Callout`, `CodeBlock`, `Indent`, `Outdent`, `HorizontalLine`
- **Alignment:** `Alignment`, `AlignLeft`, `AlignCenter`, `AlignRight`, `AlignJustify`
- **Lists:** `BulletFormatList`, `BulletList`, `NumberFormatList`, `NumberedList`
- **Insert:** `Link`, `Image`, `Table`

See [references/toolbar.md](toolbar.md) for complete toolbar configuration, layout options, and custom toolbar items.

**Example:**

```vue
<template>
  <ejs-richtexteditor-ui :toolbarSettings="toolbarSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
const toolbarSettings = {
  items: ['Bold', 'Italic', 'Underline', '|', 'Formats', 'Alignment', '|', 'Link', 'Image', 'Table', '|', 'Undo', 'Redo']
};
</script>
```

### Image Settings

Configure `imageSettings` to control how images are uploaded and validated:

```ts
const hostUrl = 'https://services.syncfusion.com/js/production/';
const imageSettings = {
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
  maxFileSize: 30000000,
  uploadUrl: hostUrl + 'api/RichTextEditor/SaveFile',
  removeUrl: hostUrl + 'api/RichTextEditor/DeleteFile',
  imageUrl: hostUrl + 'RichTextEditor/'
};
```

**Configuration properties:**

| Property | Type | Description |
|----------|------|-------------|
| `allowedTypes` | `string[]` | File extensions allowed for upload (e.g., `.jpg`, `.png`) |
| `maxFileSize` | `number` | Maximum file size in bytes |
| `uploadUrl` | `string` | Server endpoint for uploading images |
| `removeUrl` | `string` | Server endpoint for deleting images |
| `imageUrl` | `string` | Base URL for displaying uploaded images |

See [references/image.md](image.md) for advanced image handling, remote upload configuration, and image quick toolbar.

**Example:**

```vue
<template>
  <ejs-richtexteditor-ui :imageSettings="imageSettings"></ejs-richtexteditor-ui>
</template>

<script setup>
const imageSettings = {
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
  maxFileSize: 30000000,
  uploadUrl: 'https://services.syncfusion.com/js/production/api/RichTextEditor/SaveFile',
  imageUrl: 'https://services.syncfusion.com/js/production/RichTextEditor/'
};
</script>
```

### Placeholder Text

Use the `placeholder` property to display instructional text when the editor is empty:

```ts
const placeholder = 'Type something...';
```

**Example:**

```vue
<ejs-richtexteditor-ui :placeholder="placeholder"></ejs-richtexteditor-ui>
```

This helps users understand what content is expected before they start typing.

### Auto-Save Behavior

When `enableAutoSave` is enabled, use `saveInterval` to control how long the editor waits before automatically saving unsaved changes:

```ts
const enableAutoSave = true;
const saveInterval = 1000; // milliseconds
```

The value is specified in milliseconds and is triggered after the user becomes idle.

**Example:**

```vue
<template>
  <ejs-richtexteditor-ui 
    :enableAutoSave="enableAutoSave"
    :saveInterval="saveInterval">
  </ejs-richtexteditor-ui>
</template>

<script setup>
const enableAutoSave = ref(true);
const saveInterval = ref(1000);
</script>
```

---

## Complete Basic Configuration Example

Here's a complete example combining all basic configuration options:

```vue
<template>
  <ejs-richtexteditor-ui 
    ref="editor"
    :value="editorValue"
    :valueFormat="valueFormat"
    :placeholder="placeholder"
    :toolbarSettings="toolbarSettings"
    :imageSettings="imageSettings"
    :enableAutoSave="enableAutoSave"
    :saveInterval="saveInterval"
    @change="onChange"
  ></ejs-richtexteditor-ui>
</template>

<script setup>
import { ref } from 'vue';
import { RichTextEditorUIComponent as EjsRichtexteditorUi } from '@syncfusion/ej2-vue-richtexteditor-ui';

const editor = ref(null);

const editorValue = ref('<p>Welcome to Modern Rich Text Editor!</p>');
const valueFormat = ref('html');
const placeholder = ref('Start typing...');
const enableAutoSave = ref(true);
const saveInterval = ref(1000);

const toolbarSettings = ref({
  items: [
    'Bold', 'Italic', 'Underline', '|',
    'Formats', 'Alignment', '|',
    'BulletList', 'NumberedList', '|',
    'Link', 'Image', 'Table', '|',
    'Undo', 'Redo'
  ]
});

const imageSettings = ref({
  allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'],
  maxFileSize: 30000000,
  uploadUrl: 'https://services.syncfusion.com/js/production/api/RichTextEditor/SaveFile',
  imageUrl: 'https://services.syncfusion.com/js/production/RichTextEditor/'
});

const onChange = (args) => {
  console.log('Editor content changed', args);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/richtexteditor-ui/index.css";
</style>
```

---

## Next Steps

After basic setup:

1. **Customize Toolbar** — See [references/toolbar.md](toolbar.md) for advanced toolbar configuration
2. **Add Text Formatting** — See [references/formatting.md](formatting.md) for inline and block formatting
3. **Handle Media** — See [references/image.md](image.md) and [references/table.md](table.md)
4. **Connect Events** — See [references/editor-events.md](editor-events.md)
5. **Use Keyboard Shortcuts** — See [references/formatting.md](formatting.md) keyboard section
6. **Implement Slash Commands** — See [references/features.md](features.md)

