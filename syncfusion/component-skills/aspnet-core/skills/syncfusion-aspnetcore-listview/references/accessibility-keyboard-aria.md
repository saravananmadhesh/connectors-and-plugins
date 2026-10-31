# Accessibility and Keyboard Navigation

## Table of Contents
- [Keyboard Navigation](#keyboard-navigation)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [ARIA Attributes](#aria-attributes)
- [EnableRtl Property](#enablertl-property)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [Accessibility Best Practices](#accessibility-best-practices)

## Keyboard Navigation

ListView supports full keyboard navigation without mouse interaction, following WCAG accessibility standards.

### Built-in Keyboard Support

ListView automatically enables keyboard navigation when focused. Use `htmlAttributes` to add accessibility attributes:

```cshtml
@{
    IDictionary<string, object> attributes = new Dictionary<string, object>()
    {
        { "tabindex", "0" },
        { "role", "listbox" }
    };
}

<!-- Keyboard navigation enabled by default -->
<ejs-listview id="list" dataSource="@ViewBag.Items" htmlAttributes="@attributes">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Interaction Pattern:**
1. User tabs to ListView (receives focus outline)
2. Arrow keys navigate through items
3. Enter/Space selects item
4. Additional shortcuts for nested lists

## Keyboard Shortcuts

### Navigation Shortcuts

| Shortcut | Action | Description |
|----------|--------|-------------|
| <kbd>↓</kbd> Arrow Down | Move to next item | Navigate down in list |
| <kbd>↑</kbd> Arrow Up | Move to previous item | Navigate up in list |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Select Item | Select/activate current item |
| <kbd>→</kbd> Arrow Right | Open nested list | If nested list exists, enter it |
| <kbd>←</kbd> Arrow Left | Go back | Return to parent level in nested lists |
| <kbd>Home</kbd> | Go to first item | Jump to top of list |
| <kbd>End</kbd> | Go to last item | Jump to bottom of list |

### Keyboard Navigation Example

```cshtml
<div style="border: 2px solid #2196f3; padding: 10px; margin-bottom: 10px; background-color: #e3f2fd;">
    <p><strong>Keyboard Navigation Instructions:</strong></p>
    <ul>
        <li>Use <kbd>↑</kbd> and <kbd>↓</kbd> arrows to navigate</li>
        <li>Press <kbd>Enter</kbd> or <kbd>Space</kbd> to select</li>
        <li>Press <kbd>→</kbd> to open nested items</li>
        <li>Press <kbd>←</kbd> to go back</li>
    </ul>
</div>

<ejs-listview id="keyboardList" dataSource="@ViewBag.Items">
    <e-listview-fieldsettings id="Id" text="Name" child="SubItems"></e-listview-fieldsettings>
</ejs-listview>
```

## ARIA Attributes

ARIA (Accessible Rich Internet Applications) attributes improve accessibility for screen readers:

### Core ARIA Attributes

ListView automatically includes:

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `role` | "listbox" | Identifies component as list |
| `aria-label` | Component label | Names component for screen readers |
| `aria-selected` | true/false | Indicates selected items |
| `aria-level` | 1, 2, 3... | Hierarchy level in nested lists |

### Adding ARIA Labels

```cshtml
@{
    IDictionary<string, object> customAttribute = new Dictionary<string, object>()
    {
       { "aria-label", "Product List" },
       { "role", "listbox" }
    };
}
<!-- Add descriptive label for accessibility -->
<ejs-listview id="list" dataSource="@ViewBag.Items" 
    htmlAttributes="@customAttribute">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Nested List ARIA

Nested lists automatically get proper `aria-level` values:

```csharp
public class Category
{
    public int Id { get; set; }
    public string Name { get; set; }
    public List<SubCategory> SubItems { get; set; }
}

// aria-level="1" for categories
// aria-level="2" for subcategories
```

```cshtml
<ejs-listview id="nested" dataSource="@ViewBag.Categories">
    <e-listview-fieldsettings id="Id" text="Name" child="SubItems"></e-listview-fieldsettings>
</ejs-listview>

<!-- Rendered HTML includes:
    <li role="option" aria-level="1" aria-selected="false">Category</li>
    <li role="option" aria-level="2" aria-selected="false">Sub Category</li>
-->
```

## EnableRtl Property

The `enableRtl` property enables Right-to-Left (RTL) text direction for Arabic, Hebrew, Farsi, and other RTL languages:

### RTL Basic Implementation

```cshtml
<!-- Enable RTL for right-to-left languages -->
<ejs-listview id="rtlList" dataSource="@ViewBag.Items" enableRtl="true">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Effect:** 
- Text flows right-to-left
- Scrollbar appears on left side
- Icons align on right side
- Navigation direction reverses

### RTL with Arabic Content

```csharp
public class ArabicItem
{
    public int Id { get; set; }
    public string NameAr { get; set; } // Arabic text
}

var arabicItems = new List<ArabicItem>()
{
    new ArabicItem { Id = 1, NameAr = "السلام عليكم" }, // Hello
    new ArabicItem { Id = 2, NameAr = "مرحبا" } // Hi
};
```

```cshtml
<ejs-listview id="arabic" dataSource="@ViewBag.ArabicItems" 
    enableRtl="true">
    <e-listview-fieldsettings id="Id" text="NameAr"></e-listview-fieldsettings>
</ejs-listview>
```

### RTL CSS Considerations

```cshtml
<style>
/* RTL-aware styling */
.e-listview.e-rtl {
    direction: rtl;
    text-align: right;
}

.e-listview.e-rtl .e-list-item {
    padding-right: 16px;
    padding-left: 0;
}

.e-listview.e-rtl .e-list-icon {
    margin-left: auto;
    margin-right: 12px;
}
</style>
```

## Screen Reader Support

Configure ListView for optimal screen reader experience:

### Semantic Structure

```cshtml
<!-- Use semantic HTML structure -->
<section aria-label="Products List">
    <ejs-listview id="products" dataSource="@ViewBag.Products">
        <e-listview-fieldsettings id="Id" text="Name" tooltip="Description"></e-listview-fieldsettings>
    </ejs-listview>
</section>
```

### Screen Reader Tested Browsers

| Browser | Screen Reader | Support |
|---------|---------------|---------|
| Firefox | NVDA | Full |
| Chrome | NVDA | Full |
| Safari | VoiceOver | Full |
| Edge | Narrator | Full |

### Testing with NVDA (Free Screen Reader)

```
1. Download NVDA from https://www.nvaccess.org
2. Start NVDA
3. Tab to ListView
4. Listen to announcement
5. Use arrow keys and report functionality
```

### Announced Information

Screen reader announces:
- List name/label
- Total items count
- Current item position (e.g., "1 of 10")
- Item text
- Selection state (checked/unchecked for checkboxes)
- Hierarchy level for nested items

## Focus Management

### Programmatic Focus Control

```cshtml
@{
    IDictionary<string, object> focusAttributes = new Dictionary<string, object>()
    {
        { "tabindex", "0" },
        { "role", "listbox" }
    };
}

<button onclick="FocusListView()">Focus List</button>
<button onclick="FocusFirstItem()">Focus First Item</button>

<ejs-listview id="list" dataSource="@ViewBag.Items" htmlAttributes="@focusAttributes">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function FocusListView() {
    let listView = document.getElementById('list');
    listView.focus();
}

function FocusFirstItem() {
    let listView = document.getElementById('list').ej2_instances[0];
    // Select first item
    if (listView.liCollection && listView.liCollection.length > 0) {
        listView.liCollection[0].click();
        listView.liCollection[0].focus();
    }
}
</script>
```

### Focus Outline Visibility

```cshtml
<style>
/* Ensure focus outline is visible -->
.e-listview:focus,
.e-listview .e-list-item:focus {
    outline: 2px solid #2196f3;
    outline-offset: 2px;
}

/* Remove default browser outline and use custom -->
.e-listview:focus-visible {
    outline: 3px solid #1976d2;
}
</style>
```

### Focus Trap in Modal

For accessible modal dialog:

```cshtml
<div id="modal" role="dialog" aria-labelledby="modalTitle" aria-modal="true">
    <h2 id="modalTitle">Select Item</h2>
    <ejs-listview id="modalList" dataSource="@ViewBag.Items">
        <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
    </ejs-listview>
    <button onclick="ConfirmSelection()">Confirm</button>
    <button onclick="CloseModal()">Cancel</button>
</div>

<script>
// Focus trap - keep focus within modal
const modal = document.getElementById('modal');
const focusableElements = modal.querySelectorAll('button, [tabindex]');
const firstElement = focusableElements[0];
const lastElement = focusableElements[focusableElements.length - 1];

document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab' && modal.style.display !== 'none') {
        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});
</script>
```

## Accessibility Best Practices

### Best Practice 1: Provide Descriptive Labels

```cshtml
@{
    IDictionary<string, object> keyboardAttributes = new Dictionary<string, object>()
    {
        { "aria-label", "Available Products for Purchase" },
        { "role", "listbox" }
    };
}
<!-- ✅ GOOD: Clear, descriptive label -->
<ejs-listview id="products" dataSource="@ViewBag.Products"
    htmlAttributes="keyboardAttributes">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Best Practice 2: Include Loading States

```cshtml
<div id="loading" role="status" aria-live="polite" style="display: none;">
    Loading products...
</div>

<ejs-listview id="list" dataSource="@ViewBag.Items"
    actionBegin="ShowLoading"
    actionComplete="HideLoading"
    actionFailure="HideLoading">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function ShowLoading() {
    document.getElementById('loading').style.display = 'block';
}

function HideLoading() {
    document.getElementById('loading').style.display = 'none';
}
</script>
```

### Best Practice 3: Error Messages with ARIA

```cshtml
<div id="error" role="alert" aria-live="assertive" style="display: none; color: #c62828;">
</div>

<script>
function HandleError(error) {
    let errorDiv = document.getElementById('error');
    errorDiv.textContent = `Error: ${error}`;
    errorDiv.style.display = 'block';
    
    // Auto-clear after 5 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 5000);
}
</script>
```

### Best Practice 4: Keyboard-Only Navigation

```cshtml
@{
    IDictionary<string, object> keyboardAttributes = new Dictionary<string, object>()
    {
        { "tabindex", "0" },
        { "role", "listbox" }
    };
}

<!-- Ensure all interactive elements are keyboard accessible -->
<ejs-listview id="list" dataSource="@ViewBag.Items" htmlAttributes="@keyboardAttributes">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<!-- Test with keyboard only:
    1. Remove mouse
    2. Use Tab to navigate
    3. Use Arrow keys in ListView
    4. Use Enter to select
    5. Verify all functions work
-->
```

### Best Practice 5: Color Contrast

```css
/* Ensure text/background contrast meets WCAG AA (4.5:1) -->
.e-listview .e-list-item {
    color: #212121; /* 21:1 contrast on white */
    background-color: #ffffff;
}

.e-listview .e-list-item.e-active {
    color: #ffffff; /* 12.6:1 contrast on #1976d2 */
    background-color: #1976d2;
}

/* Avoid relying on color alone -->
.e-listview .e-list-item.e-active::before {
    content: '✓ '; /* Visual indicator beyond color */
}
```

## WCAG 2.1 Compliance Checklist

- [ ] ListView has descriptive `aria-label`
- [ ] All keyboard shortcuts documented and functional
- [ ] Focus outline visible and clear
- [ ] Color contrast > 4.5:1 for normal text
- [ ] Screen reader announcements clear
- [ ] Nested lists have proper `aria-level`
- [ ] Error messages announced with `role="alert"`
- [ ] RTL support for applicable languages
- [ ] No keyboard trap - can always tab away
- [ ] Mobile: Touch targets ≥ 44×44 pixels

---

**Related Topics:**
- [Getting Started & Data Binding](getting-started-and-data-binding.md)
- [Styling & Appearance](styling-appearance-properties.md)
- [Events & Error Handling](events-and-error-handling.md)
