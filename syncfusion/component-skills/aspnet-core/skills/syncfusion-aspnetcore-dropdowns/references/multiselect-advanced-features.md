# Advanced Features in MultiSelect

## Table of Contents
- [Custom Values](#custom-values)
- [Disabled Items](#disabled-items)
  - [Via Data Source Field](#via-data-source-field)
  - [Disable Entire Component](#disable-entire-component)
  - [disableItem Method](#disableitem-method)
- [Popup Resize](#popup-resize)
- [Localization](#localization)
- [Accessibility](#accessibility)
  - [WCAG Compliance](#wcag-compliance)
  - [ARIA Attributes](#aria-attributes)
  - [Keyboard Navigation](#keyboard-navigation)
- [Sorting](#sorting)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [State Persistence](#state-persistence)
- [Readonly Mode](#readonly-mode)
- [Float Label](#float-label)
- [HTML Attributes](#html-attributes)
- [z-Index Configuration](#z-index-configuration)
- [Device Full Screen Mode](#device-full-screen-mode)

---

## Custom Values

Allow users to add values not present in the existing list using `allowCustomValue`:

```cshtml
<ejs-multiselect id="tags"
    dataSource="@ViewBag.Tags"
    placeholder="Select or add tags"
    mode="Box"
    allowCustomValue="true"
    customValueSelection="onCustomValueAdd">
    <e-multiselect-fields text="Name" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<script>
function onCustomValueAdd(args) {
    // args.newData: { text: "typed value", value: "typed value" }
    console.log('New custom value added:', args.newData.text);
    // Custom values are appended to the end of the list
}
</script>
```

**With `addTagOnBlur` for auto-convert on focus-out:**
```cshtml
<ejs-multiselect id="tags"
    dataSource="@ViewBag.Tags"
    placeholder="Add tags"
    mode="Box"
    allowCustomValue="true"
    addTagOnBlur="true">
    <e-multiselect-fields text="Name" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

> When `allowCustomValue="false"` (default), only values from the list can be selected.

---

## Disabled Items

### Via Data Source Field

Use a boolean `disabled` field in your data to make specific items unselectable:

```csharp
public class StatusData
{
    public string Status { get; set; }
    public bool State { get; set; }
}

ViewBag.Statuses = new List<StatusData>
{
    new StatusData { Status = "Open",       State = false },
    new StatusData { Status = "In Progress", State = false },
    new StatusData { Status = "On Hold",     State = true },  // disabled
    new StatusData { Status = "Cancelled",   State = true },  // disabled
    new StatusData { Status = "Closed",      State = false }
};
```

```cshtml
<ejs-multiselect id="statuses"
    dataSource="@ViewBag.Statuses"
    placeholder="Select status">
    <e-multiselect-fields text="Status" value="Status" disabled="State"></e-multiselect-fields>
</ejs-multiselect>
```

Disabled items appear grayed out and cannot be selected or focused.

### Disable Entire Component

Set `enabled="false"` to disable the entire MultiSelect:

```cshtml
<ejs-multiselect id="statuses"
    dataSource="@ViewBag.Statuses"
    placeholder="Select status"
    enabled="false">
    <e-multiselect-fields text="Status" value="Status"></e-multiselect-fields>
</ejs-multiselect>
```

Toggle via JavaScript:
```javascript
var multiObj = document.getElementById('statuses').ej2_instances[0];
multiObj.enabled = false; // Disable
multiObj.enabled = true;  // Enable
```

### disableItem Method

Dynamically disable a specific item using the `disableItem` method:

```cshtml
<ejs-multiselect id="statuses" dataSource="@ViewBag.Statuses" placeholder="Select status">
    <e-multiselect-fields text="Status" value="Status"></e-multiselect-fields>
</ejs-multiselect>

<button onclick="disableOnHold()">Disable 'On Hold'</button>

<script>
function disableOnHold() {
    var multiObj = document.getElementById('statuses').ej2_instances[0];
    // Disable by value
    multiObj.disableItem(null, 'On Hold');
    // Or by index: multiObj.disableItem(null, null, 2);
}
</script>
```

> If a currently selected item is disabled dynamically, the selection is cleared automatically.

---

## Popup Resize

Allow users to resize the popup by dragging its bottom-right corner:

```cshtml
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    placeholder="Select countries"
    allowResize="true"
    popupHeight="300px"
    popupWidth="100%"
    resizeStart="onResizeStart"
    resizeStop="onResizeStop"
    resizing="onResizing">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>

<script>
function onResizeStart(args) {
    console.log('Resize started');
}
function onResizing(args) {
    // Live updates of width/height during drag
}
function onResizeStop(args) {
    console.log('Resize stopped — new dimensions persisted');
}
</script>
```

> Resized dimensions are retained across sessions (stored in browser session).

---

## Localization

Translate the built-in text strings (noRecordsTemplate, actionFailureTemplate) using the `L10n` class:

```cshtml
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    placeholder="Sélectionner des pays"
    locale="fr-FR"
    noRecordsTemplate="<span>Aucun enregistrement trouvé</span>"
    actionFailureTemplate="<span>Échec de la requête</span>">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>

<script>
// Load locale strings for L10n
ej.base.L10n.load({
    'fr-FR': {
        'multi-select': {
            'noRecordsTemplate': 'Aucun enregistrement trouvé',
            'actionFailureTemplate': 'La requête a échoué'
        }
    }
});

// Apply locale
var multiObj = document.getElementById('countries').ej2_instances[0];
multiObj.locale = 'fr-FR';
</script>
```

**Available locale keys:**

| Key | Default (en-US) |
|-----|----------------|
| `noRecordsTemplate` | "No records found" |
| `actionFailureTemplate` | "The request failed" |

---

## Accessibility

### WCAG Compliance

The MultiSelect meets:
- **WCAG 2.2 AA** level
- **Section 508** compliance
- Full **screen reader** support (NVDA, JAWS, VoiceOver)
- **Right-to-Left** support
- **Color contrast** requirements
- **Mobile device** support

### ARIA Attributes

The component automatically applies these ARIA attributes:

| Attribute | Purpose |
|-----------|---------|
| `aria-haspopup` | Indicates popup presence |
| `aria-expanded` | Indicates popup open/closed state |
| `aria-selected` | Marks selected options |
| `aria-readonly` | Indicates readonly state |
| `aria-disabled` | Indicates disabled state |
| `aria-activedescendant` | Tracks active list item |
| `aria-owns` | Associates input with popup list |

### Keyboard Navigation

| Key | Action |
|-----|--------|
| `Alt + ↓` | Open popup |
| `Alt + ↑` | Close popup |
| `↓` | Move focus to next item / open popup |
| `↑` | Move focus to previous item |
| `Enter` | Select focused item |
| `Esc` | Close popup, keep selection |
| `Tab` | Close popup, move to next focusable element |
| `Shift + Tab` | Close popup, move to previous focusable element |
| `Home` | Focus first item |
| `End` | Focus last item |
| `Page Down` | Scroll down one page |
| `Page Up` | Scroll up one page |

**Example with accessibility focus setup:**
```cshtml
<ejs-multiselect id="accessible"
    dataSource="@ViewBag.Countries"
    placeholder="Select countries (press Alt+T to focus)"
    allowFiltering="true">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>

<script>
// Custom keyboard shortcut to focus the component
document.addEventListener('keydown', function(e) {
    if (e.altKey && e.key === 't') {
        document.getElementById('accessible').ej2_instances[0].focusIn();
    }
});
</script>
```

---

## Sorting

Sort list items before display using `sortOrder`:

```cshtml
<!-- Ascending order -->
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    placeholder="Select countries"
    sortOrder="Ascending">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>

<!-- Descending order -->
<ejs-multiselect id="countriesDesc"
    dataSource="@ViewBag.Countries"
    placeholder="Select countries"
    sortOrder="Descending">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>
```

Sort order values: `None` (default), `Ascending`, `Descending`.

---

## Right-to-Left (RTL)

Enable RTL layout for Arabic, Hebrew, and other RTL languages:

```cshtml
<ejs-multiselect id="countries"
    dataSource="@ViewBag.Countries"
    placeholder="اختر الدول"
    enableRtl="true"
    locale="ar">
    <e-multiselect-fields text="Name" value="Code"></e-multiselect-fields>
</ejs-multiselect>
```

---

## State Persistence

Persist the selected values across page reloads using `enablePersistence`:

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    enablePersistence="true">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

> State is saved to `localStorage` using the component's `id` as the key. The persisted state includes the `value` property.

---

## Readonly Mode

Prevent user interaction while keeping the component visible:

```cshtml
<ejs-multiselect id="readonlyGames"
    dataSource="@ViewBag.Games"
    value="@(new int[] { 1, 3 })"
    placeholder="Games (readonly)"
    readonly="true">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

In readonly mode: value is displayed, but the popup cannot be opened and values cannot be changed. Tab key still works for navigation.

---

## Float Label

Display a floating label that animates above the input on focus:

```cshtml
<!-- Auto: floats when input has value or is focused -->
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    floatLabelType="Auto">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>

<!-- Always: label always floats above -->
<ejs-multiselect id="games2"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    floatLabelType="Always">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

`floatLabelType` values: `Never` (default), `Auto`, `Always`.

---

## HTML Attributes

Pass custom HTML attributes (like `title`, `name`, `data-*`) to the underlying input element:

```cshtml
@{
    var htmlAttrs = new { title = "Select one or more games", name = "GameSelection", data_required = "true" };
}

<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    htmlAttributes="@htmlAttrs">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

---

## z-Index Configuration

Control the popup's stacking order (useful in modals/dialogs):

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    zIndex="2000">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

Default: `1000`. Increase when the popup is hidden behind modal overlays.

---

## Device Full Screen Mode

By default, on mobile devices with filtering enabled, the popup opens in full-screen. Disable for consistent desktop-like behavior:

```cshtml
<ejs-multiselect id="games"
    dataSource="@ViewBag.Games"
    placeholder="Select games"
    allowFiltering="true"
    isDeviceFullScreen="false">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

---

## See Also

- [Getting Started](getting-started.md) — Initial setup and configuration
- [Checkbox & Selection](checkbox-and-selection.md) — Selection modes
- [API Reference](api.md) — Full property list
