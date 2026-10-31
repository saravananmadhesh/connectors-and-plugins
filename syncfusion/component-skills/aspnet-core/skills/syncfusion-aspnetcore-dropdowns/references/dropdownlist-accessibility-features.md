# Accessibility and Features — DropDownList (ASP.NET Core)

> **Official Docs:**  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/accessibility  
> https://ej2.syncfusion.com/aspnetcore/documentation/drop-down-list/localization

---

## Accessibility Compliance

The DropDownList component follows WAI-ARIA specifications and meets the following standards:

| Standard | Support |
|----------|---------|
| WCAG 2.2 Level AA | ✅ Yes |
| Section 508 | ✅ Yes |
| Screen Reader | ✅ Yes |
| Right-To-Left (RTL) | ✅ Yes |
| Color Contrast | ✅ Yes |
| Mobile Device | ✅ Yes |
| Keyboard Navigation | ✅ Yes |
| Accessibility Checker Validation | ✅ Yes |

---

## WAI-ARIA Attributes

The DropDownList uses the `listbox` role. Each list item has an `option` role. The following ARIA attributes are applied:

| ARIA Attribute | Description |
|----------------|-------------|
| `aria-haspopup` | Indicates whether the input has a popup list |
| `aria-expanded` | Indicates whether the popup is open |
| `aria-selected` | Indicates the selected option |
| `aria-readonly` | Indicates the readonly state of the component |
| `aria-disabled` | Indicates whether the component is disabled |
| `aria-activedescendent` | Holds the ID of the active list item |
| `aria-owns` | Contains the ID of the popup list element |

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Arrow Down` | Selects the first item if none selected; otherwise selects the next item |
| `Arrow Up` | Selects the previous item |
| `Page Down` | Scrolls down to next page and selects first item when popup is open |
| `Page Up` | Scrolls up to previous page and selects first item when popup is open |
| `Enter` | Selects the focused item; toggles popup if closed |
| `Tab` | Moves to the next TabIndex element (closes popup if open) |
| `Shift + Tab` | Moves to the previous TabIndex element (closes popup if open) |
| `Alt + Down` | Opens the popup list |
| `Alt + Up` | Closes the popup list |
| `Esc (Escape)` | Closes the popup; retains the current selected item |
| `Home` | Selects the first item |
| `End` | Selects the last item |

---

## Accessibility Example

```cshtml
<ejs-dropdownlist id="games"
    dataSource="@ViewBag.data"
    placeholder="Select a game"
    popupHeight="220px">
</ejs-dropdownlist>

<script>
    document.onkeyup = function (e) {
        var atcObject = document.getElementById("games").ej2_instances[0];
        if (e.altKey && e.keyCode === 84 /* t */) {
            // Press Alt+T to programmatically focus the control
            atcObject.focusIn();
        }
    };
</script>
```

---

## RTL (Right-to-Left) Support

Enable RTL rendering using the `enableRtl` property:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    enableRtl="true"
    placeholder="Select an item">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## Localization

The DropDownList uses the `locale` property to apply localization. It affects the text of `noRecordsTemplate` and `actionFailureTemplate`.

### Default Localizable Keys

| Key | Default Value |
|-----|---------------|
| `noRecordsTemplate` | `"No records found"` |
| `actionFailureTemplate` | `"The request failed"` |

### Applying French (fr-BE) Localization

**⚠️ SECURITY (W011):** Use same-origin endpoints only, remove `crossDomain="true"`.

```cshtml
<ejs-dropdownlist id="customers"
    locale="fr-BE"
    query="new ej.data.Query().from('Customers').select(['ContactName', 'CustomerID']).take(0)"
    placeholder="Select a customer"
    popupHeight="200px">
    <e-dropdownlist-fields value="ContactName"></e-dropdownlist-fields>
    <e-data-manager url="/api/customers"
                    adaptor="UrlAdaptor">
    </e-data-manager>
</ejs-dropdownlist>

<script>
    ej.base.L10n.load({
        'fr-BE': {
            'dropdowns': {
                'noRecordsTemplate': "Aucun enregistrement trouvé",
                'actionFailureTemplate': "Modèle d'échec d'action"
            }
        }
    });
</script>
```

---

## Readonly State

When `readonly` is `true`, the user cannot interact with the dropdown but it remains focusable:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    readonly="true"
    value="@ViewBag.selectedValue"
    placeholder="Read-only">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## Disabled State

When `enabled` is `false`, the entire component is disabled (cannot be focused or interacted with):

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    enabled="false"
    placeholder="Disabled">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

---

## Enable Persistence

Persist the selected value across page reloads using `enablePersistence`:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    enablePersistence="true"
    placeholder="Select an item">
    <e-dropdownlist-fields text="Name" value="Id"></e-dropdownlist-fields>
</ejs-dropdownlist>
```

> When enabled, the `value` state is saved and restored between page reloads.

---

## Mobile Device Full Screen

By default (`isDeviceFullScreen="true"`), the popup opens in full-screen mode on mobile when filtering is enabled. Set to `false` for consistent behavior across desktop and mobile:

```cshtml
<ejs-dropdownlist id="ddl"
    dataSource="@ViewBag.data"
    allowFiltering="true"
    isDeviceFullScreen="false"
    placeholder="Select an item">
</ejs-dropdownlist>
```

---

## Relevant Properties from api.md

| Property | Attribute | Description |
|----------|-----------|-------------|
| `EnableRtl` | `enableRtl` | Right-to-left rendering |
| `Locale` | `locale` | Culture/locale string (default `"en-US"`) |
| `Readonly` | `readonly` | User interaction disabled, but focusable |
| `Enabled` | `enabled` | Enable/disable entire component |
| `EnablePersistence` | `enablePersistence` | Persist `value` state across reloads |
| `IsDeviceFullScreen` | `isDeviceFullScreen` | Full-screen popup on mobile (default `true`) |
| `NoRecordsTemplate` | `noRecordsTemplate` | Template when no records found |
| `ActionFailureTemplate` | `actionFailureTemplate` | Template when remote fetch fails |

## Relevant Events from api.md

| Event | Attribute | Description |
|-------|-----------|-------------|
| `Focus` | `focus` | Fires when component receives focus |
| `Blur` | `blur` | Fires when component loses focus |
| `Created` | `created` | Fires when component is created |
| `Destroyed` | `destroyed` | Fires when component is destroyed |
