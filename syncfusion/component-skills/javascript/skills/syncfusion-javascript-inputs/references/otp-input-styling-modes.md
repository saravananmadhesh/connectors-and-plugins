# Styling Modes in OTP Input

The `stylingMode` property controls the visual style variant of the OTP input fields. Choose a mode that matches your application's design system.

## Styling Mode Options

| Value | Description |
|---|---|
| `'outlined'` | Bordered input boxes (default) |
| `'filled'` | Filled background input boxes |
| `'underlined'` | Underline-only style (no border box) |

The default is `'outlined'` (`OtpInputStyle.Outlined`).

---

## Outlined Mode (Default)

Renders each input field with a visible border. This is the default styling mode.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    stylingMode: 'outlined'
});
otpInput.appendTo('#otp_outlined');
```

---

## Filled Mode

Renders each input field with a filled background — common in Material Design applications.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    stylingMode: 'filled'
});
otpInput.appendTo('#otp_filled');
```

---

## Underlined Mode

Renders each input field with only a bottom border/underline — a minimal, clean style.

```typescript
import { OtpInput } from '@syncfusion/ej2-inputs';

let otpInput: OtpInput = new OtpInput({
    stylingMode: 'underlined'
});
otpInput.appendTo('#otp_underlined');
```

---

## Choosing a Mode

| Application Style | Recommended Mode |
|---|---|
| Standard web forms | `'outlined'` |
| Material Design / card-heavy UIs | `'filled'` |
| Minimal / flat design | `'underlined'` |

---

## Notes

- `stylingMode` can be set as a string (`'outlined'`, `'filled'`, `'underlined'`) or using the `OtpInputStyle` enum.
- Combine `stylingMode` with `cssClass` for further customization.
- Styling modes are fully supported across all built-in Syncfusion themes.
