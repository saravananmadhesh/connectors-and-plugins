# Axis Customization

## Table of Contents

- [Axis Overview](#axis-overview)
  - [Horizontal Axis](#horizontal-axis)
  - [Radial Axis](#radial-axis)
- [Axis Labels](#axis-labels)
  - [Label Positioning](#label-positioning)
  - [Label Intersection Handling](#label-intersection-handling)
  - [Label Styling](#label-styling)
- [Gridlines](#gridlines)
  - [Major Gridlines](#major-gridlines)
  - [Minor Gridlines](#minor-gridlines)
  - [Common Gridline Patterns](#common-gridline-patterns)
- [Axis Lines](#axis-lines)
- [Complete Axis Configuration](#complete-axis-configuration)
  - [Example: Professional Appearance](#example-professional-appearance)
  - [Example: Minimal Gridlines](#example-minimal-gridlines)
  - [Example: Dense Information Display](#example-dense-information-display)
- [Best Practices](#best-practices)
  - [For Circuit Analysis](#for-circuit-analysis)
  - [For Educational Displays](#for-educational-displays)
  - [For Print/Export](#for-printexport)
  - [For Web Display](#for-web-display)
- [Common Issues](#common-issues)


## Axis Overview

The Smith Chart has two types of axes:

### Horizontal Axis
- Drawn as a straight line horizontally
- Represents resistance values
- Labeled with numeric values
- Customizable labels, gridlines, styling

### Radial Axis
- Drawn as a circular path
- Represents reactance values
- Concentric circles from center
- Customizable labels, gridlines, styling

Both axes work together to create the characteristic grid pattern of the smith chart.

## Axis Labels

### Label Positioning

Control where labels appear relative to the axis line:

```typescript
@Component({
    imports: [ SmithchartModule ],
    selector: 'app-container',
    standalone: true,
    template: `
    <ejs-smithchart 
      [horizontalAxis]="horizontalAxis"
      [radialAxis]="radialAxis">
    </ejs-smithchart>
  `
})
export class AppComponent {
  horizontalAxis = {
    labelPosition: 'Outside'  // Outside (default) or Inside
  }
  
  radialAxis = {
    labelPosition: 'Inside'
  }
}
```

**Options:**
- `'Outside'` - Labels appear outside the axis line
- `'Inside'` - Labels appear inside the axis line

### Label Intersection Handling

Prevent label overlap by controlling intersection behavior:

```typescript
horizontalAxis = {
  labelIntersectAction: 'Hide'  // Hide labels that overlap
}
```

**Options:**
- `'Hide'` - Hide labels that would overlap (default)
- `'None'` - Show all labels (may overlap)

### Label Styling

Customize label appearance:

```typescript
horizontalAxis = {
  labelStyle: {
    color: '#333333',
    fontFamily: 'Arial',
    size: '12px',
    fontWeight: 'Bold',
    opacity: 0.8
  }
}

radialAxis = {
  labelStyle: {
    color: '#666666',
    fontFamily: 'Courier New',
    size: '11px'
  }
}
```

**Available properties:**
- `color` - Label text color (hex or named)
- `fontFamily` - Font name
- `fontSize` - Label size (px, em, etc.)
- `fontWeight` - Normal, Bold, Bolder
- `fontStyle` - font style for text
- `opacity` - Transparency (0-1)

## Gridlines

### Major Gridlines

Lines drawn from label positions:

```typescript
horizontalAxis = {
  majorGridLines: {
    visible: true,
    width: 1,
    dashArray: '0',    // '0' = solid, '5,5' = dashed
    opacity: 0.8,
    color: '#CCCCCC'
  }
}

radialAxis = {
  majorGridLines: {
    visible: true,
    width: 1,
    color: '#DDDDDD'
  }
}
```

**Properties:**
- `visible` - Show/hide gridlines (default: true)
- `width` - Line width in pixels (default: 1)
- `dashArray` - Line pattern (solid or dashed)
- `opacity` - Transparency 0-1 (default: 1)
- `color` - Line color

### Minor Gridlines

Secondary gridlines between major gridlines:

```typescript
radialAxis = {
  minorGridLines: {
    visible: true,
    count: 4,        // Minor lines between major lines
    width: 0.5,
    dashArray: '3,3', // Dashed line pattern
    opacity: 0.4,
    color: '#EEEEEE'
  }
}

horizontalAxis = {
  minorGridLines: {
    visible: false   // Optional for horizontal
  }
}
```

**Properties:**
- `visible` - Enable minor gridlines
- `count` - Number of minor lines between major lines (default: 1)
- `width` - Line width in pixels
- `dashArray` - Line pattern
- `opacity` - Transparency
- `color` - Line color

### Common Gridline Patterns

**Solid Lines:**
```typescript
{ dashArray: '0' }
```

**Dashed Lines (Medium):**
```typescript
{ dashArray: '5,5' }
```

**Dashed Lines (Small):**
```typescript
{ dashArray: '3,3' }
```

**Dotted Lines:**
```typescript
{ dashArray: '1,3' }
```

## Axis Lines

Customize the axis line itself:

```typescript
horizontalAxis = {
  axisLine: {
    visible: true,
    width: 1,
    dashArray: '0',
    color: '#000000'
  }
}

radialAxis = {
  axisLine: {
    visible: true,
    width: 2,
    color: '#333333'
  }
}
```

**Properties:**
- `visible` - Show/hide the axis line
- `width` - Line width in pixels
- `dashArray` - Line pattern (solid or dashed)
- `color` - Line color

## Complete Axis Configuration

### Example: Professional Appearance

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { SmithchartModule } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SmithchartModule],
  encapsulation: ViewEncapsulation.None,
  template: `
     <ejs-smithchart 
      [horizontalAxis]="horizontalAxis"
      [radialAxis]="radialAxis">
    </ejs-smithchart>
  `
})
export class AppComponent {
  horizontalAxis = {
    labelPosition: 'Outside',
    labelIntersectAction: 'Hide',
    labelStyle: {
      color: '#333333',
      size: '12px'
    },
    majorGridLines: {
      visible: true,
      width: 1.5,
      color: '#CCCCCC'
    },
    minorGridLines: {
      visible: false
    },
    axisLine: {
      visible: true,
      width: 2
    }
  }

  radialAxis = {
    labelPosition: 'Outside',
    labelIntersectAction: 'Hide',
    labelStyle: {
      color: '#333333',
      size: '11px'
    },
    majorGridLines: {
      visible: true,
      width: 1,
      color: '#DDDDDD'
    },
    minorGridLines: {
      visible: true,
      count: 5,
      width: 0.5,
      opacity: 0.5
    },
    axisLine: {
      visible: true,
      width: 1
    }
  }
}
```

### Example: Minimal Gridlines

```typescript
export class AppComponent {
  horizontalAxis = {
    majorGridLines: {
      visible: true,
      width: 0.5,
      opacity: 0.4
    },
    minorGridLines: { visible: false }
  }

  radialAxis = {
    majorGridLines: {
      visible: true,
      width: 0.5
    },
    minorGridLines: { visible: false }
  }
}
```

### Example: Dense Information Display

```typescript
export class AppComponent {
  horizontalAxis = {
    majorGridLines: { visible: true, width: 1 },
    minorGridLines: {
      visible: true,
      count: 4
    }
  }

  radialAxis = {
    majorGridLines: { visible: true, width: 1 },
    minorGridLines: {
      visible: true,
      count: 4
    }
  }
}
```

## Best Practices

### For Circuit Analysis
- Use major gridlines only for clarity
- Position labels outside for readability

### For Educational Displays
- Show both major and minor gridlines
- Enable smart labels to prevent overlap
- Use higher opacity for visual hierarchy

### For Print/Export
- Increase line widths (especially axis line)
- Use solid gridlines (avoid subtle dashing)
- Ensure sufficient contrast

### For Web Display
- Use semi-transparent gridlines (opacity: 0.5-0.8)
- Show minor gridlines sparingly
- Consider responsive label sizing

## Common Issues

**Issue:** Labels too dense or overlapping
- **Solution:** Set `labelIntersectAction: 'Hide'`

**Issue:** Gridlines too faint
- **Solution:** Increase `width` property
- **Solution:** Increase `opacity` property

**Issue:** Gridlines too prominent
- **Solution:** Decrease `opacity`
- **Solution:** Use `dashArray` for dashed appearance

