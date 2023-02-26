"use strict";
exports.__esModule = true;
var express_1 = require("express");
var path_1 = require("path");
var app = (0, express_1["default"])();
var PORT = 3003;
var Buttons;
(function (Buttons) {
    Buttons["MINUS"] = "MINUS";
    Buttons["PLUS"] = "PLUS";
})(Buttons || (Buttons = {}));
var minusClicked = 0;
var plusClicked = 0;
var ButtonsClicked;
(function (ButtonsClicked) {
    ButtonsClicked[ButtonsClicked["MINUS"] = minusClicked] = "MINUS";
    ButtonsClicked[ButtonsClicked["PLUS"] = plusClicked] = "PLUS";
})(ButtonsClicked || (ButtonsClicked = {}));
app.use(express_1["default"].static((0, path_1.join)(__dirname, "../static/")));
app.post('/action', function (req, res) {
    var clickedBtn = req.body.clickedButton;
    if (!clickedBtn)
        return res.status(500).json({ error: "error" });
    clickedBtn === Buttons.MINUS ? minusClicked++ : plusClicked++;
    res.json(ButtonsClicked);
});
app.listen(PORT, function () { return console.log("Server started on port ".concat(PORT)); });
