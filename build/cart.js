"use strict";
const cartItemsContainer = document.querySelector(".cart-items");
const totalElement = document.querySelector(".total-price");
const clearButton = document.getElementById("clear-cart");
const checkoutButton = document.querySelector(".checkout-button");
const emptyCartContainer = document.querySelector(".empty-cart");
const main = document.querySelector(".main");
// Função que carrega os itens armezanados no LocalStorage
function loadCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}
// Função que salva os itens no LocalStorage
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
// Função que calcula o valor total dos produtos do carrinho
function updateTotal(cart) {
    let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    total = parseFloat(total.toFixed(2));
    totalElement.textContent = `R$ ${total}`;
}
// Função que renderiza os itens do carrinho caso tenha
function renderCart() {
    const cart = loadCart();
    cartItemsContainer.innerHTML = "";
    // Se o carrinho estiver vazio, esconde a lista e mostra a mensagem de vazio
    if (cart.length === 0) {
        cartItemsContainer.style.display = "none";
        main.style.display = "block";
        main.style.marginTop = "10rem";
        emptyCartContainer.classList.remove("hidden");
        document.querySelector(".cart-summary").style.display = "none";
        return;
    }
    // Se houver itens no carrinho, mostra a lista e o resumo
    cartItemsContainer.style.display = "flex";
    emptyCartContainer.classList.add("hidden");
    document.querySelector(".cart-summary").style.display = "block";
    main.style.display = "flex";
    main.style.marginTop = "0";
    // Para cada item do carrinho, cria uma div contendo os dados
    cart.forEach(item => {
        let value = item.price * item.quantity;
        value = parseFloat(value.toFixed(2));
        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="details">
        <h3>${item.name}</h3>
        <div class="quantity-control">
          <button class="decrease" data-id="${item.id}">−</button>
          <span>${item.quantity}</span>
          <button class="increase" data-id="${item.id}">+</button>
        </div>
        <p>R$ ${value}</p>
        <button class="remove" data-id="${item.id}">Remover</button>
      </div>
    `;
        cartItemsContainer.appendChild(div);
    });
    updateTotal(cart);
}
// Verifica cliques dentro do contêiner de itens do carrinho
cartItemsContainer.addEventListener("click", (e) => {
    const target = e.target; // Elemento que foi clicado
    const id = Number(target.getAttribute("data-id")); // ID do produto relacionado ao botão
    let cart = loadCart();
    const item = cart.find(i => i.id === id); // Busca o item no carrinho
    // Se não encontrou o item, sai da função
    if (!item)
        return;
    // Verifica qual botão foi clicado e executa a ação correspondente
    if (target.classList.contains("increase")) {
        item.quantity++;
    }
    else if (target.classList.contains("decrease")) {
        item.quantity = Math.max(1, item.quantity - 1);
    }
    else if (target.classList.contains("remove")) {
        cart = cart.filter(i => i.id !== id);
    }
    saveCart(cart);
    renderCart();
});
// Verifica se clicou o botão que limpa o carrinho
clearButton.addEventListener("click", () => {
    localStorage.removeItem("cart");
    main.style.marginTop = "10rem";
    renderCart();
});
// Verifica se clicou o botão que finaliza a compra
checkoutButton.addEventListener("click", () => {
    alert("Compra efetuada com sucesso!");
    localStorage.removeItem("cart");
    window.location.href = "/index.html";
});
renderCart();
