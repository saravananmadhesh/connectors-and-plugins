# Accessibility – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Compliance Standards](#compliance-standards)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Enabling Accessibility Features](#enabling-accessibility-features)

---

## Compliance Standards

The AutoComplete is designed with WAI-ARIA specifications and meets the following standards:

| Accessibility Criteria | Compatibility |
|---|---|
| WCAG 2.2 Support | AA |
| Section 508 Support | Partial |
| Screen Reader Support | Full |
| Right-To-Left Support | Full |
| Color Contrast | Full |
| Mobile Device Support | Full |
| Keyboard Navigation Support | Full |
| Accessibility Checker Validation | Full |

The AutoComplete is validated with `accessibility-checker` and `axe-core` tools during automated testing.

---

## WAI-ARIA Attributes

The AutoComplete uses the `combobox` role. Each list item has the `option` role.

| ARIA Attribute | Description |
|---|---|
| `aria-haspopup` | Indicates whether the input has a suggestion list |
| `aria-expanded` | Indicates whether the suggestion list is expanded |
| `aria-selected` | Indicates the selected option from the list |
| `aria-readonly` | Indicates the readonly state of the AutoComplete |
| `aria-disabled` | Indicates whether the component is disabled |
| `aria-activedescendent` | Holds the ID of the active list item (focused descendant) |
| `aria-owns` | Contains the ID of the suggestion list popup |
| `aria-autocomplete` | Set to `"both"` – shows suggestions and inline autocomplete |

These attributes are applied automatically — no manual ARIA setup is needed.

---

## Keyboard Navigation

Full keyboard interaction is supported:

| Keyboard Shortcut | Action |
|---|---|
| `Arrow Down` | Opens popup if closed; selects first/next item |
| `Arrow Up` | Opens popup if closed; selects last/previous item |
| `Page Down` | Scrolls to next page; selects first item |
| `Page Up` | Scrolls to previous page; selects first item |
| `Enter` | Selects the focused item |
| `Tab` | Closes popup (if open) and moves to next focusable element |
| `Shift + Tab` | Closes popup (if open) and moves to previous focusable element |
| `Alt + Down` | Opens the popup list |
| `Alt + Up` | Toggles popup open/closed |
| `Escape` | Closes popup and clears selection |
| `Home` | Moves cursor to the beginning of the input |
| `End` | Moves cursor to the end of the input |

---

## Right-to-Left (RTL) Support

Enable RTL layout with `enableRtl="true"`:

```cshtml
<ejs-autocomplete id="country"
    dataSource="@countries"
    placeholder="Select a country"
    enableRtl="true">
    <e-autocomplete-fields value="Name"></e-autocomplete-fields>
</ejs-autocomplete>
```

---

## Enabling Accessibility Features

A minimal accessibility-ready AutoComplete:

```cshtml
<ejs-autocomplete id="games"
    dataSource="sports"
    placeholder="Select a sport">
</ejs-autocomplete>
```

All ARIA attributes are automatically applied. The control natively supports:
- Keyboard navigation (see table above)
- Screen reader announcements (combobox role with option items)
- Focus management with `aria-activedescendent`
- Color contrast compliant with WCAG 2.2 AA (with default themes)

> No additional configuration is needed for standard accessibility support. Use `enableRtl` for right-to-left layouts and ensure a visible label or `placeholder` is always provided.
