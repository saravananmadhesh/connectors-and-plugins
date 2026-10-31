````markdown
# Quick Start: ListView Alignment Fixes

## Copy-Paste Solutions for Common Layouts

### Solution 1: ListView in Card (Basic)

```tsx
<div style={{
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  height: '400px'
}}>
  {/* Header */}
  <div style={{
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    flexShrink: 0
  }}>
    <h3 style={{ margin: 0 }}>Messages</h3>
  </div>
  
  {/* Content */}
  <div style={{
    flex: 1,
    overflow: 'auto',
    minHeight: 0
  }}>
    <ListViewComponent
      dataSource={data}
      height="100%"
      width="100%"
    />
  </div>
</div>
```

---

### Solution 2: 2-Column Layout (Patient Portal)

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '16px',
  padding: '16px'
}}>
  {/* Left: Appointments */}
  <div style={{
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
      Appointments
    </div>
    <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
      <ListViewComponent dataSource={appointments} height="400px" />
    </div>
  </div>

  {/* Right: Messages */}
  <div style={{
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div style={{ padding: '12px 16px', backgroundColor: '#f5f5f5', borderBottom: '1px solid #e0e0e0' }}>
      Messages
    </div>
    <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
      <ListViewComponent dataSource={messages} height="400px" />
    </div>
  </div>
</div>
```

---

### Solution 3: 3-Column Grid (Monitoring Dashboard)

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '16px',
  padding: '16px'
}}>
  {Array.from({ length: 9 }, (_, i) => (
    <div key={i} style={{
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '300px'
    }}>
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        fontWeight: 600,
        flexShrink: 0
      }}>
        Card {i + 1}
      </div>
      <div style={{
        flex: 1,
        overflow: 'auto',
        minHeight: 0,
        padding: '16px'
      }}>
        {i < 3 ? (
          // KPI Cards
          <div style={{ fontSize: '32px', fontWeight: 'bold' }}>--</div>
        ) : (
          // ListView Cards
          <ListViewComponent dataSource={data} height="100%" />
        )}
      </div>
    </div>
  ))}
</div>
```

---

### Solution 4: 3x2 Grid with Sidebar (Appointments Dashboard)

```tsx
<div style={{
  display: 'grid',
  gridTemplateColumns: '250px 1fr 1fr',
  gap: '16px',
  padding: '16px'
}}>
  {/* Sidebar - Filter */}
  <div style={{
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content'
  }}>
    <div style={{
      padding: '12px 16px',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #e0e0e0',
      fontWeight: 600
    }}>
      Filters
    </div>
    <div style={{ padding: '12px 16px' }}>
      {/* Dropdown or ListView */}
    </div>
  </div>

  {/* Main Content - 2 columns */}
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumn: 'span 2',
    gap: '16px'
  }}>
    {/* Today's Appointments */}
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        padding: '12px 16px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        fontWeight: 600
      }}>
        Today's Appointments
      </div>
      <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
        <ListViewComponent dataSource={appointments} height="300px" />
      </div>
    </div>

    {/* Chart */}
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      padding: '16px'
    }}>
      {/* Chart Component */}
    </div>
  </div>

  {/* Full-width Calendar */}
  <div style={{
    gridColumn: 'span 3',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    height: '400px'
  }}>
    <div style={{
      padding: '12px 16px',
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #e0e0e0',
      fontWeight: 600,
      flexShrink: 0
    }}>
      Calendar
    </div>
    <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
      {/* Scheduler Component */}
    </div>
  </div>

  {/* Bottom Charts */}
  <div style={{
    gridColumn: 'span 3',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px'
  }}>
    {/* Chart 1 */}
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      padding: '16px'
    }}>
      {/* Chart */}
    </div>

    {/* Chart 2 */}
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '4px',
      padding: '16px'
    }}>
      {/* Chart */}
    </div>
  </div>
</div>
```

---

### Solution 5: Responsive Grid (Auto Columns)

```tsx
import { useState, useEffect } from 'react';

export function ResponsiveGrid() {
  const [columns, setColumns] = useState('repeat(3, 1fr)');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setColumns('1fr');
      else if (window.innerWidth < 1024) setColumns('repeat(2, 1fr)');
      else setColumns('repeat(3, 1fr)');
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: columns,
      gap: '16px',
      padding: '16px',
      transition: 'grid-template-columns 0.3s ease'
    }}>
      {/* Cards */}
    </div>
  );
}
```

---

### Solution 6: Aligned List Item Template

```tsx
const alignedItemTemplate = (props: any) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    borderBottom: '1px solid #f0f0f0',
    gap: '12px',
    width: '100%',
    boxSizing: 'border-box'
  }}>
    {/* Icon/Avatar - Fixed width */}
    <div style={{ width: '40px', height: '40px', flexShrink: 0 }}>
      {/* Icon or Avatar */}
    </div>

    {/* Content - Flexible */}
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontWeight: 600 }}>{props.title}</div>
      <div style={{
        fontSize: '12px',
        color: '#666',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        {props.subtitle}
      </div>
    </div>

    {/* Action - Fixed width */}
    <div style={{ flexShrink: 0 }}>
      {/* Buttons or badges */}
    </div>
  </div>
);

<ListViewComponent
  dataSource={data}
  template={alignedItemTemplate}
/>
```

---

## 🚨 Common Mistakes to Avoid

| ❌ Wrong | ✅ Correct |
|---------|-----------|
| No `display: flex` on container | Always use `display: 'flex'` and `flexDirection: 'column'` |
| No `flex: 1` on body | Always use `flex: 1` to fill space |
| No `overflow: auto` on scroll area | Always use `overflow: 'auto'` on scrollable child |
| No `minHeight: 0` | Always add `minHeight: 0` to allow flex shrinking |
| Using margins instead of gap | Use `gap` for consistent spacing in templates |
| No `height` on parent container | Always set explicit height on card/container |
| No `width: '100%'` on ListView | Always set `width: '100%'` to fill container |
| No `overflow: hidden` on card | Use `overflow: 'hidden'` to respect border-radius |
| Using `flexShrink: 1` on header | Use `flexShrink: 0` to keep header fixed |
| No `boxSizing: 'border-box'` in template | Use for correct padding calculations |

---

## 🔍 Quick Diagnostic Checklist

If your ListView alignment is broken, check:

- [ ] Parent container has `display: 'flex'` and `flexDirection: 'column'`
- [ ] Parent container has explicit `height` set
- [ ] Scrollable child has `flex: 1`, `overflow: 'auto'`, `minHeight: 0`
- [ ] ListView has `height: '100%'` and `width: '100%'`
- [ ] Card container has `overflow: 'hidden'`
- [ ] Header has `flexShrink: 0` if not supposed to scroll
- [ ] Items use `gap` instead of `margin`
- [ ] Items use `width: '100%'` and `boxSizing: 'border-box'`
- [ ] Grid layout uses proper `gridTemplateColumns`
- [ ] Grid cells don't overflow (use `overflow: 'hidden'`)

If all checked and still broken, see `layout-alignment-patterns.md` for detailed troubleshooting.

````
