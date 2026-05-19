const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const form = document.querySelector(".quote-form");
const statusText = document.querySelector(".form-status");

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  navToggle.classList.toggle("is-open", !isOpen);
  navLinks.classList.toggle("is-open", !isOpen);
});

navLinks.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.classList.remove("is-open");
    navLinks.classList.remove("is-open");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = new FormData(form);
  const name = formData.get("name").toString().trim().split(" ")[0] || "there";
  statusText.textContent = `Thanks, ${name}. Your move request has been received.`;
  form.reset();
});
