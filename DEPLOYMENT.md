# Deployment Guide — Quiz Application

## Architecture
- **Backend**: Spring Boot 3.2 + MongoDB (deployed as Docker container)
- **Frontend**: React + Vite (deployed as static site)
- **Database**: MongoDB Atlas (free M0 cluster)

---

## Step 1: Set Up MongoDB Atlas (Free)

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account.
2. Create a **free M0 cluster**.
3. Under **Database Access**, create a database user (username/password).
4. Under **Network Access**, add `0.0.0.0/0` to allow connections from anywhere.
5. Click **Connect → Drivers** and copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/quizdb?retryWrites=true&w=majority
   ```

---

## Step 2: Deploy on Render (Free)

### Option A: Blueprint (Recommended)
1. Push this repo to GitHub.
2. Go to [https://render.com](https://render.com) → **New** → **Blueprint**.
3. Connect your GitHub repo (`Adarsh0864/quiz-application`).
4. Render will detect `render.yaml` and create both services.
5. Set the `MONGODB_URI` environment variable in the backend service to your Atlas connection string.
6. After both services deploy, update the URLs:
   - In **quiz-backend** → set `CORS_ALLOWED_ORIGINS` to your frontend URL.
   - In **quiz-frontend** → set `VITE_API_URL` to `https://<your-backend>.onrender.com/api`.

### Option B: Manual Setup

#### Deploy Backend
1. Go to [https://render.com](https://render.com) → **New** → **Web Service**.
2. Connect your GitHub repo.
3. Settings:
   - **Name**: `quiz-backend`
   - **Runtime**: Docker
   - **Dockerfile Path**: `./Dockerfile`
   - **Plan**: Free
4. Add environment variables:
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `PORT` = `8080`
   - `CORS_ALLOWED_ORIGINS` = `https://quiz-frontend-xxxx.onrender.com` (update after frontend deploys)
5. Click **Deploy**.

#### Deploy Frontend
1. Go to **New** → **Static Site**.
2. Connect the same GitHub repo.
3. Settings:
   - **Name**: `quiz-frontend`
   - **Build Command**: `cd quiz-frontend && npm install && npm run build`
   - **Publish Directory**: `quiz-frontend/dist`
4. Add environment variable:
   - `VITE_API_URL` = `https://quiz-backend-xxxx.onrender.com/api`
5. Add a **Rewrite Rule**: `/*` → `/index.html` (for client-side routing).
6. Click **Deploy**.

---

## Step 3: Verify

1. Visit your frontend URL: `https://quiz-frontend-xxxx.onrender.com`
2. Create a quiz, take a quiz, and check the leaderboard.
3. API docs available at: `https://quiz-backend-xxxx.onrender.com/swagger-ui.html`

---

## Local Development

```bash
# Backend (requires MongoDB running locally)
./mvnw spring-boot:run

# Frontend
cd quiz-frontend && npm run dev
```

The Vite dev server proxies `/api` requests to `localhost:8080` automatically.
