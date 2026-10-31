---
title: Middleware Customization in Syncfusion Angular DataManager
---

# Middleware Customization in Syncfusion Angular DataManager

## Table of Contents

- [Overview](#overview)
- [Pre-Request Middleware](#pre-request-middleware)
- [Post-Request Middleware](#post-request-middleware)
- [Custom Headers](#custom-headers)
- [Authentication Patterns](#authentication-patterns)
- [Request/Response Transformation](#requestresponse-transformation)
- [Error Handling](#error-handling)
- [Complete Example](#complete-example)

---

## Overview

Middleware in DataManager allows you to intercept and modify:
- **Pre-request:** Executed before sending request to server
- **Post-request:** Executed after receiving response

This enables:
- Adding authentication headers
- Transforming request/response data
- Logging and monitoring
- Custom business logic
- Error handling and retry logic

---

## Pre-Request Middleware

### applyPreRequestMiddlewares()

Modify the request BEFORE it's sent to the server. The `applyPreRequestMiddlewares` method runs before a request is sent to the backend. It allows you to modify request headers, query parameters, or payloads.

### Basic Usage - Add Authorization Token

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

// Apply pre-request middleware to add authentication token
dataManager.applyPreRequestMiddlewares([
  async (context) => {
    context.request.headers['Authorization'] = 'send_token';
  }
]);
```

### Advanced - Dynamic Header from Server

```typescript
const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
}).executeQuery(new Query().take(8));

// Fetch token from authentication server before each request
dataManager.applyPreRequestMiddlewares = async (request: string | Object): Promise<object> => {
  const response = await fetch('url', {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  
  const tokenData = await response.json();
  return { token: tokenData.access_token };
};
```

### Example - Add Timestamp Header

```typescript
dataManager.applyPreRequestMiddlewares([
  async (context) => {
    context.request.headers['X-Timestamp'] = new Date().toISOString();
    context.request.headers['X-Request-ID'] = generateRequestId();
  }
]);

function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
```

### Add Authorization Header

```typescript
class AuthenticatedAdaptor extends WebApiAdaptor {
  constructor(private token: string) {
    super();
  }

  beforeSend(dm: DataManager, request: any): void {
    super.beforeSend(dm, request);
    
    if (request instanceof XMLHttpRequest) {
      request.setRequestHeader('Authorization', `send_token`);
    }
  }
}

const dataManager = new DataManager({
  url: 'url',
  adaptor: new AuthenticatedAdaptor('your-jwt-token')
});
```

### Transform Request Data

```typescript
class TransformAdaptor extends WebApiAdaptor {
  processQuery(dm: DataManager, query: Query, params?: any): any {
    const request = super.processQuery(dm, query, params);
    
    // Transform parameters for custom API format
    const transformed = {
      ...request,
      // Convert skip/take to page/size for some APIs
      page: Math.floor(request.skip / request.take) + 1,
      pageSize: request.take
    };
    
    return transformed;
  }
}
```

---

## Post-Request Middleware

### applyPostRequestMiddlewares()

Modify the response AFTER it's received from the server. The `applyPostRequestMiddlewares` method runs after a response is received from the server but before binding the data to a component. It allows you to modify, filter, or restructure response data as needed.

### Basic Usage - Transform Response Data

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});

// Apply post-request middleware to format response data
dataManager.applyPostRequestMiddlewares([
  async (context) => {
    // Transform each item in the response
    if (context.response.result) {
      context.response.result = context.response.result.map(item => ({
        id: item.Id,
        name: item.Name.toUpperCase(),
        date: new Date(item.Timestamp).toLocaleDateString()
      }));
    }
  }
]);
```

### Parse Nested Response Structure

```typescript
// Server returns { data: { items: [...], total: N } }
dataManager.applyPostRequestMiddlewares([
  async (context) => {
    const originalResponse = context.response;
    
    // Normalize your custom response format to DataManager format
    context.response = {
      result: originalResponse.data.items,
      count: originalResponse.data.total
    };
  }
]);
```

### Parse Nested Response

```typescript
class NestedResponseAdaptor extends WebApiAdaptor {
  processResponse(response: any, dm?: DataManager): any {
    // Server returns { data: { items: [...], total: N } }
    const normalizedResponse = {
      result: response.data.items,
      count: response.data.total
    };
    
    return super.processResponse(normalizedResponse, dm);
  }
}
```

### Format Data Types

```typescript
class TypeFormatterAdaptor extends WebApiAdaptor {
  processResponse(response: any, dm?: DataManager): any {
    const result = super.processResponse(response, dm);
    
    if (result.result) {
      result.result = result.result.map((item: any) => ({
        ...item,
        orderDate: new Date(item.orderDate),  // String to Date
        freight: parseFloat(item.freight),     // String to Number
        isActive: item.isActive === 'true'     // String to Boolean
      }));
    }
    
    return result;
  }
}
```

---

## Custom Headers

### Add Static Headers

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor()
});
```

### Add Dynamic Headers

```typescript
class DynamicHeaderAdaptor extends WebApiAdaptor {
  constructor(private userId: string) {
    super();
  }

  beforeSend(dm: DataManager, request: any): void {
    super.beforeSend(dm, request);
    
    if (request instanceof XMLHttpRequest) {
      request.setRequestHeader('X-User-ID', this.userId);
      request.setRequestHeader('X-Request-Time', new Date().toISOString());
      request.setRequestHeader('X-Trace-ID', this.generateTraceId());
    }
  }

  generateTraceId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
```

### Content Negotiation

```typescript
class ContentNegotiationAdaptor extends WebApiAdaptor {
  beforeSend(dm: DataManager, request: any): void {
    super.beforeSend(dm, request);
    
    if (request instanceof XMLHttpRequest) {
      request.setRequestHeader('Accept', 'application/json;charset=utf-8');
      request.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
    }
  }
}
```

---

## Authentication Patterns

### JWT Token Authentication

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DataService {
  private token: string;

  constructor(private http: HttpClient) {}

  getAuthenticatedDataManager(): DataManager {
    // Get token from storage or auth service
    this.token = localStorage.getItem('auth_token') || '';

    return new DataManager({
      url: 'url',
      adaptor: new WebApiAdaptor()
    });
  }
}
```

### Refresh Token Logic

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
class RefreshTokenAdaptor extends WebApiAdaptor {
  constructor(private authService: AuthService) {
    super();
  }

  processResponse(response: any, dm?: DataManager): any {
    // Handle 401 Unauthorized
    if (response.status === 401) {
      // Refresh token and retry
      this.authService.refreshToken()
        .then(newToken => {
          localStorage.setItem('auth_token', newToken);
          // Retry request with new token
        });
    }

    return super.processResponse(response, dm);
  }
}
```

### Session Validation

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
class SessionAdaptor extends WebApiAdaptor {
  beforeSend(dm: DataManager, request: any): void {
    super.beforeSend(dm, request);

    // Check session validity
    const sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      throw new Error('Session expired - please login again');
    }

    if (request instanceof XMLHttpRequest) {
      request.setRequestHeader('X-Session-ID', sessionId);
    }
  }
}
```

---

## Request/Response Transformation

### Transform Before Sending

```typescript
class RequestTransformAdaptor extends WebApiAdaptor {
  processQuery(dm: DataManager, query: Query, params?: any): any {
    const request = super.processQuery(dm, query, params);

    // Your API uses different format
    return {
      page: request.skip / request.take,
      size: request.take,
      filter: request.filter ? JSON.stringify(request.filter) : null,
      sort: request.sorted
    };
  }
}
```

### Transform After Receiving

```typescript
class ResponseTransformAdaptor extends WebApiAdaptor {
  processResponse(response: any, dm?: DataManager): any {
    // Server returns different structure
    const transformed = {
      result: response.payload || [],
      count: response.pagination?.total || 0
    };

    return super.processResponse(transformed, dm);
  }
}
```

### Complete Transformation Example

```typescript
class CompletTransformAdaptor extends WebApiAdaptor {
  processQuery(dm: DataManager, query: Query): any {
    // Request transformation
    const request = super.processQuery(dm, query);
    
    return {
      offset: request.skip,
      limit: request.take,
      where: request.where,
      order: request.sorted?.map((s: any) => ({
        field: s.name,
        direction: s.direction
      }))
    };
  }

  processResponse(response: any, dm?: DataManager): any {
    // Response transformation
    const result = {
      result: response.items || [],
      count: response.totalCount || 0
    };

    return super.processResponse(result, dm);
  }
}
```

---

## Error Handling

### Catch Request Errors

```typescript
class ErrorHandlingAdaptor extends WebApiAdaptor {
  processResponse(response: any, dm?: DataManager): any {
    try {
      return super.processResponse(response, dm);
    } catch (error: any) {
      console.error('Response processing error:', error);
      
      if (error.status === 404) {
        console.error('Resource not found');
      } else if (error.status === 500) {
        console.error('Server error - retrying...');
        // Implement retry logic
      }
      
      throw error;
    }
  }
}
```

### Retry Failed Requests

```typescript
class RetryAdaptor extends WebApiAdaptor {
  private retryCount = 0;
  private maxRetries = 3;

  processResponse(response: any, dm?: DataManager): any {
    if (response.status === 500 && this.retryCount < this.maxRetries) {
      this.retryCount++;
      console.log(`Retry attempt ${this.retryCount}/${this.maxRetries}`);
      
      // Implement exponential backoff
      setTimeout(() => {
        // Retry logic
      }, Math.pow(2, this.retryCount) * 1000);
    } else {
      this.retryCount = 0;
    }

    return super.processResponse(response, dm);
  }
}
```

### Graceful Error Messages

```typescript
class UserFriendlyErrorAdaptor extends WebApiAdaptor {
  processResponse(response: any, dm?: DataManager): any {
    if (response.error) {
      const errorMessage = this.getErrorMessage(response.error.code);
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    return super.processResponse(response, dm);
  }

  private getErrorMessage(code: string): string {
    const messages: { [key: string]: string } = {
      'ERR_001': 'Failed to load data. Please try again.',
      'ERR_002': 'Unauthorized access. Please login again.',
      'ERR_003': 'Invalid data format.',
      'NETWORK_ERROR': 'Network connection failed.'
    };

    return messages[code] || 'An unknown error occurred.';
  }
}
```

---

## Complete Example

### Full Custom Middleware with All Features

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
import { DataManager, WebApiAdaptor, Query } from '@syncfusion/ej2-data';

class CompleteAdaptor extends WebApiAdaptor {
  private apiVersion = 'v2.0';
  private requestCount = 0;

  constructor(private authToken: string) {
    super();
  }

  // Pre-request: Add headers, transform data
  beforeSend(dm: DataManager, request: any): void {
    super.beforeSend(dm, request);

    this.requestCount++;

    if (request instanceof XMLHttpRequest) {
      // Add authentication
      request.setRequestHeader('Authorization', `send_token`);

      // Add API version
      request.setRequestHeader('X-API-Version', this.apiVersion);

      // Add request metadata
      request.setRequestHeader('X-Request-ID', `${Date.now()}-${this.requestCount}`);
      request.setRequestHeader('X-Timestamp', new Date().toISOString());

      // Add custom headers
      request.setRequestHeader('Accept-Language', navigator.language);
      request.setRequestHeader('X-Client', 'angular-datamanager');
    }
  }

  // Transform request parameters
  processQuery(dm: DataManager, query: Query, params?: any): any {
    const request = super.processQuery(dm, query, params);

    // Convert to your API format
    return {
      page: Math.floor((request.skip || 0) / (request.take || 10)) + 1,
      pageSize: request.take || 10,
      filter: request.where || null,
      sort: request.sorted || []
    };
  }

  // Transform and validate response
  processResponse(response: any, dm?: DataManager, query?: Query): any {
    // Check for errors
    if (response.error) {
      throw new Error(response.error.message);
    }

    // Transform response structure
    const transformed = {
      result: response.data?.items || response.data || [],
      count: response.data?.total || response.total || 0
    };

    // Validate required fields
    if (!transformed.result) {
      throw new Error('Invalid response format');
    }

    // Apply post-processing
    if (Array.isArray(transformed.result)) {
      transformed.result = transformed.result.map((item: any) => ({
        ...item,
        _processed: true,
        _timestamp: new Date()
      }));
    }

    return super.processResponse(transformed, dm, query);
  }
}

// Usage in Component
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent {
  public orders: any[] = [];

  constructor() {
    const token = localStorage.getItem('auth_token') || 'default-token';

    const dataManager = new DataManager({
      url: 'url',
      adaptor: new CompleteAdaptor(token)
    });

    // Use the configured data manager
    dataManager.executeQuery(new Query().take(10))
      .then((result) => {
        this.orders = result.result;
      })
      .catch((error) => {
        console.error('Failed to load orders:', error);
      });
  }
}
```

---

## Best Practices

1. **Keep middleware focused** — Do one thing well
2. **Handle errors gracefully** — Always have fallbacks
3. **Log appropriately** — Debug development, minimal production
4. **Secure sensitive data** — Never log tokens or passwords
5. **Document transformations** — Explain non-obvious changes
6. **Test thoroughly** — Test both success and failure paths
7. **Use TypeScript** — TypeScript guards help prevent errors
8. **Monitor performance** — Middleware adds overhead

---
