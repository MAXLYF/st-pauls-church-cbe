# St. Paul's Church — Rathinapuri, Coimbatore

A modern parish website starter built with:

- Next.js + TypeScript
- Tailwind CSS
- Firebase (Auth / Firestore / Storage)
- Leaflet + OpenStreetMap
- Cloudinary-ready media architecture
- Responsive mobile-first design

## 1. Install

```bash
npm install
npm run dev
```

Open http://localhost:3000

## 2. Firebase

Create a Firebase Web App and copy the values into `.env.local` using `.env.example`.

Recommended Firestore collections:

- `massTimings`
- `events`
- `announcements`
- `news`
- `gallery`
- `videos`
- `prayerRequests`
- `ministries`
- `sacraments`
- `clergy`
- `settings`

Enable Firebase Authentication for admin users. Add Firestore and Storage security rules before production.

## 3. Media

The starter uses the supplied parish images in `public/images`.

For production media:
- Firebase Storage is simplest if you want one Firebase-only stack.
- Cloudinary is recommended for a large photo/video library and automatic transformations.

## 4. Map

The map currently uses a starter coordinate near the Rathinapuri/Tatabad area. **Verify the exact church coordinates before deployment.**

## 5. Important content to replace

The following are intentionally placeholders because verified parish data was not supplied:

- Actual Sunday/weekday Mass timings
- Parish priest and assistant priest names/bios
- Parish phone/email
- Exact church map coordinates
- Official YouTube channel/live URL
- Event dates and announcements
- Sacrament requirements
- Ministry coordinators

## 6. Production roadmap

1. Firebase Auth-protected admin route
2. Firestore CRUD for all editable content
3. Cloudinary/Firebase media uploader
4. YouTube live integration
5. Private prayer-request workflow
6. Tamil/English language switch
7. SEO + sitemap + OpenGraph
8. Deployment on Vercel

