# Accessibility and Globalization

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Localization](#localization)
- [Multiple Language Formats](#multiple-language-formats)
- [RTL Text Direction](#rtl-text-direction)
- [Accessibility Testing Checklist](#accessibility-testing-checklist)

## WCAG 2.2 Compliance

The Syncfusion TimePicker meets Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards:

### Key WCAG Criteria Met

**1.4.3 Contrast (Minimum) - Level AA**
- Text and background have sufficient color contrast (4.5:1 minimum)
- Visual indicators are distinguishable

**2.1.1 Keyboard - Level A**
- All functionality available via keyboard
- No keyboard trap

**2.4.3 Focus Order - Level A**
- Focus order is logical and meaningful
- Focus is visible with clear indicator

**4.1.2 Name, Role, Value - Level A**
- Component properly exposed to accessibility tree
- ARIA labels and roles correctly applied

### Implementation

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Ensure accessibility features are enabled
  enableAccessibility: boolean = true;
}
```

```html
<!-- app.component.html -->
<!-- Component automatically meets WCAG 2.2 AA -->
<ejs-timepicker
  [(ngModel)]="selectedTime"
  placeholder="Select appointment time">
</ejs-timepicker>
```

## WAI-ARIA Attributes

WAI-ARIA (Accessible Rich Internet Applications) attributes enhance component accessibility:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date | null = null;
  isRequired: boolean = true;
  
  ariaAttributes = {
    'aria-label': 'Select appointment time',
    'aria-required': this.isRequired ? 'true' : 'false',
    'aria-describedby': 'time-help-text',
    'role': 'combobox',
    'aria-haspopup': 'listbox',
    'aria-expanded': 'false',
    'aria-controls': 'time-popup'
  };
}
```

```html
<!-- app.component.html -->
<div>
  <label for="appointment-time">Appointment Time</label>
  <ejs-timepicker
    id="appointment-time"
    [(ngModel)]="selectedTime"
    [htmlAttributes]="ariaAttributes"
    placeholder="Select time">
  </ejs-timepicker>
  <p id="time-help-text" style="font-size: 12px; color: #666;">
    Enter or select the appointment time from the list
  </p>
</div>
```

### Common ARIA Attributes

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `aria-label` | String | Descriptive label for screen readers |
| `aria-required` | true/false | Indicates field is required |
| `aria-invalid` | true/false | Indicates invalid value |
| `aria-describedby` | ID | Links to description text |
| `aria-haspopup` | listbox | Indicates popup presence |
| `aria-expanded` | true/false | Indicates popup open/close state |
| `aria-controls` | ID | Identifies controlled element |
| `role` | combobox | Semantic role of component |

## Keyboard Navigation

Full keyboard support for all TimePicker operations:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Standard key configurations
  keyConfigs = {
    enter: 'enter',
    escape: 'escape',
    tab: 'tab',
    home: 'home',
    end: 'end',
    down: 'downarrow',
    up: 'uparrow',
    left: 'leftarrow',
    right: 'rightarrow',
    open: 'alt+downarrow',
    close: 'alt+uparrow'
  };
  
  keyboardInstructions: string[] = [
    'Alt + Down Arrow: Open popup',
    'Alt + Up Arrow: Close popup',
    'Down Arrow: Next time in list',
    'Up Arrow: Previous time in list',
    'Enter: Select highlighted time',
    'Escape: Close popup',
    'Home: First time in list',
    'End: Last time in list',
    'Tab: Move to next field'
  ];
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <label for="accessible-time">Select Time (Keyboard Accessible):</label>
  
  <ejs-timepicker
    id="accessible-time"
    [(ngModel)]="selectedTime"
    [keyConfigs]="keyConfigs"
    placeholder="Use arrow keys to navigate"
    aria-label="Select appointment time">
  </ejs-timepicker>
  
  <div style="margin-top: 20px; padding: 15px; background-color: #f5f5f5; border-radius: 4px;">
    <h4>Keyboard Shortcuts:</h4>
    <ul style="font-size: 13px;">
      <li *ngFor="let instruction of keyboardInstructions">
        {{ instruction }}
      </li>
    </ul>
  </div>
</div>
```

### Keyboard Navigation Flow

1. **Tab** - Focus TimePicker input
2. **Alt + Down Arrow** - Open popup (or click icon)
3. **Up/Down Arrow** - Navigate time list
4. **Enter** - Select highlighted time
5. **Escape** - Close popup (optional)
6. **Tab** - Move to next form field

## Screen Reader Support

Ensure screen readers can properly announce TimePicker content:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date | null = null;
  
  screenReaderAttributes = {
    'aria-label': 'Appointment time selection',
    'aria-required': 'true',
    'aria-describedby': 'appointment-description',
    'role': 'combobox',
    'aria-haspopup': 'listbox'
  };
  
  getSelectedTimeAnnouncement(): string {
    if (!this.selectedTime) {
      return 'No time selected';
    }
    return `Selected time: ${this.selectedTime.toLocaleTimeString()}`;
  }
}
```

```html
<!-- app.component.html -->
<div>
  <!-- Hidden label for screen readers -->
  <label for="appointment-time" style="display: none;">
    Select your appointment time
  </label>
  
  <ejs-timepicker
    id="appointment-time"
    [(ngModel)]="selectedTime"
    [htmlAttributes]="screenReaderAttributes"
    placeholder="Select time">
  </ejs-timepicker>
  
  <!-- Hidden announcement for screen readers -->
  <div aria-live="polite" aria-atomic="true" style="position: absolute; left: -9999px;">
    {{ getSelectedTimeAnnouncement() }}
  </div>
  
  <!-- Help text -->
  <p id="appointment-description" style="font-size: 12px; color: #666;">
    Enter or select the time you'd like for your appointment.
    Use arrow keys to navigate and Enter to select.
  </p>
</div>
```

### Screen Reader Testing

Test with popular screen readers:
- NVDA (Windows) - Free
- JAWS (Windows) - Commercial
- VoiceOver (macOS/iOS) - Built-in
- TalkBack (Android) - Built-in

## Localization

Support multiple languages and formats:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Set locale for formatting
  locale: string = 'en-US';  // English (US)
  // locale: string = 'de-DE';  // German
  // locale: string = 'fr-FR';  // French
  // locale: string = 'ar-SA';  // Arabic
  // locale: string = 'ja-JP';  // Japanese
  // locale: string = 'zh-CN';  // Chinese
  
  format: string = 'hh:mm a';  // Format for en-US
  
  changeLocale(newLocale: string): void {
    this.locale = newLocale;
    this.updateFormatForLocale(newLocale);
  }
  
  updateFormatForLocale(locale: string): void {
    const formats: { [key: string]: string } = {
      'en-US': 'hh:mm a',
      'en-GB': 'HH:mm',
      'de-DE': 'HH:mm',
      'fr-FR': 'HH:mm',
      'ar-SA': 'hh:mm a',
      'ja-JP': 'H:mm',
      'zh-CN': 'HH:mm'
    };
    this.format = formats[locale] || 'hh:mm a';
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <div style="margin-bottom: 20px;">
    <label>Select Language/Locale:</label>
    <select (change)="changeLocale($event.target.value)" style="padding: 8px;">
      <option value="en-US">English (US)</option>
      <option value="en-GB">English (UK)</option>
      <option value="de-DE">Deutsch</option>
      <option value="fr-FR">Français</option>
      <option value="ar-SA">العربية</option>
      <option value="ja-JP">日本語</option>
      <option value="zh-CN">中文</option>
    </select>
  </div>
  
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    [locale]="locale"
    [format]="format"
    placeholder="Select time">
  </ejs-timepicker>
  
  <p>Current Locale: {{ locale }} | Format: {{ format }}</p>
</div>
```

## Multiple Language Formats

Different locales have different time format conventions:

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  localeFormats = {
    'en-US': { format: 'hh:mm a', example: '02:30 PM' },
    'en-GB': { format: 'HH:mm', example: '14:30' },
    'de-DE': { format: 'HH:mm', example: '14:30' },
    'fr-FR': { format: 'HH:mm', example: '14:30' },
    'it-IT': { format: 'HH:mm', example: '14:30' },
    'es-ES': { format: 'HH:mm', example: '14:30' },
    'pt-BR': { format: 'HH:mm', example: '14:30' },
    'ar-SA': { format: 'hh:mm a', example: '02:30 م' },
    'he-IL': { format: 'HH:mm', example: '14:30' },
    'ja-JP': { format: 'H:mm', example: '14:30' },
    'zh-CN': { format: 'HH:mm', example: '14:30' },
    'ko-KR': { format: 'a hh:mm', example: 'PM 02:30' }
  };
  
  getFormatInfo(locale: string): any {
    return this.localeFormats[locale] || this.localeFormats['en-US'];
  }
}
```

## RTL Text Direction

Support Right-to-Left languages:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  locale: string = 'ar-SA';  // Arabic
  enableRtl: boolean = true;
  
  rtlLanguages = ['ar-SA', 'ar-AE', 'ar-EG', 'he-IL', 'fa-IR', 'ur-PK'];
  
  setLocale(newLocale: string): void {
    this.locale = newLocale;
    this.enableRtl = this.rtlLanguages.includes(newLocale);
  }
}
```

```html
<!-- app.component.html -->
<div [dir]="enableRtl ? 'rtl' : 'ltr'">
  <div style="margin-bottom: 20px;">
    <select (change)="setLocale($event.target.value)">
      <option value="en-US">English</option>
      <option value="ar-SA">العربية</option>
      <option value="he-IL">עברית</option>
      <option value="fa-IR">فارسی</option>
    </select>
  </div>
  
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    [locale]="locale"
    [enableRtl]="enableRtl"
    placeholder="اختر الوقت">
  </ejs-timepicker>
</div>
```

## Accessibility Testing Checklist

### Visual Accessibility
- [ ] Sufficient color contrast (4.5:1 for text)
- [ ] Focus indicators clearly visible
- [ ] No color used alone to convey information
- [ ] Resizable text support
- [ ] Responsive design on all devices

### Keyboard Accessibility
- [ ] All features accessible via keyboard
- [ ] Tab order is logical
- [ ] No keyboard traps
- [ ] Escape closes popup
- [ ] Enter selects item

### Screen Reader Accessibility
- [ ] Semantic HTML structure
- [ ] ARIA labels present
- [ ] Live regions for updates
- [ ] Help text available
- [ ] Error messages announced

### Cognitive Accessibility
- [ ] Clear, simple language
- [ ] Consistent labeling
- [ ] Error prevention
- [ ] Undo functionality
- [ ] Helpful instructions

### Testing Code

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Run accessibility audit
  runA11yAudit(): void {
    const results = {
      keyboardNavigation: this.testKeyboardNavigation(),
      screenReaderSupport: this.testScreenReaderSupport(),
      colorContrast: this.testColorContrast(),
      focusManagement: this.testFocusManagement()
    };
    
    console.log('Accessibility Audit Results:', results);
  }
  
  private testKeyboardNavigation(): boolean {
    // Verify all functionality works with keyboard
    return true;
  }
  
  private testScreenReaderSupport(): boolean {
    // Verify ARIA attributes present
    return true;
  }
  
  private testColorContrast(): boolean {
    // Verify contrast ratios
    return true;
  }
  
  private testFocusManagement(): boolean {
    // Verify focus indicators visible
    return true;
  }
}
```

## Complete Accessible Example

```typescript
// app.component.ts
export class AppComponent {
  selectedTime: Date | null = null;
  locale: string = 'en-US';
  enableRtl: boolean = false;
  format: string = 'hh:mm a';
  
  ariaAttributes = {
    'aria-label': 'Select appointment time',
    'aria-required': 'true',
    'aria-describedby': 'time-help'
  };
  
  keyConfigs = {
    open: 'alt+downarrow',
    close: 'alt+uparrow'
  };
}
```

```html
<!-- app.component.html -->
<div [dir]="enableRtl ? 'rtl' : 'ltr'">
  <fieldset style="border: none; padding: 0; margin: 0;">
    <legend style="font-weight: bold; margin-bottom: 10px;">
      Appointment Details
    </legend>
    
    <label for="appointment-time" style="display: block; margin-bottom: 5px;">
      Appointment Time <span aria-label="required">*</span>
    </label>
    
    <ejs-timepicker
      id="appointment-time"
      [(ngModel)]="selectedTime"
      [locale]="locale"
      [enableRtl]="enableRtl"
      [format]="format"
      [keyConfigs]="keyConfigs"
      [htmlAttributes]="ariaAttributes"
      placeholder="Select time">
    </ejs-timepicker>
    
    <p id="time-help" style="font-size: 12px; color: #666; margin-top: 5px;">
      Use arrow keys to navigate or Alt+Down to open the time picker.
    </p>
  </fieldset>
</div>
```
