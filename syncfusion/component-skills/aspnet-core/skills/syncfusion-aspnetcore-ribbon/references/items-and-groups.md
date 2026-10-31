# Items and Groups Configuration

## Table of Contents

- [Item Types Overview](#item-types-overview)
- [Button Items](#button-items)
- [CheckBox Items](#checkbox-items)
- [DropDown Items](#dropdown-items)
- [SplitButton Items](#splitbutton-items)
- [ComboBox Items](#combobox-items)
- [ColorPicker Items](#colorpicker-items)
- [GroupButton Items](#groupbutton-items)
- [Template Items](#template-items)
- [Item Display Options](#item-display-options)
- [Item Sizing](#item-sizing)
- [Group Configuration](#group-configuration)

## Item Types Overview

The Ribbon supports 7 main item types (plus Template for custom content):

| Type | Tag Helper | Description | Settings Class |
|------|------------|-------------|-----------------|
| Button | `type=Button` | Standard clickable button | `RibbonButtonSettings` |
| CheckBox | `type=CheckBox` | Checkbox with label | `RibbonCheckBoxSettings` |
| DropDown | `type=DropDown` | Dropdown menu button | `RibbonDropDownSettings` |
| SplitButton | `type=SplitButton` | Button + dropdown | `RibbonSplitButtonSettings` |
| ComboBox | `type=ComboBox` | Input + dropdown list | `RibbonComboBoxSettings` |
| ColorPicker | `type=ColorPicker` | Color selection control | `RibbonColorPickerSettings` |
| GroupButton | `type=GroupButton` | Multiple buttons grouped | `RibbonGroupButtonSettings` |
| Template | `type=Template` | Custom HTML content | N/A |

## Button Items

### Basic Button

```razor
<e-ribbon-item type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

### Toggle Button

```razor
<e-ribbon-item type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-bold" isToggle=true></e-ribbon-buttonsettings>
</e-ribbon-item>
```

### Button Settings

| Property | Type | Description |
|----------|------|-------------|
| `iconCss` | string | Icon class (e.g., "e-icons e-cut") |
| `content` | string | Button text label |
| `isToggle` | bool | Toggle on/off behavior |
| `cssClass` | string | Custom CSS class |

## CheckBox Items

### Basic CheckBox

```razor
<e-ribbon-item type=CheckBox>
    <e-ribbon-checkboxsettings label="Ruler" checked=false></e-ribbon-checkboxsettings>
</e-ribbon-item>
```

### Checked State

```razor
<e-ribbon-item type=CheckBox>
    <e-ribbon-checkboxsettings label="Ruler" checked=true></e-ribbon-checkboxsettings>
</e-ribbon-item>
```

### Label Position

```razor
<e-ribbon-item type=CheckBox>
    <e-ribbon-checkboxsettings label="Ruler" labelPosition=LabelPosition.Before checked=true></e-ribbon-checkboxsettings>
</e-ribbon-item>
```

### CheckBox Settings

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Checkbox label text |
| `labelPosition` | enum | `Before` or `After` (default: After) |
| `checked` | bool | Initial checked state |

## DropDown Items

### Basic DropDown

```razor
@{
    string[] options = new string[] { "Option 1", "Option 2", "Option 3" };
}

<e-ribbon-item type=DropDown>
    <e-ribbon-dropdownsettings iconCss="e-icons e-table" content="Table" target="#optionsList"></e-ribbon-dropdownsettings>
</e-ribbon-item>
<ejs-listview id="optionsList" dataSource=options></ejs-listview>
```

### With MenuItem List

```razor
@{
    List<MenuItem> tableOptions = new List<MenuItem>() { 
        new MenuItem { Text = "Insert Table" }, 
        new MenuItem { Text = "This device" }, 
        new MenuItem { Text = "Convert Table" } 
    };
}

<e-ribbon-item type=DropDown>
    <e-ribbon-dropdownsettings iconCss="e-icons e-table" content="Table" items=tableOptions></e-ribbon-dropdownsettings>
</e-ribbon-item>
```

### Create Popup on Click

```razor
<e-ribbon-item type=DropDown>
    <e-ribbon-dropdownsettings iconCss="e-icons e-table" content="Table" items=tableOptions createPopupOnClick=true></e-ribbon-dropdownsettings>
</e-ribbon-item>
```

### DropDown Settings

| Property | Type | Description |
|----------|------|-------------|
| `iconCss` | string | Icon class |
| `content` | string | Button text |
| `items` | List<MenuItem> | Dropdown options |
| `target` | string | Element selector for popup |
| `createPopupOnClick` | bool | Create popup only on click |

## SplitButton Items

### Basic SplitButton

```razor
@{
    List<MenuItem> pasteOptions = new List<MenuItem>() { 
        new MenuItem { Text = "Keep Source Format" }, 
        new MenuItem { Text = "Merge format" } 
    };
}

<e-ribbon-item type=SplitButton>
    <e-ribbon-splitbuttonsettings iconCss="e-icons e-paste" content="Paste" items=pasteOptions></e-ribbon-splitbuttonsettings>
</e-ribbon-item>
```

### SplitButton with Target

```razor
<e-ribbon-item type=SplitButton>
    <e-ribbon-splitbuttonsettings iconCss="e-icons e-image" content="Pictures" target="#pictureList"></e-ribbon-splitbuttonsettings>
</e-ribbon-item>
<ejs-listview id="pictureList" dataSource=pictureOptions></ejs-listview>
```

### SplitButton Settings

| Property | Type | Description |
|----------|------|-------------|
| `iconCss` | string | Icon class |
| `content` | string | Button text |
| `items` | List<MenuItem> | Dropdown options |
| `target` | string | Element selector |

## ComboBox Items

### Basic ComboBox

```razor
@{
    List<string> fontStyle = new List<string>() { 
        "Arial", "Calibri", "Cambria", "Georgia" 
    };
}

<e-ribbon-item type=ComboBox>
    <e-ribbon-comboboxsettings dataSource=fontStyle index=0></e-ribbon-comboboxsettings>
</e-ribbon-item>
```

### With Filtering

```razor
<e-ribbon-item type=ComboBox>
    <e-ribbon-comboboxsettings dataSource=fontStyle allowFiltering=true index=0 width="150px"></e-ribbon-comboboxsettings>
</e-ribbon-item>
```

### With Sorting

```razor
<e-ribbon-item type=ComboBox>
    <e-ribbon-comboboxsettings dataSource=fontStyle sortOrder=SortOrder.Descending width="120px"></e-ribbon-comboboxsettings>
</e-ribbon-item>
```

### ComboBox Settings

| Property | Type | Description |
|----------|------|-------------|
| `dataSource` | List | Items to display |
| `index` | int | Selected index |
| `width` | string | Width (e.g., "150px") |
| `allowFiltering` | bool | Enable search |
| `sortOrder` | enum | None, Ascending, Descending |
| `label` | string | Placeholder text |

## ColorPicker Items

### Basic ColorPicker

```razor
<e-ribbon-item type=ColorPicker allowedSizes=Small>
    <e-ribbon-colorpickersettings value="#123456"></e-ribbon-colorpickersettings>
</e-ribbon-item>
```

### ColorPicker Settings

| Property | Type | Description |
|----------|------|-------------|
| `value` | string | Hex color value (#RRGGBB) |
| `columns` | int | Color grid columns |
| `showButtons` | bool | Show OK/Cancel buttons |

## GroupButton Items

### With Content

```razor
@{
    List<RibbonGroupButtonItem> alignItems = new List<RibbonGroupButtonItem>() {
        new RibbonGroupButtonItem { IconCss = "e-icons e-align-left", Content = "Align Left" },
        new RibbonGroupButtonItem { IconCss = "e-icons e-align-center", Content = "Align Center" },
        new RibbonGroupButtonItem { IconCss = "e-icons e-align-right", Content = "Align Right" }
    };
}

<e-ribbon-item type=GroupButton allowedSizes=Medium>
    <e-ribbon-groupbuttonsettings items=alignItems></e-ribbon-groupbuttonsettings>
</e-ribbon-item>
```

### Icon Only

```razor
@{
    List<RibbonGroupButtonItem> formatItems = new List<RibbonGroupButtonItem>() {
        new RibbonGroupButtonItem { IconCss = "e-icons e-bold" },
        new RibbonGroupButtonItem { IconCss = "e-icons e-italic" },
        new RibbonGroupButtonItem { IconCss = "e-icons e-underline" }
    };
}

<e-ribbon-item type=GroupButton allowedSizes=Small>
    <e-ribbon-groupbuttonsettings items=formatItems></e-ribbon-groupbuttonsettings>
</e-ribbon-item>
```

### Single Selection

```razor
<e-ribbon-item type=GroupButton allowedSizes=Small>
    <e-ribbon-groupbuttonsettings selection=Single items=alignItems></e-ribbon-groupbuttonsettings>
</e-ribbon-item>
```

### Multiple Selection

```razor
<e-ribbon-item type=GroupButton allowedSizes=Small>
    <e-ribbon-groupbuttonsettings selection=Multiple items=formatItems></e-ribbon-groupbuttonsettings>
</e-ribbon-item>
```

### GroupButton Settings

| Property | Type | Description |
|----------|------|-------------|
| `items` | List<RibbonGroupButtonItem> | Button items |
| `selection` | enum | `Single`, `Multiple`, or none |

## Template Items

### Custom HTML

```razor
<e-ribbon-item type=Template itemTemplate='<div class="custom-item">Custom Content</div>'>
</e-ribbon-item>
```

### With Input Fields

```razor
<e-ribbon-item type=Template itemTemplate='<div class="search-box"><input type="text" placeholder="Search..." /></div>'>
</e-ribbon-item>
```

### Responsive Template

```razor
<e-ribbon-item type=Template itemTemplate='<span class="template ${activeSize}"><span class="e-icons e-video"></span><span class="text">Video</span></span>'>
</e-ribbon-item>

<style>
    .template {
        display: flex;
        align-items: center;
        cursor: pointer;
    }
    .template.Large {
        flex-direction: column;
    }
    .template.Small .text {
        display: none;
    }
</style>
```

## Item Display Options

Control when items appear using `displayOptions`:

### Display in Classic Layout Only

```razor
<e-ribbon-item displayOptions=@(Syncfusion.EJ2.Ribbon.DisplayMode.Classic) type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

### Display in Simplified Layout Only

```razor
<e-ribbon-item displayOptions=@(Syncfusion.EJ2.Ribbon.DisplayMode.Simplified) type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-paste" content="Paste"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

### Display in Overflow Only

```razor
<e-ribbon-item displayOptions=@(Syncfusion.EJ2.Ribbon.DisplayMode.Overflow) type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-edit" content="Edit"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

## Item Sizing

Control item size with `allowedSizes`:

```razor
<!-- Large: Icon + Text -->
<e-ribbon-item type=Button allowedSizes=Large>
    <e-ribbon-buttonsettings iconCss="e-icons e-paste" content="Paste"></e-ribbon-buttonsettings>
</e-ribbon-item>

<!-- Medium: Small Icon + Text -->
<e-ribbon-item type=Button allowedSizes=Medium>
    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
</e-ribbon-item>

<!-- Small: Icon only -->
<e-ribbon-item type=Button allowedSizes=Small>
    <e-ribbon-buttonsettings iconCss="e-icons e-bold"></e-ribbon-buttonsettings>
</e-ribbon-item>
```

## Item States

### Disabled Items

```razor
<e-ribbon-item disabled=true type=Button>
    <e-ribbon-buttonsettings iconCss="e-icons e-cut" content="Cut"></e-ribbon-buttonsettings>
</e-ribbon-item>

<e-ribbon-item disabled=true type=CheckBox>
    <e-ribbon-checkboxsettings label="Ruler" checked=true></e-ribbon-checkboxsettings>
</e-ribbon-item>

<e-ribbon-item disabled=true type=DropDown>
    <e-ribbon-dropdownsettings content="Table" iconCss="e-icons e-table"></e-ribbon-dropdownsettings>
</e-ribbon-item>
```

## Group Configuration

### Group Properties

| Property | Type | Description |
|----------|------|-------------|
| `header` | string | Group label |
| `orientation` | enum | `Row` or `Column` (default) |
| `isCollapsible` | bool | Can collapse (default: true) |
| `priority` | int | Higher = collapse first |
| `enableGroupOverflow` | bool | Show overflow popup |
| `showLauncherIcon` | bool | Show launcher icon |
| `groupIconCss` | string | Icon class for header |
| `id` | string | Unique identifier |

### Example: Full Configuration

```razor
<e-ribbon-group 
    header="Clipboard" 
    id="clipboard" 
    orientation=Row 
    isCollapsible=false 
    enableGroupOverflow=true 
    priority=1
    showLauncherIcon=true
    groupIconCss="e-icons e-paste">
    <!-- Items -->
</e-ribbon-group>
```

---
