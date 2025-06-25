<!-- 1) Supplement-facts CSS -->
<style>
  .supplement-facts-container .supplement-content {
    display: none !important;
  }
  .supplement-facts-container .supplement-content.active {
    display: block !important;
  }
</style>

<!-- 2) Unified script -->
<script>
  document.addEventListener("DOMContentLoaded", function () {
    //
    // --- 1) Strawberry review-link retry logic ---
    //
    function updateReviewLinkForStrawberry() {
      let attempts = 0;
      function tryUpdate() {
        const reviewLinks = document.querySelectorAll('.pr-snippet-review-count');
        if (reviewLinks.length > 1) {
          console.log("Review links found, updating the Strawberry link...");
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

    //
    // --- 2) Inputs & blocks for carousel + supplement facts ---
    //
    const flavorOptions    = document.querySelectorAll('input[name="variant-option"]');
    const supplementBlocks = document.querySelectorAll('.supplement-content');
    const toggleCheckbox   = document.getElementById('supplement-facts-toggle');

    //
    // --- 3) Carousel images map (main + supp facts) ---
    //
    const flavorBackgroundMap = {
      "a1HVo0000005S3hMAE": {
        main: "https://cdn.terramare.com/wp-content/uploads/2024/03/Carousel-morningrestore-unflavored-desktop-1.webp",
        supp: "https://cdn.terramare.com/wp-content/uploads/2025/06/Carousel-morningrestore-unflavored-suppfacts-desktop.webp"
      },
      "a1HVo0000001UthMAE": {
        main: "https://cdn.terramare.com/wp-content/uploads/2024/03/Carousel-morningrestore-strawberry-desktop.webp",
        supp: "https://cdn.terramare.com/wp-content/uploads/2025/06/Carousel-morningrestore-strawberry-suppfacts-desktop-1.webp"
      }
    };

    //
    // --- 4) Ensure one <style> block for dynamic carousel CSS ---
    //
    const dynamicStyle = (() => {
      let s = document.getElementById("dynamic-carousel-style");
      if (!s) {
        s = document.createElement("style");
        s.id = "dynamic-carousel-style";
        document.head.appendChild(s);
      }
      return s;
    })();

    //
    // --- 5) Helper: swap carousel images ---
    //
    function updateCarousel(variant) {
      const imgs = flavorBackgroundMap[variant];
      if (!imgs) return console.error("No images for variant", variant);

      dynamicStyle.textContent = `
        .pdp-swiper .swiper-slide[data-swiper-slide-index="0"] .elementor-carousel-image {
          background-image: url(${imgs.main}) !important;
        }
        .pdp-swiper .swiper-slide[data-swiper-slide-index="3"] .elementor-carousel-image {
          background-image: url(${imgs.supp}) !important;
        }
      `;
    }

    //
    // --- 6) Helper: show/hide supplement-content ---
    //
    function updateSupplementContent() {
      // hide all first
      supplementBlocks.forEach(el => el.classList.remove("active"));
      // if toggle is off, bail
      if (!toggleCheckbox.checked) return;

      // which flavor is checked?
      const selected = document.querySelector('input[name="variant-option"]:checked');
      if (!selected) return;

      // show the matching block
      const match = document.querySelector(`.supplement-content[data-variant="${selected.value}"]`);
      if (match) {
        match.classList.add("active");
      } else {
        console.error("No supplement-content for variant", selected.value);
      }
    }

    //
    // --- 7) Wire up change events ---
    //
    flavorOptions.forEach(option => {
      option.addEventListener("change", function () {
        // 1) swap both carousel images
        updateCarousel(this.value);
        // 2) refresh supplement-facts display
        updateSupplementContent();
        // 3) if Strawberry variant, update its review link
        if (this.value === "a1HVo0000001UthMAE") {
          setTimeout(updateReviewLinkForStrawberry, 100);
        }
      });
    });

    toggleCheckbox.addEventListener("change", updateSupplementContent);

    //
    // --- 8) Initialize on page load ---
    //
    const pre = document.querySelector('input[name="variant-option"]:checked');
    if (pre) updateCarousel(pre.value);
    updateSupplementContent();
  });

  //
  // --- 9) Global capturing-phase click handler for review links ---
  //
  document.addEventListener('click', function(event) {
    const reviewLink = event.target.closest('.pr-snippet-review-count[data-target]');
    if (!reviewLink) return;

    console.log("Review link clicked:", reviewLink);
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
  }, true); // capture!
</script>
