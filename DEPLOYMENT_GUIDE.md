# Render Deployment Guide

## Problem Fixed

The deployment issue was caused by Render trying to run the development server (`npm run dev`) instead of building and serving the production files. The development server only binds to localhost, but Render needs the service to bind to `0.0.0.0`.

## Solution Implemented

### 1. Updated Package.json Scripts

- **start**: Uses a Node.js server with `serve` package that properly binds to all interfaces
- **build**: Builds the production files and generates sitemap/RSS
- **preview**: Preview mode that works with Render's PORT environment variable

### 2. Two Deployment Options

#### Option A: Static Site (Recommended)

Use `render.yaml`:

```yaml
services:
  - type: web
    name: react-portfolio
    env: static
    buildCommand: npm install && npm run build
    staticPublishPath: ./dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

#### Option B: Web Service

Use `render-web-service.yaml`:

```yaml
services:
  - type: web
    name: react-portfolio
    env: node
    buildCommand: npm install && npm run build
    startCommand: npm start
    plan: free
    envVars:
      - key: NODE_ENV
        value: production
```

### 3. Updated Vite Configuration

- Added proper server configuration for both development and preview modes
- Configured to bind to `0.0.0.0` instead of just localhost
- Added PORT environment variable support

### 4. Custom Server Script

Created `server.js` that:

- Uses the `serve` package to serve static files
- Properly handles environment PORT variable
- Binds to `0.0.0.0` for external access

## Deployment Instructions

1. **If using Static Site (Option A - Recommended)**:

   - Use the existing `render.yaml` file
   - In Render dashboard, make sure service type is set to "Static Site"

2. **If using Web Service (Option B)**:

   - Rename `render-web-service.yaml` to `render.yaml`
   - In Render dashboard, make sure service type is set to "Web Service"

3. **Push your changes to your Git repository**

4. **Trigger a new deployment in Render**

## Key Changes Made

1. **Package.json**:

   - Added `serve` dependency
   - Updated start script to use custom server
   - Updated preview script for Render compatibility

2. **Vite.config.js**:

   - Added preview configuration with PORT support
   - Configured server to bind to `0.0.0.0`

3. **Server.js**:
   - Custom Node.js server using `serve` package
   - Proper PORT environment variable handling
   - Binds to `0.0.0.0` for external access

## Testing Locally

To test the production build locally:

```bash
npm run build
npm start
```

The server should start on port 3000 and be accessible externally.

## Troubleshooting

If you still get port binding issues:

1. Make sure you're using the updated `render.yaml`
2. Check that the build command completes successfully
3. Verify that the `dist` folder is created after build
4. Ensure the start command is using the correct script

The deployment should now work correctly on Render!
