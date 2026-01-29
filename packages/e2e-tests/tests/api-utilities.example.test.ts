/**
 * API Utilities Example Tests
 * Demonstrates how to use API testing utilities for Power Platform
 * #APITesting - Generated examples for API testing capabilities
 */

import { test, expect } from '@playwright/test';
import {
  extractTokenFromStorage,
  createAuthenticatedApiContext,
  buildBapApiEndpoint,
  createBapApiHeaders,
  buildResourceQueryEndpoint,
  createQueryPayload,
  validateApiResponse,
  pollOperationStatus,
  ConfigHelper,
} from 'playwright-power-platform-toolkit';

/**
 * Example 1: Extract Authentication Token
 * Shows how to get the Bearer token from storage state
 */
test('Extract token from storage state', async () => {
  await test.step('Extract default token', async () => {
    const token = extractTokenFromStorage();

    expect(token).toBeDefined();
    expect(token).toContain('ey'); // JWT tokens start with 'ey'
    console.log(`Token length: ${token?.length || 0} characters`);
  });

  await test.step('Extract token for specific API', async () => {
    // Get token with specific audience for BAP API
    const bapToken = extractTokenFromStorage(undefined, 'https://api.bap.microsoft.com');

    if (bapToken) {
      console.log('BAP-specific token extracted');
      expect(bapToken).toBeDefined();
    }
  });
});

/**
 * Example 2: Create Authenticated API Context
 * Shows how to create an API context with automatic authentication
 */
test('Create authenticated API context', async () => {
  const token = extractTokenFromStorage();
  expect(token).toBeDefined();

  await test.step('Create API context', async () => {
    const apiContext = await createAuthenticatedApiContext(token!, 'https://api.powerapps.com');

    expect(apiContext).toBeDefined();

    // Context includes authentication headers automatically
    await apiContext.dispose();
  });
});

/**
 * Example 3: Make Simple GET Request
 * Shows how to make authenticated GET requests
 */
test('Make authenticated GET request', async () => {
  const token = extractTokenFromStorage();
  const apiContext = await createAuthenticatedApiContext(token!, 'https://api.powerapps.com');

  try {
    await test.step('Get apps list', async () => {
      const response = await apiContext.get('/providers/Microsoft.PowerApps/apps');

      expect(response.status()).toBe(200);

      const data = await response.json();
      console.log(`Found ${data.value?.length || 0} apps`);
    });
  } finally {
    await apiContext.dispose();
  }
});

/**
 * Example 4: Validate API Response
 * Shows how to validate responses with built-in helper
 */
test('Validate API response with helper', async () => {
  const token = extractTokenFromStorage();
  const apiContext = await createAuthenticatedApiContext(token!, 'https://api.powerapps.com');

  try {
    await test.step('Get and validate response', async () => {
      const response = await apiContext.get('/providers/Microsoft.PowerApps/apps');
      const validation = await validateApiResponse(response);

      // Check validation result
      expect(validation.success).toBe(true);
      expect(validation.status).toBe(200);
      expect(validation.contentType).toContain('application/json');

      // Request tracking ID for debugging
      if (validation.requestId) {
        console.log(`Request ID: ${validation.requestId}`);
      }

      // Access parsed data
      expect(validation.data).toBeDefined();
      expect(validation.data.value).toBeInstanceOf(Array);
    });
  } finally {
    await apiContext.dispose();
  }
});

/**
 * Example 5: Use BAP API Invoke Pattern
 * Shows how to use the BAP API invoke pattern for environment operations
 */
test('Use BAP API invoke pattern', async () => {
  const token = extractTokenFromStorage();

  await test.step('Build BAP API endpoint', async () => {
    const endpoint = buildBapApiEndpoint('/providers/Microsoft.PowerApps/apps');

    expect(endpoint).toContain('api.bap.microsoft.com');
    expect(endpoint).toContain('/api/invoke');
    console.log(`BAP endpoint: ${endpoint}`);
  });

  await test.step('Create BAP API headers', async () => {
    const headers = createBapApiHeaders('/providers/Microsoft.PowerApps/apps?$top=10', token!);

    expect(headers).toHaveProperty('authorization');
    expect(headers).toHaveProperty('x-ms-path-query');
    expect(headers['x-ms-path-query']).toContain('/providers/Microsoft.PowerApps/apps');
  });
});

/**
 * Example 6: Use ResourceQuery API
 * Shows how to query resources with OData filters
 */
test('Use ResourceQuery API', async () => {
  const token = extractTokenFromStorage();
  const apiContext = await createAuthenticatedApiContext(token!);

  try {
    await test.step('Build ResourceQuery endpoint', async () => {
      const endpoint = buildResourceQueryEndpoint();

      expect(endpoint).toContain('make.powerapps.com');
      expect(endpoint).toContain('/api/resourcequery');
    });

    await test.step('Create query payload', async () => {
      const payload = createQueryPayload({
        top: 10,
        filter: "type eq 'Microsoft.PowerApps/apps'",
        orderBy: 'properties/displayName asc',
      });

      expect(payload.query.top).toBe(10);
      expect(payload.query.filter).toContain("type eq 'Microsoft.PowerApps/apps'");
    });

    await test.step('Execute ResourceQuery', async () => {
      const endpoint = buildResourceQueryEndpoint();
      const payload = createQueryPayload({
        top: 5,
        filter: "type eq 'Microsoft.PowerApps/apps'",
      });

      const response = await apiContext.post(endpoint, { data: payload });
      const validation = await validateApiResponse(response);

      expect(validation.success).toBe(true);
      console.log(`Query returned ${validation.data.value?.length || 0} items`);
    });
  } finally {
    await apiContext.dispose();
  }
});

/**
 * Example 7: POST Request with Body
 * Shows how to make POST requests with request bodies
 */
test.skip('Create resource via POST', async () => {
  const token = extractTokenFromStorage();
  const apiContext = await createAuthenticatedApiContext(token!);

  try {
    await test.step('Create new app via API', async () => {
      const appData = {
        displayName: `Test App ${Date.now()}`,
        description: 'Created via API test',
        properties: {
          environment: ConfigHelper.getEnvironmentId(),
        },
      };

      const response = await apiContext.post('/api/apps', {
        data: appData,
      });

      const validation = await validateApiResponse(response);

      if (validation.success) {
        console.log('App created successfully');
        console.log(`App ID: ${validation.data.id}`);
      }
    });
  } finally {
    await apiContext.dispose();
  }
});

/**
 * Example 8: Handle API Errors
 * Shows how to handle error responses gracefully
 */
test('Handle API error responses', async () => {
  const token = extractTokenFromStorage();
  const apiContext = await createAuthenticatedApiContext(token!);

  try {
    await test.step('Request non-existent resource', async () => {
      const response = await apiContext.get('/api/non-existent-endpoint');
      const validation = await validateApiResponse(response);

      // Expect error response
      expect(validation.success).toBe(false);
      expect(validation.status).toBeGreaterThanOrEqual(400);

      console.log(`Error status: ${validation.status}`);
      if (validation.requestId) {
        console.log(`Request ID for debugging: ${validation.requestId}`);
      }
    });
  } finally {
    await apiContext.dispose();
  }
});

/**
 * Example 9: Poll Long-Running Operation
 * Shows how to wait for asynchronous operations to complete
 */
test.skip('Poll long-running operation', async () => {
  const token = extractTokenFromStorage();
  const apiContext = await createAuthenticatedApiContext(token!);

  try {
    await test.step('Start operation and poll for completion', async () => {
      // Start operation (example endpoint)
      const response = await apiContext.post('/api/operations', {
        data: { action: 'deploy', targetEnvironment: 'test' },
      });

      const data = await response.json();
      const operationUrl = data.operationUrl;

      console.log('Operation started, polling for completion...');

      // Poll until complete (max 60 attempts, every 2 seconds)
      const result = await pollOperationStatus(
        operationUrl,
        token!,
        60, // max attempts
        2000 // interval in ms
      );

      if (result.success) {
        console.log('Operation completed successfully');
        console.log('Result:', JSON.stringify(result.data, null, 2));
      } else {
        console.log('Operation failed');
        console.log('Error:', result.data);
      }

      expect(result.success).toBe(true);
    });
  } finally {
    await apiContext.dispose();
  }
});

/**
 * Example 10: Combine Multiple API Calls
 * Shows how to orchestrate multiple API operations
 */
test('Combine multiple API calls', async () => {
  const token = extractTokenFromStorage();
  const apiContext = await createAuthenticatedApiContext(token!);

  try {
    await test.step('Get apps and filter by criteria', async () => {
      // Get all apps
      const appsResponse = await apiContext.get('/providers/Microsoft.PowerApps/apps');
      const appsValidation = await validateApiResponse(appsResponse);

      expect(appsValidation.success).toBe(true);

      const apps = appsValidation.data.value || [];
      console.log(`Total apps: ${apps.length}`);

      // Filter apps created this month
      const thisMonth = new Date().getMonth();
      const recentApps = apps.filter((app: any) => {
        const created = new Date(app.properties.createdTime);
        return created.getMonth() === thisMonth;
      });

      console.log(`Apps created this month: ${recentApps.length}`);
    });

    await test.step('Get environment details', async () => {
      const envId = ConfigHelper.getEnvironmentId();
      if (envId) {
        const response = await apiContext.get(
          `/providers/Microsoft.PowerApps/environments/${envId}`
        );
        const validation = await validateApiResponse(response);

        if (validation.success) {
          console.log(`Environment: ${validation.data.properties?.displayName}`);
        }
      }
    });
  } finally {
    await apiContext.dispose();
  }
});

/**
 * Example 11: Compare Response Times
 * Shows how to measure and compare API performance
 */
test('Measure API response times', async () => {
  const token = extractTokenFromStorage();
  const apiContext = await createAuthenticatedApiContext(token!);

  try {
    await test.step('Measure multiple API calls', async () => {
      const timings: number[] = [];

      for (let i = 0; i < 3; i++) {
        const startTime = Date.now();
        const response = await apiContext.get('/providers/Microsoft.PowerApps/apps?$top=10');
        const duration = Date.now() - startTime;

        timings.push(duration);
        console.log(`Call ${i + 1}: ${duration}ms`);

        expect(response.status()).toBe(200);
      }

      const avgTime = timings.reduce((a, b) => a + b, 0) / timings.length;
      console.log(`Average response time: ${avgTime.toFixed(2)}ms`);

      // Assert reasonable performance (adjust threshold as needed)
      expect(avgTime).toBeLessThan(5000); // 5 seconds
    });
  } finally {
    await apiContext.dispose();
  }
});

/**
 * Example 12: Verify Backend State
 * Shows how to use API to verify backend state after UI actions
 */
test.skip('Verify backend state via API', async ({ page }) => {
  const token = extractTokenFromStorage();
  const apiContext = await createAuthenticatedApiContext(token!);

  try {
    await test.step('Perform UI action', async () => {
      // Simulate UI action (would normally interact with page)
      console.log('UI action: Created new app');
    });

    await test.step('Verify via API', async () => {
      // Verify the backend reflects the UI change
      const response = await apiContext.get('/providers/Microsoft.PowerApps/apps');
      const validation = await validateApiResponse(response);

      expect(validation.success).toBe(true);

      const apps = validation.data.value || [];
      const targetApp = apps.find((app: any) => app.properties.displayName === 'Test App');

      // Verify app exists in backend
      expect(targetApp).toBeDefined();
      console.log('Backend state confirmed via API');
    });
  } finally {
    await apiContext.dispose();
  }
});

/**
 * Example 13: Parallel API Requests
 * Shows how to make multiple API calls concurrently
 */
test('Make parallel API requests', async () => {
  const token = extractTokenFromStorage();
  const apiContext = await createAuthenticatedApiContext(token!);

  try {
    await test.step('Execute multiple calls in parallel', async () => {
      const startTime = Date.now();

      // Make multiple calls concurrently
      const [appsResponse, envsResponse, connectionsResponse] = await Promise.all([
        apiContext.get('/providers/Microsoft.PowerApps/apps?$top=5'),
        apiContext.get('/providers/Microsoft.PowerApps/environments'),
        apiContext.get('/providers/Microsoft.PowerApps/connections?$top=5'),
      ]);

      const duration = Date.now() - startTime;

      // Validate all responses
      const [appsValidation, envsValidation, connectionsValidation] = await Promise.all([
        validateApiResponse(appsResponse),
        validateApiResponse(envsResponse),
        validateApiResponse(connectionsResponse),
      ]);

      expect(appsValidation.success).toBe(true);
      expect(envsValidation.success).toBe(true);
      expect(connectionsValidation.success).toBe(true);

      console.log(`All 3 requests completed in ${duration}ms`);
      console.log(`Apps: ${appsValidation.data.value?.length || 0}`);
      console.log(`Environments: ${envsValidation.data.value?.length || 0}`);
      console.log(`Connections: ${connectionsValidation.data.value?.length || 0}`);
    });
  } finally {
    await apiContext.dispose();
  }
});
