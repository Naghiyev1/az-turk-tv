# AZ Türk TV

A free static live TV player for Azerbaijani and Turkish public IPTV streams.

## What it does

- Loads public IPTV playlists
- Plays HLS / M3U8 streams in the browser
- Uses hls.js for browsers that do not support HLS natively
- Supports:
  - Azerbaijan country playlist
  - Turkiye country playlist
  - Azerbaijani-language playlist
  - Turkish-language playlist
  - Combined Azerbaijan + Turkiye mode
- Includes search
- Includes filters
- Saves favourites locally in the browser
- Saves recently watched channels locally in the browser
- Includes cinema mode
- Includes PWA support
- Runs on GitHub Pages
- No backend
- No login
- No paid services

## Sources

This app uses public/open IPTV-org playlist sources:

- Azerbaijan country playlist: https://iptv-org.github.io/iptv/countries/az.m3u
- Turkiye country playlist: https://iptv-org.github.io/iptv/countries/tr.m3u
- Azerbaijani language playlist: https://iptv-org.github.io/iptv/languages/aze.m3u
- Turkish language playlist: https://iptv-org.github.io/iptv/languages/tur.m3u
- hls.js: https://github.com/video-dev/hls.js/

## Project structure

```text
az-turk-tv/
  index.html
  style-v1.css
  app-v1.js
  README.md
  icon.svg
  manifest.json
  service-worker.js
```

## Deploy on GitHub Pages

1. Create a public GitHub repository called `az-turk-tv`.
2. Upload all files to the root of the repository.
3. Go to **Settings**.
4. Go to **Pages**.
5. Select:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/root`
6. Save.

Your app will be available at:

```text
https://yourusername.github.io/az-turk-tv/
```

## Notes

Live TV is less reliable than radio. Some channels may not play because of geo-blocking, CORS restrictions, dead URLs, stream format issues, or channels changing their URLs.

The app is designed for public/free streams only. It does not include pay-TV, pirated sports streams, or protected content.
