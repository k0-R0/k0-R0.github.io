const sections = [...document.querySelectorAll("section")];
const links = [...document.querySelectorAll(".nav-link")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const topOffset = 72;

links.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    event.preventDefault();

    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) {
      return;
    }

    const top = target.getBoundingClientRect().top + window.scrollY - topOffset;
    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  });
});

if (prefersReducedMotion) {
  sections.forEach((section) => section.classList.add("visible"));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function setActiveLink() {
  let currentId = sections[0] ? sections[0].id : "";
  const scrollPosition = window.scrollY + topOffset + 24;

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentId = section.id;
    }
  });

  links.forEach((link) => {
    const isActive = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("is-active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);
setActiveLink();
