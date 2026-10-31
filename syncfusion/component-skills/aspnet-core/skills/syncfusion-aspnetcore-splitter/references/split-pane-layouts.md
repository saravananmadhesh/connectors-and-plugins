# Split Pane Layouts

## Table of Contents
- [Horizontal Layout](#horizontal-layout)
- [Vertical Layout](#vertical-layout)
- [Multiple Pane Configuration](#multiple-pane-configuration)
- [Separator Customization](#separator-customization)
  - [Separator CSS Customization](#separator-css-customization)
- [Nested Splitter Implementation](#nested-splitter-implementation)
  - [Method 1: Direct Nested Element](#method-1-direct-nested-element)
  - [Method 2: Using Content Wrapper](#method-2-using-content-wrapper)
- [Layout Patterns](#layout-patterns)
  - [Pattern 1: IDE Layout (3-Level Nesting)](#pattern-1-ide-layout-3-level-nesting)
  - [Pattern 2: Dashboard (Multiple Sections)](#pattern-2-dashboard-multiple-sections)
- [Troubleshooting](#troubleshooting)
- [Code Editor Layout](#code-editor-layout)
  - [Basic Structure](#basic-structure)
  - [Nested Editor Panes](#nested-editor-panes)
  - [Styling](#styling)
  - [JavaScript Initialization](#javascript-initialization)
- [Outlook Email Layout](#outlook-email-layout)
  - [Three-Pane Structure](#three-pane-structure)
  - [Styling](#styling-1)

## Horizontal Layout

By default, the Splitter renders in horizontal orientation. The container is split into panes flowing left-to-right with a vertical separator bar between them.

**Use case:** Side-by-side layouts like navigation + content panels.

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="25%" min="20%" content="<div class='content'><h3>Sidebar</h3><p>Navigation goes here</p></div>"></e-splitter-pane>
        <e-splitter-pane size="75%" content="<div class='content'><h3>Main Area</h3><p>Main content goes here</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**How it works:**
- First pane: 25% width (minimum 20%)
- Second pane: 75% width (remaining space)
- Vertical separator allows horizontal resize
- Perfect for dashboard layouts

## Vertical Layout

Set `orientation="Vertical"` to split panes top-to-bottom with a horizontal separator bar.

**Use case:** Stacked layouts like toolbar + editor + console.

```csharp
<ejs-splitter id="splitter" height="600px" orientation="Vertical">
    <e-splitter-panes>
        <e-splitter-pane size="10%" min="50px" content="<div class='content'><h3>Header/Toolbar</h3></div>"></e-splitter-pane>
        <e-splitter-pane size="80%" content="<div class='content'><h3>Editor Area</h3><p>Main editing area</p></div>"></e-splitter-pane>
        <e-splitter-pane size="10%" min="50px" content="<div class='content'><h3>Status/Output</h3></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**How it works:**
- Orientation="Vertical" changes split direction
- Panes stack vertically (top to bottom)
- Horizontal separator allows vertical resize
- Useful for editor layouts

## Multiple Pane Configuration

Create layouts with more than two panes in either orientation:

```csharp
<!-- Horizontal: Three-pane master-detail layout -->
<ejs-splitter id="splitter" height="500px">
    <e-splitter-panes>
        <e-splitter-pane size="20%" min="150px" content="<div class='content'><h3>Categories</h3><ul><li>Item 1</li><li>Item 2</li></ul></div>"></e-splitter-pane>
        <e-splitter-pane size="30%" min="200px" content="<div class='content'><h3>Items List</h3><ul><li>Product A</li><li>Product B</li></ul></div>"></e-splitter-pane>
        <e-splitter-pane size="50%" min="250px" content="<div class='content'><h3>Item Details</h3><p>Detailed product information</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**Key points:**
- Can have unlimited panes (typically 2-5 for usability)
- Each pane gets size allocation (percent or pixels)
- Separators between all adjacent panes
- Last pane is flexible - fills remaining space if needed

## Separator Customization

Control the separator size and appearance:

```csharp
<!-- Custom separator size -->
<ejs-splitter id="splitter" height="400px" separatorSize="5">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div class='content'><h3>Left</h3></div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div class='content'><h3>Right</h3></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**Separator notes:**
- Default: 1px width (horizontal) or height (vertical)
- `separatorSize="5"` - Makes 5px separator (thicker)
- Larger separators easier to grasp on touch devices
- CSS can further customize color and appearance

### Separator CSS Customization

```css
/* Horizontal splitter separator styling */
.e-splitter .e-split-bar.e-split-bar-horizontal {
    background: linear-gradient(to right, #e0e0e0, #f0f0f0);
}

.e-splitter .e-split-bar.e-split-bar-horizontal.e-split-bar-hover {
    background: linear-gradient(to right, #c0c0c0, #d0d0d0);
}

/* Vertical splitter separator styling */
.e-splitter .e-split-bar.e-split-bar-vertical {
    background: linear-gradient(to bottom, #e0e0e0, #f0f0f0);
}
```

## Nested Splitter Implementation

Create complex hierarchical layouts by nesting splitters. The inner splitter must have 100% width and height to match parent pane dimensions.

**Use case:** Code editor with sidebar, editor, and properties panel.

### Method 1: Direct Nested Element

```csharp
<ejs-splitter id="outerSplitter" height="600px" orientation="Vertical">
    <e-splitter-panes>
        <!-- Top: Editor area containing horizontal splitter -->
        <e-splitter-pane size="70%" content="<div><ejs-splitter id='innerSplitter' style='width:100%;height:100%;'><e-splitter-panes><e-splitter-pane size='20%' min='100px' content=\"<div class='content'><h3>File Explorer</h3></div>\"></e-splitter-pane><e-splitter-pane size='80%' content=\"<div class='content'><h3>Editor</h3></div>\"></e-splitter-pane></e-splitter-panes></ejs-splitter></div>"></e-splitter-pane>
        
        <!-- Bottom: Console area -->
        <e-splitter-pane size="30%" min="150px" content="<div class='content'><h3>Console Output</h3></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

**Critical requirements:**
- Inner splitter must have `width:100%; height:100%;`
- Parent pane must have fixed size (e.g., `size="70%"`)
- Without 100% dimensions, nested splitter won't resize properly

### Method 2: Using Content Wrapper

```csharp
<ejs-splitter id="splitter" height="500px">
    <e-splitter-panes>
        <e-splitter-pane size="80%" content="<div class='content'><h3>Editor</h3></div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div id='nested-container'><ejs-splitter id='nested' style='width:100%;height:100%;'><e-splitter-panes><e-splitter-pane size='60%' content=\"<div class='content'><h3>Main</h3></div>\"></e-splitter-pane><e-splitter-pane size='40%' content=\"<div class='content'><h3>Details</h3></div>\"></e-splitter-pane></e-splitter-panes></ejs-splitter></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

## Layout Patterns

### Pattern 1: IDE Layout (3-Level Nesting)

```
┌─────────────────────────────────┐
│         Toolbar (10%)            │
├────────────┬────────────────────┤
│            │                    │
│ Sidebar    │    Editor (70%)    │
│ (20%)      │                    │
│            ├────────────────────┤
│            │  Output (30%)      │
└────────────┴────────────────────┘
```

```csharp
<ejs-splitter id="main" height="600px" orientation="Vertical">
    <e-splitter-panes>
        <e-splitter-pane size="10%" min="50px" content="<div>Toolbar</div>"></e-splitter-pane>
        <e-splitter-pane size="90%" content="<div><ejs-splitter style='width:100%;height:100%;'><e-splitter-panes><e-splitter-pane size='20%' min='150px' content='<div>Sidebar</div>'></e-splitter-pane><e-splitter-pane size='80%' content='<div><ejs-splitter orientation=\"Vertical\" style=\"width:100%;height:100%;\"><e-splitter-panes><e-splitter-pane size=\"70%\" content=\"<div>Editor</div>\"></e-splitter-pane><e-splitter-pane size=\"30%\" content=\"<div>Output</div>\"></e-splitter-pane></e-splitter-panes></ejs-splitter></div>'></e-splitter-pane></e-splitter-panes></ejs-splitter></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

### Pattern 2: Dashboard (Multiple Sections)

```
┌──────────────────┬──────────────────┐
│  Section A       │  Section B       │
│  (50%)           │  (50%)           │
├──────────────────┼──────────────────┤
│  Section C       │  Section D       │
│  (50%)           │  (50%)           │
└──────────────────┴──────────────────┘
```

```csharp
<ejs-splitter id="main" height="500px" orientation="Vertical">
    <e-splitter-pane size="50%" content="<div><ejs-splitter orientation='Horizontal' style='width:100%;height:100%;'><e-splitter-panes><e-splitter-pane size='50%' content='<div>Section A</div>'></e-splitter-pane><e-splitter-pane size='50%' content='<div>Section B</div>'></e-splitter-pane></e-splitter-panes></ejs-splitter></div>"></e-splitter-pane>
    <e-splitter-pane size="50%" content="<div><ejs-splitter style='width:100%;height:100%;'><e-splitter-panes><e-splitter-pane size='50%' content='<div>Section C</div>'></e-splitter-pane><e-splitter-pane size='50%' content='<div>Section D</div>'></e-splitter-pane></e-splitter-panes></ejs-splitter></div>"></e-splitter-pane>
</ejs-splitter>
```

## Troubleshooting

**Issue: Nested splitter not showing separator**
- Solution: Add `width:100%;height:100%;` style attribute to inner splitter

**Issue: Nested content not resizing**
- Solution: Parent pane must have fixed size (e.g., `size="70%"` not auto)

**Issue: Separators not visible**
- Solution: Check CSS is loaded, splitter has height, panes have content

## Code Editor Layout

Create a code editor interface with a vertical outer splitter containing a horizontal inner splitter, matching IDEs like Visual Studio Code.

### Basic Structure

Start with a toolbar and vertical splitter (editor area above, output area below):

```csharp
<div class="code-editor-container">
    <div class="editor-toolbar">
        <button class="e-btn">Run</button>
        <button class="e-btn">Save</button>
        <button class="e-btn">Format</button>
    </div>
    
    <!-- Vertical Split: Editor Top (70%), Output Bottom (30%) -->
    <ejs-splitter id="outerSplitter" style="height: calc(100vh - 50px);" 
                   orientation="Vertical" created="onOuterSplitterCreated">
        <e-splitter-panes>
            <!-- Editor Pane -->
            <e-splitter-pane size="70%" content="<div><!-- Inner splitter goes here --></div>"></e-splitter-pane>
            
            <!-- Output Pane -->
            <e-splitter-pane size="30%" collapsible="true" content="<div><h4>Output</h4><div id='console-output'></div></div>"></e-splitter-pane>
        </e-splitter-panes>
    </ejs-splitter>
</div>
```

### Nested Editor Panes

Add a horizontal splitter inside the editor pane to split into HTML, CSS, JavaScript:

```csharp
<!-- Inside Editor Pane (size="70%") -->
<ejs-splitter id="innerSplitter" style="width:100%;height:100%;" 
              orientation="Horizontal">
    <e-splitter-panes>
        <e-splitter-pane size="33%" min="20%" content="<div class='editor-pane'><h4>HTML</h4><div class='code-content'>&lt;!DOCTYPE html&gt;&lt;html&gt;&lt;body&gt;&lt;h1&gt;Hello&lt;/h1&gt;&lt;/body&gt;&lt;/html&gt;</div></div>"></e-splitter-pane>
        <e-splitter-pane size="33%" min="20%" content="<div class='editor-pane'><h4>CSS</h4><div class='code-content'>body { font: 14px sans-serif; } h1 { color: #333; }</div></div>"></e-splitter-pane>
        <e-splitter-pane size="34%" min="20%" content="<div class='editor-pane'><h4>JavaScript</h4><div class='code-content'>const app = { init: function() { console.log('App started'); } };</div></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

### Styling

```css
<style>
    .code-editor-container {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
    }
    
    .editor-toolbar {
        background: #f0f0f0;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        height: 50px;
    }
    
    .editor-pane {
        padding: 10px;
        overflow: auto;
        background: #fafafa;
    }
    
    .code-content {
        font-family: 'Courier New', monospace;
        white-space: pre;
    }
</style>
```

### JavaScript Initialization

Initialize the nested splitter in the `created` event:

```csharp
<script>
    function onOuterSplitterCreated(args) {
        var innerSplitterElement = document.getElementById('innerSplitter');
        
        if (innerSplitterElement && !innerSplitterElement.ej2_instances) {
            new ej.layouts.Splitter({
                orientation: 'Horizontal',
                panes: [
                    { size: '33%', min: '20%' },
                    { size: '33%', min: '20%' },
                    { size: '34%', min: '20%' }
                ]
            }, innerSplitterElement);
        }
    }
    
    function runCode() {
        var output = document.getElementById('console-output');
        output.innerHTML = '<div style="color:green;">Code executed</div>';
    }
</script>
```

**Key Features:**
- Vertical outer splitter separates editor from output console
- Horizontal inner splitter divides code editor into HTML, CSS, JavaScript sections
- Collapsible output pane saves vertical space
- Minimum pane sizes prevent editor sections from becoming too small
- `created="onOuterSplitterCreated"` hook initializes nested splitter

---

## Outlook Email Layout

Create a three-pane email client interface with folder tree, message list, and message viewer using Syncfusion controls.

### Three-Pane Structure

Set up a horizontal splitter with folder pane (15%), message list (35%), and viewer (50%):

```csharp
<!-- Horizontal Splitter: Folders | Messages | Viewer -->
<ejs-splitter id="emailSplitter" height="calc(100vh - 60px)" orientation="Horizontal">
    <e-splitter-panes>
        <!-- Folder Tree Pane (15%) -->
        <e-splitter-pane size="15%" min="10%" max="30%" content="<div class='folder-pane'><h4>Folders</h4><div class='folder-item' onclick=\"selectFolder('inbox')\">📥 Inbox</div><div class='folder-item' onclick=\"selectFolder('sent')\">📤 Sent</div><div class='folder-item' onclick=\"selectFolder('drafts')\">📝 Drafts</div></div>"></e-splitter-pane>
        
        <!-- Message List Pane (35%) -->
        <e-splitter-pane size="35%" min="25%" content="<div class='message-list-pane'><h4>Messages (Inbox)</h4><div id='messageList'></div></div>"></e-splitter-pane>
        
        <!-- Message Viewer Pane (50%, collapsible) -->
        <e-splitter-pane size="50%" collapsible="true" content="<div class='message-pane'><div id='messageViewer'><p style=\"color:#999;\" >Select a message to view</p></div></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

### Styling

```css
<style>
    .folder-pane {
        padding: 10px;
        background: #f9f9f9;
        overflow-y: auto;
    }
    
    .message-list-pane {
        padding: 10px;
        background: #fff;
        border-left: 1px solid #ddd;
        overflow-y: auto;
    }
    
    .message-pane {
        padding: 15px;
        background: #fff;
        border-left: 1px solid #ddd;
        overflow-y: auto;
    }
    
    .folder-item {
        padding: 8px;
        cursor: pointer;
        border-radius: 3px;
    }
    
    .folder-item:hover {
        background: #e8e8e8;
    }
    
    .message-item {
        padding: 10px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
    }
    
    .message-item:hover {
        background: #f5f5f5;
    }
    
    .message-item.selected {
        background: #e3f2fd;
    }
</style>
```

### JavaScript Interaction

Handle folder selection and message display:

```csharp
<script>
    const messages = {
        1: {
            subject: 'Project Update',
            from: 'john@example.com',
            date: 'Nov 15, 2024, 2:30 PM',
            body: 'Hi team, I wanted to provide an update on the Q4 project status...'
        },
        2: {
            subject: 'Meeting Reminder',
            from: 'manager@company.com',
            date: 'Nov 15, 2024, 1:15 PM',
            body: 'Don\'t forget about the planning meeting tomorrow at 2 PM...'
        },
        3: {
            subject: 'Code Review Approved',
            from: 'reviewer@company.com',
            date: 'Nov 15, 2024, 10:45 AM',
            body: 'Your pull request #1234 has been reviewed and approved...'
        }
    };
    
    function selectFolder(folder) {
        var heading = document.querySelector('.message-list-pane h4');
        heading.textContent = 'Messages (' + folder.toUpperCase() + ')';
        clearMessageSelection();
    }
    
    function selectMessage(id) {
        var msg = messages[id];
        var viewer = document.getElementById('messageViewer');
        
        viewer.innerHTML = '<h3>' + msg.subject + '</h3>' +
            '<p><strong>From:</strong> ' + msg.from + '</p>' +
            '<p><strong>Date:</strong> ' + msg.date + '</p>' +
            '<p>' + msg.body + '</p>';
        
        clearMessageSelection();
        event.currentTarget.classList.add('selected');
    }
    
    function clearMessageSelection() {
        var items = document.querySelectorAll('.message-item');
        items.forEach(function(item) {
            item.classList.remove('selected');
        });
    }
</script>
```

**Key Features:**
- Three-pane horizontal layout: Folders (15%), Messages (35%), Viewer (50%)
- Message viewer pane is collapsible to maximize message list space
- Folder selection updates message list heading
- Click actions for both folders and messages demonstrate interactivity
- Real-world email client UI patterns
