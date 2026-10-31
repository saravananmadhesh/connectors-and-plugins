# MultiSelect API Reference (ASP.NET Core)

Source: https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.dropdowns.multiselect.html

## Table of Contents
- [TagHelper Syntax](#taghelper-syntax)
- [Properties](#properties)
- [Events](#events)
- [FieldSettings Sub-Properties](#fieldsettings-sub-properties)
- [Enumerations](#enumerations)

---

## TagHelper Syntax

```cshtml
<ejs-multiselect id="..." 
    [property]="value"
    [event]="handlerName">
    <e-multiselect-fields text="..." value="..." groupBy="..." iconCss="..." disabled="...">
    </e-multiselect-fields>
</ejs-multiselect>
```

For model binding:
```cshtml
<ejs-multiselect-for id="..." for="ModelProperty" dataSource="..." ...>
</ejs-multiselect-for>
```

---

## Properties

### Data & Binding

| Property | TagHelper Attribute | Type | Default | Description |
|----------|-------------------|------|---------|-------------|
| `DataSource` | `dataSource` | object | null | Accepts local array or DataManager instance |
| `Fields` | `<e-multiselect-fields>` | MultiSelectFieldSettings | null | Maps data columns (text, value, groupBy, iconCss, disabled) |
| `Query` | `query` | string | null | External Query executed with data processing |
| `Value` | `value` | object | null | Pre-selected values (array of primitive or object) |
| `Text` | `text` | string | null | Selects the item matching this text field value |
| `AllowObjectBinding` | `allowObjectBinding` | bool | false | When true, `value` stores full objects instead of just the value field |

### Display & Mode

| Property | TagHelper Attribute | Type | Default | Description |
|----------|-------------------|------|---------|-------------|
| `Mode` | `mode` | VisualMode | Default | Selection display mode: `Default`, `Box`, `Delimiter`, `CheckBox` |
| `DelimiterChar` | `delimiterChar` | string | "," | Separator character for Default and Delimiter modes |
| `Placeholder` | `placeholder` | string | null | Placeholder text when no item is selected |
| `FloatLabelType` | `floatLabelType` | FloatLabelType | Never | Float label behavior: `Never`, `Auto`, `Always` |
| `Width` | `width` | string | "100%" | Component width |
| `CssClass` | `cssClass` | string | null | Additional CSS classes on root element |
| `HtmlAttributes` | `htmlAttributes` | object | null | Custom HTML attributes for the input element |

### Popup Configuration

| Property | TagHelper Attribute | Type | Default | Description |
|----------|-------------------|------|---------|-------------|
| `PopupHeight` | `popupHeight` | string | "300px" | Popup list height |
| `PopupWidth` | `popupWidth` | string | "100%" | Popup list width |
| `ZIndex` | `zIndex` | double | 1000 | Popup z-index stacking order |
| `AllowResize` | `allowResize` | bool | false | Enables popup resizing via drag handle |
| `ClosePopupOnSelect` | `closePopupOnSelect` | bool | true | Close popup on each item selection |
| `OpenOnClick` | `openOnClick` | bool | true | Open popup when component is clicked |

### Selection & Behavior

| Property | TagHelper Attribute | Type | Default | Description |
|----------|-------------------|------|---------|-------------|
| `MaximumSelectionLength` | `maximumSelectionLength` | double | 1000 | Maximum number of items selectable |
| `ShowSelectAll` | `showSelectAll` | bool | false | Show "Select All" header option (CheckBox mode) |
| `SelectAllText` | `selectAllText` | string | "select All" | Label for Select All option |
| `UnSelectAllText` | `unSelectAllText` | string | "select All" | Label for Unselect All option |
| `EnableSelectionOrder` | `enableSelectionOrder` | bool | true | Reorder selected items to top in popup |
| `HideSelectedItem` | `hideSelectedItem` | bool | true | Remove selected items from the visible list |
| `EnableGroupCheckBox` | `enableGroupCheckBox` | bool | false | Add checkboxes to group headers (CheckBox mode) |
| `ShowClearButton` | `showClearButton` | bool | true | Show ✕ remove button on each selected chip |
| `ShowDropDownIcon` | `showDropDownIcon` | bool | false | Show dropdown arrow icon |
| `AddTagOnBlur` | `addTagOnBlur` | bool | false | Convert typed value to tag on component blur |
| `ChangeOnBlur` | `changeOnBlur` | bool | true | Fire `change` event on blur (false = fire on each selection) |
| `AllowCustomValue` | `allowCustomValue` | bool | false | Allow user to add values not in the list |

### Filtering

| Property | TagHelper Attribute | Type | Default | Description |
|----------|-------------------|------|---------|-------------|
| `AllowFiltering` | `allowFiltering` | bool | null | Enable filter/search box in popup |
| `FilterType` | `filterType` | FilterType | StartsWith | Filter matching: `StartsWith`, `EndsWith`, `Contains` |
| `FilterBarPlaceholder` | `filterBarPlaceholder` | string | null | Placeholder text in filter search box |
| `IgnoreCase` | `ignoreCase` | bool | true | Case-insensitive filtering |
| `IgnoreAccent` | `ignoreAccent` | bool | null | Ignore diacritics/accents in filtering |
| `DebounceDelay` | `debounceDelay` | double | 300 | Milliseconds delay before filtering triggers |

### Templates

| Property | TagHelper Attribute | Type | Default | Description |
|----------|-------------------|------|---------|-------------|
| `ItemTemplate` | `itemTemplate` | string | null | Template for each popup list item |
| `ValueTemplate` | `valueTemplate` | string | null | Template for selected value display in input |
| `GroupTemplate` | `groupTemplate` | string | null | Template for group category headers |
| `HeaderTemplate` | `headerTemplate` | string | null | Static template at top of popup |
| `FooterTemplate` | `footerTemplate` | string | null | Static template at bottom of popup |
| `NoRecordsTemplate` | `noRecordsTemplate` | string | "No records found" | Template when no items match filter |
| `ActionFailureTemplate` | `actionFailureTemplate` | string | "Request failed" | Template when remote data fetch fails |

### Accessibility & Locale

| Property | TagHelper Attribute | Type | Default | Description |
|----------|-------------------|------|---------|-------------|
| `Locale` | `locale` | string | "en-US" | Culture/language override |
| `EnableRtl` | `enableRtl` | bool | false | Right-to-left rendering |
| `Enabled` | `enabled` | bool | true | Enable or disable the component |
| `Readonly` | `readonly` | bool | false | Readonly mode (display only, no interaction) |
| `EnableHtmlSanitizer` | `enableHtmlSanitizer` | bool | true | Prevent cross-site scripting in templates |

### Performance & State

| Property | TagHelper Attribute | Type | Default | Description |
|----------|-------------------|------|---------|-------------|
| `EnableVirtualization` | `enableVirtualization` | bool | false | Enable virtual scrolling for large datasets |
| `EnablePersistence` | `enablePersistence` | bool | false | Persist `value` selection in localStorage across page reloads |
| `SortOrder` | `sortOrder` | object | null | Sort data: `None`, `Ascending`, `Descending` |
| `IsDeviceFullScreen` | `isDeviceFullScreen` | bool | true | Open popup full-screen on mobile when filtering |

---

## Events

### Data Events

| Event | TagHelper Attribute | Trigger |
|-------|-------------------|---------|
| `ActionBegin` | `actionBegin` | Before fetching data from remote server |
| `ActionComplete` | `actionComplete` | After data is successfully fetched from remote server |
| `ActionFailure` | `actionFailure` | When remote data fetch request fails |
| `DataBound` | `dataBound` | When data source is populated in the popup list |

### Selection Events

| Event | TagHelper Attribute | Trigger |
|-------|-------------------|---------|
| `Select` | `select` | When popup item is selected (mouse/tap/keyboard) |
| `Removed` | `removed` | After a selected item is removed |
| `Removing` | `removing` | Before a selected item is removed |
| `Change` | `change` | After selection changes and model/input is updated |
| `SelectedAll` | `selectedAll` | After "Select All" / "Unselect All" operation completes |
| `BeforeSelectAll` | `beforeSelectAll` | Before "Select All" operation begins |
| `ChipSelection` | `chipSelection` | When a chip (selected item) is clicked/selected |
| `CustomValueSelection` | `customValueSelection` | When a user-entered custom value is selected |
| `Tagging` | `tagging` | When a selected item is rendered as a chip; use `args.setClass()` for styling |

### Popup Events

| Event | TagHelper Attribute | Trigger |
|-------|-------------------|---------|
| `Open` | `open` | After popup opens (animation complete) |
| `Close` | `close` | After popup closes (animation complete) |
| `BeforeOpen` | `beforeOpen` | Before popup opens (before animation) |

### Input Events

| Event | TagHelper Attribute | Trigger |
|-------|-------------------|---------|
| `Focus` | `focus` | When component receives focus |
| `Blur` | `blur` | When component loses focus |
| `Filtering` | `filtering` | When user types in filter box; call `args.updateData()` with filtered results |

### Lifecycle Events

| Event | TagHelper Attribute | Trigger |
|-------|-------------------|---------|
| `Created` | `created` | When component is created and mounted |
| `Destroyed` | `destroyed` | When component is destroyed |

### Resize Events (requires `allowResize="true"`)

| Event | TagHelper Attribute | Trigger |
|-------|-------------------|---------|
| `ResizeStart` | `resizeStart` | When user starts dragging the resize handle |
| `Resizing` | `resizing` | Continuously while popup is being resized |
| `ResizeStop` | `resizeStop` | When user releases the resize handle |

---

## FieldSettings Sub-Properties

Configure via `<e-multiselect-fields>` child tag:

| Field | TagHelper Attribute | Type | Description |
|-------|-------------------|------|-------------|
| `Text` | `text` | string | Data column mapped to display text |
| `Value` | `value` | string | Data column mapped to the hidden value |
| `GroupBy` | `groupBy` | string | Data column used to group list items |
| `IconCss` | `iconCss` | string | Data column with CSS class name for item icon |
| `Disabled` | `disabled` | string | Boolean data column to disable specific items |

```cshtml
<ejs-multiselect id="example" dataSource="@ViewBag.Data">
    <e-multiselect-fields 
        text="DisplayName" 
        value="Id" 
        groupBy="Category" 
        iconCss="IconClass"
        disabled="IsDisabled">
    </e-multiselect-fields>
</ejs-multiselect>
```

---

## Enumerations

### VisualMode (mode property)

| Value | Description |
|-------|-------------|
| `Default` | Selected items shown as delimiter-separated text |
| `Box` | Selected items shown as removable chips/tags |
| `Delimiter` | Selected items shown with configurable `delimiterChar` |
| `CheckBox` | Popup items show checkboxes; input shows delimited text |

### FilterType (filterType property)

| Value | Description |
|-------|-------------|
| `StartsWith` | Match items starting with the typed text (default) |
| `EndsWith` | Match items ending with the typed text |
| `Contains` | Match items containing the typed text anywhere |

### FloatLabelType (floatLabelType property)

| Value | Description |
|-------|-------------|
| `Never` | Label never floats (default) |
| `Auto` | Label floats when input is focused or has a value |
| `Always` | Label always floats above the input |

### SortOrder (sortOrder property)

| Value | Description |
|-------|-------------|
| `None` | No sorting applied (default) |
| `Ascending` | Items sorted A→Z |
| `Descending` | Items sorted Z→A |

---

## Filtering Event Args

When handling the `filtering` event, the args object provides:

| Property | Type | Description |
|----------|------|-------------|
| `args.text` | string | The typed search text |
| `args.dataSource` | object | The component's data source reference |
| `args.updateData(dataSource, query)` | method | Call this to supply filtered results back to the component |

**Example:**
```javascript
function onFiltering(args) {
    var query = new ej.data.Query();
    if (args.text !== '') {
        query = query.where('Name', 'startswith', args.text, true);
    }
    args.updateData(fullData, query);
}
```

---

## Tagging Event Args

When handling the `tagging` event:

| Property | Type | Description |
|----------|------|-------------|
| `args.itemData` | object | The full data object for the chip being rendered |
| `args.setClass(cssClass)` | method | Apply a CSS class string to the chip element |

**Example:**
```javascript
function onTagging(args) {
    if (args.itemData.Category === 'priority') {
        args.setClass('chip-danger');
    } else {
        args.setClass('chip-normal');
    }
}
```

---

## Change Event Args

The `change` event provides:

| Property | Type | Description |
|----------|------|-------------|
| `args.value` | array | Currently selected values |
| `args.itemData` | array | Full data objects for selected items |
| `args.isInteracted` | bool | True if changed by user interaction |

---

## See Also

- [Getting Started](getting-started.md) — Setup and first MultiSelect
- [Data Binding](data-binding.md) — DataSource and Fields configuration
- [Checkbox & Selection](checkbox-and-selection.md) — Mode, Select All, limits
- Official API Reference: https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.dropdowns.multiselect.html
