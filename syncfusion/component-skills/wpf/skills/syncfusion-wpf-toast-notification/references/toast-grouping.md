# Toast Grouping

## Table of Contents
- [Overview](#overview)
- [Enable Toast Grouping](#enable-toast-grouping)
- [Group Notifications by Group ID](#group-notifications-by-group-id)
- [Customize Group Container Header](#customize-group-container-header)
- [Key Grouping Properties](#key-grouping-properties)
- [Best Practices](#best-practices)

## Overview

Toast grouping allows you to organize related notifications together using a unique **Group ID**, reducing notification clutter and improving user experience when multiple notifications are displayed.

---

## Enable Toast Grouping

To enable grouping of related toast notifications, set the `EnableGroupView` property to `true`:

```csharp
// Enable toast grouping
SfToastNotification.EnableGroupView = true;
```

---

## Group Notifications by Group ID

Use the `GroupName` property in `ToastOptions` to assign a notification to a specific group:

```csharp
SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Window,
    Title = "Microsoft Teams",
    Header = "John",
    Message = "Can we discuss the sprint backlog?",
    GroupName = "Teams"
});

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Window,
    Title = "Microsoft Teams",
    Header = "Sarah",
    Message = "Project deadline has been updated",
    GroupName = "Teams"  // Same group as above
});

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Window,
    Title = "Outlook",
    Header = "Boss",
    Message = "New email received",
    GroupName = "Outlook"  // Different group
});
```

---

## Customize Group Container Header

By default, grouped notifications display "Notification" as the group container header. Use the `GroupContainerHeader` property to customize this text:

```csharp
SfToastNotification.EnableGroupView = true;

// Customize the group container header
SfToastNotification.GroupContainerHeader = "Messages";

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Window,
    Title = "GitHub",
    Header = "Build Pipeline",
    Message = "Build completed successfully",
    GroupName = "GitHub"
});

SfToastNotification.Show(this, new ToastOptions
{
    Mode = ToastMode.Window,
    Title = "GitHub",
    Header = "Deployment",
    Message = "Deployment to production initiated",
    GroupName = "GitHub"
});
```

---

## Key Grouping Properties

| Property | Type | Description |
|----------|------|-------------|
| `GroupName` | string | Assigns a notification to a specific group based on a unique identifier |
| `EnableGroupView` | bool | Enables or disables grouped view for related notifications (default: false) |
| `GroupContainerHeader` | string | Customizes the header text displayed in the group container (default: "Notification") |

---

## Best Practices

- Use meaningful `GroupName` values (e.g., "Teams", "Outlook", "GitHub")
- Enable `EnableGroupView` before showing grouped notifications
- Toasts without a `GroupName` are displayed individually
- Customize `GroupContainerHeader` for better clarity (e.g., "Messages", "Alerts", "Updates")
- Grouping is particularly useful in `Window` mode to organize multiple notifications
