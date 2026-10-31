# Accessibility and WCAG Compliance in Circular Gauge

## Table of Contents

- [Overview](#overview)
- [Accessibility Standards](#accessibility-standards)
  - [WCAG 2.2 Compliance](#wcag-22-compliance)
  - [Accessibility Checker Tools](#accessibility-checker-tools)
- [Screen Reader Support](#screen-reader-support)
  - [What Screen Readers Announce](#what-screen-readers-announce)
  - [Accessible Gauge Structure](#accessible-gauge-structure)
  - [Testing with Screen Reader](#testing-with-screen-reader)
- [ARIA Attributes](#aria-attributes)
  - [ARIA Roles and Labels](#aria-roles-and-labels)
  - [Adding Accessible Labels](#adding-accessible-labels)
- [Color Contrast](#color-contrast)
  - [Minimum Contrast Ratios](#minimum-contrast-ratios)
  - [Checking Contrast](#checking-contrast)
  - [Accessible Color Combinations](#accessible-color-combinations)
  - [Color Blindness](#color-blindness)
- [Keyboard Navigation](#keyboard-navigation)
  - [Gauge Interaction Notes](#gauge-interaction-notes)
  - [Focus Management](#focus-management)
  - [Tab Order](#tab-order)
- [Right-to-Left Support](#right-to-left-support)
  - #rtl-for-arabic-and-hebrew
- [Mobile Device Support](#mobile-device-support)
  - [Responsive and Touch-Friendly](#responsive-and-touch-friendly)
  - [Mobile Accessibility](#mobile-accessibility)
- [Testing and Validation](#testing-and-validation)
  - [Accessibility Audit Checklist](#accessibility-audit-checklist)
  - [Automated Testing](#automated-testing)
  - [Manual Testing Steps](#manual-testing-steps)
- [Complete Accessible Example](#complete-accessible-example)
- [Troubleshooting](#troubleshooting)

## Overview

Accessibility ensures that users with different abilities can understand and use the Circular Gauge. A gauge is primarily a visual component, so it should include enough textual context for screen readers and should not rely on color alone.

An accessible Circular Gauge should include:

- A clear title.
- A text description of what the gauge represents.
- Accessible labels using `aria-label`, `aria-labelledby`, or `aria-describedby`.
- High-contrast text and visual elements.
- Text annotations for important values or zones.
- Tooltip or annotation content for additional context.
- RTL support when used with right-to-left languages.
- Responsive sizing for mobile and zoomed layouts.

## Accessibility Standards

### WCAG 2.2 Compliance

Circular Gauge accessibility depends on both the component configuration and the surrounding page implementation.

Important accessibility goals:

- Provide a meaningful accessible name.
- Provide descriptive context for values, ranges, and status.
- Ensure text contrast meets WCAG recommendations.
- Do not use color as the only way to communicate meaning.
- Ensure keyboard users can reach related controls.
- Ensure screen reader users can understand the gauge purpose and current state.
- Ensure mobile and zoomed layouts remain usable.

Avoid saying that every custom gauge automatically meets WCAG. Custom colors, annotations, external images, and custom templates must also be tested.

### Accessibility Checker Tools

Use accessibility tools to validate the rendered page.

Common tools:

- Browser accessibility inspector.
- Lighthouse accessibility audit.
- axe DevTools.
- WAVE.
- NVDA screen reader.
- JAWS screen reader.
- VoiceOver on macOS or iOS.

For automated checks, run the test against the rendered gauge container or the full page.

```html
<button type="button" onclick="runAccessibilityTest()">Run Accessibility Check</button>

<script>
    function runAccessibilityTest() {
        if (typeof axe === 'undefined') {
            console.warn('axe-core is not loaded.');
            return;
        }

        axe.run(document.getElementById('accessibleGauge'), function (err, results) {
            if (err) {
                throw err;
            }

            console.log('Violations:', results.violations);
            console.log('Passes:', results.passes);
        });
    }
</script>
```

## Screen Reader Support

### What Screen Readers Announce

Screen readers can understand the Circular Gauge better when you provide surrounding text, ARIA labels, and annotation content.

Recommended accessible information:

- Gauge title.
- Gauge description.
- Current value.
- Unit of measurement.
- Status zone.
- Range meanings.
- Any warning or critical state.

Example accessible text:

```html
<h2 id="gaugeTitle">CPU Usage Gauge</h2>
<p id="gaugeDescription">
    Displays current CPU utilization. Green means safe, orange means caution, and red means critical.
    Current value is 65 percent, which is in the caution zone.
</p>
```

### Accessible Gauge Structure

Use `aria-labelledby` and `aria-describedby` on the root `ejs-circulargauge` tag.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "CPU Usage Gauge";

        public double PointerValue { get; set; } = 65;

        public string LabelFormat { get; set; } = "{value}%";

        public string StatusAnnotationContent { get; set; } =
            "<div style='text-align:center;'>" +
            "<strong>65%</strong><br />" +
            "<span>Caution Zone</span>" +
            "</div>";

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Accessible Gauge Structure";
}

<h1>Accessible Gauge Structure</h1>

<h2 id="gaugeTitle">@Model.GaugeTitle</h2>
<p id="gaugeDescription">
    Displays current CPU utilization. Green means safe, orange means caution, and red means critical.
    Current value is 65 percent, which is in the caution zone.
</p>

<ejs-circulargauge id="accessibleGauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    aria-labelledby="gaugeTitle"
                    aria-describedby="gaugeDescription">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="30"
                                       color="#107C10">
                </e-circulargauge-range>
                <e-circulargauge-range start="30"
                                       end="70"
                                       color="#F7630C">
                </e-circulargauge-range>
                <e-circulargauge-range start="70"
                                       end="100"
                                       color="#DA3B01">
                </e-circulargauge-range>
            </e-circulargauge-ranges>

            <e-axis-labelstyle format="@Model.LabelFormat">
            </e-axis-labelstyle>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer type="Needle"
                                         value="@Model.PointerValue"
                                         color="#000000"
                                         pointerWidth="4">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.StatusAnnotationContent"
                                             angle="180"
                                             radius="35%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

### Testing with Screen Reader

Manual screen reader test flow:

1. Open the gauge page.
2. Navigate to the gauge title.
3. Confirm the title is meaningful.
4. Move to the description.
5. Confirm the current value and status are understandable.
6. Confirm annotations are meaningful as text.
7. Confirm there is no reliance on color alone.
8. Test with browser zoom at 200%.

## ARIA Attributes

### ARIA Roles and Labels

Use ARIA attributes on the root gauge tag to provide accessible names and descriptions.

Recommended patterns:

```html
<ejs-circulargauge id="cpuGauge"
                    aria-label="CPU Usage Gauge showing 65 percent utilization in caution zone">
</ejs-circulargauge>
```

```html
<h2 id="gaugeTitle">CPU Usage Monitor</h2>

<ejs-circulargauge id="gauge"
                    aria-labelledby="gaugeTitle">
</ejs-circulargauge>
```

```html
<p id="gaugeDescription">
    Shows current CPU utilization with safe, caution, and critical zones.
</p>

<ejs-circulargauge id="gauge"
                    aria-describedby="gaugeDescription">
</ejs-circulargauge>
```

### Adding Accessible Labels

Use visible text when possible. Visible text benefits all users, not only screen reader users.

```html
<h2 id="systemGaugeTitle">System Performance Gauge</h2>
<p id="systemGaugeDescription">
    Current performance is 65 percent. The system is operational but in the caution zone.
</p>

<ejs-circulargauge id="systemGauge"
                    aria-labelledby="systemGaugeTitle"
                    aria-describedby="systemGaugeDescription">
</ejs-circulargauge>
```

Use `aria-label` when there is no visible label.

```html
<ejs-circulargauge id="compactGauge"
                    aria-label="Memory usage gauge. Current value 72 percent. Status caution.">
</ejs-circulargauge>
```

## Color Contrast

### Minimum Contrast Ratios

For accessible text:

- Normal text should have sufficient contrast against its background.
- Large text can use a lower contrast threshold than normal text, but higher contrast is still better.
- Gauge labels, annotations, and tooltip text should be checked.

Use strong contrast for important annotation text and axis labels.

### Checking Contrast

Good high-contrast example:

```html
<e-axis-labelstyle color="#000000"
                   format="{value}%">
</e-axis-labelstyle>
```

Avoid low-contrast labels such as light gray text on a white background.

### Accessible Color Combinations

Use darker, distinguishable colors for ranges.

```html
<e-circulargauge-ranges>
    <e-circulargauge-range start="0"
                           end="30"
                           color="#107C10">
    </e-circulargauge-range>

    <e-circulargauge-range start="30"
                           end="70"
                           color="#F7630C">
    </e-circulargauge-range>

    <e-circulargauge-range start="70"
                           end="100"
                           color="#DA3B01">
    </e-circulargauge-range>
</e-circulargauge-ranges>
```

### Color Blindness

Do not rely only on color to communicate status. Add labels or annotations.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Accessible Status Gauge";

        public double PointerValue { get; set; } = 65;

        public string SafeLabel { get; set; } = "<div>Safe</div>";

        public string CautionLabel { get; set; } = "<div>Caution</div>";

        public string CriticalLabel { get; set; } = "<div>Critical</div>";

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Accessible Status Gauge";
}

<h1>Accessible Status Gauge</h1>

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px">
    <e-circulargauge-axes>
        <e-circulargauge-axis startAngle="240"
                              endAngle="120"
                              minimum="0"
                              maximum="100">
            <e-circulargauge-ranges>
                <e-circulargauge-range start="0"
                                       end="30"
                                       color="#107C10">
                </e-circulargauge-range>
                <e-circulargauge-range start="30"
                                       end="70"
                                       color="#F7630C">
                </e-circulargauge-range>
                <e-circulargauge-range start="70"
                                       end="100"
                                       color="#DA3B01">
                </e-circulargauge-range>
            </e-circulargauge-ranges>

            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue"
                                         color="#000000">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>

            <e-circulargauge-annotations>
                <e-circulargauge-annotation content="@Model.SafeLabel"
                                             angle="220"
                                             radius="90%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.CautionLabel"
                                             angle="270"
                                             radius="90%">
                </e-circulargauge-annotation>

                <e-circulargauge-annotation content="@Model.CriticalLabel"
                                             angle="320"
                                             radius="90%">
                </e-circulargauge-annotation>
            </e-circulargauge-annotations>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Keyboard Navigation

### Gauge Interaction Notes

The Circular Gauge is usually a visual display component. If the gauge is not interactive, keyboard focus may not be required on the gauge itself. If you add buttons, export controls, print actions, or custom interactions, those controls must be keyboard accessible.

If pointer dragging is enabled, also provide an alternative input method when the value needs to be changed by keyboard users, such as:

- Numeric input.
- Slider input.
- Buttons to increase or decrease the value.
- Form field synchronized with the gauge.

### Focus Management

Use `tabindex="0"` only when the gauge itself needs to receive focus.

```html
<ejs-circulargauge id="gauge"
                    tabindex="0"
                    aria-label="Interactive speed gauge. Current value 50.">
</ejs-circulargauge>
```

For better accessibility, pair an interactive gauge with a standard form control.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "Interactive Gauge";

        public double PointerValue { get; set; } = 50;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Keyboard Accessible Gauge";
}

<h1>Keyboard Accessible Gauge</h1>

<label for="gaugeValue">Gauge value</label>
<input id="gaugeValue"
       type="number"
       min="0"
       max="100"
       value="@Model.PointerValue"
       onchange="updateGaugeValue(this.value)" />

<ejs-circulargauge id="gauge"
                    title="@Model.GaugeTitle"
                    width="100%"
                    height="450px"
                    aria-label="Gauge value can be changed using the numeric input above.">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>

<script>
    function updateGaugeValue(value) {
        var gaugeElement = document.getElementById('gauge');

        if (!gaugeElement || !gaugeElement.ej2_instances || gaugeElement.ej2_instances.length === 0) {
            return;
        }

        var gauge = gaugeElement.ej2_instances[0];
        var numericValue = Number(value);

        gauge.axes[0].pointers[0].value = numericValue;
        gauge.refresh();
    }
</script>
```

### Tab Order

Keep focus order logical.

```html
<form>
    <label for="name">Name</label>
    <input id="name" type="text" />

    <label for="gaugeValue">Gauge value</label>
    <input id="gaugeValue" type="number" min="0" max="100" />

    <button type="submit">Submit</button>
</form>
```

Avoid placing non-interactive gauges in the tab order unless focus is useful.

## Right-to-Left Support

### RTL for Arabic and Hebrew

Use `enableRtl="true"` on the root gauge and `direction="AntiClockWise"` on the axis when a right-to-left visual flow is needed.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "مراقب الأداء";

        public double PointerValue { get; set; } = 65;

        public bool EnableRtl { get; set; } = true;

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "RTL Accessible Gauge";
}

<h1>RTL Accessible Gauge</h1>

<ejs-circulargauge id="rtlGauge"
                    title="@Model.GaugeTitle"
                    enableRtl="@Model.EnableRtl"
                    width="100%"
                    height="450px"
                    aria-label="مقياس الأداء. القيمة الحالية 65.">
    <e-circulargauge-axes>
        <e-circulargauge-axis minimum="0"
                              maximum="100"
                              startAngle="240"
                              endAngle="120"
                              direction="AntiClockWise">
            <e-circulargauge-pointers>
                <e-circulargauge-pointer value="@Model.PointerValue">
                </e-circulargauge-pointer>
            </e-circulargauge-pointers>
        </e-circulargauge-axis>
    </e-circulargauge-axes>
</ejs-circulargauge>
```

## Mobile Device Support

### Responsive and Touch-Friendly

Use a responsive container and ensure interactive targets are large enough.

```html
<div style="width:100%; max-width:500px; aspect-ratio:1 / 1; margin:0 auto;">
    <ejs-circulargauge id="gauge"
                        width="100%"
                        height="100%">
        <e-circulargauge-axes>
            <e-circulargauge-axis minimum="0"
                                  maximum="100">
                <e-circulargauge-pointers>
                    <e-circulargauge-pointer type="Marker"
                                             value="50"
                                             markerWidth="44"
                                             markerHeight="44"
                                             enableDrag="true">
                    </e-circulargauge-pointer>
                </e-circulargauge-pointers>
            </e-circulargauge-axis>
        </e-circulargauge-axes>
    </ejs-circulargauge>
</div>
```

### Mobile Accessibility

Mobile checklist:

- Use responsive width.
- Avoid small interactive markers.
- Do not rely on hover-only tooltip content.
- Ensure annotations remain readable at small sizes.
- Test with mobile screen readers.
- Test at browser zoom levels.

## Testing and Validation

### Accessibility Audit Checklist

- [ ] Gauge has a clear title.
- [ ] Gauge has a visible description or ARIA description.
- [ ] Current value is available as text.
- [ ] Status is not communicated by color alone.
- [ ] Labels and annotations have sufficient contrast.
- [ ] Keyboard users can operate related controls.
- [ ] Interactive gauge values have a keyboard-accessible alternative.
- [ ] Mobile touch targets are large enough.
- [ ] RTL is enabled when required.
- [ ] No keyboard traps are present.
- [ ] Browser zoom at 200% remains usable.
- [ ] Screen reader output is understandable.

### Automated Testing

Automated testing can detect common accessibility issues, but manual testing is still required.

```html
<button type="button" onclick="runAccessibilityTest()">Run Accessibility Check</button>

<script>
    function runAccessibilityTest() {
        if (typeof axe === 'undefined') {
            console.warn('axe-core is not loaded.');
            return;
        }

        axe.run(document.body, function (err, results) {
            if (err) {
                throw err;
            }

            if (results.violations.length === 0) {
                console.log('No accessibility violations found.');
            } else {
                console.warn('Accessibility violations:', results.violations);
            }
        });
    }
</script>
```

### Manual Testing Steps

1. Navigate the page using only the keyboard.
2. Confirm that focus order is logical.
3. Confirm that screen reader output includes the gauge title, description, value, and status.
4. Verify text contrast.
5. Verify status is not color-only.
6. Test on mobile.
7. Test at 200% zoom.
8. Test RTL layout if applicable.
9. Test any export, print, or value-changing controls.

## Complete Accessible Example

This complete example includes:

- Visible heading and description.
- ARIA labeling.
- High-contrast labels and pointer.
- Color ranges with textual explanation.
- Tooltip.
- Annotation with current value and status.
- Correct ASP.NET Core Circular Gauge tag helpers.

File: `Pages/Index.cshtml.cs`

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace CircularGaugeGettingStarted.Pages
{
    public class IndexModel : PageModel
    {
        public string GaugeTitle { get; set; } = "System Performance";

        public double MinimumValue { get; set; } = 0;

        public double MaximumValue { get; set; } = 100;

        public double PointerValue { get; set; } = 65;

        public string LabelFormat { get; set; } = "{value}%";

        public string[] TooltipTypes { get; set; } = { "Pointer" };

        public string TooltipFormat { get; set; } = "Current value: ${value}%";

        public string AnnotationContent { get; set; } =
            "<div style='text-align:center;color:#000000;'>" +
            "<strong>65%</strong><br />" +
            "<span>Caution Zone</span>" +
            "</div>";

        public void OnGet()
        {
        }
    }
}
```

File: `Pages/Index.cshtml`

```html
@page
@model CircularGaugeGettingStarted.Pages.IndexModel

@{
    ViewData["Title"] = "Accessible Circular Gauge";
}

<div role="main">
    <h1 id="gaugeTitle">System Performance Gauge</h1>

    <p id="gaugeDescription">
        Displays system utilization with green from 0 to 30 percent as safe,
        orange from 30 to 70 percent as caution, and red from 70 to 100 percent as critical.
        Current utilization is 65 percent and is in the caution zone.
    </p>

    <ejs-circulargauge id="accessibleGauge"
                        title="@Model.GaugeTitle"
                        width="100%"
                        height="450px"
                        aria-labelledby="gaugeTitle"
                        aria-describedby="gaugeDescription">
        <e-circulargauge-tooltip enable="true"
                                  type="@Model.TooltipTypes"
                                  format="@Model.TooltipFormat">
        </e-circulargauge-tooltip>

        <e-circulargauge-axes>
            <e-circulargauge-axis startAngle="240"
                                  endAngle="120"
                                  minimum="@Model.MinimumValue"
                                  maximum="@Model.MaximumValue">
                <e-circulargauge-ranges>
                    <e-circulargauge-range start="0"
                                           end="30"
                                           color="#107C10">
                    </e-circulargauge-range>
                    <e-circulargauge-range start="30"
                                           end="70"
                                           color="#F7630C">
                    </e-circulargauge-range>
                    <e-circulargauge-range start="70"
                                           end="100"
                                           color="#DA3B01">
                    </e-circulargauge-range>
                </e-circulargauge-ranges>

                <e-axis-labelstyle format="@Model.LabelFormat"
                                   color="#000000">
                </e-axis-labelstyle>

                <e-circulargauge-pointers>
                    <e-circulargauge-pointer type="Needle"
                                             value="@Model.PointerValue"
                                             color="#000000"
                                             pointerWidth="4">
                    </e-circulargauge-pointer>
                </e-circulargauge-pointers>

                <e-circulargauge-annotations>
                    <e-circulargauge-annotation content="@Model.AnnotationContent"
                                                 angle="180"
                                                 radius="35%">
                    </e-circulargauge-annotation>
                </e-circulargauge-annotations>
            </e-circulargauge-axis>
        </e-circulargauge-axes>
    </ejs-circulargauge>
</div>
```

## Troubleshooting

If screen readers do not announce meaningful content:

1. Add a visible heading.

```html
<h2 id="gaugeTitle">CPU Usage Gauge</h2>
```

2. Add a visible description.

```html
<p id="gaugeDescription">
    Current CPU usage is 65 percent and is in the caution zone.
</p>
```

3. Connect the gauge to the heading and description.

```html
<ejs-circulargauge aria-labelledby="gaugeTitle"
                    aria-describedby="gaugeDescription">
</ejs-circulargauge>
```

If color contrast fails:

1. Use darker label and pointer colors.
2. Check annotation text contrast.
3. Avoid light gray text on white backgrounds.
4. Test range colors against nearby text and background.

If status is color-only:

1. Add annotation text.

```html
<e-circulargauge-annotation content="<div>Caution Zone</div>"
                             angle="180"
                             radius="35%">
</e-circulargauge-annotation>
```

2. Add a description explaining each zone.

If keyboard accessibility is insufficient:

1. Avoid requiring mouse-only pointer dragging.
2. Provide a numeric input or slider as an alternative.
3. Keep buttons and form fields in logical tab order.

If tooltip accessibility is insufficient:

1. Do not make tooltip content the only source of important information.
2. Provide the same critical information in visible text, annotations, or `aria-describedby`.
3. Use `e-circulargauge-tooltip`, not `e-circulargauge-tooltipsettings`.

If annotation HTML is displayed as text:

Use normal HTML strings in `Index.cshtml.cs`.

Incorrect:

```csharp
public string AnnotationContent { get; set; } = "&lt;div&gt;65%&lt;/div&gt;";
```

Correct:

```csharp
public string AnnotationContent { get; set; } = "<div>65%</div>";
```
