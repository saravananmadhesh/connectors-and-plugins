---
name: templates-and-customization-dropdown-tree
---

# Templates and Customization in Syncfusion DropDownTree

## Table of Contents

- [Overview](#overview)
- [Item Template](#item-template)
- [Value Template](#value-template)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [No Records Template](#no-records-template)
- [Action Failure Template](#action-failure-template)
- [Custom Mode Templates](#custom-mode-templates)
- [Template Syntax and Expressions](#template-syntax-and-expressions)
- [CSS Customization](#css-customization)
- [Advanced Customization](#advanced-customization)

## Overview

The Syncfusion DropDownTree component provides extensive template support for customizing every aspect of the component's display and functionality. Templates allow you to replace default rendering with custom HTML structures, enabling rich visual customization and advanced data presentation capabilities.

The component supports templates at multiple levels:
- **Item Template**: Customizes each list item appearance
- **Value Template**: Customizes the selected value display
- **Header Template**: Customizes popup header
- **Footer Template**: Customizes popup footer
- **No Records Template**: Customizes empty state message
- **Action Failure Template**: Customizes error state display
- **Custom Mode Template**: Customizes multi-selection display

Each template type serves a specific purpose and can be defined using HTML strings or JavaScript functions, providing maximum flexibility for component customization.

## Item Template

The item template controls the appearance of each item in the dropdown list. This is the most commonly customized template for creating rich, complex item displays.

### Basic Item Template

```html
<ejs-dropdowntree id="itemTemplateTree"
    itemTemplate="<span class='item-content'>${Text}</span>">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### Item Template with Icons

```csharp
public class FileItem
{
    public string FileId { get; set; }
    public string FileName { get; set; }
    public string FileType { get; set; }  // folder, file, image
    public string IconClass { get; set; }
    public List<FileItem> Children { get; set; }
}
```

```html
@{
    var itemIconTemplate = "<div class='file-item'><i class='${IconClass}'></i><span class='file-name'>${FileName}</span><span class='file-type'>(${FileType})</span></div>";
}

<ejs-dropdowntree id="fileTreeWithIcons" itemTemplate="@itemIconTemplate">
    <e-dropdowntree-fields dataSource="@Model.FileSystem" text="FileName" value="FileId" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .file-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px;
    }
    
    .file-item i {
        font-size: 16px;
    }
    
    .file-name {
        font-weight: 500;
    }
    
    .file-type {
        color: #999;
        font-size: 0.9em;
    }
</style>
```

### Item Template with Complex Formatting

**Employee Hierarchy Example:**

```csharp
public class Employee
{
    public string EmployeeId { get; set; }
    public string EmployeeName { get; set; }
    public string Department { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public List<Employee> ReportsTo { get; set; }
}
```

```html
@{
    var employeeItemTemplate = "<div class='employee-item'><div class='name'>${EmployeeName}</div><div class='details'><span class='dept'>${Department}</span><span class='contact'>${Email}</span></div></div>";
}

<ejs-dropdowntree id="employeeTree" itemTemplate="@employeeItemTemplate">
    <e-dropdowntree-fields dataSource="@Model.Employees" text="EmployeeName" value="EmployeeId" child="ReportsTo"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .employee-item {
        padding: 8px;
        border-bottom: 1px solid #eee;
    }
    
    .employee-item .name {
        font-weight: 600;
        color: #333;
    }
    
    .employee-item .details {
        display: flex;
        gap: 12px;
        margin-top: 4px;
        font-size: 0.85em;
        color: #666;
    }
</style>
```

### Item Template with Conditional Styling

```html
<ejs-dropdowntree id="conditionalItemTemplate"
    itemTemplate="<div class='category-item' data-type='${CategoryType}'>
                    <span class='category-icon'>${CategoryIcon}</span>
                    <span class='category-name'>${CategoryName}</span>
                    <span class='category-count' ng-if='${ItemCount}'>
                        (${ItemCount})
                    </span>
                  </div>">
    <e-dropdowntree-fields dataSource="@Model.Categories" text="CategoryName" value="CategoryId" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .category-item[data-type='premium'] {
        background-color: #e8f4f8;
        border-left: 3px solid #0099cc;
    }
    
    .category-item[data-type='restricted'] {
        opacity: 0.6;
        color: #999;
    }
    
    .category-icon {
        margin-right: 8px;
        font-size: 1.1em;
    }
</style>
```

## Value Template

The value template customizes how the selected value(s) are displayed in the input element when the dropdown is closed.

### Basic Value Template

```html
<ejs-dropdowntree id="valueTemplateTree"
    valueTemplate="<div>Selected: <strong>${Text}</strong></div>">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

### Value Template with Multi-Selection

**For displaying multiple selected items:**

```html
<ejs-dropdowntree id="multiValueTemplate"
    showCheckBox="true"
    valueTemplate="<div>
                    <span class='selected-count'>${value.length} items selected</span>
                  </div>">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .selected-count {
        background-color: #f0f0f0;
        padding: 2px 8px;
        border-radius: 3px;
        font-size: 0.9em;
    }
</style>
```

### Value Template with Icons

```html
<ejs-dropdowntree id="valueIconTemplate"
    valueTemplate="<div class='selected-value'>
                    <i class='${IconClass}'></i>
                    <span>${Text}</span>
                  </div>">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .selected-value {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 8px;
    }
</style>
```

## Header Template

The header template adds a customized header section at the top of the popup list. This is useful for adding search instructions, filters, or action buttons.

### Basic Header Template

```html
@{
    var headerTemplate = "<div class='header'><h5>Select an item</h5><p class='help-text'>Click to expand folders</p></div>";
}

<ejs-dropdowntree id="headerTemplateTree" headerTemplate="@headerTemplate">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .header {
        padding: 12px;
        border-bottom: 1px solid #eee;
        background-color: #f9f9f9;
    }
    
    .header h5 {
        margin: 0 0 4px 0;
        font-size: 14px;
    }
    
    .help-text {
        margin: 0;
        font-size: 12px;
        color: #666;
    }
</style>
```

### Header Template with Select All

```html
@{
    var headerSelectAllTemplate = "<div class='header-select-all'><input type='checkbox' id='selectAll' class='select-all-check'><label for='selectAll'>Select All</label></div>";
}

<ejs-dropdowntree id="headerSelectAll" showCheckBox="true" headerTemplate="@headerSelectAllTemplate">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        var treeObj = document.getElementById("headerSelectAll").ej2_instances[0];
        var selectAllCheckbox = document.querySelector(".select-all-check");
        
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener("change", function() {
                if (this.checked) {
                    // Get all values and set
                    var allValues = getAllTreeNodeIds(treeObj);
                    treeObj.value = allValues;
                } else {
                    treeObj.value = [];
                }
            });
        }
        
        function getAllTreeNodeIds(tree) {
            // Implementation to get all node IDs
            return [];
        }
    </script>
}
```

## Footer Template

The footer template adds a customized footer section at the bottom of the popup list. Use this for action buttons or summary information.

### Basic Footer Template

```html
@{
    var footerTemplate = "<div class='footer'><button class='btn-clear'>Clear Selection</button><button class='btn-apply'>Apply</button></div>";
}

<ejs-dropdowntree id="footerTemplateTree" footerTemplate="@footerTemplate">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        var treeObj = document.getElementById("footerTemplateTree").ej2_instances[0];
        var content = document.querySelector(".e-content");
        
        if (content) {
            document.querySelector(".btn-clear").addEventListener("click", function() {
                treeObj.value = [];
            });
            
            document.querySelector(".btn-apply").addEventListener("click", function() {
                // Process selection
                console.log("Selected values:", treeObj.value);
            });
        }
    </script>
}
```

### Footer Template with Statistics

```html
<ejs-dropdowntree id="footerStats"
    showCheckBox="true"
    footerTemplate="<div class='footer-stats'>
                    <span class='selected-count'>Selected: <strong>${value.length}</strong></span>
                    <span class='total-count'>Total: <strong>${totalCount}</strong></span>
                  </div>">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .footer-stats {
        padding: 12px;
        border-top: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        background-color: #f9f9f9;
        font-size: 13px;
    }
</style>
```

## No Records Template

The no records template is displayed when no items match the filter criteria or when the data source is empty.

### Basic No Records Template

```html
<ejs-dropdowntree id="noRecordsTree"
    noRecordsTemplate="<div class='no-records'>
                        <i class='icon-empty'></i>
                        <p>No items found</p>
                      </div>"
    allowFiltering="true">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .no-records {
        text-align: center;
        padding: 20px;
        color: #999;
    }
    
    .no-records i {
        font-size: 32px;
        margin-bottom: 8px;
    }
</style>
```

### Detailed No Records Template

```html
<ejs-dropdowntree id="emptyStateTree"
    noRecordsTemplate="<div class='empty-state'>
                        <div class='empty-illustration'>
                            <svg><!-- Icon SVG --></svg>
                        </div>
                        <h5>No Results Found</h5>
                        <p>Try searching with different keywords</p>
                      </div>"
    allowFiltering="true">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .empty-state {
        text-align: center;
        padding: 40px 20px;
    }
    
    .empty-illustration {
        margin-bottom: 16px;
    }
    
    .empty-state h5 {
        margin: 12px 0 8px 0;
        color: #333;
    }
    
    .empty-state p {
        color: #999;
        font-size: 13px;
    }
</style>
```

## Action Failure Template

The action failure template is displayed when a remote data fetch operation fails.

### Basic Action Failure Template

```html
<ejs-dropdowntree id="failureTree" actionFailureTemplate="<div class='action-failure'>
                            <i class='icon-error'></i>
                            <p>Failed to load items</p>
                            <button class='btn-retry'>Retry</button>
                          </div>">
    <e-dropdowntree-fields dataSource="@remoteDataManager" text="Name" value="Id"></e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        var treeObj = document.getElementById("failureTree").ej2_instances[0];
        
        // Retry button functionality
        document.addEventListener("click", function(e) {
            if (e.target.classList.contains("btn-retry")) {
                treeObj.refresh();
            }
        });
    </script>
}
```

### Detailed Error Information

```html
<ejs-dropdowntree id="detailedErrorTree"
    actionFailureTemplate="<div class='error-details'>
                            <h6>Data Load Error</h6>
                            <p>${errorMessage}</p>
                            <small>${errorCode}</small>
                          </div>" actionFailure="actionFailure">
    <e-dropdowntree-fields dataSource="@Model.RemoteData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        var treeObj = document.getElementById("detailedErrorTree").ej2_instances[0];
        
        function actionFailure(args) {
            console.error("Action failed:", args);
            // Update error template with specific error details
        }
    </script>
}
```

## Custom Mode Templates

When using custom display mode for multi-selection, you can provide custom templates to show selected items in any format.

### Custom Mode Implementation

```html
<ejs-dropdowntree id="customModeTree"
    showCheckBox="true"
    mode="Custom"
    customTemplate="<span class='custom-display'>
                    <strong>${value.length}</strong> item(s) selected
                    </span>">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .custom-display {
        background-color: #e3f2fd;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 13px;
    }
</style>
```

### Advanced Custom Mode with Icons

```html
<ejs-dropdowntree id="advancedCustomMode"
    showCheckBox="true"
    mode="Custom"
    customTemplate="<div class='selected-summary'>
                    <i class='icon-items'></i>
                    <span>${value.length} items selected</span>
                    <button class='btn-view'>View</button>
                    </div>">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .selected-summary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 8px;
        background-color: #f5f5f5;
        border-radius: 4px;
    }
    
    .btn-view {
        padding: 2px 6px;
        font-size: 12px;
        cursor: pointer;
    }
</style>
```

## Template Syntax and Expressions

### Interpolation Syntax

The Syncfusion template engine uses `${propertyName}` syntax for data binding:

```html
<!-- Simple property interpolation -->
<span>${Name}</span>

<!-- Nested property access -->
<span>${Department.Name}</span>

<!-- Conditional display (if property exists and truthy) -->
<span ng-if='${HasChildren}'>Has child items</span>

<!-- Math expressions -->
<span>${Salary * 1.1}</span>

<!-- String methods -->
<span>${Name.toUpperCase()}</span>
```

### Event Binding in Templates

```html
<ejs-dropdowntree id="eventBindingTree"
    itemTemplate="<div onclick='handleItemClick(${Id})'>
                    <span>${Name}</span>
                  </div>">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Name" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

@section Scripts {
    <script>
        function handleItemClick(itemId) {
            console.log("Item clicked:", itemId);
        }
    </script>
}
```

### Ternary Operators in Templates

```html
<ejs-dropdowntree id="ternaryTemplate"
    itemTemplate="<div class='${Status == 'Active' ? 'active' : 'inactive'}'>
                    <span>${Name}</span>
                  </div>">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Name" value="Id" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>
```

## CSS Customization

### Styling via CSS Classes

```html
<ejs-dropdowntree id="styledTree"
    cssClass="custom-tree">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .custom-tree .e-input {
        border-color: #0099cc;
    }
    
    .custom-tree .e-popup {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    
    .custom-tree .e-list-item {
        padding: 12px;
        border-bottom: 1px solid #eee;
    }
    
    .custom-tree .e-list-item:hover {
        background-color: #f5f5f5;
    }
</style>
```

### Theme Integration

```html
<ejs-dropdowntree id="themedTree"
    cssClass="material-theme dark">
    <e-dropdowntree-fields dataSource="@Model.TreeData" text="Text" value="Value" child="Children"></e-dropdowntree-fields>
</ejs-dropdowntree>

<style>
    .material-theme.dark .e-input {
        background-color: #333;
        color: #fff;
        border-color: #555;
    }
    
    .material-theme.dark .e-popup {
        background-color: #424242;
        color: #fff;
    }
</style>
```

## Advanced Customization

### Template Functions

```html
@section Scripts {
    <script>
        function createItemTemplate(data) {
            var html = "<div class='item'>";
            html += "<span class='icon'>" + getIconForType(data.Type) + "</span>";
            html += "<span class='text'>" + data.Name + "</span>";
            if (data.Count > 0) {
                html += "<span class='badge'>" + data.Count + "</span>";
            }
            html += "</div>";
            return html;
        }
        
        function getIconForType(type) {
            var icons = {
                folder: "📁",
                file: "📄",
                image: "🖼️"
            };
            return icons[type] || "📋";
        }
        
        var treeObj = document.getElementById("customTree").ej2_instances[0];
        treeObj.itemTemplate = createItemTemplate;
    </script>
}
```

### Dynamic Template Updates

```html
@section Scripts {
    <script>
        var treeObj = document.getElementById("dynamicTree").ej2_instances[0];
        
        // Update template based on condition
        function updateTemplate(condition) {
            if (condition) {
                treeObj.itemTemplate = "<div class='updated-template'>${Name}</div>";
            } else {
                treeObj.itemTemplate = "<div>${Name}</div>";
            }
            treeObj.refresh();
        }
    </script>
}
```

---

**Next Steps**: Explore properties and configuration in `properties-and-configuration.md` or accessibility features in `accessibility-and-globalization.md`.
