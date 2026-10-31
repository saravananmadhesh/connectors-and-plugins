# UI Customization — Syncfusion Angular ColorPicker

## Table of Contents
- [Hide the Input Value Area](#hide-the-input-value-area)
- [Custom Picker Handle](#custom-picker-handle)
- [Custom Primary Button with Icon](#custom-primary-button-with-icon)
- [Display Hex Code in Input Element](#display-hex-code-in-input-element)
- [Hide Control Buttons](#hide-control-buttons)
- [CSS Class Overrides](#css-class-overrides)
- [Excel-Like Custom UI](#excel-like-custom-ui)

---

## Hide the Input Value Area

By default, the Picker shows an input area at the bottom displaying the current hex/RGB values. To hide it, apply the `e-hide-value` class via `cssClass`:

```html
<ejs-input ejs-colorpicker type="color" cssClass="e-hide-value" [modeSwitcher]="false"></ejs-input>
```

---

## Custom Picker Handle

The drag handle inside the Picker gradient area can be styled with CSS. Apply a custom class via `cssClass` and override the handle styles:

```html
<ejs-input ejs-colorpicker type="color"
  id="colorpicker"
  value="#344aae"
  cssClass="e-custom-picker"
  [modeSwitcher]="false">
</ejs-input>
```

Then in CSS override `.e-custom-picker .e-container .e-handler`:

```css
.e-custom-picker .e-container .e-handler {
  /* e.g. replace with an SVG icon or custom shape */
  background: url('./handle-icon.svg') no-repeat center;
  border-radius: 0;
}
```

---

## Custom Primary Button with Icon

By default, the SplitButton's left portion shows the currently selected color. You can customize it to show a picker icon instead, updating the icon's bottom border color on every change:

```ts
import { Component, ViewChild } from '@angular/core';
import { addClass } from '@syncfusion/ej2-base';
import { ColorPickerComponent, ColorPickerEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div id="container">
      <div class="wrap">
        <h4>Choose Color</h4>
        <ejs-input ejs-colorpicker type="color"
          #cp
          id="colorpicker"
          (created)="onCreated()"
          (change)="onChange($event)">
        </ejs-input>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {
  @ViewChild('cp') public cp: ColorPickerComponent;
  private previewIcon: HTMLElement;

  public onChange(args: ColorPickerEventArgs): void {
    this.previewIcon.style.borderBottomColor = args.currentValue.rgba;
  }

  public onCreated(): void {
    const elem = this.cp.element.nextElementSibling as HTMLElement;
    this.previewIcon = elem.querySelector('.e-selected-color') as HTMLElement;
    addClass([this.previewIcon], 'e-icons');
  }
}
```

> Syncfusion EJ2 provides a built-in icon font. Apply `e-icons` to any element to use it. Third-party icon libraries can also be used.

---

## Display Hex Code in Input Element

You can move the color picker's own `<input>` element into the SplitButton area so the current hex code appears in a text input:

```ts
import { Component, ViewChild } from '@angular/core';
import { ColorPickerComponent, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div id="container">
      <div class="wrap">
        <h4>Choose Color</h4>
        <ejs-input ejs-colorpicker type="color"
          #colorPicker
          id="colorpicker"
          class="e-input"
          (created)="onCreated()">
        </ejs-input>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {
  @ViewChild('colorPicker') public colorPicker: ColorPickerComponent;

  public onCreated(): void {
    const cpElem = this.colorPicker.element.nextElementSibling as HTMLElement;
    cpElem.insertBefore(this.colorPicker.element, cpElem.children[1]);
  }
}
```

---

## Hide Control Buttons

By default, Apply and Cancel buttons appear in the popup. Setting `[showButtons]="false"` hides them — color changes apply immediately when a color is selected.

```html
<ejs-input ejs-colorpicker type="color" [showButtons]="false"></ejs-input>
```

> When `[showButtons]="false"`, the `change` event fires immediately on color selection rather than on Apply.

---

## CSS Class Overrides

Use these CSS selectors to customize specific parts of the ColorPicker UI. Apply them globally or scope them under a custom class via `cssClass`.

| CSS Class | What it Customizes |
|-----------|-------------------|
| `.e-custom-picker .e-container .e-handler` | Selection handle in picker gradient |
| `.color-picker.e-dropdown-popup ul .e-container` | Picker/palette container in popup |
| `.color-picker.e-dropdown-popup ul .e-item.e-palette-item` | Each palette item in popup |
| `.color-picker.e-dropdown-popup .e-container .e-switch` | Mode switcher control |
| `.color-picker.e-dropdown-popup .e-container .e-slider-preview` | Hue/opacity slider track |

For comprehensive theming, use the [Syncfusion Theme Studio](https://ej2.syncfusion.com/themestudio/?theme=material) to generate a custom CSS file.

---

## Excel-Like Custom UI

You can combine the ColorPicker with SplitButton and Dialog to create an Excel-style color picker — a palette in the dropdown with a "More colors..." option that opens a full picker dialog:

```ts
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ColorPickerComponent, ColorPickerEventArgs, PaletteTileEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { SplitButtonComponent, BeforeOpenCloseMenuEventArgs, OpenCloseMenuEventArgs } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-root',
  template: `
    <div id="container">
      <div class="wrap">
        <ul id="target">
          <li class="e-item e-palette-item">
            <ejs-input ejs-colorpicker type="color"
              id="palette"
              mode="Palette"
              [inline]="true"
              [showButtons]="false"
              [modeSwitcher]="false"
              (change)="onPaletteChange($event)">
            </ejs-colorpicker>
          </li>
          <li class="e-item">
            <span class="e-menu-icon"></span>
            More colors...
          </li>
        </ul>
        <h4>Select color</h4>
        <ejs-splitbutton
          id="split-btn"
          iconCss="e-icons e-font-icon"
          target="#target"
          (created)="onSplitBtnCreated()"
          (open)="onDdPopupOpen($event)"
          (beforeClose)="onBeforeDdPopupClose($event)">
        </ejs-splitbutton>
        <ejs-dialog
          #pickerDlg
          id="picker-dialog"
          cssClass="e-dlg-picker"
          [isModal]="true"
          height="336px"
          width="270px"
          target=".wrap"
          [visible]="false"
          [animationSettings]="animationSettings"
          (open)="pickerDlgOpen()"
          (overlayClick)="pickerDlgClose()">
          <ng-template #content>
            <div class="dialogContent">
              <ejs-input ejs-colorpicker type="color"
                id="picker"
                [inline]="true"
                [modeSwitcher]="false"
                (change)="onPickerChange($event)">
              </ejs-colorpicker>
            </div>
          </ng-template>
        </ejs-dialog>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('pickerDlg') public pickerDlg: DialogComponent;
  public animationSettings: object = { effect: 'Zoom' };

  public onPaletteChange(args: ColorPickerEventArgs): void {
    const splitIcon = document.getElementById('split-btn')!.children[0] as HTMLElement;
    splitIcon.style.borderBottomColor = args.currentValue.rgba;
  }

  public onPickerChange(args: ColorPickerEventArgs): void {
    this.onPaletteChange(args);
    this.pickerDlg.hide();
  }

  public onDdPopupOpen(args: OpenCloseMenuEventArgs): void {
    args.element.children[1].addEventListener('click', this.openPickerDlg.bind(this));
  }

  public onBeforeDdPopupClose(args: BeforeOpenCloseMenuEventArgs): void {
    args.element.children[1].removeEventListener('click', this.openPickerDlg.bind(this));
  }

  public openPickerDlg(): void {
    this.pickerDlg.show();
  }

  public pickerDlgOpen(): void {
    const colorPicker = document.getElementById('picker') as any;
    if (colorPicker && colorPicker.refresh) {
      colorPicker.refresh();
    }
    (this.pickerDlg.element.nextElementSibling!
      .querySelector('.e-ctrl-btn .e-cancel')! as HTMLElement)
      .addEventListener('click', this.pickerDlgClose.bind(this));
  }

  public pickerDlgClose(): void {
    this.pickerDlg.hide();
  }

  public onSplitBtnCreated(): void {
    const splitIcon = document.getElementById('split-btn')!.children[0] as HTMLElement;
    splitIcon.style.borderBottomColor = '#008000';
  }

  public ngAfterViewInit(): void {}
}
```

This pattern requires `@syncfusion/ej2-angular-popups` and `@syncfusion/ej2-angular-splitbuttons` packages installed.
