# Moving Panels Programmatically

## Table of Contents
- [Overview](#overview)
- [movePanel Method](#movepanel-method)
- [Basic Usage](#basic-usage)
- [Practical Examples](#practical-examples)
- [Combining with Other Methods](#combining-with-other-methods)

---

## Overview

The `movePanel()` method allows you to programmatically reposition panels in the dashboard layout without user interaction. This is useful for:

- Reorganizing layout based on user preferences
- Creating custom layout templates
- Restoring saved layouts
- Implementing layout algorithms

Unlike drag-and-drop (which involves user interaction), `movePanel()` provides direct programmatic control over panel positioning.

---

## movePanel Method

**Signature:** `movePanel(id: string, row: number, col: number): void`

Move a panel to a specific row and column position.

**Parameters:**
- `id` (string): Panel identifier
- `row` (number): Target row position (0-indexed)
- `col` (number): Target column position (0-indexed)

**Returns:** void

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    panels: [
        { 'id': 'panel_1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'panel_2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' }
    ]
});
dashboard.appendTo('#dashboard');

// Move panel_1 to row 1, column 2
dashboard.movePanel('panel_1', 1, 2);
```

---

## Basic Usage

### Moving a Single Panel

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    panels: [
        { 'id': 'sales', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, header: 'Sales', content: '<div>Sales Chart</div>' },
        { 'id': 'revenue', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, header: 'Revenue', content: '<div>Revenue Chart</div>' },
        { 'id': 'metrics', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 4, header: 'Metrics', content: '<div>Key Metrics</div>' }
    ]
});
dashboard.appendTo('#dashboard');

// Move sales panel to bottom-left
dashboard.movePanel('sales', 2, 0);
```

### Moving with Layout Updates

```typescript
// Get current layout
const layout = dashboard.serialize();

// Find and move a panel
const panelToMove = layout.find(p => p.id === 'panel_1');
if (panelToMove) {
    panelToMove.row = 2;
    panelToMove.col = 3;
}

// Update all panels
dashboard.panels = layout;
dashboard.refresh();
```

---

## Practical Examples

### Example 1: Swap Two Panels

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 6,
    panels: [
        { 'id': 'panel_1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, header: 'Panel 1', content: '<div>Content 1</div>' },
        { 'id': 'panel_2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, header: 'Panel 2', content: '<div>Content 2</div>' }
    ]
});
dashboard.appendTo('#dashboard');

const swapBtn = new Button({ content: 'Swap Panels' });
swapBtn.appendTo('#swap-btn');

document.getElementById('swap-btn').addEventListener('click', () => {
    // Get current positions
    const layout = dashboard.serialize();
    const p1 = layout.find(p => p.id === 'panel_1');
    const p2 = layout.find(p => p.id === 'panel_2');
    
    if (p1 && p2) {
        // Swap positions
        const tempRow = p1.row;
        const tempCol = p1.col;
        
        p1.row = p2.row;
        p1.col = p2.col;
        
        p2.row = tempRow;
        p2.col = tempCol;
        
        // Apply changes
        dashboard.panels = layout;
    }
});
```

**Output:** Clicking the button swaps panel_1 and panel_2 positions.

---

### Example 2: Priority-Based Layout Reorganization

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

const dashboard = new DashboardLayout({
    columns: 6,
    panels: [
        { 'id': 'sales', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, header: 'Sales', content: '<div>Sales</div>' },
        { 'id': 'revenue', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, header: 'Revenue', content: '<div>Revenue</div>' },
        { 'id': 'users', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 4, header: 'Users', content: '<div>Users</div>' },
        { 'id': 'analytics', 'sizeX': 2, 'sizeY': 2, 'row': 1, 'col': 0, header: 'Analytics', content: '<div>Analytics</div>' }
    ]
});
dashboard.appendTo('#dashboard');

// Priority dropdown
const priorityDropdown = new DropDownList({
    dataSource: [
        { text: 'Default', value: 'default' },
        { text: 'Focus on Sales', value: 'sales' },
        { text: 'Focus on Revenue', value: 'revenue' }
    ],
    fields: { text: 'text', value: 'value' },
    change: (e) => {
        reorganizeByPriority(e.value);
    }
});
priorityDropdown.appendTo('#priority-select');

function reorganizeByPriority(priority) {
    const layout = dashboard.serialize();
    
    // Define priority positions
    const positions = {
        sales: { id: 'sales', row: 0, col: 0 },
        revenue: { id: 'revenue', row: 0, col: 2 },
        users: { id: 'users', row: 0, col: 4 },
        analytics: { id: 'analytics', row: 1, col: 0 }
    };
    
    if (priority === 'default') {
        // Keep original order (already set above)
    } else if (priority === 'sales') {
        // Move sales to top-left, push others down
        dashboard.movePanel('sales', 0, 0);
        dashboard.movePanel('revenue', 0, 2);
        dashboard.movePanel('users', 1, 0);
        dashboard.movePanel('analytics', 1, 2);
    } else if (priority === 'revenue') {
        // Move revenue to top-left
        dashboard.movePanel('revenue', 0, 0);
        dashboard.movePanel('sales', 0, 2);
        dashboard.movePanel('analytics', 1, 0);
        dashboard.movePanel('users', 1, 2);
    }
}
```

**Output:** Dropdown reorganizes panels based on selected priority.

---

### Example 3: Row-Based Reorganization

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';
import { NumericTextBox } from '@syncfusion/ej2-inputs';

const dashboard = new DashboardLayout({
    columns: 6,
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, header: 'Panel 1', content: '<div>Content 1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, header: 'Panel 2', content: '<div>Content 2</div>' },
        { 'id': 'p3', 'sizeX': 2, 'sizeY': 2, 'row': 1, 'col': 0, header: 'Panel 3', content: '<div>Content 3</div>' }
    ]
});
dashboard.appendTo('#dashboard');

// Row number input
const rowInput = new NumericTextBox({
    min: 0,
    max: 10,
    value: 0
});
rowInput.appendTo('#row-input');

// Column number input
const colInput = new NumericTextBox({
    min: 0,
    max: 5,
    value: 0
});
colInput.appendTo('#col-input');

// Panel ID input
const panelIdInput = document.getElementById('panel-id');

// Move button
const moveBtn = new Button({ content: 'Move Panel' });
moveBtn.appendTo('#move-btn');

document.getElementById('move-btn').addEventListener('click', () => {
    const panelId = panelIdInput.value;
    const row = rowInput.value;
    const col = colInput.value;
    
    if (panelId && row >= 0 && col >= 0) {
        dashboard.movePanel(panelId, row, col);
    }
});
```

**Output:** Input panel ID, row, and column, then move the panel to that position.

---

### Example 4: Restore Layout from Saved State

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 6,
    panels: [
        { 'id': 'panel_1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, header: 'Panel 1', content: '<div>Content 1</div>' },
        { 'id': 'panel_2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, header: 'Panel 2', content: '<div>Content 2</div>' }
    ]
});
dashboard.appendTo('#dashboard');

// Save layout button
const saveBtn = new Button({ content: 'Save Layout' });
saveBtn.appendTo('#save-layout');

document.getElementById('save-layout').addEventListener('click', () => {
    const layout = dashboard.serialize();
    localStorage.setItem('dashboardLayout', JSON.stringify(layout));
    console.log('Layout saved');
});

// Restore layout button
const restoreBtn = new Button({ content: 'Restore Layout' });
restoreBtn.appendTo('#restore-layout');

document.getElementById('restore-layout').addEventListener('click', () => {
    const saved = localStorage.getItem('dashboardLayout');
    if (saved) {
        const layout = JSON.parse(saved);
        
        // Move each panel to saved position
        layout.forEach(panel => {
            dashboard.movePanel(panel.id, panel.row, panel.col);
        });
        
        console.log('Layout restored');
    }
});
```

**Output:** Save/restore complete panel layout including positions.

---

### Example 5: Column-Based Arrangement

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 6,
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, header: 'P1', content: '<div>1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, header: 'P2', content: '<div>2</div>' },
        { 'id': 'p3', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 4, header: 'P3', content: '<div>3</div>' },
        { 'id': 'p4', 'sizeX': 2, 'sizeY': 2, 'row': 1, 'col': 0, header: 'P4', content: '<div>4</div>' }
    ]
});
dashboard.appendTo('#dashboard');

const arrangeBtn = new Button({ content: 'Arrange in Columns' });
arrangeBtn.appendTo('#arrange-btn');

document.getElementById('arrange-btn').addEventListener('click', () => {
    // Arrange panels vertically by columns
    dashboard.movePanel('p1', 0, 0);
    dashboard.movePanel('p4', 1, 0);
    dashboard.movePanel('p2', 0, 2);
    dashboard.movePanel('p3', 0, 4);
});
```

**Output:** Rearrange panels in a column-based layout on button click.

---

## Combining with Other Methods

### Using movePanel with updatePanel

```typescript
const dashboard = new DashboardLayout({
    columns: 6,
    panels: [
        { 'id': 'panel_1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, header: 'Panel 1', content: '<div>Content</div>' }
    ]
});
dashboard.appendTo('#dashboard');

// Update panel content AND move it
const updatedPanel = {
    'id': 'panel_1',
    'sizeX': 3,
    'sizeY': 3,
    'row': 1,
    'col': 1,
    header: 'Updated Panel',
    content: '<div>New Content</div>'
};

dashboard.updatePanel(updatedPanel);
dashboard.movePanel('panel_1', 1, 1);
```

### Using movePanel with serialize

```typescript
// Get current layout
const currentLayout = dashboard.serialize();

// Modify positions programmatically
currentLayout.forEach((panel, index) => {
    panel.row = Math.floor(index / 3) * 2;
    panel.col = (index % 3) * 2;
});

// Apply all changes at once
dashboard.panels = currentLayout;

// Or use movePanel for specific panels
currentLayout.forEach(panel => {
    dashboard.movePanel(panel.id, panel.row, panel.col);
});
```

---

## Best Practices

1. **Validate positions**: Ensure row and col values are valid for your column count
2. **Handle panel collisions**: movePanel may adjust positions if collisions occur
3. **Use after dynamic additions**: Update movePanel calls when panels are added dynamically
4. **Combine with events**: Listen to change event when using movePanel
5. **Save before complex moves**: Use serialize() to backup layout before major reorganizations
6. **Test with floating enabled**: Behavior may differ when allowFloating is true

---

## See Also

- [Panel Configuration](./panel-configuration.md) - Configure panel properties
- [Panel Manipulation](./panel-manipulation.md) - Add/remove panels with addPanel() and removePanel()
- [Persistence and State](./persistence-and-state.md) - Save and restore layouts
- [API Reference - movePanel](./api-reference.md#movepanel) - Complete method signature and types
