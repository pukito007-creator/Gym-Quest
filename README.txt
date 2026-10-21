GYMQUEST — GITHUB PAGES / ANDROID INSTALL
Upload the CONTENTS of this folder to the root of your GitHub repository, not the ZIP itself:
index.html, manifest.webmanifest, sw.js, and icons/icon-192.png + icons/icon-512.png.
Then repository Settings > Pages > Deploy from a branch > main > /(root) > Save.
Wait for deployment. Open the published https://YOURNAME.github.io/REPOSITORY/ URL in Chrome on Android (not the GitHub repository page or an in-app browser). Use Chrome menu > Install app or Add to Home screen.
The site must be HTTPS. If install is not offered, refresh after deployment and check that /manifest.webmanifest and /sw.js are accessible. This is a PWA, not an APK.
