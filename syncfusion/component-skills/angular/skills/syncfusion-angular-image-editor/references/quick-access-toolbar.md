# Quick Access Toolbar in Angular Image Editor

The quick access toolbar provides annotation-specific actions when shapes or annotations are selected.

## Enable/Disable Quick Access Toolbar

```typescript
import { Component } from '@angular/core';
import { ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-quick-toolbar',
  template: `
    <ejs-imageeditor 
      [showQuickAccessToolbar]="true"
    ></ejs-imageeditor>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class QuickToolbarComponent { }
```

## Customize Quick Access Toolbar

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [quickAccessToolbarOpen]="onQuickAccessOpen"
    ></ejs-imageeditor>
  `
})
export class CustomQuickToolbarComponent {
  onQuickAccessOpen(args: any) {
    // Handle quick access toolbar opening
    console.log('Quick access toolbar opened:', args);
  }
}
```

## Quick Access Toolbar Items

Available items for different annotation types:

- **For Rectangles/Ellipses/Lines/Arrows**:
  - Stroke Color
  - Stroke Width
  - Fill Color
  - Remove
  - Duplicate

- **For Text**:
  - Font Family
  - Font Size
  - Font Color
  - Bold, Italic, Underline
  - Edit Text
  - Remove
  - Duplicate

- **For Freehand Drawing**:
  - Stroke Color
  - Stroke Width
  - Remove

## Add Custom Item to Quick Access Toolbar

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [quickAccessToolbarOpen]="addCustomItem"
    ></ejs-imageeditor>
  `
})
export class CustomItemComponent {
  addCustomItem(args: any) {
    // Add new custom button
    args.toolbarItems.push({
      text: 'Duplicate Annotation',
      id: 'duplicateAnn',
      icon: '➕'
    });
  }
}
```

## Handle Quick Access Toolbar Actions

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [toolbarItemClicked]="onToolbarItemClicked"
    ></ejs-imageeditor>
  `
})
export class ToolbarActionComponent {
  onToolbarItemClicked(args: any) {
    if (args.id === 'duplicateAnn') {
      console.log('Custom action triggered');
    }
  }
}
```

## Complete Example

```typescript
@Component({
  selector: 'app-quick-toolbar-demo',
  template: `
    <div>
      <p>Select an annotation to see quick access toolbar</p>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor 
          #imageEditor
          [showQuickAccessToolbar]="true"
          [quickAccessToolbarOpen]="onToolbarOpen"
        ></ejs-imageeditor>
      </div>
      <button (click)="addText()">Add Text</button>
      <button (click)="addRectangle()">Add Rectangle</button>
    </div>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class QuickToolbarDemoComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  onToolbarOpen(args: any) {
    console.log('Quick toolbar opened');
  }

  addText() {
    this.imageEditor?.drawText(100, 100, 'Sample', 'Arial', 16, false, false, '#000000');
  }

  addRectangle() {
    this.imageEditor?.drawRectangle(50, 50, 200, 150, 2, '#0000FF', '#FFFFFF');
  }
}
```

## Best Practices

1. Add frequently used actions to quick access toolbar
2. Keep custom items minimal (2-3 max)
3. Use clear, descriptive text labels
4. Test with different annotation types

## Edge Cases

**Issue:** Quick access toolbar not appearing
- **Solution:** Ensure showQuickAccessToolbar is true; select annotation first

**Issue:** Custom items not showing
- **Solution:** Add items in quickAccessToolbarOpen event; verify unique IDs
