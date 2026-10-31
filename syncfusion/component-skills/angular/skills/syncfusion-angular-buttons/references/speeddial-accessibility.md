# Speed Dial Accessibility

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [RTL Support](#rtl-support)
- [Screen Reader Support](#screen-reader-support)

---

## Compliance Overview

The Syncfusion Angular Speed Dial component meets the following accessibility standards:

| Accessibility Criteria | Support |
|---|---|
| WCAG 2.2 | ✅ Yes |
| Section 508 | ✅ Yes |
| Screen Reader | ✅ Yes |
| Right-To-Left (RTL) | ✅ Yes |
| Color Contrast | ✅ Yes |
| Mobile Device | ✅ Yes |
| Keyboard Navigation | ✅ Yes |
| Accessibility Checker Validation | ✅ Yes |
| axe-core Validation | ✅ Yes |

---

## WAI-ARIA Attributes

The Speed Dial follows [WAI-ARIA menubar patterns](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/):

| Attribute | Purpose |
|---|---|
| `role="menu"` | Marks the Speed Dial as having a submenu |
| `role="menuitem"` | Each action item is an actionable menu entry |
| `aria-label` | Describes the Speed Dial popup item's text |
| `aria-expanded` | Indicates whether the popup is open (`true`) or closed (`false`) |
| `aria-haspopup` | Indicates the Speed Dial has popup items |
| `aria-controls` | Points from the Speed Dial button to its popup content |
| `aria-disabled` | Marks disabled action items |

---

## Keyboard Interaction

| Key | Action |
|---|---|
| `Enter` | Opens or closes the Speed Dial popup |
| `↑ Up Arrow` | Moves focus to the next menu item |
| `→ Right Arrow` | Moves focus to the next menu item |
| `↓ Down Arrow` | Moves focus to the previous menu item |
| `← Left Arrow` | Moves focus to the previous menu item |
| `Home` | Moves focus to the first menu item |
| `End` | Moves focus to the last menu item |
| `Esc` | Closes the popup |

---

## RTL Support

Enable right-to-left text direction using `enableRtl`:

```html
<button ejs-speeddial
  id="speeddial"
  content="Edit"
  [enableRtl]="true"
  [items]="items">
</button>
```

This flips the layout for RTL languages such as Arabic and Hebrew.

---

## Screen Reader Support

For icon-only action items, always set the `title` field on `SpeedDialItemModel` to give screen readers descriptive text:

```typescript
public items: SpeedDialItemModel[] = [
  { iconCss: 'e-icons e-cut',   title: 'Cut' },
  { iconCss: 'e-icons e-copy',  title: 'Copy' },
  { iconCss: 'e-icons e-paste', title: 'Paste' }
];
```

The `title` value is used for the `aria-label` attribute, which is announced by screen readers when the item is focused.
