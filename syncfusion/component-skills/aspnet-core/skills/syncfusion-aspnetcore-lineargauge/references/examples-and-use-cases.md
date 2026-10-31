# Examples and Use Cases

## Table of Contents
- [Dashboard Gauges](#dashboard-gauges)
  - [System Metrics Dashboard](#system-metrics-dashboard)
- [Speed and Performance Indicators](#speed-and-performance-indicators)
  - [Vehicle Speed Gauge](#vehicle-speed-gauge)
  - [Application Response Time](#application-response-time)
- [Temperature Displays](#temperature-displays)
  - [Vertical Thermometer](#vertical-thermometer)
- [Progress and Completion Trackers](#progress-and-completion-trackers)
  - [Project Completion Progress](#project-completion-progress)
  - [Download/Upload Progress](#downloadupload-progress)
- [Real-World Patterns](#real-world-patterns)
  - [Pattern 1: IoT Sensor Display](#pattern-1-iot-sensor-display)
  - [Pattern 2: Quality Assurance Metrics](#pattern-2-quality-assurance-metrics)
- [Best Practices](#best-practices)
  - [1. Choose Appropriate Ranges](#1-choose-appropriate-ranges)
  - [2. Use Meaningful Colors](#2-use-meaningful-colors)
  - [3. Include Annotations for Context](#3-include-annotations-for-context)
  - [4. Responsive Design](#4-responsive-design)
- [Troubleshooting Common Scenarios](#troubleshooting-common-scenarios)
  - [Scenario 1: Pointer Not Moving](#scenario-1-pointer-not-moving)
  - [Scenario 2: Gauge Not Updating in Real-Time](#scenario-2-gauge-not-updating-in-real-time)
  - [Scenario 3: Styling Not Applied](#scenario-3-styling-not-applied)

## Dashboard Gauges

### System Metrics Dashboard

Create a comprehensive system monitoring dashboard with multiple gauges.

```cshtml
<style>
    .metrics-dashboard {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 20px;
        padding: 20px;
    }
    .gauge-card {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        padding: 20px;
    }
</style>

<div class="metrics-dashboard">
    <div class="gauge-card">
        <ejs-lineargauge id="cpu-gauge" title="CPU Usage (%)" orientation="Horizontal">
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="0" maximum="100">
                    <e-lineargauge-ranges>
                        <e-lineargauge-range start="0" end="30" color="#4CAF50"></e-lineargauge-range>
                        <e-lineargauge-range start="30" end="70" color="#FFC107"></e-lineargauge-range>
                        <e-lineargauge-range start="70" end="100" color="#F44336"></e-lineargauge-range>
                    </e-lineargauge-ranges>
                    <e-lineargauge-pointers>
                        <e-lineargauge-pointer value="45" type="Bar" width="6"></e-lineargauge-pointer>
                    </e-lineargauge-pointers>
                </e-lineargauge-axis>
            </e-lineargauge-axes>
        </ejs-lineargauge>
    </div>
    
    <div class="gauge-card">
        <ejs-lineargauge id="memory-gauge" title="Memory Usage (%)" orientation="Horizontal">
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="0" maximum="100">
                    <e-lineargauge-ranges>
                        <e-lineargauge-range start="0" end="50" color="#4CAF50"></e-lineargauge-range>
                        <e-lineargauge-range start="50" end="85" color="#FFC107"></e-lineargauge-range>
                        <e-lineargauge-range start="85" end="100" color="#F44336"></e-lineargauge-range>
                    </e-lineargauge-ranges>
                    <e-lineargauge-pointers>
                        <e-lineargauge-pointer value="62" type="Bar" width="6"></e-lineargauge-pointer>
                    </e-lineargauge-pointers>
                </e-lineargauge-axis>
            </e-lineargauge-axes>
        </ejs-lineargauge>
    </div>
    
    <div class="gauge-card">
        <ejs-lineargauge id="disk-gauge" title="Disk Usage (%)" orientation="Horizontal">
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="0" maximum="100">
                    <e-lineargauge-ranges>
                        <e-lineargauge-range start="0" end="60" color="#4CAF50"></e-lineargauge-range>
                        <e-lineargauge-range start="60" end="85" color="#FFC107"></e-lineargauge-range>
                        <e-lineargauge-range start="85" end="100" color="#F44336"></e-lineargauge-range>
                    </e-lineargauge-ranges>
                    <e-lineargauge-pointers>
                        <e-lineargauge-pointer value="78" type="Bar" width="6"></e-lineargauge-pointer>
                    </e-lineargauge-pointers>
                </e-lineargauge-axis>
            </e-lineargauge-axes>
        </ejs-lineargauge>
    </div>
</div>

<script>
    // Simulate real-time updates
    function updateMetrics() {
        var cpuGauge = document.getElementById('cpu-gauge').ej2_instances[0];
        var memoryGauge = document.getElementById('memory-gauge').ej2_instances[0];
        var diskGauge = document.getElementById('disk-gauge').ej2_instances[0];
        
        setInterval(function() {
            cpuGauge.setPointerValue(0, 0, Math.random() * 100);
            memoryGauge.setPointerValue(0, 0, Math.random() * 100);
            diskGauge.setPointerValue(0, 0, Math.random() * 100);
        }, 2000);
    }
    
    updateMetrics();
</script>
```

## Speed and Performance Indicators

### Vehicle Speed Gauge

```cshtml
<ejs-lineargauge id="speedometer" 
                  title="Speed (km/h)"
                  orientation="Horizontal">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="200">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="50" color="#4CAF50"></e-lineargauge-range>
                <e-lineargauge-range start="50" end="120" color="#FFC107"></e-lineargauge-range>
                <e-lineargauge-range start="120" end="200" color="#F44336"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="85" type="Bar" width="8" color="#1976D2"></e-lineargauge-pointer>
                <e-lineargauge-pointer value="120" type="Marker" markerType="Circle" 
                                        color="#FF5722" height="12" width="12"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
            <e-axis-majorticks interval="20"></e-axis-majorticks>
            <e-axis-minorticks interval="10"></e-axis-minorticks>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
    <e-lineargauge-annotations>
        <e-lineargauge-annotation content="Current Speed" x="200" y="50"></e-lineargauge-annotation>
        <e-lineargauge-annotation content="Speed Limit" x="350" y="50"></e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>
```

### Application Response Time

```cshtml
<ejs-lineargauge id="response-time" 
                  title="Response Time (ms)"
                  orientation="Horizontal">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="5000">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="500" color="#4CAF50"></e-lineargauge-range>
                <e-lineargauge-range start="500" end="2000" color="#FFC107"></e-lineargauge-range>
                <e-lineargauge-range start="2000" end="5000" color="#F44336"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="1200" type="Bar" width="10"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
</ejs-lineargauge>
```

## Temperature Displays

### Vertical Thermometer

```cshtml
<ejs-lineargauge id="thermometer" 
                  title="Temperature (°C)"
                  orientation="Vertical">
    <e-lineargauge-container type="Thermometer" backgroundColor="#E3F2FD">
    </e-lineargauge-container>
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="-40" maximum="60">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="-40" end="0" color="#1976D2"></e-lineargauge-range>
                <e-lineargauge-range start="0" end="20" color="#4CAF50"></e-lineargauge-range>
                <e-lineargauge-range start="20" end="40" color="#FFC107"></e-lineargauge-range>
                <e-lineargauge-range start="40" end="60" color="#D32F2F"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="22" type="Bar" width="12" color="#D32F2F"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
            <e-axis-majorticks interval="10"></e-axis-majorticks>
            <e-axis-minorticks interval="5"></e-axis-minorticks>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
    <e-lineargauge-annotations>
        <e-lineargauge-annotation content="Room Temp" axis-value="22" y="200"></e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>
```

## Progress and Completion Trackers

### Project Completion Progress

```cshtml
<ejs-lineargauge id="project-progress" 
                  title="Project Progress"
                  orientation="Horizontal">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <!-- Background track -->
                <e-lineargauge-range start="0" end="100" color="#E0E0E0" position="Outside"></e-lineargauge-range>
                <!-- Progress fill -->
                <e-lineargauge-range start="0" end="72" color="#2196F3" position="Outside"></e-lineargauge-range>
            </e-lineargauge-ranges>
            <e-lineargauge-pointers>
                <e-lineargauge-pointer value="72" type="Bar" width="12" color="#1976D2"></e-lineargauge-pointer>
            </e-lineargauge-pointers>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
    <e-lineargauge-annotations>
        <e-lineargauge-annotation content="72% Complete" x="250" y="80" zIndex="2"></e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>
```

### Download/Upload Progress

```cshtml
<div style="margin: 20px 0;">
    <h3>File Upload</h3>
    <ejs-lineargauge id="upload-progress" orientation="Horizontal" height="40px">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
                <e-lineargauge-ranges>
                    <e-lineargauge-range start="0" end="100" color="#ECEFF1"></e-lineargauge-range>
                    <e-lineargauge-range start="0" end="85" color="#4CAF50"></e-lineargauge-range>
                </e-lineargauge-ranges>
                <e-lineargauge-pointers>
                    <e-lineargauge-pointer value="85" type="Bar"></e-lineargauge-pointer>
                </e-lineargauge-pointers>
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
    <p>85 MB of 100 MB uploaded</p>
</div>
```

## Real-World Patterns

### Pattern 1: IoT Sensor Display

```cshtml
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <div>
        <h3>Humidity Sensor</h3>
        <ejs-lineargauge id="humidity" orientation="Vertical" title="Humidity (%)">
            <e-lineargauge-container type="Thermometer" backgroundColor="#F1F8E9">
            </e-lineargauge-container>
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="0" maximum="100">
                    <e-lineargauge-ranges>
                        <e-lineargauge-range start="0" end="40" color="#FF7043"></e-lineargauge-range>
                        <e-lineargauge-range start="40" end="60" color="#4CAF50"></e-lineargauge-range>
                        <e-lineargauge-range start="60" end="100" color="#0097A7"></e-lineargauge-range>
                    </e-lineargauge-ranges>
                    <e-lineargauge-pointers>
                        <e-lineargauge-pointer value="65" type="Bar"></e-lineargauge-pointer>
                    </e-lineargauge-pointers>
                </e-lineargauge-axis>
            </e-lineargauge-axes>
        </ejs-lineargauge>
    </div>
    
    <div>
        <h3>Pressure Sensor</h3>
        <ejs-lineargauge id="pressure" orientation="Vertical" title="Pressure (hPa)">
            <e-lineargauge-container type="RoundedRectangle" roundedCornerRadius="10">
            </e-lineargauge-container>
            <e-lineargauge-axes>
                <e-lineargauge-axis minimum="900" maximum="1100">
                    <e-lineargauge-ranges>
                        <e-lineargauge-range start="900" end="950" color="#FF7043"></e-lineargauge-range>
                        <e-lineargauge-range start="950" end="1050" color="#4CAF50"></e-lineargauge-range>
                        <e-lineargauge-range start="1050" end="1100" color="#0097A7"></e-lineargauge-range>
                    </e-lineargauge-ranges>
                    <e-lineargauge-pointers>
                        <e-lineargauge-pointer value="1013" type="Bar"></e-lineargauge-pointer>
                    </e-lineargauge-pointers>
                </e-lineargauge-axis>
            </e-lineargauge-axes>
        </ejs-lineargauge>
    </div>
</div>
```

### Pattern 2: Quality Assurance Metrics

```cshtml
<div style="padding: 20px; background: #f5f5f5; border-radius: 8px;">
    <h2>QA Metrics Dashboard</h2>
    
    <ejs-lineargauge id="code-coverage" title="Code Coverage (%)" 
                      orientation="Horizontal" width="100%" height="80px">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
                <e-lineargauge-ranges>
                    <e-lineargauge-range start="0" end="60" color="#F44336"></e-lineargauge-range>
                    <e-lineargauge-range start="60" end="80" color="#FFC107"></e-lineargauge-range>
                    <e-lineargauge-range start="80" end="100" color="#4CAF50"></e-lineargauge-range>
                </e-lineargauge-ranges>
                <e-lineargauge-pointers>
                    <e-lineargauge-pointer value="87" type="Bar" width="4"></e-lineargauge-pointer>
                </e-lineargauge-pointers>
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
    
    <ejs-lineargauge id="test-pass-rate" title="Test Pass Rate (%)" 
                      orientation="Horizontal" width="100%" height="80px">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
                <e-lineargauge-ranges>
                    <e-lineargauge-range start="0" end="90" color="#F44336"></e-lineargauge-range>
                    <e-lineargauge-range start="90" end="98" color="#FFC107"></e-lineargauge-range>
                    <e-lineargauge-range start="98" end="100" color="#4CAF50"></e-lineargauge-range>
                </e-lineargauge-ranges>
                <e-lineargauge-pointers>
                    <e-lineargauge-pointer value="96" type="Bar" width="4"></e-lineargauge-pointer>
                </e-lineargauge-pointers>
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</div>
```

## Best Practices

### 1. Choose Appropriate Ranges

```cshtml
<!-- ❌ Too many ranges - confusing -->
<e-lineargauge-ranges>
    <e-lineargauge-range start="0" end="10" color="red"></e-lineargauge-range>
    <e-lineargauge-range start="10" end="20" color="orange"></e-lineargauge-range>
    <!-- 8 more ranges... -->
</e-lineargauge-ranges>

<!-- ✅ Optimal ranges - clear zones -->
<e-lineargauge-ranges>
    <e-lineargauge-range start="0" end="50" color="#4CAF50"></e-lineargauge-range>
    <e-lineargauge-range start="50" end="80" color="#FFC107"></e-lineargauge-range>
    <e-lineargauge-range start="80" end="100" color="#F44336"></e-lineargauge-range>
</e-lineargauge-ranges>
```

### 2. Use Meaningful Colors

```cshtml
<!-- ❌ Random colors - no meaning -->
<e-lineargauge-ranges>
    <e-lineargauge-range start="0" end="50" color="purple"></e-lineargauge-range>
    <e-lineargauge-range start="50" end="100" color="pink"></e-lineargauge-range>
</e-lineargauge-ranges>

<!-- ✅ Semantic colors - clear intent -->
<e-lineargauge-ranges>
    <e-lineargauge-range start="0" end="50" color="#4CAF50"></e-lineargauge-range> <!-- Good -->
    <e-lineargauge-range start="50" end="100" color="#F44336"></e-lineargauge-range> <!-- Bad -->
</e-lineargauge-ranges>
```

### 3. Include Annotations for Context

```cshtml
<!-- ✅ Good - includes labels and context -->
<ejs-lineargauge id="gauge" title="Performance Score">
    <e-lineargauge-axes>
        <e-lineargauge-axis minimum="0" maximum="100">
            <e-lineargauge-ranges>
                <e-lineargauge-range start="0" end="50" color="#F44336"></e-lineargauge-range>
                <e-lineargauge-range start="50" end="100" color="#4CAF50"></e-lineargauge-range>
            </e-lineargauge-ranges>
        </e-lineargauge-axis>
    </e-lineargauge-axes>
    <e-lineargauge-annotations>
        <e-lineargauge-annotation content="Needs Improvement" axis-value="25"  zIndex="2"></e-lineargauge-annotation>
        <e-lineargauge-annotation content="Excellent" axis-value="75" zIndex="2"></e-lineargauge-annotation>
    </e-lineargauge-annotations>
</ejs-lineargauge>
```

### 4. Responsive Design

```cshtml
<!-- ✅ Responsive configuration -->
<div style="width: 100%; max-width: 600px; margin: 0 auto;">
    <ejs-lineargauge id="responsive-gauge" 
                      height="100%" 
                      width="100%"
                      title="Responsive Gauge">
        <e-lineargauge-axes>
            <e-lineargauge-axis minimum="0" maximum="100">
            </e-lineargauge-axis>
        </e-lineargauge-axes>
    </ejs-lineargauge>
</div>
```

## Troubleshooting Common Scenarios

### Scenario 1: Pointer Not Moving

```cshtml
<!-- Debug pointer movement -->
<script>
var gauge = document.getElementById('gauge').ej2_instances[0];
var value = gauge.axes[0].pointers[0].value;

console.log('Axis bounds:', {
    minimum: gauge.axes[0].minimum,
    maximum: gauge.axes[0].maximum
});
console.log('Pointer value:', value);

var min = gauge.axes[0].minimum;
var max = gauge.axes[0].maximum;

if (value < min || value > max) {
    console.error('Pointer value out of range!');
    gauge.setPointerValue(0, 0, (min + max) / 2);
}
</script>
```

### Scenario 2: Gauge Not Updating in Real-Time

```cshtml
<!-- Ensure refresh after updates -->
<script>
    var gauge = document.getElementById('gauge').ej2_instances[0];
    
    setInterval(function() {
        var newValue = Math.random() * 100;
        gauge.setPointerValue(0, 0, newValue);
        gauge.refresh(); // Force refresh
    }, 1000);
</script>
```

### Scenario 3: Styling Not Applied

```cshtml
<!-- Verify CSS is loaded -->
<script>
    window.addEventListener('load', function() {
        var styles = window.getComputedStyle(document.body);
        console.log('Theme CSS loaded:', styles.fontFamily.includes('Segoe'));
    });
</script>
```
