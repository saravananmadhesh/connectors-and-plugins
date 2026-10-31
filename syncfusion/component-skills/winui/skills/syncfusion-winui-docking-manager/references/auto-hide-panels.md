# Auto-Hide Panels

Collapse to thin bars, expand on demand to maximize workspace.

## Understanding Auto-Hide

Auto-hide panes collapse to thin labeled buttons on edges, expanding on hover/focus to maximize screen space.

**Visual:** Before: `[Tools][Main][Props]` → After: `|[T] Main [P]|`

## Creating Auto-Hide Panels

**XAML (required: DockDirection):**
```xaml
<docking:DockPane Header="Toolbox" DockDirection="Left" DockState="AutoHide"><TextBlock Text="Tools"/></docking:DockPane>
```

**Programmatically:**
```csharp
var pane = new DockPane { Header = "Toolbox", DockDirection = DockDirection.Left, DockState = DockState.AutoHide };
dockingManager.Panes.Add(pane);
```

**Convert docked → auto-hide:** `pane.DockState = DockState.AutoHide;`

**Multiple on same edge:** Stack vertically as buttons (both set `DockDirection.Left`)

## Behavior & Control

**Expand/Collapse:** Hover expands; `IsAutoHideVisible = true/false`; Config: `AutoHideCollapseTimeout`, `AutoHideAnimationDuration`

**Toggle:** `pane.IsAutoHideVisible = !pane.IsAutoHideVisible;`

## Pin/Unpin & Events

**Pin to docked:** `pane.DockState = DockState.Docked; pane.Width = 200;`

**Unpin to auto-hide:** `pane.DockState = DockState.AutoHide;`

**Keyboard toggle (Ctrl+T):**
```csharp
protected override void OnKeyDown(KeyRoutedEventArgs e) {
  if (e.Key == VirtualKey.T && IsCtrlPressed()) {
    var pane = dockingManager.Panes.FirstOrDefault(p => p.Header == "Toolbox");
    if (pane != null) pane.IsAutoHideVisible = !pane.IsAutoHideVisible;
  }
}
```

**Events:**
- `AutoHideVisibilityChanged: (s, e) => Debug.WriteLine(e.NewValue ? "Expanded" : "Collapsed");`
- `DockStateChanged: (s, e) => Debug.WriteLine($"State: {e.OldValue} → {e.NewValue}");`
- `Activated: (s, e) => Debug.WriteLine($"Active: {pane.Header}");`

## Common Patterns

**IDE layout:**
```csharp
dockingManager.Panes.Add(new DockPane { Header = "Explorer", DockDirection = DockDirection.Left, DockState = DockState.Docked });
dockingManager.Panes.Add(new DockPane { Header = "Toolbox", DockDirection = DockDirection.Left, DockState = DockState.AutoHide });
dockingManager.Panes.Add(new DockPane { Header = "Properties", DockDirection = DockDirection.Right, DockState = DockState.AutoHide });
```

**Focus mode (collapse all):**
```csharp
foreach (var p in dockingManager.Panes) {
  p.IsAutoHideVisible = false;
  if (p.DockState == DockState.Docked) p.Visibility = Visibility.Collapsed;
}
```

## Best Practices

1. **Use auto-hide for auxiliary panels** - Tools that aren't needed constantly
2. **Keep main content docked** - Primary panels should be permanently visible
3. **Test with keyboard** - Ensure keyboard shortcuts work well
4. **Provide visual feedback** - Show which panels are auto-hidden
5. **Consider performance** - Many auto-hide panels can impact scrolling smoothness
6. **Save preferences** - Remember user's pin/unpin choices (see advanced-patterns.md)
7. **Label clearly** - Make auto-hide button labels obvious

