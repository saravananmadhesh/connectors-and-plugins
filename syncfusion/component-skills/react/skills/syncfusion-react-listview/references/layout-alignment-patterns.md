````markdown
# Layout & Alignment Patterns for Complex UI

This guide covers alignment fixes and best practices for ListView when used in complex layouts like patient portals, appointment dashboards, and monitoring dashboards.

## Table of Contents
- [Common Alignment Issues](#common-alignment-issues)
- [Patient Portal Pattern](#patient-portal-pattern)
- [Appointments Dashboard Pattern](#appointments-dashboard-pattern)
- [Monitoring Dashboard Pattern](#monitoring-dashboard-pattern)
- [Responsive Grid Layout](#responsive-grid-layout)
- [Troubleshooting Alignment](#troubleshooting-alignment)

## Common Alignment Issues

### Issue 1: ListView Not Filling Container

**Problem:** ListView appears small or doesn't fill available space

**Solution:**
```tsx
// ❌ Wrong - ListView doesn't fill
<div style={{ border: '1px solid #e0e0e0' }}>
  <ListViewComponent dataSource={data} />
</div>

// ✅ Correct - ListView fills container
<div style={{
  border: '1px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column',
  height: '400px'  // Set explicit height
}}>
  <ListViewComponent
    dataSource={data}
    height="100%"  // Fill height
    width="100%"   // Fill width
  />
</div>
```

### Issue 2: Items Not Aligned in Template

**Problem:** Items have inconsistent padding/margins

**Solution:**
```tsx
// ❌ Wrong - Inconsistent margins
const template = (props) => (
  <div>
    <span style={{ marginRight: '10px' }}>Icon</span>
    <span style={{ marginLeft: '5px' }}>Text</span>
  </div>
);

// ✅ Correct - Use gap for consistent spacing
const template = (props) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '12px 16px',
    gap: '12px',  // Consistent spacing
    boxSizing: 'border-box'
  }}>
    <span>Icon</span>
    <span>Text</span>
  </div>
);
```

### Issue 3: Scrolling Not Working in Card

**Problem:** ListView content doesn't scroll inside card container

**Solution:**
```tsx
// ❌ Wrong - No scrolling
<div style={{ border: '1px solid #e0e0e0' }}>
  <div>Header</div>
  <ListViewComponent dataSource={data} height="300px" />
</div>

// ✅ Correct - Proper scrolling
<div style={{
  border: '1px solid #e0e0e0',
  display: 'flex',
  flexDirection: 'column'
}}>
  <div style={{ flexShrink: 0 }}>Header</div>  {/* No shrink */}
  <div style={{
    flex: 1,
    overflow: 'auto',  {/* Enable scrolling */}
    minHeight: 0  {/* Allow shrinking below content size */}
  }}>
    <ListViewComponent dataSource={data} height="100%" />
  </div>
</div>
```

### Issue 4: Border Misalignment

**Problem:** ListView borders don't align with card borders

**Solution:**
```tsx
// ✅ Correct - Nested borders alignment
const cardStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: '4px',
  overflow: 'hidden'  // Important: clips ListV iew to border-radius
};

const cardHeaderStyle = {
  padding: '16px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #e0e0e0'
};

<div style={cardStyle}>
  <div style={cardHeaderStyle}>Title</div>
  <ListViewComponent dataSource={data} />
</div>
```

## Patient Portal Pattern

Complete patient portal with three sections: Appointments, Prescriptions, Messages.

```tsx
import { ListViewComponent } from '@syncfusion/ej2-react-lists';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-react-grids';

interface Appointment {
  id: string;
  date: string;
  doctor: string;
  time: string;
  type: string;
}

interface Prescription {
  id: string;
  medication: string;
  dosage: string;
  prescribedBy: string;
  refills: number;
}

interface Message {
  id: string;
  senderName: string;
  subject: string;
  date: string;
  isRead: boolean;
}

export function PatientPortal() {
  const appointmentsData: Appointment[] = [
    {
      id: '1',
      date: '2026-06-15',
      doctor: 'Dr. Michael Chen',
      time: '10:00 AM',
      type: 'Cardiology Consultation'
    },
    {
      id: '2',
      date: '2026-06-20',
      doctor: 'Dr. Sarah Johnson',
      time: '2:30 PM',
      type: 'General Checkup'
    }
  ];

  const prescriptionsData: Prescription[] = [
    {
      id: '1',
      medication: 'Lisinopril 10mg',
      dosage: '1 tablet daily',
      prescribedBy: 'Dr. Sarah Johnson',
      refills: 3
    },
    {
      id: '2',
      medication: 'Metformin 500mg',
      dosage: '2 tablets twice daily',
      prescribedBy: 'Dr. Emily Martinez',
      refills: 5
    },
    {
      id: '3',
      medication: 'Atorvastatin 20mg',
      dosage: '1 tablet at bedtime',
      prescribedBy: 'Dr. Sarah Johnson',
      refills: 1
    }
  ];

  const messagesData: Message[] = [
    {
      id: '1',
      senderName: 'Dr. Sarah Johnson',
      subject: 'Lab Results Review',
      date: '2026-05-29',
      isRead: true
    },
    {
      id: '2',
      senderName: 'Dr. Michael Chen',
      subject: 'Appointment Reminder',
      date: '2026-05-28',
      isRead: false
    },
    {
      id: '3',
      senderName: 'Billing Department',
      subject: 'Payment Confirmation',
      date: '2026-05-27',
      isRead: true
    }
  ];

  const appointmentTemplate = (props: Appointment) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 16px',
      borderBottom: '1px solid #f0f0f0',
      gap: '4px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <div style={{ fontWeight: 600 }}>{props.doctor}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{props.type}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#999' }}>{props.date}</div>
          <div style={{ fontSize: '12px', color: '#999' }}>{props.time}</div>
        </div>
      </div>
    </div>
  );

  const messageTemplate = (props: Message) => (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '12px 16px',
      borderBottom: '1px solid #f0f0f0',
      backgroundColor: props.isRead ? 'white' : '#e3f2fd',
      borderLeft: `4px solid ${props.isRead ? 'transparent' : '#2196F3'}`,
      gap: '4px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 600, color: '#333' }}>{props.senderName}</span>
        <span style={{ fontSize: '12px', color: '#999' }}>{props.date}</span>
      </div>
      <div style={{ fontSize: '13px', color: '#666' }}>{props.subject}</div>
    </div>
  );

  const cardContainerStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const
  };

  const cardHeaderStyle = {
    padding: '16px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const cardBodyStyle = {
    flex: 1,
    overflow: 'auto',
    minHeight: 0
  };

  const sectionContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '16px',
    padding: '16px'
  };

  const rightSidebarStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  };

  return (
    <div>
      {/* Top Navigation */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '16px',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ margin: 0 }}>Patient Portal</h1>
          <p style={{ margin: '4px 0 0 0', color: '#666' }}>Welcome back, John Doe</p>
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <button>Appointments</button>
          <button>Records</button>
          <button>Billing</button>
          <button style={{ position: 'relative' }}>
            Messages
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              backgroundColor: '#f44336',
              color: 'white',
              borderRadius: '50%',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px'
            }}>3</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={sectionContainerStyle}>
        {/* Left Column - Appointments & Prescriptions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Appointments */}
          <div style={cardContainerStyle}>
            <div style={{
              ...cardHeaderStyle,
              justifyContent: 'space-between'
            }}>
              <h3 style={{ margin: 0 }}>Upcoming Appointments</h3>
              <button style={{
                backgroundColor: '#2196F3',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '3px',
                cursor: 'pointer'
              }}>
                Book New
              </button>
            </div>
            <div style={cardBodyStyle}>
              <ListViewComponent
                dataSource={appointmentsData}
                fields={{ id: 'id', text: 'doctor' }}
                template={appointmentTemplate}
                height="300px"
                width="100%"
              />
            </div>
          </div>

          {/* Prescriptions */}
          <div style={cardContainerStyle}>
            <div style={{
              ...cardHeaderStyle,
              justifyContent: 'space-between'
            }}>
              <h3 style={{ margin: 0 }}>Current Prescriptions</h3>
              <button style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '3px',
                cursor: 'pointer'
              }}>
                Request Refill
              </button>
            </div>
            <div style={cardBodyStyle}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse' as const
              }}>
                <thead style={{ backgroundColor: '#f5f5f5' }}>
                  <tr>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Medication</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Dosage</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Prescribed By</th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #e0e0e0' }}>Refills</th>
                  </tr>
                </thead>
                <tbody>
                  {prescriptionsData.map(rx => (
                    <tr key={rx.id}>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>{rx.medication}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>{rx.dosage}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>{rx.prescribedBy}</td>
                      <td style={{ padding: '12px', borderBottom: '1px solid #f0f0f0' }}>{rx.refills}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Messages & Lab Results */}
        <div style={rightSidebarStyle}>
          {/* Messages */}
          <div style={cardContainerStyle}>
            <div style={{
              ...cardHeaderStyle,
              justifyContent: 'space-between'
            }}>
              <h3 style={{ margin: 0 }}>Message Your Provider</h3>
              <span style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '24px',
                height: '24px',
                backgroundColor: '#f44336',
                color: 'white',
                borderRadius: '50%',
                fontSize: '12px',
                fontWeight: 'bold'
              }}>
                3
              </span>
            </div>
            <div style={cardBodyStyle}>
              <ListViewComponent
                dataSource={messagesData}
                fields={{ id: 'id', text: 'subject' }}
                template={messageTemplate}
                height="350px"
                width="100%"
              />
            </div>
          </div>

          {/* Lab Results */}
          <div style={cardContainerStyle}>
            <div style={{
              ...cardHeaderStyle,
              justifyContent: 'space-between'
            }}>
              <h3 style={{ margin: 0 }}>Recent Lab Results</h3>
              <button style={{
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '3px',
                cursor: 'pointer',
                fontSize: '12px'
              }}>
                View All
              </button>
            </div>
            <div style={{ padding: '16px' }}>
              {/* Lab results table */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Appointments Dashboard Pattern

Responsive 3x2 grid layout with filters, scheduler, and analytics charts.

```tsx
export function AppointmentsDashboard() {
  const dashboardContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '250px 1fr',
    gap: '16px',
    padding: '16px',
    minHeight: '100vh'
  };

  const sidebarStyle = {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '16px'
  };

  const contentAreaStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px'
  };

  const cardContainerStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const
  };

  const cardHeaderStyle = {
    padding: '12px 16px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    fontWeight: 600
  };

  const cardBodyStyle = {
    flex: 1,
    overflow: 'auto',
    minHeight: 0,
    padding: '16px'
  };

  return (
    <div style={dashboardContainerStyle}>
      {/* Left Sidebar Navigation */}
      <div style={sidebarStyle}>
        <div style={{
          ...cardContainerStyle,
          height: 'fit-content'
        }}>
          <div style={cardHeaderStyle}>Dashboard</div>
          <ListViewComponent
            dataSource={[
              { id: '1', text: 'Dashboard' },
              { id: '2', text: 'Monitoring' },
              { id: '3', text: 'Users' },
              { id: '4', text: 'Analytics' },
              { id: '5', text: 'Reports' },
              { id: '6', text: 'Settings' }
            ]}
            height="auto"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div style={contentAreaStyle}>
        {/* Row 1 - Filters & Today's Appointments */}
        <div style={cardContainerStyle}>
          <div style={cardHeaderStyle}>Filter by Doctor</div>
          <div style={cardBodyStyle}>
            {/* Dropdown component */}
          </div>
        </div>

        <div style={cardContainerStyle}>
          <div style={cardHeaderStyle}>Today's Appointments</div>
          <div style={cardBodyStyle}>
            <ListViewComponent
              dataSource={appointmentsData}
              height="250px"
              width="100%"
            />
          </div>
        </div>

        {/* Row 2 - Calendar (spans 2 columns) */}
        <div style={{
          ...cardContainerStyle,
          gridColumn: 'span 2'
        }}>
          <div style={cardHeaderStyle}>Appointment Calendar</div>
          <div style={cardBodyStyle}>
            {/* Scheduler component */}
          </div>
        </div>

        {/* Row 3 - Charts */}
        <div style={cardContainerStyle}>
          <div style={cardHeaderStyle}>Doctor Occupancy</div>
          <div style={cardBodyStyle}>
            {/* Bar chart */}
          </div>
        </div>

        <div style={cardContainerStyle}>
          <div style={cardHeaderStyle}>Appointment Status</div>
          <div style={cardBodyStyle}>
            {/* Pie chart */}
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Monitoring Dashboard Pattern

System monitoring dashboard with 3x3 grid layout.

```tsx
export function MonitoringDashboard() {
  const mainGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    padding: '16px'
  };

  const cardStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column' as const,
    minHeight: '300px'
  };

  const cardHeaderStyle = {
    padding: '12px 16px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #e0e0e0',
    fontWeight: 600,
    flexShrink: 0
  };

  const cardBodyStyle = {
    flex: 1,
    overflow: 'auto',
    minHeight: 0,
    padding: '16px'
  };

  return (
    <div style={mainGridStyle}>
      {/* Top Row - KPIs */}
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>CPU Usage</div>
        <div style={cardBodyStyle}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2196F3' }}>45%</div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={cardHeaderStyle}>Memory Usage</div>
        <div style={cardBodyStyle}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff9800' }}>72%</div>
        </div>
      </div>

      <div style={cardStyle}>
        <div style={cardHeaderStyle}>Error Count</div>
        <div style={cardBodyStyle}>
          <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f44336' }}>23</div>
        </div>
      </div>

      {/* Middle Row */}
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>Log Stream</div>
        <div style={cardBodyStyle}>
          {/* Log stream list */}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={cardHeaderStyle}>API Response Times</div>
        <div style={cardBodyStyle}>
          {/* Line chart */}
        </div>
      </div>

      <div style={cardStyle}>
        <div style={cardHeaderStyle}>Requests per Service</div>
        <div style={cardBodyStyle}>
          {/* Bar chart */}
        </div>
      </div>

      {/* Bottom Row */}
      <div style={cardStyle}>
        <div style={cardHeaderStyle}>Deployment History</div>
        <div style={cardBodyStyle}>
          <ListViewComponent
            dataSource={deploymentData}
            height="100%"
            width="100%"
          />
        </div>
      </div>

      <div style={cardStyle}>
        <div style={cardHeaderStyle}>Active Alerts</div>
        <div style={cardBodyStyle}>
          <ListViewComponent
            dataSource={alertsData}
            template={alertTemplate}
            height="100%"
            width="100%"
          />
        </div>
      </div>

      <div style={cardStyle}>
        <div style={cardHeaderStyle}>Open Tickets</div>
        <div style={cardBodyStyle}>
          <ListViewComponent
            dataSource={ticketsData}
            template={ticketTemplate}
            height="100%"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}
```

## Responsive Grid Layout

Make ListView grid layouts responsive for mobile, tablet, and desktop.

```tsx
import { useState, useEffect } from 'react';

export function ResponsiveGridLayout() {
  const [gridColumns, setGridColumns] = useState('repeat(3, 1fr)');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setGridColumns('1fr');  // Mobile: 1 column
      } else if (width < 1024) {
        setGridColumns('repeat(2, 1fr)');  // Tablet: 2 columns
      } else {
        setGridColumns('repeat(3, 1fr)');  // Desktop: 3 columns
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: gridColumns,
    gap: '16px',
    padding: '16px',
    transition: 'grid-template-columns 0.3s ease'
  };

  return (
    <div style={gridStyle}>
      {/* Cards */}
    </div>
  );
}
```

## Troubleshooting Alignment

| Issue | Cause | Solution |
|-------|-------|----------|
| ListView cuts off at bottom | Missing `minHeight: 0` on parent | Add `minHeight: 0` to flex container |
| Items not vertically centered | Missing `alignItems: 'center'` | Add to flex container in template |
| Horizontal scrollbar appears | Width not set correctly | Add `width: '100%'` to ListView |
| Header always scrolls | `flexShrink: 0` not set | Add `flexShrink: 0` to header |
| Card borders misaligned | Default ListView borders | Use `overflow: 'hidden'` on card |
| Items have huge gaps | Margin stacking | Use `gap` instead of margin |
| Content overflow hidden | Parent height too small | Increase parent height or use `overflow: auto` |
| ListViews overlap in grid | Wrong grid span | Check `gridColumn` and `gridRow` |

````
