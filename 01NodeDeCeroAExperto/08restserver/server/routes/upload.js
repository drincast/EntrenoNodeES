const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();


// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
    res.send('pong');
});

app.put('/upload', function(req, res) {
    let file;
    let uploadPath;

    if (Object.keys(req.files).length == 0) {
        res.status(400).json({
            ok: false,
            message: 'No hay archivos para cargar.'
        });
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    file = req.files.file;

    uploadPath = path.resolve(__dirname, '../../uploads/', file.name);

    console.log('uploadPath >>>', uploadPath); // eslint-disable-line

    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: err
            });
        }

        res.json({
            ok: true,
            message: 'File uploaded to ' + uploadPath
        });
    });
});

// app.listen(PORT, function() {
//   console.log('Express server listening on port ', PORT); // eslint-disable-line
// });

module.exports = app;