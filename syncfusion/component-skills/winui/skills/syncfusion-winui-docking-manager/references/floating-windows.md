# Floating Windows

Independent windows for side-by-side comparison and multi-monitor support.

## Creating Floating Windows

Floating windows are independent panes that can move across the desktop:

**XAML:**
```xaml
<docking:DockPane Header="Comp" DockState="Floating" Left="100" Top="100" Width="600" Height="400"/>
```

**Programmatically:**
```csharp
var pane = new DockPane { Header = "Analysis", DockState = DockState.Floating, Left = 200, Top = 200 };
dockingManager.Panes.Add(pane);
```

**Convert existing:** `pane.DockState = DockState.Floating;`

**Drag to float:** Users drag panes outside boundary to auto-float (AllowDrag=true by default)

## Positioning & Properties

**Properties:** `Left`, `Top` (screen position), `Width`, `Height`, `WindowState`, `ShowInTaskbar`, `TopMost`

**Center on screen:**
```csharp
var b = DisplayInformation.GetForCurrentView().Bounds;
pane.Left = (b.Width - pane.Width) / 2;
pane.Top = (b.Height - pane.Height) / 2;
```

**Cascade:** `for (int i = 0; i < 3; i++) dockingManager.Panes.Add(new DockPane { Header = $"Win {i}", DockState = DockState.Floating, Left = 100 + (i * 30), Top = 100 + (i * 30) });`


## Re-Docking & Events

**Convert back to docked:**
```csharp
var floating = dockingManager.Panes.First(p => p.DockState == DockState.Floating);
floating.DockState = DockState.Docked;  // Or just remove it
dockingManager.Panes.Remove(floating);
```

**Handle state changes:**
```csharp
pane.DockStateChanged += (s, e) => Debug.WriteLine($"State: {e.NewValue}");
pane.Closing += (s, e) => Debug.WriteLine($"Closing: {pane.Header}");
```

**Note:** Users can drag floating windows back into the main area to dock (title bar drag with AllowDrag=true)
        
        DockPane pane = new DockPane()
        {
            Header = state.Header,
            DockState = DockState.Floating,
            Left = state.X,
            Top = state.Y,
            Width = state.Width,
            Height = state.Height
        };

        dockingManager.Panes.Add(pane);
    }
}
```

## Multi-Monitor Considerations

### Detect Available Monitors

```csharp
private List<DisplayArea> GetMonitorBounds()
{
    var displayAreas = new List<DisplayArea>();
    
    // Get information for each monitor
    var displayInfo = DisplayInformation.GetForCurrentView();
    displayAreas.Add(new DisplayArea()
    {
        Width = displayInfo.Bounds.Width,
        Height = displayInfo.Bounds.Height,
        X = displayInfo.Bounds.Left,
        Y = displayInfo.Bounds.Top
    });

    return displayAreas;
}

struct DisplayArea
{
    public double X { get; set; }
    public double Y { get; set; }
    public double Width { get; set; }
    public double Height { get; set; }
}
```

### Position Window on Specific Monitor

```csharp
private void PositionOnSecondaryMonitor(DockPane floatingPane)
{
    // In a real implementation, enumerate all monitors
    // For now, assume secondary monitor is to the right
    
    var primaryDisplay = DisplayInformation.GetForCurrentView().Bounds;
    
    // Assume secondary is 1920x1080 to the right
    floatingPane.Left = primaryDisplay.Width + 100;
    floatingPane.Top = 100;
    floatingPane.Width = 800;
    floatingPane.Height = 600;
}
```

### Monitor Switch Detection

```csharp
private void HandleMonitorChange()
{
    var floating = GetFloatingPanes();

    foreach (var pane in floating)
    {
        // Check if floating window is still on visible monitor
        if (!IsWindowOnVisibleMonitor(pane))
        {
            // Reposition to primary monitor
            pane.Left = 100;
            pane.Top = 100;
        }
    }
}

private bool IsWindowOnVisibleMonitor(DockPane pane)
{
    // Check if window position falls within any connected monitor bounds
    // Implementation depends on monitor enumeration API
    return true;  // Simplified
}
```

### Restore All Windows on Startup

```csharp
private async void RestoreWindowsOnStartup()
{
    // Load saved floating window configurations
    var settings = ApplicationData.Current.LocalSettings;
    
    if (settings.Values.TryGetValue("floating_windows_config", out var config))
    {
        var paneList = JsonConvert.DeserializeObject(config.ToString());
        
        foreach (var paneConfig in paneList)
        {
            // Validate position is on screen
            if (ValidateWindowPosition(paneConfig))
            {
                CreateFloatingPane(paneConfig);
            }
        }
    }
}

private bool ValidateWindowPosition(object config)
{
    // Ensure window isn't off-screen
    // Check against current monitor bounds
    return true;  // Simplified
}
```

## Best Practices

1. **Save floating window state** - Persist positions between application launches
2. **Handle monitor disconnection** - Validate window positions when monitors change
3. **Prevent off-screen windows** - Clamp positions within monitor bounds
4. **Use reasonable defaults** - Position new windows where users can see them
5. **Support multi-monitor users** - Design layouts that work across displays
6. **Performance monitoring** - Multiple floating windows increase memory usage
7. **Accessibility** - Ensure floating windows maintain accessibility features

