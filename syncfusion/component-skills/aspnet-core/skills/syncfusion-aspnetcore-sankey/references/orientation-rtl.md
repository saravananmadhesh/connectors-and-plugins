# Orientation and RTL Support

The Sankey Chart supports flexible layout options including horizontal and vertical orientations, as well as right-to-left (RTL) rendering for international applications. These features enable you to create localized and directionally appropriate visualizations. All orientation and RTL functionality is self-contained and independent of styling or event handling.

## Table of Contents
- [Orientation Options](#orientation-options)
- [Horizontal Orientation](#horizontal-orientation)
    - [Horizontal Flow Example](#horizontal-flow-example)
- [Vertical Orientation](#vertical-orientation)
    - [Vertical Flow Example](#vertical-flow-example)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
    - [RTL Languages](#rtl-languages)
    - [RTL with Horizontal Orientation](#rtl-with-horizontal-orientation)
    - [Example: Arabic Business Process](#example-arabic-business-process)
- [RTL Effects on Layout](#rtl-effects-on-layout)
    - [Layout Transformation Example](#layout-transformation-example)
- [Complete RTL Example](#complete-rtl-example)
    - [Complete HTML with RTL Support](#complete-html-with-rtl-support)
    - [Page Model Code](#page-model-code)
- [Orientation + RTL Combinations](#orientation--rtl-combinations)
    - [Horizontal + LTR (Default)](#horizontal--ltr-default)
    - [Horizontal + RTL](#horizontal--rtl)
    - [Vertical + LTR](#vertical--ltr)
    - [Vertical + RTL](#vertical--rtl)
- [Best Practices](#best-practices)
    - [Localization](#localization)
    - [Orientation Selection](#orientation-selection)
    - [Testing](#testing)
    - [Responsive Orientation](#responsive-orientation)
    - [Multi-Language Support](#multi-language-support)

## Orientation Options

Control the layout direction of the Sankey Chart using the `Orientation` property:

| Option | Description | Use Case |
|--------|-------------|----------|
| 'Horizontal' | Nodes flow from left to right | Standard Sankey (default) |
| 'Vertical' | Nodes flow from top to bottom | Hierarchical flows, processes |

## Horizontal Orientation

The default orientation displays nodes horizontally across the chart, with flows moving from left to right. This is the standard layout for most Sankey diagrams:

```html
<ejs-sankey id="horizontalSankey"
                 width="100%"
                 height="420px"
                 orientation="Horizontal">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

**Layout:** Source nodes on left → Process nodes in middle → Target nodes on right

### Horizontal Flow Example

In Page Model:

```csharp
// Energy flow from sources to consumers
var nodeData = new object[]
{
    new { id = 0, label = "Solar" },
    new { id = 1, label = "Wind" },
    new { id = 2, label = "Grid" },
    new { id = 3, label = "Residential" },
    new { id = 4, label = "Industrial" }
};

var linkData = new object[]
{
    new { sourceNodeID = 0, targetNodeID = 2, value = 150 },
    new { sourceNodeID = 1, targetNodeID = 2, value = 200 },
    new { sourceNodeID = 2, targetNodeID = 3, value = 250 },
    new { sourceNodeID = 2, targetNodeID = 4, value = 100 }
};
```

**Result:** Energy flows left to right: Solar/Wind → Grid → Residential/Industrial

## Vertical Orientation

Display nodes vertically with flows moving from top to bottom. This layout is useful for depicting hierarchical relationships or processes that flow downward:

```html
<ejs-sankey id="verticalSankey"
                 width="100%"
                 height="600px"
                 orientation="Vertical">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

**Layout:** Source nodes at top → Process nodes in middle → Target nodes at bottom

### Vertical Flow Example

In Page Model:

```csharp
// Sales process from inquiry to purchase
var nodeData = new object[]
{
    new { id = 0, label = "Website Visitors" },
    new { id = 1, label = "Product Browse" },
    new { id = 2, label = "Add to Cart" },
    new { id = 3, label = "Checkout" },
    new { id = 4, label = "Purchase" },
    new { id = 5, label = "Abandon" }
};

var linkData = new object[]
{
    new { sourceNodeID = 0, targetNodeID = 1, value = 1000 },
    new { sourceNodeID = 1, targetNodeID = 2, value = 450 },
    new { sourceNodeID = 2, targetNodeID = 3, value = 350 },
    new { sourceNodeID = 3, targetNodeID = 4, value = 300 },
    new { sourceNodeID = 1, targetNodeID = 5, value = 550 }
};
```

**Result:** Sales funnel flows top to bottom: Visitors → Browse → Add to Cart → Checkout → Purchase

## Right-to-Left (RTL) Support

Enable RTL rendering for languages that read from right to left (such as Arabic, Hebrew, and Persian) using the `EnableRtl` property. RTL mode reverses the horizontal flow direction and mirrors the layout:

```html
<ejs-sankey id="rtlSankey"
                 width="100%"
                 height="420px"
                 enableRtl="true">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

**RTL Layout:** Nodes flow from right to left (instead of left to right)

### RTL Languages

Enable RTL for these languages:
- **Arabic** (ar)
- **Hebrew** (he)
- **Persian/Farsi** (fa)
- **Urdu** (ur)
- **Kurdish** (ckb)
- **Uyghur** (ug)

### RTL with Horizontal Orientation

Combining RTL mode with horizontal orientation creates a right-to-left flow layout. Nodes flow from right to left, and labels are right-aligned, making it suitable for RTL languages:

```html
<ejs-sankey id="rtlHorizontalSankey"
                 width="100%"
                 height="420px"
                 orientation="Horizontal"
                 enableRtl="true">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

**RTL Horizontal Layout:** Target nodes on left ← Process nodes ← Source nodes on right

### Example: Arabic Business Process

In Page Model:

```csharp
var nodeData = new object[]
{
    new { id = 0, label = "الموارد البشرية" },        // HR
    new { id = 1, label = "التدريب" },               // Training
    new { id = 2, label = "التقييم" },               // Evaluation
    new { id = 3, label = "الترقية" }                // Promotion
};

var linkData = new object[]
{
    new { sourceNodeID = 0, targetNodeID = 1, value = 100 },
    new { sourceNodeID = 1, targetNodeID = 2, value = 80 },
    new { sourceNodeID = 2, targetNodeID = 3, value = 20 }
};
```

View:

```html
<ejs-sankey id="arabicSankey"
                 width="100%"
                 height="420px"
                 enableRtl="true"
                 locale="ar">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

**Result:** Arabic text displays right-aligned, flow proceeds from right to left.

## RTL Effects on Layout

When RTL is enabled (with Horizontal orientation):

| Element | LTR | RTL |
|---------|-----|-----|
| Node flow direction | Left → Right | Right → Left |
| Label alignment | Left-aligned | Right-aligned |
| Legend position | Right by default | Left by default |
| Tooltips | Right-aligned | Left-aligned |
| All UI elements | LTR order | RTL order |

### Layout Transformation Example

**LTR (Left-to-Right):**
```
Source → Process → Target
(left)     (middle)  (right)
```

**RTL (Right-to-Left):**
```
Target ← Process ← Source
(left)    (middle)  (right)
```

## Complete RTL Example

### Complete HTML with RTL Support

```html
@page
@model SankeyModel

<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مخطط Sankey</title>
</head>
<body>
    <div class="container">
        <h1>تحليل تدفق البيانات</h1>
        
        <ejs-sankey id="dataSankey"
                 width="100%"
                 height="500px"
                 orientation="Horizontal"
                 enableRtl="true"
                 locale="ar"
                 theme="Material">
            <e-sankey-nodes>
                @foreach (var node in nodeData)
                {
                    <e-sankey-node id="@node.id"></e-sankey-node>
                }
            </e-sankey-nodes>
            <e-sankey-links>
                @foreach (var link in linkData)
                {
                    <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
                }
            </e-sankey-links>
            <e-sankey-nodesettings width="25" padding="10">
            </e-sankey-nodesettings>

            <e-sankey-linksettings opacity="0.4" curvature="0.55">
            </e-sankey-linksettings>

            <e-sankey-labelsettings fontSize="12px" fontWeight="500">
            </e-sankey-labelsettings>

            <e-sankey-legendsettings position="Top" title="مفتاح الألوان">
            </e-sankey-legendsettings>
        </ejs-sankey>
    </div>
</body>
</html>
```

### Page Model Code

```csharp
public class SankeyModel : PageModel
{
    public object[] NodeData { get; set; }
    public object[] LinkData { get; set; }

    public void OnGet()
    {
        NodeData = new object[]
        {
            new { id = 0, label = "البيانات الخام" },     // Raw Data
            new { id = 1, label = "التنظيف" },            // Cleaning
            new { id = 2, label = "التحليل" },            // Analysis
            new { id = 3, label = "التقارير" }            // Reports
        };

        LinkData = new object[]
        {
            new { sourceNodeID = 0, targetNodeID = 1, value = 1000 },
            new { sourceNodeID = 1, targetNodeID = 2, value = 950 },
            new { sourceNodeID = 2, targetNodeID = 3, value = 900 }
        };
    }
}
```

## Orientation + RTL Combinations

### Horizontal + LTR (Default)
```html
<ejs-sankeychart orientation="Horizontal" enableRtl="false">
```
Flow: Left → Right (standard)

### Horizontal + RTL
```html
<ejs-sankeychart orientation="Horizontal" enableRtl="true">
```
Flow: Right → Left (for RTL languages)

### Vertical + LTR
```html
<ejs-sankeychart orientation="Vertical" enableRtl="false">
```
Flow: Top → Bottom (hierarchical LTR)

### Vertical + RTL
```html
<ejs-sankeychart orientation="Vertical" enableRtl="true">
```
Flow: Top → Bottom with RTL text and element ordering

## Best Practices

### Localization

- Use RTL when targeting Arabic, Hebrew, Persian, or Urdu
- Set HTML `lang` and `dir` attributes for proper semantics
- Combine with Culture property for date/number formatting
- Test layouts in both LTR and RTL modes

### Orientation Selection

- Use **Horizontal** for most Sankey diagrams (standard)
- Use **Vertical** for hierarchical or process flows (top-down)
- Choose based on available screen space
- Consider responsive layouts (horizontal on desktop, vertical on mobile)

### Testing

- Test with native RTL language users if possible
- Verify label spacing and text truncation
- Check legend positioning in RTL mode
- Ensure touch targets are properly sized for RTL
- Validate color contrast ratios
- Test keyboard navigation in RTL

### Responsive Orientation

```html
<ejs-sankey id="responsiveOrientationSankey"
                 width="100%"
                 height="@(ViewBag.IsDesktop ? "500px" : "800px")"
                 orientation="@(ViewBag.IsDesktop ? Syncfusion.EJ2.Charts.Orientation.Horizontal : Syncfusion.EJ2.Charts.Orientation.Vertical)"
                 enableRtl="@User.IsInCultureGroup("ar")">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
    <e-sankey-links>
        @foreach (var link in linkData)
        {
            <e-sankey-link sourceId="@link.sourceNodeID" targetId="@link.targetNodeID" value="@link.value"></e-sankey-link>
        }
    </e-sankey-links>
</ejs-sankey>
```

### Multi-Language Support

```csharp
// In Page Model
var culture = System.Globalization.CultureInfo.CurrentCulture.Name;
var isRtl = culture.StartsWith("ar") || culture.StartsWith("he") || culture.StartsWith("fa");

// Pass to view
ViewBag.EnableRtl = isRtl;
```

```html
<!-- In View -->
<ejs-sankey enableRtl="@ViewBag.EnableRtl">
    <e-sankey-nodes>
        @foreach (var node in nodeData)
        {
            <e-sankey-node id="@node.id"></e-sankey-node>
        }
    </e-sankey-nodes>
</ejs-sankey>
```
