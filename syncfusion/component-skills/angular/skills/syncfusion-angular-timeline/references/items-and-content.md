# Items and Content Configuration

## Table of Contents
- [Adding Content](#adding-content)
- [Opposite Content](#opposite-content)
- [CSS Classes for Items](#css-classes-for-items)
- [Disabled Items](#disabled-items)
- [Dot Item Property](#dot-item-property)
- [Dot Icons with dotCss](#dot-icons-with-dotcss)
- [Data Binding from Arrays](#data-binding-from-arrays)

## Adding Content

### String Content

Define simple text content for Timeline items:

```ts
import { TimelineItemModel } from '@syncfusion/ej2-angular-layouts';

export class AppComponent {
  public orderStatus: TimelineItemModel[] = [
    { content: 'Shipped' },
    { content: 'Departed' },
    { content: 'Arrived' },
    { content: 'Out for Delivery' }
  ];
}
```

```html
<ejs-timeline>
  <e-items>
    <e-item *ngFor="let item of orderStatus" [content]="item.content"></e-item>
  </e-items>
</ejs-timeline>
```

**Use this when:** Single line status updates, simple event labels, or minimal content.

### Template-based Content

Use Angular templates for complex content with HTML and styles:

```ts
export class AppComponent {
  public milestones: TimelineItemModel[] = [
    { 
      content: 'Phase 1',
      data: { date: 'Jan 2024', description: 'Requirements gathering' }
    },
    { 
      content: 'Phase 2',
      data: { date: 'Feb 2024', description: 'Design and planning' }
    }
  ];
}
```

```html
<ejs-timeline [template]="itemTemplate">
  <e-items>
    <e-item *ngFor="let item of milestones" [content]="item.content"></e-item>
  </e-items>
  <ng-template #itemTemplate let-data="">
    <div class="timeline-item">
      <h4>{{ data.item.content }}</h4>
      <p>{{ data.item.data?.date }}</p>
      <span>{{ data.item.data?.description }}</span>
    </div>
  </ng-template>
</ejs-timeline>
```

**Use this when:** Rich formatting, nested information, images in items, or complex layouts.

## Opposite Content

### Dual-Sided Display

Display content on both sides of the timeline using `oppositeContent`:

```ts
public frameworks: TimelineItemModel[] = [
  { content: 'ReactJs', oppositeContent: 'Owned by Facebook' },
  { content: 'Angular', oppositeContent: 'Owned by Google' },
  { content: 'VueJs', oppositeContent: 'Owned by Evan you' },
  { content: 'Svelte', oppositeContent: 'Owned by Rich Harris' }
];
```

```html
<ejs-timeline align="Before">
  <e-items>
    <e-item *ngFor="let item of frameworks" 
            [content]="item.content" 
            [oppositeContent]="item.oppositeContent"></e-item>
  </e-items>
</ejs-timeline>
```

**Behavior:**
- **Vertical orientation:** `content` on left, `oppositeContent` on right
- **Horizontal orientation:** `content` on top, `oppositeContent` on bottom
- Works with all alignment values: `Before`, `After`, `Alternate`, `AlternateReverse`

### Use Cases for Opposite Content

- **Comparison timelines:** Two parallel information streams
- **Before/After scenarios:** Original vs updated information
- **Timeline with descriptions:** Main event + context on opposite side
- **Team collaboration:** Person A's timeline vs Person B's timeline

## CSS Classes for Items

### Applying Custom Styles

Add CSS classes to individual items for styling and state management:

```ts
public orderStatus: TimelineItemModel[] = [
  { content: 'Ordered', cssClass: 'state-completed' },
  { content: 'Shipped', cssClass: 'state-progress' },
  { content: 'Delivered', cssClass: 'state-pending' },
  { content: 'Returned', cssClass: 'state-cancelled' }
];
```

```html
<ejs-timeline align="Before">
  <e-items>
    <e-item *ngFor="let item of orderStatus" 
            [content]="item.content" 
            [cssClass]="item.cssClass"></e-item>
  </e-items>
</ejs-timeline>
```

```css
.state-completed {
  background-color: #d4edda;
  border-left: 3px solid #28a745;
}

.state-progress {
  background-color: #fff3cd;
  border-left: 3px solid #ffc107;
}

.state-pending {
  background-color: #d1ecf1;
  border-left: 3px solid #17a2b8;
}

.state-cancelled {
  background-color: #f8d7da;
  border-left: 3px solid #dc3545;
}
```

**Use this when:** Distinguishing item states, visual hierarchy, or status indicators.

## Disabled Items

### Disabling Timeline Items

Set items as disabled to prevent interaction and apply disabled styling:

```ts
public taskList: TimelineItemModel[] = [
  { content: 'Task 1: Analysis', disabled: false },
  { content: 'Task 2: Design', disabled: false },
  { content: 'Task 3: Development', disabled: false },
  { content: 'Task 4: Testing', disabled: true },  // Not yet available
  { content: 'Task 5: Deployment', disabled: true } // Not yet available
];
```

```html
<ejs-timeline align="Before">
  <e-items>
    <e-item *ngFor="let item of taskList" 
            [content]="item.content" 
            [disabled]="item.disabled"></e-item>
  </e-items>
</ejs-timeline>
```

**Visual effects of `disabled: true`:**
- Item appears grayed out by default
- Typically shows reduced opacity
- May have different dot styling

### Using Disabled with CSS Classes

Combine disabled state with custom styling:

```ts
public phases: TimelineItemModel[] = [
  { content: 'Phase 1: Planning', disabled: false, cssClass: 'phase-active' },
  { content: 'Phase 2: Development', disabled: false, cssClass: 'phase-active' },
  { content: 'Phase 3: Review', disabled: true, cssClass: 'phase-upcoming' },
  { content: 'Phase 4: Production', disabled: true, cssClass: 'phase-upcoming' }
];
```

```css
.phase-active {
  color: #333;
}

.phase-upcoming {
  color: #999;
  opacity: 0.6;
}
```

**Use this when:** Multi-phase processes, unlocking features progressively, or showing completed vs pending tasks.

## Dot Item Property

### Customizing Dot Appearance with dotItem

The `dotItem` property allows per-item dot customization. This is used in conjunction with CSS or the `customization.md` reference for visual distinction:

```ts
public milestones: TimelineItemModel[] = [
  { content: 'Milestone 1', dotItem: { dotIconCss: 'dot-primary' } },
  { content: 'Milestone 2', dotItem: { dotIconCss: 'dot-secondary' } },
  { content: 'Milestone 3', dotItem: { dotIconCss: 'dot-completed' } }
];
```

**dotItem properties:**
- `dotIconCss` - CSS class for dot icon styling
- `dotSize` - Custom size for the dot (in pixels)

## Dot Icons with dotCss

### Adding Icons to Timeline Dots

The `dotCss` property allows you to add custom CSS classes to individual timeline dots. This enables displaying icons, images, or custom styling per item.

**dotCss Property:**
- **Type:** `string`
- **Description:** CSS class(es) applied to the dot element
- **Use Case:** Add Material Icons, FontAwesome icons, or custom SVG to dots

#### Basic Icon Example

```ts
export class AppComponent {
  public processSteps: TimelineItemModel[] = [
    { 
      content: 'Analysis', 
      oppositeContent: 'Week 1',
      dotCss: 'icon-analysis'
    },
    { 
      content: 'Design', 
      oppositeContent: 'Week 2',
      dotCss: 'icon-design'
    },
    { 
      content: 'Development', 
      oppositeContent: 'Week 3-5',
      dotCss: 'icon-code'
    },
    { 
      content: 'Testing', 
      oppositeContent: 'Week 6',
      dotCss: 'icon-test'
    }
  ];
}
```

```html
<ejs-timeline align="Before">
  <e-items>
    <e-item *ngFor="let item of processSteps"
            [content]="item.content"
            [oppositeContent]="item.oppositeContent"
            [dotCss]="item.dotCss"></e-item>
  </e-items>
</ejs-timeline>
```

```css
/* Material Icons styling */
.e-dot::before {
  font-family: 'Material Icons';
  font-size: 18px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-analysis .e-dot {
  background-color: #2196F3;
}

.icon-analysis .e-dot::before {
  content: '\\e8f4'; /* analytics icon */
}

.icon-design .e-dot {
  background-color: #9C27B0;
}

.icon-design .e-dot::before {
  content: '\\e3fd'; /* design_services icon */
}

.icon-code .e-dot {
  background-color: #4CAF50;
}

.icon-code .e-dot::before {
  content: '\\e86e'; /* code icon */
}

.icon-test .e-dot {
  background-color: #FF9800;
}

.icon-test .e-dot::before {
  content: '\\e8f0'; /* bug_report icon */
}
```

#### Combining dotCss with cssClass and disabled

```ts
export class AppComponent {
  public deploymentStages: TimelineItemModel[] = [
    { 
      content: 'Build',
      oppositeContent: 'Stage 1',
      dotCss: 'icon-build',
      cssClass: 'stage-completed',
      disabled: false
    },
    { 
      content: 'Staging',
      oppositeContent: 'Stage 2',
      dotCss: 'icon-staging',
      cssClass: 'stage-current',
      disabled: false
    },
    { 
      content: 'Production',
      oppositeContent: 'Stage 3',
      dotCss: 'icon-production',
      cssClass: 'stage-pending',
      disabled: true
    }
  ];
}
```

#### Status Indicators with Icons

```ts
export class AppComponent {
  public taskStatus: TimelineItemModel[] = [
    { 
      content: 'Pending',
      dotCss: 'status-pending'
    },
    { 
      content: 'In Progress',
      dotCss: 'status-progress'
    },
    { 
      content: 'Completed',
      dotCss: 'status-completed'
    }
  ];
}
```

```css
/* Status indicator styles */
.status-pending .e-dot {
  background-color: #ECEFF1;
  border: 2px solid #90A4AE;
}

.status-progress .e-dot {
  background-color: #FFC107;
  animation: pulse 2s infinite;
}

.status-progress .e-dot::before {
  content: '\\e88a'; /* schedule icon */
  animation: spin 1s linear infinite;
}

.status-completed .e-dot {
  background-color: #4CAF50;
}

.status-completed .e-dot::before {
  content: '\\e5ca'; /* check_circle icon */
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7); }
  50% { box-shadow: 0 0 0 8px rgba(255, 193, 7, 0); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

**For complete dotCss examples with Material Design Icons, FontAwesome, and advanced styling, see [customization.md](customization.md#dot-icons-with-dotcss-property).**

## Data Binding from Arrays

### Complete Data Binding Example

Bind timeline data from component arrays:

```ts
import { TimelineItemModel } from '@syncfusion/ej2-angular-layouts';

export class AppComponent {
  public projectTimeline: TimelineItemModel[] = [
    {
      content: 'Project Kickoff',
      oppositeContent: 'January 15, 2024',
      cssClass: 'milestone-important',
      disabled: false
    },
    {
      content: 'Design Phase',
      oppositeContent: 'February 1-28, 2024',
      cssClass: 'phase-standard',
      disabled: false
    },
    {
      content: 'Development',
      oppositeContent: 'March 1 - May 31, 2024',
      cssClass: 'phase-standard',
      disabled: false
    },
    {
      content: 'QA Testing',
      oppositeContent: 'June 1-15, 2024',
      cssClass: 'phase-review',
      disabled: true  // Not yet started
    },
    {
      content: 'Launch',
      oppositeContent: 'June 20, 2024',
      cssClass: 'milestone-important',
      disabled: true  // Not yet started
    }
  ];
}
```

```html
<ejs-timeline align="Alternate" orientation="Vertical">
  <e-items>
    <e-item *ngFor="let item of projectTimeline"
            [content]="item.content"
            [oppositeContent]="item.oppositeContent"
            [cssClass]="item.cssClass"
            [disabled]="item.disabled"></e-item>
  </e-items>
</ejs-timeline>
```

### Dynamic Data Updates

Add and update items programmatically:

```ts
public addItem() {
  const newItem: TimelineItemModel = {
    content: 'New Milestone',
    oppositeContent: 'Added dynamically',
    disabled: false
  };
  this.projectTimeline.push(newItem);
}

public updateItem(index: number, newContent: string) {
  this.projectTimeline[index].content = newContent;
}
```

### Fetching Data from API

Load timeline data from a backend service:

```ts
import { HttpClient } from '@angular/common/http';

export class AppComponent implements OnInit {
  public timeline: TimelineItemModel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<TimelineItemModel[]>('/api/timeline')
      .subscribe(data => {
        this.timeline = data;
      });
  }
}
```

**Use this when:** Displaying dynamic content, loading data from servers, or managing large datasets.
