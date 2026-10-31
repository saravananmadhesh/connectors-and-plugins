# Access Control and Permissions in Syncfusion Angular File Manager

## Overview

Access control allows you to restrict user actions by defining permissions for files and folders. The FileManager component can be configured to show or hide files/folders and enable/disable operations based on user permissions.

## Table of Contents
- [Permission Model](#permission-model)
- [Implementing Role-Based Access](#implementing-role-based-access)
- [File-Level Permissions](#file-level-permissions)
- [Backend Permission Rules](#backend-permission-rules)
- [Frontend Permission Handling](#frontend-permission-handling)
- [Examples](#examples)

---

## Permission Model

### FileData Permission Structure

The FileData interface includes a `permission` object that defines access control:

```typescript
interface FileData {
  id: string | number;
  name: string;
  isFile: boolean;
  permission?: {
    read?: boolean;              // Can read/view file
    readContent?: boolean;       // Can read file contents
    write?: boolean;             // Can modify file
    writeContent?: boolean;      // Can modify folder contents
    delete?: boolean;            // Can delete file
    download?: boolean;          // Can download file
    upload?: boolean;            // Can upload to folder
    copy?: boolean;              // Can copy file
  };
}
```

### Permission Values

| Value | Meaning |
|-------|---------|
| `true` | Operation is allowed |
| `false` | Operation is denied |
| `undefined` | No restriction (allow by default) |

---

## Implementing Role-Based Access

### 1. Backend Implementation (ASP.NET Core Example)

Define access rules based on user roles:

```csharp
public class AccessRule
{
    public string Path { get; set; }
    public string Role { get; set; }
    public Permission Read { get; set; }
    public Permission Write { get; set; }
    public Permission Copy { get; set; }
    public Permission WriteContents { get; set; }
    public Permission Upload { get; set; }
    public Permission Download { get; set; }
    public bool IsFile { get; set; }
}

public enum Permission
{
    Allow = 1,
    Deny = 2
}

// Configure rules for Administrator
var adminRules = new List<AccessRule>
{
    new AccessRule 
    { 
        Path = "/*.*", 
        Role = "Administrator", 
        Read = Permission.Allow, 
        Write = Permission.Allow,
        Copy = Permission.Allow, 
        Download = Permission.Allow, 
        IsFile = true 
    },
    new AccessRule 
    { 
        Path = "*", 
        Role = "Administrator", 
        Read = Permission.Allow, 
        Write = Permission.Allow,
        Copy = Permission.Allow, 
        WriteContents = Permission.Allow, 
        Upload = Permission.Allow, 
        Download = Permission.Allow, 
        IsFile = false 
    }
};

// Configure rules for Read-Only User
var readOnlyRules = new List<AccessRule>
{
    new AccessRule 
    { 
        Path = "/*.*", 
        Role = "ReadOnly User", 
        Read = Permission.Allow, 
        Write = Permission.Deny,
        Copy = Permission.Deny, 
        Download = Permission.Allow, 
        IsFile = true 
    },
    new AccessRule 
    { 
        Path = "*", 
        Role = "ReadOnly User", 
        Read = Permission.Allow, 
        Write = Permission.Deny,
        Copy = Permission.Deny, 
        WriteContents = Permission.Deny, 
        Upload = Permission.Deny, 
        Download = Permission.Allow, 
        IsFile = false 
    }
};
```

### 2. Apply Permissions to FileData

```csharp
[HttpPost("FileOperations")]
public IActionResult FileOperations(string path, string action, [FromHeader] string userRole)
{
    try
    {
        switch(action.ToLower())
        {
            case "read":
                var files = GetFiles(path);
                var accessRules = GetAccessRulesForRole(userRole);
                
                // Apply permissions to each file
                foreach(var file in files)
                {
                    var rule = accessRules.FirstOrDefault(r => MatchesPath(file.Path, r.Path));
                    if(rule != null)
                    {
                        file.Permission = new 
                        {
                            read = rule.Read == Permission.Allow,
                            write = rule.Write == Permission.Allow,
                            delete = rule.Write == Permission.Allow,
                            download = rule.Download == Permission.Allow,
                            upload = rule.Upload == Permission.Allow,
                            copy = rule.Copy == Permission.Allow
                        };
                    }
                }
                
                return Ok(files);
                
            default:
                return BadRequest();
        }
    }
    catch(Exception ex)
    {
        return StatusCode(500, new { error = ex.Message });
    }
}
```

---

## File-Level Permissions

### Denying Specific Operations

Restrict operations for specific folders or file types:

```csharp
// Deny write permission for system files
new AccessRule 
{ 
    Path = "/System/*.*", 
    Role = "User", 
    Read = Permission.Allow, 
    Write = Permission.Deny, 
    IsFile = true 
},

// Deny upload to specific folder
new AccessRule 
{ 
    Path = "/ReadOnlyFolder", 
    Role = "User", 
    Read = Permission.Allow, 
    WriteContents = Permission.Deny, 
    Upload = Permission.Deny, 
    IsFile = false 
},

// Deny download for sensitive files
new AccessRule 
{ 
    Path = "/Confidential/*.pdf", 
    Role = "User", 
    Read = Permission.Allow, 
    Download = Permission.Deny, 
    IsFile = true 
}
```

### Granting Specific Permissions

Allow specific operations while denying others:

```csharp
// Allow read and download only
new AccessRule 
{ 
    Path = "/*.*", 
    Role = "ReadOnly User", 
    Read = Permission.Allow, 
    Write = Permission.Deny,
    Download = Permission.Allow, 
    Copy = Permission.Deny, 
    IsFile = true 
},

// Allow folder navigation and listing only
new AccessRule 
{ 
    Path = "*", 
    Role = "Viewer", 
    Read = Permission.Allow, 
    WriteContents = Permission.Deny, 
    Upload = Permission.Deny, 
    Download = Permission.Deny, 
    IsFile = false 
}
```

---

## Backend Permission Rules

### Complete ASP.NET Core Permission Handler

```csharp
public interface IPermissionService
{
    List<AccessRule> GetRulesForRole(string role);
    bool CheckPermission(string filePath, string permission, string userRole);
}

public class PermissionService : IPermissionService
{
    private readonly Dictionary<string, List<AccessRule>> _roleRules;
    
    public PermissionService()
    {
        _roleRules = new Dictionary<string, List<AccessRule>>
        {
            ["Administrator"] = GetAdministratorRules(),
            ["Editor"] = GetEditorRules(),
            ["Viewer"] = GetViewerRules()
        };
    }
    
    public List<AccessRule> GetRulesForRole(string role)
    {
        return _roleRules.ContainsKey(role) ? _roleRules[role] : new List<AccessRule>();
    }
    
    public bool CheckPermission(string filePath, string permission, string userRole)
    {
        var rules = GetRulesForRole(userRole);
        var rule = rules.FirstOrDefault(r => MatchesPath(filePath, r.Path));
        
        if(rule == null) return true; // No rule = allow by default
        
        return permission switch
        {
            "read" => rule.Read == Permission.Allow,
            "write" => rule.Write == Permission.Allow,
            "delete" => rule.Write == Permission.Allow,
            "download" => rule.Download == Permission.Allow,
            "upload" => rule.Upload == Permission.Allow,
            "copy" => rule.Copy == Permission.Allow,
            _ => false
        };
    }
    
    private bool MatchesPath(string filePath, string rulePath)
    {
        // Wildcard matching logic
        if(rulePath == "*" || rulePath == "/*.*") return true;
        if(rulePath.EndsWith("/*")) return filePath.StartsWith(rulePath.TrimEnd('*'));
        return filePath == rulePath;
    }
    
    private List<AccessRule> GetAdministratorRules()
    {
        return new List<AccessRule>
        {
            new AccessRule { Path = "/*.*", Role = "Administrator", Read = Permission.Allow, 
                Write = Permission.Allow, Copy = Permission.Allow, Download = Permission.Allow, IsFile = true },
            new AccessRule { Path = "*", Role = "Administrator", Read = Permission.Allow, 
                Write = Permission.Allow, WriteContents = Permission.Allow, Upload = Permission.Allow, 
                Download = Permission.Allow, IsFile = false }
        };
    }
    
    private List<AccessRule> GetEditorRules()
    {
        return new List<AccessRule>
        {
            new AccessRule { Path = "/Public/*.*", Role = "Editor", Read = Permission.Allow, 
                Write = Permission.Allow, Copy = Permission.Allow, Download = Permission.Allow, IsFile = true },
            new AccessRule { Path = "/Confidential/*.*", Role = "Editor", Read = Permission.Allow, 
                Write = Permission.Deny, Copy = Permission.Deny, Download = Permission.Allow, IsFile = true }
        };
    }
    
    private List<AccessRule> GetViewerRules()
    {
        return new List<AccessRule>
        {
            new AccessRule { Path = "/*.*", Role = "Viewer", Read = Permission.Allow, 
                Write = Permission.Deny, Copy = Permission.Deny, Download = Permission.Allow, IsFile = true }
        };
    }
}

// Usage in FileManagerController
[ApiController]
[Route("api/[controller]")]
public class FileManagerController : ControllerBase
{
    private readonly IPermissionService _permissionService;
    
    public FileManagerController(IPermissionService permissionService)
    {
        _permissionService = permissionService;
    }
    
    [HttpPost("FileOperations")]
    public IActionResult FileOperations(
        [FromBody] FileRequest request,
        [FromHeader] string userRole = "Viewer")
    {
        try
        {
            // Check if user has read permission for path
            if(!_permissionService.CheckPermission(request.Path, "read", userRole))
            {
                return Forbid("You don't have permission to read this folder");
            }
            
            // Process file operation...
            return Ok();
        }
        catch(Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
}
```

---

## Frontend Permission Handling

### Disabling UI Elements Based on Permissions

```typescript
import { Component, ViewChild } from '@angular/core';
import { FileManagerComponent } from '@syncfusion/ej2-angular-filemanager';
import { FileSelectEventArgs, MenuClickEventArgs } from '@syncfusion/ej2-filemanager';

@Component({
  selector: 'app-file-manager',
  template: `<ejs-filemanager 
    #fileManager
    [ajaxSettings]='ajaxSettings'
    [toolbarSettings]='toolbarSettings'
    [contextMenuSettings]='contextMenuSettings'
    (fileSelect)='onFileSelect($event)'
    (beforeDelete)='onBeforeDelete($event)'
    (menuClick)='onMenuClick($event)'>
  </ejs-filemanager>`
})
export class AppComponent implements AfterViewInit {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download',
    getImageUrl: '/api/FileManager/GetImage'
  };
  
  toolbarSettings = {
    items: ['NewFolder', 'Upload', 'Delete', 'Download', 'Rename']
  };
  
  contextMenuSettings = {
    file: ['Download', 'Copy'],
    folder: ['NewFolder', 'Paste'],
    layout: ['Refresh', 'NewFolder']
  };
  
  ngAfterViewInit() {
    // Disable toolbar items based on user permissions
    const currentUser = this.getCurrentUser();
    if(currentUser.role === 'Viewer') {
      this.fileManager?.disableToolbarItems(['Upload', 'Delete', 'Rename']);
    }
  }
  
  onFileSelect(args: FileSelectEventArgs) {
    // Update UI based on selected file permissions
    const selectedFile = args.fileDetails[0];
    if(selectedFile.permission?.write === false) {
      this.fileManager?.disableToolbarItems(['Delete', 'Rename']);
    } else {
      this.fileManager?.enableToolbarItems(['Delete', 'Rename']);
    }
  }
  
  onBeforeDelete(args: any) {
    // Prevent deletion if user doesn't have permission
    if(args.fileDetails[0].permission?.delete === false) {
      args.cancel = true;
      alert('You do not have permission to delete this file');
    }
  }
  
  onMenuClick(args: MenuClickEventArgs) {
    const selectedFile = this.fileManager?.selectedItems[0];
    if(args.itemText === 'Delete' && selectedFile?.permission?.delete === false) {
      alert('You do not have permission to delete this file');
    }
  }
  
  private getCurrentUser() {
    // Get from localStorage or auth service
    return {
      name: 'John Doe',
      role: 'Editor'
    };
  }
}
```

### Sending User Role to Backend

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  onBeforeSend(args: any) {
    // Add user role to request headers
    const userRole = this.getUserRole();
    args.ajaxSettings.beforeSend = (request: any) => {
      request.httpRequest.setRequestHeader('UserRole', userRole);
      request.httpRequest.setRequestHeader('UserId', this.getUserId());
    };
  }
  
  private getUserRole(): string {
    // Get from JWT token or auth service
    return localStorage.getItem('userRole') || 'Viewer';
  }
  
  private getUserId(): string {
    return localStorage.getItem('userId') || '0';
  }
}
```

---

## Examples

### Example 1: Content Manager with Role-Based Access

```typescript
@Component({
  selector: 'app-content-manager',
  template: `<div>
    <h2>Content Manager ({{ userRole }})</h2>
    <ejs-filemanager 
      #fileManager
      [ajaxSettings]='ajaxSettings'
      [toolbarSettings]='toolbarSettings'
      (beforeSend)='onBeforeSend($event)'
      height="500px">
    </ejs-filemanager>
  </div>`
})
export class ContentManagerComponent implements OnInit {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  userRole = 'Editor';
  
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  toolbarSettings = {
    items: ['NewFolder', 'Upload', 'Delete', 'Download']
  };
  
  ngOnInit() {
    this.setupPermissions();
  }
  
  onBeforeSend(args: any) {
    args.ajaxSettings.beforeSend = (request: any) => {
      request.httpRequest.setRequestHeader('UserRole', this.userRole);
    };
  }
  
  private setupPermissions() {
    setTimeout(() => {
      if(this.userRole === 'Viewer') {
        this.fileManager?.disableToolbarItems(['Upload', 'Delete']);
      }
    }, 100);
  }
}
```

### Example 2: Prevent Sensitive File Operations

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeDelete)='onBeforeDelete($event)'
    (beforeMove)='onBeforeMove($event)'>
  </ejs-filemanager>`
})
export class SecureFileManagerComponent {
  ajaxSettings = {
    url: '/api/FileManager/FileOperations'
  };
  
  onBeforeDelete(args: any) {
    // Prevent deletion of system files
    if(args.fileDetails[0].name.startsWith('.')) {
      args.cancel = true;
      alert('Cannot delete system files');
    }
    
    // Check permissions from FileData
    if(args.fileDetails[0].permission?.delete === false) {
      args.cancel = true;
      alert('You do not have permission to delete this file');
    }
  }
  
  onBeforeMove(args: any) {
    // Prevent moving to restricted folders
    if(args.path === '/System') {
      args.cancel = true;
      alert('Cannot move files to System folder');
    }
  }
}
```

---

## Best Practices

1. **Always validate permissions on backend** - Never rely solely on frontend permission checks
2. **Use JWT tokens** - Send authorization tokens with requests for secure authentication
3. **Log access attempts** - Track who accessed/modified what and when
4. **Implement role hierarchy** - Create roles with inheritance (Admin > Editor > Viewer)
5. **Cache permissions** - Store user permissions client-side for better performance
6. **Handle permission errors gracefully** - Show friendly messages instead of technical errors
7. **Review permissions regularly** - Audit access rules for security compliance

---

**Next:** Implement custom authentication at [authentication-patterns.md](authentication-patterns.md) or manage data structures at [data-structures.md](data-structures.md).
