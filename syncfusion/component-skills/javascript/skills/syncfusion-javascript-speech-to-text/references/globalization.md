# Globalization

## Table of Contents
- [Localization](#localization)
  - [Default Text Identifiers](#default-text-identifiers)
  - [Loading Translation Data](#loading-translation-data)
  - [Setting Locale](#setting-locale)
  - [Complete Localization Example](#complete-localization-example)
  - [Common Locales](#common-locales)
- [RTL Support](#rtl-support)
  - [Enabling RTL](#enabling-rtl)
  - [RTL with Custom Content](#rtl-with-custom-content)
  - [RTL Best Practices](#rtl-best-practices)

This guide covers internationalization features of the SpeechToText component, including localization for multiple languages and Right-to-Left (RTL) layout support.

## Localization

The SpeechToText component can be localized for any culture using the `L10n.load` method from Syncfusion's base library. Localization affects error messages, tooltips, and ARIA labels.

### Default Text Identifiers

The following table lists all text identifiers and their default English (`en-US`) values:

| Key | Default Text (en-US) | Usage Context |
|-----|---------------------|---------------|
| `abortedError` | Speech recognition was aborted. | Error message when recognition is aborted |
| `audioCaptureError` | No microphone detected. Ensure your microphone is connected. | Error when no microphone is found |
| `defaultError` | An unknown error occurred. | Fallback error message |
| `networkError` | Network error occurred. Check your internet connection. | Error for network issues |
| `noSpeechError` | No speech detected. Please speak into the microphone. | Error when no speech is heard |
| `notAllowedError` | Microphone access denied. Allow microphone permissions. | Error when permissions are denied |
| `serviceNotAllowedError` | Speech recognition service is not allowed in this context. | Error for service restrictions |
| `unsupportedBrowserError` | The browser does not support the SpeechRecognition API. | Error for unsupported browsers |
| `startAriaLabel` | Press to start speaking and transcribe your words | ARIA label for start button |
| `stopAriaLabel` | Press to stop speaking and end transcription | ARIA label for stop button |
| `startTooltipText` | Start listening | Default tooltip for start state |
| `stopTooltipText` | Stop listening | Default tooltip for stop state |

### Loading Translation Data

Use the `L10n.load()` method to provide translations for a specific locale:

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";
import { L10n } from '@syncfusion/ej2-base';

// Load German translations
L10n.load({
    'de': {
        "speech-to-text": {
            "abortedError": "Die Spracherkennung wurde abgebrochen.",
            "audioCaptureError": "Kein Mikrofon erkannt. Stellen Sie sicher, dass Ihr Mikrofon angeschlossen ist.",
            "defaultError": "Ein unbekannter Fehler ist aufgetreten.",
            "networkError": "Netzwerkfehler aufgetreten. Überprüfen Sie Ihre Internetverbindung.",
            "noSpeechError": "Keine Sprache erkannt. Bitte sprechen Sie in das Mikrofon.",
            "notAllowedError": "Mikrofonzugriff verweigert. Erlauben Sie Mikrofonberechtigungen.",
            "serviceNotAllowedError": "Der Spracherkennungsdienst ist in diesem Kontext nicht erlaubt.",
            "unsupportedBrowserError": "Der Browser unterstützt die SpeechRecognition API nicht.",
            "startAriaLabel": "Drücken Sie, um zu sprechen und Ihre Worte zu transkribieren",
            "stopAriaLabel": "Drücken Sie, um das Sprechen zu beenden und die Transkription zu stoppen",
            "startTooltipText": "Zuhören starten",
            "stopTooltipText": "Zuhören beenden"
        }
    }
});
```

### Setting Locale

After loading translations, set the component's `locale` property to the desired culture:

```typescript
const speechToText: SpeechToText = new SpeechToText({
    locale: 'de', // Set to German locale
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');
```

### Complete Localization Example

Here's a complete example with German localization:

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";
import { L10n } from '@syncfusion/ej2-base';

// Load German translations
L10n.load({
    'de': {
        "speech-to-text": {
            "abortedError": "Die Spracherkennung wurde abgebrochen.",
            "audioCaptureError": "Kein Mikrofon erkannt. Stellen Sie sicher, dass Ihr Mikrofon angeschlossen ist.",
            "defaultError": "Ein unbekannter Fehler ist aufgetreten.",
            "networkError": "Netzwerkfehler aufgetreten. Überprüfen Sie Ihre Internetverbindung.",
            "noSpeechError": "Keine Sprache erkannt. Bitte sprechen Sie in das Mikrofon.",
            "notAllowedError": "Mikrofonzugriff verweigert. Erlauben Sie Mikrofonberechtigungen.",
            "serviceNotAllowedError": "Der Spracherkennungsdienst ist in diesem Kontext nicht erlaubt.",
            "unsupportedBrowserError": "Der Browser unterstützt die SpeechRecognition API nicht.",
            "startAriaLabel": "Drücken Sie, um zu sprechen und Ihre Worte zu transkribieren",
            "stopAriaLabel": "Drücken Sie, um das Sprechen zu beenden und die Transkription zu stoppen",
            "startTooltipText": "Zuhören starten",
            "stopTooltipText": "Zuhören beenden"
        }
    }
});

// Initialize with German locale
const speechToText: SpeechToText = new SpeechToText({
    locale: 'de',
    lang: 'de-DE', // Also set speech recognition language
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Der transkribierte Text wird hier angezeigt...'
});
textareaObj.appendTo('#textareaInst');
```

**HTML:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2 - SpeechToText</title>
    <meta charset="utf-8" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-buttons/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-popups/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-inputs/styles/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div id='loader'>LOADING....</div>
    <div id="container">
        <button id="speechtotext_default"></button>
        <textarea id="textareaInst"></textarea>
    </div>
</body>
<style>
    #container {
        margin: 50px auto;
        gap: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
</html>
```

### Common Locales

Here are translation templates for commonly used languages:

#### French (fr-FR)

```typescript
L10n.load({
    'fr': {
        "speech-to-text": {
            "abortedError": "La reconnaissance vocale a été interrompue.",
            "audioCaptureError": "Aucun microphone détecté. Assurez-vous que votre microphone est connecté.",
            "defaultError": "Une erreur inconnue s'est produite.",
            "networkError": "Erreur réseau. Vérifiez votre connexion Internet.",
            "noSpeechError": "Aucune parole détectée. Veuillez parler dans le microphone.",
            "notAllowedError": "Accès au microphone refusé. Autorisez les permissions du microphone.",
            "serviceNotAllowedError": "Le service de reconnaissance vocale n'est pas autorisé dans ce contexte.",
            "unsupportedBrowserError": "Le navigateur ne prend pas en charge l'API SpeechRecognition.",
            "startAriaLabel": "Appuyez pour commencer à parler et transcrire vos mots",
            "stopAriaLabel": "Appuyez pour arrêter de parler et terminer la transcription",
            "startTooltipText": "Commencer l'écoute",
            "stopTooltipText": "Arrêter l'écoute"
        }
    }
});
```

#### Spanish (es-ES)

```typescript
L10n.load({
    'es': {
        "speech-to-text": {
            "abortedError": "El reconocimiento de voz fue interrumpido.",
            "audioCaptureError": "No se detectó ningún micrófono. Asegúrese de que su micrófono esté conectado.",
            "defaultError": "Ocurrió un error desconocido.",
            "networkError": "Error de red. Verifique su conexión a Internet.",
            "noSpeechError": "No se detectó voz. Por favor hable en el micrófono.",
            "notAllowedError": "Acceso al micrófono denegado. Permita los permisos del micrófono.",
            "serviceNotAllowedError": "El servicio de reconocimiento de voz no está permitido en este contexto.",
            "unsupportedBrowserError": "El navegador no admite la API SpeechRecognition.",
            "startAriaLabel": "Presione para comenzar a hablar y transcribir sus palabras",
            "stopAriaLabel": "Presione para dejar de hablar y finalizar la transcripción",
            "startTooltipText": "Comenzar a escuchar",
            "stopTooltipText": "Dejar de escuchar"
        }
    }
});
```

#### Japanese (ja-JP)

```typescript
L10n.load({
    'ja': {
        "speech-to-text": {
            "abortedError": "音声認識が中止されました。",
            "audioCaptureError": "マイクが検出されませんでした。マイクが接続されていることを確認してください。",
            "defaultError": "不明なエラーが発生しました。",
            "networkError": "ネットワークエラーが発生しました。インターネット接続を確認してください。",
            "noSpeechError": "音声が検出されませんでした。マイクに向かって話してください。",
            "notAllowedError": "マイクアクセスが拒否されました。マイクの許可を許可してください。",
            "serviceNotAllowedError": "このコンテキストでは音声認識サービスが許可されていません。",
            "unsupportedBrowserError": "ブラウザはSpeechRecognition APIをサポートしていません。",
            "startAriaLabel": "押すと話し始め、言葉が文字起こしされます",
            "stopAriaLabel": "押すと話すのをやめ、文字起こしが終了します",
            "startTooltipText": "リスニングを開始",
            "stopTooltipText": "リスニングを停止"
        }
    }
});
```

#### Chinese Simplified (zh-CN)

```typescript
L10n.load({
    'zh': {
        "speech-to-text": {
            "abortedError": "语音识别已中止。",
            "audioCaptureError": "未检测到麦克风。确保您的麦克风已连接。",
            "defaultError": "发生未知错误。",
            "networkError": "发生网络错误。请检查您的互联网连接。",
            "noSpeechError": "未检测到语音。请对着麦克风说话。",
            "notAllowedError": "麦克风访问被拒绝。请允许麦克风权限。",
            "serviceNotAllowedError": "在此上下文中不允许使用语音识别服务。",
            "unsupportedBrowserError": "浏览器不支持SpeechRecognition API。",
            "startAriaLabel": "按下开始说话并转录您的话",
            "stopAriaLabel": "按下停止说话并结束转录",
            "startTooltipText": "开始监听",
            "stopTooltipText": "停止监听"
        }
    }
});
```

### Dynamic Locale Switching

Allow users to switch languages at runtime:

```typescript
const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

// Locale selector
document.getElementById('localeSelector').addEventListener('change', (e) => {
    const selectedLocale = e.target.value;
    
    // Update component locale
    speechToText.locale = selectedLocale;
    
    // Update speech recognition language
    const langMap = {
        'en': 'en-US',
        'de': 'de-DE',
        'fr': 'fr-FR',
        'es': 'es-ES',
        'ja': 'ja-JP',
        'zh': 'zh-CN'
    };
    speechToText.lang = langMap[selectedLocale] || 'en-US';
    
    // Refresh component
    speechToText.refresh();
});
```

## RTL Support

The Right-to-Left (RTL) feature provides support for languages that are read from right to left, such as Arabic, Hebrew, or Persian.

### Enabling RTL

Set the `enableRtl` property to `true` to reverse the component's layout and text direction:

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    buttonSettings: {
        content: 'ابدأ الاستماع',
        stopContent: 'أوقف الاستماع'
    },
    enableRtl: true,
    lang: 'ar-SA', // Arabic language
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'سيتم عرض النص المنسوخ هنا...',
    enableRtl: true
});
textareaObj.appendTo('#textareaInst');
```

**HTML:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2 - SpeechToText</title>
    <meta charset="utf-8" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-buttons/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-popups/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-inputs/styles/fluent2.css" rel="stylesheet" />
</head>
<body dir="rtl">
    <div id='loader'>LOADING....</div>
    <div id="container">
        <button id="speechtotext_default"></button>
        <textarea id="textareaInst"></textarea>
    </div>
</body>
<style>
    #container {
        margin: 50px auto;
        gap: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
</html>
```

**What RTL affects:**
- Button text alignment (right-aligned)
- Icon positioning (reversed)
- Tooltip positioning (mirrored)
- Overall layout direction

### RTL with Custom Content

Combine RTL with localization for complete RTL language support:

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";
import { L10n } from '@syncfusion/ej2-base';

// Load Arabic translations
L10n.load({
    'ar': {
        "speech-to-text": {
            "abortedError": "تم إيقاف التعرف على الكلام.",
            "audioCaptureError": "لم يتم اكتشاف ميكروفون. تأكد من توصيل الميكروفون الخاص بك.",
            "defaultError": "حدث خطأ غير معروف.",
            "networkError": "حدث خطأ في الشبكة. تحقق من اتصالك بالإنترنت.",
            "noSpeechError": "لم يتم اكتشاف أي كلام. يرجى التحدث في الميكروفون.",
            "notAllowedError": "تم رفض الوصول إلى الميكروفون. اسمح بأذونات الميكروفون.",
            "serviceNotAllowedError": "خدمة التعرف على الكلام غير مسموح بها في هذا السياق.",
            "unsupportedBrowserError": "المتصفح لا يدعم SpeechRecognition API.",
            "startAriaLabel": "اضغط لبدء التحدث ونسخ كلماتك",
            "stopAriaLabel": "اضغط للتوقف عن التحدث وإنهاء النسخ",
            "startTooltipText": "ابدأ الاستماع",
            "stopTooltipText": "أوقف الاستماع"
        }
    }
});

const speechToText: SpeechToText = new SpeechToText({
    locale: 'ar',
    lang: 'ar-SA',
    enableRtl: true,
    buttonSettings: {
        content: 'ابدأ',
        stopContent: 'أوقف'
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'سيتم عرض النص المنسوخ هنا...',
    enableRtl: true
});
textareaObj.appendTo('#textareaInst');
```

### RTL Best Practices

1. **Set HTML dir attribute:**
```html
<body dir="rtl">
```

2. **Enable RTL on all components:**
```typescript
// Enable RTL on SpeechToText
speechToText.enableRtl = true;

// Enable RTL on related components
textArea.enableRtl = true;
```

3. **Use appropriate fonts:**
```css
body[dir="rtl"] {
    font-family: 'Noto Sans Arabic', 'Arial', sans-serif;
}
```

4. **Test layouts thoroughly:**
- Verify button alignment
- Check icon positions
- Ensure tooltips appear correctly
- Test on different screen sizes

5. **Consider bidirectional text:**
```typescript
// Handle mixed LTR/RTL content
const speechToText = new SpeechToText({
    enableRtl: true,
    transcriptChanged: (args) => {
        // May contain mixed English and Arabic
        textArea.value = args.transcript;
    }
});
```

### RTL with Hebrew

```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'he': {
        "speech-to-text": {
            "abortedError": "זיהוי הדיבור בוטל.",
            "audioCaptureError": "לא זוהה מיקרופון. ודא שהמיקרופון שלך מחובר.",
            "defaultError": "אירעה שגיאה לא ידועה.",
            "networkError": "אירעה שגיאת רשת. בדוק את חיבור האינטרנט שלך.",
            "noSpeechError": "לא זוהה דיבור. אנא דבר למיקרופון.",
            "notAllowedError": "הגישה למיקרופון נדחתה. אפשר הרשאות מיקרופון.",
            "serviceNotAllowedError": "שירות זיהוי הדיבור אינו מורשה בהקשר זה.",
            "unsupportedBrowserError": "הדפדפן אינו תומך ב-SpeechRecognition API.",
            "startAriaLabel": "לחץ כדי להתחיל לדבר ולתעתק את המילים שלך",
            "stopAriaLabel": "לחץ כדי להפסיק לדבר ולסיים את התעתוק",
            "startTooltipText": "התחל להקשיב",
            "stopTooltipText": "הפסק להקשיב"
        }
    }
});

const speechToText = new SpeechToText({
    locale: 'he',
    lang: 'he-IL',
    enableRtl: true
});
speechToText.appendTo('#speechtotext');
```

## Complete Globalization Example

Here's a comprehensive example with multiple language support and RTL:

```typescript
import { SpeechToText, TextArea } from "@syncfusion/ej2-inputs";
import { L10n } from '@syncfusion/ej2-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

// Load multiple locales
L10n.load({
    'de': { /* German translations */ },
    'fr': { /* French translations */ },
    'ar': { /* Arabic translations */ },
    'he': { /* Hebrew translations */ }
});

const speechToText = new SpeechToText({});
speechToText.appendTo('#speechtotext');

const textArea = new TextArea({
    rows: 5,
    cols: 50,
    placeholder: 'Transcription will appear here...'
});
textArea.appendTo('#textarea');

// Language selector
const languageSelector = new DropDownList({
    dataSource: [
        { text: 'English', value: 'en', lang: 'en-US', rtl: false },
        { text: 'German', value: 'de', lang: 'de-DE', rtl: false },
        { text: 'French', value: 'fr', lang: 'fr-FR', rtl: false },
        { text: 'Arabic', value: 'ar', lang: 'ar-SA', rtl: true },
        { text: 'Hebrew', value: 'he', lang: 'he-IL', rtl: true }
    ],
    fields: { text: 'text', value: 'value' },
    value: 'en',
    change: (args) => {
        const selected = languageSelector.dataSource.find(x => x.value === args.value);
        
        // Update locale
        speechToText.locale = selected.value;
        speechToText.lang = selected.lang;
        
        // Update RTL
        speechToText.enableRtl = selected.rtl;
        textArea.enableRtl = selected.rtl;
        document.body.setAttribute('dir', selected.rtl ? 'rtl' : 'ltr');
        
        // Refresh components
        speechToText.refresh();
    }
});
languageSelector.appendTo('#language-selector');
```
