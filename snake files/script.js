import { update as updateSnake, draw as drawSnake, SNAKE_SPEED,
getSnakeHead, snakeIntersection, reset as resetSnake } from './snake.js';
import { update as updateFood, draw as drawFood, reset as resetFood } from './food.js';
import { outsideGrid } from './grid.js';
import {reset as resetInput} from './input.js';

const gameBoard = document.getElementsByClassName('game-board')[0];

let lastRenderTime = 0;
let gameOver = false;

function main(currentTime) {
	if (gameOver) {
		reset();
	}

	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

	window.requestAnimationFrame(main);

	if (secondsSinceLastRender < 1.0 / SNAKE_SPEED) return;

	lastRenderTime = currentTime;

	update();
	draw();
}

function update() {
	updateSnake();
	updateFood();

	checkDeath();
}

function draw() {
	gameBoard.innerHTML = '';
	drawSnake(gameBoard);
	drawFood(gameBoard);
}

function checkDeath() {
	gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}

function reset() {
	resetSnake();
	resetInput();
	resetFood();
	gameOver = false;
}

window.requestAnimationFrame(main);