# Orientations and Reverse

## Table of Contents
- [Vertical Orientation](#vertical-orientation)
- [Horizontal Orientation](#horizontal-orientation)
- [Reverse Property](#reverse-property)
- [Reverse with Different Alignments](#reverse-with-different-alignments)
- [Use Cases](#use-cases)

## Vertical Orientation

### Overview

Vertical orientation is the **default** display mode, showing timeline items in a top-to-bottom sequence. The timeline connector runs vertically down the middle, with content positioned on left and/or right sides.

### Characteristics

- **Direction:** Top-to-bottom (chronological flow)
- **Default:** No need to specify `orientation="Vertical"`
- **Connector:** Vertical line in the middle
- **Content placement:** Left/right sides depending on alignment
- **Best for:** Traditional chronological timelines

### Vertical Example

```ts
import { CommonModule } from '@angular/common';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { Component } from '@angular/core';

@Component({
    imports: [CommonModule, TimelineModule, TimelineAllModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent {
    public roadmap: TimelineItemModel[] = [
        { content: 'Q1 Planning', oppositeContent: 'January - March 2024' },
        { content: 'Q2 Development', oppositeContent: 'April - June 2024' },
        { content: 'Q3 Testing', oppositeContent: 'July - September 2024' },
        { content: 'Q4 Launch', oppositeContent: 'October - December 2024' }
    ];
}
```

```html
<div class="container" style="height: 400px;">
    <ejs-timeline orientation="Vertical" align="Before">
        <e-items>
            <e-item *ngFor="let item of roadmap" 
                    [content]="item.content" 
                    [oppositeContent]="item.oppositeContent"></e-item>
        </e-items>
    </ejs-timeline>
</div>
```

**Result:** Timeline flows from top to bottom with planning on left, dates on right.

### When to Use Vertical

- Product release milestones
- Project phases over time
- Educational achievements
- Career progression
- Historical events
- Process workflows

## Horizontal Orientation

### Overview

Horizontal orientation displays timeline items in a left-to-right sequence. The timeline connector runs horizontally across the middle, with content positioned above and/or below.

### Characteristics

- **Direction:** Left-to-right (chronological flow)
- **Connector:** Horizontal line in the middle
- **Content placement:** Top/bottom sides depending on alignment
- **Best for:** Space-constrained layouts, presentation-style timelines
- **Container:** Requires adequate horizontal space or scrolling

### Horizontal Example

```ts
export class AppComponent {
    public projectMilestones: TimelineItemModel[] = [
        { content: 'Kickoff', oppositeContent: 'January 2024' },
        { content: 'Design', oppositeContent: 'February 2024' },
        { content: 'Development', oppositeContent: 'March-May 2024' },
        { content: 'Testing', oppositeContent: 'June 2024' },
        { content: 'Launch', oppositeContent: 'July 2024' }
    ];
}
```

```html
<div class="container" style="width: 100%; overflow-x: auto;">
    <div style="min-width: 1200px; height: 250px;">
        <ejs-timeline orientation="Horizontal" align="Alternate">
            <e-items>
                <e-item *ngFor="let item of projectMilestones" 
                        [content]="item.content" 
                        [oppositeContent]="item.oppositeContent"></e-item>
            </e-items>
        </ejs-timeline>
    </div>
</div>
```

**Result:** Timeline flows left to right with alternating top/bottom content.

### When to Use Horizontal

- Presentation slides or storytelling
- Website hero sections
- Process flow diagrams
- Limited vertical space
- Wide-screen layouts
- Customer journey maps
- Step-by-step progression display

## Reverse Property

### Overview

The `reverse` property (boolean, default `false`) reverses the order of timeline items. Latest or endpoint content appears first, creating newest-first displays.

### Behavior

When `reverse="true"`:
- Items display in **reverse order**
- Last item in array appears first visually
- Works with all orientations and alignments
- Useful for activity feeds and recent-first timelines

### Basic Reverse Example

```ts
export class AppComponent {
    public activityLog: TimelineItemModel[] = [
        { content: 'Task 1', oppositeContent: 'January 2024' },
        { content: 'Task 2', oppositeContent: 'February 2024' },
        { content: 'Task 3', oppositeContent: 'March 2024' },
        { content: 'Task 4', oppositeContent: 'April 2024' }
    ];
}
```

Without `reverse`:
```
Timeline displays: Task 1 → Task 2 → Task 3 → Task 4 (chronological)
```

With `reverse="true"`:
```
Timeline displays: Task 4 → Task 3 → Task 2 → Task 1 (reverse chronological)
```

```html
<ejs-timeline orientation="Vertical" align="Before" [reverse]="true">
    <e-items>
        <e-item *ngFor="let item of activityLog" 
                [content]="item.content" 
                [oppositeContent]="item.oppositeContent"></e-item>
    </e-items>
</ejs-timeline>
```

### Activity Feed Example

```ts
export class AppComponent {
    public recentActivities: TimelineItemModel[] = [
        { content: 'User registration', oppositeContent: 'Jan 1, 2024 - 9:00 AM' },
        { content: 'Email verification', oppositeContent: 'Jan 2, 2024 - 2:30 PM' },
        { content: 'Profile completion', oppositeContent: 'Jan 3, 2024 - 11:15 AM' },
        { content: 'First purchase', oppositeContent: 'Jan 5, 2024 - 3:45 PM' },
        { content: 'Account upgrade', oppositeContent: 'Jan 8, 2024 - 10:20 AM' }
    ];
}
```

```html
<div class="activity-feed">
    <h3>Recent Activity</h3>
    <ejs-timeline orientation="Vertical" align="Before" [reverse]="true">
        <e-items>
            <e-item *ngFor="let activity of recentActivities" 
                    [content]="activity.content" 
                    [oppositeContent]="activity.oppositeContent"></e-item>
        </e-items>
    </ejs-timeline>
</div>
```

**Result:** Most recent activity (account upgrade) appears at top, older activities below.

## Reverse with Different Alignments

### Reverse + Before

```html
<ejs-timeline orientation="Vertical" align="Before" [reverse]="true">
    <!-- Items display right-to-left in array, content on left, opposite on right -->
</ejs-timeline>
```

**Use for:** Recent-first left-aligned content.

### Reverse + After

```html
<ejs-timeline orientation="Vertical" align="After" [reverse]="true">
    <!-- Items display right-to-left in array, content on right, opposite on left -->
</ejs-timeline>
```

**Use for:** Recent-first right-aligned content.

### Reverse + Alternate

```ts
export class AppComponent {
    public careerProgress: TimelineItemModel[] = [
        { content: 'June 2022', oppositeContent: 'Graduated in Computer Engineering' },
        { content: 'Aug 2022', oppositeContent: 'Software Engineering Internship' },
        { content: 'Feb 2023', oppositeContent: 'Associate Software Engineer' },
        { content: 'Mar 2024', oppositeContent: 'Software Level 1 Engineer' }
    ];
}
```

```html
<div class="container" style="height: 330px; margin-top: 30px;">
    <ejs-timeline orientation="Vertical" align="Alternate" [reverse]="true">
        <e-items>
            <e-item *ngFor="let item of careerProgress" 
                    [content]="item.content" 
                    [oppositeContent]="item.oppositeContent"></e-item>
        </e-items>
    </ejs-timeline>
</div>
```

**Result:** Career starts with most recent position (Mar 2024) at top, proceeding backward to graduation.

**Use for:** Career timelines showing progression, education history, or any reverse-chronological narrative.

### Reverse + Horizontal

```ts
export class AppComponent {
    public newsFeed: TimelineItemModel[] = [
        { content: 'Breaking News 1', oppositeContent: '1 hour ago' },
        { content: 'Breaking News 2', oppositeContent: '2 hours ago' },
        { content: 'Breaking News 3', oppositeContent: '3 hours ago' }
    ];
}
```

```html
<ejs-timeline orientation="Horizontal" align="Alternate" [reverse]="true">
    <e-items>
        <e-item *ngFor="let news of newsFeed" 
                [content]="news.content" 
                [oppositeContent]="news.oppositeContent"></e-item>
    </e-items>
</ejs-timeline>
```

## Use Cases

### Vertical Reverse = Activity Feed
**Best for:** Twitter-like feeds, notification history, log entries
- Most recent at top
- Chronological downward (but newest-first order)
- Easy to scan recent activity

### Vertical Reverse = Career/Education Timeline
**Best for:** Resume timelines, experience highlights, educational progression
- Current position/achievement at top
- Going backward in time naturally
- Modern-to-past narrative flow

### Horizontal = Product Launch Roadmap
**Best for:** Presentation slides, marketing timeline, product evolution
- Left-to-right natural reading direction
- Fits wide screens and presentations
- Good for investor presentations

### Horizontal Reverse = News/Updates
**Best for:** Latest news first, recent announcements, changelog
- Most recent on left (natural reading start)
- Reverse-chronological within left-to-right flow
- Engaging modern presentation

### Choosing Orientation

| Use Case | Orientation | Reverse | Rationale |
|---|---|---|---|
| Project timeline | Vertical | No | Chronological top-to-bottom |
| Activity feed | Vertical | Yes | Recent first, familiar pattern |
| News feed | Horizontal | Yes | Modern web pattern |
| Career history | Vertical | Yes | Recent achievement first |
| Roadmap | Vertical | No | Future progression |
| Process steps | Horizontal | No | Left-to-right flow |
