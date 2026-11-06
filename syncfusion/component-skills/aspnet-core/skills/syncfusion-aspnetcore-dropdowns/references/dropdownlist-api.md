# DropDownList API Reference — ASP.NET Core (EJ2)

> **Source:** https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.dropdowns.dropdownlist.html  
> **Namespace:** `Syncfusion.EJ2.DropDowns`  
> **Tag Helper:** `<ejs-dropdownlist>`

---

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `actionFailureTemplate` | `string` | `"Request failed"` | Accepts a template and assigns it to the popup list content when the data fetch request from the remote server fails. |
| `allowFiltering` | `bool` | `false` | When set to `true`, shows the filter bar (search box). The filter action retrieves matched items through the `filtering` event based on characters typed in the search box. |
| `allowObjectBinding` | `bool` | `false` | Defines whether object binding is allowed. When enabled, the value of the control will be an object of the same type as the selected item. |
| `allowResize` | `bool` | `false` | When set to `true`, a resize handle appears in the bottom-right corner of the popup, allowing the user to resize the popup width and height. |
| `cssClass` | `string` | `null` | Sets CSS classes to the root element of the component that allows customization of appearance. |
| `dataSource` | `object` | `null` | Accepts the list items either through local or remote service and binds them to the component. Can be an array of JSON objects or an instance of `DataManager`. |
| `debounceDelay` | `double` | `300` | Specifies the delay time in milliseconds for filtering operations. Set to `0` to disable debounce. |
| `enabled` | `bool` | `true` | Specifies a value that indicates whether the component is enabled or not. |
| `enablePersistence` | `bool` | `false` | Enable or disable persisting the component's state (value) between page reloads. |
| `enableRtl` | `bool` | `false` | Enable or disable rendering the component in right-to-left direction. |
| `enableVirtualization` | `bool` | `false` | Defines whether to enable virtual scrolling in the component. When enabled, only a fixed number of DOM elements are created and reused during scroll. |
| `fields` | `DropDownListFieldSettings` | `null` | Maps the columns of the data table and binds data to the component. Sub-properties: `text`, `value`, `iconCss`, `groupBy`, `disabled`. |
| `filterBarPlaceholder` | `string` | `null` | Accepts the value to be displayed as watermark text on the filter bar. |
| `filterType` | `FilterType` | `FilterType.StartsWith` | Determines the filter type used on search action. Options: `StartsWith`, `Contains`, `EndsWith`. |
| `floatLabelType` | `FloatLabelType` | `FloatLabelType.Never` | Specifies whether to display the floating label above the input element. Options: `Never`, `Always`, `Auto`. |
| `footerTemplate` | `string` | `null` | Accepts a template design and assigns it to the footer element of the popup list. |
| `groupTemplate` | `string` | `null` | Accepts a template design and assigns it to the group headers present in the popup list. |
| `headerTemplate` | `string` | `null` | Accepts a template design and assigns it to the header element of the popup list. |
| `htmlAttributes` | `object` | `null` | Allows additional HTML attributes such as `title`, `name`, etc., in a key-value pair format. |
| `ignoreAccent` | `bool` | `false` | When set to `true`, ignores diacritic characters or accents when filtering. |
| `ignoreCase` | `bool` | `true` | When set to `false`, considers case-sensitivity when performing the search to find suggestions. |
| `index` | `double` | `Double.NaN` | Gets or sets the index of the selected item in the component. |
| `isDeviceFullScreen` | `bool` | `true` | Defines whether the popup opens in fullscreen mode on mobile devices when filtering is enabled. |
| `itemTemplate` | `string` | `null` | Accepts a template design and assigns it to each list item present in the popup. |
| `locale` | `string` | `"en-US"` | Overrides the global culture and localization value for this component. |
| `noRecordsTemplate` | `string` | `"No records found"` | Accepts a template design and assigns it to the popup list when no data is available. |
| `placeholder` | `string` | `null` | Specifies a short hint that describes the expected value of the DropDownList component. |
| `popupHeight` | `string` | `"300px"` | Specifies the height of the popup list. |
| `popupWidth` | `string` | `"100%"` | Specifies the width of the popup list. By default, the popup width sets based on the width of the component. |
| `query` | `string` | `null` | Accepts the external `Query` that executes along with data processing. |
| `readonly` | `bool` | `false` | When set to `true`, the user interactions on the component are disabled. |
| `showClearButton` | `bool` | `false` | Shows or hides the clear button in the component. |
| `sortOrder` | `object` | `null` | Specifies the sort order to sort the data source. Options: `None`, `Ascending`, `Descending`. |
| `text` | `string` | `null` | Gets or sets the display text of the selected item in the component. |
| `value` | `object` | `null` | Gets or sets the value of the selected item in the component. |
| `valueTemplate` | `string` | `null` | Accepts a template design and assigns it to the selected value displayed in the component input. |
| `width` | `string` | `"100%"` | Specifies the width of the component. |
| `zIndex` | `double` | `1000` | Specifies the z-index value of the component popup element. |

---

## DropDownListFieldSettings Sub-Properties

Configured via `<e-dropdownlist-fields>` tag helper:

| Sub-Property | Type | Description |
|--------------|------|-------------|
| `text` | `string` | Maps the text column from the data table for each list item. |
| `value` | `string` | Maps the value column from the data table for each list item (should be unique). |
| `groupBy` | `string` | Groups the list items by mapping this field. |
| `iconCss` | `string` | Maps the icon CSS class column from the data table for each list item. |
| `disabled` | `string` | Maps the disabled state column from the data table for each list item. |

---

## Events

| Event | Type | Default | Description |
|-------|------|---------|-------------|
| `actionBegin` | `string` | `null` | Triggers before fetching data from the remote server. |
| `actionComplete` | `string` | `null` | Triggers after data is fetched successfully from the remote server. |
| `actionFailure` | `string` | `null` | Triggers when the data fetch request from the remote server fails. |
| `beforeOpen` | `string` | `null` | Triggers when the popup is about to open (before it opens). |
| `blur` | `string` | `null` | Triggers when focus moves out from the component. |
| `change` | `string` | `null` | Triggers when the value of the component is changed. |
| `close` | `string` | `null` | Triggers when the popup is closed. |
| `created` | `string` | `null` | Triggers when the component is created. |
| `dataBound` | `string` | `null` | Triggers when the data source is populated in the popup list. |
| `destroyed` | `string` | `null` | Triggers when the component is destroyed. |
| `filtering` | `string` | `null` | Triggers on typing a character in the filter bar. Used with `allowFiltering` to customize filter behavior. |
| `focus` | `string` | `null` | Triggers when the component is focused. |
| `open` | `string` | `null` | Triggers when the popup opens. |
| `resizeStart` | `string` | `null` | Triggers when the user starts resizing the DropDown popup. Requires `allowResize="true"`. |
| `resizeStop` | `string` | `null` | Triggers when the user finishes resizing the DropDown popup. Requires `allowResize="true"`. |
| `resizing` | `string` | `null` | Triggers continuously while the DropDown popup is being resized. Provides live updates on width and height. Requires `allowResize="true"`. |
| `select` | `string` | `null` | Triggers when an item in the popup is selected by the user either with mouse/tap or keyboard navigation. |

---

## Tag Helper Syntax Reference

### Basic Usage
```html
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    placeholder="Select an item"
    popupHeight="300px"
    popupWidth="100%">
</ejs-dropdownlist>
```

### With Field Mapping
```html
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    placeholder="Select an item">
    <e-dropdownlist-fields text="Name" value="Id" groupBy="Category" disabled="IsDisabled"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

### With Remote DataManager

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```html
<ejs-dropdownlist id="ddl"
    placeholder="Select a customer"
    query="new ej.data.Query().from('Customers').select(['ContactName','CustomerID']).take(6)">
    <e-data-manager url="/api/customers"
                    adaptor="UrlAdaptor">
    </e-data-manager>
    <e-dropdownlist-fields text="ContactName" value="CustomerID"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

### With Filtering
```html
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    filterType="Contains"
    filterBarPlaceholder="Search..."
    debounceDelay="300"
    ignoreAccent="true"
    ignoreCase="true"
    filtering="onFiltering"
    placeholder="Select an item">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

### With Templates
```html
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    placeholder="Select an item"
    itemTemplate="<span>${Name} - ${Category}</span>"
    valueTemplate="<span>${Name}</span>"
    headerTemplate="<span><b>Name</b></span>"
    footerTemplate="<span>Total items: 10</span>"
    groupTemplate="<strong>${Category}</strong>"
    noRecordsTemplate="<span>No data available</span>"
    actionFailureTemplate="<span>Request failed</span>">
    <e-dropdownlist-fields text="Name" value="Id" groupBy="Category"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

### With Virtual Scrolling
```html
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    enableVirtualization="true"
    allowFiltering="true"
    popupHeight="200px"
    placeholder="Select an item">
    <e-dropdownlist-fields text="Text" value="ID"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

### With Popup Resize
```html
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    allowResize="true"
    placeholder="Select an item"
    resizeStart="onResizeStart"
    resizeStop="onResizeStop"
    resizing="onResizing">
    <e-dropdownlist-fields value="Status"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

### With Events
```html
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    change="onChange"
    open="onOpen"
    close="onClose"
    select="onSelect"
    created="onCreated"
    focus="onFocus"
    blur="onBlur"
    dataBound="onDataBound"
    actionBegin="onActionBegin"
    actionComplete="onActionComplete"
    actionFailure="onActionFailure"
    filtering="onFiltering"
    beforeOpen="onBeforeOpen"
    placeholder="Select an item">
</ejs-dropdownlist>
```

---

## Complete Property Quick Reference

```html
<ejs-dropdownlist
    id="ddl"
    dataSource="@ViewBag.data"
    value="@ViewBag.selectedValue"
    text=""
    index="0"
    placeholder="Select an item"
    cssClass=""
    width="100%"
    popupHeight="300px"
    popupWidth="100%"
    zIndex="1000"
    enabled="true"
    readonly="false"
    showClearButton="false"
    allowFiltering="false"
    filterType="StartsWith"
    filterBarPlaceholder=""
    debounceDelay="300"
    ignoreCase="true"
    ignoreAccent="false"
    allowObjectBinding="false"
    allowResize="false"
    enableVirtualization="false"
    enablePersistence="false"
    enableRtl="false"
    floatLabelType="Never"
    isDeviceFullScreen="true"
    locale="en-US"
    query=""
    sortOrder="None"
    itemTemplate=""
    valueTemplate=""
    headerTemplate=""
    footerTemplate=""
    groupTemplate=""
    noRecordsTemplate="No records found"
    actionFailureTemplate="Request failed">
    <e-dropdownlist-fields text="Text" value="Id" groupBy="Group" iconCss="Icon" disabled="IsDisabled">
    </e-dropdownlist-fields>
</ejs-dropdownlist>
```
