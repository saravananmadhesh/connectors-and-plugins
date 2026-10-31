# How-To – ASP.NET Core ButtonGroup

Common patterns and recipes for working with Syncfusion ButtonGroup components.

---

## Create a Segmented Control (Radio Button Group)

A segmented control displays mutually exclusive options with visual grouping.

**View:**
```cshtml
<div class="e-btn-group">
    <input type="radio" id="daily" name="interval" value="daily" checked />
    <label for="daily" class="e-btn">Daily</label>
    
    <input type="radio" id="weekly" name="interval" value="weekly" />
    <label for="weekly" class="e-btn">Weekly</label>
    
    <input type="radio" id="monthly" name="interval" value="monthly" />
    <label for="monthly" class="e-btn">Monthly</label>
</div>

<script>
    document.querySelectorAll('input[name="interval"]').forEach(radio => {
        radio.addEventListener('change', function() {
            console.log('Interval:', this.value);
            updateChart(this.value);
        });
    });
</script>
```

---

## Create a Toolbar with ButtonGroup

Combine multiple button groups for a toolbar layout.

**View:**
```cshtml
<div class="toolbar">
    <!-- File operations group -->
    <div class="e-btn-group">
        <ejs-button id="newBtn" iconCss="e-icons e-file-new-icon" title="New"></ejs-button>
        <ejs-button id="openBtn" iconCss="e-icons e-open-icon" title="Open"></ejs-button>
        <ejs-button id="saveBtn" iconCss="e-icons e-save-icon" title="Save"></ejs-button>
    </div>

    <!-- Formatting group -->
    <div class="e-btn-group">
        <input type="checkbox" id="bold" value="bold" />
        <label for="bold" class="e-btn" title="Bold">
            <ejs-button iconCss="e-icons e-bold-icon"></ejs-button>
        </label>
        
        <input type="checkbox" id="italic" value="italic" />
        <label for="italic" class="e-btn" title="Italic">
            <ejs-button iconCss="e-icons e-italic-icon"></ejs-button>
        </label>
        
        <input type="checkbox" id="underline" value="underline" />
        <label for="underline" class="e-btn" title="Underline">
            <ejs-button iconCss="e-icons e-underline-icon"></ejs-button>
        </label>
    </div>

    <!-- Alignment group -->
    <div class="e-btn-group">
        <input type="radio" id="alignLeft" name="align" value="left" />
        <label for="alignLeft" class="e-btn" title="Align Left">
            <ejs-button iconCss="e-icons e-align-left-icon"></ejs-button>
        </label>
        
        <input type="radio" id="alignCenter" name="align" value="center" />
        <label for="alignCenter" class="e-btn" title="Align Center">
            <ejs-button iconCss="e-icons e-align-center-icon"></ejs-button>
        </label>
        
        <input type="radio" id="alignRight" name="align" value="right" />
        <label for="alignRight" class="e-btn" title="Align Right">
            <ejs-button iconCss="e-icons e-align-right-icon"></ejs-button>
        </label>
    </div>
</div>

<style>
    .toolbar {
        display: flex;
        gap: 10px;
        padding: 10px;
        background-color: #f5f5f5;
        border-bottom: 1px solid #ddd;
    }

    .toolbar .e-btn-group {
        display: flex;
        margin: 0;
    }

    .toolbar input {
        display: none;
    }

    .toolbar label {
        margin: 0;
    }
</style>
```

---

## Create a Vertical ButtonGroup

Stack buttons vertically for sidebar or menu-like layouts.

**View:**
```cshtml
<div class="e-btn-group e-vertical">
    <ejs-button id="homeBtn" cssClass="e-outline" content="Home"></ejs-button>
    
    <ejs-button id="aboutBtn" cssClass="e-outline" content="About"></ejs-button>
    
    <ejs-button id="servicesBtn" cssClass="e-outline" content="Services"></ejs-button>
    
    <ejs-button id="contactBtn" cssClass="e-outline" content="Contact"></ejs-button>
</div>

<style>
    .e-btn-group.e-vertical {
        flex-direction: column;
        display: flex;
        gap: 0;
    }

    .e-btn-group.e-vertical .e-btn {
        border-radius: 0;
        width: 100%;
    }

    .e-btn-group.e-vertical .e-btn:first-child {
        border-radius: 4px 4px 0 0;
    }

    .e-btn-group.e-vertical .e-btn:last-child {
        border-radius: 0 0 4px 4px;
    }
</style>
```

---

## Handle ButtonGroup Selection Changes

Capture and process button group selections with JavaScript.

**View:**
```cshtml
<div class="e-btn-group" id="priorityGroup">
    <input type="radio" id="low" name="priority" value="low" />
    <label for="low" class="e-btn">Low</label>
    
    <input type="radio" id="medium" name="priority" value="medium" checked />
    <label for="medium" class="e-btn">Medium</label>
    
    <input type="radio" id="high" name="priority" value="high" />
    <label for="high" class="e-btn">High</label>
</div>

<div id="result"></div>

<script>
    document.querySelectorAll('#priorityGroup input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            handlePriorityChange(this.value);
        });
    });

    function handlePriorityChange(priority) {
        const resultDiv = document.getElementById('result');
        let color;

        switch (priority) {
            case 'low':
                color = 'green';
                break;
            case 'medium':
                color = 'orange';
                break;
            case 'high':
                color = 'red';
                break;
        }

        resultDiv.innerHTML = `<p style="color: ${color};">Priority set to: ${priority}</p>`;
    }
</script>
```

---

## Implement Enable/Disable Logic

Dynamically enable or disable button groups based on conditions.

**View:**
```cshtml
<input type="checkbox" id="enableButtons" /> Enable formatting options

<div class="e-btn-group" id="formattingGroup">
    <input type="checkbox" id="bold" disabled />
    <label for="bold" class="e-btn">
        <ejs-button iconCss="e-icons e-bold-icon"></ejs-button>
    </label>
    
    <input type="checkbox" id="italic" disabled />
    <label for="italic" class="e-btn">
        <ejs-button iconCss="e-icons e-italic-icon"></ejs-button>
    </label>
</div>

<script>
    document.getElementById('enableButtons').addEventListener('change', function() {
        const isEnabled = this.checked;
        document.querySelectorAll('#formattingGroup input').forEach(input => {
            input.disabled = !isEnabled;
        });
    });
</script>
```

---

## Create a Button Group with Separators

Use visual separators to logically group buttons.

**View:**
```cshtml
<div class="e-btn-group">
    <ejs-button id="newBtn" cssClass="e-outline" content="New"></ejs-button>
    <ejs-button id="openBtn" cssClass="e-outline" content="Open"></ejs-button>
    
    <span class="e-btn-separator"></span>
    
    <ejs-button id="saveBtn" cssClass="e-outline" content="Save"></ejs-button>
    <ejs-button id="deleteBtn" cssClass="e-outline e-danger" content="Delete"></ejs-button>
    
    <span class="e-btn-separator"></span>
    
    <ejs-button id="helpBtn" cssClass="e-outline" content="Help"></ejs-button>
</div>

<style>
    .e-btn-separator {
        width: 1px;
        background-color: #ddd;
        margin: 0 8px;
    }
</style>
```

---

## Server-Side Button Group State

Manage button group state on the server and reflect it in the view.

**Razor Pages Handler (`~/Pages/Index.cshtml.cs`):**
```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

public class IndexModel : PageModel
{
    public string SelectedTheme { get; set; } = "light";

    public void OnPost(string selectedTheme)
    {
        SelectedTheme = selectedTheme;
        // Save preference to database or session
        HttpContext.Session.SetString("theme", selectedTheme);
    }
}
```

**View (`~/Pages/Index.cshtml`):**
```cshtml
@page
@model IndexModel

<form method="post">
    <div class="e-btn-group">
        <input type="radio" id="light" name="SelectedTheme" value="light" 
               @(Model.SelectedTheme == "light" ? "checked" : "") />
        <label for="light" class="e-btn">Light</label>
        
        <input type="radio" id="dark" name="SelectedTheme" value="dark" 
               @(Model.SelectedTheme == "dark" ? "checked" : "") />
        <label for="dark" class="e-btn">Dark</label>
        
        <input type="radio" id="auto" name="SelectedTheme" value="auto" 
               @(Model.SelectedTheme == "auto" ? "checked" : "") />
        <label for="auto" class="e-btn">Auto</label>
    </div>
    
    <button type="submit" class="e-btn e-primary">Apply Theme</button>
</form>
```

---

## See Also

- [ButtonGroup Getting Started](buttongroup-getting-started.md)
- [ButtonGroup Selection and Nesting](buttongroup-selection-and-nesting.md)
- [ButtonGroup Style and Appearance](buttongroup-style-and-appearance.md)
