# Accessibility & RTL

## Table of Contents
- [WCAG Compliance](#wcag-compliance)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA & Screen Readers](#aria--screen-readers)
- [Color Accessibility](#color-accessibility)
- [RTL Support](#rtl-support)

## WCAG Compliance

Stock Chart implements Web Content Accessibility Guidelines (WCAG) Level AA standards:

**WCAG 2.1 Principles:**
- **Perceivable:** Information is accessible to all senses
- **Operable:** Keyboard navigable, sufficient time
- **Understandable:** Clear language and predictable behavior
- **Robust:** Compatible with assistive technologies

## Keyboard Navigation

### Navigation Shortcuts

Stock Chart supports keyboard shortcuts for navigation:

| Key | Action |
|-----|--------|
| `Tab` | Move focus to next interactive element |
| `Shift+Tab` | Move focus to previous element |
| `Arrow Keys` | Navigate chart elements |
| `Enter` | Select/activate focused element |
| `Escape` | Close tooltips/menus |
| `+` | Zoom in |
| `-` | Zoom out |
| `0` | Reset zoom |

### Keyboard-Only Navigation

**TypeScript:**

```typescript
import { StockChart } from '@syncfusion/ej2-charts';
import { DateTime, CandleSeries } from '@syncfusion/ej2-charts';

StockChart.Inject(DateTime, CandleSeries);

const stockChart = new StockChart({
  series: [{
    dataSource: stockData,
    type: 'Candle'
  }],
  // Enable keyboard navigation
  enableKeyboardNavigation: true,
  
  // Tooltip on keyboard focus
  tooltip: {
    enable: true,
    enableMarker: true
  }
}, '#stockChart');

// Custom keyboard handler
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    // Activate current focused element
    stockChart.print();
  }
});
```

### Tab Order

Ensure logical tab order:

```html
<!-- Tab order: 1 -> 2 -> 3 -> ... -->
<button tabindex="1">Export PNG</button>
<button tabindex="2">Export PDF</button>
<button tabindex="3">Print</button>
<div id="stockChart" tabindex="4" role="main" 
     aria-label="Stock chart visualization">
</div>
```

## ARIA & Screen Readers

### ARIA Labels

```typescript
const stockChart = new StockChart({
  series: [{
    dataSource: stockData,
    type: 'Candle',
    name: 'Apple Inc. Stock Price'  // Series name for screen readers
  }],
  title: 'AAPL Stock Chart',
  
  // Chart description
  accessibility: {
    description: 'Interactive stock chart showing daily OHLC prices' +
                 ' for Apple Inc. (AAPL). Use keyboard arrows to' +
                 ' navigate data points. Press Enter for details.'
  }
}, '#stockChart');
```

### Role & Landmark

```html
<div id="stockChart" 
     role="main" 
     aria-label="Stock Chart - Apple Inc (AAPL)"
     aria-describedby="chart-description">
  <!-- Chart renders here -->
</div>

<p id="chart-description" style="display:none;">
  This chart displays daily stock price data for Apple Inc.
  showing open, high, low, and closing prices over time.
</p>
```

### Series Information for Screen Readers

```typescript
const stockChart = new StockChart({
  series: [
    {
      dataSource: priceData,
      type: 'Candle',
      name: 'Stock Price - OHLC Format',
      accessibility: {
        description: 'Candlestick series showing daily price ranges'
      }
    },
    {
      dataSource: smaData,
      type: 'Line',
      name: 'Simple Moving Average (20-day)',
      accessibility: {
        description: 'Moving average trend line'
      }
    }
  ]
}, '#stockChart');
```

### Axis Labels

```typescript
primaryXAxis: {
  valueType: 'DateTime',
  title: { text: 'Trading Date' },
  accessibility: {
    description: 'Time axis showing trading dates'
  }
}

primaryYAxis: {
  labelFormat: '${value}',
  title: { text: 'Stock Price (USD)' },
  accessibility: {
    description: 'Price axis showing values in US Dollars'
  }
}
```

## Color Accessibility

### High Contrast Mode

Support high contrast colors:

**TypeScript:**

```typescript
const isHighContrast = 
  window.matchMedia('(prefers-contrast: more)').matches;

const stockChart = new StockChart({
  theme: isHighContrast ? 'HighContrast' : 'Bootstrap5',
  series: [{
    dataSource: stockData,
    type: 'Candle',
    bullFillColor: isHighContrast ? '#FFFFFF' : '#e74c3d',
    bearFillColor: isHighContrast ? '#000000' : '#2ecd71',
    borderWidth: isHighContrast ? 2 : 1,
    borderColor: isHighContrast ? '#000' : '#333'
  }]
}, '#stockChart');
```

### Color Blind Friendly Palette

```typescript
// Deuteranopia (red-green color blind friendly)
const colorblindPalette = [
  '#0173B2',  // Blue
  '#DE8F05',  // Orange
  '#CC78BC',  // Pink
  '#CA9161',  // Brown
  '#949494'   // Gray
];

const stockChart = new StockChart({
  palette: colorblindPalette,
  series: [{
    dataSource: stockData,
    type: 'Candle'
  }]
}, '#stockChart');
```

### Sufficient Color Contrast

```typescript
series: [{
  dataSource: stockData,
  type: 'Candle',
  // WCAG AA: 4.5:1 contrast ratio minimum
  bullFillColor: '#FFFFFF',       // White (high contrast)
  bearFillColor: '#000000',       // Black (high contrast)
  borderWidth: 1,
  borderColor: '#333333'          // Dark gray
}]
```

## RTL Support

Right-to-left language support for Arabic, Hebrew, etc.

### Enable RTL

**TypeScript:**

```typescript
import { StockChart } from '@syncfusion/ej2-charts';
import { enableRtl } from '@syncfusion/ej2-base';

// Enable global RTL support
enableRtl(true);

const stockChart = new StockChart({
  series: [{
    dataSource: stockData,
    type: 'Candle'
  }],
  // Chart will automatically mirror
}, '#stockChart');
```

**HTML:**

```html
<html dir="rtl">
  <head>
    <meta charset="UTF-8">
  </head>
  <body>
    <div id="stockChart"></div>
  </body>
</html>
```

### RTL Legend Positioning

```typescript
legend: {
  visible: true,
  position: 'Left',  // Left side in RTL (opposite of LTR)
  alignment: 'Far'
}
```

### RTL Axis Labels

```typescript
primaryXAxis: {
  valueType: 'DateTime',
  labelFormat: 'dd/MM/yyyy',  // Arabic number formatting
  labelPlacement: 'BetweenTicks'
}

primaryYAxis: {
  labelFormat: '${value}'
}
```

## Complete Accessibility Example

```typescript
import { StockChart, Export } from '@syncfusion/ej2-charts';
import { DateTime, CandleSeries } from '@syncfusion/ej2-charts';
import { enableRtl } from '@syncfusion/ej2-base';

// Enable RTL if needed
if (document.documentElement.dir === 'rtl') {
  enableRtl(true);
}

// High contrast detection
const isHighContrast = 
  window.matchMedia('(prefers-contrast: more)').matches;

StockChart.Inject(DateTime, CandleSeries, Export);

const stockChart = new StockChart({
  // Accessibility
  theme: isHighContrast ? 'HighContrast' : 'Bootstrap5',
  enableKeyboardNavigation: true,
  
  // Content
  title: 'Apple Inc. Stock Price',
  titleStyle: { size: '18px' },
  
  // Axes with descriptions
  primaryXAxis: {
    valueType: 'DateTime',
    title: { text: 'Trading Date' }
  },
  
  primaryYAxis: {
    labelFormat: '${value}',
    title: { text: 'Price (USD)' }
  },
  
  // Series
  series: [{
    dataSource: stockData,
    xName: 'x',
    yName: 'close',
    type: 'Candle',
    name: 'AAPL Daily Prices',
    bullFillColor: isHighContrast ? '#FFFFFF' : '#e74c3d',
    bearFillColor: isHighContrast ? '#000000' : '#2ecd71',
    borderWidth: isHighContrast ? 2 : 1
  }],
  
  // Interaction
  tooltip: {
    enable: true,
    shared: true
  },
  
  legend: {
    visible: true,
    position: 'Bottom',
    alignment: 'Center'
  }
}, '#stockChart');

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.altKey) {
    switch(e.key) {
      case 'p':
        e.preventDefault();
        stockChart.export('PNG', 'stock-chart.png');
        break;
      case 'd':
        e.preventDefault();
        stockChart.export('PDF', 'stock-chart.pdf');
        break;
      case 'r':
        e.preventDefault();
        stockChart.print();
        break;
    }
  }
});
```

## Accessibility Checklist

- [ ] Chart has meaningful title and description
- [ ] Keyboard navigation enabled
- [ ] ARIA labels on chart container
- [ ] Series names provided
- [ ] Axis titles labeled
- [ ] Colors have sufficient contrast (4.5:1+)
- [ ] Tested with screen reader (NVDA, JAWS, VoiceOver)
- [ ] Tested keyboard-only navigation
- [ ] High contrast mode tested
- [ ] RTL mode tested (if applicable)
- [ ] Mobile accessible (touch, screen reader)
- [ ] Color not only means of communication

## Testing Tools

**Screen Readers:**
- NVDA (Windows, free)
- JAWS (Windows, commercial)
- VoiceOver (macOS/iOS, built-in)
- TalkBack (Android, built-in)

**Automated Testing:**
- axe DevTools (Chrome/Firefox)
- WAVE (Chrome/Firefox)
- Lighthouse (Chrome DevTools)

**Manual Testing:**
- Keyboard-only navigation
- High contrast mode (Windows/macOS)
- RTL language mode
- Browser zoom (up to 200%)
