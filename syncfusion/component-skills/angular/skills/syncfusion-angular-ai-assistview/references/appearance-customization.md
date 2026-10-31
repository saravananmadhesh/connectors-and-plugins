# Appearance and Styling Customization

## Setting Component Width

The `width` property defines the width of the AI AssistView container. You can set this as a string using pixels (e.g., `"500px"`) or percentage (e.g., `"50%"`). The default is `"100%"`, filling the parent container.

### Fixed Width Example

```typescript
import { Component } from '@angular/core';
import { AIAssistViewModule } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [width]="'800px'">
    </div>
  `
})
export class AppComponent { }
```

### Responsive Width

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [width]="'100%'"
      style="max-width: 1200px; margin: 0 auto;">
    </div>
  `
})
export class AppComponent { }
```

### Percentage-Based Width

```typescript
template: `
  <div class="container">
    <div ejs-aiassistview 
      id='aiAssistView'
      [width]="'75%'">
    </div>
  </div>
`

styles: [`
  .container {
    display: flex;
    width: 100%;
  }
  .container ::ng-deep #aiAssistView {
    border-right: 1px solid #e0e0e0;
  }
`]
```

---

## Setting Component Height

The `height` property defines the height of the AI AssistView container. You can specify it as pixels (e.g., `"600px"`) or percentage (e.g., `"100%"`). The default is `"100%"`.

### Fixed Height Example

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [height]="'600px'">
    </div>
  `
})
export class AppComponent { }
```

### Full Viewport Height

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [height]="'100vh'">
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100vh;
    }
  `]
})
export class AppComponent { }
```

### Responsive Height

```typescript
import { ViewChild, HostListener } from '@angular/core';
import { AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [height]="componentHeight">
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  componentHeight = '600px';

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    const windowHeight = window.innerHeight;
    const headerHeight = 60; // Adjust based on your layout
    this.componentHeight = (windowHeight - headerHeight) + 'px';
  }
}
```

---

## Applying Custom CSS Styles

The `cssClass` property applies one or more custom CSS classes to the AI AssistView component's root element, enabling advanced style customization.

### Single CSS Class

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [cssClass]="'custom-theme'">
    </div>
  `,
  styles: [`
    :host ::ng-deep .custom-theme {
      border: 2px solid #2196F3;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    :host ::ng-deep .custom-theme .e-prompt-input {
      border-radius: 0 0 8px 8px;
    }
  `]
})
export class AppComponent { }
```

### Multiple CSS Classes

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [cssClass]="'dark-theme bordered-style'"
      [width]="'100%'"
      [height]="'100vh'">
    </div>
  `,
  styles: [`
    :host ::ng-deep .dark-theme {
      background-color: #1e1e1e;
      color: #ffffff;
    }
    
    :host ::ng-deep .dark-theme .e-prompt-input {
      background-color: #2d2d2d;
      color: #ffffff;
      border: 1px solid #404040;
    }
    
    :host ::ng-deep .bordered-style {
      border: 1px solid #404040;
      border-radius: 4px;
    }
  `]
})
export class AppComponent { }
```

### Advanced Styling Example

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [cssClass]="'premium-style'"
      [promptSuggestions]="suggestions">
    </div>
  `,
  styles: [`
    :host ::ng-deep .premium-style {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 32px rgba(0,0,0,0.1);
    }
    
    :host ::ng-deep .premium-style .e-assistview-container {
      background: #ffffff;
      border-radius: 12px;
    }
    
    :host ::ng-deep .premium-style .e-prompt-input {
      background: #f5f5f5;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      padding: 12px;
      font-size: 16px;
    }
    
    :host ::ng-deep .premium-style .e-prompt-input:focus {
      border-color: #667eea;
      outline: none;
    }
    
    :host ::ng-deep .premium-style .e-response {
      padding: 12px;
      border-radius: 8px;
      background: #f9f9f9;
      margin: 8px 0;
    }
  `]
})
export class AppComponent {
  suggestions = [
    'Start a new conversation',
    'View conversation history',
    'Export conversation'
  ];
}
```

---

## Theme Customization

### Using Built-in Themes

The Syncfusion components support multiple built-in themes. Change the CSS import in `styles.css`:

```css
/* Material 3 (Default) */
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/ai-assistview/index.css";

/* Or Bootstrap 5 */
@import "../node_modules/@syncfusion/ej2-bootstrap5-theme/styles/ai-assistview/index.css";

/* Or Fabric */
@import "../node_modules/@syncfusion/ej2-fabric-theme/styles/ai-assistview/index.css";

/* Or Tailwind */
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/ai-assistview/index.css";
```

### Combining Custom Styles with Themes

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      id='aiAssistView'
      [cssClass]="'my-custom-overrides'">
    </div>
  `,
  styles: [`
    :host ::ng-deep .my-custom-overrides {
      /* Override theme colors */
      --primary-color: #3f51b5;
      --surface-color: #ffffff;
      --text-color: #212121;
    }
    
    :host ::ng-deep .my-custom-overrides .e-prompt-input {
      padding: 16px;
      font-size: 14px;
      line-height: 1.5;
    }
  `]
})
export class AppComponent { }
```

---

## Responsive Design

### Mobile-First Approach

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="responsive-container">
      <div ejs-aiassistview 
        id='aiAssistView'
        [width]="'100%'"
        [height]="'100vh'">
      </div>
    </div>
  `,
  styles: [`
    .responsive-container {
      width: 100%;
      height: 100vh;
    }
    
    /* Mobile */
    @media (max-width: 768px) {
      :host ::ng-deep #aiAssistView {
        font-size: 14px;
      }
      
      :host ::ng-deep .e-prompt-input {
        padding: 12px;
      }
    }
    
    /* Tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
      :host ::ng-deep #aiAssistView {
        font-size: 15px;
      }
    }
    
    /* Desktop */
    @media (min-width: 1024px) {
      :host ::ng-deep #aiAssistView {
        font-size: 16px;
        max-width: 1400px;
        margin: 0 auto;
      }
    }
  `]
})
export class AppComponent { }
```

### Sidebar Layout

```typescript
template: `
  <div class="layout">
    <aside class="sidebar">
      <h3>Conversations</h3>
      <ul>
        <li>Conversation 1</li>
        <li>Conversation 2</li>
      </ul>
    </aside>
    <main class="content">
      <div ejs-aiassistview 
        id='aiAssistView'
        [width]="'100%'"
        [height]="'100%'">
      </div>
    </main>
  </div>
`,

styles: [`
  .layout {
    display: flex;
    height: 100vh;
  }
  
  .sidebar {
    width: 250px;
    border-right: 1px solid #e0e0e0;
    overflow-y: auto;
  }
  
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`]
```

