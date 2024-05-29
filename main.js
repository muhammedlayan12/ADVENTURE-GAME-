const inquirer = require("inquirer");

class Player {
    constructor(name, health = 100) {
        this.name = name;
        this.health = health;
    }

    displayHealth() {
        console.log(`${this.name}'s health: ${this.health}`);
    }

    isAlive() {
        return this.health > 0;
    }
}

class AdventureGame {
    constructor(playerName) {
        this.player = new Player(playerName);
    }

    async start() {
        console.log("Welcome to the Adventure Game!");
        console.log("You find yourself in a mysterious forest...");
        this.player.displayHealth();
        await this.explore();
    }

    async explore() {
        console.log("You start exploring the forest...");
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['Continue exploring', 'Check health', 'Quit']
            }
        ]);

        switch (action) {
            case 'Continue exploring':
                console.log("You found a shiny object!");
                console.log("But suddenly, a wild beast appears!");
                await this.encounterBeast();
                break;
            case 'Check health':
                this.player.displayHealth();
                await this.explore();
                break;
            case 'Quit':
                console.log("Quitting game...");
                return;
        }
    }

    async encounterBeast() {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What do you want to do?',
                choices: ['Fight', 'Run']
            }
        ]);

        if (action === 'Fight') {
            const playerWins = Math.random() < 0.5;
            if (playerWins) {
                console.log("You defeat the beast and continue your journey!");
            } else {
                console.log("Oh no! The beast defeated you...");
                console.log("Game Over!");
                return;
            }
        } else {
            console.log("You run away from the beast...");
        }

        await this.explore();
    }
}

const game = new AdventureGame("Player");
game.start();
