document.addEventListener("DOMContentLoaded", () => {
    // ---- Carrusel de Imágenes ----
    const carouselSlides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;

    function showSlide(index) {
        carouselSlides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (i === index) {
                slide.classList.add("active");
            }
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselSlides.length;
        showSlide(currentSlide);
    }
    
    // Solo si hay slides en la página
    if (carouselSlides.length > 0) {
        setInterval(nextSlide, 5000);
    }

    // ---- Modo Oscuro ----
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    const body = document.body;
    const isDarkMode = localStorage.getItem("darkMode") === "enabled";

    if (isDarkMode) {
        body.classList.add("dark-mode");
    }

    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            body.classList.toggle("dark-mode");
            if (body.classList.contains("dark-mode")) {
                localStorage.setItem("darkMode", "enabled");
            } else {
                localStorage.setItem("darkMode", "disabled");
            }
        });
    }
    
    // ---- Formulario de Contacto ----
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");
            const nameError = document.getElementById("name-error");
            const emailError = document.getElementById("email-error");
            const messageError = document.getElementById("message-error");
            let isValid = true;

            // Validación de nombre
            if (nameInput.value.length < 3) {
                nameError.style.display = "block";
                isValid = false;
            } else {
                nameError.style.display = "none";
            }

            // Validación de email
            const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
            if (!emailPattern.test(emailInput.value)) {
                emailError.style.display = "block";
                isValid = false;
            } else {
                emailError.style.display = "none";
            }

            // Validación de mensaje
            if (messageInput.value.length < 10) {
                messageError.style.display = "block";
                isValid = false;
            } else {
                messageError.style.display = "none";
            }

            if (isValid) {
                alert("Formulario enviado con éxito!");
                contactForm.reset();
            }
        });
    }

    // ---- Funcionalidad del carrito de compras ----
    const cart = [];
    const cartToggle = document.getElementById("cart-toggle");
    const cartContainer = document.getElementById("cart-container");
    const closeCartButton = document.getElementById("close-cart-button");
    const buyButtons = document.querySelectorAll(".buy-button");

    if (cartToggle && cartContainer && closeCartButton && buyButtons.length > 0) {
        
        // Función para añadir productos al carrito
        buyButtons.forEach(button => {
            button.addEventListener("click", () => {
                const productName = button.getAttribute("data-name");
                const productPrice = parseFloat(button.getAttribute("data-price"));
                
                const product = {
                    name: productName,
                    price: productPrice
                };
                
                cart.push(product);
                updateCartUI();
                alert(`${productName} ha sido añadido al carrito.`);
            });
        });

        // Función para actualizar la interfaz del carrito
        function updateCartUI() {
            const cartItemsContainer = document.getElementById("cart-items");
            const cartTotalElement = document.getElementById("cart-total");
            cartItemsContainer.innerHTML = "";
            let total = 0;

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = "<p>Tu carrito está vacío.</p>";
            } else {
                cart.forEach(item => {
                    const itemElement = document.createElement("div");
                    itemElement.classList.add("cart-item");
                    itemElement.innerHTML = `<span>${item.name}</span><span>$${item.price.toFixed(2)}</span>`;
                    cartItemsContainer.appendChild(itemElement);
                    total += item.price;
                });
            }

            cartTotalElement.innerHTML = `<p>Total: $${total.toFixed(2)}</p>`;
        }
        
        // Evento para mostrar/ocultar el carrito
        cartToggle.addEventListener("click", () => {
            cartContainer.classList.toggle("visible");
        });
        
        closeCartButton.addEventListener("click", () => {
            cartContainer.classList.remove("visible");
        });
    }
});