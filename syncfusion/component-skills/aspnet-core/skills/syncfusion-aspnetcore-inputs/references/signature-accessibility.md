# Signature Accessibility — ASP.NET Core

This reference covers accessibility standards, keyboard interaction, and screen reader support for the Syncfusion ASP.NET Core Signature control.

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Support](#screen-reader-support)
- [Mobile Device Support](#mobile-device-support)
- [Best Practices](#best-practices)
- [Examples](#examples)

---

## Compliance Overview

| Accessibility Criteria | Support |
|------------------------|---------|
| **WCAG 2.2** | ✅ Full |
| **Section 508** | ✅ Full |
| **Screen Reader Support** | ✅ Full |
| **Right-To-Left Support** | N/A |
| **Color Contrast** | ✅ Full |
| **Mobile Device Support** | ✅ Full |
| **Keyboard Navigation Support** | ✅ Full |
| **Accessibility Checker Validation** | ✅ Full |
| **Axe-core Accessibility Validation** | ✅ Full |

---

## Keyboard Interaction

The Signature component supports the following keyboard shortcuts when the canvas has focus:

| Key | Action |
|-----|--------|
| `Ctrl + Z` | Undo the last stroke/action |
| `Ctrl + Y` | Redo the last undone action |
| `Ctrl + S` | Save the signature (triggers `beforeSave` event) |
| `Delete` | Clear all signature strokes from the canvas |

> **Note:** `Ctrl + S` raises the `beforeSave` event, which allows you to customize the file name and type before the download occurs. This event is only triggered via keyboard — not when calling `save()` programmatically.

---

## Screen Reader Support

The Signature canvas is equipped with appropriate ARIA roles and labels so screen readers can announce the component's state and purpose to users who rely on assistive technology.

---

## Mobile Device Support

The component captures input from touch events (finger or stylus), making it fully functional on tablets and touchscreen devices. Pointer events handle both mouse and touch seamlessly.

---

## Best Practices

- Always provide a visible label or heading (e.g., `<h4>Sign here</h4>`) near the signature canvas so keyboard and screen reader users understand the context.
- Do not rely on color alone to communicate instructions — use text labels alongside color-coded controls.
- Ensure sufficient color contrast between `strokeColor` and `backgroundColor` (minimum 3:1 ratio for large UI elements).
- When integrating with a toolbar, make sure toolbar buttons are keyboard-focusable and have descriptive `tooltipText` values.

---

## Examples

### Accessible Signature Form

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs

<div class='wrap' role="region" aria-labelledby="signatureHeading">
    <h4 id="signatureHeading">Sign here</h4>
    
    <ejs-signature id="signature" 
                   disabled="false" 
                   isReadOnly="false">
    </ejs-signature>
    
    <p id="signatureHelp">
        Use your mouse, finger, or stylus to sign in the box above.
        Press Ctrl+Z to undo, Ctrl+Y to redo, Delete to clear.
    </p>
</div>

<style>
    .wrap {
        margin: 0 auto;
        width: 400px;
        text-align: center;
    }

    #signature {
        border: 1px solid #767676;
        height: 200px;
        width: 100%;
    }
    
    #signatureHelp {
        color: #595959;
        font-size: 0.875rem;
        margin-top: 8px;
    }
</style>
```

### With Keyboard Hints

**Razor View (CSHTML):**
```html
@using Syncfusion.EJ2.Inputs

<div class='signature-container'>
    <h4 id="signHeading">Digital Signature</h4>
    
    <ejs-signature id="signature"></ejs-signature>
    
    <div id="signDescription">
        <p>Sign your name in the box above.</p>
        <details>
            <summary>Keyboard shortcuts</summary>
            <ul>
                <li><kbd>Ctrl + Z</kbd> — Undo</li>
                <li><kbd>Ctrl + Y</kbd> — Redo</li>
                <li><kbd>Ctrl + S</kbd> — Save</li>
                <li><kbd>Delete</kbd> — Clear all</li>
            </ul>
        </details>
    </div>
</div>
```

---

## See Also

- `signature-getting-started.md` — Quick start guide
- `signature-api.md` — Complete API reference
- `signature-customization.md` — Customization options
- `signature-user-interaction.md` — User interaction patterns
