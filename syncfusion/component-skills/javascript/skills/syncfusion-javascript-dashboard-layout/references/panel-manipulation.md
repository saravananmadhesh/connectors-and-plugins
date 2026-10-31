# Panel Manipulation

## Table of Contents
- [Adding Panels Dynamically](#adding-panels-dynamically)
- [Removing Panels](#removing-panels)
- [Removing All Panels](#removing-all-panels)
- [Serializing Layout](#serializing-layout)
- [Panel Access and Updates](#panel-access-and-updates)
- [Examples](#examples)

## Adding Panels Dynamically

Use the `addPanel()` method to add panels at runtime:

### Basic Add Panel

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'panel_1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' }
    ]
});

dashboard.appendTo('#dashboard');

// Add a new panel
const newPanel = {
    'id': 'panel_2',
    'sizeX': 2,
    'sizeY': 2,
    'row': 0,
    'col': 2,
    content: '<div>Panel 2 (Added Dynamically)</div>'
};

dashboard.addPanel(newPanel);
```

### Add Panel with All Properties

```typescript
const newPanel = {
    'id': 'dynamic_panel',
    'sizeX': 3,
    'sizeY': 2,
    'row': 1,
    'col': 0,
    'header': '<h4>Dynamically Added Panel</h4>',
    'content': '<div class="panel-content">This panel was added at runtime</div>',
    'cssClass': 'dynamic-panel-style',
    'minSizeX': 1,
    'maxSizeX': 4,
    'minSizeY': 1,
    'maxSizeY': 3
};

dashboard.addPanel(newPanel);
```

### Sequential Panel Addition

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    panels: []  // Start with empty panels
});

dashboard.appendTo('#dashboard');

// Add panels one by one
let panelCount = 0;

function addNewPanel() {
    panelCount++;
    const panel = {
        'id': `panel_${panelCount}`,
        'sizeX': 2,
        'sizeY': 2,
        'row': Math.floor((panelCount - 1) / 3) * 2,
        'col': ((panelCount - 1) % 3) * 2,
        'header': `Panel ${panelCount}`,
        content: `<div>Panel ${panelCount} Content</div>`
    };
    
    dashboard.addPanel(panel);
}

// Add 5 panels
for (let i = 0; i < 5; i++) {
    addNewPanel();
}
```

## Removing Panels

Use the `removePanel()` method to remove a panel by its ID:

### Basic Remove Panel

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'panel_1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'panel_2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');

// Remove panel_1
dashboard.removePanel('panel_1');
```

### Remove with Confirmation

```typescript
function removePanelWithConfirmation(dashboard, panelId) {
    if (confirm(`Remove panel ${panelId}?`)) {
        dashboard.removePanel(panelId);
        console.log(`Panel ${panelId} removed`);
    }
}

// Usage
removePanelWithConfirmation(dashboard, 'panel_1');
```

### Remove on Button Click

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'removable_panel', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Remove me</div>' }
    ]
});

dashboard.appendTo('#dashboard');

const removeBtn = new Button({ content: 'Remove Panel' });
removeBtn.appendTo('#remove-btn');

document.getElementById('remove-btn').addEventListener('click', () => {
    dashboard.removePanel('removable_panel');
});
```

## Removing All Panels

Use the `removeAll()` method to clear all panels from the dashboard:

### Clear Dashboard

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' },
        { 'id': 'p3', 'sizeX': 2, 'sizeY': 2, 'row': 1, 'col': 0, content: '<div>Panel 3</div>' }
    ]
});

dashboard.appendTo('#dashboard');

// Remove all panels
dashboard.removeAll();
console.log('All panels removed');
```

### Reset Dashboard

```typescript
function resetDashboard(dashboard, defaultPanels) {
    dashboard.removeAll();
    
    defaultPanels.forEach(panel => {
        dashboard.addPanel(panel);
    });
}

const defaultLayout = [
    { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Default 1</div>' },
    { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Default 2</div>' }
];

// Later: reset to defaults
resetDashboard(dashboard, defaultLayout);
```

## Serializing Layout

Use the `serialize()` method to get the current layout configuration:

### Basic Serialization

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');

// Get current layout
const currentLayout = dashboard.serialize();
console.log('Current Layout:', currentLayout);
```

### Save to LocalStorage

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [...]
});

dashboard.appendTo('#dashboard');

// Save layout
function saveLayout() {
    const layout = dashboard.serialize();
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    console.log('Layout saved');
}

// Restore layout
function restoreLayout() {
    const savedLayout = localStorage.getItem('dashboardLayout');
    if (savedLayout) {
        const layout = JSON.parse(savedLayout);
        dashboard.panels = layout;
        console.log('Layout restored');
    }
}

// Save on button click
document.getElementById('save-btn').addEventListener('click', saveLayout);
document.getElementById('restore-btn').addEventListener('click', restoreLayout);
```

### Export Layout to JSON

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [...]
});

dashboard.appendTo('#dashboard');

function exportLayout() {
    const layout = dashboard.serialize();
    const json = JSON.stringify(layout, null, 2);
    
    // Download as file
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'dashboard-layout.json';
    link.click();
}

document.getElementById('export-btn').addEventListener('click', exportLayout);
```

## Panel Access and Updates

### Access Current Panels

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' }
    ]
});

dashboard.appendTo('#dashboard');

// Access panels array
const allPanels = dashboard.panels;
console.log('Total panels:', allPanels.length);

// Find specific panel
const panel1 = allPanels.find(p => p.id === 'p1');
console.log('Panel 1:', panel1);
```

### Update Panel Content

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'content_panel', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div id="panel-content">Initial</div>' }
    ]
});

dashboard.appendTo('#dashboard');

// Update panel content
function updatePanelContent(panelId, newContent) {
    const panel = dashboard.panels.find(p => p.id === panelId);
    if (panel) {
        panel.content = newContent;
        // Refresh dashboard to apply changes
        dashboard.refresh();
    }
}

updatePanelContent('content_panel', '<div>Updated Content</div>');
```

## Examples

### Example 1: Add/Remove Panels with UI Controls

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'Panel0', 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0, content: '<div>Panel 0</div>' }
    ]
});

dashboard.appendTo('#dashboard');

let panelCount = 1;
const panelIds = ['Panel0'];

// Size inputs
const sizeX = new NumericTextBox({ value: 2, min: 1, max: 5 });
sizeX.appendTo('#size-x');

const sizeY = new NumericTextBox({ value: 2, min: 1, max: 5 });
sizeY.appendTo('#size-y');

// Row and column inputs
const row = new NumericTextBox({ value: 0, min: 0 });
row.appendTo('#row');

const col = new NumericTextBox({ value: 2, min: 0, max: 4 });
col.appendTo('#col');

// Add panel button
const addBtn = new Button({ content: 'Add Panel' });
addBtn.appendTo('#add-btn');

document.getElementById('add-btn').addEventListener('click', () => {
    const newPanel = {
        'id': `Panel${panelCount}`,
        'sizeX': sizeX.value || 2,
        'sizeY': sizeY.value || 2,
        'row': row.value || 0,
        'col': col.value || 2,
        content: `<div>Panel ${panelCount}</div>`
    };
    
    dashboard.addPanel(newPanel);
    panelIds.push(newPanel.id);
    panelCount++;
});

// Remove panel button
const removeBtn = new Button({ content: 'Remove Panel' });
removeBtn.appendTo('#remove-btn');

const panelSelect = new DropDownList({
    dataSource: panelIds,
    fields: { text: 'id', value: 'id' }
});
panelSelect.appendTo('#panel-select');

document.getElementById('remove-btn').addEventListener('click', () => {
    const panelId = panelSelect.value;
    if (panelId) {
        dashboard.removePanel(panelId);
        panelIds.splice(panelIds.indexOf(panelId), 1);
        panelSelect.dataSource = panelIds;
        panelSelect.refresh();
    }
});
```

### Example 2: Save and Restore Layout

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');

let savedLayout = null;

// Save button
const saveBtn = new Button({ content: 'Save Layout' });
saveBtn.appendTo('#save-btn');

document.getElementById('save-btn').addEventListener('click', () => {
    savedLayout = dashboard.serialize();
    // Preserve content for each panel
    savedLayout.forEach((panel, index) => {
        panel.content = dashboard.panels[index].content;
    });
    console.log('Layout saved:', savedLayout);
});

// Restore button
const restoreBtn = new Button({ content: 'Restore Layout' });
restoreBtn.appendTo('#restore-btn');

document.getElementById('restore-btn').addEventListener('click', () => {
    if (savedLayout) {
        dashboard.panels = savedLayout;
        console.log('Layout restored');
    }
});

// Reset button
const resetBtn = new Button({ content: 'Reset to Default' });
resetBtn.appendTo('#reset-btn');

document.getElementById('reset-btn').addEventListener('click', () => {
    dashboard.removeAll();
    dashboard.addPanel({ 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' });
    dashboard.addPanel({ 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' });
});
```

### Example 3: Dynamic Panel Addition with Counter

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 6,
    panels: []
});

dashboard.appendTo('#dashboard');

let nextId = 1;

const addBtn = new Button({ content: 'Add New Widget' });
addBtn.appendTo('#add-widget-btn');

document.getElementById('add-widget-btn').addEventListener('click', () => {
    const panel = {
        'id': `widget_${nextId}`,
        'sizeX': 2,
        'sizeY': 2,
        'row': Math.floor((nextId - 1) / 3) * 2,
        'col': ((nextId - 1) % 3) * 2,
        'header': `Widget ${nextId}`,
        'cssClass': `widget-color-${nextId % 5}`,
        content: `
            <div class="widget-content">
                <h4>Widget ${nextId}</h4>
                <p>Added at ${new Date().toLocaleTimeString()}</p>
                <button onclick="removeWidget('widget_${nextId}')">Remove</button>
            </div>
        `
    };
    
    dashboard.addPanel(panel);
    nextId++;
});

window.removeWidget = function(panelId) {
    dashboard.removePanel(panelId);
};
```

## Next Steps

- **Save state automatically**: See [persistence-and-state.md](persistence-and-state.md)
- **Organize with floating**: See [floating-and-responsive.md](floating-and-responsive.md)
- **Handle events**: See [events-handling.md](events-handling.md)
- **Complete API reference**: See [api-reference.md](api-reference.md)
