# AZ Türk TV v1.2

A free static live TV player for Azerbaijani and Turkish public TV sources.

## What changed in v1.2

The previous Azerbaijan HLS streams were not reliable in-browser. This version adds a new:

```text
Azərbaycan · YouTube Live
```

source using YouTube live embeds for Azerbaijani channels where possible.

The combined mode now uses:

```text
Azərbaycan · YouTube Live
Türkiyə · IPTV-org
Türk dili · IPTV-org
```

## What it does

- Plays Turkish IPTV-org HLS streams via hls.js
- Plays Azerbaijani YouTube live/channel embeds where available
- Keeps Azerbaijan HLS test streams as a separate source
- Supports:
  - Azerbaijan + Turkiye combined mode
  - Azerbaijan · YouTube Live
  - Azerbaijan · IPTV/HLS Test
  - Azerbaijan · IPTV-org
  - Turkiye · IPTV-org
  - Azerbaijani-language · IPTV-org
  - Turkish-language · IPTV-org
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

- AZTV official YouTube channel
- İctimai TV official YouTube channel
- CBC TV Azerbaijan official YouTube channel
- Baku TV YouTube live/channel source
- CBC Sport LIVE YouTube channel
- IPTV-org playlists
- hls.js

## Notes

YouTube live embeds are more browser-friendly than random `.m3u8` links, but they still depend on the channel having an active live stream and allowing embeds.

The app is designed for public/free streams only. It does not include pay-TV, pirated sports streams, or protected content.
