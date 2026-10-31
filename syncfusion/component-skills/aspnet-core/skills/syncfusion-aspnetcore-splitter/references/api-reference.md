# API Reference

Complete API documentation for the Syncfusion ASP.NET Core Splitter component, including all properties, methods, and events.

## Table of Contents

- [Splitter Properties](#splitter-properties)
  - [Splitter Configuration Properties](#splitter-configuration-properties)
  - [Splitter Behavior Properties](#splitter-behavior-properties)
  - [Splitter Customization Properties](#splitter-customization-properties)
- [Pane Properties](#pane-properties)
  - [Pane Size Properties](#pane-size-properties)
  - [Pane Content Properties](#pane-content-properties)
  - [Pane Behavior Properties](#pane-behavior-properties)
  - [Pane Customization Properties](#pane-customization-properties)
- [Methods](#methods)
  - [Pane Management Methods](#pane-management-methods)
  - [Event Management Methods](#event-management-methods)
  - [Component Lifecycle Methods](#component-lifecycle-methods)
  - [Module Injection](#module-injection)
- [Events](#events)
- [Event Arguments](#event-arguments)
  - [BeforeExpandEventArgs](#beforeexpandeventargs)
  - [ExpandedEventArgs](#expandedeventargs)
  - [ResizeEventArgs](#resizeeventargs)
  - [ResizingEventArgs](#resizingeventargs)
  - [BeforeSanitizeHtmlArgs](#beforesanitizehtmlargs)

---

## Splitter Properties

### Splitter Configuration Properties

#### `orientation`

**Type:** `Horizontal` | `Vertical`  
**Default:** `Horizontal`

Specifies whether to align the split panes horizontally (left-to-right) or vertically (top-to-bottom).

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="400px" 
              orientation="Vertical">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Top Pane</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Bottom Pane</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `height`

**Type:** `string` (accepts both string and number values)

Specifies the height of the Splitter component. Values can be in pixels (`400px`), percentages (`100%`), or auto-sized.

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="600px" 
              width="100%">
    <e-splitter-panes>
        <e-splitter-pane size="30%" content="<div>Left</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>Right</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `width`

**Type:** `string` (accepts both string and number values)

Specifies the width of the Splitter component. Values can be in pixels, percentages, or auto-sized.

**Example:**

```csharp
<ejs-splitter id="splitter" 
              width="100%" 
              height="500px">
    <e-splitter-panes>
        <e-splitter-pane size="40%" content="<div>Left Pane</div>"></e-splitter-pane>
        <e-splitter-pane size="60%" content="<div>Right Pane</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `separatorSize`

**Type:** `number`  
**Default:** `1`

Specifies the size (width or height) of the separator line between panes in pixels.

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="400px" 
              separatorSize="5">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Left Pane</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Right Pane</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

### Splitter Behavior Properties

#### `enabled`

**Type:** `boolean`  
**Default:** `true`

Specifies whether the Splitter component is enabled or disabled. When disabled, users cannot interact with the component.

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="400px" 
              enabled="false">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Disabled Pane 1</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Disabled Pane 2</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `enablePersistence`

**Type:** `boolean`  
**Default:** `false`

Enables or disables persisting the component's state (pane sizes, collapsed state) between page reloads. When enabled, the splitter remembers the user's layout preferences.

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="400px" 
              enablePersistence="true">
    <e-splitter-panes>
        <e-splitter-pane size="30%" collapsible="true" content="<div>Panel 1</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>Panel 2</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `enableRtl`

**Type:** `boolean`  
**Default:** `false`

Enables or disables rendering the component in right-to-left (RTL) direction for languages like Arabic, Hebrew, etc.

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="400px" 
              enableRtl="true">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>يمين</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>يسار</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `enableReversePanes`

**Type:** `boolean`  
**Default:** `false`

Specifies whether splitter panes are reordered (reversed) or not. When enabled, panes appear in reverse order.

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="400px" 
              enableReversePanes="true">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>First (displays last)</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Second (displays first)</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `enableHtmlSanitizer`

**Type:** `boolean`  
**Default:** `true`

Defines whether to allow cross-site scripting (XSS) attacks or sanitize HTML content in panes. When enabled, unsafe HTML is sanitized for security.

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="400px" 
              enableHtmlSanitizer="true">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Safe Content</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Sanitized Content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

### Splitter Customization Properties

#### `cssClass`

**Type:** `string`

Specifies CSS class names that define custom styles and themes for the Splitter control. Multiple classes can be specified.

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="400px" 
              cssClass="dark-theme custom-border">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Left Pane</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Right Pane</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

CSS:

```css
.dark-theme {
    background-color: #333;
    color: #fff;
}

.dark-theme .e-split-bar {
    background-color: #555;
}

.custom-border {
    border: 2px solid #0969da;
}
```

---

#### `locale`

**Type:** `string`  
**Default:** `en-US`

Overrides the global culture and localization value for this component. Allows setting language-specific formatting and translations.

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="400px" 
              locale="fr-FR">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Panneau Gauche</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Panneau Droit</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `paneSettings`

**Type:** [`PanePropertiesModel[]`](#pane-properties)

Configures individual pane behaviors such as content, size, resizable, collapsible, and collapsed properties for each pane.

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="25%" min="100px" max="500px" collapsible="true" resizable="true" content="<div>Sidebar Panel</div>"></e-splitter-pane>
        <e-splitter-pane size="75%" content="<div>Main Content</div>\"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

## Pane Properties

Pane properties are configured within `<e-splitter-pane>` tag helpers to control individual pane behavior.

### Pane Size Properties

#### `size`

**Type:** `string` (pixels, percentages, or auto)

Configures the initial size of each pane. Can use pixels (`200px`), percentages (`50%`), or `auto`.

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="200px" content="<div>Fixed Width: 200px</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Percentage: 50%</div>"></e-splitter-pane>
        <e-splitter-pane size="auto" content="<div>Auto-sized</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `min`

**Type:** `string` (pixels or percentages)

Specifies the minimum size a pane can be resized to. Prevents pane from becoming smaller than this limit.

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" min="100px" content="<div>Minimum size: 100px</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>Main content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `max`

**Type:** `string` (pixels or percentages)

Specifies the maximum size a pane can be resized to. Prevents pane from becoming larger than this limit.

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" max="300px" content="<div>Maximum size: 300px</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>Content area</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

### Pane Content Properties

#### `content`

**Type:** `string` | `HTMLElement`

Specifies the content of a pane as plain text, HTML markup, or reference to another element.

**Example - HTML Content:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" content="<div><h3>Navigation</h3><ul><li>Item 1</li><li>Item 2</li></ul></div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>Main content goes here</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

### Pane Behavior Properties

#### `resizable`

**Type:** `boolean`  
**Default:** `true`

Specifies whether a pane can be resized by dragging the separator. Disable for panes that should have fixed sizes.

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" resizable="false" content="<div>Fixed width header (not resizable)</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" resizable="true" content="<div>Resizable content pane</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `collapsible`

**Type:** `boolean`  
**Default:** `false`

Specifies whether a pane is collapsible (shows collapse/expand button). When true, users can toggle the pane visibility.

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="25%" collapsible="true" content="<div>Collapsible sidebar</div>"></e-splitter-pane>
        <e-splitter-pane size="75%" content="<div>Main content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

#### `collapsed`

**Type:** `boolean`  
**Default:** `false`

Specifies the initial state of a pane. When `true`, the pane is collapsed on initial rendering. Requires `collapsible="true"`.

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="25%" collapsible="true" collapsed="true" content="<div>Initially hidden sidebar</div>"></e-splitter-pane>
        <e-splitter-pane size="75%" content="<div>Main content (always visible)</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

---

### Pane Customization Properties

#### `cssClass`

**Type:** `string`

Specifies CSS class names for custom styling of individual panes. Multiple classes can be specified.

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="30%" cssClass="sidebar-pane" content="<div>Sidebar with custom styling</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" cssClass="main-pane" content="<div>Main pane with custom styling</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>
```

CSS:

```css
.sidebar-pane {
    background-color: #f5f5f5;
    padding: 15px;
}

.main-pane {
    background-color: #fff;
    padding: 20px;
}
```

---

## Methods

Splitter methods allow programmatic control of panes and component behavior. Call methods using JavaScript on the splitter instance.

### Pane Management Methods

#### `expand(index: number)`

Expands the pane at the specified index. Requires the pane to have `collapsible="true"`.

**Parameters:**
- `index` (number): Index of the pane to expand

**Links:** See [Expand and Collapse Guide](expand-collapse.md) for detailed examples

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="25%" collapsible="true" collapsed="true" content="<div>Sidebar</div>"></e-splitter-pane>
        <e-splitter-pane size="75%" content="<div>Main content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<button onclick="expandPane()">Expand Sidebar</button>

<script>
    function expandPane() {
        var splitterObj = document.getElementById('splitter').ej2_instances[0];
        splitterObj.expand(0); // Expand pane at index 0
    }
</script>
```

---

#### `collapse(index: number)`

Collapses the pane at the specified index. Requires the pane to have `collapsible="true"`.

**Parameters:**
- `index` (number): Index of the pane to collapse

**Links:** See [Expand and Collapse Guide](expand-collapse.md) for detailed examples

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="25%" collapsible="true" content="<div>Sidebar</div>"></e-splitter-pane>
        <e-splitter-pane size="75%" content="<div>Main content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<button onclick="collapsePane()">Collapse Sidebar</button>

<script>
    function collapsePane() {
        var splitterObj = document.getElementById('splitter').ej2_instances[0];
        splitterObj.collapse(0); // Collapse pane at index 0
    }
</script>
```

---

#### `addPane(paneProperties: PanePropertiesModel, index: number)`

Dynamically adds a new pane to the splitter at the specified index position.

**Parameters:**
- `paneProperties` (PanePropertiesModel): Configuration object for the new pane (properties: size, min, max, content, collapsible, etc.)
- `index` (number): Position where the pane will be inserted

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Pane 1</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Pane 2</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<button onclick="addNewPane()">Add Pane</button>

<script>
    function addNewPane() {
        var splitterObj = document.getElementById('splitter').ej2_instances[0];
        splitterObj.addPane({
            size: '25%',
            content: 'New Pane Content',
            collapsible: true,
            min: '100px'
        }, 1); // Insert as second pane
    }
</script>
```

---

#### `removePane(index: number)`

Dynamically removes the pane at the specified index from the splitter.

**Parameters:**
- `index` (number): Index of the pane to remove

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="33%" content="<div>Pane 1</div>"></e-splitter-pane>
        <e-splitter-pane size="33%" content="<div>Pane 2</div>"></e-splitter-pane>
        <e-splitter-pane size="34%" content="<div>Pane 3</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<button onclick="removePane()">Remove Pane 2</button>

<script>
    function removePane() {
        var splitterObj = document.getElementById('splitter').ej2_instances[0];
        splitterObj.removePane(1); // Remove pane at index 1
    }
</script>
```

---

### Event Management Methods

#### `addEventListener(eventName: string, handler: Function)`

Adds an event listener handler to the specified event.

**Parameters:**
- `eventName` (string): Name of the event to listen for (e.g., "expanded", "collapsed", "resizing")
- `handler` (Function): Callback function to execute when the event fires

**Example:**

```csharp
<ejs-splitter id="splitter" height="400px">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Pane 1</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Pane 2</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    var splitterObj = document.getElementById('splitter').ej2_instances[0];
    
    splitterObj.addEventListener('expanded', function(args) {
        console.log('Pane expanded at index:', args.index[0]);
    });
    
    splitterObj.addEventListener('resizing', function(args) {
        console.log('Resizing pane sizes:', args.paneSize);
    });
</script>
```

---

#### `removeEventListener(eventName: string, handler: Function)`

Removes an event listener handler from the specified event.

**Parameters:**
- `eventName` (string): Name of the event to remove the listener from
- `handler` (Function): Reference to the callback function to remove

**Example:**

```csharp
<script>
    var splitterObj = document.getElementById('splitter').ej2_instances[0];
    
    function myExpandHandler(args) {
        console.log('Pane expanded');
    }
    
    // Add listener
    splitterObj.addEventListener('expanded', myExpandHandler);
    
    // Later, remove the listener
    splitterObj.removeEventListener('expanded', myExpandHandler);
</script>
```

---

### Component Lifecycle Methods

#### `refresh()`

Applies all pending property changes and re-renders the component.

**Returns:** `void`

**Example:**

```csharp
<script>
    var splitterObj = document.getElementById('splitter').ej2_instances[0];
    
    // Make property changes
    splitterObj.orientation = 'Vertical';
    splitterObj.separatorSize = 5;
    
    // Apply changes and re-render
    splitterObj.refresh();
</script>
```

---

#### `dataBind()`

Immediately applies any pending property changes to the component without re-rendering.

**Returns:** `void`

**Example:**

```csharp
<script>
    var splitterObj = document.getElementById('splitter').ej2_instances[0];
    
    // Make property changes
    splitterObj.width = '100%';
    splitterObj.height = '600px';
    
    // Apply data binding
    splitterObj.dataBind();
</script>
```

---

#### `destroy()`

Removes the control from the DOM and detaches all event handlers and resources.

**Returns:** `void`

**Example:**

```csharp
<script>
    var splitterObj = document.getElementById('splitter').ej2_instances[0];
    
    // When component is no longer needed
    splitterObj.destroy();
</script>
```

---

#### `getRootElement()`

Returns the root HTML element of the splitter component.

**Returns:** `HTMLElement` - The root `<div>` element of the splitter

**Example:**

```csharp
<script>
    var splitterObj = document.getElementById('splitter').ej2_instances[0];
    
    var rootElement = splitterObj.getRootElement();
    console.log('Root element:', rootElement);
    
    // Can be used to interact with the component's DOM
    rootElement.style.border = '2px solid blue';
</script>
```

---

#### `appendTo(selector: string | HTMLElement)`

Appends the splitter control to the specified HTML element or selector.

**Parameters:**
- `selector` (string | HTMLElement, optional): Target element or CSS selector where control should be appended

**Returns:** `void`

**Example:**

```csharp
<!-- HTML Container -->
<div id="splitterContainer"></div>

<script>
    var splitterObj = new ej.layouts.Splitter({
        height: '400px',
        panes: [
            { size: '50%', content: 'Pane 1' },
            { size: '50%', content: 'Pane 2' }
        ]
    });
    
    // Append to container
    splitterObj.appendTo('#splitterContainer');
    // or
    splitterObj.appendTo(document.getElementById('splitterContainer'));
</script>
```

---

### Module Injection

#### `Inject(moduleList: Function[])`

Dynamically injects required modules to enable specific features.

**Parameters:**
- `moduleList` (Function[]): Array of module functions to inject

**Returns:** `void`

**Example:**

```csharp
<script>
    var splitterObj = document.getElementById('splitter').ej2_instances[0];
    
    // Inject additional modules if needed
    // (Most modules are included by default in tag helper)
    Syncfusion.EJ2.Layouts.Splitter.Inject(
        Syncfusion.EJ2.Layouts.ResizeGripper
    );
</script>
```

---

## Events

Splitter events allow you to respond to user interactions and component state changes.

### `created`

Triggers after the splitter component and all its panes are created and initialized.

**Usage:**

```csharp
<ejs-splitter id="splitter" 
              height="400px"
              created="onSplitterCreated">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Pane 1</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>Pane 2</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onSplitterCreated(args) {
        console.log('Splitter component created:', args);
        // Initialize custom logic, load data, etc.
    }
</script>
```

---

### `beforeExpand`

Triggers **before** a pane is expanded. Can be cancelled by setting `cancel = true`.

**Usage:**

```csharp
<ejs-splitter id="splitter" 
              height="400px"
              beforeExpand="onBeforeExpand">
    <e-splitter-panes>
        <e-splitter-pane size="25%" collapsible="true" content="<div>Sidebar</div>"></e-splitter-pane>
        <e-splitter-pane size="75%" content="<div>Content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onBeforeExpand(args) {
        if (args.index[0] === 0) {
            console.log('Expanding pane at index 0');
            // Return false or set args.cancel = true to prevent expansion
        }
    }
</script>
```

---

### `expanded`

Triggers **after** a pane is expanded.

**Usage:**

```csharp
<ejs-splitter id="splitter" 
              height="400px"
              expanded="onExpanded">
    <e-splitter-panes>
        <e-splitter-pane size="25%" collapsible="true" collapsed="true" content="<div>Sidebar (initially collapsed)</div>"></e-splitter-pane>
        <e-splitter-pane size="75%" content="<div>Main Content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onExpanded(args) {
        console.log('Pane expanded at index:', args.index[0]);
        // Load content, adjust layout, etc.
    }
</script>
```

---

### `beforeCollapse`

Triggers **before** a pane is collapsed. Can be cancelled by setting `cancel = true`.

**Usage:**

```csharp
<ejs-splitter id="splitter" 
              height="400px"
              beforeCollapse="onBeforeCollapse">
    <e-splitter-panes>
        <e-splitter-pane size="30%" collapsible="true" content="<div>Collapsible Sidebar</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>Content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onBeforeCollapse(args) {
        // Validate before collapse
        var confirmCollapse = confirm('Collapse this pane?');
        if (!confirmCollapse) {
            args.cancel = true; // Prevent collapse
        }
    }
</script>
```

---

### `collapsed`

Triggers **after** a pane is collapsed.

**Usage:**

```csharp
<ejs-splitter id="splitter" 
              height="400px"
              collapsed="onCollapsed">
    <e-splitter-panes>
        <e-splitter-pane size="30%" collapsible="true" content="<div>Sidebar</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>Main Content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onCollapsed(args) {
        console.log('Pane collapsed at index:', args.index[0]);
        // Save user preferences, adjust layout, etc.
    }
</script>
```

---

### `resizeStart`

Triggers **when** a pane starts being resized (separator is grabbed).

**Usage:**

```csharp
<ejs-splitter id="splitter" 
              height="400px"
              resizeStart="onResizeStart">
    <e-splitter-panes>
        <e-splitter-pane size="30%" content="<div>Left Panel</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>Right Panel</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onResizeStart(args) {
        console.log('Resize started on pane index:', args.index[0]);
        console.log('Resizing pane element:', args.pane[0]);
    }
</script>
```

---

### `resizing`

Triggers **during** the resizing of a pane (continuously as separator is dragged).

**Usage:**

```csharp
<ejs-splitter id="splitter" 
              height="400px"
              resizing="onResizing">
    <e-splitter-panes>
        <e-splitter-pane size="30%" content="<div>Left Panel</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>Right Panel</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onResizing(args) {
        // Update UI based on current pane sizes
        console.log('Current pane sizes:', args.paneSize);
        // Could update charts, refresh layouts, etc.
    }
</script>
```

---

### `resizeStop`

Triggers **when** resizing of a pane is completed (separator is released).

**Usage:**

```csharp
<ejs-splitter id="splitter" 
              height="400px"
              resizeStop="onResizeStop">
    <e-splitter-panes>
        <e-splitter-pane size="30%" content="<div>Left Panel</div>"></e-splitter-pane>
        <e-splitter-pane size="70%" content="<div>Right Panel</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onResizeStop(args) {
        console.log('Resize complete');
        console.log('Final pane sizes:', args.paneSize);
        // Save layout preferences, update backend, etc.
        savePaneSizes(args.paneSize);
    }
    
    function savePaneSizes(sizes) {
        // Save to localStorage or backend
        localStorage.setItem('splitterSizes', JSON.stringify(sizes));
    }
</script>
```

---

### `beforeSanitizeHtml`

Triggers **before** HTML content is sanitized for security. Allows custom sanitization logic.

**Usage:**

```csharp
<ejs-splitter id="splitter" 
              height="400px"
              enableHtmlSanitizer="true"
              beforeSanitizeHtml="onBeforeSanitize">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Safe Content</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>User Content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onBeforeSanitize(args) {
        // Custom sanitization rules
        console.log('HTML before sanitization:', args.oldHtml);
        console.log('HTML after sanitization:', args.newHtml);
    }
</script>
```

---

## Event Arguments

Complete documentation of event argument objects passed to event handlers.

### BeforeExpandEventArgs

Provides information about `beforeExpand` and `beforeCollapse` events.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to prevent the expand/collapse action |
| `element` | `HTMLElement` | Root element of the splitter after control is created |
| `event` | `Event` | Default browser event arguments |
| `index` | `number[]` | Array containing the index of the pane being expanded/collapsed |
| `pane` | `HTMLElement[]` | Array of pane elements |
| `separator` | `HTMLElement` | The respective split-bar/separator element |

**Example:**

```csharp
<script>
    function onBeforeExpand(args) {
        console.log('Pane index:', args.index[0]);
        console.log('Pane element:', args.pane[0]);
        console.log('Browser event:', args.event);
        
        // Cancel specific panes from expanding
        if (args.index[0] === 0) {
            args.cancel = true;
        }
    }
</script>
```

---

### ExpandedEventArgs

Provides information about `expanded` and `collapsed` events.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLElement` | Root element after control is created |
| `event` | `Event` | Default browser event arguments |
| `index` | `number[]` | Index of the expanded/collapsed pane |
| `pane` | `HTMLElement[]` | Array of pane elements |
| `separator` | `HTMLElement` | Respective split-bar element |

**Example:**

```csharp
<script>
    function onExpanded(args) {
        console.log('Expanded pane index:', args.index[0]);
        console.log('Pane element:', args.pane[0]);
        console.log('Separator element:', args.separator);
        
        // Load content for newly expanded pane
        loadPaneContent(args.index[0]);
    }
    
    function loadPaneContent(paneIndex) {
        // Fetch and display content
    }
</script>
```

---

### ResizeEventArgs

Provides information about `resizeStart` event.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Controls the resize action. Set to `true` to stop the resize process |
| `element` | `HTMLElement` | Root element of the resizing pane |
| `event` | `Event` | Default browser event arguments |
| `index` | `number[]` | Index of the resizing pane |
| `pane` | `HTMLElement[]` | Corresponding resizing pane element |
| `separator` | `HTMLElement` | The resizing pane's separator element |

**Example:**

```csharp
<script>
    function onResizeStart(args) {
        console.log('Starting resize on pane:', args.index[0]);
        console.log('Pane element:', args.element);
        
        // Prevent resizing specific panes
        if (args.index[0] === 0) {
            args.cancel = true;
        }
    }
</script>
```

---

### ResizingEventArgs

Provides information about `resizing` and `resizeStop` events.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `element` | `HTMLElement` | Contains the root element of resizing pane |
| `event` | `Event` | Contains default event arguments |
| `index` | `number[]` | Contains the index of resizing pane |
| `pane` | `HTMLElement[]` | Contains the corresponding resizing pane |
| `paneSize` | `number[]` | Contains a pane size when it resizes |
| `separator` | `HTMLElement` | Contains the resizing pane's separator element |

**Example:**

```csharp
<script>
    function onResizing(args) {
        // Update UI in real-time as panes are resized
        console.log('Current pane sizes:', args.paneSize);
        updateLayout(args.paneSize);
    }
    
    function onResizeStop(args) {
        // Finalize resize operation
        console.log('Final pane sizes:', args.paneSize);
        savePaneLayout(args.paneSize);
    }
    
    function updateLayout(paneSize) {
        // Adjust dependent elements based on pane sizes
    }
    
    function savePaneLayout(paneSize) {
        // Store layout preferences
        localStorage.setItem('layout', JSON.stringify(paneSize));
    }
</script>
```

---

### BeforeSanitizeHtmlArgs

Provides information about `beforeSanitizeHtml` event, allowing custom HTML sanitization logic.

**Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | `boolean` | Set to `true` to prevent the current sanitization action |
| `helper` | `Function` | Callback function executed before built-in sanitization. Must return HTML as a string |
| `selectors` | `SanitizeSelectors` | Selectors object carrying both tags and attributes blocklist to prevent cross-site scripting (XSS) attacks. Can be modified to customize the blocklist |

**Example:**

```csharp
<ejs-splitter id="splitter" 
              height="400px"
              enableHtmlSanitizer="true"
              beforeSanitizeHtml="onBeforeSanitize">
    <e-splitter-panes>
        <e-splitter-pane size="50%" content="<div>Safe Content</div>"></e-splitter-pane>
        <e-splitter-pane size="50%" content="<div>User Content</div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    function onBeforeSanitize(args) {
        console.log('Before sanitization');
        
        // Custom sanitization with helper callback
        if (args.helper) {
            var sanitized = args.helper('<p>Safe content</p>');
            console.log('Sanitized HTML:', sanitized);
        }
        
        // Modify blocklist if needed
        if (args.selectors) {
            // Add custom tags/attributes to blocklist
            console.log('Selectors:', args.selectors);
        }
    }
</script>
```

---

## Complete Example: Using All Features

```csharp
<ejs-splitter id="mainSplitter" 
              height="600px"
              width="100%"
              orientation="Horizontal"
              separatorSize="3"
              enablePersistence="true"
              created="onCreated"
              beforeExpand="onBeforeExpand"
              expanded="onExpanded"
              resizeStart="onResizeStart"
              resizing="onResizing"
              resizeStop="onResizeStop">
    <e-splitter-panes>
        <e-splitter-pane size="20%" 
                         min="150px" 
                         max="400px" 
                         collapsible="true"
                         cssClass="sidebar"
                         content="<div><h3>Navigation</h3><ul id='navMenu'><li>Dashboard</li><li>Reports</li><li>Settings</li></ul></div>"></e-splitter-pane>
        <e-splitter-pane size="80%" 
                         collapsible="false"
                         cssClass="main-content"
                         content="<div id='content'><h2>Main Content Area</h2><p>Content loads here based on navigation selection.</p></div>"></e-splitter-pane>
    </e-splitter-panes>
</ejs-splitter>

<script>
    // Component initialization
    function onCreated(args) {
        console.log('Splitter initialized');
    }
    
    // Expand/collapse validation
    function onBeforeExpand(args) {
        console.log('Expanding pane:', args.index[0]);
    }
    
    // Post-expand actions
    function onExpanded(args) {
        loadContentForPane(args.index[0]);
    }
    
    // Resize start
    function onResizeStart(args) {
        console.log('Resize started');
    }
    
    // Real-time resize feedback
    function onResizing(args) {
        console.log('Pane sizes:', args.paneSize);
    }
    
    // Resize completion
    function onResizeStop(args) {
        savePaneLayout(args.paneSize);
    }
    
    // Helper functions
    function loadContentForPane(paneIndex) {
        if (paneIndex === 0) {
            // Load sidebar content
        }
    }
    
    function savePaneLayout(sizes) {
        localStorage.setItem('splitterLayout', JSON.stringify(sizes));
    }
</script>

<style>
    .sidebar {
        background-color: #f0f0f0;
        padding: 15px;
    }
    
    .main-content {
        background-color: #fff;
        padding: 20px;
    }
</style>
```

---

## See Also

- [Pane Content Guide](pane-content.md) - Content types and templates
- [Pane Sizing Guide](pane-sizing-and-resizing.md) - Size configurations and constraints
- [Styling & Customization](styling-and-globalization.md) - CSS and theme customization
