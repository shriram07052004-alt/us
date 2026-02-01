// Get elements from the page
const valentineBtn = document.getElementById("valentineBtn");
const response = document.getElementById("response");
const yesNoButtons = document.getElementById("yesNoButtons");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const photoGallery = document.getElementById("photoGallery");
const heartsContainer = document.querySelector(".hearts");

// Track button states
let noClickCount = 0;
const noMessages = ["Are you sure?", "Last chance?"];
let yesFontSize = 16; // Starting font size in px
let noFontSize = 16; // Starting font size in px

// When the valentine button is clicked, show yes/no buttons
valentineBtn.addEventListener("click", () => {
  response.textContent = "So... what do you say? \ud83d\ude0f";
  valentineBtn.style.display = "none";
  yesNoButtons.style.display = "flex";
});

// Yes button click - show the loving message and photos
yesBtn.addEventListener("click", () => {
  response.innerHTML = "<br>Yayyy \u2764\ufe0f I love you, Kavi!  \ud83c\udf86";
  yesNoButtons.style.display = "none";
  photoGallery.style.display = "flex";

  // Trigger extra hearts celebration
  for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, i * 100);
  }
});

// No button - shrink and show different messages
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  
  // Show next message
  if (noClickCount < noMessages.length) {
    response.textContent = noMessages[noClickCount] + " \ud83d\ude08";
  }
  
  // Shrink No button
  noFontSize *= 0.7; // Reduce by 30% each time
  noBtn.style.fontSize = noFontSize + "px";
  noBtn.style.padding = (8 * (noFontSize / 16)) + "px " + (12 * (noFontSize / 16)) + "px";
  
  // Grow Yes button
  yesFontSize *= 1.4; // Increase by 40% each time
  yesBtn.style.fontSize = yesFontSize + "px";
  yesBtn.style.padding = (12 * (yesFontSize / 16)) + "px " + (20 * (yesFontSize / 16)) + "px";
  
  // Move No button away
  moveNoButton();
  
  noClickCount++;
});

// No button - move away when hovering or trying to click
function moveNoButton() {
  const randomX = Math.random() * 280 - 100; // Random position between -100 and 180
  const randomY = Math.random() * 200 - 100;
  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

noBtn.addEventListener("mouseenter", moveNoButton);

// Create a single floating heart element
function createHeart() {
  const heart = document.createElement("span");
  heart.textContent = "\u2764\ufe0f";
  heart.style.position = "fixed";
  heart.style.left = Math.random() * window.innerWidth + "px";
  heart.style.top = -30 + "px";
  heart.style.fontSize = Math.random() * 20 + 20 + "px";
  heart.style.opacity = "1";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "1000";
  document.body.appendChild(heart);

  // Animate the heart falling
  let topPos = -30;
  const interval = setInterval(() => {
    topPos += Math.random() * 3 + 2;
    heart.style.top = topPos + "px";
    heart.style.opacity = 1 - topPos / window.innerHeight;

    if (topPos > window.innerHeight) {
      clearInterval(interval);
      heart.remove();
    }
  }, 30);
}
