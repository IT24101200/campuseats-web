# CampusEats Web — SE3090 Lab 11

A minimal React + Vite frontend for the DevOps and Cloud Hosting lab. It includes a sample food menu, search, category filters, and a demo basket.

## Run locally

```bash
npm install
npm run dev
```

## Create a production build

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Environment variable

Create a local `.env` file based on `.env.example` and set `VITE_API_URL` to your backend's HTTPS URL after the backend is deployed. Do not commit `.env` or secret values. Vite environment variables are included at build time, so redeploy after changing the Vercel variable.

This starter currently uses sample menu data in the frontend; the backend and PostgreSQL database are not implemented or connected yet.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel choose **Add New → Project**, import the repository.
3. Framework preset: **Vite**; Build command: `npm run build`; Output directory: `dist`.
4. Add `VITE_API_URL` under Environment Variables. If the backend is not deployed yet, use a temporary placeholder and replace it later.
5. Click **Deploy** and open the live URL.
