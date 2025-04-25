// Definindo o tipo Product
interface Product {
  id: number,
  name: string,
  price: number,
  image: string
}

// Variável do tipo Product contendo os produtos disponíveis
const products: Product [] = [
  { id: 1, name: "Samsung Galaxy", price: 1400, image: "/images/samsung-galaxy.jpg" },
  { id: 2, name: "Computador", price: 5000, image: "/images/computer.png"},
  { id: 3, name: "Teclado", price: 24, image: "/images/keyboard.jpg"},
  { id: 4, name: "Placa de rede PCIe", price: 43.50, image: "/images/network-card.jpg"},
  { id: 5, name: "Arduino Uno", price: 41.84, image: "/images/arduino.jpg"},
  { id: 6, name: "Leitor de cartão de memória", price: 39, image: "/images/card-reader.jpg"},
  { id: 7, name: "Notebook", price: 2997.86, image: "/images/laptop.jpg"},
  { id: 8, name: "Roteador", price: 106.92, image: "/images/router.jpg"},
  { id: 9, name: "Câmera digital", price: 150, image: "/images/camera.jpg"},
  { id: 10, name: "HD interno 500 GB", price: 66.90, image: "/images/HD.jpg" }
];


const productList = document.querySelector(".product-list")!;
const searchInput = document.querySelector<HTMLInputElement>(".search-input")!;
const searchButton = document.querySelector(".search-button")!;

// Função que renderiza todos os produtos ou apenas aqueles correspondem à pesquisa(barra de pesquisa)
function renderProducts(filter = "") {
  // Implementa a pesquisa(filtragem) dos produtos por meio do nome
  productList.innerHTML = "";
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(filter.toLowerCase())
  );

  // Cria uma div para cada produto
  filtered.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src=".${product.image}" alt="${product.name}">
      <div id="text">
        <h3>${product.name}</h3>
        <p>R$ ${product.price}</p>
      </div>
      <button data-id="${product.id}">Adicionar ao carrinho</button>
    `;
    productList.appendChild(div);
  });
}

// Função que cria uma div contendo uma mensagem
function showMessage(msg: string) {
  const message = document.createElement("div");
  message.className = "message";
  message.textContent = msg;
  document.body.appendChild(message);
  message.style.display = "block";

  // Remove a div/mensagem após 2 segundos
  setTimeout(() => {
    message.remove();
  }, 2000);
}

// Função que adiciona um produto ao carrinho de compras armazenando no localStorage com a chave "cart"
function addToCart(productId: number) {
    // Procura se o produto já existe no carrinho
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item: any) => item.id === productId);

    // Se o produto já estiver no carrinho, só aumenta a quantidade, senão acrescenta ao carrinho
    if (existing) {
      existing.quantity++;
    } else {
      const product = products.find(p => p.id === productId);
      if (product) cart.push({ ...product, quantity: 1 });
    }

    // Salva o carrinho atualizado no localStorage, convertendo pra string
    localStorage.setItem("cart", JSON.stringify(cart));

    // Exibe mensagem para o usuário de que o produto foi adicionado ao carrinho
    showMessage("Adicionado ao carrinho");
}

// Verifica um clique na lista de produtos
productList.addEventListener("click", (e) => {
  // Pega o elemento que foi clicado
  const target = e.target as HTMLElement;

  // Verifica se o clique foi em um botão e adiciona o produto ao carrinho
  if (target.tagName === "BUTTON") {
    const id = Number(target.getAttribute("data-id"));
    addToCart(id);
  }
});

// Verifica o clique na lupa para realizar a pesquisa do produto 
searchButton.addEventListener("click", () => {
  renderProducts(searchInput.value);
});

// Verifica se o usuário clicou a tecla ENTER para realizar a pesquisa do produto  
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    renderProducts(searchInput.value);
  }
});

renderProducts();
