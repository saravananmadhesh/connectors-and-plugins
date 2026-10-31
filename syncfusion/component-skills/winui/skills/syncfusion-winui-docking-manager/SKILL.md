---
name: syncfusion-winui-docking-manager
description: To get a outline about the control features
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion WinUI DockingManager Control

Build Visual Studio-style desktop layouts with the Syncfusion WinUI DockingManager control. Create dockable panes, floating windows, auto-hide panels, tab groups, and document windows. Perfect for productivity applications requiring flexible workspace organization.

## What You'll Learn

This skill covers all major features and patterns for implementing the DockingManager control:

- Initialize and configure the DockingManager
- Manage docking states (docked, floating, auto-hide, document)
- Arrange panes through XAML, code, and drag-and-drop interactions
- Group related panes into tab groups
- Implement auto-hide panes for workspace efficiency
- Integrate with MVVM applications
- Persist and restore layouts
- Handle events and customize appearance

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and NuGet package setup
- Create WinUI 3 application
- Initialize SfDockingManager control
- Add docked panes (left, right, top, bottom)
- Add document panes
- XAML vs C# initialization approaches
- Basic click handlers and events

### Dock States and Pane Management
📄 **Read:** [references/dock-states.md](references/dock-states.md)
- Understanding dock states (Docked, Floating, AutoHide, Document)
- Configure docking direction (Left, Right, Top, Bottom, Fill)
- Transition between states programmatically
- Handle state change events
- Best practices for state management

### Layout Management and Arrangement
📄 **Read:** [references/layout-management.md](references/layout-management.md)
- Place panes declaratively in XAML
- Arrange panes programmatically at runtime
- Drag-and-drop interactions and dock indicators
- Visual feedback during docking operations
- Resize dock regions with splitters
- Calculate optimal layouts

### Tab Groups and Document Tabs
📄 **Read:** [references/tab-groups.md](references/tab-groups.md)
- Group panes into tab groups
- Document tab containers
- Switch between tabs programmatically
- Tab header customization
- Close and add tabs dynamically
- Multi-tab document workspace patterns

### Floating Windows
📄 **Read:** [references/floating-windows.md](references/floating-windows.md)
- Detach panes into floating windows
- Manage multiple floating windows
- Floating window positioning and sizing
- Re-dock floating panes
- Floating window lifecycle and events
- Multi-monitor considerations

### Auto-Hide Panes
📄 **Read:** [references/auto-hide-panels.md](references/auto-hide-panels.md)
- Configure auto-hide panes
- Expand and collapse auto-hidden panels
- Auto-hide animation behavior
- Keyboard shortcuts for auto-hide panes
- Auto-hide toggle modes
- Performance optimization with auto-hide

### Advanced Patterns and Customization
📄 **Read:** [references/advanced-patterns.md](references/advanced-patterns.md)
- MVVM integration with ItemsSource binding
- Persist layout state to storage
- Load and restore saved layouts
- Customize pane appearance and styles
- Event handling patterns
- Performance optimization tips
- Troubleshooting common issues

## Quick Start Example

Here's a minimal example to get started with DockingManager:

```xaml
<Window
    x:Class="DockingDemo.MainWindow"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:docking="using:Syncfusion.UI.Xaml.Docking"
    Title="DockingManager Demo"
    Width="1200"
    Height="800">

    <Grid>
        <docking:SfDockingManager x:Name="dockingManager">

            <!-- Toolbox on the left -->
            <docking:DockPane Header="Toolbox"
                              DockDirection="Left"
                              DockState="Docked"
                              Width="200">
                <TextBlock Text="Tools Panel"
                           Padding="10"
                           VerticalAlignment="Top"/>
            </docking:DockPane>

            <!-- Properties on the right -->
            <docking:DockPane Header="Properties"
                              DockDirection="Right"
                              DockState="Docked"
                              Width="250">
                <TextBlock Text="Properties Panel"
                           Padding="10"
                           VerticalAlignment="Top"/>
            </docking:DockPane>

            <!-- Main document editor -->
            <docking:DockPane Header="MainWindow.xaml"
                              DockState="Document">
                <TextBox AcceptsReturn="True"
                         Text="Main document editor..."
                         Padding="10"/>
            </docking:DockPane>

        </docking:SfDockingManager>
    </Grid>

</Window>
```

## Common Patterns

**Create Docked Pane:** Add a DockPane with DockDirection and width settings.

**Change Pane State:** Set `DockState` to `Floating`, `AutoHide`, or `Document`.

**Add Tab Group:** Multiple panes with matching DockDirection automatically group into tabs.

## Key Properties

| Property | Type | Purpose |
|----------|------|---------|
| `Header` | string | Display name for the pane |
| `DockDirection` | DockDirection | Where the pane docks (Left, Right, Top, Bottom, Fill) |
| `DockState` | DockState | Current state (Docked, Floating, AutoHide, Document) |
| `Width` | double | Width when docked horizontally |
| `Height` | double | Height when docked vertically |
| `Content` | UIElement | Child content of the pane |
| `IsAutoHideVisible` | bool | Visibility of auto-hidden pane |

## Common Use Cases

- **IDE/Editor:** Visual Studio-style layouts with toolbox, properties, and document panels
- **Data Analysis:** Multi-window view with floating windows for charts and tables
- **Dashboard:** Collapsible auto-hide panels to maximize content space
- **Media Player:** Dockable library and playlist panels with user-arrangement

## Next Steps

1. Start with [getting-started.md](references/getting-started.md) to install and initialize the control
2. Explore [dock-states.md](references/dock-states.md) to understand pane states
3. Review [layout-management.md](references/layout-management.md) for arrangement strategies
4. Check [advanced-patterns.md](references/advanced-patterns.md) for MVVM and persistence patterns

---

**Need help?** Refer to the specific reference guide based on your task:
- Setting up a new project? → Getting Started
- Changing pane states? → Dock States
- Arranging panels? → Layout Management
- Working with tabs? → Tab Groups
- Using floating windows? → Floating Windows
- Hiding unused panels? → Auto-Hide Panes
- Building enterprise apps? → Advanced Patterns
