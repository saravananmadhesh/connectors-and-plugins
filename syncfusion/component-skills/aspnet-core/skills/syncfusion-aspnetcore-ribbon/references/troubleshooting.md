# Troubleshooting

## Table of Contents

- [Common Issues](#common-issues)
- [Rendering Problems](#rendering-problems)
- [Data Binding Issues](#data-binding-issues)
- [Event Handling Issues](#event-handling-issues)
- [Styling Problems](#styling-problems)
- [Performance Optimization](#performance-optimization)
- [Debugging Tips](#debugging-tips)

## Common Issues

### Issue: Ribbon Not Appearing

**Symptoms:**
- Ribbon HTML not visible on page
- No errors in browser console

**Solutions:**

1. **Verify Tag Helper Registration**
   ```csharp
   // _ViewImports.cshtml
   @addTagHelper *, Syncfusion.EJ2  // Must be present
   ```

2. **Check License Registration**
   ```csharp
   // Program.cs
   using Syncfusion.Licensing;
   
   var builder = WebApplication.CreateBuilder(args);
   SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");
   ```

3. **Verify CSS and Script References**
   ```html
   <!-- _Layout.cshtml -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2@24.2.3/Material.css">
   <script src="https://cdn.jsdelivr.net/npm/@syncfusion/ej2@24.2.3/dist/ej2.min.js"></script>
   ```

4. **Check Ribbon ID**
   ```razor
   <!-- Must have unique ID -->
   <ejs-ribbon id="ribbon">  <!-- id required -->
       <!-- Content -->
   </ejs-ribbon>
   ```

### Issue: TagHelper Not Recognized

**Symptoms:**
- Red squiggly lines under `<ejs-ribbon>`
- Intellisense not working

**Solutions:**

1. **Add to _ViewImports.cshtml**
   ```csharp
   @using Syncfusion.EJ2
   @using Syncfusion.EJ2.Ribbon
   @addTagHelper *, Syncfusion.EJ2
   ```

2. **Install NuGet Package**
   ```bash
   dotnet add package Syncfusion.EJ2.AspNet.Core
   ```

3. **Clean and Rebuild**
   ```bash
   dotnet clean
   dotnet build
   ```

### Issue: License Warning in Console

**Symptoms:**
- Warning message about license in browser console

**Solutions:**

```csharp
// Program.cs
using Syncfusion.Licensing;

var builder = WebApplication.CreateBuilder(args);

// Register license
SyncfusionLicenseProvider.RegisterLicense("YOUR_LICENSE_KEY");

var app = builder.Build();
```

## Rendering Problems

### Issue: Ribbon Items Not Displaying

**Symptoms:**
- Ribbon shows but items are empty
- Groups visible but no buttons

**Solutions:**

1. **Verify Collection/Item Structure**
   ```razor
   <!-- Correct structure -->
   <e-ribbon-groups>
       <e-ribbon-group header="Clipboard">
           <e-ribbon-collections>
               <e-ribbon-collection>
                   <e-ribbon-items>
                       <e-ribbon-item type=Button>
                           <!-- Item config -->
                       </e-ribbon-item>
                   </e-ribbon-items>
               </e-ribbon-collection>
           </e-ribbon-collections>
       </e-ribbon-group>
   </e-ribbon-groups>
   ```

2. **Check Item Type**
   ```razor
   <!-- type attribute is required -->
   <e-ribbon-item type=Button>  <!-- or CheckBox, DropDown, etc -->
       <!-- Settings -->
   </e-ribbon-item>
   ```

3. **Verify Settings are Present**
   ```razor
   <!-- Must include settings for the item type -->
   <e-ribbon-item type=Button>
       <e-ribbon-buttonsettings content="Click Me"></e-ribbon-buttonsettings>
   </e-ribbon-item>
   ```

### Issue: Icons Not Displaying

**Symptoms:**
- Icon squares or blank spaces
- No visual icon

**Causes and Solutions:**

1. **Wrong Icon Class Format**
   ```razor
   <!-- Incorrect -->
   <e-ribbon-buttonsettings iconCss="copy"></e-ribbon-buttonsettings>
   
   <!-- Correct -->
   <e-ribbon-buttonsettings iconCss="e-icons e-copy"></e-ribbon-buttonsettings>
   ```

2. **Missing Icon Font CSS**
   ```html
   <!-- Ensure this is in _Layout.cshtml -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2@24.2.3/Material.css">
   <!-- This CSS includes the icon font -->
   ```

3. **Icon Class Reference**
   | Icon | CSS Class |
   |------|-----------|
   | Copy | `e-icons e-copy` |
   | Cut | `e-icons e-cut` |
   | Paste | `e-icons e-paste` |
   | Bold | `e-icons e-bold` |
   | Italic | `e-icons e-italic` |
   | Underline | `e-icons e-underline` |
   | Image | `e-icons e-image` |
   | Table | `e-icons e-table` |

### Issue: Layout Not Switching

**Symptoms:**
- Classic/Simplified toggle doesn't work
- Can't switch between layouts

**Solutions:**

```razor
<!-- Enable layout switching -->
<ejs-ribbon id="ribbon" 
    hideLayoutSwitcher=false  <!-- Must be false -->
    activeLayout="Classic">   <!-- Set initial layout -->
    <!-- Content -->
</ejs-ribbon>
```

## Data Binding Issues

### Issue: Dropdown Items Not Showing

**Symptoms:**
- Dropdown empty or showing nothing
- No items in popup

**Solutions:**

1. **Verify Data Source is Provided**
   ```razor
   @{
       var menuOptions = new List<MenuItem>() { 
           new MenuItem { Text = "Option 1" },
           new MenuItem { Text = "Option 2" }
       };
   }

   <e-ribbon-item type=DropDown>
       <e-ribbon-dropdownsettings items=menuOptions></e-ribbon-dropdownsettings>
   </e-ribbon-item>
   ```

2. **Check MenuItem Structure**
   ```csharp
   var menuItems = new List<MenuItem>() { 
       new MenuItem { Text = "Save", IconCss = "e-icons e-save" },
       new MenuItem { Text = "Open", IconCss = "e-icons e-open" }
   };
   ```

3. **Verify ComboBox Data Type**
   ```razor
   @{
       var fontList = new List<string> { "Arial", "Courier", "Georgia" };
   }

   <e-ribbon-item type=ComboBox>
       <e-ribbon-comboboxsettings dataSource=fontList></e-ribbon-comboboxsettings>
   </e-ribbon-item>
   ```

### Issue: ViewBag Data Not Accessible

**Symptoms:**
- ViewBag variable is null
- NullReferenceException in Razor

**Solutions:**

1. **Set ViewBag in Controller**
   ```csharp
   public IActionResult Index()
   {
       ViewBag.MenuOptions = new List<MenuItem>() { 
           new MenuItem { Text = "Item 1" },
           new MenuItem { Text = "Item 2" }
       };
       return View();
   }
   ```

2. **Access in Razor View**
   ```razor
   <e-ribbon-item type=DropDown>
       <e-ribbon-dropdownsettings items=@ViewBag.MenuOptions></e-ribbon-dropdownsettings>
   </e-ribbon-item>
   ```

3. **Null Check**
   ```razor
   @{
       var menuItems = ViewBag.MenuOptions as List<MenuItem> ?? new List<MenuItem>();
   }

   <e-ribbon-item type=DropDown>
       <e-ribbon-dropdownsettings items=menuItems></e-ribbon-dropdownsettings>
   </e-ribbon-item>
   ```

## Event Handling Issues

### Issue: Tab Selected Event Not Firing

**Symptoms:**
- Event handler not called
- Break point not hit

**Solutions:**

1. **Verify Event Handler Name**
   ```razor
   <!-- Correct syntax -->
   <ejs-ribbon id="ribbon" tabSelected="onTabSelected">
       <!-- Content -->
   </ejs-ribbon>

   <script>
       function onTabSelected(args) {
           console.log('Tab selected:', args.tabIndex);
       }
   </script>
   ```

2. **Check Handler is in Global Scope**
   ```html
   <!-- ❌ Wrong - function inside DOMContentLoaded -->
   <script>
       document.addEventListener('DOMContentLoaded', function() {
           function onTabSelected(args) { }  // Local scope!
       });
   </script>

   <!-- ✅ Correct - function in global scope -->
   <script>
       function onTabSelected(args) {
           console.log('Tab selected');
       }
   </script>
   ```

3. **Verify Ribbon Initialization**
   ```razor
   <!-- Wait for ribbon to initialize -->
   <ejs-ribbon id="ribbon" created="ribbonCreated" tabSelected="onTabSelected">
       <!-- Content -->
   </ejs-ribbon>

   <script>
       function ribbonCreated(args) {
           console.log('Ribbon initialized');
       }
   </script>
   ```

### Issue: ItemClick Event Not Working

**Symptoms:**
- Item click handler not called
- No response to clicks

**Solutions:**

```razor
<ejs-ribbon id="ribbon" itemClick="onItemClick">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
            <e-ribbon-groups>
                <e-ribbon-group header="Clipboard">
                    <e-ribbon-collections>
                        <e-ribbon-collection>
                            <e-ribbon-items>
                                <e-ribbon-item type=Button id="copyBtn">
                                    <e-ribbon-buttonsettings iconCss="e-icons e-copy" content="Copy"></e-ribbon-buttonsettings>
                                </e-ribbon-item>
                            </e-ribbon-items>
                        </e-ribbon-collection>
                    </e-ribbon-collections>
                </e-ribbon-group>
            </e-ribbon-groups>
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    function onItemClick(args) {
        console.log('Item clicked:', args.item.id);
        // Handle item click
        if (args.item.id === 'copyBtn') {
            // Copy functionality
        }
    }
</script>
```

## Styling Problems

### Issue: Theme CSS Not Applied

**Symptoms:**
- Ribbon looks unstyled
- Different colors than expected

**Solutions:**

1. **Verify CSS URL**
   ```html
   <!-- Check CDN URL is correct -->
   <link rel="stylesheet" 
         href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2@24.2.3/Material.css">
   ```

2. **Check CSS Load Order**
   ```html
   <!-- CSS must be in head, before scripts -->
   <head>
       <link rel="stylesheet" href="...ej2.css">
       <!-- Other CSS -->
   </head>
   <body>
       <!-- Content -->
       <script src="...ej2.min.js"></script>
   </body>
   ```

3. **Browser DevTools Check**
   - Open F12 Inspector
   - Check Network tab - verify CSS loads (200 status)
   - Check Styles tab - verify CSS rules applied

### Issue: Custom CSS Overrides Not Working

**Symptoms:**
- Custom styles ignored
- Defaults apply instead

**Solutions:**

```html
<style>
    /* Use !important if needed, but sparingly */
    .e-ribbon {
        background-color: #f5f5f5 !important;
    }
    
    .e-ribbon-tab {
        color: #333 !important;
    }
    
    /* Increase specificity */
    div.e-ribbon .e-ribbon-tab {
        padding: 10px 15px;
    }
</style>
```

### Issue: Dark Mode Not Working

**Symptoms:**
- Dark mode classes not applied
- Colors not changing

**Solutions:**

```razor
<!-- Apply class to html element -->
<html class="dark-mode">  <!-- Add dark-mode class -->
    <!-- Content -->
</html>

<style>
    :root {
        --ribbon-bg: #f5f5f5;
    }

    :root.dark-mode {
        --ribbon-bg: #2d2d2d;
    }

    .e-ribbon {
        background-color: var(--ribbon-bg);
    }
</style>

<script>
    function toggleDarkMode() {
        document.documentElement.classList.toggle('dark-mode');
    }
</script>
```

## Performance Optimization

### Issue: Ribbon Slow to Load

**Solutions:**

1. **Minimize Items**
   ```razor
   <!-- Instead of many buttons per collection -->
   <!-- Use dropdowns and galleries -->
   <e-ribbon-item type=DropDown>
       <e-ribbon-dropdownsettings items=manyItems></e-ribbon-dropdownsettings>
   </e-ribbon-item>
   ```

2. **Lazy Load Tabs**
   ```razor
   <ejs-ribbon id="ribbon">
       <e-ribbon-tabs>
           <e-ribbon-tab header="Home">
               <!-- Load immediately -->
           </e-ribbon-tab>
           <e-ribbon-tab header="Advanced" visible=false>
               <!-- Can be hidden initially -->
           </e-ribbon-tab>
       </e-ribbon-tabs>
   </ejs-ribbon>
   ```

3. **Defer Script Loading**
   ```html
   <script src="...ej2.min.js" defer></script>
   ```

### Issue: High Memory Usage

**Solutions:**

1. **Destroy Unused Ribbons**
   ```javascript
   function cleanupRibbon() {
       var ribbonObj = document.getElementById('ribbon').ej2_instances[0];
       ribbonObj.destroy();
   }
   ```

2. **Avoid Excessive Refreshes**
   ```javascript
   // ❌ Bad - multiple refreshes
   for (let i = 0; i < 100; i++) {
       ribbonObj.refresh();
   }

   // ✅ Good - single refresh
   ribbonObj.refresh();
   ```

## Debugging Tips

### Enable Console Logging

```razor
<ejs-ribbon id="ribbon" 
    created="logRibbonCreated"
    tabSelected="logTabSelected"
    itemClick="logItemClick">
    <!-- Content -->
</ejs-ribbon>

<script>
    function logRibbonCreated(args) {
        console.log('✓ Ribbon created', args);
    }

    function logTabSelected(args) {
        console.log('✓ Tab selected:', args.tabIndex);
    }

    function logItemClick(args) {
        console.log('✓ Item clicked:', args.item);
    }
</script>
```

### Browser Developer Tools

1. **Console Tab**
   - Check for JavaScript errors
   - Use console.log for debugging

2. **Network Tab**
   - Verify CSS/JS files load (status 200)
   - Check file sizes reasonable

3. **Elements Tab**
   - Inspect ribbon HTML structure
   - Check CSS applied correctly
   - Verify data attributes

4. **Styles Tab**
   - Review applied CSS rules
   - Check computed styles
   - Verify no conflicting CSS

### Common Debug Patterns

```razor
<!-- Add debugging attributes -->
<ejs-ribbon id="ribbon" data-test="main-ribbon">
    <e-ribbon-tabs>
        <e-ribbon-tab header="Home" id="homeTab" data-test="home-tab">
            <!-- Content -->
        </e-ribbon-tab>
    </e-ribbon-tabs>
</ejs-ribbon>

<script>
    // Check element exists
    var ribbonEl = document.getElementById('ribbon');
    console.log('Ribbon element exists:', !!ribbonEl);
    
    // Check instance created
    var ribbonObj = ribbonEl.ej2_instances[0];
    console.log('Ribbon instance:', ribbonObj);
    
    // Check properties
    console.log('Active tab:', ribbonObj.selectedTab);
    console.log('Is minimized:', ribbonObj.isMinimized);
</script>
```

---
