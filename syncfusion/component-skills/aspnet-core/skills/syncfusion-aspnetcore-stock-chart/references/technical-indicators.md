# Technical Indicators

## Table of Contents
- [Overview](#overview)
- [Supported Indicator Types](#supported-indicator-types)
- [Adding Indicators](#adding-indicators)
    - [Basic Indicator Configuration](#basic-indicator-configuration)
    - [Common Indicator Properties](#common-indicator-properties)
- [Moving Average Indicators](#moving-average-indicators)
    - [Simple Moving Average (SMA)](#simple-moving-average-sma)
    - [Exponential Moving Average (EMA)](#exponential-moving-average-ema)
    - [Triangular Moving Average (TMA)](#triangular-moving-average-tma)
- [Momentum Indicators](#momentum-indicators)
    - [Momentum](#momentum)
    - [Moving Average Convergence Divergence (MACD)](#moving-average-convergence-divergence-macd)
    - [Relative Strength Index (RSI)](#relative-strength-index-rsi)
- [Volatility Indicators](#volatility-indicators)
    - [Average True Range (ATR)](#average-true-range-atr)
    - [Bollinger Bands](#bollinger-bands)
    - [Stochastic](#stochastic)
- [Accumulation Distribution](#accumulation-distribution)
- [Removing Indicators](#removing-indicators)
    - [Remove All Indicators](#remove-all-indicators)
    - [Dynamic Removal (JavaScript)](#dynamic-removal-javascript)
- [Indicator Events](#indicator-events)
  - [Before Indicator Change](#before-indicator-change)
  - [Indicator Change](#indicator-changed)
  - [Basic Implementation](#basic-implementation)
- [Indicator Customization](#indicator-customization)
    - [Color and Line Style](#color-and-line-style)
    - [Multiple Indicators](#multiple-indicators)
    - [Period Adjustment](#period-adjustment)
- [Common Indicator Strategies](#common-indicator-strategies)

## Overview

Technical indicators are mathematical calculations based on historic price, volume, and open interest data. They forecast financial market direction and help traders make informed decisions.

Stock Chart supports 10 types of technical indicators, each serving different analytical purposes.

## Supported Indicator Types

| Indicator | Type Value | Purpose | Key Properties |
|-----------|------------|---------|-----------------|
| Simple Moving Average | Sma | Trend identification | period |
| Exponential Moving Average | Ema | Trend following | period |
| Triangular Moving Average | Tma | Smoothing trends | period |
| Accumulation Distribution | AccumulationDistribution | Volume analysis | volume field |
| Average True Range | Atr | Volatility measurement | period |
| Momentum | Momentum | Speed of change | period |
| Moving Average Convergence Divergence | Macd | Trend & momentum | fastPeriod, slowPeriod, signalPeriod |
| Relative Strength Index | Rsi | Overbought/oversold | period, overBought, overSold |
| Stochastic | Stochastic | Price momentum | period, overBought, overSold |
| Bollinger Bands | BollingerBand | Volatility bands | period, standardDeviations |

## Adding Indicators

### Basic Indicator Configuration

Add indicators using the `indicator-collection` within the Stock Chart:

```cshtml
<ejs-stockchart id="stockChart">
    <e-stockchart-indicators>
        <e-stockchart-indicator 
            type="Ema" 
            field="Close" 
            period="14">
        </e-stockchart-indicator>
    </e-stockchart-indicators>
    
    <e-stockchart-series-collection>
        <e-stockchart-series 
            dataSource="stockData" 
            xName="x" 
            yName="close" 
            type="Candle">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>
```

### Common Indicator Properties

- **type**: Indicator type (Ema, Sma, Atr, Rsi, etc.)
- **field**: Price field to calculate on (typically "close")
- **period**: Number of periods for calculation (default varies by indicator)
- **seriesName**: Name of series to attach indicator to

## Moving Average Indicators

Moving averages smooth price data to identify trends.

### Simple Moving Average (SMA)

Calculates average of prices over specified period:

```cshtml
<e-stockchart-indicator 
    type="Sma" 
    field="Close" 
    period="20">
</e-stockchart-indicator>
```

**Use case:** Basic trend identification, support/resistance levels

### Exponential Moving Average (EMA)

Gives more weight to recent prices, responds faster to changes:

```cshtml
<e-stockchart-indicator 
    type="Ema" 
    field="Close" 
    period="12">
</e-stockchart-indicator>
```

**Use case:** Short-term trend following, quick market response

### Triangular Moving Average (TMA)

Double smoothing of moving average, reduces noise:

```cshtml
<e-stockchart-indicator 
    type="Tma" 
    field="Close" 
    period="15">
</e-stockchart-indicator>
```

**Use case:** Very smooth trends, longer-term analysis

## Momentum Indicators

Momentum indicators measure the rate of change in price.

### Momentum

Shows speed at which price is changing:

```cshtml
<e-stockchart-indicator 
    type="Momentum" 
    field="Close" 
    period="14">
</e-stockchart-indicator>
```

**Visual:** Two lines - upperLine at 100, signalLine below
**Use case:** Identify overbought/oversold conditions

### Moving Average Convergence Divergence (MACD)

Compares two exponential moving averages:

```cshtml
<e-stockchart-indicator 
    type="Macd" 
    field="Close" 
    fastPeriod="12" 
    slowPeriod="26" 
    fastPeriod="9">
</e-stockchart-indicator>
```

**Visual:** MACD line, signal line, histogram
**Use case:** Trend reversal signals, momentum confirmation

### Relative Strength Index (RSI)

Measures overbought/oversold conditions:

```cshtml
<e-stockchart-indicator 
    type="Rsi" 
    field="Close" 
    period="14" 
    overBought="70" 
    overSold="30">
</e-stockchart-indicator>
```

**Range:** 0-100 (typically 30 oversold, 70 overbought)
**Visual:** Three lines - upperBand, signalLine, lowerBand
**Use case:** Identify reversal points

## Volatility Indicators

Volatility indicators measure price movement range.

### Average True Range (ATR)

Measures volatility by comparing current and previous values:

```cshtml
<e-stockchart-indicator 
    type="Atr" 
    field="Close" 
    period="14">
</e-stockchart-indicator>
```

**Use case:** Stop-loss placement, position sizing

### Bollinger Bands

Shows upper and lower bands around a moving average:

```cshtml
<e-stockchart-indicator 
    type="BollingerBands" 
    field="Close" 
    period="20" 
    standardDeviation="2">
</e-stockchart-indicator>
```

**Visual:** Three lines - upperLine, middle (SMA), lowerLine
**Use case:** Support/resistance, volatility breakout signals

### Stochastic

Compares closing price to price range:

```cshtml
<e-stockchart-indicator 
    type="Stochastic" 
    field="Close" 
    period="14" 
    overBought="80" 
    overSold="20">
</e-stockchart-indicator>
```

**Visual:** Four lines - upperLine, lowerLine, periodLine, signalLine
**Use case:** Momentum, overbought/oversold signals

## Accumulation Distribution

Combines price and volume to show money flow:

```cshtml
<e-stockchart-indicator 
    type="AccumulationDistribution" 
    field="Close" 
    volume="volume">
</e-stockchart-indicator>
```

**Important:** Requires volume field in dataSource

**Use case:** Confirm price trends with volume analysis

## Removing Indicators

### Remove All Indicators

Clear the indicator collection:

```cshtml
<e-stockchart-indicators>
    <!-- Empty collection removes all indicators -->
</e-stockchart-indicators>
```

### Dynamic Removal (JavaScript)

Remove specific indicator programmatically:

```javascript
var chart = document.getElementById('stockChart').ej2_instances[0];

// Remove first indicator
chart.series[0].indicators.splice(0, 1);
chart.refresh();

// Remove all indicators
chart.series[0].indicators = [];
chart.refresh();
```
## Indicator Events

Stock Chart provides events to track and manage indicators added or removed through the toolbar.

### Before Indicator Change

The `beforeIndicatorChange` event is triggered before an indicator is added or removed through the Stock Chart toolbar. Set `args.cancel` to `true` to prevent the requested update.

### Indicator Changed

The `indicatorChanged` event is triggered after an indicator has been added or removed successfully. Use this event to track the completed change or run dependent application logic.

### Basic Implementation

```cshtml
@{
    string[] indicatorTypes = new[]
    {
        "Sma",
        "Ema",
        "Tma",
        "BollingerBands",
        "Momentum",
        "Atr",
        "Rsi",
        "Macd",
        "Stochastic",
        "AccumulationDistribution"
    };
}

<ejs-stockchart
    id="stockChart"
    indicatorType="indicatorTypes"
    beforeIndicatorChange="onBeforeIndicatorChange"
    indicatorChanged="onIndicatorChanged">

    <e-stockchart-series-collection>
        <e-stockchart-series
            dataSource="ViewBag.StockData"
            type="Candle"
            xName="date"
            open="open"
            high="high"
            low="low"
            close="close"
            name="Price">
        </e-stockchart-series>
    </e-stockchart-series-collection>
</ejs-stockchart>

<script>
    function onBeforeIndicatorChange(args) {
        console.log("Indicator update requested:", args);

        // Set args.cancel to true to prevent the requested update.
        // args.cancel = true;
    }

    function onIndicatorChanged(args) {
        console.log("Indicator updated successfully:", args);
    }
</script>
```

**Event behavior:**

- `beforeIndicatorChange` runs before the toolbar indicator update.
- Set `args.cancel` to `true` to cancel the requested update.
- When canceled, the indicator is not added or removed.
- `indicatorChanged` runs only after the indicator update succeeds.
- These events apply to indicators added or removed through the Stock Chart toolbar.

## Indicator Customization

### Color and Line Style

Customize indicator appearance:

```cshtml
<e-stockchart-indicator 
    type="Ema" 
    field="Close" 
    period="14"
    fill="red"
    width="2">
</e-stockchart-indicator>
```

### Multiple Indicators

Combine multiple indicators for comprehensive analysis:

```cshtml
<e-stockchart-indicators>
    <!-- Trend indicator -->
    <e-stockchart-indicator 
        type="Ema" 
        field="Close" 
        period="20"
        fill="#ff0000">
    </e-stockchart-indicator>
    
    <!-- Momentum indicator -->
    <e-stockchart-indicator 
        type="Rsi" 
        field="Close" 
        period="14"
        overBought="70"
        overSold="30"
        fill="#0066ff">
    </e-stockchart-indicator>
    
    <!-- Volatility indicator -->
    <e-stockchart-indicator 
        type="BollingerBands" 
        field="Close" 
        period="20"
        standardDeviation="2"
        fill="#00cc00">
    </e-stockchart-indicator>
</e-stockchart-indicators>
```

### Period Adjustment

Different periods suit different timeframes:

```cshtml
<!-- Day trading (shorter periods) -->
<e-stockchart-indicator type="Ema" field="Close" period="5"></e-stockchart-indicator>

<!-- Swing trading (medium periods) -->
<e-stockchart-indicator type="Ema" field="Close" period="20"></e-stockchart-indicator>

<!-- Long-term investing (longer periods) -->
<e-stockchart-indicator type="Ema" field="Close" period="50"></e-stockchart-indicator>
```

## Common Indicator Strategies

### Trend Following
- Combine EMA 20 + EMA 50 for trend identification
- Price above both = uptrend
- Price below both = downtrend

### Momentum Confirmation
- Use RSI to confirm MACD signals
- RSI > 50 confirms uptrend momentum
- RSI < 50 confirms downtrend momentum

### Volatility Analysis
- ATR for stop-loss distance
- Bollinger Bands for breakout levels
- Combine for comprehensive risk management

### Volume Analysis
- Accumulation Distribution confirms price trends
- Rising indicator + rising price = strong uptrend
- Falling indicator + rising price = potential reversal
