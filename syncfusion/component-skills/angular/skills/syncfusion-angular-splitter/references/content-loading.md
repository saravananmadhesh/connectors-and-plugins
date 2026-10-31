# Content Loading Methods

Splitter supports multiple ways to populate pane content: HTML strings, templates, DOM selectors, and dynamic content.

## String Content

### Simple Text/HTML String

Use the `content` property for quick content:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-string-content',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='200px' content='<div class="content"><h3>Left Pane</h3><p>String content</p></div>'>
        </e-pane>
        <e-pane size='200px' content='<div class="content"><h3>Right Pane</h3><p>HTML string</p></div>'>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .content {
      padding: 15px;
    }
  `]
})
export class StringContentComponent {}
```

### HTML with Inline Styles

```typescript
<e-pane size='200px' content='
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
    <h3 style="color: #007bff;">Styled Content</h3>
    <p>Content with inline styles</p>
  </div>
'>
</e-pane>
```

### Advantages

✓ Quick and simple for static content
✓ No component lifecycle overhead
✓ Works for plain HTML
✓ Good for debugging

### Disadvantages

✗ No Angular binding (not reactive)
✗ No event handlers
✗ Hard to maintain complex HTML
✗ XSS vulnerability if user input (use with caution)

---

## Template Content

### ng-template Content

Use `<ng-template>` with `#content` reference for Angular integration:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-template-content',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='300px' width='600px'>
      <e-panes>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='pane'>
              <h3>Template Content</h3>
              <p>Fully Angular-integrated</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='pane'>
              <h3>Right Pane</h3>
              <p>Also template</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .pane {
      padding: 20px;
    }
  `]
})
export class TemplateContentComponent {}
```

### Data Binding in Template

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-binding-template',
  standalone: true,
  imports: [SplitterModule, CommonModule],
  template: `
    <ejs-splitter height='300px' width='600px'>
      <e-panes>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='pane'>
              <h3>{{ title }}</h3>
              <ul>
                <li *ngFor='let item of leftItems'>{{ item }}</li>
              </ul>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='pane'>
              <h3>{{ rightTitle }}</h3>
              <p>Count: {{ counter }}</p>
              <button (click)='increment()'>Increment</button>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .pane {
      padding: 20px;
    }

    button {
      padding: 8px 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #0056b3;
    }
  `]
})
export class BindingTemplateComponent {
  title = 'Left Panel';
  rightTitle = 'Right Panel';
  counter = 0;

  leftItems = ['Item 1', 'Item 2', 'Item 3'];

  increment(): void {
    this.counter++;
  }
}
```

### Event Handling in Template

```typescript
<ejs-splitter height='300px' width='600px'>
  <e-panes>
    <e-pane size='200px'>
      <ng-template #content>
        <div class='pane'>
          <button (click)='onLeftClick()'>Click Me</button>
          <p *ngIf='leftClicked'>Button was clicked!</p>
        </div>
      </ng-template>
    </e-pane>
    <e-pane size='200px'>
      <ng-template #content>
        <div class='pane'>
          <input [(ngModel)]='inputValue' placeholder='Type here' />
          <p>You typed: {{ inputValue }}</p>
        </div>
      </ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

```typescript
export class EventTemplateComponent {
  leftClicked = false;
  inputValue = '';

  onLeftClick(): void {
    this.leftClicked = true;
    setTimeout(() => {
      this.leftClicked = false;
    }, 1000);
  }
}
```

### Advantages

✓ Full Angular integration (binding, directives, pipes)
✓ Reactive data flow
✓ Event handlers and two-way binding
✓ Type-safe
✓ Easy to maintain

### Disadvantages

✗ More setup code
✗ Requires CommonModule for *ngIf, *ngFor
✗ More memory per pane (component instances)

---

## DOM Selector Content

### Reference External HTML Elements

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-selector-content',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <!-- Hidden content containers -->
    <div id='left-pane-content' style='display: none;'>
      <div>
        <h3>Left Content</h3>
        <p>Hidden in DOM, referenced by selector</p>
      </div>
    </div>

    <div id='middle-pane-content' style='display: none;'>
      <div>
        <h3>Middle Content</h3>
        <p>Also hidden initially</p>
      </div>
    </div>

    <div id='right-pane-content' style='display: none;'>
      <div>
        <h3>Right Content</h3>
        <p>Loaded on demand</p>
      </div>
    </div>

    <!-- Splitter using selectors -->
    <ejs-splitter #splitter height='250px' width='100%' separatorSize='4'></ejs-splitter>
  `
})
export class SelectorContentComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;

  ngAfterViewInit() {
    // Set pane settings with selectors after view init
    this.splitterObj!.paneSettings = [
      { size: '25%', min: '60px', content: '#left-pane-content' },
      { size: '50%', min: '60px', content: '#middle-pane-content' },
      { size: '25%', min: '60px', content: '#right-pane-content' }
    ];
  }
}
```

### Dynamic Content Containers

```typescript
<div id='user-panel' style='display: none;'>
  <div class='panel-content'>
    <h3>User Profile</h3>
    <img src='avatar.jpg' alt='User' />
    <p>Name: John Doe</p>
  </div>
</div>

<div id='settings-panel' style='display: none;'>
  <div class='panel-content'>
    <h3>Settings</h3>
    <label>
      <input type='checkbox' />
      Enable notifications
    </label>
  </div>
</div>

<ejs-splitter #splitter height='400px' width='100%'></ejs-splitter>
```

```typescript
ngAfterViewInit() {
  this.splitterObj!.paneSettings = [
    { size: '30%', content: '#user-panel' },
    { size: '70%', content: '#settings-panel' }
  ];
}
```

### Advantages

✓ Content separated from splitter markup
✓ Reusable content containers
✓ Good for complex HTML
✓ Cleaner template

### Disadvantages

✗ Content must exist in DOM
✗ Harder to bind/update data
✗ Less discoverable (selectors in code)

---

## Dynamic Content Updates

### Update Content After Initialization

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-dynamic-content',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div style='margin-bottom: 20px'>
      <button class='e-btn' (click)='loadData()'>Load Data</button>
      <button class='e-btn' (click)='clearData()'>Clear</button>
    </div>

    <ejs-splitter #splitter height='300px' width='100%'>
      <e-panes>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='pane'>
              <h3>Data Panel</h3>
              <div id='data-container'>
                Click "Load Data" to load content...
              </div>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='pane'>
              <h3>Status</h3>
              <p id='status'>Ready</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .pane {
      padding: 20px;
    }

    button {
      padding: 8px 15px;
      margin-right: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #0056b3;
    }
  `]
})
export class DynamicContentComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;

  loadData(): void {
    const container = document.getElementById('data-container');
    const status = document.getElementById('status');

    if (container && status) {
      container.innerHTML = `
        <ul>
          <li>Item 1</li>
          <li>Item 2</li>
          <li>Item 3</li>
        </ul>
      `;
      status.textContent = 'Data loaded at ' + new Date().toLocaleTimeString();
    }
  }

  clearData(): void {
    const container = document.getElementById('data-container');
    const status = document.getElementById('status');

    if (container && status) {
      container.innerHTML = 'Cleared';
      status.textContent = 'Cleared at ' + new Date().toLocaleTimeString();
    }
  }
}
```

### Real-Time Content Updates

```typescript
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { SplitterModule, SplitterComponent } from '@syncfusion/ej2-angular-layouts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realtime-content',
  standalone: true,
  imports: [SplitterModule, CommonModule],
  template: `
    <ejs-splitter height='300px' width='100%'>
      <e-panes>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='pane'>
              <h3>Live Updates</h3>
              <p>Time: {{ currentTime }}</p>
              <p>Count: {{ counter }}</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='pane'>
              <h3>Info</h3>
              <p>Updates every second</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .pane {
      padding: 20px;
    }
  `]
})
export class RealtimeContentComponent implements OnDestroy {
  currentTime = new Date().toLocaleTimeString();
  counter = 0;
  private intervalId?: number;

  ngOnInit(): void {
    this.intervalId = window.setInterval(() => {
      this.currentTime = new Date().toLocaleTimeString();
      this.counter++;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
```

---

## Content Loading Best Practices

✓ Use templates for complex, interactive content
✓ Use string content for simple, static content
✓ Use selectors for reusable content containers
✓ Always clean up resources in ngOnDestroy
✓ Consider performance with many panes (component instances)
✓ Test content updates for memory leaks
✓ Use change detection strategically (OnPush for performance)

