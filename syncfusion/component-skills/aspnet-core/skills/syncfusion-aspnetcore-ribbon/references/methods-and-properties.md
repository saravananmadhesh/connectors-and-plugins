# Methods and Properties

## Table of Contents

- [Ribbon Properties](#ribbon-properties)
- [Tab Properties](#tab-properties)
- [Group Properties](#group-properties)
- [Item Properties](#item-properties)
- [Ribbon Methods](#ribbon-methods)
- [Complete Example](#complete-example)

## Ribbon Properties

### Core Ribbon Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | string | `""` | Unique identifier for ribbon |
| `activeLayout` | string | `"Classic"` | Active layout (`Classic` or `Simplified`) |
| `enableKeyTips` | bool | `false` | Enable KeyTips keyboard navigation |
| `enablePersistence` | bool | `false` | Persist state (layout, selected tab) across page reloads |
| `enableRtl` | bool | `false` | Enable right-to-left layout |
| `helpPaneTemplate` | string | `""` | CSS selector or HTML string for the help pane (right side of ribbon header) |
| `hideLayoutSwitcher` | bool | `false` | Hide the layout switcher button |
| `isMinimized` | bool | `false` | Start ribbon in minimized state |
| `layoutSwitcherKeyTip` | string | `""` | KeyTip character for the layout switcher button |
| `locale` | string | `"en-us"` | Locale for built-in UI strings |
| `selectedTab` | int | `0` | Index of the initially selected tab |
| `width` | string | `"100%"` | Ribbon width |

### Basic Property Usage

```razor
<ejs-ribbon id="ribbon" 
    activeLayout="Simplified"
    enableKeyTips=true
    enableRtl=false
    isMinimized=false
    hideLayoutSwitcher=false
    selectedTab=0
    width="100%">
    <!-- Content -->
</ejs-ribbon>
```

## Tab Properties

### RibbonTab Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `header` | string | `""` | Tab display text |
| `id` | string | `""` | Unique tab identifier |
| `keyTip` | string | `""` | Alt+key shortcut (e.g., "H") |
| `cssClass` | string | `""` | Custom CSS class for the tab |
| `groups` | List<RibbonGroup> | `null` | Tab groups collection |

### Tab Configuration

```razor
<e-ribbon-tabs>
    <e-ribbon-tab 
        header="Home" 
        id="home-tab"
        keyTip="H"
        ariaLabel="Home tab. Contains basic editing commands."
        visible=true>
        <e-ribbon-groups>
            <!-- Groups -->
        </e-ribbon-groups>
    </e-ribbon-tab>

    <e-ribbon-tab 
        header="Insert" 
        id="insert-tab"
        keyTip="I"
        ariaLabel="Insert tab. Contains commands for inserting objects."
        visible=true>
        <e-ribbon-groups>
            <!-- Groups -->
        </e-ribbon-groups>
    </e-ribbon-tab>
</e-ribbon-tabs>
```

## Group Properties

### RibbonGroup Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `header` | string | "" | Group display name |
| `id` | string | "" | Unique group identifier |
| `keyTip` | string | "" | Alt+key shortcut |
| `isCollapsible` | bool | true | Allow group collapse |
| `priority` | int | 0 | Collapse priority (lower = collapse first) |
| `enableGroupOverflow` | bool | false | Show overflow menu |
| `orientation` | string | "Row" | Layout (Row, Column) |
| `groupIconCss` | string | "" | Icon CSS class |
| `showLauncherIcon` | bool | false | Show launcher icon |
| `ariaLabel` | string | "" | Accessibility label |
| `collections` | List<RibbonCollection> | null | Items collections |

### Group Configuration

```razor
<e-ribbon-groups>
    <e-ribbon-group 
        header="Clipboard" 
        id="clipboard-group"
        keyTip="CD"
        isCollapsible=false
        priority=1
        enableGroupOverflow=false
        orientation="Row"
        groupIconCss="e-icons e-paste"
        showLauncherIcon=true
        ariaLabel="Clipboard group. Contains cut, copy, and paste commands.">
        <e-ribbon-collections>
            <!-- Collections -->
        </e-ribbon-collections>
    </e-ribbon-group>

    <e-ribbon-group 
        header="Font" 
        id="font-group"
        isCollapsible=true
        priority=2
        showLauncherIcon=false>
        <e-ribbon-collections>
            <!-- Collections -->
        </e-ribbon-collections>
    </e-ribbon-group>
</e-ribbon-groups>
```

## Item Properties

### Button Item Properties

```razor
<e-ribbon-item type=Button 
    id="bold-btn"
    keyTip="BD"
    allowedSizes="Small,Medium,Large"
    ariaLabel="Bold. Makes text bold. Keyboard: Ctrl+B">
    <e-ribbon-buttonsettings 
        iconCss="e-icons e-bold"
        content="Bold"
        isToggle=true>
    </e-ribbon-buttonsettings>
</e-ribbon-item>
```

### Common Item Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | string | `""` | Unique item identifier |
| `type` | RibbonItemType | `Button` | Item type |
| `keyTip` | string | `""` | Alt+key shortcut |
| `allowedSizes` | RibbonItemSize | `Large` | Allowed display sizes (`Large`, `Medium`, `Small`) |
| `activeSize` | RibbonItemSize | — | Current active size of the item (read-only at runtime) |
| `displayOptions` | DisplayMode | `Auto` | When to show the item (`Auto`, `Classic`, `Simplified`, `Overflow`) |
| `cssClass` | string | `""` | Custom CSS class for the item |
| `disabled` | bool | `false` | Disable item interaction |
| `itemTemplate` | string | `""` | Custom HTML template for the item |
| `ribbonTooltipSettings` | RibbonTooltipSettings | `null` | Tooltip configuration |

### RibbonButtonSettings Properties

```razor
<e-ribbon-buttonsettings 
    iconCss="e-icons e-copy"
    content="Copy"
    isToggle=false>
</e-ribbon-buttonsettings>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `iconCss` | string | "" | Icon CSS class |
| `content` | string | "" | Button text |
| `isToggle` | bool | false | Toggle button behavior |

### RibbonCheckBoxSettings Properties

```razor
<e-ribbon-checkboxsettings 
    label="Word Wrap"
    labelPosition="After"
    checked=false>
</e-ribbon-checkboxsettings>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `label` | string | "" | Checkbox label text |
| `labelPosition` | LabelPosition | After | Label position |
| `checked` | bool | false | Initial checked state |

### RibbonDropDownSettings Properties

```razor
<e-ribbon-dropdownsettings 
    items=menuList
    createPopupOnClick=true
    target="#selector">
</e-ribbon-dropdownsettings>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `items` | List<MenuItem> | null | Menu items |
| `createPopupOnClick` | bool | false | Create popup on click |
| `target` | string | "" | Target element selector |

### RibbonComboBoxSettings Properties

```razor
<e-ribbon-comboboxsettings 
    dataSource=fontList
    allowFiltering=true
    sortOrder="Ascending"
    width="150px">
</e-ribbon-comboboxsettings>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `dataSource` | List<object> | null | Data source |
| `allowFiltering` | bool | false | Enable filtering |
| `sortOrder` | SortOrder | Ascending | Sort order |
| `width` | string | "auto" | Width |

### RibbonColorPickerSettings Properties

```razor
<e-ribbon-colorpickersettings 
    value="#123456"
    showButtons=true
    presetColors=colorList>
</e-ribbon-colorpickersettings>
```

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `value` | string | "#000000" | Initial color |
| `showButtons` | bool | true | Show OK/Cancel buttons |
| `presetColors` | List<string> | null | Preset colors |

## Ribbon Methods

### Getting Ribbon Instance

```razor
<ejs-ribbon id="ribbon">
    <!-- Content -->
</ejs-ribbon>

<script>
    // Get ribbon instance
    var ribbonObj = document.getElementById('ribbon').ej2_instances[0];
</script>
```

### Common Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `selectTab(index)` | index: number | void | Select tab by index |
| `addTab(tab, index)` | tab: RibbonTab, index: number | void | Add new tab |
| `removeTab(index)` | index: number | void | Remove tab |
| `hideTab(id)` | id: string | void | Hide tab |
| `showTab(id)` | id: string | void | Show tab |
| `minimize()` | none | void | Minimize ribbon |
| `restore()` | none | void | Restore ribbon |
| `refresh()` | none | void | Refresh ribbon |
| `destroy()` | none | void | Destroy ribbon |

### Method Examples

```razor
<ejs-ribbon id="ribbon" created="ribbonCreated">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home" id="homeTab">
            <!-- Content -->
        </e-ribbon-tab>
        <e-ribbon-tab header="Insert" id="insertTab">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<div class="ribbon-controls">
    <button onclick="selectSecondTab()">Select Insert Tab</button>
    <button onclick="minimizeRibbon()">Minimize</button>
    <button onclick="restoreRibbon()">Restore</button>
    <button onclick="refreshRibbon()">Refresh</button>
</div>

<script>
    var ribbonObj;

    function ribbonCreated(args) {
        ribbonObj = document.getElementById('ribbon').ej2_instances[0];
    }

    function selectSecondTab() {
        ribbonObj.selectTab(1);
    }

    function minimizeRibbon() {
        ribbonObj.minimize();
    }

    function restoreRibbon() {
        ribbonObj.restore();
    }

    function refreshRibbon() {
        ribbonObj.refresh();
    }
</script>
```

### Adding Tabs Dynamically

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon

<ejs-ribbon id="ribbon" created="ribbonCreated">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Home tab content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<button onclick="addNewTab()">Add New Tab</button>

<script>
    var ribbonObj;

    function ribbonCreated(args) {
        ribbonObj = document.getElementById('ribbon').ej2_instances[0];
    }

    function addNewTab() {
        // Create new tab
        var newTab = {
            header: 'Custom Tab',
            id: 'custom-tab',
            groups: [
                {
                    header: 'Custom Group',
                    collections: [
                        {
                            items: [
                                {
                                    type: 'Button',
                                    buttonSettings: {
                                        content: 'Custom Button',
                                        iconCss: 'e-icons e-star'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        // Add tab at end
        ribbonObj.addTab(newTab, ribbonObj.tabs.length);
    }
</script>
```

## Complete Example

### Full Example with Properties and Methods

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    var fontList = new List<string> { "Arial", "Courier New", "Georgia", "Times New Roman", "Verdana" };
    var sizeList = new List<string> { "8", "10", "12", "14", "16", "18", "20", "22", "24", "28" };
    var styleOptions = new List<MenuItem>() { 
        new MenuItem { Text = "Heading 1" },
        new MenuItem { Text = "Heading 2" },
        new MenuItem { Text = "Normal" }
    };

    var copyTooltip = new RibbonTooltipSettings { 
        Title = "Copy", 
        Content = "Copy selected content<br/><strong>Keyboard:</strong> Ctrl+C" 
    };

    var pasteTooltip = new RibbonTooltipSettings { 
        Title = "Paste", 
        Content = "Paste content from clipboard<br/><strong>Keyboard:</strong> Ctrl+V" 
    };
}

<div class="ribbon-demo">
    <!-- Control Panel -->
    <div class="control-panel">
        <button onclick="selectTab(0)" class="btn">Select Home Tab</button>
        <button onclick="selectTab(1)" class="btn">Select Insert Tab</button>
        <button onclick="minimizeRibbon()" class="btn">Minimize</button>
        <button onclick="restoreRibbon()" class="btn">Restore</button>
        <button onclick="hideHomeTab()" class="btn">Hide Home Tab</button>
        <button onclick="showHomeTab()" class="btn">Show Home Tab</button>
    </div>

    <!-- Ribbon -->
    <ejs-ribbon id="ribbon" 
        activeLayout="Classic"
        enableKeyTips=true
        selectedTab=0
        tabSelected="onTabSelected"
        tabSelecting="onTabSelecting"
        ribbonLayoutSwitched="onLayoutSwitched"
        created="onCreated">
        
        <e-ribbon-tabs>
            <!-- Home Tab -->
            <e-ribbon-tab header="Home" id="homeTab" keyTip="H">
                <e-ribbon-groups>
                    <!-- Clipboard Group -->
                    <e-ribbon-group 
                        header="Clipboard" 
                        id="clipboardGroup"
                        keyTip="CD"
                        isCollapsible=false
                        priority=1
                        showLauncherIcon=true
                        groupIconCss="e-icons e-paste">
                        <e-ribbon-collections>
                            <e-ribbon-collection>
                                <e-ribbon-items>
                                    <e-ribbon-item type=Button keyTip="PA" ribbonTooltipSettings=pasteTooltip>
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-paste" 
                                            content="Paste">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                </e-ribbon-items>
                            </e-ribbon-collection>
                            <e-ribbon-collection>
                                <e-ribbon-items>
                                    <e-ribbon-item type=Button keyTip="CT" ribbonTooltipSettings=copyTooltip>
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-cut" 
                                            content="Cut">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                    <e-ribbon-item type=Button keyTip="CO">
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-copy" 
                                            content="Copy">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                </e-ribbon-items>
                            </e-ribbon-collection>
                        </e-ribbon-collections>
                    </e-ribbon-group>

                    <!-- Font Group -->
                    <e-ribbon-group 
                        header="Font" 
                        id="fontGroup"
                        isCollapsible=true
                        priority=2
                        showLauncherIcon=true
                        groupIconCss="e-icons e-bold">
                        <e-ribbon-collections>
                            <e-ribbon-collection>
                                <e-ribbon-items>
                                    <e-ribbon-item type=ComboBox allowedSizes="Large">
                                        <e-ribbon-comboboxsettings 
                                            dataSource=fontList 
                                            allowFiltering=true 
                                            width="140px">
                                        </e-ribbon-comboboxsettings>
                                    </e-ribbon-item>
                                    <e-ribbon-item type=ComboBox allowedSizes="Large">
                                        <e-ribbon-comboboxsettings 
                                            dataSource=sizeList 
                                            width="80px">
                                        </e-ribbon-comboboxsettings>
                                    </e-ribbon-item>
                                </e-ribbon-items>
                            </e-ribbon-collection>
                            <e-ribbon-collection>
                                <e-ribbon-items>
                                    <e-ribbon-item type=Button allowedSizes="Small" keyTip="BD">
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-bold" 
                                            isToggle=true 
                                            content="Bold">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                    <e-ribbon-item type=Button allowedSizes="Small" keyTip="IT">
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-italic" 
                                            isToggle=true 
                                            content="Italic">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                    <e-ribbon-item type=Button allowedSizes="Small" keyTip="UL">
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-underline" 
                                            isToggle=true 
                                            content="Underline">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                </e-ribbon-items>
                            </e-ribbon-collection>
                        </e-ribbon-collections>
                    </e-ribbon-group>
                </e-ribbon-groups>
            </e-ribbon-tab>

            <!-- Insert Tab -->
            <e-ribbon-tab header="Insert" id="insertTab" keyTip="I">
                <e-ribbon-groups>
                    <e-ribbon-group header="Insert Objects" id="insertGroup">
                        <e-ribbon-collections>
                            <e-ribbon-collection>
                                <e-ribbon-items>
                                    <e-ribbon-item type=Button keyTip="I1">
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-image" 
                                            content="Image">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                    <e-ribbon-item type=Button keyTip="I2">
                                        <e-ribbon-buttonsettings 
                                            iconCss="e-icons e-table" 
                                            content="Table">
                                        </e-ribbon-buttonsettings>
                                    </e-ribbon-item>
                                </e-ribbon-items>
                            </e-ribbon-collection>
                        </e-ribbon-collections>
                    </e-ribbon-group>
                </e-ribbon-groups>
            </e-ribbon-tab>
        </e-ribbon-tabs>
    </ejs-ribbon>
</div>

<style>
    .ribbon-demo {
        font-family: Arial, sans-serif;
    }

    .control-panel {
        padding: 10px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #ddd;
    }

    .btn {
        padding: 8px 12px;
        margin-right: 5px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
    }

    .btn:hover {
        background-color: #0056b3;
    }
</style>

<script>
    var ribbonObj;

    function onCreated(args) {
        ribbonObj = document.getElementById('ribbon').ej2_instances[0];
    }

    function selectTab(index) {
        ribbonObj.selectTab(index);
    }

    function minimizeRibbon() {
        ribbonObj.minimize();
    }

    function restoreRibbon() {
        ribbonObj.restore();
    }

    function hideHomeTab() {
        ribbonObj.hideTab('homeTab');
    }

    function showHomeTab() {
        ribbonObj.showTab('homeTab');
    }

    function onTabSelected(args) {
        console.log('Tab selected:', args.selectedIndex, '| Previous:', args.previousIndex);
        console.log('Is contextual:', args.isContextual);
    }

    function onTabSelecting(args) {
        console.log('Tab selecting:', args.selectedIndex);
        // args.cancel = true; // Prevent selection if needed
    }

    function onLayoutSwitched(args) {
        console.log('Layout switched to:', args.activeLayout); // 'Classic' or 'Simplified'
    }
</script>
```

## Best Practices

### 1. Property Configuration
- Set required properties on ribbon creation
- Use intuitive property names
- Match ASP.NET Core naming conventions

### 2. Method Timing
- Wait for `created` event before calling methods
- Use ribbon instance to access all methods
- Avoid calling methods before ribbon initialization

### 3. Performance
- Minimize dynamic property changes
- Use `refresh()` sparingly
- Cache ribbon instance reference

### 4. Error Handling
- Check ribbon instance exists before using methods
- Validate parameters before method calls
- Log errors for debugging

---
