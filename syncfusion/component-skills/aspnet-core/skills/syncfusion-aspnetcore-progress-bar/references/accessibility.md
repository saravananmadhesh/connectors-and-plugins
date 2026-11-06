# Accessibility

## Table of Contents
- [Overview](#overview)
- [WCAG Compliance](#wcag-compliance)
  - [WCAG 2.2 Level AA Standards](#wcag-22-level-aa-standards)
  - [Compliance Checklist](#compliance-checklist)
- [ARIA Attributes and Roles](#aria-attributes-and-roles)
  - [Required ARIA Attributes](#required-aria-attributes)
  - [ARIA Attributes Explained](#aria-attributes-explained)
  - [Label vs Aria-Label](#label-vs-aria-label)
  - [Dynamic ARIA Updates](#dynamic-aria-updates)
- [Keyboard Navigation](#keyboard-navigation)
  - [Tab Key Navigation](#tab-key-navigation)
  - [Supported Keyboard Shortcuts](#supported-keyboard-shortcuts)
  - [Keyboard-Only User Support](#keyboard-only-user-support)
- [Screen Reader Support](#screen-reader-support)
  - [Screen Reader Announcements](#screen-reader-announcements)
  - [Using aria-live for Announcements](#using-aria-live-for-announcements)
  - [Testing with Screen Readers](#testing-with-screen-readers)
- [Color Contrast](#color-contrast)
  - [Contrast Ratio Requirements](#contrast-ratio-requirements)
  - [High Contrast Theme](#high-contrast-theme)
  - [Color Alone Shouldn't Convey Information](#color-alone-shouldnt-convey-information)
- [Testing and Validation](#testing-and-validation)
  - [Accessibility Audit Checklist](#accessibility-audit-checklist)
  - [Automated Testing Tools](#automated-testing-tools)
  - [Manual Testing Procedure](#manual-testing-procedure)
- [Best Practices](#best-practices)
  - [Always Include ARIA Attributes](#1-always-include-aria-attributes)
  - [Provide Clear Labels](#2-provide-clear-labels)
  - [Support Keyboard Navigation](#3-support-keyboard-navigation)
  - [Ensure Sufficient Color Contrast](#4-ensure-sufficient-color-contrast)
  - [Test with Real Users](#5-test-with-real-users)
  - [Update ARIA Dynamically](#6-update-aria-dynamically)
  - [Provide Alternative Information](#7-provide-alternative-information)

## Overview

The Syncfusion Progress Bar component is built with accessibility in mind. It follows Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards and includes support for:

- **WCAG 2.2 Compliance** - Level AA conformance
- **Section 508 Support** - US federal accessibility law
- **ARIA Implementation** - Semantic markup for assistive technologies
- **Keyboard Navigation** - Full support for keyboard-only users
- **Screen Reader Support** - Compatible with assistive technologies
- **Color Contrast** - Sufficient contrast ratios for visibility
- **Right-to-Left (RTL)** - Support for RTL languages
- **Mobile Device Support** - Optimized for Visibility on Small Screens

## WCAG Compliance

### WCAG 2.2 Level AA Standards

The Progress Bar component conforms to WCAG 2.2 Level AA, ensuring:

```cshtml
<!-- Accessible progress bar with proper markup -->
<ejs-progressbar id="accessibleProgress" 
                  type="Linear" 
                  value="50"
                  role="Warning"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Document upload progress"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

Key compliance aspects:

- **Perceivable**: Progress is visually and programmatically identifiable
- **Operable**: Can be operated via keyboard and screen readers
- **Understandable**: Purpose and value are clear
- **Robust**: Works with assistive technologies

### Compliance Checklist

| Criterion | Status | Details |
|-----------|--------|---------|
| **WCAG 2.2** | ✓ Level AA | Full compliance with all Level AA requirements |
| **Section 508** | ✓ Supported | US federal accessibility compliance |
| **ARIA Roles** | ✓ Supported | Proper role and attributes implemented |
| **Keyboard** | ✓ Supported | Full keyboard navigation |
| **Screen Reader** | ✓ Supported | Compatible with NVDA, JAWS, VoiceOver |
| **Color Contrast** | ✓ Supported | Meets minimum 4.5:1 ratio |
| **RTL Support** | ✓ Supported | Right-to-left language support |
| **Mobile a11y** | ✓ Supported | Touch and mobile accessibility |

## ARIA Attributes and Roles

### Required ARIA Attributes

All progress bars should include these ARIA attributes:

```cshtml
<ejs-progressbar id="ariaProgress" 
                  type="Linear" 
                  value="45"
                  role="Info"
                  aria-valuenow="45"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="File upload progress"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

### ARIA Attributes Explained

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `role="Auto", "Danger", "Info", "Success" or "Warning"` | Identifies as progress indicator | Required for screen readers |
| `aria-valuenow` | Current value | Same as `value` property |
| `aria-valuemin` | Minimum value | Same as `minimum` property |
| `aria-valuemax` | Maximum value | Same as `maximum` property |
| `aria-label` | Accessible name | Clear description of progress |
| `aria-describedby` | Additional description | References element with details |

### Label vs Aria-Label

```cshtml
<!-- Using aria-label for inline progress bar -->
<ejs-progressbar id="inline" 
                  type="Linear" 
                  value="60"
                  aria-label="Processing: 60% complete"
                  role="Warning"
                  aria-valuenow="60"
                  aria-valuemin="0"
                  aria-valuemax="100">
</ejs-progressbar>

<!-- Using aria-describedby for associated description -->
<label for="labeled">Upload Progress:</label>
<ejs-progressbar id="labeled" 
                  type="Linear" 
                  value="75"
                  role="Warning"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-describedby="uploadStatus">
</ejs-progressbar>
<div id="uploadStatus">Uploading: 75 MB of 100 MB complete</div>
```

### Dynamic ARIA Updates

Update ARIA attributes when progress changes:

```cshtml
<ejs-progressbar id="dynamicAria" 
                  type="Linear" 
                  value="0"
                  valueChanged="updateAria"
                  role="Danger"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Task progress"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<script>
function updateAria(args) {
    var element = document.getElementById('dynamicAria');
    
    // Update ARIA attributes as progress changes
    element.setAttribute('aria-valuenow', args.value);
    
    // Announce status changes to screen readers
    if (args.value === 100) {
        element.setAttribute('aria-label', 'Task completed successfully');
    } else if (args.value === 50) {
        element.setAttribute('aria-label', 'Task progress: 50% complete');
    }
}
</script>
```

## Keyboard Navigation

### Tab Key Navigation

Progress bars must be keyboard accessible:

```cshtml
<ejs-progressbar id="keyboardProgress" 
                  type="Linear" 
                  value="50"
                  tabindex="0"
                  role="Warning"
                  aria-label="Example progress"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<script>
// Allow keyboard focus
document.getElementById('keyboardProgress').addEventListener('focus', function() {
    console.log('Progress bar focused');
});

document.getElementById('keyboardProgress').addEventListener('blur', function() {
    console.log('Progress bar unfocused');
});
</script>
```

### Supported Keyboard Shortcuts

| Key | Action | Purpose |
|-----|--------|---------|
| <kbd>Tab</kbd> | Move focus to progress bar | Navigate to component |
| <kbd>Shift+Tab</kbd> | Move focus backwards | Navigate backwards |
| <kbd>Ctrl+P</kbd> | Print progress bar | Print current state |
| <kbd>Home</kbd> | Jump to start | (If interactive) |
| <kbd>End</kbd> | Jump to end | (If interactive) |

### Keyboard-Only User Support

```cshtml
<!-- Ensure keyboard users can access all features -->
<div>
    <label for="progressUpdate">Update Progress:</label>
    <input id="progressUpdate"
           type="range"
           min="0"
           max="100"
           value="50"
           aria-label="Progress slider">

    <ejs-progressbar id="sliderProgress"
                     type="Linear"
                     value="50"
                     minimum="0"
                     maximum="100"
                     tabindex="0"
                     role="progressbar"
                     aria-label="Current progress state"
                     aria-valuenow="50"
                     aria-valuemin="0"
                     aria-valuemax="100">
    </ejs-progressbar>

    <button type="button" id="btnInc">Increase Progress</button>
    <button type="button" id="btnDec">Decrease Progress</button>
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {

    function initKeyboardProgress() {
        const el = document.getElementById('sliderProgress');
        const pb = el && el.ej2_instances && el.ej2_instances[0];
        if (!pb) {
            requestAnimationFrame(initKeyboardProgress);
            return;
        }
        const slider = document.getElementById('progressUpdate');
        slider.addEventListener('input', function (e) {
            pb.value = parseInt(e.target.value, 10);
            pb.dataBind(); 
            el.setAttribute('aria-valuenow', String(pb.value));
        });
        document.getElementById('btnInc').addEventListener('click', function () {
            pb.value = Math.min(100, (pb.value || 0) + 10);
            pb.dataBind(); // 
            slider.value = pb.value;
            el.setAttribute('aria-valuenow', String(pb.value));
        });
        document.getElementById('btnDec').addEventListener('click', function () {
            pb.value = Math.max(0, (pb.value || 0) - 10);
            pb.dataBind(); // 
            slider.value = pb.value;
            el.setAttribute('aria-valuenow', String(pb.value));
        });
    }
    initKeyboardProgress();
});
</script>
```

## Screen Reader Support

### Screen Reader Announcements

Progress bars announce their state to screen readers automatically:

```cshtml
<ejs-progressbar id="screenReaderProgress" 
                  type="Linear" 
                  value="0"
                  valueChanged="announceProgress"
                  role="Danger"
                  aria-valuenow="0"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Document processing"
                  aria-live="polite"
                  aria-atomic="true"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<script>
// Announce significant progress changes
var lastAnnounced = 0;

function announceProgress(args) {
    // Only announce every 25% change to reduce verbosity
    if (Math.floor(args.value / 25) > Math.floor(lastAnnounced / 25)) {
        var announcement = args.value + ' percent complete';
        console.log('[Screen Reader]: ' + announcement);
        lastAnnounced = args.value;
    }
}
</script>
```

### Using aria-live for Announcements

```cshtml
<div role="status" aria-live="polite" aria-atomic="true" id="progressStatus">
    Progress: 0%
</div>

<ejs-progressbar id="liveProgress" 
                  type="Linear" 
                  value="0"
                  valueChanged="updateLiveRegion"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<script>
function updateLiveRegion(args) {
    var status = document.getElementById('progressStatus');
    
    if (args.value === 0) {
        status.textContent = 'Progress: Starting';
    } else if (args.value < 100) {
        status.textContent = 'Progress: ' + args.value + ' percent complete';
    } else {
        status.textContent = 'Progress: Complete';
    }
}
</script>
```

### Testing with Screen Readers

Test with popular screen readers:
- **NVDA** (Windows, free)
- **JAWS** (Windows, commercial)
- **VoiceOver** (macOS/iOS, built-in)
- **TalkBack** (Android, built-in)

Common test scenarios:
1. Navigate to progress bar with Tab key
2. Verify role and value are announced
3. Verify label/description is read
4. Verify value updates are announced
5. Test with different progress bar types

## Color Contrast

### Contrast Ratio Requirements

WCAG AA requires minimum 4.5:1 contrast for normal text, 3:1 for graphics:

```cshtml
<style>
    /* Ensure sufficient contrast */
    .accessible-progress .e-progress-bar {
        background-color: #0066CC; /* Sufficient contrast on white */
    }
    
    .accessible-progress .e-progress-track {
        background-color: #F0F0F0; /* Light gray on white */
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
        .accessible-progress .e-progress-bar {
            background-color: #4DA6FF; /* Still contrasts on dark bg */
        }
        
        .accessible-progress .e-progress-track {
            background-color: #333333;
        }
    }
</style>

<ejs-progressbar id="contrastProgress" 
                  type="Linear" 
                  value="60"
                  class="accessible-progress"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

### High Contrast Theme

Provide high contrast option for users with visual impairments:

```cshtml
<ejs-progressbar id="highContrastProgress" 
                  type="Linear" 
                  value="70"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ version }}/highcontrast.css">

<script>
// Apply high contrast theme
function enableHighContrast() {
    document.body.classList.add('e-highcontrast');
}

// Detect user preference
if (window.matchMedia('(prefers-contrast: more)').matches) {
    enableHighContrast();
}
</script>
```

### Color Alone Shouldn't Convey Information

```cshtml
<!-- Bad: Uses only color -->
<ejs-progressbar class="bad-access"
                  id="bad-pb" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<!-- Good: Uses color + text/icon -->
<div style="display:flex;align-items:center;">
    <ejs-progressbar class="good-access"
                      id="good-pb" 
                      type="Linear" 
                      value="50"
                      showProgressValue="true"
                      minimum="0" 
                      maximum="100"
                      style="flex:1;">
    </ejs-progressbar>
    <span>50% Complete</span>
</div>
```

## Testing and Validation

### Accessibility Audit Checklist

```
✓ Semantic HTML Structure
  - Progress bar uses <div role="Auto">
  - Has proper ARIA attributes
  - Relationships are semantic

✓ ARIA Implementation
  - role="Auto", "Danger", "Info", "Success" or "Warning" present
  - aria-valuenow matches current value
  - aria-valuemin, aria-valuemax defined
  - aria-label provides accessible name

✓ Keyboard Navigation
  - Tab key navigates to component
  - Tab order is logical
  - No keyboard traps
  - Keyboard shortcuts work

✓ Screen Reader Testing
  - Role is announced
  - Value is announced
  - Label is announced
  - Changes are announced

✓ Visual Design
  - Color contrast ≥ 4.5:1
  - Not color-only information
  - Sufficient focus indicators
  - Works in high contrast mode

✓ Responsive Design
  - Works on all screen sizes
  - Touch-friendly on mobile
  - Adapts to zoom levels
  - Works in portrait/landscape
```

### Automated Testing Tools

Use accessibility testing tools to validate:

```html
<!-- Syncfusion uses these tools for validation -->
- Accessibility Checker (npm package)
- axe-core (accessibility testing engine)
- WAVE (WebAIM evaluation tool)
- Lighthouse (Chrome DevTools)
- NVDA (Screen reader testing)
```

### Manual Testing Procedure

```javascript
// Comprehensive accessibility test
function performAccessibilityTest() {
    var pb = document.getElementById('testProgress');
    var element = pb;
    
    console.log('=== Accessibility Test ===');
    
    // Check ARIA attributes
    console.log('Role:', element.getAttribute('role'));
    console.log('Value now:', element.getAttribute('aria-valuenow'));
    console.log('Value min:', element.getAttribute('aria-valuemin'));
    console.log('Value max:', element.getAttribute('aria-valuemax'));
    console.log('Label:', element.getAttribute('aria-label'));
    
    // Check keyboard accessibility
    console.log('Tab index:', element.getAttribute('tabindex'));
    console.log('Can receive focus:', pb.ej2_instances[0] !== null);
    
    // Check color contrast
    var computedStyle = window.getComputedStyle(element);
    console.log('Background:', computedStyle.backgroundColor);
    console.log('Color:', computedStyle.color);
    
    console.log('=== Test Complete ===');
}
```

## Best Practices

### 1. Always Include ARIA Attributes

```cshtml
<!-- ✓ Good -->
<ejs-progressbar id="good" 
                  type="Linear" 
                  value="50"
                  role="Auto"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Upload progress"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<!-- ✗ Bad -->
<ejs-progressbar id="bad" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

### 2. Provide Clear Labels

```cshtml
<!-- ✓ Good: Clear accessible name -->
<ejs-progressbar id="clear" 
                  aria-label="File upload: documents.zip"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<!-- ✗ Bad: Vague label -->
<ejs-progressbar id="vague" 
                  aria-label="Progress"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>
```

### 3. Support Keyboard Navigation

```cshtml
<!-- Make interactive progress bars keyboard accessible -->
<ejs-progressbar id="interactive" 
                  type="Linear" 
                  value="50"
                  tabindex="0"
                  minimum="0" 
                  maximum="100">
</ejs-progressbar>

<button tabindex="0">Previous</button>
<button tabindex="0">Next</button>
```

### 4. Ensure Sufficient Color Contrast

Test contrast ratios using:
- WebAIM Contrast Checker
- Stark (Figma plugin)
- Chrome DevTools Accessibility audit

Aim for 4.5:1 minimum.

### 5. Test with Real Users

Involve users with disabilities in testing:
- Keyboard-only users
- Screen reader users
- Users with low vision
- Users with color blindness

### 6. Update ARIA Dynamically

```cshtml
<script>
var pb = document.getElementById('progress');

pb.valueChanged = function(args) {
    // Always update aria-valuenow
    pb.setAttribute('aria-valuenow', args.value);
};
</script>
```

### 7. Provide Alternative Information

```cshtml
<div>
    <ejs-progressbar type="Linear" value="60" minimum="0" maximum="100">
    </ejs-progressbar>
    <!-- Also provide text for users who can't see progress -->
    <p>60% of 100 items processed</p>
</div>
```

---

Building accessible progress bars ensures all users can understand the progress state and status. Follow these guidelines and test with real assistive technologies to verify accessibility.
