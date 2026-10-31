# Style and Appearance

## Table of Contents
- [CSS Selectors Reference](#css-selectors-reference)
- [Custom Fonts](#custom-fonts)
- [Globalization (RTL and Localization)](#globalization-rtl-and-localization)
- [Style Encapsulation (Shadow DOM)](#style-encapsulation-shadow-dom)
- [Spell and Grammar Check (WProofreader)](#spell-and-grammar-check-wproofreader)
- [Tailwind Preflight Fix](#tailwind-preflight-fix)

---

## CSS Selectors Reference

### Placeholder

```css
.e-richtexteditor .e-rte-placeholder {
  color: #aaa;
  font-style: italic;
  font-family: monospace;
}
```

### Content area (font, background, color)

```css
/* Font family and size */
.e-richtexteditor .e-rte-content .e-content,
.e-richtexteditor .e-source-content .e-content {
  font-size: 16px;
  font-family: 'Segoe UI', sans-serif;
}

/* Background and text color */
.e-richtexteditor .e-rte-content,
.e-richtexteditor .e-source-content {
  background: #fafafa;
  color: #333;
}
```

### Toolbar icons and buttons

```css
/* Toolbar icon color */
.e-richtexteditor .e-rte-toolbar .e-toolbar-item .e-icons,
.e-richtexteditor .e-rte-toolbar .e-toolbar-item .e-icons:active {
  color: #005fcc;
}

/* Toolbar button font */
.e-toolbar .e-tbar-btn,
.e-toolbar .e-tbar-btn:hover {
  font-family: 'Segoe UI', sans-serif;
}
```

### Editor border and height

```css
.e-richtexteditor {
  border: 1px solid #ccc;
  border-radius: 4px;
}
```

### Rendered content outside editor

Apply these styles to a container when displaying editor output:

```css
.e-rte-content p { margin: 0 0 10px; }
.e-rte-content li { margin-bottom: 6px; }
.e-rte-content h1 { font-size: 2em; font-weight: 600; margin: 12px 0; }
.e-rte-content h2 { font-size: 1.5em; font-weight: 600; margin: 10px 0; }
.e-rte-content blockquote { border-left: 3px solid #999; padding-left: 12px; color: #555; }
.e-rte-content a { color: #005fcc; }
.e-rte-content a:hover { text-decoration: underline; }
.e-rte-content .e-rte-table { border-collapse: collapse; }
.e-rte-content .e-rte-table td,
.e-rte-content .e-rte-table th { border: 1px solid #ddd; padding: 4px 8px; }
```

---

## Custom Fonts

Add custom font names to the font picker dropdown:

```typescript
const editor = new RichTextEditor({
  toolbarSettings: {
    items: ['FontName', 'FontSize']
  },
  fontFamily: {
    default: 'Segoe UI',
    items: [
      { text: 'Segoe UI', value: 'Segoe UI,sans-serif' },
      { text: 'Roboto', value: 'Roboto,sans-serif' },
      { text: 'Raleway', value: 'Raleway,sans-serif' },
      { text: 'Monospace', value: 'monospace' }
    ]
  }
});
```

Load Google Fonts in HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto&family=Raleway&display=swap" rel="stylesheet" />
```

---

## Globalization (RTL and Localization)

### Right-to-Left (RTL) layout

```typescript
import { enableRtl } from '@syncfusion/ej2-base';
enableRtl(true);   // Enable RTL globally

// Or per-component:
const editor = new RichTextEditor({
  enableRtl: true
});
```

### Localization (locale strings)

```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
  'ar': {
    'rich-text-editor': {
      'alignments': 'محاذاة',
      'justifyLeft': 'محاذاة إلى اليسار',
      'justifyCenter': 'توسيط',
      'justifyRight': 'محاذاة إلى اليمين',
      'bold': 'عريض',
      'italic': 'مائل',
      'underline': 'تسطير'
      // ...more strings
    }
  }
});

const editor = new RichTextEditor({
  locale: 'ar',
  enableRtl: true
});
```

---

## Style Encapsulation (Shadow DOM)

When using the RTE inside a Shadow DOM (e.g., a web component), inject styles into the shadow root manually:

```typescript
const editor = new RichTextEditor({
  // Enable style encapsulation for Shadow DOM support
  enableHtmlSanitizer: true
});

// After render, inject necessary CSS into shadow host
const shadowRoot = document.querySelector('my-component').shadowRoot;
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'path/to/ej2-richtexteditor/styles/tailwind3.css';
shadowRoot.appendChild(link);
```

---

## Spell and Grammar Check (WProofreader)

Integrates the third-party [WProofreader](https://webspellchecker.com) SDK:

```bash
npm install @webspellchecker/wproofreader-sdk-js
```

```typescript
import WProofreader from '@webspellchecker/wproofreader-sdk-js';

const editor = new RichTextEditor({});
editor.appendTo('#editor');

// After editor renders, attach WProofreader
editor.created = () => {
  WProofreader.init({
    container: editor.inputElement,  // the contenteditable element
    lang: 'en_US',
    serviceId: 'YOUR_SERVICE_ID'
  });
};
```

**Key features of WProofreader:**
- Real-time spell checking as user types
- Grammar checking
- Multilingual support
- Custom dictionary management

---

## Tailwind Preflight Fix

When using Tailwind CSS with `preflight` enabled, Tailwind's base reset conflicts with RTE's default styles. Fix this by adding the following override in your CSS:

```css
/* Override Tailwind base resets for RTE content */
.e-richtexteditor .e-rte-content .e-content ul {
  list-style: disc;
  padding-left: 2em;
}
.e-richtexteditor .e-rte-content .e-content ol {
  list-style: decimal;
  padding-left: 2em;
}
.e-richtexteditor .e-rte-content .e-content img {
  max-width: unset;
  height: unset;
}
.e-richtexteditor .e-rte-content .e-content h1,
.e-richtexteditor .e-rte-content .e-content h2,
.e-richtexteditor .e-rte-content .e-content h3 {
  font-size: revert;
  font-weight: revert;
}
```
