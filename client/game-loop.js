'use strict';

let g_frameCount = 0;

function paintTile(win, tile, x, y) {

}

function drawTiles(win, layer, x, y, rows, columns, tile_size) {
	let column, row;
	const doc = win.document;

	const column_shift = Math.floor(x / tile_size) % columns;
	const row_shift = Math.floor(y / tile_size) % rows;

	for (row = 0; row < rows; ++row) {
		for (column = 0; column < columns; ++column) {
			const tile = layer.tile[row][column];
			const x = (column - column_shift + columns) % columns * tile_size;
			const y = (row - row_shift + rows) % rows * tile_size;
			tile.style.transform = 'translate(' + x + 'px,' + y + 'px)';
			tile.style.backgroundColor = 'rgb(' + (column * 8) + ', ' + (row * 8) + ', ' + (127) + ')';
	}

	layer.elem.style.transform = 'translate(' + -(x % tile_size) + 'px, ' + -(y % tile_size) + ')';
}

export function gameLoop(game_state) {
	const key = game_state.input.key;
	const win = game_state.layers[0].elem.ownerDocument.defaultView;

	// handle input
	switch (key) {
	case 39: // right
		break;
	case 37: // left
		break;
	case 32: // jump
		break;
	}

	drawTiles(win, game_state.layers[3], g_frameCount, 0, game_state.rows, game_state.columns, game_state.tile_size);
	++g_frameCount;
}


// vim: ts=2 softtabstop=2 noexpandtab
