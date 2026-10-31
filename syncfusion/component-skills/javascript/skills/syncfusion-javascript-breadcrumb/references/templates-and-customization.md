# Templates and Customization

## Table of Contents
- [Item Templates](#item-templates)
- [Separator Templates](#separator-templates)
- [Custom Rendering](#custom-rendering)
- [Template Functions](#template-functions)
- [CSS Customization](#css-customization)

## Item Templates

### Overview

The `itemTemplate` property allows you to customize how each breadcrumb item is rendered. Instead of plain text, you can create complex HTML structures with styling, icons, badges, and more.

### String Template

Use HTML strings with placeholder syntax to render custom item layouts:

```typescript
// Simple custom item template
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/', iconCss: 'e-icons e-home' },
    { text: 'Products', url: '/products', iconCss: 'e-icons e-package' },
    { text: 'Electronics', url: '/products/electronics', iconCss: 'e-icons e-settings' }
  ],
  itemTemplate: '<span class="custom-item">${text}</span>'
});
```

### Placeholder Variables

Available variables in string templates:

```typescript
// Access item properties
itemTemplate: '<div class="item-wrapper">${text}</div>'
itemTemplate: '<a href="${url}">${text}</a>'
itemTemplate: '<span id="${id}" class="breadcrumb-item">${text}</span>'

// All properties
itemTemplate: `
  <div class="custom-item">
    <span class="text">${text}</span>
    <span class="url" style="display:none;">${url}</span>
    <span class="id" style="display:none;">${id}</span>
  </div>
`
```

### Template with Icons

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/', iconCss: 'e-icons e-home' },
    { text: 'Products', url: '/products', iconCss: 'e-icons e-package' },
    { text: 'Current', url: '/products', iconCss: 'e-icons e-location', disabled: true }
  ],
  itemTemplate: `
    <span class="item-with-icon">
      <i class="${iconCss}"></i>
      <span class="item-text">${text}</span>
    </span>
  `
});
```

### Template with Badges

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/', badge: '' },
    { text: 'Notifications', url: '/notifications', badge: '5' },
    { text: 'Messages', url: '/messages', badge: '12' }
  ],
  itemTemplate: `
    <span class="item-badge">
      ${text}
      ${badge ? '<span class="badge-count">' + badge + '</span>' : ''}
    </span>
  `
});
```

### Template with Status Indicator

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Step 1', url: '/', status: 'completed' },
    { text: 'Step 2', url: '/step2', status: 'active' },
    { text: 'Step 3', url: '/step3', status: 'pending' }
  ],
  itemTemplate: `
    <span class="step-item">
      <span class="step-status step-${status}"></span>
      <span class="step-text">${text}</span>
    </span>
  `,
  cssClass: 'step-breadcrumb'
});
```

## Separator Templates

### Overview

The `separatorTemplate` property allows you to customize the separators between breadcrumb items. Replace the default "/" with custom content.

### Default Separator

```typescript
// Default "/"
const breadcrumb = new Breadcrumb({
  items: [...],
  // Default separator: /
});

// Renders as: Home / Products / Electronics
```

### String Separators

```typescript
// Arrow separator
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: '>'
});

// Renders as: Home > Products > Electronics

// Right arrow symbol
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: '→'
});

// Renders as: Home → Products → Electronics

// Double colon
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: '::'
});

// Renders as: Home :: Products :: Electronics
```

### Icon Separators

```typescript
// Chevron icon separator
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: '<i class="e-icons e-chevron-right"></i>'
});

// Renders icons between items

// Custom icon
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: '<i class="fas fa-arrow-right"></i>'
});
```

### Styled Separators

```typescript
// Styled separator with CSS class
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: '<span class="custom-separator">|</span>'
});

// CSS
.custom-separator {
  color: #666;
  font-weight: bold;
  margin: 0 8px;
  border-left: 2px solid #ddd;
  padding-left: 8px;
}
```

## Custom Rendering

### Function-based Item Template

Use function templates for complex logic:

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/', type: 'link' },
    { text: 'Products', url: '/products', type: 'link' },
    { text: 'Featured', url: '/featured', type: 'badge' },
    { text: 'Current', url: '/current', type: 'text' }
  ],
  itemTemplate: (context) => {
    switch(context.type) {
      case 'link':
        return `<a href="${context.url}" class="breadcrumb-link">${context.text}</a>`;
      case 'badge':
        return `<span class="breadcrumb-badge">${context.text}</span>`;
      case 'text':
        return `<span class="breadcrumb-text">${context.text}</span>`;
      default:
        return `<span>${context.text}</span>`;
    }
  }
});
```

### Conditional Rendering

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/', canNavigate: true },
    { text: 'Admin', url: '/admin', canNavigate: userRole === 'admin' },
    { text: 'Users', url: '/admin/users', canNavigate: userRole === 'admin' }
  ],
  itemTemplate: (context) => {
    const content = `<span>${context.text}</span>`;
    
    if (context.canNavigate) {
      return `<a href="${context.url}" class="navigable">${content}</a>`;
    } else {
      return `<span class="non-navigable">${content}</span>`;
    }
  }
});
```

### Complex Item Rendering

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { 
      text: 'Dashboard', 
      url: '/dashboard', 
      icon: 'e-icons e-home',
      description: 'Main dashboard'
    },
    { 
      text: 'Analytics', 
      url: '/analytics', 
      icon: 'e-icons e-chart',
      description: 'Analytics page'
    }
  ],
  itemTemplate: (context) => {
    return `
      <div class="complex-item">
        <div class="item-header">
          <i class="${context.icon}"></i>
          <a href="${context.url}">${context.text}</a>
        </div>
        <div class="item-description">${context.description}</div>
      </div>
    `;
  },
  cssClass: 'complex-breadcrumb'
});

// CSS
.complex-breadcrumb .complex-item {
  display: inline-block;
  position: relative;
}

.complex-item .item-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.complex-item .item-description {
  font-size: 12px;
  color: #999;
  margin-top: 4px;
}
```

## Template Functions

### Basic Function Template

```typescript
// Arrow function
const breadcrumb = new Breadcrumb({
  items: [...],
  itemTemplate: (item) => `<span class="item">${item.text}</span>`
});

// Named function
function customItemTemplate(item) {
  return `<a href="${item.url}" class="custom-link">${item.text}</a>`;
}

const breadcrumb = new Breadcrumb({
  items: [...],
  itemTemplate: customItemTemplate
});
```

### Separator Template as Function

```typescript
// Dynamic separator based on item
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: () => {
    return Math.random() > 0.5 ? '/' : '→';
  }
});

// Separator with conditional logic
const breadcrumb = new Breadcrumb({
  items: [...],
  separatorTemplate: (index) => {
    return index % 2 === 0 ? '/' : '|';
  }
});
```

### Template with Data Binding

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/', color: '#ff5733' },
    { text: 'Products', url: '/products', color: '#33ff57' },
    { text: 'Current', url: '/current', color: '#3357ff' }
  ],
  itemTemplate: (item) => {
    return `
      <span style="color: ${item.color}" class="colored-item">
        ${item.text}
      </span>
    `;
  }
});
```

## CSS Customization

### Styling Item Text

```css
/* Default item styling */
.e-breadcrumb .e-breadcrumb-item {
  color: #333;
  font-size: 14px;
  font-weight: 400;
}

/* Active item styling */
.e-breadcrumb .e-breadcrumb-item.e-active {
  color: #ff6b6b;
  font-weight: 600;
}

/* Hover state */
.e-breadcrumb .e-breadcrumb-item:hover {
  text-decoration: underline;
  color: #0066cc;
}

/* Disabled item styling */
.e-breadcrumb .e-breadcrumb-item.e-disabled {
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.6;
}
```

### Styling Separators

```css
/* Separator styling */
.e-breadcrumb .e-separator {
  color: #999;
  margin: 0 8px;
}

/* Custom separator with background */
.e-breadcrumb .custom-separator {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 3px;
  color: #666;
}
```

### Styling Container

```css
/* Breadcrumb container */
.e-breadcrumb {
  background-color: #fafafa;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 20px;
}

/* Breadcrumb list */
.e-breadcrumb .e-breadcrumb-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
}

/* Breadcrumb item */
.e-breadcrumb .e-breadcrumb-item {
  display: inline-block;
  white-space: nowrap;
}
```

### Custom Theme Example

```typescript
const breadcrumb = new Breadcrumb({
  items: [...],
  cssClass: 'dark-theme'
});
```

```css
.e-breadcrumb.dark-theme {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 16px;
  border-radius: 8px;
}

.dark-theme .e-breadcrumb-item {
  color: #fff;
  font-weight: 500;
}

.dark-theme .e-breadcrumb-item:hover {
  opacity: 0.8;
  text-decoration: underline;
}

.dark-theme .e-separator {
  color: rgba(255, 255, 255, 0.6);
}

.dark-theme .e-breadcrumb-item.e-active {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  padding: 4px 8px;
}
```

### Responsive Styling

```css
/* Mobile devices */
@media (max-width: 600px) {
  .e-breadcrumb {
    padding: 8px;
    font-size: 12px;
  }
  
  .e-breadcrumb .e-separator {
    margin: 0 4px;
  }
  
  .e-breadcrumb-item {
    max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Tablets */
@media (min-width: 601px) and (max-width: 1024px) {
  .e-breadcrumb {
    padding: 12px;
    font-size: 13px;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .e-breadcrumb {
    padding: 16px;
    font-size: 14px;
  }
}
```

---

**Next:** Learn how to handle multiple overflow modes using [overflow-modes.md](overflow-modes.md).
