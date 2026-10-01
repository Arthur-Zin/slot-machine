

// State variables
let spinsRemaining = 100;
const emojis = ['🍒', '🍋', '🍊', '🍇', '🔔', '💎'];

// DOM Element cache references
const spinBtn = document.getElementById('spin-btn');
const resetBtn = document.getElementById('reset-btn');
const spinCountEl = document.getElementById('spin-count');
const statusEl = document.getElementById('game-status');
const CashDisplay = document.getElementById('cash-amount');
const buySpinsBtn = document.getElementById('buyspins-btn');
const Buyluckbtn = document.getElementById('luck-buy-btn');
const LuckUpgradeCost = document.getElementById('Luck-upgrd-cost');
let Cash = 0;
let Luck = 0;
let LuckCost = (Luck * 1000) + 500;
LuckUpgradeCost.textContent = `$ ${LuckCost}`;
const slots = [
    document.getElementById('slot1'),
    document.getElementById('slot2'),
    document.getElementById('slot3')
];

function getRandomEmoji() {
    const randomIndex = Math.floor(Math.random() * ((emojis.length) - Luck));
    return emojis[randomIndex];
}



function handleSpin() {
    if (spinsRemaining <= 0) {
        statusEl.textContent = "Out of spins! Click Reset.";
        return;
    }

    spinsRemaining--;
    updatespins();
    statusEl.textContent = "Spinning...";

    spinBtn.disabled = true;
    resetBtn.disabled = true;

    slots.forEach((slot) => {
        slot.classList.add('spinning');
    });

    let midSpinInterval = setInterval(() => {
        slots.forEach(slot => {
            if (slot.classList.contains('spinning')) {
                slot.textContent = getRandomEmoji();
            }
        });
    }, 50);

    slots.forEach((slot, index) => {
        setTimeout(() => {
            slot.classList.remove('spinning');
            slot.textContent = getRandomEmoji();

            if (index === slots.length - 1) {
                clearInterval(midSpinInterval);
                checkOutcome();
                spinBtn.disabled = false;
                resetBtn.disabled = false;
            }
        }, 600 + (index * 300)); // reEl 1600ms Ree 2 900ms Rel 3 1200ms
    });
}

function checkOutcome() {
    const result1 = slots[0].textContent;
    const result2 = slots[1].textContent;
    const result3 = slots[2].textContent;

    if (result1 === result2 && result2 === result3) {
        statusEl.textContent = " 🎉 JACKPOT!!!!!!! 🎉 ";
        Cash += 1000;
        updateCash();
    } else if (result1 === result2 || result2 === result3 || result1 === result3) {
        statusEl.textContent = " So close! ";
        Cash += 100;
        updateCash();
    } else {
        statusEl.textContent = "Try again!";
    }
}

function updateCash() {
    CashDisplay.textContent = Cash;
}

function updatespins() {
    spinCountEl.textContent = spinsRemaining;
}

function updateLuck() {
    LuckUpgradeCost.textContent = `$ ${LuckCost}`;
}

function updateLuckCost() {
    LuckCost = (Luck * 1000) + 500;
    updateLuck();
}

function handleReset() {
    spinsRemaining = 100;
    updatespins();
    statusEl.textContent = "Press Spin to Start!";
    slots.forEach(slot => slot.textContent = '🍒');
}
// buttons
buySpinsBtn.addEventListener('click', () => {
 if (Cash >= 100) {
    Cash -= 100;
    spinsRemaining += 1;
    updateCash();
    updatespins();
} else {
    statusEl.textContent = "Too broke, try again when you have more money!";
} });
Buyluckbtn.addEventListener('click', () => {
    if (Cash >= LuckCost) {
        Cash -= LuckCost;
        Luck += 1;
        updateLuckCost();
        updateCash();
        updateLuck();
        statusEl.textContent = `Luck upgraded to ${Luck}!`;
}
else {
    statusEl.textContent = "Too broke, try again when you have more money!";
}
});
spinBtn.addEventListener('click', handleSpin);
resetBtn.addEventListener('click', handleReset);
