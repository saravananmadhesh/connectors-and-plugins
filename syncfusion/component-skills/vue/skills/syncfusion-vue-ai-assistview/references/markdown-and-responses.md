# Rendering Markdown & Rich Content

## Table of Contents
- [Markdown Overview](#markdown-overview)
- [Supported Markdown Syntax](#supported-markdown-syntax)
- [HTML Rendering](#html-rendering)
- [Response Streaming](#response-streaming)
- [Content Formatting Examples](#content-formatting-examples)
- [Best Practices](#best-practices)

## Markdown Overview

The AI AssistView supports rendering responses as **Markdown** content, which is automatically converted to HTML using the built-in Markdown Converter. When you pass markdown-formatted text in the response, it will be displayed as formatted HTML in the AI AssistView.

### Basic Markdown Response

```javascript
const onPromptRequest = (args) => {
  setTimeout(() => {
    const markdownResponse = `
# Main Title

This is a paragraph with **bold** and *italic* text.

## Subheading

Here's a list:
- Item 1
- Item 2
- Item 3
    `;
    
    aiassist.value.addPromptResponse(markdownResponse);
  }, 1000);
};
```

### Response Types

```javascript
// Plain text response
aiassist.value.addPromptResponse('Simple text response');

// HTML response
aiassist.value.addPromptResponse('<div>HTML content</div>');

// Markdown response
aiassist.value.addPromptResponse('# Markdown Title\nParagraph text');
```

## Supported Markdown Syntax

### Headings

```markdown
# H1 Heading
## H2 Heading
### H3 Heading
#### H4 Heading
##### H5 Heading
###### H6 Heading
```

Renders as:
```javascript
const response = `
# Main Title
## Subsection
### Details
`;
aiassist.value.addPromptResponse(response);
```

### Text Formatting

```markdown
**Bold text**
__Bold text__
*Italic text*
_Italic text_
~~Strikethrough~~
`Code inline`
```

Example:
```javascript
const response = `
Use **bold** for important points.
Use *italic* for emphasis.
Use \`code\` for snippets.
`;
aiassist.value.addPromptResponse(response);
```

### Lists

**Unordered List:**
```markdown
- Item 1
- Item 2
- Item 3
  - Nested item
  - Another nested
```

**Ordered List:**
```markdown
1. First item
2. Second item
3. Third item
   1. Nested item
   2. Another nested
```

Example:
```javascript
const response = `
## Tasks:
1. Install Vue
2. Create component
3. Test application
   - Unit tests
   - Integration tests
`;
aiassist.value.addPromptResponse(response);
```

### Code Blocks

```markdown
\`\`\`javascript
const greeting = 'Hello Vue!';
console.log(greeting);
\`\`\`
```

Example:
```javascript
const response = `
\`\`\`vue
<template>
  <div>Hello {{ message }}</div>
</template>

<script setup>
const message = 'Vue 3';
</script>
\`\`\`
`;
aiassist.value.addPromptResponse(response);
```

### Links and Images

```markdown
[Link text](https://example.com)
![Alt text](https://example.com/image.png)
```

Example:
```javascript
const response = `
Learn more: [Vue Documentation](https://vuejs.org)
![Vue Logo](https://vuejs.org/logo.svg)
`;
aiassist.value.addPromptResponse(response);
```

### Blockquotes

```markdown
> This is a quote
> It can span multiple lines
> > With nested quotes
```

Example:
```javascript
const response = `
> "The best way to predict the future is to invent it."
> – Alan Kay
`;
aiassist.value.addPromptResponse(response);
```

### Horizontal Rules

```markdown
---
***
___
```

Example:
```javascript
const response = `
## Section 1
Content here
---
## Section 2
More content
`;
aiassist.value.addPromptResponse(response);
```

## HTML Rendering

You can also return HTML directly for more control over formatting.

### Basic HTML Response

```javascript
const onPromptRequest = (args) => {
  setTimeout(() => {
    const htmlResponse = `
      <div>
        <h2>Response Title</h2>
        <p>This is a paragraph.</p>
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
        </ul>
      </div>
    `;
    
    aiassist.value.addPromptResponse(htmlResponse);
  }, 1000);
};
```

### HTML with Styling

```javascript
const htmlResponse = `
  <div style="padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
    <h3>Important Information</h3>
    <p style="color: #333;">Here's what you need to know:</p>
    <ul style="color: #555;">
      <li>Point 1</li>
      <li>Point 2</li>
      <li>Point 3</li>
    </ul>
  </div>
`;

aiassist.value.addPromptResponse(htmlResponse);
```

### HTML Tables

```javascript
const htmlResponse = `
  <table style="border-collapse: collapse; width: 100%;">
    <tr>
      <th style="border: 1px solid #ddd; padding: 8px;">Header 1</th>
      <th style="border: 1px solid #ddd; padding: 8px;">Header 2</th>
    </tr>
    <tr>
      <td style="border: 1px solid #ddd; padding: 8px;">Cell 1</td>
      <td style="border: 1px solid #ddd; padding: 8px;">Cell 2</td>
    </tr>
  </table>
`;

aiassist.value.addPromptResponse(htmlResponse);
```

## Response Streaming

Handle long responses by streaming content progressively.

### Simple Streaming

```javascript
const onPromptRequest = async (args) => {
  const fullResponse = await generateLongResponse(args.prompt);
  
  // Send in chunks
  for (let i = 0; i < fullResponse.length; i += 100) {
    const chunk = fullResponse.substring(i, i + 100);
    aiassist.value.addPromptResponse(chunk);
    
    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

const generateLongResponse = async (prompt) => {
  return `Long response to: ${prompt}...`;
};
```

### Real-time Streaming from API

```javascript
const onPromptRequest = async (args) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: args.prompt }],
        stream: true
      })
    });
    
    const reader = response.body.getReader();
    let result = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = new TextDecoder().decode(value);
      result += chunk;
      aiassist.value.addPromptResponse(result);
    }
  } catch (error) {
    aiassist.value.addPromptResponse('Error: ' + error.message);
  }
};
```

## Content Formatting Examples

### Code Tutorial Response

```javascript
const response = `
# Vue Component Tutorial

## Creating a Simple Component

\`\`\`vue
<template>
  <button @click="count++">{{ count }}</button>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
\`\`\`

## Key Concepts

1. **Reactive State** - Use \`ref()\` for reactive data
2. **Templates** - Bind data with \`{{ }}\`
3. **Events** - Use \`@click\` for event handling

> **Tip:** Always use \`<script setup>\` for simpler components!
`;

aiassist.value.addPromptResponse(response);
```

### Technical Documentation Response

```javascript
const response = `
# API Documentation

## GET /api/users

Retrieve all users.

### Request Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| page | integer | Page number (default: 1) |
| limit | integer | Items per page (default: 10) |

### Response

\`\`\`json
{
  "data": [
    { "id": 1, "name": "User 1" },
    { "id": 2, "name": "User 2" }
  ],
  "total": 100
}
\`\`\`

### Example

\`\`\`javascript
const users = await fetch('/api/users?page=1&limit=10');
\`\`\`
`;

aiassist.value.addPromptResponse(response);
```

### Multi-section Response

```javascript
const response = `
# Complete Guide

## Overview
Introduction to the topic.

---

## Getting Started
\`\`\`bash
npm install package-name
\`\`\`

---

## Usage Examples

### Example 1: Basic Setup
Content here

### Example 2: Advanced Setup
Content here

---

## Troubleshooting

**Problem:** Something not working
**Solution:** Try this fix

---

## Resources
- [Link 1](https://example.com)
- [Link 2](https://example.com)
`;

aiassist.value.addPromptResponse(response);
```

## Best Practices

### 1. Use Markdown for Better Readability

```javascript
// ✓ Good: Formatted with markdown
const response = `
# Answer

Here's the solution:

1. **Step 1:** Do this
2. **Step 2:** Then do this
3. **Step 3:** Finally do this

\`\`\`javascript
// Code example
const result = doSomething();
\`\`\`
`;

// ✗ Avoid: Plain text
const plainResponse = 'Answer: Step 1, then step 2, then step 3. Code: const result = doSomething();';
```

### 2. Keep Code Examples Clean

```javascript
// ✓ Good: Clear and formatted
const response = `
\`\`\`javascript
const greeting = (name) => {
  return \`Hello \${name}!\`;
};

console.log(greeting('Vue'));
\`\`\`
`;
```

### 3. Use Appropriate Heading Levels

```javascript
// ✓ Good: Proper hierarchy
const response = `
# Main Topic
## Subtopic
### Detail
`;

// ✗ Avoid: Inconsistent hierarchy
const badResponse = `
# Title
### Subsection (missing ## level)
## Another section
`;
```

### 4. Escape Special Characters

```javascript
// ✓ Good: Properly escaped
const response = `
Use \`\`\` for code blocks
Use \\` for inline code
`;

// ✗ Avoid: Unescaped backticks
const badResponse = `
Use ` for code blocks
`;
```

### 5. Make Content Scannable

```javascript
// ✓ Good: Easy to scan
const response = `
# Solution

## Quick Answer
Here's the direct answer.

## Detailed Explanation
Here are the details.

## Code Example
\`\`\`javascript
// Example code
\`\`\`

## Related Topics
- Topic 1
- Topic 2
`;
```

### 6. Include Context and Examples

```javascript
// ✓ Good: Includes context
const response = `
## How to Use Props

Props pass data from parent to child components.

**Example:**
\`\`\`vue
<ChildComponent :message="greeting" />
\`\`\`

In the child:
\`\`\`vue
<script setup>
defineProps({
  message: String
})
</script>
\`\`\`
`;
```

### 7. Test Rendering

```javascript
// Verify markdown renders correctly
const testMarkdown = (markdown) => {
  aiassist.value.addPromptResponse(markdown);
  
  // Check if rendered correctly
  const element = document.querySelector('.e-aiassist-response');
  if (!element) console.error('Failed to render');
};

testMarkdown('# Test\nContent');
```
