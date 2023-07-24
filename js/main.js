(function ($) {
    "use strict";
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Fixed Navbar
    $('.fixed-top').css('top', $('.top-bar').height());
    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('.fixed-top').addClass('bg-dark').css('top', 0);
        } else {
            $('.fixed-top').removeClass('bg-dark').css('top', $('.top-bar').height());
        }
    });
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1500,
        loop: true,
        nav: true,
        dots: false,
        items: 1,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });

    
})(jQuery);

//----------------new

// Get all the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

// Cart array to store products
let cart = [];

// Add click event listener to each "Add to Cart" button
addToCartButtons.forEach((button) => {
  button.addEventListener('click', addToCart);
});

// "Add to Cart" event handler
function addToCart(event) {
  const product = event.target.parentElement;
  const productName = product.querySelector('h3').innerText;
  const priceText = product.querySelector('p').innerText.split(' ')[1];
  const price = parseFloat(priceText);
  const quantity = parseInt(product.querySelector('.quantity-input').value);

  // Add the product and quantity to the cart array
  cart.push({ name: productName, price: price, quantity: quantity });

  alert(`${quantity} ${productName}(s) has been added to your cart.`);

  updateCartQuantity();
}

// Get the checkout button
const checkoutButton = document.querySelector('.checkout-button');

// Add click event listener to the checkout button
checkoutButton.addEventListener('click', handleCheckout);

// Checkout event handler
function handleCheckout() {
  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  let message = 'I would like to purchase:\n';

  // Calculate total price and construct message
  let totalPrice = 0;
  cart.forEach((product, index) => {
    const productTotalPrice = product.price * product.quantity;
    message += `${index + 1}. ${product.quantity} ${product.name}(s) - AED ${productTotalPrice.toFixed(2)}\n`;
    totalPrice += productTotalPrice;
  });

  message += `Total: AED ${totalPrice.toFixed(2)}`;

  // Truncate message if it exceeds WhatsApp's URL length limit
  const maxLength = 200;
  const truncatedMessage = message.length > maxLength ? message.substring(0, maxLength) : message;

  const encodedMessage = encodeURIComponent(truncatedMessage);
  const phoneNumber = "971521130902"; // Replace with the correct phone number
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappLink, "_blank");

  // Clear the cart after checkout
  cart = [];

  updateCartQuantity();
}

// Get all the quantity input fields
const quantityInputs = document.querySelectorAll('.quantity-input');

// Listen to the 'input' event for each input field
quantityInputs.forEach((input) => {
  input.addEventListener('input', function(event) {
    // Get the current value of the input field
    const currentQuantity = event.target.value;

    // Get the corresponding 'quantity-display' element by replacing 'input' with 'display' in the id
    const displayElement = document.getElementById(event.target.id.replace('input', 'display'));

    // Update the display
    displayElement.innerText = currentQuantity;
  });
});

function updateCartQuantity() {
  const totalQuantity = cart.reduce((total, product) => total + product.quantity, 0);
  const cartQuantityDisplay = document.getElementById('cart-quantity');
  cartQuantityDisplay.innerText = totalQuantity;
}

// Call updateCartQuantity initially to reflect any items already in cart
updateCartQuantity();



// Get the cart button
const cartButton = document.querySelector('#cart-btn');

// Add click event listener to the cart button
cartButton.addEventListener('click', handleCartClick);

// Cart button click event handler
function handleCartClick() {
    if (cart.length === 0) {
        alert('Your cart is empty.');
    } else {
        alert('You have items in your cart. Click on the checkout button to proceed.');
    }
}

// Get the custom alert
const customAlert = document.getElementById('custom-alert');

    document.getElementById("cart-btn").addEventListener("click", function() {
        var alertBox = document.getElementById("custom-alert");
        if (alertBox.classList.contains("hidden")) {
            alertBox.classList.remove("hidden");
        }
    });

    document.querySelector(".checkout-button").addEventListener("click", function() {
        // Implement your checkout procedure here.
        // ...
    });

    // Added event listener for the close button
    document.getElementById("close-alert").addEventListener("click", function() {
        var alertBox = document.getElementById("custom-alert");
        if (!alertBox.classList.contains("hidden")) {
            alertBox.classList.add("hidden");
        }
    });
    
