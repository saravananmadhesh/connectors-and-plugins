# Adding Suggestions & Guidance

## Table of Contents
- [Configuring Suggestions](#configuring-suggestions)
- [Customizing Suggestions Header](#customizing-suggestions-header)
- [Dynamic Suggestions](#dynamic-suggestions)
- [Task-Specific Flows](#task-specific-flows)
- [Improving UX with Suggestions](#improving-ux-with-suggestions)
- [Best Practices](#best-practices)

## Configuring Suggestions

The `promptSuggestions` property provides users with helpful suggestion chips that appear in the component. These guide users on what they can ask and improve the overall user experience.

### Basic Usage

```vue
<template>
  <ejs-aiassistview
    :prompt-suggestions="suggestions"
    :prompt-request="onPromptRequest"
    ref="aiassist"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const suggestions = [
  "What is Vue?",
  "How do I get started?",
  "Tell me about components"
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Answer to: ' + args.prompt);
  }, 1000);
};
</script>
```

## Customizing Suggestions Header

The `promptSuggestionsHeader` property allows you to set a descriptive header text that appears above the prompt suggestions.

### Basic Usage

```vue
<template>
  <ejs-aiassistview
    :prompt-suggestions="suggestions"
    prompt-suggestions-header="Suggested Prompts"
    :prompt-request="onPromptRequest"
    ref="aiassist"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const suggestions = [
  "What can you help me with?",
  "Show me examples",
  "How do I get started?"
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>
```

### Context-Specific Headers

```vue
<template>
  <ejs-aiassistview
    :prompt-suggestions="suggestions"
    :prompt-suggestions-header="contextHeader"
    :prompt-request="onPromptRequest"
    ref="aiassist"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);
const userContext = ref('coding'); // 'coding', 'productivity', 'design'

const suggestions = ref([]);
const contextHeader = ref('');

// Set suggestions based on context
const updateSuggestions = (context) => {
  if (context === 'coding') {
    suggestions.value = [
      "How do I debug Vue?",
      "Best practices for component design"
    ];
    contextHeader.value = "🔧 Coding Tips";
  } else if (context === 'productivity') {
    suggestions.value = [
      "How do I prioritize tasks?",
      "Time management techniques"
    ];
    contextHeader.value = "⚡ Productivity Suggestions";
  }
};

updateSuggestions(userContext.value);

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Response to: ' + args.prompt);
  }, 1000);
};
</script>
```

## Dynamic Suggestions

Update suggestions based on user interactions or application state.

### Update Suggestions After Response

```javascript
const onPromptRequest = (args) => {
  setTimeout(() => {
    // Generate response
    aiassist.value.addPromptResponse('Your response...');
    
    // Update suggestions based on the prompt
    const newSuggestions = generateFollowUpSuggestions(args.prompt);
    aiassist.value.ej2Instances.promptSuggestions = newSuggestions;
  }, 1000);
};

const generateFollowUpSuggestions = (userPrompt) => {
  if (userPrompt.includes('Vue')) {
    return [
      "Tell me about Vue Composition API",
      "How do I create custom hooks?",
      "Show me a real-world example"
    ];
  } else if (userPrompt.includes('React')) {
    return [
      "Explain React Hooks",
      "When should I use useEffect?",
      "Show me Context API examples"
    ];
  }
  return [];
};
```

### Conditional Suggestions Based on Conversation

```javascript
const updateSuggestionsForContext = () => {
  const history = aiassist.value.ej2Instances.prompts;
  
  // If user asked about basics, suggest advanced topics
  const askedAboutBasics = history.some(item =>
    item.prompt.toLowerCase().includes('beginner') ||
    item.prompt.toLowerCase().includes('what is')
  );
  
  if (askedAboutBasics) {
    aiassist.value.ej2Instances.promptSuggestions = [
      "Show me advanced patterns",
      "How do I optimize performance?",
      "Tell me about best practices"
    ];
  }
};
```

## Task-Specific Flows

Create suggestion flows tailored to specific use cases.

### Code Review Assistant

```vue
<template>
  <ejs-aiassistview
    :prompt-suggestions="codeReviewSuggestions"
    prompt-suggestions-header="Code Review Tasks"
    :prompt-request="onPromptRequest"
    ref="aiassist"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const codeReviewSuggestions = [
  "Review this component for performance issues",
  "Check for accessibility problems",
  "Suggest refactoring improvements",
  "Identify security vulnerabilities"
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Code review suggestion for: ' + args.prompt);
  }, 1000);
};
</script>
```

### Documentation Writer

```vue
<template>
  <ejs-aiassistview
    :prompt-suggestions="docSuggestions"
    prompt-suggestions-header="Documentation Help"
    :prompt-request="onPromptRequest"
    ref="aiassist"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const docSuggestions = [
  "Generate API documentation",
  "Write usage examples",
  "Create a quick start guide",
  "Document error handling"
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Documentation help for: ' + args.prompt);
  }, 1000);
};
</script>
```

### Learning Path

```vue
<template>
  <ejs-aiassistview
    :prompt-suggestions="learningPath"
    prompt-suggestions-header="Learning Roadmap"
    :prompt-request="onPromptRequest"
    ref="aiassist"
  />
</template>

<script setup>
import { AIAssistViewComponent as EjsAiassistview } from "@syncfusion/ej2-vue-interactive-chat";
import { ref } from "vue";

const aiassist = ref(null);

const learningPath = [
  "1. What is Vue and why use it?",
  "2. Setting up your first Vue project",
  "3. Understanding components and props",
  "4. Managing state with Composition API",
  "5. Building a real-world application"
];

const onPromptRequest = (args) => {
  setTimeout(() => {
    aiassist.value.addPromptResponse('Learning resource for: ' + args.prompt);
  }, 1000);
};
</script>
```

## Improving UX with Suggestions

### Best Practices for Effective Suggestions

#### 1. Keep Suggestions Concise
Use short, actionable suggestions:
```javascript
// ✓ Good
const suggestions = [
  "What is Vue?",
  "How do I create components?",
  "Show me examples"
];

// ✗ Avoid
const suggestions = [
  "What is Vue and how does it work compared to other frameworks?",
  "Show me a complete example of how to create and use components in Vue"
];
```

#### 2. Provide 3-5 Key Suggestions
Limit suggestions to avoid overwhelming users:
```javascript
// ✓ Optimal
const suggestions = [
  "Getting started",
  "Common patterns",
  "Advanced features",
  "Troubleshooting"
];

// ✗ Too many
const suggestions = [
  "Suggestion 1", "Suggestion 2", "Suggestion 3",
  "Suggestion 4", "Suggestion 5", "Suggestion 6",
  "Suggestion 7", "Suggestion 8"
];
```

#### 3. Use Progressive Disclosure
Start simple, advance gradually:
```javascript
// Initial suggestions for beginners
const initialSuggestions = [
  "What can you help with?",
  "Show me a basic example"
];

// Advanced suggestions after user engagement
const advancedSuggestions = [
  "Explain advanced patterns",
  "Performance optimization tips"
];
```

## Best Practices

### 1. Use Action-Oriented Language
```javascript
// ✓ Good
["Show me how", "Help me with", "Explain why"]

// ✗ Vague
["Information", "Details", "More"]
```

### 2. Reflect User Intent
```javascript
// Based on the user's domain
const softwareDeveloper = [
  "Best practices for clean code?",
  "How to debug this code?"
];

const designer = [
  "Design principles for UI",
  "Color theory tips"
];
```

### 3. Make Suggestions Discoverable
Show contextual help on first load:
```vue
<ejs-aiassistview
  :prompt-suggestions="initialSuggestions"
  :prompt-request="onPromptRequest"
/>
```

### 4. Enable Clearing Old Suggestions
Let users reset and start fresh:
```javascript
const resetSuggestions = () => {
  aiassist.value.ej2Instances.promptSuggestions = defaultSuggestions;
  aiassist.value.ej2Instances.prompts = [];
};
```

### 5. Update Suggestions Based on Feedback
Track which suggestions users click:
```javascript
const suggestionStats = ref({});

const onPromptRequest = (args) => {
  // Track which suggestion was clicked
  suggestionStats.value[args.prompt] = 
    (suggestionStats.value[args.prompt] || 0) + 1;
};
```
