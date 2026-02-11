# Readme.md
## Project Overview

A zero-downtime deployment demonstration project showcasing blue-green and canary deployment strategies using Express.js backends with Nginx load balancing.

## Architecture

The system runs two parallel Express.js backend versions behind an Nginx reverse proxy:

- **app-v1** (port 3001): Blue/stable version
- **app-v2** (port 3002): Green/new version
- **Nginx**: Load balancer with weighted traffic routing (configurable for canary releases)
- **Frontend**: Test page that polls `/version` endpoint every second to verify zero-downtime

Traffic weight is controlled via `Backend/proxy/nginx.conf` upstream configuration.

## Commands

### Start Servers

```powershell
# Start v1 (from Backend directory)
node apps/app-v1/server.js

# Start v2 (from Backend directory)  
node apps/app-v2/server.js
```

Or using npm:
```powershell
cd Backend/apps/app-v1 && npm start
cd Backend/apps/app-v2 && npm start
```

### Deployment Scripts

From the `Backend` directory:

```powershell
# Blue-green deployment (Windows)
.\deployment\blue-green.ps1

# Blue-green deployment (Unix)
./deployment/blue-green.sh

# Canary deployment (Unix)
./deployment/canary.sh

# Rollback to v1 (Unix)
./deployment/rollback.sh
```

### Install Dependencies

```powershell
cd Backend/apps/app-v1 && npm install
cd Backend/apps/app-v2 && npm install
```

## Key Patterns

### Graceful Shutdown
Both server versions implement graceful shutdown handlers for `SIGTERM` and `SIGINT` signals with a 10-second force-exit timeout. When adding new routes or modifying servers, preserve this shutdown behavior.

### Version Endpoint
Each server exposes `GET /version` returning `{ version: "vX" }`. The frontend relies on this endpoint for deployment verification.

### Traffic Weighting
Nginx config uses weighted upstream servers for canary releases. Default is 90% v1, 10% v2. Modify weights in `Backend/proxy/nginx.conf` to adjust traffic distribution.
