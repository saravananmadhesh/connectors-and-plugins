---
name: syncfusion-javascript-dropdowns
description: Comprehensive guide for implementing Syncfusion TypeScript dropdown components including AutoComplete, ComboBox, Mention, Dropdownlist, Multiselect, ListBox, and MultiColumn ComboBox. Use this when building selection interfaces, data binding, filtering, cascading dropdowns, dual list transfer, custom templates, and accessible dropdown experiences.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Dropdowns"
  components:
    - AutoComplete
    - ComboBox
    - DropDownList
    - MultiSelect
    - ListBox
    - Mention
    - MultiColumnComboBox
---

# Syncfusion javascript Dropdowns

## DropDownList

The Syncfusion DropDownList component provides a single-select dropdown with support for local/remote data binding, filtering, grouping, custom templates, virtual scrolling, accessibility, and cascading patterns — all in TypeScript.

### Documentation and Navigation Guide

#### Getting Started
📄 **Read:** [references/dropdownlist-getting-started.md](references/dropdownlist-getting-started.md)
- Installation and package dependencies
- Initializing DropDownList on input, select, and UL tags
- Binding a simple data array
- Configuring popup height and width
- First render with `appendTo`

#### Data Binding
📄 **Read:** [references/dropdownlist-data-binding.md](references/dropdownlist-data-binding.md)
- Binding arrays of strings, JSON objects, and complex nested data
- Using `fields` to map text, value, iconCss, groupBy, and disabled columns
- Remote data with `DataManager` (OData, ODataV4 adaptors)
- Using `query` to filter/sort remote data
- Primitive vs. object value binding (`allowObjectBinding`)

#### Filtering
📄 **Read:** [references/dropdownlist-filtering.md](references/dropdownlist-filtering.md)
- Enabling `allowFiltering` and the filter bar
- Handling the `filtering` event with `updateData`
- Filter types: `startsWith`, `endsWith`, `contains`
- Minimum character limit, case-sensitive filtering, diacritics (`ignoreAccent`)
- `debounceDelay` for performance
- Highlighting matched characters with `highlightSearch`
- Limiting search result count

#### Grouping
📄 **Read:** [references/dropdownlist-grouping.md](references/dropdownlist-grouping.md)
- Mapping `groupBy` field for category-based grouping
- Inline and fixed group headers
- HTML `<select>` with `<optgroup>` support
- Customizing group headers with `groupTemplate`
- Disabling the fixed group header via CSS

#### Templates
📄 **Read:** [references/dropdownlist-templates.md](references/dropdownlist-templates.md)
- `itemTemplate` — customize each list item
- `valueTemplate` — customize the selected value display
- `groupTemplate` — customize group headers
- `headerTemplate` and `footerTemplate` — static popup header/footer
- `noRecordsTemplate` and `actionFailureTemplate`

#### Features and Configuration
📄 **Read:** [references/dropdownlist-features.md](references/dropdownlist-features.md)
- Disabled items via `fields.disabled` and `disableItem` method
- Clear selection with `showClearButton` or programmatically
- Popup resize with `allowResize`
- Virtual scrolling with `enableVirtualization` for large datasets
- Incremental search (built-in)
- `floatLabelType`, `enabled`, `readonly`, `sortOrder`
- `htmlAttributes`, `cssClass`, `width`, `zIndex`

#### Events and Methods
📄 **Read:** [references/dropdownlist-events-and-methods.md](references/dropdownlist-events-and-methods.md)
- `change` event with `isInteracted` flag
- `open`, `close`, `beforeOpen`, `select`, `dataBound` events
- `actionBegin`, `actionComplete`, `actionFailure` for remote data
- `filtering`, `focus`, `blur` events
- `showPopup`, `hidePopup`, `addItem`, `getItems`, `getDataByValue`
- `dataBind`, `clear`, `refresh`, `destroy`, `focusIn`, `focusOut`

#### Cascading DropDownList
📄 **Read:** [references/dropdownlist-cascading.md](references/dropdownlist-cascading.md)
- Country → State → City cascading pattern
- Filtering child dropdown data using `change` event and `Query`
- Calling `dataBind` after property changes
- Preselecting items in cascading dropdowns

#### Style and Accessibility
📄 **Read:** [references/dropdownlist-style-and-accessibility.md](references/dropdownlist-style-and-accessibility.md)
- CSS classes for wrapper, icon, focus, hover, popup customization
- Float label with asterisk
- WAI-ARIA roles and attributes
- Full keyboard shortcut reference
- RTL support with `enableRtl`
- Localization with `L10n`

#### API Reference
📄 **Read:** [references/dropdownlist-api.md](references/dropdownlist-api.md)
- Complete property list with types and defaults
- All methods with parameters and return types
- All events with descriptions
- `FieldSettingsModel` reference

---

### Installation

```bash
npm install @syncfusion/ej2-dropdowns
npm audit
```

### Quick Start

```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

// Simple string array
let dropDownListObject: DropDownList = new DropDownList({
    dataSource: ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'],
    placeholder: 'Select a game'
});
dropDownListObject.appendTo('#ddlelement');
```

```html
<!-- index.html -->
<input type="text" id="ddlelement" />
```

---

### Common Patterns

#### JSON Data with Field Mapping
```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let sportsData: { [key: string]: Object }[] = [
    { Id: 'game1', Game: 'Badminton' },
    { Id: 'game2', Game: 'Football' },
    { Id: 'game3', Game: 'Tennis' }
];

let ddl: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select a game'
});
ddl.appendTo('#ddlelement');
```

#### Remote Data with OData
```ts
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let ddl: DropDownList = new DropDownList({
    dataSource: new DataManager({
        url: 'url', // Replace with your trusted API endpoint
        adaptor: new ODataV4Adaptor,
        crossDomain: true  // Enable only when the API origin differs from your app; use only with trusted endpoints
    }),
    query: new Query().from('Customers').select(['ContactName', 'CustomerID']).take(6),
    fields: { text: 'ContactName', value: 'CustomerID' },
    placeholder: 'Select a customer',
    sortOrder: 'Ascending'
});
ddl.appendTo('#ddlelement');
```

#### Filtering with Search Box
```ts
import { DropDownList, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager, Query } from '@syncfusion/ej2-data';

let ddl: DropDownList = new DropDownList({
    dataSource: searchData,
    fields: { text: 'Country', value: 'Index' },
    allowFiltering: true,
    placeholder: 'Select a country',
    filtering: (e: FilteringEventArgs) => {
        let query = new Query();
        query = e.text !== '' ? query.where('Country', 'startswith', e.text, true) : query;
        e.updateData(searchData, query);
    }
});
ddl.appendTo('#ddlelement');
```

#### Handling Value Change
```ts
let ddl: DropDownList = new DropDownList({
    dataSource: sportsData,
    fields: { text: 'Game', value: 'Id' },
    placeholder: 'Select a game',
    change: (args) => {
        if (args.isInteracted) {
            console.log('User selected:', args.value);
        } else {
            console.log('Programmatic change:', args.value);
        }
    }
});
```

---

### Key Properties at a Glance

| Property | Type | Purpose |
|---|---|---|
| `dataSource` | array \| DataManager | Data to populate the list |
| `fields` | FieldSettingsModel | Maps text, value, groupBy, iconCss, disabled |
| `value` | string \| number \| boolean \| object | Selected value |
| `text` | string | Display text of selected item |
| `index` | number | Index of selected item |
| `placeholder` | string | Input placeholder text |
| `allowFiltering` | boolean | Show filter bar |
| `enableVirtualization` | boolean | Virtual scroll for large lists |
| `sortOrder` | 'None' \| 'Ascending' \| 'Descending' | Sort list items |
| `showClearButton` | boolean | Show clear (×) button |
| `enabled` | boolean | Enable/disable the component |
| `readonly` | boolean | Prevent user interaction |
| `popupHeight` | string \| number | Height of popup (default 300px) |
| `popupWidth` | string \| number | Width of popup (default 100%) |

---

## MultiSelect

The Syncfusion TypeScript MultiSelect component is a feature-rich dropdown that allows users to select one or multiple values from a list. It supports data binding, filtering, grouping, cascading, custom templates, and comprehensive accessibility features.

### Documentation Navigation Guide

#### Getting Started
📄 **Read:** [references/multiselect-getting-started.md](references/multiselect-getting-started.md)
- Installation and package setup
- CSS imports and theme configuration
- Element initialization (SELECT, UL, INPUT tags)
- Basic component setup with data

#### Data Binding & Sources
📄 **Read:** [references/multiselect-data-binding.md](references/multiselect-data-binding.md)
- Binding local data arrays (strings and objects)
- Connecting to remote data sources
- DataManager configuration with adapters
- Field mapping and data format specifications

#### Selection Modes & Values
📄 **Read:** [references/multiselect-selection-modes.md](references/multiselect-selection-modes.md)
- Single and multiple selection modes
- Working with the `value` property (array of selected values)
- Getting/setting selected values programmatically
- Selection change events and handlers

#### Checkbox & Multi-Select Features
📄 **Read:** [references/multiselect-checkbox-multiselect.md](references/multiselect-checkbox-multiselect.md)
- Enabling checkbox mode for visual multi-select
- Select All / Unselect All functionality
- Delimiter mode vs visual chip display
- Customizing checkbox appearance

#### Filtering & Search
📄 **Read:** [references/multiselect-filtering-search.md](references/multiselect-filtering-search.md)
- Enabling real-time filtering
- Custom filter logic and expressions
- Minimum character validation before search
- Case-sensitive and case-insensitive filtering

#### Grouping & Sorting
📄 **Read:** [references/multiselect-grouping-sorting.md](references/multiselect-grouping-sorting.md)
- Grouping items by category field
- Sorting in ascending/descending order
- Custom group templates
- Hierarchical data grouping

#### Cascading Dropdowns
📄 **Read:** [references/multiselect-cascading-dropdowns.md](references/multiselect-cascading-dropdowns.md)
- Two-level and multi-level cascading
- Handling parent-child data synchronization
- Remote data loading with cascading
- Resetting child dropdowns when parent changes

#### Customization & Templates
📄 **Read:** [references/multiselect-customization-templates.md](references/multiselect-customization-templates.md)
- Item templates for list items
- Value templates for display area
- Group templates for grouped items
- Header and footer templates
- CSS customization and styling

#### Performance: Virtual Scrolling
📄 **Read:** [references/multiselect-virtual-scrolling.md](references/multiselect-virtual-scrolling.md)
- Enabling virtual scrolling for large datasets
- Performance optimization techniques
- Virtual scroll with filtering and grouping
- Memory and rendering considerations

#### Accessibility & Standards
📄 **Read:** [references/multiselect-accessibility.md](references/multiselect-accessibility.md)
- WCAG 2.2 compliance and standards
- Keyboard navigation (Arrow keys, Tab, Enter, Escape)
- ARIA attributes and roles
- Screen reader support and focus management

#### How-To & Troubleshooting
📄 **Read:** [references/multiselect-how-to-guide.md](references/multiselect-how-to-guide.md)
- Common implementation patterns and recipes
- Edge cases and workarounds
- Performance tips and best practices
- Troubleshooting common issues

#### API Reference
📄 **Read:** [references/multiselect-api.md](references/multiselect-api.md)
- Complete list of all properties with types and defaults
- All public methods with parameter signatures and return types
- All events with their argument types and usage
- `FieldSettingsModel` field mapping reference
- Event argument type definitions (`MultiSelectChangeEventArgs`, `SelectEventArgs`, `RemoveEventArgs`, `TaggingEventArgs`, `FilteringEventArgs`, etc.)
- Module injection guide for `CheckBoxSelection` and `VirtualScroll`

### Quick Start Example

#### Basic Setup

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

// Initialize with simple string data
const multiSelect = new MultiSelect({
  dataSource: ['Apple', 'Banana', 'Orange', 'Mango'],
  placeholder: 'Select fruits'
});

multiSelect.appendTo('#select');
```

#### Multi-Select with Checkboxes

```typescript
import { MultiSelect, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';

MultiSelect.Inject(CheckBoxSelection);

const multiSelect = new MultiSelect({
  dataSource: [
    { id: '1', name: 'Apple' },
    { id: '2', name: 'Banana' },
    { id: '3', name: 'Orange' }
  ],
  fields: { text: 'name', value: 'id' },
  mode: 'CheckBox',
  showSelectAll: true,
  placeholder: 'Select fruits'
});

multiSelect.appendTo('#select');
```

#### With Filtering

```typescript
import { MultiSelect, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const data = [
  { id: '1', city: 'New York' },
  { id: '2', city: 'Los Angeles' },
  { id: '3', city: 'Chicago' }
];

const multiSelect = new MultiSelect({
  dataSource: data,
  fields: { text: 'city', value: 'id' },
  allowFiltering: true,
  filtering: (e: FilteringEventArgs) => {
    const query = new Query();
    if (e.text !== '') {
      query.where('city', 'startswith', e.text, true);
    }
    e.updateData(data, query);
  },
  placeholder: 'Search cities'
});

multiSelect.appendTo('#select');
```

### Common Patterns

#### Pattern 1: Cascading Dropdowns

```typescript
// Country dropdown
const countrySelect = new MultiSelect({
  dataSource: countries,
  fields: { text: 'name', value: 'id' },
  change: () => {
    const selectedCountry = countrySelect.value;
    // Update state dropdown based on selected country
    stateSelect.dataSource = states.filter(s => s.countryId === selectedCountry);
    stateSelect.refresh();
  }
});

countrySelect.appendTo('#country');
```

#### Pattern 2: Remote Data Binding

```typescript
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const multiSelect = new MultiSelect({
  dataSource: new DataManager({
    url: 'url', // Replace with your trusted API endpoint
    adaptor: new ODataV4Adaptor(),
    crossDomain: true  // Enable only when the API origin differs from your app; use only with trusted endpoints
  }),
  query: new Query().select(['ContactName', 'CustomerID']).take(10),
  fields: { text: 'ContactName', value: 'CustomerID' },
  placeholder: 'Select customer'
});

multiSelect.appendTo('#select');
```

#### Pattern 3: Custom Item Template

> ⚠️ **Security note:** Template strings use `${field}` interpolation. If field values originate from user input or remote sources, sanitize/encode them before binding to prevent XSS injection.

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'firstName', value: 'id' },
  itemTemplate: '<div><span>${firstName}</span><span>${department}</span></div>',
  valueTemplate: '<span>${firstName} - ${department}</span>',
  placeholder: 'Select employee'
});

multiSelect.appendTo('#select');
```

### Key Props Quick Reference

| Prop | Type | Default | Purpose |
|------|------|---------|---------|
| `dataSource` | `array \| DataManager` | `[]` | Bind data to component |
| `fields` | `FieldSettingsModel` | `{}` | Map data fields (text, value, groupBy, iconCss) |
| `value` | `string[] \| number[] \| boolean[] \| object[]` | `null` | Get/set selected value(s) |
| `mode` | `'Box' \| 'Delimiter' \| 'Default' \| 'CheckBox'` | `'Default'` | Selection display mode |
| `allowFiltering` | `boolean` | `null` | Enable search/filter functionality |
| `enableVirtualization` | `boolean` | `false` | Enable virtual scrolling for performance |
| `itemTemplate` | `string \| Function` | `null` | Custom HTML for list items |
| `valueTemplate` | `string \| Function` | `null` | Custom HTML for selected display |
| `placeholder` | `string` | `null` | Input placeholder text |
| `showSelectAll` | `boolean` | `false` | Show Select All option in CheckBox mode |
| `enableGroupCheckBox` | `boolean` | `false` | Enable group header checkboxes in CheckBox mode |
| `maximumSelectionLength` | `number` | `1000` | Limit number of selectable items |
| `allowCustomValue` | `boolean` | `false` | Allow entering values not in the list |
| `closePopupOnSelect` | `boolean` | `true` | Keep popup open after each selection |
| `hideSelectedItem` | `boolean` | `true` | Hide selected items from dropdown list |
| `delimiterChar` | `string` | `','` | Separator character in Delimiter mode |
| `showClearButton` | `boolean` | `true` | Show remove icon on each chip |
| `showDropDownIcon` | `boolean` | `false` | Show dropdown arrow button |
| `enabled` | `boolean` | `true` | Enable/disable component |
| `readonly` | `boolean` | `false` | Make component read-only |
| `zIndex` | `number` | `1000` | z-index of the popup element |

> 📘 For the complete API including all properties, methods, and events, see [references/multiselect-api.md](references/multiselect-api.md).

### Related Features

- **Data Formats:** JSON, XML, OData, Web API
- **Themes:** Material, Bootstrap, Fabric, Tailwind
- **Grouping:** Group items by category with custom templates
- **Sorting:** Ascending, Descending sort orders
- **Localization:** Multi-language support
- **RTL Support:** Right-to-left language support
- **Keyboard Navigation:** Full keyboard accessibility

## AutoComplete

The AutoComplete component displays a matched suggestion list as the user types into an input field. It extends ComboBox with filtering-first behavior — the popup opens only when the user types, not on focus (by default).

**Key capabilities:**
- Filter suggestions by `StartsWith`, `EndsWith`, or `Contains` (default)
- Bind local arrays (strings, numbers, objects) or remote `DataManager` sources
- Highlight matched characters in the suggestion list
- Control minimum characters before filtering triggers (`minLength`)
- Handle or override filtering logic via the `filtering` event
- Programmatically open/close the popup with `showPopup()` / `hidePopup()`
- Float label support and full accessibility/keyboard navigation

---

### Navigation Guide

#### Getting Started
📄 **Read:** [references/getting-started.md](references/autocomplete-getting-started.md)
- Installation and package setup
- HTML element setup (`<input>`)
- Basic instantiation with `new AutoComplete()`
- Binding to the DOM with `appendTo()`
- CSS and theme imports
- Minimal working example

#### Filtering Configuration
📄 **Read:** [references/filtering.md](references/autocomplete-filtering.md)
- `filterType`: `StartsWith`, `EndsWith`, `Contains`
- `minLength`: minimum characters before filter runs
- `ignoreCase`: case-sensitive vs case-insensitive search
- `filtering` event: custom filter logic with `updateData()`
- `filter()` method: programmatic filtering
- Remote data filtering with `DataManager`

#### Data Binding
📄 **Read:** [references/data-binding.md](references/autocomplete-data-binding.md)
- Local string, number, and object arrays
- `fields` mapping: `text`, `value`, `iconCss`, `groupBy`
- `query` property with `DataManager`
- `htmlAttributes` for custom HTML attributes
- Remote data source patterns

#### Highlight & Suggestion Control
📄 **Read:** [references/highlight-and-suggestions.md](references/autocomplete-highlight-and-suggestions.md)
- `highlight`: visually highlight matched characters
- `suggestionCount`: limit number of popup list items
- `showPopupButton`: toggle the popup trigger button
- `showPopup()` / `hidePopup()`: programmatic popup control

#### Customization & Accessibility
📄 **Read:** [references/customization.md](references/autocomplete-customization.md)
- `floatLabelType`: `Never`, `Always`, `Auto`
- CSS class overrides and theming
- Keyboard navigation and ARIA support
- Disabled state
- RTL support

#### Virtualization
📄 **Read:** [references/virtualization.md](references/autocomplete-virtualization.md)
- `AutoComplete.Inject(VirtualScroll)` — required module injection
- `enableVirtualization: true` — activate virtual scrolling
- Local data virtualization with large arrays
- Remote data virtualization with `DataManager`
- Customizing batch size with `query.take()`
- Grouping with virtualization

#### Full API Reference
📄 **Read:** [references/api.md](references/autocomplete-api.md)
- All 37 properties with types, defaults, and TypeScript examples
- All 19 methods with full signatures, parameters, and return types
- All 18 events with event argument details and usage examples
- Covers: `actionFailureTemplate`, `allowCustom`, `allowObjectBinding`, `allowResize`, `autofill`, `cssClass`, `dataSource`, `debounceDelay`, `enablePersistence`, `enableRtl`, `enableVirtualization`, `enabled`, `fields`, `filterType`, `floatLabelType`, `footerTemplate`, `groupTemplate`, `headerTemplate`, `highlight`, `htmlAttributes`, `ignoreAccent`, `ignoreCase`, `isDeviceFullScreen`, `itemTemplate`, `locale`, `minLength`, `noRecordsTemplate`, `placeholder`, `popupHeight`, `popupWidth`, `query`, `readonly`, `showClearButton`, `showPopupButton`, `sortOrder`, `suggestionCount`, `value`, `width`, `zIndex`
- Use this when looking up a specific property, method, or event name

---

### Quick Start

```html
<!-- index.html -->
<input id="atc" type="text" />
```

```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

// Local string array
const sports: string[] = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Hockey', 'Tennis'];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: sports,
  placeholder: 'Find a sport'
});

atcObj.appendTo('#atc');
```

```css
/* Import a built-in theme */
@import '../node_modules/@syncfusion/ej2/material.css';
```

Type any character — matching items appear in the suggestion popup. Press **Enter** or click a suggestion to select.

---

### Common Patterns

#### Filter by StartsWith instead of Contains
```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sports,
  filterType: 'StartsWith',
  placeholder: 'Search'
});
atcObj.appendTo('#atc');
```

#### Object data with field mapping
```typescript
import { AutoComplete } from '@syncfusion/ej2-dropdowns';

const employees: { [key: string]: Object }[] = [
  { id: 1, name: 'Alice', dept: 'Engineering' },
  { id: 2, name: 'Bob',   dept: 'Design' },
  { id: 3, name: 'Carol', dept: 'Engineering' }
];

const atcObj: AutoComplete = new AutoComplete({
  dataSource: employees,
  fields: { value: 'id', text: 'name', groupBy: 'dept' },
  placeholder: 'Find employee'
});
atcObj.appendTo('#atc');
```

#### Custom filtering via event
```typescript
import { AutoComplete, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

const atcObj: AutoComplete = new AutoComplete({
  dataSource: sports,
  filtering: (e: FilteringEventArgs) => {
    let query: Query = new Query().where('', 'startswith', e.text, true);
    e.updateData(sports, query);
  }
});
atcObj.appendTo('#atc');
```

#### Highlight matched text with limited suggestions
```typescript
const atcObj: AutoComplete = new AutoComplete({
  dataSource: sports,
  highlight: true,
  suggestionCount: 5,
  placeholder: 'Search (max 5 results)'
});
atcObj.appendTo('#atc');
```

---

### Key Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `dataSource` | `Object[] \| DataManager \| string[]` | `[]` | Data to search |
| `fields` | `FieldSettingsModel` | `{ value: null, iconCss: null, groupBy: null }` | Maps object keys to display/value |
| `filterType` | `FilterType` | `'Contains'` | How input is matched against data |
| `minLength` | `number` | `1` | Min chars typed before filtering fires |
| `ignoreCase` | `boolean` | `true` | Case-insensitive matching |
| `ignoreAccent` | `boolean` | `false` | Ignore diacritic/accent characters when filtering |
| `highlight` | `boolean` | `false` | Highlight matched chars in popup |
| `suggestionCount` | `number` | `20` | Max items shown in popup |
| `autofill` | `boolean` | `false` | Inline auto-fill of first matched item |
| `allowCustom` | `boolean` | `true` | Allow values not in data source |
| `allowObjectBinding` | `boolean` | `false` | Return full object as `value` on selection |
| `allowResize` | `boolean` | `false` | Show resize handle on popup |
| `showPopupButton` | `boolean` | `false` | Show dropdown arrow button |
| `showClearButton` | `boolean` | `true` | Show ✕ clear button |
| `floatLabelType` | `FloatLabelType` | `'Never'` | Label float behavior |
| `htmlAttributes` | `{ [key: string]: string }` | `{}` | Extra HTML attributes on input |
| `query` | `Query` | `null` | Custom query for DataManager |
| `debounceDelay` | `number` | `300` | Delay (ms) before filter executes on keystroke |
| `sortOrder` | `SortOrder` | `null` | Sort order of popup list: `None`, `Ascending`, `Descending` |
| `enableVirtualization` | `boolean` | `false` | Virtual scrolling for large datasets |
| `isDeviceFullScreen` | `boolean` | `true` | Fullscreen popup on mobile when filtering |
| `enablePersistence` | `boolean` | `false` | Persist `value` across page reloads |
| `enableRtl` | `boolean` | `false` | Right-to-left rendering |
| `popupHeight` | `string \| number` | `'300px'` | Height of suggestion popup |
| `popupWidth` | `string \| number` | `'100%'` | Width of suggestion popup |
| `zIndex` | `number` | `1000` | Z-index of popup element |

**Key Events:**

| Event | Fires When |
|-------|-----------|
| `filtering` | Each keystroke — use `e.updateData()` to supply custom results |
| `change` | Value changes via selection or user input |
| `select` | User selects an item from the popup |
| `open` / `close` | Popup opens or closes |
| `beforeOpen` | Just before the popup opens |
| `focus` / `blur` | Component gains or loses focus |
| `dataBound` | Data source is populated in the popup |
| `actionBegin` / `actionComplete` / `actionFailure` | Remote data fetch lifecycle |
| `customValueSpecifier` | User types a value not in data source (`allowCustom: true`) |
| `resizeStart` / `resizing` / `resizeStop` | Popup resize lifecycle (`allowResize: true`) |
| `created` / `destroyed` | Component creation and destruction |

**Key Methods:** `showPopup()`, `hidePopup()`, `filter(dataSource, query?, fields?)`, `clear()`, `addItem()`, `disableItem()`, `getDataByValue()`, `getItems()`, `focusIn()`, `focusOut()`, `showSpinner()`, `hideSpinner()`, `refresh()`, `destroy()`.

## ComboBox

The **ComboBox** component allows the user to type a value directly into the input **or** choose an option from the dropdown list of predefined options. It is the flexible middle ground between a plain text input and a strict DropDownList — users are not forced to pick an existing item unless `allowCustom` is set to `false`.

**Key differentiators from DropDownList:**
- Users can type freely; custom values are accepted by default (`allowCustom: true`)
- `autofill` suggests the first matching item inline as the user types
- `customValueSpecifier` event lets you format and transform user-typed custom values
- Supports `allowFiltering` with an inline search experience (no separate filter bar)

---

### Component Overview

| Capability | ComboBox Behavior |
|---|---|
| User input | Editable — user types directly in the input field |
| Custom values | Allowed by default (`allowCustom: true`) |
| Inline suggestion | Optional via `autofill: true` |
| Filtering | Optional via `allowFiltering: true` + `filtering` event |
| Virtualization | Supported via `ComboBox.Inject(VirtualScroll)` |
| Data binding | Local arrays, object arrays, DataManager (remote) |
| Object binding | Full object value binding via `allowObjectBinding: true` |

---

### Documentation and Navigation Guide

#### Getting Started
📄 **Read:** [references/getting-started.md](references/combobox-getting-started.md)
- Installation and package setup
- CSS/theme import
- HTML element setup (`<select>` or `<input>`)
- Basic instantiation with `new ComboBox({}).appendTo('#id')`
- Initializing `value`, `text`, `index`
- `showClearButton`, `placeholder`, `width`
- Destroying the component

#### Data Binding
📄 **Read:** [references/data-binding.md](references/combobox-data-binding.md)
- Local string arrays
- Local object arrays with `fields` mapping (`text`, `value`, `groupBy`)
- `htmlAttributes` for input element customization
- Remote data with `DataManager`
- `query` property for custom data queries
- `allowObjectBinding` for full object value binding

#### Filtering
📄 **Read:** [references/filtering.md](references/combobox-filtering.md)
- Enabling search with `allowFiltering: true`
- `filtering` event and `FilteringEventArgs` usage
- `filter()` method for local and remote custom filtering
- `isDeviceFullScreen` behavior on mobile
- No-match template handling

#### Custom Values
📄 **Read:** [references/custom-values.md](references/combobox-custom-values.md)
- `allowCustom: true/false` — controlling whether typed values are accepted
- `autofill` — inline suggestion as user types
- `customValueSpecifier` event for formatting custom typed values
- `CustomValueSpecifierEventArgs` interface (`text`, `item`)
- Clearing custom values with `clear()` and `showClearButton`
- `allowObjectBinding` combined with custom values

#### Customization
📄 **Read:** [references/customization.md](references/combobox-customization.md)
- `floatLabelType`: `Never` / `Always` / `Auto`
- `cssClass` for custom styling
- `headerTemplate` / `footerTemplate` for popup header and footer
- `placeholder`, `width`, `popupHeight`, `popupWidth`
- `readonly` mode
- Popup control: `showPopup()` / `hidePopup()`
- Focus control: `focusIn()` / `focusOut()`
- Spinner: `showSpinner()` / `hideSpinner()`

#### Virtualization
📄 **Read:** [references/virtualization.md](references/combobox-virtualization.md)
- ⚠️ Required module injection: `ComboBox.Inject(VirtualScroll)`
- `enableVirtualization: true` for large datasets
- Local data virtualization
- Remote `DataManager` virtualization
- Interaction with `allowCustom` and `allowFiltering`

#### Full API Reference
📄 **Read:** [references/api.md](references/combobox-api.md)
- All 37 public properties with types, defaults, and examples
- 18 events with argument interfaces
- 19 methods with signatures and usage
- `CustomValueSpecifierEventArgs` interface

---

#### Quick Start

```typescript
import { ComboBox } from '@syncfusion/ej2-dropdowns';
import '@syncfusion/ej2-base/styles/material.css';
import '@syncfusion/ej2-inputs/styles/material.css';
import '@syncfusion/ej2-popups/styles/material.css';
import '@syncfusion/ej2-dropdowns/styles/material.css';

const sportsData: string[] = ['Badminton', 'Basketball', 'Cricket', 'Football', 'Tennis'];

const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  placeholder: 'Select or type a sport',
  allowCustom: true
});
comboBox.appendTo('#combo-element');
```

```html
<input id="combo-element" />
```

---

### Common Patterns

#### Allow Only Existing Values
```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  allowCustom: false,        // reject values not in the list
  placeholder: 'Select a sport'
});
comboBox.appendTo('#combo-element');
```

#### Inline Autofill Suggestion
```typescript
const comboBox: ComboBox = new ComboBox({
  dataSource: sportsData,
  autofill: true,            // suggests first match inline as user types
  placeholder: 'Start typing...'
});
comboBox.appendTo('#combo-element');
```

#### Filtering with Remote Data
```typescript
import { ComboBox, FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

const comboBox: ComboBox = new ComboBox({
  dataSource: new DataManager({ url: 'url', adaptor: new ODataV4Adaptor() }),
  fields: { text: 'ContactName', value: 'CustomerID' },
  allowFiltering: true,
  filtering: (args: FilteringEventArgs) => {
    const query = new Query().select(['ContactName', 'CustomerID']).take(6);
    args.updateData(comboBox.dataSource as DataManager, query);
  },
  placeholder: 'Search customers'
});
comboBox.appendTo('#combo-element');
```

#### Custom Value Formatting
```typescript
import { ComboBox, CustomValueSpecifierEventArgs } from '@syncfusion/ej2-dropdowns';

const comboBox: ComboBox = new ComboBox({
  dataSource: [{ text: 'Cricket', id: '1' }],
  fields: { text: 'text', value: 'id' },
  allowCustom: true,
  customValueSpecifier: (args: CustomValueSpecifierEventArgs) => {
    args.item = { text: args.text, id: args.text.toLowerCase() };
  }
});
comboBox.appendTo('#combo-element');
```

---

### Key Properties

| Property | Type | Default | Purpose |
|---|---|---|---|
| `dataSource` | `Object[] \| DataManager \| string[]` | `[]` | Data for the dropdown list |
| `fields` | `FieldSettingsModel` | `{}` | Map `text`, `value`, `groupBy` keys |
| `value` | `number \| string \| boolean \| object \| null` | `null` | Selected value |
| `text` | `string \| null` | `null` | Display text of selected item |
| `index` | `number \| null` | `null` | Index of selected item |
| `allowCustom` | `boolean` | `true` | Allow user-typed values not in list |
| `autofill` | `boolean` | `false` | Inline suggestion while typing |
| `allowFiltering` | `boolean` | `false` | Show search box in popup |
| `showClearButton` | `boolean` | `true` | Show ✕ button to clear selection |
| `placeholder` | `string` | `null` | Input placeholder text |
| `floatLabelType` | `FloatLabelType` | `'Never'` | Floating label behavior |
| `readonly` | `boolean` | `false` | Disable user interaction |
| `allowObjectBinding` | `boolean` | `false` | Bind full object as value |
| `enableVirtualization` | `boolean` | `false` | Enable virtual scrolling ⚠️ requires `Inject` |

## Mention

The Mention component monitors a target element (textarea, input, or contenteditable div) and opens a suggestion popup when the user types a configured trigger character (default `@`). The user selects an item and it is inserted as a styled chip into the target element.

**Key capabilities:**
- Attach to any `<textarea>`, `<input>`, or `contenteditable` element via `target`
- Configurable trigger character via `mentionChar` (default `@`)
- Bind local arrays (strings, objects) or remote `DataManager` sources
- Filter suggestions with `StartsWith`, `EndsWith`, or `Contains` (default)
- Highlight matched characters in the popup via `highlight`
- Customize the popup item layout with `itemTemplate` and the inserted chip with `displayTemplate`
- Control when the popup opens: `minLength`, `requireLeadingSpace`, `debounceDelay`
- Handle selection, change, and filtering with events
- Programmatically trigger search with `search()` and manage items with `disableItem()` / `addItem()`

---

### Navigation Guide

#### Getting Started
📄 **Read:** [references/getting-started.md](references/mention-getting-started.md)
- Installation and package setup
- CSS and theme imports
- HTML target element setup (textarea, input, contenteditable)
- Basic instantiation: `new Mention({ target: '#myTextarea', dataSource: [...] })`
- `appendTo()` usage
- `mentionChar` — trigger character configuration
- Minimal working example

#### Data Binding
📄 **Read:** [references/data-binding.md](references/mention-data-binding.md)
- Local string and number arrays
- Object arrays with `fields` mapping (`text`, `value`, `iconCss`, `groupBy`)
- Remote `DataManager` with `actionBegin` / `actionComplete` / `actionFailure` events
- `query` property for custom data queries
- `sortOrder`: `None` / `Ascending` / `Descending`
- `actionFailureTemplate` for remote error handling

#### Filtering
📄 **Read:** [references/filtering.md](references/mention-filtering.md)
- `filterType`: `StartsWith`, `EndsWith`, `Contains`
- `minLength`: minimum characters before popup appears
- `ignoreCase` and `ignoreAccent` for flexible matching
- `debounceDelay`: performance tuning for keystroke filtering
- `filtering` event and `FilteringEventArgs` — custom filter logic with `updateData()`
- Remote data filtering patterns

#### Popup and Display
📄 **Read:** [references/popup-and-display.md](references/mention-popup-and-display.md)
- `target`: binding to textarea, input, or contenteditable
- `requireLeadingSpace`: enforce space before `@`
- `allowSpaces`: allow spaces within a mention search
- `popupWidth` / `popupHeight` sizing
- `showPopup()` / `hidePopup()` programmatic control
- `zIndex` for layering
- `noRecordsTemplate` / `spinnerTemplate`
- `beforeOpen`, `opened`, `closed` popup lifecycle events

#### Templates and Customization
📄 **Read:** [references/templates-and-customization.md](references/mention-templates-and-customization.md)
- `itemTemplate`: customize each suggestion item in the popup
- `displayTemplate`: customize the inserted chip HTML
- `groupTemplate`: group header rendering in popup
- `showMentionChar`: include `@` in the inserted chip
- `suffixText`: append a space or newline after insertion
- `highlight`: bold matched characters in suggestions
- `cssClass` for component-level styling

#### Events and Methods
📄 **Read:** [references/events-and-methods.md](references/mention-events-and-methods.md)
- `select` event (`SelectEventArgs`) — fires when user picks an item
- `change` event (`MentionChangeEventArgs`) — value, previousItem, element
- `filtering` event — intercept and override suggestion data
- `search(text, x, y)` — programmatic search trigger at screen coordinates
- `disableItem(item)` — disable a specific popup item
- `addItem(items, index?)` — add new items to the suggestion list
- `getItems()` / `getDataByValue(value)` — query list state
- `created` / `destroyed` lifecycle events

#### Full API Reference
📄 **Read:** [references/api.md](references/mention-api.md)
- All 30 public properties with types, defaults, and descriptions
  - All 15 methods with signatures, parameters, and return types
  - All 12 events with event argument interface details
- `MentionChangeEventArgs` interface fields
- Use this reference when looking up a specific property, method, or event

---

### Quick Start

```html
<!-- index.html -->
<textarea id="mentionTarget" rows="5" cols="40" placeholder="Type @ to mention someone"></textarea>
<div id="mention-default"></div>
```

```typescript
import { Mention } from '@syncfusion/ej2-dropdowns';

const userData: { [key: string]: Object }[] = [
  { name: 'Alice',   id: 'alice' },
  { name: 'Bob',     id: 'bob'   },
  { name: 'Carol',   id: 'carol' },
  { name: 'David',   id: 'david' }
];

const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' }
});

mentionObj.appendTo('#mention-default');
```

```css
/* Import a built-in theme */
@import '../node_modules/@syncfusion/ej2/material.css';
```

Type `@` in the textarea — the suggestion popup opens. Type more characters to filter. Press **Enter**, **Tab**, or click to insert the selected item as a chip.

---

### Common Patterns

### Custom trigger character
```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: ['JavaScript', 'TypeScript', 'Python', 'Rust'],
  mentionChar: '#'   // use # as trigger instead of @
});
mentionObj.appendTo('#mention-default');
```

#### Require minimum characters before popup opens
```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  minLength: 2     // popup only appears after typing @ + 2 characters
});
mentionObj.appendTo('#mention-default');
```

#### Highlight matched text and limit suggestion count
```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  highlight: true,
  suggestionCount: 5
});
mentionObj.appendTo('#mention-default');
```

#### Allow spaces within a mention search
```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: [
    { name: 'Alice Smith',  id: '1' },
    { name: 'Bob Jones',    id: '2' }
  ],
  fields: { text: 'name', value: 'id' },
  allowSpaces: true   // typing "@Alice Smith" still searches
});
mentionObj.appendTo('#mention-default');
```

#### Show @-symbol in the inserted chip
```typescript
const mentionObj: Mention = new Mention({
  target: '#mentionTarget',
  dataSource: userData,
  fields: { text: 'name', value: 'id' },
  showMentionChar: true,   // chip reads "@Alice" instead of "Alice"
  suffixText: ' '          // insert a space after the chip
});
mentionObj.appendTo('#mention-default');
```

---

### Key Properties

| Property | Type | Default | Purpose |
|---|---|---|---|
| `target` | `HTMLElement \| string` | — | **Required.** The element to monitor for the trigger character |
| `dataSource` | `Object[] \| DataManager \| string[]` | `[]` | Suggestion list data |
| `fields` | `FieldSettingsModel` | `{ text: null, value: null, iconCss: null, groupBy: null }` | Map object keys |
| `mentionChar` | `string` | `'@'` | Character that opens the popup |
| `minLength` | `number` | `0` | Min chars after trigger before popup shows |
| `suggestionCount` | `number` | `25` | Max items shown in popup |
| `filterType` | `FilterType` | `'Contains'` | Match strategy for typed characters |
| `ignoreCase` | `boolean` | `true` | Case-insensitive matching |
| `highlight` | `boolean` | `false` | Bold matched characters in suggestions |
| `allowSpaces` | `boolean` | `false` | Allow spaces within the mention search string |
| `requireLeadingSpace` | `boolean` | `true` | Require a space before `@` to trigger |
| `showMentionChar` | `boolean` | `false` | Prefix inserted chip text with `mentionChar` |
| `suffixText` | `string` | `null` | Text appended after the inserted chip (e.g. `' '`) |
| `debounceDelay` | `number` | `300` | Milliseconds to wait before filtering |
| `popupHeight` | `string \| number` | `'300px'` | Popup list height |
| `popupWidth` | `string \| number` | `'auto'` | Popup list width |

**Key Events:** `select` (item picked), `change` (value updated in editor), `filtering` (custom filter logic), `beforeOpen` / `opened` / `closed` (popup lifecycle).

**Key Methods:** `showPopup()`, `hidePopup()`, `search(text, x, y)`, `disableItem(item)`, `addItem(items, index?)`, `destroy()`.

---

## ListBox

The Syncfusion TypeScript ListBox component renders a scrollable list of items from which users can select one or multiple values. Unlike a dropdown, it is always visible — making it ideal for available/selected item lists, permission assignment interfaces, and preference panels. It supports drag-and-drop, toolbar-based dual-list transfer, filtering, grouping, sorting, and checkbox selection.

**Key capabilities:**
- Single or multiple selection via `selectionSettings.mode`
- Checkbox selection with "Select All" — requires `ListBox.Inject(CheckBoxSelection)`
- Drag-and-drop reordering within a single list or between two lists via `allowDragAndDrop` + `scope`
- Dual-list (transfer list) pattern with `scope` + `toolbarSettings.items`
- Filter bar via `allowFiltering` + `filtering` event for custom logic
- Sort data with `sortOrder: 'Ascending' | 'Descending'`
- Custom item rendering with `itemTemplate`
- Enable/disable individual items with `enableItems()` or `fields.disabled`
- Full programmatic API: `addItems`, `removeItems`, `selectItems`, `moveTo`, `moveAllTo`, `getDataList`

---

### Documentation and Navigation Guide

#### Getting Started
📄 **Read:** [references/listbox-getting-started.md](references/listbox-getting-started.md)
- Installation: `npm install @syncfusion/ej2-dropdowns`
- CSS theme imports (tailwind3, material, bootstrap5, fluent, fabric)
- HTML setup: `<div id="listbox"></div>`
- Basic ListBox with static data
- `change` event handler
- Multiple selection
- Troubleshooting common setup issues

#### Data Binding
📄 **Read:** [references/listbox-data-binding.md](references/listbox-data-binding.md)
- Simple string array binding
- Object arrays with `fields` mapping (`text`, `value`, `iconCss`, `disabled`)
- Grouping with `fields.groupBy`
- Dynamic data: `addItems`, `dataBind`
- Remote data with `DataManager` and `ODataV4Adaptor`

#### Selection
📄 **Read:** [references/listbox-selection.md](references/listbox-selection.md)
- Single selection (`selectionSettings.mode: 'Single'`)
- Multiple selection (default)
- Pre-select via `value: ['id1', 'id2']`
- `maximumSelectionLength` to cap selections
- Checkbox selection: `ListBox.Inject(CheckBoxSelection)` + `selectionSettings.showCheckbox: true`
- "Select All" with `selectionSettings.showSelectAll: true`
- Programmatic select/deselect via `selectItems()` and `selectAll()`
- Get selected data with `getDataByValues()`

#### Features
📄 **Read:** [references/listbox-features.md](references/listbox-features.md)
- Filter bar: `allowFiltering`, `filterBarPlaceholder`, `filterType`
- Custom filter via `filtering` event + `args.updateData()`
- Sorting with `sortOrder: 'Ascending' | 'Descending'`
- Drag-and-drop within a single list and between two lists using `scope`
- Enable/disable items with `enableItems()` or `fields.disabled`
- Fixed height with scroll

#### Dual ListBox (Transfer List)
📄 **Read:** [references/listbox-dual-list-box.md](references/listbox-dual-list-box.md)
- Two-ListBox wiring via `scope: '#target-id'` + `toolbarSettings.items`
- All 6 toolbar operations: `moveUp`, `moveDown`, `moveTo`, `moveFrom`, `moveAllTo`, `moveAllFrom`
- Reorder-only pattern, one-direction transfer, bidirectional transfer
- Toolbar position (`Left` / `Right`)
- Programmatic transfer: `moveTo`, `moveAllTo`, `moveUp`, `moveDown`, `moveTop`, `moveBottom`
- Read updated state with `getDataList()`
- Permission assignment example

#### Icons and Templates
📄 **Read:** [references/listbox-icons-and-templates.md](references/listbox-icons-and-templates.md)
- Icon CSS via `fields.iconCss`
- Emoji icons in text field
- `itemTemplate` with `${}` string template syntax
- Template with icon + description layout
- Template with status badge
- `noRecordsTemplate` customization

#### Style and Appearance
📄 **Read:** [references/listbox-style-and-appearance.md](references/listbox-style-and-appearance.md)
- CSS theme imports (tailwind3 / material / bootstrap5 / fluent / fabric)
- Override CSS classes: `.e-listbox-wrapper`, `.e-list-item`, `.e-selected`, `.e-disabled`, `.e-list-group-item`
- `cssClass` for scoped custom styles
- Conditional item styling with `itemTemplate` + CSS
- Responsive `height` and `width`, RTL support

#### Accessibility
📄 **Read:** [references/listbox-accessibility.md](references/listbox-accessibility.md)
- WCAG 2.2 AA / Section 508 / ARIA 1.2 compliance
- Auto-applied ARIA attributes (`role`, `aria-multiselectable`, `aria-selected`)
- Custom ARIA via `htmlAttributes`
- Keyboard shortcuts table (Arrow, Space, Enter, Home, End, Shift+Arrow, Ctrl+A)
- Screen reader label association with `<label>` and `aria-live`
- RTL: `enableRtl: true` or global `enableRtl(true)`

#### How-To Guides
📄 **Read:** [references/listbox-how-to-guides.md](references/listbox-how-to-guides.md)
- Add single/multiple items with `addItems()`
- Prevent duplicate items
- Select items programmatically with `selectItems()`
- Enable/disable items with `enableItems()`
- Custom filter logic with `filtering` event
- Fixed height scroller
- Form integration: read selections with `getDataByValues()` on submit

#### API Reference
📄 **Read:** [references/listbox-api.md](references/listbox-api.md)
- All properties with types and defaults
- All methods: `addItems`, `enableItems`, `filter`, `getDataByValue`, `getDataByValues`, `getDataList`, `getItems`, `getSortedList`, `moveAllTo`, `moveBottom`, `moveDown`, `moveTo`, `moveTop`, `moveUp`, `removeItem`, `removeItems`, `selectAll`, `selectItems`
- All events: `change`, `created`, `dataBound`, `destroyed`, `drag`, `dragStart`, `drop`, `filtering`, `beforeDrop`, `beforeItemRender`
- Sub-interfaces: `FieldSettingsModel`, `SelectionSettingsModel`, `ToolbarSettingsModel`

---

### Quick Start

```html
<!-- index.html -->
<link href="node_modules/@syncfusion/ej2-base/styles/tailwind3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css" rel="stylesheet" />
<link href="node_modules/@syncfusion/ej2-dropdowns/styles/tailwind3.css" rel="stylesheet" />

<div id="listbox"></div>
```

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const data: { [key: string]: Object }[] = [
  { text: 'JavaScript', id: '1' },
  { text: 'TypeScript', id: '2' },
  { text: 'React', id: '3' },
  { text: 'Angular', id: '4' },
  { text: 'Vue', id: '5' }
];

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  change: (args) => {
    console.log('Selected values:', args.value);
  }
});

listBox.appendTo('#listbox');
```

#### With Checkbox Selection

```ts
import { ListBox, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';

ListBox.Inject(CheckBoxSelection);  // Must be called before instantiation

const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  selectionSettings: {
    showCheckbox: true,
    showSelectAll: true
  }
});

listBox.appendTo('#listbox');
```

#### Dual ListBox (Transfer List)

```html
<div id="available"></div>
<div id="selected"></div>
```

```ts
import { ListBox } from '@syncfusion/ej2-dropdowns';

const available: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  scope: '#selected',
  toolbarSettings: {
    items: ['moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom']
  }
});

const selected: ListBox = new ListBox({
  dataSource: [],
  fields: { text: 'text', value: 'id' }
});

available.appendTo('#available');
selected.appendTo('#selected');
```

---

### Common Patterns

#### Pattern 1: Checkbox Selection with "Select All"
```ts
import { ListBox, CheckBoxSelection } from '@syncfusion/ej2-dropdowns';

ListBox.Inject(CheckBoxSelection);

const listBox: ListBox = new ListBox({
  dataSource: frameworksData,
  fields: { text: 'text', value: 'id' },
  selectionSettings: { showCheckbox: true, showSelectAll: true },
  maximumSelectionLength: 3  // Allow up to 3 checkboxes
});

listBox.appendTo('#listbox');
```

#### Pattern 2: Filtering
```ts
const listBox: ListBox = new ListBox({
  dataSource: data,
  fields: { text: 'text', value: 'id' },
  allowFiltering: true,
  filterBarPlaceholder: 'Search frameworks...',
  filterType: 'Contains'
});

listBox.appendTo('#listbox');
```

#### Pattern 3: Read Selected Items on Form Submit
```ts
document.getElementById('submitBtn')!.addEventListener('click', () => {
  const selectedValues = listBox.value as string[];
  const selectedItems = listBox.getDataByValues(selectedValues);
  console.log('Submitted:', selectedItems);
});
```

---

### Key Properties

| Property | Type | Default | Purpose |
|---|---|---|---|
| `dataSource` | `array \| DataManager` | `[]` | Data to display in the list |
| `fields` | `FieldSettingsModel` | `{}` | Map text, value, iconCss, groupBy, disabled |
| `value` | `string[] \| number[] \| boolean[]` | `[]` | Pre-selected or currently selected values |
| `selectionSettings` | `SelectionSettingsModel` | `{ mode: 'Multiple' }` | Selection mode and checkbox options |
| `toolbarSettings` | `ToolbarSettingsModel` | `{ items: [] }` | Dual ListBox toolbar configuration |
| `scope` | `string` | `''` | Target ListBox ID for drag-and-drop or toolbar transfer |
| `allowFiltering` | `boolean` | `false` | Show filter/search bar |
| `allowDragAndDrop` | `boolean` | `false` | Enable drag-and-drop reordering |
| `sortOrder` | `SortOrder` | `null` | Sort items: `'Ascending'` \| `'Descending'` |
| `height` | `string \| number` | `''` | Fixed height with scroll |
| `itemTemplate` | `string \| Function` | `null` | Custom item rendering template |
| `maximumSelectionLength` | `number` | `1000` | Maximum number of selectable items |
| `enableRtl` | `boolean` | `false` | Right-to-left rendering |
| `cssClass` | `string` | `''` | Custom CSS class for scoped styling |


---

## MultiColumn ComboBox

The Syncfusion EJ2 JavaScript `MultiColumnComboBox` renders a combo box with a multi-column popup grid, enabling users to select from structured tabular data. It supports local and remote data, filtering, sorting, grouping, templates, virtualization, and full accessibility compliance.

**Package:** `@syncfusion/ej2-multicolumn-combobox`

### Navigation Guide

#### Getting Started
📄 **Read:** [references/multicolumn-combobox-getting-started.md](references/multicolumn-combobox-getting-started.md)
- Installation and package setup (`npm install @syncfusion/ej2-multicolumn-combobox`)
- CSS imports and theme configuration (Tailwind 3, Material, Bootstrap 5, Fluent, Fabric)
- HTML `<input>` target setup
- `new MultiColumnComboBox({...}).appendTo('#id')` initialization
- Binding `dataSource`, `fields`, and `columns: ColumnModel[]`
- Configuring `popupHeight` and `popupWidth`
- Minimal working example

#### Columns
📄 **Read:** [references/multicolumn-combobox-columns.md](references/multicolumn-combobox-columns.md)
- Defining columns with `ColumnModel` (field, header, width, textAlign)
- `template` for cell-level custom rendering
- `displayAsCheckBox` for boolean columns
- `customAttributes` for column CSS customization
- `headerTemplate` for custom column headers
- `format` for data formatting (C2 for currency, date skeletons)

#### Data Binding
📄 **Read:** [references/multicolumn-combobox-data-binding.md](references/multicolumn-combobox-data-binding.md)
- Binding local object arrays via `dataSource`
- Remote data binding with `DataManager` and `WebApiAdaptor` / `ODataAdaptor` / `ODataV4Adaptor`
- Mapping `fields` (`text`, `value`, `groupBy`)
- Using `query` property for filtered/limited data sets

#### Filtering
📄 **Read:** [references/multicolumn-combobox-filtering.md](references/multicolumn-combobox-filtering.md)
- Enabling/disabling filtering with `allowFiltering`
- Changing filter mode with `filterType` (`StartsWith`, `EndsWith`, `Contains`)
- `filtering` event for custom filter logic
- Disabling filtering for read-only scenarios

#### Sorting
📄 **Read:** [references/multicolumn-combobox-sorting.md](references/multicolumn-combobox-sorting.md)
- Enabling sorting with `allowSorting`
- Setting initial sort order with `sortOrder` (`None`, `Ascending`, `Descending`)
- Sorting multiple columns with `sortType` (`OneColumn`, `MultipleColumns`)
- Clicking column headers to toggle sort direction

#### Grouping
📄 **Read:** [references/multicolumn-combobox-grouping.md](references/multicolumn-combobox-grouping.md)
- Grouping data with `fields.groupBy`
- Fixed group headers in popup
- Using `groupTemplate` to customize group headers (`${key}`, `${field}`, `${count}` tokens)

#### Templates
📄 **Read:** [references/multicolumn-combobox-templates.md](references/multicolumn-combobox-templates.md)
- `itemTemplate` for customizing each row
- `headerTemplate` (on `ColumnModel`) for custom column headers
- `groupTemplate` for group header customization
- `footerTemplate` for popup footer content
- `noRecordsTemplate` for empty state display
- `actionFailureTemplate` for remote fetch error state

#### Items and Configuration
📄 **Read:** [references/multicolumn-combobox-items.md](references/multicolumn-combobox-items.md)
- Setting initial selection with `text`, `value`, `index`
- `placeholder` and `floatLabelType` for input label behavior
- `showClearButton` to allow clearing selection
- `disabled` and `readonly` states
- `width`, `popupWidth`, `popupHeight` for sizing
- `cssClass` for custom styling
- `htmlAttributes` for additional HTML attributes
- `gridSettings` for grid lines, row height, and alternate rows
- Programmatic methods: `addItems`, `focusIn`, `focusOut`, `showPopup`, `hidePopup`, `getDataByValue`, `getItems`

#### Virtualization
📄 **Read:** [references/multicolumn-combobox-virtualization.md](references/multicolumn-combobox-virtualization.md)
- Enabling `enableVirtualization` for large datasets
- Virtual scrolling with local and remote data
- Combining with `gridSettings.rowHeight` for accurate positioning
- Best practices for datasets of 100+ items

#### Events
📄 **Read:** [references/multicolumn-combobox-events.md](references/multicolumn-combobox-events.md)
- `change` — fired when value changes or item is selected
- `select` — fired on item selection
- `open` / `close` — popup open/close lifecycle
- `filtering` — fired on character input for custom filtering
- `actionBegin` / `actionComplete` / `actionFailure` — data fetch lifecycle
- `created` — post-render lifecycle hook

#### Localization
📄 **Read:** [references/multicolumn-combobox-localization.md](references/multicolumn-combobox-localization.md)
- Localizing `noRecordsTemplate` text using `L10n.load()` with the `'multicolumncombobox'` locale key
- Setting `locale` property for culture-specific rendering
- Loading translation objects
- BCP 47 language tags (e.g. `'en-US'`, `'fr-BE'`, `'de'`)

#### Accessibility
📄 **Read:** [references/multicolumn-combobox-accessibility.md](references/multicolumn-combobox-accessibility.md)
- WCAG 2.2 and Section 508 compliance
- WAI-ARIA attributes (`role="combobox"`, `aria-expanded`, `aria-selected`, `aria-readonly`, `aria-disabled`, `aria-owns`)
- Keyboard navigation shortcuts (`Alt+Down`/`Alt+Up`, Arrow keys, `PageUp`/`PageDown`, `Enter`, `Esc`, `Home`, `End`)
- RTL support with `enableRtl: true`
- Screen reader support

#### API Reference
📄 **Read:** [references/multicolumn-combobox-api.md](references/multicolumn-combobox-api.md)
- Complete list of all properties with types and defaults
- All events with their argument types
- All methods: `addItems`, `focusIn`, `focusOut`, `getDataByValue`, `getItems`, `showPopup`, `hidePopup`
- `ColumnModel` properties (field, header, width, textAlign, template, headerTemplate, displayAsCheckBox, customAttributes, format)
- `GridSettingsModel` properties (rowHeight, gridLines, enableAltRow)
- `FieldSettingsModel` properties (text, value, groupBy)

---

### Quick Start

```ts
// app.ts
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

const empData: { [key: string]: Object }[] = [
  { EmpID: 1001, Name: 'Andrew Fuller',    Designation: 'Team Lead',       Country: 'England' },
  { EmpID: 1002, Name: 'Robert',           Designation: 'Developer',       Country: 'USA'     },
  { EmpID: 1003, Name: 'Michael',          Designation: 'HR',              Country: 'Russia'  },
  { EmpID: 1004, Name: 'Steven Buchanan',  Designation: 'Product Manager', Country: 'Ukraine' }
];

const fields: object = { text: 'Name', value: 'EmpID' };

const columns: ColumnModel[] = [
  { field: 'EmpID',       header: 'Employee ID', width: 120 },
  { field: 'Name',        header: 'Name',        width: 120 },
  { field: 'Designation', header: 'Designation', width: 120 },
  { field: 'Country',     header: 'Country',     width: 100 }
];

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  columns: columns,
  placeholder: 'Select an employee'
});

mccBox.appendTo('#multicolumn');
```

```html
<!-- index.html -->
<input type="text" id="multicolumn" />
```

```css
/* styles.css */
@import '~@syncfusion/ej2-base/styles/tailwind3.css';
@import '~@syncfusion/ej2-inputs/styles/tailwind3.css';
@import '~@syncfusion/ej2-grids/styles/tailwind3.css';
@import '~@syncfusion/ej2-popups/styles/tailwind3.css';
@import '~@syncfusion/ej2-multicolumn-combobox/styles/tailwind3.css';
```

---

### Common Patterns

#### Pre-select an item by text
```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  text: 'Michael',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

#### Enable filtering with Contains mode
```ts
const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  allowFiltering: true,
  filterType: 'Contains',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

#### Enable sorting (descending) with multi-column support
```ts
import { MultiColumnComboBox, SortOrder, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  allowSorting: true,
  sortOrder: SortOrder.Descending,
  sortType: 'MultipleColumns',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

#### Remote data binding with OData v4 (security-first)

> **Security:** Do not call arbitrary third-party endpoints from client-side code. Route external API requests through a trusted server-side proxy that validates, authenticates, and sanitizes responses.

```ts
import { MultiColumnComboBox, ColumnModel } from '@syncfusion/ej2-multicolumn-combobox';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

// Use a trusted server-side proxy. Do not embed third-party URLs directly.
const dataSource: DataManager = new DataManager({
  url: 'https://your-trusted-proxy.example/api/customers',
  adaptor: new ODataV4Adaptor(),
  crossDomain: true
});

const fields: object = { text: 'FirstName', value: 'EmployeeID' };

const columns: ColumnModel[] = [
  { field: 'EmployeeID',  header: 'Employee ID', width: 120 },
  { field: 'FirstName',   header: 'Name',        width: 130 },
  { field: 'Designation', header: 'Designation', width: 120 },
  { field: 'Country',     header: 'Country',     width: 90  }
];

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: dataSource,
  fields: fields,
  placeholder: 'Select a name',
  popupHeight: '230px',
  columns: columns
});
mccBox.appendTo('#multicolumn');
```

#### Handle the value change event
```ts
import { MultiColumnComboBox, ChangeEventArgs } from '@syncfusion/ej2-multicolumn-combobox';

const mccBox: MultiColumnComboBox = new MultiColumnComboBox({
  dataSource: empData,
  fields: fields,
  columns: columns,
  change: (args: ChangeEventArgs) => {
    console.log('Selected value:', args.value);
    console.log('Display text:', args.text);
    console.log('Item data:', args.itemData);
  }
});
mccBox.appendTo('#multicolumn');
```

---

### Key Properties

| Property | Type | Default | Purpose |
|---|---|---|---|
| `dataSource` | `Object[] \| DataManager` | `[]` | Data to populate the popup grid |
| `fields` | `FieldSettingsModel` | `{text:null, value:null, groupBy:null}` | Maps data keys to display text, hidden value, and group-by |
| `columns` | `ColumnModel[]` | `[]` | Column definitions for the popup grid |
| `value` | `string` | `null` | Pre-selects an item by its value |
| `text` | `string` | `null` | Pre-selects an item by its display text |
| `index` | `number` | `null` | Pre-selects an item by zero-based index |
| `placeholder` | `string` | `null` | Hint text for the input |
| `floatLabelType` | `'Never' \| 'Always' \| 'Auto'` | `'Never'` | Floating label behavior |
| `allowFiltering` | `boolean` | `true` | Enables the filter input |
| `filterType` | `'StartsWith' \| 'EndsWith' \| 'Contains'` | `'StartsWith'` | Filter match strategy |
| `allowSorting` | `boolean` | `true` | Enables column-header sorting |
| `sortOrder` | `SortOrder` | `SortOrder.None` | Initial sort direction |
| `sortType` | `SortType` | `'OneColumn'` | One or multi-column sort |
| `enableVirtualization` | `boolean` | `false` | Virtual scrolling for large datasets |
| `enableRtl` | `boolean` | `false` | Right-to-left rendering |
| `enablePersistence` | `boolean` | `false` | Persist `value` across page reloads |
| `readonly` | `boolean` | `false` | Prevent user input |
| `disabled` | `boolean` | `false` | Fully disable the component |
| `showClearButton` | `boolean` | `false` | Show a clear (×) button |
| `cssClass` | `string` | `''` | Custom CSS class on the root element |
| `popupHeight` | `string \| number` | `'300px'` | Height of the popup |
| `popupWidth` | `string \| number` | `'100%'` | Width of the popup |
| `width` | `string \| number` | `'100%'` | Width of the input element |
| `gridSettings` | `GridSettingsModel` | `{rowHeight:null, gridLines:'Default', enableAltRow:false}` | Popup grid appearance |
| `query` | `Query` | `null` | Query for remote data |
| `htmlAttributes` | `{ [key: string]: string }` | `{}` | HTML attributes on the input |
| `locale` | `string` | `''` | Locale code (e.g. `'fr-BE'`) |
| `itemTemplate` | `string \| Function` | `null` | Custom row template |
| `groupTemplate` | `string \| Function` | `null` | Custom group header template |
| `footerTemplate` | `string \| Function` | `null` | Custom footer template |
| `noRecordsTemplate` | `string \| Function` | `'No records found'` | Empty-state template |
| `actionFailureTemplate` | `string \| Function` | `'Request failed'` | Remote error template |
