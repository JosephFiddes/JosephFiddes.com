let inputDirection;
let lastInputDirection;

window.addEventListener('keydown', e => {
	switch (e.key) {
		case 'ArrowUp':
		case 'w':
			if (lastInputDirection.y != 0) break;
			inputDirection = {x:0, y:-1};
			break;
		case 'ArrowLeft':
		case 'a':
			if (lastInputDirection.x != 0) break;
			inputDirection = {x:-1, y:0};
			break;
		case 'ArrowDown':
		case 's':
			if (lastInputDirection.y != 0) break;
			inputDirection = {x:0, y:1};
			break;
		case 'ArrowRight':
		case 'd':
			if (lastInputDirection.x != 0) break;
			inputDirection = {x:1, y:0};
			break;
	}
})

export function getInputDirection() {
	lastInputDirection = inputDirection;
	return inputDirection;
}

export function reset() {
	inputDirection = {x:1, y:0};
	lastInputDirection = inputDirection;
}

reset();