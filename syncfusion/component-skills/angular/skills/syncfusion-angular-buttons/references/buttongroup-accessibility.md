# Accessibility — Syncfusion Angular ButtonGroup

## Table of Contents
- [Compliance Summary](#compliance-summary)
- [Keyboard Interaction](#keyboard-interaction)
- [Screen Reader Guidance](#screen-reader-guidance)
- [Ensuring Accessibility](#ensuring-accessibility)

---

## Compliance Summary

The ButtonGroup component meets the following accessibility standards:

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
| Axe-core Accessibility Validation | ✅ Full |

The component follows the [WAI-ARIA button interaction pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/#keyboardinteraction).

---

## Keyboard Interaction

Keyboard behavior differs based on the ButtonGroup type:

### Normal Buttons
| Key | Action |
|---|---|
| `Tab` | Moves focus to the next button in the group |
| `Enter` or `Space` | Activates (clicks) the currently focused button |

### Checkbox Type
| Key | Action |
|---|---|
| `Tab` | Moves focus to the next button in the group |
| `Space` | Toggles the focused button's checked state |

### Radio Type
| Key | Action |
|---|---|
| `Tab` | Moves focus to the currently active (checked) button |
| `Right Arrow` | Moves selection to the next button in the group |

---

## Screen Reader Guidance

Predefined color styles (`e-primary`, `e-success`, `e-info`, `e-warning`, `e-danger`) provide **visual indication only**. Screen readers cannot interpret color meaning, so:

- Always include descriptive text content in button labels (e.g., "Delete" not just a red button)
- Do not rely on color alone to convey the button's action or state
- For icon-only buttons, add an `aria-label` attribute describing the action

**Good practice:**
```html
<!-- ✅ Descriptive label + semantic color -->
<button ejs-button cssClass='e-danger'>Delete</button>

<!-- ❌ Color without description is inaccessible -->
<button ejs-button cssClass='e-danger'></button>
```

For radio/checkbox ButtonGroups, the `<label>` elements paired with each `<input>` provide the accessible name automatically — no additional ARIA attributes needed.

---

## Ensuring Accessibility

Syncfusion validates ButtonGroup accessibility using:
- **[accessibility-checker](https://www.npmjs.com/package/accessibility-checker)** — automated compliance scanning
- **[axe-core](https://www.npmjs.com/package/axe-core)** — runtime accessibility analysis

To verify your ButtonGroup implementation meets accessibility requirements, run either tool against your rendered component in a browser environment.
