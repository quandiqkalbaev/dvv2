function fetchData(url) {
  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => console.error("Ошибка:", error));
}
let datas = fetchData("../sample.json");

let list = document.querySelector(".main__list");
datas.then((data) => {
  //Показать на главном экране
  let itemsHTML = "";
  data.forEach((itemData, i) => {
    itemsHTML += `
            <div class="main__item" data-id="${i}">
                <div class="main__item-img">
                    <img src="${itemData.img.url}" alt="" />
                </div>
            </div>
        `;
  });

  list.innerHTML = itemsHTML;

  // открыть попап
  let items = document.querySelectorAll(".main__item");
  let itemImg = document.querySelector(".popup__img img");
  let itemTitle = document.querySelector(".popup__title");
  let itemAuthor = document.querySelector(".popup__author");
  let itemText = document.querySelector(".popup__text");
  let itemUrl = document.querySelector(".popup__url-link");
  let popup = document.querySelector(".popup");
  let popupExit = document.querySelector(".popup__exit");
  items.forEach((el, i) => {
    el.addEventListener("click", () => {
      popup.classList.add("active");
      document.body.classList.add("no-scroll");

      let dataId = el.getAttribute("data-id");
      itemImg.setAttribute("src", data[dataId].img.url);
      itemTitle.innerHTML = data[dataId].title;
      itemAuthor.innerHTML = data[dataId].author;
      itemText.innerHTML = data[dataId].text;
      itemUrl.innerHTML = data[dataId].source;
    });
  });
  popupExit.addEventListener("click", () => {
    popup.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
  popup.addEventListener("click", (e) => {
    if (e.target.closest(".popup__wrapper")) {
      return;
    }
    popup.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });
  //Общее количество
  let total = document.querySelector(".total__number");
  total.innerHTML = data.length;

  let searchInput = document.querySelector(".search__input");

  searchInput.addEventListener("input", () => {
    let searchQuery = searchInput.value.toLowerCase();
    items.forEach((item) => {
      let itemId = item.getAttribute("data-id");
      let itemData = data[itemId];
      if (itemData.title.toLowerCase().includes(searchQuery)) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

var nonLinearSlider = document.getElementById('nonlinear');

noUiSlider.create(nonLinearSlider, {
	connect: true,
	behaviour: 'tap',
	start: [ 2012, 2024 ],
	range: {
		min: 2012,
		max: 2024
	}
});
var nodes = [
	document.getElementById('lower-value'), // 0
	document.getElementById('upper-value')  // 1
];
