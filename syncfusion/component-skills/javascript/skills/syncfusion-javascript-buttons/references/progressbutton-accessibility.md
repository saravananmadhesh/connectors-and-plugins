# Accessibility

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Compliance Overview

The ProgressButton component meets the following accessibility standards:

| Accessibility Criteria | Supported |
|------------------------|-----------|
| WCAG 2.2 | ✅ Full support |
| Section 508 | ✅ Full support |
| Screen Reader Support | ✅ Full support |
| Right-To-Left (RTL) Support | ✅ Full support |
| Color Contrast | ✅ Full support |
| Mobile Device Support | ✅ Full support |
| Keyboard Navigation Support | ✅ Full support |
| Accessibility Checker Validation | ✅ Passes |
| Axe-core Validation | ✅ Passes |

---

## WAI-ARIA Attributes

The ProgressButton follows [WAI-ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) patterns. The following ARIA attributes are applied automatically:

| Attribute | Purpose |
|-----------|---------|
| `aria-label` | Provides an accessible name for icon-only ProgressButtons (no visible text) |
| `aria-disabled` | Indicates the button is perceivable but not operable when `disabled: true` |

**Icon-only button with aria-label:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  iconCss: 'e-icons e-download',
  cssClass: 'e-icon-btn',
  enableProgress: true
  // aria-label is automatically set; you can also set it manually on the element
});
progressBtn.appendTo('#progressbtn');
```

Manually setting `aria-label` on the HTML element:
```html
<button id="progressbtn" aria-label="Download file"></button>
```

**Disabled state:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Submit',
  disabled: true   // aria-disabled="true" is applied automatically
});
progressBtn.appendTo('#progressbtn');
```

---

## Keyboard Interaction

The ProgressButton supports full keyboard navigation:

| Key | Action |
|-----|--------|
| `Enter` | Starts the progress animation |
| `Space` | Starts the progress animation |

No additional configuration is required — keyboard support is built in.

---

## Screen Reader Support

The ProgressButton renders as a native `<button>` element, which is inherently accessible to screen readers. The following practices improve screen reader experience:

1. **Always provide visible text or `aria-label`** — icon-only buttons need `aria-label` on the element.
2. **Update `aria-label` dynamically** if the button content changes during progress (e.g., "Uploading...", "Success").
3. **Use `dataBind()`** after updating `content` so the DOM and accessibility tree stay synchronized.

**Updating accessible name during progress:**
```typescript
import { ProgressButton, ProgressEventArgs } from '@syncfusion/ej2-splitbuttons';

const progressBtn: ProgressButton = new ProgressButton({
  content: 'Upload',
  enableProgress: true,
  begin: (): void => {
    progressBtn.content = 'Uploading...';
    progressBtn.dataBind();
    // The button's text node (read by screen readers) updates immediately
  },
  end: (): void => {
    progressBtn.content = 'Upload complete';
    progressBtn.dataBind();
    setTimeout((): void => {
      progressBtn.content = 'Upload';
      progressBtn.dataBind();
    }, 1500);
  }
});
progressBtn.appendTo('#progressbtn');
```

---

## RTL Support

Enable right-to-left rendering with `enableRtl: true`. This flips the layout direction so the spinner and content render correctly in RTL languages (e.g., Arabic, Hebrew).

**TypeScript:**
```typescript
import { ProgressButton } from '@syncfusion/ej2-splitbuttons';

let progressBtn: ProgressButton = new ProgressButton({
  content: 'تقدم',
  enableProgress: true,
  enableRtl: true,
  spinSettings: { position: 'Right' }
});
progressBtn.appendTo('#progressbtn');
```

---

## Ensuring Accessibility

Syncfusion validates the ProgressButton's accessibility using:
- [accessibility-checker](https://www.npmjs.com/package/accessibility-checker) — automated WCAG audit
- [axe-core](https://www.npmjs.com/package/axe-core) — runtime accessibility testing

**Checklist for production use:**
- [ ] Provide text content or `aria-label` for every ProgressButton
- [ ] Ensure color contrast ratio meets WCAG 2.2 AA (4.5:1 for normal text)
- [ ] Test keyboard navigation (`Tab` to focus, `Enter`/`Space` to activate)
- [ ] Use `disabled: true` (not `display: none`) to prevent interaction while preserving accessibility
- [ ] Update button text via `dataBind()` so screen readers pick up state changes
