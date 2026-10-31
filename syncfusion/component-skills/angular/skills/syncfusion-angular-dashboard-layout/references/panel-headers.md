# Setting Panel Headers

## Overview

Panel headers provide a way to display titles and labels at the top of each panel, helping users identify and organize the content within a dashboard. Headers are configured using the `header` property in the panel definition and can contain HTML content for rich customization.

## Adding Panel Headers

### Basic Header Configuration

Headers are added to panels using the `header` property in the panel object:

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-panel-headers',
  standalone: true,
  imports: [DashboardLayoutModule],
  template: `
    <ejs-dashboardlayout 
      [columns]="6"
      [cellSpacing]="[10, 10]"
      [panels]="panels">
    </ejs-dashboardlayout>
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100vh; }
  `]
})
export class PanelHeadersComponent {
  public panels: any = [
    {
      id: 'Panel0',
      sizeX: 1,
      sizeY: 1,
      row: 0,
      col: 0,
      header: '<div>Panel 0</div>',
      content: '<div class="content">Panel Content</div>'
    },
    {
      id: 'Panel1',
      sizeX: 3,
      sizeY: 2,
      row: 0,
      col: 1,
      header: '<div>Panel 1</div>',
      content: '<div class="content">Panel Content</div>'
    },
    {
      id: 'Panel2',
      sizeX: 1,
      sizeY: 3,
      row: 0,
      col: 4,
      header: '<div>Panel 2</div>',
      content: '<div class="content">Panel Content</div>'
    }
  ];
}
```

## Header Properties

Headers support HTML content and can be styled using CSS. The header property accepts any HTML string:

```typescript
{
  id: 'panel-1',
  sizeX: 2,
  sizeY: 1,
  row: 0,
  col: 0,
  header: '<div class="panel-header">Sales Dashboard</div>',
  content: '<div>Content here</div>'
}
```

## Styling Panel Headers

Headers can be customized using CSS classes:

```css
.e-dashboardlayout.e-control .e-panel .e-panel-container .e-panel-header {
  background-color: #667eea;
  color: white;
  padding: 12px;
  font-weight: bold;
  border-bottom: 2px solid #5568d3;
}
```

## Integrating Syncfusion Components with Headers

Panels can display Syncfusion components (Charts, Grids, Gauges) as their content. When integrated, headers help identify the component type:

```typescript
import { Component } from '@angular/core';
import { DashboardLayoutModule } from '@syncfusion/ej2-angular-layouts';
import { ChartAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-component-dashboard',
  standalone: true,
  imports: [DashboardLayoutModule, ChartAllModule],
  template: `
    <ejs-dashboardlayout [columns]="6" [cellSpacing]="[10, 10]">
      <e-panels>
        <e-panel [sizeX]="3" [sizeY]="2" [row]="0" [col]="0">
          <ng-template #header>
            <div>Sales Chart</div>
          </ng-template>
          <ng-template #content>
            <ejs-chart height="200px">
              <e-series-collection>
                <e-series [dataSource]="chartData" type='Column' xName='month' yName='sales'>
                </e-series>
              </e-series-collection>
            </ejs-chart>
          </ng-template>
        </e-panel>
      </e-panels>
    </ejs-dashboardlayout>
  `
})
export class ComponentDashboardComponent {
  public chartData: any[] = [
    { month: 'Jan', sales: 35 },
    { month: 'Feb', sales: 28 },
    { month: 'Mar', sales: 34 }
  ];
}
```

## Dynamic Headers

Headers can be updated dynamically by modifying the panel configuration:

```typescript
updatePanelHeader(panelId: string, newHeader: string) {
  const panel = this.panels.find(p => p.id === panelId);
  if (panel) {
    panel.header = newHeader;
  }
}
```

## Best Practices for Headers

### 1. Keep Headers Concise

Use short, descriptive titles that clearly identify panel content:

```typescript
header: '<div>Q1 Revenue</div>'  // Good
header: '<div>This is the quarterly revenue information for the first quarter of the year</div>'  // Too long
```

### 2. Use Consistent Styling

Apply consistent header styling across all panels:

```css
.e-panel .e-panel-container .e-panel-header {
  background: var(--primary-color);
  color: white;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
}
```

### 3. Include Visual Indicators

Add icons or badges to headers for better content identification:

```typescript
header: '<div><span class="icon">📊</span> Sales Data</div>'
```
