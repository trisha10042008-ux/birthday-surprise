// ===============================
// SECRET CODE
// ===============================

function showCodeBox() {
    document.getElementById("codeBox").style.display = "block";
}

function checkCode() {

    const code = document.getElementById("secretCode").value;
    const message = document.getElementById("codeMessage");

    if (code === "0531") {

        message.innerHTML = "✅ Correct Code! 🎉";
        message.style.color = "#7CFF7C";

        setTimeout(() => {

            document.getElementById("welcome").style.display = "none";
            document.getElementById("birthday").style.display = "block";

            startCountdown();

        }, 800);

    } else {

        message.innerHTML = "❌ Wrong Code! Try Again 😜";
        message.style.color = "#ff7777";

    }
}


// ===============================
// COUNTDOWN
// ===============================

function startCountdown() {

    const countdown = document.getElementById("countdown");
    const number = document.getElementById("countdownNumber");

    let count = 3;

    const timer = setInterval(() => {

        if (count > 0) {

            number.innerHTML = count;

            number.style.animation = "none";
            void number.offsetWidth;
            number.style.animation = "countZoom 1s ease";

            count--;

        } else {

            clearInterval(timer);

            number.innerHTML = "🎉 SURPRISE! 🎉";
            number.classList.add("surprise-text");

            createBalloons();
            createConfetti();
            createFireworks();

            setTimeout(() => {
                countdown.style.display = "none";
            }, 1500);
        }

    }, 1000);
}


// ===============================
// CELEBRATE
// ===============================

function celebrate() {
    createBalloons();
    createConfetti();
    createFireworks();
}

function createBalloons() {

    const balloons = ["🎈", "🎈", "🎈", "🎈", "🎈"];

    balloons.forEach((balloon, index) => {

        const element = document.createElement("div");

        element.className = "balloon";
        element.innerHTML = balloon;

        element.style.left =
            (10 + index * 18) + "%";

        element.style.animationDelay =
            (index * 0.3) + "s";

        document.getElementById("balloons").appendChild(element);
    });
}

function createConfetti() {

    const container =
        document.getElementById("confetti");

    if (!container) return;

    for (let i = 0; i < 40; i++) {

        const piece =
            document.createElement("div");

        piece.className = "confetti-piece";
        piece.innerHTML = "✨";

        piece.style.left =
            Math.random() * 100 + "%";

        piece.style.animationDelay =
            Math.random() * 2 + "s";

        container.appendChild(piece);
    }
}

function createFireworks() {

    const fireworks =
        document.getElementById("fireworks");

    if (!fireworks) return;

    for (let i = 0; i < 12; i++) {

        const firework =
            document.createElement("div");

        firework.className = "firework";
        firework.innerHTML = "🎆";

        firework.style.left =
            (10 + Math.random() * 80) + "%";

        firework.style.top =
            (10 + Math.random() * 60) + "%";

        firework.style.animationDelay =
            Math.random() * 1.5 + "s";

        fireworks.appendChild(firework);

        setTimeout(() => {
            firework.remove();
        }, 3000);
    }
}


// ===============================
// WISH
// ===============================

function makeWish() {

    const wishText =
        document.getElementById("wishText");

    wishText.innerHTML =
        "✨ Your wish is on its way! 💫❤️";

    createConfetti();
}


// ===============================
// LETTER
// ===============================

function openLetter() {

    document.getElementById("letter").style.display =
        "block";
}

function closeLetter() {

    document.getElementById("letter").style.display =
        "none";
}


// ===============================
// FINAL GIFT
// ===============================

function openGift() {

    document.getElementById("finalMessage").style.display =
        "block";

    createConfetti();
    createFireworks();
}


// ===============================
// FLOATING HEARTS
// ===============================

function createHearts() {

    const hearts =
        document.getElementById("hearts");

    if (!hearts) return;

    setInterval(() => {

        const heart =
            document.createElement("div");

        heart.className = "heart";
        heart.innerHTML = "❤️";

        heart.style.left =
            Math.random() * 100 + "%";

        heart.style.animationDuration =
            (5 + Math.random() * 4) + "s";

        hearts.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 9000);

    }, 700);
}

createHearts();


// ===============================
// REPLAY
// ===============================

function replaySurprise() {
    location.reload();
}


// ===============================
// MEMORY PUZZLE
// ===============================

const puzzle =
    document.getElementById("puzzle");

if (puzzle) {

    const positions = [
        "0% 0%",
        "50% 0%",
        "100% 0%",
        "0% 50%",
        "50% 50%",
        "100% 50%",
        "0% 100%",
        "50% 100%",
        "100% 100%"
    ];

    let pieces = [];

    for (let i = 0; i < 9; i++) {

        const piece =
            document.createElement("div");

        piece.className = "puzzle-piece";

        piece.style.backgroundPosition =
            positions[i];

        piece.dataset.correct = i;

        pieces.push(piece);
    }

    pieces.sort(() => Math.random() - 0.5);

    pieces.forEach(piece => {
        puzzle.appendChild(piece);
    });

    let selectedPiece = null;

    puzzle.addEventListener("click", function(event) {

        const piece = event.target;

        if (!piece.classList.contains("puzzle-piece")) {
            return;
        }

        if (selectedPiece === null) {

            selectedPiece = piece;

            piece.classList.add("selected");

            return;
        }

        if (selectedPiece === piece) {

            piece.classList.remove("selected");

            selectedPiece = null;

            return;
        }

        const children =
            Array.from(puzzle.children);

        const firstIndex =
            children.indexOf(selectedPiece);

        const secondIndex =
            children.indexOf(piece);

        [
            children[firstIndex],
            children[secondIndex]
        ] =
        [
            children[secondIndex],
            children[firstIndex]
        ];

        children.forEach(item => {
            puzzle.appendChild(item);
        });

        selectedPiece.classList.remove("selected");

        selectedPiece = null;

        checkPuzzle();
    });


    function checkPuzzle() {

        const currentPieces =
            Array.from(puzzle.children);

        const solved =
            currentPieces.every((piece, index) => {

                return Number(piece.dataset.correct)
                    === index;

            });

        if (solved) {

            document.getElementById(
                "puzzleMessage"
            ).innerHTML =
                "🎉 Memory Unlocked! ❤️";

            createConfetti();
            createFireworks();

            setTimeout(() => {

                puzzle.innerHTML = "";

                puzzle.style.display = "block";

                puzzle.style.backgroundImage =
                    'url("photos/photo1.jpg")';

                puzzle.style.backgroundSize =
                    "cover";

                puzzle.style.backgroundPosition =
                    "center";

                document.getElementById(
                    "puzzleMessage"
                ).innerHTML =
                    "💖 Our Beautiful Memory! 💖";

            }, 1200);
        }
    }
}


// ===============================
// PUZZLE HINT
// ===============================

function showPuzzleHint() {

    const puzzle =
        document.getElementById("puzzle");

    if (!puzzle) return;

    puzzle.style.backgroundImage =
        'url("photos/photo1.jpg")';

    puzzle.style.backgroundSize =
        "cover";

    puzzle.style.backgroundPosition =
        "center";

    setTimeout(() => {

        puzzle.style.backgroundImage =
            "none";

    }, 2000);
}
function playBirthdayMusic() {

    const music = document.getElementById("birthdayMusic");

    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}