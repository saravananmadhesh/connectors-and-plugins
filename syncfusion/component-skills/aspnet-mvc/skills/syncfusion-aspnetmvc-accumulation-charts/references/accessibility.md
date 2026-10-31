# Accessibility

## Table of Contents
- [Overview](#overview)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [WAI-ARIA Support](#wai-aria-support)
- [Screen Reader Support](#screen-reader-support)
- [Color Contrast and Perception](#color-contrast-and-perception)
- [Focus Management](#focus-management)
- [Accessible Data Labels](#accessible-data-labels)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
- [High Contrast Mode](#high-contrast-mode)
- [Accessible Tooltips](#accessible-tooltips)
- [Complete Accessible Example](#complete-accessible-example)
- [Testing Accessibility](#testing-accessibility)
  - [Screen Reader Testing](#screen-reader-testing)
  - [Keyboard Testing](#keyboard-testing)
  - [Color Contrast Testing](#color-contrast-testing)
  - [Automated Testing](#automated-testing)
- [Best Practices](#best-practices)
  - [Content](#content)
  - [Visual Design](#visual-design)
  - [Keyboard](#keyboard)
  - [Screen Readers](#screen-readers)
  - [Testing](#testing)
  - [Documentation](#documentation)
- [See Also](#see-also)

## Overview

Syncfusion AccumulationChart components are designed to be accessible to users with disabilities, meeting WCAG 2.2 Level AA standards. Accessibility features ensure charts are usable with assistive technologies like screen readers, keyboard-only navigation, and high contrast modes.

**Key Accessibility Features:**
- **Keyboard Navigation:** Full chart interaction without mouse
- **WAI-ARIA:** Proper roles, states, and properties
- **Screen Readers:** Meaningful descriptions and data announcements
- **Color Contrast:** WCAG-compliant color combinations
- **Focus Indicators:** Clear visual focus states
- **Responsive:** Works across assistive technology platforms

## WCAG 2.2 Compliance

The AccumulationChart component supports WCAG 2.2 Level AA compliance:

**Level A Requirements:**
- ✓ Keyboard accessible (2.1.1)
- ✓ No keyboard trap (2.1.2)
- ✓ Sufficient color contrast (1.4.3)
- ✓ Text resize up to 200% (1.4.4)
- ✓ Images of text alternatives (1.4.5)

**Level AA Requirements:**
- ✓ Enhanced color contrast 4.5:1 (1.4.6)
- ✓ Reflow content (1.4.10)
- ✓ Non-text contrast 3:1 (1.4.11)
- ✓ Focus visible (2.4.7)
- ✓ Label in name (2.5.3)

**Enable Accessibility:**

```cshtml
@(Html.EJS().AccumulationChart("accessibleChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .Title("Sales Distribution Q1 2026")  // Descriptive title
    .Accessibility(access=>access.AccessibilityRole("chart"))
    .Render()
)
```

**Note:** Accessibility is enabled by default in recent versions.

## Keyboard Navigation

Navigate and interact with charts using only the keyboard:

**Navigation Keys:**

| Key Combination | Action | Description |
|----------------|--------|-------------|
| **Alt + J** | Focus chart | Moves focus to the chart control |
| **Tab** | Navigate forward | Move between chart elements |
| **Shift + Tab** | Navigate backward | Move to previous element |
| **Arrow Keys** | Navigate points | Move between data points |
| **Enter / Space** | Select / Activate | Select point, open tooltip |
| **Escape** | Close / Cancel | Close tooltip, deselect |
| **Ctrl + P** | Print | Print the chart |
| **Home** | First point | Jump to first data point |
| **End** | Last point | Jump to last data point |

**Enable Keyboard Navigation:**

```cshtml
@(Html.EJS().AccumulationChart("keyboardChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Title("Sales by Product")
    .Tooltip(t => t.Enable(true))  // Tooltips accessible via Enter/Space
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .Render()
)
```

**Keyboard Navigation Example:**

```cshtml
@(Html.EJS().AccumulationChart("fullKeyboard")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .XName("Region")
              .YName("Revenue")
              .DataLabel(dl => dl.Visible(true).Name("Name"))
              .DataSource(Model)
              .Add();
    })
    .Title("Regional Revenue Distribution")
    .SubTitle("Fiscal Year 2026")
    .LegendSettings(ls => ls.Visible(true))
    .Tooltip(t => t.Enable(true))
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .Accessibility(access=>access.AccessibilityRole("chart"))
    .Render()
)
```

**User can:**
1. Press `Alt+J` to focus chart
2. Use `Arrow Keys` to navigate between regions
3. Press `Enter` to select a region
4. Press `Escape` to deselect

## WAI-ARIA Support

AccumulationChart uses WAI-ARIA attributes for assistive technology compatibility:

**Automatic ARIA Attributes:**

```html
<!-- Generated HTML structure with ARIA -->
<div id="accessibleChart" 
     role="application" 
     aria-label="Sales Distribution Q1 2026"
     tabindex="0">
  
  <svg role="img" aria-labelledby="accessibleChart-title">
    <title id="accessibleChart-title">Sales Distribution Q1 2026</title>
    
    <!-- Each point gets ARIA attributes -->
    <path role="group" 
          aria-label="Electronics: 37 (42.5%)" 
          tabindex="0"
          aria-selected="false">
    </path>
    
    <path role="group" 
          aria-label="Clothing: 25 (28.7%)"
          tabindex="0"
          aria-selected="false">
    </path>
  </svg>
  
  <div role="region" aria-live="polite" aria-label="Chart Legend">
    <!-- Legend items -->
  </div>
</div>
```

**Custom ARIA Labels:**

```cshtml
@(Html.EJS().AccumulationChart("ariaChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Title("Product Sales Analysis")
    .Accessibility(access=>access.AccessibilityRole("chart"))
    .Render()
)

<script>
    // Enhance ARIA descriptions after rendering
    document.addEventListener('DOMContentLoaded', function() {
        var chartElement = document.getElementById('ariaChart');
        chartElement.setAttribute('aria-describedby', 'chartDescription');
    });
</script>

<div id="chartDescription" class="sr-only">
    This pie chart shows product sales distribution across four categories: 
    Electronics, Clothing, Food, and Books. Use arrow keys to navigate between 
    segments and press Enter to select.
</div>
```

**ARIA Roles Applied:**

| Element | Role | Purpose |
|---------|------|---------|
| Chart Container | `application` | Interactive component |
| SVG | `img` | Visual representation |
| Data Points | `group` | Grouping related elements |
| Legend | `region` | Landmark navigation |
| Tooltip | `tooltip` | Contextual information |

## Screen Reader Support

Optimize charts for screen readers (JAWS, NVDA, VoiceOver):

**Descriptive Titles:**

```cshtml
@(Html.EJS().AccumulationChart("screenReaderChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Category")
              .YName("Value")
              .Add();
    })
    .Title("Quarterly Sales Distribution by Category")  // Clear, descriptive
    .SubTitle("Q1 2026 - Total Revenue: $87 Million")   // Additional context
    .Render()
)
```

**Screen Reader Announcements:**

```cshtml
@(Html.EJS().AccumulationChart("srAnnounce")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Title("Product Sales Breakdown")
    .Tooltip(t => t.Enable(true))
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .PointClick("announceSelection")
    .Render()
)

<div id="srAnnounce" role="status" aria-live="polite" class="sr-only"></div>

<script>
    function announceSelection(args) {
        var announcement = args.point.x + " selected. " +
                          "Sales: $" + args.point.y + " million. " +
                          "Market share: " + args.point.percentage.toFixed(1) + " percent.";
        
        document.getElementById('srAnnounce').textContent = announcement;
    }
</script>

<style>
    .sr-only {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
</style>
```

**Data Table Alternative:**

Provide a data table for comprehensive screen reader access:

```cshtml
@(Html.EJS().AccumulationChart("withTable")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Category")
              .YName("Revenue")
              .Add();
    })
    .Title("Revenue by Category")
    .Render()
)

<details style="margin-top:15px;">
    <summary>View Data Table (Accessible Alternative)</summary>
    <table aria-label="Revenue by Category Data">
        <caption>Quarterly Revenue Distribution</caption>
        <thead>
            <tr>
                <th scope="col">Category</th>
                <th scope="col">Revenue (Millions)</th>
                <th scope="col">Percentage</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var item in Model)
            {
                <tr>
                    <th scope="row">@item.Category</th>
                    <td>$@item.Revenue M</td>
                    <td>@item.Percentage%</td>
                </tr>
            }
        </tbody>
    </table>
</details>
```

## Color Contrast and Perception

Ensure adequate color contrast and avoid color-only information:

**WCAG Contrast Ratios:**
- **Normal text:** 4.5:1 minimum (Level AA)
- **Large text (18pt+):** 3:1 minimum
- **Non-text elements:** 3:1 minimum

**High Contrast Colors:**

```cshtml
@(Html.EJS().AccumulationChart("highContrast")
    .Series(series =>
    {
        series.XName("Category")
              .YName("Value")
              .Palettes(new string[] { 
                  "#0078D4",  // Blue - 4.5:1 contrast
                  "#107C10",  // Green - 4.5:1 contrast
                  "#D83B01",  // Red-orange - 4.5:1 contrast
                  "#8764B8"   // Purple - 4.5:1 contrast
              })
              .DataLabel(dl => dl
                  .Visible(true)
                  .Font(f => f
                      .Color("white")        // High contrast on dark slices
                      .Size("14px")
                      .FontWeight("600")
                  )
              )
              .DataSource(Model)              
              .Add();
    })
    .Title("Sales Distribution")
    .TitleStyle(ts => ts.Color("#000000"))  // Black title for contrast
    .Background("white")
    .Render()
)
```

**Patterns for Color Blindness:**

Use selection patterns instead of relying solely on color:

```cshtml
@(Html.EJS().AccumulationChart("colorBlindFriendly")
    .Series(series =>
    {
        series.XName("Product")
              .YName("Sales")
              .DataLabel(dl => dl.Visible(true))  // Text labels supplement color
              .DataSource(Model)
              .Add();
    })
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .SelectionPattern(Syncfusion.EJ2.Charts.SelectionPattern.DiagonalForward)    
    .LegendSettings(ls => ls.Visible(true))
    .Render()
)
```

**Colorblind-Safe Palettes:**

```cshtml
// Deuteranopia/Protanopia friendly
.Palettes(new string[] { 
    "#0173B2",  // Blue
    "#DE8F05",  // Orange
    "#029E73",  // Teal
    "#CC78BC",  // Pink
    "#ECE133",  // Yellow
    "#56B4E9"   // Sky blue
})
```

## Focus Management

Clear visual focus indicators for keyboard navigation:

**Custom Focus Styles:**

```cshtml
@(Html.EJS().AccumulationChart("focusStyles")
    .Series(series =>
    {
        series.XName("X")
              .YName("Y")
              .Border(b => b.Width(0))  // No border by default
              .DataSource(Model)              
              .Add();
    })
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .Render()
)

<style>
    /* Enhanced focus indicator */
    #focusStyles svg path:focus {
        outline: 3px solid #0078D4;
        outline-offset: 3px;
        stroke: #0078D4;
        stroke-width: 3;
    }
    
    /* Visible focus even in high contrast */
    @media (prefers-contrast: high) {
        #focusStyles svg path:focus {
            outline: 4px solid;
            outline-offset: 4px;
        }
    }
</style>
```

**Focus Trap Prevention:**

```cshtml
<div class="chart-container">
    <h2 id="chartTitle">Sales Analysis</h2>
    
    @(Html.EJS().AccumulationChart("focusTrap")
        .Series(series =>
        {
            series.DataSource(Model)
                  .XName("Category")
                  .YName("Value")
                  .Add();
        })
        .Render()
    )
    
    <div class="chart-actions">
        <button onclick="exportChart()">Export</button>
        <button onclick="printChart()">Print</button>
    </div>
</div>

<script>
    // Ensure focus can move to next elements
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Allow natural tab flow - don't trap focus
        }
    });
</script>
```

## Accessible Data Labels

Make data labels readable and meaningful:

```cshtml
@(Html.EJS().AccumulationChart("accessibleLabels")
    .Series(series =>
    {
        series.XName("Category")
              .YName("Value")
              .DataLabel(dl => dl
                  .Visible(true)
                  .Name("Category")
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
                  .Font(f => f
                      .Size("14px")         // Minimum 14px for readability
                      .FontWeight("600")
                      .Color("#000000")     // High contrast
                      .FontFamily("Segoe UI, Arial, sans-serif")
                  )
                  .Template("<div style='background:white; padding:4px 8px; border:1px solid #ccc; border-radius:3px;'>" +
                           "<strong>${point.x}</strong><br/>${point.y} (${point.percentage}%)" +
                           "</div>")
              )
              .DataSource(Model)
              .Add();
    })
    .EnableSmartLabels(true)  // Prevent overlap
    .Render()
)
```

**Label Guidelines:**
- **Minimum 14px font size** for body text
- **18px+ for headings** (treated as large text)
- **Bold for emphasis** (600+ font weight)
- **High contrast** (4.5:1 for normal text)

## RTL (Right-to-Left) Support

Support right-to-left languages (Arabic, Hebrew):

```cshtml
@(Html.EJS().AccumulationChart("rtlChart")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("CategoryAr")  // Arabic category names
              .YName("Value")
              .Add();
    })
    .Title("توزيع المبيعات")  // Arabic title: "Sales Distribution"
    .EnableRtl(true)  // Enable RTL mode
    .LegendSettings(ls => ls
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Right)
    )
    .Render()
)
```

```csharp
// Controller with RTL data
public ActionResult RtlChart()
{
    List<RtlData> data = new List<RtlData>
    {
        new RtlData { CategoryAr = "الإلكترونيات", Value = 37 },
        new RtlData { CategoryAr = "الملابس", Value = 25 },
        new RtlData { CategoryAr = "الطعام", Value = 20 },
        new RtlData { CategoryAr = "الكتب", Value = 18 }
    };
    return View(data);
}
```

**RTL Considerations:**
- Legend positions mirror (right becomes left)
- Text alignment adjusts automatically
- Data label positioning flips
- Tooltips respect text direction

## High Contrast Mode

Support Windows High Contrast Mode:

```cshtml
@(Html.EJS().AccumulationChart("highContrastChart")
    .Series(series =>
    {
        series.XName("Category")
              .YName("Value")
              .Border(b => b.Width(2))  // Visible borders in high contrast
              .DataSource(Model)
              .Add();
    })
    .Background("transparent")  // Respect system background
    .Render()
)

<style>
    /* High Contrast Mode support */
    @media (prefers-contrast: high) {
        #highContrastChart {
            forced-color-adjust: auto;
        }
        
        #highContrastChart svg path {
            stroke: CanvasText;
            stroke-width: 2;
        }
        
        #highContrastChart text {
            fill: CanvasText;
            font-weight: 600;
        }
    }
    
    /* Detect high contrast via JavaScript */
    @media (prefers-contrast: more) {
        /* Increased contrast mode */
    }
</style>
```

## Accessible Tooltips

Make tooltips accessible to keyboard and screen reader users:

```cshtml
@(Html.EJS().AccumulationChart("accessibleTooltip")
    .Series(series =>
    {
        series.DataSource(Model)
              .XName("Product")
              .YName("Sales")
              .Add();
    })
    .Tooltip(t => t
        .Enable(true)
        .Format("${point.x}: $${point.y} million, ${point.percentage}% market share")
        .TextStyle(ts => ts
            .Size("14px")
            .Color("white")
        )
    )
    .Render()
)
```

**Tooltip announces to screen readers when triggered via keyboard (Enter/Space).**

## Complete Accessible Example

Fully accessible chart implementation:

```cshtml
@(Html.EJS().AccumulationChart("fullyAccessible")
    .Series(series =>
    {
        series.Type(Syncfusion.EJ2.Charts.AccumulationType.Pie)
              .XName("Category")
              .YName("Revenue")
              .Palettes(new string[] { 
                  "#0078D4", "#107C10", "#D83B01", "#8764B8"
              })
              .DataLabel(dl => dl
                  .Visible(true)
                  .Name("Category")
                  .Font(f => f
                      .Size("14px")
                      .FontWeight("600")
                      .Color("#000000")
                  )
                  .Position(Syncfusion.EJ2.Charts.AccumulationLabelPosition.Outside)
              )
              .Border(b => b.Width(2).Color("white"))
              .DataSource(Model)
              .Add();
    })
    .Title("Q1 2026 Revenue Distribution by Category")
    .TitleStyle(ts => ts
        .Size("20px")
        .Color("#000000")
        .FontWeight("600")
    )
    .SubTitle("Total: $100 Million")
    .LegendSettings(ls => ls
        .Visible(true)
        .Position(Syncfusion.EJ2.Charts.LegendPosition.Bottom)
        .ToggleVisibility(true)
    )
    .Tooltip(t => t
        .Enable(true)
        .Format("<b>${point.x}</b><br/>Revenue: $${point.y}M<br/>Share: ${point.percentage}%")
        .TextStyle(ts => ts.Size("14px"))
    )
    .SelectionMode(Syncfusion.EJ2.Charts.AccumulationSelectionMode.Point)
    .SelectionPattern(Syncfusion.EJ2.Charts.SelectionPattern.DiagonalForward)
    .EnableSmartLabels(true)
    .Accessibility(access=>access.AccessibilityRole("chart"))
    .Background("white")
    .PointClick("announcePoint")
    .Render()
)

<div id="announcement" role="status" aria-live="polite" class="sr-only"></div>

<details style="margin-top:20px;">
    <summary>View Accessible Data Table</summary>
    <table aria-label="Revenue Distribution Data">
        <caption>Q1 2026 Revenue by Category</caption>
        <thead>
            <tr>
                <th scope="col">Category</th>
                <th scope="col">Revenue (Millions)</th>
                <th scope="col">Percentage</th>
            </tr>
        </thead>
        <tbody>
            @foreach (var item in Model)
            {
                <tr>
                    <th scope="row">@item.Category</th>
                    <td>$@item.Revenue M</td>
                    <td>@item.Percentage%</td>
                </tr>
            }
        </tbody>
    </table>
</details>

<script>
    function announcePoint(args) {
        var message = args.point.x + " selected. " +
                     "Revenue: $" + args.point.y + " million. " +
                     "Market share: " + args.point.percentage.toFixed(1) + " percent.";
        document.getElementById('announcement').textContent = message;
    }
</script>

<style>
    .sr-only {
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    }
    
    #fullyAccessible svg path:focus {
        outline: 3px solid #0078D4;
        outline-offset: 3px;
    }
</style>
```

## Testing Accessibility

### Screen Reader Testing

**JAWS (Windows):**
1. Launch JAWS
2. Navigate to chart with `Alt+J`
3. Use arrow keys to explore points
4. Verify announcements are clear and complete

**NVDA (Windows):**
1. Start NVDA (Ctrl+Alt+N)
2. Tab to chart
3. Use arrow keys to navigate
4. Check that data is announced properly

**VoiceOver (macOS):**
1. Enable VoiceOver (Cmd+F5)
2. Navigate with VO keys (Ctrl+Option+arrows)
3. Interact with chart (Ctrl+Option+Shift+Down)
4. Verify rotor access to chart elements

### Keyboard Testing

Test all interactions without mouse:
1. ✓ Tab to chart
2. ✓ Arrow keys navigate points
3. ✓ Enter/Space selects points
4. ✓ Escape deselects
5. ✓ No focus traps
6. ✓ Ctrl+P prints

### Color Contrast Testing

**Tools:**
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Chrome DevTools (Lighthouse audit)
- [Color Oracle](https://colororacle.org/) (colorblindness simulator)

**Test:**
1. Check all text has 4.5:1 contrast
2. Large text (18pt+) has 3:1 contrast
3. Non-text elements (slices, borders) have 3:1 contrast
4. Test with colorblindness simulators

### Automated Testing

```javascript
// Axe-core accessibility testing
describe('Chart Accessibility', function() {
    it('should have no accessibility violations', function(done) {
        axe.run('#fullyAccessible', function(err, results) {
            expect(results.violations.length).toBe(0);
            done();
        });
    });
});
```

## Best Practices

### Content
1. **Descriptive Titles:** Clear, concise chart purpose
2. **Alternative Text:** Provide data table alternative
3. **Meaningful Labels:** Category names, not codes
4. **Units:** Always include units (%, $, etc.)

### Visual Design
1. **Color Contrast:** Minimum 4.5:1 for text, 3:1 for graphics
2. **Don't Rely on Color Alone:** Use patterns, labels, icons
3. **Font Size:** 14px minimum for body, 18px+ for headings
4. **Focus Indicators:** 3px+ outline, high contrast

### Keyboard
1. **Logical Tab Order:** Chart fits natural page flow
2. **Consistent Navigation:** Arrow keys move between points
3. **No Traps:** User can always tab away
4. **Shortcuts:** Document keyboard shortcuts (Alt+J, Ctrl+P)

### Screen Readers
1. **ARIA Landmarks:** Proper roles and labels
2. **Live Regions:** Announce dynamic changes (aria-live)
3. **Concise Announcements:** Relevant data, not verbose
4. **Skip Links:** Allow bypassing to main content

### Testing
1. **Real Devices:** Test with actual screen readers
2. **Keyboard Only:** Complete all tasks without mouse
3. **High Contrast:** Verify in Windows High Contrast Mode
4. **Zoom:** Test at 200% zoom level
5. **Automated Tools:** Run axe, Lighthouse, WAVE

### Documentation
1. **User Guide:** Explain keyboard shortcuts
2. **Alternative Formats:** Provide data in table/CSV
3. **Contact:** Offer support for accessibility issues

## See Also

- [Keyboard Navigation Reference](https://ej2.syncfusion.com/aspnetmvc/documentation/accumulation-chart/accessibility/)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
