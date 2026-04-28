// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

mobileMenuBtn.addEventListener("click", () => {
  const isHidden = mobileMenu.classList.toggle("hidden");
  if (isHidden) {
    menuIcon.innerHTML = '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>';
  } else {
    menuIcon.innerHTML = '<line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/>';
  }
});

// Close menu when a link is clicked
document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuIcon.innerHTML = '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>';
  });
});

// ===== SMOOTH SCROLLING FOR ALL INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    if (targetId === "#") return;
    
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const navHeight = document.querySelector("header").offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
  });
});


// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll(".reveal");

const revealOnScroll = () => {
  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (elementTop < windowHeight * 0.85) {
      element.classList.add("active");
    }
  });
};

// Trigger reveal on scroll
window.addEventListener("scroll", revealOnScroll);

// Trigger reveal on page load
revealOnScroll();

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("py-2", "shadow-xl", "bg-white/90");
    navbar.classList.remove("py-4", "bg-white/80");
  } else {
    navbar.classList.add("py-4", "bg-white/80");
    navbar.classList.remove("py-2", "shadow-xl", "bg-white/90");
  }
});

// ===== BOOK PACKAGE BUTTON FUNCTIONALITY =====
function bookPackage(packageName) {
  // Scroll to contact section
  const contactSection = document.getElementById("contact");
  const navHeight = document.querySelector("header").offsetHeight;
  const targetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - navHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth"
  });

  // Pre-fill the package select dropdown
  const packageSelect = document.getElementById("packageSelect");
  // Find option that contains the package name
  for (let i = 0; i < packageSelect.options.length; i++) {
    if (packageSelect.options[i].text.includes(packageName) || packageSelect.options[i].value.includes(packageName)) {
      packageSelect.selectedIndex = i;
      break;
    }
  }

  // Focus on the form
  setTimeout(() => {
    document.getElementById("name").focus();
  }, 800);
}

// ===== BOOKING FORM SUBMISSION =====
const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = bookingForm.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.innerHTML;
  
  // Get form values
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const packageName = document.getElementById("packageSelect").value;
  const people = document.getElementById("people").value;
  const date = document.getElementById("date").value;
  const message = document.getElementById("message").value;

  // Show loading state
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-6 h-6 animate-spin"></i> Processing...';
  lucide.createIcons();

  // Create WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `*New Booking Request - Valparai Wanderer*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Package:* ${packageName}\n` +
      `*Guests:* ${people}\n` +
      `*Date:* ${date || "Flexible"}\n` +
      `*Message:* ${message || "None"}`
  );

  // Send to WhatsApp
  window.open(`https://wa.me/917904199650?text=${whatsappMessage}`, "_blank");

  // Show success and reset
  setTimeout(() => {
    submitBtn.innerHTML = '<i data-lucide="check-circle" class="w-6 h-6"></i> Request Sent!';
    lucide.createIcons();
    
    setTimeout(() => {
      showSuccessMessage();
      bookingForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
      lucide.createIcons();
    }, 2000);
  }, 1000);
});

function showSuccessMessage() {
  const msg = document.createElement("div");
  msg.className = "fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 border border-white/10 animate-bounce";
  msg.innerHTML = '<i data-lucide="check" class="text-primary-light"></i> Booking request shared on WhatsApp!';
  document.body.appendChild(msg);
  lucide.createIcons();

  setTimeout(() => {
    msg.style.opacity = "0";
    msg.style.transform = "translate(-50%, 20px)";
    msg.style.transition = "all 0.5s ease";
    setTimeout(() => msg.remove(), 500);
  }, 4000);
}
