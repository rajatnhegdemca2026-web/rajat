const root = document.documentElement;
const themeButton = document.querySelector(".theme-toggle");
const themePreference = window.matchMedia("(prefers-color-scheme: light)");

function applyTheme(theme) {
  root.dataset.theme = theme;
  const isDark = theme === "dark";
  themeButton.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
  themeButton.setAttribute("title", isDark ? "Switch to light theme" : "Switch to dark theme");
}

let savedTheme = null;
try {
  savedTheme = localStorage.getItem("rajat-portfolio-theme");
} catch (error) {
  console.warn("Theme preference could not be loaded.", error);
}

if (savedTheme === "light" || savedTheme === "dark") {
  applyTheme(savedTheme);
} else {
  root.removeAttribute("data-theme");
  applyTheme(themePreference.matches ? "light" : "dark");
  root.removeAttribute("data-theme");
}

themeButton.addEventListener("click", () => {
  const currentTheme = root.dataset.theme || (themePreference.matches ? "light" : "dark");
  const nextTheme = currentTheme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
  try {
    localStorage.setItem("rajat-portfolio-theme", nextTheme);
  } catch (error) {
    console.warn("Theme preference could not be saved.", error);
  }
});

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

document.querySelectorAll(".filter-button").forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    document.querySelectorAll(".filter-button").forEach((filterButton) => {
      const selected = filterButton === button;
      filterButton.classList.toggle("active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    document.querySelectorAll(".project-card").forEach((card) => {
      card.hidden = filter !== "all" && card.dataset.category !== filter;
    });
  });
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reduceMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

document.querySelector("#current-year").textContent = String(new Date().getFullYear());
