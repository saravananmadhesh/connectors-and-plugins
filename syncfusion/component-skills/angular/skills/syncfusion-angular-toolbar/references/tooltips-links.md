# Tooltips & Links

## Table of Contents
- [Tooltips Overview](#tooltips-overview)
- [Tooltip Text Property](#tooltip-text-property)
- [Tooltip Module Integration](#tooltip-module-integration)
- [Tooltip Styling](#tooltip-styling)
- [Links in Toolbar](#links-in-toolbar)
- [Anchor Elements](#anchor-elements)
- [Toggle Button Implementation](#toggle-button-implementation)
- [Button State Management](#button-state-management)

## Tooltips Overview

Tooltips provide hint text that appears on mouse hover, helping users understand toolbar command functionality without cluttering the interface.

### Purpose of Tooltips

- Display help text for toolbar buttons
- Explain command functionality
- Show keyboard shortcuts
- Improve user experience and accessibility

## Tooltip Text Property

Use the `tooltipText` property on toolbar items to set simple HTML tooltips.

### Basic Tooltip Text

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut' tooltipText='Cut selected content'></e-item>
        <e-item text='Copy' tooltipText='Copy selected content'></e-item>
        <e-item text='Paste' tooltipText='Paste from clipboard'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Undo' tooltipText='Undo the last action'></e-item>
        <e-item text='Redo' tooltipText='Redo the last action'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

### Tooltip with Keyboard Shortcuts

```typescript
<e-item text='Cut' tooltipText='Cut (Ctrl+X)'></e-item>
<e-item text='Copy' tooltipText='Copy (Ctrl+C)'></e-item>
<e-item text='Paste' tooltipText='Paste (Ctrl+V)'></e-item>
<e-item text='Bold' tooltipText='Bold (Ctrl+B)'></e-item>
<e-item text='Italic' tooltipText='Italic (Ctrl+I)'></e-item>
<e-item text='Underline' tooltipText='Underline (Ctrl+U)'></e-item>
```

## Tooltip Module Integration

For more advanced tooltip features, use the Tooltip module from `ej2-popups`.

### Setup Tooltip Module

1. Import `TooltipModule` from `@syncfusion/ej2-angular-popups`
2. Initialize Tooltip with target selector
3. Use `tooltipText` property on items

### Tooltip with Ej2 Module

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, TooltipModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <!-- Tooltip wraps toolbar with target selector -->
    <ejs-tooltip id="Tooltip" target='#Toolbar [title]'>
      <ejs-toolbar id='Toolbar'>
        <e-items>
          <e-item text='Cut' tooltipText='Cut'></e-item>
          <e-item text='Copy' tooltipText='Copy'></e-item>
          <e-item text='Paste' tooltipText='Paste'></e-item>
          <e-item type='Separator'></e-item>
          <e-item text='Undo' tooltipText='Undo'></e-item>
          <e-item text='Redo' tooltipText='Redo'></e-item>
        </e-items>
      </ejs-toolbar>
    </ejs-tooltip>
  `
})
export class AppComponent { }
```

### Complete Tooltip Configuration

```typescript
<ejs-tooltip id="Toolbar_tooltip"
             target='#Toolbar button'
             position='TopCenter'
             showDelay='1000'
             hideDelay='100'>
  <ejs-toolbar id='Toolbar'>
    <!-- toolbar items -->
  </ejs-toolbar>
</ejs-tooltip>
```

## Tooltip Styling

Customize tooltip appearance with CSS.

### Tooltip Container Styling

```css
.e-tooltip {
  background-color: #333;
  color: #fff;
  border-radius: 3px;
  padding: 6px 10px;
  font-size: 12px;
  max-width: 200px;
}
```

### Tooltip Arrow Styling

```css
.e-tooltip-pointer {
  border-top-color: #333;
}

/* Tooltip positioned below */
.e-tooltip.e-tooltip-bottom .e-tooltip-pointer {
  border-bottom-color: #333;
}
```

### Custom Tooltip Theme

```css
.e-tooltip.custom-tooltip {
  background-color: #1a237e;
  color: #fff;
  border: 1px solid #0d47a1;
  border-radius: 4px;
  padding: 8px 12px;
  font-weight: 500;
}
```

## Links in Toolbar

Add clickable hyperlinks and anchor elements within toolbar items.

### Basic Link Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item text='Copy'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Paste'></e-item>
        <e-item type='Separator'></e-item>
        
        <!-- Link item -->
        <e-item>
          <ng-template #template>
            <div>
              <a target="_blank"
                 href="url">
                Documentation
              </a>
            </div>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

## Anchor Elements

### Link with Icon

```typescript
<e-item>
  <ng-template #template>
    <a href="url"
       class="toolbar-link"
       title="External Link">
      <i class="e-icons e-external-link"></i>
      Visit
    </a>
  </ng-template>
</e-item>
```

### Internal Link with Routing

```typescript
<e-item>
  <ng-template #template>
    <a [routerLink]="'/products'"
       [queryParams]="{category: 'electronics'}"
       class="toolbar-link">
      Products
    </a>
  </ng-template>
</e-item>
```

### Link Styling

```css
.toolbar-link {
  color: #2196f3;
  text-decoration: none;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.toolbar-link:hover {
  color: #1976d2;
  text-decoration: underline;
}

.toolbar-link .e-icons.e-btn-icon {
  font-size: 14px;
}
```

## Toggle Button Implementation

Create buttons that toggle between multiple states.

### Basic Toggle Button

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { Component, ViewChild } from '@angular/core';
import { ButtonComponent } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [ToolbarModule, ButtonModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item>
          <ng-template #template>
            <button ejs-button
                    class="e-btn"
                    cssClass="e-flat"
                    iconCss="e-icons e-play-icon"
                    isToggle="true"
                    #playButton
                    (click)="onPlayClick()">
              Play
            </button>
          </ng-template>
        </e-item>
        <e-item type='Separator'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  @ViewChild('playButton') playButton?: ButtonComponent;
  
  onPlayClick() {
    if (this.playButton?.element.classList.contains('e-active')) {
      console.log('Playing...');
    } else {
      console.log('Paused');
    }
  }
}
```

### Play/Pause Toggle

```typescript
<e-item>
  <ng-template #template>
    <button ejs-button
            class="e-btn"
            cssClass="e-flat"
            [iconCss]="isPlaying ? 'e-icons e-pause-icon' : 'e-icons e-play-icon'"
            isToggle="true"
            (click)="togglePlayPause()">
      {{ isPlaying ? 'Pause' : 'Play' }}
    </button>
  </ng-template>
</e-item>
```

Component:
```typescript
export class AppComponent {
  isPlaying: boolean = false;

  togglePlayPause() {
    this.isPlaying = !this.isPlaying;
  }
}
```

### Show/Hide Toggle

```typescript
<e-item>
  <ng-template #template>
    <button ejs-button
            class="e-btn"
            cssClass="e-flat"
            [iconCss]="isVisible ? 'e-icons e-hide-icon' : 'e-icons e-show-icon'"
            isToggle="true"
            (click)="toggleVisibility()">
      {{ isVisible ? 'Hide' : 'Show' }}
    </button>
  </ng-template>
</e-item>

<div *ngIf="isVisible" class="content-panel">
  Content that toggles visibility
</div>
```

Component:
```typescript
export class AppComponent {
  isVisible: boolean = true;

  toggleVisibility() {
    this.isVisible = !this.isVisible;
  }
}
```

## Button State Management

### Multiple State Toggle

```typescript
export class AppComponent {
  states = ['Off', 'On', 'Auto'];
  currentState: number = 0;

  toggleState() {
    this.currentState = (this.currentState + 1) % this.states.length;
  }

  getCurrentState(): string {
    return this.states[this.currentState];
  }
}
```

Template:
```typescript
<e-item>
  <ng-template #template>
    <button ejs-button
            class="e-btn"
            isToggle="true"
            (click)="toggleState()">
      {{ getCurrentState() }}
    </button>
  </ng-template>
</e-item>
```

### Toggle with Styling Changes

```typescript
<e-item>
  <ng-template #template>
    <button ejs-button
            class="e-btn"
            [ngClass]="{'active': isActive, 'inactive': !isActive}"
            isToggle="true"
            (click)="toggleActive()">
      <span class="e-icons" [ngClass]="isActive ? 'e-check-icon' : 'e-cross-icon'"></span>
      {{ isActive ? 'Enabled' : 'Disabled' }}
    </button>
  </ng-template>
</e-item>
```

CSS:
```css
.toolbar-button.active {
  background-color: #4caf50;
  color: #fff;
}

.toolbar-button.active .e-icons.e-btn-icon {
  color: #fff;
}

.toolbar-button.inactive {
  background-color: #f44336;
  color: #fff;
}

.toolbar-button.inactive .e-icons.e-btn-icon {
  color: #fff;
}
```

### Complete Toggle Button Example

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule, ButtonModule, CommonModule],
  standalone: true,
  selector: 'app-container',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item>
          <ng-template #template>
            <button ejs-button
                    class="e-btn toggle-btn"
                    cssClass="e-flat"
                    [iconCss]="isPlaying ? 'e-icons e-pause-icon' : 'e-icons e-play-icon'"
                    isToggle="true"
                    (click)="togglePlay()">
              {{ isPlaying ? 'Pause' : 'Play' }}
            </button>
          </ng-template>
        </e-item>
        
        <e-item type='Separator'></e-item>
        
        <e-item>
          <ng-template #template>
            <button ejs-button
                    class="e-btn toggle-btn"
                    cssClass="e-flat"
                    [iconCss]="isMuted ? 'e-icons e-volume-mute' : 'e-icons e-volume-high'"
                    isToggle="true"
                    (click)="toggleMute()">
              {{ isMuted ? 'Unmute' : 'Mute' }}
            </button>
          </ng-template>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  isPlaying: boolean = false;
  isMuted: boolean = false;

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    console.log('Playing:', this.isPlaying);
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    console.log('Muted:', this.isMuted);
  }
}
```

