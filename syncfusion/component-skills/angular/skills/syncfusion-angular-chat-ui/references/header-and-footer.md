# Header and Footer Configuration

## Table of Contents
- [Header Visibility](#header-visibility)
- [Header Text Configuration](#header-text-configuration)
- [Header Icon Customization](#header-icon-customization)
- [Footer Visibility](#footer-visibility)
- [Footer Templates](#footer-templates)

## Header Visibility

### Show or Hide Header

Control header visibility with the `showHeader` property:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { Component } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui [user]="currentUserModel" [showHeader]="false">
      <e-messages>
        <e-message text="Hi Michale, are we on track for the deadline?" [author]="currentUserModel"></e-message>
        <e-message text="Yes, the design phase is complete." [author]="michaleUserModel"></e-message>
        <e-message text="I'll review it and send feedback by today." [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
}
```

**Default:** `true` - Header is displayed
**When false:** Header is hidden, more space for messages

## Header Text Configuration

### Set Header Title

Use the `headerText` property to display a title:

```typescript
template: `
  <div id="chatui" ejs-chatui 
       [user]="currentUserModel" 
       headerText="Michale">
    <e-messages>
      <e-message text="Hi Michale, are we on track for the deadline?" [author]="currentUserModel"></e-message>
      <e-message text="Yes, the design phase is complete." [author]="michaleUserModel"></e-message>
      <e-message text="I'll review it and send feedback by today." [author]="currentUserModel"></e-message>
    </e-messages>
  </div>
`
```

### Dynamic Header Text

Update header text based on conversation state:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [headerText]="headerText">
      <e-messages>
        <e-message text="Hi Michale, are we on track for the deadline?" [author]="currentUserModel"></e-message>
        <e-message text="Yes, the design phase is complete." [author]="michaleUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public headerText: string = 'Michale Suyama';
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  
  updateHeaderText() {
    this.headerText = 'Michale (Online)';
  }
}
```

### Common Header Text Patterns

```typescript
// Team name
headerText: 'Design Team'

// Conversation group
headerText: 'Project Planning - Q1 2024'

// Bot name
headerText: 'Customer Support Bot'

// With status
headerText: 'Sarah Johnson (Online)'
```

## Header Toolbar Configuration

### Add Header Toolbar Actions

Use the `headerToolbar` property to add custom toolbar actions in the header:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel, ToolbarSettingsModel } from '@syncfusion/ej2-interactive-chat';
import { Component, ViewChild } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         headerText="Michale Suyama"
         [headerToolbar]="headerToolbar"
         (itemClicked)="onHeaderToolbarClick($event)">
      <e-messages>
        <e-message text="Hi Michale, are we on track for the deadline?" [author]="currentUserModel"></e-message>
        <e-message text="Yes, the design phase is complete." [author]="michaleUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  
  public headerToolbar: ToolbarSettingsModel = {
    items: [
      { iconCss: 'e-icons e-video', tooltip: 'Video Call' },
      { iconCss: 'e-icons e-phone', tooltip: 'Voice Call' },
      { iconCss: 'e-icons e-settings', tooltip: 'Settings' }
    ]
  };
  
  public onHeaderToolbarClick = (args: any) => {
    const { item } = args;
    
    if (item.tooltip === 'Video Call') {
      console.log('Starting video call...');
      this.startVideoCall();
    } else if (item.tooltip === 'Voice Call') {
      console.log('Starting voice call...');
      this.startVoiceCall();
    } else if (item.tooltip === 'Settings') {
      console.log('Opening settings...');
      this.openSettings();
    }
  };
  
  private startVideoCall = () => {
    // Implement video call logic
    alert('Video call started with Michale Suyama');
  };
  
  private startVoiceCall = () => {
    // Implement voice call logic
    alert('Voice call started with Michale Suyama');
  };
  
  private openSettings = () => {
    // Open settings dialog
    alert('Opening chat settings');
  };
}
```

### Common Header Toolbar Patterns

```typescript
// Communication app toolbar
public headerToolbar: ToolbarSettingsModel = {
  items: [
    { iconCss: 'e-icons e-video', tooltip: 'Video Call', text: 'Video' },
    { iconCss: 'e-icons e-phone', tooltip: 'Voice Call', text: 'Call' },
    { iconCss: 'e-icons e-people', tooltip: 'Add Participants' },
    { iconCss: 'e-icons e-settings', tooltip: 'Settings' }
  ]
};

// Support chat toolbar
public headerToolbar: ToolbarSettingsModel = {
  items: [
    { iconCss: 'e-icons e-upload', tooltip: 'Share Files' },
    { iconCss: 'e-icons e-search', tooltip: 'Search Messages' },
    { iconCss: 'e-icons e-more-vertical', tooltip: 'More Options' }
  ]
};

// User profile toolbar
public headerToolbar: ToolbarSettingsModel = {
  items: [
    { iconCss: 'e-icons e-user', tooltip: 'View Profile' },
    { iconCss: 'e-icons e-notification', tooltip: 'Notifications' },
    { iconCss: 'e-icons e-settings', tooltip: 'Settings' }
  ]
};
```

### Header Toolbar with Text

Add text labels alongside icons:

```typescript
public headerToolbar: ToolbarSettingsModel = {
  items: [
    { 
      iconCss: 'e-icons e-video', 
      text: 'Video', 
      tooltip: 'Start video call' 
    },
    { 
      iconCss: 'e-icons e-phone', 
      text: 'Call', 
      tooltip: 'Start voice call' 
    }
  ]
};
```

### Conditional Toolbar Items

Show/hide toolbar items dynamically:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [headerToolbar]="headerToolbar">
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public isCallActive: boolean = false;
  
  public headerToolbar: ToolbarSettingsModel = {
    items: [
      { 
        iconCss: 'e-icons e-video', 
        tooltip: 'Video Call',
        visible: !this.isCallActive  // Hide during call
      },
      { 
        iconCss: 'e-icons e-close', 
        tooltip: 'End Call',
        visible: this.isCallActive,  // Show during call
        cssClass: 'end-call-btn'
      }
    ]
  };
  
  toggleCallState() {
    this.isCallActive = !this.isCallActive;
    // Update toolbar items visibility
    this.headerToolbar.items[0].visible = !this.isCallActive;
    this.headerToolbar.items[1].visible = this.isCallActive;
  }
}
```

### Header Toolbar Item Click Event

Handle toolbar actions with the `itemClicked` event:

```typescript
public onHeaderToolbarClick = (args: any) => {
  const { item, event } = args;
  
  console.log('Toolbar item clicked:', item);
  
  // Access item properties
  if (item.iconCss === 'e-icons e-video') {
    this.initiateVideoCall();
  } else if (item.iconCss === 'e-icons e-phone') {
    this.initiateVoiceCall();
  } else if (item.iconCss === 'e-icons e-settings') {
    this.showSettings();
  }
};
```

### Advanced Header Toolbar Configuration

Complete example with all ToolbarItemModel properties:

```typescript
public headerToolbar: ToolbarSettingsModel = {
  items: [
    {
      iconCss: 'e-icons e-video',
      text: 'Video',
      tooltip: 'Start video call',
      cssClass: 'video-call-btn',
      disabled: false,
      visible: true,
      align: 'Right',  // Align to right side
      tabIndex: 1
    },
    {
      type: 'Separator'  // Visual separator
    },
    {
      iconCss: 'e-icons e-settings',
      tooltip: 'Settings',
      cssClass: 'settings-btn',
      disabled: false,
      visible: true,
      align: 'Right',
      tabIndex: 2
    }
  ]
};
```

**Note:** Header toolbar uses the same ToolbarItemModel interface as messageToolbarSettings. See [Events and Interactions](./events-and-interactions.md) for complete ToolbarItemModel property documentation.

## Header Icon Customization

### Add Header Icon

Use the `headerIconCss` property to add an icon:

```typescript
template: `
  <div id="chatui" ejs-chatui 
       [user]="currentUserModel" 
       headerText="Michale"
       headerIconCss="e-icons e-chat">
    <e-messages>
      <!-- Messages -->
    </e-messages>
  </div>
`
```

### Icon CSS Classes

Use Syncfusion icon classes:

```typescript
// Common chat icons
headerIconCss: 'e-icons e-chat'           // Chat bubble
headerIconCss: 'e-icons e-contact'        // Person
headerIconCss: 'e-icons e-video-call'     // Video
headerIconCss: 'e-icons e-phone'          // Phone
headerIconCss: 'e-icons e-robot'          // Bot icon
headerIconCss: 'e-icons e-people'         // Multiple people
```

### Custom Icon Example

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         headerText="Support Bot"
         headerIconCss="header-bot-icon">
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `,
  styles: [`
    .header-bot-icon {
      background-image: url('https://ej2.syncfusion.com/demos/src/chat/images/bot.png');
      background-color: transparent;
      width: 32px;
      height: 32px;
    }
  `]
})
export class AppComponent { }
```

### Styling Header Icon

Apply CSS to customize icon appearance:

```typescript
styles: [`
  /* Style header icon */
  .e-header .header-bot-icon {
    color: #007bff;
    font-size: 20px;
    margin-right: 8px;
  }
  
  /* Header icon on hover */
  .e-header .header-bot-icon:hover {
    color: #0056b3;
    transition: color 0.3s ease;
  }
`]
```

## Footer Visibility

### Show or Hide Footer

Control footer visibility with the `showFooter` property:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [showFooter]="false">
      <e-messages>
        <e-message text="Hi Michale, are we on track for the deadline?" [author]="currentUserModel"></e-message>
        <e-message text="Yes, the design phase is complete." [author]="michaleUserModel"></e-message>
        <e-message text="I'll review it and send feedback by today." [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
}
```

**Default:** `true` - Footer with input field is displayed
**When false:** Footer is hidden, no message input available

### Read-Only Chat Mode

Hide footer for read-only message display:

```typescript
// Use case: Display archived conversations, notification center
template: `
  <div id="chatui" ejs-chatui 
       [user]="currentUserModel" 
       [showFooter]="false"
       headerText="Archived Conversation">
    <e-messages>
      <!-- Display only, no input -->
    </e-messages>
  </div>
`
```

## Footer Templates

### Custom Footer Template

Use `footerTemplate` for advanced footer customization:

```typescript
import { NgTemplateOutlet } from '@angular/common';

@Component({
  imports: [ChatUIModule, NgTemplateOutlet],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [footerTemplate]="customFooter">
      <ng-template #customFooter>
        <div class="custom-footer">
          <input type="text" placeholder="Custom input...">
          <button (click)="customSend()">Send</button>
        </div>
      </ng-template>
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `,
  styles: [`
    .custom-footer {
      display: flex;
      gap: 8px;
      padding: 12px;
      border-top: 1px solid #ddd;
    }
    
    .custom-footer input {
      flex: 1;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    
    .custom-footer button {
      padding: 8px 16px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  
  customSend() {
    console.log('Custom send logic');
  }
}
```

### Footer Template Use Cases

```typescript
// Multi-line input
<textarea placeholder="Enter your message..."></textarea>

// Emoji picker + input
<input type="text" placeholder="Type message...">
<button>😀</button>

// Attachment + input + send
<input type="file">
<input type="text" placeholder="Add caption...">
<button>Send</button>

// Recorded voice message
<button>🎤 Record</button>
<button>Send Voice</button>
```

## Complete Header/Footer Example

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         [showHeader]="true"
         headerText="Michale Suyama"
         headerIconCss="e-icons e-contact"
         [showFooter]="true">
      <e-messages>
        <e-message text="Hi Michale, are we on track for the deadline?" [author]="currentUserModel"></e-message>
        <e-message text="Yes, the design phase is complete." [author]="michaleUserModel"></e-message>
        <e-message text="I'll review it and send feedback by today." [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
  `,
  styles: [`
    #chatui {
      height: 500px;
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 8px;
      overflow: hidden;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
}
```

---
