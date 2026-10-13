// Set the footer year automatically
document.getElementById("year").textContent = new Date().getFullYear();

// Collapsible mobile menu — hides the nav links behind a hamburger icon
// on small screens where they don't all fit on one line.
function toggleNav() {
  var links = document.getElementById("mainNavLinks");
  var btn = document.querySelector(".nav-toggle");
  var isOpen = links.classList.toggle("open");
  btn.classList.toggle("open", isOpen);
  btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

// Close the mobile menu automatically after a link is tapped
document.addEventListener("DOMContentLoaded", function () {
  var links = document.getElementById("mainNavLinks");
  links.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      if (links.classList.contains("open")) {
        links.classList.remove("open");
        document.querySelector(".nav-toggle").classList.remove("open");
        document.querySelector(".nav-toggle").setAttribute("aria-expanded", "false");
      }
    });
  });
});

// Expand/collapse each paper's abstract when its button is clicked.
// This is what lets new papers be added later with no extra JS needed —
// each card wires itself up the same way.
document.querySelectorAll(".paper-card").forEach(function (card) {
  var button = card.querySelector(".toggle-btn");
  var abstract = card.querySelector(".abstract");

  button.addEventListener("click", function () {
    var isHidden = abstract.hasAttribute("hidden");

    if (isHidden) {
      abstract.removeAttribute("hidden");
      button.textContent = "Show less";
      button.setAttribute("aria-expanded", "true");
    } else {
      abstract.setAttribute("hidden", "");
      button.textContent = "Read more";
      button.setAttribute("aria-expanded", "false");
    }
  });
});
