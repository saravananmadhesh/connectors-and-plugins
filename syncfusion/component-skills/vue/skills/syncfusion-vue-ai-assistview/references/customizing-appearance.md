# Customizing Appearance

## Table of Contents
- [User Avatar Customization](#user-avatar-customization)
- [AI Response Avatar](#ai-response-avatar)
- [Clear Button Visibility](#clear-button-visibility)
- [Theme Selection](#theme-selection)
- [Custom Styling](#custom-styling)
- [Best Practices](#best-practices)

## User Avatar Customization

The `promptIconCss` property enables customization of the user avatar icon that appears alongside user prompts.

### Basic Usage

```vue
<template>
  <ejs-aiassistview
    promptIconCss="e-icons e-user"
    ref="aiassist"
  />
</template>
```

### Using Syncfusion Icons

Syncfusion provides a rich icon library. Here are common user-related icons:

```vue
<template>
  <div style="height: 400px; width: 600px;">
    <!-- User icon -->
    <ejs-aiassistview
      promptIconCss="e-icons e-user"
      ref="aiassist1"
    />
    
    <!-- Profile icon -->
    <ejs-aiassistview
      promptIconCss="e-icons e-user-profile"
      ref="aiassist2"
    />
    
    <!-- Person icon -->
    <ejs-aiassistview
      promptIconCss="e-icons e-person"
      ref="aiassist3"
    />
    
    <!-- Developer icon -->
    <ejs-aiassistview
      promptIconCss="e-icons e-developer"
      ref="aiassist4"
    />
  </div>
</template>
```

### Composition API Example

```vue
<template>
  <div style="height: 400px; width: 600px;">
    <ejs-aiassistview
      ref="aiassist"
      promptIconCss="e-icons e-user"
      :prompts="samplePrompts"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const samplePrompts = [
  {
    prompt: "What is Vue?",
    response: "<div>Vue is a JavaScript framework.</div>"
  }
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>
```

## AI Response Avatar

The `responseIconCss` property allows customization of the AI assistant avatar that appears alongside AI responses. By default, the built-in `e-assistview-icon` class is used.

### Basic Usage

```vue
<template>
  <ejs-aiassistview
    responseIconCss="e-icons e-bot"
    ref="aiassist"
  />
</template>
```

### Changing the Response Icon

```vue
<template>
  <div style="height: 400px; width: 600px;">
    <!-- Bot icon -->
    <ejs-aiassistview
      responseIconCss="e-icons e-bot"
      ref="aiassist1"
    />
    
    <!-- Lightbulb icon (for assistant) -->
    <ejs-aiassistview
      responseIconCss="e-icons e-lightbulb"
      ref="aiassist2"
    />
    
    <!-- Question icon -->
    <ejs-aiassistview
      responseIconCss="e-icons e-question-mark"
      ref="aiassist3"
    />
    
    <!-- Default AI AssistView icon -->
    <ejs-aiassistview
      ref="aiassist4"
    />
  </div>
</template>
```

### Customizing Icon Size

```vue
<template>
  <div style="height: 400px; width: 600px;">
    <ejs-aiassistview
      ref="aiassist"
      responseIconCss="e-icons e-bullet-4"
      :prompts="samplePrompts"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const samplePrompts = [
  {
    prompt: "Tell me about AI",
    response: "<div>AI is Artificial Intelligence.</div>"
  }
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('AI Response: ' + args.prompt);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";

.e-icons.e-bullet-4:before {
  font-size: 30px;
}
</style>
```

## Clear Button Visibility

The `showClearButton` property controls the visibility of the clear button in the prompt input area. By default, it's `false`. When the clear button is clicked, only the current prompt text is cleared, while the conversation history remains intact.

### Enable Clear Button

```vue
<template>
  <ejs-aiassistview
    show-clear-button="true"
    prompt="What would you like to know?"
    :prompt-request="onPromptRequest"
    ref="aiassist"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

## Theme Selection

Choose from Syncfusion's built-in themes to match your application's design.

### Available Themes

#### Material3 (Default)

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

#### Bootstrap Theme

```vue
<style>
@import "../node_modules/@syncfusion/ej2-bootstrap-theme/styles/ai-assistview/index.css";
</style>
```

#### Tailwind Theme

```vue
<style>
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/ai-assistview/index.css";
</style>
```

#### High Contrast Theme

```vue
<style>
@import "../node_modules/@syncfusion/ej2-highcontrast-theme/styles/ai-assistview/index.css";
</style>
```

## Custom Styling

Apply custom CSS to further customize the component's appearance.

### Custom Background Colors

```vue
<template>
  <div style="height: 400px; width: 600px;" class="custom-aiassist">
    <ejs-aiassistview ref="aiassist" />
  </div>
</template>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";

.custom-aiassist .e-aiassist-container {
  background-color: #f5f5f5;
}

.custom-aiassist .e-aiassist-input {
  border: 2px solid #007bff;
  border-radius: 8px;
}
</style>
```

### Custom Font and Text Styling

```vue
<style>
.custom-aiassist .e-aiassist-prompt {
  font-size: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana;
  color: #333;
}

.custom-aiassist .e-aiassist-response {
  font-size: 14px;
  line-height: 1.6;
  color: #555;
}
</style>
```

### Custom Avatar Styling

```vue
<style>
.custom-aiassist .e-aiassist-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #007bff;
}

.custom-aiassist .e-user-avatar {
  background-color: #28a745;
}
</style>
```

## Best Practices

### 1. Maintain Visual Consistency
Use consistent avatars and theming throughout your application:

**Note:** AIAssistView does not have a `theme` property. Apply themes by importing the appropriate CSS files in your component's style section.

```vue
<template>
  <ejs-aiassistview
    promptIconCss="e-icons e-user"
    responseIconCss="e-icons e-bot"
  />
</template>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";
</style>
```

### 2. Ensure Accessibility
Use high-contrast themes for better readability:
```vue
<style>
@import "../node_modules/@syncfusion/ej2-highcontrast-theme/styles/ai-assistview/index.css";
</style>
```

### 3. Match Brand Colors
Customize appearance to match your brand:
```vue
<style>
.custom-aiassist .e-aiassist-container {
  background-color: var(--brand-primary-color);
}
</style>
```

### 4. Mobile Responsiveness
Adapt appearance for mobile devices:
```vue
<style>
@media (max-width: 768px) {
  .custom-aiassist {
    height: 100vh !important;
    width: 100vw !important;
  }
}
</style>
```

### 5. Test Icon Visibility
Ensure custom icons are visible and properly scaled:
```javascript
// Test icon rendering
const icon = document.querySelector('.e-user-avatar');
console.log(icon.offsetWidth); // Should be > 0
```
