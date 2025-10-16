document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("show"); // importante: a classe é "show"
  });

  document.addEventListener("click", (e) => {
    const clicouFora =
      !hamburger.contains(e.target) && !navLinks.contains(e.target);
    if (clicouFora) {
      hamburger.classList.remove("active");
      navLinks.classList.remove("show");
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("show");
    });
  });
});
