---
name: syncfusion-aspnetcore-dropdowns
description: Comprehensive guide for implementing Syncfusion ASP.NET Core dropdown components including DropDownList, MultiSelect, AutoComplete, Mention, ComboBox, ListBox, and MultiColumn ComboBox. Single and multiple selection control with data binding, filtering, grouping, templates, and accessibility features. Essential for building professional dropdown interfaces with server-side data binding.
metadata:
  author: "Syncfusion Inc"
  category: "Dropdowns"
  version: "34.1.29"
---

# Implementing Syncfusion ASP.NET Core Dropdowns

## DropDownList

The DropDownList (`<ejs-dropdownlist>`) is a single-selection control that displays a list of predefined values. It supports local and remote data binding, real-time filtering, grouping, custom templates, virtual scrolling, popup resize, localization, and full WCAG 2.2 AA accessibility.

### Component Overview

**Tag Helper:** `<ejs-dropdownlist>`  
**Namespace:** `Syncfusion.EJ2.DropDowns`  
**NuGet:** `Syncfusion.EJ2.AspNet.Core`

**Key Features:**
- Data binding from local arrays and remote sources (OData V4, Web API, URL Adaptor)
- Value binding for primitive types and complex objects (`allowObjectBinding`)
- Real-time filtering with search box (`allowFiltering`, `filterType`, `debounceDelay`)
- Grouping items using `fields.groupBy`
- Disabled items using `fields.disabled`
- Customizable templates: `itemTemplate`, `valueTemplate`, `headerTemplate`, `footerTemplate`, `groupTemplate`, `noRecordsTemplate`, `actionFailureTemplate`
- Virtual scrolling for large datasets (`enableVirtualization`)
- Popup resize by user (`allowResize`)
- WCAG 2.2 AA compliance, keyboard navigation, ARIA support
- RTL rendering (`enableRtl`)
- Localization (`locale`)
- Float label support (`floatLabelType`)
- State persistence (`enablePersistence`)
- Clear button (`showClearButton`)

### API Reference

📄 **Full API:** [references/api.md](references/dropdownlist-api.md)
- All properties with types, defaults, and descriptions
- All events
- Field settings (`<e-dropdownlist-fields>`)
- Tag helper syntax examples for all features

### Documentation and Navigation Guide

#### Getting Started
📄 **Read:** [references/getting-started.md](references/dropdownlist-getting-started.md)
- NuGet package installation
- TagHelper registration (`_ViewImports.cshtml`)
- **⚠️ CDN vs. Local Hosting:** See Security & Trust Boundary below for SRI and local hosting alternatives
- Script Manager registration
- Basic DropDownList tag helper usage
- Popup height/width configuration
- Change event handling

#### Data Binding and Value Binding
📄 **Read:** [references/data-binding.md](references/dropdownlist-data-binding.md)
- Binding array of primitive data (strings, numbers)
- Binding complex JSON objects with `<e-dropdownlist-fields>`
- Nested/complex data with dot-notation field paths
- Value binding for primitive types (pre-selecting)
- Object binding with `allowObjectBinding`
- Remote data: OData V4, OData, Web API, URL Adaptor
- Offline mode (`DataManager offline="true"`)
- `actionBegin`, `actionComplete`, `actionFailure` events

#### Filtering and Grouping
📄 **Read:** [references/filtering-grouping.md](references/dropdownlist-filtering-grouping.md)
- Enable filtering with `allowFiltering`
- Filter types: `StartsWith`, `Contains`, `EndsWith`
- Minimum character limit before remote request
- Case-sensitive filtering with `ignoreCase`
- Diacritics filtering with `ignoreAccent`
- Debounce delay with `debounceDelay`
- Filter bar placeholder with `filterBarPlaceholder`
- Grouping with `fields.groupBy`
- Custom group header with `groupTemplate`
- Disabled items with `fields.disabled`
- Sort order: `None`, `Ascending`, `Descending`

#### Templates and Styling
📄 **Read:** [references/templates-styling.md](references/dropdownlist-templates-styling.md)
- `itemTemplate` — customize popup list items
- `valueTemplate` — customize selected value in input
- `headerTemplate` — static header in popup
- `footerTemplate` — static footer in popup
- `groupTemplate` — custom group headers
- `noRecordsTemplate` — no data state
- `actionFailureTemplate` — remote fetch failure state
- `floatLabelType` — float label behavior
- `cssClass` — custom CSS class
- CSS structures for appearance customization

#### Accessibility and Localization
📄 **Read:** [references/accessibility-features.md](references/dropdownlist-accessibility-features.md)
- WCAG 2.2 Level AA compliance
- WAI-ARIA attributes (`aria-haspopup`, `aria-expanded`, `aria-selected`, etc.)
- Full keyboard navigation shortcut reference
- RTL support with `enableRtl`
- Localization with `locale` and `L10n.load()`
- Readonly vs disabled states
- `enablePersistence` for state persistence
- `isDeviceFullScreen` for mobile popup behavior

#### Advanced Scenarios
📄 **Read:** [references/advanced-scenarios.md](references/dropdownlist-advanced-scenarios.md)
- Virtual scrolling with `enableVirtualization` (local and remote)
- Virtualization with grouping and filtering
- Customizing item count in virtualization
- Popup resize with `allowResize`, `resizeStart`, `resizeStop`, `resizing` events
- Cascading dropdowns (parent-child dependent selection)
- Remote data with filtering
- Pre-selecting values (by `value`, `text`, or `index`)
- `showClearButton` usage
- `htmlAttributes` for extra HTML attributes
- All events reference with usage examples

### Quick Start Example

**Controller (`HomeController.cs`):**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<object>
    {
        new { Id = 1, Name = "Electronics" },
        new { Id = 2, Name = "Furniture" },
        new { Id = 3, Name = "Clothing" }
    };
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
<ejs-dropdownlist id="category"
    dataSource="@ViewBag.data"
    placeholder="Select category"
    change="onCategoryChange">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>

<script>
function onCategoryChange(args) {
    console.log('Selected ID:', args.value);
}
</script>
```

### Common Patterns

#### Pattern 1: Basic Selection with Event Handling

```cshtml
<ejs-dropdownlist id="category"
    dataSource="@ViewBag.Categories"
    placeholder="Select category"
    change="onCategoryChange">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>

<script>
function onCategoryChange(args) {
    console.log('Selected ID:', args.value);
}
</script>
```

#### Pattern 2: Cascading Dropdowns (Secure Server-Side Proxy)

**⚠️ Security Note:** Avoid client-side direct fetch to untrusted external endpoints. Use a server-side proxy that validates, authenticates, and sanitizes responses.

**Controller (Server-Side Proxy):**
```csharp
public IActionResult Index()
{
    ViewBag.Countries = new List<Country>
    {
        new Country { Id = 1, Name = "USA" },
        new Country { Id = 2, Name = "Canada" }
    };
    return View();
}

// ✅ SECURE: Server-side proxy validates countryId and returns only whitelisted data
[HttpGet("api/cities/{countryId}")]
public IActionResult GetCities(int countryId)
{
    // Validate countryId is within acceptable range
    if (countryId <= 0 || countryId > 100)
        return BadRequest("Invalid country ID");
    
    var cities = new List<City>
    {
        new City { Id = 1, Name = "New York",  CountryId = 1 },
        new City { Id = 2, Name = "Toronto",   CountryId = 2 }
    };
    
    // Return only safe, schema-validated data
    return Json(cities.Where(c => c.CountryId == countryId)
        .Select(c => new { c.Id, c.Name })
        .ToList());
}
```

**View (Secure Client):**
```cshtml
<ejs-dropdownlist id="Country"
    dataSource="@ViewBag.Countries"
    change="onCountryChange"
    placeholder="Select country">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>

<ejs-dropdownlist id="City" placeholder="Select city">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>

<script>
function onCountryChange(args) {
    var cityDDL = document.getElementById('City').ej2_instances[0];
    if (args.value) {
        // ✅ SECURE: Fetch only from same-origin API endpoint (same server)
        fetch("/api/cities/" + encodeURIComponent(args.value), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'same-origin'  // Include CSRF tokens via cookies
        })
        .then(response => {
            if (!response.ok) throw new Error('Server error: ' + response.status);
            return response.json();
        })
        .then(data => {
            // Validate response is an array before binding
            if (Array.isArray(data)) {
                cityDDL.dataSource = data;
                cityDDL.value = null;
            } else {
                console.error('Invalid data format received');
                cityDDL.dataSource = [];
            }
        })
        .catch(error => {
            console.error('Failed to load cities:', error);
            cityDDL.dataSource = [];
        });
    } else {
        cityDDL.dataSource = [];
    }
}
</script>
```

#### Pattern 3: Remote Data with Filtering (Secure Same-Origin Proxy)

**⚠️ Security Note:** Avoid `crossDomain="true"` and direct binding to external OData/WebAPI endpoints. Always proxy through your own server to control validation and access.

```cshtml
<!-- ✅ SECURE: Remove crossDomain, use same-origin server proxy -->
<ejs-dropdownlist id="customers"
    allowFiltering="true"
    filtering="onfiltering"
    query="new ej.data.Query().from('api/customers').select(['ContactName', 'CustomerID']).take(6)"
    placeholder="Select a customer"
    popupHeight="200px">
    <e-dropdownlist-fields text="ContactName" value="CustomerID"></e-dropdownlist-fields>
    <e-data-manager url="/api/customers"
                    adaptor="UrlAdaptor">  <!-- UrlAdaptor for same-origin JSON endpoint -->
    </e-data-manager>
</ejs-dropdownlist>

<script>
function onfiltering(e) {
    var ddl = document.getElementById("customers").ej2_instances[0];
    var query = new ej.data.Query().from('api/customers').select(['ContactName', 'CustomerID']).take(6);
    query = e.text !== '' ? query.where('ContactName', 'startswith', e.text, true) : query;
    e.updateData(ddl.dataSource, query);
}
</script>
```

**Controller (Server-Side Proxy):**
```csharp
// ✅ SECURE: Server validates, filters, and returns safe subset of data
[HttpGet("api/customers")]
public IActionResult GetCustomers([FromQuery] string skip = "0", [FromQuery] string take = "6", [FromQuery] string where = "")
{
    int skipVal = Math.Max(0, int.TryParse(skip, out var s) ? s : 0);
    int takeVal = Math.Min(50, int.TryParse(take, out var t) && t > 0 ? t : 6);
    
    // Example: fetch from secure internal data source
    var customers = _context.Customers
        .AsNoTracking()
        .Select(c => new { c.CustomerID, c.ContactName })
        .Skip(skipVal)
        .Take(takeVal)
        .ToList();
    
    return Ok(new { d = customers, count = customers.Count });
}
```

### Key Properties and When to Use

| Property | Attribute | When to Use |
|----------|-----------|-------------|
| `DataSource` | `dataSource` | Always required to populate items |
| `Fields` | `<e-dropdownlist-fields>` | When binding complex JSON objects |
| `Value` | `value` | Pre-selecting an item |
| `Index` | `index` | Pre-selecting by position |
| `AllowFiltering` | `allowFiltering` | For lists with many items |
| `FilterType` | `filterType` | Customize search match behavior |
| `DebounceDelay` | `debounceDelay` | Reduce filter frequency while typing |
| `EnableVirtualization` | `enableVirtualization` | For very large datasets |
| `AllowResize` | `allowResize` | Allow user to resize popup |
| `ItemTemplate` | `itemTemplate` | Rich item rendering |
| `ValueTemplate` | `valueTemplate` | Custom selected value display |
| `GroupTemplate` | `groupTemplate` | Custom group headers |
| `ShowClearButton` | `showClearButton` | Allow clearing selection |
| `Enabled` | `enabled` | Conditional enable/disable |
| `Readonly` | `readonly` | Display-only mode |
| `EnableRtl` | `enableRtl` | RTL language support |
| `Locale` | `locale` | Localized text |

---

### Next Steps

- **Just starting?** → [Getting Started](references/dropdownlist-getting-started.md)
- **Binding server data?** → [Data Binding](references/dropdownlist-data-binding.md)
- **Need filtering or grouping?** → [Filtering and Grouping](references/dropdownlist-filtering-grouping.md)
- **Customizing appearance?** → [Templates and Styling](references/dropdownlist-templates-styling.md)
- **Accessibility or localization?** → [Accessibility and Localization](references/dropdownlist-accessibility-features.md)
- **Virtual scroll, resize, cascading?** → [Advanced Scenarios](references/dropdownlist-advanced-scenarios.md)
- **Complete API reference?** → [API Reference](references/dropdownlist-api.md)

---

## MultiSelect Dropdown

The Syncfusion MultiSelect Dropdown is a powerful component for selecting multiple values from a predefined list. It supports checkbox selection, filtering, grouping, templates, virtual scrolling, and rich data binding — all using ASP.NET Core TagHelper syntax.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/getting-started.md](references/multiselect-getting-started.md)
- NuGet package installation and TagHelper setup
- CDN stylesheet and script references
- First MultiSelect with basic configuration
- Popup height/width configuration
- Form integration and MultiSelectFor

#### Data Binding & Value Binding
📄 **Read:** [references/data-binding.md](references/multiselect-data-binding.md)
- Binding array of strings, objects, and complex data
- Remote data: OData, WebAPI, URL Adaptor, offline mode
- Fields mapping (text, value, groupBy, iconCss, disabled)
- Primitive vs object value binding (`allowObjectBinding`)
- Preselecting values via `value` property
- Using `isSelected` field to preselect via data source

#### Checkbox & Selection Modes
📄 **Read:** [references/checkbox-and-selection.md](references/multiselect-checkbox-and-selection.md)
- Checkbox mode with `CheckBoxSelection` module
- Select All / Unselect All with `showSelectAll`
- Customizing "Select All" and "Unselect All" text
- Maximum selection limit (`maximumSelectionLength`)
- Selection reordering (`enableSelectionOrder`)
- Display modes: Default, Box, Delimiter, CheckBox
- `closePopupOnSelect` behavior
- `hideSelectedItem` to remove selected items from list
- `changeOnBlur` for event timing control

#### Filtering
📄 **Read:** [references/filtering.md](references/multiselect-filtering.md)
- Enabling filtering with `allowFiltering`
- Filter types: StartsWith, Contains, EndsWith
- Minimum character threshold before remote fetch
- Case-sensitive filtering
- Diacritics / accent-insensitive filtering (`ignoreAccent`)
- Debounce delay (`debounceDelay`)
- Custom filtering logic via `filtering` event

#### Templates & Customization
📄 **Read:** [references/templates-and-customization.md](references/multiselect-templates-and-customization.md)
- Item template for custom list item layout
- Value template for selected chip display
- Group template for category headers
- Header and footer templates
- No records template and action failure template
- Chip customization via `tagging` event and `setClass`
- CSS customization for wrapper, chips, icons, popup
- Icon support via `iconCss` field

#### Grouping & Virtualization
📄 **Read:** [references/grouping-and-virtualization.md](references/multiselect-grouping-and-virtualization.md)
- Grouping items using `groupBy` field
- Grouping with checkboxes (`enableGroupCheckBox`)
- Virtual scrolling for large datasets (`enableVirtualization`)
- Virtualization with remote data, grouping, filtering, checkboxes
- Preselecting values with virtualization
- Custom item count in virtualization

#### Advanced Features
📄 **Read:** [references/advanced-features.md](references/multiselect-advanced-features.md)
- Custom value entry (`allowCustomValue`)
- Disabled items via `fields.disabled`
- `disableItem` method for dynamic disabling
- Popup resize (`allowResize`)
- Localization (`locale`, L10n translations)
- Accessibility (WCAG 2.2, keyboard navigation, ARIA)
- Sorting (`sortOrder`)
- Right-to-left support (`enableRtl`)
- State persistence (`enablePersistence`)
- `addTagOnBlur` behavior
- `openOnClick` configuration

#### API Reference
📄 **Read:** [references/api.md](references/multiselect-api.md)
- Complete properties reference with types and defaults
- All events with descriptions
- FieldSettings sub-properties
- TagHelper attribute naming conventions

### Quick Start Example

```cshtml
@* _ViewImports.cshtml: @addTagHelper *, Syncfusion.EJ2 *@

@{
    var games = new List<object> {
        new { Id = 1, Game = "Football" },
        new { Id = 2, Game = "Basketball" },
        new { Id = 3, Game = "Cricket" },
        new { Id = 4, Game = "Tennis" }
    };
}

<ejs-multiselect id="games"
    dataSource="@games"
    placeholder="Select games"
    mode="Box">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

### Common Patterns

#### Checkbox Mode with Select All
```cshtml
<ejs-multiselect id="sports"
    dataSource="@ViewBag.Sports"
    placeholder="Select sports"
    mode="CheckBox"
    showSelectAll="true"
    selectAllText="Select All"
    unSelectAllText="Unselect All"
    filterBarPlaceholder="Search">
    <e-multiselect-fields text="Game" value="Id"></e-multiselect-fields>
</ejs-multiselect>
```

#### Filtering with Remote Data
```cshtml
<ejs-multiselect id="customers"
    placeholder="Search customers"
    allowFiltering="true"
    filtering="onFiltering"
    popupHeight="250px">
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
    <e-multiselect-fields text="ContactName" value="CustomerID"></e-multiselect-fields>
</ejs-multiselect>
```

#### Virtual Scroll for Large Data
```cshtml
<ejs-multiselect id="items"
    dataSource="@ViewBag.LargeDataset"
    enableVirtualization="true"
    allowFiltering="true"
    placeholder="Select items"
    popupHeight="200px">
    <e-multiselect-fields text="text" value="id"></e-multiselect-fields>
</ejs-multiselect>
```

### Key Properties Quick Reference

| Property | TagHelper Attribute | Purpose |
|----------|-------------------|---------|
| `DataSource` | `dataSource` | Local array or DataManager |
| `Value` | `value` | Pre-selected values |
| `Mode` | `mode` | Default, Box, Delimiter, CheckBox |
| `AllowFiltering` | `allowFiltering` | Enable search/filter |
| `ShowSelectAll` | `showSelectAll` | Show "Select All" in checkbox mode |
| `MaximumSelectionLength` | `maximumSelectionLength` | Limit selections |
| `EnableVirtualization` | `enableVirtualization` | Virtual scroll |
| `AllowCustomValue` | `allowCustomValue` | Accept new typed values |
| `Placeholder` | `placeholder` | Input placeholder text |
| `PopupHeight` | `popupHeight` | Popup list height |
| `PopupWidth` | `popupWidth` | Popup list width |
| `AllowResize` | `allowResize` | Resizable popup |

### Common Use Cases

- **Multi-tag input** → Use `mode="Box"` with `tagging` event for chip styling
- **Permission selector** → Checkbox mode with `maximumSelectionLength`
- **Country/city picker** → Remote data with `allowFiltering` and groupBy
- **Category filter** → Grouping with `enableGroupCheckBox`
- **Large dataset dropdown** → `enableVirtualization` with remote data
- **Form field** → Use `ejs-multiselect-for` with model binding

---

**Start here:** Read [references/getting-started.md](references/multiselect-getting-started.md) to set up your first MultiSelect.

For the parent library overview and other components, see [Implementing Syncfusion ASP.NET Core Components](./SKILL.md).

---

### Security & Trust Boundary

> **Scope:** All CDN URLs (`https://cdn.syncfusion.com/ej2/...`) and remote data endpoints shown in this skill's examples are **documentation references only**. The agent must never fetch, execute, or proxy these URLs at runtime. Consumers are solely responsible for how these resources are integrated into their applications.

### W011 — Third-party Content Exposure

Code examples in the **Data Binding** and **Filtering** sections reference remote endpoints (e.g., `<e-data-manager url="..." adaptor="ODataV4Adaptor" crossDomain="true">`). These are **illustrative only**.

**Required mitigations before production use:**
- Replace all external/OData/WebAPI URLs with **same-origin server endpoints** under your own domain.
- Remove `crossDomain="true"` from all `<e-data-manager>` tags.
- Validate, authenticate, and sanitize all data server-side before binding to the component.

#### W012 — External CDN Runtime Script

The **Getting Started** examples reference `https://cdn.syncfusion.com/ej2/dist/ej2.min.js` for quickstart convenience only.

**Required mitigations before production use:**
- **Preferred:** Serve scripts locally via the `Syncfusion.EJ2.AspNet.Core` NuGet package — no external network call at runtime.
- **If CDN is required:** Pin the exact version and add a Subresource Integrity (SRI) hash with `crossorigin="anonymous"` to verify file integrity before execution.

| Finding | Root Cause | Mitigation |
|---|---|---|
| W011 — Third-party content exposure | Remote data endpoints in examples can influence component behavior | Use same-origin proxy endpoints; remove `crossDomain="true"` |
| W012 — Malicious external URL | CDN script in examples executes remote code at page load | Host scripts locally from NuGet; or use SRI hash + version pinning |

## AutoComplete

The Syncfusion ASP.NET Core AutoComplete (`<ejs-autocomplete>`) is a textbox component that provides a list of suggestions as users type. It supports local and remote data binding, filtering, grouping, templates, virtual scrolling, accessibility, and rich customization options.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/getting-started.md](references/autocomplete-getting-started.md)
- NuGet package installation and setup
- Tag helper registration and CDN references
- Basic AutoComplete rendering with `<ejs-autocomplete>`
- Custom values with `allowCustom`
- Popup height and width configuration

#### Data Binding
📄 **Read:** [references/data-binding.md](references/autocomplete-data-binding.md)
- Binding array of strings and array of objects
- Binding complex/nested object data
- Remote data binding (OData, OData V4, Web API, URL Adaptor)
- Offline mode with DataManager
- Fields mapping (`value`, `groupBy`, `iconCss`)

#### Filtering
📄 **Read:** [references/filtering.md](references/autocomplete-filtering.md)
- Filter types: `StartsWith`, `EndsWith`, `Contains`
- Limiting suggestion count with `suggestionCount`
- Minimum character length with `minLength`
- Case-sensitive filtering with `ignoreCase`
- Diacritics/accent-insensitive filtering with `ignoreAccent`
- Debounce delay to reduce filtering frequency

#### Grouping
📄 **Read:** [references/grouping.md](references/autocomplete-grouping.md)
- Grouping list items by category using `groupBy` field
- Inline and fixed group headers
- Custom group header with `groupTemplate`

#### Templates
📄 **Read:** [references/templates.md](references/autocomplete-templates.md)
- Item template (`itemTemplate`) for custom list item content
- Group template (`groupTemplate`) for group headers
- Header template (`headerTemplate`) for static popup header
- Footer template (`footerTemplate`) for static popup footer
- No records template (`noRecordsTemplate`)
- Action failure template (`actionFailureTemplate`)

#### Value Binding
📄 **Read:** [references/value-binding.md](references/autocomplete-value-binding.md)
- Binding primitive values (string, number, boolean) with `value`
- Object binding with `allowObjectBinding`
- Pre-selecting values

#### Virtual Scrolling
📄 **Read:** [references/virtual-scroll.md](references/autocomplete-virtual-scroll.md)
- Enable virtualization with `enableVirtualization`
- Virtual scrolling with local data
- Virtual scrolling with remote data
- Customizing item count in virtualization
- Grouping with virtualization

#### Disabled Items & Component State
📄 **Read:** [references/disabled-items.md](references/autocomplete-disabled-items.md)
- Disabling individual items with `fields.disabled`
- Using `disableItem` method dynamically
- Disabling the entire component with `enabled`

#### Localization
📄 **Read:** [references/localization.md](references/autocomplete-localization.md)
- Localizing `noRecordsTemplate` and `actionFailureTemplate`
- Loading translations with L10n
- Setting locale with `locale` property

#### Popup Resizing
📄 **Read:** [references/resize.md](references/autocomplete-resize.md)
- Enabling resizable popup with `allowResize`
- Resize persistence across sessions

#### Styling & CSS Customization
📄 **Read:** [references/style.md](references/autocomplete-style.md)
- Customizing wrapper, icon, focus, placeholder, text selection
- Customizing popup item appearance
- Outline theme and float label customization

#### Accessibility
📄 **Read:** [references/accessibility.md](references/autocomplete-accessibility.md)
- WCAG 2.2, Section 508, screen reader support
- WAI-ARIA attributes and roles
- Full keyboard navigation shortcuts

#### How-To Scenarios
📄 **Read:** [references/how-to.md](references/autocomplete-how-to.md)
- Autofill (auto-complete while typing with `autofill`)
- Custom highlight search (`highlight` property)
- Show list items with icons (`iconCss`)
- Filter by both text and value fields
- AutoCompleteFor with model binding and data annotations

#### API Reference
📄 **Read:** [references/api.md](references/autocomplete-api.md)
- Complete list of all properties, events, and their default values
- Properties: `actionFailureTemplate`, `allowCustom`, `allowObjectBinding`, `allowResize`, `autofill`, `cssClass`, `dataSource`, `debounceDelay`, `enabled`, `enablePersistence`, `enableRtl`, `enableVirtualization`, `fields`, `filterType`, `floatLabelType`, `footerTemplate`, `groupTemplate`, `headerTemplate`, `highlight`, `htmlAttributes`, `ignoreAccent`, `ignoreCase`, `isDeviceFullScreen`, `itemTemplate`, `locale`, `minLength`, `noRecordsTemplate`, `placeholder`, `popupHeight`, `popupWidth`, `query`, `readonly`, `showClearButton`, `showPopupButton`, `sortOrder`, `suggestionCount`, `value`, `width`, `zIndex`
- Events: `actionBegin`, `actionComplete`, `actionFailure`, `beforeOpen`, `blur`, `change`, `close`, `created`, `customValueSpecifier`, `dataBound`, `destroyed`, `filtering`, `focus`, `open`, `resizeStart`, `resizeStop`, `resizing`, `select`

---

### Quick Start

**Basic AutoComplete (array of strings):**

```cshtml
@{
    var sports = new string[] { "Badminton", "Basketball", "Cricket", "Football", "Golf", "Hockey", "Tennis" };
}

<ejs-autocomplete id="sports" dataSource="sports" placeholder="Select a sport">
</ejs-autocomplete>
```

**AutoComplete with object data source:**

```cshtml
@{
    List<Countries> countries = new List<Countries> {
        new Countries { Name = "India", Code = "IN" },
        new Countries { Name = "United States", Code = "US" },
        new Countries { Name = "Germany", Code = "DE" }
    };
}

<ejs-autocomplete id="country" dataSource="@countries" placeholder="Select a country">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
```

**Model class:**
```csharp
public class Countries {
    public string Name { get; set; }
    public string Code { get; set; }
}
```

---

### Common Patterns

#### Remote Data with OData
```cshtml
<ejs-autocomplete id="customers"
    query="new ej.data.Query().from('Customers').select(['ContactName'])"
    placeholder="Find a customer"
    filterType="StartsWith"
    popupHeight="200px">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>
```

#### Grouped List with Custom Filter
```cshtml
<ejs-autocomplete id="vegetables"
    dataSource="@vegList"
    placeholder="Select a vegetable"
    filterType="StartsWith"
    suggestionCount="10"
    minLength="1">
    <e-autocomplete-fields value="Vegetable" groupBy="Category"></e-autocomplete-fields>
</ejs-autocomplete>
```

#### Virtual Scrolling for Large Data
```cshtml
<ejs-autocomplete id="records"
    dataSource="@data"
    placeholder="e.g. Item 1"
    enableVirtualization="true"
    popupHeight="200px">
    <e-autocomplete-fields value="Text"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

### Key Properties Quick Reference

| Property | Type | Default | Purpose |
|---|---|---|---|
| `dataSource` | object | null | Local array or DataManager |
| `fields` | AutoCompleteFieldSettings | null | Map value, groupBy, iconCss |
| `filterType` | FilterType | Contains | StartsWith / EndsWith / Contains |
| `placeholder` | string | null | Input hint text |
| `value` | object | null | Selected value |
| `allowCustom` | bool | true | Allow values not in data source |
| `minLength` | double | 1 | Minimum chars before filtering |
| `suggestionCount` | double | 20 | Max suggestion items |
| `autofill` | bool | false | Auto-complete first match inline |
| `highlight` | bool | false | Highlight matched characters |
| `enableVirtualization` | bool | false | Virtual scrolling for large lists |
| `allowResize` | bool | false | Resizable popup |
| `enabled` | bool | true | Enable/disable component |
---

## Mention

The Syncfusion ASP.NET Core Mention (`<ejs-mention>`) is an inline suggestion component that listens to a **target** element (a `contenteditable` div or textarea) and displays a suggestion popup when the user types a trigger character (default: `@`). It supports local and remote data binding, custom templates, configurable filtering, sorting, disabled items, and full accessibility.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/getting-started.md](references/mention-getting-started.md)
- NuGet package installation and project setup
- Tag helper registration (`@addTagHelper *, Syncfusion.EJ2`)
- CDN stylesheet and script references
- Script manager registration (`<ejs-scripts>`)
- Defining the target `contenteditable` element
- Basic Mention rendering with `<ejs-mention>`
- Binding a string array as data source
- Displaying the mention character with `showMentionChar` and `mentionChar`

#### Data Binding
📄 **Read:** [references/data-binding.md](references/mention-data-binding.md)
- Binding simple string arrays
- Binding arrays of JSON objects with `<e-mention-fields>`
- Binding complex/nested object data with dot-notation field mapping
- Remote data binding with OData V4 adaptor
- Remote data binding with Web API adaptor
- Using `<e-data-manager>` for remote sources
- `query` property for customizing remote fetch requests

#### Filtering
📄 **Read:** [references/filtering.md](references/mention-filtering.md)
- Filter types: `StartsWith`, `EndsWith`, `Contains` via `filterType`
- Minimum character length with `minLength` (default: 0)
- Allow spaces in search with `allowSpaces`
- Limit visible suggestions with `suggestionCount`
- Case-sensitive filtering with `ignoreCase`
- Reducing filter calls with `debounceDelay`
- Custom server-side filtering with the `filtering` event

#### Templates
📄 **Read:** [references/templates.md](references/mention-templates.md)
- `itemTemplate` — customize each item in the suggestion popup
- `displayTemplate` — customize what is inserted into the editor upon selection
- `noRecordsTemplate` — custom message when no items match search
- `spinnerTemplate` — custom loading indicator for remote data

#### Customization
📄 **Read:** [references/customization.md](references/mention-customization.md)
- Show or hide mention character prefix with `showMentionChar`
- Change trigger character with `mentionChar` (default: `@`)
- Append suffix after selection with `suffixText` (space, newline)
- Control popup dimensions with `popupHeight` and `popupWidth`
- Leading space requirement with `requireLeadingSpace`
- Apply custom CSS styles with `cssClass`
- Highlight matched characters with `highlight`

#### Disabled Items
📄 **Read:** [references/disabled-items.md](references/mention-disabled-items.md)
- Disable individual items via `fields.disabled` data source mapping
- Dynamically disable items at runtime using the `disableItem` method
- Disable multiple items by iterating

#### Sorting
📄 **Read:** [references/sorting.md](references/mention-sorting.md)
- Sort suggestion list with `sortOrder` (`None`, `Ascending`, `Descending`)
- Ascending and descending sort examples

#### Accessibility
📄 **Read:** [references/accessibility.md](references/mention-accessibility.md)
- WCAG 2.2 (AA), Section 508, screen reader compliance
- WAI-ARIA attributes (`aria-selected`, `aria-activedescendant`, `aria-owns`)
- Full keyboard navigation (Arrow keys, Escape, Enter, Tab)
- Tips for accessible target element setup

#### API Reference
📄 **Read:** [references/api.md](references/mention-api.md)
- Complete properties: `allowSpaces`, `cssClass`, `dataSource`, `debounceDelay`, `displayTemplate`, `fields`, `filterType`, `highlight`, `htmlAttributes`, `ignoreCase`, `itemTemplate`, `locale`, `mentionChar`, `minLength`, `noRecordsTemplate`, `popupHeight`, `popupWidth`, `query`, `requireLeadingSpace`, `showMentionChar`, `sortOrder`, `spinnerTemplate`, `suffixText`, `suggestionCount`, `target`
- MentionFieldSettings: `text`, `value`, `groupBy`, `iconCss`, `disabled`, `htmlAttributes`
- All events: `actionBegin`, `actionComplete`, `actionFailure`, `beforeOpen`, `change`, `closed`, `created`, `destroyed`, `filtering`, `opened`, `select`

---

### Quick Start

**Minimal Mention with string array:**

```cshtml
@{
    var users = new string[] { "Adeline MacAdams", "Alba Torres", "Amy Fernandez", "Andrew Jack" };
}

<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
    Type @ to mention someone
</div>

<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@users">
</ejs-mention>
```

**Mention with object data and field mapping:**

```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget" dataSource="@ViewBag.data">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<EmailData>
    {
        new EmailData { Name = "Adeline MacAdams", EmailId = "adeline@example.com" },
        new EmailData { Name = "Alba Torres", EmailId = "alba@example.com" },
        new EmailData { Name = "Amy Fernandez", EmailId = "amy@example.com" }
    };
    return View();
}

public class EmailData
{
    public string Name { get; set; }
    public string EmailId { get; set; }
}
```

---

### Common Patterns

#### Custom Trigger Character (# for tags)
```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    mentionChar="#"
    showMentionChar="true">
    <e-mention-fields text="TagName"></e-mention-fields>
</ejs-mention>
```

#### Mention with Suffix Space + No Leading Space Required
```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    suffixText=" "
    requireLeadingSpace="false">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

#### Remote Data with Filtering
```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    minLength="2"
    filterType="StartsWith"
    suggestionCount="10">
    <e-mention-fields text="ContactName" value="CustomerID"></e-mention-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-mention>
```

#### Custom Item Template
```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    itemTemplate="<span><img src='${EmpImage}' class='avatar'/><b>${FirstName}</b> - ${Department}</span>">
    <e-mention-fields text="FirstName" value="FirstName"></e-mention-fields>
</ejs-mention>
```

#### Handle Selection Event
```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    select="onMentionSelect">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>

<script>
    function onMentionSelect(args) {
        console.log("Mentioned user:", args.itemData.Name);
        console.log("Email:", args.itemData.EmailId);
    }
</script>
```

---

### Key Properties Quick Reference

| Property | Type | Default | Purpose |
|---|---|---|---|
| `target` | string | null | CSS selector for the editable target element (required) |
| `dataSource` | object | null | Local array or DataManager |
| `fields` | MentionFieldSettings | null | Map text, value, groupBy, iconCss, disabled |
| `mentionChar` | char | `'@'` | The character that triggers the suggestion popup |
| `showMentionChar` | bool | false | Show trigger character as prefix in inserted text |
| `suffixText` | string | null | Text appended after the inserted value (e.g., `" "`) |
| `requireLeadingSpace` | bool | true | Require a space before the trigger character |
| `filterType` | FilterType | Contains | Filter match strategy |
| `minLength` | int | 0 | Min chars before search activates |
| `suggestionCount` | int | 25 | Max items in suggestion list |
| `allowSpaces` | bool | false | Allow spaces in the search term |
| `sortOrder` | SortOrder | None | Sort suggestion list order |
| `popupHeight` | string | "300px" | Height of the suggestion popup |
| `popupWidth` | string | "auto" | Width of the suggestion popup |
| `highlight` | bool | false | Highlight matched characters in suggestions |
| `ignoreCase` | bool | true | Case-insensitive search |
| `debounceDelay` | double | 300 | Delay (ms) before filtering runs |

---

## ComboBox

The ComboBox (`<ejs-combobox>`) is a textbox component that allows users to select or type a value from a predefined list. It combines the features of a textbox and dropdown, supporting custom values, filtering, grouping, templates, and accessibility.

### Component Overview

**Tag Helper:** `<ejs-combobox>`  
**Namespace:** `Syncfusion.EJ2.DropDowns`  
**NuGet:** `Syncfusion.EJ2.AspNet.Core`

**Key Features:**
- User-defined custom values (`allowCustom`)
- Data binding from local arrays and remote sources
- Real-time filtering with search capability (`allowFiltering`, `filterType`)
- Grouping items using `fields.groupBy`
- Customizable templates: `itemTemplate`, `headerTemplate`, `footerTemplate`, `groupTemplate`, `noRecordsTemplate`
- Virtual scrolling for large datasets (`enableVirtualization`)
- Popup resize capability (`allowResize`)
- WCAG 2.2 accessibility compliance
- RTL rendering support
- Float label support (`floatLabelType`)

### Documentation and Navigation Guide

#### Getting Started
📄 **Read:** [references/combobox-getting-started.md](references/combobox-getting-started.md)
- NuGet package installation
- TagHelper registration in `_ViewImports.cshtml`
- Service registration in `Program.cs`
- Basic ComboBox implementation
- Custom value entry (`allowCustom`)
- Popup height and width configuration

#### Data Binding
📄 **Read:** [references/combobox-data-binding.md](references/combobox-data-binding.md)
- Array of strings and array of objects
- Complex/nested object data binding
- Remote data with DataManager (OData, Web API, URL Adaptor)
- Field mapping (`text`, `value`, `iconCss`, `groupBy`, `disabled`)
- Pre-selected values

#### Filtering and Search
📄 **Read:** [references/combobox-filtering-and-search.md](references/combobox-filtering-and-search.md)
- Enable filtering with `allowFiltering`
- Filter types: `StartsWith`, `EndsWith`, `Contains`
- Minimum character threshold (`minLength`)
- Case-sensitive filtering with `ignoreCase`
- Diacritics filtering with `ignoreAccent`
- Debounce delay for performance
- No results handling

#### Grouping and Sorting
📄 **Read:** [references/combobox-grouping-and-sorting.md](references/combobox-grouping-and-sorting.md)
- Group items using `fields.groupBy`
- Group header templates
- Sort options: Ascending, Descending, None
- Dynamic grouping and sorting
- Multi-level grouping patterns

#### Templates and Customization
📄 **Read:** [references/combobox-templates-and-customization.md](references/combobox-templates-and-customization.md)
- Item templates for custom list item layout
- Header and footer templates
- No records template
- CSS customization and styling
- Float label customization

#### API Reference
📄 **Read:** [references/combobox-api.md](references/combobox-api.md)
- Complete properties reference
- All methods with parameters
- All events with descriptions

#### Advanced Features
📄 **Read:** [references/combobox-advanced-features.md](references/combobox-advanced-features.md)
- Virtual scrolling for large datasets (`enableVirtualization`)
- Internationalization and localization support
- RTL (Right-to-Left) layout support
- WCAG 2.2 accessibility compliance
- Keyboard navigation shortcuts
- Float label types (Never, Always, Auto)

#### Popup Resizing
📄 **Read:** [references/combobox-popup-resizing.md](references/combobox-popup-resizing.md)
- Configure popup height with `popupHeight`
- Configure popup width with `popupWidth`
- Dynamic popup sizing
- Percentage and pixel-based dimensions
- Adaptive popup behavior

#### Styling and Theming
📄 **Read:** [references/combobox-styling-and-theming.md](references/combobox-styling-and-theming.md)
- Built-in theme colors and customization
- CSS customization for ComboBox
- Custom class application
- Font styling and colors
- State-based styling (hover, focus, disabled)

#### How-To Guide
📄 **Read:** [references/combobox-how-to-guide.md](references/combobox-how-to-guide.md)
- Common scenarios and solutions
- Form integration and validation
- Cascading ComboBox patterns
- Dynamic data updates
- Get and set selected values
- Clear selection and reset

#### Troubleshooting
📄 **Read:** [references/combobox-troubleshooting.md](references/combobox-troubleshooting.md)
- Common issues and fixes
- Performance troubleshooting
- Data binding issues
- Filtering problems
- Event handler debugging
- Browser compatibility notes

### Quick Start Example

**Controller (`HomeController.cs`):**
```csharp
public IActionResult Index()
{
    ViewBag.sportsList = new List<string> 
    { 
        "Badminton", 
        "Cricket", 
        "Football", 
        "Golf", 
        "Tennis" 
    };
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
<ejs-combobox id="sports-combo"
    dataSource="@ViewBag.sportsList"
    placeholder="Choose a sport...">
</ejs-combobox>
```

### Common Patterns

#### Pattern 1: Basic Selection with Objects
```cshtml
<ejs-combobox id="games-combo"
    dataSource="@ViewBag.gamesList"
    placeholder="Select or type a game...">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```

#### Pattern 2: Filtering with Custom Values
```cshtml
<ejs-combobox id="combo"
    dataSource="@ViewBag.data"
    allowCustom="true"
    allowFiltering="true"
    filterType="Contains"
    debounceDelay="300"
    placeholder="Search or type custom value...">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```

#### Pattern 3: Remote Data with Filtering
```cshtml
<ejs-combobox id="combo"
    allowFiltering="true"
    placeholder="Search items...">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
    <e-data-manager url="/api/items" adaptor="UrlAdaptor"></e-data-manager>
</ejs-combobox>
```

---

## ListBox

The ListBox (`<ejs-listbox>`) is a list selection component that displays items in a scrollable list. It supports single and multiple selection, grouping, drag-and-drop, filtering, templates, and is ideal for transferring items between lists.

### Component Overview

**Tag Helper:** `<ejs-listbox>`  
**Namespace:** `Syncfusion.EJ2.DropDowns`  
**NuGet:** `Syncfusion.EJ2.AspNet.Core`

**Key Features:**
- Single and multiple selection with checkboxes
- Grouping items using `fields.groupBy`
- Built-in filtering with search box (`allowFiltering`)
- Drag and drop support (`allowDragAndDrop`)
- Dual ListBox transfer pattern with move operations
- Virtual scrolling for large datasets (`enableVirtualization`)
- Customizable templates for items, groups, headers, footers
- Disabled items support
- WCAG 2.2 accessibility compliance
- RTL rendering support
- Float label support (`floatLabelType`)

### Documentation and Navigation Guide

#### Getting Started
📄 **Read:** [references/listbox-getting-started.md](references/listbox-getting-started.md)
- NuGet package installation and TagHelper setup
- Service and TagHelper registration
- Basic ListBox implementation
- Single and multiple selection
- Running the application

#### Data Binding
📄 **Read:** [references/listbox-data-binding.md](references/listbox-data-binding.md)
- Array of objects binding
- Remote data with DataManager
- Field mapping (`text`, `value`, `iconCss`, `groupBy`, `disabled`)
- Selection modes: Single, Multiple
- Checkbox selection with types
- Pre-selected values

#### Advanced Features
📄 **Read:** [references/listbox-features.md](references/listbox-features.md)
- Filtering and search capability
- Sorting and grouping
- Drag and drop configuration
- Dual ListBox (transfer) pattern
- Scroller and virtual scrolling
- Enable/disable items
- Common patterns and use cases

#### API Reference
📄 **Read:** [references/listbox-api.md](references/listbox-api.md)
- Complete properties reference
- All methods with parameters
- All events with descriptions

#### Selection Modes
📄 **Read:** [references/listbox-selection.md](references/listbox-selection.md)
- Single selection mode
- Multiple selection mode
- Checkbox selection type
- Programmatic selection (get/set selected values)
- Selection events and handlers
- Toggle selection with API methods

#### Dual List Box Transfer
📄 **Read:** [references/listbox-dual-list-box.md](references/listbox-dual-list-box.md)
- Setting up dual ListBox layout
- Drag-and-drop between lists
- Move operations: moveRight, moveLeft, moveUp, moveDown
- Move all items: moveAllRight, moveAllLeft
- Selection and event handling
- Transfer patterns and best practices
- Styling the transfer layout

#### Accessibility
📄 **Read:** [references/listbox-accessibility.md](references/listbox-accessibility.md)
- WCAG 2.2 Level AA compliance
- ARIA roles and attributes
- Keyboard shortcuts and navigation
- Screen reader support
- Focus management and focus indicators
- High contrast mode compatibility

#### Icons and Templates
📄 **Read:** [references/listbox-icons-and-templates.md](references/listbox-icons-and-templates.md)
- Icon handling with `iconCss` field
- Custom item templates for layout
- Header and footer templates
- Group header templates
- No records template for empty states
- Template syntax and best practices

#### How-To Guides
📄 **Read:** [references/listbox-how-to-guides.md](references/listbox-how-to-guides.md)
- Client-side and server-side filtering patterns
- Sorting items by multiple criteria
- Remote data binding and lazy loading
- Cascading ListBox scenarios
- Custom styling and theming
- Form integration and validation

#### Styling and Appearance
📄 **Read:** [references/listbox-style-and-appearance.md](references/listbox-style-and-appearance.md)
- CSS styling and theming
- Built-in theme colors and customization
- Custom class application
- Disabled item styling
- Selection highlight and hover states
- Responsive layout styling

### Quick Start Example

**Controller (`HomeController.cs`):**
```csharp
public IActionResult Index()
{
    ViewBag.languages = new List<object>
    {
        new { text = "JavaScript", id = "1" },
        new { text = "TypeScript", id = "2" },
        new { text = "React", id = "3" },
        new { text = "Vue", id = "4" }
    };
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
<h1>Programming Languages</h1>

<ejs-listbox id="languages"
    dataSource="@ViewBag.languages"
    height="300px">
    <e-listbox-fields text="text" value="id"></e-listbox-fields>
</ejs-listbox>
```

### Common Patterns

#### Pattern 1: Multiple Selection
```cshtml
<ejs-listbox id="skills"
    dataSource="@ViewBag.skills"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
</ejs-listbox>
```

#### Pattern 2: Grouped Items
```cshtml
<ejs-listbox id="technologies"
    dataSource="@ViewBag.technologies"
    height="300px">
    <e-listbox-fields text="Name" value="Id" groupBy="Category"></e-listbox-fields>
</ejs-listbox>
```

#### Pattern 3: Dual ListBox Transfer
```cshtml
<div class="dual-listbox">
    <ejs-listbox id="available"
        dataSource="@ViewBag.available"
        allowDragAndDrop="true"
        scope="transfer"
        height="250px">
        <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
        <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
    </ejs-listbox>

    <ejs-listbox id="selected"
        dataSource="@ViewBag.selected"
        allowDragAndDrop="true"
        scope="transfer"
        height="250px">
        <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
        <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
    </ejs-listbox>
</div>
```

---

## MultiColumn ComboBox

The MultiColumn ComboBox (`<ejs-multicolumncombobox>`) is a specialized dropdown component that displays data in a grid format. Users can select a row from the grid, making it ideal for selecting from records with multiple related fields.

### Component Overview

**Tag Helper:** `<ejs-multicolumncombobox>`  
**Namespace:** `Syncfusion.EJ2.MultiColumnComboBox`  
**NuGet:** `Syncfusion.EJ2.AspNet.Core`

**Key Features:**
- Grid-based popup display with multiple columns
- Single row selection from tabular data
- Flexible column configuration with headers, widths, alignment
- Data binding from local arrays and remote sources
- Real-time filtering with search box (`allowFiltering`)
- Field mapping for display text and hidden value
- Virtual scrolling for large datasets
- Popup height and width customization
- WCAG 2.2 accessibility compliance
- RTL rendering support
- Localization support

### Documentation and Navigation Guide

#### Getting Started
📄 **Read:** [references/multicolumn-combobox-getting-started.md](references/multicolumn-combobox-getting-started.md)
- NuGet package installation
- TagHelper registration in `_ViewImports.cshtml`
- Service registration in `Program.cs`
- Basic MultiColumn ComboBox implementation with columns
- Field mapping and data configuration
- Popup size configuration

#### Data Binding
📄 **Read:** [references/multicolumn-combobox-data-binding.md](references/multicolumn-combobox-data-binding.md)
- Fields mapping (`text`, `value`)
- Local data binding with objects
- Remote data binding with DataManager (OData, Web API, URL Adaptor)
- Using Query for data filtering and selection
- Supported data services
- Common binding patterns

#### API Reference
📄 **Read:** [references/multicolumn-combobox-api.md](references/multicolumn-combobox-api.md)
- Complete properties reference with types and defaults
- All methods with parameters and descriptions
- All events with descriptions
- Column properties configuration

#### Columns Configuration
📄 **Read:** [references/multicolumn-combobox-columns.md](references/multicolumn-combobox-columns.md)
- Column property definitions (field, header, width, textAlign)
- Fixed and percentage-based column widths
- Text alignment (Left, Center, Right)
- Date and number formatting
- Custom column templates
- Dynamic column management (add/remove columns)

#### Filtering
📄 **Read:** [references/multicolumn-combobox-filtering.md](references/multicolumn-combobox-filtering.md)
- Enable filtering with `allowFiltering`
- Filter types: StartsWith, Contains, EndsWith
- Client-side vs. server-side filtering
- Filter delay configuration (`delay`)
- Case-insensitive and accent-insensitive filtering
- Multi-column filtering patterns
- Range and date range filtering

#### Sorting
📄 **Read:** [references/multicolumn-combobox-sorting.md](references/multicolumn-combobox-sorting.md)
- Default sorting by column
- Ascending and descending sort
- Multi-column sorting
- Custom sort logic
- Server-side sorting patterns
- Sort UI and controls (sort buttons, header click to sort)

#### Events
📄 **Read:** [references/multicolumn-combobox-events.md](references/multicolumn-combobox-events.md)
- Selection events: `select`, `change`, `customValueSpecifier`
- Filtering events: `filtering`
- Data binding events: `dataBound`, `actionBegin`, `actionComplete`
- UI events: `focus`, `blur`, `open`, `close`
- Event handling patterns and best practices

#### Templates and Customization
📄 **Read:** [references/multicolumn-combobox-templates.md](references/multicolumn-combobox-templates.md)
- Cell templates for custom cell rendering
- Header templates with icons and sorting
- Footer templates with summaries
- Row templates for full-row customization
- Empty state templates (no records)
- Custom styling and CSS customization

#### Accessibility
📄 **Read:** [references/multicolumn-combobox-accessibility.md](references/multicolumn-combobox-accessibility.md)
- WCAG 2.2 Level AA compliance
- ARIA attributes and semantic markup
- Keyboard navigation shortcuts
- Screen reader support
- Focus management
- High contrast mode support

#### Virtualization
📄 **Read:** [references/multicolumn-combobox-virtualization.md](references/multicolumn-combobox-virtualization.md)
- Enable virtual scrolling for large datasets
- Item height and buffer configuration
- Performance optimization techniques
- Server-side virtualization with lazy loading
- Memory management and leak detection
- Benchmarking and performance metrics

#### Localization
📄 **Read:** [references/multicolumn-combobox-localization.md](references/multicolumn-combobox-localization.md)
- Enable localization with supported languages
- Custom locale definitions
- RTL (Right-to-Left) layout support
- Date and number formatting by locale
- Translation integration with resource files
- Third-party translation library integration

### Quick Start Example

**Controller (`HomeController.cs`):**
```csharp
public class Employee
{
    public int EmpID { get; set; }
    public string Name { get; set; }
    public string Designation { get; set; }
    public string Country { get; set; }
}

public IActionResult Index()
{
    ViewBag.empData = new List<Employee>
    {
        new Employee { EmpID = 1001, Name = "Andrew Fuller", Designation = "Team Lead", Country = "England" },
        new Employee { EmpID = 1002, Name = "Robert", Designation = "Developer", Country = "USA" },
        new Employee { EmpID = 1003, Name = "Michael", Designation = "HR", Country = "Russia" }
    };
    return View();
}
```

**View (`Index.cshtml`):**
```cshtml
<ejs-multicolumncombobox id="multicolumn"
    dataSource="@ViewBag.empData"
    placeholder="Select an employee">
    <e-multicolumncombobox-fields text="Name" value="EmpID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmpID" header="Employee ID" width="120"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Name" header="Name" width="120"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Country" header="Country" width="100"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

### Common Patterns

#### Pattern 1: Grid Display with Local Data
```cshtml
<ejs-multicolumncombobox id="products"
    dataSource="@ViewBag.products"
    popupHeight="250px"
    popupWidth="450px"
    placeholder="Select a product">
    <e-multicolumncombobox-fields text="ProductName" value="ProductID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="ProductID" header="Product ID" width="100"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="ProductName" header="Product Name" width="150"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Price" header="Price" width="100"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

#### Pattern 2: Remote Data with Filtering
```cshtml
<ejs-multicolumncombobox id="employees"
    allowFiltering="true"
    placeholder="Search employees...">
    <e-multicolumncombobox-fields text="FirstName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-data-manager url="/api/employees" adaptor="UrlAdaptor"></e-data-manager>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="Employee ID" width="100"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="FirstName" header="Name" width="120"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Country" header="Country" width="100"></e-multicolumncombobox-column>
    </e-columns>
</ejs-multicolumn-combobox>
```

---

### Key Properties Quick Reference

| Component | Property | Purpose |
|-----------|----------|---------|
| ComboBox | `allowCustom` | Allow user-defined values |
| ComboBox | `allowFiltering` | Show search box |
| ComboBox | `allowResize` | Resizable popup |
| ListBox | `allowDragAndDrop` | Enable drag and drop |
| ListBox | `selectionsettings.mode` | Single or Multiple selection |
| ListBox | `selectionsettings.type` | Default or Checkbox selection |
| MultiColumn | `<e-column>` | Define grid columns |
| MultiColumn | `popupHeight` | Popup grid height |
| MultiColumn | `popupWidth` | Popup grid width |

---

**Start here:** Read [references/combobox-getting-started.md](references/combobox-getting-started.md), [references/listbox-getting-started.md](references/listbox-getting-started.md), or [references/multicolumn-combobox-getting-started.md](references/multicolumn-combobox-getting-started.md) for your first implementation.