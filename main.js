'use strict';

import { gameLoop } from './game-loop.js';

function createTile(win, size) {
	const div = win.document.createElement('div');
	div.classList.add('tile');
	div.style.width = size + 'px';
	div.style.height = size + 'px';
	return div;
}

function createLayer(layer, columns, rows, tile_size) {
	const table = []
	let x, y;

	for (y = 0; y < rows; ++y) {
		let row = [];
		table[y] = row;

		for (x = 0; x < columns; ++x) {
			const tile = createTile(win, tile_size);
			row[x] = tile;
			layer.appendChild(tile);
		}
	}

	layer.style.width = ((columns + 1) * tile_size) + 'px';
	layer.style.height = ((rows + 1) * tile_size) + 'px';
	return table;
}

function installEventHandler(win, input_state) {
	win.addEventListener('keydown', (e) => {
		input_state.key = e.keyCode;
		e.preventDefault();
	});

	win.addEventListener('keyup', (e) => {
		input_state.key = 0;
		e.preventDefault();
	});
}

function gameLoopSafe(game_state) {
	try {
		gameLoop(game_state);
	}
	catch(e) {
		console.error(e);
	}

	game_state.win.requestAnimationFrame(() => gameLoopSafe(game_state));
}

function main(win) {
	const columns = 32;
	const rows = 24;
	const tile_size = 32;

	const doc = win.document;
	const game_box = doc.getElementById('game-box');
	game_box.style.width = (columns * tile_size) + 'px';
	game_box.style.height = (rows * tile_size) + 'px';

	const table = [];
	for (i=0; i<4; ++i) {
		table[i] = createLayer(doc.getElementById('layer' + i,
								columns, rows, tile_size);
	}

	const input_state = {
		key: 0
	};
	Object.seal(game_state);
	installEventHandler(win, input_state);

	const game_state = {
		win: win,
		input: input_state,
		table: table,
		rows: rows,
		columns: columns,
		tile_size: tile_size
	};

	Object.seal(game_state);
	gameLoopSafe(game_state);
}

main(window);

// vim: ts=2 softtabstop=2 noexpandtab
