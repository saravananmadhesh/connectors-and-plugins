# Events — Syncfusion Angular TextArea

## Table of Contents
- [Event Summary](#event-summary)
- [created](#created)
- [input](#input)
- [change](#change)
- [focus](#focus)
- [blur](#blur)
- [destroyed](#destroyed)
- [Using Multiple Events Together](#using-multiple-events-together)

---

## Event Summary

| Event | Trigger | Args Type |
|---|---|---|
| `created` | Component fully initialized | `Object` |
| `input` | Every keystroke / value change | `InputEventArgs` |
| `change` | Value changed + textarea loses focus | `ChangedEventArgs` |
| `focus` | Textarea gains focus | `FocusInEventArgs` |
| `blur` | Textarea loses focus | `FocusOutEventArgs` |
| `destroyed` | Component destroyed | `Object` |

---

## created

Fires when the TextArea is created and ready to use. Useful for post-initialization setup:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `<ejs-textarea id="default" (created)="onCreated()"></ejs-textarea>`
})
export class App {
  onCreated() {
    console.log('TextArea is ready');
  }
}
```

---

## input

Fires on every value change (real-time). Use this for live character counting, immediate validation feedback, or search filtering:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule, InputEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea
      id="default"
      [maxLength]="200"
      (input)="onInput($event)">
    </ejs-textarea>
    <p>{{ remaining }} characters remaining</p>
  `
})
export class App {
  remaining: number = 200;

  onInput(args: InputEventArgs) {
    const length = (args.value as string)?.length ?? 0;
    this.remaining = 200 - length;
  }
}
```

**Key `InputEventArgs` properties:**
- `args.value` — current textarea value (string)
- `args.event` — the native DOM input event

---

## change

Fires when the textarea content changes **and** the textarea loses focus. Use this for form submission validation or saving data after editing:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule, ChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `<ejs-textarea id="default" (change)="onChange($event)"></ejs-textarea>`
})
export class App {
  onChange(args: ChangedEventArgs) {
    console.log('New value:', args.value);
    console.log('Previous value:', args.previousValue);
  }
}
```

**Key `ChangedEventArgs` properties:**
- `args.value` — new value
- `args.previousValue` — value before the change
- `args.event` — the native DOM change event

> **Difference from `input`:** `change` fires only after blur — use `input` for real-time updates, `change` for "committed" changes.

---

## focus

Fires when the TextArea gains focus. Use to highlight related UI elements or show helper text:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule, FocusInEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea id="default" (focus)="onFocus($event)"></ejs-textarea>
    <p *ngIf="isFocused">Start typing your message...</p>
  `
})
export class App {
  isFocused = false;

  onFocus(args: FocusInEventArgs) {
    this.isFocused = true;
    console.log('Focused element:', args.event.target);
  }
}
```

---

## blur

Fires when the TextArea loses focus. Use to trigger validation or hide helpers:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule, FocusOutEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea id="default" (blur)="onBlur($event)"></ejs-textarea>
    <span *ngIf="showError" style="color:red;">Please enter a description.</span>
  `
})
export class App {
  showError = false;
  currentValue = '';

  onBlur(args: FocusOutEventArgs) {
    this.showError = this.currentValue.trim().length === 0;
  }
}
```

---

## destroyed

Fires when the TextArea component is destroyed (removed from DOM). Use for cleanup:

```typescript
import { Component } from '@angular/core';
import { TextAreaModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `<ejs-textarea id="default" (destroyed)="onDestroyed()"></ejs-textarea>`
})
export class App {
  onDestroyed() {
    console.log('TextArea has been destroyed');
  }
}
```

---

## Using Multiple Events Together

```typescript
import { Component } from '@angular/core';
import { TextAreaModule, InputEventArgs, ChangedEventArgs, FocusInEventArgs, FocusOutEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
  standalone: true,
  imports: [TextAreaModule],
  selector: 'app-root',
  template: `
    <ejs-textarea
      id="full-events"
      placeholder="Enter feedback"
      [rows]="5"
      [maxLength]="300"
      (created)="onCreated()"
      (focus)="onFocus($event)"
      (input)="onInput($event)"
      (change)="onChange($event)"
      (blur)="onBlur($event)">
    </ejs-textarea>
    <div>
      <span>{{ charCount }}/300</span>
      <span *ngIf="hasError" style="color:red;margin-left:8px;">Required field</span>
    </div>
  `
})
export class App {
  charCount = 0;
  hasError = false;

  onCreated() { console.log('Ready'); }

  onFocus(args: FocusInEventArgs) { this.hasError = false; }

  onInput(args: InputEventArgs) {
    this.charCount = (args.value as string)?.length ?? 0;
  }

  onChange(args: ChangedEventArgs) {
    console.log('Saved value:', args.value);
  }

  onBlur(args: FocusOutEventArgs) {
    this.hasError = this.charCount === 0;
  }
}
```
