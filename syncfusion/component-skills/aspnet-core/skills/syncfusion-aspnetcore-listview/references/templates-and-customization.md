# Templates and Customization

## Table of Contents
- [Template Types](#template-types)
- [Item Template](#item-template)
- [Header Template](#header-template)
- [Group Template](#group-template)
- [Built-in CSS Classes](#built-in-css-classes)
- [Avatar and Multi-Line Lists](#avatar-and-multi-line-lists)
- [Custom Markup Patterns](#custom-markup-patterns)
- [Template Syntax](#template-syntax)

## Template Types

ListView supports three customizable templates:

| Template | Property | Purpose |
|----------|----------|---------|
| Item Template | `template` | Customize individual list items |
| Header Template | `headerTemplate` | Customize list header area |
| Group Template | `groupTemplate` | Customize group headers |

## Item Template

The `template` property customizes how each list item renders.

### Basic Item Template

```csharp
public class Contact
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

var contacts = new List<Contact>()
{
    new Contact { Id = 1, Name = "Nancy", Email = "nancy@company.com" },
    new Contact { Id = 2, Name = "Andrew", Email = "andrew@company.com" }
};
```

```cshtml
<ejs-listview id="contacts" dataSource="@ViewBag.Contacts"
    template="<div class='e-list-wrapper'><span class='e-list-content'>${Name}</span><p>${Email}</p></div>">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Template with Multiple Data Fields

```cshtml
<ejs-listview id="employees" dataSource="@ViewBag.Employees"
    template="<div class='e-list-wrapper e-list-multi-line'><span class='e-list-item-header'>${FirstName} ${LastName}</span><span class='e-list-content'>${Title}</span><p class='e-list-item-meta'>${EmailAddress}</p></div>">
    <e-listview-fieldsettings id="EmployeeId" text="FirstName"></e-listview-fieldsettings>
</ejs-listview>
```

### Template with Inline Styles

```cshtml
<ejs-listview id="tasks" dataSource="@ViewBag.Tasks" cssClass="e-list-template"
    template="<div class='e-list-wrapper' style='padding: 10px; border-bottom: 1px solid #ddd;'><span style='font-weight: bold; color: #333;'>${TaskName}</span><p style='color: #666; margin: 5px 0;'>Due: ${DueDate}</p></div>">
    <e-listview-fieldsettings id="TaskId" text="TaskName"></e-listview-fieldsettings>
</ejs-listview>
```

## Header Template

The `headerTemplate` property customizes the list header area:

### Simple Header Template

```cshtml
<ejs-listview id="list" dataSource="@ViewBag.Data" showHeader="true"
    headerTemplate="<div class='e-header-custom' style='padding: 10px; background-color: #f5f5f5;'><h3>My Custom Header</h3></div>">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Header with Search/Action Buttons

```cshtml
<ejs-listview id="products" dataSource="@ViewBag.Products" showHeader="true"
    headerTemplate="<div class='e-header-custom' style='display: flex; justify-content: space-between; align-items: center; padding: 10px; background-color: #2196f3; color: white;'><span style='font-size: 18px; font-weight: bold;'>Product List</span><div><input type='text' placeholder='Search...' id='search' style='padding: 5px; margin-right: 10px;'/><button class='e-btn e-btn-primary'>Add</button></div></div>">
    <e-listview-fieldsettings id="ProductId" text="ProductName"></e-listview-fieldsettings>
</ejs-listview>
```

## Group Template

The `groupTemplate` property customizes group headers:

### Group Template with Count

```cshtml
<ejs-listview id="products" dataSource="@ViewBag.Products"
    groupTemplate="<div class='e-list-group-item' style='background-color: #f0f0f0; padding: 10px; font-weight: bold;'>${key} <span class='e-badge e-badge-primary'>${items.length}</span></div>">
    <e-listview-fieldsettings 
        id="ProductId" 
        text="ProductName" 
        groupBy="Category">
    </e-listview-fieldsettings>
</ejs-listview>
```

### Group Template with Styling

```cshtml
<ejs-listview id="cars" dataSource="@ViewBag.Cars"
    groupTemplate="<div class='e-list-group-item' style='display: flex; align-items: center; padding: 15px; background: linear-gradient(to right, #667eea, #764ba2); color: white; font-weight: bold;'><span style='font-size: 20px; margin-right: 10px;'>🚗</span><span>${key}</span><span style='margin-left: auto; background-color: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px;'>${items.length}</span></div>">
    <e-listview-fieldsettings 
        id="CarId" 
        text="Model" 
        groupBy="Brand">
    </e-listview-fieldsettings>
</ejs-listview>
```

## Built-in CSS Classes

Syncfusion provides CSS classes for common list patterns:

### Core Classes

| Class | Purpose |
|-------|---------|
| `e-list-template` | Root class for custom templates |
| `e-list-wrapper` | Item wrapper container |
| `e-list-content` | Item text content |
| `e-list-item-header` | Multi-line header text |
| `e-list-item-meta` | Meta/secondary text |

### Layout Classes

| Class | Purpose |
|-------|---------|
| `e-list-avatar` | For avatar layouts (left-aligned) |
| `e-list-avatar-right` | Avatar on right side |
| `e-list-badge` | For badge/notification layouts |
| `e-list-multi-line` | Multi-line item display |

### Avatar Classes

| Class | Usage |
|-------|-------|
| `e-avatar` | Base avatar class |
| `e-avatar-circle` | Circular avatar |
| `e-avatar-small` | Small avatar |
| `e-avatar-xlarge` | Extra-large avatar |

### Badge Classes

| Class | Color |
|-------|-------|
| `e-badge-primary` | Blue |
| `e-badge-success` | Green |
| `e-badge-danger` | Red |
| `e-badge-warning` | Orange |
| `e-badge-info` | Light blue |

## Avatar and Multi-Line Lists

### Simple Avatar List

```cshtml
<ejs-listview id="contacts" dataSource="@ViewBag.Contacts" cssClass="e-list-template"
    template="<div class='e-list-wrapper e-list-avatar'><img class='e-avatar e-avatar-circle' src='${Avatar}' alt='${Name}' style='width: 40px; height: 40px; object-fit: cover;' /><span class='e-list-content'>${Name}</span></div>">
    <e-listview-fieldsettings id="ContactId" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Avatar with Right Alignment

```cshtml
<ejs-listview id="notifications" dataSource="@ViewBag.Notifications" cssClass="e-list-template"
    template="<div class='e-list-wrapper e-list-avatar-right'><span class='e-list-content'>${Title}</span><img class='e-avatar e-avatar-circle' src='${UserImage}' style='width: 40px; height: 40px; object-fit: cover;' /></div>">
    <e-listview-fieldsettings id="NotificationId" text="Title"></e-listview-fieldsettings>
</ejs-listview>
```

### Multi-Line Item Template

```cshtml
<ejs-listview id="employees" dataSource="@ViewBag.Employees" cssClass="e-list-template"
    template="<div class='e-list-wrapper e-list-multi-line e-list-avatar'><img class='e-avatar e-avatar-circle' src='${EmployeeImage}' style='width: 50px; height: 50px; object-fit: cover;' /><span class='e-list-item-header'>${FirstName} ${LastName}</span><span class='e-list-content'>${Title}</span><p class='e-list-item-meta'>${EmployeeID}</p></div>">
    <e-listview-fieldsettings id="EmployeeId" text="FirstName"></e-listview-fieldsettings>
</ejs-listview>
```

### Badge with Avatar

```cshtml
<ejs-listview id="messages" dataSource="@ViewBag.Messages" cssClass="e-list-template"
    template="<div class='e-list-wrapper e-list-avatar e-list-badge'><img class='e-avatar e-avatar-circle' src='${SenderAvatar}' /><span class='e-list-content'>${Subject}</span><span class='e-badge e-badge-primary'>${UnreadCount}</span></div>">
    <e-listview-fieldsettings id="MessageId" text="Subject"></e-listview-fieldsettings>
</ejs-listview>
```

## Custom Markup Patterns

### Pattern 1: Card-Style Items

```cshtml
<ejs-listview id="products" dataSource="@ViewBag.Products" cssClass="e-list-template"
    template="<div class='e-list-wrapper' style='display: flex; gap: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 8px; margin: 10px 0;'><img src='${ProductImage}' style='width: 80px; height: 80px; object-fit: cover; border-radius: 4px;' /><div style='flex: 1;'><h4 style='margin: 0; color: #333;'>${ProductName}</h4><p style='margin: 5px 0; color: #666;'>${Description}</p><span style='font-weight: bold; color: #2196f3;'>\$${Price}</span></div></div>">
    <e-listview-fieldsettings id="ProductId" text="ProductName"></e-listview-fieldsettings>
</ejs-listview>
```

### Pattern 2: Timeline-Style Items

```cshtml
<ejs-listview id="timeline" dataSource="@ViewBag.Events" cssClass="e-list-template"
    template="<div class='e-list-wrapper' style='display: flex; gap: 15px; padding: 10px 0;'><div style='position: relative; width: 30px;'><div style='width: 30px; height: 30px; background-color: #2196f3; border-radius: 50%; position: absolute;'></div><div style='width: 2px; height: 50px; background-color: #ddd; position: absolute; left: 14px; top: 30px;'></div></div><div style='flex: 1;'><h4 style='margin: 0;'>${Title}</h4><p style='margin: 5px 0; color: #666;'>${Description}</p><small style='color: #999;'>${Date}</small></div></div>">
    <e-listview-fieldsettings id="EventId" text="Title"></e-listview-fieldsettings>
</ejs-listview>
```

### Pattern 3: Checkbox with Rich Content

```cshtml
<ejs-listview id="tasks" dataSource="@ViewBag.Tasks" showCheckBox="true" cssClass="e-list-template"
    template="<div class='e-list-wrapper'><span class='e-list-content' style='text-decoration: ${IsCompleted ? 'line-through' : 'none'}; color: ${IsCompleted ? '#999' : '#333'};'><strong>${TaskName}</strong><p style='margin: 5px 0; font-size: 12px; color: #666;'>${Description}</p><span style='font-size: 12px; color: #999;'>Priority: ${Priority}</span></span></div>">
    <e-listview-fieldsettings id="TaskId" text="TaskName" isChecked="IsCompleted"></e-listview-fieldsettings>
</ejs-listview>
```

## Template Syntax

### Data Binding Syntax

```
${propertyName}         <!-- Simple property access -->
${object.property}      <!-- Nested property -->
${propertyName || 'Default'}  <!-- Fallback value -->
${items.length}         <!-- Array length in group templates -->
${key}                  <!-- Group key -->
```

### Conditional Expressions

```
${condition ? trueValue : falseValue}
${IsActive ? 'Active' : 'Inactive'}
${Price > 100 ? 'Premium' : 'Standard'}
```

### String Interpolation

```html
<span>Name: ${FirstName} ${LastName}</span>
<p>Email: ${Email}</p>
<p>Price: $${Price.toFixed(2)}</p>
```

### Array Operations

```
${items.length}         <!-- Item count in group -->
${items[0].property}    <!-- First item property -->
```

### Conditional HTML Rendering

```html
${Status === 'Urgent' ? '<span class="e-badge e-badge-danger">Urgent</span>' : ''}
```

## Avoid Common Template Issues

### Issue 1: Property Name Mismatch

```csharp
// Data has "FirstName" but template looks for "firstname"
// ❌ WRONG
${firstname}

// ✅ CORRECT
${FirstName}
```

### Issue 2: Complex Expressions in Templates

```html
<!-- ❌ Avoid complex logic -->
${if (price > 100) { /* complex code */ }}

<!-- ✅ Use simple ternary -->
${price > 100 ? 'Premium' : 'Standard'}
```

### Issue 3: Missing CSS Classes

```html
<!-- ❌ Missing e-list-wrapper -->
<div>
    <span class="e-list-content">Item</span>
</div>

<!-- ✅ Include required wrapper -->
<div class="e-list-wrapper">
    <span class="e-list-content">Item</span>
</div>
```

---

**Related Topics:**
- [Field Settings & Configuration](field-settings-and-configuration.md)
- [Grouping, Nested Lists & Virtualization](grouping-nested-lists-virtualization.md)
- [Styling & Appearance](styling-appearance-properties.md)
