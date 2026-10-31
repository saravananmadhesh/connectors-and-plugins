# Data Binding and Field Mapping

## Table of Contents
- [Hierarchical JSON Data](#hierarchical-json-data)
- [Self-Referential Data](#self-referential-data)
- [Data Service Integration](#data-service-integration)
- [Field Settings Configuration](#field-settings-configuration)
- [HTML Element Binding](#html-element-binding)
- [Large Dataset Handling](#large-dataset-handling)

## Hierarchical JSON Data

Bind menu items directly from hierarchical JSON data:

```typescript
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';

// JSON data in hierarchical structure
let hierarchicalData: MenuItemModel[] = [
    {
        text: 'Appliances',
        items: [
            {
                text: 'Kitchen',
                items: [
                    { text: 'Electric Cookers' },
                    { text: 'Coffee Makers' },
                    { text: 'Blenders' }
                ]
            },
            {
                text: 'Television',
                items: [
                    { text: 'Our Exclusive TVs' },
                    { text: 'Smart TVs' }
                ]
            }
        ]
    },
    {
        text: 'Accessories',
        items: [
            {
                text: 'Mobile',
                items: [
                    { text: 'Headphones' },
                    { text: 'Memory Cards' },
                    { text: 'Power Banks' }
                ]
            }
        ]
    }
];

let menuObj: Menu = new Menu({ items: hierarchicalData }, '#menu');
```

### Custom Hierarchical Structure

When your JSON doesn't match the MenuItemModel structure, use `fields` to map fields:

```typescript
interface CustomMenuItem {
    name: string;
    children?: CustomMenuItem[];
    icon?: string;
}

let customData: CustomMenuItem[] = [
    {
        name: 'Fashion',
        children: [
            { name: 'Men', icon: 'male-icon' },
            { name: 'Women', icon: 'female-icon' }
        ]
    }
];

let menuObj: Menu = new Menu({
    items: customData,
    fields: { text: 'name', children: 'children' }
}, '#menu');
```

## Self-Referential Data

For flat data structures with parent-child relationships:

```typescript
interface MenuItem {
    id: number;
    text: string;
    parentId: number | null;
    iconCss?: string;
}

let selfReferentialData: MenuItem[] = [
    { id: 1, text: 'File', parentId: null },
    { id: 2, text: 'New', parentId: 1 },
    { id: 3, text: 'Open', parentId: 1 },
    { id: 4, text: 'Save', parentId: 1 },
    { id: 5, text: 'Exit', parentId: 1 },
    { id: 6, text: 'Edit', parentId: null },
    { id: 7, text: 'Cut', parentId: 6 },
    { id: 8, text: 'Copy', parentId: 6 },
    { id: 9, text: 'Paste', parentId: 6 }
];

let menuObj: Menu = new Menu({
    items: selfReferentialData,
    fields: {
        text: 'text',
        parentId: 'parentId',
        itemId: 'id',
        children: 'items'
    }
}, '#menu');
```

**Use self-referential data when:**
- Data comes from a database with parent-child relationships
- You need to flatten hierarchies
- Processing recursive JSON structures

## Data Service Integration

Bind menu items from a REST API or service:

```typescript
import { Menu } from '@syncfusion/ej2-navigations';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

let menuObj: Menu = new Menu({
    items: new DataManager({
        url: 'url',
        adaptor: new UrlAdaptor()
    }),
    fields: {
        text: 'name',
        children: 'items'
    }
}, '#menu');
```

### Real-World Service Example

```typescript
// Service that fetches menu data
class MenuDataService {
    private apiUrl = 'url';

    async getMenuItems(): Promise<any[]> {
        const response = await fetch(this.apiUrl);
        return response.json();
    }
}

// Using the service
let service = new MenuDataService();
let menuData: any[] = await service.getMenuItems();

let menuObj: Menu = new Menu({
    items: menuData,
    fields: {
        text: 'label',
        children: 'submenu'
    }
}, '#menu');
```

## Field Settings Configuration

The `FieldSettingsModel` maps custom field names to menu item properties:

```typescript
interface FieldSettingsModel {
    text?: string | string[];          // Display text field
    children?: string | string[];      // Child items field
    itemId?: string | string[];        // Item ID field
    parentId?: string | string[];      // Parent ID field
    iconCss?: string | string[];       // Icon CSS field
    separator?: string | string[];     // Separator field
    url?: string | string[];           // URL field
}
```

### Examples with Different Field Names

```typescript
// Example 1: CamelCase to snake_case
let data = [
    { title: 'Home', sub_items: [] },
    { title: 'About', sub_items: [] }
];

let menu1: Menu = new Menu({
    items: data,
    fields: { text: 'title', children: 'sub_items' }
}, '#menu1');

// Example 2: Multiple field name options
let data2 = [
    { label: 'File', 'sub-menu': [] },
    { label: 'Edit', 'sub-menu': [] }
];

let menu2: Menu = new Menu({
    items: data2,
    fields: { text: 'label', children: 'sub-menu' }
}, '#menu2');

// Example 3: Complex mapping
let data3 = [
    {
        menuName: 'Products',
        productId: 'prod-1',
        icon: 'e-icons e-shopping-cart',
        nested: [
            { menuName: 'Electronics', productId: 'elect-1', icon: 'e-icons e-laptop' }
        ]
    }
];

let menu3: Menu = new Menu({
    items: data3,
    fields: {
        text: 'menuName',
        itemId: 'productId',
        iconCss: 'icon',
        children: 'nested'
    }
}, '#menu3');
```

## HTML Element Binding

Create menu items from HTML `<ul>` and `<li>` elements:

```html
<!DOCTYPE html>
<html>
<head>
    <link href="url" rel="stylesheet" />
</head>
<body>
    <ul id="menu">
        <li class="e-menu-item">
            <span>File</span>
            <ul>
                <li class="e-menu-item"><span>Open</span></li>
                <li class="e-menu-item"><span>Save</span></li>
                <li class="e-menu-item"><span>Exit</span></li>
            </ul>
        </li>
        <li class="e-menu-item">
            <span>Edit</span>
            <ul>
                <li class="e-menu-item"><span>Cut</span></li>
                <li class="e-menu-item"><span>Copy</span></li>
                <li class="e-menu-item"><span>Paste</span></li>
            </ul>
        </li>
    </ul>

    <script src="url"></script>
    <script>
        var menuObj = new ej.navigations.Menu({}, '#menu');
    </script>
</body>
</html>
```

### HTML with Icons

```html
<ul id="menu">
    <li class="e-menu-item">
        <span class="e-icons e-file"></span>
        <span>File</span>
        <ul>
            <li class="e-menu-item">
                <span class="e-icons e-folder-open"></span>
                <span>Open</span>
            </li>
            <li class="e-menu-item">
                <span class="e-icons e-save"></span>
                <span>Save</span>
            </li>
        </ul>
    </li>
</ul>
```

## Large Dataset Handling

For menus with many items, optimize performance:

### 1. Use Scrollable Menus

```typescript
let largeData: MenuItemModel[] = generateLargeDataset(1000);

let menuObj: Menu = new Menu({
    items: largeData,
    enableScrolling: true  // Enable scrolling for performance
}, '#menu');
```

### 2. Limit Initial Display with Separators

```typescript
let menuItems: MenuItemModel[] = [
    {
        text: 'Category A',
        items: getFirstNItems(50)  // Show first 50
    },
    {
        text: 'Category B',
        items: getFirstNItems(50)  // Show first 50
    },
    // ... more categories
];

let menuObj: Menu = new Menu({
    items: menuItems,
    enableScrolling: true
}, '#menu');
```

### 3. Lazy Loading with Dynamic Data

```typescript
let menuObj: Menu = new Menu({
    items: initialData,
    beforeOpen: (args: BeforeOpenCloseMenuEventArgs) => {
        // Load data on demand when submenu opens
        if (args.item && !args.item.items) {
            args.item.items = loadDataForItem(args.item.text);
        }
    }
}, '#menu');
```

### 4. Virtual Scrolling (for very large lists)

```typescript
let hugeData: MenuItemModel[] = generateHugeDataset(10000);

let menuObj: Menu = new Menu({
    items: hugeData,
    enableScrolling: true,
    // Add CSS for height constraint
}, '#menu');

// Add CSS to limit display height
document.getElementById('menu').style.maxHeight = '300px';
document.getElementById('menu').style.overflowY = 'auto';
```

## Best Practices for Data Binding

1. **Validate Data Structure**: Ensure your data matches the expected format
2. **Use Field Mapping**: Always explicitly define field mappings for custom data
3. **Handle Null Values**: Gracefully handle missing or null data
4. **Optimize for Performance**: Use scrolling for large datasets
5. **Cache Remote Data**: Don't fetch data on every render
6. **Use IDs**: Always include unique IDs for data manipulation
7. **Handle Errors**: Implement error handling for data loading

## Common Data Binding Scenarios

### Scenario 1: Product Categories from API

```typescript
interface ApiProduct {
    categoryId: number;
    categoryName: string;
    parentCategoryId: number | null;
    icon: string;
}

let productData: ApiProduct[] = await fetchFromAPI();

let menuObj: Menu = new Menu({
    items: productData,
    fields: {
        text: 'categoryName',
        itemId: 'categoryId',
        parentId: 'parentCategoryId',
        iconCss: 'icon'
    }
}, '#menu');
```

### Scenario 2: Hierarchical Database Records

```typescript
// Database returns flat records
let dbRecords = [
    { id: 1, title: 'Products', parent: 0 },
    { id: 2, title: 'Electronics', parent: 1 },
    { id: 3, title: 'Phones', parent: 2 }
];

let menuObj: Menu = new Menu({
    items: dbRecords,
    fields: {
        text: 'title',
        itemId: 'id',
        parentId: 'parent'
    }
}, '#menu');
```

### Scenario 3: Multi-Language Support

```typescript
interface MultiLangItem {
    id: string;
    textEN: string;
    textES: string;
    children?: MultiLangItem[];
}

let language = 'EN'; // or 'ES'
let fieldName = language === 'EN' ? 'textEN' : 'textES';

let menuObj: Menu = new Menu({
    items: multiLangData,
    fields: { text: fieldName, children: 'children' }
}, '#menu');
```
