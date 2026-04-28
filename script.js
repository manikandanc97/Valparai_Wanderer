// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close menu when a link is clicked
document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// ===== SMOOTH SCROLLING FOR ALL INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===== PACKAGE FILTERING =====
const filterButtons = document.querySelectorAll(".filter-btn");
const packageCards = document.querySelectorAll(".package-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active state from all buttons
    filterButtons.forEach((btn) => {
      btn.classList.remove("bg-primary-light", "text-slate-950");
      btn.classList.add("bg-slate-800", "text-slate-300");
    });

    // Add active state to clicked button
    button.classList.remove("bg-slate-800", "text-slate-300");
    button.classList.add("bg-primary-light", "text-slate-950");

    // Filter cards
    const filterValue = button.getAttribute("data-filter");

    packageCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (filterValue === "all" || cardCategory === filterValue) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementBottom = element.getBoundingClientRect().bottom;

    // Check if element is in viewport
    if (elementTop < window.innerHeight && elementBottom > 0) {
      element.classList.add("active");
    }
  });
};

// Trigger reveal on scroll
window.addEventListener("scroll", revealOnScroll);

// Trigger reveal on page load
revealOnScroll();

// ===== BOOK PACKAGE BUTTON FUNCTIONALITY =====
function bookPackage(packageName) {
  // Scroll to contact section
  const contactSection = document.getElementById("contact");
  contactSection.scrollIntoView({ behavior: "smooth", block: "start" });

  // Pre-fill the package select dropdown
  const packageSelect = document.getElementById("packageSelect");
  packageSelect.value = packageName;

  // Focus on the form
  setTimeout(() => {
    document.getElementById("name").focus();
  }, 500);
}

// ===== BOOKING FORM SUBMISSION =====
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const packageName = document.getElementById("packageSelect").value;
  const people = document.getElementById("people").value;
  const date = document.getElementById("date").value;
  const message = document.getElementById("message").value;

  // Validate form
  if (!name || !phone || !email || !packageName || !people) {
    alert("Please fill in all required fields!");
    return;
  }

  // Create WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Hello! I would like to book a tour package.\n\n` +
      `Name: ${name}\n` +
      `Phone: ${phone}\n` +
      `Email: ${email}\n` +
      `Package: ${packageName}\n` +
      `Number of People: ${people}\n` +
      `Preferred Date: ${date || "Not specified"}\n` +
      `Special Requests: ${message || "None"}`,
  );

  // Send to WhatsApp
  window.open(`https://wa.me/919488771231?text=${whatsappMessage}`, "_blank");

  // Also send email using FormSubmit (free service)
  try {
    // Create FormData for email submission
    const formData = new FormData();
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("package", packageName);
    formData.append("people", people);
    formData.append("date", date);
    formData.append("message", message);

    // Send to email service
    await fetch("https://formspree.io/f/xyzpqrst", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
  } catch (error) {
    console.log("Email service note: Configure with your actual form endpoint");
  }

  // Show success message
  showSuccessMessage();

  // Reset form
  bookingForm.reset();
});

// ===== SUCCESS MESSAGE =====
function showSuccessMessage() {
  const message = document.createElement("div");
  message.className =
    "fixed top-20 right-4 bg-primary-light text-slate-950 px-6 py-3 rounded-lg font-bold shadow-lg z-50";
  message.textContent =
    "✅ Booking request sent! Check WhatsApp for confirmation.";
  document.body.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 4000);
}

// ===== LAZY LOAD IMAGES (for better performance) =====
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          imageObserver.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

// ===== NAVBAR SCROLL EFFECT =====
let lastScroll = 0;
const navbar = document.querySelector("header");

window.addEventListener("scroll", () => {
  lastScroll = window.scrollY;

  if (lastScroll > 100) {
    navbar.classList.add("shadow-lg");
  } else {
    navbar.classList.remove("shadow-lg");
  }
});

// ===== PREVENT FORM SUBMISSION ON ENTER IN TEXT FIELDS =====
document
  .querySelectorAll(
    '#bookingForm input[type="text"], #bookingForm input[type="email"], #bookingForm input[type="tel"]',
  )
  .forEach((input) => {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        bookingForm.dispatchEvent(new Event("submit"));
      }
    });
  });
