# Use Case Examples

## Table of Contents
- [Chat Window Interface](#chat-window-interface)
- [Contact List with Groups](#contact-list-with-groups)
- [Todo App](#todo-app)
- [Dual List Box](#dual-list-box)
- [Mobile Navigation Menu](#mobile-navigation-menu)
- [Grid-Based Gallery](#grid-based-gallery)
- [File Explorer](#file-explorer)
- [Mobile Contact Layout](#mobile-contact-layout)
- [Autocomplete Search](#autocomplete-search)

## Chat Window Interface

### Basic Chat UI

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const chatMessages = [
    { id: '1', sender: 'John', message: 'Hello there!', time: '10:30 AM', avatar: 'J' },
    { id: '2', sender: 'You', message: 'Hi! How are you?', time: '10:31 AM', avatar: 'Y' },
    { id: '3', sender: 'John', message: 'I am doing great!', time: '10:32 AM', avatar: 'J' }
];

const chatListView = new ListView({
    dataSource: chatMessages,
    fields: { id: 'id', text: 'message' },
    height: '500px',
    enableVirtualization: true,
    template: `
        <div class="chat-message">
            <div class="chat-avatar">${avatar}</div>
            <div class="chat-content">
                <div class="chat-sender"><strong>${sender}</strong> <span class="time">${time}</span></div>
                <div class="chat-text">${message}</div>
            </div>
        </div>
    `
});

chatListView.appendTo('#chat-list');

// CSS
const chatCSS = `
    .chat-message {
        display: flex;
        padding: 10px;
        margin: 5px 0;
        border-radius: 8px;
        background-color: #f5f5f5;
    }

    .chat-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        font-weight: bold;
    }

    .chat-content {
        flex: 1;
    }

    .chat-sender {
        margin-bottom: 5px;
        font-size: 12px;
    }

    .time {
        color: #999;
        margin-left: 10px;
    }

    .chat-text {
        color: #333;
        line-height: 1.4;
    }
`;
```

### Add Message to Chat

```typescript
function addChatMessage(sender, message) {
    const newMessage = {
        id: Date.now().toString(),
        sender: sender,
        message: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        avatar: sender[0].toUpperCase()
    };

    chatMessages.push(newMessage);
    chatListView.addItem(newMessage);

    // Scroll to bottom
    const container = document.getElementById('chat-list');
    container.scrollTop = container.scrollHeight;
}

// Send message on Enter key
document.getElementById('message-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const message = e.target.value.trim();
        if (message) {
            addChatMessage('You', message);
            e.target.value = '';
        }
    }
});
```

## Contact List with Groups

### Grouped Contacts

```typescript
const contacts = [
    { id: '1', name: 'Alice Johnson', phone: '555-0101', group: 'Family' },
    { id: '2', name: 'Bob Smith', phone: '555-0102', group: 'Work' },
    { id: '3', name: 'Charlie Brown', phone: '555-0103', group: 'Friends' },
    { id: '4', name: 'Diana Prince', phone: '555-0104', group: 'Family' },
    { id: '5', name: 'Eve Davis', phone: '555-0105', group: 'Work' }
];

const contactListView = new ListView({
    dataSource: contacts,
    fields: {
        id: 'id',
        text: 'name',
        groupBy: 'group'
    },
    template: `
        <div class="contact-item">
            <div class="contact-avatar">${name[0]}</div>
            <div class="contact-info">
                <div class="contact-name">${name}</div>
                <div class="contact-phone">${phone}</div>
            </div>
        </div>
    `,
    groupTemplate: `
        <div class="contact-group">
            <strong>${group}</strong>
            <span class="group-count">${count}</span>
        </div>
    `
});

contactListView.appendTo('#contacts-list');

// CSS
const contactCSS = `
    .contact-item {
        display: flex;
        align-items: center;
        padding: 10px;
    }

    .contact-avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(45deg, #FF6B6B, #4ECDC4);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        margin-right: 15px;
    }

    .contact-info {
        flex: 1;
    }

    .contact-name {
        font-weight: 500;
        color: #333;
    }

    .contact-phone {
        font-size: 12px;
        color: #999;
        margin-top: 2px;
    }

    .contact-group {
        background-color: #f0f0f0;
        padding: 10px 15px;
        font-weight: bold;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .group-count {
        background-color: #007bff;
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 12px;
        margin-left: 10px;
    }
`;
```

## Todo App

### Todo List with Status

```typescript
interface TodoItem {
    id: string;
    title: string;
    completed: boolean;
    priority: 'high' | 'medium' | 'low';
    dueDate: string;
}

const todos: TodoItem[] = [
    { id: '1', title: 'Complete project', completed: false, priority: 'high', dueDate: '2024-01-20' },
    { id: '2', title: 'Review code', completed: true, priority: 'medium', dueDate: '2024-01-19' },
    { id: '3', title: 'Write documentation', completed: false, priority: 'low', dueDate: '2024-01-25' }
];

const todoListView = new ListView({
    dataSource: todos,
    fields: {
        id: 'id',
        text: 'title',
        isChecked: 'completed'
    },
    showCheckBox: true,
    template: `
        <div class="todo-item priority-${priority} ${completed ? 'completed' : ''}">
            <div class="todo-content">
                <span class="todo-title">${title}</span>
                <span class="todo-priority ${priority}">${priority}</span>
                <span class="todo-date">${dueDate}</span>
            </div>
        </div>
    `,
    select: (args) => {
        const todo = args.data as TodoItem;
        todo.completed = args.isChecked;
        updateTodo(todo);
    }
});

todoListView.appendTo('#todo-list');

function updateTodo(todo: TodoItem) {
    console.log('Todo updated:', todo);
    // Save to backend
}

// CSS
const todoCSS = `
    .todo-item {
        padding: 12px;
        border-left: 4px solid #FF9800;
        transition: all 0.2s;
    }

    .todo-item.priority-high {
        border-left-color: #f44336;
    }

    .todo-item.priority-medium {
        border-left-color: #FF9800;
    }

    .todo-item.priority-low {
        border-left-color: #4CAF50;
    }

    .todo-item.completed {
        opacity: 0.6;
        background-color: #f5f5f5;
    }

    .todo-item.completed .todo-title {
        text-decoration: line-through;
        color: #999;
    }

    .todo-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .todo-title {
        flex: 1;
    }

    .todo-priority {
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 11px;
        font-weight: bold;
        color: white;
    }

    .todo-priority.high { background-color: #f44336; }
    .todo-priority.medium { background-color: #FF9800; }
    .todo-priority.low { background-color: #4CAF50; }

    .todo-date {
        font-size: 12px;
        color: #999;
    }
`;
```

## Dual List Box

### Transfer Items Between Lists

```typescript
import { ListView, SelectedItem } from '@syncfusion/ej2-lists';
import { Button } from '@syncfusion/ej2-buttons';
import { DataManager, Query } from '@syncfusion/ej2-data';

const availableItems = [
    { id: '1', text: 'Hennessey Venom' },
    { id: '2', text: 'Bugatti Chiron' },
    { id: '3', text: 'Bugatti Veyron Super Sport' },
    { id: '4', text: 'SSC Ultimate Aero' },
    { id: '5', text: 'Koenigsegg CCR' },
    { id: '6', text: 'McLaren F1' }
];

const selectedItems = [];
let availableListData = [...availableItems];
let selectedListData = [...selectedItems];

const availableListView = new ListView({
    dataSource: availableListData,
    fields: { id: 'id', text: 'text' },
    showCheckBox: true,
    sortOrder: 'Ascending',
    select: onAvailableListSelect
});

const selectedListView = new ListView({
    dataSource: selectedListData,
    fields: { id: 'id', text: 'text' },
    showCheckBox: true,
    sortOrder: 'Ascending',
    select: onSelectedListSelect
});

availableListView.appendTo('#available-list');
selectedListView.appendTo('#selected-list');

// Buttons for list operations
let moveAllRightBtn = new Button({ disabled: false });
moveAllRightBtn.appendTo('#move-all-right');
let moveRightBtn = new Button({ disabled: true });
moveRightBtn.appendTo('#move-right');
let moveLeftBtn = new Button({ disabled: true });
moveLeftBtn.appendTo('#move-left');
let moveAllLeftBtn = new Button({ disabled: true });
moveAllLeftBtn.appendTo('#move-all-left');

function moveToSelected() {
    const checked = availableListView.getSelectedItems() as SelectedItem;
    selectedListData = selectedListData.concat(checked.data);
    selectedListView.dataSource = selectedListData;
    selectedListView.dataBind();
    
    // Remove from available
    checked.data.forEach((item: any) => {
        availableListData = availableListData.filter(a => a.id !== item.id);
    });
    availableListView.dataSource = availableListData;
    availableListView.dataBind();
    setButtonState();
}

function moveToAvailable() {
    const checked = selectedListView.getSelectedItems() as SelectedItem;
    availableListData = availableListData.concat(checked.data);
    availableListView.dataSource = availableListData;
    availableListView.dataBind();
    
    // Remove from selected
    checked.data.forEach((item: any) => {
        selectedListData = selectedListData.filter(s => s.id !== item.id);
    });
    selectedListView.dataSource = selectedListData;
    selectedListView.dataBind();
    setButtonState();
}

function moveAllToSelected() {
    selectedListData = selectedListData.concat(availableListData);
    selectedListView.dataSource = selectedListData;
    selectedListView.dataBind();
    
    availableListData = [];
    availableListView.removeMultipleItems(
        Array.prototype.slice.call(availableListView.element.querySelectorAll('.e-list-item'))
    );
    setButtonState();
}

function moveAllToAvailable() {
    availableListData = availableListData.concat(selectedListData);
    availableListView.dataSource = availableListData;
    availableListView.dataBind();
    
    selectedListData = [];
    selectedListView.removeMultipleItems(
        Array.prototype.slice.call(selectedListView.element.querySelectorAll('.e-list-item'))
    );
    setButtonState();
}

function onAvailableListSelect() {
    moveRightBtn.disabled = false;
}

function onSelectedListSelect() {
    moveLeftBtn.disabled = false;
}

function setButtonState() {
    if (availableListData.length) {
        moveAllRightBtn.disabled = false;
    } else {
        moveAllRightBtn.disabled = true;
        moveRightBtn.disabled = true;
    }
    
    if (selectedListData.length) {
        moveAllLeftBtn.disabled = false;
    } else {
        moveAllLeftBtn.disabled = true;
        moveLeftBtn.disabled = true;
    }
}

// Event listeners for buttons
moveAllRightBtn.element.addEventListener('click', moveAllToSelected);
moveRightBtn.element.addEventListener('click', moveToSelected);
moveLeftBtn.element.addEventListener('click', moveToAvailable);
moveAllLeftBtn.element.addEventListener('click', moveAllToAvailable);

// Filtering support
document.getElementById('available-filter')?.addEventListener('keyup', (e: any) => {
    const value = e.target.value;
    const data = new DataManager(availableItems).executeLocal(
        new Query().where('text', 'startswith', value, true)
    );
    availableListView.dataSource = !value ? availableListData : data;
    availableListView.dataBind();
});

document.getElementById('selected-filter')?.addEventListener('keyup', (e: any) => {
    const value = e.target.value;
    const data = new DataManager(selectedItems).executeLocal(
        new Query().where('text', 'startswith', value, true)
    );
    selectedListView.dataSource = !value ? selectedListData : data;
    selectedListView.dataBind();
});
```

### Dual List HTML Structure

```html
<div class="dual-list-container">
    <div class="list-section">
        <input type="text" id="available-filter" placeholder="Filter available items" class="e-input" />
        <div id="available-list" class="e-listview"></div>
    </div>
    
    <div class="button-section">
        <button id="move-all-right" class="e-btn">Move All >></button>
        <button id="move-right" class="e-btn">Move ></button>
        <button id="move-left" class="e-btn">< Move</button>
        <button id="move-all-left" class="e-btn"><< Move All</button>
    </div>
    
    <div class="list-section">
        <input type="text" id="selected-filter" placeholder="Filter selected items" class="e-input" />
        <div id="selected-list" class="e-listview"></div>
    </div>
</div>
```

### Dual List CSS Styling

```css
.dual-list-container {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.list-section {
    flex: 1;
}

.list-section input {
    width: 100%;
    margin-bottom: 10px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.list-section .e-listview {
    height: 400px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow-y: auto;
}

.button-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    min-width: 120px;
}

.button-section .e-btn {
    width: 100%;
    padding: 10px 5px;
    cursor: pointer;
}

.button-section .e-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
```

## Mobile Navigation Menu

### Hierarchical Menu

```typescript
const navigationData = [
    {
        text: 'Home',
        id: '1'
    },
    {
        text: 'Products',
        id: '2',
        child: [
            { text: 'Electronics', id: '2-1' },
            { text: 'Clothing', id: '2-2' },
            { text: 'Books', id: '2-3' }
        ]
    },
    {
        text: 'Services',
        id: '3',
        child: [
            { text: 'Consulting', id: '3-1' },
            { text: 'Support', id: '3-2' }
        ]
    },
    {
        text: 'Contact',
        id: '4'
    }
];

const navListView = new ListView({
    dataSource: navigationData,
    fields: {
        id: 'id',
        text: 'text',
        child: 'child'
    },
    template: '<span>${text}</span>',
    select: (args) => {
        if (args.data.child && args.data.child.length > 0) {
            navListView.dataSource = args.data.child;
            navListView.render();
            updateBreadcrumb(args.data);
        } else {
            navigateTo(args.data.text);
        }
    }
});

navListView.appendTo('#nav-menu');

function updateBreadcrumb(item) {
    document.getElementById('breadcrumb').textContent = item.text;
}

function navigateTo(page) {
    window.location.href = `/${page.toLowerCase()}`;
}
```

## Grid-Based Gallery

### Image Gallery

```typescript
const images = [
    { id: '1', title: 'Sunset', src: 'sunset.jpg', category: 'Nature' },
    { id: '2', title: 'Mountain', src: 'mountain.jpg', category: 'Nature' },
    { id: '3', title: 'City', src: 'city.jpg', category: 'Urban' },
    { id: '4', title: 'Beach', src: 'beach.jpg', category: 'Nature' }
];

const galleryListView = new ListView({
    dataSource: images,
    fields: { id: 'id', text: 'title', groupBy: 'category' },
    template: `
        <div class="gallery-item">
            <img src="images/${src}" alt="${title}" class="gallery-image" />
            <div class="gallery-overlay">${title}</div>
        </div>
    `
});

galleryListView.appendTo('#gallery');

// CSS
const galleryCSS = `
    .e-listview {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 15px;
        padding: 15px;
    }

    .gallery-item {
        position: relative;
        overflow: hidden;
        border-radius: 8px;
        aspect-ratio: 1;
    }

    .gallery-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
    }

    .gallery-item:hover .gallery-image {
        transform: scale(1.1);
    }

    .gallery-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        color: white;
        padding: 20px 10px 10px;
        opacity: 0;
        transition: opacity 0.3s;
    }

    .gallery-item:hover .gallery-overlay {
        opacity: 1;
    }
`;
```

## File Explorer

### Directory Navigation

```typescript
const fileSystem = [
    {
        text: 'Documents',
        id: '1',
        icon: 'e-icons e-folder',
        child: [
            { text: 'Resume.pdf', id: '1-1', icon: 'e-icons e-file-pdf' },
            { text: 'Cover Letter.doc', id: '1-2', icon: 'e-icons e-file-docx' }
        ]
    },
    {
        text: 'Pictures',
        id: '2',
        icon: 'e-icons e-folder',
        child: [
            { text: 'Vacation.jpg', id: '2-1', icon: 'e-icons e-file-image' },
            { text: 'Family.png', id: '2-2', icon: 'e-icons e-file-image' }
        ]
    }
];

class FileExplorer {
    private listView: ListView;
    private navigationStack = [fileSystem];
    private currentPath = [];

    constructor() {
        this.listView = new ListView({
            dataSource: fileSystem,
            fields: { id: 'id', text: 'text', child: 'child', iconCss: 'icon' },
            template: '<span class="${icon}"></span> ${text}',
            select: (args) => this.handleSelection(args)
        });
        this.listView.appendTo('#file-explorer');
    }

    private handleSelection(args) {
        if (args.data.child && args.data.child.length > 0) {
            this.currentPath.push(args.data.text);
            this.navigationStack.push(args.data.child);
            this.listView.dataSource = args.data.child;
            this.listView.render();
            this.updatePathDisplay();
        }
    }

    public goBack() {
        if (this.navigationStack.length > 1) {
            this.navigationStack.pop();
            this.currentPath.pop();
            this.listView.dataSource = this.navigationStack[this.navigationStack.length - 1];
            this.listView.render();
            this.updatePathDisplay();
        }
    }

    private updatePathDisplay() {
        const path = `Root > ${this.currentPath.join(' > ')}`;
        document.getElementById('path-display').textContent = path;
    }
}

const explorer = new FileExplorer();
document.getElementById('back-btn').addEventListener('click', () => explorer.goBack());
```

## Mobile Contact Layout

### Mobile Contact View with Avatar

```typescript
import { ListView } from '@syncfusion/ej2-lists';

interface Contact {
    id: string;
    text: string;
    contact: string;
    avatar: string;
    pic: string;
}

const contactData: Contact[] = [
    { id: '1', text: 'Jenifer', contact: '(206) 555-985774', avatar: '', pic: 'pic01' },
    { id: '2', text: 'Amenda', contact: '(206) 555-3412', avatar: 'A', pic: '' },
    { id: '3', text: 'Isabella', contact: '(206) 555-8122', avatar: '', pic: 'pic02' },
    { id: '4', text: 'William', contact: '(206) 555-9482', avatar: 'W', pic: '' },
    { id: '5', text: 'Jacob', contact: '(71) 555-4848', avatar: '', pic: 'pic04' },
    { id: '6', text: 'Matthew', contact: '(71) 555-7773', avatar: 'M', pic: '' },
    { id: '7', text: 'Oliver', contact: '(71) 555-5598', avatar: '', pic: 'pic03' },
    { id: '8', text: 'Charlotte', contact: '(206) 555-1189', avatar: 'C', pic: '' }
];

const contactTemplate = `
    <div class="e-list-wrapper e-list-multi-line e-list-avatar">
        \${if(avatar!=="")}
            <span class="e-avatar e-avatar-circle" style="background-color: \${getAvatarColor(text)}">\${avatar}</span>
        \${else}
            <span class="\${pic} e-avatar e-avatar-circle"></span>
        \${/if}
        <span class="e-list-item-header">\${text}</span>
        <span class="e-list-content">\${contact}</span>
    </div>
`;

const mobileContactListView = new ListView({
    dataSource: contactData,
    fields: { id: 'id', text: 'text' },
    width: '350px',
    showHeader: true,
    headerTitle: 'Contacts',
    cssClass: 'e-list-template',
    template: contactTemplate,
    sortOrder: 'Ascending',
    height: '100vh',
    select: (args) => handleContactSelect(args)
});

mobileContactListView.appendTo('#mobile-contact-list');

function getAvatarColor(name: string): string {
    const colors = ['#039be5', '#e91e63', '#009688', '#fbc02d', '#f57c00', '#7b1fa2'];
    const hash = name.charCodeAt(0) + name.charCodeAt(name.length - 1);
    return colors[hash % colors.length];
}

function handleContactSelect(args: any) {
    const contact = args.data as Contact;
    showContactDetails(contact);
}

function showContactDetails(contact: Contact) {
    const details = document.getElementById('contact-details');
    if (details) {
        details.innerHTML = `
            <div class="contact-detail-view">
                <div class="detail-avatar" style="background-color: \${getAvatarColor(contact.text)}">
                    \${contact.avatar || contact.text[0]}
                </div>
                <div class="detail-info">
                    <h3>\${contact.text}</h3>
                    <p class="detail-phone">📞 \${contact.contact}</p>
                    <div class="detail-actions">
                        <button class="call-btn">Call</button>
                        <button class="message-btn">Message</button>
                        <button class="email-btn">Email</button>
                    </div>
                </div>
            </div>
        `;
    }
}
```

### Mobile Contact View CSS

```css
/* Avatar Styles */
.e-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-right: 15px;
}

.e-avatar.e-avatar-circle {
    border-radius: 50%;
}

/* Contact Item Styles */
.e-list-wrapper {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #f0f0f0;
}

.e-list-wrapper.e-list-multi-line {
    flex-direction: row;
    align-items: center;
}

.e-list-item-header {
    font-weight: 500;
    color: #333;
    font-size: 16px;
}

.e-list-content {
    font-size: 14px;
    color: #666;
    margin-top: 2px;
}

/* Profile Picture Placeholder */
.pic01, .pic02, .pic03, .pic04 {
    width: 50px;
    height: 50px;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
}

.pic01 {
    background-image: url('url');
}

.pic02 {
    background-image: url('url');
}

.pic03 {
    background-image: url('url');
}

.pic04 {
    background-image: url('url');
}

/* Contact Detail View */
.contact-detail-view {
    padding: 20px;
    text-align: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    margin: 10px;
}

.detail-avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
}

.detail-info h3 {
    margin: 10px 0 5px 0;
    font-size: 24px;
}

.detail-phone {
    font-size: 16px;
    margin: 5px 0 15px 0;
}

/* Action Buttons */
.detail-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-top: 15px;
}

.call-btn, .message-btn, .email-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0.3);
    color: white;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
}

.call-btn:hover, .message-btn:hover, .email-btn:hover {
    background-color: rgba(255, 255, 255, 0.5);
}

/* Responsive Mobile Layout */
@media (max-width: 768px) {
    #mobile-contact-list {
        width: 100%;
        height: 100vh;
    }
    
    .contact-detail-view {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        border-radius: 8px 8px 0 0;
    }
}
```

### Mobile Contact HTML Structure

```html
<div class="mobile-contact-container">
    <div id="mobile-contact-list" style="width: 350px;"></div>
    <div id="contact-details" style="flex: 1; padding: 20px;"></div>
</div>

<!-- Optional: Search/Filter for contacts -->
<div class="contact-search">
    <input type="text" id="contact-search" placeholder="Search contacts..." class="e-input" />
</div>
```

### Search Contacts Functionality

```typescript
const contactSearchInput = document.getElementById('contact-search') as HTMLInputElement;
contactSearchInput?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (searchTerm.length > 0) {
        const filtered = contactData.filter(contact =>
            contact.text.toLowerCase().includes(searchTerm) ||
            contact.contact.includes(searchTerm)
        );
        mobileContactListView.dataSource = filtered;
        mobileContactListView.dataBind();
    } else {
        mobileContactListView.dataSource = contactData;
        mobileContactListView.dataBind();
    }
});

// Clear search on click
contactSearchInput?.addEventListener('focus', function() {
    if (this.value === '') {
        mobileContactListView.dataSource = contactData;
        mobileContactListView.dataBind();
    }
});
```

## Autocomplete Search

### Search with Suggestions

```typescript
const allItems = [
    { id: '1', text: 'Apple', category: 'Fruit' },
    { id: '2', text: 'Apricot', category: 'Fruit' },
    { id: '3', text: 'Banana', category: 'Fruit' },
    { id: '4', text: 'Orange', category: 'Fruit' },
    { id: '5', text: 'Application', category: 'Software' }
];

let searchListView = null;

document.getElementById('search-input').addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    if (searchTerm.length > 0) {
        const results = allItems.filter(item =>
            item.text.toLowerCase().includes(searchTerm)
        );

        if (!searchListView) {
            searchListView = new ListView({
                dataSource: results,
                fields: { id: 'id', text: 'text' },
                template: `
                    <div class="search-result">
                        <span class="result-text">${text}</span>
                        <span class="result-category">${category}</span>
                    </div>
                `,
                select: (args) => {
                    e.target.value = args.data.text;
                    searchListView = null;
                    document.getElementById('search-results').innerHTML = '';
                }
            });
            searchListView.appendTo('#search-results');
        } else {
            searchListView.dataSource = results;
            searchListView.render();
        }
    } else {
        if (searchListView) {
            document.getElementById('search-results').innerHTML = '';
            searchListView = null;
        }
    }
});

// CSS
const searchCSS = `
    .search-result {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
    }

    .result-text {
        flex: 1;
    }

    .result-category {
        font-size: 12px;
        color: #999;
        background: #f0f0f0;
        padding: 2px 8px;
        border-radius: 4px;
    }
`;
```

These use cases demonstrate ListView's versatility across different scenarios. Combine techniques from templates-rendering.md, selection-interactions.md, and data-binding.md for more complex implementations.
