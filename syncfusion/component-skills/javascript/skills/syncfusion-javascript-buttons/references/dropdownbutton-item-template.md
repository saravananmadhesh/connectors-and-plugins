# Item Template — Syncfusion EJ2 JavaScript DropdownButton

## Table of Contents
- [Basic Item Template](#basic-item-template)
- [Template with Links](#template-with-links)
- [Rich Content Templates](#rich-content-templates)
- [Conditional Templates](#conditional-templates)
- [ItemTemplate Property](#itemtemplate-property)

---

## Basic Item Template

Use the `itemTemplate` property with a function to customize how items are rendered:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface ExtendedItemModel extends ItemModel {
  icon?: string;
  description?: string;
}

const items: ExtendedItemModel[] = [
  { text: 'Home', icon: '🏠', description: 'Go to home page' },
  { text: 'Search', icon: '🔍', description: 'Search content' },
  { text: 'Settings', icon: '⚙️', description: 'Manage settings' },
];

function itemTemplate(data: any): string {
  return `<div class="item-content">
    <span class="item-icon">${data.properties.icon || ''}</span>
    <span class="item-text">${data.properties.text}</span>
  </div>`;
}

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  itemTemplate: itemTemplate,
  content: 'Menu'
});
dropdownButton.appendTo('#dropdownbutton');
```

**CSS:**
```css
.item-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 0;
}

.item-icon {
  font-size: 18px;
}

.item-text {
  font-weight: 500;
}
```

---

## Template with Links

Create custom menu items with navigation links:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface LinkItemModel extends ItemModel {
  url?: string;
  target?: string;
}

const items: LinkItemModel[] = [
  { text: 'Documentation', url: '/docs', target: '_blank' },
  { text: 'Support', url: '/support', target: '_blank' },
  { text: 'GitHub', url: 'https://github.com', target: '_blank' },
  { separator: true },
  { text: 'Sign Out', url: '/logout', target: '_self' },
];

function itemTemplate(data: any): string {
  const item = data.properties;
  if (item.separator) {
    return ''; // Separator items are handled by default
  }
  
  return `<a href="${item.url}" target="${item.target || '_blank'}" rel="noopener noreferrer" class="menu-link">
    ${item.text}
  </a>`;
}

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  itemTemplate: itemTemplate,
  content: 'Menu'
});
dropdownButton.appendTo('#dropdownbutton');
```

**CSS:**
```css
.menu-link {
  display: block;
  color: inherit;
  text-decoration: none;
  padding: 10px 0;
  transition: color 0.2s;
}

.menu-link:hover {
  color: #007bff;
  text-decoration: underline;
}
```

---

## Rich Content Templates

Display complex layouts inside items:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface UserItemModel extends ItemModel {
  avatar?: string;
  status?: string;
  badge?: number;
}

const items: UserItemModel[] = [
  { 
    text: 'John Doe', 
    avatar: 'https://via.placeholder.com/32',
    status: 'online',
    badge: 3
  },
  { 
    text: 'Jane Smith', 
    avatar: 'https://via.placeholder.com/32',
    status: 'away',
    badge: 0
  },
  { separator: true },
  { text: 'View All Users', avatar: '', status: '', badge: 0 },
];

function itemTemplate(data: any): string {
  const item = data.properties;
  
  return `<div class="user-item">
    <img src="${item.avatar}" alt="${item.text}" class="user-avatar status-${item.status}">
    <div class="user-info">
      <div class="user-name">${item.text}</div>
      <div class="user-status">${item.status}</div>
    </div>
    ${item.badge ? `<span class="badge">${item.badge}</span>` : ''}
  </div>`;
}

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  itemTemplate: itemTemplate,
  content: '👤'
});
dropdownButton.appendTo('#dropdownbutton');
```

**CSS:**
```css
.user-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 4px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #ccc;
}

.user-avatar.status-online {
  border-color: #10b981;
  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
}

.user-avatar.status-away {
  border-color: #f59e0b;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 600;
  font-size: 14px;
}

.user-status {
  font-size: 12px;
  color: #666;
  text-transform: capitalize;
}

.badge {
  background-color: #ef4444;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}
```

---

## Conditional Templates

Render different templates based on item properties:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

interface ActionItemModel extends ItemModel {
  type?: 'action' | 'header' | 'divider';
  icon?: string;
  badge?: string;
}

const items: ActionItemModel[] = [
  { text: 'Actions', type: 'header' },
  { text: 'Save', icon: '💾', type: 'action' },
  { text: 'Delete', icon: '🗑️', type: 'action', badge: 'danger' },
  { type: 'divider' },
  { text: 'Settings', icon: '⚙️', type: 'action' },
];

function itemTemplate(data: any): string {
  const item = data.properties;
  
  if (item.type === 'header') {
    return `<div class="menu-header">${item.text}</div>`;
  }
  
  if (item.type === 'divider') {
    return '<div class="menu-divider"></div>';
  }
  
  const badgeClass = item.badge ? `badge-${item.badge}` : '';
  return `<div class="action-item ${badgeClass}">
    <span class="action-icon">${item.icon}</span>
    <span class="action-text">${item.text}</span>
  </div>`;
}

const dropdownButton: DropdownButton = new DropdownButton({
  items: items,
  itemTemplate: itemTemplate,
  content: 'Actions'
});
dropdownButton.appendTo('#dropdownbutton');
```

**CSS:**
```css
.menu-header {
  font-weight: bold;
  font-size: 12px;
  color: #666;
  padding: 10px 0 5px 0;
  text-transform: uppercase;
}

.menu-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 5px 0;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 4px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.action-item:hover {
  background-color: #f3f4f6;
}

.action-icon {
  font-size: 16px;
}

.action-text {
  flex: 1;
}

.action-item.badge-danger {
  color: #dc2626;
}

.action-item.badge-danger:hover {
  background-color: #fee2e2;
}
```

---

## ItemTemplate Property Reference

The `itemTemplate` property accepts:
- A **function** that returns a **string** (HTML markup)
- The function receives a data object with `properties` field containing the `ItemModel`
- Separator items are still rendered natively by default

```typescript
interface TemplateData {
  properties: ItemModel & any;  // Extended ItemModel with custom properties
}

type ItemTemplateFunction = (data: TemplateData) => string;

const config = {
  itemTemplate: (data: TemplateData) => {
    return `<div>${data.properties.text}</div>`;
  }
};
```

---

## Comparing with beforeItemRender

| Feature | `itemTemplate` | `beforeItemRender` |
|---------|---|---|
| Approach | Return HTML string | Mutate DOM element |
| Best For | Rich layouts, complex content | Simple HTML changes |
| Performance | Template compiled once | Event fired per item |
| Code Style | Declarative | Imperative |
| Complexity | Higher for simple changes | Lower for simple changes |
