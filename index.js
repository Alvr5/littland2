console.clear();

const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

// Ajusta al tamaño de tus imágenes originales
canvas.width = 1158;
canvas.height = 770;

const frameCount = 147;
const currentFrame = index => (
  `/imagenes/0003${(index + 1).toString().padStart(4, '0')}.jpg`
);

const images = [];
const airpods = {
  frame: 0
};

// 1. Precarga optimizada
for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

// 2. Animación con GSAP
gsap.to(airpods, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: canvas,      // Es vital definir qué dispara el scroll
    start: "top top",     // Empieza cuando el canvas toca el techo
    end: "+=3000",        // Cuánto scroll durará la animación (en píxeles)
    scrub: 0.5,           // Suavizado del movimiento
    pin: true             // Bloquea el canvas en pantalla mientras dura la secuencia
  },
  onUpdate: render 
});

// 3. Asegurar que la primera imagen se dibuje al cargar
images[0].onload = render;

function render() {
  // Asegúrate de que la imagen exista antes de intentar dibujarla
  if (images[airpods.frame]) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[airpods.frame], 0, 0);
  }
}