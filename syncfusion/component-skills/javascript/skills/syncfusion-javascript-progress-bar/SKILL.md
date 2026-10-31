---
name: syncfusion-javascript-progress-bar
description: Implement Syncfusion Progress Bar components in TypeScript and JavaScript for visual progress tracking. Use when you need to show determinate, indeterminate, or buffered progress in linear or circular shapes with animations, customization, and accessibility support.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Syncfusion Progress Bar with TypeScript and JavaScript

The Syncfusion Progress Bar is a lightweight component that visually represents the progress of a task or process. It supports multiple shapes (linear, circular, semi-circular), progress modes (determinate, indeterminate, buffer), animations, and comprehensive customization options for both TypeScript and JavaScript environments.

## When to Use This Skill

**Use this skill when:**
- You need to display progress of a task in TypeScript or JavaScript
- You want to show loading states with animations
- You need different progress bar shapes (linear, circular, semi-circular)
- You're building download/upload progress UI
- You need accessibility-compliant progress indicators (WCAG 2.1)
- You want to display multiple progress states (primary + secondary buffer)

**Don't use this skill for:**
- Spinners (use Skeleton Loader for loading states)
- Step indicators (use Stepper component)
- Timeline visualization (use Timeline component)

## Component Overview

The Syncfusion Progress Bar provides:
- **Multiple Shapes**: Linear, Circular, SemiCircular
- **Progress Modes**: Determinate, Indeterminate, Buffer
- **Animations**: Smooth progress transitions with customizable duration and delay
- **Customization**: Colors (progress, track, secondary), thickness, segments, corner radius, ranges
- **Segment Support**: Divide progress into segments with adjustable spacing
- **Accessibility**: Full WCAG 2.1 Level AA compliance, keyboard navigation, screen reader support, ARIA attributes
- **Events**: Progress completion, value changes, text rendering
- **Framework Support**: Native TypeScript + JavaScript implementations

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package setup
- Angular dependencies and imports
- Basic progress bar implementation
- CSS theme configuration
- Minimal working example
- Common setup patterns

### Types and Shapes
📄 **Read:** [references/types-and-shapes.md](references/types-and-shapes.md)
- Linear progress bar
- Circular progress bar
- Semi-circular progress bar
- Shape-specific properties
- When to use each type
- Switching between types

### Progress Modes
📄 **Read:** [references/progress-modes.md](references/progress-modes.md)
- Determinate mode (known progress)
- Indeterminate mode (unknown progress)
- Buffer mode (primary + secondary progress)
- Mode selection guidelines
- Real-world scenarios for each mode

### Customization
📄 **Read:** [references/customization.md](references/customization.md)
- Sizing and thickness
- Color configuration (progress and track)
- Min, Max, and Value properties
- Radius and InnerRadius
- Segments and segments spacing
- Advanced styling patterns

### Features and Interactions
📄 **Read:** [references/features-and-interactions.md](references/features-and-interactions.md)
- Annotations and labels
- Animation configuration
- Tooltip support
- Event handling (valueChanged, progressComplete)
- Range indicators
- Reactive data binding

### Accessibility
📄 **Read:** [references/accessibility.md](references/accessibility.md)
- WCAG 2.1 compliance
- WAI-ARIA attributes
- Keyboard navigation support
- Screen reader considerations
- Testing accessibility
- Best practices

## Quick Start Example

### TypeScript

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

// Linear Progress
const linearProgress = new ProgressBar({
    value: 65,
    type: 'Linear',
    height: '20px'
});
linearProgress.appendTo('#linearContainer');

// Circular Progress
const circularProgress = new ProgressBar({
    value: 65,
    type: 'Circular',
    height: '200px',
    width: '200px'
});
circularProgress.appendTo('#circularContainer');

// Semi-Circular Progress
const semiCircularProgress = new ProgressBar({
    value: 65,
    type: 'SemiCircular',
    height: '200px',
    width: '200px'
});
semiCircularProgress.appendTo('#semiCircularContainer');
```

### HTML Containers

```html
<div style="margin: 20px;">
    <h4>File Download</h4>
    <div id="linearContainer"></div>

    <h4 style="margin-top: 20px;">Task Completion</h4>
    <div id="circularContainer"></div>

    <h4 style="margin-top: 20px;">System Status</h4>
    <div id="semiCircularContainer"></div>
</div>
```

## Common Patterns

### Pattern 1: File Upload Progress

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

let uploadProgress = 0;
const progressBar = new ProgressBar({
    value: uploadProgress,
    type: 'Linear'
});
progressBar.appendTo('#uploadBar');

function simulateUpload() {
    uploadProgress = 0;
    const interval = setInterval(() => {
        uploadProgress += Math.random() * 30;
        if (uploadProgress >= 100) {
            uploadProgress = 100;
            progressBar.value = uploadProgress;
            clearInterval(interval);
        } else {
            progressBar.value = uploadProgress;
        }
    }, 500);
}
```

### Pattern 2: Loading State with Animation

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const loadingBar = new ProgressBar({
    isIndeterminate: true,
    type: 'Linear',
    height: '4px',
    animation: { enable: true, duration: 2000, delay: 0 }
});
loadingBar.appendTo('#loadingBar');
```

### Pattern 3: Multiple Progress States (Buffer)

```typescript
import { ProgressBar } from '@syncfusion/ej2-progressbar';

const bufferProgress = new ProgressBar({
    value: 35,              // Primary progress
    secondaryProgress: 65,  // Buffer/secondary progress
    type: 'Linear'
});
bufferProgress.appendTo('#bufferBar');
```

## Key Props Reference

| Property | Type | Purpose |
|----------|------|---------|
| `value` | number | Current progress value (0-100 or custom min/max) |
| `type` | string | Shape: 'Linear', 'Circular', 'SemiCircular' |
| `isIndeterminate` | boolean | Show indeterminate state (unknown duration) |
| `secondaryProgress` | number | Buffer/secondary progress value for dual-progress |
| `minimum` | number | Minimum value of progress range (default: 0) |
| `maximum` | number | Maximum value of progress range (default: 100) |
| `height` | number\|string | Progress bar height in pixels or percentage |
| `width` | number\|string | Progress bar width in pixels or percentage |
| `trackThickness` | number | Track line thickness |
| `progressThickness` | number | Progress bar thickness |
| `secondaryProgressThickness` | number | Secondary progress thickness |
| `progressColor` | string | Progress bar color (hex, rgb, etc) |
| `secondaryProgressColor` | string | Secondary progress color |
| `trackColor` | string | Track background color |
| `cornerRadius` | string | 'Round' \| 'Square' - Corner style |
| `radius` | number\|string | Outer radius for circular/semi-circular bars |
| `innerRadius` | number\|string | Inner radius for donut-style appearance |
| `segmentCount` | number | Divide progress into N segments |
| `segmentSpacing` | number | Space between segments in pixels |
| `showProgressValue` | boolean | Display progress percentage text |
| `animation` | AnimationModel | Animation config: {enable, duration, delay} |
## Events Reference

The Progress Bar component emits several important events:

| Event | Description | Args |
|-------|-------------|------|
| `valueChanged` | Fired when progress value changes | `IProgressValueEventArgs` |
| `progressCompleted` | Fired when progress reaches 100% | `IProgressValueEventArgs` |
| `textRender` | Fired before rendering progress text | `ITextRenderEventArgs` |

**Note:** Use `(textRender)` event to customize the progress label display format.

## API Reference

A complete API reference for the Syncfusion Angular `ProgressBar` is available in the `references` folder. It includes property types, method anchors, and event arg links that map to the official docs.

Read the API reference: [references/api-reference.md](references/api-reference.md)

## Related Components

- **Skeleton Loader** - For general loading indicators
- **Spinner** - For indeterminate loading states
- **Stepper** - For step-by-step progress
- **Toast** - For progress notifications
