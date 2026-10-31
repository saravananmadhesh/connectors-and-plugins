# Responsive & Scrolling

## Table of Contents
- [Responsive Overflow Modes](#responsive-overflow-modes)
- [Scrollable Mode](#scrollable-mode)
- [Navigation Arrows](#navigation-arrows)
- [Touch Swipe Gestures](#touch-swipe-gestures)
- [Scroll Step Customization](#scroll-step-customization)
- [Popup Mode](#popup-mode)
- [Container Width Management](#container-width-management)
- [Responsive Design Patterns](#responsive-design-patterns)
- [Toolbar Sizing and Minimum Height](#toolbar-sizing-and-minimum-height)

## Responsive Overflow Modes

The Angular Toolbar automatically handles content overflow with responsive display modes when toolbar items exceed available viewing area. Two primary responsive modes are supported:

1. **Scrollable** (Default) - Displays items in single horizontal line with scrolling navigation
2. **Popup** - Displays overflowed commands in a popup menu (mobile-optimized)

### Mode Selection

The default overflow mode is `Scrollable`. For mobile-optimized applications, use `Popup` mode.

## Scrollable Mode

The Scrollable mode is the default responsive mechanism. All commands display in a single horizontal line with navigation arrows when content overflows.

### Scrollable Mode Features

- Navigation arrows appear at start and end of toolbar when items overflow
- Click arrows to scroll and reveal hidden commands
- Touch swipe gestures on touch devices
- Hold arrow icons for continuous scrolling
- Navigation icon disabled when at first or last item
- Smooth scrolling transition

### Basic Scrollable Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <!-- Container narrower than total content width -->
    <ejs-toolbar width="300px">
      <e-items>
        <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
        <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
        <e-item text='Paste' prefixIcon='e-icons e-paste'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='bold' prefixIcon='e-icons e-bold'></e-item>
        <e-item text='underline' prefixIcon='e-icons e-underline'></e-item>
        <e-item text='italic' prefixIcon='e-icons e-italic'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='A-Z Sort' prefixIcon='e-icons e-ascending'></e-item>
        <e-item text='Z-A Sort' prefixIcon='e-icons e-descending'></e-item>
        <e-item text='Clear' prefixIcon='e-icons e-clear'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

## Navigation Arrows

Navigation arrows control scrolling behavior in Scrollable mode.

### Arrow Behavior

- **Left Arrow:** Scrolls toolbar content left (reveals commands from right)
- **Right Arrow:** Scrolls toolbar content right (reveals commands from left)
- **Disabled State:** Arrow disables when reaching first or last item
- **Continuous Scroll:** Long press/hold arrow for continuous scrolling

### Arrow Visibility

Arrows appear automatically when:
- Container width is less than total content width
- Items overflow available viewing area

Arrows hide/disable when:
- All items fit in container width
- Reached first item (left arrow disabled)
- Reached last item (right arrow disabled)

### Styling Navigation Arrows

The navigation arrows are contained in the `.e-hor-nav` element with icon elements inside.

```css
/* Navigation arrow container - Contains scroll left/right icons */
.e-toolbar .e-hor-nav {
  align-items: center;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  display: flex;
  height: 40px;
  overflow: hidden;
  position: absolute;
  right: 0;
  top: 0;
  width: 48px;
}

/* Arrow icon styling - Down arrow (scroll right) and up arrow (scroll left) */
.e-toolbar .e-hor-nav .e-popup-down-icon.e-icons,
.e-toolbar .e-hor-nav .e-popup-up-icon.e-icons {
  display: flex;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 16px;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
}

.e-toolbar .e-hor-nav .e-popup-down-icon.e-icons:hover,
.e-toolbar .e-hor-nav .e-popup-up-icon.e-icons:hover {
  background: #f0f0f0;
}

.e-toolbar .e-hor-nav .e-popup-down-icon.e-icons:disabled,
.e-toolbar .e-hor-nav .e-popup-up-icon.e-icons:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
```

## Touch Swipe Gestures

Touch devices support swipe gestures to scroll toolbar items.

### Swipe Behavior

- **Swipe Right:** Reveals hidden items on left (equivalent to clicking left arrow)
- **Swipe Left:** Reveals hidden items on right (equivalent to clicking right arrow)
- **Continuous Swipe:** Repeat swipe for more scrolling
- **Double Swipe:** Swipe multiple times for rapid navigation

### Touch Swipe Example

```typescript
<ejs-toolbar width="300px">
  <e-items>
    <!-- Many items to trigger swipe on mobile -->
    <e-item text='Item 1'></e-item>
    <e-item text='Item 2'></e-item>
    <e-item text='Item 3'></e-item>
    <e-item text='Item 4'></e-item>
    <e-item text='Item 5'></e-item>
    <e-item text='Item 6'></e-item>
  </e-items>
</ejs-toolbar>
```

On touch devices, users can:
1. Swipe left to scroll right and see more items
2. Swipe right to scroll back and see previous items

### Long Press Scrolling

- Long press navigation arrow for continuous scrolling
- Release to stop scrolling
- Works on both mouse and touch devices

## Scroll Step Customization

The `scrollStep` property controls the distance scrolled when clicking navigation arrows.

### scrollStep Property

```typescript
<!-- Default scrollStep is auto-calculated -->
<ejs-toolbar width="300px">
  <!-- Items -->
</ejs-toolbar>

<!-- Custom scrollStep value -->
<ejs-toolbar width="300px" scrollStep="50">
  <!-- Items -->
</ejs-toolbar>

<!-- Larger scroll distance -->
<ejs-toolbar width="300px" scrollStep="150">
  <!-- Items -->
</ejs-toolbar>
```

### Scroll Step Values

| Value | Behavior |
|-------|----------|
| `auto` (default) | Calculates scroll distance to fit one item width |
| `0` | No scrolling |
| `50` | Scrolls 50 pixels per click |
| `100` | Scrolls 100 pixels per click |
| `150` | Scrolls 150 pixels per click |

### Complete Scroll Step Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <div class="toolbar-section">
      <h3>Scroll Step: {{ scrollStep }}px</h3>
      <ejs-toolbar id="toolbar" [scrollStep]="scrollStep" width="300px">
        <e-items>
          <e-item prefixIcon='e-icons e-cut' tooltipText='Cut'></e-item>
          <e-item prefixIcon='e-icons e-copy' tooltipText='Copy'></e-item>
          <e-item prefixIcon='e-icons e-paste' tooltipText='Paste'></e-item>
          <e-item type='Separator'></e-item>
          <e-item prefixIcon='e-icons e-bold' tooltipText='Bold'></e-item>
          <e-item prefixIcon='e-icons e-underline' tooltipText='Underline'></e-item>
          <e-item prefixIcon='e-icons e-italic' tooltipText='Italic'></e-item>
          <e-item prefixIcon='e-icons e-color' tooltipText='Color Picker'></e-item>
          <e-item type='Separator'></e-item>
          <e-item prefixIcon='e-icons e-align-left' tooltipText='Align Left'></e-item>
          <e-item prefixIcon='e-icons e-align-right' tooltipText='Align Right'></e-item>
          <e-item prefixIcon='e-icons e-align-center' tooltipText='Align Center'></e-item>
          <e-item prefixIcon='e-icons e-align-justify' tooltipText='Align Justify'></e-item>
        </e-items>
      </ejs-toolbar>

      <div class="scroll-step-selector">
        <button (click)="scrollStep = 30">Scroll 30px</button>
        <button (click)="scrollStep = 50">Scroll 50px</button>
        <button (click)="scrollStep = 100">Scroll 100px</button>
        <button (click)="scrollStep = 150">Scroll 150px</button>
      </div>
    </div>
  `
})
export class AppComponent {
  scrollStep: number = 50;
}
```

## Popup Mode

The Popup mode displays overflowed commands in a popup menu instead of scrolling.

### Popup Mode Setup

```typescript
<ejs-toolbar overflowMode="Popup">
  <e-items>
    <!-- Items -->
  </e-items>
</ejs-toolbar>
```

### Popup Mode Features

- Overflowed items appear in a dropdown menu
- More suitable for mobile and responsive layouts
- Cleaner interface with hidden overflow items
- Popup opens with dropdown icon at end of visible items

## Container Width Management

The toolbar automatically enters Scrollable or Popup mode based on container width.

### Responsive Width Example

```typescript
<div class="toolbar-container">
  <ejs-toolbar width="100%">
    <e-items>
      <e-item text='Cut'></e-item>
      <e-item text='Copy'></e-item>
      <e-item text='Paste'></e-item>
      <!-- More items -->
    </e-items>
  </ejs-toolbar>
</div>
```

CSS:
```css
.toolbar-container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

@media (max-width: 600px) {
  .toolbar-container {
    max-width: 100%;
  }
}
```

### Fixed vs Flexible Width

```typescript
<!-- Fixed width - triggers scrolling at specific width -->
<ejs-toolbar width="400px">
  <!-- Items -->
</ejs-toolbar>

<!-- Flexible width - adapts to parent container -->
<ejs-toolbar width="100%">
  <!-- Items -->
</ejs-toolbar>

<!-- Max width constraint -->
<div style="max-width: 500px;">
  <ejs-toolbar width="100%">
    <!-- Items -->
  </ejs-toolbar>
</div>
```

## Responsive Design Patterns

### Pattern 1: Responsive Toolbar

```typescript
export class AppComponent {
  toolbarWidth: string = '100%';
  scrollStep: number = 50;

  onWindowResize(width: number) {
    if (width < 600) {
      this.scrollStep = 30;
    } else if (width < 1000) {
      this.scrollStep = 50;
    } else {
      this.scrollStep = 100;
    }
  }
}
```

### Pattern 2: Mobile-Optimized Toolbar

```typescript
<ejs-toolbar [overflowMode]="isMobile ? 'Popup' : 'Scrollable'"
             [width]="isMobile ? '100%' : '600px'"
             [scrollStep]="isMobile ? 30 : 50">
  <e-items>
    <!-- Items -->
  </e-items>
</ejs-toolbar>
```

### Pattern 3: Conditional Item Display

```typescript
<ejs-toolbar width="100%">
  <e-items>
    <e-item text='Cut'></e-item>
    <e-item text='Copy'></e-item>
    
    <!-- Hide on mobile -->
    <e-item text='Paste' *ngIf="!isMobile"></e-item>
    <e-item text='Undo' *ngIf="!isMobile"></e-item>
    
    <!-- Separator and additional mobile items -->
    <e-item type='Separator' *ngIf="!isMobile"></e-item>
    <e-item text='More' *ngIf="isMobile"></e-item>
  </e-items>
</ejs-toolbar>
```

### Complete Responsive Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [ToolbarModule, CommonModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar [width]="containerWidth"
                 [scrollStep]="scrollStepValue"
                 [overflowMode]="overflowMode">
      <e-items>
        <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
        <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
        <e-item text='Paste' prefixIcon='e-icons e-paste'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Undo' *ngIf="!isMobile"></e-item>
        <e-item text='Redo' *ngIf="!isMobile"></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent implements OnInit {
  containerWidth: string = '100%';
  scrollStepValue: number = 50;
  overflowMode: string = 'Scrollable';
  isMobile: boolean = false;

  ngOnInit() {
    this.checkWindowSize();
    window.addEventListener('resize', () => this.checkWindowSize());
  }

  checkWindowSize() {
    const width = window.innerWidth;
    this.isMobile = width < 768;
    this.scrollStepValue = this.isMobile ? 30 : 50;
    this.overflowMode = this.isMobile ? 'Popup' : 'Scrollable';
  }
}
```

## Toolbar Sizing and Minimum Height

The toolbar supports custom height properties and adapts to constraints even when rendered below the default minimum height.

### Default Toolbar Dimensions

| Property | Value | Notes |
|----------|-------|-------|
| Default Height | 40px | Standard toolbar height for normal content |
| Minimum Recommended Height | 32px | Minimum safe height for icon-only toolbars |
| Minimum Functional Height | 20px | Toolbar remains functional below standard height |
| Default Width | Auto | Expands to fill parent container |

### Custom Height Configuration

Specify toolbar height using the `height` property:

```typescript
<!-- Standard height (40px) -->
<ejs-toolbar>
  <e-items>
    <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
    <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
  </e-items>
</ejs-toolbar>

<!-- Compact height (30px) -->
<ejs-toolbar height="30px">
  <e-items>
    <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
    <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
  </e-items>
</ejs-toolbar>

<!-- Extra compact height (20px) -->
<ejs-toolbar height="20px">
  <e-items>
    <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
    <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
  </e-items>
</ejs-toolbar>
```

### Rendering Toolbar Below Minimum Height

When height is set below the default minimum (40px), the toolbar adapts by:
- Reducing internal padding and spacing
- Minimizing icon and text sizes to fit
- Maintaining scrolling/overflow functionality
- Supporting both Scrollable and Popup modes

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <div class="toolbar-examples">
      <!-- Scrollable mode with minimal height -->
      <h3>Scrollable Mode (Height: 20px)</h3>
      <ejs-toolbar height="20px" width="300px">
        <e-items>
          <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
          <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
          <e-item text='Paste' prefixIcon='e-icons e-paste'></e-item>
          <e-item type='Separator'></e-item>
          <e-item text='bold' prefixIcon='e-icons e-bold'></e-item>
          <e-item text='underline' prefixIcon='e-icons e-underline'></e-item>
          <e-item text='italic' prefixIcon='e-icons e-italic'></e-item>
          <e-item type='Separator'></e-item>
          <e-item text='Export' prefixIcon='e-icons e-export'></e-item>
          <e-item text='Reload' prefixIcon='e-icons e-refresh'></e-item>
          <e-item text='Clear' prefixIcon='e-icons e-erase'></e-item>
        </e-items>
      </ejs-toolbar>

      <br>

      <!-- Popup mode with minimal height -->
      <h3>Popup Mode (Height: 20px)</h3>
      <ejs-toolbar height="20px" 
                    overflowMode="Popup" 
                    width="380px">
        <e-item text='Cut' prefixIcon='e-icons e-cut' 
                 overflow='Show' 
                 showTextOn='overflow'></e-item>
        <e-item text='Copy' prefixIcon='e-icons e-copy' 
                 overflow='Show' 
                 showTextOn='overflow'></e-item>
        <e-item text='Paste' prefixIcon='e-icons e-paste' 
                 overflow='Show' 
                 showTextOn='overflow'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='bold' prefixIcon='e-icons e-bold' 
                 overflow='Show' 
                 showTextOn='overflow'></e-item>
        <e-item text='underline' prefixIcon='e-icons e-underline' 
                 overflow='Show' 
                 showTextOn='overflow'></e-item>
        <e-item text='italic' prefixIcon='e-icons e-italic' 
                 overflow='Show' 
                 showTextOn='overflow'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='link' prefixIcon='e-icons e-link' 
                 overflow='Show' 
                 showTextOn='overflow'></e-item>
        <e-item text='image' prefixIcon='e-icons e-image' 
                 overflow='Show' 
                 showTextOn='overflow'></e-item>
      </ejs-toolbar>
    </div>
  `
})
export class AppComponent { }
```

### Height Constraints and Responsive Behavior

| Height | Mode | Behavior | Use Case |
|--------|------|----------|----------|
| 40px+ | Either | Full spacing, all text visible | Standard applications |
| 30-39px | Either | Reduced padding, comfortable spacing | Compact layouts |
| 20-29px | Either | Minimal spacing, icon-focused | Embedded toolbars, sidebars |
| <20px | Either | Risk of content overflow | Not recommended |

### Styling Constrained-Height Toolbars

When using minimal heights, adjust CSS to optimize appearance:

```css
/* Minimal height toolbar styling */
.e-toolbar[height="20px"] {
  min-height: 20px;
  overflow: visible;
}

/* Remove excess padding when constrained */
.e-toolbar[height="20px"] .e-toolbar-item {
  padding: 0;
  min-height: 20px;
}

/* Icon sizing for minimal height */
.e-toolbar[height="20px"] .e-icons {
  font-size: 14px;
  line-height: 1;
}

/* Separator adjustment for compact layout */
.e-toolbar[height="20px"] .e-separator {
  height: 16px;
  margin: 2px 4px;
}
```

### Handling Text in Minimal Height Toolbars

For toolbars with height below 30px:
- Consider using icon-only items (`prefixIcon` without `text`)
- Use `hideText` property to hide labels
- Use `showTextOn='overflow'` to show text only in popup
- Provide `tooltipText` for icon-only buttons

```typescript
<!-- Icon-only items for minimal height -->
<ejs-toolbar height="20px">
  <e-items>
    <!-- Icon only, no text -->
    <e-item prefixIcon='e-icons e-cut' 
             tooltipText='Cut (Ctrl+X)'></e-item>
    <!-- Text hidden, shown on overflow -->
    <e-item text='Copy' 
             prefixIcon='e-icons e-copy' 
             hideText="true"
             tooltipText='Copy (Ctrl+C)'></e-item>
    <!-- Text shown in popup only -->
    <e-item text='Paste' 
             prefixIcon='e-icons e-paste' 
             showTextOn='overflow'
             tooltipText='Paste (Ctrl+V)'></e-item>
  </e-items>
</ejs-toolbar>
```

