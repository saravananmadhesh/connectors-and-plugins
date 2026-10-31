# Accessibility in Smith Chart

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
  -[Compliance Levels](#compliance-levels)
- [WAI-ARIA Attributes](#wai-aria-attributes)
  - [ARIA Roles and Attributes](#aria-roles-and-attributes)
  - [Using ARIA Labels](#using-aria-labels)
- [Keyboard Navigation](#keyboard-navigation)
  - [Supported Keyboard Shortcuts](#supported-keyboard-shortcuts)
  - [Keyboard Navigation Usage](#keyboard-navigation-usage)
  - [Example: Keyboard-Friendly Controls](#example-keyboard-friendly-controls)
- [Screen Reader Support](#screen-reader-support)
  - [Providing Text Descriptions](#providing-text-descriptions)
  - [Data Table Alternative](#data-table-alternative)
- [Color Contrast](#color-contrast)
  - [Recommended Color Schemes](#recommended-color-schemes)
- [Mobile Device Support](#mobile-device-support)
  - [Touch-Friendly Implementation](#touch-friendly-implementation)
  - [Viewport Configuration](#viewport-configuration)
- [Implementation Best Practices](#implementation-best-practices)
  - [Complete Accessible Example](#complete-accessible-example)
- [Testing for Accessibility](#testing-for-accessibility)
  - [Tools and Resources](#tools-and-resources)
  - [Testing Checklist](#testing-checklist)
- [Summary](#summary)

## WCAG 2.2 Compliance

The Syncfusion Smith Chart component is built with accessibility as a core principle, maintaining compliance with Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA. This ensures your Smith Chart visualizations are usable by everyone, including people with disabilities.

### Compliance Levels

| Accessibility Standard | Support Level |
| --- | --- |
| WCAG 2.2 | Level AA ✓ |
| Section 508 (US) | Partial |
| ADA (Americans with Disabilities Act) | Supported |
| Screen Reader Support | Partial |
| Keyboard Navigation | Partial |
| Color Contrast | Full ✓ |
| Mobile Device Support | Full ✓ |

The component undergoes automated testing with accessibility-checker and axe-core tools to ensure ongoing compliance.

## WAI-ARIA Attributes

Smith Chart implements Web Accessibility Initiative - Accessible Rich Internet Applications (WAI-ARIA) attributes to provide semantic information to assistive technologies:

### ARIA Roles and Attributes

**image role:** The Smith Chart is presented as an image when rendered:
```html
<div role="image" aria-label="Smith Chart visualization"></div>
```

**region role:** Important chart areas are marked as regions:
```html
<div role="region" aria-label="Smith Chart plotting area"></div>
```

**aria-label:** Provides descriptive text for screen readers:
```cshtml
<ejs-smithchart id="smithchart" aria-label="Transmission line impedance Smith Chart">
</ejs-smithchart>
```

**aria-hidden:** Hides decorative elements from screen readers:
```html
<div aria-hidden="true"><!-- Decorative gridlines --></div>
```

### Using ARIA Labels

Enhance accessibility by providing descriptive labels:

```cshtml
<ejs-smithchart id="smithchart" 
                 aria-label="Smith Chart: RF Circuit Analysis - Impedance Matching Visualization">
    <e-smithchart-title text="Impedance Analysis" visible="true" aria-label="Chart title: Impedance Analysis">
        <e-title-subtitle text="Transmission Line Parameters" 
                    aria-label="Chart subtitle: Transmission Line Parameters">
        </e-title-subtitle>
    </e-smithchart-title>
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Data1" name="Series 1" 
                  resistance="resistance" reactance="reactance"
                  aria-label="Series 1: Transmission line impedance data">
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>
```

## Keyboard Navigation

Smith Chart supports comprehensive keyboard navigation, enabling users who cannot use mice or touch interfaces to interact with the chart.

### Supported Keyboard Shortcuts

| Key | Action |
| --- | --- |
| <kbd>Tab</kbd> | Move focus to next element in Smith Chart |
| <kbd>Shift + Tab</kbd> | Move focus to previous element in Smith Chart |
| <kbd>Ctrl + P</kbd> | Print the Smith Chart |

### Keyboard Navigation Usage

Users can navigate through:
- Legend items (Tab to move between series)
- Data points (Tab through interactive elements)
- Control buttons (Print, Export)

The focus is visible on all interactive elements, with clear focus indicators.

### Example: Keyboard-Friendly Controls

```cshtml
<div id="smith-controls" role="toolbar" aria-label="Smith Chart controls">
    <button id="print-btn" aria-label="Print Smith Chart (Ctrl+P)">
        Print Chart
    </button>
    <button id="export-btn" aria-label="Export Smith Chart to image format">
        Export Chart
    </button>
    <button id="legend-toggle" aria-label="Toggle legend visibility">
        Toggle Legend
    </button>
</div>

<ejs-smithchart id="smithchart" aria-label="Interactive Smith Chart">
    <e-smithchart-legendsettings visible="true" toggleVisibility="true">
    </e-smithchart-legendsettings>  
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Data" name="Transmission Line" 
                                       resistance="resistance" reactance="reactance">
            <e-smithchartseries-tooltip visible="true"></e-smithchartseries-tooltip>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>

<script>
document.getElementById('print-btn').addEventListener('click', () => {
    document.getElementById('smithchart').ej2_instances[0].print();
});

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'p') {
        document.getElementById('smithchart').ej2_instances[0].print();
    }
});
</script>
```

## Screen Reader Support

Screen readers announce Smith Chart content to visually impaired users. Implement these practices for optimal support:

### Providing Text Descriptions

```cshtml
<div role="region" aria-label="Smith Chart Analysis">
    <h2>RF Circuit Impedance Visualization</h2>
    <p id="chart-description">
        This Smith Chart shows the impedance matching for a transmission line. 
        The chart plots resistance on the horizontal axis and reactance on the radial axis. 
        Blue line represents measured impedance, red line represents reference impedance.
    </p>
    
    <ejs-smithchart id="smithchart" 
                     role="image"
                     aria-describedby="chart-description"
                     aria-label="Smith Chart visualization of impedance data">
        <e-smithchart-smithchartseriescollection>
            <e-smithchart-smithchartseries dataSource="Measured" name="Measured Impedance" fill="blue" 
                                           resistance="resistance" reactance="reactance">
            </e-smithchart-smithchartseries>
            <e-smithchart-smithchartseries dataSource="Reference" name="Reference" fill="red" 
                                           resistance="resistance" reactance="reactance">
            </e-smithchart-smithchartseries>
        </e-smithchart-smithchartseriescollection>
    </ejs-smithchart>
</div>
```

### Data Table Alternative

Provide a data table alongside the chart for users who cannot interpret visual information:

```cshtml
<ejs-smithchart id="smithchart" aria-label="Smith Chart visualization">
    <!-- Chart configuration -->
</ejs-smithchart>

<table role="table" aria-label="Smith Chart data values">
    <thead>
        <tr>
            <th>Point</th>
            <th>Resistance (Ω)</th>
            <th>Reactance (Ω)</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Point 1</td>
            <td>10</td>
            <td>25</td>
        </tr>
        <tr>
            <td>Point 2</td>
            <td>20</td>
            <td>50</td>
        </tr>
        <!-- More data rows -->
    </tbody>
</table>
```

## Color Contrast

Smith Chart maintains sufficient color contrast for users with color vision deficiencies or viewing charts on poor-quality displays.

### Recommended Color Schemes

**For Deuteranopia (Red-Green Colorblindness):**
Use colors that remain distinct:
- Blue (#0000FF)
- Yellow (#FFFF00)
- Black (#000000)
- White (#FFFFFF)

```cshtml
<e-smithchart-smithchartseries dataSource="Data1" name="Series 1" fill="blue" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>
<e-smithchart-smithchartseries dataSource="Data2" name="Series 2" fill="yellow" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>
```

**General Best Practices:**
```cshtml
<e-smithchart-smithchartseries dataSource="Data1" name="Series 1" fill="#0066CC" opacity="1.0" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>
<e-smithchart-smithchartseries dataSource="Data2" name="Series 2" fill="#FF6600" opacity="1.0" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>
<e-smithchart-smithchartseries dataSource="Data3" name="Series 3" fill="#00AA00" opacity="1.0" 
                               resistance="resistance" reactance="reactance">
</e-smithchart-smithchartseries>
```

Verify contrast ratios:
- Text-to-background: at least 4.5:1 for normal text
- Series-to-background: at least 3:1 for graphical elements

## Mobile Device Support

Smith Chart is fully responsive and accessible on mobile devices:

### Touch-Friendly Implementation

```cshtml
<ejs-smithchart id="smithchart" width="100%" height="100%"
                 aria-label="Interactive Smith Chart for mobile devices">
    <e-smithchart-smithchartseriescollection>
        <e-smithchart-smithchartseries dataSource="Data" name="Series" 
                                       resistance="resistance" reactance="reactance">
            <e-smithchartseries-marker visible="true" width="10" height="10">
            </e-smithchartseries-marker>
        </e-smithchart-smithchartseries>
    </e-smithchart-smithchartseriescollection>
</ejs-smithchart>

<style>
    @media (max-width: 768px) {
        ejs-smithchart {
            height: 100%;
        }
        
        /* Increase touch target sizes */
        button {
            padding: 12px 16px;
            min-height: 48px;
            min-width: 48px;
        }
    }
</style>
```

### Viewport Configuration

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, 
                               maximum-scale=5.0, user-scalable=yes">
```

This allows users to zoom, critical for accessibility on mobile devices.

## Implementation Best Practices

### Complete Accessible Example

```cshtml
@page
@model AccessibilityModel

<div role="main" aria-label="Smith Chart Analysis Dashboard">
    <!-- Skip to main content link for keyboard users -->
    <a href="#chart" class="skip-link">Skip to chart</a>
    
    <!-- Chart controls with keyboard support -->
    <div role="toolbar" aria-label="Chart controls">
        <button id="print-chart" aria-label="Print chart (Ctrl+P)">
            <span aria-hidden="true">🖨️</span> Print
        </button>
        <button id="export-chart" aria-label="Export chart to image">
            <span aria-hidden="true">💾</span> Export
        </button>
    </div>
    
    <!-- Descriptive heading and text -->
    <section id="chart" aria-labelledby="chart-title">
        <h2 id="chart-title">RF Circuit Impedance Analysis</h2>
        <p>This chart visualizes impedance matching for transmission line applications. 
           The plot shows measured data in blue and reference values in red.</p>
        
        <!-- Accessible Smith Chart -->
        <ejs-smithchart id="smithchart" 
                       role="image"
                       aria-describedby="chart-description"
                       aria-label="Smith Chart: Transmission line impedance visualization"
                       width="100%" height="500px">
            <e-smithchart-title text="Impedance Analysis">
                <e-title-subtitle text="Transmission Line Characterization">
                </e-title-subtitle>
            </e-smithchart-title>
            <e-smithchart-legendsettings visible="true" toggleVisibility="true">
            </e-smithchart-legendsettings>
            <e-smithchart-smithchartseriescollection>
                <e-smithchart-smithchartseries dataSource="Model.MeasuredData" name="Measured" fill="#0066CC" 
                                               resistance="resistance" reactance="reactance">
                </e-smithchart-smithchartseries>
                <e-smithchart-smithchartseries dataSource="Model.ReferenceData" name="Reference" fill="#FF6600" 
                                               resistance="resistance" reactance="reactance">
                </e-smithchart-smithchartseries>
            </e-smithchart-smithchartseriescollection>
        </ejs-smithchart>
        
        <p id="chart-description" class="sr-only">
            Smith Chart showing transmission line impedance with two series: 
            measured impedance in blue and reference impedance in red.
        </p>
    </section>
    
    <!-- Data table alternative -->
    <section aria-labelledby="table-smithchart-title">
        <h3 id="table-smithchart-title">Data Values</h3>
        <table>
            <thead>
                <tr>
                    <th>Series</th>
                    <th>Resistance</th>
                    <th>Reactance</th>
                </tr>
            </thead>
            <tbody>
                @foreach (var point in Model.DataPoints)
                {
                    <tr>
                        <td>@point.Series</td>
                        <td>@point.Resistance</td>
                        <td>@point.Reactance</td>
                    </tr>
                }
            </tbody>
        </table>
    </section>
</div>

<style>
    /* Skip link for keyboard navigation -->
    .skip-link {
        position: absolute;
        top: -40px;
        left: 0;
        background: #000;
        color: #fff;
        padding: 8px;
        z-index: 100;
    }
    
    .skip-link:focus {
        top: 0;
    }
    
    /* Screen reader only text -->
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    /* Ensure focus visible -->
    button:focus,
    a:focus {
        outline: 3px solid #0066CC;
        outline-offset: 2px;
    }
    
    /* High contrast mode support -->
    @media (prefers-contrast: more) {
        button {
            border: 2px solid currentColor;
        }
    }
    
    /* Respect prefers-reduced-motion -->
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
        }
    }
</style>

<script>
    document.getElementById('print-chart').addEventListener('click', () => {
        document.getElementById('smithchart').ej2_instances[0].print();
    });
    
    // Support Ctrl+P for printing
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'p') {
            e.preventDefault();
            document.getElementById('smithchart').ej2_instances[0].print();
        }
    });
</script>
```

## Testing for Accessibility

### Tools and Resources

1. **Accessibility Checker** - npm package for automated validation
2. **axe-core** - Open-source accessibility testing engine
3. **NVDA** - Free screen reader for Windows
4. **JAWS** - Commercial screen reader (Windows/Mac)
5. **VoiceOver** - Built-in macOS/iOS screen reader

### Testing Checklist

- [ ] Navigate entire chart using only keyboard
- [ ] All interactive elements are keyboard accessible
- [ ] Focus indicators are clearly visible
- [ ] Screen reader announces all text content
- [ ] Color contrast meets WCAG AA standards
- [ ] Tooltips and labels are screen-reader accessible
- [ ] Responsive design works on mobile devices
- [ ] Touch targets are at least 48×48 pixels

## Summary

Accessible Smith Charts ensure your RF circuit analysis and transmission line visualizations reach the broadest audience. By implementing keyboard navigation, ARIA attributes, color contrast, and screen reader support, you create professional, inclusive technical visualizations that comply with international accessibility standards.
