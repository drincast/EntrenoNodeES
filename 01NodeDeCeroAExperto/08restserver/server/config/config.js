//puerto
process.env.PORT = process.env.PORT || 3002;

//entorno de datos
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//fecha expiracion token
process.env.EXPIRATION_TOKEN = 60 * 60 * 24 * 4;

//seed de autenticación
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';


//base de datos
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}
else{
    urlDB = process.env.MONGOLAB_URI;
}

//google client id
process.env.CLIENT_ID = process.env.CLIENT_ID || '572458336537-60ibil7qjtpsvpgo0e1jtvphq2kffsgf.apps.googleusercontent.com';

//crear variable en heroku
// ver variables heroku config
// crear variable config:set [NOMBRE]=[valor]
// quitar variable config:unset [NOMBRE]=[valor]

//urlDB = 'mongodb://userCafe_321:xx_user123@ds050739.mlab.com:50739/cafenode';

process.env.URLDB = urlDB;


