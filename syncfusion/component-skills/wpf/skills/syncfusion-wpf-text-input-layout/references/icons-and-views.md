# Icons and Supported Input Views in WPF TextInputLayout

## Overview

This guide covers two essential aspects of the WPF TextInputLayout control: adding custom icons (leading and trailing views) and working with supported input view controls. These features enable you to create rich, intuitive input experiences with visual indicators and flexible input types.

## Table of Contents

1. [Custom Icons Overview](#custom-icons-overview)
2. [Leading View](#leading-view)
3. [Trailing View](#trailing-view)
4. [Supported Input Views](#supported-input-views)
5. [Best Practices](#best-practices)

---

## Custom Icons Overview

The TextInputLayout control allows you to add custom icons at both the leading (left) and trailing (right) edges of the input view. These icons can be:

- **Unicode characters**
- **Font icons** (like Material Icons, Font Awesome)
- **Custom labels** with icon fonts
- **Any WPF control** (though labels are most common)

### Icon Positioning Diagram

```
┌─────────────────────────────────────────────────┐
│  [L]  ┌─────────────────────────┐  [T]          │
│  Out  │  [L]  Input View  [T]   │  Out          │
│  side │   In                In  │  side         │
│       └─────────────────────────┘               │
└─────────────────────────────────────────────────┘

[L] = Leading View Position (Inside/Outside)
[T] = Trailing View Position (Inside/Outside)
```

**Key Concepts:**
- **Leading View**: Icon on the left (start) side
- **Trailing View**: Icon on the right (end) side
- **Position**: Icons can be placed Inside or Outside the container
- **Events**: Icon interactions must be handled at application level

> **Important:** Events and commands linked to custom icons should be handled at the application level. The control itself does not provide built-in icon click handlers.

---

## Leading View

The leading view appears on the left side (start edge) of the input view and is typically used for:
- Input type indicators (calendar, search, user icons)
- Contextual hints about the expected input
- Brand or category identifiers

### Basic Leading View Implementation

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout
    Hint="Birth date"
    LeadingViewPosition="Inside">
    <TextBox />
    <inputLayout:SfTextInputLayout.LeadingView>
        <Label
            FontFamily="/Assets/Sync FontIcons.ttf#Sync FontIcons"
            Content="&#x1F5D3;">
        </Label>
    </inputLayout:SfTextInputLayout.LeadingView>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
var inputLayout = new SfTextInputLayout();
inputLayout.Hint = "Birth date";
inputLayout.LeadingViewPosition = ViewPosition.Inside;
inputLayout.LeadingView = new Label() { Content = "\U0001F5D3" }; // Calendar icon
inputLayout.InputView = new TextBox();
```

**Visual Result:**
```
Inside Position:
┌────────────────────────────────┐
│ Birth date                     │
├────────────────────────────────┤
│ 📅  [Enter date here]          │
└────────────────────────────────┘

Outside Position:
 📅 ┌──────────────────────────┐
    │ Birth date               │
    ├──────────────────────────┤
    │ [Enter date here]        │
    └──────────────────────────┘
```

### Leading View Positioning

The `LeadingViewPosition` property controls where the icon appears relative to the container.

**When to use Inside:**
- When the icon is semantically part of the input
- For compact layouts
- When following Material Design guidelines

**When to use Outside:**
- For labels or prefixes
- When the icon needs to be separate from the input area
- For better visual hierarchy

**XAML Comparison:**
```xaml
<!-- Inside Position (Default behavior varies, specify explicitly) -->
<inputLayout:SfTextInputLayout
    Hint="Search"
    LeadingViewPosition="Inside">
    <TextBox />
    <inputLayout:SfTextInputLayout.LeadingView>
        <Label Content="🔍" FontSize="18" VerticalAlignment="Center"/>
    </inputLayout:SfTextInputLayout.LeadingView>
</inputLayout:SfTextInputLayout>

<!-- Outside Position -->
<inputLayout:SfTextInputLayout
    Hint="Price"
    LeadingViewPosition="Outside">
    <TextBox />
    <inputLayout:SfTextInputLayout.LeadingView>
        <Label Content="$" FontSize="16" FontWeight="Bold" 
               VerticalAlignment="Center"/>
    </inputLayout:SfTextInputLayout.LeadingView>
</inputLayout:SfTextInputLayout>
```

> **Default Value:** By default, `LeadingViewPosition` is set to `Outside`.

### Common Leading View Use Cases

**1. Search Icon**
```xaml
<inputLayout:SfTextInputLayout
    Hint="Search users"
    LeadingViewPosition="Inside">
    <TextBox />
    <inputLayout:SfTextInputLayout.LeadingView>
        <Label Content="🔍" FontSize="18" Foreground="Gray"/>
    </inputLayout:SfTextInputLayout.LeadingView>
</inputLayout:SfTextInputLayout>
```

**2. User Profile Icon**
```csharp
var userInputLayout = new SfTextInputLayout();
userInputLayout.Hint = "Username";
userInputLayout.LeadingViewPosition = ViewPosition.Inside;
userInputLayout.LeadingView = new Label() 
{ 
    Content = "👤",
    FontSize = 18,
    VerticalAlignment = VerticalAlignment.Center
};
userInputLayout.InputView = new TextBox();
```

**3. Currency Symbol**
```xaml
<inputLayout:SfTextInputLayout
    Hint="Amount"
    LeadingViewPosition="Outside">
    <TextBox />
    <inputLayout:SfTextInputLayout.LeadingView>
        <Label Content="$" FontSize="20" FontWeight="Bold" 
               VerticalAlignment="Center" Foreground="#2E7D32"/>
    </inputLayout:SfTextInputLayout.LeadingView>
</inputLayout:SfTextInputLayout>
```

**4. Country Code Prefix**
```xaml
<inputLayout:SfTextInputLayout
    Hint="Phone number"
    LeadingViewPosition="Inside">
    <TextBox />
    <inputLayout:SfTextInputLayout.LeadingView>
        <Label Content="+1" FontSize="14" Foreground="Gray"
               VerticalAlignment="Center" Margin="8,0,0,0"/>
    </inputLayout:SfTextInputLayout.LeadingView>
</inputLayout:SfTextInputLayout>
```

---

## Trailing View

The trailing view appears on the right side (end edge) of the input view and is commonly used for:
- Action buttons (clear, submit, visibility toggle)
- Validation indicators (checkmark, error icon)
- Additional information icons
- Dropdown indicators

### Basic Trailing View Implementation

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout
    Hint="Birth date"
    TrailingViewPosition="Outside">
    <TextBox />
    <inputLayout:SfTextInputLayout.TrailingView>
        <Label
            FontFamily="/Assets/Sync FontIcons.ttf#Sync FontIcons"
            Content="&#x1F5D3;">
        </Label>
    </inputLayout:SfTextInputLayout.TrailingView>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
var inputLayout = new SfTextInputLayout();
inputLayout.Hint = "Birth date";
inputLayout.TrailingViewPosition = ViewPosition.Outside;
inputLayout.TrailingView = new Label() { Content = "\U0001F5D3" }; // Calendar icon
inputLayout.InputView = new TextBox();
```

**Visual Result:**
```
Inside Position:
┌────────────────────────────────┐
│ Birth date                     │
├────────────────────────────────┤
│ [Enter date here]          📅  │
└────────────────────────────────┘

Outside Position:
┌──────────────────────────┐ 📅
│ Birth date               │
├──────────────────────────┤
│ [Enter date here]        │
└──────────────────────────┘
```

### Trailing View Positioning

The `TrailingViewPosition` property controls the icon's placement.

**When to use Inside:**
- For clear/visibility toggle buttons
- For validation status icons
- When the icon is functionally part of the input

**When to use Outside:**
- For help/info icons
- For actions that affect the entire field
- For calendar pickers or external tools

> **Default Value:** By default, `TrailingViewPosition` is set to `Inside`.

### Interactive Trailing Views

Since events must be handled at the application level, here are common interactive patterns:

**1. Password Visibility Toggle**
```xaml
<inputLayout:SfTextInputLayout
    x:Name="passwordLayout"
    Hint="Password"
    TrailingViewPosition="Inside">
    <PasswordBox x:Name="passwordBox"/>
    <inputLayout:SfTextInputLayout.TrailingView>
        <Button Content="👁" 
                Background="Transparent" 
                BorderThickness="0"
                Click="TogglePasswordVisibility"
                Cursor="Hand"/>
    </inputLayout:SfTextInputLayout.TrailingView>
</inputLayout:SfTextInputLayout>
```

```csharp
private bool isPasswordVisible = false;
private TextBox textBoxForPassword;

private void TogglePasswordVisibility(object sender, RoutedEventArgs e)
{
    if (isPasswordVisible)
    {
        // Switch back to PasswordBox
        var tempText = textBoxForPassword.Text;
        passwordBox.Password = tempText;
        passwordLayout.InputView = passwordBox;
        (sender as Button).Content = "👁";
    }
    else
    {
        // Switch to TextBox
        textBoxForPassword = new TextBox { Text = passwordBox.Password };
        passwordLayout.InputView = textBoxForPassword;
        (sender as Button).Content = "👁‍🗨";
    }
    isPasswordVisible = !isPasswordVisible;
}
```

**2. Clear Button**
```xaml
<inputLayout:SfTextInputLayout
    Hint="Search"
    TrailingViewPosition="Inside">
    <TextBox x:Name="searchBox"/>
    <inputLayout:SfTextInputLayout.TrailingView>
        <Button Content="✖" 
                Background="Transparent"
                BorderThickness="0"
                Click="ClearSearch"
                Visibility="{Binding ElementName=searchBox, Path=Text.Length, 
                           Converter={StaticResource LengthToVisibilityConverter}}"/>
    </inputLayout:SfTextInputLayout.TrailingView>
</inputLayout:SfTextInputLayout>
```

```csharp
private void ClearSearch(object sender, RoutedEventArgs e)
{
    searchBox.Text = string.Empty;
    searchBox.Focus();
}
```

**3. Validation Indicator**
```csharp
private void ShowValidationIcon(SfTextInputLayout layout, bool isValid)
{
    var icon = new Label
    {
        Content = isValid ? "✓" : "✗",
        Foreground = new SolidColorBrush(isValid ? Colors.Green : Colors.Red),
        FontSize = 18,
        VerticalAlignment = VerticalAlignment.Center
    };
    
    layout.TrailingView = icon;
    layout.TrailingViewPosition = ViewPosition.Inside;
}
```

**4. Date Picker Button**
```xaml
<inputLayout:SfTextInputLayout
    Hint="Select date"
    TrailingViewPosition="Inside">
    <TextBox x:Name="dateTextBox" IsReadOnly="True"/>
    <inputLayout:SfTextInputLayout.TrailingView>
        <Button Content="📅" 
                Background="Transparent"
                BorderThickness="0"
                Click="OpenDatePicker"/>
    </inputLayout:SfTextInputLayout.TrailingView>
</inputLayout:SfTextInputLayout>
```

```csharp
private void OpenDatePicker(object sender, RoutedEventArgs e)
{
    var datePicker = new DatePicker();
    // Show date picker in a popup or dialog
    // Update dateTextBox.Text with selected date
}
```

---

## Supported Input Views

The TextInputLayout supports multiple input controls as its `InputView`. Each control type serves different input scenarios.

### InputView Property

Input views are added to the TextInputLayout by setting the `InputView` property. To simplify XAML syntax, the `InputView` property is decorated with the **ContentPropertyAttribute**, allowing you to directly place controls inside the TextInputLayout tag without explicitly specifying `InputView`.

**Simplified XAML Syntax (ContentPropertyAttribute):**
```xaml
<!-- Simplified - InputView is implicit -->
<inputLayout:SfTextInputLayout Hint="Name">
    <TextBox />  <!-- Automatically set as InputView -->
</inputLayout:SfTextInputLayout>

<!-- Explicit - InputView specified -->
<inputLayout:SfTextInputLayout Hint="Name" InputView="{Binding ElementName=myTextBox}"/>
```

### Architecture Diagram

```
SfTextInputLayout (Container)
        │
        ├─ Hint Label
        ├─ Leading View (optional)
        ├─ InputView ────┬─ TextBox
        │                ├─ PasswordBox
        │                ├─ ComboBox
        │                ├─ ComboBoxAdv
        │                ├─ SfTextBoxExt (Autocomplete)
        │                ├─ DatePicker
        │                ├─ SfDatePicker
        │                ├─ SfTimePicker
        │                ├─ UpDown
        │                ├─ SfMaskedEdit
        │                ├─ IntegerTextBox
        │                ├─ DoubleTextBox
        │                ├─ PercentTextBox
        │                └─ CurrencyTextBox
        ├─ Trailing View (optional)
        └─ Assistive Labels (HelperText/ErrorText)
```

### 1. TextBox

**Purpose:** Standard single-line or multi-line text input

**When to use:**
- Username, name, address fields
- General text input
- Multi-line comments (with `AcceptsReturn="True"`)

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Name" 
    HelperText="Enter your name">
    <TextBox />
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout inputLayout = new SfTextInputLayout();
inputLayout.Hint = "Name";
inputLayout.HelperText = "Enter your name";
inputLayout.InputView = new TextBox();
this.Content = inputLayout;
```

**Visual Result:**
```
┌────────────────────────────────┐
│ Name                           │
├────────────────────────────────┤
│ [Text entry here]              │
├────────────────────────────────┤
│ Enter your name                │
└────────────────────────────────┘
```

**Multi-line TextBox:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Comments"
    HelperText="Optional feedback">
    <TextBox AcceptsReturn="True" 
             TextWrapping="Wrap" 
             MinHeight="80"/>
</inputLayout:SfTextInputLayout>
```

### 2. PasswordBox

**Purpose:** Secure password input with masked characters

**When to use:**
- Password fields
- PIN entry
- Any sensitive text input

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Password" 
    HelperText="Enter your password">
    <PasswordBox />
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout inputLayout = new SfTextInputLayout();
inputLayout.Hint = "Password";
inputLayout.HelperText = "Enter your password";
inputLayout.InputView = new PasswordBox();
this.Content = inputLayout;
```

**Visual Result:**
```
┌────────────────────────────────┐
│ Password                       │
├────────────────────────────────┤
│ ••••••••                       │
├────────────────────────────────┤
│ Enter your password            │
└────────────────────────────────┘
```

**Pattern: Password with Strength Indicator**
```csharp
private void PasswordBox_PasswordChanged(object sender, RoutedEventArgs e)
{
    var password = (sender as PasswordBox).Password;
    var strength = CalculatePasswordStrength(password);
    
    passwordLayout.HelperText = $"Password strength: {strength}";
    
    if (strength == "Weak")
        passwordLayout.FocusedForeground = Brushes.Red;
    else if (strength == "Medium")
        passwordLayout.FocusedForeground = Brushes.Orange;
    else
        passwordLayout.FocusedForeground = Brushes.Green;
}
```

### 3. ComboBox

**Purpose:** Standard WPF dropdown selection

**When to use:**
- Selecting from a predefined list
- Country/state selection
- Simple dropdown menus

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Country" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <ComboBox x:Name="comboBox" 
              Width="150" 
              Height="10" 
              ItemsSource="{Binding Countries}"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Country" };
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

ComboBox comboBox = new ComboBox();
comboBox.Width = 150;
comboBox.Height = 10;
comboBox.ItemsSource = viewModel.Countries;

sfTextInputLayout.InputView = comboBox;
this.Content = sfTextInputLayout;
```

**Visual Result:**
```
┌────────────────────────────────┐
│ Country                     ▼  │
├────────────────────────────────┤
│ United States                  │
└────────────────────────────────┘
```

### 4. ComboBoxAdv (Syncfusion)

**Purpose:** Advanced dropdown with additional features

**When to use:**
- Need for multi-selection
- Advanced filtering
- Custom item templates
- Better performance with large datasets

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Country" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <syncfusion:ComboBoxAdv x:Name="comboBox" 
                            ItemsSource="{Binding Countries}" 
                            Width="150" 
                            Height="10"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Country" };
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

ComboBoxAdv comboBox = new ComboBoxAdv();
comboBox.Width = 150;
comboBox.Height = 10;
comboBox.ItemsSource = viewModel.Countries;

sfTextInputLayout.InputView = comboBox;
this.Content = sfTextInputLayout;
```

### 5. SfTextBoxExt (Autocomplete)

**Purpose:** Text input with autocomplete suggestions

**When to use:**
- Search functionality
- Large predefined lists
- When user needs typing assistance
- Tag/chip input scenarios

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Country" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <syncfusion:SfTextBoxExt 
        AutoCompleteMode="Suggest" 
        Width="250" 
        AutoCompleteSource="{Binding Countries}">
    </syncfusion:SfTextBoxExt>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Country" };
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

SfTextBoxExt sfTextBoxExt = new SfTextBoxExt();
sfTextBoxExt.AutoCompleteMode = AutoCompleteMode.Suggest;
sfTextBoxExt.Width = 250;
sfTextBoxExt.AutoCompleteSource = viewModel.Countries;

sfTextInputLayout.InputView = sfTextBoxExt;
this.Content = sfTextInputLayout;
```

**Visual Result:**
```
┌────────────────────────────────┐
│ Country                        │
├────────────────────────────────┤
│ Un                             │
├────────────────────────────────┤
│ ↓ Suggestions:                 │
│   United States                │
│   United Kingdom               │
│   United Arab Emirates         │
└────────────────────────────────┘
```

### 6. DatePicker

**Purpose:** Standard WPF date selection control

**When to use:**
- Date of birth fields
- Appointment scheduling
- Any date entry requirement

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Date" 
    HelperText="Select your date of birth" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <DatePicker x:Name="datePicker" Width="150"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Date" };
sfTextInputLayout.HelperText = "Select your date of birth";
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

DatePicker datePicker = new DatePicker();
datePicker.Width = 150;

sfTextInputLayout.InputView = datePicker;
this.Content = sfTextInputLayout;
```

### 7. SfDatePicker

**Purpose:** Syncfusion date selection control with enhanced features

**When to use:**
- Need for Syncfusion's advanced date picker
- Custom date formats
- Enhanced styling and templates

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Date" 
    HelperText="Select your date of birth" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <syncfusion:SfDatePicker Width="150"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Date" };
sfTextInputLayout.HelperText = "Select your date of birth";
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

SfDatePicker sfDatePicker = new SfDatePicker();
sfDatePicker.Width = 150;

sfTextInputLayout.InputView = sfDatePicker;
this.Content = sfTextInputLayout;
```

### 8. SfTimePicker

**Purpose:** Syncfusion time selection control

**When to use:**
- Appointment time selection
- Scheduling interfaces
- Time-based forms

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Time" 
    HelperText="Select appointment time" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <syncfusion:SfTimePicker Width="150"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Time" };
sfTextInputLayout.HelperText = "Select appointment time";
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

SfTimePicker sfTimePicker = new SfTimePicker();
sfTimePicker.Width = 150;

sfTextInputLayout.InputView = sfTimePicker;
this.Content = sfTextInputLayout;
```

### 9. UpDown

**Purpose:** Numeric input with increment/decrement buttons

**When to use:**
- Quantity selection
- Numeric value entry
- Increment/decrement scenarios

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Quantity" 
    HelperText="Enter quantity" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <syncfusion:UpDown Width="150" Height="25" MinValue="0" MaxValue="100" Value="1"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Quantity" };
sfTextInputLayout.HelperText = "Enter quantity";
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

UpDown upDown = new UpDown();
upDown.Width = 150;
upDown.Height = 25;
upDown.MinValue = 0;
upDown.MaxValue = 100;
upDown.Value = 1;

sfTextInputLayout.InputView = upDown;
this.Content = sfTextInputLayout;
```

### 10. SfMaskedEdit

**Purpose:** Masked text input for formatted entries

**When to use:**
- Phone numbers
- Social security numbers
- Any formatted text input

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Phone Number" 
    HelperText="Enter your phone number" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <syncfusion:SfMaskedEdit x:Name="sfMaskedEdit" Width="150" Height="25" 
                             MaskType="Simple" Mask="(###) ###-####"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Phone Number" };
sfTextInputLayout.HelperText = "Enter your phone number";
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

SfMaskedEdit sfMaskedEdit = new SfMaskedEdit();
sfMaskedEdit.Width = 150;
sfMaskedEdit.Height = 25;
sfMaskedEdit.MaskType = MaskType.Simple;
sfMaskedEdit.Mask = "(###) ###-####";

sfTextInputLayout.InputView = sfMaskedEdit;
this.Content = sfTextInputLayout;
```

### 11. IntegerTextBox

**Purpose:** Numeric input restricted to integer values

**When to use:**
- Age fields
- Count or quantity input
- Whole number values

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Age" 
    HelperText="Enter your age" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <syncfusion:IntegerTextBox x:Name="integerTextBox" Width="150" Height="25" 
                                MinValue="0" MaxValue="120" Value="25"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Age" };
sfTextInputLayout.HelperText = "Enter your age";
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

IntegerTextBox integerTextBox = new IntegerTextBox();
integerTextBox.Width = 150;
integerTextBox.Height = 25;
integerTextBox.MinValue = 0;
integerTextBox.MaxValue = 120;
integerTextBox.Value = 25;

sfTextInputLayout.InputView = integerTextBox;
this.Content = sfTextInputLayout;
```

### 12. DoubleTextBox

**Purpose:** Numeric input for double/decimal values

**When to use:**
- Price fields
- Measurement values
- Decimal numeric input

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Price" 
    HelperText="Enter the price" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <syncfusion:DoubleTextBox x:Name="doubleTextBox" Width="150" Height="25" 
                              MinValue="0" MaxValue="10000" Value="99.99"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Price" };
sfTextInputLayout.HelperText = "Enter the price";
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

DoubleTextBox doubleTextBox = new DoubleTextBox();
doubleTextBox.Width = 150;
doubleTextBox.Height = 25;
doubleTextBox.MinValue = 0;
doubleTextBox.MaxValue = 10000;
doubleTextBox.Value = 99.99;

sfTextInputLayout.InputView = doubleTextBox;
this.Content = sfTextInputLayout;
```

### 13. PercentTextBox

**Purpose:** Numeric input formatted as percentage

**When to use:**
- Discount fields
- Tax rates
- Percentage values

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Discount" 
    HelperText="Enter the discount percentage" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <syncfusion:PercentTextBox x:Name="percentTextBox" Width="150" Height="25" 
                                MinValue="0" MaxValue="100" PercentValue="10"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Discount" };
sfTextInputLayout.HelperText = "Enter the discount percentage";
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

PercentTextBox percentTextBox = new PercentTextBox();
percentTextBox.Width = 150;
percentTextBox.Height = 25;
percentTextBox.MinValue = 0;
percentTextBox.MaxValue = 100;
percentTextBox.PercentValue = 10;

sfTextInputLayout.InputView = percentTextBox;
this.Content = sfTextInputLayout;
```

### 14. CurrencyTextBox

**Purpose:** Numeric input formatted as currency

**When to use:**
- Price or amount fields
- Financial forms
- Money values

**XAML Example:**
```xaml
<inputLayout:SfTextInputLayout 
    Hint="Amount" 
    HelperText="Enter the amount" 
    VerticalAlignment="Center" 
    HorizontalAlignment="Center">
    <syncfusion:CurrencyTextBox x:Name="currencyTextBox" Width="150" Height="25" 
                                MinValue="0" MaxValue="100000" Value="1000"/>
</inputLayout:SfTextInputLayout>
```

**C# Example:**
```csharp
SfTextInputLayout sfTextInputLayout = new SfTextInputLayout() { Hint = "Amount" };
sfTextInputLayout.HelperText = "Enter the amount";
sfTextInputLayout.HorizontalAlignment = HorizontalAlignment.Center;
sfTextInputLayout.VerticalAlignment = VerticalAlignment.Center;

CurrencyTextBox currencyTextBox = new CurrencyTextBox();
currencyTextBox.Width = 150;
currencyTextBox.Height = 25;
currencyTextBox.MinValue = 0;
currencyTextBox.MaxValue = 100000;
currencyTextBox.Value = 1000;

sfTextInputLayout.InputView = currencyTextBox;
this.Content = sfTextInputLayout;
```

### Limitations

The following are the limitations when using [DatePicker](https://learn.microsoft.com/en-us/dotnet/desktop/wpf/controls/datepicker), [SfDatePicker](https://help.syncfusion.com/wpf/datepicker/overview) and [SfTimePicker](https://help.syncfusion.com/wpf/timepicker/overview) as the InputView of SfTextInputLayout.

1. The hint is always displayed in the `AlwaysFloat` state and does not move to the inline position based on the control's focus state or the presence of a selected date/time value.

2. When `CharCountVisibility` is enabled, the character count is always displayed as `0`, regardless of the selected date or time value.

---

## Best Practices

### 1. **Icon Selection Guidelines**

| Purpose | Recommended Icon | Position |
|---------|-----------------|----------|
| Search | 🔍 (U+1F50D) | Leading, Inside |
| User/Profile | 👤 (U+1F464) | Leading, Inside |
| Email | ✉ (U+2709) | Leading, Inside |
| Password | 🔒 (U+1F512) | Leading, Inside |
| Calendar/Date | 📅 (U+1F4C5) | Trailing, Inside |
| Clear/Close | ✖ (U+2716) | Trailing, Inside |
| Validation Success | ✓ (U+2713) | Trailing, Inside |
| Validation Error | ✗ (U+2717) | Trailing, Inside |
| Help/Info | ℹ (U+2139) | Trailing, Outside |
| Dropdown | ▼ (U+25BC) | Trailing, Inside |

### 2. **Icon Sizing Standards**

```csharp
public static class IconSizes
{
    public const double Small = 14;      // For dense layouts
    public const double Medium = 18;     // Standard size
    public const double Large = 24;      // Prominent features
    public const double Touch = 32;      // Touch-friendly buttons
}
```

### 3. **Choosing the Right Input View**

```csharp
public static UIElement GetInputViewForScenario(InputScenario scenario)
{
    return scenario switch
    {
        InputScenario.FreeText => new TextBox(),
        InputScenario.SecurePassword => new PasswordBox(),
        InputScenario.SmallList => new ComboBox(), // < 100 items
        InputScenario.LargeList => new ComboBoxAdv(), // > 100 items
        InputScenario.SearchWithSuggestions => new SfTextBoxExt 
        { 
            AutoCompleteMode = AutoCompleteMode.Suggest 
        },
        InputScenario.StandardDate => new DatePicker(),
        InputScenario.AdvancedDate => new SfDatePicker(),
        InputScenario.Time => new SfTimePicker(),
        InputScenario.NumericStepper => new UpDown(),
        InputScenario.MaskedText => new SfMaskedEdit(),
        InputScenario.Integer => new IntegerTextBox(),
        InputScenario.Decimal => new DoubleTextBox(),
        InputScenario.Percentage => new PercentTextBox(),
        InputScenario.Currency => new CurrencyTextBox(),
        InputScenario.MultiLine => new TextBox 
        { 
            AcceptsReturn = true, 
            TextWrapping = TextWrapping.Wrap 
        },
        _ => new TextBox()
    };
}
```

### 4. **Icon Accessibility**

```xaml
<!-- Good: Includes accessible label -->
<inputLayout:SfTextInputLayout.LeadingView>
    <Label Content="🔍" 
           AutomationProperties.Name="Search icon"
           FontSize="18"/>
</inputLayout:SfTextInputLayout.LeadingView>

<!-- Better: Use semantic button for interactive icons -->
<inputLayout:SfTextInputLayout.TrailingView>
    <Button Content="✖" 
            AutomationProperties.Name="Clear search"
            Background="Transparent"
            BorderThickness="0"/>
</inputLayout:SfTextInputLayout.TrailingView>
```

### 5. **Performance with Large Datasets**

```csharp
// Use ComboBoxAdv for better performance
public void SetupLargeDatasetInput(SfTextInputLayout layout, List<string> data)
{
    if (data.Count > 100)
    {
        // Use ComboBoxAdv for virtualization support
        var comboBox = new ComboBoxAdv
        {
            ItemsSource = data,
            EnableVirtualization = true
        };
        layout.InputView = comboBox;
    }
    else
    {
        // Standard ComboBox is fine
        layout.InputView = new ComboBox { ItemsSource = data };
    }
}
```

### 6. **Dynamic Icon Updates**

```csharp
public void UpdateValidationIcon(SfTextInputLayout layout, ValidationState state)
{
    Label icon = new Label
    {
        FontSize = 18,
        VerticalAlignment = VerticalAlignment.Center
    };
    
    switch (state)
    {
        case ValidationState.Valid:
            icon.Content = "✓";
            icon.Foreground = Brushes.Green;
            layout.HasError = false;
            break;
        case ValidationState.Invalid:
            icon.Content = "✗";
            icon.Foreground = Brushes.Red;
            layout.HasError = true;
            break;
        case ValidationState.Pending:
            icon.Content = "⏳";
            icon.Foreground = Brushes.Orange;
            layout.HasError = false;
            break;
    }
    
    layout.TrailingView = icon;
}
```

---

## Complete Examples

### Example 1: Login Form with Icons

```xaml
<StackPanel Width="300" Margin="20">
    <!-- Username Field -->
    <inputLayout:SfTextInputLayout
        Hint="Username"
        ContainerType="Outlined"
        LeadingViewPosition="Inside"
        Margin="0,0,0,16">
        <TextBox />
        <inputLayout:SfTextInputLayout.LeadingView>
            <Label Content="👤" FontSize="18" Foreground="Gray"/>
        </inputLayout:SfTextInputLayout.LeadingView>
    </inputLayout:SfTextInputLayout>
    
    <!-- Password Field with Toggle -->
    <inputLayout:SfTextInputLayout
        x:Name="passwordLayout"
        Hint="Password"
        ContainerType="Outlined"
        LeadingViewPosition="Inside"
        TrailingViewPosition="Inside">
        <PasswordBox x:Name="passwordBox"/>
        <inputLayout:SfTextInputLayout.LeadingView>
            <Label Content="🔒" FontSize="18" Foreground="Gray"/>
        </inputLayout:SfTextInputLayout.LeadingView>
        <inputLayout:SfTextInputLayout.TrailingView>
            <Button Content="👁" 
                    Background="Transparent" 
                    BorderThickness="0"
                    Cursor="Hand"/>
        </inputLayout:SfTextInputLayout.TrailingView>
    </inputLayout:SfTextInputLayout>
</StackPanel>
```

### Example 2: Search with Autocomplete

```xaml
<inputLayout:SfTextInputLayout
    Hint="Search countries"
    ContainerType="Filled"
    LeadingViewPosition="Inside"
    TrailingViewPosition="Inside">
    <syncfusion:SfTextBoxExt 
        x:Name="searchBox"
        AutoCompleteMode="SuggestAppend"
        AutoCompleteSource="{Binding Countries}"/>
    <inputLayout:SfTextInputLayout.LeadingView>
        <Label Content="🔍" FontSize="18" Foreground="#666"/>
    </inputLayout:SfTextInputLayout.LeadingView>
    <inputLayout:SfTextInputLayout.TrailingView>
        <Button Content="✖" 
                Background="Transparent"
                BorderThickness="0"
                Visibility="{Binding ElementName=searchBox, Path=Text.Length,
                           Converter={StaticResource HasTextConverter}}"/>
    </inputLayout:SfTextInputLayout.TrailingView>
</inputLayout:SfTextInputLayout>
```

### Example 3: Date Picker

```xaml
<inputLayout:SfTextInputLayout
    Hint="Birth date"
    ContainerType="Outlined"
    TrailingViewPosition="Inside">
    <TextBox x:Name="dateTextBox" IsReadOnly="True"/>
    <inputLayout:SfTextInputLayout.TrailingView>
        <Button Content="📅" 
                FontSize="18"
                Background="Transparent"
                BorderThickness="0"
                Click="ShowDatePicker"
                Cursor="Hand"/>
    </inputLayout:SfTextInputLayout.TrailingView>
</inputLayout:SfTextInputLayout>
```

### Example 4: Currency Input

```xaml
<inputLayout:SfTextInputLayout
    Hint="Amount"
    ContainerType="Outlined"
    LeadingViewPosition="Outside">
    <TextBox />
    <inputLayout:SfTextInputLayout.LeadingView>
        <Label Content="$" 
               FontSize="20" 
               FontWeight="Bold"
               Foreground="#2E7D32"
               VerticalAlignment="Center"/>
    </inputLayout:SfTextInputLayout.LeadingView>
</inputLayout:SfTextInputLayout>
```

---

## Related Topics

- [Customization](customization.md) - Color and styling options
- [Hint Configuration](hint-configuration.md) - Hint label positioning and behavior
- [Assistive Labels](assistive-labels.md) - Helper text and error messages
- [Container Types](container-type.md) - Outlined, Filled, and None containers
- [Advanced Features](advanced-features.md) - RTL support and complete API reference

## Common Pitfalls to Avoid

1. **Missing event handlers**: Remember to implement click handlers for interactive icons.
2. **Icon size inconsistency**: Use consistent font sizes across your application.
3. **Wrong position choice**: Inside is better for functional icons, Outside for informational ones.
4. **Accessibility neglect**: Always add `AutomationProperties.Name` for screen readers.
5. **Performance with ComboBox**: Use ComboBoxAdv for lists with > 100 items.
6. **Date/Time picker limitations**: When using DatePicker, SfDatePicker, or SfTimePicker, the hint is always displayed in the `AlwaysFloat` state, and character count (if enabled) will always show `0`.

## Summary

The WPF TextInputLayout provides powerful customization through:
- **Leading and Trailing Views** for contextual icons and actions
- **Flexible positioning** (Inside/Outside) for optimal layout
- **Multiple input view types** (TextBox, PasswordBox, ComboBox, ComboBoxAdv, SfTextBoxExt, DatePicker, SfDatePicker, SfTimePicker, UpDown, SfMaskedEdit, IntegerTextBox, DoubleTextBox, PercentTextBox, CurrencyTextBox)

By combining these features effectively, you can create intuitive, beautiful input forms that enhance user experience.
