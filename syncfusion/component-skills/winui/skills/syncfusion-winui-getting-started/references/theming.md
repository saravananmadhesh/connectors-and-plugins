# WinUI Theming

WinUI 3 uses native Windows theming with two built-in themes: Light and Dark.

---

## Setting Application Theme

### Method 1: In App.xaml (XAML)

Set the theme at application startup using `RequestedTheme`:

```xml
<Application x:Class="YourApp.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             RequestedTheme="Dark">
    
    <Application.Resources>
    </Application.Resources>
    
</Application>
```

**Available values:**
- `Light` - Light theme (default)
- `Dark` - Dark theme

### Method 2: In App.xaml.cs (Code)

Set theme at application startup:

```csharp
using Syncfusion.Licensing;

public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Set application theme before InitializeComponent
        this.RequestedTheme = ApplicationTheme.Dark;
        
        this.InitializeComponent();
    }
}
```

---

## Dynamic Theme Switching

Switch themes at runtime:

```csharp
public partial class MainWindow : Window
{
    public MainWindow()
    {
        this.InitializeComponent();
    }
    
    private void DarkModeButton_Click(object sender, RoutedEventArgs e)
    {
        Application.Current.RequestedTheme = ApplicationTheme.Dark;
    }
    
    private void LightModeButton_Click(object sender, RoutedEventArgs e)
    {
        Application.Current.RequestedTheme = ApplicationTheme.Light;
    }
}
```

---

## System Theme Detection and Persistence

WinUI provides two complementary approaches for theme management:

| Approach | Use Case | Storage | Reactivity |
|----------|----------|---------|-----------|
| **System Theme Detection** | Follow user's OS theme preference | None (OS-level) | One-time at startup |
| **System Theme Listening** | Follow OS theme + react to changes | None (OS-level) | Real-time synchronization |
| **Theme Persistence** | Respect user's explicit choice | LocalSettings | Startup + explicit changes |

---

## System Theme Detection (Startup)

Detect and apply system theme preference at application startup:

```csharp
using Windows.UI.ViewManagement;

public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Apply system theme once at startup
        var uiSettings = new UISettings();
        var color = uiSettings.GetColorValue(UIColorType.Background);
        
        this.RequestedTheme = (color == Windows.UI.Colors.White) 
            ? ApplicationTheme.Light 
            : ApplicationTheme.Dark;
        
        this.InitializeComponent();
    }
}
```

**When to use:** Applications that should simply respect the user's current OS theme at launch.

---

## System Theme Listening (Real-time)

Listen and react to system theme changes in real-time:

```csharp
using Windows.UI.ViewManagement;

public partial class App : Application
{
    private UISettings _uiSettings;
    
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        ApplySystemTheme();
        
        // Listen for system theme changes
        _uiSettings = new UISettings();
        _uiSettings.ColorValuesChanged += (s, e) => 
            DispatcherQueue.TryEnqueue(() => ApplySystemTheme());
        
        this.InitializeComponent();
    }
    
    private void ApplySystemTheme()
    {
        var color = _uiSettings.GetColorValue(UIColorType.Background);
        this.RequestedTheme = (color == Windows.UI.Colors.White) 
            ? ApplicationTheme.Light 
            : ApplicationTheme.Dark;
    }
}
```

**When to use:** Applications that need to dynamically follow OS theme changes without restarting.

---

## Accessibility

WinUI themes automatically support:
- ✓ High Contrast mode
- ✓ WCAG AA compliance
- ✓ Keyboard navigation
- ✓ Screen readers

All Syncfusion WinUI components inherit the application theme automatically.

---

## Custom Theme Creation

Override application resources to create custom color schemes:

```xml
<!-- App.xaml -->
<Application RequestedTheme="Dark">
    <Application.Resources>
        <!-- Custom accent and background colors -->
        <Color x:Key="AppAccentColor">#FF0078D4</Color>
        <SolidColorBrush x:Key="AppBackground" Color="#1E1E1E"/>
        <SolidColorBrush x:Key="AppForeground" Color="#FFFFFF"/>
    </Application.Resources>
</Application>
```

Apply custom resources to controls:

```xml
<!-- MainWindow.xaml -->
<Window Background="{StaticResource AppBackground}">
    <ComboBox Foreground="{StaticResource AppForeground}" />
</Window>
```

---

## Best Practices

1. **Set theme once at startup** to avoid performance impact
2. **Cache theme preferences** to avoid repeated I/O
3. **Test transitions** on target hardware for smooth UX
4. **Use system detection** for automatic theme following

---

## Accessibility and Theming

### High Contrast Mode Support

All Syncfusion themes automatically support Windows High Contrast mode:

```csharp
using Windows.UI.ViewManagement;

public partial class App : Application
{
    public App()
    {
        SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
        
        // Check if high contrast is enabled
        var uiSettings = new UISettings();
        if (uiSettings.HighContrast)
        {
            // High contrast mode is active
            // Themes automatically adjust
        }
        
        this.InitializeComponent();
    }
}
```

### WCAG Compliance

All built-in themes meet WCAG AA standards:
- ✓ Text contrast ratio: ≥4.5:1
- ✓ Large text contrast: ≥3:1
- ✓ Focus indicators clearly visible
- ✓ Component interactions keyboard accessible

---

## Theme Documentation Resources

- **Fluent Design System:** [Microsoft Fluent Design](https://www.microsoft.com/design/fluent)
- **Material Design:** [Google Material Design](https://material.io)
- **WCAG Guidelines:** [W3C WCAG 2.1](https://www.w3.org/WAI/WCAG21/quickref/)
