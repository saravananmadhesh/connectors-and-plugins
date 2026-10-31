# UpDown Button and Value Adjustment

This reference covers the UpDown button placement, increment/decrement functionality, and keyboard/mouse interactions for the WinUI NumberBox.

## Table of Contents

- [UpDown Button Placement](#updown-button-placement)
- [Increment and Decrement Values](#increment-and-decrement-values)
- [Keyboard Interactions](#keyboard-interactions)
- [Mouse Scrolling](#mouse-scrolling)
- [TextBox Visibility](#textbox-visibility)
- [Advanced Scenarios](#advanced-scenarios)

## UpDown Button Placement

The `UpDownPlacementMode` property controls where the increment/decrement buttons appear.

### Placement Modes

**Hidden (default):** No UpDown buttons visible
```xaml
<editors:SfNumberBox 
    Value="10"
    UpDownPlacementMode="Hidden" />
```

**Inline:** Buttons appear to the right of the text box
```xaml
<editors:SfNumberBox 
    Value="10"
    UpDownPlacementMode="Inline" />
```

**Compact:** Buttons appear as a compact spinner
```xaml
<editors:SfNumberBox 
    Value="10"
    UpDownPlacementMode="Compact" />
```

### Comparison of Modes

| Mode | Appearance | Use Case |
|------|-----------|----------|
| Hidden | No buttons | Read-only or keyboard-driven input |
| Inline | Right-aligned buttons | Standard input with button control |
| Compact | Vertical spinner | Space-constrained layouts |

## Increment and Decrement Values

Control the amount values change when buttons are clicked or keyboard shortcuts are used.

### SmallChange Property

`SmallChange` controls the increment amount for:
- **Arrow keys** (↑ ↓)
- **Mouse scrolling**
- **UpDown button clicks**

Default value: **1**

**Example:**
```xaml
<editors:SfNumberBox 
    Value="10"
    SmallChange="5"
    UpDownPlacementMode="Inline" />
```

When user clicks up button or presses ↑: Value becomes 15
When user clicks down button or presses ↓: Value becomes 10

### LargeChange Property

`LargeChange` controls the increment amount for:
- **Page Up key**
- **Page Down key**

Default value: **10**

**Example:**
```xaml
<editors:SfNumberBox 
    Value="10"
    SmallChange="1"
    LargeChange="10"
    UpDownPlacementMode="Inline" />
```

When user presses Page Up: Value increases by 10
When user presses Page Down: Value decreases by 10

## Keyboard Interactions

The NumberBox supports multiple keyboard shortcuts for value adjustment.

### Arrow Keys (Up/Down)
- **Up Arrow (↑)** - Increase by SmallChange amount
- **Down Arrow (↓)** - Decrease by SmallChange amount

```csharp
// With SmallChange=5
// Current: 100
// Press Up: 105
// Press Down: 100
```

### Page Keys
- **Page Up** - Increase by LargeChange amount
- **Page Down** - Decrease by LargeChange amount

```csharp
// With LargeChange=10
// Current: 100
// Press Page Up: 110
// Press Page Down: 90
```

### Other Keyboard Support
- **Enter** - Validate current input
- **Escape** - Cancel editing
- **Ctrl+A** - Select all text

## Mouse Scrolling

Users can change values by scrolling the mouse wheel over the NumberBox.

**Scrolling Behavior:**
- **Scroll Up** - Increase by SmallChange amount
- **Scroll Down** - Decrease by SmallChange amount

**Example:**
```xaml
<editors:SfNumberBox 
    Value="50"
    SmallChange="5" />
```

User scrolls up: Value becomes 55
User scrolls down: Value becomes 45

**Note:** Mouse scrolling uses `SmallChange`, not `LargeChange`.

## TextBox Visibility

The `TextBoxVisibility` property controls whether the input text box is shown.

### Show Text Box (Default)
```xaml
<editors:SfNumberBox 
    Value="10"
    UpDownPlacementMode="Inline"
    TextBoxVisibility="Visible" />
```

Users can:
- Type values directly
- See current value
- Use keyboard arrows

### Hide Text Box
```xaml
<editors:SfNumberBox 
    Value="10"
    UpDownPlacementMode="Inline"
    TextBoxVisibility="Collapsed" />
```

Users can only:
- Click UpDown buttons
- Use keyboard arrows
- Scroll mouse wheel

**Use cases for hidden text box:**
- Quantity pickers (only numeric adjustment)
- Rating controls (visual-only feedback)
- Spinners with button-only input

### Important Constraints

The `TextBoxVisibility` property only works when:
- `UpDownPlacementMode` is **Inline** or **Compact**
- If mode is Hidden, TextBoxVisibility is ignored

## Practical Examples

### Example 1: Quantity Selector

For selecting product quantities with visual UpDown buttons:

```xaml
<StackPanel Spacing="10">
    <TextBlock Text="Quantity" FontWeight="Bold"/>
    <editors:SfNumberBox 
        x:Name="quantityBox"
        Value="1"
        Minimum="1"
        Maximum="100"
        SmallChange="1"
        UpDownPlacementMode="Inline"
        IsEditable="True"
        Width="200"
        Height="40" />
</StackPanel>
```

**Behavior:**
- User can click buttons to adjust quantity
- User can type directly into field
- Values restricted to 1-100 range

### Example 2: Rating Selector (Button-Only)

For 1-5 star ratings with only button control:

```xaml
<StackPanel Spacing="10">
    <TextBlock Text="Rating" FontWeight="Bold"/>
    <editors:SfNumberBox 
        Value="3"
        Minimum="1"
        Maximum="5"
        SmallChange="1"
        UpDownPlacementMode="Inline"
        TextBoxVisibility="Collapsed"
        IsEditable="False"
        Width="150"
        Height="40" />
</StackPanel>
```

**Behavior:**
- Users see only UpDown buttons, no text input
- Clicking up/down adjusts rating
- No direct typing allowed

### Example 3: Large Increment Adjustment

For settings with large value ranges:

```xaml
<StackPanel Spacing="10">
    <TextBlock Text="Volume (0-100)" FontWeight="Bold"/>
    <editors:SfNumberBox 
        Value="50"
        Minimum="0"
        Maximum="100"
        SmallChange="5"      <!-- +5/-5 per arrow click -->
        LargeChange="20"     <!-- +20/-20 per Page key -->
        UpDownPlacementMode="Inline"
        Width="200"
        Height="40" />
</StackPanel>
```

**Behavior:**
- Arrow keys adjust by 5
- Page Up/Down adjust by 20
- UpDown buttons adjust by 5

### Example 4: Keyboard-Focused Input

For data entry forms where users prefer keyboard:

```xaml
<editors:SfNumberBox 
    Value="0"
    SmallChange="1"
    LargeChange="10"
    UpDownPlacementMode="Hidden"    <!-- No visual buttons -->
    IsEditable="True"
    PlaceholderText="Enter value or use arrows..."
    Width="250"
    Height="40" />
```

**Behavior:**
- Users type values or use keyboard shortcuts
- No buttons visible
- Arrow/Page keys still work

## Advanced Scenarios

### Scenario: Increment with Custom Values

Create different increment amounts for different contexts:

**C#:**
```csharp
// For currency with cents increment
SfNumberBox currencyBox = new SfNumberBox();
currencyBox.SmallChange = 0.25;  // 25 cents
currencyBox.LargeChange = 1.0;   // 1 dollar
currencyBox.CustomFormat = "C2";

// For percentage with whole number increment
SfNumberBox percentBox = new SfNumberBox();
percentBox.SmallChange = 1;      // 1%
percentBox.LargeChange = 10;     // 10%
percentBox.CustomFormat = "P2";
```

### Scenario: Button Click with Value Changed Event

Handle button clicks through ValueChanged event:

```csharp
SfNumberBox sfNumberBox = new SfNumberBox();
sfNumberBox.ValueChanged += (s, e) => {
    var newValue = e.NewValue;
    var oldValue = e.OldValue;
    
    if (newValue > oldValue)
        Debug.WriteLine("Up button or Up arrow pressed");
    else
        Debug.WriteLine("Down button or Down arrow pressed");
};
```

### Scenario: Disable Keyboard, Enable Buttons Only

```xaml
<editors:SfNumberBox 
    Value="5"
    IsEditable="False"
    UpDownPlacementMode="Inline"
    Width="200"
    Height="40" />
```

Users cannot type, but can:
- Click UpDown buttons
- Use keyboard arrows (↑ ↓)
- Use Page keys (if not disabled)
- Scroll mouse wheel

## Common Issues and Solutions

### Issue: Buttons don't appear
**Solution:** Check `UpDownPlacementMode`. Default is "Hidden". Set to "Inline" or "Compact".

### Issue: Mouse scrolling not working
**Solution:** Ensure `SmallChange` is set. Default SmallChange=1, so scrolling will increment by 1.

### Issue: Text box still visible when collapsed
**Solution:** Verify `UpDownPlacementMode` is "Inline" or "Compact". TextBoxVisibility only works with these modes.

### Issue: Increment amounts too small/large
**Solution:** Adjust `SmallChange` and `LargeChange` properties for appropriate increments.
