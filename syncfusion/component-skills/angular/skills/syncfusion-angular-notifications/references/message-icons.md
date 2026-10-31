# Icons and Close Icon – Syncfusion Angular Message

## Table of Contents
- [Severity Icon](#severity-icon)
- [Hiding the Severity Icon](#hiding-the-severity-icon)
- [Custom Severity Icon](#custom-severity-icon)
- [Close Icon](#close-icon)
- [Handling the closed Event](#handling-the-closed-event)
- [Restoring Visibility Programmatically](#restoring-visibility-programmatically)

---

## Severity Icon

By default, the Message component shows a severity-appropriate icon on the left edge (`showIcon` defaults to `true`). The icon changes automatically based on the `severity` property:

- **Normal** — default icon
- **Info** — information icon
- **Success** — checkmark icon
- **Warning** — warning/triangle icon
- **Error** — error/circle icon

---

## Hiding the Severity Icon

To hide the severity icon, set `showIcon` to `false`:

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
        <ejs-message id="msg_default" content="Editing is restricted" [showIcon]="false"></ejs-message>
        <ejs-message id="msg_info" content="Please read the comments carefully" severity="Info" [showIcon]="false"></ejs-message>
        <ejs-message id="msg_success" content="Your message has been sent successfully" severity="Success" [showIcon]="false"></ejs-message>
        <ejs-message id="msg_warning" content="There was a problem with your network connection" severity="Warning" [showIcon]="false"></ejs-message>
        <ejs-message id="msg_error" content="A problem occurred while submitting your data" severity="Error" [showIcon]="false"></ejs-message>
      </div>
    </div>
  `
})
export class AppComponent { }
```

---

## Custom Severity Icon

To override the default severity icon with a custom one, use the `cssClass` property to apply a CSS class that targets the icon element (`.e-msg-icon`):

```html
<ejs-message id="msg_icon" cssClass="custom">
  Essential JS 2 is a modern JavaScript UI Controls library built to be lightweight and touch friendly.
</ejs-message>
```

```css
/* In your component or global CSS */
.custom .e-msg-icon {
  /* Replace with your custom icon using background-image or font-icon */
  background-image: url('path/to/icon.svg');
  background-size: contain;
  background-repeat: no-repeat;
}
```

> Only use `cssClass` to customize the icon. Do not directly modify the severity icon element class.

---

## Close Icon

The Message component optionally renders a close icon to let users dismiss the message. By default, `showCloseIcon` is `false`.

To enable the close icon:

```html
<ejs-message severity="Warning" [showCloseIcon]="true">
  There was a problem with your network connection
</ejs-message>
```

When the user clicks the close icon (or uses the keyboard), the message hides and the `closed` event fires.

---

## Handling the closed Event

Use the `(closed)` event binding to detect when the user dismisses the message. The event receives a `MessageCloseEventArgs` object:

```typescript
import { MessageModule, MessageComponent } from '@syncfusion/ej2-angular-notifications';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [MessageModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="msg-icon-section">
      <div class="content-section">
        <button #btn1 ejs-button content="Show Default Message" cssClass="e-outline e-primary msg-hidden" (click)="defaultClick()"></button>
        <ejs-message #msg_default id="msg_default" [showCloseIcon]="true" (closed)="defaultClosed()">Editing is restricted</ejs-message>

        <button #btn2 ejs-button content="Show Info Message" cssClass="e-outline e-primary e-info msg-hidden" (click)="infoClick()"></button>
        <ejs-message #msg_info id="msg_info" severity="Info" [showCloseIcon]="true" (closed)="infoClosed()">Please read the comments carefully</ejs-message>

        <button #btn3 ejs-button content="Show Success Message" cssClass="e-outline e-primary e-success msg-hidden" (click)="successClick()"></button>
        <ejs-message #msg_success id="msg_success" severity="Success" [showCloseIcon]="true" (closed)="successClosed()">Your message has been sent successfully</ejs-message>
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('btn1') private defaultBtn: any;
  @ViewChild('btn2') private infoBtn: any;
  @ViewChild('btn3') private successBtn: any;
  @ViewChild('msg_default') private msgDefault!: MessageComponent;
  @ViewChild('msg_info') private msgInfo!: MessageComponent;
  @ViewChild('msg_success') private msgSuccess!: MessageComponent;

  defaultClick(): void { this.msgDefault.visible = true; this.defaultBtn.element.classList.add('msg-hidden'); }
  defaultClosed(): void { this.defaultBtn.element.classList.remove('msg-hidden'); }

  infoClick(): void { this.msgInfo.visible = true; this.infoBtn.element.classList.add('msg-hidden'); }
  infoClosed(): void { this.infoBtn.element.classList.remove('msg-hidden'); }

  successClick(): void { this.msgSuccess.visible = true; this.successBtn.element.classList.add('msg-hidden'); }
  successClosed(): void { this.successBtn.element.classList.remove('msg-hidden'); }
}
```

---

## Restoring Visibility Programmatically

After a message is closed, restore it by setting `visible = true` on the component reference:

```typescript
// In component class:
@ViewChild('msg') msg!: MessageComponent;

reopenMessage(): void {
  this.msg.visible = true;
}
```

```html
<ejs-message #msg severity="Error" [showCloseIcon]="true">
  A problem occurred while submitting your data
</ejs-message>
<button (click)="reopenMessage()">Show again</button>
```

> `visible` is the correct API to programmatically show/hide the message — do not use CSS `display` manipulation directly.
