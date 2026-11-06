---
name: properties-and-configuration-dropdown-tree
---

# Properties and Configuration Guide for Syncfusion DropDownTree

## Table of Contents

- [Overview](#overview)
- [Core Properties](#core-properties)
- [Display Properties](#display-properties)
- [Behavior Properties](#behavior-properties)
- [Field Configuration](#field-configuration)
- [Tree Settings](#tree-settings)
- [Appearance and Styling](#appearance-and-styling)
- [Performance Settings](#performance-settings)
- [Accessibility Properties](#accessibility-properties)

## Overview

The Syncfusion DropDownTree component provides extensive configuration options through properties that control every aspect of component behavior, appearance, and functionality. Understanding these properties enables fine-grained control over component interactions, visual presentation, and performance characteristics.

Properties are categorized into logical groups based on their function: core functionality, display options, behavioral settings, field mappings, tree-specific settings, styling options, performance tuning, and accessibility features. This organization helps you quickly locate the property you need to configure.

## Core Properties

### dataSource and Initial Data

**Property**: `dataSource`
**Type**: `DataManager | Array<object>`
**Default**: `[]`
**Description**: Specifies the data items for the DropDownTree component.

```html
<!-- Local Array -->
<ejs-dropdowntree id="localDataTree">
    <e-dropdowntree-fields dataSource="@Model.LocalData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Remote DataManager -->
<ejs-dropdowntree id="remoteDataTree">
    <e-dropdowntree-fields text="Name" value="Id" child="SubItems">
        <e-data-manager url="/api/items" adaptor="UrlAdaptor"></e-data-manager>
    </e-dropdowntree-fields>
</ejs-dropdowntree>
```

### value - Selected Item(s)

**Property**: `value`
**Type**: `string | string[]`
**Default**: `null`
**Description**: Gets or sets the currently selected value(s).

```html
<!-- Single Selection -->
<ejs-dropdowntree id="singleValueTree" value="item-1">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Multiple Selection -->
<ejs-dropdowntree id="multiValueTree" value="@new string[] { \"item-1\", \"item-2\", \"item-3\" }" showCheckBox="true">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        var treeObj = document.getElementById("multiValueTree").ej2_instances[0];
        console.log("Current value:", treeObj.value);
        
        treeObj.value = ["item-4", "item-5"];  // Programmatically set
    </script>
}
```

### text - Display Text

**Property**: `text` (read-only)
**Type**: `string`
**Description**: Gets the text of the currently selected item.

```html
@section Scripts {
    <script>
        var treeObj = document.getElementById("myTree").ej2_instances[0];
        console.log("Selected text:", treeObj.text);
    </script>
}
```

## Display Properties

### placeholder

**Property**: `placeholder`
**Type**: `string`
**Default**: `""`
**Description**: Specifies the text to display when no item is selected.

```html
<ejs-dropdowntree id="placeholderTree" placeholder="Select an item from the list below">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### floatLabelType

**Property**: `floatLabelType`
**Type**: `FloatLabelType` - `Never | Always | Auto`
**Default**: `Never`
**Description**: Controls floating label behavior for accessibility and UX.

```html
<!-- Never float -->
<ejs-dropdowntree id="neverFloat" floatLabelType="Never" placeholder="Select item">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Always float -->
<ejs-dropdowntree id="alwaysFloat" floatLabelType="Always" placeholder="Select item">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Auto float (float on focus or value) -->
<ejs-dropdowntree id="autoFloat" floatLabelType="Auto" placeholder="Select item">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### filterBarPlaceholder

**Property**: `filterBarPlaceholder`
**Type**: `string`
**Default**: `"Search"`
**Description**: Watermark text for the filter search box.

```html
<ejs-dropdowntree id="filterTree" allowFiltering="true" filterBarPlaceholder="Type to search items...">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### cssClass

**Property**: `cssClass`
**Type**: `string`
**Default**: `""`
**Description**: CSS classes to be added to component root and popup elements.

```html
<ejs-dropdowntree id="styledTree" cssClass="custom-tree premium-theme">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .custom-tree.premium-theme .e-input {
        border: 2px solid #0066cc;
        border-radius: 6px;
    }
    
    .custom-tree.premium-theme .e-popup {
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
</style>
```

### htmlAttributes

**Property**: `htmlAttributes`
**Type**: `{ [key: string]: string }`
**Default**: `{}`
**Description**: Additional HTML attributes for the input element.

```csharp
var htmlAttrs = new Dictionary<string, string>
{
    { "aria-label", "Select an item" },
    { "data-testid", "tree-dropdown" },
    { "title", "Select from hierarchical list" }
};
```

```html
<ejs-dropdowntree id="attrTree" htmlAttributes="@htmlAttrs">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

## Behavior Properties

### enabled

**Property**: `enabled`
**Type**: `boolean`
**Default**: `true`
**Description**: Enables or disables the component.

```html
<!-- Enabled (default) -->
<ejs-dropdowntree id="enabledTree" enabled="true">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Disabled state -->
<ejs-dropdowntree id="disabledTree" enabled="false">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### readonly

**Property**: `readonly`
**Type**: `boolean`
**Default**: `false`
**Description**: Sets read-only state (component renders but cannot be modified).

```html
<ejs-dropdowntree id="readonlyTree" readonly="true" value="item-1">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### changeOnBlur

**Property**: `changeOnBlur`
**Type**: `boolean`
**Default**: `true`
**Description**: Fire change event on blur instead of on every selection change.

```html
<!-- Fire on blur only (default) -->
<ejs-dropdowntree id="changeOnBlurTree" changeOnBlur="true" change="change">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Fire on every change -->
<ejs-dropdowntree id="changeOnSelectTree" changeOnBlur="false" change="change">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        var treeObj = document.getElementById("changeOnSelectTree").ej2_instances[0];
        
        function change(e) {
            console.log("Value changed to:", e.value);
        }
    </script>
}
```

### destroyPopupOnHide

**Property**: `destroyPopupOnHide`
**Type**: `boolean`
**Default**: `true`
**Description**: Destroy or maintain popup in DOM when closed.

```html
<!-- Destroy popup (save memory) -->
<ejs-dropdowntree id="destroyPopupTree" destroyPopupOnHide="true">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Keep in DOM (faster reopening) -->
<ejs-dropdowntree id="keepPopupTree" destroyPopupOnHide="false">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### enablePersistence

**Property**: `enablePersistence`
**Type**: `boolean`
**Default**: `false`
**Description**: Persist component state across browser sessions.

```html
<ejs-dropdowntree id="persistenceTree" enablePersistence="true">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- User's last selection is restored on page reload -->
```

### enableHtmlSanitizer

**Property**: `enableHtmlSanitizer`
**Type**: `boolean`
**Default**: `true`
**Description**: Sanitize untrusted HTML in component content.

```html
<!-- Sanitize HTML (default, safer) -->
<ejs-dropdowntree id="sanitizedTree" enableHtmlSanitizer="true" itemTemplate="<div>${HtmlContent}</div>">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

## Filtering and Search

### allowFiltering

**Property**: `allowFiltering`
**Type**: `boolean`
**Default**: `false`
**Description**: Enable filter bar for searching items.

```html
<ejs-dropdowntree id="filterableTree" allowFiltering="true" filterType="StartsWith">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### filterType

**Property**: `filterType`
**Type**: `TreeFilterType` - `StartsWith | EndsWith | Contains`
**Default**: `StartsWith`
**Description**: Determines filter search algorithm.

```html
<!-- Items starting with search text -->
<ejs-dropdowntree id="startsWithFilter" allowFiltering="true" filterType="StartsWith">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Items ending with search text -->
<ejs-dropdowntree id="endsWithFilter" allowFiltering="true" filterType="EndsWith">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Items containing search text -->
<ejs-dropdowntree id="containsFilter" allowFiltering="true" filterType="Contains">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### ignoreCase

**Property**: `ignoreCase`
**Type**: `boolean`
**Default**: `true`
**Description**: Case-insensitive search filtering.

```html
<!-- Case-insensitive (default) -->
<ejs-dropdowntree id="caseInsensitiveTree" allowFiltering="true" ignoreCase="true">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Case-sensitive search -->
<ejs-dropdowntree id="caseSensitiveTree" allowFiltering="true" ignoreCase="false">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### ignoreAccent

**Property**: `ignoreAccent`
**Type**: `boolean`
**Default**: `false`
**Description**: Ignore diacritical marks in search.

```html
<ejs-dropdowntree id="ignoreAccentTree" allowFiltering="true" ignoreAccent="true">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- With ignoreAccent=true, "café" matches search for "cafe" -->
```

## Localization and RTL

### locale

**Property**: `locale`
**Type**: `string`
**Default**: `"en"`
**Description**: Culture-specific localization identifier.

```html
<!-- English -->
<ejs-dropdowntree id="enTree" locale="en">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- German -->
<ejs-dropdowntree id="deTree" locale="de">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- French -->
<ejs-dropdowntree id="frTree" locale="fr">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Arabic -->
<ejs-dropdowntree id="arTree" locale="ar" enableRtl="true">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### enableRtl

**Property**: `enableRtl`
**Type**: `boolean`
**Default**: `false`
**Description**: Right-to-left rendering for RTL languages.

```html
<ejs-dropdowntree id="rtlTree" locale="ar" enableRtl="true">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    #rtlTree {
        direction: rtl;
    }
</style>
```

## Selection Mode Properties

### showCheckBox

**Property**: `showCheckBox`
**Type**: `boolean`
**Default**: `false`
**Description**: Display checkboxes for multiple selection.

```html
<ejs-dropdowntree id="checkboxTree" showCheckBox="true">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### allowMultiSelection

**Property**: `allowMultiSelection`
**Type**: `boolean`
**Default**: `false`
**Description**: Enable multiple selection without checkboxes.

```html
<ejs-dropdowntree id="multiSelectTree" allowMultiSelection="true">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### mode

**Property**: `mode`
**Type**: `Mode` - `Default | Delimiter | Box | Custom`
**Default**: `Default`
**Description**: Display mode for multiple selected items.

```html
<!-- Default mode -->
<ejs-dropdowntree id="defaultModeTree" showCheckBox="true" mode="Default">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Delimiter mode -->
<ejs-dropdowntree id="delimiterModeTree" showCheckBox="true" mode="Delimiter" delimiterChar=",">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Box mode (chip display) -->
<ejs-dropdowntree id="boxModeTree" showCheckBox="true" mode="Box">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Custom mode with custom template -->
<ejs-dropdowntree id="customModeTree" showCheckBox="true" mode="Custom" customTemplate="<span>${value.length} selected</span>">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### delimiterChar

**Property**: `delimiterChar`
**Type**: `string`
**Default**: `","`
**Description**: Delimiter character for Delimiter mode display.

```html
<ejs-dropdowntree id="customDelimiterTree" showCheckBox="true" mode="Delimiter" delimiterChar=" | ">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

## Field Configuration

### fields

**Property**: `fields`
**Type**: `FieldsModel`
**Description**: Maps data source properties to component display properties.

```csharp
var fieldSettings = new Syncfusion.EJ2.DropDowns.DropDownTreeFieldSettings
{
    dataSource = data,
    value = "Id",                  // Use this property as value
    text = "Name",                 // Display this property as text
    child = "SubItems",            // Nested children array
    parentValue = "ParentId",     // Parent reference for self-referential
    hasChildren = "HasChild",      // Boolean indicating children exist
    iconCss = "Icon",              // CSS class for icon
    imageUrl = "Image",            // Image URL
    tooltip = "Description",       // Tooltip text
    expanded = "IsExpanded",       // Initially expanded
    selected = "IsSelected",       // Initially selected
    selectable = "CanSelect",      // Whether selectable
    htmlAttributes = "Attrs"       // HTML attributes object
};
```

## Tree Settings

### treeSettings

**Property**: `treeSettings`
**Type**: `TreeSettings`
**Description**: Configures tree-specific behavior.

```html
<ejs-dropdowntree id="customTree">
    <e-dropdowntree-treeSettings autoCheck="true" checkDisabledChildren="true" expandOn="Click" loadOnDemand="false"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### autoCheck

**Property**: `autoCheck` (within TreeSettings)
**Type**: `boolean`
**Default**: `false`
**Description**: Auto-synchronize parent-child checkbox states.

```html
<ejs-dropdowntree id="autoCheckTree" showCheckBox="true">
    <e-dropdowntree-treeSettings autoCheck="true"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### expandOn

**Property**: `expandOn` (within TreeSettings)
**Type**: `ExpandOn` - `Auto | Click | DblClick | None`
**Default**: `Auto`
**Description**: Trigger for node expansion.

```html
<!-- Auto: double-click desktop, single-tap mobile -->
<ejs-dropdowntree id="autoExpandTree">
    <e-dropdowntree-treeSettings expandOn="Auto"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- Click: single-click/tap -->
<ejs-dropdowntree id="clickExpandTree">
    <e-dropdowntree-treeSettings expandOn="Click"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- DblClick: double-click/tap -->
<ejs-dropdowntree id="dblExpandTree">
    <e-dropdowntree-treeSettings expandOn="DblClick"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<!-- None: no expansion -->
<ejs-dropdowntree id="noExpandTree">
    <e-dropdowntree-treeSettings expandOn="None"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### loadOnDemand

**Property**: `loadOnDemand` (within TreeSettings)
**Type**: `boolean`
**Default**: `false`
**Description**: Enable lazy loading of child nodes.

```html
<ejs-dropdowntree id="lazyLoadTree">
    <e-dropdowntree-treeSettings loadOnDemand="true"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@lazyDataManager" hasChildren="HasChildren"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

## Appearance and Styling

### Theme Customization

```html
<!-- Using cssClass for theme -->
<ejs-dropdowntree id="themedTree" cssClass="dark-theme high-contrast">
    <e-dropdowntree-fields dataSource="@fieldSettings.DataSource" text="@fieldSettings.Text" value="@fieldSettings.Value"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .dark-theme #themedTree .e-input,
    .dark-theme #themedTree .e-popup {
        background-color: #1e1e1e;
        color: #fff;
    }
    
    .high-contrast #themedTree {
        border-width: 2px;
        font-weight: 600;
    }
</style>
```

### Icon and Image Configuration

```csharp
public class MenuItem
{
    public string MenuId { get; set; }
    public string MenuName { get; set; }
    public string IconClass { get; set; }  // Maps to iconCss
    public string ImagePath { get; set; }  // Maps to imageUrl
}
```

```html
@{
    var iconItemTemplate = "<div><i class='${IconClass}'></i><img src='${ImagePath}' alt='${MenuName}'><span>${MenuName}</span></div>";
}

<ejs-dropdowntree id="iconTree" itemTemplate="@iconItemTemplate">
    <e-dropdowntree-fields dataSource="@Model.MenuItems" text="MenuName" value="MenuId" child="SubMenus" iconCss="IconClass" imageUrl="ImagePath"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

## Performance Settings

### Virtual Scrolling

For very large datasets, consider implementing virtual scrolling to improve performance.

### Optimization Tips

1. **Use Lazy Loading**: For hierarchical data with thousands of items
2. **Limit Initial Data**: Load only visible nodes initially
3. **Simplify Templates**: Complex templates impact rendering performance
4. **Disable Persistence**: Only when state retention is necessary
5. **Optimize Data Structure**: Use self-referential for large hierarchies

## Accessibility Properties

### Tab index

**Purpose**: Control keyboard navigation tab order

```html
<ejs-dropdowntree id="tabIndexTree" tabindex="1">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### ARIA Attributes

Automatically applied based on component state and configuration. Can be enhanced with `htmlAttributes`.

```html
@{
    IDictionary<string, object> a11yAttrs = new Dictionary<string, object>
    {
        { "aria-label", "Select department" },
        { "aria-describedby", "help-text" },
        { "role", "combobox" }
    };
}

<ejs-dropdowntree id="a11yTree" htmlAttributes="a11yAttrs">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<small id="help-text">Use arrow keys to navigate, Enter to select</small>
```

---

**Next Steps**: Explore accessibility and keyboard interactions in `accessibility-and-globalization.md` or event handling in event-specific documentation.
