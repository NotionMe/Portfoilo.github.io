const cursor = document.querySelector(".cursor");
const linkElements = document.querySelectorAll("a, .btn,  .project-link");
const magnetElements = document.querySelectorAll(
  ".about-image, .project-card, .btn, .btn-github"
);

// Mouse animation variables
let isMoving = false;
let animationId;
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let targetScale = 1;
let currentScale = 1;
let isClicking = false;
let isHovering = false;
const speed = 0.15;
const scaleSpeed = 0.1;

function UpdateScale() {
  if (isClicking) {
    targetScale = 1;
  } else if (isHovering) {
    targetScale = 1.5;
  } else {
    targetScale = 1;
  }
}

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (!isMoving) {
    cursorX = mouseX;
    cursorY = mouseY;
    updateCursorPosition();
  }

  if (!animationId && isMoving) {
    animateCursor();
  }
});



function updateCursorPosition() {
  currentScale += (targetScale - currentScale) * scaleSpeed;
  
  // Якщо є click-effect, не застосовуємо JavaScript масштабування
  if (!cursor.classList.contains('click-effect')) {
    cursor.style.transform = `translate(${cursorX - 10}px, 
                                        ${cursorY - 10}px)
                                        scale(${currentScale})`;
  } else {
    cursor.style.transform = `translate(${cursorX - 10}px, 
                                        ${cursorY - 10}px)`;
  }
}

function animateCursor() {
  if (isMoving) {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
  } else {
    cursorX = mouseX;
    cursorY = mouseY;
  }

  updateCursorPosition();

  if (isMoving || Math.abs(targetScale - currentScale) > 0.01) {
    animationId = requestAnimationFrame(animateCursor);
  } else {
    animationId = null;
  }
}

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (!animationId) {
    animateCursor();
  }
});

// Add mouse click effect
document.addEventListener("mousedown", () => {
  isClicking = true;
  cursor.classList.add("click-effect");
  UpdateScale();
  if (!animationId) {
    animateCursor();
  }
});

document.addEventListener("mouseup", () => {
  isClicking = false;
  setTimeout(() => {
    cursor.classList.remove("click-effect");
  }, 150); 
  UpdateScale();
  if (!animationId) {
    animateCursor();
  }
});

document.addEventListener("mouseleave", () => {
  isClicking = false;
  isHovering = false;
  cursor.classList.remove("click-effect");
  cursor.classList.remove("link-hover");
  UpdateScale();
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }
});

//Magnit
const activeMagnet = (event, element) => {
  const boundBox = element.getBoundingClientRect();
  const newX = (event.clientX - boundBox.left) / element.offsetWidth - 0.5;
  const newY = (event.clientY - boundBox.top) / element.offsetHeight - 0.5;
  const magnetoStrength = 50;

  gsap.to(element, {
    duration: 1,
    x: newX * magnetoStrength,
    y: newY * magnetoStrength,
    ease: "power4.out",
  });
};

const resetMagnet = (element) => {
  gsap.to(element, {
    duration: 1,
    x: 0,
    y: 0,
    ease: "elastic.out",
  });
};

magnetElements.forEach((magnet) => {
  magnet.addEventListener("mousemove", (event) => activeMagnet(event, magnet));
  magnet.addEventListener("mouseleave", () => resetMagnet(magnet));
});
