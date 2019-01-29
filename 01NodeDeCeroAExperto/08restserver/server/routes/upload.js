const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const app = express();

const User = require('../models/user');
const Product = require('../models/product');


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

        switch (folder) {
            case 'users':
                imageUser(id, res, newName);
                break;
            case 'products':
                imageProduct(id, res, newName, folder);
                break;        
            default:
                res.status(500).json({
                    ok: false,
                    message: 'No se ejecuto la carga del archivo'
                });
                break;
        }
    });
});

function DeleteFile(type, fileName){
    let pathUrlImg = path.resolve(__dirname, `../../uploads/${type}/${fileName}`);
    if (fs.existsSync(pathUrlImg)) {
        fs.unlinkSync(pathUrlImg);
    }
}

function imageUser(id, res, fileName){
    User.findById(id)
    .then(userDB => {
        if(userDB === undefined || userDB === null){
            DeleteFile('users', fileName);
            return res.status(400).json({
                ok: false,
                message: 'El usuario no existe'
            });
        }

        DeleteFile('users', userDB.img);

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

function imageProduct(id, res, fileName, folder){
    Product.findById(id)
    .then(productDB => {
        if(productDB === undefined || productDB === null){
            DeleteFile(folder, fileName);
            return res.status(400).json({
                ok: false,
                message: 'El producto no existe'
            });
        }

        if(productDB.img !== undefined || productDB.img !== null){
            DeleteFile(folder, productDB.img);
        }

        productDB.img = fileName;

        productDB.save()
        .then(pdtDB => {
            res.json({
                ok: true,
                message: pdtDB
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