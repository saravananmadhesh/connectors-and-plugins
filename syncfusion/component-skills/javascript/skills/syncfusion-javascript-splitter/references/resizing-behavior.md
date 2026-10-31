# Resizing Behavior in Syncfusion TypeScript Splitter

## Table of Contents
- [Default Resizing](#default-resizing)
- [Resize Gripper](#resize-gripper)
- [Min and Max Validation](#min-and-max-validation)
- [Prevent Resizing](#prevent-resizing)
- [Resizable Property](#resizable-property)
- [Practical Examples](#practical-examples)

## Default Resizing

Resizing is **enabled by default** for all Splitter panes. Users can drag separators to adjust pane sizes.

### Resizing Behavior

- **Horizontal Splitter:** Drag separators left/right to resize adjacent panes
- **Vertical Splitter:** Drag separators up/down to resize adjacent panes
- **Adjacent Panes:** When one pane resizes, the next pane adjusts automatically
- **No Size Limits:** Panes can resize freely unless min/max constraints are set

### Basic Example

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '250px',
    width: '600px',
    paneSettings: [
        { size: '200px' },
        { size: '200px' },
        { size: '200px' }
    ]
});
splitObj.appendTo('#splitter');
```

**Result:** Users can drag separators to resize panes freely

---

## Resize Gripper

The separator includes a visual **resize gripper** (icon) that indicates the pane is resizable:

### Gripper Visual Cues

```
Horizontal Splitter:
[Pane 1]  ⟨⟨⟩⟩  [Pane 2]
          ↑
       Gripper (resize icon)

Vertical Splitter:
[Pane 1]
   ⟨⟨⟩⟩
[Pane 2]
  ↑
Gripper (resize icon)
```

### CSS Classes for Gripper

```css
/* Resize gripper container */
.e-splitter .e-split-bar .e-resize-handler {
    /* Styling for the gripper */
}

/* Horizontal split bar gripper */
.e-splitter .e-split-bar.e-split-bar-horizontal .e-resize-handler {
    color: rgba(20, 27, 233, 0.54);
}

/* Vertical split bar gripper */
.e-splitter .e-split-bar.e-split-bar-vertical .e-resize-handler {
    color: rgba(20, 27, 233, 0.54);
}
```

---

## Min and Max Validation

Enforce minimum and maximum pane sizes to prevent excessive resizing:

### Min Constraint

The `min` property prevents a pane from shrinking below a specified size:

```typescript
import { Splitter } from '@syncfusion/ej2-layouts';

let splitObj: Splitter = new Splitter({
    height: '200px',
    width: '600px',
    paneSettings: [
        { size: '200px', min: '20%', content: 'Left Pane' },
        { size: '200px', min: '30%', max: '60%', content: 'Right Pane' },
        { size: '200px' }
    ]
});
splitObj.appendTo('#splitter');
```

**Result:**
- Left Pane: Cannot shrink below 20% of container
- Right Pane: Cannot shrink below 30% or grow beyond 60%

### Max Constraint

The `max` property prevents a pane from growing beyond a specified size:

```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    width: '100%',
    paneSettings: [
        { size: '100px', max: '250px', content: 'Limited Pane' },
        { size: '500px', content: 'Main Content' }
    ]
});
splitObj.appendTo('#splitter');
```

**Result:** Limited Pane cannot exceed 250px

### Combined Min and Max

```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    width: '800px',
    paneSettings: [
        {
            size: '200px',
            min: '100px',      // Cannot shrink below 100px
            max: '350px',      // Cannot grow beyond 350px
            content: 'Sidebar'
        },
        {
            size: '600px',
            min: '450px',
            content: 'Main'
        }
    ]
});
splitObj.appendTo('#splitter');
```

### Min/Max with Percentages

```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    width: '100%',
    paneSettings: [
        { size: '25%', min: '15%', max: '40%' },
        { size: '50%', min: '40%', max: '70%' },
        { size: '25%', min: '15%', max: '40%' }
    ]
});
splitObj.appendTo('#splitter');
```

### Behavior During Resize

When user drags separator:
1. **Check min constraint:** If pane would shrink below min, stop resize
2. **Check max constraint:** If pane would grow beyond max, stop resize
3. **Allow resize:** Within valid range, resize is allowed
4. **Adjacent adjustment:** Next pane adjusts to accommodate

---

## Prevent Resizing

Disable resizing for specific panes using the `resizable` property:

### Disabling Resize for One Pane

```typescript
let splitObj: Splitter = new Splitter({
    height: '200px',
    width: '600px',
    paneSettings: [
        { size: '200px', resizable: false, content: 'Fixed Pane' },
        { size: '200px', resizable: true, content: 'Resizable Pane' },
        { size: '200px', content: 'Default (Resizable)' }
    ]
});
splitObj.appendTo('#splitter');
```

**Result:**
- First pane separator: No drag capability (fixed)
- Second pane: Can be resized
- Third pane: Can be resized

### Condition for Resizing

**Important Rule:** Resizing between two panes requires:
- Current pane's `resizable` must be `true`
- Adjacent pane's `resizable` must be `true`

```typescript
let splitObj: Splitter = new Splitter({
    height: '300px',
    width: '600px',
    paneSettings: [
        { size: '150px', resizable: false },   // Cannot resize
        { size: '150px', resizable: true },    // Can resize with right pane
        { size: '300px', resizable: false }    // Not resizable - blocks resize!
    ]
});
splitObj.appendTo('#splitter');
```

**Result:** Middle pane cannot resize with right pane because right pane has `resizable: false`

---

## Resizable Property

### Syntax

```typescript
paneSettings: [
    {
        size: '200px',
        resizable: true      // or false
    }
]
```

### Default Behavior

- Default: `resizable: true` (all panes resizable by default)
- When omitted: Pane is resizable
- Set to `false`: Pane cannot be resized

### Examples

```typescript
// All panes resizable (default)
let split1: Splitter = new Splitter({
    paneSettings: [
        { size: '200px' },
        { size: '200px' }
    ]
});

// First pane not resizable
let split2: Splitter = new Splitter({
    paneSettings: [
        { size: '200px', resizable: false },
        { size: '200px' }
    ]
});

// All panes explicitly resizable
let split3: Splitter = new Splitter({
    paneSettings: [
        { size: '200px', resizable: true },
        { size: '200px', resizable: true },
        { size: '200px', resizable: true }
    ]
});
```

---

## Practical Examples

### Example 1: IDE Layout with Constraints

```typescript
let splitObj: Splitter = new Splitter({
    height: '600px',
    width: '100%',
    paneSettings: [
        {
            size: '200px',
            min: '150px',
            max: '300px',
            resizable: true,
            content: 'File Explorer'
        },
        {
            size: '500px',
            min: '350px',
            resizable: true,
            content: 'Code Editor'
        },
        {
            size: '150px',
            min: '100px',
            max: '250px',
            resizable: true,
            content: 'Terminal'
        }
    ]
});
splitObj.appendTo('#splitter');
```

**Result:** All panes resizable with min/max constraints

### Example 2: Fixed Sidebar + Resizable Content

```typescript
let splitObj: Splitter = new Splitter({
    height: '100%',
    width: '100%',
    paneSettings: [
        {
            size: '200px',
            resizable: false,  // Fixed width sidebar
            content: 'Navigation'
        },
        {
            min: '300px',
            resizable: true,   // Flexible main content
            content: 'Main Area'
        }
    ]
});
splitObj.appendTo('#splitter');
```

**Result:** Sidebar stays fixed, main content resizable

### Example 3: Dashboard with Loose Constraints

```typescript
let splitObj: Splitter = new Splitter({
    height: '400px',
    width: '100%',
    paneSettings: [
        {
            size: '20%',
            min: '15%',
            max: '35%',
            content: 'Sidebar'
        },
        {
            size: '80%',
            min: '65%',
            content: 'Dashboard'
        }
    ]
});
splitObj.appendTo('#splitter');
```

**Result:** Wide resize range for responsive design

### Example 4: Three-Pane Responsive Layout

```typescript
let splitObj: Splitter = new Splitter({
    height: '500px',
    width: '100%',
    paneSettings: [
        {
            size: '22%',
            min: '18%',
            max: '35%',
            resizable: true,
            content: 'Filters'
        },
        {
            size: '56%',
            min: '50%',
            resizable: true,
            content: 'Content'
        },
        {
            size: '22%',
            min: '18%',
            max: '35%',
            resizable: true,
            content: 'Details'
        }
    ]
});
splitObj.appendTo('#splitter');
```

**Result:** Balanced layout with proportional constraints

---

## Summary

- **Default:** Resizing enabled for all panes
- **Resize gripper:** Visual icon indicates resizable separator
- **Min constraint:** Prevents shrinking below limit
- **Max constraint:** Prevents growing beyond limit
- **Prevent resize:** Set `resizable: false` (both panes must allow!)
- **Percentages:** Use '%' format for responsive sizes
- **Both panes:** Resizing requires both panes to have `resizable: true`
