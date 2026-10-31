# Accessibility — Angular ProgressButton

## Compliance Summary

The ProgressButton follows established accessibility guidelines and standards:

| Accessibility Criteria | Support |
|---|---|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| Screen Reader Support | ✅ Full |
| Right-To-Left (RTL) Support | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker Validation | ✅ Full |
| axe-core Validation | ✅ Full |

## WAI-ARIA Attributes

| Attribute | Purpose |
|---|---|
| `aria-label` | Provides an accessible name for icon-only ProgressButtons. |
| `aria-disabled` | Indicates the element is perceivable but not operable when disabled. |

## Keyboard Interaction

| Key | Action |
|---|---|
| `Enter` / `Space` | Starts the progress. |

## RTL Support

Enable right-to-left rendering:

```typescript
template: `
  <button ejs-progressbutton content="إرسال"
          [enableRtl]="true">
  </button>
`
```

## Icon-Only Accessible Button

When using an icon-only button (no visible text content), provide an `aria-label`:

```typescript
template: `
  <button ejs-progressbutton
          iconCss="e-icons e-upload"
          cssClass="e-icon-btn"
          aria-label="Upload file">
  </button>
`
```

## Disabled State

When `disabled` is `true`, `aria-disabled="true"` is applied automatically:

```typescript
template: `
  <button ejs-progressbutton content="Submit"
          [disabled]="true">
  </button>
`
```

## Accessibility Validation

Test accessibility compliance with:
- [`accessibility-checker`](https://www.npmjs.com/package/accessibility-checker) (automated testing)
- [`axe-core`](https://www.npmjs.com/package/axe-core) (browser/unit test integration)
- [Live sample](https://ej2.syncfusion.com/accessibility/progress-button.html) — open in a browser with a screen reader or accessibility audit tool
