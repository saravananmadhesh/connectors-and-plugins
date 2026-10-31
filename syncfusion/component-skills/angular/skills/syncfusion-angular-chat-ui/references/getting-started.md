# Getting Started with Syncfusion Angular Chat UI

## Table of Contents
- [Installation](#installation)
- [Angular Environment Setup](#angular-environment-setup)
- [Basic Component Initialization](#basic-component-initialization)
- [Configuring Messages and Users](#configuring-messages-and-users)
- [CSS Imports and Themes](#css-imports-and-themes)
- [Running the Application](#running-the-application)

## Installation

### Package Availability

Syncfusion Angular Chat UI is available as an npm scoped package `@syncfusion`. Get all Angular Syncfusion packages from [npm](https://www.npmjs.com/search?q=%40syncfusion%2Fej2-angular-).

### Ivy Library Distribution Package

For Angular 12 and above, use the Ivy distribution package (`>=20.2.36`), which supports modern Angular rendering:

```bash
npm install @syncfusion/ej2-angular-interactive-chat --save
```

## Angular Environment Setup

### Install Angular CLI

If you haven't already, install Angular CLI globally:

```bash
npm install -g @angular/cli
```

### Create a New Angular Application

Use Angular CLI to scaffold a new Angular project:

```bash
ng new my-chat-app
cd my-chat-app
```

This creates a project with standalone components support (Angular 14+).

## Basic Component Initialization

### Add Chat UI to Component

Modify your component file (`app.component.ts`) to include the Chat UI:

```typescript
import { Component } from '@angular/core';
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `<div id="chatui" ejs-chatui [user]="currentUserModel"></div>`,
  styles: [`
    #chatui {
      height: 500px;
      width: 100%;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = {
    user: 'Albert',
    id: 'user1'
  };
}
```

**Key Points:**
- Import `ChatUIModule` in the `imports` array
- Use standalone component syntax with `standalone: true`
- Use `<div ejs-chatui>` to render the component
- Bind `[user]` property with current user model

## Configuring Messages and Users

### Define Users

Create user models for all chat participants:

```typescript
public currentUserModel: UserModel = {
  user: 'Albert',
  id: 'user1'
};

public michaleUserModel: UserModel = {
  user: 'Michale Suyama',
  id: 'user2'
};
```

### Add Static Messages

Use the `<e-message>` element to define static messages:

```typescript
template: `
  <div id="chatui" ejs-chatui [user]="currentUserModel">
    <e-messages>
      <e-message 
        text="Hi Michale, are we on track for the deadline?" 
        [author]="currentUserModel">
      </e-message>
      <e-message 
        text="Yes, the design phase is complete." 
        [author]="michaleUserModel">
      </e-message>
      <e-message 
        text="I'll review it and send feedback by today." 
        [author]="currentUserModel">
      </e-message>
    </e-messages>
  </div>
`
```

### Dynamic Messages with TypeScript

For dynamic messages, use component properties and `*ngFor`:

```typescript
import { Component } from '@angular/core';
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ChatUIModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui [user]="currentUserModel">
      <e-messages>
        <e-message 
          *ngFor="let msg of messages" 
          [text]="msg.text" 
          [author]="msg.author">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  
  public messages: MessageModel[] = [
    { text: 'Hello!', author: this.currentUserModel },
    { text: 'Hi there!', author: this.michaleUserModel }
  ];
}
```

## CSS Imports and Themes

### Add CSS to Global Styles

To install the tailwind3 theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Import Syncfusion CSS files in `src/styles.css`:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/chat-ui/index.css";
```

### Available Themes

Syncfusion supports multiple themes. Replace `material3.css` with:
- `material.css` - Material Design
- `bootstrap.css` - Bootstrap theme
- `tailwind.css` - Tailwind CSS theme
- `bootstrap4.css` - Bootstrap 4 theme
- `highcontrast.css` - High contrast for accessibility

**Example for Bootstrap theme:**
```css
@import "../node_modules/@syncfusion/ej2-bootstrap-theme/styles/chat-ui/index.css";
```

### Component-Scoped Styles

For component-specific styling, add styles in the component decorator:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `<div id="chatui" ejs-chatui [user]="currentUserModel"></div>`,
  styles: [`
    #chatui {
      border: 1px solid #ccc;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
  `]
})
export class AppComponent { }
```

## Running the Application

### Development Server

Start the Angular development server:

```bash
ng serve
```

Or with automatic port selection:
```bash
ng serve --open
```

Navigate to `http://localhost:4200/` in your browser.

### Build for Production

```bash
ng build --configuration production
```

Output is generated in the `dist/` folder.

## Minimal Working Example

Here's a complete example to verify installation:

```typescript
import { Component } from '@angular/core';
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="padding: 20px;">
      <h1>Chat UI Component</h1>
      <div id="chatui" ejs-chatui [user]="currentUserModel" headerText="Chat">
        <e-messages>
          <e-message text="Hello! Welcome to Chat UI" [author]="botUserModel"></e-message>
        </e-messages>
      </div>
    </div>
  `,
  styles: [`
    #chatui {
      height: 400px;
      width: 100%;
      max-width: 600px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = {
    user: 'You',
    id: 'user1'
  };
  
  public botUserModel: UserModel = {
    user: 'Bot',
    id: 'bot'
  };
}
```

## Troubleshooting

**Issue: Module not found errors**
- Verify `@syncfusion/ej2-angular-interactive-chat` is installed: `npm list`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Issue: Styles not applied**
- Check CSS imports in `styles.css`
- Ensure all required theme files are imported
- Verify theme files exist in `node_modules`

**Issue: Component not rendering**
- Confirm `ChatUIModule` is imported in component
- Check component selector is added to template
- Use browser console to check for errors

**Issue: Type errors with TypeScript**
- Import types from `@syncfusion/ej2-interactive-chat`
- Example: `import { UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat'`

---
