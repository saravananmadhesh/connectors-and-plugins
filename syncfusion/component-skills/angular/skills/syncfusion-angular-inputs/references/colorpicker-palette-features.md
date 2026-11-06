# Palette Features — Syncfusion Angular ColorPicker

## Table of Contents
- [Custom Palette Colors](#custom-palette-colors)
- [Custom Palette Tile Rendering](#custom-palette-tile-rendering)
- [No-Color Support](#no-color-support)
- [Custom No-Color Option](#custom-no-color-option)
- [Show Recent Colors](#show-recent-colors)
- [Palette Column Count](#palette-column-count)

---

## Custom Palette Colors

By default the palette shows a standard set of colors. Use `presetColors` to load your own groups. Each key becomes a named section; values are arrays of hex strings.

```ts
import { Component } from '@angular/core';
import { ColorPickerEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div id="container">
      <div class="wrap">
        <div id="preview"></div>
        <h4>Select Color</h4>
        <ejs-input ejs-colorpicker type="color"
          id="element"
          mode="Palette"
          [modeSwitcher]="false"
          [inline]="true"
          [showButtons]="false"
          [columns]="4"
          [presetColors]="presets"
          (change)="onChange($event)">
        </ejs-input>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {
  public presets: { [key: string]: string[] } = {
    custom1: [
      '#ef9a9a', '#e57373', '#ef5350', '#f44336',
      '#f48fb1', '#f06292', '#ec407a', '#e91e63',
      '#ce93d8', '#ba68c8', '#ab47bc', '#9c27b0',
      '#b39ddb', '#9575cd', '#7e57c2', '#673AB7'
    ],
    custom2: [
      '#9FA8DA', '#7986CB', '#5C6BC0', '#3F51B5',
      '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3',
      '#81D4FA', '#4FC3F7', '#29B6F6', '#03A9F4',
      '#80DEEA', '#4DD0E1', '#26C6DA', '#00BCD4'
    ],
    custom3: [
      '#80CBC4', '#4DB6AC', '#26A69A', '#009688',
      '#A5D6A7', '#81C784', '#66BB6A', '#4CAF50',
      '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A',
      '#E6EE9C', '#DCE775', '#D4E157', '#CDDC39'
    ]
  };

  public onChange(args: ColorPickerEventArgs): void {
    (document.getElementById('preview') as HTMLElement).style.backgroundColor = args.currentValue.hex;
  }
}
```

---

## Custom Palette Tile Rendering

Use the `beforeTileRender` event to add custom classes or modify each palette tile's DOM element before it is rendered.

```ts
import { Component } from '@angular/core';
import { PaletteTileEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <ejs-input ejs-colorpicker type="color"
      mode="Palette"
      [presetColors]="presets"
      (beforeTileRender)="tileRender($event)"
      [inline]="true"
      [showButtons]="false">
    </ejs-input>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {
  public presets: { [key: string]: string[] } = {
    brand: ['#0078d4', '#106ebe', '#005a9e', '#004578']
  };

  public tileRender(args: PaletteTileEventArgs): void {
    args.element.classList.add('e-icons', 'e-custom-tile');
  }
}
```

The `args.element` is the tile's `<span>` DOM element. You can set styles, titles, or ARIA attributes on it directly.

---

## No-Color Support

The `noColor` property adds a special "no color" tile as the first tile in the palette. Clicking it clears the current color selection (sets value to empty).

```ts
import { Component } from '@angular/core';
import { ColorPickerEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <div id="container">
      <div class="wrap">
        <div id="preview"></div>
        <h4>Select Color</h4>
        <ejs-input ejs-colorpicker type="color"
          id="colorpicker"
          [value]="'#ba68c8'"
          mode="Palette"
          [noColor]="true"
          [showButtons]="false"
          [modeSwitcher]="false"
          (change)="onChange($event)">
        </ejs-input>
      </div>
    </div>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {
  public onChange(args: ColorPickerEventArgs): void {
    const preview = document.getElementById('preview') as HTMLElement;
    preview.style.backgroundColor = args.currentValue.hex;
    preview.textContent = args.currentValue.hex ? args.currentValue.hex : 'No color';
  }
}
```

> **Important:** When `[noColor]="true"`, always set `[modeSwitcher]="false"` — the no-color tile only exists in palette mode.

---

## Custom No-Color Option

Instead of the built-in `noColor` tile, you can build a fully custom "No color" list item and manually clear the picker's value:

```ts
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ColorPickerComponent, PaletteTileEventArgs, ColorPickerEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';
import { SplitButtonComponent } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ ColorPickerModule],
  template: `
    <div id="container">
      <div class="wrap">
        <ul id="target">
          <li class="e-item e-palette-item">
            <ejs-input ejs-colorpicker type="color"
              #colorPicker
              id="colorpicker"
              [value]="'#f44336'"
              mode="Palette"
              [inline]="true"
              [columns]="4"
              [presetColors]="presets"
              [showButtons]="false"
              [modeSwitcher]="false"
              (beforeTileRender)="beforeTileRender($event)"
              (change)="onChange($event)"
              (created)="onCreated()">
            </ejs-input>
          </li>
          <li class="e-item" id="no-color">
            <span class="e-menu-icon e-nocolor"></span>
            No color
          </li>
        </ul>
        <div>
          <div id="preview"></div>
          <h4>Select color</h4>
          <ejs-splitbutton
            #splitBtn
            id="splitbtn"
            iconCss="e-cp-icons e-picker-icon"
            target="#target">
          </ejs-splitbutton>
        </div>
      </div>
    </div>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('colorPicker') public colorPicker: ColorPickerComponent;
  @ViewChild('splitBtn') public splitBtn: SplitButtonComponent;

  public presets: { [key: string]: string[] } = {
    custom: [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688',
      '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107'
    ]
  };

  public beforeTileRender(args: PaletteTileEventArgs): void {
    args.element.classList.add('e-custom-tile');
  }

  public onChange(args: ColorPickerEventArgs): void {
    const preview = document.getElementById('preview') as HTMLElement;
    (document.querySelector('.e-split-btn .e-picker-icon') as HTMLElement).style.borderBottomColor = args.currentValue.hex;
    preview.style.backgroundColor = args.currentValue.hex;
    preview.textContent = args.currentValue.hex;
    if (this.splitBtn.element.getAttribute('aria-expanded')) {
      this.splitBtn.toggle();
      this.splitBtn.element.focus();
    }
  }

  public onCreated(): void {
    const preview = document.getElementById('preview') as HTMLElement;
    preview.style.backgroundColor = '#ba68c8';
    preview.textContent = '#ba68c8';

    document.getElementById('no-color')!.onclick = (): void => {
      this.colorPicker.setProperties({ value: '' }, true);
      (document.querySelector('.e-split-btn .e-picker-icon') as HTMLElement).style.borderBottomColor = 'transparent';
      preview.textContent = 'No color';
      preview.style.backgroundColor = 'transparent';
    };
  }
}
```

---

## Show Recent Colors

The `showRecentColors` property displays up to **10 recently selected colors** as tiles at the top of the palette. Only works in **palette mode**.

```html
<ejs-input ejs-colorpicker type="color" [showRecentColors]="true"></ejs-input>
```

> Recent colors are tracked per session and appear at the top of the palette as users select colors.

---

## Palette Column Count

The `columns` property controls how many tiles appear per row in the palette grid. Default is `10`.

```html
<ejs-input ejs-colorpicker type="color"
  mode="Palette"
  [columns]="4"
  [inline]="true"
  [showButtons]="false">
</ejs-input>
```

Combine with `presetColors` to display a tight brand palette with fewer columns:

```ts
public brandColors: { [key: string]: string[] } = {
  primary: ['#0078d4', '#106ebe', '#005a9e', '#004578'],
  secondary: ['#ff8c00', '#ea4300', '#d13438', '#a4262c']
};
```

```html
<ejs-input ejs-colorpicker type="color"
  mode="Palette"
  [presetColors]="brandColors"
  [columns]="4"
  [modeSwitcher]="false"
  [inline]="true"
  [showButtons]="false">
</ejs-input>
```
