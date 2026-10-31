# Reverse Layout Mode

## Table of Contents
- [Overview](#overview)
- [Using the Reverse Property](#using-the-reverse-property)
- [Reverse with Different Alignments](#reverse-with-different-alignments)
- [Use Cases](#use-cases)
- [Complete Examples](#complete-examples)

## Overview

The Timeline control supports displaying items in reverse order using the `reverse` property. When set to `true`, the timeline items are rendered in reverse sequence. This feature provides adaptability for different use cases such as:

- Displaying histories or logs in reverse chronological order (newest first)
- Creating alternate visual flows
- Adapting to specific design requirements
- Mirroring timelines for comparison purposes

### Reverse Property

```typescript
reverse?: boolean;  // Default: false
```

When `reverse` is `true`, items are displayed in reverse order while maintaining the visual flow of the timeline.

## Using the Reverse Property

### Basic Reverse Example

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

const careerProgress: TimelineItemModel[] = [
  { content: 'June 2022', oppositeContent: 'Graduated \n Bachelors in Computer Engineering' },
  { content: 'Aug 2022', oppositeContent: 'Software Engineering Internship \n ABC Software and Technology' },
  { content: 'Feb 2023', oppositeContent: 'Associate Software Engineer \n ABC Software and Technology' },
  { content: 'Mar 2024', oppositeContent: 'Software Level 1 Engineer \n XYZ Solutions' },
];

// Normal order (oldest to newest)
let timeline: Timeline = new Timeline({
  items: careerProgress,
  reverse: false,
  align: 'Before'
});

timeline.appendTo("#timeline");
```

### Reverse Vertical Timeline

Display items vertically in reverse order (newest first):

```typescript
const careerProgress: TimelineItemModel[] = [
  { content: 'June 2022', oppositeContent: 'Graduated' },
  { content: 'Aug 2022', oppositeContent: 'Internship' },
  { content: 'Feb 2023', oppositeContent: 'Associate Engineer' },
  { content: 'Mar 2024', oppositeContent: 'Senior Engineer' },
];

let timeline: Timeline = new Timeline({
  items: careerProgress,
  reverse: true,      // Display in reverse order (newest first)
  align: 'before',
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

In this example, "Senior Engineer" (Mar 2024) appears first, followed by earlier career stages in descending date order.

### Reverse Horizontal Timeline

Display items horizontally in reverse order:

```typescript
let timeline: Timeline = new Timeline({
  items: careerProgress,
  reverse: true,
  orientation: 'Horizontal'
});

timeline.appendTo("#timeline");
```

## Reverse with Different Alignments

The reverse property works with all alignment modes. Here's how it behaves with each alignment:

### Reverse with Before Alignment

```typescript
let timeline: Timeline = new Timeline({
  items: careerProgress,
  reverse: true,
  align: 'Before',
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

**Vertical Before + Reverse:**
- Items display bottom-to-top instead of top-to-bottom
- Content remains on left, oppositeContent on right
- Latest item appears at the bottom

**Horizontal Before + Reverse:**
- Items display right-to-left instead of left-to-right
- Content remains on top, oppositeContent on bottom
- Latest item appears on the rightmost position

### Reverse with After Alignment

```typescript
let timeline: Timeline = new Timeline({
  items: careerProgress,
  reverse: true,
  align: 'After',
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

Combined with After alignment, reverse creates a unique visual flow where content positions are reversed and item order is reversed.

### Reverse with Alternate Alignment

```typescript
let timeline: Timeline = new Timeline({
  items: careerProgress,
  reverse: true,
  align: 'Alternate',
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

**Effect:**
- Items alternate between sides in reverse order
- Starts from the opposite side compared to normal Alternate
- Creates a mirrored alternating pattern

### Reverse with AlternateReverse Alignment

```typescript
let timeline: Timeline = new Timeline({
  items: careerProgress,
  reverse: true,
  align: 'AlternateReverse',
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

This combination creates a unique visual arrangement with both the alignment and item order reversed.

## Use Cases

### Use Case 1: Reverse Chronological History

Display recent events first, working backward in time:

```typescript
interface HistoryEvent extends TimelineItemModel {
  timestamp?: string;
}

const eventHistory: HistoryEvent[] = [
  { content: '2022-01-01', oppositeContent: 'Project Started' },
  { content: '2022-06-15', oppositeContent: 'Major Update Released' },
  { content: '2023-03-20', oppositeContent: 'Feature Enhancement' },
  { content: '2024-01-10', oppositeContent: 'Current Version' }
];

let timeline: Timeline = new Timeline({
  items: eventHistory,
  reverse: true,  // Shows 2024 first, then 2023, 2022, etc.
  align: 'Alternate'
});

timeline.appendTo("#timeline");
```

This displays the most recent event (2024) first, making it easy to see current status immediately.

### Use Case 2: Activity Feed in Reverse

Display latest activity first in a social-media style feed:

```typescript
interface Activity extends TimelineItemModel {
  author?: string;
  timestamp?: string;
}

const activityFeed: Activity[] = [
  { 
    content: 'User A started working on Task 1',
    oppositeContent: '2 hours ago'
  },
  {
    content: 'User B completed Task 2',
    oppositeContent: '5 hours ago'
  },
  {
    content: 'User C reviewed PR #123',
    oppositeContent: '1 day ago'
  },
  {
    content: 'Project initialized',
    oppositeContent: '1 week ago'
  }
];

let timeline: Timeline = new Timeline({
  items: activityFeed,
  reverse: true,  // Latest activity appears first
  align: 'Before'
});

timeline.appendTo("#timeline");
```

### Use Case 3: Execution Stack Trace

Display function calls in reverse (most recent first):

```typescript
interface StackFrame extends TimelineItemModel {
  functionName?: string;
  lineNumber?: number;
}

const executionStack: StackFrame[] = [
  { content: 'main()', oppositeContent: 'Line 1' },
  { content: 'initializeApp()', oppositeContent: 'Line 45' },
  { content: 'setupTimeline()', oppositeContent: 'Line 120' },
  { content: 'renderItems()', oppositeContent: 'Line 215' }
];

let timeline: Timeline = new Timeline({
  items: executionStack,
  reverse: true,  // Most recent call appears first
  orientation: 'Vertical'
});

timeline.appendTo("#timeline");
```

### Use Case 4: Before/After Comparison

Compare two versions of processes by reversing one:

```typescript
// Version 1: Normal order
let timelineV1: Timeline = new Timeline({
  items: careerProgress,
  reverse: false,
  cssClass: 'timeline-v1'
});

// Version 2: Reversed order for comparison
let timelineV2: Timeline = new Timeline({
  items: careerProgress,
  reverse: true,
  cssClass: 'timeline-v2'
});

timelineV1.appendTo("#timeline-v1");
timelineV2.appendTo("#timeline-v2");
```

## Complete Examples

### Example 1: Support Ticket Resolution Timeline (Reverse)

Display the most recent status updates first:

```typescript
import { Timeline, TimelineItemModel } from '@syncfusion/ej2-layouts';

interface TicketUpdate extends TimelineItemModel {
  status?: string;
  agent?: string;
  timestamp?: string;
}

const ticketTimeline: TicketUpdate[] = [
  {
    content: 'Ticket Created',
    oppositeContent: 'Jan 1, 2024 - 9:00 AM',
    status: 'opened',
    cssClass: 'status-opened'
  },
  {
    content: 'Assigned to Agent',
    oppositeContent: 'Jan 1, 2024 - 9:15 AM',
    status: 'assigned',
    cssClass: 'status-assigned'
  },
  {
    content: 'In Progress',
    oppositeContent: 'Jan 1, 2024 - 9:30 AM',
    status: 'in-progress',
    cssClass: 'status-in-progress'
  },
  {
    content: 'Issue Resolved',
    oppositeContent: 'Jan 1, 2024 - 10:00 AM',
    status: 'resolved',
    cssClass: 'status-resolved'
  },
  {
    content: 'Ticket Closed',
    oppositeContent: 'Jan 1, 2024 - 10:15 AM',
    status: 'closed',
    cssClass: 'status-closed'
  }
];

let timeline: Timeline = new Timeline({
  items: ticketTimeline,
  reverse: true,  // Shows latest status (Closed) first
  align: 'Alternate',
  orientation: 'Vertical',
  cssClass: 'ticket-timeline'
});

timeline.appendTo("#timeline");
```

CSS Styling:
```css
.ticket-timeline.status-opened {
  background: #e3f2fd;
  border-left: 4px solid #2196F3;
}

.ticket-timeline .status-assigned {
  background: #f3e5f5;
  border-left: 4px solid #9C27B0;
}

.ticket-timeline .status-in-progress {
  background: #fff3e0;
  border-left: 4px solid #FF9800;
}

.ticket-timeline .status-resolved {
  background: #f1f8e9;
  border-left: 4px solid #8BC34A;
}

.ticket-timeline .status-closed {
  background: #e8f5e9;
  border-left: 4px solid #4CAF50;
}
```

### Example 2: Git Commit History (Reverse)

Display most recent commits first:

```typescript
interface CommitInfo extends TimelineItemModel {
  hash?: string;
  author?: string;
  date?: string;
}

const commitHistory: CommitInfo[] = [
  {
    content: 'Initial commit',
    oppositeContent: 'HEAD~4 - 2024-01-01',
    hash: 'abc1234'
  },
  {
    content: 'Add feature X',
    oppositeContent: 'HEAD~3 - 2024-01-05',
    hash: 'def5678'
  },
  {
    content: 'Fix bug Y',
    oppositeContent: 'HEAD~2 - 2024-01-10',
    hash: 'ghi9012'
  },
  {
    content: 'Refactor code',
    oppositeContent: 'HEAD~1 - 2024-01-15',
    hash: 'jkl3456'
  },
  {
    content: 'Latest update',
    oppositeContent: 'HEAD - 2024-01-20',
    hash: 'mno7890'
  }
];

let timeline: Timeline = new Timeline({
  items: commitHistory,
  reverse: true,  // Latest commit (HEAD) appears first
  align: 'Before',
  orientation: 'Vertical',
  cssClass: 'git-commit-timeline'
});

timeline.appendTo("#timeline");
```

### Example 3: Hotel Reservation History (Reverse)

Show most recent reservations first:

```typescript
interface Reservation extends TimelineItemModel {
  reservationId?: string;
  dates?: string;
  status?: string;
}

const reservationHistory: Reservation[] = [
  {
    content: 'First Reservation',
    oppositeContent: 'Jan 10-15, 2024 - Room 101',
    status: 'completed'
  },
  {
    content: 'Second Reservation',
    oppositeContent: 'Mar 1-5, 2024 - Room 205',
    status: 'completed'
  },
  {
    content: 'Third Reservation',
    oppositeContent: 'May 20-25, 2024 - Room 310',
    status: 'confirmed'
  },
  {
    content: 'Current Reservation',
    oppositeContent: 'Dec 15-20, 2024 - Room 102',
    status: 'pending'
  }
];

let timeline: Timeline = new Timeline({
  items: reservationHistory,
  reverse: true,  // Most recent (pending) appears first
  align: 'Alternate'
});

timeline.appendTo("#timeline");
```

The reverse property is a powerful feature for adapting timelines to different data presentation needs, particularly when showing recent-first views or creating alternative visual arrangements.
