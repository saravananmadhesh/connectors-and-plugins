# TextBox Advanced Features — ASP.NET Core

This reference covers advanced patterns including multiline textboxes, custom adornments, event handling, and form integration.

## Table of Contents
- [Multiline TextBox](#multiline-textbox)
- [Custom Adornments](#custom-adornments)
- [Event Handling](#event-handling)
- [Form Integration](#form-integration)
- [Examples](#examples)

---

## Multiline TextBox

Create TextBox with multiple lines for longer content input:

**Razor View (CSHTML):**
```html
<ejs-textbox id="feedback" 
             placeholder="Enter your feedback"
             multiline="true"
             rows="4"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>
```

**Use Cases:**
- Feedback forms
- Comments
- Message composition
- Reviews

**Note:** For most multiline scenarios, consider using TextArea component instead.

---

## Custom Adornments

### Icon with Text Label

Combine icons with text labels:

**Razor View (CSHTML):**
```html
<ejs-textbox id="phone" 
             placeholder="Phone Number"
             floatLabelType="Auto"
             prependTemplate="phoneLabel"
             type="tel">
</ejs-textbox>

<script>
    function phoneLabel() {
        return '<span class="badge bg-secondary me-2">📱</span>';
    }
</script>
```

### Interactive Button Adornment

Add clickable buttons as adornments:

**Razor View (CSHTML):**
```html
<ejs-textbox id="email" 
             placeholder="Email"
             floatLabelType="Auto"
             appendTemplate="verifyButton"
             type="email">
</ejs-textbox>

<script>
    function verifyButton() {
        return '<button class="btn btn-sm btn-link ms-2" type="button" onclick="verifyEmail()">Verify</button>';
    }

    function verifyEmail() {
        const email = document.getElementById('email').value;
        console.log('Verifying email:', email);
    }
</script>
```

### Status Indicator

Show validation or status with icon:

**Razor View (CSHTML):**
```html
<ejs-textbox id="username" 
             placeholder="Username"
             floatLabelType="Auto"
             appendTemplate="statusIndicator"
             input="checkUsername"
             type="text">
</ejs-textbox>

<script>
    let usernameAvailable = false;

    function statusIndicator() {
        return '<span id="status-icon" class="e-icons ms-2"></span>';
    }

    function checkUsername(args) {
        const value = args.value || '';
        const statusIcon = document.getElementById('status-icon');

        if (value.length < 3) {
            statusIcon.className = 'e-icons e-warning-alt ms-2';
            statusIcon.style.color = 'orange';
            usernameAvailable = false;
        } else if (value.includes(' ')) {
            statusIcon.className = 'e-icons e-close ms-2';
            statusIcon.style.color = 'red';
            usernameAvailable = false;
        } else {
            statusIcon.className = 'e-icons e-check-1 ms-2';
            statusIcon.style.color = 'green';
            usernameAvailable = true;
        }
    }
</script>
```

---

## Event Handling

### Input Event (Real-Time)

Fires as user types:

**Razor View (CSHTML):**
```html
<ejs-textbox id="search" 
             placeholder="Search..."
             input="onSearchInput"
             type="text">
</ejs-textbox>

<div id="results"></div>

<script>
    function onSearchInput(args) {
        const term = args.value || '';
        
        if (term.length < 2) {
            document.getElementById('results').innerHTML = '';
            return;
        }

        // Perform search
        performSearch(term);
    }

    function performSearch(term) {
        console.log('Searching for:', term);
        // Make API call or filter results
    }
</script>
```

### Change Event (On Blur)

Fires when value changes and focus is lost:

**Razor View (CSHTML):**
```html
<ejs-textbox id="url" 
             placeholder="Website URL"
             change="onURLChange"
             type="url">
</ejs-textbox>

<script>
    function onURLChange(args) {
        const url = args.value;
        console.log('URL changed to:', url);
        // Save or validate URL
        validateURL(url);
    }

    function validateURL(url) {
        try {
            new URL(url);
            console.log('Valid URL');
        } catch {
            console.log('Invalid URL');
        }
    }
</script>
```

### Focus and Blur Events

Manage UI state on focus/blur:

**Razor View (CSHTML):**
```html
<ejs-textbox id="password" 
             placeholder="Password"
             focus="onPasswordFocus"
             blur="onPasswordBlur"
             type="password">
</ejs-textbox>

<div id="requirements" style="display: none;">
    <small>Password must contain:</small>
    <ul>
        <li>At least 8 characters</li>
        <li>One uppercase letter</li>
        <li>One number</li>
        <li>One special character</li>
    </ul>
</div>

<script>
    function onPasswordFocus(args) {
        document.getElementById('requirements').style.display = 'block';
    }

    function onPasswordBlur(args) {
        document.getElementById('requirements').style.display = 'none';
    }
</script>
```

---

## Form Integration

### Model Binding

Bind TextBox to C# model property:

**Razor View (CSHTML):**
```html
<ejs-textbox asp-for="Model.Email" 
             placeholder="Email"
             floatLabelType="Auto"
             type="email">
</ejs-textbox>
<span asp-validation-for="Email" class="text-danger"></span>
```

**C# Model:**
```csharp
public class UserProfile
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [StringLength(50)]
    public string FirstName { get; set; }

    [Required]
    [StringLength(50)]
    public string LastName { get; set; }
}
```

### Form Submission Handling

**C# Controller:**
```csharp
[HttpPost]
public IActionResult UpdateProfile(UserProfile model)
{
    if (!ModelState.IsValid)
        return View(model);

    // Update database
    _userService.Update(model);

    return RedirectToAction("Success");
}
```

---

## Examples

### Dynamic Search with Suggestions

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <div style="max-width: 500px; margin: 0 auto;">
        <ejs-textbox id="searchBox" 
                     placeholder="Search products..."
                     floatLabelType="Auto"
                     input="performSearch"
                     focus="showSuggestions"
                     blur="hideSuggestions"
                     type="text">
        </ejs-textbox>

        <div id="suggestions" class="list-group mt-2" style="display: none;">
            <!-- Suggestions will populate here -->
        </div>
    </div>
</div>

<script>
    let allProducts = [
        'Laptop Computer',
        'Laptop Stand',
        'Laptop Bag',
        'Laptop Charger',
        'Laptop Cooling Pad'
    ];

    function performSearch(args) {
        const term = (args.value || '').toLowerCase();
        
        if (term.length === 0) {
            document.getElementById('suggestions').innerHTML = '';
            return;
        }

        const filtered = allProducts.filter(p => 
            p.toLowerCase().includes(term)
        );

        displaySuggestions(filtered);
    }

    function displaySuggestions(items) {
        const container = document.getElementById('suggestions');
        
        if (items.length === 0) {
            container.innerHTML = '<div class="list-group-item text-muted">No results</div>';
        } else {
            container.innerHTML = items.map(item => 
                `<button type="button" class="list-group-item list-group-item-action" 
                         onclick="selectSuggestion('${item}')">${item}</button>`
            ).join('');
        }
    }

    function showSuggestions(args) {
        if (args.value && args.value.length > 0) {
            document.getElementById('suggestions').style.display = 'block';
        }
    }

    function hideSuggestions(args) {
        setTimeout(() => {
            document.getElementById('suggestions').style.display = 'none';
        }, 200);
    }

    function selectSuggestion(item) {
        document.getElementById('searchBox').value = item;
    }
</script>
```

### Profile Edit Form with Validation

**Razor View (CSHTML):**
```html
@model UserProfileModel

<div class="container mt-5">
    <div class="card" style="max-width: 600px; margin: 0 auto;">
        <div class="card-body">
            <h3 class="card-title">Edit Profile</h3>

            <form asp-action="UpdateProfile" method="post">
                <!-- First Name -->
                <div class="form-group mb-3">
                    <label class="form-label">First Name</label>
                    <ejs-textbox asp-for="FirstName" 
                                 placeholder="First Name"
                                 floatLabelType="Auto"
                                 input="validateName"
                                 type="text">
                    </ejs-textbox>
                    <span asp-validation-for="FirstName" class="text-danger"></span>
                </div>

                <!-- Last Name -->
                <div class="form-group mb-3">
                    <label class="form-label">Last Name</label>
                    <ejs-textbox asp-for="LastName" 
                                 placeholder="Last Name"
                                 floatLabelType="Auto"
                                 input="validateName"
                                 type="text">
                    </ejs-textbox>
                    <span asp-validation-for="LastName" class="text-danger"></span>
                </div>

                <!-- Email -->
                <div class="form-group mb-3">
                    <label class="form-label">Email Address</label>
                    <ejs-textbox asp-for="Email" 
                                 placeholder="Email"
                                 floatLabelType="Auto"
                                 type="email">
                    </ejs-textbox>
                    <span asp-validation-for="Email" class="text-danger"></span>
                </div>

                <!-- Phone -->
                <div class="form-group mb-4">
                    <label class="form-label">Phone Number</label>
                    <ejs-textbox asp-for="PhoneNumber" 
                                 placeholder="Phone Number"
                                 floatLabelType="Auto"
                                 input="formatPhone"
                                 type="tel">
                    </ejs-textbox>
                </div>

                <div>
                    <button type="submit" class="btn btn-primary">Save Changes</button>
                    <a href="/" class="btn btn-outline-secondary">Cancel</a>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    function validateName(args) {
        const value = (args.value || '').trim();
        const isValid = /^[a-zA-Z\s'-]{2,50}$/.test(value);
        
        if (value && !isValid) {
            console.log('Invalid name format');
        }
    }

    function formatPhone(args) {
        let value = (args.value || '').replace(/\D/g, '');
        
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 6) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
            }
        }
    }
</script>
```

---

## See Also

- `textbox-getting-started.md` — Quick start guide
- `textbox-features-and-groups.md` — Features overview
- `textbox-validation-and-states.md` — Validation patterns
- `textbox-api.md` — Complete API reference
