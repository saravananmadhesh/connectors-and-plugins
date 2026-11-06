# Accessibility — Syncfusion Vue Signature

## Table of Contents
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Examples](#examples)

---

## ARIA Attributes

Add ARIA attributes for accessibility:

```vue
<template>
  <div class="aria-attrs">
    <fieldset>
      <legend>Accessible Signature</legend>

      <div
        class="canvas-wrapper"
        role="img"
        aria-label="Signature pad. Use mouse or touch to sign."
        :aria-describedby="descriptionId"
        tabindex="0"
        @keydown="handleKey"
        @focus="onFocus"
        @blur="onBlur">
        <canvas
          ref="canvas"
          :aria-label="ariaLabel"
          aria-required="true"
          class="signature-canvas">
        </canvas>
      </div>

      <p :id="descriptionId" class="sr-description">
        {{ description }}
      </p>

      <div class="controls">
        <button @click="undo" :disabled="!canUndo" class="btn-action">
          Undo Last Stroke
        </button>
        <button @click="clear" class="btn-clear">
          Clear Signature
        </button>
        <button @click="save" class="btn-save">
          Save Signature
        </button>
      </div>

      <div role="status" aria-live="polite" class="status-announce">
        {{ statusMessage }}
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  name: 'AriaAttributes',
  data() {
    return {
      descriptionId: 'signature-desc',
      description: 'Draw your signature in the area above. Use Tab to navigate, Delete to clear, Ctrl+Z to undo.',
      ariaLabel: 'Signature drawing area',
      statusMessage: '',
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      strokes: [],
      currentStroke: null,
      undoStack: [],
      redoStack: [],
      isFocused: false
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
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
    },
    onFocus() {
      this.isFocused = true;
      this.announce('Signature pad focused. Press Delete to clear, Ctrl+Z to undo.');
    },
    onBlur() {
      this.isFocused = false;
    },
    handleKey(e) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        this.clear();
      } else if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        this.undo();
      }
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
      if (this.isDrawing && this.currentStroke && this.currentStroke.points.length > 0) {
        this.strokes.push(this.currentStroke);
        this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));
        this.redoStack = [];
        this.announce(`Stroke ${this.strokes.length} added`);
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
      this.announce('Last stroke undone');
    },
    clear() {
      this.strokes = [];
      this.undoStack = [];
      this.redoStack = [];
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      this.announce('Signature cleared');
    },
    save() {
      this.announce('Signature saved successfully');
      alert('Signature saved!');
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
    announce(message) {
      this.statusMessage = message;
      setTimeout(() => { this.statusMessage = ''; }, 3000);
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
  margin-bottom: 8px;
}

.canvas-wrapper:focus {
  outline: 3px solid #0078d4;
  outline-offset: 2px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
  background: white;
}

.sr-description {
  font-size: 12px;
  color: #666;
  font-style: italic;
  margin: 4px 0 12px 0;
  padding: 6px;
  background: #f9f9f9;
  border-left: 3px solid #0078d4;
}

.controls {
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

button:focus {
  outline: 2px solid #0078d4;
  outline-offset: 2px;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-action { background: #0078d4; color: white; }
.btn-clear { background: #dc3545; color: white; }
.btn-save { background: #28a745; color: white; }

.status-announce {
  padding: 8px 12px;
  background: #f0f7ff;
  border-radius: 3px;
  font-size: 13px;
  min-height: 20px;
  border-left: 3px solid #0078d4;
}
</style>
```

---

## Keyboard Navigation

Full keyboard support:

```vue
<template>
  <div class="keyboard-nav">
    <h4>Keyboard Navigation</h4>

    <div
      class="canvas-wrapper"
      tabindex="0"
      role="application"
      aria-label="Signature pad with keyboard support"
      @keydown="handleKeyboard"
      @focus="onFocus"
      @blur="onBlur">
      <canvas
        ref="canvas"
        class="signature-canvas">
      </canvas>
    </div>

    <div class="keyboard-help">
      <h5>Keyboard Shortcuts:</h5>
      <ul>
        <li><kbd>Delete</kbd> or <kbd>Backspace</kbd> - Clear signature</li>
        <li><kbd>Ctrl</kbd> + <kbd>Z</kbd> - Undo last stroke</li>
        <li><kbd>Ctrl</kbd> + <kbd>Y</kbd> - Redo</li>
        <li><kbd>Ctrl</kbd> + <kbd>S</kbd> - Save signature</li>
        <li><kbd>Tab</kbd> - Navigate to controls</li>
        <li><kbd>Enter</kbd> / <kbd>Space</kbd> - Activate button</li>
        <li><kbd>↑</kbd> / <kbd>↓</kbd> - Change stroke width</li>
        <li><kbd>←</kbd> / <kbd>→</kbd> - Change color</li>
      </ul>
    </div>

    <div class="info">
      <p>Stroke Width: <strong>{{ strokeWidth }}px</strong></p>
      <p>Last Action: <strong>{{ lastAction }}</strong></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyboardNav',
  data() {
    return {
      strokeWidth: 2,
      isDrawing: false,
      lastX: 0,
      lastY: 0,
      strokes: [],
      currentStroke: null,
      undoStack: [],
      redoStack: [],
      isFocused: false,
      lastAction: 'None'
    }
  },
  mounted() {
    this.initCanvas();
    document.addEventListener('keydown', this.handleGlobalKey);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleGlobalKey);
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
    onFocus() {
      this.isFocused = true;
      this.lastAction = 'Focused';
    },
    onBlur() {
      this.isFocused = false;
    },
    handleKeyboard(e) {
      if (!this.isFocused) return;
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.strokeWidth = Math.min(10, this.strokeWidth + 1);
        this.updateWidth();
        this.lastAction = `Width: ${this.strokeWidth}px`;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.strokeWidth = Math.max(1, this.strokeWidth - 1);
        this.updateWidth();
        this.lastAction = `Width: ${this.strokeWidth}px`;
      }
    },
    handleGlobalKey(e) {
      if (!this.isFocused) return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        this.clear();
        this.lastAction = 'Cleared';
      } else if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        this.undo();
        this.lastAction = 'Undo';
      } else if (e.ctrlKey && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        this.redo();
        this.lastAction = 'Redo';
      } else if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        this.save();
        this.lastAction = 'Saved';
      }
    },
    updateWidth() {
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.lineWidth = this.strokeWidth;
    },
    clear() {
      this.strokes = [];
      this.undoStack = [];
      this.redoStack = [];
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
    },
    undo() {
      if (this.undoStack.length === 0) return;
      this.redoStack.push(JSON.parse(JSON.stringify(this.strokes)));
      this.undoStack.pop();
      this.strokes = this.undoStack.length > 0 
        ? JSON.parse(JSON.stringify(this.undoStack[this.undoStack.length - 1]))
        : [];
      this.redraw();
    },
    redo() {
      if (this.redoStack.length === 0) return;
      this.strokes = this.redoStack.pop();
      this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));
      this.redraw();
    },
    save() {
      alert('Signature saved!');
    },
    redraw() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.strokes.forEach(stroke => {
        if (stroke && stroke.points && stroke.points.length > 0) {
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
h4 {
  margin: 0 0 15px 0;
}

h5 {
  margin: 0 0 8px 0;
  font-size: 13px;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 12px;
}

.canvas-wrapper:focus {
  outline: 3px solid #0078d4;
  outline-offset: 2px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
  background: white;
}

.keyboard-help {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
}

.keyboard-help ul {
  margin: 0;
  padding-left: 20px;
  font-size: 12px;
  line-height: 1.8;
}

kbd {
  padding: 2px 6px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: monospace;
  font-size: 11px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.1);
}

.info {
  padding: 10px;
  background: #f0f7ff;
  border-radius: 4px;
}

.info p {
  margin: 0 0 4px 0;
  font-size: 13px;
}
</style>
```

---

## Screen Reader Support

Screen reader announcements:

```vue
<template>
  <div class="screen-reader">
    <h4>Screen Reader Support</h4>

    <div
      class="canvas-wrapper"
      tabindex="0"
      role="img"
      :aria-label="ariaLabel"
      @focus="announceFocus"
      @blur="announceBlur">
      <canvas
        ref="canvas"
        @mousedown="start"
        @mousemove="draw"
        @mouseup="stop"
        class="signature-canvas">
      </canvas>
    </div>

    <div role="status" aria-live="polite" aria-atomic="true" class="sr-status">
      {{ liveMessage }}
    </div>

    <div class="info-box">
      <h5>For Screen Reader Users:</h5>
      <p>{{ instructions }}</p>
    </div>

    <div class="actions">
      <button @click="undo" :disabled="!canUndo" class="btn-action">
        Undo
      </button>
      <button @click="clear" class="btn-clear">
        Clear
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScreenReader',
  data() {
    return {
      ariaLabel: 'Signature pad',
      liveMessage: '',
      instructions: 'Use your mouse, finger, or stylus to draw your signature. The signature will be saved when you click the Save button. Use the controls below to undo or clear.',
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
    canUndo() { return this.undoStack.length > 0; }
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
    announceFocus() {
      this.announce('Signature pad focused. Draw your signature using mouse or touch.');
    },
    announceBlur() {
      this.announce('Signature pad unfocused.');
    },
    announce(message) {
      this.liveMessage = '';
      setTimeout(() => { this.liveMessage = message; }, 50);
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
      if (this.isDrawing && this.currentStroke && this.currentStroke.points.length > 0) {
        this.strokes.push(this.currentStroke);
        this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));
        this.announce(`Stroke added. Total strokes: ${this.strokes.length}`);
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
      this.announce(`Stroke undone. Total strokes: ${this.strokes.length}`);
    },
    clear() {
      this.strokes = [];
      this.undoStack = [];
      this.redoStack = [];
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      this.announce('Signature cleared');
    },
    redraw() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.strokes.forEach(stroke => {
        if (stroke && stroke.points && stroke.points.length > 0) {
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
h4 {
  margin: 0 0 15px 0;
}

h5 {
  margin: 0 0 8px 0;
  font-size: 13px;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 12px;
}

.canvas-wrapper:focus {
  outline: 3px solid #0078d4;
  outline-offset: 2px;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 200px;
  cursor: crosshair;
  background: white;
}

.sr-status {
  padding: 8px 12px;
  background: #f0f7ff;
  border-left: 3px solid #0078d4;
  border-radius: 3px;
  font-size: 13px;
  min-height: 20px;
  margin-bottom: 12px;
}

.info-box {
  padding: 12px;
  background: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 12px;
}

.info-box p {
  margin: 0;
  font-size: 12px;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 6px;
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

button:focus {
  outline: 2px solid #0078d4;
  outline-offset: 2px;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-action { background: #0078d4; color: white; }
.btn-clear { background: #dc3545; color: white; }
</style>
```

---

## Examples

### Complete Accessibility Demo

```vue
<template>
  <div class="accessibility-complete">
    <h3>Signature Accessibility</h3>

    <div class="accessible-editor">
      <div class="editor-header">
        <h4>Accessible Signature Pad</h4>
        <p id="sig-instructions" class="instructions">
          Use mouse, touch, or keyboard to sign. All actions are announced to screen readers.
        </p>
      </div>

      <div
        class="canvas-wrapper"
        tabindex="0"
        role="img"
        aria-labelledby="sig-instructions"
        aria-describedby="sig-status"
        @keydown="handleKey"
        @focus="onFocus"
        @blur="onBlur">
        <canvas
          ref="canvas"
          @mousedown="start"
          @mousemove="draw"
          @mouseup="stop"
          class="signature-canvas"
          aria-label="Drawing area">
        </canvas>
      </div>

      <div
        id="sig-status"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        class="live-region">
        {{ liveStatus }}
      </div>

      <div class="toolbar">
        <button
          @click="undo"
          :disabled="!canUndo"
          aria-label="Undo last stroke">
          Undo
        </button>
        <button
          @click="redo"
          :disabled="!canRedo"
          aria-label="Redo last undone stroke">
          Redo
        </button>
        <button
          @click="clear"
          aria-label="Clear entire signature">
          Clear
        </button>
        <button
          @click="save"
          aria-label="Save signature">
          Save
        </button>
      </div>

      <div class="keyboard-info">
        <p>
          <strong>Keyboard:</strong>
          <kbd>Tab</kbd> Focus |
          <kbd>Del</kbd> Clear |
          <kbd>Ctrl+Z</kbd> Undo |
          <kbd>Ctrl+Y</kbd> Redo |
          <kbd>Ctrl+S</kbd> Save
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccessibilityComplete',
  data() {
    return {
      liveStatus: 'Ready to sign',
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
    canRedo() { return this.redoStack.length > 0; }
  },
  mounted() {
    this.initCanvas();
    document.addEventListener('keydown', this.handleGlobalKey);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleGlobalKey);
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
    onFocus() {
      this.announce('Signature pad focused. Ready to receive input.');
    },
    onBlur() {
      this.announce('Signature pad unfocused.');
    },
    handleKey(e) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        this.clear();
      }
    },
    handleGlobalKey(e) {
      if (e.ctrlKey && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        this.undo();
      } else if (e.ctrlKey && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        this.redo();
      } else if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        this.save();
      }
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
      if (this.isDrawing && this.currentStroke && this.currentStroke.points.length > 0) {
        this.strokes.push(this.currentStroke);
        this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));
        this.redoStack = [];
        this.announce(`Stroke ${this.strokes.length} completed. ${this.canUndo ? 'Press Ctrl+Z to undo.' : ''}`);
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
      this.announce('Last stroke undone');
    },
    redo() {
      if (!this.canRedo) return;
      this.strokes = this.redoStack.pop();
      this.undoStack.push(JSON.parse(JSON.stringify(this.strokes)));
      this.redraw();
      this.announce('Stroke redone');
    },
    clear() {
      this.strokes = [];
      this.undoStack = [];
      this.redoStack = [];
      const ctx = this.$refs.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
      this.announce('Signature cleared');
    },
    save() {
      this.announce('Signature saved successfully');
      alert('Signature saved!');
    },
    redraw() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.strokes.forEach(stroke => {
        if (stroke && stroke.points && stroke.points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
          stroke.points.forEach(p => ctx.lineTo(p.nx, p.ny));
          ctx.stroke();
        }
      });
    },
    announce(message) {
      this.liveStatus = '';
      setTimeout(() => { this.liveStatus = message; }, 100);
    }
  }
}
</script>

<style scoped>
.accessibility-complete {
  padding: 20px;
  max-width: 800px;
}

h3 {
  margin-bottom: 20px;
}

h4 {
  margin: 0 0 8px 0;
  color: #0078d4;
}

.accessible-editor {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  padding: 20px;
}

.editor-header {
  margin-bottom: 15px;
}

.instructions {
  margin: 0;
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

.canvas-wrapper {
  border: 2px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 12px;
}

.canvas-wrapper:focus {
  outline: 3px solid #0078d4;
  outline-offset: 2px;
  border-color: #0078d4;
}

.signature-canvas {
  display: block;
  width: 100%;
  height: 250px;
  cursor: crosshair;
  background: white;
}

.live-region {
  padding: 10px 12px;
  background: #f0f7ff;
  border-left: 4px solid #0078d4;
  border-radius: 3px;
  font-size: 13px;
  margin-bottom: 12px;
  min-height: 40px;
}

.toolbar {
  display: flex;
  gap: 6px;
  margin-bottom: 12px;
}

button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  font-size: 13px;
  background: #0078d4;
  color: white;
}

button:hover:not(:disabled) {
  background: #106ebe;
}

button:focus {
  outline: 3px solid #0078d4;
  outline-offset: 2px;
}

button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

button:nth-child(3) {
  background: #dc3545;
}

button:nth-child(3):hover:not(:disabled) {
  background: #c82333;
}

button:nth-child(4) {
  background: #28a745;
}

button:nth-child(4):hover:not(:disabled) {
  background: #218838;
}

.keyboard-info {
  padding: 8px 12px;
  background: #f9f9f9;
  border-radius: 3px;
  font-size: 12px;
}

.keyboard-info p {
  margin: 0;
}

kbd {
  padding: 2px 6px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-family: monospace;
  font-size: 11px;
  margin: 0 2px;
}
</style>
```
