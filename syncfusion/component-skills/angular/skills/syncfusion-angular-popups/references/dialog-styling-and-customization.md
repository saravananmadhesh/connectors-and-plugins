# Styling and Customization

## Table of Contents
- [CSS Class Customization](#css-class-customization)
- [Theme Integration](#theme-integration)
- [Dark Mode Support](#dark-mode-support)
- [Animation Effects](#animation-effects)
- [Icon Customization](#icon-customization)
- [RTL Support](#rtl-support)
- [Examples](#examples)

## CSS Class Customization

### Dialog Structure CSS Classes

The Dialog component uses these CSS classes for different sections:

```css
/* Main dialog container */
.e-dialog {
  background-color: white;
  border-radius: 4px;
}

/* Dialog header */
.e-dialog .e-dlg-header {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
}

/* Dialog content area */
.e-dialog .e-dlg-content {
  padding: 16px;
  color: #333;
}

/* Dialog footer/button area */
.e-dialog .e-dlg-footer {
  border-top: 1px solid #e0e0e0;
  padding: 12px;
  background-color: #fafafa;
}

/* Modal overlay backdrop */
.e-dlg-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}
```

### Customizing Header

```typescript
@Component({
  selector: 'app-custom-header',
  standalone: true,
  imports: [DialogModule],
  template: `
    <ejs-dialog content="Custom styled header">
      <ng-template #header>
        <div class="custom-header">Header Content</div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    :host ::ng-deep .custom-header {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      font-size: 18px;
      font-weight: bold;
      border-radius: 4px 4px 0 0;
    }
  `]
})
export class CustomHeaderComponent {}
```

### Customizing Content

```typescript
@Component({
  template: `
    <ejs-dialog>
      <ng-template #content>
        <div class="styled-content">
          <h3>Content Title</h3>
          <p>Styled content goes here</p>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    :host ::ng-deep .e-dialog .e-dlg-content {
      background-color: #fafafa;
      color: #333;
      line-height: 1.6;
      font-size: 14px;
    }

    :host ::ng-deep .styled-content h3 {
      color: #667eea;
      margin-top: 0;
    }
  `]
})
export class CustomContentComponent {}
```

### Customizing Footer

```typescript
@Component({
  template: `
    <ejs-dialog>
      <ng-template #footerTemplate>
        <div class="custom-footer">
          <button class="e-control e-btn">Button 1</button>
          <button class="e-control e-btn e-primary">Button 2</button>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    :host ::ng-deep .custom-footer {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      padding: 16px;
      background-color: #f0f0f0;
      border-top: 1px solid #ddd;
    }
  `]
})
export class CustomFooterComponent {}
```

### Customizing Overlay

```typescript
@Component({
  template: `
    <ejs-dialog [isModal]="true" content="Custom overlay example">
    </ejs-dialog>
  `,
  styles: [`
    :host ::ng-deep .e-dlg-overlay {
      /* Semi-transparent blue instead of black */
      background-color: rgba(33, 150, 243, 0.3);
      opacity: 0.8;
    }

    /* With blur effect */
    :host ::ng-deep .e-dlg-overlay {
      backdrop-filter: blur(5px);
      background-color: rgba(0, 0, 0, 0.3);
    }
  `]
})
export class CustomOverlayComponent {}
```

## Theme Integration

### Available Syncfusion Themes

- **Material 3** (default) - Modern Material Design
- **Bootstrap 5** - Bootstrap design system
- **Tailwind** - Tailwind CSS styling
- **Fluent** - Microsoft Fluent Design

### Switching Themes

To use a different theme, update the CSS imports in `styles.css`:

```css
/* Change from Material3 to Bootstrap5 */
@import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-angular-popups/styles/bootstrap5.css';
```

### Theme-specific Customization

```typescript
@Component({
  template: `
    <ejs-dialog content="Theme-aware dialog">
    </ejs-dialog>
  `,
  styles: [`
    /* Customize for Material3 theme */
    :host ::ng-deep.e-material .e-dialog {
      border-radius: 4px;
      box-shadow: 0 5px 25px rgba(0,0,0,0.25);
    }

    /* Customize for Bootstrap5 theme */
    :host ::ng-deep.e-bootstrap .e-dialog {
      border: 1px solid #dee2e6;
      box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
    }

    /* Customize for Fluent theme */
    :host ::ng-deep.e-fluent .e-dialog {
      border-radius: 8px;
      border: 1px solid #d0d0d0;
    }
  `]
})
export class ThemeAwareComponent {}
```

## Dark Mode Support

### Implementing Dark Mode

```typescript
import { Component } from '@angular/core';
import { DialogModule } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [DialogModule],
  template: `
    <div [class.dark-mode]="isDarkMode">
      <button (click)="toggleDarkMode()">Toggle Dark Mode</button>
      
      <ejs-dialog 
        content="This dialog supports dark mode"
        [showCloseIcon]="true"
      >
      </ejs-dialog>
    </div>
  `,
  styles: [`
    /* Light mode styles */
    :host ::ng-deep .e-dialog {
      background-color: white;
      color: #333;
    }

    :host ::ng-deep .e-dlg-header {
      background-color: #f5f5f5;
      color: #333;
    }

    /* Dark mode styles */
    :host ::ng-deep .dark-mode .e-dialog {
      background-color: #1e1e1e;
      color: #e0e0e0;
    }

    :host ::ng-deep .dark-mode .e-dlg-header {
      background-color: #2d2d2d;
      color: #e0e0e0;
      border-bottom-color: #404040;
    }

    :host ::ng-deep .dark-mode .e-dlg-content {
      background-color: #1e1e1e;
      color: #e0e0e0;
    }

    :host ::ng-deep .dark-mode .e-dlg-footer {
      background-color: #2d2d2d;
      border-top-color: #404040;
    }

    :host ::ng-deep .dark-mode .e-dlg-overlay {
      background-color: rgba(0, 0, 0, 0.7);
    }
  `]
})
export class DarkModeComponent {
  isDarkMode = false;

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }
}
```

### System Preference Dark Mode

```typescript
@Component({
  template: `
    <div [class.dark-mode]="prefersDarkMode()">
      <ejs-dialog content="Respects system preference">
      </ejs-dialog>
    </div>
  `
})
export class SystemDarkModeComponent {
  prefersDarkMode(): boolean {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
}
```

## Animation Effects

### Available Animation Effects

The Dialog supports these animation effects:

- `Fade` - Fade in/out effect
- `FadeZoom` - Fade combined with zoom
- `FlipLeftDown`, `FlipLeftUp`, `FlipRightDown`, `FlipRightUp` - Flip animations
- `FlipXDown`, `FlipXUp`, `FlipYLeft`, `FlipYRight` - 3D flip effects
- `SlideBottom`, `SlideLeft`, `SlideRight`, `SlideTop` - Slide animations
- `Zoom` - Zoom in/out effect
- `None` - No animation

### Setting Animation

```typescript
@Component({
  template: `
    <ejs-dialog
      [animationSettings]="{ effect: 'Zoom', duration: 500 }"
      content="Zooming animation"
    >
    </ejs-dialog>
  `
})
export class ZoomAnimationComponent {}
```

### Fade Animation Example

```typescript
@Component({
  template: `
    <ejs-dialog
      [animationSettings]="{ 
        effect: 'Fade', 
        duration: 400, 
        delay: 0 
      }"
      content="Fade in and out animation"
    >
    </ejs-dialog>
  `
})
export class FadeAnimationComponent {}
```

### Slide Animation Example

```typescript
@Component({
  template: `
    <ejs-dialog
      [animationSettings]="{ 
        effect: 'SlideTop', 
        duration: 600 
      }"
      content="Slides down from top"
    >
    </ejs-dialog>
  `
})
export class SlideAnimationComponent {}
```

### Custom Animation Duration

```typescript
@Component({
  template: `
    <div>
      <label>Duration (ms):</label>
      <input type="number" [(ngModel)]="duration" />
      
      <ejs-dialog
        [animationSettings]="{ 
          effect: 'Zoom', 
          duration: duration,
          delay: 100
        }"
        content="Customizable animation"
      >
      </ejs-dialog>
    </div>
  `
})
export class CustomAnimationComponent {
  duration = 500;
}
```

### Disable Animation

```typescript
@Component({
  template: `
    <ejs-dialog
      [animationSettings]="{ effect: 'None' }"
      content="No animation"
    >
    </ejs-dialog>
  `
})
export class NoAnimationComponent {}
```

## Icon Customization

### Close Button Icon

```typescript
@Component({
  template: `
    <ejs-dialog
      [showCloseIcon]="true"
      content="Dialog with close icon"
    >
    </ejs-dialog>
  `,
  styles: [`
    :host ::ng-deep .e-dialog .e-btn-icon.e-icon-dlg-close {
      font-size: 20px;
      color: #666;
    }

    :host ::ng-deep .e-dialog .e-btn-icon.e-icon-dlg-close:hover {
      color: #333;
    }
  `]
})
export class CloseIconComponent {}
```

### Custom Close Button

```typescript
@Component({
  template: `
    <ejs-dialog>
      <ng-template #header>
        <div class="custom-header">
          <span>Title</span>
          <button 
            class="e-control e-btn e-icon-btn custom-close"
            (click)="closeDialog()"
          >
            ✕
          </button>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    .custom-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }

    .custom-close {
      background: none;
      border: none;
      font-size: 20px;
      cursor: pointer;
      color: #999;
    }

    .custom-close:hover {
      color: #333;
    }
  `]
})
export class CustomCloseComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  closeDialog(): void {
    this.dialog.hide();
  }
}
```

### Resize Handle Icons

```typescript
@Component({
  template: `
    <ejs-dialog
      [resizeHandles]="['All']"
      content="Resizable dialog"
      width="400px"
      height="300px"
    >
    </ejs-dialog>
  `,
  styles: [`
    :host ::ng-deep .e-dialog .e-resize-handle::before {
      content: '↘';
      font-size: 16px;
      color: #ccc;
    }

    :host ::ng-deep .e-dialog .e-resize-handle:hover::before {
      color: #999;
    }
  `]
})
export class ResizeHandleComponent {}
```

## RTL Support

### Enabling RTL

```typescript
@Component({
  selector: 'app-rtl-dialog',
  standalone: true,
  imports: [DialogModule],
  template: `
    <div dir="rtl" style="height: 600px;">
      <button (click)="openRTLDialog()">فتح الحوار</button>
      
      <ejs-dialog
        #rtlDialog
        [enableRtl]="true"
        content="هذا حوار يدعم النصوص من اليمين إلى اليسار"
        width="400px"
      >
        <ng-template #header>
          <span>عنوان الحوار</span>
        </ng-template>
      </ejs-dialog>
    </div>
  `
})
export class RtlDialogComponent {
  @ViewChild('rtlDialog') dialog!: DialogComponent;

  openRTLDialog(): void {
    this.dialog.show();
  }
}
```

### RTL CSS Adjustments

```css
/* RTL-specific styles */
.e-dialog[dir="rtl"] .e-dlg-header {
  text-align: right;
}

.e-dialog[dir="rtl"] .e-dlg-content {
  text-align: right;
  direction: rtl;
}

.e-dialog[dir="rtl"] .e-dlg-footer {
  justify-content: flex-start;
}
```

## Examples

### Example 1: Professional Modal Dialog

```typescript
@Component({
  template: `
    <ejs-dialog
      [isModal]="true"
      width="500px"
      [showCloseIcon]="true"
      [animationSettings]="{ effect: 'Zoom', duration: 400 }"
    >
      <ng-template #header>
        <div class="professional-header">
          <span>Confirmation Required</span>
        </div>
      </ng-template>

      <ng-template #content>
        <div class="professional-content">
          <p>Are you sure you want to proceed with this action?</p>
          <p style="color: #999; font-size: 12px;">This action cannot be undone.</p>
        </div>
      </ng-template>

      <ng-template #footerTemplate>
        <div class="professional-footer">
          <button class="e-control e-btn">Cancel</button>
          <button class="e-control e-btn e-primary">Confirm</button>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    :host ::ng-deep .professional-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
    }

    :host ::ng-deep .professional-content {
      padding: 20px;
      font-size: 14px;
      line-height: 1.6;
    }

    :host ::ng-deep .professional-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      padding: 16px;
      background-color: #f5f5f5;
    }
  `]
})
export class ProfessionalDialogComponent {}
```

### Example 2: Modern Glassmorphism Dialog

```typescript
@Component({
  template: `
    <ejs-dialog
      width="450px"
      [showCloseIcon]="true"
      content="Modern glassmorphic design"
    >
    </ejs-dialog>
  `,
  styles: [`
    :host ::ng-deep .e-dialog {
      background: rgba(255, 255, 255, 0.7);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    }

    :host ::ng-deep .e-dlg-header {
      background: rgba(255, 255, 255, 0.5);
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }
  `]
})
export class GlassmorphismDialogComponent {}
```

