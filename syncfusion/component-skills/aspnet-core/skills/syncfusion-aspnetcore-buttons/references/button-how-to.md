# How-To – ASP.NET Core Button

Common patterns and recipes for working with Syncfusion ASP.NET Core buttons.

---

## Create a Block (Full-Width) Button

**View:**
```cshtml
<div class="button-container">
    <ejs-button id="blockButton" cssClass="e-block" content="Block Button"></ejs-button>
</div>

<style>
    .button-container {
        max-width: 400px;
        margin: 20px 0;
    }
    
    .button-container .e-btn.e-block {
        width: 100%;
    }
</style>
```

---

## Create a Rounded-Corner Button

**View:**
```cshtml
<style>
    .e-btn.e-rounded {
        border-radius: 20px;
    }
</style>

<ejs-button id="roundedBtn" cssClass="e-rounded" content="Rounded Button"></ejs-button>
```

Alternatively, use predefined CSS:

```cshtml
<ejs-button id="roundBtn" cssClass="e-round" content="Round Button"></ejs-button>
```

---

## Add a Navigation Link to a Button

**Using HTML `<a>` styled as button:**
```cshtml
<a href="/dashboard" class="e-btn e-primary">Go to Dashboard</a>
```

**Using Button with onclick navigation:**
```cshtml
<ejs-button id="navBtn" onclick="navigateTo('/dashboard')" content="Go to Dashboard"></ejs-button>

<script>
    function navigateTo(url) {
        window.location.href = url;
    }
</script>
```

**Using Razor syntax:**
```cshtml
<a href="@Url.Page("/Dashboard")" class="e-btn e-primary">Go to Dashboard</a>
```

---

## Customize Button Appearance with CSS

**View:**
```cshtml
<style>
    .custom-button {
        background-color: #6b4ce8 !important;
        border-color: #6b4ce8 !important;
        padding: 12px 24px !important;
        font-size: 16px !important;
        border-radius: 4px !important;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
    
    .custom-button:hover {
        background-color: #5a3fc4 !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
</style>

<ejs-button id="customBtn" cssClass="custom-button" content="Custom Styled Button"></ejs-button>
```

---

## Style Native Input and Anchor Elements as Buttons

**HTML input as button:**
```cshtml
<style>
    input[type="submit"].e-btn-style {
        @apply px-6 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600;
    }
</style>

<input type="submit" class="e-btn e-primary" value="Submit" />
```

**Anchor as button:**
```cshtml
<style>
    a.e-btn-link {
        display: inline-block;
        padding: 8px 16px;
        text-decoration: none;
    }
</style>

<a href="/page" class="e-btn e-primary e-btn-link">Click Here</a>
```

---

## Set the Disabled State

**Disabled button:**
```cshtml
<ejs-button id="disabledBtn" disabled="true" content="Disabled Button"></ejs-button>
```

**Toggle disabled state with JavaScript:**
```cshtml
<ejs-button id="toggleBtn" content="Disable Me"></ejs-button>

<script>
    document.getElementById('toggleBtn').addEventListener('click', function() {
        const button = ej2_instances['toggleBtn'][0];
        button.disabled = !button.disabled;
        button.dataBind();
    });
</script>
```

**Disable button conditionally from server:**

**Razor Pages Handler (`~/Pages/Index.cshtml.cs`):**
```csharp
public class IndexModel : PageModel
{
    public bool IsButtonDisabled { get; set; }

    public void OnGet()
    {
        // Disable button if some condition is not met
        IsButtonDisabled = !IsUserAuthenticated();
    }

    private bool IsUserAuthenticated()
    {
        return User.Identity?.IsAuthenticated ?? false;
    }
}
```

**View (`~/Pages/Index.cshtml`):**
```cshtml
<ejs-button id="condBtn" disabled="@Model.IsButtonDisabled">
    @(Model.IsButtonDisabled ? "You cannot click this" : "Click me")
</ejs-button>
```

---

## Enable Right-to-Left (RTL) Support

**View:**
```cshtml
<div dir="rtl">
    <ejs-button id="rtlBtn" enableRtl="true" content="زر"></ejs-button>
</div>
```

Or enable globally in `_Layout.cshtml`:

```cshtml
<html dir="rtl">
    <!-- ... -->
    <body>
        <!-- content -->
        <script>
            Syncfusion.enableRtl(true);
        </script>
    </body>
</html>
```

---

## Add a Tooltip on Hover

Use the Syncfusion Tooltip component alongside the button:

**Install:** Tooltip is available in `Syncfusion.EJ2.AspNet.Core` package (same as Button).

**View:**
```cshtml
<ejs-button id="tooltipBtn" content="Save">Save</ejs-button>

<ejs-tooltip id="tooltip" target="#tooltipBtn" content="Save your changes"></ejs-tooltip>
```

Alternatively, use native HTML title attribute:

```cshtml
<ejs-button id="simpleBtn" title="This is a helpful tooltip" content="Hover Me"></ejs-button>
```

---

## Implement a Repeat Button

A repeat button fires its click handler multiple times when held down:

**View:**
```cshtml
<ejs-button id="repeatBtn" content="Hold to Repeat"></ejs-button>

<div id="repeatCount">Count: 0</div>

<script>
    let clickCount = 0;
    let repeatInterval = null;

    const repeatBtn = document.getElementById('repeatBtn');

    // Single click
    repeatBtn.addEventListener('click', function() {
        clickCount++;
        updateCount();
    });

    // Mouse down - start repeating
    repeatBtn.addEventListener('mousedown', function() {
        repeatInterval = setInterval(() => {
            clickCount++;
            updateCount();
        }, 100); // Repeat every 100ms
    });

    // Mouse up - stop repeating
    document.addEventListener('mouseup', function() {
        clearInterval(repeatInterval);
    });

    function updateCount() {
        document.getElementById('repeatCount').textContent = 'Count: ' + clickCount;
    }
</script>
```

---

## Create a Loading/Spinner Button

**View:**
```cshtml
<ejs-button id="loadingBtn" onclick="startLoading()" content="Submit"></ejs-button>

<script>
    async function startLoading() {
        const btn = ej2_instances['loadingBtn'][0];
        btn.disabled = true;
        btn.content = 'Loading...';

        try {
            // Simulate an async operation (e.g., API call)
            await new Promise(resolve => setTimeout(resolve, 2000));
            btn.content = 'Success!';
        } catch (error) {
            btn.content = 'Error';
        } finally {
            setTimeout(() => {
                btn.disabled = false;
                btn.content = 'Submit';
            }, 1000);
        }
    }
</script>
```

---

## Form Submission with Button

**View (`~/Pages/Index.cshtml`):**
```cshtml
<form method="post">
    <div>
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required />
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
    </div>
    <div>
        <ejs-button id="submitBtn" type="submit" cssClass="e-primary" content="Submit"></ejs-button>
        <ejs-button id="resetBtn" type="reset" content="Clear"></ejs-button>
    </div>
</form>
```

**Razor Pages Handler (`~/Pages/Index.cshtml.cs`):**
```csharp
public async Task<IActionResult> OnPostAsync()
{
    string name = Request.Form["name"];
    string email = Request.Form["email"];

    // Process the form data
    await ProcessFormAsync(name, email);

    return RedirectToPage("SubmissionSuccess");
}
```

---

## Button Group

Group buttons visually without interactive behavior:

**View:**
```cshtml
<div class="e-btn-group">
    <ejs-button id="btn1" content="HTML"></ejs-button>
    <ejs-button id="btn2" content="CSS"></ejs-button>
    <ejs-button id="btn3" content="JavaScript"></ejs-button>
</div>
```

---

## See Also

- [Button Types and Styles](button-types-and-styles.md)
- [Button API Reference](button-api.md)
- [Button Accessibility](button-accessibility.md)
