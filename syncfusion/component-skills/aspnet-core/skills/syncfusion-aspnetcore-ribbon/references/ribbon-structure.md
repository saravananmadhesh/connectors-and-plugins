# Ribbon Structure & Hierarchy

## Table of Contents

- [Component Hierarchy](#component-hierarchy)
- [Adding Tabs](#adding-tabs)
- [Adding Groups](#adding-groups)
- [Adding Collections](#adding-collections)
- [Adding Items](#adding-items)
- [Complete Multi-Level Example](#complete-multi-level-example)
- [Best Practices](#best-practices)

## Component Hierarchy

The Ribbon component follows a strict hierarchical structure:

```
<ejs-ribbon>                                    ← Main Ribbon Component
├── <e-ribbon-tabs>                            ← Tabs Container
│   └── <e-ribbon-tab header="Home">           ← Individual Tab
│       └── <e-ribbon-groups>                  ← Groups Container
│           └── <e-ribbon-group header="...">  ← Individual Group
│               └── <e-ribbon-collections>    ← Collections Container
│                   └── <e-ribbon-collection>  ← Individual Collection
│                       └── <e-ribbon-items>   ← Items Container
│                           └── <e-ribbon-item> ← Individual Item
```

**Key Points:**
- Ribbon contains multiple tabs
- Each tab contains multiple groups
- Each group contains multiple collections
- Each collection contains multiple items
- Items are the actual ribbon controls (buttons, dropdowns, etc.)

## Adding Tabs

Tabs organize commands into logical categories (Home, Insert, View, etc.).

### Syntax

```razor
<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Tab Name">
            <!-- Groups go here -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Simple Example

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home"></e-ribbon-tab>
        <e-ribbon-tab header="Insert"></e-ribbon-tab>
        <e-ribbon-tab header="Design"></e-ribbon-tab>
        <e-ribbon-tab header="View"></e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Tab Properties

| Property | Type | Description |
|----------|------|-------------|
| `header` | string | Tab label displayed in ribbon |
| `id` | string | Unique identifier (optional) |
| `keyTip` | string | Keyboard shortcut for Alt+key (optional) |

## Adding Groups

Groups organize related items within a tab.

### Syntax

```razor
<e-ribbon-tab header="Home">
    <e-ribbon-groups>
        <e-ribbon-group header="Group Name">
            <!-- Collections go here -->
        </e-ribbon-group>
    </e-ribbon-groups>
</e-ribbon-tab>
```

### Simple Example

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard"></e-ribbon-group>
                <e-ribbon-group header="Font"></e-ribbon-group>
                <e-ribbon-group header="Paragraph"></e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Group Properties

| Property | Type | Description |
|----------|------|-------------|
| `header` | string | Group label |
| `id` | string | Unique identifier |
| `orientation` | enum | `Row` or `Column` (default) |
| `isCollapsible` | bool | Can collapse (default: true) |
| `priority` | int | Higher = collapse first |
| `enableGroupOverflow` | bool | Show overflow popup |
| `showLauncherIcon` | bool | Show launcher icon |
| `groupIconCss` | string | Icon class for group header |
| `keyTip` | string | Keyboard shortcut |

## Adding Collections

Collections group related items in a group (typically visually separated).

### Syntax

```razor
<e-ribbon-group header="Clipboard">
    <e-ribbon-collections>
        <e-ribbon-collection>
            <!-- Items go here -->
        </e-ribbon-collection>
    </e-ribbon-collections>
</e-ribbon-group>
```

### Example with Multiple Collections

```razor
<e-ribbon-group header="Clipboard" orientation=Row>
    <e-ribbon-collections>
        <!-- Collection 1 -->
        <e-ribbon-collection>
            <e-ribbon-items>
                <e-ribbon-item type=Button>
                    <e-ribbon-buttonsettings iconCss="e-icons e-paste" content="Paste"></e-ribbon-buttonsettings>
                </e-ribbon-item>
            </e-ribbon-items>
        </e-ribbon-collection>
        
        <!-- Collection 2 (visually separated) -->
        <e-ribbon-collection>
            <e-ribbon-items>
                <e-ribbon-item type=Button>
                    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
                </e-ribbon-item>
                <e-ribbon-item type=Button>
                    <e-ribbon-buttonsettings iconCss="e-icons e-copy" content="Copy"></e-ribbon-buttonsettings>
                </e-ribbon-item>
            </e-ribbon-items>
        </e-ribbon-collection>
    </e-ribbon-collections>
</e-ribbon-group>
```

## Adding Items

Items are the actual ribbon controls (buttons, comboboxes, etc.).

### Syntax

```razor
<e-ribbon-collection>
    <e-ribbon-items>
        <e-ribbon-item type=Button>
            <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
        </e-ribbon-item>
    </e-ribbon-items>
</e-ribbon-collection>
```

### Item Types

```razor
<!-- Button -->
<e-ribbon-item type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
</e-ribbon-item>

<!-- CheckBox -->
<e-ribbon-item type=CheckBox>
    <e-ribbon-checkboxsettings label="Ruler" checked=true></e-ribbon-checkboxsettings>
</e-ribbon-item>

<!-- DropDown -->
<e-ribbon-item type=DropDown>
    <e-ribbon-dropdownsettings iconCss="e-icons e-table" content="Table" items=tableOptions></e-ribbon-dropdownsettings>
</e-ribbon-item>

<!-- SplitButton -->
<e-ribbon-item type=SplitButton>
    <e-ribbon-splitbuttonsettings iconCss="e-icons e-paste" content="Paste" items=pasteOptions></e-ribbon-splitbuttonsettings>
</e-ribbon-item>

<!-- ComboBox -->
<e-ribbon-item type=ComboBox>
    <e-ribbon-comboboxsettings dataSource=fontList index=0></e-ribbon-comboboxsettings>
</e-ribbon-item>

<!-- ColorPicker -->
<e-ribbon-item type=ColorPicker>
    <e-ribbon-colorpickersettings value="#123456"></e-ribbon-colorpickersettings>
</e-ribbon-item>

<!-- GroupButton -->
<e-ribbon-item type=GroupButton>
    <e-ribbon-groupbuttonsettings items=buttonItems></e-ribbon-groupbuttonsettings>
</e-ribbon-item>

<!-- Template (custom HTML) -->
<e-ribbon-item type=Template itemTemplate='<span>Custom Content</span>'>
</e-ribbon-item>
```

### Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | enum | Item type (Button, CheckBox, etc.) |
| `disabled` | bool | Disable interaction |
| `allowedSizes` | enum | Large, Medium, Small |
| `displayOptions` | enum | Auto, Classic, Simplified, Overflow |
| `keyTip` | string | Keyboard shortcut |
| `ribbonTooltipSettings` | object | Tooltip configuration |

## Complete Multi-Level Example

Full example showing tabs, groups, collections, and items:

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    List<MenuItem> pasteOptions = new List<MenuItem>() { 
        new MenuItem { Text = "Keep Source Format" }, 
        new MenuItem { Text = "Merge format" } 
    };
    
    List<MenuItem> tableOptions = new List<MenuItem>() { 
        new MenuItem { Text = "Insert Table" }, 
        new MenuItem { Text = "Draw Table" } 
    };
    
    List<string> fontStyle = new List<string>() { "Arial", "Calibri", "Cambria", "Georgia" };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <!-- HOME TAB -->
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <!-- Clipboard Group -->
                <e-ribbon-group header="Clipboard" orientation=Row groupIconCss="e-icons e-paste">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=SplitButton allowedSizes=Large>
                                    <e-ribbon-splitbuttonsettings iconCss="e-icons e-paste" content="Paste" items=pasteOptions></e-ribbon-splitbuttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-copy" content="Copy"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-format-painter" content="Format Painter"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>

                <!-- Font Group -->
                <e-ribbon-group header="Font" orientation=Row enableGroupOverflow=true isCollapsible=false groupIconCss="e-icons e-bold">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=ComboBox>
                                    <e-ribbon-comboboxsettings dataSource=fontStyle index=0 allowFiltering=true width="150px"></e-ribbon-comboboxsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=ColorPicker allowedSizes=Small>
                                    <e-ribbon-colorpickersettings value="#123456"></e-ribbon-colorpickersettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button allowedSizes=Small>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-bold" isToggle=true></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>

        <!-- INSERT TAB -->
        <e-ribbon-tab header="Insert">
            <e-ribbon-groups>
                <!-- Tables Group -->
                <e-ribbon-group header="Tables" isCollapsible=false>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=DropDown allowedSizes=Large>
                                    <e-ribbon-dropdownsettings iconCss="e-icons e-table" content="Table" items=tableOptions></e-ribbon-dropdownsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

## Best Practices

### 1. Use Consistent Hierarchy
Always use the complete structure: Ribbon → Tabs → Groups → Collections → Items

### 2. Multiple Collections for Visual Separation
Use multiple collections in a group to create visual separators:
```razor
<e-ribbon-group>
    <e-ribbon-collections>
        <e-ribbon-collection><!-- Group 1 --></e-ribbon-collection>
        <e-ribbon-collection><!-- Visually separated from Group 1 --></e-ribbon-collection>
    </e-ribbon-collections>
</e-ribbon-group>
```

### 3. Set Orientation on Groups
```razor
<e-ribbon-group orientation=Row>  <!-- Items horizontal -->
<e-ribbon-group orientation=Column>  <!-- Items vertical (default) -->
```

### 4. Use Meaningful Tab Names
Keep tab headers concise (Home, Insert, Design, View, etc.) for clarity

### 5. Group Related Items
Put logically related items in the same group:
- Clipboard group: Cut, Copy, Paste
- Font group: Font name, font size, bold, italic
- Paragraph group: Alignment, indent, spacing

### 6. Set ID for Reference
```razor
<e-ribbon-group id="clipboard" header="Clipboard">
    <!-- Can reference programmatically -->
</e-ribbon-group>
```

---
