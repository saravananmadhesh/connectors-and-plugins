# Resizing Behavior

This guide covers the Ribbon's automatic resizing behavior, which adjusts item sizes based on available space to maintain usability in different window sizes.

## Table of Contents

- [Resizing Overview](#resizing-overview)
- [Classic Layout Resizing](#classic-layout-resizing)
- [Simplified Layout Resizing](#simplified-layout-resizing)
- [Defining Allowed Sizes](#defining-allowed-sizes)
- [Setting Active Size](#setting-active-size)
- [Constant Item Sizes](#constant-item-sizes)
- [Understanding Size Transitions](#understanding-size-transitions)
- [Complete Examples](#complete-examples)

## Resizing Overview

The Ribbon automatically resizes items to fit available space:

**Size levels:**
- **Large**: Icon (32x32) + text below (most space)
- **Medium**: Icon (20x20) + text beside (balanced)
- **Small**: Icon only (16x16) (minimal space)

**Behavior:**
- Items start at their preferred size
- As width decreases, items transition to smaller sizes
- As width increases, items return to larger sizes
- Maintains usability at all sizes

**Layout differences:**
- **Classic layout**: Supports Large, Medium, and Small
- **Simplified layout**: Supports only Medium and Small (Large → Medium)

## Classic Layout Resizing

In Classic layout, items transition through three sizes:

### Default Resizing Behavior

```typescript
import { Ribbon, RibbonItemType } from "@syncfusion/ej2-ribbon";

let ribbon: Ribbon = new Ribbon({
    activeLayout: "Classic",
    tabs: [{
        header: "Home",
        groups: [{
            header: "Clipboard",
            collections: [{
                items: [{
                    type: RibbonItemType.Button,
                    // No size specified - will resize automatically
                    buttonSettings: {
                        content: "Paste",
                        iconCss: "e-icons e-paste"
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Cut",
                        iconCss: "e-icons e-cut"
                    }
                }, {
                    type: RibbonItemType.Button,
                    buttonSettings: {
                        content: "Copy",
                        iconCss: "e-icons e-copy"
                    }
                }]
            }]
        }]
    }]
});

ribbon.appendTo("#ribbon");
```

**Automatic transitions:**
1. Wide window: All items display as Large
2. Reduce width: Items transition Large → Medium
3. Reduce more: Items transition Medium → Small
4. Increase width: Items transition back Small → Medium → Large

## Simplified Layout Resizing

In Simplified layout, items transition between two sizes:

**Key points:**
- Large size not supported in Simplified layout
- Items start at Medium size
- Items transition Medium → Small as width decreases
- Items with Large activeSize automatically become Medium

## Defining Allowed Sizes

Control which sizes an item can transition to:

### Allow All Sizes (Classic Layout)

```typescript
import { RibbonItemSize } from "@syncfusion/ej2-ribbon";

{
    type: RibbonItemType.Button,
    allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
    buttonSettings: {
        content: "Save",
        iconCss: "e-icons e-save"
    }
}
```

### Allow Medium and Small Only

```typescript
{
    type: RibbonItemType.Button,
    allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
    buttonSettings: {
        content: "Copy",
        iconCss: "e-icons e-copy"
    }
}
```

### Mixed Size Configuration

```typescript
let tabs = [{
    header: "Home",
    groups: [{
        header: "Actions",
        collections: [{
            items: [{
                // Important action - allow all sizes
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
                buttonSettings: {
                    content: "Save",
                    iconCss: "e-icons e-save",
                    isPrimary: true
                }
            }, {
                // Secondary action - Medium and Small only
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
                buttonSettings: {
                    content: "Undo",
                    iconCss: "e-icons e-undo"
                }
            }, {
                // Tertiary action - Small only
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Small,
                buttonSettings: {
                    iconCss: "e-icons e-more-vertical"
                }
            }]
        }]
    }]
}];
```

## Setting Active Size

Define the initial size for items:

### Start at Large Size

```typescript
{
    type: RibbonItemType.Button,
    activeSize: RibbonItemSize.Large, // Initial size
    allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
    buttonSettings: {
        content: "Print",
        iconCss: "e-icons e-print"
    }
}
```

### Start at Medium Size

```typescript
{
    type: RibbonItemType.Button,
    activeSize: RibbonItemSize.Medium,
    allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
    buttonSettings: {
        content: "Export",
        iconCss: "e-icons e-export"
    }
}
```

**Use cases:**
- `Large`: Emphasize primary commands
- `Medium`: Balanced visibility for common commands
- `Small`: Minimize space for less-used commands

## Constant Item Sizes

Prevent items from resizing by setting a single allowed size:

### Always Large

```typescript
{
    type: RibbonItemType.Button,
    allowedSizes: RibbonItemSize.Large, // Fixed at Large
    buttonSettings: {
        content: "Save",
        iconCss: "e-icons e-save",
        isPrimary: true
    }
}
```

### Always Small

```typescript
{
    type: RibbonItemType.Button,
    allowedSizes: RibbonItemSize.Small, // Fixed at Small (icon only)
    buttonSettings: {
        iconCss: "e-icons e-settings"
    }
}
```

**Use cases:**
- Fixed Large: Critical commands that should always be prominent
- Fixed Medium: Consistent sizing for related items
- Fixed Small: Minimize space for utility buttons

## Understanding Size Transitions

How the Ribbon determines when to resize items:

### Transition Logic

```typescript
// Example: 3 items with different priorities
let tabs = [{
    header: "Home",
    groups: [{
        header: "Actions",
        collections: [{
            items: [{
                // Priority 1: Resizes first
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Large,
                buttonSettings: { content: "Save" }
            }, {
                // Priority 2: Resizes second
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Large,
                buttonSettings: { content: "Print" }
            }, {
                // Priority 3: Resizes last (fixed Large)
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Large,
                activeSize: RibbonItemSize.Large,
                buttonSettings: { content: "Delete", isPrimary: true }
            }]
        }]
    }]
}];
```

**Transition sequence (width decreasing):**
1. Wide window: All items Large
2. Width reduces: "Save" → Medium, others Large
3. Width reduces: "Save" → Small, "Print" → Medium, "Delete" Large
4. Width reduces: "Print" → Small, "Delete" Large (fixed)

**Transition sequence (width increasing):**
1. Narrow window: "Save" Small, "Print" Small, "Delete" Large
2. Width increases: "Print" → Medium
3. Width increases: "Save" → Medium
4. Width increases: "Save" → Large
5. Width increases: "Print" → Large

## Complete Examples

### Example 1: Responsive Button Sizes

```typescript
import { Ribbon, RibbonTabModel, RibbonItemType, RibbonItemSize } from "@syncfusion/ej2-ribbon";

let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Document",
        collections: [{
            items: [{
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Large,
                buttonSettings: {
                    content: "Save",
                    iconCss: "e-icons e-save",
                    isPrimary: true
                }
            }, {
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Large,
                buttonSettings: {
                    content: "Print",
                    iconCss: "e-icons e-print"
                }
            }, {
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Medium,
                buttonSettings: {
                    content: "Export",
                    iconCss: "e-icons e-export"
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    activeLayout: "Classic",
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

### Example 2: Fixed Sizes for Consistency

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Quick Access",
        collections: [{
            items: [{
                // Always Large - primary command
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Large,
                buttonSettings: {
                    content: "New",
                    iconCss: "e-icons e-file-new",
                    isPrimary: true
                }
            }, {
                // Always Medium - consistent secondary commands
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Medium,
                buttonSettings: {
                    content: "Open",
                    iconCss: "e-icons e-folder-open"
                }
            }, {
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Medium,
                buttonSettings: {
                    content: "Save",
                    iconCss: "e-icons e-save"
                }
            }, {
                // Always Small - utility buttons
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Small,
                buttonSettings: {
                    iconCss: "e-icons e-settings"
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    activeLayout: "Classic",
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

### Example 3: Simplified Layout Optimization

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Actions",
        collections: [{
            items: [{
                // Optimized for Simplified layout
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Medium,
                buttonSettings: {
                    content: "Save",
                    iconCss: "e-icons e-save"
                }
            }, {
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Medium,
                buttonSettings: {
                    content: "Undo",
                    iconCss: "e-icons e-undo"
                }
            }, {
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Medium,
                buttonSettings: {
                    content: "Redo",
                    iconCss: "e-icons e-redo"
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    activeLayout: "Simplified",
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

### Example 4: Priority-Based Resizing

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Home",
    groups: [{
        header: "Clipboard",
        collections: [{
            items: [{
                // Low priority - resizes first
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Large,
                buttonSettings: {
                    content: "Format Painter",
                    iconCss: "e-icons e-format-painter"
                }
            }]
        }, {
            items: [{
                // Medium priority - resizes second
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Large,
                buttonSettings: {
                    content: "Copy",
                    iconCss: "e-icons e-copy"
                }
            }, {
                type: RibbonItemType.Button,
                allowedSizes: RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small,
                activeSize: RibbonItemSize.Large,
                buttonSettings: {
                    content: "Cut",
                    iconCss: "e-icons e-cut"
                }
            }]
        }, {
            items: [{
                // High priority - fixed Large
                type: RibbonItemType.SplitButton,
                allowedSizes: RibbonItemSize.Large,
                buttonSettings: {
                    content: "Paste",
                    iconCss: "e-icons e-paste",
                    items: [
                        { text: "Keep Source Formatting" },
                        { text: "Merge Formatting" }
                    ]
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({
    activeLayout: "Classic",
    tabs: tabs
});

ribbon.appendTo("#ribbon");
```

These examples demonstrate various resizing strategies: responsive sizing, fixed sizes, Simplified layout optimization, and priority-based resizing for maintaining usability across different window sizes.
