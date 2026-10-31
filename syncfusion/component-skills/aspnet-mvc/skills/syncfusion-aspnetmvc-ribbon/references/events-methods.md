# Events & Methods — Syncfusion ASP.NET MVC Ribbon

## Table of Contents
- [Ribbon-Level Events](#ribbon-level-events)
- [Button Events](#button-events)
- [CheckBox Events](#checkbox-events)
- [ColorPicker Events](#colorpicker-events)
- [ComboBox Events](#combobox-events)
- [DropDown Events](#dropdown-events)
- [SplitButton Events](#splitbutton-events)
- [GroupButton Events](#groupbutton-events)
- [Gallery Events](#gallery-events)
- [FileMenu Events](#filemenu-events)
- [Backstage Events](#backstage-events)
- [Dynamic Add Methods](#dynamic-add-methods)
- [Dynamic Remove Methods](#dynamic-remove-methods)
- [Item State Methods](#item-state-methods)
- [Navigation & Layout Methods](#navigation--layout-methods)

---

## Ribbon-Level Events

```cshtml
@Html.EJS().Ribbon("ribbon")
    .Created("function(args){ ribbonCreatedEvent(args) }")
    .TabSelected("function(args){ tabSelectedEvent(args) }")
    .TabSelecting("function(args){ tabSelectingEvent(args) }")
    .RibbonCollapsing("function(args){ ribbonCollapsingEvent(args) }")
    .RibbonExpanding("function(args){ ribbonExpandingEvent(args) }")
    .RibbonLayoutSwitched("function(args){ ribbonLayoutSwitched(args) }")
    .LauncherIconClick("function(args){ launchClick(args) }")
    .OverflowPopupOpen("function(args){ overflowPopupOpen(args) }")
    .OverflowPopupClose("function(args){ overflowPopupClose(args) }")
    .Tabs(...).Render()
```

| Event | Triggered When | Args |
|---|---|---|
| `Created` | Ribbon is fully rendered and initialized | `null` |
| `TabSelected` | After a tab is selected | `selectedIndex`, `previousIndex`, `isContextual` |
| `TabSelecting` | Before a tab is selected (cancellable) | `isInteracted`, `isContextual` |
| `RibbonCollapsing` | Before the ribbon collapses | `cancel` |
| `RibbonExpanding` | Before the ribbon expands | `cancel` |
| `RibbonLayoutSwitched` | Layout switches between Classic and Simplified | `activeLayout` |
| `LauncherIconClick` | When a group's launcher icon is clicked | Event object |
| `OverflowPopupOpen` | When the overflow popup opens | `cancel`, `element`, `event` |
| `OverflowPopupClose` | When the overflow popup closes | `cancel`, `element`, `event` |

**TabSelected Event Args:**
```javascript
function tabSelectedEvent(args) {
    console.log(args.selectedIndex);    // Index of selected tab
    console.log(args.previousIndex);    // Index of previously selected tab
    console.log(args.isContextual);     // Whether the selected tab is contextual
}
```

**TabSelecting Event Args:**
```javascript
function tabSelectingEvent(args) {
    console.log(args.isInteracted);     // Whether the selection was user-initiated
    console.log(args.isContextual);     // Whether the tab being selected is contextual
    // Set args.cancel = true to prevent tab selection
}
```

**RibbonLayoutSwitched Event Args:**
```javascript
function ribbonLayoutSwitched(args) {
    console.log(args.activeLayout);     // "Classic" or "Simplified"
}
```

> `LauncherIconClick` requires `ShowLauncherIcon(true)` on the group.

---

## Button Events

```cshtml
items.Type(RibbonItemType.Button).ButtonSettings(button =>
{
    button.IconCss("e-icons e-cut").Content("Cut")
          .Clicked("function(){ clickedEvent() }")
          .Created("function(){ createdEvent() }");
}).Add();
```

| Event | Triggered When |
|---|---|
| `Clicked` | Button is clicked |
| `Created` | Button is created |

---

## CheckBox Events

```cshtml
items.Type(RibbonItemType.CheckBox).CheckBoxSettings(checkBox =>
{
    checkBox.Label("Ruler").Checked(false)
            .Change("function(){ changeEvent() }")
            .Created("function(){ createdEvent() }");
}).Add();
```

| Event | Triggered When |
|---|---|
| `Change` | Checkbox state changes |
| `Created` | Checkbox is created |

---

## ColorPicker Events

```cshtml
items.Type(RibbonItemType.ColorPicker).ColorPickerSettings(colorPicker =>
{
    colorPicker.Value("#123456")
               .Change("function(){ changeEvent() }")
               .Created("function(){ createdEvent() }")
               .Open("function(args){ openEvent(args) }")
               .Select("function(args){ selectEvent(args) }")
               .BeforeClose("function(args){ beforeCloseEvent(args) }")
               .BeforeOpen("function(args){ beforeOpenEvent(args) }")
               .BeforeTileRender("function(args){ beforeTileRenderEvent(args) }");
}).Add();
```

| Event | Triggered When |
|---|---|
| `Change` | Color changes |
| `Created` | ColorPicker is created |
| `Open` | Popup opens |
| `Select` | Color is selected (when `ShowButtons` is enabled) |
| `BeforeClose` | Before popup closes |
| `BeforeOpen` | Before popup opens |
| `BeforeTileRender` | While rendering each palette tile |

---

## ComboBox Events

```cshtml
items.Type(RibbonItemType.ComboBox).ComboBoxSettings(comboBox =>
{
    comboBox.DataSource(fontStyle).Index(2)
            .Change("function(args){ changeEvent(args) }")
            .Close("function(args){ closeEvent(args) }")
            .Open("function(args){ openEvent(args) }")
            .Created("function(args){ createdEvent(args) }")
            .Filtering("function(args){ filteringEvent(args) }")
            .Select("function(args){ selectEvent(args) }")
            .BeforeOpen("function(args){ beforeOpenEvent(args) }");
}).Add();
```

| Event | Triggered When |
|---|---|
| `Change` | Selected item changes or model value changes |
| `Close` | Popup closes |
| `Open` | Popup opens |
| `Created` | ComboBox is created |
| `Filtering` | User types a character |
| `Select` | An item in the popup is selected |
| `BeforeOpen` | Before popup opens |

---

## DropDown Events

```cshtml
items.Type(RibbonItemType.DropDown).DropDownSettings(dropDown =>
{
    dropDown.IconCss("e-icons e-table").Content("Table").Items(tableOptions)
            .BeforeClose("function(args){ beforeCloseEvent(args) }")
            .BeforeOpen("function(args){ beforeOpenEvent(args) }")
            .BeforeItemRender("function(args){ beforeItemRenderEvent(args) }")
            .Open("function(args){ openEvent(args) }")
            .Close("function(args){ closeEvent(args) }")
            .Created("function(args){ createdEvent(args) }")
            .Select("function(args){ selectEvent(args) }");
}).Add();
```

| Event | Triggered When |
|---|---|
| `BeforeClose` | Before popup closes |
| `BeforeOpen` | Before popup opens |
| `BeforeItemRender` | While rendering each popup item |
| `Open` | After popup opens |
| `Close` | After popup closes |
| `Created` | DropDown is created |
| `Select` | A popup item is selected |

---

## SplitButton Events

```cshtml
items.Type(RibbonItemType.SplitButton).SplitButtonSettings(splitButton =>
{
    splitButton.IconCss("e-icons e-paste").Items(pasteOptions).Content("Paste")
               .BeforeClose("function(args){ beforeCloseEvent(args) }")
               .BeforeOpen("function(args){ beforeOpenEvent(args) }")
               .BeforeItemRender("function(args){ beforeItemRenderEvent(args) }")
               .Open("function(args){ openEvent(args) }")
               .Close("function(args){ closeEvent(args) }")
               .Created("function(args){ createdEvent(args) }")
               .Select("function(args){ selectEvent(args) }")
               .Click("function(args){ clickEvent(args) }");
}).Add();
```

| Event | Triggered When |
|---|---|
| `Click` | Primary button part is clicked |
| `Select` | A popup item is selected |
| `BeforeClose` | Before popup closes |
| `BeforeOpen` | Before popup opens |
| `BeforeItemRender` | While rendering each popup item |
| `Open` | After popup opens |
| `Close` | After popup closes |
| `Created` | SplitButton is created |

---

## GroupButton Events

```cshtml
List<RibbonGroupButtonItem> events = new List<RibbonGroupButtonItem>() {
    new RibbonGroupButtonItem {
        IconCss = "e-icons e-bold", Content = "Bold",
        BeforeClick = "function(args){ beforeClickEvent(args) }",
        Click       = "function(args){ clickEvent(args) }"
    },
    new RibbonGroupButtonItem {
        IconCss = "e-icons e-italic", Content = "Italic", Selected = true,
        BeforeClick = "function(args){ beforeClickEvent(args) }",
        Click       = "function(args){ clickEvent(args) }"
    }
};
```

| Event | Triggered When |
|---|---|
| `BeforeClick` | Before a button in the group is selected |
| `Click` | When a button in the group is selected |

---

## Gallery Events

```cshtml
items.Type(RibbonItemType.Gallery).GallerySettings(gallery =>
{
    gallery
        .PopupOpen("popupOpen")
        .PopupClose("popupClose")
        .ItemHover("itemHover")
        .BeforeItemRender("beforeItemRender")
        .BeforeSelect("beforeSelect")
        .Select("select")
        .Groups(galleryGroups => { /* groups */ });
}).Add();
```

| Event | Triggered When |
|---|---|
| `PopupOpen` | Gallery popup opens |
| `PopupClose` | Gallery popup closes |
| `ItemHover` | Mouse hovers over a gallery item |
| `BeforeItemRender` | While rendering each gallery item |
| `BeforeSelect` | Before a gallery item is selected |
| `Select` | When a gallery item is selected |

---

## FileMenu Events

See [file-menu.md](file-menu.md) for the full event list and examples.

---

## Backstage Events

See [backstage.md](backstage.md#backstage-item-click-event) for the `BackStageItemClick` event.

---

## Dynamic Add Methods

Get the ribbon instance first:
```javascript
var ribbonObj = document.getElementById("ribbon").ej2_instances[0];
```

### addTab

```javascript
let newTab = { header: "Insert", id: "insertTab" };
ribbonObj.addTab(newTab);                              // append at end
ribbonObj.addTab(newTab, "homeTab", true);             // insert after homeTab
ribbonObj.addTab(newTab, "homeTab", false);            // insert before homeTab
```

### addGroup

```javascript
let newGroup = { header: "New Group", id: "newGroup" };
ribbonObj.addGroup("homeTab", newGroup);               // append to homeTab
ribbonObj.addGroup("homeTab", newGroup, "clipBoard", true);  // after clipBoard
```

### addCollection

```javascript
let newCollection = {
    id: "newCollection",
    items: [
        { type: "Button", buttonSettings: { content: "Edit", iconCss: "e-icons e-edit" } },
        { type: "ColorPicker", colorPickerSettings: { value: "035a" } }
    ]
};
ribbonObj.addCollection("fontGroup", newCollection);
```

### addItem

```javascript
let newItem = {
    id: "newItem",
    type: "ColorPicker",
    colorPickerSettings: { value: "035a" }
};
ribbonObj.addItem("buttonCollection", newItem);
ribbonObj.addItem("buttonCollection", newItem, "cutItem", true);  // after cutItem
```

---

## Dynamic Remove Methods

```javascript
ribbonObj.removeTab("insertTab");
ribbonObj.removeGroup("clipBoard");
ribbonObj.removeCollection("colorPicker");
ribbonObj.removeItem("copyItem");
```

---

## Item State Methods

### Enable / Disable Items

**Enable a disabled item:**
```cshtml
@* Initially disabled in markup *@
items.Id("cutItem").Disabled(true).Type(RibbonItemType.Button).ButtonSettings(b =>
{
    b.IconCss("e-icons e-cut").Content("Cut");
}).Add();
```

```javascript
ribbonObj.enableItem("cutItem");    // enable
ribbonObj.disableItem("cutItem");   // disable
```

### Enable / Disable Groups

```javascript
ribbonObj.enableGroup("clipBoard");    // enable group and all items within
ribbonObj.disableGroup("clipBoard");   // disable group and all items within
```

### Show / Hide Items

**Toggle item visibility (not the same as enable/disable):**
```javascript
ribbonObj.showItem("editItem");      // make item visible
ribbonObj.hideItem("editItem");      // hide item (removed from DOM)
```

### Show / Hide Groups

**Toggle group visibility:**
```javascript
ribbonObj.showGroup("formatGroup");   // make group visible
ribbonObj.hideGroup("formatGroup");   // hide group (removed from DOM)
```

### Get Item Model

**Read back an item's properties programmatically:**
```javascript
let itemModel = ribbonObj.getItem("cutItem");
console.log(itemModel.type);                    // Item type (Button, ComboBox, etc.)
console.log(itemModel.buttonSettings?.content); // Button content if Button type
console.log(itemModel.disabled);                // Current disabled state
```

### Update Ribbon Elements

**Update an item after render:**
```javascript
let updatedItem = {
    id: "cutItem",
    type: "Button",
    buttonSettings: { 
        content: "Cut (Updated)", 
        iconCss: "e-icons e-cut" 
    }
};
ribbonObj.updateItem("cutItem", updatedItem);
```

**Update a group after render:**
```javascript
let updatedGroup = {
    header: "Clipboard (Updated)",
    id: "clipBoard",
    orientation: "Row"
};
ribbonObj.updateGroup("homeTab", "clipBoard", updatedGroup);
```

**Update a collection after render:**
```javascript
let updatedCollection = {
    id: "collection1",
    items: [
        { type: "Button", buttonSettings: { content: "New Button" } }
    ]
};
ribbonObj.updateCollection("clipBoard", "collection1", updatedCollection);
```

**Update a tab after render:**
```javascript
let updatedTab = {
    header: "Home (Updated)",
    id: "homeTab"
};
ribbonObj.updateTab(updatedTab);
```

---

## Navigation & Layout Methods

**Select a tab programmatically:**
```javascript
ribbonObj.selectTab("insertTab");
```

**Switch layout and refresh:**
```javascript
ribbonObj.activeLayout = "Simplified";
ribbonObj.refreshLayout();
```

**Show/hide contextual tabs:**
```javascript
ribbon.showTab("ArrangeView", true);   // show
ribbon.hideTab("ArrangeView", true);   // hide
```

**Enable/disable a tab:**
```javascript
ribbonObj.enableTab("insertTab");      // enable tab for selection
ribbonObj.disableTab("insertTab");     // disable tab (cannot select)
```
