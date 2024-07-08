document.querySelector("#saveData").addEventListener("submit", (e) => {
  e.preventDefault();

  const productCategory = document.querySelector("#category").value;
  const productName = document.querySelector("#productName").value;
  const productPrice = document.querySelector("#productPrice").value;
  const productQuantity = document.querySelector("#quantity").value;
  const productDescription = document.querySelector("#description").value;
  const imageUrl = document.querySelector("#imageUrl").value;

  const prprice = productPrice * productQuantity;

  if (productCategory === "-- select category --") {
    document.querySelector("#Category_error").innerHTML =
      "Please select product category";
  } else {
    document.querySelector("#Category_error").innerHTML = "";
  }
  if (productName === "") {
    document.querySelector("#prName_error").innerHTML =
      "Please enter product name";
  } else {
    document.querySelector("#prName_error").innerHTML = "";
  }
  if (productPrice === "") {
    document.querySelector("#prPrice_error").innerHTML =
      "Please enter product price";
  } else {
    document.querySelector("#prPrice_error").innerHTML = "";
  }
  if (productQuantity === "") {
    document.querySelector("#prQulity_error").innerHTML =
      "Please enter product quantity";
  } else {
    document.querySelector("#prQulity_error").innerHTML = "";
  }
  if (productDescription === "") {
    document.querySelector("#prdes_error").innerHTML =
      "Please enter product description";
  } else {
    document.querySelector("#prdes_error").innerHTML = "";
  }
  if (imageUrl === "") {
    document.querySelector("#image_error").innerHTML =
      "Please enter image URL";
  } else {
    document.querySelector("#image_error").innerHTML = "";
  }

  if (
    document.querySelector("#Category_error").innerHTML === "" &&
    document.querySelector("#prName_error").innerHTML === "" &&
    document.querySelector("#prPrice_error").innerHTML === "" &&
    document.querySelector("#prQulity_error").innerHTML === "" &&
    document.querySelector("#prdes_error").innerHTML === "" &&
    document.querySelector("#image_error").innerHTML === ""
  ) {
    const arr = JSON.parse(localStorage.getItem("userList")) || [];
    const id = arr.length + 1;
    const product = {
      id,
      productCategory,
      productName,
      productPrice,
      productQuantity,
      productDescription,
      imageUrl,
      prprice,
    };

    arr.push(product);
    localStorage.setItem("userList", JSON.stringify(arr));
    show();
    window.location.reload();
  }
});

function show() {
  const userList = JSON.parse(localStorage.getItem("userList")) || [];
  let result = "";
  userList.forEach((element, index) => {
    result += `
      <div class="col-4 mb-4">
        <div class="card">
          <img src="${element.imageUrl}" class="card-img-top p-2" alt="Product Image">
          <button class="cancelbtn" onclick="cancelCart(${index})"><i class="fa-solid fa-xmark"></i></button>
          <div class="card-body">
            <h5 class="card-title">${element.productName}</h5>
            <p class="card-text prdDes">${element.productDescription}</p>
            <p class="card-text"><b>Price:</b> ${element.productPrice}</p>
            <p class="card-text"><b>Quantity:</b> ${element.productQuantity}</p>
            <p class="card-text"><b>Total Price:</b> ${element.prprice}</p>
          </div>
          <button class="btn btn-warning" onclick="AddToCart(${element.id})">ADD TO CART</button>
        </div>
      </div>`;
  });
  document.querySelector("#valueStore").innerHTML = result;
}
show();

function AddToCart(id) {
  const product = JSON.parse(localStorage.getItem("userList"));
  const cart = JSON.parse(localStorage.getItem("cartList")) || [];

  const existProduct = product.find((item) => item.id === id);
  const existCart = cart.find((item) => item.id === id);

  if (existCart) {
    existCart.count += 1;
  } else {
    cart.push({ ...existProduct, count: 1 });
  }
  localStorage.setItem("cartList", JSON.stringify(cart));
  window.location.href = "cardStore.html";
}

function cancelCart(userid) {
  if (confirm("Do you want to delete this item?")) {
    const user = JSON.parse(localStorage.getItem("userList"));
    user.splice(userid, 1);
    localStorage.setItem("userList", JSON.stringify(user));
    show();
  }
}
