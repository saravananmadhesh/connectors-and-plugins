# Types and Progress Modes

## Table of Contents
- [Linear Progress Bar](#linear-progress-bar)
  - [Basic Linear Progress Bar](#basic-linear-progress-bar)
  - [Linear with Secondary Progress](#linear-with-secondary-progress)
  - [Linear Bar Sizing](#linear-bar-sizing)
  - [Linear Usage Scenarios](#linear-usage-scenarios)
- [Circular Progress Bar](#circular-progress-bar)
  - [Basic Circular Progress Bar](#basic-circular-progress-bar)
  - [Circular with Secondary Progress](#circular-with-secondary-progress)
  - [Circular Bar Sizing](#circular-bar-sizing)
  - [Circular Usage Scenarios](#circular-usage-scenarios)
- [Semi-Circular Progress Bar](#semi-circular-progress-bar)
  - [Basic Semi-Circular Progress Bar](#basic-semi-circular-progress-bar)
  - [Semi-Circular Sizing](#semi-circular-sizing)
  - [Semi-Circular Usage Scenarios](#semi-circular-usage-scenarios)
- [Determinate State](#determinate-state)
  - [When to Use Determinate State](#when-to-use-determinate-state)
  - [Determinate Progress Example](#determinate-progress-example)
  - [Real-Time Determinate Progress](#real-time-determinate-progress)
  - [Determinate Scenarios](#determinate-scenarios)
- [Indeterminate State](#indeterminate-state)
  - [When to Use Indeterminate State](#when-to-use-indeterminate-state)
  - [Indeterminate Progress Example](#indeterminate-progress-example)
  - [Indeterminate States for All Types](#indeterminate-states-for-all-types)
  - [Indeterminate Scenarios](#indeterminate-scenarios)
- [Buffer State](#buffer-state)
  - [Buffer Progress Example](#buffer-progress-example)
  - [Circular Buffer Progress](#circular-buffer-progress)
  - [Buffer Scenarios](#buffer-scenarios)
  - [Buffer State Best Practices](#buffer-state-best-practices)
- [Combining States](#combining-states)
  - [Linear with Secondary Progress and Animation](#linear-with-secondary-progress-and-animation)
  - [Transition from Indeterminate to Determinate](#transition-from-indeterminate-to-determinate)
- [Complete Examples](#complete-examples)
  - [Example 1: File Upload with Progress](#example-1-file-upload-with-progress)
  - [Example 2: Multi-Format Progress Display](#example-2-multi-format-progress-display)
  - [Example 3: Dashboard with Multiple Indicators](#example-3-dashboard-with-multiple-indicators)

## Linear Progress Bar

The linear progress bar displays progress as a horizontal bar. This is the default type and most commonly used for file downloads, uploads, and data loading scenarios.

### Basic Linear Progress Bar

```csharp
@(Html.EJS().ProgressBar("linearBar")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Height("30")
    .Render()
)
```

### Linear with Secondary Progress

Linear progress bars support secondary progress, useful for buffering scenarios (e.g., video buffering where secondary progress shows downloaded content and primary shows played content).

```csharp
@(Html.EJS().ProgressBar("linearBuffer")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(40)           // Primary progress: played content
    .SecondaryProgress(70)  // Secondary progress: buffered content
    .Height("30")
    .Render()
)
```

### Linear Bar Sizing

Control the appearance with Height and Width:

```csharp
@(Html.EJS().ProgressBar("thinLinear")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .Height("4")        // Very thin bar
    .Width("100%")      // Full width
    .Render()
)

@(Html.EJS().ProgressBar("thickLinear")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .Height("50")       // Thick bar for prominence
    .Render()
)
```

### Linear Usage Scenarios

- **File Download/Upload**: Show download or upload progress percentage
- **Data Loading**: Display data loading progress while fetching from server
- **Installation Progress**: Show software or update installation steps
- **Form Submission**: Display submission progress in multi-step forms
- **Batch Processing**: Show processing progress for bulk operations

## Circular Progress Bar

The circular progress bar displays progress as a complete circle. This is ideal for dashboards, status indicators, and when space is limited.

### Basic Circular Progress Bar

```csharp
@(Html.EJS().ProgressBar("circularBar")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(75)
    .Height("250")
    .Width("250")
    .Render()
)
```

For circular and semi-circular types, always set both `Height` and `Width` to the same value for a perfect circle. The dimensions control the size of the circle.

### Circular with Secondary Progress

```csharp
@(Html.EJS().ProgressBar("circularBuffer")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(50)
    .SecondaryProgress(80)
    .Height("250")
    .Width("250")
    .Render()
)
```

### Circular Bar Sizing

Adjust the circle size by changing Height and Width:

```csharp
@(Html.EJS().ProgressBar("smallCircular")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(60)
    .Height("120")
    .Width("120")
    .Render()
)

@(Html.EJS().ProgressBar("largeCircular")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(60)
    .Height("400")
    .Width("400")
    .Render()
)
```

### Circular Usage Scenarios

- **Dashboard Metrics**: Display CPU, Memory, or Disk usage
- **User Profile Completion**: Show profile completion percentage
- **Status Indicators**: Display overall system or process status
- **Task Completion**: Show task or project completion status
- **Skill Proficiency**: Display skill level or expertise percentage
- **Test Score**: Display exam or test score as circular progress

## Semi-Circular Progress Bar

The semi-circular progress bar displays progress as a half-circle, useful for speedometer-like visualizations or when you want a less prominent indicator.

### Basic Semi-Circular Progress Bar

```csharp
@(Html.EJS().ProgressBar("semicircularBar")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .StartAngle(270)
    .EndAngle(90)
    .Value(65)
    .Height("250")
    .Width("250")
    .Render()
)
```

Like circular bars, set Height and Width to equal values.

### Semi-Circular Sizing

```csharp
@(Html.EJS().ProgressBar("smallSemiCircular")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .StartAngle(270)
    .EndAngle(90)
    .Value(60)
    .Height("150")
    .Width("150")
    .Render()
)

@(Html.EJS().ProgressBar("largeSemiCircular")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .StartAngle(270)
    .EndAngle(90)
    .Value(60)
    .Height("350")
    .Width("350")
    .Render()
)
```

### Semi-Circular Usage Scenarios

- **Speedometer Gauge**: Display speed or performance metrics
- **Temperature Display**: Show temperature within safe ranges
- **Battery Level**: Display device battery level
- **Signal Strength**: Show network or WiFi signal strength
- **Efficiency Rating**: Display efficiency or quality percentage

## Determinate State

Determinate state means the total progress is known and can be calculated. The progress bar fills from empty to full based on actual progress.

### When to Use Determinate State

Use determinate state when:
- You know the total number of items to process
- You can calculate exact percentage (e.g., 50MB of 100MB uploaded)
- The user needs to see exact progress percentage
- Processing items sequentially with known count

### Determinate Progress Example

```csharp
@(Html.EJS().ProgressBar("uploadProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(65)              // 65% progress
    .Height("30")
    .Render()
)
```

### Real-Time Determinate Progress

Update value in response to events:

```html
@(Html.EJS().ProgressBar("downloadProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .Render()
)

<script>
    // Simulate download progress
    var progressBar = document.getElementById('downloadProgress').ej2_instances[0];
    var currentValue = 0;
    
    var interval = setInterval(function() {
        currentValue += Math.random() * 15;
        if (currentValue >= 100) {
            currentValue = 100;
            clearInterval(interval);
        }
        progressBar.value = currentValue;
    }, 500);
</script>
```

### Determinate Scenarios

- **File Download**: 350MB of 1GB downloaded = 35%
- **Database Migration**: 500 of 1000 records migrated = 50%
- **Batch Email**: 250 of 500 emails sent = 50%
- **Image Processing**: 75 of 300 images processed = 25%

## Indeterminate State

Indeterminate state means the progress cannot be calculated. The progress bar shows continuous animation to indicate that work is in progress, but no percentage is shown.

### When to Use Indeterminate State

Use indeterminate state when:
- Progress cannot be estimated (e.g., waiting for response)
- Server processing takes variable time
- Initial data loading before determinate progress starts
- Streaming or real-time data processing

### Indeterminate Progress Example

```csharp
@(Html.EJS().ProgressBar("loadingProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .IsIndeterminate(true)  // Enable indeterminate state
    .Height("4")
    .Render()
)
```

### Indeterminate States for All Types

Linear indeterminate:
```csharp
@(Html.EJS().ProgressBar("linearLoading")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .IsIndeterminate(true)
    .Height("4")
    .Render()
)
```

Circular indeterminate:
```csharp
@(Html.EJS().ProgressBar("circularLoading")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .IsIndeterminate(true)
    .Height("200")
    .Width("200")
    .Render()
)
```

Semi-circular indeterminate:
```csharp
@(Html.EJS().ProgressBar("semicircularLoading")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .IsIndeterminate(true)
    .Height("200")
    .Width("200")
    .Render()
)
```

### Indeterminate Scenarios

- **Page Loading**: Show while page resources load
- **API Call Waiting**: Display while waiting for server response
- **Authentication**: Show during login processing
- **Data Search**: Display while searching database
- **File Upload**: Show while file uploads (before knowing file size)
- **Initial Page Load**: Display while gathering initial data

## Buffer State

Buffer state displays two progress indicators simultaneously:
- **Primary Progress** (via Value): The main progress
- **Secondary Progress** (via SecondaryProgress): Usually shows buffered or cached data

This is commonly used for video streaming (secondary shows buffered video, primary shows played video) or data fetching (secondary shows downloaded data, primary shows processed data).

### Buffer Progress Example

```csharp
@(Html.EJS().ProgressBar("videoBuffer")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(40)              // Played portion (40%)
    .SecondaryProgress(75)  // Buffered portion (75%)
    .Height("30")
    .Render()
)
```

### Circular Buffer Progress

```csharp
@(Html.EJS().ProgressBar("circularBuffer")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(50)              // Primary (inner circle)
    .SecondaryProgress(85)  // Secondary (outer ring)
    .Height("250")
    .Width("250")
    .Render()
)
```

### Buffer Scenarios

- **Video Streaming**: Primary = watched portion, Secondary = downloaded/buffered
- **Data Fetching**: Primary = processed data, Secondary = downloaded data
- **Large File Operations**: Primary = processed bytes, Secondary = read bytes
- **Network Transfers**: Primary = sent bytes, Secondary = validated bytes

### Buffer State Best Practices

- Always set SecondaryProgress >= Value to show secondary as "ahead" of primary
- Use different colors for primary and secondary (customize in customization reference)
- Display progress labels to clarify what each represents
- Combine with tooltips to explain the difference

## Combining States

You can combine progress states for complex scenarios:

### Linear with Secondary Progress and Animation

```csharp
@(Html.EJS().ProgressBar("complexProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .SecondaryProgress(85)
    .Height("30")
    .Animation(new ProgressBarAnimation 
    { 
        Enable = true, 
        Duration = 2000 
    })
    .Render()
)
```

### Transition from Indeterminate to Determinate

Start with indeterminate while determining progress, then switch to determinate:

```html
@(Html.EJS().ProgressBar("transitionProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .IsIndeterminate(true)
    .Height("30")
    .Render()
)

<script>
    var progressBar = document.getElementById('transitionProgress').ej2_instances[0];
    
    // After 2 seconds, switch to determinate
    setTimeout(function() {
        progressBar.isIndeterminate = false;
        progressBar.value = 0;
        
        // Start updating value
        var interval = setInterval(function() {
            progressBar.value += 10;
            if (progressBar.value >= 100) {
                clearInterval(interval);
            }
        }, 500);
    }, 2000);
</script>
```

## Complete Examples

### Example 1: File Upload with Progress

```html
<div>
    <h3>Upload File</h3>
    <input type="file" id="fileInput" />
    <button id="uploadBtn">Upload</button>
    
    @(Html.EJS().ProgressBar("uploadProgress")
        .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
        .Value(0)
        .Height("30")
        .Render()
    )
</div>

<script>
    document.getElementById('uploadBtn').addEventListener('click', function() {
        var progressBar = document.getElementById('uploadProgress').ej2_instances[0];
        var currentValue = 0;
        
        // Simulate upload
        var interval = setInterval(function() {
            currentValue += Math.random() * 20;
            currentValue = Math.min(currentValue, 100);
            progressBar.value = currentValue;
            
            if (currentValue >= 100) {
                clearInterval(interval);
            }
        }, 300);
    });
</script>
```

### Example 2: Multi-Format Progress Display

```html
<div style="margin: 20px;">
    <h3>Processing Tasks</h3>
    
    <div style="margin: 20px 0;">
        <h4>Linear - Determinate</h4>
        @(Html.EJS().ProgressBar("linear")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
            .Value(65)
            .Height("30")
            .Render()
        )
    </div>
    
    <div style="margin: 20px 0;">
        <h4>Circular - Determinate</h4>
        @(Html.EJS().ProgressBar("circular")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(65)
            .Height("200")
            .Width("200")
            .Render()
        )
    </div>
    
    <div style="margin: 20px 0;">
        <h4>Semi-Circular - Indeterminate</h4>
        @(Html.EJS().ProgressBar("semicircular")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .IsIndeterminate(true)
            .Height("200")
            .Width("200")
            .Render()
        )
    </div>
</div>
```

### Example 3: Dashboard with Multiple Indicators

```html
<div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
    <div>
        <h4>CPU Usage</h4>
        @(Html.EJS().ProgressBar("cpu")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(45)
            .Height("150")
            .Width("150")
            .Render()
        )
    </div>
    
    <div>
        <h4>Memory Usage</h4>
        @(Html.EJS().ProgressBar("memory")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(72)
            .Height("150")
            .Width("150")
            .Render()
        )
    </div>
    
    <div>
        <h4>Disk Usage</h4>
        @(Html.EJS().ProgressBar("disk")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(58)
            .Height("150")
            .Width("150")
            .Render()
        )
    </div>
    
    <div>
        <h4>Network Activity</h4>
        @(Html.EJS().ProgressBar("network")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(38)
            .Height("150")
            .Width("150")
            .Render()
        )
    </div>
</div>
```
