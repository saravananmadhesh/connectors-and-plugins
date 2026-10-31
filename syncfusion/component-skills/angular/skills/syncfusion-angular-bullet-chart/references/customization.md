# Customization and Styling in Syncfusion Angular Bullet Chart

## Table of Contents

- [Orientation](#orientation)
  - [Horizontal Orientation Default](#horizontal-orientation-default)
  - [Vertical Orientation](#vertical-orientation)
  - [When to Use Each Orientation](#when-to-use-each-orientation)
  - [Orientation Example](#orientation-example)
- [Right-to-Left RTL Support](#right-to-left-rtl-support)
  - [Enable RTL](#enable-rtl)
  - [When to Use RTL](#when-to-use-rtl)
  - [RTL Example](#rtl-example)
- [Animation](#animation)
  - [Basic Animation](#basic-animation)
  - [Animation Configuration](#animation-configuration)
  - [Animation Timing Examples](#animation-timing-examples)
  - [Animation Example](#animation-example)
- [Themes](#themes)
  - [Available Themes](#available-themes)
  - [Applying Themes](#applying-themes)
  - [Theme Examples](#theme-examples)
  - [Theme Selection Based on Context](#theme-selection-based-on-context)
- [Complete Customization Example](#complete-customization-example)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)


## Orientation

Change the layout of the Bullet Chart from horizontal to vertical:

### Horizontal Orientation (Default)

```typescript
// Default: value bars flow left-to-right
<ejs-bulletchart 
    orientation='Horizontal'>
</ejs-bulletchart>
```

### Vertical Orientation

```typescript
// Value bars flow top-to-bottom
<ejs-bulletchart 
    orientation='Vertical'>
</ejs-bulletchart>
```

### When to Use Each Orientation

| Orientation | Use Case |
|-------------|----------|
| **Horizontal** | Default, most readable, space-efficient width-wise |
| **Vertical** | Limited width, stacked layout, mobile displays |

### Orientation Example

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `
        <div>
            <h3>Horizontal</h3>
            <ejs-bulletchart 
                orientation='Horizontal'
                [dataSource]='data'
                valueField='value'
                targetField='target'>
            </ejs-bulletchart>
        </div>
        <div>
            <h3>Vertical</h3>
            <ejs-bulletchart 
                orientation='Vertical'
                [dataSource]='data'
                valueField='value'
                targetField='target'>
            </ejs-bulletchart>
        </div>
    `
})
export class AppComponent implements OnInit {
    public data: any;

    ngOnInit(): void {
        this.data = [
            { value: 100, target: 80 },
            { value: 200, target: 180 },
            { value: 300, target: 280 }
        ];
    }
}
```

---

## Right-to-Left (RTL) Support

Enable right-to-left rendering for Arabic, Hebrew, and other RTL languages:

### Enable RTL

```typescript
<ejs-bulletchart 
    [enableRtl]='true'>
</ejs-bulletchart>
```

### When to Use RTL

- Displaying content in Arabic, Hebrew, Persian, Urdu
- Supporting international/multi-language applications
- Following cultural localization requirements

### RTL Example

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `<ejs-bulletchart 
        [dataSource]='data'
        valueField='value'
        targetField='target'
        [enableRtl]='isRtlEnabled'
        title='مؤشر الأداء'
        subtitle='الفعلي مقابل الهدف'>
    </ejs-bulletchart>
    <button (click)="toggleRtl()">Toggle RTL</button>`,
    styles: [`
        :host { direction: rtl; }
    `]
})
export class AppComponent implements OnInit {
    public data: any;
    public isRtlEnabled: boolean = true;

    ngOnInit(): void {
        this.data = [
            { value: 100, target: 80 },
            { value: 200, target: 180 }
        ];
    }

    toggleRtl(): void {
        this.isRtlEnabled = !this.isRtlEnabled;
    }
}
```

---

## Animation

Animate the value and target bars when the chart first loads:

### Basic Animation

Enable default animation:

```typescript
<ejs-bulletchart 
    [animation]='{ enable: true }'>
</ejs-bulletchart>
```

### Animation Configuration

```typescript
public animationConfig = {
    enable: true,
    duration: 1000,      // Animation duration in milliseconds
    delay: 0             // Delay before animation starts (ms)
};

template = `<ejs-bulletchart 
    [animation]='animationConfig'>
</ejs-bulletchart>`
```

### Animation Timing Examples

```typescript
// Quick animation (500ms)
animation = {
    enable: true,
    duration: 500,
    delay: 0
}

// Slow, delayed animation (2 seconds)
animation = {
    enable: true,
    duration: 2000,
    delay: 500
}

// Fast with stagger effect
animation = {
    enable: true,
    duration: 800,
    delay: 100  // Small delay creates staggered effect with multiple bullets
}
```

### Animation Example

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `<ejs-bulletchart 
        [dataSource]='data'
        valueField='value'
        targetField='target'
        title='Performance Metrics'
        [animation]='animationConfig'>
    </ejs-bulletchart>`
})
export class AppComponent implements OnInit {
    public data: any;
    public animationConfig: any;

    ngOnInit(): void {
        this.data = [
            { value: 100, target: 80 },
            { value: 200, target: 180 },
            { value: 300, target: 280 }
        ];

        // Smooth 1.5 second animation with slight delay
        this.animationConfig = {
            enable: true,
            duration: 1500,
            delay: 200
        };
    }
}
```

---

## Themes

Apply pre-defined or custom themes to your Bullet Chart:

### Available Themes

The Bullet Chart supports multiple built-in themes:

```typescript
// Available themes:
// 'Material' (default)
// 'Fabric'
// 'Bootstrap'
// 'Bootstrap4'
// 'Tailwind'
// 'Highcontrast'
```

### Applying Themes

```typescript
<ejs-bulletchart 
    theme='Bootstrap'>
</ejs-bulletchart>
```

### Theme Examples

```typescript
// Modern Material Design
<ejs-bulletchart theme='Material'></ejs-bulletchart>

// Microsoft Fabric Design
<ejs-bulletchart theme='Fabric'></ejs-bulletchart>

// Bootstrap Classic
<ejs-bulletchart theme='Bootstrap'></ejs-bulletchart>

// Bootstrap 4
<ejs-bulletchart theme='Bootstrap4'></ejs-bulletchart>

// Tailwind CSS
<ejs-bulletchart theme='Tailwind'></ejs-bulletchart>

// High Contrast (Accessibility)
<ejs-bulletchart theme='Highcontrast'></ejs-bulletchart>
```

### Theme Selection Based on Context

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `
        <div>
            <select (change)="onThemeChange($event)">
                <option value="Material">Material</option>
                <option value="Fabric">Fabric</option>
                <option value="Bootstrap">Bootstrap</option>
                <option value="Tailwind">Tailwind</option>
                <option value="Highcontrast">High Contrast</option>
            </select>
        </div>
        <ejs-bulletchart 
            [dataSource]='data'
            [theme]='currentTheme'
            valueField='value'
            targetField='target'>
        </ejs-bulletchart>
    `
})
export class AppComponent implements OnInit {
    public data: any;
    public currentTheme: string = 'Material';

    ngOnInit(): void {
        this.data = [
            { value: 100, target: 80 },
            { value: 200, target: 180 }
        ];
    }

    onThemeChange(event: any): void {
        this.currentTheme = event.target.value;
    }
}
```

## Complete Customization Example

```typescript
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  BulletChartModule,
  BulletChartComponent,
} from '@syncfusion/ej2-angular-charts';
import { FormsModule } from '@angular/forms';
@Component({
  imports: [BulletChartModule, FormsModule],
  standalone: true,
  selector: 'app-container',
  template: `
        <div class='dashboard-container'>
            <div class='controls'>
                <label>
                    <input type="checkbox" 
                        [(ngModel)]='isRtl' 
                        (change)="updateChart()">
                    RTL Mode
                </label>
                <label>
                    <select [(ngModel)]='selectedOrientation' 
                        (change)="updateChart()">
                        <option value="Horizontal">Horizontal</option>
                        <option value="Vertical">Vertical</option>
                    </select>
                    Orientation
                </label>
                <label>
                    <select [(ngModel)]='selectedTheme' 
                        (change)="updateChart()">
                        <option value="Material">Material</option>
                        <option value="Bootstrap">Bootstrap</option>
                        <option value="Tailwind">Tailwind</option>
                    </select>
                    Theme
                </label>
            </div>   
            <ejs-bulletchart
    #bulletChart
    [dataSource]="chartData"
    valueField="value"
    targetField="target"
    categoryField="category"
    [orientation]="selectedOrientation"
    [enableRtl]="isRtl"
    [theme]="selectedTheme"
    [animation]="animationConfig"
    title="Performance Dashboard"
    [ranges]="ranges">
</ejs-bulletchart>

        </div>
    `,
    styles: [`
        .dashboard-container {
            padding: 20px;
            font-family: Arial, sans-serif;
        }
        .controls {
            margin-bottom: 20px;
            display: flex;
            gap: 20px;
        }
        .controls label {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .controls input,
        .controls select {
            padding: 5px 10px;
            border: 1px solid #cccccc;
            border-radius: 4px;
            font-size: 13px;
        }
    `],
	encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  @ViewChild('bulletChart')
  public bulletChart!: BulletChartComponent;

  public chartData: any;
  public ranges: any;
  public animationConfig: any;
  public isRtl: boolean = false;
  public selectedOrientation: string = 'Horizontal';
  public selectedTheme: string = 'Material';
  ngOnInit(): void {
    this.chartData = [
      { category: 'Sales', value: 75, target: 80 },
      { category: 'Marketing', value: 65, target: 75 },
      { category: 'Operations', value: 85, target: 80 },
    ];
    this.ranges = [
      { end: 50, color: '#ff6b6b' },
      { end: 80, color: '#ffd93d' },
      { end: 100, color: '#6bcf7f' },
    ];
    this.animationConfig = {
      enable: true,
      duration: 1000,
      delay: 200,
    };
  }
  updateChart(): void {
    console.log('Chart updated:', {
      rtl: this.isRtl,
      orientation: this.selectedOrientation,
      theme: this.selectedTheme,
    });

    requestAnimationFrame(() => {
      this.bulletChart?.refresh();
    });
  }
}
```

## Best Practices

1. **Choose orientation strategically** - Horizontal for most cases, Vertical for narrow spaces
2. **Test RTL thoroughly** - Ensure all text and labels render correctly
3. **Use animations sparingly** - Avoid overwhelming users with slow animations
4. **Theme for consistency** - Match your application's design system
5. **ID-Based Customization** - Avoid using general CSS classes for internal styling. Since the chart is an SVG, use the component's id to target specific elements (e.g., #myChart_FeatureMeasure_0) in your global styles.
6. **Test across browsers** - Ensure customizations work in target browsers
7. **Accessibility first** - Use High Contrast theme for accessibility needs

## Common Patterns

**Pattern 1: Responsive Layout**
```typescript
// Auto-switch orientation based on screen size
get selectedOrientation(): string {
    return window.innerWidth < 768 ? 'Vertical' : 'Horizontal';
}
```

**Pattern 2: Theme Persistence**
```typescript
// Save theme preference to localStorage
setTheme(theme: string): void {
    this.selectedTheme = theme;
    localStorage.setItem('bulletChartTheme', theme);
}

loadTheme(): void {
    this.selectedTheme = localStorage.getItem('bulletChartTheme') || 'Material';
}
```

**Pattern 3: Dynamic RTL Support**
```typescript
// Detect language and enable RTL
setLanguage(lang: string): void {
    this.isRtl = ['ar', 'he', 'ur'].includes(lang);
}
```
