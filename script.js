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

// ---------- Blog: publish a new post ----------
// Posts are added to the page right away (kept in memory only, so they
// reset when the page is refreshed — there is no server in this project).
(function () {
  var form = document.getElementById("blogForm");
  if (!form) return;
  var list = document.getElementById("blogPosts");
  var error = document.getElementById("blogError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var title = document.getElementById("postTitle").value.trim();
    var body = document.getElementById("postBody").value.trim();
    if (!title || !body) {
      error.textContent = "Please add a title and write your article before publishing.";
      error.hidden = false;
      return;
    }
    error.hidden = true;

    var card = document.createElement("article");
    card.className = "blog-card";

    var file = document.getElementById("postPhoto").files[0];
    if (file && file.type.indexOf("image/") === 0) {
      var img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.alt = "Photo for " + title;
      card.appendChild(img);
    }

    var badge = document.createElement("span");
    badge.className = "badge badge-new";
    badge.textContent = "new";
    var h3 = document.createElement("h3");
    h3.textContent = title;
    var date = document.createElement("p");
    date.className = "post-date";
    date.textContent = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    var p = document.createElement("p");
    p.className = "post-body";
    p.textContent = body;

    card.appendChild(badge);
    card.appendChild(h3);
    card.appendChild(date);
    card.appendChild(p);
    list.insertBefore(card, list.firstChild);
    form.reset();
  });
})();

// ---------- Contact form ----------
(function () {
  var form = document.getElementById("contactForm");
  if (!form) return;
  var error = document.getElementById("contactError");
  var ok = document.getElementById("contactOk");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    ok.hidden = true;
    var name = document.getElementById("cName").value.trim();
    var email = document.getElementById("cEmail").value.trim();
    var message = document.getElementById("cMsg").value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !emailOk || !message) {
      error.textContent = "Please enter your name, a valid email address and a message.";
      error.hidden = false;
      return;
    }
    error.hidden = true;
    ok.textContent = "Thanks, " + name + "! Your message has been sent.";
    ok.hidden = false;
    form.reset();
  });
})();
