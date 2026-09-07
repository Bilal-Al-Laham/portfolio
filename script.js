/* ================= REVEAL ANIMATIONS ================= */

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("active");
        }, index * 100);

        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  },
);

document
  .querySelectorAll(".fade-up, .scale-in")
  .forEach((element) => observer.observe(element));

/* ================= MOBILE MENU ================= */

const menuButton = document.querySelector(".menu-btn");
const navLinksContainer = document.querySelector(".nav-links");

if (menuButton) {
  menuButton.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");

    const isOpen = navLinksContainer.classList.contains("active");

    menuButton.classList.toggle("fa-bars", !isOpen);
    menuButton.classList.toggle("fa-xmark", isOpen);
  });
}

/* ================= THEME TOGGLE ================= */

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
  themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");

    const isLight = document.body.classList.contains("light-mode");

    themeToggle.innerHTML = isLight
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';

    localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
  });
}

/* ================= SCROLL SPY ================= */

const sections = document.querySelectorAll("header[id], section[id]");

const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
  const scrollPosition = window.scrollY + window.innerHeight * 0.35;

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);

window.addEventListener("load", updateActiveLink);

/* ================= SMOOTH NAVIGATION ================= */

navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const navbar = document.querySelector(".navbar");

    const offset = navbar.offsetHeight + 10;

    window.scrollTo({
      top: target.offsetTop - offset,
      behavior: "smooth",
    });

    navLinksContainer.classList.remove("active");

    if (menuButton) {
      menuButton.classList.remove("fa-xmark");
      menuButton.classList.add("fa-bars");
    }
  });
});
