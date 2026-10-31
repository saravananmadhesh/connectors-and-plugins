# Button - How-To Patterns (TypeScript)

## Table of Contents
- [Create a Block (Full-Width) Button](#create-a-block-full-width-button)
- [Create a Rounded-Corner Button](#create-a-rounded-corner-button)
- [Add a Navigation Link to a Button](#add-a-navigation-link-to-a-button)
- [Customize Button Appearance with CSS](#customize-button-appearance-with-css)
- [Set the Disabled State](#set-the-disabled-state)
- [Enable Right-to-Left (RTL) Support](#enable-right-to-left-rtl-support)
- [Add a Tooltip on Hover](#add-a-tooltip-on-hover)
- [Implement a Toggle Button](#implement-a-toggle-button)
- [Handle Button State Changes](#handle-button-state-changes)

## Create a Block (Full-Width) Button

Create a button that spans the full width of its container:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

const blockBtn: Button = new Button({
  content: 'Full Width Button',
  cssClass: 'e-block e-primary'
});
blockBtn.appendTo('#blockButton');
```

**HTML:**
```html
<div style="width: 100%; max-width: 400px;">
  <button id="blockButton"></button>
</div>
```

**CSS:**
```css
button {
  margin: 5px 0;
}
```

## Create a Rounded-Corner Button

Apply rounded corners to a button:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

const roundedBtn: Button = new Button({
  content: 'Rounded Button',
  cssClass: 'e-round-corner e-primary'
});
roundedBtn.appendTo('#roundedButton');
```

**Custom rounded style:**
```typescript
const customRounded: Button = new Button({
  content: 'Custom Rounded',
  cssClass: 'e-primary custom-rounded'
});
customRounded.appendTo('#customRoundedButton');
```

**CSS:**
```css
.custom-rounded {
  border-radius: 20px;
  padding: 10px 20px;
}
```

## Add a Navigation Link to a Button

Style an anchor tag as a button:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

// Convert anchor to button
const linkBtn: Button = new Button({
  cssClass: 'e-primary'
});
linkBtn.appendTo('#navLink');
```

**HTML:**
```html
<a id="navLink" href="/dashboard" style="text-decoration: none;">
  Go to Dashboard
</a>
```

**Or use programmatic navigation:**
```typescript
const navBtn: Button = new Button({
  content: 'Navigate',
  cssClass: 'e-primary',
  click: (): void => {
    window.location.href = '/dashboard';
  }
});
navBtn.appendTo('#navigateButton');
```

## Customize Button Appearance with CSS

Override default styles with custom CSS:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

const customBtn: Button = new Button({
  content: 'Custom Style',
  cssClass: 'e-primary custom-button'
});
customBtn.appendTo('#customButton');
```

**CSS:**
```css
.custom-button {
  background-color: #ff6b35 !important;
  border-color: #ff6b35 !important;
  font-weight: bold;
  font-size: 16px;
  padding: 12px 24px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.custom-button:hover {
  background-color: #ff5520 !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.custom-button:active {
  transform: translateY(0);
}
```

## Set the Disabled State

Disable a button programmatically:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

const disabledBtn: Button = new Button({
  content: 'Disabled',
  disabled: true,
  cssClass: 'e-primary'
});
disabledBtn.appendTo('#disabledButton');
```

**Enable/Disable dynamically:**
```typescript
const toggleDisableBtn: Button = new Button({
  content: 'Click to Disable',
  cssClass: 'e-primary',
  click: (): void => {
    toggleDisableBtn.disabled = !toggleDisableBtn.disabled;
    toggleDisableBtn.content = toggleDisableBtn.disabled ? 'Disabled' : 'Enabled';
    toggleDisableBtn.dataBind();
  }
});
toggleDisableBtn.appendTo('#toggleDisableButton');
```

## Enable Right-to-Left (RTL) Support

Support RTL languages like Arabic and Hebrew:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

const rtlBtn: Button = new Button({
  content: 'مرحبا',
  cssClass: 'e-primary',
  enableRtl: true
});
rtlBtn.appendTo('#rtlButton');
```

**Global RTL:**
```typescript
import { enableRtl } from '@syncfusion/ej2-base';

// Enable RTL for all components
enableRtl(true);

const button: Button = new Button({
  content: 'Button',
  cssClass: 'e-primary'
});
button.appendTo('#button');
```

## Add a Tooltip on Hover

Add helpful tooltip text to button on hover:

```typescript
import { Button } from '@syncfusion/ej2-buttons';
import { Tooltip } from '@syncfusion/ej2-popups';

const btnWithTooltip: Button = new Button({
  content: 'Save',
  iconCss: 'e-icons e-save',
  cssClass: 'e-primary'
});
btnWithTooltip.appendTo('#tooltipButton');

// Add tooltip
const tooltip: Tooltip = new Tooltip({
  content: 'Click to save your changes',
  position: 'TopCenter'
});
tooltip.appendTo('#tooltipButton');
```

**HTML:**
```html
<button id="tooltipButton"></button>
```

**Native HTML title attribute:**
```html
<button id="simpleTooltip" title="Click to save your changes">Save</button>
```

```typescript
import { Button } from '@syncfusion/ej2-buttons';

const btn: Button = new Button({ cssClass: 'e-primary' });
btn.appendTo('#simpleTooltip');
```

## Implement a Toggle Button

Create a button that toggles between on/off states:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

const toggleBtn: Button = new Button({
  content: 'Play',
  iconCss: 'e-icons e-media-play',
  isToggle: true,
  cssClass: 'e-primary'
});
toggleBtn.appendTo('#toggleButton');

// Listen to state changes
toggleBtn.element.addEventListener('click', (): void => {
  const isActive = toggleBtn.element.classList.contains('e-active');
  if (isActive) {
    toggleBtn.content = 'Pause';
    toggleBtn.iconCss = 'e-icons e-media-pause';
  } else {
    toggleBtn.content = 'Play';
    toggleBtn.iconCss = 'e-icons e-media-play';
  }
  toggleBtn.dataBind();
});
```

## Handle Button State Changes

Manage button states based on conditions:

```typescript
import { Button } from '@syncfusion/ej2-buttons';

class FormSubmitManager {
  private submitBtn: Button;
  private isSubmitting: boolean = false;

  constructor() {
    this.submitBtn = new Button({
      content: 'Submit',
      cssClass: 'e-primary',
      click: (): void => this.handleSubmit()
    });
    this.submitBtn.appendTo('#submitButton');
  }

  private async handleSubmit(): Promise<void> {
    if (this.isSubmitting) return;

    // Set loading state
    this.isSubmitting = true;
    this.submitBtn.content = 'Submitting...';
    this.submitBtn.disabled = true;
    this.submitBtn.dataBind();

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Success state
      this.submitBtn.content = 'Submitted!';
      this.submitBtn.cssClass = 'e-success';
      this.submitBtn.dataBind();

      // Reset after 2 seconds
      setTimeout((): void => {
        this.submitBtn.content = 'Submit';
        this.submitBtn.cssClass = 'e-primary';
        this.submitBtn.disabled = false;
        this.isSubmitting = false;
        this.submitBtn.dataBind();
      }, 2000);
    } catch (error) {
      // Error state
      this.submitBtn.content = 'Error - Retry';
      this.submitBtn.cssClass = 'e-danger';
      this.submitBtn.disabled = false;
      this.isSubmitting = false;
      this.submitBtn.dataBind();
    }
  }
}

const manager = new FormSubmitManager();
```

## Best Practices

1. **Use semantic colors:** Use `e-danger` for delete, `e-success` for confirm
2. **Provide visual feedback:** Show loading/disabled states during operations
3. **Icon positioning:** Use `iconPosition: 'Left'` for actions, `'Right'` for emphasis
4. **Accessibility:** Always include text with icons for screen readers
5. **Disabled state:** Always disable buttons during async operations
6. **Tooltip:** Add helpful tooltips for non-obvious actions
7. **RTL support:** Test buttons in RTL mode if supporting international users
