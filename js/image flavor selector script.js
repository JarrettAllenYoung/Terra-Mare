
function updateReviewLinkForStrawberry() {
  let attempts = 0;
  function tryUpdate() {
    const reviewLinks = document.querySelectorAll('.pr-snippet-review-count');
    if (reviewLinks.length > 1) {
      console.log("Review links found, updating the Strawberry link...");
      // Assume the second link (index 1) is Strawberry Lemonade
      reviewLinks[1].setAttribute('data-target', 'reviews');
      console.log("Strawberry review link updated:", reviewLinks[1]);
      return;
    }
    attempts++;
    if (attempts < 20) {
      setTimeout(tryUpdate, 500);
    } else {
      console.error("Unable to update the Strawberry review link after multiple attempts.");
    }
  }
  tryUpdate();
}

document.addEventListener("DOMContentLoaded", function () {
  // Variant image switching code:
  const flavorOptions = document.querySelectorAll('input[name="variant-option"]');

  const flavorBackgroundMap = {
    "a1HVo0000005S3hMAE": "https://cdn.terramare.com/wp-content/uploads/2024/03/Carousel-morningrestore-unflavored-desktop-1.webp",
    "a1HVo0000001UthMAE": "https://cdn.terramare.com/wp-content/uploads/2025/01/Carousel-morningrestore-strawberry-desktop.webp"
  };

  let dynamicStyle = document.getElementById("dynamic-carousel-style");
  if (!dynamicStyle) {
    dynamicStyle = document.createElement("style");
    dynamicStyle.id = "dynamic-carousel-style";
    document.head.appendChild(dynamicStyle);
  }

  flavorOptions.forEach(option => {
    option.addEventListener("change", function () {
      const selectedValue = this.value;
      const newBackgroundImage = flavorBackgroundMap[selectedValue];
      if (newBackgroundImage) {
        dynamicStyle.textContent = `
            .pdp-swiper .swiper-slide[data-swiper-slide-index="0"] .elementor-carousel-image {
                background-image: url(${newBackgroundImage}) !important;
            }
        `;
        console.log(`Updated background-image to: ${newBackgroundImage}`);
      } else {
        console.error("No matching background image for selected flavor.");
      }

      // If Strawberry Lemonade is selected, update the review link.
      if (selectedValue === "a1HVo0000001UthMAE") {
        // A slight delay to allow the widget to re-render
        setTimeout(updateReviewLinkForStrawberry, 100);
      }
    });
  });
});

// Use a capturing phase listener to try and intercept the click early
document.addEventListener('click', function(event) {
  // Look for a clicked element that has our target attribute
  const reviewLink = event.target.closest('.pr-snippet-review-count[data-target]');
  if (reviewLink) {
    console.log("Review link clicked:", reviewLink);
    // Optional: Try stopping propagation if other handlers interfere
    event.preventDefault();
    event.stopPropagation();
    
    const targetId = reviewLink.getAttribute('data-target');
    console.log("data-target attribute value:", targetId);
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      console.log("Found target section. Scrolling into view...", targetSection);
      targetSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error("No target element found with ID:", targetId);
    }
  }
}, true); // 'true' activates capture
