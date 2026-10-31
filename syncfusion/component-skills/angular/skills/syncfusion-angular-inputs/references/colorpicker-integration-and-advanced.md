# Integration and Advanced — Syncfusion Angular ColorPicker

## Table of Contents
- [ColorPicker in DropDownButton](#colorpicker-in-dropdownbutton)
- [Toggle Popup Programmatically](#toggle-popup-programmatically)
- [State Persistence](#state-persistence)
- [Mode Switcher Visibility](#mode-switcher-visibility)
- [Disabled State](#disabled-state)
- [Popup Lifecycle Events](#popup-lifecycle-events)

---

## ColorPicker in DropDownButton

You can embed an inline ColorPicker inside a `DropDownButton` using the `target` property of the DropDownButton. The picker renders inline, and the DropDownButton acts as the trigger.

```ts
import { Component, ViewChild } from '@angular/core';
import { ColorPickerComponent, ColorPickerEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { DropDownButtonComponent } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-root',
  template: `
    <div id="container">
      <div class="wrap">
        <h4>Choose Color</h4>
        <ejs-input ejs-colorpicker type="color"
          #cp
          id="colorpicker"
          [inline]="true"
          (change)="onChange($event)">
        </ejs-input>
        <ejs-dropdownbutton
          #ddb
          id="dropdownbtn"
          iconCss="e-dropdownbtn-preview"
          target=".e-colorpicker-wrapper"
          (created)="onCreated()"
          (open)="onOpen()">
        </ejs-dropdownbutton>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {
  @ViewChild('ddb') public ddb: DropDownButtonComponent;
  @ViewChild('cp') public cp: ColorPickerComponent;

  public onChange(args: ColorPickerEventArgs): void {
    (this.ddb.element.children[0] as HTMLElement).style.backgroundColor = args.currentValue.rgba;
    this.closePopup();
  }

  public closePopup(): void {
    this.ddb.toggle();
  }

  public onCreated(): void {
    const parentElem = this.cp.element.parentElement as HTMLElement;
    const cancelBtn = parentElem.querySelector('.e-cancel') as HTMLElement;
    cancelBtn.addEventListener('click', this.closePopup.bind(this));
  }

  public onOpen(): void {
    const tooltip = document.getElementsByClassName('e-color-picker-tooltip')[0] as HTMLElement;
    const zindex = parseInt(tooltip.style.zIndex) + 2;
    tooltip.style.zIndex = zindex.toString();
  }
}
```

**Key points:**
- The ColorPicker must be `[inline]="true"` so it renders a DOM element that `target` can reference
- The DropDownButton `target` points to the `.e-colorpicker-wrapper` CSS class (the wrapper rendered around the inline ColorPicker)
- Z-index management in `onOpen()` prevents the tooltip from being hidden behind the popup

---

## Toggle Popup Programmatically

Use the `toggle()` method via a component reference to open or close the ColorPicker popup from code:

```ts
import { Component, ViewChild } from '@angular/core';
import { ColorPickerComponent, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <button (click)="openPicker()">Open Color Picker</button>
      <ejs-input ejs-colorpicker type="color"
        #colorPicker
        id="colorpicker">
      </ejs-input>
    </div>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {
  @ViewChild('colorPicker') public colorPicker: ColorPickerComponent;

  public openPicker(): void {
    this.colorPicker.toggle();
  }
}
```

> `toggle()` acts as a show/hide switch — calling it when the popup is open will close it, and vice versa.

---

## State Persistence

Enable `enablePersistence` to save the selected color value in `localStorage` and restore it on page reload:

```html
<ejs-input ejs-colorpicker type="color"
  id="colorpicker"
  [enablePersistence]="true">
</ejs-input>
```

> The component uses its `id` as the `localStorage` key, so `id` must be unique and consistent across page loads for persistence to work correctly.

---

## Mode Switcher Visibility

The mode switcher button (toggle between Picker and Palette) is visible by default. Hide it with `[modeSwitcher]="false"`:

```html
<!-- Lock to Picker only -->
<ejs-input ejs-colorpicker type="color" [modeSwitcher]="false"></ejs-input>

<!-- Lock to Palette only -->
<ejs-input ejs-colorpicker type="color" mode="Palette" [modeSwitcher]="false"></ejs-input>
```

When hiding the mode switcher in palette mode with `[noColor]="true"`, this also prevents users from accidentally switching to Picker where no-color tiles are not available.

---

## Disabled State

To prevent interaction with the ColorPicker, set `[disabled]="true"`. The SplitButton will appear dimmed and the popup will not open.

```html
<ejs-input ejs-colorpicker type="color" [disabled]="true"></ejs-input>
```

You can also toggle disabled state dynamically via `setProperties`:

```ts
this.colorPickerRef.setProperties({ disabled: true });
this.colorPickerRef.setProperties({ disabled: false });
```

---

## Popup Lifecycle Events

Use these events to control popup open/close behavior, such as preventing the popup from opening under certain conditions:

```ts
import { Component } from '@angular/core';
import { BeforeOpenCloseEventArgs, OpenEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <ejs-input ejs-colorpicker type="color"
      (beforeOpen)="beforeOpen($event)"
      (open)="onOpen($event)"
      (beforeClose)="beforeClose($event)">
    </ejs-input>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {
  public beforeOpen(args: BeforeOpenCloseEventArgs): void {
    // Cancel popup opening if needed
    // args.cancel = true;
    console.log('Popup about to open');
  }

  public onOpen(args: OpenEventArgs): void {
    console.log('Popup opened');
  }

  public beforeClose(args: BeforeOpenCloseEventArgs): void {
    // Cancel popup closing if needed
    // args.cancel = true;
    console.log('Popup about to close');
  }
}
```

| Event | Fires When |
|-------|-----------|
| `beforeOpen` | Before the popup opens — can be cancelled |
| `open` | After the popup has opened |
| `beforeClose` | Before the popup closes — can be cancelled |
