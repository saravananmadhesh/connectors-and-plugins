# NumericTextBox Adornments & Styling in ASP.NET Core

This guide covers styling, customization, accessibility, and prefix/suffix adornments for NumericTextBox in ASP.NET Core.

## Table of Contents
- [CSS Classes](#css-classes)
- [Styling States](#styling-states)
- [Customization](#customization)
- [Accessibility](#accessibility)
- [Complete Examples](#complete-examples)

## CSS Classes

Use the `cssClass` attribute to apply predefined or custom CSS classes:

### Predefined Size Classes

```html
<!-- Small NumericTextBox -->
<ejs-numerictextbox id="small" value="10" cssClass="e-small">
</ejs-numerictextbox>

<!-- Default size -->
<ejs-numerictextbox id="default" value="10">
</ejs-numerictextbox>

<!-- Large/Bigger NumericTextBox -->
<ejs-numerictextbox id="bigger" value="10" cssClass="e-bigger">
</ejs-numerictextbox>
```

---

## Styling States

### State Classes

```html
<!-- Success State -->
<ejs-numerictextbox id="success" value="10" cssClass="e-success">
</ejs-numerictextbox>

<!-- Warning State -->
<ejs-numerictextbox id="warning" value="10" cssClass="e-warning">
</ejs-numerictextbox>

<!-- Error State -->
<ejs-numerictextbox id="error" value="10" cssClass="e-error">
</ejs-numerictextbox>

<!-- Disabled (use enabled="false" instead of class) -->
<ejs-numerictextbox id="disabled" value="10" enabled="false">
</ejs-numerictextbox>

<!-- Read-only (use readonly="true" instead of class) -->
<ejs-numerictextbox id="readonly" value="10" readonly="true">
</ejs-numerictextbox>
```

---

## Customization

### Custom CSS Classes

Define your own CSS classes and apply them via `cssClass`:

```html
<style>
    .custom-numeric {
        background-color: #f0f8ff;
        border-radius: 8px;
    }
    
    .highlight-numeric {
        border: 2px solid #4CAF50;
        box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
    }
</style>

<!-- With custom styling -->
<ejs-numerictextbox id="custom" value="10" cssClass="custom-numeric highlight-numeric">
</ejs-numerictextbox>
```

### Theme Customization

Apply different themes by changing the CDN CSS in `_Layout.cshtml`:

```html
<!-- Material Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />

<!-- Bootstrap 5 Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/bootstrap5.css" />

<!-- Fluent Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/fluent.css" />

<!-- Tailwind Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/tailwind.css" />
```

---

## Accessibility

### ARIA Labels

Use `html-attributes` to add accessibility attributes:

```html
<ejs-numerictextbox id="age" 
    placeholder="Enter your age">
</ejs-numerictextbox>
<small id="age-help">Enter a value between 0 and 150</small>
```

### Form Integration

Use proper form structure with labels:

```html
<form method="post" action="/submit">
    <div style="margin-bottom: 15px;">
        <label for="quantity">Order Quantity <span style="color: red;">*</span></label>
        <ejs-numerictextbox id="quantity"
            min="1"
            max="999"
            required="true"
            aria-required="true">
        </ejs-numerictextbox>
        <small>Enter quantity between 1 and 999</small>
    </div>

    <button type="submit">Place Order</button>
</form>
```

### Keyboard Navigation

NumericTextBox supports keyboard interaction:

- **Up Arrow** - Increment value by step amount
- **Down Arrow** - Decrement value by step amount
- **Page Up** - Increment by larger step
- **Page Down** - Decrement by larger step
- **Home** - Set to minimum value
- **End** - Set to maximum value
- **Tab** - Move to next field
- **Shift+Tab** - Move to previous field

```html
<!-- Keyboard navigation enabled by default -->
<ejs-numerictextbox id="numericTextBox" value="10" step="1">
</ejs-numerictextbox>
```

---

## Complete Examples

### Example 1: Form with Validation Styling

```html
<!-- Views/Products/Create.cshtml -->
<style>
    .form-group {
        margin-bottom: 20px;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 5px;
        font-weight: 500;
    }
    
    .form-group .e-error {
        border-color: #dc3545 !important;
    }
    
    .form-group .e-success {
        border-color: #28a745 !important;
    }
    
    .help-text {
        font-size: 0.875rem;
        color: #666;
        margin-top: 5px;
    }
</style>

<div style="max-width: 500px;">
    <h2>Product Information</h2>
    
    <form id="productForm">
        <!-- Product Price -->
        <div class="form-group">
            <label for="price">Product Price (USD) <span style="color: red;">*</span></label>
            <ejs-numerictextbox id="price"
                format="c2"
                currency="USD"
                min="0.01"
                max="99999.99"
                decimals="2"
                strictMode="true"
                placeholder="0.00"
                required="true">
            </ejs-numerictextbox>
            <div class="help-text">Enter price in US dollars</div>
        </div>

        <!-- Stock Quantity -->
        <div class="form-group">
            <label for="stock">Stock Quantity <span style="color: red;">*</span></label>
            <ejs-numerictextbox id="stock"
                min="0"
                max="10000"
                decimals="0"
                strictMode="true"
                step="1"
                placeholder="0"
                showSpinButton="true"
                required="true">
            </ejs-numerictextbox>
            <div class="help-text">Enter quantity between 0 and 10000</div>
        </div>

        <!-- Discount Percentage -->
        <div class="form-group">
            <label for="discount">Discount %</label>
            <ejs-numerictextbox id="discount"
                format="p2"
                min="0"
                max="1"
                step="0.05"
                decimals="2"
                strictMode="true"
                placeholder="0%">
            </ejs-numerictextbox>
            <div class="help-text">Enter discount as percentage (0-100%)</div>
        </div>

        <button type="submit" class="btn btn-primary">Save Product</button>
    </form>
</div>

@section scripts {
    <ejs-scripts></ejs-scripts>
    <script>
        document.getElementById('productForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const price = document.getElementById('price').ej2_instances[0].value;
            const stock = document.getElementById('stock').ej2_instances[0].value;
            const discount = document.getElementById('discount').ej2_instances[0].value;
            
            console.log('Form submitted:', { price, stock, discount });
        });
    </script>
}
```

### Example 2: Dashboard with Multiple Inputs

```html
<!-- Dashboard with different NumericTextBox types -->
<style>
    .dashboard-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        padding: 20px;
    }
    
    .card {
        border: 1px solid #ddd;
        border-radius: 8px;
        padding: 15px;
        background-color: #f9f9f9;
    }
    
    .card h3 {
        margin-top: 0;
        color: #333;
    }
</style>

<div class="dashboard-grid">
    <!-- Sales Card -->
    <div class="card">
        <h3>Monthly Sales</h3>
        <label>Total Sales (USD):</label>
        <ejs-numerictextbox id="monthlySales"
            value="45000"
            format="c0"
            currency="USD"
            readonly="true"
            enabled="true">
        </ejs-numerictextbox>
    </div>

    <!-- Conversion Rate Card -->
    <div class="card">
        <h3>Conversion Metrics</h3>
        <label>Conversion Rate (%):</label>
        <ejs-numerictextbox id="conversionRate"
            value="0.045"
            format="p2"
            readonly="true">
        </ejs-numerictextbox>
    </div>

    <!-- Target Budget Card -->
    <div class="card">
        <h3>Budget Allocation</h3>
        <label>Target Budget (USD):</label>
        <ejs-numerictextbox id="targetBudget"
            value="100000"
            format="c0"
            currency="USD"
            min="0"
            max="1000000"
            step="10000"
            placeholder="Enter budget">
        </ejs-numerictextbox>
    </div>
</div>
```

### Example 3: Responsive NumericTextBox

```html
<style>
    @media (max-width: 768px) {
        .input-container {
            width: 100%;
        }
        
        /* Larger touch targets on mobile -->
        .input-container .e-numerictextbox {
            min-height: 44px;
        }
    }
    
    .input-container {
        margin-bottom: 20px;
    }
    
    .input-container label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
    }
</style>

<div class="input-container">
    <label for="mobileQuantity">Quantity:</label>
    <ejs-numerictextbox id="mobileQuantity"
        value="1"
        min="1"
        max="50"
        step="1"
        decimals="0"
        showSpinButton="true"
        cssClass="responsive-input">
    </ejs-numerictextbox>
</div>
```

---

## Related Topics
- [Getting Started](numeric-textbox-getting-started.md)
- [API Reference](numeric-textbox-api.md)
- [Formats & Validation](numeric-textbox-formats-and-validation.md)
