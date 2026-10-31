# Icons, Templates and Customization — ListBox

## Table of Contents
- [Adding Icons](#adding-icons)
- [Item Templates](#item-templates)
- [No Records Template](#no-records-template)
- [Custom Styling](#custom-styling)

---

## Adding Icons

### Icon Font Classes

```cshtml
<ejs-listbox id="listbox"
    dataSource="@ViewBag.items"
    height="300px">
    <e-listbox-fields text="Name" value="Id" iconCss="Icon"></e-listbox-fields>
</ejs-listbox>
```

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.items = new List<object>
    {
        new { Id = 1, Name = "Edit", Icon = "e-icons e-edit" },
        new { Id = 2, Name = "Delete", Icon = "e-icons e-delete" },
        new { Id = 3, Name = "Save", Icon = "e-icons e-save" },
        new { Id = 4, Name = "Download", Icon = "e-icons e-download" }
    };
    return View();
}
```

**Icon Classes:**
- `e-edit` - Edit icon
- `e-delete` - Trash/delete icon
- `e-save` - Floppy disk/save icon
- `e-download` - Download arrow
- `e-upload` - Upload arrow
- `e-search` - Magnifying glass
- `e-user` - User icon
- `e-settings` - Gear/settings

### Custom Icon URLs

```cshtml
<ejs-listbox id="listbox"
    dataSource="@ViewBag.items"
    itemTemplate="@Html.Raw("<div><img src='${Icon}' /><span>${Name}</span></div>")"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

**Controller:**

```csharp
ViewBag.items = new List<object>
{
    new { Id = 1, Name = "JavaScript", Icon = "/images/js-icon.png" },
    new { Id = 2, Name = "React", Icon = "/images/react-icon.png" },
    new { Id = 3, Name = "Angular", Icon = "/images/angular-icon.png" }
};
```

---

## Item Templates

### Simple Item Template

```cshtml
<ejs-listbox id="listbox"
    dataSource="@ViewBag.items"
    itemTemplate="@Html.Raw("<div><strong>${Name}</strong><br/><small>${Description}</small></div>")"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>
```

**Controller:**

```csharp
public class ListItem
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
}

ViewBag.items = new List<ListItem>
{
    new ListItem { Id = 1, Name = "C#", Description = "Object-oriented language" },
    new ListItem { Id = 2, Name = "JavaScript", Description = "Web scripting language" }
};
```

### Rich Item Template with Images and Badges

```cshtml
<ejs-listbox id="listbox"
    dataSource="@ViewBag.employees"
    itemTemplate="@Html.Raw(
    @"<div class='item-template'>
        <img src='${Photo}' alt='${Name}' class='emp-photo'/>
        <div class='emp-details'>
            <div class='emp-name'>${Name}</div>
            <div class='emp-title'>${Title}</div>
            <span class='emp-badge'>${Department}</span>
        </div>
    </div>")"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<style>
.item-template {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.emp-photo {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
    object-fit: cover;
}

.emp-details {
    flex: 1;
}

.emp-name {
    font-weight: 600;
    color: #333;
}

.emp-title {
    font-size: 12px;
    color: #666;
}

.emp-badge {
    display: inline-block;
    background: #e8f4f8;
    color: #0066cc;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 11px;
    margin-top: 4px;
}
</style>
```

### Conditional Templates

```cshtml
<ejs-listbox id="listbox"
    dataSource="@ViewBag.items"
    itemTemplate="getItemTemplate"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<script>
function getItemTemplate(data) {
    if (data.Status === 'Active') {
        return `<div><strong>${data.Name}</strong> <span class="badge badge-success">Active</span></div>`;
    } else {
        return `<div><strong>${data.Name}</strong> <span class="badge badge-danger">Inactive</span></div>`;
    }
}
</script>
```

---

## No Records Template

### Custom Message When Empty

```cshtml
<ejs-listbox id="listbox"
    dataSource="@ViewBag.items"
    noRecordsTemplate="@Html.Raw("<div class='no-records'><p>No items found</p></div>")"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<style>
.no-records {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px;
    color: #999;
    font-size: 16px;
}
</style>
```

### With Icon

```cshtml
<ejs-listbox id="listbox"
    dataSource="@ViewBag.items"
    noRecordsTemplate="@Html.Raw(
    @"<div class='no-records'>
        <i class='e-icons e-search'></i>
        <p>No matching items found</p>
        <small>Try adjusting your search filters</small>
    </div>")"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<style>
.no-records {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 300px;
    color: #999;
    padding: 20px;
    text-align: center;
}

.no-records i {
    font-size: 48px;
    opacity: 0.5;
    margin-bottom: 10px;
}

.no-records p {
    margin: 10px 0;
    font-size: 16px;
}

.no-records small {
    font-size: 12px;
    color: #bbb;
}
</style>
```

---

## Custom Styling

### Style Selected Items

```css
/* Default selected item style */
.e-listbox .e-list-item.e-active {
    background: #0066cc;
    color: white;
}

/* Hover state */
.e-listbox .e-list-item:hover {
    background: #f5f5f5;
    cursor: pointer;
}

/* Focus state */
.e-listbox .e-list-item:focus {
    outline: 2px solid #0066cc;
    outline-offset: -2px;
}
```

### Disabled Item Styling

```css
.e-listbox .e-list-item.e-disabled {
    background: #f9f9f9;
    color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
}
```

### Alternating Row Colors

```javascript
let listbox = document.getElementById('listbox').ej2_instances[0];

document.querySelectorAll('.e-list-item').forEach((item, index) => {
    if (index % 2 === 0) {
        item.style.backgroundColor = '#fafafa';
    }
});
```
