# ListBoxComponent API Reference

This file is a focused extraction of the official Syncfusion ASP.NET Core ListBox API. It lists all public properties, methods, and events.  
Reference: https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.dropdowns.listbox.html#properties

---

## Properties

- `actionBegin` (string)
  - Triggers before fetching data from the remote server. Default: `null`.

- `actionComplete` (string)
  - Triggers after data is fetched successfully from the remote server. Default: `null`.

- `actionFailure` (string)
  - Triggers when the data fetch request from the remote server fails. Default: `null`.

- `allowDragAndDrop` (boolean)
  - If `allowDragAndDrop` is set to `true`, then you can perform drag and drop of the list item. ListBox contains same `scope` property enables drag and drop between multiple ListBox. Default: `false`.

- `allowFiltering` (boolean)
  - To enable the filtering option in this component. Filter action performs when type in search box and collect the matched item through `filtering` event. If searching character does not match, `noRecordsTemplate` property value will be shown. Default: `false`.

- `beforeDrop` (string)
  - Triggers before dropping the list item on another list item. Default: `null`.

- `beforeItemRender` (string)
  - Triggers while rendering each list item. Default: `null`.

- `change` (string)
  - Triggers while select / unselect the list item. Default: `null`.

- `created` (string)
  - Triggers when the component is created. Default: `null`.

- `cssClass` (string)
  - Sets the CSS classes to root element of this component, which helps to customize the complete styles. Default: `""`.

- `dataBound` (string)
  - Triggers when data source is populated in the list. Default: `null`.

- `dataSource` (object)
  - Accepts the list items either through local or remote service and binds it to the component. It can be an array of JSON Objects or an instance of `DataManager`. Default: `null`.

- `destroyed` (string)
  - Triggers when the component is destroyed. Default: `null`.

- `drag` (string)
  - Triggers while dragging the list item. Default: `null`.

- `dragStart` (string)
  - Triggers after dragging the list item. Default: `null`.

- `drop` (string)
  - Triggers before dropping the list item on another list item. Default: `null`.

- `enabled` (boolean)
  - Specifies a value that indicates whether the component is enabled or not. Default: `true`.

- `enablePersistence` (boolean)
  - Enable or disable persisting component's state between page reloads. If enabled, `value` state will be persisted. Default: `false`.

- `enableRtl` (boolean)
  - Enable or disable rendering component in right to left direction. Default: `false`.

- `fields` (ListBoxFieldSettings)
  - The `fields` property maps the columns of the data table and binds the data to the component. Sub-properties:
    - `text` — Maps the text column from data table for each list item
    - `value` — Maps the value column from data table for each list item
    - `iconCss` — Maps the icon class column from data table for each list item
    - `groupBy` — Group the list items with its related items by mapping groupBy field
  - Default: `null`

- `filterBarPlaceholder` (string)
  - Accepts the value to be displayed as a watermark text on the filter bar. Default: `null`.

- `filtering` (string)
  - Triggers on typing a character in the component. Default: `null`.

- `filterType` (FilterType)
  - Determines on which filter type, the component needs to be considered on search action. Default: `FilterType.StartsWith`.

- `for` (ModelExpression)
  - Overrides `Syncfusion.EJ2.EJTagHelper.For`.

- `height` (string)
  - Sets the height of the ListBox component. Default: `""`.

- `htmlAttributes` (object)
  - Allows additional HTML attributes such as title, name, etc., and accepts n number of attributes in a key-value pair format. Default: `null`.

- `itemTemplate` (string)
  - Accepts the template design and assigns it to each list item present in the popup. We have built-in `template engine`. Default: `null`.

- `locale` (string)
  - Overrides the global culture and localization value for this component. Default global culture is `'en-US'`. Default: `"en-US"`.

- `maximumSelectionLength` (double)
  - Sets limitation to the value selection. based on the limitation, list selection will be prevented. Default: `1000`.

- `noRecordsTemplate` (string)
  - Accepts the template design and assigns it to popup list of component when no data is available on the component. Default: `"No records found"`.

- `query` (string)
  - Accepts the external `Query` which will execute along with the data processing. Default: `null`.

- `scope` (string)
  - Defines the scope value to group sets of draggable and droppable ListBox. A draggable with the same scope value will be accepted by the droppable. Default: `""`.

- `select` (string)
  - Triggers when an item in the popup is selected by the user either with mouse/tap or with keyboard navigation. Default: `null`.

- `selectionSettings` (ListBoxSelectionSettings)
  - Specifies the selection mode and its type. Default: `null`.

- `sortOrder` (object)
  - Specifies the `sortOrder` to sort the data source. The available type of sort orders are `None`, `Ascending`, `Descending`. Default: `null`.

- `toolbarSettings` (ListBoxToolbarSettings)
  - Specifies the toolbar items and its position. Default: `null`.

- `value` (object)
  - Sets the specified item to the selected state or gets the selected item in the ListBox. Default: `null`.
