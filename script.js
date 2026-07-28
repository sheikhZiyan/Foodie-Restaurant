// ==========================
// FOODIE RESTAURANT SCRIPT
// PART 3A
// ==========================

let count = 0;
let total = 0;

// Cart Elements
const cartCount = document.getElementById("cart-count");
const totalPrice = document.getElementById("total-price");
const cartItems = document.getElementById("cart-items");

const clearCart = document.getElementById("clear-cart");
const checkout = document.getElementById("checkout");

// Food Buttons
const buttons = document.querySelectorAll(".order-btn");

// Add To Cart

buttons.forEach(button => {

    button.addEventListener("click", function () {

        count++;

        const price = Number(button.dataset.price);

        total += price;

        cartCount.textContent = count;

        totalPrice.textContent = total;

        const card = button.closest(".food-card");

        const itemName = card.dataset.name;

        const li = document.createElement("li");

        li.textContent = itemName + " - ₹" + price + " ";

        // Remove Button

        const removeBtn = document.createElement("button");

        removeBtn.textContent = "❌";

        li.appendChild(removeBtn);

        cartItems.appendChild(li);

        // Remove Item

        removeBtn.addEventListener("click", function () {

            li.remove();

            count--;

            total -= price;

            if (count < 0) count = 0;
            if (total < 0) total = 0;

            cartCount.textContent = count;
            totalPrice.textContent = total;

        });

    });

});

// Clear Cart

clearCart.addEventListener("click", function () {

    count = 0;
    total = 0;

    cartCount.textContent = 0;
    totalPrice.textContent = 0;

    cartItems.innerHTML = "";

});

// Loader

window.addEventListener("load", function () {

    setTimeout(function () {

        document.getElementById("loader").style.display = "none";

    }, 1500);

});
// ==========================
// PART 3B
// Search + Filter + Login +
// Toast + Checkout Popup
// ==========================

// Search

const search = document.getElementById("search");
const foodCards = document.querySelectorAll(".food-card");

search.addEventListener("keyup", function () {

    const value = search.value.toLowerCase();

    foodCards.forEach(card => {

        const name = card.dataset.name.toLowerCase();

        if (name.includes(value)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// Category Filter

const category = document.getElementById("category");

category.addEventListener("change", function () {

    const value = category.value;

    foodCards.forEach(card => {

        if (
            value === "all" ||
            card.dataset.category === value
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

});


// Login Popup

const loginBtn = document.getElementById("login-btn");
const loginBox = document.getElementById("login-box");

loginBtn.addEventListener("click", function () {

    if (loginBox.style.display === "block") {

        loginBox.style.display = "none";

    } else {

        loginBox.style.display = "block";

    }

});


// Toast Notification

const toast = document.getElementById("toast");

buttons.forEach(button => {

    button.addEventListener("click", function () {

        toast.classList.add("show");

        setTimeout(function () {

            toast.classList.remove("show");

        }, 2000);

    });

});


// Checkout Popup

const popup = document.getElementById("checkout-popup");
const popupItems = document.getElementById("popup-items");
const popupPrice = document.getElementById("popup-price");
const closePopup = document.getElementById("close-popup");

checkout.addEventListener("click", function () {

    if (count === 0) {

        alert("Your cart is empty!");
        return;

    }

    popup.style.display = "block";

    popupItems.textContent = count;
    popupPrice.textContent = total;

});

closePopup.addEventListener("click", function () {

    popup.style.display = "none";

});
// ==========================
// PART 3C
// Quantity + Confirm Order +
// Local Storage + Dark Mode
// ==========================

// Quantity Buttons

const plusBtns = document.querySelectorAll(".plus");
const minusBtns = document.querySelectorAll(".minus");

plusBtns.forEach(btn => {

    btn.addEventListener("click", function () {

        const qty = this.previousElementSibling;

        qty.textContent = Number(qty.textContent) + 1;

    });

});

minusBtns.forEach(btn => {

    btn.addEventListener("click", function () {

        const qty = this.nextElementSibling;

        if (Number(qty.textContent) > 1) {

            qty.textContent = Number(qty.textContent) - 1;

        }

    });

});


// Confirm Order

const confirmOrder = document.getElementById("confirm-order");

confirmOrder.addEventListener("click", function () {

    alert("🎉 Order Placed Successfully!");

    popup.style.display = "none";

    count = 0;
    total = 0;

    cartCount.textContent = count;
    totalPrice.textContent = total;

    cartItems.innerHTML = "";

    localStorage.removeItem("cartCount");
    localStorage.removeItem("cartTotal");

});


// Local Storage Save

function saveCart(){

    localStorage.setItem("cartCount", count);

    localStorage.setItem("cartTotal", total);

}


// Update Save

buttons.forEach(button=>{

    button.addEventListener("click", saveCart);

});

clearCart.addEventListener("click", saveCart);


// Load Saved Cart

window.addEventListener("load",function(){

    const savedCount=localStorage.getItem("cartCount");

    const savedTotal=localStorage.getItem("cartTotal");

    if(savedCount){

        count=Number(savedCount);

        cartCount.textContent=count;

    }

    if(savedTotal){

        total=Number(savedTotal);

        totalPrice.textContent=total;

    }

});


// Dark Mode

const darkBtn=document.getElementById("dark-mode");

if(darkBtn){

darkBtn.addEventListener("click",function(){

document.body.classList.toggle("dark");

});

}

console.log("✅ Foodie Restaurant Loaded Successfully");
// Favourite Button

const favBtns = document.querySelectorAll(".fav-btn");

favBtns.forEach(btn=>{

btn.addEventListener("click",function(){

this.classList.toggle("active");

if(this.classList.contains("active")){

this.innerHTML="❤️ Favourite";

}else{

this.innerHTML="🤍 Favourite";

}

});

});
// Dark Mode

const darkModeBtn = document.getElementById("dark-mode");

darkModeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        darkModeBtn.innerHTML="☀️ Light Mode";

    }else{

        darkModeBtn.innerHTML="🌙 Dark Mode";

    }

});

// Back To Top

const topBtn=document.getElementById("top-btn");

window.addEventListener("scroll",function(){

    if(window.scrollY>20){

        topBtn.style.display="block";

    }else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",function(){

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});
// Image Slider

const images=[
"images/pizza.jpg",
"images/burger.jpg",
"images/drink.jpg"
];

let index=0;

const slider=document.getElementById("slider-img");

setInterval(function(){

index++;

if(index>=images.length){

index=0;

}

slider.src=images[index];

},3000);


// Scroll Animation

const sections=document.querySelectorAll("section");

window.addEventListener("scroll",function(){

sections.forEach(sec=>{

const top=sec.getBoundingClientRect().top;

if(top<window.innerHeight-100){

sec.classList.add("show");

}else{

sec.classList.remove("show");

}

});

});
const signupBox=document.getElementById("signup-box");
const signupBtn=document.getElementById("signup-btn");
const openLogin=document.getElementById("open-login");

signupBtn.addEventListener("click",function(){

alert("Account Created Successfully!");

signupBox.style.display="none";

loginBox.style.display="block";

});

openLogin.addEventListener("click",function(){

signupBox.style.display="none";

loginBox.style.display="block";

});
const paymentBox = document.getElementById("payment-box");
const billBox = document.getElementById("bill-box");

const payNow = document.getElementById("pay-now");

const billItems = document.getElementById("bill-items");
const billTotal = document.getElementById("bill-total");

// Confirm Order

confirmOrder.addEventListener("click", function(){

    popup.style.display = "none";

    paymentBox.style.display = "block";

});

// Payment Complete

payNow.addEventListener("click", function(){

    paymentBox.style.display = "none";

    billBox.style.display = "block";

    billItems.textContent = count;

    billTotal.textContent = total;

    alert("🎉 Payment Successful!");

});
const historyList = document.getElementById("history-list");

const successBox = document.getElementById("success-box");

const closeSuccess = document.getElementById("close-success");

// Payment Complete

payNow.addEventListener("click", function () {

    paymentBox.style.display = "none";

    billBox.style.display = "block";

    billItems.textContent = count;

    billTotal.textContent = total;

    // Save Order History

    const li = document.createElement("li");

    li.textContent = count + " Items - ₹" + total;

    historyList.appendChild(li);

});

// Continue Shopping

closeSuccess.addEventListener("click", function(){

    successBox.style.display = "none";
const historyList = document.getElementById("history-list");

const successBox = document.getElementById("success-box");

const closeSuccess = document.getElementById("close-success");

// Payment Complete

payNow.addEventListener("click", function () {

    paymentBox.style.display = "none";

    billBox.style.display = "block";

    billItems.textContent = count;

    billTotal.textContent = total;

    // Save Order History

    const li = document.createElement("li");

    li.textContent = count + " Items - ₹" + total;

    historyList.appendChild(li);

});

// Continue Shopping

closeSuccess.addEventListener("click", function(){

    successBox.style.display = "none";

});

// Print Bill

billBox.addEventListener("click",function(){

    window.print();

});
});

// Print Bill

billBox.addEventListener("click",function(){

    window.print();
});

