---
title: Middleware and Authentication
---

# Applying Middleware Logic

## Table of Contents
- [What is Middleware](#what-is-middleware)
- [Pre-Request Middleware](#pre-request-middleware)
- [Post-Response Middleware](#post-response-middleware)
- [Multiple Middleware](#multiple-middleware)
- [JWT Authentication Pattern](#jwt-authentication-pattern)
- [Error Handling via Middleware](#error-handling-via-middleware)
- [API Gateway Pattern](#api-gateway-pattern)
- [Middleware Best Practices](#middleware-best-practices)

---

## What is Middleware?

Middleware intercepts DataManager requests/responses to:
- Add authentication headers
- Transform requests/responses
- Log API calls
- Handle errors
- Modify data

```
User Code
   ↓ Query
DataManager
   ↓ Pre-request Middleware
HTTP Request → Server
   ↓ Response
DataManager
   ↓ Post-response Middleware
User Code
```

---

## Pre-Request Middleware

**Runs BEFORE HTTP request is sent**

### Basic Setup

```typescript
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// Apply pre-request middleware to add authentication header
dm.applyPreRequestMiddlewares = async (context: any) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    context.request.headers = context.request.headers || {};
    context.request.headers['Authorization'] = `Bearer ${token}`;
  }
  return context;
};

// Query now includes auth header automatically
dm.executeQuery(new Query().take(10));
```

### Common Pre-request Middleware

#### 1. Add Authentication Headers

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// Apply pre-request middleware
dm.applyPreRequestMiddlewares = async (context: any) => {
  const token = getAuthToken();  // Get from localStorage, session, etc.
  if (token) {
    context.request.headers = context.request.headers || {};
    context.request.headers['Authorization'] = `Bearer ${token}`;
  }

  // Add API key
  context.request.headers['X-API-Key'] = process.env.API_KEY;

  // Add custom headers
  context.request.headers['X-Client-Version'] = '1.0.0';
  context.request.headers['X-Request-Id'] = generateUUID();
  
  return context;
};
```

#### 2. Modify Request URL

```typescript
const addTenantId = async (context) => {
  const tenantId = getUserTenantId();
  
  // Add to query string
  if (context.request.url.includes('?')) {
    context.request.url += `&tenantId=${tenantId}`;
  } else {
    context.request.url += `?tenantId=${tenantId}`;
  }
};
```

#### 3. Transform Request Body

```typescript
const transformRequestBody = async (context) => {
  if (context.request.body) {
    // Convert snake_case to camelCase for API
    const body = JSON.parse(context.request.body);
    const transformed = {};
    
    for (const key in body) {
      transformed[toCamelCase(key)] = body[key];
    }
    
    context.request.body = JSON.stringify(transformed);
  }
};

function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}
```

#### 4. Add Request Timeout

```typescript
const addTimeout = async (context) => {
  const timeoutMs = 30000;  // 30 seconds
  
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), timeoutMs);
  });
  
  // Implement timeout handling (depends on adaptor)
  context.requestTimeout = timeoutMs;
};
```

#### 5. Request Logging

```typescript
const logRequest = async (context) => {
  const timestamp = new Date().toISOString();
  const method = context.request.method || 'GET';
  const url = context.request.url;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  console.log('Headers:', context.request.headers);
  
  if (context.request.body) {
    console.log('Body:', context.request.body);
  }
};
```

---

## Post-Response Middleware

**Runs AFTER HTTP response is received**

### Basic Setup

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// Apply post-response middleware
dm.applyPostRequestMiddlewares = async (result: any) => {
  if (result.status >= 400) {
    // Handle error response
    console.error('API error:', result.status);
  } else {
    // Process success response
    const data = result;
    console.log('Got data:', data);
  }
  return result;
};
```

### Common Post-response Middleware

#### 1. Handle 401 Unauthorized

```typescript
const handleUnauthorized = async (context) => {
  if (context.response.status === 401) {
    console.error('Session expired');
    
    // Clear local auth
    localStorage.removeItem('authToken');
    
    // Redirect to login
    window.location.href = '/login';
    
    // Prevent further processing
    context.response.status = 0;
  }
};
```

#### 2. Handle 403 Forbidden

```typescript
const handleForbidden = async (context) => {
  if (context.response.status === 403) {
    console.error('Access denied');
    showNotification(
      'You do not have permission to access this resource',
      'error'
    );
  }
};
```

#### 3. Transform Response Data

```typescript
const transformResponse = async (context) => {
  if (context.response.ok && context.response.result) {
    // Backend returns snake_case, convert to camelCase
    const data = context.response.result;
    
    if (Array.isArray(data)) {
      context.response.result = data.map(item =>
        convertToCamelCase(item)
      );
    } else {
      context.response.result = convertToCamelCase(data);
    }
  }
};

function convertToCamelCase(obj) {
  const result = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, char) =>
      char.toUpperCase()
    );
    result[camelKey] = obj[key];
  }
  return result;
}
```

#### 4. Response Logging

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

dm.applyPostRequestMiddlewares = async (result: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Response received`);
  
  if (result) {
    console.log('Data:', result);
  }
  
  return result;
};
```

#### 5. Cache Management

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

dm.applyPostRequestMiddlewares = async (result: any) => {
  // Cache GET responses with TTL
  if (result && typeof result === 'object') {
    const cacheKey = 'api_cache';
    const cacheData = {
      result: result,
      timestamp: Date.now(),
      ttl: 60000  // 1 minute
    };
    
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  }
  
  return result;
};
```

---

## Multiple Middleware

### Chaining Middleware

```typescript
const dm = new DataManager({
  url: '/api/orders',
  adaptor: new UrlAdaptor()
});

// Middleware stack function to chain multiple middlewares
function applyMiddlewareStack(middlewares: ((context: any) => Promise<any>)[]) {
  return async (context: any) => {
    let result = context;
    for (const middleware of middlewares) {
      result = await middleware(result);
    }
    return result;
  };
}

// Apply MULTIPLE pre-request middlewares in order
dm.applyPreRequestMiddlewares = applyMiddlewareStack([
  async (context) => {
    // 1st middleware - addAuthHeaders
    const token = localStorage.getItem('authToken');
    if (token) {
      context.request.headers = context.request.headers || {};
      context.request.headers['Authorization'] = `Bearer ${token}`;
    }
    return context;
  },
  async (context) => {
    // 2nd middleware - addTenantId
    const tenantId = localStorage.getItem('tenantId');
    if (tenantId) {
      if (context.request.url.includes('?')) {
        context.request.url += `&tenantId=${tenantId}`;
      } else {
        context.request.url += `?tenantId=${tenantId}`;
      }
    }
    return context;
  },
  async (context) => {
    // 3rd middleware - logRequest
    console.log(`Request: ${context.request.method} ${context.request.url}`);
    return context;
  }
]);

// Apply MULTIPLE post-response middlewares
dm.applyPostRequestMiddlewares = applyMiddlewareStack([
  async (result) => {
    // 1st middleware - handleUnauthorized
    if (result.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return result;
  },
  async (result) => {
    // 2nd middleware - transformResponse (camelCase)
    if (result && Array.isArray(result)) {
      return result.map((item: any) => {
        const transformed: any = {};
        for (const key in item) {
          const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
          transformed[camelKey] = item[key];
        }
        return transformed;
      });
    }
    return result;
  },
  async (result) => {
    // 3rd middleware - logResponse
    console.log('Response:', result);
    return result;
  }
]);
```

---

## JWT Authentication Pattern

### Complete JWT Example

```typescript
function setupJWTDataManager() {
  const dm = new DataManager({
    url: '/api/orders',
    adaptor: new WebApiAdaptor(),

  });

  // Pre-request: Add JWT token
  dm.applyPreRequestMiddlewares = async (context: any) => {
    let token = localStorage.getItem('jwt_token');

    // If token expired, refresh it
    if (isTokenExpired(token)) {
      token = await refreshToken();
      localStorage.setItem('jwt_token', token);
    }

    context.request.headers = context.request.headers || {};
    context.request.headers['Authorization'] = `Bearer ${token}`;
    return context;
  };

  // Post-response: Handle token expiration
  dm.applyPostRequestMiddlewares = async (result: any) => {
    if (result.status === 401) {
      const newToken = await refreshToken();
      if (newToken) {
        localStorage.setItem('jwt_token', newToken);
        // Retry request with new token
        console.log('Token refreshed, retrying request...');
      } else {
        // Redirect to login if refresh fails
        redirectToLogin();
      }
    }
    return result;
  };

  return dm;
}

function isTokenExpired(token) {
  const payload = JSON.parse(atob(token.split('.')[1]));
  return Date.now() >= payload.exp * 1000;
}

async function refreshToken() {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST'
    });
    const data = await response.json();
    return data.token;
  } catch (error) {
    console.error('Refresh failed:', error);
    return null;
  }
}

function redirectToLogin() {
  window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
}
```

---

## Error Handling via Middleware

### Centralized Error Handler

```typescript
const globalErrorHandler = async (context) => {
  if (context.response.status >= 400) {
    const error = {
      status: context.response.status,
      message: context.response.statusText,
      timestamp: new Date().toISOString(),
      method: context.request.method,
      url: context.request.url
    };

    // Log to backend error tracking
    await logErrorToBackend(error);

    // Show user-friendly message
    const userMessage = getErrorMessage(context.response.status);
    showNotification(userMessage, 'error');
  }
};

function getErrorMessage(status) {
  const messages = {
    400: 'Invalid request - check your data',
    401: 'Your session has expired - please login again',
    403: 'You do not have permission for this action',
    404: 'The resource was not found',
    500: 'Server error - please try again later',
    503: 'Service unavailable - please try again later'
  };
  return messages[status] || 'An error occurred';
}

async function logErrorToBackend(error) {
  await fetch('/api/errors/log', {
    method: 'POST'
  });
}
```

---

## API Gateway Pattern

### Request Routing via Middleware

```typescript
function setupMultiEndpointDataManager() {
  const dm = new DataManager({
    url: '/api/proxy',  // Single gateway endpoint
    adaptor: new UrlAdaptor()
  });

  // Route to correct microservice based on URL
  dm.applyPreRequestMiddlewares = async (context: any) => {
    const service = getServiceForRoute(context.request.url);

    if (service === 'orders') {
      context.request.url = '/api/orders-service' + context.request.url;
    } else if (service === 'products') {
      context.request.url = '/api/products-service' + context.request.url;
    } else if (service === 'customers') {
      context.request.url = '/api/customers-service' + context.request.url;
    }
    
    return context;
  };

  return dm;
}
```

---

## Middleware Best Practices

1. **Keep middleware fast** - No heavy processing
2. **Handle errors** - Never throw in middleware
3. **Don't modify user data** - Only transform format
4. **Log strategically** - Don't log sensitive data
5. **Use async/await** - For async operations
6. **Test middleware** - Unit test each middleware function

---
