# Accessibility — Syncfusion JavaScript SplitButton

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [RTL Support](#rtl-support)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Compliance Overview

The Syncfusion JavaScript SplitButton follows established accessibility guidelines and standards:

| Accessibility Criteria              | Support |
|-------------------------------------|---------|
| WCAG 2.2                            | Full    |
| Section 508                         | Full    |
| ADA                                 | Full    |
| Screen Reader Support               | Full    |
| Right-To-Left (RTL) Support         | Full    |
| Color Contrast                      | Full    |
| Mobile Device Support               | Full    |
| Keyboard Navigation Support         | Full    |
| Accessibility Checker Validation    | Full    |
| Axe-core Accessibility Validation   | Full    |

---

## WAI-ARIA Attributes

The SplitButton component applies WAI-ARIA roles and attributes automatically:

| Attribute         | Purpose                                                                                   |
|-------------------|-------------------------------------------------------------------------------------------|
| `role="button"`   | Applied to the primary button element                                                    |
| `role="menu"`     | Applied to the popup container                                                           |
| `role="menuitem"` | Applied to each popup action item                                                        |
| `aria-haspopup`   | Indicates the secondary arrow button has an associated popup menu                       |
| `aria-expanded`   | Reflects whether the popup is currently open (`true`) or closed (`false`)               |
| `aria-owns`       | Links the button to its popup to define the parent/child relationship in the DOM         |
| `aria-disabled`   | Set to `true` when the `disabled` property is enabled — marks the component as inert    |

No manual ARIA attribute configuration is required; the component manages these automatically based on its state.

---

## Keyboard Navigation

The SplitButton supports full keyboard interaction without a mouse:

| Key                  | Action                                                               |
|----------------------|----------------------------------------------------------------------|
| `Enter`              | Opens the popup, or activates the highlighted item and closes it    |
| `Space`              | Opens the popup                                                      |
| `Esc`                | Closes the open popup                                                |
| `Down Arrow`         | Navigates to the next popup action item                             |
| `Up Arrow`           | Navigates to the previous popup action item                         |
| `Alt + Down Arrow`   | Opens the popup                                                      |
| `Alt + Up Arrow`     | Closes the popup                                                     |

Focus is managed automatically. When the popup closes, focus returns to the SplitButton.

---

## RTL Support

Enable right-to-left rendering by setting `enableRtl: true`. This reverses the layout direction for both the button and popup:

```typescript
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

const splitBtn: SplitButton = new SplitButton({
  content: 'Paste',
  iconCss: 'e-icons e-paste',
  items: items,
  enableRtl: true
});
splitBtn.appendTo('#element');
```

RTL affects icon position, popup alignment, and text direction. It is suitable for Arabic, Hebrew, and other right-to-left languages.

---

## Ensuring Accessibility

The component's accessibility is validated via `accessibility-checker` and `axe-core` during automated testing. To verify in your application:

1. Use browser dev tools or extensions (e.g., axe DevTools, WAVE) to run accessibility audits.
2. Test keyboard navigation: Tab to the SplitButton, press `Enter`/`Space` to open the popup, use arrow keys to navigate items, press `Enter` to select, `Esc` to close.
3. Verify with a screen reader (NVDA, JAWS, VoiceOver) that the component announces its state correctly (e.g., "button, has popup, collapsed/expanded").
4. Confirm color contrast meets WCAG AA requirements (4.5:1 for normal text) when using custom themes.
