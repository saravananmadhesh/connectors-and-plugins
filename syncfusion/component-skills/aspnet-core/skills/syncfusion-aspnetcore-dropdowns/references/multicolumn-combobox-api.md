# MultiColumn ComboBox API Reference

This file is a focused extraction of the official Syncfusion ASP.NET Core MultiColumn ComboBox API.  
Reference: https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.MultiColumnComboBox.MultiColumnComboBox.html#properties

---

## Properties

- `actionBegin` (string)
  - Triggers before fetching data from the remote server. Default: `null`.

- `actionComplete` (string)
  - Triggers after data is fetched successfully from the remote server. Default: `null`.

- `actionFailure` (string)
  - Triggers when the data fetch request from the remote server fails. Default: `null`.

- `actionFailureTemplate` (string)
  - Template displayed when the data fetch request from the remote server fails. Default: `'Request Failed'`.

- `allowFiltering` (boolean)
  - Specifies the filter action retrieves matched items through the `filtering` event based on the characters typed in the search TextBox. If no match is found, the value of the `noRecordsTemplate` property will be displayed. Default: `true`.

- `allowSorting` (boolean)
  - Specifies whether sorting is allowed for the columns in the dropdown list. Default: `true`.

- `change` (string)
  - Triggers when an item in a popup is selected or when the model value is changed by the user. Default: `null`.

- `close` (string)
  - Triggers when the popup is closed. Default: `null`.

- `columns` (List<Column>)
  - Specifies the number of columns and its respective fields to be displayed in the dropdown popup. Default: `null`.

- `created` (string)
  - Event callback that is raised after rendering the control. Default: `null`.

- `cssClass` (string)
  - Sets CSS classes to the root element of the component that allows customization of appearance. Default: `""`.

- `dataSource` (object)
  - Accepts the list items either through local or remote service and binds it to the component. It can be an array of JSON Objects or an instance of `DataManager`. Default: `null`.

- `disabled` (boolean)
  - Specifies a value that indicates whether the component is disabled or not. Default: `false`.

- `enablePersistence` (boolean)
  - Specifies the component's state between page reloads. If enabled, the list of states for the value will be persisted. Default: `false`.

- `enableRtl` (boolean)
  - Enable or disable rendering component in right to left direction. Default: `false`.

- `enableVirtualization` (boolean)
  - Defines whether to enable virtual scrolling in the component. Default: `false`.

- `fields` (MultiColumnComboBoxFieldSettings)
  - The `fields` property maps the columns of the data table and binds the data to the component. Sub-properties:
    - `text` — Maps the text column from data table for each list item
    - `value` — Maps the value column from data table for each list item
    - `groupBy` — Group the list items with its related items by mapping groupBy field
  - Default: `null`

- `filtering` (string)
  - Triggers on typing a character in the component. Default: `null`.

- `filterType` (FilterType)
  - Determines on which filter type, the component needs to be considered on search action. Default: `FilterType.StartsWith`.

- `floatLabelType` (FloatLabelType)
  - Specifies whether to display the floating label above the input element. Possible values are: `Never`, `Always`, `Auto`. Default: `FloatLabelType.Never`.

- `footerTemplate` (string)
  - Accepts the template design and assigns it to the footer container of the popup. Default: `null`.

- `for` (ModelExpression)
  - Overrides `Syncfusion.EJ2.EJTagHelper.For`.

- `gridSettings` (MultiColumnComboBoxGridSettings)
  - Specifies the configuration of the columns in the popup content. Default: `null`.

- `groupTemplate` (string)
  - Accepts the template design and assigns it to the group headers present in the popup list. Default: `null`.

- `htmlAttributes` (object)
  - Allows additional HTML attributes such as title, name, etc., and accepts n number of attributes in a key-value pair format. Default: `null`.

- `index` (object)
  - Gets or sets the index of the selected item in the component. Default: `null`.

- `itemTemplate` (string)
  - Accepts the template design and assigns it to each items present in the popup. Default: `null`.

- `locale` (string)
  - Overrides the global culture and localization value for this component. Default global culture is `'en-US'`. Default: `""`.

- `noRecordsTemplate` (string)
  - Accepts the template design and assigns it to popup list of component when no data is available on the component. Default: `'No records found'`.

- `open` (string)
  - Triggers when the popup opens. Default: `null`.

- `placeholder` (string)
  - Specifies a short hint that describes the expected value of the multicolumn combobox component. Default: `null`.

- `popupHeight` (string)
  - Specifies the height of the popup list. Default: `'300px'`.

- `popupWidth` (string)
  - Specifies the width of the popup list. By default, the popup width sets based on the width of the component. Default: `'100%'`.

- `query` (string)
  - Accepts the external Query that execute along with data processing. Default: `null`.

- `readonly` (boolean)
  - Specifies the user interactions on the component are disabled. Default: `false`.

- `select` (string)
  - Triggers when an item in the popup is selected by the user either with mouse/tap or with keyboard navigation. Default: `null`.

- `showClearButton` (boolean)
  - Default: `false`.

- `sortOrder` (SortOrder)
  - Specifies the `sortOrder` to sort the data source. The available type of sort orders are, `None`, `Ascending`, `Descending`. Default: `SortOrder.None`.

- `sortType` (SortType)
  - Specifies the type of sorting to be applied for the columns. `OneColumn` - Allow sorting only one column. `MultipleColumns` - Allow sorting multiple columns. Default: `SortType.OneColumn`.

- `text` (string)
  - Gets or sets the display text of the selected item. Default: `null`.

- `value` (string)
  - Gets or sets the value of the selected item. Default: `null`.

- `width` (string)
  - Specifies the width of the component. By default, the component width sets based on the width of its parent container. Default: `'100%'`.

---

## Column Properties

Each `<e-column>` supports:

- `field` (string) — Maps to data property
- `header` (string) — Column header text
- `width` (number or string) — Column width
- `textAlign` (string) — Text alignment: `'Left'`, `'Right'`, `'Center'`
- `format` (string) — Format string for display
- `visible` (boolean) — Column visibility
- `allowSorting` (boolean) — Enable sorting on column
- `allowSearching` (boolean) — Include in search
