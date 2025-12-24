// REVEAL ANIMATIONS
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => { entry.target.classList.add("active"); }, index * 120);
        }
    });
}, { threshold: 0.2 });
document.querySelectorAll(".fade-up, .scale-in").forEach(el => observer.observe(el));

// NAVBAR MOBILE MENU
document.querySelector(".menu-btn").onclick = () => {
    document.querySelector(".nav-links").classList.toggle("active");
};

// THEME TOGGLE
const toggle = document.getElementById("theme-toggle");
toggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    toggle.innerHTML = document.body.classList.contains("light-mode") ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
});

// SCROLL SPY + OFFSET + SMOOTH SCROLL
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function getNavOffset() { return document.querySelector(".navbar").offsetHeight + 10; }

function updateActiveLink() {
    let scrollPos = window.scrollY + window.innerHeight / 2;
    let current = "";
    sections.forEach(section => { if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) current = section.getAttribute("id"); });
    navLinks.forEach(link => { link.classList.remove("active"); if (link.getAttribute("href") === `#${current}`) link.classList.add("active"); });
}
window.addEventListener("scroll", updateActiveLink);
window.addEventListener("load", updateActiveLink);

navLinks.forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        const offset = getNavOffset();
        window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
        document.querySelector(".nav-links").classList.remove("active");
    });
});
