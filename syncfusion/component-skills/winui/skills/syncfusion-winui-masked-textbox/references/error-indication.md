# Error Indication in WinUI Masked TextBox

The Masked TextBox provides built-in visual error feedback when input validation fails or is incomplete, helping users identify and correct input mistakes.

## Overview

Error indication is controlled by the `ErrorType` property, which changes the border color and displays an error icon based on validation status.

**Key features:**
- Built-in error types (Warning, Critical, Information, Success)
- Custom error icons and border colors
- `ErrorContent` for tooltip messages
- Automatic validation based on mask completion

## ErrorType Property

The `ErrorType` property sets the validation state and visual appearance:

| ErrorType | Description | Border Color | Icon |
|-----------|-------------|--------------|------|
| `None` | No error (default) | Standard border | No icon |
| `Default` | Generic error | Red | Red exclamation |
| `Warning` | Warning state | Orange/Yellow | Warning icon |
| `Information` | Informational message | Blue | Info icon |
| `Critical` | Critical error | Dark red | Critical icon |
| `Success` | Successful validation | Green | Checkmark icon |

## Built-in Error Types

### None (Default)

No error indication. Standard border color.

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"
                            ErrorType="None"/>
```

**Use case:** When input is valid or no validation is required.

### Default Error

Red border with red exclamation icon.

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"
                            ErrorType="Default"/>
```

**Use case:** Generic validation failure (e.g., incomplete input).

### Warning

Orange/yellow border with warning icon.

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"
                            ErrorType="Warning"/>
```

**Use case:** Input is technically valid but may need attention (e.g., weak password, old date).

### Information

Blue border with info icon.

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"
                            ErrorType="Information"/>
```

**Use case:** Provide helpful information (e.g., format hints, special instructions).

### Critical

Dark red border with critical error icon.

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"
                            ErrorType="Critical"/>
```

**Use case:** Severe validation failure (e.g., duplicate SSN, blacklisted phone number).

### Success

Green border with checkmark icon.

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"
                            ErrorType="Success"/>
```

**Use case:** Input validated successfully (e.g., phone number verified, email confirmed).

## ErrorContent Property

The `ErrorContent` property displays a tooltip message when hovering over the error icon.

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"
                            ErrorType="Default"
                            ErrorContent="Please complete all digits of the SSN"/>
```

**Behavior:**
- Hover over error icon → Tooltip appears with `ErrorContent` text
- Provides context-specific error messages
- Helps users understand what went wrong

### Example with Multiple Error States

```xaml
<StackPanel Padding="20">
    <syncfusion:SfMaskedTextBox x:Name="ssnInput"
                                Mask="000-00-0000"
                                ErrorType="Default"
                                ErrorContent="SSN must be 9 digits"
                                Margin="0,0,0,16"/>
    
    <syncfusion:SfMaskedTextBox x:Name="phoneInput"
                                Mask="(000) 000-0000"
                                ErrorType="Warning"
                                ErrorContent="Phone number format may be incorrect"
                                Margin="0,0,0,16"/>
    
    <syncfusion:SfMaskedTextBox x:Name="emailInput"
                                MaskType="RegEx"
                                Mask="[A-Za-z0-9._%-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}"
                                ErrorType="Success"
                                ErrorContent="Email validated successfully"/>
</StackPanel>
```

## Custom Error Type

You can customize the error appearance using:

- **CustomErrorIcon:** Set a custom icon (ImageSource)
- **CustomErrorBorderBrush:** Set a custom border color (Brush)

### Custom Error Icon

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"
                            ErrorType="Default">
    <syncfusion:SfMaskedTextBox.CustomErrorIcon>
        <BitmapImage UriSource="ms-appx:///Assets/error-icon.png"/>
    </syncfusion:SfMaskedTextBox.CustomErrorIcon>
</syncfusion:SfMaskedTextBox>
```

### Custom Error Border Brush

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"
                            ErrorType="Default"
                            CustomErrorBorderBrush="Purple"/>
```

### Combined Custom Error

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"
                            ErrorType="Default"
                            ErrorContent="Custom validation error"
                            CustomErrorBorderBrush="#FF6B35">
    <syncfusion:SfMaskedTextBox.CustomErrorIcon>
        <FontIcon Glyph="&#xE7BA;" 
                  Foreground="#FF6B35"
                  FontSize="16"/>
    </syncfusion:SfMaskedTextBox.CustomErrorIcon>
</syncfusion:SfMaskedTextBox>
```

**Use case:** Brand-specific error styling or specialized validation states.

## Next Steps

- **[Error Indication — Validation](error-indication-validation.md)** - Dynamic validation, scenarios, and complete form example
- **[Events](events.md)** - Handle ValueChanging and ValueChanged for validation
- **[Value Formatting](value-formatting.md)** - Control output format
- **[Customization](customization.md)** - Style the control with headers and descriptions
