# Toolbar Integration in Angular Signature Component

## Table of Contents
- [Overview](#overview)
- [Complete Toolbar Example](#complete-toolbar-example)
- [Individual Toolbar Controls](#individual-toolbar-controls)
- [Button State Management](#button-state-management)
- [Color Picker Integration](#color-picker-integration)
- [Stroke Width Control](#stroke-width-control)

## Overview

Integrate a Toolbar with the Signature component to provide a professional UI with:
- **Undo/Redo buttons** - Navigate action history
- **Save button** - Export in multiple formats
- **Color pickers** - Stroke and background color selection
- **Stroke width control** - Dynamic width adjustment
- **Clear button** - Erase signature
- **Disabled checkbox** - Toggle disabled state

Handle toolbar actions using the `change` event and manage button states with `canUndo()`, `canRedo()`, and `isEmpty()` methods.

## Complete Toolbar Example

Full working toolbar integration with all features:

```typescript
import { NgModule, Component, ViewChild } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { ColorPickerModule, SignatureModule } from '@syncfusion/ej2-angular-inputs'
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns'
import { SplitButtonModule } from '@syncfusion/ej2-angular-splitbuttons'
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { enableRipple, addClass, createElement, getComponent } from '@syncfusion/ej2-base';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SplitButton, ItemModel, MenuEventArgs, DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { Button, ChangeEventArgs, CheckBox } from '@syncfusion/ej2-buttons';
import { ColorPicker, ColorPickerEventArgs, NumericTextBox, PaletteTileEventArgs, Signature, SignatureFileType } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-angular-dropdowns';

enableRipple(true);

@Component({
  imports: [
    FormsModule, DropDownListModule, SplitButtonModule, ToolbarModule, 
    ButtonModule, SignatureModule, ColorPickerModule
  ],
  standalone: true,
  selector: 'app-toolbar',
  template: `<div class="e-section-control">
    <div id="signature-toolbar-control">
      <ejs-toolbar id="toolbar" (created)="onCreate($event)" (clicked)="clicked($event)" width="100%">
        <e-items>
          <e-item text='Undo' prefixIcon='e-icons e-undo' tooltipText='Undo (Ctrl + Z)'></e-item>
          <e-item text='Redo' prefixIcon='e-icons e-redo' tooltipText='Redo (Ctrl + Y)'></e-item>
          <e-item type='Separator'></e-item>
          <e-item tooltipText='Save (Ctrl + S)' type='Button' template='<button id="save-option"></button>'></e-item>
          <e-item type='Separator'></e-item>
          <e-item tooltipText='Stroke Color' template='<input id="stroke-color" type="color"/>'></e-item>
          <e-item type='Separator'></e-item>
          <e-item tooltipText='Background Color' type='Input' template='<input id="bg-color" type="color"/>'></e-item>
          <e-item type='Separator'></e-item>
          <e-item tooltipText='Stroke Width' type='Input' template='<input id="stroke-width" type="text"/>'></e-item>
          <e-item type='Separator'></e-item>
          <e-item text='Clear' prefixIcon='e-sign-icons e-clear' tooltipText='Clear'></e-item>
          <e-item tooltipText='Disabled' type='Input' template='<input id="chkelement1" type="checkbox"/>' align='Right'></e-item>
        </e-items>
      </ejs-toolbar>
      <div id="signature-control">
        <canvas ejs-signature #signature id="signature" [maxStrokeWidth]="strokeWidth" 
          style="height: 100%; width: 100%; border: 1px solid #ccc;" (change)="change()"></canvas>
      </div>
    </div>
  </div>`,
  styles: [`
    #signature-toolbar-control {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    #signature-control {
      flex: 1;
      min-height: 400px;
      margin-top: 10px;
    }

    canvas {
      width: 100% !important;
      height: 100% !important;
    }

    ::ng-deep .e-toolbar {
      background: #f5f5f5;
    }

    ::ng-deep .e-toolbar-item input[type="color"] {
      width: 50px;
      height: 36px;
      border: none;
      cursor: pointer;
    }

    ::ng-deep .e-toolbar-item input[type="text"] {
      width: 60px;
      padding: 4px;
      border: 1px solid #ddd;
    }

    ::ng-deep .e-toolbar-item input[type="checkbox"] {
      cursor: pointer;
      margin: 0 5px;
    }
  `]
})
export class ToolbarComponent {
  @ViewChild('signature') signature?: SignatureComponent;
  public strokeWidth: number = 2;
  public items: ItemModel[] = [
    { text: 'Png' },
    { text: 'Jpeg' },
    { text: 'Svg' }
  ];

  public templateCheckbox1: any = new CheckBox({
    label: 'Disabled',
    checked: false,
    change: (args: ChangeEventArgs) => {
      (this.signature as SignatureComponent).disabled = args.checked as boolean;
    }
  });

  public change(): void {
    let saveBtn: SplitButton = getComponent((document.getElementById("save-option") as HTMLElement), 'split-btn');
    if (!this.signature?.isEmpty()) {
      this.clearButton();
      saveBtn.disabled = false;
    }
    this.updateUndoRedo();
  }

  public onCreate(e: any) {
    this.templateCheckbox1.appendTo('#chkelement1');
    
    // Stroke width dropdown
    let ddl: DropDownList = new DropDownList({
      dataSource: [1, 2, 3, 4, 5],
      width: '60',
      value: 2,
      change: function(args) {
        let signature: Signature = getComponent((document.getElementById("signature") as HTMLElement), 'signature');
        signature.maxStrokeWidth = args.value;
      }
    });
    ddl.appendTo('#stroke-width');
    
    // Save button
    new SplitButton({
      iconCss: 'e-sign-icons e-save',
      items: this.items,
      content: 'Save',
      select: (args: MenuEventArgs) => {
        this.signature?.save(args.item.text as SignatureFileType, 'Signature');
      },
      disabled: true
    }, '#save-option');
    
    // Stroke color picker
    let strokeColor: ColorPicker = new ColorPicker({
      modeSwitcher: false,
      columns: 4,
      presetColors: {
        'custom': ['#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', 
          '#00bcd4', '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
      },
      beforeTileRender: (args: PaletteTileEventArgs) => {
        args.element.classList.add('e-circle-palette');
        args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
      },
      showButtons: false,
      mode: 'Palette',
      cssClass: 'e-stroke-color',
      change: (args: ColorPickerEventArgs) => {
        if (this.signature?.disabled) {
          return;
        }
        let selElem: HTMLElement = (strokeColor as any).element.nextElementSibling.querySelector('.e-selected-color') as HTMLElement;
        selElem.style.borderBottomColor = args.currentValue.rgba;
        this.signature!.strokeColor = args.currentValue.rgba;
      }
    });
    strokeColor.appendTo('#stroke-color');
    
    // Background color picker
    let bgColor: ColorPicker = new ColorPicker({
      modeSwitcher: false,
      columns: 4,
      noColor: true,
      presetColors: {
        'custom': ['#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', 
          '#03a9f4', '#00bcd4', '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
      },
      beforeTileRender: (args: PaletteTileEventArgs) => {
        args.element.classList.add('e-circle-palette');
        args.element.appendChild(createElement('span', { className: 'e-circle-selection' }));
      },
      showButtons: false,
      mode: 'Palette',
      cssClass: 'e-bg-color',
      change: (args: ColorPickerEventArgs) => {
        if (this.signature!.disabled) {
          return;
        }
        let selElem: HTMLElement = (bgColor.element as HTMLInputElement | any).nextElementSibling
          .querySelector('.e-selected-color') as HTMLElement;
        this.signature!.backgroundColor = args.currentValue.rgba;
        selElem.style.borderBottomColor = args.currentValue.rgba;
      }
    });
    bgColor.appendTo('#bg-color');
    
    addClass([(strokeColor.element as any).nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
    addClass([(bgColor.element as any).nextElementSibling.querySelector('.e-selected-color')], 'e-sign-icons');
    
    this.clearButton();
    
    let toolbarlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
    for (var i = 0; i < toolbarlItems.length; i++) {
      if (toolbarlItems[i].children[0].classList.contains('e-undo')) {
        let undoButton: Button = getComponent(toolbarlItems[i] as HTMLElement, 'btn');
        undoButton.disabled = true;
      }
      if (toolbarlItems[i].children[0].classList.contains('e-redo')) {
        let redoButton: Button = getComponent(toolbarlItems[i] as HTMLElement, 'btn');
        redoButton.disabled = true;
      }
    }
  }

  public clicked(args: ClickEventArgs): void {
    let saveBtn: SplitButton = getComponent((document.getElementById("save-option") as HTMLElement), 'split-btn');
    if (this.signature?.disabled && args.item.tooltipText != 'Disabled') {
      return;
    }
    
    switch (args.item.tooltipText) {
      case 'Undo (Ctrl + Z)':
        if (this.signature?.canUndo()) {
          this.signature.undo();
          this.updateUndoRedo();
          this.updateSaveBtn();
        }
        break;
      case 'Redo (Ctrl + Y)':
        if (this.signature?.canRedo()) {
          this.signature.redo();
          this.updateUndoRedo();
          this.updateSaveBtn();
        }
        break;
      case 'Clear':
        this.signature?.clear();
        if (this.signature?.isEmpty) {
          this.clearButton();
          saveBtn.disabled = true;
        }
        break;
    }
  }

  public clearButton() {
    let tlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
    for (var i = 0; i < tlItems.length; i++) {
      if (tlItems[i].children[0].classList.contains('e-clear')) {
        let clrBtn: Button = getComponent(tlItems[i] as HTMLElement, 'btn');
        if (this.signature?.isEmpty()) {
          clrBtn.disabled = true;
        } else {
          clrBtn.disabled = false;
        }
      }
    }
  }

  public updateSaveBtn() {
    let saveBtn: SplitButton = getComponent((document.getElementById("save-option") as HTMLElement), 'split-btn');
    if (this.signature?.isEmpty()) {
      saveBtn.disabled = true;
    }
  }

  public updateUndoRedo() {
    let undoButton: Button; 
    let redoButton: Button
    let tlItems: NodeListOf<Element> = document.querySelectorAll('.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt');
    for (var i = 0; i < tlItems.length; i++) {
      if (tlItems[i].children[0].classList.contains('e-undo')) {
        undoButton = getComponent(tlItems[i] as HTMLElement, 'btn');
      }
      if (tlItems[i].children[0].classList.contains('e-redo')) {
        redoButton = getComponent(tlItems[i] as HTMLElement, 'btn');
      }
    }
    if (this.signature?.canUndo()) {
      undoButton!.disabled = false;
    } else {
      undoButton!.disabled = true;
    }
    if (this.signature?.canRedo()) {
      redoButton!.disabled = false;
    } else {
      redoButton!.disabled = true;
    }
  }
}
```

## Individual Toolbar Controls

### Undo/Redo Buttons

```typescript
public clicked(args: ClickEventArgs): void {
  switch (args.item.tooltipText) {
    case 'Undo (Ctrl + Z)':
      if (this.signature?.canUndo()) {
        this.signature.undo();
        this.updateUndoRedo();
      }
      break;
    case 'Redo (Ctrl + Y)':
      if (this.signature?.canRedo()) {
        this.signature.redo();
        this.updateUndoRedo();
      }
      break;
  }
}
```

### Clear Button

```typescript
case 'Clear':
  this.signature?.clear();
  this.clearButton();
  break;
```

## Button State Management

### Update Button States on Change Event

```typescript
public change(): void {
  let saveBtn: SplitButton = getComponent(
    (document.getElementById("save-option") as HTMLElement), 
    'split-btn'
  );
  
  if (!this.signature?.isEmpty()) {
    this.clearButton();
    saveBtn.disabled = false;
  }
  this.updateUndoRedo();
}
```

### Check Undo/Redo Availability

```typescript
public updateUndoRedo() {
  let undoButton: Button;
  let redoButton: Button;
  
  let tlItems: NodeListOf<Element> = document.querySelectorAll(
    '.e-toolbar .e-toolbar-items .e-toolbar-item .e-tbar-btn.e-tbtn-txt'
  );
  
  for (var i = 0; i < tlItems.length; i++) {
    if (tlItems[i].children[0].classList.contains('e-undo')) {
      undoButton = getComponent(tlItems[i] as HTMLElement, 'btn');
    }
    if (tlItems[i].children[0].classList.contains('e-redo')) {
      redoButton = getComponent(tlItems[i] as HTMLElement, 'btn');
    }
  }
  
  if (this.signature?.canUndo()) {
    undoButton!.disabled = false;
  } else {
    undoButton!.disabled = true;
  }
  
  if (this.signature?.canRedo()) {
    redoButton!.disabled = false;
  } else {
    redoButton!.disabled = true;
  }
}
```

## Color Picker Integration

### Stroke Color Picker Setup

```typescript
let strokeColor: ColorPicker = new ColorPicker({
  modeSwitcher: false,
  columns: 4,
  presetColors: {
    'custom': ['#000000', '#e91e63', '#9c27b0', '#2196f3', '#00bcd4']
  },
  showButtons: false,
  mode: 'Palette',
  change: (args: ColorPickerEventArgs) => {
    if (this.signature?.disabled) {
      return;
    }
    this.signature!.strokeColor = args.currentValue.rgba;
  }
});
strokeColor.appendTo('#stroke-color');
```

### Background Color Picker Setup

```typescript
let bgColor: ColorPicker = new ColorPicker({
  modeSwitcher: false,
  columns: 4,
  noColor: true,
  presetColors: {
    'custom': ['#ffffff', '#f44336', '#2196f3', '#4CAF50']
  },
  showButtons: false,
  mode: 'Palette',
  change: (args: ColorPickerEventArgs) => {
    this.signature!.backgroundColor = args.currentValue.rgba;
  }
});
bgColor.appendTo('#bg-color');
```

## Stroke Width Control

### Dropdown for Stroke Width

```typescript
let ddl: DropDownList = new DropDownList({
  dataSource: [1, 2, 3, 4, 5],
  width: '60',
  value: 2,
  change: function(args) {
    let signature: Signature = getComponent(
      (document.getElementById("signature") as HTMLElement), 
      'signature'
    );
    signature.maxStrokeWidth = args.value;
  }
});
ddl.appendTo('#stroke-width');
```

## Best Practices for Toolbar Integration

1. **State Synchronization:** Always update button states on `change` event
2. **Error Handling:** Check `canUndo()` and `canRedo()` before enabling buttons
3. **User Feedback:** Disable buttons visually when operations aren't available
4. **Accessibility:** Use tooltip text for keyboard shortcuts
5. **Responsive Design:** Ensure toolbar works on mobile and desktop
6. **Color Defaults:** Provide sensible color presets for quick access
