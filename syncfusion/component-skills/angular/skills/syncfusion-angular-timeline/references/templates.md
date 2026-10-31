# Templates

## Table of Contents
- [Overview](#overview)
- [Template Basics](#template-basics)
- [Custom Dot Design](#custom-dot-design)
- [Content Area Customization](#content-area-customization)
- [Complex Layout Examples](#complex-layout-examples)

## Overview

The Timeline component provides comprehensive template customization through the `template` property, allowing you to completely restructure how timeline items appear. Templates give you full control over:
- Dot appearance and icons
- Content layout and styling
- Connector appearance
- Item spacing and structure
- Adding custom HTML and styling

### Template Context

Templates have access to:
- `item` - Current Timeline item object
- `itemIndex` - Zero-based index of the item in the array

```html
<ng-template #myTemplate let-data="">
    <!-- Access item: data.item -->
    <!-- Access index: data.itemIndex -->
</ng-template>
```

## Template Basics

### Basic Template Example

```ts
import { Component } from '@angular/core';
import { TimelineItemModel, TimelineModule, TimelineAllModule } from "@syncfusion/ej2-angular-layouts";
import { CommonModule } from '@angular/common';

@Component({
    imports: [TimelineModule, TimelineAllModule, CommonModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public projectMilestones: TimelineItemModel[] = [
        { content: 'Kickoff meeting' },
        { content: 'Content approved' },
        { content: 'Design approved' },
        { content: 'Product delivered' }
    ];
}
```

```html
<div class="container" style="margin-top: 50px;">
    <ejs-timeline orientation="Horizontal" cssClass="custom-timeline" [template]="timelineTemplate">
        <e-items>
            <e-item *ngFor="let item of projectMilestones" [content]="item.content"></e-item>
        </e-items>
        <ng-template #timelineTemplate let-data="">
            <div class='template-container item-{{data.itemIndex}}'>
                <div class="content-container">
                    <div class="timeline-content">{{data.item.content}}</div>
                </div>
                <div class="content-connector"></div>
                <div class="progress-line">
                    <span class="indicator"></span>
                </div>
            </div>
        </ng-template>
    </ejs-timeline>
</div>
```

```css
.custom-timeline .template-container {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.custom-timeline .timeline-content {
    padding: 12px 20px;
    background-color: #2196F3;
    color: white;
    border-radius: 4px;
    font-weight: 500;
    white-space: nowrap;
}

.custom-timeline .indicator {
    width: 16px;
    height: 16px;
    background-color: #2196F3;
    border: 3px solid white;
    border-radius: 50%;
    display: inline-block;
    box-shadow: 0 2px 4px rgba(33, 150, 243, 0.4);
}
```

## Custom Dot Design

### Icon-Based Dots

```ts
export class AppComponent {
    public workflow: TimelineItemModel[] = [
        { content: 'Submitted', icon: '📝', status: 'completed' },
        { content: 'In Review', icon: '👀', status: 'progress' },
        { content: 'Approved', icon: '✓', status: 'pending' },
        { content: 'Published', icon: '🚀', status: 'pending' }
    ];
}
```

```html
<ejs-timeline [template]="dotTemplate" align="Before">
    <e-items>
        <e-item *ngFor="let item of workflow" 
                [content]="item.content"
                [cssClass]="'status-' + item.status"></e-item>
    </e-items>
    <ng-template #dotTemplate let-data="">
        <div class="custom-dot {{data.item.status}}">
            <span class="dot-icon">{{data.item.icon}}</span>
        </div>
        <div class="dot-content">
            <div class="dot-title">{{data.item.content}}</div>
            <div class="dot-status">{{data.item.status}}</div>
        </div>
    </ng-template>
</ejs-timeline>
```

```css
.custom-dot {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    margin-bottom: 10px;
}

.custom-dot.completed {
    background-color: #4CAF50;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.4);
}

.custom-dot.progress {
    background-color: #2196F3;
    box-shadow: 0 4px 12px rgba(33, 150, 243, 0.4);
    animation: pulse-dot 2s infinite;
}

.custom-dot.pending {
    background-color: #BDBDBD;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.dot-content {
    text-align: center;
}

.dot-title {
    font-weight: 600;
    font-size: 14px;
    margin: 5px 0;
}

.dot-status {
    font-size: 12px;
    color: #666;
    text-transform: capitalize;
}

@keyframes pulse-dot {
    0%, 100% { box-shadow: 0 0 0 0 rgba(33, 150, 243, 0.7); }
    50% { box-shadow: 0 0 0 10px rgba(33, 150, 243, 0); }
}
```

### Progress Indicator Dots

```ts
export class AppComponent {
    public releases: TimelineItemModel[] = [
        { content: 'v1.0.0', progress: 100 },
        { content: 'v1.1.0', progress: 100 },
        { content: 'v2.0.0', progress: 75 },
        { content: 'v2.1.0 (Beta)', progress: 40 }
    ];
}
```

```html
<ejs-timeline [template]="progressTemplate" align="Before">
    <e-items>
        <e-item *ngFor="let item of releases" [content]="item.content"></e-item>
    </e-items>
    <ng-template #progressTemplate let-data="">
        <div class="progress-dot">
            <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="35" class="progress-bg" />
                <circle cx="40" cy="40" r="35" class="progress-fill" 
                        [style.strokeDasharray]="'220 * ' + data.item.progress / 100 + ', 220'"/>
                <text x="40" y="45" class="progress-text">{{data.item.progress}}%</text>
            </svg>
            <div class="progress-label">{{data.item.content}}</div>
        </div>
    </ng-template>
</ejs-timeline>
```

```css
.progress-dot svg {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.progress-bg {
    fill: none;
    stroke: #E0E0E0;
    stroke-width: 4;
}

.progress-fill {
    fill: none;
    stroke: #2196F3;
    stroke-width: 4;
    stroke-linecap: round;
    transform-origin: 40px 40px;
    transform: rotate(-90deg);
    transition: stroke-dasharray 0.3s ease;
}

.progress-text {
    text-anchor: middle;
    font-size: 12px;
    font-weight: bold;
    fill: #333;
}

.progress-label {
    text-align: center;
    margin-top: 8px;
    font-size: 12px;
    color: #666;
}
```

## Content Area Customization

### Rich Content Template

```ts
export class AppComponent {
    public events: TimelineItemModel[] = [
        { 
            content: 'Conference', 
            date: 'March 15, 2024',
            location: 'San Francisco',
            attendees: 150,
            image: 'assets/conference.jpg'
        },
        { 
            content: 'Workshop',
            date: 'April 20, 2024', 
            location: 'New York',
            attendees: 50,
            image: 'assets/workshop.jpg'
        }
    ];
}
```

```html
<ejs-timeline [template]="richTemplate" align="Before" orientation="Vertical">
    <e-items>
        <e-item *ngFor="let item of events" [content]="item.content"></e-item>
    </e-items>
    <ng-template #richTemplate let-data="">
        <div class="event-card">
            <div class="event-image">
                <img [src]="data.item.image" [alt]="data.item.content" />
            </div>
            <div class="event-details">
                <h3>{{data.item.content}}</h3>
                <p class="event-date">📅 {{data.item.date}}</p>
                <p class="event-location">📍 {{data.item.location}}</p>
                <p class="event-attendees">👥 {{data.item.attendees}} attendees</p>
            </div>
        </div>
    </ng-template>
</ejs-timeline>
```

```css
.event-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    max-width: 300px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.event-image {
    width: 100%;
    height: 180px;
    overflow: hidden;
}

.event-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.event-details {
    padding: 16px;
}

.event-details h3 {
    margin: 0 0 10px 0;
    font-size: 16px;
    color: #333;
}

.event-details p {
    margin: 6px 0;
    font-size: 13px;
    color: #666;
}
```

## Complex Layout Examples

### Educational Timeline with Descriptions

```ts
export class AppComponent {
    public curriculum: TimelineItemModel[] = [
        {
            content: 'Semester 1',
            courses: ['Math 101', 'Physics 101', 'Chemistry 101'],
            gpa: 3.8
        },
        {
            content: 'Semester 2',
            courses: ['Calculus', 'Physics 102', 'Biology'],
            gpa: 3.9
        },
        {
            content: 'Semester 3',
            courses: ['Linear Algebra', 'Advanced Physics', 'Organic Chemistry'],
            gpa: 3.7
        }
    ];
}
```

```html
<ejs-timeline [template]="semesterTemplate" align="Alternate" orientation="Vertical">
    <e-items>
        <e-item *ngFor="let item of curriculum" [content]="item.content"></e-item>
    </e-items>
    <ng-template #semesterTemplate let-data="">
        <div class="semester-card">
            <div class="semester-header">
                <h4>{{data.item.content}}</h4>
                <span class="gpa-badge">GPA: {{data.item.gpa}}</span>
            </div>
            <div class="courses-list">
                <div class="course" *ngFor="let course of data.item.courses">
                    <span class="course-bullet">•</span>
                    <span>{{course}}</span>
                </div>
            </div>
        </div>
    </ng-template>
</ejs-timeline>
```

```css
.semester-card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 8px;
    padding: 16px;
    min-width: 250px;
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.semester-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.semester-header h4 {
    margin: 0;
    font-size: 16px;
}

.gpa-badge {
    background: rgba(255, 255, 255, 0.3);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
}

.courses-list {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.course {
    display: flex;
    align-items: center;
    font-size: 13px;
}

.course-bullet {
    margin-right: 8px;
    font-weight: bold;
}
```

### Status Timeline with Progress

```ts
export class AppComponent {
    public deploymentSteps: TimelineItemModel[] = [
        { step: 'Build', status: 'completed', duration: '2m 34s' },
        { step: 'Test', status: 'completed', duration: '5m 12s' },
        { step: 'Deploy', status: 'progress', duration: 'Running...' },
        { step: 'Verify', status: 'pending', duration: 'Waiting' }
    ];
}
```

```html
<ejs-timeline [template]="deployTemplate" align="Before">
    <e-items>
        <e-item *ngFor="let item of deploymentSteps" [content]="item.step"></e-item>
    </e-items>
    <ng-template #deployTemplate let-data="">
        <div class="deploy-step" [class]="'status-' + data.item.status">
            <div class="step-number">{{data.itemIndex + 1}}</div>
            <div class="step-info">
                <div class="step-name">{{data.item.step}}</div>
                <div class="step-duration">{{data.item.duration}}</div>
            </div>
            <div class="step-status">
                <span *ngIf="data.item.status === 'completed'" class="badge-success">✓</span>
                <span *ngIf="data.item.status === 'progress'" class="badge-progress">⟳</span>
                <span *ngIf="data.item.status === 'pending'" class="badge-pending">⋯</span>
            </div>
        </div>
    </ng-template>
</ejs-timeline>
```

```css
.deploy-step {
    display: flex;
    align-items: center;
    padding: 12px 16px;
    background: #F5F5F5;
    border-radius: 6px;
    gap: 12px;
    border-left: 3px solid #CCC;
}

.deploy-step.status-completed {
    background: #E8F5E9;
    border-left-color: #4CAF50;
}

.deploy-step.status-progress {
    background: #E3F2FD;
    border-left-color: #2196F3;
}

.deploy-step.status-pending {
    background: #FFF3E0;
    border-left-color: #FF9800;
}

.step-number {
    width: 32px;
    height: 32px;
    background: #669;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 14px;
}

.step-info {
    flex: 1;
}

.step-name {
    font-weight: 600;
    font-size: 14px;
    color: #333;
}

.step-duration {
    font-size: 12px;
    color: #999;
    margin-top: 2px;
}

.step-status {
    font-size: 18px;
}

.badge-success { color: #4CAF50; }
.badge-progress { color: #2196F3; animation: spin 2s linear infinite; }
.badge-pending { color: #FF9800; }

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```
