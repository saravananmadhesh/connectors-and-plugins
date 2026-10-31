# Globalization and Localization

## Table of Contents
- [Localization Basics](#localization-basics)
- [Available Locale Strings](#available-locale-strings)
- [Implementing Localization](#implementing-localization)
- [Language Switching](#language-switching)
- [RTL Support](#rtl-support)
- [Accessibility Labels](#accessibility-labels)

## Localization Basics

The SpeechToText control supports localization through the `L10n.load()` method in the HTML context, allowing you to translate component strings for different languages.

### Default Locale

The control uses `en-US` (English - US) by default:

```razor
@using Syncfusion.EJ2

<!-- Default locale: en-US -->
@Html.EJS().SpeechToText("speech-default").Render()
```

### Setting Component Locale

```razor
@using Syncfusion.EJ2

<!-- German locale -->
@Html.EJS().SpeechToText("speech-de")
    .Locale("de")
    .Render()

<!-- French locale -->
@Html.EJS().SpeechToText("speech-fr")
    .Locale("fr")
    .Render()

<!-- Spanish locale -->
@Html.EJS().SpeechToText("speech-es")
    .Locale("es")
    .Render()
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

Add translations before or after component creation:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("speech-german")
    .Locale("de")
    .Render()

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
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("speech-custom")
    .Locale("de")
    .Render()

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

### Dynamic Language Switching

Implement language switching on the client side:

```razor
@using Syncfusion.EJ2

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
    
    @Html.EJS().SpeechToText("speech-lang")
        .Locale("en")
        .Render()
</div>

<script>
    // Load translations for multiple languages
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

### Server-side Language Selection

```csharp
// In Controller
public ActionResult VoiceInput()
{
    var userCulture = System.Globalization.CultureInfo.CurrentUICulture.Name;
    ViewBag.UserLanguage = userCulture.Split('-')[0]; // e.g., "de"
    return View();
}
```

```razor
@Html.EJS().SpeechToText("speech")
    .Locale("@ViewBag.UserLanguage")
    .Render()
```

### Language Detection from Browser

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("speech-detect")
    .Locale("en")
    .Render()

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

## RTL Support

Enable Right-to-Left (RTL) layout for Arabic, Hebrew, Persian, etc.

### Enabling RTL

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("speech-rtl")
    .EnableRtl("true")
    .Locale("ar")
    .Render()
```

### RTL with Arabic

```razor
@using Syncfusion.EJ2

<div dir="rtl" style="padding: 20px;">
    @Html.EJS().SpeechToText("speech-arabic")
        .EnableRtl("true")
        .Locale("ar")
        .Render()
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
@using Syncfusion.EJ2

<div dir="rtl">
    @Html.EJS().SpeechToText("speech-hebrew")
        .EnableRtl("true")
        .Locale("he")
        .Render()
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
@using Syncfusion.EJ2

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

@Html.EJS().SpeechToText("speech-accessible")
    .Locale("en")
    .Render()
```

### Multi-Language Accessibility

```razor
@using Syncfusion.EJ2

<div style="padding: 20px;">
    <div style="marginBottom: 20px;">
        <label for="lang-selector">Select Language:</label>
        <select id="lang-selector" onchange="switchLanguage(this.value)">
            <option value="en">English</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
        </select>
    </div>
    
    @Html.EJS().SpeechToText("speech-multi")
        .Locale("en")
        .Render()
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

### Pattern: Regional Localization from ViewBag

```csharp
// In Controller
public ActionResult Index()
{
    var userCulture = System.Globalization.CultureInfo.CurrentCulture.Name;
    ViewBag.UserLocale = userCulture.Split('-')[0];
    return View();
}
```

```razor
@Html.EJS().SpeechToText("speech-regional")
    .Locale("@ViewBag.UserLocale")
    .Render()

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

### Pattern: Query String Language Override

```razor
@using System.Web

@{
    var language = Request.QueryString["lang"] ?? "en";
    var supportedLanguages = new[] { "en", "de", "fr", "es" };
    language = supportedLanguages.Contains(language) ? language : "en";
}

@Html.EJS().SpeechToText("speech-override")
    .Locale(language)
    .Render()

<script>
    var currentLanguage = '@language';
    
    ej.base.L10n.load({
        'de': { 'speech-to-text': { 'startTooltipText': 'Starten' } },
        'fr': { 'speech-to-text': { 'startTooltipText': 'Commencer' } },
        'es': { 'speech-to-text': { 'startTooltipText': 'Comenzar' } }
    });
</script>
```

### Pattern: Dropdown with Language Selection

```razor
@using Syncfusion.EJ2

<label>UI Language:</label>
@Html.EJS().DropDownList("lang-dropdown")
    .DataSource(new List<object>
    {
        new { text = "English", value = "en" },
        new { text = "Deutsch", value = "de" },
        new { text = "Français", value = "fr" }
    })
    .Fields(f => f.Text("text").Value("value"))
    .Change("onLanguageChange")
    .Value("en")
    .Render()

@Html.EJS().SpeechToText("speech")
    .Locale("en")
    .Render()

<script>
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
        }
    });
    
    function onLanguageChange(args) {
        var speechComponent = ej.base.getComponent(
            document.getElementById("speech"),
            "speechtotext"
        );
        speechComponent.locale = args.value;
    }
</script>
```

## Troubleshooting

### Translations not appearing
- Ensure `L10n.load()` is called before component renders
- Check locale code is correct format (two-letter code)
- Verify key names match exactly in translation object

### RTL layout issues
- Set `EnableRtl("true")` on component
- Add `dir="rtl"` to parent container HTML
- Load appropriate RTL-compatible translations
- Test in browsers with RTL language support

### Language switching not updating
- Component may need recreation after locale change
- Use component reference to update locale property immediately
- Verify new locale translations are already loaded before switching

