---
name: syncfusion-aspnetcore-buttons
description: Comprehensive guide for implementing Syncfusion ASP.NET Core button components including Button, ButtonGroup, Checkbox, Chips, DropDownButton, Floating Action Button, ProgressButton, RadioButton, Speed Dial, Split Button, and Switch. Use this when adding styled buttons, toggle behavior, icon support, grouped selections, dropdown action menus, floating primary actions, expandable speed dial menus, interactive form elements, single/multiple selection capabilities, compact tag/filter elements, or drag-and-drop interactions to an ASP.NET Core application.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Buttons"
---

# Implementing Syncfusion ASP.NET Core Buttons

## Button

The **Button** component is a fundamental action control that triggers a response when clicked. It supports color variants (primary, success, danger, warning, info, link), flat/outline/round styles, icon support, sizes, toggle behavior, ripple effects, and complete form integration.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/button-getting-started.md](references/button-getting-started.md)
- Prerequisites and NuGet package installation
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script CDN setup in `_Layout.cshtml`
- Script manager registration with `<ejs-scripts>`
- Basic button rendering with `<ejs-button>`
- Enabling ripple effects
- Click event handling with `onclick` attribute
- Using the button in forms (`type="submit"` / `type="reset"`)

#### Types and Styles
📄 **Read:** [references/button-types-and-styles.md](references/button-types-and-styles.md)
- Color variants (`e-primary`, `e-success`, `e-danger`, `e-warning`, `e-info`, `e-link`)
- Flat, outline, and round button types
- Icon buttons and icon positioning (`iconPosition`: Left / Top / Right / Bottom)
- Toggle buttons with `isToggle` and `toggled` state
- Button sizes (`e-small`, `e-bigger`)

#### How-To
📄 **Read:** [references/button-how-to.md](references/button-how-to.md)
- Creating block buttons (full-width)
- Rounded-corner buttons
- Navigation links styled as buttons
- Custom appearance with CSS
- Disabled state
- RTL support with `enableRtl`
- Tooltips on buttons
- Form submission patterns

#### API Reference
📄 **Read:** [references/button-api.md](references/button-api.md)
- Complete property reference with types and defaults
- Methods (`click`, `focusIn`, `destroy`)
- Event signatures
- CSS class reference table
- Tag helper attribute syntax

#### Accessibility
📄 **Read:** [references/button-accessibility.md](references/button-accessibility.md)
- WCAG 2.2 AA compliance
- Semantic HTML and WAI-ARIA attributes
- Keyboard navigation (Tab, Enter, Space)
- Focus management and visible focus indicators
- Icon-only button accessibility with `aria-label`

---

### Quick Start

**1. Install NuGet package:**
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

**2. Register Tag Helper** in `~/Pages/_ViewImports.cshtml`:
```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**3. Add CSS and script** in `~/Pages/Shared/_Layout.cshtml`:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

**4. Add Script Manager** at end of `<body>`:
```html
<ejs-scripts></ejs-scripts>
```

**5. Render the Button:**
```cshtml
<ejs-button id="btn" cssClass="e-primary" content="Click Me"></ejs-button>
```

---

### Common Patterns

#### Primary Action Button
```cshtml
<ejs-button id="submit" cssClass="e-primary" type="submit" content="Save Changes"></ejs-button>
```

#### Danger Action Button
```cshtml
<ejs-button id="delete" cssClass="e-danger" onclick="confirmDelete()" content="Delete"></ejs-button>
```

#### Icon Button
```cshtml
<ejs-button id="edit" cssClass="e-small" iconCss="e-icons e-edit-icon"></ejs-button>
```

#### Disabled Button
```cshtml
<ejs-button id="btn" disabled="true" content="Cannot Click"></ejs-button>
```

#### Form Submission
```cshtml
<form>
    <ejs-switch id="switch1" name="wifi" value="on" checked="true"></ejs-switch>
    <ejs-button id="submit" content="Submit"></ejs-button>
</form>
```

## ButtonGroup

The **ButtonGroup** component visually groups related buttons into a single control. Use it to build segmented controls, toolbars, or related action clusters. It is a pure CSS grouping (no Tag Helper) — simply wrap multiple buttons inside an element with the `e-btn-group` class.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/buttongroup-getting-started.md](references/buttongroup-getting-started.md)
- Pure CSS component setup
- Basic button grouping with `e-btn-group` wrapper
- Visual organization of related buttons

#### Selection and Nesting
📄 **Read:** [references/buttongroup-selection-and-nesting.md](references/buttongroup-selection-and-nesting.md)
- Radio button group behavior (mutually exclusive selection)
- Checkbox group behavior (multiple selection)
- Nesting with DropDownButton and SplitButton
- Server-side state management for grouped selection

#### How-To
📄 **Read:** [references/buttongroup-how-to.md](references/buttongroup-how-to.md)
- Creating segmented controls
- Building toolbars with multiple groups
- Vertical button groups
- Separators between buttons
- Enable/disable logic for groups

#### Style and Appearance
📄 **Read:** [references/buttongroup-style-and-appearance.md](references/buttongroup-style-and-appearance.md)
- Custom styling for groups
- CSS classes reference
- Color variants within groups
- Vertical layouts

#### Accessibility
📄 **Read:** [references/buttongroup-accessibility.md](references/buttongroup-accessibility.md)
- Semantic HTML structure
- ARIA attributes (`role="group"`, `aria-label`)
- Keyboard navigation
- Focus indicators

---

### Quick Start

**1. Install NuGet package:**
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

**2. Register Tag Helper** in `~/Pages/_ViewImports.cshtml`:
```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**3. Add CSS and script** in `~/Pages/Shared/_Layout.cshtml`:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

**4. Add Script Manager** at end of `<body>`:
```html
<ejs-scripts></ejs-scripts>
```

**5. Render the ButtonGroup:**
```cshtml
<div class="e-btn-group">
    <ejs-button id="btn1" content="HTML"></ejs-button>
    <ejs-button id="btn2" content="CSS"></ejs-button>
    <ejs-button id="btn3" content="JavaScript"></ejs-button>
</div>
```

---

### Common Patterns

#### Vertical ButtonGroup
```cshtml
<div class="e-btn-group e-vertical">
    <ejs-button id="btn1" content="Top"></ejs-button>
    <ejs-button id="btn2" content="Middle"></ejs-button>
    <ejs-button id="btn3" content="Bottom"></ejs-button>
</div>
```

#### Segmented Control
```cshtml
<div class="e-btn-group">
    <ejs-button id="left" cssClass="e-outline" content="Left"></ejs-button>
    <ejs-button id="center" cssClass="e-outline" content="Center"></ejs-button>
    <ejs-button id="right" cssClass="e-outline" content="Right"></ejs-button>
</div>
```

#### Toolbar with Multiple Groups
```cshtml
<div class="e-toolbar">
    <div class="e-btn-group">
        <ejs-button id="bold" iconCss="e-icons e-bold-icon"></ejs-button>
        <ejs-button id="italic" iconCss="e-icons e-italic-icon"></ejs-button>
        <ejs-button id="underline" iconCss="e-icons e-underline-icon"></ejs-button>
    </div>
    <div class="e-btn-group">
        <ejs-button id="left" iconCss="e-icons e-align-left-icon"></ejs-button>
        <ejs-button id="center" iconCss="e-icons e-align-center-icon"></ejs-button>
    </div>
</div>
```

## Checkbox

The **Checkbox** component is a boolean input control for form selections. It supports checked, unchecked, and indeterminate states (for parent checkboxes), label positioning, size variants, custom colors, and full accessibility.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/checkbox-getting-started.md](references/checkbox-getting-started.md)
- Prerequisites and NuGet package installation
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script CDN setup in `_Layout.cshtml`
- Script manager registration
- Basic checkbox rendering with `<ejs-checkbox>`
- Checkbox with labels
- Enabling ripple effects

#### Features and State
📄 **Read:** [references/checkbox-features-and-state.md](references/checkbox-features-and-state.md)
- Checked and unchecked states
- Indeterminate state for parent checkboxes
- Disabled state
- Form integration with `name` and `value` attributes
- Change event handling with `change` attribute
- State summary table

#### Label and Size
📄 **Read:** [references/checkbox-label-and-size.md](references/checkbox-label-and-size.md)
- Label configuration
- Label position control (`Before` / `After`)
- Size variants (`e-small`)
- Combined label and size example

#### Customization
📄 **Read:** [references/checkbox-customization.md](references/checkbox-customization.md)
- CSS class overrides (`e-frame`, `e-label`)
- Color variants (primary, success, warning, danger, info)
- Custom frame shape (circular checkboxes)
- RTL support with `enableRtl`

#### API Reference
📄 **Read:** [references/checkbox-api.md](references/checkbox-api.md)
- Property reference table (`id`, `label`, `checked`, `disabled`, `indeterminate`, `name`, `value`, `cssClass`, `labelPosition`, `enableRtl`, `enableHtmlSanitizer`, `enablePersistence`, `htmlAttributes`)
- Methods (`click`, `focusIn`, `destroy`)
- Event signatures (`created`, `beforeChange`, `change`)
- Tag helper attribute syntax
- Complete end-to-end form example

#### Accessibility
📄 **Read:** [references/checkbox-accessibility.md](references/checkbox-accessibility.md)
- WCAG 2.2 AA compliance
- Semantic HTML and WAI-ARIA attributes
- Keyboard navigation (Tab / Space)
- Fieldset/Legend patterns
- Screen reader support

---

### Quick Start

**1. Install NuGet package:**
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

**2. Register Tag Helper** in `~/Pages/_ViewImports.cshtml`:
```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**3. Add CSS and script** in `~/Pages/Shared/_Layout.cshtml`:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

**4. Add Script Manager** at end of `<body>`:
```html
<ejs-scripts></ejs-scripts>
```

**5. Render the Checkbox:**
```cshtml
<ejs-checkbox id="chk1" label="I agree to the terms"></ejs-checkbox>
```

---

### Common Patterns

#### Checkbox with Form Submission
```cshtml
<form method="post">
    <ejs-checkbox id="terms" name="agreeTerms" value="agreed" label="I agree to terms"></ejs-checkbox>
    <ejs-button id="submit" type="submit" cssClass="e-primary" content="Submit"></ejs-button>
</form>
```

```csharp
public async Task<IActionResult> OnPostAsync()
{
    bool agreeTerms = Request.Form["agreeTerms"] == "agreed";
    // Process the form data
    return Page();
}
```

#### Indeterminate Checkbox (Parent)
```cshtml
<ejs-checkbox id="selectAll" label="Select All" indeterminate="true" change="onSelectAllChange"></ejs-checkbox>
<ejs-checkbox id="opt1" name="options" value="1" label="Option 1"></ejs-checkbox>
<ejs-checkbox id="opt2" name="options" value="2" label="Option 2"></ejs-checkbox>
```

#### Small Size Checkbox
```cshtml
<ejs-checkbox id="compact" label="Compact option" cssClass="e-small"></ejs-checkbox>
```

## RadioButton

The **RadioButton** component provides mutually exclusive option selection. Use it for single-choice form fields. Group radio buttons using the `name` attribute to ensure only one is selected at a time. Supports labels, sizes, form integration, and accessibility.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/radiobutton-getting-started.md](references/radiobutton-getting-started.md)
- Prerequisites and NuGet package installation
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script CDN setup in `_Layout.cshtml`
- Script manager registration
- Basic radio button rendering with `<ejs-radiobutton>`
- Grouping radio buttons with `name` for mutual exclusivity

#### Features and State
📄 **Read:** [references/radiobutton-features-and-state.md](references/radiobutton-features-and-state.md)
- Disabled state
- Form integration with `name` and `value` attributes
- Reading selected value from `Request.Form["name"]`
- Change event handling

#### Label and Size
📄 **Read:** [references/radiobutton-label-and-size.md](references/radiobutton-label-and-size.md)
- Label positioning (`Before` / `After`)
- Size variants (`e-small`)
- Combined example

#### API Reference
📄 **Read:** [references/radiobutton-api.md](references/radiobutton-api.md)
- Property reference table
- Methods (`click`, `focusIn`, `destroy`)
- Event signatures
- Tag helper attribute syntax

#### Accessibility
📄 **Read:** [references/radiobutton-accessibility.md](references/radiobutton-accessibility.md)
- WCAG 2.2 AA compliance
- Semantic HTML with `fieldset` / `legend`
- WAI-ARIA attributes
- Keyboard navigation (arrow keys for group navigation)
- Screen reader support

---

### Quick Start

**1. Install NuGet package:**
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

**2. Register Tag Helper** in `~/Pages/_ViewImports.cshtml`:
```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**3. Add CSS and script** in `~/Pages/Shared/_Layout.cshtml`:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

**4. Add Script Manager** at end of `<body>`:
```html
<ejs-scripts></ejs-scripts>
```

**5. Render the RadioButton:**
```cshtml
<ul>
    <li><ejs-radiobutton id="r1" name="group1" label="Option 1"></ejs-radiobutton></li>
    <li><ejs-radiobutton id="r2" name="group1" label="Option 2"></ejs-radiobutton></li>
</ul>
```

---

### Common Patterns

#### RadioButton Group with Form Submission
```cshtml
<form method="post">
    <ejs-radiobutton id="r1" name="choice" value="a" label="Option A"></ejs-radiobutton>
    <ejs-radiobutton id="r2" name="choice" value="b" label="Option B" checked="true"></ejs-radiobutton>
    <ejs-radiobutton id="r3" name="choice" value="c" label="Option C"></ejs-radiobutton>
    <ejs-button id="submit" type="submit" cssClass="e-primary" content="Submit"></ejs-button>
</form>
```

```csharp
public async Task<IActionResult> OnPostAsync()
{
    string choice = Request.Form["choice"];
    // Process the selected value
    return Page();
}
```

#### Disabled RadioButton
```cshtml
<ejs-radiobutton id="r1" name="group2" label="Disabled" disabled="true" checked="true"></ejs-radiobutton>
```

## DropDownButton

The **DropDownButton** component is a button that opens a popup menu when clicked. It supports items with icons, separators, disabled items, navigation URLs, and event handling for item selection.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/dropdownbutton-getting-started.md](references/dropdownbutton-getting-started.md)
- Prerequisites and NuGet package installation
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script CDN setup in `_Layout.cshtml`
- Script manager registration
- Basic dropdown button rendering with `<ejs-dropdownbutton>`
- Binding items from controller via `List<object>`

#### Popup Items
📄 **Read:** [references/dropdownbutton-popup-items.md](references/dropdownbutton-popup-items.md)
- Items with icons (`iconCss`)
- Separator items (`separator: true`)
- Disabled items (`disabled: true`)
- Navigation URLs (`url` property)
- Item structure reference

#### Events and Interactivity
📄 **Read:** [references/dropdownbutton-events-and-interactivity.md](references/dropdownbutton-events-and-interactivity.md)
- Click events for primary button
- Open / close events for popup lifecycle
- Item selection handling with `select` event
- `beforeOpen` / `beforeClose` events

#### API Reference
📄 **Read:** [references/dropdownbutton-api.md](references/dropdownbutton-api.md)
- Property reference table
- Event signatures
- Tag helper attribute syntax

#### Accessibility
📄 **Read:** [references/dropdownbutton-accessibility.md](references/dropdownbutton-accessibility.md)
- WCAG 2.2 AA compliance
- WAI-ARIA attributes (`aria-haspopup`, `aria-expanded`)
- Keyboard navigation
- Screen reader support

---

### Quick Start

**Controller (HomeController.cs):**
```csharp
public ActionResult Index()
{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste" });
    ViewBag.items = items;
    return View();
}
```

**View (Index.cshtml):**
```cshtml
<ejs-dropdownbutton id="ddb" content="Edit" items="ViewBag.items"></ejs-dropdownbutton>
```

---

### Common Patterns

#### DropDownButton with Icons
```cshtml
@{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut", iconCss = "e-icons e-cut-icon" });
    items.Add(new { text = "Copy", iconCss = "e-icons e-copy-icon" });
    items.Add(new { text = "Paste", iconCss = "e-icons e-paste-icon" });
}
<ejs-dropdownbutton id="ddb" content="Edit" items="items"></ejs-dropdownbutton>
```

#### Handle Item Selection
```cshtml
<ejs-dropdownbutton id="ddb" content="Actions" items="ViewBag.items"
    select="onItemSelect"></ejs-dropdownbutton>

<script>
    function onItemSelect(args) {
        console.log('Selected:', args.item.text);
    }
</script>
```

## Floating Action Button (FAB)

The **Floating Action Button (FAB)** component is a circular button that floats over the UI, typically used for the primary or most common action on a screen. It supports icon-only or text-and-icon content, 9 position values relative to a target container, and color variants.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/floating-action-button-getting-started.md](references/floating-action-button-getting-started.md)
- Prerequisites and NuGet package installation
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script CDN setup in `_Layout.cshtml`
- Script manager registration
- Basic FAB rendering with `<ejs-fab>`
- FAB with icons (`iconCss`)
- Positioning to containers with `target`

#### Positions
📄 **Read:** [references/floating-action-button-positions.md](references/floating-action-button-positions.md)
- 9 position values (`TopLeft`, `TopCenter`, `TopRight`, `MiddleLeft`, `Center`, `MiddleRight`, `BottomLeft`, `BottomCenter`, `BottomRight`)
- Position examples and use cases

#### Icons
📄 **Read:** [references/floating-action-button-icons.md](references/floating-action-button-icons.md)
- Icon-only FAB
- Common icons (`e-plus-icon`, `e-edit-icon`, `e-delete-icon`, `e-search-icon`, `e-call-icon`, `e-chat-icon`, `e-email-icon`)
- Icon positioning

#### Styles
📄 **Read:** [references/floating-action-button-styles.md](references/floating-action-button-styles.md)
- Built-in color variants (`e-primary`, `e-success`, `e-danger`)
- Custom styling with CSS

#### API Reference
📄 **Read:** [references/floating-action-button-api.md](references/floating-action-button-api.md)
- Property reference table
- Tag helper attribute syntax

#### Accessibility
📄 **Read:** [references/floating-action-button-accessibility.md](references/floating-action-button-accessibility.md)
- WCAG 2.2 AA compliance
- `aria-label` for icon-only buttons
- Keyboard navigation
- Screen reader support

---

### Quick Start

**1. Install NuGet package:**
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

**2. Register Tag Helper** in `~/Pages/_ViewImports.cshtml`:
```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**3. Add CSS and script** in `~/Pages/Shared/_Layout.cshtml`:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

**4. Add Script Manager** at end of `<body>`:
```html
<ejs-scripts></ejs-scripts>
```

**5. Render the FAB:**
```cshtml
<ejs-fab id="fab" content="Add" cssClass="e-primary"></ejs-fab>
```

---

### Common Patterns

#### FAB with Icon
```cshtml
<ejs-fab id="fab" iconCss="e-icons e-plus-icon" cssClass="e-primary"></ejs-fab>
```

#### Positioned FAB
```cshtml
<div id="container" style="position: relative; height: 400px;">
    <ejs-fab id="fab" content="Add" position="BottomRight" target="#container"></ejs-fab>
</div>
```

#### FAB Click Handler
```cshtml
<ejs-fab id="fab" iconCss="e-icons e-plus-icon" cssClass="e-primary" onclick="onFabClick"></ejs-fab>
<script>
    function onFabClick() {
        console.log('FAB clicked');
    }
</script>
```

## ProgressButton

The **ProgressButton** component is a button that displays a progress indicator during asynchronous operations. It supports spinner animation, progress bar (0–100%), and complete progress feedback while a long-running task is in progress.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/progressbutton-getting-started.md](references/progressbutton-getting-started.md)
- Prerequisites and NuGet package installation
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script CDN setup in `_Layout.cshtml`
- Script manager registration
- Basic ProgressButton rendering with `<ejs-progressbutton>`
- Progress animation with `setInterval`

#### Spinner and Progress
📄 **Read:** [references/progressbutton-spinner-and-progress.md](references/progressbutton-spinner-and-progress.md)
- Progress display (0–100)
- `enableProgress="true"` property
- Spinner configuration
- Hiding the spinner
- Real-time progress updates with `progress` property

#### Style and Appearance
📄 **Read:** [references/progressbutton-style-and-appearance.md](references/progressbutton-style-and-appearance.md)
- Color variants (`e-primary`, `e-success`, `e-danger`)
- Custom styling
- Size variants (`e-small`)

#### API Reference
📄 **Read:** [references/progressbutton-api.md](references/progressbutton-api.md)
- Property reference table
- Tag helper attribute syntax

#### Accessibility
📄 **Read:** [references/progressbutton-accessibility.md](references/progressbutton-accessibility.md)
- WCAG 2.2 AA compliance
- `aria-busy` and `aria-valuenow` attributes
- Keyboard navigation
- Screen reader support

---

### Quick Start

**1. Install NuGet package:**
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

**2. Register Tag Helper** in `~/Pages/_ViewImports.cshtml`:
```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**3. Add CSS and script** in `~/Pages/Shared/_Layout.cshtml`:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

**4. Add Script Manager** at end of `<body>`:
```html
<ejs-scripts></ejs-scripts>
```

**5. Render the ProgressButton:**
```cshtml
<ejs-progressbutton id="progress" content="Submit" enableProgress="true"></ejs-progressbutton>
```

---

### Common Patterns

#### ProgressButton with Click Handler
```cshtml
<ejs-progressbutton id="upload" content="Upload" cssClass="e-primary"
    enableProgress="true" begin="onBegin" progress="onProgress" end="onEnd"></ejs-progressbutton>

<script>
    function onBegin(args) {
        // Start the operation
    }
    function onProgress(args) {
        // args.percent contains the progress (0-100)
        console.log('Progress:', args.percent + '%');
    }
    function onEnd(args) {
        // Operation complete
    }
</script>
```

#### ProgressButton with Spinner
```cshtml
<ejs-progressbutton id="spin" content="Loading" cssClass="e-primary" spinSettings="ViewBag.spin"></ejs-progressbutton>
```

## Speed Dial

The **Speed Dial** component is a floating action button that expands into a menu of related action items when clicked. It supports linear and radial display modes, 9 position values, and complete item configuration with icons and titles.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/speeddial-getting-started.md](references/speeddial-getting-started.md)
- Prerequisites and NuGet package installation
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script CDN setup in `_Layout.cshtml`
- Script manager registration
- Position-relative container requirement
- Basic SpeedDial rendering with `<ejs-speeddial>`
- SpeedDial with items

#### Items
📄 **Read:** [references/speeddial-items.md](references/speeddial-items.md)
- Item structure (`text`, `iconCss`, `title` properties)
- Icons and titles
- Item configuration

#### Display Modes
📄 **Read:** [references/speeddial-display-modes.md](references/speeddial-display-modes.md)
- Linear mode (`Linear`)
- Radial mode (`Radial`)
- Direction options (`Up`, `Down`, `Left`, `Right`)

#### Positions
📄 **Read:** [references/speeddial-positions.md](references/speeddial-positions.md)
- 9 position values (`TopLeft` through `BottomRight`)
- Position examples

#### API Reference
📄 **Read:** [references/speeddial-api.md](references/speeddial-api.md)
- Property reference table
- Event signatures
- Tag helper attribute syntax

#### Accessibility
📄 **Read:** [references/speeddial-accessibility.md](references/speeddial-accessibility.md)
- WCAG 2.2 AA compliance
- `aria-haspopup` and `aria-expanded` attributes
- Keyboard navigation
- Menu navigation patterns

---

### Quick Start

**Controller (HomeController.cs):**
```csharp
public ActionResult Index()
{
    List<SpeedDialItem> items = new List<SpeedDialItem>();
    items.Add(new SpeedDialItem
    {
        Text = "Cut"
    });
    items.Add(new SpeedDialItem
    {
        Text = "Copy"
    });
    items.Add(new SpeedDialItem
    {
        Text = "Paste"
    });
    return View();
}
```

**View (Index.cshtml):**
```cshtml
<div id="container" style="position: relative; height: 400px;">
    <ejs-speeddial id="sd" content="Action" items="ViewBag.items" target="#container"></ejs-speeddial>
</div>
```

---

### Common Patterns

#### Radial Mode
```cshtml
<ejs-speeddial id="sd" content="Edit" items="ViewBag.items"
    mode="Syncfusion.EJ2.Buttons.SpeedDialMode.Radial"
    direction="Syncfusion.EJ2.Buttons.SpeedDialDirection.Up">
</ejs-speeddial>
```

#### Linear Mode with Direction
```cshtml
<ejs-speeddial id="sd" content="More" items="ViewBag.items"
    mode="Syncfusion.EJ2.Buttons.SpeedDialMode.Linear"
    direction="Syncfusion.EJ2.Buttons.SpeedDialDirection.Left">
</ejs-speeddial>
```

## SplitButton

The **SplitButton** component combines a primary action button with a dropdown arrow that reveals a popup list of secondary action items. Clicking the primary button triggers the default action; clicking the dropdown arrow opens the popup.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/split-button-getting-started.md](references/split-button-getting-started.md)
- NuGet package installation and tag helper registration
- Stylesheet and script CDN setup
- Basic SplitButton with popup items (`content`, `items`)
- Running the application for the first time
- Controller action to populate `ViewBag.items`

#### Icons and Appearance
📄 **Read:** [references/split-button-icons-and-appearance.md](references/split-button-icons-and-appearance.md)
- Adding icons via `iconCss` property
- Changing icon position (`iconPosition`: Left / Top)
- Vertical button layout using `cssClass="e-vertical"`
- Icons on popup action items
- Separator lines between popup items (`separator: true`)
- Style and appearance CSS class reference (`.e-dropdown-btn`, `.e-split-btn`, etc.)
- Theme Studio customization

#### Popup Items and Templating
📄 **Read:** [references/split-button-popup-items.md](references/split-button-popup-items.md)
- Defining popup items with `text`, `iconCss`, `separator`, `id`, `url`, `disabled`
- Item templating via `beforeItemRender` event
- Popup templating using the `target` property
- Grouping items using ListView as `target`

#### How-To Scenarios
📄 **Read:** [references/split-button-how-to.md](references/split-button-how-to.md)
- Set disabled state via `disabled` property
- Enable right-to-left layout with `enableRtl`
- Open a Dialog on popup item click using `select` event
- Underline a character in item text using `beforeItemRender`
- Group items in popup with ListView

#### Events and Interactivity
📄 **Read:** [references/split-button-events.md](references/split-button-events.md)
- `click` — primary button clicked
- `select` — popup action item selected
- `beforeOpen` / `open` / `close` / `beforeClose` — popup lifecycle
- `beforeItemRender` — customize each popup item at render time
- `created` — component initialization complete
- Practical event handler examples

#### Accessibility
📄 **Read:** [references/split-button-accessibility.md](references/split-button-accessibility.md)
- WCAG 2.2 AA compliance
- WAI-ARIA attributes (`role`, `aria-haspopup`, `aria-expanded`, `aria-owns`, `aria-disabled`)
- Keyboard navigation shortcuts
- Screen reader support
- Accessibility checker validation

#### API Reference
📄 **Read:** [references/split-button-api.md](references/split-button-api.md)
- Complete property list with types and defaults
- Event signatures
- Method reference (`toggle`, `destroy`)
- EJ1 to EJ2 migration mapping

---

### Quick Start

**Controller (HomeController.cs):**
```csharp
public ActionResult Index()
{
    List<object> items = new List<object>();
    items.Add(new { text = "Cut" });
    items.Add(new { text = "Copy" });
    items.Add(new { text = "Paste" });
    ViewBag.items = items;
    return View();
}
```

**View (Index.cshtml):**
```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"></ejs-splitbutton>
```

---

### Common Patterns

#### SplitButton with Icon
```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    iconCss="e-icons e-paste"></ejs-splitbutton>
```

#### SplitButton with Icon on Top (Vertical style)
```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    iconCss="e-icons e-paste" iconPosition="Top"
    cssClass="e-vertical"></ejs-splitbutton>
```

#### Disabled SplitButton
```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    disabled="true"></ejs-splitbutton>
```

#### RTL SplitButton
```cshtml
<ejs-splitbutton id="rtl" content="Message" items="ViewBag.items"
    enableRtl="true"></ejs-splitbutton>
```

#### Handle Primary Click and Item Select
```cshtml
<ejs-splitbutton id="element" content="Paste" items="ViewBag.items"
    click="onPrimaryClick" select="onItemSelect"></ejs-splitbutton>

<script>
    function onPrimaryClick(args) {
        // Primary button clicked
    }
    function onItemSelect(args) {
        // args.item contains the selected popup item
        console.log(args.item.text);
    }
</script>
```

## Switch

The **Switch** component is a toggle control that allows users to switch between ON and OFF states. Use it for boolean settings, feature toggles, and quick state changes. It supports ON/OFF labels, sizes, RTL, custom styling, and form integration.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/switch-getting-started.md](references/switch-getting-started.md)
- Prerequisites and NuGet package installation
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script CDN setup in `_Layout.cshtml`
- Script manager registration
- Basic switch rendering with `<ejs-switch>`
- ON/OFF labels with `onLabel` and `offLabel`
- Initial state with `checked`

#### Features
📄 **Read:** [references/switch-features.md](references/switch-features.md)
- Disabled state
- Size variants (`e-small`)
- RTL support with `enableRtl`
- Form integration with `name` and `value`

#### Events
📄 **Read:** [references/switch-events.md](references/switch-events.md)
- Change event handling
- State change prevention with `BeforeChange` event
- `Created` event

#### Customization
📄 **Read:** [references/switch-customization.md](references/switch-customization.md)
- Custom styling
- Bar and handle customization
- Color customization

#### API Reference
📄 **Read:** [references/switch-api.md](references/switch-api.md)
- Property reference table
- Event signatures
- Tag helper attribute syntax

#### Accessibility
📄 **Read:** [references/switch-accessibility.md](references/switch-accessibility.md)
- WCAG 2.2 AA compliance
- ARIA attributes (`role="switch"`, `aria-checked`)
- Keyboard navigation (Space to toggle)
- Screen reader support

---

### Quick Start

**1. Install NuGet package:**
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

**2. Register Tag Helper** in `~/Pages/_ViewImports.cshtml`:
```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**3. Add CSS and script** in `~/Pages/Shared/_Layout.cshtml`:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

**4. Add Script Manager** at end of `<body>`:
```html
<ejs-scripts></ejs-scripts>
```

**5. Render the Switch:**
```cshtml
<ejs-switch id="switch1" onLabel="ON" offLabel="OFF" checked="true"></ejs-switch>
```

---

### Common Patterns

#### Switch with Form Submission
```cshtml
<form>
    <ejs-switch id="wifi" name="wifi" value="on" checked="true"></ejs-switch>
    <ejs-switch id="bluetooth" name="bluetooth" value="on"></ejs-switch>
    <ejs-button id="submit" type="submit" content="Save"></ejs-button>
</form>
```

#### Prevent State Change
```cshtml
<ejs-switch id="switch1" beforeChange="onBeforeChange"></ejs-switch>
<script>
    function onBeforeChange(args) {
        args.cancel = true; // Prevents toggle
    }
</script>
```

#### Small Switch with Change Event
```cshtml
<ejs-switch id="notify" cssClass="e-small" change="onNotifyChange"></ejs-switch>
<script>
    function onNotifyChange(args) {
        console.log('Notifications:', args.checked ? 'ON' : 'OFF');
    }
</script>
```

## Chips

The **Chips** component displays compact elements that represent inputs, attributes, or actions. Use them for tags, filters, contacts, or removable input values. They support selection modes (None, Single, Multiple), leading/trailing icons, avatar text/images, delete functionality, outline variants, predefined color styles, and drag-and-drop reordering.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/chips-getting-started.md](references/chips-getting-started.md)
- Prerequisites and NuGet package installation
- Tag helper registration in `_ViewImports.cshtml`
- Stylesheet and script CDN setup in `_Layout.cshtml`
- Script manager registration with `<ejs-scripts>`
- Single chip rendering with `<ejs-chiplist text="...">`
- Chip list rendering with `<e-chips>` and `<e-chip>`

#### Types and Selection
📄 **Read:** [references/chips-types-and-selection.md](references/chips-types-and-selection.md)
- Input chips (deletable, single selection)
- Choice chips (single selection — radio-like)
- Filter chips (multiple selection — checkbox-like)
- Action chips (trigger operations on click)
- Pre-selecting chips with `selected-chips`
- Handling click and delete events
- Disabled chips

#### Customization
📄 **Read:** [references/chips-customization.md](references/chips-customization.md)
- Predefined styles (`e-primary`, `e-success`, `e-info`, `e-warning`, `e-danger`)
- Leading icons (CSS classes and URLs)
- Avatar images and text
- Trailing icons
- Outline chips with `e-outline`
- Custom templates
- HTML attributes
- RTL support

#### Style
📄 **Read:** [references/chips-style.md](references/chips-style.md)
- Chip text styling
- Icon styling
- Delete button styling
- Selection state styling
- Avatar text styling
- Height/size customization
- CSS class hierarchy

#### Drag and Drop
📄 **Read:** [references/chips-drag-and-drop.md](references/chips-drag-and-drop.md)
- Enabling drag and drop with `allowDragAndDrop`
- Restricting drag area
- Cross-container drag and drop
- Drag events (`onDragStart`, `onDragEnd`, `onDrop`)
- Preventing drag/drop conditionally
- Customizing drag clone

#### API Reference
📄 **Read:** [references/chips-api.md](references/chips-api.md)
- Complete property reference (Text, Chips, Selection, SelectedChips, EnableDelete, CssClass, etc.)
- Methods (`GetSelectedChips`, `Select`, `Unselect`, `Delete`, `Refresh`)
- Events (`OnClick`, `OnDelete`, `OnSelect`, `OnDragStart`, `OnDragEnd`)
- ChipModel interface
- Event argument types

#### Accessibility
📄 **Read:** [references/chips-accessibility.md](references/chips-accessibility.md)
- WCAG 2.2 AA compliance
- WAI-ARIA attributes (`role="listbox"`, `role="option"`, `aria-selected`, `aria-label`)
- Keyboard navigation (Tab, Arrow keys, Enter, Delete)
- Screen reader support
- RTL accessibility
- Color contrast

---

### Quick Start

**1. Install NuGet package:**
```
Install-Package Syncfusion.EJ2.AspNet.Core
```

**2. Register Tag Helper** in `~/Pages/_ViewImports.cshtml`:
```cshtml
@addTagHelper *, Syncfusion.EJ2
```

**3. Add CSS and script** in `~/Pages/Shared/_Layout.cshtml`:
```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/fluent.css" />
<script src="https://cdn.syncfusion.com/ej2/dist/ej2.min.js"></script>
```

**4. Add Script Manager** at end of `<body>`:
```html
<ejs-scripts></ejs-scripts>
```

**5. Render the Chips:**
```cshtml
<ejs-chiplist id="chip-list">
    <e-chips>
        <e-chip text="Andrew"></e-chip>
        <e-chip text="Janet"></e-chip>
        <e-chip text="Laura"></e-chip>
        <e-chip text="Margaret"></e-chip>
    </e-chips>
</ejs-chiplist>
```

---

### Common Patterns

#### Single Chip
```cshtml
<ejs-chiplist id="chip" text="Janet Leverling"></ejs-chiplist>
```

#### Deletable Chips
```cshtml
<ejs-chiplist id="deletable" enableDelete="true">
    <e-chips>
        <e-chip text="Tag 1"></e-chip>
        <e-chip text="Tag 2"></e-chip>
    </e-chips>
</ejs-chiplist>
```

#### Filter Chips (Multiple Selection)
```cshtml
<ejs-chiplist id="filter" selection="Multiple">
    <e-chips>
        <e-chip text="React"></e-chip>
        <e-chip text="Angular"></e-chip>
        <e-chip text="Vue"></e-chip>
    </e-chips>
</ejs-chiplist>
```

#### Chips with Avatar Text
```cshtml
<ejs-chiplist id="avatar-chips">
    <e-chips>
        <e-chip text="Andrew" avatarText="A"></e-chip>
        <e-chip text="Janet" avatarText="J"></e-chip>
    </e-chips>
</ejs-chiplist>
```

#### Colored Chips
```cshtml
<ejs-chiplist id="colored">
    <e-chips>
        <e-chip text="Primary" cssClass="e-primary"></e-chip>
        <e-chip text="Success" cssClass="e-success"></e-chip>
        <e-chip text="Danger" cssClass="e-danger"></e-chip>
    </e-chips>
</ejs-chiplist>
```

#### Draggable Chips
```cshtml
<ejs-chiplist id="draggable" allowDragAndDrop="true">
    <e-chips>
        <e-chip text="Task 1"></e-chip>
        <e-chip text="Task 2"></e-chip>
    </e-chips>
</ejs-chiplist>
```
