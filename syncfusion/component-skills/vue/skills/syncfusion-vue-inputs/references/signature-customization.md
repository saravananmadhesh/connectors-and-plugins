# Customization — Syncfusion Vue Signature

## Table of Contents
- [Stroke Customization](#stroke-customization)
- [Background Customization](#background-customization)
- [Variable Stroke Width](#variable-stroke-width)
- [Examples](#examples)

---

## Stroke Customization

Customize stroke color and width:

```vue
<template>
  <div class="stroke-custom">
    <fieldset>
      <legend>Stroke Customization</legend>

      <div class="controls">
        <div class="control-group">
          <label>Stroke Color:</label>
          <input
            type="color"
            v-model="strokeColor"
            class="color-picker">
          <span class="value">{{ strokeColor }}</span>
        </div>

        <div class="control-group">
          <label>Min Stroke Width: <span class="value">{{ minStrokeWidth }}</span></label>
          <input
            type="range"
            v-model.number="minStrokeWidth"
            min="0.5"
            max="3"
            step="0.1">
        </div>

        <div class="control-group">
          <label>Max Stroke Width: <span class="value">{{ maxStrokeWidth }}</span></label>
          <input
            type="range"
            v-model.number="maxStrokeWidth"
            min="1"
            max="10"
            step="0.5">
        </div>

        <div class="control-group">
          <label>Velocity: <span class="value">{{ velocity }}</span></label>
          <input
            type="range"
            v-model.number="velocity"
            min="0"
            max="2"
            step="0.1">
        </div>
      </div>

      <div class="canvas-wrapper">
        <canvas
          ref="canvas"
          @mousedown="startDraw"
          @mousemove="draw"
          @mouseup="stopDraw"
          @mouseleave="stopDraw"
          class="signature-canvas">
        </canvas>
      </div>

      <div class="button-group">
        <button @click="clearCanvas" class="btn-clear">Clear</button>
        <button @click="getSignature" class="btn-save">Get Signature</button>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'StrokeCustomization',
  data() {
    return {
      strokeColor: '#0078d4',
      minStrokeWidth: 0.5,
      maxStrokeWidth: 3,
      velocity: 0.7,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      lastTime: 0,
      currentWidth: 1
    }
  },
  mounted() {
    this.initCanvas();
  },
  watch: {
    strokeColor() { this.applyStyles(); }
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
      this.applyStyles();
    },
    applyStyles() {
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.strokeStyle = this.strokeColor;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    },
    startDraw(e) {
      this.isDrawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
      this.lastTime = Date.now();
      this.currentWidth = this.maxStrokeWidth;
    },
    draw(e) {
      if (!this.isDrawing) return;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const currentTime = Date.now();
      const timeDiff = currentTime - this.lastTime;
      
      // Calculate velocity-based width
      const distance = Math.sqrt(
        Math.pow(x - this.lastX, 2) + Math.pow(y - this.lastY, 2)
      );
      const speed = timeDiff > 0 ? distance / timeDiff : 0;
      const velocityFactor = Math.max(0, 1 - speed * this.velocity);
      this.currentWidth = this.minStrokeWidth + 
        (this.maxStrokeWidth - this.minStrokeWidth) * velocityFactor;
      
      ctx.lineWidth = this.currentWidth;
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      this.lastX = x;
      this.lastY = y;
      this.lastTime = currentTime;
    },
    stopDraw() {
      this.isDrawing = false;
    },
    clearCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    getSignature() {
      const dataUrl = this.$refs.canvas.toDataURL();
      console.log('Signature data length:', dataUrl.length);
      alert('Signature captured! Check console for details.');
    }
  }
}
</script>

<style scoped>
fieldset {
  border: 1px solid #e0e0e0;
  padding: 20px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

.controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
}

.control-group label {
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
}

.value {
  color: #0078d4;
  font-family: monospace;
}

.color-picker {
  width: 100%;
  height: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  cursor: pointer;
}

input[type="range"] {
  width: 100%;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 12px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
  background: white;
}

.button-group {
  display: flex;
  gap: 8px;
}

button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}

.btn-clear {
  background: #dc3545;
  color: white;
}

.btn-save {
  background: #0078d4;
  color: white;
}

button:hover {
  opacity: 0.85;
}
</style>
```

---

## Background Customization

Customize background color and image:

```vue
<template>
  <div class="bg-custom">
    <h4>Background Customization</h4>

    <div class="controls">
      <div class="control-group">
        <label>Background Color:</label>
        <input
          type="color"
          v-model="bgColor"
          class="color-picker">
      </div>

      <div class="control-group">
        <label>Background Image URL:</label>
        <input
          type="text"
          v-model="bgImage"
          placeholder="Optional image URL"
          class="text-input">
      </div>

      <button @click="clearBg" class="btn-clear">Clear Background</button>
    </div>

    <div class="canvas-wrapper" :style="canvasStyle">
      <canvas
        ref="canvas"
        @mousedown="startDraw"
        @mousemove="draw"
        @mouseup="stopDraw"
        class="signature-canvas">
      </canvas>
    </div>

    <div class="presets">
      <h5>Presets:</h5>
      <button @click="setPreset('white')" class="preset-btn">White</button>
      <button @click="setPreset('cream')" class="preset-btn">Cream</button>
      <button @click="setPreset('blue')" class="preset-btn">Light Blue</button>
      <button @click="setPreset('grid')" class="preset-btn">Grid Pattern</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BackgroundCustomization',
  data() {
    return {
      bgColor: '#ffffff',
      bgImage: '',
      isDrawing: false,
      lastX: 0,
      lastY: 0
    }
  },
  computed: {
    canvasStyle() {
      return {
        backgroundColor: this.bgColor,
        backgroundImage: this.bgImage ? `url(${this.bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      };
    }
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    },
    startDraw(e) {
      this.isDrawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
    },
    draw(e) {
      if (!this.isDrawing) return;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      this.lastX = x;
      this.lastY = y;
    },
    stopDraw() {
      this.isDrawing = false;
    },
    clearBg() {
      this.bgColor = '#ffffff';
      this.bgImage = '';
    },
    setPreset(preset) {
      const presets = {
        white: '#ffffff',
        cream: '#f5f0e1',
        blue: '#e3f2fd',
        grid: 'transparent'
      };
      this.bgColor = presets[preset];
      if (preset === 'grid') {
        this.bgImage = 'linear-gradient(#ddd 1px, transparent 1px), linear-gradient(90deg, #ddd 1px, transparent 1px)';
        this.bgImage = 'linear-gradient(rgba(0,0,0,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,.1) 1px, transparent 1px)';
      }
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

h5 {
  margin: 12px 0 6px 0;
  font-size: 13px;
}

.controls {
  display: flex;
  gap: 12px;
  align-items: end;
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.control-group {
  flex: 1;
  min-width: 200px;
}

.control-group label {
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
}

.color-picker {
  width: 100%;
  height: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  cursor: pointer;
}

.text-input {
  width: 100%;
  padding: 6px;
  border: 1px solid #e0e0e0;
  border-radius: 3px;
  font-size: 13px;
}

.btn-clear {
  padding: 8px 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  background-size: 20px 20px;
  margin-bottom: 12px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
}

.presets {
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
}

.preset-btn {
  padding: 6px 10px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  margin-right: 6px;
  margin-bottom: 4px;
}

.preset-btn:hover {
  background: #e0e0e0;
}
</style>
```

---

## Variable Stroke Width

Dynamic stroke width based on drawing speed:

```vue
<template>
  <div class="variable-stroke">
    <h4>Variable Stroke Width</h4>
    <p class="info">Draw slowly for thicker lines, quickly for thinner lines</p>

    <div class="settings">
      <label>Sensitivity: <span class="value">{{ sensitivity }}</span></label>
      <input
        type="range"
        v-model.number="sensitivity"
        min="0"
        max="2"
        step="0.1">
    </div>

    <div class="canvas-wrapper">
      <canvas
        ref="canvas"
        @mousedown="startDraw"
        @mousemove="draw"
        @mouseup="stopDraw"
        @mouseleave="stopDraw"
        class="signature-canvas">
      </canvas>
    </div>

    <div class="stats">
      <p>Current Width: <strong>{{ currentWidth.toFixed(2) }}px</strong></p>
      <p>Current Speed: <strong>{{ currentSpeed.toFixed(2) }} px/ms</strong></p>
    </div>

    <button @click="clearCanvas" class="btn-clear">Clear</button>
  </div>
</template>

<script>
export default {
  name: 'VariableStroke',
  data() {
    return {
      sensitivity: 1.0,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      lastTime: 0,
      currentWidth: 2,
      currentSpeed: 0
    }
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.offsetWidth;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    },
    startDraw(e) {
      this.isDrawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
      this.lastTime = Date.now();
      this.currentWidth = 3;
    },
    draw(e) {
      if (!this.isDrawing) return;
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = Date.now();
      
      const distance = Math.sqrt(
        Math.pow(x - this.lastX, 2) + Math.pow(y - this.lastY, 2)
      );
      const timeDiff = now - this.lastTime;
      const speed = timeDiff > 0 ? distance / timeDiff : 0;
      this.currentSpeed = speed;
      
      const velocityFactor = Math.max(0, 1 - speed * this.sensitivity * 0.01);
      this.currentWidth = 0.5 + 3.5 * velocityFactor;
      
      ctx.lineWidth = this.currentWidth;
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      this.lastX = x;
      this.lastY = y;
      this.lastTime = now;
    },
    stopDraw() {
      this.isDrawing = false;
    },
    clearCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 8px 0;
}

.info {
  margin: 0 0 12px 0;
  font-size: 12px;
  color: #666;
  font-style: italic;
}

.settings {
  padding: 10px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
}

.settings label {
  display: block;
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 4px;
}

.value {
  color: #0078d4;
}

.settings input {
  width: 100%;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 12px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
  background: white;
}

.stats {
  padding: 10px;
  background: #f0f7ff;
  border-radius: 4px;
  margin-bottom: 12px;
}

.stats p {
  margin: 0 0 4px 0;
  font-size: 13px;
}

.btn-clear {
  width: 100%;
  padding: 8px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
}
</style>
```

---

## Examples

### Complete Customization Demo

```vue
<template>
  <div class="custom-complete">
    <h3>Signature Customization</h3>

    <div class="custom-grid">
      <div class="custom-card">
        <h4>Thin Black Signature</h4>
        <canvas
          ref="canvas1"
          class="demo-canvas"
          @mousedown="initDraw(1, $event)"
          @mousemove="continueDraw(1, $event)"
          @mouseup="endDraw(1)">
        </canvas>
        <p>Min: 0.5, Max: 2, Color: Black</p>
      </div>

      <div class="custom-card">
        <h4>Thick Blue Signature</h4>
        <canvas
          ref="canvas2"
          class="demo-canvas"
          @mousedown="initDraw(2, $event)"
          @mousemove="continueDraw(2, $event)"
          @mouseup="endDraw(2)">
        </canvas>
        <p>Min: 2, Max: 6, Color: Blue</p>
      </div>

      <div class="custom-card">
        <h4>Variable Red Signature</h4>
        <canvas
          ref="canvas3"
          class="demo-canvas"
          @mousedown="initDraw(3, $event)"
          @mousemove="continueDraw(3, $event)"
          @mouseup="endDraw(3)">
        </canvas>
        <p>Variable width, Color: Red</p>
      </div>

      <div class="custom-card">
        <h4>Custom Background</h4>
        <canvas
          ref="canvas4"
          class="demo-canvas canvas-bg"
          @mousedown="initDraw(4, $event)"
          @mousemove="continueDraw(4, $event)"
          @mouseup="endDraw(4)">
        </canvas>
        <p>Grid background</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomComplete',
  data() {
    return {
      drawings: {
        1: { active: false, lastX: 0, lastY: 0, lastTime: 0 },
        2: { active: false, lastX: 0, lastY: 0, lastTime: 0 },
        3: { active: false, lastX: 0, lastY: 0, lastTime: 0 },
        4: { active: false, lastX: 0, lastY: 0, lastTime: 0 }
      },
      configs: {
        1: { color: '#000000', min: 0.5, max: 2, variable: false },
        2: { color: '#0078d4', min: 2, max: 6, variable: false },
        3: { color: '#dc3545', min: 0.5, max: 4, variable: true },
        4: { color: '#28a745', min: 1, max: 3, variable: false }
      }
    }
  },
  mounted() {
    Object.keys(this.$refs).forEach(key => {
      const num = parseInt(key.replace('canvas', ''));
      const canvas = this.$refs[key];
      canvas.width = canvas.offsetWidth;
      canvas.height = 150;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = this.configs[num].color;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    });
  },
  methods: {
    initDraw(num, e) {
      this.drawings[num].active = true;
      const rect = this.$refs[`canvas${num}`].getBoundingClientRect();
      this.drawings[num].lastX = e.clientX - rect.left;
      this.drawings[num].lastY = e.clientY - rect.top;
      this.drawings[num].lastTime = Date.now();
    },
    continueDraw(num, e) {
      if (!this.drawings[num].active) return;
      const canvas = this.$refs[`canvas${num}`];
      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const config = this.configs[num];
      
      let width = config.max;
      if (config.variable) {
        const now = Date.now();
        const distance = Math.sqrt(
          Math.pow(x - this.drawings[num].lastX, 2) + 
          Math.pow(y - this.drawings[num].lastY, 2)
        );
        const timeDiff = now - this.drawings[num].lastTime;
        const speed = timeDiff > 0 ? distance / timeDiff : 0;
        const factor = Math.max(0, 1 - speed * 0.005);
        width = config.min + (config.max - config.min) * factor;
        this.drawings[num].lastTime = now;
      }
      
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(this.drawings[num].lastX, this.drawings[num].lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      this.drawings[num].lastX = x;
      this.drawings[num].lastY = y;
    },
    endDraw(num) {
      this.drawings[num].active = false;
    }
  }
}
</script>

<style scoped>
.custom-complete {
  padding: 20px;
  max-width: 1000px;
}

h3 {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
}

.custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.custom-card {
  padding: 15px;
  background: #f9f9f9;
  border-radius: 4px;
}

.demo-canvas {
  display: block;
  width: 100%;
  height: 150px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: crosshair;
  margin-bottom: 8px;
}

.canvas-bg {
  background-image: 
    linear-gradient(rgba(0,0,0,.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,0,0,.05) 1px, transparent 1px);
  background-size: 20px 20px;
}

p {
  margin: 0;
  font-size: 11px;
  color: #666;
  text-align: center;
}
</style>
```
