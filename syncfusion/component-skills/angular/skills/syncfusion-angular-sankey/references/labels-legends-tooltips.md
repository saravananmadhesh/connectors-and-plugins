# Labels, Legends, and Tooltips

## Table of Contents

- [Node Labels](#node-labels)
  - [Basic Node Labels](#basic-node-labels)
  - [Label Styling](#label-styling)
- [Hiding Labels](#hiding-labels)
- [Legend Configuration](#legend-configuration)
  - [Enable Legend](#enable-legend)
  - [Legend Properties](#legend-properties)
  - [Basic Legend Setup](#basic-legend-setup)
- [Legend Positioning](#legend-positioning)
  - [Position Options](#position-options)
  - [Legend Size Control](#legend-size-control)
  - [Responsive Legend Positioning](#responsive-legend-positioning)
- [Legend Highlighting](#legend-highlighting)
  - [Custom Highlighting Behavior](#custom-highlighting-behavior)
- [Tooltips](#tooltips)
  - [Enable Tooltips](#enable-tooltips)
  - [Default Tooltips](#default-tooltips)
  - [Tooltip Formatting](#tooltip-formatting)
- [Customizing Tooltip](#customizing-tooltip)
- [Advanced Tooltip Configuration](#advanced-tooltip-configuration)
  - [Tooltip Rendering Event](#tooltip-rendering-event)
- [Complete Example](#complete-example)

## Node Labels

Node labels display text information on diagram nodes.

### Basic Node Labels

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-sankey
      width="100%"
      height="420px"
      title="Electricity Flow Diagram"
      [labelSettings]="labelSettings">

      <!-- Node definitions -->
      <e-sankey-nodes>
        <e-sankey-node id="Coal" color="#f41212" [label]="label1"> </e-sankey-node>
        <e-sankey-node id="Grid" color="#aed62c" [label]="label2"> </e-sankey-node>
        <e-sankey-node id="Homes" color="#259bc3" [label]="label3"> </e-sankey-node>
      </e-sankey-nodes>

      <!-- Link definitions -->
      <e-sankey-links>
        <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
      <e-sankey-link sourceId="Grid" targetId="Homes" [value]="300"> </e-sankey-link>
      </e-sankey-links>
    </ejs-sankey>
  `
})
export class AppComponent {
  public labelSettings = {
    visible: true
  };

  public label1 = { text:'Coal' }
  public label2 = { text:'Grid' }
  public label3 = { text:'Homes' }
}
```

### Label Styling

Customize label appearance per-node:

```typescript
public labelSettings = {
    visible: true,
    fontFamily: 'Times New Roman',
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#C00'
  };
```

## Hiding Labels

Set labelSettings.visible to false to hide labels when space is limited. 
Additionally: hiding labels can be useful for creating cleaner visualizations when labels take up too much space.

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import { SankeyTooltipService, SankeyLegendService } from '@syncfusion/ej2-angular-charts';

@Component({
  standalone: true,
  selector: 'app-container',
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService, SankeyLegendService],
  template: `
    <div class="control-pane">
      <div class="control-section" id="sankey-container">

        <ejs-sankey width="90%" height="450px" [labelSettings]="labelSettings">
          <e-sankey-nodes>
            <e-sankey-node id="Agricultural Waste"></e-sankey-node>
            <e-sankey-node id="Biomass Residues"></e-sankey-node>
            <e-sankey-node id="Bio-conversion"></e-sankey-node>
            <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
            <e-sankey-node id="Electricity"></e-sankey-node>
            <e-sankey-node id="Heat"></e-sankey-node>
          </e-sankey-nodes>

          <e-sankey-links>
            <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
            <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
            <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
          </e-sankey-links>
        </ejs-sankey>
      </div>
    </div>
  `
})
export class AppComponent {

  public labelSettings = {
    visible: false
  };
}
```

## Legend Configuration

A legend provides a visual key for understanding node categories.

### Enable Legend

First, inject the legend service:

```typescript
import { SankeyAllModule, SankeyLegendService } from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [SankeyAllModule],
  providers: [SankeyLegendService],
  template: `
    <ejs-sankey [legendSettings]="legendSettings">
    </ejs-sankey>
  `
})
export class AppComponent {
  legendSettings = {
    visible: true
  };
}
```

### Legend Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `visible` | boolean | true | Show/hide legend |
| `position` | string | 'Auto' | Legend position (Auto, Top, Bottom, Left, Right, Custom) |
| `width` | string | null | Legend container width |
| `height` | string | null | Legend container height |
| `shapeWidth` | number | 10 | Legend icon width |
| `shapeHeight` | number | 10 | Legend icon height |
| `padding` | number | 8 | Padding around legend container |
| `itemPadding` | number | null | Padding between items |
| `shapePadding` | number | 8 | Padding between icon and text |
| `background` | string | 'transparent' | Legend background color |
| `title` | string | null | Legend title text |
| `enableHighlight` | boolean | true | Highlight nodes when legend clicked |
| `isInversed` | boolean | false | Inverts the legend layout |

### Basic Legend Setup

```typescript
@Component({
  template: `
    <ejs-sankey 
      [legendSettings]="legendSettings">
      <e-sankey-nodes>
        <e-sankey-node id="Coal" category="Fossil" [label]="{ text: 'Coal' }"></e-sankey-node>
        <e-sankey-node id="Solar" category="Renewable" [label]="{ text: 'Solar' }"></e-sankey-node>
        <e-sankey-node id="Grid" category="Distribution" [label]="{ text: 'Grid' }"></e-sankey-node>
      </e-sankey-nodes>

      <!-- Links -->
      <e-sankey-links>
        <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
        <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
      </e-sankey-links>
    </ejs-sankey>
  `
})
export class AppComponent {
  legendSettings = {
    visible: true,
    title: 'Energy Sources',
    enableHighlight: true
  };
}
```

## Legend Positioning

Control where the legend appears in the diagram.

### Position Options

```typescript
// Top position
legendSettings = { position: 'Top' };

// Bottom position (default for most diagrams)
legendSettings = { position: 'Bottom' };

// Left position
legendSettings = { position: 'Left' };

// Right position
legendSettings = { position: 'Right' };

// Auto position (component chooses based on space)
legendSettings = { position: 'Auto' };

// Custom position (specify exact coordinates)
legendSettings = { 
  position: 'Custom',
  location: { x: 100, y: 100 }
};
```

### Legend Size Control

```typescript
legendSettings = {
  visible: true,
  position: 'Right',
  width: '200px',
  height: '400px',
  padding: 15,
  itemPadding: 10,
  shapeWidth: 15,
  shapeHeight: 15
};
```

### Responsive Legend Positioning

```typescript
@Component({
  template: `
    <ejs-sankey 
      [legendSettings]="legendSettings">
    </ejs-sankey>
  `,
  styles: [`
    :host {
      display: block;
    }

    @media (max-width: 768px) {
      :host ::ng-deep .legend {
        position: bottom;
      }
    }
  `]
})
export class AppComponent {
  get legendSettings() {
    return {
      visible: true,
      position: window.innerWidth < 768 ? 'Bottom' : 'Right',
      enableHighlight: true
    };
  }
}
```

## Legend Highlighting

Enable interactive highlighting when legend items are hovered:

```typescript
@Component({
  template: `
  <ejs-sankey
      width="100%"
      height="420px"
      title="Energy Sources to Grid"
      [legendSettings]="legendSettings">

      <!-- Nodes -->
      <e-sankey-nodes>
        <e-sankey-node id="Coal" category="Fossil" [label]="{ text: 'Coal' }"></e-sankey-node>
        <e-sankey-node id="Solar" category="Renewable" [label]="{ text: 'Solar' }"></e-sankey-node>
        <e-sankey-node id="Wind" category="Renewable" [label]="{ text: 'Wind' }"></e-sankey-node>
        <e-sankey-node id="Grid" category="Distribution" [label]="{ text: 'Grid' }"></e-sankey-node>
      </e-sankey-nodes>

      <!-- Links -->
      <e-sankey-links>
        <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
        <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
        <e-sankey-link sourceId="Wind" targetId="Grid" [value]="80"></e-sankey-link>
      </e-sankey-links>
  </ejs-sankey>
  `
})
export class AppComponent {
  // enableHighlight: true = hovering legend item highlights related nodes
  legendSettings = {
    visible: true,
    enableHighlight: true,
    position: 'Bottom'
  };
}
```

### Custom Highlighting Behavior

```typescript

@Component({
  template: `
    <ejs-sankey 
      (legendItemRendering)="onLegendItemRendering($event)">
    </ejs-sankey>
  `
})
export class AppComponent {
  onLegendItemRendering = (args: any) => {
  // Custom logic when legend item is rendered
    if (args.text === 'Renewable') {
      args.fill = '#28A745';
    } else {
      args.fill = '#999999';
    }
  };
}
```

## Tooltips

Tooltips display additional information when users hover over nodes or links in the Sankey Chart.

### Enable Tooltips

Enable Sankey tooltips by setting the `enable` property to `true`. When feature-specific modules are used, provide the `SankeyTooltipService`.

```typescript
import { Component } from '@angular/core';
import {
  SankeyAllModule,
  SankeyTooltipService
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [SankeyAllModule],
  providers: [SankeyTooltipService],
  template: `
    <ejs-sankey
      width="90%"
      height="450px"
      [tooltip]="tooltipSettings">
      <e-sankey-nodes>
        <e-sankey-node id="Agricultural Waste"></e-sankey-node>
        <e-sankey-node id="Biomass Residues"></e-sankey-node>
        <e-sankey-node id="Bio-conversion"></e-sankey-node>
        <e-sankey-node id="Electricity"></e-sankey-node>
        <e-sankey-node id="Heat"></e-sankey-node>
      </e-sankey-nodes>

      <e-sankey-links>
        <e-sankey-link
          sourceId="Agricultural Waste"
          targetId="Bio-conversion"
          [value]="84.152">
        </e-sankey-link>
        <e-sankey-link
          sourceId="Biomass Residues"
          targetId="Bio-conversion"
          [value]="24.152">
        </e-sankey-link>
        <e-sankey-link
          sourceId="Bio-conversion"
          targetId="Electricity"
          [value]="36.862">
        </e-sankey-link>
        <e-sankey-link
          sourceId="Bio-conversion"
          targetId="Heat"
          [value]="60.845">
        </e-sankey-link>
      </e-sankey-links>
    </ejs-sankey>
  `
})
export class AppComponent {
  public tooltipSettings: Object = {
    enable: true
  };
}
```

### Default Tooltips

When tooltips are enabled without custom formatting, the Sankey Chart displays the default node or link information.

```typescript
public tooltipSettings: Object = {
  enable: true
};
```

The default tooltip formats are:

- Node tooltip: `$name : $value`
- Link tooltip: `$start.name $start.value → $target.name $target.value`

### Tooltip Format

Use the `nodeFormat` and `linkFormat` properties to customize the text displayed for Sankey nodes and links.

```typescript
public tooltipSettings: Object = {
  enable: true,
  nodeFormat: '$name : $value',
  linkFormat:
    '$start.name : $start.value → ' +
    '$target.name : $target.value'
};
```

In this example:

- `nodeFormat` controls the tooltip content displayed when hovering over a node.
- `linkFormat` controls the tooltip content displayed when hovering over a link.
- `$name` displays the hovered node's name.
- `$value` displays the hovered node's calculated value.
- `$start.name` displays the source node's name.
- `$start.value` displays the source-related value.
- `$target.name` displays the target node's name.
- `$target.value` displays the target-related value.

The following tokens can be used in `nodeFormat`:

- `$name`: Specifies the node name.
- `$value`: Specifies the node value.

The following tokens can be used in `linkFormat`:

- `$start.name`: Specifies the source node name.
- `$start.value`: Specifies the source-side value.
- `$target.name`: Specifies the target node name.
- `$target.value`: Specifies the target-side value.

> Use `nodeFormat` and `linkFormat` for text-based tooltip customization. The `nodeTemplate` and `linkTemplate` properties are intended for custom tooltip templates.

### Inline Tooltip Formatting

Numeric values can be formatted directly within nodeFormat and linkFormat by enclosing the numeric token and its format specifier within curly braces ({}), which identify the start and end of the formatted expression. Add a colon (:) followed by the required number format specifier inside the braces.

```typescript
public tooltipSettings: Object = {
  enable: true,
  nodeFormat: '$name : {$value:n2}',
  linkFormat:
    '$start.name : ${start.value:n2} → ' +
    '$target.name : ${target.value:n2}'
};
```

In this example:

- `$value:n2` formats the node value with two decimal places.
- `$start.value:n2` formats the source-side value with two decimal places.
- `$target.value:n2` formats the target-side value with two decimal places.
- `$name`, `$start.name`, and `$target.name` display their resolved string values.

Inline number formatting can be applied to the following Sankey tooltip tokens:

- `$value`: Specifies the numeric value of the hovered node.
- `$start.value`: Specifies the numeric value associated with the source side of the hovered link.
- `$target.value`: Specifies the numeric value associated with the target side of the hovered link.

The following tokens return string values and do not support number formatting:

- `$name`: Specifies the node name.
- `$start.name`: Specifies the source node name.
- `$target.name`: Specifies the target node name.

Supported number format specifiers include:

- `n2`: Number with two decimal places.
- `n0`: Number without decimal places.
- `c2`: Currency with two decimal places.
- `p1`: Percentage with one decimal place.
- `e1`: Exponential notation with one decimal place.

```typescript
public tooltipSettings: Object = {
  enable: true,
  nodeFormat: '$name<br>Total flow: $value:n2',
  linkFormat:
    '$start.name → $target.name<br>' +
    'Source: ${start.value:n2}<br>' +
    'Target: ${target.value:n2}'
};
```

If a format specifier does not match the resolved value type, the original value is displayed.

> Sankey tooltip values are numeric flow values, so number format specifiers are applicable. DateTime format specifiers are not applicable to the standard Sankey node and link value tokens.

### Tooltip Template

Use the `nodeTemplate` and `linkTemplate` properties to define separate custom tooltip templates for nodes and links.

```typescript
public tooltipSettings: Object = {
  enable: true,
  nodeTemplate: '#nodeTooltipTemplate',
  linkTemplate: '#linkTooltipTemplate'
};
```

```html
<ejs-sankey
  width="90%"
  height="450px"
  [tooltip]="tooltipSettings">

  <ng-template #nodeTooltipTemplate let-data>
    <div class="sankey-tooltip">
      <div class="sankey-tooltip-title">
        {{ data.name }}
      </div>
      <div>
        Total flow: {{ data.value | number:'1.2-2' }}
      </div>
    </div>
  </ng-template>

  <ng-template #linkTooltipTemplate let-data>
    <div class="sankey-tooltip">
      <div class="sankey-tooltip-title">
        {{ data.start.name }} → {{ data.target.name }}
      </div>
      <div>
        Source value:
        {{ data.start.value | number:'1.2-2' }}
      </div>
      <div>
        Target value:
        {{ data.target.value | number:'1.2-2' }}
      </div>
    </div>
  </ng-template>

  <e-sankey-nodes>
    <e-sankey-node id="Agricultural Waste"></e-sankey-node>
    <e-sankey-node id="Bio-conversion"></e-sankey-node>
    <e-sankey-node id="Electricity"></e-sankey-node>
  </e-sankey-nodes>

  <e-sankey-links>
    <e-sankey-link
      sourceId="Agricultural Waste"
      targetId="Bio-conversion"
      [value]="84.152">
    </e-sankey-link>
    <e-sankey-link
      sourceId="Bio-conversion"
      targetId="Electricity"
      [value]="36.862">
    </e-sankey-link>
  </e-sankey-links>
</ejs-sankey>
```

```css
.sankey-tooltip {
  padding: 8px 12px;
  color: #333333;
  background-color: #FFFFFF;
  border: 1px solid #CCCCCC;
  border-radius: 4px;
}

.sankey-tooltip-title {
  margin-bottom: 4px;
  font-weight: bold;
}
```

In this example:

- `nodeTemplate` defines the custom layout displayed for a hovered node.
- `linkTemplate` defines the custom layout displayed for a hovered link.
- Angular number pipes format the numeric values inside the templates.
- Separate templates allow node and link tooltips to use different content and layouts.

Use tooltip templates when the tooltip requires:

- A custom HTML structure.
- Different layouts for nodes and links.
- Angular pipes.
- Conditional content.
- Custom CSS classes.
- Additional visual elements.

> Angular pipes should not be placed inside `nodeFormat` or `linkFormat`. Use an inline number format specifier, such as `$value:n2`, or use `nodeTemplate` and `linkTemplate` for Angular-based formatting.

## Customizing Tooltip

Adjust tooltip appearance and behavior using tooltip configuration properties:

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `visible` | boolean | true | Shows or hides the tooltip |
| `fill` | string | null | Sets the background color of the tooltip |
| `opacity` | number | 0.75 | Controls tooltip transparency (range 0 to 1) |
| `textStyle` | object | null | Configures font size, family, weight, and color of tooltip text |
| `enableAnimation` | boolean | true | Enables or disables tooltip animation |
| `duration` | number | 300 | Tooltip animation duration in milliseconds |
| `fadeOutDuration` | number | 1000 | Tooltip fade-out duration in milliseconds |

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import {
  SankeyTooltipService,
  SankeyLegendService,
  SankeyExportService
} from '@syncfusion/ej2-angular-charts';

@Component({
  imports: [SankeyAllModule],
  providers: [
    SankeyTooltipService,
    SankeyLegendService,
    SankeyExportService
  ],
  standalone: true,
  selector: 'app-container',
  template: `
    <div class="control-pane">
      <div class="control-section"  id="sankey-container">
      <ejs-sankey
    width="90%"
    height="450px"
    [tooltip]="tooltipConfig">

    <e-sankey-nodes>
      <e-sankey-node id="Agricultural Waste"></e-sankey-node>
      <e-sankey-node id="Biomass Residues"></e-sankey-node>
      <e-sankey-node id="Bio-conversion"></e-sankey-node>
      <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
      <e-sankey-node id="Electricity"></e-sankey-node>
      <e-sankey-node id="Heat"></e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
      <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
    </e-sankey-links>

  </ejs-sankey>
      </div>
    </div>`
})
export class AppComponent {
  tooltipConfig = {
    enable: true,
    textStyle: {
      fontFamily: 'Arial',
      fontStyle: 'normal',
      fontWeight: '500',
      size: '14px',
      color: '#000'
    },
    fill: '#F3F3F3',
    border: {
      color: '#666',
      width: 1
    }
  };
}
```

## Advanced Tooltip Configuration

### Tooltip Rendering Event

Use tooltipRendering to programmatically modify tooltip content before display.

```typescript
import { Component } from '@angular/core';
import { SankeyAllModule } from '@syncfusion/ej2-angular-charts';
import {
  SankeyTooltipService,
  SankeyLegendService,
  SankeyExportService
} from '@syncfusion/ej2-angular-charts';

// You can put this interface in a separate file (e.g. sankey.interfaces.ts) and import it
export interface SankeyTooltipRenderEventArgs {
  node: any;     // SankeyNode type (from @syncfusion/ej2-angular-charts)
  link: any;     // SankeyLink type
  text: string;
}

@Component({
  imports: [SankeyAllModule],
  providers: [
    SankeyTooltipService,
    SankeyLegendService,
    SankeyExportService
  ],
  standalone: true,
  selector: 'app-container',
  template: `
  <div class="control-pane">
      <div class="control-section"  id="sankey-container">
      <ejs-sankey
    width="90%"
    height="450px"
    [tooltip]="{ enable: true }"
    (tooltipRender)="onTooltipRender($event)">

    <e-sankey-nodes>
      <e-sankey-node id="Agricultural Waste"></e-sankey-node>
      <e-sankey-node id="Biomass Residues"></e-sankey-node>
      <e-sankey-node id="Bio-conversion"></e-sankey-node>
      <e-sankey-node id="Liquid Biofuel"></e-sankey-node>
      <e-sankey-node id="Electricity"></e-sankey-node>
      <e-sankey-node id="Heat"></e-sankey-node>
    </e-sankey-nodes>

    <e-sankey-links>
      <e-sankey-link sourceId="Agricultural Waste" targetId="Bio-conversion" [value]="84.152"></e-sankey-link>
      <e-sankey-link sourceId="Biomass Residues" targetId="Bio-conversion" [value]="24.152"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Liquid Biofuel" [value]="10.597"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Electricity" [value]="36.862"></e-sankey-link>
      <e-sankey-link sourceId="Bio-conversion" targetId="Heat" [value]="60.845"></e-sankey-link>
    </e-sankey-links>

  </ejs-sankey>
      </div>
    </div>`
})
export class AppComponent {

 onTooltipRender(args: SankeyTooltipRenderEventArgs): void {
    if (args.link) {
      args.text = `Flow: ${args.link.sourceId} → ${args.link.targetId} (${args.link.value})`;
    } else if (args.node) {
      args.text = `Node: ${args.node.id}`;
    }
  }
}
```

## Complete Example

```typescript
@Component({
  template: `
    <ejs-sankey
      height="420px"
      title="Energy Distribution"
      [legendSettings]="legendSettings"
      [tooltip]="tooltipSettings">

      <!-- Nodes -->
      <e-sankey-nodes>
        <e-sankey-node id="Coal" category="Fossil" [label]="{ text: 'Coal' }"></e-sankey-node>
        <e-sankey-node id="Solar" category="Renewable" [label]="{ text: 'Solar' }"></e-sankey-node>
        <e-sankey-node id="Wind" category="Renewable" [label]="{ text: 'Wind' }"></e-sankey-node>
        <e-sankey-node id="Grid" category="Distribution" [label]="{ text: 'Grid' }"></e-sankey-node>
        <e-sankey-node id="City" category="Consumer" [label]="{ text: 'City' }"></e-sankey-node>
      </e-sankey-nodes>

      <!-- Links -->
      <e-sankey-links>
        <e-sankey-link sourceId="Coal" targetId="Grid" [value]="300"></e-sankey-link>
        <e-sankey-link sourceId="Solar" targetId="Grid" [value]="100"></e-sankey-link>
        <e-sankey-link sourceId="Wind" targetId="Grid" [value]="80"></e-sankey-link>
        <e-sankey-link sourceId="Grid" targetId="City" [value]="480"></e-sankey-link>
      </e-sankey-links>

    </ejs-sankey>
  `
})
export class AppComponent {
  public tooltipSettings = {
    visible: true,
    linkTemplate: '${start.name}: ${start.out} → ${target.name}: ${target.in}'
  };

  public legendSettings = {
    visible: true,
    position: 'Bottom',
    title: 'Energy Categories',
    enableHighlight: true,
    padding: 10
  };
}
```