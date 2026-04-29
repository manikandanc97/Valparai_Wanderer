// ===== TOUR PACKAGE DATA =====
const budgetPricing = {
  2: 4500,
  3: 3200,
  4: 2500,
  5: 2500,
  6: 2500,
  7: 2000,
  8: 2500,
  9: 2000,
  10: 1800,
  11: 1900,
  12: 1800,
  13: 1800,
  14: 1700,
  15: 1500,
  16: 1500,
  17: 1500,
  18: 1500,
  19: 1500,
  20: 1500,
  21: 1500,
};

const packageData = {
  "package-3day": {
    title: "3 Days Valparai & Athirapalli",
    subtitle: "Complete Nature & Wildlife Experience",
    image:
      "https://images.pexels.com/photos/247041/pexels-photo-247041.jpeg",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Valparai Entry",
        places: [
          "Pick up from Pollachi",
          "Aaliyar Dam & River",
          "Butterfly park",
          "Monkey falls",
          "Loam’s View Point",
          "Hornbill viewpoint",
          "Waterfalls Photo Spot",
          "Kavarkal View Point",
          "Thalanar View Point",
        ],
      },
      {
        day: "Day 2",
        title: "Athirapalli Waterfalls Route",
        places: [
          "Sholayar dam",
          "Charpa Waterfalls",
          "Vazhachal Waterfalls",
          "Athirapalli Waterfalls",
          "Hanging bridge",
        ],
      },
      {
        day: "Day 3",
        title: "Local Sightseeing & Departure",
        places: [
          "Balaji Temple",
          "Vellamalai River",
          "Sirukundra Photo Point",
          "Karumalai Falls & Church",
          "Koolangal River",
          "Chinnakallar river",
          "Drop at Pollachi Station",
        ],
      },
    ],
  },
  "package-2day-budget": {
    title: "2 Days Valparai Budget Trip",
    subtitle: "Best Value Nature Escape",
    image:
      "https://images.pexels.com/photos/34485105/pexels-photo-34485105.jpeg",
    inclusions: [
      "2 Days Sightseeing",
      "1 Night Stay",
      "Private Travels Pick-up & Drop (Pollachi)",
    ],
    exclusions: ["Food", "Entry Tickets & Checkpost Cost", "Extra Places"],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Sightseeing",
        places: [
          "Pickup from Pollachi",
          "Aliyar Dam & River",
          "Monkey falls",
          "Butterfly Park",
          "Loam’s View Point",
          "Hornbill viewpoint",
          "Jacaranda Flower Spot",
          "Waterfalls Photo Spot",
          "Kavarkal View Point",
          "Thalanar View Point",
        ],
      },
      {
        day: "Day 2",
        title: "Hidden Gems & Waterfalls",
        places: [
          "Nadumalai River",
          "Balaji Temple",
          "Vellamalai River",
          "Sirukundra Photo Point",
          "Karumalai Falls & Church",
          "Koolangal River",
          "Chinnakallar Falls",
          "Drop at Pollachi Station",
        ],
      },
    ],
  },
  "package-2day-athirapalli": {
    title: "2 Days Valparai & Athirapalli",
    subtitle: "Quick Getaway to the Falls",
    image:
      "https://images.pexels.com/photos/34437465/pexels-photo-34437465.jpeg",
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Valparai Entry",
        places: [
          "Pick up from Pollachi",
          "Aaliyar Dam & River",
          "Butterfly park",
          "Monkey Falls",
          "Loam’s View Point",
          "Attakatti Hornbill View Point",
          "Waterfalls Photo Spot",
          "Kavarkal View Point",
          "Thalanar View Point",
          "Koolangal river",
        ],
      },
      {
        day: "Day 2",
        title: "Athirapalli Waterfalls Route",
        places: [
          "Sholayar dam",
          "Charpa Waterfalls",
          "Vazhachal Waterfalls",
          "Athirapalli Waterfalls",
          "Hanging bridge",
          "Drop at Pollachi Station",
        ],
      },
    ],
  },
};

let currentOpenPackage = null;

// ===== DYNAMIC PRICING =====
function updateBudgetPrice(members) {
  const priceDisplay = document.getElementById("budgetPrice");
  const price = budgetPricing[members] || 1500;
  priceDisplay.innerText = `₹${price.toLocaleString()}`;

  // Add a small bounce animation
  priceDisplay.classList.remove("animate-bounce");
  void priceDisplay.offsetWidth; // trigger reflow
  priceDisplay.classList.add("animate-bounce");
  setTimeout(() => priceDisplay.classList.remove("animate-bounce"), 1000);
}

// ===== ITINERARY MODAL LOGIC =====
function openItinerary(packageId) {
  const pkg = packageData[packageId];
  currentOpenPackage = pkg;

  const modal = document.getElementById("itineraryModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalImg = document.getElementById("modalImg");
  const modalContent = document.getElementById("modalContent");

  modalTitle.innerText = pkg.title;
  modalSubtitle.innerText = pkg.subtitle;
  modalImg.src = pkg.image;

  let contentHtml = "";

  // Add Inclusions/Exclusions if available
  if (pkg.inclusions) {
    contentHtml += `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="bg-primary/5 p-6 rounded-3xl border border-primary/10">
          <h4 class="font-bold text-primary mb-4 flex items-center gap-2">
            <i data-lucide="check-circle" class="w-5 h-5"></i> Inclusions
          </h4>
          <ul class="space-y-2">
            ${pkg.inclusions.map((item) => `<li class="text-slate-600 text-sm flex items-center gap-2"><div class="w-1.5 h-1.5 bg-primary rounded-full"></div> ${item}</li>`).join("")}
          </ul>
        </div>
        <div class="bg-red-50 p-6 rounded-3xl border border-red-100">
          <h4 class="font-bold text-red-600 mb-4 flex items-center gap-2">
            <i data-lucide="x-circle" class="w-5 h-5"></i> Exclusions
          </h4>
          <ul class="space-y-2">
            ${pkg.exclusions.map((item) => `<li class="text-slate-600 text-sm flex items-center gap-2"><div class="w-1.5 h-1.5 bg-red-400 rounded-full"></div> ${item}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
  }

  // Add Itinerary
  pkg.itinerary.forEach((day, index) => {
    contentHtml += `
      <div class="relative pl-8 pb-8 last:pb-0">
        ${index !== pkg.itinerary.length - 1 ? '<div class="absolute left-3 top-3 bottom-0 w-0.5 bg-slate-100"></div>' : ""}
        <div class="absolute left-0 top-1.5 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-md z-10"></div>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <span class="bg-primary/10 text-primary px-2 py-1 rounded-lg text-[10px] font-black uppercase whitespace-nowrap">${day.day}</span>
            <h4 class="font-extrabold text-slate-900 text-lg leading-tight">${day.title}</h4>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
            ${day.places
              .map(
                (place) => `
              <div class="flex items-center gap-2 text-slate-500 text-sm">
                <i data-lucide="map-pin" class="w-3.5 h-3.5 text-primary-light"></i>
                ${place}
              </div>
            `,
              )
              .join("")}
          </div>
        </div>
      </div>
    `;
  });

  modalContent.innerHTML = contentHtml;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevent scrolling
  lucide.createIcons();
}

function closeItinerary() {
  const modal = document.getElementById("itineraryModal");
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function bookFromModal() {
  if (currentOpenPackage) {
    closeItinerary();
    bookPackage(currentOpenPackage.title);
  }
}

// ===== BOOK PACKAGE BUTTON FUNCTIONALITY =====
function bookPackage(packageName) {
  // Scroll to contact section
  const contactSection = document.getElementById("contact");
  const navHeight = document.querySelector("header").offsetHeight;
  const targetPosition =
    contactSection.getBoundingClientRect().top + window.pageYOffset - navHeight;

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth",
  });

  // Pre-fill the package select dropdown
  const packageSelect = document.getElementById("packageSelect");
  // Find option that contains the package name
  for (let i = 0; i < packageSelect.options.length; i++) {
    if (
      packageSelect.options[i].text.includes(packageName) ||
      packageSelect.options[i].value.includes(packageName)
    ) {
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
  submitBtn.innerHTML =
    '<i data-lucide="loader-2" class="w-6 h-6 animate-spin"></i> Processing...';
  lucide.createIcons();

  // Create WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `*New Booking Request - Valparai Wanderer*\n\n` +
      `*Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Package:* ${packageName}\n` +
      `*Guests:* ${people}\n` +
      `*Date:* ${date || "Flexible"}\n` +
      `*Message:* ${message || "None"}`,
  );

  // Send to WhatsApp
  window.open(`https://wa.me/917904199605?text=${whatsappMessage}`, "_blank");

  // Show success and reset
  setTimeout(() => {
    submitBtn.innerHTML =
      '<i data-lucide="check-circle" class="w-6 h-6"></i> Request Sent!';
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
  msg.className =
    "fixed bottom-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl z-[100] flex items-center gap-3 border border-white/10 animate-bounce";
  msg.innerHTML =
    '<i data-lucide="check" class="text-primary-light"></i> Booking request shared on WhatsApp!';
  document.body.appendChild(msg);
  lucide.createIcons();

  setTimeout(() => {
    msg.style.opacity = "0";
    msg.style.transform = "translate(-50%, 20px)";
    msg.style.transition = "all 0.5s ease";
    setTimeout(() => msg.remove(), 500);
  }, 4000);
}

// ===== HERO BACKGROUND SLIDER =====
const sliderImages = document.querySelectorAll(".hero-bg-image");
if (sliderImages.length > 0) {
  let currentIdx = 0;
  setInterval(() => {
    sliderImages[currentIdx].classList.remove("active");
    currentIdx = (currentIdx + 1) % sliderImages.length;
    sliderImages[currentIdx].classList.add("active");
  }, 5000);
}

// Initialize Lucide Icons
document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
});

// ===== MOBILE MENU TOGGLE =====
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const menuIcon = document.getElementById("menuIcon");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    if (isHidden) {
      menuIcon.innerHTML =
        '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>';
    } else {
      menuIcon.innerHTML =
        '<line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/>';
    }
    lucide.createIcons();
  });
}

// Close menu when a link is clicked
document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
    menuIcon.innerHTML =
      '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>';
    lucide.createIcons();
  });
});

// ===== SMOOTH SCROLLING FOR ALL INTERNAL LINKS =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      e.preventDefault();
      const navHeight = document.querySelector("header").offsetHeight;
      const targetPosition =
        targetElement.getBoundingClientRect().top +
        window.pageYOffset -
        navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
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
