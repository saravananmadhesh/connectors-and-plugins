# Advanced Tab Features

## Table of Contents
- [State Persistence](#state-persistence)
- [Animation Configuration](#animation-configuration)
- [Localization and Internationalization](#localization-and-internationalization)
- [RTL (Right-to-Left) Support](#rtl-right-to-left-support)
- [Collapsible Tabs](#collapsible-tabs)
- [Wizard Pattern Implementation](#wizard-pattern-implementation)
- [Tab Close Button and Removal](#tab-close-button-and-removal)
- [Reordering Active Tab](#reordering-active-tab)
- [Accessibility Features](#accessibility-features)
- [Performance Optimization](#performance-optimization)

## State Persistence

Save and restore the selected tab across browser sessions using `enablePersistence`.

### Basic Persistence

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab" enablePersistence="true" selectedItem="1">
    <!-- Selected tab index is saved to browser localStorage -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content 1"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Content 2"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 3" })" content="Content 3"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

When `enablePersistence="true"`:
- Selected tab index is saved to browser localStorage with key `ej2Tab_selectedItem`
- Page reload restores the previously selected tab
- User's last selection is remembered across sessions

### Disable Persistence Conditionally

```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];

// Disable persistence programmatically
tabObj.enablePersistence = false;

// Clear persisted state
localStorage.removeItem('ej2Tab_selectedItem');
```

### Persistence with Multi-Tab Pages

For multiple Tab components, each has unique localStorage key:

```cshtml
<ejs-tab id="tab1" enablePersistence="true">
    <!-- Saves to: tab1_selectedItem -->
</ejs-tab>

<ejs-tab id="tab2" enablePersistence="true">
    <!-- Saves to: tab2_selectedItem -->
</ejs-tab>
```

## Animation Configuration

Customize animations when switching between tabs using `animation` property.

### Animation Settings

```csharp
public class TabAnimationSettings
{
    public string PreviousEffect { get; set; }     // Animation for previous tab exit
    public string NextEffect { get; set; }         // Animation for next tab enter
    public int Duration { get; set; }              // Duration in milliseconds
    public string Easing { get; set; }             // Easing function
}
```

### Available Animation Effects

Common animation effects:
- `None` - No animation
- `SlideLeftIn` - Slide from right to left (previous tab exit)
- `SlideRightIn` - Slide from left to right (next tab enter)
- `SlideLeftOut` - Slide left exit
- `SlideRightOut` - Slide right exit
- `SlideUp` - Slide from bottom to top
- `SlideDown` - Slide from top to bottom
- `Fade` - Fade in/out effect
- `FadeZoom` - Fade with zoom
- `ZoomIn` - Zoom in effect
- `ZoomOut` - Zoom out effect
- `Rotate` - Rotation effect

### Configure Animations

**C# Code-Behind:**
```csharp
@using Syncfusion.EJ2.Navigations;

@{
    // Define animation settings with correct effects
    var previousAnimation = new TabActionSettings 
    { 
        Duration = 600, 
        Easing = "ease", 
        Effect = "SlideLeftIn"  // Previous tab exit animation
    };
    
    var nextAnimation = new TabActionSettings 
    { 
        Duration = 600, 
        Easing = "ease", 
        Effect = "SlideRightIn"  // Next tab enter animation
    };
    
    var animation = new TabAnimationSettings
    {
        Previous = previousAnimation,
        Next = nextAnimation
    };
}
```
```cshtml
<ejs-tab id="ej2Tab" animation="animation">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 1" })" content="Content 1"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 2" })" content="Content 2"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Tab 3" })" content="Content 3"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

**Important:** Always use the correct effect names:
- **Previous:** `SlideLeftIn` (previous tab exits)
- **Next:** `SlideRightIn` (next tab enters)

### Dynamic Animation Control

```cshtml
<label>Select Animation:</label>
<ejs-dropdownlist id="animationSelect" dataSource="ViewBag.Effects" change="onAnimationChange"></ejs-dropdownlist>

<script>
    function onAnimationChange(args) {
        var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
        tabObj.animation.next.effect = args.value;
        tabObj.animation.previous.effect = args.value;
    }
</script>
```

## Localization and Internationalization

Support multiple languages using `locale` property.

### Set Locale

```cshtml
@using Syncfusion.EJ2.Navigations;

<!-- Set to German locale -->
<ejs-tab id="ej2Tab" locale="de">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Startseite" })" content="German content"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<!-- Set to French locale -->
<ejs-tab id="ej2Tab2" locale="fr">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Accueil" })" content="French content"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Global Locale Configuration

```javascript
// Set default locale for all Syncfusion components
ej.base.setCulture('de');
```

### Locale Codes

| Locale Code | Language | Region |
|-------------|----------|--------|
| `en` | English | - |
| `de` | German | - |
| `fr` | French | - |
| `es` | Spanish | - |
| `ja` | Japanese | - |
| `ar` | Arabic | - |
| `zh` | Chinese | - |
| `pt` | Portuguese | - |
| `ru` | Russian | - |

### Custom Locale Strings

```javascript
// Define custom locale strings
ej.base.L10n.load({
    'de': {
        'tab': {
            'closeButtonTitle': 'Tab schließen'
        }
    }
});
```

## RTL (Right-to-Left) Support

Enable RTL layout for Arabic and Hebrew using `enableRtl`.

### Enable RTL

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab" enableRtl="true" locale="ar">
    <!-- Headers and content flow right-to-left -->
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "الرئيسية" })" content="محتوى عربي"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "حول" })" content="عن الموقع"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### RTL with CSS

```css
/* Optional: Additional RTL styling */
#ej2Tab[dir="rtl"] {
    direction: rtl;
    text-align: right;
}

#ej2Tab[dir="rtl"] .e-tab-header {
    flex-direction: row-reverse;
}
```

### Global RTL

```javascript
// Enable RTL for entire application
ej.base.enableRtl(true);
```

## Collapsible Tabs

Create tabs that can collapse/expand.

### Collapsible Tab Implementation

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Section 1" })" content="
            <div class='collapse-content'>
                <p>Collapsible content here</p>
                <button onclick='toggleCollapse(0)'>Collapse</button>
            </div>
        "></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Section 2" })" content="
            <div class='collapse-content'>
                <p>Another section</p>
                <button onclick='toggleCollapse(1)'>Collapse</button>
            </div>
        "></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<script>
    function toggleCollapse(index) {
        var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
        var header = tabObj.element.querySelectorAll('.e-tab-header-item')[index];
        
        if (header.classList.contains('collapsed')) {
            header.classList.remove('collapsed');
            tabObj.select(index);
        } else {
            header.classList.add('collapsed');
        }
    }
</script>

<style>
    .e-tab-header-item.collapsed {
        opacity: 0.6;
        background-color: #f0f0f0;
    }
</style>
```

## Wizard Pattern Implementation

Create multi-step wizard using Tab with navigation.

### Wizard Tab Structure

```cshtml
@using Syncfusion.EJ2.Navigations;

<div class="wizard-container">
    <ejs-tab id="wizardTab" selectedItem="0">
        <e-tab-tabitems>
            <!-- Step 1: Information -->
            <e-tab-tabitem header="@(new TabHeader { Text = "Step 1: Information" })" content="
                <div class='wizard-content'>
                    <h3>Personal Information</h3>
                    <input type='text' placeholder='Full Name' class='form-control' />
                    <input type='email' placeholder='Email' class='form-control' />
                    <div class='wizard-buttons'>
                        <button onclick='nextStep(1)' class='btn btn-primary'>Next</button>
                    </div>
                </div>
            "></e-tab-tabitem>
            
            <!-- Step 2: Address -->
            <e-tab-tabitem header="@(new TabHeader { Text = "Step 2: Address" })" content="
                <div class='wizard-content'>
                    <h3>Address Information</h3>
                    <input type='text' placeholder='Street' class='form-control' />
                    <input type='text' placeholder='City' class='form-control' />
                    <div class='wizard-buttons'>
                        <button onclick='prevStep(0)' class='btn btn-secondary'>Back</button>
                        <button onclick='nextStep(2)' class='btn btn-primary'>Next</button>
                    </div>
                </div>
            "></e-tab-tabitem>
            
            <!-- Step 3: Review -->
            <e-tab-tabitem header="@(new TabHeader { Text = "Step 3: Review" })" content="
                <div class='wizard-content'>
                    <h3>Review Your Information</h3>
                    <p id='reviewData'>Preview here...</p>
                    <div class='wizard-buttons'>
                        <button onclick='prevStep(1)' class='btn btn-secondary'>Back</button>
                        <button onclick='submitWizard()' class='btn btn-success'>Submit</button>
                    </div>
                </div>
            "></e-tab-tabitem>
        </e-tab-tabitems>
    </ejs-tab>
</div>

<script>
    function nextStep(index) {
        var tabObj = document.getElementById('wizardTab').ej2_instances[0];
        tabObj.select(index);
    }
    
    function prevStep(index) {
        var tabObj = document.getElementById('wizardTab').ej2_instances[0];
        tabObj.select(index);
    }
    
    function submitWizard() {
        alert('Form submitted!');
    }
</script>

<style>
    .wizard-container {
        max-width: 600px;
        margin: 20px auto;
    }
    
    .wizard-content {
        padding: 20px;
    }
    
    .wizard-buttons {
        margin-top: 20px;
        display: flex;
        gap: 10px;
        justify-content: flex-end;
    }
</style>
```

## Tab Close Button and Removal

Enable users to close individual tabs with close buttons.

### Show Close Button

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab" showCloseButton="true">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Closeable Tab 1" })" content="Content"></e-tab-tabitem>
        <e-tab-tabitem header="@(new TabHeader { Text = "Closeable Tab 2" })" content="Content"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>
```

### Handle Tab Removal

```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];

// Before removal
tabObj.removing = function(args) {
    if (!confirm('Are you sure you want to close this tab?')) {
        args.cancel = true;
    }
};

// After removal
tabObj.removed = function(args) {
    console.log('Tab removed at index:', args.index);
};
```

### Programmatic Tab Removal

```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];

// Remove tab at index 1
tabObj.removeTab(1);

// Remove multiple tabs
tabObj.removeTab([0, 2]);  // Remove tabs at indices 0 and 2
```

## Reordering Active Tab

Move active tab to specific position when `reorderActiveTab` is true.

### Enable Reordering

```cshtml
@using Syncfusion.EJ2.Navigations;

<ejs-tab id="ej2Tab" reorderActiveTab="true" overflowMode="OverflowMode.Popup">
    <!-- Active tab automatically moves to visible area in popup mode -->
    <e-tab-tabitems>
        @for (int i = 1; i <= 10; i++)
        {
            <e-tab-tabitem header="@(new TabHeader { Text = $"Tab {i}" })" 
                            content="@($"Content {i}")">
            </e-tab-tabitem>
        }
    </e-tab-tabitems>
</ejs-tab>
```

When enabled:
- Active tab always visible in header area (not hidden in popup)
- Improves UX for many tabs scenario

## Accessibility Features

Implement accessibility for screen readers and keyboard navigation.

### Keyboard Navigation

The Tab component supports standard keyboard shortcuts:

| Key | Action |
|-----|--------|
| Tab | Focus next header |
| Shift+Tab | Focus previous header |
| Enter/Space | Select focused tab |
| Arrow Right/Down | Select next tab |
| Arrow Left/Up | Select previous tab |
| Home | Select first tab |
| End | Select last tab |

### ARIA Labels

```cshtml
<ejs-tab id="ej2Tab" role="tablist">
    <e-tab-tabitems>
        <e-tab-tabitem header="@(new TabHeader { Text = "Accessible Tab 1" })" content="Content"></e-tab-tabitem>
    </e-tab-tabitems>
</ejs-tab>

<script>
    // Enhanced accessibility
    var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
    var headers = tabObj.element.querySelectorAll('[role="tab"]');
    
    headers.forEach((header, index) => {
        header.setAttribute('aria-label', `Tab ${index + 1}`);
        header.setAttribute('tabindex', index === 0 ? 0 : -1);
    });
</script>
```

### Color Contrast

Ensure sufficient color contrast ratio (WCAG AA: 4.5:1 minimum):

```css
/* High contrast header styles */
.e-tab-header-item {
    color: #333333;  /* Dark text */
    background-color: #ffffff;  /* Light background */
}

.e-tab-header-item.e-active {
    color: #ffffff;  /* Light text */
    background-color: #0066cc;  /* Dark background */
}
```

## Performance Optimization

Improve Tab performance with large datasets.

### Lazy Content Loading

```javascript
var tabObj = document.getElementById('ej2Tab').ej2_instances[0];
var loadedTabs = {};

tabObj.selected = function(args) {
    if (!loadedTabs[args.index]) {
        // Load content on demand
        fetch(`/api/tab-content/${args.index}`)
            .then(response => response.json())
            .then(data => {
                args.element.innerHTML = data.html;
                loadedTabs[args.index] = true;
            });
    }
};
```

### Dynamic Mode for Memory Efficiency

```cshtml
<ejs-tab id="ej2Tab" loadOn="ContentLoad.Dynamic">
    <!-- Only active tab content in DOM -->
    <!-- Reduces memory for many large tabs -->
</ejs-tab>
```

### Virtualization for Very Large Lists

```javascript
// Cache frequently accessed tabs
var tabCache = new Map();
var MAX_CACHE_SIZE = 5;

function loadTabContent(index) {
    if (tabCache.has(index)) {
        return tabCache.get(index);
    }
    
    // Load from server
    var content = fetch(`/api/tab-content/${index}`).then(r => r.json());
    
    // Manage cache size
    if (tabCache.size >= MAX_CACHE_SIZE) {
        var firstKey = tabCache.keys().next().value;
        tabCache.delete(firstKey);
    }
    
    tabCache.set(index, content);
    return content;
}
```

---

**Next Steps:** Explore api-reference.md for complete API documentation, or SKILL.md for overview and integration checklist.
