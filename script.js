(function () {
  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // --- Nav scroll state ---
  var nav = document.getElementById("nav");
  var onScroll = function () {
    if (window.scrollY > 12) nav.classList.add("is-scrolled");
    else nav.classList.remove("is-scrolled");
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // --- Theme toggle ---
  var themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", function () {
    var current =
      document.documentElement.getAttribute("data-theme") === "light"
        ? "light"
        : "dark";
    var next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch (e) { }
  });

  // --- Mobile menu toggle ---
  var toggle = document.getElementById("nav-toggle");
  toggle.addEventListener("click", function () {
    nav.classList.toggle("is-mobile-open");
    toggle.classList.toggle("is-open");
  });
  document.querySelectorAll("#nav-mobile a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("is-mobile-open");
      toggle.classList.remove("is-open");
    });
  });

  // --- Scroll reveal ---
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // --- Count-up stats ---
  var counters = document.querySelectorAll("[data-count]");
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-target"));
    var decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
    if (reduceMotion || isNaN(target)) {
      el.textContent = target.toFixed(decimals);
      return;
    }
    var duration = 1400;
    var start = null;
    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    }
    requestAnimationFrame(step);
  }
  if ("IntersectionObserver" in window) {
    var counterIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            counterIo.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );
    counters.forEach(function (el) {
      counterIo.observe(el);
    });
  } else {
    counters.forEach(animateCount);
  }

  // --- More projects toggle ---
  var projectsMore = document.getElementById("projects-more");
  var projectsToggle = document.getElementById("projects-toggle");

  if (projectsMore && projectsToggle) {
    var projectsLabel = projectsToggle.querySelector(
      ".projects-toggle__label",
    );

    var isMobile = window.matchMedia("(max-width: 700px)");

    projectsToggle.addEventListener("click", function () {
      var isOpen = projectsMore.classList.contains("is-open");

      // =========================
      // OPEN
      // =========================
      if (!isOpen) {
        projectsMore.classList.add("is-open");
        projectsToggle.classList.add("is-open");
        projectsToggle.setAttribute("aria-expanded", "true");

        if (projectsLabel) {
          projectsLabel.textContent = "View Less";
        }

        return;
      }

      // =========================
      // CLOSE — DESKTOP
      // =========================
      if (!isMobile.matches) {
        projectsMore.classList.remove("is-open");
        projectsToggle.classList.remove("is-open");
        projectsToggle.setAttribute("aria-expanded", "false");

        if (projectsLabel) {
          projectsLabel.textContent = "View More";
        }

        return;
      }

      // =========================
      // CLOSE — MOBILE / iOS
      // =========================

      // Remember exactly where the toggle is on screen.
      var beforeTop = projectsToggle.getBoundingClientRect().top;

      // Remember current scroll position.
      var beforeScrollY = window.scrollY;

      // Disable smooth scrolling temporarily.
      var html = document.documentElement;
      var previousScrollBehavior = html.style.scrollBehavior;

      html.style.scrollBehavior = "auto";

      // Disable the max-height animation.
      projectsMore.classList.add("is-collapsing");

      // Collapse immediately.
      projectsMore.classList.remove("is-open");

      // Force Safari to apply the new layout NOW.
      void projectsMore.offsetHeight;

      // Measure where the button moved after the collapse.
      var afterTop = projectsToggle.getBoundingClientRect().top;

      // If the button moved upward because the projects
      // disappeared, move the viewport by exactly the
      // same amount in the opposite direction.
      var correction = afterTop - beforeTop;

      if (Math.abs(correction) > 0.5) {
        window.scrollTo(0, beforeScrollY + correction);
      }

      projectsToggle.classList.remove("is-open");
      projectsToggle.setAttribute("aria-expanded", "false");

      if (projectsLabel) {
        projectsLabel.textContent = "View More";
      }

      // Restore normal behavior after Safari has
      // finished processing the synchronous layout change.
      requestAnimationFrame(function () {
        projectsMore.classList.remove("is-collapsing");
        html.style.scrollBehavior = previousScrollBehavior;
      });
    });
  }

  // ============ BOOT ANIMATION ============
  (function () {
    const STEPS = [
      { text: "Initialising...", delay: 0 },
      { text: "Spinning...", delay: 380 },
      { text: "Mounting....", delay: 700 },
      { text: "Connecting..", delay: 1050 },
      { text: "Loading....", delay: 1380 },
      { text: "All systems nominal", delay: 1680, ok: true },
    ];
    const PERCENTS = [0, 18, 35, 55, 72, 88, 100];
    const overlay = document.getElementById("boot-overlay");
    const mark = document.getElementById("boot-mark");
    const linesEl = document.getElementById("boot-lines");
    const bar = document.getElementById("boot-bar");
    const pct = document.getElementById("boot-pct");

    function setBar(v) {
      bar.style.width = v + "%";
      pct.innerHTML = "<span>" + v + "</span>%";
    }

    setTimeout(() => {
      mark.classList.add("boot-visible");
      setBar(0);
    }, 200);

    STEPS.forEach((step, i) => {
      setTimeout(() => {
        const line = document.createElement("div");
        line.className = "boot-line" + (step.ok ? " boot-ok" : "");
        line.innerHTML =
          '<span class="boot-prefix">' +
          (step.ok ? "✓" : "›") +
          "</span>" +
          "<span>" +
          step.text +
          (step.ok ? "" : "...") +
          "</span>";
        linesEl.appendChild(line);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => line.classList.add("boot-show")),
        );
        setBar(PERCENTS[i + 1]);
      }, step.delay + 600);
    });

    const total = STEPS[STEPS.length - 1].delay + 1120;
    setTimeout(() => {
      overlay.classList.add("boot-done");
      setTimeout(() => {
        overlay.style.display = "none";
      }, 650);
    }, total);
  })();
})();
