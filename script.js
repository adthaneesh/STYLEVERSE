// ==========================================
// STYLEVERSE
// Product Category Navigation System
// ==========================================


// PRODUCT DATA

// JavaScript array used for the website catalogue.
// The separate C program will demonstrate a linked list.

const products = [
    {
        id: 101,
        name: "Classic T-Shirt",
        category: "Men",
        price: 499,
        icon: "👕",
        color: "green"
    },

    {
        id: 102,
        name: "Slim Fit Shirt",
        category: "Men",
        price: 799,
        icon: "👔",
        color: "blue"
    },

    {
        id: 103,
        name: "Denim Jeans",
        category: "Men",
        price: 999,
        icon: "👖",
        color: "purple"
    },

    {
        id: 201,
        name: "Floral Dress",
        category: "Women",
        price: 899,
        icon: "👗",
        color: "pink"
    },

    {
        id: 202,
        name: "Casual Top",
        category: "Women",
        price: 499,
        icon: "👚",
        color: "orange"
    },

    {
        id: 203,
        name: "Traditional Kurti",
        category: "Women",
        price: 699,
        icon: "🥻",
        color: "purple"
    },

    {
        id: 301,
        name: "Kids T-Shirt",
        category: "Kids",
        price: 299,
        icon: "🧸",
        color: "yellow"
    },

    {
        id: 302,
        name: "Kids Party Dress",
        category: "Kids",
        price: 599,
        icon: "🎀",
        color: "pink"
    },

    {
        id: 401,
        name: "Casual Sneakers",
        category: "Footwear",
        price: 1299,
        icon: "👟",
        color: "blue"
    },

    {
        id: 402,
        name: "Comfort Sandals",
        category: "Footwear",
        price: 599,
        icon: "🩴",
        color: "orange"
    },

    {
        id: 501,
        name: "Fashion Handbag",
        category: "Accessories",
        price: 999,
        icon: "👜",
        color: "purple"
    },

    {
        id: 502,
        name: "Classic Belt",
        category: "Accessories",
        price: 299,
        icon: "🪢",
        color: "green"
    }
];


// SHOPPING CART

const cart = [];


// CURRENT FILTER

let currentCategory = "All";


// DISPLAY PRODUCTS

function displayProducts(list = products) {

    const container = document.getElementById("product-list");

    container.innerHTML = "";

    if (list.length === 0) {

        container.innerHTML = `
            <p>No products found. Try another search.</p>
        `;

        return;
    }

    list.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-art ${product.color}">
                ${product.icon}
            </div>

            <div class="product-info">

                <p class="product-category">
                    ${product.category}
                </p>

                <h3>${product.name}</h3>

                <p class="product-price">
                    ₹${product.price.toLocaleString("en-IN")}
                </p>

                <button
                    class="add-button"
                    onclick="addToCart(${product.id})">

                    ADD TO CART +

                </button>

            </div>
        `;

        container.appendChild(card);

    });

}


// FILTER PRODUCTS BY CATEGORY

function filterProducts(category, button) {

    currentCategory = category;

    document.querySelectorAll(".filter").forEach(item => {
        item.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    const filtered = category === "All"
        ? products
        : products.filter(product => product.category === category);

    displayProducts(filtered);

}


// CATEGORY NAVIGATION

function showCategory(category) {

    const buttons = document.querySelectorAll(".filter");

    let selectedButton = null;

    buttons.forEach(button => {

        if (button.textContent.trim() === category) {
            selectedButton = button;
        }

    });

    filterProducts(category, selectedButton);

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });

}


// PRODUCT SEARCH

function searchProducts() {

    const input = document.getElementById("search-input");

    const keyword = input.value.trim().toLowerCase();

    const results = products.filter(product => {

        const matchesText =
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword);

        const matchesCategory =
            currentCategory === "All" ||
            product.category === currentCategory;

        return matchesText && matchesCategory;

    });

    displayProducts(results);

}


// ADD PRODUCT TO CART

function addToCart(productId) {

    const product = products.find(item => item.id === productId);

    if (!product) {
        alert("Product not found.");
        return;
    }

    const existing = cart.find(item => item.id === productId);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCartCount();

    updateCheckoutTotal();

    alert(product.name + " added to your cart!");
}


// UPDATE CART COUNT

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cart-count").textContent = count;

}


// CALCULATE TOTAL

function calculateCartTotal() {

    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

}


// UPDATE CHECKOUT TOTAL

function updateCheckoutTotal() {

    document.getElementById("checkout-total").textContent =
        calculateCartTotal().toLocaleString("en-IN");

}


// VIEW CART

function viewCart() {

    if (cart.length === 0) {

        alert("Your shopping cart is empty!");

        return;
    }

    const message = cart.map(item => {

        return `${item.name} x ${item.quantity} = ₹${
            item.price * item.quantity
        }`;

    }).join("\n");

    alert(
        "YOUR STYLEVERSE CART\n\n" +
        message +
        "\n\nTotal: ₹" +
        calculateCartTotal().toLocaleString("en-IN")
    );

}


// CREATE WHATSAPP CONFIRMATION

document.getElementById("checkout-form").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        if (cart.length === 0) {

            alert("Please add a product to your cart first.");

            return;
        }

        const name =
            document.getElementById("customer-name").value.trim();

        const phoneInput =
            document.getElementById("customer-phone").value.trim();

        const address =
            document.getElementById("customer-address").value.trim();

        const consent =
            document.getElementById("whatsapp-consent").checked;


        // Check that the customer agreed to the order message.

        if (!consent) {

            alert("Please agree to receive the order confirmation.");

            return;
        }


        // Extract digits for the WhatsApp destination.

        const phone = phoneInput.replace(/\D/g, "");

        if (phone.length < 10 || phone.length > 15) {

            alert(
                "Please enter a valid WhatsApp number " +
                "including your country code."
            );

            return;
        }


        // Build the order details.

        const orderId = "SV" + Date.now().toString().slice(-8);

        const itemDetails = cart.map(item => {

            return `${item.name} x ${item.quantity} - ₹${
                item.price * item.quantity
            }`;

        }).join("\n");


        const total = calculateCartTotal();


        const message =
`Hello ${name}!

Thank you for shopping with STYLEVERSE.

Your order ID: ${orderId}

ORDER DETAILS:
${itemDetails}

Total: ₹${total.toLocaleString("en-IN")}

Delivery address:
${address}

Your order has been recorded in this demonstration website.

Thank you for choosing STYLEVERSE!`;


        // Prepare the WhatsApp click-to-chat URL.

        // Your store's WhatsApp number
const storeWhatsAppNumber = "916380317545";

// Prepare the WhatsApp message
const whatsappURL =
    "https://wa.me/" +
    storeWhatsAppNumber +
    "?text=" +
    encodeURIComponent(message);


        // Show the prepared message and let the user send it.

        const confirmSend = confirm(
            "Your order summary is ready.\n\n" +
            "Order ID: " + orderId + "\n" +
            "Total: ₹" + total.toLocaleString("en-IN") +
            "\n\nPress OK to open WhatsApp."
        );


        if (confirmSend) {

            window.open(whatsappURL, "_blank", "noopener,noreferrer");

        }

    }
);


// INITIALISE WEBSITE

displayProducts();

updateCartCount();

updateCheckoutTotal();
