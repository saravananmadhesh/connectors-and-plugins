# Accessibility — ListBox

## Table of Contents
- [WCAG 2.2 AA Compliance](#wcag-22-aa-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [High Contrast Mode](#high-contrast-mode)

---

## WCAG 2.2 AA Compliance

ListBox includes built-in accessibility features to meet WCAG 2.2 AA standards:

**Features:**
- ✅ Semantic HTML structure with proper roles
- ✅ ARIA labels, descriptions, and live regions
- ✅ Full keyboard navigation support
- ✅ Screen reader announcements for state changes
- ✅ Color contrast compliance (>4.5:1 for text)
- ✅ Focus indicators (>3:1 contrast)
- ✅ No reliance on color alone for information
- ✅ Sufficient touch target size (44x44 minimum)

---

## ARIA Attributes

### Accessible ListBox Setup

```cshtml
<ejs-listbox id="skills"
    dataSource="@ViewBag.skills"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
</ejs-listbox>

<div id="skills-help" class="sr-only">
    Select one or more skills using checkboxes. Use arrow keys to navigate, space to toggle selection.
</div>
```

### ARIA Properties

| Property | Purpose | Example |
|----------|---------|---------|
| `aria-label` | Accessible name | `aria-label="Technology skills"` |
| `aria-describedby` | Description element | `aria-describedby="help-text"` |
| `aria-selected` | Selection state | Applied automatically to items |
| `aria-disabled` | Disabled state | Applied to disabled items |
| `aria-live` | Announce changes | `aria-live="polite"` |
| `aria-multiselectable` | Multiple selection | Applied to multiple ListBox |

**Controller:**

```csharp
public IActionResult Index()
{
    ViewBag.skills = new List<object>
    {
        new { Id = 1, Name = "C#", Disabled = false },
        new { Id = 2, Name = "JavaScript", Disabled = false },
        new { Id = 3, Name = "React", Disabled = false },
        new { Id = 4, Name = "Angular", Disabled = false }
    };
    return View();
}
```

---

## Keyboard Navigation

### Supported Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Move focus to ListBox |
| `Shift+Tab` | Move focus out of ListBox |
| `Arrow Down` | Move to next item |
| `Arrow Up` | Move to previous item |
| `Home` | Jump to first item |
| `End` | Jump to last item |
| `Space` | Toggle selection (checkbox mode) |
| `Enter` | Select focused item |
| `A` | Select all items |
| `Escape` | Deselect all items |

**View with annotations:**

```cshtml
<ejs-listbox id="items"
    dataSource="@ViewBag.items"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
    <e-listbox-selectionsettings mode="Multiple"></e-listbox-selectionsettings>
</ejs-listbox>

<script>
function onKeyDown(args) {
    if (args.keyCode === 65 && args.ctrlKey) { // Ctrl+A
        // Select all
        console.log('Select all triggered');
    }
}
</script>
```

---

## Screen Reader Support

### Announcements and Live Regions

ListBox announces:
- ✅ Item count: "5 items available"
- ✅ Selection changes: "Item selected"
- ✅ Focus state: "Focused on item 2"
- ✅ Disabled items: "Disabled, use arrow to skip"

**Best Practices:**

```cshtml
@* Announce list purpose *@
<label for="technologies-list" class="form-label">
    Select Technologies You Use
</label>

<ejs-listbox id="technologies-list"
    dataSource="@ViewBag.technologies"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<div id="tech-instructions" class="sr-only">
    Use arrow keys to navigate. Press space to select. Multiple selections allowed.
</div>
```

### Screen Reader Test Results

- ✅ NVDA (Windows): Full support
- ✅ JAWS (Windows): Full support
- ✅ VoiceOver (macOS/iOS): Full support
- ✅ TalkBack (Android): Full support

---

## Focus Management

### Visual Focus Indicator

```css
/* Enhance focus visibility */
.e-listbox:focus {
    outline: 3px solid #0066cc;
    outline-offset: 2px;
}

.e-list-item:focus {
    box-shadow: inset 0 0 0 3px #0066cc;
}
```

### Programmatic Focus

```cshtml
<ejs-listbox id="users"
    dataSource="@ViewBag.users"
    height="300px">
    <e-listbox-fields text="Name" value="Id"></e-listbox-fields>
</ejs-listbox>

<button onclick="focusListBox()">Focus ListBox</button>

<script>
function focusListBox() {
    let listbox = document.getElementById('users').ej2_instances[0];
    listbox.focusIn(); // Set focus
}
</script>
```

---

## High Contrast Mode

### Support for System Settings

ListBox respects Windows/macOS high contrast settings:

```css
/* High contrast mode overrides */
@media (prefers-contrast: more) {
    .e-listbox,
    .e-list-item {
        border: 2px solid;
        color: black;
        background: white;
    }
    
    .e-list-item.e-active {
        background: #000;
        color: #fff;
    }
}
```

### Testing with High Contrast

**Windows:**
1. Settings → Ease of Access → Display
2. Enable "High Contrast"
3. Test ListBox rendering

**macOS:**
1. System Preferences → Accessibility → Display
2. Enable "Increase Contrast"
3. Verify ListBox visual distinction

---

## Accessibility Checklist

- [ ] ListBox has `aria-label` or `aria-labelledby`
- [ ] Disabled items marked with `aria-disabled="true"`
- [ ] Keyboard navigation tested with Tab, Arrow keys
- [ ] Screen reader tested (NVDA/JAWS/VoiceOver)
- [ ] Focus indicator visible (>3:1 contrast)
- [ ] Color not used alone for state indication
- [ ] Helper text provided via `aria-describedby`
- [ ] Touch targets ≥44x44 pixels
- [ ] Multiple selection announced to screen readers
- [ ] Help text in `.sr-only` class for screen readers only
