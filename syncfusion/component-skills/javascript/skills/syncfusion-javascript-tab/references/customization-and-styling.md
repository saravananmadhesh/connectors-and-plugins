# Customization and Styling

## Table of Contents
- [CSS Classes](#css-classes)
- [Header Styling](#header-styling)
- [Content Styling](#content-styling)
- [State-Based Styling](#state-based-styling)
- [Icon Styling](#icon-styling)
- [Theme Selection](#theme-selection)
- [Custom Styling Examples](#custom-styling-examples)

## CSS Classes

### Tab Component Structure

```
.e-tab                              // Root Tab container
├── .e-tab-header                   // Header wrapper
│   └── .e-toolbar-items            // Header items container
│       └── .e-toolbar-item         // Individual header item
│           └── .e-tab-wrap         // Tab item wrapper
├── .e-content                      // Content wrapper
│   └── .e-item                     // Individual content item
└── .e-tab-disabled                 // Applied when disabled
```

## Header Styling

### Customize Tab Container

```css
.e-tab {
    border: 5px solid rgb(173, 255, 47);
    background: #f5f5f5;
}
```

### Customize Header Area

```css
.e-tab .e-tab-header {
    background: #badfba !important;
    padding: 10px;
    border-bottom: 2px solid #008000;
}
```

### Customize Header Items

```css
.e-tab .e-tab-header .e-toolbar-items {
    background: #9faed8;
    border: 2px solid blue;
}
```

### Customize Individual Header Item

```css
.e-tab .e-tab-header .e-toolbar-item {
    padding: 12px 20px;
    margin: 0 5px;
}

.e-tab .e-tab-header .e-toolbar-item .e-tab-wrap {
    padding: 8px 15px;
    border-radius: 4px;
}

.e-tab .e-tab-header .e-toolbar-item .e-tab-text {
    font-weight: 500;
    font-size: 14px;
}
```

## Content Styling

### Customize Content Container

```css
.e-tab .e-content {
    background: #d1f6d1 !important;
    padding: 20px;
    min-height: 200px;
}
```

### Customize Individual Content Items

```css
.e-tab .e-content .e-item {
    color: #a78515;
    font-size: 14px;
    line-height: 1.6;
}
```

### Content Height Customization

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    heightAdjustMode: 'Content'  // Auto-adjust to content
});
tabObj.appendTo('#element');
```

```css
/* Set fixed height */
.e-tab .e-content {
    height: 300px;
    overflow-y: auto;
}
```

## Customize Selected Tab Styles

Override header and active tab CSS classes to customize the appearance of selected tabs:

```typescript
import { Tab } from '@syncfusion/ej2-navigations';

let tabObj: Tab = new Tab({
    cssClass: "e-tab-custom-class",
    items: [
        {
            header: { 
                'text': '<div><div class="e-image e-andrew"></div><div class="e-title fade-in">Andrew</div></div>' 
            },
            content: 'Andrew received his BTS commercial in 1974...'
        },
        {
            header: { 
                'text': '<div><div class="e-image e-margaret"></div><div class="e-title fade-in">Margaret</div></div>' 
            },
            content: 'Margaret holds a BA in English literature...'
        },
        {
            header: { 
                'text': '<div><div class="e-image e-janet"></div><div class="e-title fade-in">Janet</div></div>' 
            },
            content: 'Janet has a BS degree in chemistry...'
        }
    ]
});
tabObj.appendTo('#element');
```

### CSS for Selected Tab Customization

```css
/* Custom container styling */
.e-tab.e-tab-custom-class {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
}

/* Header area styling */
.e-tab.e-tab-custom-class .e-tab-header {
    background: linear-gradient(90deg, #f5f5f5 0%, #ffffff 100%);
    border-bottom: 2px solid #d0d0d0;
    padding: 0;
}

/* Individual tab item styling */
.e-tab.e-tab-custom-class .e-tab-header .e-toolbar-item {
    padding: 15px 20px;
    margin: 0 2px;
    transition: all 0.3s ease;
    border-right: 1px solid #e0e0e0;
}

/* Active tab styling - WITH ANIMATION */
.e-tab.e-tab-custom-class .e-tab-header .e-toolbar-item.e-active {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-bottom: 3px solid #667eea;
    box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
    transform: translateY(-2px);
}

/* Active tab text styling */
.e-tab.e-tab-custom-class .e-tab-header .e-toolbar-item.e-active .e-tab-text,
.e-tab.e-tab-custom-class .e-tab-header .e-toolbar-item.e-active .e-title {
    color: white !important;
    font-weight: 600;
}

/* Fade-in animation for active tab */
.fade-in {
    animation: fadeInAnim 0.4s ease;
}

@keyframes fadeInAnim {
    from {
        opacity: 0;
        transform: translateY(4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Tab image styling */
.e-tab.e-tab-custom-class .e-image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-bottom: 5px;
    background-size: cover;
}

.e-tab.e-tab-custom-class .e-andrew {
    background-image: url('https://ej2.syncfusion.com/base/styles/images/andrew.png');
}

.e-tab.e-tab-custom-class .e-margaret {
    background-image: url('https://ej2.syncfusion.com/base/styles/images/margaret.png');
}

.e-tab.e-tab-custom-class .e-janet {
    background-image: url('https://ej2.syncfusion.com/base/styles/images/janet.png');
}

/* Content area styling */
.e-tab.e-tab-custom-class .e-content {
    background: white;
    padding: 20px;
    min-height: 200px;
}

.e-tab.e-tab-custom-class .e-content .e-item {
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```

### Alternative: Using Header Styles

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    created: () => {
        // Apply style class to customize header appearance
        let header = tabObj.element.querySelector('.e-tab-header');
        if (header) {
            header.classList.add('e-fill');  // Fill style
            // OR header.classList.add('e-background');  // Background style
            // OR header.classList.add('e-background', 'e-accent');  // Background with accent
        }
    }
});
tabObj.appendTo('#element');
```

### Predefined Header Styles

```css
/* e-fill - Solid fill styling */
.e-tab.e-fill .e-tab-header .e-toolbar-item.e-active {
    background: solid #007bff !important;
    color: white;
}

/* e-background - Solid fill background */
.e-tab.e-background .e-tab-header .e-toolbar-item.e-active {
    background: #f0f0f0 !important;
    border-bottom: 3px solid #007bff;
}

/* e-background e-accent - Background with accent color */
.e-tab.e-background.e-accent .e-tab-header .e-toolbar-item.e-active {
    background: #f0f0f0 !important;
    border-bottom: 3px solid #ff6b6b;
}
```

### Hover State

```css
/* Header item hover */
.e-tab .e-tab-header .e-toolbar-item .e-tab-wrap:hover {
    background: #d1f6d1 !important;
    cursor: pointer;
}

/* Popup icon hover */
.e-tab .e-tab-header .e-hor-nav .e-popup-up-icon:hover,
.e-tab .e-tab-header .e-hor-nav .e-popup-down-icon:hover {
    background: #d1f6d1 !important;
}
```

### Active/Selected State

```css
/* Selected tab item */
.e-tab .e-tab-header .e-toolbar-item.e-active {
    background: #d1f4d1;
    border-bottom: 3px solid #008000;
}

/* Selected tab text and icon */
.e-tab .e-tab-header .e-toolbar-item.e-active .e-tab-text,
.e-tab .e-tab-header .e-toolbar-item.e-active .e-tab-icon {
    color: green !important;
    font-weight: 600;
}
```

## Show Close Button

Add close buttons to tab headers for easy removal of tabs:

```typescript
import { Tab } from '@syncfusion/ej2-navigations';

let tabObj: Tab = new Tab({
    showCloseButton: true,  // Enable close button
    items: [
        {
            header: { 'text': 'Tab 1' },
            content: 'Content 1'
        },
        {
            header: { 'text': 'Tab 2' },
            content: 'Content 2'
        },
        {
            header: { 'text': 'Tab 3' },
            content: 'Content 3'
        }
    ]
});
tabObj.appendTo('#element');
```

### Styling Close Button

```css
/* Close button styling */
.e-tab .e-tab-header .e-toolbar-item .e-close-icon {
    font-size: 12px;
    margin-left: auto;
    color: #999;
    transition: color 0.3s ease;
}

/* Close button on hover */
.e-tab .e-tab-header .e-toolbar-item .e-close-icon:hover {
    color: #d32f2f;
}

/* Custom close button style */
.e-tab.e-custom-close .e-tab-header .e-toolbar-item .e-close-icon {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: #f0f0f0;
}

.e-tab.e-custom-close .e-tab-header .e-toolbar-item:hover .e-close-icon {
    background: #d32f2f;
    color: white;
}
```

### Handle Close Button Click

```typescript
let tabObj: Tab = new Tab({
    showCloseButton: true,
    items: [
        { header: { 'text': 'Closeable Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Closeable Tab 2' }, content: 'Content 2' },
        { header: { 'text': 'Closeable Tab 3' }, content: 'Content 3' }
    ],
    created: () => {
        // Add click handler to close buttons
        let closeButtons = tabObj.element.querySelectorAll('.e-close-icon');
        closeButtons.forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                // Confirm before closing
                if (confirm('Are you sure you want to close this tab?')) {
                    tabObj.removeTab(index);
                }
            });
        });
    }
});
tabObj.appendTo('#element');
```

### Close Button with Tooltip

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tabObj: Tab = new Tab({
    showCloseButton: true,
    items: [...],
    created: () => {
        // Add tooltip to close buttons
        let tooltipObj = new Tooltip({
            content: 'Close this tab',
            target: '.e-close-icon'
        });
        tooltipObj.appendTo(tabObj.element);
    }
});
tabObj.appendTo('#element');
```

### Dynamic Tab Management with Close Button

```typescript
let tabObj: Tab = new Tab({
    showCloseButton: true,
    items: [
        { header: { 'text': 'Home' }, content: 'Home content' }
    ],
    created: () => {
        // Add new tab button
        document.getElementById('addTabBtn')?.addEventListener('click', addNewTab);
    }
});
tabObj.appendTo('#element');

let tabCount = 1;

function addNewTab() {
    tabCount++;
    let newTab = {
        header: { 'text': `Tab ${tabCount}` },
        content: `Content for tab ${tabCount}`
    };
    tabObj.addTab([newTab]);
    setupCloseHandlers();
}

function setupCloseHandlers() {
    let closeButtons = tabObj.element.querySelectorAll('.e-close-icon');
    closeButtons.forEach((btn, index) => {
        btn.removeEventListener('click', closeTabHandler);
        btn.addEventListener('click', (e) => closeTabHandler(e, index));
    });
}

function closeTabHandler(event: Event, index: number) {
    event.stopPropagation();
    tabObj.removeTab(index);
}
```

### Customize Tab Icons

```css
.e-tab .e-tab-header .e-toolbar-item .e-tab-icon {
    color: #badfba !important;
    margin-right: 8px;
    font-size: 16px;
}
```

### Icon in Selected Tab

```css
.e-tab .e-tab-header .e-toolbar-item.e-active .e-tab-icon {
    color: #008000 !important;
}
```

### Icon Positioning Styles

```css
/* Top positioned icon */
.e-tab.e-icon-top .e-tab-header .e-toolbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* Right positioned icon */
.e-tab.e-icon-right .e-tab-wrap {
    flex-direction: row-reverse;
}
```

## Theme Selection

### Available Themes

Tab supports multiple built-in themes:

```css
/* Fluent Theme (Default) */
@import '@syncfusion/ej2-navigations/styles/fluent2.css';

/* Material Theme */
@import '@syncfusion/ej2-navigations/styles/material.css';

/* Bootstrap 5 Theme */
@import '@syncfusion/ej2-navigations/styles/bootstrap5.css';

/* High Contrast Theme */
@import '@syncfusion/ej2-navigations/styles/highcontrast.css';

/* Tailwind Theme */
@import '@syncfusion/ej2-navigations/styles/tailwind.css';
```

### Switching Themes at Runtime

```typescript
function switchTheme(themeName: string) {
    let link = document.getElementById('theme-link') as HTMLLinkElement;
    link.href = `/node_modules/@syncfusion/ej2-navigations/styles/${themeName}.css`;
}

// Usage
switchTheme('material');
```

## Custom Styling Examples

### Example 1: Modern Card-Based Tabs

```css
.e-tab {
    border: none;
    background: transparent;
}

.e-tab .e-tab-header {
    background: transparent;
    border: none;
    gap: 10px;
}

.e-tab .e-tab-header .e-toolbar-item {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.e-tab .e-tab-header .e-toolbar-item.e-active {
    background: #007bff;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.e-tab .e-tab-header .e-toolbar-item.e-active .e-tab-text {
    color: white;
}

.e-tab .e-content {
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Example 2: Minimal Underline Tabs

```css
.e-tab .e-tab-header {
    background: transparent;
    border-bottom: 1px solid #e0e0e0;
}

.e-tab .e-tab-header .e-toolbar-item {
    background: transparent;
    border-bottom: 3px solid transparent;
    transition: border-color 0.3s ease;
}

.e-tab .e-tab-header .e-toolbar-item.e-active {
    background: transparent;
    border-bottom-color: #007bff;
}

.e-tab .e-content {
    background: transparent;
    border: none;
    padding: 20px 0;
}
```

### Example 3: Left Header Placement with Icons

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    headerPlacement: 'Left'
});
tabObj.appendTo('#element');
```

```css
.e-tab {
    display: flex;
    flex-direction: row;
}

.e-tab .e-tab-header {
    width: 200px;
    border-right: 1px solid #e0e0e0;
    flex-direction: column;
    gap: 5px;
    order: -1;
}

.e-tab .e-tab-header .e-toolbar-items {
    flex-direction: column;
}

.e-tab .e-content {
    flex: 1;
}
```

### Example 4: Animated Tab Transitions

```css
.e-tab .e-content .e-item {
    animation: slideIn 0.3s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(10px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```

### Example 5: Responsive Tabs

```css
@media (max-width: 768px) {
    .e-tab .e-tab-header {
        overflow-x: auto;
        padding-bottom: 10px;
    }
    
    .e-tab .e-tab-header .e-toolbar-item {
        padding: 8px 12px;
        font-size: 12px;
    }
    
    .e-tab .e-content {
        padding: 10px;
    }
}
```

## Programmatic Styling

### Add/Remove CSS Classes

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    created: () => {
        // Add custom class after creation
        tabObj.element.classList.add('modern-style');
    }
});
tabObj.appendTo('#element');

// Change style dynamically
function updateTabStyle(styleClass: string) {
    tabObj.element.classList.remove('modern-style', 'minimal-style');
    tabObj.element.classList.add(styleClass);
}
```

### Dynamic Style Injection

```typescript
function applyCustomTheme() {
    let style = document.createElement('style');
    style.innerHTML = `
        .e-tab .e-tab-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .e-tab .e-tab-header .e-toolbar-item.e-active .e-tab-text {
            color: white;
        }
    `;
    document.head.appendChild(style);
}

applyCustomTheme();
```

## Best Practices

1. **Use CSS Variables** - Define theme colors as variables for easy updates
2. **Maintain Contrast** - Ensure sufficient color contrast for accessibility
3. **Consistent Spacing** - Use consistent padding/margin across header and content
4. **Responsive Design** - Test styling on different screen sizes
5. **Animation Performance** - Use CSS transitions instead of JavaScript animations
6. **Theme Consistency** - Keep styling aligned with application branding

---

**Related Topics:**
- [Tab Structure and Content](./tab-structure-and-content.md) - Header configuration options
- [Responsive and Adaptive Modes](./responsive-adaptive-modes.md) - Responsive layout considerations
