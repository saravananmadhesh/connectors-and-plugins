# Templates and Custom Rendering

## Table of Contents
- [Item Templates](#item-templates)
- [Header Templates](#header-templates)
- [Group Templates](#group-templates)
- [Multi-Line Items](#multi-line-items)
- [Conditional Templates](#conditional-templates)
- [Avatar and Icon Rendering](#avatar-and-icon-rendering)
- [Dynamic Template Switching](#dynamic-template-switching)
- [HTML Sanitization](#html-sanitization)

## Item Templates

### Basic String Template

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const data = [
    { id: '1', text: 'Apple' },
    { id: '2', text: 'Banana' },
    { id: '3', text: 'Orange' }
];

const listView = new ListView({
    dataSource: data,
    template: '<div>${text}</div>',
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

### HTML Template with Data Binding

```typescript
const listView = new ListView({
    dataSource: data,
    template: '<span class="e-avatar" style="background-color: #BCBCED;">${text}</span>',
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

### Template with CSS Classes

```typescript
const listView = new ListView({
    dataSource: data,
    template: `
        <div class="e-list-item">
            <span class="e-badge">${id}</span>
            <div class="e-content">
                <span class="e-list-item-text">${text}</span>
            </div>
        </div>
    `,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

### Template Function

```typescript
function getTemplate(data) {
    return `<div class="item">
        <strong>${data.text}</strong>
        <p>ID: ${data.id}</p>
    </div>`;
}

const listView = new ListView({
    dataSource: data,
    template: getTemplate,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

## Header Templates

### Simple Header

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    showHeader: true,
    headerTitle: 'Fruits'
});

listView.appendTo('#listview');
```

### Custom Header Template

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    headerTemplate: '<div class="e-list-header"><h3>My List (${dataLength} items)</h3></div>',
    showHeader: true
});

listView.appendTo('#listview');
```

### Header with Action Buttons

```typescript
const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' },
    headerTemplate: `
        <div class="e-list-header" style="display: flex; justify-content: space-between;">
            <h3>Items</h3>
            <button class="add-btn" onclick="addNewItem()">+ Add</button>
        </div>
    `,
    showHeader: true
});

function addNewItem() {
    const newItem = { id: Date.now().toString(), text: 'New Item' };
    listView.addItem(newItem);
}

listView.appendTo('#listview');
```

## Group Templates

### Basic Grouping

```typescript
const employees = [
    { id: '1', text: 'John', department: 'Sales' },
    { id: '2', text: 'Sarah', department: 'IT' },
    { id: '3', text: 'Mike', department: 'Sales' },
    { id: '4', text: 'Emma', department: 'HR' }
];

const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    }
});

listView.appendTo('#listview');
```

### Custom Group Header Template

```typescript
const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    },
    groupTemplate: '<div class="group-header"><strong>${department}</strong></div>'
});

listView.appendTo('#listview');
```

### Group Header with Item Count

```typescript
const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    },
    groupTemplate: `
        <div class="group-header">
            <strong>${department}</strong>
            <span class="count">(${count} members)</span>
        </div>
    `
});

listView.appendTo('#listview');
```

## Multi-Line Items

### Two-Line List Item

```typescript
const contacts = [
    { id: '1', name: 'John Doe', phone: '555-1234' },
    { id: '2', name: 'Sarah Smith', phone: '555-5678' },
    { id: '3', name: 'Mike Johnson', phone: '555-9012' }
];

const listView = new ListView({
    dataSource: contacts,
    template: `
        <div class="e-list-item">
            <div class="e-content">
                <span class="e-list-item-text">${name}</span>
                <span class="e-list-item-description">${phone}</span>
            </div>
        </div>
    `,
    fields: { id: 'id', text: 'name' }
});

listView.appendTo('#listview');
```

### With CSS Styling

```html
<style>
    .e-list-item-description {
        font-size: 12px;
        color: #999;
        margin-top: 5px;
    }
</style>
```

### Complex Multi-Line Items

```typescript
const data = [
    { 
        id: '1', 
        title: 'Project Alpha', 
        status: 'In Progress', 
        progress: 65,
        assignee: 'John'
    },
    { 
        id: '2', 
        title: 'Project Beta', 
        status: 'Completed', 
        progress: 100,
        assignee: 'Sarah'
    }
];

const listView = new ListView({
    dataSource: data,
    template: `
        <div class="project-item">
            <h4>${title}</h4>
            <p>Assigned to: ${assignee}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${progress}%"></div>
            </div>
            <span class="status ${status.replace(' ', '-')}">${status}</span>
        </div>
    `,
    fields: { id: 'id', text: 'title' }
});

listView.appendTo('#listview');
```

## Avatar and Icon Rendering

### Avatar Template

```typescript
const users = [
    { id: '1', name: 'Alice', avatar: 'A', color: '#FF6B6B' },
    { id: '2', name: 'Bob', avatar: 'B', color: '#4ECDC4' },
    { id: '3', name: 'Charlie', avatar: 'C', color: '#45B7D1' }
];

const listView = new ListView({
    dataSource: users,
    template: `
        <div class="e-list-item">
            <div class="e-avatar" style="background-color: ${color}; width: 40px; height: 40px; 
                border-radius: 50%; display: flex; align-items: center; justify-content: center; 
                color: white; font-weight: bold; margin-right: 10px;">
                ${avatar}
            </div>
            <span>${name}</span>
        </div>
    `,
    fields: { id: 'id', text: 'name' }
});

listView.appendTo('#listview');
```

### Image Avatar

```typescript
const profiles = [
    { id: '1', name: 'Alice', image: 'alice.jpg' },
    { id: '2', name: 'Bob', image: 'bob.jpg' },
    { id: '3', name: 'Charlie', image: 'charlie.jpg' }
];

const listView = new ListView({
    dataSource: profiles,
    template: `
        <div class="e-list-item">
            <img src="images/${image}" class="avatar-image" style="width: 40px; height: 40px; 
                border-radius: 50%; margin-right: 10px;" />
            <span>${name}</span>
        </div>
    `,
    fields: { id: 'id', text: 'name' }
});

listView.appendTo('#listview');
```

### Icon with Text

```typescript
const tasks = [
    { id: '1', text: 'Complete Report', icon: 'e-icons e-file-pdf' },
    { id: '2', text: 'Review Code', icon: 'e-icons e-code' },
    { id: '3', text: 'Update Documentation', icon: 'e-icons e-description' }
];

const listView = new ListView({
    dataSource: tasks,
    template: `
        <div class="e-list-item">
            <span class="${icon}" style="margin-right: 10px;"></span>
            <span>${text}</span>
        </div>
    `,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

## Conditional Templates

### Status-Based Rendering

```typescript
const items = [
    { id: '1', text: 'Item 1', status: 'active' },
    { id: '2', text: 'Item 2', status: 'inactive' },
    { id: '3', text: 'Item 3', status: 'pending' }
];

function getStatusTemplate(data) {
    let badgeClass = '';
    if (data.status === 'active') badgeClass = 'e-badge-success';
    else if (data.status === 'inactive') badgeClass = 'e-badge-danger';
    else if (data.status === 'pending') badgeClass = 'e-badge-warning';
    
    return `
        <div class="e-list-item">
            <span>${data.text}</span>
            <span class="e-badge ${badgeClass}">${data.status}</span>
        </div>
    `;
}

const listView = new ListView({
    dataSource: items,
    template: getStatusTemplate,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

### Priority-Based Color Coding

```typescript
const tasks = [
    { id: '1', text: 'High Priority', priority: 'high' },
    { id: '2', text: 'Medium Priority', priority: 'medium' },
    { id: '3', text: 'Low Priority', priority: 'low' }
];

function getPriorityTemplate(data) {
    const colors = {
        'high': '#FF6B6B',
        'medium': '#FFA500',
        'low': '#4ECDC4'
    };
    
    return `
        <div class="e-list-item" style="border-left: 4px solid ${colors[data.priority]}; padding-left: 10px;">
            <span>${data.text}</span>
            <small style="color: #999;">(${data.priority})</small>
        </div>
    `;
}

const listView = new ListView({
    dataSource: tasks,
    template: getPriorityTemplate,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');
```

## Dynamic Template Switching

### Change Template Based on View Type

```typescript
let currentTemplate = 'list';

function switchTemplate(viewType) {
    currentTemplate = viewType;
    
    if (viewType === 'list') {
        listView.template = `<div>${data.text}</div>`;
    } else if (viewType === 'card') {
        listView.template = `
            <div class="card-item">
                <h4>${data.text}</h4>
                <p>${data.description}</p>
            </div>
        `;
    } else if (viewType === 'grid') {
        listView.template = `
            <div class="grid-item" style="display: inline-block; width: 150px;">
                <div class="grid-card">${data.text}</div>
            </div>
        `;
    }
    
    listView.render();
}

const listView = new ListView({
    dataSource: data,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

// Switch templates
document.getElementById('list-view').addEventListener('click', () => switchTemplate('list'));
document.getElementById('card-view').addEventListener('click', () => switchTemplate('card'));
document.getElementById('grid-view').addEventListener('click', () => switchTemplate('grid'));
```

## HTML Sanitization

### Enable HTML Sanitization (Secure)

```typescript
const data = [
    { id: '1', text: '<strong>Item 1</strong>' },
    { id: '2', text: '<img src="x" onerror="alert(\'xss\')">' }
];

const listView = new ListView({
    dataSource: data,
    template: '<div>${text}</div>',
    fields: { id: 'id', text: 'text' },
    enableHtmlSanitizer: true  // Default is true - protects against XSS
});

listView.appendTo('#listview');
```

### Disable Sanitization (Use Carefully)

```typescript
// Only disable if you trust the data source completely
const listView = new ListView({
    dataSource: trustedData,
    template: '<div>${text}</div>',
    fields: { id: 'id', text: 'text' },
    enableHtmlSanitizer: false
});

listView.appendTo('#listview');
```

### Safe HTML Template Pattern

```typescript
function escapHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

const data = [
    { id: '1', text: '<script>alert("xss")</script>' }
];

const listView = new ListView({
    dataSource: data,
    template: '<div>${text}</div>',
    fields: { id: 'id', text: 'text' },
    enableHtmlSanitizer: true
});

listView.appendTo('#listview');
```

## Advanced Template Patterns

### Nested Data Template

```typescript
const data = [
    { 
        id: '1', 
        name: 'John',
        contact: { phone: '555-1234', email: 'john@example.com' }
    },
    { 
        id: '2', 
        name: 'Sarah',
        contact: { phone: '555-5678', email: 'sarah@example.com' }
    }
];

const listView = new ListView({
    dataSource: data,
    template: `
        <div class="e-list-item">
            <h4>${name}</h4>
            <p>Phone: ${contact.phone}</p>
            <p>Email: ${contact.email}</p>
        </div>
    `,
    fields: { id: 'id', text: 'name' }
});

listView.appendTo('#listview');
```

### Template with Dynamic Content

```typescript
async function loadUserTemplate(userId) {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    
    return `
        <div class="user-card">
            <h4>${userData.name}</h4>
            <p>${userData.bio}</p>
            <small>${userData.joinDate}</small>
        </div>
    `;
}
```

## Performance Optimization

1. **Use String Templates for Simple Cases**
   - Faster rendering for simple items
   
2. **Avoid Complex DOM Operations in Templates**
   - Keep template logic minimal
   
3. **Use Virtual Scrolling with Templates**
   - Especially important for large lists with complex templates
   
4. **Cache Template Functions**
   - Reuse compiled templates instead of creating new ones

See the advanced-features.md section for virtualization with complex templates.

## Dynamic Tags and Badges

Create interactive tags and badges that can be added/removed dynamically in list items.

### Basic Dynamic Tags

```typescript
import { ListView, SelectEventArgs } from '@syncfusion/ej2-lists';
import { Button } from '@syncfusion/ej2-buttons';
import { Dialog } from '@syncfusion/ej2-popups';

const peopleData = [
    { Id: 'person1', Name: 'Alice' },
    { Id: 'person2', Name: 'Bob' },
    { Id: 'person3', Name: 'Charlie' }
];

// Template with add button for each item
const itemTemplate = `
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <span class="templatetext">${'${Name}'}</span>
        <span class="designationstyle">
            <button id="${'${Id}'}" class="e-add-btn" style="margin: 0;"></button>
        </span>
    </div>
`;

const listView = new ListView({
    dataSource: peopleData,
    template: itemTemplate,
    fields: { text: 'Name' },
    actionComplete: initializeButtons
});

listView.appendTo('#list-with-tags');

function initializeButtons() {
    const buttons = document.querySelectorAll('.e-add-btn');
    buttons.forEach((btn, index) => {
        new Button({ 
            iconCss: 'e-icons e-add-icon', 
            cssClass: 'e-small e-round' 
        }).appendTo(btn);
        
        btn.addEventListener('click', (e) => {
            openTagDialog(peopleData[index].Id);
        });
    });
}
```

### Dynamic Tag Management

```typescript
import { Dialog } from '@syncfusion/ej2-popups';

// Available tags for each person
const tagsByPerson = {
    'person1': [
        { id: 'tag1', name: 'Developer' },
        { id: 'tag2', name: 'Designer' },
        { id: 'tag3', name: 'Manager' }
    ],
    'person2': [
        { id: 'tag4', name: 'Sales' },
        { id: 'tag5', name: 'Support' }
    ],
    'person3': [
        { id: 'tag6', name: 'Marketing' },
        { id: 'tag7', name: 'Content' }
    ]
};

// Tag selection dialog
const tagDialog = new Dialog({
    width: '300px',
    content: '<div id="tag-list"></div>',
    animationSettings: { effect: 'None' },
    visible: false,
    showCloseIcon: true,
    closeOnEscape: true
});

tagDialog.appendTo('#tag-dialog');

function openTagDialog(personId) {
    const tagList = new ListView({
        dataSource: tagsByPerson[personId],
        fields: { text: 'name' },
        select: (e) => addTagToItem(personId, e)
    });
    
    const dialogContent = document.getElementById('tag-list');
    dialogContent.innerHTML = '';
    tagList.appendTo(dialogContent);
    
    tagDialog.show();
}

function addTagToItem(personId, event) {
    const personItem = document.querySelector(`[data-person-id="${personId}"]`);
    if (!personItem) return;
    
    const tagSpan = createTagElement(event.text, () => {
        removeTag(tagSpan);
    });
    
    const tagsContainer = personItem.querySelector('.tags-container');
    tagsContainer.appendChild(tagSpan);
    
    tagDialog.hide();
}

function createTagElement(tagText, onRemove) {
    const tag = document.createElement('span');
    tag.className = 'tag-badge';
    tag.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: #0078d7;
        color: white;
        padding: 4px 12px;
        border-radius: 16px;
        margin: 2px 4px;
        font-size: 12px;
    `;
    
    const label = document.createElement('span');
    label.textContent = tagText;
    tag.appendChild(label);
    
    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = '✕';
    deleteBtn.style.cssText = `
        cursor: pointer;
        font-weight: bold;
        margin-left: 4px;
    `;
    deleteBtn.addEventListener('click', onRemove);
    tag.appendChild(deleteBtn);
    
    return tag;
}

function removeTag(tagElement) {
    tagElement.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => tagElement.remove(), 300);
}
```

### Advanced Tag Template

```typescript
// Enhanced template with tag display area
const advancedTemplate = `
    <div class="list-item-with-tags" data-person-id="${'${Id}'}">
        <div class="item-header">
            <span class="person-name">${'${Name}'}</span>
            <button class="add-tag-btn" data-id="${'${Id}'}">+ Add Tag</button>
        </div>
        <div class="tags-container"></div>
    </div>
`;

// CSS for tags container
const styles = `
    .list-item-with-tags {
        padding: 12px;
        border-bottom: 1px solid #e0e0e0;
    }
    
    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
    }
    
    .person-name {
        font-weight: 600;
        font-size: 14px;
    }
    
    .add-tag-btn {
        padding: 4px 12px;
        background: #f0f0f0;
        border: 1px solid #d0d0d0;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
    }
    
    .add-tag-btn:hover {
        background: #e8e8e8;
    }
    
    .tags-container {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        min-height: 20px;
    }
    
    .tag-badge {
        animation: slideIn 0.3s ease-out;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = styles;
document.head.appendChild(styleSheet);
```

### Tag Persistence

```typescript
// Save tags to localStorage
function saveTagsToStorage(personId, tags) {
    const allTags = JSON.parse(localStorage.getItem('person-tags') || '{}');
    allTags[personId] = tags;
    localStorage.setItem('person-tags', JSON.stringify(allTags));
}

// Load tags from localStorage
function loadTagsFromStorage(personId) {
    const allTags = JSON.parse(localStorage.getItem('person-tags') || '{}');
    return allTags[personId] || [];
}

// Restore tags when ListView loads
function restoreSavedTags() {
    peopleData.forEach(person => {
        const savedTags = loadTagsFromStorage(person.Id);
        const personItem = document.querySelector(`[data-person-id="${person.Id}"]`);
        
        if (personItem && savedTags.length > 0) {
            const tagsContainer = personItem.querySelector('.tags-container');
            savedTags.forEach(tag => {
                const tagElement = createTagElement(tag, () => {
                    removeTag(tagElement);
                    updateSavedTags(person.Id);
                });
                tagsContainer.appendChild(tagElement);
            });
        }
    });
}
```
