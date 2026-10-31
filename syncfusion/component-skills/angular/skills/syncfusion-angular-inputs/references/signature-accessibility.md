# Accessibility in Angular Signature Component

## Accessibility Standards Compliance

The Signature component conforms to accessibility standards and guidelines:

| Standard | Compliance |
|----------|-----------|
| **WCAG 2.2** | ✅ Full Support |
| **Section 508** | ✅ Full Support |
| **ADA (Americans with Disabilities Act)** | ✅ Full Support |
| **Screen Reader Support** | ✅ Full Support |
| **Keyboard Navigation** | ✅ Full Support |
| **Color Contrast** | ✅ Full Support |
| **Mobile Device Support** | ✅ Full Support |
| **Accessibility Checker** | ✅ Validated |
| **Axe-core** | ✅ Validated |

## Keyboard Shortcuts

The Signature component supports the following keyboard shortcuts for efficient navigation and control:

| Keyboard Shortcut | Action |
|-------------------|--------|
| **Ctrl + Z** | Undo the last action |
| **Ctrl + Y** | Redo the last action |
| **Ctrl + S** | Save the signature |
| **Delete** | Erase all signature strokes |

### Keyboard Shortcut Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [SignatureModule],
  standalone: true,
  selector: 'app-keyboard-shortcuts',
  template: `
    <div class="e-section-control">
      <div id="info">
        <h4>Keyboard Shortcuts Available</h4>
        <ul>
          <li><kbd>Ctrl + Z</kbd> - Undo</li>
          <li><kbd>Ctrl + Y</kbd> - Redo</li>
          <li><kbd>Ctrl + S</kbd> - Save</li>
          <li><kbd>Delete</kbd> - Clear</li>
        </ul>
      </div>
      <canvas 
        ejs-signature 
        #signature 
        id="signature"
        (keydown)="handleKeyboard($event)"
        tabindex="0">
      </canvas>
    </div>
  `,
  styles: [`
    canvas {
      border: 1px solid #ccc;
      height: 400px;
      width: 100%;
      outline: none;
    }
    
    canvas:focus {
      outline: 2px solid #2196F3;
      outline-offset: 2px;
    }
    
    kbd {
      background: #f0f0f0;
      border: 1px solid #ccc;
      border-radius: 3px;
      padding: 2px 6px;
      font-family: monospace;
    }
    
    ul {
      margin: 10px 0;
      padding-left: 20px;
    }
  `]
})
export class KeyboardShortcutsComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  handleKeyboard(event: KeyboardEvent): void {
    if (this.signature?.disabled || this.signature?.isReadOnly) {
      return;
    }

    // Ctrl + Z - Undo
    if (event.ctrlKey && event.key === 'z') {
      event.preventDefault();
      if (this.signature?.canUndo()) {
        this.signature.undo();
      }
    }
    // Ctrl + Y - Redo
    else if (event.ctrlKey && event.key === 'y') {
      event.preventDefault();
      if (this.signature?.canRedo()) {
        this.signature.redo();
      }
    }
    // Ctrl + S - Save
    else if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.signature?.save('Png', 'Signature');
    }
    // Delete - Clear
    else if (event.key === 'Delete') {
      event.preventDefault();
      this.signature?.clear();
    }
  }
}
```

## Screen Reader Support

The Signature component provides proper ARIA labels and semantic HTML for screen reader users.

### Example with ARIA Labels

```typescript
import { Component } from '@angular/core';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [SignatureModule],
  standalone: true,
  selector: 'app-screen-reader',
  template: `
    <div class="e-section-control">
      <div>
        <label for="signature">Signature Input Area</label>
        <p id="signature-help">
          Use your mouse, touchpad, or touch screen to draw your signature. 
          Use keyboard shortcuts: Ctrl+Z to undo, Ctrl+Y to redo, Delete to clear.
        </p>
      </div>
      <canvas 
        ejs-signature 
        id="signature"
        aria-label="Signature canvas"
        aria-describedby="signature-help"
        role="img"
        tabindex="0">
      </canvas>
    </div>
  `,
  styles: [`
    label {
      font-weight: bold;
      display: block;
      margin-bottom: 10px;
    }
    
    #signature-help {
      font-size: 0.9em;
      color: #666;
      margin-bottom: 10px;
    }
    
    canvas {
      border: 2px solid #2196F3;
      height: 400px;
      width: 100%;
    }
    
    canvas:focus {
      outline: 3px solid #1976D2;
      outline-offset: 2px;
    }
  `]
})
export class ScreenReaderComponent {}
```

## Keyboard Navigation

Users can navigate and interact with the Signature component using keyboard:

1. **Tab Key:** Move focus to the signature canvas
2. **Arrow Keys:** (if implemented) Navigate through undo/redo snapshots
3. **Keyboard Shortcuts:** Access functions without mouse
4. **Focus Indicators:** Clear visual indication of focused element

### Complete Accessible Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { SignatureComponent } from '@syncfusion/ej2-angular-inputs';
import { SignatureModule } from '@syncfusion/ej2-angular-inputs';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SignatureModule, ButtonModule],
  standalone: true,
  selector: 'app-accessible-signature',
  template: `
    <div class="e-section-control">
      <fieldset>
        <legend>Accessible Signature Component</legend>
        
        <div id="instructions">
          <h3>How to use this signature pad:</h3>
          <ul>
            <li>Draw your signature in the canvas area below</li>
            <li><kbd>Tab</kbd> to move between controls</li>
            <li><kbd>Ctrl + Z</kbd> to undo</li>
            <li><kbd>Ctrl + Y</kbd> to redo</li>
            <li><kbd>Delete</kbd> to clear the canvas</li>
            <li><kbd>Ctrl + S</kbd> to save</li>
          </ul>
        </div>

        <div id="canvas-container">
          <label for="sig-canvas">Signature Canvas:</label>
          <canvas 
            ejs-signature 
            #signature 
            id="sig-canvas"
            aria-label="Signature canvas"
            aria-describedby="instructions"
            role="img"
            tabindex="0"
            (keydown)="handleKeyboard($event)"
            (focus)="onFocus()"
            (blur)="onBlur()">
          </canvas>
        </div>

        <div id="buttons" role="group" aria-label="Signature controls">
          <button 
            ejs-button 
            id="undoBtn"
            (click)="undo()"
            aria-label="Undo last action">
            Undo
          </button>
          <button 
            ejs-button 
            id="redoBtn"
            (click)="redo()"
            aria-label="Redo last undone action">
            Redo
          </button>
          <button 
            ejs-button 
            id="clearBtn"
            (click)="clear()"
            aria-label="Clear signature">
            Clear
          </button>
          <button 
            ejs-button 
            id="saveBtn"
            (click)="save()"
            aria-label="Save signature as PNG">
            Save
          </button>
        </div>

        <div id="status" aria-live="polite" aria-atomic="true">
          <span id="status-message">Ready to sign</span>
        </div>
      </fieldset>
    </div>
  `,
  styles: [`
    .e-section-control {
      max-width: 600px;
      margin: 20px auto;
    }
    
    fieldset {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 4px;
    }
    
    legend {
      font-size: 1.2em;
      font-weight: bold;
      padding: 0 10px;
    }
    
    #instructions {
      background: #f5f5f5;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 4px;
    }
    
    #instructions h3 {
      margin-top: 0;
    }
    
    #instructions ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    
    kbd {
      background: #fff;
      border: 1px solid #999;
      border-radius: 3px;
      padding: 2px 6px;
      font-family: monospace;
      font-size: 0.9em;
    }
    
    #canvas-container {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 10px;
      font-weight: bold;
    }
    
    canvas {
      border: 2px solid #2196F3;
      height: 400px;
      width: 100%;
      display: block;
      margin-bottom: 10px;
    }
    
    canvas:focus {
      outline: 3px solid #1976D2;
      outline-offset: 2px;
    }
    
    #buttons {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 20px;
    }
    
    button {
      flex: 1;
      min-width: 100px;
      padding: 10px;
    }
    
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    #status {
      padding: 10px;
      background: #e3f2fd;
      border-left: 4px solid #2196F3;
      color: #1565c0;
      font-weight: 500;
    }
  `]
})
export class AccessibleSignatureComponent {
  @ViewChild('signature')
  public signature?: SignatureComponent;

  handleKeyboard(event: KeyboardEvent): void {
    if (this.signature?.disabled || this.signature?.isReadOnly) {
      return;
    }

    if (event.ctrlKey && event.key === 'z') {
      event.preventDefault();
      this.undo();
    } else if (event.ctrlKey && event.key === 'y') {
      event.preventDefault();
      this.redo();
    } else if (event.ctrlKey && event.key === 's') {
      event.preventDefault();
      this.save();
    } else if (event.key === 'Delete') {
      event.preventDefault();
      this.clear();
    }
  }

  undo(): void {
    if (this.signature?.canUndo()) {
      this.signature.undo();
      this.updateStatus('Action undone');
    }
  }

  redo(): void {
    if (this.signature?.canRedo()) {
      this.signature.redo();
      this.updateStatus('Action redone');
    }
  }

  clear(): void {
    this.signature?.clear();
    this.updateStatus('Signature cleared');
  }

  save(): void {
    if (this.signature?.isEmpty()) {
      alert('Please draw a signature first');
      return;
    }
    this.signature?.save('Png', 'Signature');
    this.updateStatus('Signature saved');
  }

  onFocus(): void {
    this.updateStatus('Signature canvas focused - ready to sign');
  }

  onBlur(): void {
    this.updateStatus('Signature canvas unfocused');
  }

  private updateStatus(message: string): void {
    const statusEl = document.getElementById('status-message');
    if (statusEl) {
      statusEl.textContent = message;
    }
  }
}
```

## Color Contrast Considerations

When customizing colors, ensure proper contrast:

- **Minimum WCAG AA:** 4.5:1 contrast ratio
- **WCAG AAA:** 7:1 contrast ratio

### Example: High Contrast Theme

```typescript
setupHighContrastTheme(): void {
  // Black text on white (21:1 ratio)
  this.signature!.strokeColor = '#000000';
  this.signature!.backgroundColor = '#ffffff';
}
```

## Mobile Device Support

The Signature component is fully accessible on mobile devices:

- **Touch Support:** Draw with fingers on touch screens
- **Responsive:** Adapts to different screen sizes
- **Gestures:** Supports touch input natively
- **Keyboard:** Virtual keyboard works with HTML inputs

## Testing Accessibility

### Using Accessibility Validation Tools

1. **Accessibility Checker:** [npm package](https://www.npmjs.com/package/accessibility-checker)
2. **Axe DevTools:** Browser extension for accessibility testing
3. **WAVE:** Web Accessibility Evaluation Tool

### Manual Testing Checklist

- [ ] Test with keyboard only (no mouse)
- [ ] Test with screen reader (NVDA, JAWS)
- [ ] Verify color contrast with contrast checker
- [ ] Test on mobile/touch devices
- [ ] Verify focus indicators are visible
- [ ] Test all keyboard shortcuts
- [ ] Verify error messages are announced

## See Also

- [Syncfusion Accessibility Overview](https://ej2.syncfusion.com/angular/documentation/common/accessibility)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [Section 508 Standards](https://www.section508.gov/)
