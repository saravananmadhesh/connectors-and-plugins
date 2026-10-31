# Interaction and Events

Handles user interactions with the Linear Gauge, including mouse events, drag operations, and dynamic value updates. Enable users to modify gauge values through interaction while providing real-time feedback.

## Table of Contents

- [Event Types](#event-types)
  - [Gauge Events](#gauge-events)
- [Drag Interactions](#drag-interactions)
  - [Enable Draggable Pointers](#enable-draggable-pointers)
- [Click Events](#click-events)
  - [Handle Gauge Mouse down](#handle-gauge-mouse-down)
- [Event Callbacks](#event-callbacks)
  - [Change Events](#change-events)
- [Form Integration](#form-integration)
  - [Two-Way Binding with Input](#two-way-binding-with-input)
- [Dynamic Value Updates](#dynamic-value-updates)
  - [Real-time Value Updates](#real-time-value-updates)
  - [Update from API](#update-from-api)
- [Advanced Interactions](#advanced-interactions)
  - [Value Validation](#value-validation)
  - [Snap to Grid](#snap-to-grid)
  - [Multiple Interaction Modes](#multiple-interaction-modes)
- [Practical Examples](#practical-examples)
  - [Temperature Control Interface](#temperature-control-interface)
  - [Volume Control](#volume-control)
  - [Speed Monitor with Alerts](#speed-monitor-with-alerts)


## Event Types

### Gauge Events

```typescript
<ejs-lineargauge 
  (gaugeMouseDown)="onPointerDown($event)"
  (gaugeMouseUp)="onPointerUp($event)"
  (gaugeMouseMove)="onPointerMove($event)"
  (dragStart)="onDragStart($event)"
  (dragMove)="onDragMove($event)"
  (dragEnd)="onDragEnd($event)">
  <!-- ... axes and pointers ... -->
</ejs-lineargauge>
```

## Drag Interactions

### Enable Draggable Pointers

Allow users to drag pointers to change values:

```typescript
@Component({
imports: [
         LinearGaugeModule
    ],

providers: [ GaugeTooltipService ],
standalone: true,
    selector: 'app-container',
    template: `
    <ejs-lineargauge style="display:block" id="gauge-container" (dragStart)='dragStart($event)'>
        <e-axes>
         <e-axis>
           <e-pointers>
             <e-pointer enableDrag=true></e-pointer>
           </e-pointers>
         </e-axis>
      </e-axes>
    </ejs-lineargauge>`
})
export class AppComponent {
    dragStart(args: IPointerDragEventArgs) {
    }
}
```

```typescript
@Component({
imports: [
         LinearGaugeModule
    ],

providers: [ GaugeTooltipService ],
standalone: true,
    selector: 'app-container',
    template: `
    <ejs-lineargauge style="display:block" id="gauge-container" (dragMove)='dragMove($event)'>
        <e-axes>
         <e-axis>
           <e-pointers>
             <e-pointer enableDrag=true></e-pointer>
           </e-pointers>
         </e-axis>
      </e-axes>
    </ejs-lineargauge>`
})
export class AppComponent {
    dragMove(args: IPointerDragEventArgs) {
    }
}
```

**Template:**

```typescript
@Component({
imports: [
         LinearGaugeModule
    ],

providers: [ GaugeTooltipService ],
standalone: true,
    selector: 'app-container',
    template: `
    <ejs-lineargauge style="display:block" id="gauge-container" (dragEnd)='dragEnd($event)'>
        <e-axes>
         <e-axis>
           <e-pointers>
             <e-pointer enableDrag=true></e-pointer>
           </e-pointers>
         </e-axis>
      </e-axes>
    </ejs-lineargauge>`
})
export class AppComponent {
    dragEnd(args: IPointerDragEventArgs) {
    }
}
```

## Click Events

### Handle Gauge Mouse down

Respond when user mouse down on the gauge:

```typescript
@Component({
imports: [
         LinearGaugeModule
    ],

providers: [ GaugeTooltipService ],
standalone: true,
    selector: 'app-container',
    template: `
    <ejs-lineargauge id="gauge-container" (gaugeMouseDown)='gaugeMouseDown($event)'>
    </ejs-lineargauge>`
})
export class AppComponent {
    gaugeMouseDown(args: IMouseEventArgs) {
    }
}
```

## Event Callbacks

### Change Events

```typescript
export class EventCallbackComponent implements OnInit {
  @ViewChild('gauge') gaugeRef: LinearGaugeComponent;

  ngOnInit(): void {
    // Listen for resize events
    window.addEventListener('resize', () => this.onWindowResize());
  }

  onPointerValueChange(event: any): void {
    console.log('Pointer value changed:', event.value);
    this.emitValueChange(event.value);
  }

  onWindowResize(): void {
    if (this.gaugeRef) {
      this.gaugeRef.refresh();
    }
  }

  emitValueChange(newValue: number): void {
    // Emit to parent component
    console.log('Emitting new value:', newValue);
  }
}
```

## Form Integration

### Two-Way Binding with Input

```typescript
export class FormIntegratedGaugeComponent {
  gaugeValue: number = 50;

  updateGaugeFromInput(inputValue: string): void {
    const numValue = parseFloat(inputValue);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      this.gaugeValue = numValue;
    }
  }

  updateInputFromGauge(gaugeValue: number): void {
    this.inputValue = gaugeValue.toString();
  }
}
```

## Dynamic Value Updates

### Real-time Value Updates

Simulate live data:

```typescript
export class RealtimeGaugeComponent implements OnInit, OnDestroy {
  @ViewChild('gauge') gaugeRef: LinearGaugeComponent;
  gaugeValue: number = 50;
  private updateInterval: any;

  ngOnInit(): void {
    this.startSimulation();
  }

  ngOnDestroy(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  startSimulation(): void {
    this.updateInterval = setInterval(() => {
      // Simulate fluctuating value
      const change = (Math.random() - 0.5) * 10;
      this.gaugeValue = Math.max(0, Math.min(100, this.gaugeValue + change));
      
      if (this.gaugeRef) {
        this.gaugeRef.setPointerValue(0, 0, this.gaugeValue);
      }
    }, 500);
  }

  stopSimulation(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }
}
```

### Update from API

```typescript
export class ApiDataGaugeComponent implements OnInit {
  @ViewChild('gauge') gaugeRef: LinearGaugeComponent;
  gaugeValue: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadGaugeValue();
    // Poll for updates
    setInterval(() => this.loadGaugeValue(), 5000);
  }

  loadGaugeValue(): void {
    this.dataService.getValue().subscribe(
      (value: number) => {
        this.gaugeValue = value;
        if (this.gaugeRef) {
          this.gaugeRef.setPointerValue(0, 0, value);
        }
      },
      (error: any) => console.error('Error loading gauge value:', error)
    );
  }
}
```

## Advanced Interactions

### Value Validation

Validate user input:

```typescript
export class ValidatedGaugeComponent {
  gaugeValue: number = 50;
  minValue: number = 0;
  maxValue: number = 100;

  dragEnd(args: IPointerDragEventArgs): void {
    const newValue = event.currentValue;
    
    // Validate range
    if (newValue < this.minValue || newValue > this.maxValue) {
      console.warn('Value out of range');
      return; // Reject invalid value
    }

    // Additional validation logic
    if (!this.isValidValue(newValue)) {
      console.warn('Value failed validation');
      return;
    }

    this.gaugeValue = newValue;
  }

  isValidValue(value: number): boolean {
    // Custom validation logic
    return value % 5 === 0; // Only allow multiples of 5, for example
  }
}
```

### Snap to Grid

Snap pointer to specific increments:

```typescript
export class SnapToGridComponent {
  gaugeValue: number = 50;
  snapInterval: number = 10;

  dragEnd(args: IPointerDragEventArgs): void {
    // Snap to nearest interval
    const snappedValue = Math.round(event.currentValue / this.snapInterval) * this.snapInterval;
    this.gaugeValue = Math.max(0, Math.min(100, snappedValue));
  }
}
```

### Multiple Interaction Modes

```typescript
export class MultiModeGaugeComponent {
  gaugeValue: number = 50;
  interactionMode: 'drag' | 'click' | 'input' = 'drag';

  setValue(newValue: number): void {
    this.gaugeValue = Math.max(0, Math.min(100, newValue));
  }

  dragEnd(args: IPointerDragEventArgs): void {
    if (this.interactionMode === 'drag') {
      this.setValue(event.currentValue);
    }
  }

   gaugeMouseDown(args: IMouseEventArgs): void {
    if (this.interactionMode === 'click') {
      this.setValue(event.currentValue);
    }
  }

  updateFromInput(inputValue: string): void {
    if (this.interactionMode === 'input') {
      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        this.setValue(numValue);
      }
    }
  }
}
```

## Practical Examples

### Temperature Control Interface

```typescript
export class TemperatureControlComponent {
  temperature: number = 22;
  targetTemperature: number = 22;

  dragEnd(args: IPointerDragEventArgs): void {
    this.targetTemperature = event.currentValue;
    this.sendToDevice(this.targetTemperature);
  }

  sendToDevice(temp: number): void {
    console.log(`Setting device temperature to ${temp}°C`);
    // API call to device
  }
}
```

### Volume Control

```typescript
export class VolumeControlComponent {
  volume: number = 50;

  dragEnd(args: IPointerDragEventArgs): void {
    this.volume = event.currentValue;
    this.updateAudioLevel(this.volume);
  }

  updateAudioLevel(level: number): void {
    // Update audio context
    console.log(`Volume set to ${level}%`);
  }
}
```

### Speed Monitor with Alerts

```typescript
export class SpeedMonitorComponent {
  currentSpeed: number = 60;
  maxSpeed: number = 100;
  alertThreshold: number = 80;

  onValueChange(newSpeed: number): void {
    this.currentSpeed = newSpeed;
    if (newSpeed > this.alertThreshold) {
      this.showSpeedAlert();
    }
  }

  showSpeedAlert(): void {
    console.warn('Speed exceeds threshold!');
    // Trigger visual/audio alert
  }
}
```
