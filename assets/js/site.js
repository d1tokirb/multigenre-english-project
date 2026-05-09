const nav = document.querySelector(".site-nav");
const toggle = document.querySelector(".nav-toggle");
const normalizePage = (value) => {
  const name = value.split("/").pop() || "index.html";
  return name.replace(/\.html$/, "") || "index";
};
const current = normalizePage(location.pathname);

document.querySelectorAll(".site-nav a").forEach((link) => {
  const target = link.getAttribute("href");
  if (normalizePage(target) === current) {
    link.classList.add("active");
  }

  link.addEventListener("click", (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http")) return;
    event.preventDefault();
    document.querySelector(".main")?.classList.add("leaving");
    setTimeout(() => {
      window.location.href = href;
    }, 140);
  });
});

toggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(isOpen));
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));

document.addEventListener("mousemove", (event) => {
  const visual = document.querySelector(".hero-visual");
  if (!visual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * 10;
  visual.style.transform = `translate3d(${x}px, ${y}px, 0)`;
});
