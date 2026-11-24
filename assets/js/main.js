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
