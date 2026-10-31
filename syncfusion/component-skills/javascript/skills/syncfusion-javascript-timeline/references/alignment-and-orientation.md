# Alignment and Orientation Modes

## Table of Contents
- [Overview](#overview)
- [Alignment Options](#alignment-options)
  - [Before Alignment](#before-alignment)
  - [After Alignment](#after-alignment)
  - [Alternate Alignment](#alternate-alignment)
  - [AlternateReverse Alignment](#alternatereverse-alignment)
- [Orientation Modes](#orientation-modes)
  - [Vertical Orientation](#vertical-orientation)
  - [Horizontal Orientation](#horizontal-orientation)
- [Combining Alignment and Orientation](#combining-alignment-and-orientation)

## Overview

The Timeline control provides flexible layout options through two key properties:

- **`align`** - Controls how content is positioned relative to the timeline axis (Before, After, Alternate, AlternateReverse)
- **`orientation`** - Controls the direction of the timeline layout (Vertical, Horizontal)

These properties can be combined to create various visual arrangements for different use cases.

## Alignment Options

The `align` property supports four alignment modes that work with `oppositeContent` property:

### Before Alignment

In **Before** alignment, content is positioned in a consistent manner before the timeline line (or axis).

#### Horizontal Orientation (Before)
- **Main content** (`content`) is placed at the **top**
- **`oppositeContent`** is placed at the **bottom**

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const frameworks: TimelineItemModel[] = [
  { content: 'ReactJs', oppositeContent: 'Owned by Facebook' },
  { content: 'Angular', oppositeContent: 'Owned by Google' },
  { content: 'VueJs', oppositeContent: 'Owned by Evan You' },
  { content: 'Svelte', oppositeContent: 'Owned by Rich Harris' }
];

let timeline: Timeline = new Timeline({
  items: frameworks,
  align: 'Before',
  orientation: 'Horizontal'
});

timeline.appendTo("#timeline");
```

#### Vertical Orientation (Before)
- **Main content** (`content`) is placed on the **left**
- **`oppositeContent`** is placed on the **right**

```typescript
let timeline: Timeline = new Timeline({
  items: frameworks,
  align: 'Before',
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

### After Alignment

In **After** alignment, content is positioned in the opposite manner to Before alignment.

#### Horizontal Orientation (After)
- **Main content** (`content`) is placed at the **bottom**
- **`oppositeContent`** is placed at the **top**

```typescript
let timeline: Timeline = new Timeline({
  items: frameworks,
  align: 'After',
  orientation: 'Horizontal'
});

timeline.appendTo("#timeline");
```

#### Vertical Orientation (After)
- **Main content** (`content`) is placed on the **right**
- **`oppositeContent`** is placed on the **left**

### After Alignment Example

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const frameworks: TimelineItemModel[] = [
  { content: 'ReactJs', oppositeContent: 'Owned by Facebook' },
  { content: 'Angular', oppositeContent: 'Owned by Google' },
  { content: 'VueJs', oppositeContent: 'Owned by Evan You' },
  { content: 'Svelte', oppositeContent: 'Owned by Rich Harris' }
];

let timeline: Timeline = new Timeline({
  items: frameworks,
  align: 'After'
});

timeline.appendTo("#timeline");
```

### Alternate Alignment

In **Alternate** alignment, items are arranged alternately, regardless of the Timeline orientation. Content switches between left/right (vertical) or top/bottom (horizontal) with each item.

**Use Cases:**
- Creating balanced, symmetrical timelines
- Displaying conversations or discussions
- Showing pros/cons or comparisons
- Creating visual variety in long timelines

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const frameworks: TimelineItemModel[] = [
  { content: 'ReactJs', oppositeContent: 'Owned by Facebook' },
  { content: 'Angular', oppositeContent: 'Owned by Google' },
  { content: 'VueJs', oppositeContent: 'Owned by Evan You' },
  { content: 'Svelte', oppositeContent: 'Owned by Rich Harris' }
];

let timeline: Timeline = new Timeline({
  items: frameworks,
  align: 'Alternate'
});

timeline.appendTo("#timeline");
```

In vertical orientation:
- Item 1: Content left, oppositeContent right
- Item 2: Content right, oppositeContent left
- Item 3: Content left, oppositeContent right
- Item 4: Content right, oppositeContent left

### AlternateReverse Alignment

In **AlternateReverse** alignment, the item arrangement starts opposite to Alternate alignment. Instead of content appearing on the left first, it appears on the right first.

**Use Cases:**
- Creating mirrored layouts
- Adapting to specific design requirements
- Creating unique visual progressions

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const frameworks: TimelineItemModel[] = [
  { content: 'ReactJs', oppositeContent: 'Owned by Facebook' },
  { content: 'Angular', oppositeContent: 'Owned by Google' },
  { content: 'VueJs', oppositeContent: 'Owned by Evan You' },
  { content: 'Svelte', oppositeContent: 'Owned by Rich Harris' }
];

let timeline: Timeline = new Timeline({
  items: frameworks,
  align: 'AlternateReverse'
});

timeline.appendTo("#timeline");
```

In vertical orientation:
- Item 1: Content right, oppositeContent left
- Item 2: Content left, oppositeContent right
- Item 3: Content right, oppositeContent left
- Item 4: Content left, oppositeContent right

## Orientation Modes

The `orientation` property controls whether the timeline displays vertically or horizontally.

### Vertical Orientation

Vertical orientation is the **default** mode. Items are stacked vertically (one below another).

**Characteristics:**
- Items flow from top to bottom
- Timeline line runs vertically
- Content appears on left/right based on alignment
- Suitable for long sequences of events
- Better for mobile/responsive layouts

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const tripItinerary: TimelineItemModel[] = [
  { content: 'Day 1, 4:00 PM', oppositeContent: 'Check-in and campsite visit' },
  { content: 'Day 1, 7:00 PM', oppositeContent: 'Dinner with music' },
  { content: 'Day 2, 5:30 AM', oppositeContent: 'Sunrise between mountains' },
  { content: 'Day 2, 8:00 AM', oppositeContent: 'Breakfast and check-out' },
];

let timeline: Timeline = new Timeline({
  items: tripItinerary,
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

**CSS for Vertical Layout:**
```css
#container {
    width: 60%;
    margin: 20px auto;
    padding: 20px;
    height: 300px;
}

#container:has(.e-vertical) {
    height: 300px;  /* Adjust height for vertical content */
}
```

### Horizontal Orientation

In horizontal orientation, items are displayed side-by-side.

**Characteristics:**
- Items flow from left to right
- Timeline line runs horizontally
- Content appears on top/bottom based on alignment
- Suitable for short sequences (2-6 items typically)
- Better for desktop displays
- Shows comparison or progression visually

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const tripItinerary: TimelineItemModel[] = [
  { content: 'Day 1, 4:00 PM', oppositeContent: 'Check-in and campsite visit' },
  { content: 'Day 1, 7:00 PM', oppositeContent: 'Dinner with music' },
  { content: 'Day 2, 5:30 AM', oppositeContent: 'Sunrise between mountains' },
  { content: 'Day 2, 8:00 AM', oppositeContent: 'Breakfast and check-out' },
];

let timeline: Timeline = new Timeline({
  items: tripItinerary,
  orientation: 'Horizontal'
});

timeline.appendTo("#timeline");
```

**CSS for Horizontal Layout:**
```css
#container {
    visibility: hidden;
    margin-top: 30px;
    padding: 30px;
    width: 100%;
    height: 250px;  /* Ensure enough height for horizontal timeline */
    overflow-x: auto;  /* Allow scrolling if needed */
}
```

## Combining Alignment and Orientation

Different combinations of alignment and orientation create various visual layouts:

### Use Case: Project Timeline

Display project milestones horizontally with Before alignment:

```typescript
const projectMilestones: TimelineItemModel[] = [
  { content: 'Planning', oppositeContent: 'Week 1-2' },
  { content: 'Design', oppositeContent: 'Week 3-4' },
  { content: 'Development', oppositeContent: 'Week 5-8' },
  { content: 'Testing', oppositeContent: 'Week 9' },
  { content: 'Launch', oppositeContent: 'Week 10' }
];

let timeline: Timeline = new Timeline({
  items: projectMilestones,
  orientation: 'Horizontal',
  align: 'Before'
});

timeline.appendTo("#timeline");
```

### Use Case: Career Path Timeline

Display career progression vertically with Alternate alignment for visual balance:

```typescript
const careerPath: TimelineItemModel[] = [
  { content: 'Graduate Studies Start', oppositeContent: 'September 2020' },
  { content: 'First Internship', oppositeContent: 'June 2021' },
  { content: 'Full-time Position', oppositeContent: 'June 2022' },
  { content: 'Promotion to Senior', oppositeContent: 'March 2024' },
  { content: 'Leadership Role', oppositeContent: 'Expected 2025' }
];

let timeline: Timeline = new Timeline({
  items: careerPath,
  orientation: 'Vertical',
  align: 'Alternate'
});

timeline.appendTo("#timeline");
```

### Use Case: Event Timeline

Display events with Alternate arrangement for balanced visual impact:

```typescript
const events: TimelineItemModel[] = [
  { content: '9:00 AM', oppositeContent: 'Registration Opens' },
  { content: '10:00 AM', oppositeContent: 'Keynote Speech' },
  { content: '11:30 AM', oppositeContent: 'Workshop Sessions' },
  { content: '1:00 PM', oppositeContent: 'Lunch Break' },
  { content: '2:00 PM', oppositeContent: 'Networking Session' },
  { content: '5:00 PM', oppositeContent: 'Closing Ceremony' }
];

let timeline: Timeline = new Timeline({
  items: events,
  orientation: 'Vertical',
  align: 'Alternate'
});

timeline.appendTo("#timeline");
```

### Alignment and Orientation Matrix

| Alignment | Orientation | Content Position | oppositeContent Position |
|-----------|-------------|-----------------|------------------------|
| Before | Vertical | Left | Right |
| Before | Horizontal | Top | Bottom |
| After | Vertical | Right | Left |
| After | Horizontal | Bottom | Top |
| Alternate | Vertical | Alternates left/right | Alternates right/left |
| Alternate | Horizontal | Alternates top/bottom | Alternates bottom/top |
| AlternateReverse | Vertical | Starts right, alternates | Starts left, alternates |
| AlternateReverse | Horizontal | Starts bottom, alternates | Starts top, alternates |

This matrix helps you choose the correct combination for your desired layout.
