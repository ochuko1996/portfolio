/*================================================
  PRELOADER
================================================*/
window.addEventListener("load", () => {
  const preloader = document.querySelector(".preloader");
  setTimeout(() => {
    preloader.style.opacity = "0";
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 1000);
});

/*================================================
  CUSTOM CURSOR
================================================*/
document.addEventListener("DOMContentLoaded", () => {
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorOutline = document.querySelector(".cursor-dot-outline");

  window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.style.left = `${posX}px`;
    cursorOutline.style.top = `${posY}px`;

    cursorDot.style.opacity = "1";
    cursorOutline.style.opacity = "1";
  });

  window.addEventListener("mouseout", () => {
    cursorDot.style.opacity = "0";
    cursorOutline.style.opacity = "0";
  });

  const links = document.querySelectorAll(
    "a, button, .btn, .nav-toggle, .project-card, .social-link, .filter-btn"
  );
  links.forEach((link) => {
    link.addEventListener("mouseover", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(0.7)";
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
    });

    link.addEventListener("mouseout", () => {
      cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
      cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
    });
  });
});

/*================================================
  STICKY NAVIGATION
================================================*/
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  header.classList.toggle("sticky", window.scrollY > 50);

  // Update active navigation link based on scroll position
  updateActiveNavLink();

  // Show/hide back to top button
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    if (window.scrollY > 500) {
      backToTop.classList.add("active");
    } else {
      backToTop.classList.remove("active");
    }
  }
});

/*================================================
  MOBILE NAVIGATION
================================================*/
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

if (navToggle) {
  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

/*================================================
  SCROLL TO SECTION & ACTIVE NAV LINK
================================================*/
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").substring(1) === current) {
      link.classList.add("active");
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: "smooth",
      });
    }
  });
});

/*================================================
  SKILL PROGRESS ANIMATION
================================================*/
const skillsSection = document.querySelector(".skills");
const skillProgresses = document.querySelectorAll(".skill-progress");

if (skillsSection) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillProgresses.forEach((progress) => {
            const percent = progress.getAttribute("data-percent");
            progress.style.width = `${percent}%`;
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillsObserver.observe(skillsSection);
}

/*================================================
  COUNTER ANIMATION
================================================*/
const statsNumbers = document.querySelectorAll(".stat-number");
const statsSection = document.querySelector(".stats-container");

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          statsNumbers.forEach((number) => {
            const countTo = parseInt(number.getAttribute("data-count"));
            let count = 0;
            const interval = setInterval(() => {
              count += Math.ceil(countTo / 60);
              number.textContent = count;
              if (count >= countTo) {
                number.textContent = countTo;
                clearInterval(interval);
              }
            }, 30);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  statsObserver.observe(statsSection);
}

/*================================================
  PROJECT FILTERING
================================================*/
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Get filter value
      const filter = button.getAttribute("data-filter");

      // Filter projects
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");

        if (filter === "all" || filter === category) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 200);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(20px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

/*================================================
  FORM VALIDATION & SUBMISSION
================================================*/
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate form
    let isValid = true;

    if (name === "") {
      showError("name", "Please enter your name");
      isValid = false;
    } else {
      removeError("name");
    }

    if (email === "") {
      showError("email", "Please enter your email");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("email", "Please enter a valid email");
      isValid = false;
    } else {
      removeError("email");
    }

    if (subject === "") {
      showError("subject", "Please enter a subject");
      isValid = false;
    } else {
      removeError("subject");
    }

    if (message === "") {
      showError("message", "Please enter your message");
      isValid = false;
    } else {
      removeError("message");
    }

    // If form is valid, submit it (in a real application, you'd send this to a server)
    if (isValid) {
      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className = "success-message";
      successMessage.textContent = "Your message has been sent successfully!";
      contactForm.appendChild(successMessage);

      // Reset form
      contactForm.reset();

      // Remove success message after a few seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);
    }
  });
}

// Helper function to show error message
function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const errorMessage = document.createElement("div");
  errorMessage.className = "error-message";
  errorMessage.textContent = message;

  // If error message already exists, don't add another one
  if (!field.parentNode.querySelector(".error-message")) {
    field.parentNode.appendChild(errorMessage);
  }

  field.style.borderColor = "#ff6b6b";
}

// Helper function to remove error message
function removeError(fieldId) {
  const field = document.getElementById(fieldId);
  const errorMessage = field.parentNode.querySelector(".error-message");

  if (errorMessage) {
    errorMessage.remove();
  }

  field.style.borderColor = "";
}

// Helper function to validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/*================================================
  INTERSECTION OBSERVER ANIMATIONS
================================================*/
const fadeElements = document.querySelectorAll(".fade-in");
const slideElements = document.querySelectorAll(".slide-in");

// Fade in animation
if (fadeElements.length > 0) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  fadeElements.forEach((element) => {
    fadeObserver.observe(element);
  });
}

// Slide in animation
if (slideElements.length > 0) {
  const slideObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          slideObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  slideElements.forEach((element) => {
    slideObserver.observe(element);
  });
}

/*================================================
  BACK TO TOP BUTTON
================================================*/
const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
  backToTopButton.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/*================================================
  THEME SWITCHER
================================================*/
document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("themeToggle");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-theme");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    // Update button icon
    if (document.body.classList.contains("dark-theme")) {
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      localStorage.setItem("theme", "light");
    }
  });

  // Listen for system theme changes
  prefersDarkScheme.addEventListener("change", (e) => {
    if (!localStorage.getItem("theme")) {
      if (e.matches) {
        document.body.classList.add("dark-theme");
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      } else {
        document.body.classList.remove("dark-theme");
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    }
  });
});
