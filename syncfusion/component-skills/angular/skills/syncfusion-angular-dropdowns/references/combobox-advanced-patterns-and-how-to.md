# Advanced Patterns & How-To Guides

## Table of Contents
- [Autofill Suggestions](#autofill-suggestions)
- [Cascading ComboBoxes](#cascading-comboboxes)
- [Icons in Items](#icons-in-items)
- [Resizable Popup](#resizable-popup)
- [Common Real-World Patterns](#common-real-world-patterns)
- [Performance Best Practices](#performance-best-practices)
- [Troubleshooting](#troubleshooting)

---

## Autofill Suggestions

### Enable Autofill

**Use when:** You want automatic text completion as user types

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-autofill',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="languages"
      [autofill]="true"
      placeholder="Type 'j' to see autofill...">
    </ejs-combobox>
  `
})
export class AutofillComponent {
  languages = ['JavaScript', 'Java', 'jQuery', 'TypeScript', 'Python'];
}
```

**Behavior:**
- User types "j" → ComboBox suggests "JavaScript"
- User sees full suggestion highlighted
- Press Tab or click to accept suggestion
- Press Delete to reject and keep typed text

---

### How Autofill Works

```
User Input     →    Matching Item    →    Result Shown
──────────────────────────────────────────────────────
"J"            →    "JavaScript"     →    "JavaScript" (highlighted)
"Py"           →    "Python"         →    "Python" (highlighted)
"xyz"          →    No match         →    No suggestion (stays "xyz")
```

---

### Autofill with Filtering

**Combine autofill with filtering for best UX:**

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      [autofill]="true"
      [allowFiltering]="true"
      filterType="StartsWith"
      placeholder="Autofill + Filter">
    </ejs-combobox>
  `
})
export class AutofillFilterComponent {
  items = [
    'JavaScript',
    'Java',
    'jQuery',
    'TypeScript',
    'Python',
    'Perl'
  ];
}
```

**Difference:**
- **Autofill alone:** Completes whole word when you start typing
- **Autofill + Filter:** Shows matching items AND suggests completion
- **Result:** More natural autocomplete experience

---

## Cascading ComboBoxes

### Basic Cascading Pattern

**Use when:** Second dropdown depends on first (Country → State → City)

```typescript
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-cascading',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <div style="margin: 20px;">
      <h3>Address Selection</h3>
      
      <label>Country:</label>
      <ejs-combobox
        #countryCombo
        [dataSource]="countries"
        fields="{ text: 'name', value: 'code' }"
        (change)="onCountryChange()"
        placeholder="Select country">
      </ejs-combobox>
      
      <label style="margin-top: 15px;">State/Province:</label>
      <ejs-combobox
        #stateCombo
        [dataSource]="states"
        fields="{ text: 'name', value: 'code' }"
        (change)="onStateChange()"
        [enabled]="states.length > 0"
        placeholder="Select state">
      </ejs-combobox>
      
      <label style="margin-top: 15px;">City:</label>
      <ejs-combobox
        #cityCombo
        [dataSource]="cities"
        fields="{ text: 'name', value: 'code' }"
        [enabled]="cities.length > 0"
        placeholder="Select city">
      </ejs-combobox>
    </div>
  `
})
export class CascadingComponent {
  @ViewChild('countryCombo') countryCombo!: ComboBoxComponent;
  @ViewChild('stateCombo') stateCombo!: ComboBoxComponent;
  @ViewChild('cityCombo') cityCombo!: ComboBoxComponent;

  countries = [
    { code: 'US', name: 'United States' },
    { code: 'CA', name: 'Canada' },
    { code: 'IN', name: 'India' }
  ];

  states: any[] = [];
  cities: any[] = [];

  // Data structure: country → states → cities
  stateData: { [key: string]: any[] } = {
    'US': [
      { code: 'CA', name: 'California' },
      { code: 'TX', name: 'Texas' },
      { code: 'NY', name: 'New York' }
    ],
    'CA': [
      { code: 'ON', name: 'Ontario' },
      { code: 'BC', name: 'British Columbia' }
    ],
    'IN': [
      { code: 'DL', name: 'Delhi' },
      { code: 'MH', name: 'Maharashtra' }
    ]
  };

  cityData: { [key: string]: any[] } = {
    'CA': [
      { code: 'LA', name: 'Los Angeles' },
      { code: 'SF', name: 'San Francisco' }
    ],
    'TX': [
      { code: 'HOU', name: 'Houston' },
      { code: 'DAL', name: 'Dallas' }
    ],
    'NY': [
      { code: 'NYC', name: 'New York City' }
    ],
    'ON': [
      { code: 'TOR', name: 'Toronto' },
      { code: 'OTT', name: 'Ottawa' }
    ],
    'BC': [
      { code: 'VAN', name: 'Vancouver' }
    ],
    'DL': [
      { code: 'ND', name: 'New Delhi' }
    ],
    'MH': [
      { code: 'MUM', name: 'Mumbai' },
      { code: 'PUN', name: 'Pune' }
    ]
  };

  onCountryChange() {
    const country = this.countryCombo.value;
    
    // Load states for selected country
    this.states = this.stateData[country as keyof typeof this.stateData] || [];
    this.cities = []; // Reset cities
    
    // Update state ComboBox with a new array reference to trigger change detection
    this.stateCombo.dataSource = [...this.states];
    this.stateCombo.value = null;
  }

  onStateChange() {
    const state = this.stateCombo.value;
    
    // Load cities for selected state
    this.cities = this.cityData[state as keyof typeof this.cityData] || [];
    
    // Update city ComboBox
    this.cityCombo.dataSource = [...this.cities];
    this.cityCombo.value = null;
  }
}
```

**Key methods:**
- `onCountryChange()` - Load states based on country selection
- `onStateChange()` - Load cities based on state selection
- `value = null` - Reset selection when parent changes
- Assign a new array reference to `dataSource` to trigger change detection

---

### Cascading with Remote Data

```typescript
import { HttpClient } from '@angular/common/http';

@Component({
  template: `
    <ejs-combobox
      [dataSource]="countryDataManager"
      (change)="onCountryChange()">
    </ejs-combobox>
    
    <ejs-combobox
      #stateCombo
      [dataSource]="stateDataManager">
    </ejs-combobox>
  `
})
export class RemoteCascadingComponent {
  @ViewChild('stateCombo') stateCombo!: ComboBoxComponent;

  countryDataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  stateDataManager!: DataManager;

  constructor(private http: HttpClient) {}

  onCountryChange(event: any) {
    const countryId = event.itemData.id;
    
    // Create new DataManager with filtered URL
    this.stateDataManager = new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });

    // Update state ComboBox — assign new DataManager reference to trigger reload
    this.stateCombo.dataSource = this.stateDataManager;
    this.stateCombo.value = null;
  }
}
```

---

### Anti-Pattern: What NOT to Do

```typescript
// ❌ Wrong: Modifying array directly without notifying ComboBox
this.states.push(newState);  // ComboBox doesn't know about change

// ✅ Correct: Create new array reference
this.states = [...this.states, newState];

// ❌ Wrong: Not resetting child when parent changes
onCountryChange() {
  this.states = newStates;
  // City still has old value
}

// ✅ Correct: Reset child dropdowns and assign new references
onCountryChange() {
  this.states = [...newStates];              // New array reference
  this.stateCombo.dataSource = this.states;  // Trigger reload
  this.cityCombo.value = null;               // Reset city selection
  this.cities = [];                          // Clear cities list
}
```

---

## Icons in Items

### Add Icons to List Items

**Use when:** Visual indicators help users identify items (programming languages, file types, etc.)

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="languages"
      fields="{ text: 'name', value: 'code', iconCss: 'icon' }"
      placeholder="Select language"
      itemTemplate="itemTemplate">
      
      <ng-template #itemTemplate let-data>
        <div style="display: flex; align-items: center; gap: 10px;">
          <span [ngClass]="data.icon"></span>
          <span>{{ data.name }}</span>
          <small style="color: #999;">{{ data.version }}</small>
        </div>
      </ng-template>
    </ejs-combobox>
  `,
  styles: [`
    :host ::ng-deep {
      .icon-js { color: #f7df1e; }
      .icon-py { color: #3776ab; }
      .icon-java { color: #007396; }
    }
  `]
})
export class IconsComponent {
  languages = [
    { code: 'js', name: 'JavaScript', icon: 'icon-js', version: 'ES2024' },
    { code: 'py', name: 'Python', icon: 'icon-py', version: '3.12' },
    { code: 'java', name: 'Java', icon: 'icon-java', version: '21' },
    { code: 'ts', name: 'TypeScript', icon: 'icon-ts', version: '5.4' }
  ];
}
```

---

### Using Emoji as Icons

```typescript
languages = [
  { code: 'js', name: 'JavaScript', emoji: '⚙️' },
  { code: 'py', name: 'Python', emoji: '🐍' },
  { code: 'java', name: 'Java', emoji: '☕' },
  { code: 'rust', name: 'Rust', emoji: '🦀' }
];

template: `
  <ng-template #itemTemplate let-data>
    <span style="font-size: 18px; margin-right: 8px;">{{ data.emoji }}</span>
    {{ data.name }}
  </ng-template>
`
```

---

### Using Font Awesome or Material Icons

```typescript
languages = [
  { code: 'js', name: 'JavaScript', iconClass: 'fab fa-js' },
  { code: 'py', name: 'Python', iconClass: 'fab fa-python' },
  { code: 'java', name: 'Java', iconClass: 'fab fa-java' }
];

template: `
  <ng-template #itemTemplate let-data>
    <i [ngClass]="data.iconClass" style="margin-right: 8px; width: 20px;"></i>
    {{ data.name }}
  </ng-template>
`

// In main.ts or global styles, include Font Awesome CSS:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

---

## Resizable Popup

### Enable Popup Resizing

**Use when:** Users need to resize dropdown to see more content

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent, ComboBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-resizable',
  standalone: true,
  imports: [CommonModule, ComboBoxModule],
  template: `
    <ejs-combobox
      [dataSource]="items"
      [allowResize]="true"
      placeholder="Drag popup border to resize...">
    </ejs-combobox>
    
    <p style="margin-top: 20px; color: #999; font-size: 12px;">
      💡 Tip: Click and drag the bottom-right corner of the dropdown to resize
    </p>
  `
})
export class ResizableComponent {
  items = Array.from({ length: 100 }, (_, i) => `Item ${i + 1}`);
}
```

**Behavior:**
- Resize handle appears at bottom-right corner
- Drag to adjust width and height
- Size persists across sessions (browser storage)
- Great for long item names or descriptions

---

### Resize with Templates

**Use when:** Items have long text and need manual height adjustment**

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="products"
      fields="{ text: 'name', value: 'id' }"
      [allowResize]="true"
      itemTemplate="itemTemplate"
      placeholder="Resize to see full description">
      
      <ng-template #itemTemplate let-data>
        <div style="padding: 10px;">
          <strong>{{ data.name }}</strong>
          <div style="font-size: 12px; color: #666;">
            {{ data.description }}
          </div>
          <div style="font-size: 11px; color: #999; margin-top: 5px;">
            ${{ data.price }}
          </div>
        </div>
      </ng-template>
    </ejs-combobox>
  `
})
export class ResizeTemplateComponent {
  products = [
    {
      id: 1,
      name: 'Laptop Pro',
      description: 'High-performance laptop with 16GB RAM and SSD storage',
      price: 1299
    },
    {
      id: 2,
      name: 'External Monitor',
      description: '4K Ultra HD monitor with USB-C connectivity and built-in speakers',
      price: 499
    }
  ];
}
```

---

## Common Real-World Patterns

### Pattern 1: Search with Recent Items

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="displayItems"
      [allowFiltering]="true"
      (filtering)="onFilter($event)"
      placeholder="Search or view recent...">
    </ejs-combobox>
  `
})
export class RecentItemsComponent {
  allItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
  recentItems = ['Item 1', 'Item 2'];
  displayItems = this.recentItems;

  onFilter(args: any) {
    if (!args.text) {
      // Show recent items when empty
      this.displayItems = this.recentItems;
    } else {
      // Show filtered items
      this.displayItems = this.allItems.filter(item =>
        item.toLowerCase().includes(args.text.toLowerCase())
      );
    }
    args.updateData(this.displayItems);
  }
}
```

---

### Pattern 2: Live Search from API

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="dataManager"
      [allowFiltering]="true"
      [debounceDelay]="500"
      fields="{ text: 'productName', value: 'productId' }"
      (filtering)="onFilter($event)"
      placeholder="Search products...">
    </ejs-combobox>
  `
})
export class LiveSearchComponent {
  dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor()
  });

  onFilter(args: FilteringEventArgs) {
    // DataManager handles the API call automatically
    // Just let it update with filtered results
  }
}
```

---

### Pattern 3: Multi-Level Grouping with Cascading

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="categories"
      fields="{ text: 'name', value: 'id', groupBy: 'type' }"
      (change)="onCategoryChange()">
    </ejs-combobox>
    
    <ejs-combobox
      [dataSource]="products"
      fields="{ text: 'name', value: 'id', groupBy: 'category' }"
      placeholder="Select product">
    </ejs-combobox>
  `
})
export class MultiLevelGroupComponent {
  categories = [
    { id: 1, name: 'Electronics', type: 'Tech' },
    { id: 2, name: 'Clothing', type: 'Fashion' }
  ];

  products: any[] = [];

  onCategoryChange(event: any) {
    const categoryId = event.itemData.id;
    this.products = this.loadProducts(categoryId);
  }

  private loadProducts(categoryId: number) {
    // Load products for category
    return [];
  }
}
```

---

## Performance Best Practices

### 1. Virtual Scrolling for Large Lists

```typescript
<ejs-combobox
  [dataSource]="largeDataSet"
  [enableVirtualization]="true"
  placeholder="Handles 10000+ items efficiently">
</ejs-combobox>
```

---

### 2. Debounce Remote Requests

```typescript
<ejs-combobox
  [dataSource]="dataManager"
  [allowFiltering]="true"
  [debounceDelay]="800"
  placeholder="Wait 800ms before requesting data">
</ejs-combobox>
```

---

## Troubleshooting

### Issue: Cascading dropdown not updating

**Cause:** Array reference not changed, so Angular change detection does not trigger a ComboBox update

**Fix:**
```typescript
onCountryChange() {
  // Assign a new array reference to trigger change detection
  this.states = [...newStates];
  this.stateCombo.dataSource = this.states;
  this.stateCombo.value = null;
}
```

---

### Issue: Icons not showing

**Cause:** CSS not imported or class names incorrect

**Fix:**
```typescript
// Verify iconCss field maps to actual CSS class
fields = { text: 'name', value: 'id', iconCss: 'iconClass' }

// Ensure CSS is loaded
import 'path/to/font-awesome.css';
```

---

### Issue: Resize handle not appearing

**Cause:** `allowResize` not enabled

**Fix:**
```typescript
<ejs-combobox
  [allowResize]="true"  // Add this
  [dataSource]="items">
</ejs-combobox>
```

---

### Issue: Autofill too aggressive / not working

**Cause:** Interaction with filtering settings

**Fix:**
```typescript
// Autofill works best without filtering
<ejs-combobox
  [autofill]="true"
  [allowFiltering]="false">  // Disable filtering if using autofill
</ejs-combobox>

// Or combine carefully
<ejs-combobox
  [autofill]="true"
  [allowFiltering]="true"
  filterType="StartsWith">  // Use same matching logic
</ejs-combobox>
```

---

Your advanced patterns are now mastered! Return to [SKILL.md](../SKILL.md) for a complete overview or [Feature Configuration](../feature-configuration.md) for more options.
