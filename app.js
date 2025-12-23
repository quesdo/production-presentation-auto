// ===== PRESENTATION DATA WITH TIMINGS =====
const slides = [
    {
        text: "Virtual Twin of the Production System\n\nGuide: how do we meet higher production rates?\nAnd how do we adapt our lines to aerospace & defense products?",
        media: null,
        duration: 10000 // 10s
    },
    {
        text: "The virtual twin of the production system brings everything together:\n• machines, their kinematics and programs;\n• operators and their skills;\n• work instructions;\n• material flows;\n• manufacturing methods;\n• automation resources.\nInside this virtual world, we deploy virtual companions.",
        media: "PSY 1",
        duration: 17000 // 27s - 10s = 17s
    },
    {
        text: "Here's a concrete example:\nan aerospace & defense contract requires a 40% capacity increase on a critical assembly line.\nThe Virtual Twin allows multiple layout scenarios, optimizes cycle times, proposes new line-balancing strategies, validates operator movements in simulation and anticipates ergonomic risks.",
        media: "PSY 2",
        duration: 20000 // 47s - 27s = 20s
    },
    {
        text: "The virtual companion supports work instructions updates and execution.",
        media: "PSY 3",
        duration: 8000 // 55s - 47s = 8s
    },
    {
        text: "Now virtual meets real — this is Sense Computing.\nOn an assembly station, machine vision detects in real time\npotential errors, missing tools, or incorrect component orientation.\nThe operator receives contextual guidance in a hybrid virtual–real environment.",
        media: "PSY 4",
        duration: 17000 // 72s - 55s = 17s
    },
    {
        text: "",
        media: "PSY 5",
        duration: 5000 // 77s - 72s = 5s
    },
    {
        text: "The result?\nErrors are prevented before they happen,\nand know-how is captured and continuously capitalized in order to ensure the right level of productivity to address the A&D market.",
        media: "PSY Content",
        duration: 0 // Last slide - no auto progression
    }
];

// ===== STATE MANAGEMENT =====
let currentSlide = -1; // Start at -1 to show intro
let activeMedia = null; // Track currently visible media
let soundStarted = false; // Track if Manufacturing Sound has been shown
let autoProgressTimer = null; // Timer for auto progression
let isPresentationRunning = false; // Track if presentation is running

// ===== SDK INTEGRATION =====
// Function to send visibility messages to the SDK platform
function toggleVisibility(actorName, visible) {
    console.log("toggleVisibility:", actorName, visible);
    window.parent.postMessage(JSON.stringify({
        action: "toggleVisibility",
        actor: actorName,
        visible: visible
    }), "*");
}

// Function to show 3D media
function showMedia(mediaName) {
    if (mediaName) {
        toggleVisibility(mediaName, true);
        activeMedia = mediaName;
        console.log(`Showing 3D object: ${mediaName}`);
    }
}

// Function to hide 3D media
function hideMedia(mediaName) {
    if (mediaName) {
        toggleVisibility(mediaName, false);
        console.log(`Hiding 3D object: ${mediaName}`);
    }
}

// Function to hide all media
function hideAllMedia() {
    const allMedia = ["PSY 1", "PSY 2", "PSY 3", "PSY 4", "PSY 5", "PSY Content"];
    allMedia.forEach(media => {
        toggleVisibility(media, false);
    });
    activeMedia = null;
    console.log("All 3D objects hidden");
}

// Function to hide AS IS Production only when presentation starts
function hideASISProduction() {
    toggleVisibility("AS IS Production", false);
    console.log("AS IS Production hidden");
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initStars();
    initPresentation();

    console.log("Production System Presentation (Auto) loaded - SDK ready");
});

// ===== STARS CREATION =====
function initStars() {
    const starsContainer = document.getElementById('stars');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 2 + 0.5;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 2) + 's';

        starsContainer.appendChild(star);
    }
}

// ===== PRESENTATION LOGIC =====
function initPresentation() {
    const nextBtn = document.getElementById('nextBtn');
    const textContent = document.getElementById('textContent');

    // Hide all PSY media at start (but NOT AS IS Production yet)
    hideAllMedia();

    // Hide Manufacturing Sound initially
    toggleVisibility("Manufacturing Sound", false);

    // Show intro state
    setTimeout(() => {
        textContent.classList.add('show');
        nextBtn.classList.add('show');
    }, 300);

    // Next button click handler
    nextBtn.addEventListener('click', nextSlide);

    // Update progress
    updateProgress();
}

function nextSlide() {
    const textContent = document.getElementById('textContent');
    const slideText = textContent.querySelector('.slide-text');
    const nextBtn = document.getElementById('nextBtn');

    // On first click, show Manufacturing Sound and start auto presentation
    if (!soundStarted) {
        toggleVisibility("Manufacturing Sound", true);
        soundStarted = true;
        isPresentationRunning = true;

        // Hide the button during auto-presentation
        nextBtn.style.display = 'none';
    }

    // Clear any existing timer
    if (autoProgressTimer) {
        clearTimeout(autoProgressTimer);
        autoProgressTimer = null;
    }

    // Don't hide previous media - keep them visible!
    // Each new media adds to the scene

    // Move to next slide
    currentSlide++;

    // Check if presentation is complete
    if (currentSlide >= slides.length) {
        // End of presentation
        isPresentationRunning = false;
        showEndScreen();
        return;
    }

    // Animate out current text
    textContent.classList.remove('show');
    textContent.classList.add('slide-out');

    setTimeout(() => {
        // Update text content
        const slide = slides[currentSlide];
        slideText.textContent = slide.text;

        // Show new media if present (without hiding previous ones)
        if (slide.media) {
            showMedia(slide.media);

            // Hide AS IS Production when showing PSY Content (last media)
            if (slide.media === "PSY Content") {
                hideASISProduction();
            }
        }

        // Animate in new text
        textContent.classList.remove('slide-out');
        textContent.classList.add('slide-in');

        setTimeout(() => {
            textContent.classList.remove('slide-in');
            textContent.classList.add('show');
        }, 100);

        // Update progress
        updateProgress();

        // Auto-progress to next slide if duration is set and presentation is running
        if (isPresentationRunning && slide.duration > 0) {
            autoProgressTimer = setTimeout(() => {
                nextSlide();
            }, slide.duration);
        } else if (currentSlide === slides.length - 1) {
            // Last slide - show finish button
            nextBtn.style.display = 'block';
            nextBtn.querySelector('.btn-text').textContent = 'Finish';
        }
    }, 500);
}

function showEndScreen() {
    const textContent = document.getElementById('textContent');
    const slideText = textContent.querySelector('.slide-text');
    const nextBtn = document.getElementById('nextBtn');

    // Animate out
    textContent.classList.remove('show');
    nextBtn.classList.remove('show');

    setTimeout(() => {
        slideText.innerHTML = '<strong>Thank you</strong><br>Presentation Complete';

        textContent.classList.add('show');

        // Change button to restart
        nextBtn.querySelector('.btn-text').textContent = 'Restart Presentation';
        nextBtn.querySelector('.btn-icon').textContent = '↻';
        nextBtn.onclick = restartPresentation;

        setTimeout(() => {
            nextBtn.classList.add('show');
        }, 500);
    }, 600);
}

function restartPresentation() {
    // Clear any running timer
    if (autoProgressTimer) {
        clearTimeout(autoProgressTimer);
        autoProgressTimer = null;
    }

    // Hide all media
    hideAllMedia();

    // Show AS IS Production again when restarting
    toggleVisibility("AS IS Production", true);

    // Hide Manufacturing Sound when restarting (it will show on first click)
    toggleVisibility("Manufacturing Sound", false);

    // Reset state
    currentSlide = -1;
    soundStarted = false;
    isPresentationRunning = false;

    // Reset button
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.style.display = 'block';
    nextBtn.querySelector('.btn-text').textContent = 'Start Presentation';
    nextBtn.querySelector('.btn-icon').textContent = '→';
    nextBtn.onclick = nextSlide;

    // Reset content
    const textContent = document.getElementById('textContent');
    const slideText = textContent.querySelector('.slide-text');
    slideText.textContent = '';

    // Update progress
    updateProgress();

    console.log("Presentation restarted");
}

function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');

    const total = slides.length;
    const current = Math.max(0, currentSlide + 1);
    const percentage = (current / total) * 100;

    // Simpler approach - directly set width via inline style
    const barFill = document.createElement('div');
    barFill.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: ${percentage}%;
        background: linear-gradient(90deg, #1976d2, #4da6ff);
        border-radius: 10px;
        transition: width 0.6s ease;
        box-shadow: 0 0 10px rgba(77, 166, 255, 0.8);
    `;

    // Clear and add new fill
    progressBar.innerHTML = '';
    progressBar.appendChild(barFill);

    // Update text
    progressText.textContent = `${current} / ${total}`;
}
