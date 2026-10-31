# Tooltip Support

## Table of Contents
- [Understanding Tooltips](#understanding-tooltips)
  - [When to Use Tooltips](#when-to-use-tooltips)
  - [Benefits of Tooltips](#benefits-of-tooltips)
- [Enabling Tooltips](#enabling-tooltips)
  - [Basic Tooltip Configuration](#basic-tooltip-configuration)
  - [Tooltip on Hover Only](#tooltip-on-hover-only)
  - [Circular Progress with Tooltip](#circular-progress-with-tooltip)
  - [Disabling Tooltips](#disabling-tooltips)
- [Tooltip Display Modes](#tooltip-display-modes)
  - [Always Visible Tooltips](#always-visible-tooltips)
  - [Hover-Only Tooltips](#hover-only-tooltips)
  - [Focus-Based Tooltips](#focus-based-tooltips)
- [Tooltip Formatting](#tooltip-formatting)
  - [Default Tooltip Format](#default-tooltip-format)
  - [Custom Format String](#custom-format-string)
  - [Multi-Line Format](#multi-line-format)
  - [Format with Placeholders](#format-with-placeholders)
- [Tooltip Customization](#tooltip-customization)
  - [Styling Tooltips](#styling-tooltips)
  - [Tooltip Background Color](#tooltip-background-color)
  - [Tooltip Border Styling](#tooltip-border-styling)
  - [Text Styling](#text-styling)
- [Common Tooltip Patterns](#common-tooltip-patterns)
  - [Pattern 1: File Upload Progress](#pattern-1-file-upload-progress)
  - [Pattern 2: Time-Based Tooltip](#pattern-2-time-based-tooltip)
  - [Pattern 3: Status with Color-Coded Tooltip](#pattern-3-status-with-color-coded-tooltip)
  - [Pattern 4: Circular Progress with Tooltip](#pattern-4-circular-progress-with-tooltip)
  - [Pattern 5: Tasks Completed Counter](#pattern-5-tasks-completed-counter)
  - [Pattern 6: Multi-Metric Tooltip](#pattern-6-multi-metric-tooltip)
- [Accessibility Considerations](#accessibility-considerations)
  - [Keyboard Navigation Support](#keyboard-navigation-support)
  - [Screen Reader Announcements](#screen-reader-announcements)

## Understanding Tooltips

Tooltips display contextual information when hovering over or focusing on the progress bar. They provide additional details without cluttering the interface permanently.

### When to Use Tooltips

- Display current progress percentage
- Show time estimates or remaining time
- Display file size or items processed
- Provide status information
- Show velocity or speed metrics

### Benefits of Tooltips

- **Non-intrusive** - Information appears on demand
- **Space-efficient** - No permanent UI space used
- **Context-aware** - Can show dynamic information
- **Informative** - Provides detailed feedback
- **Accessible** - Can be navigated with keyboard

## Enabling Tooltips

### Basic Tooltip Configuration

```cshtml
<ejs-progressbar id="basicTooltip" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

With this configuration:
- Tooltip shows by default on page load
- Displays the current progress percentage
- Updates as the value changes

### Tooltip on Hover Only

```cshtml
<ejs-progressbar id="hoverTooltip" 
                  type="Linear" 
                  value="65"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" showTooltipOnHover="true">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

With `showTooltipOnHover="true"`:
- Tooltip only appears when hovering over the progress bar
- Disappears when mouse leaves
- Useful for information that's not always needed

### Circular Progress with Tooltip

```cshtml
<ejs-progressbar id="circularTooltip" 
                  type="Circular" 
                  value="75"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" showTooltipOnHover="true">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

Tooltips work with all progress bar types.

### Disabling Tooltips

```cshtml
<ejs-progressbar id="noTooltip" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="false">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

Disable when:
- Space is limited and tooltips overlap content
- Mobile touch devices (tooltips less useful)
- Information is shown elsewhere in the UI
- Minimalist design is required

## Tooltip Display Modes

### Always Visible Tooltips

```cshtml
<ejs-progressbar id="alwaysVisible" 
                  type="Linear" 
                  value="45"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" showTooltipOnHover="false">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

Tooltips are visible by default and persist on the page.

### Hover-Only Tooltips

```cshtml
<ejs-progressbar id="hoverOnly" 
                  type="Linear" 
                  value="70"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" showTooltipOnHover="true">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

Tooltips appear only when hovering over the progress bar.

### Focus-Based Tooltips

Combine with keyboard navigation for accessibility:

```cshtml
<ejs-progressbar id="focusTooltip" 
                  type="Linear" 
                  value="55"
                  tabindex="0"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" showTooltipOnHover="true">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>

<script>
// Tooltip shows on hover/focus for keyboard accessibility
document.getElementById('focusTooltip').addEventListener('focus', function() {
    this.ej2_instances[0].tooltip?.show();
});

document.getElementById('focusTooltip').addEventListener('blur', function() {
    this.ej2_instances[0].tooltip?.hide();
});
</script>
```

## Tooltip Formatting

### Default Tooltip Format

By default, tooltips show the current progress value as a percentage:

```cshtml
<ejs-progressbar id="defaultFormat" 
                  type="Linear" 
                  value="60"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

Displays: "60%"

### Custom Format String

```cshtml
<ejs-progressbar id="customFormat" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" 
                                     format="Progress: ${value}">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

Displays: "Progress: 50%"

Where ${value} represents the current value.

### Multi-Line Format

```cshtml
<ejs-progressbar id="multiFormat" 
                  type="Linear" 
                  value="35"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" 
                                     format="Progress: ${value}%<br/>Status: Uploading">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

Uses HTML for multi-line tooltips.

### Format with Placeholders

Create dynamic formatted tooltips:

```cshtml
<ejs-progressbar id="templateFormat"
                 type="Linear"
                 minimum="0"
                 maximum="100"
                 value="65"
                 tooltipRender="onPbTooltipRender">
    <e-progressbar-tooltipsettings enable="true" showTooltipOnHover="true"></e-progressbar-tooltipsettings>

    <!-- IMPORTANT: keep animation off for interactive dragging -->
    <e-progressbar-animation enable="false"></e-progressbar-animation>
</ejs-progressbar>

<div style="margin-top:12px;">
    <input id="valSlider" type="range" min="0" max="100" value="65" />
    <span id="valText">65</span>
</div>

<script>
  function getPB() {
      const el = document.getElementById('templateFormat');
      return (el && el.ej2_instances) ? el.ej2_instances[0] : null;
  }
  document.addEventListener('DOMContentLoaded', function () {
      const slider = document.getElementById('valSlider');
      const valText = document.getElementById('valText');

      // Update continuously while dragging
      slider.addEventListener('input', function () {
          const pb = getPB();
          if (!pb) return;
          const v = Number(slider.value);
          valText.textContent = v;
          pb.value = v;
          pb.refresh(); 
      });

  });

  function onPbTooltipRender(args) {
      const pb = getPB();
      if (!pb) return;

      const percentage = Math.round(pb.value);
      const status = (percentage < 33) ? 'Starting'
                   : (percentage < 66) ? 'Processing'
                   : 'Finishing';
      args.text = percentage + '%<br/>' + status;
  }
</script>
```

## Tooltip Customization

### Styling Tooltips

```cshtml
<style>
    .e-progressbar .e-tooltip {
        background-color: #2196F3;
        color: white;
        border: none;
        border-radius: 6px;
        padding: 8px 12px;
        font-size: 13px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }
    
    .e-progressbar .e-tooltip-arrow {
        border-top-color: #2196F3;
    }
</style>

<ejs-progressbar id="styledTooltip" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

### Tooltip Background Color

```cshtml
<ejs-progressbar id="colorTooltip" 
                  type="Linear" 
                  value="75"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" fill="red">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

### Tooltip Border Styling

```cshtml
<ejs-progressbar id="borderTooltip" 
                  type="Linear" 
                  value="60"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true">
        <e-tooltipsettings-border color="#2196F3" width="2"></e-tooltipsettings-border>
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

### Text Styling

```cshtml
<ejs-progressbar id="textStyleTooltip" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true">
        <e-tooltipsettings-textstyle size="14px" color="#2196F3" fontFamily="Arial" fontWeight="900" fontStyle="Italic">
        </e-tooltipsettings-textstyle>
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

## Common Tooltip Patterns

### Pattern 1: File Upload Progress

```cshtml
<ejs-progressbar id="uploadTooltip" 
                  type="Linear" 
                  value="45"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" 
                                     format="${value}% - 45MB of 100MB">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

Shows both percentage and file size information.

### Pattern 2: Time-Based Tooltip

```cshtml
<ejs-progressbar id="timeTooltip" 
                  type="Linear" 
                  value="30"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" 
                                     format="${value}% - 2:15 remaining">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>

<script>
// Update remaining time dynamically
var timer = setInterval(function() {
    var pb = document.getElementById('timeTooltip').ej2_instances[0];
    
    // Calculate and update remaining time
    var remaining = calculateRemainingTime();
    pb.tooltip.format = pb.value + '% - ' + formatTime(remaining) + ' remaining';
}, 1000);

function calculateRemainingTime() {
    // Implementation to calculate remaining time
}

function formatTime(seconds) {
    var mins = Math.floor(seconds / 60);
    var secs = Math.round(seconds % 60);
    return mins + ':' + (secs < 10 ? '0' : '') + secs;
}
</script>
```

### Pattern 3: Status with Color-Coded Tooltip

```cshtml
<ejs-progressbar id="statusTooltip"
                 type="Linear"
                 value="50"
                 minimum="0"
                 maximum="100">
    <e-progressbar-tooltipsettings enable="true" showTooltipOnHover="true"></e-progressbar-tooltipsettings>
</ejs-progressbar>

<script>
document.addEventListener('DOMContentLoaded', function () {
    const pb = document.getElementById('statusTooltip').ej2_instances[0];

    pb.tooltipRender = function (args) {
        const value = Math.round(pb.value);

        let status, fill, borderColor;

        if (value < 25) {
            status = 'Critical';
            fill = '#F44336';
            borderColor = '#D32F2F';
        } else if (value < 75) {
            status = 'Warning';
            fill = '#FF9800';
            borderColor = '#FB8C00';
        } else {
            status = 'Success';
            fill = '#4CAF50';
            borderColor = '#388E3C';
        }

        // Update tooltip text (supported in tooltipRender)
        args.text = `${value}% - ${status}`;  

        // Update tooltip appearance using built-in tooltip settings
        pb.tooltip.fill = fill;  
        pb.tooltip.border = pb.tooltip.border || {};
        pb.tooltip.border.color = borderColor; 
        pb.tooltip.border.width = 2;

        pb.dataBind(); 
    };
});
</script>
```

### Pattern 4: Circular Progress with Tooltip

```cshtml
<ejs-progressbar id="circularStatusTooltip" 
                  type="Circular" 
                  value="68"
                  showProgressValue="true"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" 
                                     format="Downloaded: ${value}%"
                                     showTooltipOnHover="true">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

Combines value display with hover tooltip.

### Pattern 5: Tasks Completed Counter

```cshtml
<ejs-progressbar id="taskTooltip"
                 type="Linear" 
                 value="60"
                 minimum="0" 
                 maximum="100">
    <e-progressbar-tooltipsettings enable="true" showTooltipOnHover="true"></e-progressbar-tooltipsettings>
</ejs-progressbar>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var pb = document.getElementById('taskTooltip').ej2_instances[0];

    pb.tooltipRender = function (args) {
        var completed = Math.round(pb.value);
        var total = pb.maximum;
        args.text = 'Tasks: ' + completed + ' of ' + total;
    };
});
</script>
```

### Pattern 6: Multi-Metric Tooltip

```cshtml
<ejs-progressbar id="metricsTooltip"
                 type="Linear"
                 value="40"
                 minimum="0"
                 maximum="100">
    <e-progressbar-tooltipsettings enable="true" showTooltipOnHover="true"></e-progressbar-tooltipsettings>
</ejs-progressbar>

<script>
document.addEventListener('DOMContentLoaded', function () {
    var pb = document.getElementById('metricsTooltip').ej2_instances[0];
    var startTime = Date.now();
    pb.tooltipRender = function (args) {
        var value = Math.round(pb.value);
        var elapsed = Math.max(1, Math.round((Date.now() - startTime) / 1000));
        var rate = value / elapsed;
        var etaText;
        if (!isFinite(rate) || rate <= 0.0001) {
            etaText = 'ETA: --';
        } else {
            var remaining = (pb.maximum - value) / rate;
            etaText = 'ETA: ' + Math.round(remaining) + 's';
        }
        args.text =
            'Progress: ' + value + '%<br/>' +
            'Speed: ' + rate.toFixed(1) + '%<br/>' +
            etaText;
    };
});
</script>
```

## Accessibility Considerations

### Keyboard Navigation Support

```cshtml
<ejs-progressbar id="a11yTooltip" 
                  type="Linear" 
                  value="50"
                  tabindex="0"
                  role="Warning"
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Upload progress"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true" 
                                     showTooltipOnHover="true">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>

<script>
// Show tooltip on keyboard focus
document.getElementById('a11yTooltip').addEventListener('focus', function() {
    this.ej2_instances[0].tooltip?.show();
});
</script>
```

### Screen Reader Announcements

```cshtml
<ejs-progressbar id="srTooltip" 
                  type="Linear" 
                  value="100"
                  role="Success"
                  aria-valuenow="65"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  aria-label="Upload Progress - 65 percent complete"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-tooltipsettings enable="true">
    </e-progressbar-tooltipsettings>
</ejs-progressbar>
```

---

Tooltips enhance user experience by providing contextual information on demand. Use them to display relevant details without permanently cluttering the interface.
