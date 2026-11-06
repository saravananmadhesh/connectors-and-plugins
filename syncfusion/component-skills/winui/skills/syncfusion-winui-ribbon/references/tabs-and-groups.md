# Tabs and Groups

## Table of Contents
- [Overview](#overview)
- [Creating Ribbon Tabs](#creating-ribbon-tabs)
- [Tab Selection](#tab-selection)
- [Selection Change Events](#selection-change-events)
- [Ribbon Groups](#ribbon-groups)
- [Contextual Tab Groups](#contextual-tab-groups)
- [Tab Appearance](#tab-appearance)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

Ribbon tabs and groups provide the hierarchical organization structure for your commands:
- **Tabs** categorize commands by high-level functionality (Home, Insert, View)
- **Groups** organize related commands within a tab (Clipboard, Font, Paragraph)
- **Contextual Tab Groups** appear conditionally based on user selection

**Hierarchy:** Ribbon → Tabs → Groups → Items

## Creating Ribbon Tabs

### Basic Tab Creation

Add tabs using the `Tabs` collection:

```xaml
<ribbon:SfRibbon x:Name="sfRibbon">
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home" />
        <ribbon:RibbonTab Header="Insert" />
        <ribbon:RibbonTab Header="View" />
        <ribbon:RibbonTab Header="Layout" />
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

### Programmatic Tab Creation

```csharp
SfRibbon ribbon = new SfRibbon();
RibbonTab homeTab = new RibbonTab { Header = "Home" };
RibbonTab insertTab = new RibbonTab { Header = "Insert" };
RibbonTab viewTab = new RibbonTab { Header = "View" };

ribbon.Tabs.Add(homeTab);
ribbon.Tabs.Add(insertTab);
ribbon.Tabs.Add(viewTab);
```

### Custom Tab Headers

Use complex content for tab headers:

```xaml
<ribbon:RibbonTab>
    <ribbon:RibbonTab.Header>
        <StackPanel Orientation="Horizontal" Spacing="5">
            <SymbolIcon Symbol="Home" />
            <TextBlock Text="Home" />
        </StackPanel>
    </ribbon:RibbonTab.Header>
</ribbon:RibbonTab>
```

## Tab Selection

### Setting Initial Selection

Use `SelectedIndex` to set which tab is initially selected (0-based):

```xaml
<ribbon:SfRibbon x:Name="sfRibbon" SelectedIndex="0">
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home" />     <!-- Index 0 -->
        <ribbon:RibbonTab Header="Insert" />   <!-- Index 1 -->
        <ribbon:RibbonTab Header="View" />     <!-- Index 2 -->
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

### Programmatic Selection

```csharp
// Select by index
sfRibbon.SelectedIndex = 1; // Select "Insert" tab

// Select by reference
sfRibbon.SelectedTab = insertTab;
```

### Binding Selected Tab

```xaml
<ribbon:SfRibbon x:Name="ribbon"
                 SelectedTab="{Binding ElementName=viewTab}">
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home" />
        <ribbon:RibbonTab Header="Insert" />
        <ribbon:RibbonTab x:Name="viewTab" Header="View" />
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

**Important:** `SelectedIndex` must not exceed tab count. Invalid index defaults to first tab.

## Selection Change Events

### SelectedTabChanged Event

Detect when users switch tabs:

```xaml
<ribbon:SfRibbon x:Name="ribbon"
                 SelectedTabChanged="OnRibbonTabChanged">
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home" />
        <ribbon:RibbonTab Header="Insert" />
        <ribbon:RibbonTab Header="View" />
    </ribbon:SfRibbon.Tabs>
</ribbon:SfRibbon>
```

```csharp
private void OnRibbonTabChanged(object sender, SelectionChangedEventArgs e)
{
    if (e.AddedItems.Count > 0 && e.AddedItems[0] is RibbonTab newTab)
    {
        System.Diagnostics.Debug.WriteLine($"Switched to: {newTab.Header}");
    }
    
    if (e.RemovedItems.Count > 0 && e.RemovedItems[0] is RibbonTab oldTab)
    {
        System.Diagnostics.Debug.WriteLine($"Left tab: {oldTab.Header}");
    }
}
```

**Use Cases:**
- Load tab-specific data when tab is selected
- Update application state based on active tab
- Track user navigation patterns
- Enable/disable features based on current tab

## Ribbon Groups

### Creating Groups

Groups organize commands within a tab:

```xaml
<ribbon:RibbonTab Header="Home">
    <ribbon:RibbonGroup Header="Clipboard" />
    <ribbon:RibbonGroup Header="Font" />
    <ribbon:RibbonGroup Header="Paragraph" />
    <ribbon:RibbonGroup Header="Editing" />
</ribbon:RibbonTab>
```

### Adding Items to Groups

```xaml
<ribbon:RibbonGroup Header="Clipboard">
    <ribbon:RibbonButton Content="Cut" Icon="Cut" AllowedSizeModes="Normal" />
    <ribbon:RibbonButton Content="Copy" Icon="Copy" AllowedSizeModes="Normal" />
    <ribbon:RibbonButton Content="Paste" Icon="Paste" AllowedSizeModes="Large" />
</ribbon:RibbonGroup>
```

### Programmatic Group Creation

```csharp
RibbonTab homeTab = new RibbonTab { Header = "Home" };
RibbonGroup clipboardGroup = new RibbonGroup { Header = "Clipboard" };
RibbonGroup fontGroup = new RibbonGroup { Header = "Font" };

homeTab.Items.Add(clipboardGroup);
homeTab.Items.Add(fontGroup);
```

## Contextual Tab Groups

Contextual tab groups appear only when their context is active (e.g., "Picture Format" appears when image is selected).

### Creating Contextual Tab Groups

```xaml
<ribbon:SfRibbon x:Name="sfRibbon">
    <!-- Regular Tabs -->
    <ribbon:SfRibbon.Tabs>
        <ribbon:RibbonTab Header="Home">
            <ribbon:RibbonGroup Header="Clipboard" />
        </ribbon:RibbonTab>
        <ribbon:RibbonTab Header="Insert" />
    </ribbon:SfRibbon.Tabs>
    
    <!-- Contextual Tab Groups -->
    <ribbon:SfRibbon.ContextualTabGroups>
        <ribbon:RibbonContextualTabGroup x:Name="ImageTools"
                                        Visibility="Collapsed"
                                        SelectFirstTabOnVisible="True"
                                        Background="LightBlue">
            <ribbon:RibbonContextualTabGroup.Tabs>
                <ribbon:RibbonTab Header="Picture Format">
                    <ribbon:RibbonGroup Header="Adjust">
                        <ribbon:RibbonButton Content="Brightness" />
                        <ribbon:RibbonButton Content="Contrast" />
                    </ribbon:RibbonGroup>
                </ribbon:RibbonTab>
            </ribbon:RibbonContextualTabGroup.Tabs>
        </ribbon:RibbonContextualTabGroup>
        
        <ribbon:RibbonContextualTabGroup x:Name="TableTools"
                                        Visibility="Collapsed"
                                        SelectFirstTabOnVisible="True"
                                        Background="LightGreen">
            <ribbon:RibbonContextualTabGroup.Tabs>
                <ribbon:RibbonTab Header="Table Design">
                    <ribbon:RibbonGroup Header="Styles">
                        <ribbon:RibbonButton Content="Header Row" />
                    </ribbon:RibbonGroup>
                </ribbon:RibbonTab>
                <ribbon:RibbonTab Header="Layout">
                    <ribbon:RibbonGroup Header="Rows & Columns">
                        <ribbon:RibbonButton Content="Insert Above" />
                        <ribbon:RibbonButton Content="Insert Below" />
                    </ribbon:RibbonGroup>
                </ribbon:RibbonTab>
            </ribbon:RibbonContextualTabGroup.Tabs>
        </ribbon:RibbonContextualTabGroup>
    </ribbon:SfRibbon.ContextualTabGroups>
</ribbon:SfRibbon>
```

### Showing/Hiding Contextual Groups

```csharp
// Show contextual tab when image is selected
private void OnImageSelected(object sender, RoutedEventArgs e)
{
    ImageTools.Visibility = Visibility.Visible;
    TableTools.Visibility = Visibility.Collapsed;
}

// Show contextual tab when table is selected
private void OnTableSelected(object sender, RoutedEventArgs e)
{
    ImageTools.Visibility = Visibility.Collapsed;
    TableTools.Visibility = Visibility.Visible;
}

// Hide all contextual tabs when selection is cleared
private void OnSelectionCleared(object sender, RoutedEventArgs e)
{
    ImageTools.Visibility = Visibility.Collapsed;
    TableTools.Visibility = Visibility.Collapsed;
}
```

### SelectFirstTabOnVisible Property

When `SelectFirstTabOnVisible="True"`, the first tab in the contextual group is automatically selected when the group becomes visible:

```xaml
<ribbon:RibbonContextualTabGroup x:Name="ChartTools"
                                SelectFirstTabOnVisible="True">
    <ribbon:RibbonContextualTabGroup.Tabs>
        <ribbon:RibbonTab Header="Chart Design" />  <!-- Auto-selected -->
        <ribbon:RibbonTab Header="Format" />
    </ribbon:RibbonContextualTabGroup.Tabs>
</ribbon:RibbonContextualTabGroup>
```

Set to `False` if you want to keep the current tab selected:

```xaml
<ribbon:RibbonContextualTabGroup x:Name="DrawingTools"
                                SelectFirstTabOnVisible="False">
    <!-- User stays on current tab when this appears -->
</ribbon:RibbonContextualTabGroup>
```

## Tab Appearance

### Background Color

Apply background color to contextual tab groups:

```xaml
<ribbon:RibbonContextualTabGroup x:Name="ImageTools"
                                Background="LightBlue">
    <ribbon:RibbonContextualTabGroup.Tabs>
        <ribbon:RibbonTab Header="Picture Format" />
    </ribbon:RibbonContextualTabGroup.Tabs>
</ribbon:RibbonContextualTabGroup>
```

The background color is reflected across all tabs in the group.

### Foreground Color

Apply foreground color to tab group text:

```xaml
<ribbon:RibbonContextualTabGroup x:Name="ChartTools"
                                Foreground="#950245"
                                Background="LightPink">
    <ribbon:RibbonContextualTabGroup.Tabs>
        <ribbon:RibbonTab Header="Chart Design" />
    </ribbon:RibbonContextualTabGroup.Tabs>
</ribbon:RibbonContextualTabGroup>
```

## Best Practices

### Tab Organization

**Do:**
- Use 3-7 tabs for optimal usability
- Name tabs with single words or short phrases (Home, Insert, View)
- Order tabs by frequency of use (most used first)
- Group related functionality together

**Don't:**
- Create too many tabs (users get overwhelmed)
- Use technical jargon in tab names
- Mix user actions with system settings in same tab

### Group Organization

**Do:**
- Use 3-6 groups per tab
- Name groups clearly (Clipboard, Font, Paragraph)
- Group by task or object type
- Place most-used groups on the left

**Don't:**
- Create single-item groups (combine into related group)
- Use overly long group names
- Create too many groups (causes cramping)

### Contextual Tab Guidelines

**Do:**
- Use distinct background colors for different contexts
- Hide contextual tabs when context is deselected
- Set `SelectFirstTabOnVisible="True"` for better UX
- Provide visual feedback for active context

**Don't:**
- Show multiple conflicting contextual groups simultaneously
- Forget to hide contextual tabs when no longer relevant
- Use colors that clash with your application theme

## Troubleshooting

### Tabs Not Appearing

**Problem:** Ribbon is empty or tabs not visible

**Solution:**
```csharp
// Verify tabs are added to Tabs collection, not ContextualTabGroups
ribbon.Tabs.Add(homeTab);  // Correct
// Not: ribbon.ContextualTabGroups.Add(...) for regular tabs
```

### SelectedIndex Out of Range

**Problem:** ArgumentOutOfRangeException when setting SelectedIndex

**Solution:**
```csharp
// Always check bounds
if (ribbon.Tabs.Count > 2)
{
    ribbon.SelectedIndex = 2;
}

// Or use safe setter
int desiredIndex = 5;
ribbon.SelectedIndex = Math.Min(desiredIndex, ribbon.Tabs.Count - 1);
```

### Contextual Tabs Not Showing

**Problem:** Contextual tab group set to Visible but not appearing

**Solution:**
```csharp
// Ensure you're setting Visibility, not IsVisible
ImageTools.Visibility = Visibility.Visible;  // Correct
// Not: ImageTools.IsVisible = true;

// Check that tabs exist in the group
if (ImageTools.Tabs.Count > 0)
{
    ImageTools.Visibility = Visibility.Visible;
}
```

### SelectFirstTabOnVisible Not Working

**Problem:** First tab not auto-selected when contextual group appears

**Solution:**
```xaml
<!-- Ensure property is set BEFORE making visible -->
<ribbon:RibbonContextualTabGroup x:Name="Tools"
                                SelectFirstTabOnVisible="True"
                                Visibility="Collapsed">
    <!-- Must have at least one tab -->
    <ribbon:RibbonContextualTabGroup.Tabs>
        <ribbon:RibbonTab Header="Format" />
    </ribbon:RibbonContextualTabGroup.Tabs>
</ribbon:RibbonContextualTabGroup>
```

### Group Items Overlapping

**Problem:** Items in ribbon group overlap or render incorrectly

**Solution:**
- Ensure proper `AllowedSizeModes` on items
- Don't add too many items to one group (split into multiple groups)
- Test with different window sizes
- Use simplified layout for narrow windows (see [simplified-layout.md](simplified-layout.md))

## Related Topics

- **Ribbon Items** - Add buttons and controls to groups → [ribbon-items.md](ribbon-items.md)
- **Simplified Layout** - Responsive ribbon for small windows → [simplified-layout.md](simplified-layout.md)
- **UI Customization** - Theme and style tabs/groups → [ui-customization.md](ui-customization.md)
