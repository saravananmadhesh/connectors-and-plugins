# Accessibility in Syncfusion Angular Maps

## Table of Contents
- [Overview](#overview)
- [WCAG Compliance](#wcag-compliance)
- [Screen Reader Support](#screen-reader-support)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Attributes](#aria-attributes)
- [Color Contrast](#color-contrast)
- [Testing Accessibility](#testing-accessibility)
- [Best Practices](#best-practices)
- [Common Issues](#common-issues)
- [Next Steps](#next-steps)

## Overview

The Syncfusion Angular Maps component is designed to be fully accessible to users with disabilities through assistive technologies such as screen readers and keyboard navigation. It complies with:

- **WCAG 2.2** (Web Content Accessibility Guidelines)
- **Section 508** (U.S. Federal accessibility standards)
- **ADA** (Americans with Disabilities Act)
- **WAI-ARIA** patterns for accessible web applications

Key accessibility features include keyboard navigation for all interactive elements, ARIA attributes for screen reader compatibility, high contrast theme support, and mobile device accessibility.

## WCAG Compliance

The Maps component meets WCAG 2.2 Level AA requirements:

| Accessibility Criteria | Support Level |
|------------------------|---------------|
| WCAG 2.2 Support | ✓ Full Support |
| Section 508 Support | ✓ Full Support |
| Screen Reader Support | ✓ Full Support |
| Keyboard Navigation | ✓ Full Support |
| Color Contrast | ✓ Full Support |
| Mobile Device Support | ✓ Full Support |

**Basic accessible map implementation:**

```typescript
import { Component, OnInit } from '@angular/core';
import { MapsModule } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-accessible-map',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps 
      id="accessible-maps"
      [titleSettings]="titleSettings"
      [layers]="layers">
    </ejs-maps>
  `
})
export class AccessibleMapComponent implements OnInit {
  public layers: object[] = [];
  public titleSettings: object = {
    text: 'World Population Density',
    textStyle: { size: '16px' }
  };

  ngOnInit(): void {
    this.layers = [{
      shapeData: worldMap,
      shapeSettings: {
        colorValuePath: 'density',
        fill: '#E5E5E5'
      }
    }];
  }
}
```

## Screen Reader Support

The Maps component provides screen reader support for all key elements. Screen readers will announce the following content:

| Element | What Gets Read |
|---------|----------------|
| Shapes (countries/regions) | Geographic shape names |
| Title | Main title content |
| Subtitle | Secondary title content |
| Legend title | Legend heading |
| Legend items | Individual legend labels |
| Data labels | Shape-specific labels |
| Markers | Marker template content |
| Annotations | Annotation content |
| Tooltips | Tooltip template content |

**Configuring accessible labels for shapes:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-screen-reader-map',
  standalone: true,
  imports: [MapsModule],
  template: `
    <ejs-maps [layers]="layers"></ejs-maps>
  `
})
export class ScreenReaderMapComponent {
  public layers: object[] = [{
    shapeData: worldMap,
    dataSource: [
      { country: 'United States', population: '331 million', 
        accessibility: 'United States has a population of 331 million' },
      { country: 'China', population: '1.4 billion',
        accessibility: 'China has a population of 1.4 billion' },
      { country: 'India', population: '1.38 billion',
        accessibility: 'India has a population of 1.38 billion' }
    ],
    shapePropertyPath: 'name',
    shapeDataPath: 'country',
    shapeSettings: {
      colorValuePath: 'population',
      // aria-label will use the accessibility property
      autofill: true
    }
  }];
}
```

**Accessible marker templates:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-accessible-markers',
  providers: [MarkerService],
  template: `
    <ejs-maps [layers]="layers">
      <e-layers>
        <e-layer [markerSettings]="markerSettings"></e-layer>
      </e-layers>
    </ejs-maps>
  `
})
export class AccessibleMarkersComponent {
  public markerSettings: object[] = [{
    visible: true,
    dataSource: [
      { latitude: 40.7128, longitude: -74.0060, city: 'New York' },
      { latitude: 51.5074, longitude: -0.1278, city: 'London' }
    ],
    // Screen readers will announce this template content
    template: '<div aria-label="City marker: {{:city}}">📍 {{:city}}</div>'
  }];
}
```

## Keyboard Navigation

All interactive map features are accessible via keyboard, ensuring users who cannot use a mouse can fully navigate and interact with the component.

### Supported Keyboard Shortcuts

| Key Combination | Action |
|----------------|--------|
| `Tab` | Move to next focusable element (legend, shape) |
| `Shift + Tab` | Move to previous focusable element |
| `+ (Plus)` | Zoom in (when zooming enabled) |
| `- (Minus)` | Zoom out (when zooming enabled) |
| `R` | Reset zoom to initial state |
| `Arrow Left` | Pan map left (when zoomed) |
| `Arrow Right` | Pan map right (when zoomed) |
| `Arrow Up` | Pan map up (when zoomed) |
| `Arrow Down` | Pan map down (when zoomed) |
| `Enter` | Navigate legend pages or select shape |

**Enabling keyboard navigation with zoom:**

```typescript
import { Component } from '@angular/core';
import { ZoomService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-keyboard-map',
  providers: [ZoomService],
  template: `
    <ejs-maps 
      [zoomSettings]="zoomSettings"
      [layers]="layers">
    </ejs-maps>
  `
})
export class KeyboardMapComponent {
  public zoomSettings: object = {
    enable: true,
    enableSelectionZooming: false,
    toolbars: ['Zoom', 'ZoomIn', 'ZoomOut', 'Pan', 'Reset']
  };

  public layers: object[] = [{
    shapeData: worldMap,
    shapeSettings: {
      fill: '#E5E5E5'
    }
  }];
}
```

**Handling custom keyboard events:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { MapsComponent } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-custom-keyboard',
  template: `
    <div (keydown)="onKeyDown($event)" tabindex="0">
      <ejs-maps #maps [layers]="layers"></ejs-maps>
    </div>
  `
})
export class CustomKeyboardComponent {
  @ViewChild('maps') public maps!: MapsComponent;
  public layers: object[] = [{ shapeData: worldMap }];

  public onKeyDown(event: KeyboardEvent): void {
    switch(event.key) {
      case 'h':
      case 'H':
        // Custom: Go to home/default view
        this.maps.zoomSettings.zoomFactor = 1;
        this.maps.refresh();
        break;
      case 'f':
      case 'F':
        // Custom: Toggle fullscreen
        this.toggleFullscreen();
        break;
    }
  }

  private toggleFullscreen(): void {
    const element = document.getElementById('maps')!;
    if (!document.fullscreenElement) {
      element.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }
}
```

## ARIA Attributes

The Maps component uses WAI-ARIA attributes to enhance screen reader compatibility and provide semantic information about interactive elements.

### ARIA Roles Used

| ARIA Role | Applied To | Purpose |
|-----------|------------|---------|
| `role="region"` | Non-interactive shapes | Indicates informational map area |
| `role="button"` | Interactive shapes | Indicates selectable/highlightable shapes |
| `aria-label` | All elements | Provides accessible name for element |

**Configuring ARIA labels for legend:**

```typescript
import { Component } from '@angular/core';
import { LegendService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-aria-legend',
  providers: [LegendService],
  template: `
    <ejs-maps [legendSettings]="legendSettings" [layers]="layers"></ejs-maps>
  `
})
export class AriaLegendComponent {
  public legendSettings: object = {
    visible: true,
    title: {
      text: 'Population Density Legend',
      // Screen readers will announce this
      textStyle: { size: '14px' }
    }
  };

  public layers: object[] = [{
    shapeData: worldMap,
    dataSource: populationData,
    shapeSettings: {
      colorMapping: [
        { from: 0, to: 100, color: '#90EE90', label: 'Low density (0-100)' },
        { from: 100, to: 500, color: '#FFA500', label: 'Medium density (100-500)' },
        { from: 500, to: 1000, color: '#FF4500', label: 'High density (500+)' }
      ]
    }
  }];
}
```

**Custom ARIA attributes for tooltips:**

```typescript
import { Component } from '@angular/core';
import { MapsTooltipService } from '@syncfusion/ej2-angular-maps';

@Component({
  selector: 'app-aria-tooltip',
  providers: [MapsTooltipService],
  template: `
    <ejs-maps [layers]="layers"></ejs-maps>
  `
})
export class AriaTooltipComponent {
  public layers: object[] = [{
    shapeData: worldMap,
    tooltipSettings: {
      visible: true,
      valuePath: 'name',
      // Template with ARIA attributes
      template: '<div role="tooltip" aria-live="polite">' +
                '<strong>${name}</strong><br/>' +
                'Population: ${population}' +
                '</div>'
    }
  }];
}
```

## Color Contrast

The Maps component supports high contrast themes to meet WCAG AA standards (minimum contrast ratio of 4.5:1 for normal text).

**Using high contrast theme:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-high-contrast-map',
  template: `
    <ejs-maps [layers]="layers" cssClass="e-highcontrast"></ejs-maps>
  `,
  styles: [`
    /* Apply high contrast theme */
    ::ng-deep .e-highcontrast .e-maps-shape {
      stroke: #FFFFFF;
      stroke-width: 2px;
    }
  `]
})
export class HighContrastMapComponent {
  public layers: object[] = [{
    shapeData: worldMap,
    shapeSettings: {
      fill: '#000000',
      border: { color: '#FFFFFF', width: 2 }
    }
  }];
}
```

**Ensuring sufficient color contrast:**

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-contrast-map',
  template: `<ejs-maps [layers]="layers"></ejs-maps>`
})
export class ContrastMapComponent {
  public layers: object[] = [{
    shapeData: worldMap,
    shapeSettings: {
      colorMapping: [
        // WCAG AA compliant colors
        { from: 0, to: 50, color: '#004085' },      // Dark blue
        { from: 50, to: 100, color: '#0056b3' },    // Medium blue
        { from: 100, to: 150, color: '#CC5500' },   // Orange
        { from: 150, to: 200, color: '#8B0000' }    // Dark red
      ]
    }
  }];
}
```

## Testing Accessibility

Validate your Maps implementation using automated accessibility testing tools.

### Using accessibility-checker

```bash
# Install accessibility testing tools
npm install --save-dev accessibility-checker axe-core
```

**Jest test with accessibility validation:**

```typescript
import { TestBed } from '@angular/core/testing';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import { AccessibleMapComponent } from './accessible-map.component';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessible Maps Component', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MapsModule, AccessibleMapComponent]
    });
  });

  it('should have no accessibility violations', async () => {
    const fixture = TestBed.createComponent(AccessibleMapComponent);
    fixture.detectChanges();
    
    const results = await axe(fixture.nativeElement);
    expect(results).toHaveNoViolations();
  });

  it('should have proper ARIA labels', () => {
    const fixture = TestBed.createComponent(AccessibleMapComponent);
    fixture.detectChanges();
    
    const mapElement = fixture.nativeElement.querySelector('.e-maps');
    expect(mapElement.getAttribute('role')).toBeTruthy();
  });
});
```

**Manual accessibility testing checklist:**

- ✓ Navigate entire map using only keyboard
- ✓ Verify screen reader announces all elements
- ✓ Test with high contrast mode enabled
- ✓ Validate color contrast ratios (use browser dev tools)
- ✓ Test on mobile devices with accessibility features
- ✓ Verify focus indicators are visible
- ✓ Test with browser zoom at 200%

## Best Practices

1. **Always provide meaningful titles and labels:**
   - Set descriptive title text for the map
   - Add legend titles explaining color coding
   - Use clear data label text

2. **Ensure interactive elements are keyboard accessible:**
   - Enable zoom and pan controls
   - Make shapes selectable if interactive
   - Provide keyboard shortcuts for common actions

3. **Use sufficient color contrast:**
   - Choose colors meeting WCAG AA standards (4.5:1 minimum)
   - Don't rely solely on color to convey information
   - Provide alternative text labels

4. **Test with assistive technologies:**
   - Use screen readers (NVDA, JAWS, Narrator)
   - Test keyboard navigation thoroughly
   - Validate with automated tools (axe, WAVE)

5. **Provide alternative text for visual information:**
   - Add ARIA labels to markers and tooltips
   - Include descriptive text in legends
   - Consider providing data table alternatives for complex visualizations

## Common Issues

### Issue: Screen reader not announcing map elements

**Solution:** Ensure the Maps module is properly imported and aria-label attributes are configured:

```typescript
public layers: object[] = [{
  shapeData: worldMap,
  shapeSettings: {
    autofill: true,
    colorValuePath: 'value'
  },
  // Add data with descriptive properties for screen readers
  dataSource: countryData
}];
```

### Issue: Keyboard navigation not working

**Solution:** Ensure the map container is focusable and zoom is enabled:

```html
<div tabindex="0">
  <ejs-maps [zoomSettings]="{ enable: true }" [layers]="layers"></ejs-maps>
</div>
```

### Issue: Low color contrast in custom themes

**Solution:** Use a color contrast checker and adjust colors:

```typescript
// Use WCAG AA compliant colors
shapeSettings: {
  colorMapping: [
    { from: 0, to: 100, color: '#003366' },  // 7:1 contrast ratio
    { from: 100, to: 200, color: '#8B4513' } // 5.5:1 contrast ratio
  ]
}
```

## Next Steps

- **[User Interactions](./user-interactions.md)** - Learn about zoom, pan, and selection features
- **[Customization](./customization.md)** - Explore theme customization including high contrast themes
- **[Data Visualization](./data-visualization.md)** - Add accessible legends, labels, and tooltips
- **[Getting Started](./getting-started.md)** - Return to basic setup instructions

---

## API Reference Summary

### Accessibility APIs

| API | Description | Documentation Link |
|-----|-------------|-------------------|
| `enablePersistence` | Persist component state | [enablePersistence](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#enablepersistence) |
| `enableRtl` | Right-to-left rendering | [enableRtl](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#enablertl) |
| `locale` | Localization culture | [locale](https://ej2.syncfusion.com/angular/documentation/api/maps/mapsComponent#locale) |

**For complete API documentation, see:** [api-reference.md](references/api-reference.md)