# Accessibility

The Syncfusion Progress Bar component is built with accessibility standards to ensure it works for all users, including those using assistive technologies.

## Table of Contents
- [Accessibility Compliance](#accessibility-compliance)
- [ARIA Attributes](#aria-attributes)
  - [progressbar Role](#progressbar-role)
  - [aria-valuemin](#aria-valuemin)
  - [aria-valuemax](#aria-valuemax)
  - [aria-valuenow](#aria-valuenow)
  - [aria-label](#aria-label)
  - [aria-labelledby](#aria-labelledby)
  - [aria-describedby](#aria-describedby)
- [Screen Reader Support](#screen-reader-support)
  - [Basic Screen Reader Announcement](#basic-screen-reader-announcement)
  - [Contextual Announcements](#contextual-announcements)
  - [Live Regions for Dynamic Updates](#live-regions-for-dynamic-updates)
- [Keyboard Navigation](#keyboard-navigation)
  - [Keyboard Navigation Implementation](#keyboard-navigation-implementation)
  - [Keyboard-Accessible Controls](#keyboard-accessible-controls)
- [Color Contrast](#color-contrast)
  - [Default High Contrast](#default-high-contrast)
  - [High Contrast Theme](#high-contrast-theme)
  - [Custom Colors with Accessible Contrast](#custom-colors-with-accessible-contrast)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
  - [Enable RTL](#enable-rtl)
  - [Full Page RTL](#full-page-rtl)
  - [RTL with Arabic Content](#rtl-with-arabic-content)
- [Mobile Accessibility](#mobile-accessibility)
  - [Touch-Friendly Implementation](#touch-friendly-implementation)
- [Testing Accessibility](#testing-accessibility)
  - [Screen Reader Testing](#screen-reader-testing)
  - [Keyboard Navigation Testing](#keyboard-navigation-testing)
  - [Color Contrast Testing](#color-contrast-testing)
  - [Automated Testing](#automated-testing)
- [Accessible Progress Bar Implementation](#accessible-progress-bar-implementation)
- [Best Practices for Accessible Progress Bars](#best-practices-for-accessible-progress-bars)
  - [1. Always Provide Labels](#1-always-provide-labels)
  - [2. Use Semantic HTML](#2-use-semantic-html)
  - [3. Announce Important Updates](#3-announce-important-updates)
  - [4. Support Keyboard Navigation](#4-support-keyboard-navigation)
  - [5. Test with Real Users](#5-test-with-real-users)

## Accessibility Compliance

The Progress Bar component complies with major accessibility standards:

| Standard | Compliance | Details |
|----------|-----------|---------|
| **WCAG 2.2** | AA Level | Level AA compliance for web accessibility |
| **Section 508** | Compliant | US Federal accessibility requirement |
| **ADA** | Compliant | Americans with Disabilities Act |
| **WAI-ARIA** | Supported | Web Accessibility Initiative - Accessible Rich Internet Applications |
| **Screen Readers** | Full Support | NVDA, JAWS, VoiceOver compatible |
| **Keyboard Navigation** | Full Support | Navigate without mouse |
| **Color Contrast** | Compliant | WCAG AA contrast ratio requirements |
| **RTL (Right-to-Left)** | Supported | Arabic, Hebrew, Persian languages |
| **Mobile Accessibility** | Supported | Accessible on mobile devices |

## ARIA Attributes

The Progress Bar uses standard ARIA attributes for screen readers and assistive technologies:

### progressbar Role

The main role identifying the element as a progress indicator:

```html
<!-- Automatically applied by Syncfusion -->
<div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="65">
</div>
```

### aria-valuemin

The minimum progress value (default: 0):

```csharp
@(Html.EJS().ProgressBar("accessibleProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Minimum(0)  // aria-valuemin="0"
    .Value(65)
    .Height("30")
    .Render()
)
```

### aria-valuemax

The maximum progress value (default: 100):

```csharp
@(Html.EJS().ProgressBar("customRangeProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Minimum(0)
    .Maximum(500)  // aria-valuemax="500"
    .Value(250)    // 50% progress
    .Height("30")
    .Render()
)
```

### aria-valuenow

The current progress value (automatically updated by Syncfusion):

```csharp
@(Html.EJS().ProgressBar("dynamicProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(75)     // aria-valuenow="75"
    .Height("30")
    .Render()
)
```

### aria-label

Custom text label for screen readers:

```csharp
@(Html.EJS().ProgressBar("labeledProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(65)
    .Height("30")
    .Render()
)
```

### aria-labelledby

Reference another element's ID as the label:

```html
<h2 id="progressLabel">Data Processing Progress</h2>

@(Html.EJS().ProgressBar("labelledProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .Height("30")
    .Render()
)
```

### aria-describedby

Provide additional description via aria-describedby:

```html
<h2>File Upload</h2>
@(Html.EJS().ProgressBar("describedProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(75)
    .Height("30")
    .Render()
)

<p id="progressDesc">Your file is uploading. 75% complete. Estimated time: 2 minutes.</p>
```

## Screen Reader Support

Progress bars announce their role, current value, and status automatically to screen readers:

### Basic Screen Reader Announcement

A screen reader will announce:
> "Progress bar, 65 percent"

```csharp
@(Html.EJS().ProgressBar("srProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(65)
    .Height("30")
    .Render()
)
```

### Contextual Announcements

Provide context with descriptive labels:

```html
<label for="uploadProgress">Upload Progress</label>

@(Html.EJS().ProgressBar("contextualProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(45)
    .Height("30")
    .Render()
)
```

### Live Regions for Dynamic Updates

Use `aria-live` for announcements of progress updates:

```html
@(Html.EJS().ProgressBar("liveProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .Render()
)

<div id="liveStatus" aria-live="polite" aria-atomic="true" style="display: none;">
    <!-- Status updates announced here -->
</div>

<script>
    var progressBar = document.getElementById('liveProgress').ej2_instances[0];
    
    var interval = setInterval(function() {
        progressBar.value += 10;
        
        // Announce progress update
        var statusDiv = document.getElementById('liveStatus');
        statusDiv.textContent = 'Progress: ' + progressBar.value + ' percent';
        
        if (progressBar.value >= 100) {
            clearInterval(interval);
            statusDiv.textContent = 'Processing complete';
        }
    }, 1000);
</script>
```

## Keyboard Navigation

The Progress Bar supports keyboard navigation for accessibility:

| Keyboard Command | Action |
|------------------|--------|
| **Tab** | Move focus to the progress bar element |
| **Ctrl + P** | Print the progress bar |
| **Escape** | Clear focus (standard behavior) |

### Keyboard Navigation Implementation

```html
@(Html.EJS().ProgressBar("keyboardProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .Height("30")
    .Render()
)

<p>Press Tab to focus the progress bar. Press Ctrl+P to print.</p>
```

### Keyboard-Accessible Controls

Add keyboard controls for updating progress:

```html
@(Html.EJS().ProgressBar("controlProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .Render()
)

<div style="margin-top: 20px;">
    <p>Use keyboard to control progress:</p>
    <ul>
        <li>+ (Plus) - Increase progress by 10%</li>
        <li>- (Minus) - Decrease progress by 10%</li>
        <li>0 - Reset to 0%</li>
        <li>100 - Set to 100%</li>
    </ul>
</div>

<script>
    var progressBar = document.getElementById('controlProgress').ej2_instances[0];
    
    document.addEventListener('keydown', function(event) {
        if (event.key === '+') {
            progressBar.value = Math.min(progressBar.value + 10, 100);
        } else if (event.key === '-') {
            progressBar.value = Math.max(progressBar.value - 10, 0);
        } else if (event.key === '0') {
            progressBar.value = 0;
        } else if (event.key === 'Enter' && event.ctrlKey) {
            progressBar.value = 100;
        }
    });
</script>
```

## Color Contrast

Syncfusion Progress Bar components have sufficient color contrast for readability:

### Default High Contrast

```csharp
<!-- Syncfusion defaults meet WCAG AA contrast requirements -->
@(Html.EJS().ProgressBar("defaultProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Height("30")
    .Render()
)
```

### High Contrast Theme

Use the high contrast theme for enhanced visibility:

```html
<!-- In _Layout.cshtml, use high contrast CSS instead of material.css -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.2.36/highcontrast.css" />

@(Html.EJS().ProgressBar("highContrastProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(70)
    .Height("30")
    .Theme(Syncfusion.EJ2.ProgressBar.ProgressTheme.HighContrast)
    .Render()
)
```

### Custom Colors with Accessible Contrast

When customizing colors, ensure adequate contrast:

```csharp
// ✓ Good contrast (foreground on background)
@(Html.EJS().ProgressBar("goodContrast")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .ProgressColor("#000000")  // Black on white track
    .TrackColor("#FFFFFF")
    .Height("30")
    .Render()
)

// Avoid low contrast combinations
// ✗ Poor - Light gray on white is hard to read
@(Html.EJS().ProgressBar("poorContrast")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .ProgressColor("#CCCCCC")  // Too light
    .TrackColor("#FFFFFF")
    .Height("30")
    .Render()
)
```

## RTL (Right-to-Left) Support

The Progress Bar supports right-to-left languages:

### Enable RTL

```csharp
@(Html.EJS().ProgressBar("rtlProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(65)
    .Height("30")
    .EnableRtl(true)  // Enable RTL layout
    .Render()
)
```

### Full Page RTL

```html
<!-- Set RTL on HTML element for entire page -->
<html dir="rtl" lang="ar">
<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.2.36/material.css" />
    <script src="https://cdn.syncfusion.com/ej2/23.2.36/dist/ej2.min.js"></script>
</head>
<body>
    @(Html.EJS().ProgressBar("progressBar")
        .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
        .Value(60)
        .Height("30")
        .Render()
    )
    
    @Html.EJS().ScriptManager()
</body>
</html>
```

### RTL with Arabic Content

```html
<div dir="rtl" lang="ar">
    <h2>تقدم التحميل</h2>
    
    @(Html.EJS().ProgressBar("arabicProgress")
        .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
        .Value(75)
        .Height("30")
        .EnableRtl(true)
        .Render()
    )
    
    <p>جاري تحميل الملف...</p>
</div>
```

## Mobile Accessibility

Progress bars are accessible on mobile devices:

### Touch-Friendly Implementation

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">

@(Html.EJS().ProgressBar("mobileProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(50)
    .Height("200")
    .Width("200")
    .Render()
)

<!-- Provide accessible labels for touch devices -->
<div role="region" aria-label="Progress status">
    <p id="mobileStatus">Processing: 50%</p>
</div>

<script>
    var progressBar = document.getElementById('mobileProgress').ej2_instances[0];
    
    // Update status for screen readers on mobile
    setInterval(function() {
        document.getElementById('mobileStatus').textContent = 
            'Processing: ' + Math.round(progressBar.value) + '%';
    }, 1000);
</script>
```

## Testing Accessibility

### Screen Reader Testing

Test with common screen readers:
- **NVDA** (Free, Windows)
- **JAWS** (Commercial, Windows)
- **VoiceOver** (Built-in, Mac/iOS)
- **TalkBack** (Built-in, Android)

### Keyboard Navigation Testing

- Tab through all controls
- Ensure focus indicator is visible
- Use keyboard shortcuts like Ctrl+P for print
- Verify logical tab order

### Color Contrast Testing

Tools to verify contrast ratios:
- WebAIM Contrast Checker
- Accessibility Insights
- axe DevTools Browser Extension

### Automated Testing

```html
<!-- Use accessibility testing tools -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/axe-core/4.4.1/axe.min.js"></script>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        // Run accessibility checks
        axe.run(function(error, results) {
            if (error) throw error;
            console.log('Accessibility audit:', results);
        });
    });
</script>
```

## Accessible Progress Bar Implementation

Complete example following all accessibility guidelines:

```html
<div role="region" aria-labelledby="uploadHeading">
    <h2 id="uploadHeading">File Upload Progress</h2>
    
    <p id="uploadDescription">
        Your file is being uploaded. The progress bar below shows the percentage complete.
    </p>
    
    @(Html.EJS().ProgressBar("accessibleUpload")
        .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
        .Value(0)
        .Height("30")
        .Render()
    )
    
    <div aria-live="polite" aria-atomic="true" style="margin-top: 15px; font-size: 14px;">
        <p>Upload progress: <span id="progressPercent">0%</span></p>
        <p id="progressStatus">Ready to upload</p>
    </div>
    
    <button id="uploadButton" style="margin-top: 15px; padding: 10px 20px;">
        Start Upload
    </button>
</div>

<script>
    var progressBar = document.getElementById('accessibleUpload').ej2_instances[0];
    
    document.getElementById('uploadButton').addEventListener('click', function() {
        var currentValue = 0;
        var interval = setInterval(function() {
            currentValue += Math.random() * 15;
            currentValue = Math.min(currentValue, 100);
            
            progressBar.value = currentValue;
            
            // Update status for accessibility
            document.getElementById('progressPercent').textContent = 
                Math.round(currentValue) + '%';
            
            if (currentValue < 50) {
                document.getElementById('progressStatus').textContent = 'Uploading...';
            } else if (currentValue < 90) {
                document.getElementById('progressStatus').textContent = 'Almost complete...';
            } else {
                document.getElementById('progressStatus').textContent = 'Finalizing...';
            }
            
            if (currentValue >= 100) {
                clearInterval(interval);
                document.getElementById('progressStatus').textContent = 
                    'Upload complete! ✓';
            }
        }, 500);
    });
</script>
```

## Best Practices for Accessible Progress Bars

### 1. Always Provide Labels
```csharp
<!-- ✓ Good -->
<label id="pgLabel">Download Progress</label>
@(Html.EJS().ProgressBar("progressBar")
    .Render()
)

<!-- ✗ Poor - No label -->
@(Html.EJS().ProgressBar("progressBar").Render())
```

### 2. Use Semantic HTML
```html
<!-- ✓ Good -->
<section role="region" aria-labelledby="heading">
    <h2 id="heading">Process Status</h2>
    @Html.EJS().ProgressBar("progress").Render()
</section>

<!-- ✗ Poor - Missing semantic structure -->
<div>
    @Html.EJS().ProgressBar("progress").Render()
</div>
```

### 3. Announce Important Updates
```csharp

.ValueChanged("onUpdate")

```

### 4. Support Keyboard Navigation
```html
<!-- ✓ Good - Keyboard accessible -->
<button onclick="incrementProgress()">Increase Progress</button>
<button onclick="decrementProgress()">Decrease Progress</button>

<!-- ✗ Poor - Mouse only -->
<div onmousedown="incrementProgress()">Increase</div>
```

### 5. Test with Real Users
- Include people with disabilities in testing
- Use actual assistive technologies
- Get feedback from actual users
- Test on real devices and browsers
