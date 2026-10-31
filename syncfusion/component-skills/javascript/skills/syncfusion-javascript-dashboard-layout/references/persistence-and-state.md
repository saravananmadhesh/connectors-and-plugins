# Persistence and State Management

## Table of Contents
- [Saving Layout with serialize()](#saving-layout-with-serialize)
- [Restoring Layouts](#restoring-layouts)
- [State Persistence](#state-persistence)
- [localStorage Integration](#localstorage-integration)
- [Examples](#examples)

## Saving Layout with serialize()

The `serialize()` method returns the current panel layout configuration as an array of panel models:

### Basic Serialization

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

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

### Serialized Output Example

```javascript
[
    {
        "id": "p1",
        "sizeX": 2,
        "sizeY": 2,
        "row": 0,
        "col": 0,
        // ... other panel properties
    },
    {
        "id": "p2",
        "sizeX": 2,
        "sizeY": 2,
        "row": 0,
        "col": 2,
        // ... other panel properties
    }
]
```

### What serialize() Captures

The serialize() method captures:
- Panel position: `row`, `col`
- Panel size: `sizeX`, `sizeY`
- Panel id
- All other panel properties except `content`

**Note:** `content` is NOT serialized because it often contains DOM references or HTML.

## Restoring Layouts

### Basic Restore

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [...]
});

dashboard.appendTo('#dashboard');

// Save layout
const savedLayout = dashboard.serialize();

// Later: Restore layout
dashboard.panels = savedLayout;
```

### Restore with Content

Since content is not serialized, you need to restore it manually:

```typescript
let savedLayout = null;

const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'id': 'p1', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0, content: '<div>Panel 1</div>' },
        { 'id': 'p2', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 2, content: '<div>Panel 2</div>' }
    ]
});

dashboard.appendTo('#dashboard');

function saveLayout() {
    savedLayout = {
        layout: dashboard.serialize(),
        content: {}
    };
    
    // Save content for each panel
    dashboard.panels.forEach(panel => {
        savedLayout.content[panel.id] = panel.content;
    });
    
    console.log('Layout and content saved');
}

function restoreLayout() {
    if (savedLayout) {
        // Restore layout
        dashboard.panels = savedLayout.layout;
        
        // Restore content
        dashboard.panels.forEach(panel => {
            if (savedLayout.content[panel.id]) {
                panel.content = savedLayout.content[panel.id];
            }
        });
        
        console.log('Layout and content restored');
    }
}

document.getElementById('save-btn').addEventListener('click', saveLayout);
document.getElementById('restore-btn').addEventListener('click', restoreLayout);
```

## State Persistence

Enable automatic state persistence to save panel positions to the browser's localStorage:

### Enable Persistence

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    enablePersistence: true,  // Automatically save/restore state
    panels: [...]
});

dashboard.appendTo('#dashboard');
```

### How Persistence Works

When `enablePersistence` is true:
- Panel positions, sizes, and arrangement are automatically saved to `localStorage`
- When the page reloads, the saved state is automatically restored
- Stored under the dashboard element's ID (e.g., `#dashboard`)

### Accessing Persisted Data

```typescript
const dashboard = new DashboardLayout({
    id: 'my-dashboard',
    columns: 5,
    enablePersistence: true,
    panels: [...]
});

dashboard.appendTo('#my-dashboard');

// Access persisted state from localStorage
const persistedState = localStorage.getItem('my-dashboard');
console.log('Persisted state:', persistedState);
```

### Clear Persisted State

```typescript
// Clear persistence for specific dashboard
localStorage.removeItem('my-dashboard');

// Clear all localStorage
localStorage.clear();
```

## localStorage Integration

Manually integrate with localStorage for advanced state management:

### Save to localStorage

```typescript
const dashboard = new DashboardLayout({
    columns: 5,
    panels: [...]
});

dashboard.appendTo('#dashboard');

function saveToLocalStorage() {
    const state = {
        layout: dashboard.serialize(),
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    
    localStorage.setItem('dashboardState', JSON.stringify(state));
    console.log('State saved to localStorage');
}

document.getElementById('save-btn').addEventListener('click', saveToLocalStorage);
```

### Load from localStorage

```typescript
function loadFromLocalStorage() {
    const saved = localStorage.getItem('dashboardState');
    
    if (saved) {
        try {
            const state = JSON.parse(saved);
            dashboard.panels = state.layout;
            console.log('State restored from localStorage');
        } catch (error) {
            console.error('Error parsing saved state:', error);
        }
    } else {
        console.log('No saved state found');
    }
}

// Load on page load
window.addEventListener('load', loadFromLocalStorage);
```

### Multiple Saves (History)

```typescript
const MAX_SAVES = 5;

function saveLayoutVersion() {
    const versions = JSON.parse(localStorage.getItem('dashboardVersions') || '[]');
    
    const newVersion = {
        layout: dashboard.serialize(),
        timestamp: new Date().toISOString()
    };
    
    versions.push(newVersion);
    
    // Keep only last 5 versions
    if (versions.length > MAX_SAVES) {
        versions.shift();
    }
    
    localStorage.setItem('dashboardVersions', JSON.stringify(versions));
    console.log(`Layout version ${versions.length} saved`);
}

function restoreLayoutVersion(versionIndex) {
    const versions = JSON.parse(localStorage.getItem('dashboardVersions') || '[]');
    
    if (versions[versionIndex]) {
        dashboard.panels = versions[versionIndex].layout;
        console.log(`Restored version ${versionIndex + 1}`);
    }
}
```

## Examples

### Example 1: Save and Restore with Buttons

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

let restoreModel = null;

const dashboard = new DashboardLayout({
    columns: 5,
    panels: [
        { 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0, content: '<div>0</div>' },
        { 'sizeX': 3, 'sizeY': 2, 'row': 0, 'col': 1, content: '<div>1</div>' },
        { 'sizeX': 1, 'sizeY': 3, 'row': 0, 'col': 4, content: '<div>2</div>' }
    ]
});

dashboard.appendTo('#dashboard_default');

const saveBtn = new Button({ cssClass: 'e-primary', content: 'Save' });
saveBtn.appendTo('#save');

const restoreBtn = new Button({ cssClass: 'e-flat e-outline', content: 'Restore' });
restoreBtn.appendTo('#restore');

document.getElementById('save').addEventListener('click', () => {
    restoreModel = dashboard.serialize();
    console.log('Layout saved');
});

document.getElementById('restore').addEventListener('click', () => {
    if (restoreModel) {
        dashboard.panels = restoreModel;
        console.log('Layout restored');
    }
});
```

### Example 2: Auto-Save to localStorage

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';

const STORAGE_KEY = 'dashboardLayout';
const AUTO_SAVE_INTERVAL = 5000;  // Save every 5 seconds

const dashboard = new DashboardLayout({
    columns: 5,
    panels: [...]
});

dashboard.appendTo('#dashboard');

// Load saved layout on startup
function loadLayout() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
        try {
            const layout = JSON.parse(saved);
            dashboard.panels = layout;
            console.log('Layout loaded from localStorage');
        } catch (error) {
            console.error('Error loading layout:', error);
        }
    }
}

// Save layout periodically
function autoSave() {
    const layout = dashboard.serialize();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    console.log('Layout auto-saved');
}

// Initialize
loadLayout();
setInterval(autoSave, AUTO_SAVE_INTERVAL);
```

### Example 3: State Persistence with Version Control

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 5,
    enablePersistence: true,  // Auto-save to localStorage
    panels: [...]
});

dashboard.appendTo('#dashboard');

// Manual version control
function createSnapshot() {
    const snapshots = JSON.parse(localStorage.getItem('snapshots') || '[]');
    
    snapshots.push({
        id: Date.now(),
        name: `Snapshot ${snapshots.length + 1}`,
        layout: dashboard.serialize(),
        timestamp: new Date().toLocaleString()
    });
    
    localStorage.setItem('snapshots', JSON.stringify(snapshots));
    updateSnapshotList();
}

function restoreSnapshot(snapshotId) {
    const snapshots = JSON.parse(localStorage.getItem('snapshots') || '[]');
    const snapshot = snapshots.find(s => s.id === snapshotId);
    
    if (snapshot) {
        dashboard.panels = snapshot.layout;
        console.log(`Restored: ${snapshot.name}`);
    }
}

function updateSnapshotList() {
    const snapshots = JSON.parse(localStorage.getItem('snapshots') || '[]');
    const list = document.getElementById('snapshot-list');
    list.innerHTML = '';
    
    snapshots.forEach(snapshot => {
        const btn = document.createElement('button');
        btn.textContent = `${snapshot.name} (${snapshot.timestamp})`;
        btn.onclick = () => restoreSnapshot(snapshot.id);
        list.appendChild(btn);
    });
}

// Setup buttons
const snapshotBtn = new Button({ content: 'Create Snapshot' });
snapshotBtn.appendTo('#snapshot-btn');

document.getElementById('snapshot-btn').addEventListener('click', createSnapshot);

// Load snapshots on page load
updateSnapshotList();
```

### Example 4: JSON Export/Import

```typescript
import { DashboardLayout } from '@syncfusion/ej2-layouts';
import { Button } from '@syncfusion/ej2-buttons';

const dashboard = new DashboardLayout({
    columns: 5,
    panels: [...]
});

dashboard.appendTo('#dashboard');

// Export layout as JSON
const exportBtn = new Button({ content: 'Export Layout' });
exportBtn.appendTo('#export-btn');

document.getElementById('export-btn').addEventListener('click', () => {
    const layout = dashboard.serialize();
    const json = JSON.stringify(layout, null, 2);
    
    // Create download
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dashboard-layout-${Date.now()}.json`;
    link.click();
});

// Import layout from JSON
const importBtn = new Button({ content: 'Import Layout' });
importBtn.appendTo('#import-btn');

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.json';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

document.getElementById('import-btn').addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const layout = JSON.parse(event.target.result);
                dashboard.panels = layout;
                console.log('Layout imported successfully');
            } catch (error) {
                console.error('Error importing layout:', error);
            }
        };
        reader.readAsText(file);
    }
});
```

## Next Steps

- **Configure responsive layouts**: See [floating-and-responsive.md](floating-and-responsive.md)
- **Handle events**: See [events-handling.md](events-handling.md)
- **Manage panels dynamically**: See [panel-manipulation.md](panel-manipulation.md)
- **Complete API reference**: See [api-reference.md](api-reference.md)
