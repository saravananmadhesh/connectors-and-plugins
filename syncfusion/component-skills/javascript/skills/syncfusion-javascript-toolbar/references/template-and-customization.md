# Templates and Customization in Syncfusion TypeScript Toolbar

## Table of Contents
- [HTML Template Rendering](#html-template-rendering)
- [Item-Level Templates](#item-level-templates)
- [CSS Class Customization](#css-class-customization)
- [Custom Styling](#custom-styling)
- [Button Text Mode](#button-text-mode)
- [Priority Configuration](#priority-configuration)
- [Integrate Menu Component](#integrate-menu-component)
- [HTML Attributes & Security](#html-attributes--security)

## HTML Template Rendering

The Toolbar can be rendered from an HTML template element instead of defining items in code. This allows declarative toolbar structure.

### HTML Template Structure

```html
<div id='template_toolbar'>   <!-- Root Toolbar Element -->
    <div>                      <!-- Toolbar Items Container -->
        <div>Cut</div>        <!-- Toolbar Item Element -->
        <div>Copy</div>
        <div>Paste</div>
    </div>
</div>
```

### Template-Based Initialization

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

// Initialize from HTML element with 'target' property
let toolbar: Toolbar = new Toolbar();
toolbar.appendTo('#template_toolbar');
```

HTML:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Toolbar from Template</title>
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='template_toolbar'>
        <div>
            <div>Cut</div>
            <div>Copy</div>
            <div>Paste</div>
            <div class='e-separator'></div>
            <div>Bold</div>
            <div>Italic</div>
            <div>Underline</div>
        </div>
    </div>
    
    <script src="app.js"></script>
</body>
</html>
```

### Template with Icons and Attributes

```html
<div id='template_toolbar'>
    <div>
        <div>
            <button class="e-btn e-tbar-btn" title="Cut">
                <i class="e-icons e-cut-icon"></i>
            </button>
        </div>
        <div>
            <button class="e-btn e-tbar-btn" title="Copy">
                <i class="e-icons e-copy-icon"></i>
            </button>
        </div>
        <div>
            <button class="e-btn e-tbar-btn" title="Paste">
                <i class="e-icons e-paste-icon"></i>
            </button>
        </div>
    </div>
</div>
```

## Item-Level Templates

The `template` property on individual items allows custom HTML rendering for specific toolbar items.

### Custom Button Template

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        { 
            template: '<button class="e-btn e-tbar-btn"><span>Cut</span></button>' 
        },
        { 
            template: '<button class="e-btn e-tbar-btn"><span>Copy</span></button>' 
        },
        { type: 'Separator' },
        {
            template: '<button class="e-btn e-tbar-btn" style="background: #4CAF50; color: white;"><span>Save</span></button>'
        }
    ]
});

toolbar.appendTo('#element');
```

### Custom Dropdown Template

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        {
            template: 
                '<select class="form-control" style="width: 150px;">' +
                    '<option>Select...</option>' +
                    '<option>Option 1</option>' +
                    '<option>Option 2</option>' +
                    '<option>Option 3</option>' +
                '</select>'
        },
        { type: 'Separator' },
        { text: 'Apply' }
    ]
});

toolbar.appendTo('#element');
```

### Custom HTML with Icons

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        {
            template: 
                '<button class="e-btn e-tbar-btn">' +
                    '<i class="fa fa-cut" style="font-size: 16px;"></i>' +
                    '<span style="margin-left: 5px;">Cut</span>' +
                '</button>'
        },
        {
            template:
                '<button class="e-btn e-tbar-btn">' +
                    '<i class="fa fa-copy" style="font-size: 16px;"></i>' +
                    '<span style="margin-left: 5px;">Copy</span>' +
                '</button>'
        }
    ]
});

toolbar.appendTo('#element');
```

### Responsive Dropdown with Template

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let formaData: string[] = ['PDF', 'Word', 'Excel', 'PowerPoint'];

let toolbar: Toolbar = new Toolbar({
    created: function() {
        // Initialize custom components after toolbar creation
        new DropDownList({
            dataSource: formaData,
            className: 'format-dropdown'
        }).appendTo('.format-select');
    },
    items: [
        { text: 'Export As:' },
        {
            template: 
                '<select class="format-select" style="width: 120px;">' +
                    '<option>Select Format</option>' +
                    '<option>PDF</option>' +
                    '<option>Word</option>' +
                    '<option>Excel</option>' +
                '</select>'
        }
    ]
});

toolbar.appendTo('#element');
```

## CSS Class Customization

Apply Syncfusion CSS classes to style toolbar elements without code customization.

### Toolbar-Level CSS Classes

| Class | Purpose |
|-------|---------|
| `.e-toolbar` | Main toolbar container |
| `.e-toolbar-item` | Individual toolbar item |
| `.e-tbar-btn` | Toolbar button |
| `.e-tbar-btn-text` | Button text |
| `.e-icons` | Icon element |

### Override CSS Classes

```scss
// Customize toolbar appearance
.e-toolbar {
    border: 5px solid rgb(173, 255, 47);
    background-color: #f5f5f5;
}

// Customize toolbar items
.e-toolbar .e-toolbar-item {
    background: #add8e6;
    border: 1px solid #5a70cc;
    padding: 8px 12px;
}

// Customize buttons
.e-toolbar .e-tbar-btn {
    background: #add8e6;
    border: 1px solid #5a70cc;
    border-radius: 4px;
}

// Customize icons
.e-toolbar .e-tbar-btn .e-icons {
    background: #185655;
    color: #d7f9d4;
    font-size: 16px;
}

// Customize button text
.e-toolbar .e-tbar-btn-text {
    font-weight: 600;
    color: #333;
}
```

## Custom Styling

### Inline Styling with Templates

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        {
            template:
                '<button class="e-btn e-tbar-btn" style="background: linear-gradient(to right, #ff6b6b, #ee5a52); color: white; border: none;">' +
                    '<span>Delete</span>' +
                '</button>'
        },
        {
            template:
                '<button class="e-btn e-tbar-btn" style="background: linear-gradient(to right, #51cf66, #37b24d); color: white; border: none;">' +
                    '<span>Save</span>' +
                '</button>'
        }
    ]
});

toolbar.appendTo('#element');
```

### Theme Integration

```css
/* Fluent2 Theme - Default Colors */
.e-toolbar {
    background: #ffffff;
    border-bottom: 1px solid #e0e0e0;
}

.e-toolbar .e-tbar-btn {
    color: #333;
}

.e-toolbar .e-tbar-btn:hover {
    background-color: #f0f0f0;
}

.e-toolbar .e-tbar-btn:active {
    background-color: #d0d0d0;
}

/* Bootstrap 5 Theme - Alternative */
.e-bootstrap5 .e-toolbar {
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
}

.e-bootstrap5 .e-tbar-btn {
    color: #212529;
}
```

### Advanced Styling with Variables

```css
:root {
    --toolbar-bg: #ffffff;
    --toolbar-border: 1px solid #e0e0e0;
    --btn-text-color: #333333;
    --btn-hover-bg: #f0f0f0;
    --btn-active-bg: #d0d0d0;
    --icon-color: #666666;
}

.e-toolbar {
    background: var(--toolbar-bg);
    border-bottom: var(--toolbar-border);
}

.e-toolbar .e-tbar-btn {
    color: var(--btn-text-color);
}

.e-toolbar .e-tbar-btn:hover {
    background-color: var(--btn-hover-bg);
}

.e-toolbar .e-tbar-btn:active {
    background-color: var(--btn-active-bg);
}

.e-toolbar .e-icons {
    color: var(--icon-color);
}
```

### Responsive Styling

```css
/* Desktop - Full size */
@media (min-width: 768px) {
    .e-toolbar {
        padding: 12px 20px;
    }
    
    .e-tbar-btn {
        min-width: 80px;
        padding: 8px 16px;
    }
}

/* Tablet - Medium */
@media (max-width: 768px) {
    .e-toolbar {
        padding: 8px 12px;
    }
    
    .e-tbar-btn {
        min-width: 60px;
        padding: 6px 10px;
        font-size: 13px;
    }
}

/* Mobile - Compact */
@media (max-width: 480px) {
    .e-toolbar {
        padding: 6px 8px;
    }
    
    .e-tbar-btn {
        min-width: auto;
        padding: 4px 8px;
        font-size: 12px;
    }
    
    .e-tbar-btn-text {
        display: none;  /* Hide text, show icons only */
    }
}
```

### Dark Mode Styling

```css
/* Light Mode (Default) */
.e-toolbar {
    background: #ffffff;
    color: #333333;
}

.e-toolbar .e-tbar-btn {
    background: #f5f5f5;
    color: #333333;
}

/* Dark Mode */
.dark-mode .e-toolbar {
    background: #1e1e1e;
    color: #ffffff;
}

.dark-mode .e-toolbar .e-tbar-btn {
    background: #2e2e2e;
    color: #ffffff;
}

.dark-mode .e-toolbar .e-tbar-btn:hover {
    background: #3e3e3e;
}
```

### Material Design Styling

```css
/* Material Design */
.e-toolbar {
    background: #2196F3;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.e-toolbar .e-tbar-btn {
    color: #ffffff;
    background: transparent;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.5px;
}

.e-toolbar .e-tbar-btn:hover {
    background: rgba(255, 255, 255, 0.1);
}

.e-toolbar .e-tbar-btn:active {
    background: rgba(255, 255, 255, 0.2);
}
```

---

## Button Text Mode

The `showTextOn` property controls where button text is displayed (Toolbar, Popup, or Both) for optimal space usage.

### Text Mode Configuration

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    width: 280,
    overflowMode: 'Popup',
    items: [
        { 
            text: 'Cut', 
            prefixIcon: 'e-cut-icon tb-icons',
            showTextOn: 'Toolbar'  // Text only on toolbar
        },
        { 
            text: 'Copy', 
            prefixIcon: 'e-copy-icon tb-icons',
            showTextOn: 'Popup'    // Text only in popup
        },
        { 
            text: 'Paste', 
            prefixIcon: 'e-paste-icon tb-icons',
            showTextOn: 'Both'     // Text on both toolbar and popup
        }
    ]
});

toolbar.appendTo('#element');
```

### CSS Classes for Text Mode

```html
<!-- Icon only on toolbar, text in popup -->
<div class='e-overflow-show e-popup-text'>
    <button class='e-btn e-tbar-btn'>
        <span class="e-cut-icon tb-icons e-icons"></span>
        <span>Cut</span>
    </button>
</div>

<!-- Text on toolbar, hidden in popup -->
<div class='e-overflow-show e-toolbar-text'>
    <button class='e-btn e-tbar-btn'>
        <span class="e-copy-icon tb-icons e-icons"></span>
        <span>Copy</span>
    </button>
</div>
```

| showTextOn Value | Description |
|-----------------|-------------|
| `Toolbar` | Show text only on main toolbar |
| `Popup` | Show text only in popup dropdown |
| `Both` | Show text in both locations |

## Priority Configuration

Control which items display on toolbar vs. popup using the `overflow` property.

### Overflow Priority Levels

```typescript
let toolbar: Toolbar = new Toolbar({
    width: 400,
    overflowMode: 'Popup',
    items: [
        { 
            text: 'Cut', 
            prefixIcon: 'e-cut-icon tb-icons',
            overflow: 'Show'   // Always on toolbar
        },
        { 
            text: 'Paste', 
            prefixIcon: 'e-paste-icon tb-icons'
            // overflow: 'None' (default)
        },
        { 
            text: 'Bold', 
            prefixIcon: 'e-bold-icon tb-icons',
            overflow: 'Hide'   // Always in popup
        }
    ]
});

toolbar.appendTo('#element');
```

| Overflow Property | Description |
|------------------|-------------|
| `Show` | Primary priority - always on toolbar |
| `Hide` | Secondary priority - always in popup |
| `None` | Standard priority (default) |

## Integrate Menu Component

Integrate a Menu component as a toolbar item using the `template` property for advanced navigation menus.

### Menu Integration Pattern

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';

let menuItems: MenuItemModel[] = [
    {
        text: 'File',
        items: [
            { text: 'New' },
            { text: 'Open' },
            { text: 'Save' }
        ]
    },
    {
        text: 'Edit',
        items: [
            { text: 'Cut' },
            { text: 'Copy' },
            { text: 'Paste' }
        ]
    }
];

let toolbar: Toolbar = new Toolbar({
    items: [
        { 
            template: '<ul id="menu"></ul>'
        },
        { type: 'Separator' },
        { text: 'Settings' }
    ],
    created: () => {
        // Initialize Menu after toolbar creation
        new Menu({
            items: menuItems
        }).appendTo('#menu');
    }
});

toolbar.appendTo('#element');
```

### Multi-Level Menu in Toolbar

```typescript
let advancedMenuItems: MenuItemModel[] = [
    {
        text: 'Products',
        items: [
            {
                text: 'Electronics',
                items: [
                    { text: 'Laptops' },
                    { text: 'Mobile Phones' }
                ]
            },
            {
                text: 'Accessories',
                items: [
                    { text: 'Chargers' },
                    { text: 'Cables' }
                ]
            }
        ]
    }
];

new Menu({
    items: advancedMenuItems
}).appendTo('#navigation-menu');
```

## HTML Attributes & Security

Use the `htmlAttributes` property to add custom HTML attributes to toolbar items. **Important:** Always enable `enableHtmlSanitizer` when using user-provided content to prevent Cross-Site Scripting (XSS) attacks.

### HTML Attributes Basics

The `htmlAttributes` property accepts an object of key-value pairs for custom HTML attributes:

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        {
            text: 'Save',
            prefixIcon: 'e-save-icon tb-icons',
            htmlAttributes: {
                'data-action': 'save-document',
                'data-shortcut': 'Ctrl+S',
                'aria-label': 'Save the current document'
            }
        },
        {
            text: 'Delete',
            prefixIcon: 'e-delete-icon tb-icons',
            htmlAttributes: {
                'data-confirm': 'true',
                'data-message': 'Are you sure?',
                'aria-label': 'Delete selected items'
            }
        }
    ]
});

toolbar.appendTo('#element');
```

### Custom Styling with htmlAttributes

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        {
            text: 'Highlight',
            htmlAttributes: {
                'style': 'background-color: #fff3cd; border-radius: 4px;',
                'class': 'custom-highlight-btn'
            }
        },
        {
            text: 'Alert',
            htmlAttributes: {
                'data-bs-toggle': 'tooltip',
                'title': 'Click to show alert',
                'style': 'color: #dc3545;'
            }
        }
    ]
});

toolbar.appendTo('#element');
```

### Data Attributes for Tracking

```typescript
let toolbar: Toolbar = new Toolbar({
    clicked: (args) => {
        // Access data attributes from the clicked item
        const actionData = args.item.htmlAttributes?.['data-action'];
        const shortcut = args.item.htmlAttributes?.['data-shortcut'];
        
        console.log(`Action: ${actionData}, Shortcut: ${shortcut}`);
    },
    items: [
        {
            text: 'Analytics',
            htmlAttributes: {
                'data-action': 'open-analytics',
                'data-module': 'reporting',
                'data-track': 'true'
            }
        }
    ]
});

toolbar.appendTo('#element');
```

### HTML Sanitizer - Preventing XSS Attacks

**CRITICAL SECURITY ISSUE:** If you use user-provided content in toolbar templates or HTML attributes, **always enable `enableHtmlSanitizer: true`** to prevent XSS (Cross-Site Scripting) attacks.

### Unsafe Usage (DO NOT USE)

```typescript
// VULNERABLE: Never use unsanitized user input directly
let userInput = getUserInput();  // e.g., "<img src=x onerror='alert(\"XSS\")'>"

let toolbar: Toolbar = new Toolbar({
    enableHtmlSanitizer: false,  // DANGEROUS!
    items: [
        {
            template: userInput  // XSS VULNERABILITY!
        }
    ]
});

toolbar.appendTo('#element');
// Result: Malicious script executes in user's browser!
```

### Safe Usage (RECOMMENDED)

```typescript
// SAFE: Enable HTML sanitizer for user content
let userInput = getUserInput();

let toolbar: Toolbar = new Toolbar({
    enableHtmlSanitizer: true,   // PROTECT AGAINST XSS
    items: [
        {
            template: userInput  // User input is sanitized
        }
    ]
});

toolbar.appendTo('#element');
// Result: Malicious scripts are removed; safe HTML is preserved
```

### enableHtmlSanitizer Configuration

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    enableHtmlSanitizer: true,  // Enable XSS protection
    items: [
        {
            text: 'Insert',
            template: `<input type="text" placeholder="User enters text here" />`
        },
        {
            id: 'user-content',
            template: getUserProvidedContent()  // Safe due to sanitizer
        }
    ]
});

toolbar.appendTo('#element');

function getUserProvidedContent(): string {
    const userText = document.getElementById('userInput').value;
    // Even if userText contains "<script>alert('XSS')</script>",
    // the sanitizer will remove dangerous elements
    return `<div class="user-message">${userText}</div>`;
}
```

### HTML Sanitizer - What Gets Removed

When `enableHtmlSanitizer: true`, the following dangerous content is removed:

| Type | Examples | Why Removed |
|------|----------|-----------|
| **Script Tags** | `<script>alert('XSS')</script>` | Execute arbitrary JavaScript |
| **Event Handlers** | `onclick="malicious()"`, `onerror="hack()"` | Execute JavaScript on events |
| **Dangerous Attributes** | `on*` attributes (onclick, onload, etc.) | Execute JavaScript |
| **Iframe Tags** | `<iframe src="evil.com"></iframe>` | Load external malicious content |
| **Form Tags** | `<form action="evil.com"></form>` | Submit data to attacker |
| **Meta Refresh** | `<meta http-equiv="refresh">` | Redirect to malicious site |

### HTML Sanitizer - What Gets Preserved

Safe HTML elements and attributes are preserved:

```typescript
let toolbar: Toolbar = new Toolbar({
    enableHtmlSanitizer: true,
    items: [
        {
            template: `
                <div class="safe-content">
                    <strong>Bold Text</strong> - Preserved
                    <em>Italic Text</em> - Preserved
                    <a href="url">Link</a> - Link preserved (URL validated)
                    <img src="/images/icon.png" alt="Safe icon" /> - Images preserved (URL validated)
                    <ul><li>List item</li></ul> - Lists preserved
                    <table><tr><td>Cell</td></tr></table> - Tables preserved
                </div>
            `
        }
    ]
});

toolbar.appendTo('#element');
```

### Real-World Security Example

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';

// User edits toolbar item
function handleEditComment(itemText: string) {
    let editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.value = itemText;
    
    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.onclick = () => {
        const newText = editInput.value;  // User input
        
        // Create updated toolbar with sanitizer enabled
        let updatedToolbar: Toolbar = new Toolbar({
            enableHtmlSanitizer: true,  // CRITICAL: Sanitize before rendering
            items: [
                {
                    id: 'safe-item',
                    text: sanitizeUserInput(newText),  // Double protection
                    htmlAttributes: {
                        'data-user-edited': 'true',
                        'title': newText  // Also sanitized
                    }
                }
            ]
        });
        
        updatedToolbar.appendTo('#element');
    };
}

// Helper: Sanitize user input manually (extra layer)
function sanitizeUserInput(input: string): string {
    const temp = document.createElement('div');
    temp.textContent = input; // textContent escapes HTML
    return temp.innerHTML;    // Convert back to safe HTML
}
```

### Security Best Practices

1. **Always Enable Sanitizer:**
   ```typescript
   enableHtmlSanitizer: true  // Default should be true for user content
   ```

2. **Escape User Input:**
   ```typescript
   const safe = htmlEncode(userInput);  // Convert "<" to "&lt;"
   ```

3. **Validate URLs:**
   ```typescript
   htmlAttributes: {
       'href': isValidUrl(userUrl) ? userUrl : '#'
   }
   ```

4. **Use Content Security Policy (CSP):**
   Add to your HTML `<head>`:
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self'">
   ```

5. **Never Disable Sanitizer for User Content:**
   ```typescript
   // WRONG for user data
   enableHtmlSanitizer: false
   
   // CORRECT for user data
   enableHtmlSanitizer: true
   ```

---

**Key Takeaways:**
- Use HTML templates for declarative toolbar structure
- Use `template` property for custom item rendering
- Apply CSS classes to override default styling
- Use CSS variables for consistent theming
- Leverage media queries for responsive design
- Support dark mode with CSS class switching
- Control text display with `showTextOn` property
- Manage overflow with `overflow` property for priority control
- Integrate Menu components for advanced navigation structures
