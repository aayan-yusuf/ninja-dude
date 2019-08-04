const express = require('express');
var path = require("path");
const app = express();

app.use('/src', express.static(__dirname + '/src' ));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(8080, () => console.log('Listening on port 8080!'));

// vim: ts=2 softtabstop=2 noexpandtab
