const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const desktop = window.matchMedia("(min-width: 48rem)");

function setMenuOpen(open) {
  mobileMenu.classList.toggle("hidden", !open);
  menuButton.setAttribute("aria-expanded", String(open));
}

menuButton.addEventListener("click", () => {
  setMenuOpen(menuButton.getAttribute("aria-expanded") === "false");
});

mobileMenu.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuButton.focus();
  }
});

desktop.addEventListener("change", () => {
  if (desktop.matches) setMenuOpen(false);
});

const clientsList = document.getElementById("clients-list");
const clientsClone = clientsList.cloneNode(true);
clientsClone.removeAttribute("id");
clientsClone.setAttribute("aria-hidden", "true");
clientsList.after(clientsClone);

const scrollTopButton = document.getElementById("ast-scroll-top");

function updateScrollButton() {
  scrollTopButton.style.display = window.scrollY > 120 ? "flex" : "none";
}

scrollTopButton.addEventListener("click", () => window.scrollTo({ top: 0 }));
window.addEventListener("scroll", updateScrollButton, { passive: true });
updateScrollButton();

// Fade each block across a short scroll distance, then leave it visible for rereading.
function initScrollReveals() {
  const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
  if (!motion.matches) return;

  const viewport = document.documentElement;
  const items = document.querySelectorAll("[data-reveal], [data-reveal-list] > *");
  const pending = new Set(Array.from(items).filter(
    (item) => item.getBoundingClientRect().top >= viewport.clientHeight
  ));
  if (!pending.size) return;

  const events = new AbortController();
  let frame = 0;

  function finish(item) {
    item.classList.remove("scroll-reveal");
    item.style.removeProperty("--reveal-progress");
    pending.delete(item);
  }

  function stop() {
    events.abort();
    cancelAnimationFrame(frame);
    pending.forEach(finish);
  }

  function update() {
    frame = 0;
    const height = viewport.clientHeight;
    const distance = Math.min(180, height * 0.24);
    const atBottom = Math.ceil(window.scrollY + height) >= viewport.scrollHeight;
    // Read all positions before changing styles.
    const positions = Array.from(pending, (item) => [item, item.getBoundingClientRect().top]);
    for (const [item, top] of positions) {
      const progress = atBottom ? 1 : Math.max(0, Math.min(1, (height - top) / distance));
      if (progress === 1) {
        finish(item);
      } else if (progress > 0 || item.style.getPropertyValue("--reveal-progress")) {
        const opacity = progress * progress * (3 - 2 * progress);
        item.style.setProperty("--reveal-progress", opacity.toFixed(4));
      }
    }
    if (!pending.size) stop();
  }

  function scheduleUpdate() {
    if (!frame) frame = requestAnimationFrame(update);
  }

  pending.forEach((item) => item.classList.add("scroll-reveal"));
  const options = { passive: true, signal: events.signal };
  window.addEventListener("scroll", scheduleUpdate, options);
  window.addEventListener("resize", scheduleUpdate, options);
  window.addEventListener("pageshow", scheduleUpdate, options);
  document.addEventListener("focusin", (event) => {
    const item = event.target.closest(".scroll-reveal");
    if (item) finish(item);
  }, options);
  motion.addEventListener("change", stop, options);
  update();
}

initScrollReveals();
