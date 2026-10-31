# Variants – Syncfusion Angular Message

## Table of Contents
- [Overview](#overview)
- [Available Variants](#available-variants)
- [When to Use Each Variant](#when-to-use-each-variant)
- [Combining Variant and Severity](#combining-variant-and-severity)
- [Code Example – All Combinations](#code-example--all-combinations)

---

## Overview

The `variant` property controls the visual presentation style of the Message component. It changes how colors and borders are applied to the message container, while severity still determines the icon and color scheme.

**Default:** `Text`

```html
<ejs-message severity="Success" variant="Filled" content="Your message has been sent successfully"></ejs-message>
```

---

## Available Variants

| Value | Description |
|-------|-------------|
| `Text` | Severity differentiated using **text color** and a **light background color**. Default style. |
| `Outlined` | Severity differentiated using **text color** and a **border** — no background fill. |
| `Filled` | Severity differentiated using **text color** and a **dark background color**. High contrast, prominent. |

---

## When to Use Each Variant

- **Text** — Suitable for most use cases; subtle, blends into the UI without demanding too much attention.
- **Outlined** — Good for minimal or light-themed UIs where you want structure without background color.
- **Filled** — Best for prominent alerts that need to stand out, such as critical warnings or success banners.

---

## Combining Variant and Severity

Every variant works with every severity. For example:

```html
<!-- Filled + Error — high prominence error message -->
<ejs-message severity="Error" variant="Filled" content="A problem occurred while submitting your data"></ejs-message>

<!-- Outlined + Warning — subtle warning in a clean UI -->
<ejs-message severity="Warning" variant="Outlined" content="There was a problem with your network connection"></ejs-message>

<!-- Text + Info — default informational note -->
<ejs-message severity="Info" variant="Text" content="Please read the comments carefully"></ejs-message>
```

---

## Code Example – All Combinations

The following example shows all three variants alongside each severity:

```typescript
import { MessageModule } from '@syncfusion/ej2-angular-notifications';
import { Component } from '@angular/core';

@Component({
  imports: [MessageModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="msg-variant-section">
      <div class="content-section">
        <h4>Filled</h4>
        <ejs-message id="msg_default_filled" variant="Filled">Editing is restricted</ejs-message>
        <ejs-message id="msg_info_filled" severity="Info" variant="Filled">Please read the comments carefully</ejs-message>
        <ejs-message id="msg_success_filled" severity="Success" variant="Filled">Your message has been sent successfully</ejs-message>
        <ejs-message id="msg_warning_filled" severity="Warning" variant="Filled">There was a problem with your network connection</ejs-message>
        <ejs-message id="msg_error_filled" severity="Error" variant="Filled">A problem occurred while submitting your data</ejs-message>
      </div>
      <div class="content-section">
        <h4>Outlined</h4>
        <ejs-message id="msg_default_outlined" variant="Outlined">Editing is restricted</ejs-message>
        <ejs-message id="msg_info_outlined" severity="Info" variant="Outlined">Please read the comments carefully</ejs-message>
        <ejs-message id="msg_success_outlined" severity="Success" variant="Outlined">Your message has been sent successfully</ejs-message>
        <ejs-message id="msg_warning_outlined" severity="Warning" variant="Outlined">There was a problem with your network connection</ejs-message>
        <ejs-message id="msg_error_outlined" severity="Error" variant="Outlined">A problem occurred while submitting your data</ejs-message>
      </div>
      <div class="content-section">
        <h4>Text</h4>
        <ejs-message id="msg_default">Editing is restricted</ejs-message>
        <ejs-message id="msg_info" severity="Info">Please read the comments carefully</ejs-message>
        <ejs-message id="msg_success" severity="Success">Your message has been sent successfully</ejs-message>
        <ejs-message id="msg_warning" severity="Warning">There was a problem with your network connection</ejs-message>
        <ejs-message id="msg_error" severity="Error">A problem occurred while submitting your data</ejs-message>
      </div>
    </div>
  `
})
export class AppComponent { }
```

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';
bootstrapApplication(AppComponent).catch((err) => console.error(err));
```

> **Tip:** The `variant` value is case-sensitive — use `Text`, `Outlined`, or `Filled` exactly.
