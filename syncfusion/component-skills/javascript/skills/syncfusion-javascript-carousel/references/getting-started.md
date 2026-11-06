# Getting Started with Syncfusion Carousel

## Installation and Dependencies

The Carousel component requires the following packages to be installed:

```js
@syncfusion/ej2-navigations
├── @syncfusion/ej2-base
└── @syncfusion/ej2-buttons
```

All Syncfusion packages are available on npm. Install using the single `@syncfusion/ej2` package or individual packages:

```bash
npm install @syncfusion/ej2-navigations
```

## Development Environment Setup

### Clone Quickstart Repository

```bash
git clone url
cd ej2-quickstart
```

### Install Dependencies

```bash
npm install
```

## CSS Theme Import

Import the Syncfusion styles for Carousel and its dependencies. Add to `src/styles/styles.css`:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/carousel/index.css";
```

Syncfusion supports multiple themes. Replace `fluent2` with your preferred theme:
- `material`
- `bootstrap`
- `bootstrap4`
- `bootstrap5`
- `highcontrast`
- `tailwind`

## HTML Setup

Create the carousel container in your `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Syncfusion Carousel</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div class="control-container">
        <div id="carousel"></div>
    </div>
    <script src="systemjs.config.js"></script>
</body>
</html>
```

## Basic Carousel Initialization

### TypeScript Implementation

Import the Carousel component and initialize with items:

```typescript
import { Carousel } from "@syncfusion/ej2-navigations";

const carouselObj = new Carousel({
  items: [
    { template: '<figure class="img-container"><img src="url" alt="cardinal" style="height:100%;width:100%;" /><figcaption class="img-caption">Cardinal</figcaption></figure>' },
    { template: '<figure class="img-container"><img src="url" alt="kingfisher" style="height:100%;width:100%;" /><figcaption class="img-caption">Kingfisher</figcaption></figure>' },
    { template: '<figure class="img-container"><img src="url" alt="keel-billed-toucan" style="height:100%;width:100%;" /><figcaption class="img-caption">Keel-billed-toucan</figcaption></figure>' }
  ]
});

carouselObj.appendTo("#carousel");
```

## Complete Working Example

### HTML (`src/index.html`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Syncfusion Carousel</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <style>
        .control-container {
            height: 360px;
            margin: 0 auto;
            width: 600px;
        }
        .img-container {
            height: 100%;
            margin: 0;
        }
        .img-caption {
            color: #fff;
            font-size: 1rem;
            position: absolute;
            bottom: 3rem;
            width: 100%;
            text-align: center;
        }
    </style>
</head>
<body>
    <div id="container">
        <div class="control-container">
            <div id="carousel"></div>
        </div>
    </div>
</body>
</html>
```

### TypeScript (`src/app/app.ts`)

```typescript
import { Carousel } from "@syncfusion/ej2-navigations";

const carouselObj = new Carousel({
  items: [
    { template: '<figure class="img-container"><img src="url" alt="cardinal" style="height:100%;width:100%;" /><figcaption class="img-caption">Cardinal</figcaption></figure>' },
    { template: '<figure class="img-container"><img src="url" alt="kingfisher" style="height:100%;width:100%;" /><figcaption class="img-caption">Kingfisher</figcaption></figure>' },
    { template: '<figure class="img-container"><img src="url" alt="keel-billed-toucan" style="height:100%;width:100%;" /><figcaption class="img-caption">Keel-billed-toucan</figcaption></figure>' },
    { template: '<figure class="img-container"><img src="url" alt="yellow-warbler" style="height:100%;width:100%;" /><figcaption class="img-caption">Yellow-warbler</figcaption></figure>' },
    { template: '<figure class="img-container"><img src="url" alt="bee-eater" style="height:100%;width:100%;" /><figcaption class="img-caption">Bee-eater</figcaption></figure>' }
  ]
});

carouselObj.appendTo("#carousel");
```

## Running the Application

Start the development server:

```bash
npm start
```

The carousel will be available at `http://localhost:8080` and display the default carousel with image items.

## Basic Configuration Options

You can customize the carousel with basic options:

```typescript
const carouselObj = new Carousel({
  items: [...],
  height: "400px",
  width: "100%",
  autoPlay: true,
  interval: 5000,
  animationEffect: "Slide"
});
carouselObj.appendTo("#carousel");
```

## Next Steps

- Customize items with templates and data binding (see Populating Items)
- Add animation effects (see Animations and Transitions)
- Configure navigation and indicators (see Navigators and Indicators)
- Apply custom styles (see Styling and Appearance)
- Reference complete API documentation (see API Reference)
