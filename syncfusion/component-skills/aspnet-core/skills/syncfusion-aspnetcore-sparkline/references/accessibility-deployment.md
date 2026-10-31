# Accessibility & Deployment

## Table of Contents
- [Accessibility Standards](#accessibility-standards)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [Section 508 Support](#section-508-support)
- [WAI-ARIA Attributes](#wai-aria-attributes)
    - [img Role](#img-role)
    - [aria-label Attribute](#aria-label-attribute)
    - [aria-describedby Attribute](#aria-describedby-attribute)
    - [aria-hidden Attribute](#aria-hidden-attribute)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Color Contrast](#color-contrast)
- [Mobile Device Support](#mobile-device-support)
- [Accessibility Validation](#accessibility-validation)
- [Complete Accessible Sparkline Example](#complete-accessible-sparkline-example)
- [Deployment Checklist](#deployment-checklist)

## Accessibility Standards

The Syncfusion Sparkline component is built to comply with international accessibility standards and guidelines. This ensures that all users, including those with disabilities, can access and interact with sparklines effectively.

**Compliance levels:**

| Standard | Support Level |
|----------|----------------|
| WCAG 2.2 | AA (Advanced) |
| Section 508 | Partial (Some features fully supported) |
| Screen Reader Support | Partial (Core features supported) |
| Right-To-Left (RTL) | Full Support |
| Color Contrast | Full Compliance |
| Mobile Device Support | Full Support |
| Keyboard Navigation | Partial (Print shortcut supported) |
| Accessibility Checker | Full Validation |

## WCAG 2.2 Compliance

WCAG (Web Content Accessibility Guidelines) 2.2 provides standards for accessible web content at three levels: A, AA, and AAA.

**Sparkline achieves WCAG 2.2 AA level** - Advanced compliance covering:
- Perceivable (can be perceived by users)
- Operable (can be navigated and controlled)
- Understandable (content is clear)
- Robust (compatible with assistive technologies)

**Implementation for WCAG AA compliance:**

```cshtml
<ejs-sparkline id="wcagSparkline" 
    type="Line"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval"
    height="80"
    aria-label="Monthly sales trend sparkline"
    role="img">
    <!-- Provide tooltips for context -->
    <e-sparkline-tooltipsettings visible="true" format="${xval}: ${yval}"></e-sparkline-tooltipsettings>
</ejs-sparkline>
```

**WCAG AA guidelines to follow:**
- Provide meaningful labels with `aria-label`
- Ensure sufficient color contrast (4.5:1 for text)
- Support keyboard navigation where applicable
- Use semantic HTML and ARIA attributes

## Section 508 Support

Section 508 requires federal agencies to make electronic information accessible. Sparkline provides partial support through:
- Alternative text and descriptions
- Keyboard navigation for printable content
- High contrast mode support

**Implementation for Section 508 compliance:**

```cshtml
<div>
    <label for="salesSparkline">Sales Trend Chart</label>
    <ejs-sparkline id="salesSparkline"
        type="Area"
        dataSource="ViewBag.SalesData"
        xName="Month" 
        yName="Revenue"
        aria-describedby="sparklineDesc">
    </ejs-sparkline>
    <p id="sparklineDesc">
        Area sparkline showing monthly revenue trend from January to December.
        High: $50,000 in September. Low: $25,000 in February.
    </p>
</div>
```

## WAI-ARIA Attributes

WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) attributes help assistive technologies understand component purpose and behavior.

**ARIA attributes used by Sparkline:**

### img Role

```cshtml
<ejs-sparkline id="sparkline" 
    role="img"
    aria-label="Monthly sales trend showing Q4 growth">
</ejs-sparkline>
```

- Identifies sparkline as an image for screen readers
- Screen reader announces as "image: Monthly sales trend showing Q4 growth"

### aria-label Attribute

```cshtml
<ejs-sparkline id="sparkline" 
    aria-label="Stock price volatility - high $150, low $95, trend upward">
</ejs-sparkline>
```

- Provides concise accessible name
- Screen readers announce the label when focused
- Should briefly describe the sparkline content

### aria-describedby Attribute

```cshtml
<ejs-sparkline id="sparkline" 
    aria-describedby="sparklineDescription">
</ejs-sparkline>

<p id="sparklineDescription">
    This sparkline represents quarterly revenue performance.
    Q1: $25K, Q2: $32K, Q3: $28K, Q4: $45K.
    Shows 80% growth from Q1 to Q4.
</p>
```

- Links to detailed description element
- Provides context for complex sparklines
- Description can be longer than aria-label

### aria-hidden Attribute

```cshtml
<!-- Hide decorative elements from screen readers -->
<span aria-hidden="true">↑</span> Sales Trend

<!-- Sparkline itself should NOT be aria-hidden -->
<ejs-sparkline id="sparkline" 
    role="img"
    aria-label="Sales trend visualization">
</ejs-sparkline>
```

- Hide decorative elements
- Never apply to the sparkline itself
- Keep sparkline accessible even with secondary features

## Keyboard Navigation

Sparkline supports keyboard shortcuts for printing and accessibility.

**Supported keyboard shortcut:**

| Keyboard Input | Action |
|---|---|
| <kbd>Ctrl</kbd> + <kbd>P</kbd> | Print the sparkline |

**Implementation:**

```cshtml
<ejs-sparkline id="printableSparkline" 
    type="Line"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval">
</ejs-sparkline>

<!-- User presses Ctrl+P to print -->
<!-- Sparkline renders in print-friendly format -->
```

**Print accessibility tips:**
- Sparkline prints with current styling
- Ensure sufficient contrast in print colors
- Test print output in PDF format
- Verify sparkline fits page width

## Screen Reader Support

Sparkline works with screen readers (NVDA, JAWS, VoiceOver) through proper ARIA implementation.

**Screen reader example - NVDA on Windows:**

```cshtml
<ejs-sparkline id="accessibleSparkline"
    type="Column"
    role="img"
    aria-label="Quarterly revenue comparison. Q1: $45,000. Q2: $52,000. Q3: $48,000. Q4: $61,000."
    dataSource="ViewBag.QuarterlyData"
    xName="Quarter" 
    yName="Revenue">
</ejs-sparkline>
```

**NVDA announces:** "Image: Quarterly revenue comparison. Q1: $45,000..."

**Best practices for screen readers:**
- Use detailed aria-label for complete data context
- Include specific values in label when possible
- Use aria-describedby for supplementary information
- Test with actual screen reader software

**Screen readers tested with:**
- JAWS (Windows)
- NVDA (Windows)
- VoiceOver (macOS/iOS)
- Narrator (Windows)

## RTL Support

Sparkline fully supports Right-To-Left (RTL) text direction for Arabic, Hebrew, and other RTL languages.

**Implementation with RTL:**

```cshtml
<!-- Set document direction -->
<html dir="rtl" lang="ar">
<head>
    <meta charset="utf-8">
</head>
<body>
    <ejs-sparkline id="rtlSparkline"
        type="Line"
        dataSource="ViewBag.Data"
        xName="xval" 
        yName="yval"
        enableRtl="true">
    </ejs-sparkline>
</body>
</html>
```

**RTL support includes:**
- Automatic text direction reversal
- Tooltip positioning adjusts for RTL
- Labels display in correct direction
- Markers and data labels respect RTL flow

**CSS for RTL if needed:**

```css
/* Optional: Force RTL layout explicitly */
[dir="rtl"] ejs-sparkline {
    direction: rtl;
    unicode-bidi: embed;
}
```

## Color Contrast

Sparkline ensures color contrast meets WCAG AA standards (4.5:1 for text, 3:1 for graphics).

**Contrast verification:**

- Data labels: 4.5:1 contrast ratio with background
- Track line: 3:1 contrast ratio
- Markers: Distinct from background
- All themes tested for compliance

**Example: High contrast theme for accessibility:**

```cshtml
<ejs-sparkline id="highContrastSparkline"
    type="Column"
    theme="Highcontrast"
    dataSource="ViewBag.Data"
    xName="xval" 
    yName="yval">
    <e-sparkline-containerarea background="#1a1a1a"></e-sparkline-containerarea>
    <e-sparkline-datalabelsettings visible="All"></e-sparkline-datalabelsettings>
</ejs-sparkline>
```

**Recommended color combinations:**
- Light background + Dark text (Material/Fabric)
- Dark background + Light text (Highcontrast)
- Avoid gray-on-gray combinations

## Mobile Device Support

Sparkline is fully accessible on mobile devices with touch support.

**Touch accessibility:**
- Tooltips trigger on touch (not hover)
- Track line responds to touch position
- Markers are touch-friendly
- Responsive sizing for small screens

**Mobile implementation:**

```cshtml
<ejs-sparkline id="mobileSparkline"
    type="Line"
    dataSource="ViewBag.MobileData"
    xName="xval" 
    yName="yval"
    width="100%"
    height="60">
    <e-sparkline-tooltipsettings visible="true" format="${xval}: ${yval}"></e-sparkline-tooltipsettings>
    <e-sparklinetooltipsettings-tracklinesettings visible="true"></e-sparklinetooltipsettings-tracklinesettings>
</ejs-sparkline>
```

**Mobile best practices:**
- Set responsive width (width="100%")
- Provide adequate height for touch (height="60" minimum)
- Test on various device sizes
- Ensure tooltips display without overflow

## Accessibility Validation

Validate sparkline accessibility using automated tools.

**Automated testing tools:**
- **accessibility-checker** - npm package for accessibility auditing
- **axe-core** - Automated accessibility testing engine
- **WAVE** - Web accessibility evaluation tool
- **Lighthouse** - Chrome DevTools accessibility audit

**Example: Running accessibility validation:**

```bash
npm install accessibility-checker
npm install axe-core
```

**Validation checklist:**

- [ ] ARIA labels are present (`aria-label` or `aria-describedby`)
- [ ] Role attribute is set (`role="img"`)
- [ ] Color contrast is 4.5:1+ for text
- [ ] Keyboard navigation works (Ctrl+P)
- [ ] Screen reader announces content
- [ ] Mobile touch interactions work
- [ ] High contrast theme available
- [ ] RTL rendering correct if applicable

## Complete Accessible Sparkline Example

```cshtml
<div class="accessibility-context">
    <!-- Semantic HTML wrapper -->
    <figure>
        <ejs-sparkline id="accessibleSales"
            type="Area"
            role="img"
            aria-label="Annual sales performance showing strong Q4 growth"
            aria-describedby="salesDescription"
            theme="Material"
            dataSource="ViewBag.AnnualSales"
            xName="Quarter" 
            yName="Revenue"
            width="100%"
            height="100">
            
            <!-- Full interaction support -->
            <e-sparkline-tooltipsettings 
                visible="true" 
                format="${xval}: $$${yval}K">
            </e-sparkline-tooltipsettings>
            <e-sparklinetooltipsettings-tracklinesettings visible="true"></e-sparklinetooltipsettings-tracklinesettings>
            
            <!-- Data visualization -->
            <e-sparkline-markersettings visible= "ViewBag.sparkVisible"></e-sparkline-markersettings>
            
            <!-- Appearance accessibility -->
            <e-sparkline-containerarea background="#f8f9fa">
                <e-sparkline-containerarea-border color="#dee2e6" width="1"></e-sparkline-containerarea-border>
            </e-sparkline-containerarea>
        </ejs-sparkline>
        
        <!-- Descriptive caption for screen readers -->
        <figcaption id="salesDescription">
            Annual sales by quarter: Q1 revenue $45,000, Q2 revenue $52,000, 
            Q3 revenue $48,000, Q4 revenue $67,000. Total annual growth: 49%.
            Print with Ctrl+P.
        </figcaption>
    </figure>
</div>

<style>
    .accessibility-context {
        margin: 20px;
    }
    
    figure {
        border: 1px solid #dee2e6;
        padding: 20px;
        background: #f8f9fa;
    }
    
    figcaption {
        margin-top: 10px;
        font-size: 0.875rem;
        color: #666666;
    }
</style>
```

## Deployment Checklist

Before deploying sparklines to production:

- [ ] All sparklines have `aria-label` or `aria-describedby`
- [ ] Role="img" is set for visual sparklines
- [ ] Tooltips enabled for data context
- [ ] Color theme tested with contrast checker
- [ ] Mobile/touch interaction tested on devices
- [ ] RTL rendering tested if applicable
- [ ] Accessibility validator passed (axe, WAVE)
- [ ] Screen reader tested (NVDA, JAWS, VoiceOver)
- [ ] Print output verified (Ctrl+P)
- [ ] Documentation includes accessibility features
