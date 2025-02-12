let cart = JSON.parse(localStorage.getItem('cart')) || [];  // Load cart from localStorage if available

// Function to add products to the cart
function addToCart(productName, price, image) {
    // Find if the product already exists in the cart
    let existingProduct = cart.find(item => item.name === productName && item.price === price);
    
    // If product exists, increment its quantity
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        // Add new product to the cart
        cart.push({
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update the cart display on the page
    updateCartDisplay();
}

// Function to update the cart display
function updateCartDisplay() {
    // Retrieve the cart from localStorage (in case it's updated)
    cart = JSON.parse(localStorage.getItem('cart')) || [];

    let cartCount = document.getElementById('cart-count');
    let cartItems = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');
    
    // Clear previous cart items
    cartItems.innerHTML = '';
    
    // Update cart items in the display
    let total = 0;
    cart.forEach((item, index) => {
        let listItem = document.createElement('li');
        let itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        listItem.innerHTML = `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" width="50" height="50">
                <div class="item-details">
                    <span>${item.name}</span>
                    <span>$${item.price} x ${item.quantity}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(listItem);
    });
    
    // Update the cart count and total price
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotal.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
}

// Function to remove an item from the cart
function removeFromCart(index) {
    // Remove the item at the given index
    cart.splice(index, 1);

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart display
    updateCartDisplay();
}

// Function to toggle the visibility of the cart
function toggleCart() {
    let cartElement = document.getElementById('cart');
    cartElement.classList.toggle('hidden');
}

// Function to proceed to checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    // Simulating a successful checkout process
    alert('Thank you for your purchase!');
    
    // Clear the cart after successful checkout
    cart = [];
    localStorage.removeItem('cart');  // Remove cart from localStorage
    updateCartDisplay();  // Update cart UI to reflect empty cart
    toggleCart();  // Hide the cart modal
}

// This ensures that cart items are displayed properly when the page is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCartDisplay();
});
