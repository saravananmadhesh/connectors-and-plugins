# Globalization and Localization

## Table of Contents
- [Localization (i18n)](#localization-i18n)
- [Typing Indicator Translations](#typing-indicator-translations)
- [Right-to-Left (RTL) Support](#right-to-left-rtl-support)
- [Multiple Language Support](#multiple-language-support)

## Localization (i18n)

### Configure Language Support

The Chat UI component supports localization for typing indicators and other UI text. Set language using the `locale` property:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';
import { Component } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [locale]="locale"
         [typingUsers]="typingUsers">
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  public locale: string = 'en';  // English locale
  public typingUsers: UserModel[] = [this.michaleUserModel];
}
```

## Typing Indicator Translations

### Localization Keys

The Chat UI supports these typing indicator keys:

```
oneUserTyping    - Single user typing
twoUserTyping    - Two users typing
threeUserTyping  - Three users typing
multipleUsersTyping - More than three users typing
```

### Configure German Translations

```typescript
import { L10n } from '@syncfusion/ej2-base';

export class AppComponent implements OnInit {
  public locale: string = 'de';
  
  public ngOnInit(): void {
    L10n.load({
      'de': {
        "chat-ui": {
          "oneUserTyping": "{0} tippt",
          "twoUserTyping": "{0} und {1} tippen",
          "threeUserTyping": "{0}, {1} und {2} andere tippen gerade",
          "multipleUsersTyping": "{0}, {1} und {2} andere tippen gerade"
        }
      }
    });
  }
}
```

### Common Language Translations

**Spanish:**
```typescript
L10n.load({
  'es': {
    "chat-ui": {
      "oneUserTyping": "{0} está escribiendo",
      "twoUserTyping": "{0} y {1} están escribiendo",
      "threeUserTyping": "{0}, {1} y {2} otros están escribiendo",
      "multipleUsersTyping": "{0}, {1} y {2} otros están escribiendo"
    }
  }
});
```

**French:**
```typescript
L10n.load({
  'fr': {
    "chat-ui": {
      "oneUserTyping": "{0} tape",
      "twoUserTyping": "{0} et {1} tapent",
      "threeUserTyping": "{0}, {1} et {2} autres tapent",
      "multipleUsersTyping": "{0}, {1} et {2} autres tapent"
    }
  }
});
```

**Japanese:**
```typescript
L10n.load({
  'ja': {
    "chat-ui": {
      "oneUserTyping": "{0}が入力中です",
      "twoUserTyping": "{0}と{1}が入力中です",
      "threeUserTyping": "{0}、{1}、および{2}人の他のユーザーが入力中です",
      "multipleUsersTyping": "{0}、{1}、および{2}人の他のユーザーが入力中です"
    }
  }
});
```

### Localization with User Count

The placeholders work as follows:
- `{0}` - First user name
- `{1}` - Second user name
- `{2}` - Count of additional users

```typescript
// Example: "Albert, Sarah, and 3 others are typing"
// oneUserTyping: "Albert is typing"
// twoUserTyping: "Albert and Sarah are typing"
// threeUserTyping: "Albert, Sarah, and 1 other are typing"
// multipleUsersTyping: "Albert, Sarah, and 3 others are typing"
```

## Right-to-Left (RTL) Support

### Enable RTL Layout

Use the `enableRtl` property for right-to-left languages:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { Component } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enableRtl]="true">
      <e-messages>
        <e-message text="مرحبا! كيف حالك؟" [author]="currentUserModel"></e-message>
        <e-message text="بخير! وأنت؟" [author]="michaleUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'ألبرت', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'ميشيل', id: 'user2' };
}
```

### Supported RTL Languages

```
Arabic (ar)
Hebrew (he)
Persian/Farsi (fa)
Urdu (ur)
```

### RTL with CSS

Alternatively, use CSS to apply RTL:

```css
/* Enable RTL globally */
html {
  direction: rtl;
}

/* RTL for chat component only */
#chatui {
  direction: rtl;
}
```

## Multiple Language Support

### Dynamic Language Switching

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';
import { Component } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <div style="margin-bottom: 10px;">
        <button (click)="changeLanguage('en')">English</button>
        <button (click)="changeLanguage('de')">Deutsch</button>
        <button (click)="changeLanguage('es')">Español</button>
        <button (click)="changeLanguage('ar')">العربية</button>
      </div>
      
      <div id="chatui" ejs-chatui 
           [user]="currentUserModel" 
           [locale]="currentLocale"
           [enableRtl]="currentLocale === 'ar'">
        <e-messages>
          <e-message text="Hello!" [author]="currentUserModel"></e-message>
        </e-messages>
      </div>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public currentLocale: string = 'en';
  
  constructor() {
    this.loadTranslations();
  }
  
  private loadTranslations = () => {
    L10n.load({
      'en': {
        "chat-ui": {
          "oneUserTyping": "{0} is typing",
          "twoUserTyping": "{0} and {1} are typing",
          "threeUserTyping": "{0}, {1}, and {2} other are typing",
          "multipleUsersTyping": "{0}, {1}, and {2} others are typing"
        }
      },
      'de': {
        "chat-ui": {
          "oneUserTyping": "{0} tippt",
          "twoUserTyping": "{0} und {1} tippen",
          "threeUserTyping": "{0}, {1} und {2} andere tippen",
          "multipleUsersTyping": "{0}, {1} und {2} andere tippen"
        }
      },
      'es': {
        "chat-ui": {
          "oneUserTyping": "{0} está escribiendo",
          "twoUserTyping": "{0} y {1} están escribiendo",
          "threeUserTyping": "{0}, {1} y {2} otros están escribiendo",
          "multipleUsersTyping": "{0}, {1} y {2} otros están escribiendo"
        }
      },
      'ar': {
        "chat-ui": {
          "oneUserTyping": "{0} يكتب",
          "twoUserTyping": "{0} و {1} يكتبان",
          "threeUserTyping": "{0} و {1} و {2} آخرين يكتبون",
          "multipleUsersTyping": "{0} و {1} و {2} آخرين يكتبون"
        }
      }
    });
  };
  
  public changeLanguage = (locale: string) => {
    this.currentLocale = locale;
  };
}
```

### Locale Persistence

Store user language preference:

```typescript
public changeLanguage = (locale: string) => {
  this.currentLocale = locale;
  
  // Save to localStorage
  localStorage.setItem('preferredLanguage', locale);
};

public loadUserPreference = () => {
  const savedLocale = localStorage.getItem('preferredLanguage');
  if (savedLocale) {
    this.currentLocale = savedLocale;
  }
};
```

## Complete Globalization Example

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  imports: [ChatUIModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="max-width: 600px; margin: 0 auto;">
      <div style="margin-bottom: 15px; display: flex; gap: 10px;">
        <button *ngFor="let lang of languages" 
                (click)="changeLanguage(lang.code)"
                [style.background]="currentLocale === lang.code ? '#007bff' : '#ccc'"
                [style.color]="currentLocale === lang.code ? 'white' : 'black'">
          {{lang.name}}
        </button>
      </div>
      
      <div id="chatui" ejs-chatui 
           [user]="currentUserModel" 
           [locale]="currentLocale"
           [enableRtl]="isRTL()"
           [typingUsers]="typingUsers"
           headerText="Chat App">
        <e-messages>
          <e-message text="Hello! How are you?" [author]="currentUserModel"></e-message>
          <e-message text="Great! Thanks for asking." [author]="michaleUserModel"></e-message>
        </e-messages>
      </div>
    </div>
  `,
  styles: [`
    button {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AppComponent implements OnInit {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  public currentLocale: string = 'en';
  public typingUsers: UserModel[] = [this.michaleUserModel];
  
  public languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'ar', name: 'العربية' }
  ];
  
  public ngOnInit(): void {
    this.loadTranslations();
    this.loadUserPreference();
  }
  
  private loadTranslations = () => {
    L10n.load({
      'en': {
        "chat-ui": {
          "oneUserTyping": "{0} is typing",
          "twoUserTyping": "{0} and {1} are typing",
          "threeUserTyping": "{0}, {1}, and {2} other are typing",
          "multipleUsersTyping": "{0}, {1}, and {2} others are typing"
        }
      },
      'de': {
        "chat-ui": {
          "oneUserTyping": "{0} tippt",
          "twoUserTyping": "{0} und {1} tippen",
          "threeUserTyping": "{0}, {1} und {2} andere tippen",
          "multipleUsersTyping": "{0}, {1} und {2} andere tippen"
        }
      },
      'es': {
        "chat-ui": {
          "oneUserTyping": "{0} está escribiendo",
          "twoUserTyping": "{0} y {1} están escribiendo",
          "threeUserTyping": "{0}, {1} y {2} otros están escribiendo",
          "multipleUsersTyping": "{0}, {1} y {2} otros están escribiendo"
        }
      },
      'fr': {
        "chat-ui": {
          "oneUserTyping": "{0} tape",
          "twoUserTyping": "{0} et {1} tapent",
          "threeUserTyping": "{0}, {1} et {2} autres tapent",
          "multipleUsersTyping": "{0}, {1} et {2} autres tapent"
        }
      },
      'ar': {
        "chat-ui": {
          "oneUserTyping": "{0} يكتب",
          "twoUserTyping": "{0} و {1} يكتبان",
          "threeUserTyping": "{0} و {1} و {2} آخرين يكتبون",
          "multipleUsersTyping": "{0} و {1} و {2} آخرين يكتبون"
        }
      }
    });
  };
  
  public changeLanguage = (locale: string) => {
    this.currentLocale = locale;
    localStorage.setItem('preferredLanguage', locale);
  };
  
  private loadUserPreference = () => {
    const savedLocale = localStorage.getItem('preferredLanguage');
    if (savedLocale && this.languages.find(l => l.code === savedLocale)) {
      this.currentLocale = savedLocale;
    }
  };
  
  public isRTL = (): boolean => {
    return this.currentLocale === 'ar';
  };
}
```

---
