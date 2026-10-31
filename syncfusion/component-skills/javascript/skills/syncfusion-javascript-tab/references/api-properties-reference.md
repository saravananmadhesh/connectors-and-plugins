---
name: api-properties-reference
title: Complete API Properties Reference
description: Comprehensive reference for all Tab component properties with examples
---

# Complete API Properties Reference

This document provides complete reference for all Tab component properties, their types, default values, and practical usage examples.

## Table of Contents

- [Core Tab Properties](#core-tab-properties)
- [Rendering and Display](#rendering-and-display)
- [Interaction and Behavior](#interaction-and-behavior)
- [Animation and Effects](#animation-and-effects)
- [Accessibility and Localization](#accessibility-and-localization)
- [Content Management](#content-management)
- [Styling and Customization](#styling-and-customization)
- [Advanced Features](#advanced-features)

---

## Core Tab Properties

### items

**Type:** `TabItemModel[]`  
**Default:** `[]`  
**Modifiable:** Yes (can be changed and refreshed)

Array of tab items to display. Each item requires a header and content.

```typescript
let tabObj: Tab = new Tab({
    items: [
        {
            header: { 'text': 'Home' },
            content: 'Welcome to home tab',
            id: 'home-tab',
            cssClass: 'highlight-tab'
        },
        {
            header: { 'text': 'Profile' },
            content: 'User profile information',
            disabled: false
        },
        {
            header: { 'text': 'Settings' },
            content: 'Application settings',
            visible: true
        }
    ]
});
tabObj.appendTo('#element');

// Add items dynamically
tabObj.addTab([{
    header: { 'text': 'About' },
    content: 'About page'
}]);

// Remove tab
tabObj.removeTab(0);

// Modify existing item
tabObj.items[0].header.text = 'Home (Updated)';
tabObj.refresh();
```

### selectedItem

**Type:** `number`  
**Default:** `0`  
**Modifiable:** Yes

Index of the currently active tab. Set programmatically to change active tab.

```typescript
let tabObj: Tab = new Tab({
    selectedItem: 0,  // First tab active by default
    items: [...]
});
tabObj.appendTo('#element');

// Change active tab programmatically
tabObj.selectedItem = 2;
tabObj.select(2);  // Alternative method

// Get currently selected tab
let activeIndex = tabObj.selectedItem;
let activeTab = tabObj.items[activeIndex];
console.log(`Active tab: ${activeTab.header?.text}`);
```

### height

**Type:** `string | number`  
**Default:** `undefined`  
**Modifiable:** Yes

Set explicit height for Tab container. Typically used with `heightAdjustMode: 'None'`.

```typescript
// Fixed height container
let tabObj: Tab = new Tab({
    height: '400px',  // String with CSS unit
    heightAdjustMode: 'None',  // Respect explicit height
    items: [...]
});
tabObj.appendTo('#element');

// Or using pixels as number
let tabObj2: Tab = new Tab({
    height: 500,  // Treated as pixels
    heightAdjustMode: 'Auto',  // Adjust to tallest content
    items: [...]
});
tabObj2.appendTo('#element');
```

### width

**Type:** `string | number`  
**Default:** `undefined`  
**Modifiable:** Yes

Set explicit width for Tab container.

```typescript
let tabObj: Tab = new Tab({
    width: '100%',  // Full width
    height: '400px',
    items: [...]
});
tabObj.appendTo('#element');

// Responsive width
let responsiveTab: Tab = new Tab({
    width: window.innerWidth < 768 ? '100%' : '80%',
    items: [...]
});
```

---

## Rendering and Display

### loadOn  

**Type:** `ContentLoad` enum: `'Demand' | 'Dynamic' | 'Init'`  
**Default:** `'Demand'`  
**Note:** Also called `contentLoad` in some versions

Controls how and when tab content is loaded into DOM.

**Mode Details:**

- **'Demand'** (Lazy Loading) - Content loaded only when tab is first selected; persists in DOM
- **'Dynamic'** - Content reloaded each time tab is selected; removed when deselected
- **'Init'** - All content loaded upfront during initialization

```typescript
// Mode 1: On-Demand (Default) - Best for many tabs
let lazyTab = new Tab({
    loadOn: 'Demand',
    items: [
        {
            header: { 'text': 'Tab 1' },
            content: '<div>Loads only when selected</div>'
        },
        {
            header: { 'text': 'Tab 2' },
            content: '<div>Persists after first load</div>'
        }
    ]
});
lazyTab.appendTo('#element');

// Mode 2: Dynamic - Best for dynamic content
let dynamicTab: Tab = new Tab({
    loadOn: 'Dynamic',  // Content reloaded each selection
    items: [
        {
            header: { 'text': 'Stock Price' },
            content: 'Reloads to show latest price'
        },
        {
            header: { 'text': 'Weather' },
            content: 'Fresh data on each view'
        }
    ]
});
dynamicTab.appendTo('#element');

// Mode 3: Initial - Best for small tabs
let initialTab: Tab = new Tab({
    loadOn: 'Init',  // All content in DOM from start
    items: [
        { header: { 'text': 'User' }, content: 'User info...' },
        { header: { 'text': 'Settings' }, content: 'Settings...' }
    ]
});
initialTab.appendTo('#element');
```

### overflowMode

**Type:** `string`: `'Scrollable' | 'Popup' | 'MultiRow'`  
**Default:** `'Scrollable'`

Controls how tabs behave when they exceed container width.

```typescript
// Scrollable mode - horizontal scroll
let scrollTab: Tab = new Tab({
    overflowMode: 'Scrollable',  // Default
    items: [/* many tabs */]
});
scrollTab.appendTo('#element');

// Popup mode - dropdown menu
let popupTab: Tab = new Tab({
    overflowMode: 'Popup',
    reorderActiveTab: false,  // Active stays in popup
    items: [/* many tabs */]
});
popupTab.appendTo('#element');

// MultiRow mode - wraps to next row
let multiTab: Tab = new Tab({
    overflowMode: 'MultiRow',
    items: [/* many tabs */]
});
multiTab.appendTo('#element');
```

### headerPlacement

**Type:** `HeaderPosition` enum: `'Top' | 'Bottom' | 'Left' | 'Right'`  
**Default:** `'Top'`

Position of tab headers relative to content.

```typescript
// Top placement (default)
let topTab: Tab = new Tab({
    headerPlacement: 'Top',  // Headers above content
    items: [...]
});

// Bottom placement
let bottomTab: Tab = new Tab({
    headerPlacement: 'Bottom',  // Headers below content
    items: [...]
});

// Left placement (vertical tabs)
let leftTab: Tab = new Tab({
    headerPlacement: 'Left',  // Headers on left, sidebar style
    items: [...]
});

// Right placement
let rightTab: Tab = new Tab({
    headerPlacement: 'Right',  // Headers on right side
    items: [...]
});
```

### heightAdjustMode

**Type:** `HeightStyles` enum: `'None' | 'Auto' | 'Content' | 'Fill'`  
**Default:** `'Auto'`

Controls how content container height is determined.

**Mode Details:**

- **'None'** - Use explicit `height` property; no auto-adjustment
- **'Auto'** - All tabs match height of tallest tab (equalizes heights)
- **'Content'** - Each tab matches its own content height (variable heights)
- **'Fill'** - Content fills available parent space

```typescript
// None mode - fixed height
let fixedHeight = new Tab({
    height: '400px',
    heightAdjustMode: 'None',  // Respects height property
    items: [...]
});

// Auto mode - all match tallest
let autoHeight = new Tab({
    heightAdjustMode: 'Auto',  // Tallest content sets height for all
    items: [
        { header: { 'text': 'Short' }, content: 'Just one line' },
        { header: { 'text': 'Long' }, content: '...content spanning multiple lines...' }
    ]
});

// Content mode - individual heights
let contentHeight = new Tab({
    heightAdjustMode: 'Content',  // Default, each tab its own height
    items: [...]
});

// Fill mode - expands to parent
let fillHeight = new Tab({
    height: '500px',
    heightAdjustMode: 'Fill',  // Content fills 500px
    items: [...]
});
```

### scrollStep

**Type:** `number`  
**Default:** `undefined`

Distance in pixels to scroll when using scroll arrows (in Scrollable mode).

```typescript
let tabObj: Tab = new Tab({
    overflowMode: 'Scrollable',
    scrollStep: 100,  // Scroll 100px per click
    items: [/* many tabs */]
});
tabObj.appendTo('#element');
```

---

## Interaction and Behavior

### allowDragAndDrop

**Type:** `boolean`  
**Default:** `false`  
**Requires:** `dragArea` property to restrict drop zone

Enable users to reorder tabs via drag-and-drop.

```typescript
let tabObj: Tab = new Tab({
    allowDragAndDrop: true,
    dragArea: '#drag-container',  // Restrict to container
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2' },
        { header: { 'text': 'Tab 3' }, content: 'Content 3' }
    ],
    dragged: (args: DragEventArgs) => {
        console.log(`Tab moved from index ${args.index}`);
        // Save new order
        saveTabOrder(tabObj.items);
    }
});
tabObj.appendTo('#element');
```

### dragArea

**Type:** `string` (CSS selector)  
**Default:** `null` (drag allowed anywhere)

CSS selector defining the area where tabs can be dragged. Restricts drag movements outside this area.

```typescript
let tabObj: Tab = new Tab({
    allowDragAndDrop: true,
    dragArea: '.tab-drag-zone',  // Only drag within this element
    items: [...]
});
tabObj.appendTo('#element');

// HTML structure
// <div class="tab-drag-zone">
//   <div id="element"></div>  <!-- Tab placed here -->
// </div>
```

### reorderActiveTab

**Type:** `boolean`  
**Default:** `true`

When `overflowMode: 'Popup'` and tab overflows to popup menu, determines if clicking tab in popup moves it to main view.

- **`true`** (default) - Clicking overflow tab moves it to main view
- **`false`** - Clicking overflow tab just selects it without reordering

```typescript
// Reorder enabled (default)
let reorderEnabled = new Tab({
    overflowMode: 'Popup',
    reorderActiveTab: true,  // Click popup tab → moves to main area
    items: [/* many tabs */]
});

// Reorder disabled
let reorderDisabled = new Tab({
    overflowMode: 'Popup',
    reorderActiveTab: false,  // Click popup tab → just selects it
    items: [/* many tabs */]
});
```

### showCloseButton

**Type:** `boolean`  
**Default:** `false`

Display close button on each tab header for user to remove tabs.

```typescript
let tabObj: Tab = new Tab({
    showCloseButton: true,
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content' },
        { header: { 'text': 'Tab 2' }, content: 'Content' }
    ],
    removing: (args: RemoveEventArgs) => {
        // Confirm before closing
        if (!confirm(`Close tab ${args.removedIndex}?`)) {
            args.cancel = true;
        }
    }
});
tabObj.appendTo('#element');
```

### swipeMode

**Type:** `TabSwipeMode` enum: `'Both' | 'Touch' | 'Mouse' | 'None'`  
**Default:** `'Both'`

Controls tab swiping/scrolling on touch and mouse inputs.

**Mode Details:**

- **'Both'** - Enable swiping for both touch and mouse
- **'Touch'** - Enable swiping only for touch (mobile)
- **'Mouse'** - Enable swiping only for mouse/trackpad
- **'None'** - Disable all swiping

```typescript
// Enable both (default)
let swipeAll = new Tab({
    swipeMode: 'Both',  // Desktop and mobile swiping
    items: [...]
});

// Touch only (mobile)
let swipeTouchOnly = new Tab({
    swipeMode: 'Touch',  // Only touch swipe on mobile
    items: [...]
});

// Mouse only (desktop)
let swipeMouseOnly = new Tab({
    swipeMode: 'Mouse',  // Only mouse swipe on desktop
    items: [...]
});

// Disable swiping
let noSwipe = new Tab({
    swipeMode: 'None',  // No swiping gestures
    items: [...]
});
```

---

## Animation and Effects

### animation

**Type:** `TabAnimationSettingsModel`  
**Default:** `{ previous: { effect: 'SlideLeftIn', duration: 600, easing: 'ease' }, next: { effect: 'SlideRightIn', duration: 600, easing: 'ease' } }`

Configure transition animations when switching tabs.

```typescript
// Custom animations
let tabObj: Tab = new Tab({
    animation: {
        previous: {
            effect: 'SlideLeftOut',     // Going to previous tab
            duration: 400,              // 400ms animation
            easing: 'ease-in-out'       // Easing function
        },
        next: {
            effect: 'SlideRightIn',     // Going to next tab
            duration: 400,
            easing: 'ease-in-out'
        }
    },
    items: [...]
});

// Disable animations
let noAnimation = new Tab({
    animation: {
        previous: { effect: 'None', duration: 0 },
        next: { effect: 'None', duration: 0 }
    },
    items: [...]
});

// Available Effects:
// - SlideLeftIn, SlideLeftOut
// - SlideRightIn, SlideRightOut
// - SlideUpIn, SlideUpOut
// - SlideDownIn, SlideDownOut
// - FadeIn, FadeOut
// - ZoomIn, ZoomOut
// - None
```

---

## Accessibility and Localization

### enableRtl

**Type:** `boolean`  
**Default:** `false`

Enable Right-to-Left (RTL) layout direction for languages like Arabic, Hebrew, Persian.

```typescript
// Enable RTL
let rtlTab = new Tab({
    enableRtl: true,  // Headers on right, content right-aligned
    locale: 'ar-SA',  // Arabic locale
    items: [
        { header: { 'text': 'الرئيسية' }, content: 'محتوى...' },
        { header: { 'text': 'الملف الشخصي' }, content: 'ملفك...' }
    ]
});
rtlTab.appendTo('#element');

// CSS responsive RTL
let responsiveRtl = new Tab({
    enableRtl: document.dir === 'rtl',  // Match page direction
    items: [...]
});
```

### locale

**Type:** `string`  
**Default:** `'en-US'`

Set locale for UI strings, date formats, and content direction hints. Overrides global locale.

```typescript
// English
let enTab = new Tab({
    locale: 'en-US',
    items: [...]
});

// German
let deTab = new Tab({
    locale: 'de-DE',
    items: [...]
});

// Chinese
let zhTab = new Tab({
    locale: 'zh-CN',
    enableRtl: false,
    items: [...]
});

// Japanese
let jaTab = new Tab({
    locale: 'ja-JP',
    items: [...]
});

// List of supported locales:
// en, en-US, de, de-DE, fr, fr-FR, 
// es, es-ES, it, it-IT, ja, ja-JP,
// ko, ko-KR, zh, zh-CN, zh-TW,
// ar, ar-SA, pt, pt-PT, ru, ru-RU ...
```

---

## Content Management

### clearTemplates

**Type:** `boolean`  
**Default:** `true`

Controls whether template instances are cleared when tab items change dynamically.

- **`true`** - Templates cleared (memory efficient, requires re-compilation)
- **`false`** - Templates preserved (faster updates, more memory)

```typescript
// Clear templates (default)
let clearLib = new Tab({
    clearTemplates: true,  // Rebuild templates on update
    items: [...]
});
clearLib.appendTo('#element');

// Don't clear templates
let preserveLib = new Tab({
    clearTemplates: false,  // Reuse compiled templates
    items: [...]
});
preserveLib.appendTo('#element');

// Use when:
// - clearTemplates: true → Many dynamic updates, limited memory
// - clearTemplates: false → Frequent updates, template-heavy
```

---

## Styling and Customization

### cssClass

**Type:** `string`  
**Default:** `''`

Add custom CSS class(es) to Tab root element for styling overrides.

```typescript
let tabObj: Tab = new Tab({
    cssClass: 'custom-tabs my-theme light-mode',
    items: [...]
});
tabObj.appendTo('#element');

// CSS to override styles
// .e-tab.custom-tabs {
//     background: #f5f5f5;
//     border: 1px solid #ddd;
// }
// 
// .e-tab.custom-tabs .e-tab-header {
//     background: linear-gradient(to right, #667eea, #764ba2);
// }
//
// .e-tab.custom-tabs .e-tab-header .e-toolbar-item.e-active {
//     border-bottom: 3px solid #fff;
// }
```

---

## Advanced Features

### enablePersistence

**Type:** `boolean`  
**Default:** `false`

Enable automatic saving and restoring of component state using browser's localStorage. Currently persists: `selectedItem`.

```typescript
// Enable persistence
let persistTab = new Tab({
    enablePersistence: true,  // Auto-save selected tab
    items: [
        { header: { 'text': 'Dashboard' }, content: '...' },
        { header: { 'text': 'Analytics' }, content: '...' },
        { header: { 'text': 'Settings' }, content: '...' }
    ]
});
persistTab.appendTo('#element');

// When page reloads, previously selected tab is restored
// Storage key format: `{elementId}_Tab`

// Manually clear persisted state
document.getElementById('clearBtn')?.addEventListener('click', () => {
    let elementId = persistTab.element.id;
    localStorage.removeItem(`${elementId}_Tab`);
    console.log('Persisted state cleared');
});
```

### enableHtmlSanitizer

**Type:** `boolean`  
**Default:** `true`

Enable HTML sanitization to prevent XSS attacks when rendering untrusted HTML content in tabs.

```typescript
// HTML Sanitizer enabled (secure, default)
let secureTab = new Tab({
    enableHtmlSanitizer: true,
    items: [
        {
            header: { 'text': 'User Content' },
            // Malicious <script> tags are stripped
            content: '<p>Safe content with <img src="x" onerror="alert(1)"></p>'
        }
    ]
});
secureTab.appendTo('#element');
// Result: <img> tag's onerror handler is removed

// HTML Sanitizer disabled (not recommended for user content)
let unsafeTab = new Tab({
    enableHtmlSanitizer: false,  // Scripts NOT sanitized
    items: [
        {
            header: { 'text': 'Developer Content' },
            // Scripts execute if present
            content: '<div><script>console.log("Runs")</script></div>'
        }
    ]
});
unsafeTab.appendTo('#element');
// Result: Script executes (DANGEROUS with user-provided content)
```

**Security Recommendations:**

```typescript
// Pattern 1: Always enable for user-generated content
function createUserTab(userData: any) {
    let tabObj = new Tab({
        enableHtmlSanitizer: true,  // FORCE sanitization
        items: [{
            header: { 'text': userData.title },
            content: userData.htmlContent  // From user input
        }]
    });
    return tabObj;
}

// Pattern 2: Use DomPurify for extra safety
import DOMPurify from 'dompurify';

let cleanTab = new Tab({
    enableHtmlSanitizer: true,
    items: [{
        header: { 'text': 'Clean Content' },
        content: DOMPurify.sanitize(userProvidedHtml)
    }]
});

// Pattern 3: Prefer plain text for user content
function createSafeTab(userText: string) {
    return new Tab({
        items: [{
            header: { 'text': 'User Comment' },
            content: `<div>${escapeHtml(userText)}</div>`  // Plain text safe
        }]
    });
}

function escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

---

## TabItem Properties

Each item in the `items` array can have these properties:

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `content` | `string \| HTMLElement \| Function` | `''` | Tab content (HTML, element, or function) |
| `cssClass` | `string` | `''` | CSS class for styling individual tab |
| `disabled` | `boolean` | `false` | Disable user interaction |
| `header` | `HeaderModel` | `{}` | Header configuration |
| `headerTemplate` | `string \| Function` | `null` | Custom header template |
| `id` | `string` | `null` | Unique tab identifier |
| `tabIndex` | `number` | `-1` | Tab order (keyboard navigation) |
| `visible` | `boolean` | `true` | Show/hide tab |

```typescript
let tabObj: Tab = new Tab({
    items: [
        {
            // Standard properties
            header: { text: 'Home', iconCss: 'e-icon-home' },
            content: 'Home content',
            
            // Additional properties
            id: 'home-tab',
            cssClass: 'home-tab-style',
            disabled: false,
            visible: true,
            tabIndex: 0,
            
            // Function-based content
            content: () => {
                let container = document.createElement('div');
                container.innerHTML = 'Dynamic content from function';
                return container;
            }
        }
    ]
});
```

---

## Recommended Property Combinations

### 1. Portal/Dashboard with Persistence

```typescript
new Tab({
    enablePersistence: true,
    heightAdjustMode: 'Auto',
    overflowMode: 'Popup',
    loadOn: 'Demand',
    items: [...]
});
```

### 2. Form Wizard

```typescript
new Tab({
    selectedItem: 0,
    overflowMode: 'Scrollable',
    animation: { previous: { effect: 'SlideLeftOut', duration: 300 }, next: { effect: 'SlideRightIn', duration: 300 } },
    items: [...]
});
```

### 3. Mobile-Responsive Tabs

```typescript
new Tab({
    swipeMode: 'Touch',
    overflowMode: 'Popup',
    headerPlacement: window.innerWidth < 768 ? 'Top' : 'Left',
    allowDragAndDrop: true,
    items: [...]
});
```

### 4. Secure User Content Tabs

```typescript
new Tab({
    enableHtmlSanitizer: true,
    clearTemplates: true,
    cssClass: 'user-content-tabs',
    items: userProvidedTabs
});
```

---

## Complete Property Reference Table

See Tab API Documentation for complete TypeScript type definitions and detailed API specifications.
