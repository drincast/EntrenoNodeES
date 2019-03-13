"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite = __importStar(require("sqlite3"));
var sqlite3 = sqlite.verbose();
var DB = /** @class */ (function () {
    function DB(dbName) {
        this.dbName = dbName;
        this.LoadOfDB();
        //console.log(this.db);
    }
    // PRIVATE METHODS
    DB.prototype.LoadOfDB = function () {
        var _this = this;
        try {
            this.db = new sqlite3.Database(this.dbName, function (err) {
                if (err) {
                    console.log("error en la base de datos: " + err);
                }
                console.log('se conecto a la db');
                _this.CreateTableHeroes();
            });
        }
        catch (error) {
            console.log(error);
        }
    };
    DB.prototype.CreateTableHeroes = function () {
        var _this = this;
        var script = "CREATE TABLE IF NOT EXISTS tblHeroes (\n                        id INTEGER PRIMARY KEY AUTOINCREMENT,\n                        name TEXT(100),\n                        nickname TEXT(100),\n                        power TEXT(500)\n                     )";
        this.db.run(script, function (err) {
            if (err === null) {
                console.log('se creo la tabla tblHeroes');
                _this.InsertInitialData();
            }
            else {
                console.log('error al crear la tabla', err);
            }
        });
    };
    DB.prototype.InsertInitialData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var script;
            var _this = this;
            return __generator(this, function (_a) {
                script = "SELECT nickname FROM tblHeroes";
                this.db.get(script, function (err, row) {
                    if (err === null) {
                        if (undefined === row) {
                            // script = `INSERT INTO tblHeroes(name, nickname, power) VALUES(?,?,?)`;                    
                            // this.db.run(script, ['xxx', 'walk man', 'no hace musica'], (err: Error) => {
                            //     if(err)
                            //         console.log('error', err);
                            //     else
                            //         console.log('database is on-line');
                            // });
                            _this.InsertHeroe('xxx', 'helada girl', 'hielo en las pestañas');
                            _this.InsertHeroe('???', 'mr burguer', 'no puede si no con media hamburguesa');
                            _this.InsertHeroe('???', 'chispas', 'no se puede peinar');
                        }
                    }
                    else {
                        console.log('error en la consulta, para verificar si hay datos', err);
                    }
                });
                return [2 /*return*/];
            });
        });
    };
    DB.prototype.InsertHeroe = function (name, nickname, power) {
        return __awaiter(this, void 0, void 0, function () {
            var script;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        script = "INSERT INTO tblHeroes(name, nickname, power) VALUES(?,?,?)";
                        return [4 /*yield*/, this.db.run(script, [name, nickname, power], function (err) {
                                if (err)
                                    console.log('error', err);
                                else
                                    console.log('datos insertados');
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return DB;
}());
exports.default = DB;
// let db: sqlite.Database = new sqlite3.Database('heroes', (err) => {     
//     if(err){
//         return console.log(err.message);
//     }
//     console.log('se conecto a la db');
// });
// function createDB(){
//     console.log("create chain");
//     db = new sqlite3.Database('chain.sqlite3', createTable);
//     db.configure("busyTimeout", 1000);
// }
// function createTable() {
//     console.log("createTable lorem");
//     db.run("CREATE TABLE IF NOT EXISTS lorem (info TEXT)", insertRows);
// }
// function insertRows() {
//     console.log("insertRows Ipsum i");
//     const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//     for (let i = 0; i < 10; i++) {
//         stmt.run("Ipsum " + i);
//     }
//     stmt.finalize(readAllRows);
// }
// function readAllRows() {
//     console.log("readAllRows lorem");
//     db.all("SELECT rowid AS id, info FROM lorem", (err, rows) => {
//         rows.forEach(row => {
//             console.log(`${row.id}: ${row.info}`);
//         });
//         readSomeRows();
//     });
// }
// function readSomeRows() {
//     console.log("readAllRows lorem");
//     db.each("SELECT rowid AS id, info FROM lorem WHERE rowid < ? ", 5, (err, row) => {
//         console.log(`${row.id}: ${row.info}`);
//     }, closeDb);
// }
// function closeDb() {
//     console.log("closeDb");
//     db.close();
// }
// createDB();
// function runChainExample() {
//     createDB();
// }
// function runMemoryChainExample() {
//     console.log(`createDb chain - in-memory database`);
//     db = new sqlite3.Database(
//         ':memory:',
//         sqlite3. OPEN_CREATE | sqlite3.OPEN_READWRITE | sqlite3.OPEN_SHAREDCACHE,
//         createTable);
//     db.configure("busyTimeout", 1000);
// }
// runMemoryChainExample();
// db.serialize(() => {
//   db.run("CREATE TABLE lorem (info TEXT)");
//   const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
//   for (let i = 0; i < 10; i++) {
//       stmt.run("Ipsum " + i);
//   }
//   stmt.finalize();
//   db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
//       console.log(`${row.id}: ${row.info}`);
//   });
// });
// db.serialize(() => {
//   // These two queries will run sequentially.
//   db.run("CREATE TABLE foo (num)");
//   db.run("INSERT INTO foo VALUES (?)", 1, err => {
//     // These queries will run in parallel and the second query will probably
//     // fail because the table might not exist yet.
//     db.run("CREATE TABLE bar (num)");
//     db.run("INSERT INTO bar VALUES (?)", 1);
//   });
// });
// // Directly in the function arguments.
// db.run("UPDATE tbl SET name = ? WHERE id = ?", "bar", 2);
// // As an array.
// db.run("UPDATE tbl SET name = ? WHERE id = ?", [ "bar", 2 ]);
// // As an object with named parameters.
// db.run("UPDATE tbl SET name = $name WHERE id = $id", {
//   $id: 2,
//   $name: "bar"
// });
// db.run("UPDATE tbl SET name = $name WHERE id = $id", { $id: 2, $name: "bar" },
//   err => { }
// );
// db.run("UPDATE tbl SET name = ?5 WHERE id = ?", {
//   1: 2,
//   5: "bar"
// });
// db.close();
