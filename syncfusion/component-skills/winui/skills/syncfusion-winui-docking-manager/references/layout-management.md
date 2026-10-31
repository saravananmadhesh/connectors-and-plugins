# Layout Management

Place, arrange, and manage pane layouts with XAML, code, and drag-and-drop.

## Declarative XAML Layout

**Two-Column:** Left sidebar + center document
```xaml
<docking:DockPane Header="Tools" DockDirection="Left" DockState="Docked" Width="200"/>
<docking:DockPane Header="Doc" DockState="Document"/>
```

**Three-Column (IDE):** Left/Right panels + center documents
```xaml
<docking:DockPane Header="Explorer" DockDirection="Left" Width="200"/>
<docking:DockPane Header="Props" DockDirection="Right" Width="250"/>
<docking:DockPane Header="Doc" DockState="Document"/>
```

**Full Layout:** Ribbon + L/R/B panels + center documents

## Programmatic Arrangement

Build layouts from configuration or create layout profiles:

```csharp
// Add panes from config
foreach(var cfg in configs)
    dockingManager.Panes.Add(new DockPane { Header = cfg.Header, DockDirection = cfg.Direction });

// Apply layout profiles
dockingManager.Panes.Clear();
dockingManager.Panes.Add(new DockPane { Header = "Tools", DockDirection = DockDirection.Left });
```

## Drag-and-Drop

Panes are draggable by default:
```csharp
pane.DragCompleted += (s, e) => Debug.WriteLine($"Dropped: {pane.Header}");
pane.PreviewDockChanged += (s, e) => Debug.WriteLine($"Will dock to: {e.PreviewDockDirection}");
```

**Restrict drop targets:** `pane.AllowedDropDirection = DockDirection.Left | DockDirection.Right;`

**Show dock indicators:** `<docking:SfDockingManager ShowDockIndicators="True"/>`

## Resizable Layouts

Set `MinWidth/MaxWidth/MinHeight/MaxHeight` to constrain resize. Handle size changes:

```csharp
pane.SizeChanged += (s, e) => Debug.WriteLine($"Size: {e.NewSize}");
```

## Dynamic Layout Changes

**Show/Hide:** `pane.Visibility = Visibility.Collapsed/Visible`

**Move:** `pane.DockDirection = DockDirection.Right;` then adjust width/height

**Remove:** `dockingManager.Panes.Remove(pane);`

**Add:** `dockingManager.Panes.Add(new DockPane { Header = "New" });`

**Query:** Find panes with `LINQ` queries:
```csharp
var toolsPane = dockingManager.Panes.FirstOrDefault(p => p.Header == "Tools");
var docCount = dockingManager.Panes.Count(p => p.DockState == DockState.Document);
```

    var leftPanes = dockingManager.Panes
        .Where(p => p.DockDirection == DockDirection.Left)
        .ToList();

    Debug.WriteLine($"Left edge: {leftPanes.Count} panes");
    var leftWidth = leftPanes.Sum(p => p.Width);
    Debug.WriteLine($"Total left width: {leftWidth}");

    var rightPanes = dockingManager.Panes
        .Where(p => p.DockDirection == DockDirection.Right)
        .ToList();

    Debug.WriteLine($"Right edge: {rightPanes.Count} panes");
    
    var documents = dockingManager.Panes
        .Where(p => p.DockState == DockState.Document)
        .ToList();

    Debug.WriteLine($"Documents: {documents.Count}");
    foreach (var doc in documents)
    {
        Debug.WriteLine($"  - {doc.Header} (Active: {doc.IsActive})");
    }
}
```

### Export Layout Information

```csharp
private string ExportLayoutInfo()
{
    var sb = new StringBuilder();

    foreach (var pane in dockingManager.Panes)
    {
        sb.AppendLine($"Header: {pane.Header}");
        sb.AppendLine($"  State: {pane.DockState}");
        sb.AppendLine($"  Direction: {pane.DockDirection}");
        sb.AppendLine($"  Size: {pane.Width}x{pane.Height}");
        sb.AppendLine();
    }

    return sb.ToString();
}
```

## Best Practices

1. **Save layout state** - Persist user's layout preferences (see advanced-patterns.md)
2. **Use reasonable constraints** - Set MinWidth/MaxWidth to prevent crushing panes
3. **Test all resolutions** - Ensure layouts look good at different screen sizes
4. **Provide layout presets** - Let users switch between predefined layouts
5. **Handle dynamic content** - Plan for panes that open/close at runtime
6. **Monitor performance** - Be careful with drag operations on complex UIs

