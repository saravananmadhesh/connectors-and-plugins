# Accessibility

The Sankey Chart component follows accessibility guidelines and standards, including ADA, Section 508, WCAG 2.2, and WAI-ARIA roles. This ensures that your Sankey Charts are usable by everyone, including people with disabilities. All accessibility features are built-in and require minimal configuration.

## Table of Contents

- [Accessibility Compliance Overview](#accessibility-compliance-overview)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
  - [Color Contrast](#color-contrast)
- [WAI-ARIA Attributes](#wai-aria-attributes)
  - [ARIA Implementation](#aria-implementation)
  - [Adding Custom ARIA Labels](#adding-custom-aria-labels)
- [Keyboard Navigation](#keyboard-navigation)
  - [Supported Keyboard Shortcuts](#supported-keyboard-shortcuts)
  - [Keyboard Navigation Example](#keyboard-navigation-example)
  - [Testing Keyboard Navigation](#testing-keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
  - [Screen Reader Announcement Example](#screen-reader-announcement-example)
  - [Testing with Screen Readers](#testing-with-screen-readers)
- [Text Size and Font](#text-size-and-font)
  - [Default Text Sizing](#default-text-sizing)
  - [Scalable Text](#scalable-text)
  - [Accessible Font Sizes](#accessible-font-sizes)
- [High Contrast Theme](#high-contrast-theme)
- [Mobile Accessibility](#mobile-accessibility)
  - [Mobile Keyboard Navigation](#mobile-keyboard-navigation)
  - [Touch Targets](#touch-targets)
  - [Screen Reader on Mobile](#screen-reader-on-mobile)
- [Testing for Accessibility](#testing-for-accessibility)
  - [Automated Testing Tools](#automated-testing-tools)
  - [Manual Testing Checklist](#manual-testing-checklist)
  - [Test with Real Users](#test-with-real-users)
- [Creating Accessible Sankey Charts](#creating-accessible-sankey-charts)
  - [Best Practices](#best-practices)
  - [Accessibility-Focused Example](#accessibility-focused-example)
- [Compliance Validation](#compliance-validation)
  - [Checking Compliance](#checking-compliance)
- [Resources](#resources)
- [Support](#support)

## Accessibility Compliance Overview

| Accessibility Criteria | Support Status |
|------------------------|-----------------|
| WCAG 2.2 Compliance | ✓ Full Support |
| Section 508 Compliance | ✓ Full Support |
| Screen Reader Support | ✓ Full Support |
| Right-to-Left (RTL) Support | ✓ Full Support |
| Color Contrast | ✓ Full Support |
| Mobile Device Support | ✓ Full Support |
| Keyboard Navigation | ✓ Full Support |
| Accessibility Checker Validation | ✓ Full Support |
| Axe-core Validation | ✓ Full Support |

## WCAG 2.2 Compliance

The Sankey Chart meets WCAG 2.2 Level AA standards for:

- **Perceivable:** Information presented in ways perceivable to users with disabilities
- **Operable:** Users can navigate and use keyboard controls
- **Understandable:** Content is clear and understandable
- **Robust:** Compatible with assistive technologies and browsers

### Color Contrast

The Sankey Chart ensures sufficient color contrast ratios:

- Text: Minimum 4.5:1 contrast ratio (WCAG AA)
- Large text: Minimum 3:1 contrast ratio (WCAG AA)
- UI components: Minimum 3:1 contrast ratio (WCAG AA)

**Testing Color Contrast:**

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.Charts;
public class IndexModel : PageModel
{
    public List<SankeyNode> Nodes { get; set; }
    public List<SankeyLink> Links { get; set; }

   public void OnGet()
{
    Nodes = new List<SankeyNode>
    {
        // IDs are "Generation", "Distribution", "Consumption"
        new SankeyNode { Id = "Generation", Label = new SankeyChartDataLabel { Text = "Energy Input" } },
        new SankeyNode { Id = "Distribution", Label = new SankeyChartDataLabel { Text = "Distribution" } },
        new SankeyNode { Id = "Consumption", Label = new SankeyChartDataLabel { Text = "Consumption" } }
    };

    Links = new List<SankeyLink>
    {
        // Mapping Source/Target to the IDs defined above
        new SankeyLink { SourceId = "Generation", TargetId = "Distribution", Value = 500 },
        new SankeyLink { SourceId = "Distribution", TargetId = "Consumption", Value = 450 }
    };
}

}

public class SankeyNode { public string Id { get; set; } public SankeyChartDataLabel Label { get; set; } }
public class SankeyLink { public string SourceId { get; set; } public string TargetId { get; set; } public double Value { get; set; } }
```
```cshtml
<!-- Use themes that guarantee contrast -->
<ejs-sankey id="sankey" theme="HighContrast">
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

## WAI-ARIA Attributes

The Sankey Chart implements WAI-ARIA (Web Accessibility Initiative - Accessible Rich Internet Applications) to provide accessible names and roles:

| ARIA Attribute | Usage | Example |
|---|---|---|
| `role="img"` | Chart container | Identifies chart as image/graphic |
| `role="button"` | Interactive elements | Nodes, links, legend items |
| `aria-label` | Element description | "Sales flow from Region A to Region B" |
| `aria-hidden` | Hide decorative elements | Decorative lines, backgrounds |
| `aria-pressed` | Toggle button state | Legend item selection |

### ARIA Implementation

The Sankey Chart automatically applies ARIA attributes:

```html
<!-- Chart automatically gets accessible roles -->
<ejs-sankey id="sankey" 
    width="100%" 
    height="420px">
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<!-- Generated HTML includes ARIA attributes -->
<!-- <div role="img" aria-label="Sankey Chart">
     <div role="button" aria-pressed="false">...</div>
</div> -->
```

### Adding Custom ARIA Labels

```html
<ejs-sankey id="customAriaSankey" 
    width="100%" 
    height="420px">
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<script>
// Add custom aria-label after chart renders
let chartElement = document.getElementById('customAriaSankey');
chartElement.setAttribute('aria-label', 'Energy distribution flow from sources to consumers');
</script>
```

## Keyboard Navigation

The Sankey Chart supports keyboard-only navigation for users who cannot use a mouse. All functionality is accessible via keyboard:

### Supported Keyboard Shortcuts

| Keyboard Shortcut | Action |
|---|---|
| **Alt + J** | Move focus to Sankey Chart element |
| **Tab** | Move to next focusable element in chart |
| **Shift + Tab** | Move to previous focusable element in chart |
| **Down Arrow** | Move focus down (to node/link below) |
| **Up Arrow** | Move focus up (to node/link above) |
| **Left Arrow** | Move focus left (to previous node/link) |
| **Right Arrow** | Move focus right (to next node/link) |
| **ESC** | Cancel/close tooltip |

### Keyboard Navigation Example

```html
<!-- Users can navigate with keyboard only -->
<ejs-sankey id="keyboardSankey"
    width="100%" 
    height="420px">
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<!-- Navigation sequence:
     1. Alt+J → Focus chart
     2. Tab → Focus first node
     3. Arrow keys → Navigate between elements
-->
```

### Testing Keyboard Navigation

1. Press **Alt+J** to focus the chart
2. Use **Tab** to move between elements
3. Use **Arrow keys** to navigate within nodes/links
4. Press **Ctrl+P** to print
5. Press **ESC** to close tooltips

## Screen Reader Support

The Sankey Chart is compatible with popular screen readers:

- **JAWS** (Job Access With Speech)
- **NVDA** (NonVisual Desktop Access)
- **VoiceOver** (macOS/iOS)
- **Narrator** (Windows)

### Screen Reader Announcement Example

```html
<ejs-sankey id="screenReaderSankey"
    width="100%" 
    height="420px">
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>

<!-- Screen reader announces:
     "Sankey Chart, 4 nodes, 5 links. 
      Use arrow keys to navigate. 
      Alt+J to focus. Ctrl+P to print."
-->
```

### Testing with Screen Readers

1. Install a screen reader (NVDA is free)
2. Enable screen reader
3. Load page with Sankey Chart
4. Use screen reader commands to navigate
5. Verify all information is announced
6. Check that interactive elements are labeled

## Text Size and Font

The Sankey Chart supports user-configurable text sizes:

### Default Text Sizing

```html
<!-- Default readable font size -->
<ejs-sankey id="customAriaSankey" 
    width="100%" 
    height="420px">
    <e-sankey-labelsettings fontSize="20px"></e-sankey-labelsettings>
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

### Scalable Text

```html
<!-- Use relative units for user zoom support -->
<ejs-sankey id="customAriaSankey" 
    width="100%" 
    height="420px">
    <e-sankey-labelsettings fontSize="1em"></e-sankey-labelsettings>
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

### Accessible Font Sizes

| Size | Usage | Readability |
|------|-------|-------------|
| 10px-11px | Small labels | Minimum (for important info only) |
| 12px-14px | Standard labels | Good |
| 16px+ | Large labels | Excellent |

**Recommendation:** Use 12px+ for primary content.

## High Contrast Theme

The High Contrast theme maximizes accessibility:

```html
<ejs-sankey id="ThemeSankey"
    theme="HighContrast"
    width="100%" 
    height="420px">
    <e-sankey-labelsettings fontSize="1em"></e-sankey-labelsettings>
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

**High Contrast Features:**
- Black/white base colors
- Bright, saturated accent colors
- Maximum contrast ratios
- Clear distinction between elements
- Enhanced readability for low vision users

## Mobile Accessibility

The Sankey Chart is fully accessible on mobile devices:

### Mobile Keyboard Navigation

```html
<!-- Responsive design for touch and keyboard -->
<ejs-sankey id="customAriaSankey" 
    width="100%" 
    height="100%">
    <e-sankey-labelsettings fontSize="1em"></e-sankey-labelsettings>
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

### Touch Targets

- Minimum 44x44 pixels for touch targets
- Sufficient spacing between interactive elements
- Clear visual feedback for interactions

### Screen Reader on Mobile

- Works with VoiceOver (iOS) and TalkBack (Android)
- Supports mobile screen reader gestures
- Accessible labels for all elements

## Testing for Accessibility

### Automated Testing Tools

```html
<!-- Use accessibility checking tools -->
<!-- Axe DevTools: Browser extension for accessibility checks -->
<!-- WAVE: Web Accessibility Evaluation Tool -->
<!-- JAWS Testing: Full screen reader compatibility -->
```

### Manual Testing Checklist

- [ ] Tab through entire chart with keyboard only
- [ ] All nodes/links reachable with keyboard
- [ ] Focus indicators visible and clear
- [ ] Screen reader announces all elements
- [ ] Color not sole means of identifying information
- [ ] Text readable at 200% zoom
- [ ] No content hidden from keyboard users
- [ ] All functionality keyboard accessible
- [ ] Form labels properly associated
- [ ] Error messages clear and helpful

### Test with Real Users

- Test with people using screen readers
- Test with keyboard-only users
- Test on actual mobile devices
- Test with low vision users
- Gather feedback and iterate

## Creating Accessible Sankey Charts

### Best Practices

1. **Descriptive Labels**
   ```csharp
        new SankeyNode { Id = "Generation", Label = new SankeyChartDataLabel { Text = "Energy Input" } },
        new SankeyNode { Id = "Distribution", Label = new SankeyChartDataLabel { Text = "Distribution" } },
        new SankeyNode { Id = "Consumption", Label = new SankeyChartDataLabel { Text = "Consumption" } }
   ```

2. **Clear Color Usage**
   ```cshtml
<ejs-sankey id="customAriaSankey" 
    width="100%" 
    height="100%">
    <e-sankey-labelsettings fontSize="1em"></e-sankey-labelsettings>
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    <!-- Use color + shape/pattern, not color alone -->
    <e-sankey-nodesettings fill="#D32F2F" stroke="#D32F2F"></e-sankey-nodesettings>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
    </ejs-sankey>
   ```

3. **Sufficient Contrast**
   ```html
   <!-- Ensure 4.5:1 contrast ratio -->
<ejs-sankey id="customAriaSankey">
    <e-sankey-labelsettings fontSize="150%" color="#000000"></e-sankey-labelsettings>
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>
    @* Added links section to render the flow *@
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
    
</ejs-sankey>
   <!-- Background should be sufficiently different -->
   ```

4. **Keyboard Navigation**
   - All features available via keyboard
   - Clear focus indicators
   - Logical tab order
   - No keyboard traps

5. **Screen Reader Support**
   - Meaningful element names
   - Proper ARIA roles and labels
   - Semantic HTML structure
   - Alternative text descriptions

### Accessibility-Focused Example

```html
@page
@model IndexModel
@{
    ViewData["Title"] = "Home page";
}
@using Syncfusion.EJ2;

@* Added id="sankey" to fix the querySelector error *@
<ejs-sankey id="accessibleChart" 
    width="100%" 
    height="600px"
    theme="HighContrast"
    enableRtl="false"
    load="onLoad">
    
    <!-- Readable text settings -->
    <e-sankey-labelsettings 
        fontSize="14px"
        fontWeight="600"
        color="#000000">
    </e-sankey-labelsettings>
    
    <!-- High contrast node borders -->
    <e-sankey-border 
        color="#000000" 
        width="2">
    </e-sankey-border>
    
    <!-- Legend for visual distinction -->
    <e-sankey-legendsettings 
        visible="true"
        position="Bottom">
    </e-sankey-legendsettings>

    <!-- Corrected Nodes Mapping -->
    <e-sankey-nodes>
        @foreach (var node in Model.Nodes)
        {
            <e-sankey-node id="@node.Id" label="@node.Label"></e-sankey-node>
        }
    </e-sankey-nodes>

    <!-- Corrected Links Mapping -->
    <e-sankey-links>
        @foreach (var link in Model.Links)
        {
            <e-sankey-link sourceId="@link.SourceId" targetId="@link.TargetId" value="@link.Value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>


<script>
function onLoad(args) {
    // Add descriptive ARIA label
    let element = document.getElementById('accessibleChart');
    element.setAttribute('aria-label', 
        'Revenue flow diagram showing distribution from sources to destinations');
}
</script>
```
```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;
using Syncfusion.EJ2.Charts;
public class IndexModel : PageModel
{
    public List<SankeyNode> Nodes { get; set; }
    public List<SankeyLink> Links { get; set; }

   public void OnGet()
{
    Nodes = new List<SankeyNode>
    {
        // IDs are "Generation", "Distribution", "Consumption"
        new SankeyNode { Id = "Generation", Label = new SankeyChartDataLabel { Text = "Energy Input" } },
        new SankeyNode { Id = "Distribution", Label = new SankeyChartDataLabel { Text = "Distribution" } },
        new SankeyNode { Id = "Consumption", Label = new SankeyChartDataLabel { Text = "Consumption" } }
    };
    Links = new List<SankeyLink>
    {
        // Mapping Source/Target to the IDs defined above
        new SankeyLink { SourceId = "Generation", TargetId = "Distribution", Value = 500 },
        new SankeyLink { SourceId = "Distribution", TargetId = "Consumption", Value = 450 }
    };
}

}

public class SankeyNode { public string Id { get; set; } public SankeyChartDataLabel Label { get; set; } }
public class SankeyLink { public string SourceId { get; set; } public string TargetId { get; set; } public double Value { get; set; } }
```

## Compliance Validation

### Checking Compliance

1. **WCAG 2.2 Level AA Check**
   - Use WAVE or Axe DevTools
   - Verify color contrast
   - Check keyboard navigation
   - Validate ARIA usage

2. **Section 508 Compliance**
   - Test with screen readers
   - Verify alternative text
   - Check keyboard access
   - Validate structural markup

3. **ADA Compliance**
   - Ensure equal access
   - Provide alternative formats
   - Support assistive technologies
   - Test with real users

## Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessibility Insights Tool](https://accessibilityinsights.io/)
- [NVDA Screen Reader](https://www.nvaccess.org/)

## Support

For accessibility questions or issues:
- Review Syncfusion accessibility documentation
- Test with accessibility tools
- Consult with accessibility experts
- Gather user feedback
- Iterate on improvements
