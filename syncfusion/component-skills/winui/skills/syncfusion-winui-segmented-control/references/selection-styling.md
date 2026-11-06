# Selection Styling, Animations, and Keyboard Navigation

## Table of Contents
- [Selection Style Customization](#selection-style-customization)
- [Shadow Effects](#shadow-effects)
- [Selection Animations](#selection-animations)
- [Keyboard Navigation](#keyboard-navigation)
- [Best Practices](#best-practices)

> **See also:** [selection.md](selection.md) for SelectedIndex, SelectedItem, SelectionChanged Event, and Programmatic Selection.

## Selection Style Customization

Customize the appearance of the selected segment using the `SelectedSegmentStyle` property with `SelectedSegmentBorder` as the target type.

### Custom Background Color

```xaml
<Grid.Resources>
    <Style TargetType="syncfusion:SelectedSegmentBorder" x:Key="customSelectionStyle">
        <Setter Property="Background" Value="#6C58EA"/>
    </Style>
</Grid.Resources>

<syncfusion:SfSegmentedControl 
    SelectedIndex="1"
    SelectedSegmentStyle="{StaticResource customSelectionStyle}">
    <x:String>Option 1</x:String>
    <x:String>Option 2</x:String>
    <x:String>Option 3</x:String>
</syncfusion:SfSegmentedControl>
```

### Multiple Properties

```xaml
<Style TargetType="syncfusion:SelectedSegmentBorder" x:Key="advancedSelectionStyle">
    <Setter Property="Background" Value="#00B7C0"/>
    <Setter Property="CornerRadius" Value="8"/>
    <Setter Property="BorderThickness" Value="2"/>
    <Setter Property="BorderBrush" Value="#008B94"/>
</Style>
```

### Theme-Aware Selection Style

```xaml
<Grid.Resources>
    <ResourceDictionary>
        <ResourceDictionary.ThemeDictionaries>
            <ResourceDictionary x:Key="Light">
                <SolidColorBrush x:Key="SelectionBackground" Color="#6C58EA"/>
            </ResourceDictionary>
            <ResourceDictionary x:Key="Dark">
                <SolidColorBrush x:Key="SelectionBackground" Color="#9B8AFF"/>
            </ResourceDictionary>
        </ResourceDictionary.ThemeDictionaries>

        <Style TargetType="syncfusion:SelectedSegmentBorder" x:Key="themeAwareStyle">
            <Setter Property="Background" Value="{ThemeResource SelectionBackground}"/>
        </Style>
    </ResourceDictionary>
</Grid.Resources>
```

## Shadow Effects

Add depth to selected segments with shadow effects.

### Enabling Shadow

```xaml
<Style TargetType="syncfusion:SelectedSegmentBorder" x:Key="shadowStyle">
    <Setter Property="Background" Value="#00B7C0"/>
    <Setter Property="HasShadow" Value="True"/>
    <Setter Property="ShadowColor" Value="#00B7C0"/>
    <Setter Property="CornerRadius" Value="4"/>
</Style>

<syncfusion:SfSegmentedControl 
    SelectedIndex="1"
    CornerRadius="4"
    SelectedSegmentStyle="{StaticResource shadowStyle}">
    <x:String>Small</x:String>
    <x:String>Medium</x:String>
    <x:String>Large</x:String>
</syncfusion:SfSegmentedControl>
```

### Custom Shadow Color

```xaml
<Style TargetType="syncfusion:SelectedSegmentBorder" x:Key="purpleShadowStyle">
    <Setter Property="Background" Value="#9B59B6"/>
    <Setter Property="HasShadow" Value="True"/>
    <Setter Property="ShadowColor" Value="#8E44AD"/>
    <Setter Property="CornerRadius" Value="6"/>
</Style>
```

### Complete Shadow Example with Item Styling

```xaml
<syncfusion:SfSegmentedControl 
    Height="40"
    SelectedIndex="1"
    CornerRadius="4"
    BorderThickness="2"
    ItemBorderThickness="0"
    DisplayMemberPath="Name"
    ItemsSource="{Binding Models}"
    SelectedSegmentStyle="{StaticResource shadowStyle}">

    <syncfusion:SfSegmentedControl.ItemContainerStyle>
        <Style TargetType="syncfusion:SfSegmentedItem">
            <Setter Property="Margin" Value="3"/>
            <Setter Property="CornerRadius" Value="4"/>
        </Style>
    </syncfusion:SfSegmentedControl.ItemContainerStyle>

    <syncfusion:SfSegmentedControl.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="SyncfusionSegmentedControlBackground" Color="#F2F2F2"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemBackground" Color="#F2F2F2"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedBackground" Color="#00B7C0"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemHoverBackground" Color="#5BDAE4"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemSelectedForeground" Color="White"/>
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
        </ResourceDictionary>
    </syncfusion:SfSegmentedControl.Resources>
</syncfusion:SfSegmentedControl>
```

## Selection Animations

The Segmented Control supports slide animation for smooth selection transitions.

### SelectionAnimationType Enum

- **Slide** (default): Smooth sliding animation to selected segment
- **None**: Instant selection without animation

### Slide Animation (Default)

```xaml
<syncfusion:SfSegmentedControl 
    SelectedIndex="0"
    SelectionAnimationType="Slide">
    <x:String>Tab 1</x:String>
    <x:String>Tab 2</x:String>
    <x:String>Tab 3</x:String>
</syncfusion:SfSegmentedControl>
```

**When to use:** Default behavior provides smooth, modern transitions. Good for most scenarios.

### No Animation

```xaml
<syncfusion:SfSegmentedControl 
    SelectedIndex="0"
    SelectionAnimationType="None">
    <x:String>Tab 1</x:String>
    <x:String>Tab 2</x:String>
    <x:String>Tab 3</x:String>
</syncfusion:SfSegmentedControl>
```

**When to use:** Forms requiring instant feedback, rapid selection scenarios, or accessibility preferences.

### Conditional Animation

```csharp
// Enable/disable animation based on user preference
bool userPrefersReducedMotion = GetUserMotionPreference();
segmentedControl.SelectionAnimationType = userPrefersReducedMotion
    ? SegmentSelectionAnimationType.None
    : SegmentSelectionAnimationType.Slide;
```

## Keyboard Navigation

The Segmented Control provides full keyboard support for accessibility.

### Keyboard Behaviors

| Key | Behavior |
|-----|----------|
| **Tab** | Moves focus to the segmented control. Focus border appears on selected item (or first item if none selected). Pressing Tab again moves focus away. |
| **LeftArrow** | Moves focus to previous segment. Does not change selection—only navigates. If on first item, does nothing. |
| **RightArrow** | Moves focus to next segment. Does not change selection—only navigates. If on last item, does nothing. |
| **Enter** | Selects the currently focused segment. Changes SelectedIndex and triggers SelectionChanged event. |

### Focus Management Example

```xaml
<StackPanel>
    <TextBox Header="Name" Margin="0,0,0,10"/>

    <syncfusion:SfSegmentedControl 
        x:Name="prioritySelector"
        TabIndex="1"
        SelectedIndex="1">
        <x:String>Low</x:String>
        <x:String>Medium</x:String>
        <x:String>High</x:String>
    </syncfusion:SfSegmentedControl>

    <Button Content="Submit" Margin="0,10,0,0" TabIndex="2"/>
</StackPanel>
```

### Programmatic Focus

```csharp
// Set focus to segmented control
prioritySelector.Focus(FocusState.Programmatic);

// Or use keyboard focus
prioritySelector.Focus(FocusState.Keyboard);
```

## Best Practices

### 1. Two-Way Binding for MVVM

```xaml
<syncfusion:SfSegmentedControl 
    ItemsSource="{Binding Periods}"
    SelectedIndex="{Binding SelectedIndex, Mode=TwoWay}"/>
```

**Why:** Keeps ViewModel synchronized with UI selection automatically.

### 2. Validate Indices

```csharp
private void SetSelection(int index)
{
    if (index >= 0 && index < segmentedControl.Items.Count)
    {
        segmentedControl.SelectedIndex = index;
    }
    else
    {
        Debug.WriteLine($"Invalid index: {index}");
    }
}
```

**Why:** Prevents ArgumentOutOfRangeException and unexpected behavior.

### 3. Handle Initial Selection

```xaml
<!-- Set reasonable default -->
<syncfusion:SfSegmentedControl SelectedIndex="0" ItemsSource="{Binding Items}"/>
```

**Why:** Ensures a clear initial state rather than no selection.

### 4. Use SelectionChanged for Side Effects

```csharp
private void SegmentedControl_SelectionChanged(object sender, SegmentSelectionChangedEventArgs e)
{
    // Trigger data refresh
    RefreshData();
    // Save preference
    SaveUserPreference(e.NewValue);
    // Update related UI
    UpdateChartType(e.NewValue);
}
```

**Why:** Centralized place for all selection-related logic.

### 5. Disable Animation for Forms

```xaml
<!-- For rapid selection in forms -->
<syncfusion:SfSegmentedControl SelectionAnimationType="None"/>
```

**Why:** Faster feedback for form inputs and accessibility.

### 6. Preserve Selection on Data Refresh

```csharp
private void RefreshData()
{
    int previousIndex = segmentedControl.SelectedIndex;
    segmentedControl.ItemsSource = GetUpdatedData();

    if (previousIndex >= 0 && previousIndex < segmentedControl.Items.Count)
    {
        segmentedControl.SelectedIndex = previousIndex;
    }
}
```

**Why:** Maintains user context when data updates.

### 7. Keyboard Accessibility

```xaml
<!-- Ensure proper tab order -->
<syncfusion:SfSegmentedControl TabIndex="1" IsTabStop="True"/>
```

**Why:** Keyboard users can navigate efficiently through your UI.

### 8. Visual Feedback

```xaml
<!-- Add shadow for better selected state visibility -->
<Style TargetType="syncfusion:SelectedSegmentBorder" x:Key="visibleSelection">
    <Setter Property="HasShadow" Value="True"/>
    <Setter Property="Background" Value="{ThemeResource AccentFillColorDefaultBrush}"/>
</Style>
```

**Why:** Clear visual indication helps users understand current selection.
