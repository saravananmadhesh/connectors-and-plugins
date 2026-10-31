# Appearance

## Table of Contents
- [Overview](#overview)
- [Setting Width](#setting-width)
- [Setting Height](#setting-height)
- [CSS Class Customization](#css-class-customization)
- [RTL Support](#rtl-support)
- [Theme Customization](#theme-customization)

This guide covers appearance customization options for the AI AssistView component.

---

## Overview

The AI AssistView provides four main properties for appearance customization:

- **width**: Control width (default: `100%`)
- **height**: Control height (default: `100%`)
- **cssClass**: Custom CSS classes for styling
- **enableRtl**: Right-to-left layout support

---

## Setting Width

### Property

```typescript
width: string | number = '100%'
```

Control the width of the AI AssistView component.

### Fixed Width

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    width: '650px',
    promptRequest: (args) => {
        setTimeout(() => {
            const response = 'For real-time prompt processing, connect to your AI service.';
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### Percentage Width

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    width: '80%',  // 80% of parent container
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

### Numeric Value

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    width: 700,  // 700 pixels
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

### HTML Container

```html
<div id='container' style="height: 350px;">
    <div id="aiAssistView"></div>
</div>
```

---

## Setting Height

### Property

```typescript
height: string | number = '100%'
```

Control the height of the AI AssistView component.

### Fixed Height

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    height: '350px',
    promptRequest: (args) => {
        setTimeout(() => {
            const response = 'For real-time prompt processing, connect to your AI service.';
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### Percentage Height

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    height: '90%',  // 90% of parent container
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

### Combined Width and Height

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    width: '700px',
    height: '400px',
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

### HTML Container

```html
<div id='container' style="width: 650px;">
    <div id="aiAssistView"></div>
</div>
```

---

## CSS Class Customization

### Property

```typescript
cssClass: string = ''
```

Apply custom CSS classes to customize the appearance of the AI AssistView.

### Basic Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const aiAssistView: AIAssistView = new AIAssistView({
    cssClass: 'custom-container',
    promptRequest: (args) => {
        setTimeout(() => {
            const response = 'For real-time prompt processing, connect to your AI service.';
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### Custom Styling

```html
<style>
    .e-aiassistview.custom-container {
        border-color: #e0e0e0;
        background-color: #f4f4f4;
        box-shadow: 3px 3px 10px 0px rgba(0, 0, 0, 0.2);
    }

    .e-aiassistview.custom-container .e-view-header .e-toolbar,
    .e-aiassistview.custom-container .e-view-header .e-toolbar-items {
        background: #d5d5d5;
    }

    .e-aiassistview.custom-container .e-view-content .e-input-group {
        border: 3px solid #e0e0e0 !important;
    }
</style>
```

### Dark Theme Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    cssClass: 'dark-theme',
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

```html
<style>
    .e-aiassistview.dark-theme {
        background-color: #2b2b2b;
        color: #ffffff;
        border-color: #404040;
    }

    .e-aiassistview.dark-theme .e-view-header .e-toolbar {
        background: #1e1e1e;
        border-bottom: 1px solid #404040;
    }

    .e-aiassistview.dark-theme .e-prompt-item {
        background-color: #1976d2;
        color: white;
    }

    .e-aiassistview.dark-theme .e-response-item {
        background-color: #404040;
        color: #e0e0e0;
    }

    .e-aiassistview.dark-theme .e-input-group {
        background-color: #1e1e1e;
        border-color: #404040 !important;
    }

    .e-aiassistview.dark-theme .e-input-group input {
        color: #ffffff;
    }
</style>
```

### Multiple Classes

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    cssClass: 'custom-border custom-shadow rounded-corners',
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

```html
<style>
    .e-aiassistview.custom-border {
        border: 2px solid #007bff;
    }

    .e-aiassistview.custom-shadow {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .e-aiassistview.rounded-corners {
        border-radius: 10px;
        overflow: hidden;
    }
</style>
```

---

## RTL Support

### Property

```typescript
enableRtl: boolean = false
```

Enable right-to-left layout for languages like Arabic, Hebrew, or Persian.

### Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';

// Set RTL locale strings (optional)
L10n.load({
    'ar-AE': {
        'aiassistview': {
            'placeholder': 'اكتب رسالتك هنا...'
        }
    }
});

const aiAssistView: AIAssistView = new AIAssistView({
    enableRtl: true,
    locale: 'ar-AE',
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('هذه استجابة تجريبية');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

### HTML

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8" />
    <title>AI AssistView - RTL</title>
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-interactive-chat/styles/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div id="aiAssistView"></div>
</body>
</html>
```

### Dynamic RTL Toggle

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableRtl: false,
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');

// Toggle RTL dynamically
document.getElementById('toggleRtl').addEventListener('click', () => {
    aiAssistView.enableRtl = !aiAssistView.enableRtl;
});
```

---

## Theme Customization

### Available Themes

Syncfusion provides 6 built-in themes:

```html
<!-- Material Theme -->
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/material3.css" rel="stylesheet" />
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-interactive-chat/styles/material3.css" rel="stylesheet" />

<!-- Bootstrap 5 Theme -->
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/bootstrap5.css" rel="stylesheet" />
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-interactive-chat/styles/bootstrap5.css" rel="stylesheet" />

<!-- Tailwind CSS Theme -->
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/tailwind.css" rel="stylesheet" />
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-interactive-chat/styles/tailwind.css" rel="stylesheet" />

<!-- Fluent Theme -->
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent.css" rel="stylesheet" />
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-interactive-chat/styles/fluent.css" rel="stylesheet" />

<!-- Fabric Theme -->
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fabric.css" rel="stylesheet" />
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-interactive-chat/styles/fabric.css" rel="stylesheet" />

<!-- High Contrast Theme -->
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/highcontrast.css" rel="stylesheet" />
<link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-interactive-chat/styles/highcontrast.css" rel="stylesheet" />
```

### Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>AI AssistView - Custom Appearance</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Syncfusion CSS -->
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-interactive-chat/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-inputs/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-buttons/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-navigations/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-notifications/styles/fluent2.css" rel="stylesheet" />
    
    <style>
        .e-aiassistview.custom-appearance {
            border: 2px solid #1976d2;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            background: linear-gradient(to bottom, #ffffff 0%, #f5f5f5 100%);
        }

        .e-aiassistview.custom-appearance .e-view-header {
            background: #1976d2;
            color: white;
            border-bottom: 2px solid #1565c0;
        }

        .e-aiassistview.custom-appearance .e-prompt-item {
            background-color: #e3f2fd;
            border-radius: 10px;
            padding: 12px;
        }

        .e-aiassistview.custom-appearance .e-response-item {
            background-color: #f5f5f5;
            border-radius: 10px;
            padding: 12px;
        }
    </style>
</head>
<body>
    <div id='container' style="height: 400px; width: 700px; margin: 20px;">
        <div id="aiAssistView"></div>
    </div>
    
    <script>
        const aiAssistView = new ej.interactivechat.AIAssistView({
            width: '100%',
            height: '100%',
            cssClass: 'custom-appearance',
            promptRequest: function(args) {
                setTimeout(function() {
                    aiAssistView.addPromptResponse('This is a custom styled response.');
                }, 1000);
            }
        });
        
        aiAssistView.appendTo('#aiAssistView');
    </script>
</body>
</html>
```

---

## Summary

**Appearance Properties:**
- `width`: Control width (string, number, or percentage)
- `height`: Control height (string, number, or percentage)
- `cssClass`: Custom CSS classes for styling
- `enableRtl`: Right-to-left layout support

**Themes:**
- Material
- Bootstrap 5
- Tailwind CSS
- Fluent
- Fabric
- High Contrast

**Use Cases:**
- Responsive layouts with percentage sizing
- Custom branded appearance with cssClass
- International apps with RTL support
- Theme matching with built-in themes
