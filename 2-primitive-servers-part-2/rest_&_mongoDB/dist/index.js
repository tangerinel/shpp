"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const express_2 = require("express");
const PORT = 3005;
const DB_URL = 'mongodb+srv://user:user@cluster0.3l83cw6.mongodb.net/?retryWrites=true&w=majority';
const app = (0, express_1.default)();
const router = (0, express_2.Router)();
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
app.use(express_1.default.static(path_1.default.join(__dirname, '../static')));
app.get('/api/v1/items', (req, res) => {
    console.log(req.query.items);
    console.log("sended");
    res.send();
});
