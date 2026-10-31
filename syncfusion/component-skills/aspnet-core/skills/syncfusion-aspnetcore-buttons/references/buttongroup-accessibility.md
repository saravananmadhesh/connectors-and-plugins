# Accessibility – ASP.NET Core ButtonGroup

## Semantic HTML

Always use proper form elements within button groups:

**✓ CORRECT:**
```cshtml
<div class="e-btn-group">
    <input type="radio" id="opt1" name="choice" value="1" />
    <label for="opt1" class="e-btn">Option 1</label>
    
    <input type="radio" id="opt2" name="choice" value="2" />
    <label for="opt2" class="e-btn">Option 2</label>
</div>
```

**✗ INCORRECT:**
```cshtml
<div class="e-btn-group">
    <div onclick="selectOption(1)">Option 1</div>
    <div onclick="selectOption(2)">Option 2</div>
</div>
```

---

## Keyboard Navigation

Ensure proper keyboard support:

```cshtml
<div class="e-btn-group" role="group" aria-label="View Options">
    <input type="radio" id="list" name="view" value="list" checked />
    <label for="list" class="e-btn">List View</label>
    
    <input type="radio" id="grid" name="view" value="grid" />
    <label for="grid" class="e-btn">Grid View</label>
    
    <input type="radio" id="details" name="view" value="details" />
    <label for="details" class="e-btn">Details View</label>
</div>
```

---

## ARIA Attributes

### role="group"

```cshtml
<div class="e-btn-group" role="group" aria-label="Formatting Options">
    <!-- buttons -->
</div>
```

### aria-label

```cshtml
<div class="e-btn-group">
    <input type="checkbox" id="bold" />
    <label for="bold" class="e-btn" aria-label="Bold text">
        <i class="e-icons e-bold-icon"></i>
    </label>
</div>
```

---

## Focus Management

```cshtml
<div class="e-btn-group">
    <ejs-button id="btn1" tabindex="0" content="First"></ejs-button>
    <ejs-button id="btn2" content="Second"></ejs-button>
    <ejs-button id="btn3" content="Third"></ejs-button>
</div>

<style>
    .e-btn-group .e-btn:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
    }
</style>
```

---

## Complete Accessible Example

```cshtml
<fieldset>
    <legend>Choose Sorting Method</legend>
    
    <div class="e-btn-group" role="group" aria-label="Sort Options">
        <input type="radio" id="asc" name="sort" value="ascending" checked />
        <label for="asc" class="e-btn" aria-label="Sort ascending">
            <i class="e-icons e-sort-asc-icon"></i> Ascending
        </label>
        
        <input type="radio" id="desc" name="sort" value="descending" />
        <label for="desc" class="e-btn" aria-label="Sort descending">
            <i class="e-icons e-sort-desc-icon"></i> Descending
        </label>
    </div>
</fieldset>

<style>
    .e-btn-group .e-btn:focus {
        outline: 2px solid #0066cc;
        outline-offset: 2px;
    }
</style>
```

---

## See Also

- [ButtonGroup Getting Started](buttongroup-getting-started.md)
- [ButtonGroup Selection and Nesting](buttongroup-selection-and-nesting.md)
- [ButtonGroup How-To Patterns](buttongroup-how-to.md)
