GYMQUEST PWA

This package is a Progressive Web App (PWA), installable from Android Chrome after it is hosted on an HTTPS website.

FILES
- index.html: GymQuest app
- manifest.webmanifest: install metadata
- sw.js: offline caching
- icons/: app icons

ANDROID INSTALL
1. Host this folder on an HTTPS static host (for example GitHub Pages).
2. Open the hosted site in Chrome on Android.
3. Open Chrome's three-dot menu and choose Install app (or Add to Home screen).
4. Launch GymQuest from the new home-screen icon.

NOTE
This is a PWA, not an APK. It does not need an app-store account to install privately, but it must be hosted over HTTPS. Workout data is stored in the browser/device and does not sync across devices.
