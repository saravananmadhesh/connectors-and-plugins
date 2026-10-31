# Troubleshooting

## Table of Contents
- [Common Issues](#common-issues)
- [Performance Problems](#performance-problems)
- [Data Binding Issues](#data-binding-issues)
- [UI/Styling Issues](#uistyling-issues)
- [Debugging Tips](#debugging-tips)

---

## Common Issues

### Issue 1: ComboBox Not Rendering

**Symptoms:** Component doesn't appear on page or shows as blank

**Causes & Solutions:**

```html
<!-- ❌ WRONG: Missing CSS -->
<head>
    <title>Page</title>
    <!-- No Syncfusion CSS -->
</head>

<!-- ✅ CORRECT: Include CSS -->
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-base/styles/tailwind3.css">
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/ej2-dropdowns/styles/tailwind3.css">
</head>
```

**Checklist:**
- [ ] Syncfusion CSS files imported in `_Layout.cshtml`
- [ ] TagHelper registered in `_ViewImports.cshtml`:
  ```xml
  @addTagHelper *, Syncfusion.EJ2
  ```
- [ ] Component has `id` attribute
- [ ] `dataSource` property provided
- [ ] Scripts section includes Syncfusion libraries
- [ ] No JavaScript errors in browser console

---

### Issue 2: Data Not Showing in Dropdown

**Symptoms:** Dropdown appears but list is empty

**Causes & Solutions:**

**Controller (❌ WRONG):**
```csharp
public class Employee
{
    public int EmployeeId { get; set; }
    public string EmployeeName { get; set; }
}

public ActionResult Index()
{
    List<Employee> employees = new List<Employee>
    {
        new Employee { EmployeeId = 1, EmployeeName = "Alice" }
    };
    ViewBag.Employees = employees;
    return View();
}
```

**View (❌ WRONG - Missing field mapping):**
```html
<ejs-combobox id="emp-combo"
    dataSource="ViewBag.Employees"
    placeholder="Select employee">
</ejs-combobox>
```

**View (✅ CORRECT - Provide field mapping):**
```html
<ejs-combobox id="emp-combo"
    dataSource="ViewBag.Employees"
    placeholder="Select employee">
    <e-combobox-fields text="EmployeeName" value="EmployeeId"></e-combobox-fields>
</ejs-combobox>
```

**Debugging:**

Add console logging in your controller:
```csharp
public ActionResult Index()
{
    List<Employee> employees = new List<Employee>
    {
        new Employee { EmployeeId = 1, EmployeeName = "Alice" }
    };
    
    System.Diagnostics.Debug.WriteLine("Employees count: " + employees.Count);
    foreach (var emp in employees)
    {
        System.Diagnostics.Debug.WriteLine($"ID: {emp.EmployeeId}, Name: {emp.EmployeeName}");
    }
    
    ViewBag.Employees = employees;
    return View();
}
```

---

### Issue 3: Dropdown Closes Immediately After Opening

**Symptoms:** Popup opens and closes instantly without user action

**Causes:**
- Conflicting event handlers
- Parent container has click-away handler
- Z-index issue hiding popup

**Solution:**

```html
<!-- ❌ WRONG: Parent has click handler that closes popup -->
<div onclick="closePopup()">
    <ejs-combobox id="combo"
        dataSource="ViewBag.Items">
    </ejs-combobox>
</div>

<!-- ✅ CORRECT: Remove conflicting handlers -->
<div>
    <ejs-combobox id="combo"
        dataSource="ViewBag.Items">
    </ejs-combobox>
</div>
```

**CSS fix for z-index:**
```css
.e-dropdown-popup {
    z-index: 10000 !important;
}
```

---

## Performance Problems

### Issue: Slow Rendering with Large Datasets

**Symptoms:** ComboBox takes long time to load or becomes unresponsive with 5000+ items

**Solution 1: Enable Virtualization**

```html
<ejs-combobox id="large-combo"
    dataSource="ViewBag.LargeDataset"
    enableVirtualization="true"
    popupHeight="300px">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```

**Solution 2: Implement Remote Data with Pagination**

**Controller:**
```csharp
[HttpPost]
public JsonResult GetData(int skip = 0, int take = 20, string search = "")
{
    // Simulate large dataset
    List<ComboBoxData> allData = GetAllData(); // Load from database
    
    var filtered = allData
        .Where(x => string.IsNullOrEmpty(search) || x.Name.Contains(search))
        .Skip(skip)
        .Take(take)
        .ToList();
    
    return Json(new { 
        data = filtered,
        total = allData.Count 
    });
}
```

**View:**
```html
<ejs-combobox id="combo"
    allowFiltering="true"
    enableVirtualization="true"
    popupHeight="300px"
    placeholder="Search...">
</ejs-combobox>

<script>
var dataManager = new ej.data.DataManager({
    url: '/Home/GetData',
    adaptor: new ej.data.UrlAdaptor(),
    pageSize: 20
});

document.getElementById('combo').ej2_instances[0].dataSource = dataManager;
</script>
```

---

## Data Binding Issues

### Issue: Data Not Updating After Change

**Symptoms:** ComboBox shows old data even after controller returns new data

**Solution:**

**Controller:**
```csharp
[HttpPost]
public JsonResult LoadData(string category)
{
    List<ComboBoxData> items = GetDataByCategory(category);
    return Json(items);
}
```

**View:**
```html
<ejs-combobox id="category-combo"
    dataSource="ViewBag.Categories"
    change="onCategoryChange">
</ejs-combobox>

<ejs-combobox id="item-combo"
    placeholder="Select item">
</ejs-combobox>

<script>
function onCategoryChange(args) {
    if (args.value) {
        var itemCombo = document.getElementById('item-combo').ej2_instances[0];
        
        // Fetch new data
        fetch('/Home/LoadData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category: args.value })
        })
        .then(response => response.json())
        .then(data => {
            itemCombo.dataSource = data;
            itemCombo.refresh(); // Force refresh
        });
    }
}
</script>
```

---

## UI/Styling Issues

### Issue: Popup Not Visible

**Symptoms:** Dropdown opens but popup not visible on screen

**Causes & Solutions:**

**Problem: Z-index too low**
```css
/* Add to custom CSS */
.e-dropdown-popup {
    z-index: 10000 !important;
}
```

**Problem: Parent has overflow: hidden**
```css
.combo-container {
    overflow: visible !important;
    position: relative;
}
```

### Issue: Text Overflow in Items

**Solution:**

```html
<ejs-combobox id="combo"
    dataSource="ViewBag.Items"
    itemTemplate="#itemTemplate">
</ejs-combobox>

<script id="itemTemplate" type="text/x-template">
    <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${Name}
    </div>
</script>
```

---

## Debugging Tips

### Enable Browser Developer Tools Console

**Add logging in View:**
```html
<script>
var combo = document.getElementById('combo').ej2_instances[0];
console.log('ComboBox instance:', combo);
console.log('DataSource:', combo.dataSource);
console.log('Selected Value:', combo.value);
console.log('Selected Text:', combo.text);
</script>
```

### Check Network Requests

1. Open browser DevTools (F12)
2. Go to Network tab
3. Open ComboBox dropdown
4. Look for data requests
5. Check Response status (200 = OK, 404 = Not found)

### Verify TagHelper Registration

**_ViewImports.cshtml:**
```xml
@addTagHelper *, Syncfusion.EJ2
```

### Check Syncfusion License

If you see warnings about evaluation mode, ensure license key is configured:

**Program.cs or Startup.cs:**
```csharp
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
```

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "Cannot read property 'ej2_instances'" | Syncfusion JS not loaded | Include `ej2.all.min.js` in _Layout.cshtml |
| "Object doesn't support property" | TagHelper not registered | Add `@addTagHelper *, Syncfusion.EJ2` to _ViewImports.cshtml |
| "dataSource is empty" | No data in ViewBag | Check controller is populating ViewBag correctly |
