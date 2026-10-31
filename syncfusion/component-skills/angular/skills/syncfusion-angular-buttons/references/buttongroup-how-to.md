# How-To Recipes — Syncfusion Angular ButtonGroup

## Table of Contents
- [Disable Buttons](#disable-buttons)
- [Enable Ripple Effect](#enable-ripple-effect)
- [Enable RTL (Right-to-Left)](#enable-rtl-right-to-left)
- [Form Submission](#form-submission)
- [Initialize Using createButtonGroup Utility](#initialize-using-createbuttongroup-utility)

---

## Disable Buttons

### Disable an Individual Button

Add `[disabled]="true"` to the specific `ejs-button` element. Other buttons in the group remain interactive:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group'>
        <button ejs-button>HTML</button>
        <button ejs-button [disabled]="true">CSS</button>
        <button ejs-button>JavaScript</button>
      </div>
    </div>`
})
export class AppComponent { }
```

### Disable the Entire ButtonGroup

Apply `[disabled]="true"` to **all** `ejs-button` elements in the group:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group'>
        <button ejs-button [disabled]="true">HTML</button>
        <button ejs-button [disabled]="true">CSS</button>
        <button ejs-button [disabled]="true">JavaScript</button>
      </div>
    </div>`
})
export class AppComponent { }
```

> For radio/checkbox type ButtonGroups, add the `disabled` attribute directly to the corresponding `<input>` element, not the label. A disabled input's value will **not** be submitted on form submit.

---

## Enable Ripple Effect

Import the `enableRipple` function from `@syncfusion/ej2-base` and call it with `true` to activate the Material ripple effect on button clicks:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class="e-btn-group">
        <button ejs-button>HTML</button>
        <button ejs-button>CSS</button>
        <button ejs-button>JavaScript</button>
      </div>
    </div>`
})
export class AppComponent { }
```

Call `enableRipple(true)` at module level (outside the component class) so it applies globally before the component renders.

---

## Enable RTL (Right-to-Left)

Add the `e-rtl` class to the `.e-btn-group` container. The layout reverses — buttons render from right to left, suitable for Arabic, Hebrew, and other RTL languages:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group e-rtl'>
        <button ejs-button>HTML</button>
        <button ejs-button>CSS</button>
        <button ejs-button>JavaScript</button>
      </div>
    </div>`
})
export class AppComponent { }
```

---

## Form Submission

Use radio or checkbox type ButtonGroups inside an HTML `<form>` to capture user selections. On form submit:
- The `name` attribute groups related inputs together
- The `value` of the **checked** input is sent to the server
- Disabled inputs are **not** submitted

**Radio group form example** (with "Male" pre-selected via `checked`):

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <form>
        <div class='e-btn-group'>
          <input type="radio" id="male" name="gender" value="male" checked/>
          <label class="e-btn" for="male">Male</label>
          <input type="radio" id="female" name="gender" value="female"/>
          <label class="e-btn" for="female">Female</label>
          <input type="radio" id="transgender" name="gender" value="transgender"/>
          <label class="e-btn" for="transgender">Transgender</label>
        </div>
        <button class='e-btn e-primary'>Submit</button>
      </form>
    </div>`
})
export class AppComponent { }
```

**Key points:**
- All radio inputs in a group share the same `name` — this is what enforces single-selection and groups the values for form submission
- For checkbox groups, only the `checked` items' values are submitted
- The submit button uses `class='e-btn e-primary'` (plain HTML button with Syncfusion CSS classes)

---

## Initialize Using createButtonGroup Utility

The `createButtonGroup` utility function from `@syncfusion/ej2-splitbuttons` provides a programmatic way to initialize ButtonGroups. It reads existing DOM elements (buttons or inputs) and applies the correct Syncfusion CSS classes automatically.

**When to use:** Useful for dynamically created markup or when you prefer imperative initialization over declarative templates.

**Usage:**
```typescript
createButtonGroup(selector: string, options: { buttons: Array<{ content: string } | null> }): void
```

- `selector` — CSS selector string targeting the container element (e.g., `'#basic'`)
- `buttons` — array of objects with a `content` string matching each button/input in order
- Pass `null` for any button to skip it in processing

**Full example** — initializing normal, checkbox, and radio groups:

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { createButtonGroup } from '@syncfusion/ej2-splitbuttons';

@Component({
  imports: [ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <h5>Normal behavior</h5>
      <div id='basic'>
        <button></button>
        <button></button>
        <button></button>
      </div>
      <h5>Checkbox type behavior</h5>
      <div id='checkbox'>
        <input type="checkbox" id="checkbold" name="font" value="bold"/>
        <input type="checkbox" id="checkitalic" name="font" value="italic"/>
        <input type="checkbox" id="checkundeline" name="font" value="underline"/>
      </div>
      <h5>Radiobutton type behavior</h5>
      <div id='radio'>
        <input type="radio" id="radioleft" name="align" value="left"/>
        <input type="radio" id="radiomiddle" name="align" value="middle"/>
        <input type="radio" id="radioright" name="align" value="right"/>
      </div>
    </div>`
})
export class AppComponent {
  ngOnInit() {
    createButtonGroup('#basic', {
      buttons: [
        { content: 'HTML' },
        { content: 'CSS' },
        { content: 'JavaScript' }
      ]
    });

    createButtonGroup('#checkbox', {
      buttons: [
        { content: 'Bold' },
        { content: 'Italic' },
        { content: 'Underline' }
      ]
    });

    createButtonGroup('#radio', {
      buttons: [
        { content: 'Left' },
        { content: 'Center' },
        { content: 'Right' }
      ]
    });
  }
}
```

**Gotcha:** The number of objects in the `buttons` array must match the number of `<button>` or `<input>` elements in the target container. Pass `null` to skip a specific element without processing it.
