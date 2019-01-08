//puerto
process.env.PORT = process.env.PORT || 3002;

//entorno de datos
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//base de datos
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
}
else{
    urlDB = 'mongodb://userCafe:user123@ds050739.mlab.com:50739/cafenode';
}

//urlDB = 'mongodb://userCafe:user123@ds050739.mlab.com:50739/cafenode';

process.env.URLDB = urlDB;


