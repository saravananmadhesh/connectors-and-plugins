---
name: syncfusion-aspnetcore-inputs
description: Complete guide to implementing Syncfusion Inputs components in ASP.NET Core applications. Use this when working with file uploads, numeric input, text fields, OTP verification, range sliders, signature pads, file validation, drag-and-drop, or enterprise-grade input handling for professional web forms.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Inputs"
---

# Implementing Syncfusion ASP.NET Core Inputs

## Uploader

The **Uploader** is an advanced file upload control that allows users to upload files asynchronously with features like chunk upload, drag-and-drop, validation, progress tracking, and previews. Supports multiple files, templates, security validation, and form integration.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/uploader-getting-started.md](references/uploader-getting-started.md)
- NuGet package installation and setup
- Tag helper registration and script/style references
- Basic Uploader rendering with `<ejs-uploader>`
- Auto-upload vs manual upload
- SaveUrl/RemoveUrl configuration
- Multiple file selection

#### Async Upload
📄 **Read:** [references/uploader-async-upload.md](references/uploader-async-upload.md)
- `<e-uploader-asyncsettings>` sub-tag with SaveUrl/RemoveUrl
- Sequential vs simultaneous upload
- Progress tracking with `progress` event
- Success/failure event handling
- Controller endpoint patterns

#### Chunk Upload
📄 **Read:** [references/uploader-chunk-upload.md](references/uploader-chunk-upload.md)
- Enabling chunk upload with `chunkSize`
- Retry logic with `retryCount` and `retryAfterDelay`
- Pause/resume operations
- Large file handling
- Server-side chunk processing

#### File Validation
📄 **Read:** [references/uploader-file-validation.md](references/uploader-file-validation.md)
- `allowedExtensions` for file type restrictions
- `minFileSize` and `maxFileSize` for size limits
- File count restrictions
- Duplicate file detection
- Custom validation via `selected` event

#### Drag-Drop Support
📄 **Read:** [references/uploader-drag-drop-support.md](references/uploader-drag-drop-support.md)
- Default drag-drop area
- Custom drop areas with `dropArea` selector
- Paste-upload functionality
- Directory/folder upload with `directoryUpload`
- Drag enter/leave events

#### Templates and Styling
📄 **Read:** [references/uploader-templates-and-styling.md](references/uploader-templates-and-styling.md)
- Custom file list templates
- Button customization
- Progress bar styling
- CSS classes (e-primary, e-success, etc.)
- Theme support (Fluent, Material, Bootstrap)

#### Advanced Patterns
📄 **Read:** [references/uploader-advanced-patterns.md](references/uploader-advanced-patterns.md)
- Form submission with uploaded files
- Directory upload
- Security considerations (path traversal, MIME validation)
- File previews (images)
- Error handling patterns

#### API Reference
📄 **Read:** [references/uploader-api.md](references/uploader-api.md)
- All properties with types, defaults, and descriptions
- All events (selected, uploading, success, failure, progress, etc.)
- AsyncSettings sub-properties
- CSS class reference table
- Complete tag helper attribute syntax

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

**5. Render the Uploader:**
```cshtml
<ejs-uploader id="uploader" autoUpload="true">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove">
    </e-uploader-asyncsettings>
</ejs-uploader>
```

---

### Common Patterns

#### Async Upload with SaveUrl/RemoveUrl
```cshtml
<ejs-uploader id="uploader" autoUpload="true" multiple="true">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove">
    </e-uploader-asyncsettings>
</ejs-uploader>
```

#### Chunk Upload
```cshtml
<ejs-uploader id="chunkUploader" autoUpload="true">
    <e-uploader-asyncsettings saveUrl="Home/SaveChunk" 
                              removeUrl="Home/Remove"
                              chunkSize="1048576">
    </e-uploader-asyncsettings>
</ejs-uploader>
```

#### File Validation
```cshtml
<ejs-uploader id="validatedUploader" 
    allowedExtensions=".jpg,.png,.pdf"
    maxFileSize="5242880"
    minFileSize="1024"
    multiple="false">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove">
    </e-uploader-asyncsettings>
</ejs-uploader>
```

#### Drag-Drop with Custom Area
```cshtml
<div id="dropArea" style="border: 2px dashed #ccc; padding: 20px;">
    Drop files here
</div>
<ejs-uploader id="uploader" dropArea="#dropArea" autoUpload="true">
    <e-uploader-asyncsettings saveUrl="Home/Save" removeUrl="Home/Remove">
    </e-uploader-asyncsettings>
</ejs-uploader>
```

---

## NumericTextBox

The **NumericTextBox** is a text input control that allows users to enter numeric values with support for formatting, validation, spin buttons, decimal precision, and globalization. It also provides two-way binding with ASP.NET Core models.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/numeric-textbox-getting-started.md](references/numeric-textbox-getting-started.md)
- NuGet package installation and setup
- Tag helper registration and script/style references
- Basic NumericTextBox rendering with `<ejs-numerictextbox>`
- Setting value, min, and max
- NumericTextBoxFor model binding

#### Formats and Validation
📄 **Read:** [references/numeric-textbox-formats-and-validation.md](references/numeric-textbox-formats-and-validation.md)
- Currency (`c2`), percentage (`p2`), decimal formats
- Min/max range validation
- `strictMode` for clamping out-of-range values
- Custom format strings
- `validateOnType` for real-time validation

#### Adornments and Styling
📄 **Read:** [references/numeric-textbox-adornments-and-styling.md](references/numeric-textbox-adornments-and-styling.md)
- Prepend/append adornments with templates
- Currency symbols, percentage icons
- Size classes (e-small, e-bigger)
- CSS customization and themes

#### Spin Buttons and Step
📄 **Read:** [references/numeric-textbox-spin-buttons-and-step.md](references/numeric-textbox-spin-buttons-and-step.md)
- Show/hide spin buttons with `showSpinButton`
- Step values for increment/decrement
- Keyboard navigation (up/down arrows)
- Custom step patterns

#### Precision and Decimals
📄 **Read:** [references/numeric-textbox-precision-decimals.md](references/numeric-textbox-precision-decimals.md)
- Decimal precision with `decimals` property
- `validateDecimalOnType` for real-time decimal validation
- `strictMode` behavior
- Currency and percentage precision

#### Two-Way Binding and Forms
📄 **Read:** [references/numeric-textbox-two-way-binding-forms.md](references/numeric-textbox-two-way-binding-forms.md)
- `NumericTextBoxFor` model binding
- Form submission with POST
- Server-side validation
- Tag helper integration with HTML forms

#### Globalization and Accessibility
📄 **Read:** [references/numeric-textbox-globalization-accessibility.md](references/numeric-textbox-globalization-accessibility.md)
- `locale` property for culture setting
- CLDR data loading for non-English cultures
- `enableRtl` for Arabic, Hebrew
- WCAG 2.2 compliance and ARIA attributes
- Keyboard navigation and screen reader support

#### API Reference
📄 **Read:** [references/numeric-textbox-api.md](references/numeric-textbox-api.md)
- All properties with types, defaults, and descriptions
- All events (change, input, focus, blur, created, destroyed)
- CSS class reference table
- Enum values (FloatLabelType, etc.)
- Complete tag helper attribute syntax

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

**5. Render the NumericTextBox:**
```cshtml
<ejs-numerictextbox id="price" min="0" max="10000" value="100" 
                    format="c2" placeholder="Enter price">
</ejs-numerictextbox>
```

---

### Common Patterns

#### Currency Format
```cshtml
<ejs-numerictextbox id="amount" format="c2" min="0" value="100">
</ejs-numerictextbox>
```

#### Percentage with Step
```cshtml
<ejs-numerictextbox id="percentage" format="p2" min="0" max="100" 
                    step="5" showSpinButton="true">
</ejs-numerictextbox>
```

#### NumericTextBoxFor (Model Binding)
```cshtml
@model AppModel
<ejs-numerictextboxfor id="quantity" for="@Model.Quantity">
</ejs-numerictextboxfor>
```

#### With Validation
```cshtml
<ejs-numerictextbox id="age" min="18" max="100" strictMode="true" 
                    validateOnType="true" placeholder="Enter age">
</ejs-numerictextbox>
```

---

## OTP Input

The **OTP Input** (One-Time Password) is a specialized input control for entering verification codes, OTPs, PINs, or any fixed-length alphanumeric sequence. Supports multiple input types (number, text, password), styling modes, and accessibility.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/otp-input-getting-started.md](references/otp-input-getting-started.md)
- NuGet package installation and setup
- Tag helper registration and script/style references
- Basic OTP rendering with `<ejs-otpinput>`
- Setting length and type
- ValueChanged event for verification

#### Configuration
📄 **Read:** [references/otp-input-configuration.md](references/otp-input-configuration.md)
- Input types: number, text, password
- Styling modes: Outlined, Filled, Underlined
- Placeholder text (single or per-field)
- Separator character between fields
- Disabled state and CSS classes

#### Events
📄 **Read:** [references/otp-input-events.md](references/otp-input-events.md)
- Created, Input, ValueChanged, Focus, Blur events
- Real-time feedback patterns
- Auto-submit on completion
- Timeout handling
- Validation feedback

#### Accessibility
📄 **Read:** [references/otp-input-accessibility.md](references/otp-input-accessibility.md)
- WCAG 2.2 AA compliance
- WAI-ARIA attributes (role, aria-label, aria-required)
- Full keyboard interaction table
- Screen reader support
- RTL support for Arabic, Hebrew

#### API Reference
📄 **Read:** [references/otp-input-api.md](references/otp-input-api.md)
- All properties (length, type, stylingMode, separator, etc.)
- All events with descriptions
- CSS class reference
- Complete tag helper attribute syntax

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

**5. Render the OTP Input:**
```cshtml
<ejs-otpinput id="otp" length="6" type="number" 
              placeholder="0" valueChanged="onOtpComplete">
</ejs-otpinput>
```

---

### Common Patterns

#### 6-Digit Numeric OTP
```cshtml
<ejs-otpinput id="otp" length="6" type="number" 
              placeholder="0" autoFocus="true">
</ejs-otpinput>
```

#### Alphanumeric OTP with Separator
```cshtml
<ejs-otpinput id="otp" length="6" type="text" 
              separator="-" stylingMode="filled">
</ejs-otpinput>
```

#### Password-Type OTP (Hidden)
```cshtml
<ejs-otpinput id="otp" length="4" type="password">
</ejs-otpinput>
```

---

## TextArea

The **TextArea** is a multi-line text input control with support for floating labels, adornments, character limits, resize modes, validation, form integration, and accessibility. It also supports methods for programmatic value management.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/textarea-getting-started.md](references/textarea-getting-started.md)
- NuGet package installation and setup
- Tag helper registration and script/style references
- Basic TextArea rendering with `<ejs-textarea>`
- Setting rows, columns, value
- TextAreaFor model binding

#### Floating Label
📄 **Read:** [references/textarea-floating-label.md](references/textarea-floating-label.md)
- `floatLabelType` modes: Auto, Always, Never
- Material-style floating label
- When to use each mode

#### Adornments
📄 **Read:** [references/textarea-adornments.md](references/textarea-adornments.md)
- Prepend/append template adornments
- `adornmentFlow` for icon positioning
- Currency symbols, character counters
- Interactive adornment elements

#### Resize
📄 **Read:** [references/textarea-resize.md](references/textarea-resize.md)
- Resize modes: Both, Vertical, Horizontal, None
- `cssClass` for additional styling
- Disabling resize
- Auto-resize patterns

#### Max Length
📄 **Read:** [references/textarea-max-length.md](references/textarea-max-length.md)
- `maxLength` property for character limits
- Real-time character counter
- User feedback patterns
- Server-side validation

#### Rows, Columns, and Sizing
📄 **Read:** [references/textarea-rows-columns-sizing.md](references/textarea-rows-columns-sizing.md)
- `rows` and `cols` properties
- Width and height customization
- CSS-based sizing
- Responsive behavior

#### Form Support
📄 **Read:** [references/textarea-form-support.md](references/textarea-form-support.md)
- HTML form integration
- FormValidator for client-side validation
- Form submission with POST
- Model binding with TextAreaFor

#### Styling and Appearance
📄 **Read:** [references/textarea-styling-appearance.md](references/textarea-styling-appearance.md)
- Size classes (e-small, e-bigger)
- Filled vs outlined modes
- CSS customization and themes
- Validation states (e-success, e-error, e-warning)

#### Value and Content
📄 **Read:** [references/textarea-value-and-content.md](references/textarea-value-and-content.md)
- Setting/getting values programmatically
- Data loading from server
- Default values and placeholders
- JavaScript interop

#### Methods
📄 **Read:** [references/textarea-methods.md](references/textarea-methods.md)
- `focusIn()` and `focusOut()` methods
- `getPersistData()` for state persistence
- `reset()` for clearing value
- `addAttributes()` and `removeAttributes()`

#### Events
📄 **Read:** [references/textarea-events.md](references/textarea-events.md)
- Created, Input, Change, Focus, Blur, Destroyed events
- Event arguments and usage patterns
- Real-world scenarios (character counter, auto-save, validation)

#### Accessibility
📄 **Read:** [references/textarea-accessibility.md](references/textarea-accessibility.md)
- WCAG 2.2 AA compliance
- WAI-ARIA attributes
- Full keyboard interaction table
- Screen reader support and RTL

#### API Reference
📄 **Read:** [references/textarea-api.md](references/textarea-api.md)
- All properties with types, defaults, and descriptions
- All events (Created, Input, Change, Focus, Blur, Destroyed)
- CSS class reference table
- Enum values (FloatLabelType, ResizeMode, etc.)
- Complete tag helper attribute syntax

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

**5. Render the TextArea:**
```cshtml
<ejs-textarea id="comment" rows="4" cols="50" 
              placeholder="Enter your comment..." maxLength="500">
</ejs-textarea>
```

---

### Common Patterns

#### Basic Multi-line Input
```cshtml
<ejs-textarea id="description" rows="5" cols="60" 
              placeholder="Enter description">
</ejs-textarea>
```

#### Floating Label
```cshtml
<ejs-textarea id="notes" rows="4" 
              floatLabelType="Auto" 
              placeholder="Notes">
</ejs-textarea>
```

#### With Max Length
```cshtml
<ejs-textarea id="feedback" rows="4" maxLength="500" 
              placeholder="Your feedback">
</ejs-textarea>
```

#### Resizable Both Directions
```cshtml
<ejs-textarea id="content" rows="6" 
              cssClass="e-resize-both">
</ejs-textarea>
```

---

## TextBox

The **TextBox** is a single-line text input control that supports multiple input types (text, password, email, number, etc.), floating labels, adornments, validation states, icon buttons, clear functionality, and multiline mode. It also provides comprehensive accessibility and styling options.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/textbox-getting-started.md](references/textbox-getting-started.md)
- NuGet package installation and setup
- Tag helper registration and script/style references
- Basic TextBox rendering with `<ejs-textbox>`
- Input types (text, email, password, number, tel, url, search)
- TextBoxFor model binding

#### Styling and Sizing
📄 **Read:** [references/textbox-styling-and-sizing.md](references/textbox-styling-and-sizing.md)
- Predefined size classes (e-small, e-bigger)
- Rounded corners
- CSS customization and themes
- Filled vs outlined modes

#### Features and Groups
📄 **Read:** [references/textbox-features-and-groups.md](references/textbox-features-and-groups.md)
- Floating labels (Auto, Always, Never)
- Prefix and suffix icons
- Clear button with `showClearButton`
- Group templates for combined inputs
- Add-on icons

#### Advanced Features
📄 **Read:** [references/textbox-advanced-features.md](references/textbox-advanced-features.md)
- Prepend/append adornments
- Interactive elements within TextBox
- HTML5 input types (date, time, color, range)
- Input event handling

#### Multiline and Expansion
📄 **Read:** [references/textbox-multiline-and-expansion.md](references/textbox-multiline-and-expansion.md)
- Creating multiline TextBox
- Auto-expansion behavior
- Floating label in multiline mode
- Resize patterns

#### Validation and States
📄 **Read:** [references/textbox-validation-and-states.md](references/textbox-validation-and-states.md)
- Valid/invalid CSS classes (e-success, e-error, e-warning)
- Disabled and readonly states
- HTML5 validation integration
- FormValidator integration

#### Accessibility and Migration
📄 **Read:** [references/textbox-accessibility-and-migration.md](references/textbox-accessibility-and-migration.md)
- WCAG 2.2 AA compliance
- WAI-ARIA attributes
- Full keyboard interaction table
- Screen reader support and RTL
- Migration guide from ASP.NET Web Forms

#### API Reference
📄 **Read:** [references/textbox-api.md](references/textbox-api.md)
- All properties with types, defaults, and descriptions
- All events (input, change, focus, blur, created, destroyed)
- CSS class reference table
- Enum values (InputType, FloatLabelType)
- Complete tag helper attribute syntax

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

**5. Render the TextBox:**
```cshtml
<ejs-textbox id="email" placeholder="Enter email" 
             floatLabelType="Auto" type="email">
</ejs-textbox>
```

---

### Common Patterns

#### Email with Floating Label
```cshtml
<ejs-textbox id="email" type="email" 
             floatLabelType="Auto" 
             placeholder="Email Address">
</ejs-textbox>
```

#### Password with Visibility Toggle
```cshtml
<ejs-textbox id="password" type="password" 
             showClearButton="true" 
             placeholder="Password">
</ejs-textbox>
```

#### With Icon Adornments
```cshtml
<ejs-textbox id="search" placeholder="Search..." 
             prefixIcon="e-search">
</ejs-textbox>
```

#### TextBoxFor (Model Binding)
```cshtml
@model AppModel
<ejs-textboxfor id="username" for="@Model.Username" 
                placeholder="Username">
</ejs-textboxfor>
```

---

## Range Slider

The **Range Slider** (`<ejs-slider>`) is a versatile input control that allows users to select a single value or a range of values. It supports horizontal/vertical orientation, ticks, tooltips, formatting, custom limits, and color ranges.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/range-slider-getting-started.md](references/range-slider-getting-started.md)
- NuGet package installation and setup
- Tag helper registration and script/style references
- Basic Slider rendering with `<ejs-slider>`
- Setting value, min, max
- Registering Syncfusion Script Manager

#### Types and Orientation
📄 **Read:** [references/range-slider-types-and-orientation.md](references/range-slider-types-and-orientation.md)
- Slider types: Default, MinRange, Range
- Horizontal vs vertical orientation
- Single value vs range value selection
- Visual differences and use cases

#### Tooltips and Ticks
📄 **Read:** [references/range-slider-tooltips-and-ticks.md](references/range-slider-tooltips-and-ticks.md)
- Tooltip display and placement (Before, After)
- Custom tooltip formatting
- Tick marks with `showTicks`
- Tick positioning and labels
- Small and large step ticks

#### Formatting and Limits
📄 **Read:** [references/range-slider-formatting-and-limits.md](references/range-slider-formatting-and-limits.md)
- Custom value formats (currency, percentage)
- Min/max limits
- Step values
- Dynamic range updates

#### Events and Methods
📄 **Read:** [references/range-slider-events-and-methods.md](references/range-slider-events-and-methods.md)
- Change, Input, slideStart, slideEnd events
- getValue, setValue, refresh methods
- Programmatic value management
- Event flow and patterns

#### Styling
📄 **Read:** [references/range-slider-styling.md](references/range-slider-styling.md)
- CSS customization for track and thumb
- Color ranges (e-primary, e-success, e-warning, e-danger)
- Gradient tracks
- Theme support

#### Accessibility
📄 **Read:** [references/range-slider-accessibility.md](references/range-slider-accessibility.md)
- WCAG 2.2 AA compliance
- WAI-ARIA attributes (aria-valuemin, aria-valuemax, aria-valuenow)
- Full keyboard interaction table
- Screen reader support and RTL

#### API Reference
📄 **Read:** [references/range-slider-api.md](references/range-slider-api.md)
- All properties with types, defaults, and descriptions
- All events (Change, Input, SlideStart, SlideEnd, Created, Destroyed)
- All methods (getValue, setValue, refresh, destroy)
- CSS class reference table
- Complete tag helper attribute syntax

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

**5. Render the Range Slider:**
```cshtml
<ejs-slider id="volume" min="0" max="100" value="30" type="MinRange">
</ejs-slider>
```

---

### Common Patterns

#### Default Single-Value Slider
```cshtml
<ejs-slider id="default" value="30"></ejs-slider>
```

#### MinRange Slider with Tooltip
```cshtml
<ejs-slider id="minrange" value="30" type="MinRange" 
            showButtons="true">
</ejs-slider>
```

#### Range Slider (Two Handles)
```cshtml
<ejs-slider id="range" value="@ViewBag.range" type="Range">
</ejs-slider>
```

#### Vertical Orientation
```cshtml
<div style="height: 300px;">
    <ejs-slider id="vertical" value="50" orientation="Vertical">
    </ejs-slider>
</div>
```

#### With Ticks and Tooltips
```cshtml
<ejs-slider id="tickSlider" min="0" max="100" value="40" 
            showTicks="true" tooltipPlacement="Before">
</ejs-slider>
```

---

## Signature

The **Signature** is a digital signature capture control that allows users to draw signatures on a canvas using mouse, touch, or pen input. It supports stroke customization, undo/redo, clear, save (base64, blob, image), load existing signatures, disabled/read-only states, and toolbar integration.

### Navigation Guide

#### Getting Started
📄 **Read:** [references/signature-getting-started.md](references/signature-getting-started.md)
- NuGet package installation and setup
- Tag helper registration and script/style references
- Basic Signature rendering with `<ejs-signature>`
- Canvas dimensions and styling
- Capturing signature as data URL

#### Customization
📄 **Read:** [references/signature-customization.md](references/signature-customization.md)
- `strokeColor` for line color
- `maxStrokeWidth` and `minStrokeWidth` for thickness
- `velocity` for pressure-sensitive width
- `backgroundColor` and `backgroundImage`
- `saveWithBackground` for including background

#### User Interaction
📄 **Read:** [references/signature-user-interaction.md](references/signature-user-interaction.md)
- Undo and Redo operations
- Clear canvas
- Disabled and ReadOnly states
- isEmpty and canUndo/canRedo checks
- Complete button integration example

#### Open and Save
📄 **Read:** [references/signature-open-save.md](references/signature-open-save.md)
- `getSignature()` for base64 PNG
- `saveAsBlob()` for Blob object
- `getBlob()` for raw data
- `save()` for downloading
- `load()` for restoring signatures

#### Toolbar Integration
📄 **Read:** [references/signature-toolbar-integration.md](references/signature-toolbar-integration.md)
- Syncfusion Toolbar with undo/redo/clear/save
- Button state management (canUndo, canRedo, isEmpty)
- Custom toolbar layouts
- Real-time event handling

#### Accessibility
📄 **Read:** [references/signature-accessibility.md](references/signature-accessibility.md)
- WCAG 2.2 AA compliance
- WAI-ARIA attributes
- Keyboard shortcuts (Ctrl+Z, Ctrl+Y, Ctrl+S, Delete)
- Screen reader support and RTL

#### API Reference
📄 **Read:** [references/signature-api.md](references/signature-api.md)
- All properties (strokeColor, maxStrokeWidth, backgroundColor, etc.)
- All methods (undo, redo, clear, save, load, getSignature, saveAsBlob)
- All events (change, created, destroyed)
- CSS class reference table
- Complete tag helper attribute syntax

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

**5. Render the Signature:**
```cshtml
<div class="wrap">
    <ejs-signature id="signature" strokeColor="#000000" 
                   maxStrokeWidth="2">
    </ejs-signature>
</div>

<style>
    .wrap { margin: 0 auto; width: 300px; text-align: center; }
    #signature { border: 1px solid lightgray; height: 100%; width: 100%; }
</style>
```

---

### Common Patterns

#### With Undo/Redo/Clear Buttons
```cshtml
<div class="wrap">
    <ejs-button id="undoBtn" content="Undo" disabled="true"></ejs-button>
    <ejs-button id="redoBtn" content="Redo" disabled="true"></ejs-button>
    <ejs-button id="clearBtn" content="Clear" disabled="true"></ejs-button>
    <ejs-signature id="signature" change="change"></ejs-signature>
</div>

<script>
    var signature = document.getElementById("signature").ej2_instances[0];
    
    document.getElementById("undoBtn").addEventListener('click', function () {
        if (!signature.isReadOnly && !signature.disabled) signature.undo();
    });
    document.getElementById("redoBtn").addEventListener('click', function () {
        if (!signature.isReadOnly && !signature.disabled) signature.redo();
    });
    document.getElementById("clearBtn").addEventListener('click', function () {
        if (!signature.isReadOnly && !signature.disabled) signature.clear();
    });
    
    function change() {
        document.getElementById("undoBtn").ej2_instances[0].disabled = !signature.canUndo();
        document.getElementById("redoBtn").ej2_instances[0].disabled = !signature.canRedo();
        document.getElementById("clearBtn").ej2_instances[0].disabled = signature.isEmpty();
    }
</script>
```

#### Save as Base64
```cshtml
<ejs-signature id="signature"></ejs-signature>
<ejs-button id="saveBtn" content="Save"></ejs-button>

<script>
    document.getElementById("saveBtn").addEventListener('click', function () {
        var sig = document.getElementById("signature").ej2_instances[0];
        var imageData = sig.getSignature();
        console.log('Base64:', imageData);
    });
</script>
```

#### Custom Stroke Settings
```cshtml
<ejs-signature id="signature" 
               strokeColor="#0066cc" 
               maxStrokeWidth="3" 
               minStrokeWidth="1" 
               velocity="0.5">
</ejs-signature>
```
