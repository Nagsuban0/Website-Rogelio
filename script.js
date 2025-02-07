let cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve cart from localStorage

// Add to Cart Functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
        const foodCard = event.target.closest(".food-card");
        const foodName = foodCard.querySelector("h3").textContent;
        const foodPrice = parseFloat(foodCard.querySelector("p").textContent.replace("₱", ""));

        addToCart(foodName, foodPrice);
    });
});

// Function to add item to the cart
function addToCart(foodName, foodPrice) {
    cart.push({ name: foodName, price: foodPrice });

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update the cart UI
    updateCart();

    // Show a temporary message
    showCartMessage(`${foodName} added to cart!`);
}

// Function to update the cart UI
function updateCart() {
    const cartList = document.querySelector(".cart-list");
    let totalPrice = 0;

    cartList.innerHTML = ""; // Clear existing cart items

    // Loop through cart items and add them to the cart list
    cart.forEach((item) => {
        totalPrice += item.price;

        const listItem = document.createElement("li");
        listItem.textContent = `${item.name} - ₱${item.price}`;
        cartList.appendChild(listItem);
    });

    // Update the total price in the cart
    document.querySelector(".cart-total").textContent = `Total: ₱${totalPrice}`;
}

// Function to show a temporary cart message
function showCartMessage(messageText) {
    const message = document.getElementById("cart-message");
    message.textContent = messageText;
    message.style.display = "block";

    // Hide the message after 2 seconds
    setTimeout(() => {
        message.style.display = "none";
    }, 2000);
}

// Clear Cart Button functionality
document.querySelector(".clear-cart-btn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear the cart?")) {
        cart = []; // Reset cart array
        localStorage.removeItem("cart"); // Clear localStorage
        updateCart(); // Update UI
        showCartMessage("Your cart has been cleared.");
    }
});

// Checkout Button functionality
document.querySelector(".checkout-btn").addEventListener("click", () => {
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "checkout.html"; // Redirect to checkout page
});

// Function to filter items by category
function filterItems(category) {
    const filteredItems = allFoodItems.filter((item) => item.category === category);
    const foodItemsContainer = document.getElementById("food-items-container");
    foodItemsContainer.innerHTML = ""; // Clear previous food items

    // Display filtered items
    filteredItems.forEach((item) => {
        const foodCard = document.createElement("div");
        foodCard.classList.add("food-card");

        foodCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>₱${item.price}</p>
            <button class="add-to-cart">Add to Cart</button>
        `;

        // Add event listener to "Add to Cart" button
        foodCard.querySelector(".add-to-cart").addEventListener("click", () => {
            addToCart(item.name, item.price);
        });

        foodItemsContainer.appendChild(foodCard);
    });
}

// Food items with local image paths
const allFoodItems = [
    { id: 1, name: "Pizza Margherita", category: "pizzas", price: 150, image: "image/pizza1.jpg" },
    { id: 2, name: "Cheese Pizza", category: "pizzas", price: 180, image: "image/pizza2.jpg" },
    { id: 3, name: "Burger Classic", category: "burgers", price: 100, image: "image/burger1.jpg" },
    { id: 4, name: "Cheeseburger", category: "burgers", price: 120, image: "image/burger2.jpg" },
    { id: 5, name: "Veg Sandwich", category: "sandwiches", price: 80, image: "image/sandwich1.jpg" },
    { id: 6, name: "Chicken Sandwich", category: "sandwiches", price: 90, image: "image/sandwich2.jpg" },
];

