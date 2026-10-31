# User Interaction — Syncfusion Vue Signature

## Table of Contents
- [Undo/Redo](#undo-redo)
- [Clear and Empty](#clear-and-empty)
- [Disabled and Read-Only](#disabled-and-read-only)
- [Examples](#examples)

---

## Undo/Redo

Undo and redo drawing strokes:

```vue
<template>
  <div class="undo-redo">
    <fieldset>
      <legend>Undo/Redo Signature</legend>

      <div class="canvas-wrapper">
        <canvas
          ref="canvas"
          @mousedown="start"
          @mousemove="draw"
          @mouseup="stop"
          class="signature-canvas">
        </canvas>
      </div>

      <div class="toolbar">
        <button @click="undo" :disabled="!canUndo" class="btn-action">
          ↶ Undo
        </button>
        <button @click="redo" :disabled="!canRedo" class="btn-action">
          ↷ Redo
        </button>
        <button @click="clear" class="btn-clear">Clear</button>
      </div>

      <div class="status">
        <p>Strokes: <strong>{{ strokes.length }}</strong></p>
        <p>Undo stack: <strong>{{ undoStack.length }}</strong></p>
        <p>Redo stack: <strong>{{ redoStack.length }}</strong></p>
        <p>Can Undo: <strong>{{ canUndo }}</strong> | Can Redo: <strong>{{ canRedo }}</strong></p>
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'UndoRedo',
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
    canUndo() {
      return this.undoStack.length > 0;
    },
    canRedo() {
      return this.redoStack.length > 0;
    }
  },
  mounted() {
    this.initCanvas();
    document.addEventListener('keydown', this.handleKeyboard);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyboard);
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
      this.currentStroke = { x: this.lastX, y: this.lastY, points: [] };
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
        this.undoStack.push([...this.strokes]);
        this.redoStack = [];
      }
      this.isDrawing = false;
      this.currentStroke = null;
    },
    undo() {
      if (this.undoStack.length === 0) return;
      this.redoStack.push(this.strokes);
      this.undoStack.pop();
      if (this.undoStack.length > 0) {
        this.strokes = JSON.parse(JSON.stringify(this.undoStack[this.undoStack.length - 1]));
      } else {
        this.strokes = [];
      }
      this.redraw();
    },
    redo() {
      if (this.redoStack.length === 0) return;
      const nextState = this.redoStack.pop();
      this.strokes = nextState;
      this.undoStack.push(JSON.parse(JSON.stringify(nextState)));
      this.redraw();
    },
    clear() {
      this.strokes = [];
      this.undoStack = [];
      this.redoStack = [];
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
    },
    redraw() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.strokes.forEach(stroke => {
        if (stroke.points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          stroke.points.forEach(p => {
            ctx.lineTo(p.nx, p.ny);
          });
          ctx.stroke();
        }
      });
    },
    handleKeyboard(e) {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          this.undo();
        } else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
          e.preventDefault();
          this.redo();
        }
      }
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

.toolbar {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-action { background: #0078d4; color: white; }
.btn-clear { background: #dc3545; color: white; }

button:hover:not(:disabled) { opacity: 0.85; }

.status {
  padding: 10px;
  background: #f0f7ff;
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
}

.status p {
  margin: 0;
  font-size: 12px;
}
</style>
```

---

## Clear and Empty

Clear canvas and check if empty:

```vue
<template>
  <div class="clear-empty">
    <h4>Clear and Empty</h4>

    <div class="canvas-wrapper">
      <canvas
        ref="canvas"
        @mousedown="start"
        @mousemove="draw"
        @mouseup="stop"
        class="signature-canvas">
      </canvas>
      <div v-if="isEmpty" class="empty-indicator">
        Canvas is empty
      </div>
    </div>

    <div class="actions">
      <button @click="clearCanvas" class="btn-clear">Clear Canvas</button>
      <button @click="checkEmpty" class="btn-secondary">Check Empty</button>
    </div>

    <div class="info">
      <p>Is Empty: <strong>{{ isEmpty ? 'Yes' : 'No' }}</strong></p>
      <p>Stroke Count: <strong>{{ strokeCount }}</strong></p>
      <p>Last Cleared: <strong>{{ lastCleared || 'Never' }}</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClearEmpty',
  data() {
    return {
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      isEmpty: true,
      strokeCount: 0,
      lastCleared: null
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
    start(e) {
      this.isDrawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
      if (this.isEmpty) {
        this.isEmpty = false;
        this.strokeCount = 0;
      }
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
      if (this.isDrawing) {
        this.strokeCount++;
      }
      this.isDrawing = false;
    },
    clearCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.isEmpty = true;
      this.strokeCount = 0;
      this.lastCleared = new Date().toLocaleTimeString();
    },
    checkEmpty() {
      this.isEmpty = this.strokeCount === 0;
      alert(`Canvas is ${this.isEmpty ? 'empty' : 'not empty'}`);
    }
  }
}
</script>

<style scoped>
h4 {
  margin: 0 0 15px 0;
}

.canvas-wrapper {
  position: relative;
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

.empty-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #999;
  font-style: italic;
  font-size: 14px;
  pointer-events: none;
}

.actions {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
}

.btn-clear { background: #dc3545; color: white; }
.btn-secondary { background: #6c757d; color: white; }

button:hover { opacity: 0.85; }

.info {
  padding: 10px;
  background: #f0f7ff;
  border-radius: 4px;
}

.info p {
  margin: 0 0 4px 0;
  font-size: 13px;
}

.info p:last-child { margin-bottom: 0; }
</style>
```

---

## Disabled and Read-Only

Control signature interaction state:

```vue
<template>
  <div class="disabled-readonly">
    <h4>Disabled and Read-Only States</h4>

    <div class="state-section">
      <h5>Disabled (Cannot interact)</h5>
      <div class="canvas-wrapper disabled">
        <canvas
          ref="disabledCanvas"
          class="signature-canvas">
        </canvas>
      </div>
    </div>

    <div class="state-section">
      <h5>Read-Only (Can view, cannot edit)</h5>
      <div class="canvas-wrapper readonly">
        <canvas
          ref="readonlyCanvas"
          class="signature-canvas">
        </canvas>
      </div>
    </div>

    <div class="state-section">
      <h5>Active (Can interact)</h5>
      <div class="canvas-wrapper">
        <canvas
          ref="activeCanvas"
          @mousedown="start"
          @mousemove="draw"
          @mouseup="stop"
          class="signature-canvas">
        </canvas>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DisabledReadOnly',
  data() {
    return {
      isDrawing: false,
      lastX: 0,
      lastY: 0
    }
  },
  mounted() {
    this.initCanvas('disabledCanvas');
    this.initCanvas('readonlyCanvas');
    this.initCanvas('activeCanvas');
    this.loadReadOnly();
  },
  methods: {
    initCanvas(refName) {
      const canvas = this.$refs[refName];
      canvas.width = canvas.offsetWidth;
      canvas.height = 120;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    },
    loadReadOnly() {
      const ctx = this.$refs.readonlyCanvas.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.font = 'italic 24px cursive';
      ctx.fillText('Read-only sample', 30, 70);
    },
    start(e) {
      this.isDrawing = true;
      const rect = this.$refs.activeCanvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
    },
    draw(e) {
      if (!this.isDrawing) return;
      const canvas = this.$refs.activeCanvas;
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

h5 {
  margin: 0 0 8px 0;
  font-size: 13px;
  color: #666;
}

.state-section {
  margin-bottom: 15px;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  background: white;
}

.canvas-wrapper.disabled {
  opacity: 0.5;
  pointer-events: none;
  background: #f5f5f5;
}

.canvas-wrapper.readonly {
  pointer-events: none;
  background: #fafafa;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 120px;
}
</style>
```

---

## Examples

### Complete User Interaction Demo

```vue
<template>
  <div class="interaction-complete">
    <h3>User Interaction</h3>

    <div class="demo-panel">
      <canvas
        ref="canvas"
        @mousedown="start"
        @mousemove="draw"
        @mouseup="stop"
        @touchstart.prevent="touchStart"
        @touchmove.prevent="touchMove"
        @touchend="stop"
        class="signature-canvas">
      </canvas>

      <div class="toolbar">
        <button @click="undo" :disabled="!canUndo" class="btn-action">
          ↶ Undo
        </button>
        <button @click="redo" :disabled="!canRedo" class="btn-action">
          ↷ Redo
        </button>
        <button @click="clear" class="btn-clear">Clear</button>
        <button @click="isDisabled = !isDisabled" class="btn-secondary">
          {{ isDisabled ? 'Enable' : 'Disable' }}
        </button>
        <button @click="isReadOnly = !isReadOnly" class="btn-secondary">
          {{ isReadOnly ? 'Editable' : 'Read-only' }}
        </button>
      </div>

      <div class="status">
        <p>Strokes: <strong>{{ strokes.length }}</strong></p>
        <p>Disabled: <strong>{{ isDisabled ? 'Yes' : 'No' }}</strong></p>
        <p>Read-only: <strong>{{ isReadOnly ? 'Yes' : 'No' }}</strong></p>
        <p>Empty: <strong>{{ isEmpty ? 'Yes' : 'No' }}</strong></p>
        <p>Can Undo: <strong>{{ canUndo }}</strong> | Can Redo: <strong>{{ canRedo }}</strong></p>
      </div>

      <p class="hint">
        Keyboard: Ctrl+Z (undo), Ctrl+Y or Ctrl+Shift+Z (redo), Delete (clear)
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InteractionComplete',
  data() {
    return {
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      strokes: [],
      currentStroke: null,
      undoStack: [],
      redoStack: [],
      isDisabled: false,
      isReadOnly: false
    }
  },
  computed: {
    canUndo() { return this.undoStack.length > 0; },
    canRedo() { return this.redoStack.length > 0; },
    isEmpty() { return this.strokes.length === 0; }
  },
  mounted() {
    this.initCanvas();
    document.addEventListener('keydown', this.handleKeyboard);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyboard);
  },
  methods: {
    initCanvas() {
      const canvas = this.$refs.canvas;
      canvas.width = canvas.offsetWidth;
      canvas.height = 250;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    },
    canInteract() {
      return !this.isDisabled && !this.isReadOnly;
    },
    start(e) {
      if (!this.canInteract()) return;
      this.isDrawing = true;
      const rect = this.$refs.canvas.getBoundingClientRect();
      this.lastX = e.clientX - rect.left;
      this.lastY = e.clientY - rect.top;
      this.currentStroke = { points: [] };
    },
    draw(e) {
      if (!this.isDrawing || !this.canInteract()) return;
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
    touchStart(e) {
      const touch = e.touches[0];
      this.start({ clientX: touch.clientX, clientY: touch.clientY });
    },
    touchMove(e) {
      const touch = e.touches[0];
      this.draw({ clientX: touch.clientX, clientY: touch.clientY });
    },
    stop() {
      if (this.isDrawing && this.currentStroke && this.currentStroke.points.length > 0) {
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
      if (!confirm('Clear signature?')) return;
      this.strokes = [];
      this.undoStack = [];
      this.redoStack = [];
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
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
    },
    handleKeyboard(e) {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z' && !e.shiftKey) { e.preventDefault(); this.undo(); }
        else if ((e.key === 'z' && e.shiftKey) || e.key === 'y') {
          e.preventDefault();
          this.redo();
        }
      } else if (e.key === 'Delete') {
        this.clear();
      }
    }
  }
}
</script>

<style scoped>
.interaction-complete {
  padding: 20px;
  max-width: 800px;
}

h3 {
  margin-bottom: 20px;
}

.demo-panel {
  padding: 20px;
  background: #f9f9f9;
  border-radius: 4px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 250px;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: crosshair;
  margin-bottom: 12px;
}

.toolbar {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
  flex-wrap: wrap;
}

button {
  flex: 1;
  min-width: 80px;
  padding: 8px 12px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 12px;
}

button:disabled { opacity: 0.4; cursor: not-allowed; }

.btn-action { background: #0078d4; color: white; }
.btn-clear { background: #dc3545; color: white; }
.btn-secondary { background: #6c757d; color: white; }

.status {
  padding: 10px;
  background: white;
  border-radius: 4px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
}

.status p {
  margin: 0;
  font-size: 12px;
}

.hint {
  margin: 0;
  padding: 8px;
  background: #fff3cd;
  color: #856404;
  border-radius: 3px;
  font-size: 11px;
  text-align: center;
}
</style>
```
