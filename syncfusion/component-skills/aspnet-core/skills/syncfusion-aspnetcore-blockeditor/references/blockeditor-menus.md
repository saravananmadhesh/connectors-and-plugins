# Block Editor Menus

## Inline Toolbar Configuration

The inline toolbar appears when text is selected, offering text formatting options.

### Built-in Toolbar Items

Default formatting actions:
- **Bold** - `Ctrl+B` (Windows) / `⌘+B` (Mac)
- **Italic** - `Ctrl+I` / `⌘+I`
- **Underline** - `Ctrl+U` / `⌘+U`
- **Strikethrough** - `Ctrl+Shift+X` / `⌘+⇧+X`
- **Link** - `Ctrl+K` / `⌘+K`

### Basic Inline Toolbar

```razor
@using Syncfusion.EJ2.BlockEditor

<ejs-blockeditor id="block-editor" blocks="@ViewBag.BlocksData">
    <e-blockeditor-toolbarsettings items="@(new string[] { "bold", "italic", "underline", "strikethrough", "link" })">
    </e-blockeditor-toolbarsettings>
</ejs-blockeditor>
```

### Enable Inline Code

```csharp
new 
{
    id = "inline-code",
    tag = "code",
    title = "Inline Code",
    icon = "e-icons e-code",
    action = "executeToolbarAction"
}
```

### Enable Inline Link

```csharp
new 
{
    id = "link",
    tag = "a",
    title = "Link",
    icon = "e-icons e-link",
    action = "executeToolbarAction"
}
```

### Font and Background Color Support

```csharp
new 
{
    id = "font-color",
    tag = "span",
    title = "Font Color",
    icon = "e-icons e-font-color",
    action = "fontColor"
},
new 
{
    id = "bg-color",
    tag = "span",
    title = "Background Color",
    icon = "e-icons e-bg-color",
    action = "backgroundColor"
}
```

### Customize Inline Toolbar

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-toolbarsettings 
        items="@(new string[] { "bold", "italic", "link", "font-color" })"
        enableTooltip="true"
        customClass="my-toolbar">
    </e-blockeditor-toolbarsettings>
</ejs-blockeditor>

<style>
    .e-toolbar.my-toolbar {
        background-color: #f0f0f0;
        border: 1px solid #ddd;
        padding: 8px;
    }
</style>
```

### Inline Toolbar Events

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-toolbarsettings 
        created="toolbarCreated"
        itemClick="toolbarItemClick">
    </e-blockeditor-toolbarsettings>
</ejs-blockeditor>

<script>
    function toolbarCreated(args) {
        console.log('Toolbar created', args);
    }
    
    function toolbarItemClick(args) {
        console.log('Item clicked:', args.item.id);
    }
</script>
```

## Block Actions Menu

The block action menu appears when hovering over a block, providing block-level operations.

### Built-in Block Action Items

- **Duplicate** - Copy the current block
- **Delete** - Remove the block
- **Indent** - Increase nesting level
- **Outdent** - Decrease nesting level
- **Move Up** - Move block up
- **Move Down** - Move block down

### Configure Block Action Menu

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-blockactionmenusettings 
        items="@(new string[] { "duplicate", "delete", "indent", "outdent", "moveup", "movedown" })"
        enableTooltip="true">
    </e-blockeditor-blockactionmenusettings>
</ejs-blockeditor>
```

### Block Action Menu Events

The block action menu supports events for opening, closing, and item selection:

**beforeOpen** - Fires before the menu opens:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-blockactionmenusettings 
        beforeOpen="onBlockMenuBeforeOpen">
    </e-blockeditor-blockactionmenusettings>
</ejs-blockeditor>

<script>
    function onBlockMenuBeforeOpen(args) {
        console.log('Menu opening for block:', args.element);
        console.log('Available items:', args.items);
        
        // Cancel menu opening if needed
        // args.cancel = true;
        
        // Modify menu items dynamically
        const blockType = args.element.getAttribute('data-blocktype');
        if (blockType === 'Code') {
            // Remove indent/outdent for code blocks
            args.items = args.items.filter(item => 
                item.id !== 'indent' && item.id !== 'outdent'
            );
        }
    }
</script>
```

**beforeClose** - Fires before the menu closes:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-blockactionmenusettings 
        beforeClose="onBlockMenuBeforeClose">
    </e-blockeditor-blockactionmenusettings>
</ejs-blockeditor>

<script>
    function onBlockMenuBeforeClose(args) {
        console.log('Menu closing');
        console.log('Event:', args.event);
        
        // Prevent menu from closing (e.g., during async operation)
        // args.cancel = true;
    }
</script>
```

**itemSelect** - Fires when a menu item is clicked:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-blockactionmenusettings 
        itemSelect="onBlockActionItemSelect">
    </e-blockeditor-blockactionmenusettings>
</ejs-blockeditor>

<script>
    function onBlockActionItemSelect(args) {
        console.log('Action selected:', args.item.id);
        console.log('Target element:', args.element);
        console.log('Is user interaction:', args.isInteracted);
        
        // Track analytics
        if (window.analytics) {
            window.analytics.track('BlockAction', {
                action: args.item.id,
                blockType: args.element.getAttribute('data-blocktype')
            });
        }
        
        // Custom action handling
        if (args.item.id === 'custom-action') {
            // Handle custom action
            args.cancel = true;  // Prevent default behavior
            performCustomAction(args.element);
        }
    }
    
    function performCustomAction(element) {
        console.log('Performing custom action on:', element);
        // Custom logic here
    }
</script>
```

### Complete Block Action Menu Configuration

```csharp
public IActionResult BlockActionsEditor()
{
    var actionItems = new List<object>
    {
        new 
        {
            id = "duplicate",
            label = "Duplicate Block",
            iconCss = "e-icons e-copy",
            tooltip = "Copy this block",
            shortcut = "Ctrl+D"
        },
        new 
        {
            id = "delete",
            label = "Delete Block",
            iconCss = "e-icons e-delete",
            tooltip = "Remove this block",
            shortcut = "Delete"
        },
        new 
        {
            id = "moveup",
            label = "Move Up",
            iconCss = "e-icons e-arrow-up",
            tooltip = "Move block up",
            shortcut = "Alt+Up"
        },
        new 
        {
            id = "movedown",
            label = "Move Down",
            iconCss = "e-icons e-arrow-down",
            tooltip = "Move block down",
            shortcut = "Alt+Down"
        },
        new 
        {
            id = "indent",
            label = "Indent",
            iconCss = "e-icons e-indent",
            tooltip = "Increase indent",
            shortcut = "Tab"
        },
        new 
        {
            id = "outdent",
            label = "Outdent",
            iconCss = "e-icons e-outdent",
            tooltip = "Decrease indent",
            shortcut = "Shift+Tab"
        }
    };
    
    ViewBag.ActionItems = actionItems;
    return View();
}
```

**View:**

```razor
@{
    var actionItems = ViewBag.ActionItems;
}

<ejs-blockeditor id="block-actions-editor" height="500px">
    <e-blockeditor-blockactionmenusettings 
        items="@actionItems"
        enableTooltip="true"
        popupWidth="230px"
        popupHeight="auto"
        beforeOpen="onBlockMenuBeforeOpen"
        beforeClose="onBlockMenuBeforeClose"
        itemSelect="onBlockActionItemSelect">
    </e-blockeditor-blockactionmenusettings>
</ejs-blockeditor>

<script>
    function onBlockMenuBeforeOpen(args) {
        const blockType = args.element.getAttribute('data-blocktype');
        console.log('Opening menu for:', blockType);
        
        // Disable certain actions for specific block types
        args.items.forEach(item => {
            if (blockType === 'Divider' && (item.id === 'indent' || item.id === 'outdent')) {
                item.disabled = true;
            }
        });
    }
    
    function onBlockMenuBeforeClose(args) {
        console.log('Closing block action menu');
    }
    
    function onBlockActionItemSelect(args) {
        console.log('Block action:', args.item.label);
        
        // Show notification
        showNotification(`Action: ${args.item.label}`);
    }
    
    function showNotification(message) {
        // Display a toast notification
        console.log('Notification:', message);
    }
</script>
```

## Slash Commands Menu

The slash command menu allows users to quickly insert blocks by typing `/`.

### Built-in Commands

| Command | Description |
|---------|-------------|
| `/heading` | Insert heading (levels 1-4) |
| `/paragraph` | Insert paragraph |
| `/bullet` | Insert bullet list |
| `/numbered` | Insert numbered list |
| `/checklist` | Insert checklist |
| `/quote` | Insert quote |
| `/callout` | Insert callout |
| `/code` | Insert code block |
| `/divider` | Insert divider |
| `/image` | Insert image |
| `/table` | Insert table |

### Basic Slash Command Configuration

```razor
<ejs-blockeditor id="block-editor" blocks="@ViewBag.BlocksData">
    <e-blockeditor-commandmenusettings enableTooltip="true" popupWidth="350px" popupHeight="400px">
    </e-blockeditor-commandmenusettings>
</ejs-blockeditor>
```

### Custom Slash Commands

```csharp
var commandMenuItems = new List<object>
{
    new 
    {
        id = "timestamp",
        groupHeader = "Actions",
        label = "Insert Timestamp",
        iconCss = "e-icons e-schedule"
    },
    new 
    {
        id = "divider",
        type = "Divider",
        groupHeader = "Utility",
        label = "Insert Divider",
        iconCss = "e-icons e-divider"
    },
    new 
    {
        id = "table-2x2",
        groupHeader = "Tables",
        label = "2x2 Table",
        iconCss = "e-icons e-table"
    }
};

ViewBag.CommandMenuItems = commandMenuItems;
```

### Pass Custom Commands to View

```razor
<ejs-blockeditor id="block-editor" blocks="@ViewBag.BlocksData">
    <e-blockeditor-commandmenusettings 
        enableTooltip="false" 
        popupWidth="350px" 
        popupHeight="400px" 
        commands="@ViewBag.CommandMenuItems"
        itemSelect="function(e){ itemSelect(e); }"
        filtering="function(e){ filtering(e); }">
    </e-blockeditor-commandmenusettings>
</ejs-blockeditor>

<script>
    function itemSelect(args) {
        console.log('Command selected:', args.item.id);
        // Handle custom command
    }
    
    function filtering(args) {
        // Filter commands as user types
        console.log('Search query:', args.searchText);
    }
</script>
```

### Command Menu Events

The command menu supports filtering and item selection events:

**filtering** - Fires when the user types to filter commands:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-commandmenusettings 
        filtering="onCommandFiltering">
    </e-blockeditor-commandmenusettings>
</ejs-blockeditor>

<script>
    function onCommandFiltering(args) {
        console.log('Search text:', args.text);
        console.log('Available commands:', args.commands);
        
        // Custom filtering logic
        if (args.text.startsWith('h')) {
            // Show only heading commands
            args.commands = args.commands.filter(cmd => 
                cmd.id.includes('heading') || cmd.label.toLowerCase().includes('head')
            );
        }
        
        // Cancel to use default filtering
        // args.cancel = true;
    }
</script>
```

**itemSelect** - Fires when a command is selected:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-commandmenusettings 
        itemSelect="onCommandItemSelect">
    </e-blockeditor-commandmenusettings>
</ejs-blockeditor>

<script>
    function onCommandItemSelect(args) {
        console.log('Command selected:', args.command.id);
        console.log('Command label:', args.command.label);
        console.log('Is user interaction:', args.isInteracted);
        console.log('Event:', args.event);
        
        // Handle custom commands
        if (args.command.id === 'timestamp') {
            args.cancel = true;  // Prevent default behavior
            insertTimestamp();
        }
        
        // Track usage
        if (window.analytics) {
            window.analytics.track('CommandUsed', {
                commandId: args.command.id,
                commandLabel: args.command.label
            });
        }
    }
    
    function insertTimestamp() {
        const editor = document.getElementById('block-editor').ej2_instances[0];
        const timestamp = new Date().toLocaleString();
        editor.insertContent(`<p>${timestamp}</p>`);
    }
</script>
```

### Command Item Model Properties

Each command item can have the following properties:

| Property | Type | Description |
|----------|------|-------------|
| **id** | string | Unique identifier for the command |
| **label** | string | Display text for the command |
| **groupBy** | string | Group header for organizing commands |
| **iconCss** | string | CSS class for the command icon |
| **type** | string | Command type (e.g., 'Divider' for separator) |
| **tooltip** | string | Tooltip text shown on hover |
| **shortcut** | string | Keyboard shortcut display text |
| **disabled** | boolean | Whether the command is disabled |

### Complete Command Menu Configuration with Events

```csharp
public IActionResult CustomCommandEditor()
{
    var commandMenuItems = new List<object>
    {
        // Content blocks
        new 
        {
            id = "heading1",
            groupBy = "Content",
            label = "Heading 1",
            iconCss = "e-icons e-h1",
            tooltip = "Insert H1 heading",
            shortcut = "Ctrl+Alt+1"
        },
        new 
        {
            id = "heading2",
            groupBy = "Content",
            label = "Heading 2",
            iconCss = "e-icons e-h2",
            tooltip = "Insert H2 heading",
            shortcut = "Ctrl+Alt+2"
        },
        new 
        {
            id = "paragraph",
            groupBy = "Content",
            label = "Paragraph",
            iconCss = "e-icons e-paragraph",
            tooltip = "Insert paragraph"
        },
        // Lists
        new 
        {
            id = "bulletlist",
            groupBy = "Lists",
            label = "Bullet List",
            iconCss = "e-icons e-list-unordered",
            tooltip = "Insert bullet list",
            shortcut = "Ctrl+Shift+8"
        },
        new 
        {
            id = "numberedlist",
            groupBy = "Lists",
            label = "Numbered List",
            iconCss = "e-icons e-list-ordered",
            tooltip = "Insert numbered list",
            shortcut = "Ctrl+Shift+7"
        },
        new 
        {
            id = "checklist",
            groupBy = "Lists",
            label = "Checklist",
            iconCss = "e-icons e-check-box",
            tooltip = "Insert task list"
        },
        // Custom commands
        new 
        {
            id = "timestamp",
            groupBy = "Custom",
            label = "Timestamp",
            iconCss = "e-icons e-schedule",
            tooltip = "Insert current date/time"
        },
        new 
        {
            id = "signature",
            groupBy = "Custom",
            label = "Signature",
            iconCss = "e-icons e-signature",
            tooltip = "Insert signature block"
        },
        // Media
        new 
        {
            id = "image",
            groupBy = "Media",
            label = "Image",
            iconCss = "e-icons e-image",
            tooltip = "Insert image",
            shortcut = "Ctrl+Shift+I"
        },
        new 
        {
            id = "video",
            groupBy = "Media",
            label = "Video",
            iconCss = "e-icons e-video",
            tooltip = "Embed video",
            disabled = false  // Can be set dynamically
        }
    };
    
    ViewBag.CommandItems = commandMenuItems;
    return View();
}
```

**View:**

```razor
@{
    var commandItems = ViewBag.CommandItems;
}

<ejs-blockeditor id="command-editor" height="600px">
    <e-blockeditor-commandmenusettings 
        commands="@commandItems"
        enableTooltip="true"
        popupWidth="380px"
        popupHeight="450px"
        filtering="onCommandFiltering"
        itemSelect="onCommandItemSelect">
    </e-blockeditor-commandmenusettings>
</ejs-blockeditor>

<script>
    function onCommandFiltering(args) {
        const searchText = args.text.toLowerCase();
        console.log('Filtering commands with:', searchText);
        
        // Custom filtering for aliases
        const aliases = {
            'h': ['heading1', 'heading2'],
            'list': ['bulletlist', 'numberedlist', 'checklist'],
            'media': ['image', 'video']
        };
        
        if (aliases[searchText]) {
            args.commands = args.commands.filter(cmd => 
                aliases[searchText].includes(cmd.id)
            );
            args.cancel = true;  // Use our filtered results
        }
        
        // Track search behavior
        console.log('Commands shown:', args.commands.length);
    }
    
    function onCommandItemSelect(args) {
        const editor = document.getElementById('command-editor').ej2_instances[0];
        const commandId = args.command.id;
        
        console.log('Command executed:', commandId);
        
        // Handle custom commands
        switch(commandId) {
            case 'timestamp':
                args.cancel = true;
                insertTimestamp(editor);
                break;
                
            case 'signature':
                args.cancel = true;
                insertSignature(editor);
                break;
                
            case 'video':
                args.cancel = true;
                promptVideoUrl(editor);
                break;
        }
        
        // Show toast notification
        showNotification(`Inserted: ${args.command.label}`);
    }
    
    function insertTimestamp(editor) {
        const now = new Date();
        const timestamp = now.toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        editor.insertContent(`<p><em>${timestamp}</em></p>`);
    }
    
    function insertSignature(editor) {
        const signature = `
            <div class="signature">
                <p>Best regards,</p>
                <p><strong>Your Name</strong></p>
                <p>Your Title</p>
            </div>
        `;
        editor.insertContent(signature);
    }
    
    function promptVideoUrl(editor) {
        const url = prompt('Enter video URL (YouTube, Vimeo, etc.):');
        if (url) {
            const embedCode = `<iframe src="${url}" width="560" height="315" frameborder="0" allowfullscreen></iframe>`;
            editor.insertContent(embedCode);
        }
    }
    
    function showNotification(message) {
        console.log('Notification:', message);
        // Integrate with toast component
    }
</script>

<style>
    .signature {
        margin: 20px 0;
        padding: 15px;
        border-left: 3px solid #007bff;
        background-color: #f8f9fa;
    }
    
    .signature p {
        margin: 5px 0;
    }
</style>
```

## Context Menu

Right-click context menu for block-level operations.

### Built-in Context Menu Items

-  **Undo/Redo**: Undo and redo actions.
-  **Cut/Copy/Paste**: Standard clipboard actions.
-  **Indent**: Increase or decrease the indent level of the selected block.
-  **Link**: Allows you to add or edit a hyperlink for the selected text. When a link is present, the context menu provides options such as `Open Link`, `Edit Link`, `Copy Link`, and `Remove Link`.
-  **Table**: Provides built-in table actions such as `Insert` and `Delete`. These options appear in the context menu when the cursor is focused within a table cell and the context menu is opened.

### Configure Context Menu

```razor
<ejs-blockeditor id="block-editor" blocks="@ViewBag.BlocksData">
    <e-blockeditor-contextmenusettings 
        enableTooltip="true"
        items="@(new string[] { "cut", "copy", "paste", "delete", "properties" })">
    </e-blockeditor-contextmenusettings>
</ejs-blockeditor>
```

### Context Menu Events

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-contextmenusettings 
        itemSelect="contextMenuSelect"
        beforeOpen="contextMenuBeforeOpen">
    </e-blockeditor-contextmenusettings>
</ejs-blockeditor>

<script>
    function contextMenuBeforeOpen(args) {
        console.log('Context menu opening');
        // Show/hide menu items based on context
    }
    
    function contextMenuSelect(args) {
        console.log('Context menu item selected:', args.item.id);
    }
</script>
```

## Complete Menu Example

Comprehensive example with all menus configured:

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor" blocks="@ViewBag.BlocksData">
        <!-- Inline Toolbar -->
        <e-blockeditor-toolbarsettings 
            items="@(new string[] { "bold", "italic", "underline", "strikethrough", "link" })"
            enableTooltip="true">
        </e-blockeditor-toolbarsettings>
        
        <!-- Block Action Menu -->
        <e-blockeditor-blockactionmenusettings 
            items="@(new string[] { "duplicate", "delete", "indent", "outdent", "moveup", "movedown" })"
            enableTooltip="true">
        </e-blockeditor-blockactionmenusettings>
        
        <!-- Slash Command Menu -->
        <e-blockeditor-commandmenusettings 
            enableTooltip="true" 
            popupWidth="350px" 
            popupHeight="400px"
            commands="@ViewBag.CommandMenuItems">
        </e-blockeditor-commandmenusettings>
        
        <!-- Context Menu -->
        <e-blockeditor-contextmenusettings 
            enableTooltip="true"
            items="@(new string[] { "cut", "copy", "paste", "delete" })">
        </e-blockeditor-contextmenusettings>
    </ejs-blockeditor>
</div>

<style>
    #blockeditor-container {
        margin: 20px auto;
        max-width: 900px;
    }
</style>

<script>
    function commandItemSelect(args) {
        console.log('Slash command:', args.item.id);
    }
    
    function contextMenuSelect(args) {
        console.log('Context menu:', args.item.id);
    }
    
    function blockActionSelect(args) {
        console.log('Block action:', args.item.id);
    }
</script>
```

**Controller:**

```csharp
public IActionResult Index()
{
    var commandMenuItems = new List<object>
    {
        new 
        {
            id = "timestamp",
            groupHeader = "Actions",
            label = "Insert Timestamp",
            iconCss = "e-icons e-schedule"
        }
    };
    
    var blocks = new List<BlockModel>
    {
        new BlockModel
        {
            id = "p1",
            blockType = "Paragraph",
            content = new List<object>
            {
                new { contentType = "Text", content = "Type '/' for commands, hover over blocks for actions" }
            }
        }
    };
    
    ViewBag.CommandMenuItems = commandMenuItems;
    ViewBag.BlocksData = blocks;
    return View();
}
```

## Menu Customization Best Practices

1. **Show relevant items only** - Filter menu items based on block type and context
2. **Use keyboard shortcuts** - Provide shortcut hints in tooltips
3. **Group related items** - Use separators or sections to organize menu items
4. **Provide visual feedback** - Use icons and colors to indicate action outcomes
5. **Enable tooltips** - Help users understand menu actions
6. **Handle events** - Log or track user actions from menus
7. **Customize styling** - Match menu appearance to your application design

## Toolbar Button Customization

Customize toolbar button appearance:

```css
.e-toolbar .e-btn-icon {
    font-size: 16px;
}

.e-toolbar.e-btn:hover {
    background-color: #e0e0e0;
}

.e-toolbar .e-btn.e-active {
    background-color: #007bff;
    color: white;
}
```

## Keyboard Shortcut Customization

Override default shortcuts:

```csharp
public IActionResult Index()
{
    var keyConfig = new 
    { 
        bold = "alt+b",
        italic = "alt+i",
        underline = "alt+u",
        link = "alt+l"
    };
    
    ViewBag.keyConfig = keyConfig;
    return View();
}
```

```razor
<ejs-blockeditor id="block-editor" keyConfig="@ViewBag.keyConfig">
</ejs-blockeditor>
```

## Block Transform Menu

The transform menu allows users to convert blocks from one type to another (e.g., Paragraph to Heading).

### Configure Transform Settings

Use `e-blockeditor-transformsettings` to customize the block transformation popup:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-transformsettings 
        popupWidth="280px"
        popupHeight="auto">
    </e-blockeditor-transformsettings>
</ejs-blockeditor>
```

### Transform Settings Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | array | *(all block types)* | Array of available transform options |
| `popupWidth` | string | "280px" | Width of the transform popup |
| `popupHeight` | string | "auto" | Height of the transform popup |

### Transform Events

Handle block transformation events:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-transformsettings itemSelect="onTransformSelect">
    </e-blockeditor-transformsettings>
</ejs-blockeditor>

<script>
    function onTransformSelect(args) {
        console.log('Block transformed to:', args.command.type);
        console.log('Target element:', args.element);
        
        // Cancel transformation if needed
        // args.cancel = true;
    }
</script>
```

### Custom Transform Menu Items

Configure specific transform options:

```csharp
public IActionResult TransformEditor()
{
    var transformItems = new List<object>
    {
        new 
        {
            id = "paragraph",
            type = "Paragraph",
            label = "Paragraph",
            iconCss = "e-icons e-paragraph",
            tooltip = "Convert to paragraph"
        },
        new 
        {
            id = "heading1",
            type = "Heading",
            label = "Heading 1",
            iconCss = "e-icons e-h1",
            tooltip = "Convert to heading level 1"
        },
        new 
        {
            id = "heading2",
            type = "Heading",
            label = "Heading 2",
            iconCss = "e-icons e-h2",
            tooltip = "Convert to heading level 2"
        },
        new 
        {
            id = "checklist",
            type = "Checklist",
            label = "Checklist",
            iconCss = "e-icons e-checkbox",
            tooltip = "Convert to checklist"
        },
        new 
        {
            id = "code",
            type = "Code",
            label = "Code Block",
            iconCss = "e-icons e-code",
            tooltip = "Convert to code block"
        },
        new 
        {
            id = "quote",
            type = "Quote",
            label = "Quote",
            iconCss = "e-icons e-quote",
            tooltip = "Convert to quote block"
        }
    };
    
    ViewBag.TransformItems = transformItems;
    return View();
}
```

**View:**

```razor
@{
    var transformItems = ViewBag.TransformItems;
}

<ejs-blockeditor id="transform-editor" height="500px">
    <e-blockeditor-transformsettings 
        items="@transformItems"
        popupWidth="300px"
        popupHeight="auto"
        itemSelect="onTransformSelect">
    </e-blockeditor-transformsettings>
</ejs-blockeditor>

<script>
    function onTransformSelect(args) {
        console.log('Transforming block to:', args.command.label);
        
        // Track transformation analytics
        if (window.analytics) {
            window.analytics.track('BlockTransform', {
                fromType: args.element.getAttribute('data-blocktype'),
                toType: args.command.type
            });
        }
    }
</script>
```

### Complete Transform Configuration

```csharp
public IActionResult FullTransformEditor()
{
    var allTransformOptions = new List<object>
    {
        // Text Blocks
        new { id = "paragraph", type = "Paragraph", label = "Paragraph", iconCss = "e-icons e-paragraph" },
        new { id = "heading1", type = "Heading", label = "Heading 1", iconCss = "e-icons e-h1" },
        new { id = "heading2", type = "Heading", label = "Heading 2", iconCss = "e-icons e-h2" },
        new { id = "heading3", type = "Heading", label = "Heading 3", iconCss = "e-icons e-h3" },
        new { id = "heading4", type = "Heading", label = "Heading 4", iconCss = "e-icons e-h4" },
        
        // List Blocks
        new { id = "bulletlist", type = "BulletList", label = "Bullet List", iconCss = "e-icons e-list-unordered" },
        new { id = "numberedlist", type = "NumberedList", label = "Numbered List", iconCss = "e-icons e-list-ordered" },
        new { id = "checklist", type = "Checklist", label = "Checklist", iconCss = "e-icons e-checkbox" },
        
        // Special Blocks
        new { id = "code", type = "Code", label = "Code Block", iconCss = "e-icons e-code" },
        new { id = "quote", type = "Quote", label = "Quote", iconCss = "e-icons e-quote" },
        new { id = "callout", type = "Callout", label = "Callout", iconCss = "e-icons e-annotation" },
        
        // Collapsible Blocks
        new { id = "collapsibleheading", type = "CollapsibleHeading", label = "Collapsible Heading", iconCss = "e-icons e-chevron-down" },
        new { id = "collapsibleparagraph", type = "CollapsibleParagraph", label = "Collapsible Paragraph", iconCss = "e-icons e-chevron-down" }
    };
    
    ViewBag.AllTransformOptions = allTransformOptions;
    return View();
}
```

### Transform Use Cases

1. **Quick Formatting** - Change paragraph to heading for structure
2. **List Conversion** - Convert bullet list to numbered list
3. **Code Documentation** - Transform paragraph to code block
4. **Emphasis** - Convert text to quote or callout
5. **Organization** - Create collapsible sections from regular blocks