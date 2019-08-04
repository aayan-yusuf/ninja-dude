'use strict';

let g_frameCount = 0;

function paintTile(win, tile, x, y) {

}

function drawTiles(win, table, x_pos, rows, columns, tile_size) {
	let x, y;
	const doc = win.document;

	for (y = 0; y < rows; ++y) {
		for (x = 0; x < columns; ++x) {
			let tile = g_tiles[y][x];
			tile.style.left = x * tile_size + 'px';
			tile.style.top = y * tile_size + 'px';
			tile.style.backgroundColor = 'rgb(' + (x * 8) + ', ' + (y * 8) + ', ' + (127) + ')';
		}
	}

	table.style.left = -(x_pos % tile_size) + 'px';
}

export function gameLoop(win, game_state) {
	const key = game_state.input.key;

	// handle input
	switch (key) {
	case 39: // right
		break;
	case 37: // left
		break;
	case 32: // jump
		break;
	}

	drawTiles(win, table[3], g_frameCount, game_state.rows, game_state.columns, game_state.tile_size);
	++g_frameCount;
}


// vim: ts=2 softtabstop=2 noexpandtab
