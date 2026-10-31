# Getting Started with Inline AI Assist

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Package Dependencies](#package-dependencies)
- [CSS Theme Imports](#css-theme-imports)
- [Component Registration](#component-registration)
- [Basic Setup](#basic-setup)

## Prerequisites

Ensure your Vue project meets the system requirements for Syncfusion Vue components:
- Node.js 12+ with npm or yarn
- Vue CLI or Vite for project scaffolding
- Vue 2 or Vue 3 compatibility

## Installation

Install the Syncfusion Inline AI Assist package via npm or yarn:

```bash
npm install @syncfusion/ej2-vue-interactive-chat --save
```

or using yarn:

```bash
yarn add @syncfusion/ej2-vue-interactive-chat
```

The package includes all required dependencies automatically.

## Package Dependencies

When you install `@syncfusion/ej2-vue-interactive-chat`, these dependencies are included:

```
|-- @syncfusion/ej2-interactive-chat
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-navigations
    |-- @syncfusion/ej2-inputs
    |-- @syncfusion/ej2-buttons
    |-- @syncfusion/ej2-dropdowns
    |-- @syncfusion/ej2-popups
```

All these base packages provide styling and functionality support.

## CSS Theme Imports

To install the material3 theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Import the required Syncfusion CSS themes in your component's `<style>` section or globally. The Tailwind3-based Material theme is recommended:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/inline-ai-assist/index.css";
</style>
```

Alternative themes available: `material.css`, `bootstrap5.css`, `fabric.css`, `bootstrap.css`. Choose based on your design requirements.

## Component Registration

```vue
<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
</script>
```

## Basic Setup

Define the component in your template with a container:

```vue
<template>
  <div id="app">
    <div id="container" style="height: 300px; width: 600px;">
      <br>
      <ejs-inlineaiassist></ejs-inlineaiassist>
    </div>
  </div>
</template>
```

### Running Your Application

Start the development server:

```bash
npm run serve
```

or with yarn:

```bash
yarn run serve
```

Your application will be available at `http://localhost:8080` (or the configured port).

### Full Getting Started Example

```vue
<template>
  <div id="app" style="padding: 20px;">
    <h1>Inline AI Assist Component</h1>
    <div style="height: 400px; width: 700px; margin-top: 20px;">
      <button @click="showPopup" style="margin-bottom: 10px;">Open Assistant</button>
      <ejs-inlineaiassist 
        relate-to="#btn"
        :prompt-request="onPromptRequest"
        :response-settings="responseSettings"
        ref="inlineAiAssist">
      </ejs-inlineaiassist>
    </div>
  </div>
</template>

<script setup>
import { InlineAIAssistComponent as EjsInlineaiassist } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

let inlineAiAssist = ref(null);

const responseSettings = {
  itemSelect: (args) => {
    if (args.command.label === 'Accept') {
      inlineAiAssist.value?.hidePopup();
    }
  }
};

const onPromptRequest = () => {
  setTimeout(() => {
    const response = 'AI response will appear here when connected to an AI service.';
    inlineAiAssist.value?.addResponse(response);
  }, 1000);
};

const showPopup = () => {
  inlineAiAssist.value?.showPopup();
};
</script>
```

## Next Steps

Once your basic setup is complete, explore:
1. **Prompt Configuration** - Set up prompts and manage responses
2. **Command Settings** - Create custom command actions
3. **Response Settings** - Configure response popup actions
4. **Events & Methods** - Handle component lifecycle and user interactions
