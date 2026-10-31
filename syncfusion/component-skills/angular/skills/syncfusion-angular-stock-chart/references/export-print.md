# Export and Print

Learn how to export stock charts and print them for reports, analysis, or sharing.

## Table of Contents
- [Export Formats](#export-formats)
- [PNG Export](#png-export)
- [SVG Export](#svg-export)
- [Advantages of SVG](#advantages-of-svg)
- [PDF Export](#pdf-export)
- [Print](#print)
- [User Experience](#user-experience)
- [Enabling Export & Print](#enabling-export--print)
- [Disabling Export and Print](#disabling-export-and-print)
- [Troubleshooting](#troubleshooting)

Learn how to export stock charts and print them for reports, analysis, or sharing.

## Export Formats

Stock Chart supports multiple export formats through the built‑in toolbar:
    - **PNG:** Raster image, good for web and email
    - **JPEG:** Raster image
    - **SVG:** Scalable vector, good for web and editing
    - **PDF:** Professional documents, best for reports
    - **Print:** Direct printing to paper

These export and print options appear automatically in the stock chart’s period‑selector toolbar.

## PNG Export

PNG export is available directly from the toolbar.

**How to Export PNG:**
    1. Click the **Export** dropdown in the chart toolbar.
    2. Select **PNG**.
    3. The chart will download as a PNG image.

## SVG Export

SVG export is useful for scalable, editable graphics.

**How to Export SVG:**
    1. Open the **Export** dropdown.
    2. Choose **SVG**.
    3. The chart downloads as a vector image.

**Advantages of SVG:**
    - Scalable without quality loss
    - Smaller file size for simple visuals
    - Editable in Illustrator, Figma, Inkscape
    - Ideal for web embedding

## PDF Export

 PDF export allows you to include charts in reports.

**How to Export PDF:**
    1. Open the **Export** dropdown.
    2. Select **PDF**.
    3. The chart downloads as a PDF document.

## Print

    The Stock Chart includes a built‑in **Print** button.

**How to Print:**
    1. Click the **Print** icon in the toolbar.
    2. The browser’s print dialog opens.
    3. Choose printer or “Save as PDF”.
    4. Print or export the chart.

**User Experience:**
    1. Click "Print"
    2. Browser print dialog appears
    3. Adjust print settings if needed
    4. Print or save the output

## Enabling Export & Print

To enable toolbar export and print, the `Export` module must be injected along with other StockChart modules.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ChartAllModule, StockChartAllModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [ChartAllModule, StockChartAllModule],
    standalone: true,
    selector: 'app-stock',
    template: `<ejs-stockchart id="chart-container" [primaryXAxis]='primaryXAxis' [title]='title'>
        <e-stockchart-series-collection>
            <e-stockchart-series [dataSource]='chartData' type='Candle' xName='date' yName='open' name='India' width=2 ></e-stockchart-series>
        </e-stockchart-series-collection>
    </ejs-stockchart>`
})
export class AppComponent implements OnInit {
    public primaryXAxis?: Object;
    public chartData?: Object[];
    public title?: string;
    public crosshair?: Object;
    ngOnInit(): void {
        this.chartData = [
        { x: new Date(2023, 0, 1), open: 100, high: 105, low: 95, close: 102 },
        { x: new Date(2023, 0, 2), open: 102, high: 108, low: 100, close: 105 },
        { x: new Date(2023, 0, 3), open: 105, high: 110, low: 103, close: 108 }
    ];
        this.title = 'Efficiency of oil-fired power production';
        this.primaryXAxis = {
           valueType: 'DateTime'
        };
    }
}
```
## Disabling Export and Print

To hide the export dropdown in the toolbar:

    <ejs-stockchart [exportType]="[]"></ejs-stockchart>

Setting `exportType` to an empty list disables all export options.

## Troubleshooting

**Issue: Export button does nothing**
- Ensure the chart is fully rendered
- Make sure the Export module is included in your module imports

**Issue: Exported image is blank**
    - Verify that chart data has finished loading
    - Ensure the element is visible when exporting

**Issue: PDF export creates empty file**
    - Ensure the chart rendered successfully before exporting

**Issue: Print dialog doesn't open**
    - Browser may require a direct user interaction
    - Click on the chart or toolbar first, then press Print
