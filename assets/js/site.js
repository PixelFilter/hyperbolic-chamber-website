const episodes = [
  { number: "01", title: "Deep hypnosis", guest: "\u0100MAN", guestUrl: "https://www.instagram.com/amansridhar/", date: "05.27.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1845951723&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "02", title: "Dark & dirty", guest: "pixelfilter", guestUrl: "https://www.pixelfilter.space/", date: "06.13.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1846615218&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "03", title: "Melodic magic", guest: "shades of day", guestUrl: "https://www.instagram.com/shades.of.day/", date: "06.27.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1857771123&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "04", title: "Dubby deliciousness", guest: "\u0100MAN", guestUrl: "https://www.instagram.com/amansridhar/", date: "07.11.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1869243723&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "05", title: "Bounce", guest: "Mattem\u00fcs", guestUrl: "https://www.instagram.com/__mattemus__/", date: "07.25.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1880946480&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "06", title: "Deep Melodies", guest: "David Ardila", guestUrl: "https://www.instagram.com/davidardiladj/", date: "08.08.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1892207433&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "07", title: "Minimal Groove", guest: "Em jay", guestUrl: "https://www.instagram.com/em_jay_music/", date: "08.22.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1901901048&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "08", title: "high altitude sickness", guest: "Chemica\u0142", guestUrl: "https://www.instagram.com/chemical__sounds/", date: "09.05.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1910960681&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "09", title: "Groovy Goodness", guest: "Sirena", guestUrl: "https://www.instagram.com/astronautnylon/", date: "10.10.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1932539570&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "10", title: "Vinyl Voodoo", guest: "Walter WACK", guestUrl: "https://www.instagram.com/walterwack999/", date: "10.24.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1940893299&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "11", title: "Energy & range", guest: "Lord Loubbit", guestUrl: "https://www.instagram.com/lordloubbit/", date: "11.07.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1951654507&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "12", title: "brooding bass & breaks", guest: "\u0100MAN", guestUrl: "https://www.instagram.com/amansridhar/", date: "11.20.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1963267275&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "13", title: "DAnce & DRIVE", guest: "C-Star", guestUrl: "https://www.instagram.com/chrissyes/", date: "12.05.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1973948751&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "14", title: "Enter the Void", guest: "YAMANAKA", guestUrl: "https://www.instagram.com/yamanaka_zen/", date: "12.19.2024", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1989757647&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "15", title: "A Bass Odyssey", guest: "AWood", guestUrl: "https://www.instagram.com/awood55/", date: "01.09.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2005492759&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "16", title: "The Hard Stuff", guest: "B\u0178ST\u00c4NDER", guestUrl: "https://www.instagram.com/djbystander/", date: "01.23.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2016695039&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "17", title: "From Bombay to Berlin", guest: "PiXELFILTER", guestUrl: "https://www.pixelfilter.space/", date: "02.27.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2042671472&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "18", title: "A 140 BPM Boogie", guest: "Shades of Day", guestUrl: "https://www.instagram.com/shades.of.day/", date: "03.14.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2054321372&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "19", title: "Dance in a Trance", guest: "\u0100MAN", guestUrl: "https://www.instagram.com/amansridhar/", date: "03.27.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2064979196&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "20", title: "Good Vibrations", guest: "Interwave Surfer", guestUrl: "https://www.instagram.com/interwavesurfer/", date: "04.10.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2075587192&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "21", title: "Hypnotic harmonies", guest: "DJ RAine", guestUrl: "https://www.instagram.com/dj.raine/", date: "04.24.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2084309646&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "22", title: "An Electro-Psychedlic Explosion", guest: "\u0100MAN", guestUrl: "https://www.instagram.com/amansridhar/", date: "05.08.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2092530702&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "23", title: "A GOLDEN HOUR", guest: "Marco Valencia", guestUrl: "https://www.instagram.com/dj.marco.valencia/", date: "05.30.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2104892334&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "24", title: "Georgetown Steam Plant", guest: "\u0100MAN & PiXELFILTER", guestUrl: "https://www.instagram.com/amansridhar/", date: "07.30.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2138518362&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "25", title: "A Masterclass in Deep Cuts", guest: "Bonsoir Mufield", guestUrl: "https://www.instagram.com/bonsoir_mufield/", date: "09.18.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2172137850&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "26", title: "Liquid EUPHORIA", guest: "BCXG", guestUrl: "https://soundcloud.com/bcxg1", date: "10.16.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2190908735&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "27", title: "DANCE FLOOR SHUFFLES", guest: "N3LTRON", guestUrl: "https://www.instagram.com/n3ltron/", date: "11.21.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/soundcloud%253Atracks%253A2216113574&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "28", title: "Dark Energy", guest: "DeVonn", guestUrl: "https://www.instagram.com/de.vonn___/", date: "12.18.2025", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2232337751&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "29", title: "a cAULDRON OF SOUND", guest: "CORY SIMPSON", guestUrl: "https://www.instagram.com/unimaginableanswers/", date: "01.15.2026", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2246860169&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "30", title: "A MINIMAL MOOD", guest: "SIRENA", guestUrl: "https://www.instagram.com/sirena.grooves/", date: "01.29.2026", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2255278085&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "31", title: "A Sunset Ride", guest: "AXION", guestUrl: "https://www.instagram.com/amolvikramsingh/", date: "02.12.2026", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2265504914&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" },
  { number: "32", title: "Tunnel Vision", guest: "ELISIUM", guestUrl: "https://www.instagram.com/elisium_ek/", date: "02.26.2026", embed: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/2274150146&color=%23161616&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=true&wmode=opaque" }
];

const latestEpisode = episodes[episodes.length - 1];

function episodeCardMarkup(episode) {
  return `
    <article class="episode-card">
      <div class="embed-frame embed-frame--square">
        <iframe title="Episode ${episode.number}: ${episode.title}" loading="lazy" allow="autoplay" src="${episode.embed}"></iframe>
      </div>
      <div class="episode-card__body">
        <p class="episode-card__number">Episode ${episode.number}</p>
        <h2 class="episode-card__title">${episode.title}</h2>
        <p class="episode-card__guest">with <a href="${episode.guestUrl}" target="_blank" rel="noreferrer">${episode.guest}</a></p>
        <p class="episode-card__date">${episode.date}</p>
      </div>
    </article>
  `;
}

function renderEpisodesGrid() {
  const mount = document.querySelector("[data-episodes-grid]");
  if (!mount) return;
  mount.innerHTML = episodes.map(episodeCardMarkup).join("");
}

function renderHomepageEpisode() {
  const title = document.querySelector("[data-current-episode-title]");
  const guest = document.querySelector("[data-current-episode-guest]");
  const iframe = document.querySelector("[data-current-episode-embed]");
  const date = document.querySelector("[data-current-episode-date]");
  if (title) {
    title.textContent = `Episode ${latestEpisode.number}: ${latestEpisode.title}`;
  }
  if (guest) {
    guest.innerHTML = `with <a href="${latestEpisode.guestUrl}" target="_blank" rel="noreferrer">${latestEpisode.guest}</a>`;
  }
  if (iframe) {
    iframe.src = latestEpisode.embed;
    iframe.title = `Episode ${latestEpisode.number}: ${latestEpisode.title}`;
  }
  if (date) {
    date.textContent = latestEpisode.date;
  }
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

renderEpisodesGrid();
renderHomepageEpisode();
wireFeaturedForm();
