# Kanban Responsive Mode Reference

This reference provides comprehensive information about responsive behavior and mobile support in the Syncfusion TypeScript Kanban component.

## Table of Contents

- [Overview](#overview)
- [Layout Types](#layout-types)
- [Scrolling Behavior](#scrolling-behavior)
- [Card Selection](#card-selection)
- [Mobile Gestures](#mobile-gestures)
- [Edge Cases and Troubleshooting](#edge-cases-and-troubleshooting)

## Overview

The Kanban component provides built-in responsive behavior that adapts to different screen sizes based on the client browser's width and height. The component automatically optimizes its layout and interaction patterns for mobile and tablet devices.

### Key Responsive Features

- Automatic layout adjustment for small screens
- Touch-optimized interactions
- Gesture support for drag and drop
- Adaptive column display
- Mobile-friendly selection modes
- Responsive swimlane behavior

## Layout Types

The Kanban component supports two main layout types that adapt responsively:

1. Default Layout
2. Swimlane Layout

### Default Layout

The default responsive layout is optimized for mobile viewing with the following characteristics:

#### Column Distribution
- **First Column**: Occupies 80% of screen width
- **Second Column**: Occupies 20% of screen width
- **Navigation**: Swipe left or right to view additional columns

#### Card Interaction
- **Drag and Drop**: Tap and hold a card to initiate drag
- **Drop Action**: Drag card to target column and release
- **Visual Feedback**: Card shows drag state with visual indicators

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
    // Responsive behavior is enabled by default
});
kanbanObj.appendTo('#Kanban');
```

#### Mobile View Structure

```
┌─────────────────────────────────┐
│ ┌──────────┬──────┐             │
│ │ Backlog  │ In P │ →           │
│ │  (80%)   │(20%) │             │
│ ├──────────┼──────┤             │
│ │ Card 1   │      │             │
│ │ Card 2   │Card 7│             │
│ │ Card 3   │      │             │
│ └──────────┴──────┘             │
└─────────────────────────────────┘
    ← Swipe to navigate →
```

### Swimlane Layout

In responsive mode, the swimlane layout provides a specialized mobile-optimized interface:

#### Swimlane Header Menu
- **Menu Icon**: Displayed at the top of the Kanban board
- **Popup Menu**: Shows all available swimlane groups when clicked
- **Default Selection**: First swimlane group is selected by default
- **Dynamic Content**: Board updates when switching swimlane groups

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    swimlaneSettings: {
        keyField: 'Assignee'  // Enable swimlane grouping
    }
});
kanbanObj.appendTo('#Kanban');
```

#### Mobile Swimlane Structure

```
┌─────────────────────────────────┐
│ ☰ Assignee: John Doe       ▼   │
│─────────────────────────────────│
│ ┌──────────┬──────┐             │
│ │ Backlog  │ In P │ →           │
│ ├──────────┼──────┤             │
│ │ Card 1   │Card 5│             │
│ │ Card 2   │      │             │
│ └──────────┴──────┘             │
└─────────────────────────────────┘

Click ☰ to show:
┌─────────────────┐
│ John Doe     ✓  │
│ Jane Smith      │
│ Bob Johnson     │
└─────────────────┘
```

## Scrolling Behavior

### Column Scrolling

When columns exceed the screen size, horizontal scrolling is automatically enabled.

#### Features
- **Touch Scroll**: Smooth touch-based scrolling
- **Momentum Scrolling**: Natural deceleration after swipe
- **Bounce Effect**: Visual feedback at scroll boundaries
- **Scroll Indicators**: Shows current scroll position

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Code Review', keyField: 'Review' },
        { headerText: 'Done', keyField: 'Close' },
        { headerText: 'Archived', keyField: 'Archived' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
    // Column scrolling enabled automatically when needed
});
kanbanObj.appendTo('#Kanban');
```

### Vertical Scrolling

Each column supports independent vertical scrolling when card content exceeds the viewport.

```css
/* Custom scrolling styles */
.e-kanban .e-content-cells {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
}
```

## Card Selection

The Kanban component supports two selection modes in responsive view:

1. Single Selection
2. Multiple Selection

### Single Selection

Default selection behavior on mobile devices:

#### Interaction Pattern
- **Select**: Tap once on a card to select it
- **Deselect**: Tap another card (previous selection is removed)
- **Visual Feedback**: Selected card shows highlight state
- **Edit**: Tap selected card again to open edit dialog

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id',
        selectionType: 'Single'  // Default selection type
    }
});
kanbanObj.appendTo('#Kanban');
```

#### Mobile Single Selection UI

```
┌─────────────────────────────────┐
│ Backlog                         │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Card 1                      │ │  ← Normal
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Card 2 (Selected)          │ │  ← Highlighted
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Card 3                      │ │  ← Normal
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

### Multiple Selection

Enable multi-select mode for bulk operations on mobile:

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id',
        selectionType: 'Multiple'  // Enable multi-selection
    }
});
kanbanObj.appendTo('#Kanban');
```

#### Multi-Selection Interaction

##### First Selection (Tap and Hold)
- **Action**: Tap and hold on a card
- **Result**: Card is selected and popup appears at screen top
- **Display**: Shows selected card's header text

##### Additional Selections (Tap Only)
- **Action**: Simple tap on other cards
- **Result**: Cards are added to selection
- **Display**: Popup shows total count of selected cards

#### Mobile Multi-Selection UI

```
Single Card Selected:
┌─────────────────────────────────┐
│ ✓ Task ID-001: Login Feature   │  ← Popup
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Task ID-001 ✓               │ │  ← Selected
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Task ID-002                 │ │
│ └─────────────────────────────┘ │
└─────────────────────────────────┘

Multiple Cards Selected:
┌─────────────────────────────────┐
│ ✓ 3 Cards Selected              │  ← Popup with count
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Task ID-001 ✓               │ │  ← Selected
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Task ID-002 ✓               │ │  ← Selected
│ └─────────────────────────────┘ │
│ ┌─────────────────────────────┐ │
│ │ Task ID-003 ✓               │ │  ← Selected
│ └─────────────────────────────┘ │
└─────────────────────────────────┘
```

## Mobile Gestures

### Supported Gestures

#### Tap
- **Action**: Select card
- **Duration**: Quick tap (< 300ms)
- **Result**: Single selection or multi-selection (based on mode)

#### Tap and Hold
- **Action**: Initiate drag or start multi-select
- **Duration**: Long press (> 500ms)
- **Result**: Card becomes draggable or enters multi-select mode

#### Swipe
- **Action**: Navigate between columns
- **Direction**: Left/Right
- **Result**: Scroll to previous/next column

#### Drag
- **Action**: Move card to different column
- **Pattern**: Tap and hold, then drag
- **Result**: Card moves to target column

### Implementing Custom Gestures

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    // Handle touch events
    cardClick: (args) => {
        console.log('Card clicked:', args.data);
    },
    dragStart: (args) => {
        console.log('Drag started:', args.data);
    },
    dragStop: (args) => {
        console.log('Drag stopped:', args.data);
    }
});
kanbanObj.appendTo('#Kanban');

// Add custom gesture handling
const kanbanElement = document.getElementById('Kanban');
let touchStartX = 0;
let touchStartY = 0;

kanbanElement?.addEventListener('touchstart', (e: TouchEvent) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

kanbanElement?.addEventListener('touchend', (e: TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    
    // Detect swipe direction
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
            console.log('Swiped right');
        } else {
            console.log('Swiped left');
        }
    }
});
```

## Responsive CSS Customization

### Mobile-Specific Styling

```css
/* Mobile styles (screens < 768px) */
@media screen and (max-width: 767px) {
    .e-kanban {
        font-size: 14px;
    }
    
    .e-kanban .e-card {
        padding: 12px;
        margin-bottom: 10px;
    }
    
    .e-kanban .e-card-header {
        font-size: 16px;
        font-weight: 600;
    }
    
    .e-kanban .e-header-cells {
        padding: 15px 10px;
        font-size: 16px;
    }
    
    /* Larger touch targets */
    .e-kanban .e-card {
        min-height: 60px;
    }
    
    /* Selection indicator */
    .e-kanban .e-card.e-selection {
        border: 3px solid #007bff;
        box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
    }
}

/* Tablet styles (screens 768px - 1024px) */
@media screen and (min-width: 768px) and (max-width: 1024px) {
    .e-kanban {
        font-size: 15px;
    }
    
    .e-kanban .e-card {
        padding: 14px;
    }
}
```

### Touch-Optimized Interactions

```css
/* Increase touch target sizes */
.e-kanban .e-card,
.e-kanban .e-header-cells,
.e-kanban .e-show-add-button {
    min-height: 44px; /* iOS recommendation */
    min-width: 44px;
}

/* Smooth animations for touch */
.e-kanban .e-card {
    transition: transform 0.2s ease-in-out;
}

.e-kanban .e-card:active {
    transform: scale(0.98);
}

/* Drag feedback */
.e-kanban .e-card.e-dragging {
    opacity: 0.7;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
    transform: rotate(2deg);
}
```

## Edge Cases and Troubleshooting

### Common Responsive Issues

**Issue**: Layout not responding to screen size changes
- **Solution**: Ensure viewport meta tag is properly set in HTML
  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ```
- **Solution**: Check for fixed width CSS overrides
- **Solution**: Test with browser developer tools in responsive mode

**Issue**: Touch gestures not working
- **Solution**: Verify touch events are not prevented by other handlers
- **Solution**: Check for CSS `touch-action` property conflicts
- **Solution**: Ensure `allowDragAndDrop` is enabled

**Issue**: Scrolling feels sluggish on mobile
- **Solution**: Add `-webkit-overflow-scrolling: touch` for iOS
- **Solution**: Minimize DOM complexity
- **Solution**: Optimize card rendering

**Issue**: Cards too small to tap accurately
- **Solution**: Increase card padding and minimum height
- **Solution**: Use larger fonts for mobile
- **Solution**: Follow 44x44px minimum touch target guideline

**Issue**: Multi-selection not working
- **Solution**: Verify `selectionType: 'Multiple'` is set
- **Solution**: Check if tap and hold duration is sufficient
- **Solution**: Test on actual device (not just emulator)

**Issue**: Swimlane menu not appearing
- **Solution**: Verify screen width triggers mobile mode
- **Solution**: Check `swimlaneSettings.keyField` is configured
- **Solution**: Ensure swimlane data exists

### Best Practices

#### 1. Optimize for Touch
```typescript
cardSettings: {
    contentField: 'Summary',
    headerField: 'Id',
    selectionType: 'Multiple'  // Better for mobile bulk actions
}
```

#### 2. Simplify Mobile Layout
```typescript
// Show fewer columns on mobile
const isMobile = window.innerWidth < 768;
const columns = isMobile 
    ? [
        { headerText: 'To Do', keyField: 'Open' },
        { headerText: 'Done', keyField: 'Close' }
      ]
    : [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
      ];
```

#### 3. Provide Visual Feedback
```css
/* Active state for touch */
.e-kanban .e-card:active {
    background-color: #f0f0f0;
    transform: scale(0.98);
}

/* Drag state */
.e-kanban .e-card.e-dragging {
    opacity: 0.7;
    box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}
```

#### 4. Test on Real Devices
- Test on various screen sizes (phone, tablet, desktop)
- Test with actual touch input
- Verify gesture recognition
- Check performance with large datasets
- Test orientation changes

#### 5. Consider Network Conditions
```typescript
// Lazy load data for mobile
if (isMobile) {
    kanbanObj.allowVirtualization = true;
    kanbanObj.cardHeight = 100;
}
```

### Performance Optimization

#### Minimize Reflows
```typescript
// Batch DOM updates
kanbanObj.dataBound = () => {
    requestAnimationFrame(() => {
        // Perform layout adjustments
    });
};
```

#### Optimize Images
```typescript
// Use responsive images in card templates
template: `
    <img src="\${avatar}" 
         srcset="\${avatar_2x} 2x, \${avatar_3x} 3x"
         alt="Avatar" />
`
```

#### Reduce Animation Complexity
```css
/* Simpler animations for mobile */
@media screen and (max-width: 767px) {
    .e-kanban .e-card {
        transition: transform 0.15s ease-out;
    }
}
```

### Accessibility on Mobile

- Ensure touch targets are at least 44x44px
- Provide sufficient spacing between interactive elements
- Support screen reader gestures
- Test with mobile screen readers (TalkBack, VoiceOver)
- Ensure zoom functionality works properly

### Testing Checklist

- [ ] Layout adapts to different screen sizes
- [ ] Touch gestures work correctly
- [ ] Drag and drop works with tap and hold
- [ ] Selection modes work as expected
- [ ] Scrolling is smooth and responsive
- [ ] Swimlane menu appears and functions correctly
- [ ] Cards are easy to tap and interact with
- [ ] Text is readable without zooming
- [ ] Performance is acceptable on low-end devices
- [ ] Works in both portrait and landscape orientations
