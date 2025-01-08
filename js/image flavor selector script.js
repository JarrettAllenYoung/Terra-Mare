    document.addEventListener("DOMContentLoaded", function () {
    const flavorOptions = document.querySelectorAll('input[name="variant-option"]');

    const flavorBackgroundMap = {
        "a1HVo0000005S3hMAE": "https://cdn.terramare.com/wp-content/uploads/2024/03/Carousel-morningrestore-unflavored-desktop-1.webp",
        "a1HVo0000001UthMAE": "https://cdn.terramare.com/wp-content/uploads/2025/01/Carousel-morningrestore-strawberry-desktop.webp"
    };

    // Create or reuse a dynamic <style> element in the <head>
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
                // Update the CSS rule in the <style> element
                dynamicStyle.textContent = `
                    .pdp-swiper .swiper-slide[data-swiper-slide-index="0"] .elementor-carousel-image {
                        background-image: url(${newBackgroundImage}) !important;
                    }
                `;
                console.log(`Updated background-image to: ${newBackgroundImage}`);
            } else {
                console.error("No matching background image for selected flavor.");
            }
        });
    });
});