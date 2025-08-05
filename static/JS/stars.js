const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let mouse = { x: -9999, y: -9999 };

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create stars
let stars = [];
for (let i = 0; i < 150; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    stars.push({
        x, y,
        ox: x, oy: y,
        radius: Math.random() * 2,
        alpha: Math.random(),
        delta: (Math.random() * 0.005) + 0.001 // slower twinkle
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let star of stars) {
        // Update alpha
        star.alpha += star.delta;
        if (star.alpha <= 0) {
            star.alpha = 0;
            star.delta *= -1;
            star.x = Math.random() * canvas.width;
            star.y = Math.random() * canvas.height;
            star.ox = star.x;
            star.oy = star.y;
        }
        if (star.alpha >= 1) star.delta *= -1;
        const dx = star.x - mouse.x;
        const dy = star.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        // --- Glow boost
        let glow = 1;
        if (dist < 150) {
            glow = 1 + (1 - dist / 150) * 2; // up to 3x brightness
        }
        // --- Repulsion
        if (dist < 100 && dist > 0.1) {
            const force = (1 - dist / 100);
            star.x += dx / dist * force * 2;
            star.y += dy / dist * force * 2;
        } else {
            star.x += (star.ox - star.x) * 0.001;
            star.y += (star.oy - star.y) * 0.001;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, star.alpha * glow)})`;
        ctx.fill();
    }

    requestAnimationFrame(animateStars);
}
animateStars();


window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
});