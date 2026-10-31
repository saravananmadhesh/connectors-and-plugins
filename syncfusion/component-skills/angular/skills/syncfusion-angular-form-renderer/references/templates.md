# Templates

## Overview

Templates allow custom Angular UI to replace the built-in widget rendering for a field or widget type. This is useful when you want to render a third-party control or an application-specific input inside a schema-driven form.

## Custom widget setting API

The renderer accepts `customWidgetSettings`, an array of `CustomWidgetSettingModel` entries. Each setting can specify:

| Property | Type | Purpose |
| --- | --- | --- |
| `template` | `string \| HTMLElement \| Function` | Template content. Angular template metadata describes this as `string \| object`; defaults to `null`. |
| `type` | `string` | Widget type to target; defaults to an empty string. |
| `templateId` | `string` | Match the field's `templateId`, regardless of the `type` setting; defaults to an empty string. |
| `fieldName` | `string` | Match the field's schema `name`, regardless of the `type` setting; defaults to an empty string. |

`type` applies a template to fields of that widget type. `templateId` and `fieldName` allow narrower targeting without requiring a matching `type` value. The API does not specify precedence when multiple targeting properties are set together, so avoid relying on an undocumented precedence.

The renderer property `enableHtmlSanitizer` enables sanitization for untrusted HTML in custom string/script templates. Its default is `false`; turn it on when custom template content is not trusted.

## Input template contract

When a custom template replaces an editable field, it may render a native input or a third-party/custom Angular component. The renderer does not require the custom element itself to be a native input, select, or checkbox. Bind the custom control's public value input/property to the renderer-provided `data.value` (for a text input, `[value]="data.value ?? ''"`), and send user edits back through `setFieldValue` using the field's schema `name`.

For a custom component, use that component's documented value input and change output/event; do not assume every component uses names such as `value` and `valueChange`. The actual interactive control must be keyboard-focusable and receive focus. Do not bind only a decorative wrapper or hidden host input while leaving the custom control disconnected from Form Renderer state. Keep focus on the active control during value updates, and do not force autofocus on render unless the user explicitly requests initial focus.

## Register a template for a widget type

Use `<e-customwidgetsettings>` and `<e-customwidgetsetting>` to register a template. The template uses a `type` value to target all fields of a given widget type.

Choose the targeting scope that matches the requested UI customization:

- `type`: replace the rendering for every field of that widget type.
- `fieldName`: replace the rendering for the field with that schema `name`.
- `templateId`: replace the rendering for fields whose schema declares the matching `templateId`.

Multiple setting entries can be registered for different widget types. Use `type` for a consistent customer-wide control style and `fieldName` or `templateId` when only a particular field needs a different UI.

```ts
<ejs-form-renderer #formObj [schema]="schema" (submit)="onSubmit($event)">
  <e-customwidgetsettings>
    <e-customwidgetsetting type="textbox">
      <ng-template #template let-data>
        <input
          [type]="data.fieldData?.textboxType || data.textboxType"
          [id]="data.fieldData?.id || data.id"
          [name]="data.fieldData?.name || data.name"
          class="custom-input"
          [value]="data.value ?? ''"
          (input)="onInputChange($event, data, formObj)"
        />
      </ng-template>
    </e-customwidgetsetting>
  </e-customwidgetsettings>
</ejs-form-renderer>
```

## Apply a template to a single field

To target one field instead of all controls of a type, use `fieldName` or `templateId`.

```ts
<e-customwidgetsetting fieldName="emailAddress">
  <ng-template #template let-data>
    <input
      [type]="data.fieldData?.textboxType || data.textboxType"
      [value]="data.value ?? ''"
    />
  </ng-template>
</e-customwidgetsetting>
```

For `templateId`, put the matching `templateId` value on the field in `properties` and use that same value on `<e-customwidgetsetting>`. Prefer `fieldName` when the customization belongs to one named field; prefer `templateId` when the schema explicitly groups fields under a template identifier.

## Updating the form value from a custom template

When you replace the default widget with a native input or custom component, update the Form Renderer value programmatically through the component instance. For a custom component, connect its public change event to the same handler and read the emitted value according to that component's API.

```ts
public onInputChange(event: Event, data: any, formObj: FormRendererComponent) {
  const value = (event.target as HTMLInputElement).value;
  if (formObj) {
    formObj.setFieldValue(data.fieldData.id, value);
  }
}
```

## Key guidance

Use custom templates when the default Syncfusion controls do not match the UX requirement, or when you need a design-specific input while still keeping the schema and form logic declarative.
