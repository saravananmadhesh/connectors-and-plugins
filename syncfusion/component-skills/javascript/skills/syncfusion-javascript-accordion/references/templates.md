# Templates

## Table of Contents

- [Overview](#overview)
- [Header Templates](#header-templates)
- [Content Templates](#content-templates)
- [Mixed Templates](#mixed-templates)
- [Data Binding with Templates](#data-binding-with-templates)
- [Performance Considerations](#performance-considerations)
- [Advanced Template Patterns](#advanced-template-patterns)

## Overview

Templates allow you to customize the appearance and structure of accordion headers and items using HTML markup. Instead of plain text, you can include images, buttons, forms, or any other HTML elements.

### Template Properties

| Property | Scope | Use Case |
|----------|-------|----------|
| `headerTemplate` | Header only | Customize just the header/title area |
| `itemTemplate` | Complete item | Customize entire item (header + content in one template) |

**Note:** Use `itemTemplate` to define the complete item structure (header + content together), or use `headerTemplate` to customize just the header while keeping content in the `content` property.

## Header Templates

### Custom Header Markup

Use the `headerTemplate` property to customize header appearance:

```typescript
import { Accordion, AccordionItemModel } from '@syncfusion/ej2-navigations';

const items: AccordionItemModel[] = [
    {
        header: 'Dashboard',
        headerTemplate: () => {
            return '<div class="header-wrapper"><span class="icon">📊</span><span class="title">Dashboard</span><span class="badge">3</span></div>';
        },
        content: 'Dashboard content here'
    },
    {
        header: 'Reports',
        headerTemplate: () => {
            return '<div class="header-wrapper"><span class="icon">📈</span><span class="title">Reports</span><span class="badge">5</span></div>';
        },
        content: 'Reports content here'
    },
    {
        header: 'Settings',
        headerTemplate: () => {
            return '<div class="header-wrapper"><span class="icon">⚙️</span><span class="title">Settings</span></div>';
        },
        content: 'Settings content here'
    }
];

const accordion = new Accordion({ items });
accordion.appendTo('#element');
```

### Header with Buttons

```typescript
const items: AccordionItemModel[] = [
    {
        header: 'Actions',
        headerTemplate: () => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span>User Actions</span>
                    <button class="action-btn" onclick="alert('Edit clicked')">Edit</button>
                </div>
            `;
            return div;
        },
        content: 'Action items content'
    }
];

const accordion = new Accordion({ items });
accordion.appendTo('#element');
```

### Header with Custom Styling

```typescript
const items: AccordionItemModel[] = [
    {
        header: 'Priority: High',
        headerTemplate: () => `
            <div class="priority-header priority-high">
                <span class="priority-badge">🔴</span>
                <span>High Priority Task</span>
                <span class="task-count">12 items</span>
            </div>
        `,
        content: 'High priority items...'
    },
    {
        header: 'Priority: Medium',
        headerTemplate: () => `
            <div class="priority-header priority-medium">
                <span class="priority-badge">🟡</span>
                <span>Medium Priority Task</span>
                <span class="task-count">8 items</span>
            </div>
        `,
        content: 'Medium priority items...'
    }
];
```

## Item Templates

### Complete Item Customization

Use the `itemTemplate` property to customize the complete item (header and content):

```typescript
import { Accordion, AccordionItemModel } from '@syncfusion/ej2-navigations';

const items: AccordionItemModel[] = [
    {
        itemTemplate: () => `
            <div class="custom-item">
                <div class="item-header">
                    <strong>Product Details</strong>
                </div>
                <div class="item-content">
                    <div class="product-details">
                        <img src="product.jpg" alt="Product" />
                        <h3>Product Name</h3>
                        <p>Price: $99.99</p>
                        <p>In Stock: Yes</p>
                        <button>Add to Cart</button>
                    </div>
                </div>
            </div>
        `
    },
    {
        itemTemplate: () => `
            <div class="custom-item">
                <div class="item-header">
                    <strong>Customer Info</strong>
                </div>
                <div class="item-content">
                    <div class="customer-info">
                        <p><strong>Name:</strong> John Doe</p>
                        <p><strong>Email:</strong> john@example.com</p>
                        <p><strong>Phone:</strong> +1-234-567-8900</p>
                        <p><strong>Address:</strong> 123 Main St, City, State</p>
                    </div>
                </div>
            </div>
        `
    }
];

const accordion = new Accordion({ items });
accordion.appendTo('#element');
```

### Item with Forms

```typescript
const items: AccordionItemModel[] = [
    {
        header: 'User Registration',
        itemTemplate: () => `
            <div class="accordion-item-with-form">
                <div class="item-header">
                    <strong>User Registration</strong>
                </div>
                <div class="item-content">
                    <form class="registration-form">
                        <div class="form-group">
                            <label>Username</label>
                            <input type="text" placeholder="Enter username" />
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter email" />
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" placeholder="Enter password" />
                        </div>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        `
    }
];
```

### Item with Tables

```typescript
const items: AccordionItemModel[] = [
    {
        itemTemplate: () => `
            <div class="accordion-item-table">
                <div class="item-header">
                    <strong>Sales Data</strong>
                </div>
                <div class="item-content">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Sales</th>
                                <th>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Product A</td>
                                <td>150 units</td>
                                <td>$15,000</td>
                            </tr>
                            <tr>
                                <td>Product B</td>
                                <td>200 units</td>
                                <td>$20,000</td>
                            </tr>
                            <tr>
                                <td>Product C</td>
                                <td>100 units</td>
                                <td>$10,000</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `
    }
];
```

## Combining HeaderTemplate and Content

You can use `headerTemplate` for custom headers while keeping content in the `content` property:

```typescript
const items: AccordionItemModel[] = [
    {
        headerTemplate: () => `
            <div class="custom-header">
                <strong>User Profile</strong>
            </div>
        `,
        content: `
            <div class="profile-card">
                <img src="avatar.jpg" alt="User" class="avatar" />
                <h3>Jane Smith</h3>
                <p class="role">Senior Developer</p>
                <p class="bio">Experienced TypeScript developer...</p>
                <button class="edit-btn">Edit Profile</button>
            </div>
        `
    }
];
```

### Template Header with Static Content

```typescript
const items: AccordionItemModel[] = [
    {
        headerTemplate: () => `   // Template for header
            <div class="section-header">
                <span class="section-number">1</span>
                <span class="section-title">Getting Started</span>
                <span class="completion">50% Complete</span>
            </div>
        `,
        content: 'This section covers the basics...'  // Static text
    }
];
```

## Data Binding with Templates

### Mapping Data to Templates

```typescript
import { Accordion, AccordionItemModel } from '@syncfusion/ej2-navigations';

interface TeamMember {
    id: number;
    name: string;
    role: string;
    email: string;
    avatar: string;
}

const teamData: TeamMember[] = [
    {
        id: 1,
        name: 'Alice Johnson',
        role: 'Frontend Developer',
        email: 'alice@example.com',
        avatar: 'alice.jpg'
    },
    {
        id: 2,
        name: 'Bob Smith',
        role: 'Backend Developer',
        email: 'bob@example.com',
        avatar: 'bob.jpg'
    }
];

const items: AccordionItemModel[] = teamData.map(member => ({
    itemTemplate: () => `
        <div class="member-item">
            <div class="item-header">
                <img src="${member.avatar}" alt="${member.name}" class="avatar-small" />
                <span>${member.name}</span>
                <span class="role-badge">${member.role}</span>
            </div>
            <div class="item-content">
                <div class="member-details">
                    <p><strong>Email:</strong> ${member.email}</p>
                    <p><strong>Role:</strong> ${member.role}</p>
                    <p><strong>ID:</strong> ${member.id}</p>
                    <button onclick="contactUser('${member.email}')">Contact</button>
                </div>
            </div>
        </div>
    `
}));

const accordion = new Accordion({ items });
accordion.appendTo('#element');
```

### Item Templates with Dynamic Data

```typescript
let items: AccordionItemModel[] = [];

// Initial load
async function loadTemplateData() {
    const response = await fetch('/api/sections');
    const data = await response.json();
    
    items = data.map(section => ({
        itemTemplate: () => `
            <div class="section-item">
                <div class="item-header">
                    <span>${section.title}</span>
                    <span class="count">${section.itemCount}</span>
                </div>
                <div class="item-content">
                    <div class="section-content">
                        ${section.items.map(item => `<p>• ${item}</p>`).join('')}
                    </div>
                </div>
            </div>
        `
    }));
}

// Create accordion after loading
loadTemplateData().then(() => {
    const accordion = new Accordion({ items });
    accordion.appendTo('#element');
});
```

## Performance Considerations

### Avoiding Performance Issues

**❌ Bad - Creating elements repeatedly:**
```typescript
// Inefficient - DOM operations on every render
itemTemplate: () => {
    const div = document.createElement('div');
    for (let i = 0; i < 1000; i++) {
        div.innerHTML += `<p>Item ${i}</p>`;  // Very slow!
    }
    return div;
}
```

**✅ Good - Build string first, set once:**
```typescript
// Efficient - single DOM operation
itemTemplate: () => {
    let html = '';
    for (let i = 0; i < 1000; i++) {
        html += `<p>Item ${i}</p>`;
    }
    return `<div class="accordion-item"><div class="item-header">Items</div><div class="item-content">${html}</div></div>`;
}
```

### Template Caching

```typescript
interface CachedTemplate {
    header: string;
    html: string;
}

const templateCache = new Map<number, CachedTemplate>();

const items: AccordionItemModel[] = [
    {
        itemTemplate: () => {
            // Check cache first
            if (templateCache.has(0)) {
                return templateCache.get(0)?.html || '';
            }
            
            // Build template
            const html = buildComplexTemplate();
            
            // Cache it
            templateCache.set(0, { header: 'Expensive Template', html });
            
            return html;
        }
    }
];

function buildComplexTemplate(): string {
    // Complex calculation or DOM building
    return '<div>Complex content</div>';
}
```

### Virtual Scrolling for Large Lists

```typescript
const items: AccordionItemModel[] = [
    {
        itemTemplate: () => {
            // Only render visible items
            const visibleStart = 0;
            const visibleEnd = 50;
            const allItems = Array.from({length: 10000}, (_, i) => i);
            
            const visibleItemsHtml = allItems
                .slice(visibleStart, visibleEnd)
                .map(i => `<div class="list-item">Item ${i}</div>`)
                .join('');
            
            return `
                <div class="accordion-item">
                    <div class="item-header">Large List (Virtual Scroll)</div>
                    <div class="item-content">
                        <div class="virtual-list">${visibleItemsHtml}</div>
                    </div>
                </div>
            `;
        }
    }
];
```

## Advanced Template Patterns

### Dynamic Template Switching

```typescript
type TemplateType = 'grid' | 'list' | 'card';

interface TemplateConfig {
    currentTemplate: TemplateType;
}

const config: TemplateConfig = { currentTemplate: 'grid' };

const accordion = new Accordion({
    items: [
        {
            itemTemplate: () => {
                const templateMap = {
                    grid: () => `<div class="grid-view">Grid layout content</div>`,
                    list: () => `<div class="list-view">List layout content</div>`,
                    card: () => `<div class="card-view">Card layout content</div>`
                };
                
                return `
                    <div class="accordion-item">
                        <div class="item-header">View Options</div>
                        <div class="item-content">
                            ${templateMap[config.currentTemplate]()}
                        </div>
                    </div>
                `;
            }
        }
    ]
});
```

### Item Template with Event Handlers

```typescript
const items: AccordionItemModel[] = [
    {
        itemTemplate: () => {
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="accordion-item">
                    <div class="item-header">Interactive Content</div>
                    <div class="item-content">
                        <button class="interact-btn">Click Me</button>
                        <div class="result"></div>
                    </div>
                </div>
            `;
            
            // Attach event handler
            const btn = div.querySelector('.interact-btn');
            btn?.addEventListener('click', () => {
                const result = div.querySelector('.result');
                if (result) {
                    result.textContent = 'Button clicked!';
                }
            });
            
            return div;
        }
    }
];
```

### Lazy-Loaded Template Content

```typescript
const items: AccordionItemModel[] = [
    {
        header: 'Lazy Loaded Content',
        itemTemplate: async () => {
            try {
                const response = await fetch('/api/content/large');
                const data = await response.json();
                
                return `
                    <div class="accordion-item">
                        <div class="item-header">Lazy Loaded Content</div>
                        <div class="item-content">
                            <div class="loaded-content">
                                <h3>${data.title}</h3>
                                <p>${data.description}</p>
                            </div>
                        </div>
                    </div>
                `;
            } catch (error) {
                return '<p>Error loading template</p>';
            }
        }
    }
];
```

## Complete Template Example

```typescript
import { Accordion, AccordionItemModel } from '@syncfusion/ej2-navigations';

interface Employee {
    id: number;
    name: string;
    department: string;
    salary: number;
    email: string;
}

const employees: Employee[] = [
    { id: 1, name: 'Alice Brown', department: 'Engineering', salary: 95000, email: 'alice@company.com' },
    { id: 2, name: 'Bob Wilson', department: 'Sales', salary: 75000, email: 'bob@company.com' }
];

const items: AccordionItemModel[] = employees.map(emp => ({
    itemTemplate: () => `
        <div class="employee-item">
            <div class="item-header" style="display: flex; justify-content: space-between; align-items: center;">
                <span><strong>${emp.name}</strong> - ${emp.department}</span>
                <span style="color: #2fa1ff; font-weight: bold;">$${emp.salary.toLocaleString()}</span>
            </div>
            <div class="item-content" style="padding: 15px;">
                <p><strong>Employee ID:</strong> ${emp.id}</p>
                <p><strong>Department:</strong> ${emp.department}</p>
                <p><strong>Email:</strong> <a href="mailto:${emp.email}">${emp.email}</a></p>
                <p><strong>Annual Salary:</strong> $${emp.salary.toLocaleString()}</p>
                <button onclick="editEmployee(${emp.id})">Edit</button>
            </div>
        </div>
    `
}));

const accordion = new Accordion({ 
    items,
    expandMode: 'Single'
});

accordion.appendTo('#employee-accordion');
```

## Next Steps

- Learn advanced features in **Advanced Features**
- Build multi-step forms in **Advanced Use Cases**
- Optimize performance with patterns from **Data Loading and Content**
