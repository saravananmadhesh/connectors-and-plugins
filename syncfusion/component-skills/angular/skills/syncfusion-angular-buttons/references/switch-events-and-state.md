# Events & State Control — Syncfusion Angular Switch

## Table of Contents
- [change Event](#change-event)
- [beforeChange Event — Prevent State Change](#beforechange-event--prevent-state-change)
- [created Event](#created-event)
- [click() Method](#click-method)
- [focusIn() Method](#focusin-method)
- [destroy() Method](#destroy-method)

---

## change Event

The `change` event fires every time the Switch state changes due to user interaction **or** a programmatic `toggle()` call.

**Event argument: `ChangeEventArgs`**
| Property | Type | Description |
|---|---|---|
| `checked` | `boolean` | New checked state after the change |
| `event` | `Event` | Native DOM event |

```typescript
import { Component } from '@angular/core';
import { SwitchModule, ChangeEventArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [SwitchModule],
  selector: 'app-root',
  template: `
    <ejs-switch [checked]="false" (change)="onSwitchChange($event)"></ejs-switch>
    <p>Current state: {{ status }}</p>
  `
})
export class AppComponent {
  status = 'OFF';

  onSwitchChange(args: ChangeEventArgs): void {
    this.status = args.checked ? 'ON' : 'OFF';
    console.log('Switch changed to:', args.checked);
  }
}
```

**Common use cases:**
- Update application state when the user flips the switch
- Send API calls to save settings
- Show/hide UI sections based on switch state

---

## beforeChange Event — Prevent State Change

The `beforeChange` event fires **before** the switch state changes. Set `args.cancel = true` to prevent the change from being applied to the UI.

**Event argument: `BeforeChangeEventArgs`**
| Property | Type | Description |
|---|---|---|
| `checked` | `boolean` | The **new** state the switch is attempting to change to |
| `cancel` | `boolean` | Set to `true` to cancel the state change |
| `event` | `Event` | Native DOM event |

```typescript
import { Component } from '@angular/core';
import { SwitchModule, BeforeChangeEventArgs } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [SwitchModule],
  selector: 'app-root',
  template: `
    <ejs-switch [checked]="false" (beforeChange)="onBeforeChange($event)"></ejs-switch>
    <p>Can toggle: {{ canToggle }}</p>
    <button (click)="canToggle = !canToggle">
      {{ canToggle ? 'Lock Switch' : 'Unlock Switch' }}
    </button>
  `
})
export class AppComponent {
  canToggle = true;

  onBeforeChange(args: BeforeChangeEventArgs): void {
    if (!this.canToggle) {
      args.cancel = true;  // Prevent state change
      console.log('State change cancelled');
    }
  }
}
```

**Use cases:**
- Require user confirmation before disabling a critical feature
- Validate a condition before allowing the switch to flip
- Implement guard logic (e.g., unsaved changes warning)

---

## created Event

The `created` event fires once after the Switch component finishes rendering. Use it to run initialization logic that depends on the component being fully mounted.

```html
<ejs-switch [checked]="false" (created)="onSwitchCreated($event)"></ejs-switch>
```

```typescript
onSwitchCreated(event: Event): void {
  console.log('Switch component is ready');
  // Safe to call methods like toggle(), focusIn() here
}
```

---

## click() Method

Simulates a native click on the Switch element. Flips the checked state programmatically via the DOM click mechanism.

```typescript
import { Component, ViewChild } from '@angular/core';
import { SwitchComponent, SwitchModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  standalone: true,
  imports: [SwitchModule],
  selector: 'app-root',
  template: `
    <ejs-switch #switchRef [checked]="false"></ejs-switch>
    <button (click)="clickSwitch()">Click Switch</button>
  `
})
export class AppComponent {
  @ViewChild('switchRef') switchRef!: SwitchComponent;

  clickSwitch(): void {
    this.switchRef.click();
  }
}
```

> Prefer `toggle()` for programmatic state control. Use `click()` only when you specifically need to simulate a native DOM click event.

---

## focusIn() Method

Programmatically focuses the Switch element. Useful for accessibility workflows, form navigation, or directing keyboard focus.

```typescript
export class AppComponent {
  @ViewChild('switchRef') switchRef!: SwitchComponent;

  focusSwitch(): void {
    this.switchRef.focusIn();
  }
}
```

```html
<ejs-switch #switchRef></ejs-switch>
<button (click)="focusSwitch()">Focus Switch</button>
```

Once focused, the user can toggle the Switch with the **Space** key.

---

## destroy() Method

Destroys the Switch widget, removing event listeners and releasing resources. Call this when removing the component manually outside Angular's lifecycle.

```typescript
export class AppComponent {
  @ViewChild('switchRef') switchRef!: SwitchComponent;

  ngOnDestroy(): void {
    this.switchRef.destroy();
  }
}
```

> In Angular, components are destroyed automatically when navigating away or unmounting. Only call `destroy()` explicitly for non-Angular use cases.
