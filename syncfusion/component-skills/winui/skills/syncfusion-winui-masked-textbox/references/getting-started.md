# Getting Started with WinUI Masked TextBox

This guide covers installation, basic setup, and your first masked input implementation with the Syncfusion WinUI Masked TextBox control.

## Installation

**1. Install the NuGet package:**

```powershell
Install-Package Syncfusion.Editors.WinUI
```

Or via the NuGet Package Manager in Visual Studio, search for `Syncfusion.Editors.WinUI`.

**2. Register the license:**

Add the license key in `App.xaml.cs` before `InitializeComponent()`:

```csharp
public App()
{
    Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
    this.InitializeComponent();
}
```

Get your license key from the [Syncfusion license page](https://www.syncfusion.com/account/downloads).

## Adding the Control

**In XAML:**

1. Add the namespace:

```xaml
xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors"
```

2. Add the control:

```xaml
<syncfusion:SfMaskedTextBox Width="200"
                            MaskType="Simple"
                            Mask="00/00/0000"
                            PromptChar="_"
                            Value="01/15/2024"/>
```

**In Code-Behind:**

```csharp
using Syncfusion.UI.Xaml.Editors;

SfMaskedTextBox maskedTextBox = new SfMaskedTextBox
{
    Width = 200,
    MaskType = MaskedTextBoxMaskType.Simple,
    Mask = "00/00/0000",
    PromptChar = '_',
    Value = "01/15/2024"
};

// Add to your layout
myStackPanel.Children.Add(maskedTextBox);
```

## Basic Concepts

### Mask Property

The `Mask` property defines the input template. The user can only enter values that match the mask pattern.

**Example:** `Mask="00/00/0000"` accepts only digits in the format `MM/DD/YYYY`.

### MaskType

Two mask types are available:

- **Simple:** Uses predefined mask characters (0, 9, #, L, ?, C, A, etc.)
- **RegEx:** Uses regular expression patterns for advanced validation

### PromptChar

The `PromptChar` indicates empty positions in the mask. Default is underscore (`_`).

```xaml
<syncfusion:SfMaskedTextBox PromptChar="*"
                            Mask="000-000-0000"/>
```

Display: `***-***-****`

### Value Property

The `Value` property gets or sets the masked text value. You can set an initial value:

```xaml
<syncfusion:SfMaskedTextBox Mask="00/00/0000"
                            Value="12/25/2023"/>
```

Or retrieve the value in code:

```csharp
string enteredValue = maskedTextBox.Value;
```

## Simple Mask Example (Date Entry)

**Scenario:** Create a date input field that enforces `MM/DD/YYYY` format.

```xaml
<StackPanel Padding="20">
    <TextBlock Text="Enter Date:" Margin="0,0,0,8"/>
    
    <syncfusion:SfMaskedTextBox Width="200"
                                MaskType="Simple"
                                Mask="00/00/0000"
                                PromptChar="_"
                                Value="01/01/2024"/>
</StackPanel>
```

**Mask breakdown:**
- `0` = Required digit (0-9)
- `/` = Literal character (separator)

**Result:** User can only enter digits; slashes are automatically inserted.

## RegEx Mask Example (Email Validation)

**Scenario:** Validate email addresses with a regex pattern.

```xaml
<syncfusion:SfMaskedTextBox Width="300"
                            MaskType="RegEx"
                            Mask="[A-Za-z0-9._%-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}"/>
```

**Pattern explanation:**
- `[A-Za-z0-9._%-]+` = Username (letters, digits, special chars)
- `@` = Literal @ symbol
- `[A-Za-z0-9]+` = Domain name
- `\.` = Literal dot (escaped)
- `[A-Za-z]{2,3}` = Domain extension (2-3 letters)

**Valid inputs:** `user@example.com`, `john.doe@mail.org`

## Phone Number Example

```xaml
<syncfusion:SfMaskedTextBox Width="200"
                            MaskType="Simple"
                            Mask="(000) 000-0000"
                            PromptChar="_"
                            Value="1234567890"/>
```

**Display:** `(123) 456-7890`

The parentheses, space, and hyphen are literal characters automatically included.

## Complete Example with Event Handling

```xaml
<StackPanel Padding="20">
    <TextBlock Text="Phone Number:" Margin="0,0,0,8"/>
    
    <syncfusion:SfMaskedTextBox x:Name="phoneInput"
                                Width="200"
                                MaskType="Simple"
                                Mask="(000) 000-0000"
                                ValueChanged="PhoneInput_ValueChanged"/>
    
    <TextBlock x:Name="resultText" 
               Margin="0,16,0,0"
               Foreground="Green"/>
</StackPanel>
```

**Code-behind:**

```csharp
private void PhoneInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        resultText.Text = $"Valid phone: {e.NewValue}";
    }
    else
    {
        resultText.Text = "Please complete the phone number";
    }
}
```

## Key Takeaways

- **Install:** `Syncfusion.Editors.WinUI` NuGet package + license registration
- **Namespace:** `xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors"`
- **Two mask types:** Simple (predefined chars) and RegEx (custom patterns)
- **Core properties:** `Mask`, `MaskType`, `Value`, `PromptChar`
- **Simple masks** use characters like `0` (digit), `L` (letter), `A` (alphanumeric)
- **RegEx masks** use standard regex patterns for advanced validation

## Next Steps

- **[Mask Types](mask-types.md)** - Complete reference of Simple and RegEx mask characters
- **[Value Formatting](value-formatting.md)** - Control how values include prompts and literals
- **[Error Indication](error-indication.md)** - Display validation errors with visual feedback
