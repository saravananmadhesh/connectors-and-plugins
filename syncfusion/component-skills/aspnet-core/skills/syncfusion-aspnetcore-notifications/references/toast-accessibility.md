# Accessibility — Syncfusion ASP.NET Core Toast

## Table of Contents
- [Overview](#overview)
- [Accessibility Compliance](#accessibility-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [RTL Support](#rtl-support)
- [Basic Accessible Toast Example](#basic-accessible-toast-example)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Overview

The Syncfusion ASP.NET Core Toast component is designed with [WAI-ARIA](http://www.w3.org/WAI/PF/aria-practices/) specifications in mind. It applies the appropriate WAI-ARIA roles, states, and properties to help users who rely on assistive technologies.

The component has been tested in major screen readers and meets the following standards:
- **ADA** (Americans with Disabilities Act)
- **Section 508**
- **WCAG 2.2** (Web Content Accessibility Guidelines, Level AA)

---

## Accessibility Compliance

| Accessibility Criteria | Compatibility |
|---|---|
| WCAG 2.2 Support | **AA** |
| Section 508 Support | ✅ Full |
| Screen Reader Support | ✅ Full |
| Right-To-Left Support | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation Support | Not Applicable |
| Accessibility Checker Validation | ✅ Full |

> Toast is a notification component. Keyboard navigation is not applicable because it auto-dismisses and is not an interactive focusable control.

---

## WAI-ARIA Attributes

The Toast component applies the following ARIA role:

| Attribute | Value | Description |
|---|---|---|
| `role` | `alert` | Identifies the toast element as a live region. Screen readers announce the content when it appears, without requiring user focus. |

The `role="alert"` is critical for accessibility — it ensures that screen reader users are notified of time-sensitive messages even when focus is elsewhere.

```cshtml
@* The rendered HTML will include role="alert" automatically *@
<ejs-toast id="element"
           title="Notification"
           content="Your file was uploaded successfully.">
    <e-toast-position X="Right" Y="Top"></e-toast-position>
</ejs-toast>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 500);
</script>
```

---

## RTL Support

Enable right-to-left layout for languages like Arabic, Hebrew, or Urdu using `enableRtl="true"`:

```cshtml
<ejs-toast id="element"
           title="تنبيه"
           content="لديك رسالة جديدة."
           enableRtl="true"
           timeOut="5000">
    <e-toast-position X="Left" Y="Top"></e-toast-position>
</ejs-toast>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 500);
</script>
```

- RTL reverses the layout direction of the toast content.
- Position `X="Left"` in RTL becomes visually on the right side of the screen (based on writing direction).

Default value: `false`

---

## Basic Accessible Toast Example

```cshtml
<ejs-toast id="element"
           title="Upload Complete"
           content="Your document has been uploaded successfully."
           showCloseButton="true"
           timeOut="8000">
    <e-toast-position X="Right" Y="Top"></e-toast-position>
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 500);

    document.getElementById('showBtn').addEventListener('click', function () {
        document.getElementById('element').ej2_instances[0].show();
    });
</script>
```

**Accessibility notes for this example:**
- `role="alert"` is automatically added by the component — screen readers announce the toast content immediately.
- `showCloseButton="true"` allows keyboard users to close the toast using the close button (focusable).
- Setting a reasonable `timeOut` (≥ 5000ms) gives users enough time to read the notification.
- Avoid using toasts for critical, irreversible actions — they disappear automatically.

---

## Ensuring Accessibility

The Toast component's accessibility is validated using:
- [accessibility-checker](https://www.npmjs.com/package/accessibility-checker) (automated)
- [axe-core](https://www.npmjs.com/package/axe-core) (automated)

You can test compliance using browser-based tools:
- **axe DevTools** browser extension
- **NVDA** / **JAWS** screen readers (Windows)
- **VoiceOver** (macOS / iOS)
- **Chrome Lighthouse** Accessibility Audit

**Live compliance sample:** [https://ej2.syncfusion.com/accessibility/toast.html](https://ej2.syncfusion.com/accessibility/toast.html)

---

## Best Practices

- Use descriptive, concise `title` and `content` values — screen readers announce these.
- Avoid using only color to convey meaning (use icons or text labels alongside color).
- For critical errors, consider a `Dialog` component instead of a toast — dialogs are modal and cannot be missed.
- Pair toasts with `showCloseButton="true"` for important messages so users can dismiss at their own pace.
- Use sufficient `timeOut` values (≥ 5000ms) to comply with WCAG 2.2 timing adjustable requirements.
