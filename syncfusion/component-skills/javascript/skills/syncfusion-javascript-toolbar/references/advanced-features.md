# Advanced Features in Syncfusion TypeScript Toolbar

## Table of Contents
- [Font Awesome Icon Integration](#font-awesome-icon-integration)
- [Tooltip Configuration](#tooltip-configuration)
- [RTL Support](#rtl-support)
- [Keyboard Navigation](#keyboard-navigation)
- [Links in Toolbar Items](#links-in-toolbar-items)
- [Multi-Row Layouts](#multi-row-layouts)

## Font Awesome Icon Integration

Use third-party icons (Font Awesome) instead of Syncfusion icons for modern icon libraries.

### Font Awesome Integration Steps

1. **Include Font Awesome CDN in HTML:**

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Font Awesome CDN -->
    <link rel="stylesheet" href="url" />
    <!-- Syncfusion CSS -->
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id="element"></div>
</body>
</html>
```

2. **Use Font Awesome icon classes in Toolbar:**

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        { prefixIcon: 'fa fa-twitter', text: 'Twitter' },
        { prefixIcon: 'fa fa-facebook', text: 'Facebook' },
        { prefixIcon: 'fa fa-whatsapp', text: 'WhatsApp' },
        { prefixIcon: 'fa fa-linkedin', text: 'LinkedIn' },
        { prefixIcon: 'fa fa-github', text: 'GitHub' }
    ]
});

toolbar.appendTo('#element');
```

### Font Awesome Icon Examples

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { prefixIcon: 'fa fa-home', text: 'Home' },
        { prefixIcon: 'fa fa-search', text: 'Search' },
        { prefixIcon: 'fa fa-user', text: 'Profile' },
        { type: 'Separator' },
        { prefixIcon: 'fa fa-bell', text: 'Notifications' },
        { prefixIcon: 'fa fa-envelope', text: 'Messages' },
        { prefixIcon: 'fa fa-cog', text: 'Settings' }
    ]
});

toolbar.appendTo('#element');
```

### Custom Icon Styling

```css
/* Customize Font Awesome icon appearance */
.e-toolbar .e-icons {
    color: #e3165b !important;
    font-size: 16px !important;
}

.e-toolbar .e-btn .e-icons.e-btn-icon {
    font-size: 14px !important;
}

/* Specific icon styling */
.e-toolbar .fa-twitter {
    color: #1DA1F2;
}

.e-toolbar .fa-facebook {
    color: #4267B2;
}

.e-toolbar .fa-whatsapp {
    color: #25D366;
}
```

## Tooltip Configuration

Add helpful hint text that displays on mouse hover using the `tooltipText` property.

### Basic Tooltip

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut', tooltipText: 'Cut (Ctrl+X)', prefixIcon: 'e-cut-icon tb-icons' },
        { text: 'Copy', tooltipText: 'Copy (Ctrl+C)', prefixIcon: 'e-copy-icon tb-icons' },
        { text: 'Paste', tooltipText: 'Paste (Ctrl+V)', prefixIcon: 'e-paste-icon tb-icons' },
        { type: 'Separator' },
        { text: 'Undo', tooltipText: 'Undo (Ctrl+Z)', prefixIcon: 'e-undo-icon tb-icons' },
        { text: 'Redo', tooltipText: 'Redo (Ctrl+Y)', prefixIcon: 'e-redo-icon tb-icons' }
    ]
});

toolbar.appendTo('#element');
```

### Using Syncfusion Tooltip Component

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { Tooltip } from '@syncfusion/ej2-popups';

let toolbar: Toolbar = new Toolbar({
    width: 300,
    items: [
        { text: 'Cut', tooltipText: 'Remove selected content to clipboard' },
        { text: 'Copy', tooltipText: 'Duplicate selected content to clipboard' },
        { text: 'Paste', tooltipText: 'Insert clipboard content' },
        { type: 'Separator' },
        { text: 'Undo', tooltipText: 'Revert last action' },
        { text: 'Redo', tooltipText: 'Apply last undone action' }
    ]
});

toolbar.appendTo('#element');

// Initialize Tooltip for all toolbar items
let tooltip: Tooltip = new Tooltip({
    target: '#element [title]'
});
tooltip.appendTo('#tooltipContainer');
```

### Rich Tooltip with HTML Content

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        { 
            text: 'Save',
            tooltipText: '<b>Save Document</b><br/><small>Save changes to file</small><br/>Shortcut: Ctrl+S'
        },
        { 
            text: 'Print',
            tooltipText: '<b>Print</b><br/><small>Output to printer</small><br/>Shortcut: Ctrl+P'
        },
        { 
            text: 'Export',
            tooltipText: '<b>Export As</b><br/><small>Available: PDF, Word, Excel</small><br/>Shortcut: Ctrl+E'
        }
    ]
});

toolbar.appendTo('#element');
```

## RTL Support

Enable right-to-left layout for languages like Arabic and Hebrew.

### Enable RTL

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    enableRtl: true,  // Enable RTL mode
    items: [
        { text: 'حفظ', prefixIcon: 'e-save-icon tb-icons' },  // Save in Arabic
        { text: 'نسخ', prefixIcon: 'e-copy-icon tb-icons' },  // Copy in Arabic
        { text: 'لصق', prefixIcon: 'e-paste-icon tb-icons' }, // Paste in Arabic
        { type: 'Separator' },
        { text: 'تراجع', prefixIcon: 'e-undo-icon tb-icons' },  // Undo in Arabic
        { text: 'إعادة', prefixIcon: 'e-redo-icon tb-icons' }  // Redo in Arabic
    ]
});

toolbar.appendTo('#element');
```

### RTL in HTML

```html
<!DOCTYPE html>
<html dir="rtl">  <!-- Set RTL at document level -->
<head>
    <meta charset="utf-8" />
    <title>RTL Toolbar</title>
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id="element"></div>
    <script src="app.js"></script>
</body>
</html>
```

### RTL with Responsive Design

```typescript
let toolbar: Toolbar = new Toolbar({
    enableRtl: document.documentElement.dir === 'rtl',
    items: [
        { text: 'الصفحة الرئيسية', align: 'Left' },
        { text: 'حول', align: 'Left' },
        { text: 'اتصل بنا', align: 'Right' }
    ]
});

toolbar.appendTo('#element');
```

## Keyboard Navigation

Enable users to navigate and interact with toolbar using keyboard shortcuts.

### Tab Key Navigation Setup

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'File', tabIndex: 1 },      // First in tab order
        { text: 'Edit', tabIndex: 2 },      // Second
        { text: 'View', tabIndex: 3 },      // Third
        { type: 'Separator' },
        { text: 'Help', tabIndex: 4 }       // Fourth
    ]
});

toolbar.appendTo('#element');

// Users can: Tab to cycle through items, Shift+Tab to go backward
```

### Arrow Key Navigation

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut', tabIndex: 1 },
        { text: 'Copy', tabIndex: 1 },
        { text: 'Paste', tabIndex: 1 },
        { type: 'Separator' },
        { text: 'Undo', tabIndex: 1 },
        { text: 'Redo', tabIndex: 1 }
    ]
});

toolbar.appendTo('#element');

// Arrow keys navigate items automatically within the toolbar
```

### Custom Keyboard Shortcuts

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';

const keyboardShortcuts: { [key: string]: Function } = {
    'Ctrl+X': () => console.log('Cut shortcut'),
    'Ctrl+C': () => console.log('Copy shortcut'),
    'Ctrl+V': () => console.log('Paste shortcut'),
    'Ctrl+Z': () => console.log('Undo shortcut'),
    'Ctrl+Y': () => console.log('Redo shortcut')
};

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut', tabIndex: 0 },
        { text: 'Copy', tabIndex: 0 },
        { text: 'Paste', tabIndex: 0 },
        { type: 'Separator' },
        { text: 'Undo', tabIndex: 0 },
        { text: 'Redo', tabIndex: 0 }
    ]
});

toolbar.appendTo('#element');

// Attach keyboard listener
document.addEventListener('keydown', (e) => {
    const key = `${e.ctrlKey ? 'Ctrl+' : ''}${e.key.toUpperCase()}`;
    if (keyboardShortcuts[key]) {
        e.preventDefault();
        keyboardShortcuts[key]();
    }
});
```

## Links in Toolbar Items

Add hyperlink functionality to toolbar items.

### Link Button with URL

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        { 
            template: '<a class="e-btn e-tbar-btn" href="url" target="_blank">Visit Site</a>'
        },
        { 
            template: '<a class="e-btn e-tbar-btn" href="/docs" target="_blank">Documentation</a>'
        },
        { 
            template: '<a class="e-btn e-tbar-btn" href="/support">Support</a>'
        }
    ]
});

toolbar.appendTo('#element');
```

### Link Button with Icon

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        {
            template:
                '<a class="e-btn e-tbar-btn" href="url" target="_blank">' +
                    '<i class="fa fa-github" style="margin-right: 5px;"></i>' +
                    '<span>GitHub</span>' +
                '</a>'
        },
        {
            template:
                '<a class="e-btn e-tbar-btn" href="url" target="_blank">' +
                    '<i class="fa fa-twitter" style="margin-right: 5px;"></i>' +
                    '<span>Twitter</span>' +
                '</a>'
        }
    ]
});

toolbar.appendTo('#element');
```

### Programmatic Link Navigation

```typescript
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    clicked: (args: ClickEventArgs) => {
        if (args.item.id === 'docs-link') {
            window.location.href = '/documentation';
        } else if (args.item.id === 'support-link') {
            window.open('/support', '_blank');
        }
    },
    items: [
        { id: 'docs-link', text: 'Documentation', prefixIcon: 'e-icons e-book' },
        { id: 'support-link', text: 'Support', prefixIcon: 'e-icons e-help' }
    ]
});

toolbar.appendTo('#element');
```

## Multi-Row Layouts

Create multi-row or multi-level toolbar layouts for complex interfaces.

### Horizontal Toolbar Rows

```html
<div id="toolbar-container">
    <div id="toolbar1"></div>
    <div id="toolbar2"></div>
</div>

<style>
    #toolbar-container {
        border: 1px solid #ddd;
    }
    
    #toolbar1, #toolbar2 {
        border-bottom: 1px solid #ddd;
    }
    
    #toolbar2 {
        border-bottom: none;
    }
</style>
```

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';

// First toolbar row
let toolbar1: Toolbar = new Toolbar({
    items: [
        { text: 'File', prefixIcon: 'e-folder-open-icon tb-icons' },
        { text: 'Edit', prefixIcon: 'e-edit-icon tb-icons' },
        { text: 'View', prefixIcon: 'e-eye-icon tb-icons' }
    ]
});
toolbar1.appendTo('#toolbar1');

// Second toolbar row
let toolbar2: Toolbar = new Toolbar({
    items: [
        { text: 'Bold', prefixIcon: 'e-bold-icon tb-icons' },
        { text: 'Italic', prefixIcon: 'e-italic-icon tb-icons' },
        { text: 'Underline', prefixIcon: 'e-underline-icon tb-icons' },
        { type: 'Separator' },
        { text: 'Font Size', align: 'Right' }
    ]
});
toolbar2.appendTo('#toolbar2');
```

### Nested Dropdown Toolbar

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { DropDownMenu } from '@syncfusion/ej2-splitbuttons';

let toolbar: Toolbar = new Toolbar({
    items: [
        {
            template:
                '<div id="menu">' +
                    '<button id="dropdown-btn">File</button>' +
                '</div>'
        },
        { text: 'Edit' },
        { text: 'View' }
    ],
    created: () => {
        // Initialize dropdown after toolbar creation
        new DropDownMenu({
            items: [
                { text: 'New' },
                { text: 'Open' },
                { text: 'Save' },
                { text: 'Save As' }
            ]
        }).appendTo('#dropdown-btn');
    }
});

toolbar.appendTo('#element');
```

---

**Key Takeaways:**
- Use Font Awesome for modern icon libraries
- Add tooltips for user guidance
- Enable RTL for international support
- Implement keyboard navigation for accessibility
- Add links for navigation items
- Create multi-row layouts for complex toolbars
