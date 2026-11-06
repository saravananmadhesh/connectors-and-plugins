# Positioning and Sizing

## Table of Contents
- [Built-in Positions](#built-in-positions)
- [Custom Positioning](#custom-positioning)
- [Width and Height Configuration](#width-and-height-configuration)
- [Min/Max Constraints](#minmax-constraints)
- [Height Calculation and Target Container Requirements](#height-calculation-and-target-container-requirements)
- [Responsive Sizing](#responsive-sizing)
- [Full-screen Mode](#full-screen-mode)
- [Examples](#examples)

## Built-in Positions

### 9 Built-in Position Options

The Dialog provides 9 predefined positions:

```
TopLeft        TopCenter        TopRight
MiddleLeft      Center           MiddleRight
BottomLeft      BottomCenter     BottomRight
```

### Using Position Property

```typescript
@Component({
  template: `
    <div id="dialog-container" style="height: 600px;">
      <ejs-dialog
        position="Center"
        content="Center positioned dialog"
      >
      </ejs-dialog>
    </div>
  `
})
export class PositionedDialogComponent {
  // Valid position values: TopLeft, TopCenter, TopRight, MiddleLeft, Center, 
  // MiddleRight, BottomLeft, BottomCenter, BottomRight
  // Or use custom position with { X: 100, Y: 50 }
}
```

### All Built-in Positions Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [DialogModule, CommonModule],
  template: `
    <div id="dialog-container" style="height: 600px;">
      <div class="button-grid">
        <button 
          *ngFor="let pos of positions"
          class="e-control e-btn"
          (click)="showDialog(pos)"
        >
          {{ pos }}
        </button>
      </div>

      <ejs-dialog
        #dialog
        [position]="currentPosition"
        [showCloseIcon]="true"
        width="300px"
        [content]="'Dialog at ' + currentPosition"
      >
      </ejs-dialog>
    </div>
  `,
  styles: [`
    .button-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      padding: 20px;
    }
  `]
})
export class PositionsComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  positions = [
    'TopLeft', 'TopCenter', 'TopRight',
    'MiddleLeft', 'Center', 'MiddleRight',
    'BottomLeft', 'BottomCenter', 'BottomRight'
  ];
  currentPosition = 'Center';

  showDialog(position: string): void {
    this.currentPosition = position;
    this.dialog.show();
  }
}
```

### Position Reference

| Position | Location |
|----------|----------|
| `TopLeft` | Top-left corner |
| `TopCenter` | Center of top edge |
| `TopRight` | Top-right corner |
| `MiddleLeft` | Left edge center |
| `Center` | Dead center of container |
| `MiddleRight` | Right edge center |
| `BottomLeft` | Bottom-left corner |
| `BottomCenter` | Center of bottom edge |
| `BottomRight` | Bottom-right corner |

## Custom Positioning

### Using X and Y Coordinates

For precise positioning, use the `position` property with X and Y coordinates:

```typescript
@Component({
  template: `
    <div id="dialog-container" style="height: 600px;">
      <ejs-dialog
        [position]="{ X: 100, Y: 50 }"
        content="Custom positioned at (100px, 50px)"
      >
      </ejs-dialog>
    </div>
  `
})
export class CustomPositionComponent {}
```

### Percentage-based Positioning

```typescript
@Component({
  template: `
    <ejs-dialog
      [position]="{ X: '50%', Y: '50%' }"
      content="Centered using percentages"
    >
    </ejs-dialog>
  `
})
export class PercentagePositionComponent {}
```

### Dynamic Positioning

```typescript
@Component({
  template: `
    <div id="dialog-container" style="height: 600px;">
      <div>
        <label>X Position: <input [(ngModel)]="posX" type="number" /></label>
        <label>Y Position: <input [(ngModel)]="posY" type="number" /></label>
        <button (click)="updatePosition()">Update Position</button>
      </div>

      <ejs-dialog
        [position]="currentPosition"
        content="Dynamically positioned dialog"
      >
      </ejs-dialog>
    </div>
  `
})
export class DynamicPositionComponent {
  posX = 100;
  posY = 100;
  currentPosition = { X: 100, Y: 100 };

  updatePosition(): void {
    this.currentPosition = { X: this.posX, Y: this.posY };
  }
}
```

### Positioning with Offset

```typescript
@Component({
  template: `
    <ejs-dialog
      [position]="{ X: window.innerWidth / 2 - 150, Y: window.innerHeight / 2 - 100 }"
      width="300px"
      content="Manually centered"
    >
    </ejs-dialog>
  `
})
export class OffsetPositionComponent {}
```

## Width and Height Configuration

### Fixed Dimensions

```typescript
@Component({
  template: `
    <ejs-dialog
      width="400px"
      height="300px"
      content="Fixed size dialog"
    >
    </ejs-dialog>
  `
})
export class FixedSizeComponent {}
```

### Percentage-based Dimensions

```typescript
@Component({
  template: `
    <ejs-dialog
      width="80%"
      height="60%"
      content="Responsive percentage sizing"
    >
    </ejs-dialog>
  `
})
export class PercentageSizeComponent {}
```

### Auto Width/Height

For content-based sizing:

```typescript
@Component({
  template: `
    <ejs-dialog
      width="auto"
      content="This dialog width adjusts to content"
    >
    </ejs-dialog>
  `
})
export class AutoSizeComponent {}
```

### Dynamic Sizing

```typescript
import { Component, ViewChild } from '@angular/core';
import { DialogModule, DialogComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  selector: 'app-dynamic-size',
  standalone: true,
  imports: [DialogModule],
  template: `
    <div id="dialog-container" style="height: 600px;">
      <button (click)="makeSmall()">Small</button>
      <button (click)="makeMedium()">Medium</button>
      <button (click)="makeLarge()">Large</button>

      <ejs-dialog
        #dialog
        width="400px"
        height="300px"
        content="Resizable dialog"
      >
      </ejs-dialog>
    </div>
  `
})
export class DynamicSizeComponent {
  @ViewChild('dialog') dialog!: DialogComponent;

  makeSmall(): void {
    this.dialog.width = '300px';
    this.dialog.height = '200px';
  }

  makeMedium(): void {
    this.dialog.width = '400px';
    this.dialog.height = '300px';
  }

  makeLarge(): void {
    this.dialog.width = '600px';
    this.dialog.height = '400px';
  }
}
```

## Min/Max Constraints

### Minimum Size

```typescript
@Component({
  template: `
    <ejs-dialog
      width="500px"
      height="300px"
      [minHeight]="250"
      [resizeHandles]="['All']"
      content="Try resizing - minimum 250px height enforced"
    >
    </ejs-dialog>
  `
})
export class MinHeightComponent {}
```
---

## Height Calculation and Target Container Requirements

> **Important:** The Dialog's `max-height` is **automatically calculated based on the height of its target element**. If the dialog's `height` exceeds the target element's height, the height will not be set correctly.

### How the Calculation Works

| Scenario | Target | Requirement |
|----------|--------|-------------|
| No `target` set | `document.body` (default) | Set `html, body { height: 100%; }` in CSS |
| Custom `target="#container"` | The specified element | Container must have explicit `height` or `min-height` |
| Percentage `height="80%"` | Target element | Target must have a concrete pixel height for % to resolve |

### Rule: Always Give the Target an Explicit Height

```typescript
// ✅ CORRECT — target has explicit height
@Component({
  template: `
    <div id="dialog-container" style="height: 600px; position: relative; min-height: 400px;">
      <ejs-dialog
        target="#dialog-container"
        height="400px"
        content="Height renders correctly because target has explicit height"
      >
      </ejs-dialog>
    </div>
  `
})
export class CorrectHeightComponent {}
```

```typescript
// ❌ INCORRECT — target has no height, dialog height won't be applied
@Component({
  template: `
    <div id="dialog-container">
      <ejs-dialog
        target="#dialog-container"
        height="400px"
        content="Height may NOT render correctly"
      >
      </ejs-dialog>
    </div>
  `
})
export class IncorrectHeightComponent {}
```

### Using `document.body` as Target (Default Behavior)

When no `target` is configured, the dialog uses `document.body`. To ensure proper height calculation:

```css
/* styles.css — add globally */
html, body {
  height: 100%;
  margin: 0;
}
```

```typescript
// No target property = document.body is the target
// Body must have height: 100% for dialog height to compute correctly
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DialogModule],
  template: `
    <ejs-dialog
      height="500px"
      content="Dialog using document.body as target"
    >
    </ejs-dialog>
  `
  // styles.css must include: html, body { height: 100%; }
})
export class BodyTargetDialogComponent {}
```

### Percentage Height with a Target

When using percentage-based height, the target must have a concrete size:

```typescript
@Component({
  template: `
    <!-- ✅ 80% of 600px = 480px — resolves correctly -->
    <div id="dialog-container" style="height: 600px; position: relative;">
      <ejs-dialog
        target="#dialog-container"
        height="80%"
        content="80% height works because parent has explicit height"
      >
      </ejs-dialog>
    </div>
  `
})
export class PercentageHeightComponent {}
```

### Summary of Requirements

| Requirement | Why |
|-------------|-----|
| Target must have `position: relative` (or `absolute`/`fixed`) | Dialog is positioned relative to target |
| Target must have explicit `height` or `min-height` | Dialog max-height is computed from target height |
| `html, body { height: 100%; }` when no custom target | Ensures body has measurable height for calculation |
| Avoid `height: auto` on target when using `%` dialog height | Percentage heights cannot resolve against an auto-height container |

---

## Responsive Sizing

### Container Relative Sizing

```typescript
@Component({
  template: `
    <div id="dialog-container" 
      style="width: 100%; height: 100vh; display: flex; align-items: center; justify-content: center;">
      
      <ejs-dialog
        width="90%"
        height="80%"
        content="Responsive to container"
      >
      </ejs-dialog>
    </div>
  `
})
export class ResponsiveContainerComponent {}
```

### Media Query Based Positioning

```typescript
@Component({
  template: `
    <ejs-dialog
      [width]="getDialogWidth()"
      [height]="getDialogHeight()"
      [position]="getDialogPosition()"
      content="Responsive dialog"
    >
    </ejs-dialog>
  `
})
export class ResponsiveMediaComponent {
  @HostListener('window:resize', ['$event'])
  onResize(): void {
    // Dialog will recalculate on resize
  }

  getDialogWidth(): string {
    const width = window.innerWidth;
    return width < 768 ? '90%' : '50%';
  }

  getDialogHeight(): string {
    const height = window.innerHeight;
    return height < 600 ? '80%' : '60%';
  }

  getDialogPosition(): string {
    return window.innerWidth < 768 ? 'Center' : 'TopCenter';
  }
}
```

## Full-screen Mode

### Mobile Full-screen Dialog

```typescript
@Component({
  template: `
    <div id="dialog-container" style="height: 500px;">
      <button class="e-control e-btn" (click)="openFullscreen()">
        Open Full-screen Dialog
      </button>

      <ejs-dialog
        #fullscreenDialog
        [width]="isMobile() ? '100%' : '600px'"
        [height]="isMobile() ? '100%' : 'auto'"
        [position]="isMobile() ? { X: 0, Y: 0 } : 'Center'"
        [showCloseIcon]="true"
        content="Full-screen on mobile, normal on desktop"
      >
      </ejs-dialog>
    </div>
  `
})
export class FullscreenComponent {
  @ViewChild('fullscreenDialog') dialog!: DialogComponent;

  isMobile(): boolean {
    return window.innerWidth < 768;
  }

  openFullscreen(): void {
    this.dialog.show();
  }
}
```

### Toggle Full-screen

```typescript
@Component({
  template: `
    <ejs-dialog
      #dialog
      [width]="isFullscreen ? '100%' : '500px'"
      [height]="isFullscreen ? '100%' : '400px'"
    >
      <ng-template #header>
        <div class="header-with-toggle">
          <span>Dialog Title</span>
          <button 
            class="e-control e-btn e-icon-btn"
            (click)="toggleFullscreen()"
          >
            {{ isFullscreen ? 'Exit Fullscreen' : 'Fullscreen' }}
          </button>
        </div>
      </ng-template>
    </ejs-dialog>
  `,
  styles: [`
    .header-with-toggle {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
  `]
})
export class ToggleFullscreenComponent {
  @ViewChild('dialog') dialog!: DialogComponent;
  isFullscreen = false;

  toggleFullscreen(): void {
    this.isFullscreen = !this.isFullscreen;
    this.dialog.refresh();
  }
}
```

## Examples

### Example 1: Sticky Positioned Dialog

```typescript
@Component({
  template: `
    <div id="dialog-container" style="height: 800px; overflow-y: auto;">
      <button (click)="openSticky()">Open Sticky Dialog</button>

      <ejs-dialog
        #stickyDialog
        position="TopRight"
        width="300px"
        [showCloseIcon]="true"
        content="This dialog stays in view while scrolling"
      >
      </ejs-dialog>

      <!-- Long scrollable content -->
      <div style="height: 2000px; background: linear-gradient(to bottom, #f0f0f0, #fff);">
        <p *ngFor="let i of [1,2,3,4,5,6,7,8,9,10]">
          Lorem ipsum dolor sit amet... ({{ i * 100 }} words)
        </p>
      </div>
    </div>
  `
})
export class StickyDialogComponent {
  @ViewChild('stickyDialog') dialog!: DialogComponent;

  openSticky(): void {
    this.dialog.show();
  }
}
```

### Example 2: Cascading Dialogs

```typescript
@Component({
  template: `
    <div id="dialog-container" style="height: 600px;">
      <button (click)="openDialog1()">Open First Dialog</button>

      <ejs-dialog
        #dialog1
        position="Center"
        [position]="{ X: 50, Y: 50 }"
        width="400px"
        height="300px"
      >
        <ng-template #header><span>Dialog 1</span></ng-template>
        <ng-template #content>
          <p>This is the first dialog</p>
          <button (click)="openDialog2()">Open Second Dialog</button>
        </ng-template>
      </ejs-dialog>

      <ejs-dialog
        #dialog2
        [position]="{ X: 150, Y: 150 }"
        width="400px"
        height="300px"
      >
        <ng-template #header><span>Dialog 2</span></ng-template>
        <ng-template #content>
          <p>This is the second dialog, offset from the first</p>
        </ng-template>
      </ejs-dialog>
    </div>
  `
})
export class CascadingDialogsComponent {
  @ViewChild('dialog1') dialog1!: DialogComponent;
  @ViewChild('dialog2') dialog2!: DialogComponent;

  openDialog1(): void { this.dialog1.show(); }
  openDialog2(): void { this.dialog2.show(); }
}
```

