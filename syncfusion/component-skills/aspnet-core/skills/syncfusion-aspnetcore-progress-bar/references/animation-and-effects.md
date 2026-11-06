# Animation and Effects

## Table of Contents
- [Overview](#overview)
  - [Benefits of Animation](#benefits-of-animation)
- [Enabling Animations](#enabling-animations)
  - [Basic Animation](#basic-animation)
  - [Animation Configuration](#animation-configuration)
  - [Animation with Value Updates](#animation-with-value-updates)
  - [Disabling Animations](#disabling-animations)
- [Animation Duration and Timing](#animation-duration-and-timing)
  - [Quick Animations (300–500ms)](#quick-animations-300-500ms)
  - [Standard Animations (1000–1500ms)](#standard-animations-1000-1500ms)
  - [Long Animations (2000–3000ms)](#long-animations-2000-3000ms)
  - [Delayed Animations](#delayed-animations)
  - [Pulsing Animation](#pulsing-animation)
  - [Disabling Animation for High-Frequency Updates](#disabling-animation-for-high-frequency-updates)
  - [Animation Quality vs Performance](#animation-quality-vs-performance)
  - [Mobile Performance](#mobile-performance)
- [Animation Best Practices](#animation-best-practices)

## Overview

The Syncfusion Progress Bar supports smooth animations that enhance user experience by providing visual feedback during progress transitions. Animations make progress changes feel responsive and polished rather than abrupt.

### Benefits of Animation

- **Visual Feedback** - Users perceive smooth transitions rather than jumps
- **Polish** - Adds professional feel to the application
- **Attention Drawing** - Animated progress bars draw user attention effectively
- **State Indication** - Animation indicates the system is responsive
- **Delay Perception** - Animation makes waiting periods feel shorter

## Enabling Animations

### Basic Animation

```cshtml
<ejs-progressbar id="animatedProgress" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true">
    </e-progressbar-animation>
</ejs-progressbar>
```

### Animation Configuration

For more control, use the animation settings object:

```cshtml
<ejs-progressbar id="configuredAnimation" 
                  type="Linear" 
                  value="70"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true" 
                              duration="2000" 
                              delay="0">
    </e-progressbar-animation>
</ejs-progressbar>
```

Properties:
- `enable` - Turn animation on/off
- `duration` - Animation duration in milliseconds
- `delay` - Delay before animation starts in milliseconds

### Animation with Value Updates

Animations apply when the progress value changes:

```cshtml
<ejs-progressbar id="updateProgress" 
                  type="Linear" 
                  value="0"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true" 
                              duration="2000" 
                              delay="0">
    </e-progressbar-animation>
</ejs-progressbar>

<button onclick="incrementProgress()">Next Step</button>

<script>
var currentStep = 0;
var steps = [25, 50, 75, 100];

function incrementProgress() {
    var progressBar = document.getElementById('updateProgress').ej2_instances[0];
    
    if (currentStep < steps.length) {
        // Value changes trigger animation
        progressBar.value = steps[currentStep];
        currentStep++;
    }
}
</script>
```

Each value change smoothly animates rather than jumping instantly.

### Disabling Animations

Disable animations when they're not needed:

```cshtml
<ejs-progressbar id="staticProgress" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="false">
    </e-progressbar-animation>
</ejs-progressbar>
```

Use when:
- Updating progress very frequently (> 60 updates/second)
- Performance is critical on low-end devices
- Animations distract from the content
- Progress is deterministic with no user interaction

## Animation Duration and Timing

### Quick Animations (300-500ms)

Use for snappy, responsive feedback:

```cshtml
<ejs-progressbar id="quickAnimation" 
                  type="Linear" 
                  value="0"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true" duration="300"></e-progressbar-animation>
</ejs-progressbar>

<button type="button" onclick="quickUpdate()">Run (0 → 100)</button>
<script>
function quickUpdate() {
    var pb = document.getElementById('quickAnimation').ej2_instances[0];
    pb.value = 100; // Animates in 300ms
}
</script>
```

Best for:
- Small value changes
- Frequent updates
- Responsive UI elements

### Standard Animations (1000-1500ms)

Use for typical progress scenarios:

```cshtml
<ejs-progressbar id="standardAnimation" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true" duration="1000"></e-progressbar-animation>
</ejs-progressbar>
```

Best for:
- Most common use cases
- File uploads/downloads
- Standard task progress

### Long Animations (2000-3000ms)

Use for emphasis and attention:

```cshtml
<ejs-progressbar id="longAnimation" 
                  type="Circular" 
                  value="50"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true" duration="3000"></e-progressbar-animation>
</ejs-progressbar>
```

Best for:
- Important milestones
- Large value transitions
- Emphasis and drama

### Delayed Animations

Add delay before animation starts:

```cshtml
<ejs-progressbar id="delayedAnimation" 
                  type="Linear" 
                  value="0"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true" 
                              duration="1000" 
                              delay="500">
    </e-progressbar-animation>
</ejs-progressbar>

<button type="button" onclick="triggerWithDelay()">Trigger Delay</button>
<script>
function triggerWithDelay() {
    var pb = document.getElementById('delayedAnimation').ej2_instances[0];
    pb.value = 100;
    // Animation starts after 500ms, completes after 1500ms total
}
</script>
```

Use for coordinating multiple animations or creating visual sequences.

## Easing Functions

Easing functions control the acceleration and deceleration of animations.

### Common Easing Patterns

```cshtml
<div class="pb-block">
    <ejs-progressbar id="easingPb"
                     type="Linear"
                     value="0"
                     minimum="0"
                     maximum="100">
        <!-- We disable built-in animation so our JS easing controls the motion -->
        <e-progressbar-animation enable="false"></e-progressbar-animation>
    </ejs-progressbar>
</div>

<button type="button" onclick="animateTo(100, 'linear')">Linear</button>
<button type="button" onclick="animateTo(100, 'easeIn')">Ease-in</button>
<button type="button" onclick="animateTo(100, 'easeOut')">Ease-out</button>
<button type="button" onclick="animateTo(100, 'easeInOut')">Ease-in-out</button>
<button type="button" onclick="resetPb()">Reset</button>
<script>
    // --- easing math ---
    function linear(t) { return t; }
    function easeIn(t) { return t * t; }
    function easeOut(t) { return 1 - Math.pow(1 - t, 2); }
    function easeInOut(t) { return t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2; }
    function getEase(name) {
        switch (name) {
            case 'easeIn': return easeIn;
            case 'easeOut': return easeOut;
            case 'easeInOut': return easeInOut;
            default: return linear;
        }
    }

    window.animateTo = function (target, easingName) {
        var pb = document.getElementById('easingPb').ej2_instances[0];
        var start = pb.value || 0;
        var durationMs = 1000;
        var ease = getEase(easingName);
        var startTime = null;
        function step(ts) {
            if (!startTime) startTime = ts;
            var t = Math.min((ts - startTime) / durationMs, 1);
            var v = start + (target - start) * ease(t);
            pb.value = Math.round(v);
            pb.dataBind(); // apply updates

            if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    };
    window.resetPb = function () {
        var pb = document.getElementById('easingPb').ej2_instances[0];
        pb.value = 0;
        pb.dataBind();
    };
</script>
```

### Easing Use Cases

- **Linear** - Mechanical, technical feeling (data processing)
- **Ease-in** - Powerful, accelerating feeling (starting tasks)
- **Ease-out** - Settling, finishing feeling (completing tasks)
- **Ease-in-out** - Smooth, natural feeling (general use)
- **Cubic-bezier** - Custom effects (creative/branded)

## Combining with Other Effects

### Animation with Color Transitions

Combine animation with color changes for visual variety:

```cshtml
    <style>
    @@keyframes progressStroke {
        0%   { stroke: #FF6B6B; }
        50%  { stroke: #FFA502; }
        100% { stroke: #4CAF50; }
    }

    #colorProgress_Linearprogress {
        animation: progressStroke 2s ease-in-out forwards;
    }
</style>

<ejs-progressbar id="colorProgress"
                 type="Linear"
                 value="100"
                 minimum="0"
                 maximum="100"
                 height="20px"
                 trackThickness="20"
                 progressThickness="20"
                 trackColor="#E0E0E0">
    <!-- Built-in animation moves the width from 0 to value -->
    <e-progressbar-animation enable="true" duration="2000" delay="0"></e-progressbar-animation>
</ejs-progressbar>
```

### Animation with Scale Effect

```cshtml
<style>
  @@keyframes scaleProgress {
    0%   { transform: scaleY(0.5); opacity: 0.5; }
    100% { transform: scaleY(1);   opacity: 1; }
  }

  /* This class will be added via JS to the actual SVG progress element */
  .pb-scale-anim {
    transform-box: fill-box;     /* required for SVG transforms */
    transform-origin: center;    /* scale from center */
    animation: scaleProgress .5s ease-out forwards;
  }
</style>

<ejs-progressbar id="scaleProgress"
                 type="Linear"
                 value="75"
                 minimum="0"
                 maximum="100"
                 height="20px"
                 trackThickness="20"
                 progressThickness="20"
                 loaded="onScaleLoaded">
 
</ejs-progressbar>
<script>
function onScaleLoaded() {
  const pb = document.getElementById('scaleProgress').ej2_instances[0];
  const root = pb.element;
  const progEl =
      root.querySelector('[id$="_Linearprogress"]') ||
      root.querySelector('[id*="Linearprogress"]') ||
      root.querySelector('path') || root.querySelector('rect');

  if (!progEl) return;
  progEl.classList.remove('pb-scale-anim');
  void progEl.getBoundingClientRect(); 
  progEl.classList.add('pb-scale-anim');
}
</script>
```

### Pulsing Animation

```cshtml
<style>
    @@keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.6; }
    }
    
    #pulsingProgress_Linearprogress {
        animation: pulse 1s infinite;
    }
</style>

<ejs-progressbar id="pulsingProgress" 
                  type="Linear" 
                  value="50"
                  minimum="0" 
                  maximum="100">
        <e-progressbar-animation enable="true" 
                              duration="1000" 
                              delay="0">
        </e-progressbar-animation>
</ejs-progressbar>
```

Creates a pulsing effect that draws attention without changing the value.

### Shimmer Loading Effect

```cshtml
<style>
  @@keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  #shimmerWrap {
    position: relative;
    width: 100%;
    max-width: 600px;
    --w: 50%;
    --h: 6px;               
  }

  #shimmerWrap .shimmer-fill {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: var(--h);
    width: var(--w);
    pointer-events: none;
    z-index: 2;
    background: linear-gradient(90deg, #4CAF50 0%, #81C784 50%, #4CAF50 100%);
    background-size: 200% 100%;
    animation: shimmer 1.6s linear infinite;
    border-radius: 999px;
  }

  #shimmerProgress { position: relative; z-index: 1; }
</style>

<div id="shimmerWrap">
  <div class="shimmer-fill"></div>
  <ejs-progressbar id="shimmerProgress"
                   type="Linear"
                   value="50"
                   minimum="0"
                   maximum="100"
                   trackColor="#E0E0E0"
                   progressColor="transparent"
                   trackThickness="6"
                   progressThickness="6">
  </ejs-progressbar>
</div>

<button type="button" onclick="setVal(20)">20%</button>
<button type="button" onclick="setVal(50)">50%</button>
<button type="button" onclick="setVal(80)">80%</button>

<script>
  function syncShimmer() {
    const pb = document.getElementById('shimmerProgress').ej2_instances[0];
    document.getElementById('shimmerWrap').style.setProperty('--w', pb.value + '%');
  }

  function setVal(v) {
    const pb = document.getElementById('shimmerProgress').ej2_instances[0];
    pb.value = v;
    pb.dataBind();     
    syncShimmer();
  }
  document.addEventListener('DOMContentLoaded', syncShimmer);
</script>
```

## Performance Considerations

### Animation Frequency

Limit animation updates for performance:

```cshtml
<ejs-progressbar id="performanceProgress" 
                  type="Linear" 
                  value="0"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true" 
                              duration="1000" 
                              delay="0">
    </e-progressbar-animation>
</ejs-progressbar>

<button onclick="optimizedUpdate(50)">Click to animate</button>
<script>
var lastUpdate = 0;
const UPDATE_INTERVAL = 100; // Minimum 100ms between updates

function optimizedUpdate(newValue) {
    var now = Date.now();
    
    if (now - lastUpdate >= UPDATE_INTERVAL) {
        var pb = document.getElementById('performanceProgress').ej2_instances[0];
        pb.value = newValue;
        lastUpdate = now;
    }
}

// Usage: Call frequently, but only updates every 100ms
for (let i = 0; i <= 100; i++) {
    optimizedUpdate(i);
}
</script>
```

### Disabling Animation for High-Frequency Updates

```cshtml
<button type="button" onclick="startHF()">Start</button>
<button type="button" onclick="stopHF()">Stop</button>

<ejs-progressbar id="highFreqProgress"
                 type="Linear"
                 value="0"
                 minimum="0"
                 maximum="100">
    <!-- Disable EJ2 ProgressBar animation -->
    <e-progressbar-animation enable="false"></e-progressbar-animation>
</ejs-progressbar>

<script>
let pb;
let timerId = null;

document.addEventListener('DOMContentLoaded', function () {
  pb = document.getElementById('highFreqProgress').ej2_instances[0];
});

function startHF() {
  if (timerId) return; // already running

  timerId = setInterval(function () {
    pb.value = getRealtimeMetric();
    pb.dataBind(); 
  }, 16); // ~60fps
}

function stopHF() {
  clearInterval(timerId);
  timerId = null;
}

function getRealtimeMetric() {
  return Math.floor(Math.random() * 101);
}
</script>
```

Use when updating progress > 10 times per second.

### Animation Quality vs Performance

```cshtml
<button type="button" id="startBtn">Complete (Animated)</button>

<!-- High quality animation for important tasks -->
<ejs-progressbar id="qualityProgress" 
                  type="Linear" 
                  value="0"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="true" duration="1000"></e-progressbar-animation>
</ejs-progressbar>

<!-- No animation for performance-critical updates -->
<ejs-progressbar id="perfProgress" 
                  type="Linear" 
                  value="30"
                  minimum="0" 
                  maximum="100">
    <e-progressbar-animation enable="false"></e-progressbar-animation>
</ejs-progressbar>

<script>
// Use quality animation for user-initiated actions
document.getElementById('startBtn').addEventListener('click', function() {
    var pb = document.getElementById('qualityProgress').ej2_instances[0];
    pb.value = 100;
});

// Use no animation for real-time metrics
setInterval(function() {
    var pb = document.getElementById('perfProgress').ej2_instances[0];
    pb.value = getRealTimeValue();
}, 100);
</script>
```

### Mobile Performance

Optimize animations for mobile devices:

```cshtml
    <script>
    function isMobileDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    function configureAnimation() {
        var pb = document.getElementById('progress').ej2_instances[0];
        
        if (isMobileDevice()) {
            // Shorter duration and simpler easing on mobile
            // Consider disabling for low-end devices
            pb.animation = {
                enable: true,
                duration: 500 // Shorter on mobile
            };
        } else {
            pb.animation = {
                enable: true,
                duration: 1000 // Standard on desktop
            };
        }
    }

    configureAnimation();
    </script>
```

## Animation Best Practices

1. **Use animations for important feedback** - Make them count
2. **Keep durations reasonable** - 300ms to 1.5s for most cases
3. **Match animation to task type** - Quick for small changes, longer for milestones
4. **Test on target devices** - Ensure smooth performance
5. **Avoid over-animating** - Animations should enhance, not distract
6. **Consider accessibility** - Some users prefer no motion
7. **Combine with other visual feedback** - Color, sound, or text

---

Use animations strategically to create responsive, polished progress feedback without sacrificing performance.
