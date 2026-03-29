// GSAP Cloud Animation

document.addEventListener("DOMContentLoaded", initClouds);

function initClouds() {
    try {
        const hero = document.querySelector(".hero-section");

        if (!hero) {
            console.warn("Hero section not found.");
            return;
        }

        if (typeof gsap === "undefined") {
            console.warn("GSAP is not loaded.");
            return;
        }

        const CLOUD_COUNT = 8;

        for (let i = 0; i < CLOUD_COUNT; i++) {
            const cloud = createCloud();
            hero.appendChild(cloud);
            animateCloud(cloud, true);
        }

    } catch (error) {
        console.error("Error initializing clouds:", error);
    }
}

function createCloud() {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");
    return cloud;
}

function animateCloud(cloud, isFirstRun = false) {
    try {
        const random = gsap.utils.random;

        const startX = isFirstRun 
            ? `${random(-10, 100)}vw` 
            : "-40vw";

        const settings = {
            y: `${random(5, 75)}%`,
            scale: random(0.4, 1.6),
            opacity: random(0.3, 0.85),
            rotation: random(-3, 3)
        };

        const duration = random(80, 150) / settings.scale;

        //Start position
        gsap.set(cloud, {
            x: startX,
            top: settings.y,
            ...settings
        });

        //Animate kanan movement
        gsap.to(cloud, {
            x: "130vw",
            duration: duration,
            ease: "none",
            onComplete: () => animateCloud(cloud)
        });

    } catch (error) {
        console.error("Error animating cloud:", error);
    }
}