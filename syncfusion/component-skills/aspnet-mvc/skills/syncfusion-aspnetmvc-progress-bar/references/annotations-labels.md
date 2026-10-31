# Annotations and Labels

## Table of Contents
- [Annotations Overview](#annotations-overview)
  - [Annotation Basics](#annotation-basics)
- [Content Property](#content-property)
  - [Simple Text Annotation](#simple-text-annotation)
  - [Styled Text Annotation](#styled-text-annotation)
  - [Multi-Line Annotation](#multi-line-annotation)
- [ShowProgressValue Property](#showprogressvalue-property)
  - [Show Progress Value on Linear Bar](#show-progress-value-on-linear-bar)
  - [Show Progress Value on Circular Bar](#show-progress-value-on-circular-bar)
  - [Show Progress Value on Semi-Circular Bar](#show-progress-value-on-semi-circular-bar)
  - [Custom Value Format](#custom-value-format)
- [Label Positioning](#label-positioning)
  - [Center Label](#center-label)
  - [Top Label](#top-label)
  - [Bottom Label](#bottom-label)
- [Adding Control Buttons](#adding-control-buttons)
  - [Play/Pause Button](#playpause-button)
  - [Start/Stop Button](#startstop-button)
- [Custom Content](#custom-content)
  - [Task Progress with Details](#task-progress-with-details)
  - [Download Progress Card](#download-progress-card)
  - [Status Badge](#status-badge)
- [Text and Images](#text-and-images)
  - [Icon with Label](#icon-with-label)
  - [Image in Center](#image-in-center)
  - [Multi-Line Content with Styling](#multi-line-content-with-styling)
- [Complete Examples](#complete-examples)
  - [Example 1: Upload Progress with Details](#example-1-upload-progress-with-details)
  - [Example 2: Download Manager with Multiple Progress](#example-2-download-manager-with-multiple-progress)
  - [Example 3: Task Completion Dashboard](#example-3-task-completion-dashboard)

## Annotations Overview

Annotations allow you to add custom content to the center of circular and semi-circular progress bars. This is useful for displaying additional information like status text, percentage, or interactive controls.

Annotations are only available for **Circular** and **SemiCircle** progress bar types. They do not work with Linear progress bars.

### Annotation Basics

```csharp
@(Html.EJS().ProgressBar("annotatedProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(75)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content("<div>Processing...</div>").Add(); })
    .Render()
)
```

The `Annotation` object contains the `Content` property which accepts HTML string that will be displayed in the center of the circular progress bar.

## Content Property

The `Content` property of the annotation object accepts HTML strings. You can include any HTML elements to create rich center content.

### Simple Text Annotation

```csharp
@(Html.EJS().ProgressBar("textAnnotation")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(60)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content("<div>60% Complete</div>").Add(); })
    .Render()
)
```

### Styled Text Annotation

```csharp
@(Html.EJS().ProgressBar("styledAnnotation")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(75)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content("<div style='font-size: 28px; font-weight: bold; color: #0078d4;'>75%</div>").Add(); })
    .Render()
)
```

### Multi-Line Annotation

```csharp
@(Html.EJS().ProgressBar("multilineAnnotation")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(50)
    .Height("250")
    .Width("250")
     .Annotations(an => { an.Content(@"
         <div style='text-align: center;'>
             <div style='font-size: 24px; font-weight: bold; color: #333;'>50%</div>
             <div style='font-size: 12px; color: #666; margin-top: 5px;'>Loading...</div>
         </div>").Add(); })
    .Render()
)
```

## ShowProgressValue Property

The `ShowProgressValue` property displays the percentage value directly on the progress bar without needing annotations. It works for all progress bar types (Linear, Circular, SemiCircle).

### Show Progress Value on Linear Bar

```csharp
@(Html.EJS().ProgressBar("linearValue")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(65)
    .ShowProgressValue(true)  //Display percentage
    .Height("30")
    .Render()
)
```

### Show Progress Value on Circular Bar

```csharp
@(Html.EJS().ProgressBar("circularValue")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(75)
    .ShowProgressValue(true)  //Display percentage in center
    .Height("250")
    .Width("250")
    .Render()
)
```

### Show Progress Value on Semi-Circular Bar

```csharp
@(Html.EJS().ProgressBar("semicircularValue")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(55).StartAngle(270).EndAngle(90)
    .ShowProgressValue(true)  //Display percentage
    .Height("250")
    .Width("250")
    .Render()
)
```

### Custom Value Format

To customize how the value is displayed, use annotations with custom formatting:

```csharp
@(Html.EJS().ProgressBar("customFormat")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(68)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content("<div style='font-size: 32px; color: #0078d4;'>68%</div><div style='font-size: 12px; color: #888;'>Nearly Complete</div>").Add(); })
    .Render()
)
```

## Label Positioning

When using annotations, position labels strategically:

### Center Label

```csharp
@(Html.EJS().ProgressBar("centerLabel")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(80)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content("< div style = 'text-align: center; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);' > 80 %</ div >").Add(); })
    .Render()
)
```

### Top Label

```csharp
@(Html.EJS().ProgressBar("topLabel")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(70)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content("<div style='text-align: center; position: absolute; top: 20%; left: 50%; transform: translate(-50%, -50%);'>Processing</div>").Add(); })
    .Render()
)
```

### Bottom Label

```csharp
@(Html.EJS().ProgressBar("bottomLabel")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(60)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content("<div style='text-align: center; position: absolute; bottom: 20%; left: 50%; transform: translate(-50%, 50%);'>60% Done</div>").Add(); })
    .Render()
)
```

## Adding Control Buttons

Add interactive buttons to the center of circular progress bars for controlling the progress:

### Play/Pause Button

```csharp
@(Html.EJS().ProgressBar("playPauseProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(45)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content(@"
        <div style='text-align: center;'>
            <div style='font-size: 32px; color: #0078d4; margin-bottom: 10px;'>45%</div>
            <button id='playPauseBtn' style='padding: 8px 16px; background: #0078d4; color: white; border: none; border-radius: 4px; cursor: pointer;'>Play</button>
        </div>").Add(); })
    .Render()
)

<script>
    document.getElementById('playPauseBtn').addEventListener('click', function() {
        var btn = this;
        var progressBar = document.getElementById('playPauseProgress').ej2_instances[0];
        
        if (btn.textContent === 'Play') {
            btn.textContent = 'Pause';
            // Start animation
            var interval = setInterval(function() {
                if (progressBar.value < 100) {
                    progressBar.value += 5;
                } else {
                    clearInterval(interval);
                }
            }, 500);
        } else {
            btn.textContent = 'Play';
            // Stop animation (would need to track interval id)
        }
    });
</script>
```

### Start/Stop Button

```csharp
@(Html.EJS().ProgressBar("startStopProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .IsIndeterminate(true)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content(@"
        <div style='text-align: center;'>
            <div style='font-size: 14px; color: #666; margin-bottom: 10px;'>Processing...</div>
            <button id='startStopBtn' style='padding: 8px 16px; background: #f44336; color: white; border: none; border-radius: 4px; cursor: pointer;'>Stop</button>
        </div>").Add(); })
    .Render()
)

<script>
    document.getElementById('startStopBtn').addEventListener('click', function() {
        var progressBar = document.getElementById('startStopProgress').ej2_instances[0];
        progressBar.isIndeterminate = !progressBar.isIndeterminate;
        this.textContent = progressBar.isIndeterminate ? 'Stop' : 'Start';
    });
</script>
```

## Custom Content

Add any HTML content to the progress bar center:

### Task Progress with Details

```csharp
@(Html.EJS().ProgressBar("taskDetails")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(65)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content(@"
        <div style='text-align: center; line-height: 1.6;'>
            <div style='font-size: 28px; font-weight: bold; color: #0078d4;'>65%</div>
            <div style='font-size: 12px; color: #666; margin: 5px 0;'>Uploading Files</div>
            <div style='font-size: 11px; color: #999;'>325MB / 500MB</div>
        </div>").Add(); })
    .Render()
)
```

### Download Progress Card

```csharp
@(Html.EJS().ProgressBar("downloadCard")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(72)
    .Height("250")
    .Width("250")
    .InnerRadius("70%")
    .Annotations(an => { an.Content(@"
         <div style='text-align: center;'>
             <div style='font-size: 40px; color: #4caf50;'>↓</div>
             <div style='font-size: 14px; font-weight: bold; color: #333; margin: 5px 0;'>72%</div>
             <div style='font-size: 11px; color: #666;'>360 MB/s</div>
             <div style='font-size: 11px; color: #999; margin-top: 5px;'>4.3 MB left</div>
         </div>").Add(); })
    .Render()
)
```

### Status Badge

```csharp
@(Html.EJS().ProgressBar("statusBadge")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(100)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content(@"
         <div style='text-align: center;'>
             <div style='font-size: 48px; color: #4caf50;'>✓</div>
             <div style='font-size: 14px; font-weight: bold; color: #4caf50; margin-top: 10px;'>Completed</div>
         </div>").Add(); })
    .Render()
)
```

## Text and Images

Include text and images in annotations:

### Icon with Label

```csharp
@(Html.EJS().ProgressBar("iconLabel")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(50)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content(@"
        <div style='text-align: center;'>
            <div style='font-size: 40px;'>⚙️</div>
            <div style='font-size: 12px; color: #666; margin-top: 8px;'>Configuring...</div>
        </div>").Add(); })
    .Render()
)
```

### Image in Center

```csharp
@(Html.EJS().ProgressBar("imageProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(45)
    .Height("250")
    .Width("250")
    .Annotations(an => { an.Content(@"
        <div style='text-align: center;'>
            <img src='/images/loading.gif' alt='Loading' style='width: 60px; height: 60px; margin-bottom: 10px;' />
            <div style='font-size: 12px; color: #666;'>45% Complete</div>
        </div>").Add(); })
    .Render()
)
```

### Multi-Line Content with Styling

```csharp
@(Html.EJS().ProgressBar("richContent")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(82)
    .Height("300")
    .Width("300")
    .InnerRadius("75%")
    .Annotations(an => { an.Content(@"
        <div style='text-align: center; padding: 20px;'>
            <div style='font-size: 36px; font-weight: bold; color: #0078d4; line-height: 1;'>82<span style='font-size: 20px;'>%</span></div>
            <div style='font-size: 13px; color: #666; margin: 8px 0;'>Project Progress</div>
            <div style='font-size: 11px; color: #999;'>Est. completion: 2 days</div>
            <div style='margin-top: 10px; padding: 8px; background: #f5f5f5; border-radius: 4px; font-size: 10px; color: #555;'>
                Design: ✓ Development: ⏳ Testing: ◯
            </div>
        </div>").Add(); })
    .Render()
)
```

## Complete Examples

### Example 1: Upload Progress with Details

```html
<div style="margin: 20px; background: #f9f9f9; padding: 20px; border-radius: 8px;">
    <h3>File Upload Status</h3>
    
    @(Html.EJS().ProgressBar("uploadStatus")
        .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
        .Value(0)
        .Height("250")
        .Width("250")
        .Annotations(an => { an.Content(@"
            <div id='uploadContent' style='text-align: center;'>
                <div style='font-size: 12px; color: #666;'>Ready to upload</div>
            </div>").Add(); })
        .Render()
    )
    
    <input type="file" id="fileInput" style="margin-top: 20px;" />
    <button id="uploadBtn" style="padding: 8px 16px; background: #0078d4; color: white; border: none; border-radius: 4px; cursor: pointer; margin-left: 10px;">Start Upload</button>
</div>

<script>
    document.getElementById('uploadBtn').addEventListener('click', function() {
        var progressBar = document.getElementById('uploadStatus').ej2_instances[0];
        var contentDiv = document.getElementById('uploadContent');
        var currentValue = 0;
        
        var interval = setInterval(function() {
            currentValue += Math.random() * 20;
            currentValue = Math.min(currentValue, 100);
            progressBar.value = currentValue;
            
            // Update content
            if (currentValue < 30) {
                contentDiv.innerHTML = '<div style="font-size: 24px; font-weight: bold; color: #0078d4;">0%</div><div style="font-size: 12px; color: #666; margin-top: 5px;">Initializing...</div>';
            } else if (currentValue < 70) {
                contentDiv.innerHTML = '<div style="font-size: 24px; font-weight: bold; color: #0078d4;">' + Math.round(currentValue) + '%</div><div style="font-size: 12px; color: #666; margin-top: 5px;">Uploading...</div>';
            } else {
                contentDiv.innerHTML = '<div style="font-size: 24px; font-weight: bold; color: #4caf50;">' + Math.round(currentValue) + '%</div><div style="font-size: 12px; color: #666; margin-top: 5px;">Finalizing...</div>';
            }
            
            if (currentValue >= 100) {
                clearInterval(interval);
                contentDiv.innerHTML = '<div style="font-size: 32px; color: #4caf50; margin-bottom: 10px;">✓</div><div style="font-size: 14px; font-weight: bold; color: #4caf50;">Upload Complete</div>';
            }
        }, 500);
    });
</script>
```

### Example 2: Download Manager with Multiple Progress

```html
<div style="margin: 20px;">
    <h3>Download Manager</h3>
    
    <div style="display: flex; gap: 20px; flex-wrap: wrap;">
        <!-- File 1 -->
        <div>
            <h4>Document.pdf</h4>
            @(Html.EJS().ProgressBar("download1")
                .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
                .Value(85)
                .Height("200")
                .Width("200")
                .Annotations(an => { an.Content(@"
                    <div style='text-align: center;'>
                        <div style='font-size: 28px; font-weight: bold; color: #0078d4;'>85%</div>
                        <div style='font-size: 11px; color: #666; margin-top: 5px;'>42 MB/s</div>
                    </div>").Add(); })
                .Render()
            )
        </div>
        
        <!-- File 2 -->
        <div>
            <h4>Image.zip</h4>
            @(Html.EJS().ProgressBar("download2")
                .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
                .Value(45)
                .Height("200")
                .Width("200")
                .Annotations(an => { an.Content(@"
                     <div style='text-align: center;'>
                         <div style='font-size: 28px; font-weight: bold; color: #0078d4;'>45%</div>
                         <div style='font-size: 11px; color: #666; margin-top: 5px;'>35 MB/s</div>
                     </div>").Add(); })
                .Render()
            )
        </div>
        
        <!-- File 3 -->
        <div>
            <h4>Video.mp4</h4>
            @(Html.EJS().ProgressBar("download3")
                .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
                .Value(20)
                .Height("200")
                .Width("200")
                .Annotations(an => { an.Content(@"
                    <div style='text-align: center;'>
                        <div style='font-size: 28px; font-weight: bold; color: #0078d4;'>20%</div>
                        <div style='font-size: 11px; color: #666; margin-top: 5px;'>28 MB/s</div>
                    </div>").Add(); })
                .Render()
            )
        </div>
    </div>
</div>
```

### Example 3: Task Completion Dashboard

```html
<div style="margin: 20px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;">
    
    <!-- Analysis -->
    <div style="text-align: center;">
        <h4>Analysis</h4>
        @(Html.EJS().ProgressBar("task1")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(100)
            .Height("180")
            .Width("180")
            .Annotations(an => { an.Content(@"<div style='font-size: 32px; color: #4caf50;'>✓</div>").Add(); })
            .Render()
        )
        <p style="color: #4caf50; font-weight: bold;">Complete</p>
    </div>
    
    <!-- Development -->
    <div style="text-align: center;">
        <h4>Development</h4>
        @(Html.EJS().ProgressBar("task2")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(72)
            .Height("180")
            .Width("180")
            .Annotations(an => { an.Content(@"<div style='font-size: 24px; font-weight: bold; color: #0078d4;'>72%</div>").Add(); })
            .Render()
        )
        <p style="color: #0078d4; font-weight: bold;">In Progress</p>
    </div>
    
    <!-- Testing -->
    <div style="text-align: center;">
        <h4>Testing</h4>
        @(Html.EJS().ProgressBar("task3")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(35)
            .Height("180")
            .Width("180")
            .Annotations(an => { an.Content(@"<div style='font-size: 24px; font-weight: bold; color: #ff9800;'>35%</div>").Add(); })
            .Render()
        )
        <p style="color: #ff9800; font-weight: bold;">In Progress</p>
    </div>
    
    <!-- Deployment -->
    <div style="text-align: center;">
        <h4>Deployment</h4>
        @(Html.EJS().ProgressBar("task4")
            .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
            .Value(0)
            .Height("180")
            .Width("180")
            .Annotations(an => { an.Content(@"<div style='font-size: 18px; color: #ccc;'>Pending</div>").Add(); })
            .Render()
        )
        <p style="color: #ccc; font-weight: bold;">Waiting</p>
    </div>
    
</div>
```
