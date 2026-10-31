# Getting Started with Vue HeatMap Chart

## Table of Contents
- [Installation](#installation)
  - [System Requirements](#system-requirements)
  - [Prerequisites](#prerequisites)
- [Creating a Vue 2 Project](#creating-a-vue-2-project)
  - [Step 1: Install Vue CLI](#step-1-install-vue-cli)
  - [Step 2: Create a New Project](#step-2-create-a-new-project)
  - [Step 3: Select Project Configuration](#step-3-select-project-configuration)
- [Adding Syncfusion Packages](#adding-syncfusion-packages)
  - [Install HeatMap Package](#install-heatmap-package)
  - [Package Dependencies](#package-dependencies)
- [Registering the HeatMap Component](#registering-the-heatmap-component)
  - [Import in App.vue](#import-in-appvue)
- [Creating Your First HeatMap](#creating-your-first-heatmap)
  - [Basic Implementation](#basic-implementation)
  - [Enhanced Example with Axis Labels](#enhanced-example-with-axis-labels)
- [Module Injection](#module-injection)
  - [Available Feature Modules](#available-feature-modules)
  - [Injecting Modules](#injecting-modules)
- [Running the Application](#running-the-application)
  - [Start Development Server](#start-development-server)
  - [Production Build](#production-build)
  - [Troubleshooting Startup Issues](#troubleshooting-startup-issues)


## Installation

### System Requirements

Before you begin, ensure your system meets the Syncfusion Vue components requirements:
- Node.js (LTS version recommended)
- npm or yarn package manager
- Vue 2.x compatible development environment

### Prerequisites

You'll need the following installed:
- Vue CLI for project scaffolding
- Basic knowledge of Vue 2 component structure
- A text editor or IDE (VS Code recommended)

## Creating a Vue 2 Project

### Step 1: Install Vue CLI

Open your terminal and install Vue CLI globally:

```bash
npm install -g @vue/cli
```

Or using yarn:

```bash
yarn global add @vue/cli
```

### Step 2: Create a New Project

Use the vue create command to initialize a new project:

```bash
vue create quickstart
cd quickstart
```

### Step 3: Select Project Configuration

When prompted with the menu, select the `Default ([Vue 2] babel, eslint)` option. This creates a Vue 2 project with default settings.

![Vue 2 project setup terminal screenshot](../images/vue2-terminal.png)

Your project structure will include:
- `src/` - Application source files
- `public/` - Static assets
- `package.json` - Project dependencies and scripts

## Adding Syncfusion Packages

### Install HeatMap Package

The HeatMap component requires the `@syncfusion/ej2-vue-heatmap` package along with its dependencies:

```bash
npm install @syncfusion/ej2-vue-heatmap --save
```

Or using yarn:

```bash
yarn add @syncfusion/ej2-vue-heatmap
```

### Package Dependencies

The `@syncfusion/ej2-vue-heatmap` package automatically includes:
- `@syncfusion/ej2-base` - Core utilities
- `@syncfusion/ej2-data` - Data handling
- `@syncfusion/ej2-heatmap` - HeatMap control logic
- `@syncfusion/ej2-vue-base` - Vue integration layer
- `@syncfusion/ej2-svg-base` - SVG rendering support

These dependencies are automatically resolved during npm installation.

## Registering the HeatMap Component

### Import in App.vue

Update your `src/App.vue` file to import and register the HeatMap component:

```vue
<script>
import { HeatMapComponent } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  }
}
</script>
```

The component is now available as `<ejs-heatmap>` in your templates.

## Creating Your First HeatMap

### Basic Implementation

Add the HeatMap component to your template with minimal configuration:

```vue
<template>
  <div id="app">
    <ejs-heatmap id="heatmap" :dataSource='dataSource'></ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent } from '@syncfusion/ej2-vue-heatmap';

export default {
  name: "App",
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      dataSource: [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79],
        [56, 69, 21, 86, 3, 33],
        [45, 7, 53, 81, 95, 79],
        [60, 77, 74, 68, 88, 51],
        [25, 25, 10, 12, 78, 14],
        [25, 56, 55, 58, 12, 82],
        [74, 33, 88, 23, 86, 59]
      ]
    }
  }
}
</script>
```

This renders a basic HeatMap with a 2D array of numerical values.

### Enhanced Example with Axis Labels

```vue
<template>
  <div class="control_wrapper">
    <ejs-heatmap id="heatmap" :dataSource='dataSource' :xAxis='xAxis' :yAxis='yAxis'></ejs-heatmap>
  </div>
</template>

<script>
import { HeatMapComponent, Tooltip, Legend } from '@syncfusion/ej2-vue-heatmap';

export default {
  name: "App",
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  data: function () {
    return {
      xAxis: {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 
                 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario']
      },
      yAxis: {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
      },
      dataSource: [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79],
        [56, 69, 21, 86, 3, 33],
        [45, 7, 53, 81, 95, 79],
        [60, 77, 74, 68, 88, 51],
        [25, 25, 10, 12, 78, 14],
        [25, 56, 55, 58, 12, 82],
        [74, 33, 88, 23, 86, 59]
      ]
    }
  },
  provide: {
    heatmap: [Tooltip, Legend]
  }
}
</script>
```

Axis labels provide context for the data values in each dimension.

## Module Injection

### Available Feature Modules

The HeatMap component has feature modules that must be injected to enable functionality:

- **Legend** - Displays legend to indicate color gradients and value ranges
- **Tooltip** - Shows interactive tooltips when hovering over cells

### Injecting Modules

Add the provide option to inject modules:

```vue
<script>
import { HeatMapComponent, Legend, Tooltip } from '@syncfusion/ej2-vue-heatmap';

export default {
  components: {
    'ejs-heatmap': HeatMapComponent
  },
  provide: {
    heatmap: [Legend, Tooltip]
  }
}
</script>
```

Without module injection, these features won't be available even if you set their properties to true.

## Running the Application

### Start Development Server

Run the development server:

```bash
npm run serve
```

Or with yarn:

```bash
yarn run serve
```

The application will compile and open in your browser, typically at `http://localhost:8080`.

### Production Build

To create an optimized production build:

```bash
npm run build
```

Or with yarn:

```bash
yarn run build
```

The build output will be in the `dist/` directory and ready for deployment.

### Troubleshooting Startup Issues

**Module not found error:** Ensure all Syncfusion packages are installed:
```bash
npm install @syncfusion/ej2-vue-heatmap
```

**Component not rendering:** Verify that modules are injected via the `provide` option and component is properly imported.

**Port already in use:** The development server uses port 8080 by default. To use a different port:
```bash
npm run serve -- --port 3000
```
