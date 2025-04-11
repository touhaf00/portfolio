window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var image = document.querySelector('img');
    image.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
});

// Sélectionnez tous les liens avec des ancres à l'intérieur
var links = document.querySelectorAll('a[href^="#"]');

// Boucle à travers les liens
for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', smoothScroll);
}

// Fonction de défilement fluide
function smoothScroll(e) {
    e.preventDefault();
    var targetId = e.target.getAttribute('href');
    var targetPosition = document.querySelector(targetId).offsetTop;
    var startPosition = window.pageYOffset;
    var distance = targetPosition - startPosition;
    var duration = 1000;
    var start = null;

    window.requestAnimationFrame(step);

    function step(timestamp) {
        if (!start) start = timestamp;
        var progress = timestamp - start;
        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
        if (progress < duration) window.requestAnimationFrame(step);
    }

    // Fonction d'atténuation
    function easeInOutCubic(t, b, c, d) {
        t /= d/2;
        if (t < 1) return c/2*t*t*t + b;
        t -= 2;
        return c/2*(t*t*t + 2) + b;
    }
}