let countries = [];
let countryListElement = document.querySelector("#country-list");
let countryInputElement = document.querySelector("#country-input");

function fetchCountries() {
  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      countries = data.map((x) => x.name.common).sort();
      loadData(countries, countryListElement);
    });
}

function loadData(data, element) {
  element.innerHTML = "";
  if (!data || data.length <= 0) return;

  let innerElement = data.reduce((html, item) => html + `<li>${item}</li>`, "");

  document.querySelector("#country-list").innerHTML = innerElement;
}

function filterData(data, searchText) {
  return data.filter((x) => x.toLowerCase().includes(searchText.toLowerCase()));
}

const debounce = (func, delay) => {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
};

countryInputElement.addEventListener(
  "input",
  debounce(function () {
    const currentValue = countryInputElement.value;
    const filteredData = filterData(countries, currentValue);
    const data = currentValue ? filteredData : [];
    loadData(data, countryListElement);
  }, 1000)
);

window.onload = fetchCountries();
