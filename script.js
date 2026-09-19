/* =========================
   HAPPY FOOD - SCRIPT
========================= */

let currentMainCategory = "sale";
let currentCategory = "pizza";
let currentProduct = null;
let currentQuantity = 1;

let cart = JSON.parse(localStorage.getItem("happyCart")) || [];


/* =========================
   PRODUCTS
========================= */

const products = {

    pizza: [
        {
            id: 1,
            name: "Happy Pizza",
            price: 700,
            image: "logo.jpeg",
            description: "Sauce, fromage, olives et poulet",
            ingredients: ["Sauce", "Fromage", "Olives", "Poulet"],
            removable: ["Fromage", "Olives", "Oignon"],
            extras: [
                { name: "Extra fromage", price: 100 },
                { name: "Extra poulet", price: 150 },
                { name: "Œuf", price: 50 }
            ]
        }
    ],

    burger: [
        {
            id: 2,
            name: "Happy Burger",
            price: 600,
            image: "logo.jpeg",
            description: "Burger maison avec fromage et poulet",
            ingredients: ["Pain", "Poulet", "Fromage", "Salade"],
            removable: ["Fromage", "Salade", "Oignon"],
            extras: [
                { name: "Extra fromage", price: 100 },
                { name: "Extra poulet", price: 150 },
                { name: "Œuf", price: 50 }
            ]
        }
    ],

    poule: [
        {
            id: 3,
            name: "Happy La Poule",
            price: 900,
            image: "logo.jpeg",
            description: "Poulet savoureux préparé maison",
            ingredients: ["Poulet", "Sauce", "Salade"],
            removable: ["Salade", "Oignon"],
            extras: [
                { name: "Extra poulet", price: 150 },
                { name: "Extra sauce", price: 50 }
            ]
        }
    ],

    tacos: [
        {
            id: 4,
            name: "Happy Tacos",
            price: 700,
            image: "logo.jpeg",
            description: "Tacos généreux et savoureux",
            ingredients: ["Poulet", "Fromage", "Sauce"],
            removable: ["Fromage", "Oignon"],
            extras: [
                { name: "Extra fromage", price: 100 },
                { name: "Extra poulet", price: 150 }
            ]
        }
    ],

    sandwich: [
        {
            id: 5,
            name: "Happy Sandwich",
            price: 500,
            image: "logo.jpeg",
            description: "Sandwich frais et gourmand",
            ingredients: ["Poulet", "Salade", "Sauce"],
            removable: ["Salade", "Oignon"],
            extras: [
                { name: "Extra poulet", price: 150 },
                { name: "Extra fromage", price: 100 }
            ]
        }
    ],

    other: [
        {
            id: 6,
            name: "Plat Happy",
            price: 800,
            image: "logo.jpeg",
            description: "Un délicieux plat Happy Food",
            ingredients: ["Poulet", "Sauce", "Salade"],
            removable: ["Salade"],
            extras: [
                { name: "Extra poulet", price: 150 }
            ]
        }
    ],

    boisson: [
        {
            id: 7,
            name: "Boisson",
            price: 150,
            image: "logo.jpeg",
            description: "Boisson fraîche",
            ingredients: [],
            removable: [],
            extras: []
        }
    ],

    coffee: [
        {
            id: 8,
            name: "Happy Coffee",
            price: 200,
            image: "logo.jpeg",
            description: "Café Happy Food",
            ingredients: [],
            removable: [],
            extras: []
        }
    ],

    gateaux: [
        {
            id: 9,
            name: "Happy Gâteau",
            price: 400,
            image: "logo.jpeg",
            description: "Délicieux gâteau maison",
            ingredients: [],
            removable: [],
            extras: []
        }
    ],

    boisson_sucre: [
        {
            id: 10,
            name: "Boisson",
            price: 150,
            image: "logo.jpeg",
            description: "Boisson fraîche",
            ingredients: [],
            removable: [],
            extras: []
        }
    ]
};


/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(category) {

    currentCategory = category;

    const container = document.getElementById("products");

    if (!container) return;

    const list = products[category] || [];

    if (list.length === 0) {

        container.innerHTML = `
            <div class="empty-cart">
                Aucun produit disponible.
            </div>
        `;

        return;
    }

    container.innerHTML = list.map(product => {

        return `
            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                >

                <div class="product-info">

                    <h3>${product.name}</h3>

                    <p class="product-description">
                        ${product.description}
                    </p>

                    <div class="product-bottom">

                        <span class="product-price">
                            ${product.price} DA
                        </span>

                        <button
                            class="product-button"
                            onclick="openProduct(${product.id})">

                            Choisir

                        </button>

                    </div>

                </div>

            </div>
        `;

    }).join("");
}


/* =========================
   FIND PRODUCT
========================= */

function findProduct(id) {

    for (const category in products) {

        const product = products[category]
            .find(item => item.id === id);

        if (product) return product;
    }

    return null;
}


/* =========================
   OPEN PRODUCT
========================= */

function openProduct(id) {

    const product = findProduct(id);

    if (!product) return;

    currentProduct = product;
    currentQuantity = 1;

    document.getElementById("quantity").textContent = "1";

    document.getElementById("modalImage").src = product.image;

    document.getElementById("modalName").textContent = product.name;

    document.getElementById("modalDescription").textContent =
        product.description;

    document.getElementById("modalPrice").textContent =
        product.price;

    displayIngredients(product);
    displayRemovable(product);
    displayExtras(product);

    updateModalTotal();

    document.getElementById("productModal")
        .classList.add("show");
}


/* =========================
   CLOSE PRODUCT
========================= */

function closeProduct() {

    document.getElementById("productModal")
        .classList.remove("show");

    currentProduct = null;
}


/* =========================
   INGREDIENTS
========================= */

function displayIngredients(product) {

    const container =
        document.getElementById("ingredientsList");

    if (!product.ingredients.length) {

        container.innerHTML =
            "<p>Aucun ingrédient</p>";

        return;
    }

    container.innerHTML =
        product.ingredients.map((ingredient, index) => {

            return `
                <div class="option">

                    <div class="option-left">

                        <input
                            type="checkbox"
                            checked
                            disabled
                        >

                        <span>
                            ${ingredient}
                        </span>

                    </div>

                </div>
            `;

        }).join("");
}


/* =========================
   REMOVABLE INGREDIENTS
========================= */

function displayRemovable(product) {

    const container =
        document.getElementById("removeList");

    if (!product.removable.length) {

        container.innerHTML =
            "<p>Aucune option</p>";

        return;
    }

    container.innerHTML =
        product.removable.map((item, index) => {

            return `
                <div class="option">

                    <div class="option-left">

                        <input
                            type="checkbox"
                            class="remove-option"
                            value="${item}"
                            onchange="updateModalTotal()"
                        >

                        <span>
                            Sans ${item}
                        </span>

                    </div>

                </div>
            `;

        }).join("");
}


/* =========================
   EXTRAS
========================= */

function displayExtras(product) {

    const container =
        document.getElementById("extrasList");

    if (!product.extras.length) {

        container.innerHTML =
            "<p>Aucun supplément</p>";

        return;
    }

    container.innerHTML =
        product.extras.map((extra, index) => {

            return `
                <div class="option">

                    <div class="option-left">

                        <input
                            type="checkbox"
                            class="extra-option"
                            value="${index}"
                            onchange="updateModalTotal()"
                        >

                        <span>
                            ${extra.name}
                        </span>

                    </div>

                    <span class="option-price">
                        +${extra.price} DA
                    </span>

                </div>
            `;

        }).join("");
}


/* =========================
   QUANTITY
========================= */

function changeQuantity(amount) {

    currentQuantity += amount;

    if (currentQuantity < 1) {
        currentQuantity = 1;
    }

    if (currentQuantity > 20) {
        currentQuantity = 20;
    }

    document.getElementById("quantity")
        .textContent = currentQuantity;

    updateModalTotal();
}


/* =========================
   MODAL TOTAL
========================= */

function updateModalTotal() {

    if (!currentProduct) return;

    let price = currentProduct.price;

    const extras =
        document.querySelectorAll(".extra-option");

    extras.forEach((checkbox) => {

        if (checkbox.checked) {

            const index =
                parseInt(checkbox.value);

            price +=
                currentProduct.extras[index].price;
        }

    });

    const total =
        price * currentQuantity;

    document.getElementById("modalTotal")
        .textContent = total;
}


/* =========================
   ADD TO CART
========================= */

function addToCart() {

    if (!currentProduct) return;

    const removed = [];

    document
        .querySelectorAll(".remove-option:checked")
        .forEach((checkbox) => {

            removed.push(checkbox.value);

        });


    const extras = [];

    document
        .querySelectorAll(".extra-option:checked")
        .forEach((checkbox) => {

            const index =
                parseInt(checkbox.value);

            extras.push(
                currentProduct.extras[index]
            );

        });


    let unitPrice =
        currentProduct.price;

    extras.forEach(extra => {

        unitPrice += extra.price;

    });


    const item = {

        id: Date.now(),

        productId: currentProduct.id,

        name: currentProduct.name,

        price: unitPrice,

        quantity: currentQuantity,

        removed: removed,

        extras: extras

    };


    cart.push(item);

    saveCart();

    closeProduct();

    updateCartCount();

    alert("Produit ajouté au panier 🛒");
}


/* =========================
   SAVE CART
========================= */

function saveCart() {

    localStorage.setItem(
        "happyCart",
        JSON.stringify(cart)
    );
}


/* =========================
   CART COUNT
========================= */

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    document.getElementById("cartCount")
        .textContent = count;
}


/* =========================
   OPEN CART
========================= */

function openCart() {

    displayCart();

    document.getElementById("cartModal")
        .classList.add("show");
}


/* =========================
   CLOSE CART
========================= */

function closeCart() {

    document.getElementById("cartModal")
        .classList.remove("show");
}


/* =========================
   DISPLAY CART
========================= */

function displayCart() {

    const container =
        document.getElementById("cartItems");

    if (!cart.length) {

        container.innerHTML = `
            <p class="empty-cart">
                Votre panier est vide.
            </p>
        `;

        document.getElementById("cartTotal")
            .textContent = "0";

        return;
    }


    container.innerHTML =
        cart.map(item => {

            const extrasText =
                item.extras.length
                    ? item.extras
                        .map(extra => extra.name)
                        .join(", ")
                    : "Aucun";


            const removedText =
                item.removed.length
                    ? item.removed.join(", ")
                    : "Aucun";


            const total =
                item.price * item.quantity;


            return `
                <div class="cart-item">

                    <div class="cart-item-header">

                        <span class="cart-item-name">
                            ${item.name}
                        </span>

                        <span class="cart-item-price">
                            ${total} DA
                        </span>

                    </div>


                    <div class="cart-item-options">

                        <div>
                            Suppléments :
                            ${extrasText}
                        </div>

                        <div>
                            Sans :
                            ${removedText}
                        </div>

                    </div>


                    <div class="cart-item-actions">

                        <button
                            onclick="changeCartQuantity(${item.id}, -1)">
                            −
                        </button>

                        <strong>
                            ${item.quantity}
                        </strong>

                        <button
                            onclick="changeCartQuantity(${item.id}, 1)">
                            +
                        </button>

                        <button
                            class="remove-cart"
                            onclick="removeFromCart(${item.id})">
                            Supprimer
                        </button>

                    </div>

                </div>
            `;

        }).join("");


    updateCartTotal();
}


/* =========================
   CART TOTAL
========================= */

function updateCartTotal() {

    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );

    document.getElementById("cartTotal")
        .textContent = total;
}


/* =========================
   CHANGE CART QUANTITY
========================= */

function changeCartQuantity(id, amount) {

    const item =
        cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {

        cart =
            cart.filter(item => item.id !== id);

    }

    saveCart();

    displayCart();

    updateCartCount();
}


/* =========================
   REMOVE CART ITEM
========================= */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveCart();

    displayCart();

    updateCartCount();
}


/* =========================
   MAIN CATEGORY
========================= */

function selectMainCategory(category, button) {

    currentMainCategory = category;

    document
        .querySelectorAll(".main-category")
        .forEach(btn =>
            btn.classList.remove("active")
        );

    button.classList.add("active");


    if (category === "sale") {

        document.getElementById("saleSection")
            .style.display = "block";

        document.getElementById("sucreSection")
            .style.display = "none";

        selectCategory("pizza");

    } else {

        document.getElementById("saleSection")
            .style.display = "none";

        document.getElementById("sucreSection")
            .style.display = "block";

        selectCategory("coffee");

    }
}


/* =========================
   SUB CATEGORY
========================= */

function selectCategory(category, button = null) {

    currentCategory = category;

    if (button) {

        const parent =
            button.parentElement;

        parent
            .querySelectorAll(".category")
            .forEach(btn =>
                btn.classList.remove("active")
            );

        button.classList.add("active");
    }

    displayProducts(category);
}


/* =========================
   ORDER TYPE
========================= */

function changeOrderType() {

    const selected =
        document.querySelector(
            'input[name="orderType"]:checked'
        );

    const tableContainer =
        document.getElementById(
            "tableNumberContainer"
        );

    if (selected.value === "table") {

        tableContainer.style.display =
            "block";

    } else {

        tableContainer.style.display =
            "none";

    }
}


/* =========================
   SEND ORDER
========================= */

function sendOrder() {

    if (!cart.length) {

        alert("Votre panier est vide.");

        return;
    }


    const orderType =
        document.querySelector(
            'input[name="orderType"]:checked'
        ).value;


    const name =
        document.getElementById(
            "customerName"
        ).value.trim();


    if (!name) {

        alert("Veuillez entrer votre nom.");

        return;
    }


    let table = "";

    if (orderType === "table") {

        table =
            document.getElementById(
                "tableNumber"
            ).value.trim();


        if (!table) {

            alert(
                "Veuillez entrer le numéro de table."
            );

            return;
        }
    }


    let message =
        "🍔 *NOUVELLE COMMANDE - HAPPY FOOD*%0A%0A";


    message +=
        "👤 Nom : " +
        encodeURIComponent(name) +
        "%0A";


    if (orderType === "table") {

        message +=
            "🍽️ Table : " +
            encodeURIComponent(table) +
            "%0A";

    } else {

        message +=
            "🛍️ Type : Emporter%0A";

    }


    message += "%0A";


    cart.forEach((item, index) => {

        message +=
            "▪️ " +
            encodeURIComponent(item.name) +
            " x" +
            item.quantity +
            "%0A";


        if (item.extras.length) {

            message +=
                "   ➕ " +
                encodeURIComponent(
                    item.extras
                        .map(e => e.name)
                        .join(", ")
                ) +
                "%0A";
        }


        if (item.removed.length) {

            message +=
                "   ➖ Sans " +
                encodeURIComponent(
                    item.removed.join(", ")
                ) +
                "%0A";
        }


        message +=
            "   💰 " +
            (item.price * item.quantity) +
            " DA%0A%0A";

    });


    const total =
        cart.reduce(
            (sum, item) =>
                sum + item.price * item.quantity,
            0
        );


    message +=
        "💵 *TOTAL : " +
        total +
        " DA*";


    /*
       IMPORTANT :
       Remplace ce numéro par le numéro
       WhatsApp de Happy Food.

       Exemple Algérie :
       213XXXXXXXXX
    */

    const whatsappNumber =
        "213000000000";


    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        message;


    if (orderType === "emporter") {

        window.open(
            whatsappURL,
            "_blank"
        );

    } else {

        createTableTicket(
            name,
            table,
            total
        );
    }
}


/* =========================
   TABLE TICKET
========================= */

function createTableTicket(
    name,
    table,
    total
) {

    const canvas =
        document.createElement("canvas");

    canvas.width = 800;
    canvas.height = 1000;

    const ctx =
        canvas.getContext("2d");


    ctx.fillStyle = "#ffffff";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.fillStyle = "#111111";

    ctx.textAlign = "center";


    ctx.font =
        "bold 50px Arial";

    ctx.fillText(
        "HAPPY FOOD",
        400,
        80
    );


    ctx.font =
        "bold 32px Arial";

    ctx.fillText(
        "TICKET DE COMMANDE",
        400,
        135
    );


    ctx.beginPath();

    ctx.moveTo(80, 165);
    ctx.lineTo(720, 165);

    ctx.stroke();


    ctx.textAlign = "left";

    ctx.font =
        "24px Arial";


    ctx.fillText(
        "Client : " + name,
        80,
        215
    );


    ctx.fillText(
        "Table : " + table,
        80,
        255
    );


    let y = 320;


    cart.forEach(item => {

        ctx.font =
            "bold 25px Arial";

        ctx.fillText(
            item.name +
            " x" +
            item.quantity,
            80,
            y
        );

        y += 38;


        if (item.extras.length) {

            ctx.font =
                "20px Arial";

            ctx.fillText(
                "+ " +
                item.extras
                    .map(e => e.name)
                    .join(", "),
                105,
                y
            );

            y += 30;
        }


        if (item.removed.length) {

            ctx.font =
                "20px Arial";

            ctx.fillText(
                "- Sans " +
                item.removed.join(", "),
                105,
                y
            );

            y += 30;
        }


        ctx.font =
            "20px Arial";

        ctx.fillText(
            (item.price * item.quantity) +
            " DA",
            600,
            y - 30
        );


        y += 35;

    });


    ctx.beginPath();

    ctx.moveTo(80, y);
    ctx.lineTo(720, y);

    ctx.stroke();


    y += 60;


    ctx.font =
        "bold 34px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "TOTAL : " + total + " DA",
        400,
        y
    );


    y += 70;


    ctx.font =
        "22px Arial";

    ctx.fillText(
        "Merci pour votre commande ❤️",
        400,
        y
    );


    canvas.toBlob(
        blob => {

            if (!blob) return;

            const file =
                new File(
                    [blob],
                    "happy-food-ticket.png",
                    {
                        type: "image/png"
                    }
                );


            if (
                navigator.share &&
                navigator.canShare &&
                navigator.canShare({
                    files: [file]
                })
            ) {

                navigator.share({

                    title:
                        "Happy Food - Ticket",

                    text:
                        "Ticket de commande Happy Food",

                    files: [file]

                }).catch(() => {});

            } else {

                const link =
                    document.createElement("a");

                link.download =
                    "happy-food-ticket.png";

                link.href =
                    URL.createObjectURL(blob);

                link.click();

                URL.revokeObjectURL(
                    link.href
                );

            }

        },
        "image/png"
    );
}


/* =========================
   SCROLL TO MENU
========================= */

function scrollToMenu() {

    document
        .getElementById("menu")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   CLOSE MODAL WHEN CLICK OUTSIDE
========================= */

window.addEventListener(
    "click",
    function(event) {

        const productModal =
            document.getElementById(
                "productModal"
            );

        const cartModal =
            document.getElementById(
                "cartModal"
            );


        if (event.target === productModal) {
            closeProduct();
        }


        if (event.target === cartModal) {
            closeCart();
        }

    }
);


/* =========================
   INITIALIZE
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        displayProducts("pizza");

        updateCartCount();

    }
);