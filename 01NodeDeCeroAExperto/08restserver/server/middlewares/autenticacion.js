const jwt = require('jsonwebtoken');

// verificar token
let verificaToken = (req, res, next) => {
    let token = req.get('token');

    console.log(req.user);

    jwt.verify( token, process.env.SEED, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }

        req.user = decoded.user;

    });

    console.log(req.user);

    // res.json({
    //     token: token
    // })

    next();
}

module.exports = {
    verificaToken
}