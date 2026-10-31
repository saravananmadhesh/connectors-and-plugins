# API Reference for Angular Stepper

This comprehensive API reference documents all properties, methods, and events available in the Syncfusion Angular Stepper component.

## Table of Contents
- [Stepper Component Properties](#stepper-component-properties)
- [Step Model Properties](#step-model-properties)
- [Animation Settings](#animation-settings)
- [Stepper Methods](#stepper-methods)
- [Events and Event Arguments](#events-and-event-arguments)
- [Enumerations](#enumerations)

---

## Stepper Component Properties

### activeStep
**Type:** `number`  
**Default:** `0`  
**Description:** Defines the current step index of the Stepper (zero-indexed).

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-stepper activeStep="2">
      <e-steps>
        <e-step label="Step 1"></e-step>
        <e-step label="Step 2"></e-step>
        <e-step label="Step 3"></e-step>
        <e-step label="Step 4"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

### animation
**Type:** `StepperAnimationSettingsModel`  
**Default:** `{ enable: true, duration: 2000, delay: 0 }`  
**Description:** Defines the step progress animation settings.

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule, StepperAnimationSettingsModel } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-stepper [animation]="animationSettings">
      <e-steps>
        <e-step label="Step 1"></e-step>
        <e-step label="Step 2"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent {
  animationSettings: StepperAnimationSettingsModel = {
    enable: true,
    duration: 2000,
    delay: 500
  };
}
```

**See also:** [Animation Settings](#animation-settings) | [advanced-features.md](advanced-features.md#animation-settings)

### cssClass
**Type:** `string`  
**Default:** `-`  
**Description:** Defines CSS class(es) to customize the Stepper appearance.

```ts
@Component({
  template: `
    <ejs-stepper cssClass="custom-stepper">
      <e-steps>
        <e-step label="Step 1"></e-step>
        <e-step label="Step 2"></e-step>
      </e-steps>
    </ejs-stepper>
  `,
  styles: [`
    .custom-stepper :deep(.e-step-container) {
      background-color: #f0f0f0;
    }
  `]
})
export class AppComponent { }
```

### enablePersistence
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enable or disable persisting component's state between page reloads.

```ts
@Component({
  template: `
    <ejs-stepper enablePersistence="true">
      <e-steps>
        <e-step label="Step 1"></e-step>
        <e-step label="Step 2"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

### enableRtl
**Type:** `boolean`  
**Default:** `false`  
**Description:** Enable or disable rendering component in right-to-left direction.

```ts
@Component({
  template: `
    <ejs-stepper [enableRtl]="true">
      <e-steps>
        <e-step label="خطوة 1" iconCss="sf-icon-cart"></e-step>
        <e-step label="خطوة 2" iconCss="sf-icon-payment"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

**See also:** [advanced-features.md](advanced-features.md#rtl-support)

### labelPosition
**Type:** `string | StepLabelPosition`  
**Default:** `Bottom`  
**Description:** Defines the label position in the Stepper. Possible values: `Top`, `Bottom`, `Start`, `End`.

```ts
import { Component, ViewChild } from "@angular/core";
import { StepperComponent, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <div style="margin-bottom: 20px;">
        <label>Label Position: </label>
        <select (change)="changeLabelPosition($event)">
          <option value="Top">Top</option>
          <option value="Bottom">Bottom</option>
          <option value="Start">Start</option>
          <option value="End">End</option>
        </select>
      </div>
      <ejs-stepper #stepper [labelPosition]="currentPosition">
        <e-steps>
          <e-step label="Cart" iconCss="sf-icon-cart"></e-step>
          <e-step label="Delivery" iconCss="sf-icon-transport"></e-step>
          <e-step label="Payment" iconCss="sf-icon-payment"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `
})
export class AppComponent {
  @ViewChild('stepper') stepper!: StepperComponent;
  currentPosition: string = 'Bottom';

  changeLabelPosition(event: any): void {
    this.currentPosition = event.target.value;
  }
}
```

### linear
**Type:** `boolean`  
**Default:** `false`  
**Description:** Defines whether users must complete steps sequentially or can skip to any step.

```ts
@Component({
  template: `
    <ejs-stepper [linear]="true">
      <e-steps>
        <e-step label="Personal Info"></e-step>
        <e-step label="Address"></e-step>
        <e-step label="Payment"></e-step>
        <e-step label="Confirmation"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

**See also:** [validation-and-flow.md](validation-and-flow.md#linear-step-flow)

### locale
**Type:** `string`  
**Default:** `en-US`  
**Description:** Overrides the global culture and localization value for this component.

```ts
@Component({
  template: `
    <ejs-stepper locale="es">
      <e-steps>
        <e-step label="Paso 1"></e-step>
        <e-step label="Paso 2"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

**See also:** [advanced-features.md](advanced-features.md#globalization-and-localization)

### orientation
**Type:** `string | StepperOrientation`  
**Default:** `Horizontal`  
**Description:** Defines the orientation type of the Stepper. Possible values: `Horizontal`, `Vertical`.

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="display: flex; gap: 40px;">
      <div style="flex: 1;">
        <h3>Horizontal</h3>
        <ejs-stepper orientation="Horizontal">
          <e-steps>
            <e-step label="Step 1"></e-step>
            <e-step label="Step 2"></e-step>
            <e-step label="Step 3"></e-step>
          </e-steps>
        </ejs-stepper>
      </div>
      <div style="flex: 1;">
        <h3>Vertical</h3>
        <ejs-stepper orientation="Vertical">
          <e-steps>
            <e-step label="Step 1"></e-step>
            <e-step label="Step 2"></e-step>
            <e-step label="Step 3"></e-step>
          </e-steps>
        </ejs-stepper>
      </div>
    </div>
  `
})
export class AppComponent { }
```

**See also:** [orientations-and-layouts.md](orientations-and-layouts.md)

### readOnly
**Type:** `boolean`  
**Default:** `false`  
**Description:** Defines whether the read-only mode is enabled, preventing user interaction with the Stepper.

```ts
@Component({
  template: `
    <ejs-stepper readOnly="true">
      <e-steps>
        <e-step label="Step 1 - Completed"></e-step>
        <e-step label="Step 2 - Completed"></e-step>
        <e-step label="Step 3 - Completed"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

### showTooltip
**Type:** `boolean`  
**Default:** `false`  
**Description:** Defines whether to show tooltip on each step when hovering.

```ts
@Component({
  template: `
    <ejs-stepper [showTooltip]="true">
      <e-steps>
        <e-step label="Cart" text="Review items"></e-step>
        <e-step label="Delivery" text="Enter address"></e-step>
        <e-step label="Payment" text="Complete payment"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

**See also:** [advanced-features.md](advanced-features.md#tooltips)

### stepType
**Type:** `string | StepType`  
**Default:** `Default`  
**Description:** Defines step display style. Possible values: `Default` (icons with labels), `Label` (labels only), `Indicator` (icons/numbers only).

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="display: flex; flex-direction: column; gap: 40px;">
      <div>
        <h3>Default (Icons + Labels)</h3>
        <ejs-stepper stepType="Default">
          <e-steps>
            <e-step label="Cart" iconCss="sf-icon-cart"></e-step>
            <e-step label="Payment" iconCss="sf-icon-payment"></e-step>
          </e-steps>
        </ejs-stepper>
      </div>
      <div>
        <h3>Label Only</h3>
        <ejs-stepper stepType="Label">
          <e-steps>
            <e-step label="Cart"></e-step>
            <e-step label="Payment"></e-step>
          </e-steps>
        </ejs-stepper>
      </div>
      <div>
        <h3>Indicator Only</h3>
        <ejs-stepper stepType="Indicator">
          <e-steps>
            <e-step iconCss="sf-icon-cart"></e-step>
            <e-step iconCss="sf-icon-payment"></e-step>
          </e-steps>
        </ejs-stepper>
      </div>
    </div>
  `
})
export class AppComponent { }
```

**See also:** [step-types.md](step-types.md)

### steps
**Type:** `StepModel[]`  
**Default:** `-`  
**Description:** Defines the list of steps in the Stepper.

```ts
import { Component } from "@angular/core";
import { StepModel, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-stepper [steps]="steps">
    </ejs-stepper>
  `
})
export class AppComponent {
  steps: StepModel[] = [
    { label: 'Cart', iconCss: 'sf-icon-cart' },
    { label: 'Delivery', iconCss: 'sf-icon-transport' },
    { label: 'Payment', iconCss: 'sf-icon-payment' },
    { label: 'Confirmation', iconCss: 'sf-icon-success' }
  ];
}
```

### template
**Type:** `string | object`  
**Default:** `-`  
**Description:** Defines custom template content for the stepper. Can be used for custom step rendering.

```ts
@Component({
  template: `
    <ejs-stepper [template]="'<span>${text}</span>'">
      <e-steps>
        <e-step label="Step 1" text="Getting Started"></e-step>
        <e-step label="Step 2" text="Configuration"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

**See also:** [templates-and-customization.md](templates-and-customization.md)

### tooltipTemplate
**Type:** `string | object`  
**Default:** `-`  
**Description:** Defines custom template content for the tooltip displayed on step hover.

```ts
@Component({
  template: `
    <ejs-stepper [showTooltip]="true" [tooltipTemplate]="tooltipTemplate">
      <e-steps>
        <e-step label="Step 1"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent {
  tooltipTemplate: any = '<div>Custom Tooltip</div>';
}
```

---

## Step Model Properties

### cssClass
**Type:** `string`  
**Default:** `-`  
**Description:** Defines CSS class(es) to customize individual step appearance.

```ts
@Component({
  template: `
    <ejs-stepper>
      <e-steps>
        <e-step label="Completed" cssClass="completed-step"></e-step>
        <e-step label="Active" cssClass="active-step"></e-step>
        <e-step label="Disabled" cssClass="disabled-step"></e-step>
      </e-steps>
    </ejs-stepper>
  `,
  styles: [`
    :deep(.completed-step) {
      color: green;
      font-weight: bold;
    }
    :deep(.active-step) {
      color: blue;
    }
    :deep(.disabled-step) {
      opacity: 0.5;
    }
  `]
})
export class AppComponent { }
```

### disabled
**Type:** `boolean`  
**Default:** `false`  
**Description:** Defines whether a step is disabled and cannot be clicked.

```ts
@Component({
  template: `
    <ejs-stepper>
      <e-steps>
        <e-step label="Enabled" iconCss="sf-icon-cart"></e-step>
        <e-step label="Disabled" iconCss="sf-icon-payment" disabled="true"></e-step>
        <e-step label="Enabled" iconCss="sf-icon-success"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

**See also:** [steps-configuration.md](steps-configuration.md#disabling-steps)

### iconCss
**Type:** `string`  
**Default:** `-`  
**Description:** Defines the icon CSS class for the step indicator.

```ts
@Component({
  template: `
    <ejs-stepper>
      <e-steps>
        <e-step iconCss="sf-icon-cart"></e-step>
        <e-step iconCss="sf-icon-transport"></e-step>
        <e-step iconCss="sf-icon-payment"></e-step>
        <e-step iconCss="sf-icon-success"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

### isValid
**Type:** `boolean | null`  
**Default:** `null`  
**Description:** Defines the validation state. `true` shows success, `false` shows error, `null` shows no validation icon.

```ts
@Component({
  template: `
    <ejs-stepper>
      <e-steps>
        <e-step label="Valid" [isValid]="true"></e-step>
        <e-step label="Invalid" [isValid]="false"></e-step>
        <e-step label="Not Validated"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

**See also:** [validation-and-flow.md](validation-and-flow.md#step-validation)

### label
**Type:** `string`  
**Default:** `-`  
**Description:** Defines the text label displayed for the step.

```ts
@Component({
  template: `
    <ejs-stepper>
      <e-steps>
        <e-step label="Personal Information"></e-step>
        <e-step label="Delivery Address"></e-step>
        <e-step label="Payment Method"></e-step>
        <e-step label="Order Confirmation"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

### optional
**Type:** `boolean`  
**Default:** `false`  
**Description:** Defines whether the step is optional and can be skipped.

```ts
@Component({
  template: `
    <ejs-stepper>
      <e-steps>
        <e-step label="Shipping" iconCss="sf-icon-transport"></e-step>
        <e-step label="Gift Options" iconCss="sf-icon-gift" optional="true"></e-step>
        <e-step label="Payment" iconCss="sf-icon-payment"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

**See also:** [steps-configuration.md](steps-configuration.md#optional-steps)

### status
**Type:** `string | StepStatus`  
**Default:** `NotStarted`  
**Description:** Defines the progress status of the step. Possible values: `NotStarted`, `InProgress`, `Completed`.

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
        <e-step label="Step 1" status="Completed"></e-step>
        <e-step label="Step 2" status="InProgress"></e-step>
        <e-step label="Step 3" status="NotStarted"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

**See also:** [validation-and-flow.md](validation-and-flow.md#step-status)

### text
**Type:** `string`  
**Default:** `-`  
**Description:** Defines additional text content for the step (used with Indicator step type).

```ts
@Component({
  template: `
    <ejs-stepper stepType="Indicator">
      <e-steps>
        <e-step text="A"></e-step>
        <e-step text="B"></e-step>
        <e-step text="C"></e-step>
        <e-step text="D"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent { }
```

---

## Animation Settings

### StepperAnimationSettingsModel

**Description:** Configures animation behavior for step transitions.

#### enable
**Type:** `boolean`  
**Default:** `true`  
**Description:** Enable or disable animations.

#### duration
**Type:** `number`  
**Default:** `2000`  
**Description:** Animation duration in milliseconds.

#### delay
**Type:** `number`  
**Default:** `0`  
**Description:** Delay before animation starts, in milliseconds.

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule, StepperAnimationSettingsModel } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-stepper [animation]="animationSettings">
      <e-steps>
        <e-step label="Step 1"></e-step>
        <e-step label="Step 2"></e-step>
        <e-step label="Step 3"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent {
  animationSettings: StepperAnimationSettingsModel = {
    enable: true,
    duration: 1500,
    delay: 100
  };
}
```

**See also:** [advanced-features.md](advanced-features.md#animation-settings)

---

## Stepper Methods

### destroy()
**Returns:** `void`  
**Description:** Destroys the Stepper control and removes it from the DOM.

```ts
import { Component, ViewChild } from "@angular/core";
import { StepperComponent, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <button (click)="destroyStepper()">Destroy Stepper</button>
    <ejs-stepper #stepper>
      <e-steps>
        <e-step label="Step 1"></e-step>
        <e-step label="Step 2"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent {
  @ViewChild('stepper') stepper!: StepperComponent;

  destroyStepper(): void {
    this.stepper.destroy();
  }
}
```

### nextStep()
**Returns:** `void`  
**Description:** Moves to the next step from the current step in the Stepper.

```ts
import { Component, ViewChild } from "@angular/core";
import { StepperComponent, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <button (click)="goToNext()">Next Step</button>
      <p>Current Step: {{ currentStep }}</p>
      <ejs-stepper #stepper (stepChanged)="onStepChanged($event)">
        <e-steps>
          <e-step label="Step 1"></e-step>
          <e-step label="Step 2"></e-step>
          <e-step label="Step 3"></e-step>
          <e-step label="Step 4"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `
})
export class AppComponent {
  @ViewChild('stepper') stepper!: StepperComponent;
  currentStep = 0;

  goToNext(): void {
    this.stepper.nextStep();
  }

  onStepChanged(args: any): void {
    this.currentStep = args.activeStep;
  }
}
```

### previousStep()
**Returns:** `void`  
**Description:** Moves to the previous step from the current step in the Stepper.

```ts
import { Component, ViewChild } from "@angular/core";
import { StepperComponent, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <button (click)="goToPrevious()">Previous Step</button>
      <p>Current Step: {{ currentStep }}</p>
      <ejs-stepper #stepper (stepChanged)="onStepChanged($event)">
        <e-steps>
          <e-step label="Step 1"></e-step>
          <e-step label="Step 2"></e-step>
          <e-step label="Step 3"></e-step>
          <e-step label="Step 4"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `
})
export class AppComponent {
  @ViewChild('stepper') stepper!: StepperComponent;
  currentStep = 0;

  goToPrevious(): void {
    this.stepper.previousStep();
  }

  onStepChanged(args: any): void {
    this.currentStep = args.activeStep;
  }
}
```

### refreshProgressbar()
**Returns:** `void`  
**Description:** Refreshes the position of the progress bar programmatically when the dimensions of the parent container change.

```ts
import { Component, ViewChild } from "@angular/core";
import { StepperComponent, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <button (click)="refreshBar()">Refresh Progress Bar</button>
      <button (click)="toggleWidth()">Toggle Container Width</button>
      <div [style.width]="containerWidth">
        <ejs-stepper #stepper>
          <e-steps>
            <e-step label="Step 1"></e-step>
            <e-step label="Step 2"></e-step>
            <e-step label="Step 3"></e-step>
          </e-steps>
        </ejs-stepper>
      </div>
    </div>
  `,
  styles: [`
    div {
      transition: width 0.3s ease;
    }
  `]
})
export class AppComponent {
  @ViewChild('stepper') stepper!: StepperComponent;
  containerWidth = '100%';

  refreshBar(): void {
    this.stepper.refreshProgressbar();
  }

  toggleWidth(): void {
    this.containerWidth = this.containerWidth === '100%' ? '50%' : '100%';
    setTimeout(() => this.refreshBar(), 300);
  }
}
```

### reset()
**Returns:** `void`  
**Description:** Resets the Stepper state to initial values and moves to the first step.

```ts
import { Component, ViewChild } from "@angular/core";
import { StepperComponent, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <button (click)="resetStepper()">Reset Stepper</button>
      <p>Current Step: {{ currentStep }}</p>
      <ejs-stepper #stepper (stepChanged)="onStepChanged($event)">
        <e-steps>
          <e-step label="Step 1"></e-step>
          <e-step label="Step 2"></e-step>
          <e-step label="Step 3"></e-step>
          <e-step label="Step 4"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `
})
export class AppComponent {
  @ViewChild('stepper') stepper!: StepperComponent;
  currentStep = 0;

  resetStepper(): void {
    this.stepper.reset();
  }

  onStepChanged(args: any): void {
    this.currentStep = args.activeStep;
  }
}
```

---

## Events and Event Arguments

### created
**Description:** Event triggered after the Stepper component is fully initialized and rendered.

```ts
@Component({
  template: `
    <ejs-stepper (created)="onCreated()">
      <e-steps>
        <e-step label="Step 1"></e-step>
        <e-step label="Step 2"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent {
  onCreated(): void {
    console.log('Stepper has been created and initialized');
  }
}
```

### stepChanged
**Description:** Event triggered after the active step has changed. Provides information about the new and previous step indices.

**Event Arguments:**
- `activeStep` (number): Index of the currently active step
- `previousStep` (number): Index of the previously active step
- `isInteracted` (boolean): Whether the change was triggered by user interaction
- `event` (Event): The original browser event
- `element` (HTMLElement): The Stepper DOM element
- `name` (string): Event name

```ts
import { Component } from "@angular/core";
import { StepperChangedEventArgs, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <p>Current Step: {{ activeStep + 1 }} | Previous Step: {{ previousStep + 1 }}</p>
      <p>User Interaction: {{ isInteracted }}</p>
      <ejs-stepper (stepChanged)="onStepChanged($event)">
        <e-steps>
          <e-step label="Step 1"></e-step>
          <e-step label="Step 2"></e-step>
          <e-step label="Step 3"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `
})
export class AppComponent {
  activeStep = 0;
  previousStep = 0;
  isInteracted = false;

  onStepChanged(args: StepperChangedEventArgs): void {
    console.log('Step changed:', args);
    this.activeStep = args.activeStep;
    this.previousStep = args.previousStep;
    this.isInteracted = args.isInteracted;
  }
}
```

**See also:** [events-and-interactions.md](events-and-interactions.md#stepchanged-event)

### stepChanging
**Description:** Event triggered before the active step changes. Can be used to validate or prevent step transition.

**Event Arguments:**
- `activeStep` (number): Index of the step being navigated to
- `previousStep` (number): Index of the current step
- `isInteracted` (boolean): Whether triggered by user interaction
- `cancel` (boolean): Set to `true` to prevent the step change
- `event` (Event): The original browser event
- `element` (HTMLElement): The Stepper DOM element
- `name` (string): Event name

```ts
import { Component } from "@angular/core";
import { StepperChangingEventArgs, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <p>Validation Message: {{ validationMessage }}</p>
      <ejs-stepper (stepChanging)="onStepChanging($event)">
        <e-steps>
          <e-step label="Information"></e-step>
          <e-step label="Confirmation"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `
})
export class AppComponent {
  validationMessage = '';

  onStepChanging(args: StepperChangingEventArgs): void {
    console.log('Step changing:', args);
    
    if (args.previousStep === 0 && args.activeStep === 1) {
      // Validate before allowing step change
      if (!this.isInformationComplete()) {
        args.cancel = true;
        this.validationMessage = 'Please complete all required fields';
      }
    }
  }

  isInformationComplete(): boolean {
    // Your validation logic
    return true;
  }
}
```

**See also:** [events-and-interactions.md](events-and-interactions.md#stepchanging-event)

### stepClick
**Description:** Event triggered when a user clicks on a step.

**Event Arguments:**
- `activeStep` (number): Index of the clicked step
- `previousStep` (number): Index of the previously active step
- `event` (Event): The original browser event
- `element` (HTMLElement): The Stepper DOM element
- `name` (string): Event name

```ts
import { Component } from "@angular/core";
import { StepperClickEventArgs, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <p>Clicked Step: {{ clickedStep }}</p>
      <ejs-stepper (stepClick)="onStepClick($event)">
        <e-steps>
          <e-step label="Step 1"></e-step>
          <e-step label="Step 2"></e-step>
          <e-step label="Step 3"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `
})
export class AppComponent {
  clickedStep = 0;

  onStepClick(args: StepperClickEventArgs): void {
    console.log('Step clicked:', args);
    this.clickedStep = args.activeStep;
  }
}
```

**See also:** [events-and-interactions.md](events-and-interactions.md#stepclick-event)

### beforeStepRender
**Description:** Event triggered before each step is rendered. Can be used to customize step appearance dynamically.

**Event Arguments:**
- `index` (number): Index of the step being rendered
- `element` (HTMLElement): The Stepper DOM element
- `name` (string): Event name

```ts
import { Component } from "@angular/core";
import { StepperRenderingEventArgs, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-stepper (beforeStepRender)="onBeforeStepRender($event)">
      <e-steps>
        <e-step label="Step 1"></e-step>
        <e-step label="Step 2"></e-step>
        <e-step label="Step 3"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent {
  onBeforeStepRender(args: StepperRenderingEventArgs): void {
    console.log('Rendering step:', args.index);
    // Customize step appearance before rendering
    if (args.index === 1) {
      // Apply custom styling to step 2
      console.log('Step 2 is about to be rendered');
    }
  }
}
```

**See also:** [events-and-interactions.md](events-and-interactions.md#beforesteprender-event)

---

## Enumerations

### StepType
Defines the display style of steps in the Stepper.

```ts
export enum StepType {
  Default = 'Default',      // Icons with labels
  Label = 'Label',          // Labels only
  Indicator = 'Indicator'   // Icons or numbers only
}
```

### StepStatus
Defines the progress status of a step.

```ts
export enum StepStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Completed = 'Completed'
}
```

### StepLabelPosition
Defines the position of step labels relative to indicators.

```ts
export enum StepLabelPosition {
  Top = 'Top',       // Label above indicator
  Bottom = 'Bottom',  // Label below indicator
  Start = 'Start',    // Label on the left side
  End = 'End'         // Label on the right side
}
```

### StepperOrientation
Defines the layout orientation of the Stepper.

```ts
export enum StepperOrientation {
  Horizontal = 'Horizontal',  // Steps arranged horizontally
  Vertical = 'Vertical'       // Steps arranged vertically
}
```

---

## Related Documentation

- [Getting Started](getting-started.md)
- [Steps Configuration](steps-configuration.md)
- [Step Types](step-types.md)
- [Orientations and Layouts](orientations-and-layouts.md)
- [Events and Interactions](events-and-interactions.md)
- [Validation and Flow Control](validation-and-flow.md)
- [Templates and Customization](templates-and-customization.md)
- [Advanced Features](advanced-features.md)
