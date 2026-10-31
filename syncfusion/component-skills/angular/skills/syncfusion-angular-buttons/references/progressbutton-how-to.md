# How-To Recipes — Angular ProgressButton

## 1. Hide the Spinner

Add the `e-hide-spinner` CSS class to the `cssClass` property to suppress the spinner while keeping the progress filler (if enabled).

```typescript
template: `
  <button ejs-progressbutton content="Save"
          [enableProgress]="true"
          cssClass="e-hide-spinner">
  </button>
`
```

---

## 2. Customize Progress with `cssClass`

The `cssClass` property accepts space-separated class names that change the progress appearance.

### Vertical Progress

```typescript
template: `
  <button ejs-progressbutton content="Upload"
          [enableProgress]="true"
          cssClass="e-vertical">
  </button>
`
```

### Progress at Top

```typescript
template: `
  <button ejs-progressbutton content="Process"
          [enableProgress]="true"
          cssClass="e-progress-top">
  </button>
`
```

### Reverse Progress (custom class)

```typescript
// component template
template: `
  <button ejs-progressbutton content="Reverse"
          [enableProgress]="true"
          cssClass="e-reverse-progress">
  </button>
`
```

```css
/* styles.css */
.e-reverse-progress .e-progress {
  right: 0;
  left: auto;
}
```

### Combining Classes

```typescript
cssClass="e-hide-spinner e-progress-top"
```

---

## 3. Trace / Handle ProgressButton Events

The ProgressButton exposes four progress-lifecycle events: `begin`, `progress`, `end`, and `fail`.

```typescript
import { Component } from '@angular/core';
import { ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [ProgressButtonModule],
  selector: 'app-root',
  template: `
    <button ejs-progressbutton content="Send"
            [enableProgress]="true"
            (begin)="onBegin($event)"
            (progress)="onProgress($event)"
            (end)="onEnd($event)"
            (fail)="onFail($event)"
            (created)="onCreated()">
    </button>
    <ul>
      <li *ngFor="let log of eventLog">{{ log }}</li>
    </ul>
  `
})
export class AppComponent {
  eventLog: string[] = [];

  onCreated():          void { this.eventLog.push('created'); }
  onBegin(args: any):   void { this.eventLog.push(`begin — ${args.percent}%`); }
  onProgress(args: any):void { this.eventLog.push(`progress — ${args.percent}%`); }
  onEnd(args: any):     void { this.eventLog.push(`end — ${args.percent}%`); }
  onFail(args: any):    void { this.eventLog.push('fail'); }
}
```

### Event Summary

| Event | Type | Fires when |
|---|---|---|
| `created` | `EmitType<Event>` | Component rendering is completed. |
| `begin` | `EmitType<ProgressEventArgs>` | Progress starts (button clicked). |
| `progress` | `EmitType<ProgressEventArgs>` | Each step interval during progress. |
| `end` | `EmitType<ProgressEventArgs>` | Progress reaches 100% and completes. |
| `fail` | `EmitType<Event>` | Progress is interrupted/incomplete. |

---

## 4. Change Text Content and Styles During Progress

Dynamically update the button's `content` and `cssClass` inside the `begin` and `end` event handlers. Use `@ViewChild` to access the component instance and update its properties, then call `dataBind()` to apply changes immediately.

```typescript
import { Component, ViewChild } from '@angular/core';
import { ProgressButtonComponent, ProgressButtonModule } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  standalone: true,
  imports: [ProgressButtonModule],
  selector: 'app-root',
  template: `
    <button #btn ejs-progressbutton content="Upload"
            cssClass="e-primary"
            [enableProgress]="true"
            [duration]="4000"
            (begin)="onBegin()"
            (end)="onEnd()">
    </button>
  `
})
export class AppComponent {
  @ViewChild('btn') btn!: ProgressButtonComponent;

  onBegin(): void {
    this.btn.content  = 'Uploading…';
    this.btn.cssClass = 'e-info e-hide-spinner';
    this.btn.dataBind();
  }

  onEnd(): void {
    this.btn.content  = 'Done!';
    this.btn.cssClass = 'e-success e-hide-spinner';
    this.btn.dataBind();
  }
}
```

> `dataBind()` applies all pending property changes immediately to the DOM.

---

## 5. Toggle Button

Set `[isToggle]="true"` to make the button switch between normal and active states on each click:

```typescript
template: `
  <button ejs-progressbutton content="Play"
          [isToggle]="true"
          cssClass="e-primary">
  </button>
`
```

---

## 6. Disabled State

```typescript
template: `
  <button ejs-progressbutton content="Submit"
          [disabled]="isLoading">
  </button>
`
```

---

## 7. RTL Support

```typescript
template: `
  <button ejs-progressbutton content="Submit"
          [enableRtl]="true">
  </button>
`
```

---

## 8. HTML Sanitizer

By default, `enableHtmlSanitizer` is `true`. Set to `false` only when you fully trust the HTML content source:

```typescript
template: `
  <button ejs-progressbutton
          content="<b>Bold</b> Submit"
          [enableHtmlSanitizer]="false">
  </button>
`
```
