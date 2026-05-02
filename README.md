# AZ Türk TV

A free static live TV player for Azerbaijani and Turkish public IPTV streams.

## What it does

- Loads public IPTV playlists
- Plays HLS / M3U8 streams in the browser
- Uses hls.js for browsers that do not support HLS natively
- Supports:
  - Azerbaijan · Reliable curated HTTPS list
  - Azerbaijan country playlist from IPTV-org
  - Turkiye country playlist from IPTV-org
  - Azerbaijani-language playlist from IPTV-org
  - Turkish-language playlist from IPTV-org
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

This app uses public/open stream sources:

- Azerbaijan reliable replacement streams referenced in IPTV-org issue #18880
- Azerbaijan country playlist: https://iptv-org.github.io/iptv/countries/az.m3u
- Turkiye country playlist: https://iptv-org.github.io/iptv/countries/tr.m3u
- Azerbaijani language playlist: https://iptv-org.github.io/iptv/languages/aze.m3u
- Turkish language playlist: https://iptv-org.github.io/iptv/languages/tur.m3u
- hls.js: https://github.com/video-dev/hls.js/

## Important note

The Azerbaijan source in IPTV-org can be unreliable. v1.1 adds a separate `Azərbaycan · Reliable` source using a small curated HTTPS list.

Only HTTPS HLS streams are included in the reliable list because GitHub Pages is HTTPS. Plain HTTP streams may be blocked by browsers as mixed content.

## Project structure

```text
az-turk-tv/
  index.html
  style-v1-1.css
  app-v1-1.js
  README.md
  icon.svg
  manifest.json
  service-worker.js
```

## Deploy on GitHub Pages

1. Upload all files to the root of your `az-turk-tv` repository.
2. Commit the changes.
3. Wait for GitHub Pages to redeploy.
4. Hard refresh once.

## Notes

Live TV is less reliable than radio. Some channels may not play because of geo-blocking, CORS restrictions, dead URLs, stream format issues, or channels changing their URLs.

The app is designed for public/free streams only. It does not include pay-TV, pirated sports streams, or protected content.
