# Advanced Features in Angular Accordion

## Table of Contents
- [Custom Animations](#custom-animations)
- [Animation API Reference](#animation-api-reference)
- [Nested Accordions](#nested-accordions)
- [TreeView Integration](#treeview-integration)
- [Custom Styling](#custom-styling)
- [RTL Support](#rtl-support)

## Custom Animations

### Animation Configuration

Customize the expand and collapse animations using the `animation` property:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion [animation]="animationSettings">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>Animated Item 1</ng-template>
          <ng-template #content>Content with custom animation</ng-template>
        </e-accordionitem>
        <e-accordionitem>
          <ng-template #header>Animated Item 2</ng-template>
          <ng-template #content>Smooth expand/collapse transitions</ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  public animationSettings = {
    expand: {
      effect: 'SlideDown',
      duration: 400,
      easing: 'ease'
    },
    collapse: {
      effect: 'SlideUp',
      duration: 400,
      easing: 'ease'
    }
  };
}
```

### Available Animation Effects

The accordion supports various animation effects for expand and collapse:

| Effect | Description |
|---|---|
| `SlideDown` | Content slides down smoothly (default expand) |
| `SlideUp` | Content slides up smoothly (default collapse) |
| `FadeDown` | Content fades in while sliding down |
| `FadeUp` | Content fades out while sliding up |
| `Zoom` | Content zooms in/out |
| `None` | No animation |

### Animation Examples

**SlideDown and SlideUp (Default):**
```typescript
expand: { effect: 'SlideDown', duration: 400 },
collapse: { effect: 'SlideUp', duration: 400 }
```

**FadeDown and FadeUp:**
```typescript
expand: { effect: 'FadeDown', duration: 500 },
collapse: { effect: 'FadeUp', duration: 500 }
```

**Zoom Animation:**
```typescript
expand: { effect: 'Zoom', duration: 600, easing: 'ease-in' },
collapse: { effect: 'Zoom', duration: 600, easing: 'ease-out' }
```

**No Animation:**
```typescript
expand: { effect: 'None' },
collapse: { effect: 'None' }
```

### Animation Easing Functions

Control the animation timing curve using `easing`:

| Easing | Description |
|---|---|
| `linear` | Constant speed throughout |
| `ease` | Slow start and end, fast middle |
| `ease-in` | Slow start, fast end |
| `ease-out` | Fast start, slow end |
| `ease-in-out` | Slow start and end |

```typescript
public animationSettings = {
  expand: {
    effect: 'SlideDown',
    duration: 400,
    easing: 'ease-out'  // Fast start, slow end
  },
  collapse: {
    effect: 'SlideUp',
    duration: 400,
    easing: 'ease-in'   // Slow start, fast end
  }
};
```

### Duration Control

Adjust animation duration in milliseconds:

```typescript
// Fast animation (200ms)
expand: { effect: 'SlideDown', duration: 200 }

// Normal animation (400ms)
expand: { effect: 'SlideDown', duration: 400 }

// Slow animation (800ms)
expand: { effect: 'SlideDown', duration: 800 }

// No delay animation (0ms)
expand: { effect: 'SlideDown', duration: 0 }
```

### Complete Animation Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <div style="margin-bottom: 20px;">
      <label>Select Animation Effect:
        <select (change)="updateAnimation()">
          <option value="SlideDown">SlideDown/SlideUp</option>
          <option value="FadeDown">FadeDown/FadeUp</option>
          <option value="Zoom">Zoom</option>
          <option value="None">None</option>
        </select>
      </label>
    </div>

    <ejs-accordion #accordion [animation]="animationSettings">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>Item 1</ng-template>
          <ng-template #content>Animated Content 1</ng-template>
        </e-accordionitem>
        <e-accordionitem>
          <ng-template #header>Item 2</ng-template>
          <ng-template #content>Animated Content 2</ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public selectedEffect = 'SlideDown';
  public animationSettings = {
    expand: { effect: 'SlideDown', duration: 400 },
    collapse: { effect: 'SlideUp', duration: 400 }
  };

  updateAnimation() {
    const expandEffect = this.selectedEffect;
    const collapseEffect = this.selectedEffect === 'SlideDown' ? 'SlideUp' : 
                          this.selectedEffect === 'FadeDown' ? 'FadeUp' : 
                          this.selectedEffect;

    this.animationSettings = {
      expand: { effect: expandEffect as any, duration: 400 },
      collapse: { effect: collapseEffect as any, duration: 400 }
    };
  }
}
```

## Animation API Reference

The animation system consists of two models: `AccordionAnimationSettingsModel` (top-level) and `AccordionActionSettingsModel` (individual actions).

### `animation` Property (AccordionAnimationSettingsModel)
**Type:** `AccordionAnimationSettingsModel`

Configures both expand and collapse animation behaviors.

### `expand` Sub-Property (AccordionActionSettingsModel)
**Type:** `AccordionActionSettingsModel`  
**Description:** Specifies animation for expanding accordion items

**Properties:**
- `effect`: Animation effect type ('SlideDown' | 'SlideUp' | 'FadeDown' | 'FadeUp' | 'Zoom' | 'None')
- `duration`: Animation duration in milliseconds (number, default: 400)
- `easing`: Animation timing function (string, default: 'linear')

**Default:** `{ effect: 'SlideDown', duration: 400, easing: 'linear' }`

### `collapse` Sub-Property (AccordionActionSettingsModel)
**Type:** `AccordionActionSettingsModel`  
**Description:** Specifies animation for collapsing accordion items

**Properties:**
- `effect`: Animation effect type
- `duration`: Animation duration in milliseconds
- `easing`: Animation timing function

**Default:** `{ effect: 'SlideUp', duration: 400, easing: 'linear' }`

### Complete Animation Property Example

```typescript
animation: {
  expand: {
    effect: 'SlideDown',     // When expanding
    duration: 400,           // Milliseconds
    easing: 'ease-out'       // Timing curve
  },
  collapse: {
    effect: 'SlideUp',       // When collapsing
    duration: 400,           // Milliseconds
    easing: 'ease-in'        // Timing curve
  }
}
```

### All Animation Effects Reference

| Effect | Best For | Example | Notes |
|--------|----------|---------|-------|
| `SlideDown` | Expand action | Content slides down smoothly | Default expand effect |
| `SlideUp` | Collapse action | Content slides up smoothly | Default collapse effect |
| `FadeDown` | Professional look | Content fades in while sliding | Good for subtle animations |
| `FadeUp` | Professional look | Content fades out while sliding | Pairs with FadeDown |
| `Zoom` | Attention-grabbing | Content zooms from center | Most dramatic effect |
| `None` | No animation | Instant expand/collapse | Best for performance |

### All Easing Functions Reference

| Easing | Curve | Best For | Use Case |
|--------|-------|----------|----------|
| `linear` | Constant speed | Simple animations | Straightforward expand/collapse |
| `ease` | Slow start/end, fast middle | Default behavior | Balanced feel |
| `ease-in` | Accelerating | Collapse action | Speeds up as it closes |
| `ease-out` | Decelerating | Expand action | Slows down as it opens |
| `ease-in-out` | Slow start and end | Symmetric animations | Equal timing both directions |

### Effect-Easing Combinations

**Recommended Combinations:**

```typescript
// Smooth & Professional
animation: {
  expand: { effect: 'SlideDown', duration: 400, easing: 'ease-out' },
  collapse: { effect: 'SlideUp', duration: 400, easing: 'ease-in' }
}

// Fast & Responsive
animation: {
  expand: { effect: 'SlideDown', duration: 250, easing: 'ease-out' },
  collapse: { effect: 'SlideUp', duration: 250, easing: 'ease-in' }
}

// Fade Effect
animation: {
  expand: { effect: 'FadeDown', duration: 500, easing: 'ease' },
  collapse: { effect: 'FadeUp', duration: 500, easing: 'ease' }
}

// Dramatic Zoom
animation: {
  expand: { effect: 'Zoom', duration: 600, easing: 'ease-in-out' },
  collapse: { effect: 'Zoom', duration: 600, easing: 'ease-in-out' }
}

// No Animation (Performance)
animation: {
  expand: { effect: 'None' },
  collapse: { effect: 'None' }
}
```

### Duration Edge Cases

```typescript
// Instant (0ms)
expand: { effect: 'SlideDown', duration: 0 }

// Very Fast (100ms)
expand: { effect: 'SlideDown', duration: 100 }

// Very Slow (1000ms)
expand: { effect: 'SlideDown', duration: 1000 }

// Note: Durations > 5000ms may feel unresponsive
```

### Dynamic Animation Updates

Change animations at runtime:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-dynamic-animation',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <button (click)="setFastAnimation()">Fast Animation</button>
    <button (click)="setSlowAnimation()">Slow Animation</button>
    <button (click)="disableAnimation()">No Animation</button>
    
    <ejs-accordion #accordion [animation]="currentAnimation" [items]="items"></ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Item 1', content: 'Content 1' },
    { header: 'Item 2', content: 'Content 2' }
  ];

  public currentAnimation = {
    expand: { effect: 'SlideDown', duration: 400, easing: 'ease-out' },
    collapse: { effect: 'SlideUp', duration: 400, easing: 'ease-in' }
  };

  setFastAnimation() {
    this.currentAnimation = {
      expand: { effect: 'SlideDown', duration: 200, easing: 'ease-out' },
      collapse: { effect: 'SlideUp', duration: 200, easing: 'ease-in' }
    };
  }

  setSlowAnimation() {
    this.currentAnimation = {
      expand: { effect: 'SlideDown', duration: 800, easing: 'ease-out' },
      collapse: { effect: 'SlideUp', duration: 800, easing: 'ease-in' }
    };
  }

  disableAnimation() {
    this.currentAnimation = {
      expand: { effect: 'None' },
      collapse: { effect: 'None' }
    };
  }
}
```

## Nested Accordions

### Creating Nested Accordion Structure

Place an accordion inside another accordion's content using `ng-template`:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion>
      <e-accordionitems>
        <!-- Parent Item 1 -->
        <e-accordionitem expanded="true">
          <ng-template #header>
            <div>Video</div>
          </ng-template>
          <ng-template #content>
            <!-- Nested Accordion -->
            <ejs-accordion>
              <e-accordionitems>
                <e-accordionitem>
                  <ng-template #header>
                    <div>Video Track 1</div>
                  </ng-template>
                  <ng-template #content>Video Track 1 Content</ng-template>
                </e-accordionitem>
                <e-accordionitem>
                  <ng-template #header>
                    <div>Video Track 2</div>
                  </ng-template>
                  <ng-template #content>Video Track 2 Content</ng-template>
                </e-accordionitem>
              </e-accordionitems>
            </ejs-accordion>
          </ng-template>
        </e-accordionitem>

        <!-- Parent Item 2 -->
        <e-accordionitem>
          <ng-template #header>
            <div>Music</div>
          </ng-template>
          <ng-template #content>
            <!-- Nested Accordion -->
            <ejs-accordion>
              <e-accordionitems>
                <e-accordionitem>
                  <ng-template #header>
                    <div>Music Track 1</div>
                  </ng-template>
                  <ng-template #content>Music Track 1 Content</ng-template>
                </e-accordionitem>
                <e-accordionitem>
                  <ng-template #header>
                    <div>Music Track 2</div>
                  </ng-template>
                  <ng-template #content>Music Track 2 Content</ng-template>
                </e-accordionitem>
              </e-accordionitems>
            </ejs-accordion>
          </ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {}
```

### Multi-Level Nesting

Create deeper hierarchies with three or more levels:

```typescript
<ejs-accordion>
  <e-accordionitems>
    <e-accordionitem expanded="true">
      <ng-template #header>Level 1 - Item 1</ng-template>
      <ng-template #content>
        <!-- Level 2 Accordion -->
        <ejs-accordion>
          <e-accordionitems>
            <e-accordionitem expanded="true">
              <ng-template #header>Level 2 - Item 1</ng-template>
              <ng-template #content>
                <!-- Level 3 Accordion -->
                <ejs-accordion>
                  <e-accordionitems>
                    <e-accordionitem>
                      <ng-template #header>Level 3 - Item 1</ng-template>
                      <ng-template #content>Deepest Content</ng-template>
                    </e-accordionitem>
                  </e-accordionitems>
                </ejs-accordion>
              </ng-template>
            </e-accordionitem>
          </e-accordionitems>
        </ejs-accordion>
      </ng-template>
    </e-accordionitem>
  </e-accordionitems>
</ejs-accordion>
```

### Nested Accordion with Different Expand Modes

Parent in Single mode, children in Multiple mode:

```typescript
<ejs-accordion expandMode="Single">
  <e-accordionitems>
    <e-accordionitem expanded="true">
      <ng-template #header>Parent (Single Mode)</ng-template>
      <ng-template #content>
        <!-- Child in Multiple mode -->
        <ejs-accordion expandMode="Multiple">
          <e-accordionitems>
            <e-accordionitem expanded="true">
              <ng-template #header>Child 1 (Multiple)</ng-template>
              <ng-template #content>Can expand multiple items</ng-template>
            </e-accordionitem>
            <e-accordionitem expanded="true">
              <ng-template #header>Child 2 (Multiple)</ng-template>
              <ng-template #content>Both can be open</ng-template>
            </e-accordionitem>
          </e-accordionitems>
        </ejs-accordion>
      </ng-template>
    </e-accordionitem>
  </e-accordionitems>
</ejs-accordion>
```

## TreeView Integration

### Embed TreeView in Accordion

Display hierarchical data using TreeView inside accordion items:

```typescript
import { Component } from '@angular/core';
import { AccordionModule, TreeViewAllModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule, TreeViewAllModule],
  template: `
    <ejs-accordion>
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>
            <div>Documents</div>
          </ng-template>
          <ng-template #content>
            <!-- TreeView inside accordion -->
            <ejs-treeview 
              id="docTree"
              [fields]="docFields"
              [dataSource]="docData">
            </ejs-treeview>
          </ng-template>
        </e-accordionitem>

        <e-accordionitem>
          <ng-template #header>
            <div>Downloads</div>
          </ng-template>
          <ng-template #content>
            <ejs-treeview 
              id="downTree"
              [fields]="downFields"
              [dataSource]="downData">
            </ejs-treeview>
          </ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  public docFields = { dataSource: [], id: 'id', text: 'name', child: 'subItems' };
  public downFields = { dataSource: [], id: 'id', text: 'name', child: 'subItems' };

  public docData = [
    { id: '1', name: 'folder.txt' },
    { id: '2', name: 'report.pdf' }
  ];

  public downData = [
    { id: '1', name: 'app.zip' },
    { id: '2', name: 'data.xlsx' }
  ];
}
```

### TreeView with Hierarchical Data

```typescript
public fileSystemData = [
  {
    id: '1',
    name: 'Documents',
    expanded: true,
    subItems: [
      { id: '1-1', name: 'Reports', subItems: [
        { id: '1-1-1', name: 'Q1.pdf' },
        { id: '1-1-2', name: 'Q2.pdf' }
      ]},
      { id: '1-2', name: 'Proposals' }
    ]
  },
  {
    id: '2',
    name: 'Downloads',
    subItems: [
      { id: '2-1', name: 'Software' },
      { id: '2-2', name: 'Updates' }
    ]
  }
];
```

## Custom Styling

### Apply CSS Classes

Use `cssClass` to apply custom styling to accordion items:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion cssClass="custom-accordion">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>Styled Item</ng-template>
          <ng-template #content>Custom styled content</ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `,
  styles: [`
    :host ::ng-deep .custom-accordion {
      border: 2px solid #007bff;
      border-radius: 8px;
    }

    :host ::ng-deep .custom-accordion .e-acrdn-item {
      text-align: center;
      background-color: #f8f9fa;
    }

    :host ::ng-deep .custom-accordion .e-acrdn-item.e-select > .e-acrdn-header {
      background: #007bff;
      color: white;
    }
  `]
})
export class AppComponent {}
```

### Style Accordion Headers

```typescript
styles: [`
  :host ::ng-deep .e-accordion .e-acrdn-item.e-select > .e-acrdn-header {
    background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: bold;
  }

  :host ::ng-deep .e-accordion .e-acrdn-header {
    padding: 15px;
    cursor: pointer;
  }

  :host ::ng-deep .e-accordion .e-acrdn-header:hover {
    background-color: #f0f0f0;
  }
`]
```

### Style Icons

```typescript
styles: [`
  :host ::ng-deep .e-accordion .e-toggle-icon .e-icons {
    color: #667eea;
    font-size: 18px;
  }

  :host ::ng-deep .e-accordion .e-acrdn-item.e-select .e-toggle-icon .e-icons {
    color: white;
  }
`]
```

### Complete Styling Example

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion cssClass="premium-accordion">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>Premium Item 1</ng-template>
          <ng-template #content>Premium styled content with custom theme</ng-template>
        </e-accordionitem>
        <e-accordionitem>
          <ng-template #header>Premium Item 2</ng-template>
          <ng-template #content>More premium styled content</ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `,
  styles: [`
    :host ::ng-deep .premium-accordion {
      border: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 12px;
      overflow: hidden;
    }

    :host ::ng-deep .premium-accordion .e-acrdn-item {
      border-bottom: 1px solid #e0e0e0;
    }

    :host ::ng-deep .premium-accordion .e-acrdn-item.e-select > .e-acrdn-header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    :host ::ng-deep .premium-accordion .e-acrdn-header {
      padding: 16px 20px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    :host ::ng-deep .premium-accordion .e-acrdn-content {
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
  `]
})
export class AppComponent {}
```

## RTL Support

### Enable Right-to-Left Layout

Set `enableRtl` to enable RTL rendering:

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion [enableRtl]="true">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>
            <div>عنصر 1</div>
          </ng-template>
          <ng-template #content>
            <div>محتوى باللغة العربية</div>
          </ng-template>
        </e-accordionitem>
        
        <e-accordionitem>
          <ng-template #header>
            <div>عنصر 2</div>
          </ng-template>
          <ng-template #content>
            <div>محتوى إضافي</div>
          </ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {}
```

### Dynamic RTL Toggle

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <button (click)="toggleRTL()">
      {{ isRTL ? 'Switch to LTR' : 'Switch to RTL' }}
    </button>

    <ejs-accordion #accordion [enableRtl]="isRTL">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>Item 1</ng-template>
          <ng-template #content>Content 1</ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;
  public isRTL = false;

  toggleRTL() {
    this.isRTL = !this.isRTL;
  }
}
```

### RTL with Arabic Content

```typescript
template: `
  <ejs-accordion [enableRtl]="true" lang="ar">
    <e-accordionitems>
      <e-accordionitem expanded="true">
        <ng-template #header>
          <div>معلومات المنتج</div>
        </ng-template>
        <ng-template #content>
          <div>
            <p>اسم المنتج: منتج عالي الجودة</p>
            <p>السعر: 99.99 دولار</p>
            <p>التوفر: متوفر الآن</p>
          </div>
        </ng-template>
      </e-accordionitem>
    </e-accordionitems>
  </ejs-accordion>
`
```

