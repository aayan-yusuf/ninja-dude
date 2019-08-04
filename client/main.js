'use strict';

import { gameLoop } from './game-loop.js';

function createTile(doc, size) {
	const div = doc.createElement('div');
	div.classList.add('tile');
	div.style.width = size + 'px';
	div.style.height = size + 'px';
	return div;
}

function createLayer(container, columns, rows, tile_size) {
	const doc = container.ownerDocument;
	const layerElem = doc.createElement('div');
	layerElem.classList.add('layer');
	layerElem.style.width = (columns * tile_size) + 'px';
	layerElem.style.height = (rows * tile_size) + 'px';
	container.appendChild(layerElem);

	const table = []
	let x, y;

	for (y = 0; y < rows; ++y) {
		const row = [];
		table[y] = row;

		for (x = 0; x < columns; ++x) {
			const tile = createTile(doc, tile_size);
			row[x] = tile;
			layerElem.appendChild(tile);
		}
	}

	const layer = {
		elem: layerElem,
		tile: table
	};
	Object.seal(layer);

	return layer;
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

function gameLoopSafe(win, game_state) {
	try {
		gameLoop(game_state);
	}
	catch(e) {
		console.error(e);
	}

	win.requestAnimationFrame(() => gameLoopSafe(win, game_state));
}

function main(win) {
	const columns = 32;
	const rows = 24;
	const tile_size = 32;
	const n_layers = 4;
	const seam_size = 1;

	const doc = win.document;
	const game_box = doc.getElementById('game-box');
	game_box.style.width = (columns * tile_size) + 'px';
	game_box.style.height = (rows * tile_size) + 'px';

	const viewport = doc.getElementById('viewport');
	const columns_with_seam = columns + seam_size;
	const rows_with_seam = rows + seam_size;
	const layers = [];
	let i;
	for (i=0; i<n_layers; ++i) {
		layers.push(createLayer(viewport, columns_with_seam, rows_with_seam,
								tile_size));
	}

	const input_state = {
		key: 0
	};
	Object.seal(input_state);
	installEventHandler(win, input_state);

	const game_state = {
		input: input_state,
		layers: layers,
		rows: rows_with_seam,
		columns: columns_with_seam,
		tile_size: tile_size
	};

	Object.seal(game_state);
	gameLoopSafe(win, game_state);
}

main(window);

// vim: ts=2 softtabstop=2 noexpandtab
