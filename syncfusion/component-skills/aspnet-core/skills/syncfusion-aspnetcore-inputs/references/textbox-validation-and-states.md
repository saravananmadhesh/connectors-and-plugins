# TextBox Validation and States — ASP.NET Core

This reference covers form validation, state management, validation states (success/error/warning), and error display patterns.

## Table of Contents
- [Form Validation Overview](#form-validation-overview)
- [Data Annotations](#data-annotations)
- [Validation States](#validation-states)
- [Error Display](#error-display)
- [Real-Time Validation](#real-time-validation)
- [Examples](#examples)

---

## Form Validation Overview

ASP.NET Core provides model-level validation via data annotations and client-side validation with Tag Helpers.

### Two-Level Validation Approach

**Server-Side:** C# data annotations
**Client-Side:** ASP.NET Core Tag Helpers + jQuery Validate

---

## Data Annotations

### Required Validation

**C# Model:**
```csharp
public class ContactForm
{
    [Required(ErrorMessage = "Name is required")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }
}
```

**Razor View (CSHTML):**
```html
<form asp-action="Submit" method="post">
    <div class="form-group mb-3">
        <label class="form-label">Name</label>
        <ejs-textbox asp-for="Name" 
                     placeholder="Full Name"
                     floatLabelType="Auto"
                     type="text">
        </ejs-textbox>
        <span asp-validation-for="Name" class="text-danger"></span>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

### String Length Validation

Enforce minimum and maximum length:

**C# Model:**
```csharp
public class UserProfile
{
    [Required]
    [StringLength(50, MinimumLength = 2, 
        ErrorMessage = "Username must be between 2 and 50 characters")]
    public string Username { get; set; }

    [Required]
    [StringLength(500, MinimumLength = 10,
        ErrorMessage = "Bio must be between 10 and 500 characters")]
    public string Bio { get; set; }
}
```

**Razor View (CSHTML):**
```html
<div class="form-group mb-3">
    <label class="form-label">Username</label>
    <ejs-textbox asp-for="Username" 
                 placeholder="Choose username"
                 floatLabelType="Auto"
                 type="text">
    </ejs-textbox>
    <span asp-validation-for="Username" class="text-danger"></span>
    <small class="form-text text-muted">2-50 characters</small>
</div>
```

### Email Validation

**C# Model:**
```csharp
public class Newsletter
{
    [Required(ErrorMessage = "Email address is required")]
    [EmailAddress(ErrorMessage = "Invalid email format")]
    public string Email { get; set; }
}
```

**Razor View (CSHTML):**
```html
<div class="form-group mb-3">
    <label class="form-label">Email Address</label>
    <ejs-textbox asp-for="Email" 
                 placeholder="your@email.com"
                 floatLabelType="Auto"
                 type="email">
    </ejs-textbox>
    <span asp-validation-for="Email" class="text-danger"></span>
</div>
```

### Phone Number Validation

**C# Model:**
```csharp
public class Contact
{
    [Required]
    [Phone(ErrorMessage = "Invalid phone number")]
    public string PhoneNumber { get; set; }
}
```

### Custom Regex Validation

**C# Model:**
```csharp
public class PasswordReset
{
    [Required]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
        ErrorMessage = "Password must contain uppercase, lowercase, number, and special character")]
    public string NewPassword { get; set; }
}
```

**Razor View (CSHTML):**
```html
<div class="form-group mb-3">
    <label class="form-label">Password</label>
    <ejs-textbox asp-for="NewPassword" 
                 placeholder="Enter password"
                 floatLabelType="Auto"
                 type="password">
    </ejs-textbox>
    <span asp-validation-for="NewPassword" class="text-danger"></span>
    <small class="form-text text-muted">
        Require: uppercase, lowercase, number, special character
    </small>
</div>
```

---

## Validation States

### Success State

Display after successful validation:

**HTML/CSS:**
```html
<ejs-textbox id="email" 
             placeholder="Email"
             cssClass="e-success"
             value="user@example.com"
             type="email">
</ejs-textbox>
<small class="text-success">✓ Valid email format</small>
```

**CSS:**
```css
.e-success {
    border-color: #28a745 !important;
    background-color: #f0f9f6;
}

.e-success:focus {
    border-color: #1e7e34 !important;
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, .25);
}
```

### Error State

Display when validation fails:

**HTML/CSS:**
```html
<ejs-textbox id="email" 
             placeholder="Email"
             cssClass="e-error"
             value="invalid-email"
             type="email">
</ejs-textbox>
<small class="text-danger">❌ Invalid email format</small>
```

**CSS:**
```css
.e-error {
    border-color: #dc3545 !important;
    background-color: #fff5f5;
}

.e-error:focus {
    border-color: #c82333 !important;
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, .25);
}
```

### Warning State

Display when input needs review:

**HTML/CSS:**
```html
<ejs-textbox id="username" 
             placeholder="Username"
             cssClass="e-warning"
             type="text">
</ejs-textbox>
<small class="text-warning">⚠️ Username may be taken, verify availability</small>
```

---

## Error Display

### Inline Error Messages

Show validation error directly below input:

**Razor View (CSHTML):**
```html
<form asp-action="Register" method="post">
    <asp-validation-summary></asp-validation-summary>

    <div class="form-group mb-3">
        <label asp-for="Email" class="form-label">Email</label>
        <ejs-textbox asp-for="Email" 
                     placeholder="Email"
                     floatLabelType="Auto"
                     type="email">
        </ejs-textbox>
        <span asp-validation-for="Email" class="text-danger d-block mt-1"></span>
    </div>

    <button type="submit" class="btn btn-primary">Register</button>
</form>
```

### Validation Summary

Display all errors at the top:

**Razor View (CSHTML):**
```html
<form asp-action="Submit" method="post">
    <asp-validation-summary class="alert alert-danger" role="alert"></asp-validation-summary>

    <div class="form-group mb-3">
        <ejs-textbox asp-for="Name" placeholder="Name" type="text"></ejs-textbox>
    </div>

    <div class="form-group mb-3">
        <ejs-textbox asp-for="Email" placeholder="Email" type="email"></ejs-textbox>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

---

## Real-Time Validation

### Character Count Validation

Validate as user types:

**Razor View (CSHTML):**
```html
<div class="form-group mb-3">
    <label class="form-label">Username (5-20 characters)</label>
    
    <ejs-textbox id="username" 
                 placeholder="Enter username"
                 input="validateUsername"
                 change="onUsernameChange"
                 floatLabelType="Auto"
                 type="text">
    </ejs-textbox>
    
    <div id="username-feedback" class="mt-2"></div>
</div>

<script>
    function validateUsername(args) {
        const value = (args.value || '').trim();
        const feedback = document.getElementById('username-feedback');
        const input = document.getElementById('username');

        if (value.length === 0) {
            feedback.innerHTML = '';
            input.classList.remove('e-success', 'e-error', 'e-warning');
            return;
        }

        if (value.length < 5) {
            feedback.innerHTML = '❌ At least 5 characters required (' + value.length + '/5)';
            input.classList.add('e-error');
            input.classList.remove('e-success', 'e-warning');
        } else if (value.length <= 20) {
            feedback.innerHTML = '✓ Valid length (' + value.length + '/20)';
            input.classList.add('e-success');
            input.classList.remove('e-error', 'e-warning');
        } else {
            feedback.innerHTML = '❌ Maximum 20 characters (' + value.length + '/20)';
            input.classList.add('e-error');
            input.classList.remove('e-success', 'e-warning');
        }
    }

    function onUsernameChange(args) {
        console.log('Username finalized:', args.value);
    }
</script>
```

### Email Availability Check

**Razor View (CSHTML):**
```html
<div class="form-group mb-3">
    <label class="form-label">Email Address</label>
    
    <ejs-textbox id="email" 
                 placeholder="your@email.com"
                 change="checkEmailAvailability"
                 floatLabelType="Auto"
                 type="email">
    </ejs-textbox>
    
    <div id="email-status" class="mt-2"></div>
</div>

<script>
    function checkEmailAvailability(args) {
        const email = (args.value || '').trim();
        const input = document.getElementById('email');
        const status = document.getElementById('email-status');

        if (!email) {
            status.innerHTML = '';
            return;
        }

        // Basic email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            status.innerHTML = '❌ Invalid email format';
            input.classList.add('e-error');
            input.classList.remove('e-success');
            return;
        }

        // Simulate API call to check availability
        fetch('/api/check-email?email=' + encodeURIComponent(email))
            .then(response => response.json())
            .then(data => {
                if (data.available) {
                    status.innerHTML = '✓ Email available';
                    input.classList.add('e-success');
                    input.classList.remove('e-error');
                } else {
                    status.innerHTML = '❌ Email already registered';
                    input.classList.add('e-error');
                    input.classList.remove('e-success');
                }
            });
    }
</script>
```

---

## Examples

### Complete Registration Form

**Razor View (CSHTML):**
```html
@model RegistrationModel

@{
    ViewBag.Title = "Register";
}

<div class="container mt-5">
    <div class="card" style="max-width: 500px; margin: 0 auto;">
        <div class="card-body">
            <h3 class="card-title">Create Account</h3>

            <form asp-action="Register" method="post" novalidate>
                <asp-validation-summary class="alert alert-danger" role="alert"></asp-validation-summary>

                <!-- Username -->
                <div class="form-group mb-3">
                    <label asp-for="Username" class="form-label">Username</label>
                    <ejs-textbox asp-for="Username" 
                                 placeholder="Username"
                                 floatLabelType="Auto"
                                 input="validateUsername"
                                 type="text">
                    </ejs-textbox>
                    <span asp-validation-for="Username" class="text-danger d-block mt-1"></span>
                    <small class="form-text text-muted">3-20 characters, alphanumeric only</small>
                </div>

                <!-- Email -->
                <div class="form-group mb-3">
                    <label asp-for="Email" class="form-label">Email Address</label>
                    <ejs-textbox asp-for="Email" 
                                 placeholder="your@email.com"
                                 floatLabelType="Auto"
                                 change="checkEmail"
                                 type="email">
                    </ejs-textbox>
                    <span asp-validation-for="Email" class="text-danger d-block mt-1"></span>
                    <div id="email-check" class="mt-1"></div>
                </div>

                <!-- Password -->
                <div class="form-group mb-3">
                    <label asp-for="Password" class="form-label">Password</label>
                    <ejs-textbox asp-for="Password" 
                                 placeholder="Password"
                                 floatLabelType="Auto"
                                 input="validatePassword"
                                 type="password">
                    </ejs-textbox>
                    <span asp-validation-for="Password" class="text-danger d-block mt-1"></span>
                    <small class="form-text text-muted">
                        Min 8 chars, 1 uppercase, 1 number, 1 special char
                    </small>
                </div>

                <!-- Confirm Password -->
                <div class="form-group mb-4">
                    <label asp-for="ConfirmPassword" class="form-label">Confirm Password</label>
                    <ejs-textbox asp-for="ConfirmPassword" 
                                 placeholder="Confirm Password"
                                 floatLabelType="Auto"
                                 change="validatePasswordMatch"
                                 type="password">
                    </ejs-textbox>
                    <span asp-validation-for="ConfirmPassword" class="text-danger d-block mt-1"></span>
                    <div id="password-match" class="mt-1"></div>
                </div>

                <button type="submit" class="btn btn-primary w-100">
                    Create Account
                </button>
            </form>
        </div>
    </div>
</div>

<script>
    function validateUsername(args) {
        const value = (args.value || '').trim();
        const isValid = /^[a-zA-Z0-9_]{3,20}$/.test(value);
        
        const input = document.getElementById('username');
        if (value && !isValid) {
            input.classList.add('e-error');
        } else if (value) {
            input.classList.add('e-success');
        }
    }

    function checkEmail(args) {
        const email = (args.value || '').trim();
        const feedback = document.getElementById('email-check');
        const input = document.getElementById('email');
        
        if (!email) return;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            feedback.innerHTML = '';
            return;
        }

        // Simulate server check
        feedback.innerHTML = '<small>Checking availability...</small>';
        
        setTimeout(() => {
            feedback.innerHTML = '<small class="text-success">✓ Available</small>';
            input.classList.add('e-success');
        }, 500);
    }

    function validatePassword(args) {
        const pwd = (args.value || '');
        const input = document.getElementById('password');
        const hasUpper = /[A-Z]/.test(pwd);
        const hasLower = /[a-z]/.test(pwd);
        const hasNumber = /\d/.test(pwd);
        const hasSpecial = /[@$!%*?&]/.test(pwd);
        const isLongEnough = pwd.length >= 8;

        const isValid = hasUpper && hasLower && hasNumber && hasSpecial && isLongEnough;
        
        if (pwd && isValid) {
            input.classList.add('e-success');
            input.classList.remove('e-error');
        } else if (pwd) {
            input.classList.add('e-error');
            input.classList.remove('e-success');
        }
    }

    function validatePasswordMatch(args) {
        const pwd = document.getElementById('password').value;
        const confirm = (args.value || '');
        const feedback = document.getElementById('password-match');
        const input = document.getElementById('confirmPassword');

        if (pwd && confirm === pwd) {
            feedback.innerHTML = '<small class="text-success">✓ Passwords match</small>';
            input.classList.add('e-success');
            input.classList.remove('e-error');
        } else if (pwd && confirm && confirm !== pwd) {
            feedback.innerHTML = '<small class="text-danger">❌ Passwords do not match</small>';
            input.classList.add('e-error');
            input.classList.remove('e-success');
        }
    }
</script>
```

---

## See Also

- `textbox-getting-started.md` — Quick start guide
- `textbox-features-and-groups.md` — Features overview
- `textbox-advanced-features.md` — Advanced patterns
- `textbox-api.md` — Complete API reference
