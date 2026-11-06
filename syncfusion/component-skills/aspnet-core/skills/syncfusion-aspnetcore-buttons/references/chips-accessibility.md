# Chip Accessibility

## Table of Contents
- [Standards Compliance](#standards-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Color Contrast](#color-contrast)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Standards Compliance

The Syncfusion ASP.NET Core Chip component is built to meet industry accessibility standards:

| Accessibility Criteria | Support |
|------------------------|---------|
| WCAG 2.2 | Full support |
| Section 508 | Full support |
| ADA | Full support |
| Screen Reader Support | Full support |
| Right-To-Left (RTL) | Full support |
| Color Contrast | Full support |
| Mobile Device Support | Full support |
| Keyboard Navigation | Full support |
| Accessibility Checker Validation | Full support |
| Axe-core Accessibility Validation | Full support |

---

## WAI-ARIA Attributes

The Chips component follows [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/) patterns. The following ARIA attributes are automatically applied:

| Attribute | Applied to | Purpose |
|-----------|-----------|---------|
| `role="listbox"` | `ChipList` wrapper | Identifies the container as a listbox for assistive technologies |
| `role="option"` | Individual chips (multi-selection) | Marks selectable chips within the listbox |
| `role="button"` | Single chip used for actions | Identifies a chip that triggers an event |
| `aria-label` | Chip element | Provides an accessible name for the chip |
| `aria-selected` | Selectable chip | Indicates whether the chip is currently selected |
| `aria-disabled` | Disabled chip | Indicates the chip is visible but not operable |
| `aria-multiselectable` | `ChipList` (Multiple mode) | Communicates that multiple chips can be selected |

### Example: Providing Custom aria-label in Razor View

Use `HtmlAttributes` to provide an explicit accessible name:

```razor
@{
    var htmlAttributes = new Dictionary<string, object>
    {
        { "aria-label", "Filter by category" }
    };
}

<ejs-chiplist id="accessible-chips" selection="Multiple" htmlAttributes="htmlAttributes">
    <e-chips>
        <e-chip text="React" htmlAttributes="@(new Dictionary<string, object> { { "aria-label", "React framework" } })"></e-chip>
        <e-chip text="Angular" htmlAttributes="@(new Dictionary<string, object> { { "aria-label", "Angular framework" } })"></e-chip>
        <e-chip text="Vue" htmlAttributes="@(new Dictionary<string, object> { { "aria-label", "Vue framework" } })"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller:
```csharp
public IActionResult Accessibility()
{
    return View();
}
```

---

## Keyboard Interaction

The Chips component supports full keyboard navigation following [WAI-ARIA keyboard interaction guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/button/#keyboardinteraction):

| Keyboard Shortcut | Action |
|-------------------|--------|
| `Tab` | Move focus to the chip list |
| `Arrow Left / Right` | Navigate between chips |
| `Enter` or `Space` | Select the focused chip (in Single or Multiple selection mode) |
| `Delete` or `Backspace` | Delete the focused chip (when `EnableDelete="true"`) |

### Example: Keyboard-Accessible Deletable Chip List

```razor
<ejs-chiplist id="keyboard-chips" enableDelete="true" selection="Multiple">
    <e-chips>
        <e-chip text="JavaScript"></e-chip>
        <e-chip text="TypeScript"></e-chip>
        <e-chip text="Python"></e-chip>
        <e-chip text="Rust"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller:
```csharp
public IActionResult ChipsKeyboard()
{
    return View();
}
```

- Keyboard users can navigate chips with arrow keys, select with Enter/Space, and delete with Delete/Backspace.

---

## Screen Reader Support

The Chips component works with popular screen readers (NVDA, JAWS, VoiceOver) because:

- The container is marked as `role="listbox"`.
- Each chip has `role="option"` or `role="button"` depending on context.
- `aria-selected` is updated dynamically when a chip is selected.
- `aria-disabled` is set for disabled chips.
- The `Created` event fires when the component is fully initialized.

### Best Practice: Descriptive Labels

Use `HtmlAttributes` to add `aria-label` to chips that don't have self-describing text:

```razor
<ejs-chiplist id="avatar-chips">
    <e-chips>
        <e-chip text="Andrew" avatarText="A" 
                htmlAttributes="@(new Dictionary<string, object> { { "aria-label", "Andrew, team member" } })">
        </e-chip>
    </e-chips>
</ejs-chiplist>
```

---

## RTL Support

Enable right-to-left rendering for Arabic, Hebrew, and other RTL languages:

```razor
<ejs-chiplist id="rtl-chips" enableRtl="true" selection="Multiple">
    <e-chips>
        <e-chip text="واجهة مستخدم"></e-chip>
        <e-chip text="تطبيق ويب"></e-chip>
        <e-chip text="جودة الكود"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller:
```csharp
public IActionResult ChipsRtl()
{
    // Enable RTL in _Layout.cshtml or specific view
    ViewData["EnableRtl"] = true;
    return View();
}
```

In `_Layout.cshtml`:
```razor
<div dir="@(ViewData["EnableRtl"] as bool? == true ? "rtl" : "ltr")">
    @RenderBody()
</div>
```

---

## Color Contrast

All predefined CSS classes (`e-primary`, `e-success`, `e-info`, `e-warning`, `e-danger`) meet WCAG AA contrast requirements. Custom color schemes should maintain a contrast ratio of at least 4.5:1 for text.

```css
/* Custom accessible color scheme */
.e-chip.custom-primary {
    background-color: #1a73e8;  /* Strong blue */
    color: #ffffff;              /* High contrast white */
}
```

---

## Ensuring Accessibility

### Checklist for Accessible Chips
- ✅ Use semantic HTML attributes (`role`, `aria-label`, `aria-selected`, `aria-disabled`)
- ✅ Support keyboard navigation (Tab, Arrow keys, Enter, Delete)
- ✅ Provide meaningful `aria-label` for chips without descriptive text
- ✅ Test with screen readers (NVDA, JAWS, VoiceOver)
- ✅ Ensure color contrast meets WCAG AA standards
- ✅ Enable RTL for international audiences
- ✅ Include clear focus indicators (visible outline on Tab)
- ✅ Test with keyboard-only navigation

### Validation with Accessibility Tools
Use automated tools to validate your implementation:

```bash
# Install Axe for CLI accessibility testing
npm install --save-dev @axe-core/cli

# Run accessibility audit on your ASP.NET Core app
axe http://localhost:5000/your-page
```

---

## Summary

The Syncfusion ASP.NET Core Chips component provides production-ready accessibility features. By following the guidelines in this document, you can ensure your chip implementations are compliant with WCAG 2.2 and provide an excellent experience for all users, including those using assistive technologies.
