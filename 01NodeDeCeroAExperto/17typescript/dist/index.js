"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = __importDefault(require("./server/server"));
var router_1 = __importDefault(require("./router/router"));
var sqlite_1 = __importDefault(require("./sqlite"));
var server = server_1.default.init(3000);
server.app.use(router_1.default);
server.start(function () {
    console.log('server run in port 3000');
    console.log('codigo de typescript');
    //let db: DB = new DB('heroes'); 
    var db = sqlite_1.default.Instance;
    db.GetHeroes();
});
