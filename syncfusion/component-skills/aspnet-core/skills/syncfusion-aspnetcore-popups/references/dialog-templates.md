# Templates — Dialog (ASP.NET Core)

## Table of Contents
- [Content Template](#content-template)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [Complex Layouts](#complex-layouts)
- [Data Binding](#data-binding)
- [Template Performance](#template-performance)

## Content Template

The `<e-content-template>` defines the dialog body content. It accepts HTML, Razor syntax, and dynamic data.

### Basic Content

```csharp
<ejs-dialog id="contentDialog" header="Simple Content" width="500px">
    <e-content-template>
        <p>This is plain text content inside the dialog.</p>
    </e-content-template>
</ejs-dialog>
```

### HTML Content

```csharp
<ejs-dialog id="htmlDialog" header="Formatted Content" width="500px">
    <e-content-template>
        <div style="padding: 20px;">
            <h3>Welcome!</h3>
            <p>This dialog contains <strong>formatted</strong> HTML content.</p>
            <ul>
                <li>Feature 1</li>
                <li>Feature 2</li>
                <li>Feature 3</li>
            </ul>
        </div>
    </e-content-template>
</ejs-dialog>
```

### Model Binding

Pass data from your page model to the dialog:

```csharp
@model UserViewModel

<ejs-dialog id="userDialog" header="User Details" width="500px">
    <e-content-template>
        <div style="padding: 20px;">
            <p><strong>Name:</strong> @Model.User.Name</p>
            <p><strong>Email:</strong> @Model.User.Email</p>
            <p><strong>Role:</strong> @Model.User.Role</p>
            <p><strong>Status:</strong> 
                @if (Model.User.IsActive) {
                    <span style="color: green;">Active</span>
                } else {
                    <span style="color: red;">Inactive</span>
                }
            </p>
        </div>
    </e-content-template>
</ejs-dialog>
```

### Dynamic Content with List

```csharp
@model OrdersViewModel

<ejs-dialog id="ordersDialog" header="Recent Orders" width="600px">
    <e-content-template>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Amount</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                @foreach (var order in Model.Orders)
                {
                    <tr>
                        <td>@order.Id</td>
                        <td>$@order.Amount</td>
                        <td>@order.Status</td>
                    </tr>
                }
            </tbody>
        </table>
    </e-content-template>
</ejs-dialog>
```

## Header Template

The `<e-header-template>` allows custom HTML in the header area instead of plain text.

### Custom Header Layout

```csharp
<ejs-dialog id="customHeaderDialog" width="500px">
    <e-header-template>
        <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div>
                <h4 style="margin: 0;">Settings</h4>
                <small style="color: #999;">Configure your preferences</small>
            </div>
            <span style="font-size: 20px;">⚙️</span>
        </div>
    </e-header-template>
    <e-content-template>
        <p>Settings content here.</p>
    </e-content-template>
</ejs-dialog>
```

### Header with Badge

```csharp
<ejs-dialog id="badgeHeaderDialog" header="Messages" width="500px">
    <e-header-template>
        <div style="display: flex; gap: 10px; align-items: center;">
            <span>Messages</span>
            <span class="e-badge e-badge-danger">5</span>
        </div>
    </e-header-template>
    <e-content-template>
        <p>You have 5 unread messages.</p>
    </e-content-template>
</ejs-dialog>
```

### Header with Progress

```csharp
<ejs-dialog id="progressHeaderDialog" width="500px">
    <e-header-template>
        <div style="width: 100%;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                <span>Upload Progress</span>
                <span>75%</span>
            </div>
            <div style="background: #eee; border-radius: 3px; height: 6px;">
                <div style="background: #4CAF50; width: 75%; height: 100%; border-radius: 3px;"></div>
            </div>
        </div>
    </e-header-template>
    <e-content-template>
        <p>Uploading files...</p>
    </e-content-template>
</ejs-dialog>
```

## Footer Template

### Custom Footer with Actions

Use the `footer-template` string property to define a custom footer. When a footer template is set, the `Buttons` property is disabled.

```csharp
<ejs-dialog id="customFooterDialog" 
    header="Custom Footer" 
    width="500px"
    visible="false"
    footerTemplate="<div style='display:flex;justify-content:space-between;padding:15px;'><span style='font-size:12px;color:#999;'>Last saved: <strong>Today at 2:30 PM</strong></span><div><button class='e-btn e-outline' onclick='onSaveDraft()'>Save Draft</button>&nbsp;<button class='e-btn e-primary' onclick='onPublish()'>Publish</button></div></div>">
    <e-content-template>
        <p>This dialog has a custom footer template.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onSaveDraft() {
        alert('Saved as draft');
    }

    function onPublish() {
        alert('Published!');
    }
</script>
```

### Footer with Status Indicator

```csharp
<ejs-dialog id="statusFooterDialog" header="Processing" width="500px"
    visible="false"
    footerTemplate="<div style='padding:15px;text-align:center;border-top:1px solid #ddd;'><span style='color:#FF9800;font-weight:bold;'>⏳ In Progress</span></div>">
    <e-content-template>
        <p>Processing your request...</p>
    </e-content-template>
</ejs-dialog>
```

## Complex Layouts

### Form Template

```csharp
<ejs-dialog id="formDialog" header="User Registration" width="550px" visible="false">
    <e-content-template>
        <form style="padding: 20px;">
            <div class="form-group" style="margin-bottom: 15px;">
                <label>Full Name:</label>
                <input type="text" class="form-control" placeholder="Enter your full name" />
            </div>
            
            <div class="form-group" style="margin-bottom: 15px;">
                <label>Email:</label>
                <input type="email" class="form-control" placeholder="Enter your email" />
            </div>
            
            <div class="form-group" style="margin-bottom: 15px;">
                <label>Country:</label>
                <select class="form-control">
                    <option>Select a country</option>
                    <option>USA</option>
                    <option>Canada</option>
                    <option>UK</option>
                </select>
            </div>
            
            <div class="form-group">
                <label>
                    <input type="checkbox" /> I agree to the terms and conditions
                </label>
            </div>
        </form>
    </e-content-template>
    <e-dialog-buttons>
        <e-dialog-dialogbutton content="Register" isPrimary="true" click="submitForm"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton content="Cancel" click="closeDialog"></e-dialog-dialogbutton>
    </e-dialog-buttons>
</ejs-dialog>

<script>
    function submitForm() {
        var dialog = document.getElementById('formDialog').ej2_instances[0];
        // Process form data
        dialog.hide();
    }

    function closeDialog() {
        document.getElementById('formDialog').ej2_instances[0].hide();
    }
</script>
```

### Two-Column Layout

```csharp
<ejs-dialog id="twoColDialog" header="Comparison" width="700px" height="500px" visible="false">
    <e-content-template>
        <div style="display: flex; gap: 20px; padding: 20px;">
            <div style="flex: 1; border-right: 1px solid #ddd; padding-right: 20px;">
                <h4>Option A</h4>
                <p><strong>Price:</strong> $99/month</p>
                <p><strong>Features:</strong></p>
                <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                </ul>
            </div>
            <div style="flex: 1;">
                <h4>Option B</h4>
                <p><strong>Price:</strong> $199/month</p>
                <p><strong>Features:</strong></p>
                <ul>
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                    <li>Feature 4</li>
                    <li>Feature 5</li>
                </ul>
            </div>
        </div>
    </e-content-template>
</ejs-dialog>
```

### Tabbed Content

```csharp
<ejs-dialog id="tabbedDialog" header="Settings" width="600px" visible="false">
    <e-content-template>
        <div>
            <div class="nav nav-tabs" role="tablist">
                <a class="nav-link active" onclick="switchTab(this, 'general')">General</a>
                <a class="nav-link" onclick="switchTab(this, 'privacy')">Privacy</a>
                <a class="nav-link" onclick="switchTab(this, 'notifications')">Notifications</a>
            </div>
            
            <div id="general" class="tab-content" style="padding: 20px;">
                <p><input type="checkbox" /> Enable dark mode</p>
                <p><input type="checkbox" /> Auto-save drafts</p>
            </div>
            
            <div id="privacy" class="tab-content" style="display: none; padding: 20px;">
                <p><input type="checkbox" /> Profile visibility</p>
                <p><input type="checkbox" /> Show email</p>
            </div>
            
            <div id="notifications" class="tab-content" style="display: none; padding: 20px;">
                <p><input type="checkbox" /> Email notifications</p>
                <p><input type="checkbox" /> Push notifications</p>
            </div>
        </div>
    </e-content-template>
</ejs-dialog>

<script>
    function switchTab(element, tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
        
        // Remove active class
        document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
        
        // Show selected tab and mark as active
        document.getElementById(tabName).style.display = 'block';
        element.classList.add('active');
    }
</script>
```

## Data Binding

### List from Service

```csharp
@model ProductsViewModel

<ejs-dialog id="productsDialog" header="Available Products" width="600px" height="400px" visible="false">
    <e-content-template>
        <div style="padding: 20px; max-height: 350px; overflow-y: auto;">
            @foreach (var product in Model.Products)
            {
                <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                    <h5>@product.Name</h5>
                    <p>@product.Description</p>
                    <p><strong>Price:</strong> $@product.Price</p>
                    <button class="e-btn e-small" onclick="selectProduct(@product.Id)">Select</button>
                </div>
            }
        </div>
    </e-content-template>
</ejs-dialog>

<script>
    function selectProduct(productId) {
        console.log('Selected product:', productId);
        // Handle selection
    }
</script>
```

### Dynamic Content Update

Update dialog content without recreating it:

```csharp
<ejs-dialog id="dynamicDialog" header="Dynamic Content" width="500px" visible="false">
    <e-content-template>
        <div id="dialogContent">
            <p>Loading...</p>
        </div>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="loadDialogContent('users')">Load Users</button>
<button class="e-btn" onclick="loadDialogContent('orders')">Load Orders</button>

<script>
    function loadDialogContent(type) {
        var dialog = document.getElementById('dynamicDialog').ej2_instances[0];
        var contentDiv = document.getElementById('dialogContent');
        
        // Simulate API call
        contentDiv.innerHTML = '<p>Loading ' + type + '...</p>';
        
        setTimeout(() => {
            if (type === 'users') {
                contentDiv.innerHTML = '<p>User list loaded successfully</p>';
            } else {
                contentDiv.innerHTML = '<p>Order list loaded successfully</p>';
            }
        }, 500);
        
        dialog.show();
    }
</script>
```

## Template Performance

### Large Content Optimization

For dialogs with large content, use lazy loading:

```csharp
<ejs-dialog id="largeContentDialog" 
    header="Large Content" 
    width="700px"
    open="onDialogOpen"
    visible="false"
    displayed="false">
    <e-content-template>
        <div id="contentContainer" style="padding: 20px; overflow-y: auto; max-height: 500px;">
            <!-- Content loaded on demand -->
        </div>
    </e-content-template>
</ejs-dialog>

<script>
    function onDialogOpen(args) {
        // Load content only when dialog opens
        var container = document.getElementById('contentContainer');
        if (container.innerHTML === '') {
            loadLargeContent();
        }
    }

    function loadLargeContent() {
        var container = document.getElementById('contentContainer');
        // Fetch and render large dataset
        fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                container.innerHTML = renderData(data);
            });
    }

    function renderData(data) {
        // Render data efficiently
        return data.map(item => `<p>${item.name}</p>`).join('');
    }
</script>
```

### Content Caching

Cache dialog content after first load:

```csharp
<script>
    var dialogContentCache = {};

    function getDialogContent(key) {
        if (dialogContentCache[key]) {
            return dialogContentCache[key];
        }
        
        fetch(`/api/dialog-content/${key}`)
            .then(response => response.json())
            .then(data => {
                dialogContentCache[key] = data;
                updateDialog(data);
            });
    }

    function updateDialog(data) {
        document.getElementById('dialogContent').innerHTML = data.html;
    }
</script>
```

