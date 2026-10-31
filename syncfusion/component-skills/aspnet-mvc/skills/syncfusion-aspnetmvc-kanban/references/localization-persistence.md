# Localization and State Persistence

## Overview

Localization enables displaying the Kanban board in different languages, while state persistence maintains user preferences across sessions.

**Key Features:**
- Multi-language support (localization)
- Right-to-left (RTL) layout support
- State persistence for user preferences
- Custom text configuration
- Locale-specific formatting

## Localization

Kanban supports localization for built-in text elements like buttons, tooltips, and messages using the `ej.base.L10n` utility.

### Basic Localization Setup

**Example - Spanish Localization:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Locale("es-ES")    // Set Spanish locale
    .Columns(col =>
    {
        col.HeaderText("Por Hacer").KeyField("Open").Add();
        col.HeaderText("En Progreso").KeyField("InProgress").Add();
        col.HeaderText("Pruebas").KeyField("Testing").Add();
        col.HeaderText("Hecho").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee");
    })
    .Render()

<script>
    // Load Spanish locale
    ej.base.L10n.load({
        'es-ES': {
            'kanban': {
                'items': 'elementos',
                'min': 'Mínimo',
                'max': 'Máximo',
                'cardsSelected': 'Tarjetas Seleccionadas',
                'addTitle': 'Agregar nueva tarjeta',
                'editTitle': 'Editar detalles de la tarjeta',
                'deleteTitle': 'Eliminar tarjeta',
                'deleteContent': '¿Está seguro de que desea eliminar esta tarjeta?',
                'save': 'Guardar',
                'delete': 'Eliminar',
                'cancel': 'Cancelar',
                'yes': 'Sí',
                'no': 'No',
                'close': 'Cerrar',
                'noCard': 'No se encontraron tarjetas',
                'unassigned': 'Sin asignar'
            }
        }
    });
</script>
```

### Supported Locale Keys

**Kanban Locale Keys:**

```javascript
{
    'kanban': {
        'items': 'items',                      // Card count text
        'min': 'Min',                          // Minimum constraint label
        'max': 'Max',                          // Maximum constraint label
        'cardsSelected': 'Cards Selected',     // Selection status
        'addTitle': 'Add new card',            // Add dialog title
        'editTitle': 'Edit card details',      // Edit dialog title
        'deleteTitle': 'Delete card',          // Delete dialog title
        'deleteContent': 'Are you sure you want to delete this card?',
        'save': 'Save',                        // Save button
        'delete': 'Delete',                    // Delete button
        'cancel': 'Cancel',                    // Cancel button
        'yes': 'Yes',                          // Confirmation yes
        'no': 'No',                            // Confirmation no
        'close': 'Close',                      // Close button
        'noCard': 'No cards to display',       // Empty message
        'unassigned': 'Unassigned'             // Unassigned swimlane
    }
}
```

### Multiple Language Example

**Example - French Localization:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Locale("fr-FR")
    .Columns(col =>
    {
        col.HeaderText("À Faire").KeyField("Open").Add();
        col.HeaderText("En Cours").KeyField("InProgress").Add();
        col.HeaderText("Tests").KeyField("Testing").Add();
        col.HeaderText("Terminé").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<script>
    ej.base.L10n.load({
        'fr-FR': {
            'kanban': {
                'items': 'éléments',
                'min': 'Min',
                'max': 'Max',
                'cardsSelected': 'Cartes Sélectionnées',
                'addTitle': 'Ajouter une nouvelle carte',
                'editTitle': 'Modifier les détails de la carte',
                'deleteTitle': 'Supprimer la carte',
                'deleteContent': 'Êtes-vous sûr de vouloir supprimer cette carte?',
                'save': 'Enregistrer',
                'delete': 'Supprimer',
                'cancel': 'Annuler',
                'yes': 'Oui',
                'no': 'Non',
                'close': 'Fermer',
                'noCard': 'Aucune carte à afficher',
                'unassigned': 'Non assigné'
            }
        }
    });
</script>
```

### German Localization

**Example:**

```javascript
ej.base.L10n.load({
    'de-DE': {
        'kanban': {
            'items': 'Artikel',
            'min': 'Min',
            'max': 'Max',
            'cardsSelected': 'Karten Ausgewählt',
            'addTitle': 'Neue Karte hinzufügen',
            'editTitle': 'Kartendetails bearbeiten',
            'deleteTitle': 'Karte löschen',
            'deleteContent': 'Möchten Sie diese Karte wirklich löschen?',
            'save': 'Speichern',
            'delete': 'Löschen',
            'cancel': 'Abbrechen',
            'yes': 'Ja',
            'no': 'Nein',
            'close': 'Schließen',
            'noCard': 'Keine Karten anzuzeigen',
            'unassigned': 'Nicht zugewiesen'
        }
    }
});
```

### Dynamic Locale Switching

**Example - Runtime Locale Change:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Locale("en-US")
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<select id="languageSelect" onchange="changeLocale()">
    <option value="en-US">English</option>
    <option value="es-ES">Español</option>
    <option value="fr-FR">Français</option>
    <option value="de-DE">Deutsch</option>
</select>

<script>
    // Load all locales
    ej.base.L10n.load({
        'es-ES': {
            'kanban': {
                'items': 'elementos',
                'min': 'Mínimo',
                'max': 'Máximo',
                // ... other keys
            }
        },
        'fr-FR': {
            'kanban': {
                'items': 'éléments',
                // ... other keys
            }
        },
        'de-DE': {
            'kanban': {
                'items': 'Artikel',
                // ... other keys
            }
        }
    });
    
    function changeLocale() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var selectedLocale = document.getElementById('languageSelect').value;
        
        kanbanObj.locale = selectedLocale;
        kanbanObj.refresh();
    }
</script>
```

## Right-to-Left (RTL) Support

Enable RTL layout for languages like Arabic, Hebrew, and Urdu using the `EnableRtl` property.

**Example - RTL Layout:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .EnableRtl(true)    // Enable RTL layout
    .Locale("ar-AE")
    .Columns(col =>
    {
        col.HeaderText("للقيام").KeyField("Open").Add();
        col.HeaderText("قيد التنفيذ").KeyField("InProgress").Add();
        col.HeaderText("اختبار").KeyField("Testing").Add();
        col.HeaderText("منجز").KeyField("Close").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<script>
    // Arabic locale
    ej.base.L10n.load({
        'ar-AE': {
            'kanban': {
                'items': 'العناصر',
                'min': 'الحد الأدنى',
                'max': 'الأعلى',
                'cardsSelected': 'البطاقات المحددة',
                'addTitle': 'إضافة بطاقة جديدة',
                'editTitle': 'تحرير تفاصيل البطاقة',
                'deleteTitle': 'حذف البطاقة',
                'deleteContent': 'هل أنت متأكد أنك تريد حذف هذه البطاقة؟',
                'save': 'حفظ',
                'delete': 'حذف',
                'cancel': 'إلغاء',
                'yes': 'نعم',
                'no': 'لا',
                'close': 'إغلاق',
                'noCard': 'لا توجد بطاقات لعرضها',
                'unassigned': 'غير محدد'
            }
        }
    });
</script>
```

**RTL Behavior:**
- Columns displayed from right to left
- Card content aligns to the right
- Drag-and-drop works in RTL direction
- Swimlanes flow right to left

## State Persistence

Maintain user preferences and board state across browser sessions using the `EnablePersistence` property.

**Persisted State Includes:**
- Column order (if AllowColumnDragAndDrop is enabled)
- Card positions
- Swimlane sort order
- Column collapse/expand state
- Selected cards

**Example - Enable Persistence:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .EnablePersistence(true)    // Enable state persistence
    .AllowColumnDragAndDrop(true)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").AllowToggle(true).Add();
        col.HeaderText("In Progress").KeyField("InProgress").AllowToggle(true).Add();
        col.HeaderText("Testing").KeyField("Testing").AllowToggle(true).Add();
        col.HeaderText("Done").KeyField("Close").AllowToggle(true).Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .SwimlaneSettings(swim =>
    {
        swim.KeyField("Assignee");
    })
    .Render()
```

**How It Works:**
- State saved to browser's LocalStorage
- Automatically restored on page reload
- Unique per Kanban instance (based on element ID)
- Persists user customizations

**Storage Key Format:**
```
ej2kanban_kanban_<ID>
```

### Clear Persisted State

**Programmatically Clear State:**

```javascript
// Get Kanban instance
var kanbanObj = document.getElementById('kanban').ej2_instances[0];

// Clear persisted state
localStorage.removeItem('ej2kanban_kanban_kanban');

// Reload page to see default state
location.reload();
```

**Example - Reset Button:**

```razor
<button onclick="resetKanban()">Reset Board to Default</button>

<script>
    function resetKanban() {
        // Clear persisted state
        localStorage.removeItem('ej2kanban_kanban_kanban');
        
        // Refresh page
        location.reload();
    }
</script>
```

### Custom Persistence Logic

**Example - Save/Load Custom State:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Columns(col =>
    {
        col.HeaderText("To Do").KeyField("Open").Add();
        col.HeaderText("In Progress").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary").HeaderField("Id");
    })
    .Render()

<button onclick="saveCustomState()">Save State</button>
<button onclick="loadCustomState()">Load State</button>

<script>
    function saveCustomState() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        
        // Get current state
        var state = {
            dataSource: kanbanObj.kanbanData,
            columns: kanbanObj.columns,
            swimlaneSettings: kanbanObj.swimlaneSettings
        };
        
        // Save to custom storage (e.g., server)
        localStorage.setItem('customKanbanState', JSON.stringify(state));
        alert('State saved!');
    }
    
    function loadCustomState() {
        var kanbanObj = document.getElementById('kanban').ej2_instances[0];
        var savedState = localStorage.getItem('customKanbanState');
        
        if (savedState) {
            var state = JSON.parse(savedState);
            
            // Restore state
            kanbanObj.dataSource = state.dataSource;
            kanbanObj.dataBind();
            
            alert('State loaded!');
        } else {
            alert('No saved state found');
        }
    }
</script>
```

## Server-Side Persistence

Persist board state on the server for cross-device synchronization.

**Example - Save State to Server:**

```csharp
// Controller
[HttpPost]
public ActionResult SaveBoardState(string userId, string boardState)
{
    // Save to database
    var user = db.Users.Find(userId);
    user.KanbanBoardState = boardState;
    db.SaveChanges();
    
    return Json(new { success = true });
}

[HttpGet]
public ActionResult LoadBoardState(string userId)
{
    var user = db.Users.Find(userId);
    return Json(new { boardState = user.KanbanBoardState }, JsonRequestBehavior.AllowGet);
}
```

```javascript
// Client-side
function saveBoardStateToServer() {
    var kanbanObj = document.getElementById('kanban').ej2_instances[0];
    var state = {
        dataSource: kanbanObj.kanbanData,
        columnOrder: kanbanObj.columns.map(c => c.keyField)
    };
    
    $.ajax({
        url: '/Kanban/SaveBoardState',
        type: 'POST',
        data: {
            userId: getCurrentUserId(),
            boardState: JSON.stringify(state)
        },
        success: function() {
            console.log('State saved to server');
        }
    });
}

function loadBoardStateFromServer() {
    $.ajax({
        url: '/Kanban/LoadBoardState',
        type: 'GET',
        data: { userId: getCurrentUserId() },
        success: function(response) {
            if (response.boardState) {
                var state = JSON.parse(response.boardState);
                var kanbanObj = document.getElementById('kanban').ej2_instances[0];
                kanbanObj.dataSource = state.dataSource;
                kanbanObj.dataBind();
            }
        }
    });
}

function getCurrentUserId() {
    // Return current user ID from your authentication system
    return 'user123';
}
```

## Date and Number Formatting

Format dates and numbers based on locale.

**Example - Locale-Specific Formatting:**

```razor
@Html.EJS().Kanban("kanban")
    .KeyField("Status")
    .DataSource((IEnumerable<object>)ViewBag.data)
    .Locale("de-DE")
    .Columns(col =>
    {
        col.HeaderText("Zu Erledigen").KeyField("Open").Add();
        col.HeaderText("In Arbeit").KeyField("InProgress").Add();
    })
    .CardSettings(card =>
    {
        card.ContentField("Summary")
            .HeaderField("Id")
            .Template("#cardTemplate");
    })
    .Render()

<script id="cardTemplate" type="text/x-jsrender">
    <div class='card-template'>
        <div class='card-header'>#${Id}</div>
        <div class='card-content'>${Summary}</div>
        <div class='card-footer'>
            <span>${formatDate(DueDate)}</span>
            <span>${formatNumber(Estimate)}</span>
        </div>
    </div>
</script>

<script>
    // Format date for German locale
    function formatDate(dateStr) {
        if (!dateStr) return '';
        var date = new Date(dateStr);
        return date.toLocaleDateString('de-DE', { 
            year: 'numeric', 
            month: '2-digit', 
            day: '2-digit' 
        });
    }
    
    // Format number for German locale
    function formatNumber(num) {
        if (!num) return '';
        return num.toLocaleString('de-DE', {
            minimumFractionDigits: 1,
            maximumFractionDigits: 1
        });
    }
</script>
```

## Best Practices

### Localization
1. **Load locales early**: Load all required locales before Kanban initialization
2. **Complete translations**: Translate all locale keys for consistency
3. **Test thoroughly**: Verify translations with native speakers
4. **Fallback to English**: Provide English as default fallback
5. **Column headers**: Don't forget to translate column header text
6. **Custom text**: Localize custom templates and messages

### RTL Support
1. **Test thoroughly**: Verify layout in actual RTL languages
2. **Custom CSS**: Ensure custom styles work in both LTR and RTL
3. **Icons**: Use neutral icons that work in both directions
4. **Padding/margin**: Use logical properties (start/end) instead of left/right

### State Persistence
1. **Unique IDs**: Ensure each Kanban instance has a unique ID
2. **Version control**: Include version number in persisted state for compatibility
3. **Data validation**: Validate loaded state before applying
4. **Clear strategy**: Provide clear button for users
5. **Security**: Don't persist sensitive data in LocalStorage
6. **Server sync**: Use server-side persistence for multi-device access
7. **Conflict resolution**: Handle conflicts when multiple devices modify state
8. **Storage limits**: Monitor LocalStorage quota usage

### Performance
1. **Lazy load locales**: Load only the required locale files
2. **Compress state**: Use compression for large persisted states
3. **Debounce saves**: Don't save state on every change
4. **Clean up**: Remove old persisted states periodically

## Common Patterns

**Pattern 1: Multi-Language Application**
```javascript
// Load all required locales at startup
ej.base.L10n.load({
    'es-ES': { kanban: { ... } },
    'fr-FR': { kanban: { ... } },
    'de-DE': { kanban: { ... } }
});

// Switch based on user preference
kanbanObj.locale = userPreferredLocale;
```

**Pattern 2: Persistent User Preferences**
```javascript
// Save on change
kanbanObj.dragStop = function(args) {
    localStorage.setItem('kanbanState', JSON.stringify(kanbanObj.kanbanData));
};

// Restore on load
window.addEventListener('load', function() {
    var savedState = localStorage.getItem('kanbanState');
    if (savedState) {
        kanbanObj.dataSource = JSON.parse(savedState);
    }
});
```

**Pattern 3: RTL + Localization**
```razor
.EnableRtl(true)
.Locale("ar-AE")
```
