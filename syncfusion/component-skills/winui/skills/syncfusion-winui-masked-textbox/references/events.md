# Events in WinUI Masked TextBox

The Masked TextBox provides two key events for handling value changes and validation: `ValueChanging` (before change) and `ValueChanged` (after change).

## Overview

| Event | Timing | Cancelable | Use Case |
|-------|--------|------------|----------|
| **ValueChanging** | Before value changes | Yes | Prevent invalid input, real-time validation |
| **ValueChanged** | After value changes | No | Update UI, validate complete input |

## ValueChanging Event

The `ValueChanging` event fires **before** the `Value` property changes, allowing you to validate and cancel the change if needed.

### Event Arguments

**MaskedTextBoxValueChangingEventArgs** provides:

| Property | Type | Description |
|----------|------|-------------|
| `NewValue` | string | The new value about to be set |
| `OldValue` | string | The current value before change |
| `IsValid` | bool | Whether input matches mask completion |
| `Cancel` | bool | Set to `true` to prevent the change |

### Basic Usage

```xaml
<syncfusion:SfMaskedTextBox x:Name="maskedTextBox"
                            Mask="000-000-0000"
                            ValueChanging="MaskedTextBox_ValueChanging"/>
```

**Code-behind:**

```csharp
private void MaskedTextBox_ValueChanging(object sender, MaskedTextBoxValueChangingEventArgs e)
{
    // Access values
    string newValue = e.NewValue;
    string oldValue = e.OldValue;
    
    // Check validity
    bool isValid = e.IsValid;
    
    // Cancel change if needed
    if (newValue == "1234")
    {
        e.Cancel = true;
    }
}
```

### Example 1: Prevent Specific Values

Prevent users from entering blacklisted phone numbers:

```csharp
private void PhoneInput_ValueChanging(object sender, MaskedTextBoxValueChangingEventArgs e)
{
    // Block test phone numbers
    if (e.NewValue.StartsWith("555") || e.NewValue == "0000000000")
    {
        e.Cancel = true;
        
        // Show error message
        errorText.Text = "Invalid phone number";
        errorText.Visibility = Visibility.Visible;
    }
}
```

### Example 2: Disable Validation

By default, `IsValid` is `false` when the mask is incomplete. Override this to allow partial input:

```xaml
<syncfusion:SfMaskedTextBox x:Name="optionalPhone"
                            Mask="(000) 000-0000"
                            ValueChanging="OptionalPhone_ValueChanging"/>
```

```csharp
private void OptionalPhone_ValueChanging(object sender, MaskedTextBoxValueChangingEventArgs e)
{
    // Allow incomplete phone numbers
    e.IsValid = true;
}
```

**Use case:** Optional fields where partial input is acceptable.

### Example 3: Real-Time Character Filtering

Prevent specific characters from being entered:

```csharp
private void ProductKeyInput_ValueChanging(object sender, MaskedTextBoxValueChangingEventArgs e)
{
    // Product keys cannot contain 'O' (letter O) - only zero allowed
    if (e.NewValue.Contains("O") || e.NewValue.Contains("o"))
    {
        e.Cancel = true;
        
        productKeyError.Text = "Product keys cannot contain the letter 'O'. Use zero (0) instead.";
        productKeyError.Visibility = Visibility.Visible;
    }
    else
    {
        productKeyError.Visibility = Visibility.Collapsed;
    }
}
```

### Example 4: Conditional Input Rules

Apply different validation based on current input:

```csharp
private void DateInput_ValueChanging(object sender, MaskedTextBoxValueChangingEventArgs e)
{
    // If first two digits are "13" or higher, cancel (invalid month)
    if (e.NewValue.Length >= 2)
    {
        string monthPart = e.NewValue.Substring(0, 2);
        if (int.TryParse(monthPart, out int month) && month > 12)
        {
            e.Cancel = true;
            dateError.Text = "Month must be between 01 and 12";
        }
    }
}
```

## Next Steps

- **[Events — ValueChanged](events-valuechanged.md)** - ValueChanged event examples, combining both events, validation scenarios, and complete form example
- **[Error Indication](error-indication.md)** - Display validation errors with visual feedback
- **[Value Formatting](value-formatting.md)** - Control how values include prompts and literals
- **[Getting Started](getting-started.md)** - Installation and basic usage
