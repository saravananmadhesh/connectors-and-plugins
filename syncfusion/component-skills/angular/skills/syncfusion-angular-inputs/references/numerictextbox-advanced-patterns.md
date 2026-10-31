# Advanced Patterns and Edge Cases

## Table of Contents
- [Maintaining Trailing Zeros](#maintaining-trailing-zeros)
- [Preventing Nullable Input](#preventing-nullable-input)
- [Clear Button Behavior](#clear-button-behavior)
- [Float Label Types](#float-label-types)
- [State Management](#state-management)
- [Performance Optimization](#performance-optimization)
- [Examples](#examples)

---

## Maintaining Trailing Zeros

By default, trailing zeros are **removed on focus**. Use this pattern to preserve them:

### The Problem

```typescript
// Display (blur): "100.50"
// Focused: "100.5"  // Trailing zero removed
```

### Solution 1: Using floatLabelType

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      value="100.50"
      format="n2"
      decimals="2"
      floatLabelType="Always"
      placeholder="Always shows format">
    </ejs-numerictextbox>
  `
})
export class TrailingZerosComponent {}
```

### Solution 2: Custom Focus Handler

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  selector: 'app-preserve-zeros',
  template: `
    <ejs-numerictextbox
      [(ngModel)]="value"
      (focus)="onFocus($event)"
      format="n2"
      decimals="2">
    </ejs-numerictextbox>
  `
})
export class PreserveZerosComponent {
  value: number = 100.50;

  onFocus(args: NumericFocusEventArgs) {
    // The component retains trailing zeros when format="n2" and decimals="2" are set.
    // React to the focus event to perform any UI updates as needed.
    console.log('Focused with value:', args.value);
  }
}
```

### Solution 3: Format on Display

Use a numeric `value` property and rely on `format` and `decimals` to control the display:

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      [(ngModel)]="rawValue"
      format="n2"
      decimals="2">
    </ejs-numerictextbox>
  `
})
export class FormatDisplayComponent {
  rawValue: number = 100.5;  // Displayed as "100.50" when format="n2" decimals="2"
}
```

---

## Preventing Nullable Input

By default, NumericTextBox allows `null` values. Force a value to always be present:

### Solution 1: Default Value with Change Handler

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      [(ngModel)]="value"
      (change)="ensureValue()"
      min="1"
      value="1">
    </ejs-numerictextbox>
  `
})
export class RequiredValueComponent {
  value: number = 1;

  ensureValue() {
    if (this.value === null || this.value === undefined) {
      this.value = 1;  // Reset to default
    }
  }
}
```

### Solution 2: Reactive Forms with nonNullable

```typescript
import { FormControl } from '@angular/forms';

form = new FormGroup({
  quantity: new FormControl<number>(1, {
    nonNullable: true  // Always has a value
  })
});
```

**Key difference:**
- `nonNullable: true` ensures FormControl never emits `null`
- Initial value becomes the default if reset

### Solution 3: Disable Clear Button

```typescript
<ejs-numerictextbox
  value="1"
  [showClearButton]="false"
  min="1"
  placeholder="Value required">
</ejs-numerictextbox>
```

### Solution 4: Prevent Focus Out When Null

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      [(ngModel)]="value"
      (blur)="onBlur($event)"
      min="1"
      value="1">
    </ejs-numerictextbox>
  `
})
export class NullablePreventionComponent {
  value: number = 1;

  onBlur(args: NumericBlurEventArgs) {
    if (args.value === null || args.value === undefined || args.value < 1) {
      this.value = 1;  // Reset bound model to minimum via two-way binding
    }
  }
}
```

---

## Clear Button Behavior

Use `showClearButton` to enable a built-in clear button:

### Enable Clear Button

```typescript
<ejs-numerictextbox
  value="100"
  [showClearButton]="true"
  placeholder="Click X to clear">
</ejs-numerictextbox>
```

### Clear Button with Event Handling

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      #numericRef
      [(ngModel)]="value"
      [showClearButton]="true"
      (change)="onClear()"
      placeholder="Clear value">
    </ejs-numerictextbox>
    <p *ngIf="isCleared">✓ Value cleared</p>
  `
})
export class ClearButtonComponent {
  @ViewChild('numericRef') numeric!: NumericTextBoxComponent;
  value: number | null = 100;
  isCleared = false;

  onClear() {
    if (this.value === null) {
      this.isCleared = true;
    } else {
      this.isCleared = false;
    }
  }
}
```

### Custom Clear Handler

Use two-way binding via `[(ngModel)]` to programmatically clear the value:

```typescript
@Component({
  imports: [NumericTextBoxModule, FormsModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      [(ngModel)]="numericValue"
      placeholder="Click button to clear">
    </ejs-numerictextbox>
    <button (click)="clearValue()">Clear</button>
  `
})
export class CustomClearComponent {
  numericValue: number | null = 100;

  clearValue() {
    this.numericValue = null;
  }
}
```

---

## Float Label Types

Control when placeholder text floats above the input:

| Type | Behavior |
|------|----------|
| `Never` | Label stays inside input, replaces on focus |
| `Auto` | Label floats when input has value |
| `Always` | Label always floats above input |

### Never (Default)

```typescript
<ejs-numerictextbox
  placeholder="Enter value"
  floatLabelType="Never">
</ejs-numerictextbox>
```

### Auto (Recommended)

```typescript
<ejs-numerictextbox
  placeholder="Enter amount"
  floatLabelType="Auto">
</ejs-numerictextbox>
```

### Always (Best for Accessibility)

```typescript
<ejs-numerictextbox
  placeholder="Enter value"
  floatLabelType="Always"
  value="100">
</ejs-numerictextbox>
```

---

## State Management

### Disabled State

```typescript
@Component({
  imports: [NumericTextBoxModule, NgIf],
  standalone: true,
  template: `
    <ejs-numerictextbox
      value="100"
      [enabled]="!isDisabled">
    </ejs-numerictextbox>
    <button (click)="toggleDisabled()">
      {{ isDisabled ? 'Enable' : 'Disable' }}
    </button>
  `
})
export class DisabledStateComponent {
  isDisabled = false;

  toggleDisabled() {
    this.isDisabled = !this.isDisabled;
  }
}
```

### Read-Only State

```typescript
<ejs-numerictextbox
  value="100"
  [readonly]="true"
  placeholder="Read-only value">
</ejs-numerictextbox>
```

### Enabled + Read-Only Difference

| Property | Behavior |
|----------|----------|
| `enabled=false` | Grayed out, no interaction |
| `readonly=true` | Visible, selectable, no editing |

---

## Performance Optimization

### Debounce Change Events

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  template: `
    <ejs-numerictextbox
      (change)="onValueChange($event)">
    </ejs-numerictextbox>
    <p>Total: {{ total }}</p>
  `
})
export class DebounceComponent {
  total: number = 0;
  private changeSubject = new Subject<any>();

  constructor() {
    this.changeSubject
      .pipe(debounceTime(300))
      .subscribe(event => this.calculateTotal(event));
  }

  onValueChange(event: any) {
    this.changeSubject.next(event);
  }

  calculateTotal(event: any) {
    // Expensive calculation only after user stops typing
    this.total = event.value * 1.1;
  }
}
```

### Avoid Excessive Re-renders

```typescript
@Component({
  imports: [NumericTextBoxModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ejs-numerictextbox
      [(ngModel)]="value"
      (change)="onValueChange($event)">
    </ejs-numerictextbox>
  `
})
export class OptimizedComponent implements OnInit {
  @Input() value: number = 0;
  private cdr = inject(ChangeDetectorRef);

  onValueChange(event: any) {
    this.value = event.value;
    this.cdr.markForCheck();  // Manual change detection
  }
}
```

---

## Examples

### Invoice Line Item

```typescript
@Component({
  imports: [NumericTextBoxModule, CommonModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-invoice-line',
  template: `
    <div class="line-item" [formGroup]="lineForm">
      <ejs-numerictextbox
        formControlName="quantity"
        min="1"
        step="1">
      </ejs-numerictextbox>

      <ejs-numerictextbox
        formControlName="unitPrice"
        format="c2"
        min="0">
      </ejs-numerictextbox>

      <p class="total">
        Total: {{ (lineForm.value.quantity * lineForm.value.unitPrice) | currency }}
      </p>
    </div>
  `
})
export class InvoiceLineComponent {
  lineForm = new FormGroup({
    quantity: new FormControl<number>(1, { nonNullable: true }),
    unitPrice: new FormControl<number>(0, { nonNullable: true })
  });
}
```

### Range Slider Synchronized

```typescript
@Component({
  imports: [NumericTextBoxModule, CommonModule],
  standalone: true,
  template: `
    <div class="slider-sync">
      <input type="range" min="0" max="100" [(ngModel)]="value"
             (input)="onSliderChange()">
      <ejs-numerictextbox
        [(ngModel)]="value"
        min="0"
        max="100"
        decimals="0">
      </ejs-numerictextbox>
      <p>Value: {{ value }}</p>
    </div>
  `
})
export class SliderSyncComponent {
  value: number = 50;

  onSliderChange() {
    // Value synced via two-way binding
  }
}
```

---

## Troubleshooting

**Issue:** Trailing zeros disappearing
- **Solution:** Use `floatLabelType="Always"` or custom focus handler

**Issue:** Value becomes null unexpectedly
- **Solution:** Add null check in change handler

**Issue:** Performance degradation with many inputs
- **Solution:** Use `OnPush` change detection strategy

---

## See Also

- [Getting Started](./getting-started.md)
- [Validation and Forms](./validation-and-forms.md)
- [Accessibility and Migration](./accessibility-and-migration.md)
