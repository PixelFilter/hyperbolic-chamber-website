const siteData = window.siteData || {};
const episodes = Array.isArray(siteData.episodes) ? siteData.episodes : [];
const latestEpisode = episodes[episodes.length - 1] || null;
const randomFeaturedEpisode = episodes.length ? episodes[Math.floor(Math.random() * episodes.length)] : null;
const featuredEpisode = episodes.find((episode) => episode.number === siteData.featuredEpisodeNumber) || latestEpisode;
const worldPremiere = siteData.worldPremiere || null;
const repeatedTickerItems = episodes.length ? [...episodes, ...episodes] : [];
const defaultEpisodeSort = "asc";

function isSoundCloudEmbedUrl(url) {
  return typeof url === "string" && url.includes("w.soundcloud.com/player");
}

let soundCloudWidgetApiPromise = null;

function setSoundCloudFrameState(iframe, isLoading) {
  if (!iframe) return;

  const frame = iframe.closest(".embed-frame");
  if (!frame) return;

  const src = iframe.getAttribute("src") || "";
  if (!isSoundCloudEmbedUrl(src)) {
    frame.classList.remove("embed-frame--soundcloud", "is-loading", "is-loaded");
    return;
  }

  frame.classList.add("embed-frame--soundcloud");
  frame.classList.toggle("is-loading", isLoading);
  frame.classList.toggle("is-loaded", !isLoading);
}

function loadSoundCloudWidgetApi() {
  if (window.SC && window.SC.Widget) {
    return Promise.resolve(window.SC.Widget);
  }

  if (soundCloudWidgetApiPromise) {
    return soundCloudWidgetApiPromise;
  }

  soundCloudWidgetApiPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[src="https://w.soundcloud.com/player/api.js"]');

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.SC && window.SC.Widget), { once: true });
      existingScript.addEventListener("error", reject, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://w.soundcloud.com/player/api.js";
    script.async = true;
    script.onload = () => resolve(window.SC && window.SC.Widget);
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return soundCloudWidgetApiPromise;
}

function trackSoundCloudEmbedLoad(iframe) {
  if (!iframe) return;

  const src = iframe.getAttribute("src") || "";
  if (!isSoundCloudEmbedUrl(src)) return;

  const loadToken = `${Date.now()}-${Math.random()}`;
  iframe.dataset.soundcloudLoadToken = loadToken;
  setSoundCloudFrameState(iframe, true);

  const finishLoading = () => {
    if (iframe.dataset.soundcloudLoadToken !== loadToken) return;
    setSoundCloudFrameState(iframe, false);
  };

  loadSoundCloudWidgetApi()
    .then((widgetFactory) => {
      if (!widgetFactory || iframe.dataset.soundcloudLoadToken !== loadToken) return;

      const widget = widgetFactory(iframe);
      widget.bind(window.SC.Widget.Events.READY, () => {
        window.setTimeout(finishLoading, 240);
      });
      widget.bind(window.SC.Widget.Events.ERROR, finishLoading);
    })
    .catch(() => {
      iframe.addEventListener("load", () => {
        window.setTimeout(finishLoading, 900);
      }, { once: true });
    });

  window.setTimeout(finishLoading, 6000);
}

function initializeSoundCloudEmbedLoaders(root = document) {
  root.querySelectorAll(".embed-frame iframe").forEach(trackSoundCloudEmbedLoad);
}

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
  initializeSoundCloudEmbedLoaders(mount);
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
    setSoundCloudFrameState(iframe, true);
    iframe.src = featuredEpisode.embed;
    iframe.title = `Episode ${featuredEpisode.number}: ${featuredEpisode.title}`;
    trackSoundCloudEmbedLoad(iframe);
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
    setSoundCloudFrameState(node, true);
    node.src = getCompactEpisodeEmbed(randomFeaturedEpisode);
    node.title = `Featured Episode ${randomFeaturedEpisode.number}: ${randomFeaturedEpisode.title}`;
    trackSoundCloudEmbedLoad(node);
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

  const submitButton = form.querySelector('button[type="submit"]');
  const status = form.querySelector("[data-featured-form-status]");
  const formFields = form.querySelector("[data-featured-form-fields]");
  const successPanel = form.querySelector("[data-featured-form-success]");
  const featuredSubmissionEndpoint = siteData.forms && typeof siteData.forms.featuredSubmissionEndpoint === "string"
    ? siteData.forms.featuredSubmissionEndpoint.trim()
    : "";

  function setStatus(message, state) {
    if (!status) return;
    status.textContent = message;
    status.hidden = !message;
    status.dataset.state = state || "";
  }

  function setSuccessState(isSuccess) {
    if (formFields) {
      formFields.hidden = isSuccess;
    }
    if (successPanel) {
      successPanel.hidden = !isSuccess;
    }
  }

  if (!featuredSubmissionEndpoint || featuredSubmissionEndpoint.includes("your-form-id")) {
    setStatus("Add your Formspree form URL in assets/js/site-data.js to enable submissions.", "error");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute("aria-disabled", "true");
    }
    return;
  }

  form.action = featuredSubmissionEndpoint;
  form.method = "POST";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const defaultButtonLabel = submitButton ? submitButton.textContent : "";

    data.append("_subject", `Hyperbolic Chamber Submission - ${data.get("artistName") || "Artist"}`);

    setStatus("", "");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.setAttribute("aria-disabled", "true");
      submitButton.textContent = "Sending...";
    }

    try {
      const response = await fetch(featuredSubmissionEndpoint, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json"
        }
      });

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      form.reset();
      setStatus("", "");
      setSuccessState(true);
    } catch (error) {
      setStatus("Something went wrong while sending. Please try again in a moment.", "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.removeAttribute("aria-disabled");
        submitButton.textContent = defaultButtonLabel;
      }
    }
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

function initializeRandomLogoGlitch() {
  const logo = document.querySelector(".home-stage__logo-main");
  const stack = document.querySelector(".home-stage__logo-stack");
  if (!logo || !stack) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  function randomBetween(min, max) {
    return min + Math.random() * (max - min);
  }

  function randomInt(min, max) {
    return Math.floor(randomBetween(min, max + 1));
  }

  function setGlitchVariables() {
    const duration = randomInt(360, 760);
    logo.style.setProperty("--logo-glitch-duration", `${duration}ms`);
    stack.style.setProperty("--logo-glitch-duration", `${duration}ms`);

    stack.style.setProperty("--logo-channel-opacity", randomBetween(0.08, 0.16).toFixed(2));
    stack.style.setProperty("--logo-slice-opacity", randomBetween(0.16, 0.28).toFixed(2));
    stack.style.setProperty("--logo-channel-a-x", `${randomBetween(-8, -3).toFixed(2)}px`);
    stack.style.setProperty("--logo-channel-a-y", `${randomBetween(-1.5, 1.5).toFixed(2)}px`);
    stack.style.setProperty("--logo-channel-b-x", `${randomBetween(3, 8).toFixed(2)}px`);
    stack.style.setProperty("--logo-channel-b-y", `${randomBetween(-1.5, 1.5).toFixed(2)}px`);

    for (let index = 1; index <= 3; index += 1) {
      const sliceTopRanges = [
        [8, 16],
        [38, 46],
        [72, 78]
      ];
      const sliceBottomRanges = [
        [58, 66],
        [20, 28],
        [3, 8]
      ];
      const [topMin, topMax] = sliceTopRanges[index - 1];
      const [bottomMin, bottomMax] = sliceBottomRanges[index - 1];

      stack.style.setProperty(`--logo-slice${index}-x`, `${randomBetween(-10, 10).toFixed(2)}px`);
      stack.style.setProperty(`--logo-slice${index}-top`, `${randomInt(topMin, topMax)}%`);
      stack.style.setProperty(`--logo-slice${index}-bottom`, `${randomInt(bottomMin, bottomMax)}%`);
    }

    for (let index = 1; index <= 4; index += 1) {
      const top = randomInt(4, 70);
      const bottom = randomInt(3, Math.max(4, 92 - top));

      logo.style.setProperty(`--logo-glitch-x${index}`, `${randomBetween(-7, 7).toFixed(2)}px`);
      logo.style.setProperty(`--logo-glitch-y${index}`, `${randomBetween(-3, 3).toFixed(2)}px`);
      logo.style.setProperty(`--logo-glitch-skew${index}`, `${randomBetween(-2.2, 2.2).toFixed(2)}deg`);
      logo.style.setProperty(`--logo-glitch-scale-x${index}`, randomBetween(0.99, 1.025).toFixed(3));
      logo.style.setProperty(`--logo-glitch-scale-y${index}`, randomBetween(0.985, 1.02).toFixed(3));
      logo.style.setProperty(`--logo-glitch-top${index}`, `${top}%`);
      logo.style.setProperty(`--logo-glitch-bottom${index}`, `${bottom}%`);
    }

    return duration;
  }

  function clearBurstClasses() {
    stack.classList.remove("is-glitching");
    logo.classList.remove("is-glitching");
  }

  function queueNextBurst() {
    const nextDelay = randomInt(2400, 5200);

    window.setTimeout(() => {
      const duration = setGlitchVariables();
      clearBurstClasses();

      // Restart burst animations cleanly on each cycle.
      void stack.offsetWidth;

      stack.classList.add("is-glitching");
      logo.classList.add("is-glitching");

      window.setTimeout(() => {
        clearBurstClasses();
        queueNextBurst();
      }, duration + 40);
    }, nextDelay);
  }

  stack.classList.add("is-glowing");
  logo.classList.add("is-glowing");
  queueNextBurst();
}

initializeHomeLoader();
initializeRandomLogoGlitch();
initializeSoundCloudEmbedLoaders();
renderArchiveCount();
wireEpisodeSort();
renderFeaturedEpisode();
renderWorldPremiere();
wireWorldPremiereMuteToggle();
renderEpisodeMeta();
renderEpisodeTicker();
wireFeaturedForm();
wireMobileMenu();
