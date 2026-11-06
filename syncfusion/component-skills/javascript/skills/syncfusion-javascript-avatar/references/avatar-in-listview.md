# Avatar in ListView

## Table of Contents
- [ListView Integration Overview](#listview-integration-overview)
- [Contact List Example](#contact-list-example)
- [Data Source Structure](#data-source-structure)
- [Template Binding](#template-binding)
- [TypeScript Implementation](#typescript-implementation)
- [Styling and Customization](#styling-and-customization)
- [Complete Working Example](#complete-working-example)

## ListView Integration Overview

Avatar can be integrated with the ListView control to create contact lists, user directories, and team member displays. This integration is useful for:

- **Contact Applications**: Display user contacts with avatars and names
- **User Directories**: Show all users in an organization
- **Team Members**: Display team member lists with profile pictures
- **User Selection**: Allow users to select from a list of avatars
- **Activity Feeds**: Show users who performed actions

### Integration Benefits

- **Consistent Styling**: Uses same avatar classes and themes
- **Flexible Media**: Supports images, initials, icons in lists
- **Template Support**: Custom templating for list items
- **Data Binding**: Easy binding to JavaScript/TypeScript arrays
- **Responsive**: Works well on desktop and mobile

## Contact List Example

### Use Case: Contact Manager

Display a list of contacts with their avatars, showing which contacts use images vs. initials:

```typescript
// Sample contact data
const contacts = [
    { id: 's_01', name: 'Robert', avatar: '', image: 'pic04' },
    { id: 's_02', name: 'Nancy', avatar: 'N', image: '' },
    { id: 's_05', name: 'John', avatar: '', image: 'pic01' },
    { id: 's_03', name: 'Andrew', avatar: 'A', image: '' },
    { id: 's_06', name: 'Michael', avatar: '', image: 'pic02' },
    { id: 's_07', name: 'Steven', avatar: '', image: 'pic03' }
];
```

## Data Source Structure

### Contact Data Model

Define your data structure with avatar fields:

```typescript
interface Contact {
    id: string;
    text: string;        // Display name
    avatar: string;      // Initials or letter
    pic: string;         // Image class reference
}
```

### Sample Data Array

```typescript
const dataSource: Contact[] = [
    { 
        id: 's_01', 
        text: 'Robert', 
        avatar: '',      // Will use image
        pic: 'pic04' 
    },
    { 
        id: 's_02', 
        text: 'Nancy', 
        avatar: 'N',     // Will use initial
        pic: '' 
    },
    { 
        id: 's_05', 
        text: 'John', 
        avatar: '',      // Will use image
        pic: 'pic01' 
    },
    { 
        id: 's_03', 
        text: 'Andrew', 
        avatar: 'A',     // Will use initial
        pic: '' 
    },
    { 
        id: 's_06', 
        text: 'Michael', 
        avatar: '',      // Will use image
        pic: 'pic02' 
    },
    { 
        id: 's_07', 
        text: 'Steven', 
        avatar: '',      // Will use image
        pic: 'pic03' 
    }
];
```

### Data with Extended Properties

```typescript
interface ExtendedContact {
    id: string;
    text: string;
    avatar: string;
    pic: string;
    email?: string;
    phone?: string;
    status?: 'online' | 'offline' | 'away';
    role?: string;
}

const extendedData: ExtendedContact[] = [
    {
        id: 's_01',
        text: 'Alice Johnson',
        avatar: '',
        pic: 'pic01',
        email: 'alice@company.com',
        phone: '+1 (555) 123-4567',
        status: 'online',
        role: 'Developer'
    },
    {
        id: 's_02',
        text: 'Bob Smith',
        avatar: 'B',
        pic: '',
        email: 'bob@company.com',
        phone: '+1 (555) 234-5678',
        status: 'away',
        role: 'Designer'
    }
];
```

## Template Binding

### Basic Template

Template for conditional rendering of avatar or image:

```html
<!-- Basic template with conditional avatar -->
<template id="contactTemplate">
    <div class="listWrapper">
        ${if(avatar !== "")}
            <span class="e-avatar e-avatar-small e-avatar-circle">${avatar}</span>
        ${else}
            <span class="${pic} e-avatar e-avatar-small e-avatar-circle"></span>
        ${/if}
        <span class="text">${text}</span>
    </div>
</template>
```

### Template with Extended Properties

```html
<!-- Extended template with additional info -->
<template id="contactTemplateExtended">
    <div class="listWrapper">
        <!-- Avatar -->
        ${if(avatar !== "")}
            <span class="e-avatar e-avatar-small e-avatar-circle">${avatar}</span>
        ${else}
            <span class="${pic} e-avatar e-avatar-small e-avatar-circle"></span>
        ${/if}
        
        <!-- Contact Info -->
        <div class="contact-info">
            <div class="contact-name">${text}</div>
            ${if(role !== undefined)}
                <div class="contact-role">${role}</div>
            ${/if}
            ${if(email !== undefined)}
                <div class="contact-email">${email}</div>
            ${/if}
        </div>
        
        <!-- Status Indicator -->
        ${if(status !== undefined)}
            <div class="status-indicator ${status}"></div>
        ${/if}
    </div>
</template>
```

### Template Syntax

Syncfusion uses Templating Syntax:
- `${property}` - Output property value
- `${if(condition)}` - Conditional block
- `${else}` - Else condition
- `${/if}` - End condition block

## TypeScript Implementation

### Basic ListView with Avatar

```typescript
import { ListView } from '@syncfusion/ej2-lists';

// Define data interface
interface Contact {
    id: string;
    text: string;
    avatar: string;
    pic: string;
}

// Create data source
const dataSource: Contact[] = [
    { id: 's_01', text: 'Robert', avatar: '', pic: 'pic04' },
    { id: 's_02', text: 'Nancy', avatar: 'N', pic: '' },
    { id: 's_05', text: 'John', avatar: '', pic: 'pic01' },
    { id: 's_03', text: 'Andrew', avatar: 'A', pic: '' },
    { id: 's_06', text: 'Michael', avatar: '', pic: 'pic02' },
    { id: 's_07', text: 'Steven', avatar: '', pic: 'pic03' }
];

// Initialize ListView with avatar template
const contactList = new ListView({
    dataSource: dataSource,
    headerTitle: 'Contacts',
    showHeader: true,
    sortOrder: 'Ascending',
    
    // Avatar conditional template
    template: `<div class="listWrapper">
                ${if(avatar !== "")}
                    <span class="e-avatar e-avatar-small e-avatar-circle">\${avatar}</span>
                ${else}
                    <span class="\${pic} e-avatar e-avatar-small e-avatar-circle"></span>
                ${/if}
                <span class="text">\${text}</span>
            </div>`
});

contactList.appendTo('#contactList');
```

### Advanced ListView with Sorting and Selection

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const dataSource = [
    { id: 's_01', text: 'Robert', avatar: '', pic: 'pic04' },
    { id: 's_02', text: 'Nancy', avatar: 'N', pic: '' },
    { id: 's_05', text: 'John', avatar: '', pic: 'pic01' }
];

const contactList = new ListView({
    dataSource: dataSource,
    headerTitle: 'Contacts',
    showHeader: true,
    sortOrder: 'Ascending',
    enableVirtualization: false,
    
    template: `<div class="listWrapper">
                ${if(avatar !== "")}
                    <span class="e-avatar e-avatar-small e-avatar-circle">\${avatar}</span>
                ${else}
                    <span class="\${pic} e-avatar e-avatar-small e-avatar-circle"></span>
                ${/if}
                <span class="text">\${text}</span>
            </div>`,
    
    // Handle item selection
    select: (args) => {
        console.log('Selected:', args.data);
    },
    
    // Handle item action
    actionComplete: (args) => {
        console.log('Action completed:', args);
    }
});

contactList.appendTo('#contactList');
```

### TypeScript with Event Handlers

```typescript
import { ListView, SelectEventArgs } from '@syncfusion/ej2-lists';

interface Contact {
    id: string;
    text: string;
    avatar: string;
    pic: string;
    status?: string;
}

const dataSource: Contact[] = [
    { id: 's_01', text: 'Alice', avatar: 'A', pic: '', status: 'online' },
    { id: 's_02', text: 'Bob', avatar: '', pic: 'pic02', status: 'offline' }
];

const contactList = new ListView({
    dataSource: dataSource,
    headerTitle: 'Team Members',
    showHeader: true,
    
    template: `<div class="listWrapper">
                ${if(avatar !== "")}
                    <span class="e-avatar e-avatar-small e-avatar-circle">\${avatar}</span>
                ${else}
                    <span class="\${pic} e-avatar e-avatar-small e-avatar-circle"></span>
                ${/if}
                <span class="text">\${text}</span>
                <span class="status-badge \${status}"></span>
            </div>`,
    
    // Handle selection event
    select: (args: SelectEventArgs) => {
        console.log('Selected contact:', args.data);
        handleContactSelect(args.data);
    }
});

function handleContactSelect(contact: Contact) {
    // Perform action with selected contact
    console.log(`Selected: ${contact.text}`);
}

contactList.appendTo('#contactList');
```

## Styling and Customization

### CSS for ListView with Avatar

```css
/* ListView Container */
#contactList {
    max-width: 350px;
    margin: auto;
    border: 1px solid #dddddd;
    border-radius: 3px;
}

/* List Header */
#contactList .e-list-header {
    height: 54px;
    background-color: #f5f5f5;
}

#contactList .e-list-header .e-text {
    line-height: 22px;
    font-weight: 500;
}

/* List Item */
#contactList .e-list-item {
    cursor: pointer;
    height: 50px;
    line-height: 44px;
    border: 0;
    padding: 8px 0;
    transition: background-color 0.2s ease;
}

#contactList .e-list-item:hover {
    background-color: #f0f0f0;
}

#contactList .e-list-item.e-active {
    background-color: #e3f2fd;
    border-left: 3px solid #0078d4;
}

/* List Wrapper (Row Layout) */
#contactList .listWrapper {
    width: inherit;
    height: inherit;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 8px;
}

/* Avatar in List */
#contactList .listWrapper .e-avatar {
    position: relative;
    margin-right: 12px;
    flex-shrink: 0;
}

/* Contact Text */
#contactList .listWrapper .text {
    flex-grow: 1;
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* Avatar Background Images */
.pic01 {
    background-image: url('url');
    background-size: cover;
    background-position: center;
}

.pic02 {
    background-image: url('url');
    background-size: cover;
    background-position: center;
}

.pic03 {
    background-image: url('url');
    background-size: cover;
    background-position: center;
}

.pic04 {
    background-image: url('url');
    background-size: cover;
    background-position: center;
}

/* Custom Avatar Colors per Item */
#contactList .e-list-item:nth-child(1) .e-avatar {
    background-color: #039BE5;
}

#contactList .e-list-item:nth-child(3) .e-avatar {
    background-color: #E91E63;
}

#contactList .e-list-item:nth-child(5) .e-avatar {
    background-color: #009688;
}

/* Status Indicator Badge */
.status-badge {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    margin-left: 8px;
}

.status-badge.online {
    background-color: #00b251;
}

.status-badge.offline {
    background-color: #d83b01;
}

.status-badge.away {
    background-color: #ffb900;
}
```

## Complete Working Example

### Full HTML and TypeScript Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar in ListView</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="index.css" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id='container'>
        <div id='element'>
            <!-- ListView element for contacts -->
            <div id="letterAvatarList"></div>
        </div>
    </div>

    <script>
        // Import ListView
        const { ListView } = require('@syncfusion/ej2-lists');

        // Data source with avatar and image
        const dataSource = [
            { id: 's_01', text: 'Robert', avatar: '', pic: 'pic04' },
            { id: 's_02', text: 'Nancy', avatar: 'N', pic: '' },
            { id: 's_05', text: 'John', avatar: '', pic: 'pic01' },
            { id: 's_03', text: 'Andrew', avatar: 'A', pic: '' },
            { id: 's_06', text: 'Michael', avatar: '', pic: 'pic02' },
            { id: 's_07', text: 'Steven', avatar: '', pic: 'pic03' }
        ];

        // Initialize ListView
        const contactList = new ListView({
            dataSource: dataSource,
            headerTitle: 'Contacts',
            showHeader: true,
            sortOrder: 'Ascending',
            template: `<div class="listWrapper">
                        ${if(avatar !== "")}
                            <span class="e-avatar e-avatar-small e-avatar-circle">\${avatar}</span>
                        ${else}
                            <span class="\${pic} e-avatar e-avatar-small e-avatar-circle"></span>
                        ${/if}
                        <span class="text">\${text}</span>
                    </div>`
        });

        contactList.appendTo('#letterAvatarList');
    </script>

    <style>
        #letterAvatarList {
            max-width: 350px;
            margin: auto;
            border: 1px solid #dddddd;
            border-radius: 3px;
        }

        #letterAvatarList .listWrapper {
            width: inherit;
            height: inherit;
            position: relative;
            display: flex;
            align-items: center;
            padding: 0 8px;
        }

        #letterAvatarList .e-list-header {
            height: 54px;
            background-color: #f5f5f5;
        }

        #letterAvatarList .e-list-header .e-text {
            line-height: 22px;
        }

        #letterAvatarList .e-list-item {
            cursor: pointer;
            height: 50px;
            line-height: 44px;
            border: 0;
        }

        #letterAvatarList .e-list-item:hover {
            background-color: #f0f0f0;
        }

        #letterAvatarList .listWrapper .e-avatar {
            margin-right: 12px;
        }

        #letterAvatarList .listWrapper .text {
            flex-grow: 1;
            display: inline-block;
            vertical-align: middle;
            margin: 0 50px;
        }

        /* Avatar Background Images */
        .pic01 {
            background-image: url('url');
        }

        .pic02 {
            background-image: url('url');
        }

        .pic03 {
            background-image: url('url');
        }

        .pic04 {
            background-image: url('url');
        }

        /* Avatar Color Customization -->
        #letterAvatarList .e-list-item:nth-child(1) .e-avatar {
            background-color: #039BE5;
        }

        #letterAvatarList .e-list-item:nth-child(3) .e-avatar {
            background-color: #E91E63;
        }

        #letterAvatarList .e-list-item:nth-child(5) .e-avatar {
            background-color: #009688;
        }
    </style>
</body>
</html>
```

### Multi-Column Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Avatar ListView Multi-Column</title>
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
    <link href="url" rel="stylesheet" />
</head>
<body>
    <div id="contactGrid">
        <h3>Contact Directory</h3>
        <div id="contactList"></div>
    </div>

    <script>
        const { ListView } = require('@syncfusion/ej2-lists');

        const contacts = [
            { id: 1, name: 'Alice Johnson', avatar: 'A', email: 'alice@company.com', phone: '555-0101' },
            { id: 2, name: 'Bob Smith', avatar: 'B', email: 'bob@company.com', phone: '555-0102' },
            { id: 3, name: 'Carol White', avatar: '', pic: 'pic03', email: 'carol@company.com', phone: '555-0103' }
        ];

        const listView = new ListView({
            dataSource: contacts,
            template: `<div class="contact-row">
                        <div class="avatar-col">
                            ${if(avatar !== "")}
                                <span class="e-avatar e-avatar-small e-avatar-circle">\${avatar}</span>
                            ${else}
                                <span class="\${pic} e-avatar e-avatar-small e-avatar-circle"></span>
                            ${/if}
                        </div>
                        <div class="info-col">
                            <div class="name">\${name}</div>
                            <div class="details">
                                <span class="email">\${email}</span> | <span class="phone">\${phone}</span>
                            </div>
                        </div>
                    </div>`
        });

        listView.appendTo('#contactList');
    </script>

    <style>
        #contactGrid {
            max-width: 600px;
            margin: 30px auto;
            padding: 20px;
        }

        .contact-row {
            display: flex;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e0e0e0;
        }

        .avatar-col {
            margin-right: 15px;
        }

        .info-col {
            flex-grow: 1;
        }

        .name {
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 4px;
        }

        .details {
            font-size: 12px;
            color: #666;
        }

        .email, .phone {
            white-space: nowrap;
        }
    </style>
</body>
</html>
```

## Next Steps

- Explore [Customization](./customization.md) for more styling options
- Learn about [Badge Integration](./avatar-with-badge.md) for notification scenarios
- Check [Types and Sizes](./avatar-types-and-sizes.md) for shape variations
