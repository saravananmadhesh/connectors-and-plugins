# Speed Dial - Template (TypeScript)

## Item Template

### Custom Item Content
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  itemTemplate: '<span class="e-icon ${iconCss}"></span><span class="e-label">${text}</span>',
  items: [
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');
```

### Template with Custom HTML
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  itemTemplate: `
    <div class="custom-item">
      <span class="item-icon e-icon \${iconCss}"></span>
      <span class="item-label">\${text}</span>
      <span class="item-badge">New</span>
    </div>
  `,
  items: [
    { text: 'Create', iconCss: 'e-icons e-new' },
    { text: 'Edit', iconCss: 'e-icons e-edit' },
    { text: 'Delete', iconCss: 'e-icons e-delete' }
  ]
});
speedDial.appendTo('#speeddial');

// CSS for custom items
const style = document.createElement('style');
style.textContent = `
  .custom-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
  }
  
  .item-label {
    font-size: 14px;
  }
  
  .item-badge {
    font-size: 10px;
    background-color: #FF5252;
    color: white;
    padding: 2px 6px;
    border-radius: 10px;
  }
`;
document.head.appendChild(style);
```

## Pop-up Content Template

### Custom Pop-up Layout
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  popupTemplate: `
    <div class="custom-popup">
      <h3>Quick Actions</h3>
      <ul>
        <li><a href="#">Create</a></li>
        <li><a href="#">Edit</a></li>
        <li><a href="#">Delete</a></li>
      </ul>
    </div>
  `,
  items: []
});
speedDial.appendTo('#speeddial');

const style = document.createElement('style');
style.textContent = `
  .custom-popup {
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .custom-popup h3 {
    margin: 0 0 12px 0;
  }
  
  .custom-popup ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;
document.head.appendChild(style);
```

## Dynamic Template

### Template Function
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  itemTemplate: getItemTemplate,
  items: [
    { text: 'Item 1', iconCss: 'e-icons e-one', value: 'High' },
    { text: 'Item 2', iconCss: 'e-icons e-two', value: 'Medium' },
    { text: 'Item 3', iconCss: 'e-icons e-three', value: 'Low' }
  ]
});
speedDial.appendTo('#speeddial');

function getItemTemplate(context: any): string {
  return `
    <div class="template-item">
      <span class="e-icon ${context.iconCss}"></span>
      <span class="label">${context.text}</span>
      <span class="priority ${context.value.toLowerCase()}">${context.value}</span>
    </div>
  `;
}

const style = document.createElement('style');
style.textContent = `
  .template-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px;
  }
  
  .priority {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;
  }
  
  .priority.high { background-color: #FF5252; color: white; }
  .priority.medium { background-color: #FFC107; }
  .priority.low { background-color: #4CAF50; color: white; }
`;
document.head.appendChild(style);
```

## Template with Data Binding

### Complex Template Structure
```typescript
import { SpeedDial } from '@syncfusion/ej2-buttons';

interface ItemData {
  text: string;
  iconCss: string;
  description?: string;
  badge?: string;
}

const speedDial: SpeedDial = new SpeedDial({
  iconCss: 'e-icons e-plus',
  itemTemplate: renderTemplate,
  items: [
    { 
      text: 'Create Document', 
      iconCss: 'e-icons e-new',
      description: 'Start a new document',
      badge: 'New'
    },
    { 
      text: 'Open File', 
      iconCss: 'e-icons e-folder',
      description: 'Open existing file'
    },
    { 
      text: 'Settings', 
      iconCss: 'e-icons e-settings',
      description: 'Configure options'
    }
  ]
});
speedDial.appendTo('#speeddial');

function renderTemplate(context: ItemData): string {
  let html = `
    <div class="data-template">
      <div class="template-header">
        <span class="e-icon ${context.iconCss}"></span>
        <span class="template-text">${context.text}</span>
  `;
  
  if (context.badge) {
    html += `<span class="template-badge">${context.badge}</span>`;
  }
  
  html += '</div>';
  
  if (context.description) {
    html += `<div class="template-description">${context.description}</div>`;
  }
  
  html += '</div>';
  return html;
}

const style = document.createElement('style');
style.textContent = `
  .data-template {
    padding: 8px;
  }
  
  .template-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  .template-badge {
    background-color: #FF5252;
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
  }
  
  .template-description {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
  }
`;
document.head.appendChild(style);
```

## Template with Event Handlers

```typescript
import { SpeedDial, SpeedDialItemClickEventArgs } from '@syncfusion/ej2-buttons';

class TemplateSpeedDial {
  private speedDial: SpeedDial;
  
  constructor() {
    this.speedDial = new SpeedDial({
      iconCss: 'e-icons e-plus',
      itemTemplate: this.getTemplate.bind(this),
      items: [
        { text: 'Save', iconCss: 'e-icons e-save', action: 'save' },
        { text: 'Publish', iconCss: 'e-icons e-publish', action: 'publish' },
        { text: 'Delete', iconCss: 'e-icons e-delete', action: 'delete' }
      ],
      itemClick: (args: SpeedDialItemClickEventArgs): void => {
        this.onItemClick(args);
      }
    });
    this.speedDial.appendTo('#speeddial');
  }
  
  private getTemplate(context: any): string {
    return `
      <div class="action-template" data-action="${context.action}">
        <span class="e-icon ${context.iconCss}"></span>
        <span>${context.text}</span>
      </div>
    `;
  }
  
  private onItemClick(args: SpeedDialItemClickEventArgs): void {
    const action = (args.item as any).action;
    console.log('Action triggered:', action);
    this.handleAction(action);
  }
  
  private handleAction(action: string): void {
    switch (action) {
      case 'save':
        console.log('Saving...');
        break;
      case 'publish':
        console.log('Publishing...');
        break;
      case 'delete':
        console.log('Deleting...');
        break;
    }
  }
}

// Usage
new TemplateSpeedDial();
```
