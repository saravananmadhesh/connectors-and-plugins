# Loading Animation

## Table of Contents
- [When to Use](#when-to-use)
- [Mandatory Rules](#mandatory-rules)
- [Default Spinner Indicator](#default-spinner-indicator)
- [Shimmer Indicator](#shimmer-indicator)
- [Indicator Comparison](#indicator-comparison)

## When to Use

Use loading indicators when you need to:
- **Show initial load** - Indicate data is loading from server
- **Spinner animation** - Default rotating loading indicator
- **Shimmer effect** - Skeleton placeholder during data fetch
- **Refresh feedback** - Visual feedback during sort/filter
- **Async data** - Delay while DataManager fetches data
- **Large datasets** - Signal that heavy processing is happening
- **Remote API calls** - HTTP requests to backend
- **Better UX** - Prevent blank state while loading
- **Perceived performance** - Reduce perceived load time

## Mandatory Rules

Before implementing loading indicators:
- ✓ **Indicator Types**: Only 'Spinner' (default) or 'Shimmer' supported

## Default Spinner Indicator

Rotating loading spinner displays during data load:

```vue
<template>
  <ejs-treegrid 
    :dataSource="dataManager"
    idMapping="taskID"
    parentIdMapping="parentID"
    :treeColumnIndex="1"
    :loadingIndicator="loadingIndicator"
    :allowPaging="true"
    :pageSettings="pageSettings">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Page, DataManager, TreeGridExcelExport } from '@syncfusion/ej2-vue-treegrid';
import { UrlAdaptor } from '@syncfusion/ej2-data';

// Remote data source
const dataManager = ref(
  new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  })
);

const loadingIndicator = ref({
  indicatorType: 'Spinner'  // Default rotating loading spinner
});

const pageSettings = ref({ pageSize: 12 });

// When grid loads:
// 1. Spinner displays (rotating circle)
// 2. Request sent to API
// 3. Data arrives
// 4. Spinner hides automatically
// 5. Grid renders data

provide('treegrid', [Page]);
</script>
```

### Spinner Indicator Features

- **Default type** - No need to specify unless changing to Shimmer
- **Auto hide** - Spinner disappears when data loads
- **Works with paging** - Shows when changing pages
- **Shows on refresh** - Call `.refresh()` and spinner displays again
- **Lightweight** - CSS-based animation, minimal performance impact

## Shimmer Indicator

Skeleton placeholder effect during data load:

```vue
<template>
  <ejs-treegrid 
    :dataSource="dataManager"
    idMapping="taskID"
    parentIdMapping="parentID"
    :treeColumnIndex="1"
    :loadingIndicator="loadingIndicator"
    :allowPaging="true"
    :pageSettings="pageSettings">
  </ejs-treegrid>
</template>

<script setup>
import { ref, provide } from 'vue';
import { Page, DataManager } from '@syncfusion/ej2-vue-treegrid';
import { UrlAdaptor } from '@syncfusion/ej2-data';

const dataManager = ref(
  new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  })
);

const loadingIndicator = ref({
  indicatorType: 'Shimmer'  // Skeleton placeholder effect
});

const pageSettings = ref({ pageSize: 12 });

// When grid loads:
// 1. Shimmer placeholder rows appear (empty skeleton)
// 2. Request sent to API
// 3. Data arrives
// 4. Actual data replaces shimmer placeholders
// 5. Animation stops

provide('treegrid', [Page]);
</script>
```

### Shimmer Indicator Features

- **Skeleton UI** - Shows row structure without data (preview of layout)
- **Better perceived performance** - Users see something loading immediately
- **Modern UX** - Popular in modern apps (Twitter, Facebook style)
- **Auto hide** - Placeholders disappear when data loads
- **Works with paging** - Shows on page changes
- **Smooth transition** - Placeholders fade into real data

## Indicator Comparison

| Aspect | Spinner | Shimmer |
|--------|---------|---------|
| **Visual** | Rotating circle | Animated skeleton rows |
| **Perceived Performance** | Standard | Better (shows layout) |
| **Data Preview** | None | Hints at grid structure |
| **Modern Feel** | Basic | Modern/trendy |
| **Performance** | Lighter | Slightly heavier |
| **Use Case** | Simple/quick loads | Large data/slow API |
