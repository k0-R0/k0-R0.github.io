// SMOOTH SCROLL
document.querySelectorAll("nav a").forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth"
    });
  });
});

// SCROLL ANIMATION (FADE-IN)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll("section").forEach(section => {
  observer.observe(section);
});

// ACTIVE NAV HIGHLIGHT
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(sec => {
    const top = sec.offsetTop;
    if (scrollY >= top - 200) {
      current = sec.id;
    }
  });

  links.forEach(link => {
    link.style.color = "#8892b0";
    if (link.getAttribute("href") === "#" + current) {
      link.style.color = "#64ffda";
    }
  });
});
