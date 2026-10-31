# Accessibility – ASP.NET Core Checkbox

## Semantic HTML

Always use proper `<input type="checkbox">` elements with labels:

**✓ CORRECT:**
```cshtml
<div>
    <input type="checkbox" id="terms" name="terms" />
    <label for="terms">I agree to the terms and conditions</label>
</div>
```

**✗ INCORRECT:**
```cshtml
<div class="e-checkbox-wrapper" onclick="toggleCheckbox()">
    Accept Terms
</div>
```

---

## Label Association

Always associate labels with checkbox inputs using `for` attribute:

```cshtml
<label for="newsletter">
    <ejs-checkbox id="newsletter" name="newsletter"></ejs-checkbox>
    Subscribe to our newsletter
</label>
```

---

## WAI-ARIA Attributes

### aria-label

For checkboxes without visible labels:

```cshtml
<ejs-checkbox 
    id="selectAll"
    htmlAttributes="@new { aria_label = 'Select all items' }">
</ejs-checkbox>
```

### aria-disabled

```cshtml
<ejs-checkbox 
    id="disabled" 
    disabled="true"
    htmlAttributes="@new { aria_disabled = 'true' }">
</ejs-checkbox>
```

---

## Keyboard Navigation

Checkboxes support:
- **Tab** — Navigate to checkbox
- **Space** — Toggle checked state

---

## Complete Accessible Example

```cshtml
<fieldset>
    <legend>Email Preferences</legend>
    
    <div class="preference-group">
        <label>
            <input type="checkbox" name="emails" value="news" />
            <span>Receive news and updates</span>
        </label>
    </div>
    
    <div class="preference-group">
        <label>
            <input type="checkbox" name="emails" value="promotions" />
            <span>Receive promotional offers</span>
        </label>
    </div>
    
    <div class="preference-group">
        <label>
            <input type="checkbox" name="emails" value="surveys" />
            <span>Participate in surveys</span>
        </label>
    </div>
</fieldset>

<style>
    .preference-group {
        margin: 12px 0;
    }
    
    input[type="checkbox"]:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
    }
</style>
```

---

## See Also

- [Checkbox Getting Started](checkbox-getting-started.md)
- [Checkbox Features and State](checkbox-features-and-state.md)
- [Checkbox Customization](checkbox-customization.md)
