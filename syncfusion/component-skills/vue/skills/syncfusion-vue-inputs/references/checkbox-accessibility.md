# Accessibility — Syncfusion Vue CheckBox

## Table of Contents
- [Compliance Overview](#compliance-overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Interaction](#keyboard-interaction)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Ensuring Accessibility in Your App](#ensuring-accessibility-in-your-app)

---

## Compliance Overview

The Syncfusion Vue CheckBox component is built to meet major accessibility standards:

| Accessibility Criteria | Support |
|---|---|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| Screen Reader Support | ✅ Full |
| Right-To-Left Support | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device Support | ✅ Full |
| Keyboard Navigation | ✅ Full |
| Accessibility Checker Validation | ✅ Full |
| Axe-core Validation | ✅ Full |

The component follows [WAI-ARIA CheckBox patterns](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/).

---

## WAI-ARIA Attributes

| Attribute | Purpose |
|---|---|
| `aria-disabled` | Indicates the CheckBox is perceived but disabled — not editable or operable. Applied automatically when `:disabled="true"`. |

The CheckBox renders as a native `<input type="checkbox">` element, which provides built-in `role="checkbox"` semantics for screen readers. No additional ARIA role configuration is needed.

---

## Keyboard Interaction

The CheckBox follows the [WAI-ARIA keyboard interaction guidelines](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/#keyboardinteraction):

| Key | Action |
|-----|--------|
| `Space` | Toggles the checkbox between checked and unchecked when focused |

The checkbox receives focus via standard `Tab` navigation. Focus indicators are visible and meet WCAG contrast requirements.

---

## Right-to-Left (RTL) Support

Enable RTL rendering for languages using right-to-left scripts (Arabic, Hebrew, etc.) by setting `:enable-rtl="true"`:

```vue
<template>
  <div>
    <ul>
      <li>
        <ejs-checkbox
          label="Default RTL"
          :enable-rtl="true">
        </ejs-checkbox>
      </li>
      <li>
        <ejs-checkbox
          label="Checked RTL"
          :checked="true"
          :enable-rtl="true">
        </ejs-checkbox>
      </li>
    </ul>
  </div>
</template>

<script>
import { CheckBoxComponent } from '@syncfusion/ej2-vue-buttons';

export default {
  components: {
    'ejs-checkbox': CheckBoxComponent
  }
}
</script>
```

When `:enable-rtl="true"`:
- The checkbox frame and label flip to right-to-left orientation
- Works in combination with `label-position` for full layout control

**Property:** `enableRtl` — `boolean`, defaults to `false`
