# Editor Template

## Table of Contents
1. [Custom Editor Fields](#custom-editor-fields)
2. [Field Validation](#field-validation)
3. [Dependent Fields](#dependent-fields)
4. [DateTime Picker](#datetime-picker)
5. [Dropdown Fields](#dropdown-fields)
6. [Custom Styling](#custom-styling)

## Custom Editor Fields

Create custom appointment editor:

```html
<script id="editorTemplate" type="text/x-template">
    <table class="e-schedule-form">
        <tbody>
            <tr>
                <td class="e-textlabel">Subject</td>
                <td>
                    <input id="Subject" name="Subject" type="text" class="e-field" />
                </td>
            </tr>
            <tr>
                <td class="e-textlabel">Priority</td>
                <td>
                    <select id="Priority" name="Priority" class="e-field">
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="e-textlabel">Status</td>
                <td>
                    <select id="Status" name="Status" class="e-field">
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td class="e-textlabel">Notes</td>
                <td>
                    <textarea id="Description" name="Description" class="e-field" rows="3"></textarea>
                </td>
            </tr>
        </tbody>
    </table>
</script>
```

### Apply Template
```cshtml
@Html.EJS().Schedule("Schedule")
    .EditorTemplate("#editorTemplate")
    .Render()
```

## Field Validation

Add validation rules:

```cshtml
.ActionBegin("onActionBegin")
```

```javascript
function onActionBegin(args) {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
        var form = document.querySelector('.e-schedule-form');
        
        // Validate Subject
        var subject = document.getElementById('Subject');
        if (!subject.value.trim()) {
            subject.style.borderColor = 'red';
            alert('Subject is required');
            args.cancel = true;
        }
        
        // Validate custom field
        var priority = document.getElementById('Priority');
        if (!priority.value) {
            priority.style.borderColor = 'red';
            args.cancel = true;
        }
    }
}
```

## Dependent Fields

Show/hide fields based on other values:

```javascript
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('Status').addEventListener('change', function(e) {
        var statusValue = e.target.value;
        var completedDateField = document.getElementById('CompletedDate').parentElement;
        
        // Show completed date only if status is 'Completed'
        if (statusValue === 'Completed') {
            completedDateField.style.display = 'table-row';
        } else {
            completedDateField.style.display = 'none';
        }
    });
});
```

### Conditional Editor Fields
```html
<tr id="completedDateRow" style="display:none;">
    <td class="e-textlabel">Completed Date</td>
    <td>
        <input id="CompletedDate" name="CompletedDate" type="datetime-local" class="e-field" />
    </td>
</tr>
```

## DateTime Picker

Configure date/time input:

```html
<tr>
    <td class="e-textlabel">Start Time</td>
    <td>
        <input id="StartTime" name="StartTime" type="datetime-local" class="e-field" 
               data-start-hour="09" data-start-minute="00" />
    </td>
</tr>
```

### Restrict Time Range
```javascript
document.getElementById('StartTime').addEventListener('change', function(e) {
    var startTime = new Date(e.target.value);
    var endTimeInput = document.getElementById('EndTime');
    
    // End time must be at least 30 minutes after start time
    var minEndTime = new Date(startTime.getTime() + 30 * 60000);
    endTimeInput.setAttribute('min', minEndTime.toISOString().slice(0, 16));
});
```

## Dropdown Fields

Use dropdown for resource selection:

```html
<tr>
    <td class="e-textlabel">Assign To</td>
    <td>
        <select id="ResourceId" name="ResourceId" class="e-field">
            <option value="">-- Select --</option>
            <option value="1">Room A</option>
            <option value="2">Room B</option>
            <option value="3">Conference</option>
        </select>
    </td>
</tr>
```

### Dynamic Population
```javascript
function populateResources() {
    var resourceSelect = document.getElementById('ResourceId');
    var resources = getAvailableResources();
    
    resources.forEach(resource => {
        var option = document.createElement('option');
        option.value = resource.Id;
        option.text = resource.Text;
        resourceSelect.appendChild(option);
    });
}
```

## Custom Styling

Style editor form:

```css
.e-schedule-form {
    width: 100%;
    border-collapse: collapse;
    padding: 20px;
}

.e-schedule-form tr {
    display: flex;
    margin-bottom: 15px;
    align-items: center;
}

.e-textlabel {
    width: 100px;
    font-weight: 600;
    color: #333;
}

.e-schedule-form input,
.e-schedule-form select,
.e-schedule-form textarea {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
}

.e-schedule-form input:focus,
.e-schedule-form select:focus,
.e-schedule-form textarea:focus {
    border-color: #1a73e8;
    outline: none;
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
}
```
