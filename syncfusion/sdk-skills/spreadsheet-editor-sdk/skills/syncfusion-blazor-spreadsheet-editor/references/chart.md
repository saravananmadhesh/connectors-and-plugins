## Chart
> Insert, configure, and delete charts in the active worksheet to visualize cell data as column, bar, line, area, pie, doughnut, and scatter representations. Charts can be created through the UI (Ribbon) or programmatically via the `InsertChartAsync` / `DeleteChartAsync` APIs.

### PROPERTY
```csharp
AllowChart="true(Default)/false"
```

### BUTTON
<!-- Refer the below button for creating button and update the API public method calling. -->
<button @onclick="#MethodName">#Button Name</button>

### API METHODS
```csharp
// Inserts a chart into the active worksheet using the supplied chart settings (type, range, theme, id).
await SpreadsheetRef.InsertChartAsync(ChartModel CHART);

// Deletes the chart identified by the supplied chart ID from the active worksheet.
await SpreadsheetRef.DeleteChartAsync(string CHARTID);
```

### Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `#MethodName` | Name of the method calling when clicking the button | - |
| `#Button Name` | Provide a meaningful name to button which binds to API method | - |
| `CHART` | A `ChartModel` object that defines the chart to insert (ChartType, Range, Id, Theme, IsSeriesInRows) | `new ChartModel { Id = "SalesChart", ChartType = "Column", Range = "A1:B10", Theme = "Material", IsSeriesInRows = false }` |
| `CHARTID` | The unique identifier of the chart to delete. Must match the `Id` assigned when the chart was created. | `"SalesChart"` |

### Supported Chart Types

The `ChartModel.ChartType` property accepts the following string values (case-insensitive):

| Chart Type | Description |
|---|---|
| `Column` | Vertical clustered column chart (default) |
| `StackedColumn` | Vertical stacked column chart |
| `100StackedColumn` | Vertical 100% stacked column chart |
| `Bar` | Horizontal clustered bar chart |
| `StackedBar` | Horizontal stacked bar chart |
| `100StackedBar` | Horizontal 100% stacked bar chart |
| `Line` | Line chart |
| `StackedLine` | Stacked line chart |
| `100StackedLine` | 100% stacked line chart |
| `LineWithMarkers` | Line chart with point markers |
| `StackedLineWithMarkers` | Stacked line chart with point markers |
| `100StackedLineWithMarkers` | 100% stacked line chart with point markers |
| `Area` | Area chart |
| `StackedArea` | Stacked area chart |
| `100StackedArea` | 100% stacked area chart |
| `Pie` | Pie chart |
| `Doughnut` | Doughnut chart |
| `Scatter` | Scatter chart with markers |

If an unrecognized chart type is supplied, the chart defaults to `Column`.

### ChartModel Properties

| Property | Type | Description | Default |
|---|---|---|---|
| `Id` | `string` | Unique identifier for the chart; required for later deletion/lookup. | `null` |
| `ChartType` | `string` | Type of chart (see Supported Chart Types table). | `null` |
| `Range` | `string` | A **single contiguous A1 range** (e.g., `"A1:B10"`) that supplies the chart data. A **single cell** (e.g., `"A1"`) is also accepted. **Discontinuous / multi-range syntax (e.g., `"A1:A9,C1:C9"`) is not supported.** If omitted, the current selection is used. | `null` |
| `Theme` | `string` | Visual theme applied to the chart (for example `Material`, `Office`, `Bootstrap`). | `Material` |
| `IsSeriesInRows` | `bool` | When `true`, each row represents a separate data series; otherwise each column represents a series. | `false` |

### UI-only Operations

These chart operations are available only through the user interface. There are no public APIs, events, or programmatic customization points.

**Summary**
Move, resize, change chart type, switch row/column orientation, edit chart title, change theme, switch legend position, toggle data labels, toggle gridlines, toggle axis visibility, edit axis titles, and clipboard cut/copy/paste of charts are UI-only actions. No public API or event is provided to trigger, intercept, or automate these operations.

**How to Perform**

- **Insert Chart:** Open the **Insert** tab in the Ribbon toolbar and choose a chart type from the **Charts** group.
- **Select Chart:** Click the chart once to select it; click again to enter edit mode.
- **Move / Resize:** Drag the chart body to reposition; drag the corner/edge handles to resize.
- **Change Chart Type / Orientation / Theme / Legend / Data Labels / Gridlines / Axes:** Use the **Chart Design** contextual tab that appears when the chart is selected.
- **Delete Chart:** Select the chart and press **Delete**, or use the **Delete** option from the chart's right-click context menu.
- **Cut / Copy / Paste Chart:** Use the cut/copy/paste options from the chart's right-click context menu or the standard keyboard shortcuts after the chart is selected.

**Limitations**

- No public API or event to trigger, intercept, or customize these actions.
- Cannot be automated or performed programmatically outside of `InsertChartAsync` and `DeleteChartAsync`.
- These actions may be disabled when chart functionality is disabled (`AllowChart="false"`).

### Related Properties that Control Chart Options

| Property | Default | Effect when set to "false" |
|---|---|---|
| `AllowChart` | true | Disables inserting and deleting charts through the UI and API. |

### When Chart Insertion is Disabled

When `AllowChart` is set to **false**, the following features become unavailable through the UI and API:

- Inserting new charts (Ribbon chart-type options are disabled)
- Deleting existing charts (delete key and context menu are disabled)
- Selecting, moving, or resizing existing charts
- Cut/copy/paste of charts

**Note:** Existing charts in a loaded workbook remain visible when `AllowChart` is `false`, but cannot be selected or modified.

### Sheet Protection Impact on Chart Operations

When a sheet is protected:
- `InsertChartAsync` and `DeleteChartAsync` may be blocked depending on the protection settings of the active sheet.
- UI-driven insert and delete actions are similarly restricted.

When a workbook is protected:
- API calls for inserting or deleting charts may be silently ignored depending on workbook-level protection.

### Notes
- **AllowChart** is enabled by default; include `AllowChart="false"` only when you want to disable chart operations.
- When using the API methods `InsertChartAsync`, `DeleteChartAsync`, ensure the `SfSpreadsheet` component includes `ID="spreadsheet"` so the APIs can target the correct instance.
- If `ChartModel.Range` is omitted, the chart uses the currently selected range in the active worksheet.
- `InsertChartAsync` is a no-op (returns without throwing) when `AllowChart` is `false`, when `ChartType` is null/empty, or when the supplied range is invalid or outside worksheet boundaries.
- `DeleteChartAsync` is a no-op when `chartId` is null/empty, when `AllowChart` is `false`, or when the chart with the supplied id does not exist.
- **Important:** API methods should **NOT** be called inside `OnInitialized` or `OnParametersSet` lifecycle methods. Even if you call them, they will not work properly. Call API methods in response to user interactions (like button clicks) or in other appropriate lifecycle methods after the component is fully rendered.

### Documentation link
[Blazor Spreadsheet Chart](https://help.syncfusion.com/document-processing/excel/spreadsheet/blazor/charts-and-visualization/overview)
