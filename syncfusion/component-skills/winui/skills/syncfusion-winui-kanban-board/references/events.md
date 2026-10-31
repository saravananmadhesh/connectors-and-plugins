# Kanban Events in WinUI

Handle user interactions and drag-drop operations with Kanban events. Respond to card taps, track card movement, and implement custom drag-drop logic.

## Table of Contents
- [Overview](#overview)
- [Available Events](#available-events)
- [CardTapped Event](#cardtapped-event)
- [CardTappedCommand (MVVM)](#cardtappedcommand-mvvm)
- [CardDragStarting Event](#carddragstarting-event)
- [CardDragOver Event](#carddragover-event)
- [CardDrop Event](#carddrop-event)
- [Column Drag-Drop Events](#column-drag-drop-events)
- [CardSelected Event](#cardselected-event)
- [CardDeselected Event](#carddeselected-event)
- [Complete Event Flow Example](#complete-event-flow-example)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

**Purpose:** Respond to user interactions and control Kanban behavior  
**Event Categories:** Card tap events, drag-drop lifecycle events  
**Pattern:** MVVM-compatible with command support  
**Use Cases:** Navigation, validation, logging, custom logic

## Available Events

| Event | Description | Event Args |
|-------|-------------|------------|
| `CardTapped` | Fires when user taps/clicks a card | KanbanCardTappedEventArgs |
| `CardDragStarting` | Fires when drag operation begins | KanbanCardDragStartingEventArgs |
| `CardDragOver` | Fires while dragging over columns | KanbanCardDragOverEventArgs |
| `CardDrop` | Fires when card is dropped | KanbanCardDropEventArgs |
| `ColumnDragStarting` | Fires when a column begins to be dragged | KanbanColumnDragStartingEventArgs |
| `ColumnDragOver` | Fires while dragging a column over another column | KanbanColumnDragOverEventArgs |
| `ColumnDrop` | Fires when a dragged column is dropped at a new position | KanbanColumnDropEventArgs |
| `CardSelected` | Fires when one or more cards are selected | KanbanCardSelectedEventArgs |
| `CardDeselected` | Fires when one or more cards are deselected | KanbanCardDeselectedEventArgs |

## CardTapped Event

Respond when user taps or clicks a card.

### Basic Example

```xml
<kanban:SfKanban x:Name="kanban"
                 ItemsSource="{Binding Cards}"
                 CardTapped="OnCardTapped">
</kanban:SfKanban>
```

**C#:**
```csharp
private void OnCardTapped(object sender, KanbanCardTappedEventArgs e)
{
    // Access the tapped card
    var cardItem = e.SelectedCard;
    var cardData = cardItem.Content as CardDetails;
    
    // Show details in a dialog
    ShowCardDetailsDialog(cardData);
}

private async void ShowCardDetailsDialog(CardDetails card)
{
    var dialog = new ContentDialog
    {
        Title = card.Title,
        Content = $"{card.Description}\n\nAssignee: {card.Assignee}\nCategory: {card.Category}",
        CloseButtonText = "OK",
        XamlRoot = this.XamlRoot
    };
    
    await dialog.ShowAsync();
}
```

### Event Arguments Properties

### Example: Navigate to Details Page

```csharp
private void OnCardTapped(object sender, KanbanCardTappedEventArgs e)
{
    var card = e.SelectedCard.Content as CardDetails;
    
    // Navigate to details page with card ID
    Frame.Navigate(typeof(CardDetailsPage), card.Id);
}
```

## CardTappedCommand (MVVM)

Use commands for MVVM pattern without code-behind events.

### XAML

```xml
<kanban:SfKanban x:Name="kanban"
                 ItemsSource="{Binding Cards}"
                 CardTappedCommand="{Binding CardTappedCommand}">
</kanban:SfKanban>
```

### ViewModel

```csharp
public class KanbanViewModel
{
    public ObservableCollection<CardDetails> Cards { get; set; }
    public ICommand CardTappedCommand { get; }

    public KanbanViewModel()
    {
        Cards = new ObservableCollection<CardDetails>();
        CardTappedCommand = new RelayCommand<KanbanCardTappedEventArgs>(OnCardTapped);
    }

    private void OnCardTapped(KanbanCardTappedEventArgs args)
    {
        var card = args.SelectedCard.Content as CardDetails;
        
        // Handle card tap in ViewModel
        NavigateToDetails(card);
    }

    private void NavigateToDetails(CardDetails card)
    {
        // Navigation logic
    }
}
```

### RelayCommand Implementation

```csharp
public class RelayCommand<T> : ICommand
{
    private readonly Action<T> _execute;
    private readonly Func<T, bool> _canExecute;

    public RelayCommand(Action<T> execute, Func<T, bool> canExecute = null)
    {
        _execute = execute ?? throw new ArgumentNullException(nameof(execute));
        _canExecute = canExecute;
    }

    public event EventHandler CanExecuteChanged;

    public bool CanExecute(object parameter)
    {
        return _canExecute == null || _canExecute((T)parameter);
    }

    public void Execute(object parameter)
    {
        _execute((T)parameter);
    }

    public void RaiseCanExecuteChanged()
    {
        CanExecuteChanged?.Invoke(this, EventArgs.Empty);
    }
}
```

## CardDragStarting Event

Fires when user begins dragging a card. Use to track the dragged card or prevent dragging.

### XAML

```xml
<kanban:SfKanban x:Name="kanban"
                 ItemsSource="{Binding Cards}"
                 CardDragStarting="OnCardDragStarting">
</kanban:SfKanban>
```

### Event Handler

```csharp
private KanbanCardItem selectedCard;

private void OnCardDragStarting(object sender, KanbanCardDragStartingEventArgs e)
{
    // Store reference to dragged card
    selectedCard = e.Card;
    
    var cardData = e.Card.Content as CardDetails;
    
    // Log drag operation
    System.Diagnostics.Debug.WriteLine($"Dragging card: {cardData.Title}");
    
    // Optional: Show visual feedback
    ShowDragFeedback(cardData);
}
```

### Event Arguments Properties

```csharp
public class KanbanCardDragStartingEventArgs
{
    // The card being dragged
    public KanbanCardItem Card { get; }
}
```
## CardDragOver Event

Fires while dragging a card over columns. Use to validate drop locations or provide feedback.

### XAML

```xml
<kanban:SfKanban x:Name="kanban"
                 ItemsSource="{Binding Cards}"
                 CardDragOver="OnCardDragOver">
</kanban:SfKanban>
```

### Event Handler

```csharp
private void OnCardDragOver(object sender, KanbanCardDragOverEventArgs e)
{
    // The column currently being hovered.
    var hoveredColumn = e.Column;

    // Zero-based indices reported by the event.
    int hoveredColumnIndex = e.CurrentColumnIndex;

    // Example validation: disallow dropping into a specific column (by index or by key).
    bool isDropAllowed = IsDropAllowed(hoveredColumn, hoveredColumnIndex);

    // Provide visual feedback to the user (e.g., highlight allowed/blocked).
    UpdateDragFeedback(hoveredColumn, isDropAllowed);

}
```
## CardDrop Event

Fires when card is dropped into a column. Use to update data, validate moves, or trigger actions.

### XAML

```xml
<kanban:SfKanban x:Name="kanban"
                 ItemsSource="{Binding Cards}"
                 CardDrop="OnCardDrop">
</kanban:SfKanban>
```

### Event Handler

```csharp
private void OnCardDrop(object sender, KanbanCardDropEventArgs e)
{
    var sourceColumn = e.SourceColumn;
    var targetColumn = e.TargetColumn;
    var targetIndex = e.TargetCardIndex;
    
    // Log the drop
    System.Diagnostics.Debug.WriteLine(
        $"Dropped from {sourceColumn.Title} to {targetColumn.Title} at index {targetIndex}"
    );
    
    // Update card data
    UpdateCardOnDrop(e);
    
    // Refresh column if using sorting
    kanban.RefreshKanbanColumn(targetColumn.AllowedTransitionCategory.ToString());
}

private void UpdateCardOnDrop(KanbanCardDropEventArgs e)
{
    var card = this.selectedCard; // get details from CardDragStarting event.
    if (card != null)
    {
        // Update category
        card.Category = e.TargetColumn.AllowedTransitionCategory.ToString();
        
        // Log to server or database
        LogCardMovement(card, e.SourceColumn.Title, e.TargetColumn.Title);
    }
}
```

### Event Arguments Properties

### Example: Validation and Undo

```csharp
private void OnCardDrop(object sender, KanbanCardDropEventArgs e)
{
    var card = this.selectedCard?.Content as CardDetails;
    
    // Validate the move
    if (!IsValidMove(card, e.TargetColumn))
    {
        // Show error message
        ShowErrorDialog("Cannot move card to this column");
        
        // Refresh source column to revert
        kanban.RefreshKanbanColumn(e.SourceColumn.AllowedTransitionCategory.ToString());
        return;
    }
    
    // Apply the move
    card.Category = e.TargetColumn.AllowedTransitionCategory.ToString();
    kanban.RefreshKanbanColumn(e.TargetColumn.AllowedTransitionCategory.ToString());
}

private bool IsValidMove(CardDetails card, KanbanColumn targetColumn)
{
    // Example: Prevent moving "Done" cards back to "In Progress"
    if (card.Category == "Done" && targetColumn.Title == "In Progress")
    {
        return false;
    }
    
    return true;
}
```

### Example: Server Synchronization

```csharp
private async void OnCardDrop(object sender, KanbanCardDropEventArgs e)
{
    var card = selectedCard?.Content as CardDetails;
    
    // Update local data
    card.Category = e.TargetColumn.AllowedTransitionCategory.ToString();
    
    // Sync with server
    try
    {
        await UpdateCardOnServerAsync(card);
        
        // Refresh on success
        kanban.RefreshKanbanColumn(e.TargetColumn.AllowedTransitionCategory.ToString());
    }
    catch (Exception ex)
    {
        // Show error and revert
        ShowErrorDialog($"Failed to update: {ex.Message}");
        
        // Revert to source column
        card.Category = e.SourceColumn.AllowedTransitionCategory.ToString();
        kanban.RefreshKanbanColumn(e.SourceColumn.AllowedTransitionCategory.ToString());
    }
}

private async Task UpdateCardOnServerAsync(CardDetails card)
{
    // API call to update card on server
    // await httpClient.PutAsJsonAsync($"/api/cards/{card.Id}", card);
}
```

## Column Drag-Drop Events

Column reordering (enabled with `AllowColumnReorder="True"`) exposes a dedicated event lifecycle. Use these events to track, validate, or cancel column reorder operations.

| Event | Description | Event Args |
|-------|-------------|------------|
| `ColumnDragStarting` | Fires when a column begins to be dragged | KanbanColumnDragStartingEventArgs |
| `ColumnDragOver` | Fires while a column is dragged over another column | KanbanColumnDragOverEventArgs |
| `ColumnDrop` | Fires when a dragged column is dropped at a new position | KanbanColumnDropEventArgs |

### ColumnDragStarting Event

Occurs when a column begins to be dragged. Set `e.Cancel` to `true` to prevent the column from being dragged.

**Event Arguments:**
- `Column` - The source column being dragged.
- `ColumnIndex` - The index of the dragged column within the Kanban column collection.
- `Cancel` - Determines whether the column drag operation should be canceled.

```xml
<kanban:SfKanban x:Name="kanban"
                 ItemsSource="{Binding TaskDetails}"
                 AutoGenerateColumns="False"
                 AllowColumnReorder="True"
                 ColumnDragStarting="OnKanbanColumnDragStarting">
    <kanban:KanbanColumn HeaderText="To Do" Categories="Open" />
    <kanban:KanbanColumn HeaderText="In Progress" Categories="In Progress" />
    <kanban:KanbanColumn HeaderText="Done" Categories="Done" />
</kanban:SfKanban>
```

**C#:**
```csharp
this.kanban.AllowColumnReorder = true;
this.kanban.ColumnDragStarting += this.OnKanbanColumnDragStarting;

private void OnKanbanColumnDragStarting(object sender, KanbanColumnDragStartingEventArgs e)
{
    var column = e.Column;
    int columnIndex = e.ColumnIndex;

    // Optional: cancel the drag based on business rules
    // e.Cancel = true;
}
```

### ColumnDragOver Event

Occurs when a column is dragged over another column.

**Event Arguments:**
- `SourceColumn` - The column where the drag operation originated.
- `CurrentColumn` - The current column over which the dragged column is positioned.
- `PreviousColumnIndex` - The previous column index before entering the current column.
- `CurrentColumnIndex` - The current column index over which the dragged column is positioned.

```csharp
this.kanban.ColumnDragOver += this.OnKanbanColumnDragOver;

private void OnKanbanColumnDragOver(object sender, KanbanColumnDragOverEventArgs e)
{
    var sourceColumn = e.SourceColumn;
    var currentColumn = e.CurrentColumn;
    int previousColumnIndex = e.PreviousColumnIndex;
    int currentColumnIndex = e.CurrentColumnIndex;
}
```

### ColumnDrop Event

Occurs when a dragged column is dropped into a new position.

**Event Arguments:**
- `SourceColumn` - The column from which the drag operation originated.
- `PreviousColumnIndex` - The column index before the drop.
- `TargetColumn` - The column onto which the dragged column is dropped.
- `TargetColumnIndex` - The index where the column is dropped.

```csharp
this.kanban.ColumnDrop += this.OnKanbanColumnDrop;

private void OnKanbanColumnDrop(object sender, KanbanColumnDropEventArgs e)
{
    var sourceColumn = e.SourceColumn;
    var targetColumn = e.TargetColumn;
    int previousColumnIndex = e.PreviousColumnIndex;
    int targetColumnIndex = e.TargetColumnIndex;

    // Persist the new column order in user settings or backend
    SaveColumnOrder();
}
```

### Column Reorder Requirements

- Set `AllowColumnReorder` to `true` on `SfKanban` (default is `false`)
- Column drag events do not fire unless reordering is enabled

## CardSelected Event

The `CardSelected` event occurs when one or more cards are selected in the Kanban board. The event is raised once per selection update cycle. Requires a card selection mode to be enabled on `SfKanban`.

**Event Arguments Properties:**
| Property | Description |
|----------|-------------|
| `SelectedCard` | The card that initiated the selection operation |
| `SelectedCards` | The collection of cards currently selected in the Kanban board |
| `SelectedCardIndex` | The index of the selected card that initiated the selection operation |
| `IsControlKeyPressed` | Whether the Control key was pressed during the selection |
| `IsShiftKeyPressed` | Whether the Shift key was pressed during the selection |
| `Column` | The Kanban column associated with the selection |

### Basic Example

```xml
<kanban:SfKanban x:Name="kanban" 
                 ItemsSource="{Binding TaskDetails}" 
                 CardSelectionType="Multiple" 
                 CardSelected="OnKanbanCardSelected">
</kanban:SfKanban>
```

**C#:**
```csharp
this.kanban.ItemsSource = new ViewModel().TaskDetails;
this.kanban.CardSelectionType = KanbanCardSelectionType.Multiple;
this.kanban.CardSelected += this.OnKanbanCardSelected;

private void OnKanbanCardSelected(object sender, KanbanCardSelectedEventArgs e)
{
    var selectedCard = e.SelectedCard;
    var selectedCards = e.SelectedCards;
    int selectedCardIndex = e.SelectedCardIndex;
    bool isControlKeyPressed = e.IsControlKeyPressed;
    bool isShiftKeyPressed = e.IsShiftKeyPressed;
    var column = e.Column;

    // Example: enable a bulk-action toolbar when multiple cards are selected
    bool hasMultiSelection = selectedCards != null && selectedCards.Count > 1;
    UpdateBulkActionsToolbar(hasMultiSelection);
}
```

**Why:** Use `SelectedCards` to operate on the full selection (bulk operations), and `SelectedCard`/`SelectedCardIndex` to identify which card triggered the update. The key-state properties allow distinguishing additive selection from plain clicks.

## CardDeselected Event

The `CardDeselected` event occurs when one or more cards are deselected in the Kanban board. The event is raised once per deselection update cycle.

**Event Arguments Properties:**
| Property | Description |
|----------|-------------|
| `DeselectedCard` | The card that initiated the deselection operation |
| `DeselectedCards` | The collection of cards that are deselected in the Kanban board |
| `IsControlKeyPressed` | Whether the Control key was pressed during the deselection |
| `IsShiftKeyPressed` | Whether the Shift key was pressed during the deselection |
| `Column` | The Kanban column associated with the deselection |

### Basic Example

```xml
<kanban:SfKanban x:Name="kanban" 
                 ItemsSource="{Binding TaskDetails}" 
                 CardSelectionType="Multiple" 
                 CardDeselected="OnKanbanCardDeselected">
</kanban:SfKanban>
```

**C#:**
```csharp
this.kanban.ItemsSource = new ViewModel().TaskDetails;
this.kanban.CardSelectionType = KanbanCardSelectionType.Multiple;
this.kanban.CardDeselected += this.OnKanbanCardDeselected;

private void OnKanbanCardDeselected(object sender, KanbanCardDeselectedEventArgs e)
{
    var deselectedCard = e.DeselectedCard;
    var deselectedCards = e.DeselectedCards;
    bool isControlKeyPressed = e.IsControlKeyPressed;
    bool isShiftKeyPressed = e.IsShiftKeyPressed;
    var column = e.Column;
}
```

**Why:** Pair `CardSelected` with `CardDeselected` to keep dependent UI (toolbars, status bars, command `CanExecute` states) synchronized with the actual selection at all times.

## Complete Event Flow Example

Track entire drag-drop lifecycle:

```xml
<kanban:SfKanban x:Name="kanban"
                 ItemsSource="{Binding Cards}"
                 CardTapped="OnCardTapped"
                 CardDragStarting="OnCardDragStarting"
                 CardDragOver="OnCardDragOver"
                 CardDrop="OnCardDrop">
</kanban:SfKanban>
```

**Code-Behind:**
```csharp
private KanbanCardItem selectedCard;
private string dragStartTime;

private void OnCardTapped(object sender, KanbanCardTappedEventArgs e)
{
    var card = e.SelectedCard.Content as CardDetails;
    Debug.WriteLine($"Card tapped: {card.Title}");
}

private void OnCardDragStarting(object sender, KanbanCardDragStartingEventArgs e)
{
    selectedCard = e.Card;
    dragStartTime = DateTime.Now.ToString("HH:mm:ss");
    
    var card = e.Card.Content as CardDetails;
    Debug.WriteLine($"[{dragStartTime}] Drag started: {card.Title}");
}

private void OnCardDragOver(object sender, KanbanCardDragOverEventArgs e)
{
    Debug.WriteLine($"Dragging over: {e.TargetColumn.Title}");
}

private void OnCardDrop(object sender, KanbanCardDropEventArgs e)
{
    var card = selectedCard?.Content as CardDetails;
    var dropTime = DateTime.Now.ToString("HH:mm:ss");
    
    Debug.WriteLine($"[{dropTime}] Dropped: {card.Title}");
    Debug.WriteLine($"  From: {e.SourceColumn.Title}");
    Debug.WriteLine($"  To: {e.TargetColumn.Title}");
    Debug.WriteLine($"  Index: {e.TargetCardIndex}");
    
    // Update data
    card.Category = e.TargetColumn.AllowedTransitionCategory.ToString();
    
    // Refresh column
    kanban.RefreshKanbanColumn(e.TargetColumn.AllowedTransitionCategory.ToString());
}
```

## Common Patterns

### Pattern 1: Navigation on Tap

```csharp
private void OnCardTapped(object sender, KanbanCardTappedEventArgs e)
{
    var card = e.SelectedCard.Content as CardDetails;
    Frame.Navigate(typeof(DetailsPage), card.Id);
}
```

### Pattern 2: Validation on Drop

```csharp
private void OnCardDrop(object sender, KanbanCardDropEventArgs e)
{
    if (!ValidateWorkflowTransition(e))
    {
        // Revert move
        kanban.RefreshKanbanColumn(e.SourceColumn.AllowedTransitionCategory.ToString());
        return;
    }
    
    // Apply move
    ApplyCardMove(e);
}
```

### Pattern 3: Logging All Events

```csharp
private void LogEvent(string eventName, string details)
{
    var timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
    Debug.WriteLine($"[{timestamp}] {eventName}: {details}");
    
    // Optional: Send to analytics service
    // analyticsService.TrackEvent(eventName, details);
}
```

### Pattern 4: MVVM with Commands

```xml
<kanban:SfKanban CardTappedCommand="{Binding CardTappedCommand}"
                 ItemsSource="{Binding Cards}">
</kanban:SfKanban>
```

```csharp
public ICommand CardTappedCommand { get; }

public KanbanViewModel()
{
    CardTappedCommand = new RelayCommand<KanbanCardTappedEventArgs>(OnCardTapped);
}

private void OnCardTapped(KanbanCardTappedEventArgs args)
{
    // Handle in ViewModel
    SelectedCard = args.SelectedCard.Content as CardDetails;
    OpenDetailsView();
}
```

## Best Practices

1. **Store References:** Save selectedCard in CardDragStarting for use in CardDrop
2. **Always Refresh:** Call RefreshKanbanColumn() after data changes in CardDrop when sorting scenario is enabled.
3. **Validate Moves:** Check business rules before applying drops
4. **Error Handling:** Wrap async operations in try-catch
5. **Use Commands:** Prefer MVVM commands over code-behind events when possible
6. **Log Events:** Track user actions for debugging and analytics
7. **Update Timestamps:** Maintain LastModified or similar audit fields
8. **Server Sync:** Update backend when cards move
9. **Visual Feedback:** Show users what's happening during drag-drop
10. **Null Checks:** Always verify card data exists before accessing

## Troubleshooting

### CardTapped Not Firing

**Problem:** Tapping cards doesn't trigger event

**Solutions:**
1. Verify CardTapped event is wired in XAML
2. Check if CardTemplate intercepts pointer events
3. Ensure kanban control has focus
4. Test with simple handler to isolate issue

### Card Reference Null in CardDrop

**Problem:** selectedCard is null in CardDrop handler

**Solutions:**
1. Verify CardDragStarting event is wired
2. Check selectedCard is assigned in CardDragStarting
3. Ensure field is at class level (not local variable)
4. Verify drag operation completes (not cancelled)

### Changes Not Visible After Drop

**Problem:** Card doesn't update position/column

**Solutions:**
1. Call RefreshKanbanColumn() after data changes
2. Verify correct column category passed to RefreshKanbanColumn()
3. Ensure ObservableCollection is used for ItemsSource
4. Check INotifyPropertyChanged is implemented on model

### Commands Not Executing

**Problem:** CardTappedCommand doesn't fire

**Solutions:**
1. Verify command is public property
2. Check binding path in XAML
3. Ensure command accepts KanbanCardTappedEventArgs parameter
4. Verify ViewModel is set as DataContext
5. Check CanExecute returns true

### Drag-Drop Performance Issues

**Problem:** Lag during drag operations

**Solutions:**
1. Minimize work in CardDragOver (fires frequently)
2. Use async operations in CardDrop
3. Batch server updates instead of per-card
4. Optimize card templates
5. Reduce number of cards or use virtualization

## Notes

- **Event Order:** CardDragStarting → CardDragOver (multiple) → CardDrop
- **CardTappedCommand:** MVVM alternative to CardTapped event
- **Async Operations:** Supported in event handlers (use async void)
- **Thread Safety:** Events fire on UI thread
- **Event Arguments:** All are read-only, provide access to event context
- **RefreshKanbanColumn():** Required for sorting/WIP limits after drops

## Example Use Cases

### 1. Analytics Tracking
```csharp
private void OnCardDrop(object sender, KanbanCardDropEventArgs e)
{
    analytics.TrackEvent("CardMoved", new Dictionary<string, string>
    {
        ["From"] = e.SourceColumn.Title,
        ["To"] = e.TargetColumn.Title,
        ["CardId"] = selectedCard.Content.Id
    });
}
```

### 2. Audit Logging
```csharp
private async void OnCardDrop(object sender, KanbanCardDropEventArgs e)
{
    var auditEntry = new AuditLog
    {
        Action = "CardMoved",
        Timestamp = DateTime.UtcNow,
        UserId = currentUser.Id,
        Details = $"Moved card to {e.TargetColumn.Title}"
    };
    
    await SaveAuditLogAsync(auditEntry);
}
```

### 3. Notification Triggers
```csharp
private void OnCardDrop(object sender, KanbanCardDropEventArgs e)
{
    if (e.TargetColumn.Title == "Done")
    {
        SendCompletionNotification(selectedCard.Content);
    }
}
```

### 4. Workflow Automation
```csharp
private void OnCardDrop(object sender, KanbanCardDropEventArgs e)
{
    var card = selectedCard.Content as CardDetails;
    
    // Auto-assign when moved to "In Progress"
    if (e.TargetColumn.Title == "In Progress" && string.IsNullOrEmpty(card.Assignee))
    {
        card.Assignee = currentUser.Name;
    }
    
    // Set completion date when moved to "Done"
    if (e.TargetColumn.Title == "Done")
    {
        card.CompletedDate = DateTime.Now;
    }
}
```