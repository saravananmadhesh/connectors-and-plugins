# Pane Configuration and Sizing in Syncfusion TypeScript Splitter

## Table of Contents
- [Sizing Methods](#sizing-methods)
- [Pixel Format](#pixel-format)
- [Percentage Format](#percentage-format)
- [Auto-Sizing](#auto-sizing)
- [Fixed Panes](#fixed-panes)
- [Min/Max Constraints](#minmax-constraints)
- [Flexible Last Pane](#flexible-last-pane)

## Sizing Methods

The Splitter supports two methods for specifying pane sizes:

| Method | Format | Example | Use Case |
|--------|--------|---------|----------|
| **Pixel** | String with 'px' | `'200px'`, `'300px'` | Fixed dimensions |
| **Percentage** | String with '%' | `'30%'`, `'50%'` | Responsive layouts |
| **None** | Omitted | - | Auto-sizing with flex |

---

## Pixel Format Sizing

Define pane sizes in fixed pixel dimensions using the `size` property in `paneSettings`:

### Basic Pixel Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObject: Splitter = new Splitter({
    height: '250px',
    width: '600px',
    paneSettings: [
        { size: '200px' },  // First pane: 200px
        { size: '200px' },  // Second pane: 200px
        { size: '200px' }   // Third pane: 200px
    ]
});
splitObject.appendTo('#splitter');
```

### Multi-Pane Pixel Layout

```typescript
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '800px',
    paneSettings: [
        { size: '150px', content: 'Sidebar' },
        { size: '400px', content: 'Main' },
        { size: '250px', content: 'Panel' }
    ]
});
splitObject.appendTo('#splitter');
```

**Result:**
```
[Sidebar]──[     Main Content    ]──[  Panel  ]
  150px           400px                250px
```

---

## Percentage Format Sizing

Define pane sizes as percentages of the container width/height using the `size` property:

### Basic Percentage Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

// Responsive 3-column layout
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '100%',  // Full container width
    paneSettings: [
        { size: '25%' },   // 25% of container
        { size: '50%' },   // 50% of container
        { size: '25%' }    // 25% of container
    ]
});
splitObject.appendTo('#splitter');
```

### Flexible 2-Column Layout

```typescript
let splitObject: Splitter = new Splitter({
    height: '400px',
    width: '100%',
    paneSettings: [
        { size: '30%', content: 'Sidebar' },
        { size: '70%', content: 'Main Content' }
    ]
});
splitObject.appendTo('#splitter');
```

**Result:** Scales responsively with container

```
Container: 1200px  → [360px Sidebar] [840px Main]
Container: 800px   → [240px Sidebar] [560px Main]
Container: 400px   → [120px Sidebar] [280px Main]
```

---

## Auto-Sizing

Panes automatically adjust using **flex layout** when no explicit size is specified:

### Auto-Sizing Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObject: Splitter = new Splitter({
    height: '250px',
    width: '600px',
    paneSettings: [
        {},  // No size specified - auto-sizes
        {},  // No size specified - auto-sizes
        {}   // No size specified - auto-sizes
    ]
});
splitObject.appendTo('#splitter');
```

**Result:** All three panes get equal sizes (200px each in a 600px container)

### Mixed Auto and Fixed Sizing

```typescript
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '600px',
    paneSettings: [
        { size: '150px' },  // Fixed: 150px
        {},                 // Auto: expands to fill remaining space
        { size: '100px' }   // Fixed: 100px
    ]
});
splitObject.appendTo('#splitter');
```

**Result:**
```
Container: 600px
[150px Fixed] [350px Auto] [100px Fixed]
```

### When to Use Auto-Sizing

- Response to container resizing
- Equal pane distribution
- Flexible layouts with minimal constraints
- When pane should grow/shrink dynamically

---

## Fixed Panes

Create a layout where all panes have explicit fixed sizes:

### Fixed All Panes Example

```typescript
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '600px',
    paneSettings: [
        { size: '200px', content: 'Left' },
        { size: '200px', content: 'Center' },
        { size: '200px', content: 'Right' }
    ]
});
splitObject.appendTo('#splitter');
```

### Fixed with Last Pane Flexible

In fixed-pane layouts, the **last pane becomes flexible** if all others are fixed:

```typescript
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '800px',
    paneSettings: [
        { size: '150px', content: 'Sidebar' },
        { size: '200px', content: 'Navigation' },
        // Last pane has no size - becomes flexible
        { content: 'Main Content' }
    ]
});
splitObject.appendTo('#splitter');
```

**Result:**
```
Container: 800px
[150px Fixed] [200px Fixed] [450px Flexible]
```

---

## Min/Max Constraints

Enforce minimum and maximum pane sizes during resizing:

### Min Constraint (minimum)

```typescript
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '600px',
    paneSettings: [
        { size: '200px', min: '100px', content: 'Left' },
        { size: '200px', min: '100px', content: 'Right' }
    ]
});
splitObject.appendTo('#splitter');
```

**Result:** User cannot resize left pane below 100px

### Max Constraint (maximum)

```typescript
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '600px',
    paneSettings: [
        { size: '100px', max: '250px', content: 'Left' },
        { size: '500px', content: 'Right' }
    ]
});
splitObject.appendTo('#splitter');
```

**Result:** User cannot resize left pane beyond 250px

### Min/Max Combined

```typescript
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '100%',
    paneSettings: [
        { size: '25%', min: '15%', max: '40%', content: 'Sidebar' },
        { size: '75%', min: '60%', max: '85%', content: 'Main' }
    ]
});
splitObject.appendTo('#splitter');
```

**Result:**
- Sidebar: Resizable between 15% and 40%
- Main: Resizable between 60% and 85%

### Min/Max Format

Min/Max accept both **pixels** and **percentages**:

```typescript
// Pixel format
{ size: '200px', min: '100px', max: '350px' }

// Percentage format
{ size: '30%', min: '20%', max: '50%' }

// Mixed format (allowed)
{ size: '200px', min: '15%', max: '400px' }
```

---

## Flexible Last Pane

The last pane in `paneSettings` is automatically flexible if:
- Not all panes have explicit sizes specified, OR
- It's the only pane without a size

### Example 1: Last Pane Auto-Fills

```typescript
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '600px',
    paneSettings: [
        { size: '150px', content: 'Left Fixed' },
        { size: '150px', content: 'Center Fixed' },
        // Last pane: no size = flexible
        { content: 'Right Flexible' }
    ]
});
splitObject.appendTo('#splitter');
```

**Result:**
```
Container: 600px
[150px] [150px] [300px - flexible]
```

### Example 2: Mixed Fixed and Flexible

```typescript
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '800px',
    paneSettings: [
        { size: '200px', content: 'Fixed Header' },
        { content: 'Flexible Content' },  // No size
        { size: '150px', content: 'Fixed Sidebar' }
    ]
});
splitObject.appendTo('#splitter');
```

**Result:**
```
Container: 800px
[200px Fixed] [450px Flexible] [150px Fixed]
```

### Example 3: All Auto (All Flexible)

```typescript
let splitObject: Splitter = new Splitter({
    height: '300px',
    width: '600px',
    paneSettings: [
        { content: 'Pane 1' },  // Auto
        { content: 'Pane 2' },  // Auto
        { content: 'Pane 3' }   // Auto
    ]
});
splitObject.appendTo('#splitter');
```

**Result:** All panes get equal size (200px each)

---

## Practical Sizing Scenarios

### Scenario 1: Responsive Dashboard
```typescript
let splitObject: Splitter = new Splitter({
    height: '100vh',
    width: '100%',
    paneSettings: [
        { size: '20%', min: '15%', max: '35%', content: 'Navigation' },
        { size: '80%', min: '65%', content: 'Main Dashboard' }
    ]
});
```

### Scenario 2: IDE Code Editor
```typescript
let splitObject: Splitter = new Splitter({
    height: '100%',
    width: '100%',
    paneSettings: [
        { size: '200px', min: '150px', max: '300px', content: 'File Explorer' },
        { content: 'Code Editor' },  // Flexible
        { size: '250px', min: '180px', content: 'Problems/Output' }
    ]
});
```

### Scenario 3: Three-Column Layout
```typescript
let splitObject: Splitter = new Splitter({
    height: '400px',
    width: '100%',
    paneSettings: [
        { size: '22%', min: '18%', max: '35%', content: 'Filters' },
        { size: '56%', min: '50%', max: '70%', content: 'Content' },
        { size: '22%', min: '18%', max: '35%', content: 'Details' }
    ]
});
```

---

## Summary

- **Pixels:** Use `'200px'` for fixed dimensions
- **Percentages:** Use `'30%'` for responsive layouts
- **Auto-sizing:** Omit `size` property for flexible panes
- **Min constraint:** Prevent pane from shrinking below limit
- **Max constraint:** Prevent pane from growing beyond limit
- **Last pane:** Often flexible to fill remaining space
- **Mixed:** Combine fixed and flexible for complex layouts
