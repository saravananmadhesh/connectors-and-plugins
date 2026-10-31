# Tab Groups

Organize panes into tabs for efficient multi-document interfaces.

## Understanding Tab Groups

Tab groups organize multiple panes into containers:
- **Document panes** group as tabs in center area
- **Docked panes** on same edge group as tabs  
- Keyboard/mouse switching supported

## Creating Document Tabs

**XAML:**
```xaml
<docking:SfDockingManager>
  <docking:DockPane Header="File1.cs" DockState="Document"><TextBox Text="Content"/></docking:DockPane>
  <docking:DockPane Header="File2.cs" DockState="Document"><TextBox Text="Content"/></docking:DockPane>
</docking:SfDockingManager>
```

**Programmatically:**
```csharp
var doc = new DockPane { Header = "File.cs", DockState = DockState.Document };
dockingManager.Panes.Add(doc);
```

## Managing Tabs

**Get active:** `var active = dockingManager.Panes.FirstOrDefault(p => p.DockState == DockState.Document && p.IsActive);`

**Activate:** `pane.IsActive = true;`

**Close one:** `dockingManager.Panes.Remove(pane);`

**Close all:** `dockingManager.Panes.RemoveRange(dockingManager.Panes.Where(p => p.DockState == DockState.Document).ToList());`

**Custom header:** Use `DockPane.Header` with StackPanel + TextBlock for icons/styling

## Styling & Navigation

**Color-code tabs:** Assign backgrounds by file extension

**Keyboard:** Ctrl+Tab next, Ctrl+Shift+Tab previous

**Context menu:** Close, Close Others via MenuFlyout

## Tab Grouping Rules

**Same edge = tabs:**
```xaml
<docking:DockPane Header="Toolbox" DockDirection="Left" DockState="Docked"/>
<docking:DockPane Header="Explorer" DockDirection="Left" DockState="Docked"/>
```

**Different edge = separate:** Top, Bottom, Left, Right edges don't group

## Tab Events

**Activation:** `pane.Activated += (s, e) => Debug.WriteLine($"{pane.Header} activated");`

**Close request:** `pane.Closing += (s, e) => Debug.WriteLine($"Closing: {pane.Header}");`

**State changes:** `pane.DockStateChanged += (s, e) => Debug.WriteLine($"New state: {e.NewValue}");`

## Common Patterns

**Open file in new tab (with dedup):**
```csharp
var existing = dockingManager.Panes.FirstOrDefault(p => p.Header == Path.GetFileName(filePath));
if (existing != null) { existing.IsActive = true; return; }
var doc = new DockPane { Header = Path.GetFileName(filePath), DockState = DockState.Document };
dockingManager.Panes.Add(doc);
doc.IsActive = true;
```

**Close inactive tabs:**
```csharp
dockingManager.Panes.RemoveRange(dockingManager.Panes.Where(p => p.DockState == DockState.Document && !p.IsActive).ToList());
```

**Save all:** Iterate documents and save each

