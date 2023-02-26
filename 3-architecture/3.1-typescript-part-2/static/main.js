var Buttons;
(function (Buttons) {
    Buttons["MINUS"] = "MINUS";
    Buttons["PLUS"] = "PLUS";
})(Buttons || (Buttons = {}));
var minusBtn = document.getElementById(Buttons.MINUS);
var plusBtn = document.getElementById(Buttons.PLUS);
var apiURL = "http://localhost:3003/";
minusBtn === null || minusBtn === void 0 ? void 0 : minusBtn.addEventListener("click", increaseClickedValue);
plusBtn === null || plusBtn === void 0 ? void 0 : plusBtn.addEventListener("click", increaseClickedValue);
function increaseClickedValue(event) {
    var el = event.currentTarget;
    var clickedButtonId = el === null || el === void 0 ? void 0 : el.id;
    var textElementId = "clicked" + clickedButtonId;
    fetch(apiURL + "action", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "clickedButton": clickedButtonId })
    })
        .then(function (response) { return response.json(); })
        .then(function (res) {
        if (res.buttons) {
            var value = res.buttons[clickedButtonId];
            document.getElementById(textElementId).innerHTML = "button minus was clicked ".concat(value, " times");
        }
        else {
            alert("Error occured");
        }
    });
}
