# Tooltip Accessibility

## Table of Contents
- [Compliance Summary](#compliance-summary)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Ensuring Accessibility in Your App](#ensuring-accessibility-in-your-app)

---

## Compliance Summary

The Syncfusion Angular Tooltip meets the following accessibility standards:

| Criterion | Support |
|---|---|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| Screen Reader | ✅ Full |
| Right-To-Left (RTL) | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker Validation | ✅ Full |
| Axe-core Validation | ✅ Full |

---

## WAI-ARIA Attributes

The tooltip implements the [WAI-ARIA Tooltip Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/).

| Attribute | Where | Description |
|---|---|---|
| `role="tooltip"` | Tooltip popup element | Identifies the element as a tooltip to assistive technologies |
| `aria-describedby` | Target element | Added when tooltip opens; holds the tooltip's `id`. Removed when tooltip closes |
| `aria-hidden` | Tooltip popup element | `true` when closed/hidden; `false` when visible |

**Multiple aria-describedby values:**

If the target element already has `aria-describedby`, the tooltip appends its ID with a space separator:

```html
<!-- Before tooltip opens: -->
<button aria-describedby="help-text">Submit</button>

<!-- After tooltip opens (tooltip id = "tip-1"): -->
<button aria-describedby="help-text tip-1">Submit</button>
```

When the tooltip closes, the appended ID is removed, restoring the original value.

---

## Keyboard Interaction

The tooltip follows the [WAI-ARIA keyboard interaction guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/#keyboardinteraction):

| Key | Action |
|---|---|
| `Tab` | Move focus to target element; tooltip opens. Focus out closes the tooltip |
| `Escape` | Close/dismiss the open tooltip immediately |

**Behavior rules:**
- While the tooltip is displayed, focus stays on the target element
- If opened by hover, it closes only when the mouse leaves the target
- If opened by focus (`Tab`), it closes only when focus leaves the target
- If opened by click, it closes only on another click
- Sticky mode tooltips (`isSticky: true`) require clicking the close icon

---

## Screen Reader Support

- The `role="tooltip"` attribute ensures screen readers announce the tooltip content when the element is focused or hovered
- `aria-describedby` links the tooltip text to its target, so screen readers read it as descriptive context
- Content is hidden from the accessibility tree when `aria-hidden="true"` (closed state), preventing phantom announcements

**Best practices for screen reader–friendly tooltips:**
```html
<!-- Add meaningful content, not just "i" or icon symbols -->
<ejs-tooltip content="Opens a confirmation dialog to delete the selected item.">
  <button aria-label="Delete item">🗑</button>
</ejs-tooltip>
```

---

## RTL Support

Enable right-to-left layout rendering with `enableRtl`:

```typescript
@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip content="معلومات إضافية" [enableRtl]="true" position="BottomRight">
      <button>Arabic context</button>
    </ejs-tooltip>
  `
})
export class App {}
```

> RTL support also affects the direction of the tip pointer and popup alignment, ensuring correct display in Arabic, Hebrew, and other RTL languages.

---

## Ensuring Accessibility in Your App

**Do:**
- Provide meaningful, descriptive `content` (not just decorative symbols)
- Use the `target` selector pattern for multi-target tooltips so each target has proper `aria-describedby` linkage
- Test with keyboard-only navigation (Tab through all tooltip targets, verify Escape dismisses)
- Test with screen readers (NVDA, JAWS, VoiceOver) — confirm content is announced

**Don't:**
- Use the tooltip as the only way to convey critical information (color-blind and screen magnifier users may miss it)
- Put interactive elements (buttons, links) inside a tooltip that opens only on hover — focus cannot reach them via keyboard
- Rely on tooltips for form validation errors — use inline error messages instead

**Testing tools:**
- [axe-core](https://www.npmjs.com/package/axe-core) — automated accessibility violations
- [accessibility-checker](https://www.npmjs.com/package/accessibility-checker) — IBM accessibility compliance
- Live demo: [Syncfusion Accessibility Sample](https://ej2.syncfusion.com/accessibility/tooltip.html)

---

## See Also

- [Customization & Style](./customization-and-style.md) — Color contrast via CSS
- [Open Modes](./open-mode.md) — Focus mode for keyboard users
- [API Reference](./api.md) — `enableRtl`, `htmlAttributes`, events
