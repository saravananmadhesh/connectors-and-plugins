# Inline Formatting

## Table of Contents
- [Overview](#overview)
- [Available inline formats](#available-inline-formats)
- [Toggle text styles](#toggle-text-styles)
- [Font and styling](#font-and-styling)
- [Clear all inline formatting](#clear-all-inline-formatting)
- [Inline Format Commands (fluent builder)](#inline-format-commands-fluent-builder)
  - [Toggle text-style commands](#toggle-text-style-commands)
  - [Color commands](#color-commands)
  - [Typography commands](#typography-commands)
- [Programmatic end-to-end example](#programmatic-end-to-end-example)
- [Configuration Options](#configuration-options)
  - [Font family (`fontFamily`)](#font-family-fontfamily)
    - [Built-in font family](#built-in-font-family)
    - [Custom font family](#custom-font-family)
    - [Google font support](#google-font-support)
  - [Font size (`fontSize`)](#font-size-fontsize)
    - [Built-in font size](#built-in-font-size)
    - [Custom font size](#custom-font-size)
  - [Font and background color (`fontColor`, `backgroundColor`)](#font-and-background-color-fontcolor-backgroundcolor)
    - [Custom font and background colors](#custom-font-and-background-colors)
- [Configuring keyboard shortcuts (`keyBindings`)](#configuring-keyboard-shortcuts-keybindings)
- [Keyboard shortcuts (text formatting)](#keyboard-shortcuts-text-formatting)
- [API Reference](#api-reference)
  - [AlignmentCommandBuilder](#alignmentcommandbuilder)
  - [ColorCommandBuilder](#colorcommandbuilder)
  - [FontFamily](#fontfamily)
  - [FontFamilyModel](#fontfamilymodel)
  - [FontFamilyItem](#fontfamilyitem)
  - [FontFamilyCommandBuilder](#fontfamilycommandbuilder)
  - [FontSize](#fontsize)
  - [FontSizeModel](#fontsizemodel)
  - [FontSizeItem](#fontsizeitem)
  - [FontSizeCommandBuilder](#fontsizecommandbuilder)
  - [Format](#format)
  - [FormatModel](#formatmodel)
  - [TextAlignment](#textalignment)
  - [ToggleCommandBuilder](#togglecommandbuilder)

---

## Overview

The Modern Rich Text Editor ships a curated set of inline formats that apply character-level marks to the selected text without changing the surrounding block. The toolbar palette exposes these formats through built-in items, and the same formats are reachable from code through the fluent `commands()` builder. This page lists every inline format the component supports, the toolbar item that triggers it, and how it is exposed in code. For configuration of the inline dropdowns and color pickers, see [Configuration Options](#configuration-options). For runtime invocation of every inline format, see [Inline Format Commands (fluent builder)](#inline-format-commands-fluent-builder).

The Modern Rich Text Editor exposes every inline format through two equivalent surfaces — a toolbar click and the fluent `editor.commands().<builder>().<setter>().apply()` chain. Both routes converge on the same [`actionBegin`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#actionbegin) / [`actionComplete`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#actionComplete) pipeline and share identical cancellation and history semantics.

## Available inline formats

The table below lists the inline formats available in the Modern Rich Text Editor's toolbar.

| Name | Summary | Initialization |
|----------------|---------|------------------------------------------|
| Bold | Makes the selected text thicker and darker. | toolbarSettings: { items: ['Bold'] } |
| Italic | Slants the selected text to the right. | toolbarSettings: { items: ['Italic'] } |
| Underline | Adds a line beneath the selected text. | toolbarSettings: { items: ['Underline'] } |
| StrikeThrough | Applies a line through the selected text. | toolbarSettings: { items: ['StrikeThrough'] } |
| SubScript | Positions the selected text slightly below the normal line. | toolbarSettings: { items: ['SubScript'] } |
| SuperScript | Positions the selected text slightly above the normal line. | toolbarSettings: { items: ['SuperScript'] } |
| LowerCase | Converts the selected text to lowercase. | toolbarSettings: { items: ['LowerCase'] } |
| UpperCase | Converts the selected text to uppercase. | toolbarSettings: { items: ['UpperCase'] } |
| InlineCode | Formats the selected text as inline code. | toolbarSettings: { items: ['InlineCode'] } |
| FontName | Defines the font family applied to the selected text. | toolbarSettings: { items: ['FontName'] } |
| FontSize | Defines the font size applied to the selected text. | toolbarSettings: { items: ['FontSize'] } |
| FontColor | Applies a foreground color to the selected text. | toolbarSettings: { items: ['FontColor'] } |
| BackgroundColor | Applies a highlight (background) color to the selected text. | toolbarSettings: { items: ['BackgroundColor'] } |
| ClearFormat | Removes all inline formatting from the selected text. | toolbarSettings: { items: ['ClearFormat'] } |

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Type something ...';
    public toolbarSettings: object = {
        items: [
            'Bold', 'Italic', 'Underline', 'Strikethrough',
            'Subscript', 'Superscript', 'LowerCase', 'UpperCase', '|',
            'InlineCode', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'ClearFormat'
        ]
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

## Toggle text styles

The toggle styles include `Bold`, `Italic`, `Underline`, `StrikeThrough`, `SubScript`, `SuperScript`, `LowerCase`, `UpperCase`, and `InlineCode`. They carry no value payload — clicking the toolbar item, or invoking the command without arguments, flips the mark for the selection or sets the active typing mark for a collapsed caret.

## Font and styling

The `FontName`, `FontSize`, `FontColor`, and `BackgroundColor` toolbar items are bound to a `FontName` dropdown, a `FontSize` dropdown, and the foreground and background Color Picker controls respectively. Each accepts a typed payload and the empty string removes the corresponding mark from the selection. For property-by-property configuration, see [Configuration Options](#configuration-options).

## Clear all inline formatting

The `ClearFormat` toolbar item strips every inline mark (bold, italic, underline, strikethrough, subscript, superscript, code, color, highlight, font size, and font family) from the current selection without altering the block structure. For a programmatic equivalent, use `clearFormat` from the [Inline Format Commands (fluent builder)](#inline-format-commands-fluent-builder) section.

## Inline Format Commands (fluent builder)

The Modern Rich Text Editor exposes every inline format through two equivalent surfaces — a toolbar click and the fluent `editor.commands().<builder>().<setter>().apply()` chain. Both routes converge on the same `actionBegin` / `actionComplete` pipeline and share identical cancellation and history semantics.

### Toggle text-style commands

Toggle commands carry no payload. They flip the mark for the selection or set the active typing mark for a collapsed caret.

```ts
this.rteObj.commands().bold().apply();
this.rteObj.commands().italic().apply();
this.rteObj.commands().underline().apply();
this.rteObj.commands().strikethrough().apply();
this.rteObj.commands().subscript().apply();
this.rteObj.commands().superscript().apply();
this.rteObj.commands().inlineCode().apply();
this.rteObj.commands().clearFormat().apply();
this.rteObj.commands().uppercase().apply();
this.rteObj.commands().lowercase().apply();
```

### Color commands

Both color commands share the `ColorCommand { color: string }` payload. An empty string removes the corresponding mark from the selection.

#### Apply a color

```ts
this.rteObj.commands().fontColor().color('#DC2626').apply();
this.rteObj.commands().backgroundColor().color('rgba(255, 247, 199, 1)').apply();
```

#### Remove a color

```ts
this.rteObj.commands().fontColor().color('').apply();
this.rteObj.commands().backgroundColor().color('').apply();
```

The empty-string signal is the documented convention for removing a color mark. Any other "no color" string is treated as a literal color.

### Typography commands

#### Font size

```ts
this.rteObj.commands().fontSize().size('16px').apply();
this.rteObj.commands().fontSize().size('').apply(); // remove the font size
```

`size` accepts any CSS size string — `'12px'`, `'1.5em'`, `'small'`, `'120%'`. The default dropdown item sends `{ size: 'Default' }`, which is treated as remove the font size.

#### Font family

```ts
this.rteObj.commands().fontName().family('Georgia, serif').apply();
this.rteObj.commands().fontName().family('').apply(); // remove the font family
```

The toolbar item label is `FontName`, but the command name and mark type are both `fontFamily`. The fluent builder is exposed as `.fontName()` to match the toolbar label.

## Programmatic end-to-end example

```ts
import { Component, ViewChild } from '@angular/core';
import { RichTextEditorUIModule, RichTextEditorUIComponent } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class App {
    @ViewChild('editor') public rteObj!: RichTextEditorUIComponent;

    public placeholder: string = 'Type something ...';
    public toolbarSettings: object = {
        items: [
            'Bold', 'Italic', 'Underline', 'Strikethrough',
            '|',
            'FontSize', 'FontName', 'FontColor', 'BackgroundColor',
            '|',
            'InlineCode', 'ClearFormat'
        ]
    };

    public applyBold(): void { this.rteObj.commands().bold().apply(); }
    public applyUnderline(): void { this.rteObj.commands().underline().apply(); }
    public applyFontSize(): void { this.rteObj.commands().fontSize().size('18px').apply(); }
    public applyFontColor(): void { this.rteObj.commands().fontColor().color('#00A3FF').apply(); }
    public applyHighlight(): void { this.rteObj.commands().backgroundColor().color('#FFF7C7').apply(); }
    public applyClearFormat(): void { this.rteObj.commands().clearFormat().apply(); }
}
```

```html
<div class="external-toolbar">
    <button id="boldBtn" (click)="applyBold()">Bold</button>
    <button id="underlineBtn" (click)="applyUnderline()">Underline</button>
    <button id="fontSizeBtn" (click)="applyFontSize()">18px Font Size</button>
    <button id="fontColorBtn" (click)="applyFontColor()">Blue Font Color</button>
    <button id="highlightBtn" (click)="applyHighlight()">Highlight</button>
    <button id="clearFormatBtn" (click)="applyClearFormat()">Clear Format</button>
</div>
<ejs-richtexteditor-ui
    #editor
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

## Configuration Options

The Modern Rich Text Editor exposes the configuration surface for inline formats through the `fontSize`, `fontFamily`, `fontColor`, and `backgroundColor` settings models. These options control which values appear in the toolbar dropdowns and Color Pickers and how those controls are rendered. For the full list of inline formats, see [Available inline formats](#available-inline-formats). For runtime invocation of every inline format, see [Inline Format Commands (fluent builder)](#inline-format-commands-fluent-builder).

### Font family (`fontFamily`)

The Rich Text Editor initializes with a default font family, which inherits the font family of the parent element. You can change the font for selected text using the font family dropdown in the toolbar. When the default font family is selected, the toolbar displays `Font Name`. For other font families, the toolbar shows the name of the selected font.

#### Built-in font family

You can add the `FontName` tool to the Modern Rich Text Editor toolbar using the `toolbarSettings` [items](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarSettings#items) property.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Type something ...';
    public toolbarSettings: object = {
        items: ['FontName']
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

#### Custom font family

The Modern Rich Text Editor supports providing custom fonts along with the existing list. To add additional font names to the font dropdown, configure the `items` field of the [fontFamily](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontFamily#items) property.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Type something ...';
    public toolbarSettings: object = {
        items: ['FontName']
    };
    public fontFamily: object = {
        items: [
            { text: 'Default', value: 'Default' },
            { text: 'Segoe UI', value: 'Segoe UI, sans-serif' },
            { text: 'Roboto', value: 'Roboto, sans-serif' },
            { text: 'Georgia', value: 'Georgia, serif' },
            { text: 'Courier New', value: 'Courier New, monospace' }
        ]
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings"
    [fontFamily]="fontFamily">
</ejs-richtexteditor-ui>
```

#### Google font support

To use web fonts in the Modern Rich Text Editor, the web fonts do not need to be present on the local machine. To add web fonts to the editor, refer the web font links in your page and add the font names to the [fontFamily](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontFamily#items) property.

```ts
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    template: `<ejs-richtexteditor-ui
        [toolbarSettings]="toolbarSettings"
        [fontFamily]="fontFamily">
    </ejs-richtexteditor-ui>`
})
export class App {
    public toolbarSettings: object = {
        items: ['FontName']
    };
    public fontFamily: object = {
        items: [
            { text: 'Default', value: 'Default' },
            { text: 'Roboto', value: 'Roboto, sans-serif' },
            { text: 'Great Vibes', value: '"Great Vibes", cursive' }
        ]
    };
}
```

The following web font links are referenced in the page.

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Great+Vibes">
```

### Font size (`fontSize`)

The Modern Rich Text Editor initializes with a default font size, which inherits the font size of the parent element. You can change the size for the selected text using the font size dropdown in the toolbar. When the default font size is selected, the toolbar displays `Font Size`. For other font sizes, the toolbar shows the selected size.

#### Built-in font size

You can add the `FontSize` tool to the Modern Rich Text Editor toolbar using the `toolbarSettings` [items](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarSettings#items) property.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Type something ...';
    public toolbarSettings: object = {
        items: ['FontSize']
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

#### Custom font size

The Modern Rich Text Editor supports providing custom sizes along with the existing list. To add additional sizes to the font size dropdown, configure the `items` field of the [fontSize](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontSize#items) property.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Type something ...';
    public toolbarSettings: object = {
        items: ['FontSize']
    };
    public fontSize: object = {
        items: [
            { text: 'Default', value: 'Default' },
            { text: '10', value: '10px' },
            { text: '12', value: '12px' },
            { text: '14', value: '14px' },
            { text: '16', value: '16px' },
            { text: '18', value: '18px' },
            { text: '24', value: '24px' },
            { text: '32', value: '32px' }
        ]
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings"
    [fontSize]="fontSize">
</ejs-richtexteditor-ui>
```

### Font and background color (`fontColor`, `backgroundColor`)

You can add the `FontColor` and `BackgroundColor` tools to the Modern Rich Text Editor toolbar using the `toolbarSettings` [items](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/toolbarSettings#items) property.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Type something ...';
    public toolbarSettings: object = {
        items: ['FontColor', 'BackgroundColor']
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings">
</ejs-richtexteditor-ui>
```

#### Custom font and background colors

The `FontColor` and `BackgroundColor` properties offer two modes — `Picker` and `Palette`. The `Palette` mode provides a predefined set of colors, while the `Picker` mode includes a color scheme to choose custom colors. You can switch between these options using the [modeSwitcher](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontColorModel#modeSwitcher) feature.

The number of columns in the color palette for both `FontColor` and `BackgroundColor` can be configured using the [columns](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/backgroundColorModel#columns) property. The [default](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/backgroundColorModel#default) property specifies the default color that is applied when no color is explicitly selected by the user.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule, SlashCommandService } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    providers: [SlashCommandService],
    templateUrl: './app.component.html'
})
export class App {
    public placeholder: string = 'Type something ...';
    public toolbarSettings: object = {
        items: ['FontColor', 'BackgroundColor']
    };
    public fontColor: object = {
        default: '#DC2626',
        mode: 'Palette',
        columns: 5,
        modeSwitcher: true
    };
    public backgroundColor: object = {
        default: '#FFF7C7',
        mode: 'Picker',
        columns: 5,
        modeSwitcher: false
    };
}
```

```html
<ejs-richtexteditor-ui
    [placeholder]="placeholder"
    [toolbarSettings]="toolbarSettings"
    [fontColor]="fontColor"
    [backgroundColor]="backgroundColor">
</ejs-richtexteditor-ui>
```

## Configuring keyboard shortcuts (`keyBindings`)

You can override default shortcut key combinations or assign custom combinations using the [`keyBindings`](https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/index-default#keybindings) property.

### Syntax Rules

- Modifiers and key values are separated with a `+` symbol (e.g., `'ctrl+alt+k'`).
- Supported modifier tokens: `ctrl`, `shift`, `alt`, and `meta`.
- Key values can be written in lowercase (e.g., `'ctrl+b'`).
- The Modern Rich Text Editor automatically updates corresponding toolbar button tooltips and accessibility attributes to match your custom key bindings.

### Configuration Example

Use the keyBindings property to customize or override the default keyboard shortcuts. In the following example, the built-in shortcuts for link insertion, code blocks, and image insertion are remapped to custom key combinations.

```ts
import { Component } from '@angular/core';
import { RichTextEditorUIModule } from '@syncfusion/ej2-angular-richtexteditor-ui';

@Component({
    imports: [RichTextEditorUIModule],
    standalone: true,
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class App {
    public toolbarSettings: object = {
        items: ['Bold', 'Italic', 'Underline', 'Strikethrough', '|', 'BulletList', 'NumberedList', '|', 'Link', 'Image', 'Table', 'CodeBlock', '|', 'Undo', 'Redo'],
        keyBindings: {
            link: 'ctrl+alt+k',
            image: 'ctrl+alt+i',
            'code-block': 'ctrl+shift+c'
        }
    };
}
```

```html
<ejs-richtexteditor-ui [toolbarSettings]="toolbarSettings"></ejs-richtexteditor-ui>
```

## Keyboard shortcuts (text formatting)

The Modern Rich Text Editor provides built-in keyboard shortcuts to perform formatting, edit content, insert elements, and navigate the user interface efficiently without relying on mouse interactions.

**Modifier Key Conventions**

Default shortcuts use standard cross-platform modifier keys:

| Platform | Modifier Key Representation |
| :--- | :--- |
| **Windows / Linux** | <kbd>Ctrl</kbd>, <kbd>Shift</kbd>, <kbd>Alt</kbd> |
| **macOS** | <kbd>Cmd (⌘)</kbd>, <kbd>Shift (⇧)</kbd>, <kbd>Option (⌥)</kbd> |

### Text Formatting & Styles

| Action | Windows / Linux | macOS | Description |
| :--- | :--- | :--- | :--- |
| **Bold** | <kbd>Ctrl</kbd> + <kbd>B</kbd> | <kbd>⌘</kbd> + <kbd>B</kbd> | Toggles bold styling on the selected text. |
| **Italic** | <kbd>Ctrl</kbd> + <kbd>I</kbd> | <kbd>⌘</kbd> + <kbd>I</kbd> | Toggles italic styling on the selected text. |
| **Underline** | <kbd>Ctrl</kbd> + <kbd>U</kbd> | <kbd>⌘</kbd> + <kbd>U</kbd> | Applies or removes underline formatting. |
| **Strikethrough** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>S</kbd> | Strikes through the selected text. |
| **Subscript** | <kbd>Ctrl</kbd> + <kbd>=</kbd> | <kbd>⌘</kbd> + <kbd>=</kbd> | Converts the selected text to subscript. |
| **Superscript** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>=</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>=</kbd> | Converts the selected text to superscript. |
| **Inline Code** | <kbd>Ctrl</kbd> + <kbd>E</kbd> | <kbd>⌘</kbd> + <kbd>E</kbd> | Formats the selected text as inline code. |
| **Clear Format** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> | Clears inline formatting from the selection. |
| **Uppercase** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>U</kbd> | Transforms the selection to uppercase. |
| **Lowercase** | <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | <kbd>⌘</kbd> + <kbd>Shift</kbd> + <kbd>L</kbd> | Transforms the selection to lowercase. |
---

## API Reference

### AlignmentCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/alignmentcommandbuilder>

Builder for text alignment command.

#### Methods

- `align(value: TextAlignment): this` — Set the text alignment. Returns `this`.
- `apply(): void` — Execute the alignment command with set options. Returns `void`.

---

### ColorCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/colorcommandbuilder>

Builder for font color and background color commands.

#### Methods

- `color(value: string): this` — Set the color value (CSS color string). Returns `this`.
- `apply(): void` — Execute the color command. Returns `void`.

---

### FontFamily

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontfamily>

Font family settings for the editor. Configures the font family dropdown control within the toolbar.

#### Properties

- `items: FontFamilyItem[]` — Specifies the default font family items for the dropdown. Each item includes id, text, command, and typed value payload. Defaults to `DEFAULT_FONT_FAMILY_ITEMS`.
- `width: string` — Specifies the width of the dropdown content area. Defaults to `'72px'`.

---

### FontFamilyModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontfamilymodel>

Interface for a class `FontFamily`.

#### Properties

- `items: FontFamilyItem[]` — Specifies the default font family items for the dropdown. Each item includes id, text, command, and typed value payload.
- `width: string` — Specifies the width of the dropdown content area.

---

### FontFamilyItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontfamilyitem>

Typed interface for font family dropdown items. Represents a single font family option with family name and editor command.

#### Properties

- `command: string` — Editor command to execute (must be `'fontName'`).
- `id: string` — Unique identifier for the dropdown menu item.
- `text: string` — Display text for the item (e.g., `'Arial'`).
- `value: string` — Font family value payload with font name (e.g., `{ family: 'Arial' }`).

---

### FontFamilyCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontfamilycommandbuilder>

Builder for font family command.

#### Methods

- `family(fontName: string): this` — Set the font family name. Parameter `fontName`: the font family name to set. Returns `this`.
- `apply(): void` — Execute the font family command with set options. Returns `void`.

---

### FontSize

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontsize>

Font size settings for the editor. Configures the font size dropdown control within the toolbar.

#### Properties

- `items: FontSizeItem[]` — Specifies the default font size items for the dropdown. Each item includes id, text, command, and typed value payload. Defaults to `DEFAULT_FONT_SIZE_ITEMS`.
- `width: string` — Specifies the width of the dropdown content area. Defaults to `'60px'`.

---

### FontSizeModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontsizemodel>

Interface for a class `FontSize`.

#### Properties

- `items: FontSizeItem[]` — Specifies the default font size items for the dropdown. Each item includes id, text, command, and typed value payload.
- `width: string` — Specifies the width of the dropdown content area.

---

### FontSizeItem

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontsizeitem>

Typed interface for font size dropdown items. Represents a single font size option with numeric value and editor command.

#### Properties

- `command: string` — Editor command to execute (must be `'fontSize'`).
- `id: string` — Unique identifier for the dropdown menu item.
- `text: string` — Display text for the item (e.g., `'14'`).
- `value: string` — Font size value payload with CSS unit (e.g., `{ size: '14px' }`).

---

### FontSizeCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/fontsizecommandbuilder>

Builder for font size command.

#### Methods

- `size(sizeValue: string): this` — Set the font size. Parameter `sizeValue`: the font size value to set. Returns `this`.
- `apply(): void` — Execute the font size command with set options. Returns `void`.

---

### Format

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/format>

Configuration for the Format toolbar item.

#### Properties

- `items: ToolbarSubItem[]` — Specifies the items displayed in the Format dropdown. Defaults to `DEFAULT_FORMAT_ITEMS`.
- `width: string` — Specifies the width of the Format dropdown. Defaults to `'75px'`.

---

### FormatModel

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/formatmodel>

Interface for a class `Format`.

#### Properties

- `items: ToolbarSubItem[]` — Specifies the items displayed in the Format dropdown.
- `width: string` — Specifies the width of the Format dropdown.

---

### TextAlignment

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/textalignment>

Members:

- `left`
- `center`
- `right`
- `justify`

---

### ToggleCommandBuilder

Source: <https://ej2.syncfusion.com/angular/documentation/api/richtexteditor-ui/togglecommandbuilder>

Base builder for toggle commands (bold, italic, etc.).

#### Methods

- `apply(): void` — Executes the toggle command. Returns `void`.
