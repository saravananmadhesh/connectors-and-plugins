# Technical Indicators

## Table of Contents
- [Overview](#overview)
- [Simple Moving Average (SMA)](#simple-moving-average-sma)
  - [Basic SMA](#basic-sma)
  - [SMA Parameters](#sma-parameters)
  - [Multiple SMAs for Trend Confirmation](#multiple-smas-for-trend-confirmation)
  - [SMA Trading Signals](#sma-trading-signals)
- [Exponential Moving Average (EMA)](#exponential-moving-average-ema)
  - [Basic EMA](#basic-ema)
  - [SMA vs EMA Comparison](#sma-vs-ema-comparison)
- [Bollinger Bands (BB)](#bollinger-bands-bb)
  - [Basic Bollinger Bands](#basic-bollinger-bands)
  - [Interpreting Bollinger Bands](#interpreting-bollinger-bands)
  - [Customizing Band Appearance](#customizing-band-appearance)
- [Relative Strength Index (RSI)](#relative-strength-index-rsi)
  - [Basic RSI](#basic-rsi)
  - [RSI Reference Lines](#rsi-reference-lines)
  - [RSI Signals](#rsi-signals)
- [MACD](#macd)
  - [Basic MACD](#basic-macd)
  - [MACD Signals](#macd-signals)
  - [MACD with Custom Parameters](#macd-with-custom-parameters)
- [Other Indicators](#other-indicators)
  - [Stochastic](#stochastic)
  - [Average True Range (ATR)](#average-true-range-atr)
  - [Accumulation/Distribution Line (ADL)](#accumulationdistribution-line-adl)
  - [Accelerator Oscillator](#accelerator-oscillator)
- [Multiple Indicators](#multiple-indicators)
- [Customizing Indicators](#customizing-indicators)
  - [Indicator Colors](#indicator-colors)
  - [Dashed Lines](#dashed-lines)
  - [Indicator Visibility Toggle](#indicator-visibility-toggle)
- [Common Indicator Combinations](#common-indicator-combinations)
  - [Combination 1: Trend Trading](#combination-1-trend-trading)
  - [Combination 2: Mean Reversion](#combination-2-mean-reversion)
  - [Combination 3: Momentum](#combination-3-momentum)


## Overview

Technical Indicators help identify trends, momentum, and trading signals. Stock Chart supports indicators like:
- **Trend Indicators:** SMA, EMA, KAMA, TMA
- **Volatility Indicators:** Bollinger Bands, Accelerator Bands, ATR
- **Momentum Indicators:** RSI, MACD, Stochastic, CCI
- **Volume Indicators:** ADX, ADL, OBV, Alligator

Each indicator calculates values from price data and displays on a separate y-axis (secondary axis).

---

## Simple Moving Average (SMA)

Simple Moving Average smooths price data by averaging prices over a period.

### Basic SMA

```typescript
<ejs-stockchart>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' 
            high='high' low='low' open='open' close='close'
            name='Price'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
    <e-stockchart-indicators>
        <e-stockchart-indicator type='Sma' field='Close' period=20 seriesName='SMA 20'>
        </e-stockchart-indicator>
    </e-stockchart-indicators>
</ejs-stockchart>
```

**Result:** Line overlay on price showing 20-period moving average

### SMA Parameters

```typescript
<e-indicator 
    type='Sma' 
    field='Close'      // Price field to average
    period=50        // Number of periods (50-day MA)
    seriesName='MA 50' 
    yAxisName='secondary'  // Optional: separate axis for indicator
>
</e-indicator>
```

### Multiple SMAs for Trend Confirmation

```typescript
<e-stockchart-indicators>
    <e-stockchart-indicator type='Sma' field='Close' period=20 seriesName='SMA 20'></e-stockchart-indicator>
    <e-stockchart-indicator type='Sma' field='Close' period=50 seriesName='SMA 50'></e-stockchart-indicator>
    <e-stockchart-indicator type='Sma' field='Close' period=200 seriesName='SMA 200'></e-stockchart-indicator>
</e-stockchart-indicators>
```

**Use:** Compare multiple timeframes (20-day, 50-day, 200-day crossovers signal trends)

### SMA Trading Signals

```typescript
// Golden Cross: 50-MA crosses above 200-MA (bullish)
// Death Cross: 50-MA crosses below 200-MA (bearish)
// Price above MA: Uptrend
// Price below MA: Downtrend
```

---

## Exponential Moving Average (EMA)

EMA gives more weight to recent prices, responding faster than SMA to price changes.

### Basic EMA

```typescript
<e-indicator 
    type='Ema' 
    field='Close' 
    period=12 
    seriesName='EMA 12'>
</e-indicator>
```

### SMA vs EMA Comparison

```typescript
<e-stockchart-indicators>
    <e-stockchart-indicator type='Sma' field='Close' period=20 seriesName='SMA 20'></e-stockchart-indicator>
    <e-stockchart-indicator type='Ema' field='Close' period=20 seriesName='EMA 20'></e-stockchart-indicator>
</e-stockchart-indicators>
```

**Difference:**
- **SMA:** Weighted equally, slower to respond
- **EMA:** Recent prices weighted more, faster to respond to price changes

**Use EMA when:** You need responsive indicators for fast-moving markets

---

## Bollinger Bands (BB)

Bollinger Bands show volatility and potential reversal points using upper/middle/lower bands.

### Basic Bollinger Bands

```typescript
<e-stockchart-indicator 
    type='BollingerBands' 
    field='Close' 
    period=20
    seriesName='BB'
    standardDeviation=2>
</e-stockchart-indicator>
```

**Result:** Three bands:
- **Middle Band:** 20-period SMA
- **Upper Band:** Middle + (2 × Standard Deviation)
- **Lower Band:** Middle − (2 × Standard Deviation)

### Interpreting Bollinger Bands

```typescript
// Price touches upper band: Potentially overbought, consider selling
// Price touches lower band: Potentially oversold, consider buying
// Bands expanding: Increasing volatility
// Bands contracting: Decreasing volatility
```

### Customizing Band Appearance

```typescript
<e-stockchart-indicator
    type='BollingerBands' 
    field='Close' 
    period=20
    standardDeviation=2
    seriesName='BB'
    [lowerLine]='{ color: "#FF0000", dashArray: "2,2" }'
    [upperLine]='{ color: "#00FF00", dashArray: "2,2" }'>
</e-stockchart-indicator>
```

---

## Relative Strength Index (RSI)

RSI measures momentum, showing overbought (>70) and oversold (<30) conditions.

### Basic RSI

```typescript
<e-stockchart-indicator 
    type='Rsi' 
    field='Close' 
    period=14 
    seriesName='RSI'>
</e-stockchart-indicator>
```

**Result:** Oscillator ranging 0-100 on secondary y-axis

### RSI Reference Lines

```typescript
<ejs-stockchart>
    <e-stockchart-indicators>
        <e-stockchart-indicator type='Rsi' field='Close' period=14 seriesName='RSI'></e-stockchart-indicator>
    </e-stockchart-indicators>
    <e-stockchart-series-collection>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### RSI Signals

```typescript
// RSI > 70: Overbought, potential sell signal
// RSI < 30: Oversold, potential buy signal
// RSI crossing 50: Momentum shift (bullish if crossing up, bearish if crossing down)
// Divergence: RSI doesn't confirm new price high/low (potential reversal)
```

---

## MACD

MACD (Moving Average Convergence Divergence) identifies trend changes and momentum.

### Basic MACD

```typescript
<e-stockchart-indicator
    type='Macd' 
    field='Close'
    seriesName='MACD'
    fastPeriod=12
    slowPeriod=26>
</e-stockchart-indicator>
```

**Result:** Three lines on secondary y-axis:
- **MACD Line:** 12-EMA − 26-EMA
- **Signal Line:** 9-EMA of MACD
- **Histogram:** MACD − Signal (vertical bars)

### MACD Signals

```typescript
// MACD > Signal: Bullish, uptrend
// MACD < Signal: Bearish, downtrend
// MACD crosses above Signal: Potential buy signal
// MACD crosses below Signal: Potential sell signal
// Positive histogram: Bullish momentum
// Negative histogram: Bearish momentum
```

### MACD with Custom Parameters

```typescript
// Standard: Fast=12, Slow=26, Signal=9
// Fast markets: Fast=5, Slow=13, Signal=5
// Slower markets: Fast=19, Slow=39, Signal=9

<e-stockchart-indicator
    type='Macd' 
    field='Close'
    fastPeriod=5    // Changed from 12
    slowPeriod=13  // Changed from 26
    signalPeriod=5  // Changed from 9
    seriesName='MACD Fast'>
</e-stockchart-indicator>
```

---

## Other Indicators

### Stochastic

Compares price to price range over period, identifies overbought/oversold.

```typescript
<e-stockchart-indicator 
    type='Stochastic' 
    field='Close' 
    period=14
    kPeriod=3
    dPeriod=3
    seriesName='Stochastic'>
</e-stockchart-indicator>
```

**Output:** K% and D% lines (0-100 scale)

### Average True Range (ATR)

Measures volatility without direction.

```typescript
<e-stockchart-indicator
    type='Atr' 
    field='Close' 
    period=14
    seriesName='ATR'>
</e-stockchart-indicator>
```

### Accumulation/Distribution Line (ADL)

Relates price and volume to identify buying/selling pressure.

```typescript
<e-stockchart-indicator 
    type='Adl' 
    field='Close'
    seriesName='ADL'>
</e-stockchart-indicator>
```

### Accelerator Oscillator

Measures acceleration/deceleration of price.

```typescript
<e-stockchart-indicator
    type='AcceleratorBands' 
    field='Close'
    seriesName='Accelerator'
    period=34>
</e-stockchart-indicator>
```

---

## Multiple Indicators

Combine indicators for comprehensive analysis:

```typescript
<ejs-stockchart>
    <e-stockchart-series-collection>
        <e-stockchart-series type='Candle' xName='x' 
            high='high' low='low' open='open' close='close'>
        </e-stockchart-series>
    </e-stockchart-series-collection>
    <e-stockchart-indicators>
        <!-- Trend -->
        <e-stockchart-indicator type='Sma' field='Close' period=20 seriesName='MA 20'></e-stockchart-indicator>
        
        <!-- Volatility -->
        <e-stockchart-indicator type='BollingerBands' field='Close' period=20 seriesName='BB'></e-stockchart-indicator>
        
        <!-- Momentum -->
        <e-stockchart-indicator type='Rsi' field='Close' period=14 seriesName='RSI'></e-stockchart-indicator>
        
        <!-- Trend Change -->
        <e-stockchart-indicator type='Macd' field='Close' seriesName='MACD'></e-stockchart-indicator>
    </e-stockchart-indicators>
</ejs-stockchart>
```

**Chart Layout:**
- Primary Y-axis: Price with candles and SMA 20
- Secondary Y-axis: Bollinger Bands bands
- Tertiary Y-axis: RSI (0-100)
- Quaternary Y-axis: MACD histogram

---
## Indicator Events

> **Indicator events:** Stock Chart supports indicator events for tracking and managing indicators added or removed through the toolbar. The `beforeIndicatorChange` event is triggered before an indicator update is applied and allows the update to be canceled. The `indicatorChanged` event is triggered after the indicator has been updated successfully.

### Before Indicator Change

The `beforeIndicatorChange` event is triggered before an indicator is added or removed through the Stock Chart toolbar. Set the event argument's `cancel` property to `true` to prevent the requested indicator update.

### Indicator Changed

The `indicatorChanged` event is triggered after an indicator has been added or removed successfully. Use this event to track the completed update or run dependent application logic.

### Basic Implementation

```typescript
import { Component } from '@angular/core';

@Component({
    selector: 'app-container',
    template: `
        <ejs-stockchart
            id="stock-chart"
            [dataSource]="stockData"
            (beforeIndicatorChange)="onBeforeIndicatorChange($event)"
            (indicatorChanged)="onIndicatorChanged($event)">
            <e-stockchart-series-collection>
                <e-stockchart-series
                    type="Candle"
                    xName="date"
                    high="high"
                    low="low"
                    open="open"
                    close="close">
                </e-stockchart-series>
            </e-stockchart-series-collection>
        </ejs-stockchart>
    `
})
export class AppComponent {
    public stockData: object[] = [
        { date: new Date(2024, 0, 1), open: 100, high: 108, low: 98, close: 105 },
        { date: new Date(2024, 0, 2), open: 105, high: 112, low: 103, close: 110 },
        { date: new Date(2024, 0, 3), open: 110, high: 114, low: 106, close: 108 }
    ];

    public onBeforeIndicatorChange(args: any): void {
        console.log('Indicator update requested:', args);

        // Set args.cancel to true when the requested update must be prevented.
        // args.cancel = true;
    }

    public onIndicatorChanged(args: any): void {
        console.log('Indicator updated successfully:', args);
    }
}
```

**Event behavior:**
- `beforeIndicatorChange` runs before the toolbar update and supports cancellation through `args.cancel`.
- When the update is canceled, the requested indicator change is not applied.
- `indicatorChanged` runs only after the indicator update succeeds.
- These events apply to indicators added or removed through the Stock Chart toolbar.

---

## Customizing Indicators

### Indicator Colors

```typescript
<e-stockchart-indicator
    type='Sma' 
    field='Close' 
    period=20 
    seriesName='SMA 20'
    fill='#0099FF'
    width=2>
</e-stockchart-indicator>
```

### Dashed Lines

```typescript
<e-stockchart-indicator
    type='Ema' 
    field='Close' 
    period=12
    dashArray='5,5'
    width=2>
</e-stockchart-indicator>
```

### Indicator Visibility Toggle

```typescript
export class StockChartComponent {
    showSMA = true;
    showBB = true;
    showRSI = false;

    toggleIndicator(indicator: string) {
        if (indicator === 'SMA') this.showSMA = !this.showSMA;
        if (indicator === 'BB') this.showBB = !this.showBB;
        if (indicator === 'RSI') this.showRSI = !this.showRSI;
        // Update chart by changing data binding
    }
}
```

Template:
```typescript
<button (click)="toggleIndicator('SMA')">Toggle SMA</button>
<button (click)="toggleIndicator('BB')">Toggle BB</button>
<button (click)="toggleIndicator('RSI')">Toggle RSI</button>

<ejs-stockchart [showSMA]='showSMA' [showBB]='showBB' [showRSI]='showRSI'>
    <!-- Series and indicators -->
</ejs-stockchart>
```

---

## Common Indicator Combinations

### Combination 1: Trend Trading
```typescript
// SMA 20/50 crossover
<e-stockchart-indicator type='Sma' field='Close' period=20 seriesName='SMA 20'></e-stockchart-indicator>
<e-stockchart-indicator type='Sma' field='Close' period=50 seriesName='SMA 50'></e-stockchart-indicator>
```
**Signal:** When SMA 20 crosses above SMA 50, enter long

### Combination 2: Mean Reversion
```typescript
// Bollinger Bands with RSI
<e-stockchart-indicator type='BollingerBands' field='Close' period=20 seriesName='BB'></e-stockchart-indicator>
<e-stockchart-indicator type='Rsi' field='Close' period=14 seriesName='RSI'></e-stockchart-indicator>
```
**Signal:** Price near upper band + RSI > 70 = sell

### Combination 3: Momentum
```typescript
// MACD and Stochastic
<e-stockchart-indicator type='Macd' field='Close' seriesName='MACD'></e-stockchart-indicator>
<e-stockchart-indicator type='Stochastic' field='Close' period=14 seriesName='Stochastic'></e-stockchart-indicator>
```
**Signal:** MACD and Stochastic both showing strong momentum = strong trend
