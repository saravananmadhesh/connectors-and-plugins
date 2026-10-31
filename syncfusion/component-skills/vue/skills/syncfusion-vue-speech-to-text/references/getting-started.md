# Getting Started with Speech-to-Text in Vue 3

## System Requirements

Review [System requirements for Syncfusion Vue UI components](https://ej2.syncfusion.com/vue/documentation/system-requirements/)

## Set Up the Vite Project

A recommended approach for beginning with Vue is to scaffold a project using Vite. To create a new Vite project, use one of the commands specific to either NPM or Yarn.

```bash
npm create vite@latest
```

or

```bash
yarn create vite
```

Using one of the above commands will lead you to set up additional configurations:

**1. Define the project name:**

```bash
? Project name: » my-project
```

**2. Select Vue as the framework:**

```bash
? Select a framework: » - Use arrow-keys. Return to submit.
Vanilla
> Vue
  React
  Preact
  Lit
  Svelte
  Others
```

**3. Choose JavaScript as the framework variant:**

```bash
? Select a variant: » - Use arrow-keys. Return to submit.
> JavaScript
  TypeScript
  Customize with create-vue ↗
  Nuxt ↗
```

**4. Install dependencies:**

```bash
cd my-project
npm install
```

or

```bash
cd my-project
yarn install
```

## Install Syncfusion Vue Packages

The Speech-to-Text component is available in the `@syncfusion/ej2-vue-inputs` package. Install it using:

```bash
npm install @syncfusion/ej2-vue-inputs --save
```

or

```bash
yarn add @syncfusion/ej2-vue-inputs
```

## Add CSS Theme Reference

You can import themes using CSS or SASS styles from npm packages. This article uses the Material theme applied via CSS styles in the `<style>` section of **src/App.vue**.

To install the material3 theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Import the necessary Material CSS styles for the SpeechToText component and its dependencies:

```vue
<style>
    @import "../node_modules/@syncfusion/ej2-material3-theme/styles/speech-to-text/index.css";
</style>
```

## Register the SpeechToText Component

In the `<script setup>` section of **src/App.vue**, import and register the SpeechToText component:

```vue
<script setup>
import { SpeechToTextComponent as EjsSpeechtotext } from "@syncfusion/ej2-vue-inputs";
</script>
```

Add the component definition in the template:

```vue
<template>
  <ejs-speechtotext id="speechtotext"></ejs-speechtotext>
</template>
```

## Complete Setup Example

```vue
<template>
  <ejs-speechtotext id="speechtotext"></ejs-speechtotext>
</template>

<script setup>
import { SpeechToTextComponent as EjsSpeechtotext } from "@syncfusion/ej2-vue-inputs";
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/speech-to-text/index.css";
</style>
```

## Run the Project

Start the development server:

```bash
npm run dev
```

or

```bash
yarn run dev
```

The SpeechToText component will render with a microphone button ready for voice input.

## Important Notes

- The SpeechToText component requires an active internet connection
- Browser must support the [Speech Recognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition)
- User must grant microphone permissions for the component to function.
