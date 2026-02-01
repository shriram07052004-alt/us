// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded!');
    
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
        console.log('Valentine button clicked!');
        response.textContent = "Kavi, do you love me? \ud83d\ude09";
        valentineBtn.style.display = "none";
        yesNoButtons.style.display = "flex";
    });

    // Yes button click - show the loving message and photos
    yesBtn.addEventListener("click", () => {
        console.log('Yes button clicked!');
        response.innerHTML = "<br>Yayyy \u2764\ufe0f I love you, Kavi!  \ud83c\udf8a";
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

    // Function to create falling hearts
    function createHeart() {
        const heart = document.createElement("div");
        heart.classList.add("heart");
        heart.textContent = "\u2764\ufe0f"; // Red heart emoji
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 2 + 3 + "s"; // 3-5 seconds
        heart.style.fontSize = Math.random() * 20 + 20 + "px"; // 20-40px

        heartsContainer.appendChild(heart);

        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }

    // Function to move No button to random position
    function moveNoButton() {
        const randomX = Math.random() * 60 - 30; // -30% to +30%
        const randomY = Math.random() * 60 - 30;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }

    console.log('All event listeners attached!');
});
