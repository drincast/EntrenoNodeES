const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

const User = require('../models/user');


// default options
app.use(fileUpload());

app.get('/ping', function(req, res) {
    res.send('pong');
});

app.put('/upload/:type/:id', function(req, res) {
    let file;
    let uploadPath;

    if(req.params.type === undefined || req.params.type === null){
        res.status(400).json({
            ok: false,
            message: 'Debe especificar el tipo.'
        });
        return;
    }

    if(req.params.id === undefined || req.params.id === null){
        res.status(400).json({
            ok: false,
            message: 'Debe especificar el id del usuario o el producto.'
        });
        return;
    }

    let type = req.params.type;
    let id = req.params.id;
    let folder = type === 'product' ? 'products' : 'users';

    console.log(req.files)

    if(req.files === undefined || req.files === null){
        res.status(400).json({
            ok: false,
            message: 'Debe seleccionar un archivo para subir.'
        });
        return;
    }

    if (Object.keys(req.files).length == 0) {
        res.status(400).json({
            ok: false,
            message: 'No hay archivos para cargar.'
        });
        return;
    }

    let validType = ['product', 'user'];

    if(validType.indexOf(type) < 0){
        res.status(400).json({
            ok: false,
            message: "tipo no valido, los tipos son product, user"
        });
        return;
    }

    console.log('req.files >>>', req.files); // eslint-disable-line

    file = req.files.file;

    //archivos permitidos
    let validExtensions = ['gif', 'jpeg', 'jpg', 'png'];
    let fileNameExtension = file.name.split('.');
    let extension = fileNameExtension[fileNameExtension.length -1];

    if(validExtensions.indexOf(extension) < 0){
        res.status(400).json({
            ok: false,
            message: "Archivo no permitido, agregar archivos gif, jpeg, jpg, png"
        })
    }

    //change name file
    let newName = `${id}-${new Date().getMilliseconds()}.${extension}`;

    uploadPath = path.resolve(__dirname, `../../uploads/${folder}`, newName);

    console.log('uploadPath >>>', uploadPath); // eslint-disable-line

    file.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: err
            });
        }

        // res.json({
        //     ok: true,
        //     message: 'File uploaded to ' + uploadPath
        // });

        imageUser(id, res, newName);        
    });
});

function imageUser(id, res, fileName){
    User.findById(id)
    .then(userDB => {
        if(userDB === undefined || userDB === null){
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe'
            });
        }

        userDB.img = fileName;

        userDB.save()
        .then(usrDB => {
            res.json({
                ok: true,
                message: usrDB
            });
        })
        .catch(err => {
            res.status(500).json({
                ok: false,
                message: err
            })
        })
    })
    .catch( err => {
        return res.status(500).json({
            ok: false,
            message: err
        })
    })
}

// app.listen(PORT, function() {
//   console.log('Express server listening on port ', PORT); // eslint-disable-line
// });

module.exports = app;