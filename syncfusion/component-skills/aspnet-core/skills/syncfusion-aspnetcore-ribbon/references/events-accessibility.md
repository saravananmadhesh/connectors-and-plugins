# Events and Accessibility

## Table of Contents

- [Ribbon Events](#ribbon-events)
- [KeyTips Configuration](#keytips-configuration)
- [Accessibility Features](#accessibility-features)
- [Keyboard Navigation](#keyboard-navigation)
- [WCAG Compliance](#wcag-compliance)
- [Complete Example](#complete-example)

> **Note:** In ASP.NET Core Tag Helpers, advanced Ribbon features such as File Menu, Backstage, Gallery, ColorPicker, Contextual Tabs, and KeyTips are available through the standard `Syncfusion.EJ2.AspNet.Core` NuGet package. These features do not require separate module injection — they are enabled by using the corresponding tag helpers and properties.

## Ribbon Events

### Tab Selected Event

Triggered after tab selection. Use `args.selectedIndex` for the newly selected tab and `args.previousIndex` for the previously selected tab. `args.isContextual` indicates whether a contextual tab was selected.

```razor
<ejs-ribbon id="ribbon" tabSelected="onTabSelected">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
        <e-ribbon-tab header="Insert">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function onTabSelected(args) {
        console.log('Selected tab index:', args.selectedIndex);
        console.log('Previously selected tab:', args.previousIndex);
        console.log('Is contextual tab:', args.isContextual);
    }
</script>
```

### Tab Selecting Event

Triggered before tab selection. Set `args.cancel = true` to prevent the tab switch. `args.isInteracted` distinguishes user-initiated changes from programmatic ones.

```razor
<ejs-ribbon id="ribbon" tabSelecting="onTabSelecting">
    <!-- Content -->
</ejs-ribbon>

<script>
    function onTabSelecting(args) {
        console.log('About to select tab index:', args.selectedIndex);
        console.log('Previously selected tab:', args.previousIndex);
        console.log('Is contextual tab:', args.isContextual);
        console.log('User triggered:', args.isInteracted);

        // Prevent selection of a specific tab
        if (args.selectedIndex === 2) {
            args.cancel = true;
        }
    }
</script>
```

### Item Click Event

Triggered when ribbon item is clicked:

```razor
<ejs-ribbon id="ribbon" itemClick="onItemClick">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button id="cutBtn">
                                    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function onItemClick(args) {
        console.log('Clicked item:', args.item);
        console.log('Item ID:', args.item.id);
    }
</script>
```

### Created Event

Triggered after ribbon initialization:

```razor
<ejs-ribbon id="ribbon" created="onCreated">
    <!-- Content -->
</ejs-ribbon>

<script>
    function onCreated(args) {
        console.log('Ribbon created and ready');
    }
</script>
```

### Ribbon Collapsing / Expanding Events

Triggered before the ribbon collapses or expands. Set `args.cancel = true` to prevent the state change.

```razor
<ejs-ribbon id="ribbon" ribbonCollapsing="onRibbonCollapsing" ribbonExpanding="onRibbonExpanding">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function onRibbonCollapsing(args) {
        // Prevent collapse if needed
        // args.cancel = true;
        console.log('Ribbon is collapsing');
    }

    function onRibbonExpanding(args) {
        // Prevent expand if needed
        // args.cancel = true;
        console.log('Ribbon is expanding');
    }
</script>
```

### Ribbon Layout Switched Event

Triggered after the user switches between Classic and Simplified layouts. Use `args.activeLayout` to determine the new layout.

```razor
<ejs-ribbon id="ribbon" ribbonLayoutSwitched="onLayoutSwitched">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function onLayoutSwitched(args) {
        console.log('Layout switched to:', args.activeLayout); // 'Classic' or 'Simplified'
        console.log('Native event:', args.event);
    }
</script>
```

### Launcher Icon Click Event

Triggered when a group's launcher icon is clicked. Use `args.groupId` to identify which group's launcher was clicked.

```razor
<ejs-ribbon id="ribbon" launcherIconClick="onLauncherIconClick">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Font" id="fontGroup" showLauncherIcon=true>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-bold" content="Bold"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function onLauncherIconClick(args) {
        console.log('Launcher clicked for group:', args.groupId);
        // Open a dialog or pane related to this group
    }
</script>
```

### Overflow Popup Open / Close Events

Triggered when an overflow popup opens or closes. Use `args.element` to access the popup element. Set `args.cancel = true` to prevent the open/close action.

```razor
<ejs-ribbon id="ribbon" overflowPopupOpen="onOverflowOpen" overflowPopupClose="onOverflowClose">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Font" enableGroupOverflow=true>
                    <!-- Items -->
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function onOverflowOpen(args) {
        console.log('Overflow popup opened');
        console.log('Popup element:', args.element);
        // args.cancel = true; // Prevent open
    }

    function onOverflowClose(args) {
        console.log('Overflow popup closed');
        // args.cancel = true; // Prevent close
    }
</script>
```

### Available Events

| Event | When Triggered | Key Args |
|-------|----------------|----------|
| `created` | Initialization complete | — |
| `tabSelected` | After tab selection | `selectedIndex`, `previousIndex`, `isContextual` |
| `tabSelecting` | Before tab selection | `selectedIndex`, `previousIndex`, `isContextual`, `isInteracted`, `cancel` |
| `ribbonCollapsing` | Before ribbon collapses | `cancel` |
| `ribbonExpanding` | Before ribbon expands | `cancel` |
| `ribbonLayoutSwitched` | After layout switch | `activeLayout`, `event` |
| `launcherIconClick` | Launcher icon clicked | `groupId` |
| `overflowPopupOpen` | Overflow popup opens | `element`, `event`, `cancel` |
| `overflowPopupClose` | Overflow popup closes | `element`, `event`, `cancel` |

## KeyTips Configuration

KeyTips enable keyboard navigation using Alt+key shortcuts.

### Enable KeyTips

```razor
<ejs-ribbon id="ribbon" enableKeyTips=true created="ribbonCreated">
    <!-- Content -->
</ejs-ribbon>

<script>
    function ribbonCreated(args) {
        console.log('KeyTips enabled. Press Alt+Windows/Command to activate');
    }
</script>
```

### Add KeyTips to Tabs

```razor
<e-ribbon-tab header="Home" keyTip="H">
    <!-- Content -->
</e-ribbon-tab>

<e-ribbon-tab header="Insert" keyTip="I">
    <!-- Content -->
</e-ribbon-tab>
```

### Add KeyTips to Groups

```razor
<e-ribbon-group header="Clipboard" keyTip="CD" id="clipboard">
    <!-- Content -->
</e-ribbon-group>
```

### Add KeyTips to Items

```razor
<e-ribbon-item type=Button keyTip="C">
    <e-ribbon-buttonsettings iconCss="e-icons e-copy" content="Copy"></e-ribbon-buttonsettings>
</e-ribbon-item>

<e-ribbon-item type=Button keyTip="X">
    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

## Accessibility Features

### ARIA Attributes

```razor
<ejs-ribbon id="ribbon" role="toolbar" ariaLabel="Document Ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home" ariaLabel="Home Tab">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard" ariaLabel="Clipboard Group">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button ariaLabel="Copy selected content (Ctrl+C)">
                                    <e-ribbon-buttonsettings iconCss="e-icons e-copy" content="Copy"></e-ribbon-buttonsettings>
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

### Tooltip with Keyboard Shortcut

```razor
@{
    var copyTooltip = new RibbonTooltipSettings { 
        Title = "Copy", 
        Content = "Copy selected content. Keyboard: Ctrl+C" 
    };
}

<e-ribbon-item type=Button ribbonTooltipSettings=copyTooltip>
    <e-ribbon-buttonsettings iconCss="e-icons e-copy" content="Copy"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

## Keyboard Navigation

| Key Combination | Action |
|-----------------|--------|
| `Alt + Windows/Cmd` | Show/hide KeyTips |
| `Tab` | Navigate between items |
| `Enter/Space` | Activate button |
| `Arrow Keys` | Navigate menu items |
| `Esc` | Close dropdown/menu |

## RTL Support

Enable right-to-left layout:

```razor
<ejs-ribbon id="ribbon" enableRtl=true>
    <!-- Content automatically flipped for RTL -->
</ejs-ribbon>
```

## WCAG Compliance

### Complete Accessible Ribbon

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    List<MenuItem> pasteOptions = new List<MenuItem>() { 
        new MenuItem { Text = "Keep Source Format" }, 
        new MenuItem { Text = "Merge format" } 
    };
}

<ejs-ribbon id="ribbon" 
    enableKeyTips=true 
    role="toolbar" 
    ariaLabel="Document Editor Ribbon"
    tabSelected="onTabSelected"
    tabSelecting="onTabSelecting"
    created="onCreated">
    
    <e-ribbon-tabs>
        <!-- Home Tab -->
        <e-ribbon-tab header="Home" keyTip="H" ariaLabel="Home tab. Contains basic editing commands.">
            <e-ribbon-groups>
                <!-- Clipboard Group -->
                <e-ribbon-group 
                    header="Clipboard" 
                    keyTip="CD"
                    id="clipboard"
                    ariaLabel="Clipboard group. Contains cut, copy, and paste commands."
                    groupIconCss="e-icons e-paste"
                    showLauncherIcon=true>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=SplitButton keyTip="PA" 
                                    ariaLabel="Paste. Pastes content from clipboard. Use Alt+H then Alt+PA for keyboard access.">
                                    <e-ribbon-splitbuttonsettings 
                                        iconCss="e-icons e-paste" 
                                        content="Paste" 
                                        items=pasteOptions>
                                    </e-ribbon-splitbuttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button keyTip="CT" 
                                    ariaLabel="Cut. Cuts selected content.">
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-cut" 
                                        content="Cut">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button keyTip="CO" 
                                    ariaLabel="Copy. Copies selected content.">
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-copy" 
                                        content="Copy">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button keyTip="FP" 
                                    ariaLabel="Format Painter. Copies formatting to other content.">
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-format-painter" 
                                        content="Format Painter">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>

                <!-- Font Group -->
                <e-ribbon-group 
                    header="Font" 
                    keyTip="FT"
                    ariaLabel="Font group. Contains text formatting options."
                    groupIconCss="e-icons e-bold">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button keyTip="BD" allowedSizes=Small 
                                    ariaLabel="Bold. Makes text bold. Keyboard: Ctrl+B">
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-bold" 
                                        isToggle=true>
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button keyTip="IT" allowedSizes=Small 
                                    ariaLabel="Italic. Makes text italic. Keyboard: Ctrl+I">
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-italic" 
                                        isToggle=true>
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button keyTip="UL" allowedSizes=Small 
                                    ariaLabel="Underline. Underlines text. Keyboard: Ctrl+U">
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-underline" 
                                        isToggle=true>
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>

        <!-- Insert Tab -->
        <e-ribbon-tab header="Insert" keyTip="I" ariaLabel="Insert tab. Contains commands for inserting objects.">
            <e-ribbon-groups>
                <e-ribbon-group header="Insert Objects" ariaLabel="Insert objects group.">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button keyTip="I1" 
                                    ariaLabel="Insert Image">
                                    <e-ribbon-buttonsettings 
                                        iconCss="e-icons e-image" 
                                        content="Image">
                                    </e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button keyTip="I2" 
                                    ariaLabel="Insert Table">
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

<script>
    function onTabSelected(args) {
        // Announce tab change to screen readers
        console.log('Tab selected:', args.selectedIndex, '| Previous:', args.previousIndex);
        console.log('Is contextual tab:', args.isContextual);
    }

    function onTabSelecting(args) {
        console.log('Tab selecting:', args.selectedIndex);
        // args.cancel = true; // Prevent selection if needed
    }

    function onCreated(args) {
        console.log('Ribbon created. Press Alt to enable KeyTips');
    }
</script>
```

## Best Practices

### 1. Always Include Labels
- Use `ariaLabel` on tabs, groups, and items
- Include keyboard shortcuts in labels

### 2. Enable KeyTips
- Set `enableKeyTips=true` for keyboard navigation
- Provide single-letter KeyTips

### 3. Use Semantic HTML
- Use `role="toolbar"` on ribbon
- Include descriptive `ariaLabel` attributes

### 4. Provide Tooltips
- Include keyboard shortcuts in tooltips
- Make tooltip content descriptive

### 5. Test Accessibility
- Test with screen readers (NVDA, JAWS)
- Test keyboard-only navigation
- Verify color contrast ratios (WCAG AA minimum)

---
