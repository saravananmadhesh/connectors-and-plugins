# Accessibility and Compact Sizing Configuration for Syncfusion WinUI

> **Requirement:** Update all Syncfusion NuGet packages to the latest version to ensure full accessibility support across all components.

---

## Accessibility Features

### Enable Screen Reader Support

```csharp
using Windows.UI.ViewManagement;

public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Check if screen reader is active
        var accessibilitySettings = new AccessibilitySettings();
        if (accessibilitySettings.ScreenReaderEnabled)
        {
            // Set accessible theme or configuration
            SyncfusionThemesHelper.SetTheme("FluentLight");
        }
        
        this.InitializeComponent();
    }
}
```

### ARIA and Automation Properties

All Syncfusion components support standard WinUI automation properties:

```xml
<editors:SfComboBox 
    x:Name="comboBox"
    PlaceholderText="Select an option"
    AutomationProperties.Name="Selection ComboBox"
    AutomationProperties.HelpText="Select from dropdown list"
    AutomationProperties.AutomationControlType="ComboBox" />

<syncfusion:SfMaskedTextBox
    x:Name="maskedInput"
    MaskType="Simple"
    Mask="(000) 000-0000"
    AutomationProperties.LabeledBy="{x:Bind PhoneLabel}"
    AutomationProperties.Name="Phone Number Input Field" />
```

### High Contrast Mode

Syncfusion themes automatically support high contrast:

```csharp
// High contrast mode is detected automatically
// Components adjust colors for better visibility
// No additional code needed
```

### Color Contrast

All built-in themes meet WCAG AA standards:
- Text contrast ratio: ≥4.5:1
- Large text contrast: ≥3:1
- Component focus indicators clearly visible

### Keyboard Navigation

All components support keyboard navigation:

```xml
<!-- Tab order -->
<editors:SfComboBox x:Name="comboBox1" TabIndex="0" />
<syncfusion:SfMaskedTextBox x:Name="input1" TabIndex="1" />
<editors:SfComboBox x:Name="comboBox2" TabIndex="2" />
```

### Focus Indicators

```csharp
// Focus indicators are built-in and visible
// No additional styling needed
// But can be customized if needed:

<editors:SfComboBox 
    x:Name="comboBox"
    Width="250"
    FocusVisualPrimaryThickness="2"
    FocusVisualSecondaryThickness="1" />
```

---

## Compact Sizing

### When to Use Compact Sizing

- Save space in dense UIs
- Touchscreen-friendly sizing
- Accessibility for users with motor difficulties

### Applying Compact Sizing

**Method 1: Component-Level Sizing**

```xml
<!-- Normal size -->
<editors:SfComboBox x:Name="comboBoxNormal" Width="250" Height="40" Padding="16,8" PlaceholderText="Normal" />

<!-- Compact size -->
<editors:SfComboBox x:Name="comboBoxCompact" Width="250" Height="32" Padding="12,4" PlaceholderText="Compact" />
```

**Method 2: Global Compact Mode**

```csharp
using Syncfusion.WinUI.Controls;

public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Set global size mode
        SfControlsHelper.SetCompactMode(true);
        
        this.InitializeComponent();
    }
}
```

### Size Guidelines

| Mode | Height | Padding | Use Case |
|------|--------|---------|----------|
| Normal | 40px | 16,8 | Standard desktop |
| Compact | 32px | 12,4 | Dense layouts |
| Touch | 44px | 16,12 | Touch interfaces |

---

## Best Practices

### Configuration Order

When setting up Syncfusion WinUI components:

1. Register license first (in App.xaml.cs)
2. Apply theme (before InitializeComponent)
3. Set localization/culture (if needed, see [localization.md](localization.md))
4. Enable accessibility features
5. Set compact mode if needed
6. Initialize components

### Related Configuration

For other configuration options, see:
- **Theming:** [theming.md](theming.md) - Set themes, detect system theme, custom themes
- **Localization:** [localization.md](localization.md) - Language setup, RTL support, culture codes
```
