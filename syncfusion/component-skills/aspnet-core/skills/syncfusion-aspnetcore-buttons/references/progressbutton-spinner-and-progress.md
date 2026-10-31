# Spinner and Progress – ASP.NET Core ProgressButton

## Progress Display

```cshtml
<ejs-progressbutton 
    id="progressBtn" 
    content="Upload"
    enableProgress="true">
</ejs-progressbutton>

<script>
    document.getElementById('progressBtn').addEventListener('click', function() {
        const btn = ej2_instances['progressBtn'][0];
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += 5;
            btn.progress = progress;
            
            if (progress >= 100) {
                clearInterval(interval);
            }
        }, 100);
    });
</script>
```

## With Spinner

You can construct a strongly-typed `ProgressButtonSpinSettings` instance server-side and pass it to the view (preferred for complex settings):

```csharp
using Microsoft.AspNetCore.Mvc;
using Syncfusion.EJ2.Buttons;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        var spinSettings = new ProgressButtonSpinSettings
        {
            Position = SpinPosition.Right,
            Width = "20", // or "20px"
            Template = "<div class='template'></div>"
        };
        ViewBag.SpinSettings = spinSettings;
        return View();
    }
}
```

Then in the Razor view reference the server-side object:

```cshtml
<ejs-progressbutton 
    id="progressBtn" 
    content="Processing"
    spinSettings="@(ViewBag.SpinSettings)">
</ejs-progressbutton>
```

## Without Spinner

```cshtml
<ejs-progressbutton 
    id="progressBtn" 
    content="Download"
    hideSpinner="true">
</ejs-progressbutton>
```

---

## See Also

- [ProgressButton Getting Started](progressbutton-getting-started.md)
- [ProgressButton Style and Appearance](progressbutton-style-and-appearance.md)
- [ProgressButton API](progressbutton-api.md)
