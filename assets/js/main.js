const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const scrollTopButton = document.getElementById("ast-scroll-top");
const clientsTrack = document.getElementById("clients-track");
const clientsList = document.getElementById("clients-list");

function debounce(fn, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

function initMobileMenu() {
  if (!mobileMenuButton || !mobileMenu) return;

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    const expanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
    mobileMenuButton.setAttribute("aria-expanded", String(!expanded));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      mobileMenuButton.setAttribute("aria-expanded", "false");
    });
  });
}

function initClientsMarquee() {
  if (!clientsTrack || !clientsList || clientsTrack.dataset.cloned === "true") return;

  const clientsClone = clientsList.cloneNode(true);
  clientsClone.setAttribute("aria-hidden", "true");
  clientsTrack.appendChild(clientsClone);
  clientsTrack.dataset.cloned = "true";
}

function toggleScrollTopButton() {
  if (!scrollTopButton) return;
  scrollTopButton.style.display = window.scrollY > 120 ? "flex" : "none";
}

function initScrollTopButton() {
  if (!scrollTopButton) return;

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  scrollTopButton.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

function setHeroMobileLayout() {
  const isMobile = window.innerWidth < 768;

  const heroVisual = document.getElementById("hero-visual");
  const heroGlow = document.getElementById("hero-glow");
  const heroDashboard = document.getElementById("hero-dashboard");
  const heroFocus = document.getElementById("hero-focus");
  const heroResult = document.getElementById("hero-result");

  if (!heroVisual || !heroGlow || !heroDashboard || !heroFocus || !heroResult) return;

  if (isMobile) {
    heroVisual.classList.add("flex", "flex-col", "items-center", "gap-4", "pt-4");
    heroVisual.style.minHeight = "";

    heroGlow.classList.remove("left-10", "top-4", "h-72", "w-72");
    heroGlow.classList.add("left-1/2", "-translate-x-1/2", "top-0", "h-52", "w-52", "opacity-80");

    heroDashboard.classList.remove("absolute", "right-0", "top-0", "w-[85%]");
    heroDashboard.classList.add("relative", "w-full", "max-w-[420px]", "z-20");

    heroResult.classList.remove("absolute", "bottom-1", "left-0", "w-[82%]", "-translate-x-3", "z-10");
    heroResult.classList.add("relative", "left-auto", "bottom-auto", "w-full", "max-w-[360px]", "translate-x-0", "self-start", "z-20");

    heroFocus.classList.remove("absolute", "bottom-10", "bottom-0", "right-0", "-translate-x-3");
    heroFocus.classList.add("relative", "right-auto", "bottom-auto", "w-full", "max-w-[360px]", "translate-x-0", "self-end", "z-20");
    return;
  }

  heroVisual.classList.remove("flex", "flex-col", "items-center", "gap-4", "pt-4");
  heroVisual.style.minHeight = heroDashboard.offsetHeight + "px";

  heroGlow.classList.remove("left-1/2", "-translate-x-1/2", "top-0", "h-52", "w-52", "opacity-80");
  heroGlow.classList.add("left-10", "top-4", "h-72", "w-72");

  heroDashboard.classList.remove("relative", "w-full", "max-w-[420px]", "z-20");
  heroDashboard.classList.add("absolute", "right-0", "top-0", "w-[85%]");

  heroResult.classList.remove("relative", "left-auto", "bottom-auto", "w-full", "max-w-[360px]", "translate-x-0", "self-start", "z-20");
  heroResult.classList.add("absolute", "bottom-1", "left-0", "w-[82%]", "-translate-x-3", "z-10");

  heroFocus.classList.remove("relative", "right-auto", "bottom-auto", "w-full", "max-w-[360px]", "translate-x-0", "self-end", "z-20");
  heroFocus.classList.add("absolute", "bottom-10", "right-0", "-translate-x-3");
}

function initOptimizedEvents() {
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(() => {
      toggleScrollTopButton();
      ticking = false;
    });
  };

  const onResize = debounce(() => {
    setHeroMobileLayout();
    toggleScrollTopButton();
  }, 100);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
}

function init() {
  initMobileMenu();
  initClientsMarquee();
  initScrollTopButton();
  setHeroMobileLayout();
  toggleScrollTopButton();
  initOptimizedEvents();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}
