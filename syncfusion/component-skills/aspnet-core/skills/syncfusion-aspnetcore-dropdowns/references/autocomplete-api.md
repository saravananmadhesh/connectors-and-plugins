# API Reference – Syncfusion ASP.NET Core AutoComplete

> Source: https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.dropdowns.autocomplete.html
> Class: `Syncfusion.EJ2.DropDowns.AutoComplete`
> Assembly: `Syncfusion.EJ2.dll`

## Table of Contents
- [Properties](#properties)
- [Events](#events)

---

## Properties

### ActionFailureTemplate
Accepts the template and assigns it to the popup list content when the data fetch request from the remote server fails.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `"Request failed"` |

```cshtml
<ejs-autocomplete id="ac" actionFailureTemplate="<span>Data failed to load</span>">
</ejs-autocomplete>
```

---

### AllowCustom
Specifies whether the component allows user-defined values which do not exist in the data source.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `true` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" allowCustom="false">
</ejs-autocomplete>
```

---

### AllowObjectBinding
Defines whether object binding is allowed. When `true`, the `value` property returns the full selected object instead of just the mapped field value.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" allowObjectBinding="true">
    <e-autocomplete-fields value="Text"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

### AllowResize
Gets or sets whether the AutoComplete popup can be resized. When `true`, a resize handle appears in the bottom-right corner of the popup.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" allowResize="true">
</ejs-autocomplete>
```

---

### Autofill
Specifies whether to suggest the first matched item in the input when searching. No action happens when no matches are found.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" autofill="true">
</ejs-autocomplete>
```

---

### CssClass
Sets CSS classes to the root element of the component that allows customization of appearance.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" cssClass="custom-style">
</ejs-autocomplete>
```

---

### DataSource
Accepts the list items either through local or remote service and binds it to the component. It can be an array of JSON objects or an instance of `DataManager`.

| Detail | Value |
|---|---|
| Type | `object` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@localArray">
</ejs-autocomplete>
```

---

### DebounceDelay
Specifies the delay time in milliseconds for filtering operations.

| Detail | Value |
|---|---|
| Type | `double` |
| Default | `300` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" debounceDelay="500">
</ejs-autocomplete>
```

---

### Enabled
Specifies a value that indicates whether the component is enabled or not.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `true` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" enabled="false">
</ejs-autocomplete>
```

---

### EnablePersistence
Enable or disable persisting the component's state (selected `value`) between page reloads.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" enablePersistence="true">
</ejs-autocomplete>
```

---

### EnableRtl
Enable or disable rendering the component in right-to-left direction.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" enableRtl="true">
</ejs-autocomplete>
```

---

### EnableVirtualization
Defines whether to enable virtual scrolling in the component. Efficiently renders large datasets by recycling DOM elements.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" enableVirtualization="true" popupHeight="200px">
    <e-autocomplete-fields value="Text"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

### Fields
Maps the columns of the data table and binds the data to the component.

| Sub-field | Purpose |
|---|---|
| `value` | Maps the value column |
| `groupBy` | Maps the grouping column |
| `iconCss` | Maps the icon CSS class column |
| `disabled` | Maps the disabled state column |

| Detail | Value |
|---|---|
| Type | `AutoCompleteFieldSettings` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data">
    <e-autocomplete-fields value="Name" groupBy="Category" iconCss="IconClass" disabled="IsDisabled">
    </e-autocomplete-fields>
</ejs-autocomplete>
```

---

### FilterType
Determines the filter type for search action.

| Option | Description |
|---|---|
| `StartsWith` | Matches items beginning with typed text |
| `EndsWith` | Matches items ending with typed text |
| `Contains` | Matches items containing typed text anywhere |

| Detail | Value |
|---|---|
| Type | `FilterType` |
| Default | `FilterType.Contains` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" filterType="StartsWith">
</ejs-autocomplete>
```

---

### FloatLabelType
Specifies whether to display the floating label above the input element.

| Option | Description |
|---|---|
| `Never` | Label never floats (default) |
| `Always` | Label always floats above input |
| `Auto` | Label floats when input is focused or has value |

| Detail | Value |
|---|---|
| Type | `FloatLabelType` |
| Default | `FloatLabelType.Never` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" placeholder="Select a sport" floatLabelType="Auto">
</ejs-autocomplete>
```

---

### FooterTemplate
Accepts the template design and assigns it to the footer element at the bottom of the popup list.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" footerTemplate="<div class='footer'>Total items</div>">
</ejs-autocomplete>
```

---

### GroupTemplate
Accepts the template design and assigns it to the group headers present in the popup list.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" groupTemplate="<strong>${Category}</strong>">
    <e-autocomplete-fields value="Name" groupBy="Category"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

### HeaderTemplate
Accepts the template design and assigns it to the header element at the top of the popup list.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" headerTemplate="<div class='hdr'><span>Name</span><span>Role</span></div>">
</ejs-autocomplete>
```

---

### Highlight
Specifies whether to highlight the typed characters in the suggestion list items.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" highlight="true">
</ejs-autocomplete>
```

---

### HtmlAttributes
Allows additional HTML attributes (e.g., `title`, `name`) in a key-value pair format.

| Detail | Value |
|---|---|
| Type | `object` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" htmlAttributes="@(new { title = "Select sport", name = "sport" })">
</ejs-autocomplete>
```

---

### IgnoreAccent
When `true`, ignores diacritical characters (accents) when filtering. Enables international character matching.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `null` (false) |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" ignoreAccent="true">
</ejs-autocomplete>
```

---

### IgnoreCase
When `true`, filtering is case-insensitive. When `false`, filtering is case-sensitive.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `true` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" ignoreCase="false">
</ejs-autocomplete>
```

---

### IsDeviceFullScreen
Defines whether the popup opens in fullscreen mode on mobile devices when filtering is enabled. When `false`, the popup displays similarly on both mobile and desktop.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `true` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" isDeviceFullScreen="false">
</ejs-autocomplete>
```

---

### ItemTemplate
Accepts the template design and assigns it to each list item present in the popup.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" itemTemplate="<span>${Name} - ${Role}</span>">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

### Locale
Overrides the global culture and localization value for this component instance.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `"en-US"` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" locale="fr">
</ejs-autocomplete>
```

---

### MinLength
Sets the minimum number of characters required before the search/filter action is performed.

| Detail | Value |
|---|---|
| Type | `double` |
| Default | `1` |

```cshtml
<ejs-autocomplete id="ac" minLength="3">
    <e-data-manager url="/api/customers" adaptor="WebApiAdaptor"></e-data-manager>
</ejs-autocomplete>
```

---

### NoRecordsTemplate
Accepts the template design and assigns it to the popup list when no data is available or no matches found.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `"No records found"` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" noRecordsTemplate="<span>No matches found</span>">
</ejs-autocomplete>
```

---

### Placeholder
Specifies a short hint that describes the expected value of the AutoComplete input.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" placeholder="Select a sport">
</ejs-autocomplete>
```

---

### PopupHeight
Specifies the height of the popup list.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `"300px"` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" popupHeight="250px">
</ejs-autocomplete>
```

---

### PopupWidth
Specifies the width of the popup list.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `"100%"` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" popupWidth="400px">
</ejs-autocomplete>
```

---

### Query
Accepts the external `Query` that executes along with data processing (filtering, sorting, paging).

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac"
    query="new ej.data.Query().from('Customers').select(['ContactName']).take(6)">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>
```

---

### Readonly
When `true`, the user cannot interact with the component (read-only mode).

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" value="Cricket" readonly="true">
</ejs-autocomplete>
```

---

### ShowClearButton
Specifies whether to show a clear button inside the input that allows users to clear the selected value.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | (false) |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" showClearButton="true">
</ejs-autocomplete>
```

---

### ShowPopupButton
Allows you to either show or hide the popup toggle button on the component.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" showPopupButton="true">
</ejs-autocomplete>
```

---

### SortOrder
Specifies the sort order for the data source.

| Option | Description |
|---|---|
| `None` | Data source is not sorted |
| `Ascending` | Sorted in ascending order |
| `Descending` | Sorted in descending order |

| Detail | Value |
|---|---|
| Type | `object` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" sortOrder="Ascending">
</ejs-autocomplete>
```

---

### SuggestionCount
Specifies the maximum number of items to display in the suggestion list.

| Detail | Value |
|---|---|
| Type | `double` |
| Default | `20` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" suggestionCount="5">
</ejs-autocomplete>
```

---

### Value
Gets or sets the value of the selected item in the component.

| Detail | Value |
|---|---|
| Type | `object` |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" value="Cricket">
</ejs-autocomplete>
```

---

### Width
Specifies the width of the component. Defaults to the width of its parent container.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `"100%"` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" width="300px">
</ejs-autocomplete>
```

---

### ZIndex
Specifies the z-index value of the component popup element.

| Detail | Value |
|---|---|
| Type | `double` |
| Default | `1000` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" zIndex="2000">
</ejs-autocomplete>
```

---

## Events

### ActionBegin
Triggers before fetching data from the remote server.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" actionBegin="onActionBegin">
    <e-data-manager url="/api/customers" adaptor="WebApiAdaptor"></e-data-manager>
</ejs-autocomplete>
<script>
    function onActionBegin(args) { console.log("Fetching data..."); }
</script>
```

---

### ActionComplete
Triggers after data is fetched successfully from the remote server.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" actionComplete="onActionComplete">
</ejs-autocomplete>
<script>
    function onActionComplete(args) { console.log("Data loaded:", args.result); }
</script>
```

---

### ActionFailure
Triggers when the data fetch request from the remote server fails.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" actionFailure="onActionFailure">
</ejs-autocomplete>
<script>
    function onActionFailure(args) { console.error("Fetch failed:", args); }
</script>
```

---

### BeforeOpen
Triggers before the popup opens.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" beforeOpen="onBeforeOpen">
</ejs-autocomplete>
<script>
    function onBeforeOpen(args) { /* can cancel by args.cancel = true */ }
</script>
```

---

### Blur
Triggers when focus moves out from the component.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" blur="onBlur">
</ejs-autocomplete>
<script>
    function onBlur(args) { console.log("Blurred"); }
</script>
```

---

### Change
Triggers when the value changes (user selection or programmatic change).

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" change="onChange">
</ejs-autocomplete>
<script>
    function onChange(args) { console.log("New value:", args.value); }
</script>
```

---

### Close
Triggers when the popup closes.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" close="onClose">
</ejs-autocomplete>
<script>
    function onClose(args) { console.log("Popup closed"); }
</script>
```

---

### Created
Triggers when the component is created.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" created="onCreated">
</ejs-autocomplete>
<script>
    function onCreated(args) { console.log("Component created"); }
</script>
```

---

### CustomValueSpecifier
Triggers when a custom value (not in the data source) is set to the component.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" allowCustom="true" customValueSpecifier="onCustomValue">
</ejs-autocomplete>
<script>
    function onCustomValue(args) { console.log("Custom value entered:", args.text); }
</script>
```

---

### DataBound
Triggers when the data source is populated in the popup list.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" dataBound="onDataBound">
</ejs-autocomplete>
<script>
    function onDataBound(args) { console.log("Data bound"); }
</script>
```

---

### Destroyed
Triggers when the component is destroyed.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" destroyed="onDestroyed">
</ejs-autocomplete>
<script>
    function onDestroyed(args) { console.log("Component destroyed"); }
</script>
```

---

### Filtering
Triggers on typing a character in the component. Use this event to implement custom filtering logic.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" filtering="onFiltering">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
<script>
    function onFiltering(args) {
        var query = new ej.data.Query().where('Name', 'contains', args.text, true);
        args.updateData(this.dataSource, query);
    }
</script>
```

---

### Focus
Triggers when the component receives focus.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" focus="onFocus">
</ejs-autocomplete>
<script>
    function onFocus(args) { console.log("Focused"); }
</script>
```

---

### Open
Triggers when the popup opens.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" open="onOpen">
</ejs-autocomplete>
<script>
    function onOpen(args) { console.log("Popup opened"); }
</script>
```

---

### ResizeStart
Triggers when the user starts resizing the AutoComplete popup (requires `allowResize="true"`).

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" allowResize="true" resizeStart="onResizeStart">
</ejs-autocomplete>
<script>
    function onResizeStart(args) { console.log("Resize started"); }
</script>
```

---

### ResizeStop
Triggers when the user finishes resizing the AutoComplete popup.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" allowResize="true" resizeStop="onResizeStop">
</ejs-autocomplete>
<script>
    function onResizeStop(args) { console.log("Resize stopped"); }
</script>
```

---

### Resizing
Triggers continuously while the AutoComplete popup is being resized. Provides live width and height updates.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" allowResize="true" resizing="onResizing">
</ejs-autocomplete>
<script>
    function onResizing(args) {
        console.log("Width:", args.width, "Height:", args.height);
    }
</script>
```

---

### Select
Triggers when an item in the popup is selected by the user (mouse/tap or keyboard).

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-autocomplete id="ac" dataSource="@data" select="onSelect">
</ejs-autocomplete>
<script>
    function onSelect(args) {
        console.log("Selected item:", args.item);
        console.log("Selected value:", args.itemData);
    }
</script>
```
