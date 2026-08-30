if(document.querySelector("nav")){
    document.querySelector("nav").classList.add("navbar");
    document.querySelector("nav").classList.add("navbar-expand-lg");
    document.querySelector("nav").classList.add("bg-light");
    document.querySelector("nav").classList.add("sticky-top");
    document.querySelector("nav").classList.add("shadow");
    document.querySelector("nav").innerHTML = `
    <div class="container-fluid p-3 px-5">
            <a class="navbar-brand" href="index.html">Navbar</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0 text-center">
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Products</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">About Us</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Contact Us</a>
                    </li>
                    <li>
                        <a href="login.html" class="btn btn-primary px-3" id="loginBtn">Login</a>
                        
                        <a class="btn px-3 position-relative text-primary" id="addToCartBtn" data-bs-toggle="popover" data-bs-custom-class="custom-popover" data-bs-title="Login Required" data-bs-content="Already have an Account? Login"><i class="bi bi-basket3-fill"></i> <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill text-bg-warning d-none">0</span></a>
                    </li>
                </ul>
            </div>
        </div>
    `;
}

if(document.querySelector("footer")){
    document.querySelector("footer").classList.add("bg-dark");
    document.querySelector("footer").classList.add("py-5");
    document.querySelector("footer").classList.add("text-light");
    document.querySelector("footer").innerHTML = `
    <div class="container">
            <div class="row">
                <div class="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><a href="index.html" class="nav-link p-0 text-muted">Home</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>

                <div class="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>

                <div class="col-6 col-md-2 mb-3">
                    <h5>Section</h5>
                    <ul class="nav flex-column">
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Home</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Features</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">Pricing</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">FAQs</a></li>
                        <li class="nav-item mb-2"><a href="#" class="nav-link p-0 text-muted">About</a></li>
                    </ul>
                </div>

                <div class="col-md-5 offset-md-1 mb-3">
                    <form>
                        <h5>Subscribe to our newsletter</h5>
                        <p>Monthly digest of what's new and exciting from us.</p>
                        <div class="d-flex flex-column flex-sm-row w-100 gap-2">
                            <label for="newsletter1" class="visually-hidden">Email address</label>
                            <input id="newsletter1" type="text" class="form-control" placeholder="Email address">
                            <button class="btn btn-primary" type="button">Subscribe</button>
                        </div>
                    </form>
                </div>
            </div>

            <div class="d-flex flex-column flex-sm-row justify-content-between pt-4 mt-4 border-top">
                <p>© 2022 Company, Inc. All rights reserved.</p>
                <ul class="list-unstyled d-flex">
                    <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24">
                                <use xlink:href="#twitter"></use>
                            </svg></a></li>
                    <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24">
                                <use xlink:href="#instagram"></use>
                            </svg></a></li>
                    <li class="ms-3"><a class="link-dark" href="#"><svg class="bi" width="24" height="24">
                                <use xlink:href="#facebook"></use>
                            </svg></a></li>
                </ul>
            </div>
        </div>
    `;
}

if(document.querySelector("#offcanvasRight")){
    document.querySelector("#offcanvasRight").classList.add("offcanvas");
    document.querySelector("#offcanvasRight").classList.add("offcanvas-end");
    document.querySelector("#offcanvasRight").setAttribute("tabindex","-1");
    document.querySelector("#offcanvasRight").setAttribute("aria-labelledby","offcanvasRightLabel");
    document.querySelector("#offcanvasRight").innerHTML = `
    <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">Add To Cart</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div class="d-flex flex-column gap-4 pb-5" id="addToCartContainer">
                <div class="notfound d-flex flex-column gap-3 justify-content-center align-items-center">
                    <img src="images/notfound.svg" alt="" class="w-50">
                    <h1 class="display-4 text-center text-uppercase fs-2 text-secondary">Empty Cart</h1>
                </div>
            </div>
        </div>
    `;
}