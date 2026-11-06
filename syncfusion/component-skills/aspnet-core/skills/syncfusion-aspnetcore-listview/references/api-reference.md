# API Reference - ListView

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [Field Settings](#field-settings)
- [Enumerations](#enumerations)
- [Methods](#methods)

---

## Properties

### Core Properties

| Property | Type | Description | Reference |
|----------|------|-------------|-----------|
| `id` | string | Unique identifier for the ListView element | [Getting Started](getting-started-and-data-binding.md) |
| `dataSource` | IEnumerable\<T\> / string | Data source for ListView | [Getting Started](getting-started-and-data-binding.md) |
| `enabled` | bool | Enable or disable ListView. Default: `true` | [Advanced Features](advanced-features-persistence.md) |
| `fields` | FieldSettingsModel | Configure data field mappings | [Field Settings](field-settings-and-configuration.md) |
| `query` | Query | DataManager Query for data operations | [Getting Started](getting-started-and-data-binding.md) |
| `sortOrder` | SortOrder | Ascending, Descending, or None | [Sorting & Filtering](sorting-filtering-scrolling.md) |

### Display Properties

| Property | Type | Description | Reference |
|----------|------|-------------|-----------|
| `height` | string | ListView height (px, %, or auto) | [Styling & Appearance](styling-appearance-properties.md) |
| `width` | string | ListView width (px, %, or auto) | [Styling & Appearance](styling-appearance-properties.md) |
| `cssClass` | string | Custom CSS classes | [Styling & Appearance](styling-appearance-properties.md) |
| `showHeader` | bool | Show or hide header. Default: `false` | [Styling & Appearance](styling-appearance-properties.md) |
| `showIcon` | bool | Show or hide item icons. Default: `false` | [Styling & Appearance](styling-appearance-properties.md) |
| `headerTitle` | string | Header title text | [Styling & Appearance](styling-appearance-properties.md) |
| `htmlAttributes` | Dictionary\<string, object\> | HTML attributes (aria-label, data-*, etc.) | [Accessibility](accessibility-keyboard-aria.md) |

### Selection & Checkbox Properties

| Property | Type | Description | Reference |
|----------|------|-------------|-----------|
| `showCheckBox` | bool | Enable checkboxes. Default: `false` | [Checkboxes & Selection](checkboxes-selection-events.md) |
| `checkBoxPosition` | CheckBoxPosition | Left or Right position for checkboxes | [Checkboxes & Selection](checkboxes-selection-events.md) |

### Template Properties

| Property | Type | Description | Reference |
|----------|------|-------------|-----------|
| `template` | string | Item template HTML | [Templates & Customization](templates-and-customization.md) |
| `headerTemplate` | string | Header template HTML | [Templates & Customization](templates-and-customization.md) |
| `groupTemplate` | string | Group header template HTML | [Grouping & Nested Lists](grouping-nested-lists-virtualization.md) |

### State & Persistence Properties

| Property | Type | Description | Reference |
|----------|------|-------------|-----------|
| `enablePersistence` | bool | Persist ListView state to localStorage | [Advanced Features](advanced-features-persistence.md) |
| `locale` | string | Language/region code (en-US, fr-FR, etc.) | [Advanced Features](advanced-features-persistence.md) |
| `enableRtl` | bool | Enable Right-to-Left layout | [Accessibility](accessibility-keyboard-aria.md) |

### Performance & Virtualization

| Property | Type | Description | Reference |
|----------|------|-------------|-----------|
| `enableVirtualization` | bool | Enable virtual scrolling for large lists | [Grouping & Nested Lists](grouping-nested-lists-virtualization.md) |

### Animation & HTML

| Property | Type | Description | Reference |
|----------|------|-------------|-----------|
| `animationSettings` | AnimationSettingsModel | Animation configuration | [Advanced Features](advanced-features-persistence.md) |
| `disableHtmlEncode` | bool | Allow HTML in item text. Default: `false` | [Advanced Features](advanced-features-persistence.md) |
| `enableHtmlSanitizer` | bool | Sanitize HTML content. Default: `false` | [Advanced Features](advanced-features-persistence.md) |



---

## Events

### Selection Events

| Event | Arguments Type | Description | Reference |
|-------|----------------|-------------|-----------|
| `select` | SelectEventArgs | Triggered when item is selected | [Checkboxes & Selection](checkboxes-selection-events.md) |
| `actionBegin` | ActionBeginEventArgs | Triggered before action execution | [Events & Error Handling](events-and-error-handling.md) |
| `actionComplete` | ActionCompleteEventArgs | Triggered after action completes | [Events & Error Handling](events-and-error-handling.md) |
| `actionFailure` | ActionFailureEventArgs | Triggered when action fails | [Events & Error Handling](events-and-error-handling.md) |

### Scroll Events

| Event | Arguments Type | Description | Reference |
|-------|----------------|-------------|-----------|
| `scroll` | ScrolledEventArgs | Triggered when list is scrolled | [Sorting & Filtering](sorting-filtering-scrolling.md) |

---

## Field Settings

### FieldSettingsModel Properties

Configure how data fields map to ListView display:

| Field | Type | Description | Reference |
|-------|------|-------------|-----------|
| `id` | string | Unique identifier field name | [Field Settings](field-settings-and-configuration.md) |
| `text` | string | Display text field name | [Field Settings](field-settings-and-configuration.md) |
| `enabled` | string | Enable/disable state field name | [Field Settings](field-settings-and-configuration.md) |
| `isChecked` | string | Checkbox state field name | [Field Settings](field-settings-and-configuration.md) |
| `isVisible` | string | Visibility state field name | [Field Settings](field-settings-and-configuration.md) |
| `iconCss` | string | Icon CSS class field name | [Field Settings](field-settings-and-configuration.md) |
| `tooltip` | string | Tooltip text field name | [Field Settings](field-settings-and-configuration.md) |
| `groupBy` | string | Grouping field name | [Grouping & Nested Lists](grouping-nested-lists-virtualization.md) |
| `child` | string | Nested list property name | [Grouping & Nested Lists](grouping-nested-lists-virtualization.md) |
| `sortBy` | string | Sort field name (used with `sortOrder`) | [Sorting & Filtering](sorting-filtering-scrolling.md) |

### Usage Example

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Items">
    <e-listview-fieldsettings 
        id="ProductId" 
        text="ProductName"
        iconCss="Icon"
        tooltip="Description"
        enabled="IsActive">
    </e-listview-fieldsettings>
</ejs-listview>
```

---

## Enumerations

### CheckBoxPosition

Specifies checkbox position relative to item text:

```csharp
public enum CheckBoxPosition
{
    Left = 0,   // Checkbox on left side
    Right = 1   // Checkbox on right side
}
```

**Usage:**
```cshtml
<e-listview-fieldsettings checkBoxPosition="CheckBoxPosition.Left"></e-listview-fieldsettings>
```

### SortOrder

Specifies sort direction:

```csharp
public enum SortOrder
{
    None = 0,        // No sorting
    Ascending = 1,   // A-Z, 0-9
    Descending = 2   // Z-A, 9-0
}
```

**Usage:**
```cshtml
<ejs-listview id="list" sortOrder="SortOrder.Ascending"></ejs-listview>
```

### ListViewEffect

Specifies animation effect:

```csharp
public enum ListViewEffect
{
    SlideDown = 0,
    SlideUp = 1,
    FadeIn = 2,
    FadeOut = 3,
    None = 4
}
```

**Usage:**
```csharp
// Define animation settings in controller
var animationSettings = new ListViewAnimationSettings
{
    Effect = ListViewEffect.SlideDown,
    Duration = 400,
    Easing = "ease-in"
};
ViewBag.AnimationSettings = animationSettings;
```

```cshtml
<!-- Bind to animation property -->
<ejs-listview id="animated" 
    dataSource="@ViewBag.Items" 
    animation="@ViewBag.AnimationSettings">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Direction

Specifies scroll direction:

```csharp
public enum Direction
{
    Down = 1,   // Scrolling downward
    Up = -1     // Scrolling upward
}
```

**Usage in Events:**
```javascript
// In scroll event handler
if (args.direction === 1) {
    // User scrolled down
} else if (args.direction === -1) {
    // User scrolled up
}
```

---

## Event Arguments

### SelectEventArgs

Triggered when item is selected:

| Property | Type | Description |
|----------|------|-------------|
| `data` | object | Selected item data |
| `index` | int | Selected item index |
| `isChecked` | bool | Checkbox state (if showCheckBox enabled) |
| `text` | string | Selected item text |

**Example:**
```javascript
function OnSelect(args) {
    console.log('Selected:', args.data);
    console.log('Index:', args.index);
    console.log('Checked:', args.isChecked);
}
```

### ScrolledEventArgs

Triggered when list is scrolled:

| Property | Type | Description |
|----------|------|-------------|
| `distanceY` | int | Scroll distance in pixels (negative = up, positive = down) |
| `direction` | Direction | Direction enum (Up = -1, Down = 1) |

**Example:**
```javascript
function OnScroll(args) {
    if (args.distanceY < -100) {
        // Scrolled up significantly - load previous page
    }
}
```

### ActionBeginEventArgs

Triggered before action (data fetch, sort, etc.):

| Property | Type | Description |
|----------|------|-------------|
| `eventName` | string | Action name |
| `cancel` | bool | Set true to cancel action |

### ActionCompleteEventArgs

Triggered after action completes successfully:

| Property | Type | Description |
|----------|------|-------------|
| `count` | int | Total items loaded |
| `result` | array | Loaded items |

### ActionFailureEventArgs

Triggered when action fails:

| Property | Type | Description |
|----------|------|-------------|
| `error` | object | Error details |
| `statusCode` | int | HTTP status code |

---

## Methods

### Data Methods

| Method | Parameters | Return | Description |
|--------|-----------|--------|-------------|
| `addItem(items, index)` | items: IEnumerable\<T\>, index: int | void | Add items at specified index |
| `removeItem(item)` | item: object | void | Remove specific item |
| `enableItem(item)` | item: object | void | Enable item |
| `disableItem(item)` | item: object | void | Disable item |

### Selection Methods

| Method | Parameters | Return | Description |
|--------|-----------|--------|-------------|
| `selectItem(item)` | item: object | void | Select item |
| `unselectItem(item)` | item: object | void | Deselect item |
| `getSelectedItems()` | none | object[] | Get all selected items |

### State Methods

| Method | Parameters | Return | Description |
|--------|-----------|--------|-------------|
| `destroy()` | none | void | Destroy ListView instance |

---

## Complete Property Reference Table

### ASP.NET Core TagHelper Syntax

```cshtml
@{
    IDictionary<string, object> listAttributes = new Dictionary<string, object>()
    {
        { "role", "listbox" },
        { "aria-label", "Items" }
    };
}

<!-- All valid ListView properties with correct TagHelper syntax -->
<ejs-listview id="complete-reference"
    dataSource="@ViewBag.Items"
    enabled="true"
    height="400px"
    width="100%"
    cssClass="custom-class"
    showHeader="true"
    headerTitle="My List"
    showIcon="true"
    showCheckBox="true"
    checkBoxPosition="Left"
    locale="en-US"
    enableRtl="false"
    enablePersistence="true"
    enableVirtualization="false"
    disableHtmlEncode="false"
    enableHtmlSanitizer="true"
    sortOrder="Ascending"
    template="<div>${Name}</div>"
    headerTemplate="<div>Header</div>"
    groupTemplate="<div>${key}</div>"
    htmlAttributes="@listAttributes"
    select="OnSelect"
    scroll="OnScroll"
    actionBegin="OnActionBegin"
    actionComplete="OnActionComplete"
    actionFailure="OnActionFailure">
    
    <e-listview-fieldsettings
        id="Id"
        text="Name"
        enabled="IsEnabled"
        isChecked="IsChecked"
        isVisible="IsVisible"
        iconCss="Icon"
        tooltip="Tooltip"
        groupBy="Category"
        child="SubItems"
        sortBy="Name">
    </e-listview-fieldsettings>
    
    <e-datamanager url="/api/items" adaptor="UrlAdaptor"></e-datamanager>
</ejs-listview>
```

---

## Deprecated Properties

### enable (Deprecated)

**Status:** Deprecated after Vol 4 2025. Use `enabled` instead.

```cshtml
<!-- ❌ DEPRECATED -->
<ejs-listview enable="true"></ejs-listview>

<!-- ✅ USE INSTEAD -->
<ejs-listview enabled="true"></ejs-listview>
```

---

## Quick Reference by Use Case

### Basic List
- Properties: `id`, `dataSource`, `fields`
- Events: `select`
- [Getting Started](getting-started-and-data-binding.md)

### Grouped List
- Add: `groupBy` in fields
- Templates: `groupTemplate`
- [Grouping & Nested Lists](grouping-nested-lists-virtualization.md)

### List with Checkboxes
- Properties: `showCheckBox`, `checkBoxPosition`
- Fields: `isChecked`
- Events: `select`
- [Checkboxes & Selection](checkboxes-selection-events.md)

### Searchable/Filtered List
- Properties: `query`
- DataManager: Use `where` conditions
- Events: `select`, `scroll`
- [Sorting & Filtering](sorting-filtering-scrolling.md)

### Large Dataset (10,000+ items)
- Properties: `enableVirtualization`
- Events: `scroll` for infinite loading
- [Grouping & Nested Lists](grouping-nested-lists-virtualization.md)

### Styled/Custom List
- Properties: `cssClass`, `template`
- Fields: `iconCss`
- [Templates & Customization](templates-and-customization.md)
- [Styling & Appearance](styling-appearance-properties.md)

### Accessible List
- Properties: `enableRtl`, `htmlAttributes`
- ARIA: Set `aria-label`, `role` via htmlAttributes
- [Accessibility](accessibility-keyboard-aria.md)

### Persistent State
- Properties: `enablePersistence`
- Events: All events fire with current state
- [Advanced Features](advanced-features-persistence.md)

---

## Related Topics

- [SKILL.md - Main Router & Overview](../SKILL.md)
- [Getting Started & Data Binding](getting-started-and-data-binding.md)
- [Field Settings & Configuration](field-settings-and-configuration.md)
- [Grouping, Nested Lists & Virtualization](grouping-nested-lists-virtualization.md)
- [Templates & Customization](templates-and-customization.md)
- [Checkboxes & Selection](checkboxes-selection-events.md)
- [Styling & Appearance](styling-appearance-properties.md)
- [Events & Error Handling](events-and-error-handling.md)
- [Sorting, Filtering & Scrolling](sorting-filtering-scrolling.md)
- [Accessibility & Keyboard Navigation](accessibility-keyboard-aria.md)
- [Advanced Features & Persistence](advanced-features-persistence.md)
