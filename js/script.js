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
    "a, button, .btn, .nav-toggle, .project-card, .social-link, .filter-btn",
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
function initializeSkillProgressAnimation() {
  const skillsSection = document.querySelector(".skills");
  const skillProgresses = document.querySelectorAll(".skill-progress");

  if (skillsSection && skillProgresses.length > 0) {
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
      { threshold: 0.3 },
    );

    skillsObserver.observe(skillsSection);
  }
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
    { threshold: 0.5 },
  );

  statsObserver.observe(statsSection);
}

/*================================================
  PROJECT FILTERING
================================================*/
// Moved to initializeProjectFilters function below

/*================================================
  FORM VALIDATION & SUBMISSION
================================================*/
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;

    if (name === "") {
      showError("name", "Please enter your name");
      isValid = false;
    } else removeError("name");

    if (email === "") {
      showError("email", "Please enter your email");
      isValid = false;
    } else if (!isValidEmail(email)) {
      showError("email", "Please enter a valid email");
      isValid = false;
    } else removeError("email");

    if (subject === "") {
      showError("subject", "Please enter a subject");
      isValid = false;
    } else removeError("subject");

    if (message === "") {
      showError("message", "Please enter your message");
      isValid = false;
    } else removeError("message");

    if (!isValid) return;

    // 🔥 SEND VIA EMAILJS
    emailjs
      .send("service_a53tanx", "template_1kgr1os", {
        name,
        email,
        subject,
        message,
      })
      .then(() => {
        const successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.textContent = "Your message has been sent successfully!";
        contactForm.appendChild(successMessage);

        contactForm.reset();

        setTimeout(() => successMessage.remove(), 5000);
      })
      .catch((error) => {
        console.error("EmailJS Error:", error);
        alert("Failed to send message. Please try again.");
      });
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
    { threshold: 0.1 },
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
    { threshold: 0.1 },
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

/*================================================
  DYNAMIC EXPERIENCE SECTION
================================================*/
const experienceData = [
  {
    date: "February 2024 - Present",
    title: "Software Engineer",
    company: "Kadmap Systems Limited",
    description: [
      "Architected and developed <strong>Kadmap Connect</strong> distribution ecosystem comprising two React Native mobile applications",
      "Built a real-time <strong>Conversation</strong> application using React, TypeScript, and Convex DB that improved customer-distributor communication efficiency by 40%",
      "Engineered a secure <strong>File Management</strong> system with role-based access control, reducing document retrieval time by 60%",
      "Developed a <strong>Review</strong> application that increased client feedback collection by 75%",
      "Implemented Redux state management architecture for consistent data flow across multiple interfaces",
    ],
  },
  {
    date: "January 2024 - Present",
    title: "Frontend Developer",
    company: "La Chariz Group",
    description: [
      "Spearheaded the development of three corporate websites that collectively increased online visibility by 120%",
      "Designed and implemented responsive UIs with Next.js and React.js, resulting in a 25% increase in conversion rates",
      "Integrated Firebase backend services, including authentication and real-time database for seamless experiences",
      "Optimized site performance through lazy loading and code splitting, improving page load times by 40%",
    ],
  },
  {
    date: "March 2021 - January 2024",
    title: "Web Developer & Assistant Instructor",
    company: "Dominion Youth Empowerment Network (DYEN)",
    description: [
      "Developed a high-impact web platform that successfully attracted over 11,542 applicants",
      "Designed an interactive learning management system that improved student engagement by 52%",
      "Instructed and mentored more than 200 students in web development, with 85% reporting career transitions",
      "Created comprehensive learning materials covering HTML, CSS, JavaScript, and React.js",
    ],
  },
  // {
  //   date: "June 2020 - February 2021",
  //   title: "Administrative Assistant",
  //   company: "Foursquare Gospel Church, DST District",
  //   description: [
  //     "Managed essential office operations including document management and report generation",
  //     "Created detailed financial reports that improved organizational decision-making processes",
  //     "Developed a digital filing system that reduced document retrieval time by 65%",
  //     "Coordinated logistics for community outreach programs serving 300+ participants monthly",
  //   ],
  // },
];

function renderExperience() {
  const experienceContainer = document.getElementById("experience-timeline");

  if (experienceContainer) {
    experienceContainer.innerHTML = ""; // Clear existing content just in case
    experienceData.forEach((item) => {
      const timelineItem = document.createElement("div");
      timelineItem.className = "timeline-item relative mb-12 last:mb-0";

      const descriptionList = item.description
        .map(
          (desc) =>
            `<li class="mb-2.5 relative pl-5 before:content-['•'] before:absolute before:left-0 before:text-primary">${desc}</li>`,
        )
        .join("");

      timelineItem.innerHTML = `
        <div class="timeline-marker absolute w-5 h-5 bg-primary border-[3px] border-light dark:border-dark-bg rounded-full left-[-10px] md:left-[calc(50%-10px)] top-0 z-10 shadow-small"></div>
        <div class="timeline-content relative pl-8 md:w-1/2 md:pl-0 md:pr-12 md:text-right md:left-0 md:ml-0 [&:nth-child(even)]:md:left-1/2 [&:nth-child(even)]:md:pl-12 [&:nth-child(even)]:md:pr-0 [&:nth-child(even)]:md:text-left">
          <div class="timeline-date inline-block px-4 py-1.5 bg-grey-200 dark:bg-dark-surface text-dark dark:text-dark-text rounded-full text-sm font-medium mb-4 shadow-small">${item.date}</div>
          <h3 class="timeline-title text-xl font-bold mb-1.5 text-dark dark:text-dark-text">${item.title}</h3>
          <div class="timeline-company text-lg font-medium text-primary mb-4">${item.company}</div>
          <ul class="timeline-description list-none p-0 m-0 text-dark-300 dark:text-dark-muted text-base leading-relaxed text-left">
            ${descriptionList}
          </ul>
        </div>
      `;

      // Add specific classes for alternating layout on desktop
      // Note: The structure here is simplified compared to the CSS version which used complex nth-child selectors
      // For a true alternating timeline, we need to adjust the HTML structure slightly or use more specific classes

      // Let's adjust the content for alternating layout
      if (experienceContainer.children.length % 2 === 1) {
        // Right side item (for desktop)
        timelineItem.innerHTML = `
          <div class="timeline-marker absolute w-5 h-5 bg-primary border-[3px] border-light dark:border-dark-bg rounded-full left-[-10px] md:left-[calc(50%-10px)] top-0 z-10 shadow-small"></div>
          <div class="timeline-content relative pl-8 md:w-1/2 md:ml-[50%] md:pl-12 text-left">
            <div class="timeline-date inline-block px-4 py-1.5 bg-grey-200 dark:bg-dark-surface text-dark dark:text-dark-text rounded-full text-sm font-medium mb-4 shadow-small">${item.date}</div>
            <h3 class="timeline-title text-xl font-bold mb-1.5 text-dark dark:text-dark-text">${item.title}</h3>
            <div class="timeline-company text-lg font-medium text-primary mb-4">${item.company}</div>
            <ul class="timeline-description list-none p-0 m-0 text-dark-300 dark:text-dark-muted text-base leading-relaxed">
              ${descriptionList}
            </ul>
          </div>
        `;
      } else {
        // Left side item (for desktop)
        timelineItem.innerHTML = `
          <div class="timeline-marker absolute w-5 h-5 bg-primary border-[3px] border-light dark:border-dark-bg rounded-full left-[-10px] md:left-[calc(50%-10px)] top-0 z-10 shadow-small"></div>
          <div class="timeline-content relative pl-8 md:w-1/2 md:pr-12 md:text-right text-left">
            <div class="timeline-date inline-block px-4 py-1.5 bg-grey-200 dark:bg-dark-surface text-dark dark:text-dark-text rounded-full text-sm font-medium mb-4 shadow-small">${item.date}</div>
            <h3 class="timeline-title text-xl font-bold mb-1.5 text-dark dark:text-dark-text">${item.title}</h3>
            <div class="timeline-company text-lg font-medium text-primary mb-4">${item.company}</div>
            <ul class="timeline-description list-none p-0 m-0 text-dark-300 dark:text-dark-muted text-base leading-relaxed text-left md:text-right">
              ${descriptionList}
            </ul>
          </div>
        `;
      }

      experienceContainer.appendChild(timelineItem);
    });
  }
}

// Call the function when the DOM is loaded
document.addEventListener("DOMContentLoaded", renderExperience);

/*================================================
  DYNAMIC SKILLS SECTION
================================================*/
const skillsData = [
  {
    category: "Frontend Development",
    skills: [
      { name: "React.js", icon: "fab fa-react", percent: 95 },
      { name: "Next.js", icon: "fab fa-react", percent: 90 },
      { name: "JavaScript", icon: "fab fa-js", percent: 95 },
      { name: "TypeScript", icon: "fab fa-js", percent: 85 },
    ],
  },
  {
    category: "Mobile Development",
    skills: [
      { name: "React Native", icon: "fab fa-react", percent: 90 },
      { name: "Expo", icon: "fab fa-app-store-ios", percent: 85 },
      { name: "Flutter", icon: "fas fa-mobile-alt", percent: 75 },
    ],
  },
  {
    category: "Backend & Database",
    skills: [
      { name: "Node.js", icon: "fab fa-node-js", percent: 80 },
      { name: "MongoDB", icon: "fas fa-database", percent: 85 },
      { name: "Firebase", icon: "fas fa-fire", percent: 90 },
      { name: "Django", icon: "fab fa-python", percent: 70 },
    ],
  },
];

function renderSkills() {
  const skillsContainer = document.getElementById("skills-container");

  if (skillsContainer) {
    skillsContainer.innerHTML = "";
    skillsData.forEach((categoryData) => {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "skill-category mb-8";

      const categoryTitle = document.createElement("h3");
      categoryTitle.className =
        "category-title text-2xl mb-8 text-dark dark:text-dark-text relative pl-4 before:content-[''] before:absolute before:left-0 before:top-0 before:w-[5px] before:h-full before:bg-primary";
      categoryTitle.textContent = categoryData.category;
      categoryDiv.appendChild(categoryTitle);

      const skillsGrid = document.createElement("div");
      skillsGrid.className =
        "skills-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8";

      categoryData.skills.forEach((skill, index) => {
        const skillCard = document.createElement("div");
        skillCard.className =
          "skill-card p-8 rounded-md bg-grey-100 dark:bg-dark-surface transition-fast text-center hover:-translate-y-1 hover:shadow-medium hover:bg-light dark:hover:bg-dark-bg";
        skillCard.setAttribute("data-aos", "fade-up");
        if (index > 0) {
          skillCard.setAttribute("data-aos-delay", `${index * 100}`);
        }

        skillCard.innerHTML = `
          <div class="skill-icon text-4xl text-primary mb-5">
            <i class="${skill.icon}"></i>
          </div>
          <h4 class="skill-name text-lg font-medium mb-4 text-dark dark:text-dark-text">${skill.name}</h4>
          <div class="skill-bar w-full h-1.5 bg-grey-300 dark:bg-dark-border rounded-sm overflow-hidden">
            <div class="skill-progress h-full bg-primary rounded-sm w-0 transition-all duration-1500 ease-out" data-percent="${skill.percent}"></div>
          </div>
        `;

        skillsGrid.appendChild(skillCard);
      });

      categoryDiv.appendChild(skillsGrid);
      skillsContainer.appendChild(categoryDiv);
    });
  }
}

function initializeSkills() {
  renderSkills();
  // Initialize skill progress animation after skills are rendered
  setTimeout(() => {
    initializeSkillProgressAnimation();
  }, 100);
}

document.addEventListener("DOMContentLoaded", initializeSkills);

/*================================================
  DYNAMIC CERTIFICATIONS SECTION
================================================*/
const certificationsData = [
  {
    title: "Django Application Development with SQL and Databases",
    issuer: "IBM",
    date: "Aug 2024",
    icon: "fab fa-ibm",
    credentialId: "PNAGBWXI8HOO",
    verifyLink:
      "https://www.coursera.org/account/accomplishments/verify/PNAGBWXI8HOO", // Add link if available
  },
  {
    title: "Developing AI Applications with Python and Flask",
    issuer: "IBM",
    date: "Jul 2024",
    icon: "fab fa-ibm",
    credentialId: "W3E8TYXCQFYP",
    verifyLink:
      "https://www.coursera.org/account/accomplishments/verify/W3E8TYXCQFYP",
  },
  {
    title: "Getting Started with Git and GitHub",
    issuer: "IBM",
    date: "Apr 2024",
    icon: "fab fa-ibm",
    credentialId: "T833HSV9RX69",
    verifyLink:
      "https://www.coursera.org/account/accomplishments/verify/T833HSV9RX69",
  },
  {
    title: "Introduction to Web Development with HTML, CSS, JavaScript",
    issuer: "IBM",
    date: "Apr 2024",
    icon: "fab fa-ibm",
    credentialId: "6N56ALH6HQVE",
    verifyLink:
      "https://www.coursera.org/account/accomplishments/records/6N56ALH6HQVE",
  },
  {
    title: "Introduction to Cloud Computing",
    issuer: "IBM",
    date: "Mar 2024",
    icon: "fab fa-ibm",
    credentialId: "XDEZQJYYZTNP",
    verifyLink:
      "https://www.coursera.org/account/accomplishments/records/XDEZQJYYZTNP",
  },
  {
    title: "Advance your Node.js Skills",
    issuer: "LinkedIn Learning",
    date: "Sep 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink:
      "https://www.linkedin.com/learning/certificates/02ed9d81a8fa4b491b6a3f153476a4efc75dda632f667fca729e75717dd76d53?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlQR00yKOSoebEOwGdZRcIg%3D%3D",
  },
  {
    title: "Advanced Express",
    issuer: "LinkedIn Learning",
    date: "Sep 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink:
      "https://www.linkedin.com/learning/certificates/834a5bf9ff9a53effe71e0f6b672dd2aca7f2b176be820c2be9f3240f4e4fe33?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlQR00yKOSoebEOwGdZRcIg%3D%3D",
  },
  {
    title: "Advanced Node.js",
    issuer: "LinkedIn Learning",
    date: "Sep 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink: null,
  },
  {
    title: "Advanced Node.js: Scaling Applications",
    issuer: "LinkedIn Learning",
    date: "Sep 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink:
      "https://www.linkedin.com/learning/certificates/6d2bf498ccfd8184c3e8a38e2abb2cdbf44a809aba109f85be3ec65944760811?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlQR00yKOSoebEOwGdZRcIg%3D%3D",
  },
  {
    title: "Node.js: Debugging and Performance Tuning",
    issuer: "LinkedIn Learning",
    date: "Sep 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink:
      "https://www.linkedin.com/learning/certificates/e1bd5de2a8ce807086629f2b353cdfba46659b76617349a4325480c756078417?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlQR00yKOSoebEOwGdZRcIg%3D%3D",
  },
  {
    title: "Node.js: Design Patterns",
    issuer: "LinkedIn Learning",
    date: "Sep 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink:
      "https://www.linkedin.com/learning/certificates/518fddb4493a2f226b29e7ef4b91d49495bbf611a2782630c3fdec90eaea7c6c?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BlQR00yKOSoebEOwGdZRcIg%3D%3D",
  },
  {
    title: "Node.js: Security",
    issuer: "LinkedIn Learning",
    date: "Sep 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink:
      "https://www.linkedin.com/learning/certificates/f75dcec7292e0825ce7b1bbd89e154b477f460158e5c2fda0e2569f9d4da0276?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BWg65UU8xQr22i%2BVlDeLPEg%3D%3D",
  },
  {
    title: "Node.js: Testing and Code Quality",
    issuer: "LinkedIn Learning",
    date: "Sep 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink:
      "https://www.linkedin.com/learning/certificates/332cc711fec31249f8e2e3f23f5b7c59c84dd589c02ac5e78578c8819441ada0?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BWg65UU8xQr22i%2BVlDeLPEg%3D%3D",
  },
  {
    title: "React: Authentication",
    issuer: "LinkedIn Learning",
    date: "Sep 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink:
      "https://www.linkedin.com/learning/certificates/e155e7f7b06e933897515186745e95bfbfd500e6d2f1516a1d14a91b5cadc73b?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BauNLL%2BdYQ1i1rTSuU8SGjg%3D%3D",
  },
  {
    title: "MERN Essential Training (2020)",
    issuer: "LinkedIn Learning",
    date: "Aug 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink:
      "https://www.linkedin.com/learning/certificates/c68ab29145a8aec152b4b44522934ef4b8c7b4c5092bbc46b1edc5a00506e9b1?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BauNLL%2BdYQ1i1rTSuU8SGjg%3D%3D",
  },
  {
    title: "React: Design Patterns",
    issuer: "LinkedIn Learning",
    date: "Aug 2023",
    icon: "fab fa-linkedin",
    credentialId: null,
    verifyLink:
      "https://www.linkedin.com/learning/certificates/0aa86c024f5b6a091257c8c0ecebec6a9e5c1ed9e6a628e3c92928b8818d41f5?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BauNLL%2BdYQ1i1rTSuU8SGjg%3D%3D",
  },
];

let showAllCertifications = false;

function renderCertifications() {
  const certificationsContainer = document.getElementById(
    "certifications-slider",
  );

  if (certificationsContainer) {
    certificationsContainer.innerHTML = "";

    // Determine how many certifications to show
    const certsToShow = showAllCertifications
      ? certificationsData
      : certificationsData.slice(0, 3);

    certsToShow.forEach((cert, index) => {
      const certCard = document.createElement("div");
      certCard.className =
        "cert-card p-8 text-center rounded-md bg-grey-100 dark:bg-dark-surface transition-fast hover:-translate-y-1 hover:shadow-medium hover:bg-light dark:hover:bg-dark-bg";

      let credentialInfo = "";
      if (cert.credentialId) {
        credentialInfo = `<div class="cert-credential text-sm text-dark-200 dark:text-dark-muted mt-2.5 font-mono">Credential ID: ${cert.credentialId}</div>`;
      }

      let verifyButton = "";
      if (cert.verifyLink) {
        verifyButton = `<a href="${cert.verifyLink}" target="_blank" class="cert-verify-btn inline-block mt-4 px-4 py-2 bg-primary text-light rounded-sm text-sm font-medium transition-fast hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-small">Verify Credential</a>`;
      }

      // Create custom icon for IBM (Coursera) certifications
      let iconHtml = "";
      if (cert.issuer === "IBM") {
        iconHtml = `<div class="cert-icon cert-icon-custom w-[60px] h-[60px] rounded-full bg-primary flex items-center justify-center mx-auto mb-5 shadow-small transition-fast group-hover:scale-110 group-hover:shadow-medium"><span class="cert-letter text-3xl font-bold text-light font-primary">C</span></div>`;
      } else {
        iconHtml = `<div class="cert-icon text-4xl text-primary mb-5"><i class="${cert.icon}"></i></div>`;
      }

      certCard.innerHTML = `
        ${iconHtml}
        <h3 class="cert-title text-xl mb-4 min-h-[60px] flex items-center justify-center text-dark dark:text-dark-text">${cert.title}</h3>
        <div class="cert-issuer font-medium mb-2.5 text-dark-300 dark:text-dark-muted">${cert.issuer}</div>
        <div class="cert-date text-sm text-dark-300 dark:text-dark-muted">${cert.date}</div>
        ${credentialInfo}
        ${verifyButton}
      `;

      certificationsContainer.appendChild(certCard);
    });
  }
}

function addCertificationsViewMoreButton() {
  const certificationsSection = document.querySelector(
    "#certifications .container",
  );

  if (certificationsSection && certificationsData.length > 3) {
    // Check if button already exists
    let viewMoreBtn = document.getElementById("cert-view-more-btn");

    if (!viewMoreBtn) {
      viewMoreBtn = document.createElement("div");
      viewMoreBtn.id = "cert-view-more-btn";
      viewMoreBtn.className = "cert-view-more text-center mt-10";
      viewMoreBtn.innerHTML = `<button class="btn btn-outline inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-sm font-medium text-base transition-all duration-fast bg-transparent text-dark dark:text-dark-text border-2 border-dark dark:border-dark-text hover:bg-dark hover:text-light hover:-translate-y-1 hover:shadow-medium">View More Certifications</button>`;
      certificationsSection.appendChild(viewMoreBtn);

      viewMoreBtn.querySelector("button").addEventListener("click", () => {
        showAllCertifications = !showAllCertifications;
        renderCertifications();

        // Update button text
        const btnText = showAllCertifications
          ? "View Less"
          : "View More Certifications";
        viewMoreBtn.querySelector("button").textContent = btnText;
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderCertifications();
  addCertificationsViewMoreButton();
});

/*================================================
  DYNAMIC PROJECTS SECTION
================================================*/
const projectsData = [
  // {
  //   categories: ["fullstack"],
  //   image: "assets/img/conversation-app.jpg",
  //   title: "Kadmap Conversation App",
  //   links: {
  //     live: "#",
  //     github: "https://github.com/ochuko1996/kadmap-conversation",
  //   },
  //   tags: ["React.js", "TypeScript", "ConvexDB"],
  //   description:
  //     "Real-time messaging platform enabling seamless communication between distributors and customers, improving response efficiency and operational coordination.",
  // },
  // {
  //   categories: ["mobile"],
  //   image: "assets/img/kadmap.jpg",
  //   title: "Kadmap Connect Distribution Platform",
  //   links: {
  //     live: "#",
  //     github: "https://github.com/ochuko1996/kadmap-connect",
  //   },
  //   tags: ["React Native", "TypeScript", "Redux"],
  //   description:
  //     "Mobile distribution ecosystem designed to streamline workflows and improve engagement between distributors and customers.",
  // },
  {
    categories: ["web"],
    image: "assets/img/innovation.png",
    title: "La Chariz Innovations Website",
    links: {
      live: "https://lacharizinnovations.com",
      github: null,
    },
    tags: ["Next.js", "React", "Firebase"],
    description:
      "Corporate website showcasing digital services and brand offerings with a modern, responsive UI for improved visibility and engagement.",
  },
  {
    categories: ["web", "fullstack"],
    image: "assets/img/interior.png",
    title: "La Chariz Interiors E-commerce Platform",
    links: {
      live: "https://lacharizinteriors.com",
      github: null,
    },
    tags: ["Next.js", "E-commerce", "Payments"],
    description:
      "Full-featured interior e-commerce website with product listings, cart functionality, and secure payment gateway integration.",
  },
  {
    categories: ["web", "fullstack"],
    image: "assets/img/bravort.png",
    title: "Bravort Learning & Certification Platform",
    links: {
      live: "https://bravort.com",
      github: null,
    },
    tags: ["Next.js", "Payments", "Certification Verification"],
    description:
      "Educational platform enabling course enrollment, online payments, and certificate verification for graduates and employers.",
  },
  {
    categories: ["web"],
    image: "assets/img/dyen.png",
    title: "DYEN Youth Empowerment Platform",
    links: {
      live: "https://dyen.org",
      github: null,
    },
    tags: ["HTML", "CSS", "JavaScript"],
    description:
      "Non-profit website that attracted over 5,000 applicants and supported youth training programs in web development and digital skills.",
  },
  {
    categories: ["web", "fullstack"],
    image: "assets/img/gridintel.png",
    title: "Gridintel Web Platform & CMS",
    links: {
      live: "https://gridintelrg.com",
      github: null,
    },
    tags: ["React (Vite)", "Next.js", "ConvexDB", "CMS", "Full Stack"],
    description:
      "Scalable web platform built for Gridintel featuring a custom CMS, real-time data handling, and a modern UI. Designed and deployed to support dynamic content management and business growth.",
  },
];

function renderProjects() {
  const projectsContainer = document.getElementById("projects-grid");

  if (projectsContainer) {
    projectsContainer.innerHTML = "";
    projectsData.forEach((project) => {
      const projectCard = document.createElement("div");
      projectCard.className =
        "project-card relative rounded-md overflow-hidden bg-grey-100 dark:bg-dark-surface transition-fast hover:-translate-y-1 hover:shadow-medium group";
      // Store categories as a comma-separated string for filtering
      projectCard.setAttribute("data-categories", project.categories.join(","));

      const tagsHtml = project.tags
        .map(
          (tag) =>
            `<span class="project-tag inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">${tag}</span>`,
        )
        .join("");

      let linksHtml = "";
      if (project.links.live) {
        linksHtml += `<a href="${project.links.live}" class="project-link w-10 h-10 rounded-full bg-light text-primary flex items-center justify-center text-lg transition-fast hover:bg-primary hover:text-light" target="_blank"><i class="fas fa-link"></i></a>`;
      }
      if (project.links.github) {
        linksHtml += `<a href="${project.links.github}" class="project-link w-10 h-10 rounded-full bg-light text-primary flex items-center justify-center text-lg transition-fast hover:bg-primary hover:text-light" target="_blank"><i class="fab fa-github"></i></a>`;
      }

      projectCard.innerHTML = `
        <div class="project-image relative h-[200px] overflow-hidden">
          <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transition-medium group-hover:scale-110" />
          <div class="project-overlay absolute top-0 left-0 w-full h-full bg-primary/90 flex items-center justify-center gap-4 opacity-0 transition-fast group-hover:opacity-100">
            ${linksHtml}
          </div>
        </div>
        <div class="project-info p-6">
          <div class="project-tags flex flex-wrap gap-2 mb-4">
            ${tagsHtml}
          </div>
          <h3 class="project-title text-xl font-bold mb-2.5 text-dark dark:text-dark-text">${project.title}</h3>
          <p class="project-description text-dark-300 dark:text-dark-muted mb-4 text-sm leading-relaxed">${project.description}</p>
        </div>
      `;

      projectsContainer.appendChild(projectCard);
    });
  }
}

function renderProjectFilters() {
  const filterContainer = document.querySelector(".project-filters");

  if (filterContainer) {
    // Get all unique categories from projectsData
    const allCategories = new Set();
    projectsData.forEach((project) => {
      project.categories.forEach((category) => {
        allCategories.add(category);
      });
    });

    // Define category display names
    const categoryNames = {
      mobile: "Mobile",
      web: "Web",
      fullstack: "Full Stack",
    };

    // Clear existing filters and rebuild
    filterContainer.innerHTML = "";

    // Always add "All" button first
    const allButton = document.createElement("button");
    allButton.className =
      "filter-btn active px-5 py-2 rounded-full border-none bg-grey-200 dark:bg-dark-surface text-dark dark:text-dark-text font-medium cursor-pointer transition-fast hover:bg-primary hover:text-light [&.active]:bg-primary [&.active]:text-light";
    allButton.setAttribute("data-filter", "all");
    allButton.textContent = "All";
    filterContainer.appendChild(allButton);

    // Add buttons for each category that exists in the data
    const sortedCategories = Array.from(allCategories).sort();
    sortedCategories.forEach((category) => {
      if (categoryNames[category]) {
        const button = document.createElement("button");
        button.className =
          "filter-btn px-5 py-2 rounded-full border-none bg-grey-200 dark:bg-dark-surface text-dark dark:text-dark-text font-medium cursor-pointer transition-fast hover:bg-primary hover:text-light [&.active]:bg-primary [&.active]:text-light";
        button.setAttribute("data-filter", category);
        button.textContent = categoryNames[category];
        filterContainer.appendChild(button);
      }
    });
  }
}

function initializeProjectFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"));

        // Add active class to clicked button
        button.classList.add("active");

        // Get filter value
        const filter = button.getAttribute("data-filter");

        // Get currently rendered project cards
        const projectCards = document.querySelectorAll(".project-card");

        // Filter projects
        projectCards.forEach((card) => {
          const categories = card.getAttribute("data-categories").split(",");

          if (filter === "all" || categories.includes(filter)) {
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
}

document.addEventListener("DOMContentLoaded", () => {
  renderProjectFilters();
  renderProjects();
  initializeProjectFilters();

  // Initialize dynamic year
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
