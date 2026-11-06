# Customization and Accessibility

## Table of Contents
- [Customization](#customization)
- [Accessibility](#accessibility)## Customization

### Orientation

Bullet charts can be rendered horizontally or vertically using the `Orientation` property.

#### Horizontal Orientation (Default)

```csharp
// Controller
public ActionResult Index()
{
    List<BulletChartData> data = new List<BulletChartData>
    {
        new BulletChartData { value = 270, target = 250 }
    };
    return View(data);
}

public class BulletChartData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
@model List<BulletChartData>

@(Html.EJS().BulletChart("horizontalChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Orientation(Syncfusion.EJ2.Charts.OrientationType.Horizontal)  // Default
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Render()
)
```

**Use Cases:**
- Standard dashboard displays
- Wide layout areas
- When horizontal space is available
- Comparing multiple metrics vertically stacked

#### Vertical Orientation

```cshtml
@model List<BulletChartData>

@(Html.EJS().BulletChart("verticalChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Orientation(Syncfusion.EJ2.Charts.OrientationType.Vertical)
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Width("120")
    .Height("400")
    .Render()
)
```

**Use Cases:**
- Narrow layout areas (sidebars)
- Side-by-side metric comparisons
- Vertical space utilization
- Mobile vertical scrolling layouts

#### Orientation Comparison Example

```csharp
// Controller
public ActionResult OrientationDemo()
{
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = 270, target = 250 }
    };
    
    ViewBag.HorizontalData = data;
    ViewBag.VerticalData = data;
    
    return View();
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<div style="display: flex; gap: 50px; padding: 30px;">
    <div style="flex: 1;">
        <h3>Horizontal Orientation</h3>
        @(Html.EJS().BulletChart("horizontal")
            .DataSource((List<MetricData>)ViewBag.HorizontalData)
            .ValueField("value")
            .TargetField("target")
            .Title("Revenue")
            .Orientation(Syncfusion.EJ2.Charts.OrientationType.Horizontal)
            .Minimum(0)
            .Maximum(300)
            .Interval(50)
            .Ranges(r => {
                r.End(150).Color("#E74C3C").Opacity(0.3).Add();
                r.End(250).Color("#F39C12").Opacity(0.3).Add();
                r.End(300).Color("#27AE60").Opacity(0.3).Add();
            })
            .Width("100%")
            .Height("100")
            .Render()
        )
    </div>
    
    <div>
        <h3>Vertical Orientation</h3>
        @(Html.EJS().BulletChart("vertical")
            .DataSource((List<MetricData>)ViewBag.VerticalData)
            .ValueField("value")
            .TargetField("target")
            .Title("Revenue")
            .Orientation(Syncfusion.EJ2.Charts.OrientationType.Vertical)
            .Minimum(0)
            .Maximum(300)
            .Interval(50)
            .Ranges(r => {
                r.End(150).Color("#E74C3C").Opacity(0.3).Add();
                r.End(250).Color("#F39C12").Opacity(0.3).Add();
                r.End(300).Color("#27AE60").Opacity(0.3).Add();
            })
            .Width("120")
            .Height("400")
            .Render()
        )
    </div>
</div>
```

### Right-to-Left (RTL)

Enable right-to-left layout for languages like Arabic, Hebrew, and Persian using the `EnableRtl` property.

#### Basic RTL Configuration

```cshtml
@(Html.EJS().BulletChart("rtlChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .EnableRtl(true)  // Enable RTL
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Render()
)
```

**Effect:** Chart elements flow from right to left:
- Axis starts from right
- Value bar grows from right to left
- Labels positioned for RTL reading

#### RTL with Arabic/Hebrew Content

```csharp
// Controller
public ActionResult RTLExample()
{
    List<SalesData> data = new List<SalesData>
    {
        new SalesData { sales = 270000, quota = 250000 }
    };
    return View(data);
}

public class SalesData
{
    public double sales { get; set; }
    public double quota { get; set; }
}
```

```cshtml
@model List<SalesData>

<div dir="rtl">
    @(Html.EJS().BulletChart("arabicChart")
        .DataSource(Model)
        .ValueField("sales")
        .TargetField("quota")
        .Title("أداء المبيعات")  <!-- Arabic: "Sales Performance" -->
        .EnableRtl(true)
        .Minimum(0)
        .Maximum(300000)
        .Interval(50000)
        .LabelFormat("{value}")
        .Ranges(r => {
            r.End(150000).Color("#E74C3C").Opacity(0.3).Add();
            r.End(250000).Color("#F39C12").Opacity(0.3).Add();
            r.End(300000).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("90%")
        .Height("110")
        .Render()
    )
</div>
```

#### RTL vs LTR Comparison

```cshtml
<h2>RTL Demonstration</h2>

<div style="margin-bottom: 30px;">
    <h3>Left-to-Right (Default)</h3>
    @(Html.EJS().BulletChart("ltrChart")
        .DataSource(Model)
        .ValueField("value")
        .TargetField("target")
        .Title("Sales Performance")
        .EnableRtl(false)
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#E74C3C").Opacity(0.3).Add();
            r.End(250).Color("#F39C12").Opacity(0.3).Add();
            r.End(300).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("90%")
        .Height("100")
        .Render()
    )
</div>

<div>
    <h3>Right-to-Left</h3>
    @(Html.EJS().BulletChart("rtlChart")
        .DataSource(Model)
        .ValueField("value")
        .TargetField("target")
        .Title("Sales Performance")
        .EnableRtl(true)
        .Minimum(0)
        .Maximum(300)
        .Interval(50)
        .Ranges(r => {
            r.End(150).Color("#E74C3C").Opacity(0.3).Add();
            r.End(250).Color("#F39C12").Opacity(0.3).Add();
            r.End(300).Color("#27AE60").Opacity(0.3).Add();
        })
        .Width("90%")
        .Height("100")
        .Render()
    )
</div>
```

### Animation

Add smooth animations to value and target bars using the `Animation` property.

#### Basic Animation

```cshtml
@(Html.EJS().BulletChart("animatedChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Animation(anim => anim
        .Enable(true)
        .Duration(1000)  // 1 second
        .Delay(0)        // No delay
    )
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**Animation Properties:**
- **Enable**: Turn animation on/off
- **Duration**: Animation length in milliseconds
- **Delay**: Delay before animation starts

#### Animation Settings Examples

```cshtml
<!-- Quick Animation -->
@(Html.EJS().BulletChart("quickChart")
    .Animation(anim => anim
        .Enable(true)
        .Duration(500)   // 0.5 seconds
        .Delay(0)
    )
    .Render()
)

<!-- Smooth Animation -->
@(Html.EJS().BulletChart("smoothChart")
    .Animation(anim => anim
        .Enable(true)
        .Duration(1500)  // 1.5 seconds
        .Delay(0)
    )
    .Render()
)

<!-- Delayed Animation -->
@(Html.EJS().BulletChart("delayedChart")
    .Animation(anim => anim
        .Enable(true)
        .Duration(1000)  // 1 second
        .Delay(500)      // 0.5 second delay
    )
    .Render()
)

<!-- No Animation -->
@(Html.EJS().BulletChart("staticChart")
    .Animation(anim => anim.Enable(false))
    .Render()
)
```

#### Sequential Dashboard Animation

```csharp
// Controller
public ActionResult AnimatedDashboard()
{
    ViewBag.Chart1Data = new List<MetricData> { new MetricData { value = 270, target = 250 } };
    ViewBag.Chart2Data = new List<MetricData> { new MetricData { value = 180, target = 200 } };
    ViewBag.Chart3Data = new List<MetricData> { new MetricData { value = 240, target = 230 } };
    
    return View();
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
<h2>Sequential Animation Dashboard</h2>

<div style="margin-bottom: 20px;">
    <h3>Metric 1</h3>
    @(Html.EJS().BulletChart("chart1")
        .DataSource((List<MetricData>)ViewBag.Chart1Data)
        .ValueField("value")
        .TargetField("target")
        .Animation(anim => anim.Enable(true).Duration(1000).Delay(0))
        .Minimum(0).Maximum(300).Interval(50)
        .Width("90%").Height("100")
        .Render()
    )
</div>

<div style="margin-bottom: 20px;">
    <h3>Metric 2</h3>
    @(Html.EJS().BulletChart("chart2")
        .DataSource((List<MetricData>)ViewBag.Chart2Data)
        .ValueField("value")
        .TargetField("target")
        .Animation(anim => anim.Enable(true).Duration(1000).Delay(300))  // 0.3s delay
        .Minimum(0).Maximum(300).Interval(50)
        .Width("90%").Height("100")
        .Render()
    )
</div>

<div style="margin-bottom: 20px;">
    <h3>Metric 3</h3>
    @(Html.EJS().BulletChart("chart3")
        .DataSource((List<MetricData>)ViewBag.Chart3Data)
        .ValueField("value")
        .TargetField("target")
        .Animation(anim => anim.Enable(true).Duration(1000).Delay(600))  // 0.6s delay
        .Minimum(0).Maximum(300).Interval(50)
        .Width("90%").Height("100")
        .Render()
    )
</div>
```

### Themes

Apply built-in themes to match your application's design using the `Theme` property.

#### Available Themes

```cshtml
<!-- Material Theme (Default) -->
@(Html.EJS().BulletChart("materialChart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Material)
    .Render()
)

<!-- Material Dark -->
@(Html.EJS().BulletChart("materialDarkChart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.MaterialDark)
    .Render()
)

<!-- Fabric -->
@(Html.EJS().BulletChart("fabricChart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Fabric)
    .Render()
)

<!-- Bootstrap -->
@(Html.EJS().BulletChart("bootstrapChart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Bootstrap)
    .Render()
)

<!-- Bootstrap 4 -->
@(Html.EJS().BulletChart("bootstrap4Chart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Bootstrap4)
    .Render()
)

<!-- Bootstrap 5 -->
@(Html.EJS().BulletChart("bootstrap5Chart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Bootstrap5)
    .Render()
)

<!-- Bootstrap Dark -->
@(Html.EJS().BulletChart("bootstrapDarkChart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.BootstrapDark)
    .Render()
)

<!-- Tailwind -->
@(Html.EJS().BulletChart("tailwindChart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Tailwind)
    .Render()
)

<!-- Tailwind Dark -->
@(Html.EJS().BulletChart("tailwindDarkChart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.TailwindDark)
    .Render()
)

<!-- Fluent -->
@(Html.EJS().BulletChart("fluentChart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.Fluent)
    .Render()
)

<!-- High Contrast -->
@(Html.EJS().BulletChart("highContrastChart")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.HighContrast)
    .Render()
)
```

#### Theme-Aware Application

```csharp
// Controller
public ActionResult ThemedDashboard()
{
    // Get theme from user preference, config, or query string
    string userTheme = Request.QueryString["theme"] ?? "Material";
    
    Syncfusion.EJ2.Charts.ChartTheme theme;
    switch (userTheme.ToLower())
    {
        case "dark":
            theme = Syncfusion.EJ2.Charts.ChartTheme.MaterialDark;
            break;
        case "bootstrap":
            theme = Syncfusion.EJ2.Charts.ChartTheme.Bootstrap5;
            break;
        case "fluent":
            theme = Syncfusion.EJ2.Charts.ChartTheme.Fluent;
            break;
        default:
            theme = Syncfusion.EJ2.Charts.ChartTheme.Material;
            break;
    }
    
    ViewBag.Theme = theme;
    
    List<MetricData> data = new List<MetricData>
    {
        new MetricData { value = 270, target = 250 }
    };
    
    return View(data);
}

public class MetricData
{
    public double value { get; set; }
    public double target { get; set; }
}
```

```cshtml
@model List<MetricData>

@(Html.EJS().BulletChart("themedChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Theme(ViewBag.Theme)
    .Title("Themed Bullet Chart")
    .Minimum(0)
    .Maximum(300)
    .Interval(50)
    .Ranges(r => {
        r.End(150).Add();
        r.End(250).Add();
        r.End(300).Add();
    })
    .Width("90%")
    .Height("110")
    .Render()
)
```

---

## Accessibility

The Syncfusion Bullet Chart component follows accessibility standards including ADA, Section 508, and WCAG 2.2 to ensure usable by all users, including those with disabilities.

### WCAG Compliance

**WCAG 2.2 Level AA Compliance:**
- ✓ Perceivable: Information presented in multiple ways
- ✓ Operable: Keyboard navigation support
- ✓ Understandable: Clear labels and predictable behavior
- ✓ Robust: Compatible with assistive technologies

**Compliance Matrix:**

| Accessibility Criteria | Support Level |
|------------------------|---------------|
| WCAG 2.2 Support | AA |
| Section 508 | ✓ Full |
| Screen Reader | ✓ Full |
| Right-to-Left (RTL) | ✓ Full |
| Color Contrast | ✓ Full |
| Mobile Device | ✓ Full |
| Keyboard Navigation | ✓ Full |

### Keyboard Navigation

The bullet chart supports full keyboard navigation for users who cannot use a mouse.

**Supported Keyboard Shortcuts:**

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next element in chart |
| `Shift + Tab` | Move focus to previous element in chart |
| `Ctrl + P` | Print the bullet chart |
| `Enter` | Activate focused element |
| `Esc` | Close tooltip or modal |

#### Enabling Keyboard Navigation

Keyboard navigation is enabled by default. Ensure your chart is in the tab order:

```cshtml
@(Html.EJS().BulletChart("accessibleChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .TabIndex(0)  // Ensure chart is in tab order
    .Tooltip(t => t.Enable(true))
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Screen Reader Support

Bullet charts work with screen readers like JAWS, NVDA, and Narrator.

#### ARIA Attributes

The component automatically applies appropriate ARIA attributes:

- **role="img"**: Identifies chart as image
- **aria-label**: Provides accessible chart description
- **aria-pressed**: Indicates state of interactive elements

#### Custom Accessible Labels

Provide meaningful descriptions for screen readers:

```cshtml
@(Html.EJS().BulletChart("screenReaderChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Title("Sales Performance Q1 2024")
    .Subtitle("Actual: $270K vs Target: $250K")
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**Screen reader announces:** "Sales Performance Q1 2024. Actual: $270K vs Target: $250K. Bullet chart showing value of 270 against target of 250."

### Color Contrast

Ensure sufficient color contrast for users with vision impairments.

#### High Contrast Theme

```cshtml
@(Html.EJS().BulletChart("highContrastChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Theme(Syncfusion.EJ2.Charts.ChartTheme.HighContrast)
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

#### Custom High Contrast Colors

```cshtml
@(Html.EJS().BulletChart("customContrastChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .ValueFill("#000000")  // Black bar
    .TargetColor("#FFFFFF")  // White target marker
    .TargetWidth(6)  // Thicker for visibility
    .LabelStyle(ls => ls.Color("#000000"))
    .Ranges(r => {
        r.End(150).Color("#D3D3D3").Add();  // Light gray
        r.End(250).Color("#808080").Add();  // Medium gray
        r.End(300).Color("#404040").Add();  // Dark gray
    })
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

**WCAG Color Contrast Guidelines:**
- **Normal text:** 4.5:1 minimum contrast ratio
- **Large text (18pt+):** 3:1 minimum contrast ratio
- **UI components:** 3:1 minimum contrast ratio

#### Accessible Color Patterns

```cshtml
<!-- Safe color combinations -->
@(Html.EJS().BulletChart("accessibleColors")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .ValueFill("#005A9C")  <!-- Dark blue: WCAG AA compliant -->
    .TargetColor("#D32F2F")  <!-- Dark red: High contrast -->
    .TargetWidth(5)
    .Ranges(r => {
        r.End(150).Color("#FFEBEE").Opacity(0.8).Add();  // Light red background
        r.End(250).Color("#FFF3E0").Opacity(0.8).Add();  // Light orange background
        r.End(300).Color("#E8F5E9").Opacity(0.8).Add();  // Light green background
    })
    .LabelStyle(ls => ls.Color("#212121"))  // Dark gray text
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Accessibility Best Practices

#### 1. Provide Descriptive Titles

```cshtml
.Title("Q1 Revenue: $425K of $500K Target (85% Achievement)")
.Subtitle("January - March 2024")
```

#### 2. Use Meaningful Labels

```cshtml
.LabelFormat("${value}K")  // Clear units
.EnableGroupSeparator(true)  // Readable large numbers
```

#### 3. Enable Tooltips

```cshtml
.Tooltip(t => t
    .Enable(true)
    .Fill("#2C3E50")
    .TextStyle(ts => ts.Color("#FFFFFF").FontSize("14px"))
)
```

#### 4. Support Multiple Input Methods

- Enable keyboard navigation
- Provide touch-friendly target sizes for mobile
- Support mouse interactions

#### 5. Test with Assistive Technologies

- Test with screen readers (JAWS, NVDA, Narrator)
- Verify keyboard-only navigation
- Check high contrast mode
- Validate color blindness accessibility

#### 6. Don't Rely on Color Alone

Use multiple visual cues:
- Labels with values
- Patterns or textures
- Text descriptions
- Icons or symbols

```cshtml
@(Html.EJS().BulletChart("multiCueChart")
    .DataSource(Model)
    .ValueField("value")
    .TargetField("target")
    .Title("Sales: 85% of Target")  <!-- Text cue -->
    .DataLabel(dl => dl.Enable(true))  <!-- Value labels -->
    .Tooltip(t => t.Enable(true))  <!-- Interactive detail -->
    .Ranges(r => {
        r.End(150).Color("#E74C3C").Opacity(0.4).Add();
        r.End(250).Color("#F39C12").Opacity(0.4).Add();
        r.End(300).Color("#27AE60").Opacity(0.4).Add();
    })
    .Minimum(0)
    .Maximum(300)
    .Render()
)
```

### Complete Accessible Example

```csharp
// Controller
public ActionResult AccessibleDashboard()
{
    List<PerformanceData> data = new List<PerformanceData>
    {
        new PerformanceData 
        { 
            metric = "Revenue",
            actual = 8500,
            target = 10000,
            unit = "$K"
        }
    };
    return View(data);
}

public class PerformanceData
{
    public string metric { get; set; }
    public double actual { get; set; }
    public double target { get; set; }
    public string unit { get; set; }
}
```

```cshtml
@model List<PerformanceData>

@{
    var item = Model[0];
    double percentage = (item.actual / item.target) * 100;
    string title = $"{item.metric}: {item.actual}{item.unit} of {item.target}{item.unit} Target ({percentage:F0}% Achievement)";
}

<div style="padding: 30px;">
    <h1>Accessible Performance Dashboard</h1>
    
    @(Html.EJS().BulletChart("accessibleChart")
        .DataSource(Model)
        .ValueField("actual")
        .TargetField("target")
        .Title(title)
        .Subtitle("Q1 2024 Performance")
        .TitleStyle(ts => ts
            .Color("#212121")
            .FontSize("16px")
            .FontWeight("bold")
        )
        .SubtitleStyle(ss => ss
            .Color("#616161")
            .FontSize("13px")
        )
        .Theme(Syncfusion.EJ2.Charts.ChartTheme.Material)
        .TabIndex(0)
        .Minimum(0)
        .Maximum(12000)
        .Interval(2000)
        .LabelFormat("${value}K")
        .EnableGroupSeparator(true)
        .LabelStyle(ls => ls.Color("#212121").FontSize("12px"))
        .ValueFill("#1976D2")
        .TargetColor("#D32F2F")
        .TargetWidth(5)
        .DataLabel(dl => dl
            .Enable(true)
            .LabelStyle(ls => ls
                .Color("#FFFFFF")
                .FontSize("14px")
                .FontWeight("600")
            )
        )
        .Ranges(r => {
            r.End(6000).Color("#FFCDD2").Opacity(0.7).Add();
            r.End(9000).Color("#FFE0B2").Opacity(0.7).Add();
            r.End(12000).Color("#C8E6C9").Opacity(0.7).Add();
        })
        .Tooltip(t => t
            .Enable(true)
            .Fill("#424242")
            .Border(b => b.Color("#1976D2").Width(2))
            .TextStyle(ts => ts
                .Color("#FFFFFF")
                .FontSize("13px")
            )
        )
        .Animation(anim => anim
            .Enable(true)
            .Duration(1000)
        )
        .Width("90%")
        .Height("120")
        .Render()
    )
    
    <div style="margin-top: 20px;" role="region" aria-label="Performance Summary">
        <h3>Summary</h3>
        <ul>
            <li><strong>Actual:</strong> @item.actual@item.unit</li>
            <li><strong>Target:</strong> @item.target@item.unit</li>
            <li><strong>Achievement:</strong> @percentage.ToString("F1")%</li>
            <li><strong>Status:</strong> @(percentage >= 100 ? "Target Met" : percentage >= 85 ? "On Track" : "Needs Attention")</li>
        </ul>
    </div>
</div>
```

### Testing Accessibility

**Automated Testing:**
- Use accessibility-checker npm package
- Run axe-core validation
- Check WAVE browser extension

**Manual Testing:**
- Navigate with keyboard only
- Test with screen reader enabled
- View in high contrast mode
- Test with various color blindness simulators
- Verify on mobile devices

**Sample Testing Checklist:**
- ☐ All interactive elements reachable via keyboard
- ☐ Screen reader announces chart purpose and values
- ☐ Color contrast meets WCAG AA standards
- ☐ Chart readable in high contrast mode
- ☐ Tooltips accessible via keyboard
- ☐ Chart responsive on mobile devices
- ☐ No information conveyed by color alone
- ☐ Focus indicators visible

You now have comprehensive knowledge of customizing bullet charts and ensuring they're accessible to all users!
