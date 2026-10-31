# Complex Layouts and Nested Splitters in Syncfusion TypeScript Splitter

## Table of Contents
- [Nested Splitters](#nested-splitters)
- [Code Editor Layout](#code-editor-layout)
- [Step-by-Step Nesting](#step-by-step-nesting)
- [Multiple Nesting Levels](#multiple-nesting-levels)
- [Common Layout Patterns](#common-layout-patterns)
- [Practical Examples](#practical-examples)

## Nested Splitters

Create complex, multi-level layouts by nesting Splitter instances. Place one Splitter inside the pane of another Splitter.

### Key Concept

- **Outer Splitter:** Top-level container split
- **Inner Splitter:** Nested inside first pane(s) of outer splitter
- **Independent:** Each splitter has independent sizing, orientation, and behavior
- **Flexible:** Combine horizontal and vertical orientations for complex layouts

### Basic Nesting Structure

```
HTML Structure:
─────────────────────────────────
│         Outer Splitter        │
│  ┌──────────────────────────┐ │
│  │ Inner Splitter (Pane 1)  │ │
│  │ ┌─────────┬─────────┬─────┤ │
│  │ │Pane 1.1 │Pane 1.2 │1.3  │ │
│  │ └─────────┴─────────┴─────┤ │
│  ├─ Separator ────────────────┤ │
│  │ Pane 2 (Bottom)            │ │
│  └──────────────────────────┘ │
─────────────────────────────────
```

---

## Code Editor Layout

A classic IDE/code editor layout with nested splitters:

### Layout Design

```
┌─────────────────────────────────────┐
│        Top Header Pane              │  ← Fixed height
├──────────────┬──────────┬───────────┤
│              │          │           │
│ File List    │  Editor  │ Properties│  ← Resizable panes
│              │          │           │
├──────────────┴──────────┴───────────┤
│      Bottom Output/Terminal         │  ← Dockable
└─────────────────────────────────────┘
```

### Complete Implementation

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Step 1: Create outer vertical splitter (dividing top/bottom sections)
let VerticalSplitObj: Splitter = new Splitter({
    height: '400px',
    width: '100%',
    orientation: 'Vertical',
    paneSettings: [
        {
            size: '53%',
            min: '30%',
            content: '<div id="horizontalSplitter"></div>'  // Container for inner splitter
        },
        {
            size: '47%',
            content: '<div class="output-pane"><h3>Output</h3>Terminal and build output here</div>'
        }
    ]
});
VerticalSplitObj.appendTo('#verticalSplitter');

// Step 2: Create inner horizontal splitter (dividing left/middle/right sections)
let HorizontalSplitObj: Splitter = new Splitter({
    height: '220px',
    width: '100%',
    paneSettings: [
        {
            size: '29%',
            min: '23%',
            content: '<div class="file-explorer"><h3>Files</h3></div>'
        },
        {
            size: '20%',
            min: '15%',
            content: '<div class="minimap"><h3>Minimap</h3></div>'
        },
        {
            size: '35%',
            min: '35%',
            content: '<div class="editor"><h3>Code Editor</h3></div>'
        }
    ]
});
HorizontalSplitObj.appendTo('#horizontalSplitter');
```

### HTML Structure for Code Editor Layout

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <title>Code Editor Layout</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <style>
        .file-explorer { padding: 10px; overflow-y: auto; }
        .minimap { padding: 10px; background: #f5f5f5; }
        .editor { padding: 10px; font-family: monospace; overflow: auto; }
        .output-pane { padding: 10px; background: #1e1e1e; color: #ddd; overflow: auto; }
    </style>
</head>

<body>
    <div id="container">
        <!-- Outer vertical splitter -->
        <div id="verticalSplitter">
            <!-- First pane: contains inner horizontal splitter -->
            <div id="horizontalSplitter">
                <!-- Inner splitter content goes here -->
            </div>
            <!-- Second pane: output/terminal -->
            <div></div>
        </div>
    </div>
</body>

</html>
```

---

## Step-by-Step Nesting

### Step 1: Create Outer Splitter Container

```html
<div id="outerSplitter">
    <!-- First pane container for inner splitter -->
    <div id="innerContainer"></div>
    <!-- Second pane -->
    <div></div>
</div>
```

### Step 2: Initialize Outer Splitter

```typescript
let outerSplit: Splitter = new Splitter({
    height: '400px',
    width: '100%',
    orientation: 'Vertical',
    paneSettings: [
        { size: '60%' },
        { size: '40%' }
    ]
});
outerSplit.appendTo('#outerSplitter');
```

### Step 3: Create Inner Splitter Inside First Pane

```typescript
let innerSplit: Splitter = new Splitter({
    height: '240px',
    width: '100%',
    orientation: 'Horizontal',
    paneSettings: [
        { size: '25%' },
        { size: '50%' },
        { size: '25%' }
    ]
});
innerSplit.appendTo('#innerContainer');
```

### Complete Step-by-Step Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Wait for DOM to be ready
window.addEventListener('load', () => {
    // Initialize outer vertical splitter
    let verticalSplit: Splitter = new Splitter({
        height: '500px',
        width: '100%',
        orientation: 'Vertical',
        paneSettings: [
            { size: '300px', min: '200px' },
            { size: '200px', min: '100px' }
        ]
    });
    verticalSplit.appendTo('#verticalSplitter');

    // Initialize inner horizontal splitter
    let horizontalSplit: Splitter = new Splitter({
        height: '280px',
        width: '100%',
        paneSettings: [
            { size: '200px', min: '150px' },
            { size: '400px', min: '300px' },
            { size: '150px', min: '100px' }
        ]
    });
    horizontalSplit.appendTo('#horizontalSplitter');
});
```

---

## Multiple Nesting Levels

Create three or more levels of nested splitters for advanced layouts:

### Three-Level Nesting

```
Level 1: Outer (Vertical)
├─ Pane 1 (60%): Level 2 Inner (Horizontal)
│  ├─ Pane 1.1 (25%): Content
│  ├─ Pane 1.2 (50%): Level 3 Deepest (Vertical)
│  │  ├─ Pane 1.2.1: Content 1
│  │  └─ Pane 1.2.2: Content 2
│  └─ Pane 1.3 (25%): Content
└─ Pane 2 (40%): Output
```

### Three-Level Implementation

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Level 1: Outer vertical splitter
let level1: Splitter = new Splitter({
    height: '600px',
    orientation: 'Vertical',
    paneSettings: [
        { size: '60%' },
        { size: '40%' }
    ]
});
level1.appendTo('#level1');

// Level 2: Inner horizontal splitter (inside level 1, pane 1)
let level2: Splitter = new Splitter({
    height: '360px',
    paneSettings: [
        { size: '25%' },
        { size: '50%' },  // Will contain level 3
        { size: '25%' }
    ]
});
level2.appendTo('#level2');

// Level 3: Deepest vertical splitter (inside level 2, pane 2)
let level3: Splitter = new Splitter({
    height: '340px',
    orientation: 'Vertical',
    paneSettings: [
        { size: '50%' },
        { size: '50%' }
    ]
});
level3.appendTo('#level3');
```

### HTML for Three-Level Nesting

```html
<!DOCTYPE html>
<html>
<head>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id="container">
        <!-- Level 1: Outer vertical -->
        <div id="level1">
            <!-- Level 1, Pane 1: Inner horizontal -->
            <div id="level2">
                <!-- Level 2, Pane 1: Content -->
                <div><h3>Left Panel</h3></div>
                <!-- Level 2, Pane 2: Deepest vertical -->
                <div id="level3">
                    <div><h3>Top Content</h3></div>
                    <div><h3>Bottom Content</h3></div>
                </div>
                <!-- Level 2, Pane 3: Content -->
                <div><h3>Right Panel</h3></div>
            </div>
            <!-- Level 1, Pane 2: Output -->
            <div><h3>Output</h3></div>
        </div>
    </div>
</body>
</html>
```

---

## Common Layout Patterns

### Pattern 1: Traditional IDE Layout

```typescript
// Outer: Header / Main / Footer
let main: Splitter = new Splitter({
    height: '100vh',
    orientation: 'Vertical',
    paneSettings: [
        { size: '50px', resizable: false },         // Header
        { size: '80%' },                             // Main area
        { size: '30px', resizable: false }          // Status bar
    ]
});
main.appendTo('#main');

// Inner (in main pane): Sidebar / Editor / Explorer
let editor: Splitter = new Splitter({
    height: '100%',
    paneSettings: [
        { size: '250px', min: '200px', collapsible: true },  // Sidebar
        { size: '100%' },                                     // Code editor (flexible)
        { size: '250px', min: '200px', collapsible: true }   // Explorer
    ]
});
editor.appendTo('#editor');
```

### Pattern 2: Dashboard with Sidebar

```typescript
let dashboard: Splitter = new Splitter({
    height: '100%',
    paneSettings: [
        { size: '250px', min: '200px', max: '400px', resizable: true, collapsible: true },
        { size: '100%' }
    ]
});
dashboard.appendTo('#dashboard');
```

### Pattern 3: Chat Application Layout

```typescript
// Outer: Contacts / Chat
let chat: Splitter = new Splitter({
    height: '100%',
    paneSettings: [
        { size: '300px', min: '250px', max: '400px' },  // Contact list
        { size: '100%' }                                 // Chat window
    ]
});
chat.appendTo('#chat');

// Inner: Message area / User details
let chatInner: Splitter = new Splitter({
    height: '100%',
    orientation: 'Vertical',
    paneSettings: [
        { size: '100%' },              // Messages
        { size: '200px', min: '150px' } // User info
    ]
});
chatInner.appendTo('#chatInner');
```

---

## Practical Examples

### Example 1: Complete Visual Studio-like Layout

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Level 1: Main vertical split (top editor / bottom terminal)
let mainSplit: Splitter = new Splitter({
    height: '100vh',
    width: '100%',
    orientation: 'Vertical',
    paneSettings: [
        { size: '75%', min: '50%' },
        { size: '25%', min: '15%', collapsible: true }
    ]
});
mainSplit.appendTo('#mainSplit');

// Level 2: Editor area horizontal split (explorer / editor / problems)
let editorSplit: Splitter = new Splitter({
    height: '100%',
    width: '100%',
    paneSettings: [
        { size: '20%', min: '15%', max: '30%', collapsible: true },
        { size: '60%', min: '50%' },
        { size: '20%', min: '15%', max: '30%', collapsible: true }
    ]
});
editorSplit.appendTo('#editorSplit');
```

### Example 2: Responsive Multi-Document Interface

```typescript
let mdi: Splitter = new Splitter({
    height: '100%',
    orientation: 'Vertical',
    paneSettings: [
        { size: '100px', resizable: false },  // Title bar
        { size: '100%' },                     // Document area
        { size: '35px', resizable: false }    // Status bar
    ]
});
mdi.appendTo('#mdi');

let docSplit: Splitter = new Splitter({
    height: '100%',
    paneSettings: [
        { size: '250px', min: '180px', collapsible: true },
        { size: '100%' },
        { size: '300px', min: '200px', collapsible: true }
    ]
});
docSplit.appendTo('#docSplit');
```

### Example 3: Analytics Dashboard

```typescript
// Outer: Navbar / Content
let navbar: Splitter = new Splitter({
    height: '100vh',
    orientation: 'Vertical',
    paneSettings: [
        { size: '64px', resizable: false },
        { size: '100%' }
    ]
});
navbar.appendTo('#navbar');

// Middle: Sidebar / Main dashboard
let dashboard: Splitter = new Splitter({
    height: '100%',
    paneSettings: [
        { size: '250px', min: '200px', max: '350px', collapsible: true },
        { size: '100%' }
    ]
});
dashboard.appendTo('#dashboard');

// Inner: Charts / Details
let charts: Splitter = new Splitter({
    height: '100%',
    orientation: 'Vertical',
    paneSettings: [
        { size: '70%' },
        { size: '30%', min: '20%' }
    ]
});
charts.appendTo('#charts');
```

---

## Summary

- **Nested:** Place Splitter in pane of another Splitter
- **Independent:** Each instance has own sizing, orientation, behavior
- **Levels:** Support 2, 3, or more nesting levels
- **Container:** Use `<div id="containerId"></div>` for each level
- **Height:** Inner splitters need explicit height (often percentage or px)
- **Common patterns:** IDE, dashboard, chat, multi-document layouts
- **Flexible:** Mix horizontal and vertical for complex UIs
