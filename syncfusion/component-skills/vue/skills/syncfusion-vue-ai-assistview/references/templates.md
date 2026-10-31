# Using Templates

## Table of Contents
- [Banner Templates](#banner-templates)
- [Template Syntax](#template-syntax)
- [Composition API Templates](#composition-api-templates)
- [Styling Templates](#styling-templates)
- [Dynamic Templates](#dynamic-templates)
- [Best Practices](#best-practices)

## Banner Templates

The AI AssistView supports custom banner templates to create personalized welcome screens and introductions.

### Basic Banner Template

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :banner-template="bannerTemplate"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const bannerTemplate = () => ({
  template: `
    <div class="banner-content">
      <h1>Welcome to AI Assistant</h1>
      <p>How can I help you today?</p>
    </div>
  `
});

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response: ' + args.prompt);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";

.banner-content {
  text-align: center;
  padding: 40px 20px;
}

.banner-content h1 {
  color: #333;
  margin-bottom: 10px;
}

.banner-content p {
  color: #666;
  font-size: 14px;
}
</style>
```

### Banner with Icon

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :banner-template="bannerTemplate"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
const bannerTemplate = () => ({
  template: `
    <div class="banner-with-icon">
      <div class="e-icons e-assistview-icon" style="font-size: 60px; margin-bottom: 20px;"></div>
      <h2>AI Assistant</h2>
      <p>Ask me anything about Vue development</p>
    </div>
  `
});

const onPromptRequest = (args) => {
  // Handle prompt
};
</script>

<style>
.banner-with-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}
</style>
```

## Template Syntax

### HTML in Templates

Templates use HTML string syntax. Here's the basic structure:

```javascript
const bannerTemplate = () => ({
  template: `
    <div class="my-banner">
      <h3>Title</h3>
      <p>Description</p>
      <button>Action</button>
    </div>
  `
});
```

### Using Conditional Content

```javascript
const bannerTemplate = (data) => ({
  template: `
    <div class="banner">
      ${data.isAuthenticated ? 
        '<p>Welcome back!</p>' : 
        '<p>Please log in</p>'
      }
    </div>
  `
});
```

### Multi-line Templates

```javascript
const bannerTemplate = () => ({
  template: `
    <div class="banner-container">
      <header class="banner-header">
        <h1>Assistant</h1>
      </header>
      <main class="banner-main">
        <p>Welcome! Here's how I can help:</p>
        <ul>
          <li>Answer questions</li>
          <li>Provide code examples</li>
          <li>Assist with debugging</li>
        </ul>
      </main>
      <footer class="banner-footer">
        <small>Powered by AI</small>
      </footer>
    </div>
  `
});
```

## Composition API Templates

### Basic Composition API Example

```vue
<template>
  <div style="height: 500px; width: 700px;">
    <ejs-aiassistview
      ref="aiassist"
      :banner-template="bannerTemplate"
      :prompt-suggestions="suggestions"
      :prompt-request="onPromptRequest"
    />
  </div>
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const suggestions = [
  "What can you help with?",
  "Show me examples",
  "How do I get started?"
];

const bannerTemplate = () => ({
  template: `
    <div class="welcome-banner">
      <h2>Welcome to Vue Assistant</h2>
      <p>I'm here to help with your Vue development questions</p>
    </div>
  `
});

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";

.welcome-banner {
  padding: 40px;
  text-align: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.welcome-banner h2 {
  margin: 0 0 10px;
  font-size: 24px;
}

.welcome-banner p {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}
</style>
```

### With Dynamic Data

```vue
<script setup>
import { ref } from "vue";

const userName = ref("User");
const userRole = ref("Developer");

const bannerTemplate = () => ({
  template: `
    <div class="dynamic-banner">
      <p>Hello, <strong>${userName.value}</strong></p>
      <p>Role: ${userRole.value}</p>
    </div>
  `
});

// Update template data
const updateUserInfo = (name, role) => {
  userName.value = name;
  userRole.value = role;
};
</script>
```

## Styling Templates

### Custom Banner Styling

```vue
<style>
.banner-container {
  background: linear-gradient(to right, #667eea, #764ba2);
  color: white;
  padding: 50px;
  border-radius: 8px;
  text-align: center;
}

.banner-container h1 {
  font-size: 32px;
  margin: 0 0 20px;
  font-weight: bold;
}

.banner-container .subtitle {
  font-size: 16px;
  opacity: 0.9;
  margin-bottom: 20px;
}

.banner-container .features {
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
  flex-wrap: wrap;
}

.banner-container .feature {
  flex: 1;
  min-width: 150px;
  padding: 10px;
}
</style>
```

### Responsive Template Styling

```vue
<style>
.banner {
  padding: 40px 20px;
}

@media (max-width: 768px) {
  .banner {
    padding: 20px 10px;
  }
  
  .banner h1 {
    font-size: 20px;
  }
  
  .banner-features {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .banner {
    padding: 10px;
  }
  
  .banner h1 {
    font-size: 16px;
  }
}
</style>
```

## Dynamic Templates

### Template Based on State

```vue
<template>
  <ejs-aiassistview
    ref="aiassist"
    :banner-template="getCurrentBanner"
    :prompt-request="onPromptRequest"
  />
</template>

<script setup>
import { ref } from "vue";

const mode = ref('welcome'); // 'welcome', 'chat', 'error'

const getCurrentBanner = () => {
  if (mode.value === 'welcome') {
    return {
      template: '<div class="welcome">Welcome!</div>'
    };
  } else if (mode.value === 'error') {
    return {
      template: '<div class="error">Something went wrong</div>'
    };
  }
  return { template: '' };
};

const changeMode = (newMode) => {
  mode.value = newMode;
};
</script>
```

### Template with Suggestions List

```javascript
const bannerTemplate = (suggestions) => ({
  template: `
    <div class="banner-with-list">
      <h3>Try these prompts:</h3>
      <ul>
        ${suggestions.map(s => `<li>${s}</li>`).join('')}
      </ul>
    </div>
  `
});
```

## Best Practices

### 1. Keep Templates Simple
```javascript
// ✓ Good: Simple and readable
const bannerTemplate = () => ({
  template: `
    <div class="banner">
      <h2>Welcome</h2>
    </div>
  `
});

// ✗ Avoid: Too complex
const complexTemplate = () => ({
  template: `
    <div>${condition1 ? 'a' : condition2 ? 'b' : condition3 ? 'c' : 'd'}</div>
  `
});
```

### 2. Style Templates Consistently
```vue
<style>
/* Define consistent banner styling */
.banner {
  padding: 40px;
  background-color: #f5f5f5;
  border-radius: 8px;
  text-align: center;
}

.banner h2 {
  color: #333;
  margin: 0;
}
</style>
```

### 3. Make Templates Responsive
```vue
<style>
.banner {
  padding: 40px;
}

@media (max-width: 768px) {
  .banner {
    padding: 20px;
  }
}
</style>
```

### 4. Use Semantic HTML
```javascript
// ✓ Good: Semantic HTML
const bannerTemplate = () => ({
  template: `
    <article class="banner">
      <header><h2>Title</h2></header>
      <main><p>Content</p></main>
    </article>
  `
});

// ✗ Avoid: Non-semantic
const badTemplate = () => ({
  template: `<div><div><div>Content</div></div></div>`
});
```

### 5. Escape User Input
```javascript
// ✓ Good: Escape user input
const escapeHtml = (text) => {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};

const bannerTemplate = (userName) => ({
  template: `<div class="banner">Hello ${escapeHtml(userName)}</div>`
});

// ✗ Avoid: Direct interpolation
const unsafeTemplate = (userName) => ({
  template: `<div>Hello ${userName}</div>` // XSS vulnerability
});
```

### 6. Use CSS Classes for Styling
```javascript
// ✓ Good: Use CSS classes
const bannerTemplate = () => ({
  template: '<div class="app-banner"><h2>Title</h2></div>'
});

// ✗ Avoid: Inline styles
const inlineTemplate = () => ({
  template: '<div style="padding: 20px; color: blue;"><h2>Title</h2></div>'
});
```
