# Internationalization

## Table of Contents
- [Localization Overview](#localization-overview)
- [Localization Keys](#localization-keys)
- [Setting Up Localization](#setting-up-localization)
- [Multi-language Implementation](#multi-language-implementation)
- [RTL Support](#rtl-support)
- [Complete Example](#complete-example)

## Localization Overview

The SpeechToText component supports localization for error messages, tooltips, and ARIA labels. By default, the component uses English (`en-US`). Use the `L10n.load()` method to provide translations for other languages.

## Localization Keys

The following keys can be localized:

| Key | Default (en-US) | Purpose |
|-----|-----------------|---------|
| `abortedError` | Speech recognition was aborted. | Error message when recognition is aborted |
| `audioCaptureError` | No microphone detected. Ensure your microphone is connected. | Microphone not found error |
| `defaultError` | An unknown error occurred. | Generic error message |
| `networkError` | Network error occurred. Check your internet connection. | Network connectivity error |
| `noSpeechError` | No speech detected. Please speak into the microphone. | No audio input detected |
| `notAllowedError` | Microphone access denied. Allow microphone permissions. | Permission denied error |
| `serviceNotAllowedError` | Speech recognition service is not allowed in this context. | Service unavailable error |
| `unsupportedBrowserError` | The browser does not support the SpeechRecognition API. | Browser incompatibility error |
| `startAriaLabel` | Press to start speaking and transcribe your words | ARIA label for start state |
| `stopAriaLabel` | Press to stop speaking and end transcription | ARIA label for stop state |
| `startTooltipText` | Start listening | Tooltip for start state |
| `stopTooltipText` | Stop listening | Tooltip for stop state |

## Setting Up Localization

Use `L10n.load()` to register translation data. Call it in the component's `ngOnInit()` method:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';
import { L10n } from '@syncfusion/ej2-base';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [locale]="'de'">
        </button>
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent implements OnInit {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    ngOnInit(): void {
        // Load German localization
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
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

## Multi-language Implementation

Support multiple languages by loading translations for different locales:

```typescript
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';
import { L10n } from '@syncfusion/ej2-base';

@Component({
    imports: [SpeechToTextModule, TextAreaModule, FormsModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <div class="language-selector">
            <label>Select Language:</label>
            <select [(ngModel)]="selectedLocale" (change)="onLanguageChange()">
                <option value="en">English</option>
                <option value="de">German (Deutsch)</option>
                <option value="fr">French (Français)</option>
                <option value="es">Spanish (Español)</option>
            </select>
        </div>
        
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [locale]="selectedLocale">
        </button>
        
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent implements OnInit {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    public selectedLocale: string = 'en';
    
    ngOnInit(): void {
        // Load multiple language translations
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
                    "startAriaLabel": "Drücken Sie, um zu sprechen",
                    "stopAriaLabel": "Drücken Sie, um zu stoppen",
                    "startTooltipText": "Zuhören starten",
                    "stopTooltipText": "Zuhören beenden"
                }
            },
            'fr': {
                "speech-to-text": {
                    "abortedError": "La reconnaissance vocale a été interrompue.",
                    "audioCaptureError": "Aucun microphone détecté. Assurez-vous que votre microphone est connecté.",
                    "defaultError": "Une erreur inconnue s'est produite.",
                    "networkError": "Erreur réseau. Vérifiez votre connexion Internet.",
                    "noSpeechError": "Aucune parole détectée. Veuillez parler dans le microphone.",
                    "notAllowedError": "Accès au microphone refusé. Autorisez les permissions du microphone.",
                    "serviceNotAllowedError": "Le service de reconnaissance vocale n'est pas autorisé dans ce contexte.",
                    "unsupportedBrowserError": "Le navigateur ne supporte pas l'API SpeechRecognition.",
                    "startAriaLabel": "Appuyez pour commencer à parler",
                    "stopAriaLabel": "Appuyez pour arrêter",
                    "startTooltipText": "Commencer à écouter",
                    "stopTooltipText": "Arrêter d'écouter"
                }
            },
            'es': {
                "speech-to-text": {
                    "abortedError": "El reconocimiento de voz fue cancelado.",
                    "audioCaptureError": "No se detectó micrófono. Asegúrese de que su micrófono está conectado.",
                    "defaultError": "Ocurrió un error desconocido.",
                    "networkError": "Error de red. Verifica tu conexión a Internet.",
                    "noSpeechError": "No se detectó voz. Por favor, hable en el micrófono.",
                    "notAllowedError": "Acceso al micrófono denegado. Permitir permisos de micrófono.",
                    "serviceNotAllowedError": "El servicio de reconocimiento de voz no está permitido en este contexto.",
                    "unsupportedBrowserError": "El navegador no es compatible con la API de SpeechRecognition.",
                    "startAriaLabel": "Presione para comenzar a hablar",
                    "stopAriaLabel": "Presione para detener",
                    "startTooltipText": "Comenzar a escuchar",
                    "stopTooltipText": "Dejar de escuchar"
                }
            }
        });
    }
    
    onLanguageChange(): void {
        console.log('Language changed to:', this.selectedLocale);
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

## RTL Support

Enable Right-to-Left (RTL) text direction for languages like Arabic, Hebrew, and Persian using the `enableRtl` property:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs, ButtonSettingsModel } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container" [dir]="enableRtl ? 'rtl' : 'ltr'">
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [enableRtl]="enableRtl" 
                [buttonSettings]="buttonSettings">
        </button>
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    public enableRtl: boolean = true;  // Enable RTL
    public buttonSettings: ButtonSettingsModel = {
        content: 'ابدأ الاستماع',  // Start Listening in Arabic
        stopContent: 'إيقاف الاستماع'  // Stop Listening in Arabic
    };
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

**RTL Considerations:**
- Set `[dir]="rtl"` on the container for proper text direction
- Buttons and icons automatically reverse positioning
- Tooltips appear on the appropriate side

## Complete Example

Here's a comprehensive localization setup with language switching:

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';
import { L10n } from '@syncfusion/ej2-base';

@Component({
    imports: [SpeechToTextModule, TextAreaModule, FormsModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container" [dir]="isRtl ? 'rtl' : 'ltr'">
        <h3>{{ 'title' | translate }}</h3>
        
        <div class="language-selector">
            <label>{{ 'selectLanguage' | translate }}:</label>
            <select [(ngModel)]="selectedLocale" (change)="onLanguageChange()">
                <option value="en">English</option>
                <option value="de">Deutsch</option>
                <option value="ar">العربية (RTL)</option>
            </select>
        </div>
        
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [locale]="selectedLocale"
                [enableRtl]="isRtl">
        </button>
        
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text...">
        </ejs-textarea>
    </div>`
})
export class AppComponent implements OnInit {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    public selectedLocale: string = 'en';
    public isRtl: boolean = false;
    
    ngOnInit(): void {
        this.setupLocalizations();
    }
    
    private setupLocalizations(): void {
        L10n.load({
            'de': {
                "speech-to-text": {
                    "abortedError": "Abgebrochen",
                    "audioCaptureError": "Kein Mikrofon",
                    "noSpeechError": "Keine Sprache erkannt",
                    "notAllowedError": "Berechtigung verweigert",
                    "startTooltipText": "Zuhören starten",
                    "stopTooltipText": "Zuhören beenden"
                }
            },
            'ar': {
                "speech-to-text": {
                    "abortedError": "تم الإلغاء",
                    "audioCaptureError": "لا يوجد ميكروفون",
                    "noSpeechError": "لم يتم اكتشاف كلام",
                    "notAllowedError": "تم رفض الإذن",
                    "startTooltipText": "ابدأ الاستماع",
                    "stopTooltipText": "إيقاف الاستماع"
                }
            }
        });
    }
    
    onLanguageChange(): void {
        this.isRtl = this.selectedLocale === 'ar';
    }
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

**CSS for RTL Support:**

```css
.speechText-container {
    margin: 50px auto;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    padding: 30px;
}

.speechText-container[dir="rtl"] {
    direction: rtl;
    text-align: right;
}

.speechText-container[dir="rtl"] .language-selector {
    text-align: right;
}

.language-selector {
    margin-bottom: 20px;
}

.language-selector select {
    margin-left: 10px;
    padding: 5px 10px;
}
```

## Best Practices

1. **Load Translations Early**: Call `L10n.load()` in `ngOnInit()` before rendering
2. **Complete Translations**: Provide all keys for consistency
3. **RTL Testing**: Test RTL languages thoroughly for UI layout
4. **Locale Codes**: Use standard locale codes (e.g., `de`, `en`, `fr`)
5. **Fallback Language**: Always provide English as a fallback
6. **Context Awareness**: Use appropriate language for speech recognition (lang property)
