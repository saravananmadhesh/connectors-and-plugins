# Accessibility and RTL Support

## Table of Contents
- [Accessibility Overview](#accessibility-overview)
  - [Accessibility Features](#accessibility-features)
- [WCAG and Standards Compliance](#wcag-and-standards-compliance)
  - [Accessibility Standards](#accessibility-standards)
  - [Compliance Levels](#compliance-levels)
- [WAI-ARIA Implementation](#wai-aria-implementation)
  - [ARIA Attributes](#aria-attributes)
  - [Key ARIA Attributes](#key-aria-attributes)
  - [Adding Custom ARIA Labels](#adding-custom-aria-labels)
- [Keyboard Navigation](#keyboard-navigation)
  - [Supported Keyboard Shortcuts](#supported-keyboard-shortcuts)
  - [Implementing Keyboard Navigation](#implementing-keyboard-navigation)
  - [Testing Keyboard Navigation](#testing-keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
  - [Compatible Screen Readers](#compatible-screen-readers)
  - [How Screen Readers Interact](#how-screen-readers-interact)
  - [Example: NVDA Announcement](#example-nvda-announcement)
  - [Testing with Screen Readers](#testing-with-screen-readers)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
  - [Enabling RTL Mode](#enabling-rtl-mode)
  - [RTL Layout Changes](#rtl-layout-changes)
  - [CSS for RTL Support](#css-for-rtl-support)
  - [RTL Example: Arabic Interface](#rtl-example-arabic-interface)
- [Color Contrast and Visual Accessibility](#color-contrast-and-visual-accessibility)
  - [WCAG Color Contrast Requirements](#wcag-color-contrast-requirements)
  - [Checking Color Contrast](#checking-color-contrast)
  - [Tools for Testing Contrast](#tools-for-testing-contrast)
  - [Visual Accessibility Best Practices](#visual-accessibility-best-practices)
- [Mobile Accessibility](#mobile-accessibility)
  - [Touch-Friendly Controls](#touch-friendly-controls)
  - [Mobile Touch Gestures](#mobile-touch-gestures)
  - [Mobile Accessibility Requirements](#mobile-accessibility-requirements)
- [Implementation Checklist](#implementation-checklist)
  - [ARIA and Semantic HTML](#aria-and-semantic-html)
  - [Keyboard Navigation Checklist](#keyboard-navigation-checklist)
  - [Screen Readers](#screen-readers)
  - [Color and Contrast](#color-and-contrast)
  - [Mobile/Touch](#mobiletouch)
  - [RTL Support](#rtl-support)
  - [General](#general)
- [Accessibility Resources](#accessibility-resources)

## Accessibility Overview

The Range Navigator component includes comprehensive accessibility features to ensure usability for all users, including those with disabilities. These features align with international accessibility standards and best practices.

### Accessibility Features

- **Keyboard Navigation**: Full control via keyboard without requiring mouse
- **Screen Reader Support**: Compatible with JAWS, NVDA, and other assistive technologies
- **ARIA Attributes**: Proper semantic markup for assistive devices
- **Color Contrast**: Meets WCAG 2.2 AA color contrast ratios
- **Mobile Accessibility**: Touch-friendly controls and responsive design
- **RTL Language Support**: Proper right-to-left text direction for Arabic, Hebrew, etc.

## WCAG and Standards Compliance

### Accessibility Standards

The Range Navigator meets these international standards:

| Standard | Status | Details |
|----------|--------|---------|
| **WCAG 2.2** | ✓ AA Level | Level AA conformance (enhanced accessibility) |
| **Section 508** | ✓ Compliant | U.S. federal accessibility requirements |
| **ADA** | ✓ Compliant | Americans with Disabilities Act standards |
| **ATAG 2.0** | ✓ Compliant | Authoring Tool Accessibility Guidelines |

### Compliance Levels

- **WCAG A (Minimum)**: Basic accessibility
- **WCAG AA (Standard)**: Enhanced accessibility - recommended for most web content
- **WCAG AAA (Advanced)**: Highest accessibility level

The Range Navigator achieves **WCAG 2.2 AA** compliance, meeting or exceeding industry standards.

## WAI-ARIA Implementation

### ARIA Attributes

The Range Navigator automatically includes proper ARIA attributes:

```html
<!-- Range Navigator renders with ARIA roles and attributes -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .DataSource(Model)
    .Render()
)

<!-- Generated HTML includes:
<div role="region" aria-label="Range Navigator">
    <!-- Control content -->
</div>
-->
```

### Key ARIA Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| **role="region"** | Identifies Range Navigator as a region | Alerts screen readers to important content |
| **aria-label** | Descriptive label for assistive devices | "Stock Price Range Navigator" |

### Adding Custom ARIA Labels

```html
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .Tooltip(tooltip =>
    {
        tooltip.Enable(true)
               .Format("Date: ${x}, Value: ${y}");
    })
    .DataSource(Model)
    .Render()
)

<script>
// Add custom ARIA label after rendering
var navigator = document.getElementById('container');
navigator.setAttribute('aria-label', 'Sales data range selector for Q1-Q4 2023');
</script>
```

## Keyboard Navigation

### Supported Keyboard Shortcuts

Users can navigate and control the Range Navigator using keyboard only:

| Key | Action | Use Case |
|-----|--------|----------|
| **Tab** | Move focus to Range Navigator | Enter the control from other page elements |
| **Shift+Tab** | Move focus away from control | Exit to previous focusable element |
| **Left Arrow** | Move start handle left | Decrease start of range |
| **Right Arrow** | Move start handle right | Increase start of range |
| **Ctrl+Left Arrow** | Move end handle left | Decrease end of range |
| **Ctrl+Right Arrow** | Move end handle right | Increase end of range |
| **Ctrl+P** | Print Range Navigator | Generate printable view |
| **Enter** | Activate focused element | Confirm selection or action |

### Implementing Keyboard Navigation

Keyboard navigation is enabled by default. Ensure proper tab order in your page:

```html
<!-- Good: Proper tab order -->
<input type="text" placeholder="Search">
<div id="rangeNavigator"></div>
<button>Apply Filters</button>

@(Html.EJS().RangeNavigator("rangeNavigator")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .DataSource(Model)
    .Render()
)
```

### Testing Keyboard Navigation

1. Load page and press **Tab** key repeatedly
2. Verify focus moves through interactive elements in logical order
3. When Range Navigator is focused, use arrow keys to adjust range
4. Press **Ctrl+P** to verify print functionality works

## Screen Reader Support

### Compatible Screen Readers

The Range Navigator is tested with:
- **JAWS** (Windows)
- **NVDA** (Windows, open-source)
- **VoiceOver** (macOS, iOS)
- **TalkBack** (Android)

### How Screen Readers Interact

Screen readers announce:
- Component role and label ("Range Navigator, region")
- Current selected range values
- Available keyboard shortcuts
- Interactive elements and their states

### Example: NVDA Announcement

When user tabs to Range Navigator, NVDA announces:
```
"Range Navigator region. Use arrow keys to adjust range. 
Selected range: January 1, 2023 to December 31, 2023"
```

### Testing with Screen Readers

1. Download and install NVDA (free) or JAWS (paid)
2. Enable screen reader
3. Navigate to Range Navigator
4. Verify announced content includes:
   - Component type and label
   - Selected range information
   - Available keyboard controls

## RTL (Right-to-Left) Support

### Enabling RTL Mode

For languages that read right-to-left (Arabic, Hebrew, Persian, Urdu), enable RTL support:

```html
<!-- Enable RTL for entire page -->
<html dir="rtl">
<head>
    <!-- RTL CSS -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.rtl.css" />
</head>
<body>
    @(Html.EJS().RangeNavigator("container")
        .Series(series =>
        {
            series.XName("Date")
                  .YName("Value")
                  .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
                  .Add();
        })
        .EnableRtl(true)
        .DataSource(Model)
        .Render()
    )
</body>
</html>
```

### RTL Layout Changes

When RTL is enabled:
- Control mirrors horizontally
- Thumbs appear on opposite sides
- Text aligns to the right
- Navigation direction reverses
- All labels and tooltips adapt appropriately

### CSS for RTL Support

```html
<!-- Use RTL stylesheet -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.rtl.css" />
```

Or set in C#:

```csharp
@{
    bool isRtl = System.Globalization.CultureInfo.CurrentCulture.TextInfo.IsRightToLeft;
}

<html dir="@(isRtl ? "rtl" : "ltr")">
```

### RTL Example: Arabic Interface

```html
<!-- Arabic interface with RTL support -->
@{
    ViewBag.Title = "مستكشف النطاق";  // Range Navigator in Arabic
}

<html dir="rtl" lang="ar">
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.rtl.css" />
</head>
<body>
    <h1>@ViewBag.Title</h1>
    
    @(Html.EJS().RangeNavigator("container")
        .Series(series =>
        {
            series.XName("التاريخ")
                  .YName("القيمة")
                  .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
                  .Add();
        })
        .EnableRtl(true)
        .Tooltip(tooltip =>
        {
            tooltip.Enable(true)
                   .Format("التاريخ: ${x}<br/>القيمة: ${y}");
        })
        .DataSource(Model)
        .Render()
    )
    
    @Html.EJS().ScriptManager()
</body>
</html>
```

## Color Contrast and Visual Accessibility

### WCAG Color Contrast Requirements

| Element | WCAG AA | WCAG AAA | Example |
|---------|---------|---------|---------|
| **Normal Text** | 4.5:1 | 7:1 | Black on white: 21:1 ✓ |
| **Large Text** | 3:1 | 4.5:1 | 18pt text |
| **UI Components** | 3:1 | N/A | Control borders, focus indicators |
| **Graphics** | 3:1 | N/A | Grid lines, borders |

### Checking Color Contrast

```html
<!-- Example: WCAG AA compliant colors -->
@(Html.EJS().RangeNavigator("container")
    .Series(series =>
    {
        series.XName("Date")
              .YName("Value")
              .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
              .Add();
    })
    .NavigatorStyleSettings(ns =>
    {
        ns.SelectedRegionColor("#1f77b4")      // Blue: 8.6:1 contrast with white background ✓
          .UnselectedRegionColor("#e7e7e7");   // Light gray: 11:1 contrast with white background ✓
    })
    .NavigatorBorder(border =>
    {
        border.Color("#333333")                // Dark gray: 12.6:1 contrast with white background ✓
              .Width(2);
    })
    .DataSource(Model)
    .Render()
)
```

### Tools for Testing Contrast

- **WebAIM Contrast Checker**: webaim.org/resources/contrastchecker
- **Lighthouse**: Built into Chrome DevTools
- **WAVE**: Browser extension for accessibility testing
- **Axe DevTools**: Free browser extension

### Visual Accessibility Best Practices

1. **Don't rely on color alone**: Use patterns, icons, or text labels
2. **Sufficient contrast**: Verify 4.5:1 ratio for normal text
3. **Focus indicators**: Make focused elements clearly visible
4. **Consistent design**: Use consistent colors and styles throughout

## Mobile Accessibility

### Touch-Friendly Controls

The Range Navigator adapts for mobile accessibility:

```html
<!-- Responsive container for mobile -->
<style>
    .mobile-range-container {
        width: 100%;
        height: 250px;
        margin-bottom: 20px;
    }
    
    @media (min-width: 768px) {
        .mobile-range-container {
            height: 350px;
        }
    }
</style>

<div class="mobile-range-container">
    @(Html.EJS().RangeNavigator("container")
        .Series(series =>
        {
            series.XName("Date")
                  .YName("Value")
                  .Type(Syncfusion.EJ2.Charts.RangeNavigatorType.Area)
                  .Add();
        })
        .Height("100%")
        .Width("100%")
        .DataSource(Model)
        .Render()
    )
</div>
```

### Mobile Touch Gestures

- **Tap and drag**: Adjust range handles
- **Two-finger pinch**: Zoom (if supported)
- **Tap button**: Select period preset

### Mobile Accessibility Requirements

- **Touch targets**: Minimum 44x44 pixels (WCAG 2.5.5)
- **Spacing**: At least 8px between interactive elements
- **Font size**: Minimum 14-16px for readability
- **Device support**: Test on iOS and Android devices

## Implementation Checklist

Before deploying to production, verify:

### ARIA and Semantic HTML
- [ ] Component has `role="region"`
- [ ] Descriptive aria-label present
- [ ] aria-valuenow, min, max properly set
- [ ] Focus management working correctly

### Keyboard Navigation Checklist
- [ ] Tab key moves focus into control
- [ ] Arrow keys adjust range
- [ ] Shift+Tab moves focus out
- [ ] Ctrl+P prints control
- [ ] All functions accessible via keyboard

### Screen Readers
- [ ] Tested with NVDA and JAWS
- [ ] Labels and descriptions announced
- [ ] Range values communicated clearly
- [ ] Keyboard shortcuts explained

### Color and Contrast
- [ ] Text contrast ≥ 4.5:1 (AA standard)
- [ ] UI components contrast ≥ 3:1
- [ ] Color not sole means of information
- [ ] Verified with contrast checking tool

### Mobile/Touch
- [ ] Touch targets ≥ 44x44 pixels
- [ ] Touch gestures work smoothly
- [ ] Responsive layout tested
- [ ] Readable on small screens

### RTL Support
- [ ] RTL CSS loaded if multilingual
- [ ] EnableRtl(true) set for RTL cultures
- [ ] Text direction correct
- [ ] Layout mirrored properly

### General
- [ ] Automated accessibility scan passed (Lighthouse, Axe)
- [ ] Manual testing with real users
- [ ] Documentation updated
- [ ] Accessibility statement provided

## Accessibility Resources

- **W3C WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **MDN Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **WebAIM**: https://webaim.org/
- **ARIA Authoring Practices Guide**: https://www.w3.org/WAI/ARIA/apg/
