import Server from './server/server';
import router from './router/router';

const server = Server.init(3000);

server.app.use(router)

server.start(() => {
    console.log('server run in port 3000')
    console.log('codigo de typescript');
})

