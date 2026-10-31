# Step Types in Angular Stepper

## Table of Contents
- [Default Type](#default-type)
- [Label Positions](#label-positions)
- [Indicator Only Type](#indicator-only-type)
- [Label Only Type](#label-only-type)
- [Type Selection Guide](#type-selection-guide)

## Default Type

The Default type displays steps with a combination of indicators (icons or numbers) and labels. This is the standard and recommended display style for most use cases.

### Default Type Example

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="iconWithLabel">
      <ejs-stepper stepType="Default">
        <e-steps>
          <e-step label="Cart" iconCss="sf-icon-cart"></e-step>
          <e-step label="Delivery Address" iconCss="sf-icon-transport"></e-step>
          <e-step label="Payment" iconCss="sf-icon-payment"></e-step>
          <e-step label="Confirmation" iconCss="sf-icon-success"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .iconWithLabel {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent { }
```

### When to Use Default Type

- When you need both visual icons and text labels
- For complex workflows where clarity is important
- General-purpose applications that prioritize accessibility
- Mobile and desktop responsive designs
- Multi-step forms and wizards

### Features of Default Type

- **Visual Icons**: Shows icons or numbered indicators
- **Text Labels**: Displays descriptive text for each step
- **Clear Navigation**: Easy to understand step information
- **Accessibility**: Icon + label provides redundant information for accessibility
- **Space Utilization**: Takes moderate space for optimal visibility

## Label Positions

You can display the label on the top, bottom, start, or end side of the steps using the `labelPosition` property. This allows flexible label positioning based on your layout requirements.

### Supported Label Positions

| Value | Description |
|-----|-----|
| `Top` | Positions the label at the top of each step. |
| `Bottom` | Positions the label at the bottom of each step. |
| `Start` | Positions the label to the left side of each step. |
| `End` | Positions the label to the right side of each step. |

### Label Position Example

```ts
import { Component, ViewChild } from "@angular/core";
import { StepperComponent, StepperAllModule, StepperModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepperWithLabel">
      <div class="e-btn-group labelPosition">
        <input type="radio" id="start" name="position" value="start" (click)="updateLabelPosition($event);" />
        <label class="e-btn" for="start">Start</label>
        <input type="radio" id="end" name="position" value="end" (click)="updateLabelPosition($event);" />
        <label class="e-btn" for="end">End</label>
        <input type="radio" id="top" name="position" value="top" (click)="updateLabelPosition($event);" />
        <label class="e-btn" for="top">Top</label>
        <input type="radio" id="bottom" name="position" value="bottom" (click)="updateLabelPosition($event);" checked />
        <label class="e-btn" for="bottom">Bottom</label>
      </div>
      <div class="stepper-section"> 
        <ejs-stepper #ejStepper>
          <e-steps>
            <e-step label="Cart" iconCss="sf-icon-cart"></e-step>
            <e-step label="Shipped" iconCss="sf-icon-transport"></e-step>
            <e-step label="Payment" iconCss="sf-icon-payment"></e-step>
            <e-step label="Delivered" iconCss="sf-icon-success"></e-step>
          </e-steps>
        </ejs-stepper>
      </div>
    </div>
  `,
  styles: [`
    .stepperWithLabel {
      padding: 20px;
    }
    .labelPosition {
      margin-bottom: 20px;
    }
  `]
})
export class AppComponent {
  @ViewChild('ejStepper') stepper: StepperComponent | any;

  public updateLabelPosition(args: any): void {
    // Capitalize the position value: 'start' -> 'Start', 'end' -> 'End', etc.
    const position = args.currentTarget.value;
    const capitalizedPosition = position.charAt(0).toUpperCase() + position.slice(1);
    this.stepper.labelPosition = capitalizedPosition;
  };
}
```

### When to Use Each Position

- **Top**: Default position for horizontal steppers, works well with icons
- **Bottom**: Common for horizontal layouts, provides clear separation
- **Start** (Left): Works well for vertical steppers or RTL layouts
- **End** (Right): Alternative layout for horizontal steppers with labels on the right

### Label Position Guidelines

1. **Horizontal Steppers**: Use Top or Bottom positions
2. **Vertical Steppers**: Use Start or End positions
3. **Accessibility**: Top or Bottom positions are typically more accessible
4. **Responsive Design**: Consider changing position on mobile devices
5. **Icon Visibility**: Ensure labels don't overlap with icons

## Indicator Only Type

The Indicator Only type displays only the step indicators (icons or numbers) without text labels. This creates a compact, icon-based navigation.

### Indicator Only Type Example

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="indicatorOnly">
      <ejs-stepper stepType="Indicator">
        <e-steps>
          <e-step iconCss="sf-icon-cart"></e-step>
          <e-step iconCss="sf-icon-transport"></e-step>
          <e-step iconCss="sf-icon-payment"></e-step>
          <e-step iconCss="sf-icon-success"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .indicatorOnly {
      padding: 20px;
      max-width: 400px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent { }
```

### When to Use Indicator Only Type

- When space is limited (mobile devices, sidebars)
- For experienced users familiar with the workflow
- When labels would create clutter
- Compact dashboard or widget layouts
- Icon-based interfaces with context labels elsewhere
- Progressive disclosure patterns

### Features of Indicator Only Type

- **Minimal Space**: Compact footprint on screen
- **Clean Design**: Reduces visual clutter
- **Icon-Focused**: Relies on clear, intuitive icons
- **Mobile-Friendly**: Works well on small screens
- **Supplementary Labels**: Can add tooltips for additional context

### Best Practices for Indicator Only

- Use clear, universally recognized icons
- Ensure icons are visually distinct
- Consider adding tooltips when users hover
- Provide step descriptions elsewhere in the UI
- Test with users unfamiliar with your workflow

## Label Only Type

The Label Only type displays only text labels without icons or indicators. This style is useful for text-based navigation with minimal visual decoration.

### Label Only Type Example

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="labelOnly">
      <ejs-stepper stepType="Label">
        <e-steps>
          <e-step label="Cart"></e-step>
          <e-step label="Delivery Address"></e-step>
          <e-step label="Payment"></e-step>
          <e-step label="Confirmation"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .labelOnly {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent { }
```

### When to Use Label Only Type

- When icons might be ambiguous or unclear
- Text-heavy applications or internal tools
- Accessibility-focused designs
- Multi-language applications where labels adapt
- Formal or professional interfaces
- When step descriptions are self-explanatory

### Features of Label Only Type

- **Text-Based**: Clear, readable description for each step
- **Icon-Free**: No visual icons needed
- **Flexibility**: Labels can be long and descriptive
- **Simplicity**: Straightforward text navigation
- **Localization**: Easy to translate and adapt

## Type Selection Guide

### Decision Matrix

| Scenario | Default | Indicator | Label |
|----------|---------|-----------|-------|
| **Wide layout** | ✅ | ✅ | ✅ |
| **Mobile/narrow** | ⚠️ | ✅ | ⚠️ |
| **Icon clear** | ✅ | ✅ | ✗ |
| **Icon unclear** | ✅ | ✗ | ✅ |
| **Space limited** | ⚠️ | ✅ | ⚠️ |
| **Accessibility** | ✅ | ⚠️ | ✅ |
| **Modern design** | ✅ | ✅ | ⚠️ |

### Recommendation by Use Case

**Default Type (Recommended for most cases)**
- Multi-step forms and wizards
- E-commerce checkout flows
- Onboarding sequences
- General workflows

**Indicator Only Type**
- Mobile-first designs
- Compact dashboards
- Icon-rich interfaces
- Space-constrained layouts

**Label Only Type**
- Accessibility-critical applications
- Text-heavy internal tools
- Multi-language applications
- Formal or enterprise interfaces

## Switching Step Types

Change the step type using the `stepType` property. The component supports `'Default'`, `'Indicator'`, and `'Label'` values:

```ts
@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  template: `
    <div class="controls">
      <button (click)="setStepType('Default')">Default</button>
      <button (click)="setStepType('Indicator')">Indicator</button>
      <button (click)="setStepType('Label')">Label Only</button>
    </div>
    <ejs-stepper [stepType]="selectedType">
      <e-steps>
        <e-step label="Step 1" iconCss="sf-icon-cart"></e-step>
        <e-step label="Step 2" iconCss="sf-icon-transport"></e-step>
        <e-step label="Step 3" iconCss="sf-icon-payment"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent {
  selectedType = 'Default';

  setStepType(type: string) {
    this.selectedType = type;
  }
}
```

## Best Practices

1. **Default for clarity**: Use Default type unless space is severely constrained
2. **Icon visibility**: If using Indicator type, ensure icons are clear and testable
3. **Mobile responsive**: Use Indicator on mobile, Default on desktop using responsive design
4. **Consistency**: Keep the same type throughout your application
5. **Testing**: Validate that users understand your chosen type

**See also:** [orientations-and-layouts.md](orientations-and-layouts.md) for layout options, [steps-configuration.md](steps-configuration.md) for configuring icons and labels.
