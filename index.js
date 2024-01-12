import menuArray from "/data.js";
let form = document.querySelector("form");
let nameInput = document.getElementById("name");
let greeting = document.getElementById("success-msg");
let orderSection = document.getElementById("orders");

//  render the entire menu
const menuHtml = menuArray
  .map(function (item) {
    return `
    <div class='menu-list'>
        <div class="food-icon">
            <div>${item.emoji}</div>
        </div>
        <div class="food-text">
            <p class="food--name">${item.name}</p>
            <p class="food--desc">${item.ingredients}</p>
            <p class="food--price">$${item.price}</p>
        </div>
        <div class="addBtn"  data-add=${item.id}>
            <div class="plus-icon" data-add=${item.id}>+</div>
        </div>
    </div>
    `;
  })
  .join("");

document.getElementById("menu").innerHTML = menuHtml;

// add eventlistener
let orderList = [];
document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    let currentOrder = menuArray.filter(
      (item) => item.id === Number(e.target.dataset.add)
    );
    orderList.push(currentOrder[0]);
    addToCart(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeCart(Number(e.target.dataset.remove));
  } else if (e.target.dataset.complete) {
    toggleForm();
  }
});

// function for add and remove
function addToCart(add) {
  let orderHtml = orderList
    .map((item, index) => {
      return `
          <div class='selected'>
            <div class='selectedFoodName'>${item.name}</div>
            <div class='removeBtn' data-remove=${index}>remove</div>
            <div class='selectedFoodPrice'>$${item.price}</div>
          </div>
          `;
    })
    .join("");

  let totalPrice = orderList.reduce(
    (total, current) => total + current.price,
    0
  );

  let totalPriceHtml = `
        <div>Total price</div>
        <div class='total'>$${totalPrice}</div>
        `;
  document.getElementById("ordered-items").innerHTML = orderHtml;
  document.getElementById("total-price").innerHTML = totalPriceHtml;

  orderList.length > 0
    ? (orderSection.style.display = "block")
    : (orderSection.style.display = "none");
}

function removeCart(index) {
  orderList.splice(index, 1);

  addToCart();
}

//show and hide the modal

function toggleForm() {
  form.classList.toggle("show");
}

// add eventlistener to form submit

form.addEventListener("submit", function (e) {
  e.preventDefault();
  greeting.style.display = "block";
  let customerName = nameInput.value;
  greeting.textContent = `Thanks ${customerName}! Your order is on its way!`;

  orderSection.style.display = "none";
  toggleForm();
});
