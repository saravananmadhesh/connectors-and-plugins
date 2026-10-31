# Customization

## Table of Contents
- [Connector Styling](#connector-styling)
- [Dot Appearance](#dot-appearance)
  - [Dot Size Customization](#dot-size-customization)
  - [Dot Color Customization](#dot-color-customization)
  - [Dot Outline and Effects](#dot-outline-and-effects)
  - [Dot Variant Styles](#dot-variant-styles)
  - [Dot Icons with dotCss Property](#dot-icons-with-dotcss-property)
- [Item-Level Styling](#item-level-styling)
- [Advanced Examples](#advanced-examples)

## Connector Styling

### Common Connector Styling

Apply styles to all Timeline item connectors for consistent presentation across the entire Timeline.

#### Global Connector CSS

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
    public dailyRoutine: TimelineItemModel[] = [
        { content: 'Eat' },
        { content: 'Code' },
        { content: 'Repeat' }
    ];
}
```

```html
<ejs-timeline align="Before" cssClass="custom-timeline">
    <e-items>
        <e-item *ngFor="let item of dailyRoutine" [content]="item.content"></e-item>
    </e-items>
</ejs-timeline>
```

```css
/* app.component.css */
.custom-timeline .e-timeline-item.e-connector::after {
    border-color: #2196F3;
    border-width: 3px;
}
```

**Key CSS selectors:**
- `.e-connector::after` - Connector line between dots
- `.e-timeline-item` - Timeline item container
- `.e-content` - Main content area
- `.e-opposite-content` - Opposite side content

### Individual Connector Styling

Style connectors for specific items using CSS classes:

```ts
export class AppComponent {
    public dailyRoutine: TimelineItemModel[] = [
        { content: 'Eat', cssClass: 'activity-food' },
        { content: 'Code', cssClass: 'activity-work' },
        { content: 'Repeat', cssClass: 'activity-repeat' }
    ];
}
```

```html
<ejs-timeline align="Before">
    <e-items>
        <e-item *ngFor="let item of dailyRoutine" 
                [content]="item.content"
                [cssClass]="item.cssClass"></e-item>
    </e-items>
</ejs-timeline>
```

```css
.e-timeline-item.activity-food.e-connector::after {
    border-color: #FF9800;
    border-width: 2px;
}

.e-timeline-item.activity-work.e-connector::after {
    border-color: #2196F3;
    border-width: 3px;
}

.e-timeline-item.activity-repeat.e-connector::after {
    border-color: #4CAF50;
    border-width: 2px;
    border-style: dashed;
}
```

**Use this when:** Different phases have different visual connectors, status indicators, or priority levels.

## Dot Appearance

### Dot Size Customization

Customize the size of timeline dots using CSS:

```ts
export class AppComponent {
    public milestones: TimelineItemModel[] = [
        { content: 'Phase 1', cssClass: 'dot-sm' },
        { content: 'Phase 2', cssClass: 'dot-md' },
        { content: 'Phase 3', cssClass: 'dot-lg' }
    ];
}
```

```html
<ejs-timeline align="Before">
    <e-items>
        <e-item *ngFor="let item of milestones" 
                [content]="item.content"
                [cssClass]="item.cssClass"></e-item>
    </e-items>
</ejs-timeline>
```

```css
.dot-sm .e-dot {
    min-width: 12px;
    min-height: 12px;
}

.dot-md .e-dot {
    min-width: 20px;
    min-height: 20px;
}

.dot-lg .e-dot {
    min-width: 28px;
    min-height: 28px;
}
```

### Dot Color Customization

```ts
export class AppComponent {
    public orderStatus: TimelineItemModel[] = [
        { content: 'Processing', cssClass: 'status-pending' },
        { content: 'Shipped', cssClass: 'status-progress' },
        { content: 'Delivered', cssClass: 'status-completed' }
    ];
}
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
.status-pending .e-dot {
    background-color: #FF9800;
    border: 2px solid #F57C00;
}

.status-progress .e-dot {
    background-color: #2196F3;
    border: 2px solid #1976D2;
}

.status-completed .e-dot {
    background-color: #4CAF50;
    border: 2px solid #388E3C;
}
```

### Dot Outline Customization

Add borders and outlines to dots:

```html
<ejs-timeline align="Before">
    <e-items>
        <e-item *ngFor="let item of items" 
                [content]="item.content"
                [cssClass]="'outlined-dot'"></e-item>
    </e-items>
</ejs-timeline>
```

```css
.outlined-dot .e-dot {
    background-color: white;
    border: 3px solid #2196F3;
    outline: 2px solid #E3F2FD;
}
```

### Dot Shadow Effects

Create depth with shadows:

```css
.dot-shadow .e-dot {
    background-color: #2196F3;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.dot-shadow-large .e-dot {
    background-color: #4CAF50;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
}
```

### Dot Variant Styles

Create different dot styles for various scenarios:

```ts
export class AppComponent {
    public workflow: TimelineItemModel[] = [
        { content: 'Pending', cssClass: 'dot-variant-pending' },
        { content: 'In Progress', cssClass: 'dot-variant-progress' },
        { content: 'Completed', cssClass: 'dot-variant-completed' },
        { content: 'Archived', cssClass: 'dot-variant-archived' }
    ];
}
```

```html
<ejs-timeline align="Before">
    <e-items>
        <e-item *ngFor="let item of workflow" 
                [content]="item.content"
                [cssClass]="item.cssClass"></e-item>
    </e-items>
</ejs-timeline>
```

```css
/* Default circle */
.dot-variant-pending .e-dot {
    background-color: #ECEFF1;
    border: 2px solid #90A4AE;
}

/* Progress - filled circle */
.dot-variant-progress .e-dot {
    background-color: #FFC107;
    border: 2px solid #FBC02D;
    animation: pulse 2s infinite;
}

/* Completed - checkmark style */
.dot-variant-completed .e-dot {
    background-color: #4CAF50;
    border: 2px solid #2E7D32;
}

.dot-variant-completed .e-dot::before {
    content: '✓';
    color: white;
    font-weight: bold;
}

/* Archived - muted */
.dot-variant-archived .e-dot {
    background-color: #BDBDBD;
    border: 2px solid #757575;
    opacity: 0.6;
}

@keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(255, 193, 7, 0.7); }
    50% { box-shadow: 0 0 0 8px rgba(255, 193, 7, 0); }
}
```

### Dot Icons with dotCss Property

Use the `dotCss` property to add custom icons or images to timeline dots. This is ideal for displaying status indicators, FontAwesome icons, or Material Design icons.

**dotCss Property:**
- **Type:** `string`
- **Description:** CSS class(es) applied to the dot element, allowing you to display icons or images using CSS content property or backgroundImage
- **Use Case:** Add FontAwesome, Material Icons, or custom SVG icons to timeline dots

#### Example 1: Material Design Icons

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
    imports: [TimelineModule, TimelineAllModule, CommonModule],
    standalone: true,
    selector: 'app-dot-icons',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public softwareDevelopment: TimelineItemModel[] = [
        { 
            content: 'Requirements Gathering',
            oppositeContent: 'Week 1-2',
            dotCss: 'icon-requirements'
        },
        { 
            content: 'System Design',
            oppositeContent: 'Week 3-4',
            dotCss: 'icon-design'
        },
        { 
            content: 'Development',
            oppositeContent: 'Week 5-7',
            dotCss: 'icon-code'
        },
        { 
            content: 'Testing',
            oppositeContent: 'Week 8-9',
            dotCss: 'icon-test'
        },
        { 
            content: 'Deployment',
            oppositeContent: 'Week 10',
            dotCss: 'icon-deploy'
        }
    ];
}
```

```html
<ejs-timeline align="Before" cssClass="icon-timeline">
    <e-items>
        <e-item *ngFor="let item of softwareDevelopment" 
                [content]="item.content"
                [oppositeContent]="item.oppositeContent"
                [dotCss]="item.dotCss"></e-item>
    </e-items>
</ejs-timeline>
```

```css
/* Styles for icon timeline */
.icon-timeline .e-dot::before {
    font-family: 'Material Icons';
    font-size: 20px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Individual icon styles with Material Icons Unicode */
.icon-requirements .e-dot {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.icon-requirements .e-dot::before {
    content: '\\e8e8'; /* assignment icon */
}

.icon-design .e-dot {
    background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.icon-design .e-dot::before {
    content: '\\e3fd'; /* design_services icon */
}

.icon-code .e-dot {
    background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.icon-code .e-dot::before {
    content: '\\e86e'; /* code icon */
}

.icon-test .e-dot {
    background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.icon-test .e-dot::before {
    content: '\\e8f0'; /* bug_report icon */
}

.icon-deploy .e-dot {
    background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.icon-deploy .e-dot::before {
    content: '\\e2c4'; /* cloud_upload icon */
}

/* Hover effect */
.icon-timeline .e-timeline-item:hover .e-dot {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}
```

#### Example 2: FontAwesome Icons

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
    imports: [TimelineModule, TimelineAllModule, CommonModule],
    standalone: true,
    selector: 'app-font-awesome-icons',
    template: `
        <div class="container">
            <h2>Timeline with FontAwesome Icons</h2>
            <ejs-timeline align="Before" cssClass="fa-timeline">
                <e-items>
                    <e-item *ngFor="let event of events" 
                            [content]="event.content"
                            [oppositeContent]="event.date"
                            [dotCss]="event.dotCss"></e-item>
                </e-items>
            </ejs-timeline>
        </div>
    `,
    styles: [`
        .container { padding: 20px; }
        
        .fa-timeline .e-dot {
            background: white;
            border: 3px solid #2196F3;
            font-size: 0;
        }
        
        .fa-timeline .e-dot::before {
            font-family: 'FontAwesome';
            font-size: 20px;
            color: #2196F3;
        }
        
        .icon-user .e-dot::before { content: '\\f007'; }
        .icon-check .e-dot::before { content: '\\f05d'; }
        .icon-flag .e-dot::before { content: '\\f024'; }
        .icon-star .e-dot::before { content: '\\f005'; }
    `]
})
export class FontAwesomeIconsComponent {
    events: any[] = [
        { content: 'User Registration', date: 'Jan 1', dotCss: 'icon-user' },
        { content: 'Email Verified', date: 'Jan 2', dotCss: 'icon-check' },
        { content: 'Profile Marked', date: 'Jan 3', dotCss: 'icon-flag' },
        { content: 'Premium Status', date: 'Jan 5', dotCss: 'icon-star' }
    ];
}
```

#### Example 3: Custom Image Backgrounds

```css
/* Using background images in dots */
.icon-custom .e-dot {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.icon-success .e-dot {
    background-image: url('assets/icons/success.svg');
    background-color: #E8F5E9;
}

.icon-warning .e-dot {
    background-image: url('assets/icons/warning.svg');
    background-color: #FFF3E0;
}

.icon-error .e-dot {
    background-image: url('assets/icons/error.svg');
    background-color: #FFEBEE;
}
```

#### Best Practices for dotCss:
1. **Icon Font Setup:** Ensure MaterialIcons, FontAwesome, or other icon fonts are properly imported
2. **Color Coding:** Use different colors for different icon types to improve visual distinction
3. **Size Consistency:** Keep dot sizes consistent when using icons
4. **Accessibility:** Provide meaningful content descriptions with oppositeContent
5. **Performance:** Use CSS sprites or web fonts for better performance over individual images

## Item-Level Styling

### Content Container Styling

```html
<ejs-timeline [cssClass]="'styled-timeline'" align="Before">
    <e-items>
        <e-item *ngFor="let item of items" 
                [content]="item.content"
                [cssClass]="item.cssClass"></e-item>
    </e-items>
</ejs-timeline>
```

```css
.styled-timeline .e-content {
    padding: 15px;
    background-color: #F5F5F5;
    border-radius: 4px;
    border-left: 4px solid #2196F3;
}

.styled-timeline .e-timeline-item:hover .e-content {
    background-color: #E3F2FD;
    box-shadow: 0 2px 8px rgba(33, 150, 243, 0.2);
    transition: all 0.3s ease;
}
```

### Spacing and Layout

```css
.custom-timeline .e-timeline {
    padding: 20px;
}

.custom-timeline .e-timeline-item {
    margin-bottom: 10px;
}

/* Horizontal spacing */
.custom-timeline .e-timeline-item:not(:last-child).e-connector::after {
    height: 60px;
}
```

## Advanced Examples

### Multi-Status Timeline

```ts
export class AppComponent {
    public projectStatus: TimelineItemModel[] = [
        { content: 'Design Approved', oppositeContent: 'March 15', cssClass: 'status-completed' },
        { content: 'Development Sprint 1', oppositeContent: 'In Progress', cssClass: 'status-progress' },
        { content: 'Code Review', oppositeContent: 'Pending', cssClass: 'status-pending' },
        { content: 'QA Testing', oppositeContent: 'Scheduled', cssClass: 'status-scheduled' },
        { content: 'Deployment', oppositeContent: 'Future', cssClass: 'status-future', disabled: true }
    ];
}
```

```html
<ejs-timeline align="Alternate" [cssClass]="'multi-status'">
    <e-items>
        <e-item *ngFor="let item of projectStatus" 
                [content]="item.content"
                [oppositeContent]="item.oppositeContent"
                [cssClass]="item.cssClass"
                [disabled]="item.disabled"></e-item>
    </e-items>
</ejs-timeline>
```

```css
.multi-status .status-completed .e-dot {
    background-color: #4CAF50;
    box-shadow: 0 2px 8px rgba(76, 175, 80, 0.3);
}

.multi-status .status-progress .e-dot {
    background-color: #2196F3;
    animation: pulse-blue 2s infinite;
}

.multi-status .status-pending .e-dot {
    background-color: #FF9800;
}

.multi-status .status-scheduled .e-dot {
    background-color: #9C27B0;
}

.multi-status .status-future .e-dot {
    background-color: #BDBDBD;
    opacity: 0.5;
}

.multi-status .e-timeline-item.status-completed.e-connector::after {
    border-color: #4CAF50;
}

.multi-status .e-timeline-item.status-progress.e-connector::after {
    border-color: #2196F3;
}

@keyframes pulse-blue {
    0%, 100% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7); }
    50% { box-shadow: 0 0 0 10px rgba(33, 150, 243, 0); }
}
```

### Responsive Customization

```css
/* Mobile: Stack vertically, reduce dot size */
@media (max-width: 768px) {
    .responsive-timeline.e-timeline {
        --dot-size: 16px;
    }

    .responsive-timeline .e-content {
        padding: 10px;
        font-size: 14px;
    }
}

/* Tablet: Medium sizing */
@media (min-width: 768px) and (max-width: 1024px) {
    .responsive-timeline.e-timeline {
        --dot-size: 18px;
    }
}
```
