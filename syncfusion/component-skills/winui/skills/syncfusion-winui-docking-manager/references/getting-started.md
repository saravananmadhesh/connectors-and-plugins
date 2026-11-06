# Getting Started with WinUI DockingManager

Set up DockingManager control and create your first docking layout.

## Prerequisites & Installation

**Requirements:** WinUI 3, .NET 8+, Visual Studio 2022

**Install NuGet package:**
```bash
dotnet add package Syncfusion.DockingManager.WinUI
```

**Add namespace:**
- XAML: `xmlns:docking="using:Syncfusion.UI.Xaml.Docking"`
- C#: `using Syncfusion.UI.Xaml.Docking;`

## Initialize DockingManager

Create DockingManager in XAML or code:

**XAML:**
```xaml
<docking:SfDockingManager x:Name="dockingManager"/>
```

**C#:**
```csharp
var dockingManager = new SfDockingManager();
```

## Add Dock Panes

Dock panes display content in docked positions (left, right, top, bottom):

```xaml
<docking:SfDockingManager x:Name="dockingManager">
    <docking:DockPane Header="Toolbox" DockDirection="Left" DockState="Docked" Width="200">
        <TextBlock Text="Content"/>
    </docking:DockPane>
    <docking:DockPane Header="Properties" DockDirection="Right" DockState="Docked" Width="250"/>
    <docking:DockPane Header="Ribbon" DockDirection="Top" DockState="Docked" Height="100"/>
</docking:SfDockingManager>
```

**Programmatic:** Set `Width` for Left/Right, `Height` for Top/Bottom.

```csharp
var pane = new DockPane { Header = "Tools", DockDirection = DockDirection.Left, DockState = DockState.Docked, Width = 200 };
dockingManager.Panes.Add(pane);
```

## Add Document Panes

Document panes fill the center area. Multiple document panes create tabs:

```xaml
<docking:DockPane Header="MainWindow.xaml" DockState="Document">
    <TextBox AcceptsReturn="True" Text="Main document..."/>
</docking:DockPane>
```

## Understanding Dock States

Each pane has a state that determines how it displays:

| State | Behavior |
|-------|----------|
| **Docked** | Fixed position (left, right, top, bottom) |
| **Document** | Tab in center content area |
| **Floating** | Independent floating window |
| **AutoHide** | Hidden until mouse hover or activation |

See [dock-states.md](dock-states.md) for detailed state management.

## XAML vs Programmatic

**XAML:** Best for static layouts defined at design-time.

**Programmatic:** Best for dynamic panes created at runtime or from data sources.

## Handle Pane Events

Subscribe to pane events:
```csharp
pane.DockStateChanged += (s, e) => Debug.WriteLine($"State: {e.OldValue} → {e.NewValue}");
pane.Closing += (s, e) => { };
pane.Activated += (s, e) => Debug.WriteLine("Activated");
```

**Common events:** DockStateChanged, DockDirectionChanged, Closing, Activated

**Complete example:**
```xaml
<docking:SfDockingManager x:Name="dockingManager">
  <docking:DockPane Header="Explorer" DockDirection="Left" DockState="Docked" Width="200">
    <TextBlock Text="Solution Explorer"/>
  </docking:DockPane>
  <docking:DockPane Header="Output" DockDirection="Bottom" DockState="Docked" Height="150">
    <TextBlock Text="Build output..."/>
  </docking:DockPane>
  <docking:DockPane Header="File1.cs" DockState="Document">
    <TextBox AcceptsReturn="True" Text="Code..."/>
  </docking:DockPane>
</docking:SfDockingManager>
```

## Next Steps

Now that you've set up the basics:

1. **Explore states** - Read [dock-states.md](dock-states.md) to understand pane states
2. **Arrange layouts** - See [layout-management.md](layout-management.md) for advanced arrangement
3. **Use tabs** - Learn [tab-groups.md](tab-groups.md) for grouping documents
4. **Advanced features** - Check [advanced-patterns.md](advanced-patterns.md) for MVVM and persistence

