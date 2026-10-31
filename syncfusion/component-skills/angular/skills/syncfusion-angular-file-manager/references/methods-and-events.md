# Complete Methods and Events Reference

## Table of Contents
- [Instance Methods](#instance-methods)
- [Event Handling](#event-handling)
- [Event Arguments](#event-arguments)

---

## Instance Methods

### File/Folder Operations

#### `createFolder(name?: string): void`
Creates a new folder in the current path.

**Parameters:**
- `name` (optional): Name for the new folder. If not provided, dialog opens.

**Example:**
```typescript
this.fileManager?.createFolder('MyFolder');
this.fileManager?.createFolder();  // Opens dialog
```

---

#### `deleteFiles(ids?: string[]): void`
Deletes files or folders.

**Parameters:**
- `ids` (optional): Array of file/folder IDs to delete. If not provided, deletes selected items.

**Example:**
```typescript
this.fileManager?.deleteFiles(['file1.txt', 'folder1']);
this.fileManager?.deleteFiles();  // Deletes selected items
```

---

#### `renameFile(id?: string, name?: string): void`
Renames a file or folder.

**Parameters:**
- `id` (optional): File/folder ID to rename
- `name` (optional): New name. If not provided, dialog opens.

**Example:**
```typescript
this.fileManager?.renameFile('file1.txt', 'newname.txt');
this.fileManager?.renameFile();  // Opens rename dialog for selected item
```

---

#### `downloadFiles(ids?: string[]): void`
Downloads files or folders.

**Parameters:**
- `ids` (optional): Array of file/folder IDs to download. If not provided, downloads selected items.

**Example:**
```typescript
this.fileManager?.downloadFiles(['file1.txt', 'file2.pdf']);
this.fileManager?.downloadFiles();  // Downloads selected items
```

---

#### `uploadFiles(): void`
Opens the file upload dialog.

**Example:**
```typescript
this.fileManager?.uploadFiles();
```

---

### Navigation

#### `openFile(id: string): void`
Opens/navigates to a file or folder.

**Parameters:**
- `id`: File/folder ID to open

**Example:**
```typescript
this.fileManager?.openFile('folder123');
```

---

#### `traverseBackward(): void`
Navigates back one level in the folder hierarchy.

**Example:**
```typescript
this.fileManager?.traverseBackward();
```

---

### Refresh Operations

#### `refreshFiles(): void`
Refreshes the current folder's file list from the server.

**Example:**
```typescript
this.fileManager?.refreshFiles();
```

---

#### `refreshLayout(): void`
Refreshes the entire File Manager layout (UI).

**Example:**
```typescript
this.fileManager?.refreshLayout();
```

---

### Selection Management

#### `selectAll(): void`
Selects all files and folders in the current path.

**Example:**
```typescript
this.fileManager?.selectAll();
```

---

#### `clearSelection(): void`
Deselects all currently selected items.

**Example:**
```typescript
this.fileManager?.clearSelection();
```

---

#### `getSelectedFiles(): Object[]`
Returns details of selected files and folders.

**Returns:** Array of selected file objects with properties (name, id, size, type, etc.)

**Example:**
```typescript
const selected = this.fileManager?.getSelectedFiles();
console.log(selected);  // [{name: 'file1.txt', size: 1024, ...}, ...]
```

---

### Toolbar Management

#### `enableToolbarItems(items: string[]): void`
Enables specified toolbar items.

**Parameters:**
- `items`: Array of toolbar item names

**Example:**
```typescript
this.fileManager?.enableToolbarItems(['Delete', 'Download', 'Rename']);
```

---

#### `disableToolbarItems(items: string[]): void`
Disables specified toolbar items.

**Parameters:**
- `items`: Array of toolbar item names

**Example:**
```typescript
this.fileManager?.disableToolbarItems(['Delete', 'Upload']);
```

---

#### `getToolbarItemIndex(item: string): number`
Gets the index position of a toolbar item.

**Parameters:**
- `item`: Toolbar item name

**Returns:** Index position (number)

**Example:**
```typescript
const index = this.fileManager?.getToolbarItemIndex('Download');
console.log('Download item index:', index);
```

---

### Context Menu Management

#### `enableMenuItems(items: string[]): void`
Enables specified context menu items.

**Parameters:**
- `items`: Array of context menu item names

**Example:**
```typescript
this.fileManager?.enableMenuItems(['Cut', 'Copy', 'Delete']);
```

---

#### `disableMenuItems(items: string[]): void`
Disables specified context menu items.

**Parameters:**
- `items`: Array of context menu item names

**Example:**
```typescript
this.fileManager?.disableMenuItems(['Cut', 'Paste']);
```

---

#### `getMenuItemIndex(item: string): number`
Gets the index position of a context menu item.

**Parameters:**
- `item`: Context menu item name

**Returns:** Index position (number)

**Example:**
```typescript
const index = this.fileManager?.getMenuItemIndex('Rename');
```

---

### Dialog Management

#### `closeDialog(): void`
Closes any open dialogs (rename, delete confirmation, etc.)

**Example:**
```typescript
this.fileManager?.closeDialog();
```

---

### Filtering

#### `filterFiles(filterData?: Object): void`
Applies custom file filtering.

**Parameters:**
- `filterData` (optional): Filter criteria object with custom action and filter details

**Example:**
```typescript
this.fileManager?.filterFiles({
  action: 'filter',
  filterData: {
    extension: '.pdf',
    searchTerm: 'report'
  }
});
```

---

### Component Lifecycle

#### `destroy(): void`
Destroys the File Manager component and cleans up resources.

**Example:**
```typescript
this.fileManager?.destroy();
```

---

## Event Handling

### Selection Events

#### `fileSelect`
Fires when a file/folder is selected or deselected.

**Event Args:**
```typescript
interface FileSelectEventArgs {
  fileDetails: FileData[];      // Array of selected files
  isSelectAll: boolean;          // Whether all items selected
}
```

**Example:**
```typescript
(fileSelect)='onFileSelect($event)'

onFileSelect(args: FileSelectEventArgs) {
  console.log('Selected count:', args.fileDetails.length);
  console.log('Is select all:', args.isSelectAll);
}
```

---

#### `fileSelection`
Fires **before** file selection (can prevent selection).

**Event Args:**
```typescript
interface FileSelectionEventArgs {
  cancel: boolean;              // Set to true to prevent selection
  fileDetails: FileData[];       // Files about to be selected
}
```

**Example:**
```typescript
(fileSelection)='onFileSelection($event)'

onFileSelection(args: FileSelectionEventArgs) {
  // Prevent selecting system files
  if (args.fileDetails[0]?.name.startsWith('.')) {
    args.cancel = true;
  }
}
```

---

### File Opening

#### `fileOpen`
Fires **before** opening a file/folder (double-click or Enter).

**Event Args:**
```typescript
interface FileOpenEventArgs {
  cancel: boolean;              // Set to true to prevent opening
  fileDetails: FileData;         // File being opened
}
```

**Example:**
```typescript
(fileOpen)='onFileOpen($event)'

onFileOpen(args: FileOpenEventArgs) {
  console.log('Opening:', args.fileDetails.name);
}
```

---

#### `fileLoad`
Fires **before** rendering each file/folder in the view.

**Event Args:**
```typescript
interface FileLoadEventArgs {
  fileDetails: FileData;         // File being rendered
  isFolder: boolean;             // Whether item is folder
}
```

**Example:**
```typescript
(fileLoad)='onFileLoad($event)'

onFileLoad(args: FileLoadEventArgs) {
  // Customize display for specific files
  if (args.fileDetails.type === '.exe') {
    // Add warning indicator
  }
}
```

---

### File Deletion

#### `beforeDelete`
Fires **before** deleting files/folders (can prevent deletion).

**Event Args:**
```typescript
interface DeleteEventArgs {
  cancel: boolean;              // Set to true to prevent deletion
  fileDetails: FileData[];       // Files to be deleted
}
```

**Example:**
```typescript
(beforeDelete)='onBeforeDelete($event)'

onBeforeDelete(args: DeleteEventArgs) {
  if (args.fileDetails.some(f => f.name === 'protected.file')) {
    args.cancel = true;
    alert('Cannot delete protected file');
  }
}
```

---

#### `delete`
Fires **after** successful deletion.

**Event Args:**
```typescript
interface DeleteEventArgs {
  fileDetails: FileData[];       // Deleted files
}
```

**Example:**
```typescript
(delete)='onDelete($event)'

onDelete(args: DeleteEventArgs) {
  console.log('Deleted:', args.fileDetails.map(f => f.name));
}
```

---

### File Renaming

#### `beforeRename`
Fires **before** renaming (can prevent rename).

**Event Args:**
```typescript
interface RenameEventArgs {
  cancel: boolean;              // Set to true to prevent rename
  fileDetails: FileData;         // File being renamed
  newName: string;              // New name
}
```

**Example:**
```typescript
(beforeRename)='onBeforeRename($event)'

onBeforeRename(args: RenameEventArgs) {
  const invalidChars = /[<>:"|?*]/;
  if (invalidChars.test(args.newName)) {
    args.cancel = true;
  }
}
```

---

### Folder Creation

#### `beforeFolderCreate`
Fires **before** creating a folder (can prevent creation).

**Event Args:**
```typescript
interface FolderCreateEventArgs {
  cancel: boolean;              // Set to true to prevent creation
  folderName: string;           // New folder name
}
```

**Example:**
```typescript
(beforeFolderCreate)='onBeforeFolderCreate($event)'

onBeforeFolderCreate(args: FolderCreateEventArgs) {
  if (args.folderName.length === 0) {
    args.cancel = true;
  }
}
```

---

#### `folderCreate`
Fires **after** successful folder creation.

**Event Args:**
```typescript
interface FolderCreateEventArgs {
  folderName: string;           // Created folder name
}
```

**Example:**
```typescript
(folderCreate)='onFolderCreate($event)'

onFolderCreate(args: FolderCreateEventArgs) {
  console.log('Folder created:', args.folderName);
}
```

---

### File Movement

#### `beforeMove`
Fires **before** moving files (cut/paste or drag-drop).

**Event Args:**
```typescript
interface MoveEventArgs {
  cancel: boolean;              // Set to true to prevent move
  source: string;              // Source path
  target: string;              // Target path
}
```

**Example:**
```typescript
(beforeMove)='onBeforeMove($event)'

onBeforeMove(args: MoveEventArgs) {
  // Prevent moving to certain folders
  if (args.target === '/System') {
    args.cancel = true;
  }
}
```

---

### Drag and Drop

#### `fileDragStart`
Fires when drag operation starts.

**Event Args:**
```typescript
interface FileDragEventArgs {
  fileDetails: FileData[];       // Files being dragged
  data: any;                     // Drag data
}
```

**Example:**
```typescript
(fileDragStart)='onDragStart($event)'

onDragStart(args: FileDragEventArgs) {
  console.log('Dragging:', args.fileDetails.map(f => f.name));
}
```

---

#### `fileDragging`
Fires while dragging files.

**Event Args:**
```typescript
interface FileDragEventArgs {
  fileDetails: FileData[];       // Files being dragged
  targetData: FileData;          // Current target folder
}
```

**Example:**
```typescript
(fileDragging)='onDragging($event)'

onDragging(args: FileDragEventArgs) {
  // Update UI based on drag over
}
```

---

#### `fileDragStop`
Fires **before** dropping (can prevent drop).

**Event Args:**
```typescript
interface FileDragEventArgs {
  cancel: boolean;              // Set to true to prevent drop
  fileDetails: FileData[];       // Files being dropped
  targetData: FileData;          // Drop target folder
}
```

**Example:**
```typescript
(fileDragStop)='onBeforeDrop($event)'

onBeforeDrop(args: FileDragEventArgs) {
  // Prevent dropping into read-only folders
  if (args.targetData?.permission?.write === false) {
    args.cancel = true;
  }
}
```

---

#### `fileDropped`
Fires **after** successful drop.

**Event Args:**
```typescript
interface FileDragEventArgs {
  fileDetails: FileData[];       // Dropped files
  targetData: FileData;          // Drop target folder
}
```

**Example:**
```typescript
(fileDropped)='onAfterDrop($event)'

onAfterDrop(args: FileDragEventArgs) {
  console.log('Dropped into:', args.targetData.name);
}
```

---

### Server Communication

#### `beforeSend`
Fires **before** sending AJAX request (can customize request).

**Event Args:**
```typescript
interface BeforeSendEventArgs {
  ajaxSettings: {
    beforeSend: Function          // Modify HTTP request
  };
}
```

**Example:**
```typescript
(beforeSend)='onBeforeSend($event)'

onBeforeSend(args: BeforeSendEventArgs) {
  args.ajaxSettings.beforeSend = (requestArgs: any) => {
    requestArgs.httpRequest.setRequestHeader('Authorization', 'Bearer token');
  };
}
```

---

#### `success`
Fires **after** successful AJAX response.

**Event Args:**
```typescript
interface SuccessEventArgs {
  action: string;               // Operation: read, create, delete, etc.
  result: any;                  // Server response data
}
```

**Example:**
```typescript
(success)='onSuccess($event)'

onSuccess(args: SuccessEventArgs) {
  console.log(`${args.action} succeeded`, args.result);
}
```

---

#### `failure`
Fires when AJAX request fails.

**Event Args:**
```typescript
interface FailureEventArgs {
  action: string;               // Failed operation
  error: {
    statusCode: number;
    statusText: string;
    message: string;
  };
}
```

**Example:**
```typescript
(failure)='onFailure($event)'

onFailure(args: FailureEventArgs) {
  console.error(`${args.action} failed:`, args.error.message);
}
```

---

#### `beforeDownload`
Fires **before** download request.

**Event Args:**
```typescript
interface BeforeDownloadEventArgs {
  fileDetails: FileData[];       // Files to download
}
```

**Example:**
```typescript
(beforeDownload)='onBeforeDownload($event)'

onBeforeDownload(args: BeforeDownloadEventArgs) {
  console.log('Downloading:', args.fileDetails);
}
```

---

#### `beforeImageLoad`
Fires **before** loading image thumbnails.

**Event Args:**
```typescript
interface BeforeImageLoadEventArgs {
  fileDetails: FileData;         // Image file
  imageUrl: string;              // Image URL
}
```

**Example:**
```typescript
(beforeImageLoad)='onBeforeImageLoad($event)'

onBeforeImageLoad(args: BeforeImageLoadEventArgs) {
  // Customize image loading
}
```

---

### Dialog Events

#### `beforePopupOpen`
Fires **before** opening dialogs (can prevent opening).

**Event Args:**
```typescript
interface BeforePopupOpenCloseEventArgs {
  cancel: boolean;              // Set to true to prevent opening
  popupType: string;            // 'Delete', 'Rename', 'Create', etc.
}
```

**Example:**
```typescript
(beforePopupOpen)='onBeforePopupOpen($event)'

onBeforePopupOpen(args: BeforePopupOpenCloseEventArgs) {
  if (args.popupType === 'Delete' && this.isReadOnly) {
    args.cancel = true;
  }
}
```

---

#### `beforePopupClose`
Fires **before** closing dialogs.

**Event Args:**
```typescript
interface BeforePopupOpenCloseEventArgs {
  popupType: string;            // Dialog type being closed
}
```

**Example:**
```typescript
(beforePopupClose)='onBeforePopupClose($event)'

onBeforePopupClose(args: BeforePopupOpenCloseEventArgs) {
  console.log('Closing:', args.popupType);
}
```

---

#### `popupOpen`
Fires **after** a dialog is opened (informational, cannot prevent).

**Event Args:**
```typescript
interface PopupOpenCloseEventArgs {
  element: HTMLElement;         // Dialog element
  popupModule: Dialog;          // Dialog component instance
  popupName: string;            // Dialog action name ('Rename', 'Delete', 'Create', etc.)
}
```

**Example:**
```typescript
(popupOpen)='onPopupOpen($event)'

onPopupOpen(args: PopupOpenCloseEventArgs) {
  console.log('Dialog opened:', args.popupName);
  // Perform actions after dialog opens
}
```

---

#### `popupClose`
Fires **after** a dialog is closed (informational).

**Event Args:**
```typescript
interface PopupOpenCloseEventArgs {
  element: HTMLElement;         // Dialog element
  popupModule: Dialog;          // Dialog component instance
  popupName: string;            // Dialog action name
}
```

**Example:**
```typescript
(popupClose)='onPopupClose($event)'

onPopupClose(args: PopupOpenCloseEventArgs) {
  console.log('Dialog closed:', args.popupName);
  // Perform actions after dialog closes
}
```

---

### Context Menu Events

#### `menuOpen`
Fires **before** opening context menu.

**Event Args:**
```typescript
interface MenuOpenEventArgs {
  fileContextMenu: any;         // Context menu instance
  fileDetails: FileData[];       // Right-clicked files
}
```

**Example:**
```typescript
(menuOpen)='onMenuOpen($event)'

onMenuOpen(args: MenuOpenEventArgs) {
  // Hide/show menu items based on selection
}
```

---

#### `menuClose`
Fires **before** closing context menu.

**Event Args:**
```typescript
interface MenuCloseEventArgs {
  fileDetails: FileData[];       // Files affected
}
```

---

#### `menuClick`
Fires when context menu item is clicked.

**Event Args:**
```typescript
interface MenuClickEventArgs {
  itemText: string;             // Menu item text
  fileDetails: FileData[];       // Affected files
}
```

**Example:**
```typescript
(menuClick)='onMenuClick($event)'

onMenuClick(args: MenuClickEventArgs) {
  if (args.itemText === 'Custom Action') {
    // Handle custom action
  }
}
```

---

### Toolbar Events

#### `toolbarCreate`
Fires when toolbar is created (can customize toolbar).

**Event Args:**
```typescript
interface ToolbarCreateEventArgs {
  items: any[];                 // Toolbar items
}
```

**Example:**
```typescript
(toolbarCreate)='onToolbarCreate($event)'

onToolbarCreate(args: ToolbarCreateEventArgs) {
  // Add custom toolbar items
}
```

---

#### `toolbarClick`
Fires when toolbar item is clicked.

**Event Args:**
```typescript
interface ToolbarClickEventArgs {
  item: {
    id: string;
    text: string;
  };
}
```

**Example:**
```typescript
(toolbarClick)='onToolbarClick($event)'

onToolbarClick(args: ToolbarClickEventArgs) {
  if (args.item?.id === 'custom-button') {
    this.handleCustomAction();
  }
}
```

---

### Upload Events

#### `uploadListCreate`
Fires before rendering each file item in the upload dialog.

**Event Args:**
```typescript
interface UploadListCreateArgs {
  element: HTMLElement;         // Current file item element
  fileInfo: FileInfo;           // File data object
  index: number;                // Index in file list
  isPreload: boolean;           // Whether file is preloaded
}
```

**Example:**
```typescript
(uploadListCreate)='onUploadListCreate($event)'

onUploadListCreate(args: UploadListCreateArgs) {
  console.log('Rendering upload item:', args.fileInfo?.name);
  // Customize upload list appearance
  if (args.fileInfo?.size > 5000000) {
    // Add warning for large files
    args.element?.classList.add('large-file-warning');
  }
}
```

---

### Component Lifecycle Events

#### `created`
Fires when File Manager component is created and initialized.

**Event Args:** Object (empty)

**Example:**
```typescript
(created)='onCreate($event)'

onCreate(args: any) {
  console.log('File Manager initialized');
  // Initialize custom features
}
```

---

#### `destroyed`
Fires when File Manager component is destroyed.

**Event Args:** Object (empty)

**Example:**
```typescript
(destroyed)='onDestroy($event)'

onDestroy(args: any) {
  console.log('File Manager destroyed');
  // Cleanup resources
}
```

---

## Event Arguments

### Complete Event Argument Interfaces

```typescript
// File selection
interface FileSelectEventArgs {
  fileDetails: FileData[];
  isSelectAll: boolean;
}

interface FileSelectionEventArgs {
  cancel: boolean;
  fileDetails: FileData[];
}

// File operations
interface DeleteEventArgs {
  cancel?: boolean;
  fileDetails: FileData[];
}

interface RenameEventArgs {
  cancel?: boolean;
  fileDetails: FileData;
  newName: string;
}

// Drag and drop
interface FileDragEventArgs {
  cancel?: boolean;
  fileDetails: FileData[];
  targetData?: FileData;
  data?: any;
}

// Server communication
interface BeforeSendEventArgs {
  ajaxSettings: any;
}

interface SuccessEventArgs {
  action: string;
  result: any;
}

interface FailureEventArgs {
  action: string;
  error: {
    statusCode: number;
    statusText: string;
    message: string;
  };
}

// Dialogs
interface BeforePopupOpenCloseEventArgs {
  cancel?: boolean;
  popupType: string;
}

// Context menu
interface MenuOpenEventArgs {
  fileContextMenu: any;
  fileDetails: FileData[];
}

interface MenuClickEventArgs {
  itemText: string;
  fileDetails: FileData[];
}

// Toolbar
interface ToolbarClickEventArgs {
  item: {
    id: string;
    text: string;
    prefixIcon?: string;
  };
}

// Upload
interface UploadListCreateArgs {
  element: HTMLElement;
  fileInfo: FileInfo;
  index: number;
  isPreload: boolean;
}
```

