# Accessibility – Syncfusion ASP.NET Core Mention

## Table of Contents
- [Overview](#overview)
- [Accessibility Compliance](#accessibility-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Implementation Example](#implementation-example)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Overview

The Syncfusion ASP.NET Core Mention control provides built-in compliance with `WAI-ARIA` specifications. WAI-ARIA support is achieved using attributes such as `aria-selected` and `aria-activedescendant`, which allow screen readers to properly announce Mention interactions.

The Mention component follows accessibility guidelines and standards including:
- [ADA (Americans with Disabilities Act)](https://www.ada.gov/)
- [Section 508](https://www.section508.gov/)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) (Level AA)

---

## Accessibility Compliance

| Accessibility Criteria | Compatibility |
|---|---|
| WCAG 2.2 Support | AA |
| Section 508 Support | ✅ Full |
| Screen Reader Support | ✅ Full |
| Right-To-Left Support | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation Support | ✅ Full |
| Accessibility Checker Validation | ✅ Full |

---

## WAI-ARIA Attributes

The Mention uses the `Listbox` role for the suggestion popup, and each list item has an `option` role. The following ARIA attributes are used:

| Attribute | Purpose |
|---|---|
| `aria-selected` | Indicates the currently selected option in the popup list |
| `aria-activedescendant` | Holds the ID of the active list item to assist screen readers in tracking focus within the popup |
| `aria-owns` | Contains the ID of the popup list to indicate it is a child of the mention trigger element |

---

## Keyboard Navigation

All Mention interactions are fully accessible via keyboard without a mouse:

| Key | Action |
|---|---|
| `Arrow Down` | Selects the first item in the Mention list, or moves to the next item if one is already selected |
| `Arrow Up` | Moves selection to the previous item in the list |
| `Escape` | Closes the suggestion popup when it is open |
| `Enter` | Selects the currently focused item and closes the popup |
| `Tab` | If popup is closed: moves focus to the next TabIndex element on the page. If popup is open: inserts the selected item and closes the popup |

---

## Implementation Example

```cshtml
<div id="mentionTarget" contenteditable="true"
     aria-label="Comment area - type @ to mention a user"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>
```

**Model:**
```csharp
public class EmployeeData
{
    public string Name { get; set; }
    public string EmailId { get; set; }
}
```

**Controller:**
```csharp
public IActionResult Index()
{
    ViewBag.data = new List<EmployeeData>
    {
        new EmployeeData { Name = "Andrew Fuller", EmailId = "andrew@example.com" },
        new EmployeeData { Name = "Janet Leverling", EmailId = "janet@example.com" },
        new EmployeeData { Name = "Laura Callahan", EmailId = "laura@example.com" }
    };
    return View();
}
```

---

## Ensuring Accessibility

The Mention component's accessibility is validated using:
- **accessibility-checker** npm package
- **axe-core** npm package

These tools are used in Syncfusion's automated testing pipeline to ensure WCAG and Section 508 compliance.

**Tips for accessible implementation:**

1. **Add descriptive `aria-label`** to the target element so screen readers explain its purpose.
2. **Use semantic HTML** for the target element — a `contenteditable` div or `<textarea>` both work.
3. **Ensure sufficient color contrast** when applying custom CSS via `cssClass`.
4. **Test keyboard flow** — verify the entire suggest-and-select interaction works without a mouse.
