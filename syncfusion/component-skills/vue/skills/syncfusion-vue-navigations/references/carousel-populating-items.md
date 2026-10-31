# Populating Items and Selection

## Table of Contents
- [Item Binding with e-carousel-item](#item-binding-with-e-carousel-item)
- [Data Source Binding](#data-source-binding)
- [Selection with Property](#selection-with-property)
- [Selection with Methods](#selection-with-methods)
- [Partial Visible Slides](#partial-visible-slides)

## Item Binding with e-carousel-item

When rendering the Carousel with item binding, you can assign individual templates to each item or use a common template. Each item can also have its own transition interval.

### Basic Item Binding

Each `e-carousel-item` defines one slide. The `template` prop contains the HTML to render:

```vue
<template>
  <div class='control-container'>
    <ejs-carousel>
      <e-carousel-items>
        <e-carousel-item template='<figure class="img-container"><img src="url" alt="cardinal" style="height:100%;width:100%;" /><figcaption class="img-caption">Cardinal</figcaption></figure>' />
        <e-carousel-item template='<figure class="img-container"><img src="url" alt="kingfisher" style="height:100%;width:100%;" /><figcaption class="img-caption">Kingfisher</figcaption></figure>' />
        <e-carousel-item template='<figure class="img-container"><img src="url" alt="keel-billed-toucan" style="height:100%;width:100%;" /><figcaption class="img-caption">Keel-billed-toucan</figcaption></figure>' />
        <e-carousel-item template='<figure class="img-container"><img src="url" alt="yellow-warbler" style="height:100%;width:100%;" /><figcaption class="img-caption">Yellow-warbler</figcaption></figure>' />
        <e-carousel-item template='<figure class="img-container"><img src="url" alt="bee-eater" style="height:100%;width:100%;" /><figcaption class="img-caption">Bee-eater</figcaption></figure>' />
      </e-carousel-items>
    </ejs-carousel>
  </div>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

### Custom Intervals Per Item

Set different transition intervals for each item using the `interval` prop (milliseconds):

```vue
<ejs-carousel>
  <e-carousel-items>
    <e-carousel-item template='<h3>Slide 1 - 3 seconds</h3>' :interval="3000" />
    <e-carousel-item template='<h3>Slide 2 - 1 second</h3>' :interval="1000" />
    <e-carousel-item template='<h3>Slide 3 - 2 seconds</h3>' :interval="2000" />
    <e-carousel-item template='<h3>Slide 4 - 5 seconds</h3>' :interval="5000" />
    <e-carousel-item template='<h3>Slide 5 - 6 seconds</h3>' :interval="6000" />
  </e-carousel-items>
</ejs-carousel>
```

**Note:** Custom intervals only work with item binding, not with dataSource binding.

## Data Source Binding

When using data source binding, you define a common template applied to all items. This approach is ideal for:
- Large dynamic datasets
- Items fetched from APIs
- Templates based on data properties

### Using itemTemplate

```vue
<template>
  <div class='control-container'>
    <ejs-carousel :dataSource="productItems" :itemTemplate="itemTemplate" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent } from "@syncfusion/ej2-vue-navigations";

const productItems = ref([
  { ID: 1, Name: "Cardinal", imageName: 'cardinal' },
  { ID: 2, Name: "Kingfisher", imageName: 'hunei' },
  { ID: 3, Name: "Keel-billed-toucan", imageName: 'costa-rica' },
  { ID: 4, Name: "Yellow-warbler", imageName: 'kaohsiung' },
  { ID: 5, Name: "Bee-eater", imageName: 'bee-eater' }
]);

const itemTemplate = (props) => {
  return `<figure class="img-container">
    <img src="/images/${props.imageName}.png" alt="${props.Name}" style="height: 100%; width: 100%;" />
    <figcaption class="img-caption">${props.Name}</figcaption>
  </figure>`;
}
</script>
```

### Fetching Data from API

```vue
<template>
  <div class='control-container'>
    <ejs-carousel :dataSource="carouselData" :itemTemplate="itemTemplate" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { CarouselComponent } from "@syncfusion/ej2-vue-navigations";

const carouselData = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('https://api.example.com/carousel-items');
    carouselData.value = await response.json();
  } catch (err) {
    console.error('Failed to load carousel data:', err);
  }
});

const itemTemplate = (props) => {
  return `<img src="${props.imageUrl}" alt="${props.title}" style="width: 100%; height: 100%;" />`;
}
</script>
```

## Selection with Property

### Set Initial Slide with selectedIndex

The `selectedIndex` property specifies which slide displays when the carousel initializes (0-indexed):

```vue
<template>
  <ejs-carousel :selectedIndex="3">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
      <e-carousel-item template='<h3>Slide 4</h3>' />
      <e-carousel-item template='<h3>Slide 5</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

This renders with Slide 4 (index 3) displayed initially.

### Update Slide Programmatically

Change the selected slide after initial render using reactive state:

```vue
<template>
  <div>
    <ejs-carousel :selectedIndex="selectedIndex">
      <e-carousel-items>
        <e-carousel-item template='<h3>Slide 1</h3>' />
        <e-carousel-item template='<h3>Slide 2</h3>' />
        <e-carousel-item template='<h3>Slide 3</h3>' />
      </e-carousel-items>
    </ejs-carousel>
    <button @click="goToSlide(2)">Go to Slide 3</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const selectedIndex = ref(0);

const goToSlide = (index) => {
  selectedIndex.value = index;
}
</script>
```

## Selection with Methods

### Using prev() and next() Methods

Access the carousel instance via template ref to call navigation methods:

```vue
<template>
  <div>
    <div>
      <button @click="prevBtnClick">Previous</button>
      <button @click="nextBtnClick">Next</button>
    </div>
    <div class='control-container'>
      <ejs-carousel ref="carouselRef">
        <e-carousel-items>
          <e-carousel-item template='<figure class="img-container"><img src="url" alt="cardinal" style="height:100%;width:100%;" /><figcaption class="img-caption">Cardinal</figcaption></figure>' />
          <e-carousel-item template='<figure class="img-container"><img src="url" alt="kingfisher" style="height:100%;width:100%;" /><figcaption class="img-caption">Kingfisher</figcaption></figure>' />
          <e-carousel-item template='<figure class="img-container"><img src="url" alt="keel-billed-toucan" style="height:100%;width:100%;" /><figcaption class="img-caption">Keel-billed-toucan</figcaption></figure>' />
          <e-carousel-item template='<figure class="img-container"><img src="url" alt="yellow-warbler" style="height:100%;width:100%;" /><figcaption class="img-caption">Yellow-warbler</figcaption></figure>' />
          <e-carousel-item template='<figure class="img-container"><img src="url" alt="bee-eater" style="height:100%;width:100%;" /><figcaption class="img-caption">Bee-eater</figcaption></figure>' />
        </e-carousel-items>
      </ejs-carousel>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";

const carouselRef = ref(null);

const prevBtnClick = () => {
  carouselRef.value?.prev();
}

const nextBtnClick = () => {
  carouselRef.value?.next();
}
</script>
```

**Methods:**
- `prev()` - Navigate to previous slide
- `next()` - Navigate to next slide

## Partial Visible Slides

### Enable Adjacent Slide Previews

Show one complete slide plus partial views of previous and next slides using the `partialVisible` property:

```vue
<template>
  <ejs-carousel :partialVisible="true">
    <e-carousel-items>
      <e-carousel-item template='<h3>Slide 1</h3>' />
      <e-carousel-item template='<h3>Slide 2</h3>' />
      <e-carousel-item template='<h3>Slide 3</h3>' />
      <e-carousel-item template='<h3>Slide 4</h3>' />
      <e-carousel-item template='<h3>Slide 5</h3>' />
    </e-carousel-items>
  </ejs-carousel>
</template>

<script setup>
import { CarouselComponent, CarouselItemsDirective, CarouselItemDirective } from "@syncfusion/ej2-vue-navigations";
</script>
```

### Partial Visible Without Loop

When `loop={false}`, the carousel stops at the last slide without wrapping:

```vue
<ejs-carousel :partialVisible="true" :loop="false">
  <e-carousel-items>
    <e-carousel-item template='<h3>Slide 1</h3>' />
    <e-carousel-item template='<h3>Slide 2</h3>' />
    <e-carousel-item template='<h3>Slide 3</h3>' />
  </e-carousel-items>
</ejs-carousel>
```

**Behavior:**
- With `loop={true}`: Last slide displays with previous slide as partial
- With `loop={false}`: Previous slide not shown at initial render

### Customizing Partial Slide Size

See [styling-and-appearance.md](./styling-and-appearance.md#customizing-partial-slides-size) for CSS customization of partial slide area.

## Edge Cases

**No items defined:**
- Carousel renders with empty container
- Navigator and indicator buttons still appear but are non-functional

**Single item:**
- Carousel displays the single item
- Navigation buttons and indicators appear but have no effect
- Loop has no visible impact

**Large datasets:**
- Consider using dataSource with itemTemplate for 50+ items
- Avoid rendering 100+ e-carousel-item elements in template
