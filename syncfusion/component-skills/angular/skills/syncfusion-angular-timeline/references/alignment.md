# Content Alignment

## Table of Contents
- [Overview](#overview)
- [Before Alignment](#before-alignment)
- [After Alignment](#after-alignment)
- [Alternate Alignment](#alternate-alignment)
- [AlternateReverse Alignment](#alternatereverse-alignment)
- [Alignment Combinations](#alignment-combinations)

## Overview

The Timeline component uses the `align` property to control how content is positioned relative to the timeline connector. This works with both `content` and `oppositeContent` properties to create balanced or directional layouts.

**Alignment options:**
- `Before` - Content positioned consistently on one side
- `After` - Content positioned on opposite side compared to Before
- `Alternate` - Content alternates sides for zigzag pattern
- `AlternateReverse` - Reverse zigzag pattern

## Before Alignment

### Behavior by Orientation

The `Before` alignment positions content based on the timeline orientation:

**Vertical Timeline (default):**
- `content` displays on the **left** side of the timeline
- `oppositeContent` displays on the **right** side
- Timeline connector runs vertically down the middle

**Horizontal Timeline:**
- `content` displays on the **top** of the timeline  
- `oppositeContent` displays on the **bottom**
- Timeline connector runs horizontally

### Vertical Before Example

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
    public frameworks: TimelineItemModel[] = [
        { content: 'ReactJs', oppositeContent: 'Owned by Facebook' },
        { content: 'Angular', oppositeContent: 'Owned by Google' },
        { content: 'VueJs', oppositeContent: 'Owned by Evan you' },
        { content: 'Svelte', oppositeContent: 'Owned by Rich Harris' }
    ];
}
```

```html
<div class="container" style="height: 330px; margin-top: 30px;">
    <ejs-timeline align="Before">
        <e-items>
            <e-item *ngFor="let item of frameworks" 
                    [content]="item.content" 
                    [oppositeContent]="item.oppositeContent"></e-item>
        </e-items>
    </ejs-timeline>
</div>
```

**Result:** Left-side content (ReactJs, Angular, etc.) with right-side context (Owned by...).

## After Alignment

### Behavior by Orientation

The `After` alignment reverses the positioning compared to Before:

**Vertical Timeline:**
- `content` displays on the **right** side
- `oppositeContent` displays on the **left** side

**Horizontal Timeline:**
- `content` displays on the **bottom**
- `oppositeContent` displays on the **top**

### Vertical After Example

```ts
export class AppComponent {
    public frameworks: TimelineItemModel[] = [
        { content: 'ReactJs', oppositeContent: 'Owned by Facebook' },
        { content: 'Angular', oppositeContent: 'Owned by Google' },
        { content: 'VueJs', oppositeContent: 'Owned by Evan you' },
        { content: 'Svelte', oppositeContent: 'Owned by Rich Harris' }
    ];
}
```

```html
<div class="container" style="height: 330px; margin-top: 30px;">
    <ejs-timeline align="After">
        <e-items>
            <e-item *ngFor="let item of frameworks" 
                    [content]="item.content" 
                    [oppositeContent]="item.oppositeContent"></e-item>
        </e-items>
    </ejs-timeline>
</div>
```

**Result:** Right-side content with left-side context (opposite of Before).

## Alternate Alignment

### Behavior

The `Alternate` alignment creates a dynamic zigzag pattern where timeline items alternate sides:

**Vertical Timeline:**
- Item 1: `content` on left, `oppositeContent` on right
- Item 2: `content` on right, `oppositeContent` on left
- Item 3: `content` on left, `oppositeContent` on right
- And so on...

**Horizontal Timeline:**
- Item 1: `content` on top, `oppositeContent` on bottom
- Item 2: `content` on bottom, `oppositeContent` on top
- Pattern continues alternating

### Visual Impact

Creates balanced, visually interesting layouts that utilize space on both sides of the timeline.

### Alternate Example

```ts
export class AppComponent {
    public frameworks: TimelineItemModel[] = [
        { content: 'ReactJs', oppositeContent: 'Owned by Facebook' },
        { content: 'Angular', oppositeContent: 'Owned by Google' },
        { content: 'VueJs', oppositeContent: 'Owned by Evan you' },
        { content: 'Svelte', oppositeContent: 'Owned by Rich Harris' }
    ];
}
```

```html
<div class="container" style="height: 330px; margin-top: 30px;">
    <ejs-timeline align="Alternate">
        <e-items>
            <e-item *ngFor="let item of frameworks" 
                    [content]="item.content" 
                    [oppositeContent]="item.oppositeContent"></e-item>
        </e-items>
    </ejs-timeline>
</div>
```

**Use Alternate for:**
- Company or product timelines
- Before/After comparisons
- Parallel event tracking
- Maximizing visual space usage
- Visual variety and interest

## AlternateReverse Alignment

### Behavior

The `AlternateReverse` alignment creates the reverse pattern of Alternate:

**Vertical Timeline:**
- Item 1: `content` on right, `oppositeContent` on left (opposite of Alternate)
- Item 2: `content` on left, `oppositeContent` on right
- Pattern continues in reverse alternation

**Horizontal Timeline:**
- Item 1: `content` on bottom, `oppositeContent` on top
- Item 2: `content` on top, `oppositeContent` on bottom
- Pattern continues

### AlternateReverse Example

```ts
export class AppComponent {
    public frameworks: TimelineItemModel[] = [
        { content: 'ReactJs', oppositeContent: 'Owned by Facebook' },
        { content: 'Angular', oppositeContent: 'Owned by Google' },
        { content: 'VueJs', oppositeContent: 'Owned by Evan you' },
        { content: 'Svelte', oppositeContent: 'Owned by Rich Harris' }
    ];
}
```

```html
<div class="container" style="height: 330px; margin-top: 30px;">
    <ejs-timeline align="AlternateReverse">
        <e-items>
            <e-item *ngFor="let item of frameworks" 
                    [content]="item.content" 
                    [oppositeContent]="item.oppositeContent"></e-item>
        </e-items>
    </ejs-timeline>
</div>
```

**Use AlternateReverse when:**
- You want Alternate pattern but started on opposite side
- Matching specific design requirements
- Coordinating with other UI elements positioning

## Alignment Combinations

### Alignment + Orientation Combinations

All alignments work with both orientations:

| Alignment | Vertical Behavior | Horizontal Behavior |
|---|---|---|
| **Before** | Content left, opposite right | Content top, opposite bottom |
| **After** | Content right, opposite left | Content bottom, opposite top |
| **Alternate** | L-R-L-R zigzag | T-B-T-B alternation |
| **AlternateReverse** | R-L-R-L zigzag | B-T-B-T alternation |

### Example: Horizontal Alternate

```ts
export class AppComponent {
    public tripItenerary: TimelineItemModel[] = [
        { content: 'Day 1, 4:00 PM', oppositeContent: 'Check-in and campsite visit' },
        { content: 'Day 1, 7:00 PM', oppositeContent: 'Dinner with music' },
        { content: 'Day 2, 5:30 AM', oppositeContent: 'Sunrise between mountains' },
        { content: 'Day 2, 8:00 AM', oppositeContent: 'Breakfast and check-out' }
    ];
}
```

```html
<ejs-timeline orientation="Horizontal" align="Alternate">
    <e-items>
        <e-item *ngFor="let item of tripItenerary"
                [content]="item.content"
                [oppositeContent]="item.oppositeContent"></e-item>
    </e-items>
</ejs-timeline>
```

### Choosing the Right Alignment

**Use Before when:**
- One-sided display of content
- Timeline with labels on one side only
- Simple chronological listing

**Use After when:**
- Reversing the Before layout
- Different visual emphasis
- Matching specific design needs

**Use Alternate when:**
- Balancing content on both sides
- Visual variety is desired
- Material available for both sides
- Creating engaging layouts

**Use AlternateReverse when:**
- You want Alternate pattern with reversed starting side
- Coordinating with design requirements
- Creating specific visual rhythms
