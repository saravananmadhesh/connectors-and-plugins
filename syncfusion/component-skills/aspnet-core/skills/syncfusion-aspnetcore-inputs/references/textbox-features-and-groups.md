# TextBox Features and Groups — ASP.NET Core

This reference covers floating labels, icons, adornments, clear buttons, and grouping TextBox elements.

## Table of Contents
- [Floating Labels](#floating-labels)
- [Icons and Adornments](#icons-and-adornments)
- [Clear Button](#clear-button)
- [Rounded Corners](#rounded-corners)
- [Disabled State](#disabled-state)
- [Groups](#groups)
- [Examples](#examples)

---

## Floating Labels

Floating labels enhance UX by automatically positioning placeholder text above the input when focused or containing a value.

### Float Label Types

#### Auto (Default & Recommended)

Label floats only when focused or contains a value:

**Razor View (CSHTML):**
```html
<ejs-textbox id="email" 
             placeholder="Email Address"
             floatLabelType="Auto"
             type="email">
</ejs-textbox>
```

**Behavior:**
- Empty & unfocused: Shows placeholder inside
- Focused or has value: Placeholder animates above

#### Always

Label is always visible above the input:

**Razor View (CSHTML):**
```html
<ejs-textbox id="name" 
             placeholder="Full Name"
             floatLabelType="Always"
             type="text">
</ejs-textbox>
```

**Use When:** Label should always be visible for clarity

#### Never

No floating label; placeholder stays inside:

**Razor View (CSHTML):**
```html
<ejs-textbox id="search" 
             placeholder="Search..."
             floatLabelType="Never"
             type="text">
</ejs-textbox>
```

**Use When:** Space is limited or traditional design is preferred

---

## Icons and Adornments

### Prepend Icon (Before Input)

Add an icon or content before the input:

**Razor View (CSHTML):**
```html
<ejs-textbox id="username" 
             placeholder="Username"
             floatLabelType="Auto"
             prependTemplate="prependIcon"
             type="text">
</ejs-textbox>

<script>
    function prependIcon() {
        return '<span class="e-icons e-user"></span>';
    }
</script>
```

**Visual:**
```
┌────────────────────────────────┐
│ 👤 | username                  │
└────────────────────────────────┘
```

### Append Icon (After Input)

Add an icon or content after the input:

**Razor View (CSHTML):**
```html
<ejs-textbox id="search" 
             placeholder="Search items..."
             floatLabelType="Auto"
             appendTemplate="appendIcon"
             type="text">
</ejs-textbox>

<script>
    function appendIcon() {
        return '<span class="e-icons e-search"></span>';
    }
</script>
```

**Visual:**
```
┌────────────────────────────────┐
│ Search items...              🔍 |
└────────────────────────────────┘
```

### Combined Prepend and Append

**Razor View (CSHTML):**
```html
<ejs-textbox id="password" 
             placeholder="Password"
             floatLabelType="Auto"
             prependTemplate="lockIcon"
             appendTemplate="visibilityIcon"
             type="password">
</ejs-textbox>

<script>
    function lockIcon() {
        return '<span class="e-icons e-lock"></span>';
    }

    function visibilityIcon() {
        return '<span class="e-icons e-eye" onclick="toggleVisibility()"></span>';
    }

    function toggleVisibility() {
        const input = document.getElementById('password');
        input.type = input.type === 'password' ? 'text' : 'password';
    }
</script>
```

---

## Clear Button

Add a clear button to quickly reset the input value:

**Razor View (CSHTML):**
```html
<ejs-textbox id="search" 
             placeholder="Search..."
             floatLabelType="Auto"
             showClearButton="true"
             type="text">
</ejs-textbox>
```

**Visual:**
```
┌────────────────────────────────┐
│ search term                   ✕ |
└────────────────────────────────┘
```

**Use Cases:**
- Search inputs
- Filters
- Quick reset forms

---

## Rounded Corners

Apply rounded corners using CSS classes:

**Razor View (CSHTML):**
```html
<!-- Slightly rounded -->
<ejs-textbox id="rounded" 
             placeholder="Rounded corners"
             cssClass="rounded"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>

<!-- More rounded -->
<ejs-textbox id="more-rounded" 
             placeholder="More rounded"
             cssClass="rounded-lg"
             floatLabelType="Auto"
             type="text">
</ejs-textbox>
```

**CSS (wwwroot/css/custom.css):**
```css
.rounded ej2-textbox {
    border-radius: 6px;
}

.rounded-lg ej2-textbox {
    border-radius: 12px;
}
```

---

## Disabled State

Disable the TextBox to prevent user interaction:

**Razor View (CSHTML):**
```html
<ejs-textbox id="disabled" 
             placeholder="This is disabled"
             value="Disabled content"
             enabled="false"
             type="text">
</ejs-textbox>
```

**Visual:**
```
┌────────────────────────────────┐
│ Disabled content        [grayed]│
└────────────────────────────────┘
```

---

## Groups

### Input Group: Icon + TextBox + Button

Create a group with icon, input, and button:

**Razor View (CSHTML):**
```html
<div class="input-group">
    <span class="input-group-text">
        <span class="e-icons e-search"></span>
    </span>
    
    <ejs-textbox id="search" 
                 placeholder="Search..."
                 floatLabelType="Never"
                 type="text">
    </ejs-textbox>
    
    <button class="btn btn-outline-secondary" type="button">
        Search
    </button>
</div>
```

**Visual:**
```
┌────┬──────────────────────┬────────┐
│ 🔍 │ search...            │ Search │
└────┴──────────────────────┴────────┘
```

### Multiple TextBox Group

Group multiple related inputs:

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label class="form-label">Date Range</label>
    
    <div class="row">
        <div class="col-md-6">
            <ejs-textbox id="startDate" 
                         placeholder="Start Date"
                         floatLabelType="Auto"
                         type="date">
            </ejs-textbox>
        </div>
        
        <div class="col-md-6">
            <ejs-textbox id="endDate" 
                         placeholder="End Date"
                         floatLabelType="Auto"
                         type="date">
            </ejs-textbox>
        </div>
    </div>
</div>
```

---

## Examples

### Subscription Form with Features

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Subscribe";
}

<div class="container mt-5">
    <div class="card" style="max-width: 500px; margin: 0 auto;">
        <div class="card-body">
            <h3 class="card-title">Subscribe to Newsletter</h3>

            <form asp-action="Subscribe" method="post">
                <!-- Email with search icon prepend -->
                <div class="form-group mb-3">
                    <label class="form-label">Email Address</label>
                    <ejs-textbox id="email" 
                                 name="email"
                                 placeholder="your@email.com"
                                 floatLabelType="Auto"
                                 prependTemplate="emailIcon"
                                 type="email">
                    </ejs-textbox>
                </div>

                <!-- First Name with clear button -->
                <div class="form-group mb-3">
                    <label class="form-label">First Name</label>
                    <ejs-textbox id="firstName" 
                                 name="firstName"
                                 placeholder="First Name"
                                 floatLabelType="Always"
                                 showClearButton="true"
                                 type="text">
                    </ejs-textbox>
                </div>

                <!-- Last Name with clear button -->
                <div class="form-group mb-4">
                    <label class="form-label">Last Name</label>
                    <ejs-textbox id="lastName" 
                                 name="lastName"
                                 placeholder="Last Name"
                                 floatLabelType="Always"
                                 showClearButton="true"
                                 type="text">
                    </ejs-textbox>
                </div>

                <button type="submit" class="btn btn-primary w-100">
                    Subscribe
                </button>
            </form>
        </div>
    </div>
</div>

<script>
    function emailIcon() {
        return '<span class="e-icons e-mail me-2"></span>';
    }
</script>
```

### Search Bar with Group

**Razor View (CSHTML):**
```html
<div class="navbar-search">
    <div class="input-group input-group-lg">
        <span class="input-group-text bg-light">
            <span class="e-icons e-search"></span>
        </span>
        
        <ejs-textbox id="globalSearch" 
                     placeholder="Search products, articles, help..."
                     floatLabelType="Never"
                     showClearButton="true"
                     type="text">
        </ejs-textbox>
        
        <button class="btn btn-light" type="button">
            <span class="e-icons e-arrow-right"></span>
        </button>
    </div>
</div>

<style>
    .navbar-search {
        max-width: 500px;
        margin: 20px auto;
    }
    
    .input-group-lg ej2-textbox {
        font-size: 18px;
    }
</style>
```

### Login Form with Multiple Features

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Login";
}

<div class="container mt-5">
    <div class="card" style="max-width: 400px; margin: 0 auto;">
        <div class="card-body">
            <h3 class="card-title text-center mb-4">Login</h3>

            <form asp-action="Login" method="post">
                <!-- Username with icon -->
                <div class="form-group mb-3">
                    <ejs-textbox id="username" 
                                 name="username"
                                 placeholder="Username"
                                 floatLabelType="Auto"
                                 prependTemplate="userIcon"
                                 type="text">
                    </ejs-textbox>
                </div>

                <!-- Password with visibility toggle -->
                <div class="form-group mb-4">
                    <ejs-textbox id="password" 
                                 name="password"
                                 placeholder="Password"
                                 floatLabelType="Auto"
                                 prependTemplate="lockIcon"
                                 appendTemplate="visibilityToggle"
                                 type="password">
                    </ejs-textbox>
                </div>

                <button type="submit" class="btn btn-primary w-100">
                    Sign In
                </button>

                <div class="text-center mt-3">
                    <a href="/forgot-password" class="text-decoration-none">
                        Forgot password?
                    </a>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    function userIcon() {
        return '<span class="e-icons e-user me-2"></span>';
    }

    function lockIcon() {
        return '<span class="e-icons e-lock me-2"></span>';
    }

    function visibilityToggle() {
        return '<span class="e-icons e-eye cursor-pointer" style="cursor: pointer;" onclick="togglePasswordVisibility()"></span>';
    }

    function togglePasswordVisibility() {
        const input = document.getElementById('password');
        input.type = input.type === 'password' ? 'text' : 'password';
    }
</script>
```

---

## See Also

- `textbox-getting-started.md` — Quick start guide
- `textbox-styling-and-sizing.md` — Sizing and appearance
- `textbox-advanced-features.md` — Advanced patterns
- `textbox-api.md` — Complete API reference
