const jwt = require('jsonwebtoken');

// verificar token
let verifyToken = (req, res, next) => {
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

let verifyAdminRole = (req, res, next) => {
    let role = req.user.role;

    if(role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            ok: false,
            err: 'no tiene privilegios para realizar esta operación'
        });
    }

    next();
    return true;
}

module.exports = {
    verifyToken,
    verifyAdminRole
}