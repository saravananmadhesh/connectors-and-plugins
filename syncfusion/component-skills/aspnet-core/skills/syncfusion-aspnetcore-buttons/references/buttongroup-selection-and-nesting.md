# Selection and Nesting – ASP.NET Core ButtonGroup

## Table of Contents
- [Radio Button Group Behavior](#radio-button-group-behavior)
- [Checkbox Group Behavior](#checkbox-group-behavior)
- [Nesting with DropDownButton](#nesting-with-dropdownbutton)
- [Nesting with SplitButton](#nesting-with-splitbutton)

---

## Radio Button Group Behavior

Create mutually exclusive button groups where only one button can be selected at a time.

**View (`~/Pages/Index.cshtml`):**
```cshtml
<div class="e-btn-group">
    <input type="radio" id="rad1" name="format" value="list" />
    <label for="rad1" class="e-btn">
        <ejs-button content="List View"></ejs-button>
    </label>
    
    <input type="radio" id="rad2" name="format" value="grid" />
    <label for="rad2" class="e-btn">
        <ejs-button content="Grid View"></ejs-button>
    </label>
    
    <input type="radio" id="rad3" name="format" value="details" />
    <label for="rad3" class="e-btn">
        <ejs-button content="Details View"></ejs-button>
    </label>
</div>

<script>
    // Handle selection
    document.querySelectorAll('input[name="format"]').forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('Selected view:', this.value);
            // Update view based on selection
        });
    });
</script>
```

---

## Checkbox Group Behavior

Allow multiple button selections simultaneously.

**View:**
```cshtml
<div class="e-btn-group">
    <input type="checkbox" id="chk1" value="bold" />
    <label for="chk1" class="e-btn">
        <ejs-button iconCss="e-icons e-bold-icon"></ejs-button>
    </label>
    
    <input type="checkbox" id="chk2" value="italic" />
    <label for="chk2" class="e-btn">
        <ejs-button iconCss="e-icons e-italic-icon"></ejs-button>
    </label>
    
    <input type="checkbox" id="chk3" value="underline" />
    <label for="chk3" class="e-btn">
        <ejs-button iconCss="e-icons e-underline-icon"></ejs-button>
    </label>
</div>

<script>
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            console.log('Formatting options:', Array.from(
                document.querySelectorAll('input[type="checkbox"]:checked')
            ).map(c => c.value));
        });
    });
</script>
```

---

## Nesting with DropDownButton

Combine ButtonGroup with DropDownButton for complex menus.

**View:**
```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste" });
}

<div class="e-btn-group">
    <ejs-button id="alignLeft" cssClass="e-outline e-icons e-align-left-icon" title="Align Left"></ejs-button>
    
    <ejs-button id="alignCenter" cssClass="e-outline e-icons e-align-center-icon" title="Align Center"></ejs-button>
    
    <ejs-button id="alignRight" cssClass="e-outline e-icons e-align-right-icon" title="Align Right"></ejs-button>
    
    <div class="e-btn-separator"></div>
    
    <ejs-splitbutton 
        id="clipboardBtn" 
        content="Paste" 
        items="items">
    </ejs-splitbutton>
</div>

<style>
    .e-btn-separator {
        width: 1px;
        background-color: #ddd;
        margin: 0 5px;
    }
</style>
```

---

## Nesting with SplitButton

Create a ButtonGroup that includes SplitButton components.

**View:**
```cshtml
@{
    List<object> fileItems = new List<object>();
    fileItems.Add(new { text = "New" });
    fileItems.Add(new { text = "Open" });
    fileItems.Add(new { text = "Recent" });
}

@{
    List<object> editItems = new List<object>();
    editItems.Add(new { text = "Undo" });
    editItems.Add(new { text = "Redo" });
    editItems.Add(new { text = "Cut" });
    editItems.Add(new { text = "Copy" });
    editItems.Add(new { text = "Paste" });
}

<div class="e-btn-group">
    <ejs-splitbutton 
        id="fileBtn" 
        content="File" 
        items="fileItems"
        cssClass="e-outline">
    </ejs-splitbutton>
    
    <ejs-splitbutton 
        id="editBtn" 
        content="Edit" 
        items="editItems"
        cssClass="e-outline">
    </ejs-splitbutton>
    
    <ejs-button id="helpBtn" cssClass="e-outline" content="Help"></ejs-button>
</div>
```

---

## Complete Example with Server-Side State

**Razor Pages Handler (`~/Pages/Index.cshtml.cs`):**
```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

public class IndexModel : PageModel
{
    public string SelectedView { get; set; } = "list";
    public List<string> ActiveFormatting { get; set; } = new();

    public void OnGet()
    {
        // Default state
    }

    public void OnPost(string selectedView)
    {
        SelectedView = selectedView;
        // Process the selection
    }
}
```

**View (`~/Pages/Index.cshtml`):**
```cshtml
@page
@model IndexModel

<form method="post">
    <div class="e-btn-group">
        <input type="radio" id="list" name="SelectedView" value="list" 
               @(Model.SelectedView == "list" ? "checked" : "") />
        <label for="list" class="e-btn">
            <ejs-button content="List"></ejs-button>
        </label>
        
        <input type="radio" id="grid" name="SelectedView" value="grid" 
               @(Model.SelectedView == "grid" ? "checked" : "") />
        <label for="grid" class="e-btn">
            <ejs-button content="Grid"></ejs-button>
        </label>
    </div>
    
    <button type="submit" class="e-btn e-primary">Update View</button>
</form>
```

---

## See Also

- [ButtonGroup Getting Started](buttongroup-getting-started.md)
- [ButtonGroup How-To Patterns](buttongroup-how-to.md)
- [ButtonGroup Style and Appearance](buttongroup-style-and-appearance.md)
