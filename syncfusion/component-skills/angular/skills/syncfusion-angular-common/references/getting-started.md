# Getting Started with Syncfusion Angular

## Table of Contents
- [Angular CLI Setup](#angular-cli-setup)
- [Standalone Components](#standalone-components)
- [ASP.NET Core Integration](#aspnet-core-integration)
- [ASP.NET MVC Integration](#aspnet-mvc-integration)

## Angular CLI Setup

### Create a New Angular Application

Start by creating a new Angular project using the Angular CLI command:

### Install Syncfusion Package

Syncfusion Angular component packages are available on [npmjs.com](https://www.npmjs.com/search?q=ej2-angular). Use the `ng add` command to install a Syncfusion package. The command automatically configures:
- Package installation in `package.json`
- Module imports in your application
- Theme CSS in `angular.json`
- Build configuration

**Example: Installing the Grid component**

```bash
ng add @syncfusion/ej2-angular-grids@latest
```

**Example: Installing multiple components**

```bash
ng add @syncfusion/ej2-angular-buttons@latest
ng add @syncfusion/ej2-angular-calendars@latest
ng add @syncfusion/ej2-angular-dropdowns@latest
```

### Import CSS

Syncfusion Angular component themes can be added in various ways: via CSS or SCSS styles from npm packages, CDN, or Theme Studio.

First, install the required [Material 3](https://www.npmjs.com/package/@syncfusion/ej2-material3-theme) theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme@latest --save
```

To stylize only specific Syncfusion components, import the necessary styles. For example, to style only the Grid component:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/grid/index.css";
```

### Adding Syncfusion Components

To integrate the Syncfusion Grid component into your Angular application, add the `<ejs-grid>` selector within your component template:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Syncfusion Angular UI Grid!</h1>
    <ejs-grid [dataSource]='data'>
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
        <e-column field='Freight' headerText='Freight' textAlign='Right' format='C2' width=90></e-column>
        <e-column field='OrderDate' headerText='Order Date' textAlign='Right' format='yMd' width=120></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class AppComponent {
  public data: Object[] = [
    {
      OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
      ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
      ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38
    },
    {
      OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
      ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
      ShipRegion: 'CA', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61
    }
  ];
}
```

## Standalone Components

Standalone components are the modern approach in Angular and don't require NgModule configuration. Syncfusion components work seamlessly with standalone components.

### Create a New Angular Application

First, create a new Angular project using the Angular CLI command.

### Install Syncfusion Package

Syncfusion's Angular packages are available on npm under the `@syncfusion` scope. To add the latest Syncfusion Angular packages, execute:

```bash
ng add @syncfusion/ej2-angular-grids@latest
```

This command performs the following configurations:
- Adds the `@syncfusion/ej2-angular-grids` package and its dependencies to `package.json`
- Imports `GridModule` into your application's default standalone component
- Registers Syncfusion's default Material theme in `angular.json`

### Import CSS

First, install the required [Material 3](https://www.npmjs.com/package/@syncfusion/ej2-material3-theme) theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme@latest --save
```

The following CSS styles are available in the `../node_modules/@syncfusion` folder. Reference them in `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/grid/index.css";
```

### Adding Syncfusion Components

In standalone components, you directly import the required modules in the component file. Modify your `src/app/app.ts` file to incorporate the Syncfusion Grid component:

```typescript
import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GridModule],
  template: `
    <h1>Syncfusion Angular UI Grid!</h1>
    <ejs-grid [dataSource]='data'>
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
        <e-column field='Freight' headerText='Freight' textAlign='Right' format='C2' width=90></e-column>
        <e-column field='OrderDate' headerText='Order Date' textAlign='Right' format='yMd' width=120></e-column>
      </e-columns>
    </ejs-grid>
  `,
  styleUrls: ['./app.css']
})
export class AppComponent {
  public data: Object[] = [
    {
      OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
      ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
      ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38
    },
    {
      OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
      ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
      ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61
    }
  ];
}
```

The `imports` array in the `@Component` decorator specifies the required Syncfusion modules. Each component you want to use must be explicitly imported and included in this array.

## ASP.NET Core Integration

### Project Setup

Create an ASP.NET Core project with Angular frontend:

```bash
dotnet new angular -n SyncfusionApp
cd SyncfusionApp
```

Navigate to the client app folder:

```bash
cd ClientApp
```

### Install Syncfusion Package

Install Syncfusion Angular component packages and theme package from npm:

```bash
npm install @syncfusion/ej2-angular-grids@latest @syncfusion/ej2-material3-theme@latest --save
```

All Syncfusion Angular packages are available under the `@syncfusion` scope at [npmjs.com](https://www.npmjs.com/search?q=%40syncfusion%2Fej2-angular-).

### Register GridModule in main.ts

In `~/ClientApp/src/main.ts`, import and register the Grid module with standalone bootstrap:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(GridModule),
    ...appConfig.providers
  ]
}).catch((err) => console.error(err));
```

### Import CSS

Add the required CSS files to style your Syncfusion components. Open the `~/ClientApp/src/styles.css` file and add the following CSS imports:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/grid/index.css";
```

These imports provide the Material theme styling for various UI components. The imports should be in this specific order to ensure proper styling.

### Adding Syncfusion Components

In `~/ClientApp/src/app/home/home.ts`, add the Syncfusion Grid component:

```typescript
import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GridModule, CommonModule],
  template: `
    <h1>Syncfusion Angular UI Grid!</h1>
    <ejs-grid [dataSource]='data'>
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
        <e-column field='Freight' headerText='Freight' textAlign='Right' format='C2' width=90></e-column>
        <e-column field='OrderDate' headerText='Order Date' textAlign='Right' format='yMd' width=120></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class HomeComponent {
  public data: Object[] = [
    {
      OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
      ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
      ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38
    },
    {
      OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
      ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
      ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61
    }
  ];
}
```

Run your application with `dotnet run` and navigate to the application URL to see the Syncfusion Grid integrated with ASP.NET Core.

## ASP.NET MVC Integration

### Project Setup

Create an ASP.NET MVC Web Application using Visual Studio, then integrate an Angular CLI project as the frontend.

1. Open Developer Command Prompt from Visual Studio
2. Navigate to your MVC project root directory
3. Create an Angular CLI application:

```bash
ng new ClientApp
cd ClientApp
```

### Install Syncfusion Package

Install Syncfusion Angular components by following the Angular CLI installation steps. Inside the ClientApp directory, run:

```bash
ng add @syncfusion/ej2-angular-grids@latest
```

Update `projects.ClientApp.architect.build.options.outputPath` in `angular.json` for the production build to `../Scripts/ClientApp`:

```json
"projects": {
  "ClientApp": {
    "architect": {
      "build": {
        "options": {
          "outputPath": "../Scripts/ClientApp"
        }
      }
    }
  }
}
```

### Import CSS

First, install the required [Material 3](https://www.npmjs.com/package/@syncfusion/ej2-material3-theme) theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme@latest --save
```

Add the required CSS files in `~/ClientApp/src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/grid/index.css";
```

### Adding Syncfusion Components

Create or modify your Angular component to include the Syncfusion Grid. In your `~/ClientApp/src/app/app.ts`:

```typescript
import { Component } from '@angular/core';
import { GridModule } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GridModule],
  template: `
    <h1>Syncfusion Angular UI Grid!</h1>
    <ejs-grid [dataSource]='data'>
      <e-columns>
        <e-column field='OrderID' headerText='Order ID' textAlign='Right' width=90></e-column>
        <e-column field='CustomerID' headerText='Customer ID' width=120></e-column>
        <e-column field='Freight' headerText='Freight' textAlign='Right' format='C2' width=90></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class AppComponent {
  public data: Object[] = [
    { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
  ];
}
```

### Automate Angular Build with MS Build

Append the following to your `.csproj` file to automate the Angular build process:

```xml
<PropertyGroup>
    <TypeScriptCompileBlocked>true</TypeScriptCompileBlocked>
    <TypeScriptToolsVersion>Latest</TypeScriptToolsVersion>
    <IsPackable>false</IsPackable>
    <SpaRoot>ClientApp\</SpaRoot>
    <DefaultItemExcludes>$(DefaultItemExcludes);$(SpaRoot)node_modules\**</DefaultItemExcludes>
</PropertyGroup>

<ItemGroup>
    <Content Remove="$(SpaRoot)**" />
    <None Remove="$(SpaRoot)**" />
    <None Include="$(SpaRoot)**" Exclude="$(SpaRoot)node_modules\**" />
</ItemGroup>

<Target Name="BeforeBuild" AfterTargets="ComputeFilesToPublish">
    <Exec WorkingDirectory="$(SpaRoot)" Command="npm install" />
    <Exec WorkingDirectory="$(SpaRoot)" Command="npm run build -- --configuration production --base-href /" />
    <ItemGroup>
        <DistFiles Include="$(SpaRoot)dist\**" />
        <ResolvedFileToPublish Include="@(DistFiles->'%(FullPath)')" Exclude="@(ResolvedFileToPublish)">
            <RelativePath>%(DistFiles.Identity)</RelativePath>
            <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
            <ExcludeFromSingleFile>true</ExcludeFromSingleFile>
        </ResolvedFileToPublish>
    </ItemGroup>
</Target>
```

### Configure MVC Bundle and Layout

Edit the `App_Start\BundleConfig.cs` file to include Angular production scripts:

```csharp
bundles.Add(new Bundle("~/bundles/clientapp").Include(
    "~/Scripts/ClientApp/runtime.*",
    "~/Scripts/ClientApp/polyfills.*",
    "~/Scripts/ClientApp/main.*"));

bundles.Add(new StyleBundle("~/Content/clientapp").Include(
    "~/Scripts/ClientApp/styles.*"));
```

In `~/Views/Shared/_Layout.cshtml`, add the bundle references:

```html
<!DOCTYPE html>
<html>
<head>
    @Styles.Render("~/Content/css")
    @Styles.Render("~/Content/clientapp")
</head>
<body>
    @RenderBody()
    
    @Scripts.Render("~/bundles/jquery")
    @Scripts.Render("~/bundles/bootstrap")
    @Scripts.Render("~/bundles/clientapp")
    @RenderSection("scripts", required: false)
</body>
</html>
```

Add the `<app-root>` tag in your view file (e.g., `~/Views/Home/Index.cshtml`):

```html
<app-root></app-root>
```

Build and run your ASP.NET MVC application from Visual Studio to see the integrated Syncfusion Grid component.
