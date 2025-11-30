/**
 * Virtual Dog Game
 * A simple game where you take care of a virtual dog
 */

class VirtualDog {
    constructor() {
        // Dog stats (0-100)
        this.hunger = 100;
        this.happiness = 100;
        this.energy = 100;
        this.name = 'Buddy';
        
        // State flags
        this.isSleeping = false;
        this.isEating = false;
        this.isPlaying = false;
        
        // DOM elements
        this.dogElement = document.getElementById('dog');
        this.tongueElement = document.getElementById('dog-tongue');
        this.tailElement = document.getElementById('dog-tail');
        this.statusMessage = document.getElementById('status-message');
        this.dogNameElement = document.getElementById('dog-name');
        
        // Stat bars and values
        this.hungerBar = document.getElementById('hunger-bar');
        this.happinessBar = document.getElementById('happiness-bar');
        this.energyBar = document.getElementById('energy-bar');
        this.hungerValue = document.getElementById('hunger-value');
        this.happinessValue = document.getElementById('happiness-value');
        this.energyValue = document.getElementById('energy-value');
        
        // Buttons
        this.feedBtn = document.getElementById('feed-btn');
        this.playBtn = document.getElementById('play-btn');
        this.sleepBtn = document.getElementById('sleep-btn');
        this.petBtn = document.getElementById('pet-btn');
        this.renameBtn = document.getElementById('rename-btn');
        
        // Bind event listeners
        this.bindEvents();
        
        // Start the game loop
        this.startGameLoop();
        
        // Load saved data
        this.loadGame();
        
        // Initial UI update
        this.updateUI();
    }
    
    bindEvents() {
        this.feedBtn.addEventListener('click', () => this.feed());
        this.playBtn.addEventListener('click', () => this.play());
        this.sleepBtn.addEventListener('click', () => this.sleep());
        this.petBtn.addEventListener('click', () => this.pet());
        this.renameBtn.addEventListener('click', () => this.renameDog());
    }
    
    feed() {
        if (this.isSleeping) {
            this.showMessage('Shhh... the dog is sleeping! 😴');
            return;
        }
        
        if (this.hunger >= 100) {
            this.showMessage(`${this.name} is not hungry right now!`);
            return;
        }
        
        this.isEating = true;
        this.dogElement.classList.add('eating');
        this.tongueElement.classList.add('visible');
        
        this.hunger = Math.min(100, this.hunger + 25);
        this.happiness = Math.min(100, this.happiness + 5);
        
        this.showMessage(`${this.name} enjoyed the food! 🍖`);
        this.updateUI();
        this.saveGame();
        
        setTimeout(() => {
            this.isEating = false;
            this.dogElement.classList.remove('eating');
            this.tongueElement.classList.remove('visible');
        }, 1500);
    }
    
    play() {
        if (this.isSleeping) {
            this.showMessage('Shhh... the dog is sleeping! 😴');
            return;
        }
        
        if (this.energy < 20) {
            this.showMessage(`${this.name} is too tired to play!`);
            return;
        }
        
        if (this.hunger < 20) {
            this.showMessage(`${this.name} is too hungry to play!`);
            return;
        }
        
        this.isPlaying = true;
        this.dogElement.classList.add('playing');
        this.tailElement.classList.add('wagging');
        
        this.happiness = Math.min(100, this.happiness + 20);
        this.energy = Math.max(0, this.energy - 15);
        this.hunger = Math.max(0, this.hunger - 10);
        
        this.showMessage(`${this.name} had fun playing! 🎾`);
        this.updateUI();
        this.saveGame();
        
        setTimeout(() => {
            this.isPlaying = false;
            this.dogElement.classList.remove('playing');
            this.tailElement.classList.remove('wagging');
        }, 2000);
    }
    
    sleep() {
        if (this.isSleeping) {
            // Wake up
            this.isSleeping = false;
            this.dogElement.classList.remove('sleeping');
            this.sleepBtn.textContent = '😴 Sleep';
            this.showMessage(`${this.name} woke up refreshed! ☀️`);
        } else {
            // Go to sleep
            this.isSleeping = true;
            this.dogElement.classList.add('sleeping');
            this.sleepBtn.textContent = '☀️ Wake Up';
            this.showMessage(`${this.name} is sleeping... 💤`);
        }
        
        this.updateUI();
        this.saveGame();
    }
    
    pet() {
        if (this.isSleeping) {
            this.showMessage('Shhh... the dog is sleeping! 😴');
            return;
        }
        
        this.dogElement.classList.add('happy');
        this.tailElement.classList.add('wagging');
        this.tongueElement.classList.add('visible');
        
        this.happiness = Math.min(100, this.happiness + 10);
        
        const messages = [
            `${this.name} loves the pets! 🤚`,
            `${this.name} wags their tail happily! 🐕`,
            `${this.name} gives you a big lick! 👅`,
            `${this.name} rolls over for belly rubs! 🐶`
        ];
        
        this.showMessage(messages[Math.floor(Math.random() * messages.length)]);
        this.updateUI();
        this.saveGame();
        
        setTimeout(() => {
            this.dogElement.classList.remove('happy');
            this.tailElement.classList.remove('wagging');
            this.tongueElement.classList.remove('visible');
        }, 1500);
    }
    
    renameDog() {
        const newName = prompt('Enter a new name for your dog:', this.name);
        if (newName && newName.trim()) {
            this.name = newName.trim().substring(0, 20); // Limit to 20 characters
            this.dogNameElement.textContent = this.name;
            this.showMessage(`Your dog is now called ${this.name}! 🎉`);
            this.saveGame();
        }
    }
    
    updateUI() {
        // Update stat bars
        this.hungerBar.style.width = `${this.hunger}%`;
        this.happinessBar.style.width = `${this.happiness}%`;
        this.energyBar.style.width = `${this.energy}%`;
        
        // Update stat values
        this.hungerValue.textContent = `${Math.round(this.hunger)}%`;
        this.happinessValue.textContent = `${Math.round(this.happiness)}%`;
        this.energyValue.textContent = `${Math.round(this.energy)}%`;
        
        // Update dog name
        this.dogNameElement.textContent = this.name;
        
        // Update button states
        this.feedBtn.disabled = this.isSleeping;
        this.playBtn.disabled = this.isSleeping || this.energy < 20 || this.hunger < 20;
        this.petBtn.disabled = this.isSleeping;
        
        // Visual feedback for low stats
        this.updateStatColors();
    }
    
    updateStatColors() {
        // Change bar colors based on stat levels
        if (this.hunger < 30) {
            this.hungerBar.style.background = 'linear-gradient(90deg, #c0392b, #e74c3c)';
        } else {
            this.hungerBar.style.background = 'linear-gradient(90deg, #ff6b6b, #ee5a5a)';
        }
        
        if (this.happiness < 30) {
            this.happinessBar.style.background = 'linear-gradient(90deg, #c0392b, #e74c3c)';
        } else {
            this.happinessBar.style.background = 'linear-gradient(90deg, #feca57, #ff9f43)';
        }
        
        if (this.energy < 30) {
            this.energyBar.style.background = 'linear-gradient(90deg, #c0392b, #e74c3c)';
        } else {
            this.energyBar.style.background = 'linear-gradient(90deg, #48dbfb, #0abde3)';
        }
    }
    
    showMessage(message) {
        this.statusMessage.textContent = message;
        
        // Clear message after 3 seconds
        setTimeout(() => {
            if (this.statusMessage.textContent === message) {
                this.statusMessage.textContent = '';
            }
        }, 3000);
    }
    
    startGameLoop() {
        // Stats decrease over time (every 5 seconds)
        setInterval(() => {
            if (this.isSleeping) {
                // Recover energy while sleeping
                this.energy = Math.min(100, this.energy + 5);
                // But hunger still decreases slowly
                this.hunger = Math.max(0, this.hunger - 1);
            } else {
                // Normal stat decay
                this.hunger = Math.max(0, this.hunger - 2);
                this.happiness = Math.max(0, this.happiness - 1);
                this.energy = Math.max(0, this.energy - 1);
            }
            
            this.updateUI();
            this.checkDogStatus();
            this.saveGame();
        }, 5000);
    }
    
    checkDogStatus() {
        // Check for critical stats and show warnings
        if (this.hunger < 20 && !this.isSleeping) {
            this.showMessage(`${this.name} is very hungry! 🍖`);
        } else if (this.happiness < 20 && !this.isSleeping) {
            this.showMessage(`${this.name} is feeling sad... 😢`);
        } else if (this.energy < 20 && !this.isSleeping) {
            this.showMessage(`${this.name} is very tired! 😴`);
        }
    }
    
    saveGame() {
        const gameState = {
            hunger: this.hunger,
            happiness: this.happiness,
            energy: this.energy,
            name: this.name,
            isSleeping: this.isSleeping,
            lastSaved: Date.now()
        };
        
        localStorage.setItem('virtualDogGame', JSON.stringify(gameState));
    }
    
    loadGame() {
        const saved = localStorage.getItem('virtualDogGame');
        
        if (saved) {
            try {
                const gameState = JSON.parse(saved);
                
                // Calculate time passed since last save
                const timePassed = Date.now() - gameState.lastSaved;
                const minutesPassed = timePassed / (1000 * 60);
                
                // Apply stat decay based on time passed (max 50% decay)
                const decay = Math.min(50, minutesPassed * 2);
                
                this.hunger = Math.max(0, gameState.hunger - decay);
                this.happiness = Math.max(0, gameState.happiness - decay);
                this.energy = gameState.isSleeping 
                    ? Math.min(100, gameState.energy + decay) 
                    : Math.max(0, gameState.energy - decay);
                this.name = gameState.name || 'Buddy';
                this.isSleeping = gameState.isSleeping || false;
                
                if (this.isSleeping) {
                    this.dogElement.classList.add('sleeping');
                    this.sleepBtn.textContent = '☀️ Wake Up';
                }
                
                if (minutesPassed > 1) {
                    this.showMessage(`Welcome back! ${this.name} missed you! 🐕`);
                }
            } catch (error) {
                console.error('Error loading game:', error);
            }
        }
    }
}

// Initialize the game when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new VirtualDog();
});
