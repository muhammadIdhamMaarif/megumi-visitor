## 1. Prerequisites

To build and run this project with Docker, you need:

- [Docker](https://www.docker.com/) installed (Docker Desktop or Docker Engine)
- (Optional) `npm` / Node.js if you want to run it locally without Docker

---

## 2. Project structure (example)

Your project should roughly look like this:

```text
.
├─ src/
│  ├─ components/
│  ├─ main.tsx / main.jsx
│  └─ ...
├─ public/
├─ package.json
├─ package-lock.json / yarn.lock / pnpm-lock.yaml
├─ Dockerfile
└─ README.md
````

The important part is that:

- There is a `package.json` with a **build script**, e.g.:

  ```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
  ```

- Running `npm run build` in the project root generates a production build into **`dist/`**.

> ⚠️ If your build output folder is `build/` (e.g. Create React App), you’ll need to change one line in the Dockerfile. See [Section 6](#6-if-your-build-output-is-not-dist).

---

## 3. Build the Docker image

From the project root (where `Dockerfile` is located), run:

```bash
docker build -t mgm-lab-visitor .
```

Explanation:

- `-t mgm-lab-visitor` gives the image a name (`mgm-lab-visitor`).
- `.` tells Docker to use the current directory as the build context.

During this step:

1. Docker installs dependencies in the **builder** stage.
2. `npm run build` runs and produces a production bundle in `dist/`.
3. The final image is based on Nginx and only contains the built static files.

---

## 4. Run the container

Once the image is built, run:

```bash
docker run --rm -p 8080:80 mgm-lab-visitor
```

Explanation:

- `--rm` removes the container automatically when it stops.
- `-p 8080:80` maps your local port **8080** to the container’s port **80**.
- `mgm-lab-visitor` is the image name you built earlier.

Now open your browser and go to:

```text
http://localhost:8080
```

You should see the **MGM Lab Visitor** form with:

- The logo
- The badge “MGM Lab Visitor”
- The heading “Visitor Form”
- The text “Harap isi data dibawah untuk menggunakan lab MGM”

---

## 5. Environment variables (optional)

If your app uses environment variables (for example, API base URLs), they’re typically defined in:

- `.env` / `.env.production` (for Vite, CRA, Next, etc.)
- Or directly in your `vite.config`, etc.

Docker build will pick up anything inside the build context, so if you have a `.env.production`, it will be used during `npm run build`.

To change any build-time values:

1. Update your `.env` / `.env.production` file.

2. Rebuild the image:

   ```bash
   docker build -t mgm-lab-visitor .
   ```

3. Run the container again.

> Note: For typical static React/Vite apps, environment variables are baked into the build. Changing them at runtime without rebuilding isn’t supported unless you add a custom config mechanism.

---

## 6. If your build output is NOT `dist/`

### Case A – Output folder is `build/` (Create React App)

If `npm run build` creates a folder named `build/` instead of `dist/`, modify this line in the `Dockerfile`:

```dockerfile
COPY --from=builder /app/dist /usr/share/nginx/html
```

Change it to:

```dockerfile
COPY --from=builder /app/build /usr/share/nginx/html
```

Then rebuild:

```bash
docker build -t mgm-lab-visitor .
docker run --rm -p 8080:80 mgm-lab-visitor
```

### Case B – Different build script

If your build script has another name (e.g. `"build": "react-scripts build"` etc.), as long as it’s called `build` inside `package.json`, you don’t need to change anything. The Dockerfile uses:

```dockerfile
RUN npm run build
```

which maps to the `"build"` script in `package.json`.

---

## 7. Development vs Production

- **Development (without Docker)**

  ```bash
  npm install
  npm run dev
  ```

  Then open the URL shown in the terminal (usually `http://localhost:5173` for Vite).

- **Production (with Docker)**

  Use the commands described above:

  ```bash
  docker build -t mgm-lab-visitor .
  docker run --rm -p 8080:80 mgm-lab-visitor
  ```

---

## 8. Troubleshooting

### `npm ci` fails in Docker build

If your project doesn’t have `package-lock.json` (or you prefer `npm install`), the Dockerfile already falls back to `npm install`:

```dockerfile
RUN npm ci --omit=dev=false || npm install
```

So it should still work. If not, you can simplify that line to:

```dockerfile
RUN npm install
```

### White screen or error in the browser

- Check container logs:

  ```bash
  docker logs <container-id>
  ```

- Make sure `npm run build` works **locally** before building the Docker image:

  ```bash
  npm install
  npm run build
  ```

If it fails locally, fix any build errors first.

---

## 9. Summary

- `Dockerfile` builds your React/Vite app and serves it with Nginx.
- `docker build -t mgm-lab-visitor .` creates the image.
- `docker run --rm -p 8080:80 mgm-lab-visitor` runs the container and serves your MGM Lab Visitor form.

Feel free to rename `mgm-lab-visitor` to any image name that fits your project.

```

If you paste your current folder structure / `package.json`, I can tweak the Dockerfile and README so they match your setup exactly (Vite vs CRA, TypeScript vs JS, etc.).
```
