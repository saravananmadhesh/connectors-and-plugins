---
name: checkbox-and-selection-dropdown-tree
---

# Checkbox Selection and Multi-Selection Features in Syncfusion DropDownTree

## Table of Contents

- [Overview](#overview)
- [Enabling Checkbox Mode](#enabling-checkbox-mode)
- [MultiSelection Without Checkboxes](#multiselection-without-checkboxes)
- [Auto-Check Parent-Child Dependency](#auto-check-parent-child-dependency)
- [Select All Functionality](#select-all-functionality)
- [Display Modes for Multiple Selections](#display-modes-for-multiple-selections)
- [Managing Selection State](#managing-selection-state)
- [Check State Synchronization](#check-state-synchronization)
- [Advanced Selection Scenarios](#advanced-selection-scenarios)
- [Selection Events and Interactions](#selection-events-and-interactions)

## Overview

The Syncfusion DropDownTree component provides comprehensive selection capabilities, from traditional single-select dropdowns to advanced multi-selection scenarios with checkbox support and automatic parent-child synchronization. These features enable flexible user interactions for collecting one or more values from hierarchical data structures.

The component supports multiple selection paradigms:
- **Single Selection**: Traditional browse and select one item
- **Multi-Selection**: Select multiple items using Ctrl+Click or Shift+Click
- **Checkbox Selection**: Check multiple items with visual checkbox indicators
- **Auto-Check**: Automatic parent-child dependency synchronization

Each selection mode has specific use cases and configuration requirements. Understanding these modes helps you choose the right approach for your application requirements.

## Enabling Checkbox Mode

Checkbox mode allows users to select multiple items by checking associated checkboxes. This is the most intuitive approach for multi-selection in hierarchical data.

### Basic Checkbox Implementation

**Minimal Configuration:**

```html
<ejs-dropdowntree id="checkboxTree" showCheckBox="true">
    <e-dropdowntree-fields dataSource="@categoryData" text="CategoryName" value="CategoryId" child="SubCategories"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

The `showCheckBox="true"` property is the only requirement to enable checkbox mode. When enabled:
- A checkbox appears before each item text
- Users can check/uncheck items by clicking the checkbox
- Selected items are tracked in the `value` property as an array
- Visual feedback shows checked/unchecked/intermediate states

### Checkbox Appearance

Checkboxes have three states in hierarchical scenarios:

1. **Checked**: Item and all children are selected
2. **Unchecked**: Item and all children are not selected
3. **Intermediate**: Some (but not all) children are selected

### Complete Checkbox Example

**Data Model:**

```csharp
public class AccessPermission
{
    public string PermissionId { get; set; }
    public string PermissionName { get; set; }
    public List<AccessPermission> SubPermissions { get; set; }
}
```

**Sample Data:**

```csharp
var permissionTree = new List<AccessPermission>
{
    new AccessPermission
    {
        PermissionId = "admin",
        PermissionName = "Admin Panel",
        SubPermissions = new List<AccessPermission>
        {
            new AccessPermission
            {
                PermissionId = "users",
                PermissionName = "User Management",
                SubPermissions = new List<AccessPermission>
                {
                    new AccessPermission { PermissionId = "u_create", PermissionName = "Create User" },
                    new AccessPermission { PermissionId = "u_edit", PermissionName = "Edit User" },
                    new AccessPermission { PermissionId = "u_delete", PermissionName = "Delete User" }
                }
            },
            new AccessPermission
            {
                PermissionId = "reports",
                PermissionName = "Reports",
                SubPermissions = new List<AccessPermission>
                {
                    new AccessPermission { PermissionId = "r_view", PermissionName = "View Reports" },
                    new AccessPermission { PermissionId = "r_export", PermissionName = "Export Reports" }
                }
            }
        }
    },
    new AccessPermission
    {
        PermissionId = "user",
        PermissionName = "User Dashboard",
        SubPermissions = new List<AccessPermission>
        {
            new AccessPermission { PermissionId = "profile", PermissionName = "My Profile" },
            new AccessPermission { PermissionId = "settings", PermissionName = "Settings" }
        }
    }
};
```

**View:**

```html
@page
@model PermissionModel

<div class="row">
    <div class="col-md-6">
        <h3>Select Permissions</h3>
        
        <ejs-dropdowntree id="permissionTree"
            showCheckBox="true"
            placeholder="Choose permissions">
            <e-dropdowntree-fields dataSource="@Model.PermissionTree" text="PermissionName" value="PermissionId" child="SubPermissions"></e-dropdowntree-fields>
        </ejs-dropdowntree>
        
        <button id="saveButton" class="btn btn-primary mt-3">Save Permissions</button>
    </div>
</div>

@section Scripts {
    <script>
        document.getElementById("saveButton").addEventListener("click", function() {
            var treeObj = document.getElementById("permissionTree").ej2_instances[0];
            var selectedPermissions = treeObj.value;
            
            console.log("Selected Permissions:", selectedPermissions);
            
            // Send selected permissions to server
            fetch("/api/user/permissions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ permissions: selectedPermissions })
            })
            .then(response => response.json())
            .then(data => {
                alert("Permissions saved successfully!");
            })
            .catch(error => console.error("Error:", error));
        });
    </script>
}
```

## MultiSelection Without Checkboxes

Multi-selection without checkboxes allows users to select multiple items using keyboard modifiers (Ctrl/Cmd, Shift) without displaying checkboxes.

### Implementation

```html
<ejs-dropdowntree id="multiSelectTree"
    allowMultiSelection="true"
    placeholder="Select multiple items (Ctrl+Click, Shift+Click)">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Name" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

**Usage Instructions:**
- **Single Select**: Click once on an item
- **Multiple Select**: Hold Ctrl (Windows/Linux) or Cmd (Mac) and click additional items
- **Range Select**: Click first item, then hold Shift and click last item to select entire range
- **Clear Selection**: Click an already-selected item while holding Ctrl to deselect it

### Keyboard Support

| Key Combination | Action |
|-----------------|--------|
| Arrow Up/Down | Navigate between items |
| Space | Toggle selection (if multiselection enabled) |
| Ctrl + A | Select all items |
| Ctrl + Click | Toggle individual item selection |
| Shift + Click | Select range from last selected to clicked item |

### Multi-Selection Example

```html
@page
@model InventoryModel

<h3>Select Products for Order</h3>

<ejs-dropdowntree id="productTree"
    allowMultiSelection="true"
    allowFiltering="true"
    placeholder="Select one or more products" select="onSelect">
    <e-dropdowntree-fields dataSource="@Model.ProductCategories" text="ProductName" value="ProductId" child="Products"></e-dropdowntree-fields>
</ejs-dropdowntree>

<button id="addToCart" class="btn btn-success mt-3">Add Selected to Cart</button>

@section Scripts {
    <script>
        function onSelect(args) {
            
            console.log("Selected Product IDs:", args.itemData);
        }
    </script>
}
```

## Auto-Check Parent-Child Dependency

When checkbox mode is enabled, auto-check creates automatic synchronization between parent and child checkboxes. This ensures data consistency when users select items hierarchically.

### Auto-Check Behavior

**With Auto-Check Disabled (Default):**
- Parent and child checkboxes are independent
- Checking a child does not affect parent
- Checking a parent does not affect children
- User must manually manage consistency

**With Auto-Check Enabled:**
- Checking a parent automatically checks all children
- Unchecking a parent automatically unchecks all children
- Checking all children automatically checks the parent
- Partial child selection shows parent in intermediate state

### Implementation

```html
<ejs-dropdowntree id="autoCheckTree" showCheckBox="true">
    <e-dropdowntree-treeSettings autoCheck="true"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@Model.hierarchicalData" text="Name" value="Id" child="SubItems"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### Practical Example: Feature Selection

```html
@page
@model FeatureSelectModel

@{
    var featureData = new List<Feature>
    {
        new Feature { FeatureId = "office", FeatureName = "Microsoft Office", SubFeatures = new List<Feature> {
            new Feature { FeatureId = "word", FeatureName = "Word" },
            new Feature { FeatureId = "excel", FeatureName = "Excel" },
            new Feature { FeatureId = "powerpoint", FeatureName = "PowerPoint" }
        }},
        new Feature { FeatureId = "visualstudio", FeatureName = "Visual Studio", SubFeatures = new List<Feature> {
            new Feature { FeatureId = "csharp", FeatureName = "C# Tools" },
            new Feature { FeatureId = "web", FeatureName = "Web Development" }
        }}
    };
}

<h3>Select Features to Install</h3>

<p class="text-muted">Check parent features to automatically select all sub-features</p>

<ejs-dropdowntree id="featureTree" showCheckBox="true" placeholder="Choose features">
    <e-dropdowntree-treeSettings autoCheck="true"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@featureData" text="FeatureName" value="FeatureId" child="SubFeatures"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### Auto-Check Limitations and Considerations

1. **Disabled Children**: Control via `checkDisabledChildren` property
   ```html
   <ejs-dropdowntree id="autoCheckAdvanced" showCheckBox="true">
       <e-dropdowntree-treeSettings autoCheck="true" checkDisabledChildren="false"></e-dropdowntree-treeSettings>
       <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Id" child="Children"></e-dropdowntree-fields>
   </ejs-dropdowntree>
   ```

2. **Large Datasets**: Auto-check can impact performance with thousands of items
3. **Partial States**: Intermediate checkbox states indicate partial selection

## Select All Functionality

Select All functionality provides a header control to select or deselect all items with a single click. This is useful for large trees or permission systems.

### Enabling Select All

```html
<ejs-dropdowntree id="selectAllTree" showCheckBox="true" showSelectAll="true" headerTemplate="@Html.Raw("<div class=\"head\">Employee List</div>")">
    <e-dropdowntree-treeSettings autoCheck="true"></e-dropdowntree-treeSettings>
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### Built-In Select All (Simpler Approach)

Some configurations may provide built-in "Select All" support through the component. Check the Syncfusion documentation for your specific version to determine if Select All is a built-in feature or requires custom implementation.

## Display Modes for Multiple Selections

When multiple items are selected, the component can display the selection in different formats. The `mode` property controls this display behavior.

### Available Display Modes

| Mode | Display Format | Use Case |
|------|---|---|
| **Default** | Shows selected values separated by default format | General multi-selection |
| **Delimiter** | Shows selected values separated by custom delimiter | CSV-style display |
| **Box** | Shows each selected value in separate chip/box | Tag/chip display |
| **Custom** | Uses custom template for display | Advanced formatting |

### Mode Example

**Default Mode:**
```
Selected Items: Item1, Item2, Item3
```

**Delimiter Mode (custom):**
```
Item1 | Item2 | Item3
```

**Box Mode:**
```
[Item1] [Item2] [Item3]
```

### Implementation Examples

**Default Mode:**

```html
<ejs-dropdowntree id="modeDefault" showCheckBox="true" mode="Default" placeholder="Select items">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

**Delimiter Mode:**

```html
<ejs-dropdowntree id="modeDelimiter" showCheckBox="true" mode="Delimiter" delimiterChar=" | " placeholder="Select items">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

**Box Mode (Recommended for Multi-Select):**

```html
<ejs-dropdowntree id="modeBox" showCheckBox="true" mode="Box" placeholder="Select items">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

**Custom Mode:**

```html
<ejs-dropdowntree id="modeCustom" showCheckBox="true" mode="Custom" customTemplate="${value.length} item(s) selected" placeholder="Select items">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### Mode-Specific Configuration

```csharp
new Syncfusion.EJ2.DropDowns.DropDownTreeFieldSettings
{
    // ... other field settings ...
}
```

With corresponding HTML:

```html
<ejs-dropdowntree id="advancedMode" showCheckBox="true" allowMultiSelection="true" mode="Box" delimiterChar=",">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

## Managing Selection State

### Programmatically Get Selected Values

```html
<script>
    var treeObj = document.getElementById("myTree").ej2_instances[0];
    
    // Get array of selected values
    var selectedValues = treeObj.value;
    console.log("Selected IDs:", selectedValues);

</script>
```

### Programmatically Set Selected Values

```html
<script>
    var treeObj = document.getElementById("myTree").ej2_instances[0];
    
    // Set selection programmatically
    treeObj.value = ["item1", "item2", "item3"];
    
    // This triggers change event
    treeObj.change = function(e) {
        console.log("Selection changed:", e.value);
    };
</script>
```

### Clear All Selections

```html
<script>
    var treeObj = document.getElementById("myTree").ej2_instances[0];
    treeObj.value = [];  // Clear all selections
</script>
```

## Check State Synchronization

### Synchronizing Related Components

When selections in DropDownTree should update other UI elements:

```html
@page
@model SyncModel
@{
    var categoryFieldSettings = new Syncfusion.EJ2.DropDowns.DropDownTreeFieldSettings
    {
        dataSource = Model.CategoryData,
        text = "CategoryName",
        value = "CategoryId",
        child = "SubCategories"
    };
}

<div class="row">
    <div class="col-md-6">
        <h5>Select Categories</h5>
        <ejs-dropdowntree id="categoryTree" showCheckBox="true" change="onChange">
            <e-dropdowntree-treeSettings autoCheck="true"></e-dropdowntree-treeSettings>
            <e-dropdowntree-fields dataSource="@Model.CategoryData" text="CategoryName" value="CategoryId" child="SubCategories"></e-dropdowntree-fields>
        </ejs-dropdowntree>
    </div>
    
    <div class="col-md-6">
        <h5>Selected Items</h5>
        <div id="selectedList"></div>
    </div>
</div>

@section Scripts {
    <script>
        var treeObj = document.getElementById("categoryTree").ej2_instances[0];
        var selectedList = document.getElementById("selectedList");
        
        function onChange(e) {
            // Update related UI
            updateSelectedList(e.value);
        }
        
        function updateSelectedList(values) {
            selectedList.innerHTML = values.map(v => "<badge>" + v + "</badge>").join("");
        }
    </script>
}
```

## Advanced Selection Scenarios

### Conditional Selection

```html
<script>
    var treeObj = document.getElementById("conditionalTree").ej2_instances[0];
    
    treeObj.select = function(e) {
        // Only allow selection of items with specific property
        if (e.itemData) {
            e.cancel = true;  //  Prevent selection
            alert("This item cannot be selected");
        }
    };
</script>
```

### Selection Limits

```html
<script>
    var treeObj = document.getElementById("limitedTree").ej2_instances[0];
    var MAX_SELECTIONS = 5;
    
    treeObj.select = function(e) {
        if (treeObj.value.length >= MAX_SELECTIONS && !treeObj.value.includes(e.itemData.Id)) {
            e.cancel = true;
            alert("Maximum " + MAX_SELECTIONS + " items can be selected");
        }
    };
</script>
```

## Selection Events and Interactions

### Key Selection Events

| Event | Triggered | Purpose |
|-------|-----------|---------|
| `change` | Value selection changes | Track final selection |
| `select` | Item selected/unselected | Handle selection action |
| `beforeOpen` | Popup about to open | Validate/prepare state |
| `keyPress` | Keyboard interaction | Handle keyboard navigation |

### Event Implementation

```html
<ejs-dropdowntree id="eventTree" showCheckBox="true" change="onChange" select="onSelect" beforeOpen="beforeOpen">
    <e-dropdowntree-fields dataSource="@Model.Data" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        var treeObj = document.getElementById("eventTree").ej2_instances[0];
        
        // Change event - fires when value changes
        function onChange(e) {
            console.log("Value changed from", e.oldValue, "to", e.value);
            console.log("Is user interaction:", e.isInteracted);
        }
        
        // Select event - fires for each selection
        function onSelect(e) {
            console.log("Selection action:", e.action);  // "select" or "unselect"
            console.log("Selected item:", e.itemData);
            console.log("Item element:", e.item);
        }
        
        // Before open event
        function beforeOpen(e) {
            console.log("Popup about to open");
            // Cancel if needed: e.cancel = true;
        }
    </script>
}
```

---

**Next Steps**: Explore template customization in `templates-and-customization.md` or properties configuration in `properties-and-configuration.md`.
