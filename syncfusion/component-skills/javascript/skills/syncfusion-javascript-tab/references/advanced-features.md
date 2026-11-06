# Advanced Features

## Table of Contents
- [Drag and Drop](#drag-and-drop)
- [Tab Reordering](#tab-reordering)
- [Nested Tabs](#nested-tabs)
- [Collapsible Tabs](#collapsible-tabs)
- [Tab-Based Wizards](#tab-based-wizards)
- [Font Awesome Icons](#font-awesome-icons)
- [Tooltips](#tooltips)

## Drag and Drop

### Enable Drag and Drop

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    allowDragAndDrop: true,
    dragArea: '#container'  // Restrict drag area
});
tabObj.appendTo('#element');
```

### Drag and Drop Events

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    allowDragAndDrop: true,
    onDragStart: (args: DragEventArgs) => {
        // Prevent dragging specific tabs
        if (args.draggedIndex === 0) {
            args.cancel = true;
        }
    },
    dragging: (args: DragEventArgs) => {
        console.log('Dragging tab index:', args.draggedIndex);
    },
    dragged: (args: DragEventArgs) => {
        console.log('Dropped at position:', args.droppedIndex);
    }
});
tabObj.appendTo('#element');
```

### Example: Reorderable Tabs

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2' },
        { header: { 'text': 'Tab 3' }, content: 'Content 3' },
        { header: { 'text': 'Tab 4' }, content: 'Content 4' }
    ],
    allowDragAndDrop: true,
    dragArea: '#tabContainer',
    dragged: (args) => {
        console.log(`Tab moved from index ${args.draggedIndex} to ${args.droppedIndex}`);
    }
});
tabObj.appendTo('#tabContainer');
```

## Drag and Drop Between Tabs

Transfer items between two Tab instances:

```typescript
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Tab, DragEventArgs } from '@syncfusion/ej2-navigations';

let sourceTab: Tab = new Tab({
    items: [...sourceItems...],
    allowDragAndDrop: true,
    dragArea: '#container',
    onDragStart: (args: DragEventArgs) => {
        // Store reference for drop operation
        args.draggedItem.style.visibility = 'hidden';
    },
    dragged: onSourceTabDragged
});
sourceTab.appendTo('#sourceTab');

let destTab: Tab = new Tab({
    items: [...destItems...],
    allowDragAndDrop: true,
    dragArea: '#container'
});
destTab.appendTo('#destTab');

let dragItemIndex: number;
let dragItemContainer: HTMLElement;

function onSourceTabDragged(args: DragEventArgs) {
    // Check if dropped in different tab
    if (!isNullOrUndefined(args.target.closest('.e-tab')) && 
        !dragItemContainer.isSameNode(args.target.closest('.e-tab'))) {
        args.cancel = true;
        
        // Get source item
        let sourceItem = sourceTab.items[args.index];
        let dropIndex = getDropIndex(args);
        
        // Add to destination
        destTab.addTab([sourceItem], dropIndex);
        
        // Remove from source
        dragItemIndex = Array.prototype.indexOf.call(
            sourceTab.element.querySelectorAll('.e-toolbar-item'),
            args.draggedItem
        );
        sourceTab.removeTab(dragItemIndex);
    }
}

function getDropIndex(args: DragEventArgs): number {
    let dropItemContainer = args.target.closest('.e-toolbar-items');
    if (dropItemContainer) {
        let dropItem = args.target.closest('.e-toolbar-item');
        let items = Array.prototype.slice.call(dropItemContainer.querySelectorAll('.e-toolbar-item'));
        return items.indexOf(dropItem);
    }
    return destTab.items.length;
}
```

### Drag Items to External Source (TreeView)

Drag tab items and drop them into an external component like TreeView:

```typescript
import { Tab, DragEventArgs, TabItemModel } from '@syncfusion/ej2-navigations';
import { TreeView } from '@syncfusion/ej2-navigations';

let tabObj: Tab = new Tab({
    heightAdjustMode: 'Auto',
    dragArea: '#container',
    allowDragAndDrop: true,
    dragged: tabDragStop,
    items: [
        { header: { 'text': 'India' }, content: 'India content...' },
        { header: { 'text': 'Australia' }, content: 'Australia content...' },
        // ... more items
    ]
});
tabObj.appendTo('#draggableTab');

let data: { [key: string]: Object }[] = [
    { text: 'Item 1', id: 'item-1' },
    { text: 'Item 2', id: 'item-2' }
];

let treeViewInstance: TreeView = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'text' },
    cssClass: 'treeview-drop-target'
});
treeViewInstance.appendTo('#draggableTreeview');

function tabDragStop(args: DragEventArgs) {
    let dragTabIndex = Array.prototype.indexOf.call(
        tabObj.element.querySelectorAll('.e-toolbar-item'),
        args.draggedItem
    );
    let dragItem: TabItemModel = tabObj.items[dragTabIndex];
    let dropNode = args.target.closest('#draggableTreeview .e-list-item');
    
    if (dropNode && !args.target.closest('#draggableTab .e-toolbar-item')) {
        args.cancel = true;
        
        // Create new tree node from tab item
        let newNode = [{ id: 'tab-' + dragTabIndex, text: dragItem.header.text }];
        
        // Remove from tab and add to tree
        tabObj.removeTab(dragTabIndex);
        treeViewInstance.addNodes(newNode, 'Treeview', 0);
    }
}
```

### Drag Items from External Source (TreeView to Tab)

Drag items from an external source and drop them into the Tab:

```typescript
import { Tab, TabItemModel } from '@syncfusion/ej2-navigations';
import { TreeView, DragAndDropEventArgs } from '@syncfusion/ej2-navigations';

let tabObj: Tab = new Tab({
    heightAdjustMode: 'Auto',
    dragArea: '#container',
    items: [{ header: { 'text': 'Initial Tab' }, content: 'Initial content' }]
});
tabObj.appendTo('#targetTab');

let treeViewInstance: TreeView = new TreeView({
    fields: { dataSource: data, id: 'id', text: 'text' },
    dragArea: '#container',
    allowDragAndDrop: true,
    nodeDragStop: treeViewDragStop
});
treeViewInstance.appendTo('#sourceTreeview');

function treeViewDragStop(args: DragAndDropEventArgs) {
    // Check if dropped into Tab
    let tabElement = args.dropTarget?.closest('#targetTab');
    
    if (tabElement) {
        args.cancel = true;
        
        // Get node text and create tab item
        let nodeText = args.draggedNode?.textContent || 'New Tab';
        let newTabItem: TabItemModel = {
            header: { 'text': nodeText },
            content: `Content from ${nodeText}`
        };
        
        // Add to tab
        tabObj.addTab([newTabItem], tabObj.items.length);
        
        // Optionally remove from tree
        let nodeIds = args.draggedNodeData.map(node => node.id);
        treeViewInstance.removeNodes(nodeIds);
    }
}
```

## Tab Reordering

### Reorder Active Tab with reorderActiveTab Property

The `reorderActiveTab` property controls whether the active tab is reordered when you click on tab items in popup overflow mode. By default, the active tab is reordered when clicking tabs in the popup. When set to `false`, the active tab remains highlighted inside the popup without being reordered.

```typescript
import { Tab } from '@syncfusion/ej2-navigations';

let tabObj: Tab = new Tab({
    overflowMode: 'Popup',
    heightAdjustMode: 'Auto',
    reorderActiveTab: false,  // Prevent active tab from being reordered in popup
    items: [
        { header: { 'text': 'Tab 1' }, content: 'Content 1' },
        { header: { 'text': 'Tab 2' }, content: 'Content 2' },
        { header: { 'text': 'Tab 3' }, content: 'Content 3' },
        // ... more tabs
    ]
});
tabObj.appendTo('#element');
```

### Programmatic Tab Reordering

```typescript
// Move currently selected tab to new position
function moveTabToIndex(fromIndex: number, toIndex: number) {
    if (fromIndex === toIndex) return;
    
    let tab = tabObj.items[fromIndex];
    
    // Remove from current position
    tabObj.removeTab(fromIndex);
    
    // Add at new position
    tabObj.addTab([tab], toIndex);
}

// Usage
moveTabToIndex(2, 0);  // Move tab at index 2 to position 0
```

### Keyboard Shortcuts for Reordering

```typescript
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey) {
        if (event.key === 'ArrowLeft') {
            // Move current tab left
            let current = tabObj.selectedItem;
            if (current > 0) moveTabToIndex(current, current - 1);
        } else if (event.key === 'ArrowRight') {
            // Move current tab right
            let current = tabObj.selectedItem;
            if (current < tabObj.items.length - 1) moveTabToIndex(current, current + 1);
        }
    }
});
```

## Nested Tabs

### Create Nested Tab Structure

```typescript
let innerTab: Tab = new Tab({
    items: [
        { header: { 'text': 'Inner Tab 1' }, content: 'Inner content 1' },
        { header: { 'text': 'Inner Tab 2' }, content: 'Inner content 2' }
    ]
});

let outerTab: Tab = new Tab({
    items: [
        {
            header: { 'text': 'Outer Tab 1' },
            content: 'Simple content'
        },
        {
            header: { 'text': 'Outer Tab 2' },
            content: '<div id="nestedTab"></div>'
        },
        {
            header: { 'text': 'Outer Tab 3' },
            content: 'More content'
        }
    ]
});

outerTab.appendTo('#element');

// Initialize nested tab after outer tab is created
setTimeout(() => {
    let nestedElement = document.getElementById('nestedTab');
    if (nestedElement) {
        innerTab.appendTo(nestedElement);
    }
}, 100);
```

### HTML Structure for Nested Tabs

```html
<div id="outerTab">
    <div class="e-tab-header">
        <div>Tab 1</div>
        <div>Tab 2</div>
    </div>
    <div class="e-content">
        <div>Simple content</div>
        <div>
            <!-- Nested tabs container -->
            <div id="nestedTab">
                <div class="e-tab-header">
                    <div>Inner Tab 1</div>
                    <div>Inner Tab 2</div>
                </div>
                <div class="e-content">
                    <div>Inner content 1</div>
                    <div>Inner content 2</div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## Collapsible Tabs

### Create Collapsible Tab Component

```typescript
let tabObj: Tab = new Tab({
    items: [
        { header: { 'text': 'Section 1' }, content: 'Content 1' },
        { header: { 'text': 'Section 2' }, content: 'Content 2' },
        { header: { 'text': 'Section 3' }, content: 'Content 3' }
    ]
});
tabObj.appendTo('#collapsibleTabs');

// Track collapsed state
let collapsedTabs: Set<number> = new Set();

// Header click handler for collapse/expand
let headers = document.querySelectorAll('.e-toolbar-item');
headers.forEach((header, index) => {
    header.addEventListener('click', () => {
        if (collapsedTabs.has(index)) {
            // Expand
            collapsedTabs.delete(index);
            tabObj.select(index);
            header.classList.remove('collapsed');
        } else {
            // Collapse
            collapsedTabs.add(index);
            header.classList.add('collapsed');
            // Hide content
            let content = tabObj.element.querySelector(`[data-index="${index}"]`) as HTMLElement;
            if (content) content.style.display = 'none';
        }
    });
});
```

### Collapsible Tab Styling

```css
.e-toolbar-item.collapsed {
    background: #f0f0f0;
}

.e-toolbar-item.collapsed .e-tab-icon::after {
    content: '▶';  /* Collapsed indicator */
}

.e-toolbar-item:not(.collapsed) .e-tab-icon::after {
    content: '▼';  /* Expanded indicator */
}
```

## Tab-Based Wizards

### Create Multi-Step Wizard

```typescript
interface WizardStep {
    stepNumber: number;
    title: string;
    isValid?: () => boolean;
    onNext?: () => Promise<boolean>;
    onPrev?: () => void;
}

let steps: WizardStep[] = [
    {
        stepNumber: 1,
        title: 'Basic Information',
        isValid: () => validateStep1(),
        onNext: async () => {
            // Save step 1 data
            return await saveStep1Data();
        }
    },
    {
        stepNumber: 2,
        title: 'Contact Details',
        isValid: () => validateStep2(),
        onNext: async () => {
            return await saveStep2Data();
        }
    },
    {
        stepNumber: 3,
        title: 'Confirmation',
        isValid: () => validateStep3(),
        onNext: async () => {
            return await submitForm();
        }
    }
];

// Convert steps to tab items
let tabItems = steps.map((step, index) => ({
    header: { 'text': `${step.stepNumber}. ${step.title}` },
    content: `<div id="step-${step.stepNumber}"></div>`
}));

let wizardTab: Tab = new Tab({
    items: tabItems,
    selecting: async (args) => {
        let currentStep = steps[tabObj.selectedItem];
        
        // Validate before moving forward
        if (args.selectedIndex > tabObj.selectedItem) {
            if (!currentStep.isValid || !currentStep.isValid()) {
                args.cancel = true;
                alert('Please complete this step first');
                return;
            }
            
            // Call onNext handler
            if (currentStep.onNext) {
                let canProceed = await currentStep.onNext();
                if (!canProceed) {
                    args.cancel = true;
                }
            }
        } else if (args.selectedIndex < tabObj.selectedItem) {
            // Allow going back
            if (currentStep.onPrev) {
                currentStep.onPrev();
            }
        }
    }
});

wizardTab.appendTo('#wizard');

// Wizard controls
document.getElementById('nextBtn')?.addEventListener('click', () => {
    let current = wizardTab.selectedItem;
    if (current < steps.length - 1) {
        wizardTab.select(current + 1);
    }
});

document.getElementById('prevBtn')?.addEventListener('click', () => {
    let current = wizardTab.selectedItem;
    if (current > 0) {
        wizardTab.select(current - 1);
    }
});
```

## Font Awesome Icons

### Add Font Awesome to Tab

First, include Font Awesome in your HTML:

```html
<link rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

Then use icons in tabs:

```typescript
let tabObj: Tab = new Tab({
    items: [
        {
            header: { 
                'text': 'Settings',
                'iconCss': 'fas fa-cog'
            },
            content: 'Settings panel'
        },
        {
            header: { 
                'text': 'Users',
                'iconCss': 'fas fa-users'
            },
            content: 'Users list'
        },
        {
            header: { 
                'text': 'Reports',
                'iconCss': 'fas fa-chart-bar'
            },
            content: 'Reports dashboard'
        }
    ]
});
tabObj.appendTo('#element');
```

### Common Font Awesome Icons

| Icon | CSS Class |
|------|-----------|
| Home | `fas fa-home` |
| Settings | `fas fa-cog` |
| Users | `fas fa-users` |
| Bell | `fas fa-bell` |
| Mail | `fas fa-envelope` |
| Calendar | `fas fa-calendar` |
| Chart | `fas fa-chart-bar` |
| Download | `fas fa-download` |

## Tooltips

### Add Tooltips to Tab Headers

```typescript
import { Tooltip } from '@syncfusion/ej2-popups';

let tabObj: Tab = new Tab({
    items: [
        {
            header: { 'text': 'Tab 1' },
            content: 'Content 1'
        },
        {
            header: { 'text': 'Tab 2' },
            content: 'Content 2'
        }
    ]
});
tabObj.appendTo('#element');

// Initialize tooltip for headers
let tooltip = new Tooltip({
    content: 'Click to navigate',
    position: 'TopCenter',
    target: '.e-toolbar-item'
});
tooltip.appendTo('body');
```

### Tooltip with Dynamic Content

```typescript
let tabObj: Tab = new Tab({
    items: [...],
    created: () => {
        // Add tooltips after tab creation
        let headers = document.querySelectorAll('.e-toolbar-item');
        headers.forEach((header, index) => {
            let content = `Navigate to ${tabObj.items[index].header.text}`;
            header.setAttribute('title', content);
        });
    }
});

tabObj.appendTo('#element');

// Browser-native tooltip
```

---

**Related Topics:**
- [Tab Structure and Content](./tab-structure-and-content.md) - Basic tab configuration
- [Customization and Styling](./customization-and-styling.md) - Styling options
- [Data Binding](./data-binding.md) - Dynamic content loading
