const productList = document.getElementById('productList');
const details = document.getElementById('details');
const container = document.getElementById('container');
const btn = document.getElementById("btn")
let productsData = [];

// Alternar entre o tema escuro e claro
btn.onclick = function(){
    if (document.body.className === "Dark-theme") {
        Dark.innerText = "Dark";
        DarkImage.src = "img/moon.png";
    }else {
        DarkImage.src = "img/sun.png";
        Dark.innerText = "Light";
    }
    document.body.classList.toggle("Dark-theme");
}

// Buscar os produtos na API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        productsData = await response.json();
        displayProducts(productsData);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}


const modalDiv = document.getElementById('modal');
const modalClose = document.getElementById('close');

modalClose.addEventListener('click', () => modal());

// Exibir os detalhes de um produto em um modal
function setModal(product) {
    const titleContainer = document.getElementById('modalTitle');
    const priveContainer = document.getElementById('modalPrice');
    const categoryContainer = document.getElementById('modalCategory');
    const descriptionContainer = document.getElementById('modalDescription');
    const rateContainer = document.getElementById('modalRate');
    const countContainer = document.getElementById('modalCount');
    
    titleContainer.innerText = product.title;
    priveContainer.innerText = product.price;
    categoryContainer.innerText = product.category;
    descriptionContainer.innerText = product.description;
    rateContainer.innerText = product.rating.rate;
    countContainer.innerText = product.rating.count;
}

const modalU = document.getElementById('modalUser');
const modalS = document.getElementById('modalShop');
const botaoU = document.getElementById('user');
const botaoS = document.getElementById('shop');
const closeU = document.getElementById('closeU');
const closeS = document.getElementById('closeS');


// Função para exibir o modal de usuário
function modalUser(){
    if (modalU.style.display === 'none') {
        document.body.classList.add('modal');
        modalU.style.display = 'block';
    }else {
        document.body.classList.remove('modal');
        modalU.style.display = 'none';
    }
}

// Função para exibir o modal de compras
function modalShop(){
    if (modalS.style.display === 'none') {
        document.body.classList.add('modal');
        modalS.style.display = 'block';
    }else {
        document.body.classList.remove('modal');
        modalS.style.display = 'none';
    }
}

function close() {
    document.body.classList.remove('modal');
    modalS.style.display = 'none';
    modalU.style.display = 'none';
}

botaoU.addEventListener("click", () => modalUser());
botaoS.addEventListener("click", () => modalShop());
closeS.addEventListener("click", () => close());
closeU.addEventListener("click", () => close());

// Exibir um modal com detalhes de um produto
function modal(product){
    if (modalDiv.style.display === 'none') {
        setModal(product);
        document.body.classList.add('modal');
        modalDiv.style.display = 'block';
    }else {
        document.body.classList.remove('modal');
        modalDiv.style.display = 'none';
    }
}

const totalPage = document.getElementById('totalPage');

totalPage.addEventListener('change', () => {
    fetchProducts();
})

// Product main page display
function displayProducts(products) {
    let max = totalPage.value;
    let i = 0;
    productList.innerHTML = '';
    products.forEach(product => {
        if (i < max) {
            const productDiv = document.createElement('div');
            const modalButton = document.createElement('button');
            modalButton.innerText = "Detalhes";
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>Preço: $${product.price}</p>
                <p>Categoria: ${product.category}</p>
            `;
            productDiv.appendChild(modalButton);
            productList.appendChild(productDiv);
            productDiv.addEventListener('click', () => showProductDetails(product));
            modalButton.addEventListener('click', (e) => {
                e.stopPropagation();
                modal(product);
            });
            i++;
        }
    });
}

// Exibir os detalhes de um produto na página principal
function showProductDetails(product) {
    productList.style.display = 'none';
    container.style.display = 'none';
    details.style.display = 'block';

    const backButton = document.getElementById('backButton');
    const titleContainer = document.getElementById('title');
    const priveContainer = document.getElementById('price');
    const categoryContainer = document.getElementById('category');
    const descriptionContainer = document.getElementById('description');
    const rateContainer = document.getElementById('rate');
    const countContainer = document.getElementById('count');
    const image = document.getElementById('image');

    backButton.addEventListener('click', () => {
        productList.style.display = 'grid';
        details.style.display = 'none';
        container.style.display = 'block';
    })
    
    titleContainer.innerText = product.title;
    priveContainer.innerText = product.price;
    categoryContainer.innerText = product.category;
    descriptionContainer.innerText = product.description;
    rateContainer.innerText = product.rating.rate;
    countContainer.innerText = product.rating.count;

    image.src = product.image;
    image.alt = product.title;
}

// Filtrar produtos por categoria
function filterProducts(category) {
    if(category === 'men') category = "men's clothing";
    else if (category === 'women') category = "women's clothing";
    const filteredProducts = productsData.filter(product => category === 'all' || product.category === category);
    displayProducts(filteredProducts);
}

// Filtrar produtos com base na barra de pesquisa
function sortProducts(order) {
    const sortedProducts = [...productsData];
    sortedProducts.sort((a, b) => {
        if (order === 'asc') {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
    displayProducts(sortedProducts);
}


const searchBar = document.getElementById('search');
searchBar.addEventListener('input', () => {
    const filteredProducts = productsData.filter(
        product => product.title.toLowerCase().includes(searchBar.value.toLowerCase())
    );
    displayProducts(filteredProducts);
});


const searchIcon = document.getElementById('searchIcon');
const campo = document.getElementById('campo');


// lternar a exibição da barra de pesquisa
function switchIcon() {
    if (searchIcon.className === 'bx bx-search-alt') {
        campo.classList.add('active');
        searchIcon.classList.remove('bx-search-alt'); 
        searchIcon.classList.add('bx-x-circle');
        searchBar.style.display = "block";
        searchBar.value = "";
    }else {
        campo.classList.remove('active');
        searchBar.style.display = "none";
        searchIcon.classList.add('bx-search-alt'); 
        searchIcon.classList.remove('bx-x-circle');
    }
}

searchIcon.addEventListener('click', () => {
    switchIcon();
});


fetchProducts();

function decrementar() {
    if (cont.value > 0) {
        cont.value--;
    }
}

function incrementar() {
    cont.value++;
}

menos.addEventListener('click', () => decrementar());
mais.addEventListener('click', () => incrementar());