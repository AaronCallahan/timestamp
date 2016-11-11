'use strict';
const express = require('express');
const app = express();
const moment = require('moment');
const port = process.argv[2] || 8080;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render(
        'index', {
            title: 'Timestamp microservice'
        });
});

app.get('/:date', (req, res) => {
    let dateStr = req.params.date;
    let output;

    // Detect if date is unix. If not, assume it's natural.
    if (/^\d{8,}$/.test(dateStr)) {
        output = moment(dateStr, "X");
    }
    else {
        output = moment(dateStr, "MMMM D, YYYY");
    }

    // If output is a valid date send it, otherwise set to null.
    if (output.isValid()) {
        res.json({
            unix: output.format("X"),
            natural: output.format("MMMM D, YYYY")
        });
    }
    else {
        res.json({
            unix: null,
            natural: null
        });
    }
});

app.listen(port, () => {
    console.log('Server listening on port ' + port + '!');
});
