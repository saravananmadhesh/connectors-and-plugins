# Events and API Methods

This guide covers all Ribbon events and common API methods for programmatic control.

## Table of Contents

- [Tab Selection Events](#tab-selection-events)
- [Ribbon Expand/Collapse Events](#ribbon-expandcollapse-events)
- [Layout Switched Event](#layout-switched-event)
- [Event Registration Methods](#event-registration-methods)
- [Launcher Icon Events](#launcher-icon-events)
- [Overflow Popup Events](#overflow-popup-events)
- [Button Item Events](#button-item-events)
- [CheckBox Item Events](#checkbox-item-events)
- [DropDown Item Events](#dropdown-item-events)
- [SplitButton Item Events](#splitbutton-item-events)
- [ColorPicker Item Events](#colorpicker-item-events)
- [Gallery Item Events](#gallery-item-events)
- [ComboBox Item Events](#combobox-item-events)
- [GroupButton Item Events](#groupbutton-item-events)
- [Complete Methods Reference](#complete-methods-reference)
- [API Methods Overview](#api-methods-overview)
- [Advanced API Methods](#advanced-api-methods)
- [Complete Examples](#complete-examples)

## Tab Selection Events

Handle tab selection and tab change events:

### tabSelected Event

Triggered after a tab is selected:

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        groups: []
    }, {
        header: "Insert",
        groups: []
    }],
    tabSelected: (args) => {
        console.log("Tab selected:", args.selectedIndex);
        console.log("Selected tab ID:", args.selectedTab.id);
        console.log("Previous tab index:", args.previousIndex);
    }
});
```

**Event arguments:**
- `selectedIndex` (number): Index of selected tab
- `selectedTab` (object): Selected tab configuration
- `previousIndex` (number): Index of previously selected tab

### tabSelecting Event

Triggered before a tab is selected (cancellable):

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        groups: []
    }, {
        header: "Insert",
        groups: []
    }],
    tabSelecting: (args) => {
        console.log("Attempting to select tab:", args.selectingIndex);
        
        // Cancel tab selection conditionally
        if (hasUnsavedChanges() && args.selectingIndex !== 0) {
            args.cancel = true;
            alert("Please save changes before switching tabs");
        }
    }
});

function hasUnsavedChanges(): boolean {
    // Check if document has unsaved changes
    return false;
}
```

**Event arguments:**
- `selectingIndex` (number): Index of tab being selected
- `selectingTab` (object): Tab configuration being selected
- `previousIndex` (number): Current tab index
- `cancel` (boolean): Set to true to prevent tab change

## Ribbon Expand/Collapse Events

Handle Ribbon minimized state changes:

### ribbonCollapsing Event

Triggered when Ribbon is about to collapse:

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    ribbonCollapsing: (args) => {
        console.log("Ribbon collapsing");
        // Save state or perform cleanup
    }
});
```

### ribbonExpanding Event

Triggered when Ribbon is about to expand:

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    ribbonExpanding: (args) => {
        console.log("Ribbon expanding");
        // Restore state or reload content
    }
});
```

### ribbonLayoutSwitched Event

Triggered when the Ribbon layout is switched between Classic and Simplified:

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    activeLayout: "Classic",
    ribbonLayoutSwitched: (args) => {
        console.log("Layout switched to:", args.activeLayout);
        // Respond to layout change
        if (args.activeLayout === "Simplified") {
            console.log("Simplified view activated");
            // Adjust UI for simplified mode
        } else {
            console.log("Classic view activated");
            // Restore full ribbon layout
        }
    }
});
```

**Event arguments:**
- `activeLayout` (string): The newly active layout ("Classic" or "Simplified")
- `event` (Event): The original native event
- `name` (string): Event name

**Use cases:**
- Adjust tool visibility based on layout
- Save layout preference to local storage
- Show/hide supplementary UI elements
- Load different template configurations

## Event Registration Methods

Manually add and remove event handlers to ribbon components.

### Adding Event Listeners

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: []
});

ribbon.appendTo("#ribbon");

// Add event listener
ribbon.addEventListener("created", () => {
    console.log("Ribbon component initialized");
});

ribbon.addEventListener("tabSelected", (args) => {
    console.log("Tab selected:", args.selectedIndex);
});
```

### Removing Event Listeners

```typescript
const tabSelectHandler = (args) => {
    console.log("Tab changed to:", args.selectedIndex);
};

// Add listener
ribbon.addEventListener("tabSelected", tabSelectHandler);

// Later, remove it
ribbon.removeEventListener("tabSelected", tabSelectHandler);
```

### Common Use Cases

```typescript
// Track when user minimizes ribbon
function onRibbonCollapse() {
    localStorage.setItem("ribbonMinimized", "true");
}

ribbon.addEventListener("ribbonCollapsing", onRibbonCollapse);

// Prevent certain tab switches
function onTabSelecting(args) {
    if (args.selectedIndex === 2 && !userHasPermission()) {
        args.cancel = true;
    }
}

ribbon.addEventListener("tabSelecting", onTabSelecting);
```

---

## Launcher Icon Events

Handle group launcher icon clicks:

### launcherIconClick Event

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        groups: [{
            id: "font-group",
            header: "Font",
            showLauncherIcon: true,
            collections: []
        }, {
            id: "paragraph-group",
            header: "Paragraph",
            showLauncherIcon: true,
            collections: []
        }]
    }],
    launcherIconClick: (args) => {
        console.log("Launcher clicked for group:", args.groupId);
        
        // Open different dialogs based on group
        switch (args.groupId) {
            case "font-group":
                openFontDialog();
                break;
            case "paragraph-group":
                openParagraphDialog();
                break;
        }
    }
});

function openFontDialog() {
    console.log("Opening Font dialog...");
}

function openParagraphDialog() {
    console.log("Opening Paragraph dialog...");
}
```

**Event arguments:**
- `groupId` (string): ID of the group whose launcher was clicked

## Overflow Popup Events

Handle overflow popup state:

### overflowPopupOpen Event

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        groups: [{
            header: "Actions",
            enableGroupOverflow: true,
            collections: []
        }]
    }],
    overflowPopupOpen: (args) => {
        console.log("Overflow popup opened");
        console.log("Group ID:", args.groupId);
    }
});
```

### overflowPopupClose Event

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [],
    overflowPopupClose: (args) => {
        console.log("Overflow popup closed");
        console.log("Group ID:", args.groupId);
    }
});
```

## Button Item Events

Handle button click events:

### clicked Event

```typescript
{
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "Save",
        iconCss: "e-icons e-save",
        clicked: (args) => {
            console.log("Save button clicked");
            saveDocument();
        }
    }
}
```

### created Event

Triggered when button is created:

```typescript
{
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "Print",
        iconCss: "e-icons e-print",
        created: () => {
            console.log("Print button created");
            // Initialize button state
        }
    }
}
```

## CheckBox Item Events

Handle checkbox state changes:

### change Event

```typescript
{
    type: RibbonItemType.CheckBox,
    checkBoxSettings: {
        label: "Show Ruler",
        checked: true,
        change: (args) => {
            console.log("Checkbox changed:", args.checked);
            toggleRuler(args.checked);
        }
    }
}

function toggleRuler(show: boolean) {
    console.log("Ruler visibility:", show);
}
```

**Event arguments:**
- `checked` (boolean): New checked state

## DropDown Item Events

Handle dropdown menu interactions:

### select Event

```typescript
{
    type: RibbonItemType.DropDown,
    dropDownSettings: {
        content: "Table",
        iconCss: "e-icons e-table",
        items: [
            { text: "Insert Table", id: "insert" },
            { text: "Draw Table", id: "draw" }
        ],
        select: (args) => {
            console.log("Selected item:", args.item.text);
            console.log("Item ID:", args.item.id);
            
            if (args.item.id === "insert") {
                insertTable();
            } else if (args.item.id === "draw") {
                drawTable();
            }
        }
    }
}

function insertTable() {
    console.log("Inserting table...");
}

function drawTable() {
    console.log("Drawing table...");
}
```

### beforeOpen / beforeClose Events

```typescript
{
    type: RibbonItemType.DropDown,
    dropDownSettings: {
        content: "More Options",
        items: [],
        beforeOpen: (args) => {
            console.log("Dropdown opening");
            // Populate dynamic items
        },
        beforeClose: (args) => {
            console.log("Dropdown closing");
            // Can cancel close by setting args.cancel = true
        }
    }
}
```

## SplitButton Item Events

Handle split button interactions:

### click Event

Triggered when primary button is clicked:

```typescript
{
    type: RibbonItemType.SplitButton,
    splitButtonSettings: {
        content: "Paste",
        iconCss: "e-icons e-paste",
        items: [
            { text: "Keep Source Formatting" },
            { text: "Merge Formatting" }
        ],
        click: (args) => {
            console.log("Primary paste button clicked");
            pasteDefault();
        }
    }
}

function pasteDefault() {
    console.log("Pasting with default formatting...");
}
```

### select Event

Triggered when dropdown item is selected:

```typescript
{
    type: RibbonItemType.SplitButton,
    splitButtonSettings: {
        content: "Undo",
        items: [
            { text: "Undo Last Action", id: "undo-last" },
            { text: "Undo All", id: "undo-all" }
        ],
        click: (args) => {
            console.log("Undo button clicked");
            undoLast();
        },
        select: (args) => {
            console.log("Undo option selected:", args.item.text);
            
            if (args.item.id === "undo-all") {
                undoAll();
            }
        }
    }
}

function undoLast() {
    console.log("Undoing last action...");
}

function undoAll() {
    console.log("Undoing all actions...");
}
```

## ColorPicker Item Events

Handle color selection:

### change Event

```typescript
{
    type: RibbonItemType.ColorPicker,
    colorPickerSettings: {
        value: "#000000",
        change: (args) => {
            console.log("Color changed to:", args.currentValue.hex);
            console.log("RGB:", args.currentValue.rgb);
            applyColor(args.currentValue.hex);
        }
    }
}

function applyColor(color: string) {
    console.log("Applying color:", color);
}
```

**Event arguments:**
- `currentValue.hex` (string): Hex color value
- `currentValue.rgb` (string): RGB color value
- `previousValue` (object): Previous color value

## Gallery Item Events

Handle gallery item selection:

### select Event

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        groups: [{
            header: "Styles",
            items: [
                { content: "Style 1", id: "style1" },
                { content: "Style 2", id: "style2" }
            ]
        }],
        select: (args) => {
            console.log("Gallery item selected:", args.item.content);
            console.log("Item ID:", args.item.id);
            applyStyle(args.item.id);
        }
    }
}

function applyStyle(styleId: string) {
    console.log("Applying style:", styleId);
}
```

### popupOpen / popupClose Events

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        groups: [],
        popupOpen: (args) => {
            console.log("Gallery popup opened");
        },
        popupClose: (args) => {
            console.log("Gallery popup closed");
        }
    }
}
```

## ComboBox Item Events

Handle combobox selection and filtering:

### change Event

```typescript
{
    type: RibbonItemType.ComboBox,
    comboBoxSettings: {
        dataSource: ["Arial", "Times New Roman", "Verdana"],
        width: "150px",
        change: (args) => {
            console.log("Font changed to:", args.value);
            applyFont(args.value);
        }
    }
}

function applyFont(fontName: string) {
    console.log("Applying font:", fontName);
}
```

### filtering Event

```typescript
{
    type: RibbonItemType.ComboBox,
    comboBoxSettings: {
        dataSource: ["Arial", "Times New Roman", "Verdana", "Georgia"],
        allowFiltering: true,
        filtering: (args) => {
            console.log("Filtering with text:", args.text);
            // Perform custom filtering logic
        }
    }
}
```

## GroupButton Item Events

Handle group button clicks:

### clicked Event

```typescript
{
    type: RibbonItemType.GroupButton,
    groupButtonSettings: {
        selection: "Multiple",
        items: [
            { iconCss: "e-icons e-bold", id: "bold" },
            { iconCss: "e-icons e-italic", id: "italic" },
            { iconCss: "e-icons e-underline", id: "underline" }
        ],
        clicked: (args) => {
            console.log("Button clicked:", args.item.id);
            console.log("Is selected:", args.item.selected);
            
            toggleFormatting(args.item.id, args.item.selected);
        }
    }
}

function toggleFormatting(format: string, enabled: boolean) {
    console.log(`${format} formatting: ${enabled ? "ON" : "OFF"}`);
}
```

## Complete Methods Reference

All 34 Ribbon methods with complete signatures, parameters, and return types:

### Tab Management Methods

#### addTab(tab: RibbonTabModel, targetId?: string, isAfter?: boolean): void

Adds a new tab to the Ribbon.

```typescript
ribbon.addTab({
    header: "Design",
    id: "design-tab",
    groups: []
}, "home-tab", true); // Add after Home tab
```

**Parameters:**
- `tab` (RibbonTabModel): Tab configuration to add (required)
- `targetId` (string, optional): ID of target tab for positioning
- `isAfter` (boolean, optional): Insert after target if true, before if false

#### removeTab(tabId: string | number): void

Removes a tab by ID.

```typescript
ribbon.removeTab("design-tab"); // Remove by ID
```

**Parameters:**
- `tabId` (string): Tab ID to remove

#### selectTab(tabId: string): void

Selects a specific tab.

```typescript
ribbon.selectTab("insert-tab");
```

**Parameters:**
- `tabId` (string): ID of the tab to select

#### disableTab(tabId: string): void

Disables a tab, preventing user interaction.

```typescript
ribbon.disableTab("advanced-tab");
```

**Parameters:**
- `tabId` (string): ID of the tab to disable

#### enableTab(tabId: string): void

Enables a previously disabled tab.

```typescript
ribbon.enableTab("advanced-tab");
```

**Parameters:**
- `tabId` (string): ID of the tab to enable

#### hideTab(tabId: string, isContextual: boolean): void

Hides a tab from display.

```typescript
ribbon.hideTab("design-tab", false); // Regular tab
ribbon.hideTab("table-tools", true);  // Contextual tab
```

**Parameters:**
- `tabId` (string): ID of the tab to hide
- `isContextual` (boolean): True if hiding a contextual tab

#### showTab(tabId: string, isContextual: boolean): void

Shows a hidden tab.

```typescript
ribbon.showTab("design-tab", false); // Show regular tab
ribbon.showTab("table-tools", true);  // Show contextual tab
```

**Parameters:**
- `tabId` (string): ID of the tab to show
- `isContextual` (boolean): True if showing a contextual tab

#### updateTab(tab: RibbonTabModel): void

Updates tab properties. ID is required, other properties optional.

```typescript
ribbon.updateTab({
    id: "home-tab",
    header: "Updated Home",
    cssClass: "new-class"
});
```

**Parameters:**
- `tab` (RibbonTabModel): Tab configuration with ID and updates

### Group Management Methods

#### addGroup(tabId: string, group: RibbonGroupModel, targetId?: string, isAfter?: boolean): void

Adds a group to a specific tab.

```typescript
ribbon.addGroup("home-tab", {
    header: "New Group",
    id: "new-group",
    collections: []
}, "clipboard-group", true);
```

**Parameters:**
- `tabId` (string): ID of the target tab
- `group` (RibbonGroupModel): Group configuration
- `targetId` (string, optional): ID of target group for positioning
- `isAfter` (boolean, optional): Insert after target if true

#### removeGroup(groupId: string): void

Removes a group from the Ribbon.

```typescript
ribbon.removeGroup("clipboard-group");
```

**Parameters:**
- `groupId` (string): ID of the group to remove

#### disableGroup(groupID: string): void

Disables a group, making items inactive.

```typescript
ribbon.disableGroup("font-group");
```

**Parameters:**
- `groupID` (string): ID of the group to disable

#### enableGroup(groupID: string): void

Enables a previously disabled group.

```typescript
ribbon.enableGroup("font-group");
```

**Parameters:**
- `groupID` (string): ID of the group to enable

#### hideGroup(groupID: string): void

Hides a group from display.

```typescript
ribbon.hideGroup("advanced-group");
```

**Parameters:**
- `groupID` (string): ID of the group to hide

#### showGroup(groupID: string): void

Shows a previously hidden group.

```typescript
ribbon.showGroup("advanced-group");
```

**Parameters:**
- `groupID` (string): ID of the group to show

#### updateGroup(group: RibbonGroupModel): void

Updates group properties. ID is required, other properties optional.

```typescript
ribbon.updateGroup({
    id: "font-group",
    header: "Updated Font",
    priority: 1
});
```

**Parameters:**
- `group` (RibbonGroupModel): Group configuration with ID and updates

### Collection Management Methods

#### addCollection(groupId: string, collection: RibbonCollectionModel, targetId?: string, isAfter?: boolean): void

Adds a collection to a group.

```typescript
ribbon.addCollection("font-group", {
    id: "new-collection",
    items: []
}, "existing-collection", true);
```

**Parameters:**
- `groupId` (string): ID of the target group
- `collection` (RibbonCollectionModel): Collection configuration
- `targetId` (string, optional): ID of target collection for positioning
- `isAfter` (boolean, optional): Insert after target if true

#### removeCollection(collectionId: string): void

Removes a collection from a group.

```typescript
ribbon.removeCollection("old-collection");
```

**Parameters:**
- `collectionId` (string): ID of the collection to remove

#### updateCollection(collection: RibbonCollectionModel): void

Updates collection properties. ID is required, other properties optional.

```typescript
ribbon.updateCollection({
    id: "font-collection",
    cssClass: "updated-class"
});
```

**Parameters:**
- `collection` (RibbonCollectionModel): Collection configuration with ID and updates

### Item Management Methods

#### addItem(collectionId: string, item: RibbonItemModel, targetId?: string, isAfter?: boolean): void

Adds an item to a collection.

```typescript
ribbon.addItem("clipboard-collection", {
    type: RibbonItemType.Button,
    id: "new-button",
    buttonSettings: { content: "New Button" }
}, "existing-item", true);
```

**Parameters:**
- `collectionId` (string): ID of the target collection
- `item` (RibbonItemModel): Item configuration
- `targetId` (string, optional): ID of target item for positioning
- `isAfter` (boolean, optional): Insert after target if true

#### removeItem(itemId: string): void

Removes an item from the Ribbon.

```typescript
ribbon.removeItem("old-button");
```

**Parameters:**
- `itemId` (string): ID of the item to remove

#### disableItem(itemId: string): void

Disables an item, preventing interaction.

```typescript
ribbon.disableItem("save-button");
```

**Parameters:**
- `itemId` (string): ID of the item to disable

#### enableItem(itemId: string): void

Enables a previously disabled item.

```typescript
ribbon.enableItem("save-button");
```

**Parameters:**
- `itemId` (string): ID of the item to enable

#### hideItem(itemId: string): void

Hides an item from display.

```typescript
ribbon.hideItem("advanced-option");
```

**Parameters:**
- `itemId` (string): ID of the item to hide

#### showItem(itemId: string): void

Shows a previously hidden item.

```typescript
ribbon.showItem("advanced-option");
```

**Parameters:**
- `itemId` (string): ID of the item to show

#### getItem(itemId: string): RibbonItemModel

Retrieves the item model by ID.

```typescript
const item = ribbon.getItem("save-button");
if (item) {
    console.log("Item:", item.id);
}
```

**Parameters:**
- `itemId` (string): ID of the item to retrieve

**Returns:** RibbonItemModel or undefined

#### updateItem(item: RibbonItemModel): void

Updates item properties. ID is required, other properties optional.

```typescript
ribbon.updateItem({
    id: "save-button",
    disabled: true,
    cssClass: "updated-style"
});
```

**Parameters:**
- `item` (RibbonItemModel): Item configuration with ID and updates

### Event Registration Methods

#### addEventListener(eventName: string, handler: Function): void

Adds an event listener to the Ribbon.

```typescript
ribbon.addEventListener("created", () => {
    console.log("Ribbon initialized");
});

ribbon.addEventListener("tabSelected", (args) => {
    console.log("Tab selected:", args.selectedIndex);
});
```

**Parameters:**
- `eventName` (string): Name of the event to listen to
- `handler` (Function): Callback function for the event

**Common events:**
- "created", "tabSelected", "tabSelecting", "ribbonCollapsing", "ribbonExpanding", "ribbonLayoutSwitched", "launcherIconClick", "overflowPopupOpen", "overflowPopupClose"

#### removeEventListener(eventName: string, handler: Function): void

Removes an event listener from the Ribbon.

```typescript
function myHandler(args: any) {
    console.log("Event fired");
}

ribbon.addEventListener("created", myHandler);
ribbon.removeEventListener("created", myHandler);
```

**Parameters:**
- `eventName` (string): Name of the event
- `handler` (Function): The exact handler function to remove

### Utility Methods

#### appendTo(selector?: string | HTMLElement): void

Appends the Ribbon to a target element.

```typescript
ribbon.appendTo("#ribbon-container");
ribbon.appendTo(document.getElementById("ribbon"));
```

**Parameters:**
- `selector` (string | HTMLElement, optional): Target selector or element

#### refresh(): void

Refreshes the Ribbon, applying all pending changes and re-rendering.

```typescript
ribbon.refresh();
```

**Use when:** Making multiple property changes programmatically

#### refreshLayout(): void

Refreshes only the Ribbon layout without full re-render.

```typescript
ribbon.refreshLayout();
```

**Use when:** Container size changes or CSS affects layout

#### dataBind(): void

Applies pending property changes to the component.

```typescript
ribbon.dataBind();
```

#### getRootElement(): HTMLElement

Returns the root DOM element of the Ribbon.

```typescript
const ribbonElement = ribbon.getRootElement();
console.log(ribbonElement.classList);
```

**Returns:** HTMLElement

#### Inject(moduleList: Function[]): void

Dynamically injects required modules to enable features.

```typescript
Ribbon.Inject([RibbonFileMenu, RibbonBackstage]);

let ribbon: Ribbon = new Ribbon({
    fileMenu: { visible: true },
    backStageMenu: { visible: true },
    tabs: []
});
```

**Parameters:**
- `moduleList` (Function[]): Array of module classes to inject

**Common modules:**
- RibbonFileMenu, RibbonBackstage, RibbonGallery, RibbonColorPicker, RibbonKeyTip, RibbonContextualTab

## API Methods Overview


Common methods for programmatic Ribbon control:

### Tab Management

```typescript
// Add a new tab
ribbon.addTab({
    header: "Design",
    groups: []
}, 2); // Insert at index 2

// Remove a tab by ID
ribbon.removeTab("design-tab");

// Select a tab
ribbon.selectedTab = 1; // Select second tab
```

### Group Management

```typescript
// Add a group to a tab
ribbon.addGroup("home-tab", {
    header: "New Group",
    collections: []
});

// Remove a group
ribbon.removeGroup("clipboard-group");
```

### Item Management

```typescript
// Add an item to a collection
ribbon.addItem("home-tab", "font-group", 0, {
    type: RibbonItemType.Button,
    buttonSettings: {
        content: "New Button",
        iconCss: "e-icons e-file-new"
    }
});

// Remove an item
ribbon.removeItem("save-button-id");
```

### Ribbon State

```typescript
// Minimize/expand ribbon
ribbon.isMinimized = true; // Collapse to tabs only
ribbon.isMinimized = false; // Expand

// Change layout
ribbon.activeLayout = "Simplified"; // Switch to Simplified
ribbon.activeLayout = "Classic"; // Switch to Classic

// Show/hide elements
ribbon.hideLayoutSwitcher = true; // Hide layout switcher button
```

### Utility Methods

```typescript
// Refresh ribbon
ribbon.refresh();

// Destroy ribbon
ribbon.destroy();

// Re-render ribbon
ribbon.dataBind();
```

## Advanced API Methods

Specialized methods for advanced Ribbon control and introspection:

### Tab Selection and Access

Select tabs and retrieve Tab information:

```typescript
// Select a specific tab by ID
ribbon.selectTab("design-tab-id");

// Get information about current tab
let currentTabIndex = ribbon.selectedTab;
console.log("Current tab index:", currentTabIndex);

// Get a specific item
let item = ribbon.getItem("save-button-id");
if (item) {
    console.log("Item found:", item.id);
}

// Get root element of ribbon
let ribbonElement = ribbon.getRootElement();
console.log("Ribbon DOM element:", ribbonElement);
```

### Update Methods

Update existing ribbon components after initialization:

```typescript
// Update a tab
ribbon.updateTab({
    id: "design-tab",
    header: "Updated Design Tab",
    jsClass: "new-class"
});

// Update a group
ribbon.updateGroup({
    id: "font-group",
    header: "Updated Font",
    priority: 1
});

// Update a collection
ribbon.updateCollection({
    id: "clipboard-collection",
    cssClass: "custom-collection"
});

// Update an item
ribbon.updateItem({
    id: "save-btn",
    disabled: true,
    cssClass: "disabled-state"
});
```

### Collection Management

Manage collections within groups:

```typescript
// Add a collection to a group
ribbon.addCollection("home-tab", "font-group", {
    id: "new-collection",
    items: [{
        type: RibbonItemType.Button,
        buttonSettings: { content: "Button 1" }
    }]
}, "existing-collection-id", true); // Insert after existing collection

// Remove a collection
ribbon.removeCollection("old-collection-id");
```

### Layout and Display Refresh

Advanced layout control and refresh operations:

```typescript
// Refresh the ribbon layout
ribbon.refreshLayout();

// This is useful when:
// - Container size changes
// - Dynamic content is added/removed
// - CSS changes affect layout
// - Responsive behavior needs update

// Complete refresh with data binding
ribbon.refresh();

// Refresh after major updates
ribbon.dataBind();
```

### Complete Ribbon State Management Example

```typescript
function manageRibbonState(ribbon: Ribbon) {
    // Get current state
    const currentLayout = ribbon.activeLayout;
    const currentTab = ribbon.selectedTab;
    const rootElement = ribbon.getRootElement();
    
    // Update multiple components
    ribbon.updateTab({
        id: "home-tab",
        header: "Home (Updated)"
    });
    
    ribbon.updateGroup({
        id: "clipboard-group",
        priority: 1
    });
    
    ribbon.updateItem({
        id: "paste-btn",
        disabled: false
    });
    
    // Refresh layout after updates
    ribbon.refreshLayout();
    
    // Get updated item
    const pasteItem = ribbon.getItem("paste-btn");
    console.log("Paste item updated:", pasteItem);
    
    // Select a tab
    ribbon.selectTab("insert-tab-id");
}

// Usage
manageRibbonState(ribbon);
```

## Complete Examples

### Example 1: Comprehensive Event Handling

```typescript
import { Ribbon, RibbonTabModel, RibbonItemType } from "@syncfusion/ej2-ribbon";

let tabs: RibbonTabModel[] = [{
    header: "Home",
    id: "home-tab",
    groups: [{
        id: "clipboard-group",
        header: "Clipboard",
        showLauncherIcon: true,
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                buttonSettings: {
                    content: "Paste",
                    iconCss: "e-icons e-paste",
                    clicked: () => {
                        console.log("Paste clicked");
                        performPaste();
                    }
                }
            }]
        }]
    }, {
        id: "font-group",
        header: "Font",
        showLauncherIcon: true,
        collections: [{
            items: [{
                type: RibbonItemType.CheckBox,
                checkBoxSettings: {
                    label: "Bold",
                    change: (args) => {
                        console.log("Bold toggled:", args.checked);
                        toggleBold(args.checked);
                    }
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    tabs: tabs,
    tabSelected: (args) => {
        console.log("Tab selected:", args.selectedIndex);
        logTabChange(args.selectedTab.header);
    },
    tabSelecting: (args) => {
        console.log("Tab selecting:", args.selectingIndex);
        if (needsSave()) {
            args.cancel = true;
            promptSave();
        }
    },
    launcherIconClick: (args) => {
        console.log("Launcher clicked:", args.groupId);
        openDialog(args.groupId);
    },
    ribbonCollapsing: () => {
        console.log("Ribbon collapsing");
        saveRibbonState();
    },
    ribbonExpanding: () => {
        console.log("Ribbon expanding");
        restoreRibbonState();
    }
});

ribbon.appendTo("#ribbon");

function performPaste() {
    console.log("Performing paste operation");
}

function toggleBold(enabled: boolean) {
    console.log("Bold formatting:", enabled);
}

function logTabChange(tabName: string) {
    console.log("User switched to tab:", tabName);
}

function needsSave(): boolean {
    return false; // Check if document needs saving
}

function promptSave() {
    alert("Please save your changes first");
}

function openDialog(groupId: string) {
    console.log("Opening dialog for group:", groupId);
}

function saveRibbonState() {
    console.log("Saving ribbon state");
}

function restoreRibbonState() {
    console.log("Restoring ribbon state");
}
```

### Example 2: Dynamic API Usage

```typescript
let ribbon: Ribbon = new Ribbon({
    tabs: [{
        header: "Home",
        id: "home-tab",
        groups: []
    }]
});

ribbon.appendTo("#ribbon");

// Add a new tab dynamically
setTimeout(() => {
    ribbon.addTab({
        header: "Insert",
        id: "insert-tab",
        groups: [{
            header: "Tables",
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Table",
                        iconCss: "e-icons e-table",
                        clicked: () => {
                            console.log("Insert table");
                        }
                    }
                }]
            }]
        }]
    });
}, 2000);

// Switch layout after 4 seconds
setTimeout(() => {
    ribbon.activeLayout = "Simplified";
}, 4000);

// Minimize ribbon after 6 seconds
setTimeout(() => {
    ribbon.isMinimized = true;
}, 6000);
```

These examples demonstrate comprehensive event handling and API usage for full programmatic control of the Ribbon.
