# Persistence, Localization, and Responsive in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [State Persistence](#state-persistence)
- [Localization](#localization)
- [Locale Key Reference](#locale-key-reference)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Responsive and Mobile Behavior](#responsive-and-mobile-behavior)

## State Persistence

Save the Kanban's state (data, expand/collapse) to browser `localStorage` so it survives page refresh:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enablePersistence="true">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open" allowToggle="true"></e-kanban-column>
        <e-kanban-column headerText="In Progress" keyField="InProgress" allowToggle="true"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close" allowToggle="true"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
    <e-kanban-swimlanesettings keyField="Assignee" textField="Assignee"></e-kanban-swimlanesettings>
</ejs-kanban>
```

What `enablePersistence="true"` saves to `localStorage`:
- The current data source (cards and their status)
- Column expand/collapse state (when `allowToggle` is used)
- Swimlane row expand/collapse state

The saved state is keyed by the Kanban's `id` attribute. If you change the `id`, persistence resets.

## Localization

Translate Kanban UI strings (dialog labels, button text, validation messages) to another language:

```html
<!-- Set locale on the component -->
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    locale="de">
    <e-kanban-columns>
        <e-kanban-column headerText="Aufgaben" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Erledigt" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    // Load locale strings before component renders
    ej.base.L10n.load({
        'de': {
            'kanban': {
                'items': 'Artikel',
                'min': 'Min',
                'max': 'Max',
                'cardsSelected': 'Karten ausgewählt',
                'addTitle': 'Neue Karte hinzufügen',
                'editTitle': 'Kartendetails bearbeiten',
                'deleteTitle': 'Karte löschen',
                'deleteContent': 'Sind Sie sicher, dass Sie diese Karte löschen möchten?',
                'save': 'Speichern',
                'delete': 'Löschen',
                'cancel': 'Abbrechen',
                'yes': 'Ja',
                'no': 'Nein',
                'close': 'Schließen',
                'noCard': 'Keine Karten zum Anzeigen',
                'unassigned': 'Nicht zugewiesen'
            }
        }
    });
</script>
```

The `ej.base.L10n.load()` call must execute **before** the Kanban component initializes. Place it in a `<script>` block before `<ejs-scripts></ejs-scripts>` in the layout, or in a script block that runs at page load before the component renders.

## Locale Key Reference

All configurable Kanban locale string keys:

| Key | Default (English) | Purpose |
|---|---|---|
| `items` | `Items` | Column card count label suffix |
| `min` | `Min` | Min count constraint indicator |
| `max` | `Max` | Max count constraint indicator |
| `cardsSelected` | `Cards Selected` | Multi-selection count popup label |
| `addTitle` | `Add New Card` | Dialog title when adding a card |
| `editTitle` | `Edit Card Details` | Dialog title when editing a card |
| `deleteTitle` | `Delete Card` | Delete confirmation dialog title |
| `deleteContent` | `Are you sure you want to delete this card?` | Delete confirmation message |
| `save` | `Save` | Save button label in dialog |
| `delete` | `Delete` | Delete button label in dialog |
| `cancel` | `Cancel` | Cancel button label |
| `yes` | `Yes` | Yes button in confirmation dialog |
| `no` | `No` | No button in confirmation dialog |
| `close` | `Close` | Close button label |
| `noCard` | `No cards to display` | Empty column message |
| `unassigned` | `Unassigned` | Label for cards without a swimlane value |

## Right-to-Left (RTL) Support

Enable right-to-left layout for Arabic, Hebrew, and other RTL languages:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableRtl="true" locale="ar">
    <e-kanban-columns>
        <e-kanban-column headerText="للقيام به" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="قيد التنفيذ" keyField="InProgress"></e-kanban-column>
        <e-kanban-column headerText="منتهي" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>

<script>
    ej.base.L10n.load({
        'ar': {
            'kanban': {
                'items': 'العناصر',
                'min': 'الحد الأدنى',
                'max': 'الحد الأقصى',
                'save': 'حفظ',
                'delete': 'حذف',
                'cancel': 'إلغاء',
                'yes': 'نعم',
                'no': 'لا',
                'close': 'إغلاق',
                'noCard': 'لا توجد بطاقات للعرض',
                'unassigned': 'غير معين'
            }
        }
    });
</script>
```

When `enableRtl="true"`:
- The entire board layout flips horizontally
- Text alignment, column order, and scroll direction adapt to RTL
- Combine with `locale` to fully translate the UI

## Responsive and Mobile Behavior

The Kanban automatically adapts to smaller screen widths with no extra configuration needed.

**Default mobile layout:**
- First column occupies ~80% of screen width
- Second column is partially visible at ~20% — indicating more columns exist
- Swipe left/right to navigate between columns
- Tap-hold a card to begin drag; then drag to desired column
- Columns scroll horizontally as the user swipes

**Swimlane layout on mobile:**
- A hamburger menu icon appears in the toolbar
- Tapping it opens a popup listing all swimlane groups
- The first swimlane group is selected by default
- Only the selected group's cards are shown; users switch between groups via the popup

**Card selection on mobile:**
- Single tap selects a card (deselects on second tap)
- For `selectionType="Multiple"`: a popup shows the count of selected cards

All mobile behaviors are automatic — the Kanban detects screen width and applies the responsive layout without any `media` queries or additional properties needed.
