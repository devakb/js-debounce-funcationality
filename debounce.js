const debounceElemValues = {};

const debounce = (elem, eventType, delay, valueCheck = true) => {
  let attrValue = elem.getAttribute("debounce-keyup-callback");

  if (elem.getAttribute("debounce-id") === null) {
    elem.setAttribute("debounce-id", Math.random().toString(36).substr(2, 9));
  }

  elem.addEventListener(eventType, (event) => {
    let db_id = elem.getAttribute("debounce-id");

    if (!debounceElemValues[db_id]) {
      debounceElemValues[db_id] = {};
    }

    if (
      valueCheck &&
      debounceElemValues[db_id]["value"] == event.target.value
    ) {
      return;
    }

    debounceElemValues[db_id]["value"] = event.target.value;

    if (debounceElemValues[db_id]["timer"])
      clearInterval(debounceElemValues[db_id]["timer"]);

    debounceElemValues[db_id]["timer"] = setTimeout(() => {
      window[attrValue](elem, event);
    }, delay);
  });
};

document.querySelectorAll("[debounce-keyup-callback]").forEach((elem) => {
  debounce(elem, "keyup", 500);
});

document.querySelectorAll("[debounce-click-callback]").forEach((elem) => {
  debounce(elem, "click", 10, false);
});
