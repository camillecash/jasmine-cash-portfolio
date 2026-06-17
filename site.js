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

const revealGroups = [
  [".hero > div:first-child", "up"],
  [".portrait-panel", "left"],
  [".page-hero", "down"],
  [".split > div:first-child", "right"],
  [".split > div:last-child", "left"],
  [".interest-strip", "up"],
  [".project-overview, .recognition-overview", "up"],
  [".project-theme, .presentation-section, .recognition-section, .profile-section, .scholarly-section, .credential-section", "up"],
  [".research-list > article, .skill-grid > article, .project-card, .publication-item, .teaching-card, .profile-card, .credential-card, .presentation-item, .abstract-strip > article, .recognition-item, .recognition-card", "up"],
];

function setupReveals() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  revealGroups.forEach(([selector, direction]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (!element.hasAttribute("data-reveal")) {
        element.setAttribute("data-reveal", direction);
      }
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 55}ms`);
    });
  });

  const revealElements = document.querySelectorAll("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

setupReveals();

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
