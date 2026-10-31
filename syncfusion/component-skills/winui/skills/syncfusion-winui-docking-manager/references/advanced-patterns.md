# Advanced Patterns and Integration

Enterprise patterns: MVVM binding, layout persistence, event handling, performance.

## MVVM Integration

**ViewModel (INotifyPropertyChanged):**
```csharp
public class DockingViewModel : INotifyPropertyChanged {
  private ObservableCollection<DockPaneViewModel> panes;
  public ObservableCollection<DockPaneViewModel> Panes {
    get => panes;
    set { if (panes != value) { panes = value; OnPropertyChanged(); } }
  }
  public event PropertyChangedEventHandler PropertyChanged;
  protected void OnPropertyChanged([CallerMemberName] string name = null) =>
    PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
}
```

**XAML binding:**
```xaml
<docking:SfDockingManager ItemsSource="{Binding Panes}">
  <docking:SfDockingManager.DockPaneTemplate>
    <DataTemplate>
      <docking:DockPane Header="{Binding Header}" DockDirection="{Binding DockDirection}" DockState="{Binding DockState}"/>
    </DataTemplate>
  </docking:SfDockingManager.DockPaneTemplate>
</docking:SfDockingManager>
```

## Layout Persistence

Save/load JSON with pane properties:
```csharp
// Save: Serialize all pane properties (Header, DockState, Direction, dimensions)
var layoutData = dockingManager.Panes.Select(p => new {
  p.Header, p.DockState, p.DockDirection, p.Width, p.Height
}).ToList();
var json = JsonConvert.SerializeObject(layoutData);
await File.WriteAllTextAsync("layout.json", json);

// Load: Deserialize, parse enums, recreate panes
```

**Presets:** Save multiple configs as `layout-{preset}.json` and load by name

## Event Handling

**Core events:**
- `DockStateChanged: (s, e) => { /* state transition logic */ }`
- `DragCompleted: (s, e) => { /* dropped logic */ }`
- `SizeChanged: (s, e) => { /* resize logic */ }`
- `PaneClosing: (s, e) => { /* cleanup */ }`

**Centralized handler:**
```csharp
void SetupHandlers(DockPane pane) {
  pane.DockStateChanged += (s, e) => OnStateChanged(pane, e);
  pane.Activated += (s, e) => OnActivated(pane);
}
```

## Performance Tips

**Optimization:**
- Virtualize panes for large collections
- Load content asynchronously
- Clear objects in Closing event

**Auto-save on exit:**
```csharp
Window.Current.CoreWindow.Closing += async (s, e) => {
  e.Handled = true;
  await SaveLayout("default.json");
  Application.Current.Exit();
};
```

**Lazy load content:**
```csharp
private async Task LoadContentAsync(DockPane pane) {
  if (pane.Content == null) {
    await Task.Delay(100);
    pane.Content = CreateContent();
  }
}
```

## Styling & Customization

**Custom header with icon:**
```xaml
<docking:DockPane.Header>
  <StackPanel Orientation="Horizontal"><FontIcon Glyph="&#xE71C;"/><TextBlock Text="Tools"/></StackPanel>
</docking:DockPane.Header>
```

**Apply colors:**
```csharp
pane.Background = new SolidColorBrush(Colors.LightGray);
pane.BorderBrush = new SolidColorBrush(Colors.DarkGray);
```

**Theme support (Dark/Light):**
```csharp
void ApplyTheme(string theme) {
  foreach (var p in dockingManager.Panes) {
    p.Background = theme == "Dark" ? Color.FromArgb(255, 45, 45, 48) : Colors.White;
    p.Foreground = theme == "Dark" ? Colors.White : Colors.Black;
  }
}
```

## Memory Management

**Cleanup on close:**
```csharp
private void OnPaneClosed(object sender, EventArgs e) {
  var pane = sender as DockPane;
  pane.DockStateChanged -= OnStateChanged;
  pane.Content = null;
  if (pane.DataContext is IDisposable d) d.Dispose();
  dockingManager.Panes.Remove(pane);
}
```

## Common Issues

**Pane not docking:** Ensure `DockDirection` is set before `DockState = Docked`. Set `Width` for horizontal docking.

**Layout not loading:** Verify JSON format matches pane structure; use try-catch when deserializing enums.

**Memory leak:** Unsubscribe event handlers; clear content; dispose DataContext resources.
