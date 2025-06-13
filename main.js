const cursor = document.querySelector(".cursor");
const linkElements = document.querySelectorAll(
  "a, .btn, .btn-github, .project-link, .project-card"
);

let isMoving = false;
let animationId;
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let targetScale = 1;
let currentScale = 1;
const speed = 0.15;
const scaleSpeed = 0.1;

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

linkElements.forEach((link) => {
  link.addEventListener("mouseenter", () => {
    isMoving = true;
    cursor.classList.add("link-hover");
    targetScale = 1.5;
    if (!animationId) {
      animateCursor();
    }
  });

  link.addEventListener("mouseleave", () => {
    isMoving = false;
    cursor.classList.remove("link-hover");
    targetScale = 1;
    if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  });
});

function updateCursorPosition() {
  currentScale += (targetScale - currentScale) * scaleSpeed;
  cursor.style.transform = `translate(${cursorX - 10}px, 
                                      ${cursorY - 10}px)
                                      scale(${currentScale})`;
}

function animateCursor() {
  if (isMoving) {
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    updateCursorPosition();
    animationId = requestAnimationFrame(animateCursor);
  } else {
    cursorX = mouseX;
    cursorY = mouseY;
    updateCursorPosition();
    if(Math.abs(targetScale - currentScale) < 0.01) {
      animationId = requestAnimationFrame(animateCursor);
    } else {
      if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
      }
    }
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
