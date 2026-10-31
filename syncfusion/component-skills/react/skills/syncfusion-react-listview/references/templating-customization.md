# Templating & Customization

## Table of Contents
- [Item Templates](#item-templates)
- [Header Templates](#header-templates)
- [Group Templates](#group-templates)
- [Template Syntax](#template-syntax)
- [Dynamic Templates](#dynamic-templates)
- [CSS Customization](#css-customization)
- [RTL Support](#rtl-support)

## Item Templates

### JSX Template

```tsx
import { ListViewComponent } from '@syncfusion/ej2-react-lists';

export function JSXTemplateExample() {
  const data = [
    { id: '1', name: 'Alice', email: 'alice@example.com', avatar: 'A' },
    { id: '2', name: 'Bob', email: 'bob@example.com', avatar: 'B' }
  ];

  const itemTemplate = (props: any) => (
    <div className="e-list-wrapper e-list-multi-line e-list-avatar">
      <div className="e-avatar e-avatar-circle" style={{ background: '#2196F3' }}>
        {props.avatar}
      </div>
      <div style={{ marginLeft: '10px' }}>
        <span className="e-list-item-header">{props.name}</span>
        <span className="e-list-content">{props.email}</span>
      </div>
    </div>
  );

  return (
    <ListViewComponent
      dataSource={data}
      fields={{ id: 'id', text: 'name' }}
      template={itemTemplate}
    />
  );
}
```

### Function Template

```tsx
const itemTemplate = (props: any) => {
  return (
    `<div class="list-item">
      <h5>${props.text}</h5>
      <p>${props.description}</p>
    </div>`
  );
};

// As string (HTML)
const itemTemplateHTML = '<div class="list-item"><h5>${text}</h5></div>';

<ListViewComponent
  dataSource={data}
  template={itemTemplate}  // Or itemTemplateHTML
/>
```

### Complex Item Template

```tsx
export function ComplexTemplateExample() {
  const data = [
    {
      id: '1',
      productName: 'Laptop',
      price: 999,
      rating: 4.5,
      inStock: true,
      image: '/laptop.jpg'
    },
    {
      id: '2',
      productName: 'Mouse',
      price: 25,
      rating: 4.0,
      inStock: true,
      image: '/mouse.jpg'
    }
  ];

  const productTemplate = (props: any) => (
    <div className="product-card" style={{ 
      display: 'flex', 
      padding: '15px', 
      borderBottom: '1px solid #eee' 
    }}>
      <img
        src={props.image}
        alt={props.productName}
        style={{ width: '80px', height: '80px', marginRight: '15px' }}
      />
      
      <div style={{ flex: 1 }}>
        <h5 style={{ margin: '0 0 5px 0' }}>{props.productName}</h5>
        
        <div style={{ marginBottom: '5px' }}>
          <span style={{ marginRight: '10px' }}>
            {'⭐'.repeat(Math.floor(props.rating))}
          </span>
          <span style={{ color: '#666' }}>{props.rating}/5</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
            ${props.price}
          </span>
          <span style={{
            color: props.inStock ? 'green' : 'red',
            fontWeight: 'bold'
          }}>
            {props.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <ListViewComponent
      dataSource={data}
      template={productTemplate}
    />
  );
}
```

## Header Templates

### Custom Header Template

```tsx
export function HeaderTemplateExample() {
  const headerTemplate = () => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px',
      background: '#2196F3',
      color: 'white'
    }}>
      <h3 style={{ margin: 0 }}>My List</h3>
      <button style={{
        background: 'white',
        color: '#2196F3',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '3px',
        cursor: 'pointer'
      }}>
        Settings
      </button>
    </div>
  );

  return (
    <ListViewComponent
      dataSource={data}
      headerTemplate={headerTemplate}
      showHeader={true}
      headerTitle="List Items"
    />
  );
}
```

### Header with Search

```tsx
const headerTemplate = (props: any) => (
  <div style={{ padding: '10px' }}>
    <input
      type="text"
      placeholder="Search items..."
      style={{
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ddd'
      }}
    />
  </div>
);
```

## Group Templates

### Custom Group Template

```tsx
export function GroupTemplateExample() {
  const data = [
    { id: '1', product: 'Laptop', category: 'Electronics' },
    { id: '2', product: 'Mouse', category: 'Electronics' },
    { id: '3', product: 'Desk', category: 'Furniture' },
    { id: '4', product: 'Chair', category: 'Furniture' }
  ];

  const groupTemplate = (props: any) => (
    <div style={{
      padding: '10px',
      background: '#f0f0f0',
      fontWeight: 'bold',
      borderBottom: '1px solid #ddd'
    }}>
      📁 {props.text} ({props.count || 0})
    </div>
  );

  return (
    <ListViewComponent
      dataSource={data}
      fields={{
        id: 'id',
        text: 'product',
        groupBy: 'category'
      }}
      groupTemplate={groupTemplate}
    />
  );
}
```

## Template Syntax

### Using Template Variables

```tsx
// Object data: ${fieldName}
const data = [
  { id: '1', title: 'Task 1', priority: 'High' }
];

const template = '<div>${title} - ${priority}</div>';

// Or with JSX:
const template = (props: any) => <div>{props.title} - {props.priority}</div>;
```

### Conditional Templates

```tsx
const conditionalTemplate = (props: any) => (
  <div>
    {props.completed ? (
      <span style={{ textDecoration: 'line-through', color: '#999' }}>
        ✓ {props.text}
      </span>
    ) : (
      <span>
        ○ {props.text}
      </span>
    )}
  </div>
);
```

### Template with Icons

```tsx
const iconTemplate = (props: any) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <i className={`e-icons ${props.icon}`} style={{ marginRight: '10px' }}></i>
    <span>{props.text}</span>
  </div>
);

// Data should have icon field:
const data = [
  { id: '1', text: 'Inbox', icon: 'e-mail' },
  { id: '2', text: 'Sent', icon: 'e-send' }
];
```

## Dynamic Templates

### Template Based on Device Type

```tsx
import { useState, useEffect } from 'react';

export function ResponsiveTemplateExample() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileTemplate = (props: any) => (
    <div style={{ padding: '10px' }}>
      <strong>{props.text}</strong>
    </div>
  );

  const desktopTemplate = (props: any) => (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '15px'
    }}>
      <span>{props.text}</span>
      <span style={{ color: '#999' }}>{props.description}</span>
    </div>
  );

  return (
    <ListViewComponent
      dataSource={data}
      template={isMobile ? mobileTemplate : desktopTemplate}
    />
  );
}
```

### Template Based on Data Type

```tsx
const dynamicTemplate = (props: any) => {
  switch (props.type) {
    case 'header':
      return <h4 style={{ margin: '10px 0' }}>{props.text}</h4>;
    
    case 'link':
      return <a href={props.url}>{props.text}</a>;
    
    case 'image':
      return (
        <img
          src={props.image}
          alt={props.text}
          style={{ maxWidth: '100%' }}
        />
      );
    
    default:
      return <span>{props.text}</span>;
  }
};
```

## CSS Customization

### Custom CSS Classes

```tsx
// Define custom styles
const customCSS = `
  .custom-list-item {
    padding: 15px !important;
    border-bottom: 2px solid #f0f0f0;
    transition: all 0.3s ease;
  }
  
  .custom-list-item:hover {
    background-color: #f5f5f5;
    padding-left: 20px;
  }
  
  .custom-list-item.active {
    background-color: #e3f2fd;
    border-left: 4px solid #2196f3;
    padding-left: 11px;
  }
`;

// Apply to ListView
<ListViewComponent
  cssClass="custom-list-item"
  dataSource={data}
/>
```

### Inline Styles in Template

```tsx
const styledTemplate = (props: any) => (
  <div style={{
    padding: '12px',
    backgroundColor: props.priority === 'High' ? '#ffebee' : 'white',
    borderLeft: props.priority === 'High' ? '4px solid #f44336' : 'none',
    marginBottom: '1px'
  }}>
    <div style={{ fontWeight: 'bold' }}>{props.text}</div>
    <div style={{ color: '#666', fontSize: '12px' }}>
      Priority: {props.priority}
    </div>
  </div>
);
```

### CSS Variables

```tsx
// Define CSS variables
const themeStyles = `
  :root {
    --primary-color: #2196f3;
    --hover-color: #f5f5f5;
    --border-color: #e0e0e0;
    --text-color: #333;
  }
  
  .themed-list .e-list-item {
    color: var(--text-color);
    border-bottom: 1px solid var(--border-color);
  }
  
  .themed-list .e-list-item:hover {
    background-color: var(--hover-color);
  }
  
  .themed-list .e-list-item.e-active {
    background-color: var(--primary-color);
    color: white;
  }
`;

<ListViewComponent
  cssClass="themed-list"
  dataSource={data}
/>
```

### Animation Classes

```tsx
const animatedTemplate = (props: any) => (
  <div style={{
    animation: 'fadeIn 0.3s ease-in',
    padding: '10px'
  }}>
    {props.text}
  </div>
);

// CSS for animation
const animationCSS = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
```

## RTL Support

### Enable RTL

```tsx
<ListViewComponent
  dataSource={data}
  enableRtl={true}
  locale="ar-AE"
/>
```

### RTL with Template

```tsx
const rtlTemplate = (props: any) => (
  <div style={{
    direction: 'rtl',
    textAlign: 'right',
    padding: '10px'
  }}>
    <span>{props.text}</span>
  </div>
);

<ListViewComponent
  dataSource={data}
  template={rtlTemplate}
  enableRtl={true}
/>
```

### Conditional RTL

```tsx
const isRTL = document.dir === 'rtl';

const adaptiveTemplate = (props: any) => (
  <div style={{
    display: 'flex',
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    padding: '10px'
  }}>
    <img src={props.image} alt="" style={{ margin: '0 10px' }} />
    <div style={{ textAlign: isRTL ? 'right' : 'left' }}>
      {props.text}
    </div>
  </div>
);
```

## Complete Templating Example

```tsx
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { useState } from 'react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
}

export function CompleteTemplatingExample() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', text: 'Complete project', completed: false, priority: 'High' },
    { id: '2', text: 'Review code', completed: true, priority: 'Medium' },
    { id: '3', text: 'Update docs', completed: false, priority: 'Low' }
  ]);

  const headerTemplate = () => (
    <div style={{
      background: '#2196F3',
      color: 'white',
      padding: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h3 style={{ margin: 0 }}>Tasks</h3>
      <span>{tasks.filter(t => !t.completed).length} pending</span>
    </div>
  );

  const itemTemplate = (props: Task) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      backgroundColor: props.completed ? '#f5f5f5' : 'white',
      opacity: props.completed ? 0.7 : 1,
      borderLeft: `4px solid ${
        props.priority === 'High' ? '#f44336' :
        props.priority === 'Medium' ? '#ff9800' :
        '#4caf50'
      }`
    }}>
      <input
        type="checkbox"
        checked={props.completed}
        onChange={() => {
          const updated = tasks.map(t =>
            t.id === props.id ? { ...t, completed: !t.completed } : t
          );
          setTasks(updated);
        }}
        style={{ marginRight: '10px', cursor: 'pointer' }}
      />
      
      <span style={{
        textDecoration: props.completed ? 'line-through' : 'none',
        color: props.completed ? '#999' : '#333',
        flex: 1
      }}>
        {props.text}
      </span>

      <span style={{
        padding: '2px 8px',
        borderRadius: '3px',
        fontSize: '12px',
        backgroundColor: props.priority === 'High' ? '#ffcdd2' :
                         props.priority === 'Medium' ? '#ffe0b2' :
                         '#c8e6c9',
        color: props.priority === 'High' ? '#c62828' :
               props.priority === 'Medium' ? '#e65100' :
               '#2e7d32'
      }}>
        {props.priority}
      </span>
    </div>
  );

  return (
    <ListViewComponent
      dataSource={tasks}
      fields={{ id: 'id', text: 'text' }}
      headerTemplate={headerTemplate}
      template={itemTemplate}
      showHeader={true}
      height="400px"
    />
  );
}
```

## Alignment & Layout Patterns

### ListView in Card Container

When using ListView inside card layouts, ensure proper alignment and spacing:

```tsx
// Card wrapper with proper alignment
const cardContainerStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column' as const,
  height: '100%'
};

const cardHeaderStyle = {
  padding: '16px',
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: '#f5f5f5'
};

const cardContentStyle = {
  flex: 1,
  overflow: 'hidden'  // Important for ListView scrolling
};

export function CardWithListView() {
  return (
    <div style={cardContainerStyle}>
      <div style={cardHeaderStyle}>
        <h3 style={{ margin: '0' }}>Messages</h3>
      </div>
      <div style={cardContentStyle}>
        <ListViewComponent
          dataSource={messagesData}
          height="100%"  // Fill container
          width="100%"   // Full width
        />
      </div>
    </div>
  );
}
```

### ListView in Grid Layout (2x3, 3x3)

```tsx
// Grid container with proper spacing
const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '16px',
  padding: '16px'
};

const gridItemStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column' as const
};

export function GridLayoutWithListView() {
  return (
    <div style={gridContainerStyle}>
      {/* Item 1 - ListView */}
      <div style={gridItemStyle}>
        <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
          <h4 style={{ margin: 0 }}>Appointments</h4>
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ListViewComponent
            dataSource={appointmentsData}
            height="300px"
            width="100%"
          />
        </div>
      </div>

      {/* Item 2 - Another ListView or Component */}
      <div style={gridItemStyle}>
        <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
          <h4 style={{ margin: 0 }}>Messages</h4>
        </div>
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <ListViewComponent
            dataSource={messagesData}
            height="300px"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}
```

### ListView with Fixed Height and Scrolling

Fix alignment issues by explicitly controlling height and overflow:

```tsx
const listContainerStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  height: '400px',  // Fixed height
  border: '1px solid #e0e0e0',
  borderRadius: '4px'
};

const listHeaderStyle = {
  padding: '12px 16px',
  borderBottom: '1px solid #e0e0e0',
  backgroundColor: '#f5f5f5',
  flexShrink: 0  // Don't shrink header
};

const listBodyStyle = {
  flex: 1,
  overflow: 'auto',  // Enable scrolling
  minHeight: 0  // Important for flex container
};

export function ListViewWithProperScroll() {
  return (
    <div style={listContainerStyle}>
      <div style={listHeaderStyle}>
        <h4 style={{ margin: 0 }}>Recent Activity</h4>
      </div>
      <div style={listBodyStyle}>
        <ListViewComponent
          dataSource={activityData}
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
}
```

### Alignment Fix: ListView Item Padding & Spacing

```tsx
// Template with consistent alignment
const alignedItemTemplate = (props: any) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #f0f0f0',
    gap: '12px',  // Use gap instead of margin for consistency
    width: '100%',
    boxSizing: 'border-box'
  }}>
    <div style={{ width: '40px', height: '40px', flexShrink: 0 }}>
      {/* Avatar or Icon */}
    </div>
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 600 }}>{props.title}</div>
      <div style={{ fontSize: '12px', color: '#666', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {props.subtitle}
      </div>
    </div>
    <div style={{ flexShrink: 0 }}>
      {/* Action buttons */}
    </div>
  </div>
);

<ListViewComponent
  dataSource={data}
  template={alignedItemTemplate}
/>
```

### Responsive ListView Layout

```tsx
import { useState, useEffect } from 'react';

export function ResponsiveListView() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const listViewHeight = isMobile ? '300px' : '500px';
  const containerPadding = isMobile ? '8px' : '16px';

  return (
    <div style={{
      padding: containerPadding,
      border: '1px solid #e0e0e0',
      borderRadius: '4px'
    }}>
      <h3 style={{ margin: '0 0 12px 0' }}>Inbox</h3>
      <ListViewComponent
        dataSource={messagesData}
        height={listViewHeight}
        width="100%"
      />
    </div>
  );
}
```

### Multi-Column Layout with ListView (Dashboard Pattern)

```tsx
export function DashboardLayout() {
  const mainContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr',
    gap: '16px',
    padding: '16px'
  };

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  };

  const contentAreaStyle = {
    display: 'flex',
    flexDirection: 'column' as const
  };

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const
  };

  return (
    <div style={mainContainerStyle}>
      {/* Left Sidebar - ListView */}
      <div style={sidebarStyle}>
        <div style={cardStyle}>
          <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
            <h4 style={{ margin: 0 }}>Filters</h4>
          </div>
          <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
            <ListViewComponent
              dataSource={filtersData}
              height="400px"
            />
          </div>
        </div>
      </div>

      {/* Middle Content Area */}
      <div style={contentAreaStyle}>
        {/* Charts, Tables, etc. */}
      </div>

      {/* Right Sidebar - Messages ListView */}
      <div style={sidebarStyle}>
        <div style={cardStyle}>
          <div style={{ padding: '12px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
            <h4 style={{ margin: 0 }}>Messages</h4>
          </div>
          <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
            <ListViewComponent
              dataSource={messagesData}
              height="400px"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
```

