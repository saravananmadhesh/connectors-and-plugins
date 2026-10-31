---
name: syncfusion-aspnetmvc-progress-bar
description: Create and configure Syncfusion Progress Bar components for ASP.NET MVC applications. Use this skill whenever a user needs to display progress indicators, build file uploads with progress visualization, show data loading states, or implement task completion tracking using linear, circular, or semi-circular progress bars with animations, custom ranges, and interactive states.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "UI Indicators"
---

# Implementing Progress Bar

The Syncfusion ASP.NET MVC Progress Bar is an interactive control that displays task progress with customizable visual representations. It supports multiple shapes, progress states, animations, and real-time value updates.

## When to Use This Skill

Use this skill when you need to:
- Display file upload or download progress
- Show data loading states (determinate or indeterminate)
- Visualize task completion percentage
- Build multi-step process indicators
- Create circular progress indicators with annotations
- Add animation effects to progress visualizations
- Implement event handlers for progress completion
- Display buffer/secondary progress for streaming operations
- Ensure accessibility in progress indicators

## Component Overview

The Progress Bar component provides:

- **Types**: Linear (default), Circular, and Semi-circular shapes
- **States**: Determinate (known progress), Indeterminate (unknown progress), Buffer (secondary progress)
- **Customization**: Segments, thickness, radius, colors, and corner radius
- **Features**: Annotations, labels, tooltips, animation, RTL support
- **Events**: ValueChanged, ProgressCompleted
- **Accessibility**: WCAG 2.2 AA compliant with full keyboard and screen reader support

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and NuGet package setup
- Namespace configuration in Web.config
- Script and CSS resource inclusion
- Basic linear progress bar implementation
- Setting initial progress values
- Render and initialization

### Types and Progress Modes
📄 **Read:** [references/types-and-modes.md](references/types-and-modes.md)
- Linear progress bar visualization
- Circular progress bar implementation
- Semi-circular progress bar
- Determinate state for known progress
- Indeterminate state for unknown progress
- Buffer state for secondary progress
- Combining multiple states

### Customization and Styling
📄 **Read:** [references/customization.md](references/customization.md)
- Segment division (SegmentCount property)
- Track and progress thickness
- Radius and corner radius configuration
- Inner radius for circular variants
- Progress and track color customization
- Background color styling
- CSS-based theme customization

### Annotations and Labels
📄 **Read:** [references/annotations-labels.md](references/annotations-labels.md)
- Adding annotations to circular progress
- Content property for custom HTML in center
- ShowProgressValue property for percentage display
- Label positioning and styling
- Adding control buttons and custom content
- Custom text and image support

### Tooltips
📄 **Read:** [references/tooltips.md](references/tooltips.md)
- Enabling and configuring tooltips
- ShowTooltipOnHover for dynamic tooltip display
- Format property for custom tooltip text
- Tooltip styling (Fill, Border, TextStyle)
- Tooltip positioning and visibility

### Events and Interaction
📄 **Read:** [references/events-interaction.md](references/events-interaction.md)
- ValueChanged event handling
- ProgressCompleted event for completion workflows
- Real-time value updates and monitoring
- Event-driven animations and transitions
- Handling indeterminate to determinate transitions

### Accessibility
📄 **Read:** [references/accessibility.md](references/accessibility.md)
- WCAG 2.2 AA compliance
- Screen reader and keyboard navigation support
- ARIA attributes implementation
- Color contrast and visual accessibility
- Mobile device accessibility
- RTL (Right-to-Left) language support

### API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)
- Complete ProgressBar class API documentation
- All properties with types and defaults
- ProgressBarAnimation, ProgressBarTooltipSettings, ProgressBarAnnotationSettings configurations
- ProgressBarRangeColor and ProgressBarFont styling options
- All events (Lifecycle, Progress, Interaction, Render events)
- Enumerations (ProgressType, ModeType, CornerType, ProgressTheme)
- Related classes and common usage patterns
- Namespace and assembly information

## Quick Start Example

```csharp
// Controller
public ActionResult Index()
{
    return View();
}
```

```html
<!-- View -->
@(Html.EJS().ProgressBar("linearProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(60)
    .Height("30")
    .Render()
)

@(Html.EJS().ProgressBar("circularProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(75)
    .Height("250")
    .Width("250")
    .Render()
)
```

## Common Patterns

### Pattern 1: File Upload Progress
```csharp
@(Html.EJS().ProgressBar("uploadProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(0)
    .Height("30")
    .Animation(new ProgressBarAnimation { Enable = true, Duration = 2000 })
    .TooltipSettings(tp=> tp.Enable(true).Format("${value}% uploaded"))
    .Render()
)
```

### Pattern 2: Data Loading State
```csharp
@(Html.EJS().ProgressBar("loadingProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .IsIndeterminate(true)
    .Height("4")
    .Render()
)
```

### Pattern 3: Circular Completion Indicator
```csharp
@(Html.EJS().ProgressBar("taskProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Circular)
    .Value(100)
    .Height("250")
    .Width("250")
    .ProgressThickness(10)
    .TrackThickness(10)
    .Annotations(an => { an.Content("<div>Completed</div>").Add(); })
    .Render()
)
```

### Pattern 4: Multi-Step Process
```csharp
@(Html.EJS().ProgressBar("processProgress")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .SegmentCount(4)
    .Value(50)
    .Height("30")
    .Render()
)
```

## Key Props

| Property | Type | Purpose |
|----------|------|---------|
| `Type` | ProgressType | Linear, Circular, or SemiCircle shape |
| `Value` | double | Current progress value (0-100) |
| `IsIndeterminate` | bool | Unknown progress state |
| `SecondaryProgress` | double | Buffer/secondary progress value |
| `TrackThickness` | double | Background track width |
| `ProgressThickness` | double | Progress bar width |
| `SegmentCount` | int | Number of progress segments |
| `Animation` | ProgressBarAnimation | Enable smooth animations |
| `TooltipSettings` | ProgressBarTooltipSettings | Tooltip configuration |
| `ShowProgressValue` | bool | Display percentage label |
| `Annotation` | ProgressBarAnnotation | Center content for circular type |

## Decision Tree: Choosing Progress Bar Type and State

**What is the user's requirement?**

1. **Display file upload/download progress** → Linear type, Determinate state, Value updates
2. **Show unknown data loading state** → Linear type, Indeterminate state
3. **Display streaming with buffer** → Linear type, Buffer state, SecondaryProgress
4. **Show circular completion indicator** → Circular type, with Annotation for completion message
5. **Multi-step process visualization** → Linear type, SegmentCount property
6. **Circular loading animation** → Circular type, IsIndeterminate = true
7. **Combination: filtering + primary progress** → Linear type, SecondaryProgress for filtering

## Setup Instructions

### 1. Install NuGet Package
```powershell
Install-Package Syncfusion.EJ2.MVC5 -Version 23.2.36
```

### 2. Configure Web.config
Add namespace to `~/Views/Web.config`:
```xml
<namespaces>
    <add namespace="Syncfusion.EJ2"/>
</namespaces>
```

### 3. Include Scripts and Styles
In `~/Views/Shared/_Layout.cshtml`:
```html
<head>
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/23.2.36/material.css" />
    <script src="https://cdn.syncfusion.com/ej2/23.2.36/dist/ej2.min.js"></script>
</head>
<body>
    @RenderBody()
    @Html.EJS().ScriptManager()
</body>
```

### 4. Create Progress Bar
```html
@(Html.EJS().ProgressBar("progressBar")
    .Type(Syncfusion.EJ2.ProgressBar.ProgressType.Linear)
    .Value(50)
    .Render()
)
```

## Common Integration Scenarios

### Scenario 1: File Upload with Progress
Combine Progress Bar with file input to show upload percentage in real-time.

### Scenario 2: Data Dashboard Loading
Show indeterminate progress while data loads, then display determinate progress for individual metrics.

### Scenario 3: Task Completion Workflow
Use segmented progress bar for multi-step forms or workflows.

### Scenario 4: Background Process Monitoring
Display circular progress in a corner or modal while background tasks execute.

### Scenario 5: Performance Metrics Dashboard
Show multiple circular progress indicators for system metrics (CPU, Memory, Disk).

## Troubleshooting

**Progress Bar not rendering?**
- Verify NuGet package installed: `Syncfusion.EJ2.MVC5`
- Check namespace in Web.config
- Ensure script and CSS loaded (check browser console)
- Verify script manager registered at end of body

**Value not updating?**
- Ensure Value property is a number between 0-100
- Check browser console for errors
- Verify event handler correctly updates Value

**Animation not smooth?**
- Enable Animation property explicitly
- Adjust Duration property for desired speed
- Verify CSS loaded correctly for animation support

**Tooltip not showing?**
- Set Enable = true in TooltipSettings
- Verify ShowTooltipOnHover property
- Check Format property syntax

## Next Steps

1. Read **[getting-started.md](references/getting-started.md)** for installation and basic setup
2. Choose your progress bar type in **[types-and-modes.md](references/types-and-modes.md)**
3. Customize appearance in **[customization.md](references/customization.md)**
4. Add annotations if using circular in **[annotations-labels.md](references/annotations-labels.md)**
5. Configure tooltips in **[tooltips.md](references/tooltips.md)**
6. Handle events in **[events-interaction.md](references/events-interaction.md)**
7. Ensure accessibility in **[accessibility.md](references/accessibility.md)**
