# Virtual Scrolling and Accessibility in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Virtual Scrolling Overview](#virtual-scrolling-overview)
- [Enabling Virtual Scrolling](#enabling-virtual-scrolling)
- [Card Height for Virtualization](#card-height-for-virtualization)
- [Remote Data with Virtualization](#remote-data-with-virtualization)
- [Virtualization Limitations](#virtualization-limitations)
- [Accessibility Compliance](#accessibility-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Disable Keyboard Interaction](#disable-keyboard-interaction)

## Virtual Scrolling Overview

Virtual scrolling allows the Kanban to handle large datasets (100k+ cards) without performance degradation. Only cards that are visible in the viewport are rendered in the DOM. As the user scrolls a column, cards are loaded and unloaded on demand.

Use virtual scrolling when:
- Each column has hundreds or thousands of cards
- Performance is degraded with all cards rendered at once
- Remote data returns large result sets per column

## Enabling Virtual Scrolling

Set `enableVirtualization="true"` on the Kanban:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableVirtualization="true">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Code Review" keyField="Review"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings headerField="Id" contentField="Summary"
        selectionType="Multiple">
    </e-kanban-cardsettings>
    <e-kanban-dialogsettings fields="@ViewBag.dialogData"></e-kanban-dialogsettings>
</ejs-kanban>
```

```csharp
public IActionResult Index()
{
    // Generate large dataset for virtual scrolling demo
    ViewBag.data = new KanbanDataModels().VirtualScrollKanbanData(); // 100k items
    ViewBag.dialogData = new KanbanDialogModels().VirtualScrollDialogCardField();
    return View();
}
```

## Card Height for Virtualization

When `enableVirtualization="true"` and card height is not explicitly set, the Kanban applies a fixed height of `100px` per card (it does not default to `auto`).

To use a custom fixed height, set `cardHeight` on the Kanban (pixel values only — percentages are not accepted):

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableVirtualization="true" cardHeight="150">
```

The number of cards rendered is calculated by: `(column height) / cardHeight`.

## Remote Data with Virtualization

When using remote data with virtual scrolling, the server must handle a special `KanbanVirtualization` parameter to differentiate between normal data requests and virtual scroll requests:

```csharp
public IActionResult LoadCard([FromBody] ExtendedDataManagerRequest dm)
{
    var DataSource = _context.KanbanCards.AsEnumerable();
    DataOperations operation = new DataOperations();

    // Normal Kanban Where filter (not virtualization)
    if (dm.Where != null && dm.Where.Count > 0
        && dm.KanbanVirtualization != "KanbanVirtualization")
    {
        dm.Where[0].value = dm.Where[0].value.ToString();
        DataSource = operation.PerformFiltering(DataSource, dm.Where, dm.Where[0].Operator);
    }

    if (dm.Skip != 0)
        DataSource = operation.PerformSkip(DataSource, dm.Skip);

    // Normal Kanban Take (not virtualization)
    if (dm.Take != 0 && dm.KanbanVirtualization != "KanbanVirtualization")
        DataSource = operation.PerformTake(DataSource, dm.Take);

    // Virtual scrolling: filter + take per column
    var columnCount = new List<KeyValuePair<string, int>>();
    if (dm.KanbanVirtualization == "KanbanVirtualization"
        && dm.Where != null && dm.Where.Count > 0 && dm.Take != 0)
    {
        IEnumerable<KanbanCard> currentData = new List<KanbanCard>();
        List<WhereFilter> currentFilter = new List<WhereFilter>();

        for (int i = 0; i < dm.Where.Count; i++)
        {
            dm.Where[i].value = dm.Where[i].value.ToString();
            currentFilter.Add(dm.Where[i]);
            var filterData = operation.PerformFiltering(DataSource, currentFilter, dm.Where[i].Operator);
            columnCount.Add(new KeyValuePair<string, int>(
                dm.Where[i].value.ToString(), filterData.Count()));
            filterData = operation.PerformTake(filterData, dm.Take);
            currentData = currentData.Concat(filterData);
            currentFilter.Clear();
        }
        DataSource = currentData;
    }

    // Return format differs for virtual vs normal
    if (dm.KanbanVirtualization == "KanbanVirtualization")
        return Json(new { result = DataSource, count = columnCount });
    else
        return Json(DataSource);
}
```

The `ExtendedDataManagerRequest` class extends `DataManagerRequest` with a `KanbanVirtualization` string property. The response for virtualization includes `result` (the page of data) and `count` (total per-column counts as key-value pairs).

## Virtualization Limitations

- **Card height**: Must be a fixed pixel value when virtualization is enabled. Percentage heights are not accepted. Default is `100px` if not specified.
- **Drop position**: When a card is dragged and dropped, its index position within the column is not preserved after scrolling — the card may appear in a different position after scroll resets.
- **Swimlanes**: Virtual scrolling is not supported when swimlanes are enabled. Enabling both `enableVirtualization` and `<e-kanban-swimlanesettings>` simultaneously is not supported.

## Accessibility Compliance

The Kanban meets the following accessibility standards:

| Criteria | Level |
|---|---|
| WCAG 2.2 | AA |
| Section 508 | ✅ Full support |
| Screen Reader | ✅ Full support |
| Right-To-Left | ✅ Full support |
| Color Contrast | ⚠️ Partial support |
| Mobile Device | ✅ Full support |
| Keyboard Navigation | ✅ Full support |
| Accessibility Checker Validation | ⚠️ Partial support |

## WAI-ARIA Attributes

The Kanban applies these ARIA attributes automatically:

| Attribute | Purpose |
|---|---|
| `aria-label` | Provides descriptive text for Kanban elements for assistive technology |
| `aria-expanded` | Indicates expanded/collapsed state of collapsible columns |
| `aria-selected` | Set to `true` on selected cards (default `false`) |
| `aria-grabbed` | Set to `true` when a card is being dragged; `false` when draggable but not currently grabbed |
| `aria-describedby` | Associates column body cells with their header cells |
| `aria-roledescription` | Provides alternative descriptions for card elements |

## Keyboard Navigation

All keyboard interactions for navigating and editing the Kanban board:

| Key | Action |
|---|---|
| `Home` | Select first card in the Kanban |
| `End` | Select last card in the Kanban |
| `Arrow Up` | Select the card above |
| `Arrow Down` | Select the card below |
| `Arrow Right` | Move column focus to the right |
| `Arrow Left` | Move column focus to the left |
| `Ctrl + Enter` | Multi-select cards |
| `Ctrl + Space` | Multi-select cards |
| `Shift + Arrow Up` | Extend selection upward |
| `Shift + Arrow Down` | Extend selection downward |
| `Shift + Tab` | Reverse tab navigation |
| `Enter` | Open the selected card's edit dialog |
| `Tab` | Navigate to the next Kanban column |
| `Delete` | Delete selected cards |
| `Esc` | Close dialog / escape current mode |
| `Space` | Open card edit dialog based on current column selection |

## Disable Keyboard Interaction

Disable all keyboard interactions on the board:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    AllowKeyboard="false">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="Testing" keyField="Testing"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

`AllowKeyboard="false"` disables all keyboard shortcuts and navigation. Use this when embedding the Kanban in a context where keyboard events are handled by the parent application.
