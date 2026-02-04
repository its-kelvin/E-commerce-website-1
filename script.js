/* ============================================
   STORE PRODUCT & GO TO PRODUCTS PAGE
===============================================*/
function openProduct(imgElement) {
    const card = imgElement.closest(".card") || imgElement.closest(".product-card");

    const productData = {
        image: imgElement.src,
        name: card.querySelector(".p-name").innerText.trim(),
        price: card.querySelector(".p-price").innerText.trim(),
    };

    localStorage.setItem("selectedProduct", JSON.stringify(productData));

    window.location.href = "products.html";
}

/* ============================================
   HIGHLIGHT & SCROLL TO SELECTED PRODUCT
===============================================*/
document.addEventListener("DOMContentLoaded", () => {
    if (!window.location.pathname.includes("products.html")) return;

    const saved = localStorage.getItem("selectedProduct");
    if (!saved) return;

    const product = JSON.parse(saved);

    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        const name = card.querySelector(".p-name").innerText.trim();

        if (name === product.name) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });

            card.style.outline = "4px solid #ff7f50";
            card.style.borderRadius = "12px";

            setTimeout(() => {
                card.style.outline = "none";
            }, 3000);
        }
    });
});

/* ============================================
   CHECKOUT — FORM VALIDATION
===============================================*/

function calculateTotal() {
    let price = parseFloat(document.getElementById("price")?.value);
    let qty = parseInt(document.getElementById("quantity")?.value);

    if (!isNaN(price) && !isNaN(qty)) {
        document.getElementById("totalAmount").value = price * qty;
    }
}

if (document.getElementById("price")) {
    document.getElementById("price").addEventListener("input", calculateTotal);
    document.getElementById("quantity").addEventListener("input", calculateTotal);
}

function submitForm() {
    let valid = true;

    // Get values
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();
    let county = document.getElementById("county").value.trim();
    let town = document.getElementById("town").value.trim();
    let street = document.getElementById("street").value.trim();
    let qty = document.getElementById("quantity").value;
    let price = document.getElementById("price").value;
    let payment = document.getElementById("payment").value;

    // Clear all errors
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    // Validation rules
    if (name === "") {
        valid = false;
        document.getElementById("nameError").textContent = "Enter your name";
    }

    if (!/^\d{10}$/.test(phone)) {
        valid = false;
        document.getElementById("phoneError").textContent = "Enter a valid 10-digit phone number";
    }

    if (!email.includes("@") || !email.includes(".")) {
        valid = false;
        document.getElementById("emailError").textContent = "Enter a valid email";
    }

    if (county === "") {
        valid = false;
        document.getElementById("countyError").textContent = "Enter your county";
    }

    if (town === "") {
        valid = false;
        document.getElementById("townError").textContent = "Enter your town";
    }

    if (street === "") {
        valid = false;
        document.getElementById("streetError").textContent = "Enter your street address";
    }

    if (qty < 1) {
        valid = false;
        document.getElementById("quantityError").textContent = "Quantity must be at least 1";
    }

    if (price <= 0) {
        valid = false;
        document.getElementById("priceError").textContent = "Enter a valid price";
    }

    if (payment === "") {
        valid = false;
        document.getElementById("paymentError").textContent = "Select payment method";
    }

    if (valid) {
        alert("Order confirmed successfully!");
        document.getElementById("checkoutForm").reset();
        document.getElementById("totalAmount").value = "";
    }
}

// script.js

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Make all product cards on the homepage clickable
    const productCards = document.querySelectorAll(".card");
    productCards.forEach(card => {
        card.style.cursor = "pointer"; // indicate it's clickable
        card.addEventListener("click", () => {
            window.location.href = "products.html"; // open product page
        });
    });

    // 2. Make all links under "Important" sidebar open contact page
    const importantLinks = document.querySelectorAll(".ads-sidebar a");
    importantLinks.forEach(link => {
        link.style.cursor = "pointer";
        link.addEventListener("click", (e) => {
            e.preventDefault(); // prevent default behavior if href exists
            window.location.href = "contact us.html"; // open contact page
        });
    });
});

