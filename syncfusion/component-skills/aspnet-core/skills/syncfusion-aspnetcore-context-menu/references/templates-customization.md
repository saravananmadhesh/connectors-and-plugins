# Templates and Custom Rendering

## Table of Contents
- [Item Templates Overview](#item-templates-overview)
- [BeforeItemRender Event](#beforeitemrender-event)
- [Rendering Custom HTML](#rendering-custom-html)
- [Dynamic Content Generation](#dynamic-content-generation)
- [UI Components in Items](#ui-components-in-items)

## Item Templates Overview

The `itemTemplate` property allows you to define custom HTML templates for menu items instead of simple text:

**Property:** `itemTemplate` (string | Function)

**When to Use:**
- Complex menu item layouts (icons + badges + descriptions)
- Rich formatting with multi-line content
- Dynamically generated item structures
- Responsive designs requiring different layouts per breakpoint

**String Template Syntax:**
```html
<ejs-contextmenu id="contextmenu" 
                 target="#target" 
                 itemTemplate="<div class='custom-item'>${text} <span class='badge'>${badge}</span></div>">
    <e-menu-items>
        <e-menu-item text="Edit" badge="pro"></e-menu-item>
        <e-menu-item text="Delete" badge=""></e-menu-item>
    </e-menu-items>
</ejs-contextmenu>

<style>
.custom-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px;
}

.badge {
    background: #007bff;
    color: white;
    padding: 2px 6px;
    border-radius: 12px;
    font-size: 12px;
}
</style>
```

**Template Variables:**
- `${text}` - Menu item text
- `${id}` - Menu item id
- `${iconCss}` - Menu item icon CSS class
- `${url}` - Menu item URL
- `${separator}` - Separator flag
- Custom data properties from your data source

## BeforeItemRender Event

The `beforeItemRender` event fires when rendering each menu item, allowing frame-by-frame customization:

**Event:** `beforeItemRender`

**Event Arguments:**
- `name` (string): Event name ("beforeItemRender")
- Item context with access to item element and data

**Syntax:**
```html
<ejs-contextmenu id="contextmenu" 
                 target="#target" 
                 beforeItemRender="beforeItemRender"
                 items="Model.MenuItems">
</ejs-contextmenu>

<script>
function beforeItemRender(args) {
    // Customize item based on arguments
    console.log('Event name:', args.name);
}
</script>
```

**MenuEventArgs Properties (Available in Event):**
- `name` (string): Event name identifier ("beforeItemRender")
- `element` (HTMLElement): The rendered item element
- `item` (MenuItemModel): Menu item data

**Event Handler Pattern:**
```csharp
// In Page Model - configure event
public void OnGet()
{
    // Event is registered in view using event binding
}
```

**JavaScript Event Handler:**
```html
<ejs-contextmenu id="contextmenu" target="#target" beforeItemRender="beforeItemRender" items="Model.MenuItems"></ejs-contextmenu>

<script>
function onBeforeItemRender(args) {
    // args.element: The <li> element for this item
    // args.name: "beforeItemRender"
    
    // Example: Disable specific items
    if (args.element.textContent === "Delete") {
        args.element.classList.add('disabled');
        args.element.style.pointerEvents = 'none';
        args.element.style.opacity = '0.5';
    }
    
    // Example: Add custom classes
    if (args.element.textContent.includes("Pro")) {
        args.element.classList.add('premium-feature');
    }
}
</script>
```

## Rendering Custom HTML

Add custom HTML elements within menu items during rendering:

**Example 1: Add Keyboard Shortcuts**
```html
<ejs-contextmenu id="contextmenu" target="#target" beforeItemRender="addKeyboardHints"></ejs-contextmenu>

<script>
function addKeyboardHints(args) {
    var itemText = args.element.textContent.trim();
    var keyMap = {
        'Save': 'Ctrl+S',
        'Copy': 'Ctrl+C',
        'Paste': 'Ctrl+V',
        'Cut': 'Ctrl+X'
    };
    
    if (keyMap[itemText]) {
        var hint = document.createElement('span');
        hint.className = 'keyboard-hint';
        hint.textContent = keyMap[itemText];
        hint.style.marginLeft = 'auto';
        hint.style.fontSize = '12px';
        hint.style.color = '#999';
        
        args.element.style.display = 'flex';
        args.element.style.justifyContent = 'space-between';
        args.element.appendChild(hint);
    }
}
</script>

<style>
.e-menu-item {
    display: flex !important;
    justify-content: space-between;
}
</style>
```

**Example 2: Add Status Indicators**
```html
<ejs-contextmenu id="contextmenu" target="#target" beforeItemRender="addStatusIndicators"></ejs-contextmenu>

<script>
function addStatusIndicators(args) {
    // Create visual indicator based on item type
    var indicator = document.createElement('span');
    indicator.className = 'status-indicator';
    
    if (args.element.textContent.includes('Save')) {
        indicator.className += ' saved';
        indicator.title = 'Auto-saved';
    } else if (args.element.textContent.includes('Update')) {
        indicator.className += ' pending';
        indicator.title = 'Pending update';
    }
    
    args.element.appendChild(indicator);
}
</script>

<style>
.status-indicator {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 8px;
}

.status-indicator.saved {
    background: #28a745;
}

.status-indicator.pending {
    background: #ffc107;
}
</style>
```

**Example 3: Render Checkboxes**
```html
<ejs-contextmenu id="contextmenu" target="#target" beforeItemRender="addCheckboxes"></ejs-contextmenu>

<script>
function addCheckboxes(args) {
    var itemText = args.element.textContent.trim();
    
    // List of checkbox items
    if (['Show Sidebar', 'Show Toolbar', 'Show StatusBar'].includes(itemText)) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = localStorage.getItem(itemText) !== 'false';
        checkbox.style.marginRight = '8px';
        checkbox.addEventListener('click', function(e) {
            e.stopPropagation();
            localStorage.setItem(itemText, checkbox.checked);
        });
        
        // Clear existing text
        args.element.textContent = '';
        
        // Add checkbox and label
        var label = document.createElement('label');
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        label.style.width = '100%';
        label.style.cursor = 'pointer';
        
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(itemText));
        
        args.element.appendChild(label);
    }
}
</script>
```

## Dynamic Content Generation

Generate menu item content based on runtime data:

**Example: Icon and Description**
```html
<ejs-contextmenu id="contextmenu" target="#target" beforeItemRender="renderItemWithDescription"></ejs-contextmenu>

<script>
function renderItemWithDescription(args) {
    var itemDescriptions = {
        'New Document': 'Create a new blank document',
        'Open File': 'Open an existing document',
        'Recent Files': 'View recently accessed files',
        'Properties': 'Edit document properties'
    };
    
    var itemText = args.element.textContent.trim();
    var description = itemDescriptions[itemText];
    
    if (description) {
        // Create container
        var container = document.createElement('div');
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        
        // Create title
        var title = document.createElement('div');
        title.style.fontWeight = 'bold';
        title.textContent = itemText;
        
        // Create description
        var desc = document.createElement('div');
        desc.style.fontSize = '12px';
        desc.style.color = '#666';
        desc.style.marginTop = '2px';
        desc.textContent = description;
        
        container.appendChild(title);
        container.appendChild(desc);
        
        // Clear and rebuild element
        args.element.textContent = '';
        args.element.appendChild(container);
        args.element.style.padding = '8px 12px';
    }
}
</script>
```

**Example: Conditional Rendering Based on State**
```html
<ejs-contextmenu id="contextmenu" target="#target" beforeItemRender="conditionalRendering"></ejs-contextmenu>

<script>
function conditionalRendering(args) {
    var currentUser = getCurrentUser(); // Get user from app state
    var itemText = args.element.textContent.trim();
    
    // Admin-only items
    if (currentUser.role !== 'admin' && ['Delete All', 'Clear History'].includes(itemText)) {
        // Disable with visual indicator
        args.element.style.opacity = '0.5';
        args.element.style.pointerEvents = 'none';
        args.element.title = 'Admin only';
        
        var lock = document.createElement('span');
        lock.textContent = ' 🔒';
        args.element.appendChild(lock);
    }
    
    // User-specific items
    if (itemText === 'My Documents') {
        args.element.querySelector('a').href = `/user/${currentUser.id}/documents`;
    }
}

function getCurrentUser() {
    return {
        id: 123,
        role: 'user'
    };
}
</script>
```

## UI Components in Items

Embed interactive UI components within menu items:

**Example: Inline Buttons**
```html
<ejs-contextmenu id="contextmenu" target="#target" beforeItemRender="addInlineButtons"></ejs-contextmenu>

<script>
function addInlineButtons(args) {
    if (args.element.textContent.trim() === 'Color') {
        var container = document.createElement('div');
        container.style.display = 'flex';
        container.style.gap = '8px';
        container.style.alignItems = 'center';
        
        var label = document.createElement('span');
        label.textContent = 'Color:';
        container.appendChild(label);
        
        var colors = ['red', 'green', 'blue', 'yellow'];
        colors.forEach(function(color) {
            var btn = document.createElement('button');
            btn.style.width = '24px';
            btn.style.height = '24px';
            btn.style.backgroundColor = color;
            btn.style.border = '1px solid #ccc';
            btn.style.borderRadius = '4px';
            btn.style.cursor = 'pointer';
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                applyColor(color);
            });
            container.appendChild(btn);
        });
        
        args.element.textContent = '';
        args.element.appendChild(container);
    }
}

function applyColor(color) {
    console.log('Applied color:', color);
}
</script>
```

**Example: Input Field**
```html
<ejs-contextmenu id="contextmenu" target="#target" beforeItemRender="addInputField"></ejs-contextmenu>

<script>
function addInputField(args) {
    if (args.element.textContent.trim() === 'Search') {
        var input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter search term...';
        input.style.padding = '4px 8px';
        input.style.border = '1px solid #ddd';
        input.style.borderRadius = '4px';
        input.style.width = '200px';
        
        input.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent menu from closing
        });
        
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch(input.value);
            }
        });
        
        args.element.textContent = '';
        args.element.appendChild(input);
        input.focus();
    }
}

function performSearch(query) {
    console.log('Search for:', query);
}
</script>
```

**Important:** When adding interactive elements, use `e.stopPropagation()` to prevent menu from closing on interaction.

