# Menu Methods and Public API Reference

## Overview

The Syncfusion Menu component provides a comprehensive set of public methods for programmatic control and manipulation. These methods enable developers to dynamically manage menu items, control visibility, handle navigation, and respond to user interactions programmatically.

## Core Lifecycle Methods

### dataBind
Applies all pending property changes immediately to the Menu component without waiting for the next render cycle.

**Signature:**
```csharp
public void dataBind()
```

**Returns:** `void`

**Use Cases:**
- Force immediate UI updates after dynamic property changes
- Synchronize multiple dependent changes
- Ensure data consistency in real-time applications

**Example:**
```html
@{
  var Menu = Html.EJS().Menu("menu");
  Menu.Items(items =>
  {
    items.Add().Text("Dashboard");
    items.Add().Text("Settings");
  }).Render();
}

<script>
  // Get menu instance
  var menuObj = document.getElementById('menu').ej2_instances[0];
  
  // Modify properties
  menuObj.cssClass = 'custom-styling';
  menuObj.enableRtl = false;
  
  // Apply changes immediately
  menuObj.dataBind();
</script>
```

### refresh
Applies all pending property changes and re-renders the entire Menu component.

**Signature:**
```csharp
public void refresh()
```

**Returns:** `void`

**Use Cases:**
- Complete UI refresh after significant data changes
- Re-initialize UI after theme changes
- Rebuild menu structure from modified data source

**Example:**
```html
@{
  var Menu = Html.EJS().Menu("dynamicMenu");
  Menu.Items(items =>
  {
    items.Add().Text("Original Item 1");
    items.Add().Text("Original Item 2");
  }).Render();
}

<script>
  var menuObj = document.getElementById('dynamicMenu').ej2_instances[0];
  
  // Update items array
  menuObj.items = [
    { text: 'Updated Item 1' },
    { text: 'Updated Item 2', 
      items: [
        { text: 'Sub Item 1' },
        { text: 'Sub Item 2' }
      ]
    },
    { text: 'Updated Item 3' }
  ];
  
  // Refresh entire component
  menuObj.refresh();
</script>
```

### destroy
Destroys the Menu widget and releases all resources.

**Signature:**
```csharp
public void destroy()
```

**Returns:** `void`

**Use Cases:**
- Cleanup before removing menu from DOM
- Prevent memory leaks in single-page applications
- Reset component state completely

**Example:**
```html
<div id="menu"></div>

<script>
  var menuObj = document.getElementById('menu').ej2_instances[0];
  
  // Cleanup menu before removal
  function removeMenu() {
    menuObj.destroy();
    document.getElementById('menu').remove();
  }
  
  // Call cleanup
  document.getElementById('deleteButton').addEventListener('click', removeMenu);
</script>
```

### getRootElement
Returns the root HTML element of the Menu component.

**Signature:**
```csharp
public HTMLElement getRootElement()
```

**Returns:** `HTMLElement` - The wrapper element containing the entire menu structure

**Use Cases:**
- Access menu DOM for custom styling
- Integrate with third-party DOM libraries
- Programmatic DOM manipulation and inspection

**Example:**
```html
@{
  var Menu = Html.EJS().Menu("mainMenu");
  Menu.Items(items =>
  {
    items.Add().Text("File");
    items.Add().Text("Edit");
    items.Add().Text("View");
  }).Render();
}

<script>
  var menuObj = document.getElementById('mainMenu').ej2_instances[0];
  
  // Get root element
  var rootElement = menuObj.getRootElement();
  
  // Apply custom styling or classes
  rootElement.classList.add('premium-theme');
  rootElement.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  
  // Get computed dimensions
  var height = rootElement.offsetHeight;
  var width = rootElement.offsetWidth;
  console.log(`Menu dimensions: ${width}x${height}px`);
</script>
```

## Item Management Methods

### enableItems
Enable or disable specific menu items dynamically.

**Signature:**
```csharp
public void enableItems(string[] items, bool enable, bool isUniqueId = false)
```

**Parameters:**
- `items`: Array of item text values or unique IDs to modify
- `enable`: `true` to enable, `false` to disable items
- `isUniqueId` (*optional*): Set `true` if items array contains unique IDs instead of text values

**Returns:** `void`

**Use Cases:**
- Conditional menu item availability based on user permissions
- Disable menu items during async operations
- Progressive feature enablement based on application state

**Example: Enable/Disable by Text**
```html
@{
  var Menu = Html.EJS().Menu("userMenu");
  Menu.Items(items =>
  {
    items.Add().Text("Dashboard");
    items.Add().Text("Administration");
    items.Add().Text("Reports");
    items.Add().Text("Settings");
  }).Render();
}

<script>
  var menuObj = document.getElementById('userMenu').ej2_instances[0];
  
  // Simulate role-based access
  var userRole = 'user'; // Can be 'user', 'admin', or 'guest'
  
  if (userRole === 'guest') {
    // Disable restricted features for guests
    menuObj.enableItems(['Administration', 'Reports'], false);
  } else if (userRole === 'admin') {
    // Enable all features for admins
    menuObj.enableItems(['Dashboard', 'Administration', 'Reports', 'Settings'], true);
  }
</script>
```

**Example: Enable/Disable by Unique ID**
```html
<script>
  var menuObj = document.getElementById('userMenu').ej2_instances[0];
  
  // Using unique IDs for more reliable identification
  var itemIds = ['id_admin', 'id_reports'];
  
  // Disable items by ID
  menuObj.enableItems(itemIds, false, true);
  
  // Enable specific admin features after authentication
  setTimeout(() => {
    menuObj.enableItems(itemIds, true, true);
  }, 2000);
</script>
```

### hideItems
Hide specific menu items from view.

**Signature:**
```csharp
public void hideItems(string[] items, bool isUniqueId = false)
```

**Parameters:**
- `items`: Array of item text values or unique IDs to hide
- `isUniqueId` (*optional*): Set `true` if items array contains unique IDs

**Returns:** `void`

**Use Cases:**
- Conditionally show/hide menu sections
- Feature toggling without removing items
- Privacy-aware menu customization based on data compliance

**Example:**
```html
@{
  var Menu = Html.EJS().Menu("featureMenu");
  Menu.Items(items =>
  {
    items.Add().Text("Basic Features");
    items.Add().Text("Premium Features");
    items.Add().Text("Enterprise Features");
    items.Add().Text("Beta Features");
  }).Render();
}

<script>
  var menuObj = document.getElementById('featureMenu').ej2_instances[0];
  var subscription = 'basic'; // 'basic', 'premium', 'enterprise'
  
  // Hide features based on subscription level
  if (subscription === 'basic') {
    menuObj.hideItems(['Premium Features', 'Enterprise Features', 'Beta Features']);
  } else if (subscription === 'premium') {
    menuObj.hideItems(['Enterprise Features', 'Beta Features']);
  }
  
  // Show all features for enterprise subscribers
  if (subscription === 'enterprise') {
    menuObj.showItems(['Premium Features', 'Enterprise Features', 'Beta Features']);
  }
</script>
```

### showItems
Display hidden menu items.

**Signature:**
```csharp
public void showItems(string[] items, bool isUniqueId = false)
```

**Parameters:**
- `items`: Array of item text values or unique IDs to show
- `isUniqueId` (*optional*): Set `true` if items array contains unique IDs

**Returns:** `void`

**Use Cases:**
- Reveal previously hidden menu sections
- Feature upgrade availability
- Dynamic menu reveal based on permissions

**Example:**
```html
<script>
  var menuObj = document.getElementById('featureMenu').ej2_instances[0];
  
  // Initially hide beta features
  menuObj.hideItems(['Beta Features']);
  
  // Show beta features after user enables experimental features
  function enableBetaFeatures() {
    menuObj.showItems(['Beta Features']);
    console.log('Beta features are now available');
  }
  
  // Attach to settings toggle
  document.getElementById('betaToggle').addEventListener('change', function(e) {
    if (e.target.checked) {
      enableBetaFeatures();
    } else {
      menuObj.hideItems(['Beta Features']);
    }
  });
</script>
```

### getItemIndex
Retrieve the index position of a menu item.

**Signature:**
```csharp
public number[] getItemIndex(MenuItem item, bool isUniqueId = false)
public number[] getItemIndex(string itemId, bool isUniqueId = false)
```

**Parameters:**
- `item` or `itemId`: MenuItem object or text/ID to locate
- `isUniqueId` (*optional*): Set `true` if item parameter is a unique ID

**Returns:** `number[]` - Array of indices representing the hierarchical path to the item

**Use Cases:**
- Locate items in hierarchical menu structures
- Navigate multi-level menus programmatically
- Index-based item manipulation

**Example:**
```html
@{
  var Menu = Html.EJS().Menu("hierarchicalMenu");
  Menu.Items(items =>
  {
    items.Add().Text("File")
      .Items(subItems =>
      {
        subItems.Add().Text("New");
        subItems.Add().Text("Open");
        subItems.Add().Text("Save");
      });
    items.Add().Text("Edit")
      .Items(subItems =>
      {
        subItems.Add().Text("Cut");
        subItems.Add().Text("Copy");
        subItems.Add().Text("Paste");
      });
  }).Render();
}

<script>
  var menuObj = document.getElementById('hierarchicalMenu').ej2_instances[0];
  
  // Get index of "Save" item (nested under "File")
  var saveIndex = menuObj.getItemIndex('Save');
  console.log('Save item index:', saveIndex); // Output: [0, 2]
  
  // Get index of "Paste" item (nested under "Edit")
  var pasteIndex = menuObj.getItemIndex('Paste');
  console.log('Paste item index:', pasteIndex); // Output: [1, 2]
  
  // Use indices for navigation
  function navigateToItem(indices) {
    console.log(`Navigating to item at path: ${indices.join(' > ')}`);
  }
  
  navigateToItem(saveIndex);
</script>
```

### setItem
Update or replace a menu item.

**Signature:**
```csharp
public void setItem(MenuItem item, string id = null, bool isUniqueId = false)
```

**Parameters:**
- `item`: MenuItem object with updated properties
- `id` (*optional*): Text or ID of the item to update
- `isUniqueId` (*optional*): Set `true` if id parameter is a unique ID

**Returns:** `void`

**Use Cases:**
- Update item properties dynamically
- Change item text, icons, or appearance
- Modify item structure at runtime

**Example:**
```html
@{
  var Menu = Html.EJS().Menu("dynamicMenu");
  Menu.Items(items =>
  {
    items.Add().Text("Dashboard").Id("dashboard");
    items.Add().Text("Settings").Id("settings");
  }).Render();
}

<script>
  var menuObj = document.getElementById('dynamicMenu').ej2_instances[0];
  
  // Create updated menu item
  var updatedItem = {
    text: 'Dashboard (Updated)',
    iconCss: 'e-icons e-home',
    id: 'dashboard'
  };
  
  // Update by text
  menuObj.setItem(updatedItem, 'Dashboard');
  
  // Or update by unique ID
  var updatedSettings = {
    text: 'Advanced Settings',
    iconCss: 'e-icons e-settings',
    id: 'settings'
  };
  menuObj.setItem(updatedSettings, 'settings', true);
</script>
```

## Item Insertion and Removal Methods

### insertAfter
Insert new menu items after a specified item.

**Signature:**
```csharp
public void insertAfter(MenuItemModel[] items, string text, bool isUniqueId = false)
```

**Parameters:**
- `items`: Array of MenuItemModel objects to insert
- `text`: Text of the item after which to insert
- `isUniqueId` (*optional*): Set `true` if text parameter is a unique ID

**Returns:** `void`

**Use Cases:**
- Add menu items dynamically at specific positions
- Insert related menu groups maintaining order
- Build hierarchical menus incrementally

**Example:**
```html
@{
  var Menu = Html.EJS().Menu("dynamicMenu");
  Menu.Items(items =>
  {
    items.Add().Text("File");
    items.Add().Text("Edit");
  }).Render();
}

<script>
  var menuObj = document.getElementById('dynamicMenu').ej2_instances[0];
  
  // New items to insert
  var newItems = [
    { text: 'View' },
    { text: 'Tools' }
  ];
  
  // Insert after "Edit"
  menuObj.insertAfter(newItems, 'Edit');
  
  // Result: File -> Edit -> View -> Tools
</script>
```

### insertBefore
Insert new menu items before a specified item.

**Signature:**
```csharp
public void insertBefore(MenuItemModel[] items, string text, bool isUniqueId = false)
```

**Parameters:**
- `items`: Array of MenuItemModel objects to insert
- `text`: Text of the item before which to insert
- `isUniqueId` (*optional*): Set `true` if text parameter is a unique ID

**Returns:** `void`

**Use Cases:**
- Prepend menu items to a list
- Insert priority items at the beginning
- Add contextual menu items before existing items

**Example:**
```html
<script>
  var menuObj = document.getElementById('dynamicMenu').ej2_instances[0];
  
  // Insert new auth menu items
  var authItems = [
    { text: 'Login' },
    { text: 'Register' }
  ];
  
  // Insert before first item
  menuObj.insertBefore(authItems, 'File');
  
  // Result: Login -> Register -> File -> Edit -> View -> Tools
</script>
```

### removeItems
Remove specific menu items from the menu.

**Signature:**
```csharp
public void removeItems(string[] items, bool isUniqueId = false)
```

**Parameters:**
- `items`: Array of item text values or unique IDs to remove
- `isUniqueId` (*optional*): Set `true` if items array contains unique IDs

**Returns:** `void`

**Use Cases:**
- Remove menu items based on context
- Clean up temporary navigation items
- Modify menu structure after user actions

**Example:**
```html
@{
  var Menu = Html.EJS().Menu("contextMenu");
  Menu.Items(items =>
  {
    items.Add().Text("Dashboard");
    items.Add().Text("Reports");
    items.Add().Text("Admin Panel");
    items.Add().Text("Debug Console");
  }).Render();
}

<script>
  var menuObj = document.getElementById('contextMenu').ej2_instances[0];
  
  // Remove debug items in production
  if (window.location.hostname !== 'localhost') {
    menuObj.removeItems(['Debug Console']);
  }
  
  // Remove admin panel for regular users
  var isAdmin = false; // From authentication check
  if (!isAdmin) {
    menuObj.removeItems(['Admin Panel']);
  }
</script>
```

## Hamburger Mode Methods

### open
Opens the Menu when in hamburger/mobile mode.

**Signature:**
```csharp
public void open()
```

**Returns:** `void`

**Use Cases:**
- Programmatically open hamburger menu
- Open menu in response to custom UI elements
- Integrate with custom mobile navigation patterns

**Example:**
```html
@{
  var Menu = Html.EJS().Menu("mobileMenu");
  Menu.HamburgerMode(true)
    .Target("#hamburger-toggle")
    .Items(items =>
    {
      items.Add().Text("Home");
      items.Add().Text("Products");
      items.Add().Text("About");
    }).Render();
}

<script>
  var menuObj = document.getElementById('mobileMenu').ej2_instances[0];
  
  // Custom open trigger
  document.getElementById('customMenuButton').addEventListener('click', function() {
    menuObj.open();
  });
</script>
```

### close
Closes the Menu when in hamburger/mobile mode.

**Signature:**
```csharp
public void close()
```

**Returns:** `void`

**Use Cases:**
- Programmatically close hamburger menu
- Close menu after navigation
- Close menu on specific events

**Example:**
```html
<script>
  var menuObj = document.getElementById('mobileMenu').ej2_instances[0];
  
  // Close menu after item selection
  menuObj.addEventListener('select', function(args) {
    console.log('Selected:', args.name);
    menuObj.close(); // Auto-close after selection
  });
  
  // Or manually close on button click
  document.getElementById('closeMenuButton').addEventListener('click', function() {
    menuObj.close();
  });
</script>
```

## Event Handling Methods

## Practical Implementation Patterns

### Pattern 1: Dynamic Menu Builder
```html
@{
  var Menu = Html.EJS().Menu("dynamicBuilder");
  Menu.Items(items =>
  {
    items.Add().Text("Start");
  }).Render();
}

<script>
  var menuObj = document.getElementById('dynamicBuilder').ej2_instances[0];
  
  class DynamicMenuBuilder {
    constructor(menuInstance) {
      this.menu = menuInstance;
    }
    
    addSection(text, subItems) {
      this.menu.insertAfter([{
        text: text,
        items: subItems
      }], 'Start');
    }
    
    removeSection(text) {
      this.menu.removeItems([text]);
    }
    
    updateItem(oldText, newItem) {
      this.menu.setItem(newItem, oldText);
    }
  }
  
  var builder = new DynamicMenuBuilder(menuObj);
  builder.addSection('Tools', [
    { text: 'Settings' },
    { text: 'Help' }
  ]);
</script>
```

### Pattern 2: Role-Based Access Control
```html
<script>
  var menuObj = document.getElementById('rbacMenu').ej2_instances[0];
  
  class RoleBasedMenu {
    constructor(menuInstance) {
      this.menu = menuInstance;
      this.rolePermissions = {
        'user': ['Dashboard', 'Profile'],
        'admin': ['Dashboard', 'Profile', 'Users', 'Settings'],
        'superadmin': ['Dashboard', 'Profile', 'Users', 'Settings', 'System']
      };
    }
    
    setRole(role) {
      const allItems = ['Dashboard', 'Profile', 'Users', 'Settings', 'System'];
      const allowedItems = this.rolePermissions[role] || [];
      const restrictedItems = allItems.filter(item => !allowedItems.includes(item));
      
      // Hide restricted items
      if (restrictedItems.length > 0) {
        this.menu.hideItems(restrictedItems);
      }
      
      // Show allowed items
      if (allowedItems.length > 0) {
        this.menu.showItems(allowedItems);
      }
    }
  }
  
  var rbac = new RoleBasedMenu(menuObj);
  rbac.setRole('admin');
</script>
```

### Pattern 3: Menu State Persistence
```html
<script>
  var menuObj = document.getElementById('persistentMenu').ej2_instances[0];
  
  class PersistentMenu {
    constructor(menuInstance) {
      this.menu = menuInstance;
      this.storageKey = 'menu_state';
    }
    
    saveState(itemText) {
      const state = {
        lastSelected: itemText,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(this.storageKey, JSON.stringify(state));
    }
    
    restoreState() {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const state = JSON.parse(saved);
        console.log('Restored menu state:', state);
        return state;
      }
      return null;
    }
  }
  
  var persistent = new PersistentMenu(menuObj);
  
  menuObj.addEventListener('select', function(args) {
    persistent.saveState(args.name);
  });
  
  // Restore on page load
  window.addEventListener('load', () => {
    persistent.restoreState();
  });
</script>
```

## Best Practices

1. **Always Check Instance Availability**
   - Verify menu instance exists before calling methods
   - Use try-catch for method calls in production

2. **Use Unique IDs for Nested Items**
   - When dealing with hierarchical structures, prefer `isUniqueId: true`
   - More reliable than text-based identification

3. **Batch Updates Efficiently**
   - Group multiple changes before calling `refresh()`
   - Use `dataBind()` for smaller, targeted updates

4. **Clean Up Resources**
   - Always call `destroy()` when removing menus
   - Remove event listeners before destroying

5. **Handle Asynchronous Operations**
   - Call `disable()` during async operations
   - Enable items after operations complete

6. **Test Cross-Browser Compatibility**
   - Menu methods may have slight variations in older browsers
   - Test visibility and enable methods across browsers

7. **Performance Optimization**
   - Use `hideItems()` instead of `removeItems()` for temporary hiding
   - Batch multiple insertions before refresh

8. **Accessibility**
   - Ensure menu state changes are announced
   - Use semantic HTML attributes alongside method calls

## Related Sections

- [Events and User Interactions](events-and-user-interactions.md)
- [Menu Items and Data Binding](menu-items-and-data-binding.md)
- [Customization and Styling](customization-and-styling.md)
- [Orientation and Accessibility](orientation-and-accessibility.md)
- [API Reference](api-reference.md)

## Additional Resources

- [Syncfusion Menu API Documentation](https://www.syncfusion.com/documentation/blazor/menu/api-menu/)
- [Menu Component Samples](https://gitlab.syncfusion.com/syncfusion-blazor/blazor-samples)
- [Menu Events Reference](events-and-user-interactions.md#7-events-documentation)
