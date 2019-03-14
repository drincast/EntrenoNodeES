"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var sqlite_1 = __importDefault(require("../sqlite"));
var router = express_1.Router();
router.get('/heroes', function (req, res) {
    var query = 'SELECT * FROM tblHeroes';
    sqlite_1.default.ExecuteQuery(query, function (err, resp) {
        if (err) {
            console.log(err);
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        console.log(resp);
        res.json({
            ok: true,
            message: 'Todo ok ++',
            heroes: resp
        });
    });
});
router.get('/heroes/:id', function (req, res) {
    var id = req.params.id;
    res.json({
        ok: true,
        message: 'xx',
        id: id
    });
});
exports.default = router;
