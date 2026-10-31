# Export

## Table of Contents
- [Export Overview](#export-overview)
- [Excel Export — Basic](#excel-export--basic)
- [Excel Export — Custom Data Source](#excel-export--custom-data-source)
- [Export Multiple Gantt Charts in Excel](#export-multiple-gantt-charts-in-excel)
- [Customize the Excel export](#customize-the-excel-export)
- [CSV Export](#csv-export)
- [PDF Export — Basic](#pdf-export--basic)
- [PDF Export — Customize properties](#pdf-export--customize-properties)
- [Disable footer in PDF export](#disable-footer-in-pdf-export)
- [Export current view data](#export-current-view-data)
- [Export hidden columns in PDF](#export-hidden-columns-in-pdf)
- [Export predecessor lines in PDF](#export-predecessor-lines-in-pdf)
- [Show or hide columns during PDF export](#show-or-hide-columns-during-pdf-export)
- [PDF Export — Custom Headers and Footers](#pdf-export--custom-headers-and-footers)
- [PDF Conditional Cell Formatting](#pdf-conditional-cell-formatting)
- [PDF Timeline Cell Formatting](#pdf-timeline-cell-formatting)
- [PDF Taskbar Formatting](#pdf-taskbar-formatting)
- [PDF Split Taskbar Segment Colors](#pdf-split-taskbar-segment-colors)
- [PDF Customize Gantt Appearance with ganttStyle](#pdf-customize-gantt-appearance-with-ganttstyle)
- [PDF Export with Column Template](#pdf-export-with-column-template)
- [PDF Export with Taskbar Template](#pdf-export-with-taskbar-template)
- [PDF Export with Task Label Template](#pdf-export-with-task-label-template)
- [PDF Export with Header Template](#pdf-export-with-header-template)
- [Export Events](#export-events)

## Export Overview

| Feature | Module | Toolbar item |
|---|---|---|
| Excel export | `ExcelExport` | `'ExcelExport'` |
| CSV export | `ExcelExport` | `'CsvExport'` |
| PDF export | `PdfExport` | `'PdfExport'` |

All three require the `Toolbar` module when using toolbar buttons.

## Excel Export — Basic

```vue
<template>
  <ejs-gantt
    ref="ganttRef"
    :dataSource="data"
    :taskFields="taskFields"
    :toolbar="['ExcelExport', 'CsvExport']"
    :allowExcelExport="true"
    @toolbarClick="onToolbarClick"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { ref, provide } from 'vue';
import { GanttComponent as EjsGantt, Toolbar, ExcelExport } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Toolbar, ExcelExport]);

const ganttRef = ref(null);

function onToolbarClick(args) {
  if (args.item.id === 'GanttExport_excelexport') {
    ganttRef.value.ej2Instances.excelExport();
  } else if (args.item.id === 'GanttExport_csvexport') {
    ganttRef.value.ej2Instances.csvExport();
  }
}
</script>
```

> **Tip:** The default toolbar button IDs follow the pattern `{ganttId}_excelexport` and `{ganttId}_csvexport`. If you set `id="GanttExport"` on the component, the IDs become `GanttExport_excelexport`, etc.

### Export properties object

Pass `ExcelExportProperties` to `excelExport()` for customization:

```js
const excelProps = {
  fileName: 'ProjectPlan.xlsx',
  isCollapsedStatePersist: false,     // export expanded tree even if some rows are collapsed
};
ganttRef.value.ej2Instances.excelExport(excelProps);
```

## Excel Export — Custom Data Source

Export a different dataset than what is currently displayed:

```js
const excelProps = {
  dataSource: customDataArray,   // must match same schema as gantt dataSource
  fileName: 'CustomExport.xlsx'
};
ganttRef.value.ej2Instances.excelExport(excelProps);
```

## Export Multiple Gantt Charts in Excel

You can export multiple Gantt Chart instances into the same workbook using `multipleExport` in `ExcelExportProperties`.

### Same sheet (AppendToSheet)

Export both Gantt datasets into the same worksheet by setting `multipleExport.type` to `AppendToSheet`.

```js
const appendProps = {
  multipleExport: {
    type: 'AppendToSheet',
    blankRows: 2
  }
};

const first = gantt1Ref.value.ej2Instances;
const second = gantt2Ref.value.ej2Instances;

first.excelExport(appendProps, true).then((workbook) => {
  second.excelExport(appendProps, false, workbook);
});
```

> By default, `multipleExport.blankRows` is **5**.

### New sheet (NewSheet)

Export each Gantt Chart into a separate worksheet by setting `multipleExport.type` to `NewSheet`.

```js
const newSheetProps = {
  multipleExport: {
    type: 'NewSheet'
  }
};

const first = gantt1Ref.value.ej2Instances;
const second = gantt2Ref.value.ej2Instances;

first.excelExport(newSheetProps, true).then((workbook) => {
  second.excelExport(newSheetProps, false, workbook);
});
```

## Customize the Excel export

Use `ExcelExportProperties` and Excel-related events to tailor the exported workbook.

### Export hidden columns

Hidden TreeGrid columns can be exported by setting `includeHiddenColumn: true`.

```js
ganttRef.value.ej2Instances.excelExport({
  includeHiddenColumn: true
});
```

### Show or hide columns during export

Use `toolbarClick` to change `treeGrid.grid.columns[index].visible` before export, and `excelExportComplete` to revert the original visibility.

```vue
<ejs-gantt
  ref="ganttRef"
  :toolbar="['ExcelExport', 'CsvExport']"
  @toolbarClick="onToolbarClick"
  @excelExportComplete="onExcelExportComplete"
  :allowExcelExport="true"
></ejs-gantt>

<script setup>
function onToolbarClick(args) {
  if (args.item.id === 'GanttExport_excelexport') {
    const gantt = ganttRef.value.ej2Instances;
    gantt.treeGrid.grid.columns[0].visible = true;
    gantt.treeGrid.grid.columns[3].visible = false;
    gantt.excelExport();
  }
}

function onExcelExportComplete() {
  const gantt = ganttRef.value.ej2Instances;
  gantt.treeGrid.grid.columns[0].visible = false;
  gantt.treeGrid.grid.columns[3].visible = true;
}
</script>
```

### Cell formatting during export

Use `excelQueryCellInfo` to apply conditional formatting to exported Excel/CSV cells.

```vue
<ejs-gantt
  ref="ganttRef"
  :toolbar="['ExcelExport']"
  @toolbarClick="onToolbarClick"
  @excelQueryCellInfo="onExcelQueryCellInfo"
  :allowExcelExport="true"
></ejs-gantt>

<script setup>
function onToolbarClick(args) {
  if (args.item.id === 'GanttExport_excelexport') {
    ganttRef.value.ej2Instances.excelExport();
  }
}

function onExcelQueryCellInfo(args) {
  if (args.column.field === 'Progress') {
    if (args.value > 80) {
      args.style = { backColor: '#A569BD' };
    } else if (args.value < 20) {
      args.style = { backColor: '#F08080' };
    }
  }
}
</script>
```

### Theme

Apply a custom Excel theme using the `theme` property in `ExcelExportProperties`.

```js
ganttRef.value.ej2Instances.excelExport({
  theme: {
    header: { fontName: 'Segoe UI', fontColor: '#666666' },
    record: { fontName: 'Segoe UI', fontColor: '#666666' }
  }
});
```

### Add header and footer

Customize the exported workbook header/footer using the `header` and `footer` properties.

```js
ganttRef.value.ej2Instances.excelExport({
  header: {
    headerRows: 7,
    rows: [
      {
        cells: [
          {
            colSpan: 4,
            value: 'Northwind Traders',
            style: { fontColor: '#C67878', fontSize: 20, hAlign: 'Center', bold: true }
          }
        ]
      }
    ]
  },
  footer: {
    footerRows: 4,
    rows: [
      {
        cells: [
          {
            colSpan: 4,
            value: 'Thank you for your business!',
            style: { hAlign: 'Center', bold: true }
          }
        ]
      }
    ]
  }
});
```

## CSV Export

```js
ganttRef.value.ej2Instances.csvExport();

// With properties
ganttRef.value.ej2Instances.csvExport({ fileName: 'ProjectPlan.csv' });
```

## PDF Export — Basic

```vue
<template>
  <ejs-gantt
    ref="ganttRef"
    :dataSource="data"
    :taskFields="taskFields"
    :toolbar="['PdfExport']"
    :allowPdfExport="true"
    @toolbarClick="onToolbarClick"
    height="450px"
  ></ejs-gantt>
</template>

<script setup>
import { ref, provide } from 'vue';
import { GanttComponent as EjsGantt, Toolbar, PdfExport } from '@syncfusion/ej2-vue-gantt';
provide('gantt', [Toolbar, PdfExport]);

const ganttRef = ref(null);

function onToolbarClick(args) {
  if (args.item.id === 'GanttExport_pdfexport') {
    ganttRef.value.ej2Instances.pdfExport();
  }
}
</script>
```

## PDF Export — Customize properties

```js
const pdfProps = {
  fileName: 'ProjectPlan.pdf',
  orientation: 'Landscape', // 'Portrait' | 'Landscape'
  pageSize: 'A3',           // 'Letter' | 'A4' | 'A3' etc.
  fitToWidthSettings: {
    isFitToWidth: true // shrink columns to fit page width
  }
};
ganttRef.value.ej2Instances.pdfExport(pdfProps);
```

### Supported page sizes

The supported page sizes are:

* Letter
* Note
* Legal
* A0
* A1
* A2
* A3
* A5
* A6
* A7
* A8
* A9
* B0
* B1
* B2
* B3
* B4
* B5
* Archa
* Archb
* Archc
* Archd
* Arche
* Flsa
* HalfLetter
* Letter11x17
* Ledger

## Disable footer in PDF export

By default, the exported PDF includes a footer. Disable it by setting `enableFooter` to `false`:

```js
ganttRef.value.ej2Instances.pdfExport({
  enableFooter: false
});
```

## Export current view data

Export only what is currently visible by setting `exportType` to `CurrentViewData`:

```js
ganttRef.value.ej2Instances.pdfExport({
  exportType: 'CurrentViewData'
});
```

## Export hidden columns in PDF

Hidden TreeGrid columns can be exported by setting `includeHiddenColumn` to `true`:

```js
ganttRef.value.ej2Instances.pdfExport({
  includeHiddenColumn: true
});
```

## Export predecessor lines in PDF

Control the visibility of predecessor lines in the exported PDF using `showPredecessorLines`:

```js
ganttRef.value.ej2Instances.pdfExport({
  showPredecessorLines: true // or false
});
```

## Show or hide columns during PDF export

Use the `toolbarClick` event to toggle `treeGrid.grid.columns[index].visible` before export, and the `beforePdfExport` event to revert the original visibility.

```vue
<ejs-gantt
  ref="ganttRef"
  :toolbar="['PdfExport']"
  :allowPdfExport="true"
  @toolbarClick="onToolbarClick"
  @beforePdfExport="beforePdfExport"
  height="450px"
></ejs-gantt>

<script setup>
function onToolbarClick(args) {
  if (args.item.id === 'GanttExport_pdfexport') {
    const gantt = ganttRef.value.ej2Instances;

    // Example:
    // - show Duration column
    // - hide StartDate column
    gantt.treeGrid.grid.columns[3].visible = true;
    gantt.treeGrid.grid.columns[1].visible = false;

    gantt.pdfExport();
  }
}

function beforePdfExport() {
  const gantt = ganttRef.value.ej2Instances;
  // Revert to the original state
  gantt.treeGrid.grid.columns[1].visible = true;
  gantt.treeGrid.grid.columns[3].visible = false;
}
</script>
```

## PDF Export — Custom Headers and Footers

```js
const pdfProps = {
  header: {
    fromTop: 0,
    height: 150,
    contents: [
      {
        type: 'Text',
        value: 'Project Schedule',
        position: { x: 0, y: 50 },
        style: {
          textBrushColor: '#000000',
          fontSize: 18,
          bold: true
        }
      },
      {
        type: 'Line',
        style: { penColor: '#000080', penSize: 2, dashStyle: 'Solid' },
        points: { x1: 0, y1: 4, x2: 685, y2: 4 }
      },
      {
        type: 'Image',
        src: base64ImageString, // base64 encoded image
        position: { x: 40, y: 10 },
        size: { height: 100, width: 250 }
      }
    ]
  },
  footer: {
    fromBottom: 160,
    height: 150,
    contents: [
      {
        type: 'Text',
        value: 'Confidential — For internal use only',
        position: { x: 0, y: 50 },
        style: { textBrushColor: '#888888', fontSize: 10 }
      },
      {
        type: 'PageNumber',
        pageNumberType: 'UpperRoman',
        format: 'Page {$current} of {$total}',
        position: { x: 0, y: 25 },
        style: { textBrushColor: '#000000', fontSize: 10 }
      }
    ]
  }
};
ganttRef.value.ej2Instances.pdfExport(pdfProps);
```

**Text header/footer** supports:

* `type: 'Text'`
* `value` (the text)
* `position: { x, y }`
* `style` (for example `textBrushColor`, `fontSize`, and `bold`)

**Line header/footer** supports:

* `type: 'Line'`
* `style.penColor`, `style.penSize`, `style.dashStyle`
* `points: { x1, y1, x2, y2 }`

Supported line styles:

* dash
* dot
* dashdot
* dashdotdot
* solid

**Page number types**:

* LowerLatin - a, b, c,
* UpperLatin - A, B, C,
* LowerRoman - i, ii, iii,
* UpperRoman - I, II, III,
* Number - 1,2,3.

> PDF export supports **base64** strings for header/footer images.

## PDF Conditional Cell Formatting

Use `pdfQueryCellInfo` to format grid cells in the exported PDF based on cell value:

```vue
<ejs-gantt @pdfQueryCellInfo="onPdfQueryCellInfo" :allowPdfExport="true" ...></ejs-gantt>

<script setup>
import { PdfColor } from '@syncfusion/ej2-pdf-export';

function onPdfQueryCellInfo(args) {
  if (args.column.field === 'Progress') {
    if (args.value < 50) {
      args.style.backgroundColor = new PdfColor(240, 128, 128);  // light red
    } else {
      args.style.backgroundColor = new PdfColor(165, 105, 189);  // purple
    }
  }
}
</script>
```

## PDF Timeline Cell Formatting

Use `pdfQueryTimelineCellInfo` to customize timeline header cells in the exported PDF:

```vue
<ejs-gantt @pdfQueryTimelineCellInfo="onPdfTimelineCell" :allowPdfExport="true" ...></ejs-gantt>

<script setup>
import { PdfColor } from '@syncfusion/ej2-pdf-export';

function onPdfTimelineCell(args) {
  args.timelineCell.backgroundColor = new PdfColor(240, 248, 255);  // Alice Blue
}
</script>
```

## PDF Taskbar Formatting

Use `pdfQueryTaskbarInfo` to customize taskbar colors in the exported PDF:

```vue
<ejs-gantt @pdfQueryTaskbarInfo="onPdfTaskbar" :allowPdfExport="true" ...></ejs-gantt>

<script setup>
import { PdfColor } from '@syncfusion/ej2-pdf-export';

function onPdfTaskbar(args) {
  if (args.data.Progress < 50 && !args.data.hasChildRecords) {
    args.taskbar.progressColor = new PdfColor(205, 92, 92);
    args.taskbar.taskColor = new PdfColor(240, 128, 128);
    args.taskbar.taskBorderColor = new PdfColor(240, 128, 128);
  }
}
</script>
```

## PDF Split Taskbar Segment Colors

Customize individual segment colors of a split taskbar via `taskSegmentStyles` in `pdfQueryTaskbarInfo`:

```vue
<ejs-gantt @pdfQueryTaskbarInfo="onPdfTaskbar" :allowPdfExport="true" ...></ejs-gantt>

<script setup>
import { PdfColor } from '@syncfusion/ej2-pdf-export';

function onPdfTaskbar(args) {
  if (args.taskbar.taskSegmentStyles) {
    // Customize segment at index 1 (zero-based)
    args.taskbar.taskSegmentStyles[1].taskColor = new PdfColor(255, 0, 0);
    args.taskbar.taskSegmentStyles[1].progressColor = new PdfColor(0, 128, 0);
    args.taskbar.taskSegmentStyles[1].taskBorderColor = new PdfColor(0, 0, 0);
  }
}
</script>
```

> Map `taskFields.segments` to enable split task support.

## PDF Customize Gantt Appearance with ganttStyle

Use `ganttStyle` inside the PDF export properties to override the full visual appearance of the exported PDF:

```vue
<ejs-gantt ref="ganttRef" :allowPdfExport="true" :toolbar="['PdfExport']" @toolbarClick="onToolbarClick" ...></ejs-gantt>

<script setup>
import { ref } from 'vue';
import { PdfColor, PdfFontStyle, PdfPen } from '@syncfusion/ej2-pdf-export';

const ganttRef = ref(null);

function onToolbarClick(args) {
  if (args.item.id.includes('pdfexport')) {
    ganttRef.value.ej2Instances.pdfExport({
      ganttStyle: {
        fontFamily: 1,                                        // 0=Helvetica, 1=Courier, 2=TimesRoman, 3=Symbol
        columnHeader: { backgroundColor: new PdfColor(179, 219, 255) },
        cell: {
          backgroundColor: new PdfColor(240, 248, 255),
          fontColor: new PdfColor(0, 0, 0),
          borderColor: new PdfColor(179, 219, 255)
        },
        taskbar: {
          taskColor: new PdfColor(240, 128, 128),
          taskBorderColor: new PdfColor(240, 128, 128),
          progressColor: new PdfColor(205, 92, 92)
        },
        timeline: {
          backgroundColor: new PdfColor(179, 219, 255),
          fontStyle: PdfFontStyle.Bold
        },
        label: { fontColor: new PdfColor(128, 0, 0) },
        connectorLineColor: new PdfColor(128, 0, 0),
        footer: { backgroundColor: new PdfColor(205, 92, 92) },
        eventMarker: {
          label: {
            backgroundColor: new PdfColor(255, 239, 213),
            fontColor: new PdfColor(139, 69, 19),
            fontSize: 9,
            fontStyle: PdfFontStyle.Bold,
            borderColor: new PdfColor(160, 82, 45)
          },
          lineStyle: new PdfPen(new PdfColor(105, 105, 105), 1)
        },
        holiday: {
          fontSize: 10,
          fontStyle: PdfFontStyle.Bold,
          backgroundColor: new PdfColor(255, 248, 220),
          fontColor: new PdfColor(105, 105, 105),
          borderColor: new PdfColor(211, 211, 211)
        }
      }
    });
  }
}
</script>
```

**Customizable elements:** `columnHeader`, `fontFamily`, `cell`, `taskbar`, `label`, `timeline`, `chartGridLineColor`, `connectorLineColor`, `criticalConnectorLineColor`, `footer`, `font`, `eventMarker`, `holiday`

## PDF Export with Column Template

Export grid columns containing images or hyperlinks using `pdfQueryCellInfo`:

```vue
<ejs-gantt @pdfQueryCellInfo="onPdfQueryCellInfo" :allowPdfExport="true" ...></ejs-gantt>

<script setup>
function onPdfQueryCellInfo(args) {
  if (args.column.headerText === 'Resources') {
    // Export base64 image in place of the Vue template
    args.image = {
      height: 40, width: 40,
      base64: args.data.taskData.ResourcesImage   // must be base64 string
    };
  }
  if (args.column.headerText === 'Email ID') {
    // Export hyperlink
    args.hyperLink = {
      target: 'mailto:' + args.data.taskData.EmailID,
      displayText: args.data.taskData.EmailID
    };
  }
}
</script>
```

> PDF Export only supports **base64** strings for images — not URL references.

## PDF Export with Taskbar Template

Export custom taskbar templates (including images and text) using `pdfQueryTaskbarInfo`:

```vue
<ejs-gantt
  :taskbarTemplate="'taskbarTemplate'"
  :parentTaskbarTemplate="'parentTaskbarTemplate'"
  :milestoneTemplate="'milestoneTemplate'"
  @pdfQueryTaskbarInfo="onPdfTaskbarInfo"
  :allowPdfExport="true"
  ...
></ejs-gantt>

<script setup>
function onPdfTaskbarInfo(args) {
  // Regular tasks
  if (!args.data.hasChildRecords && args.data.ganttProperties.duration !== 0) {
    if (args.data.ganttProperties.resourceNames) {
      args.taskbarTemplate.image = [{
        width: 20, height: 20,
        base64: args.data.taskData.ResourcesImage
      }];
    }
    args.taskbarTemplate.value = args.data.TaskName;
  }
  // Parent tasks
  if (args.data.hasChildRecords) {
    args.taskbarTemplate.value = args.data.TaskName;
  }
  // Milestones (duration === 0)
  if (args.data.ganttProperties.duration === 0) {
    args.taskbarTemplate.value = args.data.TaskName;
  }
}
</script>
```

## PDF Export with Task Label Template

Export `labelSettings` templates via `pdfQueryTaskbarInfo`:

```vue
<ejs-gantt
  :labelSettings="{ leftLabel: 'leftLabelTemplate', rightLabel: 'rightLabelTemplate' }"
  @pdfQueryTaskbarInfo="onPdfTaskbarInfo"
  :allowPdfExport="true"
  ...
></ejs-gantt>

<script setup>
function onPdfTaskbarInfo(args) {
  args.labelSettings.leftLabel.value =
    args.data.ganttProperties.taskName + ' [' + args.data.ganttProperties.progress + ']';

  if (args.data.ganttProperties.resourceNames) {
    args.labelSettings.rightLabel.value = args.data.ganttProperties.resourceNames;
    args.labelSettings.rightLabel.image = [{
      base64: args.data.taskData.ResourcesImage,
      width: 20, height: 20
    }];
  }
  args.labelSettings.taskLabel.value = args.data.ganttProperties.progress + '%';
}
</script>
```

## PDF Export with Header Template

Export column header templates using `pdfColumnHeaderQueryCellInfo`:

```vue
<ejs-gantt @pdfColumnHeaderQueryCellInfo="onPdfHeader" :allowPdfExport="true" ...></ejs-gantt>

<script setup>
function onPdfHeader(args) {
  const imageMap = {
    'TaskName':  'data:image/png;base64,...',
    'StartDate': 'data:image/png;base64,...'
  };
  const base64 = imageMap[args.column.field];
  if (base64) {
    args.headerTemplate.image = [{ base64, width: 20, height: 20 }];
    args.headerTemplate.value = args.column.field;
  }
}
</script>
```

## Export Events

| Event | When fired | Key args |
|---|---|---|
| `beforeExcelExport` | Before Excel/CSV export starts | `args.cancel = true` to abort |
| `excelExportComplete` | After Excel/CSV export finishes | workbook data |
| `excelQueryCellInfo` | For each cell during Excel export | modify cell value/style |
| `beforePdfExport` | Before PDF export starts | `args.cancel = true` to abort |
| `pdfExportComplete` | After PDF export finishes | — |
| `pdfQueryCellInfo` | For each grid cell during PDF export | modify cell content/style via `args.style` |
| `pdfQueryTimelineCellInfo` | For each timeline header cell during PDF export | modify `args.timelineCell.backgroundColor` |
| `pdfQueryTaskbarInfo` | For each taskbar during PDF export | modify taskbar colors and templates |
| `pdfColumnHeaderQueryCellInfo` | For each column header during PDF export | modify header template image/text |
