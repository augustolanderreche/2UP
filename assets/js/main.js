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

// Animate each block once, when its leading edge enters the reading area.
function initScrollReveals() {
  const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
  if (!motion.matches || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    let previous;
    let delay = 0;

    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const item = entry.target;
      observer.unobserve(item);

      // Only stagger siblings that enter together on the same grid row.
      const sameRow = previous && previous.target.parentElement === item.parentElement
        && Math.abs(previous.boundingClientRect.top - entry.boundingClientRect.top) < 2;
      delay = sameRow ? Math.min(delay + 45, 135) : 0;
      if (delay) item.style.setProperty("--reveal-delay", delay + "ms");
      item.classList.add("is-entering");
      previous = entry;
    }
  });

  for (const item of document.querySelectorAll("[data-reveal], [data-reveal-list] > *")) {
    if (item.getBoundingClientRect().top >= document.documentElement.clientHeight) {
      observer.observe(item);
    }
  }

  motion.addEventListener("change", () => {
    observer.disconnect();
    document.querySelectorAll(".is-entering").forEach((item) => item.classList.remove("is-entering"));
  }, { once: true });
}

initScrollReveals();
