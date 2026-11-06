# Severities – Syncfusion Angular Message

## Table of Contents
- [Overview](#overview)
- [Available Severity Types](#available-severity-types)
- [When to Use Each Severity](#when-to-use-each-severity)
- [Code Example](#code-example)

---

## Overview

The `severity` property controls the icon and color used to convey the importance and context of a message. Each severity maps to a distinct visual style so users can instantly recognize message types.

**Default:** `Normal`

```html
<ejs-message severity="Info" content="Please read the comments carefully"></ejs-message>
```

---

## Available Severity Types

| Value | Description | Use Case |
|-------|-------------|----------|
| `Normal` | Neutral, no color accent | General information with no specific urgency |
| `Info` | Blue, information icon | Informational notes, tips, guidance |
| `Success` | Green, checkmark icon | Confirmation of a completed or successful action |
| `Warning` | Yellow/orange, warning icon | Cautionary messages, potential issues |
| `Error` | Red, error icon | Failures, blocking errors, invalid states |

---

## When to Use Each Severity

- **Normal** — Neutral messages where no emphasis is needed, such as general notes or help text.
- **Info** — Non-urgent tips or informational guidance the user should be aware of.
- **Success** — Confirming that an action completed successfully (e.g., form saved, file uploaded).
- **Warning** — Alerting the user to a potential issue that may require attention (e.g., expiring license, slow network).
- **Error** — Indicating that something failed and likely requires the user to take action (e.g., validation error, submission failure).

---

## Code Example

The following example renders all five severity types together:

```typescript
import { MessageModule } from '@syncfusion/ej2-angular-notifications';
import { Component } from '@angular/core';

@Component({
  imports: [MessageModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="msg-default-section">
      <div class="content-section">
        <ejs-message id="msg_default" content="Editing is restricted"></ejs-message>
        <ejs-message id="msg_info" content="Please read the comments carefully" severity="Info"></ejs-message>
        <ejs-message id="msg_success" content="Your message has been sent successfully" severity="Success"></ejs-message>
        <ejs-message id="msg_warning" content="There was a problem with your network connection" severity="Warning"></ejs-message>
        <ejs-message id="msg_error" content="A problem occurred while submitting your data" severity="Error"></ejs-message>
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

> **Tip:** The `severity` property accepts a string value. It is case-sensitive — use the exact casing shown (`Normal`, `Info`, `Success`, `Warning`, `Error`).
