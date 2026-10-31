# State Persistence in Pivot Table

## Table of Contents
- [Overview](#overview)
- [Enable State Persistence](#enable-state-persistence)
- [Automatic Persistence](#automatic-persistence)
- [Save and Load Pivot Layout](#save-and-load-pivot-layout)
- [loadPersistData() Method](#loadpersistdata-method)
- [Use Cases](#use-cases)

## Overview

State persistence automatically saves the pivot table configuration to browser **local storage**, allowing users to retain their field arrangements, sorting, filters, and expand/collapse states. When users return to the page, the pivot table restores their previous configuration automatically.

## Enable State Persistence

Use the `enablePersistence` property to automatically save and restore state:

```html
<ejs-pivotview id="pivotview" height="300" enablePersistence="true" showGroupingBar="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Automatic Persistence

When `enablePersistence="true"` is set, the following states are saved automatically:
- **Field Arrangement** - Rows, Columns, Values, Filters configuration
- **Sorting** - Sort order applied to fields
- **Filters** - Selected member values from filters
- **Expand/Collapse** - Expanded or collapsed row/column states
- **Custom Aggregations** - Aggregation type changes by users

State is saved automatically whenever these operations are performed, and restored when the page reloads or user returns.

## Save and Load Pivot Layout

Beyond automatic persistence, you can manually save and restore the pivot table state using `getPersistData()` and `loadPersistData()` methods for custom workflows.

### Get Persist Data

Use `getPersistData()` to retrieve the current state as a JSON string:

```html
<button id="save" class="e-btn e-primary">Save Layout</button>
<button id="load" class="e-btn e-primary">Load Layout</button>

<ejs-pivotview id="PivotView" height="300" showGroupingBar="true" showFieldList="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource" expandAll="false">
        <e-formatsettings>
            <e-field name="Amount" format="C0" maximumSignificantDigits="10" minimumSignificantDigits="1" 
                useGrouping="true"></e-field>
        </e-formatsettings>
        <e-rows>
            <e-field name="Country"></e-field>
            <e-field name="Products"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Year" caption="Year"></e-field>
            <e-field name="Quarter"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sold" caption="Units Sold"></e-field>
            <e-field name="Amount" caption="Sold Amount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>

<script>
    var pivotObj;
    var pivotLayout;
    
    // Save current state
    document.getElementById('save').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotLayout = pivotObj.getPersistData();
        console.log('State saved:', pivotLayout);
    }
    
    // Restore saved state
    document.getElementById('load').onclick = function () {
        pivotObj = document.getElementById('PivotView').ej2_instances[0];
        pivotObj.loadPersistData(pivotLayout);
        console.log('State restored');
    }
</script>
```

## loadPersistData() Method

Restore state from JSON string:

**Method Signature:**
```javascript
pivotObj.loadPersistData(persistedData);
```

**Parameters:**
- `persistedData` (string): JSON string from `getPersistData()` or localStorage

### Load from LocalStorage

```javascript
function loadSavedState() {
    var pivotObj = document.getElementById('PivotView').ej2_instances[0];
    var savedState = localStorage.getItem('pivot-state');
    
    if (savedState) {
        pivotObj.loadPersistData(savedState);
    }
}

// Load state on page load
document.addEventListener('DOMContentLoaded', function() {
    loadSavedState();
});
```

### Load from Query Parameter

```javascript
window.addEventListener('DOMContentLoaded', function() {
    var urlParams = new URLSearchParams(window.location.search);
    var state = urlParams.get('state');
    
    if (state) {
        // Wait for pivot table to render first
        setTimeout(() => {
            var pivotObj = document.getElementById('PivotView').ej2_instances[0];
            pivotObj.loadPersistData(state);
        }, 1000);
    }
});
```

## Important Notes

- **enablePersistence** requires valid state (test before deployment)
- **LocalStorage limit** = ~5-10MB per domain
- **Database approach** scales better for multiple users
- **User-specific states** must include userId for server storage
- Works with **all config changes** including calculated fields
