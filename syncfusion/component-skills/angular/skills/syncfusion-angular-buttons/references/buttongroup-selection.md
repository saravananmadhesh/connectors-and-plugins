# Selection — Syncfusion Angular ButtonGroup

## Table of Contents
- [Single Selection (Radio Type)](#single-selection-radio-type)
- [Multiple Selection (Checkbox Type)](#multiple-selection-checkbox-type)
- [Show Selected State on Initial Render](#show-selected-state-on-initial-render)
- [Nesting DropDownButton](#nesting-dropdownbutton)
- [Nesting SplitButton](#nesting-splitbutton)

---

## Single Selection (Radio Type)

Radio-type ButtonGroup allows only **one button to be active at a time** — selecting one deselects all others. This mirrors the behavior of native `<input type="radio">` elements.

**How it works:**
- Place `<input type="radio">` elements inside the `.e-btn-group` container
- Each input needs a unique `id` and a shared `name` attribute (groups the radio buttons)
- Pair each input with a `<label class="e-btn">` whose `for` attribute matches the input's `id`
- The label renders as the visible button; the hidden input handles the selection state

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
        <input type="radio" id="radioleft" name="font" value="left"/>
        <label class="e-btn" for="radioleft">Left</label>
        <input type="radio" id="radiomiddle" name="font" value="middle"/>
        <label class="e-btn" for="radiomiddle">Center</label>
        <input type="radio" id="radioright" name="font" value="right"/>
        <label class="e-btn" for="radioright">Right</label>
      </div>
    </div>`
})
export class AppComponent { }
```

---

## Multiple Selection (Checkbox Type)

Checkbox-type ButtonGroup allows **multiple buttons to be active simultaneously**. This mirrors the behavior of native `<input type="checkbox">` elements.

**How it works:**
- Place `<input type="checkbox">` elements inside `.e-btn-group`
- Each input needs a unique `id` and a shared `name` attribute
- Pair each input with a `<label class="e-btn">` whose `for` matches the input's `id`

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
        <input type="checkbox" id="check_bold" name="align" value="bold"/>
        <label class="e-btn" for="check_bold">Bold</label>
        <input type="checkbox" id="check_italic" name="align" value="italic"/>
        <label class="e-btn" for="check_italic">Italic</label>
        <input type="checkbox" id="check_underline" name="align" value="underline"/>
        <label class="e-btn" for="check_underline">Underline</label>
      </div>
    </div>`
})
export class AppComponent { }
```

---

## Show Selected State on Initial Render

To pre-select a button when the component first renders, add the `checked` attribute to the corresponding `<input>` element.

**Checkbox example with "Bold" pre-selected:**

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
        <input type="checkbox" id="checkbold" name="font" value="bold" checked/>
        <label class="e-btn" for="checkbold">Bold</label>
        <input type="checkbox" id="checkitalic" name="font" value="italic"/>
        <label class="e-btn" for="checkitalic">Italic</label>
        <input type="checkbox" id="checkline" name="font" value="underline"/>
        <label class="e-btn" for="checkline">Underline</label>
      </div>
    </div>`
})
export class AppComponent { }
```

The same `checked` attribute works on `<input type="radio">` for radio-type groups.

---

## Nesting DropDownButton

A DropDownButton can be nested inside a ButtonGroup to provide an expandable list of additional options alongside regular buttons.

**Additional requirements:**
- Import `DropDownButtonModule` from `@syncfusion/ej2-angular-splitbuttons`
- Add extra CSS imports for popups and splitbuttons
- Use `class='e-btn'` (not `ejs-button`) on plain buttons in this context
- Bind `[items]` to an `ItemModel[]` array and set the `content` attribute

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { DropDownButtonModule, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  imports: [DropDownButtonModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group'>
        <button class='e-btn'>HTML</button>
        <button class='e-btn'>CSS</button>
        <button class='e-btn'>JavaScript</button>
        <button ejs-dropdownbutton [items]='items' content='More'></button>
      </div>
    </div>`
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Learn SQL' },
    { text: 'Learn PHP' },
    { text: 'Learn Bootstrap' }
  ];
}
```

**Extra CSS required in `styles.css`:**
```css
@import 'node_modules/@syncfusion/ej2-base/styles/material.css';
@import 'node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import 'node_modules/@syncfusion/ej2-splitbuttons/styles/material.css';
@import 'node_modules/@syncfusion/ej2-angular-popups/styles/material.css';
@import 'node_modules/@syncfusion/ej2-angular-splitbuttons/styles/material.css';
```

---

## Nesting SplitButton

A SplitButton combines a primary action button with a dropdown arrow for secondary actions. Nest it at the end of a ButtonGroup for a contextual action menu.

**Additional requirements:**
- Import `SplitButtonModule` from `@syncfusion/ej2-angular-splitbuttons`
- Same extra CSS as for DropDownButton
- Use `<ejs-splitbutton>` with `content` and `[items]` bindings

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { SplitButtonModule, ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  imports: [SplitButtonModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <div class='e-btn-group'>
        <button class='e-btn'>Cut</button>
        <button class='e-btn'>Copy</button>
        <ejs-splitbutton content="Paste" [items]='items'></ejs-splitbutton>
      </div>
    </div>`
})
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Paste' },
    { text: 'Paste Text' },
    { text: 'Paste Special' }
  ];
}
```

> SplitButton nesting is **not compatible** with vertical orientation (`e-vertical`).
