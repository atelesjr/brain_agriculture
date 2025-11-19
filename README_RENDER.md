# Deploying the fake API to Render

This file describes how to deploy the project's json-server-based API to Render using the `feat/api-fake-render` branch.

Quick summary
- Service: Web Service (Node)
- Branch: `feat/api-fake-render`
- Start command: `json-server --watch server/db.json --host 0.0.0.0 --port $PORT`

Steps (UI)
1. New -> Web Service in Render.
2. Connect GitHub and choose repository `atelesjr/brain_agriculture`.
3. Choose branch: `feat/api-fake-render`.
4. Name the service (e.g. `brain-agriculture-api`).
5. Environment: `Node`.
6. Build Command: `npm ci` (or leave empty; Render will install deps).
7. Start Command: `json-server --watch server/db.json --host 0.0.0.0 --port $PORT`.
8. Health check path: `/producers` (optional).
9. Create service and wait for deploy.

Notes
- The repository contains the dataset at `server/db.json`. The start command points json-server to that path.
- json-server allows read/write via REST but changes are stored in the running container and are ephemeral: redeploys will restore the original `server/db.json` from the repository.
- If you need durable writes, migrate to a proper database (Postgres, etc.).

render.yaml and Dockerfile
- This branch already contains `render.yaml` (in repo root) so you can re-create the service from the repo spec if you prefer infra-as-code.
- A `Dockerfile` is also included for container-based deploys.

Testing locally (simulate Render)
```powershell
# set PORT and start
$env:PORT=10000
npx json-server --watch server/db.json --host 0.0.0.0 --port $env:PORT

# then test
curl http://localhost:10000/producers
```

Vercel frontend
- In the Vercel project settings add the environment variable `VITE_API_URL` with the Render service base URL (e.g. `https://your-service.onrender.com`). Then redeploy the frontend so Vite picks the env var at build time.
# Deploy json-server to Render / Railway (quick guide)

This project contains a `server/db.json` file used by `json-server` for development. To provide a writable REST API for the public demo (so Vercel can call POST/PUT/DELETE), you can deploy `json-server` to a cloud host like Render, Railway or Fly.

Files added:
- `Dockerfile` — runs `json-server` in a small Node image.
- `Procfile` — alternative start command for platforms that use Procfile.

Quick deploy steps (Render)
1. Sign up / sign in to Render (https://render.com).
2. Create a new Web Service and connect your GitHub repository.
3. Select branch `main` and choose "Docker" as the environment (Render will use the `Dockerfile`).
4. Set build and run commands (Render typically detects the Dockerfile automatically).
5. Deploy. When ready you'll have a URL like `https://my-json-server.onrender.com`.

Railway (GitHub deploy)
1. Sign in to Railway (https://railway.app) and create a new project.
2. Connect your GitHub repo and choose the `main` branch.
3. Railway will detect the repository and can use the `Dockerfile` to build the service.

Notes about persistence and production
- Many free hosting tiers do not provide persistent disk storage. If the host restarts or you'll need durable storage, prefer a managed DB (Supabase, PlanetScale, PostgreSQL) or configure persistent volumes if the provider supports them.
- `json-server` is suitable for demos and prototypes, not for production-grade systems.

Configure Vercel to use the new backend
1. In your Vercel project, go to `Settings -> Environment Variables`.
2. Add an environment variable:
   - Key: `VITE_API_URL`
   - Value: `https://my-json-server.onrender.com` (replace with your service URL)
   - Scope: `Production` and `Preview` as needed
3. Redeploy your Vercel project (or trigger a redeploy) so the front-end builds with the new env value.

Verify CRUD
- GET: `https://my-json-server.onrender.com/producers`
- POST: `https://my-json-server.onrender.com/producers` (body JSON)
- PUT/DELETE likewise for `https://my-json-server.onrender.com/producers/:id`

Security and CORS
- json-server enables CORS by default; if you use a custom host or proxy, make sure the CORS headers allow calls from your Vercel domain.

If you want, I can:
- Create a small `render.yaml` for Render's Infrastructure as Code path.
- Prepare a short PR with a `deploy.md` containing screenshots and exact Render UI steps.
