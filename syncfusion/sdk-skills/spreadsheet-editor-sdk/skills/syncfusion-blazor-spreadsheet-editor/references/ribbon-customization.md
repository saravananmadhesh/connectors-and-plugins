## Ribbon Customization

> Customize and extend the ribbon interface by controlling built-in tabs, groups, and items visibility, ordering, and enabled state. Add custom tabs, groups, and items to the ribbon for application-specific functionality.

### PROPERTY
Use **property bindings** to set the initial state of ribbon tabs, groups, and items when the component first renders.
```csharp
RibbonTabItems="@GetTabCustomizations()"
RibbonGroupItems="@GetGroupCustomizations()"
RibbonItems="@GetItemCustomizations()"
CustomRibbonTabs="@GetCustomTabs()"
CustomRibbonGroups="@GetCustomGroups()"
CustomRibbonItems="@GetCustomItems()"
```

### BUTTON
Use **API methods** with button click handlers to dynamically show, hide, enable, or disable ribbon elements at runtime.
<!-- Refer the below button for creating button and update the API public method calling. -->
<button @onclick="#MethodName">#Button Name</button>

### API METHODS
```csharp
// Hide or show ribbon tabs at runtime by their display names.
SpreadsheetInstance.HideRibbonTabs(new List<string> { "Insert", "View" });
SpreadsheetInstance.ShowRibbonTabs(new List<string> { "Insert", "View" });

// Enable or disable ribbon tabs.
SpreadsheetInstance.EnableRibbonTabs(new List<string> { "Insert", "Formulas" });
SpreadsheetInstance.DisableRibbonTabs(new List<string> { "Insert", "Formulas" });

// Hide or show ribbon items by their item IDs.
SpreadsheetInstance.HideRibbonItems(new List<string> { "bold", "italic" });
SpreadsheetInstance.ShowRibbonItems(new List<string> { "bold", "italic" });

// Enable or disable ribbon items by their item IDs.
SpreadsheetInstance.EnableRibbonItems(new List<string> { "bold", "italic" });
SpreadsheetInstance.DisableRibbonItems(new List<string> { "bold", "italic" });

// Add custom tabs, groups, and items to the ribbon.
SpreadsheetInstance.AddRibbonTab(RIBBONTAB, INDEX);
SpreadsheetInstance.AddRibbonItems(TABNAME, ITEMS, INDEX, GROUP);

// Manage File menu items.
SpreadsheetInstance.AddFileMenuItems(MENUITEMS, INDEX);
SpreadsheetInstance.HideFileMenuItems(new List<string> { "Open", "Print" });
SpreadsheetInstance.ShowFileMenuItems(new List<string> { "Open", "Print" });
SpreadsheetInstance.EnableFileMenuItems(new List<string> { "New", "Save As" });
SpreadsheetInstance.DisableFileMenuItems(new List<string> { "New", "Save As" });
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `#MethodName` | Name of the method calling when clicking the button | HideRibbonTabs, EnableRibbonItems |
| `#Button Name` | Provide a meaningful name to button which binds to API method | Hide Tabs, Enable Items |
| `RIBBONTAB` | The `RibbonTab` model to add | `new RibbonTab { HeaderText = "My Tools", ID = "myToolsTab" }` |
| `INDEX` | Zero-based index position for insertion | `0`, `2` |
| `TABNAME` | The ribbon tab name or ID (case-insensitive). Can use display name or ID | `"Home"` or `"homeTab"`, `"Insert"` or `"insertTab"` |
| `ITEMS` | A collection of `RibbonItem` objects with ID, Type, and settings | `new List<RibbonItem> { new RibbonItem { ID = "analyzeItem", Type = RibbonItemType.Button, ButtonSettings = new RibbonButtonSettings { Content = "Analyze", IconCss = "e-icons e-chart", OnClick = EventCallback.Factory.Create<MouseEventArgs>(this, OnAnalyzeClicked) } }, new RibbonItem { ID = "exportItem", Type = RibbonItemType.Dropdown, DropDownSettings = new RibbonDropDownSettings { Content = "Export", IconCss = "e-icons e-export" } } }` |
| `GROUP` | Optional `RibbonGroup` to create before adding items | `new RibbonGroup { HeaderText = "Custom" }`, `null` |
| `MENUITEMS` | A collection of `MenuItem` objects for File menu operations | `new List<MenuItem> { new MenuItem { Text = "Export as CSV", Id = "exportCsv", IconCss = "e-icons e-export-csv" }, new MenuItem { Text = "Export as PDF", Id = "exportPdf", IconCss = "e-icons e-export-pdf" } }` |

### Example: Ribbon Customization

#### Built-in Ribbon Customization
```csharp
<SpreadsheetRibbon RibbonTabItems="@RibbonTabCustomizations"
                   RibbonGroupItems="@RibbonGroupCustomizations"
                   RibbonItems="@RibbonItemCustomizations">
</SpreadsheetRibbon>

@code {
    // Hide built-in tab and reorder
    private List<SpreadsheetRibbonTab> RibbonTabCustomizations = new()
    {
        new SpreadsheetRibbonTab { TabId = "reviewTab", IsVisible = false },
        new SpreadsheetRibbonTab { TabId = "viewTab", Order = 1 }
    };

    // Hide built-in group
    private List<SpreadsheetRibbonGroup> RibbonGroupCustomizations = new()
    {
        new SpreadsheetRibbonGroup 
        { 
            GroupId = "bordersGroup", 
            TabId = "homeTab", 
            IsVisible = false
        }
    };

    // Hide and disable built-in items
    private List<SpreadsheetRibbonItem> RibbonItemCustomizations = new()
    {
        new SpreadsheetRibbonItem { ItemId = "strikethrough", IsVisible = false },
        new SpreadsheetRibbonItem { ItemId = "protectSheet", IsEnabled = false }
    };
}
```

#### Adding Custom Tab, Group, and Items
```csharp
<SpreadsheetRibbon CustomRibbonTabs="@GetCustomTabs()"
                   CustomRibbonGroups="@GetCustomGroups()"
                   CustomRibbonItems="@GetCustomItems()">
</SpreadsheetRibbon>

@code {
    // Add custom tab
    private List<SpreadsheetCustomRibbonTab> GetCustomTabs()
    {
        return new List<SpreadsheetCustomRibbonTab>
        {
            new SpreadsheetCustomRibbonTab
            {
                Index = 2,
                Template = @<RibbonTab ID="toolsTab" HeaderText="Tools">
                    <RibbonGroups>
                        <RibbonGroup ID="utilitiesGroup" HeaderText="Utilities">
                            <RibbonCollections>
                                <RibbonCollection>
                                    <RibbonItems>
                                        <RibbonItem Type="RibbonItemType.Button">
                                            <RibbonButtonSettings Content="Analyze" IconCss="e-icons e-chart" @onclick="Action"></RibbonButtonSettings>
                                        </RibbonItem>
                                    </RibbonItems>
                                </RibbonCollection>
                            </RibbonCollections>
                        </RibbonGroup>
                    </RibbonGroups>
                </RibbonTab>
            }
        };
    }

    // Add custom group to Home tab
    private List<SpreadsheetCustomRibbonGroup> GetCustomGroups()
    {
        return new List<SpreadsheetCustomRibbonGroup>
        {
            new SpreadsheetCustomRibbonGroup
            {
                TabId = "homeTab",
                Index = 8,
                Template = @<RibbonGroup ID="exportGroup" HeaderText="Export">
                    <RibbonCollections>
                        <RibbonCollection>
                            <RibbonItems>
                                <RibbonItem Type="RibbonItemType.Button" ID="exportPdf">
                                    <RibbonButtonSettings Content="Export PDF" IconCss="e-icons e-export-pdf" @onclick="Action"></RibbonButtonSettings>
                                </RibbonItem>
                            </RibbonItems>
                        </RibbonCollection>
                    </RibbonCollections>
                </RibbonGroup>
            }
        };
    }

    // Add custom item to existing group
    private List<SpreadsheetCustomRibbonItem> GetCustomItems()
    {
        return new List<SpreadsheetCustomRibbonItem>
        {
            new SpreadsheetCustomRibbonItem
            {
                GroupId = "fontStyleGroup",
                Index = 4,
                Template = @<RibbonItem Type="RibbonItemType.Button">
                    <RibbonButtonSettings Content="Highlight" IconCss="e-icons e-highlight" @onclick="Action"></RibbonButtonSettings>
                </RibbonItem>
            }
        };
    }

    // Generic placeholder for button actions
    private void Action()
    {
        // TODO: implement button action
    }
}
```
### Ribbon Tabs

| Tab ID | Display Name | Description |
|--|--|--|
| `homeTab` | Home | Contains clipboard, font (family/size/style), alignment, number-format, borders/fill, merge, conditional-formatting, sort/clear, and undo/redo |
| `insertTab` | Insert | Contains commands for inserting images, hyperlinks, and functions |
| `formulasTab` | Formulas | Contains calculation options and named range management commands |
| `reviewTab` | Review | Contains worksheet protection and name manager commands |
| `viewTab` | View | Contains view options such as gridlines |

### Ribbon Groups

| Group ID | Tab | Description |
|--|--|--|
| `undoRedoGroup` | Home | Undo and redo cell modifications |
| `clipboardGroup` | Home | Cut, copy, and paste operations |
| `numberFormatGroup` | Home | Number format selection and application |
| `fontFamilyGroup` | Home | Font family selection |
| `fontSizeGroup` | Home | Font size adjustment |
| `fontStyleGroup` | Home | Text formatting options: bold, italic, underline, strikethrough, font color |
| `bordersGroup` | Home | Border styling and color application |
| `backgroundColorGroup` | Home | Cell background color and cell merge operations |
| `fontAlignmentGroup` | Home | Text alignment and wrap options |
| `conditionalFormattingGroup` | Home | Conditional formatting rule creation and management |
| `dataOperationsGroup` | Home | Data clearing and sorting operations |
| `insertGroup` | Insert | Hyperlink and image insertion |
| `insertFunctionsGroup` | Formulas | Function insertion and formula building |
| `calculationOptionGroup` | Formulas | Calculation mode selection |
| `manualCalculationGroup` | Formulas | Manual sheet and workbook calculation |
| `namedRangesGroup` | Formulas | Named range definition and management |
| `protectionGroup` | Review | Worksheet and workbook protection |
| `viewGroup` | View | Grid display and view customization options |

### Ribbon Items

| Item ID | Description |
|--|--|
| `undo` | Undo the last cell modification |
| `redo` | Redo the last undone action |
| `cut` | Remove selected cells to clipboard |
| `copy` | Copy selected cells to clipboard |
| `paste` | Paste clipboard contents to selected cells |
| `numberFormat` | Apply number format to selected cells |
| `fontFamily` | Change the font family of selected text |
| `fontSize` | Adjust the font size of selected text |
| `bold` | Apply or remove bold formatting |
| `italic` | Apply or remove italic formatting |
| `underline` | Apply or remove underline formatting |
| `strikethrough` | Apply or remove strikethrough formatting |
| `fontColor` | Change the color of selected text |
| `borderPicker` | Apply borders to selected cells |
| `colorPicker` | Set the background color of selected cells |
| `mergeCell` | Merge selected cells into one |
| `horizontalAlignment` | Set horizontal text alignment |
| `verticalAlignment` | Set vertical text alignment |
| `wrapText` | Enable or disable text wrapping in cells |
| `conditionalFormat` | Create and apply conditional formatting rules |
| `clear` | Clear contents from selected cells |
| `sort` | Sort data in ascending or descending order |
| `link` | Insert or edit a hyperlink |
| `image` | Insert an image into the worksheet |
| `insertFunction` | Insert a formula function |
| `calculationOption` | Change the calculation mode |
| `calculateSheet` | Recalculate the current sheet |
| `calculateWorkbook` | Recalculate all sheets in the workbook |
| `nameManager` | Define and manage named ranges |
| `protectSheet` | Enable or disable worksheet protection |
| `protectWorkbook` | Enable or disable workbook protection |
| `gridlines` | Show or hide gridlines in the worksheet |

### File Menu Items

| Menu Item Name | Menu Item ID | Description |
|--|--|--|
| New | `new` | Create a new workbook |
| Open | `open` | Open an existing workbook |
| Save | `save` | Save the current workbook |
| Save As | `saveAs` | Save the workbook with a new name or format |
| Microsoft Excel (.xlsx) | `sfspreadsheet_Xlsx` | Export workbook as Microsoft Excel (.xlsx) |
| Microsoft Excel 97-2003 (.xls) | `sfspreadsheet_Xls` | Export workbook as Excel 97-2003 (.xls) |
| Comma-separated values (.csv) | `sfspreadsheet_Csv` | Export worksheet as CSV (.csv) |
| PDF Document (.pdf) | `sfspreadsheet_Pdf` | Export workbook or worksheet as PDF (.pdf) |

### SpreadsheetRibbonTab Class Properties

| Property | Type | Description |
|--|--|--|
| `TabId` | string | The unique identifier of the ribbon tab (e.g., "homeTab", "insertTab") |
| `HeaderText` | string | Custom header label for the tab |
| `Order` | int? | Sets the tab's display order. Lower values appear first. Default is **null** |
| `IsVisible` | bool | Controls whether the tab is visible in the ribbon. Default is **true** |

### SpreadsheetRibbonGroup Class Properties

| Property | Type | Description |
|--|--|--|
| `GroupId` | string | The unique identifier of the ribbon group (e.g., "clipboardGroup", "fontStyleGroup") |
| `TabId` | string | The ID of the parent tab containing this group |
| `Order` | int? | Sets the group's display order within its tab. Default is **null** |
| `IsVisible` | bool | Controls whether the group is visible. Default is **true** |

### SpreadsheetRibbonItem Class Properties

| Property | Type | Description |
|--|--|--|
| `ItemId` | string | The unique identifier of the ribbon item (e.g., "bold", "italic") |
| `GroupId` | string | The ID of the parent group containing this item |
| `Order` | int? | Sets the item's display order within its group. Default is **null** |
| `IsVisible` | bool | Controls whether the item is visible. Default is **true** |
| `IsEnabled` | bool? | Controls whether the item is enabled. **null** = auto managed, **true** = always enabled, **false** = always disabled |

### SpreadsheetCustomRibbonTab Class Properties

| Property | Type | Description |
|--|--|--|
| `Index` | int | The position where the tab will be inserted. Use **-1** to append at the end. Default is **-1** |
| `Template` | RenderFragment | The Blazor markup defining the tab's content and layout |

### SpreadsheetCustomRibbonGroup Class Properties

| Property | Type | Description |
|--|--|--|
| `TabId` | string | The ID of the parent tab where the group will be added |
| `Index` | int | The position where the group will be inserted within the tab. Use **-1** to append. Default is **-1** |
| `Template` | RenderFragment | The Blazor markup defining the group's content |

### SpreadsheetCustomRibbonItem Class Properties

| Property | Type | Description |
|--|--|--|
| `GroupId` | string | The ID of the parent group where the item will be added |
| `Index` | int | The position where the item will be inserted within the group. Use **-1** to append. Default is **-1** |
| `Template` | RenderFragment | The Blazor markup defining the item's content |

### RibbonTab Class Properties

| Property | Type | Description |
|--|--|--|
| `ID` | string | The unique identifier for the ribbon tab. Used to reference the tab programmatically |
| `HeaderText` | string | The header text displayed for the ribbon tab |
| `CssClass` | string | CSS classes to customize the appearance of the ribbon tab. Accept space-separated class names |
| `KeyTip` | string | Keyboard shortcut for accessing the tab when key tips are enabled |
| `Visible` | bool | Controls the visibility of the tab. Default is **true**. Set to **false** to hide the tab |
| `VisibleChanged` | EventCallback<bool> | Event raised when the `Visible` property value has changed |

### RibbonGroup Class Properties

| Property | Type | Description |
|--|--|--|
| `ID` | string | The unique identifier for the ribbon group. Used to reference the group dynamically |
| `HeaderText` | string | The header text displayed at the top of the ribbon group |
| `CssClass` | string | CSS classes to customize the appearance of the ribbon group. Accept space-separated class names |
| `Orientation` | Orientation | Layout orientation of items: **Column** (vertical/default) or **Row** (horizontal) |
| `ShowLauncherIcon` | bool | Show or hide the launcher icon (small button in lower-right corner). Default is **false** |
| `PopupHeaderText` | string | Header text shown in the overflow popup for the group |
| `GroupIconCss` | string | CSS class for icons in the group overflow dropdown button during overflow in classic mode |
| `IsCollapsed` | bool | Indicates whether the group is in a collapsed state during classic mode. Default is **false** |
| `IsCollapsible` | bool | Controls whether the group can collapse on resize during classic mode. Default is **true** |
| `EnableGroupOverflow` | bool | Add a separate popup for overflow items in the group. Default is **false** |
| `Priority` | int | Priority order for collapse/expand. Ascending for expanding, descending for collapsing. Default is **0** |
| `LauncherIconKeyTip` | string | Keyboard shortcut for the launcher icon when key tips are enabled |

### RibbonItem Class Properties

| Property | Type | Description |
|--|--|--|
| `ID` | string | The unique identifier for the ribbon item. Used to reference the item programmatically |
| `Type` | RibbonItemType | The type of ribbon item: **Button**, **Checkbox**, **ComboBox**, **ColorPicker**, **Dropdown**, **SplitButton**, **Gallery**, **GroupButton**, or **Template** |
| `Disabled` | bool | Controls whether the item is disabled. Default is **false**. Disabled items cannot be interacted with |
| `DisabledChanged` | EventCallback<bool> | Event raised when the `Disabled` property value has changed |
| `CssClass` | string | CSS classes to customize the appearance of the ribbon item. Accept space-separated class names |
| `KeyTip` | string | Keyboard shortcut for accessing the item when key tips are enabled |
| `DisplayOptions` | DisplayMode | Display mode options: **Classic**, **Simplified**, **Overflow**, or **Auto** (default). Controls where item appears |
| `ActiveSize` | RibbonItemSize | The active display size: **Large**, **Medium** (default), or **Small** |
| `AllowedSizes` | RibbonItemSize | Sizes allowed for the item on ribbon resize. Determines how item adapts when ribbon is resized |
| `TooltipSettings` | RibbonTooltipSettings | Configuration for item tooltips. Customize content, title, and icon |
| `ItemTemplate` | RenderFragment<RibbonItemContext> | Custom template for rendering the ribbon item. Receives `ActiveSize` in context |
| `ButtonSettings` | RibbonButtonSettings | Settings for button-type items. Configure content, icon, click events |
| `CheckBoxSettings` | RibbonCheckBoxSettings | Settings for checkbox-type items. Control appearance and state behaviors |
| `ComboBoxSettings` | RibbonComboBoxSettings | Settings for combobox-type items. Customize display templates and filtering |
| `DropDownSettings` | RibbonDropDownSettings | Settings for dropdown-type items. Configure selectable items list |
| `ColorPickerSettings` | RibbonColorPickerSettings | Settings for color picker items. Adjust palettes and color selections |
| `SplitButtonSettings` | RibbonSplitButtonSettings | Settings for split button items. Configure button and dropdown menu |
| `GroupButtonSettings` | RibbonGroupButtonSettings | Settings for group button items. Configure selection behavior and grouping |
| `GallerySettings` | RibbonGallerySettings | Settings for gallery items. Configure gallery view and item rendering |

### MenuItem Class Properties

| Property | Type | Description |
|--|--|--|
| `Text` | string | Display text of the menu item |
| `Id` | string | Unique identifier for the menu item |
| `IconCss` | string | CSS class for icon to display (e.g., "e-icons e-export-pdf") |
| `Url` | string | URL for anchor link navigation (optional) |
| `Items` | List<MenuItem> | Sub-menu items (nested menu support) |
| `Separator` | bool | Enable/disable separator line between menu items |
| `Disabled` | bool | Enable/disable the menu item (disabled items appear grayed out) |
| `Hidden` | bool | Show/hide the menu item |

### Notes

- **Using Statement**: Add `@using Syncfusion.Blazor.Ribbon` at the top of your component when customizing or adding custom tabs, groups, and items to the ribbon.
- **Order Property**: When `Order` is `null`, the framework preserves existing order. Set to specific integer to reorder elements.
- **Case-Insensitive Matching**: Tab names, item IDs, and menu item text matching in API methods is case-insensitive.
- **Invalid IDs**: Non-existent IDs are silently ignored without throwing errors.
- **Parent Dependency**: Custom groups need valid parent `TabId`; custom items need valid parent `GroupId`. Missing parents result in no insertion.
- **Hiding vs. Disabling**: `IsVisible=false` removes from UI; `IsEnabled=false` grays out but remains visible.
- **Dynamic RibbonTab with Items**: When adding a new `RibbonTab` dynamically using `AddRibbonTab()`, you must first create and add a `RibbonGroup` to the tab before adding any items. Items cannot be added directly to a tab; they must be placed within a group. Use `AddRibbonItems()` with the `GROUP` parameter to specify or create the group, and ensure that the items are added at index 0.
- **Important:** API methods should **NOT** be called inside `OnInitialized` or `OnParametersSet` lifecycle methods. Call them in response to user interactions (like button clicks) or other appropriate lifecycle methods after component is fully rendered.
- **Prefer Syncfusion components:** Use Syncfusion components inside ribbon items when possible; reserve raw HTML templates for complex/custom markup.
- **Components:** Add required `@using` statements at the top when using other Blazor Syncfusion components in ribbon items.
- **Templates:** For raw HTML or custom markup inside a ribbon item set `Type="RibbonItemType.Template"` and use an `ItemTemplate` containing your markup.

### Documentation link
[Blazor Spreadsheet Ribbon Customization](https://help.syncfusion.com/document-processing/excel/spreadsheet/blazor/ribbon-customization)
