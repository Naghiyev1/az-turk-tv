const AZERBAIJAN_YOUTUBE_CHANNELS = [
  {
    id: "youtube-aztv",
    name: "AZTV",
    country: "Azerbaijan",
    group: "YouTube Live",
    category: "General",
    tags: "Azerbaijan Official YouTube Live General",
    logo: "",
    youtubeChannelId: "UCVf7OL0jKiO1OMHN_qaNf0w",
    source: "Azərbaycan · YouTube Live"
  },
  {
    id: "youtube-ictimai-tv",
    name: "İctimai TV",
    country: "Azerbaijan",
    group: "YouTube Live",
    category: "General",
    tags: "Azerbaijan Official YouTube Live General News",
    logo: "",
    youtubeChannelId: "UCCYhaH52lUEmfUjX-_OBAHg",
    source: "Azərbaycan · YouTube Live"
  },
  {
    id: "youtube-cbc-azerbaijan",
    name: "CBC TV Azerbaijan",
    country: "Azerbaijan",
    group: "YouTube Live",
    category: "News",
    tags: "Azerbaijan Official YouTube Live CBC News",
    logo: "",
    youtubeChannelId: "UC0tSbzhYGtLtm8V58t-GT4g",
    source: "Azərbaycan · YouTube Live"
  },
  {
    id: "youtube-baku-tv",
    name: "Baku TV",
    country: "Azerbaijan",
    group: "YouTube Live",
    category: "News",
    tags: "Azerbaijan YouTube Live News Baku TV",
    logo: "",
    youtubeChannelId: "UCINwqO8Scgq___xJAVjfn7g",
    source: "Azərbaycan · YouTube Live"
  },
  {
    id: "youtube-cbc-sport-live",
    name: "CBC Sport LIVE",
    country: "Azerbaijan",
    group: "YouTube Live",
    category: "Sports",
    tags: "Azerbaijan YouTube Live Sports CBC Sport",
    logo: "",
    youtubeChannelId: "UCwS4U80zng72tL7cLLYeaAQ",
    source: "Azərbaycan · YouTube Live"
  }
];

const AZERBAIJAN_HLS_TEST_CHANNELS = [
  {
    id: "aznews-socialsmart",
    name: "AZ News",
    country: "Azerbaijan",
    group: "News",
    category: "News",
    tags: "Azerbaijan News HLS Test HTTPS",
    logo: "",
    url: "https://swow1.socialsmart.tv/aznews/smil:aznews.smil/playlist.m3u8",
    source: "Azərbaycan · IPTV/HLS Test"
  },
  {
    id: "cbc-azerbaijan-odtv",
    name: "CBC Azerbaijan",
    country: "Azerbaijan",
    group: "General",
    category: "General",
    tags: "Azerbaijan General CBC HLS Test HTTPS",
    logo: "",
    url: "https://edge02.odtv.az/o1/cbc/playlist.m3u8",
    source: "Azərbaycan · IPTV/HLS Test"
  },
  {
    id: "idman-tv-odtv",
    name: "İdman TV",
    country: "Azerbaijan",
    group: "Sports",
    category: "Sports",
    tags: "Azerbaijan Sports Idman HLS Test HTTPS",
    logo: "",
    url: "https://edge02.odtv.az/o7/idman/playlist.m3u8",
    source: "Azərbaycan · IPTV/HLS Test"
  },
  {
    id: "show-plus-bozztv",
    name: "Show Plus",
    country: "Azerbaijan",
    group: "General",
    category: "General",
    tags: "Azerbaijan General Show Plus HLS Test HTTPS",
    logo: "",
    url: "https://glb.bozztv.com/glb/ssh101/showplus/index.m3u8",
    source: "Azərbaycan · IPTV/HLS Test"
  }
];

const SOURCES = {
  combined: {
    label: "Azərbaycan + Türkiyə",
    type: "combined",
    sources: ["azYoutube", "tr", "tur"]
  },
  azYoutube: {
    label: "Azərbaycan · YouTube Live",
    type: "custom",
    channels: AZERBAIJAN_YOUTUBE_CHANNELS
  },
  azReliable: {
    label: "Azərbaycan · IPTV/HLS Test",
    type: "custom",
    channels: AZERBAIJAN_HLS_TEST_CHANNELS
  },
  az: {
    label: "Azərbaycan · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/az.m3u"
  },
  tr: {
    label: "Türkiyə · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/countries/tr.m3u"
  },
  aze: {
    label: "Azərbaycan dili · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/languages/aze.m3u"
  },
  tur: {
    label: "Türk dili · IPTV-org",
    type: "m3u",
    url: "https://iptv-org.github.io/iptv/languages/tur.m3u"
  }
};

const channelsGrid = document.getElementById("channelsGrid");
const statusText = document.getElementById("statusText");
const activeFilterLabel = document.getElementById("activeFilterLabel");
const searchInput = document.getElementById("searchInput");
const sourceSelect = document.getElementById("sourceSelect");
const searchButton = document.getElementById("searchButton");
const videoPlayer = document.getElementById("videoPlayer");
const youtubePlayer = document.getElementById("youtubePlayer");
const screenFrame = document.querySelector(".screen-frame");
const currentChannel = document.getElementById("currentChannel");
const currentMeta = document.getElementById("currentMeta");
const playerLogo = document.getElementById("playerLogo");
const playerFavoriteButton = document.getElementById("playerFavoriteButton");
const stopButton = document.getElementById("stopButton");
const themeToggle = document.getElementById("themeToggle");
const channelCount = document.getElementById("channelCount");
const favoriteCount = document.getElementById("favoriteCount");
const pills = Array.from(document.querySelectorAll(".pill"));

let channels = [];
let activeFilter = "";
let currentPlayingChannel = null;
let hlsInstance = null;

let favoriteChannels = JSON.parse(localStorage.getItem("azTurkTvFavorites") || "[]");
let recentlyWatchedChannels = JSON.parse(localStorage.getItem("azTurkTvRecent") || "[]");
let favorites = favoriteChannels.map(channel => channel.id);
let cinemaMode = localStorage.getItem("azTurkTvCinema") || "off";

function updateFavoriteCount() {
  favoriteCount.textContent = favorites.length;
}

async function loadChannels() {
  if (activeFilter === "__favorites") {
    renderFavoriteChannels();
    return;
  }

  if (activeFilter === "__recent") {
    renderRecentlyWatchedChannels();
    return;
  }

  const selectedSource = SOURCES[sourceSelect.value];

  if (!selectedSource) {
    statusText.textContent = "Mənbə tapılmadı. Səhifəni yenilə.";
    channelsGrid.innerHTML = `<div class="empty-state">Bu mənbə mövcud deyil.</div>`;
    return;
  }

  statusText.textContent = `${selectedSource.label} kanalları yüklənir...`;
  activeFilterLabel.textContent = selectedSource.label;
  channelsGrid.innerHTML = "";
  channelCount.textContent = "0";

  try {
    const parsedChannels = selectedSource.type === "combined"
      ? await loadCombinedSources(selectedSource.sources)
      : selectedSource.type === "custom"
        ? selectedSource.channels
        : await loadM3USource(selectedSource);

    channels = applyFilters(parsedChannels)
      .filter(channel => channel.url || channel.youtubeChannelId)
      .filter(removeDuplicateStreams)
      .slice(0, 260);

    renderChannels(channels);

    channelCount.textContent = channels.length;
    statusText.textContent = channels.length
      ? `${channels.length} kanal yükləndi`
      : "Kanal tapılmadı. Başqa mənbə və ya filtr yoxla.";
  } catch (error) {
    console.error(error);
    statusText.textContent = "Kanallar yüklənmədi. Public playlist müvəqqəti işləməyə bilər.";
    channelsGrid.innerHTML = `<div class="empty-state">Kanallar yüklənərkən problem oldu.</div>`;
  }
}

async function loadCombinedSources(sourceKeys) {
  const results = await Promise.all(
    sourceKeys.map(key => {
      const source = SOURCES[key];

      if (source?.type === "custom") {
        return Promise.resolve(source.channels || []);
      }

      return loadM3USource(source).catch(error => {
        console.warn(`Source failed: ${source?.label || key}`, error);
        return [];
      });
    })
  );

  return results.flat();
}

async function loadM3USource(source) {
  const response = await fetch(source.url);

  if (!response.ok) {
    throw new Error(`Source failed: ${source.label}`);
  }

  const text = await response.text();
  return parseM3U(text, source.label);
}

function applyFilters(inputChannels) {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const filterTerm = activeFilter.toLowerCase();

  return inputChannels.filter(channel => {
    const haystack = [
      channel.name,
      channel.country,
      channel.group,
      channel.category,
      channel.tags
    ].join(" ").toLowerCase();

    const matchesSearch = !searchTerm || haystack.includes(searchTerm);
    const matchesFilter = !filterTerm || haystack.includes(filterTerm);

    return matchesSearch && matchesFilter;
  });
}

function parseM3U(text, sourceLabel) {
  const lines = text.split(/\r?\n/);
  const parsed = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line.startsWith("#EXTINF")) {
      continue;
    }

    const url = findNextStreamUrl(lines, index + 1);

    if (!url) {
      continue;
    }

    const name = parseM3UName(line);
    const logo = parseAttribute(line, "tvg-logo");
    const country = parseAttribute(line, "tvg-country") || inferCountryFromSource(sourceLabel);
    const group = parseAttribute(line, "group-title") || "Live TV";

    parsed.push({
      id: makeChannelId(name, url),
      name,
      country,
      group,
      category: group,
      tags: `${group} ${sourceLabel}`,
      logo,
      url,
      source: sourceLabel
    });
  }

  return parsed;
}

function findNextStreamUrl(lines, startIndex) {
  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index].trim();

    if (!line || line.startsWith("#")) {
      continue;
    }

    return line;
  }

  return "";
}

function parseM3UName(line) {
  const commaIndex = line.lastIndexOf(",");
  return commaIndex === -1 ? "Unnamed channel" : line.slice(commaIndex + 1).trim() || "Unnamed channel";
}

function parseAttribute(line, attributeName) {
  const regex = new RegExp(`${attributeName}="([^"]*)"`);
  const match = line.match(regex);
  return match ? match[1] : "";
}

function inferCountryFromSource(sourceLabel) {
  if (sourceLabel.includes("Azərbaycan")) {
    return "Azerbaijan";
  }

  if (sourceLabel.includes("Türk") || sourceLabel.includes("Türkiyə")) {
    return "Turkey";
  }

  return "AZ/TR";
}

function removeDuplicateStreams(channel, index, array) {
  const currentKey = channel.youtubeChannelId ? `youtube-${channel.youtubeChannelId}` : channel.url;
  return array.findIndex(item => {
    const itemKey = item.youtubeChannelId ? `youtube-${item.youtubeChannelId}` : item.url;
    return itemKey === currentKey;
  }) === index;
}

function renderChannels(channelsToRender) {
  channelsGrid.innerHTML = "";

  if (!channelsToRender.length) {
    channelsGrid.innerHTML = `<div class="empty-state">Göstəriləcək kanal yoxdur.</div>`;
    return;
  }

  channelsToRender.forEach(channel => {
    const card = document.createElement("article");
    card.className = "channel-card";

    const initials = getInitials(channel.name);
    const isFavorite = favorites.includes(channel.id);

    card.innerHTML = `
      <div class="channel-top">
        <div class="channel-logo-wrap">
          ${channel.logo ? `<img class="channel-logo" src="${escapeHTML(channel.logo)}" alt="" loading="lazy" />` : initials}
        </div>
        <div>
          <div class="channel-name">${escapeHTML(channel.name)}</div>
          <div class="channel-country">${escapeHTML(channel.country || "AZ/TR")}</div>
        </div>
      </div>

      <div class="channel-tags">${escapeHTML(channel.group || channel.category || "Live TV")}</div>

      <div class="channel-actions">
        <button type="button" class="watch-button">İzlə</button>
        <button type="button" class="favorite-button ${isFavorite ? "active" : ""}" aria-label="Favoritə əlavə et">★</button>
      </div>
    `;

    const logo = card.querySelector(".channel-logo");

    if (logo) {
      logo.addEventListener("error", () => {
        logo.parentElement.textContent = initials;
      });
    }

    card.querySelector(".watch-button").addEventListener("click", () => {
      playChannel(channel);
    });

    card.querySelector(".favorite-button").addEventListener("click", event => {
      toggleFavorite(channel.id);
      event.currentTarget.classList.toggle("active");
    });

    channelsGrid.appendChild(card);
  });
}

function playChannel(channel) {
  statusText.textContent = `${channel.name} açılır...`;
  destroyHls();

  if (channel.youtubeChannelId) {
    playYouTubeChannel(channel);
    return;
  }

  screenFrame.classList.remove("youtube-mode");
  youtubePlayer.removeAttribute("src");

  if (window.Hls && Hls.isSupported() && channel.url.includes(".m3u8")) {
    hlsInstance = new Hls({
      enableWorker: true,
      lowLatencyMode: true
    });

    hlsInstance.loadSource(channel.url);
    hlsInstance.attachMedia(videoPlayer);

    hlsInstance.on(Hls.Events.MANIFEST_PARSED, () => {
      startPlayback(channel);
    });

    hlsInstance.on(Hls.Events.ERROR, (_, data) => {
      if (data.fatal) {
        statusText.textContent = "Bu kanal brauzerdə açılmadı. Başqa kanal yoxla.";
        destroyHls();
      }
    });

    return;
  }

  videoPlayer.src = channel.url;
  startPlayback(channel);
}


function playYouTubeChannel(channel) {
  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();

  screenFrame.classList.add("youtube-mode");
  youtubePlayer.src = `https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(channel.youtubeChannelId)}&autoplay=1&mute=0&playsinline=1`;

  currentPlayingChannel = channel;
  updatePlayerChannel(channel);
  saveRecentlyWatched(channel);
  statusText.textContent = `YouTube Live açıldı: ${channel.name}`;

  if (activeFilter === "__recent") {
    renderRecentlyWatchedChannels();
  }
}


function startPlayback(channel) {
  videoPlayer.play()
    .then(() => {
      currentPlayingChannel = channel;
      updatePlayerChannel(channel);
      saveRecentlyWatched(channel);
      statusText.textContent = `İzlənir: ${channel.name}`;

      if (activeFilter === "__recent") {
        renderRecentlyWatchedChannels();
      }
    })
    .catch(error => {
      console.error(error);
      currentPlayingChannel = channel;
      updatePlayerChannel(channel);
      statusText.textContent = "Kanal hazırdır. Avtomatik başlamadısa video üzərində play düyməsinə bas.";
    });
}

function updatePlayerChannel(channel) {
  currentChannel.textContent = channel.name;
  currentMeta.textContent = `${channel.country || "AZ/TR"}${channel.group ? " · " + channel.group : ""}`;

  const initials = getInitials(channel.name);

  if (channel.logo) {
    playerLogo.innerHTML = `<img src="${escapeHTML(channel.logo)}" alt="" />`;
    const logoImage = playerLogo.querySelector("img");
    logoImage.addEventListener("error", () => {
      playerLogo.textContent = initials;
    });
  } else {
    playerLogo.textContent = initials;
  }

  playerFavoriteButton.disabled = false;
  stopButton.disabled = false;
  playerFavoriteButton.classList.toggle("active", favorites.includes(channel.id));
}

function stopCurrentChannel() {
  videoPlayer.pause();
  destroyHls();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();
  youtubePlayer.removeAttribute("src");
  screenFrame.classList.remove("youtube-mode");

  currentPlayingChannel = null;
  currentChannel.textContent = "Kanal seçilməyib";
  currentMeta.textContent = "İzləmək üçün kanal seç";
  playerLogo.textContent = "TV";
  playerFavoriteButton.disabled = true;
  playerFavoriteButton.classList.remove("active");
  stopButton.disabled = true;
  statusText.textContent = "Yayım dayandırıldı.";
}

function destroyHls() {
  if (hlsInstance) {
    hlsInstance.destroy();
    hlsInstance = null;
  }
}

function saveRecentlyWatched(channel) {
  recentlyWatchedChannels = recentlyWatchedChannels.filter(item => item.id !== channel.id);
  recentlyWatchedChannels.unshift(channel);
  recentlyWatchedChannels = recentlyWatchedChannels.slice(0, 20);
  localStorage.setItem("azTurkTvRecent", JSON.stringify(recentlyWatchedChannels));
}

function toggleFavorite(channelId) {
  const channel = channels.find(item => item.id === channelId)
    || favoriteChannels.find(item => item.id === channelId)
    || recentlyWatchedChannels.find(item => item.id === channelId);

  if (favorites.includes(channelId)) {
    favorites = favorites.filter(id => id !== channelId);
    favoriteChannels = favoriteChannels.filter(item => item.id !== channelId);
  } else if (channel) {
    favorites.push(channelId);
    favoriteChannels.push(channel);
  }

  localStorage.setItem("azTurkTvFavorites", JSON.stringify(favoriteChannels));
  updateFavoriteCount();

  if (currentPlayingChannel && currentPlayingChannel.id === channelId) {
    playerFavoriteButton.classList.toggle("active", favorites.includes(channelId));
  }

  if (activeFilter === "__favorites") {
    renderFavoriteChannels();
  }
}

function renderFavoriteChannels() {
  const selectedSource = SOURCES[sourceSelect.value];
  statusText.textContent = favoriteChannels.length
    ? `${favoriteChannels.length} favorit kanal`
    : "Hələ favorit yoxdur. Ulduz düyməsi ilə əlavə edə bilərsən.";
  activeFilterLabel.textContent = `${selectedSource?.label || "AZ/TR"} · Favoritlər`;
  channelCount.textContent = favoriteChannels.length;
  renderChannels(favoriteChannels);
}

function renderRecentlyWatchedChannels() {
  const selectedSource = SOURCES[sourceSelect.value];
  statusText.textContent = recentlyWatchedChannels.length
    ? `${recentlyWatchedChannels.length} son baxılan kanal`
    : "Hələ son baxılan kanal yoxdur.";
  activeFilterLabel.textContent = `${selectedSource?.label || "AZ/TR"} · Son baxılanlar`;
  channelCount.textContent = recentlyWatchedChannels.length;
  renderChannels(recentlyWatchedChannels);
}

function makeChannelId(name, url) {
  return `${name}-${url}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 140);
}

function getInitials(name) {
  return String(name || "TV")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join("")
    .toUpperCase();
}

function escapeHTML(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function applyCinemaMode(mode) {
  const safeMode = mode === "on" ? "on" : "off";
  document.body.classList.toggle("cinema", safeMode === "on");
  themeToggle.textContent = safeMode === "on" ? "Day Mode" : "Cinema Mode";
  themeToggle.setAttribute("aria-pressed", safeMode === "on" ? "true" : "false");
  localStorage.setItem("azTurkTvCinema", safeMode);
  cinemaMode = safeMode;
}

function toggleCinemaMode() {
  applyCinemaMode(cinemaMode === "on" ? "off" : "on");
}

searchButton.addEventListener("click", loadChannels);

searchInput.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    loadChannels();
  }
});

sourceSelect.addEventListener("change", loadChannels);

pills.forEach(pill => {
  pill.addEventListener("click", () => {
    pills.forEach(item => item.classList.remove("active"));
    pill.classList.add("active");
    activeFilter = pill.dataset.filter || "";
    loadChannels();
  });
});

playerFavoriteButton.addEventListener("click", () => {
  if (currentPlayingChannel) {
    toggleFavorite(currentPlayingChannel.id);
  }
});

stopButton.addEventListener("click", stopCurrentChannel);
themeToggle.addEventListener("click", toggleCinemaMode);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch(error => {
      console.warn("Service worker registration failed:", error);
    });
  });
}

applyCinemaMode(cinemaMode);
updateFavoriteCount();
loadChannels();
