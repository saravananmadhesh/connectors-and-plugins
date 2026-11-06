# Items Configuration

## Table of Contents
- [BreadcrumbItemModel Interface](#breadcrumbitemmodel-interface)
- [Item Properties](#item-properties)
- [Creating Items](#creating-items)
- [Managing Item States](#managing-item-states)
- [Dynamic Item Updates](#dynamic-item-updates)
- [Item Accessibility](#item-accessibility)

## BreadcrumbItemModel Interface

The `BreadcrumbItemModel` interface defines the structure for each breadcrumb item. Every item in the breadcrumb's items array must conform to this interface.

```typescript
interface BreadcrumbItemModel {
  id?: string;              // Unique identifier
  text?: string;            // Display text
  url?: string;             // Navigation URL
  disabled?: boolean;       // Item state
  iconCss?: string;         // Icon CSS classes
}
```

**Key Points:**
- All properties are optional
- `text` and `url` are most commonly used
- `id` should be unique within the items array
- `disabled` controls item interactivity
- `iconCss` adds visual icons to items

## Item Properties

### id Property
**Type:** `string`

Specifies a unique identifier for the breadcrumb item. Used for programmatic access and event handling.

```typescript
const items = [
  { id: 'home-item', text: 'Home', url: '/' },
  { id: 'products-item', text: 'Products', url: '/products' },
  { id: 'current-item', text: 'Electronics', url: '/products/electronics' }
];

const breadcrumb = new Breadcrumb({ items });

// Access item by ID in event handlers
breadcrumb.itemClick = (args) => {
  if (args.item.id === 'home-item') {
    console.log('Home clicked');
  }
};
```

**Best Practices:**
- Use kebab-case or snake_case for IDs
- Make IDs descriptive and meaningful
- Ensure uniqueness across items array

### text Property
**Type:** `string`  
**Default:** `''`

Specifies the display text for the breadcrumb item. This is what users see in the UI.

```typescript
const items = [
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' }
];

const breadcrumb = new Breadcrumb({ items });
```

**Text Formatting:**
```typescript
// Simple text
{ text: 'Home', url: '/' }

// Text with special characters
{ text: 'FAQ & Support', url: '/help/faq' }

// Multi-word text
{ text: 'Shopping Cart', url: '/cart' }
```

### url Property
**Type:** `string`  
**Default:** `''`

Specifies the URL or navigation path for the breadcrumb item. Used when the item is clicked.

```typescript
const items = [
  { text: 'Home', url: '/' },              // Root
  { text: 'Products', url: '/products' },  // Category
  { text: 'New', url: '/products/new' },   // Subcategory
  { text: 'Phone', url: '/products/new/phone' }  // Product
];
```

**URL Formats:**
```typescript
// Absolute paths
{ text: 'Home', url: '/' }
{ text: 'Products', url: '/products' }

// Query parameters
{ text: 'Search', url: '/search?q=electronics' }

// Hash routes
{ text: 'Settings', url: '#/settings' }

// External URLs
{ text: 'Docs', url: 'url' }

// Empty URL (non-navigable item)
{ text: 'Current', url: '' }
```

### disabled Property
**Type:** `boolean`  
**Default:** `false`

Enable or disable a specific breadcrumb item. Disabled items cannot be clicked.

```typescript
const items = [
  { text: 'Home', url: '/', disabled: false },
  { text: 'Products', url: '/products', disabled: false },
  { text: 'Current Category', url: '/products/electronics', disabled: true }
];

const breadcrumb = new Breadcrumb({
  items: items,
  enableActiveItemNavigation: false  // Combine with this for consistency
});
```

**Visual Indicators:**
- Disabled items appear grayed out
- Cursor does not change to pointer
- Click events are not fired

**Use Cases:**
- Mark current/active page
- Prevent navigation to certain items
- Show loading or processing states

### iconCss Property
**Type:** `string`  
**Default:** `null`

Defines CSS class(es) for displaying icons in breadcrumb items. Typically used with Syncfusion icon library.

```typescript
// Using Syncfusion icons
const items = [
  { text: 'Home', url: '/', iconCss: 'e-icons e-home' },
  { text: 'Documents', url: '/docs', iconCss: 'e-icons e-folder-open' },
  { text: 'Reports', url: '/reports', iconCss: 'e-icons e-chart' }
];

const breadcrumb = new Breadcrumb({ items });
```

**Syncfusion Icon Classes:**
```typescript
// Common icons
'e-icons e-home'           // Home icon
'e-icons e-folder'         // Folder icon
'e-icons e-file'           // File icon
'e-icons e-user'           // User icon
'e-icons e-package'        // Package icon
'e-icons e-settings'       // Settings icon
'e-icons e-search'         // Search icon
'e-icons e-cart'           // Cart icon
'e-icons e-arrow-left'     // Back arrow
```

**Custom Icons with Font Awesome:**
```typescript
const items = [
  { text: 'Home', url: '/', iconCss: 'fas fa-home' },
  { text: 'Files', url: '/files', iconCss: 'fas fa-folder' },
  { text: 'Settings', url: '/settings', iconCss: 'fas fa-cog' }
];
```

**Multiple Icon Classes:**
```typescript
const items = [
  { 
    text: 'Dashboard', 
    url: '/dashboard', 
    iconCss: 'e-icons e-dashboard large-icon rotating' 
  }
];

// CSS for custom styling
.large-icon { font-size: 20px; }
.rotating { animation: rotate 2s infinite; }
```

### Image Icons

Display images instead of icons using the `iconCss` property with custom CSS classes that define background images.

```typescript
const items = [
  {
    text: 'Home',
    url: '/',
    iconCss: 'e-image-home'
  },
  {
    text: 'Documents',
    url: '/documents',
    iconCss: 'e-image-docs'
  },
  {
    text: 'Photos',
    url: '/photos',
    iconCss: 'e-image-photos'
  }
];

const breadcrumb = new Breadcrumb({
  items: items,
  enableNavigation: false
});
```

**CSS for Image Icons:**

```css
/* Define background images for breadcrumb items */
.e-breadcrumb-item .e-image-home {
  background-image: url('home.png');
  background-size: 24px 24px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
}

.e-breadcrumb-item .e-image-docs {
  background-image: url('documents.png');
  background-size: 24px 24px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
}

.e-breadcrumb-item .e-image-photos {
  background-image: url('photos.png');
  background-size: 24px 24px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
}
```

**Image Icon Sizing:**

```typescript
const items = [
  { text: 'Home', url: '/', iconCss: 'e-image-home-large' },
  { text: 'Profile', url: '/profile', iconCss: 'e-image-profile-medium' }
];
```

```css
/* Large image icon */
.e-image-home-large {
  background-image: url('home.png');
  background-size: 32px 32px;
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

/* Medium image icon */
.e-image-profile-medium {
  background-image: url('profile.png');
  background-size: 20px 20px;
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-right: 8px;
}
```

### SVG Icons

Use inline SVG or SVG sprite icons for scalable vector graphics in breadcrumb items.

```typescript
const items = [
  {
    text: 'Home',
    url: '/',
    iconCss: 'e-svg-home'
  },
  {
    text: 'Settings',
    url: '/settings',
    iconCss: 'e-svg-settings'
  },
  {
    text: 'Help',
    url: '/help',
    iconCss: 'e-svg-help'
  }
];

const breadcrumb = new Breadcrumb({
  items: items,
  enableNavigation: false
});
```

**CSS for SVG Icons:**

```css
/* SVG icon styling */
.e-breadcrumb-item .e-svg-home {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z'/%3E%3C/svg%3E");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
}

.e-breadcrumb-item .e-svg-settings {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l1.72-1.34c.15-.12.19-.34.1-.51l-1.64-2.84c-.1-.17-.32-.24-.5-.17l-2.03.81c-.42-.32-.9-.6-1.42-.82l-.3-2.16c-.04-.2-.21-.35-.41-.35h-3.28c-.2 0-.37.15-.41.35l-.3 2.16c-.52.22-1 .5-1.42.82l-2.03-.81c-.17-.07-.4 0-.5.17l-1.64 2.84c-.1.17-.05.39.1.51l1.72 1.34c-.04.3-.07.62-.07.94s.02.64.07.94l-1.72 1.34c-.15.12-.19.34-.1.51l1.64 2.84c.1.17.32.24.5.17l2.03-.81c.42.32.9.6 1.42.82l.3 2.16c.04.2.21.35.41.35h3.28c.2 0 .37-.15.41-.35l.3-2.16c.52-.22 1-.5 1.42-.82l2.03.81c.17.07.4 0 .5-.17l1.64-2.84c.1-.17.05-.39-.1-.51l-1.72-1.34zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'/%3E%3C/svg%3E");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
}

.e-breadcrumb-item .e-svg-help {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z'/%3E%3C/svg%3E");
  background-size: 24px 24px;
  background-repeat: no-repeat;
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
}
```

**SVG Sprite Icons:**

```typescript
const items = [
  { text: 'Home', url: '/', iconCss: 'e-svg-sprite icon-home' },
  { text: 'Search', url: '/search', iconCss: 'e-svg-sprite icon-search' }
];
```

```html
<!-- SVG sprite definition -->
<svg style="display: none;">
  <defs>
    <symbol id="icon-home" viewBox="0 0 24 24">
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    </symbol>
    <symbol id="icon-search" viewBox="0 0 24 24">
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    </symbol>
  </defs>
</svg>

<!-- CSS for SVG sprite -->
<style>
.e-svg-sprite {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
  fill: currentColor;
}
</style>
```

### Loading Icons

Display loading/processing icons to indicate state during data fetching or operations.

```typescript
const items = [
  { text: 'Home', url: '/', iconCss: 'e-icons e-home' },
  { text: 'Loading...', url: '', iconCss: 'e-icons e-spinner' },
  { text: 'Complete', url: '/complete', iconCss: 'e-icons e-check' }
];

const breadcrumb = new Breadcrumb({
  items: items,
  enableNavigation: false
});
```

**Animated Loading Icon CSS:**

```css
/* Spinning loader animation */
.e-breadcrumb-item .e-icons.e-spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
  margin-right: 8px;
  vertical-align: middle;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Success state icon */
.e-breadcrumb-item .e-icons.e-check {
  color: #4caf50;
  margin-right: 8px;
  vertical-align: middle;
}

/* Error state icon */
.e-breadcrumb-item .e-icons.e-error {
  color: #f44336;
  margin-right: 8px;
  vertical-align: middle;
}

/* Warning state icon */
.e-breadcrumb-item .e-icons.e-warning {
  color: #ff9800;
  margin-right: 8px;
  vertical-align: middle;
}
```

**Loading State Management:**

```typescript
class LoadingBreadcrumb {
  private breadcrumb: Breadcrumb;
  private items: BreadcrumbItemModel[];
  
  initialize(items: BreadcrumbItemModel[]) {
    this.items = items;
    this.breadcrumb = new Breadcrumb({
      items: this.items,
      enableNavigation: false
    });
    this.breadcrumb.appendTo('#breadcrumb');
  }
  
  setLoadingState(index: number) {
    this.items[index].iconCss = 'e-icons e-spinner';
    this.items[index].disabled = true;
    this.breadcrumb.dataBind();
  }
  
  setCompleteState(index: number) {
    this.items[index].iconCss = 'e-icons e-check';
    this.items[index].disabled = false;
    this.breadcrumb.dataBind();
  }
  
  setErrorState(index: number) {
    this.items[index].iconCss = 'e-icons e-error';
    this.items[index].disabled = false;
    this.breadcrumb.dataBind();
  }
}

// Usage
const loader = new LoadingBreadcrumb();
loader.initialize([
  { text: 'Step 1', url: '/step1', iconCss: 'e-icons e-check' },
  { text: 'Step 2', url: '/step2', iconCss: 'e-icons e-spinner' },
  { text: 'Step 3', url: '/step3' }
]);

// Update loading states
setTimeout(() => loader.setCompleteState(1), 2000);
```

**Loading State with Progress:**

```typescript
// Multi-step process with loading indicator
const stepsItems = [
  { text: 'Validation', iconCss: 'e-icons e-check' },
  { text: 'Processing', iconCss: 'e-icons e-spinner' },
  { text: 'Uploading', iconCss: '' },
  { text: 'Complete', iconCss: '' }
];

const breadcrumb = new Breadcrumb({
  items: stepsItems,
  enableNavigation: false,
  cssClass: 'process-tracker'
});

// Simulate multi-step process
async function executeProcess() {
  for (let i = 0; i < stepsItems.length; i++) {
    // Set current step as loading
    stepsItems[i].iconCss = 'e-icons e-spinner';
    breadcrumb.dataBind();
    
    // Simulate work
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mark as complete
    stepsItems[i].iconCss = 'e-icons e-check';
    stepsItems[i].disabled = true;
    breadcrumb.dataBind();
  }
}

executeProcess();
```

## Creating Items

### Basic Items Array

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Electronics', url: '/products/electronics' }
  ]
});
breadcrumb.appendTo('#breadcrumb');
```

### From External Data

```typescript
// Fetch from API
async function loadBreadcrumbs(userId) {
  const response = await fetch(`/api/user/${userId}/breadcrumb`);
  const data = await response.json();
  
  const breadcrumb = new Breadcrumb({ items: data.items });
  breadcrumb.appendTo('#breadcrumb');
}

// From configuration
const navConfig = {
  items: [
    { label: 'Home', path: '/' },
    { label: 'Admin', path: '/admin' },
    { label: 'Users', path: '/admin/users' }
  ]
};

const items = navConfig.items.map(item => ({
  text: item.label,
  url: item.path
}));

const breadcrumb = new Breadcrumb({ items });
```

### From URL Path

```typescript
// Parse URL and create breadcrumb items
function createBreadcrumbsFromUrl(url) {
  const segments = url.split('/').filter(s => s);
  const items = [];
  let path = '';

  // Add Home
  items.push({ text: 'Home', url: '/' });

  // Add segments
  segments.forEach((segment, index) => {
    path += '/' + segment;
    const isLast = index === segments.length - 1;
    
    items.push({
      text: segment.charAt(0).toUpperCase() + segment.slice(1),
      url: path,
      disabled: isLast
    });
  });

  return items;
}

const items = createBreadcrumbsFromUrl('/products/electronics/smartphones');
const breadcrumb = new Breadcrumb({ items });
```

### Complex Items with All Properties

```typescript
const complexItems = [
  {
    id: 'item-1',
    text: 'Dashboard',
    url: '/dashboard',
    iconCss: 'e-icons e-home',
    disabled: false
  },
  {
    id: 'item-2',
    text: 'Projects',
    url: '/projects',
    iconCss: 'e-icons e-folder',
    disabled: false
  },
  {
    id: 'item-3',
    text: 'Current Project',
    url: '/projects/project-123',
    iconCss: 'e-icons e-folder-open',
    disabled: true
  }
];

const breadcrumb = new Breadcrumb({ items: complexItems });
```

## Managing Item States

### Updating Items

```typescript
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' }
  ]
});
breadcrumb.appendTo('#breadcrumb');

// Update items array
breadcrumb.items = [
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Electronics', url: '/products/electronics' },
  { text: 'Smartphones', url: '/products/electronics/smartphones' }
];

// Refresh component to reflect changes
breadcrumb.dataBind();
```

### Disabling/Enabling Items

```typescript
// Initially with all items enabled
const breadcrumb = new Breadcrumb({
  items: [
    { text: 'Home', url: '/' },
    { text: 'Products', url: '/products' },
    { text: 'Current', url: '/products/current' }
  ]
});

// Later, disable specific item
breadcrumb.items[2].disabled = true;
breadcrumb.dataBind();

// Re-enable
breadcrumb.items[2].disabled = false;
breadcrumb.dataBind();
```

### Changing Active Item

```typescript
const breadcrumb = new Breadcrumb({
  items: [...],
  activeItem: '/products'
});

// Update active item on navigation
breadcrumb.activeItem = '/products/electronics';
breadcrumb.dataBind();
```

### Adding New Items

```typescript
// Add item to existing breadcrumb
const newItem = {
  text: 'New Section',
  url: '/new-section',
  iconCss: 'e-icons e-plus'
};

breadcrumb.items.push(newItem);
breadcrumb.dataBind();
```

### Removing Items

```typescript
// Remove by index
breadcrumb.items.splice(2, 1);
breadcrumb.dataBind();

// Remove by condition
breadcrumb.items = breadcrumb.items.filter(item => 
  item.text !== 'Unwanted Item'
);
breadcrumb.dataBind();
```

## Item Accessibility

### Semantic HTML

Items are rendered as list items for proper semantic structure:

```html
<!-- Generated HTML -->
<nav id="breadcrumb" class="e-breadcrumb">
  <ol class="e-breadcrumb-list">
    <li class="e-breadcrumb-item">
      <a href="/">Home</a>
    </li>
    <li class="e-breadcrumb-item">
      <a href="/products">Products</a>
    </li>
    <li class="e-breadcrumb-item">
      <span>Electronics</span>
    </li>
  </ol>
</nav>
```

### ARIA Labels

Add descriptive text for screen readers:

```typescript
// Using title attribute
const items = [
  { text: 'Home', url: '/', title: 'Go to home page' },
  { text: 'Products', url: '/products', title: 'View all products' }
];

// Using custom template with aria-label
const breadcrumb = new Breadcrumb({
  items: [
    { id: 'home', text: 'Home', url: '/' },
    { id: 'products', text: 'Products', url: '/products' }
  ],
  itemTemplate: (context) => {
    return `<a aria-label="Navigate to ${context.text}">${context.text}</a>`;
  }
});
```

### Disabled Item Accessibility

```typescript
const items = [
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { 
    text: 'Current Page', 
    url: '', 
    disabled: true,
    // Optional: indicate current page with aria-current
  }
];
```

---

**Next:** Learn how to customize item rendering and separators using [templates-and-customization.md](templates-and-customization.md).
