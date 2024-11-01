const canvas = document.getElementById('myCanvas');
const canvas2 = document.getElementById('edge-box');
const ctx = canvas.getContext('2d');

// Define the gradient colors and starting/ending points
const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, 0, canvas.height/2, canvas.width);
gradient.addColorStop(0, '#b49090'); // Inner color
gradient.addColorStop(1, '#EBEBEB'); // Outer color

// Draw the filled circle with the gradient
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
ctx.fill();

// Define the rectangle's position and size
const rectX = 1000; // X-coordinate
const rectY = 50; // Y-coordinate
const rectWidth = 1200; // Width of the rectangle
const rectHeight = 100; // Height of the rectangle

// Draw the rectangle
ctx.fillStyle = 'rgba(0, 0, 255, 1)'; // Set the fill color (blue with 50% opacity)
ctx.fillRect(rectX, rectY, rectWidth, rectHeight);


document.getElementById('openOverlayBtn').onclick = function() {
    document.getElementById('overlay1').style.display = 'flex';
};
document.getElementById('openOverlayBtn2').onclick = function() {
    document.getElementById('overlay2').style.display = 'flex';
};
document.getElementById('openOverlayBtn3').onclick = function() {
    document.getElementById('overlay3').style.display = 'flex';
};
document.getElementById('openOverlayBtn4').onclick = function() {
    document.getElementById('overlay4').style.display = 'flex';
};
document.getElementById('openOverlayBtn5').onclick = function() {
    document.getElementById('overlay5').style.display = 'flex';
};

function closeOverlay1() {
    document.getElementById('overlay1').style.display = 'none';
}
function closeOverlay2() {
    document.getElementById('overlay2').style.display = 'none';
}
function closeOverlay3() {
    document.getElementById('overlay3').style.display = 'none';
}
function closeOverlay4() {
    document.getElementById('overlay4').style.display = 'none';
}
function closeOverlay5() {
    document.getElementById('overlay5').style.display = 'none';
}

document.getElementById('menu-icon').addEventListener('click', function() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
});
