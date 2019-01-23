function ManageErrorsMongoose(error){
    let newError = undefined;

    try {
        if(error.name){
            switch (error.name) {
                case 'MongoError':
                    switch (error.code) {
                        case 11000:
                            newError = {
                                all: error,
                                message: error.errmsg,
                                statusCode: 400,
                            }
                            break;
                    
                        default:
                            newError = {
                                all: error,
                                message: 'Error en el servidor, error no definido',
                                statusCode: 500,
                            }
                            break;
                    }
                    break;
                case 'ValidationError':
                    newError = {
                        all: error,
                        message: error.message,
                        statusCode: 400,
                    }                    
                    break;
                default:
                    newError = {
                        all: error,
                        message: 'Error en el servidor, error no definido',
                        statusCode: 500,
                    }
                    break;
            }
        }
        else{
            newError = {
                all: error,
                message: 'Error en el servidor, error no definido',
                statusCode: 500,
            }
        }
    } catch (error) {
        newError = {
            all: error,
            message: 'Error en el servidor, error no definido',
            statusCode: 500,
        }
    }

    return newError;
}

module.exports = {
    ManageErrorsMongoose
}