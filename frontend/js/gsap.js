function startCloudAnimation() {
    if (typeof gsap === "undefined") {
        console.error("GSAP is required for cloud animation.");
        return;
    }

    const cloudLayer = document.querySelector(".cloud-layer");

    if (!cloudLayer) {
        return;
    }

    const settings = {
        className: "cloud",
        resizeDelay: 250,
        fallbackWidth: 450,
        mobileWidth: 768,
        tabletWidth: 1200,
        mobileCount: 3,
        tabletCount: 4,
        desktopCount: 5
    };

    let resizeTimer;

    function getRandom(min, max, step) {
        if (typeof step === "number") {
            return gsap.utils.random(min, max, step);
        }

        return gsap.utils.random(min, max);
    }

    function getCloudCount() {
        if (window.innerWidth < settings.mobileWidth) {
            return settings.mobileCount;
        }

        if (window.innerWidth < settings.tabletWidth) {
            return settings.tabletCount;
        }

        return settings.desktopCount;
    }

    function animateCloud(cloud, isFirstRun = false) {
        const screenWidth = cloudLayer.offsetWidth || window.innerWidth;
        const cloudWidth = cloud.offsetWidth || settings.fallbackWidth;
        const scale = getRandom(0.55, 1.35, 0.01);
        const startX = isFirstRun
            ? getRandom(-cloudWidth, screenWidth)
            : -cloudWidth - getRandom(30, 220);
        const endX = screenWidth + cloudWidth + getRandom(30, 220);
        const topPos = `${getRandom(12, 72)}%`;
        const opacity = getRandom(0.35, 0.9, 0.01);
        const rotation = getRandom(-4, 4, 0.1);
        const duration = getRandom(30, 55) / Math.max(scale, 0.55);

        gsap.killTweensOf(cloud);

        gsap.set(cloud, {
            x: startX,
            top: topPos,
            yPercent: -50,
            scale: scale,
            opacity: opacity,
            rotation: rotation
        });

        gsap.to(cloud, {
            x: endX,
            duration: duration,
            ease: "none",
            onComplete: () => {
                animateCloud(cloud);
            }
        });
    }

    function rebuildAllClouds() {
        const oldClouds = cloudLayer.querySelectorAll(`.${settings.className}`);

        oldClouds.forEach((cloud) => {
            gsap.killTweensOf(cloud);
        });

        cloudLayer.replaceChildren();

        for (let count = 0; count < getCloudCount(); count += 1) {
            const newCloud = document.createElement("div");
            newCloud.className = settings.className;
            cloudLayer.appendChild(newCloud);
            animateCloud(newCloud, true);
        }
    }

    rebuildAllClouds();

    window.addEventListener("resize", () => {
        window.clearTimeout(resizeTimer);
        resizeTimer = window.setTimeout(() => {
            rebuildAllClouds();
        }, settings.resizeDelay);
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startCloudAnimation);
} else {
    startCloudAnimation();
}
