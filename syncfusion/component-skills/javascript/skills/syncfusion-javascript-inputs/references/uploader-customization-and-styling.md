# Customization & Styling

Customize the appearance, templates, and behavior of the Uploader component.

## Table of Contents
- [Theme Selection](#theme-selection)
- [CSS Customization](#css-customization)
- [Button Templates](#button-templates)
- [File List Templates](#file-list-templates)
- [Progress Bar Styling](#progress-bar-styling)
- [RTL Support](#rtl-support)
- [Responsive Design](#responsive-design)

---

## Theme Selection

### Available Syncfusion Themes

```typescript
import { Uploader } from '@syncfusion/ej2-inputs';

// Material Theme (default)
import '@syncfusion/ej2-inputs/styles/material.css';

// Bootstrap 3 Theme
import '@syncfusion/ej2-inputs/styles/bootstrap.css';

// Bootstrap 4 Theme
import '@syncfusion/ej2-inputs/styles/bootstrap4.css';

// Office Fabric Theme
import '@syncfusion/ej2-inputs/styles/fabric.css';

// High Contrast Theme (accessibility)
import '@syncfusion/ej2-inputs/styles/highcontrast.css';

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  }
});
uploader.appendTo('#fileupload');
```

### Theme Switching at Runtime

```typescript
class ThemeSwitcher {
  private uploader: Uploader;

  constructor() {
    this.uploader = new Uploader({
      asyncSettings: {
        saveUrl: 'https://api.example.com/upload',
        removeUrl: 'https://api.example.com/remove'
      }
    });
    this.uploader.appendTo('#fileupload');
    this.setupThemeSwitcher();
  }

  private setupThemeSwitcher(): void {
    document.querySelectorAll('.theme-selector').forEach(btn => {
      btn.addEventListener('click', (e: any) => {
        const theme = e.target.dataset.theme;
        this.switchTheme(theme);
      });
    });
  }

  private switchTheme(theme: string): void {
    const link = document.getElementById('themeLink') as HTMLLinkElement;
    if (link) {
      link.href = `https://cdn.syncfusion.com/ej2/${theme}.css`;
    }
  }
}
```

HTML:
```html
<div>
  <button class="theme-selector" data-theme="material">Material</button>
  <button class="theme-selector" data-theme="bootstrap">Bootstrap</button>
  <button class="theme-selector" data-theme="fabric">Fabric</button>
</div>

<link id="themeLink" rel="stylesheet" href="https://cdn.syncfusion.com/ej2/material.css">
<input type="file" id="fileupload" />
```

---

## CSS Customization

### Component-Specific CSS Selectors

The following CSS selectors are the exact structures to customize specific parts of the Uploader component:

```css
/* Customize the wrapper element height and width */
.e-upload.e-control-wrapper,
.e-bigger.e-small .e-upload.e-control-wrapper {
  height: 300px;
  width: 300px;
}

/* Customize the browse button font, size and color */
.e-upload .e-file-select-wrap .e-btn,
.e-upload .e-upload-actions .e-btn,
.e-bigger.e-small .e-upload .e-file-select-wrap .e-btn,
.e-bigger.e-small .e-upload .e-upload-actions .e-btn {
  font-family: cursive;
  height: 40px;
  background-color: aquamarine;
  color: coral;
}

/* Customize the drop area text */
.e-upload .e-file-select-wrap .e-file-drop,
.e-bigger.e-small .e-upload .e-file-select-wrap .e-file-drop {
  font-size: 20px;
  color: aqua;
}

/* Customize the uploaded file container background */
.e-upload .e-upload-files .e-upload-file-list {
  background-color: beige;
}
```

### Override Default Styles

Additional customization for more granular control:

```css
/* Uploader container */
.e-uploader {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 20px;
}

/* Browse button */
.e-uploader .e-file-select-wrap .e-btn {
  background-color: #0078d4;
  color: white;
  border-radius: 4px;
  padding: 10px 20px;
  font-weight: 600;
}

.e-uploader .e-file-select-wrap .e-btn:hover {
  background-color: #005a9e;
}

/* Upload button */
.e-uploader .e-upload-button {
  background-color: #107c10;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}

/* File list */
.e-uploader .e-upload-files {
  max-height: 300px;
  overflow-y: auto;
}

/* Individual file item */
.e-uploader .e-file-name {
  font-weight: 500;
  color: #333;
}

/* File size display */
.e-uploader .e-file-size {
  color: #999;
  font-size: 12px;
}

/* Remove button */
.e-uploader .e-file-delete-btn {
  color: #d32f2f;
}

.e-uploader .e-file-delete-btn:hover {
  background-color: #ffebee;
}
```

### Dark Theme Customization

```css
/* Dark theme */
.dark-theme .e-uploader {
  background-color: #1e1e1e;
  border-color: #444;
  color: #fff;
}

.dark-theme .e-uploader .e-file-name {
  color: #f0f0f0;
}

.dark-theme .e-uploader .e-file-size {
  color: #aaa;
}

.dark-theme .e-uploader .e-file-select-wrap .e-btn {
  background-color: #0078d4;
}

.dark-theme .e-uploader .e-file-select-wrap .e-btn:hover {
  background-color: #106ebe;
}
```

---

## Button Templates

### Custom Browse Button

Replace default browse button with custom HTML:

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  template: `
    <span class="template-span">
      <button class="e-btn e-upload-button e-css e-outline" id="ul_btn1">
        <span class="e-btn-icon e-icons e-icon-Upload"> </span>
        Upload Files
      </button>
    </span>
  `
});
uploader.appendTo('#fileupload');
```

### Icon Buttons

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  template: `
    <span class="template-span">
      <button class="e-btn e-upload-button e-icons e-icon-Upload">
        Upload
      </button>
      <button class="e-btn e-upload-button-stop e-icons e-icon-Stop">
        Stop
      </button>
    </span>
  `
});
uploader.appendTo('#fileupload');
```

---

## File List Templates

### Custom File Item Template

Control how individual files appear in the list:

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  template: `
    <span class="file-item">
      <span class="file-icon">
        <span class="e-icons e-document"></span>
      </span>
      <span class="file-info">
        <span class="file-name">\${name}</span>
        <span class="file-size">(\${size} bytes)</span>
      </span>
      <span class="file-actions">
        <button class="e-icons e-file-remove-btn" title="Remove"></button>
      </span>
    </span>
  `
});
uploader.appendTo('#fileupload');
```

### File Item with Status

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  template: `
    <span class="file-item">
      <span class="file-name">\${name}</span>
      <span class="file-status">\${status}</span>
      <span class="file-size">
        \${size}
      </span>
      <span class="file-action-buttons">
        <button class="e-file-remove-btn" id="file_remove"></button>
      </span>
    </span>
  `
});
uploader.appendTo('#fileupload');
```

---

## Progress Bar Styling

### Custom Progress Bar Template

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  template: `
    <span class="file-item">
      <span class="file-name">\${name}</span>
      <div class="progress-bar-container">
        <div class="progress-bar" style="width: 0%"></div>
      </div>
      <span class="progress-text">0%</span>
      <button class="e-file-remove-btn"></button>
    </span>
  `
});
uploader.appendTo('#fileupload');

// Update progress bar on progress event
uploader.progress = (args: any) => {
  const percent = Math.round((args.event.loaded / args.event.total) * 100);
  const progressBar = document.querySelector(`[data-file="${args.file.name}"] .progress-bar`) as HTMLElement;
  const progressText = document.querySelector(`[data-file="${args.file.name}"] .progress-text`) as HTMLElement;

  if (progressBar) {
    progressBar.style.width = percent + '%';
    if (progressText) {
      progressText.textContent = percent + '%';
    }
  }
};
```

### CSS for Progress Bar

```css
.progress-bar-container {
  width: 100%;
  height: 4px;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin: 10px 0;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #0078d4, #107c10);
  transition: width 0.3s ease;
  border-radius: 2px;
}

.progress-text {
  font-size: 12px;
  color: #666;
  font-weight: 600;
}
```

---

## RTL Support

### Enable Right-to-Left Layout

```typescript
import { enableRtl } from '@syncfusion/ej2-base';

// Enable RTL globally
enableRtl(true);

const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  locale: 'ar'  // Arabic locale
});
uploader.appendTo('#fileupload');
```

### RTL Styling

```css
.e-rtl .e-uploader {
  direction: rtl;
  text-align: right;
}

.e-rtl .e-file-select-wrap {
  flex-direction: row-reverse;
}

.e-rtl .e-upload-files {
  text-align: right;
}

.e-rtl .e-file-delete-btn {
  margin-left: auto;
  margin-right: 0;
}
```

HTML:
```html
<div class="e-rtl">
  <input type="file" id="fileupload" name="UploadFiles" />
</div>
```

---

## Responsive Design

### Mobile-Optimized Uploader

```typescript
const uploader = new Uploader({
  asyncSettings: {
    saveUrl: 'https://api.example.com/upload',
    removeUrl: 'https://api.example.com/remove'
  },
  multiple: true,
  autoUpload: false
});
uploader.appendTo('#fileupload');
```

### Responsive CSS

```css
/* Desktop view */
@media (min-width: 1024px) {
  .e-uploader {
    max-width: 600px;
  }

  .e-upload-files {
    max-height: 400px;
  }
}

/* Tablet view */
@media (min-width: 768px) and (max-width: 1023px) {
  .e-uploader {
    max-width: 100%;
  }

  .e-upload-files {
    max-height: 300px;
  }
}

/* Mobile view */
@media (max-width: 767px) {
  .e-uploader {
    padding: 15px;
  }

  .e-uploader .e-file-select-wrap .e-btn {
    padding: 8px 12px;
    font-size: 14px;
  }

  .e-upload-files {
    max-height: 200px;
    font-size: 13px;
  }

  .file-item {
    flex-wrap: wrap;
  }

  .e-file-delete-btn {
    width: 24px;
    height: 24px;
  }
}

/* Small mobile */
@media (max-width: 480px) {
  .e-uploader {
    padding: 10px;
  }

  .e-uploader .e-file-select-wrap {
    flex-direction: column;
  }

  .e-uploader .e-file-select-wrap .e-btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .file-info {
    flex-direction: column;
  }

  .file-name {
    word-break: break-word;
    max-width: 100%;
  }
}
```

### Mobile Touch-Friendly

```typescript
class MobileUploader {
  private uploader: Uploader;

  constructor() {
    this.uploader = new Uploader({
      asyncSettings: {
        saveUrl: 'https://api.example.com/upload',
        removeUrl: 'https://api.example.com/remove'
      },
      autoUpload: false
    });
    this.uploader.appendTo('#fileupload');
    this.setupMobileUI();
  }

  private setupMobileUI(): void {
    // Larger touch targets on mobile
    if (window.innerWidth < 768) {
      document.querySelectorAll('.e-file-delete-btn').forEach(btn => {
        (btn as HTMLElement).style.minWidth = '44px';
        (btn as HTMLElement).style.minHeight = '44px';
      });

      document.querySelectorAll('.e-btn').forEach(btn => {
        (btn as HTMLElement).style.minWidth = '48px';
        (btn as HTMLElement).style.minHeight = '48px';
      });
    }
  }
}
```

---

## Next Steps

- **For file validation**: Read [file-validation.md](file-validation.md)
- **For advanced features**: Read [advanced-features.md](advanced-features.md)
- **For troubleshooting**: Read [troubleshooting-and-examples.md](troubleshooting-and-examples.md)
