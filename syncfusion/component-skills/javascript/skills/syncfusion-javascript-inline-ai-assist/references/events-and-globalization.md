# Events and Globalization

This guide covers the events fired by the Inline AI Assist component and globalization features including localization and RTL support.

## Events

### promptRequest Event

Triggered when a user submits a prompt for AI processing. This is the primary event for handling AI integration.

**Event Arguments:**
- `prompt` (string): The user's prompt text
- `args` (object): Event arguments with cancel option

**Basic Usage:**

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    promptRequest: async (args) => {
        console.log('User prompt:', args.prompt);
        
        // Call AI service
        const response = await getAIResponse(args.prompt);
        
        // Add response to popup
        inlineAssist.addResponse(response);
    }
});

inlineAssist.appendTo('#inlineAssist');
```

**Cancel Prompt Request:**

```typescript
promptRequest: (args) => {
    // Validate prompt
    if (args.prompt.length < 5) {
        alert('Prompt too short');
        args.cancel = true;  // Cancel the request
        return;
    }
    
    // Process valid prompt
    processPrompt(args.prompt);
}
```
---

### created Event

Triggered after the Inline AI Assist component is created and rendered.

**Event Arguments:** None

**Basic Usage:**

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    created: () => {
        console.log('Inline AI Assist created');
        
        // Initialize custom elements
        initializeCustomElements();
    }
});

inlineAssist.appendTo('#inlineAssist');
```

**Custom Editor Setup:**

```typescript
created: () => {
    // Attach event listeners for custom editor template
    const sendBtn = document.getElementById('customSendBtn');
    if (sendBtn) {
        sendBtn.addEventListener('click', () => {
            const textarea = document.getElementById('customPrompt') as HTMLTextAreaElement;
            inlineAssist.executePrompt(textarea);
        });
    }
}
```

---

### open Event

Triggered when the Inline AI Assist popup is opened.

**Event Arguments:**
- `element` (HTMLElement): The popup element
- `args` (object): Event arguments with cancel option

**Basic Usage:**

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    open: (args) => {
        console.log('Popup opened');
        
        // Focus the prompt input
        const promptInput = args.element.querySelector('textarea');
        if (promptInput) {
            promptInput.focus();
        }
    }
});
```

**Cancel Popup Open:**

```typescript
open: (args) => {
    // Check conditions before opening
    if (!hasPermission()) {
        alert('You do not have permission to use AI assist');
        args.cancel = true;  // Prevent popup from opening
        return;
    }
}
```

**Track Analytics:**

```typescript
open: () => {
    // Log popup open event
    analytics.track('ai_assist_opened', {
        timestamp: Date.now(),
        user: getCurrentUser()
    });
}
```

---

### close Event

Triggered when the Inline AI Assist popup is closed.

**Event Arguments:**
- `element` (HTMLElement): The popup element
- `event` (Event): The DOM event that triggered the close

**Basic Usage:**

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    close: (args) => {
        console.log('Popup closed');
        
        // Clean up or save state
        savePromptHistory();
    }
});
```

**Track Popup Duration:**

```typescript
let openTime: number;

let inlineAssist = new InlineAIAssist({
    open: () => {
        openTime = Date.now();
    },
    close: () => {
        const duration = Date.now() - openTime;
        console.log('Popup was open for:', duration, 'ms');
        
        // Send analytics
        analytics.track('ai_assist_duration', { duration });
    }
});
```

**Prevent Close (Not Recommended):**

```typescript
close: (args) => {
    // This is generally not recommended
    if (hasUnsavedChanges()) {
        if (!confirm('Close without saving?')) {
            args.cancel = true;  // Prevent close
        }
    }
}
```

---

## Complete Events Example

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    
    // Component created
    created: () => {
        console.log('Component created');
        initializeCustomFeatures();
    },
    
    // Popup opened
    open: (args) => {
        console.log('Popup opened');
        
        // Focus prompt input
        const input = args.element.querySelector('textarea');
        if (input) input.focus();
        
        // Track analytics
        trackEvent('popup_opened');
    },
    
    // User submitted prompt
    promptRequest: async (args) => {
        console.log('Prompt:', args.prompt);
        
        // Validate
        if (!args.prompt || args.prompt.trim().length < 3) {
            alert('Prompt too short');
            args.cancel = true;
            return;
        }
        
        try {
            // Call AI service
            const response = await callAIService(args.prompt);
            inlineAssist.addResponse(response);
            
            // Track success
            trackEvent('prompt_success');
        } catch (error) {
            inlineAssist.addResponse('Error: ' + error.message);
            trackEvent('prompt_error', { error: error.message });
        }
    },
    
    // Popup closed
    close: () => {
        console.log('Popup closed');
        
        // Save state
        saveUserPreferences();
        trackEvent('popup_closed');
    }
});

inlineAssist.appendTo('#inlineAssist');

function trackEvent(name: string, data?: any) {
    // Your analytics implementation
    console.log('Event:', name, data);
}

async function callAIService(prompt: string): Promise<string> {
    // Your AI service call
    return 'AI response';
}

function initializeCustomFeatures() {
    // Custom initialization
}

function saveUserPreferences() {
    // Save state
}
```

---

## Globalization

### Localization

Customize the text content of the Inline AI Assist component for different languages using the `L10n` service.

**Setup Localization:**

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';

// Register locale strings
L10n.load({
    'de-DE': {
        'inlineassist': {
            'send': 'Senden'
        }
    }
});

// Set locale
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    locale: 'de-DE',
    promptRequest: handlePrompt
});

inlineAssist.appendTo('#inlineAssist');
```

**Default Localizable Strings:**

| Key | Default Text | Description |
|-----|--------------|-------------|
| `send` | Send | Send button text |
| `placeholder` | Type prompt for assistance... | Prompt textarea placeholder |
| `accept` | Accept | Accept response button |
| `discard` | Discard | Discard response button |

**Multiple Locales:**

```typescript
L10n.load({
    'es-ES': {
        'inlineassist': {
            'send': 'Enviar'
        }
    },
    'fr-FR': {
        'inlineassist': {
            'send': 'Envoyer'
        }
    },
    'ja-JP': {
        'inlineassist': {
            'send': '送信'
        }
    }
});

// Switch locale dynamically
document.getElementById('langSelect').addEventListener('change', (e) => {
    const locale = e.target.value;
    inlineAssist.locale = locale;
    inlineAssist.dataBind();
});
```

**Custom Localization:**

```typescript
// Override default strings
L10n.load({
    'en-US': {
        'inlineassist': {
            'send': 'Ask AI'
        }
    }
});

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    locale: 'en-US'
});
```

---

### Right-to-Left (RTL) Support

Enable RTL mode for languages like Arabic, Hebrew, and Persian using the `enableRtl` property.

**Basic RTL Usage:**

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';

// Arabic localization
L10n.load({
    'ar-AE': {
        'inlineassist': {
            'send': 'إرسال'
        }
    }
});

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    locale: 'ar-AE',
    enableRtl: true,  // Enable RTL
    promptRequest: handlePrompt
});

inlineAssist.appendTo('#inlineAssist');
```

**RTL with Custom Styling:**

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    enableRtl: true,
    cssClass: 'custom-rtl-style',
    promptRequest: handlePrompt
});
```

```css
/* Custom RTL styles */
.custom-rtl-style .e-inlineassist-popup {
    direction: rtl;
    text-align: right;
}

.custom-rtl-style .e-inlineassist-toolbar {
    flex-direction: row-reverse;
}
```

**Dynamic RTL Toggle:**

```typescript
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    enableRtl: false
});

// Toggle RTL dynamically
document.getElementById('rtlToggle').addEventListener('change', (e) => {
    inlineAssist.enableRtl = e.target.checked;
    inlineAssist.dataBind();
});
```

---

## Complete Globalization Example

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';
import { L10n } from '@syncfusion/ej2-base';

// Load multiple locales
L10n.load({
    'en-US': {
        'inlineassist': {
            'send': 'Send'
        }
    },
    'ar-AE': {
        'inlineassist': {
            'send': 'إرسال'
        }
    },
    'es-ES': {
        'inlineassist': {
            'send': 'Enviar'
        }
    },
    'de-DE': {
        'inlineassist': {
            'send': 'Senden'
        }
    }
});

// Initialize with default locale
let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    locale: 'en-US',
    enableRtl: false,
    promptRequest: async (args) => {
        const response = await callAIService(args.prompt);
        inlineAssist.addResponse(response);
    }
});

inlineAssist.appendTo('#inlineAssist');

// Language selector
document.getElementById('languageSelect').addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    
    // Update locale
    inlineAssist.locale = selectedLang;
    
    // Enable RTL for Arabic
    inlineAssist.enableRtl = selectedLang === 'ar-AE';
    
    // Apply changes
    inlineAssist.dataBind();
    
    console.log('Language changed to:', selectedLang);
});

async function callAIService(prompt: string): Promise<string> {
    // AI service call
    return 'Response';
}
```

```html
<!-- HTML for language selection -->
<div>
    <label for="languageSelect">Language:</label>
    <select id="languageSelect">
        <option value="en-US">English</option>
        <option value="ar-AE">Arabic</option>
        <option value="es-ES">Spanish</option>
        <option value="de-DE">German</option>
    </select>
</div>

<button id="aiBtn" class="e-btn e-primary">AI Assist</button>
<div id="inlineAssist"></div>
```

---

## Event Reference Summary

| Event | When Fired | Cancellable | Use Case |
|-------|-----------|-------------|----------|
| `created` | After component creation | No | Initialize custom features |
| `open` | When popup opens | Yes | Focus input, validation |
| `promptRequest` | User submits prompt | Yes | AI integration, validation |
| `close` | When popup closes | Yes | Cleanup, save state |

## Globalization Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `locale` | string | 'en-US' | Locale for localization |
| `enableRtl` | boolean | false | Enable right-to-left mode |
