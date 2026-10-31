# Customization in Angular Progress Bar

## Table of Contents

- [Sizing and Dimensions](#sizing-and-dimensions)
  - [Linear Progress Bar Width and Height](#linear-progress-bar-width-and-height)
  - [Percentage-Based Sizing](#percentage-based-sizing)
- [Color Configuration](#color-configuration)
  - [Progress and Track Colors](#progress-and-track-colors)
  - [Secondary Progress Color](#secondary-progress-color)
  - [Conditional Color Based on Progress](#conditional-color-based-on-progress)
- [Min, Max, and Value](#min-max-and-value)
  - [Custom Range Configuration](#custom-range-configuration)
  - [File Size Progress](#file-size-progress)
- [Radius Properties](#radius-properties)
  - [Circular Progress with Custom Radius](#circular-progress-with-custom-radius)
  - [InnerRadius for Donut Effect](#innerradius-for-donut-effect)
  - [Corner Radius Styling](#corner-radius-styling)
- [Segments](#segments)
  - [Linear Progress with Segments](#linear-progress-with-segments)
  - [Circular Progress with Segments](#circular-progress-with-segments)
  - [Segment Spacing](#segment-spacing)
- [Thickness Control](#thickness-control)
  - [Track and Progress Thickness](#track-and-progress-thickness)
  - [Secondary Progress Thickness](#secondary-progress-thickness)

## Sizing and Dimensions

### Linear Progress Bar Width and Height

```typescript
import { Component } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';

@Component({
  selector: 'app-sizing',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="50"
      type="Linear"
      [width]="100%"
      height="3">
    </ejs-progressbar>
  `
})
export class SizingComponent {
}
```

### Percentage-Based Sizing

```html
<div style="width: 100%; margin: 20px 0;">
  <ejs-progressbar 
    [value]="75"
    type="Linear"
    height="25">
  </ejs-progressbar>
</div>
```

The width is determined by the parent container.

## Color Configuration

### Progress and Track Colors

Customize the colors of the progress bar and track:

```typescript
@Component({
  selector: 'app-colors',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <!-- Default colors -->
      <div style="margin: 15px 0;">
        <label>Default Blue Progress</label>
        <ejs-progressbar
          id="default-blue" 
          [value]="60"
          type="Linear"
          height="20">
        </ejs-progressbar>
      </div>

      <!-- Custom colors -->
      <div style="margin: 15px 0;">
        <label>Custom Green Progress</label>
        <ejs-progressbar
          id="custom-green" 
          [value]="60"
          type="Linear"
          height="20"
          progressColor="#4CAF50"
          trackColor="#E8F5E9">
        </ejs-progressbar>
      </div>

      <!-- Warning colors -->
      <div style="margin: 15px 0;">
        <label>Warning Orange Progress</label>
        <ejs-progressbar
          id="warning-color" 
          [value]="60"
          type="Linear"
          height="20"
          progressColor="#FF9800"
          trackColor="#FFE8D6">
        </ejs-progressbar>
      </div>

      <!-- Danger colors -->
      <div style="margin: 15px 0;">
        <label>Danger Red Progress</label>
        <ejs-progressbar
          id="danger-red" 
          [value]="60"
          type="Linear"
          height="20"
          progressColor="#F44336"
          trackColor="#FFEBEE">
        </ejs-progressbar>
      </div>
    </div>

    <!-- Secondary Progress Color -->
    <div style="margin: 15px 0;">
      <label>Secondary Progress Color</label>
        <ejs-progressbar
          id="default-ble"
          trackThickness=24  progressThickness=24
          secondaryProgress=60
          secondaryProgressColor='green' 
          progressColor='#E3165B' 
          trackColor='#F8C7D8' 
          [value]="50"
          type="Linear"
          height="20">
        </ejs-progressbar>
    </div>
  `
})
export class ColorsComponent {
}
```

### Secondary Progress Color

Customize colors for secondary progress separately:

```typescript
@Component({
  selector: 'app-secondary-color',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <!-- Video Buffering Example -->
      <div style="margin: 15px 0;">
        <label>Video Playback Buffering</label>
        <ejs-progressbar
          id="video-buffer"
          [value]="35"
          [secondaryProgress]="65"
          type="Linear"
          height="20"
          progressColor="#FF6B6B"
          secondaryProgressColor="#FFD93D"
          trackColor="#E0E0E0">
        </ejs-progressbar>
      </div>

      <!-- Download with Verification -->
      <div style="margin: 15px 0;">
        <label>Download & Verification</label>
        <ejs-progressbar
          id="download"
          [value]="50"
          [secondaryProgress]="80"
          type="Linear"
          height="25"
          progressColor="#4CAF50"
          secondaryProgressColor="#81C784"
          trackColor="#E8F5E9">
        </ejs-progressbar>
      </div>
    </div>
  `
})
export class SecondaryColorComponent {
}
```

  getProgressColor(): string {
    if (this.progress < 33) return '#F44336'; // Red
    if (this.progress < 66) return '#FF9800'; // Orange
    return '#4CAF50'; // Green
  }

  getTrackColor(): string {
    if (this.progress < 33) return '#FFEBEE';
    if (this.progress < 66) return '#FFE8D6';
    return '#E8F5E9';
  }
}
```

## Min, Max, and Value

### Custom Range Configuration

```typescript
@Component({
  selector: 'app-custom-range',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <!-- Progress from 0 to 100 (default) -->
    <div style="margin: 15px 0;">
      <label>Standard Range (0-100)</label>
      <ejs-progressbar
        id="standard-range" 
        [minimum]="0"
        [maximum]="100"
        [value]="50"
        type="Linear"
        height="20">
      </ejs-progressbar>
    </div>

    <!-- Custom range 0-1000 -->
    <div style="margin: 15px 0;">
      <label>Custom Range (0-1000)</label>
      <ejs-progressbar
        id="custom-range" 
        [minimum]="0"
        [maximum]="1000"
        [value]="500"
        type="Linear"
        height="20">
      </ejs-progressbar>
    </div>

    <!-- Negative to positive range -->
    <div style="margin: 15px 0;">
      <label>Negative Range (-50 to 50)</label>
      <ejs-progressbar 
        id="negative-range"
        [minimum]="-50"
        [maximum]="50"
        [value]="0"
        type="Linear"
        height="20">
      </ejs-progressbar>
    </div>
  `
})
export class CustomRangeComponent {
}
```

### File Size Progress

```typescript
@Component({
  selector: 'app-file-size-progress',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <h4>Upload Progress (in MB)</h4>
      <ejs-progressbar 
        [minimum]="0"
        [maximum]="totalSize"
        [value]="uploadedSize"
        type="Linear"
        height="25">
      </ejs-progressbar>
      <p>{{ uploadedSize }} MB / {{ totalSize }} MB</p>
    </div>
  `
})
export class FileSizeProgressComponent {
  uploadedSize = 350;
  totalSize = 1000;
}
```

## Radius Properties

### Circular Progress with Custom Radius

```typescript
@Component({
  selector: 'app-radius-demo',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="display: flex; gap: 30px; margin: 20px; flex-wrap: wrap;">
      
      <!-- Small radius -->
      <div>
        <label>Small Radius (radius: 50)</label>
        <ejs-progressbar
          id="small-radius" 
          [value]="60"
          type="Circular"
          radius="50%">
        </ejs-progressbar>
      </div>

      <!-- Medium radius -->
      <div>
        <label>Medium Radius (radius: 100)</label>
        <ejs-progressbar
          id="medium-radius" 
          [value]="60"
          type="Circular"
          radius="100%">
        </ejs-progressbar>
      </div>

      <!-- Large radius -->
      <div>
        <label>Large Radius (radius: 150)</label>
        <ejs-progressbar
          id="large-radius" 
          [value]="60"
          type="Circular"
          radius="150%"
          cornerRadius='Round'>
        </ejs-progressbar>
      </div>

    </div>
  `
})
export class RadiusDemoComponent {
}
```

### InnerRadius for Donut Effect

```typescript
@Component({
  selector: 'app-donut-effect',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="display: flex; gap: 30px; margin: 20px; flex-wrap: wrap;">
      
      <!-- Thin ring -->
      <div>
        <label>Thin Ring</label>
        <ejs-progressbar
          id="thinRing" 
          [value]="70"
          type="Circular"
          radius="120%"
          innerRadius="100%">
        </ejs-progressbar>
      </div>

      <!-- Medium ring -->
      <div>
        <label>Medium Ring</label>
        <ejs-progressbar
          id="mediumRing" 
          [value]="70"
          type="Circular"
          radius="120%"
          innerRadius="80%">
        </ejs-progressbar>
      </div>

      <!-- Large donut -->
      <div>
        <label>Large Donut</label>
        <ejs-progressbar
          id="largeDonut" 
          [value]="70"
          type="Circular"
          radius="120%"
          innerRadius="60%">
        </ejs-progressbar>
      </div>

    </div>
  `
})
export class DonutEffectComponent {
}
```

### Corner Radius Styling

Customize corner style for circular and linear progress bars:

```typescript
@Component({
  selector: 'app-corner-radius',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <!-- Round corners on circular -->
      <div style="margin: 15px 0;">
        <label>Circular - Round Corners</label>
        <ejs-progressbar
          id="circular-round" 
          [value]="60"
          type="Circular"
          cornerRadius="Round"
          height="200"
          width="200"
          [trackThickness]="30"
          [progressThickness]="30">
        </ejs-progressbar>
      </div>

      <!-- Square corners on circular -->
      <div style="margin: 15px 0;">
        <label>Circular - Square Corners</label>
        <ejs-progressbar
          id="circular-square" 
          [value]="60"
          type="Circular"
          cornerRadius="Square"
          height="200"
          width="200"
          [trackThickness]="30"
          [progressThickness]="30">
        </ejs-progressbar>
      </div>

      <!-- Semi-circular with round corners -->
      <div style="margin: 15px 0;">
        <label>Semi-Circular - Round Corners</label>
        <ejs-progressbar
          id="semicircular-round" 
          [value]="60"
          type="SemiCircular"
          cornerRadius="Round"
          height="200"
          width="200">
        </ejs-progressbar>
      </div>

      <!-- Linear with rounded caps -->
      <div style="margin: 15px 0;">
        <label>Linear - Round Ends (via cornerRadius)</label>
        <ejs-progressbar
          id="linear-round" 
          [value]="60"
          type="Linear"
          cornerRadius="Round"
          height="20"
          style="width: 300px;">
        </ejs-progressbar>
      </div>
    </div>
  `
})
export class CornerRadiusComponent {
}
```

**Values:**
- `Round` - Rounded corners/ends
- `Square` - Sharp square corners

## Segments

### Linear Progress with Segments

```typescript
@Component({
  selector: 'app-segments',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <h4>Segmented Progress Bar</h4>
      <ejs-progressbar 
        [value]="65"
        type="Linear"
        height="25"
        [segmentCount]="5">
      </ejs-progressbar>
      <p style="margin-top: 10px;">5 segments shown</p>
    </div>
  `
})
export class SegmentsComponent {
}
```

### Circular Progress with Segments

```typescript
@Component({
  selector: 'app-circular-segments',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="display: flex; gap: 30px; margin: 20px;">
      
      <!-- 4 segments -->
      <div>
        <label>4 Segments</label>
        <ejs-progressbar
          id="fourSegemnt" 
          [value]="75"
          type="Circular"
          [segmentCount]="4">
        </ejs-progressbar>
      </div>

      <!-- 6 segments -->
      <div>
        <label>6 Segments</label>
        <ejs-progressbar
          id="sixSegemnt" 
          [value]="75"
          type="Circular"
          [segmentCount]="6">
        </ejs-progressbar>
      </div>

      <!-- 8 segments -->
      <div>
        <label>8 Segments</label>
        <ejs-progressbar
          id="eightSegemnt" 
          [value]="75"
          type="Circular"
          [segmentCount]="8">
        </ejs-progressbar>
      </div>

    </div>
  `
})
export class CircularSegmentsComponent {
}
```

### Segment Spacing

Control spacing between segments using `segmentSpacing` property:

```typescript
@Component({
  selector: 'app-segment-spacing',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <!-- No spacing -->
      <div style="margin: 15px 0;">
        <label>No Segment Spacing (segmentSpacing: 0)</label>
        <ejs-progressbar
          id="no-spacing" 
          [value]="100"
          type="Circular"
          [segmentCount]="6"
          [segmentSpacing]="0"
          height="200"
          width="200">
        </ejs-progressbar>
      </div>

      <!-- Small spacing -->
      <div style="margin: 15px 0;">
        <label>Small Spacing (segmentSpacing: 2)</label>
        <ejs-progressbar
          id="small-spacing" 
          [value]="100"
          type="Circular"
          [segmentCount]="6"
          [segmentSpacing]="2"
          height="200"
          width="200">
        </ejs-progressbar>
      </div>

      <!-- Large spacing -->
      <div style="margin: 15px 0;">
        <label>Large Spacing (segmentSpacing: 5)</label>
        <ejs-progressbar
          id="large-spacing" 
          [value]="100"
          type="Circular"
          [segmentCount]="6"
          [segmentSpacing]="5"
          height="200"
          width="200">
        </ejs-progressbar>
      </div>

      <!-- Linear segments with spacing -->
      <div style="margin: 15px 0;">
        <label>Linear Segments with Spacing</label>
        <ejs-progressbar
          id="linear-spacing" 
          [value]="100"
          type="Linear"
          [segmentCount]="5"
          [segmentSpacing]="3"
          height="25"
          style="width: 400px;">
        </ejs-progressbar>
      </div>
    </div>
  `
})
export class SegmentSpacingComponent {
}
```

## Thickness Control

### Track and Progress Thickness

```typescript
@Component({
  selector: 'app-thickness',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px; width: 100%;">
      <!-- Thin bar -->
      <div style="margin: 15px 0;">
        <label>Thin Progress Bar</label>
        <ejs-progressbar
          [value]="60"
          trackThickness="2"
          progressThickness="2"
          type="Linear"
          height="20"
          style="width: 300px;">
        </ejs-progressbar>
      </div>

      <!-- Medium bar -->
      <div style="margin: 15px 0;">
        <label>Medium Progress Bar</label>
        <ejs-progressbar
          [value]="60"
          trackThickness="8"
          progressThickness="8"
          type="Linear"
          height="20"
          style="width: 300px;">
        </ejs-progressbar>
      </div>

      <!-- Thick bar -->
      <div style="margin: 15px 0;">
        <label>Thick Progress Bar</label>
        <ejs-progressbar
          [value]="60"
          trackThickness="20"
          progressThickness="20"
          type="Linear"
          height="30"
          style="width: 300px;">
        </ejs-progressbar>
      </div>
    </div>
  `
})
export class ThicknessComponent {
}
```

### Secondary Progress Thickness

Customize thickness for primary and secondary progress independently:

```typescript
@Component({
  selector: 'app-secondary-thickness',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <!-- Equal thickness -->
      <div style="margin: 15px 0;">
        <label>Equal Thickness (Buffering)</label>
        <ejs-progressbar
          id="equal-thickness"
          [value]="40"
          [secondaryProgress]="70"
          type="Linear"
          height="30"
          [trackThickness]="25"
          [progressThickness]="25"
          [secondaryProgressThickness]="25"
          progressColor="#2196F3"
          secondaryProgressColor="#90CAF9"
          trackColor="#E3F2FD"
          style="width: 400px;">
        </ejs-progressbar>
      </div>

      <!-- Thicker secondary -->
      <div style="margin: 15px 0;">
        <label>Thicker Secondary (Buffer Emphasis)</label>
        <ejs-progressbar
          id="thicker-secondary"
          [value]="40"
          [secondaryProgress]="70"
          type="Linear"
          height="30"
          [trackThickness]="15"
          [progressThickness]="15"
          [secondaryProgressThickness]="20"
          progressColor="#FF6B6B"
          secondaryProgressColor="#FFB347"
          trackColor="#FFF5E1"
          style="width: 400px;">
        </ejs-progressbar>
      </div>

      <!-- Thinner primary -->
      <div style="margin: 15px 0;">
        <label>Thinner Primary (Download Speed View)</label>
        <ejs-progressbar
          id="thinner-primary"
          [value]="50"
          [secondaryProgress]="85"
          type="Linear"
          height="30"
          [trackThickness]="20"
          [progressThickness]="10"
          [secondaryProgressThickness]="20"
          progressColor="#4CAF50"
          secondaryProgressColor="#81C784"
          trackColor="#E8F5E9"
          style="width: 400px;">
        </ejs-progressbar>
      </div>
    </div>
  `
})
export class SecondaryThicknessComponent {
}
```
