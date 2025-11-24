# Deploying to Windows Server (IIS)

This guide explains how to deploy the React application to a Windows Server using IIS.

## Prerequisites

1.  **Windows Server** with **IIS** installed.
2.  **IIS URL Rewrite Module** installed. [Download here](https://www.iis.net/downloads/microsoft/url-rewrite).
3.  **Node.js** installed on the build machine (local or CI/CD).

## Steps

### 1. Prepare the Application

Ensure the `web.config` file exists in the `public` folder. This file handles client-side routing.

### 2. Build the Project

Run the build command to generate the static files:

```bash
npm run build
```

This will create a `build` folder in the project root containing:
- `index.html`
- `assets/` (JavaScript and CSS)
- `web.config` (copied from `public/`)

### 3. Deploy to IIS

1.  **Copy Files**: Copy the entire contents of the `build` folder to your server (e.g., `C:\inetpub\wwwroot\my-app`).
2.  **Create Website**:
    - Open **IIS Manager**.
    - Right-click **Sites** -> **Add Website**.
    - **Site name**: `MyReactApp`.
    - **Physical path**: Point to the folder where you copied the files (e.g., `C:\inetpub\wwwroot\my-app`).
    - **Port**: Choose a port (e.g., 80 or 8080).
3.  **Verify**: Open a browser and navigate to `http://localhost:8080` (or your server's IP).

## Troubleshooting

-   **404 on Refresh**: Ensure the URL Rewrite module is installed and the `web.config` is present in the site root.
-   **MIME Types**: If styles or scripts don't load, ensure Static Content is enabled in IIS features.
-   **HTTP 500.19 - Access Denied (0x80070005)**:
    -   **Cause**: IIS does not have permission to read files in your user profile (e.g., `Downloads` or `Desktop`).
    -   **Fix 1 (Recommended)**: Move the `build` folder to `C:\inetpub\wwwroot\my-app`.
    -   **Fix 2**: Grant `Read` permission to the `IIS_IUSRS` group on the `build` folder.
        -   Right-click `build` folder -> Properties -> Security -> Edit -> Add -> Enter `IIS_IUSRS` -> Check `Read` -> OK.
-   **HTTP 403.14 - Forbidden**:
    -   **Cause**: IIS cannot find the `index.html` file in the site's physical path, or `index.html` is not listed in "Default Document".
    -   **Fix 1**: Check that `index.html` exists directly inside `C:\inetpub\wwwroot\Card List` (not in a subfolder like `build`).
    -   **Fix 2**: Open IIS Manager -> Select Site -> **Default Document** -> Ensure `index.html` is in the list and at the top.
-   **Config Error / MIME Types Error**:
    -   **Cause**: The `web.config` contains sections that IIS doesn't understand (missing URL Rewrite module) or duplicate settings.
    -   **Fix 1**: **Install URL Rewrite Module**. This is REQUIRED. [Download here](https://www.iis.net/downloads/microsoft/url-rewrite).
    -   **Fix 2**: If you see an error opening "MIME Types", use the simplified `web.config` (I have updated it in the project).
