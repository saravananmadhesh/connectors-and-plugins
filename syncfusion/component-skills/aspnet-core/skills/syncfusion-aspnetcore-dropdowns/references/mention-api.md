# API Reference – Syncfusion ASP.NET Core Mention

> Source: https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.dropdowns.mention.html
> Class: `Syncfusion.EJ2.DropDowns.Mention`
> Assembly: `Syncfusion.EJ2.dll`

## Table of Contents
- [Properties](#properties)
- [MentionFieldSettings Properties](#mentionfieldsettings-properties)
- [Events](#events)

---

## Properties

### AllowSpaces
Defines whether to allow the space in the middle of mention while searching. When disabled, the space ends the mention component search.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" allowSpaces="true"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### CssClass
Defines class/multiple classes separated by a space for the mention component.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" cssClass="custom-mention"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### DataSource
Accepts the list items either through local or remote service and binds it to the component. It can be an array of JSON objects or an instance of `DataManager`.

| Detail | Value |
|---|---|
| Type | `object` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
</ejs-mention>
```

---

### DebounceDelay
Specifies the delay time in milliseconds for filtering operations.

| Detail | Value |
|---|---|
| Type | `double` |
| Default | `300` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" debounceDelay="500"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### DisplayTemplate
Specifies the template for the selected value from the suggestion list. This template appears inline in the editor after a suggestion is selected.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    displayTemplate="<span>${FirstName} - ${City}</span>">
    <e-mention-fields text="FirstName" value="FirstName"></e-mention-fields>
</ejs-mention>
```

---

### Fields
Defines the fields of the Mention to map with the data source and binds the data to the component.

| Sub-field | Purpose |
|---|---|
| `text` | Maps the display text column from data source |
| `value` | Maps the value column from data source |
| `groupBy` | Maps the column to group list items |
| `iconCss` | Maps the icon CSS class column |
| `disabled` | Maps the disabled state column |
| `htmlAttributes` | Allows additional HTML attributes for the item element |

| Detail | Value |
|---|---|
| Type | `MentionFieldSettings` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
    <e-mention-fields text="Name" value="ID" groupBy="Category" disabled="IsDisabled">
    </e-mention-fields>
</ejs-mention>
```

---

### FilterType
Determines the filter type used during search action.

| Option | Description |
|---|---|
| `StartsWith` | Matches items beginning with typed text |
| `EndsWith` | Matches items ending with typed text |
| `Contains` | Matches items containing typed text (default) |

| Detail | Value |
|---|---|
| Type | `FilterType` |
| Default | `FilterType.Contains` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" filterType="StartsWith"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### Highlight
Specifies whether to highlight the searched characters in suggestion list items.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" highlight="true"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### HtmlAttributes
Allows additional HTML attributes such as `title`, `name`, etc. in a key-value pair format applied to the root element.

| Detail | Value |
|---|---|
| Type | `object` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    htmlAttributes="@(new { title = "Type @ to mention" })"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### IgnoreCase
Specifies whether the searches are case-insensitive. When `true`, searches ignore case; when `false`, searches are case-sensitive.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `true` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" ignoreCase="false"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### ItemTemplate
Specifies the template for each item in the suggestion list.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    itemTemplate="<span><img src='${EmpImage}' />${FirstName}</span>">
    <e-mention-fields text="FirstName" value="FirstName"></e-mention-fields>
</ejs-mention>
```

---

### Locale
Overrides the global culture and localization value for this component. Default global culture is `en-US`.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `"en-US"` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" locale="fr"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### MentionChar
Specifies the symbol or single character which triggers the search action in the mention component.

| Detail | Value |
|---|---|
| Type | `char` |
| Default | `'@'` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" mentionChar="#"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### MinLength
Specifies the minimum length of user input to initiate the search action. Default is `0` where the suggestion list opens as soon as the user inputs the mention character.

| Detail | Value |
|---|---|
| Type | `int` |
| Default | `0` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" minLength="3"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### NoRecordsTemplate
Specifies the template for the no-records message displayed when there are no items matching the search in the suggestion list.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `"No records found"` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    noRecordsTemplate="<span class='no-rec'>No user found</span>"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### PopupHeight
Specifies the height of the popup in pixels/number/percentage. The number value is considered as pixels.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `"300px"` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" popupHeight="200px"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### PopupWidth
Specifies the width of the popup in pixels/number/percentage. The number value is considered as pixels.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `"auto"` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" popupWidth="300px"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### Query
Specifies the external query, which can be customized and filtered against the data source.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    query="new ej.data.Query().from('Customers').select(['ContactName']).take(6)">
    <e-mention-fields text="ContactName" value="ContactName"></e-mention-fields>
    <e-data-manager url="url/"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-mention>
```

---

### RequireLeadingSpace
Specifies whether a space is required before the mention character to trigger the suggestion list. When `false`, the suggestion list is triggered even without a space before the mention character.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `true` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" requireLeadingSpace="false"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### ShowMentionChar
Specifies whether to show the configured `mentionChar` as a prefix with the selected text in the editor.

| Detail | Value |
|---|---|
| Type | `bool` |
| Default | `false` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" showMentionChar="true"
    mentionChar="@" dataSource="@ViewBag.data">
</ejs-mention>
```

---

### SortOrder
Specifies the order to sort the data source.

| Option | Description |
|---|---|
| `None` | The data source is not sorted (default) |
| `Ascending` | The data source is sorted in ascending order |
| `Descending` | The data source is sorted in descending order |

| Detail | Value |
|---|---|
| Type | `SortOrder` |
| Default | `SortOrder.None` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" sortOrder="Ascending"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### SpinnerTemplate
Specifies the template shown while data is loading in the popup.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    spinnerTemplate="<div class='spinner'>Loading...</div>">
    <e-data-manager url="/api/users" adaptor="WebApiAdaptor"></e-data-manager>
</ejs-mention>
```

---

### SuffixText
Specifies the custom suffix to append along with the selected item text when inserted into the editor. You can use a space `" "` or new line `"\n"` as the suffix.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` (empty string) |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" suffixText=" "
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### SuggestionCount
Specifies the number of items to display in the suggestion list.

| Detail | Value |
|---|---|
| Type | `int` |
| Default | `25` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" suggestionCount="10"
    dataSource="@ViewBag.data">
</ejs-mention>
```

---

### Target
Specifies the target selector where the mention component needs to be displayed. The mention component listens to the target element's user input and displays suggestions as soon as the user inputs the mention character.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<div id="mentionTarget" contenteditable="true"></div>

<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
</ejs-mention>
```

---

## MentionFieldSettings Properties

The `<e-mention-fields>` child tag maps data source columns to Mention display properties.

### Text
Maps the display text column from the data source for each list item.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

---

### Value
Maps the value column from the data source for each list item.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
    <e-mention-fields text="Name" value="ID"></e-mention-fields>
</ejs-mention>
```

---

### GroupBy
Groups the list items with related items by mapping the `groupBy` field.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
    <e-mention-fields text="Name" value="ID" groupBy="Category"></e-mention-fields>
</ejs-mention>
```

---

### IconCss
Maps the icon CSS class column from the data source for each list item.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
    <e-mention-fields text="Name" iconCss="IconClass"></e-mention-fields>
</ejs-mention>
```

---

### Disabled
Defines whether the particular field value is disabled or not. Maps the disabled state column from the data source.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
    <e-mention-fields text="Name" value="ID" disabled="IsDisabled"></e-mention-fields>
</ejs-mention>
```

---

### HtmlAttributes (FieldSettings)
Allows additional HTML attributes such as `title`, `disabled`, etc. to configure item elements.

| Detail | Value |
|---|---|
| Type | `string` |
| Default | `null` |

---

## Events

### ActionBegin
Triggers before fetching data from the remote server.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" actionBegin="onActionBegin">
    <e-data-manager url="/api/users" adaptor="WebApiAdaptor"></e-data-manager>
</ejs-mention>
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
<ejs-mention id="mentionElement" target="#mentionTarget" actionComplete="onActionComplete">
    <e-data-manager url="/api/users" adaptor="WebApiAdaptor"></e-data-manager>
</ejs-mention>
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
<ejs-mention id="mentionElement" target="#mentionTarget" actionFailure="onActionFailure">
    <e-data-manager url="/api/users" adaptor="WebApiAdaptor"></e-data-manager>
</ejs-mention>
<script>
    function onActionFailure(args) { console.error("Fetch failed:", args); }
</script>
```

---

### BeforeOpen
Triggers before the popup is opened.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" beforeOpen="onBeforeOpen"
    dataSource="@ViewBag.data">
</ejs-mention>
<script>
    function onBeforeOpen(args) { /* can cancel with args.cancel = true */ }
</script>
```

---

### Change
Triggers when an item in a popup is selected and updated in the editor.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" change="onChange"
    dataSource="@ViewBag.data">
</ejs-mention>
<script>
    function onChange(args) { console.log("Selected value:", args.value); }
</script>
```

---

### Closed
Triggers after the popup is closed.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" closed="onClosed"
    dataSource="@ViewBag.data">
</ejs-mention>
<script>
    function onClosed(args) { console.log("Popup closed"); }
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
<ejs-mention id="mentionElement" target="#mentionTarget" created="onCreated"
    dataSource="@ViewBag.data">
</ejs-mention>
<script>
    function onCreated() { console.log("Mention component created"); }
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
<ejs-mention id="mentionElement" target="#mentionTarget" destroyed="onDestroyed"
    dataSource="@ViewBag.data">
</ejs-mention>
<script>
    function onDestroyed() { console.log("Component destroyed"); }
</script>
```

---

### Filtering
Triggers on typing a character in the component. Use to implement custom filtering logic.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" filtering="onFiltering"
    dataSource="@ViewBag.data">
    <e-mention-fields text="Name" value="ID"></e-mention-fields>
</ejs-mention>
<script>
    function onFiltering(args) {
        var query = new ej.data.Query().where('Name', 'contains', args.text, true);
        args.updateData(this.dataSource, query);
    }
</script>
```

---

### Opened
Triggers after the popup opens.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" opened="onOpened"
    dataSource="@ViewBag.data">
</ejs-mention>
<script>
    function onOpened(args) { console.log("Popup opened"); }
</script>
```

---

### Select
Triggers when an item in the popup is selected by the user either with mouse/tap or keyboard navigation.

| Detail | Value |
|---|---|
| Type | `string` (JS function name) |
| Default | `null` |

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget" select="onSelect"
    dataSource="@ViewBag.data">
</ejs-mention>
<script>
    function onSelect(args) {
        console.log("Selected item data:", args.itemData);
    }
</script>
```
