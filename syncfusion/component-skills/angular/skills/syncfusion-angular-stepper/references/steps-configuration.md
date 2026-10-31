# Configuring Steps in Angular Stepper

## Table of Contents
- [Adding Steps](#adding-steps)
- [Configuring Icons](#configuring-icons)
- [Step Labels and Text](#step-labels-and-text)
- [Step Properties](#step-properties)
- [Icon and Label Combinations](#icon-and-label-combinations)
- [Setting Active Step](#setting-active-step)
- [Optional Steps](#optional-steps)
- [Disabling Steps](#disabling-steps)
- [Setting Readonly](#setting-readonly)
- [Step Status](#step-status)
- [Step Validation](#step-validation)
- [Label Positioning](#label-positioning)

## Adding Steps

The Angular Stepper allows you to add steps using the `<e-step>` tag directive. Each step can be configured with various properties to customize its appearance and behavior.

### Basic Step Definition

Define steps using the `<e-step>` directive inside `<e-steps>`:

```html
<ejs-stepper>
  <e-steps>
    <e-step></e-step>
    <e-step></e-step>
    <e-step></e-step>
  </e-steps>
</ejs-stepper>
```

## Configuring Icons

### Using Icon CSS Classes

Define a CSS class to display an icon for each step using the `iconCss` property:

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepperIcon">
      <ejs-stepper>
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
    .stepperIcon {
      padding: 20px;
    }
  `]
})
export class AppComponent { }
```

### Icon Font Libraries

Use any icon font library by providing the appropriate CSS class. Common options:
- **Material Icons**: `material-icons` with icon class name
- **Font Awesome**: `fa fa-*` classes
- **Bootstrap Icons**: `bi bi-*` classes
- **Syncfusion Icons**: `sf-icon-*` classes

Example with Font Awesome:

```html
<ejs-stepper>
  <e-steps>
    <e-step iconCss="fa fa-shopping-cart"></e-step>
    <e-step iconCss="fa fa-truck"></e-step>
    <e-step iconCss="fa fa-credit-card"></e-step>
    <e-step iconCss="fa fa-check-circle"></e-step>
  </e-steps>
</ejs-stepper>
```

## Step Labels and Text

### Defining Labels

The `label` property displays text for each step:

```html
<ejs-stepper>
  <e-steps>
    <e-step label="Personal Info"></e-step>
    <e-step label="Address"></e-step>
    <e-step label="Confirmation"></e-step>
  </e-steps>
</ejs-stepper>
```

### Custom Text Content

Use the `text` property for additional text (note: typically use `label` for primary text):

```html
<ejs-stepper>
  <e-steps>
    <e-step label="Step 1" text="Enter your information"></e-step>
    <e-step label="Step 2" text="Confirm your address"></e-step>
    <e-step label="Step 3" text="Complete payment"></e-step>
  </e-steps>
</ejs-stepper>
```

## Step Properties

The `StepModel` interface defines properties for each step:

| Property | Type | Description |
|----------|------|-------------|
| `iconCss` | string | CSS class for step icon |
| `label` | string | Display text for the step |
| `text` | string | Additional text content for the step |
| `cssClass` | string | Custom CSS class for styling |
| `status` | StepStatus | Step status (NotStarted, InProgress, Completed, Error) |
| `optional` | boolean | Mark step as optional |
| `disabled` | boolean | Disable step interaction |

## Icon and Label Combinations

### Icons with Labels

Combine icons and labels for comprehensive step indicators:

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="iconWithLabel">
      <ejs-stepper>
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
      max-width: 800px;
      margin: 20px auto;
    }
  `]
})
export class AppComponent { }
```

### Icons Only

For compact layouts, use only icons without labels:

```html
<ejs-stepper>
  <e-steps>
    <e-step iconCss="sf-icon-cart"></e-step>
    <e-step iconCss="sf-icon-transport"></e-step>
    <e-step iconCss="sf-icon-payment"></e-step>
    <e-step iconCss="sf-icon-success"></e-step>
  </e-steps>
</ejs-stepper>
```

### Labels Only

For text-based navigation without icons:

```html
<ejs-stepper>
  <e-steps>
    <e-step label="Step 1"></e-step>
    <e-step label="Step 2"></e-step>
    <e-step label="Step 3"></e-step>
    <e-step label="Step 4"></e-step>
  </e-steps>
</ejs-stepper>
```

## Setting Active Step

Specify the active step by its index using the `activeStep` property of the Stepper component. The default value is `0`. The `activeStep` property is zero-indexed, so the first step is `0`, the second step is `1`, and so on.

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepperIcon">
      <ejs-stepper activeStep="1">
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
    .stepperIcon {
      padding: 20px;
    }
  `]
})
export class AppComponent { }
```

### Setting Active Step Dynamically

You can also set the active step programmatically using component reference:

```ts
@ViewChild('ejStepper') stepper: StepperComponent | any;

setActiveStep(stepIndex: number) {
  this.stepper.activeStep = stepIndex;
}
```

## Optional Steps

Indicate whether a step is optional using the `optional` property of the `StepModel`. By default, the `optional` property is `false`. Optional steps are typically displayed with an "Optional" label to indicate that users can skip them if needed.

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepperOptional">
      <ejs-stepper>
        <e-steps>
          <e-step iconCss="sf-icon-cart" label="Cart"></e-step>
          <e-step iconCss="sf-icon-transport" label="Delivery"></e-step>
          <e-step iconCss="sf-icon-payment" label="Payment" optional="true"></e-step>
          <e-step iconCss="sf-icon-success" label="Confirmation"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .stepperOptional {
      padding: 20px;
    }
  `]
})
export class AppComponent { }
```

### When to Use Optional Steps

- **Upsell steps**: Additional optional purchases or features
- **Conditional content**: Steps that users might not need to complete
- **Advanced options**: Optional configuration or preferences
- **Follow-up actions**: Post-purchase or post-completion actions

## Disabling Steps

Disable a step to prevent user interaction using the `disabled` property of the `StepModel`. Set it to `true` to disable a step. By default, the value is `false`.

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepperWithIcon">
      <ejs-stepper>
        <e-steps>
          <e-step iconCss="sf-icon-cart"></e-step>
          <e-step iconCss="sf-icon-transport"></e-step>
          <e-step iconCss="sf-icon-payment" disabled="true"></e-step>
          <e-step iconCss="sf-icon-success"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .stepperWithIcon {
      padding: 20px;
    }
  `]
})
export class AppComponent { }
```

### When to Use Disabled Steps

- **Dependency-based steps**: Steps that depend on earlier steps being completed
- **Conditional availability**: Steps that don't apply to the current user/workflow
- **Prerequisite steps**: Steps that require certain conditions to be met
- **Gradual rollout**: Phased release of new workflow steps

## Setting Readonly

Disable user interactions across all steps in the Stepper component using the `readOnly` property. When set to `true`, all steps become non-interactive.

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepperIcon">
      <ejs-stepper readOnly="true">
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
    .stepperIcon {
      padding: 20px;
    }
  `]
})
export class AppComponent { }
```

### When to Use Readonly

- **Review mode**: Display completed workflow in read-only mode
- **Historical view**: Show past process execution without modifications
- **View-only display**: Display stepper information without allowing changes
- **Admin approval mode**: Show step information while awaiting approval

## Step Status

Specify the progress state of each step using the `status` property of the `StepModel`. Possible values are `NotStarted`, `InProgress`, and `Completed`. By default, the value is `NotStarted`. Status helps users understand the progress and state of each step.

```ts
import { Component, ViewChild } from "@angular/core";
import { StepperComponent, StepperChangedEventArgs, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepper-status-section">
      <ejs-stepper #ejStepper id="stepper" (stepChanged)="handleStepChanged($event)">
        <e-steps>
          <e-step iconCss="sf-icon-cart" label="Cart"></e-step>
          <e-step iconCss="sf-icon-payment" label="Payment"></e-step>
          <e-step iconCss="sf-icon-success" label="Confirmation"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
    <div id="paymentStatus">Your payment has not started yet</div>
  `,
  styles: [`
    .stepper-status-section {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  @ViewChild('ejStepper') stepper: StepperComponent | any;

  handleStepChanged = (args: StepperChangedEventArgs) => {
    let status = this.stepper.steps[1].status
    this.updateStatus(status)
  }
  
  updateStatus = (stepStatus: string) => {
    let statusMap = {
      'NotStarted' : { text: 'Your payment has not started yet', color: '#e74d4d' },
      'InProgress' : { text: 'Processing your payment', color: 'orange' },
      'Completed' : { text: 'Payment successful', color: '#4CAF50' }
    }

    let currentStatus = document.getElementById("paymentStatus");
    if (currentStatus) {
      let {text, color } = (statusMap as any)[stepStatus];
      currentStatus.innerText = text;
      currentStatus.style.backgroundColor = color;
    }
  }
}
```

### Status Types

| Status | Visual Indicator | Meaning |
|--------|------------------|---------|
| `Completed` | Checkmark | Step finished successfully |
| `InProgress` | Active indicator | Currently processing |
| `NotStarted` | Neutral | Not yet reached |

## Step Validation

Set the validation state for each step to display a success or error icon using the `isValid` property of the `StepModel`. When set to `true`, a success icon appears; when `false`, an error icon is shown. The default value is `null`, indicating no validation icon.

> Based on the `stepType`, the validation state icon will be displayed either as an indicator or as part of the step label/text.

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepperWithIconLabel">
      <div class="stepper">
        <ejs-stepper>
          <e-steps>
            <e-step iconCss="sf-icon-cart" [isValid]="true"></e-step>
            <e-step iconCss="sf-icon-transport"></e-step>
            <e-step iconCss="sf-icon-payment" [isValid]="false"></e-step>
            <e-step iconCss="sf-icon-success"></e-step>
          </e-steps>
        </ejs-stepper>
      </div>
      <div class="labelStepper">
        <ejs-stepper>
          <e-steps>
            <e-step label="Cart" [isValid]="true"></e-step>
            <e-step label="Address"></e-step>
            <e-step label="Payment" [isValid]="false"></e-step>
            <e-step label="Confirmation"></e-step>
          </e-steps>
        </ejs-stepper>
      </div>
    </div>
  `,
  styles: [`
    .stepperWithIconLabel {
      padding: 20px;
    }
  `]
})
export class AppComponent { }
```

### When to Use Step Validation

- **Form validation**: Show validation status after form submission
- **Multi-step forms**: Indicate which steps have validation errors
- **Process completion**: Display completion status for each step
- **Error indication**: Show steps with issues or errors

## Label Positioning

Configure where step labels are displayed relative to icons and indicators.

### Default Label Position

Labels appear below or beside icons depending on stepper orientation:

```html
<ejs-stepper>
  <e-steps>
    <e-step label="Cart" iconCss="sf-icon-cart"></e-step>
    <e-step label="Delivery" iconCss="sf-icon-transport"></e-step>
    <e-step label="Payment" iconCss="sf-icon-payment"></e-step>
  </e-steps>
</ejs-stepper>
```

### Custom Label Styling

Apply custom CSS classes to position and style labels:

```ts
@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="custom-labels">
      <ejs-stepper>
        <e-steps>
          <e-step label="Personal" 
                   iconCss="sf-icon-profile"
                   cssClass="custom-step"></e-step>
          <e-step label="Address" 
                   iconCss="sf-icon-location"
                   cssClass="custom-step"></e-step>
          <e-step label="Payment" 
                   iconCss="sf-icon-payment"
                   cssClass="custom-step"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .custom-step {
      /* Custom styling for label positioning */
    }
  `]
})
export class AppComponent { }
```

## Dynamic Steps

Create steps dynamically from component data:

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-stepper>
      <e-steps>
        <e-step *ngFor="let step of steps" 
                 [label]="step.label" 
                 [iconCss]="step.icon"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent {
  steps = [
    { label: 'Cart', icon: 'sf-icon-cart' },
    { label: 'Delivery', icon: 'sf-icon-transport' },
    { label: 'Payment', icon: 'sf-icon-payment' },
    { label: 'Complete', icon: 'sf-icon-success' }
  ];
}
```

## Best Practices

1. **Use descriptive labels**: Keep labels concise but meaningful
2. **Consistent icons**: Choose icons that clearly represent each step
3. **Icon + label together**: Use both for better accessibility and clarity
4. **Right icon libraries**: Select icon fonts that match your design system
5. **Optional steps**: Mark optional steps to guide users
6. **Disabled steps**: Disable steps that require previous step completion

**See also:** [step-types.md](step-types.md) for different display styles, [orientations-and-layouts.md](orientations-and-layouts.md) for layout options.
