# Localization and RTL Support in Syncfusion Angular File Manager

## Table of Contents
- [RTL Support](#rtl-support)
- [Localization Setup](#localization-setup)
- [Available Locales](#available-locales)
- [Custom Localization](#custom-localization)
- [Date and Time Formatting](#date-and-time-formatting)

## RTL Support

### Enable Right-to-Left Layout

Enable RTL for languages like Arabic, Hebrew, and Urdu:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [enableRtl]='true'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
  
  // File Manager layout mirrors for RTL languages:
  // - Navigation pane appears on right
  // - Toolbar buttons order reversed
  // - Text alignment becomes right-aligned
}
```

### RTL with Specific Locale

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div [dir]='direction'>
    <select (change)='changeLanguage($event)' class='language-selector'>
      <option value='en'>English (LTR)</option>
      <option value='ar'>العربية (RTL)</option>
      <option value='he'>עברית (RTL)</option>
      <option value='ur'>اردو (RTL)</option>
    </select>
    
    <ejs-filemanager 
      [ajaxSettings]='ajaxSettings'
      [enableRtl]='isRtl'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class AppComponent {
  public currentLanguage: string = 'en';
  public isRtl: boolean = false;
  public direction: string = 'ltr';

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  changeLanguage(event: any) {
    this.currentLanguage = event.target.value;
    const rtlLanguages = ['ar', 'he', 'ur'];
    this.isRtl = rtlLanguages.includes(this.currentLanguage);
    this.direction = this.isRtl ? 'rtl' : 'ltr';
  }
}
```

## Localization Setup

### Basic Localization

Register locale data for the required language:

```typescript
import { registerLicenseKey } from '@syncfusion/ej2-base';
import { L10n } from '@syncfusion/ej2-base';

// Register locales
L10n.load({
  'ar': {
    'filemanager': {
      'AllowMultiselection': 'السماح بتحديد متعدد',
      'Anteriordirectory': 'الدليل السابق',
      'Dropfileshint': 'أو اسحب الملفات هنا'
    }
  },
  'de': {
    'filemanager': {
      'Allowmultiselection': 'Mehrfachauswahl zulassen',
      'Anteriordirectory': 'Vorheriges Verzeichnis',
      'Dropfileshint': 'Oder ziehen Sie Dateien hier'
    }
  }
});

// In component
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    locale='ar'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

## Available Locales

Syncfusion File Manager supports these locales:

| Locale | Language |
|--------|----------|
| en | English |
| ar | Arabic |
| de | German |
| fr | French |
| es | Spanish |
| it | Italian |
| ja | Japanese |
| zh | Chinese |
| pt | Portuguese |
| ru | Russian |
| ko | Korean |
| hi | Hindi |
| ur | Urdu |
| he | Hebrew |

### Switch Locale at Runtime

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent, FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <select (change)='switchLocale($event)' class='locale-selector'>
      <option value='en'>English</option>
      <option value='ar'>العربية</option>
      <option value='de'>Deutsch</option>
      <option value='fr'>Français</option>
      <option value='es'>Español</option>
      <option value='ja'>日本語</option>
      <option value='zh'>中文</option>
    </select>
    
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      [locale]='currentLocale'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class AppComponent {
  @ViewChild('fileManager')
  public fileManager?: FileManagerComponent;

  public currentLocale: string = 'en';

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  switchLocale(event: any) {
    this.currentLocale = event.target.value;
  }
}
```

## Custom Localization

### Define Custom Text

Override default text for specific locale:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { L10n } from '@syncfusion/ej2-base';

// Register custom locale strings
L10n.load({
  'en-US': {
    'filemanager': {
      'NewFolder': 'Create Folder',
      'Upload': 'Add Files',
      'Delete': 'Remove',
      'Download': 'Save',
      'Rename': 'Rename Item',
      'SortBy': 'Organize',
      'View': 'Display',
      'Details': 'More Info'
    }
  }
});

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    locale='en-US'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

### Complete Custom Locale

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Define custom locale with all messages
L10n.load({
  'custom-locale': {
    'filemanager': {
      'Allowmultiselection': 'Allow Multiple Selection',
      'Anteriordirectory': 'Back to Previous Folder',
      'Dropfileshint': 'Drag and drop files here',
      'NewFolder': 'New Folder',
      'Upload': 'Upload',
      'Download': 'Download',
      'Delete': 'Delete',
      'Rename': 'Rename',
      'Cut': 'Cut',
      'Copy': 'Copy',
      'Paste': 'Paste',
      'Details': 'Details',
      'Refresh': 'Refresh',
      'Folders': 'Folders',
      'Files': 'Files',
      'FilterPlaceHolder': 'Filter files',
      'Back': 'Back',
      'Forward': 'Forward',
      'Home': 'Home',
      'SortBy': 'Sort By',
      'View': 'View',
      'CreateFolder': 'Create Folder',
      'GridSettings': 'Grid Settings'
    }
  }
});
```

### Language-Specific Implementation

```typescript
import { Component, OnInit } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div>
    <div class='language-selector'>
      <button (click)='setLanguage("en")' 
        [class.active]='currentLanguage === "en"'>
        English
      </button>
      <button (click)='setLanguage("ar")' 
        [class.active]='currentLanguage === "ar"'>
        العربية
      </button>
      <button (click)='setLanguage("es")' 
        [class.active]='currentLanguage === "es"'>
        Español
      </button>
    </div>
    
    <ejs-filemanager 
      [ajaxSettings]='ajaxSettings'
      [locale]='currentLanguage'
      [enableRtl]='isRtl'
      height="500px">
    </ejs-filemanager>
  </div>`,
  styles: [`
    .language-selector {
      padding: 10px;
      background-color: #f5f5f5;
      display: flex;
      gap: 10px;
    }
    
    .language-selector button {
      padding: 8px 16px;
      background-color: white;
      border: 1px solid #ddd;
      cursor: pointer;
      border-radius: 4px;
    }
    
    .language-selector button.active {
      background-color: #007bff;
      color: white;
      border-color: #007bff;
    }
  `]
})
export class AppComponent implements OnInit {
  public currentLanguage: string = 'en';
  public isRtl: boolean = false;

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  ngOnInit() {
    this.loadLocales();
  }

  private loadLocales() {
    L10n.load({
      'ar': {
        'filemanager': {
          'Allowmultiselection': 'السماح بالتحديد المتعدد',
          'NewFolder': 'مجلد جديد',
          'Upload': 'رفع',
          'Download': 'تحميل',
          'Delete': 'حذف',
          'Rename': 'إعادة تسمية'
        }
      },
      'es': {
        'filemanager': {
          'Allowmultiselection': 'Permitir selección múltiple',
          'NewFolder': 'Carpeta nueva',
          'Upload': 'Cargar',
          'Download': 'Descargar',
          'Delete': 'Eliminar',
          'Rename': 'Cambiar nombre'
        }
      }
    });
  }

  setLanguage(lang: string) {
    this.currentLanguage = lang;
    const rtlLanguages = ['ar', 'he', 'ur'];
    this.isRtl = rtlLanguages.includes(lang);
  }
}
```

## Date and Time Formatting

### Locale-Specific Date Format

Date and time display respects the current locale:

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [locale]='locale'
    [detailsViewSettings]='detailsViewSettings'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  public locale: string = 'en';
  
  public detailsViewSettings = {
    columns: [
      { field: 'name', headerText: 'File Name', width: '40%' },
      { field: 'size', headerText: 'Size', width: '30%' },
      // Date format changes based on locale
      { field: '_fm_modified', headerText: 'Modified', width: '30%' }
    ]
  };

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  // Date display:
  // Locale en: 1/15/2024
  // Locale de: 15.01.2024
  // Locale ar: ١٥/١/٢٠٢٤
  // Locale ja: 2024/1/15
}
```

### Custom Date Formatting

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { DatePipe } from '@angular/common';

@Component({
  imports: [FileManagerModule, DatePipe],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    [detailsViewSettings]='detailsViewSettings'
    height="500px">
  </ejs-filemanager>`
})
export class AppComponent {
  constructor(private datePipe: DatePipe) {}

  public detailsViewSettings = {
    columns: [
      { field: 'name', headerText: 'File Name', width: '40%' },
      { field: 'size', headerText: 'Size', width: '30%' },
      {
        field: '_fm_modified',
        headerText: 'Modified',
        width: '30%',
        // Custom format template
        template: (props: any) => {
          return this.datePipe.transform(props._fm_modified, 'medium');
        }
      }
    ]
  };

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
}
```

## Complete Localization Example

```typescript
import { Component } from '@angular/core';
import { FileManagerModule } from '@syncfusion/ej2-angular-filemanager';
import { L10n } from '@syncfusion/ej2-base';

// Initialize locales
L10n.load({
  'en': {
    'filemanager': {
      'Allowmultiselection': 'Allow Multiple Selection',
      'NewFolder': 'New Folder',
      'Upload': 'Upload',
      'Download': 'Download'
    }
  },
  'es': {
    'filemanager': {
      'Allowmultiselection': 'Permitir selección múltiple',
      'NewFolder': 'Carpeta nueva',
      'Upload': 'Cargar',
      'Download': 'Descargar'
    }
  },
  'ar': {
    'filemanager': {
      'Allowmultiselection': 'السماح بالتحديد المتعدد',
      'NewFolder': 'مجلد جديد',
      'Upload': 'رفع',
      'Download': 'تحميل'
    }
  }
});

@Component({
  imports: [FileManagerModule],
  standalone: true,
  selector: 'app-root',
  template: `<div class='localization-demo'>
    <div class='controls'>
      <label>Language / اللغة / Idioma:</label>
      <select (change)='changeLanguage($event)'>
        <option value='en'>English</option>
        <option value='es'>Español</option>
        <option value='ar'>العربية</option>
      </select>
    </div>
    
    <ejs-filemanager 
      [ajaxSettings]='ajaxSettings'
      [locale]='currentLocale'
      [enableRtl]='isRtl'
      height="500px">
    </ejs-filemanager>
  </div>`,
  styles: [`
    .localization-demo {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }
    
    .controls {
      padding: 15px;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .controls select {
      padding: 8px 12px;
      font-size: 16px;
    }
  `]
})
export class AppComponent {
  public currentLocale: string = 'en';
  public isRtl: boolean = false;

  public ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };

  changeLanguage(event: any) {
    this.currentLocale = event.target.value;
    const rtlLanguages = ['ar', 'he', 'ur'];
    this.isRtl = rtlLanguages.includes(this.currentLocale);
  }
}
```

---

**Complete File Manager Skill Finished!** You now have all references to implement, customize, and deploy the Syncfusion Angular File Manager component with full localization, RTL support, and advanced features.
