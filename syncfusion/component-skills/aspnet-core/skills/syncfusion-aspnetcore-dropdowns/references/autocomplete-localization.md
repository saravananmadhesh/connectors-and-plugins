# Localization – Syncfusion ASP.NET Core AutoComplete

## Table of Contents
- [Overview](#overview)
- [Localizable Keys](#localizable-keys)
- [Loading Translations with L10n](#loading-translations-with-l10n)
- [Setting the Locale Property](#setting-the-locale-property)

---

## Overview

The AutoComplete supports localization of static text strings displayed in the popup. You can translate template messages for different cultures using the EJ2 `L10n` (Localization) class.

**Localizable properties:**
- `noRecordsTemplate` – Message shown when no items match
- `actionFailureTemplate` – Message shown when remote data fetch fails

---

## Localizable Keys

| Locale Key | Default (en-US) |
|---|---|
| `noRecordsTemplate` | No Records Found |
| `actionFailureTemplate` | The Request Failed |

---

## Loading Translations with L10n

Use the `L10n.load()` JavaScript method to register translations before the component renders.

**Example – French (fr) culture:**

```cshtml
<ejs-autocomplete id="customers"
    placeholder="Trouver un client"
    locale="fr"
    noRecordsTemplate="Aucun enregistrement trouvé">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>

<script>
    ej.base.L10n.load({
        'fr': {
            'dropdowns': {
                'noRecordsTemplate': 'Aucun enregistrement trouvé',
                'actionFailureTemplate': 'La demande a échoué'
            }
        }
    });
</script>
```

**Example – German (de) culture:**

```cshtml
<ejs-autocomplete id="customers"
    placeholder="Kunden suchen"
    locale="de">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>

<script>
    ej.base.L10n.load({
        'de': {
            'dropdowns': {
                'noRecordsTemplate': 'Keine Datensätze gefunden',
                'actionFailureTemplate': 'Anfrage fehlgeschlagen'
            }
        }
    });
</script>
```

---

## Setting the Locale Property

Use the `locale` property to override the global culture for this component instance.

**Default:** `"en-US"`

```cshtml
<ejs-autocomplete id="customers"
    placeholder="Trouver un client"
    locale="fr">
    <e-autocomplete-fields value="ContactName"></e-autocomplete-fields>
    <e-data-manager url="url"
        adaptor="ODataV4Adaptor" crossDomain="true">
    </e-data-manager>
</ejs-autocomplete>
```

> If running the sample offline (no network), the `actionFailureTemplate` is displayed with the translated text when a remote data fetch fails.
