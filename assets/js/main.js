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

// Observe nearby blocks only. Their position determines both opacity and direction.
function initScrollReveals() {
  if (!("IntersectionObserver" in window)) return;

  const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
  const viewport = document.documentElement;
  const items = document.querySelectorAll("[data-reveal], [data-reveal-list] > *");
  const nearby = new Set();
  let frame = 0;

  function clearReveal(item) {
    if (!item.classList.contains("scroll-reveal")) return;
    item.classList.remove("scroll-reveal");
    item.style.removeProperty("--reveal-progress");
    item.style.removeProperty("--reveal-offset");
  }

  function update() {
    frame = 0;
    const height = viewport.clientHeight;
    if (!height) return;
    const distance = Math.min(215, height * 0.28);
    const atStart = window.scrollY <= 0;
    const atEnd = Math.ceil(window.scrollY + height) >= viewport.scrollHeight;
    const positions = Array.from(nearby, (item) => [item, item.getBoundingClientRect()]);

    for (const [item, rect] of positions) {
      const fromTop = atStart ? distance : rect.bottom;
      const fromBottom = atEnd ? distance : height - rect.top;
      const depth = Math.min(fromTop, fromBottom);
      if (depth >= distance) {
        clearReveal(item);
        continue;
      }

      const progress = Math.max(0, depth / distance);
      const opacity = progress * progress * (3 - 2 * progress);
      const offset = (fromTop < fromBottom ? 10 : -10) * (1 - opacity);
      item.style.setProperty("--reveal-progress", opacity.toFixed(4));
      item.style.setProperty("--reveal-offset", offset.toFixed(2) + "px");
      item.classList.add("scroll-reveal");
    }
  }

  function scheduleUpdate() {
    if (nearby.size && !frame) frame = requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        nearby.add(entry.target);
      } else {
        nearby.delete(entry.target);
        clearReveal(entry.target);
      }
    }
    scheduleUpdate();
  }, { rootMargin: "96px 0px" });

  function syncMotion() {
    if (motion.matches) {
      items.forEach((item) => observer.observe(item));
      window.addEventListener("scroll", scheduleUpdate, { passive: true });
      window.addEventListener("resize", scheduleUpdate);
    } else {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      cancelAnimationFrame(frame);
      frame = 0;
      nearby.forEach(clearReveal);
      nearby.clear();
    }
  }

  motion.addEventListener("change", syncMotion);
  syncMotion();
}

initScrollReveals();
