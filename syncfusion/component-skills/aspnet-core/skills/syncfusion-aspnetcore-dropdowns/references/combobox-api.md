# ComboBoxComponent API Reference

This file is a focused extraction of the official Syncfusion ASP.NET Core ComboBox API. It lists all public properties, methods, and events.  
Reference: https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.dropdowns.combobox.html#properties

---

## Properties

- `actionBegin` (string)
  - Triggers before fetching data from the remote server. Default: `null`.

- `actionComplete` (string)
  - Triggers after data is fetched successfully from the remote server. Default: `null`.

- `actionFailure` (string)
  - Triggers when the data fetch request from the remote server fails. Default: `null`.

- `actionFailureTemplate` (string)
  - Accepts the template and assigns it to the popup list content of the component when the data fetch request from the remote server fails. Default: `"Request failed"`.

- `allowCustom` (boolean)
  - Specifies whether the component allows user defined value which does not exist in data source. Default: `true`.

- `allowFiltering` (boolean)
  - When allowFiltering is set to true, show the filter bar (search box) of the component. The filter action retrieves matched items through the `filtering` event based on the characters typed in the search TextBox. If no match is found, the value of the `noRecordsTemplate` property will be displayed. Default: `false`.

- `allowObjectBinding` (boolean)
  - Defines whether the object binding is allowed or not in the component. Default: `false`.

- `allowResize` (boolean)
  - Gets or sets a value that indicates whether the DropDownList popup can be resized. When set to `true`, a resize handle appears in the bottom-right corner of the popup, allowing the user to resize the width and height of the popup. Default: `false`.

- `autofill` (boolean)
  - Specifies whether suggest a first matched item in input when searching. No action happens when no matches found. Default: `false`.

- `beforeOpen` (string)
  - Triggers when the popup before opens. Default: `null`.

- `blur` (string)
  - Triggers when focus moves out from the component. Default: `null`.

- `change` (string)
  - Triggers when an item in a popup is selected or when the model value is changed by user. Default: `null`.

- `close` (string)
  - Triggers when the popup is closed. Default: `null`.

- `created` (string)
  - Triggers when the component is created. Default: `null`.

- `cssClass` (string)
  - Sets CSS classes to the root element of the component that allows customization of appearance. Default: `null`.

- `customValueSpecifier` (string)
  - Triggers on set a custom value to this component. Default: `null`.

- `dataBound` (string)
  - Triggers when data source is populated in the popup list. Default: `null`.

- `dataSource` (object)
  - Accepts the list items either through local or remote service and binds it to the component. It can be an array of JSON Objects or an instance of `DataManager`. Default: `null`.

- `debounceDelay` (double)
  - Specifies the delay time in milliseconds for filtering operations. Default: `300`.

- `destroyed` (string)
  - Triggers when the component is destroyed. Default: `null`.

- `enabled` (boolean)
  - Specifies a value that indicates whether the component is enabled or not. Default: `true`.

- `enablePersistence` (boolean)
  - Enable or disable persisting component's state between page reloads. If enabled, `value` state will be persisted. Default: `false`.

- `enableRtl` (boolean)
  - Enable or disable rendering component in right to left direction. Default: `false`.

- `enableVirtualization` (boolean)
  - Defines whether to enable virtual scrolling in the component. Default: `false`.

- `fields` (ComboBoxFieldSettings)
  - The `fields` property maps the columns of the data table and binds the data to the component. Sub-properties:
    - `text` — Maps the text column from data table for each list item
    - `value` — Maps the value column from data table for each list item
    - `iconCss` — Maps the icon class column from data table for each list item
    - `groupBy` — Group the list items with its related items by mapping groupBy field
  - Default: `null`

- `filtering` (string)
  - Triggers on typing a character in the component. Default: `null`.

- `filterType` (FilterType)
  - Determines on which filter type, the component needs to be considered on search action. Default: `FilterType.StartsWith`.

- `floatLabelType` (FloatLabelType)
  - Specifies whether to display the floating label above the input element. Possible values are: `Never`, `Always`, `Auto`. Default: `Syncfusion.EJ2.Inputs.FloatLabelType.Never`.

- `focus` (string)
  - Triggers when the component is focused. Default: `null`.

- `footerTemplate` (string)
  - Accepts the template design and assigns it to the footer container of the popup list. Default: `null`.

- `for` (ModelExpression)
  - Overrides `Syncfusion.EJ2.EJTagHelper.For`.

- `groupTemplate` (string)
  - Accepts the template design and assigns it to the group headers present in the popup list. Default: `null`.

- `headerTemplate` (string)
  - Accepts the template design and assigns it to the header container of the popup list. Default: `null`.

- `htmlAttributes` (object)
  - Allows additional HTML attributes such as title, name, etc., and accepts n number of attributes in a key-value pair format. Default: `null`.

- `ignoreAccent` (boolean)
  - ignoreAccent set to true, then ignores the diacritic characters or accents when filtering. Default: `null`.

- `ignoreCase` (boolean)
  - When set to false, consider the `case-sensitive` on performing the search to find suggestions. By default consider the casing. Default: `true`.

- `index` (double)
  - Gets or sets the index of the selected item in the component. Default: `Double.NaN`.

- `isDeviceFullScreen` (boolean)
  - Defines whether the popup opens in fullscreen mode on mobile devices when filtering is enabled. When set to false, the popup will display similarly on both mobile and desktop devices. Default: `true`.

- `itemTemplate` (string)
  - Accepts the template design and assigns it to each list item present in the popup. We have built-in `template engine`. Default: `null`.

- `locale` (string)
  - Overrides the global culture and localization value for this component. Default global culture is `'en-US'`. Default: `"en-US"`.

- `noRecordsTemplate` (string)
  - Accepts the template design and assigns it to popup list of component when no data is available on the component. Default: `"No records found"`.

- `open` (string)
  - Triggers when the popup opens. Default: `null`.

- `placeholder` (string)
  - Specifies a short hint that describes the expected value of the DropDownList component. Default: `null`.

- `popupHeight` (string)
  - Specifies the height of the popup list. Default: `"300px"`.

- `popupWidth` (string)
  - Specifies the width of the popup list. By default, the popup width sets based on the width of the component. Default: `"100%"`.

- `query` (string)
  - Accepts the external `Query` that execute along with data processing. Default: `null`.

- `readonly` (boolean)
  - When set to true, the user interactions on the component are disabled. Default: `false`.

- `resizeStart` (string)
  - Triggers when the user starts resizing the DropDown popup. Default: `null`.

- `resizeStop` (string)
  - Triggers when the user finishes resizing the DropDown popup. Default: `null`.

- `resizing` (string)
  - Triggers continuously while the DropDown popup is being resized by the user. This event provides live updates on the width and height of the popup. Default: `null`.

- `select` (string)
  - Triggers when an item in the popup is selected by the user either with mouse/tap or with keyboard navigation. Default: `null`.

- `showClearButton` (boolean)
  - Default: `null` (no documented default value).

- `sortOrder` (object)
  - Specifies the `sortOrder` to sort the data source. The available type of sort orders are `None`, `Ascending`, `Descending`. Default: `null`.

- `text` (string)
  - Gets or sets the display text of the selected item in the component. Default: `null`.

- `value` (object)
  - Gets or sets the value of the selected item in the component. Default: `null`.

- `width` (string)
  - Specifies the width of the component. By default, the component width sets based on the width of its parent container. You can also set the width in pixel values. Default: `"100%"`.

- `zIndex` (double)
  - Specifies the z-index value of the component popup element. Default: `1000`.
