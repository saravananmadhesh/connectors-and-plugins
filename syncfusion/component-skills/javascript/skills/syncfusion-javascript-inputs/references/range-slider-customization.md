# Customization and Styling — Syncfusion TypeScript Range Slider

## Table of Contents
- [CSS Class Overrides](#css-class-overrides)
- [Track Customization](#track-customization)
- [Handle (Thumb) Customization](#handle-thumb-customization)
- [Limit Bar Customization](#limit-bar-customization)
- [Tick Customization](#tick-customization)
- [Button Customization](#button-customization)
- [Dynamic Color Changes](#dynamic-color-changes)
- [Thumb Shape Customization](#thumb-shape-customization)
- [Custom Tick Text via renderedTicks](#custom-tick-text-via-renderedticks)

---

## CSS Class Overrides

All slider visual elements are customizable via CSS by targeting specific class names:

| Element | CSS Class |
|---|---|
| Track | `.e-slider-track` |
| Range fill | `.e-range` |
| Handle (thumb) | `.e-handle` |
| Limit bar | `.e-limits` |
| Ticks | `.e-scale .e-tick` |
| Buttons | `.e-slider-button` |

---

## Track Customization

Change the track color and height:

```css
.e-control-wrapper.e-slider-container.e-horizontal .e-slider-track {
    background: #007bff;
    height: 3px;
}
```

Apply a gradient to the range fill:

```css
.e-control.e-slider .e-slider-track .e-range {
    background: linear-gradient(
        left,
        #e1451d 0,
        #fdff47 17%,
        #86f9fe 50%,
        #2900f8 65%,
        #6e00f8 74%,
        #e33df9 83%,
        #e14423 100%
    );
}
```

---

## Handle (Thumb) Customization

Change the handle's color, shape, and size:

```css
.e-control-wrapper.e-slider-container .e-slider .e-handle {
    background-color: #f9920b;
    border-radius: 50%;
    border: 0;
}
```

Use a background image for the handle:

```css
.e-control.e-slider .e-handle {
    background-image: url('https://ej2.syncfusion.com/demos/src/slider/images/thumb.png');
    background-color: transparent;
    height: 25px;
    width: 25px;
}
```

---

## Limit Bar Customization

Change the restricted area color:

```css
.e-control-wrapper.e-slider-container.e-horizontal .e-limits {
    background-color: rgba(69, 100, 233, 0.46);
}
```

---

## Tick Customization

Apply custom icons or colors to ticks using nth-child:

```css
/* Add custom icon to large ticks */
.e-scale .e-tick.e-custom::before {
    content: '\e967';
    position: absolute;
}

/* Color specific tick by position */
#ticks_slider .e-scale :nth-child(1)::before {
    color: red;
}
```

---

## Button Customization

Change the increment/decrement button appearance:

```css
.e-control-wrapper.e-slider-container .e-slider-button {
    background: #007bff;
    height: 25px;
    width: 25px;
}
```

---

## Dynamic Color Changes

Change handle and range bar color dynamically based on the slider's current value using the `change` event:

```typescript
import { Slider, SliderChangeEventArgs } from '@syncfusion/ej2-inputs';

let sliderTrack: HTMLElement;
let sliderHandle: HTMLElement;

let dynamicColorSlider: Slider = new Slider({
    min: 0, max: 100,
    value: 20,
    type: 'MinRange',
    created: () => {
        sliderTrack = (document.getElementById('dynamic_color_slider') as HTMLElement)
            .querySelector('.e-range') as HTMLElement;
        sliderHandle = (document.getElementById('dynamic_color_slider') as HTMLElement)
            .querySelector('.e-handle') as HTMLElement;
        sliderHandle.style.backgroundColor = 'green';
        sliderTrack.style.backgroundColor = 'green';
    },
    change: (args: SliderChangeEventArgs) => {
        const val = args.value as number;
        let color = 'green';
        if (val > 25 && val <= 50) color = 'royalblue';
        else if (val > 50 && val <= 75) color = 'darkorange';
        else if (val > 75) color = 'red';
        sliderHandle.style.backgroundColor = color;
        sliderTrack.style.backgroundColor = color;
    }
});
dynamicColorSlider.appendTo('#dynamic_color_slider');
```

---

## Thumb Shape Customization

Override the `.e-handle` class per slider ID to create different shapes:

```css
/* Square thumb */
#square_slider.e-control.e-slider .e-handle {
    border-radius: 0%;
    background-color: #f9920b;
    border: 0;
}

/* Circle thumb */
#circle_slider.e-control.e-slider .e-handle {
    border-radius: 50%;
    background-color: #f9920b;
    border: 0;
}

/* Oval thumb */
#oval_slider.e-control.e-slider .e-handle {
    height: 25px;
    width: 8px;
    top: 3px;
    border-radius: 15px;
    background-color: #f9920b;
}
```

```typescript
import { Slider } from '@syncfusion/ej2-inputs';

let squareSlider: Slider = new Slider({ value: 30, min: 0, max: 100 });
squareSlider.appendTo('#square_slider');

let circleSlider: Slider = new Slider({ value: 30, min: 0, max: 100 });
circleSlider.appendTo('#circle_slider');

let ovalSlider: Slider = new Slider({ value: 30, min: 0, max: 100 });
ovalSlider.appendTo('#oval_slider');

let imageSlider: Slider = new Slider({
    value: 30,
    min: 0, max: 100,
    ticks: { placement: 'After' }
});
imageSlider.appendTo('#image_slider');
```

---

## Custom Tick Text via renderedTicks

Assign completely custom label text to large ticks after they are rendered:

```typescript
import { Slider, SliderTickRenderedEventArgs } from '@syncfusion/ej2-inputs';

let slider: Slider = new Slider({
    min: 0, max: 100,
    value: 30,
    type: 'MinRange',
    ticks: { placement: 'Both', largeStep: 20, smallStep: 5 },
    renderedTicks: (args: SliderTickRenderedEventArgs) => {
        const li: any = args.ticksWrapper.getElementsByClassName('e-large');
        const labels = ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];
        for (let i = 0; i < li.length; ++i) {
            (li[i].querySelectorAll('.e-tick-both')[1] as HTMLElement).innerText = labels[i];
        }
    }
});
slider.appendTo('#slider');
```
