# Toolbar Customization in Angular Image Editor

## Built-in Toolbar Items

The Image Editor provides 20+ default toolbar items:

```
Open, Undo, Redo, ZoomIn, ZoomOut, Crop, RotateLeft, RotateRight, 
HorizontalFlip, VerticalFlip, Straightening, Annotate, Finetune, 
Filter, Frame, Resize, Redact, Reset, Save
```

## Customize Toolbar Items

```typescript
import { Component } from '@angular/core';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-toolbar',
  template: `<ejs-imageeditor [toolbar]="toolbarItems"></ejs-imageeditor>`,
  imports: [ImageEditorModule],
  standalone: true
})
export class ToolbarComponent {
  toolbarItems = [
    'Open',
    'Undo',
    'Redo',
    'ZoomIn',
    'ZoomOut',
    'Crop',
    'RotateLeft',
    'RotateRight',
    'Annotate',
    'Filter',
    'Save',
    'Reset'
  ];
}
```

## Hide Toolbar

```typescript
@Component({
  template: `<ejs-imageeditor [toolbar]="[]"></ejs-imageeditor>`
})
export class HideToolbarComponent { }
```

## Add Custom Toolbar Items

```typescript
toolbarItems = [
  'Open',
  'Undo',
  'Redo',
  {
    text: 'Custom Action',
    id: 'customButton'
  },
  'Save'
];
```

## Handle Toolbar Item Click

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [toolbar]="toolbarItems"
      [toolbarItemClicked]="onToolbarItemClicked"
    ></ejs-imageeditor>
  `
})
export class ToolbarClickComponent {
  toolbarItems = ['Open', 'Undo', 'Save'];

  onToolbarItemClicked(args: any) {
    console.log('Toolbar item clicked:', args);
  }
}
```

## Customize Contextual Toolbar

The contextual toolbar appears when annotations are selected. Use the `toolbarUpdating` event:

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [toolbarUpdating]="onToolbarUpdating"
    ></ejs-imageeditor>
  `
})
export class ContextualToolbarComponent {
  onToolbarUpdating(args: any) {
    // Customize toolbar during updates
    console.log('Toolbar updating:', args);
  }
}
```

## Toolbar Template

Replace entire toolbar with custom template:

```typescript
@Component({
  selector: 'app-toolbar-template',
  template: `
    <ejs-imageeditor 
      [toolbarTemplate]="customToolbar"
    ></ejs-imageeditor>
    <ng-template #customToolbar>
      <div style="padding: 10px; border: 1px solid #ccc;">
        <button (click)="open()">📂 Open</button>
        <button (click)="undo()">↶ Undo</button>
        <button (click)="redo()">↷ Redo</button>
        <button (click)="rotate()">🔄 Rotate</button>
        <button (click)="save()">💾 Save</button>
      </div>
    </ng-template>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class ToolbarTemplateComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  open() { this.imageEditor?.open('image.png'); }
  undo() { this.imageEditor?.undo(); }
  redo() { this.imageEditor?.redo(); }
  rotate() { this.imageEditor?.rotate(90); }
  save() { this.imageEditor?.export('image', 'png'); }
}
```

## Enable/Disable Items

```typescript
toolbarItems = [
  { text: 'Open', id: 'open' },
  { text: 'Save', id: 'save', disabled: true },
  { text: 'Reset', id: 'reset' }
];
```

## Toolbar Events

### Toolbar Created Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [toolbarCreated]="onToolbarCreated"
    ></ejs-imageeditor>
  `
})
export class ToolbarCreatedComponent {
  onToolbarCreated() {
    console.log('Toolbar initialized');
  }
}
```

## Complete Example

```typescript
@Component({
  selector: 'app-toolbar-example',
  template: `
    <ejs-imageeditor 
      [toolbar]="customToolbar"
      [toolbarItemClicked]="onItemClicked"
      [toolbarUpdating]="onToolbarUpdating"
    ></ejs-imageeditor>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class ToolbarExampleComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  customToolbar = [
    'Open',
    'Undo',
    'Redo',
    'ZoomIn',
    'ZoomOut',
    'Crop',
    'RotateLeft',
    'RotateRight',
    'Annotate',
    'Finetune',
    'Filter',
    'Save',
    'Reset'
  ];

  onItemClicked(args: any) {
    console.log('Item clicked:', args.id);
  }

  onToolbarUpdating(args: any) {
    // Customize contextual toolbar
    console.log('Contextual toolbar updating');
  }
}
```

## Minimal Toolbar

```typescript
minimalToolbar = ['Open', 'Crop', 'Save', 'Reset'];
```

## Professional Editing Toolbar

```typescript
professionalToolbar = [
  'Open',
  'Undo',
  'Redo',
  'ZoomIn',
  'ZoomOut',
  'Crop',
  'RotateLeft',
  'RotateRight',
  'HorizontalFlip',
  'VerticalFlip',
  'Straightening',
  'Annotate',
  'Finetune',
  'Filter',
  'Frame',
  'Resize',
  'Redact',
  'Save',
  'Reset'
];
```

## Edge Cases

**Issue:** Custom toolbar item not responding
- **Solution:** Ensure unique ID; handle in toolbarItemClicked event

**Issue:** Contextual toolbar not appearing
- **Solution:** Verify toolbarUpdating event is bound; select annotation first
