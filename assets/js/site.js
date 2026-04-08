const siteData = window.siteData || {};
const episodes = Array.isArray(siteData.episodes) ? siteData.episodes : [];
const latestEpisode = episodes[episodes.length - 1] || null;
const randomFeaturedEpisode = episodes.length ? episodes[Math.floor(Math.random() * episodes.length)] : null;
const featuredEpisode = episodes.find((episode) => episode.number === siteData.featuredEpisodeNumber) || latestEpisode;
const worldPremiere = siteData.worldPremiere || null;
const repeatedTickerItems = episodes.length ? [...episodes, ...episodes] : [];
const defaultEpisodeSort = "asc";

function getCompactEpisodeEmbed(episode) {
  if (!episode || !episode.embed) return "";

  return episode.embed
    .replace("visual=true", "visual=false")
    .replace("show_user=true", "show_user=false")
    .replace("show_teaser=false", "show_teaser=true");
}

function getSortedEpisodes(sortOrder = defaultEpisodeSort) {
  return [...episodes].sort((left, right) => {
    const leftNumber = Number(left.number) || 0;
    const rightNumber = Number(right.number) || 0;

    return sortOrder === "asc"
      ? leftNumber - rightNumber
      : rightNumber - leftNumber;
  });
}

function episodeCardMarkup(episode) {
  return `
    <article class="episode-card">
      <div class="episode-card__body">
        <div class="episode-card__head">
          <p class="episode-card__index">${episode.number}</p>
          <div class="episode-card__meta">
            <p class="episode-card__number">Episode ${episode.number}</p>
            <p class="episode-card__guest">WITH <a href="${episode.guestUrl}" target="_blank" rel="noreferrer">${episode.guest}</a></p>
          </div>
        </div>
        <h2 class="episode-card__title">${episode.title}</h2>
      </div>
      <div class="embed-frame embed-frame--square">
        <iframe title="Episode ${episode.number}: ${episode.title}" loading="lazy" allow="autoplay" src="${episode.embed}"></iframe>
      </div>
    </article>
  `;
}

function renderArchiveCount() {
  const count = document.querySelector("[data-archive-count]");
  if (!count) return;

  count.textContent = `${episodes.length} EPISODES`;
}

function renderEpisodesGrid(sortOrder = defaultEpisodeSort) {
  const mount = document.querySelector("[data-episodes-grid]");
  if (!mount || !episodes.length) return;

  mount.innerHTML = getSortedEpisodes(sortOrder).map(episodeCardMarkup).join("");
}

function wireEpisodeSort() {
  const sortButtons = Array.from(document.querySelectorAll("[data-episode-sort]"));
  if (!sortButtons.length) {
    renderEpisodesGrid(defaultEpisodeSort);
    return;
  }

  function setActiveSort(sortOrder) {
    sortButtons.forEach((button) => {
      const isActive = button.dataset.episodeSort === sortOrder;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    renderEpisodesGrid(sortOrder);
  }

  setActiveSort(defaultEpisodeSort);

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveSort(button.dataset.episodeSort || defaultEpisodeSort);
    });
  });
}

function renderFeaturedEpisode() {
  if (!featuredEpisode) return;

  const title = document.querySelector("[data-current-episode-title]");
  const guest = document.querySelector("[data-current-episode-guest]");
  const iframe = document.querySelector("[data-current-episode-embed]");

  if (title) {
    title.textContent = featuredEpisode.title;
  }

  if (guest) {
    guest.innerHTML = `with <a href="${featuredEpisode.guestUrl}" target="_blank" rel="noreferrer">${featuredEpisode.guest}</a>`;
  }

  if (iframe) {
    iframe.src = featuredEpisode.embed;
    iframe.title = `Episode ${featuredEpisode.number}: ${featuredEpisode.title}`;
  }
}

function renderWorldPremiere() {
  if (!worldPremiere) return;

  const eyebrow = document.querySelector("[data-world-premiere-eyebrow]");
  const title = document.querySelector("[data-world-premiere-title]");
  const description = document.querySelector("[data-world-premiere-description]");
  const primaryLink = document.querySelector("[data-world-premiere-primary-link]");
  const secondaryLink = document.querySelector("[data-world-premiere-secondary-link]");
  const embed = document.querySelector("[data-world-premiere-embed]");

  if (eyebrow) eyebrow.textContent = worldPremiere.eyebrow || "WORLD PREMIER";
  if (title) title.textContent = worldPremiere.title || "";
  if (description) description.innerHTML = worldPremiere.description || "";

  if (primaryLink) {
    primaryLink.textContent = worldPremiere.primaryLinkLabel || primaryLink.textContent;
    primaryLink.href = worldPremiere.primaryLinkUrl || "#";
  }

  if (secondaryLink) {
    secondaryLink.textContent = worldPremiere.secondaryLinkLabel || secondaryLink.textContent;
    secondaryLink.href = worldPremiere.secondaryLinkUrl || "#";
  }

  if (embed) {
    const isLocalPreview = window.location.protocol === "file:";

    if (isLocalPreview) {
      const frame = embed.closest(".embed-frame");

      if (frame) {
        frame.innerHTML = `
          <div class="embed-fallback">
            <p class="embed-fallback__eyebrow">Local preview</p>
            <h3 class="embed-fallback__title">Open the world premiere on YouTube</h3>
            <p class="embed-fallback__text">YouTube blocks this embed when the site is opened directly from a file on your computer.</p>
            <a class="button" href="${worldPremiere.primaryLinkUrl || "#"}" target="_blank" rel="noreferrer">Watch on YouTube</a>
          </div>
        `;
      }

      return;
    }

    embed.src = worldPremiere.embedUrl || "";
    embed.title = worldPremiere.embedTitle || "WORLD PREMIER";
  }
}

function wireWorldPremiereMuteToggle() {
  const embed = document.querySelector("[data-world-premiere-embed]");
  const button = document.querySelector("[data-world-premiere-audio-toggle]");
  if (!embed || !button) return;

  let isMuted = true;

  function updateButton() {
    button.dataset.muted = String(isMuted);
    button.setAttribute("aria-label", isMuted ? "Unmute video" : "Mute video");
    button.setAttribute("aria-pressed", String(!isMuted));
  }

  function postPlayerCommand(command) {
    if (!embed.contentWindow) return false;

    embed.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: command,
        args: []
      }),
      "https://www.youtube.com"
    );

    return true;
  }

  updateButton();

  button.addEventListener("click", () => {
    const command = isMuted ? "unMute" : "mute";
    const messageSent = postPlayerCommand(command);

    if (!messageSent) return;

    isMuted = !isMuted;
    updateButton();
  });
}

function renderEpisodeMeta() {
  if (!randomFeaturedEpisode) return;

  document.querySelectorAll("[data-featured-episode-title]").forEach((node) => {
    node.textContent = randomFeaturedEpisode.title;
  });

  document.querySelectorAll("[data-featured-episode-guest]").forEach((node) => {
    if (randomFeaturedEpisode.guestUrl) {
      node.innerHTML = `<a href="${randomFeaturedEpisode.guestUrl}" target="_blank" rel="noreferrer">${randomFeaturedEpisode.guest}</a>`;
      return;
    }

    node.textContent = randomFeaturedEpisode.guest;
  });

  document.querySelectorAll("[data-featured-episode-date]").forEach((node) => {
    node.textContent = randomFeaturedEpisode.date;
  });

  document.querySelectorAll("[data-featured-episode-embed]").forEach((node) => {
    node.src = getCompactEpisodeEmbed(randomFeaturedEpisode);
    node.title = `Featured Episode ${randomFeaturedEpisode.number}: ${randomFeaturedEpisode.title}`;
  });
}

function renderEpisodeTicker() {
  const mount = document.querySelector("[data-episode-ticker]");
  if (!mount || !repeatedTickerItems.length) return;

  mount.innerHTML = repeatedTickerItems
    .map((episode) => `<span><strong>Episode ${episode.number}</strong> ${episode.title} / ${episode.guest}</span>`)
    .join("");
}

function wireFeaturedForm() {
  const form = document.querySelector("[data-featured-form]");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = `Hyperbolic Chamber Submission - ${data.get("artistName") || "Artist"}`;
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Artist Name: ${data.get("artistName") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Portfolio Link: ${data.get("portfolio") || ""}`,
      "",
      "Message:",
      `${data.get("message") || ""}`
    ].join("\n");

    window.location.href = `mailto:hyperbolic__chamber__@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
}

function wireMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  const mobileBreakpoint = 760;

  function closeMenu() {
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", isOpen ? "false" : "true");
    nav.classList.toggle("is-open", !isOpen);
  });

  nav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > mobileBreakpoint) {
      closeMenu();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

function initializeHomeLoader() {
  const body = document.body;
  const loader = document.querySelector(".chamber-loader");

  if (!body || !body.classList.contains("home-page") || !loader) return;

  const referrer = document.referrer ? new URL(document.referrer, window.location.href) : null;
  const isInternalNavigation = Boolean(
    referrer &&
    referrer.origin === window.location.origin &&
    referrer.pathname !== window.location.pathname
  );

  if (isInternalNavigation) {
    body.classList.add("no-intro");
    body.classList.add("is-loaded");
    body.classList.remove("is-loading");
    loader.remove();
    return;
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const minimumDuration = prefersReducedMotion ? 450 : 2600;
  const startedAt = window.performance && typeof window.performance.now === "function"
    ? window.performance.now()
    : Date.now();

  function finishLoader() {
    if (!body.classList.contains("is-loading")) return;

    body.classList.add("is-exiting");

    window.setTimeout(() => {
      body.classList.add("is-loaded");
      body.classList.remove("is-loading");
      body.classList.remove("is-exiting");
    }, prefersReducedMotion ? 120 : 520);

    window.setTimeout(() => {
      loader.remove();
    }, prefersReducedMotion ? 260 : 1500);
  }

  function releaseLoader() {
    const now = window.performance && typeof window.performance.now === "function"
      ? window.performance.now()
      : Date.now();
    const elapsed = now - startedAt;
    const remaining = Math.max(0, minimumDuration - elapsed);

    window.setTimeout(finishLoader, remaining);
  }

  if (document.readyState === "complete") {
    releaseLoader();
    return;
  }

  window.addEventListener("load", releaseLoader, { once: true });
}

initializeHomeLoader();
renderArchiveCount();
wireEpisodeSort();
renderFeaturedEpisode();
renderWorldPremiere();
wireWorldPremiereMuteToggle();
renderEpisodeMeta();
renderEpisodeTicker();
wireFeaturedForm();
wireMobileMenu();
