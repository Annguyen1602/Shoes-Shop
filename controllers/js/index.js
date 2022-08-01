function getProduct() {
  let promise = axios({
    url: "https://shop.cyberlearn.vn/api/Product",
    method: "GET",
  });
  promise.then(function (result) {
    renderProduct(result.data.content);
    
  });
}

function renderProduct(arrProduct) {
  let html = "";
  for (let index in arrProduct) {
    let newProduct = arrProduct[index];
    html += `
        <div class="item col-12 col-md-6 col-xl-4 ">
                <div class="cover">
                    <div class="pro-image">
                        <img src="${newProduct.image}" class="w-100" alt="photo.png" >
                    </div>
                    <d class="pro-txt">
                        <h2>${newProduct.name}</h2>
                        <span >${newProduct.description}</span>
                    </d v>
                    <div class="buy-click d-flex">
                        <a href="./detail.html?productid=${newProduct.id}">Buy now</a>
                        <p>${newProduct.price}$</p>
                    </div>
                </div>
        </div>
        `;
  }
  document.getElementById("bodyProduct").innerHTML = html;
}

window.onload = function () {
  getProduct();
};
