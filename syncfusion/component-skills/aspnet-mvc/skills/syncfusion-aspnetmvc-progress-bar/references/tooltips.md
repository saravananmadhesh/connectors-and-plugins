# Tooltips

Tooltips provide additional information about the progress value when hovering over or interacting with the progress bar. They are useful for displaying exact progress percentages, time remaining, or custom status messages.

## Table of Contents
- [Enabling Tooltips](#enabling-tooltips)
- [ShowTooltipOnHover Property](#showtooltiponhover-property)
  - [Hover Behavior](#hover-behavior)
  - [Always Visible Tooltip](#always-visible-tooltip)
- [Tooltip Format Customization](#tooltip-format-customization)
  - [Basic Format](#basic-format)
  - [Percentage Format](#percentage-format)
  - [Detailed Format](#detailed-format)
  - [Task Description Format](#task-description-format)
- [Tooltip Styling](#tooltip-styling)
  - [Background Color (Fill)](#background-color-fill)
  - [Border Styling](#border-styling)
  - [Text Style](#text-style)
  - [Complete Tooltip Styling](#complete-tooltip-styling)
- [Tooltip Positioning](#tooltip-positioning)
  - [Linear Bar Tooltip Position](#linear-bar-tooltip-position)
  - [Circular Bar Tooltip Position](#circular-bar-tooltip-position)
- [Tooltip Content Examples](#tooltip-content-examples)
  - [File Download Example](#file-download-example)
  - [Upload Progress with Time Estimate](#upload-progress-with-time-estimate)
  - [Custom Status with Tooltip](#custom-status-with-tooltip)
- [Buffer State with Tooltip](#buffer-state-with-tooltip)
- [Tooltip Visibility Control](#tooltip-visibility-control)
  - [Disable Tooltip Temporarily](#disable-tooltip-temporarily)
  - [Conditional Tooltip Display](#conditional-tooltip-display)
- [Tooltip with Multiple Progress Bars](#tooltip-with-multiple-progress-bars)
- [Best Practices for Tooltips](#best-practices-for-tooltips)
  - [1. Use Clear, Concise Text](#1-use-clear-concise-text)
  - [2. Appropriate Detail Level](#2-appropriate-detail-level)
  - [3. Consistent Styling](#3-consistent-styling)
  - [4. Enable on Hover for Clean UI](#4-enable-on-hover-for-clean-ui)
  - [5. Meaningful Format Strings](#5-meaningful-format-strings)
- [Troubleshooting Tooltips](#troubleshooting-tooltips)
  - [Tooltip Not Appearing](#tooltip-not-appearing)
  - [Tooltip Text Not Updating](#tooltip-text-not-updating)
  - [Tooltip Styling Not Applied](#tooltip-styling-not-applied)
  - [Tooltip Position Wrong](#tooltip-position-wrong)

## Enabling Tooltips

To enable tooltips on a progress bar, add a `TooltipSettings` object with `Enable` set to true:

```csharp
@(Html.EJS().ProgressBar("progressWithTooltip")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(65)
    .Height("30")
    .Tooltip(tp => tp.Enable(true))  // Enable tooltips
    .Render()
)
```

By default, the tooltip displays the current progress value (e.g., "65%").

## ShowTooltipOnHover Property

The `ShowTooltipOnHover` property controls when the tooltip appears:

### Hover Behavior

```csharp
@(Html.EJS().ProgressBar("hoverTooltip")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .Height("30")
    .Tooltip(tp => tp.Enable(true).ShowTooltipOnHover(true))  // Show only on hover
    .Render()
)
```

When `ShowTooltipOnHover = true`, the tooltip appears only when the user hovers over the progress bar.

### Always Visible Tooltip

```csharp
@(Html.EJS().ProgressBar("alwaysVisibleTooltip")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(75)
    .Height("30")
    .Tooltip(tp => tp.Enable(true).ShowTooltipOnHover(false))  // Show always
    .Render()
)
```

When `ShowTooltipOnHover = false`, the tooltip is always visible.

## Tooltip Format Customization

The `Format` property allows customization of what text appears in the tooltip. Use `${value}` placeholder to represent the current progress value.

### Basic Format

```csharp
@(Html.EJS().ProgressBar("basicFormat")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Height("30")
    .Tooltip(tp => tp.Enable(true).Format("${value}% complete"))  // Display: "60% complete"
    .Render()
)
```

### Percentage Format

```csharp
@(Html.EJS().ProgressBar("percentFormat")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(45)
    .Height("30")
    .Tooltip(tp => tp.Enable(true).Format("Progress: ${value}%"))  // Display: "Progress: 45%"
    .Render()
)
```

### Detailed Format

```csharp
@(Html.EJS().ProgressBar("detailedFormat")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(72)
    .Maximum(100)
    .Height("30")
    .Tooltip(tp => tp.Enable(true).Format("${value} of 100"))  // Display: "72 of 100"
    .Render()
)
```

### Task Description Format

```csharp
@(Html.EJS().ProgressBar("taskFormat")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(80)
    .Height("30")
    .Tooltip(tp => tp.Enable(true).Format("Files: ${value}%"))  // Display: "Files: 80%"
    .Render()
)
```

## Tooltip Styling

Customize the appearance of tooltips using the `Fill`, `Border`, and `TextStyle` properties.

### Background Color (Fill)

```csharp
@(Html.EJS().ProgressBar("customFill")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .Height("30")
    .Tooltip(tp => tp.Enable(true).Fill("#0078d4"))  // Blue background
    .Render()
)
```

### Border Styling

```csharp
@(Html.EJS().ProgressBar("customBorder")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Height("30")
    .Tooltip(tp => tp.Enable(true)
        .Border(br => br
            .Color("#333")
            .Width(2)
        )
    )
    .Render()
)
```

### Text Style

```csharp
@(Html.EJS().ProgressBar("customTextStyle")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(65)
    .Height("30")
    .Tooltip(tp => tp.Enable(true)
        .TextStyle(ts => ts
            .Color("#ffffff")
            .FontFamily("Arial")
            .Size("14px")
            .FontWeight("bold")
        )
    )
    .Render()
)
```

### Complete Tooltip Styling

```csharp
@(Html.EJS().ProgressBar("completeStyle")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(75)
    .Height("30")
    .Tooltip(tp => tp.Enable(true)
        .Format("${value}% Downloaded")
        .Fill("#4caf50")  // Green background
        .Border(br => br
            .Color("#2e7d32")
            .Width(1)
        )
        .TextStyle(ts => ts
            .Color("#ffffff")
            .Size("12px")
            .FontWeight("bold")
        )
        .ShowTooltipOnHover(true)
    )
    .Render()
)
```

## Tooltip Positioning

Tooltips automatically position themselves relative to the progress bar. For linear bars, tooltips appear above the bar. For circular bars, they appear near the cursor.

### Linear Bar Tooltip Position

```csharp
<!-- Tooltips appear above the progress bar -->
@(Html.EJS().ProgressBar("linearTooltip")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(55)
    .Height("30")
    .Tooltip(tp => tp.Enable(true).ShowTooltipOnHover(true))
    .Render()
)
```

### Circular Bar Tooltip Position

```csharp
<!-- Tooltips appear near the cursor on circular bars -->
@(Html.EJS().ProgressBar("circularTooltip")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(70)
    .Height("250")
    .Width("250")
    .Tooltip(tp => tp.Enable(true)
        .Format("${value}% Complete")
        .ShowTooltipOnHover(true)
    )
    .Render()
)
```

## Tooltip Content Examples

### File Download Example

```csharp
@(Html.EJS().ProgressBar("downloadTooltip")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Maximum(500)  // 500 MB total
    .Height("30")
    .Tooltip(tp => tp.Enable(true)
        .Format("${value} MB / 500 MB downloaded")
        .ShowTooltipOnHover(true)
        .Fill("#0078d4")
        .TextStyle(ts => ts
            .Color("#ffffff")
            .Size("12px")
        )
    )
    .Render()
)

<script>
    var progressBar = document.getElementById('downloadTooltip').ej2_instances[0];
    var currentValue = 0;
    
    var interval = setInterval(function() {
        currentValue += Math.random() * 50;
        currentValue = Math.min(currentValue, 500);
        progressBar.value = currentValue;
        
        if (currentValue >= 500) {
            clearInterval(interval);
        }
    }, 1000);
</script>
```

### Upload Progress with Time Estimate

```csharp
@(Html.EJS().ProgressBar("uploadTime")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Height("30")
    .Tooltip(tp => tp.Enable(true)
        .Format("${value}% - Est. 2 min remaining")
        .ShowTooltipOnHover(true)
        .Fill("#4caf50")
        .TextStyle(ts => ts
            .Color("#ffffff")
        )
    )
    .Render()
)
```

### Custom Status with Tooltip

```csharp
@(Html.EJS().ProgressBar("statusTooltip")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(45)
    .Height("30")
    .Tooltip(tp => tp.Enable(true)
        .Format("Processing: ${value}%")
        .ShowTooltipOnHover(false)  // Always visible
        .Fill("#ff9800")
        .TextStyle(ts => ts
            .Color("#ffffff")
            .FontWeight("bold")
        )
    )
    .Render()
)
```

## Buffer State with Tooltip

For buffer/secondary progress states, the tooltip displays the primary progress value:

```csharp
@(Html.EJS().ProgressBar("bufferTooltip")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(40)              // Played/Primary
    .SecondaryProgress(75)  // Buffered/Secondary
    .Height("30")
    .Tooltip(tp => tp.Enable(true)
        .Format("${value}% played")
        .ShowTooltipOnHover(true)
        .Fill("#0078d4")
        .TextStyle(ts => ts
            .Color("#ffffff")
        )
    )
    .Render()
)
```

The tooltip shows the primary progress value (40%), while the secondary progress (75%) is visible as the buffered portion.

## Tooltip Visibility Control

### Disable Tooltip Temporarily

```html
@(Html.EJS().ProgressBar("toggleTooltip")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .Height("30")
    .Tooltip(tp => tp.Enable(true)
        .Format("${value}%")
    )
    .Render()
)

<button id="toggleBtn">Disable Tooltips</button>

<script>
    var progressBar = document.getElementById('toggleTooltip').ej2_instances[0];
    var tooltipEnabled = true;
    
    document.getElementById('toggleBtn').addEventListener('click', function() {
        tooltipEnabled = !tooltipEnabled;
        progressBar.tooltip.enable = tooltipEnabled;
        progressBar.dataBind();
        this.textContent = tooltipEnabled ? 'Disable Tooltips' : 'Enable Tooltips';
    });
</script>
```

### Conditional Tooltip Display

```csharp
@{
    bool showTooltip = true;  // Can be based on user settings
}

@(Html.EJS().ProgressBar("conditionalTooltip")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(65)
    .Height("30")
    .Tooltip(tp => tp.Enable(showTooltip)
        .Format("${value}%")
        .ShowTooltipOnHover(true)
    )
    .Render()
)
```

## Tooltip with Multiple Progress Bars

For dashboards with multiple progress bars, each can have its own tooltip configuration:

```html
<div style="margin: 20px;">
    <h3>System Metrics with Tooltips</h3>
    
    <div style="margin-bottom: 20px;">
        <h4>CPU Usage</h4>
        @(Html.EJS().ProgressBar("cpuMetric")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
            .Value(45)
            .Height("20")
            .Tooltip(tp => tp.Enable(true)
                .Format("CPU: ${value}%")
                .ShowTooltipOnHover(true)
                .Fill("#2196f3")
            )
            .Render()
        )
    </div>
    
    <div style="margin-bottom: 20px;">
        <h4>Memory Usage</h4>
        @(Html.EJS().ProgressBar("memoryMetric")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
            .Value(72)
            .Height("20")
            .Tooltip(tp => tp.Enable(true)
                .Format("Memory: ${value}%")
                .ShowTooltipOnHover(true)
                .Fill("#ff9800")
            )
            .Render()
        )
    </div>
    
    <div style="margin-bottom: 20px;">
        <h4>Disk Usage</h4>
        @(Html.EJS().ProgressBar("diskMetric")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
            .Value(58)
            .Height("20")
            .Tooltip(tp => tp.Enable(true)
                .Format("Disk: ${value}%")
                .ShowTooltipOnHover(true)
                .Fill("#4caf50")
            )
            .Render()
        )
    </div>
</div>
```

## Best Practices for Tooltips

### 1. Use Clear, Concise Text
```csharp
// Good
Format = "${value}% Complete"

// Avoid
Format = "The progress of this operation is currently at ${value}%"
```

### 2. Appropriate Detail Level
```csharp
// For simple indicator
Format = "${value}%"

// For detailed tracking
Format = "${value}MB / 500MB downloaded"
```

### 3. Consistent Styling
```csharp
// Use theme colors that match your application
Fill = "#0078d4"  // Match your primary brand color
TextStyle = new ProgressBarTextStyle
{
    Color = "#ffffff",
    FontSize = "12px"
}
```

### 4. Enable on Hover for Clean UI
```csharp
ShowTooltipOnHover = true  // Prevents visual clutter
```

### 5. Meaningful Format Strings
```csharp
// Context-specific tooltips
// For uploads:
Format = "${value}% uploaded"

// For downloads:
Format = "${value}% downloaded"

// For processing:
Format = "${value}% processed"

// For database operations:
Format = "${value} of 10000 records"
```

## Troubleshooting Tooltips

### Tooltip Not Appearing
- Ensure `Enable = true` in TooltipSettings
- For hover tooltips, ensure `ShowTooltipOnHover = true`
- Check browser console for errors

### Tooltip Text Not Updating
- Verify `${value}` placeholder is used in Format string
- Ensure progress bar Value property updates correctly
- Check that TooltipSettings is properly configured

### Tooltip Styling Not Applied
- Verify Fill, Border, and TextStyle properties are set
- Check that CSS isn't overriding tooltip styles
- Ensure color values are valid hex or CSS color names

### Tooltip Position Wrong
- Tooltips auto-position; ensure progress bar isn't hidden
- Check z-index if tooltips appear behind other elements
- Verify parent container has proper positioning
