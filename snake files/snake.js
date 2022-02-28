import {getInputDirection} from "./input.js";

export const SNAKE_SPEED = 15;

let snakeBody = [{x: 10, y: 11},
					{x: 9, y: 11},
					{x: 8, y: 11}];

let newSegments = 0;

export function update() {
	addSegments();

	const inputDirection = getInputDirection();

	for (let i = snakeBody.length - 2; i >= 0; i--) {
		snakeBody[i+1] = {...snakeBody[i]};
	}

	snakeBody[0].x += inputDirection.x;
	snakeBody[0].y += inputDirection.y;
}

export function draw(gameBoard) {
	snakeBody.forEach(segment => {
		const snakeElement = document.createElement('div');
		snakeElement.style.gridRowStart = segment.y;
		snakeElement.style.gridColumnStart = segment.x;

		snakeElement.classList.add('snake');
		gameBoard.appendChild(snakeElement);
	})
}

export function expandSnake(expansionRate) {
	newSegments += expansionRate;
}

export function onSnake(position, {ignoreHead = false} = {}) {
	return snakeBody.some((segment, index) => {
		if (ignoreHead && index === 0) return false;
		return equalPositions(segment, position);
	})
}

export function getSnakeHead() {
	return snakeBody[0];
}

export function snakeIntersection() {
	return onSnake(snakeBody[0], { ignoreHead: true })
}

export function reset() {
	snakeBody = [{x: 10, y: 11},
					{x: 9, y: 11},
					{x: 8, y: 11}];
}

function equalPositions(pos1, pos2) {
	return pos1.x === pos2.x && pos1.y === pos2.y;	
}

function addSegments() {
	for (let i=0; i<newSegments; i++) {
		snakeBody.push({ ...snakeBody[snakeBody.length - 1]});
	}

	newSegments = 0;
}