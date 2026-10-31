# Value Restrictions and Validation

This reference covers restricting input values, enforcing ranges, and controlling user editing for the WinUI NumberBox control.

## Table of Contents

- [AllowNull Property](#allownull-property)
- [Minimum and Maximum Bounds](#minimum-and-maximum-bounds)
- [IsEditable Property](#iseditable-property)
- [Value Validation Behavior](#value-validation-behavior)
- [Combined Restrictions](#combined-restrictions)
- [Practical Scenarios](#practical-scenarios)

## AllowNull Property

The `AllowNull` property controls whether the NumberBox accepts null (empty) values.

### Allow Null Values (Default)

When `AllowNull="True"`, users can clear the input to set a null value:

**XAML:**
```xaml
<editors:SfNumberBox 
    Value="10"
    AllowNull="True" />
```

**Behavior:**
- User can clear the text field
- Clearing sets value to null
- PlaceholderText displays when empty

### Disallow Null Values

When `AllowNull="False"`, clearing the field reverts to a default value:

**XAML:**
```xaml
<editors:SfNumberBox 
    Value="10"
    AllowNull="False" />
```

**Behavior:**
- User tries to clear the field
- Value reverts to 0 (if no Minimum set)
- If Minimum is set, value reverts to Minimum

### Fallback Behavior

When `AllowNull="False"` and user clears:

| Scenario | Result |
|----------|--------|
| No Minimum set | Reverts to 0 |
| Minimum="5" set | Reverts to 5 |
| Minimum="10", Maximum="50" | Reverts to 10 |

**Example with Minimum:**
```xaml
<editors:SfNumberBox 
    Value="50"
    Minimum="15"
    AllowNull="False" />
```

- User tries to clear field
- Value becomes 15 (the Minimum)

## Minimum and Maximum Bounds

Control the valid range for numeric input.

### Basic Min/Max Range

**XAML:**
```xaml
<editors:SfNumberBox 
    Value="50"
    Minimum="10"
    Maximum="100" />
```

**Validation:**
- User enters 5 → Becomes 10 (below minimum)
- User enters 50 → Stays 50 (valid)
- User enters 150 → Becomes 100 (above maximum)

### Setting Only Minimum

**XAML:**
```xaml
<editors:SfNumberBox 
    Value="0"
    Minimum="0" />
```

- User can enter any value ≥ 0
- No upper limit

### Setting Only Maximum

**XAML:**
```xaml
<editors:SfNumberBox 
    Value="50"
    Maximum="100" />
```

- User can enter any value ≤ 100
- No lower limit

### Range Examples

**Age Input (0-150):**
```xaml
<editors:SfNumberBox 
    Header="Age"
    Value="25"
    Minimum="0"
    Maximum="150" />
```

**Percentage (0-100):**
```xaml
<editors:SfNumberBox 
    Header="Discount"
    Value="50"
    Minimum="0"
    Maximum="100"
    CustomFormat="P0" />
```

**Temperature Range (-50 to 50):**
```xaml
<editors:SfNumberBox 
    Header="Temperature (°C)"
    Value="20"
    Minimum="-50"
    Maximum="50" />
```

**Price Range:**
```xaml
<editors:SfNumberBox 
    Header="Price"
    Value="99.99"
    Minimum="0"
    Maximum="9999.99"
    CustomFormat="C2" />
```

## IsEditable Property

The `IsEditable` property controls whether users can type values directly into the text field.

### Allow Direct Editing (Default)

When `IsEditable="True"`, users can type and edit:

**XAML:**
```xaml
<editors:SfNumberBox 
    Value="100"
    IsEditable="True" />
```

**User Actions Allowed:**
- Type directly in field
- Backspace to delete
- Clear entire value

**Still Work:**
- UpDown button clicks
- Arrow keys (↑ ↓)
- Page Up/Down keys
- Mouse scrolling

### Prevent Direct Editing

When `IsEditable="False"`, typing is prevented:

**XAML:**
```xaml
<editors:SfNumberBox 
    Value="100"
    IsEditable="False"
    UpDownPlacementMode="Inline" />
```

**User Actions Blocked:**
- Cannot type in field
- Cannot paste values
- Cannot delete via backspace

**Still Works:**
- UpDown button clicks
- Arrow keys (↑ ↓)
- Page Up/Down keys
- Mouse scrolling

### Use Case: Read-Only with Buttons

```xaml
<StackPanel Spacing="10">
    <TextBlock Text="Quantity" FontWeight="Bold"/>
    <editors:SfNumberBox 
        x:Name="quantityBox"
        Value="1"
        Minimum="1"
        Maximum="50"
        IsEditable="False"
        UpDownPlacementMode="Inline"
        SmallChange="1"
        Width="200"
        Height="40" />
</StackPanel>
```

**Behavior:**
- Users see value clearly displayed
- Can only adjust via buttons
- Prevents invalid manual input
- Good for e-commerce quantity selectors

## Value Validation Behavior

The NumberBox validates and corrects values automatically.

### When Validation Occurs

Validation happens at:
1. **Enter key press** - Validates input immediately
2. **Control loses focus** - Validates when moving to another control
3. **Button click** - Automatic validation on UpDown button click

### Validation Examples

**Out-of-Range Above Maximum:**
```
Min: 10, Max: 100
User enters: 150
Result: Becomes 100 (corrected to maximum)
```

**Out-of-Range Below Minimum:**
```
Min: 10, Max: 100
User enters: 5
Result: Becomes 10 (corrected to minimum)
```

**Invalid Type (For Double type):**
```
User enters: "abc"
Result: Stays previous value (invalid input rejected)
```

**Precision Loss (For Decimal type):**
```
User enters: 123.456789 (with CustomFormat="C2")
Result: Becomes 123.46 (rounded to 2 decimals)
```

### Example: Real-time Correction

```csharp
private void NumberBox_ValueChanged(object sender, ValueChangedEventArgs e)
{
    var oldValue = e.OldValue;
    var newValue = e.NewValue;
    
    Debug.WriteLine($"Value changed: {oldValue} → {newValue}");
}

// User enters 150 with Max=100
// Event fires: Value changed: [previous] → 100
```

## Combined Restrictions

Combine multiple properties for comprehensive validation.

### Pattern 1: Age Selector (0-150, Integer, Positive)

```xaml
<editors:SfNumberBox 
    Header="Age"
    Value="25"
    ValueType="Int"
    Minimum="0"
    Maximum="150"
    AllowNull="False"
    IsEditable="True"
    SmallChange="1"
    LargeChange="10"
    Width="250"
    Height="75" />
```

**Constraints:**
- Integer values only (0 to 150)
- Cannot be null (empty)
- Can type directly
- Can use buttons/arrows

### Pattern 2: Read-Only Display with Fine Control

```xaml
<editors:SfNumberBox 
    Header="Setting"
    Value="50"
    Minimum="0"
    Maximum="100"
    IsEditable="False"
    UpDownPlacementMode="Inline"
    SmallChange="5"
    AllowNull="False"
    Width="250"
    Height="75" />
```

**Constraints:**
- Range: 0-100
- Cannot type (read-only)
- Must use buttons or arrow keys
- Value always valid

### Pattern 3: Strict Currency Input

```xaml
<editors:SfNumberBox 
    Header="Price"
    Value="0"
    ValueType="Decimal"
    Minimum="0"
    Maximum="10000"
    CustomFormat="C2"
    AllowNull="False"
    SmallChange="0.01"
    LargeChange="1.00"
    Width="250"
    Height="75" />
```

**Constraints:**
- Decimal precision (cents)
- Range: 0 to 10000
- Cannot be empty
- Currency formatting
- Fine increment control

### Pattern 4: Percentage (0-100%)

```xaml
<editors:SfNumberBox 
    Header="Discount"
    Value="0"
    ValueType="Double"
    Minimum="0"
    Maximum="1"
    CustomFormat="P2"
    AllowNull="False"
    SmallChange="0.01"
    IsEditable="True"
    Width="250"
    Height="75" />
```

**Constraints:**
- Range: 0 to 1 (0% to 100%)
- Always shows percentage format
- Cannot be null
- 1% increments with buttons

## Practical Scenarios

### Scenario 1: E-Commerce Quantity Selector

Requirements:
- Minimum 1, Maximum 999
- Cannot be empty
- Users prefer clicking buttons over typing
- Should validate on change

```xaml
<editors:SfNumberBox 
    Header="Quantity"
    Value="1"
    Minimum="1"
    Maximum="999"
    AllowNull="False"
    IsEditable="False"
    UpDownPlacementMode="Inline"
    SmallChange="1"
    LargeChange="10"
    Width="200"
    Height="60" />
```

**Behavior:**
- Force valid range (1-999)
- Button-based selection
- Clear validation on change
- No direct typing to prevent errors

### Scenario 2: Age Input Form

Requirements:
- Must be between 0-150
- Should allow direct input for speed
- Cannot be empty
- Integer only

```xaml
<editors:SfNumberBox 
    Header="Age"
    Value="0"
    ValueType="Int"
    Minimum="0"
    Maximum="150"
    AllowNull="False"
    IsEditable="True"
    SmallChange="1"
    Width="250"
    Height="75" />
```

**Behavior:**
- Allow typing for quick entry
- Validate range automatically
- Integer enforcement
- Clear visual feedback

### Scenario 3: Settings Slider Value

Requirements:
- Range 0-10
- Cannot be null
- Fine control with buttons
- No direct editing for consistency

```xaml
<editors:SfNumberBox 
    Header="Volume"
    Value="5"
    Minimum="0"
    Maximum="10"
    AllowNull="False"
    IsEditable="False"
    UpDownPlacementMode="Compact"
    SmallChange="1"
    Width="150"
    Height="50" />
```

**Behavior:**
- Fixed range (0-10)
- Button-controlled adjustments
- Consistent interface
- Always valid value

### Scenario 4: Financial Amount Input

Requirements:
- Currency format with 2 decimals
- Range 0-99,999.99
- Cannot be null
- Support direct input and buttons

```xaml
<editors:SfNumberBox 
    Header="Amount"
    Value="0"
    ValueType="Decimal"
    Minimum="0"
    Maximum="99999.99"
    CustomFormat="C2"
    AllowNull="False"
    IsEditable="True"
    SmallChange="0.01"
    LargeChange="1.00"
    Width="250"
    Height="75" />
```

**Behavior:**
- Currency display with formatting
- Strict range validation
- Decimal precision to cents
- Flexible input methods

## Common Issues and Solutions

### Issue: Value won't accept null
**Solution:** Set `AllowNull="True"`. Default is True, so check if explicitly set to False.

### Issue: User types value outside range, nothing happens
**Solution:** Validation only occurs on Enter or focus loss. Value corrects at that point, not during typing.

### Issue: Minimum not enforced
**Solution:** Minimum only applies to validation. Set `AllowNull="False"` so cleared values fall back to Minimum.

### Issue: Users can still type with IsEditable=False
**Solution:** IsEditable prevents keyboard input, but may need additional validation. Consider removing TextBox visibility option.

### Issue: Cannot clear value even with AllowNull=True
**Solution:** Check Minimum property. If Minimum is set and user clears, it reverts to Minimum instead of null.
