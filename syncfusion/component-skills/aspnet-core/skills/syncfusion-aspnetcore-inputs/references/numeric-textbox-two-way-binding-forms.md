# Two-Way Binding & Forms — ASP.NET Core NumericTextBox

This reference explains how to use `NumericTextBoxComponent` in ASP.NET Core forms, handle validation, and implement model binding patterns.

## Table of Contents
- [Overview](#overview)
- [Model Binding](#model-binding)
- [Form Integration](#form-integration)
- [Validation Patterns](#validation-patterns)
- [Examples](#examples)
- [Data Annotations](#data-annotations)

---

## Overview

The NumericTextBox integrates seamlessly with ASP.NET Core's model binding system through the `name` attribute and data annotations for validation.

---

## Model Binding

### Basic Model Binding

**Model (Models/Product.cs):**
```csharp
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreApp.Models
{
    public class Product
    {
        public int Id { get; set; }
        
        public string Name { get; set; }
        
        [Range(0.01, 999999.99)]
        [Display(Name = "Price")]
        public decimal Price { get; set; }
        
        [Range(1, 10000)]
        [Display(Name = "Stock Quantity")]
        public int StockQuantity { get; set; }
        
        [Range(0, 100)]
        [Display(Name = "Discount Percentage")]
        public decimal DiscountPercentage { get; set; }
    }
}
```

**Controller (Controllers/ProductController.cs):**
```csharp
using AspNetCoreApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreApp.Controllers
{
    public class ProductController : Controller
    {
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public IActionResult Create(Product product)
        {
            if (ModelState.IsValid)
            {
                // Save to database
                return RedirectToAction("Index");
            }
            
            return View(product);
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            // Fetch from database
            var product = new Product
            {
                Id = id,
                Name = "Sample Product",
                Price = 99.99m,
                StockQuantity = 50,
                DiscountPercentage = 10
            };
            
            return View(product);
        }

        [HttpPost]
        public IActionResult Edit(int id, Product product)
        {
            if (ModelState.IsValid)
            {
                // Update database
                return RedirectToAction("Index");
            }
            
            return View(product);
        }
    }
}
```

**Razor View (Views/Product/Create.cshtml):**
```html
@model AspNetCoreApp.Models.Product

@{
    ViewBag.Title = "Create Product";
}

<h2>Create Product</h2>

<form asp-action="Create" method="post">
    <div asp-validation-summary="All" class="alert alert-danger"></div>

    <div class="form-group">
        <label asp-for="Name"></label>
        <input asp-for="Name" class="form-control" />
        <span asp-validation-for="Name" class="text-danger"></span>
    </div>

    <div class="form-group">
        <label asp-for="Price"></label>
        <ejs-numerictextbox id="price" 
                            asp-for="Price"
                            decimals="2"
                            format="c2"
                            min="0.01"
                            max="999999.99"
                            validateDecimalOnType="true">
        </ejs-numerictextbox>
        <span asp-validation-for="Price" class="text-danger"></span>
    </div>

    <div class="form-group">
        <label asp-for="StockQuantity"></label>
        <ejs-numerictextbox id="stock" 
                            asp-for="StockQuantity"
                            decimals="0"
                            min="1"
                            max="10000"
                            step="1">
        </ejs-numerictextbox>
        <span asp-validation-for="StockQuantity" class="text-danger"></span>
    </div>

    <div class="form-group">
        <label asp-for="DiscountPercentage"></label>
        <ejs-numerictextbox id="discount" 
                            asp-for="DiscountPercentage"
                            decimals="2"
                            min="0"
                            max="100"
                            suffix="%">
        </ejs-numerictextbox>
        <span asp-validation-for="DiscountPercentage" class="text-danger"></span>
    </div>

    <button type="submit" class="btn btn-primary">Create</button>
    <a asp-action="Index" class="btn btn-secondary">Cancel</a>
</form>
```

---

## Form Integration

### Complete Product Form

**Razor View (Views/Product/Edit.cshtml):**
```html
@model AspNetCoreApp.Models.Product

@{
    ViewBag.Title = "Edit Product";
}

<div class="container mt-5">
    <h2>Edit Product</h2>
    
    <form asp-action="Edit" asp-route-id="@Model.Id" method="post" class="was-validated">
        <div asp-validation-summary="All" class="alert alert-danger" role="alert"></div>

        <div class="form-group mb-3">
            <label asp-for="Name" class="form-label">Product Name *</label>
            <input asp-for="Name" class="form-control" required />
            <span asp-validation-for="Name" class="invalid-feedback d-block"></span>
        </div>

        <div class="form-row">
            <div class="form-group col-md-6 mb-3">
                <label asp-for="Price" class="form-label">Price (USD) *</label>
                <ejs-numerictextbox id="price" 
                                    asp-for="Price"
                                    decimals="2"
                                    format="c2"
                                    min="0.01"
                                    max="999999.99"
                                    validateDecimalOnType="true"
                                    floatLabelType="Auto">
                </ejs-numerictextbox>
                <span asp-validation-for="Price" class="invalid-feedback"></span>
            </div>

            <div class="form-group col-md-6 mb-3">
                <label asp-for="StockQuantity" class="form-label">Stock Quantity *</label>
                <ejs-numerictextbox id="stock" 
                                    asp-for="StockQuantity"
                                    decimals="0"
                                    min="1"
                                    max="10000"
                                    step="1"
                                    showSpinButton="true">
                </ejs-numerictextbox>
                <span asp-validation-for="StockQuantity" class="invalid-feedback"></span>
            </div>
        </div>

        <div class="form-group mb-3">
            <label asp-for="DiscountPercentage" class="form-label">Discount %</label>
            <ejs-numerictextbox id="discount" 
                                asp-for="DiscountPercentage"
                                decimals="2"
                                min="0"
                                max="100"
                                suffix="%">
            </ejs-numerictextbox>
            <span asp-validation-for="DiscountPercentage" class="invalid-feedback"></span>
        </div>

        <div class="form-group">
            <button type="submit" class="btn btn-primary">Save Changes</button>
            <a asp-action="Index" class="btn btn-secondary">Cancel</a>
        </div>
    </form>
</div>

@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}
```

---

## Validation Patterns

### Data Annotations

Use `[Range]`, `[Required]`, and custom validation attributes.

**Model with Validation (Models/OrderItem.cs):**
```csharp
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreApp.Models
{
    public class OrderItem
    {
        [Required(ErrorMessage = "Quantity is required")]
        [Range(1, 1000, ErrorMessage = "Quantity must be between 1 and 1000")]
        public int Quantity { get; set; }

        [Required(ErrorMessage = "Unit price is required")]
        [Range(0.01, 99999.99, ErrorMessage = "Unit price must be between $0.01 and $99,999.99")]
        [Display(Name = "Unit Price")]
        public decimal UnitPrice { get; set; }

        public decimal Total => Quantity * UnitPrice;
    }
}
```

**Razor View with Validation (Views/Order/Add.cshtml):**
```html
@model AspNetCoreApp.Models.OrderItem

<form asp-action="Add" method="post">
    <div asp-validation-summary="ModelOnly" class="alert alert-danger"></div>

    <div class="form-group">
        <label asp-for="Quantity"></label>
        <ejs-numerictextbox id="quantity" 
                            asp-for="Quantity"
                            decimals="0"
                            min="1"
                            max="1000"
                            validateDecimalOnType="true">
        </ejs-numerictextbox>
        <span asp-validation-for="Quantity" class="text-danger"></span>
    </div>

    <div class="form-group">
        <label asp-for="UnitPrice"></label>
        <ejs-numerictextbox id="unitprice" 
                            asp-for="UnitPrice"
                            decimals="2"
                            format="c2"
                            min="0.01"
                            max="99999.99">
        </ejs-numerictextbox>
        <span asp-validation-for="UnitPrice" class="text-danger"></span>
    </div>

    <div class="form-group">
        <label>Total</label>
        <input type="text" id="total" readonly class="form-control" />
    </div>

    <button type="submit" class="btn btn-primary">Add Item</button>
</form>
```

**JavaScript for Dynamic Calculation (wwwroot/js/order.js):**
```javascript
const quantityNumeric = document.getElementById('quantity').ej2_instances[0];
const unitPriceNumeric = document.getElementById('unitprice').ej2_instances[0];
const totalField = document.getElementById('total');

function updateTotal() {
  const qty = quantityNumeric.value || 0;
  const price = unitPriceNumeric.value || 0;
  const total = qty * price;
  totalField.value = `$${total.toFixed(2)}`;
}

// Listen for changes
quantityNumeric.change = updateTotal;
unitPriceNumeric.change = updateTotal;

// Initial calculation
updateTotal();
```

### Custom Validation

**Controller with Custom Validation (Controllers/PaymentController.cs):**
```csharp
using AspNetCoreApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace AspNetCoreApp.Controllers
{
    public class PaymentController : Controller
    {
        [HttpPost]
        public IActionResult ProcessPayment([Bind("Amount")] decimal amount)
        {
            // Custom server-side validation
            if (amount < 0.01m)
            {
                ModelState.AddModelError("Amount", "Amount must be at least $0.01");
            }

            if (amount > 100000m)
            {
                ModelState.AddModelError("Amount", "Amount cannot exceed $100,000 for this transaction type");
            }

            if (!ModelState.IsValid)
            {
                return View("Payment");
            }

            // Process payment
            return RedirectToAction("Success");
        }
    }
}
```

---

## Data Annotations

### Common Validation Attributes

**Model (Models/Invoice.cs):**
```csharp
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreApp.Models
{
    public class Invoice
    {
        [Required(ErrorMessage = "Invoice number is required")]
        public string InvoiceNumber { get; set; }

        [Required]
        [Range(0.01, 999999.99, ErrorMessage = "Subtotal must be between $0.01 and $999,999.99")]
        [Display(Name = "Subtotal")]
        public decimal Subtotal { get; set; }

        [Range(0, 100, ErrorMessage = "Tax rate must be between 0% and 100%")]
        [Display(Name = "Tax Rate (%)")]
        public decimal TaxRate { get; set; }

        [Range(0, 999999.99)]
        [Display(Name = "Discount")]
        public decimal Discount { get; set; }

        public decimal Total => (Subtotal * (1 + TaxRate / 100)) - Discount;
    }
}
```

---

## Examples

### Complete Invoice Form

**Razor View (Views/Invoice/Create.cshtml):**
```html
@model AspNetCoreApp.Models.Invoice

<div class="container mt-5">
    <h2>Create Invoice</h2>

    <form asp-action="Create" method="post">
        <div asp-validation-summary="All" class="alert alert-danger"></div>

        <div class="form-group mb-3">
            <label asp-for="InvoiceNumber"></label>
            <input asp-for="InvoiceNumber" class="form-control" />
            <span asp-validation-for="InvoiceNumber" class="text-danger"></span>
        </div>

        <div class="form-group mb-3">
            <label asp-for="Subtotal"></label>
            <ejs-numerictextbox id="subtotal" 
                                asp-for="Subtotal"
                                decimals="2"
                                format="c2"
                                min="0.01"
                                validateDecimalOnType="true"
                                onchange="updateTotal()">
            </ejs-numerictextbox>
            <span asp-validation-for="Subtotal" class="text-danger"></span>
        </div>

        <div class="form-group mb-3">
            <label asp-for="TaxRate"></label>
            <ejs-numerictextbox id="taxrate" 
                                asp-for="TaxRate"
                                decimals="2"
                                min="0"
                                max="100"
                                suffix="%"
                                onchange="updateTotal()">
            </ejs-numerictextbox>
            <span asp-validation-for="TaxRate" class="text-danger"></span>
        </div>

        <div class="form-group mb-3">
            <label asp-for="Discount"></label>
            <ejs-numerictextbox id="discount" 
                                asp-for="Discount"
                                decimals="2"
                                format="c2"
                                min="0"
                                onchange="updateTotal()">
            </ejs-numerictextbox>
            <span asp-validation-for="Discount" class="text-danger"></span>
        </div>

        <div class="form-group mb-3">
            <label>Total</label>
            <input type="text" id="total" readonly class="form-control" />
        </div>

        <button type="submit" class="btn btn-primary">Create Invoice</button>
    </form>
</div>

@section Scripts {
    <partial name="_ValidationScriptsPartial" />
    
    <script>
        function updateTotal() {
            const subtotalObj = document.getElementById('subtotal').ej2_instances[0];
            const taxrateObj = document.getElementById('taxrate').ej2_instances[0];
            const discountObj = document.getElementById('discount').ej2_instances[0];

            const subtotal = subtotalObj.value || 0;
            const taxRate = taxrateObj.value || 0;
            const discount = discountObj.value || 0;

            const total = (subtotal * (1 + taxRate / 100)) - discount;
            document.getElementById('total').value = `$${total.toFixed(2)}`;
        }

        // Initial calculation
        updateTotal();
    </script>
}
```

---

## See Also

- `numeric-textbox-api.md` — Complete API reference
- `numeric-textbox-formats-and-validation.md` — Format patterns
- `numeric-textbox-getting-started.md` — Quick start guide
