# Preview Tab

The Form Builder includes a Preview tab that lets you validate the generated form before exporting or publishing it. It shows the form as it will appear to end users.

## Previewing the form

Switch to the **Preview** tab to review the current layout, field labels, and behavior. This is the main runtime check before the schema is consumed elsewhere.

```ts
import { Component, ViewChild } from '@angular/core';
import { FormBuilderComponent, FormBuilderModule } from '@syncfusion/ej2-angular-form-builder';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormBuilderModule],
  template: `
    <ejs-form-builder #formObj [enablePreview]="false"></ejs-form-builder>
  `
})
export class App {
  @ViewChild('formObj') public formObj?: FormBuilderComponent;
}
```

## Disabling the preview

The preview capability can be disabled with the `enablePreview` property.

```html
<ejs-form-builder [enablePreview]="false"></ejs-form-builder>
```

The default value is `true`.

## JSON code preview

The **JSON** tab shows the current schema in a code view. This is useful for reviewing the exact structure that the builder generates and for copying it into other code paths such as Form Renderer.

The **Copy** button copies the schema JSON to the clipboard so it can be reused elsewhere.

## Recommended workflow

Use the **Build** tab to create or edit the form, switch to **Preview** to confirm expected output, and then open **JSON** if you need to inspect or reuse the schema definition.
