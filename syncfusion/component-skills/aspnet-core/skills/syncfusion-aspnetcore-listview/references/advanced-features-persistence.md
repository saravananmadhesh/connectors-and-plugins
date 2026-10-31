# Advanced Features and State Persistence

## Table of Contents
- [State Persistence](#state-persistence)
- [Animation Settings](#animation-settings)
- [Localization](#localization)
- [HTML Sanitization](#html-sanitization)
- [Deprecations and Breaking Changes](#deprecations-and-breaking-changes)
- [Performance Optimization](#performance-optimization)

## State Persistence

### EnablePersistence Property

The `enablePersistence` property persists ListView state (selection, scroll position, checked items) to browser localStorage, allowing state recovery across page refreshes or sessions:

```cshtml
<!-- Enable state persistence -->
<ejs-listview id="persistent" dataSource="@ViewBag.Items" 
    enablePersistence="true"
    showCheckBox="true">
    <e-listview-fieldsettings id="Id" text="Name" isChecked="IsChecked"></e-listview-fieldsettings>
</ejs-listview>
```

**Persisted State:**
- Selected item(s)
- Checked checkboxes
- Scroll position
- Expanded/collapsed groups
- Custom component state via `getPersistData` method

### How Persistence Works

```csharp
// User checks items
// Scrolls to position 500px
// Selects item "Product 5"
// Closes browser

// On next visit:
// ListView automatically restores:
// - Same items checked
// - Scroll position at 500px
// - Same item selected
```

### Configuring Persistence with ID

```cshtml
<!-- Use unique ID for each ListView instance -->
<div class="container">
    <h3>Wishlist (Persisted)</h3>
    <ejs-listview id="wishlist-persistent" 
        dataSource="@ViewBag.Wishlist" 
        enablePersistence="true"
        showCheckBox="true">
        <e-listview-fieldsettings id="Id" text="Name" isChecked="IsChecked"></e-listview-fieldsettings>
    </ejs-listview>
</div>

<div class="container">
    <h3>Shopping Cart (Persisted)</h3>
    <ejs-listview id="cart-persistent" 
        dataSource="@ViewBag.Cart" 
        enablePersistence="true"
        showCheckBox="true">
        <e-listview-fieldsettings id="Id" text="Name" isChecked="IsChecked"></e-listview-fieldsettings>
    </ejs-listview>
</div>

<!-- Each ListView maintains separate persistence:
     - localStorage['wishlist-persistent'] 
     - localStorage['cart-persistent']
-->
```

### Programmatic State Management

```cshtml
<button onclick="GetPersistedState()">Show Persisted State</button>
<button onclick="ClearPersistedState()">Clear Persistence</button>
<pre id="stateDisplay"></pre>

<ejs-listview id="myList" dataSource="@ViewBag.Items" 
    enablePersistence="true"
    showCheckBox="true">
    <e-listview-fieldsettings id="Id" text="Name" isChecked="IsChecked"></e-listview-fieldsettings>
</ejs-listview>

<script>
function GetPersistedState() {
    // Access localStorage directly
    let persistedData = localStorage.getItem('myList');
    document.getElementById('stateDisplay').textContent = 
        persistedData ? JSON.stringify(JSON.parse(persistedData), null, 2) : 'No data';
}

function ClearPersistedState() {
    // Remove persisted state
    localStorage.removeItem('myList');
    // Refresh ListView
    location.reload();
}
</script>
```

## Animation Settings

### AnimationSettings Property

The `animationSettings` property controls entrance and exit animations. Configure animation behavior using TagHelper syntax or C# models.

#### TagHelper Syntax

```cshtml
<!-- Define animation settings via property binding -->
<ejs-listview id="animated" dataSource="@ViewBag.Items" animation="@ViewBag.AnimationSettings">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

#### C# Code-Behind Approach

Similar to `htmlAttributes`, create animation settings in C# and bind to the view:

```csharp
// HomeController.cs
public IActionResult Index()
{
    var listViewAnimationSettings = new ListViewAnimationSettings
    {
        Effect = ListViewEffect.SlideDown,
        Duration = 400,
        Easing = "ease-in"
    };
    
    ViewBag.Items = GetItems();
    ViewBag.AnimationSettings = listViewAnimationSettings;
    
    return View();
}
```

```cshtml
<!-- View.cshtml - Bind C# model to animation property -->
<ejs-listview id="animated" dataSource="@ViewBag.Items" animation="@ViewBag.AnimationSettings">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Animation Effects

| Effect | Description | Use Case |
|--------|-------------|----------|
| `SlideDown` | Item slides down | Default, smooth entry |
| `SlideUp` | Item slides up | Smooth exit |
| `FadeIn` | Item fades in | Subtle entrance |
| `FadeOut` | Item fades out | Subtle exit |
| `None` | No animation | Performance-critical apps |

### Animation Configuration

#### Basic Configuration

```cshtml
<!-- Fully configured animation -->
<ejs-listview id="advancedAnimation" 
    dataSource="@ViewBag.Items"
    enableVirtualization="true"
    animation="@ViewBag.AnimationSettings">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

#### C# Model Configuration

```csharp
public class AnimationPresets
{
    public static ListViewAnimationSettings Fast
    {
        get => new ListViewAnimationSettings
        {
            Effect = ListViewEffect.SlideDown,
            Duration = 200,
            Easing = "ease-out"
        };
    }
    
    public static ListViewAnimationSettings Standard
    {
        get => new ListViewAnimationSettings
        {
            Effect = ListViewEffect.SlideDown,
            Duration = 400,
            Easing = "ease-in-out"
        };
    }
    
    public static ListViewAnimationSettings Slow
    {
        get => new ListViewAnimationSettings
        {
            Effect = ListViewEffect.SlideDown,
            Duration = 800,
            Easing = "ease-in"
        };
    }
}

// Usage in controller
public IActionResult Index()
{
    ViewBag.FastAnimation = AnimationPresets.Fast;
    ViewBag.StandardAnimation = AnimationPresets.Standard;
    ViewBag.SlowAnimation = AnimationPresets.Slow;
    ViewBag.Items = GetItems();
    return View();
}
```

```cshtml
<!-- Use preset animations -->
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
    
    <div>
        <h4>Fast Animation</h4>
        <ejs-listview id="fastList" dataSource="@ViewBag.Items" animation="@ViewBag.FastAnimation">
            <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
        </ejs-listview>
    </div>
    
    <div>
        <h4>Standard Animation</h4>
        <ejs-listview id="standardList" dataSource="@ViewBag.Items" animation="@ViewBag.StandardAnimation">
            <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
        </ejs-listview>
    </div>
    
    <div>
        <h4>Slow Animation</h4>
        <ejs-listview id="slowList" dataSource="@ViewBag.Items" animation="@ViewBag.SlowAnimation">
            <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
        </ejs-listview>
    </div>
    
</div>
```

<!-- Optional: Disable animation for items added later -->
<button onclick="AddItemsWithoutAnimation()">Add (No Animation)</button>

<script>
function AddItemsWithoutAnimation() {
    let listView = document.getElementById('advancedAnimation').ej2_instances[0];
    
    // Temporarily store original animation
    let originalAnimation = listView.animationSettings;
    
    // Disable animation
    listView.animationSettings.effect = 'None';
    
    // Add new items
    listView.addItem([{ Id: 11, Name: 'New Item' }], 0);
    
    // Restore animation
    listView.animationSettings = originalAnimation;
}
</script>
```

### Duration and Easing

```csharp
public class AnimationConfig
{
    // Duration in milliseconds
    public int FastAnimation = 200;    // Quick
    public int StandardAnimation = 400; // Default
    public int SlowAnimation = 800;    // Deliberate
}
```

```cshtml
<!-- Comparison of animations -->
<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px;">
    
    <!-- Fast Animation -->
    <div>
        <h4>Fast (200ms)</h4>
        <ejs-listview id="fastList" dataSource="@ViewBag.Items" animation="@ViewBag.FastAnimationConfig">
            <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
        </ejs-listview>
    </div>
    
    <!-- Standard Animation -->
    <div>
        <h4>Standard (400ms)</h4>
        <ejs-listview id="standardList" dataSource="@ViewBag.Items" animation="@ViewBag.StandardAnimationConfig">
            <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
        </ejs-listview>
    </div>
    
    <!-- Slow Animation -->
    <div>
        <h4>Slow (800ms)</h4>
        <ejs-listview id="slowList" dataSource="@ViewBag.Items" animation="@ViewBag.SlowAnimationConfig">
            <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
        </ejs-listview>
    </div>
    
</div>
```

## Localization

### Locale Property

The `locale` property sets language/region for localized strings:

```cshtml
<!-- Set locale to French -->
<ejs-listview id="frenchList" 
    dataSource="@ViewBag.Items" 
    locale="fr-FR">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

### Supported Locales

| Locale | Language | Region |
|--------|----------|--------|
| `en-US` | English | United States |
| `en-GB` | English | United Kingdom |
| `fr-FR` | French | France |
| `de-DE` | German | Germany |
| `es-ES` | Spanish | Spain |
| `ja-JP` | Japanese | Japan |
| `zh-CN` | Chinese | China (Simplified) |
| `ar-SA` | Arabic | Saudi Arabia |

### Localization Implementation

```cshtml
<!-- Multi-language support -->
<div>
    <button onclick="SetLocale('en-US')">English</button>
    <button onclick="SetLocale('fr-FR')">Français</button>
    <button onclick="SetLocale('de-DE')">Deutsch</button>
    <button onclick="SetLocale('ar-SA')">العربية</button>
</div>

<ejs-listview id="multiLocale" dataSource="@ViewBag.Items"
    locale="en-US"
    enableRtl="false">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function SetLocale(locale) {
    let listView = document.getElementById('multiLocale').ej2_instances[0];
    listView.locale = locale;
    listView.refresh();
    
    // Update RTL for Arabic
    listView.enableRtl = (locale.includes('ar'));
    listView.refresh();
}
</script>
```

## HTML Sanitization

### DisableHtmlEncode Property

By default, ListView HTML-encodes item text for security. Set `disableHtmlEncode` to allow HTML:

```cshtml
<!-- HTML-encoded (safe, default) -->
<ejs-listview id="safe" dataSource="@ViewBag.Items">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<!-- HTML NOT encoded (requires sanitization) -->
<ejs-listview id="htmlAllowed" 
    dataSource="@ViewBag.ItemsWithHtml" 
    disableHtmlEncode="true">
    <e-listview-fieldsettings id="Id" text="HtmlName"></e-listview-fieldsettings>
</ejs-listview>
```

### EnableHtmlSanitizer Property

The `enableHtmlSanitizer` property removes dangerous scripts while allowing safe HTML:

```cshtml
<!-- Sanitize HTML: Remove scripts, allow formatting -->
<ejs-listview id="sanitized" 
    dataSource="@ViewBag.ItemsWithHtml" 
    disableHtmlEncode="true"
    enableHtmlSanitizer="true">
    <e-listview-fieldsettings id="Id" text="HtmlContent"></e-listview-fieldsettings>
</ejs-listview>
```

### HTML Sanitization Example

```csharp
public class ItemWithHtml
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // Contains HTML markup
    public string HtmlContent { get; set; }
}

var items = new List<ItemWithHtml>()
{
    new ItemWithHtml 
    { 
        Id = 1, 
        Name = "Product 1",
        HtmlContent = "<b>Bold Text</b> <i>Italic</i>" // Safe
    },
    new ItemWithHtml 
    { 
        Id = 2, 
        Name = "Malicious",
        HtmlContent = "<img src=x onerror='alert(\"XSS\")'>" // Removed
    }
};
```

```cshtml
<!-- With sanitizer: Script is removed, HTML formatting preserved -->
<ejs-listview id="sanitized" 
    dataSource="@ViewBag.ItemsWithHtml" 
    disableHtmlEncode="true"
    enableHtmlSanitizer="true">
    <e-listview-fieldsettings id="Id" text="HtmlContent"></e-listview-fieldsettings>
</ejs-listview>

<!-- Result:
    <li><b>Bold Text</b> <i>Italic</i></li>
    <li><img></li> <!-- onerror removed -->
-->
```

## Deprecations and Breaking Changes

### Deprecated: `enable` Property

**Status:** Deprecated after Vol 4 2025 main release

```csharp
// ❌ DEPRECATED - Do not use
public bool enable { get; set; }

// ✅ REPLACEMENT - Use enabled instead
public bool enabled { get; set; }
```

**Migration:**

```cshtml
<!-- OLD (Deprecated) -->
<ejs-listview id="old" dataSource="@ViewBag.Items" enable="false">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<!-- NEW (Current) -->
<ejs-listview id="new" dataSource="@ViewBag.Items" enabled="false">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>
```

**Timeline:**
- Vol 4 2025: Deprecated
- Vol 1 2026: Support ending
- Vol 2 2026: Removed

### Enabled Property Behavior

```cshtml
<button onclick="ToggleEnabled()">Toggle Enabled</button>

<ejs-listview id="toggleList" dataSource="@ViewBag.Items" enabled="true">
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<script>
function ToggleEnabled() {
    let listView = document.getElementById('toggleList').ej2_instances[0];
    listView.enabled = !listView.enabled;
    
    if (!listView.enabled) {
        // Disabled state: grayed out, not interactive
        document.getElementById('toggleList').style.opacity = '0.5';
        document.getElementById('toggleList').style.pointerEvents = 'none';
    } else {
        // Enabled state: normal appearance, interactive
        document.getElementById('toggleList').style.opacity = '1';
        document.getElementById('toggleList').style.pointerEvents = 'auto';
    }
}
</script>
```

## Performance Optimization

### Combined Advanced Features

```cshtml
<!-- Optimized configuration with all features -->
<ejs-listview id="optimized" 
    dataSource="@ViewBag.Items"
    enabled="true"
    enablePersistence="true"
    enableVirtualization="true"
    locale="en-US"
    enableRtl="false"
    disableHtmlEncode="false"
    enableHtmlSanitizer="false">
    
    <e-listview-fieldsettings 
        id="Id" 
        text="Name" 
        isChecked="IsChecked">
    </e-listview-fieldsettings>
    
</ejs-listview>
```

### Performance Guidelines

| Feature | Load Time | Memory | CPU |
|---------|-----------|--------|-----|
| Persistence | Negligible | +5KB | +1% |
| Animations | +20ms | +2KB | +5% |
| Virtualization | -50% | -60% | -40% |
| HTML Sanitizer | +30ms | +3KB | +8% |
| Localization | +10ms | +10KB | +1% |

### When to Disable Features

```cshtml
<!-- Minimal performance footprint -->
<ejs-listview id="minimal" 
    dataSource="@ViewBag.Items"
    enablePersistence="false"
    enableVirtualization="false"
    enableHtmlSanitizer="false"
    animation="@ViewBag.NoAnimation">
    
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
</ejs-listview>

<!-- Best for: Small lists (< 50 items), offline-first apps, limited memory devices -->
```

### Large Dataset Strategy

```csharp
// Large dataset with optimization
public class OptimizedListController : Controller
{
    public IActionResult Index()
    {
        // Pagination: Load only visible items
        var items = GetPagedItems(pageIndex: 0, pageSize: 20);
        
        ViewBag.Items = items;
        return View();
    }
}
```

```cshtml
<!-- Virtualization + Remote Data -->
<ejs-listview id="largeList" 
    enableVirtualization="true"
    enablePersistence="true">
    
    <e-listview-fieldsettings id="Id" text="Name"></e-listview-fieldsettings>
    
    <!-- Remote data loads paginated -->
    <e-datamanager url="/api/items" adaptor="UrlAdaptor"></e-datamanager>
</ejs-listview>
```

---

**Related Topics:**
- [Events & Error Handling](events-and-error-handling.md)
- [Sorting, Filtering & Scrolling](sorting-filtering-scrolling.md)
- [Accessibility & Keyboard](accessibility-keyboard-aria.md)
