# Tooltip Content

The Syncfusion TypeScript Tooltip supports various content strategies including plain text, HTML, templates, and dynamic content loading.

## Table of Contents
- [Plain String Content](#plain-string-content)
- [HTML Content](#html-content)
- [Template Content](#template-content)
- [Dynamic Content via beforeRender](#dynamic-content-via-beforerender)
- [Embedded Elements](#embedded-elements)
- [Updating Content Programmatically](#updating-content-programmatically)

---

## Plain String Content

The simplest content type is a plain text string:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'This is a simple tooltip',
  position: 'TopCenter'
});
tooltip.appendTo('#target');
```

---

## HTML Content

Pass an HTML string to display rich content:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: '<div class="custom-tooltip"><strong>Bold</strong> and <em>italic</em> text</div>',
  position: 'TopCenter'
});
tooltip.appendTo('#target');
```

---

## Template Content

Create tooltips using a function that returns an HTMLElement:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: () => {
    const div: HTMLElement = document.createElement('div');
    div.innerHTML = '<h4>Template Content</h4><p>Dynamically generated</p>';
    return div;
  },
  position: 'TopCenter'
});
tooltip.appendTo('#target');
```

---

## Dynamic Content via beforeRender

Load content dynamically using the `beforeRender` event:

```typescript
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  target: '.dynamic-target',
  position: 'TopCenter',
  beforeRender: (args: TooltipEventArgs) => {
    // Fetch data based on target element
    const target: HTMLElement = args.target as HTMLElement;
    const id: string = target.getAttribute('data-id') || '';
    
    // Simulate async fetch
    fetch(`/api/data/${id}`)
      .then(response => response.json())
      .then(data => {
        args.content = `<strong>${data.title}</strong><br>${data.description}`;
      });
  }
});
tooltip.appendTo('#container');
```

### Loading State with beforeRender

```typescript
import { Tooltip, TooltipEventArgs } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  target: '.info-item',
  position: 'RightCenter',
  beforeRender: (args: TooltipEventArgs) => {
    args.content = 'Loading...'; // Initial loading state
    
    // Simulate async content load
    setTimeout(() => {
      const target: HTMLElement = args.target as HTMLElement;
      const info: string = target.getAttribute('data-info') || 'No information';
      args.content = info;
      tooltip.refresh(target); // Refresh tooltip with new content
    }, 500);
  }
});
tooltip.appendTo('#container');
```

---

## Embedded Elements

Embed iframes or other HTML elements in tooltip content:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: '<iframe src="https://example.com" width="300" height="200"></iframe>',
  position: 'TopCenter',
  width: 320,
  height: 220
});
tooltip.appendTo('#target');
```

### Embedded Image

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: '<img src="preview.jpg" alt="Preview" style="max-width: 300px;" />',
  position: 'TopCenter'
});
tooltip.appendTo('#image-trigger');
```

### Embedded Form

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: `
    <div style="padding: 10px;">
      <input id="quickInput" class="e-input" placeholder="Quick input..." />
      <button class="e-btn e-primary" style="margin-top: 8px;">Submit</button>
    </div>
  `,
  position: 'BottomCenter',
  width: 250
});
tooltip.appendTo('#form-trigger');
```

---

## Updating Content Programmatically

Update tooltip content after creation using `dataBind()`:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: 'Initial content',
  position: 'TopCenter'
});
tooltip.appendTo('#target');

// Update content
function updateContent(newContent: string): void {
  tooltip.content = newContent;
  tooltip.dataBind();
}

// Usage
updateContent('Updated tooltip text');
```

### Update Based on User Action

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';
import { Button } from '@syncfusion/ej2-buttons';

let tooltip: Tooltip = new Tooltip({
  content: 'Click the button to update',
  position: 'RightCenter'
});
tooltip.appendTo('#info-icon');

let updateBtn: Button = new Button({
  content: 'Update Tooltip',
  click: () => {
    tooltip.content = `Updated at ${new Date().toLocaleTimeString()}`;
    tooltip.dataBind();
  }
});
updateBtn.appendTo('#update-btn');
```

---

## Content with Icons

Combine icons with text in tooltip content:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: '<i class="e-icons e-info" style="margin-right: 6px;"></i> Information tooltip',
  position: 'TopCenter'
});
tooltip.appendTo('#info-btn');
```

---

## Multi-line Content

Create multi-line tooltips with line breaks or lists:

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tooltip: Tooltip = new Tooltip({
  content: `
    <div>
      <strong>Features:</strong>
      <ul style="margin: 4px 0 0 16px; padding: 0;">
        <li>Easy to use</li>
        <li>Customizable</li>
        <li>Accessible</li>
      </ul>
    </div>
  `,
  position: 'RightCenter',
  width: 200
});
tooltip.appendTo('#feature-btn');
```

---

## API Reference

| Property | Type | Description |
|----------|------|-------------|
| `content` | `string \| HTMLElement \| Function` | Tooltip content |
| `beforeRender` | `Event` | Triggered before tooltip renders (for dynamic content) |

For complete API details, see [tooltip-api.md](./tooltip-api.md).
