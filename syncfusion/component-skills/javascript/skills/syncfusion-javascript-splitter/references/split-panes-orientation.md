# Split Panes and Orientation in Syncfusion TypeScript Splitter

## Table of Contents
- [Horizontal Layout](#horizontal-layout)
- [Vertical Layout](#vertical-layout)
- [Orientation Property](#orientation-property)
- [Separator Behavior](#separator-behavior)
- [Add or Remove Panes](#add-or-remove-panes)
- [Practical Examples](#practical-examples)

## Horizontal Layout

By default, the Splitter renders in **horizontal orientation**. The container is divided into panes arranged left-to-right with vertical separators between them.

### Default Horizontal Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Initialize Splitter control (horizontal is default)
let splitObject: Splitter = new Splitter({
    height: '250px',
    width: '600px',
    paneSettings: [
        { size: '200px' },
        { size: '200px' },
        { size: '200px' }
    ]
});

// Render initialized Splitter
splitObject.appendTo('#splitter');
```

### Horizontal HTML Markup

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Essential JS 2 Splitter - Horizontal</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>

<body>
    <div id="container">
        <!-- Horizontal Splitter (default) -->
        <div id="splitter">
            <div>
                <div class="content">
                    <h3>Grid</h3>
                    The DataGrid control displays data in a tabular format.
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>Schedule</h3>
                    The Scheduler facilitates calendar features and time management.
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>Chart</h3>
                    Charts provide beautiful data visualization.
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```

**Visual Result:**
```
┌──────────────┬──────────────┬──────────────┐
│   Pane 1     │   Pane 2     │   Pane 3     │
│              │              │              │
│   Grid       │   Schedule   │   Chart      │
└──────────────┴──────────────┴──────────────┘
      ↑              ↑              ↑
   vertical      vertical       vertical
  separators    separators    separators
```

---

## Vertical Layout

Set the `orientation` property to `'Vertical'` to render the Splitter with panes stacked top-to-bottom. Separators are horizontal.

### Vertical Orientation Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Initialize Splitter with vertical orientation
let splitObject: Splitter = new Splitter({
    height: '305px',
    width: '600px',
    orientation: 'Vertical',  // <-- Vertical orientation
    paneSettings: [
        { size: '100px' },
        { size: '100px' },
        { size: '100px' }
    ]
});

// Render initialized Splitter
splitObject.appendTo('#splitter');
```

### Vertical HTML Markup

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Essential JS 2 Splitter - Vertical</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>

<body>
    <div id="container">
        <!-- Vertical Splitter -->
        <div id="splitter">
            <div>
                <div class="content">
                    <h3>Header</h3>
                    Top navigation area
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>Main Content</h3>
                    Primary content area
                </div>
            </div>
            <div>
                <div class="content">
                    <h3>Footer</h3>
                    Bottom footer area
                </div>
            </div>
        </div>
    </div>
</body>

</html>
```

**Visual Result:**
```
┌─────────────────────────────┐
│                             │
│        Pane 1 (Header)      │
│                             │
├─────────────────────────────┤  ← horizontal separator
│                             │
│    Pane 2 (Main Content)    │
│                             │
├─────────────────────────────┤  ← horizontal separator
│                             │
│      Pane 3 (Footer)        │
│                             │
└─────────────────────────────┘
```

---

## Orientation Property

### Setting the Orientation

The `orientation` property accepts two string values:

| Value | Result | Default |
|-------|--------|---------|
| `'Horizontal'` | Panes arranged left-to-right with vertical separators | ✓ Yes |
| `'Vertical'` | Panes stacked top-to-bottom with horizontal separators | - |

### TypeScript Example

```typescript
// Horizontal (explicit - same as default)
let splitH: Splitter = new Splitter({
    orientation: 'Horizontal',
    paneSettings: [...]
});

// Vertical (explicit)
let splitV: Splitter = new Splitter({
    orientation: 'Vertical',
    paneSettings: [...]
});

// Omitting orientation defaults to Horizontal
let splitDefault: Splitter = new Splitter({
    // orientation is 'Horizontal' by default
    paneSettings: [...]
});
```

---

## Separator Behavior

### Horizontal Splitter Separators
- **Type:** Vertical separators (|)
- **CSS Class:** `.e-split-bar.e-split-bar-horizontal`
- **Drag Direction:** Left-to-right horizontal dragging
- **Size:** Determined by `separatorSize` property (default: 1px)

### Vertical Splitter Separators
- **Type:** Horizontal separators (──)
- **CSS Class:** `.e-split-bar.e-split-bar-vertical`
- **Drag Direction:** Top-to-bottom vertical dragging
- **Size:** Determined by `separatorSize` property (default: 1px)

### Customizing Separator Size

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Increase separator size to 5px
let splitObject: Splitter = new Splitter({
    height: '300px',
    separatorSize: 5,  // <-- 5px separator
    paneSettings: [
        { size: '150px' },
        { size: '150px' }
    ]
});
splitObject.appendTo('#splitter');
```

### Separator CSS Customization

```css
/* Horizontal Splitter - vertical separator */
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: blue;
    width: 5px;  /* Separator width */
}

/* Vertical Splitter - horizontal separator */
.e-splitter .e-split-bar.e-split-bar-vertical {
    background: blue;
    height: 5px;  /* Separator height */
}

/* Separator hover state */
.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover {
    background: green;
}
```

---

## Practical Examples

### Example 1: Two-Column Dashboard (Horizontal)

```typescript
let splitObject: Splitter = new Splitter({
    height: '400px',
    width: '100%',
    paneSettings: [
        { size: '25%', min: '15%', max: '40%', content: 'Sidebar' },
        { size: '75%', min: '60%', content: 'Main Content' }
    ]
});
splitObject.appendTo('#splitter');
```

### Example 2: Three-Row Layout (Vertical)

```typescript
let splitObject: Splitter = new Splitter({
    height: '600px',
    width: '100%',
    orientation: 'Vertical',
    paneSettings: [
        { size: '80px', content: 'Header' },
        { size: '400px', content: 'Main Content' },
        { size: '120px', content: 'Footer' }
    ]
});
splitObject.appendTo('#splitter');
```

### Example 3: IDE Layout (Nested - Advanced)

```typescript
// Outer vertical split (header/content/footer)
let outerSplit: Splitter = new Splitter({
    height: '100%',
    orientation: 'Vertical',
    paneSettings: [
        { size: '60px' },
        { size: '80%' },
        { size: '40px' }
    ]
});
outerSplit.appendTo('#outerSplitter');

// Inner horizontal split (sidebar/editor/panel)
let innerSplit: Splitter = new Splitter({
    height: '100%',
    orientation: 'Horizontal',
    paneSettings: [
        { size: '20%', min: '15%' },
        { size: '60%', min: '50%' },
        { size: '20%', min: '15%' }
    ]
});
innerSplit.appendTo('#innerSplitter');
```

---

## Add or Remove Panes

Dynamically add or remove panes from a Splitter instance after initialization using the `addPane()` and `removePane()` methods.

### Add Pane

Add new panes dynamically by passing `paneProperties` and an index to the `addPane()` method:

```typescript
import { Splitter, PanePropertiesModel } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '200px',
    width: '600px',
    paneSettings: [
        { size: '190px', content: 'Pane 1' },
        { size: '190px', content: 'Pane 2' }
    ],
    created: onSplitterCreate
});
splitObj.appendTo('#splitter');

let paneDetails: PanePropertiesModel = {
    size: '190px',
    content: 'New Pane',
    min: '30px',
    max: '250px'
};

function onSplitterCreate() {
    document.getElementById('addpane').addEventListener('click', () => {
        // Add pane at index 1 (between pane 1 and pane 2)
        splitObj.addPane(paneDetails, 1);
    });
}
```

### Add Pane Syntax

```typescript
addPane(paneProperties: PanePropertiesModel, index: number): void
```

**Parameters:**
- `paneProperties`: Configuration object for the new pane (size, content, min, max, collapsible, etc.)
- `index`: Zero-based position where pane should be inserted

### Remove Pane

Remove panes dynamically by passing the pane index to the `removePane()` method:

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

let splitObj: Splitter = new Splitter({
    height: '200px',
    width: '600px',
    paneSettings: [
        { size: '200px', content: 'Pane 1' },
        { size: '200px', content: 'Pane 2' },
        { size: '200px', content: 'Pane 3' }
    ]
});
splitObj.appendTo('#splitter');

document.getElementById('removepane').addEventListener('click', () => {
    // Check if pane exists before removing
    if (!isNullOrUndefined(document.querySelector('#splitter')
        .querySelectorAll('.e-pane-horizontal')[1])) {
        splitObj.removePane(1);  // Remove pane at index 1
    }
});
```

### Remove Pane Syntax

```typescript
removePane(index: number): void
```

**Parameters:**
- `index`: Zero-based index of pane to remove

### Practical Examples

#### Example 1: Dynamic Tab-like Interface

```typescript
interface TabConfig {
    title: string;
    content: string;
}

const tabs: TabConfig[] = [
    { title: 'Tab 1', content: 'Content 1' },
    { title: 'Tab 2', content: 'Content 2' }
];

function createTabPane(config: TabConfig): PanePropertiesModel {
    return {
        size: '200px',
        content: `<h3>${config.title}</h3><p>${config.content}</p>`,
        collapsible: true,
        min: '100px'
    };
}

// Add tab
function addTab(config: TabConfig) {
    splitObj.addPane(createTabPane(config), splitObj.paneSettings.length);
}

// Remove tab by index
function removeTab(index: number) {
    splitObj.removePane(index);
}
```

#### Example 2: Safe Remove with Validation

```typescript
document.getElementById('removepane').onclick = (): void => {
    const panes = document.querySelector('#splitter')
        .querySelectorAll('.e-pane-horizontal');
    
    // Only remove if more than 2 panes exist
    if (panes.length > 2) {
        splitObj.removePane(1);
    } else {
        alert('Cannot remove - minimum 2 panes required');
    }
};
```

### Important Notes

- **Index must be valid:** Removing invalid index causes error
- **Check pane existence:** Use `isNullOrUndefined()` before removing
- **Minimum panes:** Splitter requires at least 1 pane to function
- **Adding at index:** Existing panes shift if you add in middle
- **Properties:** New panes inherit parent Splitter's orientation and styling

---

## Summary

- **Horizontal orientation** (default): Panes side-by-side, left-to-right, with vertical separators
- **Vertical orientation**: Panes stacked, top-to-bottom, with horizontal separators
- Set `orientation: 'Vertical'` to change from default
- Separators are draggable and resizable by default
- Use `separatorSize` to adjust separator thickness
- Use `addPane()` to dynamically add new panes at specific index
- Use `removePane()` to dynamically remove panes by index
- Combine orientations using nested splitters for complex layouts
