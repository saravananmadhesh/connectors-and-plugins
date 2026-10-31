# API Reference

## Overview

Complete API documentation for Syncfusion Dashboard Layout component for ASP.NET Core. This reference covers all properties, methods, events, and panel configuration options with detailed descriptions, default values, and usage contexts.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Panel Model](#panel-model)

---

## Properties

Dashboard Layout component properties control the overall behavior, appearance, and functionality of the layout system.

### allowDragging

Enables or disables the ability to drag panels to reorder their positions.

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When set to true, users can click and drag panels to reorganize their positions within the dashboard
- **Usage**: `<ejs-dashboardlayout allowDragging="true">`
- **See Also**: `draggableHandle` property to customize drag handles

### allowFloating

Enables or disables floating panels. When enabled, panels can overlay other panels instead of pushing them off-screen.

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Floating is particularly useful for responsive layouts where space is limited. Panels float above others when there's insufficient space
- **Usage**: `<ejs-dashboardlayout allowFloating="true">`
- **Related**: `mediaQuery` property for responsive behavior

### allowResizing

Enables or disables the ability to resize panels by dragging resize handles.

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When enabled, users can adjust panel width and height. Resizing is constrained by `minSizeX`, `minSizeY`, `maxSizeX`, `maxSizeY` panel properties
- **Usage**: `<ejs-dashboardlayout allowResizing="true">`
- **Events**: Triggers `resizeStart`, `resize`, `resizeStop` events

### cellAspectRatio

Defines the aspect ratio of grid cells (width:height ratio).

- **Type**: `number`
- **Default**: `1`
- **Description**: Controls the proportional height of cells relative to their width. Value of 1 creates square cells, 2 creates cells twice as tall as they are wide
- **Usage**: `<ejs-dashboardlayout cellAspectRatio="1.5">`
- **Range**: Any positive number
- **Example**: Cell aspect ratio of 1 creates 100x100 cells, 2 creates 100x200 cells (assuming 100px cell width)

### cellSpacing

Sets the spacing (gap) between panels in pixels.

- **Type**: `double[]`
- **Default**: `[5, 5]`
- **Description**: Array of two values [horizontalSpacing, verticalSpacing] controlling space between panels
- **Usage**: `<ejs-dashboardlayout cellSpacing="@(new double[] { 10, 10 })">`
- **Example Values**: 
  - `[5, 5]` - 5px gaps horizontally and vertically
  - `[10, 5]` - 10px horizontal gap, 5px vertical gap
  - `[0, 0]` - No gaps between panels

### columns

Defines the number of columns in the grid layout.

- **Type**: `int`
- **Default**: `1`
- **Description**: Total number of columns available for panel placement. Higher column values allow more granular positioning
- **Usage**: `<ejs-dashboardlayout columns="6">`
- **Recommended Values**: 2, 3, 4, 6, 12 (common grid systems)
- **Related**: `sizeX` property in panel model determines how many columns each panel occupies

### draggableHandle

Specifies CSS selectors for specific elements that can be used to drag panels.

- **Type**: `string`
- **Default**: Empty (entire panel header is draggable)
- **Description**: Restrict dragging to specific handles within the panel header. Useful for preserving interactivity of other header elements
- **Usage**: `<ejs-dashboardlayout draggableHandle=".drag-handle">`
- **Example**: With selector `.drag-handle`, only elements with this class can initiate drag operations
- **See Also**: `getting-started.md` for detailed handle implementation

### enableHtmlSanitizer

Enables or disables HTML content sanitization for security.

- **Type**: `boolean`
- **Default**: `true`
- **Description**: When enabled, potentially harmful HTML content is sanitized before rendering. Disable only if you fully control the content source
- **Usage**: `<ejs-dashboardlayout enableHtmlSanitizer="false">`
- **Security Note**: Keep enabled unless you have specific requirements and security measures in place

### enablePersistence

Enables automatic persistence of dashboard layout to browser storage.

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When true, dashboard layout automatically saves panel positions, sizes, and states to localStorage and restores them on subsequent page loads
- **Usage**: `<ejs-dashboardlayout enablePersistence="true">`
- **See Also**: `state-and-persistence.md` for comprehensive persistence patterns

### enableRtl

Enables right-to-left layout direction for RTL languages.

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When true, the entire dashboard layout reverses direction for languages like Arabic, Hebrew, and Urdu
- **Usage**: `<ejs-dashboardlayout enableRtl="true">`
- **Related**: Set `dir="rtl"` on the HTML element for complete RTL support
- **See Also**: `responsive-layouts.md` for RTL implementation examples

### mediaQuery

Defines media query breakpoint for responsive layout behavior.

- **Type**: `string`
- **Default**: Empty
- **Description**: CSS media query string that triggers layout adaptations. When the viewport matches this query, the dashboard can respond with layout adjustments
- **Usage**: `<ejs-dashboardlayout mediaQuery="(max-width: 768px)">`
- **Examples**:
  - `(max-width: 768px)` - Triggers on small screens
  - `(max-width: 1024px)` - Triggers on screens 1024px or smaller
  - `(min-width: 769px)` - Triggers on screens 769px or larger
- **See Also**: `responsive-layouts.md` for comprehensive media query patterns

### panels

Collection of panel configurations for the dashboard.

- **Type**: `List<DashboardLayoutPanel>`
- **Default**: Empty list
- **Description**: Defines all panels to be displayed in the dashboard. Each panel object includes id, size, position, and content properties
- **Usage**: 
  ```html
  <ejs-dashboardlayout id="dashboard">
      <e-dashboardlayout-panels>
          <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                   header="<div>Panel 1</div>"
                                   content="<div>Content</div>">
          </e-dashboardlayout-panel>
      </e-dashboardlayout-panels>
  </ejs-dashboardlayout>
  ```
- **See Also**: `Panel Model` section for detailed panel properties

### resizableHandles

Specifies which resize handles are available for panel resizing.

- **Type**: `string[]`
- **Default**: `['e-south-east']`
- **Description**: Array of handle directions that allow panel resizing. Available options: 'e-south', 'e-north', 'e-east', 'e-west', 'e-south-east', 'e-south-west', 'e-north-east', 'e-north-west'
- **Usage**: `<ejs-dashboardlayout resizableHandles="@(new string[] { 'e-south-east', 'e-south', 'e-east' })">`
- **See Also**: `resizing-panels.md` for detailed resize handle configuration

### showGridLines

Displays visual grid lines for layout guidance.

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When true, faint grid lines appear to help visualize the column structure and panel positioning
- **Usage**: `<ejs-dashboardlayout showGridLines="true">`
- **Use Case**: Useful during dashboard design and debugging to understand the grid structure

---

## Methods

Dashboard Layout methods enable programmatic control and manipulation of panels and layout behavior.

### addEventListener

Registers event listeners for Dashboard Layout events.

- **Signature**: `addEventListener(eventName: string, handler: Function): void`
- **Parameters**:
  - `eventName` (string): Name of the event to listen for (e.g., 'dragStart', 'resize', 'created')
  - `handler` (Function): Callback function to execute when event fires
- **Usage**:
  ```javascript
  var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
  dashboardObj.addEventListener('dragStart', function(args) {
      console.log('Drag started');
  });
  ```
- **See Also**: Event binding in `dragging-and-dropping.md`

### addPanel

Adds a new panel to the dashboard layout dynamically.

- **Signature**: `addPanel(panel: DashboardLayoutPanel): void`
- **Parameters**:
  - `panel` (DashboardLayoutPanel): Panel configuration object with id, sizeX, sizeY, header, and content
- **Usage**:
  ```javascript
  var newPanel = {
      'id': 'new-panel',
      'sizeX': 2,
      'sizeY': 1,
      'header': 'New Panel',
      'content': 'Panel content'
  };
  dashboardObj.addPanel(newPanel);
  ```
- **See Also**: `panel-operations.md` for comprehensive addPanel examples

### appendTo

Appends the Dashboard Layout to a specified container element.

- **Signature**: `appendTo(selector: string | HTMLElement): void`
- **Parameters**:
  - `selector` (string or HTMLElement): CSS selector or DOM element where dashboard will be appended
- **Usage**:
  ```javascript
  var dashboardObj = new ej.layouts.DashboardLayout();
  dashboardObj.appendTo('#dashboard-container');
  ```
- **Use Case**: Dynamically mount Dashboard Layout after component creation

### dataBind

Refreshes the component's data bindings and re-renders the dashboard.

- **Signature**: `dataBind(): void`
- **Parameters**: None
- **Usage**:
  ```javascript
  dashboardObj.dataBind();
  ```
- **Use Case**: Refresh dashboard after data source updates

### destroy

Destroys the Dashboard Layout component and removes it from the DOM.

- **Signature**: `destroy(): void`
- **Parameters**: None
- **Usage**:
  ```javascript
  dashboardObj.destroy();
  ```
- **Triggers**: `destroyed` event
- **See Also**: Lifecycle management in `state-and-persistence.md`

### getRootElement

Returns the root element of the Dashboard Layout component.

- **Signature**: `getRootElement(): HTMLElement`
- **Return Value**: The DOM element containing the dashboard
- **Usage**:
  ```javascript
  var rootElement = dashboardObj.getRootElement();
  console.log(rootElement);
  ```

### movePanel

Moves a panel to a new position in the dashboard grid.

- **Signature**: `movePanel(panelId: string, row: number, col: number): void`
- **Parameters**:
  - `panelId` (string): ID of the panel to move
  - `row` (number): Target row index (0-based)
  - `col` (number): Target column index (0-based)
- **Usage**:
  ```javascript
  dashboardObj.movePanel('panel1', 1, 2);  // Move panel1 to row 1, column 2
  ```
- **See Also**: `panel-operations.md` for movePanel examples and constraints

### refreshDraggableHandle

Updates the drag handle configuration after initial setup.

- **Signature**: `refreshDraggableHandle(): void`
- **Parameters**: None
- **Usage**:
  ```javascript
  dashboardObj.refreshDraggableHandle();
  ```
- **Use Case**: Call after dynamically changing the `draggableHandle` property to refresh handle detection

### removeAll

Removes all panels from the dashboard layout.

- **Signature**: `removeAll(): void`
- **Parameters**: None
- **Usage**:
  ```javascript
  dashboardObj.removeAll();  // Dashboard becomes empty
  ```
- **See Also**: `panel-operations.md` for panel removal patterns

### removeEventListener

Removes previously registered event listeners.

- **Signature**: `removeEventListener(eventName: string, handler: Function): void`
- **Parameters**:
  - `eventName` (string): Name of the event
  - `handler` (Function): Reference to the handler function to remove
- **Usage**:
  ```javascript
  function myHandler(args) { }
  dashboardObj.removeEventListener('dragStart', myHandler);
  ```

### removePanel

Removes a specific panel from the dashboard layout.

- **Signature**: `removePanel(panelId: string): void`
- **Parameters**:
  - `panelId` (string): ID of the panel to remove
- **Usage**:
  ```javascript
  dashboardObj.removePanel('panel1');
  ```
- **See Also**: `panel-operations.md` for removePanel examples

### resizePanel

Changes the size of an existing panel.

- **Signature**: `resizePanel(panelId: string, sizeX: number, sizeY: number): void`
- **Parameters**:
  - `panelId` (string): ID of the panel to resize
  - `sizeX` (number): New width in grid cells
  - `sizeY` (number): New height in grid cells
- **Usage**:
  ```javascript
  dashboardObj.resizePanel('panel1', 3, 2);  // Resize panel1 to 3x2 cells
  ```
- **Constraints**: Respects panel's minSizeX, minSizeY, maxSizeX, maxSizeY properties
- **See Also**: `panel-operations.md` for resizePanel examples

### serialize

Returns the current dashboard configuration as an array of panel objects.

- **Signature**: `serialize(): DashboardLayoutPanel[]`
- **Return Value**: Array of panel configuration objects
- **Usage**:
  ```javascript
  var currentLayout = dashboardObj.serialize();
  console.log(JSON.stringify(currentLayout, null, 2));
  ```
- **See Also**: `state-and-persistence.md` for serialization and state management examples

### updatePanel

Updates configuration of an existing panel.

- **Signature**: `updatePanel(panel: DashboardLayoutPanel): void`
- **Parameters**:
  - `panel` (DashboardLayoutPanel): Updated panel configuration object (must include id)
- **Usage**:
  ```javascript
  var panelUpdate = {
      'id': 'panel1',
      'header': 'Updated Header',
      'sizeX': 3
  };
  dashboardObj.updatePanel(panelUpdate);
  ```
- **See Also**: `panel-operations.md` for updatePanel examples

### Inject

Registers modules or dependencies for the Dashboard Layout component.

- **Signature**: `Inject(...modules): void`
- **Usage**: Typically used during component initialization to register required modules
- **Note**: Required modules are usually auto-loaded in ASP.NET Core TagHelper scenarios

---

## Events

Dashboard Layout triggers events at various points in its lifecycle and user interactions. Events provide hooks for custom logic and state management.

### change

Fires when the dashboard layout is modified (panels moved, resized, added, or removed).

- **Event Data**: `DashboardLayoutChangeEventArgs`
- **Usage**:
  ```html
  <ejs-dashboardlayout id="dashboard" change="onLayoutChange">
      <!-- panels -->
  </ejs-dashboardlayout>
  
  <script>
      function onLayoutChange(args) {
          console.log('Dashboard layout changed');
      }
  </script>
  ```
- **See Also**: `state-and-persistence.md` for auto-save patterns using change event

### created

Fires after the Dashboard Layout component is fully initialized and ready for interaction.

- **Event Data**: `DashboardLayoutCreatedEventArgs`
- **Usage**:
  ```html
  <ejs-dashboardlayout id="dashboard" created="onDashboardCreated">
      <!-- panels -->
  </ejs-dashboardlayout>
  
  <script>
      function onDashboardCreated(args) {
          console.log('Dashboard Layout created');
          // Initialize data, set up event listeners, etc.
      }
  </script>
  ```
- **See Also**: `state-and-persistence.md` for lifecycle management

### destroyed

Fires when the Dashboard Layout component is being destroyed or removed from the DOM.

- **Event Data**: `DashboardLayoutDestroyedEventArgs`
- **Usage**:
  ```html
  <ejs-dashboardlayout id="dashboard" destroyed="onDashboardDestroyed">
      <!-- panels -->
  </ejs-dashboardlayout>
  
  <script>
      function onDashboardDestroyed(args) {
          console.log('Dashboard Layout destroyed');
          // Cleanup resources, save state, etc.
      }
  </script>
  ```
- **See Also**: `state-and-persistence.md` for cleanup patterns

### drag

Fires continuously while a panel is being dragged.

- **Event Data**: `DashboardLayoutDragEventArgs`
- **Details**: 
  - `element` - The panel element being dragged
  - `event` - The mouse/touch event object
- **Usage**:
  ```html
  <ejs-dashboardlayout id="dashboard" drag="onDrag">
      <!-- panels -->
  </ejs-dashboardlayout>
  
  <script>
      function onDrag(args) {
          // Fires repeatedly during drag operation
          console.log('Panel being dragged');
      }
  </script>
  ```
- **Performance Note**: This event fires frequently; keep handlers lightweight
- **See Also**: `dragging-and-dropping.md` for drag event examples

### dragStart

Fires when a user begins dragging a panel.

- **Event Data**: `DashboardLayoutDragStartEventArgs`
- **Details**:
  - `element` - The panel being dragged
  - `event` - The mouse/touch event object
- **Usage**:
  ```html
  <ejs-dashboardlayout id="dashboard" dragStart="onDragStart">
      <!-- panels -->
  </ejs-dashboardlayout>
  
  <script>
      function onDragStart(args) {
          console.log('Drag started for panel:', args.element.id);
      }
  </script>
  ```
- **See Also**: `dragging-and-dropping.md` for drag lifecycle and examples

### dragStop

Fires when a user completes dragging a panel.

- **Event Data**: `DashboardLayoutDragStopEventArgs`
- **Details**:
  - `element` - The panel that was dragged
  - `event` - The mouse/touch event object
- **Usage**:
  ```html
  <ejs-dashboardlayout id="dashboard" dragStop="onDragStop">
      <!-- panels -->
  </ejs-dashboardlayout>
  
  <script>
      function onDragStop(args) {
          console.log('Drag stopped for panel:', args.element.id);
          saveDashboardState();
      }
  </script>
  ```
- **See Also**: `dragging-and-dropping.md` for save-on-drag patterns

### resize

Fires continuously while a panel is being resized.

- **Event Data**: `DashboardLayoutResizeEventArgs`
- **Details**:
  - `element` - The panel being resized
  - `event` - The mouse/touch event object
- **Usage**:
  ```html
  <ejs-dashboardlayout id="dashboard" resize="onResize">
      <!-- panels -->
  </ejs-dashboardlayout>
  
  <script>
      function onResize(args) {
          // Fires repeatedly during resize
          console.log('Panel being resized');
      }
  </script>
  ```
- **See Also**: `resizing-panels.md` for resize event patterns

### resizeStart

Fires when a user begins resizing a panel.

- **Event Data**: `DashboardLayoutResizeStartEventArgs`
- **Details**:
  - `element` - The panel being resized
  - `event` - The mouse/touch event object
- **Usage**:
  ```html
  <ejs-dashboardlayout id="dashboard" resizeStart="onResizeStart">
      <!-- panels -->
  </ejs-dashboardlayout>
  
  <script>
      function onResizeStart(args) {
          console.log('Resize started for panel:', args.element.id);
      }
  </script>
  ```
- **See Also**: `resizing-panels.md` for resize lifecycle

### resizeStop

Fires when a user completes resizing a panel.

- **Event Data**: `DashboardLayoutResizeStopEventArgs`
- **Details**:
  - `element` - The panel that was resized
  - `event` - The mouse/touch event object
- **Usage**:
  ```html
  <ejs-dashboardlayout id="dashboard" resizeStop="onResizeStop">
      <!-- panels -->
  </ejs-dashboardlayout>
  
  <script>
      function onResizeStop(args) {
          console.log('Resize stopped for panel:', args.element.id);
          saveDashboardState();
      }
  </script>
  ```
- **See Also**: `resizing-panels.md` for resize constraint patterns

---

## Panel Model

Panel configuration objects define individual dashboard panels.

### id

Unique identifier for the panel.

- **Type**: `string`
- **Required**: Yes
- **Description**: Unique string identifier for the panel. Used to reference panel in methods and events
- **Usage**: `id="sales-panel"` or `'id': 'sales-panel'`

### header

Display text shown in the panel header.

- **Type**: `string`
- **Default**: Empty
- **Description**: Text content displayed in the panel's header bar
- **Usage**: `header="Sales Dashboard"` or `'header': 'Sales Dashboard'`

### content

HTML content to display in the panel body.

- **Type**: `string`
- **Default**: Empty
- **Description**: HTML content rendered within the panel. Can include text, elements, or component placeholders
- **Usage**: 
  ```html
  <e-dashboardlayout-panel id="panel1" header="<div>Panel</div>"
                           content="<div>This is the panel content</div>">
  </e-dashboardlayout-panel>
  ```

### col

Column position where the panel starts (0-based index).

- **Type**: `int`
- **Default**: 0
- **Description**: Horizontal grid position (column index) where panel is placed
- **Usage**: `col="2"` places panel starting at column 2

### row

Row position where the panel starts (0-based index).

- **Type**: `int`
- **Default**: 0
- **Description**: Vertical grid position (row index) where panel is placed
- **Usage**: `row="1"` places panel starting at row 1

### sizeX

Width of the panel in grid columns.

- **Type**: `int`
- **Default**: 1
- **Description**: Number of grid columns the panel occupies horizontally
- **Usage**: `sizeX="2"` makes panel 2 columns wide
- **Range**: 1 to total columns value
- **See Also**: `columns` property for total grid width

### sizeY

Height of the panel in grid rows.

- **Type**: `int`
- **Default**: 1
- **Description**: Number of grid rows the panel occupies vertically
- **Usage**: `sizeY="2"` makes panel 2 rows tall
- **Range**: Any positive integer

### minSizeX

Minimum width constraint for the panel in grid columns.

- **Type**: `int`
- **Default**: 1
- **Description**: Prevents panel from being resized narrower than this many columns
- **Usage**: `minSizeX="2"` prevents resizing below 2 columns
- **See Also**: `resizing-panels.md` for size constraint patterns

### minSizeY

Minimum height constraint for the panel in grid rows.

- **Type**: `int`
- **Default**: 1
- **Description**: Prevents panel from being resized shorter than this many rows
- **Usage**: `minSizeY="1"` prevents resizing below 1 row

### maxSizeX

Maximum width constraint for the panel in grid columns.

- **Type**: `int`
- **Default**: Unlimited
- **Description**: Prevents panel from being resized wider than this many columns
- **Usage**: `maxSizeX="4"` prevents resizing beyond 4 columns

### maxSizeY

Maximum height constraint for the panel in grid rows.

- **Type**: `int`
- **Default**: Unlimited
- **Description**: Prevents panel from being resized taller than this many rows
- **Usage**: `maxSizeY="3"` prevents resizing beyond 3 rows

### enabled

Controls whether the panel is active and interactive.

- **Type**: `bool`
- **Default**: `true`
- **Description**: When false, panel appears but may be hidden or non-interactive
- **Usage**: `enabled="false"`

### cssClass

CSS class(es) to apply to the panel element for styling.

- **Type**: `string`
- **Default**: Empty
- **Description**: Custom CSS class name(s) for styling the panel
- **Usage**: `cssClass="highlight-panel"` or `'cssClass': 'panel-primary panel-lg'`

### zIndex

Z-index value for panel layering (relevant when floating is enabled).

- **Type**: `int`
- **Default**: Auto
- **Description**: CSS z-index value for controlling panel stacking order when panels overlap
- **Usage**: `zIndex="100"`
- **See Also**: `allowFloating` property for floating panel behavior

