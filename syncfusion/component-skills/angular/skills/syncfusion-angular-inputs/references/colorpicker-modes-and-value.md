# Modes and Color Value — Syncfusion Angular ColorPicker

## Table of Contents
- [Inline Rendering](#inline-rendering)
- [Picker vs Palette Mode](#picker-vs-palette-mode)
- [Setting Color Value](#setting-color-value)
- [Opacity Support](#opacity-support)
- [Render Palette Alone](#render-palette-alone)

---

## Inline Rendering

By default the ColorPicker renders as a **SplitButton** that opens a popup. Set `[inline]="true"` to render the picker container directly in the page without any popup.

```html
<ejs-input ejs-colorpicker type="color" [inline]="true" [showButtons]="false"></ejs-input>
```

> When using inline mode, `showButtons="false"` is recommended because Apply/Cancel are only meaningful in popup contexts — color changes apply immediately in inline mode.

---

## Picker vs Palette Mode

The `mode` property controls which panel is shown initially:

| Value | Renders |
|-------|---------|
| `'Picker'` (default) | HSV gradient with hue and opacity sliders |
| `'Palette'` | Grid of color swatches |

The mode switcher button (visible by default) lets users toggle between the two at runtime.

**Open with Palette initially:**

```html
<ejs-input ejs-colorpicker type="color" mode="Palette"></ejs-input>
```

---

## Setting Color Value

Use the `value` property to set the initial color. It accepts:

| Format | Example | Notes |
|--------|---------|-------|
| 3-digit hex | `"035"` | Short form, no opacity |
| 6-digit hex | `"#ff5733"` | Standard hex, no opacity |
| 4-digit hex | `"035a"` | Last digit = opacity |
| 8-digit hex | `"#ff5733ff"` | Last two digits = opacity |

The `#` prefix is optional.

```html
<ejs-input ejs-colorpicker type="color" [value]="'035a'"></ejs-colorpicker>
```

**Listening to color changes:**

The `change` event fires when the color is confirmed (Apply button clicked, or immediately if `[showButtons]="false"`).

```ts
import { Component } from '@angular/core';
import { ColorPickerEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <ejs-input ejs-colorpicker type="color" [value]="colorValue" (change)="onChange($event)"></ejs-input>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {
  public colorValue = '#ff5733ff';

  public onChange(args: ColorPickerEventArgs): void {
    console.log('Hex:', args.currentValue.hex);    // "#ff5733"
    console.log('RGBA:', args.currentValue.rgba);  // "rgba(255,87,51,1)"
  }
}
```

The `select` event fires on every tile/color selection in the picker (before Apply), useful when `[showButtons]="true"`.

---

## Opacity Support

The opacity slider is enabled by default. To hide it, set `[enableOpacity]="false"`:

```html
<ejs-input ejs-colorpicker type="color" [enableOpacity]="false"></ejs-input>
```

When opacity is disabled, colors are always fully opaque. The hex value stored will be 6-digit.

---

## Render Palette Alone

To lock the component to palette-only (hide the mode switcher so users cannot switch to Picker):

```html
<ejs-input ejs-colorpicker type="color"
  mode="Palette"
  [modeSwitcher]="false"
  [showButtons]="false"
></ejs-input>
```

> To render only the **Picker** (no palette, no mode switch), set `mode="Picker"` and `[modeSwitcher]="false"` on the `<ejs-input ejs-colorpicker>` element.

---

## Mode Switch Events

To react when the user switches between Picker and Palette:

```ts
import { Component } from '@angular/core';
import { ColorPickerEventArgs, ModeSwitchEventArgs, ColorPickerModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  template: `
    <ejs-input ejs-colorpicker type="color"
      (beforeModeSwitch)="beforeSwitch($event)"
      (onModeSwitch)="afterSwitch($event)"
    ></ejs-input>
  `,
  standalone: true,
  imports: [ ColorPickerModule]
})
export class AppComponent {
  public beforeSwitch(args: ModeSwitchEventArgs): void {
    console.log('Switching to:', args.mode);
  }

  public afterSwitch(args: ModeSwitchEventArgs): void {
    console.log('Now in:', args.mode);
  }
}
```
