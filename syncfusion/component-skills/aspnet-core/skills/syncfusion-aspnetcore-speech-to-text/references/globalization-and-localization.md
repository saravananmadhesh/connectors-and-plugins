# Globalization and Localization

## Table of Contents
- [Localization Basics](#localization-basics)
- [Available Locale Strings](#available-locale-strings)
- [Implementing Localization](#implementing-localization)
- [Language Switching](#language-switching)
- [RTL Support](#rtl-support)
- [Accessibility Labels](#accessibility-labels)

## Localization Basics

The SpeechToText control supports localization through the `L10n.load()` method, allowing you to translate component strings for different languages.

### Default Locale

The control uses `en-US` (English - US) by default via the `locale` attribute:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-default"></ejs-speechtotext>
<!-- Default locale: en-US -->
```

### Setting Component Locale

```razor
@using Syncfusion.EJ2.Inputs

<!-- German locale -->
<ejs-speechtotext id="speech-de" locale="de"></ejs-speechtotext>

<!-- French locale -->
<ejs-speechtotext id="speech-fr" locale="fr"></ejs-speechtotext>

<!-- Spanish locale -->
<ejs-speechtotext id="speech-es" locale="es"></ejs-speechtotext>
```

## Available Locale Strings

The following strings can be localized:

| Key | English Default | Purpose |
|-----|-----------------|---------|
| `abortedError` | "Speech recognition was aborted." | Shown when interrupted |
| `audioCaptureError` | "No microphone detected..." | Microphone not found |
| `defaultError` | "An unknown error occurred." | Generic error |
| `networkError` | "Network error occurred..." | No internet connection |
| `noSpeechError` | "No speech detected..." | User didn't speak |
| `notAllowedError` | "Microphone access denied..." | Permission not granted |
| `serviceNotAllowedError` | "Service not allowed..." | Service blocked |
| `unsupportedBrowserError` | "Browser not supported..." | No Web Speech API |
| `startAriaLabel` | "Press to start speaking..." | Accessibility label |
| `stopAriaLabel` | "Press to stop speaking..." | Accessibility label |
| `startTooltipText` | "Start listening" | Tooltip text |
| `stopTooltipText` | "Stop listening" | Tooltip text |

## Implementing Localization

### Basic Localization

Add translations before component creation:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-german" locale="de"></ejs-speechtotext>

<script>
    // Load German translations
    ej.base.L10n.load({
        'de': {
            'speech-to-text': {
                'startTooltipText': 'Zum Starten klicken',
                'stopTooltipText': 'Zum Stoppen klicken',
                'noSpeechError': 'Keine Sprache erkannt.'
            }
        }
    });
</script>
```

### Complete Language Translation

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-custom" locale="de"></ejs-speechtotext>

<script>
    ej.base.L10n.load({
        'de': {
            'speech-to-text': {
                'abortedError': 'Die Spracherkennung wurde abgebrochen.',
                'audioCaptureError': 'Kein Mikrofon erkannt.',
                'defaultError': 'Ein unbekannter Fehler ist aufgetreten.',
                'networkError': 'Netzwerkfehler aufgetreten.',
                'noSpeechError': 'Keine Sprache erkannt.',
                'notAllowedError': 'Mikrofonzugriff verweigert.',
                'serviceNotAllowedError': 'Der Spracherkennungsdienst ist nicht erlaubt.',
                'unsupportedBrowserError': 'Der Browser unterstützt die API nicht.',
                'startAriaLabel': 'Drücken Sie, um zu sprechen',
                'stopAriaLabel': 'Drücken Sie, um zu stoppen',
                'startTooltipText': 'Zuhören starten',
                'stopTooltipText': 'Zuhören beenden'
            }
        }
    });
</script>
```

## Language Switching

Implement dynamic language switching:

```razor
@using Syncfusion.EJ2.Inputs

<div style="padding: 20px;">
    <div style="marginBottom: 20px;">
        <label>Select Language:</label>
        <select onchange="changeLanguage(this.value)">
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="fr">Français</option>
            <option value="es">Español</option>
        </select>
    </div>
    
    <ejs-speechtotext id="speech-lang" locale="en"></ejs-speechtotext>
</div>

<script>
    // Load translations
    ej.base.L10n.load({
        'de': {
            'speech-to-text': {
                'startTooltipText': 'Zuhören starten',
                'stopTooltipText': 'Zuhören beenden'
            }
        },
        'fr': {
            'speech-to-text': {
                'startTooltipText': 'Commencer à écouter',
                'stopTooltipText': 'Arrêter d\'écouter'
            }
        },
        'es': {
            'speech-to-text': {
                'startTooltipText': 'Comenzar a escuchar',
                'stopTooltipText': 'Dejar de escuchar'
            }
        }
    });
    
    function changeLanguage(language) {
        var speechComponent = ej.base.getComponent(
            document.getElementById("speech-lang"),
            "speechtotext"
        );
        speechComponent.locale = language;
    }
</script>
```

## RTL Support

Enable Right-to-Left (RTL) layout for Arabic, Hebrew, Persian, etc.

### Enabling RTL

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-rtl" enableRtl="true" locale="ar"></ejs-speechtotext>
```

### RTL with Arabic

```razor
@using Syncfusion.EJ2.Inputs

<div dir="rtl" style="padding: 20px;">
    <ejs-speechtotext id="speech-arabic" 
        enableRtl="true" 
        locale="ar">
    </ejs-speechtotext>
</div>

<script>
    ej.base.L10n.load({
        'ar': {
            'speech-to-text': {
                'startTooltipText': 'اضغط للبدء',
                'stopTooltipText': 'اضغط للتوقف',
                'noSpeechError': 'لم يتم الكشف عن كلام.'
            }
        }
    });
</script>
```

### RTL with Hebrew

```razor
@using Syncfusion.EJ2.Inputs

<div dir="rtl">
    <ejs-speechtotext id="speech-hebrew"
        enableRtl="true"
        locale="he">
    </ejs-speechtotext>
</div>

<script>
    ej.base.L10n.load({
        'he': {
            'speech-to-text': {
                'startTooltipText': 'לחץ להתחלה',
                'stopTooltipText': 'לחץ להפסקה'
            }
        }
    });
</script>
```

## Accessibility Labels

Use ARIA labels for screen reader support:

```razor
@using Syncfusion.EJ2.Inputs

<script>
    ej.base.L10n.load({
        'en': {
            'speech-to-text': {
                'startAriaLabel': 'Activate voice input. Press to start recording your message.',
                'stopAriaLabel': 'Deactivate voice input. Press to stop recording.',
                'startTooltipText': 'Click to start voice input',
                'stopTooltipText': 'Click to stop voice input'
            }
        }
    });
</script>

<ejs-speechtotext id="speech-accessible" locale="en"></ejs-speechtotext>
```

### Multi-Language Accessibility

```razor
@using Syncfusion.EJ2.Inputs

<div style="padding: 20px;">
    <div style="marginBottom: 20px;">
        <label for="lang-selector">Select Language:</label>
        <select id="lang-selector" onchange="switchLanguage(this.value)">
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
        </select>
    </div>
    
    <ejs-speechtotext id="speech-multi" locale="en"></ejs-speechtotext>
</div>

<script>
    ej.base.L10n.load({
        'en': {
            'speech-to-text': {
                'startAriaLabel': 'Voice input: Click to start recording',
                'stopAriaLabel': 'Voice input: Click to stop recording',
                'startTooltipText': 'Start recording'
            }
        },
        'de': {
            'speech-to-text': {
                'startAriaLabel': 'Spracheingabe: Klicken Sie zum Starten',
                'stopAriaLabel': 'Spracheingabe: Klicken Sie zum Stoppen',
                'startTooltipText': 'Aufnahme starten'
            }
        },
        'es': {
            'speech-to-text': {
                'startAriaLabel': 'Entrada de voz: Haga clic para iniciar',
                'stopAriaLabel': 'Entrada de voz: Haga clic para detener',
                'startTooltipText': 'Iniciar grabación'
            }
        }
    });
    
    function switchLanguage(language) {
        var speechComponent = ej.base.getComponent(
            document.getElementById("speech-multi"),
            "speechtotext"
        );
        speechComponent.locale = language;
        
        // Update page direction for RTL languages
        if (language === 'ar' || language === 'he') {
            document.body.dir = 'rtl';
        } else {
            document.body.dir = 'ltr';
        }
    }
</script>
```

## Common Patterns

### Pattern: Regional Localization

```razor
@using Syncfusion.EJ2.Inputs

@{
    // Get user's culture from server
    var userCulture = System.Globalization.CultureInfo.CurrentCulture.Name; // e.g., "de-DE"
    var locale = userCulture.Split('-')[0]; // Get language code
}

<ejs-speechtotext id="speech-regional" locale="@locale"></ejs-speechtotext>

<script>
    ej.base.L10n.load({
        'de': {
            'speech-to-text': {
                'startTooltipText': 'Zuhören starten',
                'stopTooltipText': 'Zuhören beenden'
            }
        }
    });
</script>
```

### Pattern: Language Detection from Browser

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-detect" locale="en"></ejs-speechtotext>

<script>
    // Detect browser language
    var browserLanguage = navigator.language.split('-')[0];
    var supportedLanguages = ['en', 'de', 'fr', 'es'];
    var language = supportedLanguages.includes(browserLanguage) ? browserLanguage : 'en';
    
    ej.base.L10n.load({
        'de': { 'speech-to-text': { 'startTooltipText': 'Starten' } },
        'fr': { 'speech-to-text': { 'startTooltipText': 'Commencer' } },
        'es': { 'speech-to-text': { 'startTooltipText': 'Comenzar' } }
    });
    
    var speechComponent = ej.base.getComponent(
        document.getElementById("speech-detect"),
        "speechtotext"
    );
    speechComponent.locale = language;
</script>
```

## Troubleshooting

### Translations not appearing
- Ensure `L10n.load()` is called before component renders
- Check locale code is correct format
- Verify key names match exactly

### RTL layout issues
- Set `enableRtl="true"` on component
- Add `dir="rtl"` to parent container
- Load appropriate RTL-compatible translations

### Language switching not updating
- Component may need recreation after locale change
- Use component reference to update locale property
- Verify new locale translations are loaded

