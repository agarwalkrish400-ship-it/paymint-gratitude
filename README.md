# PAYMINT: THE PEOPLE BEHIND THE PROGRESS

> *"Every big idea starts with someone who believes in it before the world does."*

A personalized, interactive gratitude gift experience created by **Krish (Founder, Paymint)** for the 12 pre-beta testers who gave their time, feedback, and early belief to help build Paymint.

---

## 🎁 The 12 Personalized Experiences

Each recipient has a unique, private URL and a custom interactive digital gift experience tailored to them:

| # | Recipient | Unique Route | Interactive Gift Concept |
|---|---|---|---|
| 01 | **Henil Mistry** | `/thanks/henil-mistry` | **THE FIRST BELIEVERS CLUB** — Holographic 3D tilt membership card (`PAYMINT EARLY CREW`) |
| 02 | **Medhaavi Sharma** | `/thanks/medhaavi-sharma` | **A LETTER THAT GLOWS** — Handwritten liquid-ink illuminated letter with glowing reveal |
| 03 | **Vivek Prajapati** | `/thanks/vivek-prajapati` | **THE IMPACT TIMELINE** — Interactive milestone journey: *IDEA → BUILD → TEST → LEARN → IMPROVE* |
| 04 | **Shubham Sawant** | `/thanks/shubham-sawant` | **THE PIXEL THANK-YOU** — Retro arcade mini-game collecting 5 decorative mint sparks to unlock letter |
| 05 | **Rudra Utekar** | `/thanks/rudra-utekar` | **THE BUILDER'S BADGE** — Futuristic cybernetic badge with build telemetry & cryptographic hash |
| 06 | **Samyak Kanani** | `/thanks/samyak-kanani` | **THE GRATITUDE CONSTELLATION** — Deep midnight interactive constellation connecting 5 glowing stars |
| 07 | **Ayush Khadakban** | `/thanks/ayush-khadakban` | **THE FUTURE VAULT** — Biometric-style vault opening 3 digital keepsakes (Gratitude, Snapshot, Promise) |
| 08 | **Rushabh Kewat** | `/thanks/rushabh-kewat` | **THE HUMAN SIDE OF BUILDING** — Grounded reflection with interactive *"One thing worth remembering"* card |
| 09 | **Humera Mansoori** | `/thanks/humera-mansoori` | **THE BLOOMING IDEA** — Procedural luminous light blossom revealing *TIME. TRUST. FEEDBACK. GROWTH.* |
| 10 | **Dharak Dave** | `/thanks/dharak-dave` | **THE MISSION PATCH** — Pre-Beta Crew patch with interactive 4-stage mission telemetry log |
| 11 | **Pehr Desai** | `/thanks/pehr-desai` | **THE TIME CAPSULE** — Sealed keepsake envelope unlocking early memories & permanent celebration |
| 12 | **Kavya Shah** | `/thanks/kavya-shah` | **THE FINAL REVEAL** — Layered 3D gift box with ribbon reveal & interactive *"One last thing..."* note |

---

## 🛠️ Tech Stack & Polish Highlights

- **Vite + React 18**: Instant loading, responsive layout on any mobile or desktop screen.
- **Procedural Canvas Particle Engine**: 60 FPS floating mint embers with gentle depth effects.
- **Web Audio API Synthesizer**: Zero external audio assets needed; crystal-clear pentatonic chimes that respect browser autoplay policies and user mute preferences.
- **Accessibility & Privacy**: Full support for `prefers-reduced-motion: reduce`, `X-Robots-Tag: noindex, nofollow`, and isolated routes that never expose an admin directory to individual recipients.
- **Replay & Share**: Instant in-memory replay (`↺ Replay my gift`) and native Web Share API with clipboard fallback.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build & preview production bundle
npm run build
npm run preview
```

---

## ☁️ Deploying to Vercel

This project includes a pre-configured `vercel.json` with SPA routing rewrites and privacy headers.

### Option 1: Vercel CLI
```bash
npx vercel
```

### Option 2: Push to GitHub & Import in Vercel
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "feat: Paymint pre-beta tester gratitude gift experience"
   ```
2. Create a new GitHub repository and push.
3. Import the repository in [Vercel](https://vercel.com/new).
4. Vercel will automatically detect **Vite** and deploy!

All 12 URLs will immediately be live under your Vercel domain (e.g., `https://<your-project>.vercel.app/thanks/<slug>`).
