const modal = document.querySelector("[data-research-modal]");
const openButtons = document.querySelectorAll("[data-open-research-modal]");
const closeButtons = document.querySelectorAll("[data-close-research-modal]");
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenuState(isOpen) {
  if (!menuToggle || !navLinks) return;
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  navLinks.classList.toggle("is-open", isOpen);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuState(!isOpen);
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

document.querySelectorAll("[data-recognition-target]").forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("data-recognition-target");
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    event.preventDefault();
    target.setAttribute("open", "");
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.replaceState(null, "", `#${targetId}`);
  });
});

function openResearchModal() {
  if (!modal) return;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  const closeButton = modal.querySelector("[data-close-research-modal]");
  closeButton?.focus();
}

function closeResearchModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
}

openButtons.forEach((button) => {
  button.addEventListener("click", openResearchModal);
});

closeButtons.forEach((button) => {
  button.addEventListener("click", closeResearchModal);
});

modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeResearchModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeResearchModal();
    setMenuState(false);
  }
});
