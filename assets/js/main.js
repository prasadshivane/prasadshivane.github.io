(function ($) {
    "use strict";

    /* =========================================================
       1. Preloader
    ========================================================= */
    $(window).on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    /* =========================================================
       2. Sticky Navigation & Scroll Spy
    ========================================================= */
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 100) {
            $('#mainNav').addClass('navbar-scrolled');
        } else {
            $('#mainNav').removeClass('navbar-scrolled');
        }
    });

    // Smooth scrolling to sections
    $('a.nav-link[href*="#"]:not([href="#"])').on('click', function (event) {
        if (
            location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
            location.hostname === this.hostname
        ) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 70 // Offset for sticky navbar
                }, 1000, function () {
                    // Check if navbar is collapsed, and close it after clicking a link
                    if ($('.navbar-collapse').hasClass('show')) {
                        $('.navbar-toggler').click();
                    }
                });
                return false;
            }
        }
    });

    /* =========================================================
       3. Theme Switcher (Dark/Light Mode)
    ========================================================= */
    const themeToggle = document.getElementById('checkbox');
    const body = document.body;

    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.setAttribute('data-theme', 'light');
        themeToggle.checked = true;
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.checked = false;
    }

    themeToggle.addEventListener('change', function () {
        if (this.checked) {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });


    /* =========================================================
       4. Typed Text Effect (Hero Section)
    ========================================================= */
    if (document.getElementById('typed-text')) {
        let typed = new Typed('#typed-text', {
            strings: [
                "Network Automation Engineer",
                "CCIE #63364",
                "JNCIE #455",
                "Python Developer"
            ],
            typeSpeed: 70,
            backSpeed: 50,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    /* =========================================================
       5. Fun Facts Counter
    ========================================================= */
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $('.counter').each(function () {
                    let target = $(this).data('count');
                    let start = 0;
                    let countUp = new CountUp(this, target, {
                        startVal: start,
                        duration: 2.5,
                        separator: ','
                    });
                    if (!countUp.error) {
                        countUp.start();
                    } else {
                        console.error(countUp.error);
                    }
                    observer.unobserve(entry.target); // Stop observing once counting starts
                });
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of section is visible

    const funfactsSection = document.getElementById('funfacts');
    if (funfactsSection) {
        counterObserver.observe(funfactsSection);
    }


    /* =========================================================
       6. AOS (Animate On Scroll) Initialization
    ========================================================= */
    AOS.init({
        duration: 1000,
        once: true
    });


    /* =========================================================
       7. Timeline/Resume Toggle Functionality
    ========================================================= */
    $('.timeline-toggle').on('click', function() {
        // Toggle the 'expanded' class on the parent item
        $(this).closest('.timeline-item').toggleClass('expanded');
    });


    /* =========================================================
       8. Back to Top Button
    ========================================================= */
    var backToTopBtn = document.getElementById("backToTopBtn");

    $(window).on('scroll', function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    });

    $('#backToTopBtn').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

})(jQuery);