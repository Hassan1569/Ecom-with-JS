document.onreadystatechange = function () {
    if (document.readyState !== "complete") {
        document.querySelector(".preloader").classList.add("active");
    } else {
        document.querySelector(".preloader").classList.remove("active");
    }
};

if(document.querySelector(".filter")){
    for(let i=0; i<categories.length; i++){
        document.querySelector(".filter").innerHTML += `
            <button class="btn btn-outline-primary text-capitalize col-2" onclick="fetchProducts('${categories[i]}')">${categories[i]}</button>
        `
    }
}

function fetchProducts(filterName){
    document.querySelector(".productsSection .row").innerHTML = "";
    
    if(filterName === "all"){
        for(let i=0; i<products.length; i++){
            document.querySelector(".productsSection .row").innerHTML += `
                <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                    <div class="card shadow">
                        <img src="images/${products[i].pImage}" class="card-img-top cardImage" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${products[i].pName}</h5>
                            <p class="card-text text-secondary">Price: Rs ${products[i].pPrice}</p>
                            <a href="#" class="btn btn-primary">Buy</a>
                            <a href="products-detail.html?id=${i}" class="btn btn-outline-primary">Read More</a>
                        </div>
                    </div>
                </div>
            `
        }
    } else {
        for(let i=0; i<products.length; i++){
            if(products[i].pCategory === filterName){
                document.querySelector(".productsSection .row").innerHTML += `
                    <div class="col-lg-3 col-md-4 col-sm-6 mb-3">
                        <div class="card shadow">
                            <img src="images/${products[i].pImage}" class="card-img-top cardImage" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${products[i].pName}</h5>
                                <p class="card-text text-secondary">Price: Rs ${products[i].pPrice}</p>
                                <a href="#" class="btn btn-primary">Buy</a>
                                <a href="products-detail.html?id=${i}" class="btn btn-outline-primary">Read More</a>
                            </div>
                        </div>
                    </div>
                `
            }
        }
    }

}

if(document.querySelector(".productsSection .row")){
    fetchProducts("all");
}


const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    },
    didClose: (toast) =>{
        sessionStorage.removeItem("loginStatus");
        window.location.href = "login.html";
    }
});

const Toasting = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

if(document.querySelector("#loginBtn")){
    if(sessionStorage.getItem("loginStatus")){
        document.querySelector("#loginBtn").innerHTML = "Logout";
        document.querySelector("#loginBtn").classList.replace("btn-primary","btn-danger");
        document.querySelector("#loginBtn").removeAttribute("href");
        document.querySelector("#loginBtn").onclick = ()=>{
            Swal.fire({
                title: "Are you sure?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Logout!"
              }).then((result) => {
                if (result.isConfirmed) {
                    Toast.fire({
                        icon: "success",
                        title: "Logout successfully!"
                    });
                }
              });
        }
    }
}

function fetchAddToCart(){
    if(document.querySelector("#addToCartBtn")){
        if(sessionStorage.getItem("loginStatus")){
            document.querySelector("#addToCartBtn").removeAttribute("data-bs-custom-class");
            document.querySelector("#addToCartBtn").removeAttribute("data-bs-title");
            document.querySelector("#addToCartBtn").removeAttribute("data-bs-content");
            document.querySelector("#addToCartBtn").setAttribute("data-bs-toggle","offcanvas");
            document.querySelector("#addToCartBtn").setAttribute("data-bs-target","#offcanvasRight");
            document.querySelector("#addToCartBtn").setAttribute("aria-controls","offcanvasRight");
            if(localStorage.getItem("AddToCart")){
                let addToCartData = JSON.parse(localStorage.getItem("AddToCart"));
                document.querySelector("#offcanvasRight #addToCartContainer").innerHTML = "";
                if(addToCartData.length>0){
                    document.querySelector("#addToCartBtn .badge").classList.remove("d-none");
                    let counter = 1;
                    for(let i=0; i<addToCartData.length; i++){
                        if(addToCartData[i].uid == parseInt(sessionStorage.getItem("loginStatus"))){
                            document.querySelector("#addToCartBtn .badge").innerHTML = counter++;
                            document.querySelector("#offcanvasRight #addToCartContainer").innerHTML += `
                            <div class="card p-1 d-flex flex-row gap-3 border-0">
                                <img src="images/${products[addToCartData[i].pid].pImage}" alt="" class="rounded-3 shadow border border-2 border-white" style="width: 100px;">
                                <div class="d-flex flex-column gap-2">
                                    <div class="d-flex justify-content-between">
                                        <span class="display-4 fs-5 text-secondary">Price: Rs${products[addToCartData[i].pid].pPrice}</span>
                                        <span class="display-4 fs-5 text-secondary" id="totalPrice${i}">Total: Rs${(products[addToCartData[i].pid].pPrice*addToCartData[i].qty)}</span>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <div class="input-group">
                                            <button class="input-group-text btn btn-sm btn-primary text-white" onclick="decreaseQtyCart(${i})"><i class="bi bi-dash"></i></button>
                                            <input type="number" min="1" value="${addToCartData[i].qty}" id="qty${i}" class="form-control form-control-sm text-center" readonly>
                                            <button class="input-group-text btn btn-sm btn-primary text-white" onclick="increaseQtyCart(${i})"><i class="bi bi-plus"></i></button>
                                        </div>
                                        <button class="btn btn-sm btn-danger" onclick="deleteCartItem(${i})"><i class="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            </div>
                            `;
                        }
                    }
                } else {
                    document.querySelector("#addToCartBtn .badge").classList.add("d-none");
                    document.querySelector("#offcanvasRight #addToCartContainer").innerHTML += `
                        <div class="notfound d-flex flex-column gap-3 justify-content-center align-items-center">
                            <img src="images/notfound.svg" alt="" class="w-50">
                            <h1 class="display-4 text-center text-uppercase fs-2 text-secondary">Empty Cart</h1>
                        </div>
                    `;
                }
            }
        }
    }
}

function deleteCartItem(indexNo){
    if (sessionStorage.getItem("loginStatus")) {
        if (localStorage.getItem("Auth")) {
            if (localStorage.getItem("AddToCart")) {
                let addToCartData = JSON.parse(localStorage.getItem("AddToCart"));
                Swal.fire({
                    title: "Are you sure?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Delete!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        addToCartData.splice(indexNo, 1);
                        localStorage.setItem("AddToCart", JSON.stringify(addToCartData));
                        fetchAddToCart();
                        Toasting.fire({
                            icon: "success",
                            title: "Item Deleted Successfully!"
                        });
                    }
                });
            }
        }
    }
}   

function increaseQtyCart(indexNo){
    let qtyValue = parseInt(document.querySelector(`#qty${indexNo}`).value);
    if (sessionStorage.getItem("loginStatus")) {
        if (localStorage.getItem("Auth")) {
            if (localStorage.getItem("AddToCart")) {
                let addToCartData = JSON.parse(localStorage.getItem("AddToCart"));
                if(addToCartData[indexNo].qty < products[addToCartData[indexNo].pid].pQty){
                    document.querySelector(`#qty${indexNo}`).value = qtyValue+1;
                    addToCartData[indexNo].qty = parseInt(document.querySelector(`#qty${indexNo}`).value);
                    document.querySelector(`#totalPrice${indexNo}`).innerHTML = "Total: Rs"+(products[addToCartData[indexNo].pid].pPrice * addToCartData[indexNo].qty);
                    localStorage.setItem("AddToCart",JSON.stringify(addToCartData));
                } else {
                    Toasting.fire({
                        icon: "error",
                        title: "You can't add more quantities to your cart"
                    });
                }
            }
        }
    }
}

function decreaseQtyCart(indexNo){
    let qtyValue = parseInt(document.querySelector(`#qty${indexNo}`).value);
    if (sessionStorage.getItem("loginStatus")) {
        if (localStorage.getItem("Auth")) {
            if (localStorage.getItem("AddToCart")) {
                let addToCartData = JSON.parse(localStorage.getItem("AddToCart"));
                if(addToCartData[indexNo].qty > 1){
                    document.querySelector(`#qty${indexNo}`).value = qtyValue-1;
                    addToCartData[indexNo].qty = parseInt(document.querySelector(`#qty${indexNo}`).value);
                    document.querySelector(`#totalPrice${indexNo}`).innerHTML = "Total: Rs"+(products[addToCartData[indexNo].pid].pPrice * addToCartData[indexNo].qty);
                    localStorage.setItem("AddToCart",JSON.stringify(addToCartData));
                } else {
                    Toasting.fire({
                        icon: "error",
                        title: "At least one quantity must be required"
                    });
                }
            }
        }
    }
}


fetchAddToCart();



const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))