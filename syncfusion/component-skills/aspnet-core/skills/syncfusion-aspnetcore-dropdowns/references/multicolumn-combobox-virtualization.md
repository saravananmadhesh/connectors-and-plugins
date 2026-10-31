# Virtual Scrolling — MultiColumn ComboBox

## Table of Contents
- [Enable Virtualization](#enable-virtualization)
- [Performance Optimization](#performance-optimization)
- [Virtual Scroll Configuration](#virtual-scroll-configuration)
- [Server-Side Virtualization](#server-side-virtualization)
- [Memory Management](#memory-management)
- [Benchmarking](#benchmarking)

---

## Enable Virtualization

### Basic Virtual Scrolling

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.largeDataSet"
    enableVirtualization="true"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Email" header="Email" width="180px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

**When to use virtualization:**
- Large datasets (1,000+ rows)
- Limited viewport height
- Memory-constrained environments
- Real-time data updates

### Without Virtualization (NOT Recommended for Large Data)

```cshtml
<!-- ❌ BAD: Will load all 10,000+ rows -->
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.largeDataSet"
    enableVirtualization="false"
    popupHeight="300px">
    <!-- ... columns ... -->
</ejs-multicolumncombobox>
```

---

## Performance Optimization

### Item Height Configuration

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    enableVirtualization="true"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<style>
/* Set exact height for rows to match itemHeight */
.e-grid .e-gridcontent .e-row {
    height: 40px;
}

.e-grid .e-gridcontent .e-rowcell {
    padding: 8px;
    display: flex;
    align-items: center;
}
</style>
```

**Important:** `itemHeight` must match CSS row height for proper virtualization.

### Lazy Data Loading

```csharp
[HttpGet("employees/lazy")]
public IActionResult GetEmployeesLazy(int startIndex = 0, int pageSize = 50)
{
    var employees = GetAllEmployees()
        .Skip(startIndex)
        .Take(pageSize)
        .ToList();
    
    return Json(new {
        result = employees,
        count = GetTotalEmployeeCount()
    });
}
```

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.initialData"
    enableVirtualization="true"
    popupHeight="300px"
    virtualScrollSettings-itemHeight="40"
    actionComplete="onLazyLoad">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
let currentIndex = 50;
const pageSize = 50;

function onLazyLoad(args) {
    if (args.requestType === 'virtualScroll') {
        let lastVisibleIndex = args.endIndex;
        let totalRecords = args.count;
        
        // Load more when approaching end
        if (lastVisibleIndex > currentIndex - 20) {
            loadMoreData();
        }
    }
}

function loadMoreData() {
    fetch(`/api/employees/lazy?startIndex=${currentIndex}&pageSize=${pageSize}`)
        .then(response => response.json())
        .then(data => {
            let combo = document.getElementById('combo').ej2_instances[0];
            
            // Append new data
            combo.dataSource = [...combo.dataSource, ...data.result];
            combo.refresh();
            
            currentIndex += pageSize;
        });
}
</script>
```

---

## Virtual Scroll Configuration

### Adjust Virtual Scroll Buffer

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.largeDataSet"
    enableVirtualization="true"
    popupHeight="400px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>
```

**Buffer Height:** 
- Smaller = faster scrolling but more flickering
- Larger = smoother but uses more memory
- Recommended: 2-3x the visible height

### Dynamic Height Adjustment

```javascript
let combo = document.getElementById('combo').ej2_instances[0];

function adjustVirtualSettings(viewportHeight) {
    const itemHeight = 38;
    const visibleItems = Math.ceil(viewportHeight / itemHeight);
    const bufferHeight = visibleItems * itemHeight * 3;
    
    combo.virtualScrollSettings = {
        itemHeight: itemHeight,
        bufferHeight: bufferHeight
    };
    
    combo.refresh();
}

// Adjust on window resize
window.addEventListener('resize', () => {
    let comboHeight = document.getElementById('combo').offsetHeight;
    adjustVirtualSettings(comboHeight);
});
```

---

## Server-Side Virtualization

### Load Data on Demand

```csharp
[HttpPost("search-virtual")]
public IActionResult SearchVirtual([FromBody] VirtualScrollRequest request)
{
    int skip = request.Skip ?? 0;
    int take = request.Take ?? 50;
    
    var query = GetAllEmployees().AsEnumerable();
    
    // Apply filtering if needed
    if (!string.IsNullOrEmpty(request.SearchText))
    {
        query = query.Where(e => 
            e.EmployeeName.Contains(request.SearchText, StringComparison.OrdinalIgnoreCase));
    }
    
    var totalCount = query.Count();
    var result = query.Skip(skip).Take(take).ToList();
    
    return Json(new {
        result = result,
        count = totalCount
    });
}

public class VirtualScrollRequest
{
    public int? Skip { get; set; }
    public int? Take { get; set; }
    public string SearchText { get; set; }
}
```

```cshtml
<ejs-multicolumncombobox id="combo"
    allowFiltering="true"
    filtering="onServerFiltering"
    enableVirtualization="true"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onServerFiltering(args) {
    let searchText = args.text;
    
    fetch('/api/employees/search-virtual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            searchText: searchText,
            skip: 0,
            take: 50
        })
    })
    .then(response => response.json())
    .then(data => {
        let combo = document.getElementById('combo').ej2_instances[0];
        combo.dataSource = data.result;
        combo.refresh();
    });
}
</script>
```

---

## Memory Management

### Dispose Large Datasets

```javascript
function clearLargeDataSet() {
    let combo = document.getElementById('combo').ej2_instances[0];
    
    // Clear data
    combo.dataSource = [];
    combo.refresh();
    
    // Destroy component if needed
    combo.destroy();
    
    // Clear references
    combo = null;
}
```

### Monitor Memory Usage

```javascript
function getComboMemoryStats() {
    let combo = document.getElementById('combo').ej2_instances[0];
    
    if (performance.memory) {
        console.log('Memory Stats:', {
            usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
            totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
            jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
        });
    }
    
    console.log('Combo Data Count:', combo.dataSource?.length || 0);
}

// Call periodically
setInterval(getComboMemoryStats, 5000);
```

---

## Benchmarking

### Performance Comparison

```javascript
// Without virtualization (NOT recommended)
async function benchmarkWithoutVirtualization() {
    let start = performance.now();
    
    // Create combo without virtualization
    let combo1 = document.getElementById('combo1').ej2_instances[0];
    combo1.enableVirtualization = false;
    combo1.dataSource = largeDataSet;  // 10,000+ items
    combo1.refresh();
    
    let end = performance.now();
    console.log(`Without virtualization: ${(end - start).toFixed(2)}ms`);
}

// With virtualization (RECOMMENDED)
async function benchmarkWithVirtualization() {
    let start = performance.now();
    
    // Create combo with virtualization
    let combo2 = document.getElementById('combo2').ej2_instances[0];
    combo2.enableVirtualization = true;
    combo2.dataSource = largeDataSet;  // 10,000+ items
    combo2.refresh();
    
    let end = performance.now();
    console.log(`With virtualization: ${(end - start).toFixed(2)}ms`);
}

// Results typically show:
// Without: ~3000-5000ms (laggy scrolling)
// With: ~100-200ms (smooth scrolling)
```

### Load Time Measurement

```javascript
function measureScrollPerformance() {
    let combo = document.getElementById('combo').ej2_instances[0];
    let scrollCount = 0;
    let scrollTimes = [];
    
    let gridElement = combo.gridSettings.gridInstance.element;
    
    gridElement.addEventListener('scroll', () => {
        let scrollStart = performance.now();
        
        requestAnimationFrame(() => {
            let scrollEnd = performance.now();
            scrollTimes.push(scrollEnd - scrollStart);
            scrollCount++;
            
            if (scrollCount % 10 === 0) {
                let avgTime = scrollTimes.reduce((a, b) => a + b) / scrollTimes.length;
                console.log(`Average scroll time: ${avgTime.toFixed(2)}ms (${scrollCount} scrolls)`);
                
                if (avgTime > 16.67) {  // 60 FPS threshold
                    console.warn('Performance degradation detected!');
                }
            }
        });
    });
}
```

### Memory Leak Detection

```javascript
function detectMemoryLeaks() {
    let initialMemory = performance.memory?.usedJSHeapSize || 0;
    let iterations = 100;
    
    async function repeatScroll() {
        for (let i = 0; i < iterations; i++) {
            // Simulate scrolling
            let combo = document.getElementById('combo').ej2_instances[0];
            combo.refresh();
            
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        
        let finalMemory = performance.memory?.usedJSHeapSize || 0;
        let memoryIncrease = (finalMemory - initialMemory) / 1048576;
        
        console.log(`Memory increase after ${iterations} refreshes: ${memoryIncrease.toFixed(2)} MB`);
        
        if (memoryIncrease > 50) {
            console.warn('Possible memory leak detected!');
        }
    }
    
    repeatScroll();
}
```

### Best Practices Summary

| Practice | Impact | Notes |
|----------|--------|-------|
| Enable virtualization for 1000+ items | High | Essential for large datasets |
| Match itemHeight with CSS | High | Critical for scroll accuracy |
| Use lazy loading for remote data | High | Reduces initial load time |
| Set appropriate bufferHeight | Medium | Balance between smoothness and memory |
| Clear data when component destroyed | Medium | Prevents memory leaks |
| Monitor memory usage in production | Low | Good practice for monitoring |
