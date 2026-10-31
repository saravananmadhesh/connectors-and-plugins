# Getting Started with Syncfusion JavaScript Controls

## Table of Contents
- [Overview](#overview)
- [Webpack Setup](#webpack-setup)
- [Electron Setup](#electron-setup)
- [Cordova Setup](#cordova-setup)
- [Ionic Setup](#ionic-setup)
- [Meteor Setup](#meteor-setup)
- [SharePoint Setup](#sharepoint-setup)

## Overview

Syncfusion JavaScript controls are available as npm packages and work seamlessly with modern JavaScript frameworks and environments. This guide covers installation, CSS imports, and initialization for popular frameworks and platforms.

## Webpack Setup

### Step 1: Clone Quickstart Repository

Clone the Syncfusion JavaScript quickstart project from [GitHub](https://github.com/SyncfusionExamples/ej2-quickstart-webpack) which contains predefined packages and styles reference.

### Step 2: Install Dependencies

Install the dependent npm packages:

```bash
npm install
```

### Step 3: Add Control to HTML

Add the Grid element to `~/src/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <div>
        <!--HTML grid element, which is going to render as Essential JS 2 Grid-->
        <div id="Grid"></div>
    </div>
</body>
</html>
```

### Step 4: Create Grid Control

Add the following TypeScript code to `~/src/app/app.ts`:

```ts
import { Grid } from '@syncfusion/ej2-grids';

// Grid data
const data: Object[] = [
    {
        OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5,
        ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims',
        ShipCountry: 'France', Freight: 32.38
    },
    {
        OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6,
        ShipName: 'Toms Spezialitäten', ShipCity: 'Münster',
        ShipCountry: 'Germany', Freight: 11.61
    }
];

// initialize grid control
let grid: Grid = new Grid({
    dataSource: data,
    columns: [
        { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
        { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
        { field: 'EmployeeID', width: 140, headerText: 'Employee ID', textAlign: 'Right', type: 'string' },
        { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' }
    ]
});

// render initialized grid
grid.appendTo('#Grid');
```

## Electron Setup

### Step 1: Set Up Development Environment

Create the application folder:

Create a `package.json` file and install required packages:

```bash
npm init -y
npm i --save-dev electron typescript ts-loader webpack webpack-cli
```

Create a default `tsconfig.json` file:

```bash
tsc --init
```

### Step 2: Add Syncfusion Packages

Install the Grid control package and theme package:

```bash
npm i @syncfusion/ej2-grids @syncfusion/ej2-fluent2-theme@latest --save
```

### Step 3: Import CSS Styles

Create a `~/style.css` file in the application root directory and import the Fluent2 theme:

```css
@import "node_modules/@syncfusion/ej2-fluent2-theme/styles/grid/index.css";
```

### Step 4: Create HTML File

Create `~/index.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Electron</title>
    <link href="./style.css" rel="stylesheet">
  </head>
  <body>
    <div id="container" style="margin:0 auto; width:300px;">
        <div id="Grid"></div>
    </div>
    <script src="./dist/renderer-bundle.js"></script>
  </body>
</html>
```

### Step 5: Create Renderer Control

Create `~/src/renderer.ts`:

```ts
import { Grid } from '@syncfusion/ej2-grids';

document.addEventListener("DOMContentLoaded", function() { 
    // Grid data
    const data: Object[] = [
        {
            OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5,
            ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims',
            ShipCountry: 'France', Freight: 32.38
        },
        {
            OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6,
            ShipName: 'Toms Spezialitäten', ShipCity: 'Münster',
            ShipCountry: 'Germany', Freight: 11.61
        }
    ];

    // initialize grid control
    let grid: Grid = new Grid({
        dataSource: data,
        columns: [
            { field: 'OrderID', headerText: 'Order ID', textAlign: 'Right', width: 120, type: 'number' },
            { field: 'CustomerID', width: 140, headerText: 'Customer ID', type: 'string' },
            { field: 'EmployeeID', width: 140, headerText: 'Employee ID', textAlign: 'Right', type: 'string' },
            { field: 'Freight', headerText: 'Freight', textAlign: 'Right', width: 120, format: 'C' }
        ]
    });

    // render initialized grid
    grid.appendTo('#Grid');
});
```

### Step 6: Configure Electron Application

Create `~/main.ts`:

```ts
import {app, BrowserWindow} from 'electron';
import * as path from 'path';

const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload-bundle.js'),
      },
    });
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})
```

Create `~/preload.ts`:

```ts
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: any, text: any) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
})
```

### Step 7: Configure Webpack

Create `~/webpack.config.js`:

```js
let common_config = {
    mode: 'development',
    module: {
        rules: [{
            test: /\.ts$/,
            use: [{ loader: 'ts-loader' }]
        }]
    },
};

module.exports = [
    Object.assign({}, common_config, {
        target: 'electron-main',
        entry: { main: './main.ts' },
        output: { filename: '[name]-bundle.js' },
    }),
    Object.assign({}, common_config, {
        target: 'electron-renderer',
        entry: { renderer: './src/renderer.ts' },
        output: { filename: '[name]-bundle.js' },
    }),
    Object.assign({}, common_config, {
        target: 'electron-preload',
        entry: { preload: './preload.ts' },
        output: { filename: '[name]-bundle.js' },
    })
]
```

### Step 8: Configure package.json

Modify `~/package.json`:

```json
{
  "main": "./dist/main-bundle.js",
  "scripts": {
    "build": "webpack --config webpack.config.js",
    "start": "npm run build && electron ."
  }
}
```

## Cordova Setup

### Step 1: Set Up Development Environment

Install Cordova globally and create a new Cordova application.

Add the browser platform:

```bash
cordova platform add browser
```

### Step 2: Configure TypeScript

Create `~/tsconfig.json`:

```json
{
    "compilerOptions": {
        "target": "es5",
        "module": "amd",
        "sourceMap": true,
        "outFile": "./www/js/ej2.js"
    },
    "files": ["www/ts/ej2.ts"],
    "compileOnSave": false
}
```

### Step 3: Add RequireJS Reference

In `~/www/index.html`, add RequireJS at the end of `<body>`:

```html
<script type="text/javascript" src="cordova.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js"></script>
```

### Step 4: Add npm Build Script

In `~/package.json`, add the build script:

```json
{
    "scripts": {
        "build": "tsc --build tsconfig.json"
    }
}
```

### Step 5: Install Syncfusion Package

```bash
npm install @syncfusion/ej2 --save
```

### Step 6: Add Control to HTML

Add Button element to `~/www/index.html`:

```html
<head>
    <link rel="stylesheet" type="text/css" href="https://cdn.syncfusion.com/ej2/32.1.19/fluent2.css">
</head>
<body>
    <button id="normalbtn">Normal</button>
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.min.js" data-main="js/ej2"></script>
</body>
```

### Step 7: Create TypeScript Control

Create `~/www/ts/ej2.ts`:

```ts
import { Button } from '@syncfusion/ej2-buttons';

// initialize button control
let button: Button = new Button();

// render initialized button
button.appendTo('#normalbtn');
```

### Step 8: Compile and Run

```bash
npm run build
cordova run browser
```

## Ionic Setup

### Step 1: Set Up Development Environment

Install Ionic and Cordova globally and create a new Ionic application.

### Step 2: Install Syncfusion Package

```bash
npm install @syncfusion/ej2 --save
```

### Step 3: Add Control to HTML

Add Calendar element to `~/src/app/home/home.page.html`:

```html
<ion-header>
    <ion-toolbar>
        <ion-title>Essential JS 2 Calendar</ion-title>
    </ion-toolbar>
</ion-header>

<ion-content padding>
    <h2>Essential JS 2 Calendar</h2>
    <div id="element"></div>
</ion-content>
```

### Step 4: Create Component

Update `~/src/app/home/home.page.ts`:

```ts
import { Calendar } from "@syncfusion/ej2-calendars";

@Component({
    templateUrl: 'home.page.html'
})

export class HomePage {
    constructor(platform: Platform) {
        platform.ready().then(() => {
            // initialize calendar control
            let calendarObject = new Calendar();

            // render initialized calendar
            calendarObject.appendTo('#element');
        });
    }
}
```

### Step 5: Add Styles

Add CSS to `~/src/index.html`:

```html
<head>
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/fluent2.css" rel="stylesheet">
</head>
```

## Meteor Setup

### Step 1: Set Up Development Environment

Install Meteor:

```bash
# Windows (using Chocolatey):
choco install meteor

# macOS/Linux:
curl https://install.meteor.com/ | sh
```

Create a new Meteor project:

### Step 2: Install Syncfusion Package

```bash
meteor npm install @syncfusion/ej2 --save
```

### Step 3: Add Control to HTML

Add Calendar element to `~/client/main.html`:

```html
<head>
    <title>ej2-meteor</title>
</head>

<body>
    <h2>Essential JS 2 Calendar</h2>
    <div id="element"></div>
</body>
```

### Step 4: Create Control

Add to `~/client/main.js`:

```js
import './main.html';

// import Syncfusion Essential JS 2 styles from node_modules
import '../node_modules/@syncfusion/ej2/fluent2.css';

import { Calendar } from '@syncfusion/ej2-calendars';

Meteor.startup(() => {
    // initialize calendar control
    let calendarObject = new Calendar();

    // render initialized calendar
    calendarObject.appendTo('#element');
});
```

## SharePoint Setup

### Step 1: Install Syncfusion Package

```bash
npm install @syncfusion/ej2 --save
```

### Step 3: Add Control to Component

Update `~/src/webparts/buttonComponent/ButtonComponentWebPart.ts`:

```ts
import styles from './ButtonComponentWebPart.module.scss';
import * as strings from 'ButtonComponentWebPartStrings';

// import Essential JS 2 Button
import { Button } from '@syncfusion/ej2-buttons';

// add Syncfusion Essential JS 2 style reference from node_modules
require('../../../node_modules/@syncfusion/ej2/fabric.css');

export default class ButtonComponentWebPart extends BaseClientSideWebPart<IButtonComponentWebPartProps> {

    public render(): void {
        this.domElement.innerHTML = `
            <div class="${ styles.buttonComponent }">
                <h2>Essential JS 2 Button</h2>
                <button id="normalbtn">Essential JS 2 Button</button>
            </div>`;

        // initialize button control
        let button: Button = new Button();

        // render initialized button
        button.appendTo('#normalbtn');
    }
}
```

