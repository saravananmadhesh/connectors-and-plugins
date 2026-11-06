# Tab Interaction Features

## Table of Contents
- [Tab Selection Overview](#tab-selection-overview)
- [Programmatic Tab Selection](#programmatic-tab-selection)
- [Selection Events](#selection-events)
- [Click Handlers and Selection Callbacks](#click-handlers-and-selection-callbacks)
- [Keyboard Navigation](#keyboard-navigation)
- [Drag-and-Drop Reordering](#drag-and-drop-reordering)
- [Nested Tabs](#nested-tabs)
- [User vs Programmatic Selection Detection](#user-vs-programmatic-selection-detection)

## Tab Selection Overview

Tab selection can be triggered by:
1. User clicking a header
2. Keyboard navigation (Tab key)
3. Programmatic API calls
4. Drag-and-drop reordering

The `selectedItem` property tracks the currently active tab by index (0-based).

## Programmatic Tab Selection

Set or change the active tab using the `selectedItem` property or API methods.

### Initial Selection

Set the active tab when component initializes:

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab" selectedItem="1">
    <!-- Tab at index 1 (second tab) is selected on load -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 0" })" content="First content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Second content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Third content"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Dynamic Selection via JavaScript

```cshtml
<button onclick="selectTab(0)">Select First</button>
<button onclick="selectTab(1)">Select Second</button>
<button onclick="selectTab(2)">Select Third</button>

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 0" })" content="First"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Second"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Third"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<script>
    function selectTab(index) {
        var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
        tabObj.select(index);  // Select tab by index
    }
</script>
```

### Get Current Selection

```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
var currentIndex = tabObj.selectedItem;  // Get currently selected tab index
console.log('Active tab index:', currentIndex);
```

## Selection Events

The Tab component fires events before and after tab selection.

### Event Sequence

1. `selecting` - Fires before selection (cancellable)
2. `selected` - Fires after selection (non-cancellable)

### Selecting Event (Before Selection)

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab" selecting="onSelecting">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content 1"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Content 2"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<script>
    function onSelecting(args) {
        // args.index - Index of tab being selected
        // args.previousIndex - Index of previously selected tab
        // args.isInteracted - true if user clicked, false if programmatic
        
        console.log('Selecting tab at index:', args.index);
        
        // Prevent selection by setting cancel
        if (args.index === 0) {
            args.cancel = true;  // Block selection of first tab
        }
    }
</script>
```

### Selected Event (After Selection)

```cshtml
<ejs-tab id="ej2Tab" selected="onSelected">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content 1"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Content 2"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<script>
    function onSelected(args) {
        // args.index - Index of newly selected tab
        // args.previousIndex - Index of previously selected tab
        // args.isInteracted - true if user clicked, false if programmatic
        
        console.log('Tab selected at index:', args.index);
        
        // Perform actions on tab switch
        loadTabData(args.index);
    }
</script>
```

### Event Arguments

| Property | Type | Description |
|----------|------|-------------|
| `index` | `number` | Index of the currently active tab |
| `previousIndex` | `number` | Index of the previously active tab |
| `isInteracted` | `boolean` | `true` if user triggered, `false` if programmatic |
| `cancel` | `boolean` | Set to `true` in `selecting` to prevent selection |
| `element` | `HTMLElement` | The content element of the selected tab |

## Click Handlers and Selection Callbacks

Execute custom logic when tabs are clicked.

### Tab Click Handler

```cshtml
<ejs-tab id="ej2Tab" selected="onTabClicked">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Reports" })" content=""></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Analytics" })" content=""></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<script>
    var loadedTabs = {};  // Cache loaded content
    
    function onTabClicked(args) {
        if (!args.isInteracted) return;  // Skip programmatic selections
        
        // Load data for clicked tab
        if (!loadedTabs[args.index]) {
            fetch(`/api/tab-data/${args.index}`)
                .then(response => response.json())
                .then(data => {
                    args.element.innerHTML = generateHTML(data);
                    loadedTabs[args.index] = true;
                });
        }
    }
</script>
```

### Tab Close Button

Enable close button to remove tab items:

```cshtml
<ejs-tab id="ej2Tab" showCloseButton="true" removing="removing" removed="removed">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Content"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

With close button enabled, users see an 'x' icon. Combine with removal event:

```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];

function removing(args) {
    // Confirm before removal
    if (!confirm('Remove this tab?')) {
        args.cancel = true;
    }
};

function removed(args) {
    console.log('Tab removed at index:', args.index);
};
```

## Keyboard Navigation

Navigate between tabs using keyboard.

### Tab Key Navigation (Default)

The Tab key moves focus between tab headers (standard accessibility):

```cshtml
<ejs-tab id="ej2Tab">
    <!-- Press Tab to navigate between headers -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 3" })" content="Content"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Arrow Key Navigation

Allow arrow keys (←/→ or ↑/↓) to switch tabs:

```javascript
document.addEventListener('keydown', function(e) {
    var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
    var items = tabObj.items.length;
    var current = tabObj.selectedItem;
    
    if (e.key === 'ArrowRight') {
        tabObj.select((current + 1) % items);
    } else if (e.key === 'ArrowLeft') {
        tabObj.select((current - 1 + items) % items);
    }
});
```

### Enhanced Keyboard Support

```javascript
// Navigate with arrow keys, Enter to select, Delete to close
document.addEventListener('keydown', function(e) {
    var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
    
    switch(e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
            tabObj.select((tabObj.selectedItem + 1) % tabObj.items.length);
            break;
        case 'ArrowLeft':
        case 'ArrowUp':
            var prev = tabObj.selectedItem - 1;
            tabObj.select(prev < 0 ? tabObj.items.length - 1 : prev);
            break;
        case 'Delete':
            if (tabObj.items.length > 1) {
                tabObj.removeTab(tabObj.selectedItem);
            }
            break;
    }
});
```

## Drag-and-Drop Reordering

Enable users to reorder tabs by dragging headers.

### Basic Drag-and-Drop

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab" allowDragAndDrop="true" onDragStart="onDragStart" dragging="dragging" dragged="dragged">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Home" })" content="Home content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Profile" })" content="Profile content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Settings" })" content="Settings content"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Drag Events

Control drag behavior with events:

```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];

// Prevent dragging specific tab
function onDragStart(args) {
    if (args.index === 0) {
        args.cancel = true;  // Prevent dragging first tab
    }
};

// Monitor dragging
function dragging(args) {
    console.log('Dragging tab at index:', args.index);
};

// Track completed drag
function dragged(args) {
    console.log('Tab dropped from index:', args.source.index);
    console.log('Tab dropped to index:', args.target.index);
};
```

### Drag Area Restriction

Limit dragging to specific region:

```cshtml
<ejs-tab id="ej2Tab" allowDragAndDrop="true" dragArea=".tab-container">
    <!-- Dragging only works within .tab-container element -->
</ejs-tab>
```

### Tab-to-Tab Drag-and-Drop

Transfer items between two tabs:

```cshtml
<h3>Source Tab</h3>
<ejs-tab id="sourceTab" allowDragAndDrop="true" dragged="dragged">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Item 1" })" content="Content 1"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Item 2" })" content="Content 2"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<h3>Target Tab</h3>
<ejs-tab id="targetTab" allowDragAndDrop="true">
    <e-tab-tabitems>
    </e-tab-tabitems>
</ejs-tab>

<script>
    var sourceTab = document.getElementById('sourceTab').ej2_instances[0];
    var targetTab = document.getElementById('targetTab').ej2_instances[0];
    
    function dragged(args) {
        // Move dragged item to target tab
        var draggedItem = sourceTab.items[args.index];
        
        targetTab.addTab([{
            header: draggedItem.header,
            content: draggedItem.content
        }]);
        
        sourceTab.removeTab(args.index);
    };
</script>
```

## Nested Tabs

Create tabs within tab content (hierarchical tabs).

### Nested Tab Structure

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="parentTab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Parent 1" })" 
                        content="@Html.Raw(GetNestedTabsHtml())">
        </e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Parent 2" })" 
                        content="Parent content 2">
        </e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

@{
    string GetNestedTabsHtml()
    {
        return @"
            <ejs-tab id='childTab'>
                <e-tab-tabitems>
                    <e-tab-tabitem header='Child 1' content='Nested content 1'></e-tab-tabitem>
                    <e-tab-tabitem header='Child 2' content='Nested content 2'></e-tab-tabitem>
                </e-tab-tabitems>
            </ejs-tab>";
    }
}
```

### Nested Tab Initialization

Ensure child tabs are initialized after parent:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // Parent tab initializes first (via Tag Helper)
    // Child tabs initialized after parent content renders
    
    setTimeout(function() {
        var childTabElement = document.getElementById('childTab');
        if (childTabElement && !childTabElement.ej2_instances) {
            new ej.navigations.Tab({}, childTabElement);
        }
    }, 100);
});
```

## User vs Programmatic Selection Detection

Distinguish between user interactions and programmatic changes.

### Using isInteracted Flag

```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];

function selected(args) {
    if (args.isInteracted) {
        console.log('User clicked tab', args.index);
        // Load remote data
        loadTabData(args.index);
    } else {
        console.log('Tab changed programmatically to', args.index);
        // Skip loading, data set by program
    }
};

// Programmatic selection (isInteracted = false)
tabObj.select(2);

// User click triggers with isInteracted = true
```

### Conditional Logic Based on Interaction

```javascript
function selected(args) {
    if (args.isInteracted) {
        // User actions
        saveTabPreference(args.index);  // Remember user choice
        loadUserData(args.index);       // Load remote data
    } else {
        // Programmatic restoration
        console.log('Restored previously selected tab');
    }
};
```

---

**Next Steps:** Explore styling-layout.md for header customization and visual styling, or advanced-features.md for additional Tab capabilities.
