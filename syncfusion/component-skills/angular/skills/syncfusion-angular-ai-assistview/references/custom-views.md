# Custom Views and View Management

## Table of Contents
- [Adding Custom Views](#adding-custom-views)
- [Setting View Names](#setting-view-names)
- [Active View Management](#active-view-management)
- [Multiple Views Architecture](#multiple-views-architecture)
- [View Switching and Management](#view-switching-and-management)
- [Context-Specific Views](#context-specific-views)
- [Best Practices](#best-practices-for-multiple-views)

---

## Adding Custom Views

The `e-views` selector enables you to define a collection of different view models within the AI AssistView component. Each view can be independently customized with different appearances and content.

### View Types

The AI AssistView supports two view types:
- **Assist:** Standard conversation view for AI interactions
- **Custom:** Custom content view for personalized experiences

### Basic View Configuration

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
      <e-views>
        <e-view [type]="'Assist'"></e-view>
        <e-view [type]="'Custom'"></e-view>
      </e-views>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  onPromptRequest(args: PromptRequestEventArgs) {
    setTimeout(() => {
      const response = 'For real-time prompt processing, connect the AIAssistView component to your preferred AI service, such as OpenAI or Azure Cognitive Services.';
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }
}
```

---

## Setting View Names

The `name` property specifies the header name of each view. This text appears as a tab or label identifying the view.

### Named Views Example

```typescript
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [FormsModule, ReactiveFormsModule, AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
      <e-views>
        <e-view 
          [type]="'Assist'" 
          [name]="'Chat Assistant'">
        </e-view>
        <e-view 
          [type]="'Custom'" 
          [name]="'Custom Dashboard'">
        </e-view>
      </e-views>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  onPromptRequest(args: PromptRequestEventArgs) {
    setTimeout(() => {
      const response = 'Response from AI service...';
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }
}
```

---

## Active View Management

The `activeView` property allows you to programmatically control which view is currently displayed in the AI AssistView component. This property uses a zero-based index to identify views.

### Basic activeView Usage

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="controls">
        <button (click)="setActiveView(0)">Chat View</button>
        <button (click)="setActiveView(1)">Analytics View</button>
        <button (click)="setActiveView(2)">Settings View</button>
        <div class="current-view">Current View: {{ getCurrentViewName() }}</div>
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        [activeView]="currentActiveView"
        (promptRequest)="onPromptRequest($event)">
        <e-views>
          <e-view [type]="'Assist'" [name]="'Chat'"></e-view>
          <e-view [type]="'Custom'" [name]="'Analytics'"></e-view>
          <e-view [type]="'Custom'" [name]="'Settings'"></e-view>
        </e-views>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    .controls {
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      gap: 8px;
      align-items: center;
    }
    
    button {
      padding: 8px 16px;
      border: 1px solid #2196F3;
      border-radius: 4px;
      cursor: pointer;
      background: white;
      color: #2196F3;
      transition: all 0.2s;
    }
    
    button:hover {
      background: #2196F3;
      color: white;
    }
    
    .current-view {
      margin-left: auto;
      font-weight: 500;
      color: #666;
    }
  `]
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  currentActiveView = 0; // Default to first view
  
  viewNames = ['Chat', 'Analytics', 'Settings'];

  setActiveView(index: number) {
    this.currentActiveView = index;
    console.log(`Switched to view: ${this.viewNames[index]}`);
  }
  
  getCurrentViewName(): string {
    return this.viewNames[this.currentActiveView] || 'Unknown';
  }

  onPromptRequest(args: PromptRequestEventArgs) {
    // Handle based on active view
    console.log(`Processing prompt in ${this.getCurrentViewName()} view`);
    
    setTimeout(() => {
      const response = `Response from ${this.getCurrentViewName()} view`;
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }
}
```

### Dynamic View Switching Based on User Action

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [activeView]="activeViewIndex"
      (promptRequest)="onPromptRequest($event)">
      <e-views>
        <e-view [type]="'Assist'" [name]="'General Chat'"></e-view>
        <e-view [type]="'Assist'" [name]="'Technical Support'"></e-view>
        <e-view [type]="'Custom'" [name]="'Dashboard'"></e-view>
      </e-views>
    </div>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  activeViewIndex = 0;

  ngOnInit() {
    // Set initial view based on user role or context
    const userRole = this.getUserRole();
    
    if (userRole === 'admin') {
      this.activeViewIndex = 2; // Dashboard view
    } else if (userRole === 'technical') {
      this.activeViewIndex = 1; // Technical support view
    } else {
      this.activeViewIndex = 0; // General chat view
    }
  }

  getUserRole(): string {
    // Get from authentication service
    return 'admin'; // Example
  }

  onPromptRequest(args: any) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response...');
    }, 1000);
  }
}
```

### Conditional View Navigation

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent, PromptRequestEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [activeView]="activeViewIndex"
      (promptRequest)="onPromptRequest($event)">
      <e-views>
        <e-view [type]="'Assist'" [name]="'Chat'"></e-view>
        <e-view [type]="'Custom'" [name]="'Results'"></e-view>
        <e-view [type]="'Custom'" [name]="'Error'"></e-view>
      </e-views>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  activeViewIndex = 0;

  onPromptRequest(args: PromptRequestEventArgs) {
    this.processPrompt(args.prompt).then(
      (response) => {
        // Success: Switch to results view
        this.activeViewIndex = 1;
        this.aiAssistViewComponent.addPromptResponse(response);
      },
      (error) => {
        // Error: Switch to error view
        this.activeViewIndex = 2;
        this.aiAssistViewComponent.addPromptResponse(`Error: ${error.message}`);
      }
    );
  }

  private async processPrompt(prompt: string): Promise<string> {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (prompt.length > 0) {
          resolve(`Processed: ${prompt}`);
        } else {
          reject(new Error('Empty prompt'));
        }
      }, 1000);
    });
  }
}
```

### View History and Navigation

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="navigation">
        <button (click)="goBack()" [disabled]="!canGoBack()">
          ← Back
        </button>
        <button (click)="goForward()" [disabled]="!canGoForward()">
          Forward →
        </button>
        <span class="breadcrumb">{{ getBreadcrumb() }}</span>
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        [activeView]="activeViewIndex"
        (promptRequest)="onPromptRequest($event)">
        <e-views>
          <e-view [type]="'Assist'" [name]="'Home'"></e-view>
          <e-view [type]="'Custom'" [name]="'Search Results'"></e-view>
          <e-view [type]="'Custom'" [name]="'Details'"></e-view>
        </e-views>
      </div>
    </div>
  `,
  styles: [`
    .navigation {
      padding: 12px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      gap: 8px;
      align-items: center;
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    .breadcrumb {
      margin-left: 16px;
      color: #666;
      font-size: 14px;
    }
  `]
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  activeViewIndex = 0;
  viewHistory: number[] = [0];
  historyIndex = 0;
  
  viewNames = ['Home', 'Search Results', 'Details'];

  navigateToView(viewIndex: number) {
    // Add to history
    this.historyIndex++;
    this.viewHistory = this.viewHistory.slice(0, this.historyIndex);
    this.viewHistory.push(viewIndex);
    this.activeViewIndex = viewIndex;
  }

  goBack() {
    if (this.canGoBack()) {
      this.historyIndex--;
      this.activeViewIndex = this.viewHistory[this.historyIndex];
    }
  }

  goForward() {
    if (this.canGoForward()) {
      this.historyIndex++;
      this.activeViewIndex = this.viewHistory[this.historyIndex];
    }
  }

  canGoBack(): boolean {
    return this.historyIndex > 0;
  }

  canGoForward(): boolean {
    return this.historyIndex < this.viewHistory.length - 1;
  }

  getBreadcrumb(): string {
    return this.viewNames[this.activeViewIndex];
  }

  onPromptRequest(args: any) {
    // Navigate based on prompt
    if (args.prompt.toLowerCase().includes('search')) {
      this.navigateToView(1); // Go to search results
    } else if (args.prompt.toLowerCase().includes('details')) {
      this.navigateToView(2); // Go to details
    }
    
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response...');
    }, 1000);
  }
}
```

### Workflow-Based View Switching

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

interface WorkflowStep {
  viewIndex: number;
  name: string;
  completed: boolean;
}

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="workflow-stepper">
        <div *ngFor="let step of workflowSteps; let i = index" 
             class="step"
             [class.active]="i === activeViewIndex"
             [class.completed]="step.completed"
             (click)="goToStep(i)">
          <span class="step-number">{{ i + 1 }}</span>
          <span class="step-name">{{ step.name }}</span>
        </div>
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        [activeView]="activeViewIndex"
        (promptRequest)="onPromptRequest($event)">
        <e-views>
          <e-view [type]="'Assist'" [name]="'Information Gathering'"></e-view>
          <e-view [type]="'Custom'" [name]="'Processing'"></e-view>
          <e-view [type]="'Custom'" [name]="'Review'"></e-view>
          <e-view [type]="'Custom'" [name]="'Complete'"></e-view>
        </e-views>
      </div>
      
      <div class="workflow-actions">
        <button (click)="previousStep()" [disabled]="activeViewIndex === 0">
          Previous
        </button>
        <button (click)="nextStep()" [disabled]="activeViewIndex === workflowSteps.length - 1">
          Next
        </button>
      </div>
    </div>
  `,
  styles: [`
    .workflow-stepper {
      display: flex;
      padding: 20px;
      background: #f5f5f5;
      border-bottom: 1px solid #e0e0e0;
    }
    
    .step {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px;
      cursor: pointer;
      border-radius: 4px;
      transition: all 0.2s;
    }
    
    .step.active {
      background: #2196F3;
      color: white;
    }
    
    .step.completed {
      color: #4CAF50;
    }
    
    .step-number {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }
    
    .workflow-actions {
      padding: 16px;
      border-top: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-between;
    }
  `]
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  activeViewIndex = 0;
  
  workflowSteps: WorkflowStep[] = [
    { viewIndex: 0, name: 'Information', completed: false },
    { viewIndex: 1, name: 'Processing', completed: false },
    { viewIndex: 2, name: 'Review', completed: false },
    { viewIndex: 3, name: 'Complete', completed: false }
  ];

  goToStep(stepIndex: number) {
    // Only allow going to completed steps or the next step
    if (stepIndex <= this.activeViewIndex + 1 || this.workflowSteps[stepIndex].completed) {
      this.activeViewIndex = stepIndex;
    }
  }

  nextStep() {
    if (this.activeViewIndex < this.workflowSteps.length - 1) {
      this.workflowSteps[this.activeViewIndex].completed = true;
      this.activeViewIndex++;
    }
  }

  previousStep() {
    if (this.activeViewIndex > 0) {
      this.activeViewIndex--;
    }
  }

  onPromptRequest(args: any) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Step completed!');
      
      // Auto-advance to next step after response
      if (this.activeViewIndex < this.workflowSteps.length - 1) {
        setTimeout(() => {
          this.nextStep();
        }, 1500);
      }
    }, 1000);
  }
}
```

### Reading Current Active View

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      [activeView]="activeViewIndex"
      (promptRequest)="onPromptRequest($event)">
      <e-views>
        <e-view [type]="'Assist'" [name]="'Chat'"></e-view>
        <e-view [type]="'Custom'" [name]="'Analytics'"></e-view>
      </e-views>
    </div>
  `
})
export class AppComponent implements AfterViewInit {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  activeViewIndex = 0;

  ngAfterViewInit() {
    // Access the current active view
    console.log('Current active view:', this.aiAssistViewComponent.activeView);
    
    // Track view changes
    this.trackViewChanges();
  }

  trackViewChanges() {
    // Monitor activeViewIndex changes
    let previousView = this.activeViewIndex;
    
    setInterval(() => {
      if (this.activeViewIndex !== previousView) {
        console.log(`View changed from ${previousView} to ${this.activeViewIndex}`);
        this.onViewChange(previousView, this.activeViewIndex);
        previousView = this.activeViewIndex;
      }
    }, 100);
  }

  onViewChange(fromView: number, toView: number) {
    // Custom logic when view changes
    console.log('View transition:', { from: fromView, to: toView });
    
    // Clear state, load data, etc.
    this.loadViewData(toView);
  }

  loadViewData(viewIndex: number) {
    // Load data specific to the view
    console.log(`Loading data for view ${viewIndex}`);
  }

  onPromptRequest(args: any) {
    setTimeout(() => {
      this.aiAssistViewComponent.addPromptResponse('Response...');
    }, 1000);
  }
}
```

---

## Multiple Views Architecture

### Three-View Setup

```typescript
@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
      <e-views>
        <e-view 
          [type]="'Assist'" 
          [name]="'AI Assistant'">
        </e-view>
        <e-view 
          [type]="'Custom'" 
          [name]="'Analytics'">
        </e-view>
        <e-view 
          [type]="'Custom'" 
          [name]="'Settings'">
        </e-view>
      </e-views>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;

  onPromptRequest(args: PromptRequestEventArgs) {
    // Handle prompts for assist view
    this.processAIRequest(args);
  }

  processAIRequest(args: PromptRequestEventArgs) {
    setTimeout(() => {
      const response = 'Processed prompt response...';
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }
}
```

---

## View Switching and Management

### Legacy View Switching (Alternative Approach)

If you need alternative view switching approaches, you can use custom state management:

```typescript
import { Component, ViewChild } from '@angular/core';
import { AIAssistViewModule, AIAssistViewComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="container">
      <div class="controls">
        <button (click)="switchView('assist')">AI Chat</button>
        <button (click)="switchView('analytics')">Analytics</button>
        <button (click)="switchView('settings')">Settings</button>
      </div>
      
      <div ejs-aiassistview 
        #aiAssistViewComponent
        id='aiAssistView'
        [activeView]="selectedViewIndex"
        (promptRequest)="onPromptRequest($event)">
        <e-views>
          <e-view [type]="'Assist'" [name]="'AI Chat'"></e-view>
          <e-view [type]="'Custom'" [name]="'Analytics'"></e-view>
          <e-view [type]="'Custom'" [name]="'Settings'"></e-view>
        </e-views>
      </div>
    </div>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      height: 100vh;
    }
    
    .controls {
      padding: 16px;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      gap: 8px;
    }
    
    button {
      padding: 8px 16px;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      background: #f5f5f5;
      transition: all 0.2s;
    }
    
    button:hover {
      background: #e0e0e0;
    }
  `]
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  selectedViewIndex = 0;

  switchView(viewName: string) {
    const viewMap: { [key: string]: number } = {
      'assist': 0,
      'analytics': 1,
      'settings': 2
    };
    
    this.selectedViewIndex = viewMap[viewName];
  }

  onPromptRequest(args: any) {
    setTimeout(() => {
      const response = 'Response for current view...';
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }
}
```

---

## Context-Specific Views

### Role-Based View Configuration

```typescript
interface ViewConfig {
  name: string;
  type: 'Assist' | 'Custom';
  prompts?: Array<{ prompt: string; response: string }>;
}

@Component({
  imports: [AIAssistViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div ejs-aiassistview 
      #aiAssistViewComponent
      id='aiAssistView'
      (promptRequest)="onPromptRequest($event)">
      <e-views>
        <e-view 
          *ngFor="let view of views"
          [type]="view.type" 
          [name]="view.name"
          [prompts]="view.prompts">
        </e-view>
      </e-views>
    </div>
  `
})
export class AppComponent {
  @ViewChild('aiAssistViewComponent')
  public aiAssistViewComponent!: AIAssistViewComponent;
  
  views: ViewConfig[] = [
    {
      name: 'General',
      type: 'Assist',
      prompts: []
    },
    {
      name: 'Technical',
      type: 'Assist',
      prompts: []
    },
    {
      name: 'History',
      type: 'Custom',
      prompts: [
        {
          prompt: 'Previous conversation 1',
          response: 'Response 1'
        }
      ]
    }
  ];

  onPromptRequest(args: any) {
    // Handle request based on current view
    this.processContextualRequest();
  }

  processContextualRequest() {
    const currentViewIndex = (this.aiAssistViewComponent as any).selectedViewIndex;
    const currentView = this.views[currentViewIndex];
    
    // Process based on view type
    if (currentView.type === 'Assist') {
      this.handleAssistRequest();
    } else {
      this.handleCustomRequest();
    }
  }

  handleAssistRequest() {
    setTimeout(() => {
      const response = 'Assist view response...';
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }

  handleCustomRequest() {
    setTimeout(() => {
      const response = 'Custom view response...';
      this.aiAssistViewComponent.addPromptResponse(response);
    }, 1000);
  }
}
```

---

## Best Practices for Multiple Views

### 1. Clear Purpose for Each View
- **Assist View:** For conversational AI interactions
- **Custom View 1:** For analytics or reporting
- **Custom View 2:** For settings or configuration

### 2. Independent State Management
```typescript
// Each view can maintain its own state
viewStates = {
  'assist': { history: [], settings: {} },
  'analytics': { data: [], filters: {} },
  'settings': { preferences: {} }
};
```

### 3. Context-Aware Processing
```typescript
onPromptRequest(args: any) {
  const currentViewName = this.getCurrentViewName();
  
  if (currentViewName === 'assist') {
    this.processAIQuery(args);
  } else if (currentViewName === 'analytics') {
    this.processAnalyticsQuery(args);
  }
}
```

### 4. Consistent Styling Across Views
```typescript
template: `
  <div ejs-aiassistview 
    id='aiAssistView'
    [cssClass]="'unified-theme'">
    <e-views>
      <e-view [type]="'Assist'" [name]="'Chat'"></e-view>
      <e-view [type]="'Custom'" [name]="'Analytics'"></e-view>
    </e-views>
  </div>
`

styles: [`
  :host ::ng-deep .unified-theme {
    /* Styles apply to all views */
  }
`]
```

---

## Use Cases

1. **Customer Support Portal:** Separate views for support chat, FAQ, and settings
2. **Data Analysis Tool:** One view for queries, another for results visualization
3. **Educational Platform:** Chat for tutoring, custom view for progress tracking
4. **Enterprise Applications:** Different views for different departments or functions

