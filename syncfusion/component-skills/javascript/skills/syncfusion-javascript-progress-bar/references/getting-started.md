# Getting Started with Progress Bar (TypeScript & JavaScript)

- [purpose](#purpose)
- [installation-and-setup](#installation-and-setup)
  - [prerequisites](#prerequisites)
  - [install-the-package](#install-the-package)
  - [dependencies](#dependencies)
- [typescript-setup](#typescript-setup)
  - [project-structure](#project-structure)
  - [create-the-html-container](#create-the-html-container)
  - [basic-typescript-example](#basic-typescript-example)
- [javascript-setup](#javascript-setup)
  - [cdn-setup](#cdn-setup)
  - [local-script-setup](#local-script-setup)
  - [basic-javascript-example](#basic-javascript-example)
- [basic-progress-bar-configuration](#basic-progress-bar-configuration)
  - [progress-bar-types](#progress-bar-types)
  - [setting-progress-value](#setting-progress-value)
  - [progress-bar-dimensions](#progress-bar-dimensions)
- [complete-typescript-example](#complete-typescript-example)
- [complete-javascript-example](#complete-javascript-example)
- [running-the-application](#running-the-application)
- [runtime-validation-checklist](#runtime-validation-checklist)
- [combined-mistakes-and-future-references](#combined-mistakes-and-future-references)

## Purpose

The Syncfusion Essential JS 2 Progress Bar visualizes task completion as a percentage-based indicator. It supports multiple shapes (linear, circular, semi-circular), determinate and indeterminate modes, animations, segments, and custom ranges.

Use Progress Bar when:

```text
Visualizing file upload or download progress.
Displaying task completion status in workflows.
Showing data loading or processing state.
Indicating resource utilization or capacity.
Requiring animated visual feedback for user actions.
```

The Progress Bar package provides linear, circular, and semi-circular layouts, configurable colors, animations, secondary progress buffering, and accessibility support.

## Installation and Setup

### Purpose

The Syncfusion Essential JS 2 Progress Bar displays task progress as a visual indicator.

Use Progress Bar when the application requires:

- File upload or download progress visualization.
- Task completion or workflow status indication.
- Data loading or processing animation.
- Capacity, utilization, or resource percentage display.
- Multiple progress indicators with different states.
- Accessibility-compliant progress feedback.

The Progress Bar is available through the `@syncfusion/ej2-progressbar` package for TypeScript and through versioned CDN or local scripts for JavaScript.

### Prerequisites

For a TypeScript project, install:

```text
Node.js
npm
TypeScript
A module bundler such as Webpack
A code editor
A modern web browser
```

For a global JavaScript project, prepare:

```text
An HTML file
The Syncfusion EJ2 global script
A JavaScript file
A local HTTP server
A modern web browser
```

### Install the Package

Install Progress Bar through npm:

```bash
npm install @syncfusion/ej2-progressbar
```

The package manager installs the required dependencies automatically.

Keep all Syncfusion package versions consistent to avoid dependency conflicts.

### Dependencies

```text
|-- @syncfusion/ej2-progressbar
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-svg-base
```

Do not install every transitive dependency separately unless the project has a specific dependency-management requirement.

## TypeScript Setup

### Project Structure

A basic TypeScript Webpack project can use the following structure:

```text
progress-bar-app/
|-- src/
|   |-- app/
|   |   |-- app.ts
|   |-- index.html
|-- package.json
|-- tsconfig.json
|-- webpack.config.js
```

### Create the HTML Container

Add a container element to your HTML file with a unique ID where the Progress Bar will be attached:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Progress Bar Example</title>
</head>
<body>
    <div id="container">
        <div id="progress"></div>
    </div>
    <script src="dist/app.js"></script>
</body>
</html>
```

### Basic TypeScript Example

Create a TypeScript file that instantiates the Progress Bar component:

#### HTML and TypeScript

**HTML:**

```html
<div id="progress"></div>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const progressBar: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px'
});

progressBar.appendTo('#progress');
```

## JavaScript Setup

### Purpose

Use JavaScript when your application uses:

- Versioned CDN scripts.
- Locally stored EJ2 global scripts.
- Traditional HTML and JavaScript files.
- The global `ej` namespace.
- No TypeScript compilation or build step.

### CDN Setup

Include the Progress Bar global script from the Syncfusion CDN:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Progress Bar Example</title>
</head>
<body>
    <div id="progress"></div>

    <!-- EJ2 Global Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/latest/ej2.min.js"></script>
    <script>
        var progressBar = new ej.progressbar.ProgressBar({
            type: 'Linear',
            value: 50,
            height: '20px'
        });

        progressBar.appendTo('#progress');
    </script>
</body>
</html>
```

### Local Script Setup

Store the EJ2 scripts locally and reference them:

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Progress Bar Example</title>
</head>
<body>
    <div id="progress"></div>

    <script src="/ej2-js/ej2.min.js"></script>
    <script src="/app.js"></script>
</body>
</html>
```

### Basic JavaScript Example

```html
<div id="progress"></div>

<script>
var progressBar = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 50,
    height: '20px'
});

progressBar.appendTo('#progress');
</script>
```

## Basic Progress Bar Configuration

### Purpose

Progress Bar configuration determines its visual shape, value, dimensions, and behavior.

### Progress Bar Types

The Progress Bar supports three types:

```text
Linear      -> Horizontal or vertical rectangular bar (default).
Circular    -> Full circular progress indicator.
SemiCircle  -> Half-circular progress indicator.
```

#### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Linear Progress Bar
const linear: ProgressBar = new ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px'
});

linear.appendTo('#linear');

// Circular Progress Bar
const circular: ProgressBar = new ProgressBar({
    type: 'Circular',
    value: 75
});

circular.appendTo('#circular');

// Semi-Circular Progress Bar
const semiCircle: ProgressBar = new ProgressBar({
    type: 'SemiCircle',
    value: 85
});

semiCircle.appendTo('#semicircle');
```

#### JavaScript

```html
<div id="linear"></div>
<div id="circular"></div>
<div id="semicircle"></div>

<script>
// Linear
var linear = new ej.progressbar.ProgressBar({
    type: 'Linear',
    value: 60,
    height: '20px'
});
linear.appendTo('#linear');

// Circular
var circular = new ej.progressbar.ProgressBar({
    type: 'Circular',
    value: 75
});
circular.appendTo('#circular');

// Semi-Circular
var semiCircle = new ej.progressbar.ProgressBar({
    type: 'SemiCircle',
    value: 85
});
semiCircle.appendTo('#semicircle');
</script>
```

### Setting Progress Value

The `value` property sets the current progress percentage (0-100):

```typescript
type: 'Linear',
value: 65
```

Valid range: `0` to `100`. Values outside this range are clamped automatically.

### Progress Bar Dimensions

Configure height and width:

```typescript
height: '20px',
width: '100%'
```

For circular progress bars, both dimensions affect the circle size. For linear progress bars, height controls bar thickness and width controls bar length.

## Complete TypeScript Example

**HTML:**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Progress Bar Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .progress-container {
            margin: 20px 0;
        }
        h3 {
            color: #333;
        }
    </style>
</head>
<body>
    <h2>Progress Bar Examples</h2>
    
    <div class="progress-container">
        <h3>Linear Progress</h3>
        <div id="linear"></div>
        <p id="linearValue">Progress: 0%</p>
    </div>

    <div class="progress-container">
        <h3>Circular Progress</h3>
        <div id="circular"></div>
    </div>

    <button onclick="updateProgress()">Start Progress</button>

    <script src="dist/app.js"></script>
</body>
</html>
```

**TypeScript:**

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let linearProgress: ProgressBar;
let circularProgress: ProgressBar;
let currentValue: number = 0;

// Create Linear Progress Bar
linearProgress = new ProgressBar({
    type: 'Linear',
    value: 0,
    height: '20px',
    width: '100%'
});

linearProgress.appendTo('#linear');

// Create Circular Progress Bar
circularProgress = new ProgressBar({
    type: 'Circular',
    value: 0,
    height: '200px',
    width: '200px'
});

circularProgress.appendTo('#circular');

// Update progress function
function updateProgress(): void {
    let interval = setInterval(() => {
        currentValue += 5;

        linearProgress.value = currentValue;
        circularProgress.value = currentValue;

        const valueElement = document.getElementById('linearValue');
        if (valueElement) {
            valueElement.textContent = `Progress: ${currentValue}%`;
        }

        if (currentValue >= 100) {
            clearInterval(interval);
            currentValue = 0;
        }
    }, 200);
}
```

## Complete JavaScript Example

**HTML File:**

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Progress Bar Example</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .progress-container {
            margin: 20px 0;
        }
        h3 {
            color: #333;
        }
    </style>
</head>
<body>
    <h2>Progress Bar Examples</h2>
    
    <div class="progress-container">
        <h3>Linear Progress</h3>
        <div id="linear"></div>
        <p id="linearValue">Progress: 0%</p>
    </div>

    <div class="progress-container">
        <h3>Circular Progress</h3>
        <div id="circular"></div>
    </div>

    <button onclick="updateProgress()">Start Progress</button>

    <!-- EJ2 Scripts -->
    <script src="https://cdn.syncfusion.com/ej2/latest/ej2.min.js"></script>
    
    <script>
        var linearProgress;
        var circularProgress;
        var currentValue = 0;

        // Create Linear Progress Bar
        linearProgress = new ej.progressbar.ProgressBar({
            type: 'Linear',
            value: 0,
            height: '20px',
            width: '100%'
        });

        linearProgress.appendTo('#linear');

        // Create Circular Progress Bar
        circularProgress = new ej.progressbar.ProgressBar({
            type: 'Circular',
            value: 0,
            height: '200px',
            width: '200px'
        });

        circularProgress.appendTo('#circular');

        // Update progress function
        function updateProgress() {
            var interval = setInterval(function() {
                currentValue += 5;

                linearProgress.value = currentValue;
                circularProgress.value = currentValue;

                var valueElement = document.getElementById('linearValue');
                if (valueElement) {
                    valueElement.textContent = 'Progress: ' + currentValue + '%';
                }

                if (currentValue >= 100) {
                    clearInterval(interval);
                    currentValue = 0;
                }
            }, 200);
        }
    </script>
</body>
</html>
```

## Running the Application

### TypeScript Build

Use Webpack or your bundler to compile TypeScript:

```bash
npm run build
```

Then open `index.html` in your browser.

### JavaScript Runtime

For JavaScript using CDN, simply open the HTML file in a browser. For local scripts, use a local HTTP server:

```bash
python -m http.server 8000
# or
npx http-server
```

Then navigate to `http://localhost:8000`.

## Runtime Validation Checklist

Before deploying your Progress Bar, verify:

- **Container Element:** `<div id="progress"></div>` exists and is unique.
- **Dimensions:** Height and width values are valid CSS measurements.
- **Value Range:** Progress value is between 0 and 100.
- **Type Property:** Type is `Linear`, `Circular`, or `SemiCircle`.
- **Module Injection:** Progress Bar module is correctly imported (TypeScript only).
- **Script Loading:** All required EJ2 scripts load before initialization (JavaScript only).
- **CSS Import:** EJ2 CSS is included for proper styling.
- **Namespace:** Global `ej` namespace is available (JavaScript only).
- **Event Cleanup:** Timers and intervals are cleared to prevent memory leaks.
- **Responsive Layout:** Progress Bar dimensions adapt to container width.
- **Accessibility:** Progress value is labeled or announced to screen readers.

## Combined Mistakes and Future References

### Incorrect: Invalid Value Range

```typescript
// WRONG - Value outside valid range
const progressBar = new ProgressBar({
    value: 150  // Should be 0-100
});
```

**Correction:**

Clamp the value to the valid 0-100 range:

```typescript
const progressBar = new ProgressBar({
    value: Math.min(100, Math.max(0, userValue))
});
```

### Incorrect: No Container Element

```typescript
// WRONG - No #progress element exists
const progressBar = new ProgressBar({ value: 50 });
progressBar.appendTo('#progress');  // Fails silently
```

**Correction:**

Ensure the container element exists in your HTML:

```html
<div id="progress"></div>

<script>
const progressBar = new ProgressBar({ value: 50 });
progressBar.appendTo('#progress');
</script>
```

### Incorrect: Type Property Misspelled

```typescript
// WRONG - Invalid type name
const progressBar = new ProgressBar({
    type: 'linear'  // Should be 'Linear'
});
```

**Correction:**

Use the correct enum value with proper casing:

```typescript
const progressBar = new ProgressBar({
    type: 'Linear'  // Correct capitalization
});
```

### Incorrect: Mixing TypeScript and Global JavaScript

```typescript
// WRONG - TypeScript import mixed with global usage
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const progressBar = new ej.progressbar.ProgressBar({  // Incorrect namespace
    value: 50
});
```

**Correction:**

Use the TypeScript class directly:

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const progressBar = new ProgressBar({
    value: 50
});
progressBar.appendTo('#progress');
```

Or use only the global namespace in JavaScript:

```javascript
var progressBar = new ej.progressbar.ProgressBar({
    value: 50
});
progressBar.appendTo('#progress');
```
