# Events and Commands in WinUI DropDown Color Picker

> **Prerequisite:** Ensure the `Syncfusion.Editors.WinUI` NuGet package is installed and updated to the latest version before using these events and commands.

## Table of Contents
- [Color Selection Events](#color-selection-events)
- [SelectedBrushChanged Event](#selectedbrushchanged-event)
- [Dropdown State Events](#dropdown-state-events)
- [Command Binding](#command-binding)
- [Event Handling Patterns](#event-handling-patterns)
- [Advanced Event Scenarios](#advanced-event-scenarios)

## Color Selection Events

The primary way to respond to user color selections is through events.

### Main Color Events

| Event | When Fired | Use Case |
|-------|-----------|----------|
| `SelectedBrushChanged` | Color selection confirmed | Update UI, save setting |
| `DropDownOpened` | Dropdown opens | Prepare UI, log analytics |
| `DropDownClosed` | Dropdown closes | Cleanup, validation |

## SelectedBrushChanged Event

### Event Details

The `SelectedBrushChanged` event fires when the user confirms a color selection.

**Event Args:** `SelectedBrushChangedEventArgs`
- `OldBrush`: Previously selected brush
- `NewBrush`: Newly selected brush

### Basic Event Handler

```csharp
colorPicker.SelectedBrushChanged += ColorPicker_SelectedBrushChanged;

private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    var oldBrush = e.OldBrush as SolidColorBrush;
    var newBrush = e.NewBrush as SolidColorBrush;
    
    Debug.WriteLine($"Color changed from {oldBrush?.Color} to {newBrush?.Color}");
}
```

### XAML Event Binding

```xaml
<editors:SfDropDownColorPicker SelectedBrushChanged="ColorPicker_SelectedBrushChanged" />
```

### Getting Color Information

```csharp
private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    // Get new color
    if (e.NewBrush is SolidColorBrush solidBrush)
    {
        Color color = solidBrush.Color;
        byte red = color.R;
        byte green = color.G;
        byte blue = color.B;
        byte alpha = color.A;
        
        Debug.WriteLine($"RGB: ({red}, {green}, {blue}), Alpha: {alpha}");
    }
    
    // Get old color for comparison
    if (e.OldBrush is SolidColorBrush oldBrush)
    {
        Debug.WriteLine($"Previous color: {oldBrush.Color}");
    }
}
```

### Use Cases for SelectedBrushChanged

**Apply Color to UI Element:**
```csharp
private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    targetElement.Background = e.NewBrush;
}
```

**Save to Settings:**
```csharp
private void ColorPicker_SelectedBrushChanged(object sender, SelectedBrushChangedEventArgs e)
{
    var brush = e.NewBrush as SolidColorBrush;
    if (brush != null)
    {
        string hexColor = ColorToHex(brush.Color);
        AppSettings.SaveSetting("SelectedColor", hexColor);
    }
}
```

**Data Binding (MVVM):**
```csharp
private SolidColorBrush _selectedColor = new SolidColorBrush(Colors.Blue);
public SolidColorBrush SelectedColor
{
    get => _selectedColor;
    set
    {
        if (_selectedColor != value)
        {
            _selectedColor = value;
            OnPropertyChanged();
        }
    }
}
```

```xaml
<editors:SfDropDownColorPicker SelectedBrush="{x:Bind ViewModel.SelectedColor, Mode=TwoWay}" />
```

## Dropdown State Events

### DropDownOpened Event

Fires when the user clicks to open the dropdown:

```csharp
colorPicker.DropDownOpened += ColorPicker_DropDownOpened;

private void ColorPicker_DropDownOpened(object sender, EventArgs e)
{
    Debug.WriteLine("Dropdown opened");
    // Prepare UI, log analytics, etc.
}
```

**Use Cases:**
- Log user analytics
- Initialize color picker state
- Focus-related preparation
- Update UI state indicators

### DropDownClosed Event

Fires when the dropdown closes (user clicks OK, Cancel, or clicks outside):

```csharp
colorPicker.DropDownClosed += ColorPicker_DropDownClosed;

private void ColorPicker_DropDownClosed(object sender, EventArgs e)
{
    Debug.WriteLine("Dropdown closed");
    // Cleanup, validation, etc.
}
```

**Use Cases:**
- Validate final color selection
- Cleanup temporary state
- Apply transitions or animations
- Save analytics data

### Complete Dropdown Lifecycle

```csharp
public sealed partial class ColorPickerPage : Page
{
    public ColorPickerPage()
    {
        this.InitializeComponent();
        
        colorPicker.DropDownOpened += (s, e) =>
        {
            statusText.Text = "Color picker open...";
            Debug.WriteLine("Dropdown opened");
        };
        
        colorPicker.SelectedBrushChanged += (s, e) =>
        {
            statusText.Text = $"Color selected: {(e.NewBrush as SolidColorBrush)?.Color}";
            Debug.WriteLine($"Color changed: {e.OldBrush} → {e.NewBrush}");
        };
        
        colorPicker.DropDownClosed += (s, e) =>
        {
            statusText.Text = "Color picker closed";
            Debug.WriteLine("Dropdown closed");
        };
    }
}
```

## Command Binding

### Command Basics

Commands provide a way to handle button clicks in split mode:

```xaml
<editors:SfDropDownColorPicker DropDownMode="Split"
                               Command="{x:Bind ApplyColorCommand}" />
```

### ICommand Implementation

```csharp
public class RelayCommand : ICommand
{
    private readonly Action _execute;
    private readonly Func<bool> _canExecute;
    
    public RelayCommand(Action execute, Func<bool> canExecute = null)
    {
        _execute = execute ?? throw new ArgumentNullException(nameof(execute));
        _canExecute = canExecute;
    }
    
    public event EventHandler CanExecuteChanged;
    
    public bool CanExecute(object parameter) => _canExecute?.Invoke() ?? true;
    
    public void Execute(object parameter) => _execute();
    
    public void RaiseCanExecuteChanged()
    {
        CanExecuteChanged?.Invoke(this, EventArgs.Empty);
    }
}
```

### Simple Command

```csharp
public ICommand ApplyColorCommand => new RelayCommand(() =>
{
    var brush = colorPicker.SelectedBrush as SolidColorBrush;
    if (brush != null)
    {
        targetElement.Background = brush;
    }
});
```

### Command with Conditional Execution

```csharp
public ICommand ApplyColorCommand => new RelayCommand(
    execute: () =>
    {
        ApplyColor();
    },
    canExecute: () =>
    {
        // Only enable if color picker has a selection
        return colorPicker?.SelectedBrush != null;
    }
);

private void ApplyColor()
{
    var brush = colorPicker.SelectedBrush;
    targetElement.Background = brush;
}
```

## Event Handling Patterns

### Pattern 1: Simple Event Subscription

```csharp
colorPicker.SelectedBrushChanged += (sender, e) =>
{
    myElement.Fill = e.NewBrush;
};
```

### Pattern 2: Named Event Handler

```csharp
// In constructor or code-behind
colorPicker.SelectedBrushChanged += OnColorChanged;

private void OnColorChanged(object sender, SelectedBrushChangedEventArgs e)
{
    UpdateUI(e.NewBrush);
}

private void UpdateUI(Brush brush)
{
    // Update multiple UI elements
    myElement.Fill = brush;
    previewBox.Background = brush;
}
```

### Pattern 3: Deferred Handling with DispatcherQueue

For async operations on color change:

```csharp
colorPicker.SelectedBrushChanged += async (sender, e) =>
{
    // Perform async operation (e.g., save to database)
    await DispatcherQueue.GetForCurrentThread().EnqueueAsync(
        async () => await SaveColorAsync(e.NewBrush)
    );
};

private async Task SaveColorAsync(Brush brush)
{
    // Async operation
    await Task.Delay(100); // Simulate work
    Debug.WriteLine($"Color saved: {brush}");
}
```

### Pattern 4: Event Aggregator Pattern (MVVM)

Decouple event handling from the view:

```csharp
public class ColorChangeMessage
{
    public Brush OldBrush { get; set; }
    public Brush NewBrush { get; set; }
}

// In view
public sealed partial class ColorPickerPage : Page
{
    public ColorPickerPage()
    {
        this.InitializeComponent();
        colorPicker.SelectedBrushChanged += (s, e) =>
        {
            WeakReferenceMessenger.Default.Send(new ColorChangeMessage
            {
                OldBrush = e.OldBrush,
                NewBrush = e.NewBrush
            });
        };
    }
}

// In other pages/viewmodels
public MyViewModel()
{
    WeakReferenceMessenger.Default.Register<ColorChangeMessage>(
        this,
        (recipient, message) =>
        {
            HandleColorChange(message.NewBrush);
        }
    );
}

private void HandleColorChange(Brush newColor)
{
    // React to color change
}
```

## Advanced Event Scenarios

### Scenario 1: Validate and Reject Invalid Colors

```csharp
colorPicker.SelectedBrushChanged += (sender, e) =>
{
    var brush = e.NewBrush as SolidColorBrush;
    if (brush != null && !IsValidColor(brush.Color))
    {
        // Revert to old color
        colorPicker.SelectedBrush = e.OldBrush;
        ShowErrorMessage("Selected color is not allowed");
    }
};

private bool IsValidColor(Color color)
{
    // Example: Only allow bright colors (sum of RGB > 400)
    return (color.R + color.G + color.B) > 400;
}
```

### Scenario 2: Cascade Color Changes

When one color picker changes, update others:

```csharp
public sealed partial class ColorPalettePage : Page
{
    private SfDropDownColorPicker[] _pickers;
    
    public ColorPalettePage()
    {
        this.InitializeComponent();
        
        _pickers = new[] { primaryPicker, secondaryPicker, accentPicker };
        
        foreach (var picker in _pickers)
        {
            picker.SelectedBrushChanged += (s, e) =>
            {
                OnAnyColorChanged(e.NewBrush);
            };
        }
    }
    
    private void OnAnyColorChanged(Brush newBrush)
    {
        // Update dependent colors
        UpdateComplementaryColors(newBrush);
    }
    
    private void UpdateComplementaryColors(Brush baseBrush)
    {
        var solidBrush = baseBrush as SolidColorBrush;
        if (solidBrush != null)
        {
            var complementary = GetComplementaryColor(solidBrush.Color);
            accentPicker.SelectedBrush = new SolidColorBrush(complementary);
        }
    }
    
    private Color GetComplementaryColor(Color color)
    {
        // Color theory: complementary is opposite on the color wheel
        return Color.FromArgb(color.A, 
                            (byte)(255 - color.R),
                            (byte)(255 - color.G),
                            (byte)(255 - color.B));
    }
}
```

### Scenario 3: Debounce Rapid Color Changes

Prevent excessive updates during rapid user interactions:

```csharp
public sealed partial class ColorPickerPage : Page
{
    private DispatcherTimer _debounceTimer;
    private Brush _pendingBrush;
    
    public ColorPickerPage()
    {
        this.InitializeComponent();
        
        _debounceTimer = new DispatcherTimer();
        _debounceTimer.Interval = TimeSpan.FromMilliseconds(500);
        _debounceTimer.Tick += (s, e) =>
        {
            _debounceTimer.Stop();
            ApplyColorChange(_pendingBrush);
        };
        
        colorPicker.SelectedBrushChanged += (s, e) =>
        {
            _pendingBrush = e.NewBrush;
            _debounceTimer.Stop();
            _debounceTimer.Start();
        };
    }
    
    private void ApplyColorChange(Brush brush)
    {
        // Apply after debounce delay
        targetElement.Background = brush;
    }
}
```

### Scenario 4: Track Color History

Maintain history of color selections:

```csharp
public sealed partial class ColorPickerPage : Page
{
    private List<Color> _colorHistory = new();
    private const int MaxHistoryItems = 10;
    
    public ColorPickerPage()
    {
        this.InitializeComponent();
        
        colorPicker.SelectedBrushChanged += (s, e) =>
        {
            if (e.NewBrush is SolidColorBrush solidBrush)
            {
                AddToHistory(solidBrush.Color);
            }
        };
    }
    
    private void AddToHistory(Color color)
    {
        // Don't add duplicate consecutive colors
        if (_colorHistory.Count > 0 && _colorHistory.Last() == color)
            return;
        
        _colorHistory.Add(color);
        
        if (_colorHistory.Count > MaxHistoryItems)
        {
            _colorHistory.RemoveAt(0);
        }
        
        UpdateHistoryUI();
    }
    
    private void UpdateHistoryUI()
    {
        // Display color history as swatches
        historyPanel.Children.Clear();
        
        foreach (var color in _colorHistory)
        {
            var swatch = new Rectangle
            {
                Fill = new SolidColorBrush(color),
                Width = 30,
                Height = 30,
                Margin = new Thickness(2)
            };
            
            historyPanel.Children.Add(swatch);
        }
    }
}
```

### Scenario 5: Two-Way Binding with Validation

Combine events with data binding:

```csharp
public class ColorPickerViewModel : INotifyPropertyChanged
{
    private SolidColorBrush _selectedColor;
    
    public SolidColorBrush SelectedColor
    {
        get => _selectedColor;
        set
        {
            if (_selectedColor != value)
            {
                if (ValidateColor(value))
                {
                    _selectedColor = value;
                    OnPropertyChanged();
                }
                else
                {
                    ErrorMessage = "Invalid color selection";
                }
            }
        }
    }
    
    private bool ValidateColor(SolidColorBrush brush)
    {
        // Your validation logic
        return brush != null;
    }
    
    public event PropertyChangedEventHandler PropertyChanged;
    
    protected void OnPropertyChanged([CallerMemberName] string name = null)
    {
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}
```

```xaml
<editors:SfDropDownColorPicker SelectedBrush="{x:Bind ViewModel.SelectedColor, Mode=TwoWay}" />
```
