enum Buttons{
  MINUS = "MINUS",
  PLUS = "PLUS"
}

const minusBtn = document.getElementById(Buttons.MINUS);
const plusBtn = document.getElementById(Buttons.PLUS);
const apiURL = "http://localhost:3003/";

minusBtn?.addEventListener("click", increaseClickedValue);
plusBtn?.addEventListener("click", increaseClickedValue);


function increaseClickedValue(event: Event) {
  let el = (event.currentTarget as HTMLElement);
  let clickedButtonId =el?.id;
  let textElementId = "clicked"+clickedButtonId;
  fetch(apiURL + "action", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({"clickedButton": clickedButtonId}),
  })
  .then((response) => response.json())
  .then((res) => {
    if (res.buttons) {
      let value = res.buttons[clickedButtonId];
      (document.getElementById(textElementId) as Element).innerHTML = `button minus was clicked ${value} times`;
    } else {
      alert(
        "Error occured"
      );
    }
  });
}
