const sections = [...document.querySelectorAll("section")];
const links = [...document.querySelectorAll(".nav-link")];
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const topOffset = 72;

let isScrollingFromClick = false;

links.forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    event.preventDefault();

    const target = document.querySelector(anchor.getAttribute("href"));
    if (!target) return;

    isScrollingFromClick = true;
    
    // Manually set the active state for the clicked link immediately
    const targetId = anchor.getAttribute("href").substring(1);
    updateActiveState(targetId);

    const top = target.getBoundingClientRect().top + window.scrollY - topOffset;
    
    window.scrollTo({
      top,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    // Re-enable auto-scroll highlighting after the smooth scroll finishes
    setTimeout(() => {
      isScrollingFromClick = false;
    }, 800); // Matches standard smooth scroll duration
  });
});

// ... (observer logic remains)

let lastId = "";

function updateActiveState(currentId) {
  if (currentId && currentId !== lastId) {
    lastId = currentId;
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
}

function setActiveLink() {
  if (isScrollingFromClick) return; // Silence during jumps

  let currentId = "";
  const scrollPosition = window.scrollY + topOffset + 100;

  // Check if we are at the bottom of the page
  const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 30;

  if (isAtBottom && sections.length > 0) {
    currentId = sections[sections.length - 1].id;
  } else {
    // Find the current section (iterating backwards for accuracy)
    for (let i = sections.length - 1; i >= 0; i--) {
      if (scrollPosition >= sections[i].offsetTop) {
        currentId = sections[i].id;
        break;
      }
    }
  }

  // Only update DOM if the active section has actually changed
  if (currentId && currentId !== lastId) {
    lastId = currentId;
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
}

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      setActiveLink();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

window.addEventListener("load", setActiveLink);
setActiveLink();
