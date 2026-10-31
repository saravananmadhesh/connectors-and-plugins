# Accessibility – ASP.NET Core RadioButton

## Semantic HTML

Always use proper `<input type="radio">` elements with labels:

**✓ CORRECT:**
```cshtml
<fieldset>
    <legend>Choose Option</legend>
    <ejs-radiobutton id="opt1" name="choice" value="1" label="Option 1"></ejs-radiobutton>
    <ejs-radiobutton id="opt2" name="choice" value="2" label="Option 2"></ejs-radiobutton>
</fieldset>
```

**✗ INCORRECT:**
```cshtml
<div onclick="selectOption(1)">Option 1</div>
<div onclick="selectOption(2)">Option 2</div>
```

---

## Fieldset and Legend

Group radio buttons with `<fieldset>` and provide context with `<legend>`:

```cshtml
<fieldset>
    <legend>Shipping Method</legend>

    <div>
        <ejs-radiobutton id="standard" name="shipping" value="standard" label="Standard (5-7 business days)"></ejs-radiobutton>
    </div>

    <div>
        <ejs-radiobutton id="express" name="shipping" value="express" label="Express (2-3 business days)"></ejs-radiobutton>
    </div>

    <div>
        <ejs-radiobutton id="overnight" name="shipping" value="overnight" label="Overnight"></ejs-radiobutton>
    </div>
</fieldset>
```

---

## WAI-ARIA Attributes

### aria-label

```cshtml
<div role="group" aria-label="Sort Direction">
    <ejs-radiobutton id="asc" name="sort" value="asc" label="Ascending" htmlAttributes="@new { aria_label = \"Ascending\" }"></ejs-radiobutton>

    <ejs-radiobutton id="desc" name="sort" value="desc" label="Descending" htmlAttributes="@new { aria_label = \"Descending\" }"></ejs-radiobutton>
</div>
```

### aria-disabled

```cshtml
<ejs-radiobutton 
    id="old" 
    name="option" 
    value="old" 
    disabled="true" 
    htmlAttributes="@new { aria_disabled = \"true\" }"
    label="Disabled Option">
</ejs-radiobutton>
```

---

## Keyboard Navigation

Radio button groups support:
- **Tab** — Navigate to next focused element
- **Arrow Keys** — Cycle through radio buttons (native browser behavior)
- **Space** — Toggle selected radio button

---

## Focus Management

```cshtml
<div role="group" aria-label="View Options">
    <ejs-radiobutton id="list" name="view" value="list" checked="true" tabindex="0" label="List View"></ejs-radiobutton>

    <ejs-radiobutton id="grid" name="view" value="grid" tabindex="-1" label="Grid View"></ejs-radiobutton>

    <ejs-radiobutton id="table" name="view" value="table" tabindex="-1" label="Table View"></ejs-radiobutton>
</div>

<style>
    input[type="radio"]:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
    ```cshtml
    <fieldset>
        <legend>Payment Method</legend>

        <div class="radio-group">
            <ejs-radiobutton id="credit" name="payment" value="credit" checked="true" label="Credit Card" htmlAttributes="@new { aria_describedby = \"creditDesc\" }"></ejs-radiobutton>
            <span id="creditDesc" class="radio-description">Visa, Mastercard, or Amex</span>
        </div>

        <div class="radio-group">
            <ejs-radiobutton id="paypal" name="payment" value="paypal" label="PayPal" htmlAttributes="@new { aria_describedby = \"paypalDesc\" }"></ejs-radiobutton>
            <span id="paypalDesc" class="radio-description">Pay securely with your PayPal account</span>
        </div>

        <div class="radio-group">
            <ejs-radiobutton id="bank" name="payment" value="bank" label="Bank Transfer" htmlAttributes="@new { aria_describedby = \"bankDesc\" }"></ejs-radiobutton>
            <span id="bankDesc" class="radio-description">Direct bank account transfer</span>
        </div>
    </fieldset>
    <div class="radio-group">
        <input type="radio" id="bank" name="payment" value="bank" />
        <label for="bank">
            <span class="radio-label">Bank Transfer</span>
            <span class="radio-description">Direct bank account transfer</span>
        </label>
    </div>
</fieldset>

<style>
    fieldset {
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 16px;
        margin: 16px 0;
    }
    
    legend {
        padding: 0 8px;
        font-weight: bold;
    }
    
    .radio-group {
        margin: 12px 0;
    }
    
    .radio-label {
        font-weight: 500;
    }
    
    .radio-description {
        display: block;
        font-size: 12px;
        color: #666;
    }
    
    input[type="radio"]:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
    }
</style>
```

---

## See Also

- [RadioButton Getting Started](radiobutton-getting-started.md)
- [RadioButton Features and State](radiobutton-features-and-state.md)
- [RadioButton Label and Size](radiobutton-label-and-size.md)
