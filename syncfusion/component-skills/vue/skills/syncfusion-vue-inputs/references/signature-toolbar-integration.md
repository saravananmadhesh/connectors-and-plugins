# Toolbar Integration — Syncfusion Vue Signature

## Table of Contents
- [Basic Toolbar](#basic-toolbar)
- [Color Picker Integration](#color-picker-integration)
- [Stroke Width Control](#stroke-width-control)
- [Examples](#examples)

---

## Basic Toolbar

Integrate signature with custom toolbar:

```vue
<template>
  <div class="basic-toolbar">
    <fieldset>
      <legend>Signature with Toolbar</legend>

      <div class="toolbar">
        <button @click="undo" :disabled="!canUndo" class="tool-btn" title="Undo">
          ↶
        </button>
        <button @click="redo" :disabled="!canRedo" class="tool-btn" title="Redo">
          ↷
        </button>
        <span class="separator"></span>
        <button @click="clear" class="tool-btn danger" title="Clear">
          ✕
        </button>
        <span class="separator"></span>
        <button @click="save" class="tool-btn success" title="Save">
          💾
        </button>
      </div>

      <div class="canvas-wrapper">
        <canvas
          ref="canvas"
          @mousedown="start"
          @mousemove="draw"
          @mouseup="stop"
          class="signature-canvas">
        </canvas>
      </div>

      <div class="status-bar">
        <span>Status: <strong>{{ isEmpty ? 'Empty' : 'Signed' }}</strong></span>
        <span>Strokes: <strong>{{ strokes.length }}</strong></span>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'BasicToolbar',
  data() {
    return {
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      strokes: [],
      currentStroke: null,
      undoStack: [],
      redoStack: []
    }
  },
  computed: {
    canUndo() { return this.undoStack.length > 0; },
    canRedo() { return this.redoStack.length > 0; },
    isEmpty() { return this.strokes.length === 0; }
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
    start(e) {
      this.isDrawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
      this.currentStroke = { points: [] };
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
      this.currentStroke.points.push({ x: this.lastX, y: this.lastY, nx: x, ny: y });
      this.lastX = x;
      this.lastY = y;
    },
    stop() {
      if (this.isDrawing && this.currentStroke.points.length > 0) {
        this.strokes.push(this.currentStroke);
        this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));
        this.redoStack = [];
      }
      this.isDrawing = false;
      this.currentStroke = null;
    },
    undo() {
      if (!this.canUndo) return;
      this.redoStack.push(JSON.parse(JSON.stringify(this.strokes)));
      this.undoStack.pop();
      this.strokes = this.undoStack.length > 0 
        ? JSON.parse(JSON.stringify(this.undoStack[this.undoStack.length - 1]))
        : [];
      this.redraw();
    },
    redo() {
      if (!this.canRedo) return;
      this.strokes = this.redoStack.pop();
      this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));
      this.redraw();
    },
    clear() {
      this.strokes = [];
      this.undoStack = [];
      this.redoStack = [];
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
    },
    save() {
      const dataUrl = this.$refs.canvas.toDataURL();
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'signature.png';
      link.click();
    },
    redraw() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.strokes.forEach(stroke => {
        if (stroke.points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          stroke.points.forEach(p => ctx.lineTo(p.nx, p.ny));
          ctx.stroke();
        }
      });
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

.toolbar {
  display: flex;
  gap: 4px;
  padding: 8px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 12px;
  align-items: center;
}

.tool-btn {
  width: 36px;
  height: 36px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-btn:hover:not(:disabled) {
  background: #e0e0e0;
}

.tool-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.tool-btn.danger {
  color: #dc3545;
}

.tool-btn.success {
  color: #28a745;
}

.separator {
  width: 1px;
  height: 24px;
  background: #ddd;
  margin: 0 4px;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 8px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
  background: white;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  padding: 6px 10px;
  background: #f9f9f9;
  border-radius: 3px;
  font-size: 12px;
}
</style>
```

---

## Color Picker Integration

Add color picker to toolbar:

```vue
<template>
  <div class="color-picker-toolbar">
    <h4>Color Picker Toolbar</h4>

    <div class="toolbar">
      <div class="tool-group">
        <label class="tool-label">Color:</label>
        <input
          type="color"
          v-model="strokeColor"
          @change="updateColor"
          class="color-picker">
        <span class="color-value">{{ strokeColor }}</span>
      </div>

      <div class="tool-group">
        <label class="tool-label">Width: <span>{{ strokeWidth }}</span></label>
        <input
          type="range"
          v-model.number="strokeWidth"
          @input="updateWidth"
          min="1"
          max="10">
      </div>

      <div class="tool-group">
        <label class="tool-label">BG:</label>
        <input
          type="color"
          v-model="bgColor"
          class="color-picker">
      </div>

      <button @click="clear" class="tool-btn danger">Clear</button>
    </div>

    <div class="canvas-wrapper" :style="{ backgroundColor: bgColor }">
      <canvas
        ref="canvas"
        @mousedown="start"
        @mousemove="draw"
        @mouseup="stop"
        class="signature-canvas">
      </canvas>
    </div>

    <div class="presets">
      <p>Quick colors:</p>
      <button
        v-for="color in presetColors"
        :key="color"
        @click="setColor(color)"
        :style="{ background: color }"
        class="color-preset">
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ColorPickerToolbar',
  data() {
    return {
      strokeColor: '#000000',
      strokeWidth: 2,
      bgColor: '#ffffff',
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      presetColors: ['#000000', '#dc3545', '#0078d4', '#28a745', '#ffc107', '#6c757d']
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
      this.updateColor();
    },
    updateColor() {
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.strokeStyle = this.strokeColor;
    },
    updateWidth() {
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.lineWidth = this.strokeWidth;
    },
    setColor(color) {
      this.strokeColor = color;
      this.updateColor();
    },
    start(e) {
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
    stop() {
      this.isDrawing = false;
    },
    clear() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

.toolbar {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.tool-group {
  display: flex;
  align-items: center;
  gap: 6px;
}

.tool-label {
  font-size: 12px;
  font-weight: bold;
}

.color-picker {
  width: 40px;
  height: 30px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
}

.color-value {
  font-family: monospace;
  font-size: 11px;
  color: #666;
}

.tool-group input[type="range"] {
  width: 100px;
}

.tool-btn {
  padding: 6px 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
}

.tool-btn.danger {
  background: #dc3545;
  color: white;
  border-color: #dc3545;
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
}

.presets {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  background: #f9f9f9;
  border-radius: 4px;
}

.presets p {
  margin: 0;
  font-size: 12px;
  font-weight: bold;
}

.color-preset {
  width: 28px;
  height: 28px;
  border: 2px solid #fff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 0 1px #ddd;
}

.color-preset:hover {
  box-shadow: 0 0 0 2px #0078d4;
}
</style>
```

---

## Stroke Width Control

Dropdown for stroke width:

```vue
<template>
  <div class="stroke-width-control">
    <h4>Stroke Width Control</h4>

    <div class="toolbar">
      <label class="tool-label">Stroke Width:</label>
      <select v-model.number="strokeWidth" @change="updateWidth" class="width-select">
        <option :value="1">1px (Thin)</option>
        <option :value="2">2px (Normal)</option>
        <option :value="3">3px (Medium)</option>
        <option :value="5">5px (Thick)</option>
        <option :value="8">8px (Bold)</option>
        <option :value="12">12px (Extra Bold)</option>
      </select>

      <div class="presets">
        <button
          v-for="width in [1, 2, 3, 5, 8]"
          :key="width"
          @click="setWidth(width)"
          :class="['width-preset', { active: strokeWidth === width }]"
          :title="`${width}px`">
          <span :style="{ width: width + 'px', height: width + 'px' }"></span>
        </button>
      </div>
    </div>

    <div class="canvas-wrapper">
      <canvas
        ref="canvas"
        @mousedown="start"
        @mousemove="draw"
        @mouseup="stop"
        class="signature-canvas">
      </canvas>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StrokeWidthControl',
  data() {
    return {
      strokeWidth: 2,
      isDrawing: false,
      lastX: 0,
      lastY: 0
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
      this.updateWidth();
    },
    updateWidth() {
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = this.strokeWidth;
      ctx.lineCap = 'round';
    },
    setWidth(width) {
      this.strokeWidth = width;
      this.updateWidth();
    },
    start(e) {
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
    stop() {
      this.isDrawing = false;
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

.toolbar {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

.tool-label {
  font-size: 12px;
  font-weight: bold;
}

.width-select {
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: white;
  font-size: 13px;
  cursor: pointer;
}

.presets {
  display: flex;
  gap: 4px;
  padding-left: 12px;
  border-left: 1px solid #ddd;
}

.width-preset {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.width-preset:hover {
  background: #f0f0f0;
}

.width-preset.active {
  border-color: #0078d4;
  background: #f0f7ff;
}

.width-preset span {
  background: #000;
  border-radius: 50%;
  display: inline-block;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
  background: white;
}
</style>
```

---

## Examples

### Complete Toolbar Integration

```vue
<template>
  <div class="toolbar-complete">
    <h3>Toolbar Integration</h3>

    <div class="editor-container">
      <div class="toolbar-main">
        <div class="toolbar-section">
          <button @click="undo" :disabled="!canUndo" class="tb-btn" title="Undo (Ctrl+Z)">↶</button>
          <button @click="redo" :disabled="!canRedo" class="tb-btn" title="Redo (Ctrl+Y)">↷</button>
        </div>

        <div class="toolbar-section">
          <label class="tb-label">Pen:</label>
          <input type="color" v-model="strokeColor" @change="updatePen" class="tb-color">
          <select v-model.number="strokeWidth" @change="updatePen" class="tb-select">
            <option :value="1">1px</option>
            <option :value="2">2px</option>
            <option :value="3">3px</option>
            <option :value="5">5px</option>
          </select>
        </div>

        <div class="toolbar-section">
          <label class="tb-label">BG:</label>
          <input type="color" v-model="bgColor" class="tb-color">
          <button @click="clearBg" class="tb-btn-small">None</button>
        </div>

        <div class="toolbar-section">
          <label class="tb-label">Velocity:</label>
          <input
            type="range"
            v-model.number="velocity"
            min="0"
            max="2"
            step="0.1"
            class="tb-range">
        </div>

        <div class="toolbar-section">
          <button @click="clear" class="tb-btn-danger">Clear</button>
          <button @click="save" class="tb-btn-success">Save</button>
        </div>
      </div>

      <div class="canvas-wrapper" :style="{ backgroundColor: bgColor }">
        <canvas
          ref="canvas"
          @mousedown="start"
          @mousemove="draw"
          @mouseup="stop"
          class="signature-canvas">
        </canvas>
      </div>

      <div class="info-bar">
        <span>Color: <strong>{{ strokeColor }}</strong></span>
        <span>Width: <strong>{{ strokeWidth }}px</strong></span>
        <span>BG: <strong>{{ bgColor }}</strong></span>
        <span>Velocity: <strong>{{ velocity }}</strong></span>
        <span>Strokes: <strong>{{ strokes.length }}</strong></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolbarComplete',
  data() {
    return {
      strokeColor: '#000000',
      strokeWidth: 2,
      bgColor: '#ffffff',
      velocity: 0.7,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      lastTime: 0,
      strokes: [],
      currentStroke: null,
      undoStack: [],
      redoStack: []
    }
  },
  computed: {
    canUndo() { return this.undoStack.length > 0; },
    canRedo() { return this.redoStack.length > 0; }
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.offsetWidth;
      canvas.height = 250;
      this.updatePen();
    },
    updatePen() {
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.strokeStyle = this.strokeColor;
      ctx.lineWidth = this.strokeWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    },
    clearBg() {
      this.bgColor = 'transparent';
    },
    start(e) {
      this.isDrawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
      this.lastTime = Date.now();
      this.currentStroke = { points: [] };
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
      const factor = Math.max(0, 1 - speed * this.velocity * 0.01);
      const width = this.strokeWidth * (0.5 + 0.5 * factor);
      
      ctx.lineWidth = width;
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      
      this.currentStroke.points.push({ 
        x: this.lastX, y: this.lastY, nx: x, ny: y, w: width 
      });
      this.lastX = x;
      this.lastY = y;
      this.lastTime = now;
    },
    stop() {
      if (this.isDrawing && this.currentStroke.points.length > 0) {
        this.strokes.push(this.currentStroke);
        this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));
        this.redoStack = [];
      }
      this.isDrawing = false;
      this.currentStroke = null;
    },
    undo() {
      if (!this.canUndo) return;
      this.redoStack.push(JSON.parse(JSON.stringify(this.strokes)));
      this.undoStack.pop();
      this.strokes = this.undoStack.length > 0 
        ? JSON.parse(JSON.stringify(this.undoStack[this.undoStack.length - 1]))
        : [];
      this.redraw();
    },
    redo() {
      if (!this.canRedo) return;
      this.strokes = this.redoStack.pop();
      this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));
      this.redraw();
    },
    clear() {
      this.strokes = [];
      this.undoStack = [];
      this.redoStack = [];
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
    },
    save() {
      const dataUrl = this.$refs.canvas.toDataURL();
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'signature.png';
      link.click();
    },
    redraw() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = this.strokeColor;
      this.strokes.forEach(stroke => {
        if (stroke.points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          stroke.points.forEach(p => {
            ctx.lineWidth = p.w;
            ctx.lineTo(p.nx, p.ny);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(p.nx, p.ny);
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.toolbar-complete {
  padding: 20px;
  max-width: 900px;
}

h3 {
  margin-bottom: 20px;
}

.editor-container {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.toolbar-main {
  display: flex;
  gap: 15px;
  padding: 10px;
  background: #f5f5f5;
  border-bottom: 1px solid #e0e0e0;
  flex-wrap: wrap;
  align-items: center;
}

.toolbar-section {
  display: flex;
  align-items: center;
  gap: 6px;
  padding-right: 10px;
  border-right: 1px solid #ddd;
}

.toolbar-section:last-child {
  border-right: none;
}

.tb-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 3px;
  cursor: pointer;
  font-size: 16px;
}

.tb-btn:hover:not(:disabled) {
  background: #e0e0e0;
}

.tb-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.tb-btn-small {
  padding: 4px 8px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 3px;
  cursor: pointer;
  font-size: 11px;
}

.tb-btn-danger {
  padding: 6px 12px;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}

.tb-btn-success {
  padding: 6px 12px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  font-weight: bold;
}

.tb-label {
  font-size: 12px;
  font-weight: bold;
}

.tb-color {
  width: 32px;
  height: 32px;
  border: 1px solid #ddd;
  border-radius: 3px;
  cursor: pointer;
}

.tb-select {
  padding: 4px;
  border: 1px solid #ddd;
  border-radius: 3px;
  background: white;
  font-size: 12px;
}

.tb-range {
  width: 80px;
}

.canvas-wrapper {
  background: white;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 250px;
  cursor: crosshair;
}

.info-bar {
  display: flex;
  justify-content: space-around;
  padding: 8px;
  background: #f9f9f9;
  border-top: 1px solid #e0e0e0;
  font-size: 11px;
}
</style>
```
