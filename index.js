getCategories();
getProducts();

async function getCategories() {

    const categoryProvider = new Providers();
    const { data } = await categoryProvider.getCategories()
    const wrapper_category = document.getElementById("select-category");

    wrapper_category.innerHTML = '<option selected>Todos</option>';
    data.map((x) => {
        wrapper_category.innerHTML += `
            <option value="${x.id}">${capitalize(x.name)}</option>
        `
    })
}

async function getProducts() {

    const wrapper_products = document.getElementById("product-wrapper");
    const wrapper_pages = document.getElementById("pages-wrapper");
    const search = document.getElementById("search").value;
    const category = document.getElementById("select-category").value;
    const discount = document.getElementById("select-discount").value === 'true';
    const order = document.getElementById("select-order-price").value;
    const pageSelected = sessionStorage.getItem("Pagina");
    const take = document.getElementById("select-take").value;

    const req = {
        filter:{
            category: category != 'Todos' ? parseInt(category) : null,
            discount:discount,
            search:search != null ? search : null
        },
        pagination:{
            page: pageSelected == null ? 1 : pageSelected,
            take: parseInt(take) 
        },
        order:{
            price: order
        }
    }

    const productProvider = new Providers();
    const { data, count } = await productProvider.getProducts(req)
    
    const numberPages = count / parseInt(take) + 1;
    wrapper_pages.innerHTML = '';
    for (let i = 1; i < numberPages; i++) { 
        wrapper_pages.innerHTML += `<buttom onclick="selectPage(${i})" class="btn btn-sm ${i == pageSelected ? 'btn-info' : 'btn-outline-info'}  mx-1">${i}</buttom>`
    }

    wrapper_products.innerHTML = '';
    data.map((x) => {
        wrapper_products.innerHTML += `
        <div class="card">
            <img class="card-img-top" src="${x.url_image}" alt="${x.name}">
            <div class="card-body px-1>
                <p value="${x.name}" class="text-center">${x.name}</p>
            </div>
            <div class="card-footer bg-white">
                <div class="form-inline">
                    <small style="flex:1">Precio Unidad:</small><small><p style="flex:1" class="card-text h6">${formatMoney(x.price)}</p></small>
                </div>
                <div class="form-inline">
                    <small style="flex:1">Descuento:</small><small><p style="flex:1" class="card-text text-danger">${x.discount != 0 ? '$'+x.discount+'.-' : '-'}</p></small>
                </div>
                <div class="form-inline mt-2">
                    <input id="quantity-${x.id}" style="flex:2" value="1" class="form-control form-control-sm" type="number" step="1" min="1" max="100"/>
                    <buttom onclick="addProductToCart('${x.id}','${x.name}','${x.price}','${x.url_image}')" style="flex:1" class="btn btn-sm btn-info ml-1 add-cart">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart-plus-fill" viewBox="0 0 16 16">
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z"/>
                        </svg>
                    </buttom>
                </div>
            </div>
        </div>
        `

    }) 

}

function addProductToCart(id, name, price, image) {

    const wrapper_cart = document.getElementById("cart-wrapper");
    const quantity = document.getElementById("quantity-" + id).value;
    const hashId = (new Date()).valueOf().toString();
    
    wrapper_cart.innerHTML += `
        <div id="${hashId}" class="form-inline px-5">
            <p style="flex:1">${quantity}</p>
            <img style="flex:1" class="card-img-top" src="${image}" alt="${name}">
            <small style="flex:6">${name}</small>
            <small style="flex:2">${formatMoney(price)}</small>
            <small style="flex:2">${formatMoney(parseInt(price) * quantity)}</small>
            <buttom class="btn btn-sm btn-danger" onclick="removeProductCart(${hashId})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
            </buttom>
        </div>
    `

    productsCart();
}

function removeProductCart(hashId) {
    const item = document.getElementById(hashId)
    item.parentNode.removeChild(item);
    productsCart();
}

function productsCart() {
    const buying = document.getElementById("buying");
    const numberProducts = document.getElementById("cart-wrapper").childElementCount;
    if (numberProducts > 1) {
        buying.style.backgroundColor = '#FF0000'
    } else {
        buying.style.backgroundColor = 'transparent';
    }
}

function updateProducts() {
    sessionStorage.setItem("Pagina", 1);
    getProducts();
}

function selectPage(page) {
    sessionStorage.setItem("Pagina", page);
    getProducts()
}

function capitalize(string) {
    const minusc = string.toLowerCase();
    return string.charAt(0).toUpperCase() + minusc.slice(1)
}

function formatMoney(number) {
    let x =  "$ " + (Math.round(number * 100) / 100).toLocaleString() + '.-';
    return x.replace(',','.')
}