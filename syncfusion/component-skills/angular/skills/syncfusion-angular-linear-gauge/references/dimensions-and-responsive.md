# Dimensions and Responsive Design

Configure gauge sizing for different screen sizes and container layouts. Ensure the Linear Gauge scales appropriately across devices while maintaining visual quality.

## Table of Contents

- [Container Sizing](#container-sizing)
  - [Fixed Dimensions](#fixed-dimensions)
- [Responsive Design](#responsive-design)
  - [Viewport-Based Sizing](#viewport-based-sizing)
  - [CSS Media Queries](#css-media-queries)
- [Dimension Properties](#dimension-properties)
  - [Gauge Dimension Control](#gauge-dimension-control)
  - [Element Sizing](#element-sizing)
- [Mobile Optimization](#mobile-optimization)
  - [Mobile-First Approach](#mobile-first-approach)
  - [Touch-Friendly Sizing](#touch-friendly-sizing)
- [Multi-Gauge Layouts](#multi-gauge-layouts)
  - [Stacked Gauges (Vertical)](#stacked-gauges-vertical)
  - [Side-by-Side Gauges (Horizontal)](#side-by-side-gauges-horizontal)
- [Practical Examples](#practical-examples)
  - [Dashboard with Responsive Gauges](#dashboard-with-responsive-gauges)
  - [Fullscreen Gauge](#fullscreen-gauge)
  - [Vertical Linear Gauge](#vertical-linear-gauge)


## Container Sizing

### Fixed Dimensions

Set explicit width and height:

```typescript
<ejs-lineargauge [container]="containerConfig">
  ...
</ejs-lineargauge>

containerConfig = {
  width: '500', // type -> number
  height: '150', // type -> number
  type: 'Normal'
};
```

## Responsive Design

### Viewport-Based Sizing

Adjust gauge size based on screen width:

```typescript
export class ResponsiveGaugeComponent implements OnInit, OnDestroy {
  containerConfig: any = {};
  private resizeListener: any;

  ngOnInit(): void {
    this.updateSizeOnResize();
    this.resizeListener = window.addEventListener('resize', () => {
      this.updateSizeOnResize();
    });
  }

  ngOnDestroy(): void {
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  updateSizeOnResize(): void {
    const width = window.innerWidth;
    
    if (width < 480) {
      // Mobile
      this.containerConfig = { width: '100', height: '120' };
    } else if (width < 768) {
      // Tablet
      this.containerConfig = { width: '100', height: '150' };
    } else {
      // Desktop
      this.containerConfig = { width: '100', height: '200' };
    }
  }
}
```

### CSS Media Queries

```css
@media (max-width: 480px) {
  ::ng-deep .e-gauge {
    height: 120px !important;
  }
}

@media (max-width: 768px) {
  ::ng-deep .e-gauge {
    height: 150px !important;
  }
}

@media (min-width: 769px) {
  ::ng-deep .e-gauge {
    height: 200px !important;
  }
}
```

## Dimension Properties

### Gauge Dimension Control

```typescript
export class GaugeDimensionComponent {
  // Width options
  gaugeWidth: number = 500;
  widthUnit: 'px' | '%' = 'px';

  // Height options
  gaugeHeight: number = 150;
  heightUnit: 'px' = 'px';

  get containerConfig(): any {
    return {
      width: `${this.gaugeWidth}${this.widthUnit}`,
      height: `${this.gaugeHeight}${this.heightUnit}`
    };
  }

  updateDimensions(width: number, height: number): void {
    this.gaugeWidth = width;
    this.gaugeHeight = height;
  }
}
```

### Element Sizing

```typescript
export class ElementSizingComponent {
  labelSize: number = 12;
  tickSize: number = 8;
  pointerWidth: number = 15;
  rangeWidth: number = 15;

  getLabelStyle(): any {
    return {
      font: { size: `${this.labelSize}px` }
    };
  }

  getMajorTickStyle(): any {
    return { height: this.tickSize };
  }
}
```

## Mobile Optimization

### Mobile-First Approach

```typescript
export class MobileOptimizedComponent {
  containerConfig: any;

  ngOnInit(): void {
    this.containerConfig = this.getMobileConfig();
    
    // Enhance for larger screens
    if (window.innerWidth > 768) {
      this.containerConfig = this.getDesktopConfig();
    }
  }

  getMobileConfig(): any {
    return {
      width: '100%',
      height: '120px',
      border: { width: 0 },
      backgroundColor: 'transparent'
    };
  }

  getDesktopConfig(): any {
    return {
      width: '100%',
      height: '180px',
      border: { color: '#ddd', width: 1 },
      backgroundColor: '#f5f5f5'
    };
  }

  getLabelsForMobile(): any {
    return {
      font: { size: '10px' }
    };
  }

  getLabelsForDesktop(): any {
    return {
      font: { size: '14px' }
    };
  }
}
```

### Touch-Friendly Sizing

```typescript
export class TouchFriendlyComponent {
  // Increase pointer width for easier touch interaction
  pointerWidth: number = this.isMobile() ? 30 : 15;

  isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  getPointerConfig(): any {
    return {
      width: this.pointerWidth,
      type: 'Bar'
    };
  }
}
```

## Multi-Gauge Layouts

### Stacked Gauges (Vertical)

```typescript
<div class="gauge-stack">
  <div class="gauge-item">
    <h3>CPU Usage</h3>
    <ejs-lineargauge [container]="{ width: '100', height: '100' }">
      ...
    </ejs-lineargauge>
  </div>
  
  <div class="gauge-item">
    <h3>Memory Usage</h3>
    <ejs-lineargauge [container]="{ width: '100', height: '100' }">
      ...
    </ejs-lineargauge>
  </div>
</div>

<style>
  .gauge-stack {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .gauge-item {
    flex: 1;
  }
</style>
```

### Side-by-Side Gauges (Horizontal)

```typescript
<div class="gauge-grid">
  <div class="gauge-item">
    <ejs-lineargauge [container]="{ width: '100', height: '150' }">
      ...
    </ejs-lineargauge>
  </div>
  
  <div class="gauge-item">
    <ejs-lineargauge [container]="{ width: '100', height: '150' }">
      ...
    </ejs-lineargauge>
  </div>
</div>

<style>
  .gauge-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
  }

  @media (max-width: 768px) {
    .gauge-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

## Practical Examples

### Dashboard with Responsive Gauges

```typescript
export class DashboardComponent {
  containerConfigs: any[] = [];

  ngOnInit(): void {
    this.updateLayout();
    window.addEventListener('resize', () => this.updateLayout());
  }

  updateLayout(): void {
    const width = window.innerWidth;
    
    if (width < 576) {
      // Mobile: Single column
      this.containerConfigs = [
        { width: '100%', height: '100px' }
      ];
    } else if (width < 992) {
      // Tablet: 2 columns
      this.containerConfigs = [
        { width: '100%', height: '120px' },
        { width: '100%', height: '120px' }
      ];
    } else {
      // Desktop: 3 columns
      this.containerConfigs = [
        { width: '100%', height: '150px' },
        { width: '100%', height: '150px' },
        { width: '100%', height: '150px' }
      ];
    }
  }
}
```

### Fullscreen Gauge

```typescript
export class FullscreenGaugeComponent {
  @ViewChild('gaugeContainer') container: ElementRef;
  isFullscreen: boolean = false;

  toggleFullscreen(): void {
    if (!this.isFullscreen) {
      this.container.nativeElement.requestFullscreen();
      this.isFullscreen = true;
    } else {
      document.exitFullscreen();
      this.isFullscreen = false;
    }
  }

  getFullscreenContainer(): any {
    return {
      width: '100%',
      height: '100%'
    };
  }
}
```

### Vertical Linear Gauge

```typescript
<ejs-lineargauge [orientation]="'Vertical'" 
                 [container]="{ width: '100', height: '300' }">
  ...
</ejs-lineargauge>
```

Vertical gauges are ideal for monitoring values that increase from bottom to top (temperature, altitude, etc.).
