````markdown
# Virtual Scrolling

## Overview

Virtual scrolling enables efficient handling of large datasets by rendering only the rows and columns visible in the current viewport. Enable it with the `enableVirtualization` property (set to `true`) on the PivotView. This reduces memory use and improves responsiveness for large reports.

## Quick Enable

```typescript
<ejs-pivotview
  [dataSourceSettings]="dataSourceSettings"
  [enableVirtualization]="true"
  height="350">
</ejs-pivotview>
```

## Single Page Mode

To minimize additional rendering overhead, enable single-page mode so only the current view page is rendered:

```typescript
virtualScrollSettings = { allowSinglePage: true };
<ejs-pivotview [virtualScrollSettings]="virtualScrollSettings" [enableVirtualization]="true"></ejs-pivotview>
```

## Limitations & Recommendations

- Use pixel-based `columnWidth` values (percentages are not supported with virtualization).
- Avoid features that change row/column sizing at runtime (auto-fit, column resizing, text wrapping) when virtualization is enabled.
- Pre-process grouping and date transformations on the server or before supplying data to the component to reduce client-side work.
- With very large viewports, adjacent-page rendering increases data processed; use single-page mode when appropriate.

## Static Field List

When using a stand-alone `PivotFieldList` (rendered as `Fixed`), keep it in sync with the `PivotView` so virtualization renders consistent fields and report state. The recommended pattern is:

- Bind both components to the same `dataSourceSettings` object where possible.
- Use the `PivotView`'s `(enginePopulated)` event to pass the processed report to the `PivotFieldList` via its `update` method.
- Use the `PivotFieldList`'s `(enginePopulated)` event to send user-made changes back to the `PivotView` using `updateView`.

Example (HTML):

```html
<ejs-pivotfieldlist #pivotfieldlist id='PivotFieldList' [dataSourceSettings]=dataSourceSettings renderMode="Fixed" (enginePopulated)='afterPopulate($event)' allowCalculatedField='true' (load)='onLoad()'></ejs-pivotfieldlist>
  <ejs-pivotview #pivotview id='PivotViewFieldList' width='99%' height='530' enableVirtualization='true '(enginePopulated)='afterEnginePopulate($event)'></ejs-pivotview>
```

Example (TypeScript):

```typescript
   @ViewChild('pivotview', {static: false})
    public pivotObj?: PivotViewComponent;

    @ViewChild('pivotfieldlist')
    public fieldListObj?: PivotFieldListComponent;

    afterPopulate(arge: EnginePopulatedEventArgs): void {
      if (this.fieldListObj && this.pivotObj) {
          this.fieldListObj.updateView(this.pivotObj);
      }
    }
    afterEnginePopulate(args: EnginePopulatedEventArgs): void {
      if (this.fieldListObj && this.pivotObj) {
          this.fieldListObj.update(this.pivotObj);
      }
    }
    onLoad(): void {
      if (Browser.isDevice) {
        (this.fieldListObj as PivotFieldListComponent).renderMode = 'Popup';
          (this.fieldListObj as PivotFieldListComponent).target = '.control-section';
          (document.getElementById('PivotFieldList') as HTMLElement).removeAttribute('style');
          setStyleAttribute(document.getElementById('PivotFieldList') as HTMLElement, {
              'height': 0,
              'float': 'left'
          });
      }
      (this.fieldListObj as PivotFieldListComponent).pivotGridModule = this.pivotObj as PivotViewComponent;
      //Assigning report to pivot table component
      (this.pivotObj as PivotViewComponent).dataSourceSettings = (this.fieldListObj as PivotFieldListComponent).dataSourceSettings;
      //Generating page settings based on pivot table component’s size.
      (this.pivotObj as PivotViewComponent).updatePageSettings(true);
      //Assigning page settings to field list component.
      (this.fieldListObj as PivotFieldListComponent).pageSettings = (this.pivotObj as PivotViewComponent).pageSettings;
    }

```

This keeps the Field List and PivotView synchronized while `enableVirtualization` is active and avoids mismatched UI state when only part of the dataset is rendered.


## Summary

Virtual scrolling is the primary optimization for large client-side views. For multi-million-row scenarios prefer server-side processing (server-side pivot engine) or paging.

````
