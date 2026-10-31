# Events

## Table of Contents
- [Overview](#overview)
- [Created Event](#created-event)
- [BeforeItemRender Event](#beforeitemrender-event)
- [Common Event Patterns](#common-event-patterns)

## Overview

The Timeline component triggers events at different lifecycle stages, allowing you to execute custom logic and modify behavior through event handlers.

**Available events:**
- `created` - Fires when Timeline rendering is complete
- `beforeItemRender` - Fires before each item renders, allowing customization

Both events can be bound using Angular's event binding syntax `(eventName)="handler($event)"`.

## Created Event

### Overview

The `created` event fires once when the Timeline component has finished rendering and is ready for interaction. This is useful for initialization logic, setup operations, or triggering other components.

### Basic Created Event

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
    imports: [TimelineModule, TimelineAllModule, CommonModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    public productLifecycle: TimelineItemModel[] = [
        { content: 'Planning'},
        { content: 'Developing'},
        { content: 'Testing' },
        { content: 'Launch' },
    ];

    handleTimelineCreated = () => {
        console.log('Timeline component is ready!');
        // Your initialization code here
    }
}
```

```html
<div class="container" style="height: 330px; margin-top: 30px;">
    <ejs-timeline (created)="handleTimelineCreated()">
        <e-items>
            <e-item *ngFor="let item of productLifecycle" [content]="item.content"></e-item>
        </e-items>
    </ejs-timeline>
</div>
```

### Use Cases for Created Event

- **Initialization:** Set up dependent components or services
- **Analytics:** Track when Timeline becomes visible/interactive
- **Dynamic loading:** Load additional data after Timeline renders
- **Focus management:** Set focus to specific elements
- **Animations:** Trigger entrance animations after render

### Created with Initialization Logic

```ts
export class AppComponent {
    public timeline: TimelineItemModel[] = [];
    public isLoading = true;

    constructor(private dataService: DataService) {}

    handleTimelineCreated = () => {
        this.isLoading = false;
        console.log('Timeline ready with', this.timeline.length, 'items');
        this.logAnalyticsEventTimelineLoaded();
    }

    ngOnInit() {
        this.dataService.getTimeline().subscribe(data => {
            this.timeline = data;
        });
    }

    private logAnalyticsEventTimelineLoaded() {
        // Send event to analytics service
    }
}
```

## BeforeItemRender Event

### Overview

The `beforeItemRender` event fires **before** each individual Timeline item renders, allowing you to:
- Modify item properties dynamically
- Apply conditional styling
- Add custom attributes
- Skip rendering specific items
- Create dynamic content based on item index

### Event Arguments

The event receives `TimelineRenderingEventArgs` with:
- `data` - The Timeline item being rendered
- `index` - Index of the item
- `element` - DOM element being rendered
- `cancel` - Boolean to prevent rendering (if true, item is skipped)

### Basic BeforeItemRender Example

```ts
import { TimelineRenderingEventArgs } from "@syncfusion/ej2-angular-layouts";

export class AppComponent {
    public productLifecycle: TimelineItemModel[] = [
        { content: 'Planning'},
        { content: 'Developing'},
        { content: 'Testing' },
        { content: 'Launch' },
    ];
    
    handleBeforeItemRender = (args: TimelineRenderingEventArgs) => {
        console.log('Rendering item:', args.data.content, 'at index:', args.index);
    }
}
```

```html
<div class="container" style="height: 330px; margin-top: 30px;">
    <ejs-timeline (beforeItemRender)="handleBeforeItemRender($event)">
        <e-items>
            <e-item *ngFor="let item of productLifecycle" [content]="item.content"></e-item>
        </e-items>
    </ejs-timeline>
</div>
```

### Conditional Styling Based on Index

```ts
export class AppComponent {
    public roadmap: TimelineItemModel[] = [
        { content: 'Q1 Planning' },
        { content: 'Q2 Development' },
        { content: 'Q3 Testing' },
        { content: 'Q4 Launch' }
    ];

    handleBeforeItemRender = (args: TimelineRenderingEventArgs) => {
        const index = args.index;
        
        // Highlight current item
        if (index === 1) {
            args.element.classList.add('current-phase');
        }
        
        // Mark future items
        if (index > 1) {
            args.element.classList.add('future-phase');
        }
    }
}
```

```html
<ejs-timeline (beforeItemRender)="handleBeforeItemRender($event)" align="Alternate">
    <e-items>
        <e-item *ngFor="let item of roadmap" [content]="item.content"></e-item>
    </e-items>
</ejs-timeline>
```

```css
.current-phase {
    background-color: #FFC107 !important;
}

.current-phase .e-dot {
    min-width: 24px;
    min-height: 24px;
    background-color: #FBC02D;
    box-shadow: 0 0 10px rgba(255, 193, 7, 0.5);
}

.future-phase {
    opacity: 0.6;
}

.future-phase .e-dot {
    background-color: #BDBDBD;
}
```

### Modifying Item Content Dynamically

```ts
export class AppComponent {
    public workflow: TimelineItemModel[] = [
        { content: 'Step 1', status: 'completed' },
        { content: 'Step 2', status: 'progress' },
        { content: 'Step 3', status: 'pending' }
    ];

    handleBeforeItemRender = (args: TimelineRenderingEventArgs) => {
        const item = args.data;
        
        // Add status badge to content
        if (item.status === 'completed') {
            item.content += ' ✓';
        } else if (item.status === 'progress') {
            item.content += ' ⟳';
        }
        
        // Apply status-based CSS
        args.element.classList.add(`status-${item.status}`);
    }
}
```

```css
.status-completed {
    border-left: 4px solid #4CAF50;
}

.status-progress {
    border-left: 4px solid #2196F3;
}

.status-pending {
    border-left: 4px solid #FF9800;
}
```

### Skipping Items Based on Conditions

```ts
export class AppComponent {
    public allEvents: TimelineItemModel[] = [
        { content: 'Public Announcement', visibility: 'public' },
        { content: 'Internal Review', visibility: 'internal' },
        { content: 'Team Meeting', visibility: 'internal' },
        { content: 'Product Launch', visibility: 'public' }
    ];

    isPublicView = true;

    handleBeforeItemRender = (args: TimelineRenderingEventArgs) => {
        // Hide internal items in public view
        if (this.isPublicView && args.data.visibility === 'internal') {
            args.cancel = true;
        }
    }
}
```

```html
<div>
    <label>
        <input type="checkbox" [checked]="isPublicView" (change)="isPublicView = !isPublicView">
        Public View Only
    </label>

    <ejs-timeline (beforeItemRender)="handleBeforeItemRender($event)">
        <e-items>
            <e-item *ngFor="let item of allEvents" [content]="item.content"></e-item>
        </e-items>
    </ejs-timeline>
</div>
```

## Common Event Patterns

### Pattern 1: Highlight Current Item

```ts
export class AppComponent {
    public steps: TimelineItemModel[] = [
        { content: 'Step 1' },
        { content: 'Step 2' },
        { content: 'Step 3' }
    ];

    currentStep = 1;

    onBeforeItemRender = (args: TimelineRenderingEventArgs) => {
        if (args.index === this.currentStep) {
            args.element.classList.add('highlight');
        }
    }
}
```

**Use for:** Step-by-step wizards, process indicators.

### Pattern 2: Alternate Content Color

```ts
export class AppComponent {
    public events: TimelineItemModel[] = [];

    onBeforeItemRender = (args: TimelineRenderingEventArgs) => {
        const isEven = args.index % 2 === 0;
        args.element.classList.add(isEven ? 'even-item' : 'odd-item');
    }
}
```

```css
.even-item { background-color: #F5F5F5; }
.odd-item { background-color: #FFFFFF; }
```

**Use for:** Enhanced visual separation.

### Pattern 3: Dynamic Loading on Timeline Creation

```ts
export class AppComponent {
    public timeline: TimelineItemModel[] = [];

    onTimelineCreated = () => {
        this.loadTimelineData();
    }

    private loadTimelineData() {
        this.dataService.fetchTimeline().subscribe(data => {
            this.timeline = data;
        });
    }
}
```

**Use for:** Lazy loading, data-dependent initialization.

### Pattern 4: Index-Based Styling

```ts
export class AppComponent {
    public quarters: TimelineItemModel[] = [
        { content: 'Q1' },
        { content: 'Q2' },
        { content: 'Q3' },
        { content: 'Q4' }
    ];

    onBeforeItemRender = (args: TimelineRenderingEventArgs) => {
        const colorMap = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A'];
        args.element.style.borderLeftColor = colorMap[args.index];
    }
}
```

**Use for:** Rainbow/gradient timelines, category-based colors.
