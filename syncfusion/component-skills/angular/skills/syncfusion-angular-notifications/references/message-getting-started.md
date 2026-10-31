# Getting Started – Syncfusion Angular Message

## Table of Contents
- [Prerequisites](#prerequisites)
- [Install the Package](#install-the-package)
- [Add CSS Reference](#add-css-reference)
- [Add the Message Component](#add-the-message-component)
- [Run the Application](#run-the-application)

---

## Prerequisites

- Angular CLI installed globally: `npm install -g @angular/cli`
- This guide targets Angular 19+ using standalone components (default since Angular 19).

Create a new app if needed:

```bash
ng new syncfusion-angular-app
cd syncfusion-angular-app
```

---

## Install the Package

Use `ng add` to install the Syncfusion Notifications package. This automatically adds the dependency to `package.json`, imports the component, and registers the default Material3 theme in `angular.json`:

```bash
ng add @syncfusion/ej2-angular-notifications
```

For Angular 12–15 (legacy/ngcc builds):

```bash
npm add @syncfusion/ej2-angular-notifications@32.1.19-ngcc
```

---

## Add CSS Reference

After `ng add`, the Material3 theme is registered automatically. To style only the Message component manually:

```css
/* styles.css */
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/message/index.css";
```

> Import order matters — `ej2-base` must come before the component styles.

For SCSS users, update `styles.scss` accordingly using the `.scss` variants of the same paths.

---

## Add the Message Component

In your `src/app/app.ts` (Angular 20+) or `src/app/app.component.ts` (Angular 19 and below), import `MessageModule` and add `ejs-message` to the template:

```typescript
import { MessageModule } from '@syncfusion/ej2-angular-notifications';
import { Component } from '@angular/core';

@Component({
  imports: [MessageModule],
  standalone: true,
  selector: 'app-root',
  template: '<ejs-message content="Please read the comments carefully"></ejs-message>'
})
export class AppComponent { }
```

The `content` property sets the message text. Without specifying a `severity`, the message renders in the default **Normal** style.

You can also nest content directly inside the tag instead of using the `content` property:

```typescript
template: `<ejs-message>Please read the comments carefully</ejs-message>`
```

---

## Run the Application

```bash
ng serve --open
```

The browser opens with the message rendered. The output shows a simple informational message with the default Normal severity styling.

### Minimal Bootstrap (main.ts)

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'zone.js';

bootstrapApplication(AppComponent).catch((err) => console.error(err));
```
