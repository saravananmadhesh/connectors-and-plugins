# Tabs and Groups Management

## Table of Contents

- [Tab Management](#tab-management)
- [Multi-Tab Setup](#multi-tab-setup)
- [Group Organization](#group-organization)
- [Collapsibility Control](#collapsibility-control)
- [Priority & Overflow](#priority--overflow)
- [Launcher Icons](#launcher-icons)
- [Complete Example](#complete-example)

## Tab Management

### Adding Tabs

```razor
<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home"></e-ribbon-tab>
        <e-ribbon-tab header="Insert"></e-ribbon-tab>
        <e-ribbon-tab header="Design"></e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Tab Properties

| Property | Type | Description |
|----------|------|-------------|
| `header` | string | Tab display name |
| `id` | string | Unique identifier |
| `keyTip` | string | Keyboard shortcut (e.g., "H" for Alt+H) |

### Tab with KeyTip

```razor
<e-ribbon-tab header="Home" keyTip="H" id="homeTab">
    <!-- Groups -->
</e-ribbon-tab>
```

## Multi-Tab Setup

### Three-Tab Ribbon (Home, Insert, View)

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    List<MenuItem> tableOptions = new List<MenuItem>() { 
        new MenuItem { Text = "Insert Table" }, 
        new MenuItem { Text = "Draw Table" } 
    };
}

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <!-- Home Tab -->
        <e-ribbon-tab header="Home" keyTip="H">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard">
                    <!-- Items -->
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>

        <!-- Insert Tab -->
        <e-ribbon-tab header="Insert" keyTip="I">
            <e-ribbon-groups>
                <e-ribbon-group header="Tables">
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

        <!-- View Tab -->
        <e-ribbon-tab header="View" keyTip="V">
            <e-ribbon-groups>
                <e-ribbon-group header="Views" orientation=Row>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-print-layout" content="Print Layout"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-web-layout" content="Web Layout"></e-ribbon-buttonsettings>
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

## Group Organization

### Single Group per Tab

```razor
<e-ribbon-tab header="Home">
    <e-ribbon-groups>
        <e-ribbon-group header="Clipboard">
            <!-- Items -->
        </e-ribbon-group>
    </e-ribbon-groups>
</e-ribbon-tab>
```

### Multiple Groups per Tab

```razor
<e-ribbon-tab header="Home">
    <e-ribbon-groups>
        <!-- Group 1 -->
        <e-ribbon-group header="Clipboard" orientation=Row>
            <!-- Items -->
        </e-ribbon-group>

        <!-- Group 2 -->
        <e-ribbon-group header="Font" orientation=Row>
            <!-- Items -->
        </e-ribbon-group>

        <!-- Group 3 -->
        <e-ribbon-group header="Paragraph">
            <!-- Items -->
        </e-ribbon-group>
    </e-ribbon-groups>
</e-ribbon-tab>
```

### Group Header with Icon

```razor
<e-ribbon-group 
    header="Clipboard" 
    groupIconCss="e-icons e-paste"
    showLauncherIcon=true>
    <!-- Items -->
</e-ribbon-group>
```

## Collapsibility Control

### Non-Collapsible Groups

Prevent group collapse when space is tight:

```razor
<e-ribbon-group header="Font" isCollapsible=false>
    <!-- Items - always visible -->
</e-ribbon-group>
```

### Collapsible Groups (Default)

Allow collapse:

```razor
<e-ribbon-group header="Clipboard" isCollapsible=true>
    <!-- Items - can collapse -->
</e-ribbon-group>
```

## Priority & Overflow

### Priority Setting

Control which groups collapse first when space is limited:

```razor
<!-- Collapses first (higher priority number) -->
<e-ribbon-group header="Advanced" priority=3>
    <!-- Items -->
</e-ribbon-group>

<!-- Collapses second -->
<e-ribbon-group header="Font" priority=2>
    <!-- Items -->
</e-ribbon-group>

<!-- Collapses last (lower priority = expand first) -->
<e-ribbon-group header="Clipboard" priority=1>
    <!-- Items -->
</e-ribbon-group>
```

### Group Overflow

Show overflow button for individual group:

```razor
<e-ribbon-group 
    header="Font" 
    enableGroupOverflow=true
    overflowHeader="More Font Options">
    <!-- Items overflow into popup -->
</e-ribbon-group>
```

### Complete Priority Example

```razor
@using Syncfusion.EJ2.Ribbon

<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <!-- High priority: Most important, expand first -->
                <e-ribbon-group header="Clipboard" priority=1 isCollapsible=false>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-paste" content="Paste"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>

                <!-- Medium priority -->
                <e-ribbon-group header="Font" priority=2 enableGroupOverflow=true>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button allowedSizes=Small>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-bold"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>

                <!-- Low priority: Collapses first -->
                <e-ribbon-group header="Advanced" priority=3>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-settings" content="Settings"></e-ribbon-buttonsettings>
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

## Launcher Icons

### Group Launcher Icon

Add launcher icon (typically opens a dialog):

```razor
<e-ribbon-group 
    header="Clipboard" 
    showLauncherIcon=true
    groupIconCss="e-icons e-paste">
    <!-- Items -->
</e-ribbon-group>
```

## Complete Example

Full multi-tab ribbon with various group configurations:

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
        <e-ribbon-tab header="Home" keyTip="H">
            <e-ribbon-groups>
                <!-- Clipboard Group: High priority, non-collapsible -->
                <e-ribbon-group 
                    header="Clipboard" 
                    keyTip="CD"
                    id="clipboard"
                    priority=1
                    isCollapsible=false
                    orientation=Row
                    groupIconCss="e-icons e-paste"
                    showLauncherIcon=true>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=SplitButton allowedSizes=Large keyTip="PA">
                                    <e-ribbon-splitbuttonsettings iconCss="e-icons e-paste" content="Paste" items=pasteOptions></e-ribbon-splitbuttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button keyTip="CT">
                                    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button keyTip="CO">
                                    <e-ribbon-buttonsettings iconCss="e-icons e-copy" content="Copy"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>

                <!-- Font Group: Medium priority, with overflow -->
                <e-ribbon-group 
                    header="Font"
                    keyTip="FT"
                    id="font"
                    priority=2
                    orientation=Row
                    enableGroupOverflow=true
                    isCollapsible=true
                    groupIconCss="e-icons e-bold">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=ComboBox keyTip="FF">
                                    <e-ribbon-comboboxsettings dataSource=fontStyle index=0 allowFiltering=true width="150px"></e-ribbon-comboboxsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button allowedSizes=Small keyTip="BD">
                                    <e-ribbon-buttonsettings iconCss="e-icons e-bold" isToggle=true></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>

                <!-- Paragraph Group: Lower priority -->
                <e-ribbon-group 
                    header="Paragraph"
                    keyTip="PG"
                    id="paragraph"
                    priority=3
                    orientation=Row>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button allowedSizes=Small>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-align-left"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>

        <!-- INSERT TAB -->
        <e-ribbon-tab header="Insert" keyTip="I">
            <e-ribbon-groups>
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

### 1. Organize Logically
- Group related items (Font, Clipboard, Paragraph)
- Use descriptive headers
- Keep group names short (1-2 words)

### 2. Set Priorities
- Mark essential groups with lower priority (stay expanded)
- Complex features get higher priority (collapse first)
- Use priority 1-3 for main vs. advanced

### 3. Use Collapsibility Wisely
- Keep frequently-used groups non-collapsible (`isCollapsible=false`)
- Allow advanced features to collapse

### 4. Enable KeyTips
- Add `keyTip` to tabs and groups for keyboard navigation
- Use single letter (H for Home, I for Insert)

---
