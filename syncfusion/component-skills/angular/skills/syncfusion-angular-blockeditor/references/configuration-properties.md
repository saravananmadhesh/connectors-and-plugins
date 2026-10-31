# Configuration Properties

## Table of Contents
- [Overview](#overview)
- [Styling Properties](#styling-properties)
- [Security Properties](#security-properties)
- [Users and Labels](#users-and-labels)

## Overview

The Block Editor provides configuration properties for controlling appearance, behavior, and security. These properties are set during editor initialization.

---

## Styling Properties

### cssClass Property

**Type:** `string`

**Default Value:** `""`

**Description:** Specifies one or more CSS class names to be added to the editor's root element. This allows for custom styling and theming of the editor.

**Syntax:**
```typescript
[cssClass]="'custom-class'"
```

**Use Cases:**
- Apply custom themes
- Add specific styling for different contexts
- Implement dark mode or light mode
- Apply responsive design classes
- Add framework-specific CSS classes (Bootstrap, Tailwind, etc.)

**Basic Example:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <ejs-blockeditor 
      [cssClass]="'custom-editor'">
    </ejs-blockeditor>
  `,
  styles: [`
    ::ng-deep .custom-editor {
      border: 2px solid #4CAF50;
      border-radius: 8px;
    }
  `]
})
export class AppComponent {}
```

**Multiple Classes:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <ejs-blockeditor 
      [cssClass]="'custom-editor dark-theme bordered'">
    </ejs-blockeditor>
  `,
  styles: [`
    ::ng-deep .custom-editor.dark-theme {
      background-color: #1e1e1e;
      color: #ffffff;
    }
    
    ::ng-deep .custom-editor.bordered {
      border: 1px solid #444;
      padding: 16px;
    }
  `]
})
export class AppComponent {}
```

**Dynamic Theme Switching:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-theming',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <button (click)="toggleTheme()">Toggle Theme</button>
    <ejs-blockeditor 
      [cssClass]="editorClasses">
    </ejs-blockeditor>
  `,
  styles: [`
    ::ng-deep .light-theme {
      background-color: #ffffff;
      color: #000000;
    }
    
    ::ng-deep .dark-theme {
      background-color: #1e1e1e;
      color: #ffffff;
    }
  `]
})
export class ThemingComponent {
  public isDarkMode = false;
  public editorClasses = 'light-theme';
  
  public toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.editorClasses = this.isDarkMode ? 'dark-theme' : 'light-theme';
  }
}
```

**Framework Integration Examples:**

```typescript
// Bootstrap Integration
@Component({
  template: `
    <ejs-blockeditor 
      [cssClass]="'border border-primary rounded shadow-sm p-3'">
    </ejs-blockeditor>
  `
})
export class BootstrapComponent {}

// Tailwind CSS Integration
@Component({
  template: `
    <ejs-blockeditor 
      [cssClass]="'border-2 border-blue-500 rounded-lg shadow-md p-4'">
    </ejs-blockeditor>
  `
})
export class TailwindComponent {}

// Material Design Integration
@Component({
  template: `
    <ejs-blockeditor 
      [cssClass]="'mat-elevation-z4 mat-app-background'">
    </ejs-blockeditor>
  `
})
export class MaterialComponent {}
```

**Responsive Design:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-responsive',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <ejs-blockeditor 
      [cssClass]="'responsive-editor'">
    </ejs-blockeditor>
  `,
  styles: [`
    ::ng-deep .responsive-editor {
      max-width: 100%;
      margin: 0 auto;
    }
    
    @media (min-width: 768px) {
      ::ng-deep .responsive-editor {
        max-width: 800px;
      }
    }
    
    @media (max-width: 767px) {
      ::ng-deep .responsive-editor {
        padding: 8px;
        font-size: 14px;
      }
    }
  `]
})
export class ResponsiveComponent {}
```

**Context-Based Styling:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-context-styling',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <div class="editor-container">
      <!-- Admin Editor -->
      <ejs-blockeditor 
        [cssClass]="'admin-editor'">
      </ejs-blockeditor>
      
      <!-- User Editor -->
      <ejs-blockeditor 
        [cssClass]="'user-editor'">
      </ejs-blockeditor>
      
      <!-- Read-Only Viewer -->
      <ejs-blockeditor 
        [cssClass]="'viewer-mode'">
      </ejs-blockeditor>
    </div>
  `,
  styles: [`
    ::ng-deep .admin-editor {
      border: 2px solid #4CAF50;
      box-shadow: 0 4px 6px rgba(76, 175, 80, 0.2);
    }
    
    ::ng-deep .user-editor {
      border: 1px solid #ccc;
    }
    
    ::ng-deep .viewer-mode {
      background-color: #f5f5f5;
      pointer-events: none;
      opacity: 0.9;
    }
  `]
})
export class ContextStylingComponent {}
```

---

## Security Properties

### enableHtmlEncode Property

**Type:** `boolean`

**Default Value:** `true`

**Description:** Determines whether HTML content is encoded when pasted into the editor. When enabled, HTML tags in pasted content are converted to their encoded equivalents, preventing script injection and maintaining security.

**Syntax:**
```typescript
[enableHtmlEncode]="true"
```

**Use Cases:**
- Prevent XSS (Cross-Site Scripting) attacks
- Ensure secure content handling
- Control whether pasted HTML is rendered or displayed as text
- Implement security policies

**Security Enabled (Default):**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-secure',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <!-- HTML encoding enabled for security -->
    <ejs-blockeditor 
      [enableHtmlEncode]="true">
    </ejs-blockeditor>
  `
})
export class SecureEditorComponent {}

// When user pastes: <script>alert('XSS')</script>
// Result: &lt;script&gt;alert('XSS')&lt;/script&gt; (encoded, safe)
```

**Security Disabled:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-html-allowed',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <!-- HTML encoding disabled - use with caution -->
    <ejs-blockeditor 
      [enableHtmlEncode]="false">
    </ejs-blockeditor>
  `
})
export class HtmlAllowedEditorComponent {}

// When user pastes: <strong>Bold text</strong>
// Result: <strong>Bold text</strong> (rendered as HTML)
```

**Dynamic Security Configuration:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-security-config',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <div class="security-controls">
      <label>
        <input 
          type="checkbox" 
          [(ngModel)]="htmlEncodeEnabled"
          (change)="onSecurityChange()">
        Enable HTML Encoding (Security)
      </label>
      <p class="warning" *ngIf="!htmlEncodeEnabled">
        ⚠️ Warning: Disabling HTML encoding may expose your application to XSS attacks
      </p>
    </div>
    
    <ejs-blockeditor 
      [enableHtmlEncode]="htmlEncodeEnabled">
    </ejs-blockeditor>
  `
})
export class SecurityConfigComponent {
  public htmlEncodeEnabled = true;
  
  public onSecurityChange(): void {
    if (!this.htmlEncodeEnabled) {
      const confirmed = confirm(
        'Disabling HTML encoding may pose security risks. Continue?'
      );
      if (!confirmed) {
        this.htmlEncodeEnabled = true;
      }
    }
  }
}
```

**Role-Based Security:**

```typescript
import { Component, OnInit } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-role-based',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <ejs-blockeditor 
      [enableHtmlEncode]="securityEnabled">
    </ejs-blockeditor>
  `
})
export class RoleBasedSecurityComponent implements OnInit {
  public securityEnabled = true;
  private userRole = 'viewer'; // 'admin', 'editor', 'viewer'
  
  ngOnInit(): void {
    // Admin users can paste HTML content
    // Other users have HTML encoding enabled for security
    this.securityEnabled = this.userRole !== 'admin';
  }
}
```

**Security Best Practices:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-best-practices',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <!-- Production: Always enable for user-generated content -->
    <ejs-blockeditor 
      [enableHtmlEncode]="true"
      [pasteCleanupSettings]="pasteCleanupConfig">
    </ejs-blockeditor>
  `
})
export class BestPracticesComponent {
  public pasteCleanupConfig = {
    // Additional security through paste cleanup
    deniedTags: ['script', 'iframe', 'object', 'embed'],
    keepFormat: false,
    plainText: false
  };
}
```

**Comparison Table:**

| Scenario | enableHtmlEncode | Security Level | Use Case |
|----------|------------------|----------------|----------|
| Public editor (user content) | `true` | High | Blogs, forums, comments |
| Admin content management | `false` | Low | Trusted admin users only |
| Internal documentation | `true` | Medium-High | Company wiki, docs |
| Template editor (admin) | `false` | Low | Email templates, layouts |

---

## Combined Configuration Example

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-configured-editor',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <ejs-blockeditor 
      [cssClass]="editorClasses"
      [enableHtmlEncode]="securityEnabled"
      [width]="'100%'"
      [height]="'500px'">
    </ejs-blockeditor>
  `,
  styles: [`
    ::ng-deep .premium-editor {
      border: 2px solid #gold;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      background: linear-gradient(to bottom, #ffffff, #f8f8f8);
    }
    
    ::ng-deep .premium-editor.dark-mode {
      background: linear-gradient(to bottom, #1e1e1e, #2d2d2d);
      color: #ffffff;
      border-color: #444;
    }
  `]
})
export class ConfiguredEditorComponent {
  public editorClasses = 'premium-editor';
  public securityEnabled = true;
  
  public applyDarkMode(): void {
    this.editorClasses = 'premium-editor dark-mode';
  }
  
  public applyLightMode(): void {
    this.editorClasses = 'premium-editor';
  }
}
```

---

## Users and Labels

### users Property

**Type:** `UserModel[]`

**Default Value:** `[]`

**Description:** Specifies an array of user models representing editor participants. Enables multiple users to work together with visual identification through avatars, colors, and user cursors.

**Syntax:**
```typescript
[users]="usersArray"
```

**Use Cases:**
- Enable multi-user editing with multiple users
- Display user avatars and cursors
- Track who is editing which block
- Provide visual identification in the editor
- Implement user mentions and tagging

**UserModel Interface:**

```typescript
interface UserModel {
  id: string;              // Unique identifier for the user (required)
  user: string;            // Display name of the user (required)
  avatarBgColor?: string;  // Avatar background color (also used as cursor color)
  avatarUrl?: string;      // URL to user's avatar image
  cssClass?: string;       // Custom CSS class for styling
}
```

**Basic Users Configuration:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule, UserModel } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <ejs-blockeditor 
      [users]="users"
      [blocks]="blocksData">
    </ejs-blockeditor>
  `
})
export class AppComponent {
  public users: UserModel[] = [
    {
      id: 'user1',
      user: 'Alice Johnson',
      avatarBgColor: '#FF5722',
      avatarUrl: 'https://example.com/avatars/alice.jpg'
    },
    {
      id: 'user2',
      user: 'Bob Smith',
      avatarBgColor: '#2196F3'
    },
    {
      id: 'user3',
      user: 'Charlie Davis',
      avatarBgColor: '#4CAF50',
      cssClass: 'admin-user'
    }
  ];
  
  public blocksData = [
    {
      blockType: 'Paragraph',
      content: [{ contentType: 'Text', content: 'Start editing together!' }]
    }
  ];
}
```

**Team Structure Example:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule, UserModel } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-team-editor',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <div class="editor-container">
      <div class="user-panel">
        <h3>Active Users</h3>
        <div *ngFor="let user of users" class="user-card">
          <div class="avatar" [style.backgroundColor]="user.avatarBgColor">
            {{ getUserInitials(user.user) }}
          </div>
          <span>{{ user.user }}</span>
        </div>
      </div>
      
      <ejs-blockeditor 
        [users]="users"
        [blocks]="blocksData">
      </ejs-blockeditor>
    </div>
  `,
  styles: [`
    .editor-container { display: flex; gap: 20px; }
    .user-panel { width: 200px; padding: 15px; background: #f5f5f5; border-radius: 8px; }
    .user-card { display: flex; align-items: center; gap: 10px; padding: 8px; margin-bottom: 8px; }
    .avatar { 
      width: 32px; height: 32px; border-radius: 50%; 
      display: flex; align-items: center; justify-content: center;
      color: white; font-weight: bold; font-size: 12px;
    }
  `]
})
export class TeamEditorComponent {
  public users: UserModel[] = [
    { id: 'user1', user: 'Sarah Wilson', avatarBgColor: '#E91E63' },
    { id: 'user2', user: 'Michael Chen', avatarBgColor: '#9C27B0' },
    { id: 'user3', user: 'Emma Thompson', avatarBgColor: '#FF9800' }
  ];
  
  public blocksData = [
    {
      blockType: 'Heading',
      properties: { level: 1 },
      content: [{ contentType: 'Text', content: 'Team Editor' }]
    }
  ];
  
  public getUserInitials(name: string): string {
    return name.split(' ').map(part => part[0]).join('').toUpperCase();
  }
}
```

**Dynamic User Management:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule, UserModel } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-dynamic-users',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <button (click)="addUser()">Add User</button>
    <button (click)="removeUser('user2')">Remove User</button>
    
    <ejs-blockeditor 
      [users]="users">
    </ejs-blockeditor>
  `
})
export class DynamicUsersComponent {
  public users: UserModel[] = [
    { id: 'user1', user: 'Alice', avatarBgColor: '#FF5722' }
  ];
  
  public addUser(): void {
    const newUser: UserModel = {
      id: `user-${Date.now()}`,
      user: 'New User',
      avatarBgColor: this.getRandomColor()
    };
    this.users = [...this.users, newUser];
  }
  
  public removeUser(userId: string): void {
    this.users = this.users.filter(user => user.id !== userId);
  }
  
  private getRandomColor(): string {
    const colors = ['#FF5722', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
```

---

### labelSettings Property

**Type:** `LabelSettingsModel`

**Default Value:** `{}`

**Description:** Configures the label/tag system using trigger characters for quick insertion. Enables users to add labels for categorization, status tracking, and content organization.

**Syntax:**
```typescript
[labelSettings]="labelConfig"
```

**Use Cases:**
- Quick status tagging using # character
- Categorize content with labels
- Visual identification with colors
- Organize labels into groups
- Implement @ mentions for users
- Track project status and priorities

**LabelSettingsModel Interface:**

```typescript
interface LabelSettingsModel {
  triggerChar?: string;     // Character that triggers label popup (default: '$')
  items?: LabelItemModel[]; // Array of available labels
}

interface LabelItemModel {
  id: string;           // Unique identifier for the label (required)
  text: string;         // Display text for the label (required)
  labelColor?: string;  // Color of the label
  iconCss?: string;     // CSS class for icon
  groupBy?: string;     // Group header for categorization
}
```

**Basic Label Configuration:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule, LabelSettingsModel } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <ejs-blockeditor 
      [labelSettings]="labelSettings"
      [blocks]="blocksData">
    </ejs-blockeditor>
  `
})
export class AppComponent {
  public labelSettings: LabelSettingsModel = {
    triggerChar: '#',
    items: [
      { 
        id: 'bug', 
        text: 'Bug', 
        labelColor: '#ff5252', 
        iconCss: 'icon-bug',
        groupBy: 'Status' 
      },
      { 
        id: 'feature', 
        text: 'Feature', 
        labelColor: '#81c784', 
        iconCss: 'icon-feature',
        groupBy: 'Status' 
      },
      { 
        id: 'task', 
        text: 'Task', 
        labelColor: '#90caf9', 
        iconCss: 'icon-task',
        groupBy: 'Status' 
      }
    ]
  };
  
  public blocksData = [
    {
      blockType: 'Paragraph',
      content: [{ contentType: 'Text', content: 'Type # to add labels' }]
    }
  ];
}
```

**Project Management Labels:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule, LabelSettingsModel } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-project-labels',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <ejs-blockeditor 
      [labelSettings]="projectLabels">
    </ejs-blockeditor>
  `
})
export class ProjectLabelsComponent {
  public projectLabels: LabelSettingsModel = {
    triggerChar: '#',
    items: [
      // Status Labels
      { id: 'todo', text: 'To Do', labelColor: '#9E9E9E', groupBy: 'Status' },
      { id: 'in-progress', text: 'In Progress', labelColor: '#2196F3', groupBy: 'Status' },
      { id: 'review', text: 'In Review', labelColor: '#FF9800', groupBy: 'Status' },
      { id: 'done', text: 'Done', labelColor: '#4CAF50', groupBy: 'Status' },
      
      // Priority Labels
      { id: 'critical', text: 'Critical', labelColor: '#F44336', groupBy: 'Priority' },
      { id: 'high', text: 'High', labelColor: '#FF5722', groupBy: 'Priority' },
      { id: 'medium', text: 'Medium', labelColor: '#FFC107', groupBy: 'Priority' },
      { id: 'low', text: 'Low', labelColor: '#8BC34A', groupBy: 'Priority' },
      
      // Type Labels
      { id: 'bug', text: 'Bug', labelColor: '#E91E63', iconCss: 'icon-bug', groupBy: 'Type' },
      { id: 'feature', text: 'Feature', labelColor: '#9C27B0', iconCss: 'icon-feature', groupBy: 'Type' },
      { id: 'docs', text: 'Documentation', labelColor: '#00BCD4', iconCss: 'icon-docs', groupBy: 'Type' }
    ]
  };
}
```

**Using @ for Mentions:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule, LabelSettingsModel } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-mentions',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <ejs-blockeditor 
      [labelSettings]="mentionSettings">
    </ejs-blockeditor>
  `
})
export class MentionsComponent {
  public mentionSettings: LabelSettingsModel = {
    triggerChar: '@',
    items: [
      { 
        id: 'user1', 
        text: 'Alice Johnson', 
        labelColor: '#FF5722',
        iconCss: 'icon-user',
        groupBy: 'Team Members' 
      },
      { 
        id: 'user2', 
        text: 'Bob Smith', 
        labelColor: '#2196F3',
        iconCss: 'icon-user',
        groupBy: 'Team Members' 
      },
      { 
        id: 'manager1', 
        text: 'Sarah Wilson', 
        labelColor: '#9C27B0',
        iconCss: 'icon-manager',
        groupBy: 'Managers' 
      }
    ]
  };
}
```

**Dynamic Label Management:**

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule, LabelSettingsModel, LabelItemModel } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-dynamic-labels',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <button (click)="addLabel()">Add Label</button>
    <button (click)="removeLabel('bug')">Remove Bug Label</button>
    
    <ejs-blockeditor 
      [labelSettings]="labelSettings">
    </ejs-blockeditor>
  `
})
export class DynamicLabelsComponent {
  public labelSettings: LabelSettingsModel = {
    triggerChar: '#',
    items: [
      { id: 'bug', text: 'Bug', labelColor: '#ff5252', groupBy: 'Type' }
    ]
  };
  
  public addLabel(): void {
    const newLabel: LabelItemModel = {
      id: `label-${Date.now()}`,
      text: 'New Label',
      labelColor: this.getRandomColor(),
      groupBy: 'Custom'
    };
    
    if (!this.labelSettings.items) {
      this.labelSettings.items = [];
    }
    this.labelSettings.items = [...this.labelSettings.items, newLabel];
  }
  
  public removeLabel(labelId: string): void {
    if (this.labelSettings.items) {
      this.labelSettings.items = this.labelSettings.items.filter(
        item => item.id !== labelId
      );
    }
  }
  
  public updateLabelColor(labelId: string, newColor: string): void {
    if (this.labelSettings.items) {
      const label = this.labelSettings.items.find(item => item.id === labelId);
      if (label) {
        label.labelColor = newColor;
      }
    }
  }
  
  private getRandomColor(): string {
    const colors = ['#FF5722', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0', '#E91E63'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
```

**Complete Users and Labels Example:**

```typescript
import { Component } from '@angular/core';
import { 
  BlockEditorModule, 
  UserModel, 
  LabelSettingsModel 
} from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-project-editor',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <div class="editor-wrapper">
      <h2>Project Editor</h2>
      <p>Type @ to mention users or # to add labels</p>
      
      <ejs-blockeditor 
        [users]="users"
        [labelSettings]="labelSettings"
        [blocks]="blocksData">
      </ejs-blockeditor>
    </div>
  `
})
export class ProjectEditorComponent {
  public users: UserModel[] = [
    { id: 'user1', user: 'Alice Johnson', avatarBgColor: '#FF5722' },
    { id: 'user2', user: 'Bob Smith', avatarBgColor: '#2196F3' },
    { id: 'user3', user: 'Charlie Davis', avatarBgColor: '#4CAF50' }
  ];
  
  public labelSettings: LabelSettingsModel = {
    triggerChar: '#',
    items: [
      { id: 'urgent', text: 'Urgent', labelColor: '#F44336', groupBy: 'Priority' },
      { id: 'bug', text: 'Bug', labelColor: '#E91E63', groupBy: 'Type' },
      { id: 'todo', text: 'To Do', labelColor: '#9E9E9E', groupBy: 'Status' },
      { id: 'done', text: 'Done', labelColor: '#4CAF50', groupBy: 'Status' }
    ]
  };
  
  public blocksData = [
    {
      blockType: 'Heading',
      properties: { level: 1 },
      content: [{ contentType: 'Text', content: 'Project Tasks' }]
    },
    {
      blockType: 'Paragraph',
      content: [
        { contentType: 'Text', content: 'Type @ to mention team members or # to add status labels.' }
      ]
    }
  ];
}
```

**Best Practices:**

**For Users:**
1. Use unique, stable IDs for each user
2. Provide distinct colors for easy visual identification
3. Include avatarBgColor even when using avatarUrl as fallback
4. Limit to active users only for performance
5. Update user list dynamically as users join/leave

**For Labels:**
1. Use concise, descriptive text (2-15 characters)
2. Use consistent colors for similar categories
3. Group related labels using groupBy property
4. Choose intuitive trigger characters (# for tags, @ for mentions)
5. Keep label count manageable (< 50 items recommended)
6. Use unique IDs that won't conflict with user data

---

