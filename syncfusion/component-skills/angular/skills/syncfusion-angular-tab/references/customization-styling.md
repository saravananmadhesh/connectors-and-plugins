# Customization & Styling

## Table of Contents
- [Header Styles](#header-styles)
- [Icon Customization](#icon-customization)
- [Content Height Management](#content-height-management)
- [Scroll Configuration](#scroll-configuration)
- [Animations](#animations)
- [Advanced CSS Customization](#advanced-css-customization)

## Header Styles

### Predefined Header Style Classes

Tab component provides built-in header style classes:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [TabModule, DropDownListModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <label>Header Style:</label>
      <ejs-dropdownlist 
        [dataSource]="styleOptions"
        [fields]="fields"
        [value]="'default'"
        (change)="onStyleChange($event)">
      </ejs-dropdownlist>
    </div>

    <ejs-tab #tabObj [selectedIndex]="0">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Twitter' }" content="Twitter content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Facebook' }" content="Facebook content"></e-tabitem>
        <e-tabitem [header]="{ text: 'WhatsApp' }" content="WhatsApp content"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;

  public styleOptions: object[] = [
    { text: 'Default', style: 'default' },
    { text: 'Fill', style: 'fill' },
    { text: 'Background', style: 'background' },
    { text: 'Accent', style: 'accent' }
  ];

  public fields = { text: 'text', value: 'style' };

  onStyleChange(args: ChangeEventArgs) {
    const style = args.value as string;
    const tabElement = (this.tabObj as TabComponent).element;

    // Remove all style classes
    tabElement.classList.remove('e-fill', 'e-background', 'e-accent');

    // Apply selected style
    if (style === 'fill') {
      tabElement.classList.add('e-fill');
    } else if (style === 'background') {
      tabElement.classList.add('e-background');
    } else if (style === 'accent') {
      tabElement.classList.add('e-background', 'e-accent');
    }
  }
}
```

### Style Definitions

| Class | Description |
|-------|-------------|
| `.e-fill` | Selected tab has solid fill background |
| `.e-background` | All headers have background with selected border |
| `.e-background.e-accent` | Background style with accent color for selected tab |
| (none) | Default - underline for selected tab |

### Custom Header Styling

```css
/* Custom header styles */
.custom-tabs .e-tab-header {
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  border-radius: 4px 4px 0 0;
}

.custom-tabs .e-tab-wrap {
  color: white;
  font-weight: 500;
  padding: 12px 20px;
}

.custom-tabs .e-tab-wrap:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.custom-tabs .e-tab-wrap.e-active {
  background-color: rgba(255, 255, 255, 0.25);
  border-bottom: 3px solid white;
}
```

Apply with:
```typescript
<ejs-tab cssClass="custom-tabs">
  <!-- content -->
</ejs-tab>
```

## Icon Customization

### Icon Positioning

Control where icons appear relative to text:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [TabModule, DropDownListModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <label>Icon Position:</label>
      <ejs-dropdownlist 
        [dataSource]="positions"
        [value]="'left'"
        (change)="onPositionChange($event)">
      </ejs-dropdownlist>
    </div>

    <ejs-tab #tabObj>
      <e-tabitems>
        <e-tabitem [header]="headerText[0]"></e-tabitem>
        <e-tabitem [header]="headerText[1]"></e-tabitem>
        <e-tabitem [header]="headerText[2]"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;

  public headerText: object[] = [
    { text: 'Twitter', iconCss: 'e-icons e-twitter' },
    { text: 'Facebook', iconCss: 'e-icons e-facebook' },
    { text: 'WhatsApp', iconCss: 'e-icons e-whatsapp' }
  ];

  public positions = ['left', 'right', 'top', 'bottom'];

  onPositionChange(args: ChangeEventArgs) {
    const position = args.value as string;
    
    // Update icon position for all headers
    const items = (this.tabObj as TabComponent).items;
    items?.forEach(item => {
      (item as any).header.iconPosition = position;
    });
    
    (this.tabObj as TabComponent).refresh();
  }
}
```

### Icon Positions

| Position | Description |
|----------|-------------|
| `left` | Icon appears to left of text (default) |
| `right` | Icon appears to right of text |
| `top` | Icon appears above text |
| `bottom` | Icon appears below text |

### Icon CSS Classes

Use Syncfusion icon library:

```typescript
public headerText: object[] = [
  { text: 'Dashboard', iconCss: 'e-icons e-home' },
  { text: 'Settings', iconCss: 'e-icons e-settings' },
  { text: 'Search', iconCss: 'e-icons e-search' },
  { text: 'File', iconCss: 'e-icons e-file' },
  { text: 'Cart', iconCss: 'e-icons e-shopping-cart' }
];
```

### Custom Icons

```typescript
// Using Font Awesome or custom icon fonts
public headerText: object[] = [
  { text: 'Home', iconCss: 'fas fa-home' },
  { text: 'User', iconCss: 'fas fa-user' },
  { text: 'Settings', iconCss: 'fas fa-cog' }
];
```

## Content Height Management

### Height Adjust Modes

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Auto-adjust height to content -->
    <ejs-tab heightAdjustMode="Auto" style="height: auto;">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Short' }" content="Brief content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Long' }" [content]="longContent"></e-tabitem>
      </e-tabitems>
    </ejs-tab>

    <!-- Fill available space -->
    <ejs-tab heightAdjustMode="Fill" style="height: 400px;">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>

    <!-- Content height only (header excluded) -->
    <ejs-tab heightAdjustMode="Content" style="height: 300px;">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public longContent = `
    This is a long content with multiple lines.
    Line 2: Lorem ipsum dolor sit amet.
    Line 3: Consectetur adipiscing elit.
    Line 4: Sed do eiusmod tempor incididunt.
    Line 5: Ut labore et dolore magna aliqua.
  `;
}
```

### Height Modes

| Mode | Behavior |
|------|----------|
| `Auto` | Height adjusts to content, no scrolling needed |
| `Fill` | Fills container height, content scrolls if needed |
| `Content` | Only content area gets height constraint |

## Scroll Configuration

### Scroll Step Size

Configure how much each scroll arrow moves:

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [TabModule, FormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <label>Scroll Step:
        <input type="number" [(ngModel)]="scrollStep" (change)="updateScrollStep()" 
               style="width: 60px;">
      </label>
    </div>

    <ejs-tab id="scrollTab">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 3' }" content="Content 3"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 4' }" content="Content 4"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 5' }" content="Content 5"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 6' }" content="Content 6"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 7' }" content="Content 7"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public scrollStep = 60;

  updateScrollStep() {
    const tabElement = document.getElementById('scrollTab') as any;
    if (tabElement && tabElement.ej2_instances) {
      tabElement.ej2_instances[0].scrollStep = this.scrollStep;
    }
  }
}
```

## Animations

### Enable/Disable Animations

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Animations disabled -->
    <ejs-tab [animation]="{ previous: { effect: 'None' }, next: { effect: 'None' } }">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'No Animation' }" content="Fast switching"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>

    <!-- Default animations -->
    <ejs-tab>
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Default Animation' }" content="Smooth transition"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent { }
```

### Custom Animations

```typescript
// Slide animation
<ejs-tab [animation]="{ previous: { effect: 'SlideLeftOut' }, next: { effect: 'SlideRightIn' } }">
  <!-- tabs -->
</ejs-tab>

// Fade animation
<ejs-tab [animation]="{ previous: { effect: 'FadeOut' }, next: { effect: 'FadeIn' } }">
  <!-- tabs -->
</ejs-tab>

// Custom timing
<ejs-tab [animation]="{ 
  previous: { effect: 'SlideLeftOut', duration: 500 }, 
  next: { effect: 'SlideRightIn', duration: 500 }
}">
  <!-- tabs -->
</ejs-tab>
```

## Advanced CSS Customization

### Complete Customization Example

```css
/* Main tab container */
.e-tab {
  border: 2px solid #2196F3;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Tab header area */
.e-tab .e-tab-header {
  background: linear-gradient(90deg, #2196F3 0%, #1976D2 100%);
  border-radius: 8px 8px 0 0;
  padding: 8px;
}

/* Header items */
.e-tab .e-tab-header .e-toolbar-item {
  margin: 0 4px;
}

/* Header text styling */
.e-tab .e-tab-wrap {
  color: white;
  font-weight: 500;
  padding: 12px 16px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* Hover effect */
.e-tab .e-tab-wrap:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Active tab */
.e-tab .e-tab-wrap.e-active {
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  border-bottom: 3px solid white;
}

/* Header icon */
.e-tab .e-tab-header .e-toolbar-item .e-tab-icon {
  margin-right: 8px;
  color: white;
}

/* Content area */
.e-tab .e-content {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 0 0 8px 8px;
  min-height: 200px;
}

/* Content item */
.e-tab .e-content .e-item {
  color: #333;
  font-size: 14px;
  line-height: 1.6;
}

/* Disabled state */
.e-tab .e-tab-wrap.e-disabled {
  color: #ccc;
  cursor: not-allowed;
  background: #f0f0f0;
}
```

### Dark Theme Customization

```css
/* Dark mode tabs */
.e-tab.dark-theme {
  background: #1e1e1e;
  border-color: #333;
}

.e-tab.dark-theme .e-tab-header {
  background: #2d2d2d;
}

.e-tab.dark-theme .e-tab-wrap {
  color: #e0e0e0;
}

.e-tab.dark-theme .e-tab-wrap:hover {
  background: #3d3d3d;
}

.e-tab.dark-theme .e-tab-wrap.e-active {
  background: #4d4d4d;
  border-bottom-color: #bb86fc;
}

.e-tab.dark-theme .e-content {
  background: #1e1e1e;
  color: #e0e0e0;
}
```

Use with:
```typescript
<ejs-tab cssClass="dark-theme">
  <!-- tabs -->
</ejs-tab>
```

### Responsive Header Styles

```css
/* Mobile - stack vertically */
@media (max-width: 600px) {
  .e-tab .e-tab-header {
    flex-direction: column;
  }

  .e-tab .e-tab-wrap {
    padding: 8px 12px;
    font-size: 12px;
  }

  .e-tab .e-tab-header .e-toolbar-item .e-tab-icon {
    margin-right: 4px;
  }
}

/* Tablet - adjust padding */
@media (max-width: 900px) {
  .e-tab .e-tab-wrap {
    padding: 10px 14px;
  }
}
```

## Performance Tips

- Use `heightAdjustMode="Content"` to prevent layout thrashing
- Minimize CSS calculations with simpler selectors
- Use CSS classes instead of inline styles
- Apply animations sparingly for better performance
- Use `effect: 'None'` for large data sets
