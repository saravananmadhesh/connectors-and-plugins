# Dock States

Manage pane placement, transitions, and lifecycle.

## Understanding Dock States

Each pane has a `DockState` property that determines how and where it displays:

| State | Position | Behavior |
|-------|----------|----------|
| **Docked** | Fixed edge (L/R/T/B) | Permanently visible |
| **Document** | Center area | Tab in main content |
| **Floating** | Independent window | Separate desktop window |
| **AutoHide** | Collapsed bar | Expands on hover |

## Docked State

Permanently visible, anchored to edges (Left, Right, Top, Bottom):

```xaml
<docking:DockPane Header="Toolbox" DockDirection="Left" DockState="Docked" Width="200"/>
```

Multiple panes on same edge group into tabs. Set `Width` for L/R, `Height` for T/B. Resize with `MinWidth/MaxWidth/MinHeight/MaxHeight`.

## Document State

Center content area with tabs for multiple documents:

```xaml
<docking:DockPane Header="File.cs" DockState="Document"><TextBox Text="Content"/></docking:DockPane>
```

**Manage:** `doc.IsActive = true` to activate, `dockingManager.Panes.Remove(doc)` to close.

## Floating State

Independent windows moveable across desktop:

```xaml
<docking:DockPane Header="Tools" DockState="Floating" Left="100" Top="100" Width="600" Height="400"/>
```

Convert: `pane.DockState = DockState.Floating;` | Position with `Left`, `Top`, `Width`, `Height`

## AutoHide State

Collapsed to thin bar, expands on hover (space-saving):

```xaml
<docking:DockPane Header="Tools" DockDirection="Left" DockState="AutoHide"/>
```

**Control:** `pane.IsAutoHideVisible = true/false` | Pin: `pane.DockState = DockState.Docked`

## Transitions & Events

**Change states:**
```csharp
pane.DockState = DockState.Floating;      // To floating
pane.DockState = DockState.Docked;        // To docked (set DockDirection)
pane.DockState = DockState.AutoHide;      // To auto-hide (set DockDirection)
pane.DockState = DockState.Document;      // To document
```

**Events:**
```csharp
pane.DockStateChanged += (s, e) => Debug.WriteLine($"State: {e.OldValue} → {e.NewValue}");
pane.AutoHideVisibilityChanged += (s, e) => Debug.WriteLine(e.NewValue ? "Expanded" : "Collapsed");
```

## Reading & Querying State

**Get current state:**
```csharp
var pane = dockingManager.Panes[0];
if (pane.DockState == DockState.Docked) Debug.WriteLine($"Docked at {pane.DockDirection}, Size: {pane.Width}x{pane.Height}");
if (pane.DockState == DockState.Floating) Debug.WriteLine($"Floating at ({pane.Left}, {pane.Top})");
if (pane.DockState == DockState.AutoHide) Debug.WriteLine($"AutoHide, Expanded: {pane.IsAutoHideVisible}");
```

**Query by state:**
```csharp
var floating = dockingManager.Panes.Where(p => p.DockState == DockState.Floating).ToList();
var autoHidden = dockingManager.Panes.Where(p => p.DockState == DockState.AutoHide).ToList();
var documents = dockingManager.Panes.Where(p => p.DockState == DockState.Document).ToList();
```

**Check visibility:**
```csharp
bool isVisible = pane.Visibility == Visibility.Visible;
bool isAutoHideExpanded = pane.DockState == DockState.AutoHide && pane.IsAutoHideVisible;
```

## Handling State Changes

**State changed handler:**
```csharp
pane.DockStateChanged += (s, e) => {
  Debug.WriteLine($"State: {e.OldValue} → {e.NewValue}");
  if (e.NewValue == DockState.Floating) { /*handle floating*/ }
  if (e.NewValue == DockState.AutoHide) { /*handle autohide*/ }
    else if (e.NewValue == DockState.AutoHide)
    {
        Debug.WriteLine("Pane is now auto-hidden");
    }
};

dockingManager.Panes.Add(pane);
```

### DockDirectionChanged Event

```csharp
pane.DockDirectionChanged += (s, e) =>
{
    Debug.WriteLine($"Direction changed from {e.OldValue} to {e.NewValue}");
    
    if (e.NewValue == DockDirection.Right)
    { Debug.WriteLine("Pane moved to right edge"); }
};
```

**Prevent state change:**
```csharp
pane.DockStateChanging += (s, e) => {
  if (e.NewValue == DockState.Floating) {
    e.Cancel = true;  // Block floating
    Debug.WriteLine("Floating not allowed");
  }
};
```

## Best Practices

- **Set DockDirection for AutoHide** - Required
- **Test transitions** - Verify all work
- **Handle events** - Keep UI synchronized
- **Validate constraints** - Check Min/MaxWidth/Height
- **Save/restore** - Persist for app restarts

