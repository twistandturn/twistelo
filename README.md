# Twistelo Store

Structure: `index.html` (store) · `admin/index.html` (admin panel, URL: /admin/) · `app.js`, `style.css`, `data.js`, `seed.js`, `config.js`, `firestore.rules`

## Setup
1. console.firebase.google.com → Add project (free Spark plan).
2. Build → Firestore Database → Create database (production mode).
3. Build → Authentication → Sign-in method → Email/Password → enable. Users tab → Add user (your admin email + password).
4. Project settings → Your apps → Web (</>) → copy the config into `config.js`.
5. Firestore → Rules → paste `firestore.rules` (put your admin email in) → Publish.
6. Authentication → Settings → Authorized domains → add `YOURNAME.github.io` (and your custom domain).
7. Push all files to a GitHub repo → Settings → Pages → Deploy from branch `main` / root.
8. Open `/admin/`, login, press "Save demo data" once, then edit everything from there.

WhatsApp number can be changed in Admin → Settings.
