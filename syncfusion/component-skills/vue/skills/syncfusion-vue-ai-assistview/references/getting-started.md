# Getting Started with Vue AI AssistView

## Table of Contents
- [Prerequisites](#prerequisites)
- [Project Setup](#project-setup)
- [Installing Syncfusion Packages](#installing-syncfusion-packages)
- [Importing CSS Styles](#importing-css-styles)
- [Registering the Component](#registering-the-component)
- [Running Your Application](#running-your-application)
- [Next Steps](#next-steps)

## Prerequisites

Before starting, ensure you have:
- **Node.js** installed (v12 or higher)
- **npm** or **yarn** package manager
- Basic knowledge of Vue 2 and Vue-CLI
- Terminal/Command prompt access

### System Requirements
For Syncfusion Vue UI components, check the [official system requirements](https://ej2.syncfusion.com/vue/documentation/system-requirements).

## Project Setup

### Step 1: Install Vue CLI

If Vue CLI is not already installed, install it globally:

```bash
npm install -g @vue/cli
```

Or with yarn:

```bash
yarn global add @vue/cli
```

### Step 2: Create a New Vue 2 Project

Run the following command to create a new project:

```bash
vue create ai-assistview-demo
cd ai-assistview-demo
```

When prompted, choose: **Default ([Vue 2] babel, eslint)**

This will scaffold a Vue 2 project with the necessary configurations.

### Step 3: Verify Project Structure

Your project structure should look like:

```
ai-assistview-demo/
├── src/
│   ├── components/
│   ├── App.vue
│   ├── main.js
│   └── ...
├── public/
├── package.json
└── ...
```

## Installing Syncfusion Packages

The AI AssistView component is part of the `@syncfusion/ej2-vue-interactive-chat` package.

### Install via npm

```bash
npm install @syncfusion/ej2-vue-interactive-chat --save
```

This will also install required dependencies:
- `@syncfusion/ej2-base`
- `@syncfusion/ej2-inputs`
- `@syncfusion/ej2-navigations`
- `@syncfusion/ej2-notifications`

### Install via yarn

```bash
yarn add @syncfusion/ej2-vue-interactive-chat
```

### Verify Installation

After installation, check your `package.json` to confirm the package is listed:

```json
{
  "dependencies": {
    "@syncfusion/ej2-vue-interactive-chat": "^latest-version",
    "vue": "^2.6.0"
  }
}
```

## Importing CSS Styles

To install the material3 theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Syncfusion components require CSS styles to render correctly. Add the styles to your main **src/App.vue** file.

### Available Themes

Syncfusion provides multiple built-in themes:
- `material3` - Material Design 3
- `bootstrap` - Bootstrap 5 theme
- `bootstrap4` - Bootstrap 4 theme
- `tailwind` - Tailwind CSS theme
- `highcontrast` - High contrast accessibility theme

### Import Material3 Theme

Add these imports to the `<style>` section of **src/App.vue**:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

### Import Bootstrap Theme

For Bootstrap theme, use:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-bootstrap-theme/styles/ai-assistview/index.css";
</style>
```

### Import Tailwind Theme

For Tailwind CSS theme, use:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/ai-assistview/index.css";
</style>
```

## Registering the Component

Register the AI AssistView component in your Vue application.

Edit **src/App.vue**:

```vue
<template>
  <div id="app">
    <div id="container" style="height: 500px; width: 700px; margin: 0 auto;">
      <br />
      <ejs-aiassistview ref="aiassist" />
    </div>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

## Running Your Application

### Start the Development Server

Run:

```bash
npm run serve
```

Or with yarn:

```bash
yarn serve
```

The application will start at `http://localhost:8080/` (or another port if 8080 is in use).

### Access Your Application

Open your browser and navigate to the URL shown in the terminal. You should see the empty AI AssistView component ready for configuration.

### Stop the Server

Press `Ctrl + C` in the terminal to stop the development server.

## Complete Example

Here's a complete setup with basic configuration:

```vue
<template>
  <div id="app">
    <div id="container" style="height: 500px; width: 700px; margin: 0 auto;">
      <br />
      <ejs-aiassistview
        ref="aiassist"
        prompt="Hello! How can I assist you?"
        :prompt-suggestions="suggestions"
        :prompt-request="onPromptRequest"
      />
    </div>
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const suggestions = [
  "What is AI?",
  "How do I get started?"
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    let response = 'To enable real AI responses, connect this component to an AI service like OpenAI or Gemini.';
    aiassist.value.addPromptResponse(response);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

## Next Steps

After completing the setup:

1. **Add Prompt Configuration** - Set initial prompts and manage conversation history
2. **Create Suggestions** - Add suggestion chips to guide users
3. **Handle Events** - Connect the `promptRequest` event to process user queries
4. **Integrate AI Service** - Connect to OpenAI, Gemini, or another AI provider
5. **Customize Appearance** - Apply themes and custom styling
6. **Use Templates** - Create custom layouts with banner templates

For more details, refer to the other reference guides or the official Syncfusion documentation.
