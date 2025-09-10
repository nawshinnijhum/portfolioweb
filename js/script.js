// Portfolio Website JavaScript Functionality
// Author: Nawshin Nijhum

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality when page loads
  initializeNavigation();
  initializeAnimations();
  initializeContactForm();
  initializeInteractiveElements();
  initializeScrollEffects();
});

// Navigation functionality
function initializeNavigation() {
  const navLinks = document.querySelectorAll("nav a");
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Highlight current page in navigation
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  // Smooth scroll for same-page links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    });
  });
}

// Animation and visual effects
function initializeAnimations() {
  // Fade in elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe sections for fade-in animation
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.classList.add("fade-out");
    observer.observe(section);
  });

  // Typing effect for name (if on about page)
  const nameElement = document.querySelector(".about-content h1");
  if (nameElement && nameElement.textContent.includes("Nawshin Nijhum")) {
    addTypingEffect(nameElement);
  }
}

// Typing effect function
function addTypingEffect(element) {
  const text = element.textContent;
  element.textContent = "";
  element.style.borderRight = "2px solid #667eea";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      // Remove cursor after typing is complete
      setTimeout(() => {
        element.style.borderRight = "none";
      }, 1000);
    }
  };

  setTimeout(typeWriter, 500);
}

// Contact form functionality
function initializeContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const requiredFields = form.querySelectorAll("[required]");

  // Real-time validation
  requiredFields.forEach((field) => {
    field.addEventListener("blur", function () {
      validateField(this);
    });

    field.addEventListener("input", function () {
      clearError(this);
    });
  });

  // Form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;
    requiredFields.forEach((field) => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      submitForm(this);
    } else {
      // Focus on first invalid field
      const firstError = form.querySelector(".error-message:not(:empty)");
      if (firstError) {
        const fieldId = firstError.id.replace("-error", "");
        const field = document.getElementById(fieldId);
        if (field) {
          field.focus();
          field.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  });
}

// Form validation functions
function validateField(field) {
  const errorElement = document.getElementById(field.id + "-error");
  let isValid = true;
  let errorMessage = "";

  if (field.hasAttribute("required") && !field.value.trim()) {
    errorMessage = "This field is required.";
    isValid = false;
  } else if (field.type === "email" && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(field.value)) {
      errorMessage = "Please enter a valid email address.";
      isValid = false;
    }
  }

  if (errorElement) {
    errorElement.textContent = errorMessage;
    field.setAttribute("aria-invalid", !isValid);

    // Add visual feedback
    if (!isValid) {
      field.classList.add("error");
    } else {
      field.classList.remove("error");
    }
  }

  return isValid;
}

function clearError(field) {
  const errorElement = document.getElementById(field.id + "-error");
  if (errorElement && field.value.trim()) {
    errorElement.textContent = "";
    field.setAttribute("aria-invalid", "false");
    field.classList.remove("error");
  }
}

function submitForm(form) {
  // Show loading state
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual submission logic)
  setTimeout(() => {
    showNotification(
      "Thank you for your message! This is a demo form for the portfolio. In a real website, this would send your message.",
      "success"
    );
    form.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
}

// Interactive elements
function initializeInteractiveElements() {
  // Skill cards interaction
  const skillCards = document.querySelectorAll(".skill-card");
  skillCards.forEach((card) => {
    card.addEventListener("click", function () {
      this.style.transform = "scale(0.95)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });

    // Add keyboard support
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });

    // Make focusable
    if (!card.hasAttribute("tabindex")) {
      card.setAttribute("tabindex", "0");
    }
  });

  // Portfolio items hover effect
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  portfolioItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Social links interaction
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Add click animation
      this.style.transform = "scale(0.9)";
      setTimeout(() => {
        this.style.transform = "";
      }, 150);
    });
  });

  // Add click to copy email functionality
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const email = this.textContent.trim();
      copyToClipboard(email);
      showNotification(`Email address copied: ${email}`, "info");

      // Still open email client after a delay
      setTimeout(() => {
        window.location.href = this.href;
      }, 1000);
    });
  });
}

// Scroll effects
function initializeScrollEffects() {
  // Parallax effect for hero section
  const hero = document.querySelector(".hero");
  if (hero) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    });
  }

  // Progress bar on scroll
  createScrollProgressBar();

  // Back to top button
  createBackToTopButton();
}

// Utility functions
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existing = document.querySelector(".notification");
  if (existing) {
    existing.remove();
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  notification.setAttribute("role", "alert");
  notification.setAttribute("aria-live", "polite");

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    backgroundColor:
      type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3",
    color: "white",
    padding: "15px 20px",
    borderRadius: "5px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    zIndex: "10000",
    maxWidth: "350px",
    fontSize: "14px",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
  });

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 10);

  // Remove after delay
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 4000);
}

function createScrollProgressBar() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";

  Object.assign(progressBar.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "0%",
    height: "3px",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    zIndex: "9999",
    transition: "width 0.3s ease",
  });

  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
  });
}

function createBackToTopButton() {
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.innerHTML = "↑";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.setAttribute("title", "Back to top");

  Object.assign(backToTop.style, {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    opacity: "0",
    visibility: "hidden",
    transition: "all 0.3s ease",
    zIndex: "9998",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  });

  document.body.appendChild(backToTop);

  // Show/hide based on scroll position
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTop.style.opacity = "1";
      backToTop.style.visibility = "visible";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

  // Scroll to top on click
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effects
  backToTop.addEventListener("mouseenter", () => {
    backToTop.style.transform = "scale(1.1)";
  });

  backToTop.addEventListener("mouseleave", () => {
    backToTop.style.transform = "scale(1)";
  });
}

// Dark mode toggle (bonus feature)
function initializeDarkMode() {
  const darkModeToggle = document.createElement("button");
  darkModeToggle.innerHTML = "🌙";
  darkModeToggle.className = "dark-mode-toggle";
  darkModeToggle.setAttribute("aria-label", "Toggle dark mode");

  Object.assign(darkModeToggle.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "rgba(255,255,255,0.9)",
    border: "none",
    borderRadius: "50%",
    width: "45px",
    height: "45px",
    fontSize: "20px",
    cursor: "pointer",
    zIndex: "9999",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  });

  document.body.appendChild(darkModeToggle);

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    darkModeToggle.innerHTML = isDark ? "☀️" : "🌙";
    localStorage.setItem("darkMode", isDark);
  });

  // Load saved preference
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkModeToggle.innerHTML = "☀️";
  }
}

// Initialize dark mode
// initializeDarkMode(); // Uncomment to enable dark mode toggle
