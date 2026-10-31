# Advanced Patterns

## Table of Contents
- [Event Handling](#event-handling)
- [Custom Workflows](#custom-workflows)
- [TypeScript Types](#typescript-types)
- [Performance Optimization](#performance-optimization)
- [Integration Patterns](#integration-patterns)

## Event Handling

### Complete Event Lifecycle

```typescript
import {
    ImageEditor, OpenEventArgs, BeforeSaveEventArgs, SaveEventArgs,
    ShapeChangeEventArgs, SelectionChangeEventArgs
} from '@syncfusion/ej2-image-editor';

const imageEditor = new ImageEditor({
    width: '550px',
    height: '330px',

    // Lifecycle events
    created: () => {
        console.log('1. Component created');
    },

    fileOpened: (args: OpenEventArgs) => {
        console.log('2. Image opened');
        const dimension = imageEditor.getImageDimension();
        console.log(`   Image size: ${dimension.width}x${dimension.height}`);
    },

    beforeSave: (args: BeforeSaveEventArgs) => {
        console.log('3. Before save');
        // args.cancel = true;  // Prevent save if needed
    },

    saved: (args: SaveEventArgs) => {
        console.log('4. Save completed');
    },

    shapeChange: (args: ShapeChangeEventArgs) => {
        console.log('5. Shape changed:', args.currentShapeSettings?.id);
    },

    selectionChanging: (args: SelectionChangeEventArgs) => {
        console.log('6. Selection changing:', args);
    },

    destroyed: () => {
        console.log('7. Component destroyed');
    }
});
```

### Custom Event Aggregator

```typescript
import { ImageEditor, OpenEventArgs, ShapeChangeEventArgs } from '@syncfusion/ej2-image-editor';

class ImageEditorEventBus {
    private listeners: Map<string, Function[]> = new Map();

    on(event: string, callback: Function) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    off(event: string, callback: Function) {
        const callbacks = this.listeners.get(event) || [];
        const index = callbacks.indexOf(callback);
        if (index > -1) callbacks.splice(index, 1);
    }

    emit(event: string, data?: any) {
        (this.listeners.get(event) || []).forEach(cb => cb(data));
    }
}

// Bridge ImageEditor events to the bus
const eventBus = new ImageEditorEventBus();

imageEditor.addEventListener('fileOpened', (args: OpenEventArgs) => {
    eventBus.emit('fileOpened', args);
});

imageEditor.addEventListener('shapeChange', (args: ShapeChangeEventArgs) => {
    eventBus.emit('shapeChange', args);
});

// Consumers subscribe via the bus
eventBus.on('fileOpened', (args) => {
    console.log('Custom handler: image opened');
});
```

## Custom Workflows

### Batch Image Processing

`open()` returns `void`; use the `fileOpened` event to know when an image is ready:

```typescript
import { ImageEditor, OpenEventArgs, ImageFilterOption } from '@syncfusion/ej2-image-editor';

class BatchImageProcessor {
    private resolveOpen: (() => void) | null = null;

    constructor(private imageEditor: ImageEditor) {
        // Bridge fileOpened event to a promise resolver
        this.imageEditor.addEventListener('fileOpened', (args: OpenEventArgs) => {
            if (this.resolveOpen) {
                this.resolveOpen();
                this.resolveOpen = null;
            }
        });
    }

    private openImage(url: string): Promise<void> {
        return new Promise(resolve => {
            this.resolveOpen = resolve;
            this.imageEditor.open(url);
        });
    }

    async processImages(urls: string[], operations: ((e: ImageEditor) => void)[]): Promise<void> {
        for (const url of urls) {
            await this.openImage(url);

            for (const operation of operations) {
                operation(this.imageEditor);
            }

            // Export triggers a browser download
            this.imageEditor.export('PNG');
            this.imageEditor.clearImage();
        }
    }
}

// Usage
const processor = new BatchImageProcessor(imageEditor);

const operations = [
    (editor: ImageEditor) => editor.finetuneImage('brightness', 10),
    (editor: ImageEditor) => editor.finetuneImage('contrast', 15),
    (editor: ImageEditor) => editor.applyImageFilter(ImageFilterOption.Sharpen)
];

// Replace 'url' etc. with validated URLs from a trusted source
processor.processImages(['url', 'url'], operations);
```

### Image Validation and Enhancement

```typescript
class SmartImageProcessor {
    constructor(private imageEditor: ImageEditor) {}
    
    // Validate image quality
    validateImage(): ValidationResult {
        const dimension = this.imageEditor.getImageDimension();
        
        const errors = [];
        const warnings = [];
        
        // Check dimensions
        if (dimension.width < 640) {
            warnings.push('Image width below 640px - may be low quality');
        }
        if (dimension.height < 480) {
            warnings.push('Image height below 480px - may be low quality');
        }
        
        // Check aspect ratio
        const ratio = dimension.width / dimension.height;
        if (ratio > 3 || ratio < 0.33) {
            warnings.push('Unusual aspect ratio detected');
        }
        
        return { valid: errors.length === 0, errors, warnings };
    }
    
    // Auto-enhance
    autoEnhance() {
        const validation = this.validateImage();

        if (!validation.valid) {
            console.error('Image validation failed:', validation.errors);
            return false;
        }

        // Apply enhancements
        this.imageEditor.finetuneImage('contrast', 10);
        this.imageEditor.finetuneImage('saturation', 15);
        this.imageEditor.applyImageFilter(ImageFilterOption.Sharpen);

        if (validation.warnings.length > 0) {
            console.warn('Applied enhancements with warnings:', validation.warnings);
        }

        return true;
    }
}

interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}
```

### Template-Based Editing

```typescript
class TemplateEditingEngine {
    constructor(private imageEditor: ImageEditor) {}
    
    // Apply predefined template
    applyTemplate(templateName: string) {
        const templates = {
            'social-media': {
                crop: { width: 1200, height: 630 },      // 16:9
                effects: [
                    { type: 'brightness', value: 5 },
                    { type: 'saturation', value: 20 }
                ],
                annotations: [
                    { type: 'text', x: 50, y: 50, text: 'Your Title' }
                ]
            },
            'thumbnail': {
                crop: { width: 400, height: 400 },       // 1:1
                effects: [
                    { type: 'contrast', value: 15 },
                    { type: 'sharpen', value: 3 }
                ]
            },
            'banner': {
                crop: { width: 1920, height: 480 },      // 4:1
                effects: [
                    { type: 'brightness', value: 10 }
                ]
            }
        };
        
        const template = templates[templateName];
        if (!template) return false;
        
        // Apply crop: use select() first, then crop()
        if (template.crop) {
            const dim = this.imageEditor.getImageDimension();
            const x = dim.x + (dim.width - template.crop.width) / 2;
            const y = dim.y + (dim.height - template.crop.height) / 2;
            this.imageEditor.select('Custom', x, y, template.crop.width, template.crop.height);
            this.imageEditor.crop();
        }

        // Apply effects
        if (template.effects) {
            template.effects.forEach(effect => {
                if (['brightness', 'contrast', 'saturation', 'hue', 'exposure', 'blur', 'opacity'].includes(effect.type)) {
                    this.imageEditor.finetuneImage(effect.type, effect.value);
                } else if (effect.type === 'sharpen') {
                    this.imageEditor.applyImageFilter(ImageFilterOption.Sharpen);
                }
            });
        }

        return true;
    }
}
```

## TypeScript Types

### Component Interfaces

```typescript
// Use the built-in ImageEditorModel for constructor options
import { ImageEditorModel } from '@syncfusion/ej2-image-editor';

const config: ImageEditorModel = {
    width: '550px',
    height: '330px',
    toolbar: ['Open', 'Crop', 'Rotate', 'Undo', 'Redo'],
    locale: 'en-US',
    disabled: false
};
```

### Custom Type Definitions

```typescript
import { ImageFilterOption } from '@syncfusion/ej2-image-editor';

// Fine-tune property names
type FinetuneProperty =
    | 'brightness'
    | 'contrast'
    | 'saturation'
    | 'hue'
    | 'exposure'
    | 'opacity'
    | 'blur';

// Selection type strings accepted by select()
type SelectionType = 'Custom' | 'Circle' | 'Square' | 'Ratio';

interface EffectOperation {
    type: FinetuneProperty;
    value: number;
    timestamp: number;
}

class ImageEditLog {
    private log: EffectOperation[] = [];

    add(type: FinetuneProperty, value: number) {
        this.log.push({ type, value, timestamp: Date.now() });
    }

    getAll(): EffectOperation[] {
        return [...this.log];
    }

    clear() {
        this.log = [];
    }
}
```

## Performance Optimization

### Lazy Loading

```typescript
class LazyImageEditor {
    private editor: ImageEditor;
    private isInitialized = false;
    
    initialize() {
        if (this.isInitialized) return;
        
        this.editor = new ImageEditor({
            width: '550px',
            height: '330px'
        });
        
        this.isInitialized = true;
    }
    
    // Initialize only when needed
    openImage(url: string) {
        if (!this.isInitialized) {
            this.initialize();
        }
        this.editor.open(url);
    }
}
```

### Memory Management

```typescript
import { ImageEditor } from '@syncfusion/ej2-image-editor';

class MemoryEfficientEditor {
    private editor: ImageEditor;

    constructor() {
        this.editor = new ImageEditor({ width: '550px', height: '330px' });
        this.editor.appendTo('#imageeditor');
    }

    // Monitor JS heap memory
    monitorMemory() {
        setInterval(() => {
            if ((performance as any).memory) {
                const memoryUsage = (performance as any).memory.usedJSHeapSize / 1048576;
                console.log(`JS Heap: ${memoryUsage.toFixed(2)} MB`);
            }
        }, 5000);
    }

    // Clear current image to free canvas resources
    clearCurrent() {
        this.editor.clearImage();
    }
}
```

## Integration Patterns

### REST API Integration

```typescript
class APIImageEditor {
    // Pass 'url' as apiUrl; never derive it from untrusted/third-party content
    constructor(private imageEditor: ImageEditor, private apiUrl: string) {}
    
    // Load from server — always validate imageId and sanitize the resolved URL before calling open() to prevent SSRF
    async loadFromServer(imageId: string) {
        try {
            const response = await fetch('url');
            const data = await response.json();

            // Validate 'url'=data.imageUrl against a trusted allowlist before opening
            this.imageEditor.open('url');
        } catch (error) {
            console.error('Failed to load image:', error);
        }
    }
    
    // Get raw pixel data and upload to server
    async saveToServer(fileName: string) {
        try {
            // getImageData() returns ImageData (pixel buffer)
            const imageData: ImageData = this.imageEditor.getImageData();

            // Render ImageData to a canvas to get a Blob
            const canvas = document.createElement('canvas');
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            canvas.getContext('2d').putImageData(imageData, 0, 0);

            canvas.toBlob(async (blob) => {
                const formData = new FormData();
                formData.append('file', blob, fileName);

                const response = await fetch(`url`, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();
                console.log('Image saved:', result);
            }, 'image/png');
        } catch (error) {
            console.error('Failed to save image:', error);
        }
    }
}
```

### State Management

```typescript
class ImageEditorStore {
    private state = {
        currentImage: null,
        history: [],
        annotations: [],
        filters: {}
    };
    
    setState(partial: Partial<typeof this.state>) {
        this.state = { ...this.state, ...partial };
        this.notifyListeners();
    }
    
    getState() {
        return { ...this.state };
    }
    
    private listeners: Function[] = [];
    
    subscribe(callback: Function) {
        this.listeners.push(callback);
    }
    
    notifyListeners() {
        this.listeners.forEach(listener => listener(this.state));
    }
}
```

### Plugin Architecture

```typescript
import { ImageEditor, OpenEventArgs } from '@syncfusion/ej2-image-editor';

interface ImageEditorPlugin {
    name: string;
    install(editor: ImageEditor): void;
    uninstall(editor: ImageEditor): void;
}

class WatermarkPlugin implements ImageEditorPlugin {
    name = 'watermark';
    private handler: ((args: OpenEventArgs) => void) | null = null;

    install(editor: ImageEditor) {
        // Auto-add watermark after each image is opened
        this.handler = (args: OpenEventArgs) => {
            this.addWatermark(editor);
        };
        editor.addEventListener('fileOpened', this.handler);
    }

    uninstall(editor: ImageEditor) {
        if (this.handler) {
            editor.removeEventListener('fileOpened', this.handler);
            this.handler = null;
        }
    }

    private addWatermark(editor: ImageEditor) {
        const dimension = editor.getImageDimension();
        editor.drawText(
            dimension.x + dimension.width - 100,
            dimension.y + dimension.height - 30,
            '© 2026',
            'Arial',
            12,
            false,
            false,
            'rgba(255,255,255,0.5)'
        );
    }
}

// Usage
const watermarkPlugin = new WatermarkPlugin();
watermarkPlugin.install(imageEditor);
```

