# Accessibility — Syncfusion Angular RadioButton

The Syncfusion Angular RadioButton meets industry accessibility standards out of the box, with full WCAG 2.2, Section 508, and ADA compliance.

---

## Compliance Summary

| Accessibility Criteria | Support |
|---|---|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| ADA | ✅ Full |
| Screen Reader Support | ✅ Full |
| Right-To-Left Support | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker Validation | ✅ Full |
| Axe-core Validation | ✅ Full |

---

## WAI-ARIA Attributes

The RadioButton component follows the [WAI-ARIA Radio Group pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/).

| Attribute | Purpose |
|---|---|
| `aria-disabled` | Indicates the RadioButton is visible but not interactive when `[disabled]="true"` |

The component renders as a native `<input type="radio">` element, which browsers and screen readers understand natively without additional ARIA roles.

---

## Keyboard Interaction

The RadioButton follows the [WAI-ARIA keyboard interaction spec](https://www.w3.org/WAI/ARIA/apg/patterns/radio/#keyboardinteraction):

| Key | Action |
|---|---|
| `↑` / `←` (Up/Left Arrow) | Move focus to and select the **previous** option in the group |
| `↓` / `→` (Down/Right Arrow) | Move focus to and select the **next** option in the group |
| `Tab` | Move focus to the next focusable element outside the group |
| `Shift+Tab` | Move focus to the previous focusable element outside the group |

> Arrow keys both move focus **and** select the option simultaneously within a radio group. There is no need to press `Space` or `Enter`.

---

## Screen Reader Support

Because `ejs-radiobutton` renders as a native `<input type="radio">` with an associated `<label>`, screen readers (NVDA, JAWS, VoiceOver, TalkBack) announce:
- The button's label text
- Whether it is checked or unchecked
- Its position within the group (e.g., "1 of 3")

No additional configuration is needed for basic screen reader support.

---

## Enhancing Accessibility with htmlAttributes

For additional context that screen readers can announce, use `htmlAttributes` to add `aria-describedby` or `aria-label`:

```typescript
@Component({
  standalone: true,
  imports: [RadioButtonModule],
  template: `
    <p id="payment-desc">Select your preferred payment method:</p>
    <ejs-radiobutton
      label="Credit Card"
      name="payment"
      value="credit"
      [htmlAttributes]="{'aria-describedby': 'payment-desc'}">
    </ejs-radiobutton>
    <ejs-radiobutton
      label="Debit Card"
      name="payment"
      value="debit"
      [htmlAttributes]="{'aria-describedby': 'payment-desc'}">
    </ejs-radiobutton>
  `
})
export class AppComponent {}
```

---

## Color Contrast

The Syncfusion Material3 theme is designed to meet WCAG 2.2 minimum contrast ratios (4.5:1 for normal text, 3:1 for large text). When creating custom color variants using `cssClass`, verify contrast ratios using tools like:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Chrome DevTools Accessibility panel](https://developer.chrome.com/docs/devtools/accessibility/)

---

## Disabled State and Accessibility

Disabled RadioButtons use `aria-disabled="true"` and are still perceivable by screen readers (they are announced as "dimmed" or "unavailable"). They are skipped in keyboard Tab navigation but remain visible.

```typescript
<ejs-radiobutton label="Premium (Unavailable)" name="plan" value="premium" [disabled]="true"></ejs-radiobutton>
```

---

## Ensuring Accessibility in Your App

1. **Always set `label`** — never rely solely on surrounding text for RadioButton context.
2. **Always set `name`** — groups buttons semantically and aids screen reader group announcement.
3. **Always set `value`** — ensures form submission communicates meaning.
4. **Test with real tools** — run [axe-core](https://www.npmjs.com/package/axe-core) or [accessibility-checker](https://www.npmjs.com/package/accessibility-checker) in your CI pipeline.

Live accessibility demo: [https://ej2.syncfusion.com/accessibility/radiobutton.html](https://ej2.syncfusion.com/accessibility/radiobutton.html)

---

## See Also

- [Customization & Advanced](customization-and-advanced.md) — `enableRtl`, `htmlAttributes`
- [API Reference](api.md)
- [Syncfusion Angular Accessibility Overview](https://ej2.syncfusion.com/angular/documentation/common/accessibility)
