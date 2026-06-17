# 🏆 DNA Sportswear — Website

A custom sports teamwear website built with HTML, Tailwind CSS, and vanilla JavaScript.
Inspired by the look and feel of DNA Sports. Deployable to GitHub Pages in minutes.

---

## 📁 Project Structure

```
akuma-sports/
│
├── index.html          ← Homepage
├── about.html          ← About Us page
├── contact.html        ← Contact / Enquiry form  (coming next)
├── news.html           ← News / Blog             (coming next)
│
├── css/
│   └── styles.css      ← All custom styles + brand tokens (colours, fonts)
│
├── js/
│   └── main.js         ← Nav, scroll effects, traffic tracker, form handler
│
├── images/             ← Put your own photos here
│
├── admin/
│   └── dashboard.html  ← Traffic & enquiry monitoring dashboard
│
├── .github/
│   └── workflows/
│       └── deploy.yml  ← Auto-deploy to GitHub Pages on every push
│
└── README.md           ← This file
```

---

## 🚀 Deploy to GitHub Pages (Step by Step)

### Step 1 — Create a GitHub repo
1. Go to https://github.com/new
2. Name it e.g. `yourbrand-sports` (or anything you like)
3. Set it to **Public** (required for free GitHub Pages)
4. Do NOT initialise with README (you'll push your own)
5. Click **Create repository**

### Step 2 — Push your code
Open a terminal in VS Code (`Ctrl + `` ` ``) and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

> Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub details.

### Step 3 — Enable GitHub Pages
1. Go to your repo on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Branch: `main`, Folder: `/ (root)`
5. Click **Save**
6. Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

### Step 4 — Custom domain (optional)
If you have a domain (e.g. from Afrihost, Hetzner, etc.):
1. In your repo, go to **Settings → Pages → Custom domain**
2. Enter your domain (e.g. `yourbrand.co.za`)
3. At your domain registrar, add a CNAME record pointing to `YOUR-USERNAME.github.io`
4. Tick "Enforce HTTPS"

---

## ✏️ How to Edit the Site

### Change brand name / logo
Search for `YOUR<span>BRAND</span>` in every HTML file and replace with your real name.
e.g. `APEX<span>KIT</span>` or just `APEX<span>SPORTS</span>`

### Change colours
Open `css/styles.css` and edit the `:root` section at the top:

```css
:root {
  --color-red:  #e8132a;   /* ← change this for a different accent colour */
  --color-dark: #111111;
  ...
}
```

### Change fonts
The site uses **Barlow Condensed** (headings) and **Barlow** (body) from Google Fonts.
To change fonts, update the Google Fonts `<link>` tag in each HTML file's `<head>`,
then update the `:root` variables in `styles.css`:
```css
--font-display: 'Your New Display Font', sans-serif;
--font-body:    'Your New Body Font', sans-serif;
```

### Add/edit nav links
Every page has a `<nav>` section. Update both the **desktop** nav and the **mobile menu**
(the `#mobile-menu` div) to keep them in sync.

### Add images
1. Put your photos in the `images/` folder
2. Replace the Unsplash URLs in `index.html` with local paths:
   ```html
   <img src="images/rugby.jpg" alt="Rugby teamwear" />
   ```
3. Recommended: 1200×1600px for sport cards, 1600×900px for hero background photos

### Contact form — receive emails
The form is wired up in `js/main.js`. To actually receive emails, pick one option:

**Option A — Formspree (free, easiest):**
1. Sign up at https://formspree.io
2. Create a form, get your Form ID (e.g. `xpwqabcd`)
3. In `js/main.js`, uncomment and update this block:
   ```js
   fetch('https://formspree.io/f/YOUR_FORM_ID', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(data),
   });
   ```

**Option B — EmailJS (free tier, no backend needed):**
1. Sign up at https://emailjs.com
2. Follow their setup guide for vanilla JS

---

## 📊 Admin Dashboard

URL: `/admin/dashboard.html`

Default password: **`admin2026`**

**To change the password:**
Open `admin/dashboard.html` and find:
```js
const ADMIN_PASSWORD = 'admin2026';
```
Replace `admin2026` with whatever you want.

**What it tracks:**
- Total page views + views today + last 30 days
- A 14-day bar chart of daily traffic
- All enquiries from the contact form (name, email, sport, message)
- Top pages by view count
- Recent visit log (last 20 visits)
- Export enquiries as CSV

**How it works:**
Traffic and enquiry data is stored in the browser's `localStorage`.
This means data is per-device — it's a lightweight solution for a small site.
For multi-device analytics, consider adding Google Analytics (free) alongside this.

**Add Google Analytics (optional but recommended):**
1. Go to https://analytics.google.com
2. Create a property, get your Measurement ID (e.g. `G-XXXXXXXXXX`)
3. Add this before `</head>` in every HTML file:
   ```html
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```

---

## 📄 Pages Included So Far

| Page | File | Status |
|------|------|--------|
| Homepage | `index.html` | ✅ Done |
| About | `about.html` | ✅ Done |
| Contact | `contact.html` | 🔜 Next |
| News/Blog | `news.html` | 🔜 Next |
| Sports listing | `sports.html` | 🔜 Next |
| Admin dashboard | `admin/dashboard.html` | ✅ Done |

---

## 🛠 Tech Stack

| Tool | What it does |
|------|-------------|
| HTML5 | Page structure |
| Tailwind CSS (CDN) | Utility classes for layout |
| CSS custom properties | Brand tokens (colours, fonts) |
| Vanilla JavaScript | Nav, animations, tracker, form |
| Google Fonts | Barlow Condensed + Barlow |
| Font Awesome | Icons |
| localStorage | Client-side analytics store |
| GitHub Pages | Free static hosting |

No build tools, no Node.js, no frameworks — just open in VS Code and edit.

---

## 💡 Tips

- Use **Live Server** extension in VS Code to preview changes instantly
- Images from [Unsplash](https://unsplash.com) are free for commercial use (always double-check the licence)
- Keep all placeholder text in `[square brackets]` so it's easy to find and replace
- Every `<!-- EDIT: -->` comment in the HTML marks something you should personalise

---

Built for deployment on GitHub Pages. No server required.
