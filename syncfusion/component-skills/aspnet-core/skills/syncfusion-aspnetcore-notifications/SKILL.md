---
name: syncfusion-aspnetcore-notifications
description: Implement Syncfusion ASP.NET Core notification components including Toast, Message, and Skeleton. Use this skill when building toast notifications, brief auto-dismissing alerts, snackbar messages, contextual Message components with severity levels, or Skeleton loading placeholders with shimmer animations. This skill covers positioning, action buttons, severity variants, animation effects, and shape options.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Notifications"
---

# Implementing Syncfusion ASP.NET Core Notifications

## Toast

The Toast component displays brief, auto-dismissing notification messages on screen. It supports positioning, animations, action buttons, progress bars, templates, timeout control, and accessibility—covering simple alerts to rich notification UIs.

**Do NOT skip this skill if users mention:** notifications, alerts, snackbar, brief messages, dismiss popup, toast utility, progress notification, action button popup.

---

### Component Overview

#### Key Capabilities

| Feature | Description |
|---------|-------------|
| **Types / cssClass** | Predefined styles: `e-toast-success`, `e-toast-info`, `e-toast-warning`, `e-toast-danger` |
| **Position** | X: Left/Center/Right, Y: Top/Bottom or custom pixel/percent values |
| **Timeout** | Auto-dismiss via `timeOut`; `extendedTimeout` for hover delay; `0` for static toast |
| **Progress Bar** | Visual countdown bar with `showProgressBar`; direction via `progressDirection` |
| **Action Buttons** | Add button models with click handlers via `buttons` / `e-toast-buttonmodelprops` |
| **Templates** | Full custom HTML via `template` property or `<e-content-template>` tag |
| **Animation** | Custom show/hide animation effects via `animation` settings |
| **Close Button** | Manual close via `showCloseButton` |
| **Multiple Toasts** | Separate toast instances per position; `newestOnTop` ordering |
| **Toast Utility** | `ToastUtility.show()` for zero-markup quick toasts |
| **Accessibility** | WAI-ARIA `role="alert"`, WCAG 2.2 AA, Section 508, RTL support |

#### NuGet Package

```
Install-Package Syncfusion.EJ2.AspNet.Core
```

#### Setup (one-time)

**`~/Pages/_ViewImports.cshtml`**
```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**`~/Pages/Shared/_Layout.cshtml`** — inside `<head>`:
```cshtml
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
```
And before `</body>`:
```cshtml
<ejs-scripts></ejs-scripts>
```

---

### Documentation & Navigation Guide

#### 📖 Getting Started
📄 **Read:** [references/getting-started.md](references/toast-getting-started.md)
- Installation and NuGet setup
- Tag helper registration
- Basic toast with title and content
- Triggering toast via JavaScript `show()` method
- First working example

#### 📖 Configuration & Options
📄 **Read:** [references/configuration.md](references/toast-configuration.md)
- Title and content setup
- Custom target container
- Close button (`showCloseButton`)
- Progress bar (`showProgressBar`, `progressDirection`)
- Newest-on-top ordering (`newestOnTop`)
- Width and height customization
- HTML sanitizer (`enableHtmlSanitizer`)

#### 📖 Position & Layout
📄 **Read:** [references/position.md](references/toast-position.md)
- Predefined X/Y positions (Left, Center, Right / Top, Bottom)
- Custom pixel or percentage positions
- Multiple toasts in different positions
- Full-width toast with `width="100%"`

#### 📖 Timeout & Lifecycle
📄 **Read:** [references/timeout.md](references/toast-timeout.md)
- Auto-dismiss with `timeOut` (milliseconds)
- Extended hover timeout (`extendedTimeout`)
- Static (persistent) toast with `timeOut="0"`
- Closing toast on click/tap
- Restricting maximum visible toasts
- Preventing duplicate toasts

#### 📖 Action Buttons
📄 **Read:** [references/action-buttons.md](references/toast-action-buttons.md)
- Adding buttons with `e-toast-buttonmodelprops`
- Button click handlers
- Dismissing toast from a button click

#### 📖 Templates & Animation
📄 **Read:** [references/templates-animation.md](references/toast-templates-animation.md)
- Static HTML template via `template` property
- Dynamic content template with `<e-content-template>`
- Changing templates dynamically on `show()`
- Custom show/hide animation effects
- Playing audio before toast opens

#### 📖 Toast Types & Styling
📄 **Read:** [references/types-and-styling.md](references/toast-types-and-styling.md)
- Predefined types using `cssClass` (success, info, warning, danger)
- CSS customization for title, content, icon, background
- `ToastUtility.show()` with predefined types
- `ToastUtility.show()` with full ToastModel
- Mobile swipe-close prevention

#### 📖 Accessibility
📄 **Read:** [references/accessibility.md](references/toast-accessibility.md)
- WAI-ARIA role="alert"
- WCAG 2.2 AA compliance
- Section 508 support
- RTL rendering (`enableRtl`)
- Screen reader compatibility

#### 📖 API Reference
📄 **Read:** [references/api.md](references/toast-api.md)
- All properties with types and defaults
- All events (BeforeOpen, Open, Close, BeforeClose, Click, Created, Destroyed, BeforeSanitizeHtml)
- Sub-component types (ToastPosition, ToastAnimationSettings, ToastButtonModelProp)

---

### Quick Start Example

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-toast id="toast_default"
           title="Friend Request"
           content="Matt sent you a friend request."
           showCloseButton="true"
           showProgressBar="true"
           timeOut="5000">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    setTimeout(function () {
        var toast = document.getElementById('toast_default').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 500);

    document.getElementById('showBtn').addEventListener('click', function () {
        var toast = document.getElementById('toast_default').ej2_instances[0];
        toast.show();
    });
</script>
```

---

### Common Patterns

#### Pattern 1: Show Typed Notification (Success / Error / Warning / Info)
```cshtml
<ejs-toast id="typed_toast">
    <e-toast-position X="Right" Y="Top"></e-toast-position>
</ejs-toast>

<script>
    var toasts = [
        { title: 'Success !', content: 'Record saved successfully.', cssClass: 'e-toast-success' },
        { title: 'Error !',   content: 'Failed to save record.',    cssClass: 'e-toast-danger'  },
        { title: 'Warning !', content: 'Unsaved changes present.',  cssClass: 'e-toast-warning' },
        { title: 'Info !',    content: 'Session expires in 5 min.', cssClass: 'e-toast-info'    }
    ];
    function showToast(index) {
        var toast = document.getElementById('typed_toast').ej2_instances[0];
        toast.target = document.body;
        toast.show(toasts[index]);
    }
</script>
```

#### Pattern 2: Toast Utility (Zero Markup)
```javascript
// Predefined type — no container element needed
ejs.notifications.ToastUtility.show('Record saved successfully', 'Success', 5000);

// With full model
ejs.notifications.ToastUtility.show({
    title: 'Upload Complete',
    content: 'Your file has been uploaded.',
    timeOut: 5000,
    position: { X: 'Right', Y: 'Bottom' },
    showCloseButton: true
});
```

#### Pattern 3: Action Buttons with Close Handler
```cshtml
<ejs-toast id="action_toast" title="New Message" timeOut="0">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
    <e-toast-buttonmodelprops>
        <e-toast-buttonmodelprop model="ViewBag.AcceptBtn" click="onAccept"></e-toast-buttonmodelprop>
        <e-toast-buttonmodelprop model="ViewBag.DismissBtn"></e-toast-buttonmodelprop>
    </e-toast-buttonmodelprops>
</ejs-toast>

<script>
    function onAccept(e) {
        var toastEle = ej.base.closest(e.target, '.e-toast');
        document.getElementById('action_toast').ej2_instances[0].hide(toastEle);
    }
</script>
```
```csharp
// Controller
ViewBag.AcceptBtn  = new { content = "Accept" };
ViewBag.DismissBtn = new { content = "Dismiss" };
```

#### Pattern 4: Prevent Duplicate Toast
```cshtml
<ejs-toast id="dup_toast" beforeOpen="onBeforeOpen" close="onClose"
           title="Alert" content="Network issue detected.">
    <e-toast-position X="Center" Y="Top"></e-toast-position>
</ejs-toast>

<script>
    var isOpen = false;
    function onBeforeOpen(e) {
        if (isOpen) { e.cancel = true; }
        else { isOpen = true; }
    }
    function onClose() { isOpen = false; }
</script>
```

#### Pattern 5: Restrict Maximum Toasts
```cshtml
<ejs-toast id="max_toast" beforeOpen="onBeforeOpen"
           title="Notification" content="New item added.">
    <e-toast-position X="Center" Y="Top"></e-toast-position>
</ejs-toast>

<script>
    var maxCount = 3;
    function onBeforeOpen(e) {
        var toast = document.getElementById('max_toast').ej2_instances[0];
        if (toast.element.childElementCount >= maxCount) {
            e.cancel = true;
        }
    }
</script>
```

---

## Message

The Syncfusion `Message` component displays contextual messages with visual severity indicators—icons and colors—to communicate importance and context to end users. It supports five severity levels, three visual variants, close-icon dismissal, content templates, and full accessibility compliance.

### Documentation & Navigation Guide

#### Getting Started
📄 **Read:** [references/message-getting-started.md](references/message-getting-started.md)
- NuGet installation of `Syncfusion.EJ2.AspNet.Core`
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script registration in `_Layout.cshtml`
- Adding the first `<ejs-message>` tag helper
- Content via `content` attribute or inner content
- First working example

#### Severity Levels
📄 **Read:** [references/message-severities.md](references/message-severities.md)
- Five severity levels: `Normal`, `Success`, `Info`, `Warning`, `Error`
- `severity` attribute usage and valid values
- Visual distinctions (icons and colors per severity)
- Choosing the right severity for your use case
- Dynamic severity from a model value

#### Display Variants
📄 **Read:** [references/message-variants.md](references/message-variants.md)
- Three variants: `Text` (default), `Outlined`, `Filled`
- `variant` attribute usage
- Combining variant with severity
- Visual trade-offs and when to use each

#### Icons and Close Icon
📄 **Read:** [references/message-icons-and-close.md](references/message-icons-and-close.md)
- Severity icon visibility: `showIcon` attribute (default `true`)
- Disabling severity icons
- Custom severity icons via `cssClass` CSS overrides
- Close icon: `showCloseIcon` attribute (default `false`)
- `closed` event handler for dismiss callbacks
- Toggling visibility with the `visible` attribute

#### Customization and Templates
📄 **Read:** [references/message-customization.md](references/message-customization.md)
- Content alignment: left (default), center (`e-content-center`), right (`e-content-right`)
- Custom appearance with `cssClass`
- CSS-only message rendering (no JS, pure HTML + CSS)
- Content templates: `<e-content-template>` child element
- RTL support via `enableRtl`
- Persistence with `enablePersistence`

#### Accessibility
📄 **Read:** [references/message-accessibility.md](references/message-accessibility.md)
- WCAG 2.2, Section 508, ADA compliance
- WAI-ARIA attributes (`role="alert"`, `aria-label`)
- Keyboard navigation (Tab, Enter/Space)
- Screen reader support

#### API Reference
📄 **Read:** [references/message-api.md](references/message-api.md)
- All properties with types, defaults, and tag attribute names
- Events: `closed`, `created`, `destroyed`
- `Severity` and `Variant` enum values
- Tag helper syntax reference

---

### Quick Start

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-message id="msg_default" content="Please read the comments carefully"></ejs-message>
```

---

### Common Patterns

#### Severity Messages
```cshtml
<ejs-message id="msg_normal"  content="Editing is restricted"></ejs-message>
<ejs-message id="msg_success" content="Operation completed"  severity="Success"></ejs-message>
<ejs-message id="msg_info"    content="Read these notes"     severity="Info"></ejs-message>
<ejs-message id="msg_warning" content="Check your connection" severity="Warning"></ejs-message>
<ejs-message id="msg_error"   content="Submission failed"    severity="Error"></ejs-message>
```

#### Variant + Severity Combo
```cshtml
<ejs-message id="msg_ft" content="Editing is restricted" variant="Filled"></ejs-message>
<ejs-message id="msg_os" content="Operation completed"  severity="Success" variant="Outlined"></ejs-message>
<ejs-message id="msg_fe" content="Submission failed"    severity="Error"   variant="Filled"></ejs-message>
```

#### Dismissible Message
```cshtml
<ejs-message id="msg_dismiss"
             content="Your session will expire soon"
             severity="Warning"
             showCloseIcon="true"
             visible="true"
             closed="onMessageClosed">
</ejs-message>

<script>
    function onMessageClosed() {
        var msg = document.getElementById('msg_dismiss').ej2_instances[0];
        msg.visible = false;
    }
</script>
```

#### Content Template
```cshtml
<ejs-message id="msg_template" severity="Success" showCloseIcon="true" closed="onTemplateClosed">
    <e-content-template>
        <div>
            <h4>Build succeeded</h4>
            <p>All 42 tests passed.</p>
        </div>
    </e-content-template>
</ejs-message>

<script>
    function onTemplateClosed() {
        document.getElementById('msg_template').ej2_instances[0].visible = false;
    }
</script>
```

---

## Skeleton

The Syncfusion `Skeleton` component renders animated placeholder shapes that mimic the layout of loading content. It reduces perceived load time and communicates progress to users with configurable shapes, shimmer animations, and full accessibility support.

### Documentation & Navigation Guide

#### Getting Started
📄 **Read:** [references/skeleton-getting-started.md](references/skeleton-getting-started.md)
- NuGet installation of `Syncfusion.EJ2.AspNet.Core`
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script registration in `_Layout.cshtml`
- Minimal `<ejs-skeleton>` setup with `height` and `width`
- All four shape types (Circle, Square, Text, Rectangle)

#### Shapes
📄 **Read:** [references/skeleton-shapes.md](references/skeleton-shapes.md)
- `shape` attribute: `"Circle"`, `"Square"`, `"Rectangle"`, `"Text"` (default)
- Dimension rules: width required for Circle/Square; width + height for Rectangle/Text
- Building multi-shape card skeleton layouts
- Choosing the right shape for avatar, image, text, and icon placeholders

#### Shimmer Effects
📄 **Read:** [references/skeleton-shimmer-effect.md](references/skeleton-shimmer-effect.md)
- `shimmerEffect` attribute: `"Wave"` (default), `"Pulse"`, `"Fade"`
- Visual behavior of each effect type
- List skeleton example with Pulse effect
- Selecting an effect to match UI context

#### Styles and Visibility
📄 **Read:** [references/skeleton-styles.md](references/skeleton-styles.md)
- `cssClass` attribute for custom CSS overrides (wave color, background, animation speed)
- `visible` attribute to toggle skeleton on/off based on loading state
- Transition pattern: skeleton → actual content
- CSS variable customization

#### Accessibility
📄 **Read:** [references/skeleton-accessibility.md](references/skeleton-accessibility.md)
- WCAG 2.2, Section 508, ADA compliance
- WAI-ARIA attributes: `role="status"`, `aria-label`, `aria-live`, `aria-busy`
- `label` attribute for accessible skeleton names
- RTL support via `enableRtl`
- `prefers-reduced-motion` respect

#### API Reference
📄 **Read:** [references/skeleton-api.md](references/skeleton-api.md)
- All properties with types, defaults, and tag attribute names
- `SkeletonType` and `ShimmerEffect` enum values
- Tag helper syntax reference

---

### Quick Start

```cshtml
@* ~/Pages/Index.cshtml *@
<ejs-skeleton id="sk_default" height="15px" width="100%"></ejs-skeleton>
```

---

### Common Patterns

#### Profile Card Skeleton
```cshtml
<div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
    @* Avatar placeholder *@
    <ejs-skeleton id="sk_avatar" shape="Circle" width="48px"></ejs-skeleton>
    @* Name and subtitle placeholders *@
    <div style="flex: 1;">
        <ejs-skeleton id="sk_name" width="60%" height="15px"></ejs-skeleton>
        <br />
        <ejs-skeleton id="sk_sub"  width="40%" height="12px"></ejs-skeleton>
    </div>
</div>
```

#### Toggle Skeleton on Data Load
```cshtml
@{
    var loading = true;
    var content = "Data loaded successfully";
}
<div>
    @if (loading)
    {
        <ejs-skeleton id="sk_loader" width="80%" height="20px"></ejs-skeleton>
    }
    else
    {
        <p>@content</p>
    }
</div>
```

#### Shimmer List with Pulse Effect
```cshtml
<ul style="list-style: none; padding: 0;">
    @for (var i = 1; i <= 3; i++)
    {
        <li style="display: flex; gap: 10px; margin-bottom: 12px;">
            <ejs-skeleton id="@($"sk_av_{i}")" shape="Circle" width="40px" shimmerEffect="Pulse"></ejs-skeleton>
            <div style="flex: 1;">
                <ejs-skeleton id="@($"sk_t1_{i}")" width="70%" height="14px" shimmerEffect="Pulse"></ejs-skeleton>
                <br />
                <ejs-skeleton id="@($"sk_t2_{i}")" width="45%" height="12px" shimmerEffect="Pulse"></ejs-skeleton>
            </div>
        </li>
    }
</ul>
```

---

### Key Properties at a Glance

| Attribute | Type | Default | Purpose |
|---|---|---|---|
| `shape` | `SkeletonType` | `Text` | Skeleton shape variant |
| `width` | `string` | `""` | Width; required for Circle/Square |
| `height` | `string` | `""` | Height; used for Rectangle/Text |
| `shimmerEffect` | `ShimmerEffect` | `Wave` | Animation style |
| `visible` | `bool` | `true` | Show/hide skeleton |
| `css-class` | `string` | `""` | Custom CSS class(es) |
| `label` | `string` | `"Loading..."` | ARIA label for accessibility |
| `enable-rtl` | `bool` | `false` | Right-to-left rendering |
| `enable-persistence` | `bool` | `false` | Persist state across reloads | 