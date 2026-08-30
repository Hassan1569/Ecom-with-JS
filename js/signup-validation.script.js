const Toasts = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
    }
});

if(sessionStorage.getItem("loginStatus")){
    window.location.href = "index.html";
}

function errorMSG(elementId,message,status){
    if(status === false){
        document.querySelector("#"+elementId).classList.add("active");
        document.querySelector("#"+elementId).innerHTML = message;
    } else if(status === true){
        document.querySelector("#"+elementId).classList.remove("active");
        document.querySelector("#"+elementId).innerHTML = "";
    }
}

function nameValidation(){
    let input = document.querySelector("#name").value;
    if(input.trim() == ""){
        errorMSG("nameErr","Name is Required!!!",false);
        return false;
    } else if(input.length < 3){
        errorMSG("nameErr","Enter Name at least 3 Characters!!!",false);
        return false;
    } else {
        errorMSG("nameErr","",true);
        return true;
    }
}

function emailValidation(){
    let input = document.querySelector("#email").value;
    let emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(input.trim() == ""){
        errorMSG("emailErr","Email Address is Required!!!",false);
        return false;
    } else if(!input.match(emailRegex)){
        errorMSG("emailErr","Enter Valid Email Address!!!",false);
        return false;
    } else {
        errorMSG("emailErr","",true);
        return true;
    }
}

function pwdValidation(){
    let input = document.querySelector("#pwd").value;
    if(input.trim() == ""){
        errorMSG("pwdErr","Create Password is Required!!!",false);
        return false;
    } else if(input.length < 8){
        errorMSG("pwdErr","Enter Create Password at least 8 Characters!!!",false);
        return false;
    } else {
        errorMSG("pwdErr","",true);
        return true;
    }
}

function cpwdValidation(){
    let input = document.querySelector("#cpwd").value;
    let pwd = document.querySelector("#pwd").value;
    if(input.trim() == ""){
        errorMSG("cpwdErr","Confirm Password is Required!!!",false);
        return false;
    } else if(input.length < 8){
        errorMSG("cpwdErr","Enter Confirm Password at least 8 Characters!!!",false);
        return false;
    } else if(input !== pwd){
        errorMSG("cpwdErr","Confirm Password is not matched!!!",false);
        return false;
    } else {
        errorMSG("cpwdErr","",true);
        return true;
    }
}

function validation() {
    let nameErr = false, emailErr = false, pwdErr = false, cpwdErr = false;
    nameErr = nameValidation();
    emailErr = emailValidation();
    pwdErr = pwdValidation();
    cpwdErr = cpwdValidation();

    if(nameErr == true && emailErr == true && pwdErr == true && cpwdErr == true){
        
        if (localStorage.getItem("Auth")) {
            let getAuth = JSON.parse(localStorage.getItem("Auth"));
            let emailExists = false;
        
            for (let i = 0; i < getAuth.length; i++) {
                if (getAuth[i].email === document.querySelector("#email").value.trim()) {
                    // Email already exists
                    Toasts.fire({
                        icon: "error",
                        title: "Your account already exists!"
                    });
                    emailExists = true;
                    break;
                }
            }
        
            if (!emailExists) {
                // Email doesn't exist, add user data
                getAuth.push({
                    name: document.querySelector("#name").value.trim(),
                    email: document.querySelector("#email").value.trim(),
                    pwd: document.querySelector("#pwd").value.trim(),
                    status: 1
                });
                localStorage.setItem("Auth", JSON.stringify(getAuth));
                const ToastFinal = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                    didClose: (toast)=>{
                        window.location.href = "login.html";
                    }
                });
                ToastFinal.fire({
                    icon: "success",
                    title: "Signup successful!"
                });
                clearFields();
            }
        } else {
            // No existing data, create new entry
            let data = [
                {
                    name: document.querySelector("#name").value.trim(),
                    email: document.querySelector("#email").value.trim(),
                    pwd: document.querySelector("#pwd").value.trim(),
                    status: 1
                }
            ];
            localStorage.setItem("Auth", JSON.stringify(data));
            Toasts.fire({
                icon: "success",
                title: "Signup successful!"
            });
            clearFields();
        }
        
    } else {
        Toasts.fire({
            icon: "error",
            title: "All fields are required!!!"
        });
    }
}

function clearFields(){
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#pwd").value = "";
    document.querySelector("#cpwd").value = "";
} 