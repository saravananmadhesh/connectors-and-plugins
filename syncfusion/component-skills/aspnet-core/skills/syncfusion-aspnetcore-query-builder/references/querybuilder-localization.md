# Localization in QueryBuilder

The Syncfusion `L10n` library enables translating all static text in the QueryBuilder to any language/culture. Set the `locale` property to the desired locale code and provide the translation object.

## Setting the Locale Property

```cshtml
<ejs-querybuilder id="querybuilder" locale="de" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="Vorname" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Land" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

<script>
    ej.base.L10n.load({
        'de': {
            'query-builder': {
                'AddGroup': 'Gruppe hinzufügen',
                'AddCondition': 'Bedingung hinzufügen',
                'DeleteRule': 'Diese Bedingung entfernen',
                'DeleteGroup': 'Gruppe löschen',
                'Edit': 'BEARBEITEN',
                'SelectField': 'Feld auswählen',
                'SelectOperator': 'Operator auswählen',
                'StartsWith': 'Beginnt mit',
                'EndsWith': 'Endet mit',
                'Contains': 'Enthält',
                'Equal': 'Gleich',
                'NotEqual': 'Ungleich',
                'LessThan': 'Kleiner als',
                'LessThanOrEqual': 'Kleiner oder gleich',
                'GreaterThan': 'Größer als',
                'GreaterThanOrEqual': 'Größer oder gleich',
                'Between': 'Zwischen',
                'NotBetween': 'Nicht zwischen',
                'In': 'In',
                'NotIn': 'Nicht in',
                'Remove': 'ENTFERNEN',
                'ValidationMessage': 'Dieses Feld ist erforderlich',
                'AND': 'UND',
                'OR': 'ODER',
                'SelectValue': 'Wert eingeben'
            }
        }
    });
</script>
```

---

## Complete Locale Key Reference

All locale keys for the QueryBuilder component under the `'query-builder'` namespace:

| Locale Key | Default (en-US) Text | Description |
|------------|---------------------|-------------|
| `AddGroup` | Add Group | Add group button label |
| `AddCondition` | Add Condition | Add condition button label |
| `AddButton` | Add Group/Condition | Combined add button label |
| `DeleteRule` | Remove this condition | Rule delete button tooltip |
| `DeleteGroup` | Delete group | Group delete button tooltip |
| `Edit` | EDIT | Edit button (summary view) |
| `SelectField` | Select a field | Field dropdown placeholder |
| `SelectOperator` | Select operator | Operator dropdown placeholder |
| `StartsWith` | Starts With | Operator display name |
| `EndsWith` | Ends With | Operator display name |
| `DoesNotStartWith` | Does Not Start With | Operator display name |
| `DoesNotEndWith` | Does Not End With | Operator display name |
| `Contains` | Contains | Operator display name |
| `DoesNotContain` | Does Not Contain | Operator display name |
| `Equal` | Equal | Operator display name |
| `NotEqual` | Not Equal | Operator display name |
| `LessThan` | Less Than | Operator display name |
| `LessThanOrEqual` | Less Than Or Equal | Operator display name |
| `GreaterThan` | Greater Than | Operator display name |
| `GreaterThanOrEqual` | Greater Than Or Equal | Operator display name |
| `Between` | Between | Operator display name |
| `NotBetween` | Not Between | Operator display name |
| `In` | In | Operator display name |
| `NotIn` | Not In | Operator display name |
| `Remove` | REMOVE | Remove button label |
| `ValidationMessage` | This field is required | Validation error message |
| `SummaryViewTitle` | Summary View | Summary view section header |
| `OtherFields` | Other Fields | Other fields label in summary |
| `AND` | AND | AND connector label |
| `OR` | OR | OR connector label |
| `SelectValue` | Enter Value | Value input placeholder |
| `IsEmpty` | Is Empty | Operator display name |
| `IsNotEmpty` | Is Not Empty | Operator display name |
| `IsNull` | Is Null | Operator display name |
| `IsNotNull` | Is Not Null | Operator display name |

---

## Arabic (RTL) Localization Example

Combine `locale="ar"` with `enableRtl="true"` for full right-to-left Arabic support:

```cshtml
<ejs-querybuilder id="querybuilder" locale="ar" enableRtl="true" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="الاسم الأول" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="البلد" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

<script>
    ej.base.L10n.load({
        'ar': {
            'query-builder': {
                'AddGroup': 'إضافة مجموعة',
                'AddCondition': 'إضافة شرط',
                'AddButton': 'إضافة مجموعة/شرط',
                'DeleteRule': 'إزالة هذا الشرط',
                'DeleteGroup': 'حذف المجموعة',
                'Edit': 'تعديل',
                'SelectField': 'اختر حقلاً',
                'SelectOperator': 'اختر عامل التشغيل',
                'StartsWith': 'يبدأ بـ',
                'EndsWith': 'ينتهي بـ',
                'Contains': 'يحتوي على',
                'Equal': 'يساوي',
                'NotEqual': 'لا يساوي',
                'LessThan': 'أقل من',
                'LessThanOrEqual': 'أقل من أو يساوي',
                'GreaterThan': 'أكبر من',
                'GreaterThanOrEqual': 'أكبر من أو يساوي',
                'Between': 'بين',
                'NotBetween': 'ليس بين',
                'In': 'في',
                'NotIn': 'ليس في',
                'Remove': 'إزالة',
                'ValidationMessage': 'هذا الحقل مطلوب',
                'AND': 'و',
                'OR': 'أو',
                'SelectValue': 'أدخل قيمة'
            }
        }
    });
</script>
```

---

## French Localization Example

```javascript
ej.base.L10n.load({
    'fr': {
        'query-builder': {
            'AddGroup': 'Ajouter un groupe',
            'AddCondition': 'Ajouter une condition',
            'DeleteRule': 'Supprimer cette condition',
            'DeleteGroup': 'Supprimer le groupe',
            'SelectField': 'Sélectionner un champ',
            'SelectOperator': "Sélectionner l'opérateur",
            'Equal': 'Égal',
            'NotEqual': 'Différent de',
            'Contains': 'Contient',
            'StartsWith': 'Commence par',
            'EndsWith': 'Termine par',
            'AND': 'ET',
            'OR': 'OU',
            'ValidationMessage': 'Ce champ est requis',
            'SelectValue': 'Entrer une valeur'
        }
    }
});
```

```cshtml
<ejs-querybuilder id="querybuilder" locale="fr" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="Prénom" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Pays" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

## See Also

- [Configuration & How-To](querybuilder-configuration-and-how-to.md) — EnableRtl and other settings
- [Templates & Appearance](querybuilder-templates-and-appearance.md) — Customize UI elements
