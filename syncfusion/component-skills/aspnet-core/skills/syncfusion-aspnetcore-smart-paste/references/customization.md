# Smart Paste Button Customization

## Overview

The Smart Paste Button inherits all Syncfusion Button component properties, allowing complete customization of appearance, behavior, and styling. Customize text, icons, CSS classes, state, and events to match your application's design system.

## Basic Button Properties

### Content and Text

```cshtml
<!-- Custom Button Text -->
<ejs-smartpaste id="smartPaste1" content="Paste Data"></ejs-smartpaste>

<!-- Icon with Text -->
<ejs-smartpaste id="smartPaste2" 
                content="Smart Paste" 
                iconCss="e-icons e-paste">
</ejs-smartpaste>

<!-- Icon Only -->
<ejs-smartpaste id="smartPaste3" 
                iconCss="e-icons e-paste"
                title="Smart Paste from Clipboard">
</ejs-smartpaste>
```

### CSS Classes and Styling

```cshtml
<!-- Primary Button -->
<ejs-smartpaste id="smartPaste1" 
                content="Smart Paste" 
                cssClass="e-primary">
</ejs-smartpaste>

<!-- Success Button -->
<ejs-smartpaste id="smartPaste2" 
                content="Paste Data" 
                cssClass="e-success">
</ejs-smartpaste>

<!-- Danger Button -->
<ejs-smartpaste id="smartPaste3" 
                content="Paste Data" 
                cssClass="e-danger">
</ejs-smartpaste>

<!-- Custom CSS Classes -->
<ejs-smartpaste id="smartPaste4" 
                content="Smart Paste" 
                cssClass="e-primary custom-paste-button">
</ejs-smartpaste>
```

### Button Variants

```cshtml
<!-- Outlined Button -->
<ejs-smartpaste id="smartPaste1" 
                content="Smart Paste" 
                cssClass="e-outline">
</ejs-smartpaste>

<!-- Rounded Button -->
<ejs-smartpaste id="smartPaste2" 
                content="Smart Paste" 
                cssClass="e-round">
</ejs-smartpaste>

<!-- Flat Button -->
<ejs-smartpaste id="smartPaste3" 
                content="Smart Paste" 
                cssClass="e-flat">
</ejs-smartpaste>

<!-- Combined Variants -->
<ejs-smartpaste id="smartPaste4" 
                content="Smart Paste" 
                cssClass="e-primary e-outline e-round">
</ejs-smartpaste>
```

### Button States

```cshtml
<!-- Disabled Button -->
<ejs-smartpaste id="smartPaste1" 
                content="Smart Paste" 
                disabled="true">
</ejs-smartpaste>

<!-- Toggle Button -->
<ejs-smartpaste id="smartPaste2" 
                content="Smart Paste" 
                is-toggle="true">
</ejs-smartpaste>

<!-- With Tooltip -->
<ejs-smartpaste id="smartPaste3" 
                content="Smart Paste" 
                title="Click to auto-fill form from clipboard">
</ejs-smartpaste>
```

## Size Customization

```cshtml
<!-- Small Button -->
<ejs-smartpaste id="smartPaste1" 
                content="Paste" 
                cssClass="e-small">
</ejs-smartpaste>

<!-- Normal Button (default) -->
<ejs-smartpaste id="smartPaste2" 
                content="Smart Paste">
</ejs-smartpaste>

<!-- Large Button -->
<ejs-smartpaste id="smartPaste3" 
                content="Smart Paste Data" 
                cssClass="e-lg">
</ejs-smartpaste>

<!-- Extra Large Button -->
<ejs-smartpaste id="smartPaste4" 
                content="Smart Paste Data" 
                cssClass="e-xl">
</ejs-smartpaste>
```

## Icon Customization

### Built-in Icons

```cshtml
<!-- Clipboard Icon -->
<ejs-smartpaste id="smartPaste1" 
                content="Smart Paste" 
                iconCss="e-icons e-paste">
</ejs-smartpaste>

<!-- Upload Icon -->
<ejs-smartpaste id="smartPaste2" 
                content="Paste Data" 
                iconCss="e-icons e-upload">
</ejs-smartpaste>

<!-- Import Icon -->
<ejs-smartpaste id="smartPaste3" 
                content="Import Data" 
                iconCss="e-icons e-import">
</ejs-smartpaste>

<!-- Refresh Icon -->
<ejs-smartpaste id="smartPaste4" 
                content="Refresh Data" 
                iconCss="e-icons e-refresh">
</ejs-smartpaste>
```

### Icon Position

```cshtml
<!-- Icon Before Text (default) -->
<ejs-smartpaste id="smartPaste1" 
                content="Smart Paste" 
                iconCss="e-icons e-paste"
                icon-position="Left">
</ejs-smartpaste>

<!-- Icon After Text -->
<ejs-smartpaste id="smartPaste2" 
                content="Smart Paste" 
                iconCss="e-icons e-paste"
                icon-position="Right">
</ejs-smartpaste>
```

## Custom CSS Styling

### Global Stylesheet

```css
/* Custom Smart Paste Button Styling */
.custom-paste-button {
    border-radius: 8px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.custom-paste-button:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
}

.custom-paste-button:active {
    transform: translateY(0);
}
```

### Inline Styles

```cshtml
<ejs-smartpaste id="smartPaste1" 
                content="Smart Paste" 
                cssClass="e-primary"
                style="height: 48px; font-size: 16px; border-radius: 6px;">
</ejs-smartpaste>
```

## Complete Customization Examples

### Modern Minimal Design

```cshtml
<ejs-smartpaste id="smartPaste" 
                content="Smart Paste"
                cssClass="e-outline e-round custom-minimal"
                iconCss="e-icons e-paste"
                title="Auto-fill form from clipboard">
</ejs-smartpaste>

<style>
    .custom-minimal {
        padding: 10px 24px;
        border-width: 2px;
        font-weight: 500;
    }
    
    .custom-minimal:hover {
        background-color: #f5f5f5;
    }
</style>
```

### Colorful Material Design

```cshtml
<ejs-smartpaste id="smartPaste" 
                content="Smart Paste"
                cssClass="e-primary e-lg custom-material"
                iconCss="e-icons e-paste">
</ejs-smartpaste>

<style>
    .custom-material {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 4px;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        color: white;
        font-weight: 500;
    }
    
    .custom-material:hover {
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
</style>
```

### Professional Business Style

```cshtml
<ejs-smartpaste id="smartPaste" 
                content="Paste Form Data"
                cssClass="e-primary custom-business"
                iconCss="e-icons e-paste"
                title="Auto-fill all form fields from clipboard data">
</ejs-smartpaste>

<style>
    .custom-business {
        padding: 12px 28px;
        background-color: #0066cc;
        border: 1px solid #004a99;
        border-radius: 3px;
        color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: 600;
        font-size: 14px;
        letter-spacing: 0.3px;
    }
    
    .custom-business:hover {
        background-color: #004a99;
        border-color: #003366;
    }
    
    .custom-business:active {
        background-color: #003366;
    }
</style>
```

## Complete Form with Customized Smart Paste

```cshtml
<form method="post" class="form-container">
    <div class="form-header">
        <h2>Customer Information</h2>
        <p class="form-instructions">
            Enter customer details manually or use Smart Paste to auto-fill from clipboard
        </p>
    </div>

    <div class="form-content">
        <div class="form-group">
            <label for="fullName">Full Name:</label>
            <input id="fullName" name="fullName" class="form-control"
                   data-smartpaste-description="Full name (FirstName LastName)" />
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input id="email" name="email" type="email" class="form-control"
                   data-smartpaste-description="Valid email address" />
        </div>

        <div class="form-group">
            <label for="phone">Phone:</label>
            <input id="phone" name="phone" type="tel" class="form-control"
                   data-smartpaste-description="Phone number" />
        </div>

        <div class="form-actions">
            <ejs-smartpaste id="smartPaste" 
                            content="Smart Paste" 
                            cssClass="e-primary custom-paste"
                            iconCss="e-icons e-paste">
            </ejs-smartpaste>

            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="reset" class="btn btn-secondary">Clear</button>
        </div>
    </div>
</form>

<style>
    .form-container {
        max-width: 500px;
        margin: 20px auto;
        padding: 30px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .form-header h2 {
        margin-bottom: 5px;
        color: #333;
    }

    .form-instructions {
        color: #666;
        font-size: 14px;
        margin-bottom: 20px;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        margin-bottom: 8px;
        font-weight: 600;
        color: #333;
    }

    .form-control {
        width: 100%;
        padding: 10px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
    }

    .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 30px;
    }

    .custom-paste {
        flex: 1;
        background-color: #28a745;
        border-color: #20c997;
    }

    .custom-paste:hover {
        background-color: #218838;
    }
</style>
```

## Theme Support

Smart Paste inherits button styling from the active Syncfusion theme:

- **Fluent2** - Modern Microsoft design
- **Bootstrap4** - Bootstrap 4 compatibility
- **Bootstrap5** - Bootstrap 5 compatibility
- **Tailwind** - Tailwind CSS design
- **Material** - Google Material Design

Switch themes by changing the CSS link:

```html
<!-- Fluent2 Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent2.css" />

<!-- Bootstrap5 Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/bootstrap5.css" />

<!-- Material Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
```

## Accessibility

```cshtml
<!-- Add accessibility attributes -->
<ejs-smartpaste id="smartPaste" 
                content="Smart Paste"
                aria-label="Smart Paste - Automatically fills form fields from clipboard data"
                title="Auto-fill form from clipboard">
</ejs-smartpaste>
```

## Reference
https://ej2.syncfusion.com/aspnetcore/documentation/smart-paste/customization