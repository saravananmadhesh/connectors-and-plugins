# Accessibility in Angular Progress Bar

## Table of Contents

- [WCAG 2.1 Compliance](#wcag-21-compliance)
  - [Success Criteria 1.4.3: Contrast (Minimum)](#success-criteria-143-contrast-minimum)
  - [WCAG Compliant Color Combinations](#wcag-compliant-color-combinations)
  - [Success Criteria 4.1.3: Name, Role, Value](#success-criteria-413-name-role-value)
- [WAI-ARIA Attributes](#wai-aria-attributes)
  - [aria-valuenow, aria-valuemin, aria-valuemax](#aria-valuenow-aria-valuemin-aria-valuemax)
  - [aria-label and aria-labelledby](#aria-label-and-aria-labelledby)
  - [aria-live for Dynamic Updates](#aria-live-for-dynamic-updates)
- [Keyboard Navigation](#keyboard-navigation)
  - [Focusable Progress Bar (Interactive)](#focusable-progress-bar-interactive)
  - [Keyboard Shortcuts for Controls](#keyboard-shortcuts-for-controls)
- [Screen Reader Support](#screen-reader-support)
  - [Semantic Structure](#semantic-structure)
  - [Descriptive Progress Information](#descriptive-progress-information)
- [Color Contrast](#color-contrast)
  - [Testing Contrast Ratios](#testing-contrast-ratios)
  - [High Contrast Mode Support](#high-contrast-mode-support)
- [Testing Accessibility](#testing-accessibility)
  - [Automated Testing with axe](#automated-testing-with-axe)
  - [Manual Accessibility Checklist](#manual-accessibility-checklist)
- [Best Practices](#best-practices)
  - [1. Always Include Labels](#1-always-include-labels)
  - [2. Provide Context Information](#2-provide-context-information)
  - [3. Announce Completion](#3-announce-completion)
  - [4. Handle Errors Accessibly](#4-handle-errors-accessibly)
  - [5. Mobile Accessibility](#5-mobile-accessibility)
- [Accessibility Resources](#accessibility-resources)

## WCAG 2.1 Compliance

The Progress Bar component should meet WCAG 2.1 Level AA standards. Key compliance areas:

### Success Criteria 1.4.3: Contrast (Minimum)

Ensure progress color and track color have sufficient contrast ratio (minimum 4.5:1 for text, 3:1 for graphics).

```typescript
import { Component } from '@angular/core';
import { ProgressBarModule } from '@syncfusion/ej2-angular-progressbar';

@Component({
  selector: 'app-wcag-compliant',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <!-- ✓ WCAG AA Compliant: Contrast ratio 5.5:1 -->
      <ejs-progressbar
        id="wcag" 
        [value]="70"
        type="Linear"
        height="20"
        progressColor="#0078D4"
        trackColor="#E5F0FA">
      </ejs-progressbar>

      <!-- ✗ NOT WCAG Compliant: Contrast ratio too low -->
      <ejs-progressbar 
        [value]="70"
        type="Linear"
        height="20"
        progressColor="#B0C4E0"
        trackColor="#D0E0F0">
      </ejs-progressbar>
    </div>
  `
})
export class WCAGCompliantComponent {
}
```

### WCAG Compliant Color Combinations

**✓ Recommended Combinations:**

| Progress Color | Track Color | Contrast Ratio | Level |
|---|---|---|---|
| #0078D4 (Blue) | #E5F0FA (Light Blue) | 5.5:1 | AA ✓ |
| #4CAF50 (Green) | #E8F5E9 (Light Green) | 6.2:1 | AAA ✓ |
| #F44336 (Red) | #FFEBEE (Light Red) | 5.8:1 | AA ✓ |
| #FF9800 (Orange) | #FFE8D6 (Light Orange) | 4.5:1 | AA ✓ |

### Success Criteria 4.1.3: Name, Role, Value

Provide accessible names and states:

```typescript
@Component({
  selector: 'app-progress-with-aria',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div>
      <!-- Wrapper with ARIA description -->
      <div role="group" [attr.aria-labelledby]="'progress-label'">
        <label id="progress-label">File Upload Progress</label>
        <ejs-progressbar 
          [value]="progress"
          type="Linear"
          height="20"
          [attr.aria-valuenow]="progress"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="100"
          aria-label="Upload progress">
        </ejs-progressbar>
        <div [attr.aria-live]="'polite'" aria-atomic="true">
          {{ progress }}% Complete
        </div>
      </div>
    </div>
  `
})
export class ProgressWithAriaComponent {
  progress = 45;
}
```

## WAI-ARIA Attributes

Implement these ARIA attributes for accessibility:

### aria-valuenow, aria-valuemin, aria-valuemax

```typescript
@Component({
  selector: 'app-aria-attributes',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="currentValue"
      type="Linear"
      height="20"
      [attr.aria-valuenow]="currentValue"
      [attr.aria-valuemin]="0"
      [attr.aria-valuemax]="100"
      [attr.aria-label]="'Task progress, ' + currentValue + ' percent'">
    </ejs-progressbar>
  `
})
export class AriaAttributesComponent {
  currentValue = 65;
}
```

### aria-label and aria-labelledby

```typescript
@Component({
  selector: 'app-aria-labels',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <!-- Method 1: Using aria-label -->
    <ejs-progressbar 
      [value]="50"
      type="Linear"
      aria-label="System backup progress">
    </ejs-progressbar>

    <!-- Method 2: Using aria-labelledby -->
    <div>
      <h3 id="upload-label">Video Upload</h3>
      <ejs-progressbar 
        [value]="75"
        type="Linear"
        [attr.aria-labelledby]="'upload-label'">
      </ejs-progressbar>
    </div>
  `
})
export class AriaLabelsComponent {
}
```

### aria-live for Dynamic Updates

```typescript
@Component({
  selector: 'app-aria-live',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <ejs-progressbar 
        [value]="progress"
        type="Linear"
        height="20"
        [attr.aria-valuenow]="progress"
        aria-label="Download progress">
      </ejs-progressbar>

      <!-- Screen readers announce updates -->
      <div 
        [attr.aria-live]="'polite'"
        [attr.aria-atomic]="'true'"
        style="margin-top: 10px; font-weight: bold;">
        {{ progress }}% Complete
      </div>
    </div>
  `
})
export class AriaLiveComponent implements OnInit {
  progress = 0;

  ngOnInit() {
    const interval = setInterval(() => {
      this.progress += 10;
      if (this.progress > 100) {
        clearInterval(interval);
      }
    }, 500);
  }
}
```

## Keyboard Navigation

### Focusable Progress Bar (Interactive)

```typescript
@Component({
  selector: 'app-keyboard-nav',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <label for="progress-input">Adjust Progress:</label>
      
      <!-- Range input for keyboard control -->
      <input 
        id="progress-input"
        type="range" 
        min="0" 
        max="100" 
        [value]="progress"
        (input)="onProgressChange($event)"
        aria-label="Progress slider"
        style="margin-left: 10px;">

      <!-- Display progress -->
      <ejs-progressbar 
        [value]="progress"
        type="Linear"
        height="20"
        aria-label="Current progress">
      </ejs-progressbar>

      <p style="margin-top: 10px;">{{ progress }}% Complete</p>
    </div>
  `
})
export class KeyboardNavComponent {
  progress = 50;

  onProgressChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.progress = parseInt(input.value);
  }
}
```

### Keyboard Shortcuts for Controls

```typescript
@Component({
  selector: 'app-keyboard-shortcuts',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <p>Use arrow keys or Shift+Tab to navigate</p>
      
      <button 
        (click)="decreaseProgress()"
        (keydown)="onKeyDown($event)"
        aria-label="Decrease progress">
        - Decrease
      </button>

      <ejs-progressbar 
        [value]="progress"
        type="Linear"
        height="25"
        aria-label="Current progress value">
      </ejs-progressbar>

      <button 
        (click)="increaseProgress()"
        (keydown)="onKeyDown($event)"
        aria-label="Increase progress">
        + Increase
      </button>
    </div>
  `,
  styles: [`
    button {
      margin-right: 10px;
      padding: 8px 16px;
      cursor: pointer;
    }
  `]
})
export class KeyboardShortcutsComponent {
  progress = 50;

  decreaseProgress() {
    this.progress = Math.max(0, this.progress - 10);
  }

  increaseProgress() {
    this.progress = Math.min(100, this.progress + 10);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      this.decreaseProgress();
    } else if (event.key === 'ArrowRight') {
      this.increaseProgress();
    }
  }
}
```

## Screen Reader Support

### Semantic Structure

```typescript
@Component({
  selector: 'app-screen-reader',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div role="region" aria-label="Task progress section">
      <!-- Semantic heading -->
      <h2>File Processing Status</h2>

      <!-- Progress container with ARIA -->
      <div role="group" [attr.aria-labelledby]="'file-label'">
        <label id="file-label">Uploading document.pdf</label>
        
        <ejs-progressbar 
          [value]="uploadProgress"
          type="Linear"
          height="20"
          [attr.aria-valuenow]="uploadProgress"
          [attr.aria-valuemin]="0"
          [attr.aria-valuemax]="100"
          aria-label="Upload progress percentage">
        </ejs-progressbar>

        <!-- Status message updated for screen readers -->
        <p [attr.aria-live]="'polite'" role="status">
          {{ uploadProgress }}% uploaded, {{ remainingSize }}MB remaining
        </p>
      </div>
    </div>
  `
})
export class ScreenReaderComponent {
  uploadProgress = 65;
  remainingSize = 35;
}
```

### Descriptive Progress Information

```typescript
@Component({
  selector: 'app-descriptive-progress',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="margin: 20px;">
      <!-- Main progress -->
      <h3>System Backup</h3>
      <ejs-progressbar 
        [value]="backupProgress"
        type="Linear"
        height="20"
        aria-label="System backup progress">
      </ejs-progressbar>

      <!-- Detailed status for screen readers -->
      <div style="margin-top: 10px;">
        <p><strong>Status:</strong> <span aria-live="polite">{{ getStatusText() }}</span></p>
        <p><strong>Time Elapsed:</strong> {{ timeElapsed }}</p>
        <p><strong>Estimated Time:</strong> {{ estimatedTime }}</p>
      </div>
    </div>
  `
})
export class DescriptiveProgressComponent {
  backupProgress = 45;
  timeElapsed = '2:30';
  estimatedTime = '3:45';

  getStatusText(): string {
    if (this.backupProgress === 100) return 'Backup complete';
    if (this.backupProgress > 70) return 'Backup in final stages';
    if (this.backupProgress > 30) return 'Backup in progress';
    return 'Starting backup...';
  }
}
```

## Color Contrast

### Testing Contrast Ratios

Use these tools to verify contrast:
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- WAVE: https://wave.webaim.org/

### High Contrast Mode Support

```typescript
@Component({
  selector: 'app-high-contrast',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <ejs-progressbar 
      [value]="70"
      type="Linear"
      height="20"
      [progressColor]="isHighContrast ? '#000000' : '#1976D2'"
      [trackColor]="isHighContrast ? '#FFFFFF' : '#E3F2FD'"
      aria-label="Task progress"
      style="border: 2px solid #000000;">
    </ejs-progressbar>
  `
})
export class HighContrastComponent {
  isHighContrast =
    window.matchMedia('(prefers-contrast: more)').matches;
}
```

## Testing Accessibility

### Automated Testing with axe

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-accessibility-test',
  standalone: true,
  template: `
    <ejs-progressbar 
      [value]="50"
      type="Linear"
      aria-label="Test progress bar">
    </ejs-progressbar>
  `
})
export class AccessibilityTestComponent {
}

// In your test file
import { axe } from 'jasmine-axe';

describe('ProgressBar Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const results = await axe(document);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Accessibility Checklist

```
Keyboard Navigation:
[ ] Tab key focuses element
[ ] Shift+Tab unfocuses element
[ ] Enter/Space activates controls
[ ] Arrow keys adjust values

Screen Reader:
[ ] Component has descriptive label
[ ] Progress value is announced
[ ] Status updates are announced
[ ] Errors are communicated

Visual:
[ ] Sufficient color contrast (4.5:1 minimum)
[ ] Not color-dependent only
[ ] Focus indicators visible
[ ] Works in high contrast mode

Mobile/Touch:
[ ] Touch targets ≥48x48px
[ ] Touch area not overlapping
[ ] No hover-dependent content
```

## Best Practices

### 1. Always Include Labels

```typescript
@Component({
  selector: 'app-labeled-progress',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <!-- ✓ Good: Label associated with progress -->
    <label for="upload-progress">File Upload</label>
    <ejs-progressbar 
      id="upload-progress"
      [value]="50"
      type="Linear">
    </ejs-progressbar>

    <!-- ✗ Bad: No label -->
    <ejs-progressbar [value]="50" type="Linear"></ejs-progressbar>
  `
})
export class LabeledProgressComponent {
}
```

### 2. Provide Context Information

```typescript
@Component({
  selector: 'app-context-info',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div role="region" aria-live="polite">
      <!-- Context: What is being processed? -->
      <h3>Converting images...</h3>
      
      <!-- Progress -->
      <ejs-progressbar 
        [value]="processProgress"
        type="Linear"
        aria-label="Image conversion progress">
      </ejs-progressbar>

      <!-- Details: Specific information -->
      <p>Processing: image_{{ currentImage }}.jpg</p>
      <p>{{ processProgress }}% complete</p>
    </div>
  `
})
export class ContextInfoComponent {
  processProgress = 65;
  currentImage = 3;
}
```

### 3. Announce Completion

```typescript
@Component({
  selector: 'app-completion-announcement',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div>
      <ejs-progressbar 
        [value]="progress"
        type="Linear"
        (progressComplete)="onComplete()">
      </ejs-progressbar>

      <!-- Announced by screen reader on completion -->
      <div [attr.aria-live]="'assertive'" role="status">
        <span *ngIf="isComplete">✓ Task completed successfully</span>
      </div>
    </div>
  `
})
export class CompletionAnnouncementComponent {
  progress = 100;
  isComplete = false;

  onComplete() {
    this.isComplete = true;
  }
}
```

### 4. Handle Errors Accessibly

```typescript
@Component({
  selector: 'app-accessible-errors',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div role="region" aria-label="Task status">
      <ejs-progressbar 
        [value]="progress"
        type="Linear"
        [progressColor]="hasError ? '#F44336' : '#4CAF50'">
      </ejs-progressbar>

      <!-- Error announcement for screen readers -->
      <div *ngIf="hasError" role="alert" style="color: #F44336; margin-top: 10px;">
        Error: Failed to upload file. Please try again.
      </div>
    </div>
  `
})
export class AccessibleErrorsComponent {
  progress = 75;
  hasError = false;
}
```

### 5. Mobile Accessibility

```typescript
@Component({
  selector: 'app-mobile-accessible',
  standalone: true,
  imports: [ProgressBarModule],
  template: `
    <div style="padding: 20px; max-width: 100%;">
      <!-- Larger touch target -->
      <ejs-progressbar 
        [value]="progress"
        type="Linear"
        height="40"
        aria-label="Download progress">
      </ejs-progressbar>

      <!-- Large, touch-friendly text -->
      <p style="font-size: 16px; margin-top: 15px;">
        {{ progress }}% Complete
      </p>

      <!-- Accessible button with adequate spacing -->
      <button 
        (click)="pauseProgress()"
        style="margin-top: 20px; padding: 16px 24px; font-size: 16px;">
        Pause
      </button>
    </div>
  `
})
export class MobileAccessibleComponent {
  progress = 50;

  pauseProgress() {
    // Pause implementation
  }
}
```

## Accessibility Resources

- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **WAI-ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/
- **WebAIM:** https://webaim.org/
- **MDN Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility


