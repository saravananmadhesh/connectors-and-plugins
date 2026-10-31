# Accessibility — MultiColumn ComboBox

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [High Contrast Mode](#high-contrast-mode)

---

## WCAG 2.2 Compliance

### Overview

The MultiColumn ComboBox component implements WCAG 2.2 Level AA accessibility standards:

- **Perceivable**: Text is readable, colors have sufficient contrast
- **Operable**: Keyboard accessible, sufficient time for interactions
- **Understandable**: Labels and instructions are clear
- **Robust**: Compatible with assistive technologies

### Color Contrast

Ensure sufficient contrast ratio (minimum 4.5:1 for normal text, 3:1 for large text):

```cshtml
<style>
/* Text on background */
.e-multicolumncombobox {
    color: #333;  /* Dark text on light background = 12.63:1 ratio */
    background: #fff;
}

/* Selected text */
.e-multicolumncombobox .e-active {
    color: #fff;  /* White text on blue = 6.8:1 ratio */
    background: #0066cc;
}

/* Input field */
.e-multicolumncombobox .e-input-group {
    border-color: #666;  /* Dark border for visibility */
}
</style>
```

### Text Sizing

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<style>
/* Accessible font sizing */
.e-multicolumncombobox {
    font-size: 16px;  /* Minimum 16px for mobile */
}

.e-multicolumncombobox .e-grid .e-gridcontent .e-rowcell {
    font-size: 14px;
    line-height: 1.5;
    padding: 8px;
}

/* Line height for readability */
.e-multicolumncombobox .e-ddl-header {
    line-height: 1.6;
}
</style>
```

---

## ARIA Attributes

### Semantic Markup

```cshtml
<div>
    <label for="employee-combo" id="combo-label">
        Select an Employee
    </label>
    
    <ejs-multicolumncombobox id="employee-combo"
        dataSource="@ViewBag.employees"
        popupHeight="300px">
        <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
        <e-multicolumncombobox-columns>
            <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
            <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
            <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
        </e-multicolumncombobox-columns>
    </ejs-multicolumncombobox>
    
    <span id="combo-help" class="sr-only">
        Use arrow keys to navigate. Press Enter to select. Press Escape to close.
    </span>
</div>

<style>
/* Screen reader only text */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
</style>
```

### Grid Column Headers

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="Employee ID" width="60px" 
            ariaLabel="Employee ID"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Full Name" width="150px"
            ariaLabel="Full Name"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Job Title" width="120px"
            ariaLabel="Job Title"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Department" header="Department" width="120px"
            ariaLabel="Department"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

---

## Keyboard Navigation

### Built-In Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Arrow Down` | Move to next item, open dropdown if closed |
| `Arrow Up` | Move to previous item |
| `Enter` | Select current item, close dropdown |
| `Escape` | Close dropdown, clear selection |
| `Home` | Move to first item |
| `End` | Move to last item |
| `Page Down` | Move to next page of items |
| `Page Up` | Move to previous page of items |
| `Tab` | Move to next control |
| `Shift+Tab` | Move to previous control |
| `Alt+Down` | Open dropdown |
| `Alt+Up` | Close dropdown |

### Keyboard Shortcut Documentation

```cshtml
<div>
    <label for="combo">Select Employee</label>
    <ejs-multicolumncombobox id="combo"
        dataSource="@ViewBag.employees"
        popupHeight="300px"
        placeholder="Press Alt+Down to open">
        <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
        <e-multicolumncombobox-columns>
            <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
            <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        </e-multicolumncombobox-columns>
    </ejs-multicolumncombobox>
    
    <p class="keyboard-help">
        <strong>Keyboard shortcuts:</strong> Arrow keys to navigate, Enter to select, Escape to close
    </p>
</div>
```

### Custom Keyboard Handlers

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    keyDown="onKeyDown"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onKeyDown(args) {
    // Announce selected value to screen reader
    if (args.keyCode === 13) {  // Enter key
        let combo = document.getElementById('combo').ej2_instances[0];
        if (combo.value) {
            let announcement = `Selected: ${combo.text}`;
            announceToScreenReader(announcement);
        }
    }
}

function announceToScreenReader(message) {
    let announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    
    setTimeout(() => announcement.remove(), 3000);
}
</script>
```

---

## Screen Reader Support

### NVDA/JAWS Compatibility

```cshtml
<div class="combo-container" role="region" aria-labelledby="combo-region-title">
    <h2 id="combo-region-title">Employee Selection</h2>
    
    <label for="employee-combo">Choose an employee:</label>
    <ejs-multicolumncombobox id="employee-combo"
        dataSource="@ViewBag.employees"
        popupHeight="300px">
        <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
        <e-multicolumncombobox-columns>
            <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
            <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
            <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
        </e-multicolumncombobox-columns>
    </ejs-multicolumncombobox>
</div>
```

### Announce Changes

```javascript
let combo = document.getElementById('employee-combo').ej2_instances[0];

combo.change = function(args) {
    // Create a live region update for screen readers
    let liveRegion = document.getElementById('combo-live-region') || 
        createLiveRegion();
    
    liveRegion.textContent = `Employee ${args.itemData.EmployeeName} selected. ` +
        `ID: ${args.itemData.EmployeeID}, ` +
        `Designation: ${args.itemData.Designation}`;
};

function createLiveRegion() {
    let region = document.createElement('div');
    region.id = 'combo-live-region';
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.className = 'sr-only';
    document.body.appendChild(region);
    return region;
}
```

---

## Focus Management

### Clear Focus Indicators

```css
/* Visible focus outline */
.e-multicolumncombobox:focus {
    outline: 3px solid #0066cc;
    outline-offset: 2px;
}

/* Input field focus */
.e-multicolumncombobox .e-input-group:focus-within {
    border-color: #0066cc;
    box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

/* Grid row focus */
.e-multicolumncombobox .e-grid .e-rowcell:focus {
    outline: 2px solid #0066cc;
    outline-offset: -2px;
}
```

### Focus Trap in Dropdown

```javascript
let combo = document.getElementById('employee-combo').ej2_instances[0];
let inputElement = combo.inputElement;

// Trap focus when dropdown is open
combo.open = function() {
    setTimeout(() => {
        let gridRows = combo.gridSettings.gridInstance.contentModule.getRows();
        if (gridRows.length > 0) {
            gridRows[0].focus();
        }
    }, 100);
};

combo.close = function() {
    inputElement.focus();
};
```

### Skip Links

```cshtml
<a href="#main-content" class="skip-link">Skip to main content</a>

<nav>
    <ejs-multicolumncombobox id="combo"
        dataSource="@ViewBag.employees"
        popupHeight="300px">
        <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
        <e-multicolumncombobox-columns>
            <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
            <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        </e-multicolumncombobox-columns>
    </ejs-multicolumncombobox>
</nav>

<main id="main-content">
    <!-- Main content here -->
</main>

<style>
.skip-link {
    position: absolute;
    top: -40px;
    left: 0;
    background: #0066cc;
    color: white;
    padding: 8px;
    text-decoration: none;
}

.skip-link:focus {
    top: 0;
}
</style>
```

---

## High Contrast Mode

### Support High Contrast

```css
@media (prefers-contrast: more) {
    .e-multicolumncombobox {
        border-width: 2px;
        border-color: #000;
    }
    
    .e-multicolumncombobox .e-active {
        border: 2px solid #000;
        background: #fff;
        color: #000;
    }
    
    .e-multicolumncombobox .e-grid .e-gridheader {
        border: 2px solid #000;
    }
}

/* Respects system preferences */
@media (prefers-color-scheme: dark) {
    .e-multicolumncombobox {
        background: #1a1a1a;
        color: #fff;
        border-color: #555;
    }
}
```

### Test High Contrast

To test high contrast mode:
1. Windows: Settings > Ease of Access > Display > High Contrast
2. macOS: System Preferences > Accessibility > Display > Increase Contrast
3. Browser DevTools: Rendering > Emulate CSS Media Feature prefers-contrast
