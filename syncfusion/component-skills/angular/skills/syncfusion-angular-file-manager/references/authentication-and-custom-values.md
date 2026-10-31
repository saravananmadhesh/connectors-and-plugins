# Authentication and Custom Values in Syncfusion Angular File Manager

## Overview

The FileManager can be configured to send authentication tokens and custom values with requests to the backend. This allows you to implement secure file access control and pass additional context (user ID, role, etc.) with each operation.

## Table of Contents
- [beforeSend Event](#beforesend-event)
- [JWT Token Authentication](#jwt-token-authentication)
- [Bearer Token Implementation](#bearer-token-implementation)
- [Custom Headers](#custom-headers)
- [Custom Data Passing](#custom-data-passing)
- [CORS Configuration](#cors-configuration)
- [Examples](#examples)

---

## beforeSend Event

The `beforeSend` event fires before each request to the server. Use it to modify request headers, add authentication tokens, and pass custom data.

### Basic beforeSend Setup

```typescript
import { Component } from '@angular/core';
import { BeforeSendEventArgs } from '@syncfusion/ej2-filemanager';

@Component({
  selector: 'app-file-manager',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class AppComponent {
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download',
    getImageUrl: '/api/FileManager/GetImage'
  };
  
  onBeforeSend(args: BeforeSendEventArgs) {
    // Set request headers
    args.ajaxSettings.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}`
    };
  }
  
  private getToken(): string {
    // Retrieve JWT token from localStorage or auth service
    return localStorage.getItem('authToken') || '';
  }
}
```

---

## JWT Token Authentication

### Implement JWT Token with FileManager

```typescript
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BeforeSendEventArgs } from '@syncfusion/ej2-filemanager';

@Component({
  selector: 'app-secure-filemanager',
  template: `<div>
    <h3>Secure File Manager</h3>
    <p>Authenticated as: {{ currentUser?.name }}</p>
    
    <ejs-filemanager 
      [ajaxSettings]='ajaxSettings'
      (beforeSend)='onBeforeSend($event)'>
    </ejs-filemanager>
  </div>`
})
export class SecureFileManagerComponent {
  currentUser: any;
  
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  constructor(private authService: AuthService) {
    this.currentUser = this.authService.getCurrentUser();
  }
  
  onBeforeSend(args: BeforeSendEventArgs) {
    // Get JWT token from auth service
    const token = this.authService.getToken();
    
    // Set authorization header
    args.ajaxSettings.headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }
}

// AuthService implementation
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  private tokenKey = 'authToken';
  
  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }
  
  login(username: string, password: string) {
    return this.http.post<any>('/api/auth/login', { username, password })
      .subscribe(response => {
        if(response.token) {
          // Store JWT token
          localStorage.setItem(this.tokenKey, response.token);
          this.currentUserSubject.next(response.user);
        }
      });
  }
  
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }
  
  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }
  
  getCurrentUser() {
    return this.currentUserSubject.value;
  }
  
  private loadUserFromStorage() {
    const token = this.getToken();
    if(token) {
      // Decode JWT token to get user info
      const user = this.decodeToken(token);
      this.currentUserSubject.next(user);
    }
  }
  
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64).split('').map((c: string) => {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
      );
      return JSON.parse(jsonPayload);
    } catch(e) {
      return null;
    }
  }
}
```

---

## Bearer Token Implementation

### Complete Bearer Token Authentication

```typescript
@Component({
  selector: 'app-bearer-auth-filemanager',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class BearerAuthFileManagerComponent implements OnInit {
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  bearerToken = '';
  
  constructor(private authService: AuthService) {}
  
  ngOnInit() {
    // Get bearer token from auth service
    this.authService.token$.subscribe(token => {
      this.bearerToken = token;
    });
  }
  
  onBeforeSend(args: BeforeSendEventArgs) {
    // Add Bearer token to all requests
    if(this.bearerToken) {
      args.ajaxSettings.headers = {
        'Authorization': `Bearer ${this.bearerToken}`,
        'X-Requested-With': 'XMLHttpRequest'
      };
    }
  }
}

// Backend controller with bearer token validation
import { Microsoft.AspNetCore.Authorization };
import { Microsoft.AspNetCore.Mvc };

[ApiController]
[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = "Bearer")]
public class FileManagerController : ControllerBase
{
    private readonly IAuthService _authService;
    
    [HttpPost("FileOperations")]
    [Authorize]
    public IActionResult FileOperations(
        [FromBody] FileRequest request,
        [FromHeader(Name = "Authorization")] string authHeader)
    {
        try
        {
            // Extract token from Authorization header
            var token = authHeader?.Replace("Bearer ", "").Trim();
            if(string.IsNullOrEmpty(token))
            {
                return Unauthorized(new { error = "No authorization token provided" });
            }
            
            // Validate token and get user claims
            var claims = _authService.ValidateToken(token);
            if(claims == null)
            {
                return Unauthorized(new { error = "Invalid or expired token" });
            }
            
            var userId = claims.FindFirst("sub")?.Value;
            var userRole = claims.FindFirst("role")?.Value;
            
            // Process request with user context
            var result = HandleFileOperation(request, userId, userRole);
            return Ok(result);
        }
        catch(Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
    
    private object HandleFileOperation(FileRequest request, string userId, string userRole)
    {
        // Implementation...
        return new { };
    }
}
```

---

## Custom Headers

### Add Custom Headers to All Requests

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class CustomHeadersFileManagerComponent {
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  onBeforeSend(args: BeforeSendEventArgs) {
    // Add multiple custom headers
    args.ajaxSettings.headers = {
      'Authorization': `Bearer ${this.getToken()}`,
      'X-API-Key': 'your-api-key',
      'X-User-ID': this.getUserId(),
      'X-Request-ID': this.generateRequestId(),
      'X-Client-Version': '1.0.0',
      'X-Correlation-ID': this.getCorrelationId(),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }
  
  private getToken(): string {
    return localStorage.getItem('authToken') || '';
  }
  
  private getUserId(): string {
    return localStorage.getItem('userId') || '';
  }
  
  private generateRequestId(): string {
    return `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private getCorrelationId(): string {
    let correlationId = sessionStorage.getItem('correlationId');
    if(!correlationId) {
      correlationId = `COR-${Date.now()}`;
      sessionStorage.setItem('correlationId', correlationId);
    }
    return correlationId;
  }
}
```

---

## Custom Data Passing

### Pass Custom Data with Requests

```typescript
@Component({
  selector: 'app-custom-data-filemanager',
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class CustomDataFileManagerComponent {
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  userContext = {
    userId: 'user-123',
    role: 'Editor',
    department: 'Engineering'
  };
  
  onBeforeSend(args: BeforeSendEventArgs) {
    // Add custom data to request body
    if(args.data && typeof args.data === 'object') {
      // Add user context
      args.data['userId'] = this.userContext.userId;
      args.data['role'] = this.userContext.role;
      args.data['department'] = this.userContext.department;
      
      // Add timestamp
      args.data['requestTime'] = new Date().toISOString();
      
      // Add custom metadata
      args.data['clientInfo'] = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    }
  }
}

// Backend receiving custom data
[HttpPost("FileOperations")]
public IActionResult FileOperations([FromBody] FileRequestWithContext request)
{
    var userId = request.userId;
    var userRole = request.role;
    var requestTime = request.requestTime;
    
    // Log audit information
    _logger.LogInformation(
        $"File operation {request.action} by user {userId} ({userRole}) at {requestTime}"
    );
    
    // Process request...
    return Ok();
}
```

### Pass Query Parameters

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class QueryParamFileManagerComponent {
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  onBeforeSend(args: BeforeSendEventArgs) {
    // Modify URL with query parameters
    const url = new URL(args.ajaxSettings.url, window.location.origin);
    
    url.searchParams.append('userId', 'user-123');
    url.searchParams.append('locale', 'en-US');
    url.searchParams.append('apiVersion', '2.0');
    
    args.ajaxSettings.url = url.pathname + url.search;
  }
}
```

---

## CORS Configuration

### Enable CORS on Backend

```csharp
// Startup.cs or Program.cs
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Enable CORS
        services.AddCors(options =>
        {
            options.AddPolicy("FileManagerPolicy", builder =>
            {
                builder
                    .WithOrigins(
                        "http://localhost:4200",
                        "http://localhost:3000",
                        "yourdomain"
                    )
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithExposedHeaders(
                        "Content-Disposition",
                        "X-Total-Count",
                        "X-Page-Count"
                    );
            });
        });
        
        services.AddControllers();
    }
    
    public void Configure(IApplicationBuilder app)
    {
        app.UseRouting();
        app.UseCors("FileManagerPolicy");
        
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}
```

### CORS in FileManager Ajax Settings

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class CorsFileManagerComponent {
  ajaxSettings = {
    url: 'url',
    uploadUrl: 'url',
    downloadUrl: 'url',
    credentials: 'include'  // Include cookies in CORS requests
  };
  
  onBeforeSend(args: BeforeSendEventArgs) {
    args.ajaxSettings.headers = {
      'Authorization': `Bearer ${this.getToken()}`
    };
  }
  
  private getToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}
```

---

## Examples

### Example 1: OAuth2 Token Refresh

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class OAuth2FileManagerComponent {
  @ViewChild('fileManager')
  fileManager?: FileManagerComponent;
  
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  constructor(private authService: AuthService) {}
  
  onBeforeSend(args: BeforeSendEventArgs) {
    // Check if token is about to expire
    const token = this.authService.getToken();
    const isExpiringSoon = this.authService.isTokenExpiringSoon(token);
    
    if(isExpiringSoon) {
      // Refresh token before making request
      this.authService.refreshToken().then(newToken => {
        args.ajaxSettings.headers = {
          'Authorization': `Bearer ${newToken}`
        };
      });
    } else {
      args.ajaxSettings.headers = {
        'Authorization': `Bearer ${token}`
      };
    }
  }
}
```

### Example 2: Multi-Tenant File Manager

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class MultiTenantFileManagerComponent {
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  tenantId = 'tenant-abc-123';
  userId = 'user-456';
  
  onBeforeSend(args: BeforeSendEventArgs) {
    // Add tenant information to headers
    args.ajaxSettings.headers = {
      'Authorization': `Bearer ${this.getToken()}`,
      'X-Tenant-ID': this.tenantId,
      'X-User-ID': this.userId,
      'X-Organization-ID': 'org-789'
    };
    
    // Add tenant context to request body
    if(args.data && typeof args.data === 'object') {
      args.data['tenantId'] = this.tenantId;
      args.data['userId'] = this.userId;
    }
  }
  
  private getToken(): string {
    return localStorage.getItem('authToken') || '';
  }
}

// Backend multi-tenant handler
[ApiController]
[Route("api/[controller]")]
public class FileManagerController : ControllerBase
{
    [HttpPost("FileOperations")]
    public IActionResult FileOperations(
        [FromBody] FileRequest request,
        [FromHeader(Name = "X-Tenant-ID")] string tenantId,
        [FromHeader(Name = "X-User-ID")] string userId)
    {
        try
        {
            // Validate tenant access
            if(!_tenantService.CanUserAccessTenant(userId, tenantId))
            {
                return Forbid();
            }
            
            // Scope all operations to tenant
            var tenantContext = new TenantContext { TenantId = tenantId, UserId = userId };
            var result = HandleFileOperation(request, tenantContext);
            
            return Ok(result);
        }
        catch(Exception ex)
        {
            return StatusCode(500, new { error = ex.Message });
        }
    }
}
```

### Example 3: Request Logging and Audit Trail

```typescript
@Component({
  template: `<ejs-filemanager 
    [ajaxSettings]='ajaxSettings'
    (beforeSend)='onBeforeSend($event)'>
  </ejs-filemanager>`
})
export class AuditedFileManagerComponent {
  ajaxSettings = {
    url: '/api/FileManager/FileOperations',
    uploadUrl: '/api/FileManager/Upload',
    downloadUrl: '/api/FileManager/Download'
  };
  
  onBeforeSend(args: BeforeSendEventArgs) {
    const requestId = this.generateRequestId();
    const timestamp = new Date().toISOString();
    
    // Add audit headers
    args.ajaxSettings.headers = {
      'Authorization': `Bearer ${this.getToken()}`,
      'X-Request-ID': requestId,
      'X-Timestamp': timestamp,
      'X-Source': 'web-filemanager'
    };
    
    // Add audit data
    if(args.data && typeof args.data === 'object') {
      args.data['auditInfo'] = {
        requestId: requestId,
        timestamp: timestamp,
        action: args.data.action,
        path: args.data.path,
        ipAddress: this.getClientIpAddress()
      };
    }
    
    // Log to audit service
    this.logToAuditService(requestId, args.data);
  }
  
  private generateRequestId(): string {
    return `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
  
  private getToken(): string {
    return localStorage.getItem('authToken') || '';
  }
  
  private getClientIpAddress(): string {
    // Get from request if available
    return 'client-ip';
  }
  
  private logToAuditService(requestId: string, data: any) {
    console.log('Audit:', { requestId, action: data?.action, time: new Date() });
  }
}
```

---

## Best Practices

1. **Store tokens securely** - Use httpOnly cookies or secure storage
2. **Always use HTTPS** - Never send tokens over unencrypted connections
3. **Validate tokens on backend** - Don't trust tokens from client
4. **Refresh tokens** - Implement token refresh before expiration
5. **Limit token scope** - Use specific scopes for file operations
6. **Add request IDs** - Track requests for debugging and audit trails
7. **Log all operations** - Maintain comprehensive audit logs
8. **Handle auth errors** - Redirect to login on 401 responses
9. **Use CORS properly** - Only allow required origins and methods
10. **Implement rate limiting** - Prevent abuse with request throttling

---

**Next:** Explore custom file providers at [custom-file-provider.md](custom-file-provider.md) or learn about file operations at [file-operations.md](file-operations.md).
