# Customization and Templates – Syncfusion Angular Message

## Table of Contents
- [Content Alignment](#content-alignment)
- [Rounded and Square Borders](#rounded-and-square-borders)
- [Custom CSS via cssClass](#custom-css-via-cssclass)
- [CSS-Only Message (No Script)](#css-only-message-no-script)
- [Predefined CSS Classes Reference](#predefined-css-classes-reference)
- [HTML Template via ng-template](#html-template-via-ng-template)

---

## Content Alignment

By default, message content is aligned to the **left**. Use these built-in CSS classes via the `cssClass` property to change alignment:

| Class | Effect |
|-------|--------|
| *(none)* | Left-aligned (default) |
| `e-content-center` | Center-aligned |
| `e-content-right` | Right-aligned |

```typescript
import { MessageModule } from '@syncfusion/ej2-angular-notifications';
import { Component } from '@angular/core';

@Component({
  imports: [MessageModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="msg-custom-section">
      <div class="content-section">
        <h4>Content Alignment</h4>
        <ejs-message id="msg_left" content="Your license has been activated successfully" severity="Success"></ejs-message>
        <ejs-message id="msg_center" content="The license will expire today" cssClass="e-content-center" severity="Warning"></ejs-message>
        <ejs-message id="msg_right" content="The license key is invalid" cssClass="e-content-right" severity="Error"></ejs-message>
      </div>
    </div>
  `
})
export class AppComponent { }
```

---

## Rounded and Square Borders

The default message has standard rounded corners. You can further customize border radius using `cssClass` with your own CSS rules:

```typescript
import { MessageModule } from '@syncfusion/ej2-angular-notifications';
import { Component } from '@angular/core';

@Component({
  imports: [MessageModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-message content="The license will expire today" cssClass="rounded" severity="Warning"></ejs-message>
    <ejs-message content="The license key is invalid" cssClass="square" severity="Error"></ejs-message>
  `,
  styles: [`
    .rounded.e-message { border-radius: 20px; }
    .square.e-message { border-radius: 0; }
  `]
})
export class AppComponent { }
```

---

## Custom CSS via cssClass

The `cssClass` property appends one or more CSS classes to the root element of the Message component. Use this to override any default styling:

```html
<ejs-message cssClass="my-custom-msg" content="Custom styled message"></ejs-message>
```

```css
.my-custom-msg.e-message {
  border: 2px dashed #6c63ff;
  border-radius: 8px;
}
.my-custom-msg .e-msg-content {
  font-weight: bold;
  color: #6c63ff;
}
```

Multiple classes are space-separated:

```html
<ejs-message cssClass="e-content-center rounded" severity="Success" content="Done!"></ejs-message>
```

---

## CSS-Only Message (No Script)

For lightweight scenarios where no Angular component instance is needed, use the predefined CSS classes directly on plain HTML elements. This renders a message without any JavaScript reference:

**Basic structure (content only):**
```html
<div class="e-message">
  <div class="e-msg-content">..content..</div>
</div>
```

**With icon:**
```html
<div class="e-message">
  <span class="e-msg-icon"></span>
  <div class="e-msg-content">..content..</div>
</div>
```

**Example with all severities:**

```typescript
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="msg-default-section">
      <div class="content-section">
        <div id="msg-default" class="e-message" role="alert">
          <span class="e-msg-icon"></span>
          <div class="e-msg-content">Editing is restricted</div>
        </div>
        <div id="msg-info" class="e-message e-info" role="alert">
          <span class="e-msg-icon"></span>
          <div class="e-msg-content">Please read the comments carefully</div>
        </div>
        <div id="msg-success" class="e-message e-success" role="alert">
          <span class="e-msg-icon"></span>
          <div class="e-msg-content">Your message has been sent successfully</div>
        </div>
        <div id="msg-warning" class="e-message e-warning" role="alert">
          <span class="e-msg-icon"></span>
          <div class="e-msg-content">There was a problem with your network connection</div>
        </div>
        <div id="msg-error" class="e-message e-error" role="alert">
          <span class="e-msg-icon"></span>
          <div class="e-msg-content">A problem occurred while submitting your data</div>
        </div>
      </div>
    </div>
  `
})
export class AppComponent { }
```

---

## Predefined CSS Classes Reference

| Class | Description |
|-------|-------------|
| `e-message` | Root wrapper for the message |
| `e-msg-icon` | Severity type icon span |
| `e-msg-content` | Message content wrapper |
| `e-msg-close-icon` | Close icon element |
| `e-info` | Applies Info severity styling |
| `e-success` | Applies Success severity styling |
| `e-warning` | Applies Warning severity styling |
| `e-error` | Applies Error severity styling |
| `e-content-center` | Aligns message content to center |
| `e-content-right` | Aligns message content to right |

---

## HTML Template via ng-template

For rich content (HTML elements, embedded components), use `<ng-template #content>` inside the `ejs-message` element instead of the `content` property:

```typescript
import { MessageModule, MessageComponent } from '@syncfusion/ej2-angular-notifications';
import { ButtonModule, ButtonComponent } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [MessageModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="msg-template-section">
      <div class="content-section">
        <button ejs-button #showBtn id="showBtn" content="Show pull request"
          cssClass="e-outline e-primary e-success msg-hidden" (click)="showClick()"></button>
        <ejs-message #msg_template id="msg_template" severity="Success" (closed)="closed()">
          <ng-template #content>
            <h1>Merged pull request</h1>
            <p>Pull request #41 merged after a successful build</p>
            <button ejs-button id="commitBtn" cssClass="e-link" content="View commit"></button>
            <button ejs-button #closeBtn id="closeBtn" cssClass="e-link" content="Dismiss" (click)="dismissClick()"></button>
          </ng-template>
        </ejs-message>
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('showBtn') private showBtn!: ButtonComponent;
  @ViewChild('msg_template') private msgTemplate!: MessageComponent;

  showClick(): void {
    this.msgTemplate.visible = true;
    this.showBtn.element.classList.add('msg-hidden');
  }

  dismissClick(): void {
    this.msgTemplate.visible = false;
  }

  closed(): void {
    this.showBtn.element.classList.remove('msg-hidden');
  }
}
```

> Use `<ng-template #content>` for any case where the message body contains Angular components (buttons, icons, etc.) or complex HTML structures. The `content` property only accepts plain strings or HTML string values.
