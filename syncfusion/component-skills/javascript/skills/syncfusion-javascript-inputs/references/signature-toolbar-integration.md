# Toolbar Integration – Syncfusion TypeScript Signature

## Table of Contents
- [Overview](#overview)
- [Required Imports](#required-imports)
- [HTML Structure](#html-structure)
- [Initialize Signature and Toolbar](#initialize-signature-and-toolbar)
- [Wiring Undo / Redo / Clear Buttons](#wiring-undo--redo--clear-buttons)
- [Adding ColorPicker for Stroke and Background](#adding-colorpicker-for-stroke-and-background)
- [Adding DropDownList for Stroke Width](#adding-dropdownlist-for-stroke-width)
- [Keeping Toolbar State in Sync](#keeping-toolbar-state-in-sync)
- [Disable Toolbar via Signature Disabled State](#disable-toolbar-via-signature-disabled-state)
- [Full Toolbar Integration Example](#full-toolbar-integration-example)

---

## Overview

The Signature component integrates naturally with the Syncfusion EJ2 Toolbar. The pattern is:

1. Create a `Toolbar` with items for Undo, Redo, Save, Clear, stroke color, background color, and stroke width.
2. Subscribe to the Signature `change` event to update toolbar button states.
3. Handle toolbar `clicked` events to call Signature methods (`undo`, `redo`, `clear`, `save`).

---

## Required Imports

```ts
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { CheckBox, ChangeEventArgs, Button } from '@syncfusion/ej2-buttons';
import { SplitButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import { Signature, ColorPicker, ColorPickerEventArgs, PaletteTileEventArgs, SignatureFileType } from '@syncfusion/ej2-inputs';
import { addClass, createElement, getComponent, enableRipple } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

enableRipple(true);
```

---

## HTML Structure

```html
<div id="toolbar"></div>
<canvas id="signature"></canvas>
```

---

## Initialize Signature and Toolbar

```ts
let signature: Signature = new Signature({
  maxStrokeWidth: 2,
  change: () => {
    if (!signature.isEmpty()) {
      updateSaveButton(false);   // enable Save
    }
    updateUndoRedo();
  }
});
signature.appendTo('#signature');
```

---

## Wiring Undo / Redo / Clear Buttons

Use the toolbar `clicked` event and the item's `tooltipText` to dispatch actions:

```ts
clicked: (args: ClickEventArgs) => {
  if (signature.disabled && args.item.tooltipText !== 'Disabled') {
    return;   // block all actions when signature is disabled
  }
  switch (args.item.tooltipText) {
    case 'Undo (Ctrl + Z)':
      if (signature.canUndo()) {
        signature.undo();
        updateUndoRedo();
        updateSaveButton(signature.isEmpty());
      }
      break;
    case 'Redo (Ctrl + Y)':
      if (signature.canRedo()) {
        signature.redo();
        updateUndoRedo();
        updateSaveButton(signature.isEmpty());
      }
      break;
    case 'Clear':
      signature.clear();
      if (signature.isEmpty()) {
        updateClearButton(true);
        updateSaveButton(true);
      }
      break;
  }
}
```

---

## Adding ColorPicker for Stroke and Background

Add `ColorPicker` components as Toolbar input templates to allow real-time color changes:

```ts
// Inside toolbar `created` callback:
let strokeColor: ColorPicker = new ColorPicker({
  modeSwitcher: false,
  columns: 4,
  showButtons: false,
  mode: 'Palette',
  cssClass: 'e-stroke-color',
  change: (args: ColorPickerEventArgs) => {
    if (!signature.disabled) {
      signature.strokeColor = args.currentValue.rgba;
    }
  }
});
strokeColor.appendTo('#stroke-color');

let bgColor: ColorPicker = new ColorPicker({
  modeSwitcher: false,
  columns: 4,
  showButtons: false,
  mode: 'Palette',
  noColor: true,
  cssClass: 'e-bg-color',
  change: (args: ColorPickerEventArgs) => {
    if (!signature.disabled) {
      signature.backgroundColor = args.currentValue.rgba;
    }
  }
});
bgColor.appendTo('#bg-color');
```

---

## Adding DropDownList for Stroke Width

```ts
// Inside toolbar `created` callback:
let ddl: DropDownList = new DropDownList({
  dataSource: [1, 2, 3, 4, 5],
  width: '60',
  value: 2,
  change: (args) => {
    signature.maxStrokeWidth = args.value as number;
  }
});
ddl.appendTo('#stroke-width');
```

---

## Keeping Toolbar State in Sync

Helper functions for managing button enabled/disabled states:

```ts
function updateUndoRedo(): void {
  const items = document.querySelectorAll(
    '.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt'
  );
  items.forEach((item) => {
    if (item.children[0].classList.contains('e-undo')) {
      (getComponent(item as HTMLElement, 'btn') as Button).disabled = !signature.canUndo();
    }
    if (item.children[0].classList.contains('e-redo')) {
      (getComponent(item as HTMLElement, 'btn') as Button).disabled = !signature.canRedo();
    }
  });
}

function updateClearButton(disabled: boolean): void {
  const items = document.querySelectorAll(
    '.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt'
  );
  items.forEach((item) => {
    if (item.children[0].classList.contains('e-clear')) {
      (getComponent(item as HTMLElement, 'btn') as Button).disabled = disabled;
    }
  });
}

function updateSaveButton(disabled: boolean): void {
  const saveBtn = getComponent(document.getElementById('save-option')!, 'split-btn') as SplitButton;
  saveBtn.disabled = disabled;
}
```

---

## Disable Toolbar via Signature Disabled State

Use a `CheckBox` toolbar item to toggle the signature disabled state:

```ts
function disabledChange(args: ChangeEventArgs): void {
  signature.disabled = args.checked!;
}
```

When `signature.disabled` is `true`, guard all toolbar action handlers:

```ts
if (signature.disabled && args.item.tooltipText !== 'Disabled') { return; }
```

---

## Full Toolbar Integration Example

```ts
import { Toolbar, ClickEventArgs } from '@syncfusion/ej2-navigations';
import { CheckBox, ChangeEventArgs, Button } from '@syncfusion/ej2-buttons';
import { SplitButton, ItemModel, MenuEventArgs } from '@syncfusion/ej2-splitbuttons';
import {
  Signature, ColorPicker, ColorPickerEventArgs,
  PaletteTileEventArgs, SignatureFileType
} from '@syncfusion/ej2-inputs';
import { addClass, createElement, getComponent, enableRipple } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

enableRipple(true);

let signature: Signature = new Signature({
  maxStrokeWidth: 2,
  change: () => {
    if (!signature.isEmpty()) {
      updateSaveButton(false);
      updateClearButton(false);
    }
    updateUndoRedo();
  }
});
signature.appendTo('#signature');

const saveItems: ItemModel[] = [{ text: 'Png' }, { text: 'Jpeg' }, { text: 'Svg' }];

let toolbarObj: Toolbar = new Toolbar({
  width: '100%',
  items: [
    { text: 'Undo', prefixIcon: 'e-icons e-undo', tooltipText: 'Undo (Ctrl + Z)' },
    { text: 'Redo', prefixIcon: 'e-icons e-redo', tooltipText: 'Redo (Ctrl + Y)' },
    { type: 'Separator' },
    { tooltipText: 'Save (Ctrl + S)', type: 'Button', template: '<button id="save-option"></button>' },
    { type: 'Separator' },
    { tooltipText: 'Stroke Color', type: 'Input', template: '<input id="stroke-color" type="color"/>' },
    { type: 'Separator' },
    { tooltipText: 'Background Color', type: 'Input', template: '<input id="bg-color" type="color"/>' },
    { type: 'Separator' },
    { tooltipText: 'Stroke Width', type: 'Input', template: '<input id="stroke-width" type="text"/>' },
    { type: 'Separator' },
    { text: 'Clear', prefixIcon: 'e-sign-icons e-clear', tooltipText: 'Clear' },
    {
      tooltipText: 'Disabled', type: 'Input', align: 'Right',
      template: new CheckBox({ label: 'Disabled', checked: false, change: disabledChange })
    }
  ],
  created: () => {
    new DropDownList({
      dataSource: [1, 2, 3, 4, 5], width: '60', value: 2,
      change: (args) => { signature.maxStrokeWidth = args.value as number; }
    }).appendTo('#stroke-width');

    new SplitButton({
      iconCss: 'e-sign-icons e-save', content: 'Save', items: saveItems, disabled: true,
      select: (args: MenuEventArgs) => { signature.save(args.item.text as SignatureFileType, 'Signature'); }
    }, '#save-option');

    document.getElementById('save-option')!.onclick = () => { signature.save(); };

    new ColorPicker({
      modeSwitcher: false, columns: 4, showButtons: false, mode: 'Palette',
      cssClass: 'e-stroke-color',
      change: (args: ColorPickerEventArgs) => {
        if (!signature.disabled) { signature.strokeColor = args.currentValue.rgba; }
      }
    }).appendTo('#stroke-color');

    new ColorPicker({
      modeSwitcher: false, columns: 4, showButtons: false, mode: 'Palette', noColor: true,
      cssClass: 'e-bg-color',
      change: (args: ColorPickerEventArgs) => {
        if (!signature.disabled) { signature.backgroundColor = args.currentValue.rgba; }
      }
    }).appendTo('#bg-color');

    // Initialize undo/redo buttons as disabled
    updateUndoRedo();
    updateClearButton(true);
  },
  clicked: (args: ClickEventArgs) => {
    if (signature.disabled && args.item.tooltipText !== 'Disabled') { return; }
    switch (args.item.tooltipText) {
      case 'Undo (Ctrl + Z)':
        if (signature.canUndo()) { signature.undo(); updateUndoRedo(); updateSaveButton(signature.isEmpty()); }
        break;
      case 'Redo (Ctrl + Y)':
        if (signature.canRedo()) { signature.redo(); updateUndoRedo(); updateSaveButton(signature.isEmpty()); }
        break;
      case 'Clear':
        signature.clear();
        if (signature.isEmpty()) { updateClearButton(true); updateSaveButton(true); }
        break;
    }
  }
});
toolbarObj.appendTo('#toolbar');

function disabledChange(args: ChangeEventArgs): void { signature.disabled = args.checked!; }

function updateUndoRedo(): void {
  const items = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
  items.forEach((item) => {
    if (item.children[0].classList.contains('e-undo')) {
      (getComponent(item as HTMLElement, 'btn') as Button).disabled = !signature.canUndo();
    }
    if (item.children[0].classList.contains('e-redo')) {
      (getComponent(item as HTMLElement, 'btn') as Button).disabled = !signature.canRedo();
    }
  });
}

function updateClearButton(disabled: boolean): void {
  const items = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
  items.forEach((item) => {
    if (item.children[0].classList.contains('e-clear')) {
      (getComponent(item as HTMLElement, 'btn') as Button).disabled = disabled;
    }
  });
}

function updateSaveButton(disabled: boolean): void {
  (getComponent(document.getElementById('save-option')!, 'split-btn') as SplitButton).disabled = disabled;
}
```
