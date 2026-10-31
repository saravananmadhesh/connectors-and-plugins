# Responsive & Adaptive Behavior

## Table of Contents
- [Adaptive Rendering](#adaptive-rendering)
- [Overflow Modes](#overflow-modes)
- [Responsive Tab Display](#responsive-tab-display)
- [Orientation](#orientation)
- [Touch & Swipe Control](#touch--swipe-control)

## Adaptive Rendering

The Tab component automatically adapts to constrained space:

### Basic Adaptive Tabs

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Adaptive tabs with constrained width -->
    <div style="width: 400px; border: 1px solid #ccc;">
      <ejs-tab>
        <e-tabitems>
          <e-tabitem [header]="{ text: 'Dashboard' }" content="Dashboard"></e-tabitem>
          <e-tabitem [header]="{ text: 'Products' }" content="Products"></e-tabitem>
          <e-tabitem [header]="{ text: 'Services' }" content="Services"></e-tabitem>
          <e-tabitem [header]="{ text: 'Support' }" content="Support"></e-tabitem>
          <e-tabitem [header]="{ text: 'Settings' }" content="Settings"></e-tabitem>
          <e-tabitem [header]="{ text: 'About' }" content="About"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent { }
```

### Width Constraint

```typescript
<ejs-tab [width]="'400px'" [height]="'300px'">
  <e-tabitems>
    <!-- tabs -->
  </e-tabitems>
</ejs-tab>
```

## Overflow Modes

Handle tabs that don't fit in available space:

### Scrollable Mode

Scroll arrows appear when tabs exceed container width:

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Many tabs with scroll arrows -->
    <ejs-tab [overflowMode]="'Scrollable'" style="width: 500px;">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 3' }" content="Content 3"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 4' }" content="Content 4"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 5' }" content="Content 5"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 6' }" content="Content 6"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 7' }" content="Content 7"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 8' }" content="Content 8"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent { }
```

**Features:**
- Left/right arrow buttons to scroll through tabs
- Smooth scrolling
- Keyboard navigation still works
- Active tab stays visible

### Popup Mode

Overflowing tabs appear in a dropdown menu:

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Overflow tabs in popup menu -->
    <ejs-tab [overflowMode]="'Popup'" style="width: 400px;">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Home' }" content="Home content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Features' }" content="Features content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Pricing' }" content="Pricing content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Blog' }" content="Blog content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Support' }" content="Support content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Contact' }" content="Contact content"></e-tabitem>
        <e-tabitem [header]="{ text: 'About' }" content="About content"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent { }
```

**Features:**
- Overflowing tabs hidden by default
- Click dropdown arrow to see all tabs
- Click tab to select from popup
- Responsive to width changes

### Choosing Between Modes

| Scenario | Mode | Reason |
|----------|------|--------|
| Users need to see all tabs | Scrollable | Preserves visibility |
| Many tabs (10+) | Popup | Saves space |
| Few tabs (5-7) | Default | No scrolling needed |
| Mobile | Popup | Better mobile UX |

## Responsive Tab Display

### Mobile-First Responsive Tabs

```typescript
import { Component, HostListener } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';

@Component({
  imports: [TabModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Responsive tab container -->
    <div [ngStyle]="{ 'width': containerWidth, 'padding': containerPadding }">
      <ejs-tab [overflowMode]="overflowMode">
        <e-tabitems>
          <e-tabitem [header]="{ text: 'Mobile' }" content="Mobile optimized"></e-tabitem>
          <e-tabitem [header]="{ text: 'Tablet' }" content="Tablet view"></e-tabitem>
          <e-tabitem [header]="{ text: 'Desktop' }" content="Desktop view"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent {
  public containerWidth = '100%';
  public containerPadding = '16px';
  public overflowMode = 'Popup';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = window.innerWidth;

    if (width < 600) {
      // Mobile
      this.containerWidth = '100%';
      this.containerPadding = '8px';
      this.overflowMode = 'Popup';
    } else if (width < 1024) {
      // Tablet
      this.containerWidth = '100%';
      this.containerPadding = '12px';
      this.overflowMode = 'Popup';
    } else {
      // Desktop
      this.containerWidth = '90%';
      this.containerPadding = '20px';
      this.overflowMode = 'Scrollable';
    }
  }
}
```

### CSS Media Queries for Responsive Design

```css
/* Mobile: < 600px */
@media (max-width: 600px) {
  .e-tab {
    width: 100%;
  }

  .e-tab .e-tab-wrap {
    font-size: 12px;
    padding: 8px 10px;
  }

  .e-tab .e-tab-header .e-toolbar-item .e-tab-icon {
    margin-right: 4px;
  }

  .e-tab .e-content {
    padding: 10px;
    font-size: 13px;
  }
}

/* Tablet: 600px - 1024px */
@media (min-width: 600px) and (max-width: 1024px) {
  .e-tab .e-tab-wrap {
    font-size: 13px;
    padding: 10px 14px;
  }

  .e-tab .e-content {
    padding: 15px;
    font-size: 14px;
  }
}

/* Desktop: > 1024px */
@media (min-width: 1024px) {
  .e-tab .e-tab-wrap {
    font-size: 14px;
    padding: 12px 18px;
  }

  .e-tab .e-content {
    padding: 20px;
    font-size: 14px;
    line-height: 1.6;
  }
}
```

## Orientation

Tab component supports horizontal and vertical layouts:

### Horizontal Orientation (Default)

```typescript
<ejs-tab [orientation]="'Horizontal'">
  <e-tabitems>
    <e-tabitem [header]="{ text: 'Left' }" content="Content 1"></e-tabitem>
    <e-tabitem [header]="{ text: 'Center' }" content="Content 2"></e-tabitem>
    <e-tabitem [header]="{ text: 'Right' }" content="Content 3"></e-tabitem>
  </e-tabitems>
</ejs-tab>
```

### Vertical Orientation

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Headers on left, content on right -->
    <ejs-tab [orientation]="'Vertical'" style="display: flex; height: 400px;">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Overview' }" content="Overview content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Details' }" content="Detailed information"></e-tabitem>
        <e-tabitem [header]="{ text: 'Settings' }" content="Configuration options"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent { }
```

### Orientation Change on Resize

```typescript
import { Component, HostListener, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #tabObj [orientation]="tabOrientation">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  public tabOrientation = 'Horizontal';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const width = window.innerWidth;

    if (width < 800) {
      // Switch to horizontal on mobile
      this.tabOrientation = 'Horizontal';
    } else {
      // Use vertical on desktop
      this.tabOrientation = 'Vertical';
    }

    (this.tabObj as TabComponent).refresh();
  }
}
```

## Touch & Swipe Control

Use the [`swipeMode`](https://ej2.syncfusion.com/angular/documentation/api/tab/#swipeMode) property to control swipe-based navigation on touch devices.

### Prevent Swipe Selection

Disable swipe-based navigation using the `swipeMode` property:

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Swipe navigation disabled -->
    <ejs-tab swipeMode="None">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tap to select' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'No swiping' }" content="Content 2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent { }
```

**SwipeMode Options:**
- **Both** (default) - Swipe with touch and mouse
- **Touch** - Swipe with touch only
- **Mouse** - Swipe with mouse only
- **None** - Disable all swipe navigation

### Custom Touch Handler

```typescript
import { Component, ViewChild, HostListener } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #tabObj [allowDragAndDrop]="false">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Swipe Enabled' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 3' }" content="Content 3"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  private touchStartX = 0;
  private touchStartY = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;

    const deltaX = this.touchStartX - touchEndX;
    const deltaY = this.touchStartY - touchEndY;

    // Only swipe if horizontal movement > vertical movement
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      const tab = this.tabObj as TabComponent;
      const currentIndex = tab.selectedIndex!;
      const totalTabs = tab.items!.length;

      if (deltaX > 0) {
        // Swipe left - next tab
        tab.select((currentIndex + 1) % totalTabs);
      } else {
        // Swipe right - previous tab
        tab.select(currentIndex === 0 ? totalTabs - 1 : currentIndex - 1);
      }
    }
  }
}
```

## Best Practices

- **Mobile First:** Design for mobile, then enhance for larger screens
- **Overflow Mode:** Use Popup for mobile, Scrollable for desktop
- **Touch Friendly:** Ensure tabs are at least 44x44px for touch
- **Orientation:** Provide horizontal for small screens, vertical for wide screens
- **Performance:** Use Dynamic rendering mode for many responsive tabs
- **Testing:** Test on actual devices and various screen sizes
- **Accessibility:** Maintain proper focus and keyboard navigation on all sizes

## Performance Tips

- Lazy load content in responsive tabs (use Dynamic or On Demand modes)
- Minimize re-renders during window resize (debounce resize event)
- Use `media` queries over JavaScript when possible
- Profile on mobile devices, not just desktop browsers
- Test with realistic content (not empty tabs)
