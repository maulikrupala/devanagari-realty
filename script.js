// Devnagari Realty - script.js

document.addEventListener("DOMContentLoaded", () => {

    const loader = document.getElementById("page-loader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (loader) loader.classList.add("hidden");
        }, 800);
    });

    const navbar = document.getElementById("mainNavbar");

    function navbarScroll() {
        if (window.scrollY > 50) navbar?.classList.add("scrolled");
        else navbar?.classList.remove("scrolled");
    }

    navbarScroll();
    window.addEventListener("scroll", navbarScroll);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth", block: "start" });

                const navMenu = document.querySelector(".navbar-collapse");
                if (navMenu?.classList.contains("show")) {
                    bootstrap.Collapse.getInstance(navMenu)?.hide();
                }
            }
        });
    });

    const counters = document.querySelectorAll(".stat-num");

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = +counter.getAttribute("data-target");

            let count = 0;
            const speed = target / 100;

            function updateCounter() {
                count += speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            }

            updateCounter();
            counterObserver.unobserve(counter);
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 80
        });
    }
});
