import * as sqlite from 'sqlite3';
const sqlite3 = sqlite.verbose();

export default class DB {
    private static _instance: DB;

    db: sqlite.Database;
    dbName: string;

    constructor(){
        console.log('Clase DB inicializada');

        this.dbName = 'heroes';  //crear nombre de conexión en un archivo de configuración json
        this.LoadOfDB();
        //console.log(this.db);
    }

    public static get Instance(){
        if(this._instance === undefined || this._instance === null){
            this._instance = new this();
        }

        return this._instance;        
    }

    // PRIVATE METHODS
    private LoadOfDB(){
        try {
            this.db = new sqlite3.Database(this.dbName, (err) => {     
                if(err){
                    console.log("error en la base de datos: " + err);
                }            
                console.log('se conecto a la db');
                this.CreateTableHeroes();
            });
        } catch (error) {
            console.log(error);
        }
    }

    private CreateTableHeroes(){
        let script = `CREATE TABLE IF NOT EXISTS tblHeroes (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        name TEXT(100),
                        nickname TEXT(100),
                        power TEXT(500)
                     )`;
        this.db.run(script, (err: Error) => {
            if(err === null){
                console.log('se creo la tabla tblHeroes');
                this.InsertInitialData();
            }
            else{
                console.log('error al crear la tabla', err);
            }
        });        
    }

    private async InsertInitialData() {
        let script = `SELECT nickname FROM tblHeroes`;

        this.db.get(script, (err: Error, row?: any) => {
            if(err === null){
                if(undefined === row){
                    this.InsertHeroe('xxx', 'helada girl', 'hielo en las pestañas');
                    this.InsertHeroe('???', 'mr burguer', 'no puede si no con media hamburguesa');
                    this.InsertHeroe('---', 'chispas', 'no se puede peinar');
                }
            }
            else{
                console.log('error en la consulta, para verificar si hay datos', err);
            }
        });
        // const stmt = this.db.prepare("INSERT INTO tblHeroes(name, nickname, power) VALUES (?, ?, ?)");
        
        // for (let i = 0; i < 3; i++) {
        //     stmt.run(`'xxx', 'helada gril', 'hielo en las cejas'`);
        // }

        // //stmt.finalize(readAllRows);
        // stmt.finalize(() => {console.log('se insertaron datos')});
    }

    private static VerifyInitInstance(){
        if(!this._instance){
            throw 'debe inicializar la instancia de la basde de datos';
        }
    }

    public async InsertHeroe(name: string, nickname: string, power: string) {
        DB.VerifyInitInstance();

        let script = `INSERT INTO tblHeroes(name, nickname, power) VALUES(?,?,?)`;                    
        await this.db.run(script, [name, nickname, power], (err: Error) => {
            if (err)
                console.log('error', err);
            else
                console.log('datos insertados');

                this.db.close();
        });
    }

    public async GetHeroes(){
        let script = `SELECT * FROM tblHeroes`;
        await this.db.all(script, (err: Error, rows?: any) => {
            if(err === null){
                console.log('datos: ', rows);
            }
            else{
                console.log('error', err);
            }

            this.db.close();
        });
    }

    public static async ExecuteQuery(query: string, callback: Function){
        await this.OpenConnection();
        await this._instance.db.all(query, (err: Error, res?: any) => { 
            console.log('##', res);
            this._instance.db.close();
            return callback(err, res)
        });
    }

    public static OpenConnection(){
        try {
            this._instance.db = new sqlite3.Database(this._instance.dbName, (err) => {     
                if(err){
                    console.log("error en la base de datos: " + err);
                }            
                console.log('se conecto a la db');
            });
        } catch (error) {
            console.log(error);
        }
    }
}

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
