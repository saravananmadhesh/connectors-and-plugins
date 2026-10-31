# Getting Started with Syncfusion Angular ListBox

This guide demonstrates how to set up and configure the Syncfusion Angular ListBox component from installation through displaying lists with data binding.

## Prerequisites

- **Angular 19+** (Standalone architecture supported)
- **Node.js and npm** installed
- **Angular CLI** installed globally:
  ```bash
  npm install -g @angular/cli
  ```

For detailed Angular version compatibility, refer to the [Angular version support matrix](https://ej2.syncfusion.com/angular/documentation/system-requirement#angular-version-compatibility).

## Step 1: Create a New Angular Application

Using Angular CLI, generate a new application:

```bash
ng new syncfusion-listbox-app
```

When prompted, choose your preferred settings:
- Stylesheet format: CSS or SCSS
- Server-side rendering: Choose based on your needs
- AI tools: Select as needed (or skip)

Navigate to your project:
```bash
cd syncfusion-listbox-app
```

## Step 2: Install Syncfusion ListBox Package

Install the Syncfusion Angular dropdowns package which includes ListBox:

```bash
ng add @syncfusion/ej2-angular-dropdowns
```

This command automatically:
- Adds `@syncfusion/ej2-angular-dropdowns` to `package.json`
- Installs peer dependencies
- Imports Material theme in `angular.json`
- Registers styles

## Step 3: Import CSS Styles

Syncfusion components require CSS imports. Add the following to your `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/list-box/index.css";
```

### Theme Options

Replace `material3.css` with your preferred theme:
- `material3.css` - Default Material design
- `bootstrap5.css` - Bootstrap 5 theme
- `fluent.css` - Microsoft Fluent theme
- `highcontrast.css` - High contrast for accessibility

## Step 4: Import ListBox Module

### For Angular 19+ (Standalone)

In your component file (`src/app/app.ts`), import and use `ListBoxModule`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListBoxModule],
  template: `
    <!-- ListBox will render here -->
    <ejs-listbox></ejs-listbox>
  `
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
}
```

### For Angular 18 and Below (NgModule)

In your `src/app/app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ListBoxModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Then in your `src/app/app.component.ts`:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
}
```

## Step 5: Add Sample Data

Create sample data in your component:

```typescript
import { Component, OnInit } from '@angular/core';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListBoxModule],
  template: `<ejs-listbox [dataSource]="vehicleData"></ejs-listbox>`
})
export class AppComponent implements OnInit {
  public vehicleData: { [key: string]: Object }[] = [];

  ngOnInit(): void {
    this.vehicleData = [
      { text: 'Hennessey Venom', id: 'list-01' },
      { text: 'Bugatti Chiron', id: 'list-02' },
      { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
      { text: 'SSC Ultimate Aero', id: 'list-04' },
      { text: 'Koenigsegg CCR', id: 'list-05' },
      { text: 'McLaren F1', id: 'list-06' },
      { text: 'Aston Martin One-77', id: 'list-07' },
      { text: 'Jaguar XJ220', id: 'list-08' },
      { text: 'McLaren P1', id: 'list-09' },
      { text: 'Ferrari LaFerrari', id: 'list-10' }
    ];
  }
}
```

## Step 6: Run Your Application

Start the development server:

```bash
ng serve --open
```

This opens the application in your default browser at `http://localhost:4200`.

### What You Should See

- A list of vehicle names displayed in the ListBox
- By default, multiple selection is enabled
- You can click items to select/deselect them
- Use SHIFT+Click and CTRL+Click for batch selection

## Complete Example

Here's a complete working example:

```typescript
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListBoxModule } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ListBoxModule],
  template: `
    <div style="padding: 20px;">
      <h1>Syncfusion ListBox Example</h1>
      
      <h3>Select Vehicles</h3>
      <ejs-listbox 
        [dataSource]="vehicleData"
        height="300px">
      </ejs-listbox>
      
      <p>{{ vehicleData.length }} vehicles available</p>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }
  `]
})
export class AppComponent implements OnInit {
  public vehicleData: { [key: string]: Object }[] = [];

  ngOnInit(): void {
    this.vehicleData = [
      { text: 'Hennessey Venom', id: 'list-01' },
      { text: 'Bugatti Chiron', id: 'list-02' },
      { text: 'Bugatti Veyron Super Sport', id: 'list-03' },
      { text: 'SSC Ultimate Aero', id: 'list-04' },
      { text: 'Koenigsegg CCR', id: 'list-05' },
      { text: 'McLaren F1', id: 'list-06' },
      { text: 'Aston Martin One-77', id: 'list-07' },
      { text: 'Jaguar XJ220', id: 'list-08' },
      { text: 'McLaren P1', id: 'list-09' },
      { text: 'Ferrari LaFerrari', id: 'list-10' }
    ];
  }
}
```

## Troubleshooting

### Module Import Error
**Error**: `Can't resolve '@syncfusion/ej2-angular-dropdowns'`

**Solution**: Run `npm install @syncfusion/ej2-angular-dropdowns`

### Styles Not Applied
**Error**: ListBox appears unstyled (no colors or borders)

**Solution**: Ensure CSS imports are in `src/styles.css` and check the import order

### ListBox Not Rendering
**Error**: Template shows but ListBox doesn't appear

**Solution**: Verify `ListBoxModule` is imported in component's `imports` array

### Angular Version Incompatibility
**Error**: `ng add` fails or module not found

**Solution**: Check Angular version with `ng version` and refer to [Version Compatibility](https://ej2.syncfusion.com/angular/documentation/upgrade/version-compatibility)

## Next Steps

Now that you have a basic ListBox setup:
- Review [selection-modes.md](selection-modes.md) to add single/multiple/checkbox selection
- See [data-binding.md](data-binding.md) for complex data sources
- Check [customization.md](customization.md) to customize appearance
- Explore [drag-and-drop-features.md](drag-and-drop-features.md) for advanced interactions
