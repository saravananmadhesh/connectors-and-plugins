# Pane Sizing and Resizing

## Table of Contents
- [Pixel-Based Pane Sizing](#pixel-based-pane-sizing)
- [Percentage-Based Sizing](#percentage-based-sizing)
- [Auto-Sizing Panes](#auto-sizing-panes)
- [Min and Max Size Constraints](#min-and-max-size-constraints)
- [Enabling and Disabling Resize](#enabling-and-disabling-resize)
- [Resize Events](#resize-events)
- [Gripper Customization](#gripper-customization)
- [Practical Examples](#practical-examples)
- [Best Practices](#best-practices)

## Pixel-Based Pane Sizing

Specify pane sizes in fixed pixels. Useful when you know exact dimensions or need pixel-perfect layouts.

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <!-- First pane: exactly 300 pixels wide -->
        <e-splitter-pane size="300px" content="<div class='content'><h3>Fixed Size Panel</h3><p>300px width</p></div>"></e-splitter-pane>
        
        <!-- Second pane: exactly 400 pixels wide -->
        <e-splitter-pane size="400px" content="<div class='content'><h3>Fixed Size Panel</h3><p>400px width</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**When to use:**
- Navigation sidebars with fixed width (e.g., 250px)
- Icon panels (fixed 50px)
- Editor layouts with specific column widths

**Behavior:**
- Container must be wide enough to fit all fixed panes
- Last pane with no size receives remaining space
- Fixed-size panes do NOT shrink when container resizes

## Percentage-Based Sizing

Specify pane sizes as percentages for responsive layouts. Percentages are relative to parent container width/height.

```csharp
<!-- Responsive layout: adjusts to container size -->
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <!-- Left: 30% of container width -->
        <e-splitter-pane size="30%" content="<div class='content'><h3>Left Panel</h3><p>30% width</p></div>"></e-splitter-pane>
        
        <!-- Middle: 40% of container width -->
        <e-splitter-pane size="40%" content="<div class='content'><h3>Middle Panel</h3><p>40% width</p></div>"></e-splitter-pane>
        
        <!-- Right: remaining 30% -->
        <e-splitter-pane size="30%" content="<div class='content'><h3>Right Panel</h3><p>Remaining 30%</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**Key characteristics:**
- Responsive: automatically resize with container
- Last pane without size gets remaining space
- All percentages add up (typically to 100%)
- Best for modern responsive applications

### Percentage Examples

```csharp
<!-- 25% / 75% split (sidebar + main) -->
<e-splitter-pane size="25%"></e-splitter-pane>
<e-splitter-pane size="75%"></e-splitter-pane>

<!-- 33.33% / 33.33% / 33.34% split (three equal panes) -->
<e-splitter-pane size="33.33%"></e-splitter-pane>
<e-splitter-pane size="33.33%"></e-splitter-pane>
<e-splitter-pane size="33.34%"></e-splitter-pane>

<!-- 50% / 50% split -->
<e-splitter-pane size="50%"></e-splitter-pane>
<e-splitter-pane size="50%"></e-splitter-pane>
```

## Auto-Sizing Panes

Omit size properties to allow automatic distribution. Panes split equally based on available space.

```csharp
<!-- Two panes: automatically 50% / 50% -->
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane content="<div class='content'><h3>Pane 1</h3><p>Auto-sized (50%)</p></div>"></e-splitter-pane>
        <e-splitter-pane content="<div class='content'><h3>Pane 2</h3><p>Auto-sized (50%)</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

```csharp
<!-- Three panes: automatically 33.33% each -->
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane content="<div class='content'>Pane 1</div>"></e-splitter-pane>
        <e-splitter-pane content="<div class='content'>Pane 2</div>"></e-splitter-pane>
        <e-splitter-pane content="<div class='content'>Pane 3</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**Use cases:**
- Simple layouts without specific size requirements
- Prototyping before finalizing sizes
- Layouts where user prefers equal distribution

## Min and Max Size Constraints

Control resize boundaries to prevent panes from becoming too small or too large.

```csharp
<ejs-splitter id="splitter" height="500px">
    <e-splitter-panes>
        <!-- Sidebar: 200-400px, starts at 25% -->
        <e-splitter-pane size="25%" min="200px" max="400px" content="<div class='content'><h3>Sidebar</h3><p>Min: 200px, Max: 400px</p></div>"></e-splitter-pane>
        
        <!-- Main: at least 300px minimum -->
        <e-splitter-pane size="75%" min="300px" content="<div class='content'><h3>Main Content</h3><p>Minimum: 300px</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**Property combinations:**

```csharp
<!-- Only minimum constraint -->
<e-splitter-pane size="30%" min="150px"></e-splitter-pane>

<!-- Only maximum constraint -->
<e-splitter-pane size="50%" max="600px"></e-splitter-pane>

<!-- Both min and max -->
<e-splitter-pane size="40%" min="200px" max="500px"></e-splitter-pane>

<!-- Percentage-based constraints -->
<e-splitter-pane size="50%" min="20%" max="80%"></e-splitter-pane>
```

**Why use constraints:**
- **Navigation panel:** minimum prevents loss of usability (e.g., `min="150px"`)
- **Editor:** maximum prevents excessive width (e.g., `max="600px"`)
- **Content:** minimum ensures readability (e.g., `min="250px"`)
- **Responsive:** prevents over-compression on small screens

## Enabling and Disabling Resize

Control whether users can resize individual panes. By default, all panes are resizable.

### Disable Resize on Specific Pane

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <!-- This pane CANNOT be resized -->
        <e-splitter-pane size="25%" resizable="false" content="<div class='content'><h3>Fixed Panel</h3><p>Not resizable</p></div>"></e-splitter-pane>
        
        <!-- This pane CAN be resized -->
        <e-splitter-pane size="75%" resizable="true" content="<div class='content'><h3>Flexible Panel</h3><p>Resizable</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

### Disable All Resizing

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" resizable="false" content="<div class='content'><h3>Locked Layout</h3></div>"></e-splitter-pane>
        <e-splitter-pane size="70%" resizable="false" content="<div class='content'><h3>All panes fixed</h3></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**Use cases for disabled resize:**
- Master-detail layouts where sidebar should stay fixed
- Read-only previews
- Fixed navigation with flexible content area
- Layouts with strict design requirements

## Resize Events

Respond to resize actions using JavaScript events: `resizeStart`, `resizing`, and `resizeStop`.

```csharp
<ejs-splitter id="splitter" height="400px" resizeStart="onResizeStart" resizing="onResizing" resizeStop="onResizeStop">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div class='content'>Pane 1</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div class='content'>Pane 2</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onResizeStart(args) {
        console.log('Resize started:', args);
    }
    
    function onResizing(args) {
        console.log('Resizing:', args);
    }
    
    function onResizeStop(args) {
        console.log('Resize completed. New sizes:', args);
        // Refresh content in pane if needed
    }
</script>
```

**Event properties:**
- `index` - Array containing index of the pane being resized
- `event` - Original mouse event
- `paneSize` - Array containing pane sizes when resized
- `pane` - Array of pane elements
- `element` - Root element of the resizing pane
- `separator` - The resizing pane's separator element

**Use cases:**
- Refresh content when pane size changes
- Update responsive layouts based on new dimensions
- Log resize events for analytics
- Validate size changes before allowing

## Gripper Customization

Customize the resize handle appearance with CSS.

### Hide Resize Handle

```css
/* Hide horizontal splitter resize handle */
.e-splitter .e-split-bar.e-split-bar-horizontal .e-resize-handler {
    display: none;
}

/* Hide vertical splitter resize handle */
.e-splitter .e-split-bar.e-split-bar-vertical .e-resize-handler {
    display: none;
}
```

### Customize Handle Color

```css
/* Horizontal splitter handle */
.e-splitter .e-split-bar.e-split-bar-horizontal .e-resize-handler {
    color: #2196F3;
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover .e-resize-handler {
    color: #1976D2;
}

/* Vertical splitter handle */
.e-splitter .e-split-bar.e-split-bar-vertical .e-resize-handler {
    color: #FF9800;
}
```

### Customize Cursor

```css
/* Change cursor on separator hover */
.e-splitter .e-split-bar {
    cursor: col-resize; /* Horizontal */
}

.e-splitter .e-split-bar.e-split-bar-vertical {
    cursor: row-resize; /* Vertical */
}

/* Custom cursor during drag */
.e-splitter .e-split-bar.e-split-bar-active {
    cursor: grabbing;
}
```

## Practical Examples

### Example 1: Dashboard with Responsive Panes

```csharp
<ejs-splitter id="dashboard" height="600px" orientation="Vertical">
    <!-- Header: Fixed 60px -->
    <e-splitter-pane size="60px" resizable="false" content="<div style='background:#2196F3;color:white;padding:15px;'><h3>Dashboard</h3></div>"></e-splitter-pane>
    
    <!-- Main area with sidebar -->
    <e-splitter-pane size="100%" content="<div><ejs-splitter style='width:100%;height:100%;'><e-splitter-panes><e-splitter-pane size='25%' min='150px' max='400px' content=\"<div class='content'><h3>Navigation</h3></div>\"></e-splitter-pane><e-splitter-pane size='75%' min='300px' content=\"<div class='content'><h3>Content Area</h3></div>\"></e-splitter-pane></e-splitter-panes></ejs-splitter></div>"></e-splitter-pane>
</ejs-splitter>
```

### Example 2: Code Editor Layout

```csharp
<ejs-splitter id="editor" height="800px">
    <e-splitter-panes>
        <!-- File Explorer: 200-300px -->
        <e-splitter-pane size="20%" min="200px" max="300px" content="<div class='content'><h3>Files</h3></div>"></e-splitter-pane>
        
        <!-- Editor: 40-60% -->
        <e-splitter-pane size="60%" min="400px" content="<div class='content'><h3>Editor</h3></div>"></e-splitter-pane>
        
        <!-- Properties: 150-250px -->
        <e-splitter-pane size="20%" min="150px" max="250px" content="<div class='content'><h3>Properties</h3></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

## Best Practices

1. **Use Percentages for Responsive Design** - Better than fixed pixels for modern layouts
2. **Set Minimum Sizes** - Prevent content from becoming unusable when compressed
3. **Test Resize Behavior** - Ensure content remains accessible at min/max sizes
4. **Provide Visual Feedback** - Use min/max constraints to guide users
5. **Consider Touch Devices** - Make resize handle at least 44px for touch targets
