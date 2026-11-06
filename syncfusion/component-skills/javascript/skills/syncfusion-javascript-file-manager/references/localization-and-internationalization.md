# Localization and Internationalization in Syncfusion TypeScript FileManager

## Table of Contents
- [Setting Locale](#setting-locale)
- [Available Locales](#available-locales)
- [Custom Localization](#custom-localization)
- [RTL Support](#rtl-support)
- [Changing Localization Content](#changing-localization-content)

## Setting Locale

### Enable Specific Language

Set FileManager to use a specific language:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { setCulture } from '@syncfusion/ej2-base';

// Set culture before component initialization
setCulture('de');  // German

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'de',  // Use German locale
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Dynamic Language Switching

Change language at runtime:

```typescript
import { setCulture } from '@syncfusion/ej2-base';

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'en',
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Language selector dropdown
const languageSelector = document.getElementById('languageSelect') as HTMLSelectElement;
languageSelector.addEventListener('change', (e) => {
    const selectedLang = (e.target as HTMLSelectElement).value;
    
    // Update culture globally
    setCulture(selectedLang);
    
    // Update FileManager locale
    filemanager.locale = selectedLang;
    filemanager.refresh();
    
    console.log(`Language changed to: ${selectedLang}`);
});
```

### HTML for Language Selection

```html
<div>
    <label for="languageSelect">Select Language:</label>
    <select id="languageSelect">
        <option value="en" selected>English</option>
        <option value="de">Deutsch (German)</option>
        <option value="es">Español (Spanish)</option>
        <option value="fr">Français (French)</option>
        <option value="ja">日本語 (Japanese)</option>
        <option value="zh">中文 (Chinese)</option>
        <option value="ar">العربية (Arabic)</option>
        <option value="ru">Русский (Russian)</option>
    </select>
</div>

<div id="filemanager"></div>
```

## Available Locales

The FileManager component supports these locales:

| Locale Code | Language | Region |
|-------------|----------|--------|
| **en** | English | English (US) |
| **de** | Deutsch | German |
| **es** | Español | Spanish |
| **fr** | Français | French |
| **it** | Italiano | Italian |
| **ja** | 日本語 | Japanese |
| **ko** | 한국어 | Korean |
| **zh** | 中文 | Chinese (Simplified) |
| **zh-TW** | 繁體中文 | Chinese (Traditional) |
| **ar** | العربية | Arabic |
| **ru** | Русский | Russian |
| **pt** | Português | Portuguese |

## Custom Localization

### Define Custom Translations

Create custom localization strings for specific locale:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { L10n } from '@syncfusion/ej2-base';

// Define custom German translations
L10n.load({
    'de': {
        'filemanager': {
            // Toolbar items
            'NewFolder': 'Neuer Ordner',
            'Upload': 'Hochladen',
            'Delete': 'Löschen',
            'Download': 'Herunterladen',
            'Rename': 'Umbenennen',
            'Cut': 'Ausschneiden',
            'Copy': 'Kopieren',
            'Paste': 'Einfügen',
            
            // Context menu
            'Open': 'Öffnen',
            'Details': 'Details',
            'Refresh': 'Aktualisieren',
            'SortBy': 'Sortieren nach',
            'View': 'Ansicht',
            'SelectAll': 'Alle auswählen',
            
            // View modes
            'LargeIcons': 'Große Symbole',
            'Details': 'Details'
        }
    }
});

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'de',
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Extend Existing Translations

Add to or override existing locale strings:

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Extend German locale with additional custom strings
L10n.load({
    'de': {
        'filemanager': {
            'CustomShare': 'Teilen',
            'CustomArchive': 'Archivieren',
            'CustomProperties': 'Eigenschaften anzeigen'
        }
    },
    'es': {
        'filemanager': {
            'CustomShare': 'Compartir',
            'CustomArchive': 'Archivar',
            'CustomProperties': 'Mostrar propiedades'
        }
    }
});
```

### Get Current Locale

Retrieve the current active locale:

```typescript
const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'en',
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Get current locale
console.log('Current locale:', filemanager.locale);
```

## RTL Support

### Enable RTL (Right-to-Left) Layout

Activate RTL for Arabic, Hebrew, and other RTL languages:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { setCulture } from '@syncfusion/ej2-base';

// Set Arabic culture
setCulture('ar');

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'ar',      // Arabic locale
    enableRtl: true,   // Enable RTL layout
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Set document direction to RTL
document.documentElement.setAttribute('dir', 'rtl');
```

### Toggle RTL at Runtime

Switch between LTR and RTL layouts:

```typescript
import { setCulture } from '@syncfusion/ej2-base';

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'en',
    enableRtl: false,
    height: '380px'
});

filemanager.appendTo('#filemanager');

// Toggle RTL button
const rtlToggle = document.getElementById('rtlToggle') as HTMLInputElement;
rtlToggle.addEventListener('change', (e) => {
    const isRtl = (e.target as HTMLInputElement).checked;
    
    filemanager.enableRtl = isRtl;
    filemanager.refresh();
    
    // Update document direction
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    
    console.log(`RTL: ${isRtl}`);
});
```

## Changing Localization Content

### Update Dialog Messages

Customize system messages and prompts:

```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'en': {
        'filemanager': {
            // Delete confirmation
            'DeleteItem': 'Are you sure you want to delete this item?',
            'DeleteMultiple': 'Are you sure you want to delete these {0} items?',
            
            // Rename dialog
            'RenameItem': 'Rename',
            'EnterNewName': 'Enter new name',
            
            // Create folder dialog
            'CreateNewFolder': 'Create New Folder',
            'EnterFolderName': 'Enter folder name',
            
            // Upload messages
            'UploadComplete': 'Files uploaded successfully',
            'UploadFailed': 'Upload failed',
            'FileAlreadyExists': 'File already exists',
            
            // Error messages
            'AccessDenied': 'Access denied',
            'InvalidPath': 'Invalid path',
            'ServerError': 'Server error occurred'
        }
    }
});

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    locale: 'en',
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Localize Column Headers

Customize details view column headers:

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView } from '@syncfusion/ej2-filemanager';
import { L10n, setCulture } from '@syncfusion/ej2-base';

setCulture('de');

L10n.load({
    'de': {
        'filemanager': {
            'Name': 'Name',
            'Size': 'Größe',
            'Modified': 'Geändert',
            'Type': 'Typ'
        }
    }
});

FileManager.Inject(Toolbar, NavigationPane, DetailsView);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations'
    },
    view: 'Details',
    locale: 'de',
    detailsViewSettings: {
        columns: [
            { field: 'name', headerText: 'Name', width: '250px' },
            { field: 'size', headerText: 'Größe', width: '100px' },
            { field: 'dateModified', headerText: 'Geändert', width: '150px' }
        ]
    },
    height: '380px'
});

filemanager.appendTo('#filemanager');
```

### Complete Localization Example

```typescript
import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';
import { L10n, setCulture } from '@syncfusion/ej2-base';

// Setup German localization
setCulture('de');

L10n.load({
    'de': {
        'filemanager': {
            'NewFolder': 'Neuer Ordner',
            'Upload': 'Hochladen',
            'Delete': 'Löschen',
            'Download': 'Herunterladen',
            'Rename': 'Umbenennen',
            'Cut': 'Ausschneiden',
            'Copy': 'Kopieren',
            'Paste': 'Einfügen',
            'Open': 'Öffnen',
            'Details': 'Details',
            'Refresh': 'Aktualisieren',
            'SortBy': 'Sortieren nach',
            'View': 'Ansicht',
            'SelectAll': 'Alle auswählen',
            'Name': 'Name',
            'Size': 'Größe',
            'Modified': 'Geändert'
        }
    }
});

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

const filemanager = new FileManager({
    ajaxSettings: {
        url: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/FileOperations',
        getImageUrl: 'https://ej2-aspcore-service.azurewebsites.net/api/FileManager/GetImage'
    },
    
    // Localization settings
    locale: 'de',
    enableRtl: false,
    
    // Details view columns with German headers
    view: 'Details',
    detailsViewSettings: {
        columns: [
            { field: 'name', headerText: 'Name', width: '250px' },
            { field: 'size', headerText: 'Größe', width: '100px' },
            { field: 'dateModified', headerText: 'Geändert', width: '150px' }
        ]
    },
    
    // Context menu
    contextMenuSettings: {
        file: ['Open', '|', 'Cut', 'Copy', 'Delete', 'Rename', '|', 'Download', '|', 'Details'],
        folder: ['Open', '|', 'Cut', 'Copy', 'Paste', 'Delete', 'Rename', '|', 'Details'],
        layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'SelectAll'],
        visible: true
    },
    
    height: '600px'
});

filemanager.appendTo('#filemanager');

// Language selector
const langSelect = document.getElementById('languageSelect') as HTMLSelectElement;
if (langSelect) {
    langSelect.addEventListener('change', (e) => {
        const lang = (e.target as HTMLSelectElement).value;
        setCulture(lang);
        filemanager.locale = lang;
        filemanager.refresh();
    });
}
```

### HTML for Localization Example

```html
<div>
    <label>Select Language:</label>
    <select id="languageSelect">
        <option value="en">English</option>
        <option value="de" selected>Deutsch</option>
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="ja">日本語</option>
        <option value="ar">العربية</option>
    </select>
</div>

<div id="filemanager"></div>
```
