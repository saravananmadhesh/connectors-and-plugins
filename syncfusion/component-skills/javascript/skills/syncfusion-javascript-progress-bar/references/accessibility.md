# Accessibility in TypeScript and JavaScript Progress Bar

- [purpose](#purpose)
- [wcag-21-compliance](#wcag-21-compliance)
  - [contrast-minimum](#contrast-minimum)
  - [wcag-compliant-colors](#wcag-compliant-colors)
  - [name-role-value](#name-role-value)
- [wai-aria-attributes](#wai-aria-attributes)
  - [aria-value-attributes](#aria-value-attributes)
  - [aria-label-attributes](#aria-label-attributes)
  - [aria-live-updates](#aria-live-updates)
- [keyboard-navigation](#keyboard-navigation)
  - [focusable-progress](#focusable-progress)
  - [keyboard-shortcuts](#keyboard-shortcuts)
- [screen-reader-support](#screen-reader-support)
  - [semantic-structure](#semantic-structure)
  - [descriptive-information](#descriptive-information)
- [color-contrast](#color-contrast)
  - [testing-contrast](#testing-contrast)
  - [high-contrast-mode](#high-contrast-mode)
- [testing-accessibility](#testing-accessibility)
  - [automated-testing](#automated-testing)
  - [manual-checklist](#manual-checklist)
- [best-practices](#best-practices)
  - [include-labels](#include-labels)
  - [context-information](#context-information)
  - [announce-completion](#announce-completion)
  - [handle-errors](#handle-errors)
  - [mobile-accessibility](#mobile-accessibility)
- [accessibility-resources](#accessibility-resources)
- [runtime-validation-checklist](#runtime-validation-checklist)
- [combined-mistakes-and-future-references](#combined-mistakes-and-future-references)

## Purpose

Accessibility ensures Progress Bar components are usable by everyone, including people with disabilities. This includes WCAG 2.1 compliance, WAI-ARIA attributes, keyboard navigation, and screen reader support.

## WCAG 2.1 Compliance

Progress Bar components should meet WCAG 2.1 Level AA standards. Key compliance areas include contrast ratios, semantic naming, and interactive controls.

### Contrast Minimum

Ensure progress color and track color have sufficient contrast ratio (minimum 4.5:1 for text, 3:1 for graphics).

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// ✓ WCAG AA Compliant: Contrast ratio 5.5:1
new ProgressBar({
    id: 'wcag',
    value: 70,
    type: 'Linear',
    height: '20px',
    progressColor: '#0078D4',
    trackColor: '#E5F0FA'
}).appendTo('#wcagCompliant');

// ✗ NOT WCAG Compliant: Contrast ratio too low
new ProgressBar({
    id: 'notWCAG',
    value: 70,
    type: 'Linear',
    height: '20px',
    progressColor: '#B0C4E0',
    trackColor: '#D0E0F0'
}).appendTo('#notWCAGCompliant');
```

#### JavaScript

```javascript
// ✓ WCAG AA Compliant: Contrast ratio 5.5:1
new ej.progressbar.ProgressBar({
    id: 'wcag',
    value: 70,
    type: 'Linear',
    height: '20px',
    progressColor: '#0078D4',
    trackColor: '#E5F0FA'
}).appendTo('#wcagCompliant');

// ✗ NOT WCAG Compliant: Contrast ratio too low
new ej.progressbar.ProgressBar({
    id: 'notWCAG',
    value: 70,
    type: 'Linear',
    height: '20px',
    progressColor: '#B0C4E0',
    trackColor: '#D0E0F0'
}).appendTo('#notWCAGCompliant');
```

### WCAG Compliant Colors

**✓ Recommended Combinations:**

| Progress Color | Track Color | Contrast Ratio | Level |
|---|---|---|---|
| #0078D4 (Blue) | #E5F0FA (Light Blue) | 5.5:1 | AA ✓ |
| #4CAF50 (Green) | #E8F5E9 (Light Green) | 6.2:1 | AAA ✓ |
| #F44336 (Red) | #FFEBEE (Light Red) | 5.8:1 | AA ✓ |
| #FF9800 (Orange) | #FFE8D6 (Light Orange) | 4.5:1 | AA ✓ |

### Name, Role, Value

Provide accessible names and states using ARIA attributes:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let progress = 45;

const container = document.getElementById('progressContainer') as HTMLDivElement;
if (container) {
    container.innerHTML = `
        <div role="group" aria-labelledby="progress-label">
            <label id="progress-label">File Upload Progress</label>
            <div id="progressBar"></div>
            <div aria-live="polite" aria-atomic="true" id="progressStatus">
                ${progress}% Complete
            </div>
        </div>
    `;
    
    new ProgressBar({
        value: progress,
        type: 'Linear',
        height: '20px'
    }).appendTo('#progressBar');
}
```

#### JavaScript

```javascript
var progress = 45;

var container = document.getElementById('progressContainer');
if (container) {
    container.innerHTML = '<div role="group" aria-labelledby="progress-label">' +
        '<label id="progress-label">File Upload Progress</label>' +
        '<div id="progressBar"></div>' +
        '<div aria-live="polite" aria-atomic="true" id="progressStatus">' +
        progress + '% Complete</div></div>';
    
    new ej.progressbar.ProgressBar({
        value: progress,
        type: 'Linear',
        height: '20px'
    }).appendTo('#progressBar');
}
```

## WAI-ARIA Attributes

Implement these ARIA attributes to enhance accessibility:

### ARIA Value Attributes

Use aria-valuenow, aria-valuemin, and aria-valuemax:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const currentValue = 65;
const progressBar = new ProgressBar({
    value: currentValue,
    type: 'Linear',
    height: '20px'
});
progressBar.appendTo('#ariaProgress');

// Set ARIA attributes on the container
const container = document.getElementById('ariaProgress') as HTMLElement;
if (container) {
    const progressElement = container.querySelector('.e-progressbar-range') as HTMLElement;
    if (progressElement) {
        progressElement.setAttribute('aria-valuenow', currentValue.toString());
        progressElement.setAttribute('aria-valuemin', '0');
        progressElement.setAttribute('aria-valuemax', '100');
        progressElement.setAttribute('aria-label', `Task progress, ${currentValue} percent`);
    }
}
```

#### JavaScript

```javascript
var currentValue = 65;
var progressBar = new ej.progressbar.ProgressBar({
    value: currentValue,
    type: 'Linear',
    height: '20px'
});
progressBar.appendTo('#ariaProgress');

var container = document.getElementById('ariaProgress');
if (container) {
    var progressElement = container.querySelector('.e-progressbar-range');
    if (progressElement) {
        progressElement.setAttribute('aria-valuenow', currentValue);
        progressElement.setAttribute('aria-valuemin', '0');
        progressElement.setAttribute('aria-valuemax', '100');
        progressElement.setAttribute('aria-label', 'Task progress, ' + currentValue + ' percent');
    }
}
```

### ARIA Label Attributes

Use aria-label and aria-labelledby to provide accessible names:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Method 1: Using aria-label directly
new ProgressBar({
    value: 50,
    type: 'Linear',
    height: '20px'
}).appendTo('#backupProgress');

const backup = document.getElementById('backupProgress') as HTMLElement;
if (backup) backup.setAttribute('aria-label', 'System backup progress');

// Method 2: Using aria-labelledby
const uploadDiv = document.getElementById('uploadContainer') as HTMLDivElement;
if (uploadDiv) {
    uploadDiv.innerHTML = '<h3 id="upload-label">Video Upload</h3><div id="uploadProgress"></div>';
    
    new ProgressBar({
        value: 75,
        type: 'Linear',
        height: '20px'
    }).appendTo('#uploadProgress');
    
    const uploadElement = document.getElementById('uploadProgress') as HTMLElement;
    if (uploadElement) uploadElement.setAttribute('aria-labelledby', 'upload-label');
}
```

#### JavaScript

```javascript
// Method 1: Using aria-label
new ej.progressbar.ProgressBar({
    value: 50,
    type: 'Linear',
    height: '20px'
}).appendTo('#backupProgress');

var backup = document.getElementById('backupProgress');
if (backup) backup.setAttribute('aria-label', 'System backup progress');

// Method 2: Using aria-labelledby
var uploadDiv = document.getElementById('uploadContainer');
if (uploadDiv) {
    uploadDiv.innerHTML = '<h3 id="upload-label">Video Upload</h3><div id="uploadProgress"></div>';
    
    new ej.progressbar.ProgressBar({
        value: 75,
        type: 'Linear',
        height: '20px'
    }).appendTo('#uploadProgress');
    
    var uploadElement = document.getElementById('uploadProgress');
    if (uploadElement) uploadElement.setAttribute('aria-labelledby', 'upload-label');
}
```

### ARIA Live Updates

Announce progress changes to screen readers:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let progress = 0;
let progressInterval: NodeJS.Timeout | null = null;

const progressBar = new ProgressBar({
    value: 0,
    type: 'Linear',
    height: '20px'
});
progressBar.appendTo('#liveProgress');

function startDownload(): void {
    progress = 0;
    progressBar.value = 0;
    
    // Clear any existing interval
    if (progressInterval) clearInterval(progressInterval);
    
    progressInterval = setInterval(() => {
        progress += 10;
        progressBar.value = progress;
        
        // Update live region for screen readers
        const statusDiv = document.getElementById('progressStatus') as HTMLDivElement;
        if (statusDiv) {
            statusDiv.setAttribute('aria-live', 'polite');
            statusDiv.setAttribute('aria-atomic', 'true');
            statusDiv.textContent = progress + '% Complete';
        }
        
        if (progress >= 100 && progressInterval) {
            clearInterval(progressInterval);
        }
    }, 500);
}

// Set up download button listener
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) downloadBtn.addEventListener('click', startDownload);
```

#### JavaScript

```javascript
var progress = 0;
var progressInterval = null;

var progressBar = new ej.progressbar.ProgressBar({
    value: 0,
    type: 'Linear',
    height: '20px'
});
progressBar.appendTo('#liveProgress');

function startDownload() {
    progress = 0;
    progressBar.value = 0;
    
    if (progressInterval) clearInterval(progressInterval);
    
    progressInterval = setInterval(function() {
        progress += 10;
        progressBar.value = progress;
        
        var statusDiv = document.getElementById('progressStatus');
        if (statusDiv) {
            statusDiv.setAttribute('aria-live', 'polite');
            statusDiv.setAttribute('aria-atomic', 'true');
            statusDiv.textContent = progress + '% Complete';
        }
        
        if (progress >= 100 && progressInterval) {
            clearInterval(progressInterval);
        }
    }, 500);
}

var downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) downloadBtn.addEventListener('click', startDownload);
```

## Keyboard Navigation

### Focusable Progress

Enable keyboard control over progress:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let progress = 50;

const progressBar = new ProgressBar({
    value: progress,
    type: 'Linear',
    height: '20px'
});
progressBar.appendTo('#focusProgress');

const progressInput = document.getElementById('progressInput') as HTMLInputElement;
if (progressInput) {
    progressInput.value = progress.toString();
    progressInput.addEventListener('input', (event: Event) => {
        const input = event.target as HTMLInputElement;
        progress = parseInt(input.value);
        progressBar.value = progress;
        
        const display = document.getElementById('progressDisplay');
        if (display) display.textContent = progress + '% Complete';
    });
}
```

#### JavaScript

```javascript
var progress = 50;

var progressBar = new ej.progressbar.ProgressBar({
    value: progress,
    type: 'Linear',
    height: '20px'
});
progressBar.appendTo('#focusProgress');

var progressInput = document.getElementById('progressInput');
if (progressInput) {
    progressInput.value = progress;
    progressInput.addEventListener('input', function(event) {
        progress = parseInt(event.target.value);
        progressBar.value = progress;
        
        var display = document.getElementById('progressDisplay');
        if (display) display.textContent = progress + '% Complete';
    });
}
```

### Keyboard Shortcuts

Enable arrow keys to control progress:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let progress = 50;

const progressBar = new ProgressBar({
    value: progress,
    type: 'Linear',
    height: '25px'
});
progressBar.appendTo('#shortcutProgress');

function decreaseProgress(): void {
    progress = Math.max(0, progress - 10);
    progressBar.value = progress;
    updateDisplay();
}

function increaseProgress(): void {
    progress = Math.min(100, progress + 10);
    progressBar.value = progress;
    updateDisplay();
}

function updateDisplay(): void {
    const display = document.getElementById('shortcutDisplay');
    if (display) display.textContent = progress + '% Complete';
}

const decreaseBtn = document.getElementById('decreaseBtn');
const increaseBtn = document.getElementById('increaseBtn');

if (decreaseBtn) {
    decreaseBtn.addEventListener('click', decreaseProgress);
    decreaseBtn.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'ArrowLeft') decreaseProgress();
    });
}

if (increaseBtn) {
    increaseBtn.addEventListener('click', increaseProgress);
    increaseBtn.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') increaseProgress();
    });
}
```

#### JavaScript

```javascript
var progress = 50;

var progressBar = new ej.progressbar.ProgressBar({
    value: progress,
    type: 'Linear',
    height: '25px'
});
progressBar.appendTo('#shortcutProgress');

function decreaseProgress() {
    progress = Math.max(0, progress - 10);
    progressBar.value = progress;
    updateDisplay();
}

function increaseProgress() {
    progress = Math.min(100, progress + 10);
    progressBar.value = progress;
    updateDisplay();
}

function updateDisplay() {
    var display = document.getElementById('shortcutDisplay');
    if (display) display.textContent = progress + '% Complete';
}

var decreaseBtn = document.getElementById('decreaseBtn');
var increaseBtn = document.getElementById('increaseBtn');

if (decreaseBtn) {
    decreaseBtn.addEventListener('click', decreaseProgress);
    decreaseBtn.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') decreaseProgress();
    });
}

if (increaseBtn) {
    increaseBtn.addEventListener('click', increaseProgress);
    increaseBtn.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowRight') increaseProgress();
    });
}
```

## Screen Reader Support

### Semantic Structure

Use semantic HTML with ARIA attributes:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let uploadProgress = 65;
const remainingSize = 35;

const container = document.getElementById('screenReaderContainer') as HTMLDivElement;
if (container) {
    container.innerHTML = `
        <div role="region" aria-label="Task progress section">
            <h2>File Processing Status</h2>
            <div role="group" aria-labelledby="file-label">
                <label id="file-label">Uploading document.pdf</label>
                <div id="uploadBar"></div>
                <p role="status" aria-live="polite" id="statusMessage">
                    ${uploadProgress}% uploaded, ${remainingSize}MB remaining
                </p>
            </div>
        </div>
    `;
    
    new ProgressBar({
        value: uploadProgress,
        type: 'Linear',
        height: '20px'
    }).appendTo('#uploadBar');
}
```

#### JavaScript

```javascript
var uploadProgress = 65;
var remainingSize = 35;

var container = document.getElementById('screenReaderContainer');
if (container) {
    container.innerHTML = '<div role="region" aria-label="Task progress section">' +
        '<h2>File Processing Status</h2>' +
        '<div role="group" aria-labelledby="file-label">' +
        '<label id="file-label">Uploading document.pdf</label>' +
        '<div id="uploadBar"></div>' +
        '<p role="status" aria-live="polite" id="statusMessage">' +
        uploadProgress + '% uploaded, ' + remainingSize + 'MB remaining</p></div></div>';
    
    new ej.progressbar.ProgressBar({
        value: uploadProgress,
        type: 'Linear',
        height: '20px'
    }).appendTo('#uploadBar');
}
```

### Descriptive Information

Provide detailed status for all users:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let backupProgress = 45;
const timeElapsed = '2:30';
const estimatedTime = '3:45';

function getStatusText(): string {
    if (backupProgress === 100) return 'Backup complete';
    if (backupProgress > 70) return 'Backup in final stages';
    if (backupProgress > 30) return 'Backup in progress';
    return 'Starting backup...';
}

const container = document.getElementById('descriptiveContainer') as HTMLDivElement;
if (container) {
    container.innerHTML = `
        <div style="margin: 20px;">
            <h3>System Backup</h3>
            <div id="backupProgress"></div>
            <div style="margin-top: 10px;">
                <p><strong>Status:</strong> <span aria-live="polite" id="statusText">${getStatusText()}</span></p>
                <p><strong>Time Elapsed:</strong> ${timeElapsed}</p>
                <p><strong>Estimated Time:</strong> ${estimatedTime}</p>
            </div>
        </div>
    `;
    
    new ProgressBar({
        value: backupProgress,
        type: 'Linear',
        height: '20px',
        valueChanged: (args: any) => {
            backupProgress = args.value;
            const statusEl = document.getElementById('statusText');
            if (statusEl) statusEl.textContent = getStatusText();
        }
    }).appendTo('#backupProgress');
}
```

#### JavaScript

```javascript
var backupProgress = 45;
var timeElapsed = '2:30';
var estimatedTime = '3:45';

function getStatusText() {
    if (backupProgress === 100) return 'Backup complete';
    if (backupProgress > 70) return 'Backup in final stages';
    if (backupProgress > 30) return 'Backup in progress';
    return 'Starting backup...';
}

var container = document.getElementById('descriptiveContainer');
if (container) {
    container.innerHTML = '<div style="margin: 20px;">' +
        '<h3>System Backup</h3>' +
        '<div id="backupProgress"></div>' +
        '<div style="margin-top: 10px;">' +
        '<p><strong>Status:</strong> <span aria-live="polite" id="statusText">' +
        getStatusText() + '</span></p>' +
        '<p><strong>Time Elapsed:</strong> ' + timeElapsed + '</p>' +
        '<p><strong>Estimated Time:</strong> ' + estimatedTime + '</p></div></div>';
    
    new ej.progressbar.ProgressBar({
        value: backupProgress,
        type: 'Linear',
        height: '20px',
        valueChanged: function(args) {
            backupProgress = args.value;
            var statusEl = document.getElementById('statusText');
            if (statusEl) statusEl.textContent = getStatusText();
        }
    }).appendTo('#backupProgress');
}
```

## Color Contrast

### Testing Contrast

Verify color contrast ratios using these tools:
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- WAVE: https://wave.webaim.org/
- Axe DevTools: https://www.deque.com/axe/devtools/

### High Contrast Mode

Support high contrast mode preferences:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const isHighContrast = window.matchMedia('(prefers-contrast: more)').matches;

const progressBar = new ProgressBar({
    value: 70,
    type: 'Linear',
    height: '20px',
    progressColor: isHighContrast ? '#000000' : '#1976D2',
    trackColor: isHighContrast ? '#FFFFFF' : '#E3F2FD'
});
progressBar.appendTo('#highContrastProgress');

const container = document.getElementById('highContrastProgress') as HTMLElement;
if (container) {
    container.setAttribute('aria-label', 'Task progress');
    container.style.border = '2px solid #000000';
}

// Listen for high contrast preference changes
window.matchMedia('(prefers-contrast: more)').addEventListener('change', (e) => {
    progressBar.progressColor = e.matches ? '#000000' : '#1976D2';
    progressBar.trackColor = e.matches ? '#FFFFFF' : '#E3F2FD';
});
```

#### JavaScript

```javascript
var isHighContrast = window.matchMedia('(prefers-contrast: more)').matches;

var progressBar = new ej.progressbar.ProgressBar({
    value: 70,
    type: 'Linear',
    height: '20px',
    progressColor: isHighContrast ? '#000000' : '#1976D2',
    trackColor: isHighContrast ? '#FFFFFF' : '#E3F2FD'
});
progressBar.appendTo('#highContrastProgress');

var container = document.getElementById('highContrastProgress');
if (container) {
    container.setAttribute('aria-label', 'Task progress');
    container.style.border = '2px solid #000000';
}

// Listen for high contrast preference changes
window.matchMedia('(prefers-contrast: more)').addListener(function(e) {
    progressBar.progressColor = e.matches ? '#000000' : '#1976D2';
    progressBar.trackColor = e.matches ? '#FFFFFF' : '#E3F2FD';
});
```

## Testing Accessibility

### Automated Testing

Run accessibility tests with axe or similar tools:

#### TypeScript Example

```typescript
// Using Jest and axe-core
import { axe, toHaveNoViolations } from 'jest-axe';

test('ProgressBar should be accessible', async () => {
    const container = document.getElementById('testProgress');
    if (container) {
        container.innerHTML = '<div id="progressBar"></div>';
        
        // Create progress bar
        // ... instantiation code ...
        
        // Run axe tests
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    }
});
```

#### JavaScript Example

```javascript
// Using Jasmine and axe-core
describe('ProgressBar Accessibility', function() {
    it('should not have accessibility violations', function(done) {
        var container = document.getElementById('testProgress');
        if (container) {
            container.innerHTML = '<div id="progressBar"></div>';
            
            axe.run(container, function(error, results) {
                if (error) throw error;
                expect(results.violations.length).toBe(0);
                done();
            });
        }
    });
});
```

### Manual Checklist

Verify these items manually:

**Keyboard Navigation:**
- [ ] Tab key focuses elements
- [ ] Shift+Tab reverses focus
- [ ] Enter/Space activates buttons
- [ ] Arrow keys adjust sliders

**Screen Reader:**
- [ ] Component has descriptive label
- [ ] Progress value is announced
- [ ] Status updates are announced
- [ ] Error messages are communicated

**Visual:**
- [ ] Contrast ratio ≥4.5:1 for text
- [ ] Contrast ratio ≥3:1 for graphics
- [ ] Not color-dependent only
- [ ] Focus indicators visible
- [ ] Works in high contrast mode

**Mobile/Touch:**
- [ ] Touch targets ≥48x48px
- [ ] Touch areas don't overlap
- [ ] No hover-dependent content

## Best Practices

### Include Labels

Always associate progress bars with descriptive labels:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// ✓ Good: Label associated with progress
const container = document.getElementById('labeledContainer') as HTMLDivElement;
if (container) {
    container.innerHTML = `
        <label for="upload-progress">File Upload</label>
        <div id="upload-progress"></div>
    `;
    
    new ProgressBar({
        value: 50,
        type: 'Linear'
    }).appendTo('#upload-progress');
}
```

#### JavaScript

```javascript
// ✓ Good: Label associated with progress
var container = document.getElementById('labeledContainer');
if (container) {
    container.innerHTML = '<label for="upload-progress">File Upload</label>' +
        '<div id="upload-progress"></div>';
    
    new ej.progressbar.ProgressBar({
        value: 50,
        type: 'Linear'
    }).appendTo('#upload-progress');
}
```

### Context Information

Provide sufficient context for all users:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let processProgress = 65;
let currentImage = 3;

const container = document.getElementById('contextContainer') as HTMLDivElement;
if (container) {
    container.innerHTML = `
        <div role="region" aria-live="polite">
            <h3>Converting images...</h3>
            <div id="processProgress"></div>
            <p>Processing: image_${currentImage}.jpg</p>
            <p id="progressPercent">${processProgress}% complete</p>
        </div>
    `;
    
    new ProgressBar({
        value: processProgress,
        type: 'Linear',
        valueChanged: (args: any) => {
            processProgress = args.value;
            const display = document.getElementById('progressPercent');
            if (display) display.textContent = processProgress + '% complete';
        }
    }).appendTo('#processProgress');
}
```

#### JavaScript

```javascript
var processProgress = 65;
var currentImage = 3;

var container = document.getElementById('contextContainer');
if (container) {
    container.innerHTML = '<div role="region" aria-live="polite">' +
        '<h3>Converting images...</h3>' +
        '<div id="processProgress"></div>' +
        '<p>Processing: image_' + currentImage + '.jpg</p>' +
        '<p id="progressPercent">' + processProgress + '% complete</p></div>';
    
    new ej.progressbar.ProgressBar({
        value: processProgress,
        type: 'Linear',
        valueChanged: function(args) {
            processProgress = args.value;
            var display = document.getElementById('progressPercent');
            if (display) display.textContent = processProgress + '% complete';
        }
    }).appendTo('#processProgress');
}
```

### Announce Completion

Announce when tasks complete:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let progress = 0;
let isComplete = false;

const container = document.getElementById('completionContainer') as HTMLDivElement;
if (container) {
    container.innerHTML = `
        <div id="completionProgress"></div>
        <div aria-live="assertive" role="status" id="statusMessage"></div>
    `;
    
    const progressBar = new ProgressBar({
        value: 0,
        type: 'Linear',
        progressComplete: () => {
            isComplete = true;
            const status = document.getElementById('statusMessage');
            if (status) {
                status.textContent = '✓ Task completed successfully';
            }
        }
    });
    progressBar.appendTo('#completionProgress');
}
```

#### JavaScript

```javascript
var progress = 0;
var isComplete = false;

var container = document.getElementById('completionContainer');
if (container) {
    container.innerHTML = '<div id="completionProgress"></div>' +
        '<div aria-live="assertive" role="status" id="statusMessage"></div>';
    
    var progressBar = new ej.progressbar.ProgressBar({
        value: 0,
        type: 'Linear',
        progressComplete: function() {
            isComplete = true;
            var status = document.getElementById('statusMessage');
            if (status) {
                status.textContent = '✓ Task completed successfully';
            }
        }
    });
    progressBar.appendTo('#completionProgress');
}
```

### Handle Errors Accessibly

Communicate errors clearly to all users:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let uploadProgress = 0;

const container = document.getElementById('errorContainer') as HTMLDivElement;
if (container) {
    container.innerHTML = `
        <div id="uploadBar"></div>
        <div role="alert" aria-live="assertive" id="errorMessage"></div>
    `;
    
    new ProgressBar({
        value: uploadProgress,
        type: 'Linear'
    }).appendTo('#uploadBar');
    
    const uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            // Simulate upload with potential error
            if (!validateFile()) {
                const errorDiv = document.getElementById('errorMessage');
                if (errorDiv) {
                    errorDiv.textContent = 'Error: File format not supported';
                }
            }
        });
    }
}

function validateFile(): boolean {
    // Validation logic
    return true;
}
```

#### JavaScript

```javascript
var uploadProgress = 0;

var container = document.getElementById('errorContainer');
if (container) {
    container.innerHTML = '<div id="uploadBar"></div>' +
        '<div role="alert" aria-live="assertive" id="errorMessage"></div>';
    
    new ej.progressbar.ProgressBar({
        value: uploadProgress,
        type: 'Linear'
    }).appendTo('#uploadBar');
    
    var uploadBtn = document.getElementById('uploadBtn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            if (!validateFile()) {
                var errorDiv = document.getElementById('errorMessage');
                if (errorDiv) {
                    errorDiv.textContent = 'Error: File format not supported';
                }
            }
        });
    }
}

function validateFile() {
    return true;
}
```

### Handle Errors Accessibly

Communicate errors clearly to all users:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let uploadProgress = 75;
let hasError = false;

const container = document.getElementById('errorContainer') as HTMLDivElement;
if (container) {
    container.innerHTML = `
        <div role="region" aria-label="Task status">
            <div id="errorProgress"></div>
            <div role="alert" style="color: #F44336; margin-top: 10px; display: none;" id="errorMessage">
                Error: Failed to upload file. Please try again.
            </div>
        </div>
    `;
    
    new ProgressBar({
        value: uploadProgress,
        type: 'Linear',
        progressColor: hasError ? '#F44336' : '#4CAF50'
    }).appendTo('#errorProgress');
    
    const errorBtn = document.getElementById('uploadBtn');
    if (errorBtn) {
        errorBtn.addEventListener('click', () => {
            const errorMsg = document.getElementById('errorMessage');
            if (errorMsg) {
                hasError = !hasError;
                errorMsg.style.display = hasError ? 'block' : 'none';
            }
        });
    }
}
```

#### JavaScript

```javascript
var uploadProgress = 75;
var hasError = false;

var container = document.getElementById('errorContainer');
if (container) {
    container.innerHTML = '<div role="region" aria-label="Task status">' +
        '<div id="errorProgress"></div>' +
        '<div role="alert" style="color: #F44336; margin-top: 10px; display: none;" id="errorMessage">' +
        'Error: Failed to upload file. Please try again.</div></div>';
    
    new ej.progressbar.ProgressBar({
        value: uploadProgress,
        type: 'Linear',
        progressColor: hasError ? '#F44336' : '#4CAF50'
    }).appendTo('#errorProgress');
    
    var errorBtn = document.getElementById('uploadBtn');
    if (errorBtn) {
        errorBtn.addEventListener('click', function() {
            var errorMsg = document.getElementById('errorMessage');
            if (errorMsg) {
                hasError = !hasError;
                errorMsg.style.display = hasError ? 'block' : 'none';
            }
        });
    }
}
```

### Mobile Accessibility

Ensure touch-friendly targets and spacing:

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let progress = 50;

const container = document.getElementById('mobileContainer') as HTMLDivElement;
if (container) {
    container.innerHTML = `
        <div style="padding: 20px; max-width: 100%;">
            <div id="mobileProgress"></div>
            <p style="font-size: 16px; margin-top: 15px; line-height: 1.5;" id="mobileDisplay">
                50% Complete
            </p>
            <button id="pauseBtn" style="margin-top: 20px; padding: 16px 24px; font-size: 16px; cursor: pointer;">
                Pause
            </button>
        </div>
    `;
    
    const progressBar = new ProgressBar({
        value: progress,
        type: 'Linear',
        height: '40px'
    });
    progressBar.appendTo('#mobileProgress');
    
    const pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
        pauseBtn.setAttribute('aria-label', 'Pause progress');
        pauseBtn.addEventListener('click', () => {
            console.log('Progress paused');
        });
    }
}
```

#### JavaScript

```javascript
var progress = 50;

var container = document.getElementById('mobileContainer');
if (container) {
    container.innerHTML = '<div style="padding: 20px; max-width: 100%;">' +
        '<div id="mobileProgress"></div>' +
        '<p style="font-size: 16px; margin-top: 15px; line-height: 1.5;" id="mobileDisplay">' +
        '50% Complete</p>' +
        '<button id="pauseBtn" style="margin-top: 20px; padding: 16px 24px; font-size: 16px; cursor: pointer;">' +
        'Pause</button></div>';
    
    var progressBar = new ej.progressbar.ProgressBar({
        value: progress,
        type: 'Linear',
        height: '40px'
    });
    progressBar.appendTo('#mobileProgress');
    
    var pauseBtn = document.getElementById('pauseBtn');
    if (pauseBtn) {
        pauseBtn.setAttribute('aria-label', 'Pause progress');
        pauseBtn.addEventListener('click', function() {
            console.log('Progress paused');
        });
    }
}
```

## Accessibility Resources

- **WCAG 2.1 Guidelines:** https://www.w3.org/WAI/WCAG21/quickref/
- **WAI-ARIA Authoring Practices:** https://www.w3.org/WAI/ARIA/apg/
- **WebAIM:** https://webaim.org/
- **MDN Accessibility:** https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **Axe DevTools:** https://www.deque.com/axe/devtools/
- **NVDA Screen Reader:** https://www.nvaccess.org/

## Runtime Validation Checklist

Before deploying your accessible Progress Bar implementation, verify these items:

- [ ] **WCAG AA Compliance**: Contrast ratio ≥4.5:1 for progress/track colors
- [ ] **ARIA Attributes**: All value attributes (valuenow, valuemin, valuemax) properly set
- [ ] **Keyboard Focus**: Progress bar receives focus via Tab key navigation
- [ ] **Screen Reader Announcements**: Progress updates announced without page refresh
- [ ] **Live Region Updates**: aria-live="polite" regions update correctly with content changes
- [ ] **Label Association**: All controls have associated labels via aria-label or aria-labelledby
- [ ] **Semantic Structure**: Using role="region" and role="status" appropriately
- [ ] **Keyboard Trap Prevention**: Focus can move through controls without getting trapped
- [ ] **Color Independence**: Progress not communicated by color alone (also use position, text)
- [ ] **Accessibility Tool Pass**: Running axe or WAVE tool shows zero violations

## Combined Mistakes and Future References

### Mistakes to Avoid

**Mistake 1: Missing or Incorrect ARIA Attributes**
- ✗ **Bad**: Progress bar without aria-valuenow attribute
- ✓ **Fix**: Always include aria-valuenow, aria-valuemin, aria-valuemax
- ✓ **Improvement**: Use aria-label or aria-labelledby for context

**Mistake 2: Insufficient Color Contrast**
- ✗ **Bad**: Progress color #B0C4E0 on track #D0E0F0 (ratio 1.5:1)
- ✓ **Fix**: Use combination with ≥4.5:1 ratio (e.g., #0078D4 on #E5F0FA)
- ✓ **Improvement**: Test with WebAIM Contrast Checker before deployment

**Mistake 3: Keyboard Navigation Not Supported**
- ✗ **Bad**: Progress bar only controllable via mouse click
- ✓ **Fix**: Provide keyboard shortcuts using Arrow keys for range inputs
- ✓ **Improvement**: Test Tab navigation and focus states throughout

**Mistake 4: Screen Reader Updates Not Announced**
- ✗ **Bad**: Progress value changes silently without aria-live region
- ✓ **Fix**: Use aria-live="polite" for status updates, aria-live="assertive" for urgent
- ✓ **Improvement**: Test with NVDA or JAWS screen reader

**Mistake 5: Mobile Touch Targets Too Small**
- ✗ **Bad**: Touch targets 24x24px or overlapping with other elements
- ✓ **Fix**: Ensure targets ≥48x48px with adequate spacing
- ✓ **Improvement**: Test on actual mobile devices with different screen sizes

### See Also

- **[Getting Started](getting-started.md)** - Initial setup guide
- **[Progress Modes](progress-modes.md)** - Determinate, Indeterminate, Buffer modes
- **[Types and Shapes](types-and-shapes.md)** - Linear, Circular, SemiCircle types
- **[Customization](customization.md)** - Colors, sizing, styling options
- **[Features and Interactions](features-and-interactions.md)** - Annotations, events, animations
- **[API Reference](api-reference.md)** - Complete API documentation


