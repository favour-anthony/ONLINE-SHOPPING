let products = [
    {
        name: 'electric iron',
        price: 100,
        image: 'iron.jfif'
    },
    {
        name: 'smartphone',
        price: 300,
        image: 'phone.jfif'
    },
    {
        name: 'clothe',
        price: 80,
        image: 'cloth.jfif'
    },
    {
        name: 'sneakers',
        price: 20,
        image: 'sneakers.jfif'
    },
    {
        name: 'wristwatch',
        price: 50,
        image: 'wristwatch.jfif'
    }
];

let localData = localStorage.getItem('cart');
let cart = !localData ? [] : JSON.parse(localData);
loadProducts();
cartNumber();

document.addEventListener('DOMContentLoaded', () => {
    let cartButton = document.getElementById('cart-button');
    let orderBtn = document.getElementById('order-now');

    cartButton.addEventListener('click', () => {
        alert(`You have ${cart.length} items in your cart.`);
    });

    orderBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            alert(`Your order has been recorded. Proceed to checkout!`);
        } else {
            alert('Your cart is empty.');
        }
    });
});
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
    } else {
        confirm('Proceeding to checkout!');
        cartContainer.innerHTML = '';
    }
});
function loadProducts() {
    let productItems = '';
    products.forEach((m, index) => {
        productItems += `<div class="product">
            <img src="images/${m.image}" alt="${m.name}" style="width:150px ; height:200px ;">
            <h2>${m.name}</h2>
            <p>$${m.price}</p> 
            <button class="add-btn" onclick="addToCart(${index})">Add to Cart</button>
            </div>`;
    });
    document.getElementById('product-list').innerHTML = productItems;
}

function addToCart(productIndex) {
    let productItem = products[productIndex];
    let cartSearch = cart.find((cartItem) => cartItem.name == productItem.name);

    if (cartSearch == undefined) {
        cart.push({
            name: productItem.name,
            price: productItem.price,
            quantity: 1,
            total: productItem.price,
            image: productItem.image,
        });
        alert(`${productItem.name} added to cart`);
    } else {
        cartSearch.quantity += 1;
        cartSearch.total = cartSearch.quantity * productItem.price;
    }
    
    updateCartDisplay();
    updateLocalStorage();
    cartNumber();
}

function updateCartDisplay() {
    let cartContainer = document.querySelector('.cart-items');
    cartContainer.innerHTML = '';

    cart.forEach(item => {
        let cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${(item.price * item.quantity).toFixed(2)}</p>
            <button id="remove" onclick="removeFromCart('${item.name}')" style = "margin-bottom:20px;">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
        updateCartTotal()
    });
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartDisplay();
    updateLocalStorage();
    cartNumber();
}

function cartNumber() {
    document.getElementById('cart-button').innerHTML = cart.length;
}
function updateCartTotal() {
    let totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    document.querySelector('.cart-total').innerText = `Total: $${totalPrice.toFixed(2)}`;
}
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

