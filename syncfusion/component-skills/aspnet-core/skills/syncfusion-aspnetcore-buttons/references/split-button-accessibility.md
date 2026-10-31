# Accessibility – ASP.NET Core SplitButton

## Table of Contents
- [Compliance Summary](#compliance-summary)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Compliance Summary

The SplitButton component follows accessibility guidelines and standards:

| Accessibility Criteria | Compatibility |
|------------------------|--------------|
| WCAG 2.2 Support | **AA** |
| Section 508 Support | ✅ Full |
| Screen Reader Support | ✅ Full |
| Right-To-Left Support | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation Support | ✅ Full |
| Accessibility Checker Validation | ✅ Full |

References: [ADA](https://www.ada.gov/), [Section 508](https://www.section508.gov/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [WAI-ARIA roles](https://www.w3.org/TR/wai-aria/#roles)

---

## WAI-ARIA Attributes

The SplitButton automatically applies these ARIA attributes:

| Attribute | Purpose |
|-----------|---------|
| `role="button"` | Identifies the primary button element |
| `role="menu"` | Identifies the popup as a menu |
| `role="menuitem"` | Identifies each popup action item |
| `aria-haspopup` | Indicates the availability and type of the interactive popup |
| `aria-expanded` | Reflects whether the popup is currently open (`true`) or closed (`false`) |
| `aria-owns` | Defines the parent/child relationship between the button and its popup (when DOM hierarchy cannot represent it) |
| `aria-disabled` | Marks the element as perceivable but not operable when `disabled="true"` |

No additional configuration is needed — these attributes are managed automatically by the component.

---

## Keyboard Navigation

The SplitButton component follows the [WAI-ARIA keyboard interaction pattern](https://www.w3.org/TR/wai-aria-practices/#menubutton):

| Key | Action |
|-----|--------|
| `Esc` | Closes the open popup |
| `Enter` | Opens the popup, or activates the highlighted item and closes the popup |
| `Space` | Opens the popup |
| `Up Arrow` | Navigates to the previous popup action item |
| `Down Arrow` | Navigates to the next popup action item |
| `Alt + Up Arrow` | Closes the popup |
| `Alt + Down Arrow` | Opens the popup |

---

## Ensuring Accessibility

The SplitButton component's accessibility has been validated with:
- [accessibility-checker](https://www.npmjs.com/package/accessibility-checker)
- [axe-core](https://www.npmjs.com/package/axe-core)

View the live accessibility sample: [SplitButton Accessibility Demo](https://ej2.syncfusion.com/accessibility/split-button.html)

For general ASP.NET Core controls accessibility guidance, see the [Syncfusion ASP.NET Core Accessibility documentation](https://ej2.syncfusion.com/aspnetcore/documentation/common/accessibility).

**Key implementation tips:**
- Always provide meaningful `content` text on the primary button so screen readers announce the button purpose
- Use `id` on popup items when using the `select` event to identify items reliably rather than depending on `text`
- Avoid overriding `aria-*` attributes manually — the component manages them correctly
