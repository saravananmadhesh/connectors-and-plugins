# How-To Guide: Common ComboBox Scenarios

## Table of Contents
- [Autofill While Typing](#autofill-while-typing)
- [Cascading ComboBoxes](#cascading-comboboxes)
- [Display Icons in Items](#display-icons-in-items)

---

## Autofill While Typing

### Overview

The autofill feature automatically completes your input by matching typed characters against available options. As you type, the ComboBox suggests the first matching item. Perfect for quickly selecting from known values.

**When to use:**
- User knows approximate values but wants fast selection
- Reducing typing effort (e.g., "F" auto-fills to "Football")
- Guided data entry

### Basic Autofill

**Controller:**
```csharp
public ActionResult Index()
{
    List<string> sportsData = new List<string> 
    { 
        "Badminton", "Cricket", "Football", "Golf", "Tennis" 
    };
    ViewBag.SportsData = sportsData;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="sports-combo"
    dataSource="ViewBag.SportsData"
    autofill="true"
    placeholder="Type 'F' to auto-fill">
</ejs-combobox>
```

**User Interaction:**
1. User types "Fo"
2. Combo auto-completes to "Football"
3. User can press Enter to accept or continue typing
4. If no match, autofill does nothing

### Autofill with Objects

**Controller:**
```csharp
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; }
}

public ActionResult Index()
{
    List<Employee> employeeData = new List<Employee>
    {
        new Employee { Id = 1, Name = "Alice Johnson" },
        new Employee { Id = 2, Name = "Bob Smith" },
        new Employee { Id = 3, Name = "Carol Davis" }
    };
    ViewBag.EmployeeData = employeeData;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="emp-combo"
    dataSource="ViewBag.EmployeeData"
    autofill="true"
    placeholder="Type 'Al' to find Alice">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```

### Combining Autofill with Filtering

**View (Razor):**
```html
<ejs-combobox id="emp-combo"
    dataSource="ViewBag.EmployeeData"
    autofill="true"
    allowFiltering="true"
    placeholder="Search and auto-fill">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>
```

**Behavior:**
- Autofill suggests first matching item
- Filtering shows all matching items
- User can select from suggestions or type custom value

---

## Cascading ComboBoxes

### Overview

Cascading ComboBoxes create dependent dropdowns where selecting a value in one ComboBox filters options in another. Common use case: Country → State → City selection.

**When to use:**
- Hierarchical data (Country/State/City)
- Parent-child relationships
- Conditional selections
- Progressive refinement

### Basic Cascading Implementation

**Controller:**
```csharp
public class LocationData
{
    public int CountryId { get; set; }
    public string CountryName { get; set; }
}

public class StateData
{
    public int StateId { get; set; }
    public string StateName { get; set; }
    public int CountryId { get; set; }
}

public ActionResult Index()
{
    List<LocationData> countries = new List<LocationData>
    {
        new LocationData { CountryId = 1, CountryName = "USA" },
        new LocationData { CountryId = 2, CountryName = "Canada" },
        new LocationData { CountryId = 3, CountryName = "Mexico" }
    };
    
    List<StateData> states = new List<StateData>
    {
        new StateData { StateId = 1, StateName = "California", CountryId = 1 },
        new StateData { StateId = 2, StateName = "Texas", CountryId = 1 },
        new StateData { StateId = 3, StateName = "Ontario", CountryId = 2 },
        new StateData { StateId = 4, StateName = "Quebec", CountryId = 2 }
    };
    
    ViewBag.Countries = countries;
    ViewBag.States = states;
    return View();
}

// AJAX endpoint to get states by country
[HttpPost]
public JsonResult GetStates(int countryId)
{
    List<StateData> allStates = new List<StateData>
    {
        new StateData { StateId = 1, StateName = "California", CountryId = 1 },
        new StateData { StateId = 2, StateName = "Texas", CountryId = 1 },
        new StateData { StateId = 3, StateName = "Ontario", CountryId = 2 },
        new StateData { StateId = 4, StateName = "Quebec", CountryId = 2 }
    };
    
    var filteredStates = allStates.Where(s => s.CountryId == countryId).ToList();
    return Json(filteredStates);
}
```

**View (Razor):**
```html
<div class="form-group">
    <label>Country</label>
    <ejs-combobox id="country-combo"
        dataSource="ViewBag.Countries"
        placeholder="Select a country"
        change="onCountryChange">
        <e-combobox-fields text="CountryName" value="CountryId"></e-combobox-fields>
    </ejs-combobox>
</div>

<div class="form-group">
    <label>State</label>
    <ejs-combobox id="state-combo"
        dataSource="ViewBag.States"
        placeholder="Select a state"
        enabled="false">
        <e-combobox-fields text="StateName" value="StateId"></e-combobox-fields>
    </ejs-combobox>
</div>

<script>
function onCountryChange(args) {
    const stateCombo = document.getElementById('state-combo').ej2_instances[0];
    
    if (args.value) {
        // Fetch states for selected country
        fetch('/Home/GetStates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ countryId: args.value })
        })
        .then(response => response.json())
        .then(data => {
            stateCombo.dataSource = data;
            stateCombo.enabled = true;
            stateCombo.index = 0;
        });
    } else {
        stateCombo.dataSource = [];
        stateCombo.enabled = false;
    }
}
</script>
```

---

## Display Icons in Items

### Using Unicode Emoji

**View (Razor):**
```html
<ejs-combobox id="tech-combo"
    dataSource='new[] { 
        "⚙️ JavaScript", 
        "📘 TypeScript", 
        "⚛️ React", 
        "💚 Vue" 
    }'
    placeholder="Select technology">
</ejs-combobox>
```

### Using Icon Font Classes

**Controller:**
```csharp
public class TechItem
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string IconClass { get; set; }
}

public ActionResult Index()
{
    List<TechItem> techData = new List<TechItem>
    {
        new TechItem { Id = "1", Name = "JavaScript", IconClass = "fa fa-js" },
        new TechItem { Id = "2", Name = "React", IconClass = "fa fa-react" },
        new TechItem { Id = "3", Name = "Vue", IconClass = "fa fa-vuejs" }
    };
    ViewBag.TechData = techData;
    return View();
}
```

**View (Razor):**
```html
<ejs-combobox id="tech-combo"
    dataSource="ViewBag.TechData"
    placeholder="Select technology">
    <e-combobox-fields text="Name" value="Id" iconCss="IconClass"></e-combobox-fields>
</ejs-combobox>
```

**CSS:**
```css
.fa-js::before { content: "⚙️"; margin-right: 8px; }
.fa-react::before { content: "⚛️"; margin-right: 8px; }
.fa-vuejs::before { content: "💚"; margin-right: 8px; }
```

### Using Item Templates with Icons

**View (Razor):**
```html
<ejs-combobox id="tech-combo"
    dataSource="ViewBag.TechData"
    itemTemplate="#itemTemplate">
    <e-combobox-fields text="Name" value="Id"></e-combobox-fields>
</ejs-combobox>

<script id="itemTemplate" type="text/x-template">
    <span>
        <i class="${IconClass}"></i>
        <span>${Name}</span>
    </span>
</script>
```
