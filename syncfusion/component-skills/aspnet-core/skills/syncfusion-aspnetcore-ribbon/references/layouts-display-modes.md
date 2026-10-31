# Layouts and Display Modes

## Table of Contents

- [Layout Types](#layout-types)
- [Classic Layout](#classic-layout)
- [Simplified Layout](#simplified-layout)
- [Layout Switching](#layout-switching)
- [Layout Switcher KeyTip](#layout-switcher-keytip)
- [Tab Animation](#tab-animation)
- [Display Options](#display-options)
- [Item Sizing](#item-sizing)
- [Minimized State](#minimized-state)
- [Responsive Example](#responsive-example)

## Layout Types

The Ribbon supports two main layouts for different use cases:

| Layout | Mode | Description | Use Case |
|--------|------|-------------|----------|
| **Classic** | Default | Multi-row, feature-rich | Desktop applications |
| **Simplified** | Compact | Single-row, icon-focused | Web applications, space-limited |

## Classic Layout

The default layout displays items in multiple rows, organized by size.

### Basic Classic Layout

```razor
<ejs-ribbon id="ribbon" activeLayout="Classic">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard" orientation=Row>
                    <!-- Items displayed in rows -->
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Classic Layout Features

- Multi-row display
- Large, Medium, and Small item sizes visible
- Maximum feature visibility
- Icons with text labels
- Best for desktop applications

## Simplified Layout

The simplified layout shows items in a single row, emphasizing compact display.

### Basic Simplified Layout

```razor
<ejs-ribbon id="ribbon" activeLayout="Simplified">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard" orientation=Row>
                    <!-- Items displayed in single row -->
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Simplified Layout Features

- Single-row display
- Icons without text (unless specified)
- Compact, minimal spacing
- Items show as small size
- Best for web applications

## Layout Switching

### Allow Layout Switching

By default, users can switch between layouts. To disable:

```razor
<!-- Allow switching (default) -->
<ejs-ribbon id="ribbon" hideLayoutSwitcher=false>
    <!-- Content -->
</ejs-ribbon>

<!-- Hide switcher, lock to one layout -->
<ejs-ribbon id="ribbon" hideLayoutSwitcher=true activeLayout="Simplified">
    <!-- Content -->
</ejs-ribbon>
```

### Programmatic Layout Switching

```razor
<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <!-- Ribbon content -->
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function switchToSimplified() {
        var ribbon = document.getElementById("ribbon").ej2_instances[0];
        ribbon.activeLayout = 'Simplified';
    }

    function switchToClassic() {
        var ribbon = document.getElementById("ribbon").ej2_instances[0];
        ribbon.activeLayout = 'Classic';
    }
</script>

<button onclick="switchToSimplified()">Use Simplified</button>
<button onclick="switchToClassic()">Use Classic</button>
```

## Layout Switcher KeyTip

Use `layoutSwitcherKeyTip` to assign a KeyTip character to the layout switcher button. This allows keyboard users to switch layouts without using the mouse when KeyTips are active.

```razor
<ejs-ribbon id="ribbon" enableKeyTips=true layoutSwitcherKeyTip="L">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

> Press `Alt` to activate KeyTips, then press `L` to toggle between Classic and Simplified layouts.

## Tab Animation

The `tabAnimation` property controls the slide animation when switching between ribbon tabs. It accepts a `object` with `next` and `previous` sub-properties.

### Default Animation

By default the ribbon uses a slide animation:

| Direction | Effect | Duration | Easing |
|-----------|--------|----------|--------|
| `next` (→) | `SlideRightIn` | 600 ms | ease |
| `previous` (←) | `SlideLeftIn` | 600 ms | ease |

### Customize Animation Speed

```razor
@{
    var tabAnim = new() {
        Next     = new() { Effect = "SlideRightIn", Duration = 300, Easing = "ease" },
        Previous = new() { Effect = "SlideLeftIn",  Duration = 300, Easing = "ease" }
    };
}

<ejs-ribbon id="ribbon" tabAnimation=tabAnim>
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <!-- Content -->
        </e-ribbon-tab>
        <e-ribbon-tab header="Insert">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Disable Animation

Set `Effect` to `"None"` on both directions to remove the transition:

```razor
@{
    var noAnim = new TabAnimationSettingsModel {
        Next     = new TabActionSettingsModel { Effect = "None" },
        Previous = new TabActionSettingsModel { Effect = "None" }
    };
}

<ejs-ribbon id="ribbon" tabAnimation=noAnim>
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home"><!-- Content --></e-ribbon-tab>
        <e-ribbon-tab header="Insert"><!-- Content --></e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>
```

### TabAnimationSettingsModel Properties

| Property | Type | Description |
|----------|------|-------------|
| `Next` | `TabActionSettingsModel` | Animation when moving to the next tab |
| `Previous` | `TabActionSettingsModel` | Animation when moving to the previous tab |

### TabActionSettingsModel Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Effect` | string | `"SlideRightIn"` / `"SlideLeftIn"` | Animation effect name (e.g., `"None"`, `"FadeIn"`) |
| `Duration` | int | `600` | Duration in milliseconds |
| `Easing` | string | `"ease"` | CSS easing function |

## Display Options

Control when items appear using `displayOptions`:

### Display in Both Layouts

```razor
<e-ribbon-item displayOptions=@(Syncfusion.EJ2.Ribbon.DisplayMode.Auto) type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

### Display Only in Classic

```razor
<e-ribbon-item displayOptions=@(Syncfusion.EJ2.Ribbon.DisplayMode.Classic) type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

### Display Only in Simplified

```razor
<e-ribbon-item displayOptions=@(Syncfusion.EJ2.Ribbon.DisplayMode.Simplified) type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

### Display Only in Overflow

```razor
<e-ribbon-item displayOptions=@(Syncfusion.EJ2.Ribbon.DisplayMode.Overflow) type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-edit" content="Edit"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

## Item Sizing

Item sizes change based on available space and layout.

### Allowed Sizes Configuration

```razor
<!-- Large: Icon + Text (Classic layout) -->
<e-ribbon-item type=Button allowedSizes=Large>
    <e-ribbon-buttonsettings iconCss="e-icons e-paste" content="Paste"></e-ribbon-buttonsettings>
</e-ribbon-item>

<!-- Medium: Small Icon + Text -->
<e-ribbon-item type=Button allowedSizes=Medium>
    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
</e-ribbon-item>

<!-- Small: Icon Only -->
<e-ribbon-item type=Button allowedSizes=Small>
    <e-ribbon-buttonsettings iconCss="e-icons e-bold"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

### Size Progression

When space is limited, items resize in this order:

```
Large (icon + text) → Medium (small icon + text) → Small (icon only)
```

When space becomes available, progression reverses:

```
Small (icon only) → Medium (small icon + text) → Large (icon + text)
```

## Minimized State

The ribbon can be minimized (collapsed) to show only tab headers.

### Start Minimized

```razor
<ejs-ribbon id="ribbon" isMinimized=true>
    <e-ribbon-tabs>
        <!-- Ribbon starts collapsed -->
    </e-ribbon-tabs>
</ejs-ribbon>
```

### Control Minimization

```razor
<ejs-ribbon id="ribbon">
    <e-ribbon-tabs>
        <!-- Ribbon content -->
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function toggleMinimized() {
        var ribbon = document.getElementById("ribbon").ej2_instances[0];
        ribbon.isMinimized = !ribbon.isMinimized;
    }
</script>

<button onclick="toggleMinimized()">Toggle Minimize</button>
```

### Double-Click to Minimize

Users can double-click the active tab to toggle minimize state.

## Responsive Example

Complete responsive ribbon with both layouts and sizing:

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Ribbon
@using Syncfusion.EJ2.Navigations

@{
    List<MenuItem> pasteOptions = new List<MenuItem>() { 
        new MenuItem { Text = "Keep Source Format" }, 
        new MenuItem { Text = "Merge format" } 
    };
    
    List<string> fontStyle = new List<string>() { "Arial", "Calibri", "Cambria", "Georgia" };
}

<ejs-ribbon id="ribbon" hideLayoutSwitcher=false>
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <!-- Clipboard Group: Non-collapsible -->
                <e-ribbon-group header="Clipboard" orientation=Row isCollapsible=false priority=1>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <!-- Large in classic, Small in simplified -->
                                <e-ribbon-item type=SplitButton allowedSizes=Large>
                                    <e-ribbon-splitbuttonsettings iconCss="e-icons e-paste" content="Paste" items=pasteOptions></e-ribbon-splitbuttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button allowedSizes=Large>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button allowedSizes=Large>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-copy" content="Copy"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>

                <!-- Font Group: Collapses when space is tight -->
                <e-ribbon-group header="Font" orientation=Row isCollapsible=true priority=2>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <!-- Large, Medium, Small allowed -->
                                <e-ribbon-item type=ComboBox allowedSizes=Large>
                                    <e-ribbon-comboboxsettings dataSource=fontStyle index=0 width="150px"></e-ribbon-comboboxsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button allowedSizes=Small>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-bold"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button allowedSizes=Small>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-italic"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>

                <!-- Paragraph Group: Collapses first (higher priority) -->
                <e-ribbon-group header="Paragraph" orientation=Row isCollapsible=true priority=3>
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button allowedSizes=Small>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-align-left"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                                <e-ribbon-item type=Button allowedSizes=Small>
                                    <e-ribbon-buttonsettings iconCss="e-icons e-align-center"></e-ribbon-buttonsettings>
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

### 1. Choose Appropriate Layout
- **Classic**: Desktop apps with full feature access needed
- **Simplified**: Web apps, mobile-friendly, space-limited interfaces

### 2. Set Appropriate Sizes
- **Large**: Main actions (Paste, Save)
- **Medium**: Secondary actions
- **Small**: Tertiary or icon-heavy actions

### 3. Use Priority for Collapsing
```razor
<!-- Most important: priority 1 (expand first, collapse last) -->
<e-ribbon-group priority=1 isCollapsible=false>

<!-- Secondary: priority 2 -->
<e-ribbon-group priority=2 isCollapsible=true>

<!-- Advanced: priority 3 (collapse first) -->
<e-ribbon-group priority=3 isCollapsible=true>
```

### 4. Test Responsiveness
- Resize browser to see layout changes
- Verify all items visible at different widths
- Test both layouts function correctly

### 5. Manage Layout Switcher
- Show switcher for user choice: `hideLayoutSwitcher=false`
- Hide for locked layout: `hideLayoutSwitcher=true`

---
