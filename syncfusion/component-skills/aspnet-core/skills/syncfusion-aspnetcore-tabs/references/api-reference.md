# Tab Component API Reference

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Methods](#methods)
- [Enumerations](#enumerations)
- [Interfaces](#interfaces)

---

## Properties

### allowDragAndDrop

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `allowDragAndDrop` | `boolean` | `false` | Enable or disable the ability to drag and reorder tab items. When enabled, tab headers can be dragged to new positions. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" allowDragAndDrop="true">
    <!-- Tab items can be dragged and reordered -->
</ejs-tab>
```

**See also:** [Drag-and-Drop Reordering](tab-interaction.md#drag-and-drop-reordering)

---

### animation

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `animation` | `TabAnimationSettingsModel` | `{ previous: {effect: 'SlideLeftIn', duration: 600}, next: {effect: 'SlideRightIn', duration: 600} }` | Specifies the animation configuration for tab content transitions. Configure previous/next effect, duration, and easing. |

**See also:** [Animation Configuration](advanced-features.md#animation-configuration)

---

### clearTemplates

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `clearTemplates` | `boolean` | `false` | Specifies whether to clear all templates when changing tab items dynamically. Prevents memory leaks when frequently updating items. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" clearTemplates="true">
</ejs-tab>
```

---

### cssClass

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cssClass` | `string` | `""` | Applies custom CSS classes to the root Tab element for styling customization. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" cssClass="custom-tab-styling e-fill">
</ejs-tab>
```

**See also:** [CSS Classes and Styling](styling-layout.md#css-classes-and-styling)

---

### dragArea

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `dragArea` | `string` | `""` | Defines the area where draggable tab items can be moved. Provide a selector string. Outside this area, drag operations are restricted. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" allowDragAndDrop="true" dragArea=".tab-container">
</ejs-tab>
```

---

### enableHtmlSanitizer

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableHtmlSanitizer` | `boolean` | `true` | Enable or disable HTML sanitization for tab content. When enabled, potentially harmful HTML is cleaned before rendering. Disable only for trusted internal content. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" enableHtmlSanitizer="true">
    <!-- HTML content is sanitized for security -->
</ejs-tab>
```

---

### enablePersistence

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enablePersistence` | `boolean` | `false` | Enable or disable persisting the selected tab index across browser sessions. When enabled, the `selectedItem` state is saved to localStorage. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" enablePersistence="true">
    <!-- Selected tab is restored on page reload -->
</ejs-tab>
```

**See also:** [State Persistence](advanced-features.md#state-persistence)

---

### enableRtl

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableRtl` | `boolean` | `false` | Enable or disable rendering the Tab component in right-to-left (RTL) direction. Used for Arabic, Hebrew, and other RTL languages. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" enableRtl="true" locale="ar">
    <!-- Headers and content flow right-to-left -->
</ejs-tab>
```

**See also:** [RTL Support](advanced-features.md#rtl-right-to-left-support)

---

### headerPlacement

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `headerPlacement` | `HeaderPosition` | `Top` | Specifies the placement position of tab headers. Options: `Top`, `Bottom`, `Left`, `Right`. |

**Valid Values:**
```csharp
HeaderPosition.Top      // Headers above content
HeaderPosition.Bottom   // Headers below content
HeaderPosition.Left     // Headers on left, vertical
HeaderPosition.Right    // Headers on right, vertical
```

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" headerPlacement="@HeaderPosition.Left">
    <!-- Headers appear on the left -->
</ejs-tab>
```

**See also:** [Header Positioning](styling-layout.md#header-positioning-and-orientation)

---

### height

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `height` | `string \| number` | `"auto"` | Specifies the height of the Tab component. Accepts CSS units (px, %, em, etc.). Only applies when `heightAdjustMode` is `None`. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" height="400px" heightAdjustMode="@HeightStyles.None">
    <!-- Fixed height of 400px -->
</ejs-tab>
```

---

### heightAdjustMode

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `heightAdjustMode` | `HeightStyles` | `Auto` | Specifies how tab content panels adjust height. Options: `None` (fixed height), `Auto` (tallest panel), `Content` (own height), `Fill` (fill parent). |

**Valid Values:**
```csharp
HeightStyles.None       // Use height property
HeightStyles.Auto       // All panels = tallest panel height
HeightStyles.Content    // Each panel uses own height
HeightStyles.Fill       // Fill parent container height
```

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" heightAdjustMode="@HeightStyles.Auto">
    <!-- All panels adjust to tallest -->
</ejs-tab>
```

**See also:** [Height Adjustment Modes](styling-layout.md#height-adjustment-modes)

---

### items

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | `TabItemModel[]` | `[]` | Array of TabItem objects defining the tabs. Each item contains header and content configuration. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" items="Model.TabItems">
</ejs-tab>
```

---

### loadOn

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `loadOn` | `ContentLoad` | `Demand` | Specifies the content loading strategy. Options: `Init` (all at startup), `Demand` (lazy-load), `Dynamic` (replace only active). |

**Valid Values:**
```csharp
ContentLoad.Init        // Load all content on initialization
ContentLoad.Demand      // Load first tab now, others on first select
ContentLoad.Dynamic     // Only active tab in DOM, replaced on select
```

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" loadOn="ContentLoad.Dynamic">
    <!-- Only active tab content in DOM -->
</ejs-tab>
```

**See also:** [Load-on-Demand Content Modes](tab-content-rendering.md#load-on-demand-content-modes)

---

### locale

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `locale` | `string` | `"en-US"` | Sets the locale for component localization. Controls language for UI strings and text direction. Common values: `"en"`, `"de"`, `"fr"`, `"ar"`, `"ja"`. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" locale="de">
    <!-- Component renders in German -->
</ejs-tab>
```

**See also:** [Localization](advanced-features.md#localization-and-internationalization)

---

### overflowMode

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `overflowMode` | `OverflowMode` | `Scrollable` | Specifies tab display mode when headers exceed container width. Options: `Scrollable` (with arrows), `Popup` (dropdown menu). |

**Valid Values:**
```csharp
OverflowMode.Scrollable // Horizontal scroll with navigation arrows
OverflowMode.Popup      // Hidden tabs in dropdown menu
```

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" overflowMode="OverflowMode.Scrollable">
    <!-- Many tabs with scroll arrows -->
</ejs-tab>
```

**See also:** [Overflow Modes](styling-layout.md#overflow-modes)

---

### reorderActiveTab

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `reorderActiveTab` | `boolean` | `true` | When true, the active tab automatically moves to the visible area (not in popup) when `overflowMode` is `Popup`. Improves UX for many tabs. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" reorderActiveTab="true" overflowMode="OverflowMode.Popup">
    <!-- Active tab always visible in header -->
</ejs-tab>
```

**See also:** [Reordering Active Tab](advanced-features.md#reordering-active-tab)

---

### scrollStep

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `scrollStep` | `number` | `0` | Specifies the pixel distance the scroller moves per scroll arrow click when `overflowMode` is `Scrollable`. Value of 0 means auto-calculate. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" overflowMode="OverflowMode.Scrollable" scrollStep="20">
    <!-- Each click scrolls 200px -->
</ejs-tab>
```

---

### selectedItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `selectedItem` | `number` | `0` | Gets or sets the index (zero-based) of the currently selected tab item. Changes trigger selection events. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" selectedItem="2">
    <!-- Third tab (index 2) selected on load -->
</ejs-tab>
```

**JavaScript Access:**
```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
console.log('Current tab index:', tabObj.selectedItem);
tabObj.selectedItem = 1;  // Change to tab 1
```

**See also:** [Programmatic Tab Selection](tab-interaction.md#programmatic-tab-selection)

---

### showCloseButton

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showCloseButton` | `boolean` | `false` | Enable or disable the close button ('x' icon) for tab headers. When enabled, users can remove tabs. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" showCloseButton="true">
    <!-- Close buttons visible on each tab -->
</ejs-tab>
```

**See also:** [Tab Close Button and Removal](advanced-features.md#tab-close-button-and-removal)

---

### swipeMode

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `swipeMode` | `TabSwipeMode` | `Touch` | Specifies whether tab switching occurs on touch/mouse swipe gestures. Options: `Touch` (enable), `Mouse` (enable), or custom enum values. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" swipeMode="@TabSwipeMode.Touch">
    <!-- Swipe gestures change tabs -->
</ejs-tab>
```

---

### width

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `width` | `string \| number` | `"auto"` | Specifies the width of the Tab component. Accepts CSS units (px, %, em, etc.). Default sets width based on parent container. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" width="600px">
    <!-- Fixed width of 600px -->
</ejs-tab>
```

---

## Events

### selecting

| Event | Arguments | Description |
|-------|-----------|-------------|
| `selecting` | `SelectingEventArgs` | Fires **before** a tab item is selected. Can be cancelled by setting `args.cancel = true`. |

**Arguments:**
- `index` (number) - Index of tab being selected
- `previousIndex` (number) - Index of previously selected tab
- `isInteracted` (boolean) - True if user triggered, false if programmatic
- `cancel` (boolean) - Set to true to prevent selection
- `element` (HTMLElement) - Content element of the tab

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" selecting="onSelecting">
</ejs-tab>

<script>
    function onSelecting(args) {
        if (args.index === 0) {
            args.cancel = true;  // Prevent selecting first tab
        }
    }
</script>
```

**See also:** [Selection Events](tab-interaction.md#selection-events)

---

### selected

| Event | Arguments | Description |
|-------|-----------|-------------|
| `selected` | `SelectEventArgs` | Fires **after** a tab item is successfully selected. Cannot be cancelled. |

**Arguments:**
- `index` (number) - Index of newly selected tab
- `previousIndex` (number) - Index of previously selected tab
- `isInteracted` (boolean) - True if user triggered, false if programmatic
- `element` (HTMLElement) - Content element of the selected tab

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" selected="onSelected">
</ejs-tab>

<script>
    function onSelected(args) {
        console.log('Tab selected at index:', args.index);
        if (args.isInteracted) {
            loadRemoteData(args.index);
        }
    }
</script>
```

**See also:** [Selection Events](tab-interaction.md#selection-events)

---

### adding

| Event | Arguments | Description |
|-------|-----------|-------------|
| `adding` | `AddEventArgs` | Fires **before** adding a new tab item. Can be cancelled. |

**Arguments:**
- `index` (number) - Index where tab will be added
- `items` (TabItemModel[]) - Tab items being added
- `cancel` (boolean) - Set to true to prevent adding

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" adding="onAdding">
</ejs-tab>

<script>
    function onAdding(args) {
        console.log('Adding tab at index:', args.index);
    }
</script>
```

---

### added

| Event | Arguments | Description |
|-------|-----------|-------------|
| `added` | `AddEventArgs` | Fires **after** a new tab item is successfully added. |

**Arguments:**
- `index` (number) - Index of added tab
- `items` (TabItemModel[]) - Tab items that were added

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" added="onAdded">
</ejs-tab>

<script>
    function onAdded(args) {
        console.log('Tab added at index:', args.index);
    }
</script>
```

---

### removing

| Event | Arguments | Description |
|-------|-----------|-------------|
| `removing` | `RemoveEventArgs` | Fires **before** removing a tab item. Can be cancelled. |

**Arguments:**
- `index` (number) - Index of tab being removed
- `cancel` (boolean) - Set to true to prevent removal

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" removing="onRemoving">
</ejs-tab>

<script>
    function onRemoving(args) {
        if (!confirm('Remove this tab?')) {
            args.cancel = true;
        }
    }
</script>
```

---

### removed

| Event | Arguments | Description |
|-------|-----------|-------------|
| `removed` | `RemoveEventArgs` | Fires **after** a tab item is successfully removed. |

**Arguments:**
- `index` (number) - Index where tab was removed

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" removed="onRemoved">
</ejs-tab>

<script>
    function onRemoved(args) {
        console.log('Tab removed from index:', args.index);
    }
</script>
```

---

### onDragStart

| Event | Arguments | Description |
|-------|-----------|-------------|
| `onDragStart` | `DragEventArgs` | Fires **before** dragging a tab item. Can be cancelled to prevent dragging. |

**Arguments:**
- `index` (number) - Index of tab being dragged
- `cancel` (boolean) - Set to true to prevent dragging

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" allowDragAndDrop="true" onDragStart="onDragStart">
</ejs-tab>

<script>
    function onDragStart(args) {
        if (args.index === 0) {
            args.cancel = true;  // Prevent dragging first tab
        }
    }
</script>
```

**See also:** [Drag-and-Drop Reordering](tab-interaction.md#drag-and-drop-reordering)

---

### dragging

| Event | Arguments | Description |
|-------|-----------|-------------|
| `dragging` | `DragEventArgs` | Fires **while** a tab item is being dragged. Use for visual feedback. |

**Arguments:**
- `index` (number) - Index of tab being dragged
- `element` (HTMLElement) - Element being dragged

**TagHelper Example:**
```cshtml
<script>
    function onDragging(args) {
        console.log('Dragging tab at index:', args.index);
        // Add visual feedback
    }
</script>
```

---

### dragged

| Event | Arguments | Description |
|-------|-----------|-------------|
| `dragged` | `DragEventArgs` | Fires **after** a tab item is dropped. Use to update data after reordering. |

**Arguments:**
- `index` (number) - Source tab index
- `target` (any) - Target element information

**TagHelper Example:**
```cshtml
<script>
    function onDragged(args) {
        console.log('Tab dropped from index:', args.index);
        saveTabOrder();
    }
</script>
```

**See also:** [Drag-and-Drop Reordering](tab-interaction.md#drag-and-drop-reordering)

---

### created

| Event | Arguments | Description |
|-------|-----------|-------------|
| `created` | `Event` | Fires once the Tab component rendering is completely finished. Use to initialize dependent components. |

**TagHelper Example:**
```cshtml
<ejs-tab id="ej2Tab" created="onCreated">
</ejs-tab>

<script>
    function onCreated() {
        console.log('Tab component initialized');
        initializeRelatedControls();
    }
</script>
```

---

### destroyed

| Event | Arguments | Description |
|-------|-----------|-------------|
| `destroyed` | `Event` | Fires when the Tab component is destroyed. Use to clean up resources. |

**TagHelper Example:**
```cshtml
<script>
    function onDestroyed() {
        console.log('Tab component destroyed');
        cleanupResources();
    }
</script>
```

---

## Methods

### select(index)

Selects the tab item at the specified index programmatically.

**Signature:**
```csharp
public void select(number index) : void
```

**Parameters:**
- `index` (number) - Zero-based index of tab to select

**Example:**
```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
tabObj.select(2);  // Select tab at index 2
```

**See also:** [Programmatic Tab Selection](tab-interaction.md#programmatic-tab-selection)

---

### addTab(items, index)

Adds one or more new tab items at the specified index.

**Signature:**
```csharp
public void addTab(TabItemModel[] items, number index) : void
```

**Parameters:**
- `items` (TabItemModel[]) - Array of tab items to add
- `index` (number, optional) - Index where items should be inserted. Default: at end

**Example:**
```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
tabObj.addTab([{
    header: { text: 'New Tab' },
    content: 'New content here'
}], 1);  // Insert at index 1
```

---

### removeTab(index)

Removes one or more tab items by index.

**Signature:**
```csharp
public void removeTab(number | number[]) : void
```

**Parameters:**
- `index` (number | number[]) - Single index or array of indices to remove

**Example:**
```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
tabObj.removeTab(1);           // Remove tab at index 1
tabObj.removeTab([0, 2]);      // Remove tabs at indices 0 and 2
```

**See also:** [Tab Close Button and Removal](advanced-features.md#tab-close-button-and-removal)

---

### enableTab(index, enable)

Enables or disables a specific tab item.

**Signature:**
```csharp
public void enableTab(number index, boolean enable) : void
```

**Parameters:**
- `index` (number) - Tab index to enable/disable
- `enable` (boolean) - true to enable, false to disable

**Example:**
```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
tabObj.enableTab(1, false);   // Disable tab at index 1
tabObj.enableTab(1, true);    // Enable tab at index 1
```

---

### hideTab(index, hide)

Shows or hides a specific tab item.

**Signature:**
```csharp
public void hideTab(number index, boolean hide) : void
```

**Parameters:**
- `index` (number) - Tab index to hide/show
- `hide` (boolean) - true to hide, false to show

**Example:**
```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
tabObj.hideTab(2, true);      // Hide tab at index 2
tabObj.hideTab(2, false);     // Show tab at index 2
```

---

### refresh()

Refreshes the Tab component layout and applies pending property changes.

**Signature:**
```csharp
public void refresh() : void
```

**Example:**
```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
tabObj.refresh();
```

---

### destroy()

Destroys the Tab component instance and removes it from the DOM.

**Signature:**
```csharp
public void destroy() : void
```

**Example:**
```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
tabObj.destroy();
```

---

## Enumerations

### HeaderPosition

Specifies the position of tab headers.

```csharp
public enum HeaderPosition
{
    Top,      // Headers above content (default)
    Bottom,   // Headers below content
    Left,     // Headers on left side
    Right     // Headers on right side
}
```

**See also:** [Header Positioning](styling-layout.md#header-positioning-and-orientation)

---

### HeightStyles

Specifies how tab content height is adjusted.

```csharp
public enum HeightStyles
{
    None,      // Use explicit height property
    Auto,      // All panels = height of tallest panel
    Content,   // Each panel uses own content height
    Fill       // Fill parent container height
}
```

**See also:** [Height Adjustment Modes](styling-layout.md#height-adjustment-modes)

---

### OverflowMode

Specifies tab display mode when headers exceed container width.

```csharp
public enum OverflowMode
{
    Scrollable,  // Horizontal scroll with navigation arrows
    Popup        // Hidden tabs in dropdown menu
}
```

**See also:** [Overflow Modes](styling-layout.md#overflow-modes)

---

### ContentLoad

Specifies the content loading strategy.

```csharp
public enum ContentLoad
{
    Init,       // Load all content on initialization
    Demand,     // Load first tab now, others on first select (default)
    Dynamic     // Only active tab content in DOM, replaced on select
}
```

**See also:** [Load-on-Demand Content Modes](tab-content-rendering.md#load-on-demand-content-modes)

---

### TabSwipeMode

Specifies whether tab switching occurs on swipe gestures.

```csharp
public enum TabSwipeMode
{
    Touch,   // Enable touch swipe
    Mouse,    // Enable mouse swipe (drag)
    Both,
    None
}
```

---

## Interfaces

### TabItemModel

Defines the structure of a single tab item.

```csharp
public class TabItemModel
{
    public TabHeader Header { get; set; }         // Header configuration
    public string Content { get; set; }           // Content text/HTML
    public bool Disabled { get; set; }            // Is tab disabled
    public bool Hidden { get; set; }              // Is tab hidden
    public string CssClass { get; set; }          // CSS class for styling
    public bool ShowCloseButton { get; set; }     // Show close button
}
```

---

### TabHeader

Defines header configuration for a tab item.

```csharp
public class TabHeader
{
    public string Text { get; set; }              // Display text
    public string IconCss { get; set; }           // Icon CSS class
    public string IconPosition { get; set; }      // Icon position
    public string CssClass { get; set; }          // Header CSS class
    public bool ShowCloseButton { get; set; }     // Show close button
}
```

---

### TabAnimationSettingsModel

Defines animation configuration.

```csharp
public class TabAnimationSettingsModel
{
    public AnimationModel Previous { get; set; }  // Previous tab exit animation
    public AnimationModel Next { get; set; }      // Next tab enter animation
}
```

---

**For more information:** Review specific reference files (getting-started.md, tab-content-rendering.md, etc.) for detailed examples and use cases for each API.
